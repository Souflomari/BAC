# Bank-to-lesson gap audit: PC part 1 (12 notions)

Read-only audit, 2026-09-27. Nothing under `content/` or `docs/` was edited.

**Question asked.** Is there a technique or case that a verified exam in `bank.yaml` requires, but that the lesson never works through in an example, or that no item or checkpoint tests? The model case is the maths gap where Δ=0 was stated but never worked.

**Method.** For each notion I read `bank.yaml` in full, including its header SCOPE NOTES, and named the technique each question needs. I then checked each technique against `lesson.md` (grep, then reading the passage), `items.yaml` and `checkpoints.yaml`, and the embedded `exercises.yaml` (r-bac / r-variation). That last file sits in the lesson page and shows a worked correction after the student's attempt, so I count it as "demonstrated", but I say so each time. When a sister notion demonstrates the technique, I say so and do not flag it. I skipped earlier-year prerequisites.

**Severity used.**
- **GAP-A**: the verified exam needs the technique; the lesson (prose and embedded exercises) never demonstrates it, and no item or checkpoint tests it.
- **GAP-B**: either the lesson states it but never works it, or it is worked (sometimes only in r-bac/r-variation) but no item or checkpoint tests it.

Paths below are relative to `/home/user/BAC/content/pc/`. "L" means a line number in the file named.

---

## aspects-energetiques

**Tally:** 2 entries / 7 questions read · 6 techniques named · 4 demonstrated and tested · **2 gaps (2 × GAP-B)**

Not flagged:
- E_m of the torsion pendulum: lesson L431, L451; AE-26.
- J from θ̇_max: the inverse of lesson L455 transfers directly.
- Assigning E_p/E_c curves by their zeros: lesson L363; AE-24.
- E_c at an intermediate θ by conservation: lesson L221 (gravity version); AE-4.

### G1. Work of the restoring (torsion) couple, with its sign: GAP-B, plus a lesson error
- **Bank:** `aspects-energetiques/bank.yaml` L374-393 (bk-2015-r-x4b q4, 0.75 pt). The question asks for "le travail du couple de torsion W_C … de θ = 0 à θ_1"; the answer is W_C = −½Cθ_1² = −4×10⁻⁴ J. The bank names the trap: « Écrire W_C = +½Cθ_1² (oublier le signe moins) ».
- **Lesson:**
  - L405 states the rule correctly: W(M_rappel)_{A→B} = −ΔE_p,torsion.
  - **L397-399 states the opposite:** « le travail du couple de rappel, pour tordre le fil de 0 à θ, est l'aire du triangle … W = ½Cθ² ». That is the work of the operator, not of the restoring couple. The spring version (L283-299) is framed correctly as « travail à fournir contre cette force ». So the torsion paragraph literally gives the trap answer the bank warns about.
  - The only worked computation is `exercises.yaml` L86-95 (r-bac q3, spring, W_AB = 0). It shows no non-zero signed result.
- **Items/checkpoints:** none compute the work of a restoring force or couple (AE-22, AE-25 and cp-r6-tor ask only for E_p).
- **Minimal fix:**
  1. Reword L397 to « le travail qu'il faut **fournir** pour tordre le fil » and add « le couple de rappel, lui, travaille −½Cθ² sur ce trajet ».
  2. Add one item: W_C from 0 to θ_1, with a +½Cθ_1² distractor.

### G2. Reading a number off an energy diagram to deduce C (or k, or J): GAP-B
- **Bank:** two entries need it.
  - bk-2017-n-x4b q2 (L144-167): « lire E_m au sommet … une maille au-dessus du 14 imprimé », then C = 2E_m/θ_m².
  - bk-2015-r-x4b q2 (L320-345): E_m = 1.6 mJ read at the summit of (a), then C.
- **Lesson:** L359-365 describes the diagrams qualitatively. L451 computes E_m forward from a known C. No worked example reads a value on an E(x) or E(θ) graph.
- **Items:** AE-24 (items.yaml L1248) is qualitative only.
- **Minimal fix:** one item or checkpoint with a numeric E_c(θ) graph: read the summit and zeros, give C (distractor: reading the last labelled gridline).

---

## chute-mouvements-plans

**Tally:** 19 entries / 88 questions read · 29 techniques named · 22 demonstrated or covered (including cross-notion and close variants) · **7 gaps (2 × GAP-A, 5 × GAP-B)**

