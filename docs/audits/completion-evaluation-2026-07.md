# Whole-app evaluation #2 — what stands between here and a complete bac app

> **Commissioned:** 2026-07-16 (owner), after the July remediation campaign
> closed (`docs/audits/ux-bac-readiness-closure-2026-07.md`).
> **Question (owner):** "Evaluate genuinely what the app still needs — its
> weaknesses, its strengths — to become a complete bac app that actually
> replaces extra courses and is sufficient for a student to get his bac."
>
> **Method.** Four independent read-only ground-truth passes over the *current*
> repo (content coverage per subject; the adaptive-tutor/persistence stack —
> built vs live vs dark; exam fidelity per subject; the student journey + the
> QA harness), read against the full `docs/Product/VISION.md`, the July-11
> evaluation (`ux-bac-readiness-evaluation-2026-07.md`), and `HANDOFF.md`.
> The single load-bearing surprise (the client write-path has zero callers)
> was verified by hand. This is an assessment only — nothing was changed.
> The sequenced execution plan is a separate document (the methodology),
> because parts of it are owner-decision-gated (see §8).

---

## Bottom line

**The July verdict was "a superb library with a reading room — not yet a
tutor." That is now half-wrong in the good direction: the library became an
*exam-sourced practice* library, and it is excellent. But it is still not a
tutor, not an exam trainer, not a complete curriculum, and not a live product
— and those four are exactly the distance to "replaces extra courses and gets
the bac."**

The July-11 evaluation named four gaps. The remediation campaign closed three
of them for the three non-SVT subjects:

- **Gap 1 (the production/exercise layer) — closed for 49/62 lessons.** The
  attempt-first, real-sujet-sourced summit + checkpoints + misconception-tagged
  items pattern — which existed in *1 of 61* lessons in July — is now in
  **maths 14/14, PC 25/25, philo 10/12**. Every `r-bac` cites a real national
  sujet (year/session/filière/barème), adversarially verified.
- **Gap 3 (content holes / mis-scoping) — largely closed.** Trig-limits landed;
  the acute PC omissions were filled; filière-gating and cadre extraction were
  done; the maths/philo/svt cadres exist (as PROPOSITION).
- **Gap 4 (answer-key bias) — closed.** Render-time shuffle makes position
  uniform; the length-tell was rebalanced (now over-corrected in philo — a
  minor residual, §7).

What remains is **Gap 2 (the tutor engine) — untouched** — plus three things
the July-11 rubric did not fully price, because they only become the frontier
once the practice layer is real: **SVT as a whole subject**, **per-épreuve
(not per-notion) exam rehearsal**, and the **guided/engagement layer**. Plus a
set of **owner decisions** (scope authority, the philosophy-in-Arabic reality)
that gate correctness.

A fair one-line characterisation: **the app is now an excellent, exam-sourced
understanding-and-practice library for maths/PC/philo — with a complete but
unpowered tutor engine sitting behind an off-switch.**

---

## What is genuinely strong (verified against current files — do not undersell)

- **The deep teaching still holds, and the corpus grew into it.** Décortiquer,
  mechanism-*why* (prove-before-use), expert reasoning shown out loud, and
  misconception confrontation in prose were the July strength; they are now
  applied across the whole converted corpus at a consistent standard. This is
  the hardest half of the VISION and it is done.
- **The production layer is real, and it is sourced.** 49/62 lessons carry an
  attempt-first `r-bac` drawn from a **verified** past-national sujet (PC bank:
  29 entries, 2008–2025, second-agent diff-verified; maths: 4 source exams,
  SM vs SExp distinguished; philo: authentic Arabic artifacts), plus a fresh
  anti-memorisation variation, commit-gated checkpoints/rupture-gates, and
  per-question barème tags transcribed from the scan margins. Misconception
  tagging: maths 14/14, PC 23/25, philo 10/12.
- **The QA harness is a rare, load-bearing asset.** `validate-content.mjs`
  (author gate: KaTeX-in-prose-and-YAML, media-marker resolution, the sourcing
  gate, exactly-one-correct, converted-lesson contract), `dom-truth.mjs`
  (~160 checks against *computed style, not class names*, self-syncing from the
  token sources, plus honest-state guards, attempt-first guards, contrast in
  both real themes, the shuffle sweep, filière-narrowing, and a
  build-stamp==HEAD tripwire), and `item-stats.mjs` (position + length-tell
  measurement). This is a genuine honesty backbone; most projects have nothing
  like it.
- **The adaptive engine's *hard* half is already built and unit-tested.**
  `learner-model.ts` (misconception Active/Cleared/Unassessed classification,
  five honest mastery display-states, a stated 21-day review threshold, and the
  `misconception-active → reprise → revision → parcours` next-up ladder) is a
  pure, tested module; the read hook and the whole dashboard are wired to it;
  the schema (append-only event journal + materialised progress + misconception
  states, all with RLS and service_role-only write RPCs) is drafted and
  self-verifying. The remaining work is *wiring and a gated cutover, not a
  build*.
