# pedagogy-critic — WAVE 1 review of the R7b « systèmes de numération » spec

**Object:** `/home/user/BAC/docs/pipeline/propositions/maths-arithmetique-numeration.md` (1169 lines, read in full)
**Against:** `/home/user/BAC/docs/product/VISION.md` L48-96, `/home/user/BAC/docs/pipeline/NOTION-TEMPLATE-V2.md`, `/home/user/BAC/docs/pipeline/EXEMPLARS.md` §2-3, and the host files `/home/user/BAC/content/maths/arithmetique/{lesson.md,items.yaml,checkpoints.yaml}`.

---

## 0. Arithmetic recomputation — what I checked, and what is wrong

I recomputed **every** worked example and **fifteen** of the MCQ option sets. **All numeric values in §5 and §8 are correct** except one derived claim (finding I1).

Verified correct: E1 (2025 → 5622₍₇₎, four divisions, control 1715+294+14+2) · the binary 11111101001 (11 bits) · the N1 counter-model 442₍₆₎ = 170 ≠ 100 · E2 (429 by both routes, Horner chain 3→17→85→429) · E3 (188+129 = 317 = 632₍₇₎, all three carries) · E4 (25×5 = 125 = 236₍₇₎) · E5 (27 > 26; 21₍₃₎ = 12₍₅₎ = 7; 101₍₂₎ = 5 vs 101₍₈₎ = 65; the encadrement bᵖ ≤ N ≤ bᵖ⁺¹−1) · E6 (S = 15 → r = 3 mod 6; T = 1 mod 8; 3405₍₇₎ = 1230, S = 12, T = 6, 1230 = 8×153+6) · E7 (3x = 2y, Gauss, (2,3), N = 17) · E8 (a,b,c,d in full — the whole x-by-x table, 192 = 363₍₇₎, 264 = 525₍₇₎, 48 ∤ 264, ppcm = 24) · AR-41/42/43/44/45/46/47/48/49/50/51/53/55 option values · `cp-r7b-retenue` (68 = 152₍₆₎, B = 36, C = 103, D = 14) · `cp-r7b-critere` (5 ≡ 1 mod 4).

Also verified as **claimed and true**: the habileté mix is exactly 6/6/3 (I counted all fifteen: directe 41,42,45,47,49,50; non-explicite 43,44,51,52,53,54; synthèse 46,48,55 — §8.0 L776-778 holds); the five coverage deltas (N1 = 8, N2 = 7, N3 = 6, N4 = 3, critère +3, reste-non-normalisé +1) all reconcile distractor by distractor; the chapter renvois (ch. 2 = R1, ch. 3 = R2, ch. 6 = R5) are right against `lesson.md:93, :287, :401, :309`; the `## R8` anchor at `lesson.md:591` and the `---` at `:589` are right; the twelve « Ce qu'on cherche et pourquoi ce geste » anchors and the zero-Récapitulatif fact (m) both check out; §4.2's discovery (a **same-base** comparison cannot diagnose N2, because decimal reading preserves order) is mathematically correct and is the sharpest piece of item design in the document.

---

## BLOCKING

### B1 — The N3 ledger row claims a rupture that §5.3 does not stage (TEMPLATE §B, top severity)

**Where:** ledger row L1035 (« **R7b, E7** — la ligne de contraintes posée **avant** l'équation, puis la racine y=6 rejetée sous les yeux de l'élève ») vs the actual E7 design at L511-525.

**Evidence:** E7 as specced writes the constraint line **first** (L511-515: « avant toute algèbre, écrire les contraintes »), then solves, then rejects y = 6 as routine bookkeeping. No wrong model is ever voiced, nothing breaks on its own consequence. TEMPLATE §B L84-85 is explicit: *"Ruptured" means STAGED (the wrong model is voiced and broken on its own consequence), not merely "the correct fact is stated nearby* », and EXEMPLARS §2 L30-41 fixes the anatomy as voice → test → break. E7 is **prevention**, not rupture. A row that claims a rupture it doesn't deliver is functionally an unclaimed row.

