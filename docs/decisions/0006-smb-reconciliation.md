# ADR 0006 — SMB prereq reconciliation: JSON aligned, no migration needed

**Status.** Accepted, 2026-05-15.
**Owner.** bac-curriculum (scope + cadre verdict) + supabase-architect
(closure path).
**Related.**
- [ADR 0003](0003-out-of-band-prerequisites-recovery.md) — captured the
  31 SMB edges into versioned migration 041 (the recovery from
  `seed_data.sql`).
- [ADR 0004](0004-sma-prereq-backfill.md) — opened SMB-1 as a pending
  follow-up: "reconcile `skill_map_sciences_maths_b.json`'s `prerequisites`
  arrays with the 31 SMB edges currently in `skill_prerequisites`."
- [ADR 0005](0005-branch-test-workflow.md) — established staging and the
  branch-test script; this ADR is the first work scoped *behind* that
  gate.

---

## Context

Stage 3.5 closed the branch-test capability gap. Before Stage 4 ships,
the SMB follow-up from ADR 0004 §"Pending" needs a verdict: are the
SMB prereq edges in prod faithful to the source-of-truth JSON, or is
there encoder/migration work owed?

This ADR is the verdict.

## The diff (against prod, 2026-05-15)

`shared/skill_map_sciences_maths_b.json` declares 24 prereq edges
across `subjects: [math, physics]`:

| Subject | Topics | Skills | Edges |
|---|---|---|---|
| math    | 7  | 23 | 20 |
| physics | 4  |  9 |  4 |
| **JSON total** | **11** | **32** | **24** |

Prod's `skill_prerequisites` table contains 31 edges attributed to
SMB by the canonical attribution rule from ADR 0003 §2 (code-prefix
+ subject fallback for unprefixed). The 7-edge gap is entirely under
`subject = svt`:

| Direction | Count |
|---|---|
| MISSING (JSON declares, DB lacks) | **0** |
| EXTRA (DB has, JSON omits)        | **7** — all svt-subject |
| SWAPPED (orientation inverted)     | **0** |
| JSON skills not present in DB      | **0** |

The 7 extras:

```
fermentation         ← cell_energy
gene_expression      ← dna_structure
immune_disorders     ← specific_immunity
metamorphism         ← tectonic_deformations
mutations            ← gene_expression
sex_linked_heredity  ← autosomal_heredity
specific_immunity    ← self_nonself
```

## Decision

### A. Scope verdict: leave `skill_map_sciences_maths_b.json` as-is

The math+physics scope of the SMB JSON is **intentional and correct**.
The 7 SVT-subject edges should NOT be added to it.

Reasoning from bac-curriculum's review:

- **SMB does not examine SVT.** `stream_subjects` in production maps
  `sciences_maths_b` to `math`, `physics`, and `Sciences de
  l'Ingénieur` (coeff 5). The `svt` subject is mapped to `svt` filière,
  `sciences_physiques`, and `sciences_maths_a` — not SMB. The cadre de
  référence for SM-B does not include SVT as an examined subject; SM-B
  students sit Sciences de l'Ingénieur instead.

- **The 7 SVT-subject skills are shared.** `cell_energy`,
  `fermentation`, `dna_structure`, etc. are the same physical rows
  traversed by SMA students, SVT-filière students, and PC students.
  They are not SMB-specific pedagogically.

- **The 7 edges are attributed to SMB by the canonical rule's
  unprefixed+svt-subject fallback.** That heuristic was correct at
  ADR 0003 time as a *naming convention* recovery aid, but it
  over-claims for stream attribution: a skill being unprefixed and
  under the svt subject doesn't make it SMB curriculum, just shared.

- **Extending the SMB JSON to include svt would assert SMB owns SVT
  curriculum** — which the cadre does not support and which would
  drive the wrong behaviour in any future E-2 readiness-check surface.

The correct source-of-truth for the 7 SVT-subject skill rows is
`backend/seed/seed_data.sql` (the existing seed), and the correct
source-of-truth for their 7 prereq edges is **migration 041**
(`041_recover_smb_humanities_prereqs.sql:51-99`, the SVT block of the
recovery). Both are versioned. The K-3 anti-pattern is *not* present
here — these aren't out-of-band edges any more.

### B. Cadre validity of the 7 SVT edges — all pass

