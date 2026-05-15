# ADR 0009 — Misconception schema amendment + cut-candidate audit

**Status.** Accepted, 2026-05-16.
**Owner.** supabase-architect (migration 044), bac-curriculum (contract
re-issue), pedagogy-auditor (cut audit + field-shape pushback).
**Related.**
- [ADR 0005](0005-branch-test-workflow.md) — branch-test workflow;
  this ADR's migration is the first non-cosmetic push tested under
  script v2 end-to-end.
- [ADR 0007](0007-misconception-schema.md) — base misconception schema
  shipped as migration 043. This ADR amends the canonical entry
  contract from four fields to five.
- [ADR 0008](0008-misconception-authoring-conventions.md) — authoring
  conventions; the seed JSON shape this ADR amends.
- `backend/supabase/migrations/044_misconception_entry_shape.sql` —
  the migration this ADR documents.
- `backend/seed/misconceptions/sma_limit_calc.json` — the seed file
  rewritten under this ADR's schema_version 2.

---

## Context

Pre-encoder consolidation for the misconception authoring slice. Two
unrelated questions surfaced during the first authoring (ADR 0008
shipped `sma_limit_calc.json` with 4 misconceptions):

1. The seed file's `authoring_notes.candidates_cut` named two cuts in
   one-line form. Without the full audit, future authors don't know
   why they were cut and whether to revisit. The user asked for the
   full record.

2. The seed file carried `distinguishing_mcq_stem` as an authoring-
   time-only field (string). ADR 0008 §4 declared it would stay
   seed-only. But step 3 (distractor tagging) needs to read the
   distractor-choice label programmatically to write
   `items.distractor_misconceptions[choice] = misconception_id` —
   a prose string can't be parsed reliably. The field must be
   promoted to the DB and restructured.

This ADR records both decisions, the conflict between
bac-curriculum's and pedagogy-auditor's first answers, the resolution
in favour of pedagogy-auditor's structured shape, and the branch-test
result.

## Decision A — Cut-candidate audit (surfaced in full)

Both cuts from `backend/seed/misconceptions/sma_limit_calc.json` are
**firm** (not borderline). Both pass the 4-criteria filter from
ADR 0008. They were cut for **skill-attribution** only: each
misconception belongs on a different skill than `sma_limit_calc`.
Shipping them here would route diagnosis and remediation to the
wrong unit.

### Cut 1 — `mc.math.sma_limit_ops.somme-limites-inexistantes`

**Label (FR):** "La limite d'une somme est la somme des limites,
même si les limites individuelles n'existent pas"

**Description (FR):** L'élève applique la règle de linéarité des
limites — `lim(f+g) = lim f + lim g` — sans vérifier que les deux
limites individuelles existent finiment. Face à `lim(x→+∞) (x − sin(x))`,
il tente de séparer en `lim x + lim(−sin(x))`, constate que `sin(x)`
n'a pas de limite, puis conclut soit que la somme n'a pas de limite,
soit qu'elle vaut ∞. Le modèle erroné est que la règle de linéarité
est sans condition.

**Evidence considered:** Cornu (1991), cadre SM-A 2006, Bac SMA
sessions 2019 / 2021.

**Filter result:** Passes (a)+(b)+(c)+(d). Cut reason:
**skill-attribution** — the wrong model is about the operational
rules governing limit algebra, not the computation of a specific
limit form.

**Belongs on:** `sma_limit_ops` (Opérations sur les limites).

**Borderline?** No (firm).

### Cut 2 — `mc.math.sma_asymptotes.limite-infinie-sans-asymptote`

**Label (FR):** "Une limite infinie signifie que la fonction n'a
aucune propriété utile (pas d'asymptote, pas de comportement
régulier)"

**Description (FR):** L'élève sait que `lim = ∞` signifie que la
limite n'est pas un réel, et conclut immédiatement que la fonction
diverge dans un sens général. Il ne cherche pas de branche
parabolique, d'asymptote oblique, ou de comportement comparatif à
l'infini. Le modèle confond « la limite n'est pas un nombre fini »
avec « la fonction n'a pas de comportement asymptotique structuré ».

**Evidence considered:** Sierpinska (1987), cadre SM-A 2006 unité
"Branches infinies", Bac SMA session normale 2022.

