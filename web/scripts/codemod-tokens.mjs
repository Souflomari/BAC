/**
 * codemod-tokens.mjs — rewrite arbitrary token utilities to their named
 * aliases, so the codebase speaks ONE syntax (Phase A / W4).
 *
 *   text-[var(--color-text-secondary)]  → text-secondary
 *   bg-[var(--color-surface-raised)]    → bg-surface-raised
 *   bg-[var(--color-border-subtle)]     → bg-border-subtle   (cross-role)
 *   border-[var(--color-border-subtle)] → border-subtle
 *   opacity-[var(--state-disabled)]     → opacity-disabled
 *   max-w-[var(--measure-prose)]        → max-w-reading
 *   tracking-[0.14em]                   → tracking-eyebrow
 *   min-h-[48px] / min-w-[48px]         → min-h-touch / min-w-touch
 *   max-w-[65ch] / max-w-[72ch]         → max-w-reading / max-w-content
 *
 * The token-name map is VALIDATED against src/lib/tokens.ts at runtime (throws
 * on any --var it doesn't know), so the codemod can never drift from the source.
 * Idempotent: a second run makes zero edits (asserted in the wave verification).
 *
 * Usage:
 *   node scripts/codemod-tokens.mjs [--only=colors|numeric|all] [--dry]
 *     --only=colors   the -[var(--…)] + opacity + measure-var rewrites (4a)
 *     --only=numeric  the raw-numeric rewrites (tracking/touch/measure) (4b)
 *     --dry           report counts, write nothing
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(WEB, "src");

const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
const { themes, invariant, motion } = jiti(path.join(WEB, "src/lib/tokens.ts"));

// Every CSS var the source defines — the codemod refuses to rewrite a reference
// to anything not in here (a typo or a removed token fails loudly).
const VALID_VARS = new Set([
  ...Object.keys(themes.light.vars),
  ...Object.keys(invariant),
  ...Object.keys(motion.duration).map((k) => `--duration-${k}`),
  ...Object.keys(motion.ease).map((k) => `--ease-${k}`),
]);

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith("--only=")) ?? "--only=all").split("=")[1];
const DRY = args.includes("--dry");
const doColors = only === "all" || only === "colors";
const doNumeric = only === "all" || only === "numeric";

const BORDER_PREFIXES = new Set([
  "border", "border-t", "border-b", "border-l", "border-r", "border-x", "border-y",
]);

// Arbitraries with no clean alias — kept as-is and allowlisted in the gate.
const KEEP = new Set(["accent-[var(--color-accent)]"]);

/** (utility prefix, color path after `--color-`) → the alias class. */
function colorAlias(prefix, colorPath) {
  if (prefix === "text" && colorPath.startsWith("text-")) return `text-${colorPath.slice(5)}`;
  if (BORDER_PREFIXES.has(prefix) && colorPath.startsWith("border-")) return `${prefix}-${colorPath.slice(7)}`;
  return `${prefix}-${colorPath}`;
}

// Raw-numeric exact rewrites (4b).
const NUMERIC = [
  ["tracking-[0.14em]", "tracking-eyebrow"],
  ["min-h-[48px]", "min-h-touch"],
  ["min-w-[48px]", "min-w-touch"],
  ["max-w-[65ch]", "max-w-reading"],
  ["max-w-[72ch]", "max-w-content"],
];

function transform(src, file) {
  let out = src;
  let n = 0;
  if (doColors) {
    out = out.replace(/\b([a-z]+(?:-[a-z]+)*)-\[var\(--([a-z-]+)\)\]/g, (m, prefix, varName) => {
      if (KEEP.has(m)) return m;
      const full = `--${varName}`;
      if (!VALID_VARS.has(full)) throw new Error(`${file}: "${m}" references unknown token ${full} (not in tokens.ts)`);
      let alias;
      if (varName.startsWith("color-")) alias = colorAlias(prefix, varName.slice(6));
      else if (varName === "state-disabled" && prefix === "opacity") alias = "opacity-disabled";
      else if (varName === "measure-prose" && prefix === "max-w") alias = "max-w-reading";
      else if (varName === "measure-wide" && prefix === "max-w") alias = "max-w-content";
      else throw new Error(`${file}: "${m}" — no alias rule for prefix "${prefix}" + ${full}`);
      n++;
      return alias;
    });
  }
  if (doNumeric) {
    for (const [from, to] of NUMERIC) {
      const parts = out.split(from);
      if (parts.length > 1) {
        n += parts.length - 1;
        out = parts.join(to);
      }
    }
  }
  return { out, n };
}

/** All .ts/.tsx under src/. */
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?)$/.test(entry)) acc.push(p);
  }
  return acc;
}

const files = walk(SRC);
let total = 0;
const touched = [];
for (const file of files) {
  const src = readFileSync(file, "utf8");
  const { out, n } = transform(src, path.relative(WEB, file));
  if (n > 0) {
    total += n;
    touched.push([path.relative(WEB, file), n]);
    if (!DRY) writeFileSync(file, out);
  }
}

touched.sort((a, b) => b[1] - a[1]);
for (const [f, n] of touched.slice(0, 20)) console.log(`  ${String(n).padStart(3)}  ${f}`);
console.log(
  `\ncodemod-tokens [--only=${only}]${DRY ? " --dry" : ""}: ${total} rewrite(s) across ${touched.length} file(s)`,
);
