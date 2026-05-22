# Design — Migration 049: misconception-driven items on `sma_limit_ops`

**Status.** DRAFT design (not authored SQL). Branch:
`slice-2-prep--migration-049-design`. The actual migration ships
synchronously with you after you approve this design.

**Source of truth for stems + choices:**
`backend/seed/misconceptions/sma_limit_ops.json` (slice 2 draft, bac-curriculum SHIPped).

**Related:**
- ADR 0010 (encoder), ADR 0011 (Path B), ADR 0012 (slice 1 items
  pattern + dual-tagging), ADR 0013 (submit-answer write path —
  reads `distractor_misconceptions` from the items this migration
  ships).
- `.claude/agents/supabase-architect.md` Hard Rules (the
  cardinality-assertion rule landed earlier this batch).
- `docs/grounding/architecture.md` §5.6 UUID allocation registry.
- `docs/audits/sma-limit-calc-items-dual-tagging.md` — slice 1's
  retrospective audit found one in-model dual-tagging gap (item
  001 D=1); this design avoids the analogous gap from the start.

---

## 1. Item enumeration

Two items, one per misconception in `sma_limit_ops.json`. Both
stems are fully written by pedagogy-auditor inside
`distinguishing_mcq_stem.stem_text`; this section just reproduces
them in tabular form for the design.

### Item M1 — `somme-limites-inexistantes`

| | |
|---|---|
| **Stem** | "Soit f(x) = x + cos(x). Que peut-on dire de lim(x→+∞) f(x) ?" |
| **A** | "La limite n'existe pas car lim(x→+∞) cos(x) n'existe pas." |
| **B** | "lim(x→+∞) f(x) = +∞." |
| **C** | "lim(x→+∞) f(x) = 1 car cos(x) → 0 à l'infini." |
| **D** | "lim(x→+∞) f(x) = +∞ + lim cos(x), ce qui est indéfini." |
| **Correct** | B |
| **Primary tagged distractor** | A → `mc.math.sma_limit_ops.somme-limites-inexistantes` |

### Item M2 — `quotient-denominateur-nul`

| | |
|---|---|
| **Stem** | "lim(x→2) (x² − 3x + 2) / (x − 2) = ?" |
| **A** | "1" |
| **B** | "La limite n'existe pas car on divise par 0." |
| **C** | "+∞" |
| **D** | "0" |
| **Correct** | A |
| **Primary tagged distractor** | B → `mc.math.sma_limit_ops.quotient-denominateur-nul` |

---

## 2. Dual-tagging plan — TWO secondary distractors to tag

Per the slice 1 precedent (`44444444-aaaa-0001-0000-001`'s M1 was
dual-tagged on B+C; `44444444-aaaa-0001-0000-004`'s M4 was
dual-tagged on B+C), each misconception's full output-variant range
should be tagged from the start. Slice 1's retrospective audit
(`docs/audits/sma-limit-calc-items-dual-tagging.md`) found a single
gap — item 001 D=1 was a third M1 variant that hadn't been wired up
— and recommends extending the discipline. This design takes that
recommendation as a hard input.

### Item M1 — dual-tag A + D

- **A (primary):** "limite n'existe pas." Categorical phrasing of
  the M1 model: an oscillating term blocks the conclusion.
- **D (secondary):** "+∞ + lim cos(x), indéfini." Explicit
  decomposition phrasing of the SAME M1 model: the student does
  the (illegal) decomposition step out loud and lands on
  "undefined".

Both are signatures of the same wrong model
(somme-limites-inexistantes); a student running M1 may verbalise as
either A or D depending on whether they articulate the decomposition
or jump to the conclusion. Single misconception, two surface forms
— dual-tag both.

`items.distractor_misconceptions` for item M1:

```json
{
  "0": "mc.math.sma_limit_ops.somme-limites-inexistantes",
  "3": "mc.math.sma_limit_ops.somme-limites-inexistantes"
}
```

(Keys are 0-based indices into `question.choices[]` per the
convention established by migration 046: 0=A, 1=B, 2=C, 3=D.)

### Item M2 — dual-tag B + C

`sma_limit_ops.json`'s `close_to_the_line` section already specifies
this. B and C are both reachable from the M2 model:

