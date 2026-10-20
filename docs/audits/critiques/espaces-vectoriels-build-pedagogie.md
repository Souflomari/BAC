<!-- Rapport du pedagogy-critic (vague 1) sur le chapitre CONSTRUIT, copié tel quel le 2026-10-20 depuis la session cloud. Numéros de ligne à la date du rapport (fa9fc061). -->

# PEDAGOGY CRITIC — WAVE 1 — R8 « Espaces vectoriels » (BUILT artefact)

**Verdict: FIX THEN SHIP.** One BLOCKING contradiction at the summit, four IMPORTANT findings, nine MINOR. The spec's three prior BLOCKINGs (B1 no summit, B2 unclaimed ledger rows, B3 combinaison linéaire undefined) are **genuinely closed in the built artefact** — I verified each, not on trust. The teaching spine is above bar in five places I would hold up as house exemplars.

Files (absolute):
`/home/user/BAC/content/maths/structures-algebriques/lesson.md` (R8 = lines 785–1200) · `…/checkpoints.yaml` · `…/derivations.yaml` · `…/exercises.yaml` · `…/items.yaml` · `…/media/{sous-espaces-plan,echelle-dimensions-r3}.{svg,stages.json}` · spec `/home/user/BAC/docs/pipeline/propositions/maths-structures-espaces-vectoriels.md` · renderers `/home/user/BAC/web/src/components/notion/{Derivation,CheckpointItem,AttemptFirstExercise,NotionBody,ChapterQuestions}.tsx`, `/home/user/BAC/web/src/lib/{content.ts,shuffle.ts}`.
Short forms below: `lesson.md:N`, `cp.yaml:N`, `der.yaml:N`, `ex.yaml:N`, `items.yaml:N`, `spec:N`.

---

## 0. What I recomputed (so the findings are measurements, not impressions)

- **All 59 derivation steps** in `der.yaml` and **all 24 exercise steps** in `ex.yaml` (r8-bac q1–q2, r8-variation q1–q3): arithmetic re-derived independently. **Zero errors.** Including r8-variation's new object (`I = M(1,0)`, `J = M(0,1) = ((0,1),(−1,−1))`, `xI+yJ = M(x,y)`, `λM(x,y) = M(λx,λy)`, `dim E = 2`) and r8-bac's `E = ((x+y,y),(2y,x−y))`.
- **All 18 item keys and every distractor premise** SA-36…SA-53, plus the four checkpoint keys and their premises (incl. SA-41's premise — `Z` *is* stable for `×`: I verified `A+B` equals the bottom-right coefficient; and SA-50's plane `6x+y−3z=0` through all three vectors with `(1,0,0)` giving 6). **Zero errors.**
- **The coverage table** (`items.yaml:3831-3838`): I recounted every id at item level. 6/4/5/8/6/4/3/3 for M1…M8 ✓, `generalisation-hative` 17 ✓, `cloture-non-verifiee` 10 ✓, `axiome-oublie` 8 ✓, `neutre-non-transporte` 6 ✓, `total_items` 53 ✓, `ramp_coverage.R8` 18 ✓. Every prescribed double-tag is implemented (spec:1934-1936 vs SA-37 D, SA-41 C, SA-42 D, SA-45 D, SA-48 D, SA-50 D, SA-52 C).
- **Collision / pre-solve sweep:** no item, checkpoint or worked example carries the object of `r8-bac` or `r8-variation`. `J = ((0,1),(−1,−1))` (ex.yaml:462) ≠ the lesson's `B = ((0,1),(−1,1))` (lesson.md:1033) — the spec's E3 repair holds in the build. SA-45's and SA-50's vectors are fresh (neither reuses [C8]/[C9b]).
- **Chapter length:** R8 is **416 student-visible lines** (lesson.md:785–1200; the author note at :1202–1233 is a stripped comment) against the spec's authored budget of **230 ± 30** (spec:1491) and ~154 lines for the next-longest chapter (R7, lesson.md:571–724). 15 `###` sections in one `##` chapter.
- **Render truth:** items render **inline at the end of their own chapter**, keyed by `rung`, in authored order (`NotionBody.tsx:466-468, 827-828`; `ChapterQuestions.tsx:28`). No R8 checkpoint is a clone, so **all 18 items render** (`ItemsSection.tsx:38-41` filter is empty for R8). Choices are deterministically shuffled per item id (`shuffle.ts:121`), so the authored A=key in 18/18 items is **not** a position cue. Derivation notes render markdown+KaTeX (`Derivation.tsx:34-46`); derivation *titles* render as plain uppercase text (`Derivation.tsx:98-102`) — none of the 11 titles contains math ✓.

