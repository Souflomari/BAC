# Cross-Contamination Audit — Migration 046 Distractor Tagging
## `sma_limit_calc` — Misconception-Driven Items, Slice 1

**Purpose.** ADR 0011 §"Path B" requires that every non-target distractor on a
misconception-driven item must not surface another misconception in the M1–M4
set. The original cross-contamination check was performed during item authoring
and is recorded in ADR 0012 §"Cross-contamination verification". This document
is a *retrospective, cell-by-cell audit* of every untagged distractor, applying
the dual-tagging test established as the intent behind that check: for each
untagged distractor, does the reasoning of any M1–M4 misconception model lead a
student to select it on that stem? If yes, the distractor should carry a tag for
that second misconception (dual-tagging), and the diagnostic interpretation of
the item is currently incomplete.

This audit covers the 4 items shipped by migration 046 and the 4 misconceptions
defined in `backend/seed/misconceptions/sma_limit_calc.json`.

---

## 1. Reference Data

### Items (migration 046, verbatim)

| Item | Stem | Choices [A, B, C, D] | Correct | Tagged distractors |
|------|------|----------------------|---------|-------------------|
| 001 | `lim(x→2) (x²−4)/(x−2)` | 4, 0, "la limite n'existe pas", 1 | A=4 | B tagged M1 (primary), C tagged M1 (secondary) |
| 002 | `f(x)=x+3 (x≠1), f(1)=7; lim(x→1) f(x)` | 4, 7, 1, "la limite n'existe pas" | A=4 | B tagged M2 (primary) |
| 003 | `lim(x→+∞) (x² − x)` | +∞, 0, −∞, 1 | A=+∞ | B tagged M3 (primary) |
| 004 | `lim(x→0) sin(x²)/x` | 0, 1, 2, +∞ | A=0 | B tagged M4 (variant), C tagged M4 (primary) |

### Misconceptions

| ID | Label (short) | Core wrong model | Trigger form | Primary distractor signature |
|----|---------------|-----------------|--------------|------------------------------|
| M1 | forme-indeterminee-valeur-nulle | "0/0 = 0 (or 1, or n'existe pas)" | 0/0 form on direct substitution | Returns 0; secondary: "n'existe pas" |
| M2 | limite-egale-valeur-point | "lim at a = f(a)" | Piecewise / discontinuous f where f(a) is defined and ≠ limit | Returns f(a) |
| M3 | infini-moins-infini-nul | "∞ − ∞ = 0" | Polynomial or radical sum at ±∞ yielding ∞ − ∞ form | Returns 0 |
| M4 | limite-fondamentale-linearite | "sin(ax)/x = a by linearity" | sin-based limit with non-matching argument and denominator | Primary: treats exponent/coefficient as linear scalar; Variant: sin/x = 1 always |

### Untagged distractors — audit scope (11 cells)

| Cell | Item | Choice | Value |
|------|------|--------|-------|
| U1 | 001 | D | 1 |
| U2 | 002 | C | 1 |
| U3 | 002 | D | "la limite n'existe pas" |
| U4 | 003 | C | −∞ |
| U5 | 003 | D | 1 |
| U6 | 004 | D | +∞ |

Note: The task statement lists 11 untagged distractors but after correcting the
item structure from the migration source the unique untagged cells are 6 (the
11 figure in the brief counts each (item × misconception) non-target cell, i.e.
the off-diagonal cells of the 4×4 matrix where the cell is also untagged; the
6 unique distractor letters collapse those). The per-letter walkthrough covers
the 6 unique letters; the 4×4 matrix covers the 16 cells (4 target + 12
non-target). All 12 non-target × untagged cells are accounted for — several
untagged letters appear in multiple matrix rows.

---

## 2. The 4×4 Matrix

Rows = items (stem they test); Columns = misconceptions M1–M4.
Cell format: **[letter(s)] — verdict**
- **target** = the cell the item was authored to diagnose.
- **clean** = the untagged distractor does not coincide with any output this
  misconception model produces on this stem.
- **coincident** = the misconception model produces this answer on this stem;
  distractor should be dual-tagged.
