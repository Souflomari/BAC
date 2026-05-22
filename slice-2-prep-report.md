# slice-2-prep — preparatory-batch report

**Branch (parent):** `slice-2-prep`
**Date:** 2026-05-22
**Status:** all five tasks complete; no production change; ready for review.

This batch was the non-production preparatory work for slice 2
(`sma_limit_ops` items + assurance carry-over) plus the
documentation/audit work that surfaced alongside it. Five tasks ran
against the hard-stop constraints the user set: no `supabase db push`,
no `supabase functions deploy`, no merge to main, no work that needed
a synchronous decision.

---

## TL;DR

- **5 tasks, 5 commits across 5 branches.** All commits review-ready.
- **0 production changes.** No `db push`, no `functions deploy`, no merge.
- **0 hard-stop conditions tripped** (in the "stop and ask" sense). The
  task list included one *expected* skip — pushing branches to `origin` —
  which fell out because no `origin` remote is configured on this clone.
- **1 in-model coverage miss surfaced** by Task 3 (Item 001 distractor
  D=1 should dual-tag M1). Documented in the audit doc; fix is one
  UPDATE statement in slice 4.
- **5 open review questions** in Task 4's design doc require user
  sign-off before migration 049 can be authored.
- **2 documentation gaps closed** — `supabase-architect` got two hard
  rules added on 2026-05-22; architecture §5.5 now reflects three
  topology shapes (was one, framed as universal).

---

## Hard-stop conditions

The user's brief enumerated four hard-stop conditions and a fifth
implicit one (verify-block failure during draft). None of them
triggered:

| # | Hard-stop condition | Triggered? |
|---|---|---|
| 1 | Any production-touching operation needed | No |
| 2 | ADR-0011-class finding (FK-semantic mismatch on a NEW skill) | No — bank topology re-check showed `sma_limit_ops` and `sma_asymptotes` are both single-bank, simpler than `sma_limit_calc` |
| 3 | Bank-topology surprise contradicting slice-2 finding | No — slice 3 (sma_asymptotes) follows the same single-bank shape as slice 2; same is now documented in architecture.md §5.5 |
| 4 | Synchronous decision required mid-task | No — design doc Q's deferred to user (Task 4) |
| 5 | Verify-block failure during draft | n/a — no draft migrations ran |

One scheduled task (push branches to `origin`) was a no-op:

```text
$ git remote -v
$
```

No `origin` is configured on this clone. The five branches exist
locally only. This isn't a hard-stop trip — it's a missing piece of
setup that the user can resolve out-of-band with `git remote add origin <url>`.

---

## Branch map

All branches are local-only. None have been pushed.

```
main
 │
 └─ slice-2-prep                      (parent — TASK 1 lives here)
    │   5c02602  docs(slice-2-prep): two hard rules + UUID allocation registry
    │   b62a59e  draft(slice-2): sma_limit_ops misconceptions + skill-choice doc
    │   4c51b1c  fix(slice-2): move M2 secondary-distractor note out of distractor_rationale  [TASK 1]
    │
    ├─ slice-2-prep--sma-asymptotes-draft         [TASK 2]
    │   ac1128b  draft(slice-3): sma_asymptotes misconceptions + skill-context note
    │
    ├─ slice-2-prep--sma-limit-calc-dual-tagging-audit  [TASK 3]
    │   f9450f8  audit(slice-2-prep): retrospective dual-tagging audit on sma_limit_calc items
    │
    ├─ slice-2-prep--migration-049-design         [TASK 4]
    │   bcdb459  design(slice-2-prep): migration 049 — sma_limit_ops items
    │
    └─ slice-2-prep--architecture-5.5-cleanup     [TASK 5]
        03671f3  docs(architecture): §5.5 dual-bank framing — per-skill, three shapes (not universal)
```

### Branch-naming note (small finding)

The user's brief suggested naming sub-branches `slice-2-prep/sma-asymptotes-draft`
etc. Git rejects this on Windows when a branch named `slice-2-prep`
already exists, because Git cannot have both a ref at
`refs/heads/slice-2-prep` (a file) and a ref under
`refs/heads/slice-2-prep/...` (a directory). The first
`git checkout -b slice-2-prep/sma-asymptotes-draft` failed:

