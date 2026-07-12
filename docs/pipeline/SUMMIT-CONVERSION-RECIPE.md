# Summit-conversion recipe

> Turns a lesson's legacy printed-solution summit into the attempt-first
> production layer: `exercises.yaml` (sourced bac summit + fresh variation)
> + `checkpoints.yaml` (commit-gate + rupture-gates) wired by markers.
> Derived from the **rc-charge PC pilot** (`content/pc/rc-charge`, commit
> `f3c5d62`) and the **probabilites-conditionnelles maths pilot**. Every
> fan-out dispatch references this file. The exemplar to copy is
> `content/pc/rlc-serie/{exercises,checkpoints}.yaml` + its `lesson.md`.

## Ordered steps (per lesson, one commit each)

1. **Read the four inputs first:** the RLC exemplar trio
   (`rlc-serie/{exercises,checkpoints}.yaml` + `lesson.md`) for schema shape;
   the VERIFIED sujet in `docs/sujets/<subj>/<notion>.md`; the target
   `lesson.md` + `items.yaml`; and `web/scripts/validate-content.mjs` — the
   validator IS the contract.
2. **Pick the sujet part.** Use only an entry marked `Statut: vérifié`. Take
   the part whose skills match the lesson's ramp. Read its figure description
   in prose so you can transcribe the graph in words (don't reference an
   orphaned SVG that encodes a *different* exercise's numbers).
3. **Write `exercises.yaml`** — two entries:
   - `r-bac`: faithful transcription of the verified sujet, multi-part
     `part:` headers, `reasoning` on **100%** of questions, `steps[]` only
     where computational, `sourcing: {status: sourced, note: "<year> session
     <normale|rattrapage> — <source>"}`.
   - `r-variation`: fresh anti-memorization twin (same skills, new
     numbers/context), `sourcing: {status: not-applicable}`.
   Move the lesson's existing "Raisonnement à voix haute" prose into
   `reasoning` — nothing invented, the prose moves from print-at-summit to
   reveal-after-attempt.
4. **Write `checkpoints.yaml`** — one `cp-r0-predict` commit-gate (turn the
   lesson's rhetorical "prends position" into a real MCQ placed between the
   prompt and the reveal; distractors = the lesson's named naive models) +
   one rupture-gate per key misconception, cloning the cleanest `items.yaml`
   stems. EVERY distractor carries a real `misconception:` id (no null tags).
5. **lesson.md surgery.** Delete the summit block (printed solution + "À
   toi"); insert `[[exercise:]]`/`[[checkpoint:]]` markers, each ALONE on its
   own line with blank lines around it.
6. **items.yaml ride-along.** Define the misconception inventory, tag each
   item, append a truthful `coverage_summary`. If the legacy end-bank
   predates per-distractor tagging, tag item-level `primary_misconception`
   and report `floor_met: false` honestly for under-covered models — **never
   fake counts**; flag the gap for a follow-up item pass.
7. **`node web/scripts/validate-content.mjs --strict content/<subj>/<notion>`
   → iterate to 0**, then model-id grep the diff, then commit.

## Schema gotchas (these hard-fail the validator)

- **Backslash-in-quoted-strings trap.** A *double-quoted* YAML scalar with a
  single-backslash TeX command (`"…\frac…"`) hard-fails. Write
  `intro`/`stem`/`reasoning`/checkpoint `stem`/`feedback` as **block scalars**
  (`|-` / `|`) — backslashes are literal there. Write `steps[].math` as
  **single-quoted**, raw KaTeX, **no `$` delimiters** (the renderer wraps in
  `$$`). Keep `steps[].note` backslash-free (unicode τ/Ω/µ or plain `$q$`).
- **Sourcing gate.** `status: sourced` requires the `note` to contain BOTH a
  year `(19|20)\d{2}` AND `normale|rattrapage`. `r-variation` must be
  `not-applicable`.
- **Converted-lesson contract.** Once `exercises.yaml` exists, `lesson.md`
  MUST have ≥1 own-line `[[exercise:]]` and MUST NOT contain
  `### Exercice travaillé`, `**Raisonnement à voix haute.**`, or a line-start
  `### À toi`. Rename new headings (e.g. `### Exercice de type bac` /
  `### Une variation pour ne pas mémoriser`).
- **exactly-one** `correct: true` per `type: mcq`; **reasoning on 100%** of
  exercise questions; markers resolve only when their id exists in the
  matching YAML.

## Judgment calls (the reference decisions)

- **Predict-gate:** `cp-r0-predict`, `item_source: original` (a commit item
  is not an end-bank clone); correct answer = the true progressive behaviour;
  distractors = the lesson's two named naive models + one plausible lure.
- **Rupture-gates:** clone the cleanest end-bank stems; curate distractors so
  each carries a real inventory tag (stricter than the RLC exemplar).
- **Reasoning sourcing:** lift expert prose from the lesson's own worked
  passages; move, don't invent.
- **Honest coverage:** surfacing a `floor_met: false` gap is itself a
  deliverable — do not pad.

## Subject addenda

- **PC** (rc-charge): flatten a sujet's Q3.1/3.2 sub-questions into separate
  flat q-ids; keep the examined framing (e.g. q(t)/`A(1-e^{-αt})`, no u_C
  substitution) for fidelity.
- **Maths** (probabilites-conditionnelles): _addendum pending the maths
  pilot's completion — notation (arbre pondéré, loi de X), sujet-part
  selection, and predict-gate shape for a probability problem will be folded
  in here._

## Unsourceable lessons

Ship `sourcing: {status: unsourced}` + an honest note, on the ledger's named
exception list (target ≤5, philo-only). The validator fails `required_for_done:
true` + unsourced under `--strict`, so set `required_for_done` accordingly.