- **Honest-state discipline is upheld and is a strength.** No fabricated
  progress, streaks, or %; `getStudentState()` returns null rather than a
  localStorage crutch; every dashboard component is already written against the
  real `StudentState` contract — so when data lands, the app needs *data, not
  redesign*.
- **The design system and calm UX are substantial and enforced** (DESIGN-BIBLE
  + ~13 specs; the calm-core / periphery-only-engagement principle; dark mode
  first-class; 390px zero-scroll and dual-theme contrast both instrumented).

---

## The gaps between here and "complete" (ranked, with ground-truth evidence)

### Gap A — It is still a library, not a tutor: the adaptive engine is dark

This is the VISION's core — *"it knows the student"* and *"it leads."* Today the
app has no accounts, no memory, no diagnosis, no personalised "what to do
today," no mastery-map filling in, no spaced resurfacing. The guided front door
(*"here's today's session"*) is a deterministic pointer to the first built
notion. The engine bottoms out at an off-switch: `NEXT_PUBLIC_AUTH_MODE`
defaults to `off` and is set nowhere.

The gap has **two halves, and the split matters for who has to be present:**

- **Autonomous (no owner needed):** the client **write-path emits nothing** —
  `recordAnswerEvent`/`recordChapterVisit` exist but have **zero callers**
  (verified: only the definition in `emitter.ts` and a re-export in `index.ts`).
  `McqItem`/`CheckpointItem` compute correctness locally and never record it.
  Until the emitter is wired into the item/checkpoint/chapter components, the
  tables stay empty *even in live mode*. There is also **no e2e/round-trip
  test harness** (only pure unit tests). Both are frontend content-lane work.
- **Owner-gated (mode B, human-synchronous):** apply the draft migrations
  (048/049/050), deploy the `record-notion-event` edge function, provide the
  env vars, flip auth to live, and run the staging→prod cutover behind a
  passing branch-test and the (still-unrun) production-sync check. RLS and
  service_role gating are already correct in the drafts.

**Consequence:** every VISION capability that depends on knowing the student —
diagnosis, the personalised plan, the filling mastery map, spaced review, the
guided session arc — is inert until this lands. It is the single highest-leverage
item, and most of the risk is retired (the model is tested; the schema is
drafted and gated).

### Gap B — SVT is a hole on every axis, including the one that decides its grade

SVT is **0/11 converted** (no `exercises.yaml`, no `checkpoints.yaml`), has **no
sujets bank at all** (`docs/sujets/svt/` does not exist), and its items are
**untagged in 10/11 lessons** (only `moyens-de-defense` carries misconceptions).
It is currently **owner-frozen** (`svt.yaml`: *GELÉ — documentation only*).

Most important: the SVT épreuve is **~document-based scientific reasoning +
graphical communication** (restitution + *raisonnement* + *communication*),
and SVT is **coefficient 7 in its own stream**. The app trains this format
**nowhere** — SVT is taught as lessons + single-best-answer MCQ recall, which is
the opposite of *analysing a document and exploiting graphs/data in writing*.
Per the VISION's own per-subject note, SVT needs *"worked argument + schema
construction"* (draw/label, reconstruct the mechanism), not displayed images and
recall. This is the largest content lane and it requires a **new capability the
app does not yet have** (document-reasoning exercises + schema-construction
interactions), not just a repeat of the maths/PC conversion.

### Gap C — The app trains per-notion, never per-épreuve