```text
fatal: cannot lock ref 'refs/heads/slice-2-prep/sma-asymptotes-draft':
'refs/heads/slice-2-prep' exists; cannot create
'refs/heads/slice-2-prep/sma-asymptotes-draft'
```

Worked around with a double-dash separator (`slice-2-prep--sma-asymptotes-draft`).
For future slices: either use double-dash, or change the parent
branch name to something with a trailing suffix
(`slice-2-prep-root`) and keep sub-branches at `slice-2-prep/...`.

---

## Task 1 — M2 rationale-field overflow fix

**Branch:** `slice-2-prep` (parent, no sub-branch — this is a one-line
cleanup, not a logically separate workstream).
**Commit:** `4c51b1c`.
**File:** `backend/seed/misconceptions/sma_limit_ops.json` (1 line changed).

The M2 entry's `distractor_rationale` had a sentence pointing the
encoder/step-3 tagger at a secondary distractor — content that
belongs in the `close_to_the_line` array, not in the distractor's
own rationale. Moved it out.

While moving it, also fixed a latent labeling slip: the moved sentence
referenced `M1`/`M2` by positional label, which would have rotted if
the encoder re-ordered the misconceptions. Replaced with semantic
names — `somme-limites-inexistantes`, `produit-zero-infini` — so the
text is robust to ordering.

`close_to_the_line` for B + C already carries the dual-tagging
recommendation; no addition needed there.

**No production change.** The JSON file is encoder-input, not a
runtime artifact. Mig 045 (which ships misconceptions to production)
has not yet been written for `sma_limit_ops`.

---

## Task 2 — sma_asymptotes misconception draft (slice 3 prep)

**Branch:** `slice-2-prep--sma-asymptotes-draft`.
**Commit:** `ac1128b`.
**Files:**

- `backend/seed/misconceptions/sma_asymptotes.json` — 4 misconceptions.
- `backend/seed/misconceptions/_slice_3_skill_choice.md` — context
  note documenting the choice, the bank-topology re-check, and the
  resulting finding.

### What was drafted

Four misconceptions on `sma_asymptotes`, all with literature anchors
in the ADR 0009 corpus:

| ID | Short label | Anchor |
|---|---|---|
| M1 | `mc.sma.sma_asymptotes.limite-infinie-sans-asymptote` | Sierpinska 1987; Bac SMA 2022 |
| M2 | `mc.sma.sma_asymptotes.comportement-symetrique-plus-moins-infini` | Stem uses √(x²+1); diagnostic-inertness warning carried into close_to_the_line |
| M3 | `mc.sma.sma_asymptotes.asymptote-jamais-traversee` | Tall & Vinner 1981; Naidoo & Naidoo 2007 |
| M4 | `mc.sma.sma_asymptotes.branche-parabolique-confondue` | Sierpinska 1987; Bac SMA 2022 |

One candidate (`asymptote-oblique-pente-seule`) was cut for failing
criterion (a) of the misconception-selection rubric (the
distinguishing-stem cannot be authored without telegraphing the
correct answer through the stem itself).

### Bank-topology re-check (the slice-3 finding)

bac-curriculum re-confirmed (as the user requested) that the bank
topology for `sma_asymptotes` matches slice 2's: only the
SMA-prefixed row exists; there is no unprefixed `asymptotes` twin.

However the *reason* differs from slice 2. For `sma_limit_ops`, SMB
has no analogous skill at all — the topic is folded into
`limit_calc`-as-calculation-mechanics. For `sma_asymptotes`, SMB
*does* treat asymptotes, but folds them into a wider "étude de
fonctions" skill. There is no twin row not because the topic is
absent from SMB but because SMB doesn't name it as a separate
objective.

This is **Shape C** in the §5.5 taxonomy (slice 2 was Shape B). Both
yield single-bank topology for our purposes (Task 5 documents the
distinction).

### Agent review

- pedagogy-auditor authored.
- bac-curriculum validated six axes (cadre fit, ID format, French
  integrity, distinguishing-stem viability, anchor accuracy, close-to-the-line
  noise) and returned **SHIP**.

### Hard stop honoured

