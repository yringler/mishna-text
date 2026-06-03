import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  external: [
    "../data/zeraim.json",
    "../data/moed.json",
    "../data/nashim.json",
    "../data/nezikin.json",
    "../data/kodashim.json",
    "../data/tahorot.json",
  ],
});
