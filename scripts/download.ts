import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { SederDefinition, TractateDefinition } from "../src/tractates.js";
import type { Tractate, Perek, Mishna } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../data");

const BASE_URL = "https://www.sefaria.org/api";

// Steinsaltz English version title on Sefaria; falls back to default if empty
const EN_VERSION = process.env.SEFARIA_EN_VERSION ?? "Steinsaltz";
const DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

interface SefariaIndexSchema {
  length?: number;
  lengths?: number[];
  nodes?: { length?: number; lengths?: number[] }[];
}

interface SefariaTextResponse {
  text: string[] | string[][];
  he: string[] | string[][];
}

// Shape of the nodes returned by the Sefaria TOC endpoint (`/api/index/`).
interface SefariaTocCategory {
  category: string;
  heCategory: string;
  order?: number;
  contents: SefariaTocNode[];
}
interface SefariaTocTractate {
  title: string;
  heTitle: string;
  order?: number;
}
type SefariaTocNode = SefariaTocCategory | SefariaTocTractate;

function isCategory(node: SefariaTocNode): node is SefariaTocCategory {
  return "contents" in node;
}

function byOrder(a: { order?: number }, b: { order?: number }): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

function stripPrefix(text: string, ...prefixes: string[]): string {
  for (const p of prefixes) {
    if (text.startsWith(p)) return text.slice(p.length);
  }
  return text;
}

// Builds the seder/tractate structure from Sefaria's table of contents instead
// of hardcoding it. Writes nothing; the caller persists the result.
async function fetchSedarim(): Promise<SederDefinition[]> {
  const toc = await fetchJson<SefariaTocNode[]>(`${BASE_URL}/index/`);
  const mishnah = toc.find(
    (n): n is SefariaTocCategory => isCategory(n) && n.category === "Mishnah"
  );
  if (!mishnah) throw new Error("Could not find Mishnah category in Sefaria TOC");

  const sedarim: SederDefinition[] = [];
  for (const node of [...mishnah.contents].sort(byOrder)) {
    // The Mishnah node also contains commentary categories; keep only sedarim.
    if (!isCategory(node) || !node.category.startsWith("Seder ")) continue;

    const tractates: TractateDefinition[] = [];
    for (const t of [...node.contents].sort(byOrder)) {
      if (isCategory(t)) continue; // tractates are leaf nodes
      const name = stripPrefix(t.title, "Mishnah ");
      // Drop apostrophes so `key` stays filesystem-friendly and `exportName`
      // is a valid JS identifier (e.g. "Ta'anit" -> "taanit" / "TAANIT").
      const slug = name.replace(/['’]/g, "");
      tractates.push({
        name,
        hebrewName: stripPrefix(t.heTitle, "משנה "),
        sefariaId: t.title.replace(/ /g, "_"),
        key: slug.toLowerCase().replace(/\s+/g, "-"),
        exportName: slug.toUpperCase().replace(/\s+/g, "_"),
      });
    }

    sedarim.push({
      name: stripPrefix(node.category, "Seder "),
      hebrewName: stripPrefix(node.heCategory, "סדר "),
      tractates,
    });
  }

  return sedarim;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": "mishna-text-downloader/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json() as Promise<T>;
}

async function getChapterCount(sefariaId: string): Promise<number> {
  const data = await fetchJson<{ schema: SefariaIndexSchema }>(
    `${BASE_URL}/v2/raw/index/${sefariaId}`
  );
  const s = data.schema;
  if (s.lengths?.length) return s.lengths[0];
  if (s.length) return s.length;
  if (s.nodes?.length) {
    const n = s.nodes[0];
    if (n.lengths) return n.lengths[0];
    if (n.length) return n.length;
  }
  throw new Error(`Cannot determine chapter count for ${sefariaId}`);
}

async function fetchChapter(sefariaId: string, chapter: number): Promise<Perek | null> {
  const ref = `${sefariaId}.${chapter}`;
  let data = await fetchJson<SefariaTextResponse>(
    `${BASE_URL}/texts/${ref}?commentary=0&context=0&pad=0&language=both&ven=${encodeURIComponent(EN_VERSION)}`
  );

  const enArr = (Array.isArray(data.text) ? data.text : []) as string[];
  const hasEnglish = enArr.some((m) => (typeof m === "string" ? m : "") !== "");
  if (!hasEnglish) {
    data = await fetchJson<SefariaTextResponse>(
      `${BASE_URL}/texts/${ref}?commentary=0&context=0&pad=0&language=both`
    );
  }

  const heArr = (Array.isArray(data.he) ? data.he : []) as string[];
  const enArr2 = (Array.isArray(data.text) ? data.text : []) as string[];
  if (heArr.length === 0 && enArr2.length === 0) return null;

  const count = Math.max(heArr.length, enArr2.length);
  const mishnayot: Mishna[] = [];
  for (let i = 0; i < count; i++) {
    mishnayot.push({
      mishna: i + 1,
      hebrew: stripHtml(heArr[i] ?? ""),
      english: stripHtml(enArr2[i] ?? ""),
    });
  }
  return { perek: chapter, mishnayot };
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  console.log("Fetching tractate list from Sefaria...");
  const sedarim = await fetchSedarim();
  writeFileSync(
    join(DATA_DIR, "tractates.json"),
    JSON.stringify(sedarim, null, 2),
    "utf-8"
  );

  for (const seder of sedarim) {
    console.log(`\nSeder: ${seder.name}`);
    for (const tractDef of seder.tractates) {
      console.log(`  ${tractDef.name}...`);
      const chapterCount = await getChapterCount(tractDef.sefariaId);
      await sleep(DELAY_MS);

      const perakim: Perek[] = [];
      for (let ch = 1; ch <= chapterCount; ch++) {
        process.stdout.write(`    ${ch}/${chapterCount}\r`);
        const perek = await fetchChapter(tractDef.sefariaId, ch);
        if (perek) perakim.push(perek);
        await sleep(DELAY_MS);
      }
      process.stdout.write("\n");

      const tractate: Tractate = {
        name: tractDef.name,
        hebrewName: tractDef.hebrewName,
        sefariaId: tractDef.sefariaId,
        seder: seder.name,
        sederHebrewName: seder.hebrewName,
        perakim,
      };

      writeFileSync(
        join(DATA_DIR, `${tractDef.key}.json`),
        JSON.stringify(tractate, null, 2),
        "utf-8"
      );
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