No encoder run, no migration 050, no production push, no function
deploy.

---

## Task 3 — retrospective dual-tagging audit on sma_limit_calc items

**Branch:** `slice-2-prep--sma-limit-calc-dual-tagging-audit`.
**Commit:** `f9450f8`.
**File:** `docs/audits/sma-limit-calc-items-dual-tagging.md` (466 lines).

### The question asked

ADR 0011's Path B chose to author 4 new MCQ items (migration 046)
that primary-tag a single misconception each. ADR 0012 added the
dual-tagging discipline retroactively. The audit ran the cross-
contamination check against the migration-046 items as they actually
shipped, not as they were planned, to confirm the discipline was
applied consistently.

### Audit shape — 4 × 4 matrix

For each item (1–4) and each non-target misconception (M1–M4 minus
the item's primary), I read both the stem and the three distractors,
and judged: does the distractor align with the non-target
misconception's signature? "Aligned" = an additional tag is warranted;
"clean" = the distractor doesn't reach.

Coverage check across 16 (item × non-target-misconception) cells:

- 15 cells: clean (no extra tag warranted).
- 1 cell: in-model miss. **Item 001, distractor D=1, vs M1's "n/n=1"
  variant of `forme-indeterminee-valeur-nulle`.** The "0/0 = 1"
  variant is in M1's stated variant list (sma_limit_calc.json M1
  `secondary_variants[1]`), and D=1 is exactly that signature, but
  the item shipped without a secondary M1 tag.

### Finding consolidated

- **No leaks** (no out-of-skill distractors silently tagging an
  unrelated misconception).
