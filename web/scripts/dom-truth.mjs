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
import { spawn, execSync } from "child_process";
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
  { name: "home shelf row title", page: "/", sel: "section[aria-label='Notions disponibles'] a span", text: "Oscillations", fontKey: "lead", family: "Source Serif" },
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
  { name: "rail resting label is a word, not a code", page: NOTION, sel: ".notion-rail button", text: "Accroche", fontKey: "caption", notText: /^R\d+/ },
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
  { name: "rail labels not truncated", page: NOTION, sel: ".notion-rail button > span[class*='bp-expanded']", noOverflow: true },
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
  // ── July-2026 external audit F1 — the CLASS guard (bible §13 amendment:
  //    guards target classes, not instances). No page's rendered text may
  //    contain authoring-marker lexicon. Three enhancement-slot comments
  //    shipped as visible prose while the instance-guards ran green; the
  //    structural fix is stripAuthoringComments (lib/content.ts), this row
  //    asserts the CLASS on every audited page. New internal vocabulary →
  //    extend AUTHORING_LEXICON in the same commit. ──
  //    Case notes (from the measurement pass): "à sourcer" leaked in
  //    LOWERCASE (authoring vocabulary in any case — a lesson never says it);
  //    "À FAIRE" stays uppercase-only because lowercase "à faire" is
  //    ordinary French ("continue à faire circuler…" — measured false
  //    positive).
  //    Second expansion (post-fix adversarial verification found five
  //    residual CLASSES the first lexicon missed): rendered marker literals
  //    ("[["), internal spec citations ("§0.4"), reviewer notes in
  //    blockquotes ("Note de validation"), and the R-code label form
  //    ("R3 —") in headings/cells the h2-only strip didn't cover.
  ...["/", NOTION, "/notions/pc/rc-charge", "/notions/maths/probabilites-conditionnelles", "/nonexistent-xyz"].map((p) => ({
    name: `no authoring lexicon in rendered text (${p})`,
    page: p,
    sel: "body",
    notText: /TODO|FIXME|SLOT D|AMÉLIORATION|[Àà] [Ss]ourcer|À FAIRE|asset-pending|jamais bloquant|voir note spec|<!--|\[\[|§\d|[Nn]ote de validation|\bR\d+ —/,
  })),
  // ── July-2026 F5 — the head pack renders (metadata API output) ──
  { name: "head: favicon link", page: "/", sel: "link[rel='icon']", present: true },
  { name: "head: apple-touch icon", page: "/", sel: "link[rel='apple-touch-icon']", present: true },
  { name: "head: og:title", page: "/", sel: "meta[property='og:title']", present: true },
  { name: "head: og:image", page: "/", sel: "meta[property='og:image']", present: true },
  { name: "head: twitter:card", page: "/", sel: "meta[name='twitter:card']", present: true },
  { name: "head: canonical", page: "/", sel: "link[rel='canonical']", present: true },
  { name: "head: site JSON-LD", page: "/", sel: "script[type='application/ld+json']", present: true },
  { name: "head: notion canonical", page: NOTION, sel: "link[rel='canonical']", present: true },
  { name: "head: notion JSON-LD (LearningResource)", page: NOTION, sel: "script[type='application/ld+json']", present: true },
  // ── July-2026 F4 — the theme toggle exists (interaction exercised in the
  //    sweeps section below: the REAL user path, not a forced class) ──
  { name: "theme toggle present in header", page: "/", sel: "header [data-theme-toggle]", present: true },
  // ── July-2026 F7 — KaTeX accessibility (refuted-claim made permanent:
  //    every formula ships MathML; parity asserted in the sweeps section) ──
  { name: "KaTeX MathML present", page: NOTION, sel: ".katex .katex-mathml", present: true },
  // ── Day-8: headings with math render MATH, not flattened TeX artifacts.
  //    The Day-3 rung strip rendered flattenText(children) — "$T_0$" in the
  //    R2 heading shipped as literal "T0T_0T0" for five days; no instrument
  //    looked at heading TEXT with math. Class guard: rendered heading text
  //    never contains an underscore (the TeX-annotation signature), and the
  //    R2 heading carries a real .katex child. ──
  { name: "R2 heading renders live math (no flattened TeX)", page: NOTION + "?chapitre=3", sel: "h2[data-rung='R2']", notText: /_|T0T/, present: true },
  { name: "R2 heading contains a KaTeX element", page: NOTION, sel: "h2[data-rung='R2'] .katex", present: true },
  // ── Day-9 site skeleton (dashboard → matière → chapitre) ──
  { name: "D9 dashboard: subject grid present", page: "/", sel: "section[aria-label='Tes matières']", present: true },
  { name: "D9 dashboard: subject card title (serif)", page: "/", sel: "section[aria-label='Tes matières'] a span", text: "Mathématiques", fontKey: "lead", family: "Source Serif" },
  { name: "D9 dashboard: honest counts, no fabricated progress", page: "/", sel: "section[aria-label='Tes matières']", notText: /en cours|% terminé|complété|Reprendre|maîtrisé/ },
  { name: "D9 subject page: masthead band", page: "/matieres/pc", sel: "[data-band='masthead']", bgVar: "--color-surface-container-low" },
  { name: "D9 subject page: h1 display-lg serif", page: "/matieres/pc", sel: "h1", text: "Physique", fontKey: "display-lg", weight: "700", family: "Source Serif" },
  { name: "D9 subject page: available chapter links to notion", page: "/matieres/pc", sel: "a[href='/notions/pc/rlc-serie']", present: true },
  // D9.5 content-fill completed every PC chapter (25/25) — /matieres/pc no
  // longer has an un-built chapter to render "À venir" against, so the
  // per-chapter honest-empty-state assertion that lived here (checked at D9,
  // when only rc-charge/rlc-serie existed) is currently unobservable on any
  // live page: maths/pc/svt/philo are all content-complete, and the si stub
  // has zero chapters (a different code path — tested below, line ~215).
  // ChapterList.tsx still renders the "À venir" branch in source; if a future
  // curriculum addition leaves a chapter un-built, add a targeted assertion
  // back here against that specific chapter. Until then, assert the honest
  // state that's actually true: full completion, no stray pending-language.
  { name: "D9 subject page: fully-built subject shows no stale 'À venir'", page: "/matieres/pc", sel: "main", present: true, notText: /À venir/ },
  { name: "D9 subject page: footer ends the page", page: "/matieres/pc", sel: "footer", text: "cadre de référence", present: true },
  { name: "D9 stub subject: honest 'à venir' empty state", page: "/matieres/si", sel: "[role='status']", text: "Programme à venir", present: true },
  { name: "D9 onboarding: filière cards present", page: "/commencer", sel: "button[aria-pressed]", text: "Sciences", present: true },
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
          // FULL VISIBLE text for notText guards (July-2026 fixes: notText
          // previously tested only the first 60 chars; and it must be
          // innerText, not textContent — the RSC <script> payload carries
          // raw markdown ("## R0 —", "[[figure:…]]") that never renders,
          // and textContent would flag it).
          textFull: ((el.innerText ?? el.textContent) || "").trim().slice(0, 200000),
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
        const m = re.exec(r.textFull ?? r.textHead);
        if (m) {
          const at = Math.max(0, m.index - 30);
          failures += fail(`forbidden text ${re} found: "…${(r.textFull ?? "").slice(at, m.index + m[0].length + 30)}…"`);
        } else console.log(`  ✓ text clean ("${r.textHead.slice(0, 32)}…")`);
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

  // ══ SWEEPS (July-2026 external-audit instruments — class-level, per §13) ══

  // (F2) Prose measure: NO running-text paragraph renders wider than 75ch of
  // its OWN font, on any audited content page. "Running text" = >100 chars
  // (block-box labels like a 4-char eyebrow legitimately fill wide bands).
  for (const p of [NOTION, "/notions/pc/rc-charge", "/notions/maths/probabilites-conditionnelles"]) {
    console.log(`\n[${p}] SWEEP: prose measure ≤75ch (running text)`);
    await page.goto(`${BASE}${p}`, { waitUntil: "networkidle" });
    const offenders = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll(".notion-content p, .notion-content li")) {
        // Running text = the element's OWN text runs (direct text nodes +
        // inline children) are long. A structured card <li> aggregates lots
        // of textContent but is a BOX, not a text line — measuring its width
        // would flag the card, not the typography (first sweep version did).
        let direct = 0;
        for (const n of el.childNodes) {
          if (n.nodeType === Node.TEXT_NODE) direct += n.textContent.trim().length;
          else if (n.nodeType === Node.ELEMENT_NODE && getComputedStyle(n).display.startsWith("inline"))
            direct += (n.textContent || "").trim().length;
        }
        if (direct <= 100) continue;
        const probe = document.createElement("span");
        probe.style.cssText = "position:absolute;visibility:hidden;width:75ch";
        probe.style.font = getComputedStyle(el).font;
        el.appendChild(probe);
        const cap = probe.getBoundingClientRect().width;
        probe.remove();
        const w = el.getBoundingClientRect().width;
        if (w > cap + 1) out.push(`${Math.round(w)}px > ${Math.round(cap)}px (75ch): "${(el.textContent || "").trim().slice(0, 40)}…"`);
      }
      return out;
    });
    checks++;
    if (offenders.length) failures += fail(`over-measure running text:\n      ${offenders.join("\n      ")}`);
    else console.log(`  ✓ all running text ≤ 75ch of its own font`);
  }

  // (F3 + F4) Contrast in BOTH themes, dark reached through the REAL toggle
  // (never a forced class — the forced-class habit hid F4 for four days).
  const CONTRAST_TARGETS = [
    { page: NOTION, sel: "figcaption", label: "figcaption" },
    { page: NOTION, sel: "[data-band='masthead'] p", label: "masthead metadata" },
    { page: NOTION, sel: ".notion-rail button span[class*='bp-expanded']", label: "rail idle label" },
    { page: NOTION, sel: "footer p", label: "footer" },
    { page: "/", sel: "section[aria-label='Notions disponibles'] a span[class*='caption']", label: "shelf caption" },
  ];
  const lum = `(c)=>{const [r,g,b]=c.match(/\\d+(\\.\\d+)?/g).map(Number);const f=(v)=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)}`;
  for (const theme of ["light", "dark"]) {
    for (const t of CONTRAST_TARGETS) {
      console.log(`\n[${t.page}] SWEEP: contrast ${t.label} (${theme})`);
      await page.goto(`${BASE}${t.page}`, { waitUntil: "networkidle" });
      // Reach the theme through the USER paths: the persisted-choice boot
      // script (set storage, reload). The first sweep version blind-clicked
      // the toggle and was defeated by its own persistence — the dark choice
      // survives navigation, so a click on an already-dark page went light.
      await page.evaluate((want) => localStorage.setItem("bac-theme", want), theme);
      await page.reload({ waitUntil: "networkidle" });
      const r = await page.evaluate(({ sel, lumSrc }) => {
        const L = eval(lumSrc);
        const el = document.querySelector(sel);
        if (!el) return { missing: true };
        const fg = getComputedStyle(el).color;
        let node = el, bg = "rgb(255,255,255)";
        while (node) {
          const b = getComputedStyle(node).backgroundColor;
          if (b && !b.includes("0, 0, 0, 0") && b !== "transparent") { bg = b; break; }
          node = node.parentElement;
        }
        const [l1, l2] = [L(fg), L(bg)];
        return { fg, bg, ratio: (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05), darkOn: document.documentElement.classList.contains("dark") };
      }, { sel: t.sel, lumSrc: lum });
      checks++;
      if (r.missing) { failures += fail(`element not found: ${t.sel}`); continue; }
      if (theme === "dark" && !r.darkOn) { failures += fail("toggle did not activate dark theme"); continue; }
      if (r.ratio < 4.5) failures += fail(`contrast ${r.ratio.toFixed(2)}:1 < 4.5:1 (${r.fg} on ${r.bg})`);
      else console.log(`  ✓ ${r.ratio.toFixed(2)}:1 (${r.fg} on ${r.bg})`);
    }
  }

  // (F4) The toggle round-trips: dark on click, back to light on second click,
  // and the boot script honors the persisted choice on reload.
  {
    console.log(`\n[/] SWEEP: theme toggle round-trip + persistence`);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    // Clean slate: the contrast sweep left a persisted choice behind.
    await page.evaluate(() => localStorage.removeItem("bac-theme"));
    await page.reload({ waitUntil: "networkidle" });
    const bgLight = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.click("header [data-theme-toggle]");
    await page.waitForTimeout(150);
    const bgDark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.reload({ waitUntil: "networkidle" });
    const persisted = await page.evaluate(() => ({
      dark: document.documentElement.classList.contains("dark"),
      stored: localStorage.getItem("bac-theme"),
    }));
    await page.click("header [data-theme-toggle]");
    await page.waitForTimeout(150);
    const backLight = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
    checks++;
    if (bgLight === bgDark) failures += fail(`toggle changed nothing (bg stayed ${bgLight})`);
    else if (!persisted.dark || persisted.stored !== "dark") failures += fail(`choice not persisted across reload (stored=${persisted.stored}, dark=${persisted.dark})`);
    else if (!backLight) failures += fail("second click did not return to light");
    else console.log(`  ✓ dark reachable (${bgLight} → ${bgDark}), persisted, reversible`);
    await page.evaluate(() => localStorage.removeItem("bac-theme"));
  }

  // (Day-8, §13 amendment #3) WIDE-TIER battery: the owner's viewport is
  // ~2000px; everything above ran at 1280 and was blind to his dead zones.
  // Structural assertions at 1536/1920 (composition assertions land with the
  // owner's Set-M/Set-W picks — this tier is the harness they plug into).
  for (const width of [1536, 1920]) {
    const wp = await browser.newPage({ viewport: { width, height: 1000 } });
    for (const p of ["/", NOTION]) {
      console.log(`\n[${p}] WIDE ${width}px: structure`);
      await wp.goto(`${BASE}${p}`, { waitUntil: "networkidle" });
      const r = await wp.evaluate(() => {
        const main = document.querySelector("main");
        const headerInner = document.querySelector("header > div, header nav")?.parentElement === document.querySelector("header")
          ? document.querySelector("header > div")
          : document.querySelector("header");
        return {
          hOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          mainLeft: main ? main.getBoundingClientRect().left : null,
          headerLeft: headerInner ? headerInner.getBoundingClientRect().left : null,
          band: !!document.querySelector("[data-band='masthead']"),
        };
      });
      checks++;
      if (r.hOverflow) failures += fail(`horizontal overflow at ${width}px`);
      else if (r.mainLeft == null) failures += fail("main not found");
      else if (r.headerLeft != null && Math.abs(r.mainLeft - r.headerLeft) > 0.5)
        failures += fail(`spine broken at ${width}px: main ${r.mainLeft} vs header ${r.headerLeft}`);
      else console.log(`  ✓ no overflow, spine holds (left ${Math.round(r.mainLeft)}px)${p !== "/" ? (r.band ? ", band present" : "") : ""}`);
    }
    await wp.close();
  }

  // (Day-8.5) BUILD STAMP: the footer answers "which version am I looking
  // at?" — the question behind two deployment-truth incidents. Asserts the
  // stamp exists AND matches this checkout's HEAD: a mismatch means the
  // .next build is stale relative to the tree you think you're verifying
  // (the standing loop is build → verify → commit, so equality holds).
  {
    console.log(`\n[/] SWEEP: build stamp present + matches HEAD`);
    let headSha = null;
    try {
      headSha = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
    } catch { /* git unavailable — format-only check below */ }
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const stamp = await page.evaluate(() =>
      (document.querySelector("footer [data-build-stamp]")?.textContent || "").trim()
    );
    checks++;
    const m = stamp.match(/v\.\s+([0-9a-f]{7,}|inconnu)/);
    if (!m) failures += fail(`stamp missing or malformed: "${stamp}"`);
    else if (headSha && m[1] !== headSha && m[1] !== "inconnu")
      failures += fail(`stamp ${m[1]} ≠ HEAD ${headSha} — the .next build is stale, rebuild before verifying`);
    else console.log(`  ✓ stamp "${stamp}"${headSha ? ` == HEAD ${headSha}` : " (format only, no git)"}`);
  }

  // (F7) KaTeX accessibility parity: every formula ships MathML.
  {
    console.log(`\n[${NOTION}] SWEEP: KaTeX MathML parity`);
    await page.goto(`${BASE}${NOTION}`, { waitUntil: "networkidle" });
    const k = await page.evaluate(() => ({
      total: document.querySelectorAll(".katex").length,
      mathml: document.querySelectorAll(".katex > .katex-mathml").length,
    }));
    checks++;
    if (k.total === 0 || k.total !== k.mathml) failures += fail(`MathML parity broken: ${k.mathml}/${k.total}`);
    else console.log(`  ✓ ${k.mathml}/${k.total} formulas carry MathML`);
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
