# PEDAGOGY CRITIC — WAVE 1 — `maths-structures-espaces-vectoriels` (R8, unbuilt spec)

Spec under review: `/home/user/BAC/docs/pipeline/propositions/maths-structures-espaces-vectoriels.md` (995 lines)
Rubric: `/home/user/BAC/docs/pipeline/NOTION-TEMPLATE-V2.md` boxes A–E · `/home/user/BAC/docs/product/VISION.md` L48–96 · `/home/user/BAC/docs/pipeline/EXEMPLARS.md`
Host: `/home/user/BAC/content/maths/structures-algebriques/{lesson.md,items.yaml,checkpoints.yaml,exercises.yaml,bank.yaml}`

**VERDICT: BUILD AFTER FIXES.** The spine holds and is above bar in three places I'd hold up as house exemplars. Three BLOCKING gaps must be closed *in the spec* before content-author/item-author start, because §10.3:769-770 forbids them improvising ("ne rien re-dériver, ne rien « améliorer »") — so anything the spec omits will simply not get taught.

---

## 0. ARITHMETIC AUDIT — clean

I independently recomputed **all eighteen worked examples C1–C18** and **all eighteen item keys plus every distractor premise the spec asserts** (not a sample of 10 — all of them, plus the three checkpoints' premise checks).

**Zero errors found.** Specifically verified: C1 (`:274-277`, ½·M(1,0)); C2's two derivations (`:294-297`); C3 (`:316`); C4 including the corroboration (1,4) (`:320-323`); C5 (`:328-333`); C6's coefficient regroup **and** its reverse check (`:342-349`); C7's decomposition (`:353-358`); C8's system **and** the independent generation control α=(x−y+z)/2 etc. and the (1,0,0) spot-check (`:378-386`); C9's three pairwise ratios and w₁+w₂=w₃ (`:390-393`); C10 including I∉E (`:404-413`); C11 (`:415-421`); C12 (`:428-433`); C13 (`:438-445`); C14 (`:448-452`); C15 and both counter-examples (`:465-469`); C16 (`:472-475`); C17 (`:478-483`); C18 including ker(x↦x²)={1,−1} and Im=ℝ*₊ (`:490-505`).
Checkpoints: 7.1's author-note product M(a,b)M(c,d)=M(ac−bd, ad+bc) is correct with integer entries (`:553-554`); 7.3's three non-colinearity checks correct (`:593-594`).
Items: SA-36…SA-53 keys all correct; SA-38 B's (1,1,0)+(1,−1,0)=(2,0,0) correct; SA-43's A₃=A₁+2A₂ correct; SA-45's −u₁+u₂−u₃=0 with u₃=u₂−u₁ correct; SA-47's dim 3 basis correct; SA-50's B=2A correct; SA-51's ker=Vect((2,1)), Im=Vect((1,2)) correct; SA-52 correct; SA-53's ker = unit circle correct.
Counts: habiletés 7/7/4 = 38,9/38,9/22,2 ✓ (`:786`). Floors M1 5 / M2 7 / M3 5 / M4 8 / M5 8 / M6 4 ✓ — I recounted each by item, and each holds on the spec's own tagging. `generalisation-hative` 13→17 ✓ against `items.yaml:2283` (count 13). `total_items` 35 ✓ (`items.yaml:2286`), last id SA-35 ✓, ramp_coverage R0–R7 ✓ (`items.yaml:2289-2297`). Ten `## ` headings confirmed in `lesson.md` (R7 is the 10th) — R8 = chapitre 11 is correct.

The spec's claim "chaque calcul a été mené deux fois" (`:256-257`) survives independent recomputation. This is the strongest part of the document and I want it on the record before the criticism.

---

## 1. BLOCKING

### B1 — No summit. TEMPLATE C fails on all four boxes, and a *sourced* fix is sitting in the repo.

`§12.2:877-884` declines to add any exercise: "**Cette spec n'en ajoute pas**". Consequence, against `NOTION-TEMPLATE-V2.md:91-104`:
- *Attempt-first, never printed* — FAIL. R8's last beats are [C17] (`:477-487`) and [C18] (`:489-505`): printed derivations. The student's final experience of the notion is a theory paragraph.
- *Reasoning on every summit question* — N/A, there is no summit question.
- *BLOCKING real-bac sourcing* — FAIL. No `exercises.yaml` entry, so no `sourcing.status: sourced`. Template: "**Summit unsourced = notion NOT DONE.**"
- *Anti-memorization variation* — FAIL.

**The stated blocker does not survive contact with the repo.** §12.2's reason is that 2018 N Ex1 (the only annale with the full chain incl. *base*) is a retyped source pending owner arbitration. But the summit box does not require the full chain — it requires *a* bac-type exercise from an identified national sujet. The spec itself calls `bk-2023-n-x5` q1–q2 "**la pièce maîtresse**" (`:115`), sourcing `vérifié`, re-fetched and diffed character-by-character, posing verbatim "Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$" at bac barème. And the "one annale, one entry" worry is refuted by this notion's own precedent: `exercises.yaml:28-39` (`r-bac`, 2019 N, `status: sourced`) transcribes **the same sujet** as `bank.yaml:290` (`bk-2019-n-x1`) — `bank.yaml:43-57` says so explicitly and records it as an owner nicety, not a rule.

**Why this is the top finding and not a nicety.** [C7] tells the student in bold that the answer which earns the 0,25 pt is "**le critère rédigé**" (`:363-364`). The chapter then never once asks the student to redact anything. All 35 existing items are `type: mcq` (verified: 35/35 in `items.yaml`), and all 18 new ones are too — the only surface in this corpus where a student *produces* a proof is `exercises.yaml` with its `steps:`, and that is precisely what §12.2 declines. **The chapter teaches a redaction and assesses only recognition.**

Note also that the armed gate cannot catch this: `web/scripts/rampe-bac.mjs:11-22, 40-43` measures *per notion*, not per rung — the notion keeps its green because R7 still holds `r-bac`. ADR 0033's "exact gate on a narrower question". Green here means nothing about R8.

*Fix shape:* an `r8-bac` on `bk-2023-n-x5` Partie I q1–q2 (`status: sourced`, note pointing at the verified transcription) rendered through `[[exercise:r8-bac]]`, plus an `r8-variation` on a fresh two-parameter $E$ carrying base + dimension (`status: not-applicable`, with the design note `rampe-bac` requires). Both are available without touching the 2018 arbitration. Place them at the end of bloc E so the chapter closes on an attempt, and §6.6's three sentences (`:507-512`) become the exercise's intro rather than the chapter's ending.

### B2 — The misconception ledger has two rows that are neither STAGED nor delegated.

`NOTION-TEMPLATE-V2.md:83-87`: "'Ruptured' means STAGED (the wrong model is voiced and broken on its own consequence), not merely 'the correct fact is stated nearby'… Delegation is legitimate… but must be WRITTEN in the spec — silence is an unclaimed row, and unclaimed = fail."

| id | staged rupture? | commit? | delegation written? | verdict |
|---|---|---|---|---|
| M1 `sous-espace-zero-suffit` | [C5] `:325-336` — voiced, run to consequence, broken | `cp-r8-pari-stabilite` `:556-575` | — | **PASS (gold)** |
| M2 `sous-espace-vs-sous-groupe` | [C1] `:268-279` — the hook IS the rupture | `cp-r8-pari-scalaire` `:536-554` | — | **PASS (gold)** |
| M3 `famille-libre-mal-testee` | [C9] `:388-397` — voiced + broken, but **no commit**, and the heading spoils it | none | none | **WEAK / unclaimed** |
| M4 `dimension-compte-parametres` | [C12] `:425-435` | `cp-r8-pari-dimension` `:577-594` | — | **PASS (gold)** |
| M5 `dimension-lue-sur-la-notation` | **none** — [C11] `:415-422` states "(et non 2)" and "Le « 2 » de $M_2$ est l'ordre des matrices" | none | none | **FAIL — unclaimed** |
| M6 `noyau-toujours-nul` | [C16] `:471-475` states a non-trivial kernel; model never voiced | none | **yes**, `:596-598` | **PASS (by written delegation)** |

- **M5 is the unclaimed row.** [C11] is exactly the EXEMPLARS.md:39-41 anti-pattern: "A paragraph that merely states the correct phase opposition next to the wrong idea does NOT check the 'ruptured' box." M5 is the id carrying **8 items** — the joint-largest load in the lot — and the prose never voices it, never runs it, never breaks it, and §7 never delegates it.
- **M3 is the second.** [C9] is titled "**le contre-exemple qui casse « libre = pas de colinéarité »**" (`:388`) — the heading hands the student the verdict before he engages. There is no prediction, rhetorical or otherwise. §7:596-598 writes a careful "décision de ne pas armer" for M6 and says nothing about M3, so M3 is silent, and silence = unclaimed.

*Fix shape:* one of (a) a fourth commit for M5 — the natural one is a pari on $\dim M_2(\mathbb{R})$ placed *before* [C11], with "2" (the index), "4" and "the ambient dimension" as the three faces; (b) restage [C11] as a voice-test-break beat; or (c) a written delegation naming the items and saying why prose rupture is not needed. Same three options for M3 — and if the answer is delegation, note that its items are themselves weak (see I10). Whichever is chosen, the choice must be written.

### B3 — "Combinaison linéaire" is named by the cadre and never defined; Vect arrives two blocks before its vocabulary.

The cadre's `programme` reads "…**combinaison linéaire** ; famille génératrice, famille libre, base…" (`:71-72`, i.e. `maths-sm.yaml:293`). Bloc C's heading promises it — "**Bloc C — combinaison linéaire, famille génératrice, famille libre**" (`:368`) — and then the block's body defines only *génératrice* (`:370-372`) and *libre* (`:374-375`). **The term itself is never defined anywhere in §6.**

Worse, the ordering imposed on content-author by `§10.2:750-753` puts [C7] *before* bloc C. At [C7] (`:351-366`) the student meets, with no prior vocabulary: "l'expert écrit $M(a,b)$ **comme une combinaison**", the notation $\mathrm{Vect}(A,B)$, and the general $p$-term identity $\lambda(\sum\alpha_i u_i) + \mu(\sum\beta_i u_i) = \sum(\lambda\alpha_i+\mu\beta_i)u_i$ with sigma notation. $\mathrm{Vect}$ then carries the rest of the chapter — [C12] (`:426`), [C13] (`:443`), [C16] (`:472`), SA-50, SA-51, SA-52.

VISION L63: "The student never gets lost, because the explanation never skips the step where they would get lost." This is that step, skipped, on the chapter's most-used piece of new notation.

*Fix shape:* a short beat between bloc A and bloc B defining *combinaison linéaire* on a concrete pair (the student has ℝ² from [C3] at hand), then $\mathrm{Vect}$ as "the set of all of them" **with** the proof that a Vect is a subspace — which [C7] already contains and would then be able to cite instead of import. [C7] keeps its expert-shortcut role and loses nothing.

---

## 2. IMPORTANT

### I1 — Reasoning-annotation is not 100%. Five of eighteen worked steps print algebra without the decision.
`NOTION-TEMPLATE-V2.md:34-39`: "every worked example… exposes the expert's DECISION… **One unannotated worked step = the box fails.**"

- **[C16] `:475` is the clearest failure.** "$\mathrm{Im}\,f = \mathbb{R}^2$ : pour $(s,t)$ quelconque, $f(s+t,\ t,\ 0) = (s,t)$ ✓". Where did $(s+t, t, 0)$ come from? This is exactly VISION L65-68's target case — the antecedent is pulled from a hat. The expert's actual move ("I need an antecedent; I have two equations and three unknowns, so I *choose* $z=0$ to kill a variable, then solve upward") is invisible.
- **[C8] `:377-386`** — the system is solved in the order 1st→2nd→3rd with no note on why you start where you start.
- **[C6] `:341-346`** — "Pose $A = \lambda a + \mu a'$" is the whole trick (name the new parameters so the *form* becomes visible), and it is done silently.
- **[C3] `:313-317`** — no note on why you test $\lambda u + \mu v$ in one shot rather than sum and scalar separately (which is the actual exam-time economy).
- **[C14] `:447-453`** — the transferable method ("a set given by an equation: solve for one variable, read the generators off the parametrisation") is never stated as a method.

By contrast [C7] (`:351-366`), [C2] (`:298`), [C4] (`:321`), [C9] (`:396-397`), [C11] (`:422`), [C12] (`:435`), [C15] (`:468`) and [C17] (`:485-487`) all carry a real decision layer. The fix is five annotations, not a rewrite.

### I2 — Blocs A, C and E carry no commit at all, and §6.7's own ramp table is unbacked for two of them.
`§10.2:750-753` places all three checkpoints in the accroche, bloc B and bloc D. Blocs C (libre/génératrice) and E (applications linéaires, noyau, image) — i.e. **half the cadre's four savoir-faire** — contain zero student action.

§6.7's table (`:514-525`) claims otherwise in its own "ce que l'élève fait seul" column: bloc C "**il voit la différence entre « deux à deux » et « à trois »**", bloc E "**il calcule un noyau et conclut sur l'injectivité**". Nothing in the delivery makes either happen — the student reads [C9] and [C16]. VISION L80: "Scaffolding fades as the student climbs." Here it does not fade; the prose simply stops asking.

*Fix shape:* the missing commits are the same ones B2 asks for (M3 in bloc C, and either a commit or the already-written delegation made visible in bloc E), plus — if B1 is taken — the r8-bac lands in bloc E and turns "il calcule un noyau" into something real.

### I3 — The mechanism-why of the whole chapter is missing: *why does a base have to be free?*
`NOTION-TEMPLATE-V2.md:32-33`: "Test: could a student ask 'mais pourquoi ?' and find the answer in the rung?" Bloc D (`:401-402`) defines base = libre AND génératrice and admits the dimension theorem. A student asking "but why demand *libre*? génératrice already writes every vector" finds **no answer** in blocs C or D. The answer — uniqueness of coordinates — exists in the document, but only at [C17] (`:481-486`), at the very end of bloc E, and it is framed as "la révélation du chapitre" rather than as the reason bloc D gave the definition it gave.

*Fix shape:* hoist the uniqueness argument (a free family ⟹ the writing is unique; a tied family ⟹ two different coefficient sets give the same vector — [C12]'s $\alpha u+\beta v+\gamma w = (\alpha+\gamma)u+(\beta+\gamma)v$ at `:429-430` already *is* the demonstration) into bloc D where base is defined. [C17] keeps its punch as the transport reading.

### I4 — "Famille génératrice" is under-taught to the point of asymmetry.
One sentence of definition (`:370-372`), then "Pour $E$ du [C6], c'est **la définition même**… sans un calcul de plus." The student never sees (a) a case where *finding* a generating family is work, (b) a candidate family that is **not** generating, (c) any misconception id, (d) any item targeting génération alone. *Libre* gets [C9] + M3 + five items. The cadre names both with equal weight (`:73-77`, "Étudier la liberté/génération d'une famille"), and the savoir-faire "déterminer une base" is half generation.

[C14] (`:447-453`) *does* the work (solve $z=-x-y$, read off the generators) but calls it "famille génératrice" in passing without marking it as the method. *Fix shape:* promote [C14]'s move to a named method inside bloc C, and add one item whose key turns on a family that fails to generate.

### I5 — The chapter-5 bridge is genuinely taught, but its headline formulation is false and arms M2.
The link **is** taught rather than asserted — this is one of the spec's best moves. [C2] (`:294-299`) proves $(-1)\cdot u = -u$, and §6.2 (`:307-311`) then *uses* that to explain why the third condition disappears, closing with "tout sous-espace est un sous-groupe de $(E,+)$ ; la réciproque est fausse", whose counter-example the hook already gave. Verified against the real chapter 5: `lesson.md:311-315` (three conditions) and `lesson.md:323-336` (the very $F$ over $\mathbb{Z}^2$ that [C1] reuses). Clean.

But the headline is wrong. `§4.3:204` and the framing at `:307-309` say the subspace criterion is the subgroup criterion "**moins une condition**". It is not. Chapter 5's condition 2 is $x \star y \in H$ (internal law only). The subspace's condition 2 is $\lambda u + \mu v \in F$ — a *strictly stronger* condition that folds in the external law, and it is that strengthening which absorbs condition 3. Telling a student "same list, minus one" is telling him a subspace is an *easier* subgroup — which is M2 (`:621-634`), the misconception the hook just broke, handed back to him in the criterion's own presentation.

*Fix shape:* state the exchange, not a subtraction: condition 2 is *replaced* by a stronger one carrying $\lambda$, and it is the new $\lambda$ that pays for condition 3. The gain in honesty is also a gain in teaching — it names the external law as the price, which is the chapter's thesis (`:264-266`).

### I6 — M1 and M2's labels overlap, and at least five distractor tags are wrong. A wrong tag writes a wrong id into the learner model.
- **Label collision.** M1's label (`:609-610`) is "Une seule condition du critère suffit : $0_E \in F$ **(ou la seule stabilité que j'ai su tester)**, donc c'est un sous-espace." That parenthesis swallows M2's case entirely (`:622-623`, checking the subgroup list and never reaching the external law). The spec's own item assignments reveal an unwritten operational rule — "stopped at zero" = M1, "stopped at +" = M2 — which is workable but is *not what the labels say*. Two ids that cannot be told apart from their labels produce an uninterpretable learner model.
- **Wrong tags found:** SA-38 C, "$\{x+y+z=1\}$ (ne contient pas 0)" → tagged **M1** (`:806`), but a student picking it did not stop at the zero test, he skipped it — that is the affine-vs-linear model of [C4], which carries no id. SA-38 D "$\{x\ge0\}$" → **M2**, though it fits M1's parenthesis exactly. SA-49 D "4, il y a quatre coefficients à écrire" → **M4** (`:837`), but M4 is *counting letters* and the set is written with three letters; reading 4 off the written coefficients is M5. SA-47 B "oublie $z$" → **M4** (`:830`): forgetting a parameter is not "counting instead of verifying". SA-53 D "$f$ est injective : $|z|=|z'|$ entraîne $z=z'$" → **`generalisation-hative`** (`:846`), but that is textbook M6. cp-r8-pari-stabilite C → **M2** (`:571`) while the spec's own gloss (`:574-575`, "la prémisse de C est vraie et son inférence fausse") describes `generalisation-hative`.

*Fix shape:* rewrite M1's label to drop the parenthesis and own only the zero test; re-tag the six; and decide whether the affine-vs-linear model ("décalé ⟹ plus de $0$") deserves its own id — [C4] and the figure's stage 2 already teach it, so it is a claimed rupture with no ledger row.

### I7 — Four items are pre-solved by §6, contradicting the spec's own §11.2 rule.
`§11.2:849-851`: "**Ne pas pré-résoudre.** Aucun item ne reprend un objet du §6… les 18 objets ci-dessus ont été choisis contre elle, un par un."

- **SA-48 (`:836`) is [C11] verbatim.** Question: "$\dim M_2(\mathbb{R})$ ?" Key: "**4**, base $(E_{11},E_{12},E_{21},E_{22})$". [C11] (`:415-421`) proves precisely that, with precisely that basis. Same object, same key, same basis. This is the clean violation, and it matters because SA-48 is one of the eight items carrying M5 — the id that (per B2) has no prose rupture either, so its whole diagnostic load rests partly on a recall question.
- **SA-37 (`:805`) is [C5] re-dressed.** $T = \{\mathrm{diag}(x,y) : xy=0\}$ is $H=\{(x,y):xy=0\}$ under the obvious relabelling, and the key counter-example is the same pair: $\mathrm{diag}(1,0)+\mathrm{diag}(0,1)$ versus [C5]/cp-r8-pari-stabilite's $(1,0)+(0,1)$. Identical numbers.
- **SA-41 (`:814`) has §6.6 as its key, verbatim.** Key: "une seule chose : la stabilité pour la loi externe". §6.6:510 says "il demande le **sous-groupe**, puis le **sous-espace** — et il ne reste alors que la loi externe à traiter". Labelled `synthese`, difficulty 4, answerable by recalling one sentence.
- **SA-45 (`:828`)** reuses two of [C8]'s three vectors: its generators $(1,0,1)$ and $(1,1,0)$ are [C8]'s $v_1, v_2$ (`:377`).

*Fix shape:* SA-48 → ask a dimension the lesson has not computed (e.g. $\dim$ of the upper-triangular 2×2, with 4, 2 and 3 as the M5/M4 faces). SA-37 → a different failure shape (a set that survives $+$ and dies on a negative scalar, so the item does not rehearse the checkpoint's move). SA-41 → keep the exam-shaped question but change what is given so it demands the *reason* the external law is what remains, not the recall that it is. SA-45 → fresh vectors.

### I8 — The spec's drafted options break the spec's own anti-cueing rules in at least five items; several are barrable on sight.
`§11.2:855-858` forbids "toujours / jamais / uniquement / aucun" and requires the key be neither longest nor shortest — and names `indice-absolu.mjs` and `indice-longueur` as armed gates.

Absolutes in the drafted options: SA-37 D "**toute** partie stable par $\cdot$ d'un sous-groupe est un sous-espace" (`:805`); SA-40 D "**seule** la loi $+$ compte" (`:813`); SA-43 D "plus de deux matrices **ne peuvent pas** être libres" (`:821`); SA-51 D "deux équations à deux inconnues **ne laissent que** le vecteur nul" (`:844`); SA-53 B "le noyau d'un morphisme **se réduit au** neutre" (`:846`). Each is barrable by a test-wise student who has understood nothing.

Length cue: as drafted, the key is by a wide margin the longest option in SA-36 (`:804`), SA-41 (`:814` — against B, "rien, c'est acquis", four words) and SA-53 (`:846`, three clauses plus three examples against three short distractors).

I accept that §11.1 gives the *gist*, not final wording. But the spec is the authority the item-author builds from, and the gist is what will be expanded. *Fix shape:* either write the four options of the riskiest items in full and compliant, or add an explicit instruction that §11.1's option texts are gists to be re-worded against §11.2 and the two gates re-run.

### I9 — SA-51 cannot differentiate anything, and M6's floor is thinner than it looks.
SA-51 (`:844`): distractors B, C **and** D are all tagged **M6**. A four-option item whose entire distractor set carries one id measures "got it wrong", not *which model is running* — VISION L84-86 ("Wrong answers reveal *which* misconception is running — not just that something is wrong"). It also inflates M6's apparent coverage.

And M6's floor of 4 (`:792`) rests on SA-41 D (`:814`, "que $(a,b)\mapsto M(a,b)$ est injective, sinon $E'$ n'est pas un sous-espace"), whose M6 tag is a stretch — the item is in the M2 block and the option is really a category error about what the criterion requires. Re-tag it and M6 sits at exactly 3 with one of the three being the degenerate SA-51.

*Fix shape:* give SA-51 one M5 and one M4 face (e.g. "Im is dimension 2, it lives in ℝ²"), and add a fourth genuine M6 item so the floor has margin without leaning on SA-41.

### I10 — M3's three items all hide the same relation, so its ramp is flat and its own §8 promise is unkept.
§8's "formes d'item" for M3 (`:644-646`) promises two shapes, the second being "une famille où la relation **ne se voit pas** et n'apparaît qu'en résolvant le système". None of the three delivers it: SA-42 is $v_1+v_2=v_3$ (`:820`), SA-44 is $v_2+v_3=v_1$ (`:822`), SA-43 is $A_1+2A_2=A_3$ (`:821`) — all visible by inspection, all the same shape as the worked [C9] ($w_1+w_2=w_3$). A student who memorises "check whether two of them add to the third" clears all three plus the lesson. VISION L77-80: later rungs must "build recognition… when the problem is dressed unfamiliarly"; here nothing is ever dressed unfamiliarly.

*Fix shape:* replace one of SA-42/SA-44 with a family whose relation has non-unit coefficients and no obvious sum — the item then actually requires the global test the misconception denies.

### I11 — The figure is placed where it can only recap, and one stage teaches a concept two blocks early.
`§9:721` places `[[figure:sous-espaces-plan-espace]]` "à la fin du bloc B, après [C5]" — i.e. after [C3], [C4] *and* [C5], the three things its stages 1–3 illustrate, have each been fully resolved in prose. `NOTION-TEMPLATE-V2.md:122-125` allows staging only "when the layer order is a teaching gesture"; staged after the teaching, the gesture is a summary. (The stage list itself is well authored — four stages, each saying what it teaches, sidecar named and gabarit cited. The box passes; the placement defeats it.)

Separately, stage 4 (`:717-718`) is "l'échelle des sous-espaces de $\mathbb{R}^3$ : $\{0\}$ (dim 0) ⊂ droite (dim 1) ⊂ plan (dim 2) ⊂ $\mathbb{R}^3$ (dim 3)" — **dimension is introduced in bloc D**, two blocks later.

*Fix shape:* split it. Stages 1–3 belong *inside* bloc B, interleaved: stage 1 with [C3], stage 2 with [C4], stage 3 revealed at the cp-r8-pari-stabilite confrontation (where a picture of (1,0)+(0,1) leaving the axes is worth more than the algebra). Stage 4 belongs in bloc D, next to [C14]'s plane — where it would also be the natural staging for M5's missing rupture (B2).

### I12 — The ramp descends after the summit.
With R8 appended after R7 (`§4.1:170-172`), the student's path is: R7's bac exercise (2019 N, 3,5 pts, attempt-first) → R7's fresh variation → **then a new hook, new definitions, new axioms, ending on bloc E theory.** VISION L80-82: "By the top, real bac questions feel routine — because the student was deliberately built up to them." The notion now has its top in the middle.

§4.3 point 5 (`:211-215`) anticipates the objection and answers it in the *sommaire* register ("l'ordre du sommaire n'est pas l'ordre de l'énoncé, et le dire est une leçon en soi") — which is a good line and does not touch the problem, which is reasoning-demand, not numbering. I do **not** think the placement decision is wrong (the four arguments at `:194-215` are strong, and options b/c cost 97 and 34 renvois). The fix is B1: give R8 its own summit and the ramp rises again to a second, higher top.

### I13 — Nothing in the chapter asks the student to produce anything.
Folded into B1 above, but recorded separately because it also bears on §11: eighteen new items, all MCQ, for four savoir-faire whose exam form is "**Montrer que** $E$ est un sous-espace" / "**Montrer que** $(I,J)$ est une base" (`:115`, `:117`). The house has already faced this and moved: `items.yaml:2307-2310` records the deliberate shift of SA-30/31/32/34 to "demandent une valeur produite". The R8 lot regresses to choose-the-justification throughout.

---

## 3. MINOR

- **m1** — `§7:531` lists `habilete` among the checkpoint fields, and none of §7.1–7.3 supplies a value. The house uses `raisonnement`/`utilisation` for checkpoints (`checkpoints.yaml:68,146,216,289,362,439`), a *different* vocabulary from items' `application_directe`/`synthese`. Name the three values.
- **m2** — No Derivation-component decision is recorded. `NOTION-TEMPLATE-V2.md:41-60` requires the choice to be authored: [C6] (`:342-349`), [C8] (`:378-386`), [C10], [C12], [C14] are archetypal "procedural verification and solution algebra" (component); [C2] and [C7] are argument-spine (narrated). §10.2 silently narrates everything. Write the split, even if the answer is "all narrated, because…".
- **m3** — `§10.3:764-766` prescribes voice, display math and the "Attention, le piège" pattern but never mentions the orthotypography rule (`NOTION-TEMPLATE-V2.md:66-73`: plain ASCII apostrophes in markdown, the pipeline converts). Low risk, one line.
- **m4** — SA-46 D (`:829`): "1, **les deux premières colonnes sont égales**" is false as written — the matrix is 2×2 and its columns are $\binom{a+b}{c}$ and $\binom{a+b}{0}$, which differ. The intended claim is about the two entries of the first *row*.
- **m5** — SA-44 B (`:822`): "libre, le système n'a que la solution nulle" is a bare false assertion with no reasoning attached, contradicting `§11.2:852-854` ("chaque choix confesse son raisonnement… jamais un nombre nu"). It also diagnoses nothing — picking it means "I mis-solved" or "I didn't solve", not a model.
- **m6** — R8 would carry 18 of 53 items (34 %) against 3–5 for each of R0–R6 (`items.yaml:2289-2297`), for a rung whose *attested* exam weight is 0,25–0,5 pt of 3,5 (`:135-137`). Defensible (four savoir-faire in one rung) but worth the owner's eye alongside Q1.
- **m7** — §11 prescribes per-distractor `feedback` (`:862-863`) but never the item `solution` field, where this notion's standard is a "**Pourquoi les distracteurs échouent**" paragraph (exemplar: `items.yaml:2262-2267`). Eighteen items will otherwise ship with whatever the author improvises.

---

## 4. What is above bar (so revision does not damage it)

- **[C1] + `cp-r8-pari-scalaire` is a house exemplar.** It matches EXEMPLARS.md:30-41 beat for beat — the wrong model voiced in the student's own situation ("F est déjà un sous-groupe, c'est précisément ce que demande un sous-espace", `:547`), run to its own consequence, broken by one couple, **with a real commit before any definition exists**, on an object the lesson already proved in chapter 5. The hook *is* the rupture and the rupture *is* the chapter's thesis. Do not touch this.
- **[C2] → §6.2's economy argument** is real taught mechanism (VISION L60-61): the missing third condition is *earned* from $(-1)u=-u$, not announced. Fix I5's headline wording without disturbing the argument.
- **[C7]** is the document's best beat against VISION L65-71, including the rare and valuable "the expert uses this to know where he's going, not to write less" plus the exam-redaction warning (`:363-366`).
- **Concrete-before-abstract holds inside bloc B**: a line in the plane ([C3]) before matrices ([C6]) — the right order, and the figure's stages 1–3 are designed for it (see I11 for where to move them).
- **[C17]** genuinely earns "révélation": ker = libre, Im = génératrice, base = bijection is the right unifying beat and ties back to chapter 10's transport.
- **Honest-debt writing** at `§8.7:688-699` (four undeclared models named with the reason), `§7:596-598` (the not-armed checkpoint with its motive), `§16:972-995` (what was not verified), and `§15`'s defaults-if-silent table. This is the standard ADR 0035/0036 ask, delivered.
- **Motion-decision box passes** with an explicit static-suffices justification (`:730-731`). **Asset box passes**: three checkpoint markers + one figure, no pending-asset dependency in the hook (`NOTION-TEMPLATE-V2.md:112-113`).
- **Placement analysis (§4)** is the right kind of work — four options, each costed by measurement, the chosen one costing zero renvois, and the expected gate-red named in advance while still insisting it be *read* (`:190-191`).

---

## 5. Template v2 box scorecard

| box | verdict | citation |
|---|---|---|
| A · predict-commit-confront | **PARTIAL** — 3 commits, none in blocs A/C/E | `:750-753`; I2 |
| A · mechanism-why | **FAIL** — "why libre?" unanswered where base is defined | `:401-402`; I3 |
| A · reasoning-annotation 100% | **FAIL** — 5 unannotated steps, [C16] worst | `:475`; I1 |
| A · voice | **PASS** (spec level) | `:764-766` |
| A · display-math / Derivation split | **UNDECIDED** — spec owes the choice | m2 |
| A · motion-decision | **PASS** — explicit static-suffices | `:730-731` |
| A · orthotypography | **not addressed** | m3 |
| B · misconception ledger | **FAIL** — M5 unclaimed, M3 unclaimed | B2 |
| C · attempt-first | **FAIL** — no summit | B1 |
| C · reasoning on summit questions | **N/A** — no summit | B1 |
| C · BLOCKING real-bac sourcing | **FAIL** — sourced fix available and declined | B1 |
| C · anti-memorization variation | **FAIL** | B1 |
| D · hook opens on a stake pre-definition | **PASS** | `:259-279` |
| D · hook real commit | **PASS (gold)** | `:536-554` |
| D · hook stands without pending assets | **PASS** | `:259-279` |
| E · markers resolve | **PASS** | `:707-721`, `:750-754` |
| E · diagrams coded, math live KaTeX | **PASS** | `:719-720` |
| E · `stages` authored | **PASS** (placement flawed — I11) | `:710-718` |
| E · authoring-annotation channel | **not addressed** (low risk) | — |

---

## 6. Routing

- **pedagogy-architect** (must land before build): B1 (summit design: r8-bac on `bk-2023-n-x5` + r8-variation), B2 (M5 and M3 — rupture or written delegation), B3 (combinaison linéaire beat + Vect ordering), I3 (hoist uniqueness to bloc D), I5 (criterion-exchange wording), I11 (figure re-placement, stage 4 to bloc D), I6 (M1 label, affine-vs-linear id decision).
- **content-author** (after the above): I1 (five annotations), I2's bloc-C/E consequences, m2, m3.
- **item-author**: I6 (re-tags), I7 (four objects to swap), I8 (option wording + re-run `indice-absolu`/`indice-longueur`), I9 (SA-51 distractor spread, fourth M6 item), I10 (one M3 item with a hidden relation), I13, m1, m4, m5, m7.
- **owner**: Q1 (cadre `research-consensus` on a scanned PDF), Q2 (2018 arbitration — note that B1's fix does **not** depend on it), m6 (18/53 item share).

Key file paths: `/home/user/BAC/docs/pipeline/propositions/maths-structures-espaces-vectoriels.md` · `/home/user/BAC/content/maths/structures-algebriques/exercises.yaml` · `/home/user/BAC/content/maths/structures-algebriques/bank.yaml` · `/home/user/BAC/content/maths/structures-algebriques/items.yaml` · `/home/user/BAC/content/maths/structures-algebriques/lesson.md` · `/home/user/BAC/web/scripts/rampe-bac.mjs`

Read-only review: nothing was edited.