---

## 1. TEMPLATE V2 — box by box

### §A Per-rung (R8)

| box | verdict | citation |
|---|---|---|
| **Predict-commit-confront** | **PASS** (with caveat) | Four real MCQ commits, each strictly **before** its reveal: `lesson.md:799 → 801` (pre-definition, pre-criterion), `:887 → 889-901`, `:1041 → 1043`, `:1059 → 1061`. No answer leaks ahead of any of them (I checked the 40 lines before each; the figure that would spoil pari 2 is correctly held to `:903`). **Caveat:** all four sit in `:799–1059`; `:1061–1200` (34 % of the chapter, blocs D-tail + E) carries no commit at all. See I-1. |
| **Mechanism-why** | **PASS** | `:843` + `:859` (the third condition is *exchanged*, not removed — and the exchange is *paid for* by `−u = (−1)·u`); `:823-839` (both consequences derived, with the cross-reference to the ring gesture); `:943-947` (Vect proved to be a subspace); `:1017-1031` (**why a base must be free** — uniqueness, then the cost of a tied family shown on `(t₁,t₂,t₃)`); `:1081`; `:1089-1091` (shortcut admitted *and* its reverse reading broken); `:1128-1136` (injective ⟺ trivial kernel, demonstrated, not admitted). One small gap at `:847` (m-3). |
| **Reasoning-annotation 100 %** | **PASS on the letter, BELOW the exemplar** | 59/59 step notes present (`der.yaml`), and the five prose decision annotations all landed: `:865`, `:911`, `:965`, `:1081`, `:1122`. `:1122` fully closes the old worst case (the antecedent pulled from a hat): « *Deux équations, trois inconnues : … on **choisit** la valeur la plus commode … compter les degrés de liberté, choisir, remonter.* » **But:** ~25 of 59 notes restate the transformation just performed (e.g. `der.yaml:42, 46, 48, 89, 102, 155`), and **0 of 59 name a wrong reflex** — the hallmark of the house exemplar (`content/pc/rlc-serie/derivations.yaml:34` « *Le réflexe fautif classique : …* »; EXEMPLARS.md:14-19). See I-4. |
| **Voice** | **PASS** | `:787-797` (hook), `:865`, `:911`, `:1192` read aloud cleanly; tu/on, imperatives, no detached passive. Minor: the editorial « nous » at `:791`, `:821`, `:907` (m-2). |
| **Display-math / Derivation split** | **FAIL** | The component/prose split is *authored* and honoured (`der.yaml:6-11` ↔ spec:1511-1523) and each component step is one transformation ✓. But four multi-transformation derivations sit in **neither** register: `lesson.md:1031` (a 4-step freeness check inline, in a parenthesis), `:1162`, `:1170` (a 4-step group proof entirely inline, no block math at all), and `ex.yaml:357, 377, 379` (chained `a = b = c` inside single Derivation steps, `:379` beginning with a bare `=`). See I-3. |
| **Motion-decision** | **PASS** | Explicit static-suffices justification (spec:1413-1415, nothing in the chapter is temporal); both figures are staged and learner-paced. |
| **Orthotypography** | **PASS** | Zero U+2019 / U+202F in `lesson.md` and the four YAMLs (grep); conversion happens at render (`Derivation.tsx:38`, `ChoiceButton.tsx:67`, `AttemptFirstExercise.tsx:81`). SVG text correctly hand-types curly (`sous-espaces-plan.svg:80`). |

