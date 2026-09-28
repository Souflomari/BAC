> **ARCHIVE (2026-08-18).** Journal d'exécution du plan « produit parfait »
> (phases A→E, juillet-août 2026), conservé pour son historique : shas,
> verdicts owner, leçons de campagne (53 scènes Manim, 113+ exercices de
> banque, systemisation des jetons). Le plan ACTIF est
> `docs/product/REFONTE-STUDIO.md` (ADR 0030). Ce fichier n'est plus une
> référence de travail.

# The Perfect-Product Plan — five phases to a complete bac app

> Owner directive (2026-07-31, Fable 5 weekly credits restored; Opus 5 +
> Sonnet 5 now available): (1) finish the design system, (2) fix/refresh
> the agents, (3) get the app to bac-mastery sufficiency — plan the road,
> execute every step, (4) then fix all remaining bugs, (5) then the
> generative-media enrichment (ElevenLabs + Gemini Pro; Higgsfield
> subscription under consideration) with its rules written first.
>
> Fable plans/audits; Opus 5/Sonnet 5 execute per the refreshed roster
> (itself Phase B output). Status: COMPLETE — 3 explorer digests folded
> (agents roster, design-system gap, bug+media inventory), token-
> architecture Plan agent folded into Phase A, 5 owner verdicts locked
> (Phase 0 + the 2026-08-05 "full systemization" call).

## Context — why this plan exists

The app went LIVE on production this sprint: the adaptive tutor engine
now runs end-to-end (accounts, diagnosis, misconception clearing), so for
the first time the owner has used it as a student would. That live
editorial pass surfaced the truth that the product is not yet *enough* —
"the more exercises you do the more you master, and right now the app
isn't enough to master the bac." The owner's five-point directive is the
response: make it a finished, sufficient product. This plan sequences
that work into five phases with checkable exit criteria, so execution is
a matter of running steps, not re-deciding scope. The exploration this
plan rests on is real and measured (not estimated): the design-system
gap, the agent-roster drift, the corpus census, and the full bug/media
docket were each enumerated by a dedicated pass and are cited inline.
Intended outcome: an app that demonstrably replaces private tutoring for
a Moroccan science-stream bac student — the VISION north star.

## Sequencing logic (why this order)

Owner's numbering, re-cut only where dependency demands:
- Phase 0 first because three owner verdicts from the last sprint gate
  the ENTIRE mastery lane and the owner is present now.
- Design system (A) before the big builds because the dashboard-v2 build,
  bank fan-out, and V1 step-text encode all touch UI — build them on the
  finished system, not before it.
- Agents refresh (B) early because every subsequent wave routes through
  the roster; refreshing model assignments to the 5-family multiplies all
  later work. A+B are both short; run as one opening block.
- Mastery road (C) is the long middle = the standing mastery-push plan,
  continued and completed, with a checkable definition-of-done.
- Bug sweep (D) after C by owner's explicit order (fix-everything comes
  once the product is sufficient).
