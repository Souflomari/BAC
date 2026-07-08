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
import { readFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Loads a web/src/lib/interactive-figures/<slug>.ts module directly from
// TypeScript source at test time (via jiti, already a transitive devDep) — so
// an interactive-figure sweep's "expected" values come from THE SAME module
// StagedFigure imports at runtime, never a hand-duplicated expectation that
// could silently drift from the real math (INTERACTIVE-FIGURE-SPEC.md §6).
function loadInteractiveFigureModel(slug) {
  const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
  const mod = jiti(path.join(WEB, "src/lib/interactive-figures", `${slug}.ts`));
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return mod[camel];
}
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
  // (Persistance-wave, 2026-07-07) shelf collapsed per matière — the trigger's
  // subject-label span is the "row title" typography at rest now; the old
  // per-card title only exists once a matière is expanded (see the SWEEP
  // below for the interactive check that opens one and asserts the cover).
  { name: "home shelf row title", page: "/", sel: "section[aria-label='Notions disponibles'] [data-shelf-subject-label]", text: "Physique-Chimie", fontKey: "lead", family: "Source Serif" },
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
  // D12 carve-out: « Ensuite dans le parcours » is the DASHBOARD-SPEC §3
  // zero-state wording (curriculum order, data-reco-source="parcours" — not
  // fabricated state); any OTHER « Ensuite » phrasing stays forbidden.
  { name: "HONEST STATE: no fabricated progress", page: "/", sel: "main", notText: /en cours|Reprendre|vu récemment|Ensuite(?! dans le parcours)/, absentSel: "[role='progressbar']" },
  // ── Day-5 attempt-first summit (audit C1): reasoning NEVER in DOM pre-commit ──
  { name: "R8 is attempt-first (no printed solutions)", page: NOTION, sel: "[data-exercise='r8-bac']", present: true, notText: /Raisonnement expert/ },
  { name: "R9 is attempt-first (no printed solutions)", page: NOTION, sel: "[data-exercise='r9-variation']", present: true, notText: /Raisonnement expert/ },
  { name: "hook commits via checkpoint (C5)", page: NOTION, sel: "div[aria-label*='Vérifie']", present: true },
  // ── Day-6 stepped derivations (§7): later steps NOT in DOM pre-reveal ──
  { name: "R2 derivation present, step 1 only", page: NOTION, sel: "[data-derivation='verification-cosinus']", present: true, absentSel: "[data-derivation='verification-cosinus'] [data-step='2']" },
  // (Day-6 covers (COVER-SPEC) — moved to an interactive SWEEP below: the
  // shelf is now collapsed per matière (persistance-wave, 2026-07-07), so a
  // notion cover only exists in the DOM once its matière is opened.)
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
  // (DAY7(d), rc-charge's own motif — moved to the shelf-accordion SWEEP
  // below alongside rlc-serie: both live in the "pc" matière, now collapsed
  // by default — persistance-wave, 2026-07-07.)
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
  // ── Day-12 dashboard (DASHBOARD-SPEC §1/§3/§5). The D9 subject grid
  //    ("Tes matières") was REPLACED by the composed dashboard — its three
  //    rows retired with it. Presence + honest wording here; the §5
  //    arithmetic (ONE [data-primary-action]; token count == notions on
  //    disk) lives in the D12 sweep below. ──
  { name: "D12 session card: « Commence ici » zero-state framing", page: "/", sel: "section[aria-label='La session du jour']", text: "Commence ici", present: true },
  { name: "D12 session card: no « continuer » without state (§5)", page: "/", sel: "section[aria-label='La session du jour']", notText: /[Cc]ontinuer|Reprendre|Reprise/ },
  { name: "D12 next-up: parcours wording + source anchor", page: "/", sel: "[data-reco-source='parcours']", text: "Ensuite dans le parcours", present: true },
  { name: "D12 next-up: no « toi » without state (§3)", page: "/", sel: "[data-reco-source='parcours']", notText: /pour toi|[Rr]ecommandé/ },
  { name: "D12 mastery map: calm TOC present", page: "/", sel: "section[aria-label='Carte de maîtrise']", present: true },
  { name: "D12 mastery token links to its notion", page: "/", sel: "a[data-mastery-token][href^='/notions/']", present: true },
  { name: "D12 zero-state: no token claims a state source (§5)", page: "/", sel: "main", present: true, absentSel: "[data-mastery-token][data-state-source]" },
  { name: "D12 subject line: honest fact, not score", page: "/", sel: "section[aria-label='Progrès par matière'] li", text: "h de lecture", present: true },
  // The future milestone component MUST render [data-milestone] — this row
  // is the AttemptFirst contract (§1.6): absent until DEFINED and EARNED.
  { name: "D12 milestone slot: absent until earned (§1.6)", page: "/", sel: "main", present: true, absentSel: "[data-milestone]" },
  { name: "D12 forbidden dashboard vocabulary (§5)", page: "/", sel: "main", notText: /\d+\s?%|maîtrisé|streak|série de|\bXP\b|\bpoints\b/i },
  // ── Day-12 auth surface (AUTH-SPEC §3/§5). The default build is mode
  //    "off": /connexion states it quietly with NO form in the tree, and the
  //    header carries no auth affordance (zero DOM delta). Mock-mode markup
  //    is verified by the mock-build shot pass, not here (the mode is
  //    inlined at build time). ──
  { name: "D12 connexion (off): honest closed state, no form", page: "/connexion", sel: "main", text: "pas encore ouverte", present: true, absentSel: "main form" },
  { name: "D12 connexion (off): no Google affordance either", page: "/connexion", sel: "main", notText: /Google|démonstration|mot de passe/i },
  { name: "D12 header (off): no auth affordance", page: "/", sel: "header", notText: /Se connecter|Se déconnecter|démonstration/ },
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
        // Preserve flags — dropping them silently disarmed /i guards.
        const re = new RegExp(spec.notText.source ?? spec.notText, spec.notText.flags ?? "");
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
    // Persistance-wave (2026-07-07): the per-card caption is collapsed by
    // default now — the trigger's subject-count caption is the shelf-caption
    // typography visible at rest, same token, same contrast requirement.
    { page: "/", sel: "section[aria-label='Notions disponibles'] [data-shelf-subject-count]", label: "shelf caption" },
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

  // (D-persistance, 2026-07-07) DEEP-LINKED CHAPTER + DARK THEME: found by
  // accident verifying a new SVT figure — landing directly on `?chapitre=N`
  // with N>1 caused a React hydration mismatch (errors #418/#423/#425:
  // ChapterShell's `current` state read `window.location` inside its
  // `useState` initializer, so the server render and the client's hydration
  // render computed DIFFERENT chapter numbers — a value baked into visible
  // text via ChapterPosition). React's mismatch recovery is a full
  // client-side re-render, which also silently wiped the boot script's
  // manually-added `.dark` class on `<html>` — a much stranger-looking
  // symptom than its actual cause. Fixed at the source (ChapterShell.tsx:
  // `current` now starts at 0 on every render, resolved from the URL only in
  // a post-hydration effect). This sweep is the rendered-truth backstop:
  // asserts BOTH the absence of hydration errors AND that dark mode survives
  // a direct deep link into a non-first chapter.
  {
    console.log(`\n[${NOTION}] SWEEP: deep-linked chapter + dark theme (no hydration mismatch)`);
    const pageErrors = [];
    const dpage = await browser.newPage({ viewport: { width: 1280, height: 860 } });
    dpage.on("pageerror", (e) => pageErrors.push(e.message));
    await dpage.goto(`${BASE}${NOTION}`, { waitUntil: "commit" });
    await dpage.evaluate(() => localStorage.setItem("bac-theme", "dark"));
    await dpage.goto(`${BASE}${NOTION}?chapitre=3`, { waitUntil: "networkidle" });
    await dpage.waitForTimeout(800);
    const r = await dpage.evaluate(() => ({
      dark: document.documentElement.classList.contains("dark"),
      position: document.querySelector(".chapter-position")?.textContent ?? null,
    }));
    await dpage.evaluate(() => localStorage.removeItem("bac-theme"));
    await dpage.close();
    checks++;
    if (pageErrors.length > 0) failures += fail(`hydration/page error(s) on deep-linked chapter: ${pageErrors[0].slice(0, 80)}`);
    else if (!r.dark) failures += fail(`dark theme LOST after landing directly on ?chapitre=3 (position: ${r.position})`);
    else if (r.position !== "Chapitre 3 / 11") failures += fail(`chapter position wrong: "${r.position}" ≠ "Chapitre 3 / 11"`);
    else console.log(`  ✓ no hydration error, dark survives, position correct ("${r.position}")`);
  }

  // (Persistance-wave, 2026-07-07) SHELF ACCORDION: `AvailableShelf.tsx`
  // collapses each matière (owner feedback: `Cover` shares one motif per
  // SUBJECT, so the old flat grid repeated the same handful of
  // illustrations dozens of times across 61 notions — too long). Asserts
  // BOTH halves of the honest claim: closed by default means the covers are
  // genuinely ABSENT from the DOM (not just visually hidden — Radix
  // `Presence` unmounts), and opening a trigger actually reveals them.
  {
    console.log(`\n[/] SWEEP: shelf accordion — collapsed by default, opens on click`);
    const spage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await spage.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const beforeOpen = await spage.evaluate(() => ({
      rlcInDom: !!document.querySelector("[data-cover='rlc-serie']"),
      rcInDom: !!document.querySelector("[data-cover='rc-charge'][data-motif='rc-charge']"),
      triggerCount: document.querySelectorAll("section[aria-label='Notions disponibles'] [data-shelf-subject-label]").length,
    }));
    await spage.click("section[aria-label='Notions disponibles'] [data-shelf-subject-label]:has-text('Physique-Chimie')");
    await spage.waitForTimeout(350); // shelf-accordion-open runs over --duration-standard (250ms)
    const afterOpen = await spage.evaluate(() => ({
      rlc: !!document.querySelector("[data-cover='rlc-serie']"),
      // DAY7(d): rc-charge must resolve to ITS OWN motif, not the pc
      // fallback (the original bug: the pc fallback also carries
      // data-cover='rc-charge', which made a presence-only row false-green).
      rc: !!document.querySelector("[data-cover='rc-charge'][data-motif='rc-charge']"),
    }));
    await spage.close();
    checks++;
    if (beforeOpen.rlcInDom || beforeOpen.rcInDom) failures += fail("a PC notion cover is present BEFORE opening its matière — accordion not actually collapsed");
    else if (beforeOpen.triggerCount === 0) failures += fail("no shelf triggers found — matières listing broken");
    else if (!afterOpen.rlc) failures += fail("rlc-serie cover still absent AFTER opening Physique-Chimie");
    else if (!afterOpen.rc) failures += fail("rc-charge cover missing its own motif (or absent) AFTER opening Physique-Chimie");
    else console.log(`  ✓ ${beforeOpen.triggerCount} matière triggers, covers absent until opened, present (rlc-serie + rc-charge own motif) after`);
  }

  // (Interactive-figures wave, 2026-07-07) StagedFigure's DOM-absence
  // contract has had ZERO dom-truth coverage since it shipped (D11 §§1-2) —
  // fully specified in LESSON-EXPERIENCE-SPEC.md §5, never implemented.
  // Closing that gap BEFORE building the new drag/slider capability on top
  // of it (INTERACTIVE-FIGURE-SPEC.md) — testing the extension without
  // ever having tested the foundation it extends would invert the
  // dependency. Uses `regimes-uc`'s first placement (R0 of rlc-serie,
  // chapter 1 — no deep-link needed), 3 stages.
  {
    console.log(`\n[${NOTION}] SWEEP: StagedFigure — real DOM absence, transport, print`);
    const fpage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await fpage.goto(`${BASE}${NOTION}`, { waitUntil: "networkidle" });
    const initial = await fpage.evaluate(() => {
      const fig = document.querySelector("[data-figure='regimes-uc']");
      return {
        figPresent: !!fig,
        stage: fig?.getAttribute("data-stage-current"),
        // AttemptFirst: step-2/step-3 groups must be REALLY absent, not display:none.
        step2Absent: !fig?.querySelector("g#step-2"),
        step3Absent: !fig?.querySelector("g#step-3"),
        prevDisabled: fig?.querySelector("button[aria-label='Étape précédente']")?.disabled,
        indicator: fig?.querySelector("[aria-live='polite']")?.textContent,
      };
    });
    // Advance once: "Suivant" (aria-label "Étape suivante" at stage 1/3).
    await fpage.click("[data-figure='regimes-uc'] button[aria-label='Étape suivante']");
    await fpage.waitForTimeout(100);
    const afterOneAdvance = await fpage.evaluate(() => {
      const fig = document.querySelector("[data-figure='regimes-uc']");
      return {
        stage: fig?.getAttribute("data-stage-current"),
        step2Present: !!fig?.querySelector("g#step-2"),
        step3Absent: !fig?.querySelector("g#step-3"),
      };
    });
    // Print: every stage present, controls hidden — no timeline to seek
    // (Derivation precedent), independent of how far the transport advanced.
    // Dispatching `beforeprint` directly (not page.emulateMedia): verified
    // separately that Playwright/CDP's media emulation flips
    // matchMedia("print").matches to true but never fires a "change" event
    // on an already-registered MediaQueryList — a Playwright limitation,
    // not a real-browser one (real print dialogs DO fire it). StagedFigure
    // was already built with a REDUNDANT window "beforeprint"/"afterprint"
    // listener for exactly this kind of cross-browser reliability gap
    // (Safari doesn't reliably fire beforeprint either) — dispatching that
    // event directly exercises the same code path a real print does.
    await fpage.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
    await fpage.waitForTimeout(100);
    const printed = await fpage.evaluate(() => {
      const fig = document.querySelector("[data-figure='regimes-uc']");
      return {
        step3Present: !!fig?.querySelector("g#step-3"),
        controlsHidden: !fig?.querySelector("[role='group'][aria-label*='Contrôles']") ||
          getComputedStyle(fig.querySelector("[role='group'][aria-label*='Contrôles']")).display === "none",
      };
    });
    await fpage.close();
    checks++;
    if (!initial.figPresent) failures += fail("regimes-uc StagedFigure not found on rlc-serie R0");
    else if (initial.stage !== "1") failures += fail(`initial stage ${initial.stage} ≠ "1" (first placement, R0)`);
    else if (!initial.step2Absent || !initial.step3Absent) failures += fail("step-2/step-3 groups present in DOM before any advance — NOT real absence (AttemptFirst broken)");
    else if (!initial.prevDisabled) failures += fail("« Précédent » not disabled at stage 1");
    else if (!initial.indicator?.includes("Étape 1")) failures += fail(`step indicator "${initial.indicator}" doesn't read "Étape 1"`);
    else if (afterOneAdvance.stage !== "2") failures += fail(`stage after one "Suivant" click = ${afterOneAdvance.stage} ≠ "2"`);
    else if (!afterOneAdvance.step2Present) failures += fail("step-2 group still absent after advancing to stage 2 — re-injection broken");
    else if (!afterOneAdvance.step3Absent) failures += fail("step-3 group present at stage 2 — advanced too far or absence contract broken");
    else if (!printed.step3Present) failures += fail("print: step-3 NOT present — fullyRevealed branch not firing under @media print");
    else if (!printed.controlsHidden) failures += fail("print: transport controls still visible");
    else console.log(`  ✓ real DOM absence (step-2/3 absent at stage 1, step-2 re-injected at stage 2), transport correct, print reveals all + hides controls`);
  }

  // (Interactive-figures wave, 2026-07-07) EmbedPanel — same pre-existing
  // gap as StagedFigure above. Uses `rlc-sandbox` on rlc-serie R3
  // (chapter 4) — the gold-reference embed (docs/audits/d10-media-layer.md).
  {
    console.log(`\n[${NOTION}?chapitre=4] SWEEP: EmbedPanel — opt-in mount, tab order, sandbox, attribution`);
    const epage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await epage.goto(`${BASE}${NOTION}?chapitre=4`, { waitUntil: "networkidle" });
    const beforeMount = await epage.evaluate(() => {
      const mountBtn = document.querySelector("button.btn-primary");
      const iframe = document.querySelector("iframe");
      const extLink = document.querySelector("a[href*='phet.colorado.edu']");
      return {
        iframeAbsent: !iframe,
        mountBtnPresent: !!mountBtn && /bac à sable/i.test(mountBtn.textContent ?? ""),
        // Tab order (#8 fix): the external link must precede the mount
        // button in DOCUMENT ORDER (compareDocumentPosition, not just both existing).
        extLinkBeforeButton: !!extLink && !!mountBtn &&
          (extLink.compareDocumentPosition(mountBtn) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
      };
    });
    await epage.click("button.btn-primary:has-text('Ouvrir le bac à sable interactif')");
    await epage.waitForTimeout(200);
    const afterMount = await epage.evaluate(() => {
      const iframe = document.querySelector("iframe");
      return {
        iframePresent: !!iframe,
        sandbox: iframe?.getAttribute("sandbox"),
        srcIsPhet: iframe?.getAttribute("src")?.includes("phet.colorado.edu"),
        loadingLazy: iframe?.getAttribute("loading"),
        attributionPresent: !!Array.from(document.querySelectorAll("p")).find((p) => /CC.BY|PhET/i.test(p.textContent ?? "")),
      };
    });
    await epage.close();
    checks++;
    if (!beforeMount.iframeAbsent) failures += fail("iframe already mounted before any click — opt-in gate broken (heavy 3rd-party resource loading eagerly)");
    else if (!beforeMount.mountBtnPresent) failures += fail("« Ouvrir le bac à sable interactif » button not found");
    else if (!beforeMount.extLinkBeforeButton) failures += fail("external link does NOT precede the mount button in DOM/tab order (§9 keyboard-access regression)");
    else if (!afterMount.iframePresent) failures += fail("iframe did not mount after clicking the opt-in button");
    else if (afterMount.sandbox !== "allow-scripts allow-same-origin allow-popups") failures += fail(`sandbox attr "${afterMount.sandbox}" ≠ expected`);
    else if (!afterMount.srcIsPhet) failures += fail("iframe src is not the expected PhET URL");
    else if (afterMount.loadingLazy !== "lazy") failures += fail(`iframe loading="${afterMount.loadingLazy}" ≠ "lazy"`);
    else if (!afterMount.attributionPresent) failures += fail("CC-BY/PhET attribution text not found after mount");
    else console.log(`  ✓ opt-in gate holds, tab order correct, sandboxed iframe mounts on click, attribution present`);
  }

  // (Interactive-figures wave, pilot 1) tangente-derivee — the manipulation
  // layer on top of a StagedFigure (INTERACTIVE-FIGURE-SPEC.md §6). Uses the
  // figure's first placement (maths/derivabilite-etude-fonctions, R1 →
  // chapter 2). Expected values come from `loadInteractiveFigureModel`
  // (the SAME .ts module StagedFigure imports), never hand-duplicated.
  {
    const TDNOTION = "/notions/maths/derivabilite-etude-fonctions";
    const FIG = "[data-figure='tangente-derivee']";
    console.log(`\n[${TDNOTION}?chapitre=2] SWEEP: tangente-derivee — manipulation unlock, drag, keyboard, reduced-motion, print`);
    const model = loadInteractiveFigureModel("tangente-derivee");

    const ipage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await ipage.goto(`${BASE}${TDNOTION}?chapitre=2`, { waitUntil: "networkidle" });
    const atStage1 = await ipage.evaluate((sel) => !!document.querySelector(sel)?.querySelector("input[type=range]"), FIG);
    await ipage.click(`${FIG} button[aria-label='Étape suivante']`);
    await ipage.waitForTimeout(100);
    const atStage2 = await ipage.evaluate((sel) => !!document.querySelector(sel)?.querySelector("input[type=range]"), FIG);
    await ipage.click(`${FIG} button[aria-label='Étape suivante']`);
    await ipage.waitForTimeout(100);

    const readFigure = (sel) => {
      const fig = document.querySelector(sel);
      const range = fig?.querySelector("input[type=range]");
      return {
        rangePresent: !!range,
        rangeValue: range?.value,
        pointCx: fig?.querySelector("#point-a")?.getAttribute("cx"),
        pointCy: fig?.querySelector("#point-a")?.getAttribute("cy"),
        labelA: fig?.querySelector("#label-a")?.textContent,
        tangentD: fig?.querySelector("#tangente-line")?.getAttribute("d"),
        equation: fig?.querySelector("#formule-equation")?.textContent,
        pente: fig?.querySelector("#formule-pente")?.textContent,
      };
    };
    const atStage3Initial = await ipage.evaluate(readFigure, FIG);

    const expectAt = (t) => ({
      point: model.recompute.point(t),
      tangent: model.recompute.tangentPath(t),
      equation: model.recompute.equationLabel(t).value,
      pente: model.recompute.slopeLabel(t).value,
      label: model.recompute.labelAText(t).value,
    });
    const expectedInitial = expectAt(2);

    // Keyboard: native <input type=range> arrow-key stepping — deterministic,
    // no pixel measurement involved, so an EXACT match is the right bar.
    await ipage.focus(`${FIG} input[type=range]`);
    for (let i = 0; i < 5; i++) await ipage.keyboard.press("ArrowRight");
    await ipage.waitForTimeout(50);
    const afterKeyboard = await ipage.evaluate(readFigure, FIG);
    const expectedAfterKeyboard = expectAt(2.25);

    // Mouse drag — real Playwright mouse events, from point-a's CURRENT
    // screen position to a new one (both computed via the SVG's own
    // getScreenCTM, not a hand-guessed pixel scale — correct regardless of
    // how large the responsive SVG actually renders). Sub-pixel measurement
    // means the exact landed value can't be predicted before the fact, so
    // the assertion is on INTERNAL CONSISTENCY (every bound element matches
    // what the model computes for whatever value the drag actually landed
    // on) plus a sanity check that the drag moved the value in the right
    // direction by roughly the right amount.
    const svgToClient = (sel, svgX, svgY) =>
      ipage.evaluate(
        ({ sel, svgX, svgY }) => {
          const svg = document.querySelector(sel)?.querySelector("svg");
          const pt = svg.createSVGPoint();
          pt.x = svgX;
          pt.y = svgY;
          const p = pt.matrixTransform(svg.getScreenCTM());
          return { x: p.x, y: p.y };
        },
        { sel, svgX, svgY }
      );
    const startPt = model.toSvgPoint(2.25, model.f(2.25));
    const startClient = await svgToClient(FIG, startPt.x, startPt.y);
    const targetT = 3.5;
    const targetPt = model.toSvgPoint(targetT, model.f(targetT));
    const targetClient = await svgToClient(FIG, targetPt.x, targetPt.y);
    await ipage.mouse.move(startClient.x, startClient.y);
    await ipage.mouse.down();
    await ipage.mouse.move(targetClient.x, targetClient.y, { steps: 8 });
    await ipage.mouse.up();
    await ipage.waitForTimeout(50);
    const afterDrag = await ipage.evaluate(readFigure, FIG);
    const draggedValue = parseFloat(afterDrag.rangeValue);
    const expectedAfterDrag = Number.isFinite(draggedValue) ? expectAt(draggedValue) : null;

    await ipage.close();
    checks++;
    if (atStage1) failures += fail("tangente-derivee: manipulation control present at stage 1 — AttemptFirst unlock-gating broken");
    else if (atStage2) failures += fail("tangente-derivee: manipulation control present at stage 2 — unlocks too early (must be the final stage)");
    else if (!atStage3Initial.rangePresent) failures += fail("tangente-derivee: manipulation control absent at the final stage — never unlocks");
    else if (atStage3Initial.rangeValue !== "2") failures += fail(`initial range value "${atStage3Initial.rangeValue}" ≠ "2" (control.initial)`);
    else if (atStage3Initial.pointCx !== String(expectedInitial.point.x) || atStage3Initial.pointCy !== String(expectedInitial.point.y))
      failures += fail(`initial #point-a (${atStage3Initial.pointCx},${atStage3Initial.pointCy}) ≠ model (${expectedInitial.point.x},${expectedInitial.point.y})`);
    else if (atStage3Initial.tangentD !== expectedInitial.tangent.d)
      failures += fail(`initial tangent "${atStage3Initial.tangentD}" ≠ model "${expectedInitial.tangent.d}"`);
    else if (atStage3Initial.equation !== expectedInitial.equation)
      failures += fail(`initial equation "${atStage3Initial.equation}" ≠ model "${expectedInitial.equation}"`);
    else if (afterKeyboard.rangeValue !== "2.25") failures += fail(`after 5×ArrowRight, range value "${afterKeyboard.rangeValue}" ≠ "2.25" (step 0.05 × 5)`);
    else if (afterKeyboard.pointCx !== String(expectedAfterKeyboard.point.x) || afterKeyboard.pointCy !== String(expectedAfterKeyboard.point.y))
      failures += fail(`after keyboard, #point-a (${afterKeyboard.pointCx},${afterKeyboard.pointCy}) ≠ model (${expectedAfterKeyboard.point.x},${expectedAfterKeyboard.point.y})`);
    else if (afterKeyboard.labelA !== expectedAfterKeyboard.label) failures += fail(`after keyboard, label "${afterKeyboard.labelA}" ≠ model "${expectedAfterKeyboard.label}"`);
    else if (!expectedAfterDrag) failures += fail(`after mouse drag, range value "${afterDrag.rangeValue}" is not a number`);
    else if (Math.abs(draggedValue - targetT) > 0.5) failures += fail(`after mouse drag toward t=${targetT}, landed value ${draggedValue} is too far off — drag gesture not tracking the pointer`);
    else if (afterDrag.pointCx !== String(expectedAfterDrag.point.x) || afterDrag.pointCy !== String(expectedAfterDrag.point.y))
      failures += fail(`after mouse drag, #point-a (${afterDrag.pointCx},${afterDrag.pointCy}) ≠ model(${draggedValue}) (${expectedAfterDrag.point.x},${expectedAfterDrag.point.y})`);
    else if (afterDrag.tangentD !== expectedAfterDrag.tangent.d)
      failures += fail(`after mouse drag, tangent "${afterDrag.tangentD}" ≠ model(${draggedValue}) "${expectedAfterDrag.tangent.d}"`);
    else if (afterDrag.equation !== expectedAfterDrag.equation)
      failures += fail(`after mouse drag, equation "${afterDrag.equation}" ≠ model(${draggedValue}) "${expectedAfterDrag.equation}"`);
    else if (afterDrag.pente !== expectedAfterDrag.pente)
      failures += fail(`after mouse drag, pente "${afterDrag.pente}" ≠ model(${draggedValue}) "${expectedAfterDrag.pente}"`);
    else console.log(`  ✓ unlocks only at the final stage, initial state matches the model exactly, keyboard stepping exact, mouse drag internally consistent (landed t=${draggedValue})`);
  }

  // (Interactive-figures wave, pilot 1) tangente-derivee — reduced-motion
  // unlocks manipulation EVEN BEFORE the final stage (the figure is already
  // fully assembled — INTERACTIVE-FIGURE-SPEC.md §4's "manipulation itself
  // is never disabled by reduced-motion", distinct from `fullyRevealed`
  // merely hiding the click-through transport). Print hides it regardless.
  {
    const TDNOTION = "/notions/maths/derivabilite-etude-fonctions";
    const FIG = "[data-figure='tangente-derivee']";
    console.log(`\n[${TDNOTION}?chapitre=2] SWEEP: tangente-derivee — reduced-motion unlock, print hides control`);
    const rpage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await rpage.emulateMedia({ reducedMotion: "reduce" });
    // chapitre=2 (R1): the figure's chapter must be the ACTIVE one — a
    // hidden (non-current) ChapterShell section blocks focus() on anything
    // inside it, which would make the keyboard-functionality check below a
    // false negative rather than a real one.
    await rpage.goto(`${BASE}${TDNOTION}?chapitre=2`, { waitUntil: "networkidle" });
    await rpage.locator(FIG).scrollIntoViewIfNeeded();
    await rpage.waitForTimeout(150);
    const reduced = await rpage.evaluate((sel) => {
      const fig = document.querySelector(sel);
      const range = fig?.querySelector("input[type=range]");
      const point = fig?.querySelector("#point-a");
      return {
        stage: fig?.getAttribute("data-stage-current"),
        step3Present: !!fig?.querySelector("g#step-3"),
        rangePresent: !!range,
        transitionDuration: point ? getComputedStyle(point).transitionDuration : null,
      };
    }, FIG);
    // Reduced-motion still allows dragging/stepping — a quick keyboard nudge
    // confirms the control is functional, not just present-but-inert.
    let keyboardWorksUnderReduced = false;
    if (reduced.rangePresent) {
      const before = await rpage.evaluate((sel) => document.querySelector(sel)?.querySelector("input[type=range]")?.value, FIG);
      await rpage.focus(`${FIG} input[type=range]`);
      await rpage.keyboard.press("ArrowRight");
      await rpage.waitForTimeout(50);
      const after = await rpage.evaluate((sel) => document.querySelector(sel)?.querySelector("input[type=range]")?.value, FIG);
      keyboardWorksUnderReduced = before !== after;
    }
    await rpage.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
    await rpage.waitForTimeout(100);
    const printed = await rpage.evaluate((sel) => {
      const fig = document.querySelector(sel);
      return {
        rangeAbsent: !fig?.querySelector("input[type=range]"),
        step3Present: !!fig?.querySelector("g#step-3"),
      };
    }, FIG);
    await rpage.close();
    checks++;
    if (!reduced.step3Present) failures += fail("reduced-motion: step-3 not present — fullyRevealed branch not firing");
    else if (!reduced.rangePresent) failures += fail("reduced-motion: manipulation control absent — reduced-motion must not disable manipulation itself (§4)");
    else if (reduced.transitionDuration && parseFloat(reduced.transitionDuration) > 0.0001) failures += fail(`reduced-motion: #point-a has a perceptible transition-duration (${reduced.transitionDuration}) during recompute — the global 0.01ms net (globals.css §"Reduced motion") isn't reaching it`);
    else if (!keyboardWorksUnderReduced) failures += fail("reduced-motion: control present but keyboard stepping had no effect — not actually functional");
    else if (!printed.rangeAbsent) failures += fail("print: manipulation control still present — nothing to drag on paper");
    else if (!printed.step3Present) failures += fail("print: step-3 not present under @media print");
    else console.log(`  ✓ reduced-motion unlocks manipulation (present + functional, no transition), print hides the control`);
  }

  // (Interactive-figures wave, pilot 2) aire-sous-courbe — drag the upper
  // bound b, the shaded region/point/labels/formula recompute live.
  {
    const AINOTION = "/notions/maths/calcul-integral";
    const FIG = "[data-figure='aire-sous-courbe']";
    console.log(`\n[${AINOTION}?chapitre=2] SWEEP: aire-sous-courbe — manipulation unlock, drag, keyboard, reduced-motion, print`);
    const model = loadInteractiveFigureModel("aire-sous-courbe");

    const apage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await apage.goto(`${BASE}${AINOTION}?chapitre=2`, { waitUntil: "networkidle" });
    const atStage1 = await apage.evaluate((sel) => !!document.querySelector(sel)?.querySelector("input[type=range]"), FIG);
    await apage.click(`${FIG} button[aria-label='Étape suivante']`);
    await apage.waitForTimeout(100);

    const readFigure = (sel) => {
      const fig = document.querySelector(sel);
      const range = fig?.querySelector("input[type=range]");
      return {
        rangePresent: !!range,
        rangeValue: range?.value,
        pointCx: fig?.querySelector("#point-mobile")?.getAttribute("cx"),
        pointCy: fig?.querySelector("#point-mobile")?.getAttribute("cy"),
        regionD: fig?.querySelector("#region-path")?.getAttribute("d"),
        boundText: fig?.querySelector("#bound-label")?.textContent,
        formuleValeur: fig?.querySelector("#formule-valeur")?.textContent,
      };
    };
    const atStage2Initial = await apage.evaluate(readFigure, FIG);
    const expectAt = (b) => ({
      point: model.recompute.point(b),
      region: model.recompute.regionPath(b),
      bound: model.recompute.boundLabelText(b).value,
      valeur: model.recompute.formuleValeur(b).value,
    });
    const expectedInitial = expectAt(2);

    // Keyboard: exact, deterministic — 20×ArrowLeft from initial 2.0, step
    // 0.05, lands exactly on 1.0.
    await apage.focus(`${FIG} input[type=range]`);
    for (let i = 0; i < 20; i++) await apage.keyboard.press("ArrowLeft");
    await apage.waitForTimeout(50);
    const afterKeyboard = await apage.evaluate(readFigure, FIG);
    const expectedAfterKeyboard = expectAt(1);

    // Mouse drag — same CTM-based approach as the tangente-derivee sweep;
    // assertion is on internal consistency (bound attrs match the model at
    // whatever value the drag actually landed on).
    const svgToClient = (sel, svgX, svgY) =>
      apage.evaluate(
        ({ sel, svgX, svgY }) => {
          const svg = document.querySelector(sel)?.querySelector("svg");
          const pt = svg.createSVGPoint();
          pt.x = svgX;
          pt.y = svgY;
          const p = pt.matrixTransform(svg.getScreenCTM());
          return { x: p.x, y: p.y };
        },
        { sel, svgX, svgY }
      );
    const startPt = model.toSvgPoint(1, model.f(1));
    const startClient = await svgToClient(FIG, startPt.x, startPt.y);
    const targetB = 1.5;
    const targetPt = model.toSvgPoint(targetB, model.f(targetB));
    const targetClient = await svgToClient(FIG, targetPt.x, targetPt.y);
    await apage.mouse.move(startClient.x, startClient.y);
    await apage.mouse.down();
    await apage.mouse.move(targetClient.x, targetClient.y, { steps: 8 });
    await apage.mouse.up();
    await apage.waitForTimeout(50);
    const afterDrag = await apage.evaluate(readFigure, FIG);
    const draggedValue = parseFloat(afterDrag.rangeValue);
    const expectedAfterDrag = Number.isFinite(draggedValue) ? expectAt(draggedValue) : null;

    await apage.close();
    checks++;
    if (atStage1) failures += fail("aire-sous-courbe: manipulation control present at stage 1 — AttemptFirst unlock-gating broken");
    else if (!atStage2Initial.rangePresent) failures += fail("aire-sous-courbe: manipulation control absent at the final stage — never unlocks");
    else if (atStage2Initial.rangeValue !== "2") failures += fail(`initial range value "${atStage2Initial.rangeValue}" ≠ "2" (control.initial)`);
    else if (atStage2Initial.regionD !== expectedInitial.region.d) failures += fail(`initial region path ≠ model`);
    else if (atStage2Initial.boundText !== expectedInitial.bound) failures += fail(`initial bound label "${atStage2Initial.boundText}" ≠ model "${expectedInitial.bound}"`);
    else if (atStage2Initial.formuleValeur !== expectedInitial.valeur) failures += fail(`initial formule "${atStage2Initial.formuleValeur}" ≠ model "${expectedInitial.valeur}"`);
    else if (afterKeyboard.rangeValue !== "1") failures += fail(`after 20×ArrowLeft, range value "${afterKeyboard.rangeValue}" ≠ "1" (step 0.05 × 20)`);
    else if (afterKeyboard.pointCx !== String(expectedAfterKeyboard.point.x) || afterKeyboard.pointCy !== String(expectedAfterKeyboard.point.y))
      failures += fail(`after keyboard, #point-mobile (${afterKeyboard.pointCx},${afterKeyboard.pointCy}) ≠ model (${expectedAfterKeyboard.point.x},${expectedAfterKeyboard.point.y})`);
    else if (afterKeyboard.formuleValeur !== expectedAfterKeyboard.valeur)
      failures += fail(`after keyboard, formule "${afterKeyboard.formuleValeur}" ≠ model "${expectedAfterKeyboard.valeur}"`);
    else if (!expectedAfterDrag) failures += fail(`after mouse drag, range value "${afterDrag.rangeValue}" is not a number`);
    else if (Math.abs(draggedValue - targetB) > 0.5) failures += fail(`after mouse drag toward b=${targetB}, landed value ${draggedValue} is too far off — drag gesture not tracking the pointer`);
    else if (afterDrag.pointCx !== String(expectedAfterDrag.point.x) || afterDrag.pointCy !== String(expectedAfterDrag.point.y))
      failures += fail(`after mouse drag, #point-mobile (${afterDrag.pointCx},${afterDrag.pointCy}) ≠ model(${draggedValue}) (${expectedAfterDrag.point.x},${expectedAfterDrag.point.y})`);
    else if (afterDrag.regionD !== expectedAfterDrag.region.d) failures += fail(`after mouse drag, region path ≠ model(${draggedValue})`);
    else if (afterDrag.formuleValeur !== expectedAfterDrag.valeur)
      failures += fail(`after mouse drag, formule "${afterDrag.formuleValeur}" ≠ model(${draggedValue}) "${expectedAfterDrag.valeur}"`);
    else console.log(`  ✓ unlocks only at the final stage, initial state matches the model exactly, keyboard stepping exact, mouse drag internally consistent (landed b=${draggedValue})`);
  }

  // (Interactive-figures wave, pilot 2) aire-sous-courbe — reduced-motion
  // unlock, print hides control (same gating logic as tangente-derivee).
  {
    const AINOTION = "/notions/maths/calcul-integral";
    const FIG = "[data-figure='aire-sous-courbe']";
    console.log(`\n[${AINOTION}?chapitre=2] SWEEP: aire-sous-courbe — reduced-motion unlock, print hides control`);
    const rpage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await rpage.emulateMedia({ reducedMotion: "reduce" });
    await rpage.goto(`${BASE}${AINOTION}?chapitre=2`, { waitUntil: "networkidle" });
    await rpage.locator(FIG).scrollIntoViewIfNeeded();
    await rpage.waitForTimeout(150);
    const reduced = await rpage.evaluate((sel) => {
      const fig = document.querySelector(sel);
      const range = fig?.querySelector("input[type=range]");
      return {
        step2Present: !!fig?.querySelector("g#step-2"),
        rangePresent: !!range,
      };
    }, FIG);
    let keyboardWorksUnderReduced = false;
    if (reduced.rangePresent) {
      const before = await rpage.evaluate((sel) => document.querySelector(sel)?.querySelector("input[type=range]")?.value, FIG);
      await rpage.focus(`${FIG} input[type=range]`);
      await rpage.keyboard.press("ArrowLeft");
      await rpage.waitForTimeout(50);
      const after = await rpage.evaluate((sel) => document.querySelector(sel)?.querySelector("input[type=range]")?.value, FIG);
      keyboardWorksUnderReduced = before !== after;
    }
    await rpage.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
    await rpage.waitForTimeout(100);
    const printed = await rpage.evaluate((sel) => {
      const fig = document.querySelector(sel);
      return {
        rangeAbsent: !fig?.querySelector("input[type=range]"),
        step2Present: !!fig?.querySelector("g#step-2"),
      };
    }, FIG);
    await rpage.close();
    checks++;
    if (!reduced.step2Present) failures += fail("reduced-motion: step-2 not present — fullyRevealed branch not firing");
    else if (!reduced.rangePresent) failures += fail("reduced-motion: manipulation control absent — reduced-motion must not disable manipulation itself (§4)");
    else if (!keyboardWorksUnderReduced) failures += fail("reduced-motion: control present but keyboard stepping had no effect — not actually functional");
    else if (!printed.rangeAbsent) failures += fail("print: manipulation control still present — nothing to drag on paper");
    else if (!printed.step2Present) failures += fail("print: step-2 not present under @media print");
    else console.log(`  ✓ reduced-motion unlocks manipulation (present + functional), print hides the control`);
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

  // (D12) DASHBOARD-SPEC §5 arithmetic: exactly ONE [data-primary-action] on
  // the dashboard, and exactly one [data-mastery-token] per REAL notion on
  // disk. The denominator mirrors listNotions() (lib/content.ts): every
  // content/<subject>/<slug>/ directory whose segments don't start with
  // "_" or "." — the filesystem is the honest source, not a hardcoded 61.
  {
    console.log(`\n[/] SWEEP: dashboard §5 — one primary action, tokens == notions`);
    const CONTENT = path.join(path.dirname(WEB), "content");
    const visible = (name) => !name.startsWith("_") && !name.startsWith(".");
    let expected = 0;
    for (const subject of readdirSync(CONTENT).filter(visible)) {
      const subjectPath = path.join(CONTENT, subject);
      if (!statSync(subjectPath).isDirectory()) continue;
      for (const slug of readdirSync(subjectPath).filter(visible)) {
        if (statSync(path.join(subjectPath, slug)).isDirectory()) expected++;
      }
    }
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const d = await page.evaluate(() => ({
      primary: document.querySelectorAll("[data-primary-action]").length,
      tokens: document.querySelectorAll("[data-mastery-token]").length,
    }));
    checks++;
    if (d.primary !== 1) failures += fail(`[data-primary-action] count ${d.primary} ≠ 1 (§5: ONE primary action)`);
    else console.log(`  ✓ exactly one [data-primary-action]`);
    checks++;
    if (expected === 0 || d.tokens !== expected) failures += fail(`[data-mastery-token] count ${d.tokens} ≠ ${expected} notions on disk`);
    else console.log(`  ✓ ${d.tokens} mastery tokens == ${expected} notions on disk`);
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

  // (F8) KaTeX render-error class guard (hunt 07-06): a single-backslash TeX
  // command inside a DOUBLE-QUOTED YAML string reaches KaTeX as a mangled
  // control char and renders a red .katex-error (found: items.yaml \approx →
  // « R pprox 0 » on every RLC surface). validate-content now blocks the class
  // at author time; this sweep is the rendered-truth backstop.
  {
    console.log(`\n[${NOTION}] SWEEP: zero .katex-error`);
    const kerr = await page.evaluate(() => ({
      n: document.querySelectorAll(".katex-error").length,
      sample: document.querySelector(".katex-error")?.textContent?.slice(0, 60) ?? "",
    }));
    checks++;
    if (kerr.n > 0) failures += fail(`${kerr.n} .katex-error rendered — « ${kerr.sample} »`);
    else console.log(`  ✓ no .katex-error on the page`);
  }

  // (F9) Mobile 390px overflow guard (hunt 07-06): the page NEVER scrolls
  // horizontally at phone width (bible §1). The hunt convicted ONE class —
  // the masthead h1's long French words at display size — plus latent table
  // min-content. The sample below is the convicted set + controls; any new
  // wide construct (table, inline formula, band) must keep these green.
  {
    console.log(`\nSWEEP: 390px — zéro défilement horizontal`);
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mpage = await mctx.newPage();
    const MOBILE_SAMPLE = [
      "/", NOTION,
      "/notions/svt/dysfonctionnements-immunitaires", // pire cas condamné (169px)
      "/notions/pc/ondes-em-modulation",              // 144px
      "/notions/pc/transformations-deux-sens",        // 67px + formule inline longue
      "/notions/maths/limites-continuite",            // tableau plus large que 390
      "/notions/maths/nombres-complexes-2",           // 61px
    ];
    for (const route of MOBILE_SAMPLE) {
      await mpage.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      const over = await mpage.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      checks++;
      if (over > 1) failures += fail(`${route}: overflow-x ${over}px à 390`);
      else console.log(`  ✓ ${route} — 0px`);
    }
    await mctx.close();
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
