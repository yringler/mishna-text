import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { SEDARIM } from "../src/tractates.js";
import type { Seder, Tractate, Perek, Mishna } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../data");

const BASE_URL = "https://www.sefaria.org/api";

// Steinsaltz English version title on Sefaria; falls back to default if not found
const EN_VERSION = process.env.SEFARIA_EN_VERSION ?? "Steinsaltz";
const DELAY_MS = 300;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

interface SefariaIndexNode {
  length?: number;
  lengths?: number[];
  nodes?: SefariaIndexNode[];
  schema?: SefariaIndexSchema;
}

interface SefariaIndexSchema {
  length?: number;
  lengths?: number[];
  nodes?: SefariaIndexNode[];
}

interface SefariaTextResponse {
  text: string[] | string[][];
  he: string[] | string[][];
  statusCode?: number;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": "mishna-text-downloader/1.0" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.json() as Promise<T>;
}

async function getChapterCount(sefariaId: string): Promise<number> {
  const url = `${BASE_URL}/v2/raw/index/${sefariaId}`;
  const data = await fetchJson<{ schema: SefariaIndexSchema }>(url);
  const schema = data.schema;

  if (schema.lengths && schema.lengths.length > 0) {
    return schema.lengths[0];
  }
  if (schema.length) {
    return schema.length;
  }
  if (schema.nodes && schema.nodes.length > 0) {
    // Some tractates have a single-node schema
    const node = schema.nodes[0];
    if (node.lengths) return node.lengths[0];
    if (node.length) return node.length;
  }
  throw new Error(`Cannot determine chapter count for ${sefariaId}`);
}

async function fetchChapter(
  sefariaId: string,
  chapter: number
): Promise<Perek | null> {
  const ref = `${sefariaId}.${chapter}`;

  // Try with version param first, fall back to default
  let url = `${BASE_URL}/texts/${ref}?commentary=0&context=0&pad=0&language=both&ven=${encodeURIComponent(EN_VERSION)}`;
  let data = await fetchJson<SefariaTextResponse>(url);

  // If English is empty, retry without version constraint
  const enText = Array.isArray(data.text) ? data.text : [];
  const hasEnglish = enText.some((m) => (typeof m === "string" ? m : "") !== "");
  if (!hasEnglish) {
    url = `${BASE_URL}/texts/${ref}?commentary=0&context=0&pad=0&language=both`;
    data = await fetchJson<SefariaTextResponse>(url);
  }

  const heArr = (Array.isArray(data.he) ? data.he : []) as string[];
  const enArr = (Array.isArray(data.text) ? data.text : []) as string[];

  if (heArr.length === 0 && enArr.length === 0) return null;

  const count = Math.max(heArr.length, enArr.length);
  const mishnayot: Mishna[] = [];
  for (let i = 0; i < count; i++) {
    mishnayot.push({
      mishna: i + 1,
      hebrew: stripHtml(heArr[i] ?? ""),
      english: stripHtml(enArr[i] ?? ""),
    });
  }

  return { perek: chapter, mishnayot };
}

async function downloadTractate(
  def: (typeof SEDARIM)[0]["tractates"][0]
): Promise<Tractate> {
  console.log(`  Fetching ${def.name} (${def.sefariaId})...`);
  const chapterCount = await getChapterCount(def.sefariaId);
  console.log(`    ${chapterCount} chapters`);
  await sleep(DELAY_MS);

  const perakim: Perek[] = [];
  for (let ch = 1; ch <= chapterCount; ch++) {
    process.stdout.write(`    Chapter ${ch}/${chapterCount}\r`);
    const perek = await fetchChapter(def.sefariaId, ch);
    if (perek) perakim.push(perek);
    await sleep(DELAY_MS);
  }
  process.stdout.write("\n");

  return {
    name: def.name,
    hebrewName: def.hebrewName,
    sefariaId: def.sefariaId,
    perakim,
  };
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  for (const sederDef of SEDARIM) {
    console.log(`\nSeder: ${sederDef.name} (${sederDef.hebrewName})`);
    const tractates: Tractate[] = [];

    for (const tractDef of sederDef.tractates) {
      const tractate = await downloadTractate(tractDef);
      tractates.push(tractate);
    }

    const seder: Seder = {
      name: sederDef.name,
      hebrewName: sederDef.hebrewName,
      tractates,
    };

    const outPath = join(DATA_DIR, `${sederDef.key}.json`);
    writeFileSync(outPath, JSON.stringify(seder, null, 2), "utf-8");
    console.log(`Wrote ${outPath}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
