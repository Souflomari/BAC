# Audit: bank → lesson/items gaps, maths (14 notions)

Scope is `content/maths/*/` except `_media-test`. For each notion I compared `bank.yaml` (the verified national sujets) with `lesson.md`, `items.yaml` and `checkpoints.yaml`. This was a read-only audit: no file under `content/` or `docs/` was edited. The working tree was clean for maths, apart from the in-flight `equations-differentielles` edits (`git status --short content/maths`).

## Method and calibration

- **What counts as "demonstrated":** a technique counts as demonstrated only if a lesson rung **works it** in a worked example.
  - **Calibration:** the reference gap (Δ=0 in `equations-differentielles`) was already worked in that notion's `exercises.yaml` r-bac summit, and it was still judged a gap. So **a technique worked only inside the summit (`[[exercise:r-bac]]` / `r-variation`) is NOT counted as demonstrated.**
- **What counts as "tested":** an item in `items.yaml` or a checkpoint in `checkpoints.yaml` whose stem requires the technique. A misconception tag alone does not count.
- **Severity:**
  - **GAP-A:** required by a verified sujet, not worked in any rung, and not tested.
  - **GAP-B:** stated but never worked, or worked in a rung but never tested. The variant **GAP-B (inverse)** means tested, but taught only in the summit or inline, with no rung.
- **Ownership:** each gap is filed under the notion where the fix belongs. Bank lines from sister notions are cited there. Techniques that a sister notion teaches properly, and pure pre-bac prerequisites, are skipped.
- **Tally columns:**
  - `entries` = bank exercises / questions read.
  - `named` = distinct bank-required techniques owned by the notion.
  - `demo` = how many of those are worked in a rung.
  - `gaps` = findings below.

---

## arithmetique

**Tally:** 10 entries / 62 questions · 10 named · 7 demonstrated · 2 gaps.

Demonstrated in rungs:
- congruences: R2 (83-162);
- Bézout remontée: 237-267;
- Gauss: 277-327, including the congruence form at 319-325;
- lemme d'Euclide: 353-355;
- diophantine equations: 381-455.

### GAP-A: Inverse modulo n, solving a·x ≡ b [n], systems of congruences
- **Bank:**
  - `arithmetique/bank.yaml:128` q1: "Un inverse de $n$ modulo $2969$ par Bézout … montrer que : $(\exists u \in \mathbb{Z})\ ;\ u \times n \equiv$ …"
  - `:266` q3: "Montrer que : $x^{3} \equiv 10\ [13]$"
  - `:688` q6: "Système $(S)$ modulo $43$ et $47$ … $\begin{cases} x \equiv 11\ [43] \\ x \equiv 10\ [47] \end{cases}$"
  - Also `:654`, `:688-725`, `:1498`, `:1611`, `:1641`.
- **Lesson:**
  - Bézout is worked at 237-267 and Gauss mod n at 319-325.
  - No rung reads a Bézout identity as "u is the inverse of a mod n".
  - No rung solves a·x≡b[n] by multiplying by the inverse.
  - No rung combines two congruences with coprime moduli.
- **Tests:** none. No item or checkpoint stem asks to solve a linear congruence.
- **Minimal fix:** add one worked example at the end of R5.
  1. 7u+26v=1 ⇒ 7·15≡1[26].
  2. So 7x≡3[26] ⇔ x≡45≡19[26].
  3. Then x≡19[26] and x≡2[5] ⇒ one class mod 130 (Gauss).
  4. Add one item on the same shape.

### GAP-B (inverse): Petit théorème de Fermat has no rung
- **Bank:** the Fermat step runs through the arithmetic bank. Examples:
  - `:266` (x³≡10[13] ⇒ powers mod a prime);
  - the entries of `:128` and `:688` (primes 2969, 43, 47).
- **Lesson:**
  - Fermat appears only as the marker `[[checkpoint:cp-r6-fermat]]` at `lesson.md:459`, inside R8 "Pour t'entraîner" (455-471).
  - `exercises.yaml:16-21` says so: "OUTIL HORS-RUNG : la question 1.d mobilise le PETIT THÉORÈME DE FERMAT".
- **Tests:** `AR-28` (`items.yaml:1587`, tags `[fermat, …]`) and `cp-r6-fermat`.
  - Drift: the header at `items.yaml:8-10` still says the model is "déclaré à 0 item" and has no rung. AR-28 contradicts the first half.
- **Minimal fix:**
  1. Add a short worked block to R6 (331-380): statement with p∤a, then compute 3^100 mod 7 by 3^6≡1.
  2. Correct the stale header at `items.yaml:8-10`.

---

## calcul-integral

**Tally:** 4 entries / 22 questions · 12 named · 8 demonstrated · 4 gaps (one already declared by the owner).

Demonstrated in rungs: R1 mechanism (25-75), linearity, Chasles, comparison R4 (189-217), mean, IPP R7 (295-353), areas R8 (359-415), volumes R9 (419-575).

