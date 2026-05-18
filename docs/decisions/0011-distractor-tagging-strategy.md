# ADR 0011 — Step 3 distractor tagging strategy: author new, don't tag existing

**Status.** Accepted, 2026-05-18.
**Owner.** pedagogy-auditor (coverage audit + path recommendation),
bac-curriculum (cadre validation + marker convention + skill-attribution
ruling), learner-model (coverage-density floor + diagnostic-output
contract + FK semantic finding).
**Related.**
- [ADR 0007](0007-misconception-schema.md) — the misconception schema
  (the `items.distractor_misconceptions` column step 3 writes into).
- [ADR 0008](0008-misconception-authoring-conventions.md) — authoring
  conventions for the seed JSON.
- [ADR 0009](0009-misconception-schema-amendment.md) — structured
  `distinguishing_mcq_stem`; the `distractor_choice_label` field step 3
  reads programmatically.
- [ADR 0010](0010-misconception-encoder.md) — encoder + migration 045
  that loaded the four `sma_limit_calc` misconceptions. ADR 0010
  §"Pending" flagged step 3's stem-equivalence question; this ADR
  answers it.

---

## Context

Migration 045 loaded four misconceptions onto `sma_limit_calc`. Step 3
is the next move: wire the existing item bank so that wrong answers
update `user_misconception_states`, by tagging distractors on items
with the misconception ID each distractor surfaces.

The straightforward read of "step 3" is **Path A** — for each
misconception, find an existing MCQ on the same skill, identify which
distractor maps to that misconception, write
`items.distractor_misconceptions[<choice_label>] = <misconception_id>`.

ADR 0010 §"Pending" already flagged a coverage concern: pedagogy-auditor
warned exact-text-match against `items.question->>'stem'` was unlikely
to hit. Before writing the step 3 encoder, we audited the actual item
bank against the four misconceptions and surfaced two further problems
big enough to change the shape of step 3 entirely.

## The coverage audit

### The skill-attribution surprise

Items in this codebase are NOT on `sma_limit_calc` (SMA-prefixed,
UUID `33333333-aaaa-0000-0000-000000000002`). They are on the
**unprefixed** `limit_calc` (UUID `33333333-0000-0000-0000-000000000007`),
which is the SMB-numbered duplicate of the same content. Migration 009
(items_math) attaches every MCQ to the unprefixed UUIDs.

- `sma_limit_calc` MCQ items in prod: **0**.
- Unprefixed `limit_calc` MCQ items in prod: **8**.

This wasn't visible in prior ADRs because misconception authoring
(ADR 0008) and the encoder (ADR 0010) worked at the `skills.code`
layer and never had to confront which UUID actually carries items.

### The coverage matrix

pedagogy-auditor scored each of the 8 existing items × each of the 4
misconceptions:

```
         I1    I2    I3        I4    I5    I6        I7    I8
M1       ✗     ✗     partial   ✓A    ✗     partial   ✗     ✗
M2       ✗     ✗     ✗         ✗     ✗     ✗         ✗     ✗
M3       ✗     ✗     ✗         ✗     ✗     ✗         ✗     ✗
M4       ✗     ✗     ✗         ✗     ✗     ✗         ✗     ✗
```

| | ✓ clean | partial | ✗ no | Tag-able? |
|---|---|---|---|---|
| **M1** `forme-indeterminee-valeur-nulle` | 1 (I4) | 2 (I3, I6) | 5 | Yes — I4 only |
| **M2** `limite-egale-valeur-point` | 0 | 0 | 8 | **No — zero piecewise items** |
| **M3** `infini-moins-infini-nul` | 0 | 0 | 8 | **No — zero ∞−∞ items** |
| **M4** `limite-fondamentale-linearite` | 0 | 0 | 8 | **No — zero trig-limit items** |

The existing 8-item bank addresses 1 of 4 misconceptions and even that
single clean hit (I4: `lim_{x→3} (x²−9)/(x−3)`, distractor A=0 triggers
M1) lives on the wrong skill UUID. The item bank wasn't authored
against this misconception framework — the bank predates the framework
and selected for difficulty-distribution coverage of the calculation
skill, not for misconception-distinguishing distractors.

### The FK semantic mismatch — load-bearing

