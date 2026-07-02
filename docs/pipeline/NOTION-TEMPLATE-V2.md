# Notion template v2 — measurable content criteria

> **Authority:** VISION.md's notion anatomy (L48–96) + the Day-1 audit's
> content diagnosis (`docs/audits/fable-ui-content-audit.md` §3, findings
> C1–C5). **Replaces adjectives with checkable boxes** (the C4 fix): the
> authors build to these, the critics CHECK these — a box is pass/fail with a
> line citation, never a vibe. Audience includes Sonnet 4.8 cold.
>
> Gold-standard executions to imitate: `docs/pipeline/EXEMPLARS.md`.

## How this template is used

- **pedagogy-architect** attaches this checklist, filled with rung numbers, to
  every spec (which misconception is ruptured where; which rungs teach a
  model). An UNCLAIMED row in the misconception ledger is a SPEC failure.
- **content-author / item-author** build until every box they own is checkable.
- **pedagogy-critic** verifies box by box, citing `lesson.md:<line>` for each.
  A finding without a citation is an opinion (bac-fidelity-critic's rule,
  generalized).
- **The human editorial gate** (RULES §2) remains the final judge of whether
  checked boxes add up to good teaching — boxes are the floor, not the bar.

## A. Per-rung boxes (every `## R<n>` section)

- [ ] **Predict-commit-confront** — REQUIRED where the rung teaches a mental
  model (hook, mechanism, any misconception rupture): the student is asked to
  predict, COMMITS through a real interaction (checkpoint MCQ) or an explicit
  written-attempt gate — never only rhetorically — and is then confronted.
  Rungs that are pure procedure practice may skip; the spec says which.
- [ ] **Mechanism-why present** — no bare procedure: every formula or rule the
  rung introduces carries its "pourquoi c'est vrai" (VISION L60-61: mechanism
  made obvious, not stated). Test: could a student ask "mais pourquoi ?" and
  find the answer in the rung?
- [ ] **Reasoning-annotation on 100% of worked steps** — every worked example
  and every summit question exposes the expert's DECISION ("what do I reach
  for and why / what would a wrong reflex be here"), not just clean algebra
  (VISION L65-68). One unannotated worked step = the box fails.
- [ ] **Voice** — tu/on tutor register; zero detached academic passive ("il
  est établi que…"); imperatives welcome; written to be spoken (VISION
  L236-238).
- [ ] **Display-math discipline (Day-6 amendment)** — any derivation of ≥2
  transformations is BLOCK math, ONE transformation per line; inline math is
  reserved for symbols and single expressions; chained `a = b = c = d`
  one-liners are a template failure. Derivations of ≥3 steps with a reasoning
  layer render through the `Derivation` component (`derivations.yaml` +
  `[[derivation:<id>]]`, or `steps:` on an exercise question) — learner-paced,
  one move per step, per-step "why this move" note.
- [ ] **Motion-decision rule (Day-6 amendment)** — the rung teaches a DYNAMIC
  relationship (something evolves in time) → it carries a motion figure
  through the beat engine, OR the spec records an explicit static-suffices
  justification. Silence is a failure; "the engine exists, the asset is debt"
  is recorded, not ignored.
- [ ] **French orthotypography** — flows through the frenchTypography pipeline
  (curly apostrophes, U+202F); no hardcoded ASCII apostrophes in new copy.

## B. The misconception ledger (whole notion — an unclaimed row is a failure)

For EVERY misconception in the spec's inventory, exactly one of:

| Misconception id | Ruptured in prose @ rung | OR delegated to items (explicit) |
|---|---|---|
| *(every id from spec §1 / items.yaml)* | `R<n>` + line | item ids + why prose rupture isn't needed |

- "Ruptured" means STAGED (the wrong model is voiced and broken on its own
  consequence), not merely "the correct fact is stated nearby." Exemplar:
  R1's « Arrête-toi — qui stocke quoi » (EXEMPLARS.md §2).
- Delegation is legitimate (some models are best confronted by doing) but must
  be WRITTEN in the spec — silence is an unclaimed row, and unclaimed = fail.

## C. The summit (R-max rungs: bac exercise + variation)

- [ ] **Attempt-first, never printed** — summit exercises render through the
  staged-reveal contract (`AttemptFirstExercise`: question → student commits →
  expert reasoning unlocks; `exercises.yaml`). Solutions printed inline in
  lesson prose at the summit = automatic fail (audit C1). dom-truth guards
  the rendered form.
- [ ] **Reasoning on every summit question** — same 100% annotation rule; the
  variation (R9-style) is NOT allowed to thin out (the pre-v2 R9 failed this).
- [ ] **BLOCKING — real-bac sourcing (audit C2):** the bac-type exercise is
  sourced from an identified real national sujet (year + session) or validated
  against one, recorded in `exercises.yaml` `sourcing.status: sourced`.
  **Summit unsourced = notion NOT DONE.** This box cannot be checked by an
  agent inventing a source; it requires the owner's sources. Do not fake it.
- [ ] **Anti-memorization variation** — same deep structure, different
  dressing, stated to the student ("tu dois reconnaître la procédure").

## D. The hook (R0)

- [ ] Opens on a concrete phenomenon/stake before any definition (VISION
  L51-55).
- [ ] Predict-commit-confront with a REAL commit (checkpoint) — see box A.
- [ ] **Stands without pending assets** (audit C5): no load-bearing reference
  to an asset that doesn't exist; missing-asset slots are marked as
  enhancement comments and render as silent no-ops.

## E. Assets

- [ ] Every `[[marker]]` in lesson.md resolves to an existing asset OR is an
  explicitly-commented enhancement slot.
- [ ] Structural diagrams coded (ADR 0017); math live KaTeX, never imaged.

## Critic protocol

pedagogy-critic's report = this checklist, one verdict + citation per box,
plus the ledger table filled. bac-fidelity-critic unchanged (cadre citations).
An all-boxes-green notion still goes to the human gate — the boxes make weak
notions detectable, not good notions automatic.