- **B (primary):** "limite n'existe pas car on divise par 0."
  Student stops at "division by zero" without sign analysis.
- **C (secondary):** "+∞." Student applies the quotient theorem +
  recognises the sign of the denominator near 2 to land on ±∞ —
  same wrong model, but with the sub-rule that 1/0 is "infinite"
  rather than "undefined".

`items.distractor_misconceptions` for item M2:

```json
{
  "1": "mc.math.sma_limit_ops.quotient-denominateur-nul",
  "2": "mc.math.sma_limit_ops.quotient-denominateur-nul"
}
```

---

## 3. The remaining UNTAGGED distractors — cross-contamination check

Per ADR 0011's cross-contamination check, every UNTAGGED distractor
must NOT surface any non-target misconception in the set. Two
distractors to check, one per item.

### Item M1 — C ("lim = 1 car cos(x) → 0 à l'infini") — UNTAGGED, clean

The "wrong" reasoning surfaced by C: the student believes
`cos(x) → 0` at infinity (mistaking it for `1/x`-style decay) and
then... computes `x + 0 = x` and somehow lands on 1. The reasoning
chain doesn't fully close to "1" — C is a plausible-but-incoherent
distractor that surfaces the **factual error** "cos(x) → 0 at
infinity", not any tracked misconception in this skill's set.

- Does M1 reasoning land on C? No. M1 says "can't decompose"; C
  says "I CAN decompose and the cos term vanishes". Opposite
  conclusions.
- Does M2 reasoning land on C? No. M2 is quotient-specific; no
  fraction here.
- Does the cut produit-zero-infini reasoning land on C? No. No
  product of two terms.

**Verdict: untagged. Keep as-is. C is a misreading of the cos
function's asymptotic behaviour, not a tracked misconception.**

If a future slice authors a misconception like
`mc.math.sma_limit_calc.trig-tends-to-zero` (a different skill,
about trig limits not operations), C would dual-tag to it. Not in
scope today.

### Item M2 — D ("0") — UNTAGGED, clean

The "wrong" reasoning surfaced by D: the student factors the
numerator, gets `(x−2)(x−1)/(x−2) = x−1`, then makes an arithmetic
slip and gets 0 instead of 1 at x=2. Or: misreads the polynomial.
Or: applies the quotient theorem but with `lim(numerator) = 0` and
concludes `0/0 = 0`.

The last reasoning chain is interesting — "0/0 = 0" is slice 1's M1
(`forme-indeterminee-valeur-nulle`). But that misconception is on
`sma_limit_calc`, NOT `sma_limit_ops`. Cross-SKILL contamination is
not forbidden by ADR 0012 (which is about intra-set contamination),
but it IS a known interaction worth noting.

- Does M1 (this skill, somme) land on D? No. No oscillating term.
- Does M2 (this skill, quotient) land on D? No. The model produces
  "doesn't exist" or "infinity", not 0.
- Does the cut produit-zero-infini reasoning land on D? Possibly,
  if the student treats `(x²−3x+2)·1/(x−2)` as a product, sees
  `0·something` and concludes 0. Marginal.

**Verdict: untagged in v1.** The "0/0 = 0" cross-skill interaction
with slice 1's M1 is a real but not in-scope concern — a student
running slice 1's M1 on this stem fires no diagnostic event here
(misconception lives on a different skill row). Step 3's diagnostic
output will see this as untagged-noise, which is acceptable v1
behaviour per ADR 0011's "below floor" acknowledgement.

**Forward question for v2 authoring:** when (if?) we want to
diagnose cross-skill misconception activation, the diagnostic layer
needs a way to read `items.distractor_misconceptions` as a list
that can contain IDs from multiple skills. Today the convention
implicitly assumes one item ↔ one skill ↔ one misconception family.
Flag for ADR 0014 or similar when cross-skill diagnostics surface
as a real need.

---

## 4. UUID allocation

Per the registry in `architecture.md` §5.6, the
`44444444-aaaa-0002-0000-*` range is reserved for slice 2's items.
Allocating:

| Item | UUID |
|---|---|
| M1 (`somme-limites-inexistantes`) | `44444444-aaaa-0002-0000-000000000001` |
| M2 (`quotient-denominateur-nul`) | `44444444-aaaa-0002-0000-000000000002` |