**What makes this expensive:** the perfect rupture is sitting inside E7 unused. A student who skips the constraint line finds **(x,y) = (4,6)** and it *passes the equation check*: 4·7+6 = 34 and 6·5+4 = 34. The wrong model produces a numerically self-consistent answer made of two writings that do not exist. That is a model breaking on its own consequence, in one line, with numbers already in the spec.

**Minimal fix:** either stage it (solve E7 *without* the constraint line first, let (4,6) survive the check, then kill it), or move N3's claim to explicit item delegation and say so — TEMPLATE §B L86-87 allows delegation, silence does not.

### B2 — The top of the ramp has no commit and is delivered as a printed solution

**Where:** §5.4 ramp table L582 (E8: « échafaudage **nul** : énoncé seul, comme un sujet ») vs §7.2 L725 (E6 → checkpoint → E7 → E8, all narrated prose), §7.3 L739-742 (« **pas de composant `Derivation`** »), §10.8 L1112 (« **Ne pas ajouter de marqueur `[[exercise:…]]`** »), §9.1 L1058-1063.

**Evidence:** the three commits (`cp-r7b-predict-ecriture`, `cp-r7b-retenue`, `cp-r7b-critere`) all sit in the first two-thirds — hook, after E4, after E6. From E6 onward, where reasoning demand is highest by the spec's own table (E7 « faible », E8 « nul »), there is **zero** interaction: no checkpoint, no exercise marker (forbidden), no `steps:` (forbidden), no written-attempt gate. E8's full four-part solution is printed immediately under its statement. Scaffolding declared « nul » in a table is not scaffolding faded in an artifact — the student reads the answer. VISION L80-82: *"Scaffolding fades as the student climbs. By the top, real bac questions feel routine — because the student was deliberately built up to them, not thrown at them"*; TEMPLATE §C L91-95 bans printed solutions at the summit and TEMPLATE §A L25-28 requires a real commit *or an explicit written-attempt gate*.

Note the lesson already owns the cheap version of this gate — R0 L11: « essaie vraiment de construire une suite d'opérations, **sur papier**, avant de continuer ». §11 Q8 (L1133) even offers to cut `cp-r7b-critere` first, which would leave the last two-fifths of the rung with no engagement at all.

**Minimal fix:** an explicit written-attempt gate before E8's solution (house pattern already at `lesson.md:11`), and/or convert E8(c) into the rung's third checkpoint instead of `cp-r7b-critere`. This costs no source (B is not the sourcing box).