**Filter result:** Passes (a)+(b)+(c)+(d). Cut reason:
**skill-attribution** — the misconception fires on branches infinies
content, not on limit computation technique.

**Belongs on:** `sma_asymptotes` (or whichever skill code covers
branches infinies in the SMA Analyse taxonomy).

**Borderline?** No (firm).

### Implications

Both cuts ship as authored misconceptions when their respective skills
are authored. They are not lost — `sma_limit_calc.json`'s
`authoring_notes.candidates_cut` now carries the full record (rewritten
to a structured array under schema_version 2) so the next authoring
pass for `sma_limit_ops` and `sma_asymptotes` starts with these
candidates already prepared. Each carries its proposed ID, evidence,
and filter status.

## Decision B — `distinguishing_mcq_stem` promoted to schema field with
structured shape

### B.1 — Field promoted from seed-only to DB-resident

ADR 0008 §4 declared: *"The encoder projects only `{id, label,
description, contradicts_principle}` into `skills.common_misconceptions`
JSONB. `evidence` and `distinguishing_mcq_stem` stay in the seed file
as the audit trail and the input to distractor tagging respectively;
they are not in the DB."*

This ADR reverses the second half of that decision.
`distinguishing_mcq_stem` is now a canonical fifth field, present in
every DB-resident misconception entry. `evidence` remains seed-only —
it is the literature audit trail, not a runtime artifact.

### B.2 — Field shape: structured object, not free-text string

**Conflict during agent review.** bac-curriculum approved the prose-
string shape and re-issued the contract with it. pedagogy-auditor
pushed back: prose can't be parsed by the step-3 encoder. They cannot
both be right; pedagogy-auditor has the deeper insight into step 3's
actual machine-read needs.

**Resolution:** ship the structured shape.

```
distinguishing_mcq_stem: {
  stem_text                TEXT  -- the MCQ stem itself, all choices included
  distractor_choice_label  TEXT  -- 'A' | 'B' | 'C' | 'D'; the slot this
                                 -- misconception leads the student to pick
  distractor_rationale     TEXT  -- one sentence for the human reviewer
  correct_choice_label     TEXT  -- the actual correct choice slot
  correct_rationale        TEXT  -- one sentence justifying the correct answer
}
```

The `distractor_choice_label` is the load-bearing key — it tells the
step-3 encoder which slot in `items.distractor_misconceptions` to
write the misconception ID into without parsing prose. The
`*_rationale` fields are the audit trail enabling a human reviewer
to confirm the link between misconception and distractor is correct;
without them, the tag is asserted but not explained, and since
misconception IDs are immutable once tagged, an unverifiable tag is a
permanent liability.

**Why bac-curriculum's earlier confirmation didn't catch this:**
bac-curriculum's domain is content-shape and cadre fit, not the
mechanics of step-3's encoder. The string shape is content-valid;
it's machine-insufficient. The right separation: bac-curriculum owns
"is this content cadre-correct?", pedagogy-auditor owns "does this
authoring shape unblock the diagnosis pipeline?". Both questions
matter; their answers can differ on shape.

bac-curriculum's contract re-issue from this stage is therefore
updated to reflect the structured shape — see §B.4 below.

### B.3 — Migration 044

`backend/supabase/migrations/044_misconception_entry_shape.sql`.
Option A (documentation-only migration): `COMMENT ON COLUMN
public.skills.common_misconceptions IS '...'` records the five-field
shape (with the structured sub-fields named) plus the `label_ar: null`
encoder sentinel.

**Why Option A and not Option B (CHECK constraint):** Migrations
040-043 enforce invariants via `DO $verify$` at migration time, not
via CHECK constraints. The encoder is the contract-enforcing layer
(when written, per ADR 0008 §"Pending"); a CHECK on a JSONB-shape
predicate that's redundant with encoder discipline is operational
hazard, not safety — a single bad entry from a buggy encoder run
would abort the whole UPDATE.

The `DO $verify$` block in 044:
- Reads the comment back via `pg_catalog.col_description(...)`.
- Asserts each of the five field names appears in the comment text,
  plus the structured sub-field names `distractor_choice_label` and
  `correct_choice_label`. Proves the structured shape is in place,
  not the legacy string-shape text.
- Re-asserts every migration 043 structural invariant: column
  existence, NOT NULL + defaults, `user_misconception_states` table,
  RLS + 3 policies + 4 indexes, learner-model-added columns.
- Re-asserts the canonical prereq baseline (SMA=98, SMB=31, PC=21,
  SVT=9, humanities=42, total=201, cross=0).

Wrapped in `BEGIN;…COMMIT;`; any verify failure rolls back. Idempotent
via `COMMENT ON COLUMN` (replaces existing) and `DO $verify$` (read-only).

### B.4 — Canonical misconception-entry contract (re-issue)

After migration 044, the authoritative shape for every entry in
`skills.common_misconceptions[]` is:

```
{
  id                            TEXT     -- IMMUTABLE; format mc.<subjects.code>.<skills.code>.<short-label>
  label                         TEXT     -- content-editable; short FR name, ≤ 80 chars
  description                   TEXT     -- content-editable; 2-3 sentence FR description of the wrong model
  contradicts_principle         TEXT     -- content-editable; cadre-named or literature-named principle in FR
  distinguishing_mcq_stem       OBJECT   -- content-editable; structured per §B.2
  label_ar                      TEXT     -- emitted as null by the encoder for MVP
}
```

**Immutability rule (re-affirmed and expanded):**
- `id` is immutable once any row in `items.distractor_misconceptions`
  or `user_misconception_states` references it. No rename, no re-key.
  Deprecation only via a future `deprecated_at` field.
- All other fields (`label`, `description`, `contradicts_principle`,
  `distinguishing_mcq_stem` and its sub-fields, `label_ar`) are
  **content-editable**. Updating them is a content edit and ships as
  a routine encoder-emitted UPDATE migration. Rewriting a shipped
  stem (e.g., substituting a cleaner expression, correcting a
  distractor label) does NOT retire the misconception ID.

**Seed file shape (schema_version 2):**
`backend/seed/misconceptions/<skills.code>.json` carries each entry
with the five canonical fields PLUS:
- `evidence: TEXT[]` — literature citations / Bac year+session
  references. Seed-only; encoder discards.
- Top-level `schema_version: 2` (incremented from `1` at this ADR).
  Encoder asserts `schema_version === 2` on read and rejects v1
  files.

### B.5 — M4 stem revised under bac-curriculum's flag

bac-curriculum's §3 cadre audit on the four existing stems passed
M1/M2/M3 unchanged. M4 (`limite-fondamentale-linearite`) had a
labelling ambiguity: choice C "= 2" was annotated "le 2 passe devant"
— but the argument of `sin` is `x²`, not `2x`, so the model that
produces choice C is "the student confuses `sin(x²)` with `sin(2x)`",
not "the 2 passes in front". The seed file's M4
`distractor_rationale` was rewritten to that clearer phrasing under
schema_version 2.

## Branch-test result — first end-to-end firing of script v2

`scripts/branch-test.ps1` v2 fired against migration 044 (the first
real-use firing against a non-cosmetic misconception change since the
v2 sanity checks landed). All 11 checks green; exit 0; ~13 seconds
end-to-end.

```
Log: .audit-logs/branch-test-20260516-002339.log
Steps:
  link CLI to staging                                              OK
  supabase db push (staging)                                       OK   (044 applied)
  fetch staging anon key                                           OK
  per-stream attribution                                           OK
  anon write denied on subjects (RLS proof)                        OK
  anon SELECT on skills (read path intact)                         OK
  anon write denied on user_misconception_states (RLS proof)       OK
  anon SELECT on user_misconception_states returns []              OK
  skills.common_misconceptions default round-trips as []           OK
  items.distractor_misconceptions default round-trips as {}        OK
  misconception indexes exist (pg_indexes via psql)                OK
  ALL CHECKS PASSED — staging matches expected baseline
  restoring CLI link to prod                                       OK