- **No false positives** (no misconception tagged on a distractor that
  doesn't carry the signature).
- **1 in-model coverage miss** (Item 001 / D=1 needs `mc.sma.sma_limit_calc.forme-indeterminee-valeur-nulle`
  as a secondary tag in `meta.misconception_secondary`).

### Slice-4 implication

Single UPDATE migration:

```sql
UPDATE public.items
SET meta = jsonb_set(meta, '{misconception_secondary}',
                     (meta->'misconception_secondary')
                     || '"mc.sma.sma_limit_calc.forme-indeterminee-valeur-nulle"'::jsonb)
WHERE id = '44444444-aaaa-0001-0000-001';
```

Verify-block must include a cardinality assertion (per the
`supabase-architect` hard rule added in commit 5c02602) and a check
that the secondary tag's value is unchanged for the other three items.

**No migration written in this batch.** The audit identifies the
miss; the fix is slice 4 scope.

---

## Task 4 — migration 049 design doc

**Branch:** `slice-2-prep--migration-049-design`.
**Commit:** `bcdb459`.
**File:** `docs/designs/migration-049-sma-limit-ops-items.md` (365 lines).

### Scope of the design

The document is a complete pre-authoring design, not the SQL. It
covers:

1. **Items to author.** 2 MCQs on `sma_limit_ops` at UUIDs
   `44444444-aaaa-0002-0000-001` and `44444444-aaaa-0002-0000-002`.
   Reserved range matches §5.6 UUID allocation registry, no
   collision against mig 018 or mig 046.
2. **Dual-tagging plan.** Item 001 primary-tags M1
   (`somme-limites-inexistantes`); distractors A + D dual-tag for the
   stated variants. Item 002 primary-tags M2 (`produit-zero-infini`);
   distractors B + C dual-tag.
3. **Cross-contamination check.** Six (3 distractor × 2 non-target
   misconception) cells inspected by hand. Item 001 distractor C
   ("lim cos x→0 so the sum = 1") and Item 002 distractor D
   ("0 because one factor → 0") are the two most-likely-contaminated
   cells; both are clean — neither reaches the other misconception's
   reasoning.
4. **Verify-block contract.** Ten assertions enumerated (6a–6j),
   including:
   - 6a cardinality (`expected 2 new MCQ items, got 2`)
   - 6b FK round-trip — the misconception IDs cited by the new items
     resolve to existing `misconceptions.id` rows
   - 6h encoder-migration ordering — migration 045 (misconceptions)
     must have run before 049 (items); the verify block reads
     `supabase_migrations.schema_migrations` to confirm
5. **Registry-update shape post-migration.** The §5.6 UUID range
   reservation collapses from "reserved" to "used"; the doc shows the
   one-line architecture.md edit.

### Open review questions for the user

The design intentionally **defers** five decisions the user must sign
off on before authoring:

1. **Stem language register** — register the stems should hit (formal
   "soient f et g…" vs the more student-friendly "Calculer la
   limite suivante…"). Migration 046 used the formal form; design
   doc recommends staying consistent but flags it for explicit
   confirmation.
2. **Difficulty band** — the SMA 2019 + 2021 Bac items that anchored
   the misconceptions are tier-1 (entrance-of-exercise warm-ups).
   Confirm tier-1 for both new items.
3. **The "no-asymptote-style" stem for M2** — M2's signature
   (`produit-zero-infini`) is famously coincident with the
   asymptote-side limit at x → 0+ of x·(1/x). The design proposes
   `lim x · sin(1/x)` (Bac SMA 2021 reuse) as the cleanest stem;
   confirm that's acceptable rather than a fresh one.
4. **Whether to ship 048 (misconceptions) and 049 (items) as
   sequential migrations or one combined.** Mig 045 set the pattern
   of "misconceptions then items" as two migrations. Design defers
   to user preference.
5. **PR-shape preference** — one PR for slice 2 (047 RPC was already
   merged), one PR per slice, or one umbrella PR. Design doesn't
   prescribe.

### Hard stop honoured

No SQL written, no migration file, no encoder run.

---

## Task 5 — architecture.md §5.5 cleanup

**Branch:** `slice-2-prep--architecture-5.5-cleanup`.
**Commit:** `03671f3`.
**File:** `docs/grounding/architecture.md` (169 insertions, 68 deletions).

### What was wrong

§5.5 was framed: *"For every scientific-subject skill, the seed flow
produced two skill rows."* It was true for `limit_calc`. It is not
true for `sma_limit_ops` (slice 2 finding) or `sma_asymptotes`
(slice 3 finding). The framing was a structural over-generalization
from a single example.

### What replaced it

A three-shape taxonomy, one shape per skill:

| Shape | Description | Example | Twin exists? |
|---|---|---|---|
| **A** | Legacy SMB row + SMA-prefixed row | `limit_calc` / `sma_limit_calc` | Yes |
| **B** | SMA-only — SMB genuinely omits the skill | `sma_limit_ops` | No |
| **C** | SMA-only — SMB folds the topic into a broader skill | `sma_asymptotes` | No |

Each shape gets per-shape operational rules. The "how to tell which
row you're on" query is rewritten to return examples of all three.
The naïve-query failure mode (the diagnostic-state-mismatch ADR 0011
caught) is preserved verbatim and now scoped explicitly to Shape A.

A full per-skill shape enumeration (one shape label per row across
the ~150 scientific-subject skills) is flagged as a downstream
content-audit task, not in scope for this revision.

### Why this edit, not a separate ADR

The §5.5 framing is structural documentation, not a policy decision.
The slice-2 + slice-3 findings clarified the structural reality; they
didn't change it. An ADR (cf. 0011, 0012, 0013) would suggest a
policy change. The fix here is a documentation correction.

---

## Consolidated findings

1. **Bank topology is per-skill, three shapes** (Task 5). Future
   slices targeting a new skill should run the §5.5 `SELECT id, code`
   query first; the answer determines whether ADR 0011's Path A vs
   Path B deliberation applies (Shape A) or is mooted (Shapes B + C).

2. **`sma_limit_ops` is Shape B** (Task 2). Single-bank topology, no
   dual-attribution decision needed. Item bank empty (slice 2 ships
   the first 2 items via mig 049).

3. **`sma_asymptotes` is Shape C** (Task 2 — slice 3 prep). Single-bank
   topology, no dual-attribution. Item bank empty (slice 3 will ship
   items, design not yet written).

4. **Item 001 distractor D=1 is a coverage miss** (Task 3). In-model
   gap — the variant is in M1's `secondary_variants` but the
   migration-046 author didn't pick it up. One UPDATE statement
   closes it; slice 4 scope.

5. **No `origin` remote configured** on this clone. Pushing branches
   is blocked until the user wires up a remote. Not a hard-stop trip
   (it was an expected-conditional step).

6. **Git nested branch naming** — `slice-2-prep/sub-branch` doesn't
   work on Windows when `slice-2-prep` already exists. Use `--`
   double-dash for now; consider a `*-root` suffix for the parent
   branch on future multi-task batches.

---

## Synchronous decisions deferred to user

Listed in the order they'd unblock work:

1. **The five Task-4 design-doc questions** (stem register; tier;
   M2 stem choice; one-vs-two migrations; PR shape). Unblocks slice 2
   migrations 048 + 049 + assurance-mechanism runs.
2. **Whether to fold the Task 3 miss into slice 4 or treat it as a
   hotfix slice.** Slice 4 hasn't been scoped yet; the user's earlier
   plan was vague on whether slice 4 is more items or schema cleanup.
3. **`origin` remote setup.** Trivial; out-of-band.
4. **Per-skill shape enumeration** — when to schedule the
   content-audit task that fills out §5.5's missing per-skill shape
   table. Not urgent; the three documented examples cover current
   authoring.

---

## What's safe to do on return without user input

- **Read** every branch listed above. Nothing depends on follow-up
  state.
- **Cherry-pick** any subset of the five commits onto `main` if the
  user wants to land individual pieces (Task 1, Task 3, Task 5 are
  all merge-clean atomic improvements). Tasks 2 and 4 are drafts
  pending decisions and should not land yet.
- **Run `git remote add origin <url>`** to enable pushing.

## What needs user input before next move

- Answers to the five Task-4 design-doc questions.
- Sign-off on the §5.5 three-shape framing as the working documentation
  baseline for future slices.
- Decision on whether to merge sub-branches in any specific order, or
  rebase them onto one another before merging.

---

## Path back to production

A possible sequence, presented as a reference, not a recommendation:

1. **Merge Task 1, 3, 5 to `slice-2-prep` (or directly to `main`)** —
   these are atomic, no further decisions needed.
2. **Answer the five Task-4 questions** (the design doc has them
   enumerated in a clearly-labelled section at the end).
3. **Author migration 048** (sma_limit_ops misconceptions via the
   encoder) on `slice-2-prep`. Branch-test.
4. **Author migration 049** (sma_limit_ops items) per the design doc.
   Branch-test, including the encoder-ordering check in the verify
   block (§6h).
5. **Update §5.6 UUID registry** to mark `…-aaaa-0002-0000-*` as
   "used" (slot for the one-line edit in design doc §7).
6. **Push to staging**, run the assurance scripts (branch-test v2.1
   + edge-function smoke test), then prod.
7. **Slice 3** (`sma_asymptotes` items) follows the same pattern;
   draft already lives on `slice-2-prep--sma-asymptotes-draft`.

No part of this sequence runs in the slice-2-prep batch.

---

## Commit summary by date

| Date | Hash | Branch | Subject |
|---|---|---|---|
| 2026-05-22 | 5c02602 | slice-2-prep | docs: two hard rules + UUID allocation registry (Task 1 precursor) |
| 2026-05-22 | b62a59e | slice-2-prep | draft: sma_limit_ops misconceptions + skill-choice doc (Task 1 precursor) |
| 2026-05-22 | 4c51b1c | slice-2-prep | fix: move M2 secondary-distractor note out of distractor_rationale **[Task 1]** |
| 2026-05-22 | ac1128b | slice-2-prep--sma-asymptotes-draft | draft: sma_asymptotes misconceptions + skill-context note **[Task 2]** |
| 2026-05-22 | f9450f8 | slice-2-prep--sma-limit-calc-dual-tagging-audit | audit: retrospective dual-tagging audit **[Task 3]** |
| 2026-05-22 | bcdb459 | slice-2-prep--migration-049-design | design: migration 049 — sma_limit_ops items **[Task 4]** |
| 2026-05-22 | 03671f3 | slice-2-prep--architecture-5.5-cleanup | docs: §5.5 dual-bank framing — per-skill, three shapes **[Task 5]** |

All five tasks: complete.
All hard stops: honoured.
Branches: local-only, awaiting review.