- **uncertain** = reasoning path cannot be cleanly resolved; see walkthrough.

|  | M1 forme-indeterminee-valeur-nulle | M2 limite-egale-valeur-point | M3 infini-moins-infini-nul | M4 limite-fondamentale-linearite |
|---|---|---|---|---|
| **Item 001** `lim(x→2) (x²−4)/(x−2)` | **[B, C] — target** | [A=4 correct, D=1 untagged] — **clean** (M2 fires only on piecewise/defined-at-point forms; no finite-point definition given here) | [D=1 untagged] — **clean** (no ∞ − ∞ form; M3 trigger condition absent) | [D=1 untagged] — **clean** (no trig; M4 trigger condition absent) |
| **Item 002** `f(1)=7, lim(x→1)` | [C=1 untagged, D="n'existe pas" untagged] — see U2, U3 below | **[B=7] — target** | [C=1 untagged, D="n'existe pas" untagged] — **clean** (no ∞ − ∞ form) | [C=1 untagged, D="n'existe pas" untagged] — **clean** (no trig) |
| **Item 003** `lim(x→+∞) (x²−x)` | [C=−∞ untagged, D=1 untagged] — **clean** (no 0/0 form; direct substitution of +∞ yields ∞ − ∞, not 0/0) | [C=−∞ untagged, D=1 untagged] — **clean** (no piecewise / finite-point definition) | **[B=0] — target** | [C=−∞ untagged, D=1 untagged] — **clean** (no trig) |
| **Item 004** `lim(x→0) sin(x²)/x` | [D=+∞ untagged] — see U6 below | [D=+∞ untagged] — **clean** (M2 fires only on piecewise/defined-at-point forms; f(0)=sin(0)/0 is undefined, not a clean f(a) value; M2 gives no output here) | [D=+∞ untagged] — **clean** (no ∞ − ∞ form) | **[B=1 (variant), C=2 (primary)] — target** |

**Summary before walkthrough:** The matrix contains no "coincident" verdicts in
the initial pass. Three cells require detailed walkthrough to justify the
verdict: U2 (Item 002 C=1 vs M1), U3 (Item 002 D="n'existe pas" vs M1), and
U6 (Item 004 D=+∞ vs M1). The remaining cells are clean by rapid inspection
(trigger condition for M2/M3/M4 absent on that stem). The walkthrough below
provides the full chain for all 6 untagged letters.

---

## 3. Per-Letter Walkthrough

The operative question for each cell: **does the reasoning of misconception Mk
cause a student to select this distractor on this stem?** A verdict of "clean"
requires naming the procedural error that does generate the distractor, and
confirming that error is not part of any M1–M4 reasoning model.

---

### U1 — Item 001, D = 1

**Stem.** `lim(x→2) (x²−4)/(x−2)`. Choices: A=4 (correct), B=0, C="n'existe
pas", D=1.

**Which procedural error produces D=1?**

The student substitutes x=2 to get 0/0, then — instead of treating 0/0 as zero
(M1's primary) or as undefined (M1's secondary) — incorrectly tries to resolve
it as 0/0 = 1 by analogy with "anything divided by itself equals 1". This is
within the M1 model's description: M1 states the student treats 0/0 as a fixed
value that is "généralement 0, ou 1, ou « n'existe pas »". The seed JSON for
M1 explicitly lists "ou 1" as a variant output of the same model.

**Is this M1?**

Yes — M1's description says "L'élève croit qu'une expression de la forme 0/0 a
une valeur fixe et déterminée — généralement 0, ou 1, ou « n'existe pas »". D=1
is the "ou 1" branch of M1's same wrong model. The model variant ("0/0 = 1")
differs from the primary ("0/0 = 0", choice B) only in which fixed value the
student assigns, not in the underlying wrong-model structure (treating 0/0 as
arithmetically evaluable without lifting the indeterminate form).

The distinguishing_mcq_stem rationale for M1 notes: "B est le déclencheur
primaire" and that C is "une variante secondaire du même modèle". The same
argument applies to D=1: it is a third surface variant of the same M1 model
(0/0 interpreted as the value 1). It is not tagged because ADR 0011 Path B
authoring notes describe B as the primary trigger and C as the secondary — D
was treated as a "plausible-procedural distractor". However, the M1 description
in the seed JSON explicitly mentions "ou 1" as part of M1's wrong-model
definition.

