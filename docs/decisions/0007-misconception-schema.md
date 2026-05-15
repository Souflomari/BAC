# ADR 0007 — Misconception schema (Stage 4)

**Status.** Accepted, 2026-05-15.
**Owner.** supabase-architect (migration shape), bac-curriculum (field
shape + ID semantics), learner-model (state shape + indexes).
**Related.**
- [ADR 0003](0003-out-of-band-prerequisites-recovery.md) — RLS pattern,
  canonical baseline.
- [ADR 0004](0004-sma-prereq-backfill.md) — extended canonical baseline
  (SMA=98, etc.).
- [ADR 0005](0005-branch-test-workflow.md) — branch-test infra; this
  ADR records its first real-use firing.
- [ADR 0006](0006-smb-reconciliation.md) — closure of SMB-1.
- `docs/grounding/schema-reconciliation.md` §2.3, §3.2 — the
  misconception schema first surfaced as a Stage-1 audit finding.

---

## Context

Stages 1-3.5 closed the structural debt: RLS on curriculum tables,
out-of-band edge recovery, SMA backfill, branch-test workflow, SMB
reconciliation. Stage 4 lands the schema that the next vertical-slice
work (content tagging + diagnosis logic) is blocked on:

- `skills.common_misconceptions` JSONB — author's list of misconceptions
  per skill, each with `{id, label, description, contradicts_principle}`.
- `items.distractor_misconceptions` JSONB — per-MCQ map from distractor
  choice index to the misconception ID it surfaces.
- `user_misconception_states` table — per-(user, skill, misconception)
  diagnosis state for the `submit-answer` edge function to read/write.

Without this schema, the pedagogy-auditor backlog and learner-model
diagnosis work cannot start. Migration 043 is the load-bearing
dependency.

## Joint design — who contributed what

Three agents coordinated. Each agent's contribution to the final
migration is recorded explicitly:

### supabase-architect — migration shape
- File layout: header, `BEGIN; ... DDL ... DO $verify$ ... COMMIT;`,
  reversal comment block. Matches the pattern from migrations 040, 041,
  042.
- Idempotency: every `CREATE` uses `IF NOT EXISTS`; every `CREATE POLICY`
  preceded by `DROP POLICY IF EXISTS`.
