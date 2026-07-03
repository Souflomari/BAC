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
// Unique port per run — a fixed port raced ORPHANED servers from prior runs
// (killing the npx wrapper orphans the next-server child; the detached spawn +
// process-group kill below fixes the orphaning itself).
const PORT = 3200 + (process.pid % 500);
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
  { name: "notion masthead h1 (A3 display-lg)", page: NOTION, sel: "h1", text: "Oscillations", fontKey: "display-lg", lineHeight: true, weight: "700", family: "Source Serif", colorVar: "--color-text-primary" },
  { name: "home h1", page: "/", sel: "h1", text: "Ta session", fontKey: "display", weight: "700", family: "Source Serif" },
  { name: "home lead", page: "/", sel: "header p", text: "Deux heures", fontKey: "lead" },
  { name: "home session-card h2 (B1 primary)", page: "/", sel: "section[aria-label*='session'] h2", fontKey: "h2", weight: "700", family: "Source Serif" },
  { name: "home library row title", page: "/", sel: "section[aria-label='Toutes les notions'] a span", text: "Oscillations", fontKey: "lead", family: "Source Serif" },
  { name: "404 hero display", page: "/nonexistent-xyz", sel: "span", text: "404", fontKey: "display", weight: "700" },
  { name: "404 h1", page: "/nonexistent-xyz", sel: "h1", text: "introuvable", fontKey: "h2", weight: "700" },
  // ── survivors (must stay green — regression tripwires) ──
  { name: "prose rung h2", page: NOTION, sel: ".prose-lesson h2", text: "Accroche", fontPx: PROSE.h2, weight: "600", family: "Source Serif" },
  { name: "items h2", page: NOTION, sel: "h2", text: "Exercices", fontKey: "h2", weight: "700", family: "Source Serif" },
  // ── code-verified unmeasured victims from the audit ──
  // (The two Eyebrow instances measured on Day 2 were REMOVED in the Day-3
  // doubled-label kill (audit U3) — the masthead eyebrow duplicated the
  // breadcrumb, the card eyebrow duplicated the section heading. The Eyebrow
  // component remains in the library; when it regains a live instance, add it
  // back to the battery.)
  { name: "MCQ stem", page: NOTION, sel: "[class*='text-body-lg']", fontKey: "body-lg" },
  // li scoping: the header FontSizeStepper buttons also carry aria-pressed
  { name: "MCQ choice row", page: NOTION, sel: "li button[aria-pressed]", fontKey: "body", weight: "400" },
  { name: "motion step indicator", page: NOTION, sel: "span[aria-live='polite']", text: "Étape", fontKey: "caption" },
  { name: "motion figcaption", page: NOTION, sel: "figcaption", fontKey: "body-sm" },
  // TODO(post-answer states): the solution <summary> and correctness rows only
  // exist after answering an item — battery v2 should drive one interaction.
  // ── de-jargon guards (audit U3, Day-2/3 items) ──
  { name: "rail resting label is a word, not a code", page: NOTION, sel: ".notion-rail a", text: "Accroche", fontKey: "caption", notText: /^R\d+/ },
  { name: "no authoring flags rendered", page: NOTION, sel: "h2", text: "Exercice de type bac", notText: /à sourcer|synthèse —/ },
  { name: "prose headings carry no R-codes", page: NOTION, sel: ".prose-lesson h2[data-rung]", notText: /^R\d/ },
  // ── representative spacing (TOKENS.md §3: 8-pt grid) ──
  { name: "session card padding = p-8 (32px)", page: "/", sel: "section[aria-label*='session'] > div > div", pad: 8 },
  // ── breadcrumb stays designed size ──
  { name: "breadcrumb", page: NOTION, sel: "nav[aria-label*='Fil']", fontKey: "body-sm" },
  // ── Day-3 web-native texture invariants (audit amendment #3) ──
  { name: "footer exists (page ends)", page: NOTION, sel: "footer", present: true },
  { name: "footer exists on home", page: "/", sel: "footer", present: true },
  { name: "heading anchors present", page: NOTION, sel: ".prose-lesson h2 a.heading-anchor", present: true },
  { name: "masthead metadata line", page: NOTION, sel: "header p", text: "min de lecture", fontKey: "body-sm" },
  { name: "::selection is the warm wash", page: NOTION, sel: ".prose-lesson", selectionVar: "--color-accent-subtle" },
  // ── Day-3 shared spine: wordmark and content column share a left edge ──
  { name: "spine: header aligns with main", page: NOTION, sel: "header > div", alignWith: "main" },
  { name: "spine: footer aligns with main", page: NOTION, sel: "footer > div", alignWith: "main" },
  // ── Day-4 frozen anatomy (A3 band, B1 honest state, C1 footer, LessonEnd) ──
  { name: "masthead band present (A3)", page: NOTION, sel: "[data-band='masthead']", bgVar: "--color-surface-container-low" },
  { name: "LessonEnd present", page: NOTION, sel: "[data-lesson-end]", text: "Et maintenant", present: true },
  { name: "footer = C1 contents", page: NOTION, sel: "footer", text: "cadre de référence", present: true },
  { name: "B1 primary action present", page: "/", sel: "main a[class*='btn-primary']", text: "Commencer", present: true },
  { name: "HONEST STATE: no fabricated progress", page: "/", sel: "main", notText: /en cours|Reprendre|vu récemment|Ensuite/, absentSel: "[role='progressbar']" },
  // ── Day-5 attempt-first summit (audit C1): reasoning NEVER in DOM pre-commit ──
  { name: "R8 is attempt-first (no printed solutions)", page: NOTION, sel: "[data-exercise='r8-bac']", present: true, notText: /Raisonnement expert/ },
  { name: "R9 is attempt-first (no printed solutions)", page: NOTION, sel: "[data-exercise='r9-variation']", present: true, notText: /Raisonnement expert/ },
  { name: "hook commits via checkpoint (C5)", page: NOTION, sel: "div[aria-label*='Vérifie']", present: true },
  // ── Day-6 stepped derivations (§7): later steps NOT in DOM pre-reveal ──
  { name: "R2 derivation present, step 1 only", page: NOTION, sel: "[data-derivation='verification-cosinus']", present: true, absentSel: "[data-derivation='verification-cosinus'] [data-step='2']" },
  // ── Day-6 covers (COVER-SPEC): the shelf is illustrated ──
  { name: "covers present on home shelf", page: "/", sel: "[data-cover='rlc-serie']", present: true },
  // ── Day-3 rail: labels never ellipsize ──
  { name: "rail labels not truncated", page: NOTION, sel: ".notion-rail a > span[class*='bp-expanded']", noOverflow: true },
  // ── Day-6 followability: section ordinals. The fragile invariant is counter
  //    SCOPE — reset must live on the whole content column; markers split the
  //    prose into several .prose-lesson containers, so a per-container reset
  //    would restart numbering at every figure. cssExpect = regex source. ──
  { name: "rung counter resets on the content column", page: NOTION, sel: ".notion-content", cssProp: "counter-reset", cssExpect: "rung" },
  { name: "prose containers do NOT reset the rung counter", page: NOTION, sel: ".prose-lesson", cssProp: "counter-reset", cssExpect: "^none$" },
  { name: "rung headings increment the counter", page: NOTION, sel: ".prose-lesson h2[data-rung]", cssProp: "counter-increment", cssExpect: "rung" },
  // ── Day-6 motion coverage: the two commissioned figures resolve to real
  //    MotionStage instances (an unknown slug is a SILENT no-op in NotionBody —
  //    presence is the only rendered proof the marker wired up). ──
  { name: "R3 motion present (amortissement-energie)", page: NOTION, sel: "figure[aria-label*='dissipée dans R']", present: true },
  { name: "R7 motion present (entretien-compensation)", page: NOTION, sel: "figure[aria-label*='compense la perte Joule']", present: true },
  // ── Day-7 portability-test acceptance (instruments FIRST: these rows were
  //    committed with the briefs, red until each article lands) ──
  { name: "DAY7(b): rc-charge notion renders with masthead band", page: "/notions/pc/rc-charge", sel: "[data-band='masthead']", bgVar: "--color-surface-container-low" },
  { name: "DAY7(b): rc-charge rung section renders", page: "/notions/pc/rc-charge", sel: ".prose-lesson h2[data-rung]", present: true, notText: /^R\d/ },
  { name: "DAY7(c): i-de-t derivation present, step 1 only", page: NOTION, sel: "[data-derivation='i-de-t']", present: true, absentSel: "[data-derivation='i-de-t'] [data-step='2']" },
  // (d): data-motif must be the notion's OWN motif — the pc fallback also
  // carries data-cover='rc-charge', which made the original presence-only
  // row go green before the article ran (instrument bug, fixed Day 7).
  { name: "DAY7(d): rc-charge cover has its own motif", page: "/", sel: "[data-cover='rc-charge'][data-motif='rc-charge']", present: true },
];