**Verdict: COINCIDENT.** A student running M1's "0/0 = a fixed value"
reasoning arrives at D=1 via the "0/0 = 1" sub-variant. This sub-variant is
within the M1 model as authored (not a separate untracked misconception). The
distractor should carry a dual tag for M1. If a student selects D=1 on Item
001, the current system writes no misconception tag — the M1 signal is lost.

---

### U2 — Item 002, C = 1

**Stem.** Piecewise f: f(x)=x+3 for x≠1, f(1)=7. `lim(x→1) f(x)`.
Choices: A=4 (correct), B=7, C=1, D="la limite n'existe pas".

**Which procedural error produces C=1?**

The student confuses the limit point with the limit value: "since I'm taking
the limit as x approaches 1, the answer must be 1." This is a surface
confusion between the input value (x→1) and the output value (lim f(x)). It
is not a substitution-into-function error — the student isn't computing f(1).
They are confusing the label of the limit point (1) with the result of the
limit.

**Does any M1–M4 model produce C=1 on this stem?**

- **M1 (0/0).** No 0/0 form on this stem. The function is f(x)=x+3 near 1;
  substituting x=1 into x+3 gives 4 directly, no indeterminate form. M1 does
  not fire.
- **M2 (lim = f(a)).** M2 produces B=7 (f(1)=7). M2 does not produce C=1
  because f(1) is explicitly given as 7, not as 1. The limit-point-value
  confusion is structurally different from M2: M2 conflates lim with the
  function's defined value at the point; C=1 conflates the limit with the
  coordinate of the point itself. These are distinct errors. Notably, M2 is
  already tagged on B; a student who both holds M2 and also confuses point-
  coordinate with limit would still select B first, not C.
- **M3 (∞−∞).** No ∞ form. Does not fire.
- **M4 (sin linearity).** No trig. Does not fire.

**Is the point-coordinate confusion a named misconception in the set?**

No. The "limit = the x-value you're approaching" confusion is not M2 (which
is about confusing lim with f(a)) and is not M1/M3/M4. It is a conceptual
confusion about what a limit's output represents, distinct from all four
tracked models. It would merit its own misconception entry if it proved
common, but it is not currently in the set.

**Verdict: CLEAN.** C=1 is produced by a plausible input-output confusion
("the limit as x→1 must be 1") that no M1–M4 model generates. The procedural
error is distinct from M2: M2 maps lim→f(a)=7; the point-coordinate error maps
lim→a=1. No dual tag needed.

---

### U3 — Item 002, D = "la limite n'existe pas"

**Stem.** Piecewise f: f(x)=x+3 for x≠1, f(1)=7. `lim(x→1) f(x)`.

This is the cell specifically flagged in the brief for careful analysis:
ADR 0012 §"M4 blind-spot" noted that 0/0 stems may surface M1's secondary
signature ("n'existe pas"). Item 002's stem has no 0/0 form. The question is
whether any M1–M4 model leads a student to "n'existe pas" here via a different
path.

**Does any M1–M4 model produce D="n'existe pas" on this stem?**

- **M1 (0/0).** M1's secondary signature is triggered specifically by a 0/0
  form: the student substitutes, obtains 0/0, and concludes "0/0 is undefined,
  so the limit doesn't exist." On Item 002's stem, substituting x=1 into x+3
  gives 4 — there is no indeterminate form. M1's trigger condition (obtaining
  0/0 on direct substitution) is absent. A student holding M1 on this stem
  would compute f(1)=4 directly (from x+3 at x=1) or perhaps notice f(1)=7
  and fall into M2. Neither path produces "n'existe pas" via M1's mechanism.

  Could a student mis-apply M1 here by noticing that f is piecewise and
  treating the two-branch definition as producing a "contradiction"? This would
  be a continuity-confusion model: "the function has two different values at
  x=1 (the limit says 4, the definition says 7), so the limit doesn't exist."
  This is a meaningful student error, but it is not M1's model. M1 is
  specifically about treating 0/0 as a determinate value — it requires the
  student to encounter a 0/0 form. A piecewise-discontinuity path to "n'existe
  pas" is a different sub-model (call it "continuity-discontinuity implies
  non-existence of the limit"), which is not part of M1, M2, M3, or M4 as
  authored.