```

The script-v2 four-check additions (RLS proof on
`user_misconception_states`, two default round-trips, four-index
existence) all fired and passed. The pg_policies.roles-cast rule the
ADR 0005 amendment recorded was already applied in migration 043 and
carried through to migration 044 — no recurrence of the
`name[] @> text[]` issue.

### Operational observation: double-application via PowerShell pipe

One artifact worth noting (not blocking; cosmetic on idempotent
migrations only): when `supabase db push` is invoked via PowerShell's
`'Y' | & supabase db push 2>&1` construction inside the script's
`Invoke-Native` helper, the migration is applied TWICE within a single
`Invoke-Step` invocation. The log captures two consecutive
"Applying migration … / Finished supabase db push." blocks.

When the same `supabase db push` is invoked from bash via `echo "Y" |
supabase db push`, the migration applies ONCE — confirming the
double-application is a PowerShell-stdin-pipe quirk, not a CLI
behaviour.

For migrations whose statements are all idempotent (which this codebase
enforces by convention), the double-application is harmless: each
statement runs twice but produces the same end state, and the verify
block passes both times. For a hypothetical non-idempotent migration
(rare in this codebase — every prior migration uses ON CONFLICT,
IF EXISTS, COMMENT-OR-REPLACE, etc.) the double-application would be a
correctness risk.

Filed for investigation: this should not block any forthcoming
migration, but the next branch-test script revision (v3?) should
either single-shot the invocation or assert that pending-migration
count goes to zero after the first call. Captured in §"Pending"
below.

## Consequences

- **Cut candidates preserved.** Both surface in `authoring_notes.candidates_cut`
  as structured records with proposed IDs, evidence, and filter
  status. When `sma_limit_ops` and `sma_asymptotes` are authored, the
  candidates are already prepared.

- **Step 3 (distractor tagging) is unblocked.** The structured
  `distinguishing_mcq_stem` shape gives the encoder the
  `distractor_choice_label` it needs to write
  `items.distractor_misconceptions[label] = misconception_id` without
  parsing prose.

- **The encoder's spec is now fully concrete.** Per ADR 0008
  §"Pending", the encoder reads `backend/seed/misconceptions/<skill_code>.json`,
  asserts `schema_version == 2`, projects the five canonical fields
  (plus encoder-injected `label_ar: null`) into JSONB, and emits one
  UPDATE migration per file. Nothing in the encoder spec is unsettled
  after this ADR.

- **Branch-test workflow proven end-to-end.** Script v2's
  misconception-schema checks ran for the first time against a real
  schema change; all four new checks passed; ADR 0005 §Amendments'
  premise (script v2 covers misconception-schema validation
  going forward) is confirmed.

## Pending follow-ups

- [ ] **Author misconceptions for `sma_limit_ops` and `sma_asymptotes`**,
      starting from the cut-candidate records preserved in
      `sma_limit_calc.json`'s `authoring_notes.candidates_cut`. Each
      ships as its own JSON file under `backend/seed/misconceptions/`.

- [ ] **Encoder for misconception patch migrations** (carried over
      from ADR 0008 §"Pending", now fully spec'd). Reads schema_version
      2 JSON files; emits one UPDATE migration per skill; injects
      `label_ar: null` per ADR 0008 §6.

- [ ] **Step 3 — distractor tagging on existing `sma_limit_calc` MCQ
      items.** Consumes the structured `distinguishing_mcq_stem` from
      the seed file; writes `items.distractor_misconceptions[label] =
      misconception_id` per ADR 0007 §"items.distractor_misconceptions".
      First real exercise of the
      `items.distractor_misconceptions` default round-trip check
      in `branch-test.ps1` (the existing check looks at the first row by
      id-asc; tagging non-first rows leaves it unaffected — but if
      step 3 ever needs to tag row 1, the script's check needs to
      switch to a "default on any untagged row" assertion).

- [ ] **PowerShell double-application investigation.** The
      `'Y' | & supabase db push` construction applies the migration
      twice. Idempotent migrations make this cosmetic, but the
      script's contract is "apply pending migrations to staging" not
      "apply each pending migration twice". Investigate
      `--include-all`, redirection, or a single-shot mode for the CLI.
      Script v3 candidate.

- [ ] **bac-curriculum + pedagogy-auditor handoff protocol.** This
      stage surfaced a substantive disagreement (string vs structured
      stem) that wasn't caught at agent design time. Future
      multi-agent schema decisions should explicitly route through
      both reviewers in series rather than parallel when content and
      machine-read shape might diverge — or include an explicit
      "field also serves machine-read" flag on the agent brief so
      bac-curriculum hands off the machine-read question to
      pedagogy-auditor instead of resolving it.
