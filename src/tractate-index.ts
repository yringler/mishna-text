import index from "../data/index.json" assert { type: "json" };
import type { Tractate } from "./types.js";

const tractateIndex: Record<string, string> = index;

export function getJsonFileName(englishName: string): string | undefined {
  return tractateIndex[englishName];
}

export async function getTractate(base: string, englishName: string): Promise<Tractate> {
  const fileName = getJsonFileName(englishName);
  if (!fileName) {
    throw new Error(`Tractate not found: ${englishName}`);
  }
  const { default: tractate } = await import(`${base}/${fileName}`, { assert: { type: "json" } });
  return tractate as Tractate;
}
