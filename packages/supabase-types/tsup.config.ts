import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  shims: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  clean: true,
});
