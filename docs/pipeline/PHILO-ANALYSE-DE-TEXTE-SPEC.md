# Pedagogy spec — `content/philo/analyse-de-texte`

> **Méthode de l'analyse de texte philosophique (تحليل النص الفلسفي).**
> The 12th philo lesson, opening a NEW unit **« Méthode de l'épreuve »**. This is a
> **skills lesson, not a notion lesson** — it teaches the METHOD for the exam's 3rd
> subject type (**نص مذيّل بمطلب** : a philosophical text + the invariant consigne
> **« حلّل (ي) النص و ناقشه (يه) »**), alongside السؤال and القولة.
>
> **Status: v0.1 spec — HUMAN-GATED.** Propose → surface for the human's domain
> judgment → iterate. Not final until the human (bac SMA + Sciences Physiques,
> knows where students fail this exercise) signs off. This document is the input
> to content-author (`lesson.md`) and item-author (`items.yaml` +
> `exercises.yaml` + `checkpoints.yaml`). It is NOT the lesson prose.
>
> **Born converted (task-confirmed).** The other 11 philo lessons ship
> `lesson.md` + `items.yaml` with legacy printed-solution summits. This lesson
> has **no legacy summit to convert**: it is authored directly against the
> attempt-first contract (`exercises.yaml` r-bac + r-variation, `checkpoints.yaml`
> commit-gate + rupture-gates, markers in `lesson.md`). See §4.

---

## Inputs read (provenance)

- `docs/sujets/philo/analyse-de-texte.md` — the 3 sourced texts + the documented
  **language-choice reasoning** (French-for-transfer, Arabic-honesty preserved).
- `docs/sujets/philo/la-liberte.md` (2024 R — Bakounine, نص) and
  `docs/sujets/philo/le-devoir.md` (2023 R — Kant, نص) — the two cross-referenced
  full texts.
- `docs/cadre/curriculum/philo.yaml` — the authoritative curriculum boundary:
  `epreuve.grille_evaluation` (/20) + `savoir_faire_transversaux.methode_analyse_texte`
  (the official 4-moment method grid) + exclusions.
- House-style references: `content/philo/la-liberte/lesson.md` (R0 hook pattern,
  R4 méthode-de-dissertation pattern) and `content/philo/theorie-experience/lesson.md`
  (methodological/epistemological register, "Erreur à éviter" callouts, arc-closure).
- `docs/pipeline/NOTION-TEMPLATE-V2.md` (per-rung boxes + misconception ledger),
  `docs/design/LESSON-EXPERIENCE-SPEC.md` (chapter = `## R<n>`, StagedFigure,
  items-in-line by rung), `docs/pipeline/SUMMIT-CONVERSION-RECIPE.md` (exercises/
  checkpoints schema, sourcing gate).

---

## 1. Scope boundary

### 1.1 Curriculum placement (the cadre)

- **Filière + matière:** all filières scientifiques (SM-A, SM-B, Sciences
  Physiques, SVT) — one philosophy cadre, coef 2, 2 h, épreuve **en arabe**.
- **Where it sits:** the méthode d'analyse de texte is a **savoir-faire
  transversal**, explicitly flagged in `philo.yaml` as the **« CHAPITRE À
  AUTORISER »** (`savoir_faire_transversaux.methode_analyse_texte`, lines 89–108).
  It is **not a مفهوم (notion)** and adds no notion to the programme. New unit
  « Méthode de l'épreuve ».
- **Prerequisite placement:** the lesson **assumes the notion content is already
  owned.** The three texts map 1:1 onto existing notion lessons:
  - vérité text (2025 N) → content owned via `la-verite` + `theorie-experience`
    (empirisme/rationalisme, sens/raison, relativité — le texte lui-même
    n'apparaît sous aucun fichier de notion, mais son contenu l'est).
  - Bakounine/liberté text (2024 R) → content owned via `la-liberte`
    (liberté et autrui, liberté et loi).
  - Kant/devoir text (2023 R) → content owned via `le-devoir`
    (agir *par* devoir vs *conformément* au devoir).

  **This is the pedagogical lever:** because the student already holds the
  philosophy, the entire cognitive load of this lesson goes to **METHOD**.
  Cross-reference the notion lessons at each text so the student knows where the
  *content* was taught and understands that here we only *use* it to practise.

### 1.2 What this lesson teaches (bounded to the official grid)

The **official méthode** from `philo.yaml.methode_analyse_texte`, in three
moments / four exigences, and **nothing beyond it**:

1. **Introduction (المقدمة / التأطير)** — encadrer (rattacher le texte à sa
   notion + son module) ; dégager le thème/objet (تحديد موضوع النص) ; poser le
   problème (طرح الإشكال) + les questions directrices.
