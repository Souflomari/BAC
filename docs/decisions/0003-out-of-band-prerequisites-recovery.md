# ADR 0003 — Out-of-band prerequisites recovery, and a new rule

**Status.** Accepted, 2026-05-15.
**Owner.** supabase-architect (schema + migration discipline).
**Related.** `docs/grounding/schema-reconciliation.md` §2.2, §5.1;
`docs/grounding/known-issues.md` K-3 (encoders/scripts rewriting migrations
or running out of band).

---

## Context — how this surfaced

Migration 040 enabled RLS on the seven curriculum tables. The cleanup
diagnostic that followed it asked: "is the audit's E-1 finding (zero SMA
+ SMB prereq edges) partly closed?"

To answer that, we ran a per-stream breakdown of `public.skill_prerequisites`
against prod. Building the query required inspecting the live schema
(my chat partner had half-guessed `skills.subject_id`, which doesn't
exist — verified via REST 400, error code 42703). The actual join path:

```
skill_prerequisites.skill_id → skills.id
skills.topic_id              → topics.id
topics.subject_id            → subjects.id
```

Stream cannot come from `stream_subjects`: 12 of the 13 subjects map to
multiple streams (the `math` subject maps to all six), so a naive join
multiplicatively over-counts. Stream is encoded by **`skills.code`
prefix** per schema-reconciliation §2.1, disambiguated for the unprefixed
bucket via the topic's subject code:

```sql
CASE
  WHEN sk.code LIKE 'sma\_%' ESCAPE '\' THEN 'SMA'
  WHEN sk.code LIKE 'pc\_%'  ESCAPE '\' THEN 'PC'
  WHEN sk.code LIKE 'svt\_%' ESCAPE '\' THEN 'SVT'
  WHEN sub.code IN ('math','physics','svt')      THEN 'SMB'
  ELSE                                                'humanities'
END
```

