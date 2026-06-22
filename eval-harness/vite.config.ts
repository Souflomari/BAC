import { defineConfig } from "vite";
import { resolve } from "node:path";
import { viteSingleFile } from "vite-plugin-singlefile";

// Disposable eval harness. It reads the notion's content files (which live
// OUTSIDE this folder, under ../content) via ?raw imports, so Vite's fs
// sandbox must be allowed to reach the repo root.
//
// `npm run build` emits ONE fully self-contained dist/index.html: JS, CSS, the
// KaTeX fonts, and all content are inlined (no external requests), so it opens
// by double-click on any machine with just a browser — no Node, no server, no
// internet. `assetsInlineLimit: Infinity` forces fonts to base64 data URIs so
// the single-file plugin can fold everything in.
export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [viteSingleFile()],
  server: {
    fs: { allow: [resolve(__dirname, "..")] },
    open: false,
  },
  build: {
    assetsInlineLimit: Infinity,
    cssCodeSplit: false,
  },
});
