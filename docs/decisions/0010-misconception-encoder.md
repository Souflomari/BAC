# ADR 0010 — Misconception encoder + migration 045 (first content-shape migration)

**Status.** Accepted, 2026-05-16.
**Owner.** supabase-architect (migration shape + verify block),
bac-curriculum (canonical 5-field projection validation),
pedagogy-auditor (downstream-consumer field preservation per the
2026-05-16 agent-handoff amendment).
**Related.**
- [ADR 0007](0007-misconception-schema.md) — base schema (migration
  043) that this encoder writes into.
- [ADR 0008](0008-misconception-authoring-conventions.md) — authoring
  convention (one JSON file per skill; `label_ar` null sentinel).
- [ADR 0009](0009-misconception-schema-amendment.md) — schema
  amendment (`distinguishing_mcq_stem` structured object;
  schema_version 2; canonical 5-field shape).
- `backend/seed/json_encode_misconceptions.dart` — the encoder this
  ADR documents.
- `backend/supabase/migrations/045_misconceptions_sma_limit_calc.sql`
  — first output, applied to prod 2026-05-16.

---

## Context

Stage 4 (ADR 0007) shipped the schema. Step 2 (ADR 0008) authored
the first seed file. Step 2.5 (ADR 0009) amended the contract and
restructured `distinguishing_mcq_stem` into a typed object. Step 2.6
fixed the branch-test workflow's double-logging bug.

This step ships the **encoder** — the tool that turns a
schema_version-2 seed JSON file into a versioned UPDATE migration.
Migration 045 is the first run: it loads the four `sma_limit_calc`
misconceptions onto the live `skills.common_misconceptions` JSONB
column.

## Decision

### A — Language: **Dart**

The encoder is `backend/seed/json_encode_misconceptions.dart`.

Match the established `backend/seed/json_encode_*.dart` convention
(15+ existing encoders for SMA seeds, exam papers, lessons, items,
etc.). Dart has native JSON support, decent string handling for
French text + dollar-quoted SQL, and no extra toolchain cost — the
dev machine already has Flutter SDK 3.11. No justification needed
for a different language.

### B — CLI shape

```
dart backend/seed/json_encode_misconceptions.dart \
  <input.json> <output_migration.sql>
```

Two positional arguments matching every prior encoder. The caller
chooses both paths — the encoder doesn't auto-number migrations
(consistent with how `json_encode_sma.dart` is invoked). Convention:
output filename is `0NN_misconceptions_<skill_code>.sql`. The
encoder derives the migration number from the output filename for
the verify-block error messages.

### C — Validation gates (encoder-side, fail-fast)

The encoder rejects:

- `schema_version != 2` (ADR 0009 requires structured stem).
- Missing or empty `skill_code`, `subject_code`, or `misconceptions`
  array.
- Per misconception:
  - Missing or empty `id`, `label`, `description`,
    `contradicts_principle`.
  - `id` not matching prefix `mc.<subject_code>.<skill_code>.`
    (ADR 0008 §2 — literal `skills.code` + literal `subjects.code`).
  - `distinguishing_mcq_stem` not an object, or missing any of the
    five sub-keys: `stem_text`, `distractor_choice_label`,
    `distractor_rationale`, `correct_choice_label`,
    `correct_rationale`.
  - `distractor_choice_label` or `correct_choice_label` not in
    `{A, B, C, D}`.
  - `distractor_choice_label == correct_choice_label`.
- Duplicate IDs within the file.

Catching these at encode time (Dart) saves a round-trip to staging
+ DB error parse. The verify block in the emitted migration
re-asserts the structural invariants at apply time as a second gate.

### D — JSONB encoding: dollar-quoted literal

```sql
UPDATE public.skills
SET    common_misconceptions = $mcs$
[ … the JSON … ]
$mcs$::jsonb
WHERE  code = '<skill_code>';
```

Dollar quoting eliminates all quote-escaping concerns for FR text
containing apostrophes (`L'élève`), guillemets (`« »`), and
mathematical Unicode (`∞`, `→`, `√`, `²`). supabase-architect
confirmed Postgres 17 / Supabase handle non-ASCII inside
dollar-quoted JSONB literals correctly (UTF-8 transparent).

### E — Idempotency

**Definition adopted:** the migration is idempotent if re-running
produces the same end state and the verify block passes both times.
This is the same idempotency contract as every prior content
migration (032 PC, 036 SVT, 041 SMB recovery, 042 SMA prereqs).

**Subtlety surfaced by supabase-architect's review:** PostgreSQL
UPDATE always writes a new tuple version, even if the new value
equals the old. On a content table with a few hundred rows, this
is operationally irrelevant. A `WHERE common_misconceptions IS
DISTINCT FROM <new>::jsonb` guard would make re-runs a true no-op
write — captured as a future template improvement in §"Pending"
below.

### F — Encoder-side `label_ar: null` injection

Per ADR 0008 §6 reaffirmed by ADR 0009 §B.4. The seed JSON omits
`label_ar` (the FR-only authoring path stays clean); the encoder
injects an explicit `"label_ar": null` on every emitted entry.
bac-curriculum confirmed this is intact on all four entries in
migration 045.

