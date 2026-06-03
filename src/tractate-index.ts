import index from "../data/index.json" assert { type: "json" };

const tractateIndex: Record<string, string> = index;

export function getJsonFileName(englishName: string): string | undefined {
  return tractateIndex[englishName];
}
