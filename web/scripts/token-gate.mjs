/**
 * token-gate.mjs — the arbitrary-value guard (Phase A / W5).
 *
 * The design system has ONE consumption syntax: named token aliases from
 * tailwind.config (fed by src/lib/tokens.ts). This gate keeps it that way — it
 * fails when component code reaches around the aliases with an arbitrary value:
 *
 *   -[var(--…)]    a raw CSS-var utility        → use the alias (text-secondary…)
 *   -[#rrggbb]     an arbitrary hex color        → use a token
 *   tracking-[…]   arbitrary letter-spacing      → tracking-eyebrow
 *   z-[…]          arbitrary z-index             → z-raised/header/overlay
 *   min-h/w-[48px] arbitrary touch target        → min-h-touch / min-w-touch
 *   duration-[…] / ease-[…]  arbitrary motion    → the motion tokens
 *
 * NOT flagged: data-[…]/supports-[…]/aria-[…] variants, and one-off figure/
 * layout geometry in ch/px (w-[36ch], h-[460px]) which is content-shaped, not a
 * token. Two escape hatches: an exact allowlist (a form control's accent-color
 * has no clean alias), and a `token-gate-allow` marker on the offending or
 * preceding line for a deliberate one-off.
 *
 * Runs standalone (`npm run token-gate`, exit 1 on any violation) and is
 * imported by dom-truth.mjs as its first gate.
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(WEB, "src");

// Exact strings with no clean alias — permanently allowed.
const ALLOW_EXACT = ["accent-[var(--color-accent)]"];
// A line (or the line above it) carrying this marker opts out of the gate.
const ESCAPE = "token-gate-allow";

const RULES = [
  { name: "arbitrary CSS var", re: /-\[var\(--/, hint: "use the named alias (e.g. text-secondary, bg-surface-raised)" },
  { name: "arbitrary hex color", re: /-\[#[0-9a-fA-F]{3,8}\]/, hint: "use a color token" },
  { name: "arbitrary letter-spacing", re: /\btracking-\[/, hint: "use tracking-eyebrow" },
  { name: "arbitrary z-index", re: /\bz-\[/, hint: "use z-raised / z-header / z-overlay" },
  { name: "arbitrary touch target", re: /\bmin-[hw]-\[48px\]/, hint: "use min-h-touch / min-w-touch" },
  { name: "arbitrary motion", re: /\b(?:duration|ease)-\[/, hint: "use a motion token (duration-*, ease-*)" },
  // R5 (refonte Studio) : l'échelle M3 est la SEULE échelle de rupture —
  // theme.screens est REMPLACÉ, pas étendu. Une classe sm:/md:/lg:/xl:/2xl:
  // écrite par réflexe ne produit RIEN, silencieusement ; ce piège a déjà
  // mordu (codemod R2). La porte la rend bruyante.
  { name: "dead default breakpoint", re: /(^|[^a-zA-Z0-9-])(?:sm|md|lg|xl|2xl):[a-z[]/, hint: "use the M3 scale: bp-medium / bp-expanded / bp-large / bp-xl" },
];

/** All .ts/.tsx/.js/.jsx under src/. */
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?)$/.test(entry)) acc.push(p);
  }
  return acc;
}

/** Scan src/ and return an array of violations. */
export function scanTokenGate() {
  const violations = [];
  for (const file of walk(SRC)) {
    const lines = readFileSync(file, "utf8").split("\n");
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.includes(ESCAPE) || (i > 0 && lines[i - 1].includes(ESCAPE))) continue;
      // Remove allowlisted exact strings before testing.
      for (const ok of ALLOW_EXACT) line = line.split(ok).join("");
      for (const rule of RULES) {
        if (rule.re.test(line)) {
          violations.push({ file: path.relative(WEB, file), line: i + 1, rule: rule.name, hint: rule.hint, text: lines[i].trim().slice(0, 100) });
        }
      }
    }
  }
  return violations;
}

const isMain = import.meta.url === pathToFileURL(process.argv[1] ?? "").href;
if (isMain) {
  const v = scanTokenGate();
  if (v.length === 0) {
    console.log("token-gate: no arbitrary token usage — one syntax holds ✓");
    process.exit(0);
  }
  console.error(`token-gate: ${v.length} arbitrary-value violation(s) — use the named token aliases:\n`);
  for (const x of v) {
    console.error(`  ${x.file}:${x.line}  [${x.rule}] ${x.hint}`);
    console.error(`      ${x.text}`);
  }
  console.error(`\n(An intentional one-off can carry a "${ESCAPE}" comment on the line or the line above.)`);
  process.exit(1);
}
