# ADR 0004 — SMA prerequisite backfill + encoder acyclicity check

**Status.** Accepted, 2026-05-15.
**Owner.** bac-curriculum (edge validity) + supabase-architect (migration
shape and discipline).
**Related.**
- [ADR 0003](0003-out-of-band-prerequisites-recovery.md) — established
  the canonical per-stream baseline this migration extends.
- `docs/grounding/schema-reconciliation.md` §2.2 (E-1 finding).
- `docs/grounding/known-issues.md` E-1 (zero SMA + SMB edges, sev-1) and
  K-2 (no branch-tested deploy workflow).
- Migrations 040, 041 (Stages 1-2 of the same cleanup).
- `backend/seed/json_encode_sma.dart` (the encoder this ADR extends).

---

## Context

The audit's E-1 finding: 89 of 108 SMA skills declare prerequisites in
`shared/skill_map_sciences_maths_a.json`, but the existing
`json_encode_sma.dart` discarded the `prerequisites` arrays when emitting
seed SQL. ADR 0003 closed the analogous gap for SMB + humanities by
recovering 73 edges from `seed_data.sql` into versioned migration 041;
SMA remained at **0 edges** for 108 skills — the largest filière with no
DAG. Per `schema-reconciliation.md` §2.2 the SMA backfill was "the
highest-ROI single piece of work in the whole audit."

This ADR records:
- The encoder fix (read prereqs, validate acyclicity, emit migration 042).
- The curriculum cull applied to the source JSON before SQL emission.
- The new SMA edge-count baseline.
- A second consecutive branch-test skip and what it means for the rule
  in ADR 0003 §4.

## Decision

### 1. Encoder extension

`backend/seed/json_encode_sma.dart` now accepts an optional third argument
— the output path for a prereqs-only migration. The legacy 2-arg form
(seed migration 012) is unchanged. The 3-arg form additionally:

- Walks every `subjects[].topics[].skills[].prerequisites[]` in the
  source JSON.
- Resolves each prereq's `subtopic_id` to the deterministic UUID assigned
  during the seed pass. Cross-file references are unsupported and abort
  the encoder with a non-zero exit code; the SMA JSON has none today.
- Applies the **curriculum cull** (see §2 below) — a static blocklist
  of `(skill, prereq, reason)` triples flagged by `bac-curriculum`.
- Runs **Kahn's algorithm** for acyclicity over the post-cull edge set.
  Any node whose in-degree never reaches zero is reported as a
  cycle-participant and the encoder aborts before any SQL is written.
- Emits one INSERT block per topic that contributes edges. Each block
  ends with `ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING`,
  matching the pattern in `032_seed_pc_skills.sql:118`,
  `036_seed_svt_skills.sql:87`, and the three blocks in
  `041_recover_smb_humanities_prereqs.sql`.
- Wraps everything in `BEGIN; … COMMIT;` and ends with a `DO $verify$`
  block that hardcodes the new SMA count, re-asserts the ADR 0003
  baseline (SMB=31, PC=21, SVT=9, humanities=42), and asserts
  cross-stream=0. The expected SMA value is interpolated at encode time
  so the verification matches the SQL emitted in the same run.

This is the first acyclicity check the project has ever had on the
prereq graph. Previous migrations (032 PC, 036 SVT, 041 recovery) shipped
edges that were authored by humans without a programmatic validator.
Kahn's verdict: the SMA JSON's 101 declared edges form a DAG with no
cycles; all 108 nodes participate; the longest dependency chain is
`limit_def → limit_calc → limit_ops → asymptotes → function_study →
ln_study` (length 5).

### 2. Curriculum cull — 3 edges removed before emission

`bac-curriculum` reviewed the 101 declared edges against the Moroccan
SM-A cadre de référence and flagged three:

| Edge | Reason | Severity |
|---|---|---|
| `rings_fields ← groups` | Structures algébriques (groupes/anneaux/corps) are SM-B cadre, not SM-A. Both skills carry `exam_relevance_weight ≤ 0.65`, corroborating the JSON author knew this was fringe. | mandatory remove |
| `ode_apps ← ode_second_order` | Inverted orientation. The SM-A cadre introduces 2nd-order ODE through RLC / pendulum context — the application is the entry point, not the consequence. | mandatory remove |
| `ode_second_order ← ode_first_order` | The two ODE types are introduced in independent physical contexts in the SM-A cadre, not via generalisation. Pedagogically defensible but not cadre-mandated. | recommended remove |

All three are encoded in the encoder's `_edgeCull` constant near the top
of `json_encode_sma.dart`. Each entry carries a one-line reason so the
audit trail is local to the source. The cull list is the *only* place in
the project where SM-A cadre judgements override the source JSON; any
future cadre-driven exclusion belongs here.