### §B Misconception ledger — **PASS, every row claimed**

| id | ruptured in prose @ rung | OR delegated (written) | verdict |
|---|---|---|---|
| M1 `sous-espace-zero-suffit` | `lesson.md:885-901` — the model is run to its own consequence, two conditions pass, `+` falls; commit `cp.yaml:630` | — | **PASS** |
| M2 `sous-espace-vs-sous-groupe` | `lesson.md:787-805` — the hook **is** the rupture, commit before any definition (`cp.yaml:545`); reinforced by the exchange table `:853-859` | — | **PASS (gold)** |
| M3 `famille-libre-mal-testee` | `lesson.md:971-993` — voice (first person, `:975`) → test (all checks pass, `:979`) → break (`:991` « *Le test par paires a dit oui ; la définition dit non. L'un des deux est faux, et ce n'est pas la définition.* ») → reason (`:993`). Heading is now neutral (the old spoiler is gone). Also a face of commit `cp.yaml:845-856` | rhetorical engagement written at spec:1169 | **PASS** |
| M4 `dimension-compte-parametres` | commit `cp.yaml:801` → `lesson.md:1061-1065` + the matrix twin `:1067-1075` | — | **PASS** |
| M5 `dimension-lue-sur-la-notation` | **NEW** commit `cp.yaml:717` → `lesson.md:1043-1049` + figure stage 2 (`echelle-dimensions-r3.stages.json:5`) | — | **PASS — the prior B2 is closed** |
| M6 `noyau-toujours-nul` | `lesson.md:1116-1118` (a kernel of dimension 1) + `:1128-1136` (the equivalence, demonstrated) + `:1172-1178` | **yes**, spec:1170 — 4 items | **PASS by written delegation** (the model itself is never voiced; legitimate, but see I-1 — bloc E has no commit at all) |
| M7 `sous-espace-affine-confondu` | `lesson.md:883` — the wrong syllogism quoted verbatim and broken on the word « linéaire » itself; + `:1111` (g) + figure stage 2 | spec:1171 | **PASS (gold)** |
| M8 `famille-generatrice-non-verifiee` | `lesson.md:1011` (« *Ces vecteurs touchent les trois coordonnées, donc ils engendrent tout* » — voiced, killed by `(0,0,1)`) + `:1051-1055`; engaged as a face of `cp.yaml:775-790` | spec:1172 | **PASS** |

### §C Summit

