# ADR 0012 — Step 3 implementation: misconception-driven items on sma_limit_calc

**Status.** Accepted, 2026-05-18.
**Owner.** bac-curriculum (cadre validation), pedagogy-auditor
(cross-contamination verification), learner-model (FK round-trip
verification).
**Related.**
- [ADR 0007](0007-misconception-schema.md) — items.distractor_misconceptions
  is the column step 3 writes into.
- [ADR 0008](0008-misconception-authoring-conventions.md) — authored the
  four misconceptions this PR diagnoses.
- [ADR 0009](0009-misconception-schema-amendment.md) — structured
  distinguishing_mcq_stem with the distractor_choice_label this PR
  reads from.
- [ADR 0010](0010-misconception-encoder.md) — encoder + migration 045
  that loaded the misconceptions onto skills.common_misconceptions.
- [ADR 0011](0011-distractor-tagging-strategy.md) — Path B decision,
  diagnostic-output contract, coverage-density floor, the FK semantic
  mismatch this PR closes.
- `docs/grounding/architecture.md` §5.5 — bank-topology section
  (precursor); the UUID-family conventions for items.
- `.claude/agents/learner-model.md` — Active/Cleared/Unassessed hard
  rule (precursor).
- `backend/supabase/migrations/046_items_sma_limit_calc_misconception_driven.sql`
  — the migration this ADR documents.

---

## Context

Step 3 of the misconception vertical slice. ADR 0011 decided **Path B**
(author new items on the SMA-prefixed skill, not tag existing items on
the unprefixed skill). This PR ships the four items.

