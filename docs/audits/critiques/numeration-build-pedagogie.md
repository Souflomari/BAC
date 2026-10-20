<!-- Rapport du pedagogy-critic (vague 1), copié tel quel le 2026-10-20 depuis la session cloud. Numéros de ligne à la date du rapport (lesson.md avant correctifs). -->

# pedagogy-critic — WAVE 1 review of the BUILT R7b « Les systèmes de numération »

**Objects read in full:** `/home/user/BAC/content/maths/arithmetique/lesson.md` (R7b = lines 599–835, plus R0/R2/R5/R6b/R7 for house convention), `checkpoints.yaml` (the three `cp-r7b-*` blocks + the perimeter header), `exercises.yaml` (`r-numeration` + `r-bac` for schema), `items.yaml` (the four `numeration-*` families, AR-41…AR-52, `coverage_summary`), `media/numeration-cascade-2025-base7.svg` + `.stages.json`.
**Against:** `docs/product/VISION.md` L48–96, `docs/pipeline/NOTION-TEMPLATE-V2.md` §A–§E, `docs/pipeline/EXEMPLARS.md` §1–3, the spec `docs/pipeline/propositions/maths-arithmetique-numeration.md`, and the prior critique `docs/audits/critiques/numeration-pedagogie.md`.
**Also checked at the render layer** (because three findings depend on it): `web/src/components/notion/ChapterQuestions.tsx`, `ItemsSection.tsx:92-116`, `LessonRenderer.tsx:73-95`, `web/scripts/dom-truth.mjs:325-328`, `docs/design/LESSON-EXPERIENCE-SPEC.md` §1.1.

I recomputed **every number** in the rung, the three checkpoints, the twelve items and the four exercise questions. All are right **except one general lemma** (finding 2). The prior critique's four BLOCKING/IMPORTANT items (B1 staged N3, B2 top-of-ramp commit + attempt-first, B3 pre-solved items, I1 the false "invisible error") are all genuinely closed in the artefact — verified, not taken on trust.

---

## 1. TEMPLATE V2 box-by-box verdict (one verdict + citation each)

### §A — per-rung boxes

| box | verdict | citation / note |
|---|---|---|
| **Predict-commit-confront** | **PASS with a quality finding** | Three REAL commits, all before their reveal: `lesson.md:611→613→615` (`cp-r7b-predict-ecriture`), `:637→639→641` (`cp-r7b-ordre-restes`), `:716→718` (`cp-r7b-retenue`). Three further predicts are **written-gate only** (`:732`, `:752`, `:785`) — the template permits that, but one of them is not a gate at all. See **finding 1**. |
| **Mechanism-why present** | **FAIL on exactly one claim** | Mechanism is strong and everywhere else: `:619-623` (why `0 ≤ a_i ≤ b−1`: "b unités d'une colonne font exactement un paquet de la suivante"), `:627` (why successive divisions ARE the packing), `:657` (why the first remainder is the units digit), `:712` (why the column overflows at b, with the euclidean-division form), `:724-730` (both comparison rules carry their raison), `:740-748` (criteria re-derived, never recited). The single failure is the rung's only theorem — existence/uniqueness — at `:659`. See **finding 3**. |
| **Reasoning-annotation on 100 % of worked steps** | **PASS** | « Ce qu'on cherche et pourquoi ce geste » at `:627`, `:678`, `:690`, `:702`, `:722`, `:740`, `:775`; expert decisions, not algebra: `:686` (the zero is a coefficient, not a blank), `:712` (ten plays no role), `:740` ("On ne récite pas de règle : on regarde à quoi la base est congrue"), `:783` ("on ne « divise pas par 3 pour voir »… on invoque le théorème après avoir vérifié son hypothèse"), `:789` (why bounds come before the algebra). 8 of the spec's closed list of 9 decisions are present; #2 (the nested form of E2) went out with its beat, which is the spec's own cut no. 1 (`spec §8.4`) — legitimate. |
| **Voice** | **PASS, two stumbles** | tu/on throughout, imperatives ("Fixe un entier", "Mets ce réflexe à l'épreuve", "Fais l'essai inverse", "Écris maintenant 950 en base 6"), zero detached passive. Two sentences do not survive being said aloud: `:730` « Rien plus à droite ne peut rattraper l'écart. » (ungrammatical as punctuated) and `:623` (an em-dash clause closing into a comma: « — , et où »). |
| **Display-math discipline** | **PASS for the register choice, FAIL of craft in one beat** | Narrated blocks (not `Derivation`) is the right register for E6/E7 — prose between blocks carries the argument, per spec §8.3. One transformation per line at `:629-635`, `:680-684`, `:744-748`, `:756-760`, `:777-781`. No `a=b=c=d` chains in display math. But the **multiplication** — the rung's harder posed operation — is delivered as two inline prose sentences (`:704`, `:706`) while the easier addition gets a per-column table (`:692-696`). See **finding 4**. |
| **Motion-decision rule** | **PASS** | Explicit static-suffices justification recorded, spec §7.4 and in the artefact at `lesson.md:833` ("rien n'évolue dans le temps ici ; l'ordre de lecture des restes est mieux servi par un étagement que l'élève contrôle"). |
| **French orthotypography** | **PASS** | Plain ASCII apostrophes throughout the markdown (`:603`, `:623`, `:714`…); no hand-typed U+202F. The SVG, which bypasses the pipeline, hand-types the curly apostrophe (`svg:3`, `:86`, `:120`) — correct per the Day-7 split. |

