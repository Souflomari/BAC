/**
 * dom-truth.mjs — the rendered-truth instrument (audit U1/U8, Day 2).
 *
 * Asserts COMPUTED styles in the live DOM against the design tokens. Exists
 * because five audit rounds verified class names and token files while the
 * whole type hierarchy rendered at 16px (docs/audits/fable-ui-content-audit.md
 * §1, finding U1). Standing rule: a visual claim is verified only against the
 * rendered DOM — never against source class names.
 *
 * CI-shaped: builds nothing itself; expects a production build to exist
 * (`npm run build`), starts `next start` on a scratch port, runs the battery,
 * prints a PASS/FAIL table, exits non-zero on any violation.
 *
 * Expectations are DERIVED, not hardcoded:
 *   - font sizes / line-heights / weights → parsed from tailwind.config.ts
 *     (the executable form of TOKENS.md §2.2/§2.3)
 *   - prose heading sizes → parsed from globals.css (.prose-lesson rules)
 *   - colors → resolved at runtime from the CSS custom properties on :root,
 *     compared to the element's computed color (theme-proof by construction)
 *   - spacing → the 8-pt grid table (TOKENS.md §3): Tailwind scale unit = 4px
 *
 * Usage: node scripts/dom-truth.mjs   (from web/; or `npm run dom-truth`)
 */

import { chromium } from "playwright-core";
import { spawn } from "child_process";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = 3124;
const BASE = `http://localhost:${PORT}`;

// ── Expectations, derived from the token sources ──────────────────────────────