*(The BLOCKING sourcing box itself is handled correctly: §9.1 L1058-1063 and §11 Q6 refuse to invent a numeration sujet and leave the notion's summit as the 2019 NS 24F. That is the right call and I am not asking for a fabricated summit — I am asking for a commit device that does not need one.)*

### B3 — Two of the fifteen items reprint a worked example, contradicting the spec's own non-duplication claim

**Where:** §5 L371-374 asserts « **aucun item du §8 ne rejoue un exemple travaillé** ». Two do.

- **AR-41** (L823-833) uses **exactly** the number, base and three divisions of the E1 N1 rupture (L406-408: « sur un nombre plus petit, **100 en base 6** (100 = 6×16+4, 16 = 6×2+4, 2 = 6×0+2) »), and its N1 distractor **B = 442₍₆₎** is the exact string the prose has just publicly crossed out. A student who remembers one paragraph answers it with zero understanding of base conversion.
- **AR-45** (L859-867) asks « Que vaut 101₍₈₎ ? » with correct answer **65** and distractor **5** — the two numbers printed verbatim in E5 (L472: « 101₍₂₎ = 5 contre 101₍₈₎ = 65 »).

**Cost:** these are the `application_directe` anchors of the N1 and N2 trios. If both are recall of prose, the effective floor for the two root models drops to two genuine items each, and `floor: 3` becomes a count rather than a measurement — which is precisely the honesty §12 L1164-1166 says it wants to protect.

**Minimal fix:** fresh N and fresh base for AR-41 (and keep 442₍₆₎ out of it); fresh digit-string for AR-45 (the 101 trick belongs to the prose, not the bank).

---

## IMPORTANT

### I1 — The « invisible error » claim about E4 is numerically false

**Where:** §5.2 L456-457: « *elle ne se voit PAS sur la multiplication (E4 mal conduite à 10 donnerait $\overline{1\,5}\ldots$, une écriture qui a l'air légale)* ».

**Evidence:** conduct 34₍₇₎ × 5 with a threshold of 10: 4×5 = 20 → write 0, carry 2; 3×5 = 15, +2 = 17 → write 7, carry 1 → **170**. The digit **7 does not exist in base 7** — the error is barrable at a glance, the opposite of what the sentence says. (It is simply 34 × 5 = 170 in decimal.) I cannot reconstruct any carry model that yields « 15… » here.

The *design decision* it justifies survives, because the checkpoint uses different numbers: `cp-r7b-retenue` (25₍₆₎ × 4) really does produce the well-formed 100₍₆₎ (L642) — I verified it. So the rule « the N4 probe must be a multiplication » is right; the worked instance offered as proof of it is wrong, and §5.2 marks this passage as prose to be written.

**Minimal fix:** either drop the parenthetical, or re-pick E4's numbers so the base-10 conduct genuinely yields a legal-looking writing (the base-6 pair already in the spec does).

### I2 — N1, the rung's signature model, gets no commit

**Where:** §5.1 L403-412 (the staged rupture) and the ramp table L576.

The rupture itself is well built (voice → test → break, per EXEMPLARS §2). But the student never *bets* on the order: the hook checkpoint fires on N2 (L388-390), and by the time E1 arrives the author does the predicting, testing and breaking. « Le premier reste, c'est le chiffre de gauche » is the single most common numeration error and the one place a struggling student is actually lost — VISION L62-63: *"each checked before moving on … the explanation never skips the step where they would get lost."* The lesson's own R6b does this correctly (`lesson.md:433-437`: « Prédis, avant de lire la suite » + `cp-r6b-fermat-predict`).

**Minimal fix:** a one-line predict gate between the four divisions and the assembled answer (« les restes sortis sont 2, 2, 6, 5 — quel est le chiffre de tête ? »), reusing the checkpoint device that already exists; or re-target the hook checkpoint to carry both N2 and N1.

### I3 — The reasoning-annotation contract names nothing inside E8, the hardest example

**Where:** §7.3 L743-747 lists exactly five decisions to expose: E7 constraints, E7 Gauss, E6 re-derivation, E4 column, E2 zero. **None is in E8.** TEMPLATE §A L34-36: *"every worked example and every summit question exposes the expert's DECISION … One unannotated worked step = the box fails."*

And the missing decision is the best one in the document: *why test modulo 6 and modulo 8 at all?* Because in base 7, b−1 = 6 and b+1 = 8 are the two moduli the writing hands you **for free** — which is also exactly why d) lands (you were handed 6 and 8, not 48, and 6·8 ≠ ppcm(6,8) because they are not coprime). As specced, E8 prints four correct answers and explains only d). Also unannotated: why a table over x rather than algebra in c).

**Minimal fix:** extend §7.3's closed list with the E8 decisions, naming the « pourquoi 6 et 8 » beat as non-cuttable (§7.4 L753 currently puts d) second on the cut list — cutting d) removes the only expert beat E8 has).

### I4 — Two rules ship without their mechanism (TEMPLATE §A, « mechanism-why », pass/fail)

- **Horner** (L419) is introduced as « un raccourci de calcul mental » with no why; the required annotation for E2 (L421-422) is about the zero digit instead. Nested factoring — ((3·5+2)·5+0)·5+4 — is one line. §7.4 L752 puts Horner first on the cut list, so the honest options are *justify it or cut it*; shipping it bare fails the box.
- **The lexicographic tie-break** in E5 (L468: « à égalité de chiffres, on compare de gauche à droite ») is asserted flat, while the digit-count half gets a two-line proof. The reason is the same encadrement already on the line above (a leading difference is worth at least bᵖ; everything below totals at most bᵖ−1). Note that §4.6-1 (L348-353) deliberately leaves the matching misconception unarmed — so the rung's least-justified rule is also the one with no model and no item behind it. That combination is what the ledger is supposed to prevent.

### I5 — AR-41 distractor D is mis-derived and mis-tagged, so its feedback would name a false model

**Where:** L833 — « D ✘ 24₍₆₎ · **N1** · la dernière ligne (2 = 6×0+2) jugée dégénérée et jetée ».

