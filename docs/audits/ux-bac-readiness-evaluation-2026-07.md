# Whole-app evaluation — does this build science understanding, and is a student bac-ready?

> **Commissioned:** 2026-07-11, after the B2 visuals + B3/B4 items campaigns closed.
> **Question (owner):** "Evaluate genuinely how we build fundamental understanding
> of science. Do we actually build an understanding of physics, mathematics? Do we
> achieve fundamental mastery of the exercises? Can a user just use our app and have
> himself ready for the baccalauréat — or not?"
>
> **Method.** Seven independent read-only critic passes against the VISION
> (`docs/product/VISION.md`) and the cadre (`docs/cadre/cadre.yaml` +
> `docs/cadre/curriculum/pc-physique-chimie.yaml`), each verifying — not
> inheriting — the D9.5 audit's priors against the *current* files: PC fidelity
> (×2, corroborating), maths/svt/philo fidelity, fundamental-understanding
> pedagogy, the graduated ramp & exercise mastery, product/system readiness
> (what's wired vs stubbed), and diagnostic item quality. Plus orchestrator
> quantitative checks (answer-key distribution, ledger counts, render behaviour).
> This is an assessment only — nothing was changed.

---

## Bottom line

**No — a student cannot yet use this app alone and walk into the bac ready. But
the hardest, highest-value half of the job is genuinely done, and done well.**

The app builds **real fundamental understanding**. Across all four subjects, the
"take-it-apart" teaching — mechanism made obvious (the *why it's true*, not just
the *what*), concrete-before-abstract, expert reasoning shown out loud, and wrong
physical/mathematical models surfaced-and-broken in prose — is executed at a
high and unusually consistent standard. This is the part that is hardest to build,
hardest to fake, and the reason the app is more than a textbook. On the owner's
first question — *do we actually build understanding of physics and mathematics?*
— the answer is **yes**.

What stands between that and **bac-readiness** is three layers that are largely
absent or unpowered, plus one cheap integrity defect:

1. **The exercise/production layer is painted on.** The thing that converts
   understanding into exam marks — climbing a ramp to *real past-bac problems* and
   *producing* full multi-part solutions — exists in **1 lesson of 61**. The
   entire practice surface is single-answer MCQ; the bac is open-response.
2. **The tutor engine that "knows you and leads you" is architecturally stubbed.**
   No accounts, no memory, no diagnosis, no personalised "what to do today," no
   spaced resurfacing. It is spec-complete and unpowered — one human-gated
   persistence unlock away, but not real today.
3. **Real content holes + mis-scoping** at high-frequency exam topics (most acute
   in PC; a filière mis-scope in maths; a wrong-skill gap in SVT).
4. **A diagnostic-integrity defect:** a severe answer-key position/length bias lets
   a test-wise student score well without reading. Cheap to fix, currently live.

A fair one-line characterisation, borrowed from the system-readiness pass:
**the app is a superb library with a reading room — not yet a tutor.**

---

## What is genuinely strong (do not undersell this)

These are not participation trophies; each was verified against the VISION's own
notion-anatomy standard and repeatedly across independent passes.

- **Décortiquer / mechanism-why.** Lessons *prove*, they don't assert:
  `calcul-integral` proves why the choice of primitive constant cancels *before*
  using it; `derivabilite` derives `(uv)'` from the taux d'accroissement and
  explains why it isn't `u'v'`; `esterification` shows `n₀` cancelling out of `K`
  so `τ≈2/3` is earned. The explanation never skips the step where a student
  would get lost.
- **Misconception confrontation in prose is real** — and PC genuinely breaks the
  wrong model rather than presenting the correct one cleanly: Aristotelian
  "motion needs a force," "hotter is always faster," "the catalyst makes more
  ester" are each voiced, run to their consequence, and refuted.
- **Item feedback is diagnostic where reached.** Of 3,633 distractor feedbacks,
  ~1 is generic — every other names the *specific* error ("divides by the upper
  bound instead of b−a"; "confuses Stoic doctrine with passive fatalism"). The
  writing quality is uniform across subjects and across the B3/B4 campaigns.
- **No off-syllabus content survives in PC** — the binding priority-1 axis. The
  worst prior breaches (activation-energy in `controle-catalyse`, the ODE-integration
  overshoot, the E-field/B-field scope-swap) are all fixed.
- **Honest-state discipline is upheld rigorously** — and it is a strength, not a
  gap. No fabricated progress, no fake `%`/streak/"maîtrisé", `getStudentState()`
  returns `null` rather than a localStorage crutch, milestone slots render nothing
  rather than a placeholder. Every UI component is already written against the real
  `StudentState` contract, so when data lands the components need *data, not
  redesign*. That is the opposite of technical debt.
- **The inline MCQs are genuinely attempt-first** (commit a choice → reveal), and
  the calm, bounded, single-thing-at-a-time reading experience is real.
- **The flagship `pc/rlc-serie` proves the full standard is achievable** — real
  checkpoint commit-gates, an attempt-first bac summit, a fresh anti-memorisation
  variation, reasoning gated behind the student's own attempt. It exists once.

---

## The three structural gaps between here and bac-ready

### Gap 1 — The exercise/production layer (turns understanding into marks)

This is the most direct answer to *"do we achieve fundamental mastery of the
exercises?"* — **not yet.**

- **The top of the VISION ramp is built in 1 of 61 lessons.** Only `pc/rlc-serie`
  has an attempt-first, multi-part bac summit + a fresh variation. The other 60
  print a worked solution inline, then drop orphaned "À toi de jouer" prompts with
  **no solution, no reasoning, no feedback** — a struggling student who stalls is
  abandoned, the opposite of the tutor persona. `probabilites-conditionnelles`
  literally prints a table *describing* the past-bac and fresh-variation rungs it
  does not deliver.
- **The practice surface is 100% MCQ (1,211/1,211 items).** The bac grades
  open-response, multi-part *production*. MCQ builds recognition-among-four; the
  exam demands recognition-from-blank and sustained written work. Even the 51
  difficulty-5 items (~4%) are single one-tap recognitions, not problems.
- **Zero real past-bac sourcing anywhere.** Every summit is explicitly labelled
  "original — non un sujet officiel." By the project's own template, an unsourced
  summit = "notion NOT DONE" — so 61/61 fail that box.
- **Volume is a diagnostic sprinkle, not a mastery regimen.** ≥3 items/chapter is
  a fluency floor; mastery of the exercises needs a bank of full *problèmes*
  worked then practised with fading and fresh variations.

**Predict-then-confront is also rhetorical outside the flagship:** the "prends
position" habit is authored corpus-wide, but the *commit* is never enforced with a
gate, so the confront lands softer than a committed wrong answer would make it.

### Gap 2 — The "knows you + leads you" engine is stubbed

Everything bottoms out at one line: `getStudentState()` → `return null`
(`web/src/lib/student-state.ts:47`). There is **no backend wired** — no auth
(default mode `off`), no persistence, no network calls, no attempt recording. The
schema exists only as unshipped drafts (`docs/drafts/migrations/048–050`).

| Capability | Status |
|---|---|
| Per-student persistence (attempts, mastery, progress) | **Absent** |
| Real accounts / auth | **Absent** (`/connexion` = "pas encore ouverte") |
| Guided "today's session" as a planned arc | **Absent** — a deterministic pointer to the most-recently-edited lesson runs instead |
| "What should I do today" (personalised) | Predicate-4 only (first built lesson in order); the misconception/reprise/révision ladder is spec'd, never fires |
| Mastery map filling in | Renders as a **table of contents**; the stateful version is spec'd |
| Bac-readiness % | Absent (and deliberately banned as anti-honest-state) |
| Spaced repetition / reprise | Spec'd only |
| Misconception routing (aggregation) | Immediate feedback runs; **nothing persists which distractor was chosen** |
| Retention loop (streaks/goals/milestones) | Absent / spec'd only |

What a student actually gets today: a beautifully disciplined, honest **library** —
read any of ~61 lessons, get immediate misconception-named feedback on individual
questions — with a session card pointing at whichever lesson was edited last. What
they do *not* get: an account, any memory, a diagnosis of their misconceptions, a
readiness signal, spaced resurfacing, or a real personalised plan. The VISION's two
load-bearing verbs — **leads** and **knows** — are stubbed at a single `return null`.

### Gap 3 — Content holes and mis-scoping (per subject below)

Real exam content is missing or mis-routed, concentrated in PC (the one
cadre-bound subject, so its holes are *provable*) with a structural mis-scope in
maths and a wrong-skill gap in SVT.

---

## Per-subject bac-readiness

**Physique-Chimie — strong spine, holed by omission (~6.5/10; ≈70–75% of a paper
attemptable).** Nothing off-syllabus survives (the priority-1 axis is clean, and
6 of the 10 D9.5 Tier-1 items are fixed). But high-frequency exam content is
missing outright:
- *Blockers:* **acid-base pH-metric titration** (equivalence, indicator choice,
  distribution diagram — a near-every-session chemistry exercise, entirely absent);
  **chute verticale avec frottement fluide + méthode d'Euler** (absent, with a
  distractor pointing to content "étudié ailleurs" that exists nowhere);
  **satellites / Kepler / gravitation universelle** (only a passing analogy).
- *Majors:* **résonance mécanique** (R6 of `systemes-oscillants` teaches the RLC
  chapter's "entretien" instead); **acoustic diffraction + milieu dispersif**;
  **oscillator/torsion energy** (`aspects-energetiques` delivers generic 1ère-Bac
  TEC instead; torsion PE `½Cθ²` appears nowhere).
- *Systemic:* experimental-data reading — weighted 15% on the exam — is drilled
  almost only in the electricity chapters; chemistry item banks present no dosage
  curves / conductance tables / protocols.

**Maths — excellent content, mis-scoped and format-limited.** Mechanism-first
proofs are exemplary. Two problems block bac-readiness: (1) **no filière-gating** —
maths is authored at Sciences-Maths depth and shown to all filières, so PC/SVT
students (where maths is coefficient 7) are served two entirely SM-only chapters
(`arithmetique`, `structures-algebriques`) with only a cosmetic unit label; and
(2) a real content hole — **trigonometric limits are absent** (`lim(sin x/x)`, the
trig-limit toolkit). *Correction to the D9.5 prior:* produit vectoriel and
dénombrement are in-syllabus for sciences-exp, so the over-exposure is narrower
than previously feared.

**SVT — accurate and clean, but trains the wrong skill.** Factual fidelity is high
(genetics-as-maths logic is a highlight; immunology carries a proper misconception
ledger; no off-syllabus overshoot). But the épreuve is **75% document-based
raisonnement + graphical communication**, and the item bank is thin (~5–6
MCQs/chapter) and almost never puts a document, graph, pedigree, or schema in front
of the student to interpret or produce. A student could master every SVT MCQ here
and remain untrained on the 15/20 that decides the grade.

**Philo — argument-strong, method-aware, two gaps.** Attribution is clean (~40
doctrine/author pairings, zero misattributions), dissertation *method* is actively
taught via meta-items, and the old answer-key bias is fixed for the core ramps. The
gaps: **analyse de texte is taught nowhere** (a whole selectable exam format
missing), and depth (5–7 philosophers/notion) may over-serve a coefficient-2
subject.

*Cross-cutting:* there is still **no official cadre for maths/svt/philo**, so every
scope judgment for those three is provisional — extracting those boundaries is the
single highest-value structural fidelity fix, and would make the maths
filière-gating enforceable rather than cosmetic.

---

## The cheap, high-value integrity defect: answer-key bias

The MCQ renderer maps choices in **file order with no shuffle**
(`McqItem.tsx` — `choices.map(...)`, no sort/random). So the answer-key position is
exactly what the student sees. And the keys are badly skewed:

- **Overall: 58% of correct answers are choice A** (709/1,211).
- **Legacy items: 77% A** — PC legacy **91%**, SVT **98%** (63 of 64 correct = A).
- B4-added items improved to 47% A, but **reintroduced a length tell in philo:
  97% of B4 philo correct answers are the single longest option.**

A test-wise student can score well in PC/SVT by always picking A, and on B4 philo
by always picking the longest option — **without reading**. This silently
undermines the items as both practice and diagnostic. The fix is mechanical
(shuffle at render with a stable per-item seed, and/or rebalance keys and option
lengths) and is the highest value-per-effort item in this whole evaluation.

Relatedly, the **diagnosis is dead data**: only 5/61 item files carry a routable
`misconception:` tag, and the renderer reads none and persists nothing. Every
distractor names its error in *prose* — which teaches in the moment — but nothing
about *which* misconception a student exhibited survives a single render. "Every
interaction is diagnostic" is currently true as feedback, false as data.

---

## What this implies for what to build next (options, not a decision)

Presented in rough value-per-effort order, for the owner to choose among — no work
is started on the basis of this evaluation.

1. **Cheapest, ship-now:** de-bias the answer keys / shuffle at render, and add the
   missing PC content that is pure omission (titration, chute-with-friction/Euler,
   Kepler/satellites, résonance, diffraction, oscillator energy) — the pattern for
   all of these already exists in neighbouring chapters. Removes the two most
   embarrassing "a smart student games it / a diligent student can't attempt a whole
   exercise" failures.
2. **The exercise layer (Gap 1):** generalise the `rlc-serie` attempt-first
   summit + fresh-variation pattern to all 61 lessons, and source real past-bac
   problems (owner-supplied sujets). This is what turns "understands the concept"
   into "masters the exercise" — the owner's core ask.
3. **Maths filière-gating + the maths/svt/philo cadre extraction** — makes scope
   correct and enforceable rather than provisional.
4. **The tutor engine (Gap 2):** the human-gated persistence unlock (auth + the
   event-log/progress tables from drafts 048/049), then wire `McqItem` to emit the
   chosen distractor, then the read-layer classification that lights up the mastery
   map, reprise, and a real "what to do today." This is the largest lift and the one
   that makes it a *tutor*; it is also the one the whole codebase is already built
   to receive.

**Framing for the decision:** the app today is an excellent *understanding-builder*
and an honest *library*. The gap to "a student can get bac-ready here alone" is
concentrated in the *practice/production layer* and the *adaptive engine* — both
more mechanical and more known than the deep-teaching work that is already done.
The foundation is sound; what remains is real but largely additive.