This is the finding learner-model surfaced that decides the whole step.

`user_misconception_states.skill_id` is a FK to `skills(id)`. The FK is
satisfied by **either** the unprefixed or the SMA-prefixed UUID — both
are valid `skills.id` rows. So the database accepts:

```
INSERT INTO user_misconception_states
  (user_id, skill_id, misconception_id)
VALUES
  ('<student>',
   '33333333-0000-0000-0000-000000000007',   -- unprefixed limit_calc
   'mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle');
```

The FK passes. But the cross-table semantics break:

- The state row lives under the unprefixed skill UUID.
- The misconception definition (the row in `skills.common_misconceptions`)
  lives under the SMA-prefixed skill UUID.
- The scheduler's natural query — "what unresolved misconceptions does
  this student have on `sma_limit_calc`?" — joins on `skill_id =
  <sma_limit_calc_UUID>` and returns **zero rows**.
- The diagnostic state would be silently invisible to the scheduler
  that's supposed to act on it.

The partial index `idx_user_misconception_states_active (user_id,
skill_id) WHERE resolved_at IS NULL` (migration 043) makes this faster
but doesn't fix it — the query that uses the index simply returns
empty.

**This is the strongest single argument against Path A.**

## Decision

### Path B — author new items on `sma_limit_calc` directly

All three agents converged. pedagogy-auditor on coverage grounds
(75% of misconceptions have zero existing-item coverage),
bac-curriculum on skill-attribution grounds (SM-A vs SM-B cadres
are separate; parallel item banks are correct), learner-model on FK
semantic grounds (Path A would write state rows that the scheduler
never finds).

Path A is **not viable**. Path C (hybrid — migrate I4 to
`sma_limit_calc` for M1, author for M2/M3/M4) saves one authored item
at the cost of cross-skill content surgery on I4 — not worth the
maintenance liability and breaks SMB students' access to I4. Rejected.

### What ships (v1)

- **4 new MCQ items** on `sma_limit_calc`, one per misconception. Stems
  taken verbatim from each misconception's `distinguishing_mcq_stem.stem_text`
  (ADR 0009 designed those stems to be diagnostically isolated; they're
  already authoring-ready).
- **Light authoring pass** on each item to complete the 4-distractor
  set. Two distractor slots per item are already named (the
  misconception's trigger choice + the correct choice); the other two
  need plausible-procedural-error distractors that DO NOT activate any
  of the other three misconceptions in this skill's set. The encoder
  for items doesn't exist yet — the items can be hand-authored into a
  numbered migration (`046_items_sma_limit_calc.sql` is the next
  available number) or shipped via a follow-up encoder, whichever
  pedagogy-auditor + supabase-architect prefer when step 3's
  implementation PR lands.

The full Path-B v1 item layout per misconception:

| Mc | Stem | Distractor (label) | Correct (label) | Other two slots need authoring |
|---|---|---|---|---|
| M1 | `lim(x→2) (x²−4)/(x−2)` | B = 0 | A = 4 | C = "n'existe pas", D = 1 |
| M2 | piecewise f(1)=7, f(x)=x+3 elsewhere; lim(x→1) | B = 7 | A = 4 | C = 1, D = "n'existe pas" |
| M3 | `lim(x→+∞) (x²−x)` | B = 0 | A = +∞ | C = −∞, D = 1 |
| M4 | `lim(x→0) sin(x²)/x` | C = 2 | A = 0 | B = 1, D = "n'existe pas" |

(The other-two-slot values were already enumerated in the
`distinguishing_mcq_stem.stem_text` text in the seed file — this table
just re-surfaces them.)

Each item carries `distractor_misconceptions = {<distractor_label>:
<misconception_id>}` from birth — no separate tagging step needed.
Items are also tagged with `tags = ['misconception_driven',
'sma_limit_calc']`, plus M2 gets `'continuity-adjacent'`
(see "Marker convention" below).

### Coverage density floor (learner-model's ruling)

**v1 ships BELOW floor.** learner-model's diagnostic-usefulness
analysis sets:

- **Exhibition floor: 3 items per misconception, ≥2 events** to fire
  remediation. At 1 item per misconception, `exhibited_count` is a
  binary flag (0 or 1 before the item pool is exhausted) — useful as
  a coarse signal, not as a confidence-bearing diagnosis.
- **Resolution floor: 3 consecutive correct answers** on tagged items
  with no lapse since last exhibition. Cannot be reached at 1 item
  per misconception.
- **Diminishing returns ceiling: 6 items per misconception.**

So v1 (4 items, 1 per misconception) is a **first-deployment baseline**
that proves the wiring, not a diagnostic instrument. v2 must add 2 more
items per misconception to reach floor (12 items total, 3 per
misconception).

**Captured as ADR 0011's pending follow-up #1.** No reason to delay
step 3 wiring for v2 — the wiring needs to exist before the diagnosis
can collect data of any density.

### Diagnostic-output contract (learner-model's demand)

When the scheduler/teacher surfaces "active misconceptions" for a
student on a skill, the output MUST distinguish three states:

1. **Active** — misconception exhibited above the threshold; remediation
   should fire.
2. **Cleared** — misconception was exhibited and is now resolved per
   the resolution floor.
3. **Unassessed** — misconception is authored on the skill but no
   tagged item has been seen by the student (or coverage < floor, or
   coverage = 0). The student's behaviour cannot be interpreted with
   respect to this misconception.

The third state is the load-bearing one. v1 ships at 1-item coverage
for every misconception; until a student has seen the tagged item,
EVERY misconception on this skill is "unassessed", not "no
misconception detected". Treating absence-of-signal as
absence-of-misconception is the false-completeness failure mode
learner-model called out.

This is a contract on the API/UI shape, not on the DB schema. The
state table already supports it (`first_exhibited_at IS NULL` →
unassessed). Documenting here so the next reader knows the diagnostic
layer is required to enforce this distinction.

### Marker convention for misconception-driven items
(bac-curriculum's ruling)

Add `'misconception_driven'` to `items.tags[]` on every item authored
under this strategy. String literal, not a new boolean column — tags
scale to future authoring intents (e.g. `'document_experimental'`
when PC's TP-reasoning items ship).

The diagnostic layer **filters on this tag** when computing
distinguishing-evidence statistics. The SRS / difficulty-calibration
layers **ignore it** until misconception-driven items are
explicitly graduated to the general pool. Mixing the two authoring
eras (the 8 pre-misconception items vs the 4 misconception-driven
items) without this tag would bias IRT estimates by treating items
selected for distinguishing power identically to items selected for
difficulty distribution.

Additional per-item tags noted by bac-curriculum:

- **M2's item** also gets `'continuity-adjacent'`. The piecewise
  scenario sits on a continuité concept under the SM-A cadre even
  though it's authored on `sma_limit_calc`. The tag makes the
  cross-concept routing legible to future scheduling logic.
- **M4's item** is the highest-difficulty item in the set
  (two-step rewrite); flag in `difficulty_level` (recommended: 4)
  so the SRS doesn't surface it before the student has had a fair
  shot at the easier M1/M3 stems first.

### Skill-attribution decision: option (a) — two parallel item banks
(bac-curriculum's ruling)

The unprefixed `limit_calc` (UUID `…0007`) keeps its 8 items, used by
SMB students. `sma_limit_calc` (UUID `…aaaa-…0002`) gets its own
new 4-item bank, used by SMA students. The two cadres are separate;
the two skills are separate; the two item banks are separate.

Rejected:
- **(b) Duplicate items across both skills** — couples two
  separate skill states through shared item content; contaminates
  per-user diagnostic evidence (the same answer counts twice across
  different skill states).
- **(c) Join table or array-column association** — schema complexity
  unjustified at two skills with non-equivalent cadres.

Long-term implication: SMA's misconception coverage advances independently
of SMB's. When SMB authoring begins (post-MVP), SMB students get their
own misconception bank on the unprefixed skill — same encoder, same
authoring convention, same `mc.math.<skill_code>.<short-label>` ID
prefix where `<skill_code>` is the unprefixed code.

### Stem-equivalence strategy

**Moot under Path B.** The seed file's `distinguishing_mcq_stem.stem_text`
is taken verbatim as the new item's stem; no matching against existing
items is required. The stem-equivalence question only had to be
answered if Path A or C were chosen.

For the future case (when SMB's misconception bank is authored, or
when items are deduplicated across skills as a one-off cleanup), the
recommended matching strategy is **structural** (same mathematical
expression, same limit point, same function form), not exact text —
because notation varies across seed authors and humans rewriting Bac-
style stems naturally introduce harmless variation. Human-in-the-loop
confirmation is required before any merge that would change the item
SMB students see.

## Side-finds (separate from the main decision)

1. **I3 and I6 are duplicate stems on the unprefixed `limit_calc`.**
   Both: `lim(x→0) (√(1+x) − 1)/x = ?` with same choice family. Flagged
   for separate cleanup by bac-curriculum. Not blocking step 3
   (neither item lives on the SMA skill anyway).

2. **The unprefixed `limit_calc` bank itself is unaffected by this
   ADR.** It continues to serve SMB students. No item migration, no
   re-attribution. The two banks evolve in parallel.

3. **No misconception authoring on the unprefixed `limit_calc`
   yet.** The eight items there have no `distractor_misconceptions`
   tags. SMB students currently get no misconception diagnosis on
   limits. Captured as ADR 0011's pending follow-up #2.

## Consequences

- **Step 3 implementation simplifies.** No stem-equivalence matcher
  is needed; no migration to move items across skills; no risk of
  silently-broken FK joins. The step-3 PR ships four new MCQ items on
  `sma_limit_calc`, each with `distractor_misconceptions` pre-tagged
  at item creation.

- **v1 diagnostic coverage is 1 item per misconception — below
  floor.** Acknowledged. v2 must reach 3 items per misconception
  before the diagnostic layer's `exhibited_count` becomes
  confidence-bearing.

- **The diagnostic-output contract is non-negotiable.** "Unassessed"
  must not be conflated with "no misconception detected" anywhere in
  the UI or scheduler logic. v1 ships at 1-item-per-misconception, so
  almost every state will be "unassessed" until students hit the
  tagged items; without the contract, the system reports false
  cleanliness.

- **`subject_point` (ADR 0010 §"Pending") and the
  `sma_limit_ops`/`sma_asymptotes` authoring (ADR 0009 cut candidates)
  remain on hold** per the user's instruction. Both are downstream of
  knowing the step-3 shape; that's now decided. Unblocked.

## Pending follow-ups

- [ ] **v2 coverage: add 2 more items per misconception** to reach
      learner-model's 3-items-per-misconception exhibition floor. Total:
      8 additional items on `sma_limit_calc`, derived from the same four
      misconception models but using stem variants (different functions,
      different limit points, same wrong-answer family). Authoring task
      for pedagogy-auditor + bac-curriculum after step 3 v1 ships.

- [ ] **SMB misconception authoring on the unprefixed `limit_calc`**.
      Post-MVP. Same encoder, same convention, IDs of the form
      `mc.math.limit_calc.<short-label>` (no `sma_` prefix). Decoupled
      from this ADR.

- [ ] **`subject_point` sub-field proposal** (ADR 0010 §"Pending"
      item 3). Routed to bac-curriculum per the agent-handoff protocol;
      now unblocked since step-3 shape is decided. Treat as an
      independent schema-amendment workstream.

- [ ] **`sma_limit_ops` and `sma_asymptotes` misconception authoring**
      (ADR 0009 cut candidates). Now unblocked. Same authoring path:
      one JSON file per skill, encoder → migration → branch-test → push.

- [ ] **Diagnostic output contract implementation.** The
      Active / Cleared / Unassessed distinction is a UI/API
      contract. learner-model owns the formal spec when the
      diagnostic surface is built. ADR 0011 documents the requirement;
      a future ADR specifies the shape.

- [ ] **Duplicate-stems cleanup on the unprefixed `limit_calc`** —
      I3 and I6 are duplicate `(√(1+x) − 1)/x` items. Hand-off to
      bac-curriculum for a content-quality patch independent of step 3.

- [ ] **Item-authoring encoder.** Step 3's four items can be authored
      hand into a numbered migration, or via a new
      `json_encode_items.dart` patterned after
      `json_encode_misconceptions.dart`. Decision deferred to the step-3
      implementation PR; the volume (4 items v1, 12 items v2) is small
      enough that hand-authoring is reasonable without losing
      reproducibility (the seed JSON for misconceptions captures the
      stems already).