- Media enrichment (E) last: improvement-class, gated on its rules being
  written first (CLAUDE.md open decision #4).

## Execution cadence — ONE PHASE AT A TIME, owner-gated (2026-08-05)

Owner directive: we execute **phase by phase**. I run a single phase to
completion, report, and STOP — the next phase begins only when the owner
says go. Rationale: the 5-hour usage windows must not catch Claude
mid-phase and leave a half-done state.

Consequences baked into how each phase is built:
- **Every phase ends at a clean, committed, gates-green boundary** — never
  mid-wave. Within a phase, work is chunked into the waves listed so there
  is always a safe stopping point if a window closes; but the *phase* is
  the unit the owner authorizes.
- After a phase closes I post a short compte-rendu (what shipped, shas,
  gates, anything that needs an owner editorial eye) and wait.
- Owner editorial gates that fall *inside* a phase (e.g. Phase C's V1
  winner already picked; the D1 cadre-scope rulings; the E4 video call)
  are surfaced at the moment they block, via AskUserQuestion, not deferred
  to phase end.
- Order stays A → B → C → D → E unless the owner re-cuts it. A and B are
  both short; the owner may choose to authorize them as one opening block
  or separately.

**This plan is the standing reference across all phases and windows.** If
a session is interrupted, the next resumes from the Execution log below +
the current phase's wave checklist — no context is lost to a window close.

## Phase 0 — Owner verdicts: ALL LOCKED (2026-07-31, at planning time)
1. **Step-text = a2** (lede serif + accent ordinal) → site-wide default;
   V1 encode + V2 re-staging unlocked.
2. **DASHBOARD-V2-SPEC approved as-is** → build contract locked.
3. **Bank pilot PASSES; keep duplicates** (banks carry the complete
   corpus incl. summit-source sujets) → B2/B3 fan-out unlocked.
4. **SVT ENTERS the mastery road** (Phase C lane, authored by
   Opus 5/Sonnet 5) → unfreeze sequence begins with cadre validation.

## Phase A — Design system: finish + systemize (short; explorer findings in)

State found: 57 CSS vars in globals.css (`:root` + `.dark`, the real
runtime source) vs a Tailwind alias layer that is ~50% dead code (e.g.
`text-text-secondary` 0 uses vs `text-[var(--color-text-secondary)]`
134); 490 arbitrary-bracket usages (393 = var() indirection, 63 raw
numerics, 7 raw hex, 10 inline styles); values hand-maintained in THREE
places (TOKENS.md / globals.css / tailwind.config.ts) + a 4th sync point
(`cn()` classGroups in web/src/lib/utils.ts — the U1 mechanism); radius/
type-scale/easing/breakpoints exist ONLY in tailwind (invisible to CSS/
SVG/themes); dom-truth asserts 15 font sizes + 1 of 26 color vars,
nothing on elevation/radius/motion; no arbitrary-value lint guard.

**Owner verdict (2026-08-05): FULL SYSTEMIZATION.** Architecture below is
the Plan-agent design (Tailwind v3.4.15 confirmed → config-file world, NOT
v4 @theme; jiti@1.21.7 already a devDep and already used by dom-truth).

**Architecture decisions (locked):**
- A-arch. **Single source = `web/src/lib/tokens.ts`** (pure typed data
  module, no functions, client-safe) + `web/scripts/generate-tokens.mjs`
  emitting a checked-in `web/src/app/tokens.generated.css`. Three
  consumers, one source: tailwind.config imports tokens.ts directly (v3
  loads TS config via jiti); globals.css replaces its `:root`+`.dark`
  blocks (L25–214) with `@import "./tokens.generated.css"`; dom-truth +
  utils.ts import tokens.ts. Shape: `themes.{light,dark}` (selector +
  vars — a `craie` theme later = one new entry, nothing else moves,
  honoring THEME-ARCHITECTURE), `invariant` (radius/tracking/z/touch/
  motion/state), `typeScale`, `screens` (TS-only — media queries can't
  read CSS vars, documented). Generator has a `--check` mode wired as
  `prebuild` so drift fails loudly on Vercel; build never mutates tree.
- A-syntax. **Codemod `*-[var(--…)]` → named aliases; var()-bracket
  BANNED.** Aliases are deterministic for tailwind-merge (closes U1
  structurally); var() is unclassifiable and makes the guard unstatable.
  Move `text`/`border` out of the `colors` nest into `textColor`/
  `borderColor` so classes read `text-primary`/`border-subtle` (not the
  dead `text-text-primary`). `web/scripts/codemod-tokens.mjs`, map
  generated from tokens.ts at runtime (can't drift), throws on any
  unmapped `-[var(--`, idempotent (2nd run = 0 edits, asserted).
- A-families. New tokens land in `invariant`: `tracking-eyebrow` 0.14em,
  `min-h/w-touch` 48px, z-scale (`z-raised/header/overlay` = 10/40/50),
  `--duration-slow` (CSS lacked it) + `--ease-enter/leave/emphasized/
  standard-svg` (only `--ease-between` existed), named measures. One-off
  figure geometry (`w-[36ch]` etc.) is content-shaped → guard allowlist,
  not a token.
- A-domtruth. Replace `parseFontSizes()` with a jiti import of tokens.ts
  (keep the loud-throw contract); append a GENERATED sweep — every var in
  themes.light/dark/invariant painted on a probe element and asserted
  computed==source in BOTH themes, zero hand-listing; add a cn()-merge
  tripwire asserting every alias pair survives merge (U1 → permanent hard
  gate). `parseProseSizes()` untouched (prose sizes are component-scale).
- A-guard. Custom `web/scripts/token-gate.mjs` (~80 lines, zero deps) in
  the dom-truth commit-gate slot — fails on `-[var(--`, hex literals,
  `tracking-[`, `z-[`, `min-[hw]-[48px]`, raw `duration-[`/`ease-[`; inline
  allowlist for `data-[…]`/`supports-[…]`/`aria-[…]`/ch-geometry; escape
  hatch `/* token-gate-allow */`. (NOT eslint-plugin-tailwindcss — new dep,
  no-arbitrary-value can't express "ch yes, var() never".)

**Migration order (6 waves, each ends `npm run build && npm run dom-truth`
green):**
- W0. Baseline: build + dom-truth on clean tree, record pass table.
- W1. Source of truth, VALUES BYTE-IDENTICAL: create tokens.ts (transcribe
  57 vars + typeScale/radius/screens verbatim), generator, generated CSS;
  globals.css → `@import`; add prebuild check. DON'T touch tailwind.config
  yet (parseFontSizes still parses it → dom-truth stays green, zero parser
  change). Diff of computed output nil by construction.
- W2. Config + parser swap, ONE ATOMIC COMMIT (only wave where config +
  dom-truth + utils.ts move together — the parser throw makes a half-done
  state unmergeable): tailwind.config derives from tokens.ts, text/border
  → textColor/borderColor, delete dead `shadow-subtle/soft`; dom-truth
  parseFontSizes → jiti import; utils.ts classGroups → derived from
  tokens.ts.
- W3. New families + the generated dom-truth sweep + cn() tripwire.
- W4. Codemod in two sub-waves — 4a colors+state-opacity (~380), 4b
  tracking/touch/z/measure (~45); after each: grep count == prediction,
  codemod re-run = 0 edits, build + dom-truth, screenshot pass for §10.
- W5. Lock the door: token-gate.mjs + npm script + dom-truth prelude call;
  reconcile+freeze TOKENS.md (version + changelog, document the 11
  code-only tokens, name tokens.ts as source, mark THEME-ARCHITECTURE's
  data-theme registry explicitly deferred); note the ~125 raw literals in
  globals.css `@layer components` as explicitly out of scope (component
  styling, already var-consuming for color/motion).

**Top risks:** (1) silent class death in codemod → map generated from
tokens.ts + throw-on-unknown + per-wave grep counts + dom-truth sweep;
(2) tailwind-merge U1 recurrence → classGroups from same source + cn()
tripwire; (3) W2 atomicity → single commit w/ checklist, parser throws
loud so no silent broken intermediate.

**New/touched files:** `web/src/lib/tokens.ts` (new), `web/scripts/
generate-tokens.mjs` + `codemod-tokens.mjs` + `token-gate.mjs` (new),
`web/tailwind.config.ts`, `web/src/app/globals.css`, `web/scripts/
dom-truth.mjs`, `web/src/lib/utils.ts`, `docs/design/TOKENS.md`.

## Phase B — Agents roster refresh (short; audit complete, findings in)

Audit verdict: all 17 agent files exist and map 1:1 to ROSTER §3; the
roster LAYER (ROSTER.md + satellites) is what's stale. Work items:

B1. **Model pinning**: the 7 Sonnet agents are already `claude-sonnet-5`
    (pinned 431624b); pin the 10 `model: opus` agents → `claude-opus-5`.
    Fable 5 = the orchestrator/planner (main session, per repo precedent
    "FABLE-DECIDED") — document as ROSTER's orchestration row, no agent
    file (matches ROSTER's by-design fileless orchestrator).
B2. **ROSTER.md v2** (the roster of record, untouched since 06-23):
    remove spent `[new]`/wave-commissioning scaffolding (all built, both
    critic waves fired — d95); fix the media-tool enum (Manim → GSAP/
    MotionStage `.motion.json`; add `interactive-svg` per ADR 0017
    amendment); restate the diagram-author/interactive-author boundary
    as-lived (bespoke interactives = diagram-author; embeds =
    interactive-author, deprioritized); reconcile item-author's extended
    fan-out charter (ledgered deviation → charter); restate
    pedagogy-architect's lived scope (spec + judgment-at-scale +
    absorbed review); pr-reviewer honest status (file active-by-roster,
    never yet run — first real use = next prod push); frontend-builder
    charter for the MP lanes (dashboard-v2/bank surfaces) so UI work
    dispatches instead of bypassing; model column in 5-family terms +
    three budgets (Fable 5 orchestration / Opus 5 judgment + gated 10% /
    Sonnet 5 volume) + Gemini lane unchanged.
B3. **Kill the ghosts / heal the contradictions**: retire
    `nextjs-frontend` references (9 files, 31 hits — open decision #2:
    frontend-builder IS the frontend agent, no shell agent); mark
    `docs/pipeline/pipeline.md` superseded-by-ROSTER (competing cast
    table); delete or regenerate `agent-workflow-v2.mermaid` (5 of its 6
    agents no longer exist); fix RULES §5 self-contradiction (remove the
    stale [STATUS: not yet decided] notes, name the 5-family budgets);
    fix `.claude/CLAUDE.md` (the "Frontend: Flutter Web" line! + open
    decisions #2/#3 → resolved pointers); update the 4 spec-audience
    "Sonnet 4.8 cold" statements → Sonnet 5 (PAGE-ANATOMY, COVER-SPEC,
    NOTION-TEMPLATE-V2, EXEMPLARS); leave historical audits/ADRs as
    records.
B4. **No new agents** — the lean roster held through every campaign;
    SVT's document-reasoning need lands as charter extensions to
    pedagogy-architect/content-author/item-author (written in Phase C's
    SVT lane spec), not a new file. Flutter-owned root docs
    (README/CONTRIBUTING/PROJECT_STATUS) → rewritten minimally here or
    deleted per the standing dead-Flutter rule.
B5. **ADR** (supersedes ADR 0020's spent sections) + HANDOFF's
    model-swap rule honored: dom-truth + one gestalt pass after the
    first 5-family dispatches, before wave work.

## Phase C — The mastery road (the long middle; = mastery-push-plan continued)
Standing state folded in: engine LIVE on prod; B0 pilot built (awaiting
verdict); B1 census DONE (PC 29/36 papers, maths 48/72, 156 exercises
enumerated); V1 options built (awaiting pick); V2 docket committed
(8 major / 22 minor); DASHBOARD-V2-SPEC written (awaiting ok).

C1. V1 encode (winner → default site-wide) + V2 re-staging waves
    (docket-driven, 8 major first).
C2. Dashboard v2 build from spec (guided arc, mastery map v2,
    milestones/streak periphery, /moi, focus-refetch).
C3. B1-close + B2 transcription waves (census-driven, every-year notions
    first; challenger-verify discipline; replace the 8 SExp retypes with
    official scans; fill non-lu/non-recherché census slots).
C4. B3 conversion waves → per-notion S'entraîner banks (BANK-SPEC), wave
    gates as established (validate --strict, build, dom-truth, ledger).
C5. B4 exam-rehearsal mode: timed full papers assembled from banks +
    barème self-scoring (spec-first; periphery, calm core untouched).
C6. [pending Phase 0.4] SVT lane: cadre validation + unfreeze, sujets
    bank, document-reasoning exercise type (NEW capability), 11
    conversions, item tagging — routed to Opus 5/Sonnet 5.
C7. Definition of "sufficient for bac mastery" (checkable):
    - every non-EXC notion carries a bank ≥ its census-firm corpus;
    - exam mode: ≥1 assembled real paper per subject/filière, timed +
      self-scored;
    - dashboard v2 live (arc + map + /moi);
    - figures: 8 major re-staged, 0 legibility complaints class;
    - [if 0.4=yes] SVT: full lane to parity;
    - all gates green + fresh-eye external audit pass.

## Phase D — The bug sweep (fix everything that remains; inventory in)

Inventory triaged into three tiers. Content-correctness (owner-gated
cadre calls flagged), mechanical hygiene (autonomous), and the standing
deferred docket. Close with a fresh-eye audit + critic re-run + a
zero-known-bugs ledger statement.

D1. **Content-correctness — factual, still-open** (re-verified this pass;
    fix the ones that are pure errors, escalate cadre-scope to owner):
    - PURE ERRORS (fix): `pc/rlc-serie/items.yaml` `2π√(RC) ≈ 1,4 ms`
      (→ ≈44,4 ms) and the `:509` `≈ 22 ms` absurd-distractor;
      `pc/noyaux-masse-energie/lesson.md:226` "presque autant"/"centaines
      de fois" (real ratios 9,8× and ~47×);
      `svt/theorie-tectonique-plaques:170` Japan "plaque eurasiatique";
      `svt/genetique-humaine:46` "rare". Re-locate the shifted line refs
      (`svt/role-enzymes` trypsin pH, `probabilites-conditionnelles`
      P(B)=1, `genetique-humaine:7`) before touching.
    - CADRE-SCOPE (owner ruling, batch into one AskUserQuestion at D1
      close): `maths/structures-algebriques` anneau-unitaire axiom set;
      `svt/genetique-populations` "quatre conditions" vs five bullets;
      `maths/geometrie-espace` produit vectoriel in SM cadre.
D2. **Item-tagging + length-tell** (content-quality, autonomous): tag
    the 2 untagged PC item files (`controle-catalyse`,
    `transformations-deux-sens`, 1 misconception each vs 119 in
    rc-charge); length-tell calibration pass (philo over-corrected to 8%,
    PC 53%, maths 36% — `item-stats.mjs` measures, exits 0, so this is a
    judgment pass not a gate).
D3. **Orthotypography** (mechanical): ` - ` → ` — ` drift, quantified
    (piles 54, electrolyse 58, etat-equilibre 53, evolution-spontanee 51,
    transformations-deux-sens 46, esterification-hydrolyse 42, rc-charge
    18); the 15 ASCII ` -- ` occurrences across 7 philo files; checkpoint-
    id convention (`cp-rN-rupture` → `cp-rN-<topic>`, touches marker refs).
D4. **Repo hygiene / dead-Flutter** (mechanical, RULES §227-232 mandates):
    delete `mobile/` (2.4 MB), `GO_LIVE.md` (Flutter-era), `mockups/`
    (228 KB pre-rebuild HTML), audit `admin/`/`eval-harness/`/`shared/`
    (Dart-era) for deletion, `content/_media-test/` (1.9 MB — move to
    docs/ as ADR-0017 evidence or delete), redundant promoted drafts in
    `docs/drafts/migrations/`, empty `.audit-logs/`, resolve the two
    HANDOFF.md files (root + docs/) drift.
D5. **Media-layer defects** (from d10 audit): `rlc-serie` r8-bac unsourced
    (HANDOFF gate — swap for official scan or mark honestly), the 2
    missing `.stages.json` sidecars (energy-exchange, loi-mailles-build),
    the `energy-exchange.svg` hex-not-token + T₀/2 mislabel, MotionStage
    `"from":"below"` silent no-op + `pulse-settle` autoAlpha:0 hazard,
    the `[[video:balancement]]` dead marker (decided in Phase E, not here).
D6. **Grounding reconciliation** (doc-debt): merge or formally retire the
    three `docs/reestablish-state/` proposals (pending since June); fix
    `.claude/CLAUDE.md` Stack "Flutter Web" line + obsolete open decisions
    (overlaps Phase B B3); drop-or-fix dead `get_user_weak_areas` RPC (K-1).
D7. **Hard gates surfaced** (do NOT silently carry): down-migrations
    still absent (blocks the first non-additive migration — write the
    convention before any Phase C schema work); PostHog/Sentry
    unprovisioned (K-4); canonical-domain/noindex decision (HANDOFF §0.6).
D8. **Close**: commissioned fresh-eye external audit of the DEPLOYED site
    + WAVE-1/WAVE-2 critic re-run + item-stats/dom-truth/validate green,
    then a dated zero-known-bugs statement in the remediation ledger.
    (Deferred-but-not-bugs — 30 figure re-stagings, 65 interactive
    candidates, mcq-commit type — are Phase C mastery work or explicitly
    out of scope, NOT counted against zero-known-bugs.)

## Phase E — Generative-media enrichment (rules first, then pilots; inventory in)

Standing state: the taxonomy already exists in ADR 0017 (image: coded-vs-
generated) + ADR 0021 (motion/video partition, the hard line §2) but is
NOT lifted into RULES.md or the agent files — that lift IS open decision
#4. Gemini MCP is live (`.mcp.json`, 15 req/hr + $3/hr caps, key env-only).
ElevenLabs: zero infra, content authored voice-ready per VISION L233-238,
decision explicitly parked (ADR 0021:72). Video: `[[video:]]` marker
hard-stubbed to null in NotionBody.tsx:700, exactly 1 content reference
(`rlc-serie` balancement hook, whose own comment says "le hook fonctionne
sans lui"), 0 video assets. MotionStage already covers exact/paced
reveals better than video could (live KaTeX in foreignObject, learner-
paced, reduced-motion safe) — so video's honest scope is ONLY the pre-
math intuition/atmosphere hook.

E1. **Write the rules — resolves open decision #4** (the gating step):
    lift the ADR 0017/0021 taxonomy + the hard line ("a generated asset
    that carries load-bearing content is a defect"; generation never
    substitutes for a manipulable interactive or an exact figure/label)
    INTO `docs/Rules/RULES.md` and the relevant `.claude/agents/*.md`
    (which agent carries the Gemini/Veo brief + the mandatory verbatim
    DESIGN-BIBLE §6 style preamble — today none does); resolve the
    narration half (ADR 0021:72 left it open); provenance/labeling; the
    cost caps already in `.mcp.json`; Higgsfield's place (video, if owner
    subscribes). New consolidating ADR. This is the ONLY hard prerequisite
    for E2-E4.
E2. **Gemini atmospheric imagery** (lowest-risk, infra already live):
    sanctioned hook/scene-setting slots ONLY, §6 preamble verbatim, never
    structural (ADR 0017 stands — the garbled-tree evidence is why). Pilot
    a handful of hooks, calm-load-critic gate before any fan-out.
E3. **ElevenLabs narration pilot**: build the audio infra that doesn't
    exist yet (player UI respecting calm core — no autoplay, learner-
    paced, a11y, the VISION "cut the moment it serves stimulation over
    comprehension" rule), pilot 1 voice-ready notion end-to-end, then
    owner decides fan-out. Bigger lift than E2 (net-new surface).
E4. **Video decision** (smallest surface, decide don't build-by-default):
    per E1 rules, either commission a single Veo/Higgsfield pilot for the
    `balancement` pre-math hook (the one honest video case) and keep the
    marker, or retire `[[video:]]` entirely (renderer stub + validator +
    the 1 marker + the slot comment). Recommend deciding at E1 close;
    lean retire-unless-owner-wants-the-pilot, since motion covers the
    rest and the marker has sat dead.
E5. **Note — the bigger enrichment surface is CODED, not generated**: 30
    figure stage-depth re-stagings + 65 ranked interactive candidates +
    the SVT media layer. These are Phase C mastery work (coded lanes),
    called out here so "media enrichment" isn't mistaken for generative-
    only.

## Verification

The standing three-leg QA (DESIGN-BIBLE §13) applies at every phase gate:
(1) **dom-truth** mechanical/self-syncing — `cd web && npm run build &&
npm run dom-truth` must be green; (2) **gestalt** vs named references by a
fresh-context judge, never the author; (3) periodic **external fresh-eye**
audit of the DEPLOYED site (bac-pink.vercel.app). Plus the per-lane gates:

- **Phase A** — after each of the 6 waves: `npm run build && npm run
  dom-truth` green; the token-source `--check` (prebuild) passes; W1 diff
  of computed output is nil (byte-identical values); W4 grep counts
  (`grep -rc '\-\[var(--' web/src`) hit predictions exactly and the
  codemod is idempotent (2nd run = 0 edits); W5 `token-gate.mjs` blocks a
  planted `-[var(--` and a planted hex; the cn() tripwire blocks a planted
  U1-class merge collision. Done = one source, one syntax, every token
  family asserted in both themes, guard live, TOKENS.md frozen.
- **Phase B** — `node` jiti-loads each edited agent file (no YAML/frontmatter
  break); a full-repo grep shows 0 live `nextjs-frontend`/`Sonnet 4.8`/
  Flutter-stack references outside historical audits/ADRs; ROSTER.md is
  self-consistent with the 17 agent files; one gestalt pass after the
  first 5-family dispatches (HANDOFF model-swap rule).
- **Phase C** — per wave: `validate-content.mjs --strict` (sourcing gate),
  `npm run build`, `dom-truth` (incl. the new bank/dashboard-v2 anatomy
  checks the specs mandate), `item-stats.mjs` for length-tell, ledger
  entry. Definition-of-done is the checklist in C7 — every non-EXC notion
  bank ≥ census-firm corpus, ≥1 timed self-scored paper per subject/
  filière, dashboard-v2 live, 8 major figures re-staged, SVT to parity,
  all gates green + a fresh-eye external audit pass.
- **Phase D** — `validate-content.mjs`, `dom-truth`, `item-stats` all
  green; WAVE-1/WAVE-2 critic re-run; the dated zero-known-bugs statement
  in the remediation ledger is the exit.
- **Phase E** — E1's rules/ADR merged BEFORE any pilot; each generated
  asset passes calm-load-critic against DESIGN-BIBLE §6; provenance
  labelled; cost caps observed.

**Production discipline is unchanged and overrides everything here:** any
prod push is human-gated (owner-synchronous), needs a passing branch-test,
migrations are append-only and ship verify blocks, service_role never
reaches Vercel, and the model-id grep gate runs before every commit.

## BASCULE ARCHITECTURALE (owner, 2026-08-12) — deux moteurs

Le coût par jeton de Claude interdit de lui faire écrire les ~35 scènes
restantes + les conversions PC + les phases D/E. L'owner a Google Pro
(forfait) : **Google devient le cheval de trait, Fable reste
l'orchestrateur.** Budget Claude restant volontairement mince ($6) :
il a servi à poser l'infrastructure, pas à produire.

**Livré et poussé (5d3d196) :**
- `docs/ops/SCENE-CONTRACT.md` — la loi de fabrication, extraite des
  consignes qui ont produit les 14 scènes validées. **C'était l'actif
  le plus précieux de la campagne et il n'existait que dans
  l'historique de conversation.** Il est maintenant dans le dépôt.
- `docs/ops/DISTRIBUTED-BUILD.md` — la répartition, les six portes, le
  mode d'emploi Antigravity, le registre des risques, l'économie
  (facteur ~30 : ~250k jetons par scène → une écriture de bons + un
  échantillon par lot de 6).
- `scripts/scene-lint.py` (porte 1) — étalonné : retrouve la ligne
  fantôme et les 14 scènes sans graduations ; deux faux positifs
  corrigés avant commit (fondu général ; MathTex coupé pour la
  couleur). **Il a aussi trouvé un défaut réel passé au travers de
  l'audit visuel : une legende() de 4 lignes dans bk-2021-n-x3.**
- `scripts/bank-fidelity.py` (porte 4) — contre la corruption
  silencieuse de valeur (mode d'échec Gemini mesuré). Volontairement
  étroit ; les 14 validées passent. Premier jet jeté car il passait
  toujours (fausse assurance = pire qu'inutile).
- `scripts/make-work-order.py` + `work-orders/` — 40 bons générés
  (plages de lignes calculées) + BT-000 (gardes structurels dans
  BacScene), BT-001 (rattrapage graduations ×14), BT-002 (finir les
  deux scènes en cours).

**Répartition arrêtée :** Google = écriture des scènes, auto-audit
image par image, rendus, conversions de banque, brouillons de
transcription. Claude = rédaction des bons, échantillon d'acceptation
(1 scène par lot), vérification adversariale des transcriptions
(NON négociable), arbitrage pédagogique, contrat/ADR/BacScene,
production (porte humaine).

**Ordre de démarrage :** BT-000 → BT-001 → BT-002 → le flot du
manifeste.

**Comparaison de modèles (demandée par l'owner) :** Sonnet =
bk-2019-n-x4 + bk-2021-n-x4 (écrites, auditées) ; Opus = bk-2023-n-x4
(653 lignes, à finir) ; Fable = bk-2024-n-x4 (jamais commencée, crédits
épuisés) ; Google = quatrième point, même notion. Juge commun : les six
portes puis l'œil de l'owner.

## Execution log
_(per step: date, what, sha)_

### Phase A — Design system: FULL systemization — COMPLETE (2026-08-05)
Branch claude/vibrant-fermi-v1lxj5. Baseline HEAD 410b6d0 (build + dom-truth
169/0). All waves: build green, model-id gate clean, committed.
- W0 baseline — dom-truth 169/0 recorded.
- W1 `d6ab97c` — tokens.ts single source + generator + tokens.generated.css
  + globals @import + prebuild --check. Byte-identical (56 :root / 42 .dark),
  dom-truth 169/0, drift-gate proven.
- W2 `b8f193e` — tailwind.config + dom-truth parseFontSizes + cn() all read
  tokens.ts; fontSize/radius/screens derived; text/border → clean aliases;
  dead shadow-subtle/soft removed. dom-truth 169/0 (atomic).
- W3 `1763874` — new families (tracking-eyebrow, touch-target, z-scale),
  motion unified (one `motion` source → CSS vars + tailwind); dom-truth token
  sweep (66/66 both themes) + cn() tripwire (51 pairs). 172 checks, 0 fail.
  Sweep proven to catch a planted 1-digit drift through a var() reference.
- W4 `0693f63` — codemod 429 arbitrary usages → aliases (393 colors + 36
  numeric), map derived from tokens.ts, idempotent; cross-role color keys
  added. 1 allowlisted arbitrary remains (accent form control). dom-truth
  172/0; every alias verified emitting in built CSS.
- W5 `0e372a0` — token-gate.mjs (bars new arbitraries) wired as npm script +
  dom-truth Gate 0; proven to catch var/hex/z + honor escape hatches.
  TOKENS.md v2 (source = tokens.ts, code-only tokens documented, theme
  registry marked deferred, changelog). dom-truth 172/0.
Definition-of-done met: one source, one syntax, every token family asserted
in both themes, guard live, TOKENS.md frozen.

### Phase B — Agent-roster refresh (5-family era) — COMPLETE (2026-08-05)
Commit `ce3f12a` (pushed). Docs/config only.
- B1: 10 `model: opus` agents → claude-opus-5 (7 already sonnet-5); all 17
  frontmatter parse.
- B2: ROSTER.md v2 — 5-family routing + budgets; all agents [live], both
  waves fired; MotionStage/GSAP (not Manim); diagram-author owns
  interactive-svg; pr-reviewer honest status; frontend-builder MP-lane charter.
- B3: ghosts killed — no nextjs-frontend shell agent; CLAUDE.md Flutter line
  + open decisions #2/#3 fixed; RULES §5 → 5-family, stale [STATUS] removed;
  4× "Sonnet 4.8 cold" → "Sonnet 5 cold"; pipeline.md superseded banner;
  agent-workflow-v2.mermaid deleted.
- B4: README/CONTRIBUTING rewritten to Next.js; PROJECT_STATUS + ARCHITECTURE
  deleted (superseded by HANDOFF + ADRs). No new agents.
- B5: ADR 0027 records Phases A + B.
### Phase C — IN PROGRESS (owner: "go for c"; keep pushing to this branch)
- **C1/V1 SHIPPED** `1a1b63f` — a2 figure step-text (lede serif + accent
  ordinal) is the site-wide default; figTextOption A/B plumbing removed;
  /options/figtext deleted; dom-truth figcaption checks → a2. Executed by
  frontend-builder (Sonnet 5) — first 5-family dispatch, model-swap
  validated. dom-truth 174/0. (C1b V2 figure re-staging still pending.)
- **C3 bank fan-out — pattern PROVEN, wave 1 SHIPPED** `1b7c38d`:
  - Recon mapped readiness: only B0 pilot existed; 29 PC + 14 maths
    VERIFIED-transcribed exercises in docs/sujets/ ready to convert (zero
    new transcription); SVT absent (frozen); philo essays out of v1 scope.
  - Wave 1 = content/pc/rc-charge/bank.yaml (2 entries) + content/maths/
    nombres-complexes-1/bank.yaml (3 entries). Authored by content-author
    (Sonnet 5) ×2 parallel; verified (validate --strict, physics/maths
    spot-check, build, dom-truth 174/0).
  - Editorial flags (no owner action needed now): recoupement with r-bac
    summit → already decided by Phase 0 verdict "keep duplicates";
    complex-numbers exercises reach into rotation/argument formulas the
    lesson body doesn't yet teach (matches r-bac precedent) → noted for
    the eventual pedagogy/lesson-completeness pass.
  - READY TO CONVERT NEXT (zero new transcription): maths/geometrie-espace
    (3), maths/denombrement|fonction-logarithme|fonction-exponentielle (2
    each), pc/decroissance-radioactive (2), + ~19 single-entry PC starters.
    B2-transcription-blocked (every-year high-volume, capped at 1-2
    verified): chute-mouvements-plans, rlc-serie, suites-numeriques, the
    SM trio (structures-algebriques/arithmetique/nombres-complexes-2),
    complexes-1/geometrie volume ceilings.
  - Wave 2 `7aa60ab` (5 notions, 11 entries): geometrie-espace(3),
    fonction-exponentielle(2), fonction-logarithme(2), denombrement(2),
    decroissance-radioactive(2). The MULTI-ENTRY banks — real added volume.
  - Wave 3 `a1dc554` (6 notions, 6 entries): probabilites-conditionnelles,
    arithmetique, structures-algebriques, piles, evolution-spontanee,
    esterification-hydrolyse. All SINGLE-ENTRY = ~100% summit-recoupement.
  - **14 notions now have banks.** All content-author (Sonnet 5) dispatches,
    all verified (validate --strict, hand-checked maths/physics, build,
    dom-truth 174/0). Recurring lesson-completeness gaps (Fermat, sous-
    groupe, line-vs-sphere tangency, rotation/arg, Rolle/TAF/IPP) bridged
    at point-of-use per r-bac precedent, flagged for a pedagogy pass.
  - **STRATEGIC FINDING (→ owner decision):** the conversion lane is
    nearly tapped out. Multi-entry banks (waves 1-2) added real volume;
    the remaining ~17 single-entry notions are ~100% summit-recoupement
    (a S'entraîner chapter that just repeats the summit — NOT new
    exercises). The owner's real goal ("ALL the bac exams per notion, more
    exercises = more mastery") needs B2 TRANSCRIPTION (source + transcribe
    the sourced-but-not-transcribed papers — PC ~27/125 exercises done,
    maths 156 shallow), a different kind of work (reading scans, sourcing-
    limited). Surfaced to owner: finish thin single-entry conversion / pivot
    to B2 transcription / pivot to another lane (C2 dashboard v2, etc.).
  - **PIVOT EXECUTED (owner: "Pivot to transcription — more real exercises").**
    B2 transcription lever engaged. SM-trio sourced+verified+converted:
    - Transcribed SM papers 2020/2022/2024 (element 109635/136604/145739,
      course-436) → structures/arith/complexes-2 each +3 verified exercises
      (adversarial-diff clean). Shas e624a47→026b8c6.
    - Converted to banks (content-author ×3): arithmétique 1→4 (`6a98ce9`),
      structures-algébriques 1→4 (`6a98ce9`), nombres-complexes-2 new 4-entry
      bank (`87a9efd`). 9 new every-year SM exercises now LIVE. Fixed 3
      authoring bugs the agents missed/self-fixed (\equiv double-quote escape,
      literal φ in \text{}, d'angle apostrophe). Full gate: build ok,
      dom-truth 174/0. All maths derivations hand-checked.
    - Editorial flags (no owner action — standing verdicts cover them):
      2019↔r-bac summit recoupement (keep per Phase 0 + nc-1 precedent);
      lesson-completeness gaps (sous-groupe critère, anneau intègre,
      complex-coeff quadratic) bridged at point-of-use, flagged for pedagogy.
  - **SM 2021/2023/2025 BATCH COMPLETE — 8 new exercises live.**
    Full transcribe→verify→convert pipeline, all sequential/limit-safe:
    - Transcribed (per-paper agents, sequential): 2025 (upload-87482, clean),
      2023 (upload-85316, heavy mojibake), 2021 (upload-84150, 3-exercise
      paper → no structures). Shas 4729258/8a996c5/6f1cb52. 2021 arith+cplx
      are 4-pt exercises.
    - Adversarially verified (per-paper agents, sequential): each re-fetched,
      re-derived upload independently, char-by-char diff + re-derived maths.
      All conformant, 0 discrepancies. 2023 structures ℝ²/ℚ² domains judged
      independently (E=ℝ², F=G=ℚ²), logic-forced, (glyphe à confirmer) kept.
      Shas 0b306d4/656eacb/a337644.
    - Converted to banks (content-author ×3): arith 4→7, structures 4→6,
      complexes-2 4→7. Sha 6eac1c5. Gate green (validate 3 dirs, build,
      dom-truth 174/0). LESSON LEARNED: 3 concurrent content-authors → 1
      died at launch (collision); re-dispatched solo BUT the original was
      just slow (41 min) not dead → had to TaskStop the duplicate. Diagnose
      liveness by transcript mtime is unreliable; prefer waiting on the
      completion notification.
    - **SM trio now = 20 real past-bac exercises (2019–2025 every year).**
      Lesson-completeness gaps flagged in per-file SCOPE NOTES (CRT, critère
      d'Euler, cocyclicité, deux-lois transport, espace vectoriel, Moivre).
  - **SExp LANE BATCH COMPLETE — 5 new exercises live.** Same full
    transcribe→verify→convert pipeline (per-paper sequential transcription,
    per-notion verification, 2 content-authors for conversion).
    - Transcribed 2024 (upload-87124: géométrie Ex2 + complexes Ex3 +
      dénombrement Ex4), 2021 (upload-84139: complexes Ex3 only — paper is
      analysis-heavy, NO géométrie/probability), 2020 (upload-80918:
      complexes Ex2 only — same analysis-heavy structure). Shas
      8e0d375/d3f96b0/5796480. FINDING: SExp géométrie+probability exist
      only in 2019/2022/2023/2024; 2020/2021 are suites/fonctions/complexes.
    - Adversarially verified (2 agents: complexes-1 ×3 years, then 2024
      géométrie+dénombrement): all conformant, 0 discrepancies; sphere
      radius R=5 (not r²) confirmed by zoom+corroboration; dénombrement-vs-
      conditionnelle classification independently confirmed. Shas
      8f8afb3/c58918f.
    - Converted (content-author ×2): nombres-complexes-1 3→6 (now
      2019–2024 every year), geometrie-espace 3→4, denombrement 2→3. Sha
      ffcec44. Fixed a KaTeX guillemets-in-\text{} render bug. Gate green
      (validate 0 fail, build, dom-truth 174/0). Gaps flagged in SCOPE
      NOTES (homothétie, médiatrice, indépendance d'événements).
WINDOW TOTAL (this session): 22 new bank exercises live across 6 notions
(SM trio +11 to reach 20; SExp complexes-1/géométrie/dénombrement +5;
earlier SM-trio conversion +... ) — all via the transcription lever with
full adversarial verification, every commit gated.
MODEL SWAP (2026-08-06): orchestrator → Fable 5. Per verification-skill
rule, re-ran dom-truth (174/0) + gestalt pass (arithmetique lesson,
desktop-light) BEFORE new work. Gestalt: anatomy correct, bank surfaced
("S'entraîner · 7 sujets"), stamp == ffcec44. Two findings for Phase D:
(1) TOC sidebar chapter labels render raw LaTeX ($\mathbb{Z}$, $\mathrm{PGCD}$
literal — nav titles not KaTeX-rendered, pre-existing); (2) shots.mjs
TimeoutError mid-run after motion-beat clips (dark/mobile sets not
produced — investigate in D).
OWNER "go" (2026-08-06): analyse batch authorized.
OWNER rulings (2026-08-06, mid-analyse-batch): (1) SVT lane = completely
separate patch (stays out of C3); (2) subagent model routing corrected to
roster budgets — transcription agents → model:sonnet (volume), adversarial
verification → model:opus (judgment), conversion already content-author/
Sonnet 5; general-purpose agents were inheriting the orchestrator model
and burning its session limit (cause of the agent deaths); (3) orchestrator
stays Fable 5.
  - **ANALYSE BATCH COMPLETE (owner 'go') — 8 new bank exercises live.**
    Full pipeline under the corrected model routing (transcribe=sonnet →
    verify=opus → convert=content-author/sonnet):
    - Transcribed SExp 2024/2020/2021 analyse (edebd8b/a0d88fb/4b20244):
      suites ×3, limites ×2 (first dedicated entries ever), log problèmes
      ×2 (2021 f=2x ln x−2x 9pts; 2024 f=x+1−ln(e^x−x) 8pts), exp problème
      ×1 (2020, 7pts). Real scan findings: 2020 missing grid for Q7
      (confirmed genuine); figure descriptions with (lecture à confirmer).
    - Verified 8/8 (556f8b9 pass A 5/5; ca5df79 pass B 3/3 with 2 certain
      micro-corrections: 'Etudier' unaccented, figure-label position;
      markers lifted with confirming computations).
    - Converted (6812142): suites-numeriques NEW bank (3), limites-
      continuite NEW bank (2), fonction-logarithme 2→4, fonction-
      exponentielle 2→3. Gate green (validate ×4, build, dom-truth 174/0).
    - **TOTAL NOW: 56 live bank exercises (46 maths, 10 PC), 2012–2025.**
      Every SM+SExp maths notion with a bank ≥2 entries except
      probabilites-conditionnelles (1).
  - **PC LANE FIRST BATCH COMPLETE — chute-mouvements-plans 0→4 bank.**
    (0e07286 transcribe ×3 → 251157a/e71dfff/3df4777 the 4-PASS verify
    loop → 325f72f bank.) THE VERIFICATION LOOP PROVED ITSELF ON PC:
    pass 2 caught 6 figure-geometry errors (2019) + a text-imported
    'hélicoptère' that the photo shows as a PLANE (2021); pass 3 caught 2
    more (2019) + promoted 2021; pass 4 pixel-measured 2019 clean →
    promoted. Every NUMBER was char-exact everywhere — the systematic
    risk is FIGURE DESCRIPTIONS WRITTEN FROM ÉNONCÉ TEXT, not values.
    Future PC transcription prompts must say: describe figures ONLY from
    the image. filiere field convention: "SPC" (normalized).
    **TOTAL: 60 live bank exercises (46 maths, 14 PC).**
  - **rlc-serie 0→3 bank** (5634865 transcribe → 7213adf verify with
    pixel-adjudicated graph reads → 3c7f969 bank + dom-truth check
    'Chapitre 3/10'→'3/11' same-commit). Docs already held verified
    2018+2019 entries — bank got 3 entries in one conversion. **FINDING
    for owner: verified 2018+2020 cover exactly the unsourced r8-bac
    summit's scope → direct ADR-0019 replacement candidates (HANDOFF
    gate).** TOTAL: 63 live (46 maths, 17 PC).
  - **PC WHOLE-PAPER HARVEST + CONVERSION COMPLETE (2018–2021).** All 4
    located SPC papers fully covered: 2020 +ondes Ex II (00b089b), 2021
    +Ex IV 3-way partition (3303e7a), 2019 zero-gap, 2018 +3 holes
    (1d8fcfa). Verification was a WAR and the discipline won: pass-1
    caught rlc T₀=21 ms (not 28 — L wrong otherwise) + inverted modulation
    amplitudes + R/K swap (99e1ab3); pass-2 promoted the 2021 trio but
    caught the ondes crest-pair error (1 cm = 2λ ⟹ N=50 Hz not 25) +
    2018 trio figure defects (a25d8b5); final re-read promoted all 4
    remaining with independent pixel measurements (85b88fc). Conversions:
    rc-charge 2→4 + rlc-serie 4→5 (f924ad9); NEW banks ondes-periodiques
    (2), électrolyse (2), ondes-em-modulation (2, recovered from an agent
    killed by a transient org-subscription API error) + réactions 3→4
    (366f223). **TOTAL: 73 live bank exercises (46 maths, 27 PC).**
    PC notions with banks: 12 (chute 4, rlc 5, rc 4, réactions 4,
    ondes-per 2, ondes-em 2, électrolyse 2, décroissance 2, piles 1,
    évolution 1, estérification 1 — plus dénombrement… [maths]).
    Owner-arbitration flags accumulated: r8-bac replacement candidates
    (rlc 2018+2020), électrolyse/ondes-per/réactions r-bac recoupements
    (keep-duplicates standing), K_b analytical vs R9 graphical-only.
OWNER (2026-08-06 evening): "continue with pc 2022-2024 recon and the
maths tail" — IN FLIGHT:
- PC recon DONE (one WebFetch of hub section/4585): SPC session-normale
  sujets 2022=element/136621, 2023=142476, 2024=145763, +BONUS
  2025=145796 (no corrigé yet). Full-paper harvests dispatched
  recent-first (2025 first), one sonnet agent per paper, sequential;
  then per-notion Opus verification (figures-from-image discipline),
  then conversion.
- Maths tail: calcul-integral + equations-differentielles 1-entry banks
  (both = 2022 r-bac summit source, FULL recoupement, keep-duplicates
  verdict applies, flagged) — 2 content-authors dispatched. SM 2017
  (element/57970) + 2018 (65508) trio transcriptions queued after.
VERIFICATION CAMPAIGN CLOSED (2026-08-07, e3efbe2): PC 2022/2023/2024/
2025 all fully vérifié (33 entries, multi-pass with pixel measurements);
SM 2017 vérifié; SM 2018 vérifié-contre-source-retypée (bank conversion
OWNER-GATED). Named defect classes for the lever: figure-from-énoncé-text,
calibration-arrow-as-period, axis-labels-stopping-short-of-range. One
12-hour agent stall survived (overnight usage window) — watchdog pattern
now standard.
CONVERSION QUEUE (verified, not yet banked — dispatch in pairs,
content-author/Sonnet): réactions 4→8 (2022/23/24/25), décroissance 2→6,
rlc-serie 5→9, chute 4→9 (2022×2+2023+2024+2025sat), rc-charge 4→6,
ondes-em 2→5, électrolyse 2→3, estérification 1→2, dipole-rl NEW (2023+
2024 [+July-verified 2019 partie I if present]), systemes-oscillants NEW
(2023+2025), ondes-progressives NEW (2022+2024 [+2024-harvest]),
suivi-temporel NEW (2024 [+July 2021]), etat-equilibre NEW (2023 [+July
2015]), noyaux NEW (2023 [+July 2020]), rotation-axe-fixe NEW (2024
[+2011 R]). SM: arith/structures/complexes-2 each +1 (2017); 2018 held.
OWNER PAUSE (2026-08-07 evening): usage-limit crashes → pipeline PAUSED
at 859c5ff (clean, gated, tree clean; 107 live bank exercises: 48 maths,
59 PC). Conversion pairs 1-4 done (réactions 8, chute 9, rlc 8,
décroissance 6, dipole-rl 3 NEW, oscillants 3 NEW, ondes-em 4,
ondes-progressives 3 NEW). REMAINING QUEUE: électrolyse+1 (2022),
estérification+1 (2023), NEW banks suivi-temporel/etat-equilibre/noyaux/
rotation-axe-fixe, SM 2017 trio +3; SM 2018 owner-gated (retype).
DELEGATION RESEARCH delivered to owner (Gemini-drafts→Opus-verify pilot
via existing API key / Claude API-key overflow for batch days /
NotebookLM for SVT cadre phase / skip Kimi-Qwen / process fixes: defect
classes into transcription prompts, ≤8-entry agent scopes, watchdogs).
GEMINI LANE PILOT COMPLETE (owner "go ahead with the gemini key",
2026-08-07): scripts/gemini-vision.mjs built (key env-only, -latest
model aliases); SExp 2018 maths trio (element/94699) drafted by
gemini-pro-latest at ZERO Claude vision cost → formatted by orchestrator
(39d9411) → Opus adversarial gate (000a6d8) → independent confirming
re-read (a46757c). GATE CAUGHT A SILENT VALUE CORRUPTION: draft wrote
a=-1/2+(√3/2)i where the scan prints (3/2)i (contamination from d just
above); confirmed by zoom pixel evidence + independent maths. All 3
entries vérifié; geometrie-espace 4→(2018 available), complexes-1 +2018,
denombrement +2018 in docs (conversion still queued). CALIBRATION
VERDICT: ~1 substantive error per 3 exercises + ~4 cosmetic silent
normalizations per exercise → lane USABLE for volume drafting, Opus
adversarial gate NON-NEGOTIABLE, per-value zoom mandatory near similar
adjacent expressions. Formal RULES/agents lift of the lane = Phase E1.
OWNER "continue with the hybrid pipeline" (2026-08-07 night) — RESUMED:
- Conversion pair A SHIPPED: SExp 2018 trio (geometrie-espace 5,
  complexes-1 7, denombrement 4 — commit 06774b9) + SM 2017 trio
  (arithmetique 8, structures 7, complexes-2 8 — commit e1210dc).
  All gates green (validate --strict ×6 = 0 fail, build, dom-truth
  174/0, model-id grep clean). 113 live bank exercises (54 maths, 59 PC).
- Conversion pair B (NEW banks suivi-temporel-vitesse + etat-equilibre,
  noyaux-masse-energie + rotation-axe-fixe) — BOTH agents killed at
  launch by the WEEKLY usage limit ("resets 8pm UTC"). Zero files
  written; tree clean at e1210dc. REMAINING QUEUE unchanged: the 4 NEW
  banks (2 entries each), rc-charge +2 (2022+2025), électrolyse +1
  (2022), estérification +1 (2023). SM 2018 stays owner-gated.
- NOTE: Gemini lane covers TRANSCRIPTION drafts only (owner-sanctioned
  scope); bank AUTHORING is Claude judgment work — not moved to Gemini
  without an explicit owner call.
AWAITING: weekly-limit reset (or owner picks main-loop authoring /
API-key overflow per the research memo) to finish the 8 remaining
conversion entries.
OWNER INDUSTRIALIZATION DIRECTIVE (2026-08-07 night): before resuming,
plan the industrialization: Playwright CLI; animated/visual exercise
explanations ("not just do the exercise — explained with animation,
very well developed") via Manim (3Blue1Brown's engine, owner found it);
ElevenLabs Studio later; CHECK: does ElevenLabs API do video/image or
audio-only? (if audio-only → build our own scripted animation library,
owner batch-renders via Cowork); NotebookLM ahead; check "y-router"
repo for usage limits. RESEARCH VERDICTS (2026-08-07, sourced):
- ElevenLabs API = AUDIO-ONLY (TTS/STT/music/SFX/dubbing/voice tools/
  forced alignment). Image & Video EXISTS but only as ElevenCreative
  STUDIO UI (hosts Sora 2/Veo 3.1/Kling/Seedance/FLUX — no API
  endpoints, free plan images-only 3/day, video needs paid plan).
  → Owner's decision rule fires: BUILD THE SCRIPTED LIBRARY (Manim).
  Generative video couldn't carry exact math pedagogy anyway (ADR 0017
  line); 3b1b himself uses coded animation.
- Manim CE: MIT, pip, CLI batch render, LaTeX typesetting, mp4/webm;
  needs python+ffmpeg+LaTeX locally OR the manimcommunity Docker image
  (recommended for Cowork batch). Fits "coded, exact" philosophy — NOT
  generative. Re-opens ADR 0021 video scope DELIBERATELY (new surface:
  per-exercise explanation videos; MotionStage keeps in-product
  interactive motion). Rules-first mini-ADR before pilot.
- "9 router" = y-router (luohy15/y-router): unofficial proxy letting
  Claude Code run on OpenRouter models (Anthropic⇄OpenAI format
  translation, Cloudflare Worker/docker). Recommendation: SKIP — for
  Claude-quality overflow the first-party ANTHROPIC_API_KEY is
  strictly better (no proxy trust, no markup; Sonnet 5 $3/$15 — intro
  $2/$10 thru 2026-08-31; Opus 5 $5/$25; Batches −50%); its real value
  is non-Claude models (Kimi/Qwen) we deliberately skipped; Gemini
  already covers free volume.
- NotebookLM: NO official API/MCP; community MCP servers
  (PleasePrompto/notebooklm-mcp v2.2, jacob-bd CLI) drive a real
  Chrome session, citation-grounded answers, zero Claude tokens.
  Owner-desktop Cowork setup; use for cadres/SVT/corrigé checking.
- Playwright: repo already drives playwright-core in dom-truth. Lane =
  GitHub Actions CI (validate+build+dom-truth+token-gate per PR, stops
  gates burning session usage), fix shots.mjs timeout (Phase D item)
  via @playwright/test retries/traces, toHaveScreenshot visual
  regression for the coming media surfaces.
FIVE-LANE PLAN presented; OWNER VERDICTS (2026-08-11): D1 Manim YES
with CORRECTION — render in Claude Code directly, NOT Cowork (Cowork
reserved for ElevenLabs Studio/E3); D2 NO API key — stay within
subscriptions; D3 Playwright/CI authorized; D4 NotebookLM go; D5
y-router skip (implied by D2).
INDUSTRIALIZATION EXECUTED (2026-08-11, all pushed):
- L1 CI: .github/workflows/gates.yml (validate --strict ×62 dirs +
  build + dom-truth + model-id hygiene gate on PRs; dom-truth
  PW_CHROMIUM_PATH override; local 174/0 re-verified) f349db8. MAIDEN
  RUN scored 174/1 — the documented cold-boot flake caught live in CI
  (forbidden-text sweep raced KaTeX hydration, read "T0T_0T0"
  mid-render on probabilites-conditionnelles); retry encoded 3014594,
  REAL FIX = hydration-settle wait in dom-truth → Phase D docket.
- L2 Manim lane: ADR 0028 (deliberate ADR-0021 revisit; rules: coded/
  exact, tokens.ts palette sync rule, calm player contract, NARRATION
  field day-one, storage decision deferred owner-gated) + animations/
  (bac_style.py w/ minimal TexTemplate — light TeX install; BacScene;
  manifest; render.sh native/docker; SETUP.md) + PILOT SCENE
  bk-2018-n-x2 4bcf598+3014594. RENDERED IN-CONTAINER end-to-end:
  venv manim 0.19.0 + ffmpeg + texlive-base/extra/fonts-recommended
  (Debian setuptools install_layout bug → venv sidesteps); 65
  animations, 78 s, 480p draft + 1080p60 final; mp4 DELIVERED to owner
  via chat for pilot review. Env persists in this container
  (/root/manim-venv) for follow-up scenes.
- L4 NotebookLM: docs/ops/NOTEBOOKLM-SETUP.md a6877b0 (desktop MCP
  steps, 4 notebooks, usage rules: recoupement-jamais-certification).
OWNER PILOT VERDICT (2026-08-11): format loved; TOO FAST; "explain
everything in extreme detail, no assuming, move by move"; wants
clickable step-through if possible. NOTEBOOKLM DROPPED for now (owner
call after desktop-auth setup friction; wiring stays inert; recorded
in ADR 0028 Retractions).
V2 STANDARD SHIPPED (6d13794): règle du zéro implicite (ADR 0028
amendment 1 + README) — one Manim section per algebraic move
(what/why/computation digit-by-digit), spoken-register caption per
step, step counter, TEMPO dial (1.35), --save_sections default →
continuous video + one clip per step + JSON index = source of the
future click-through player (one step per click). Pilot rebuilt:
bk-2018-n-x2 = 32 steps / 135 anims / 4:08 (was 65/78 s), includes
the d-vs-a radical trap as its own warning step. 720p30 delivered to
owner in chat.
OWNER v2 VERDICT (2026-08-11): detail/pace GOOD; add (1) MEANING layer
("what does each signify" — build understanding not just correction),
(2) more VISUAL annotation (circle a,b,c in equation + arrows — his
example), (3) fix OVERLAPPING TEXT via real screen management; asked
for state-of-the-art research on best math-explainer practice.
V3 SHIPPED (37de8d7): research grounded (Mayer signaling/contiguity/
segmenting/coherence + Oxford didactic-roles taxonomy) → codified as
animations/DESIGN.md (hard screen zones, ardoise managed column,
semantic colors a=teal/b=gold/c=green/red=traps, meaning-beat table:
Δ=detector, module=distance segment, argument=angle arc, conjugate=
mirror, one-animation-one-role). BacScene: ardoise ecrit/nettoie +
entoure/fleche_vers helpers. Pilot v3 = 38 steps/171 anims/4:44 with
coefficient signaling exactly as owner asked. FRAME-BY-FRAME visual
verification now part of the loop — caught 5 layout defects (table
off-screen, sols-caption collision, 3 label overlaps) pre-delivery.
720p30 delivered in chat.
OWNER v3 VERDICT (2026-08-11): "very very good" BUT still an overlap
+ "much more visual — show the angle when you say angle, show the
arrow tracing the translation".
V4 SHIPPED (55cc595): show-what-you-say beats — translation vector OA
recopied at B with B gliding along the rail to C (owner's exact ask);
rotation angle 2π/3 DRAWN between OA/OB (own step, equal gold radii);
θ→2π/3 transform on the argument arc. Overlap killed structurally:
ARDOISE_BAS −1.95 (full 3-line caption reservation) + AUDIT PROTOCOL
NOW EXHAUSTIVE (last frame of every section → contact sheets → all 38
inspected). Caught: Q1 hand-laid stack vs caption (computations moved
to right half), 2 Angle() reflex-arc bugs w/ labels crowding O (fixed
+ labels at arc midpoint outward). Re-verified clean. 38 steps/177
anims/4:55, 720p30 delivered.
OWNER v4 APPROVED + "continue the production for all the other
exercises in Math" (2026-08-11 evening). CAMPAIGN LIVE — task #22:
53 scenes queued in animations/manifest.yaml (order: nc-1 siblings →
nc-2 → analyse → dénombrement/probas → arith/structures → géométrie
3D last). Production chain in README (author Sonnet → orchestrator
render+exhaustive frame audit → math check vs bank → gated commit).
CI: gates GREEN after next/font cache+retry hardening (bd766a6).
Weekly limit RESET confirmed. Author-agent rule: INCREMENTAL file
writes (~120 lines/call max — one died on the 64k output cap).
PROGRESS (407553f pushed): VALIDATED 3/53 + pilot = bk-2018, bk-2019
(44 st), bk-2020 (55 st, 7:47, sample delivered to owner), bk-2021
(65 st, 8:02 — fixes: axe-imaginaire label moved INSIDE figure
[run-on class], leftover rotation arc purged). STRUCTURAL BacScene
guards accumulated: epingle() pinned card, LARGEUR_MAX auto-scale.
STATE AT 56472ed (pushed): nc-1 VALIDATED 5/7 — 2018 pilot + 2019
(44st) + 2020 (55st, 7:47) + 2021 (65st, 8:02) + 2022 (40st, 5:22).
bk-2023-n-x2 + bk-2024-n-x3 STILL A-PRODUIRE (the 56472ed commit
message wrongly says "nc-1 block COMPLETE 7/7" — manifest is the
truth; correct the record in the next commit message). 2022 fixes:
A/B labels off the axis, encadre() BacScene guard #3 (frames fused
with ardoise lines), CI dom-truth 2nd retry (two independent timing
flakes drawn in one run 31538723279).
GOVERNANCE EPISODE (af83436): first nc-2 pair REFUSED correctly —
motion-author agent file lacked the ADR 0028 charter; lifted to v0.3
(two lanes: MotionStage + explication animée). Agent-file authority
respected; re-dispatch accepted.
NC-2 SCENES AUTHORED, AUDITS IN FLIGHT: bk-2019-n-x2 (64 steps, 298
anims; symbolic-m exercise, illustration m=i explicitly flagged "un
choix, pas une donnée", closes on bank's own control h=i) — rendered
CLEAN to media/maths-nombres-complexes-2/ (COLLISION FIX: nc-1 and
nc-2 both have bk-2019-n-x2.py; manim keys output by basename →
render.sh now derives --media_dir media/<matière>-<notion>/ per
scene; polluted media/videos/bk-2019-n-x2 purged; NOTE nc-1 2019+
others' 720p30 finals now live under old media/videos/ — regenerate
via render.sh when needed); 17 contact sheets s19sheet*.png READY
UNREAD at scratchpad. bk-2017-n-x2 (50 steps, 263 anims, cocyclicité
via nested Thales, two flagged illustration values m=1+i and
m'=−1+2i, epingle'd rapport tool box) — rendered clean (unique
basename, media/videos/bk-2017-n-x2), 13 sheets s17sheet*.png READY
UNREAD. AUDIT NEXT: read all s19 then s17 sheets, fix, spot-check,
-qm finals (WITH per-notion media_dir), manifest validé, commit
(also commit render.sh media_dir fix + .gitignore media*/ widening,
uncommitted). THEN: dispatch nc-1 2023+2024 pair, then manifest
order (suites → limites → log → exp → integral → equadiff →
denombrement → probas → arith → structures → geometrie 3D last).
AUDIT RESULTS (2026-08-11, post-compaction session):
- nc2 bk-2019-n-x2 VALIDATED: full 17-sheet audit clean (64/64 steps,
  maths re-derived incl. control h=i); one fix (A(a) label RIGHT of
  dot, was abutting "axe imaginaire"); -qm final rendered to
  media/maths-nombres-complexes-2/ and fix-frame verified; manifest
  → validé. COMMIT PENDING.
- nc2 bk-2017-n-x2 audited (13 sheets): maths all verified (Δ=−4m²=
  (2im)², z₁z₂ factorizations, rapport = i(m−1)/(m−i), Thalès chain,
  m'=−1+2i control). SIX defects found+fixed in source: (1) étape 4
  coefficient labels rose onto equation → eq+domaine now fade in
  étape 4 (labels take the freed row); (2) étapes 31-32 "Vérifier
  que" line under the incoming epingle card → nettoie() before
  building card; (3) figure 0.6→0.15 DOWN (bottom labels were inside
  the 3-line legende band — étapes 31/37/43/44); (4+5) BOTH π/2
  angle labels sat on landmarks (bisector from Ω points AT M(m);
  bisector from M points AT Ω) → point_from_proportion 0.25 / 0.75;
  (6) n/a — tail-fade "ghosts" (étapes 9/15/23/29/35/41/49/50)
  confirmed HOUSE PATTERN (all 5 validated nc-1 scenes end chapters
  + bilan the same way) — NOT defects. NEW AUTHOR-PROMPT RULES from
  this audit: bisector trap (angle label proportion 0.25/0.75 when
  bisector hits a landmark); plane shift ≥ −0.15 DOWN with 3-line
  captions; nettoie() before epingle. Draft re-render in flight →
  spot-check étapes 4/5/16/28/31/32/37/43/44/48 → -qm final.
- nc-1 2023 (bk-2023-n-x2) + 2024 (bk-2024-n-x3) author pair
  DISPATCHED (motion-author/Sonnet, background) with the full
  accumulated rulebook incl. the three new rules.
- nc2 bk-2017 SPOT-CHECK PASSED (10/10 fixed frames clean: 4/5/16/
  17/28/31/32/37/43/44/48) → manifest validé; -qm final render in
  flight. nc-2 now 2/9 validés.
- COMMITTED+PUSHED: 0de2025 (nc2-2019 validé + media isolation +
  render.sh + .gitignore) and 0b76408 (nc2-2017 scene + 6 fixes) —
  NOTE these two were AUTO-COMMITTED by the environment's stop-hook
  between turns (correct content, proper trailer, 2017 statut
  correctly left a-produire); 7165a92 = my statut flip to validé
  after the spot-check. All pushed to claude/vibrant-fermi-v1lxj5.
- AUTHOR PAIR KILLED at first launch by the 5-hour session limit
  (reset 23:40 UTC); RE-DISPATCHED 00:06 UTC 2026-08-12 post-reset,
  same briefs. Next on their completion: render drafts (-ql,
  per-notion media_dir), exhaustive frame audit, fixes, -qm finals,
  manifest validé, gated commit. Then manifest order: suites →
  limites → log → exp → integral → equadiff → denombrement →
  probas → arith → structures → geometrie 3D last.
- bk-2023-n-x2 VALIDATED (2026-08-12): 53 étapes; audit found 4
  defects, all fixed+re-verified (axe réel×O at left end → right end;
  D(d) straddled by imaginary axis → UP+LEFT; |a| ON module segment
  → perpendicular offset; AC vector label on x-axis → proportion 0.7).
  Transient beats audited via mid-section frames (alignment é22,
  rotation demo é33, final angle é52 — all clean). Commits 6309e7e
  (scene) + 832ba1a (fixes) + 2b4b645 (validé). NEW author-rule
  candidates: axis-end labels go on the free end away from O; segment/
  vector labels never anchored at a midpoint that sits on an axis.
  **NC BLOCKS: 9/53 validated (nc-1 2018–2024 ×7 COMPLETE, nc-2
  2017+2019).** Per this plan's standing note ("then manifest order:
  suites → limites → …"), the campaign advances to SUITES next; the
  six remaining nc-2 entries (2020–2025) stay a-produire in the
  queue and get their dispatches after the current arc (they are
  physically earlier in manifest.yaml — do not forget them; revisit
  ordering when the suites block closes).
- SUITES BLOCK OPENED: authors dispatched for bk-2020-n-x1 (bank
  l.55) + bk-2021-n-x2 (l.174) with the template's meaning-beats
  swapped to suites conventions (number-line term dots, bound as
  dashed barrier, convergence pile-up, auxiliary-suite colored dots
  ×q, cobweb only if the exercise uses f's graph; classic suites
  traps listed). bk-2024-n-x1 (l.318) next after this pair.
- suites bk-2021-n-x2 VALIDATED (10/53): 54 étapes (author said 55,
  miscount — badges continuous), audit found exactly the ONE defect
  the author pre-flagged (×3 arcs bowed down; ArcBetweenPoints
  angle=PI/2 on a left→right chord bows DOWN — use −PI/2 for up).
  Full maths re-derivation conforme. Commits 571f9b6 (scene) +
  d3fa36d (arc fix) + a4167bd (validé). NEW RULE for author prompts:
  ArcBetweenPoints left→right chord needs angle=−PI/2 to bow upward.
- suites bk-2020-n-x1 VALIDATED (11/53): 43/43 clean first pass —
  SECOND zero-defect audit (the 480p "majorant markers look off"
  scare was a tick-spacing misread; zoom showed exact 0.6/0.24
  positions). Full maths re-derivation conforme (v geometric 2/5
  chain, u_n = 3(2/5)^n/(4−2(2/5)^n) checked at n=0,1). Commits
  2cb5ef0 (scene) + 0bcbbe1 (validé). Finals: bk-2021 -qm running
  (bp5gvj823), bk-2020 -qm running (bibgu4tly).
- suites bk-2024-n-x1 VALIDATED (12/53): 47/47 clean first pass —
  THIRD zero-defect audit; barrière→marqueur L=2 verified
  mid-section; author sidestepped the arc risk with straight
  arrows for the decreasing v-suite. Commits 9586f42 (scene) +
  4c52a7e (validé). **SUITES BLOCK COMPLETE (3/3): 2020 (43ét),
  2021 (54ét), 2024 (47ét).** All three finals rendered/rendering
  to media/maths-suites-numeriques/.
- LIMITES BLOCK COMPLETE (2/2, 14/53 validated, 2026-08-12):
  * bk-2021-n-x1 (39 ét): 4th zero-defect audit; removable-hole
    hollow→filled beat, TVI existence-only with c flagged
    illustratif. Commits 77462ac (scene+fix chain) + 9818fc4.
  * bk-2020-n-x3 (45 ét): 5th zero-defect audit; FIRST Axes/plot/
    get_area scene — all conventions clean (shaded ln/2√x gap,
    asymptote+recolor at gendarmes moment verified mid-section,
    area under g). Author self-caught 2 real bugs pre-delivery
    (missing nettoie, orphaned arrow out of figure group).
    Commits 700c0bb (scene) + 0733d9a (validé).
  * LESSON: the initial bk-2020 render failure was a TRANSIENT
    dvisvgm race under 3 concurrent manim renders — re-render
    alone fixed it; don't over-diagnose render crashes when
    parallel renders run. Also: `cmd | tail -N` masks manim's
    exit code — capture full output when diagnosing.
  * Curves conventions now validated for reuse: per-chapter figure
    "group" VGroup replacement, asymptote-at-limit-moment with
    recolor, TVI sign-dots + end-ticks, derivative toolbox cards.
- LOG BLOCK IN FLIGHT. bk-2019-n-x4 authored (Sonnet; 95 ét/26
  chapters, 11-pt problème, cobweb part 2; commit ~3fa93a5+fix
  chain; np.trapz→np.trapezoid numpy-2 fix was needed BEFORE
  render — rule now in briefs). AUDIT DONE (24 sheets): maths 19/19
  verified incl. aire e−5/2 and ℓ=e; THREE defect classes, all
  cleanup-orphans: (1) (Δ)+label+arrow cross the hand-built tableau
  é39–41; (2) q12's "Construire" question line stranded é61→93 —
  ROOT CAUSE: chapter ended without nettoie() and next chapter's
  ardoise() RESETS the ledger without fading (structural hazard!);
  (3) orphaned dots/labels/arrow é61–71 + stray grey arrow in
  cobweb frames (fig group membership diverged across fade/redraw
  cycles). FIX DISPATCHED back to motion-author (Sonnet) with
  diagnosis; will re-render + spot-check after.
- bk-2021-n-x4 authored (Sonnet; 91 ét, 3 figures incl. exact g/g⁻¹
  reflection + piecewise-h origin zoom; commit 0f78601 with my
  np.trapezoid fix; asserts pass). Draft rendered (91 sections?);
  AUDIT PENDING (next action).
- **OWNER DIRECTIVES (2026-08-12 mid-session): (a) AXIS NUMBERS —
  figures must carry numeric graduations; rule added to all briefs
  + the 2019 fix; BACKFILL of the 14 validated scenes = open
  question to surface at next report. (b) MODEL COMPARISON — one
  scene each by Sonnet/Opus/Fable for owner comparison. Plan:
  Sonnet samples = log-2019/2021 (just authored); log-2023-x4
  DISPATCHED with model:opus; log-2024-x4 DISPATCHED with
  model:fable. Same notion → comparable. Report the triplet to
  the owner when all three are validated.**
  Then: exp → integral → equadiff → denombrement → probas → arith
  → structures → geometrie 3D; and the six nc-2 2020–2025 entries
  still queued.
- bk-2024-n-x3 VALIDATED (2026-08-12): 59 étapes, FIRST zero-defect
  audit of the campaign (rulebook held). Full maths re-derivation
  conforme (b=2+√3+i; b/a deux formes; |b|=√6+√2, arg π/12; b^24;
  3 rotations avec arcs; O-A″-B; b′=((3+√3)/3)ā; π/2 final). 720p30
  final + 59 sections rendered. Commits: ddf042d (scene, à valider)
  + d429f96 (validé). Author's YAML-escaping flag on bank q5 steps
  examined and CLOSED as false alarm ('' = correct escape for one
  apostrophe; rendered maths a′ is right). 8/53 validated. nc-1
  2023 author still writing (file untracked, do not commit
  mid-write).
Venv /root/manim-venv; render FROM /home/user/BAC/animations; python/
git from repo ROOT (cwd trap). Samples to owner: v4 pilot, 2020,
2022.
Other candidates: (a) SM 2017 (element/57970) + 2018 (65508) to round SM trio to
2017–2025; (b) maths ANALYSE notions — fonction-exponentielle/-logarithme/
suites-numeriques/calcul-integral are every-year, thin/no bank, seeded by
the big analyse problème in EVERY SM+SExp paper already identified (long,
multi-part — heavier transcription); (c) PC lane — all PC banks are
single-entry summit-recoupement; every-year PC notions (chute-mouvements,
rlc-serie, etc.) need their own hub/element IDs (fresh recon). Sequential
vision agents + wait-on-notification discipline confirmed.
Deferred within C: C1b figure re-staging, C2 dashboard v2, C5 exam mode,
C6 SVT lane, C7 definition-of-done.