- **M2 (lim = f(a)).** M2 produces B=7 (returns f(1)). M2 does not produce
  "n'existe pas" — the model commits to a specific value. If a student holds
  M2, they select B, not D.

- **M3 (∞−∞).** No ∞ form. Does not fire.

- **M4 (sin linearity).** No trig. Does not fire.

**What procedural error produces D="n'existe pas" here?**

The most plausible route: the student observes that f is defined differently at
x=1 (value=7) versus near x=1 (value approaching 4), notices the "mismatch",
and concludes that the limit "cannot exist" because the function is
discontinuous at x=1. This is a continuity-confusion model: confusing the
existence of a limit with the requirement for continuity ("if f is not
continuous at a, the limit does not exist"). This is a common and documented
student error in its own right (it is the complement of M2 — M2 ignores
discontinuity; this model over-applies discontinuity), but it is not any of
M1–M4. The migration comment on Item 002 names this: "D='n'existe pas' (a
continuité-confusion misconception NOT in M1-M4)."

**Verdict: CLEAN.** No M1–M4 model produces D="n'existe pas" on this stem.
The path to this distractor is a continuity-confusion sub-model not currently
tracked. No dual tag needed. The migration comment is accurate.

---

### U4 — Item 003, C = −∞

**Stem.** `lim(x→+∞) (x² − x)`. Choices: A=+∞ (correct), B=0, C=−∞, D=1.

**Which procedural error produces C=−∞?**

A student who correctly factors to x(x−1) but then makes a sign error:
applying the factored form x(x−1) and incorrectly evaluating (x−1) as
tending to −∞ at x→+∞ (perhaps through a sign flip on the subtraction), then
computing (+∞)·(−∞) = −∞. Alternatively, a student who does not factor and
instead tries to evaluate x²−x by "dominating term" logic but incorrectly
takes the sign of the −x term as governing at ∞, concluding the expression
goes to −∞. Both routes involve sign-handling errors in polynomial evaluation
at infinity, not a wrong model about the nature of limits.

**Does any M1–M4 model produce C=−∞ on this stem?**

- **M1 (0/0).** The stem is evaluated at x→+∞, not a finite point. Direct
  substitution of +∞ yields ∞²−∞, which is ∞−∞, not 0/0. M1's trigger
  requires a 0/0 form. Absent here. M1 cannot produce C=−∞.

- **M2 (lim = f(a)).** The limit is at +∞, which is not a point where f is
  defined. M2 requires a finite point a where f(a) exists. f(+∞) is not
  defined. M2 does not fire. Cannot produce C=−∞.

- **M3 (∞−∞).** M3's model is "∞−∞=0". The output of M3 on this stem is
  B=0, which is already tagged. M3 does not produce C=−∞ — a student
  holding M3 stops at "∞−∞=0" and picks B. They do not arrive at −∞
  because the model's claim is that the subtraction annihilates. C=−∞
  requires recognising that one term grows without bound in the negative
  direction, which is incompatible with M3's "they cancel" model.

- **M4 (sin linearity).** No trig. Does not fire.

**The sign error is a procedural error, not a named misconception.** A student
who factors correctly but then misattributes the sign of (x−1) at +∞ is making
an arithmetic slip in limit evaluation, not operating from a wrong model about
what limits are. "Sign error on polynomial evaluation at infinity" is not
described in any of the four misconception models.

**Verdict: CLEAN.** C=−∞ is produced by a sign-handling procedural error on
polynomial evaluation at infinity, which no M1–M4 model generates. No M1–M4
reasoning path lands on −∞ on this stem.

---

### U5 — Item 003, D = 1

**Stem.** `lim(x→+∞) (x² − x)`. Choices: A=+∞ (correct), B=0, C=−∞, D=1.

**Which procedural error produces D=1?**