bac-curriculum reviewed each edge against the 2bac SVT cadre de
référence. Verdict per edge:

| Edge | Verdict | Reason |
|---|---|---|
| `fermentation ← cell_energy` | pass | Cadre-correct (Consommation de la matière organique). |
| `gene_expression ← dna_structure` | pass | ADN structure precedes transcription/translation. |
| `mutations ← gene_expression` | pass | Cadre places mutations after gene expression. |
| `sex_linked_heredity ← autosomal_heredity` | pass | Autosomal transmission is the reference frame. |
| `specific_immunity ← self_nonself` | pass | Soi/non-soi precedes specific immune response. |
| `immune_disorders ← specific_immunity` | pass | Dysfonctionnements presuppose specific immunity. |
| `metamorphism ← tectonic_deformations` | pass | Geology cadre sequences deformation before metamorphism. |

Zero removals. Zero orientation flags. No analogue to ADR 0004's 3-edge
cull list.

### C. Closure: no encoder, no migration

ADR 0004's SMB-1 follow-up is **resolved** by this analysis, not by
authoring code:

- The 24 JSON-declared edges in `skill_map_sciences_maths_b.json` are
  100% present in prod with correct orientation. Within the JSON's
  declared scope, prod and JSON are byte-identical.
- The 7 extras in prod are out-of-JSON-scope content already captured
  in versioned migration 041.

No `json_encode_smb.dart` is written this stage. No migration 043
ships. The canonical per-stream baseline from ADR 0004 stands
unchanged: SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201,
cross=0.

Because no migration shipped, `scripts/branch-test.ps1` was not
exercised this stage — its first non-dry-run firing is deferred to
Stage 4's first migration. ADR 0005's "third skip is inexcusable" rule
is preserved: no migration → no push → no skip.

## Consequences

- **Stage 4 unblocks.** The pending SMB-1 item in ADR 0004 is closed.
  Stage 4 can ship without an SMB encoder.

- **The attribution heuristic is a flagged latent bug for E-2.** The
  rule `subject IN (math, physics, svt) + unprefixed → SMB` over-
  attributes the 7 shared-SVT edges to SMB. This is harmless today
  (the readiness-check surface E-2 doesn't exist yet), but the moment
  the scheduler walks the SMB DAG to produce "you need to complete
  prerequisite X" prompts for SMB students, those students would be
  routed to SVT prereqs that aren't part of their cadre. The fix at
  that time: join through `stream_subjects` to filter prereqs to the
  student's actual subjects, not the attribution heuristic's
  approximation.

- **The branch-test script's hardcoded baseline survives.** Since
  Stage 4 will (eventually) change one of the per-stream counts, the
  `-ExpectedBaselineJson <path>` override added to ADR 0005 §Usage is
  the documented escape hatch — not exercised yet, but ready.

- **The K-3 anti-pattern is not fully closed for SMB.** Specifically:
  the 7 SVT-subject skill ROWS (the entries in `public.skills`, not
  their prereq edges) still come from `seed_data.sql`, not from a
  numbered migration. ADR 0005's "K-3 backlog of seed_data.sql + mig
  004 fixes" still applies. This ADR closes SMB-1 (the *prereq edges*
  follow-up) but does not close that broader debt.

## Pending follow-ups

- [ ] **E-2 attribution refactor.** When the readiness-check surface
      ships, the per-stream attribution rule must be replaced (or
      composed) with a `stream_subjects` join so SMB students don't
      get SVT-subject prereqs surfaced. Track as a hard requirement
      for the first E-2 PR.

- [ ] **K-3 backlog item still open.** `seed_data.sql` lines outside
      the prereq blocks (the subject/topic/skill/items rows) are
      still unversioned. A future ADR should capture those into
      numbered migrations to make `supabase db reset` reproducible
      end-to-end. Not blocking Stage 4.

- [ ] **Shared-subject skill renaming (long-term).** The cleanest
      long-term solution to the attribution heuristic ambiguity is
      to give the shared SVT skill rows an SMB-equivalent prefix
      (`smb_svt_`?) the way SMA uses `sma_`. That is an
      expand-contract immutable-ID migration and belongs after
      K-2 is fully resolved (which Stage 3.5 only partly did — see
      ADR 0005's expand-contract diff check gap). Not Stage 4 scope.
