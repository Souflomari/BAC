# BANK-SPEC — the per-notion « S'entraîner » exercise bank (v1)

> **What.** The product contract for Lane B of
> `docs/pipeline/mastery-push-plan.md`: every notion carries a bank of
> real past-bac exercises — the volume layer behind the lesson's summit.
> Spec-first per RULES; the B0 pilot implements exactly this; waves B2/B3
> fill it. Authority: VISION (ramp to real bac + anti-memorization),
> DESIGN-BIBLE (calm core), the validator contract, this file.

## 1. Placement — a trailing « S'entraîner » chapter

The bank renders as ONE additional trailing chapter in the notion's
existing ChapterShell pagination (the `hasTrailingChapter` slot NotionBody
already carries, currently unused). Rationale: it inherits chapter nav,
deep-linking (`?chapitre=N`), the margin rail, and the visit-event
recording (`ChapterVisitRecorder` — a bank visit IS a study signal) with
zero new navigation machinery. The in-lesson summit (r-bac + r-variation)
stays where it is — the ramp's top; the bank is behind it, never replaces
it.

- Rail label: « S'entraîner » with the honest count: « 4 sujets ».
- A notion with an empty bank renders the chapter with the honest empty
  state: « La banque d'exercices de cette notion arrive — N sujets du bac
  recensés, en cours de vérification. » (N from the census when known;
  omit the sentence's second half before the census exists.)

## 2. Data — `bank.yaml` sidecar (new, per notion)

A fourth sidecar: `content/<subject>/<slug>/bank.yaml`. NOT merged into
`exercises.yaml` — that file is the lesson-embedded ramp (its entries must
have in-lesson `[[exercise:]]` markers; bank entries must not).

```yaml
notion: pc/reactions-acido-basiques
entries:
  - id: bk-2019-n-x2          # bk-<year>-<n|r>-x<paper position>
    title: "Titrage d'un vinaigre"     # short descriptive, French
    source:                    # STUDENT-VISIBLE provenance (decision D1)
      year: 2019
      session: normale         # normale | rattrapage
      filiere: "SPC"           # exam paper's stream (maths: SM | SExp)
      exercise_label: "Exercice 2 — Chimie"  # position on the real paper
    bareme_total: 7            # points on the /20 paper, from the scan
    duration_min: 35           # ≈ 6 min per barème point — see below
    sourcing:                  # authoring-side gate — SAME contract as
      status: sourced          # exercises.yaml; --strict enforces year +
      note: "…2019 normale…"   # session in the note; vérifié in the
                               # docs/sujets bank BEFORE conversion
    intro: |-                  # optional context (données, constants)
    questions:                 # EXACTLY the exercises.yaml question
      - id: q1                 # schema: stem, reasoning (100%, non-empty),
        part: "Partie 1 — …"   # steps[] where computational — the
        stem: |-               # validator reuses the same checks
        reasoning: |-
```

Rules carried over unchanged: KaTeX conventions (block scalars for prose,
single-quoted raw KaTeX in `steps[].math`), reasoning on 100% of
questions, `--strict` sourcing gate, the ≤5-named-exceptions discipline
(a bank never carries invented "bac" exercises — unfindable = absent +
census note, never fabricated).

**`duration_min` — the house ratio is ≈ 6 minutes per barème point**
(written down 2026-08-27 after it drifted). This is a *training* estimate,
not exam pace: the real papers run at 9 min/pt (PC, 3 h for /20) and
12 min/pt (SM, 4 h for /20), and using those inflates every card. Measured
across the whole corpus the ratio sits between 4.9 and 7.1 with a median of
exactly 6.00 in all three filières — the number above simply records what
167 entries already do, and what the worked example in this section has
always shown (35 min for 7 points). Round to the nearest whole minute.

The reason consistency matters more here than precision: `duration_min` is
displayed to a student deciding what to attempt tonight. A card that reads
"43 min" next to an identical one reading "29 min" teaches nothing about the
exercise and everything about who authored it. Eleven entries were
renormalised on 2026-08-27 for exactly this reason.

## 3. The card — anatomy and behavior

Each entry renders as a calm card in the trailing chapter, stacked:

1. **Header row:** title + the provenance badge « Bac 2019 · Normale »
   (+ « SM »/« SExp » for maths) + « /7 pts » + « ~35 min ». The badge is
   student-visible by design (owner default D1) — real provenance
   motivates and matches prep culture.
2. **Collapsed by default** — the card shows header + intro only. One
   card open at a time is NOT enforced (students compare), but cards
   start closed: the chapter must scan as a list, not a wall.
3. **Expanded:** intro (données) + questions, each with the EXACT
   attempt-first contract (`AttemptFirstExercise` reuse): stem visible,
   reasoning NEVER in the DOM before the per-question « J'ai fait ma
   tentative » commit. dom-truth's attempt-first guard extends to bank
   cards verbatim.
4. **« Fait » state (live mode only):** a quiet check + « fait » on cards
   where the journal holds an `exercise_reveal` for this entry
   (`item_id = "<entry_id>:<question_id>"` — the emitter's existing
   composite convention; recorder call sites already exist in
   AttemptFirstExercise). Off/logged-out: NO fait marks, no placeholder —
   honest-state. No scores, no timers, no completion % — calm core.
5. **Barème display:** per-question point tags render in the stem exactly
   as transcribed (« (0,75 pt) ») — no self-scoring UI in v1 (that is
   phase B4, exam mode).

## 4. Recording

Bank attempts ride the EXISTING pipeline unchanged: reveal commits emit
`kind: "exercise_reveal"` with the composite id; chapter visits emit from
the trailing chapter like any other. No schema change, no new event kinds.
The learner-model's « exercé » state picks bank reveals up automatically
(it keys on kind, not id shape).

**`entry_id` is unique WITHIN ITS FILE ONLY — never read it alone.** The id
encodes the exercise's position on the real paper (`bk-2018-n-x1` = exercise
1 of the 2018 normale session), so two filières share it the same year, and —
by the répartition rule of §2 — an exercise split across several notions
keeps the SAME id in each. Measured 2026-08-27: 42 ids are carried by more
than one entry; `bk-2018-n-x1` lives in four banks, `bk-2023-n-x1` in six.

