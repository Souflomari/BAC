# Dislike list — what bothers me about the current MVP

**Purpose.** Raw input for the codebase audit (Phase 0). Read alongside the
six agent files. Reconciled during the audit into `known-issues.md` and folded
into `pedagogy-auditor`'s scored backlog.

**How to use this file.**
- Rough capture. Bullets, half-sentences, fragments. Not an essay.
- One observation per bullet.
- Where useful, tag each bullet:
  - `[S]` symptom — "this feels wrong / annoys me / students get stuck here"
  - `[C]` cause guess — "I think it's wrong because…"
  - `[F]` proposed fix — only if a fix is obvious. Optional.
- It is fine for a bullet to be only `[S]`. Finding the `[C]` is the audit's job.
- Repeat is fine. The audit deduplicates.

**About the probes.** Each section below lists *probes* in italics — sharp
questions derived from the pedagogy framework. They are prompts, not findings.
Answer them when filling the section; if a probe doesn't apply, ignore it.

---

## 1. Content and explanations

*Explanations, course text, the "lesson" content.*

*Probes: Does each notion carry **both** a developed/narrative version (for
first contact) **and** a compressed précis (for revision), or only one? Do
explanations lead with the **why** — hook, motivation, history — or jump
straight to the formalism? Is the explanation causal/mechanistic ("why this
rule holds") or just a statement of the rule? Are common misconceptions
surfaced and confronted (predict-then-reveal), or bypassed in silence? Any
tangents, jokes, or decorative detail that do not serve the goal (seductive
details)? Is first-contact content segmented into processable chunks, or
dropped as a wall of text? Is diagram + step co-located, or do they sit on
different pages / require scrolling (split-attention)? Cadre de référence
status visible — "examinable" vs "in program but not examinable" — or
flattened?*

- [S] Lessons are short parts, Duolingo-style — you learn a short notion at a
  time. They don't add up to an actual curriculum that builds bac mastery.
- [S] Math explanations don't address the **why**. They don't help the student
  understand *why we have certain things* or what the main reasons behind them
  are.
- [S] SVT explanations don't feel sharp or well-explained enough.

## 2. Interactivity and visualization

*Animations that should be manipulables, missing simulations, passive
displays. Note the subject for each bullet.*

*Probes: **Maths** — are functions / derivatives / integrals shown via
**manipulable** representations (drag, predict, adjust), or passive animations
and static images? Are interactives wired to the symbolic form (curve ↔
equation ↔ numeric readout updating together), or is the visual disconnected
from the notation the bac actually tests? Any predict-before-reveal steps?
**PC** — any PhET-class simulations for waves, circuits, kinematics, or just
text + diagram? Three modes (conceptual model / procedural problem-solving /
experimental reasoning on TP data) all present, or only one? **SVT** — real
schéma-construction interactions (drawing, labelling), or just displayed
images? Génétique handled with maths-like worked examples, or thrown in with
the rest of SVT?*

- [S] Math doesn't feel interactive enough. It doesn't take the student and
  help them understand the concepts — it doesn't help them **visualize**.
- [S] SVT also lacks interactivity. Different domain than math/physics (less
  manipulable-math-object territory) but the same gap — not interactive, not
  sharp.

## 3. Practice, quizzes, retrieval

*The quiz / exercise flow. Distractor quality. Spaced review. Anything that
feels like grading rather than learning.*

*Probes: Are distractors built from common misconceptions, or just wrong
numbers? Is each quiz item diagnostic — does a wrong answer tell you **which**
wrong model the student is running — or only right/wrong? Spaced-repetition
review flow present, or only forward progression? Worked steps carry "why this
step?" self-explanation prompts, or pure exposition? In maths, do
self-explanation prompts target **method selection** ("why this approach, not
that one") or only definitions?*

- [S] Quizzes after the lessons are too simple. Not bac-level — they won't
  help a student actually master the baccalaureate.
- [S] The exams section is essentially "we ask some questions, then we give
  the answers". Not a learning experience.

## 4. Progression and scaffolding

*Order of difficulty, readiness, prerequisites, fading.*

*Probes: Worked example -> completion problem -> free problem fading present,
or static depth regardless of stage (expertise reversal)? Readiness check
before each notion with prerequisites, or cold start? Prior-knowledge
activation at the start of a lesson, or straight into new material?
Prerequisite frontier handled — i.e. when a 2bac notion depends on a 1bac /
tronc-commun notion ("what is a function" for ln/exp), does the site **teach**
that frontier or assume it? Is "back to basics" framed as sharpening, or as
demotion? Productive-failure boundary — does the student get to struggle on
the concept before it is explained, or is everything scaffolded first?*

- [S] Chapters feel "too disbanded" — just collections of notions per chapter,
  not an actual structured bac curriculum.
- [S] No sense of a real curriculum path from the start of 2bac to exam-ready.
  The notion-by-notion lessons don't aggregate into bac mastery.
- [S] Nothing about the basics. The site doesn't truly present or explain the
  basics to the student before moving to the actual lessons. Applies to math,
  physics, and SVT.
- [S] Within a chapter, progression doesn't feel right — chapters don't feel
  well divided, well presented, or well structured; they feel a bit random.
  *Not fully tested by me yet — flag for audit verification.*

## 5. Adaptation and per-student experience

*Per-student state, diagnosis, forgetting risk, "what to study today".*

*Probes: A "what to study today" surface, or the same content for every
student? Diagnosis — does the system know what the student is weak on, at
notion-level with a cause (missing notion / specific misconception / weak
prerequisite)? Forgetting-risk tracked, or does mastery sit at 100% forever?
The weakness map framed as **notion states**, not a student label?*

*Note: this entire surface is currently **absent**, not "implemented poorly."
"We don't yet have that part." The audit lens here is what's **missing**, not
what's broken.*

- [S] No diagnosis of whether the student has mastered the basics. The site
  assumes the basics are in place.
- [S] No spaced-repetition surface — nothing tells the student what they are
  about to forget.
- [S] No statistics on what's been mastered, what needs to be mastered, what
  is at risk of being forgotten.
- [S] No planning / "what to study today" surface.

## 6. Navigation and flow

*Routing, structure, dead ends, "I can't find X".*

*Probes: Can a student get to the next-best thing to do in one tap? Is the
filière / matière / notion hierarchy obvious in the URL and the UI, or buried?
Back / forward / resume behaviour — does the site know where the student left
off?*

- [S] The exams section is "not even well structured" — the way past exams
  are organized and presented feels weak.

## 7. Visual and UX

*Styling, typography, layout, density. Not "make it pretty" — what specifically
gets in the way.*

- [S] The website feels like an app put on a bigger screen — not a proper
  website. It doesn't feel like flow, it doesn't feel smooth. The display
  feels like an app on a bigger screen, not a real website.
- [F] Target aesthetic: web-native, the way Google's websites feel — clean,
  spacious, smooth.

*Cross-ref: see §8 (perceived sluggishness) and §11 ("doesn't feel modern").
Likely the same underlying issue manifesting in three places.*

## 8. Performance

*Slow pages, heavy bundles, hangs, crashes.*

*Probe: heavy embeds (GeoGebra, PhET) — if any — paid for in load time?*

*Note: not measured. The complaint here is **perceived** fluidity, not benchmarked
performance.*

- [S] On the site, when you click somewhere it takes a while to generate.
  Doesn't feel fluid. Doesn't feel quick.
- [S] "Things aren't connected together" — navigations feel discrete rather
  than continuous, like each click is a separate event instead of a flow.
- *Cross-ref: §7 (app-on-bigger-screen) and §11 (overall vibe). Same theme.*

## 9. Mobile

*Broken or awkward on phone.*

*Probes: works on a low-end Android with intermittent connectivity (the actual
Moroccan student reality)? RTL-capable, or hard-coded LTR (matters before the
Arabic pass)? Tappable targets, keyboard handling on math input?*

*Out of scope for this pass.* No mobile version exists yet. Web is the current
build focus; mobile (and a Mac desktop app) come later as separate platform
work. The auditor should not flag mobile issues — but should keep the eventual
mobile target in mind when shaping the web foundations (component patterns
that won't fight a future mobile build, sensible breakpoints, RTL-ready
styling).

## 10. Auth, accounts, data

*Login pain, progress not saved, state lost.*

*Probes: signup flow — `auth.users` separated from `public.profiles`, or
client touching `auth.users` directly? RLS enabled on every table, or unknown?
Progress and SR state survive logout / device change?*

- Surface UX works — signup, email confirmations, and changing preferences
  (e.g. filière) all function. No specific complaints at this layer.
- **Plumbing unverified — audit to inspect.** Open questions:
  `auth.users` vs `public.profiles` separation; RLS coverage on every table;
  logout state cleanup; cross-device progress sync. Treat unknown answers as
  worst-case per `supabase-architect`'s rules.

## 11. Anything else

*Free-form. Gut sense. "Something is off but I can't name it."*

- [S] Overall vibe feels slow. Doesn't feel recent. Doesn't feel modern.
- *Cross-ref: §7 and §8. This is the same underlying issue described from a
  third angle — the audit should treat §7 + §8 + §11 as a single theme, not
  three separate fixes.*

---

## What to keep

*Things in the current MVP I do **not** want the agents to "improve" away.
Distinctive choices that work, components you are proud of, custom flows
better than the obvious alternative, content you have invested in. Anything
listed here becomes a **preserve**, not a fix.*

- **Everything is up for grabs.** I somewhat like the current site, but I am
  open to all suggestions — there is nothing I am committed to preserving.
  The agents have a broad mandate to refactor, redesign, and rebuild as the
  audit and the scored backlog dictate. If something turns out to be worth
  keeping during the audit, surface it then; until then, no defaults to defend.

---

## Priorities

*Of everything above, the 3-5 items that bother me most. Rough ordering is
fine — the audit will refine the scoring.*

**Round 1 stated order:**
1. Website feels like an app on a bigger screen, not a real website (§7).
2. Chapters are disbanded — no actual bac curriculum, just notions per chapter
   (§4).
3. Lessons are too short / Duolingo-style with quizzes too simple — doesn't
   build bac mastery (§1, §3).
4. Exams section is a poorly-structured Q-and-A, not a learning experience
   (§3, §6).

**Round 2 also raised (rank against the above — to confirm with audit):**
5. The basics are neither diagnosed nor taught before lessons — the
   prerequisite frontier is invisible (§4, §5). This is a big one given the
   "you can't learn ln/exp without functions" point we worked out earlier.
6. The whole per-student adaptation surface is absent — no SR, no statistics,
   no "what to study today", no forgetting-risk view (§5).
7. Math and SVT lack interactivity / visualization — students aren't shown
   *why* or helped to *see* (§1, §2).

**Round 3 cross-cutting theme:**
The §7 + §8 + §11 cluster — "app on a bigger screen / perceived sluggishness /
doesn't feel modern" — is one underlying issue. Whichever priority position it
takes, treat it as one item, not three.

---

## Notes for the audit

*Pre-filled context the auditor needs. Add to it; do not delete.*

- **Current focus is the website only.** Mobile and a future Mac desktop app
  are deferred — observations and fixes target the web experience. No mobile
  version exists yet.
- **Stack (assumed, confirm during audit):** Next.js + Supabase. Solo dev.
- **MVP scope (locked):** 2ème Bac only; filières SM-A, SM-B, Sciences
  Physiques (PC), SVT; scientific-core matières (Mathématiques, Physique-Chimie,
  SVT, plus Sciences de l'Ingénieur for SM-B); French first, Arabic later but
  i18n scaffolding (RTL-capable) wanted from the start.
- **Taxonomy depth:** down to *Notion* (atomic examinable skill).
- **Source-of-truth for curriculum:** the official Cadres de référence (MEN),
  cross-validated against AlloSchool's tree. AlloSchool content itself is not
  to be ingested as course material — only official MEN documents and the
  cadres de référence are.
- **Past-exam corpus:** official MEN exam documents only (examen national +
  examen régional, sujets + official corrigés). Aggregator commentary and
  teacher-made corrigés never enter.
- **MVP-without-AI commitment:** the v1 scheduler and diagnosis are
  algorithmic (FSRS/SM-2-style + DAG-aware), no LLM calls in the runtime path.
  In-app AI features are a deferred layer.
- **Student population context:** Moroccan bac students, predominantly on
  mobile, often low-end Android, sometimes intermittent connectivity. This is
  not edge-case — it is the primary device. (Web is the current build focus,
  but the mobile reality still shapes the web product.)
- **Target architecture:** six agents — `bac-curriculum`, `pedagogy-auditor`,
  `learner-model`, `supabase-architect`, `exam-ingestion`, `nextjs-frontend` —
  per the diagram in `agent-workflow-v2.mermaid`. The dislike list, the repo
  zip, and the Supabase schema are the three audit inputs.
- **Real student data:** assumed to exist on the live Supabase project until
  the audit proves otherwise. All schema work is brownfield, expand-contract.
- **Performance complaint is perceptual, not measured.** §8 captures
  *perceived* sluggishness ("takes a while to generate", "doesn't feel fluid")
  rather than benchmarked slow pages. The audit may want to measure as a sanity
  check.
- **"What to keep" was answered: nothing is locked.** The user explicitly
  stated everything is up for grabs. The agents have a broad refactor mandate;
  the audit may still surface items worth keeping during inspection, but there
  are no pre-declared preserves.
- **Open question for audit:** does the existing app already have any
  spaced-repetition / readiness-check / per-student state, or is that all
  greenfield within the brownfield?

- 
