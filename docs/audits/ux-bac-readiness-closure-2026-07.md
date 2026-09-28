# UX Bac-Readiness Closure — 2026-07

> **What this is.** The closure verdict for the remediation campaign tracked
> at `docs/audits/remediation-campaign-2026-07.md`, judged against the four
> gaps of `docs/audits/ux-bac-readiness-evaluation-2026-07.md` and the
> completion criteria of the execution plan (session plan file, not tracked
> in this repo, §12). Content lanes (Gap 1, 3, 4) are closed. The DB lane
> (Gap 2) remains owner-gated, per the plan's hard constraint that it is never attempted
> autonomously — see §2 below. HEAD at closure: `37926db`.

---

## 1. Gap-by-gap verdict

### Gap 1 — production layer (summit conversion): **CLOSED**

Target: 51/62 non-SVT lessons converted (25 PC + 14 maths + 12 philo incl.
analyse-de-texte); zero legacy summit headings outside SVT; unsourced
exceptions ≤5, named and ledgered.

**Actual: 49/62 non-SVT dirs converted** (25 PC + 14 maths + 10 philo).
The two philo dirs short of the plan's 51-target (`l-histoire`,
`le-bonheur`) are not a gap — they are a **deliberate, evidence-based scope
exception** discovered mid-campaign (see §3, Named exceptions) that
supersedes the plan's original target count. `validate --strict` is clean
across all 62 non-SVT dirs (0 failures). Zero legacy summit headings remain
outside SVT. 3 named unsourced/out-of-scope exceptions, at the ≤5 cap (see
§3).

### Gap 2 — tutor engine (DB lane, RC-6): **NOT ATTEMPTED — owner-gated, ledgered NO-GO-pending**

Per the plan's locked decision 7 and §10, RC-6 is owner-synchronous
(container cannot reach Supabase over raw TCP — mode B) and was never
attempted autonomously this session, as instructed. `learner-model.ts` and
`useStudentState()` remain code-complete and dark
(`NEXT_PUBLIC_AUTH_MODE=off/mock`). Migrations 048–050 remain drafts.
Staging (`miscjaztsputtdalwcjp`) was last probed unreachable (likely
paused). **This is the one open item at closure** — see §2.

### Gap 3 — content holes (trig-limits, analyse-de-texte, cadre challenges): **CLOSED**

- Trig-limits (C2) landed in `maths/limites-continuite` R6, commit `5295ad2`.
- `analyse-de-texte` is live: born-converted, curriculum entry present
  ("Méthode de l'épreuve" unit), dom-truth chapter-count harness updated in
  the same commit (`9a89083`), still green at closure (161/161).
- All 3 cadres (maths, svt, philo) extracted and PROPOSITION-status;
  research-challenger ran on philo (P2.3) and found 2 of 3 contested
  notions over-reached the exam-scope evidence — see §3. Maths/SVT cadre
  challenges were not part of this campaign's scope (philo was the
  in-scope challenge per the plan) and remain owner-validation-pending at
  Sitting 2, unchanged from the pre-campaign state.

### Gap 4 — diagnostic integrity (misconception tags, position bias, length-tell): **CLOSED, with one ledgered follow-up**

- All non-SVT `items.yaml` files are misconception-tagged with truthful
  `coverage_summary` (several honest `floor_met: false` — by design, never
  padded).
- Position bias: render-time shuffle (`lib/shuffle.ts`) holds uniform
  across all subjects — confirmed again at closure (see table in §4).
- Philo length-tell: **8%**, down from the campaign's cited 97% baseline.
  This **undershoots** the plan's 25–35% target band — every violation
  found this campaign was fixed in the single direction of "correct is
  never the strict-longest," with no offsetting mechanism to keep some
  items' correct answer legitimately longest, producing a mild inverse
  tell. **Not fixed this campaign** (see §5, deferred items) — flagged
  here as the metric's honest final state, not hidden.
- PC (53%) and maths (36%) length-tell also sit above the 25–35% band;
  these lanes closed in earlier waves (before the campaign adopted the
  length-tell discipline consistently) and were out of this session's
  scope to revisit. Same deferred-follow-up bucket as philo.
- SVT is untouched by design (92% length-tell, pre-existing, owner
  decision 4 — see SVT deferral below).

---

## 2. The one open item: RC-6 (DB lane)

**Status: owner-gated, never attempted autonomously, as required.**

