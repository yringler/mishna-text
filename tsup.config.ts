import { defineConfig } from "tsup";
import { SEDARIM } from "./src/tractates.js";

const jsonExternals = SEDARIM.flatMap((s) =>
  s.tractates.map((t) => `../data/${t.key}.json`)
);

export default defineConfig([{
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  external: jsonExternals,
}, {
  entry: ["src/tractate-index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
}]);
