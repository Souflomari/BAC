# HANDOFF — the July-2026 sprint, closed (2026-07-03 · addendum 07-06)

> **07-06 :** the Fable sessions are over. Read §0 (gates, incl. 7bis),
> then **§5 — the post-Fable addendum** (D9→D12 state, the three-leg QA,
> the model-swap rule, and the first work order:
> `docs/pipeline/post-fable-work-order.md`). Consolidated records:
> ADR 0025 (first arc, 06-27→07-03) + ADR 0026 (second arc, 07-04→07-06).

> **Audience:** the next maintainer (Opus 4.8 or any standard-model session,
> cold) and the owner. This is the sprint's last act. Orientation order for
> a fresh session: `.claude/CLAUDE.md` → `docs/product/VISION.md` →
> `docs/Rules/RULES.md` → this file. The consolidated decision record is
> **ADR 0025**; the running evidence ledger is
> `docs/audits/fable-day3-ledger.md`.

---

## 0. OPEN GATES — owner decisions pending (nothing below ships around them)

1. **spec.md validation.** The RLC pedagogy re-spec was never
   human-validated (RULES §2). The rc-charge notion has NO spec at all
   (section-level test artifact) — a pedagogy-architect pass + owner gate
   before it grows.
2. **R8 bac sourcing (audit C2 — BLOCKING).**
   `content/pc/rlc-serie/exercises.yaml r8-bac.sourcing.status = unsourced`.
   The RLC notion is NOT DONE until the owner's real national sujets arrive
   and the exercise is validated against one. Template v2 §C makes this
   box uncheckable by an agent. **Do not fake it.**
3. **A3 / B1 / C1 + the accumulated taste calls** — all FABLE-DECIDED /
   OWNER-REVIEW-PENDING (full register: ledger §3/§5/§6/§7): masthead band
   A3 *(externally corroborated: the independent audit praised the
   deployed masthead unprompted)*, home B1 + cover shelf, footer C1,
   section ordinals, rung-boundary rule, R0-commit pattern, attempt-first
   register, LessonEnd anatomy as re-specced Day 7. Owner confirms or
   overrides; every spec carries its swap points.
4. **Production-sync verification** (CLAUDE.md non-negotiable). Untouched
   all sprint by design. Before ANY new migration: supervised sync check.
5. **Session-eligibility rule.** The honest "most recently updated" session
   rule now recommends the one-section rc-charge stub as today's session on
   home. Honest but front-door-wrong; an eligibility flag in notion meta is
   an owner call (do not silently invent one — it touches the honest-state
   rule).
6. **Canonical domain.** `metadataBase` and JSON-LD URLs point at the
   `bac-pink.vercel.app` preview; swap when a real domain is decided.
   `robots` stays noindex until the owner opens indexing.
7bis. **(07-06) Gates added at the Fable close:** **M1 masthead +
   RetenirZone (W3 adapté)** — OWNER-DIRECTED Day 11, §3 not yet built
   (work order item 3); **maths GeoGebra/Desmos embeds** need the owner in
   the loop (applet content unverifiable headlessly — honest-state,
   `docs/audits/d10-media-layer.md`); **the video-slot decision**
   ([[video:]] renderer-stubbed; generative tooling = CLAUDE.md open
   decision 4); **the D10 legacy figure bug** —
   `content/pc/rlc-serie/media/energy-exchange.svg` uses hex colors and
   labels a cos² peak-to-peak interval « T₀ » where physics says T₀/2
   (orphaned from lessons but in the repo: fix or delete, owner eyes);
   **ledger §11's twelve Day-11 calls** remain FABLE-DECIDED /
   OWNER-REVIEW-PENDING except where marked OWNER-DIRECTED.
7. **The maths notion is pre-sprint debt.** It predates template v2 and the
   week's grammars: rungs authored at h3 (one rail entry, no ordinals), the
   arbre-pondéré figure never built while the prose references it (C5 —
   diagram-author lane), summit unsourced, no attempt-first/derivation
   grammar. Its five leak classes were fixed in the final batch, but the
   full template-v2 retrofit is a dispatched notion-pass of its own.

## 1. External-audit triage (July 2026 — full text at
`docs/audits/external-design-audit-2026-07.md`; verification measurements
and fixes in ledger §8)

