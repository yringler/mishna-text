import { createRequire } from "module";

export interface TractateDefinition {
  name: string;
  hebrewName: string;
  sefariaId: string;
  key: string;
  exportName: string;
}

export interface SederDefinition {
  name: string;
  hebrewName: string;
  tractates: TractateDefinition[];
}

const _require = createRequire(import.meta.url);

// Generated from the Sefaria table of contents by `scripts/download.ts`.
export const SEDARIM: SederDefinition[] = _require("../data/tractates.json");