### §B — the misconception ledger (no unclaimed row)

| id | ruptured in prose (staged: voice → test → break) | commit | items |
|---|---|---|---|
| **N1** `numeration-restes-ordre-inverse` | **YES — exemplar-grade.** `lesson.md:647-655`: the wrong model is voiced in the student's words (« le premier reste, c'est le chiffre de gauche, puisqu'on lit de gauche à droite »), **tested** on a smaller number (100 base 6), **broken on its own consequence** (442₍₆₎ = 170, "On cherchait 100. Le réflexe ne survit pas à sa propre vérification"), and only THEN the reason (`:657`). | `cp-r7b-ordre-restes` (`checkpoints.yaml:487`), before the reveal at `lesson.md:641` | AR-41,42,43,44,47,48,50 |
| **N2** `numeration-ecriture-prise-pour-le-nombre` | **YES** — hook commit before any explanation (`:609-615`), then the inter-base beat « Ni l'un ni l'autre » (`:732-736`) with the house « Le piège à éviter » gabarit. | `cp-r7b-predict-ecriture` (`:417`), whose wrong-answer feedback NAMES the model | AR-41…46 |
| **N3** `numeration-contraintes-sur-les-chiffres` | **YES — the best rupture in the rung.** `:785-789`: (4,6) **passes the equation** (34 = 34) and still designates a writing that does not exist; "l'équation seule ne pouvait pas le voir", then the expert decision (bounds first). This is exactly the prior critique's B1 fix, delivered. | written gate only (`:785`) | AR-50,52 (+41,46,49) |
| **N4** `numeration-retenue-a-dix` | **PARTIAL** — `:712-714` gives the mechanism and a chiffré negative control, but the break lands on **legality** ("le chiffre 7 n'existe pas en base 7"), not on value; the dangerous legal-looking case is only asserted in general ("dès qu'une colonne atteint 10 … l'erreur devient invisible") and is delegated to the gate. | `cp-r7b-retenue` (`:554`) — note it is placed AFTER the teaching, so it is an application check, not a prediction | AR-47,48,49 (**AR-48 is not rendered** — finding 13) |
| `critere-divisibilite-mal-applique` | **YES — exemplar-grade.** `:752-754`: « Un réflexe guette alors : "la somme des chiffres, c'est LE critère" » → predicts remainder 7 mod 8 → truth is 1 → "le réflexe casse sur sa propre conséquence" → then the reason (7 ≡ −1 mod 8). | written gate only (`:752`) | AR-51,52 (+ 4 existing) |