There is **no timed mode, no full-paper assembly, no mock exam, and no
self-scoring against a barème** anywhere in the app (verified by grep + the
renderer's explicit *"no timers, no scores"*). Each `r-bac` is a single sub-part
excerpt of one exercise — never the assembled 4–5-exercise, 3h/4h paper the
student actually sits. The pieces to build this already exist: **verified full
sujets** in the banks and **per-question barème tags** in the content. What is
missing is the *assembly* (stitch a real paper), the *surface* (a timed,
distraction-managed exam mode — which must respect the calm core), and *scoring*
(self-grade against the transcribed barème toward a total /20). For "sufficient
to get his bac," exam-condition rehearsal is a real, distinct capability, not a
nicety.

### Gap D — The guided arc and edge-engagement are absent (and depend on Gap A)

The VISION is *guided-primary* ("the app leads") and says the return/progress/
milestone engagement at the periphery *should be strong* (rewarding real
progress, never usage). Today: `MilestoneSlot` renders null; there is no
streak/goal/daily-nudge; the mastery map is a table of contents; the "session"
is a pointer, not a planned arc. This is **correctly** gated on real student
state (honest-state discipline forbids faking it) — but it is a gap to
"complete," and it unlocks only after Gap A. It is the difference between *a
place to read lessons* and *a tutor that runs your day*.

### Gap E — Owner-decision debt: scope authority and philosophy-in-Arabic

- **Only the PC cadre is owner-authoritative.** `maths-sm`, `maths-sexp`,
  `philo`, and `svt` cadres are all **PROPOSITION** (three validation gates each
  pending); `philo` still carries contested notions; `svt` is frozen. Every
  scope judgment for those three rests on an unvalidated boundary.
- **Philosophy is reasoned in French; the exam is Arabic composition.** The app
  does the honest thing as far as it goes — it surfaces the **authentic Arabic
  artifact** (سؤال/قولة/نص) verbatim with a labelled French working translation,
  and it teaches the نص method + the 4-moments /20 rubric — but it trains **no
  Arabic writing**, and only the نص format has a method lesson (سؤال and قولة get
  none). Whether "complete for the bac" requires Arabic-composition training is a
  **product decision only the owner can make** (and it implies an AR/RTL
  capability the app does not have).

---

## Per-subject readiness (updated from July-11)

- **PC — strongest lane.** 25/25 converted, 24/25 on verified 2008–2025 sujets,
  barème transcribed, items tagged 23/25. Missing only: the two untagged item
  files (`controle-catalyse`, `transformations-deux-sens`), one honestly
  unsourced notion (`atome-mecanique-newton`), and per-épreuve rehearsal (Gap C).
- **Maths — excellent content, thin sourcing base, format-limited.** 14/14
  converted and tagged, but only **4 source exams** back the bank and 2 slugs
  lack a dedicated sujet (excerpt-sourced). Filière-gating is cosmetic
  (never-gates golden rule) and the SExp cadre would *exclude* two SM-only
  chapters — an owner-validation item. No per-épreuve rehearsal.
- **Philo — method-aware, honestly sourced, French-vs-Arabic unresolved.** 10/12
  converted; the new `analyse-de-texte` méthode lesson is a highlight; but 6/12
  sujets are verified only against **secondary reproductions** (not the official
  scan), 2 notions stay unconverted by scope (owner-pending), and the
  Arabic-composition question (Gap E) is open.
- **SVT — the hole.** See Gap B. Coefficient 7 in-stream, trained as recall,
  épreuve format absent. This is the biggest single lift to "complete."

---

## Smaller integrity items (cheap, worth a cleanup pass)

- 2 PC item files untagged (`controle-catalyse`, `transformations-deux-sens`).
- SVT items untagged (10/11) — folds into the SVT lane.
- Philo sourcing: upgrade the 6/12 secondary-reproduction verifications to the
  official MEN scan where reachable.
- Length-tell out of band: philo **8%** (over-corrected past the 25–35% target),
  PC **53%**, maths **36%** — a light calibration pass, not a rebuild.
- The 2 philo scope-exception notions (`l-histoire`, `le-bonheur`) await owner
  confirmation of the reclassification.
- Stale `GO_LIVE.md` (Flutter-era) — delete or rewrite for the Next.js cutover.

---

## What completion requires — the lanes (inventory; sequencing in the methodology)

Marked by **which kind of work** each is (RULES §0: autonomy where failure is
cheap, gating where it is catastrophic).

1. **Engine → live.** *Autonomous:* wire the emitter into item/checkpoint/
   chapter components; build the e2e round-trip harness; exercise it in mock
   mode. *Owner-gated:* production-sync check → promote migrations 048/049/050 →
   deploy edge fn → env + `AUTH_MODE=live` → staging e2e → authorised prod push.
2. **SVT → built.** *Owner-gated first:* validate the SVT cadre + unfreeze.
   *Then autonomous:* build the SVT sujets bank (real document-based sujets);
   design the document-reasoning + schema-construction exercise type (new
   capability); convert 11 lessons to the attempt-first layer on the SVT
   teaching profile; tag items.
3. **Per-épreuve rehearsal → built.** *Autonomous:* full-paper assembly from the
   verified banks; a timed, calm-core-respecting exam surface; self-scoring
   against the transcribed barème toward a total /20.
4. **Guided arc + edge-engagement → built.** *Autonomous, but unlocks after
   lane 1:* the planned "today's session" arc; the mastery map filling in; the
   milestone/streak/daily-nudge periphery, rewarding real progress only.
5. **Owner decisions → resolved.** Cadre validation ×3 (maths/philo/svt);
   the philosophy-in-Arabic direction; SVT unfreeze; the 2 philo scope notions.
6. **Integrity cleanup → done.** The §7 items.

---

## The forks that sequence this (owner calls — see the methodology)

These are the decisions the plan branches on; they are the owner's to make
(RULES §1 — product/scope judgment, not code review):

1. **Priority of this next push:** make it a *tutor* (engine live) vs. make it
   *complete* (SVT + exam rehearsal) first — or a defined interleave.
2. **SVT:** unfreeze and build it fully now (large lane, new capability), or
   keep it frozen and ship the rest first.
3. **Engine cutover timing:** run the autonomous prep now regardless; schedule
   the owner DB sittings soon, or defer the go-live.
4. **Philosophy-in-Arabic:** train Arabic composition (major lane + AR/RTL), or
   stay French-method-transfer with the Arabic artifact surfaced (current).

---

## Retractions and Corrections

_None yet. Corrections to this assessment are appended here, never overwritten
(RULES §6)._