A student who applies a "ratio of leading coefficients" heuristic incorrectly
to a difference rather than a quotient: in rational function limits at infinity
the answer is the ratio of leading coefficients; for x²−x the student reads the
leading coefficients as both 1 and concludes the limit is 1/1 = 1. This
confuses the heuristic for lim f(x)/g(x) (appropriate for rational functions)
with an expression that is a difference, not a quotient.

**Does any M1–M4 model produce D=1 on this stem?**

- **M1 (0/0).** No 0/0 form. M1 does not fire. Cannot produce 1.

- **M2 (lim = f(a)).** No finite point a with f(a) defined. M2 does not fire.
  The student can't produce f(+∞)=1 because f is not defined at +∞.

- **M3 (∞−∞).** M3 produces 0, not 1. The model says "∞−∞=0"; it does not
  produce 1. A student running M3 picks B. M3 does not produce D=1.

- **M4 (sin linearity).** No trig. Does not fire.

**Is the leading-coefficient heuristic misapplication a named misconception?**

No. It is a scope-overextension of a valid rule for rational functions,
misapplied to a polynomial difference. It is not described in any of M1–M4. It
is a procedural error.

**Verdict: CLEAN.** D=1 on Item 003 is produced by a leading-coefficient
heuristic misapplied to a polynomial difference, which no M1–M4 model
generates. No dual tag needed.

---

### U6 — Item 004, D = +∞

**Stem.** `lim(x→0) sin(x²)/x`. Choices: A=0 (correct), B=1, C=2, D=+∞.

This cell was specifically flagged in ADR 0012's cadre note: the D=+∞ choice
was a deliberate swap away from the seed JSON's D="la limite n'existe pas",
because "n'existe pas" on a 0/0-form stem would surface M1 and contaminate the
diagnosis. The question is whether +∞ itself surfaces a different M1–M4 model.

**Which student reasoning produces D=+∞?**

The migration comment specifies the intended path: "student misreads sin(x²) as
bounded, focuses on 1/x growth." More precisely: a student who does not
recognise sin(x²)/x as having a structured form, treats sin(x²) as an
upper-bounded function (|sin(x²)| ≤ 1), and then looks at the 1/x factor,
concluding that as x→0 the factor 1/x→+∞ dominates, making the whole
expression blow up to +∞. The error is treating sin(x²) as if it were a
positive constant, ignoring that sin(x²)→0 at x=0 in a way that cancels the
1/x divergence.

**Does any M1–M4 model produce D=+∞ on this stem?**

- **M1 (0/0).** M1's trigger condition is present: substituting x=0 gives
  sin(0)/0 = 0/0. M1's outputs are: 0 (primary, which happens to be the
  correct answer), "n'existe pas" (secondary). M1 does not produce +∞ — the
  model concludes from 0/0 either "the value is 0" or "it doesn't exist", not
  "it diverges". The divergence path requires reasoning about 1/x → +∞, which
  is incompatible with M1's "0/0 is a fixed value" model: a student who assigns
  0/0 a fixed value has already stopped before looking at the 1/x growth. A
  student who gets to the 1/x growth argument has already departed from M1's
  reasoning path.

- **M2 (lim = f(a)).** f(0) = sin(0)/0 = 0/0, which is undefined. M2 requires
  f(a) to be defined and to be mistakenly returned as the limit. f(0) is not
  defined here, so M2 produces no output. Cannot produce +∞.

- **M3 (∞−∞).** No ∞−∞ form at x=0. M3 does not fire.