Not flagged:
- ED with linear friction, v_ℓ by setting a = 0, and k from τ: lesson L476-494; CMP-26.
- Euler forward: lesson L552-567; CMP-28/29/30, cp-euler.
- Projectile equations and trajectory: L121-189; CMP-12/14/16.
- Range and apex: L208-262; CMP-17/22.
- Launch from a height y₀ ≠ 0: close variant of L47.
- Constant horizontal friction (2010-n-x4b): Newton projection taught in lois-de-newton R5.
- Satellite v and Kepler → altitude: L603-615, L711-727; CMP-32/34.
- Verifying an exponential solution (2012-n q2): demonstrated in dipole-rl lesson L108-128.
- Euler "in reverse" (2023-n q3c): a linear inversion; near miss only.

### C1. Fall in a liquid with Archimedes' buoyancy: extracting the fluid density: GAP-A (the Archimedes term alone is GAP-B)
- **Bank:** 5 entries. This is the most exam-weighted case in the audit.
  - bk-2018-n-x4 q1 L299 (« A en fonction de g, m, ρ et V ») and q3 L321 (« Trouver … k et … A »).
  - bk-2022-n-x4 q2 L969 (« dv/dt + v/τ = g(1 − ρ_r/ρ_a) ») and q4 L1007 (« masse volumique ρ_r … Calculer sa valeur »).
  - bk-2024-n-x5 q1 L1500, q2c L1532 (« l'accélération a_0 … à t_0 = 0 ») and q3 L1544 (« Déduire … ρ_L »).
  - bk-2012-n-x5 q1 L2233.
  - bk-2010-n-x4c q1 L2582.
- **Lesson:**
  - L496-518 states F_A = ρVg, m dv/dt = mg − F_A − kv and v_ℓ = (mg − F_A)/k. There is no numeric example.
  - Nowhere is it written that the constant term becomes g(1 − ρ_f/ρ_s) = v_ℓ/τ = a_0, or how to get ρ_fluid from it.
  - Worse, L442 (« dv/dt|_{t=0} = g ») and L458/L492 (« la tangente à l'origine (pente g) ») are false once F_A is present, and the Archimedes section never says so. 2024-n q2c is exactly that case (a_0 = 7.0, not 10).
- **Items/checkpoints/exercises:** no item mentions Archimedes. Both r-bac and r-variation explicitly neglect it (`exercises.yaml` L41, L146).
- **Minimal fix:**
  1. Add a worked example at the end of the Archimedes section: from v_ℓ and τ read on a curve, a_0 = v_ℓ/τ = g(1 − ρ_f/ρ_s), then ρ_f.
  2. Add one sentence: « avec Archimède, la pente à l'origine vaut a_0 < g ».
  3. Add one item on a_0 ≠ g.

### C2. τ read with the tangent at the origin (then k = m/τ): GAP-B (worked, never tested)
- **Bank:** 4 entries.
  - bk-2018-n-x4 q2 L314.
  - bk-2022-n-x4 q3a L985 (« Déterminer graphiquement … τ puis … k »).
  - bk-2024-n-x5 q2b L1525.
  - bk-2012-n-x5 q4 L2293.
- **Lesson:** L458 states it; L492 works it, with the reading narrated (« coupe l'asymptote … à t = τ = 0,10 s »).
- **Items/checkpoints:** none. `grep tau` in items.yaml hits only the comment at L1286. r-bac reads v_ℓ, never τ.
- **Minimal fix:** one item: a v(t) curve with its tangent drawn; give τ, then k. Distractor: the 63 % confusion, or reading where the tangent crosses the time axis.

### C3. Quadratic friction (f = αv²): ED, v_ℓ = √(mg/α), α from v_ℓ: GAP-B
- **Bank:** 2 entries here, plus 1 in lois-de-newton.
  - bk-2021-n-x5 q2a-q2d L641-671 (« dv/dt + (α/m)v² = g … V_ℓ … α »).
  - bk-2010-n-x4c q1-q3 L2582-2624 (quadratic friction plus Archimedes, then Euler).
  - lois-de-newton bk-2015-r-x4 q2-1 L1632.
- **Lesson:** stated at L418 and in a parenthesis at L456 (« v_ℓ = √(mg/k) »). Never worked.
- **Items/checkpoints:** none.
- **Minimal fix:** a 4-line worked example (ED → v_ℓ → α from a read v_ℓ) and one item.

### C4. Rebuilding the speed (norm and angle) from components during flight: GAP-B
- **Bank:** 4 entries. The bank itself admits the gap: L871 « il ne recompose jamais explicitement une vitesse en cours de vol », and the header at L130-140.
  - bk-2019-n-x4 q2 L411 (V_C = √(19,02² + 6,18²)).
  - bk-2021-r-x5 q3-1/q3-2/q3-3/q4 L804-864 (g from the slope of v_y(t), tan α = v_y0/v_x0, V_0, then V_E at t_E).
  - bk-2024-r-x5b q4 L1761.
- **Lesson:** decomposition only (L115-117, L127-131). Pythagoras on a vector norm is demonstrated in the sister notion lois-de-newton (L123, L179), but on an acceleration, and never as "t_P from x(t), then v_x, v_y(t_P), then the norm".
- **Items:** none.
- **Minimal fix:** extend the L248 worked example with a speed at x = 40 m (t = 2.0 s, v_y = −4.6, V ≈ 20.5 m/s). Add one item with the "sum of components" distractor.

### C5. Impact point on an inclined plane (parabola ∩ oblique line): GAP-A
- **Bank:** bk-2025-r-x4 q3 L2091, 1 pt (header scope note L154-165): « le point de chute E est l'intersection de la trajectoire … avec la droite du plan incliné ».
- **Lesson:** only the passing caveat at L286 (« qu'on retombe sur un plan incliné, l'angle optimal n'est plus 45° »). No worked example and no item.
- **Minimal fix:** a short worked example in R4 (y_plan = −x tan α; solve for x_E; then OE = x_E/cos α) and one item.

### C6. Solving for v₀ from a given landing point or condition: GAP-B (minor)
- **Bank:**
  - bk-2011-n-x4b q2 L2872 (1 pt): v_D from P(15 ; −5) via the trajectory equation (header scope note L227).
  - bk-2019-n-x4 q3b L440: V_min from CP ≥ 30 m.
- **Lesson:** the trajectory and range formulas are stated (L171, L246). All examples run forward; none isolates v₀.
- **Items:** none.
- **Minimal fix:** one item: "which v₀ lands at x = D?"

### C7. Mass of the central body from (T, r) via Kepler's 3rd law: GAP-B (minor)
- **Bank:**
  - bk-2025-n-x4 q3 L1908: « Calculer … la masse m_T ».
  - bk-2012-r-x4 q6 L3338: « déterminer la masse M_J de Jupiter » (via Io).
- **Lesson:** L681 states that 4π²/GM depends only on the central body. The worked example (L711-727) isolates r, never M. CMP-34 (items L1807) is qualitative.
- **Minimal fix:** one item: M = 4π²r³/(GT²), with the trap of using the wrong body's orbit and the days → seconds conversion.

---

## controle-catalyse

**Tally:** 1 entry / 5 questions read · 5 techniques named · 5 demonstrated or covered · **0 gaps**

The bank entry *is* r-bac (the same 2025-n subject). The two cross-notion techniques are demonstrated in their sister notions:
- t½ reading: suivi-temporel-vitesse/lesson.md L169-183.
- Esterification is quasi-athermic (x_f unchanged by temperature): esterification-hydrolyse/lesson.md L187.

Yield is worked at L70-78. The catalyst leaving K unchanged is at L113-129, cp-r2-catalyseur-equilibre.

---

## decroissance-radioactive

**Tally:** 16 entries / 64 questions read · 18 techniques named · 15 demonstrated or covered · **3 gaps (1 × GAP-A, 2 × GAP-B)**

Not flagged:
- Soddy α/β⁻/β⁺: L84-126; DECRO-3/11/22, cp-r2-soddy.
- t½ from a graph: L242-268; DECRO-34.
- λ = ln2/t½: L244-262; DECRO-24.
- N₀ = a₀/λ: L230-232; DECRO-23/25.
- Time from an activity ratio: L306-324; DECRO-18/20/21.
- n half-lives: L264, L284-296; DECRO-14/15.
- Energy and binding questions: covered by the noyaux-masse-energie lesson.

Near misses, not flagged:
- Mass ↔ number of nuclei (N = m·N_A/M) is used by 4 entries (2021-r q3, 2023-n q4, 2010-n q4, 2012-n q3). It is shown in passing in noyaux-masse-energie/lesson.md L210, and it is a prerequisite.
- The (Z, A) family diagram (2024-r q1-1, 0.25 pt).

### D1. Linearised plot ln N = ln N₀ − λt (λ = −slope): GAP-A
- **Bank:**
  - bk-2021-r-x3 q2-1/q2-2/q2-3 L682-739 (1.25 pt): « Montrer que ln(N) … = ln(N₀) − λ.t … Déterminer … λ ».
  - bk-2015-n-x2b q2 L2098 (1 pt): t½ « par la pente d'un graphe ln(N) = f(t) ».
- **Lesson:** absent. grep for ln(N), ln N and "pente" finds nothing. R5 (L306-322) takes the log only to date a sample.
- **Items/checkpoints/exercises:** none.
- **Minimal fix:** a short "Lire une droite ln N = f(t)" subsection in R4 (take the log, slope = −λ, check with t½) and one item with a ln N graph.

### D2. Disintegrated nuclei or daughter nuclei = N₀ − N(t), including dating from the parent/daughter ratio: GAP-B (stated, worked only in r-bac, never tested)
- **Bank:** 7 entries.
  - bk-2021-n-x3 q5 L602 (« ne dépasse pas 30 % … désintégrés »).
  - bk-2022-n-x2 q5 L865 (« 95 % … se sont désintégrés »).
  - bk-2023-n-x2 q4 L971 (« 90 % … désintégrés »).
  - bk-2024-n-x3 q4 L1062 (« N_d … au bout de deux ans »).
  - bk-2024-r-x3 q2-3 L1233 (« le nombre de noyaux de thallium **formés** »).
  - bk-2025-n-x2 q4 L1368 (N_d between t₁ and t₂).
  - bk-2012-n-x3 q3 L1762 (U-Pb dating: t = (t½/ln2)·ln(1 + N_Pb/N_U)).
- **Lesson:** stated once at L200 (« pas le nombre de noyaux fils produits, qui vaut N₀ − N(t) »). Worked only in `exercises.yaml` L99-104 (r-bac q5). The parent/daughter dating formula appears nowhere.
- **Items/checkpoints:** none separate "remaining" from "disintegrated". DECRO-6/15 are about the remaining fraction only.
- **Minimal fix:**
  1. One item: "90 % disintegrated: when?" with a 0.90-as-remaining distractor.
  2. One worked line in R5: dating from N_fils/N_père, e^{λt} = 1 + N_fils/N_père.

### D3. Number of α and β⁻ emissions in a chain (two conservation equations): GAP-B
- **Bank:**
  - bk-2010-n-x2 q3 L1951 (²³⁸U → ²²²Rn: x α, y β⁻).
  - bk-2012-n-x3 q1 L1727 (²³⁸U → ²⁰⁶Pb + x α + y β⁻).
- **Lesson:** the principle is stated at L69-74 (« retrouver n'importe quel noyau fils ou n'importe quelle particule »). Every worked example is a single emission (L84-126).
- **Items:** DECRO-3/11/22 and cp-r2-soddy are single emissions only.
- **Minimal fix:** one item or checkpoint: ²³⁸U → ²⁰⁶Pb, find x and y.

---

## dipole-rl

**Tally:** 10 entries / 50 questions read · 16 techniques named · 12 demonstrated or covered · **4 gaps (1 × GAP-A, 3 × GAP-B)**

Not flagged:
- ED in i: L80-96; RL-11.
- i(t) and verifying it by substitution: L98-128.
- τ by 63 % or tangent: L194-211; RL-5/13.
- L from τ: r-bac q3; RL-16.
- Energy ½Li²: L278-300; RL-15/17.
- Comparing curves when L changes: RL-20/21.
- τ homogeneity: L182-192.
- LC oscillation (2025-r q8-9): rlc-serie.

Near miss: wiring the acquisition system (2022-r q1, 0.25 pt).

### R1. ED written in u_R(t) instead of i(t): GAP-A
- **Bank:** 4 entries.
  - bk-2022-r-x3 q2 L481 (« du_R/dt + (R+r)/L₀ u_R = ER/L₀ »).
  - bk-2025-r-x3 q1 L959.
  - bk-2017-n-x3b q3 L1439 (rupture form).
  - bk-2013-r-x3 q1 L1820 (« τ du_R/dt + u_R = A », with A to identify).
- **Lesson:** grep "u_R" returns nothing. Only the ED in i (L94) exists.
- **Items/checkpoints:** none. `exercises.yaml` L54-56 uses u_R = Ri only inside the i-equation.
- The step is a one-line substitution, but it is asked verbatim 4 times and the constant A = RE/(R+r) must be identified.
- **Minimal fix:** 4 lines after L96 (i = u_R/R; di/dt = (1/R)du_R/dt; the ED in u_R; plateau = RE/(R+r)) and one item.

### R2. Internal resistance r from the steady-state plateau (I_p or U_R): GAP-B (worked only in r-bac/r-variation, never tested)
- **Bank:** 7 entries.
  - bk-2020-n-x4 q2 L185.
  - bk-2021-r-x4b q4 L335.
  - bk-2022-r-x3 q4 L533.
  - bk-2012-n-x4 q4 L1305.
  - bk-2017-n-x3b q5 L1485.
  - bk-2015-r-x3 q1-2c L1658.
  - bk-2013-r-x3 q3 L1897.
- **Lesson prose:** only forward (L144-156: R₀ and r known, so I_max). The inverse is worked in r-bac q2 and r-variation q2.
- **Items/checkpoints:** none. RL-12 (items L598) runs forward; cp-r2-role-r is qualitative.
- **Minimal fix:** one item: measured I_p, E and R₀; find r. Distractor: r = E/I_p (forgets R₀).

### R3. Current interruption (rupture): continuity at opening, decaying ED, u at 0⁺, τ' of the new loop: GAP-B
- **Bank:**
  - bk-2017-n-x3b q3-q7 L1439-1519 (about 2.5 pt: ED in u_R, τ, r, L from the decaying u_R(t) curve, E_m at t = τ).
  - bk-2025-r-x3 q5-q7 L1070-1111 (0.75 pt: i(0⁺), u_R₁ = 100 V, u_bobine).
- **Lesson:** stated at L237-257 (the ED L di/dt + R'i = 0, i = I_max e^{−t/τ'}, the continuity trap). There is no numeric example and no reading of τ on a decreasing curve.
- **Items:** RL-19 (items L970) covers the spark only, qualitatively. RL-1 and cp-r1-i-continuite cover the closing case.
- **Minimal fix:** a numeric rupture example reusing R = 60 Ω, L = 0.3 H (i(0⁺) = 100 mA, u across the freewheel R' at 0⁺, τ') and one item on i(0⁺) ≠ 0.

### R4. The di/dt = f(i) straight line (L and R + r read separately): GAP-B (minor)
- **Bank:** bk-2024-n-x4 q2a/q2b L781-795 (1 pt).
- **Lesson:** stated at L215-235 with the named trap. No numeric reading.
- **Items:** none.
- **Minimal fix:** one item with a di/dt vs i line (intercept → L, slope → −1/τ).

---

## electrolyse

**Tally:** 9 entries / 31 questions read · 10 techniques named · 10 demonstrated or covered · **0 gaps**

Covered:
- Anode/cathode from polarity or observation: L59-66, R2; items.
- Half-equations and overall equation: L181-189, L237-245; dichlorine item.
- Faraday in both directions: L171-207; Δt-from-m items.
- The "system at equilibrium?" QCM: covered by the item stating the cell « finit, comme une pile, par s'arrêter … ».
- Limiting ion stock (2011-n q3): réactif limitant, taught elsewhere.

Near miss: the gas-volume chain I·Δt → n(gaz) → V = n·V_m (2018-n q4, 2015-n q3) is stated at L251-267 (the scope note in bank L92-101 is stale) but never computed with numbers. Because it mirrors the worked mass chain (L171-185), I treat it as a transferable variant, not a gap.

---

## esterification-hydrolyse

**Tally:** 7 entries / 32 questions read · 15 techniques named · 13 demonstrated or covered · **2 gaps (1 × GAP-A, 1 × GAP-B)**

Not flagged:
- Naming and the semi-developed equation: L41-56; items.
- Characteristics and kinetic factors: R2, R4.
- K for equal amounts: L104-150; items K=9 and K from n_eq.
- Yield: controle-catalyse L62-80 and r-bac.
- Titrating the remaining acid: reactions-acido-basiques R9.
- t½ and volumetric rate: suivi-temporel-vitesse.
- Anhydride substitution: controle-catalyse R1.

### E1. Why heat under reflux (accelerate, with no loss of matter thanks to the condenser): GAP-A
- **Bank:**
  - bk-2017-n-x1c q1 L713 (0.5 pt): « Quel est l'intérêt d'un chauffage à reflux ? ».
  - bk-2015-r-x1b q2-3a L898 (0.5 pt): « Quel est l'interêt du chauffage à reflux, et de l'addition d'acide sulfurique ? ».
- **Lesson:** the term is used at L7 and L177 (and at transformations-deux-sens L7) but never explained in any PC lesson. The condenser, "sans perte de matière" part lives only in bank reasoning.
- **Items:** reflux appears as context, never its purpose.
- May be treated as a practical-lab prerequisite, but the bac asks it directly twice.
- **Minimal fix:** two sentences in R4 at L187 (the condenser sends vapours back) and one item.

### E2. Equilibrium for a non-equimolar mixture, or after adding a reactant (quadratic in x with K): GAP-B (worked, never tested)
- **Bank:**
  - bk-2013-r-x1c q6 L1299 (150/100 mmol; « S'assurer que … x'_éq = 78,5 mmol »).
  - bk-2023-n-x1 q6 L272 (+0.1 mol acid at equilibrium, K = 4, new yield).
- **Lesson:** worked at L207-239 (1.0/2.0 mol → x ≈ 0.845).
- **Items/checkpoints:** every excess item is qualitative. None solves the quadratic.
- **Minimal fix:** one item: n_acid ≠ n_alcool, K = 4; find x_eq. Distractor: the equal-amounts τ = 2/3.

---

## etat-equilibre

**Tally:** 2 entries / 6 questions read · 6 techniques named · 5 demonstrated or covered · **1 gap (GAP-B, low)**

Covered:
- K_A = Q_r,eq, then pK_A, and τ from pH: worked in reactions-acido-basiques/lesson.md L225-243.
- τ from conductivity: the law σ = Σλᵢ[Xᵢ] is given in the statement (a 1ère prerequisite) and worked in r-bac.

### Q1. Literal expression Q_r,eq = Cτ²/(1 − τ) for a weak acid in water: GAP-B
- **Bank:** bk-2015-n-x1 q2 L128-139: « Trouver l'expression du quotient de réaction à l'équilibre … en fonction de C et … τ ». This is also a recurring form in reactions-acido-basiques' bank (its header L471).
- **Lesson:** never in any lesson prose. The lesson's Q_r/K work uses Fe³⁺/SCN⁻. The formula appears only in `exercises.yaml` L78 and L87 (r-bac, which is the same 2015 subject) and in reactions-acido-basiques' `exercises.yaml` L101.
- **Items/checkpoints:** none in either notion.
- **Minimal fix:** one item asking for Q_r,eq in terms of C and τ. Distractors: Cτ², and τ²/(1 − τ) without C.

---

## evolution-spontanee

**Tally:** 1 entry / 3 questions read · 3 techniques named · 3 covered · **0 gaps**

- Q_r,i against K: L99-107; many items.
- Conventional cell diagram: piles/lesson.md L123-135.
- Δt_max = 2[Cu²⁺]VF/I: r-bac (the same subject); piles items L1492-1538 test Q_totale = n(e⁻)_max·F.

---

## lois-de-newton

**Tally:** 7 entries / 36 questions read · 13 techniques named · 10 demonstrated or covered · **3 gaps (2 × GAP-A, 1 × GAP-B)**

Not flagged:
- Second law on an incline, with or without friction: L369-411; cp-r7-projection.
- Timetable and t from a distance: L345-365.
- v² = v₀² + 2ad: r-variation `exercises.yaml` L172-174; item LDN-26 (items L1912).
- N = mg cos α: L395-401.
- Nature of the motion: L157-167.
- Euler: chute-mouvements-plans.

Side note: aspects-energetiques/lesson.md L85-87 says « Tu connais déjà, depuis le chapitre lois de Newton, … v_B² = v_A² + 2ad », but lois-de-newton/lesson.md never states it in prose; only r-variation and LDN-26 do.

### N1. Acceleration from an x = f(t²) graph (slope = a/2): GAP-A
- **Bank:** bk-2022-r-x4 q2 L570 (0.5 pt, and its consequences q3-q4). The bank names « le piège … le plus cher de ce type de question ».
- **Lesson, items, checkpoints, exercises:** absent. The only t² in the lesson is at L353.
- **Minimal fix:** one item with a straight line x vs t²; the answer is a = 2 × slope, with an "a = slope" distractor.

### N2. Acceleration as the slope of a v(t) line: GAP-B
- **Bank:** bk-2019-n-x4 q2 L296; bk-2024-r-x5 q1-2-1 L830. The header scope notes at L78-99 say this is not taught.
- **Lesson prose:** never. Worked only in r-bac q2 (`exercises.yaml` L63).
- **Items:** none.
- **Minimal fix:** one item reading two points on v(t).

### N3. Total contact force of the plane R = √(N² + f²) when friction is present: GAP-A (minor)
- **Bank:** bk-2017-n-x4 q4 L1214 (« l'intensité R de la force exercée par le plan … »; trap: « Répondre R = N en oubliant le frottement »).
- **Lesson:** only N is computed (L395-401). Pythagoras is shown on an acceleration (L179). The idea that "the plane's action = N + f" is never stated.
- **Items:** none.
- **Minimal fix:** one sentence plus one line at the end of R7 (R = √(8.5² + 2.0²) ≈ 8.7 N) and one item.

---

## noyaux-masse-energie

**Tally:** 3 entries / 7 questions read · 7 techniques named · 6 demonstrated or covered · **1 gap (GAP-A)**

Covered:
- Soddy: R4 L196.
- E_lib from a mass-energy diagram and Δm in kg: r-bac (the same 2020 subject).
- E_l as the energy needed to dissociate: L95.
- Stability from E_l/A: L133-137, cp-r3-par-nucleon.
- E_l/A from masses: L99-115; items.

### M1. Energy released from a table of binding energies: E_lib = ΣE_l(products) − ΣE_l(reactants): GAP-A
- **Bank:** 2 entries across 2 notions.
  - noyaux-masse-energie bk-2023-n-x1 q2 L249 (the header scope note at L50-62 says so).
  - decroissance-radioactive bk-2019-n-x2 q3 L285-308 (E_l/A given for Rn and Po; E_lib = (1685.14 + 28.28) − 1707.18).
- **Lesson:** R4 (L178-186) uses only masses (Δm_réaction). The r-bac diagram (`exercises.yaml` L74-78) subtracts rest-energy levels, not binding energies.
- **Items:** all use masses.
- **Minimal fix:** a 3-line corollary after L186 (nucleons are conserved, so only the difference of binding energies survives) plus one item. It can reuse D-T: 28.3 − (2.2 + 8.5) ≈ 17.6 MeV.

---

## ondes-em-modulation

**Tally:** 10 entries / 29 questions read · 11 techniques named · 9 demonstrated or covered · **2 gaps (2 × GAP-B)**

Covered:
- Canonical form from the product: L129-133.
- Reading F and f: OEM-27.
- m from the envelope extremes: L171-175; OEM-26.
- Modulation quality: L153-195; OEM-4/19/23.
- Tuning C or L: L263-289; OEM-17.
- Band limits (C ∝ 1/f²): OEM-18/21.
- Detector criterion T_p ≪ R₀C₀ ≪ T: L219-223; OEM-28.

### W1. The DC-removal stage (series capacitor plus resistor to ground = high-pass that blocks U₀): GAP-B
- **Bank:** 3 entries.
  - bk-2022-r-x3c q1 L439 (« rôle de … la partie 3 »).
  - bk-2010-n-x3b q1 L1116 (« rôle de … l'étage Z »).
  - bk-2012-r-x3b q3/q4 L1613-1687 (roles in demodulation, and matching oscillograms before and after U₀ removal).
- **Lesson:** L225 says « retirer la composante continue U₀ (un simple filtrage qu'on ne détaille pas ici) ». The circuit is never named or drawn.
- **Items:** OEM-14/15/24 cover the diode and C₀ only.
- **Minimal fix:** one sentence plus a figure label at L225 (C in series, R in parallel), and one item: "which stage outputs U₀ + s_m and which outputs s_m?".

### W2. Frequency spectrum (three lines at f_p and f_p ± f_s): GAP-B (low)
- **Bank:** bk-2023-n-x3 q3 L600 (0.5 pt).
- **Lesson:** stated with an example at L109-117.
- **Items/checkpoints:** none. The checkpoints.yaml comment at L40-41 mentions it but no question exists.
- **Minimal fix:** one item placing the three lines.

**Incidental defect (known, not a teaching gap):** the ondes bank header L81-131 records that r-bac and bk-2017-n-x3 publish T_p = 0.5 ms (F_p = 2 kHz), while the scan and the official corrigé give 1.0 ms. It is still open under known-issues K-8, and it sits inside the lesson's own summit exercise.

---

## Overall tally

| Notion | Entries | Questions | Techniques | Gaps (A / B) |
|---|---|---|---|---|
| aspects-energetiques | 2 | 7 | 6 | 2 (0 / 2) |
| chute-mouvements-plans | 19 | 88 | 29 | 7 (2 / 5) |
| controle-catalyse | 1 | 5 | 5 | 0 |
| decroissance-radioactive | 16 | 64 | 18 | 3 (1 / 2) |
| dipole-rl | 10 | 50 | 16 | 4 (1 / 3) |
| electrolyse | 9 | 31 | 10 | 0 |
| esterification-hydrolyse | 7 | 32 | 15 | 2 (1 / 1) |
| etat-equilibre | 2 | 6 | 6 | 1 (0 / 1) |
| evolution-spontanee | 1 | 3 | 3 | 0 |
| lois-de-newton | 7 | 36 | 13 | 3 (2 / 1) |
| noyaux-masse-energie | 3 | 7 | 7 | 1 (1 / 0) |
| ondes-em-modulation | 10 | 29 | 11 | 2 (0 / 2) |
| **Total** | **87** | **358** | **139** | **25 (8 / 17)** |

---

## Top 10, most valuable first

Ranked by centrality to the bac and by how many verified entries need the technique.

1. **C1. Chute: Archimedes and fluid density** (GAP-A). 5 entries, about 6 pt. The lesson's « pente à l'origine = g » is wrong in exactly these subjects.
2. **D2. Décroissance: disintegrated/daughter nuclei = N₀ − N(t)** (GAP-B). 7 entries. Worked only in r-bac; no item separates remaining from disintegrated.
3. **R2. Dipôle RL: r from the steady-state plateau** (GAP-B). 7 entries. Worked only in r-bac/r-variation; no item.
4. **R1. Dipôle RL: the ED in u_R** (GAP-A). 4 entries. It appears in no lesson, item or exercise.
5. **C2. Chute: τ by the tangent at the origin, then k** (GAP-B). 4 entries. Worked at L492, never tested.
6. **D1. Décroissance: the ln N = f(t) line** (GAP-A). 2 entries, 2.25 pt. Completely absent.
7. **C4. Chute: speed and angle rebuilt from components during flight** (GAP-B). 4 entries. The bank itself flags it (L871).
8. **R3. Dipôle RL: current interruption** (GAP-B). 2 entries, about 3.25 pt. Stated at L237-257, never computed.
9. **G1. Aspects énergétiques: sign of the restoring couple's work** (GAP-B). 1 entry, but **lesson L397-399 states the wrong sign**, which is the bank's named trap.
10. **C3. Chute (and Newton): quadratic friction** (GAP-B). 3 entries, about 4 pt. Only a parenthesis at L456.

Next in line, by value:
- W1 (ondes, DC-removal stage, 3 entries)
- M1 (binding-energy route, 2 entries across 2 notions)
- D3 (α/β count in a chain, 2 entries)
- E2 (non-equimolar quadratic, 2 entries)
- E1 (reflux, 2 entries)
- N1 (x vs t², 1 entry, costly trap)
- N2 (slope of v(t), 2 entries)
- G2 (reading an energy diagram, 2 entries)
- C5 (landing on a slope, 1 entry)
- C6, C7, N3, Q1, W2, R4 (minor)

**Pattern worth noting:** several bank.yaml headers already list these as SCOPE NOTES ("ponté au point d'usage"). Some of those notes are now stale because the lesson was fixed:
- chute: Archimedes, now partly in L496-518.
- electrolyse: gas volume, now at L251-267.
- dipole-rl: the di/dt = f(i) line and the rupture, now at L215-257.
- ondes: the spectrum and the demodulation criterion, now at L109-117 and L219-223.

Even where the prose was added, the matching items were never added, which is why several findings above are GAP-B ("stated or worked, never tested").