When AR authoring eventually begins, the encoder is the single
choke point that needs updating — seed authors keep their workflow
unchanged.

### G — Verify-block template (ships in every future migration the
encoder emits)

Six numbered sub-assertions inside one `DO $verify$` block, wrapped
in `BEGIN; … COMMIT;`. Any failure rolls everything back.

| # | What it asserts | Why |
|---|---|---|
| 2a | Target skill row exists (`SELECT id FROM skills WHERE code = '<skill>'`) | Catches a renamed/missing skill before any structural check runs. |
| 2b | `jsonb_array_length(common_misconceptions) = <expected>` | Cardinality gate; required for 2c's bidirectional `@>` to function as set equality. |
| 2c | Set equality on IDs (both `v_actual_ids @> v_expected_ids` AND `v_expected_ids @> v_actual_ids`) | Catches missing or extra entries by content. |
| 2d | Every entry has the canonical six top-level keys | Catches encoder bugs that drop a field. |
| 2e | Every `distinguishing_mcq_stem` is an object with the five structured sub-keys (with `jsonb_typeof = 'object'` guard) | Catches step 3's load-bearing fields being lost or coerced back to a string. |
| 2f | Prereq baseline (SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201, cross=0) unchanged | Re-asserts ADR 0004's canonical numbers; this migration cannot silently drift them. |

The verify block's structure is identical across every migration
the encoder emits; only the constants (skill_code, expected IDs,
expected count) vary. This is the canonical template for every
future per-skill misconception migration.

**`LATERAL jsonb_array_elements`** is the chosen idiom for "for
each entry, check X" — supabase-architect confirmed this is the
right Postgres pattern (vs. CTE-with-unnest or jsonb_path_query).

**The `IF v_offender_id IS NOT NULL` failure-mode** is safe
specifically because 2c (set equality on IDs) runs before 2d/2e:
any malformed entry with a null `id` would already fail 2c, so
2d/2e cannot be silently bypassed by a null-id row.

### H — Forward request from pedagogy-auditor (deferred)

pedagogy-auditor's review (independent of the SHIP verdict) raised
one forward schema request: add a `subject_point` sub-field to
`distinguishing_mcq_stem` (e.g.
`"subject_point": "forme_indeterminee_0_sur_0"`) — a machine-readable
concept tag separate from the misconception ID name. Without it,
the diagnostic layer's only machine-readable concept handle is the
ID itself (which is a name, not a concept). Cost of adding now: one
field × four entries × one file. Cost of adding after N skills:
N migrations to retrofit.

**Disposition:** captured as ADR 0010 §"Pending" item. Not added to
migration 045 because:
- It's a schema amendment (changes the structured stem shape from
  five sub-fields to six). Belongs in a follow-up ADR (0011?), not
  blocking this encoder ship.
- Routing through `bac-curriculum` first is required (ADR 0009
  established the protocol — content-shape changes go through
  curriculum) before pedagogy-auditor commits the field.

If accepted, the encoder emits the new sub-field with the rest;
existing migrations remain unchanged (the JSONB column accepts the
old shape; the encoder validation gates upgrade as new files appear).

## What landed (migration 045)

`backend/supabase/migrations/045_misconceptions_sma_limit_calc.sql`.

Body: single `UPDATE skills SET common_misconceptions = $mcs$ […]
$mcs$::jsonb WHERE code = 'sma_limit_calc'`. The dollar-quoted
JSONB literal contains four misconception objects, each carrying
the canonical six top-level keys + structured stem with five
sub-keys.

Verify block ran on apply and produced:

```
NOTICE: Migration 045 verification OK:
  skill=`sma_limit_calc`
  misconceptions=4
  expected_ids_match=true
  six_keys_present=true
  structured_stem_shape=true
  prereq_baseline=unchanged
  (total=201 SMA=98 SMB=31 PC=21 SVT=9 humanities=42 cross=0)
```

Prod state confirmed via REST against the `anon` key (RLS allows
SELECT on `skills`):

| Misconception ID | Top keys | Stem keys | Distractor | Correct |
|---|---|---|---|---|
| `…forme-indeterminee-valeur-nulle` | 6 ✓ | 5 ✓ | B | A |
| `…limite-egale-valeur-point` | 6 ✓ | 5 ✓ | B | A |
| `…infini-moins-infini-nul` | 6 ✓ | 5 ✓ | B | A |
| `…limite-fondamentale-linearite` | 6 ✓ | 5 ✓ | C | A |

`label_ar` is `null` (literal JSON null, not string `"null"`) on
every entry.

## Branch-test result — first content-shape migration through v2.1

`scripts/branch-test.ps1` v2.1 fired against migration 045. All 11
checks green; exit 0; ~10 seconds.

```
Log: .audit-logs/branch-test-20260516-013216.log
Migration applied ONCE in the log (single `Applying migration 045`
line — the v2.1 double-logging fix from the previous step held).
NOTICE captured: Migration 045 verification OK (4 misconceptions,
six_keys_present=true, structured_stem_shape=true).
```

