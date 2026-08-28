# known-issues.md — reconciled backlog

The dislike list's bullets, each reconciled against what the audit
actually found. Every entry carries: the symptom as stated, the cause
the audit identifies (or "unconfirmed" where it needs a runtime check),
the agent that owns the fix, an audit-level severity, and the *shape*
of the fix (not the implementation — that's `pedagogy-auditor`'s and
`nextjs-frontend`'s output, downstream of this document).

This is **not** the scored backlog. The `pedagogy-auditor` agent
produces that by applying its severity × reach × effort scoring with
`exam_frequency` as a reach input. This document is the audit-grounded
*input* to that process.

---

## Reading guide

**Severity scale, audit working definition.** This is provisional —
`pedagogy-auditor` will calibrate against real student data once the
diagnosis layer ships.

- **sev-1** — security risk, data loss risk, or a complaint that
  uniformly afflicts the whole product (the dislike list's headline
  items go here).
- **sev-2** — defect that meaningfully degrades the product for a
  substantial fraction of users / sessions.
- **sev-3** — defect that needs to be fixed eventually but doesn't block
  the next sprint.

**Owner labels.** The six agents plus `infra` for cross-cutting
operational work and `human` for decisions the audit can't make.

**Status labels.**
- *confirmed by audit* — symptom and cause both verified against the
  code / migrations.
- *partially confirmed* — symptom acknowledged; cause is the most
  likely explanation but not directly observable in the codebase
  (typically a runtime / perceptual claim).
- *unconfirmed* — symptom stated, but a runtime check is needed to
  decide whether the audit's hypothesis is correct.

---

## A. The cross-cutting cluster — dislike list §7 + §8 + §11

The dislike list explicitly groups these three as one theme. The audit
agrees and treats it as a single sev-1 finding.

### A-1. The product feels like a mobile app on a bigger screen
**Source.** §7, §8, §11. The dislike list itself flags these as a
single underlying issue.
**Status.** *Confirmed by audit.*
**Cause.** The MVP is Flutter Web. The compositor renders to
`<canvas>`, not the DOM; scrolling is implemented in Dart; the initial
bundle includes the Dart runtime; routes are not server-rendered. Every
artefact of "this is a mobile app rendered in a browser" comes from
this. The complaint is a *textbook* description of Flutter Web.
**Owner.** `human` (the stack decision in
`schema-reconciliation.md` §6), then `nextjs-frontend` or a renamed
`flutter-frontend` depending on the call.
**Severity.** sev-1.
**Fix shape.** Three viable strategies in §6 of the reconciliation
doc. Pick one before sequencing anything downstream.

---

## B. Content and explanations — §1

### B-1. Duolingo-style short notions do not aggregate into Bac mastery
**Source.** §1, restated in §4 ("Chapters feel 'too disbanded'") and
the §1 + §3 + §4 priority cluster.
**Status.** *Confirmed by audit.* The MVP's history (per
`PROJECT_STATUS.md` §17) shows this is a known problem in active
remediation: 64 SMA + SMB skills, then PC + SVT, have been restructured
into full Bac-style papers in `skills.exam_paper` (migrations 029–038).
The complaint pre-dates that work but is partially mitigated by it.
**Cause.** Two layers:
- (data) The 3-level taxonomy with no Unité layer flattens the
  curriculum's structure. A student sees a list of skills, not a
  coherent unit-by-unit syllabus.
- (content) The original v1 cards model was Duolingo-shaped. The v2
  long-form lessons are the explicit response but not every skill has
  v2 yet (32 SMB chapters were generated v0 by pattern, still pending
  SME review).
**Owner.** `bac-curriculum` for the Unité layer (§2.1 of reconciliation).
`pedagogy-auditor` for the content audit per-skill. Implementation:
`nextjs-frontend`.
**Severity.** sev-1.
**Fix shape.** The Unité table lands as a schema addition. The
frontend exposes a "syllabus" view at the Matière → Unité → Chapitre →
Skill grain (not just Subject → Skill). Author the missing structure;
do not author content yet.

