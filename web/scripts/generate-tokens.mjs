/**
 * generate-tokens.mjs — emit src/app/tokens.generated.css from the single
 * source of truth (src/lib/tokens.ts).
 *
 * The generated file carries ONLY the CSS custom-property blocks: one
 * selector per theme (`:root`, `.dark`), with the theme-independent
 * `invariant` tokens folded into `:root`. Everything else in tokens.ts
 * (typeScale / radius / screens) is consumed by tailwind.config.ts, not
 * emitted as CSS vars.
 *
 * Modes:
 *   node scripts/generate-tokens.mjs           → WRITE the file
 *   node scripts/generate-tokens.mjs --check    → verify on-disk == generated,
 *                                                 exit 1 on drift (the `prebuild`
 *                                                 gate: a stale generated file
 *                                                 fails the build loudly, on
 *                                                 Vercel and locally).
 *
 * The source .ts is loaded via jiti (already a devDep; the same mechanism
 * dom-truth uses), so tokens.ts stays a normal typed module with no build step.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(WEB, "src/app/tokens.generated.css");

const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
const { themes, invariant, motion } = jiti(path.join(WEB, "src/lib/tokens.ts"));

/** Motion → flat CSS custom properties (`--duration-*`, `--ease-*`). */
function motionVars() {
  const out = {};
  for (const [k, v] of Object.entries(motion.duration)) out[`--duration-${k}`] = v;
  for (const [k, v] of Object.entries(motion.ease)) out[`--ease-${k}`] = v;
  return out;
}

const HEADER = `/* GENERATED FILE — DO NOT EDIT.
   Source of truth: src/lib/tokens.ts
   Regenerate: node scripts/generate-tokens.mjs
   Verify (runs as \`prebuild\`): node scripts/generate-tokens.mjs --check
   Every value here is transcribed from tokens.ts; edit the source, not this file. */
`;

/** One `selector { --k: v; … }` block. */
function emitBlock(selector, vars) {
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`);
  return `${selector} {\n${lines.join("\n")}\n}\n`;
}

/**
 * LE BLOC D'IMPRESSION — le papier n'a pas de thème.
 *
 * Mesuré le 2026-09-05 (`web/scripts/impression.mjs`) : un élève qui lit en
 * thème sombre et qui imprime sa leçon obtenait des figures sur fond
 * `#1A1917`. Des aplats noirs pleine page : une cartouche vidée, et une
 * feuille sur laquelle on ne peut plus annoter au stylo. Le bloc
 * `@media print` de `globals.css` remettait bien le corps en blanc, mais il
 * ne touchait pas aux jetons de FIGURE — et la classe `.dark` de ce fichier,
 * de même spécificité et déclarée après, gardait la main.
 *
 * Le correctif appartient ICI et non à `globals.css` : la palette a une
 * source unique, et une deuxième liste de couleurs écrite à la main dériverait
 * dès la première retouche. On réémet donc le thème CLAIR, tel quel, sous
 * `@media print`, pour `:root` comme pour `.dark`.
 */
function emitPrint() {
  const vars = themes.light.vars;
  const lignes = Object.entries(vars).map(([k, v]) => `    ${k}: ${v};`);
  return (
    "/* Le papier n'a pas de thème : le clair, quel que soit ce qu'on lit à l'écran.\n" +
    "   Voir docs/audits/impression.md — mesuré, pas supposé. */\n" +
    "@media print {\n" +
    `  :root,\n  :root.dark {\n${lignes.join("\n")}\n    color-scheme: light;\n  }\n` +
    "}\n"
  );
}

function generate() {
  const blocks = Object.values(themes).map((theme) => {
    // The theme-independent tokens (invariant + the flattened motion vars)
    // live in :root alongside the light theme; every other selector carries
    // only its own theme-varying overrides.
    const vars =
      theme.selector === ":root"
        ? { ...theme.vars, ...invariant, ...motionVars() }
        : theme.vars;
    return emitBlock(theme.selector, vars);
  });
  return `${HEADER}\n${blocks.join("\n")}\n${emitPrint()}`;
}

const generated = generate();
const isCheck = process.argv.includes("--check");

if (isCheck) {
  let onDisk = null;
  try {
    onDisk = readFileSync(OUT, "utf8");
  } catch {
    console.error(
      "generate-tokens: tokens.generated.css is missing — run `node scripts/generate-tokens.mjs`."
    );
    process.exit(1);
  }
  if (onDisk !== generated) {
    console.error(
      "generate-tokens: tokens.generated.css is STALE (drifted from src/lib/tokens.ts).\n" +
        "Run `node scripts/generate-tokens.mjs` and commit the result."
    );
    process.exit(1);
  }
  console.log("generate-tokens: tokens.generated.css is up to date ✓");
} else {
  writeFileSync(OUT, generated);
  const count =
    Object.keys(themes.light.vars).length +
    Object.keys(invariant).length +
    Object.keys(motionVars()).length +
    Object.keys(themes.dark.vars).length;
  console.log(
    `generate-tokens: wrote ${OUT} (${count} custom-property declarations across ${Object.keys(themes).length} themes) ✓`
  );
}