| box | verdict | citation |
|---|---|---|
| Attempt-first, never printed | **PASS** | `lesson.md:1194`, `:1200` render through `AttemptFirstExercise` (per-question commit; reasoning absent from the DOM pre-commit, `AttemptFirstExercise.tsx:4-16, 214-229`). No solution printed in prose: `:1186` deliberately withholds what q2 inherits, and `:1192` states the contract to the student (« *ici, on ne te demande pas de reconnaître une réponse, mais d'écrire une démonstration* »). |
| Reasoning on every summit question | **PASS on presence, FAILS on content for q1** | All five questions carry `reasoning` + annotated `steps`. But `ex.yaml:353` teaches the four-axiom re-check — see **B-1**. |
| **BLOCKING real-bac sourcing** | **PASS** | `ex.yaml:322-336`: `status: sourced`, 2023 session normale, SM, NS 24F, Exercice 5, Partie I q1–q2, chained to `bank.yaml:1439-1451` (independent AlloSchool re-fetch + character-by-character diff, adversarial verifier, 2026-08-06). *Caveat for the owner: this is an inherited verification, not a fresh owner confirmation.* |
| Anti-memorization variation | **PASS** | `lesson.md:1198` states it to the student (« *Si tu as retenu la méthode plutôt que les nombres…* »); `ex.yaml:394-412`; object originality controlled element-by-element (spec:2040-2057) and verified by me. |

### §D Hook

| box | verdict | citation |
|---|---|---|
| Concrete phenomenon/stake before any definition | **PARTIAL** | Opens on a real exam sentence and takes it apart (`:787-791`) before any definition ✓ — but the stake is entirely exam-internal and the chapter has **no real-world parallel or analogy anywhere in 416 lines**. See I-2. |
| Real commit | **PASS (gold)** | `:799` + `cp.yaml:545-619`; the distractor D shares the key's verdict with a false reason and still discriminates (`cp.yaml:605-619`) — exactly the technique that fixes I-5 elsewhere. |
| Stands without pending assets | **PASS** | First marker after the hook is the checkpoint; both figures exist. |

### §E Assets — **PASS on all four**

4 checkpoints + 2 figures + 11 derivations + 2 exercises; every marker resolves (`cp.yaml:545/630/717/801`; `der.yaml` 11 ids ↔ `lesson.md:915/967/1001/1007/1035/1047/1063/1073/1083/1116/1124`; `ex.yaml:320/394`; both SVG + sidecars). Stages authored, captions teach *which condition falls* rather than recap (`sous-espaces-plan.stages.json:4-6`), `step-N` groups match stage counts (`sous-espaces-plan.svg:36/62/84`, `echelle-dimensions-r3.svg:37/60`). Math is live KaTeX, never imaged. Authoring channel: the note is an HTML comment (`:1202-1233`) stripped at load (`content.ts:547-550, 1100`); grep finds **zero** rung codes, item ids, `[C…]` codes or choice letters in student-visible text.

---

## 2. Findings

### BLOCKING

**B-1 — The summit's « expert reasoning » teaches the method the chapter tells the student not to write.**
`ex.yaml:353` (r8-bac q1): « *c'est montrer que (E,+) est **lui-même** un groupe — la même démarche qu'au chapitre 4 … on **recoche les quatre axiomes**, un par un* », with step 3 spending a line on associativity (`ex.yaml:361`) and step 5 concluding « *Les quatre axiomes sont vérifiés dans E* » (`:365`).
The chapter teaches the opposite, twice, in bold: chapter 5 at `lesson.md:336` — « *Remarque surtout ce qui n'a **pas** été écrit : pas une ligne sur l'associativité* » — and chapter 11 at `:1164` — « *les trois conditions du chapitre 5, **sans une de plus*** », plus the exchange table at `:853-857` (three conditions on each side). The spec itself lists « revérifier les huit axiomes » as a wrong model (spec §8.9). And **our own variation contradicts our own bac exercise**: `ex.yaml:419` opens q1 with « *C'est le critère du sous-groupe (chapitre 5) : trois conditions* ».
This is the one place where the student calibrates their own redaction against the expert, immediately after committing an attempt (VISION L65-71: the student must learn *how an expert decides* — and an expert here decides to use the criterion and to say so).
*Cause, not blame:* spec:1997-1998 ordered `stem`, `reasoning` **and** `steps` transcribed from `bank.yaml` « repris tels quels », and that bank text was written before chapter 11 existed. Fidelity requires the **stem** verbatim; `reasoning` and `note` are our teaching, not the sujet's.
*Minimal fix:* rewrite q1's `reasoning` and steps 3/5 to the three-condition criterion, keeping « l'associativité est héritée, donc on ne l'écrit pas » as the expert *decision* (which is the economy the lesson earned); mirror in `bank.yaml:1489-1498` per the twinning note. **Stem untouched.** Owner: **pedagogy-architect** (amend the transcription rule to cover prose/notes), then **item-author**.

### IMPORTANT

**I-1 — The last third of the chapter is unchecked, and it is where three new concepts arrive.**
Commits end at `lesson.md:1059`. Lines `1061–1200` (140 lines, 34 % of the chapter) introduce *application linéaire*, *noyau* and *image* plus the injectivity equivalence and the group-kernel section with **no commit, no written-attempt invitation** (compare `:933`, « *Fais le regroupement toi-même … avant de lire la suite* », which exists in bloc B). VISION L62-63: « *A hard concept gets as many segments as it needs, **each checked before moving on*** ». The spec's §6.7 row is honest (« il lit ») and spec:1170 delegates **M6** — but the delegation covers a misconception, not three new definitions. *Minimal fix:* one commit in bloc E (the natural one is a pari on `ker f` before `:1116` — « deux équations, trois inconnues, que vaut le noyau ? » — or on whether `g(x,y)=(x+1,y)` is linear), **or** a written decision in the spec that bloc E is read-only and why. Owner: **pedagogy-architect**.

**I-2 — The summit never climbs bloc E, and bloc E is never produced.**
`r8-bac` is sous-groupe → sous-espace; `r8-variation` is sous-groupe → sous-espace → base. **Neither touches application linéaire, noyau or image** — 85 lines of teaching (`:1093-1178`) whose only assessment is four MCQs that render *after* the summit. VISION L80-82: « *By the top, real bac questions feel routine — because the student was deliberately built up to them* »; here the top is built from blocs B/C/D and the last taught block is never climbed. The attested sujet cannot cover it (the 2023 énoncé doesn't ask), but the **variation is ours** (`sourcing: not-applicable`) and the chapter already built the bridge — `φ` at `:1138-1150` makes « ker φ = libre, Im φ = génératrice » the chapter's own revelation. *Minimal fix:* a q4 on the variation (« φ(x,y) = M(x,y) : donner ker φ et Im φ, et conclure »), or a written delegation. Owner: **pedagogy-architect** + **item-author**.

**I-3 — Display-math box fails in four places, two of them the chapter's densest algebra and two at the summit.**
`lesson.md:1031` — a four-transformation freeness check run inline inside a parenthesis. `:1162` and `:1170` — the group-kernel proofs (`f(x') = (f(x))'`, and injectivity ⟸ trivial kernel) are 3–4-step arguments with **no block math at all**, which is neither register (the template's « narrated » register still uses blocks between prose). `ex.yaml:357, 377, 379` — chained `a = b = c` inside single Derivation steps, contradicting the component's own one-transformation-per-step grammar (`Derivation.tsx:48-59`), with `:379` rendering a display block that begins with a bare `=`. The variation's steps obey the grammar throughout, so the **sourced** summit is the sloppier of the two. *Minimal fix:* split the three `ex.yaml` steps (mirror in `bank.yaml`); promote `:1031`, `:1162`, `:1170` to one-transformation blocks (or a short derivation for `:1170`). Owner: **content-author** (lesson) + **item-author** (exercises/bank).

**I-4 — The step notes are present but descriptive; the expert's voice is not inside the component where the student paces.**
Of 59 notes, ~25 restate the move just made (`der.yaml:42, 46, 48, 89, 102, 117, 155`…) and **none** names a wrong reflex or a trap. EXEMPLARS.md:14-19 defines the standard as « *the expert's **DECISION** layer … the reflex … the trap named as a model* », realised in `content/pc/rlc-serie/derivations.yaml:34, 36`. The decision layer here lives almost entirely in the five prose paragraphs — excellent ones — but the student spends his step-by-step attention inside the component, where the voice goes quiet. *Minimal fix:* ~10 notes rewritten to carry the reflex at the step where it strikes (the obvious ones: `der.yaml:89/134/155` « on calcule la combinaison générale » → *why* a null combination is the only honest test; `der.yaml:102` → the reflex of reading the dimension off the four letters; `der.yaml:52` → what a final « 0 = 0 » would have meant). Owner: **content-author**.

**I-5 — Seven of eighteen items (and two of four checkpoints) are solvable by counting verdicts.**
In SA-36, SA-37, SA-40, SA-42, SA-43, SA-44, SA-50 the key is the **only** option with the negative verdict (Non / Liée / « pas un sous-espace »), the other three all affirming; SA-45's key is the only non-3. `cp.yaml:630` compounds it: the stem *tells* the student that two of three conditions pass (`:639-646`) and then offers one « Non » against three « Oui » — a student who has understood nothing picks the odd verdict. `cp.yaml:801` has three options saying « 3 » against the key's « 2 », with the stem priming 3 (« *Trois vecteurs, trois coefficients* »).
Because all 18 render as **one continuous list at the end of the chapter** (`ChapterQuestions.tsx:32`), the pattern is learnable **within the lot itself**. VISION L84-86: wrong answers must reveal *which* model is running; a key reachable by heuristic weakens the whole lot's diagnostic signal. The spec half-saw this — §11.2 (spec:1866-1877) explicitly removed a second « liée » option from SA-43 D *so that « un élève qui ne lit que les verdicts » is not rewarded*, and thereby created the opposite cue. The remedy is already house practice and spec-endorsed: `cp-r8-pari-scalaire`'s D shares the key's « Non » with a false reason and discriminates perfectly (`cp.yaml:605-619`, spec:2443-2449). *Minimal fix:* give two or three of the seven a second negative option with a false reason; same for `cp.yaml:630`. Then run `indice-absolu` + `indice-longueur`, which spec:2561 records as **never run on the final wording** (I could not run them). Owner: **item-author**.

**I-6 — 416 lines in one chapter, against an authored budget of 230 ± 30 — with the chapter-count gate making the obvious fix illegal.**
`lesson.md:785–1200`, 15 `###` sections, 60 % over the spec's own ceiling (spec:1491) and ~2.7× the next-longest chapter (R7, `:571-724`). The chapterize renderer paginates on `##` only (`NotionBody.tsx:466`), and spec:1503-1506 forbids a new `##` (it would show a phantom chapter on the student's map). So the student receives one 40–50-minute reading slab whose unchecked tail (I-1) is also its most abstract part. This is a calm/flow matter as much as a pedagogy one, and the fix is **not** content-author's to improvise: it is either a trim of bloc E's tail, or an owner decision to allow a 12th `##` and re-seal `carte-chapitres`. Owner: **pedagogy-architect** → owner.

### MINOR

- **m-1 — Ramp inversion at the end of the chapter (house-wide, not a regression).** The 18 MCQs render *after* both attempt-first exercises (`NotionBody.tsx:827-828`), so the student produces a full bac redaction and *then* answers an easy-2 recognition item (SA-36). VISION L73-79 wants easy → hard → bac → variation. R7 already has this shape, so **no revision should blame this build** — but it is a product-level ramp defect worth routing (owner: pedagogy-architect + renderer).
- **m-2 — Editorial « nous » in a tu/on register:** « *Dans les sujets que nous avons lus* » at `:791`, `:821`, `:907`. Required by spec F7 to avoid frequency claims, but it reads as an author's note rather than a tutor speaking. A tutor-register equivalent exists (« les sujets que tu as devant toi posent presque toujours… » is forbidden; « ici, c'est l'énoncé qui pose l'espace » is not).
- **m-3 — The one unbridged « pourquoi ».** `:847` substitutes « *H n'est pas vide* » with « *en pratique, on montre que 0_E ∈ H* » and never says why the substitution is legitimate (one line: non-empty + condition 3 gives `0·u = 0_E ∈ H`, already proved at `:823-829`).
- **m-4 — SA-37's reason is pre-stated in the lesson.** `:901` already concludes « *Leur réunion n'en est pas un : deux points pris sur des axes différents s'additionnent hors des deux* »; SA-37 asks the same thing on `y=x`/`y=−2x`. The spec's no-pre-solve rule is about *objects* (met), but the transfer is thin for an `application_non_explicite`/3.
- **m-5 — Item order crosses bloc order.** Authored order is SA-45/46/47 (bloc D) → **SA-48 (bloc E)** → SA-49 (bloc D) → **SA-50 (bloc C: génération)** → SA-51/52 (bloc E) → SA-53 (groups). The génération item arrives 15th, after linear maps; and the block closes on the chapter's most peripheral content. Items render in authored order, so this is what the student walks.
- **m-6 — A dead cross-reference in an expert note.** `ex.yaml:362` : « *comme pour l'ensemble E du sujet 2022* » — a bank exercise the student may never have opened.
- **m-7 — Mixed math register inside notes.** `der.yaml` notes are plain Unicode (`λ`, `α`, `ℝ³`) with one KaTeX exception (`der.yaml:27`), while `ex.yaml`'s variation notes are KaTeX throughout (`:426`, `:428`, `:434`). Same component, two typographies for the same objects; the exemplar (`rlc-serie/derivations.yaml`) is KaTeX. Design critics may own the final call.
- **m-8 — A small sequencing stutter at pari 2.** `:885` announces « *Voici un ensemble qui le passe* » without naming it, the checkpoint names and defines `X`, then `:889` re-introduces it as new (« *Soit X = …* »). Harmless, but the seam shows.
- **m-9 — The figure placement remains a recap for stages 1–2**, as the spec admits (spec:1384-1394): both objects are fully resolved in prose before `:903`. The decision is written and the captions were re-authored to teach « which condition falls », so the box passes; recording it so no one re-opens it as new.

---

## 3. What the build got right (do not undo this in revision)

1. **The hook + `cp-r8-pari-scalaire` is a house exemplar** (`:787-805` + `cp.yaml:545-619`): the exam sentence taken apart, the new idea named (« *une seconde loi dont l'un des deux opérandes vient d'ailleurs* »), a **real commit before any definition exists**, on an object the student proved in chapter 5, broken by one couple — and two « Non » options so the verdict cannot be read off. Matches EXEMPLARS.md:30-41 beat for beat.
2. **The criterion is now an *exchange*, not a subtraction** (`:853-859`). The prior critique's I5 (a headline that re-armed M2) is closed, and the new wording is better *teaching*: the external law is named as the price, and « tout sous-espace est un sous-groupe, la réciproque est fausse » lands on the hook's own counter-example.
3. **« Pourquoi exiger libre ? » is answered where base is defined** (`:1017-1031`), with the cost of a tied family shown on numbers (`(4,5)` written two ways) and the punchline earned: « *non pas la capacité d'écrire, mais le droit de parler de coordonnées* ». The prior I3 is closed, and `[C17]` keeps its punch.
4. **`:1122` is the best annotation in the chapter** and closes the prior critique's worst reasoning gap: the antecedent is *constructed* (count degrees of freedom → choose → climb back → verify), named as a three-beat method.
5. **M3's rupture (`:971-993`) and M7's (`:883`) are exemplar-grade**: both quote the wrong model in the student's own voice, run it to its own contradiction, and only then state the structure. `:883`'s « *le mot « linéaire » du collège n'est pas celui de ce chapitre* » is the kind of sentence that actually dislodges a model.
6. **The combinaison-linéaire/Vect beat (`:919-955`) closes B3 properly** — defined on a concrete pair, Vect proved to be a subspace *before* it is used, the compact form given **with** the exam warning that the three-line redaction is what earns the point.
7. **The summit is real and sourced**, the variation is genuinely fresh, and the lesson tells the student the contract of each (`:1192`, `:1198`). `:1037`'s forward promise (« *tu rencontreras cette configuration à la fin du chapitre, et c'est toi qui la produiras* ») is exactly the right anti-spoiler teaser.
8. **The admitted shortcut is fenced on both sides** (`:1089-1091`): admitted *after* the direct method, then its reverse reading broken on `(w₁,w₂,w₃)` — the chapter's own earlier object. This is how an admitted result should ship.
9. **Honest debt is written, not hidden** (`items.yaml:3957-3981`): two dry floors, a model that reaches a key, four undeclared models, and the unattested half of the chapter — all named with their reason.

---

## 4. Verdict

**FIX THEN SHIP.**

- **B-1 must land before this is student-facing** — the summit currently models the method the chapter forbids, and the fix touches only our prose, never the sourced stem.
- **I-1 + I-2 should land together** (one commit in bloc E, one question added to the variation): they are the same hole seen from two sides — the chapter's last third is neither checked nor climbed.
- **I-3, I-4, I-5** are mechanical and cheap, and I-5 carries an unrun gate (`indice-absolu`, `indice-longueur`) that must be run on the final wording per spec:2561.
- **I-6** is an owner decision, not an author fix.
- Everything in §3 is above bar and should survive the revision untouched.

Read-only review: nothing was edited.