Two small precursors landed alongside (per the user's brief):

1. The diagnostic-output contract from ADR 0011 §"Diagnostic-output
   contract" is now a **hard rule** in `.claude/agents/learner-model.md`
   — "Diagnostic output distinguishes three states: Active / Cleared /
   Unassessed — never two." The agent file is the durable place this
   contract lives; future learner-model output specs cite it from
   there, not from the original ADR.

2. **Bank topology** is now documented in `docs/grounding/architecture.md`
   §5.5. The UUID/skill-attribution confusion that hid for five ADRs
   (items on unprefixed `limit_calc` vs misconceptions on
   `sma_limit_calc`) is now canonical knowledge agents read up front,
   not a finding that gets re-discovered on each new piece of work.

## The four items shipped (migration 046)

Each authored on the SMA-prefixed skill `sma_limit_calc`
(`id = 33333333-aaaa-0000-0000-000000000002`). Each carries
`distractor_misconceptions` populated at creation — no separate tagging
step. Each tagged `'misconception_driven'` per ADR 0011's
bac-curriculum-ruled marker convention.

| Item UUID | Misconception | Stem | Correct | Tagged Distractors | Tags |
|---|---|---|---|---|---|
| `…0001-…001` | M1 forme-indeterminee-valeur-nulle | `lim(x→2) (x²−4)/(x−2)` | A=4 | B=0 (primary), C="n'existe pas" (secondary) | `bac_style, misconception_driven, sma_limit_calc` |
| `…0001-…002` | M2 limite-egale-valeur-point | piecewise f(x)=x+3 (x≠1), f(1)=7; lim(x→1) | A=4 | B=7 (primary) | + `continuity-adjacent` |
| `…0001-…003` | M3 infini-moins-infini-nul | `lim(x→+∞) (x² − x)` | A=+∞ | B=0 (primary) | base set |
| `…0001-…004` | M4 limite-fondamentale-linearite | `lim(x→0) sin(x²)/x` | A=0 | B=1 (variant), C=2 (primary) | base set + `difficulty_level=4` |

UUID family: `44444444-aaaa-{batch}-0000-{n}`. The `aaaa` segment mirrors
the SMA-prefix skill family. The `{batch}` segment is `0001` —
misconception-driven items batch 1. Bumping `{batch}` was forced by a
collision with migration 018 (which occupies `…aaaa-0000-…001-…081` with
129 SMA-specific items). The first branch-test attempt hit the
collision; the verify block's `expected 4 new MCQ items, got 0`
caught it cleanly. See §"Branch-test result" below.

The `distractor_misconceptions` key convention established here:
**string-numeric 0-based index** into `question.choices[]`. `"1"` maps
to the second choice (typically B in letter form), `"2"` to the third
(C), etc. The misconception side uses letter labels
(`distractor_choice_label = 'B'`); conversion is mechanical A=0, B=1,
C=2, D=3. The convention is documented in the migration header so
future authors don't have to re-derive it.

## Cross-contamination verification (pedagogy-auditor)

Path B's load-bearing rule: every non-target distractor must NOT
surface another misconception in the M1-M4 set. pedagogy-auditor's 4×3
matrix:

| Item | Non-target: M1 | Non-target: M2 | Non-target: M3 | Non-target: M4 |
|------|---|---|---|---|
| **M1** stem | (target) | no contamination — no clean f(2), M2 not triggered | no contamination — no ∞−∞ | no contamination — no trig |
| **M2** stem | no contamination — no 0/0 form | (target) | no contamination — no ∞ | no contamination — no trig |
| **M3** stem | no contamination — no 0/0 form | no contamination — no finite-point sub | (target) | no contamination — no trig |
| **M4** stem | see note ↓ | no contamination — f(0) hits 0/0, M2 gives no clean answer | no contamination — no ∞−∞ | (target) |

**All 12 non-target cells: no contamination.** The diagnosis on each
item isolates its target misconception from the other three.

**Self-trigger check.** Each tagged distractor really does surface its
target misconception. The dual-tagged items (M1 tags B+C, M4 tags B+C)
both pass: M1-C is the secondary "0/0 = undefined" signature; M4-B is
the "sin/x = 1 always" variant. Both legitimately co-tag.

**M4 blind-spot flag (not contamination — separate concern).** On M4's
stem `lim(x→0) sin(x²)/x`, a student running M1's "0/0 = 0" reasoning
arrives at A=0 (the correct answer) by coincidence. That isn't
cross-contamination of wrong answers — M1 can't be mis-attributed via
a non-target distractor because picking the correct answer doesn't
write to `distractor_misconceptions`. But it's a diagnostic over-credit:
the item cannot distinguish a correctly-reasoning student from an
M1-via-coincidence student. **Logged for v2: M4 stems in v2 must
avoid 0/0 form at the limit point** (e.g.,
`lim(x→0) sin(3x)/x²` instead) so the M1 path doesn't coincide
with the correct answer.

## Cadre validation (bac-curriculum)

All four items pass cadre review for SM-A Terminale Limites et
continuité:

- **M1** (factorisation of 0/0). Canonical Bac-style item, levée de
  forme indéterminée by polynomial factorisation. No reservation.
  Verdict: PASS.
- **M2** (piecewise function, limite vs valeur en un point).
  `continuity-adjacent` tag is necessary and sufficient — the cadre
  places this distinction inside the Limites unit but it sits at the
  boundary with continuité. The tag signals the proximity without
  misclassifying the item. Verdict: PASS.
- **M3** (∞−∞ at +∞ via factorisation par le terme dominant). Standard
  cadre technique. Verdict: PASS.
- **M4** (sin(x²)/x via substitution u=x²). Difficulty 4 is correct —
  the two-step rewrite sits at the discriminating end of the SMA
  difficulty band. The explanation preserves both steps explicitly
  (rewrite + substitution), neither collapsed. Verdict: PASS.

**French integrity:** clean. No Unicode artefacts on ∞, →, ², −, é
characters. Mathematical notation consistent across items. Register
formal-appropriate.

**M4's D="+∞" swap from the seed JSON's original D="la limite n'existe
pas":** cadre-acceptable. "+∞" is a plausible wrong answer reachable
through a magnitude-estimation error (student misreads sin(x²) as
bounded, focuses on 1/x growth), and crucially it does not invoke any
of M1-M4 — confirmed by the cross-contamination matrix.

## FK round-trip — closed (learner-model)

The bug ADR 0011 caught: `user_misconception_states.skill_id` is a FK
that's satisfied by either skill UUID, but the cross-table semantics
break when state rows reference one UUID while the misconception
definitions live under the other.

Migration 046 closes all three legs:

1. **Item creation.** Every INSERT carries
   `skill_id = '33333333-aaaa-0000-0000-000000000002'` (sma_limit_calc).
   The legacy UUID `…0007` does not appear in the migration.
2. **submit-answer write path** (future edge function). Reads
   `skill_id` from the item row and writes it verbatim to
   `user_misconception_states`. Because the item is on sma_limit_calc,
   the state row lands there.
3. **Scheduler read path.** The query
   `WHERE skill_id = '33333333-aaaa-0000-0000-000000000002'
   AND resolved_at IS NULL` against `user_misconception_states` now
   finds rows; the join to `skills.common_misconceptions` for the
   misconception definition resolves on the same UUID.

The verify block's §3f assertion (`each misconception ID resolves to
exactly one item AND that item is on sma_limit_calc`) catches the
invariant on each future run. Both halves are checked — count==1 plus
skill_id equality — so a typo'd skill attribution fails loudly.

**Round trip: CLOSED.**

**One precision flag for future migrations** (learner-model's review):
§3f uses `LIKE '%' || v_mc_id || '%'` against
`distractor_misconceptions::text`. Works correctly when no
misconception ID is a prefix substring of another (the four IDs here
are all distinct and well-separated). A JSONB-value-containment idiom
(`distractor_misconceptions @> jsonb_build_object(key, v_mc_id)`
iterated over candidate keys) would be semantically tighter. Not
blocking v1; track for future encoder revisions.

**Index usability** confirmed: the partial index
`idx_user_misconception_states_active (user_id, skill_id) WHERE
resolved_at IS NULL` (migration 043) serves the scheduler's hot-path
query exactly. No concern.

## Below the coverage floor — explicit acknowledgement

Per ADR 0011 §"Coverage density floor (learner-model's ruling)":

- **Exhibition floor:** 3 items per misconception, `exhibited_count >= 2`
  to trigger remediation.
- **Resolution floor:** 3 consecutive correct answers on tagged items.

**v1 ships at 1 item per misconception. Below floor.** Accepted as
first-deployment wiring per ADR 0011's explicit decision. The
implications, made concrete by this PR:

- `exhibited_count` is operationally a binary flag (0 or 1) before the
  student exhausts the 4-item pool. It is not confidence-bearing.
- The diagnostic-output contract — the hard rule just added to
  `.claude/agents/learner-model.md` — must classify these as **Unassessed**
  (or a future "Weak signal" sub-state) until `exhibited_count >= 2`,
  even when `exhibited_count == 1` records a real wrong-answer event.
- Conflating "no misconception detected" with "no misconception is
  present" is the false-completeness failure mode the contract exists
  to prevent. v1's coverage makes this risk acute: nearly every
  student-skill pair will be Unassessed for most misconceptions until
  v2 ships more items.

learner-model's UX flag from the review: rather than presenting
"Unassessed" as a single state, the diagnostic surface may want a
distinct **"Weak signal"** sub-state for `exhibited_count == 1`
(reflecting "one wrong-answer event, confidence below threshold")
to give the student/teacher honest feedback that *something* was
observed without overclaiming. Decision deferred to the diagnostic
output spec; tracked below.

## Branch-test result

**First attempt: FAIL.** UUID collision with migration 018 (which used
`44444444-aaaa-0000-0000-000000000001` through `…081` for 129
SMA-specific items shipped pre-misconception-framework). My initial
authoring picked `44444444-aaaa-0000-0000-000000000001..04` — the same
first four. The four INSERTs ran with `ON CONFLICT DO NOTHING` and
skipped silently (no error), then the verify block's §3a check found
`expected 4 new MCQ items, got 0` and rolled the transaction back.

**The verify block did its job.** Without §3a's count assertion, the
collision would have caused a silent no-op that no other check on
staging or prod would have caught. The script's discipline plus the
in-migration verify-block pattern caught a real bug before any
production write.

**Fix:** swapped the third UUID segment from `0000` to `0001` —
`44444444-aaaa-0001-0000-…001..04` — clearly outside the legacy SMA
item bank's range, with documented headroom for future
misconception-driven batches (`0002`, `0003`, …).

**Second attempt: EXIT 0.** All 11 branch-test checks green, ~10s
wall time. Log: `.audit-logs/branch-test-20260518-123415.log`. The
v2.1 logging fix held (single "Applying migration 046" in the log).
The migration 046 verify NOTICE:

```
Migration 046 verification OK: 4 misconception-driven MCQ items on
sma_limit_calc, each tagged misconception_driven, M2 also
continuity-adjacent, M4 at difficulty 4. FK round-trip clean (every
misconception ID resolves to exactly one item on sma_limit_calc).
Migration 045 misconceptions unchanged (4 entries). Prereq baseline
unchanged: total=201 SMA=98 SMB=31 PC=21 SVT=9 humanities=42 cross=0
```

**Prod push: applied cleanly.** Verified via REST that all four
items exist on prod's `sma_limit_calc` with the expected stems,
distractor_misconceptions mappings, and tags. M2's item carries
`continuity-adjacent`; M4's item is at `difficulty_level = 4`.

## Multi-agent review pattern, second exercise

The protocol from the 2026-05-16 amendments (ADRs 0009 §"Agent-handoff
protocol" + the `.claude/agents/*.md` rules added 2026-05-16) operated
as intended this round:

- **bac-curriculum** stayed in the cadre-fit + French-integrity lane
  and did not opine on cross-contamination or FK semantics.
- **pedagogy-auditor** owned the cross-contamination matrix and the
  self-trigger check — the load-bearing distinguishing-power question
  for the diagnostic instrument. They also caught the M4 blind-spot
  flag (not their primary scope but their pattern-recognition for
  diagnostic over-credit was load-bearing).
- **learner-model** owned the FK round-trip verification and surfaced
  the §3f LIKE-vs-@> precision flag. They did not opine on cadre or
  content quality.

All three SHIP, all three concurrent, ~3 min wall time. No
revisions to the migration based on review.

## Consequences

- **Diagnostic surface for SMA students is wired end-to-end** for
  `sma_limit_calc`. When the `submit-answer` edge function ships,
  wrong answers to these four items will write
  `user_misconception_states` rows that the scheduler can read.
- **The FK semantic bug from ADR 0011 is structurally impossible to
  reintroduce** within these four items. Future per-skill PRs follow
  the same Path B pattern (author on SMA-prefixed skill, never tag
  unprefixed) and inherit the safety.
- **The coverage floor is the next gating constraint.** v2 must reach
  3 items per misconception (12 total on `sma_limit_calc`) before the
  `exhibited_count` signal becomes confidence-bearing. v1 wires; v2
  diagnoses.
- **UUID-collision discipline note.** The first attempt's bug is now
  documented in the migration's header. Future item-authoring PRs
  must grep the existing migrations for the chosen UUID prefix before
  picking new IDs. The verify block's count assertion is the safety
  net.

## Pending follow-ups

- [ ] **v2 coverage** — add 2 more items per misconception (8 total).
      Per pedagogy-auditor's v2 stem-design guidance from this review:
      M4 stems should avoid 0/0 at the limit point (to close the
      M1-coincidence blind spot); M3 should include at least one
      irrational form (`√(x²+x) − x` family) so the ∞−∞ confrontation
      is genuine rather than trivially factorable; distractor families
      should rotate across items rather than repeat the same surface
      form. Owners: bac-curriculum + pedagogy-auditor joint authoring.

- [ ] **Diagnostic-output contract spec** — formalise the
      Active / Cleared / Unassessed states (and possibly a "Weak signal"
      sub-state per learner-model's UX flag) as a concrete output shape
      the UI and scheduler consume. Owner: learner-model. Cited
      from `.claude/agents/learner-model.md` hard rules.

- [ ] **submit-answer edge function** — read item's `skill_id` and
      `distractor_misconceptions[choice_index]`; INSERT/UPDATE
      `user_misconception_states` under `service_role`. Must
      validate the misconception ID exists in
      `skills.common_misconceptions` before INSERT (learner-model's
      review flag — `misconception_id` has no DB-level FK; the
      application layer is the only guard).

- [ ] **Author `sma_limit_ops` and `sma_asymptotes` misconceptions**
      (ADR 0011 hold-released list). The two cut candidates from ADR
      0009 §"Decision A" become their own seed JSON files; encoder
      runs; per-skill items follow.

- [ ] **`subject_point` sub-field proposal** (ADR 0010 §H,
      hold-released by ADR 0011). Route to bac-curriculum first per
      the 2026-05-16 agent-handoff protocol.

- [ ] **Verify-block `LIKE`-vs-`@>` precision** —
      `distractor_misconceptions::text LIKE '%' || v_mc_id || '%'`
      works correctly for non-prefix-substring IDs (true for the
      current four). Future migrations should tighten to a JSONB
      containment idiom. Track for the next encoder revision (ADR
      0010's `json_encode_misconceptions.dart` and any
      `json_encode_items.dart` that eventually replaces hand-authoring).

- [ ] **Item-authoring encoder** — at 4 items, hand-authoring was
      reasonable (and the encoder-vs-no-encoder question was deferred
      by ADR 0011 to this PR). At 12-item v2 the question reopens. If
      a `json_encode_items.dart` is written, it must enforce the
      cross-contamination matrix programmatically (not just trust the
      author) and the UUID-collision check (grep prior migrations or
      maintain a manifest).