| Audit item | Verdict under measurement | Disposition |
|---|---|---|
| 5.1 Authoring text leaking (3 fragments) | CONFIRMED, undercounted — 5 fragments, 2 mechanisms; the post-fix adversarial pass then found FIVE MORE residual classes (reviewer blockquote, raw placeholder tokens, h3/table R-codes, SVG spec citations, dangling cross-refs — ledger §8) | **FIXED NOW, twice-verified:** loader strip + content edits + h3 renderer strip + class guard (expanded lexicon, visible-text semantics) + notText full-text fix. Bible §13 amendment (classes, not instances). |
| 5.2 Line length ~1076px | REFUTED as stated (that's the grid container; body prose = 65.0ch exactly) — but the sweep found real bypasses (Derivation notes ~94ch, items intro ~87ch) | **FIXED NOW:** measure caps on both; permanent ≤75ch sweep in dom-truth. |
| 5.3 Contrast risks | REFUTED — worst in-scope ratio 6.57:1, no failures either theme | **INSTRUMENTED:** permanent contrast rows in dom-truth (both themes, real user paths). Side-finding fixed: rail active link now carries `aria-current`. |
| 5.6 No dark mode | CONFIRMED, worse than claimed — dark tokens existed with NO activation path; all week's "both themes" evidence was harness-forced | **FIXED NOW:** ThemeToggle (header) + pre-paint boot script; OS default + persisted choice; dom-truth exercises the real path. |
| 5.4 Metadata incomplete | CONFIRMED in full (only title/description existed) | **FIXED NOW:** favicon + apple-touch + OG/twitter pack + canonical + JSON-LD (WebSite, LearningResource) + `public/og.png` template. |
| 5.5 Breadcrumb truncation | CONFIRMED (visual-only truncation; accessible name was complete) | **FIXED NOW:** `title` attribute. |
| §6 Math accessibility | REFUTED — 487/487 formulas ship MathML | **INSTRUMENTED:** parity sweep permanent. Finding recorded: KaTeX default output is already right; don't "fix" it. |
| §6 Manipulable sims (sliders R/L/C) | Partially exists (Falstad embed `rlc-sandbox` in R3/R6; beat-engine figures are learner-paced BY DESIGN — calm bible forbids autoplay) | **ROADMAP — interactive-author lane.** The audit's ask maps to ADR 0021's interactive tier; sliders-sim is a legitimate next asset. NOT a rejection of calm: manipulation serves understanding (VISION), engagement theater still banned. |
| §6 Persistence / progression / spaced review | Correctly absent (honest-state rule) | **ROADMAP — production lane, human-gated** (per-student state = the gated 10%; supabase-architect owns; sync gate first). |
| §6 Search | Absent, correctly low priority at 3 notions | **ROADMAP — periphery surface**, post-catalog-growth (frontend-builder lane). |
| §6 Catalog depth | True (3 notions) | **ROADMAP — content pipeline** (pedagogy-architect → authors → critics, per notion; RULES cadence). |
| §6 Figure hover/zoom, PDF export, multimodal video/audio | Absent | **ROADMAP:** figure interactivity → interactive-author (low); PDF/print → a print stylesheet exists, dedicated export is low; video/audio → the Gemini/ElevenLabs lane (CLAUDE.md open decision #4 — sanctioned uses still to be written). |
| §7 "progression % / terminé states" | — | **ROADMAP tied to persistence;** any indicator must be real state, never fabricated (honest-state). |
| — | — | **REJECTED: none.** Every audit item was either verified-and-fixed, instrumented, or mapped to an existing lane with an owner. |

## 2. The portability result (Day 7 — the week's central question)

Four articles executed by cold sonnet-alias sessions from the committed
repo + a brief each (briefs are the dispatch template:
`docs/pipeline/day7-briefs/`). All four verdicts FAITHFUL; **eleven spec
bugs** surfaced and closed same-day; the (a) re-run against the tightened
spec converged (divergences → rhythm-level micro-choices). The
divergence→tightening tables live in ledger §7 per article. **The
spec-tightening loop converges — that is what makes maintenance-by-brief
credible.** Executor-honesty caveat in ledger §7 (no Sonnet 4.8 ID exists
in the harness).

**Owner blind pairs** (unlabeled, key sealed in ledger §7):
`web/shots/day7/blind/` — pair-cover, pair-derivation, pair-prose. Where
the owner's eye catches a difference, capture what he saw — it outranks
the checklist.

## 3. How not to regress this (the one-page note)

**The three QA legs — none optional (bible §13):**
1. `cd web && npm run build && node scripts/dom-truth.mjs` — 99 checks,
   self-syncing from token sources. Green before shots, shots before claims.
2. Gestalt on full-page renders vs named references (Stripe Press, Imprint,
   Brilliant) — never the author grading their own work.
3. **Periodic independent fresh-eye audit of the DEPLOYED site.** Every
   instrument sees only what it was told to see; the July audit found what
   two in-repo legs missed (the leak class, the unreachable dark mode).
   Commission one after any major batch, from a context with no access to
   this repo's history.

**The invariants that rot silently if violated (each has a guard or anchor):**

| # | Invariant | Where it lives |
|---|---|---|
| 1 | New custom Tailwind key → classGroups same commit (U1) | `web/src/lib/utils.ts`; §13 |
| 2 | Visual/deploy claims only from rendered/fetched evidence | §13; dom-truth |
| 3 | No fabricated student state, progress, or sourcing | honest-state rule; dom-truth guard; template §C |
| 4 | Attempt-first: reasoning never in DOM pre-commit | AttemptFirstExercise; dom-truth |
| 5 | Derivation steps beyond current never in DOM | Derivation.tsx; dom-truth |
| 6 | Rung counter resets on `.notion-content`, never per segment | globals.css; dom-truth |
| 7 | Authoring notes = HTML comments, stripped at load; lexicon guard on every page | `stripAuthoringComments`; dom-truth sweep; template §E |
| 8 | Running text ≤ 75ch of its own font | dom-truth sweep |
| 9 | Dark theme reachable ONLY via boot script + toggle — never ship a token set without its activation path | ThemeToggle; dom-truth round-trip |
| 10 | Tokens only; one filled accent action per surface; calm rules (no autoplay/ripple/overshoot) | bible §0/§6/§7/§13 |
| 11 | Migrations append-only; production human-gated; sync check first | RULES §2/§3; CLAUDE.md |
| 12 | Guards assert CLASSES, not instances; new internal vocabulary extends the lexicon guard same commit | §13 amendment |

**Working discipline that made the week compound:** every dispatch ends
with report-then-stop; every claim carries its evidence or the word
"unverified"; every taste call is ledgered with FABLE-DECIDED /
OWNER-REVIEW-PENDING status; every hard-won constraint is written where a
cold reader will look (the spec, not the transcript); corrections are
recorded, never overwritten (ledger §5 stands as the example).

## 4. Repo state at handoff

Branch `claude/vibrant-fermi-v1lxj5`, PR #2 (draft). All work content-lane;
production untouched all sprint. dom-truth: 99 checks green at the final
commit. Evidence dirs: `web/shots/options/` (Day-3 sets),
`web/shots/day6/report/`, `web/shots/day7/blind/`,
`web/shots/day8-audit/` (external-audit before/after). The full shot
matrices are local-only by gitignore design.

---

## 5. Post-Fable addendum (2026-07-06) — the second arc, and how to carry it

**What D9→D12 added** (record: ADR 0026; evidence: ledger §11,
`docs/audits/d10-media-layer.md`, `docs/design/LESSON-EXPERIENCE-SPEC.md`):
the full site skeleton; 61 real lessons (SVT content intact but its media
layer untouched — Fable safety scope); the D10 media layer (all PC + maths
figures, 5 verified motions, 3 curated PhET embeds); Lesson Experience v2
§§1–2 shipped (chapter pagination + StagedFigure), §§3–5 pending in the
work order.

**The three-leg QA — none substitutes for another:**
1. **dom-truth (mechanical)** — `web/scripts/dom-truth.mjs`, 121 checks,
   self-syncing battery + sweeps. Run on EVERY build that touches
   web/ or content/. A green run is necessary, never sufficient.
2. **Gestalt reference (rendered)** — screenshot against the shots
   harness and LOOK, per DESIGN-BIBLE §10; compare to
   `docs/design/AUDIT-SCORECARD.md` anchors. Catch what selectors can't.
3. **External fresh-eye (deployed)** — periodically, a session with NO
   repo context audits the deployed preview cold (precedent:
   `docs/audits/external-design-audit-2026-07.md` — it found what both
   other legs missed). Schedule one after any multi-day arc.

**The model-swap rule:** on ANY model change (Fable→Opus, Opus→Sonnet,
version bumps), re-run dom-truth + one gestalt pass BEFORE new work.
Different models regress differently; the instruments are the contract.

**Spec-first discipline (Day-11 proof):** for any architectural change,
the spec (LESSON-EXPERIENCE-SPEC standard: contracts, file:line anchors,
ledger entries, verification criteria) lands and is committed BEFORE code.
A window that closes mid-build must leave the spec as the handoff.

**The first work order** for the next session is
`docs/pipeline/post-fable-work-order.md` — written to the Day-7 tightened
brief standard, cold-executable by Sonnet.
