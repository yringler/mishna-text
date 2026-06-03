import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { SEDARIM } from "../src/tractates.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const index: Record<string, string> = {};

for (const seder of SEDARIM) {
  for (const tractate of seder.tractates) {
    index[tractate.name] = `${tractate.key}.json`;
  }
}

const outPath = join(__dirname, "../data/index.json");
writeFileSync(outPath, JSON.stringify(index, null, 2) + "\n");
console.log(`Wrote ${Object.keys(index).length} entries to ${outPath}`);
