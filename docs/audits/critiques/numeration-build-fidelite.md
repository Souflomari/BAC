<!-- Rapport du bac-fidelity-critic (vague 1), copié tel quel le 2026-10-20 depuis la session cloud. Numéros de ligne à la date du rapport (avant correctifs). -->

# bac-fidelity review — R7b « Les systèmes de numération » (maths · arithmetique, SM)

**VERDICT: FIX THEN SHIP.**

**No binding failure.** No `exclusion` is breached, no `limite` is overshot, nothing is taught past the printed `savoir_faire`. Every number I recomputed is right. The notation is the one the sources settle. The single attested gesture is faithfully and honestly the anchor. The chapter-number insertion cost is genuinely zero. What blocks a clean ship is three small local items (one printed false lemma, one unevidenced claim in *rendered* text, one attested exercise form missing).

---

## 1. Scope — every passage maps onto a printed savoir-faire

Binding line: `/home/user/BAC/docs/cadre/curriculum/maths-sm.yaml:338` (`savoir_faire`, capacités 2.1.4/2.1.5/2.1.6) with `:332` (`programme`). Mapping, all five clauses covered:

| cadre clause (`maths-sm.yaml`) | where it is served |
|---|---|
| « Écrire un entier dans une base donnée » | `lesson.md:617-659` + figure; `cp-r7b-ordre-restes`; AR-41, AR-42 |
| « revenir à la base 10 » | `lesson.md:674-686`; AR-43; `r-numeration` qa |
| « opérer … dans une base » (`:332` names addition + multiplication) | `lesson.md:688-714`; `cp-r7b-retenue`; AR-47, AR-48, AR-49 |
| « comparer dans une base » | `lesson.md:720-736`; AR-44, AR-45, AR-46 |
| « exploiter une écriture en base pour une question de divisibilité ou de reste » | `lesson.md:738-793`; AR-51, AR-52; `r-numeration` qb/qc/qd |

