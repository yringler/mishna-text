import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { SEDARIM } from "../src/tractates.js";
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

  for (const seder of SEDARIM) {
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