**No unclaimed row.** All five ledger lines are claimed and four of the five are staged to the EXEMPLARS §2 anatomy.

### §C — the summit

- **Attempt-first, never printed:** PASS. The notion summit is unchanged (`r-bac`, 2019, `sourcing.status: sourced`). `r-numeration` is a rung-level attempt-first entry with the house schema (`exercises.yaml:244-328`); no solution is printed in prose, and the lesson tells the student the contract (`lesson.md:808`: "engage-toi sur chaque question avant d'ouvrir le raisonnement").
- **Reasoning on every summit question:** PASS in form (all four questions carry `reasoning` + per-step `note`, including the two non-cuttable decisions #8 "pourquoi 6 et 8" at `:275` and #9 "pourquoi un tableau" at `:295`), **but one step of that reasoning asserts a false general lemma** — finding 2.
- **BLOCKING real-bac sourcing:** not newly violated. `r-numeration` is declared `not-applicable` and is explicitly presented to the student as constructed, not as a sujet (`exercises.yaml:253`, `lesson.md:808`). The open demand for a sourced numération annale is recorded in the authoring comment (`lesson.md:817-821`). **bac-fidelity-critic owns that box; I record no pedagogy objection.**
- **Anti-memorization:** PASS. `r-numeration` (N = x y x base 7, criteria mod 6/8, then the 48 trap) does not re-solve E7 (xy₍₇₎ = yx₍₅₎) — different structure, different tools at the end.

### §D — the hook

- Concrete before any definition: PASS (`:603`, ten fingers / two-state machine / clock, anatomy not mathematics).
- Real commit: PASS (`cp-r7b-predict-ecriture`), and the prose reads correctly on both paths (`:615`).
- Promise present (the prior critique's I6): PASS (`:605`).
- Stands without pending assets: PASS — the illustration slot is an HTML comment (`:829-831`), stripped at load.
- **But the hook's concrete anchors never come back** — finding 5.

### §E — assets

- Every marker resolves: PASS (3 checkpoints, 1 figure, 1 exercise — all exist).
- Structural diagram coded, math live: PASS (`svg+katex`, no imaged math).
- `stages`: PASS. Three stages, authored order, `step-1/2/3` groups present in the SVG, sidecar captions match the brief verbatim, and the placement rule is honoured — the figure sits at `lesson.md:665`, **after** the commit at `:639` and after the reveal at `:643`, with the reason written in the comment at `:661-663`. Stage 2 maps a₀ to the FIRST line's remainder and stage 3 puts a₃ under the leading 5 — I checked the mapping, it is correct.
- Authoring-annotation channel: PASS. Both internal notes are HTML comments (`:661`, `:667`, `:812`); nothing student-visible carries an authoring word, a rung code (`LessonRenderer.tsx:73-95` strips `R\d+[a-z]?` prefixes, so "R7b" never renders), an item id, or a choice letter. The `[[marker]]`/`<!--`/`§\d`/`\bR\d+[a-z]? —` classes guarded by `dom-truth.mjs:328` are all clean in this rung.

---

## 2. Findings, ranked, with the minimal fix and the role

### IMPORTANT

**1. The two highest-demand ruptures carry the weakest commit device, and one "Prends position" is not a gate at all.**
`lesson.md:732` reads « Entre deux bases différentes, maintenant. Prends position : 21₍₃₎ ou 12₍₅₎, lequel est le plus grand ? » and the answer is the **next rendered line** (`:734` « Ni l'un ni l'autre »). It lacks even the house formula "avant de lire la suite" (compare `:611`, `:637`, `:752`, `:785`). A gesture that sometimes means "the answer is one line down" teaches the student to stop committing on the ones that count — which are `:752` (the criterion rupture) and `:785` (the N3 rupture), the two beats with the highest reasoning demand in the rung and the only ones with no device. The house standard for a rupture predict in this very file is a checkpoint: R6b's « Prédis, avant de lire la suite » is backed by `cp-r6b-fermat-predict` (`lesson.md:441-445`), and R0's by `cp-r0-predict` (`:11-13`).
*Fix shape:* (a) make `:732` either a real gate or plain prose — pick one; (b) promote the E6 criterion predict (`:752`) to a fourth checkpoint (it is the capacity the bank tests twice and the exercise tests once, so a clone is cheap). — **content-author** for (a), **pedagogy-architect** for (b).

**2. A false general lemma inside the summit exercise's expert reasoning.**
`exercises.yaml:295` (and the step note repeating it at `:308`): « pour $x$ fixé, $2x - y$ parcourt sept entiers consécutifs quand $y$ va de $0$ à $6$, et **un seul** d'entre eux est un multiple de $8$ ». Seven consecutive integers contain **at most** one multiple of 8, not exactly one (1…7 contains none). It happens to be exactly one for all six values of x here only because every window [2x−6, 2x] contains 0 or 8. This is the one place VISION L65-68 is load-bearing — the student is learning how an expert *justifies* choosing enumeration over algebra — and the justification as written is a wrong general principle stated with authority.
*Fix shape:* "au plus un" plus the one clause that says why each window here does contain one. — **item-author** (exercises).

**3. The rung's only theorem is the least-proved thing in it.**
`lesson.md:659`: « Le même argument garantit que l'écriture existe et qu'elle est unique : les quotients décroissent strictement jusqu'à 0, donc les divisions s'arrêtent ; et toute égalité N = b×(…) + a₀ … force a₀, puis de proche en proche chaque chiffre. » Two sub-claims are unproved — *why* the quotients strictly decrease (q ≤ N/b < N), and the induction compressed into "de proche en proche". Template §A's test ("could a student ask « mais pourquoi ? » and find the answer in the rung?") fails here and only here. It is also the one claim in the whole rung a student cannot verify by recomputation — everything else carries a numeric control. The house standard is explicit: R1 gives euclidean division a dedicated « Pourquoi ce théorème est vrai » (`:49-62`), R4 « on le construit, on ne l'admet pas » (`:237`), R6b the same (`:463`).
*Fix shape:* either a short dedicated beat (termination, then uniqueness by the chapter-2 unicity applied to the quotient), or reduce the claim to what is actually shown. — **content-author**, with **pedagogy-architect** if scope needs deciding.

**4. Asymmetric décortiquer of the two posed operations — the harder one gets less structure.**
The addition gets a three-column ledger (`lesson.md:692-696`: colonne / calcul / on écrit / retenue, with "paquets de 7" and "paquets de 49" naming the weights concretely — this is the best piece of scaffolding in the rung). The **multiplication** — the harder gesture, the one whose error produces a well-formed writing, the one `cp-r7b-retenue` clones and the one AR-48 anchors — arrives as two inline sentences (`:704`, `:706`) with no table and no column alignment. The student must hold the carry in their head at exactly the step where they lose it.
*Fix shape:* give the multiplication the same per-column ledger. — **content-author**.

**5. The hook's concrete anchors never return; the one real-world carry the student has already performed is on the page and unused.**
`:603` puts the clock on the table ("une horloge compte les minutes par paquets de soixante"). `:712` then asks « Pourquoi reporter dès 7, et pas à partir de 10 ? » and answers purely positionally. Sixty minutes making one hour is the only non-decimal carry every student has executed by hand, and it was already named. After `:615` the rung is entirely symbolic — VISION L93-96 ("grounded in the real, throughout"); compare R0→R4's « Retour aux bidons » (`:271`), which this lesson does for its own hook.
*Fix shape:* one sentence in the carry beat re-using the clock. — **content-author**.

**6. E5's balance contradicts the spec's explicit instruction and the prior critique's M2.**
Spec §5.2 commands: "Deux temps, dans cet ordre, **et le second a plus de place que le premier** (pédagogie M2 : le premier n'est pas une surprise, c'est une règle ; le second est là où N2 casse)". The build gives the same-base half two full mechanism paragraphs (`:724-730`) and the inter-base half the short end (`:732-736`) — and the inter-base half is also the one carrying the ungated predict of finding 1. The highest-yield half of the beat is the shortest and the least gated.
*Fix shape:* rebalance, or state why the spec's instruction was reversed. — **content-author**.

### MINOR

**7. The rendered item ramp saw-tooths, and the mitigation written in the file does not exist.**
`items.yaml:2762-2766` declares the saw-tooth honestly and mitigates it with "Si une surface rend un jour la banque par id, trier par `difficulty_level` à l'affichage". That surface is today: `ChapterQuestions.tsx:28` renders "already filtered by rung, **in authored order**". With AR-48 filtered out (clone rule), the student meets 11 questions at 2,3,3,3,4,5,**2**,4,5,3,4 — it drops from the lot's only `synthese` item straight back to level 2, and the 2.1.6 block ends 5,3,4 rather than on its hardest. VISION L73-82 wants demand to rise as scaffolding fades.
*Fix shape:* reorder the 2.1.6 trio (AR-51 → AR-52 → AR-50) and move AR-47 ahead of AR-44, or implement the declared sort. — **item-author** (or frontend for the sort).

**8. No item's KEY requires the b+1 criterion.**
AR-51 and AR-52 both key on the simple sum, both in base 9, both modulo 8 (= b−1), and both carry the alternating sum as a lure (`items.yaml:3428`, `:3496`). The b+1 criterion — half of the "Fabriquer un critère" block, with its own derivation, its own table row (`lesson.md:762-767`) and the staged rupture built on it — is required nowhere in the bank; only `r-numeration` qb demands it. A student can score 11/11 while having learned "the alternating sum is the wrong answer pattern". (The base-9/mod-8 dressing itself is excellent and deliberate — it punishes transporting the base-7 table — so the fix is dressing, not concept.)
*Fix shape:* re-dress one of the two to key on b+1. — **item-author**.

**9. Two item feedbacks name the exit order and withhold the correct order.**
AR-47 choice B (`items.yaml:3160-3165`) and AR-48 choice B (`:3229-3233`) both say "…donnent 1, 3, 0, 1, à lire de bas en haut. Ton écriture vaut 201" — naming the exit list and instructing "read bottom-up" without printing the resulting writing. The student holding N1 needs the two orders side by side; `cp-r7b-retenue` choice B does it right ("il fallait lire 1,5,2, pas 2,5,1", `checkpoints.yaml:590`).
*Fix shape:* adopt the checkpoint's wording in both. — **item-author**.

**10. Notation nits, one of them inside the beat about notation.**
`lesson.md:714` writes « Résultat : $\overline{170}$ » — a vinculum with **no base index**, which the rung's own definition (`:623`) makes undefined, and the same sentence re-reads "34×5" as decimal four lines after `$\overline{34}_{(7)} = 25$`. That is the one place a struggling student can conclude "so sometimes 34 just means 34". Separately, symbolic digit strings alternate spacing: `$\overline{xy}_{(7)}$` (`:773`), `$\overline{x\,y\,x}_{(7)}$` (`exercises.yaml:255`), `$\overline{3\,x\,4}_{(9)}$` (`items.yaml:3468`).
*Fix shape:* mark the decimal reading explicitly at `:714`; pick one spacing convention. — **content-author** / **item-author**.

**11. Two sentences do not survive narration** — `:730` and `:623` (quoted in the §A Voice row). — **content-author**.

**12. The multiplication worked example has no heading of its own.** It shares `### Additionner et multiplier dans une base` and opens a second « Ce qu'on cherche et pourquoi ce geste » mid-section (`:702`). It is the only worked example in the whole lesson without its own `###`, so the rail and the chapter navigation do not surface it. — **content-author**.

**13. Observation on diagnosis (VISION L84-91).** AR-48, which `items.yaml:2770` calls the central item of N4, is filtered out of the student-facing block by the clone rule (`ItemsSection.tsx:92-116`). The coverage method states checkpoints "ne comptent pas — le modèle apprenant est bâti sur le banc de fin seul" (`items.yaml:3556-3559`), so the family the build itself flags at zero margin has, in the learner model, two rendered items rather than three. Not a teaching defect (the student does meet the form, inline, with fresh numbers) but the "exactly at the floor" claim and the learner model disagree. — **item-author / owner**.

**14. Nit:** `items.yaml:3599` still opens "Les dix-sept misconceptions déclarées" while the same block closes on "vingt et une" (`:3641`). — **item-author**.

**15. Load.** R7b is by a wide margin the longest chapter in the notion (`lesson.md:599-835` vs R5's `:277-385`), and by your own count it sits at or over the spec's 1 300–1 700 ceiling. I do not call length a defect on its own — VISION is built for long sessions, the nine `###` subsections signpost well, and `ChapterShell` prints a per-chapter `~N min`. The defect is where the length lands: the final third (criteria + digit-finding) carries the highest reasoning demand **and** the two weakest commits (finding 1), i.e. the demand peaks exactly where engagement is thinnest. Cheapest resolution is finding 1(b) — one more checkpoint in the last third. A split at « Fabriquer un critère… » into a lettered `R7c` also costs zero renvois by the spec's own §2.1 argument, but re-seals `carte-chapitres` and I do not recommend it over the checkpoint. — **pedagogy-architect**.

---

## 3. What this build got right (so revision does not undo it)

- **Four of five ruptures are staged to the EXEMPLARS §2 anatomy** — voiced in the student's words, run to their own consequence, broken on a number, *then* explained. `:647-657` (N1) and `:752-754` (the criterion) are gold-standard; `:785-789` (N3) is the prior critique's B1 fix delivered exactly as prescribed, and it is the best single beat in the rung.
- **Commit-before-reveal is respected without exception** at the three checkpoints, and the figure is placed after the commit with the reason written down (`:661-663`). The N1 rupture is placed *after* the reveal, which is the right order: the wrong student gets the reason, the right student gets their reflex tested.
- **Every distractor is re-derived and honestly tagged.** I recomputed all 48 item options and all 12 checkpoint options; each wrong value is reachable by the declared model and by no other listed path (AR-44's four readings — head-digit, digit-sum, units-first, correct — are unusually well engineered). The build widened the N2/N3/N4 descriptions in the same commit so that no distractor is tagged to a principle that does not cover it (`items.yaml:271-273`, `:293-295`, `:312-313`).
- **The chapter cross-references are all true after the insertion**: chapitre 2 = R1 (`:627`, `:659`), chapitre 3 = R2's critère par 9, which R2 really does prove from 10 ≡ 1 (mod 9) (`:141-157`) — so the raccord at `:750` is honest; chapitre 6 = R5's Gauss and its corollary (`:309`, cited by `r-numeration` qd). No renvoi ≥ 10, and R7b never cites itself.
- **The closure is practice, not restatement** (the prior critique's M7): four control gestures, then a work request whose self-check closes on itself — « Écris maintenant 950 en base 6, puis contrôle ta réponse en recalculant sa valeur : tu n'as besoin de personne pour savoir si tu as juste » (`:804`), with the answer kept out of the prose and in a stripped comment (`:826-828`).
- **`r-numeration` qd is the best question in the lot** (`exercises.yaml:313-328`): the 6-and-8-therefore-48 reflex is broken on a counter-example the problem itself produced, and the chapter-6 coprimality condition the student met abstractly five chapters earlier is cashed in. That is the VISION ramp working as designed.

---

## 4. Verdict

**FIX THEN SHIP.**

The teaching spine is sound and the build delivered what the revised spec promised, including all four of the prior critique's blockers. Nothing here needs redesign. Ship after findings 1–6: one false lemma to correct (2), one theorem to prove or de-claim (3), one worked example to give its table (4), one "Prends position" to make real or remove (1), one sentence to re-ground in the clock (5), one beat to rebalance (6). Findings 7–14 can ride the same pass or the next lot; finding 15 is an architect's call that is resolved for free by 1(b).

Routing summary — **content-author:** 1(a), 3, 4, 5, 6, 10 (lesson side), 11, 12. **item-author:** 2, 7, 8, 9, 10 (items side), 13, 14. **pedagogy-architect:** 1(b), 15, and the scope question inside 3.