"humanities" here aggregates every non-scientific filière —
engineering (Sciences de l'Ingénieur), philosophy, languages,
islamic_ed, economics, business, accounting, law.

## Diagnostic — the gap, and the per-stream baseline

`public.skill_prerequisites` in prod held **103 edges**, but the migration
files only accounted for **30**:

| Source | Edges |
|---|---|
| `032_seed_pc_skills.sql` | 21 (PC) |
| `036_seed_svt_skills.sql` | 9 (SVT) |
| **Unaccounted-for** | **73** |

Per-stream breakdown of all 103 edges, attributed by the dependent skill
(`skill_id`) using the rule above:

| Stream | Audit §2.2 baseline | Prod 2026-05-15 | Δ |
|---|---|---|---|
| **SMA** | 0 | **0** | unchanged |
| **SMB** | 0 | **31** | +31 |
| PC | 21 | 21 | unchanged |
| SVT | 9 | 9 | unchanged |
| humanities | not measured | 42 | new |
| **Total** | 30 | **103** | +73 |

Cross-stream edges (where the dependent and the prereq live in different
streams): **0**. Curriculum integrity is intact — every edge stays within
its filière.

**These five numbers (SMA=0, SMB=31, PC=21, SVT=9, humanities=42) are the
canonical baseline for this schema slice.** Any future diagnostic over
`skill_prerequisites` must reconcile against them before being trusted.
The `DO $verify$` block in migration 041 hard-codes them as a runtime
assertion.

Provenance of the 73: every row matches `backend/seed/seed_data.sql`
lines 584-710 byte-for-byte (verified by Python set comparison). That
file is referenced by `backend/seed/seed_remote.sh:59` and
`backend/seed/validate.sh:24` but **was never converted into a numbered
migration**. Someone ran it against prod via the dashboard SQL editor or
`psql` directly. The migration history lost track.

## Decision

1. **Migration 041 captures the 73 edges into versioned history.**
   `backend/supabase/migrations/041_recover_smb_humanities_prereqs.sql`
   mirrors the three INSERT blocks of `seed_data.sql` with `ON CONFLICT
   (skill_id, prerequisite_skill_id) DO NOTHING`. A `DO $verify$`
   post-condition asserts the canonical baseline counts inside the
   `BEGIN; … COMMIT;` so any drift rolls the migration back.

2. **`seed_data.sql` is preserved.** It's still load-bearing for
   `seed_remote.sh` and `validate.sh`; modifying it risks orphaning those
   scripts. A 4-line breadcrumb at line 583 points to migration 041 and
   labels any drift between the two as a bug.

3. **New rule, effective 2026-05-15: no out-of-band production writes
   against the curriculum tables.** Any change to `subjects`, `topics`,
   `skills`, `skill_prerequisites`, `items`, `badges`, `stream_subjects`
   (and the exam-corpus tables once they reach the same state) must ship
   as a **numbered migration in `backend/supabase/migrations/`**. The
   acceptable surfaces are:

   - `supabase db push` against the linked project, applying versioned
     migrations.
   - `supabase migration new` to author a new migration locally first.

   The unacceptable surfaces are:

   - Dashboard SQL editor for any write that isn't itself versioned.
   - `psql` / `seed_remote.sh` against prod for content that isn't also
     a numbered migration.
   - Encoder reruns that rewrite an existing migration file in place
     (the K-3 anti-pattern). Encoders must emit *new* numbered migrations
     instead.

   RLS migration 040 makes the first sub-rule enforceable for non-service
   roles (anon / authenticated can no longer write). The remaining
   discipline is on the human + agent side: anyone with the
   service_role key, including the dashboard, must use the migration
   path.

4. **Branch test is explicitly skipped for migration 041 only**, with
   the reasoning captured here:
   - The 73 edges are *already* in prod state — the migration is
     effectively a no-op on the INSERT path (every row hits the ON
     CONFLICT clause). It is not introducing new state; it is
     versioning state that already exists.
   - The only behavioural change at COMMIT time is running the `DO
     $verify$` block against the existing prod data. The diagnostic
     against the same prod data already confirmed the five counts the
     verify block asserts.
   - The `DO $verify$` block is inside `BEGIN; … COMMIT;`. A failure
     rolls the migration back. Worst case is a noisy push with zero
     state change.
   - The Free tier blocks managed branching (`supabase branches create`
     → HTTP 402); the local Docker stack isn't running on the dev
     machine; the alternative would be to wait an unknown amount of
     time for Docker.
   - The migration passes a real-Postgres parse via `pglast` (libpg_query
     bindings): 2 transaction statements, 3 inserts, 1 DO block, syntax
     valid.

   **This is not a precedent.** The next non-additive or behavioural
   migration restores the branch-test gate. The audit's
   `known-issues.md` K-2 remediation (Docker-up dev workflow, or
   Pro-plan branching) remains owed.

## Consequences

- `supabase db reset` against a fresh local DB now reproduces the full
  prod `skill_prerequisites` shape (103 edges) without manual
  intervention.
- The K-3 anti-pattern (out-of-band scripts) is closed for
  `skill_prerequisites`. Other tables touched by `seed_data.sql` may
  still carry analogous gaps — a separate audit slice will reconcile
  them.
- E-1 (the audit's "zero SMA + SMB prereq edges" finding) is **partly
  closed**: SMB went 0 → 31. **SMA remains at 0**. The 108 SMA skills
  still have no DAG edges in the DB; the highest-ROI remediation listed
  in the audit (extend `json_encode_sma.dart` to emit prereq INSERTs)
  is unblocked but not done.
- The branch-test exception above costs us nothing on this migration,
  but a second exception on a different migration would erode the rule.
  The next migration must be branch-tested or upgrade the plan.

## Pending follow-ups

- [ ] SMA prereq backfill (`json_encode_sma.dart` extension). Audit's
      priority #2 after the stack decision.
- [ ] Audit the rest of `seed_data.sql` for content that is in prod but
      not in any numbered migration. Reconcile per-section.
- [ ] Decide on the K-2 remediation: dev-machine Docker workflow or
      Supabase Pro for managed branches. Owed before the next
      non-additive migration.