- Index op-class choice: `jsonb_path_ops` for both GIN indexes — smaller
  hash-based index, fully supports the `@>` containment queries used by
  the scheduler ("which skills define misconception X?", "which items
  tag misconception ID X?"). Does not support `?` (key existence) or
  `->` (extraction); neither is needed on these columns.
- No explicit `service_role manages …` policies on user-state tables.
  Contrast: ADR 0003's curriculum-table pattern added them for
  documentation, but for `user_misconception_states` they are redundant
  noise — `service_role` has `BYPASSRLS` already, and the edge function
  enforces `user_id = auth.uid()` in code (see learner-model §3 below).
- `pg_policies.roles` is `name[]`, not `text[]`. Initial verify block
  used `roles @> ARRAY['authenticated']` which failed with `operator
  does not exist: name[] @> text[]` on first branch-test firing.
  Resolved with explicit `roles::text[] @> ARRAY['authenticated']`.
  Recording this as a discipline note for future verify blocks.

### bac-curriculum — field shape + ID immutability
- **Ship the user's `{id, label, description, contradicts_principle}`
  shape.** Dropped `label_ar` (AR fields stay null for MVP — no value
  in carrying null fields through every author write) and
  `prerequisite_misconception_id` (premature — the misconception corpus
  is empty; modeling prerequisite chains before any misconceptions
  exist is guesswork). Both can be added later via additive migration
  if needed; misconception IDs are immutable but the field shape is not.
- **ID immutability semantics confirmed.** Misconception IDs follow the
  same rule as notion / skill UUIDs: once a misconception ID appears in
  `skills.common_misconceptions[].id` AND any `items.distractor_misconceptions`
  maps a distractor to it AND any `user_misconception_states` row exists
  with that ID, the ID is permanent. Deprecation is the only path —
  via a `deprecated_at` field added by a later migration. No rename,
  no re-key.
- **Recommended naming convention:**
  `mc.<subject-slug>.<skill-code>.<short-label>`
  - Examples: `mc.math.limite-fonction.confusion-indeterminee-zero-sur-zero`,
    `mc.phys.loi-ohm.inversion-tension-intensite`,
    `mc.svt.adn-structure.brin-sens-antisens-inverse`.
  - Subject slug matches the existing subject codes (`math`, `phys`,
    `svt`, `si`).
  - Skill code matches `skills.code` exactly — pins the misconception
    to its skill without UUID lookup.
  - Short label is lowercase + hyphenated; human-auditable and
    collision-resistant within a skill.

### learner-model — state shape + index choices
Pushed back on two of the user's spec items:

**Two state fields added** to `user_misconception_states` beyond the
user's spec:
- `first_exhibited_at TIMESTAMPTZ` — set once on INSERT, never updated.
  Lets the aggregate analysis loop distinguish "exhibited once
  yesterday" from "exhibited 30 times across 6 weeks, last time
  yesterday". Without it, the two look identical in `last_exhibited_at`.
- `remediation_attempts INT NOT NULL DEFAULT 0` — incremented each time
  the diagnosis routes the student through targeted remediation. Lets
  the scheduler tell a fragile fix ("resolved after 8 attempts and
  3 relapses") from a durable one ("resolved after 1 attempt").
  Without it, `resolved_at` alone can be set prematurely.

Field explicitly **not added**: `last_exhibited_via_item_id`. The
item-level evidence already lives in `user_item_history` with
`item_id`, `skill_id`, and `created_at`. Adding a FK here would
duplicate that audit log.

**Index layout corrected** — the user's spec'd composite B-tree on
`(user_id, skill_id)` was redundant with the primary key
`(user_id, skill_id, misconception_id)`. Postgres serves left-prefix
scans of the PK without an extra index. learner-model's replacement:

- **Partial index** on `(user_id, skill_id) WHERE resolved_at IS NULL`
  — the scheduler's hot path is always "unresolved misconceptions for
  (user, skill)"; the partial index excludes resolved rows, producing a
  smaller index that exactly matches the query predicate.
- **Reverse-direction index** on `(misconception_id, user_id)` — covers
  the aggregate analysis loop's cross-student query: "which students
  are running misconception X?". Not served by the PK because the PK
  leads with `user_id`.

**RLS for the diagnosis edge function: must run as `service_role`.**
The reason is mechanical: if `submit-answer` runs as `authenticated`,
a missing or stale JWT means RLS silently returns 0 rows affected,
not an exception — writes vanish. `service_role` BYPASSRLS, the edge
function bears the responsibility for enforcing `user_id =
auth.uid()` in its own code before writing. This is the correct
boundary: RLS protects client-direct access; the edge function is a
trusted server-side component enforcing the constraint in code.

The user's three policies (SELECT, INSERT, UPDATE for `authenticated`
WHERE `user_id = auth.uid()`) remain correct for client-direct reads
(the "my active misconceptions" screen) — those don't go through the
edge function.

## What landed (migration 043)

```
backend/supabase/migrations/043_misconception_schema.sql
```

- `ALTER TABLE public.skills ADD COLUMN common_misconceptions JSONB
  NOT NULL DEFAULT '[]'::jsonb`
- `ALTER TABLE public.items ADD COLUMN distractor_misconceptions JSONB
  NOT NULL DEFAULT '{}'::jsonb`
- `CREATE TABLE public.user_misconception_states`: PK
  `(user_id, skill_id, misconception_id)`; FKs on `user_id` →
  `profiles(id)` and `skill_id` → `skills(id)` (both ON DELETE CASCADE);
  `misconception_id TEXT` (no FK, see schema doc); `exhibited_count INT
  NOT NULL DEFAULT 0`; `first_exhibited_at TIMESTAMPTZ`;
  `last_exhibited_at TIMESTAMPTZ`; `remediation_attempts INT NOT NULL
  DEFAULT 0`; `resolved_at TIMESTAMPTZ`; `created_at`, `updated_at`
  with the existing `update_updated_at()` trigger.
- RLS ENABLED + 3 policies (SELECT, INSERT, UPDATE) for `authenticated`
  scoped to `auth.uid() = user_id`.
- 4 indexes:
  - `idx_skills_common_misconceptions_gin` — GIN, jsonb_path_ops.
  - `idx_items_distractor_misconceptions_gin` — GIN, jsonb_path_ops.
  - `idx_user_misconception_states_active` — B-tree
    `(user_id, skill_id) WHERE resolved_at IS NULL`.
  - `idx_user_misconception_states_misconception` — B-tree
    `(misconception_id, user_id)`.
- `DO $verify$` post-condition block asserting every artifact above
  plus the canonical prereq baseline (SMA=98, SMB=31, PC=21, SVT=9,
  humanities=42, total=201, cross=0 — re-asserted so this migration
  cannot accidentally drift the baseline).

## Branch test — first real-use firing

`scripts/branch-test.ps1` was fired against the just-authored migration
for the first time. **It failed the first run** at the verify block
(`name[] @> text[]` operator error in `pg_policies.roles` check) and
the script's `finally` block correctly re-linked the CLI to prod after
the failure. The exact behavior ADR 0005 §"Operational rules" intended:
exit ≠ 0 → do not push to prod.

Fix applied (cast `roles::text[]`), branch test re-run:

```
Log: .audit-logs/branch-test-20260515-235053.log
Exit: 0
Steps:
  link CLI to staging                                  OK
  supabase db push (staging)                           OK   (043 applied)
  fetch staging anon key                               OK
  per-stream attribution                               OK   (baseline unchanged)
  anon write denied on subjects (RLS proof)            OK
  anon SELECT on skills (read path intact)             OK
  ALL CHECKS PASSED — staging matches expected baseline
  restoring CLI link to prod                           OK
```

This is the first time a migration has had its production push
gated on a passing branch test in this repo. ADRs 0003 §5 and 0004 §5
(branch-test skip exceptions) are now non-precedential — the third
skip would have been ADR 0007's, and the script prevented it.

## Verification against production (post-push)

Verified via the prod REST API:

| Check | Result |
|---|---|
| `skills.common_misconceptions` present, defaults to `[]` | ✓ |
| `items.distractor_misconceptions` present, defaults to `{}` | ✓ |
| `user_misconception_states` table exists | ✓ |
| Anon INSERT into `user_misconception_states` | **denied** (HTTP 401, code 42501) |
| Anon SELECT on `user_misconception_states` | **empty** (RLS filters to own rows) |
| Prereq baseline (SMA=98 etc.) | unchanged (re-asserted by verify) |

In-transaction NOTICE on prod push:

```
Migration 043 verification OK:
  skills.common_misconceptions added (NOT NULL, default []),
  items.distractor_misconceptions added (NOT NULL, default {}),
  user_misconception_states created with RLS + 3 policies + 4 indexes
    (2 GIN on the JSONB columns + partial-active + reverse-aggregate).
  Prereq baseline unchanged: total=201 SMA=98 SMB=31 PC=21 SVT=9
    humanities=42 cross=0
```

## Canonical sanity-check additions

The `scripts/branch-test.ps1` script's standard suite now implicitly
verifies the misconception schema on every future run, because:

- The prereq-baseline check re-asserts the existing canonical numbers.
  Any future migration that drifts those numbers fails the script.
- The RLS-proof check on `subjects` is generalizable; **a follow-up**
  should add RLS-proof on `user_misconception_states` to the script's
  default suite (same shape: attempt an anon INSERT, assert 401).
  Not added in this stage to avoid scope creep — tracked below.

What every future "what to verify after a misconception-related
migration" check should include:

1. **Columns still exist with the right defaults.** A `SELECT
   common_misconceptions FROM skills LIMIT 1` returns `[]` on at least
   one untagged row.
2. **`user_misconception_states` schema invariants.** The two
   learner-model fields (`first_exhibited_at`, `remediation_attempts`)
   are present, and `remediation_attempts` is `NOT NULL DEFAULT 0`.
3. **All 4 indexes present.** The partial index's predicate (`WHERE
   resolved_at IS NULL`) survives.
4. **RLS proof still works.** Anon INSERT into
   `user_misconception_states` denied; anon SELECT returns `[]`.
5. **Prereq baseline unchanged.** Re-assert the canonical counts to
   detect accidental cross-stage drift.

Items 2-4 are not in `branch-test.ps1` yet. Add in the next ADR-tracked
refactor of the script.

## Consequences

- **Pedagogy-auditor and bac-curriculum can begin authoring
  misconceptions.** Per bac-curriculum: one JSON patch file per
  unité-level slice, 2-4 misconceptions per skill on average. Start
  slice: SMA Analyse unité (limites, continuité, dérivation). Encoder
  emits `UPDATE public.skills SET common_misconceptions = ... WHERE
  code = ...` migrations — same pattern already used for `lesson` and
  `exam_paper` JSONB columns.

- **Learner-model can begin writing the diagnosis logic.** The
  `submit-answer` edge function reads `distractor_misconceptions`,
  writes `user_misconception_states` rows under `service_role`. The
  scheduler reads `user_misconception_states` filtered through the
  partial index (`WHERE resolved_at IS NULL`) for the
  "what-misconceptions-active-for-this-student" surface.

- **One operational rule recorded for future migrations:**
  `pg_policies.roles` is `name[]`, not `text[]`. Cast with
  `::text[]` in any verify block that checks policy role membership.
  Added to ADR 0005's §"Operational rules" follow-up list.

- **Branch-test discipline holds.** This stage exercises the rule
  ADR 0005 set up. The first run failed, the script blocked the prod
  push, the bug was fixed in 90 seconds, the second run passed, prod
  push succeeded. End-to-end fast loop.

## Pending follow-ups

- [ ] **Authoring slice 1 — SMA Analyse unité.** bac-curriculum's
      brief is concrete (per-skill JSON patch file, 2-4 misconceptions,
      starts with limit / continuity / derivation). First content PR
      after this ADR.

- [ ] **Distractor tagging on SMA Analyse items.** Once Slice 1's
      misconceptions are authored, tag the existing MCQ items in
      `items` for those skills with `distractor_misconceptions` so the
      diagnosis layer has signal. Migrations 027 / 028 / 031 lines are
      the candidates.

- [ ] **`submit-answer` edge function update.** Read
      `distractor_misconceptions` on each MCQ answer; INSERT/UPDATE
      `user_misconception_states` under `service_role`. learner-model
      owns the implementation.

- [ ] **`branch-test.ps1` extension** to add the 4 misconception
      checks listed in §"Canonical sanity-check additions" (RLS proof
      on user_misconception_states, column-default round-trip, etc.).
      Defer to ADR 0008 or a script-only PR.

- [ ] **`name[] ↔ text[]` discipline note** — add to ADR 0005's
      operational-rules section so the next verify block author
      doesn't repeat the same bug.
