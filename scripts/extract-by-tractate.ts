import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { SEDARIM } from "../src/tractates.js";
import type { Tractate } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../data");

mkdirSync(DATA_DIR, { recursive: true });

const SEDER_FILE_MAP: Record<string, string> = {
  Zeraim: "zeraim.json",
  Moed: "moed.json",
  Nashim: "nashim.json",
  Nezikin: "nezikin.json",
  Kodashim: "kodashim.json",
  Tahorot: "tahorot.json",
};

for (const seder of SEDARIM) {
  const sederFile = join(DATA_DIR, SEDER_FILE_MAP[seder.name]);
  const sederData = JSON.parse(readFileSync(sederFile, "utf-8"));

  for (const tractDef of seder.tractates) {
    const found = sederData.tractates.find(
      (t: { sefariaId: string }) => t.sefariaId === tractDef.sefariaId
    );
    if (!found) {
      console.error(`Missing: ${tractDef.sefariaId}`);
      continue;
    }

    const tractate: Tractate = {
      name: found.name,
      hebrewName: found.hebrewName,
      sefariaId: found.sefariaId,
      seder: seder.name,
      sederHebrewName: seder.hebrewName,
      perakim: found.perakim,
    };

    const outPath = join(DATA_DIR, `${tractDef.key}.json`);
    writeFileSync(outPath, JSON.stringify(tractate, null, 2), "utf-8");
    console.log(`Wrote ${tractDef.key}.json (${tractate.perakim.length} perakim)`);
  }
}

console.log("\nDone!");