`bac-curriculum` also flagged five backlog items (missing edges, scope
notes) — see [their full review](#bac-curriculum-backlog-notes-non-blocking)
at the bottom of this ADR. None block Stage 3.

### 3. Migration shape

`backend/supabase/migrations/042_seed_sma_prereqs.sql`:

- 32 topic-level INSERT blocks (one per SMA topic that contributes
  edges; one SMA topic — `algebraic_structures` after the cull —
  contributes zero and is omitted).
- 98 total tuples, each commented with the human-readable
  `child ← parent` mapping.
- `BEGIN; … DO $verify$ … COMMIT;` envelope; verification failure rolls
  back the entire migration.
- Comment-block reversal note at the end (matches 040, 041 pattern):
  blanket `DELETE FROM public.skill_prerequisites WHERE …` predicated on
  the `sma_` code prefix on both columns.

Parses clean via `pglast` (libpg_query bindings): 2 transaction
statements, 32 inserts, 1 DO block.

### 4. The new canonical baseline

Replaces the per-stream baseline from ADR 0003 §2:

| Stream | ADR 0003 baseline | ADR 0004 baseline | Δ |
|---|---|---|---|
| **SMA** | 0 | **98** | +98 |
| SMB | 31 | 31 | — |
| PC | 21 | 21 | — |
| SVT | 9 | 9 | — |
| humanities | 42 | 42 | — |
| **Total** | 103 | **201** | +98 |

Cross-stream edges: 0 (unchanged).

The DO $verify$ block in migration 042 hardcodes all six numbers. Any
future diagnostic over `skill_prerequisites` reconciles against this
new baseline.

E-1 finding is now **closed for SMA**. The remaining E-1 sub-finding —
that the SMB encoder also drops prereqs from `shared/skill_map_sciences_maths_b.json` — was already
closed by migration 041 (the 73-edge recovery sourced the SMB edges from
`backend/seed/seed_data.sql`, but `skill_map_sciences_maths_b.json`
declares its own; reconciling the two is open follow-up SMB-1 below).

### 5. Branch-test exception — second consecutive skip

**Per ADR 0003 §4 ("the next non-additive or behavioural migration
restores the branch-test gate"), migration 042 should have been
branch-tested. It was not.**

The blocker:
- `supabase branches create sma-prereq-test` returned HTTP 402; the
  project is on Free tier. `supabase branches list` showing `main` was
  the production branch self-listing, not evidence of an upgrade.
- Docker Desktop is not running on the dev machine — local
  `supabase db reset` is unavailable.
- No separate "staging" Supabase project exists.

The mitigations that were in place:
- The migration introduces NEW state (98 edges) — unlike 041 which was a
  no-op recovery. So unlike the 041 exception, the 042 push *could* have
  failed at runtime with non-trivial consequences.
- The `DO $verify$` block is the safety net: failure rolls the
  transaction back, leaving prod at the pre-042 state.
- The encoder ran Kahn's algorithm before emission — no cycles to find
  at migration time.
- The migration was parse-checked via `pglast` (real PostgreSQL
  parser) — syntax valid.
- The encoder's edge-emission logic is deterministic from a known input
  file; the migration is reproducible by re-running the encoder.

Outcome: the push succeeded, the verify block produced
`Migration 042 verification OK: total=201 SMA=98 SMB=31 PC=21 SVT=9
humanities=42 cross=0`, independent post-push attribution
matched all six counts exactly.

**This is the second consecutive branch-test skip in two days.** ADR 0003
said "next migration must be branch-tested or upgrade the plan" — neither
happened. The rule is now eroded. Two paths forward:

a) Accept that the rule, as written, is not enforceable without paying
for Pro tier (≈$25/mo + per-branch compute) or for the dev-machine
discipline of keeping Docker Desktop running. Rewrite the rule to be
honest: "branch-test when the env is available; document the skip in
the migration's ADR otherwise."

b) Commit to one of: Pro tier upgrade for managed branches, or a
documented Docker-up-before-migration workflow. The next migration
makes the choice explicit.

This ADR recommends **(b) by the next non-additive or behavioural
migration**. K-2 in `known-issues.md` already classifies this as a
sev-1 blocker before the first expand-contract migration ships. Until
then, the verify-block-as-safety-net pattern is the floor.

## Consequences

- The scheduler can now walk the SMA DAG for the first time. E-2
  (readiness-check surface, no path back to prerequisites) becomes
  technically possible.
- `supabase db reset` against a fresh local DB reproduces the full
  prod prereq state (201 edges) for all four scientific filières plus
  humanities, with no manual intervention. Closes one branch of K-3
  (out-of-band scripts) for the prereq table specifically.
- The first acyclicity check in the project ships as encoder
  infrastructure, callable by any future stream encoder (PC, SVT, SMB)
  if those re-run.
- The cull list is now the durable record of cadre-driven exclusions
  for SM-A. Any reviewer can see the three edges and their reasons in
  `json_encode_sma.dart` without reading the JSON or this ADR.
- The branch-test rule has been skipped twice. The next migration must
  resolve K-2 or document why it didn't, per §5(b).

## Pending follow-ups

- [ ] **SMB-1.** Reconcile `shared/skill_map_sciences_maths_b.json`'s
      `prerequisites` arrays with the 31 SMB edges currently in
      `skill_prerequisites` (sourced from `seed_data.sql`). If the JSON
      declares edges not in prod, write the SMB encoder and ship them
      as migration 043. If prod has edges not in the JSON, decide
      which is authoritative.
- [ ] **K-2 remediation.** Pro tier upgrade or Docker-up workflow,
      before the next migration. See §5(b).
- [ ] **bac-curriculum's five backlog items** (below). All low to
      medium priority; none block Stage 3.

### bac-curriculum backlog notes (non-blocking)

From the agent's review of `skill_map_sciences_maths_a.json`:

1. **`fixed_point ← tvi` missing.** The cadre treats fixed-point
   convergence via TVI or monotone-convergence. Currently only
   `fixed_point ← recurrent_sequences`.
2. **`moivre ← complex_equations` missing.** Bac problems routinely
   combine de Moivre with polynomial-root work.
3. **`esterification_mechanism ← reversible_basics` missing.** Concept
   entry point is implicit.
4. **`sequences_review` should carry `cadre_ref: out`.** It's
   tronc-commun recall; current `exam_relevance_weight: 0.70` is
   slightly high.
5. **`deriv_rules ← deriv_definition` arguably missing.** Currently
   only `deriv_rules ← deriv_basic`; in Bac exam contexts chain/product
   rules are justified via the limit definition.

These belong in a content-side encoder revision, not in a separate
migration. When the SMA JSON next gets a content pass, address them in
the source, re-run the encoder, and ship the diff as migration 044+.