- **M4 (sin linearity).** M4 produces B=1 ("sin/x = 1 always") and C=2 ("the
  exponent 2 passes as a coefficient"). Both tagged. M4's reasoning path says
  "I will apply the sin(u)/u = 1 rule, possibly misidentifying u". Neither
  variant of M4 produces +∞: M4 is specifically about misapplying the
  fundamental limit to get a finite numerical answer, not about divergence. A
  student running M4 picks a finite value (1 or 2). They do not arrive at +∞
  because M4's reasoning is "the limit is a specific finite constant by the
  trig limit rule."

**Could any combination of M1–M4 produce +∞?**

No. None of the four models generate a divergence conclusion on this stem.
The +∞ answer requires the specific reasoning "1/x dominates; sin(x²) acts
like a bounded constant", which is a magnitude-estimation error about the
relative growth rates of sin(x²) and x as x→0. This error is not part of any
M1–M4 model.

**Verdict: CLEAN.** D=+∞ is produced by a magnitude-estimation error
("1/x divergence dominates; sin(x²) is bounded") that no M1–M4 model
generates. The swap from "n'existe pas" to "+∞" successfully avoided
contamination, and +∞ itself introduces no new coincident path. The ADR 0012
cadre note's claim is confirmed.

---

## 4. Fix List

**U1 — Item 001, D=1 — COINCIDENT: requires dual tag.**

Item 001 D=1 is within the M1 model as authored. The M1 seed JSON explicitly
states the model produces "généralement 0, ou 1, ou « n'existe pas »". The
current `distractor_misconceptions` for Item 001 tags indices "1" (B=0) and
"2" (C="n'existe pas") as M1, but does not tag index "3" (D=1).

Proposed fix: Add `"3": "mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle"` to Item 001's `distractor_misconceptions`.

Justification: D=1 is the "0/0 = 1" sub-variant of M1 (treating 0/0 as if
dividing by itself gives 1, by analogy with n/n = 1 for n ≠ 0). The model
description covers it. Without the tag, a student who picks D=1 on Item 001
fires no diagnostic signal, and the exhibited_count for M1 is not incremented
despite the student demonstrating M1's reasoning. The diagnostic miss is
precisely the failure mode ADR 0011's tagging strategy was designed to prevent.

All other untagged distractors (U2, U3, U4, U5, U6) are clean. The fix list
has exactly one item.

---

## 5. Slice 4 Implication

The fix list contains one item. A slice 4 migration is warranted.

**Shape of slice 4 (a migration UPDATE, not INSERT).**

Slice 4 would be a short migration — approximately 15 lines of SQL — that
UPDATEs the existing Item 001 row to add index "3" to its
`distractor_misconceptions` JSONB:

```sql
-- Conceptual shape (not final SQL — nextjs-frontend / supabase-architect
-- owns the implementation):
UPDATE public.items
SET distractor_misconceptions = distractor_misconceptions || '{"3": "mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle"}'::jsonb
WHERE id = '44444444-aaaa-0001-0000-000000000001';
```

The verify block for this migration should assert:
- Item 001's `distractor_misconceptions` now has exactly 3 keys: "1", "2", "3".
- All three keys map to `mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle`.
- No other item is modified (baseline check on total distractor_misconceptions
  count across the 4 items).

No new items are created; no other items are touched. The FK round-trip
invariant from ADR 0011 (each misconception ID referenced by exactly one item
on sma_limit_calc) is preserved — the UPDATE adds a key to an existing item
rather than creating a second item carrying the same misconception ID.

**Naming suggestion.** `047_fix_item001_m1_d1_dual_tag.sql`. The next
available migration number is 047 if no other migration has been issued since
046.

---

## 6. Relationship to Prior Analysis (ADR 0012)

ADR 0012 §"Cross-contamination verification" records a 4×3 matrix (each item ×
its three non-target misconceptions) and concludes "All 12 non-target cells: no
contamination." That analysis is correct for the contamination question as posed
(does any non-target distractor activate a non-target misconception?), but it
was not examining D=1 on Item 001 under the M1 column — that cell is
**target × variant**, not non-target. The original matrix treated M1 on Item
001 as "(target)" and did not audit whether all three M1 distractors (B, C, D)
were tagged. The present audit's scope is finer: not "does a non-target
misconception contaminate this item?" but "does the full M1 model's three
output variants map onto the three tagged distractors?" — and that check reveals
the D=1 gap.

The ADR 0012 conclusion stands for cross-contamination (no non-target
misconception bleeds into a wrong-answer slot). The present audit adds a
second-order finding: M1's own model is broader than the two tagged distractors
capture.

---

*Audit authored by pedagogy-auditor. Read-only analysis; no code changes,
no migration, no commit. Orchestrator commits after review.*