Every journal row carries `notion_id` beside `item_id`, and any read that
resolves back to an exercise MUST use both — `revealKey(notionId, itemId)`
in `lib/student-state.ts` is the canonical key. Reading `item_id` alone
lights up exercises the student never opened: that is a fabricated tick, and
§3.4's honest-state rule forbids it. This bit the « fait » state exactly
once, on 2026-08-27; see `docs/grounding/known-issues.md` **K-7**.

Do not "fix" this by making ids globally unique. They encode a position on a
real paper, which is what lets `lib/examens.ts` group an exam; prefixing them
would sever that link and buy nothing the composite key does not already
give.

## 5. Validator + harness extensions (same commit as the renderer)

- `validate-content.mjs`: parse `bank.yaml` when present — schema check,
  exactly-one-correct n/a (no `choices[]` field in v1 — see below), reasoning
  non-empty on every
  question, KaTeX-in-YAML on stems/reasoning/steps, sourcing gate with
  `--strict` promotion, `source.year/session` present and consistent with
  the sourcing note, unique entry ids, `bk-` id convention.
- `dom-truth.mjs`: (a) trailing-chapter anatomy on the pilot notion (rail
  count == on-disk entry count); (b) attempt-first guard on an expanded
  bank card (no reasoning pre-commit); (c) off-mode: zero « fait » marks
  AND zero emitter traffic from bank interactions (extends the existing
  network-silence sweep); (d) provenance badge text matches bank.yaml.
- `build-learner-inputs.mjs`: no change (bank has no tagged MCQs in v1).

**« No MCQs in v1 » bans the FIELD, not the exercise type — clarified
2026-08-28.** The wording above was read by a transcription pass as "a bac
exercise containing a QCM cannot be banked", which would have capped SPC 2015
at 17,00/20 and kept it invisible. That reading is wrong, and the corpus
already shows the right one.

A QCM exercise **is** convertible, and four entries already do it
(`bk-2020-n-x2` in `ondes-mecaniques-periodiques`, two in
`decroissance-radioactive`, one in `chute-mouvements-plans`). The pattern:

- the four printed options go **inside the `stem`, as a Markdown table** —
  the student sees them exactly as the real paper prints them;
- there is **no `choices[]` field**, so the validator's ban holds and no
  self-scoring UI is implied;
- the `reasoning` names the correct option **and says why the others fail** —
  which is strictly more demanding than picking a letter, and is what the
  attempt-first contract asks for anyway.

What v1 genuinely excludes is the *machine-scored MCQ apparatus* (`choices[]`,
exactly-one-correct validation, misconception tagging) — that lives in
`items.yaml` and `checkpoints.yaml`, not here.

## 6. Pilot (B0 gate)

One notion, chosen for existing verified multi-entry coverage in
`docs/sujets/pc/` (default `reactions-acido-basiques`; the pilot executor
verifies which PC notion has the MOST verified entries and may pick it
instead, stating why). Convert 3–4 verified entries → `bank.yaml`, build
the renderer + validator + dom-truth rows, ship behind the standing gates,
owner reviews the deployed pilot AS A STUDENT. Fan-out (B2/B3) only after
that editorial gate.

## 7. Explicitly out of v1

Timed mode, self-scoring against the barème, full-paper assembly (B4);
difficulty sorting (needs corpus first); cross-notion practice feeds
(Lane G consumes the bank later); any SVT bank (frozen).
