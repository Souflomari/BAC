# Mastery Push — the post-go-live campaign plan (2026-07-23)

> **Origin.** The owner's first live editorial pass (2026-07-23, the day the
> engine went live) returned three findings. Verbatim substance:
> 1. *"We don't have all the bac exams yet — right now one or two per
>    notion. The bac is really oriented toward exercise practice: the more
>    exercises you do, the more you master. Right now the app isn't enough
>    to master the bac."*
> 2. *"The visual part is limited to ~4 steps but needs much more; and the
>    writing that explains the steps is too small beneath the interactive
>    visuals and not visible enough."*
> 3. *"The dashboard is just a bar showing advancement — the whole is not
>    developed enough."*
>
> Front door + calm core + the diagnosis loop passed the same pass. This
> plan turns the three findings into lanes. Model routing per RULES §5:
> this document is the upstream spec; execution is workhorse-model waves
> dispatched by brief; the sitting-gated 10% stays owner-synchronous
> (none is currently needed — everything below is content + frontend).

---

## The thesis

The VISION's ramp ends at *"actual past-bac questions, then fresh
variations, so nothing can be memorized"* — and the bac is passed on
exercise volume. The engine now records every attempt. What's missing is
**the corpus** (every findable national exercise per notion, attempt-first)
and **the surfaces that carry volume** (a per-notion training bank; a
dashboard that runs your practice like a tutor; figures deep and legible
enough to teach). Ranked by the owner's emphasis:

| Lane | What | Size |
|---|---|---|
| **B — the Bank** | Exhaustive past-bac exercise banks per notion (the headline) | The largest content campaign yet (~est. 300–500 exercises) |
| **G — the Tutor's face** | Dashboard v2: guided session arc, real progress surfaces, /moi | Frontend build from spec |
| **V — Visual depth + legibility** | V1 step-text legibility (immediate), V2 stage-depth fan-out | V1 days; V2 wave |

---

## Lane V1 — step-text legibility (SHIPS FIRST — days, quick win)

**Finding:** the staged/interactive figures' step captions render too small
and under-emphasized below the visual; the explanation IS the teaching and
must read as primary text, not as a caption.

1. Redesign the StagedFigure / InteractiveControl step-text slot:
   promote from caption-scale to body-scale type, raise contrast to
   primary-text tone, consider placement (beside/above on wide viewports,
   below on compact) — 2–3 rendered options for the owner's eye, then
   encode the winner in DESIGN-BIBLE + TOKENS (same-commit dom-truth
   updates; the harness asserts computed style, so the change must land in
   tokens, not ad-hoc).
2. Sweep the existing stage captions for prose that was written short
   *because* the slot was small — lengthen where the concept needs it
   (bounded: caption ≤75ch measure rule still applies).
3. Gate: build + dom-truth + shots; owner gestalt pass on 3 exemplar
   notions before fan-out of any prose edits.

## Lane V2 — stage depth ("as many steps as the concept needs")

**Finding:** figures compress too much into ~3–4 stages.

1. Encode the standard first (figure-authoring skill +
   INTERACTIVE-FIGURE-SPEC amendment): a stage = ONE idea; a stage that
   narrates two transformations is two stages; no ceiling — the VISION's
   "a hard concept gets as many segments as it needs" applies to figures.