After this migration, the registry needs an update reflecting that
`44444444-aaaa-0002-0000-001..002` is now closed (used by mig 049),
with batch `…-0003-0000-*` opening for slice 3's
(`sma_asymptotes`) items.

`skill_id` for both items: `33333333-aaaa-0000-0000-000000000003`
(`sma_limit_ops`, confirmed by the slice 2 bank-topology check;
single-bank by construction).

---

## 5. Tags

Per ADR 0011's marker convention (in `items.tags[]`):

### Item M1

```
['bac_style', 'misconception_driven', 'sma_limit_ops']
```

No specialised tag analogous to M2's `continuity-adjacent` from
migration 046 is needed. The stem (x + cos x) lives squarely under
"opérations sur les limites" — the comparison theorem is the
canonical solution path, and that's a `sma_limit_ops` topic.

### Item M2

```
['bac_style', 'misconception_driven', 'sma_limit_ops']
```

Same base set. Worth considering whether `'continuity-adjacent'`
also applies — the 0/0 form often lives in continuity discussions
(prolongement par continuité) — but the cadre treats the
factorisation-of-0/0 path as a limit-operations technique, not a
continuity one. **Recommendation: no `'continuity-adjacent'` tag
for M2.** Different from migration 046's M2 (which was explicitly
piecewise) — this M2 is a polynomial quotient that doesn't engage
the piecewise/continuity boundary.

### Difficulty levels — REVIEW REQUEST

`sma_limit_ops.json` does not specify per-misconception difficulty.
Slice 1's items were difficulty 2 except M4 at 4. Proposed for
slice 2:

| Item | Proposed difficulty | Rationale |
|---|---|---|
| M1 (somme + cos) | **3** | Two-step reasoning: recognise the sum theorem doesn't apply AND invoke the comparison theorem. Slightly above the calculation-only baseline. |
| M2 (quotient 0/0) | **2** | Standard 0/0 factorisation. Same conceptual difficulty as slice 1's M1 item (also 0/0). |

Open for you to revise either before migration ships.

---

## 6. Verify block plan

Mirrors the migration-046 pattern + the new cardinality hard rule
in supabase-architect.md (from earlier this batch). Inside
`BEGIN; … COMMIT;`. On failure: rollback.

### Assertions

| # | What | Catches |
|---|---|---|
| 6a | Exactly 2 new MCQ items exist with id IN (…0001, …0002) AND skill_id = sma_limit_ops UUID | The UUID-collision failure mode that mig 046 hit on its first branch-test run. **Cardinality. The hard rule.** |
| 6b | Each new item has non-empty `distractor_misconceptions` (object with ≥ 1 key) | Tagging didn't get dropped by an encoder bug or copy-paste error. |
| 6c | Each new item is tagged `'misconception_driven'` (ANY-check against `tags`) | The tag convention from ADR 0011. |
| 6d | Both expected misconception IDs are referenced by EXACTLY ONE item each | The FK round-trip check from ADR 0011 §3. Each ID resolves uniquely to its parent item, which resolves to `sma_limit_ops` skill_id. |
| 6e | Each new item's `skill_id` equals the SMA-prefixed UUID, not the unprefixed legacy UUID (which doesn't exist for this skill but the assertion is cheap insurance) | The dual-bank trap. Always cheap. |
| 6f | For Item M1: `distractor_misconceptions` has exactly 2 keys, both mapping to `mc.math.sma_limit_ops.somme-limites-inexistantes`. The keys are "0" and "3" (A and D). | The dual-tagging plan landed correctly. |
| 6g | For Item M2: `distractor_misconceptions` has exactly 2 keys, both mapping to `mc.math.sma_limit_ops.quotient-denominateur-nul`. The keys are "1" and "2" (B and C). | Same as 6f for M2. |
| 6h | `skills.common_misconceptions` for `sma_limit_ops` contains both expected misconception IDs (sanity-check the encoder-emitted misconceptions migration has shipped before this items migration). | If the encoder migration didn't run yet, mig 049 should NOT ship — the FK validation in the submit-answer edge function would phantom-tag every event. |
| 6i | Prereq baseline (ADR 0004 canonical: SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201, cross=0) unchanged. | Re-assert; pure-additive migration must not drift it. |
| 6j | Migration 045 misconceptions on `sma_limit_calc.common_misconceptions` unchanged (4 entries). | Re-assert; slice-2 items must not touch slice-1 state. |