### B-2. Math explanations don't address the "why"
**Source.** §1.
**Status.** *Partially confirmed.* The audit can verify the structural
shape of v2 lessons (paragraph / formula / callout / example /
interactive / checkpoint / try_it blocks) but cannot judge pedagogical
quality from migration files alone. `pedagogy-auditor`'s rubric is the
right tool to score this — and the rubric exists pre-audit.
**Cause hypothesis.** The v2 lessons were produced by encoder + pattern
authoring, with content expansion runs (migrations 023–028) that took
explanations from ~80–150 chars per step to ~400–700. The expansion
focused on *step prose*, not on the "why does this rule hold"
motivation that spine #6 (causal/mechanistic) demands. Pedagogically
this is plausible-looking exposition without the schema-building it
needs to displace pre-existing wrong models.
**Owner.** `pedagogy-auditor` for the audit; `bac-curriculum` and the
human for content rewrites per slice.
**Severity.** sev-1 (named priority #3).
**Fix shape.** First-contact content for each notion needs to lead with
hook → motivation → causal mechanism, not formalism. The v2 schema
already supports it (the `callout` and `example` block kinds work
here); the existing content does not. Audit one slice, score it, then
rewrite. **Do not blanket-rewrite.**

### B-3. SVT explanations are not sharp enough
**Source.** §1.
**Status.** *Partially confirmed.* SVT chapters (25 skills, migration
037 lessons + 038 exam papers) were authored from first principles
without an SME pass — `PROJECT_STATUS.md` §17 calls this out
("REQUIRES SME PASS before declaring SVT ship-quality"). The audit
inherits this caveat.
**Cause.** SVT was the last filière authored, on the smallest content
budget. The bio/geo chapters in particular have no validated source.
**Owner.** `pedagogy-auditor` + human SME review.
**Severity.** sev-2 (because SVT is a smaller audience than SMA/SMB/PC).
**Fix shape.** SME pass per chapter. The SVT profile in
`pedagogy-auditor` is the right rubric (worked argument, schema
construction, declarative load).

---

## C. Interactivity and visualization — §2

### C-1. Math is not interactive enough; doesn't help visualization
**Source.** §2.
**Status.** *Partially confirmed.* 33 native Flutter widgets exist;
20 are math; many do support drag / adjust (`function_graph`,
`derivative_graph`, `complex_plane`, `sequence_viz`). But the dislike
is real — the complaint is that the existing widgets are passive or
disconnected from the symbolic form.
**Cause hypothesis.** The widgets are technically manipulable but, per
`pedagogy-auditor` spine #6 + the maths profile, the audit needs to
check whether they are:
- *wired to the symbolic form* (curve ↔ equation ↔ numeric readout
  updating together)
- have a *predict-before-reveal* step
- are used as the **first** encounter with the concept, not after the
  formal definition.
Inspection of one widget (`function_graph_widget.dart`) is sufficient
to confirm or deny; the audit did not go that deep. Treat as
*partially confirmed* until `pedagogy-auditor` audits one slice.
**Owner.** `pedagogy-auditor` for the per-widget check.
`nextjs-frontend` (or `flutter-frontend`) for implementation gaps.
**Severity.** sev-2 (named priority #7).
**Fix shape.** Audit one widget against the maths profile rubric. If
it fails, the failure mode is almost certainly "the widget is correct
in isolation but is placed *after* the formal definition in the lesson
flow". The fix is then about lesson-block ordering, not the widget
itself.

### C-2. SVT lacks interactivity
**Source.** §2.
**Status.** *Confirmed by audit.* Only three legacy SVT widgets exist
(`punnett_square`, `dna_replication`, `cell_division`). The SVT
chapters in mig 037 are 25 skills; three widgets covering at most
three of those. No diagram-construction interactions (drawing /
labelling) — which the SVT profile explicitly requires.
**Cause.** The SVT widget budget was not paid. The legacy widgets
predate the SMA/SMB push.
**Owner.** `pedagogy-auditor` to specify what schéma-construction
interactions are needed per chapter. Frontend agent to implement.
**Severity.** sev-2.
**Fix shape.** Specify, then implement, one schéma-construction
interaction per SVT slice as it is audited. Génétique gets the maths
profile (the SVT agent's explicit exception); its interactions can
reuse `punnett_square` plus the maths widgets for probability
(`probability_tree`, `monte_carlo_simulator`). The bio / geo slices
need *new* drawing-and-labelling widgets; PhET / similar libraries
have no equivalent.

### C-3. PC misses experimental-reasoning content
**Source.** Not explicit in the dislike list; surfaced by
`pedagogy-auditor`'s PC profile and the audit confirms.
**Status.** *Confirmed by audit.* The PC chapters (mig 033 lessons, 034
exam papers) cover conceptual + procedural well but the
experimental-reasoning mode (reading and exploiting TP data / documents
expérimentaux) is not represented in the lesson schema.
**Cause.** No `document_experimental` block kind in v2 lessons. The
existing `figure_widget` renders graphs but does not present
experimental data + question shape.
**Owner.** `bac-curriculum` to confirm scope; `pedagogy-auditor` to
specify the block; `supabase-architect` to extend the v2 schema if a
new block kind is needed.
**Severity.** sev-2.
**Fix shape.** Define a new lesson block kind for experimental-reasoning
material; render in long-lesson screen; backfill chapter-by-chapter.

---

## D. Practice, quizzes, retrieval — §3

### D-1. Quizzes after lessons are too simple
**Source.** §3, named priority #3.
**Status.** *Partially confirmed.* The audit can see that v2 lessons
have `checkpoint` blocks with MCQ questions; the audit cannot judge
"too simple" from migration files. The complaint plausibly refers to
both difficulty (level 1–2 of 5 dominating) and distractor quality
(distractors not built from misconceptions).
**Cause.** Two-fold:
- (content) Difficulty calibration is uneven; many checkpoint MCQs are
  low-difficulty.
- (schema) Distractors are not tagged with misconceptions — every wrong
  answer is just wrong, without telling the diagnosis layer *which
  wrong model* the student is running. This is the
  `pedagogy-auditor` spine #5 defect that the misconception schema
  (`schema-reconciliation.md` §3.2) addresses.
**Owner.** `pedagogy-auditor` for the rubric pass; `bac-curriculum` +
`supabase-architect` for the misconception schema; content authors for
the rewrites.
**Severity.** sev-1 (named priority #3, intertwined with #6).
**Fix shape.** The misconception schema lands first (additive
migration). Then per-slice: rewrite distractors so each maps to a
misconception. Difficulty calibration: a `difficulty_level` already
exists on `items`; the audit didn't verify it is being used in the
quiz-flow filter, but the column is present.

### D-2. Exams section is Q-and-A, not a learning experience
**Source.** §3, §6, named priority #4.
**Status.** *Confirmed by audit.* The `/exams` browser at
`screens/exams/` reads `bac_exams` + `exam_questions` and renders them
as practice with reveal. There is no learning loop on top — no
"why is this wrong" prompt, no "you ran misconception X" callback, no
spaced-repetition return to a missed question.
**Cause.** The exam practice screen was built before the
diagnosis-aware learner model existed (which still doesn't exist —
`learner-model` is build-time, not built yet). Without misconception
tagging on `exam_questions` (it's also missing there, same as on
`items`), the screen cannot do better than "right/wrong".
**Owner.** `pedagogy-auditor` to specify the loop, `learner-model` to
design the diagnosis, `nextjs-frontend` to render.
**Severity.** sev-1 (named priority #4).
**Fix shape.** Extend the misconception schema to `exam_questions`
(same additive column shape as for `items`). Practice flow becomes:
attempt → if wrong, diagnose → suggest the prerequisite or the
specific misconception remediation → return question to SR queue. The
remediation surface is just another lesson route.

### D-3. Exams section is "not even well structured"
**Source.** §6 ("the way past exams are organized and presented feels
weak").
**Status.** *Confirmed by audit.* The current routing is `/exams` →
list → `/exam/:id` → questions. The agent's exam corpus is grouped by
year × session × stream × subject (`bac_exams` schema), but the
hierarchy is not surfaced — the list is flat. The synthetic
`skills.exam_paper` papers are rendered inside the lesson, not in the
`/exams` browser, which is the right call but is unexplained to the
user.
**Owner.** `nextjs-frontend` (or `flutter-frontend`).
**Severity.** sev-2 (intertwined with D-2 above).
**Fix shape.** A two-axis browser: by année × session, and by matière.
A clear UX distinction between "real past Bac papers" (the corpus) and
"Bac-style practice for chapter X" (the synthetic papers). The
underlying data already supports both axes; the rendering does not.

---

## E. Progression and scaffolding — §4

### E-1. Chapters are "disbanded" — no real Bac curriculum path
**Source.** §4, named priority #2.
**Status.** *Confirmed by audit.* Two compounding causes:
- The Unité layer is missing (see B-1).
- The `skill_prerequisites` table is empty for SMA (the dominant
  filière) and SMB. With no DAG, there is no first-skill-to-master;
  every skill is a peer.
**Cause.** Data + schema. The SMA encoder discards the
`prerequisites` arrays in `shared/skill_map_sciences_maths_a.json`
(89 of 108 SMA skills declare prerequisites — none reach the DB). The
SMB seed has the same gap (22 of 32).
**Owner.** `bac-curriculum` for the encoder fix; `supabase-architect`
to apply the resulting migration.
**Severity.** sev-1 (named priority #2).
**Fix shape.** Extend `json_encode_sma.dart` and the SMB encoder to
emit `INSERT INTO public.skill_prerequisites ... ON CONFLICT DO
NOTHING`. Check acyclicity before SQL emission. Ship as a new
numbered migration. **This is the highest-ROI single piece of work
in the whole audit** — ~111 edges land, and most of E-2, E-3, E-4, F-1,
F-2, F-3 unblock as a consequence.

### E-2. No "basics" presented before the lesson
**Source.** §4, §5, named priority #5.
**Status.** *Confirmed by audit.* The v2 schema has a `kind:
"prerequisite"` section type, and 32 SMA chapters use it (per
PROJECT_STATUS §12). But:
- It is per-chapter, hand-authored, free prose. Not linked to a
  prerequisite skill via a stable ID.
- A student weak on a prerequisite has no path back to the
  prerequisite lesson — because the DAG edges aren't in the DB (E-1).
**Owner.** `bac-curriculum` (E-1's prereq backfill is the unlock);
`pedagogy-auditor` to spec the readiness-check surface;
`nextjs-frontend` to implement.
**Severity.** sev-1 (named priority #5 / part of the dislike list's
big-finding).
**Fix shape.** Once E-1 ships, the long-lesson screen shows a
readiness-check before the prerequisite section: a short MCQ on each
prerequisite skill. If the student fails, route to the prereq lesson
("back to basics, framed as sharpening — not demotion", per the
frontend agent's brief).

### E-3. Chapter internal progression "feels random"
**Source.** §4, with the explicit hedge "not fully tested by me yet —
flag for audit verification."
**Status.** *Unconfirmed.* The audit cannot judge per-chapter
section ordering from migration files; would need to read individual
v2 chapter JSONBs against the maths profile rubric.
**Owner.** `pedagogy-auditor` for the per-slice audit.
**Severity.** sev-2 pending verification.
**Fix shape.** Audit one slice. If the section ordering is wrong (e.g.
formalism before motivation), the fix is reordering blocks. The schema
allows any order; nothing has to change at the DB layer.

### E-4. No worked-example → completion → free-problem fading
**Source.** Implied by §3 + `pedagogy-auditor` spine #3 (expertise
reversal). Not in the dislike list directly.
**Status.** *Partially confirmed.* The v2 schema has both `example`
blocks (worked) and `try_it` blocks (free) but no intermediate
"completion problem" block kind. So the fading is binary (worked →
free), not graded (worked → completion → free).
**Owner.** `bac-curriculum` to spec the new block kind;
`supabase-architect` to extend v2 schema; content authors to author
completion problems per slice.
**Severity.** sev-2.
**Fix shape.** New `completion_problem` block kind in v2 lessons. A
worked example with one (or two) steps blanked out for the student to
fill in. Author one per slice; phase in.

---

## F. Adaptation and per-student experience — §5

### F-1. No diagnosis of basics mastery
**Source.** §5.
**Status.** *Confirmed by audit (greenfield-within-brownfield).*
`user_skill_states` carries the data substrate but no diagnosis layer
sits on top of it. No "which prerequisite is weak" computation, no
misconception state, no exposure.
**Owner.** `learner-model` for the design; `supabase-architect` for
the supporting migration (the misconception schema, §3.2 of
reconciliation); the frontend agent for the weakness map render.
**Severity.** sev-1 (named priority #5, part of the §5/§6 priority
cluster the dislike list adds in round 2).
**Fix shape.** Per the `learner-model` agent's contract: diagnosis
maps wrong answers + failed readiness checks + stalls onto specific
DAG nodes. Localized to either *missing notion* / *specific
misconception* / *weak upstream prerequisite*. Implementation lands
in the `submit-answer` edge function and a new scheduler endpoint.

### F-2. No spaced-repetition surface for the student
**Source.** §5.
**Status.** *Confirmed by audit.* The SR state exists
(`half_life_hours`, `last_reviewed_at`) and `compute_strength`
computes decay. No screen shows "these are slipping". The
`daily_quests` table picks up some of this (it suggests "review
skills") but with a simpler-than-SR scheduler.
**Owner.** `learner-model` for the forecasting logic;
`nextjs-frontend` (or its alternative) for the surface.
**Severity.** sev-1.
**Fix shape.** Forgetting-risk view per-(student, notion).
`learner-model`'s third job in its contract. Surface as a list, sorted
by `1 - strength`, capped at the top N. Render at `/home` or `/progress`.

### F-3. No "what to study today"
**Source.** §5, named priority #6.
**Status.** *Confirmed by audit.* The dashboard has "Continue learning"
(picks up the last-touched lesson) and three daily quests. Neither is
the scheduler-driven "what should I do next given my state" surface
the agent specifies.
**Owner.** `learner-model` (build), `nextjs-frontend` (render).
**Severity.** sev-1.
**Fix shape.** Scheduler endpoint returns a weighted ranking of (1)
decaying notions, (2) prerequisite-frontier notions, (3) high-exam-
frequency notions. Render as the home screen's primary CTA. Until
`exam_frequency` is populated (depends on `exam-ingestion` shipping +
tagging), weight (3) is uniform; weights (1) and (2) work today.

### F-4. No statistics: mastered / to-master / at-risk
**Source.** §5.
**Status.** *Partially confirmed.* `progress_screen.dart` shows
mastery percentages by topic; the audit didn't read its rendering in
detail. The agent wants this *framed as notion states, not as a
student label* — copy + UX work as well as a fresh source query.
**Owner.** `learner-model` for the aggregate; `nextjs-frontend` to
re-render.
**Severity.** sev-2.
**Fix shape.** Three sections on the progress screen: mastered (≥85%
strength, no decay risk), in-progress (touched, < 60% strength), at
risk (high-strength but decaying). Frame each as "notion X needs
review", not "you are weak at X". The data is already in
`user_skill_states`.

---

## G. Navigation and flow — §6

(Covered as D-3 above for the exams browser. No other §6 items.)

---

## H. Visual and UX, performance, "doesn't feel modern" — §7 / §8 / §11

(Treated as the single cross-cutting A-1 above. Repeating the entry
here would understate the dislike list's own framing — it is one item,
not three.)

---

## I. Mobile — §9

**Explicitly out of scope** per the dislike list ("the auditor should
not flag mobile issues"). The audit defers. Worth noting that the
`mobile/bac_app/` directory name and `pubspec.yaml` betray that the
Flutter codebase *was* intended as a multi-platform app — mobile and
desktop are deferred but the toolchain naturally produces those builds
if anyone ever runs `flutter build ios` or `flutter build macos`. This
is informational; nothing to act on.

---

## J. Auth, accounts, data — §10

### J-1. Auth plumbing verification
**Source.** §10. The dislike list explicitly asks: `auth.users` ↔
`public.profiles` separation; RLS coverage on every table; logout state
cleanup; cross-device progress sync. "Treat unknown answers as
worst-case."
**Status by sub-question:**

- *`auth.users` ↔ `public.profiles` separation.* **✓ Confirmed clean.**
  Trigger `handle_new_user` creates the profile row; client never
  queries `auth.users`. (Reconciliation §5.2.)
- *RLS coverage on every table.* **✗ Sev-1 defect.** Seven curriculum
  tables (`subjects`, `stream_subjects`, `topics`, `skills`,
  `skill_prerequisites`, `items`, `badges`) have policies declared but
  RLS not enabled. The policies are inert. Any authenticated user can
  modify curriculum data. See J-2.
- *Logout state cleanup.* **Partially confirmed.** Supabase client
  handles auth state; the audit did not verify that Riverpod
  providers reset on logout. Likely fine (Riverpod is rebuilt on the
  auth-state stream change) but a single-screen test would confirm.
- *Cross-device progress sync.* **✓ Confirmed.** All state lives in
  Postgres; no localStorage / Hive-only writes that wouldn't sync.
  `CacheService` is read-through, not write-through.

### J-2. RLS on curriculum tables not enabled
**Source.** §10, audit-discovered.
**Status.** *Confirmed by audit.*
**Cause.** Migration 001 declares `CREATE POLICY` on
`subjects/stream_subjects/topics/skills/skill_prerequisites/items/
badges` but does not `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` on
any of them. Default Supabase grants give `authenticated` SELECT +
INSERT + UPDATE + DELETE. The data is effectively wide open to any
logged-in client.
**Owner.** `supabase-architect`.
**Severity.** **sev-1.**
**Fix shape.** One migration, seven `ALTER TABLE ... ENABLE ROW
LEVEL SECURITY` statements, plus explicit `service_role` write
policies for the seed migrations to keep working. Reconciliation
§5.1 carries the SQL sketch.

---

## K. Audit-discovered issues not in the dislike list

These came up during the audit and need to land in the backlog even
though the dislike list does not mention them.

### K-0. `lib/examens.ts` ne sait pas représenter un exercice « au choix »

**Découvert le 2026-08-27**, en ouvrant le scan de SM 2020 session normale
pour décider s'il fallait le transcrire. **Confirmé sur le scan lui-même**,
pas déduit.

**Le fait.** Certaines épreuves nationales offrent un **choix** entre deux
exercices. SM 2020 normale (`element/109635`, code NS 25) l'énonce en toutes
lettres sur sa page 1 :

> « Le candidat doit traiter EXERCICE3 et EXERCICE4 et choisir de traiter
> EXERCICE1 ou bien EXERCICE2. — Le candidat doit traiter au total trois (3)
> exercices »

avec le détail : exercice 1 (arithmétique, 3,5 pts, **au choix**) *ou bien*
exercice 2 (structures algébriques, 3,5 pts, **au choix**) ; exercice 3
(nombres complexes, 3,5 pts, **obligatoire**) ; exercice 4 (analyse,
**13 points**, obligatoire). Le barème réel d'un candidat vaut donc
$3{,}5 + 3{,}5 + 13 = 20$.

**Le défaut.** `web/src/lib/examens.ts` groupe les entrées de banque sur
`source.{filiere, year, session}` et **somme tous les `bareme_total`** du
groupe. Il n'a aucune notion d'exercice optionnel. Conséquence immédiate,
vérifiable dans le corpus tel qu'il est aujourd'hui : SM 2020 normale y
compte **trois** entrées — arithmétique 3,5 (ex. 1), structures algébriques
3,5 (ex. 2) et nombres complexes 3,5 (ex. 3) — soit 10,50/20 affichés, alors
qu'aucun candidat réel n'a jamais traité à la fois l'exercice 1 et
l'exercice 2. **L'épreuve est déjà sur-comptée**, silencieusement.

**Ce que ça bloque.** L'exercice 4 (analyse, 13 pts) est le seul qui manque
pour reconstituer cette épreuve. Le convertir donnerait
$3{,}5+3{,}5+3{,}5+13 = 23{,}5$ — au-dessus de 20, ce qui casserait
l'affichage et l'honnêteté de la carte. **La transcription de SM 2020 est
donc suspendue en attendant l'arbitrage**, et c'est la seule des six épreuves
SM de session normale qui l'est.

**Trois issues possibles, à l'arbitrage de l'owner** — je n'en ai choisi
aucune :

1. **Apprendre l'option au modèle.** Ajouter un champ optionnel à
   `source` (par exemple `groupe_choix: "A"`) et faire compter au maximum une
   entrée par groupe dans le total. C'est la solution juste, et la plus
   coûteuse : elle touche le schéma de banque, le validateur et l'assembleur.
2. **N'en banquer qu'un des deux**, et dire lequel et pourquoi dans le
   `sourcing.note` de l'autre — au prix d'un exercice vérifié laissé hors
   corpus.
3. **Laisser SM 2020 hors d'Examens blancs**, en la marquant explicitement
   comme non assemblable pour cause de format à choix.

**~~À vérifier avant de trancher~~ — MESURÉ le 2026-08-27.** Le balayage
demandé ici a été fait : `docs/audits/format-a-choix.md`. Résultat, et il
change les coûts relatifs des trois options.

**Deux épreuves à choix sur 61 examinées** — et la seconde était inconnue :

- **SM 2020 normale** (`element/109635`, `NS 25`) — celle décrite ci-dessus ;
- **SM 2020 rattrapage** (`element/109639`, `RS 25`) — **fait neuf.** Le
  census la marquait « sourcé-listé, jamais ouvert ». Format identique mot
  pour mot (« choisir de traiter EXERCICE1 **ou bien** EXERCICE2 »), même
  répartition 3,5 / 3,5 au choix · 3,5 · 13, même barème candidat de 20. *(La
  coquille « EXRECICE1 » est dans le sujet officiel.)*

**Le format est confiné à SM 2020.** Inexistant hors SM, inexistant en SM hors
2020, présent sur les deux sessions de 2020. La consigne n'existe qu'en
français ; le grep arabe donne zéro, ce que corrobore le fait structurel que
l'arabe de la page 1 est confiné au cartouche.

**Le fait le plus dur, non tracé jusqu'ici.** SM 2020 normale porte trois
entrées (3,5 + 3,5 + 3,5) dont deux sont mutuellement exclusives : **aucun
candidat réel ne peut dépasser 7,00** avec elles. L'assembleur en tire 10,50.
Or `LISTEE_MIN` vaut 9,75. Donc :

> **7,00 < 9,75 ≤ 10,50** — cette épreuve n'apparaît dans « Examens blancs »
> **que grâce au sur-comptage**. Corriger le comptage la fait disparaître de
> la liste ; elle n'aurait jamais dû y être.

SM 2020 rattrapage a **zéro entrée** en banque : le même piège y est en
attente, pas encore payé.

**Ce que ça change pour les trois options** — factuellement :

- **Option 3** (laisser SM 2020 hors d'Examens blancs) coûte désormais un
  chiffre connu : **deux épreuves, les deux de 2020** — dont une qui n'est
  visible aujourd'hui que par accident. C'est le coût le plus bas des trois.
- **Option 1** (apprendre l'option au modèle) reste la solution juste, mais
  son bénéfice est borné à ces deux épreuves-là, pas à une classe ouverte.
- **Option 2** (n'en banquer qu'un des deux) coûte un exercice vérifié laissé
  hors corpus, deux fois.

**LES TROIS OPTIONS CONVERGENT SUR L'AFFICHAGE — mesuré le 2026-08-27.**
Ce point n'est PAS en débat, et le savoir simplifie l'arbitrage. Un candidat
réel de SM 2020 normale plafonne à **7,00** (un des deux exercices au choix,
3,5, plus les complexes obligatoires, 3,5). Or :

| option | ce que l'assembleur tirerait | listée ? |
|---|---|---|
| 1 — modéliser le choix (max un par groupe) | 3,5 + 3,5 = **7,00** | non |
| 2 — n'en banquer qu'un des deux | 3,5 + 3,5 = **7,00** | non |
| 3 — exclure l'épreuve | — | non |

`LISTEE_MIN` vaut 9,75, et 7,00 lui est inférieur dans les trois cas.
**Quelle que soit l'option retenue, SM 2020 normale disparaît de la liste.**

Ce qui reste réellement à trancher n'est donc pas le sort de cette épreuve,
mais **si le modèle de données doit apprendre la notion d'exercice optionnel**
— ce qui ne sert qu'aux deux épreuves de 2020 aujourd'hui (option 1), ou si
l'on se contente de les mettre de côté (options 2 et 3). C'est une question
d'architecture, pas d'affichage.

**Rien n'a été fait dans le code**, y compris sur le point non disputé :
l'exclusion de SM 2020 passe par un mécanisme, et le mécanisme *est*
l'arbitrage. Mais l'épreuve reste aujourd'hui affichée « 10,50 pts sur 20
disponibles » là où aucun élève ne peut dépasser 7,00 — c'est le coût de
l'attente, et il est réel.

**La réserve du comptage, dite par le balayage lui-même :** 47 lignes restent
non couvertes, dont **20 en SM** — la seule filière où le format existe, et 14
de ses 36 sessions restent fermées (2010–2016 N et R). Le balayage ne prouve
l'absence que sur ce qu'il a ouvert.

**Un piège voisin, trouvé au passage et sans rapport avec le choix :** le
sujet **PC 2014 normale** porte un défaut d'impression officiel — ses
sous-barèmes de physique totalisent 13,5 quand l'en-tête en déclare 13. Un
assembleur naïf y afficherait **20,5/20** le jour où ce sujet sera converti.
Aucune épreuve du corpus ne dépasse 20 aujourd'hui ; celle-là le ferait.

**Severity.** sev-2 — l'affichage est faux sur une épreuve, silencieusement,
et il le serait davantage après conversion. Aucun risque de production.

### K-7. Un `entry_id` de banque n'est unique que dans son propre fichier

**Découvert le 2026-08-27**, en auditant l'assembleur d'épreuves. **Mesuré
sur le corpus**, pas supposé. Le symptôme qui l'a révélé est corrigé ; la
propriété, elle, reste vraie et reste un piège.

**Le fait.** `bank.yaml` numérote ses entrées par la POSITION de l'exercice
sur la copie du bac : `bk-2018-n-x1` veut dire « exercice 1 du bac 2018,
session normale ». Deux choses en découlent, toutes deux voulues :

- deux filières différentes ont chacune leur exercice 1 la même année ;
- **un exercice découpé entre plusieurs notions garde le même identifiant
  dans chacune** — c'est le protocole de répartition (une cross-list ne
  devient jamais une seconde entrée, sans quoi le barème serait compté deux
  fois et l'épreuve dépasserait 20).

Au 2026-08-27 : **42 identifiants sont portés par plusieurs entrées.**
`bk-2018-n-x1` vit dans quatre banques (`pc/electrolyse`,
`pc/esterification-hydrolyse`, `pc/reactions-acido-basiques`,
`maths/geometrie-espace`) ; `bk-2023-n-x1` dans six.

**Ce que ça a déjà cassé.** `useExerciseRevealIds` lisait `item_id` seul et
renvoyait un Set plat. Révéler une question de `bk-2018-n-x1` dans
`pc/electrolyse` allumait donc « fait » sur la même question dans les trois
autres banques — un tick fabriqué sur un exercice jamais ouvert, c'est-à-dire
exactement ce que l'état honnête interdit. **Corrigé** : la clé porte
maintenant la notion (`revealKey` dans `lib/student-state.ts`).

**Pourquoi ça reste ouvert.** Le correctif ferme UN consommateur. La
propriété — « `entry_id` n'identifie rien tout seul » — vaut pour tout ce qui
viendra ensuite : reprise d'exercice, favoris, statistiques par exercice,
mode examen persistant, export. Le journal porte déjà `notion_id` à côté de
`item_id` ; **la règle est donc : toute lecture qui remonte à un exercice
lit les deux colonnes, jamais `item_id` seul.**

**Ce qu'il ne faut PAS faire** : rendre les identifiants globalement uniques.
Ils encodent une position sur une copie réelle, et c'est ce qui permet à
l'assembleur de regrouper une épreuve. Les préfixer par la notion casserait
le lien avec le sujet et n'apporterait rien que la clé composite n'apporte
déjà.

**Piste de garde** : `validate-content` pourrait recenser les identifiants
partagés et refuser qu'un même identifiant porte deux entrées de la MÊME
filière-année-session dans la même notion (le seul cas réellement fautif).
Non fait — la vraie défense est la règle de lecture ci-dessus.

#### K-7 bis. Cinq identifiants mentent sur la position qu'ils encodent

**Trouvé le 2026-08-27**, en mesurant l'identifiant contre le libellé imprimé
de chaque entrée. **Aucun renommage fait** — voir pourquoi plus bas.

Le suffixe `-x<N>` doit dire la place de l'exercice SUR LA COPIE, et les
morceaux d'un exercice découpé se distinguent par une lettre (`x3`, `x3b`,
`x3c`) — la convention existe et le corpus l'emploie déjà (`bk-2020-n-x3b`,
`bk-2022-n-x4b`, `bk-2023-n-x4b`, `bk-2025-n-x1b`, `bk-2025-n-x4b`).

Cinq entrées l'ont manquée. Toutes nommées `x1`, au sens visiblement de
« première entrée de cette année dans CETTE notion » — ce qui n'est pas ce que
l'identifiant veut dire :

| Entrée | Notion | Le libellé imprime | Le nom juste serait |
|---|---|---|---|
| `bk-2020-n-x1` | `pc/noyaux-masse-energie` | Exercice **III** | `bk-2020-n-x3` |
| `bk-2023-n-x1` | `pc/noyaux-masse-energie` | Exercice **2 §2** | `bk-2023-n-x2b` |
| `bk-2022-n-x1` | `pc/rc-charge` | Exercice **3** | `bk-2022-n-x3` |
| `bk-2025-n-x1` | `pc/rc-charge` | Exercice **3** | `bk-2025-n-x3` |
| `bk-2024-n-x1` | `pc/rotation-axe-fixe` | Exercice **5**, Partie 2 | `bk-2024-n-x5b` |

**Rien ne casse aujourd'hui.** Le tri des exercices et le compte affiché
lisent le LIBELLÉ, pas l'identifiant (voir `lib/examens.ts`). Le dégât est
qu'un identifiant qui ment sur la position ruine exactement la règle que
BANK-SPEC §4 et K-7 viennent d'écrire — et trompe le prochain lecteur.

**Pourquoi ce n'est PAS renommé, et pourquoi c'est un arbitrage owner.**
Renommer un `entry_id` **orpheline les lignes de journal déjà écrites
dessus** : le reveal est enregistré sous `item_id = "<entry_id>:<question_id>"`,
et un élève qui a déjà travaillé ces exercices perdrait ses marques « fait ».
Et le renommage **cascade** : corriger `pc/rc-charge|bk-2025-n-x1` en `x3`
oblige à décaler `rlc-serie|bk-2025-n-x3` en `x3b` et
`ondes-em-modulation|bk-2025-n-x3` en `x3c`. Ce n'est pas une correction
mécanique.

**Ce qui EST fait** : `validate-content` refuse désormais toute NOUVELLE
entrée dont l'identifiant contredit son libellé, et les cinq ci-dessus sont
nommées une par une dans un ensemble `POSITIONS_HERITEES`, avec en commentaire
le nom juste. La dette est bornée, visible, et ne peut plus croître.

### K-8. Un même sujet vit en deux endroits sans recoupement — et ça a déjà divergé

**Trouvé le 2026-08-27**, en mesurant après qu'un cas se soit révélé. **Sept
entrées le signalent elles-mêmes** ; deux cas sont déjà des contradictions
avérées.

**Le fait.** Un exercice de bac réel peut vivre à deux endroits du dépôt :
comme entrée de banque (`bank.yaml`) et comme sommet de leçon r-bac
(`exercises.yaml`). Les deux sont écrits séparément, souvent à des mois
d'écart, et **rien ne les recoupe** — ni porte, ni relecture. Sept entrées
portent un avertissement « RECOUPEMENT ASSUMÉ » écrit par leur auteur :

| notion | ligne |
|---|---|
| `pc/controle-catalyse` | 47 |
| `pc/ondes-em-modulation` | 70 et 135 |
| `pc/ondes-mecaniques-progressives` | 156 |
| `pc/rotation-axe-fixe` | 87 |
| `pc/systemes-oscillants` | 40 |
| `pc/transformations-lentes-rapides` | 187 |

**Deux divergences AVÉRÉES, pas hypothétiques :**

1. **PC 2019, la force $F$** — le sommet r-bac fournit « on prendra
   $\sin 10° \approx 0{,}17$ » et publie **532 N** ; l'entrée de banque garde
   $\sin 10° = 0{,}1736$ et publie **525 N**. La donnée arrondie est absente
   de la transcription vérifiée. Deux réponses publiées pour la même question
   du même sujet.

2. **PC 2010, le temps de demi-réaction** — `bk-2010-n-x1` affiche
   $t_{1/2} \approx 20$ min, valeur que son propre bloc « SOURCING GAP »
   déclarait **reprise du sommet r-bac et jamais re-dérivée**. Une mesure au
   pixel sur le bitmap d'origine (2026-08-27) donne **12,53 min**. Voir le
   commentaire daté en tête de
   `content/pc/transformations-lentes-rapides/bank.yaml`.

**Ce que ça dit du mécanisme.** Les deux divergences ont la même origine : la
valeur du sommet r-bac a été **reprise** dans la banque « pour rester cohérent
avec lui », sans re-dérivation. Quand le sommet est faux, la banque hérite du
faux — et l'avertissement écrit par l'auteur devient le seul indice qu'il
reste.

**Ce qui n'est PAS fait, et pourquoi.** Aucune valeur n'a été corrigée. Une
valeur physique publiée ne se change pas sur une lecture unique : le cas
PC 2010 vient d'une passe de transcription, pas d'une vérification
indépendante, et le cas PC 2019 demande de savoir si le sujet officiel fournit
ou non l'arrondi — ce que la transcription vérifiée dit absent, mais qui
mérite le corrigé officiel.

**Le balayage a été fait le 2026-08-27 — voici ce qu'il donne.** Pour chacune
des **37 notions portant à la fois une banque et un `exercises.yaml`**, on
extrait les valeurs encadrées (`\boxed{}`) des deux côtés et on compare.

- **Il retrouve le cas PC 2019 tout seul** : `pc/lois-de-newton` encadre
  **525** côté banque, absent du sommet. Le balayage marche.
- **Il ne trouve aucun cas neuf.** Sa seule autre alerte,
  `pc/noyaux-masse-energie` (sommet 226 contre banque 210), est un **faux
  positif** : 226 est le *radium 226* d'un exercice de variation
  **délibérément fabriqué** (`status: not-applicable`, « fabriqué pour
  l'exercice »), 210 le *polonium 210* du sujet réel. Deux nucléides
  différents, pas deux réponses au même calcul — l'heuristique a lu des
  numéros de masse comme des résultats.

**Ce que le balayage ne couvre PAS**, et qui reste ouvert : il ne voit que les
valeurs **encadrées**, il ignore les entiers < 10, et il ne compare pas
question par question. Le cas PC 2010 (t½) lui échappe complètement — la
valeur n'y est pas dans un `\boxed{}`. **Il ne prouve donc pas l'absence
d'autres divergences ; il prouve seulement qu'il n'y en a pas dans ce
périmètre-là.**

**Le balayage question par question a été tenté aussi** (apparié sur l'année
du sujet, en comparant toutes les valeurs suivies d'une unité physique, pas
seulement les encadrées). Il ne trouve **aucune divergence neuve** non plus,
et son plancher de bruit est trop haut pour servir de porte. Mais il rend
visible quelque chose qui vaut plus que son résultat : **les deux cas connus
ne sont pas de la même nature.**

| | ce que le dépôt contient | ce que ça veut dire |
|---|---|---|
| **PC 2019** | 532 des deux côtés, **525 côté banque seulement** | **DIVERGENCE** — les deux endroits se contredisent |
| **PC 2010** | **20 des deux côtés**, rien d'autre | **HÉRITAGE** — la banque a repris le sommet ; le dépôt est cohérent avec lui-même *et faux ensemble* |

**Conséquence méthodologique, et c'est le vrai enseignement de K-8 :** un
contrôle **interne au dépôt** ne peut attraper que la divergence. Il est
structurellement aveugle à l'héritage — quand une valeur fausse a été recopiée
d'un endroit à l'autre « pour rester cohérent », plus rien dans le dépôt ne la
contredit. **Seule une re-mesure contre le scan attrape ce cas-là**, et c'est
exactement ce qui a révélé PC 2010.

Autrement dit : aucune porte automatique ne fermera K-8. Ce qui la ferme, c'est
de re-mesurer les valeurs graphiques sur la source la moins dégradée, sujet par
sujet — le geste que le protocole du sas impose désormais aux transcriptions
neuves, mais que le contenu **déjà converti** n'a jamais subi.

**L'exposition, chiffrée le 2026-08-27 : 89 entrées sur 187 — soit 48 % de la
banque — s'appuient sur une lecture de figure** (« lecture graphique », « le
palier », « la tangente », « d'après la figure »…). Elles se concentrent sur
21 notions, et très majoritairement en physique :

| notion | entrées concernées |
|---|---|
| `pc/chute-mouvements-plans` | 12 |
| `pc/rlc-serie` | 11 |
| `pc/rc-charge` | 9 |
| `pc/reactions-acido-basiques` | 8 |
| `maths/fonction-logarithme` · `pc/dipole-rl` | 6 chacune |

Les plus chargées en lectures : `bk-2021-r-x4b` (dipole-rl, 19 mentions),
`bk-2022-r-x3` (18), `bk-2023-r-x3` (rc-charge, 17).

**C'est une borne HAUTE, pas un décompte de valeurs à risque.** Le repérage
attrape toute mention de figure, y compris quand le raisonnement décrit un
schéma sans qu'aucune valeur n'en dépende. Il dit l'ordre de grandeur de la
surface à re-mesurer, pas le nombre de valeurs fausses — qui peut très bien
être zéro. Le seul cas avéré à ce jour reste PC 2010.

**Mais l'exposition est presque entièrement VISIBLE : 87 de ces 89 entrées
appartiennent à une épreuve complète**, donc affichée à l'élève en mode examen.
Ce n'est pas une réserve dormante dans du contenu marginal.

**L'inventaire nominatif est dans `docs/audits/lectures-graphiques.md`** — les
89 entrées avec leur notion, leur sujet, leur barème, leur nombre de mentions
et leur appartenance à une épreuve complète, triées par coût de re-mesure. Une
campagne s'y planifie ; un chiffre global, non.

### K-1. `get_user_weak_areas` function references missing columns
**Source.** `backend/supabase/migrations/004_exam_analytics_and_sync.sql`,
lines 45–74.
**Status.** *Confirmed by audit.*
**Cause.** Function body references `uss.mastery_percentage` and
`uss.correct`. The actual `user_skill_states` columns are `mastery`
(enum, not numeric) and no `correct` column (`is_correct` lives on
`user_item_history`). Function will raise at call time.
**Owner.** `supabase-architect`.
**Severity.** sev-2 if dead; sev-1 if called (silent error in a
diagnosis path).
**Fix shape.** Grep `backend/supabase/functions/` and `mobile/bac_app/
lib/` for `get_user_weak_areas`. If unreferenced, drop. If referenced,
rewrite against actual columns.

### K-2. No down migrations and no branch-tested deploy workflow
**Source.** Audit.
**Status.** *Confirmed.*
**Cause.** Every migration is forward-only and idempotent;
`PROJECT_STATUS.md` shows `supabase db push` directly to prod with no
intermediate branch.
**Owner.** `supabase-architect` + `infra`.
**Severity.** sev-1 *before any non-additive migration runs*. Sev-2
while only additive migrations are in flight.
**Fix shape.** Establish a Supabase branch (or a manual
copy-of-prod). Document in `CONTRIBUTING.md`. Adopt "tested-on-branch"
as a hard gate before the first expand-contract migration.

### K-3. Encoders rewrite existing migration files in place
**Source.** Audit, `PROJECT_STATUS.md` §15 ("It rewrites
`migrations/013_long_lessons_sma.sql`").
**Status.** *Confirmed.*
**Cause.** Authoring pattern: edit Dart encoder → re-run → encoder
rewrites the SQL file. Works because every migration is idempotent.
**Owner.** `supabase-architect` for the convention change; encoder
authors (`bac-curriculum`, content authors) for the discipline.
**Severity.** sev-2 (becomes sev-1 once production data is locked in
behind a non-additive migration).
**Fix shape.** Encoders should emit *patch* migrations on top of the
last full-replace baseline, not rewrite the baseline file. Define the
baseline date; everything after is append-only.

### K-4. PostHog / Sentry not provisioned
**Source.** Audit + `PROJECT_STATUS.md` §11.
**Status.** *Confirmed.*
**Cause.** SDKs wired with no-op fallbacks; env keys not set.
**Owner.** `infra`. `learner-model` and `pedagogy-auditor` consume the
output downstream.
**Severity.** sev-2 (sev-1 if the §8 perceived-sluggishness debate
escalates and needs Web Vitals data to settle).
**Fix shape.** Provision both. Add the event instrumentation the
agents require: readiness pass rate, lesson stall, exam-question
attempt, misconception exhibited.

### K-5. SMB v0 content + SMB annales placeholders unreviewed
**Source.** `PROJECT_STATUS.md` §14 disclaimer.
**Status.** *Confirmed.*
**Cause.** SMB chapters and 24 SMB exam questions were pattern-authored
from SMA without SME review. SMB annales PDFs are placeholder URLs.
**Owner.** `pedagogy-auditor` for the audit; human SMEs for the
rewrite; `exam-ingestion` for the real PDF acquisition.
**Severity.** sev-2.
**Fix shape.** SME pass per SMB chapter. Real PDF ingestion via the
exam-ingestion pipeline once it exists.

### K-6. Exam PDF storage bucket missing
**Source.** Audit.
**Status.** *Confirmed.*
**Cause.** `bac_exams.pdf_url` is a free-text URL field; no Storage
bucket holds the actual PDFs. The placeholder URLs in mig 020 point to
non-existent paths under `bacapp.vercel.app`.
**Owner.** `supabase-architect` + `exam-ingestion`.
**Severity.** sev-2.
**Fix shape.** Create `exam_pdfs` bucket (private, service-role write,
authenticated read via signed URLs). Backfill `pdf_url` to the new
bucket as the corpus lands.

---

## L. Prioritisation summary

The dislike list's stated priorities (rounds 1+2+3), reconciled to the
audit's entries above, in the order the audit recommends working them
(after the §6 stack decision):

| Priority | Audit ID(s) | Why this order |
|---|---|---|
| 0. Stack decision | A-1 | Gates the whole frontend plan. Cannot be deferred. |
| 1. RLS on curriculum tables | J-2 | sev-1 defect, one-day fix, defends every other domain. |
| 2. SMA + SMB prereq edge backfill | E-1 | Highest ROI single piece of work; unblocks E-2, F-1, F-2, F-3. |
| 3. Misconception schema | D-1, F-1 | Unlocks distractor-based diagnosis, which gates D-2 and most of §5/§6 of the dislike list. |
| 4. Down migrations + branch workflow | K-2 | Before the first expand-contract migration ships. |
| 5. Misconception tagging per slice | D-1 | Per-slice content work; ongoing. |
| 6. Schedule + diagnosis logic | F-1, F-2, F-3 | After (2) and (3) — they are inputs to it. |
| 7. Unité layer + syllabus view | B-1, E-1 | Resolves the dislike list's named priority #2 once data is in place. |
| 8. Stack-aware UI work | A-1, all §4/§5/§6 surfaces | After the §6 decision; biggest deliverable, biggest variance in cost. |

This is the audit's recommended ordering; the `pedagogy-auditor` agent
re-scores the per-content items (B-2, B-3, C-1, D-1, E-3) with reach
and effort once the rubric is calibrated against real slices.
