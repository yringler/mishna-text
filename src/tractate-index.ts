import index from "../data/index.json" assert { type: "json" };
import type { Tractate } from "./types.js";

const tractateIndex: Record<string, string> = index;
const tractateCache: Record<string, Tractate> = {};

export function getJsonFileName(englishName: string): string | undefined {
  return tractateIndex[englishName];
}

export async function getTractate(base: string, englishName: string): Promise<Tractate> {
  const fileName = getJsonFileName(englishName);
  if (!fileName) {
    throw new Error(`Tractate not found: ${englishName}`);
  }
  if (tractateCache[englishName]) {
    return tractateCache[englishName];
  }
  const tractate = await fetch(`${base}/${fileName}`).then(r => r.json()) as Tractate;
  tractateCache[englishName] = tractate;
  return tractateCache[englishName];
}
