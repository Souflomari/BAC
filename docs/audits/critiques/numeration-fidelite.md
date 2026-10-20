# bac-fidelity critic — WAVE 1 review of the numération rung spec

**Object:** `/home/user/BAC/docs/pipeline/propositions/maths-arithmetique-numeration.md` (PROPOSITION, 1169 lines, unbuilt).
**Rubric:** `/home/user/BAC/docs/cadre/curriculum/maths-sm.yaml` (chapitre `arithmetique_z`), `/home/user/BAC/docs/cadre/bac-reference.md`, `/home/user/BAC/docs/cadre/cadre.yaml`, `/home/user/BAC/docs/cadre/sources/README-maths.md`.

---

## 0. Headline

**No exclusion breach. No `limite` overshoot. No filière error.** I went looking for the drift classes I exist to catch and did not find them: nothing reaches into `exclusions_transversales` (`maths-sm.yaml:432`, corps finis / Galois), nothing into the `limites` (`:360`, RSA/crypto, indicatrice d'Euler), and the PRINCIPE DE TRI (`:361`, *admis vs construit*) is not merely respected but is the spec's organising rule (§3.2-6: the $b\pm1$ criteria are re-derived from $b\equiv\pm1$, never named-and-admitted). The filière scoping is right (SM-only chapter, `bank.yaml:29-31`; SM-A/SM-B share the maths cadre, `maths-sm.yaml:50-52`).

**All seven numbers you asked me to recompute are correct** (details in §4). I found no arithmetic error anywhere in the spec — including the delta table of §8.0, which I recomputed distractor-by-distractor against the counting method at `items.yaml:2624-2628`: N1=8, N2=7, N3=6, N4=3, `critere-…`=4→7, `reste-non-normalise`=5→6 all hold exactly.

**What is wrong is not the content — it is the evidence under it and the shape it is delivered in.** Two things must be settled before anyone writes a word; five more change the delivery.

---

## BLOCKING

### B1 — The rung's foundation has not passed the gate that was written *for it*, and the spec proposes to build anyway
**Spec §0 (avertissement de fondation, lines 16-21), §10.10, §12.**
**Evidence:** the three lines this rung serves were added `2026-09-27` (`maths-sm.yaml:332` programme, `:338` savoir-faire, `:594-602` the correction entry). The file's own gate text at `:628` requires the Gemini long-read to verify *« que les trois capacités de numération existent »*. Porte 2 passed for the arithmetic block (`:26-29`); **portes 1 and 3 are open.** Provenance is a single secondary source (`README-maths.md:140-142`, pdfmath table), with **zero corroboration from the ten verified national papers** (`bank.yaml:10-31`) — unlike every other line of this chapter, where Fermat carries 9/10 (`maths-sm.yaml:374`), résidus quadratiques 2 attestations, restes chinois 1.

The spec states this risk honestly and puts it first — that is exactly right, and it is why this is a routing finding, not a dishonesty finding. But §10.10 then says *"ne pas trancher la porte de cadre"* while §7 hands content-author 1400-1800 words to write. **A capacity whose existence is unverified cannot fund the largest rung in the lesson.**
*(My own read of the Moroccan SM programme says "les systèmes de numération" is genuinely there, so I expect this gate to return YES. That lowers the risk; it does not close it, and I am not a source this repo accepts.)*
**Minimal fix:** research-lead answers one narrow question before authoring starts — *does the SM cadre list capacities 2.1.4/2.1.5/2.1.6?* — against the scanned cadre or a second independent source. One targeted verification, not the full porte-1 sweep. Build order: gate → author.

### B2 — The notation is unverified, baked into every artefact, and the default may be the wrong one
**Spec §11 Q1(a); applied silently in §5 (8 worked examples), §5.5 (3 checkpoints), §8 (15 items), §6.1 (the figure).**
**Evidence:** the cadre fixes no notation (spec §1 correctly says so; `maths-sm.yaml:332/:338` name none). I grepped the whole corpus for any existing base-writing convention — `content/**` contains **zero** occurrences of `\overline{…}_{(b)}` or `\overline{…}^{(b)}`; there is no in-repo precedent to inherit. The spec's default is $\overline{abc}_{(b)}$ (subscript). **Moroccan SM textbooks and the Arabic-tradition notation that Moroccan BIOF material mirrors more commonly place the base as a parenthesised SUPERSCRIPT, $\overline{a_n\cdots a_0}^{(b)}$.** I cannot settle this from the repo, and neither could the spec — but "unverified" and "probably the minority form" are different risk levels, and the spec treats it as the former.
The cost of being wrong is not one line: it is every stem, every distracteur, every feedback string, the SVG figure, and the three checkpoints — a full-corpus find-and-replace on the rung's central symbol, after authoring.
**Minimal fix:** resolve Q1(a) from one Moroccan SM source (a manuel scan or any annale that writes a base) **before** authoring; record the answer once, in the cadre file or a notation register, so the next rung inherits it. If it cannot be resolved, say so *in the spec* and have content-author write the notation through a single named convention so the swap is mechanical.

---

## IMPORTANT

### I1 — The rung delivers zero exam-shaped practice, and the reason given does not survive the file next door
**Spec §9.1 (lines 1058-1063), §11 Q6.**
**Evidence:** §9.1 forbids any `[[exercise:…]]` because *« Fabriquer un "sujet type bac" de numération serait inventer une source »*. That conflates **inventing a source** (forbidden, correctly) with **shipping an original attempt-first exercise** (already house convention). `content/maths/arithmetique/exercises.yaml:143-151` ships `r-variation` — an exam-shaped, four-part, entirely invented exercise with `sourcing.status: not-applicable` and the note *« Variation construite exprès … n'a pas vocation à être un sujet réel »* — marked `[[exercise:r-variation]]` in the lesson today. The notion's sourced summit (`r-bac`, 2019) is untouched by adding a second, non-sourced exercise.
Meanwhile E8 (§5.3) is, by construction, the right shape: four escalating questions ending on a conceptual one — precisely `cadre.yaml:108-109` *« plusieurs exercices ; question de synthèse terminale (niveau 3) »* and `bac-reference.md:127-128`. The spec puts it in the lesson **as a worked example**, i.e. the student reads the solution of the only exam-shaped thing in the rung. `exercises.yaml:4` names that failure mode: *« Une solution imprimée au sommet est un échec template-v2 »*. Net effect against the exam format: the student meets this capacity through 15 MCQs and never attempts a constructed response on it, in a 4h paper that contains no MCQ.
**Minimal fix:** move E8 out of §5.3 into `exercises.yaml` as `r-numeration`, `sourcing.status: not-applicable`, note = "forme attendue, non attestée — aucune annale vérifiée de numération dans bank.yaml"; place `[[exercise:r-numeration]]` at the close of R7b. Keep E7 as the worked example (it teaches the constraint-first gesture). §9.1's author-note about the deliberately-absent marker then becomes unnecessary; the bank rule at `bank.yaml:27-28` is untouched (no eleventh entry).

### I2 — The 40/40/20 is hit by labelling, not by item design — and the file itself warned about exactly this
**Spec §0 fact (l), §8.0, §8.2-8.6.**
**Rubric:** `maths-sm.yaml:58-61` (40 / 40 / 20), `bac-reference.md:93-94`. The house criterion for niveau 2 is written at `items.yaml:2205-2209`: an item is `application_non_explicite` when *the gesture is demonstrated nowhere in the rung* (« classer en `application_directe` aurait sous-compté l'écart avec l'exemple travaillé de la leçon »).
Applying that criterion to the proposed tags:
- **AR-43** (« Que vaut $\overline{203}_{(5)}$ en base 10 ? », tagged `application_non_explicite`) and **AR-45** (« Que vaut $\overline{101}_{(8)}$ en base 10 ? », tagged `application_directe`) are **the same task**. E2 works this exact conversion twice, with two methods. AR-43 is niveau 1.
- **AR-51** (poser $\overline{45}_{(6)}\times\overline{3}_{(6)}$, `non_explicite`) — E4 poses a base-7 multiplication in full. Niveau 1.
- **AR-52** (« quelle est la règle correcte ? », `non_explicite`) — the rule is stated verbatim in §5.2's mandated sentence. This is recall, at most niveau 1.
- **AR-53** (reste mod $b-1$, `non_explicite`) — E6 does exactly this on $\overline{5622}_{(7)}$. Niveau 1.
- **AR-48** (`synthese`) is, by the spec's own §8.4 words, *« il en rejoue le geste »* of E7; **AR-55** (`synthese`) is a one-congruence reduction of E8-c. A rehearsed gesture is not niveau 3.
Honest re-tagging lands nearer **10-11 / 3-4 / 1 ≈ 70/25/7**, not 40/40/20. The spec presents the hit as *« la réponse au reproche que le fichier s'est fait lui-même »* (§0 fact l) — but the reproach at `items.yaml:2213-2217` was precisely *« échantillon trop petit pour forcer ce ratio sans fausser un tag »*. Forcing it on 15 items is the same error at larger n.
The structural cause is visible in the capacity split: 11 of 15 items serve 2.1.4/2.1.5 (convert, add, multiply — intrinsically niveau 1), only ~4 serve 2.1.6 (« utiliser les écritures … dans des situations d'arithmétique ») — the one capacity whose gesture is actually attested on a paper (see I3) and the only one that naturally carries niveaux 2-3.
**Minimal fix:** re-tag honestly (AR-43, 51, 52, 53 → `application_directe`; AR-48, 55 → `application_non_explicite`), then **rebalance by redesign, not by relabel**: convert 3-4 of the mechanical items into 2.1.6-shaped stems where the base writing is a tool inside an unsignalled question (« montrer que tout $\overline{x\,y\,x}_{(b)}$ est divisible par… », « déterminer les $N$ à trois chiffres en base 7 tels que… »), and let I1's attempt-first exercise carry the niveau-3 load. If the ratio still cannot be reached, print the true mix next to the target — the precedent for that honesty is in the file already.

### I3 — "No annale attests numeration" is true of the word and false of the gesture — the repo holds a sourced, barème'd instance of capacity 2.1.6
**Spec §0 fact (c), §11 Q6, §12 (« formes ATTENDUES, pas des formes VÉRIFIÉES »).**
**Evidence:** `bk-2024-r-x5` (2024 session de rattrapage, SM, Exercice 5, 3 points, `sourcing: status: sourced`, `content/maths/arithmetique/bank.yaml:1443-1461`) writes $m = 10q + r$ with $0 \le r < 10$ (`:1557`), reasons on *« le chiffre des unités de $m$ »* and *« le nombre privé de ce chiffre »*, **builds and proves a divisibility criterion from that positional writing** (`:1571`, `:1609`), then uses it to solve a congruence system. Its editorial note (`:1422-1429`) calls it *« le seul exercice de la banque où l'arithmétique modulaire sert à FABRIQUER un outil de calcul mental »* and ties it to the collège criteria for 7 and 11.
That is capacity 2.1.6's wording — *« exploiter une écriture en base pour une question de divisibilité ou de reste »* (`maths-sm.yaml:338`) — executed at $b=10$ on a verified copy with a barème. The spec's grep looked for « base », « numération », `\overline` and concluded absence; the attested form writes the same idea as $m = 10q+r$. This is the ADR 0036 failure mode named in the spec's own §0 conclusion, committed one section later.
Consequence both ways: (a) the E6/E8/AR-53-55 family is **better sourced than the spec claims** — the "criterion built from the writing" gesture is attested, only its generalisation to $b \ne 10$ is not; (b) the conversion family (E1-E2, AR-41-46) remains genuinely unattested. The spec flattens a differentiated picture into one "unverified" label.
**Minimal fix:** cite `bk-2024-r-x5` in §1 and §5.3 as the attested cousin of E6/E8; split §12's blanket statement into *gesture attested at b=10 / generalisation and conversion unattested*; and use it as R7b's closing anchor (« tu as déjà vu ce geste sur une copie de bac, à la base 10 ») — which is stronger than §9.1's planned clause saying numeration does *not* appear in the 2019 subject.

### I4 — Fifteen items, the largest lot in the notion, for a capacity with 0/10 exam attestation — and the observation is never written down
**Spec §8.0, §1 (the "piège de lecture" paragraph).**
**Evidence:** the spec is scrupulous about not *claiming* a weight — *« "trois capacités sur neuf" est un compte de capacités, pas un poids de points »*, and the cadre agrees that the internal split of the 15 % block is `derived` (`maths-sm.yaml:303`). But the **allocation** makes the claim the prose refuses: 15 new items against 40 existing (27 % of the notion's bank) for a capacity that appears in **0 of the 10 verified SM papers 2017-2025**, while Fermat — 9/10 (`maths-sm.yaml:374`) — carries 8 items. The cadre keeps exactly this kind of corpus observation in a dedicated key (`_observation_examens`) so that it *informs without deciding*; the 0/10 figure for numération appears nowhere, in the cadre or in the spec.
**Minimal fix:** (a) record the observation explicitly — in the spec's §1 and as a line under `arithmetique_z._observation_examens`: *« 0 des 10 exercices nationaux SM vérifiés ne porte sur une écriture en base ; motif observé, adossé à aucun libellé de cadre — il n'exclut pas la capacité, qui est au cadre »*; (b) put the lot size in front of the owner with that number visible (a floor-respecting lot is 5 models × 3 = 12-ish, with the freed effort going to the 2.1.6 items of I2). The cadre binds — the capacity is legitimately taught — but sizing is an arbitration, and it should be made with the 0/10 on the table.

### I5 — Capacity 2.1.5's comparison is taught in prose and never assessed as the cadre words it
**Spec §4.2 (the "découverte de conception"), §8.3 AR-44.**
**Evidence:** the capacity is *« Additionner, multiplier et **comparer** deux entiers **dans un système de numération** »* (`README-maths.md:141`; `maths-sm.yaml:332` « comparaison **dans une base** »). §4.2 establishes — correctly and valuably — that a same-base comparison cannot diagnose N2, and concludes *« tout item qui vise N2 par une comparaison est INTER-bases »*. The result: the only explicit comparison item, AR-44, ranks across bases 2, 5 and 9 — a legitimate task, but not the one the capacity names — and the in-base comparison is *« enseignée en prose et sondée sur la RÈGLE, pas sur l'ordre »*, i.e. not assessed. A diagnostic constraint has quietly displaced a cadre capacity.
**Minimal fix:** either add one same-base ordering item targeted at **N3** rather than N2 (e.g. « parmi $\overline{412}_{(5)}$, $\overline{1203}_{(5)}$, $\overline{2044}_{(5)}$, lequel est le plus grand ? » — the spec's own un-armed misconception at §4.6-1 is exactly this and would then have a home), or state the mapping explicitly in §3.1 (AR-46 and AR-49, the digit-count encadrements, *are* the ordering rule in disguise) so the capacity is not silently unassessed.

---

## MINOR

### M1 — A cadre capacity is misquoted inside guillemets
**Spec §3.1, table row 2.1.6.** Quotes « Utiliser les écritures dans des situations d'arithmétique ». The libellé is *« Utiliser les écritures dans **des systèmes de numération** dans des situations d'arithmétique »* (`README-maths.md:142`, `maths-sm.yaml:598-599`). §2.3-2 gets it right with an ellipsis; §3.1 drops four words without one. No scope consequence — but this is a repo that treats a citation as an instruction.
**Fix:** restore the words or add the ellipsis.

### M2 — "Horner" names a method the cadre does not carry
**Spec §5.1 E2 (line 419), §7.4.** The nested evaluation is unimpeachable (I verified: 3 → 17 → 85 → 429); the *name* is a label from outside the 2e-Bac lexicon, and §3.2-7 says the rung introduces nothing. Not a `limite` breach — nothing is admitted — but a gratuitous new proper noun on a capacity already carrying enough vocabulary.
**Fix:** show the nested form as *« un raccourci de calcul mental »* without the eponym (§7.4 already lists it first to cut).

### M3 — AR-53's distractor D is reachable by two distinct faulty paths
**Spec §8.6 AR-53.** With $N = \overline{6482}_{(9)}$: the units-digit reading gives 2 (D's stated model), and the alternating-sum reading reduced **mod 10** also gives 2 ($-8 \equiv 2 \pmod{10}$) while the same sum reduced mod 8 gives 0 (C). So a student choosing D may hold either model, and the diagnosis under-determines. The spec's contamination check (lines 1001-1004) verified the three values are distinct from the key — it did not check that each value maps to one path.
**Fix:** shift one digit so the two paths separate, or tag D to both models and say so in the feedback.

### M4 — The $b > 10$ letter convention is written into student prose while its caveat is stripped at render
**Spec §3.2-2 (lines 197-199).** The rule's own headline is *« Aucune base > 10 … on n'enseigne pas une notation qu'on n'a pas vérifiée »*, and Q1(b) leaves the convention undecided — yet the same bullet commissions two lines of prose telling the student that A = 10, B = 11, with the « à vérifier » flag living in an author comment that `stripAuthoringComments` removes. The student therefore reads an unverified convention as fact, and it is the hexadecimal convention, one step from the « aucune informatique » line in the very next bullet.
**Fix:** delete the two prose lines; keep the question in Q1(b). Costs nothing — the rung uses no base above 9.

---

## 4. Numbers recomputed (the sample you named) — all correct

| | claim | my recomputation |
|---|---|---|
| **E1** | $2025 = \overline{5622}_{(7)}$, four divisions | $2025=7\cdot289+2$, $289=7\cdot41+2$, $41=7\cdot5+6$, $5=7\cdot0+5$; back-check $1715+294+14+2=2025$ ✓ |
| **E1 accroche** | $2025 = \overline{11111101001}_{(2)}$ | $1024{+}512{+}256{+}128{+}64{+}32{+}8{+}1 = 2025$; 11 bits, exactly the string given ✓ |
| **E2** | $\overline{3204}_{(5)} = 429$; Horner 3→17→85→429 | $375+50+0+4 = 429$ ✓; both paths ✓ |
| **E6** | mod 6: $S=15 \Rightarrow 3$; mod 8: $T=1$; $\overline{3405}_{(7)}=1230$ | $2025=6\cdot337+3$ ✓, $=8\cdot253+1$ ✓; $1029{+}196{+}0{+}5=1230=6\cdot205$ ✓, $T=6$, $1230=8\cdot153+6$ ✓ |
| **E8** | $N=50x+7y$; table of six $x$; $(3,6),(5,2)$; $48\nmid264$ | every cell of the $x$-table verified ($y\equiv 2x \bmod 8$ has exactly one root in $\{0..6\}$ since $2x$ is even) ✓; $192=\overline{363}_{(7)}=6\cdot32=8\cdot24$ ✓; $264=\overline{525}_{(7)}=6\cdot44=8\cdot33$ ✓; $264/48=5{,}5$, $\mathrm{PPCM}(6,8)=24$, $192=24\cdot8$, $264=24\cdot11$ ✓ |
| **AR-48** | $4x=3y$, Gauss $3\mid x$, $(3,4)$, $N=31$ | $9x+y=7x+7y \Rightarrow 8x=6y \Rightarrow 4x=3y$ ✓; $x\in\{3,6\}$, $y=8$ rejected ✓; $\overline{34}_{(9)}=31=\overline{43}_{(7)}$ ✓; distractor D path $\Rightarrow(4,3)$, $39\ne25$ ✓ |
| **AR-53** | $N=4772$, reste 4; $S=20\equiv4$ | $4374{+}324{+}72{+}2=4772=8\cdot596+4$ ✓ (see M3 for the distractor collision) |
| **AR-55** | $x\equiv1 \pmod 8$, $x=1$; $\overline{314}_{(9)}=256$ | $S=x+7$, $x\le8 \Rightarrow x=1$ ✓; $243{+}9{+}4=256=8\cdot32$ ✓; distractors $x=7$ (alternée) and $x=2$ (mod 9) ✓ |

I also verified every other computed value in §5, §5.5 and §8 (E3, E4, E5, the three checkpoints, AR-41/42/43/44/45/46/47/49/50/51/52/54) — **no error found**, including the two contamination rejections the spec reports (the $\overline{1011}_{(2)}$ variant of AR-44 and the $\overline{4132}_{(9)}$ variant of AR-53 are indeed contaminated as described; the N1 path in AR-44 gives $B<A<C$, absent from the choices, as claimed).

## 5. Repo facts I re-measured (spec §0) — all true

(b) one single "base" pairing in the whole notion, `lesson.md:149`, inside the by-9 criterion — reproduced with a **wider** pattern, still one hit. (c) ten verified entries, none a numeration subject, rule at `bank.yaml:27-28` ✓ (but see I3). (e) the perimeter guard omits numeration, `checkpoints.yaml:52-55` ✓. (g) ten `## ` titles in the order given, R8 at `lesson.md:591` ✓. (i) **zero** occurrences of « chapitre 8 / 10 / 11 » in the notion — the fact the whole placement decision rests on ✓. (k) the `habilete` convention and its scope note, `items.yaml:1990-1993` ✓. (l) the self-reproach quoted exactly, `items.yaml:2213-2217` ✓. (m) zero « Récapitulatif » ✓. Coverage counts at `items.yaml:2622-2684` match every figure the spec cites, including the nine zero-margin families. The R5 corollary the spec leans on for E8-d is at `lesson.md:309` under the heading *« Une conséquence immédiate, utile pour les critères de divisibilité »* — a better anchor than the spec realises. `item_source: clone_of_<ITEM>` is established convention (132 uses, `docs/HANDOFF.md:6204`), so `clone_of_AR-51` is well-formed. The checkpoint `habilete` vocabulary (`raisonnement`/`utilisation`) matches the existing file (`checkpoints.yaml:69`), not the MATHS triplet — correct as proposed.

One additional document the spec does not cite and should: `/home/user/BAC/docs/audits/cadre-couverture.md` (dated today, 2026-09-28) independently counts the numération lines as 2 of 20 ABSENT lines in `maths-sm.yaml` (`:19`, `:42`) — third corroboration of the gap, and useful context for I4's sizing arbitration (espaces vectoriels carries 3 absent lines).

---

## Verdict

**BUILD AFTER FIXES** — clear B1 and B2 before authoring begins (both are research tasks, not authoring tasks); fold I1-I5 into the spec, then hand to content-author and item-author. The mathematics is sound, the scope is clean, and the misconception analysis is the strongest I have reviewed in this corpus; what is not yet right is that the rung stands on an unverified cadre line with an unverified notation, reports its cognitive mix as a target it has labelled its way into, and — on a capacity whose one attested exam appearance is a *constructed* criterion — delivers nothing the student has to construct.
