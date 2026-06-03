export type { Mishna, Perek, Tractate, Seder } from "./types.js";

import { createRequire } from "module";
import type { Seder } from "./types.js";

const _require = createRequire(import.meta.url);

export const ZERAIM: Seder = _require("../data/zeraim.json");
export const MOED: Seder = _require("../data/moed.json");
export const NASHIM: Seder = _require("../data/nashim.json");
export const NEZIKIN: Seder = _require("../data/nezikin.json");
export const KODASHIM: Seder = _require("../data/kodashim.json");
export const TAHOROT: Seder = _require("../data/tahorot.json");

export const ALL_SEDARIM: Seder[] = [
  ZERAIM,
  MOED,
  NASHIM,
  NEZIKIN,
  KODASHIM,
  TAHOROT,
];