### GAP-A: Primitive of u'/u → ln|u| (and u'/u² → −1/u)
- **Bank:**
  - `fonction-exponentielle/bank.yaml:2810`: "primitive de $2-\dfrac{2e^x}{1+e^x}$ … $x\mapsto 2x-2\ln(1+e^x)$"
  - `fonction-exponentielle/bank.yaml:2478`: "$\int_0^x\dfrac1{1+t}\,dt = \ln(1+x)$ (primitive $u'/u$)"
  - `fonction-logarithme/bank.yaml:2797`: "$\int_0^x \frac{4}{(2+t)^2}\,dt = \left[-\frac{4}{2+t}\right]_0^x$" (the u'/u² form)
  - Also `fonction-logarithme/bank.yaml:4105`, `:4570` (q9a, line 4591), and `:792` (∫2/x, line 800).
- **Lesson:**
  - Only the *derivative* (ln u)' = u'/u is taught, at `fonction-logarithme/lesson.md:173-177`.
  - Neither `calcul-integral/lesson.md` nor `fonction-logarithme/lesson.md` reads it backwards as a primitive.
  - `calcul-integral/lesson.md:609-613` assumes a "Primitives" chapter that "n'existe pas encore dans ce corpus".
  - `fonction-exponentielle/bank.yaml:518-524` routes this to "`calcul-integral`, R1/R2". Those rungs do not cover it.
- **Tests:** none.
- **Minimal fix:**
  1. Add a worked example in `calcul-integral` R1 or R2: ∫₀¹ 2x/(1+x²) dx = ln 2, then ∫₀^x 2e^t/(1+e^t) dt after the rewrite 2/(1+e^t) = 2 − 2e^t/(1+e^t).
  2. Add one item that asks for a primitive of u'/u.

### GAP-A: F(x) = ∫ₐˣ f(t) dt as a function (F' = f, continuity, variations) without an explicit primitive
- **Bank:**
  - `calcul-integral/bank.yaml:1109`: "Montrer que $F$ est continue, strictement croissante sur $[0\,;1]$."
  - Also `fonction-exponentielle/bank.yaml:2184`, `:2305`, and `fonction-logarithme/bank.yaml:1917`, `:4541`.
- **Lesson:** the only instance is ∫₁ˣ dt/t = ln x at `calcul-integral/lesson.md:67-75`, where the primitive is known.
- **Tests:** none of the items asks for F' without a closed-form primitive (CI-10 uses an explicit primitive).
- **Minimal fix:**
  1. Add a worked example: F(x) = ∫₀ˣ e^{−t²} dt, giving F' = e^{−x²} > 0 and F increasing, with no primitive needed.
  2. Add one item on the same shape.

### GAP-A: Change of variable in an integral (the substitution is supplied by the sujet)
- **Bank:**
  - `fonction-exponentielle/bank.yaml:1639`: "Montrer que : $\int_0^{\frac{1}{2}} f(x)\,dx = \int_{\frac{1}{2}}^{1} f(x)\,dx$" (via x ↦ 1−x).
  - Also `:1680`, `:1945`, and `calcul-integral/bank.yaml:1152`, `:1185`.
- **Lesson:** no rung. A grep for "changement de variable" in the lessons, items and checkpoints is empty.
- **Minimal fix:** add one worked example in R3 (Chasles). Under the given t = 1−x, dt = −dx and the bounds swap. Add one item.
- **Priority:** lower than the others, because the sujet always supplies the substitution.

### GAP-A (already declared by owner): Riemann sums and the arctan primitive
- **Bank:**
  - `calcul-integral/bank.yaml:400`: "Calculer l'intégrale : $\displaystyle\int_0^1 \frac{1}{1+x^2}\, dx$"
  - Also `:429`, `:982`, `:1152`, and `fonction-exponentielle/bank.yaml:1705`, `:1973`.
- **Status:** already documented as a bridge ("pontage") and an owner decision at `fonction-exponentielle/bank.yaml:207-224`. It is listed here for completeness only and not ranked.

---

## denombrement

**Tally:** 4 entries / 13 questions · 7 named · 6 demonstrated · 1 gap.

Demonstrated in rungs: multiplicative principle R1, additive principle at R1 (39-53), p-lists, arrangements, permutations, combinations, equiprobability R7 (337-359, multiplicative only). The binomial law is filed under probabilites-conditionnelles.

### GAP-B: Case split with combinations ("même couleur" = Σ C(nᵢ,k)) and "au moins" by complement
- **Bank:**
  - `denombrement/bank.yaml:98` q1: "Montrer que $p(A) = \dfrac{1}{120}$ et $p(B) = \dfrac{7}{40}$"
  - Also `:115`, `:181`, `:206`, `:254`, `:345`.
  - These are same-colour / at-least events on simultaneous draws.
- **Lesson:**
  - The additive principle is stated and worked on a counting example at `denombrement/lesson.md:39-53`.
  - The complement "au moins" is worked in `probabilites-conditionnelles/lesson.md:445-457`.
  - The combined pattern (disjoint colour cases, each a C(nᵢ,k)) is worked only in the summit, `denombrement/exercises.yaml:102-115`.
- **Tests:** none.
- **Minimal fix:** add one item. For example, urn 3R/4V/5B, draw 3 simultaneously: P(same colour) = (C(3,3)+C(4,3)+C(5,3))/C(12,3), with distractors "C(3,3)·C(4,3)·C(5,3)" and "only one colour counted".

---

## derivabilite-etude-fonctions

**Tally:** 1 entry / 20 questions · 11 named · 9 demonstrated · 5 gaps.

Demonstrated in rungs:
- derivative definition: 41-49;
- left/right derivatives: 85-106;
- rules, composition, variations, inflexion;
- oblique asymptote: 351-355;
- réciproque: 389-503.

### GAP-A: Branche parabolique (lim f(x)/x ⇒ direction (Oy), (Ox) or y=ax)
- **Bank:** 10 question sites in 3 banks.
  - `derivabilite-etude-fonctions/bank.yaml:321`: "Montrer que $\displaystyle\lim_{x \to -\infty}\dfrac{f(x)}{x} = -\infty$ et interpréter le résultat géométriquement."
  - `fonction-exponentielle/bank.yaml:995`: "Calculer $\displaystyle\lim_{x \to +\infty} \dfrac{f(x)}{x}$ et interpréter géométriquement le résultat."
  - `fonction-logarithme/bank.yaml:461`: "Montrer que $(C)$ admet au voisinage de $+\infty$ une branche parabolique de direction asymptotique la droite $(\Delta)$ d'équation $y = x$."
  - Also exp `:703`, `:1296`, and log `:681`, `:908`, `:1224`, `:1505`, `:2191`.
- **Lesson:**
  - The "méthode complète" at `derivabilite-etude-fonctions/lesson.md:334-343` lists asymptotes only: "(verticale, horizontale, oblique)" at line 337.
  - A grep for "branche parabolique|direction asymptotique" over all maths lessons hits only `limites-continuite/lesson.md:448`. That line is in the "Pour t'entraîner" summit block.
  - The technique is worked only in summits: `fonction-exponentielle/exercises.yaml:87-94`, `fonction-logarithme/exercises.yaml:100-109`, `limites-continuite/exercises.yaml:75-82`.
- **Tests:** none. A grep for "branche" and "f(x)/x" in all items and checkpoints finds no such stem.
- **Minimal fix:**
  1. Add step 2b to the method at 337: "if lim f = ±∞, compute lim f(x)/x: ∞ ⇒ direction (Oy); 0 ⇒ direction (Ox); a ≠ 0 ⇒ compute lim(f(x)−ax): b ⇒ asymptote y=ax+b, ∞ ⇒ direction y=ax".
  2. Add one worked example: f(x) = x + ln x at +∞ gives direction y=x.
  3. Add one item that distinguishes the three outcomes.

### GAP-B: Asymptote oblique + relative position (worked, never tested)
- **Bank:**
  - `fonction-exponentielle/bank.yaml:1007`: "Montrer que la droite $(\Delta)$ d'équation $y = x$ est asymptote à la courbe $(C)$ au voisinage de $-\infty$."
  - Also exp `:1021`, `:1259`, `:1276`, `:2628`, `:2647`; derivabilite `:289`, `:340`, `:353`; log `:524`.
- **Lesson:** worked at `derivabilite-etude-fonctions/lesson.md:350-355` (f(x) = x + 1/(x−1)).
- **Tests:** none. The only "oblique" item hit is in calcul-integral.
- **Minimal fix:** add one item: prove lim(f(x)−x) = 0, then give the sign of f(x)−x ⇒ position, with a distractor "asymptote because f(x)/x → 1".

### GAP-B: Reciprocal function (bijection onto J, then (f⁻¹)'(b) = 1/f'(a)) — worked, never tested
- **Bank:**
  - `fonction-exponentielle/bank.yaml:1124`: "Montrer que la fonction $f$ admet une fonction réciproque $f^{-1}$ définie sur $\mathbb{R}$."
  - Also exp `:1130`, `:1427`, `:1444`; log `:1025`, `:1308`, `:1323`; calc `:1128`, `:1185`.
- **Lesson:** worked at `derivabilite-etude-fonctions/lesson.md:389-503` (examples at 461-471 and 479-503).
- **Tests:** no item or checkpoint on bijection/J/(f⁻¹)'.
- **Minimal fix:** add one item: f continuous, strictly increasing on I ⇒ bijection onto J = f(I); compute (f⁻¹)'(f(a)). Distractors: 1/f'(b) instead of 1/f'(a), and J = I.

### GAP-B (inverse): Rolle / TAF tested but deliberately not taught
- **Bank:** `fonction-exponentielle/bank.yaml:658`, `:671`, `:2305`; `calcul-integral/bank.yaml:838`; `fonction-logarithme/bank.yaml:3506`.
- **Lesson:**
  - R4 at `derivabilite-etude-fonctions/lesson.md:272` calls it "le théorème des accroissements finis, hors programme ici".
  - The validation note at `lesson.md:542-545` says "sans démonstration par les accroissements finis / le théorème de Rolle — choix délibéré pour rester au niveau bac".
  - `exercises.yaml:21-24` says the summit states each theorem inline.
- **Tests:** `DERIVFCT-23` (`items.yaml:1263`), `DERIVFCT-29` (`:1688`), `cp-bac-rolle` (`checkpoints.yaml:247`), `cp-bac-taf` (`:310`).
- **Minimal fix:** add a short rung R4b with one worked example: statement of Rolle/TAF with their hypotheses, then one application (|sin a − sin b| ≤ |a−b|). This is also the prerequisite of the contraction gap under suites-numeriques.

### GAP-A (minor): Demi-tangente verticale (taux d'accroissement → ±∞)
- **Bank:** `fonction-logarithme/bank.yaml:920`: "Calculer $\displaystyle\lim_{x \to 0^+} \dfrac{f(x)}{x}$ et interpréter géométriquement le résultat." Also `:1540`.
- **Lesson:**
  - Left/right derivatives are worked at 85-106 with finite limits only.
  - A vertical tangent appears only for f⁻¹, at `lesson.md:459` ("si $f'(a)=0$, la tangente à la courbe de $f$ est horizontale…").
- **Tests:** none.
- **Minimal fix:** add one worked example in R1: f(x) = √x at 0⁺ gives taux 1/√x → +∞, so a vertical half-tangent.

---

## equations-differentielles

**Tally:** 1 entry / 2 questions · 3 named · 3 demonstrated · 0 gaps.

The Δ=0 case is now worked at `lesson.md:408-440` ("Exemple travaillé — la racine double ($\Delta = 0$)"), with its items (working tree). The other techniques are covered: y'=ay+b (R2) and the initial condition (R3). Nothing further was found.

---

## fonction-exponentielle

**Tally:** 6 entries / 108 questions · 9 named · 6 demonstrated · 2 gaps.

Other techniques in this bank are filed elsewhere:
- u'/u and F(x) = ∫: calcul-integral;
- contraction and implicit sequences: suites;
- branches paraboliques and reciprocal: derivabilite.

### GAP-A: Equation / inequation quadratic in eˣ via t = eˣ
- **Bank:**
  - `limites-continuite/bank.yaml:234`: "Résoudre dans $\mathbb{R}$ l'équation : $e^{2x} - 4e^x + 3 = 0$"
  - `:241` "$t = e^x \quad (t>0)$"
  - Follow-ups: `:253` (inequation), `:269` (0/0 limit via t).
- **Lesson:** R7 at `fonction-exponentielle/lesson.md:371-415` covers only e^A = e^B, eˣ = 5, and e^A < e^B. No substitution.
- **Tests:** none.
- **Minimal fix:**
  1. Add one worked example in R7: e^{2x} − 3eˣ + 2 = 0 ⇒ t² − 3t + 2 = 0 with t > 0 ⇒ x ∈ {0, ln 2}. Show that a negative root in t is rejected.
  2. Add one item where one root is negative (the distractor keeps it).

### GAP-A: Reference limits (eʰ−1)/h → 1 and ln(1+x)/x → 1, read as a taux d'accroissement
Filed here and shared with fonction-logarithme; the fix is one example per lesson.
- **Bank:**
  - `fonction-logarithme/bank.yaml:3451`, note: "Taux d'accroissement de ln en 1, égal a la dérivée de ln en 1."
  - `:4647`: "$\lim_{x\to0^+}\dfrac{\ln(1+x)}{x} = 1 \quad (\text{dérivée de ln en 1})$"
  - Also `:3425`, `:3631`, and `:2948` (q4c "En déduire que $f$ est dérivable à droite en $0$", lines 2956/2976).
- **Lesson:**
  - The derivative is defined as the limit of the taux at `derivabilite-etude-fonctions/lesson.md:41-49`, but no lesson uses it in reverse to compute a limit.
  - R4 of exp (221-299) and log (203-297) contain neither limit.
- **Tests:** none. A grep over all items and checkpoints is empty.
- **Minimal fix:**
  1. Add one worked example in exp R4: lim_{h→0} (eʰ−1)/h = exp'(0) = 1.
  2. Add the log twin in log R4: ln(1+x)/x → ln'(1) = 1.
  3. Add one item: lim_{x→0} (e^{2x}−1)/x = 2.

---

## fonction-logarithme

**Tally:** 9 entries / 166 questions · 8 named · 6 demonstrated · 1 gap.

Other techniques in this bank are filed elsewhere:
- the taux-limit: fonction-exponentielle;
- u'/u and F(x) = ∫: calcul-integral;
- contraction and implicit sequences: suites;
- branches, reciprocal and demi-tangente: derivabilite.

### GAP-B: Generalised croissances comparées ((ln x)ⁿ/x, xⁿe^{−x}) via the substitution t = √x, t = x/2
- **Bank:**
  - `fonction-logarithme/bank.yaml:449`: "Montrer que pour tout $x$ de $]0,+\infty[$, $\dfrac{(\ln x)^2}{x} = 4\left(\dfrac{\ln\sqrt{x}}{\sqrt{x}}\right)^2$ puis en déduire que …"
  - Also log `:661`, `:1446`, `:1505`; `derivabilite-etude-fonctions/bank.yaml:270`; `fonction-exponentielle/bank.yaml:2071`.
- **Lesson:**
  - Only n=1 is worked: exp 251-285 (eˣ/x, x eˣ) and log 221-281 (ln x/x, x ln x).
  - The √x reduction is worked only in the log summit, `exercises.yaml:86-94`.
- **Tests:** `EXP-31` (`fonction-exponentielle/items.yaml:1751`, tags `[croissances_comparees, forme_indeterminee]`) tests eˣ/x² as a fact, not the reduction.
- **Minimal fix:** add one worked example in log R4: (ln x)²/x = 4(ln √x/√x)² → 0. Add one item asking for the rewrite.

---

## geometrie-espace

**Tally:** 5 entries / 31 questions · 10 named · 9 demonstrated · 1 gap.

Demonstrated in rungs: scalar/vector product, plane and line equations, positions, distances R8 (423-459), sphere ∩ plane nature/radius and sphere ∩ line R9 (463-535).

### GAP-A: Computing H, the orthogonal projection of Ω (centre of the section circle / point of tangency / foot of perpendicular)
- **Bank:** 4 of the 5 entries.
  - `geometrie-espace/bank.yaml:649`: "La droite $(\Delta)$, orthogonale au plan, et son point $H$ … représentation paramétrique…" (then solve for t at `:662`, `:674`)
  - `:553`: "Montrer que le point $H(0,1,-1)$ est le centre du cercle $(\Gamma)$"
  - `:247`: "Montrer que le plan $(ABC)$ est tangent à la sphère $(S)$ au point $A$" (and `:276`)
  - Also `:393`, `:422`.
- **Lesson:**
  - The secant line/plane case is *stated* at `lesson.md:401` ("sécants en un point unique si $\vec{u}\cdot\vec{n}\neq0$").
  - The only worked example (402-408) is the parallel case.
  - The circle centre is *stated* at 501/509 ("Son centre est le projeté orthogonal de $S$ sur $(ABC)$"), but in the example the point is read off a trirectangle configuration, not computed.
- **Tests:**
  - `GE-24` asks only for the position.
  - `GE-30`, `GE-56` and `GE-57` ask only for the nature/radius. GE-57's solution (`items.yaml:3249-3251`) names "le point de contact — projeté orthogonal du centre sur le plan" but never computes it.
- **Minimal fix:**
  1. Add one worked example in R9: Ω(1,2,3), P: x+y+z−3 = 0. Take the line Ω + t·n, substitute into P ⇒ t = −1 ⇒ H(0,1,2). That is the centre of the circle, or the contact point if d = R.
  2. Add one item asking for H's coordinates.

---

## limites-continuite

**Tally:** 2 entries / 10 questions · 5 named · 5 demonstrated · 0 gaps.

- Covered here: factorisation (192-208), conjugué (212-232), terme dominant (234-252), TVI R5 (302-343), trig limits R6 (347-430).
- Encadrement of functions is not here, but it is worked in `fonction-logarithme/lesson.md:239-265`: a sister notion, not a gap.
- The t = eˣ items in this bank are filed under fonction-exponentielle, and branches paraboliques under derivabilite.

---

## nombres-complexes-1

**Tally:** 7 entries / 52 questions · 6 named · 6 demonstrated · 2 gaps (both "worked, never tested").

### GAP-B: Second-degree equations in ℂ (real Δ<0, and complex coefficients with a perfect square)
- **Bank:** about 12 entries across both complex notions.
  - `nombres-complexes-1/bank.yaml:100`: "Résoudre dans l'ensemble $\mathbb{C}$ des nombres complexes l'équation : $z^2 - 2z + 4 = 0$"
  - Also c1 `:507`/`:527`, `:673`, `:1018`.
  - Also c2 `:241`/`:258`, `:414`, `:567`/`:581`, `:698`, `:888`/`:913`, `:1494`, `:1772`/`:1788`, `:1943`/`:1958`.
- **Lesson:** worked at `nombres-complexes-1/lesson.md:333` ("Exemple travaillé 1 — coefficients réels, $\Delta$ négatif") and `:349` ("Exemple travaillé 2 — coefficients complexes : reconnaître un carré parfait"), through 396.
- **Tests:** none. A grep for "discriminant" and "\Delta =" over c1 items and checkpoints is empty.
- **Minimal fix:** add one item and one checkpoint:
  - z² − 2z + 4 = 0 with distractors "no solution", "±i√3 without the 1", and "Δ = −12 ⇒ δ = −2√3i only".
  - One complex-coefficient item where Δ = (a+bi)² must be recognised.

### GAP-B: Somme/produit des racines (Viète) — worked, never tested
- **Bank:** `nombres-complexes-2/bank.yaml:431`: "Vérifier que : $\dfrac{1}{z_1} + \dfrac{1}{z_2} = \dfrac{1}{m}$." Also c2 `:581`, `:721`, `:945`, `:1141`, `:1494`.
- **Lesson:** worked at `nombres-complexes-1/lesson.md:400-470` (examples at 424 and 452).
- **Tests:** none.
- **Minimal fix:** add one item: given z² − (1+i)mz + im² = 0, find z₁+z₂ and z₁z₂ without solving, then 1/z₁ + 1/z₂.

---

## nombres-complexes-2

**Tally:** 10 entries / 79 questions · 7 named · 5 demonstrated · 2 gaps.

Demonstrated in rungs: forms and Moivre, n-th roots, rotation/homothety R5 (269-357, with centre ω = b/(1−a) at 305-325), triangle nature R6 (363-410).

### GAP-A: Euler formulas / factorisation by the half angle (e^{iθ} + 1 = 2cos(θ/2)·e^{iθ/2})
- **Bank:**
  - `nombres-complexes-2/bank.yaml:272`: "On suppose $m = e^{i\theta}$ … Déterminer le module et un argument de $z_1 + z_2$."
  - `:442`: "Dans le cas où $m = 1 + e^{i\frac{\pi}{3}}$, écrire sous la forme algébrique $z_1$ et $z_2$."
  - Also `:505`, `:1154`.
- **Lesson:** no rung. A grep for "euler", "angle moitié" and "θ/2" in `nombres-complexes-2/lesson.md` and `items.yaml` is empty. The technique is worked only in the summit, `exercises.yaml:83-89` ("Angle moitié : $e^{iθ/2}+e^{−iθ/2}$ = 2cos(θ/2)").
- **Tests:** none.
- **Minimal fix:**
  1. Add one worked example at the end of R2: 1 + e^{iθ} = e^{iθ/2}(e^{−iθ/2} + e^{iθ/2}) = 2cos(θ/2)e^{iθ/2}. So the modulus is 2cos(θ/2) and the argument θ/2 when θ ∈ ]0, π[; state the sign condition.
  2. Add one item whose distractor takes the argument θ when cos(θ/2) < 0.

### GAP-A (minor): Cocyclicity via a cross-ratio argument
- **Bank:** `:1054`: "En déduire que les points $M_1, M_2, M_3$ et $M_4$ sont cocycliques si et seulement si $k = -2$". This is a single site.
- **Lesson / tests:** none; R6 (363-410) treats triangles and alignment only.
- **Minimal fix:** one worked example in R6: A, B, C, D cocyclic ⇔ ((d−a)/(c−a)) / ((d−b)/(c−b)) ∈ ℝ*. Low priority.

---

## probabilites-conditionnelles

**Tally:** 1 entry / 6 questions · 6 named · 6 demonstrated · 1 gap.

### GAP-B: Law of a random variable and the binomial law — worked, never tested
- **Bank:**
  - `probabilites-conditionnelles/bank.yaml:143`: "Donner la loi de probabilité de $X$."
  - `denombrement/bank.yaml:366`: "Répétition avec remise : une loi binomiale … la variable aléatoire $X$" (and `:379`).
- **Lesson:** "Variable aléatoire" is worked at 394-482. "La loi binomiale" is worked at 483-575, with the formula at 511-535 and the example at 547.
- **Tests:**
  - 0 hits for "espérance" or "loi de probabilit" in `items.yaml` and `checkpoints.yaml`, and 0 binomial items.
  - `items.yaml:1658-1668` explains that the R6/R7 counts are Bayes items, not VA or binomial items.
- **Minimal fix:** add two items:
  - one loi-of-X table from a two-stage tree;
  - one P(X=k) = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ with n=3, with distractors "C(n,k) missing" and "exponents swapped".

---

## structures-algebriques

**Tally:** 9 entries / 82 questions · 9 named · 7 demonstrated · 3 gaps.

Demonstrated in rungs:
- LCI and properties on tables: R2 (69-162);
- groups, and subgroup: 229-322, with the M₂ example at 271-290 and (ℝ*, ×) at 292-302;
- abelian group and ring;
- intègre by zero-divisor: 401-476;
- corps: R6 (480-521).

### GAP-B: Transport de structure by an isomorphism (group, then ring/field with two laws) — stated, never worked
- **Bank:** 8 of the 9 entries.
  - `structures-algebriques/bank.yaml:451`: "Soit $\varphi$ l'application de $E$ vers $F$ qui à tout nombre complexe $x+yi$ de $E$ fait correspondre la matrice $M(x^2,y)$ …"
  - `:1601`: "Un isomorphisme $\varphi$ vers $G$ … $\varphi(x + y\sqrt{3}) = M(x,y)$."
  - Also `:471`, `:589`/`:606`, `:1350`/`:1380`, `:1601-1654`, `:1773`/`:1812`, `:1948-2000`, `:2164-2205`, `:2288-2305`.
- **Lesson:**
  - Stated at `lesson.md:529-535`, for a *group* only: "si $(E, \star)$ est déjà connu comme groupe commutatif, alors…".
  - Nothing is worked; the next line is `[[checkpoint:cp-r7-morphisme]]` at 537.
  - The two-law case (ring or field transported) appears nowhere outside the summit.
- **Tests:** only `cp-r7-morphisme`.
- **Minimal fix:**
  1. Add one worked example in R7: φ: (ℂ*, ×) → (E, ·) with φ(x+iy) = matrix. Prove φ(zz') = φ(z)φ(z') and bijectivity ⇒ (E, ·) is an abelian group.
  2. Add one line for the two-law extension: φ also additive ⇒ (E, +, ·) is a field.
  3. Add one item whose distractor says "morphism ⇒ structure transported" without bijectivity.

### GAP-B: A law defined by a formula (symbolic associativity, neutral by identification, symmetric by solving)
- **Bank:**
  - `:340`: "Montrer que la loi $\ast$ est associative sur $\mathbb{C}$"
  - Also `:356`, `:372`, `:889`, `:908`, `:921`, `:1107`, `:1229`, `:1832-1885`, `:2146`.
- **Lesson:**
  - R2 (69-162) shows every property on finite tables (Z/4Z), plus a (ℝ*, ÷) counterexample at 97-103.
  - No worked symbolic proof: no x∗y = x+y−xy, no associativity expansion, no neutral found by solving x∗e = x.
- **Tests:** `SA-13` (`items.yaml:685`, with a symbolic proof in its explanation), `SA-23` (`:1261`), `SA-24` (`:1312`).
- **Minimal fix:** add one worked example in R2: x∗y = x + y + xy on ℝ∖{−1}. Show commutativity, expand associativity, e = 0, and x' = −x/(1+x).

### GAP-A (minor): Integrality of a matrix ring (Voie 2)
- **Bank:** `:788`: "En déduire que l'anneau $(E,+,\times)$ est intègre."
- **Lesson:**
  - The method is described at `lesson.md:448` ("Voie 2 — quand l'héritage ne joue pas. C'est le cas d'un ensemble de matrices…") but not worked.
  - Only the non-integrality of M₂ is shown, at 434-438.
- **Tests:** none.
- **Minimal fix:** in the bank, this follows directly from a transported field structure. Fixing the transport gap above with a field example covers it; otherwise add one worked Voie 2 computation.

---

## suites-numeriques

**Tally:** 4 entries / 35 questions · 11 named · 8 demonstrated · 4 gaps.

Demonstrated in rungs: induction, arithmetic/geometric sequences, bounds, gendarmes (321-347), monotone limit R7 (357-389), fixed point R8 (393-460), homographic sequences (464-603), adjacent sequences R9 (607-648).

### GAP-A: The contraction pattern — |f'| ≤ k ⇒ |u_{n+1}−α| ≤ k|u_n−α| ⇒ |u_n−α| ≤ kⁿc ⇒ limit (plus the geometric majoration u_{n+1} ≤ q·u_n ⇒ u_n ≤ u₀qⁿ)
- **Bank:** 7 entries across 3 banks.
  - `suites-numeriques/bank.yaml:711`: "Contraction et convergence vers alpha … Montrer que : $(\forall n \in \mathbb{N})\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{2}|u_n - \alpha|$"
  - `fonction-exponentielle/bank.yaml:1864` and `fonction-logarithme/bank.yaml:3224`: same statement, word for word.
  - `suites-numeriques/bank.yaml:281`: "Montrer que … $0 < u_{n+1} \le \dfrac{2}{5}u_n$, puis en déduire que … $0 < u_n \le \dfrac{3}{2}\left(\dfrac{2}{5}\right)^n$"
  - `:435`: "Montrer que … $0 < u_n \le \left(\dfrac{1}{2}\right)^{n+1}$ ; puis calculer la limite".
  - Also `suites-numeriques/bank.yaml:711-750`, `fonction-exponentielle/bank.yaml:1864-1904`, `fonction-logarithme/bank.yaml:3224-3300`, `:3871-3944`, `:4455-4513`.
- **Lesson:**
  - Nowhere. "accroissements finis" / "inégalité des accroissements" does not occur in any maths rung, item or checkpoint used as a tool.
  - The only hits are `derivabilite-etude-fonctions/lesson.md:272` ("hors programme ici"), its summit and validation note (509-545), and the Rolle/TAF items.
  - Gendarmes (321-347) is taught, but never fed by a kⁿ bound.
- **Tests:** none.
- **Minimal fix:**
  1. Add one worked example after R8: u_{n+1} = f(u_n) with |f'| ≤ 1/2 on I. By IAF, |u_{n+1}−α| ≤ ½|u_n−α|; by induction, |u_n−α| ≤ (½)ⁿ|u₀−α|; then gendarmes.
  2. Add one item. This needs the Rolle/TAF rung under derivabilite (or an inline statement of the IAF).

### GAP-A: Implicit sequences f_n(x_n) = 0 (existence by TVI, monotonicity via the sign of f_{n+1}(x_n), limit)
- **Bank:**
  - `suites-numeriques/bank.yaml:762`: "Existence et encadrement de x_n (n supérieur ou égal à 2)", through 898.
  - `fonction-exponentielle/bank.yaml:2370`: "Existence, unicité de a_n et une identité logarithmique", through 2563.
  - `fonction-logarithme/bank.yaml:1765-1892`, `:2376-2592`.
- **Lesson:** none. TVI is worked at `limites-continuite/lesson.md:302-343`, but never for a family f_n. No sequence rung defines a term implicitly.
- **Tests:** none.
- **Minimal fix:**
  1. Add one worked example: f_n(x) = xⁿ + x − 1 on [0,1]. Then:
     - TVI ⇒ a unique x_n;
     - f_{n+1}(x_n) = x_n^{n+1} − x_nⁿ < 0 ⇒ x_n < x_{n+1};
     - monotone and bounded ⇒ convergent.
  2. Add one item on the monotonicity step.

### GAP-B: Homographic sequences / inverse or ratio auxiliary sequence — worked, never tested
- **Bank:** `suites-numeriques/bank.yaml:314`: "On considère la suite numérique $(v_n)$ définie par $v_n = \dfrac{4u_n}{2u_n + 3}$", plus `:464`, `:572`.
- **Lesson:** worked at `suites-numeriques/lesson.md:464-603`.
- **Tests:** none.
- **Minimal fix:** add one item: show v_n is geometric, and express u_n from v_n (the inversion step is the classic error).

### GAP-B (minor): Monotonicity by the quotient u_{n+1}/u_n — stated, never worked
- **Lesson:** stated at `suites-numeriques/lesson.md:211-215`, with no worked example.
- **Tests:** `SUITES-18` (`items.yaml:1123`) and `SUITES-35` (`:2252`) test it, so the student is examined on it but never shown.
- **Minimal fix:** add one worked line: u_n = 2ⁿ/n! ⇒ u_{n+1}/u_n = 2/(n+1) ≤ 1 for n ≥ 1.

---

## Not flagged (checked and cleared)

- **Encadrement / gendarmes for functions** in limites-continuite: worked in `fonction-logarithme/lesson.md:239-265` (sister notion).
- **Factorising by t for 0/0**: a direct transfer of R3 factorisation (`limites-continuite/lesson.md:192-208`).
- **Integrating an inequality over [0, x]**: a close variant of calc R4 (189-217).
- **Circle and mediator from a modulus**: covered by the conjugate and modulus rungs, c1 151-266 and R5 474-535.
- **Rotation centre from an image pair**: c2 305-325.
- **Already covered**: IPP, areas, volumes, gendarmes, monotone limit, fixed point, TVI, inflexion, ring integrality by zero-divisor.
- **equations-differentielles Δ=0**: fixed (lesson 408-440).

## Side findings (drift, not gaps)

- `arithmetique/items.yaml:8-10` says the Fermat model is "déclaré à 0 item". `AR-28` (`:1587`) now carries that primary misconception.
- `fonction-exponentielle/bank.yaml:518-524` routes the u'/u primitive to "`calcul-integral`, R1/R2". Those rungs do not teach it (see the calcul-integral gap).
- `calcul-integral/lesson.md:609-613` assumes a `content/maths/primitives/` chapter that "n'existe pas encore". Several GAP-A items above (u'/u, F(x) = ∫, change of variable) fall into that hole.

---

## Ranked top 10 (weight = centrality to the bac × number of bank sites)

| # | Gap | Sev. | Owner (fix goes in) | Bank sites |
|---|---|---|---|---|
| 1 | Second-degree equations in ℂ never tested | B | nombres-complexes-1 | about 12 entries, c1 + c2 |
| 2 | Branche parabolique (lim f(x)/x) never worked outside summits, never tested | A | derivabilite (method at 337) | 10 questions in exp/log/derivabilite |
| 3 | Primitive of u'/u → ln\|u\| (and u'/u²) | A | calcul-integral R1/R2 | 6 questions in exp/log |
| 4 | Contraction / IAF + geometric majoration ⇒ limit | A | suites-numeriques (+ IAF in derivabilite) | 7 entries in suites/exp/log |
| 5 | Transport de structure by isomorphism (group → ring/field) | B | structures-algebriques R7 | 8 of 9 entries |
| 6 | Petit théorème de Fermat: tested, no rung | B-inv | arithmetique R6 | runs through the arithmetic bank |
| 7 | Computing H, the projection of Ω (circle centre / contact point) | A | geometrie-espace R9 | 4 of 5 entries |
| 8 | Reciprocal function (bijection onto J, (f⁻¹)') never tested | B | derivabilite | 9 questions in exp/log/calc |
| 9 | Implicit sequences f_n(x_n) = 0 | A | suites-numeriques | 4 entries in suites/exp/log |
| 10 | Limits (eʰ−1)/h, ln(1+x)/x read as a taux d'accroissement | A | exp R4 + log R4 | 5 questions in the log bank |

**Runners-up:**
- homographic sequences, never tested (B);
- oblique asymptote + position, never tested (B);
- t = eˣ quadratic equations (A);
- F(x) = ∫ₐˣ f without a primitive (A);
- Viète, never tested (B);
- linear congruences / inverse mod n (A);
- half-angle factorisation (A);
- law defined by a formula (B);
- random variable / binomial never tested (B);
- Rolle/TAF with no rung (B-inv).

**Cheapest high-yield fixes:** items only, with no new lesson prose.
- #1, #8, the oblique asymptote, homographic sequences, Viète and the binomial law are all already worked in a rung.
- Each needs one item, reusing existing misconception tags.