Nothing in this campaign changed the DB-lane state from the plan's §1
snapshot: prod migrations 001–047 stable, drafts 048–050 ready,
`docs/pipeline/production-sync-session.md` ready and unrun,
`scripts/branch-test.ps1` requires the owner's machine (`pwsh` absent in
container), staging likely paused. This requires three owner sittings
(sync check GO/NO-GO → migrate+branch-test+staging-e2e → authorized prod
push) per plan §10. **No code change is needed to unblock this — it is
purely a scheduling/access dependency on the human owner.** Until it runs,
Gap 2 stays open; every other gap this campaign targeted is closed.

---

## 3. Named exceptions (final list, 3 of the ≤5 cap)

1. **`pc/atome-mecanique-newton`** — no dedicated national PC-SPC exercise
   found after an exhaustive 18-normale + 3-rattrapage search. Original
   course exercise moved into the schema honestly (`status: unsourced`,
   `required_for_done: false`). Converted `192938e`.
2. **`philo/l-histoire`** — concrete multi-source evidence (a 2008–2024
   exam census + an independent confirming source) that this notion is not
   examined in science streams; a scope exception, not a search failure.
   Left unconverted pending owner Sitting-2 confirmation of the
   reclassification.
3. **`philo/le-bonheur`** — same evidentiary pattern: two science-stream-
   specific platforms confirm the ethics module for science streams is
   devoir+liberté only; zero science-stream exam hits found. Left
   unconverted, same pending owner confirmation.

Both philo exceptions carry full `items.yaml` (feedback, no misconception
tags — same state as before this campaign touched them) but no
`exercises.yaml`/`checkpoints.yaml`, and are UI-indistinguishable from the
9 in-scope philo notions — flagged in the ledger's cadre-findings triage
log as worth a "not tested for your filière" UI treatment once the owner
confirms the reclassification, so future recommendation logic doesn't
misallocate study time toward untested notions.

---

## 4. Final verification gate (run at closure, HEAD `37926db`)

