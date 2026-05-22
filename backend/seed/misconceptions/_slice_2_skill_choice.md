# Slice 2 — skill choice + pre-authoring topology check

**Branch:** `slice-2-prep`
**Date:** 2026-05-18
**Hard stop point:** this document + the per-skill JSON file. No
encoder run, no migration 048, no production push, no function deploy.

---

## Choice — `sma_limit_ops`

Picking `sma_limit_ops` over `sma_asymptotes` for slice 2. Both
candidates from `sma_limit_calc.json`'s `authoring_notes.candidates_cut`
pass the 4-criteria filter equally; the deciding factors are:

1. **Bac-paper evidence breadth.** Candidate 1 (`sma_limit_ops`)
   cites Bac SMA 2019 + 2021; candidate 2 (`sma_asymptotes`) cites
   2022 only. Two years is a thinner gap, but more is more.
2. **Pedagogical centrality.** `sma_limit_ops` is invoked in every
   non-trivial limit problem (linearity, product, quotient
   theorems). `sma_asymptotes` is narrower (branches infinies, a
   specific sub-topic). Higher diagnostic yield per item of authoring
   effort.
3. **Stem-design space.** ADR 0012's v2 stem-design constraint
   requires that the correct answer not be reachable through any
   non-target misconception's reasoning. Sum-of-limits stems
   (sin(x)+1, x·sin(1/x), etc.) live in a different mathematical
   neighbourhood from 0/0 stems and so are less likely to coincide
   with M1's (`forme-indeterminee-valeur-nulle`) reasoning path —
   easier to author cleanly. Branches-infinies stems would more
   often live near the asymptote/limit-infinite boundary that the
   `sma_asymptotes` candidate itself targets, making the
   distinguishing-power proof harder.

The `sma_asymptotes` candidate stays in `candidates_cut` of
`sma_limit_calc.json` and gets its own slice later. Nothing lost.

---

## Bank-topology pre-check — FINDING (positive, not blocking)

Per the user's explicit instruction to re-check bank topology before
authoring: I ran the diagnostic query against prod for both candidate
skills' UUIDs.

```sql
-- equivalent of the actual REST call against /skills?or=(...)
SELECT id, code, name_fr, topic.name_fr, subject.code
FROM skills
WHERE code IN ('sma_limit_ops', 'limit_ops', 'sma_asymptotes', 'asymptotes');
```

Result:

| code | id | items count |
|---|---|---|
| `sma_limit_ops` | `33333333-aaaa-0000-0000-000000000003` | **0** |
| `limit_ops` | **(skill row does not exist)** | n/a |
| `sma_asymptotes` | `33333333-aaaa-0000-0000-000000000006` | **0** |
| `asymptotes` | **(skill row does not exist)** | n/a |

### What this means

**Different topology from `limit_calc`.** ADR 0011 §"The skill-attribution
surprise" found that `limit_calc` exists as TWO skill rows — the SMA-prefixed
one (`sma_limit_calc`) with misconceptions but no items, and the unprefixed
legacy one (`limit_calc`) with the 8 SMB-era items but no misconceptions.
The dual-bank pattern documented in architecture.md §5.5.

For `sma_limit_ops` and `sma_asymptotes`, the unprefixed twins **do not
exist at all.** The SMB seed (the legacy `seed_data.sql`) never created
these two skills under the unprefixed naming. Probably because SMB's
content is narrower and didn't cover them — `seed_data.sql`'s math
section has `limit_calc` and `limit_def` but stops short of the
operations + asymptotes detail.

### Consequence for slice 2

**Slice 2 doesn't face the ADR 0011 dual-bank dilemma at all.** There
is exactly one skill row for `sma_limit_ops`; misconceptions and items
both land on the same UUID by construction; no Path A vs Path B
deliberation needed.

**The item bank is empty.** All items for slice 2 will be new (born
misconception-driven). That's the same as slice 1's Path B choice for
`sma_limit_calc`, but here it's the ONLY option, not a chosen
trade-off.

This is **not a blocker** — it's actually the cleanest possible
starting state. Documenting because the user explicitly asked for
surprises to be surfaced, and the absence of a dual-bank twin is a
finding worth recording for future slices. The next time we author for
a skill that DOES have an unprefixed twin (e.g., the SVT-subject
skills, the physics skills used by both SMA and SMB), the bank-topology
check will be substantively different.

### Implication for architecture.md §5.5

The §5.5 bank-topology section currently describes the dual-bank
pattern as if it applies to "every scientific-subject skill". It
doesn't. Some SMA skills (operations on limits, asymptotes, and
plausibly other late-curriculum topics) have no SMB twin and thus
exist only in SMA-prefixed form. This is a documentation gap, not a
schema bug. **Not fixing in this branch** — the slice-2-prep mandate
is no production changes; this is a follow-up documentation edit
once slice 2's migration ships and we learn whether other SMA-only
skills follow the same pattern.

---

## Next steps on this branch

1. pedagogy-auditor authors `backend/seed/misconceptions/sma_limit_ops.json`.
2. bac-curriculum validates the JSON (ID format, cadre fit, French
   integrity) AND re-confirms the topology finding above.
3. Commit the JSON file.

Hard stop after step 3. No encoder, no migration 048, no production
push, no function deploy.