// ── Runner ────────────────────────────────────────────────────────────────────

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  return 1;
}

// detached → own process group, so the finally-block kill reaches the actual
// next-server child, not just the npx wrapper (orphan prevention).
const server = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
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
        // Background var equality (bands/tonal surfaces)
        let bg = null, varBg = null;
        if (s.bgVar) {
          bg = cs.backgroundColor;
          const probe = document.createElement("span");
          probe.style.backgroundColor = `var(${s.bgVar})`;
          document.body.appendChild(probe);
          varBg = getComputedStyle(probe).backgroundColor;
          probe.remove();
        }
        const absentFound = s.absentSel ? !!document.querySelector(s.absentSel) : false;
        // ::selection background (chromium supports pseudo-element arg)
        let selectionBg = null;
        let selectionVarBg = null;
        if (s.selectionVar) {
          selectionBg = getComputedStyle(el, "::selection").backgroundColor;
          const probe = document.createElement("span");
          probe.style.backgroundColor = `var(${s.selectionVar})`;
          document.body.appendChild(probe);
          selectionVarBg = getComputedStyle(probe).backgroundColor;
          probe.remove();
        }
        // Spine alignment: left edge + padding-left vs another element
        let align = null;
        if (s.alignWith) {
          const other = document.querySelector(s.alignWith);
          if (other) {
            const oc = getComputedStyle(other);
            align = {
              left: el.getBoundingClientRect().left,
              otherLeft: other.getBoundingClientRect().left,
              pad: cs.paddingLeft,
              otherPad: oc.paddingLeft,
            };
          }
        }
        out.push({
          name: s.name,
          // Arbitrary computed property probe (e.g. counter-reset scoping)
          cssPropVal: s.cssProp ? cs.getPropertyValue(s.cssProp) : null,
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
          fontWeight: cs.fontWeight,
          fontFamily: cs.fontFamily,
          color: cs.color,
          varColor,
          selectionBg,
          selectionVarBg,
          bg,
          varBg,
          absentFound,
          align,
          overflowing: el.scrollWidth > el.clientWidth + 1,
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
      if (spec.present) {
        checks++;
        console.log(`  ✓ present`);
      }
      if (spec.selectionVar) {
        checks++;
        if (r.selectionBg !== r.selectionVarBg) failures += fail(`::selection bg ${r.selectionBg} ≠ var(${spec.selectionVar}) = ${r.selectionVarBg}`);
        else console.log(`  ✓ ::selection = var(${spec.selectionVar})`);
      }
      if (spec.alignWith) {
        checks++;
        if (!r.align) failures += fail(`alignWith target "${spec.alignWith}" not found`);
        else if (Math.abs(r.align.left - r.align.otherLeft) > 0.5 || r.align.pad !== r.align.otherPad) {
          failures += fail(`spine broken: left ${r.align.left} vs ${r.align.otherLeft}, pad ${r.align.pad} vs ${r.align.otherPad}`);
        } else console.log(`  ✓ spine aligned (left ${r.align.left}px, pad ${r.align.pad})`);
      }
      if (spec.bgVar) {
        checks++;
        if (r.bg !== r.varBg) failures += fail(`background ${r.bg} ≠ var(${spec.bgVar}) = ${r.varBg}`);
        else console.log(`  ✓ background = var(${spec.bgVar})`);
      }
      if (spec.absentSel) {
        checks++;
        if (r.absentFound) failures += fail(`forbidden element present: ${spec.absentSel}`);
        else console.log(`  ✓ absent: ${spec.absentSel}`);
      }
      if (spec.noOverflow) {
        checks++;
        if (r.overflowing) failures += fail(`label overflows its box ("${r.textHead.slice(0, 32)}…")`);
        else console.log(`  ✓ no truncation`);
      }
      if (spec.cssProp) {
        checks++;
        const re = new RegExp(spec.cssExpect);
        if (!re.test(r.cssPropVal ?? "")) failures += fail(`${spec.cssProp}: "${r.cssPropVal}" does not match ${re}`);
        else console.log(`  ✓ ${spec.cssProp}: ${r.cssPropVal}`);
      }
    }
  }

  await browser.close();
  console.log(`\n━━ dom-truth: ${checks} checks, ${failures} failure(s) ━━`);
  process.exitCode = failures > 0 ? 1 : 0;
} finally {
  try {
    process.kill(-server.pid, "SIGTERM"); // kill the whole process group
  } catch {
    server.kill();
  }
}