2. **Développement — Analyse (التحليل)** — formuler la thèse (أطروحة النص) ;
   expliciter les concepts-clés et leurs relations ; reconstruire la structure
   argumentative (procédés : exemple, comparaison, opposition, causalité,
   définition, concession) et suivre le mouvement du texte.
3. **Développement — Discussion (المناقشة)** — discussion interne (valeur,
   portée, cohérence de la thèse) ; discussion externe (positions convergentes
   PUIS divergentes ; marquer les limites).
4. **Conclusion — Synthèse (التركيب)** — synthétiser les acquis ; répondre à la
   problématique ; position personnelle argumentée qui rouvre une question.

Plus the two **exigences de fidélité** (non-negotiable, carried into the item
spec): (a) **rester COLLÉ AU TEXTE** — pas un exposé de cours plaqué ;
(b) la discussion mobilise des positions **PERTINENTES** pour la notion du
texte — **pas de name-dropping décoratif**.

### 1.3 Technique vs. practice split

- **~40 % technique, ~60 % practice-on-real-texts.** The method has no formulas;
  it is learned by *doing it on real texts and seeing the expert's decisions*.
  Every method move (R1–R6) is **demonstrated live on the Bakounine text**
  (expert reasoning shown out loud — VISION L65-68), then the student **commits**
  through a checkpoint before the next move, then **applies** the whole method
  attempt-first at the summit (R7) on two further real texts.
- The technique that IS taught explicitly: the *distinctions* that make or break
  the copy (thème ≠ thèse ≠ problème ; analyser ≠ paraphraser ; discuter ≠ donner
  son avis ; find-order ≠ write-order ; procédés argumentatifs named).

### 1.4 Explicitly OUT of scope (hard constraints for downstream authors)

- **NOT a philosophy-content lesson.** Do **not** re-teach empirisme/rationalisme,
  l'éthique kantienne (par/conformément au devoir), ni la théorie politique de
  Bakounine **as content**. The texts are **method exemplars only**. When content
  is needed, **point to the notion lesson** (`la-verite`, `theorie-experience`,
  `la-liberte`, `le-devoir`) — one line, not a re-exposition.
- **NOT the dissertation method (السؤال) nor the citation method (القولة).** Those
  are separate méthodes (`philo.yaml.methode_dissertation`). This lesson covers
  ONLY the **نص**. (You may note in one sentence that intro/problématique/plan
  skills transfer — no more.)
- **NOT the French « commentaire / explication de texte ».** That is the *bac
  français* genre, a filière-and-provenance error here (analyse-de-texte.md §2).
  **Do not fabricate a French exam subject.** (See §2b for the correct
  French/Arabic protocol.)
- **NOT** doxographic erudition / a closed author-list to memorize, **NOT** formal
  logic or discipline-technical apparatus (`philo.yaml` exclusions, lines 401–416).
  Keep references few and load-bearing.
- **Depth ceiling:** coef 2, 2 h — notional/methodological level. No exhaustive
  narratology of argument; teach the handful of procédés that actually recur.

---

## 2b. Language decision (committed — executable)

Per the documented reasoning in `analyse-de-texte.md` (§ « Choix de langue »),
**committed for downstream authors**:

- **Teaching prose + all worked modelling: FRENCH.** The app is French-first; the
  method is transferable (dégager la thèse, la structure, les concepts, les
  présupposés, discuter) and functions identically in Arabic and French.