/** Parse tailwind.config.ts fontSize entries → { key: { px, lineHeightPx } } */
function parseFontSizes() {
  const src = readFileSync(path.join(WEB, "tailwind.config.ts"), "utf8");
  const out = {};
  const re = /"([\w-]+)":\s*\["([\d.]+)rem",\s*\{\s*lineHeight:\s*"([\d.]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const px = parseFloat(m[2]) * 16;
    out[m[1]] = { px, lineHeightPx: px * parseFloat(m[3]) };
  }
  if (!out.h1 || !out.display || !out.caption) {
    throw new Error("dom-truth: failed to parse fontSize tokens from tailwind.config.ts — update the parser with the config format");
  }
  return out;
}

/** Parse globals.css for .prose-lesson h2/h3 sizes (rem) → px */
function parseProseSizes() {
  const src = readFileSync(path.join(WEB, "src/app/globals.css"), "utf8");
  const grab = (sel) => {
    const m = src.match(new RegExp(`\\.prose-lesson ${sel} \\{ font-size: ([\\d.]+)rem`));
    if (!m) throw new Error(`dom-truth: failed to parse .prose-lesson ${sel} size from globals.css`);
    return parseFloat(m[1]) * 16;
  };
  return { h2: grab("h2"), h3: grab("h3") };
}

const FS = parseFontSizes();
const PROSE = parseProseSizes();
const GRID_UNIT = 4; // TOKENS.md §3 — Tailwind scale: 1 unit = 4px (p-6 = 24px)

/**
 * The battery. Each entry:
 *  { name, page, sel, text?, fontKey? | fontPx?, lineHeight?: true,
 *    weight?, family?, colorVar?, notText?, pad?: units }
 * `sel` may match several nodes; `text` filters by textContent inclusion.
 * Class-name selectors are used only to FIND nodes — every assertion is
 * against computed style (the rendered-truth rule).
 */
const NOTION = "/notions/pc/rlc-serie";
const BATTERY = [
  // ── U1 table (the audit's measured victims) ──
  { name: "notion masthead h1", page: NOTION, sel: "h1", text: "Oscillations", fontKey: "h1", lineHeight: true, weight: "700", family: "Source Serif", colorVar: "--color-text-primary" },
  { name: "home h1", page: "/", sel: "h1", text: "Notions", fontKey: "display", weight: "700", family: "Source Serif" },
  { name: "home lead", page: "/", sel: "header p", text: "Chaque notion", fontKey: "lead" },
  { name: "home section h2", page: "/", sel: "section h2", text: "Mathématiques", fontKey: "h3", weight: "600" },
  { name: "home card title h3", page: "/", sel: "h3", text: "Oscillations", fontKey: "h4", weight: "600" },
  { name: "404 hero display", page: "/nonexistent-xyz", sel: "span", text: "404", fontKey: "display", weight: "700" },
  { name: "404 h1", page: "/nonexistent-xyz", sel: "h1", text: "introuvable", fontKey: "h2", weight: "700" },
  // ── survivors (must stay green — regression tripwires) ──
  { name: "prose rung h2", page: NOTION, sel: ".prose-lesson h2", text: "Accroche", fontPx: PROSE.h2, weight: "600", family: "Source Serif" },
  { name: "items h2", page: NOTION, sel: "h2", text: "Exercices", fontKey: "h2", weight: "700", family: "Source Serif" },
  // ── code-verified unmeasured victims from the audit ──
  { name: "masthead eyebrow (accent tone)", page: NOTION, sel: "header p, p", text: "Physique-Chimie", fontKey: "caption", colorVar: "--color-accent" },
  { name: "home card eyebrow (muted tone)", page: "/", sel: "a p", text: "Physique-Chimie", fontKey: "caption", colorVar: "--color-text-secondary" },
  { name: "MCQ stem", page: NOTION, sel: "[class*='text-body-lg']", fontKey: "body-lg" },
  // li scoping: the header FontSizeStepper buttons also carry aria-pressed
  { name: "MCQ choice row", page: NOTION, sel: "li button[aria-pressed]", fontKey: "body", weight: "400" },
  { name: "motion step indicator", page: NOTION, sel: "span[aria-live='polite']", text: "Étape", fontKey: "caption" },
  { name: "motion figcaption", page: NOTION, sel: "figcaption", fontKey: "body-sm" },
  // TODO(post-answer states): the solution <summary> and correctness rows only
  // exist after answering an item — battery v2 should drive one interaction.
  { name: "card 'Ouvrir' row", page: "/", sel: "a span", text: "Ouvrir", fontKey: "body-sm", weight: "500" },
  // ── de-jargon guards (audit U3, Day-2 items) ──
  { name: "rail resting label is a word, not a code", page: NOTION, sel: ".notion-rail a", text: "Accroche", fontKey: "caption", notText: /^R\d+/ },
  { name: "no authoring flags rendered", page: NOTION, sel: "h2", text: "Exercice de type bac", notText: /à sourcer|synthèse —/ },
  // ── representative spacing (TOKENS.md §3: 8-pt grid) ──
  { name: "home card padding = p-6 (24px)", page: "/", sel: "a[href*='notions']", text: "Oscillations", pad: 6 },
  // ── breadcrumb stays designed size ──
  { name: "breadcrumb", page: NOTION, sel: "nav[aria-label*='Fil']", fontKey: "body-sm" },
];

// ── Runner ────────────────────────────────────────────────────────────────────

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  return 1;
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore" });
try {
  await new Promise((r) => setTimeout(r, 4000));
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });

  // Group battery by page to load each page once
  const byPage = new Map();
  for (const b of BATTERY) {
    if (!byPage.has(b.page)) byPage.set(b.page, []);
    byPage.get(b.page).push(b);
  }

  let failures = 0;
  let checks = 0;

  for (const [route, entries] of byPage) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const results = await page.evaluate((specs) => {
      const out = [];
      for (const s of specs) {
        let el = null;
        for (const cand of document.querySelectorAll(s.sel)) {
          const t = cand.textContent || "";
          if (!s.text || t.includes(s.text)) { el = cand; break; }
        }
        if (!el) { out.push({ name: s.name, missing: true }); continue; }
        const cs = getComputedStyle(el);
        const root = getComputedStyle(document.documentElement);
        // Resolve a CSS var to its computed rgb by painting it on a probe node
        let varColor = null;
        if (s.colorVar) {
          const probe = document.createElement("span");
          probe.style.color = `var(${s.colorVar})`;
          document.body.appendChild(probe);
          varColor = getComputedStyle(probe).color;
          probe.remove();
        }
        out.push({
          name: s.name,
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          color: cs.color,
          varColor,
          padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft],
          textHead: (el.textContent || "").trim().slice(0, 60),
          rootFont: root.fontSize,
        });
      }
      return out;
    }, entries);

    for (let i = 0; i < entries.length; i++) {
      const spec = entries[i];
      const r = results[i];
      console.log(`\n[${spec.page}] ${spec.name}`);
      if (r.missing) { failures += fail("element not found"); continue; }

      const expectPx = spec.fontKey ? FS[spec.fontKey].px : spec.fontPx;
      if (expectPx != null) {
        checks++;
        const got = parseFloat(r.fontSize);
        if (Math.abs(got - expectPx) > 0.1) failures += fail(`font-size ${r.fontSize} ≠ ${expectPx}px (${spec.fontKey ?? "css"})`);
        else console.log(`  ✓ font-size ${r.fontSize}`);
      }
      if (spec.lineHeight && spec.fontKey) {
        checks++;
        const want = FS[spec.fontKey].lineHeightPx;
        const got = parseFloat(r.lineHeight);
        if (Math.abs(got - want) > 0.75) failures += fail(`line-height ${r.lineHeight} ≠ ~${want.toFixed(1)}px`);
        else console.log(`  ✓ line-height ${r.lineHeight}`);
      }
      if (spec.weight) {
        checks++;
        if (r.fontWeight !== spec.weight) failures += fail(`font-weight ${r.fontWeight} ≠ ${spec.weight}`);
        else console.log(`  ✓ weight ${r.fontWeight}`);
      }
      if (spec.family) {
        checks++;
        // next/font renames families ("__Source_Serif_4_3cc574") — normalize
        // separators before matching so the check survives font loading.
        const norm = (s) => s.replace(/[_\s]+/g, " ").toLowerCase();
        if (!norm(r.fontFamily).includes(norm(spec.family))) failures += fail(`family "${r.fontFamily.slice(0, 40)}…" ∌ ${spec.family}`);
        else console.log(`  ✓ family ${spec.family}`);
      }
      if (spec.colorVar) {
        checks++;
        if (r.color !== r.varColor) failures += fail(`color ${r.color} ≠ var(${spec.colorVar}) = ${r.varColor}`);
        else console.log(`  ✓ color = var(${spec.colorVar})`);
      }
      if (spec.pad != null) {
        checks++;
        const want = `${spec.pad * GRID_UNIT}px`;
        const bad = r.padding.filter((p) => p !== want);
        if (bad.length) failures += fail(`padding [${r.padding.join(" ")}] ≠ ${want} all around`);
        else console.log(`  ✓ padding ${want}`);
      }
      if (spec.notText) {
        checks++;
        const re = new RegExp(spec.notText.source ?? spec.notText);
        if (re.test(r.textHead)) failures += fail(`text "${r.textHead}" matches forbidden ${re}`);
        else console.log(`  ✓ text clean ("${r.textHead.slice(0, 32)}…")`);
      }
    }
  }

  await browser.close();
  console.log(`\n━━ dom-truth: ${checks} checks, ${failures} failure(s) ━━`);
  process.exitCode = failures > 0 ? 1 : 0;
} finally {
  server.kill();
}