2. Audit all ~100 staged figures (51 media dirs): flag under-staged ones
   (multi-idea stages, jumps a student can't follow). Read-only critic
   pass → ranked docket.
3. Re-stage in waves, worst-first, highest-traffic notions first
   (validator already enforces stages.json ↔ SVG step-group integrity).

## Lane G — Dashboard v2: from bar to tutor (frontend, from spec)

**Finding:** the stateful dashboard underwhelms — a progress bar where the
VISION promises *"the mastery map filling in, bac-readiness climbing"* and
a guided *"here's today's session."*

Spec-first (extends DASHBOARD-SPEC + LEARNER-MODEL-SPEC; committed before
code):

1. **The guided session arc** — the front door becomes a planned sequence,
   not a pointer: *reprise (if a misconception is active) → continue/new
   content → practice from the bank → quick review of what's fading* —
   each step a card with the WHY stated ("tu avais confondu X — on la
   retraite d'abord"). Free roam stays one click away, never gated.
2. **Mastery map v2** — per-subject expansion: the five honest states
   made scannable per unit; the "exercé" state now driven by real
   exercise_reveal + items data; per-notion detail popover (what you did,
   what's active, what's next).
3. **Practice-aware progress** — with Lane B live, per-notion "exercices
   faits: n/N" becomes real and motivating (honest counts, no fake %).
4. **Milestones + streak periphery** (DESIGN-BIBLE §8: reward real
   progress at the edges, never in the core): first notion exercé, first
   misconception cleared, a full bac exercise done unaided; streak =
   quiet, drop-proof (no guilt mechanics).
5. **/moi** — the account page (middleware already reserves it): profile,
   per-subject diagnostic detail, sign-out.
6. Dashboard state freshness: refetch on focus/navigation so a study
   session's effects appear without a manual reload.

Gate: spec → owner validates → build → dom-truth additions (arc anatomy,
honest-state guards extended) → owner uses it as a student.

## Lane B — the Bank: every findable bac exercise, per notion (THE HEADLINE)

**Finding:** 1–2 exercises per notion cannot produce mastery.

**Product decisions taken as defaults (override any):**
- **D1. Surface:** each notion gets an « S'entraîner » section — the bank —
  listing its past-bac exercises as attempt-first cards, each with a
  year/session badge (« Bac 2019 · normale ») — honest, motivating,
  standard in prep culture. The in-lesson summit (r-bac + r-variation)
  stays as the ramp's top; the bank is the volume behind it.
- **D2. Scope of "all":** national sessions **2008–2025, normale +
  rattrapage** (the existing banks' convention). Unfindable entries get
  the honest NON SOURCÉ discipline — never invented.
- **D3. Priorities:** PC + maths exhaustive first (coef 7–9,
  exercise-decided). Philo capped at 3–4 per notion (coef 2, 1-of-3
  choice format). SVT stays frozen per the standing owner decision.
- **D4. Verification:** the established protocol — transcription +
  independent challenger re-fetch/diff before `vérifié`; the `--strict`
  sourcing gate (year + session in every note) enforces at validate time.
- **D5. Progress integration:** exercise attempts already journal as
  `exercise_reveal` events — the bank shows per-exercise "fait" state
  live (needs the small read-layer extension; part of Lane G item 3).

**Phases:**
- **B0 — Bank surface spec + pilot** (before volume): the S'entraîner
  section spec (anatomy, card, provenance badge, attempt-first contract,
  barème display, "fait" state) + harness updates; pilot on ONE
  every-year notion (pc/rlc-serie or reactions-acido-basiques); owner
  editorial gate on the pilot.
- **B1 — Corpus census** (research agents, autonomous): enumerate all
  papers 2008–2025 per subject/filière; build the master index
  paper → exercise → notion mapping in `docs/sujets/` (extends the
  existing INDEX format). Honest census output: how many exercises truly
  exist per notion (every-year notions ≈ 15–25; rare notions ≈ 2–5).
- **B2 — Transcription + verification waves**: wave = one notion-cluster;
  transcribe → challenger-diff → vérifié. Highest-frequency notions
  first (PC: RC/RLC, ondes, nucléaire, acide-base; maths: analyse,
  complexes, probabilités).
- **B3 — Conversion waves**: verified sujets → bank entries
  (attempt-first, reasoning on 100% of questions, barème transcribed,
  KaTeX conventions, length/encoding rules — the RC-campaign recipe
  extended with a bank addendum). Validator + build + dom-truth every
  wave; ledger per wave; owner editorial gate per subject-lane close.
- **B4 — later, unlocked by the banks: exam-rehearsal mode** — full
  papers already exist as bank groupings; add the timed surface (edges
  only, calm core untouched) + self-scoring against the transcribed
  barème. Separate spec when B2/B3 are underway.

**Honest sizing:** PC ≈ 36 papers ≈ ~125 exercises; maths (SM + SExp)
≈ 72 papers ≈ ~280 exercises (big analysis problèmes excerpt/cross-list
per the existing discipline); philo capped ≈ ~40. Total ≈ 400+ conversions
— several weeks of autonomous waves at the RC-campaign cadence. Phased so
value lands continuously: every-year notions give most of the mastery
value in the first waves.

---

## Sequencing

1. **Now, in parallel:** V1 (legibility options → owner eye → encode) +
   B0 (bank spec + pilot) + G spec.
2. **Then:** G build (frontend) ∥ B1 census (research agents) — different
   lanes, no contention.
3. **Then:** B2/B3 waves (the long middle) ∥ V2 re-staging waves.
4. **Then:** B4 exam mode; SVT push and philo-Arabic remain deferred by
   standing owner decisions.

Every wave closes with the standing gates: `validate --strict`, build,
dom-truth, item-stats where relevant, ledger entry, push. Owner editorial
gates at: V1 options, B0 pilot, G spec + G build, each subject-lane close.

## Execution log

- _(per step: date, what, sha)_