- **Each of the 3 texts is a BILINGUAL ARTEFACT.** Show the **Arabic original**
  (RTL — *« voici ce que tu affronteras réellement le jour de l'épreuve »*)
  **directly beside/below the French working translation.** The Arabic is the real
  exam artefact; the French translation is the working surface on which the expert
  demonstrates the method.
- **Consigne shown verbatim in Arabic** — **« حلّل (ي) النص و ناقشه (يه) »** — with
  a short French gloss. It is invariant across sessions; make the student *see* it
  so it is never a surprise.
- **Arabic-honesty note preserved and made explicit at R0 and R7:** on the exam
  the student **composes the analysis in Arabic**. The French here is scaffolding
  for *learning the method*; the transfer target is Arabic composition. At the
  summit, after modelling in French, prompt the student (stretch) to attempt the
  two load-bearing moves — **la thèse** and **la problématique** — **in Arabic**.
- **Executable rules:** `lesson.md` prose = French; text artefacts = Arabic +
  French blocks; consignes = Arabic verbatim + French gloss; `exercises.yaml`
  stems present Arabic text + French translation, `reasoning` in French, with the
  Arabic-composition note; `checkpoints.yaml` in French.
- **We do NOT fabricate a philosophical text** (analyse-de-texte.md is explicit:
  « On ne fabrique pas non plus un sujet »). We have three real, verified/corrigé
  texts — that is enough (see §4 for the r-variation consequence).

---

## 3. Misconception inventory (the diagnostic spine)

These are the **real ways bac candidates botch تحليل النص** — grounded in the
official grid's own failure points, the exigences de fidélité, and standard
correcteur experience. **15 models.** Each is a *diagnostic instrument*: a wrong
answer must reveal *which* wrong model is running. **Human to validate/prune
against real correcteur experience — this is the one thing not to fabricate.**

The four discussion-cluster models (MC-11…MC-14) are the **highest-value confront
zone** (discussion = 5/20 and the most-failed moment); weight items accordingly.

| id | Wrong model (what the student believes) | How it manifests in a copy | Correct model | Confront @ |
|---|---|---|---|---|
| **MC-01** | *Analyser = redire le texte avec mes mots.* Paraphrase IS analysis. **(the master misconception)** | Copy walks sentence-by-sentence re-stating; no thèse named, no structure, no concepts, no procédés. | Analyser = expliquer **COMMENT** le texte soutient sa thèse (thèse + concepts + procédés + mouvement), pas *quoi* il dit. | **R0** (predict-commit) |
| **MC-02** | *Le thème EST la thèse.* The topic = the claim. | « La thèse du texte, c'est la liberté » (a topic, not an assertion). | Thème = de quoi ça parle ; **thèse = ce que l'auteur AFFIRME** — une phrase assertive, discutable. | R1 |
| **MC-03** | *Un exemple / une prémisse = la thèse.* | Names a supporting example (le commerçant honnête) or a premise as the central claim. | La thèse est ce que les exemples **SERVENT** ; demande « tout ça, c'est POUR dire quoi ? ». | R1 (aigu au summit Kant) |
| **MC-04** | *Tout ce qui est écrit = la position de l'auteur.* Confond thèse défendue et thèse **rapportée/réfutée**. | Attribue à l'auteur une vue que le texte **combat** (ou une concession). | Suivre *qui parle* ; distinguer thèse défendue / thèse combattue / concession via les connecteurs (« mais », « à l'inverse », « غير أن »). | R1 / R3 |
| **MC-05** | *Problématique = reformuler la consigne ou le thème en question.* | « Le texte parle de la liberté. La liberté est-elle importante ? » — aucune tension. | Problématique = une **TENSION** entre deux réponses également défendables, tranchée par la thèse. (compétence cardinale الأشكلة) | R2 |
| **MC-06** | *Je rédige dans l'ordre de la copie : l'intro d'abord, donc avant d'avoir compris.* | Intro écrite « à l'aveugle », contredite par la thèse trouvée ensuite. | **Ordre de lecture ≠ ordre de rédaction** : comprendre d'abord (thèse), construire l'intro en dernier, la placer en premier. | R2 |
| **MC-07** | *Toutes les phrases se valent ; je commente tout, dans l'ordre.* | Commentaire linéaire plat, aucune articulation, aucune hiérarchie. | Un texte **BOUGE** : repérer les articulations, distinguer claims porteuses et support. | R3 |
| **MC-08** | *La structure = la liste des sujets dans l'ordre.* Ignore les procédés/connecteurs (le « comment »). | Ne nomme ni opposition, ni exemple, ni causalité, ni concession ; rate « car », « à l'inverse », « autrement dit ». | Nommer les **procédés argumentatifs** et ce que chacun accomplit dans la démonstration. | R3 |
| **MC-09** | *Un concept se définit par le cours / le dictionnaire.* | Définition de cours plaquée qui ne colle pas à l'usage du texte. | Définir les concepts **tels que CE texte les emploie** et leurs relations (exigence de fidélité). | R4 |
| **MC-10** | *Seul ce qui est écrit compte ; il n'y a rien « sous » le texte.* | Aucun présupposé implicite dégagé. | Identifier ce que l'auteur doit **TENIR POUR ACQUIS** pour que sa thèse tienne. | R4 |
| **MC-11** | *Discuter = dire tout de suite si je suis d'accord.* Saute à la discussion avant/au lieu d'analyser. | Copie qui ouvre sur « je pense que l'auteur a raison/tort », sans analyse préalable. | La discussion vient **APRÈS** l'analyse et porte sur la thèse **analysée**. | R5 (+ pré-empté par l'ordre du ramp) |
| **MC-12** | *Discuter = donner mon opinion personnelle.* | « À mon avis… », assertions non argumentées, aucune position philosophique. | Discuter = mobiliser des **arguments** et des **positions philosophiques** (convergentes puis divergentes) + critique interne. | R5 |
| **MC-13** | *Citer des auteurs = montrer sa culture, peu importe la pertinence.* Name-dropping décoratif. | Descartes/Nietzsche plaqués sur un texte liberté-et-autrui, sans lien. | Mobiliser des positions **PERTINENTES pour la notion du texte** (exigence de fidélité). | R5 |
| **MC-14** | *La discussion, c'est un mini-cours sur la notion, à côté du texte.* Discussion hors-sol. | Dissertation générale sur la liberté qui ne revient jamais à la thèse précise du texte. | Critiquer **CETTE** thèse avec **SES** concepts ; rester ancré au texte. | R5 |
| **MC-15** | *Conclure = résumer / répéter* ; ou *« position personnelle » = avis non argumenté.* | Conclusion qui redit l'intro ; « moi je pense » collé à la fin, sans argument. | Synthèse = **bilan analyse+discussion → réponse à la problématique → position personnelle ARGUMENTÉE qui rouvre**. | R6 |

**Stem-design notes (carry verbatim into the item spec):**
- **Dual-tagging, not a defect.** In this lesson many stems are *co-attributable
  across skills* — e.g. a « quelle est la thèse ? » stem can catch MC-02, MC-03
  and MC-04 at once. Per the item standard, **target-distractor co-attribution
  across skills is NOT a defect — dual-tag it.** This will recur constantly here;
  expect most « repère X » stems to carry 2–3 misconception tags.
- **Correct-answer contamination IS a defect.** If a stem's own wording
  accidentally lets a paraphrase-model reach the *correct* option (e.g. a stem
  whose "right" answer is itself a paraphrase), revise the stem. The
  paraphrase/analyse boundary is the easiest place to leak this — guard it.

---

## 4. The ramp (R0…R7) + exercise/checkpoint plan

**Design principle:** the ramp is the **official 4-moment method, decomposed one
move per rung**, demonstrated on ONE text the student can hold in their head
(Bakounine), with reasoning-demand rising and scaffolding fading toward two
attempt-first real texts at the summit. Each rung **declares which grille
capacity it builds** (§5). Chapter = `## R<n>` (LESSON-EXPERIENCE-SPEC §1.1);
items render in-line at the end of their rung.

### Text allocation (committed)

| Text | Session | Structure | Role in the lesson |
|---|---|---|---|
| **vérité (Will-Durant-adjacent)** | 2025 N (`NS 05`) | thèse relativiste articulant sens/raison, 2 mouvements | **R0 hook** (a *slice*) **→ returns as r-variation** (full, attempt-first) — arc closure |
| **Bakounine / liberté** | 2024 R (`RS 05`) | thèse-condition + contre-cas + élargissement (la plus linéaire, « structure idéale pour un premier entraînement » per source) | **Fully-worked spine (R1–R6)** — the expert demonstrates every move on it, IN PROSE, not attempt-first |
| **Kant / devoir** | 2023 R (`RS 05`) | opposition de deux exemples parallèles (mobile intéressé vs mobile moral) — fort enjeu conceptuel | **r-bac summit (R7)** — attempt-first, sourced |

Rationale for the split: Bakounine's near-linear structure is the *cleanest*
surface to teach every move without the student fighting the text's complexity —
so it is the **demonstration** spine. Kant's opposition-structure and sharp
conceptual stake (par/conformément au devoir) make it the ideal **attempt-first**
challenge — the student *does* the method. The vérité text bookends the lesson:
its slice hooks R0, its full form returns as the anti-memorization variation
(different structure again — a relativist articulation), giving the summit two
*structurally different* real texts, which is a stronger anti-memorization test
than any fabricated twin.

### Rung-by-rung

- **R0 — Accroche : paraphraser n'est pas analyser.**
  Show a **short slice** of the vérité text (Arabic + FR: « إن الحواس هي معيار
  الحقيقة… » / « Les sens sont le critère de la vérité… »). Present **two student
  responses** to « analyse ce texte » — one that **paraphrases** (walks the
  sentences re-saying them), one that **analyses** (names the thèse, the concept
  en jeu, the move). **Predict-commit** via `cp-r0-predict`: *laquelle des deux
  ANALYSE le texte ?* Confront **MC-01**. Stake: *« En 2 h, face à ce texte, la
  différence entre un 6 et un 16 n'est pas que tu connais plus de philosophie —
  c'est que tu fais CE geste précis. »* Preview the 4 moments + the /20. State the
  Arabic-composition honesty note. (Follows la-liberte R0's predict-then-confront
  shape.) *Confronts: MC-01.*

- **R1 — Comprendre d'abord : dégager le thème et LA THÈSE.**
  The single most load-bearing move — everything downstream hangs on it. Teach
  **thème ≠ thèse ≠ problème**; the thèse is a discutable assertion. Demonstrate
  on Bakounine: thème = la liberté (et autrui) ; thèse = « je ne suis réellement
  libre que par la liberté des autres ». Show the expert's decision: *« je cherche
  la phrase que l'auteur DÉFEND et que je pourrais contester — pas le sujet, pas
  un exemple, pas une vue qu'il combat »*. Rupture-gate. *Confronts: MC-02, MC-03,
  MC-04.* → builds **analyse_tahlil** (thèse).

- **R2 — Construire l'introduction : encadrer + problématiser.**
  From the thèse → the problem it answers → frame to notion/module. **Problématique
  = tension, not reformulation** (compétence الأشكلة, same as dissertation — one
  cross-ref, no re-teach). Make the **find-order ≠ write-order** point explicit:
  *tu TROUVES la thèse d'abord, tu RÉDIGES l'intro en dernier et la places en
  premier.* Demonstrate the Bakounine intro (encadrement module Morale/Politique +
  problématique : la liberté d'autrui borne-t-elle la mienne, ou la fonde-t-elle ?).
  Rupture-gate. *Confronts: MC-05, MC-06.* → builds **comprehension_fahm**.

- **R3 — Suivre le mouvement : la structure argumentative.**
  A text MOVES. Teach the recurring **procédés** (exemple, comparaison, opposition,
  causalité, définition, concession) and the **connecteurs** that signal them.
  Demonstrate the Bakounine movement: thèse posée → renforcement (« plus le nombre
  d'hommes libres… ») → **contre-cas** (« à l'inverse, la servitude… nie mon
  humanité ») → élargissement (« ouverte à l'infini »). Show the expert reading the
  hinge-words. Rupture-gate. *Confronts: MC-07, MC-08.* → builds **analyse_tahlil**
  (argumentation).

- **R4 — Les concepts et les présupposés.**
  Conceptualiser: define liberté / servitude / dignité / personne **as the text
  deploys them** and their relations; then surface the **présupposés implicites**
  (ce que Bakounine tient pour acquis : que la liberté est relationnelle, que la
  dignité de la personne fonde l'argument). Expert decision: *« je définis avec le
  texte, pas avec mon cours ; puis je demande : qu'est-ce qu'il faut ADMETTRE pour
  que ça marche ? »*. Rupture-gate. *Confronts: MC-09, MC-10.* → builds
  **analyse_tahlil** (conceptualiser).

- **R5 — Discuter (le moment le plus raté).**
  Scaffolding starts fading — student attempts before the reveal. **Discuter ≠
  donner son avis**; it comes AFTER analysis and engages the text's OWN concepts.
  Teach the two-step: **interne** (valeur, portée, cohérence, limites *depuis
  l'intérieur* de la thèse) THEN **externe** (positions **convergentes PUIS
  divergentes**, PERTINENTES pour la notion). Demonstrate on Bakounine: convergent
  = Rousseau (liberté par la loi commune), Sartre (liberté et responsabilité vis-à-
  vis d'autrui) — *content the student already owns from `la-liberte`, one line*;
  divergent = une objection libérale de liberté négative / Stirner (la liberté
  d'autrui me borne). Rupture-gate. *Confronts: MC-11, MC-12, MC-13, MC-14.* →
  builds **discussion_munaqasha**.

- **R6 — La synthèse (tarkib).**
  Not a résumé. Teach: **bilan de l'analyse + de la discussion → réponse à la
  problématique → position personnelle ARGUMENTÉE qui rouvre une question.**
  Demonstrate the Bakounine conclusion. Rupture-gate. *Confronts: MC-15.* → builds
  **synthese_tarkib**. Close the arc lightly: « tu as maintenant fait, sur un texte,
  les 4 moments notés sur 20 ».

- **R7 — Summit (attempt-first, born-converted).** See exercise plan below.

### Where scaffolding fades

- **R1–R4:** fully worked on Bakounine (expert shows every decision). Student
  commits only via checkpoints.
- **R5–R6:** partially worked — student attempts the move, *then* the expert reveal.
- **R7:** fully attempt-first on two *new* real texts (Kant, then vérité), no
  in-prose model before the student commits.

### Checkpoint plan (`checkpoints.yaml`)

- **`cp-r0-predict` — commit-gate** (R0, `item_source: original`): the
  paraphrase-vs-analyse MCQ. Correct = the response that *analyses*; distractors =
  the paraphrase model (**MC-01**) + « donne son avis » (**MC-12** lure). Every
  distractor carries a real `misconception:` id — no null tags.
- **Rupture-gates**, one per key misconception zone, cloning the cleanest
  `items.yaml` stems, placed between prompt and reveal at: **R1** (thème/thèse,
  MC-02/03/04), **R2** (problématique = reformulation, MC-05), **R3** (all-sentences-
  equal, MC-07/08), **R5** (discuter = opinion / name-dropping, MC-11/12/13/14),
  **R6** (synthèse = résumé, MC-15).

### Exercise plan (`exercises.yaml`) — the summit

- **`r-bac` — Kant / devoir, 2023 R (`RS 05`).** Attempt-first, full method on the
  two-exemples text. Multi-part `part:` headers mirroring the 4 moments (thèse →
  intro/problématique → structure+concepts → discussion → synthèse). `reasoning`
  on **100 %** of questions (lift the expert prose from the lesson's own worked
  passages — move, don't invent). `sourcing: {status: sourced, note: "2023 session
  rattrapage — alloschool element/142716 (scan RS 05) + le-devoir.md"}`. Present
  Arabic text + FR translation + Arabic consigne verbatim; note that exam
  composition is in Arabic.

- **`r-variation` — vérité / Will-Durant-adjacent, 2025 N (`NS 05`).** The hook
  text returns **in full**, attempt-first, minimal scaffold: *« reconnais la
  procédure sur un texte à structure différente — une thèse relativiste qui
  articule sens et raison »* (anti-memorization stated to the student). Same
  4-moment `part:` shape, `reasoning` on 100 %.

  > **⚠ FLAG for item-author + human — sourcing-status deviation.**
  > SUMMIT-CONVERSION-RECIPE's default requires `r-variation` to be
  > `sourcing: {status: not-applicable}` (a *fabricated* fresh twin). Here the
  > right « variation » for a MÉTHODE lesson is a **new real text**, and we have a
  > third verified one (2025 N vérité). A fabricated philosophical text would
  > violate the no-fabrication norm (analyse-de-texte.md) and risk bad philosophy.
  > **Recommended:** use the real vérité text as the second summit. Resolution
  > options against the live validator (`validate-content.mjs --strict`):
  > (i) keep id `r-variation` with `status: sourced` + honest note — a *documented
  > deviation* (best fidelity, may need a validator carve-out); or
  > (ii) author it as a **second sourced exercise** (e.g. id `r-bac-2`) so the
  > `not-applicable` rule for `r-variation` is not tripped; or
  > (iii) fallback only if a truly `not-applicable` item is mandated — a **short
  > constructed passage clearly labelled** « texte d'entraînement construit pour
  > cette leçon » (the pattern used in la-liberte R4 / theorie-experience R7).
  > **The pedagogical decision (which text, which role) is firm; the YAML id +
  > sourcing status is a reconciliation detail to settle with the human.**

- **Born-converted contract (SUMMIT-CONVERSION-RECIPE §Schema gotchas):** once
  `exercises.yaml` exists, `lesson.md` MUST carry ≥1 own-line `[[exercise:]]` and
  MUST NOT print any solution inline at the summit (no `### Exercice travaillé`,
  no `**Raisonnement à voix haute.**`, no line-start `### À toi`). The R7 rung
  holds only `[[exercise:r-bac]]` then `[[exercise:r-variation]]`, each alone on
  its line.

---

## 5. Barème alignment (honest about what is verified)

**What IS documented** (`philo.yaml.grille_evaluation`, `source: research-consensus`)
— the **5-capacity /20 split**, usable as the ramp's numeric target:

| Capacité | /20 | Rung(s) that build it |
|---|---|---|
| **compréhension (فهم)** — encadrer + problématiser | **4** | R2 |
| **analyse (تحليل)** — thèse + concepts + argumentation | **5** | R1 + R3 + R4 |
| **discussion (مناقشة)** — convergentes + divergentes | **5** | R5 |
| **synthèse (تركيب)** — bilan + position perso | **3** | R6 |
| **aspects formels** — cohérence + langue + lisibilité | **3** | transversal (voir ci-dessous) |
| **total** | **20** | |

**What is NOT verified — do NOT build false precision on it.** The **intra-capacity
sub-splits** in `philo.yaml` (e.g. analyse = thèse 2 / concepts 2 / argumentation 1 ;
discussion = convergentes 2 / divergentes 3 ; synthèse = bilan 1.5 / perso 1.5) are
tagged **`derived`** — *not* verifiable without the official cadre PDF (which is
scanned/protected; the campaign's cadre-challenge confirmed the sub-splits are not
attributable). **Use the 5-capacity /20 to structure and motivate the ramp; present
the finer sub-splits, if at all, as *indicative* (« à titre indicatif »), never as
exam-guaranteed points.** This is the honest position; flag it in `lesson.md` R0
where the /20 is previewed.

**Aspects formels (3 pts) — transversal, not its own rung.** Woven through:
cohérence + lisibilité are produced by the *structured copy* the method yields
(intro / développement / conclusion — built at R2 and R6); **langue = arabe on
exam day** (the Arabic-composition honesty note, §2b). Content-author adds one
transversal callout tying « une copie structurée » to these 3 points; do not
invent a formal-language sub-lesson.

---

## 6. Media / interactive callouts

Only what the concept genuinely needs. Every callout declares **`type` + `tool`**
per the ADR-0017 taxonomy.

- **`anatomie-du-texte` — `type: structural-diagram`, `tool: svg+katex`.**
  The Bakounine text with **progressive annotation overlays** — this is the
  visual heart of the lesson (it *shows* « analyser, c'est voir la structure »,
  the MC-01 rupture made visible). **Staged** (LESSON-EXPERIENCE-SPEC §2.5 — the
  layer order is a teaching gesture):
  - `stages:`
    1. Le texte brut (Arabic + FR), sans annotation — « voici ce que tu vois d'abord ».
    2. La thèse surlignée — « la phrase que l'auteur DÉFEND » (feeds R1).
    3. Les articulations / connecteurs marqués (« à l'inverse », « car ») — le
       texte se découpe (feeds R3).
    4. Le mouvement argumentatif en flèches : thèse → renforcement → contre-cas →
       élargissement — « la lecture : comment le texte AVANCE » (the method/reading
       stage, feeds R3).
  - Placed at R1 (stage 2 pre-revealed) and re-referenced at R3 (advance to stage 4).
  - **Never sent to Gemini** — exact text structure + labels carry meaning.
  - Sidecar `media/anatomie-du-texte.stages.json`, captions matching the above.

- **`carte-methode` — `type: structural-diagram`, `tool: svg+katex`.** A one-screen
  map: the **4 moments → the /20 grille** (intro→4, analyse→5, discussion→5,
  synthèse→3, formels→3). Placed at R0 (preview) and echoed at R6 (arc close).
  Static or lightly staged (one moment at a time); labels are exact → svg+katex,
  not Gemini.

- **(Optional, enhancement) `r0-atmosphere` — `type: atmospheric-illustration`,
  `tool: gemini`.** A calm scene: a student at a desk, a single text sheet, a 2 h
  clock — mood only. **Non-load-bearing** (audit C5): R0 stands without it; mark
  as a commented enhancement slot if not generated. DESIGN-BIBLE preamble
  mandatory.

No `manipulable` and no `motion` asset is warranted — there is no dynamic/temporal
relationship to animate and nothing to drag; the pedagogy is textual and
structural. Recording this explicitly satisfies the motion-decision box
(NOTION-TEMPLATE-V2 A): **static suffices — the lesson teaches a reading method,
not a time-evolving system.**

---

## 7. Build specs (addressed to the authors)

### To content-author (`lesson.md`)

- **Structure:** `## R0 … ## R7`, French prose (§2b), house register (tu/on,
  no academic passive, written-to-be-spoken — NOTION-TEMPLATE-V2 box A "Voice").
- **Every text is a bilingual artefact** (Arabic RTL + French), consigne Arabic
  verbatim + gloss. Copy the texts *verbatim* from the verified sources
  (analyse-de-texte.md, la-liberte.md 2024 R, le-devoir.md 2023 R) — do **not**
  re-translate or paraphrase the Arabic.
- **Predict-commit-confront on every model-teaching rung** (R0–R6): a real commit
  via the checkpoint, never only rhetorical. R0 uses `cp-r0-predict`.
- **Mechanism-why present:** each method move carries its *pourquoi* (why the thèse
  must be found first; why problématique is a tension; why discussion comes after
  analysis). No bare procedure.
- **Reasoning-annotation on 100 % of worked steps:** the Bakounine demonstration
  (R1–R6) must expose the **expert's decision** at each move (« ce que je cherche,
  et le réflexe faux à éviter ici »), not a clean model answer. This is the
  lesson's core value.
- **Content-as-method discipline (hard):** where a text's philosophy is invoked,
  **one-line cross-ref to the notion lesson**, then straight back to method. If a
  paragraph starts *explaining* empiricism/Kantian ethics/Bakounine's politics as
  content, it has drifted out of scope — cut it.
- **"Erreur à éviter" callouts** (house pattern, theorie-experience) at each rung,
  each voicing and breaking the rung's target misconception(s).
- **Born-converted:** R7 holds only `[[exercise:r-bac]]` / `[[exercise:r-variation]]`
  (own lines); `[[checkpoint:…]]` markers where §4 places them. No printed summit
  solution. Internal notes as HTML comments only (stripped at load).
- **Barème honesty:** preview the /20 (5 capacities) at R0; label any sub-split
  « à titre indicatif ». Thread the aspects-formels transversal callout.

### To item-author (`items.yaml` + `checkpoints.yaml` + `exercises.yaml`)

- **Coverage floor: ≥3 items per misconception** before its exhibited count is
  confidence-bearing (15 MCs → ≥45 items floor). **Weight the discussion cluster
  (MC-11…MC-14) higher** — it is 5/20 and the most-failed moment. Append a
  truthful `coverage_summary`; report `floor_met: false` honestly for any
  under-covered model — **never fake counts.**
- **Dual-tag freely.** Most « repère la thèse / la structure / le procédé » stems
  are co-attributable across MC-02/03/04 or MC-07/08 — that is *not* a defect,
  it is required tagging. Every checkpoint distractor carries a real
  `misconception:` id (no null tags).
- **Guard correct-answer contamination** on the paraphrase/analyse boundary: never
  let a stem's phrasing make a paraphrase-model reach the correct option.
- **Item modes for a méthode lesson** (analogue of the PC three-mode requirement):
  (a) **recognition** — « laquelle est la thèse / la problématique / le procédé ? »
  (real text snippets, Arabic+FR); (b) **discrimination** — « analyse vs paraphrase
  vs opinion : classe ces 3 extraits de copie »; (c) **production-adjacent** —
  « voici une problématique ratée (reformulation) : pourquoi échoue-t-elle ? ».
  Use *real text fragments from the 3 sourced texts* as stems wherever possible.
- **Summit sourcing** per §4 (r-bac Kant sourced; r-variation vérité — resolve the
  flagged sourcing-status). Summit unsourced = notion NOT DONE (NOTION-TEMPLATE-V2
  C, BLOCKING) — but here both summit texts are real & verified, so the block is
  satisfiable; only the YAML status label needs reconciling.

### Misconception ledger (NOTION-TEMPLATE-V2 §B — every id claimed)

| Misconception id | Ruptured in prose @ rung | Items |
|---|---|---|
| MC-01 | R0 (`cp-r0-predict`, predict-commit) | recognition + discrimination items |
| MC-02 | R1 | ≥3 |
| MC-03 | R1 (aigu au summit Kant) | ≥3, incl. Kant-text stems |
| MC-04 | R1 / R3 (connecteurs) | ≥3 |
| MC-05 | R2 | ≥3 |
| MC-06 | R2 (find-order ≠ write-order) | ≥3 |
| MC-07 | R3 | ≥3 |
| MC-08 | R3 | ≥3 |
| MC-09 | R4 | ≥3 |
| MC-10 | R4 | ≥3 |
| MC-11 | R5 (+ pre-empted by ramp order) | ≥3 |
| MC-12 | R5 | ≥4 (cluster weight) |
| MC-13 | R5 | ≥3 |
| MC-14 | R5 | ≥3 |
| MC-15 | R6 | ≥3 |

No delegated-to-items-only rows: every model is staged (voiced + broken on its
consequence) in prose, and re-exercised in items.

---

## 8. Open flags for the human gate

1. **Misconception inventory (§3)** — validate/prune against real correcteur
   experience. The human knows where بكالوريا candidates actually fail تحليل النص;
   this is the one thing not to fabricate.
2. **r-variation sourcing-status deviation (§4)** — pick option (i)/(ii)/(iii).
   Recommendation: use the real vérité text (fidelity > fabrication).
3. **Barème sub-splits (§5)** — confirm the 5-capacity /20 is safe to present as
   the ramp target, and that intra-capacity splits stay « indicatif ». If the
   official cadre PDF ever becomes attributable, revisit.
4. **Unit placement** — confirm « Méthode de l'épreuve » as a new unit and that
   the two other méthodes (السؤال dissertation, القولة) are separate future
   lessons, not folded here.
5. **Text verification status** — the vérité text is `corrigé` (2 divergences
   aligned), Bakounine + Kant are `vérifié`. All three are usable; confirm no
   re-verification is required before the summit ships.