**No exclusion touched.** `maths-sm.yaml:360` (« pas de fonction indicatrice d'Euler comme théorème central, pas de RSA/cryptographie formelle ») — nothing in R7b goes near either. `:361` (symbole de Legendre, réciprocité quadratique) — untouched. `exclusions_transversales` `:428-435` — none relevant. The hardest object in the chapter is an encadrement $b^p \le N \le b^{p+1}-1$ and a congruence on digits; everything else is division euclidienne, congruences and Gauss, all in `programme` `:311-312`.

**Base 2 is NOT computing culture.** It appears three times (`lesson.md:607-615` hook, `cp-r7b-predict-ecriture`, AR-45) and only as one base among others — exactly what the spec's owner answer Q2 promised (`docs/pipeline/propositions/maths-arithmetique-numeration.md:1321`). No binary↔hex, no two's complement, no machine representation; one motivational clause at `lesson.md:603`. The drift the brief feared did not happen.

**Bases > 10 / letter digits: absent entirely.** Max base used is 9 (lesson 2,3,5,6,7,8; items 5,6,8,9; cp 6; figure 7). Declared at `lesson.md:824-825`. See S2 below — this is the one material scope *gap*.

### Two scope questions I examined and judge IN (recorded so nobody rediscovers them as holes)

**(a) Cross-base comparison** (`lesson.md:732-736`, AR-45 ordering $\overline{11011}_{(2)}$, $\overline{34}_{(5)}$, $\overline{23}_{(9)}$). The cadre says « comparaison **dans une base** » (`:332`, singular), and corroborating source F is explicit: « مقارنة عددين ممثلين في **نفس** النظمة » = comparison of two numbers in the SAME base (`docs/cadre/sources/verification-numeration-2026-09-28.md:157-160`). **IN**, because it decomposes into two printed savoir-faire — « revenir à la base 10 » then ordinary integer comparison — and its function is to teach that digit-level comparison across bases is *illegitimate* (`lesson.md:736`). It adds no new result.

**(b) Divisibility criteria in a GENERIC base, mod $b-1$ and mod $b+1$** (`lesson.md:738-769`, AR-51, AR-52, qb). Source F restricts the attested criteria to the decimal system (« مصاديق قابلية القسمة … في نظمة العد **العشري** », same lines), and the only attested *exam* gesture is at $b=10$. **IN**, because the binding line `:338` is written generically (no base restriction), and because the generic criterion is literally the R2 proof with a letter in place of a digit — `maths-sm.yaml:361`'s **PRINCIPE DE TRI** covers it exactly: what is out of bounds is invoking a result as a NAMED ADMITTED theorem; what is attested is having it CONSTRUCTED from the chapter's tools. The chapter constructs it (`lesson.md:742-760`) and prints the hedge (`:806`, « à la base 10 »). **For the record:** this is where the chapter leans hardest on `derived` granularity rather than `research-consensus`, so it is the first thing to re-read if porte 1 (Gemini) or porte 3 (human) narrows 2.1.6.

### Placement observation (not a defect)
The cadre numbers numeration 2.1.4-2.1.6, i.e. *before* Bézout/Gauss/Fermat (2.1.7-2.1.9), while the build places it at chapter 10 — after diophantine equations — and makes it *depend* on Gauss (`lesson.md:783`; qd uses the chapter-6 corollary). Judged fine: a cadre d'examen lists what is evaluable and prescribes no teaching order, and **three attested Moroccan course plans put numeration LAST** in the arithmetic chapter (verification doc `:86-88` source A, « III- نظمات العد » placed immediately after solving $ax+by=c$ in ℤ²; `:166` source G, where it *closes* the plan; `:172` source H, listed last). The build's placement is better-attested than the cadre's numbering would suggest. Recorded because if anyone re-reads 2.1.x as a sequence, R7b's dependence on Gauss is what would have to move.

### Filière correctness — SExp never meets this
`maths-sexp.yaml:361-362` puts the whole `arithmetique` slug out of SExp perimeter (« Domaine SM uniquement — pas au cadre SExp »), which covers R7b automatically. `exercises.yaml:12-13` states the same. ✓ (One list-hygiene nit → S6.)

---

## 2. Notation, anchor, format

**Notation: correct, as settled.**
- Primary form `\overline{a_p a_{p-1} \cdots a_1 a_0}_{(b)}` at `lesson.md:623`, used **without exception** in the lesson, all 3 checkpoints, `r-numeration`, and all 12 items.
- Exactly one sentence on the variant, `lesson.md:623`: « Certains documents écrivent la base en exposant, $\overline{a_p \cdots a_0}^{(b)}$ : c'est la même chose. » ✓
- The **forbidden** form — parentheses around the DIGITS, $(a_n\cdots a_0)_b$ — appears **nowhere**. That is the form the verification report proved to be an artifact of the automatic PDF reader, attested in **0** Moroccan sources (verification doc `:36-43`, `:312`, `:319-321`). Correctly excluded.
- The **figure carries the notation as a drawn vinculum, not a glyph**: `numeration-cascade-2025-base7.svg:114` is `<line x1="282" y1="327" x2="351" y2="327">` over the four digits at `y=352`, with `(7)` at `y=359` — below the baseline, i.e. subscript (`:110-115`). Exactly the settled form, and the report's own warning (a vinculum is a *drawn trait*, invisible in extracted text, `:26-30`) is respected in the one medium where it matters.
- **The source's coquille was not copied.** Source 1's page prints $a_i \in [0, n-1]$ where it should be $[0, x-1]$ (verification doc `:272`, « Signalé pour ne pas la recopier »). `lesson.md:623` writes $0 \leq a_i \leq b-1$. ✓

**Notation divergence to ratify (LOW).** The build chose the *indice* as primary; the report's non-binding recommendation leaned the other way — « si une forme doit être choisie pour nos leçons, $\overline{a_n\cdots a_0}^{(b)}$ est celle qui est attestée dans le chapitre Arithmétique du cours 2ème BAC SM A BIOF publié par AlloSchool » (`:314-318`). Both are attested on pages **VUES** (exposant = source 1, the AlloSchool 2 Bac SM doc; indice = source 2, Moustaoui, 2 Bac SM Arabic), the count is 1–1–1 with **no majority** (`:307-312`), and the report explicitly declined to impose (`:314` « à valider, non imposée » ; « ne pas figer une forme unique »). So the choice is **legitimate** and showing both is right — but it is a divergence from a written recommendation and currently lives only in an author note (`lesson.md:822-823`, « Notation tranchée par la spec »). The report's companion instruction — « tout item doit **accepter la variante en indice** » (`:318`) — is **moot today** (all 15 numeration questions are MCQ with pre-written LaTeX options) and becomes live the first time a free-text numeration item is written. Worth one line in the spec so it isn't lost.

**Anchor: FAITHFUL.** I verified `bk-2024-r-x5` directly. `bank.yaml:1443-1449`: 2024 session de **rattrapage**, SM, Exercice 5, **3 points**, 18 min, `sourcing.status: sourced`, code RS 25. Editorial note `:1420-1429`: it builds « **23 divise m si et seulement si 23 divise q + 7r**, où q et r sont le quotient et le reste de m par 10 », then uses it to resolve a two-congruence system; `:1482-1486` records it is the one entry of ten that does not touch Fermat. `lesson.md:806` states exactly this, **with the base named** (« à la base 10 »), **one** exercise, **no frequency word** — no « toujours », no « souvent », no weight claim. This is a model citation.

The cross-reference **resolves**: `lesson.md:806` « Tu le trouveras dans « S'entraîner » » — `bank.yaml` renders as the trailing synthetic « S'entraîner » chapter (`web/src/lib/content.ts:412-414`; `web/src/components/notion/ExerciseBank.tsx:32`), so `bk-2024-r-x5` is reachable under that exact label. ADR 0031 (« a cross-reference is an instruction ») — this one executes.

**No other bac claim anywhere in R7b.** The hook (`lesson.md:605`) mentions no exam and no frequency, as the spec required (`:418` « Aucune mention d'examen, aucune fréquence »). ✓ One soft exception → **S3**.

**Format: matches.** `docs/cadre/bac-reference.md:127-128` — « Mathématiques: several exercises, with a **terminal synthesis question** carrying the niveau-3 demand ». `r-numeration` is 4 chained questions qa→qd whose terminal qd *is* the niveau-3 demand: it refuses the $6\times8=48$ reflex and reconstructs $24 = \mathrm{PPCM}(6,8)$ from the coprimality condition (`exercises.yaml:313-328`). Chain shape also matches the attested exercise (`bk-2024-r-x5`: 5 questions / 3 pts / one page).

*One format gap, correctly handled:* `r-numeration` carries no per-question barème and no duration, unlike `r-bac` which prints « **(0,5 pt)** » per question from the 2019 scan. For a `not-applicable` exercise that is the right call — inventing a barème would fabricate exam data, and `r-variation` does the same. But it means this capacity is the one place in the notion where the student never meets the point economy. **Declare as debt, don't fix**; the real fix is the sourcing request already open (spec Q6, `:1325`).

---

## 3. Recomputation — ZERO errors

I recomputed every number in the prose, the three checkpoints, the four exercise questions, the twelve items and the figure. **All correct.** Spot list:

- **Prose:** $2025_{(2)} = \overline{11111101001}$, 11 digits, $1024{+}512{+}256{+}128{+}64{+}32{+}8{+}1 = 2025$ ✓ · four divisions of 2025 by 7 and $\overline{5622}_{(7)} = 1715{+}294{+}14{+}2$ ✓ · the counter-example $\overline{442}_{(6)} = 170 \ne 100$ ✓ (true writing $\overline{244}_{(6)}$) · $\overline{3204}_{(5)} = 429$ ✓ · $188{+}129 = 317 = \overline{632}_{(7)}$ with carries $9{=}7{+}2$, $10{=}7{+}3$, $6$ ✓ · $25\times5 = 125 = \overline{236}_{(7)}$, and the base-10-threshold counterfactual $\overline{170} = 34\times5$ ✓ · $\overline{1000}_{(3)}{=}27$, $\overline{222}_{(3)}{=}26$ ✓ · $\overline{21}_{(3)}{=}\overline{12}_{(5)}{=}7$, $\overline{201}_{(3)}{=}19$, $\overline{201}_{(5)}{=}51$ ✓ · the mod-6/mod-8 table on $\overline{5622}_{(7)}$: $15 = 6{\times}2{+}3$ and $2025 = 6{\times}337{+}3$; $2{-}2{+}6{-}5 = 1$ and $2025 = 8{\times}253{+}1$ ✓ · naive answer $15 \to 7$ ✓ · $\overline{3405}_{(7)} = 1230 = 6{\times}205 = 8{\times}153{+}6$, digit sum 12, alternating 6 ✓ · the $xy$ puzzle $3x{=}2y$, Gauss $2\mid x$, $(2,3)/(4,6)/(6,9)$, the $(4,6)$ trap ($34{=}34$ but $\overline{64}_{(5)}$ illegal), answer $\overline{23}_{(7)}{=}\overline{32}_{(5)}{=}17$ ✓ · author-note $950 = \overline{4222}_{(6)}$, $864{+}72{+}12{+}2$ ✓
- **Checkpoints:** `cp-r7b-ordre-restes` all four options ($\overline{2265}_{(7)}{=}831$, $\overline{5226}_{(7)}{=}1833$, $\overline{5622}_{(7)}{=}2025$, $\overline{2025}_{(7)}{=}705$) ✓ · `cp-r7b-retenue` all four ($\overline{152}_{(6)}{=}68$; $\overline{100}_{(6)}{=}36$ via the base-10 threshold; $\overline{251}_{(6)}{=}103$ via $68{=}6{\times}11{+}2$, $11{=}6{\times}1{+}5$; $\overline{22}_{(6)}{=}14$ via dropped carries) ✓ · `cp-r7b-predict-ecriture` (« onze en base 2, quatre en base 10 ») ✓
- **Exercise:** $N = 50x+7y$ ✓ · $50 = 6{\times}8{+}2 = 8{\times}6{+}2$, so $50 \equiv 2$ mod 6 *and* mod 8 — both control paths ✓ · the six-column table (y forced $=2,4,6,0,2,4$; $2x{+}y = 4,8,12,8,12,16$) recomputed column by column ✓ · $\overline{363}_{(7)}{=}192{=}6{\times}32{=}8{\times}24$; $\overline{525}_{(7)}{=}264{=}6{\times}44{=}8{\times}33$ ✓ · $192{=}48{\times}4$ but $264{=}48{\times}5{+}24$ ✓ · $\mathrm{PGCD}(6,8){=}2$, $24{=}\mathrm{PPCM}(6,8)$, $192{=}24{\times}8$, $264{=}24{\times}11$ ✓
- **Items:** AR-41 ($\overline{352}_{(8)}{=}234$; $\overline{253}_{(8)}{=}171$; $\overline{234}_{(8)}{=}156$; $8^3{=}512$) · AR-42 ($\overline{615}_{(9)}{=}500$; half-reversal $6,5,1$ puts 1 in units) · AR-43 ($53$; reversed weights $77$; shifted exponents $265$) · AR-44 ($99/107/178$; digit sums $11/7/6$; reversed readings $123/59/386$ — all three) · AR-45 ($27/19/21$; digit sums $4/5/7$) · AR-46 ($125..624 \cap 64..511 = 125..511$; $125 = \overline{1000}_{(5)} = \overline{175}_{(8)}$) · AR-47 ($97{+}44{=}141{=}\overline{1031}_{(5)}$; $\overline{476}_{(5)}$; $\overline{1301}_{(5)}{=}201$; $\overline{421}_{(5)}{=}111$) · AR-48 ($29{\times}3{=}87{=}\overline{223}_{(6)}$; $\overline{135}_{(6)}{=}59$; $\overline{322}_{(6)}{=}122$; $\overline{1215}_{(6)}{=}299$) · AR-49 ($c{=}qb{+}r$, the $c{=}b$ edge) · AR-50 ($4x{=}3y$, Gauss $3\mid x$, $y{=}8$ illegal, $\overline{34}_{(9)}{=}\overline{43}_{(7)}{=}31$; swapped-weights branch $4y{=}3x \to (4,3)$ with $39 \ne 25$) · AR-51 ($\overline{8523}_{(9)}{=}6258$; digit sum 18 → 2; $6258{=}8{\times}782{+}2$; alternating $-2 \equiv 6$; units 3 and $6258{=}9{\times}695{+}3$) · AR-52 ($x{+}7 \equiv 0\,[8] \to x{=}1$; $\overline{314}_{(9)}{=}256{=}8{\times}32$; $\overline{324}_{(9)}{=}265{=}8{\times}33{+}1$; $\overline{374}_{(9)}{=}310{=}8{\times}38{+}6$) — **all ✓**
- **Figure:** four divisions, weights $1, 7, 49, 343$, digits $a_0..a_3$, and the assertion block at `svg:25-28` ($5{\times}343{+}6{\times}49{+}2{\times}7{+}2 = 2025$) is true ✓

**Collisions.** The one real collision is declared and harmless: **192** is the value of $\overline{363}_{(7)}$ in `r-numeration` and also the **exponent** in `bk-2024-n-x5` (`bank.yaml:547-569`, $2024^{192}x \equiv 3\,[221]$, where $192 = (13{-}1)(17{-}1)$) — different role, no memorization path; declared at `exercises.yaml:242-243`. I checked the other distinctive values (264, 6258, 8523, 1031, 429, 317, 2025, 5622, 950, 4222, 363, 525) against `bank.yaml`: **no other collision**. The non-duplication claim at `items.yaml:2776-2779` **holds** — no item replays a worked example of the rung, and no number is lifted from an annale. I also confirmed the 0/10 claim independently: `overline|_{(|base \d` returns **0 matches** in `bank.yaml`, so no verified annale carries a base writing.

---

## 4. Habileté mix — ACCEPTABLE for this lot; the defect is one level up

Rubric: `maths-sm.yaml:58-61` (`habiletes_ratios_examen` 40/40/20), restated at `bac-reference.md:93-94` and declared the fidelity critic's rubric at `:102-104`.

**Lot AR-41…AR-52 = 8/3/1 = 67/25/8.** I recounted item by item; the build's printed figure (`items.yaml:2743-2745`) is **accurate**.

**Acceptable, four cited reasons:**
1. The ratios are `habiletes_ratios_examen` — a property of the **4h paper**, not a per-chapter quota. The cadre prescribes no per-lot mix, so this is **not a cadre breach**.
2. `bac-reference.md:127-128` puts the niveau-3 demand on a **terminal synthesis question**, not on the item bank. `r-numeration` qd is that question and genuinely carries it.
3. The structural reason is real (`items.yaml:2745-2751`): 9 of 12 items serve 2.1.4/2.1.5, niveau-1 gestes once the prose is done.
4. Forcing 40/40/20 on twelve items would require mis-tagging — the exact failure this file already named for R6b (`items.yaml:2213-2217`, mix 20/60/20 on 5 items, « échantillon trop petit pour forcer ce ratio sans fausser un tag »).

**The recorded defect is at the notion level, and the build's framing of it is wrong** → S5 below.

---

## 5. Chapter-number consequences — all verified, cost genuinely zero

`lesson.md` has exactly **11 `##` headings, none plain**, so the shorthand « chapitre N = R(N−1) » holds here (`web/src/lib/chapters.ts:6-28` warns it holds only for the 56 pure-rung lessons). Mapping: R0=1, R1=2, R2=3, R3=4, R4=5, R5=6, R6=7, R6b=8, R7=9, **R7b=10, R8=11**.

130 « chapitre N » occurrences across 7 files; by value only 1,2,3,4,5,6,7,9 and the range « 1 à 11 ». **Every one points where it says**, checked individually:
- **ch.1 = R0** → `lesson.md:273` (the 3 L / 5 L pair) ✓
- **ch.2 = R1** → `lesson.md:125`, `:627`, `:659` ✓; `bank.yaml` « un diviseur de n divise tout multiple de n » ✓
- **ch.3 = R2** → `lesson.md:605`, `:750` ✓ — R2's critère by 9 is at `:139-157`, proved from $10 \equiv 1\,[9]$ with the same $\sum a_i 10^i$ structure, so R7b's generalization *is* the same proof with a letter, and says so (`:750`). No dédoublement; spec `§11.2` respected.
- **ch.4 = R3** → `lesson.md:239`, `:425`, `:429`, `:575` ✓; `media/factorisation-360.stages.json` ✓
- **ch.5 = R4** → `lesson.md:287`, `:331`, `:351`, `:539`, `:577` ✓
- **ch.6 = R5** → `lesson.md:409`, `:783` ✓; `exercises.yaml:317`, `:321`, `:324` « le corollaire du chapitre 6 » ✓ — the corollary ($a|c$, $b|c$, $\mathrm{PGCD}(a,b){=}1 \Rightarrow ab|c$) is at `lesson.md:307-317`, inside R5
- **ch.7 = R6** → `lesson.md:839`; `exercises.yaml:223`, `:230` ✓
- **ch.9 = R7** → `bank.yaml:628` ✓; `media/solutions-diophantiennes-reseau.stages.json:5` ✓ — R7 did **not** move (R7b was inserted *after* it), so these are untouched
- **R6b (ch.8) and R8 (ch.11) are referenced by NAME, never by number** (`bank.yaml:127` « vu au chapitre du petit théorème de Fermat ») — which is exactly why R8's move 10 → 11 cost nothing
- **R7b cites only chapters 2, 3 and 6** (`:605`, `:627`, `:659`, `:750`, `:783`) — zero self-reference, zero forward reference, exactly the closed list the spec fixed (`spec:848-852`)
- **No other notion cites an arithmétique chapter** — confirmed across all of `content/`; the cross form « chapitre N de « Titre » » never targets arithmétique
- **Checkpoint perimeter guard updated** (`checkpoints.yaml:68-73` now names « systèmes de numération (écriture en base, opérations, comparaison, critères par b−1 et b+1) ») — the spec's mandatory edit `§11.3` was done ✓
- **The seal was re-sealed correctly**: `web/scripts/carte-chapitres.base.json:2-14` lists 11 entries with « Les systèmes de numération » at rank 10 and « Pour t'entraîner » at 11 ✓
- `REVIEW-2026-09-12.md` carries 4 « chapitre N » citations — dated review document, per-document status (ADR 0031), not rendered. No action.

**The one thing the spec's measurement missed** → S7.

---

## Findings, ranked

**S1 — MEDIUM · scope omission against an attested exercise FORM: mixed-base operations.**
The chapter covers **only same-base** $+$ and $\times$ (`lesson.md:688-714`; AR-47 base 5, AR-48 base 6, AR-49 the generic rule; `cp-r7b-retenue` base 6). Attested Moroccan 2 Bac SM material does the mixed case explicitly — verification doc `:137-141`, source D **verbatim**: « Pour effectuer des opérations dans **différentes bases** on développe les deux nombres dans la base 10 ; on effectue L'opération et on écrit le résultat dans la base demandée. Exemple : effectuer dans la base 9 … 6432 … 54 » — and `:296-299`: operands $\overline{6432}$ base 7 × $\overline{54}$ base 8, **result demanded in base 9**. The report calls source D « la corroboration la plus littérale que j'aie obtenue » (`:146`). **Not a boundary breach** — `maths-sm.yaml:332/338` says « dans **une** base », singular — but an omission against the most literally-attested form. The machinery is already in the build: AR-47 option B and AR-48 option B both walk the via-base-10 path *as a distractor*. Cheapest fix: one worked line, or one item. **Role: pedagogy-architect (spec amendment) → lesson-author / item-author.**

**S2 — MEDIUM-LOW · scope ceiling at base 9, declared but under-argued.**
No base above 9 anywhere, so no letter/extra digit is ever met. Declared at `lesson.md:824-825` (« question owner Q1(b) ouverte »). The declaration does **not** name the source that makes it consequential: verification doc `:89-91`, source A (Moustaoui, **page VUE**, printed level « الثانية سلك بكالوريا علوم رياضية » = 2 Bac SM) gives « exemples en base **2, 8, 12** » — base 12 needs digits ten and eleven. And `maths-sm.yaml:332` says « une base **donnée** », with no cap. So the cap at 9 is a **choice, not a boundary**. **Do not fix inside this lot** — the owner question is the right gate — but raise it with this citation attached. **Role: research-lead → owner.**

**S3 — LOW-MEDIUM · unsupported form claim in RENDERED text.**
`exercises.yaml:253`, `r-numeration` intro, rendered to the student: « il a **la forme que prennent les questions sur les écritures en base**, mais ce n'est pas un sujet d'examen. » The corpus has **zero** verified national exercises on a base writing (0/10 — I verified independently, see §3). The disclaiming note lives in `sourcing.note` (`:248-251`), and `exercises.yaml:7` declares `sourcing` « **CÔTÉ-AUTEUR UNIQUEMENT (jamais rendu)** ». So the rendered sentence asserts a form the corpus cannot show, and the only text that disclaims it never reaches the student. Everything *else* on this axis is exemplary (`lesson.md:806` is a model citation). Fix is six words: « il est construit sur le modèle des exercices d'arithmétique du bac, mais ce n'est pas un sujet d'examen ». **Role: lesson-author (`exercises.yaml` only).**

**S4 — LOW · a printed mathematical falsehood in a rendered `reasoning` field.**
`exercises.yaml:295` and `:308`: « pour $x$ fixé, $2x-y$ parcourt **sept entiers consécutifs** quand $y$ va de 0 à 6, et **un seul** d'entre eux est un multiple de 8 ». Seven consecutive integers contain **at most** one multiple of 8 and may contain **none** (e.g. 1..7). It is true for all six $x$ here only because $2x \in \{2,\dots,12\}$ makes the window $[2x{-}6,\,2x]$ straddle 0 ($x \le 3$) or 8 ($x \ge 4$) — I checked all six. As printed it is a false lemma a bac grader would mark. Fix: « au plus un » + « et le tableau montre qu'il y en a un pour chaque $x$ ». **No number changes. Role: lesson-author.**

**S5 — LOW · measurement honesty on the habileté mix (ADR 0036: « un total opt-in est un plancher, pas une somme »).**
`items.yaml:2752` states « **Aucun mix de NOTION n'est calculable** : `habilete` n'existe que sur les items AR-33 et suivants. » A mix over the **20 tagged items IS calculable**, and I computed it: AR-33…AR-40 = **2/4/2**, AR-41…AR-52 = **8/3/1** → **10/7/3 = 50/35/15**. What is not calculable is a mix over all 52. The published 50/35/15 is **numerically the SExp maths profile** (`bac-reference.md:95-96`, *cadre-confirmed*, 2022 maths cadre) — one notch easier than SM's own 40/40/20 (`maths-sm.yaml:58-61`; `bac-reference.md:113-114` « 20% vs 15% synthèse, 40% vs 50% application directe »). Flagged as a numeric coincidence, not a causal claim — but it is the honest number and it is more useful than 8/3/1. Fix: replace the sentence; print the floor **and** the sum over the opt-in set. **The remedy for the deficit belongs to the NEXT lot** (+2 `application_non_explicite`, +1 `synthese` → 10/9/4 ≈ 43/39/17), **never by re-tagging these twelve.** **Role: item-author, comment only.**

**S6 — LOW · cadre-file mirror hygiene (a LIST where a PRINCIPLE is needed).**
`maths-sexp.yaml:341` names « Arithmétique dans ℤ (divisibilité, congruences, Bézout, Gauss, équations diophantiennes) » and is **silent on systèmes de numération**; a grep for « numération » in that file returns nothing. Filière correctness **holds anyway** because `:361-362` excludes the whole `arithmetique` slug. But an enumerating list is the exact failure mode `maths-sm.yaml` reprimanded itself for **twice the same day** (`:340-361`, rewritten into a PRINCIPE DE TRI after two falsifications). Fix: one parenthetical, « …, équations diophantiennes, **systèmes de numération** », or « le chapitre arithmétique dans son entier ». **Role: research-lead (cadre file, not the notion).**

**S7 — LOW · a measurement defect in the spec, which matters for the NEXT insertion.**
`docs/pipeline/propositions/maths-arithmetique-numeration.md:53`, fact (i): « **AUCUNE** ligne du dépôt ne cite « chapitre 8 », « chapitre 10 » ni « **chapitre 11** » de cette notion », measured with `grep -rnoE 'chapitres? [0-9]+'`. **False in letter**: `bank.yaml:846` and `:863` both read « **chapitres 1 à 11** ». The `-o` grep emits only `chapitres 1` for a **range** — it cannot see the upper bound. ADR 0036's exact mode (« une chose n'est prouvée ABSENTE que si l'on a énuméré ses FORMES »). Fact (i) is the stated basis of the spec's `§2` verdict (« coût de renumérotation à zéro »).
**The good news, worth recording: the GATE is not blind.** `web/scripts/carte-chapitres.mjs:75` RENVOI regex `/[Cc]hapitres?\s+(\d+)(?:\s*(?:et|à|,)\s*(\d+))?.../g` **does** capture the second number, so `--porte` would have listed both lines for re-reading, and the seal was re-sealed correctly. The instrument caught what the hand-grep missed.
**Current state of those two lines is CORRECT**: both say « le corps de la leçon / le corps des chapitres », i.e. the lesson body (not the synthetic « S'entraîner »), and there are now exactly 11 real chapters. **But verify in git whether they read « 1 à 10 » before today** — if they were updated, the gate did its job; if they were not, they were wrong before and are right by accident. Either way the current state is right; the distinction decides whether this is a near-miss or a live hole. I have no shell in this run. **Role: pedagogy-architect (correct fact (i)) + whoever has the shell (the git check).**

---

## Handed to pedagogy-critic, not judged here
Three « Prends position » prompts (`lesson.md:732`, `:752`, `:785`) are answered in the very next paragraph with **no checkpoint marker**, unlike the three that carry one (`:611→613`, `:637→639`, `:716→718`). Not my remit — flagging only so it isn't lost between critics.

---

## Ranked minimal fixes

| # | file + line | fix | role |
|---|---|---|---|
| 1 | `content/maths/arithmetique/exercises.yaml:295`, `:308` | « un seul » → « au plus un », + « le tableau montre qu'il y en a un pour chaque $x$ ». No number changes. | lesson-author |
| 2 | `content/maths/arithmetique/exercises.yaml:253` | drop the unevidenced form claim from the **rendered** intro | lesson-author |
| 3 | `content/maths/arithmetique/lesson.md:688-714` (one worked line) **or** one new item | mixed-base operation (operands in two bases, result in a third), via base 10 | pedagogy-architect (spec) → lesson-author / item-author |
| 4 | `content/maths/arithmetique/items.yaml:2752` | replace « aucun mix de NOTION n'est calculable » with the floor **and** the 20-item sum (10/7/3 = 50/35/15) | item-author (comment only) |
| 5 | `docs/pipeline/propositions/maths-arithmetique-numeration.md:53` | correct fact (i): « chapitres 1 à 11 » exists twice (`bank.yaml:846`, `:863`); the `-o` grep is range-blind; the gate is not | pedagogy-architect |
| 6 | `docs/cadre/curriculum/maths-sexp.yaml:341` | add « systèmes de numération » to the arithmetic exclusion's parenthetical | research-lead |
| 7 | owner decision | ratify the notation choice (indice, vs the report's exposant leaning, `verification…:314-318`) **and** answer Q1(b) on bases > 10 with `verification…:89-91` attached | research-lead → owner |
| 8 | git | confirm whether `bank.yaml:846`/`:863` read « 1 à 10 » before 2026-10-20 | whoever has the shell |

**VERDICT: FIX THEN SHIP.** Fixes 1–2 are one line each and are the only ones I would block the ship on; fix 3 is the only substantive content addition and needs a spec amendment first. Nothing in this chapter is off-syllabus, and on the axis I exist to guard — the cadre boundary — this is the cleanest built chapter I have reviewed: the generic-base criterion is *constructed*, not invoked (satisfying `maths-sm.yaml:361`'s principe de tri verbatim); the base-2 drift the brief feared did not happen; the one attested gesture is cited with its base named and no frequency word; and the renumbering cost is zero **by construction**, because R7b was written never to cite a chapter ≥ 8.
