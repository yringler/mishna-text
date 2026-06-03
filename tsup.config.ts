import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: ["src/tractate-index.ts"],
        format: ["esm", "cjs"],
        dts: true,
        splitting: false,
    },
]);