Discarding the last line leaves the remainders 4 and 4 → **44₍₆₎**, not 24₍₆₎, in either reading order. 24₍₆₎ = 16 is the *first intermediate quotient*, reachable only by stopping a division early — which is neither « ordre des restes » (N1) nor any declared model. §4.6 L359-361 itself names this defect class (« un distracteur tagué à un modèle dont le principe ne le couvre pas … le défaut que la vague 1 a nommé ailleurs (F-6) »), and the checkpoint header (`checkpoints.yaml:48-49`) requires every distractor to carry a named model. As written, a student picking D is told « Modèle détecté : ordre des restes » — a wrong diagnosis. It is also the least plausible of the sixty options and, at two digits against three, the most barrable.

**Minimal fix:** replace D with a genuinely N1-flavoured value, or re-tag it honestly.

### I6 — The hook makes no promise, at the one placement where « why now? » is acute

**Where:** §5.0 L376-390, and §9.1 L1047-1053.

The « dix doigts » opener is concrete and calm and satisfies VISION L51-55 (phenomenon before definition). But it is an *observation*, not a stake, and it promises nothing — compare R0 (`lesson.md:23`), which names the payoff explicitly (« ce chapitre construit, étape par étape, tout ce qu'il faut pour le démontrer »). At chapter 10, after nine chapters of a single Bézout→Gauss→diophantine chain, the student's real question is « pourquoi maintenant ? » — and §2.3's best answer (reason 4, L166-170: consolidation, re-employing division euclidienne, congruences, Gauss on a new object) is written **for the owner and never for the student**. Worse, the one sentence R8 *does* gain (§9.1) tells the student the summit he is about to attempt does not use any of this. Honest, and correct, but it lands as deflation immediately after the rung.

**Minimal fix:** one promise line in the hook naming what the base buys (a divisibility criterion in *any* base, and exam problems that determine digits), plus one line of forward-link from the E6/E7/E8 block back to the chapter-6 tools it re-employs. No new content, no frequency claim.

---

## MINOR

- **M1** — `cp-r7b-predict-ecriture` option **C** (L616: « l'égalité est fausse ») asks the student to declare that the line printed two lines above is wrong. Test-wise students never pick that; the probe is effectively a 3-way. A and D are excellent.
- **M2** — E5's same-base « surprise » (L463-465: 1000₍₃₎ > 222₍₃₎ « bien que tous les chiffres du second soient plus grands ») is not a surprise: 1000 > 999 in base 10 teaches the same thing, and §4.2 has already proved this configuration cannot diagnose N2. The high-yield half (inter-base) gets two lines. Consider rebalancing the beat.
- **M3** — the second and third checkpoint YAML blocks (L623-630, L652-659) omit `skill_code` and `tags`, though L591-592 declares the format « celui des six existants ». `habilete: utilisation` / `raisonnement` matches the checkpoint vocabulary in `checkpoints.yaml:69, 138, 197, 254, 322, 406` — that part is right.
- **M4** — the id order is not the difficulty order (AR-44 is `d4`/non-explicite and sits before AR-45 `d2`/directe; §8.3 itself presents them out of numeric order). Harmless if the bank is surfaced adaptively; a saw-tooth if anything renders in id order.
- **M5** — AR-45 distractor C (« 101, c'est cinq », L866) is a *default-to-binary reflex* rather than N2's « the string is the number » mechanism. Defensible, loose.
- **M6** — the base-slider manipulable (§6.2 L690-696, Q9 L1134) is the one place VISION L107-110 points at a build (*"An interactive appears because manipulation is the path to understanding"*), and the spec says so itself. Declaring it as debt is permitted by TEMPLATE §E; I record agreement with the architect's own judgement that it is the highest-yield asset in the rung, and that N2 will remain a prose-only rupture without it.
- **M7** — the closure (§9.2 L1070-1087) restates four control gestures with no retrieval demand. Fine as the house « Le piège à éviter » gabarit; a single « refais E1 avec 500 en base 8 » would convert it into practice at zero word cost.

---

## Answers to the specific questions asked

- **Is the E1–E8 ramp graduated?** Yes in *content* (procedure → reverse procedure → operate → compare → derive → constrained solve → four-part exam form), and the capability mapping (§3.1) is clean. No in *demand*: the scaffolding column of §5.4 (L571-582) describes fading that no artifact enforces after E6 (B2). The ramp rises; the student's obligation does not.
- **Is expert reasoning shown?** Partly. E6's « tu as déjà fait exactement ce calcul » (L486-489), E7's constraint-before-algebra, and E8(d)'s coprimality counter-example are genuine expert beats. E8's main decisions and Horner's are absent (I3, I4). One straw man: E7's named wrong reflex (L519-521, « on ne divise pas une égalité d'entiers par 3 "pour voir" ») is not a reflex a real student has — the real one is *stopping at the first (x,y) found by inspection*, which is also what makes the second root check matter.
- **Where is the student made to COMMIT before a misconception is named?** Three places, all correctly *before* the reveal: the hook (N2, L388-390 — marker before the explaining sentence ✓), after E4 (N4 ✓, and the multiplication choice is right and verified), after E6 (criteria ✓). Not for N1 (I2), not for N3 (B1), not anywhere in Bloc C after E6 (B2).
- **Are the four new ids real, distinct, and each diagnosed by ≥3 pickable items?** Real and distinct: yes — N1/N2 separation is proved by AR-43 (weights reversed = 77 vs string-rendered = 203, two live options in one item), and the §4.5 reuse of `critere-divisibilite-mal-applique` rather than a new family is the right call against `items.yaml:82-91`. N1 vs `reste-non-normalise` is correctly argued (L243-247). Floors are met on the counts I recomputed. Pickability is good throughout (AR-44 and AR-53 carry explicit contamination rejections, L881-887 and L1001-1004 — both of which I verified: the N1 reading of AR-44 gives B<A<C, absent from the list ✓; AR-53's three wrong paths give 20, 0, 2, all ≠ 4 ✓). Exceptions: AR-41 D (I5), and the two pre-solved items (B3).
- **Do any items pre-solve a worked example?** Yes — AR-41 and AR-45 (B3). AR-48 vs E7 is *not* duplication: different bases, different coefficients (4x = 3y vs 3x = 2y), different answer — that one is correctly a fresh variation.
- **Is the checkpoint placement right?** Two of three are right and well-motivated. The third is right *where it is* but wrong *as a priority*: §11 Q8 (L1133) nominates `cp-r7b-critere` as the first cut, when the real gap is that nothing sits at E7/E8.
- **Does the rung connect to congruences/Gauss as claimed?** Yes, and better than the spec advertises. E6 re-derives from b ≡ ±1 and explicitly reopens `lesson.md:141-157`; E7 invokes Gauss (R5 = chapter 6) with its hypothesis checked, in the house style of `lesson.md:323`; E8(d) reopens the corollary at `lesson.md:309` with a counter-example the problem itself produced. The PRINCIPE DE TRI (never a named-and-admitted criterion, always re-derived) is respected end to end.
- **Is R7b vs R2b sound for a learner?** **Sound.** Reasons 1 and 2 of §2.3 are decisive on pedagogy alone, independent of the 85-renvoi cost: R2b would delay the payment of R0's explicit Bézout promise, and capability 2.1.6 as specced literally cannot be served before Gauss exists (E7 and E8(d) both need chapter 6). Reason 3's spaced-recall argument has a real precedent in the file (R6b at `lesson.md:431`). The cost asymmetry is a confirmation, correctly labelled as such. The one learner-cost the spec under-weights is the one I raised in I6: at chapter 10 the rung needs to earn its own « pourquoi maintenant », and §9.1's honesty clause works against reason 4 unless the hook carries a promise.

---

## Verdict

**BUILD AFTER FIXES.** The teaching spine is sound and unusually well controlled — three blocks answering three capabilities, criteria constructed rather than given, Gauss genuinely reopened, chapter references correct, and every number I recomputed right but one. The failures are localized: one mis-claimed ledger row with the rupture sitting unused inside its own example (B1), a top-of-ramp with no commit device (B2), two pre-solved items (B3), and one false parenthetical (I1). None requires redesign; B1/B2/B3 must be closed before authoring, since content-author and item-author would otherwise build the defect in.
