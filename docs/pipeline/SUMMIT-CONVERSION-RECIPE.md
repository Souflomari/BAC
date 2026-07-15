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
- **Philo** (la-liberte, the philo pilot — first NOTION conversion; the
  méthode lesson `analyse-de-texte` was converted the same session and is
  the best available philo-specific reference, even though it is a
  different lesson TYPE):
  - **No `steps[]`, no math.** Philo exercises have no computational steps.
    `reasoning` carries the full philosophical argument in prose — thèse
    identification, argument analysis, position justification — never a
    stepped derivation. `intro`/`stem`/`reasoning` are still block scalars
    (the general schema-gotchas rule doesn't relax for philo).
  - **LENGTH REBALANCE IS MANDATORY, NOT OPTIONAL — read this before
    authoring or backfilling a single philo item.** The campaign's own audit
    found a ~97% "longest option = correct" tell in philo items historically.
    The la-liberte pilot re-ran that audit on its OWN pre-existing 15-item
    bank before touching it and found a **literal 100% match** (15/15 items
    had the correct choice as the longest option) — this is not a
    hypothetical risk, it is the default failure mode the moment a philo
    item gets written carelessly. Fix: **enrich distractors with more
    philosophical substance — an extra justifying clause, a named premise, a
    consequence spelled out — rather than trimming the correct answer's
    content** (this is the recipe's general "Honest coverage" judgment-call
    spirit — don't pad, don't strip — applied to length specifically).
    Actively vary: sometimes the correct answer should be the SHORTEST
    choice, sometimes a middle length, occasionally still the longest (that
    is fine in isolation — the failure mode is a MONOTONIC pattern across
    the whole bank, not any single item). Verify programmatically, not by
    eyeballing — hand-estimated lengths were wrong by 30-50 characters
    multiple times during this pilot; a five-line Python/yaml length check
    per file catches it in seconds and should be run before every
    validator pass on a philo bank.
  - **Sourcing bilingual Arabic/French bac texts.** The verified sujets bank
    (`docs/sujets/philo/<notion>.md`) transcribes texts as an original-Arabic
    blockquote followed by a French "traduction de travail" blockquote,
    wrapped in guillemets (« … ») when it is a single continuous quotation.
    Copy BOTH blocks verbatim into the exercise's `intro` — do not
    paraphrase or re-translate. Verify verbatim-ness programmatically (strip
    markdown blockquote markers, collapse whitespace, string-compare against
    the sujets-bank source) rather than eyeballing; a guillemet dropped or
    added at the edges is an easy, invisible miss. The sourcing `note` needs
    year + normale/rattrapage per the general sourcing gate; philo's sujets
    bank additionally gives an AlloSchool `element/NNNNNN` id and scan code
    (NS/RS 0X) — include both, matching the bank entry's own provenance line.
  - **r-variation: prefer a second real verified text over fabricating one,
    when the bank has one to spare.** The recipe's default (`r-variation` =
    fabricated twin, `sourcing: not-applicable`) risks manufacturing bad
    philosophy for a subject with no computational check on correctness —
    unlike a maths or PC twin, a philosophical "close paraphrase" can subtly
    misstate a thesis with nothing to catch it. The `analyse-de-texte`
    méthode pilot set the house precedent (reusing a third verified text
    rather than fabricating) under its own no-fabrication norm; la-liberte
    followed it: `docs/sujets/philo/la-liberte.md` had TWO verified entries
    (2024 R, a نص/Bakounine, "liberté et autrui" — used as r-bac; 2025 N, a
    قولة, "liberté et loi" — reused as r-variation with `status: sourced`
    rather than fabricated). Decision rule going forward: if the sujets bank
    has ≥2 verified entries for the notion, default to reusing the second one
    for r-variation (`status: sourced`); fall back to a fabricated,
    `not-applicable`-sourced twin only when just one verified text exists —
    and in that case, pick the sujet whose axis the lesson's own rungs
    already teach, so the exercise doesn't have to smuggle in new content the
    student was never taught. (Which of the two verified texts to route to
    r-bac vs. r-variation follows the same logic: the one that maps cleanly
    onto already-taught rungs is the safer r-variation; the richer or more
    novel one — even if it touches an axis the lesson body doesn't cover
    directly — is the more defensible r-bac, since its `reasoning` field can
    explicitly bridge back to already-taught material rather than silently
    assuming it.)
  - **Misconception inventory: mine the lesson's own "erreur à éviter" /
    "erreur classique à éviter" boxes first.** These call-out boxes are
    already-authored, rung-scoped statements of exactly the wrong model the
    rung anticipates — the single highest-yield source for a from-scratch
    inventory, ahead of inventing misconceptions top-down. Cross-check
    against any adjacent lesson's inventory for shared vocabulary (e.g.
    `analyse-de-texte`'s `problematique-est-reformulation` informed
    la-liberte's own `methode-dissertation-appliquee-mecaniquement`, since
    both lessons teach the dissertation/problématique method) but give each
    notion its OWN tagged copy under its own `mc.philo.<skill>.<name>`
    namespace — do not cross-reference another notion's ids from an
    items.yaml, since coverage_summary tallies are computed per-file. When
    a summit exercise's sourced text opens an axis the lesson body doesn't
    teach directly (la-liberte's Bakounine r-bac introduces "liberté et
    autrui", never named in R0-R4), that axis's misconception legitimately
    has ZERO end-bank coverage — report `floor_met: false` for it honestly,
    give it a dedicated checkpoint (checkpoints don't count toward the
    floor tally, but they give every student in-lesson exposure regardless),
    and flag it explicitly in `coverage_summary.notes` as the clearest
    follow-up item-authoring target rather than silently absorbing it into
    an unrelated tag to avoid an uncomfortable zero.

## Unsourceable lessons

Ship `sourcing: {status: unsourced}` + an honest note, on the ledger's named
exception list (target ≤5, philo-only). The validator fails `required_for_done:
true` + unsourced under `--strict`, so set `required_for_done` accordingly.