### Migration ordering — REVIEW REQUEST

Migration 049 (items) MUST land AFTER an encoder-emitted migration
that loads `sma_limit_ops.common_misconceptions` (the misconception
definitions). Otherwise §6h fails and the items reference
misconceptions that don't exist in the JSONB.

**Open question for you:** does the encoder migration (call it
"048" by sequence) ship in the same PR as migration 049, or
separately? Slice 1's analogue was migrations 045 (encoder-emitted)
+ 046 (items) shipped one after the other. Recommendation: same
PR, separate migrations, ordered 048 → 049. The encoder is unchanged
from slice 1 (`json_encode_misconceptions.dart`); we just run it
against the new JSON file.

---

## 7. Migration filename and header

Proposed filename:
`backend/supabase/migrations/049_items_sma_limit_ops_misconception_driven.sql`

(Mirrors mig 046's
`046_items_sma_limit_calc_misconception_driven.sql`.)

Header should reference:
- ADR 0011 (Path B chose author-new-items).
- ADR 0012 (slice 1 precedent — including the UUID-collision incident).
- ADR 0013 (the submit-answer write path that reads
  `distractor_misconceptions` from these items).
- `architecture.md` §5.5 (single-bank attribution; bank-topology pre-check from slice 2 _slice_2_skill_choice.md).
- `architecture.md` §5.6 (UUID registry; this migration closes the
  `…-0002-0000-001..002` range).

Plus the dual-tagging discipline note: both items use dual-tag (M1
on A+D, M2 on B+C) per slice-1 precedent + the slice-1 retrospective
audit's recommendation. Explicit pointer to
`docs/audits/sma-limit-calc-items-dual-tagging.md` for the
discipline derivation.

---

## 8. Reversal note (in the migration's footer comment block)

Standard `DELETE FROM public.items WHERE id IN (…)` with the safety
caveat: only safe if no `user_misconception_states` rows have been
generated by these items. By the time slice 2 ships, the
submit-answer edge function is live; students MAY have triggered
state writes. The reversal would orphan that diagnostic evidence.
Same pattern as migration 046's reversal note.

---

## 9. Open questions for you (review)

1. **Difficulty levels** (§5). Proposed: M1 = 3, M2 = 2. Approve
   or revise.
2. **`continuity-adjacent` tag on M2** (§5). Recommended: NO (this
   M2 is a polynomial quotient, doesn't engage piecewise/continuity
   boundary). Confirm or override.
3. **Migration ordering / PR scope** (§6h). Recommendation: ship
   encoder migration 048 + items migration 049 in one PR, ordered.
   Confirm.
4. **Cross-skill 0/0 interaction on M2 D** (§3). The "0/0 = 0"
   slice-1 misconception lives on `sma_limit_calc`. A student
   running it on `sma_limit_ops`'s M2 item fires no event today
   (different skill). Flagged but no change recommended for v1.
   Confirm we're OK with that.
5. **`44444444-aaaa-0002-0000-*` range closure after this migration**
   (§4). Two UUIDs used (001, 002). The registry update should
   reflect "closed: 001..002; open: 003+ for future M3/M4 if added".
   Confirm the registry-edit shape.

After you sign off on these five points, the next step is the
synchronous PR that ships the encoder migration + the items
migration + the registry update. Branch-test, verify, push.

---

## 10. What this design does NOT include (intentionally)

- The actual SQL for migration 049. That's the synchronous next
  step.
- The encoder-emitted migration 048. The encoder runs against
  `sma_limit_ops.json` at the synchronous step; its output is
  mechanical.
- Updates to `architecture.md` §5.6 (the UUID registry). Closing
  the 0002 range ships with the migration PR.
- Slice 1's audit fix (item 001 D=1 dual-tag). That's slice 4,
  separate branch (`slice-2-prep--sma-limit-calc-dual-tagging-audit`
  carries the audit report).