| Check | Result |
|---|---|
| `validate-content.mjs --strict` (all 62 non-SVT dirs) | **0 failures** |
| `npm run build` | 89 pages, clean |
| `dom-truth.mjs` | **161/161 checks, 0 failures**; build stamp == HEAD |
| `item-stats.mjs` — rendered position (post-shuffle) | maths 29/22/21/28%, pc 26/27/24/24%, philo 27/27/23/23%, svt 25/25/20/30% — all ≈ uniform |
| `item-stats.mjs` — length-tell | maths 36%, pc 53%, philo **8%**, svt 92% (svt untouched by design; maths/pc/philo all outside 25–35% band — see Gap 4 + §5) |
| model-id grep, full campaign diff (`89decac..HEAD`) | Clean — 2 known false positives (Claude Bernard, the physiologist, in a `theorie-experience` tag; the branch name `claude/vibrant-fermi-v1lxj5` in the ledger's own incident narrative) |

---

## 5. Critic panel — closure verification (read-only, never inherited)

Re-commissioned bac-fidelity-critic, pedagogy-critic, and coherence-critic
over the 10 converted philo lessons (the content this session actually
touched). PC and maths were audited in earlier waves
(D9.5-audit, `docs/audits/`) and not re-run here.

**bac-fidelity-critic: no binding findings.** Zero off-syllabus content,
zero exclusion breaches. `la-violence` correctly stays on the
challenger-evidenced axis, avoiding the un-evidenced `formes_violence`
typology. Named exceptions correctly excluded from scope checks. Five
low-severity informational notes logged (scaffolded sub-questions vs. the
holistic dissertation format; two anti-memo twins narrower in scope than
the campaign's own better examples; three real bac texts each legitimately
reused across two lessons with distinct framings; one cadre-granularity
observation routed to research-lead; one trivial consigne-duplication
cosmetic) — none block the lane, none required a content edit.

**pedagogy-critic: 2 concrete findings, both fixed** (commit `37926db`):
- F1 — `la-verite`'s `cp-r2-rupture` was tagged with an R3 misconception
  and forward-referenced an untaught example (Ptolémée). Retagged to a
  genuinely R2-native misconception; feedback rewritten within R2's taught
  content. The R3 misconception's own coverage (11 items) is unaffected.
- F2 — `analyse-de-texte`'s R4 had a named "erreur à éviter" with no
  checkpoint and an undocumented delegation to `items.yaml`. Documented
  the delegation (2 misconceptions, 10/49 and 9/49 items, both above
  floor) in the checkpoints header, matching `autrui`'s existing
  precedent for the same judgment call.
- Verdict otherwise: "uniformly strong and ships" — commit-gates,
  rupture-gate placement, expert-reasoning-shown, and coverage-honesty
  checks all clean across all 10 lessons.

**coherence-critic: 1 high-severity finding, fixed; 4 lower-severity,
deferred:**
- Finding 1 (HIGH, fixed) — `la-violence` defined "légitime au sens de
  Weber" as a bare procedural triad (loi/procédure/tiers impartial) in an
  early `items.yaml` solution field, while `l-etat` and
  `le-droit-la-justice` define it as recognition-based — a genuine
  cross-lesson contradiction reachable before `la-violence`'s own R7
  bridges the two framings. Fixed by extending that existing R7 bridge
  language back to the earlier solution field.
- Finding 4 (LOW, folded into the Finding-1 fix) — `l-etat` spelled
  "weberien" unaccented throughout, the sole outlier against
  "wébérien(ne)" elsewhere in the lane. Normalized (8 prose occurrences,
  no id-slugs touched).
- Finding 2 (MODERATE, **deferred**) — em dash `—` vs. ASCII `--` drift,
  inconsistent across and within 7 of the 10 files. Purely typographic,
  no functional impact identified (no evidence the renderer fails to
  normalize `--`). **Deferred** rather than fixed by a blanket
  find/replace across ~700 occurrences in committed content under time
  pressure — logged here as a scoped, low-risk follow-up (target: la-liberte
  and analyse-de-texte's em-dash-only convention).
- Finding 3 (LOW–MODERATE, **deferred**) — checkpoint-id naming style
  split (`cp-rN-rupture` generic vs. `cp-rN-<topic>` thematic) across the
  10 lessons. Internal ids, not student-facing; renaming would require
  touching lesson.md marker references too. **Deferred**.
- Finding 5 (informational only, **not a defect**) — misconception-id
  namespace inconsistency (`mc.philo.liberte.*` vs `mc.philo.la_verite.*`)
  traces faithfully to the upstream `skill_code` table, not to author
  drift; the critic itself flagged it as "not worth a content edit."

---

## 6. SVT deferral (owner decision 4 — unchanged, nothing touched)

No SVT file was modified this session, per the standing owner decision.
Deferred in full for a future SVT-focused session: summit conversion for
all 11 lessons, item-bank integrity (98% correct=A in file order,
mitigated at render by the global shuffle; ~92% length-tell, unmitigated;
10/11 files misconception-untagged), and the document-based
raisonnement/communication-graphique training the SVT épreuve weights at
75%. SVT cadre findings from the earlier R2 extraction remain logged-only,
unchanged.

---

## 7. Final campaign ledger

| Lane | Target | Actual | Status |
|---|---|---|---|
| PC | 25/25 | **25/25** | DONE — 1 named exception (atome-mecanique-newton) |
| Maths | 14/14 | **14/14** | DONE |
| Philo | 12/12 (plan's original target) | **10/12** | DONE — 2 named exceptions (l-histoire, le-bonheur), superseding the plan's target per mid-campaign evidence |
| SVT | 0/11 (by design) | **0/11** | Untouched, as decided |
| DB lane (RC-6) | Full chain or owner NO-GO | **Not run** | Owner-gated, pending Sitting 1–3 |

Non-SVT conversion total: **49/62** (25+14+10), plus 3 named exceptions
= 52/62 "resolved" (converted or honestly excepted), 2/62 pending owner
scope confirmation (`l-histoire`, `le-bonheur`), 11/62 SVT deferred by
design. Zero unresolved/unaccounted-for gaps in the non-SVT content lane.

---

## 8. What a future session should do first

1. **Schedule the three owner sittings for RC-6** — this is the only gap
   left that isn't a deliberate deferral. Nothing else blocks it.
2. **Owner Sitting 2**: confirm the `l-histoire`/`le-bonheur` scope
   reclassification (evidence is in the ledger's cadre-findings triage
   log); if confirmed, either convert both (research is already done — see
   `docs/sujets/philo/`) or add the "not tested for your filière" UI
   treatment and formally exclude them from `docs/cadre/curriculum/philo.yaml`.
3. **Length-tell calibration pass** (maths 36%, pc 53%, philo 8%) — a
   lighter-touch follow-up than the original campaign: for philo,
   deliberately keep the correct answer as the legitimate longest in a
   calibrated fraction of already-clean items rather than re-opening the
   whole bank; for PC/maths, apply the same discipline this campaign
   established for philo.
4. **Coherence Finding 2** (em-dash normalization) — mechanical, low-risk,
   good candidate for a dedicated small pass with its own validate+build
   gate rather than folding into content work.
