import { defineConfig } from "vite";
import { resolve } from "node:path";

// Disposable eval harness. It reads the notion's content files (which live
// OUTSIDE this folder, under ../content) via ?raw imports, so Vite's fs
// sandbox must be allowed to reach the repo root.
export default defineConfig({
  root: __dirname,
  server: {
    fs: { allow: [resolve(__dirname, "..")] },
    open: false,
  },
});