ADR 0005 §"Operational rules" rule #1 honoured: branch-test ran
before prod push; exit 0 was the gate; prod push proceeded; verify
NOTICE on prod matched staging's exactly.

## Multi-agent coordination — pattern that's now repeatable

This step is the first to fully exercise the
agent-handoff protocol added to `.claude/agents/*.md` after ADR
0009. Three agents reviewed concrete output in parallel:

- **supabase-architect** reviewed the verify block SQL for
  correctness. Verdict: SHIP. Flagged one optional improvement
  (`IS DISTINCT FROM` guard for true no-op rewrites).
- **bac-curriculum** validated the canonical 5-field projection +
  ID format + French text integrity + cadre alignment of every
  `contradicts_principle`. Verdict: SHIP.
- **pedagogy-auditor** validated `distinguishing_mcq_stem`
  preservation for step 3 — confirmed structural shape, A-D
  label values, M4 rationale revision. Verdict: SHIP, with one
  forward schema request (`subject_point`) that was correctly
  routed to `bac-curriculum` first per the new protocol rather
  than landed unilaterally.

Each agent stayed in their lane (the protocol's intent). The split
worked: supabase-architect did not opine on content; bac-curriculum
did not opine on machine-read shape; pedagogy-auditor did not
opine on SQL. Three concurrent reviews, ~2 minutes wall time, no
revisions needed.

## Consequences

- **The encoder is now the canonical path for every future
  per-skill misconception migration.** Author the seed file → run
  the encoder → branch-test → push. No hand-written SQL for
  content migrations going forward.

- **Step 3 (distractor tagging) is fully unblocked.** The
  structured `distinguishing_mcq_stem` field is preserved in prod
  in machine-readable form; the next encoder reads
  `distractor_choice_label` to write
  `items.distractor_misconceptions[label] = misconception_id`.

- **The verify-block template is now the canonical post-condition
  shape for content migrations** (analogous to how 040-044 were
  for schema migrations). New content migrations emit a structurally
  identical block with different constants.

- **First exercise of the v2.1 branch-test workflow against a
  content-shape (not schema) migration.** The script's existing
  checks remained sufficient — none had to be revised for the
  content-data shape. The misconception-table sanity checks
  added in v2 (`common_misconceptions default round-trips as []`)
  still pass: they query the FIRST skill row by id-asc, which
  isn't `sma_limit_calc` (its id is `33333333-aaaa-0000-0000-...`,
  not the smallest id in the table). The check held — but if
  step 3 or a future authoring step targets the alphabetically-first
  skill, the check would need to switch to a "default on any
  untagged row" assertion. Captured in §"Pending".

## Pending follow-ups

- [ ] **Author misconceptions for `sma_limit_ops` and
      `sma_asymptotes`** — the two cut candidates from ADR 0009
      §"Decision A". Each ships as a new seed JSON file under
      `backend/seed/misconceptions/`, then through the encoder.

- [ ] **Step 3 — distractor tagging on existing `sma_limit_calc`
      MCQ items.** The four `distinguishing_mcq_stem.stem_text`
      values from the migration are the input; map them to existing
      `items.question->>'stem'` rows, then write
      `items.distractor_misconceptions[<distractor_choice_label>] =
      <misconception_id>`.

      pedagogy-auditor's review flagged: exact stem-text match
      against `items.question` is unlikely to hit; the step 3
      tagger needs a stem-equivalence strategy (same function,
      same point, same choice set) or to create new items. Plan
      the strategy before writing the step-3 encoder.

- [ ] **`subject_point` sub-field on `distinguishing_mcq_stem`**
      (pedagogy-auditor's forward request from this review).
      Route to bac-curriculum first per the agent-handoff
      protocol; if accepted, ships as ADR 0011 + a schema-amendment
      migration analogous to 044's COMMENT ON COLUMN.

- [ ] **`IS DISTINCT FROM` guard on the encoder's UPDATE**
      (supabase-architect's forward suggestion). Makes re-runs
      against unchanged state a true no-op write (no tuple
      version increment). Cost: one line in the encoder template.
      Land with the next encoder revision; not urgent.

- [ ] **Branch-test default-round-trip checks → "first untagged
      row"** instead of "first row by id-asc". Currently the check
      relies on the first row by id-asc being untagged; once enough
      skills carry misconceptions, the assertion's first-row could
      land on a tagged skill and the check would need rephrasing
      to "any untagged row has default []". Track as a script v2.2
      candidate.

- [ ] **Encoder convention extension to evidence-and-rationale
      preservation** in the seed file alongside the encoder-emitted
      migration. The seed-file `evidence` array stays out of the
      DB by design (audit trail, not runtime artifact), but the
      audit trail must remain easy to walk from any migration back
      to its sources. The encoder header comment already names the
      source seed file — that's sufficient for now, but worth
      checking once 5-10 skills have shipped that the trail is
      still navigable.
