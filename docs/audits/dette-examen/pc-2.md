# Audit banque → leçon — PC, partie 2 (12 notions)

This audit only reads files; nothing under `content/` or `docs/` was changed. All paths are relative to `content/pc/`. `L<n>` means the line number in the file named. A bank reference `bank L<n>` points to the `- id: q…` line of that question in that notion's `bank.yaml`.

**Method.** For each notion I read every bank question (stem and reasoning) and named the technique the specific case needs. I then checked that technique three ways:

- **Lesson.** I read `lesson.md` in full and grepped it for the technique.
- **Embedded exercises.** I read `exercises.yaml` (r-bac / r-variation). These are rendered inside the lesson through `[[exercise:…]]`, so a worked solution there counts as a demonstration. The report says when that is the *only* demonstration.
- **Tests.** I dumped every stem and correct answer in `items.yaml` and `checkpoints.yaml`.

Before flagging anything I also checked the sister notions that own the technique: dipole-rl, decroissance-radioactive, etat-equilibre, aspects-energetiques, atome-mecanique-newton, esterification-hydrolyse and ondes-em-modulation. A technique that a sister notion demonstrates is not flagged. Pure earlier-year prerequisites are skipped.

**Severity key**
- **GAP-A** — a verified exam needs the technique, the lesson (and its exercises) never demonstrate it, and no item or checkpoint tests it.
- **GAP-B** — the lesson states the technique but never works it in an example, **or** it is worked (often only in the embedded exercise) but no item or checkpoint tests it.

---

## 1. ondes-mecaniques-periodiques
**Tally.** 4 entries, 11 techniques, 11 demonstrated, **1 gap (B)**.

The techniques checked were:
- nature (transverse or longitudinal)
- λ from one crest-to-crest interval, and from a cote covering n intervals
- v = λN
- τ = d/v = (d/λ)T
- transport of energy but not matter
- sound is longitudinal
- diffraction keeps f, λ and c
- y_M(t) = y_S(t−τ)
- T and τ read on a y_M(t) recording
- dating a snapshot, t = d/v

**B1 — λ from a scale bar that spans several intervals (λ = L/n).** GAP-B.
- **Bank.** bk-2020-n-x2 q6 (bank L260), « En exploitant la figure ci-contre, déterminer la longueur d'onde λ ». The printed « 1 cm » covers two crest intervals, so λ = 0,5 cm. The entry's sourcing note records 4 verification passes over exactly this reading.
- **Lesson.** Only states that λ is read on a snapshot (lesson L123, L141). There is no worked figure reading.
- **Demonstration.** Only exercises.yaml r-variation q2 (L113-119): « 3λ = 24 cm ».
- **Tests.** OMPP-2 (items L168) gives the spacing as a single λ.
- **Minimal fix.** Add one item: a snapshot where a double arrow « 1,2 cm » covers 3 intervals, with distractors 1,2 cm / 0,6 cm / 0,4 cm.

Checked, not gaps:
- T and τ read on a y_M(t) recording (bk-2022-r-x2, bank L388/L414). The forward version is worked in the sister lesson ondes-mecaniques-progressives L205-213.
- Dating a snapshot (bk-2017-n-x2 q3, bank L608). The front at v·t₁ is worked in ondes-mecaniques-progressives L195 and L213.

## 2. ondes-mecaniques-progressives
**Tally.** 7 entries, 12 techniques, 10 demonstrated (chronophotography counted as a prerequisite; it is tested by OMP-26), **4 gaps (2 A, 2 B)**.

**A1 — Echo / echography: 2L = v·Δt.** GAP-A.
- **Bank.** bk-2011-r-x2 q2 (bank L787, 1 pt), « Déterminer l'épaisseur L de la couche de pétrole », with t₂ − t₁ = 2L/v.
- **Lesson.** Nothing. A grep of every PC `lesson.md`, `items.yaml`, `checkpoints.yaml` and `exercises.yaml` for aller-retour, écho, échograph, sonar, réfléch or 2L/v finds no teaching of it anywhere.
- **Minimal fix.** Add one worked example in R4 after the two-microphone example (a sonar or echo sounder, where the depth is v·Δt/2), plus one item whose distractor is v·Δt, the forgotten factor 2.

**A2 — Emitter placed between the two receivers: τ = (d − 2ℓ)/v.** GAP-A.
- **Bank.** bk-2024-r-x2 q4 (bank L660, 0,75 pt), « Déterminer la valeur de ℓ ». The reasoning names the factor 2 as « toute la difficulté ».
- **Lesson.** R4 L249-255 only covers a source *outside* the pair of microphones. No item covers this case.
- **Minimal fix.** Add one item: the source lies between M₁ and M₂, and the student finds ℓ. Distractors: ℓ = vτ, ℓ = d − vτ.

**B1 — Reading a delay on an oscillogram: number of divisions × horizontal sensitivity.** GAP-B. This finding cuts across notions.
- **Bank, 7 verified entries.**
  - ondes-mecaniques-progressives: bk-2018-n-x2 q2 (bank L194), bk-2022-n-x2 q2 (L398), bk-2024-r-x2 q3 (L641), bk-2011-r-x2 q1-1 (L750).
  - propagation-onde-lumineuse: bk-2015-n-x2 q1 (bank L953, S_H = 0,2 µs/div).
  - rlc-serie: bk-2023-n-x3 q2 (bank L1158, corner scale mark « 0,5 ms » per division) and bk-2025-n-x3 q2 (L1848, time standard « 7×10⁻⁵ s » per division).
- **Lesson.** The two-microphone example (L249-255) gives « Δt = 3,0 ms » already converted. No lesson body among the 12 notions does the conversion: rlc-serie R6 L376-426 reads times on labelled axes.
- **Demonstration.** Only exercises.yaml r-bac q2 (L61-64): « τ = 2 div × 2 ms/div ».
- **Tests.** None of the 12 notions has an item on it; I counted zero matches for `/div`, `par division` or `sensibilit`.
- **Where it is taught.** Only in ondes-em-modulation (lesson L175, items L1551-1593), the last electricity chapter. By programme order (`web/src/lib/curriculum.ts`) that is about 10 chapters after the first exam that needs it.
- **Side finding.** The bank reasoning in bank L198 and L402 says « Même geste qu'au chapitre 5 pour la mesure au double microphone… compté en divisions… sensibilité ». The lesson section it cites contains no division count.
- **Minimal fix.** Rewrite the R4 two-microphone example as an oscillogram: « décalage de 6 divisions, sensibilité 0,5 ms/div → Δt = 3,0 ms ». Add one item whose distractors are the width of a burst, and start-to-end counting.

**B2 (low) — Same distance through two media: τ = L(1/V₁ − 1/V₂).**
- **Bank.** bk-2018-n-x2 q3-q4 (bank L204/L218). This entry *is* the r-bac.
- **Demonstration.** Only exercises.yaml r-bac q3-q4 (L65-90). No item.
- **Minimal fix.** One item (air/water arrival difference).

Checked, not gaps:
- v from the slope of the line d = f(Δt) (bk-2021-r-x2): trivial transfer of v = d/Δt.
- Front radii (bk-2024-n-x2): trivial transfer.
- Dimensional analysis: worked at L126-154; the result is tested in rc-charge by RC-4 and cp-r3-tau.
- Dispersion and diffraction QCM options: covered in the sister ondes-mecaniques-periodiques.

## 3. piles
**Tally.** 6 entries, 12 techniques, 9 demonstrated, **3 gaps (B)**.

The lesson works the Faraday chain in one direction only: I·Δt → n(e⁻) → Δm of the anode (L227-243). The exams also use the other two directions.

**B1 — Maximum operating time from the limiting reagent: Δt_max = z·n·F / I.** GAP-B.
- **Bank.** bk-2021-r-x1b q3 (bank L276, « Déterminer, en heures, la durée nécessaire pour que … l'électrode de nickel disparaisse totalement ») and bk-2011-r-x1b q3 (bank L940, Δt_max fixed by Ni²⁺, a species in solution).
- **Lesson.** Stated only in words: « jusqu'à épuisement du réactif limitant » (L249).
- **Tests.** PILES-24 (items L1474) is qualitative. There is no computation anywhere.
- **Minimal fix.** Add a worked example after L243: Δt_max for the Daniell cell limited by Cu²⁺ in solution, not by the zinc plate. Add one item with the distractor « divide by 2 forgotten ».

**B2 — Charge ↔ change in ion concentration (initial amount ± produced amount).** GAP-B.
- **Bank.** bk-2021-r-x1b q4 (bank L304, final [Ni²⁺], where the produced ions add to the initial ones) and bk-2017-n-x1 q4 (bank L797, q from the drop in [Cu²⁺]).
- **Lesson.** L251 says qualitatively that [Zn²⁺] rises and [Cu²⁺] falls. No calculation.
- **Tests.** PILES-6 is qualitative.
- **Minimal fix.** One item: after Q = 1080 C, compute [Cu²⁺]_f from [Cu²⁺]_i and V. Distractor: forgetting the initial amount.

**B3 (low) — Polarity read from the ammeter (COM terminal plus sign of the display).**
- **Bank.** bk-2024-r-x1 q1 (bank L388).
- **Lesson.** Only the voltmeter version is worked (L121). No item.
- **Minimal fix.** One item: COM on the zinc, display +500 mA; which electrode is positive?

## 4. propagation-onde-lumineuse
**Tally.** 5 entries, 17 techniques, 16 demonstrated (photon energy through the sister notion), **1 own gap (A)**. It also shares the oscilloscope-reading gap (ondes-mecaniques-progressives B1).

**A1 — Ratio of two diffraction experiments, and diffraction inside a liquid (λ → λ₀/n, so L/L′ = n).** GAP-A.
- **Bank.** bk-2023-r-x2 q3 (bank L558, « Montrer que λ_0R = L_R·λ_0j / L_j », with a and D eliminated) and bk-2025-r-x2 q3a (bank L811, « Vérifier que n_L ≃ 1,33 » with λ, a and D unknown; q3b at L860 depends on it).
- **Lesson.** L250 states only that « L grandit quand … la longueur d'onde s'allonge ». Diffraction is never combined with λ = λ₀/n (L166-176). The r-variation puts the liquid only in v and λ (exercises L149-164), not in the diffraction.
- **Tests.** POL-14 is qualitative (θ for red vs blue). No ratio item.
- **Minimal fix.** Add a worked example after L139: the same slit and screen, first in air then immersed in water; show L_eau/L_air = 1/n. Add one item: find n from two measured widths.

Side note, not a gap:
- Photon energy E = hc/λ (bk-2015-n-x2 q3, bank L1004). The reasoning says it is taught by « aucun… d'aucune autre notion de ce corpus ». That is false: atome-mecanique-newton lesson L191 teaches ΔE = h·ν, with checkpoint cp-r4-planck.

## 5. rc-charge
**Tally.** 13 entries, 22 techniques, 16 demonstrated, **6 gaps (2 A, 4 B)**.

**B1 — Setting up the differential equation (ED) and identifying the solution by injection.** GAP-B. This is the most central RC skill, and nothing tests it.
- **Bank.** 11 of the 13 entries (the other two are the constant-current entries under A2). For example: bk-2019-n-x3 q1-q2 (bank L290/L305), bk-2018-n-x3 q1-q2 (L387/L399), bk-2021-n-x4 q1 (L539), bk-2022-n-x1 q1 (L761), bk-2023-r-x3 q1 (L879), bk-2015-n-x3 q2-q3 (L1518/L1534), bk-2011-r-x3 (L1673/L1683), bk-2011-n-x3 q1-q2 (L1821/L1834), bk-2010-n-x3 q3-q4 (L1332/L1349).
- **Lesson.** Worked at L57-73 (the ED) and L110-142 (injection giving τ = RC).
- **Tests.** No item or checkpoint asks for the ED or for A and α.
- **Minimal fix.** One item: which ED does q(t) satisfy? Distractors: wrong sign, 1/RC placed on the derivative. Plus one item identifying A and α.

**A1 — ED written for i(t) or u_R(t), obtained by differentiating the mesh law.** GAP-A.
- **Bank.** bk-2021-r-x4 q2 (bank L641, « Montrer que … i + R₁C di/dt = 0 »; its reasoning says « Le geste qui y mène n'est pas dans les chapitres ») and bk-2024-r-x4 q1 (bank L1028, du_R/dt + u_R/RC = 0).
- **Lesson.** Only the u_C form (and q by substitution). A grep for di/dt or du_R finds nothing in the lesson or its exercises.
- **Minimal fix.** Add three lines after L73: « dériver E = Ri + u_C (E constant) … ». Add one item.

**A2 — Charging at constant current: u_C = I₀t/C, with C read from the slope.** GAP-A.
- **Bank.** bk-2018-n-x3b q2 (bank L476, C_eq = q/u_AB) and bk-2025-n-x1 q1-q2 (bank L1155/L1168, « Exprimer u_C(t) en fonction de I₀, C₀ et t », then « Vérifier que C₀ = 1 µF »).
- **Lesson.** No current source anywhere. A grep for générateur de courant or I_0 finds nothing. RC-10 only refutes a constant-current *model* of the RC charge.
- **Minimal fix.** Add a short worked example: a current generator, q = I₀t, a straight line u_C(t), C = I₀/slope. Add one item.

**B2 — τ read on a DECREASING curve: discharge u_C, i(t) or u_R(t), using the tangent that cuts the time axis, or the 37 % point.** GAP-B.
- **Bank, 5 entries.**
  - bk-2018-n-x3 q3 (bank L411): discharge.
  - bk-2011-r-x3 q1-4 (bank L1711): discharge.
  - bk-2021-r-x4 q4 (bank L693): tangent on i(t); the reasoning's paragraph « Le pont à faire ».
  - bk-2010-n-x3 q7 (bank L1400): i(t).
  - bk-2024-r-x4 q3 (bank L1082): u_R(t).
- **Lesson.** The tangent is stated only for the rising curve: « coupe l'asymptote horizontale u_C = E » (L223-231). The 63 % rule too (L219-221). The discharge section (L305-319) gives no reading method.
- **Tests.** RC-13, RC-14, RC-17 and RC-25 are all rising curves. RC-16 on discharge is qualitative.
- **Mitigation.** The geometric construction on a decaying exponential is worked in decroissance-radioactive L276-278, which comes earlier in the programme, but never on an electrical curve.
- **Minimal fix.** Add one sentence and one numerical reading in L305-319 (tangent to i(t) at 0 meets the t axis at τ; u_C(τ) = 0,37E). Add one item with the distractor « 63 % of the initial value ».

**B3 — The line du_C/dt = f(u_C) (intercepts and slope).** GAP-B.
- **Bank.** bk-2021-n-x4 q2 (bank L554, « montrer que … C = 12 µF »).
- **Lesson.** L245-265 explains the method qualitatively. There is no numerical example and no item.
- **Minimal fix.** One item: intercept 1000 V/s, root 12 V, R = 1 kΩ; find C.

**B4 (low; the ln inversion is shown in a sister notion) — Time to reach a threshold: t_S = τ·ln(E/(E − U_S)).**
- **Bank.** bk-2011-n-x3 q5-q7 (bank L1883/L1900/L1913, 2,25 pt). The reasoning says « aucun chapitre de cette leçon ne manipule le logarithme népérien ».
- **Lesson.** No ln at all. The ln inversion is worked for N(t) in decroissance-radioactive L316-320.
- **Minimal fix.** One item (a timer or flash lamp threshold).

## 6. reactions-acido-basiques
**Tally.** 17 entries, 22 techniques, 18 demonstrated (conductimetric τ and the effect of dilution on τ through the sister etat-equilibre), **4 gaps (2 A, 2 B)**.

**B1 — The core chain « C and pH (or σ) → τ → Q_r,éq = Cτ²/(1−τ) → K_A → pK_A ».** GAP-B. It is the most frequent sequence in the bank, and nothing tests it.
- **Bank, about 10 entries.**
  - bk-2021-n-x1 q5-q7 (bank L417-L437)
  - bk-2022-n-x1 q2-q4 (L948-L968)
  - bk-2021-r-x1 q6/q8/q9 (L641/L690/L710)
  - bk-2017-n-x1b q1-q3 (L2473-L2525)
  - bk-2011-r-x1 q1-2…q1-4 (L2633-L2657)
  - bk-2013-r-x1b q2-q4 (L3079-L3135)
  - bk-2025-r-x1 q2-q3 (L2312/L2331)
  - bk-2019-n-x1 q4-q7 (L187-L214)
  - plus the two base entries under A1 below
- **Lesson.** Worked: K_A from pH at L221-243, τ at L311-323.
- **Tests.** No item or checkpoint in reactions-acido-basiques *or* etat-equilibre computes τ or K_A from a measured pH. RAB-25/26 stop at [HO⁻]; RAB-21 only covers τ ≈ 1 for a strong acid.
- **Minimal fix.** Two items: (a) C = 1,0×10⁻² mol/L and pH = 3,4 → τ (distractor 10^-pH without dividing by C); (b) same data → pK_A (distractor Q_r = τ²C with the (1−τ) forgotten).

**B2 — Tableau d'avancement of the titration at a volume V ≠ V_E, with the titrant limiting before equivalence.** GAP-B. The lesson body even declares this out of scope.
- **What it gives.** [AH]/[A⁻] = (V_E − V)/V, then pK_A = pH + log(ratio); the % of the acid form; x_f from the pH and τ ≈ 1 of the titration reaction; the excess after equivalence; the concentration at equivalence n/(V_A + V_BE).
- **Bank, 8 entries.**
  - bk-2021-n-x1 q8 (bank L447)
  - bk-2022-n-x1 q9 (L1011, « pourcentage de la forme acide »)
  - bk-2024-n-x1 q6-q7 (L1727/L1737, « montrer que [AH]/[A⁻] = V_BE/V_B − 1 »)
  - bk-2023-r-x1b q7-q8 (L1595/L1628)
  - bk-2024-r-x1b q7-q8 (L2006/L2049, x_f = C_A·V_A − 10^-pH·(V_A+V_B), τ ≈ 1)
  - bk-2011-r-x1 q2-2 (L2683)
  - bk-2022-r-x1b q10 (L1260, excess after equivalence)
  - bk-2025-n-x1 q6 (L2150)
- **Lesson.** L488 says « on ne l'utilise pas pour calculer par avance la composition d'un mélange tampon … sort du cadre de cette leçon ». L570 says « Aucun calcul analytique du pH aux points remarquables ». Only the half-equivalence is shown (L608-624).
- **Demonstration.** Only exercises.yaml r-bac q8 (L117-126).
- **Tests.** None; RAB-36 is only the half-equivalence.
- **Minimal fix.** Add a worked example in R10 (tableau at V_B = V_E/4 → ratio 3 → pH = pK_A − 0,48). Add one item on x_max = C·V_versé before equivalence, whose distractor takes the titrated species.

**A1 — Weak base in water: x_f read on [HO⁻] = Ke/[H₃O⁺], τ = [HO⁻]/C, K = Ke/K_A so K_A = Ke/Q_r,éq.** GAP-A.
- **Bank.** bk-2020-n-x1 q6-q9 (bank L305-L333, 2,25 pt) and bk-2022-r-x1b q3-q5 (bank L1157-L1187, « Trouver l'expression de K_A … en fonction de Q_r,éq et K_e »).
- **Lesson.** Every worked τ or K_A is for an acid. A grep for K_e/K_A or basicité finds nothing in the lesson, its exercises or etat-equilibre. The r-variation (base titrated by strong acid) only uses the half-equivalence.
- **Minimal fix.** Add a worked example after L323: NH₃ at 10⁻² mol/L, pH 10,6 → [HO⁻] → τ → Q_r → K_A = Ke/Q_r. Add one item.

**A2 (low) — pH of an equimolar mixture of two couples = (pK_A1 + pK_A2)/2.**
- **Bank.** bk-2023-n-x1 q3 (bank L1377, 0,5 pt). The reasoning says it « dépasse ce qu'établit nommément le chapitre 8 ».
- **Lesson.** Example 2 at L377-406 has the equal amounts but never draws the pH out of them.
- **Minimal fix.** Add one line to example 2 plus one item.

## 7. rlc-serie
**Tally.** 17 entries, 24 techniques, 20 demonstrated. The coil resistance r and R + r are covered by dipole-rl L36-90; the energy-curve period T₀/2 is given by the exam statement. **4 gaps (B)**, plus the shared oscilloscope-reading gap.

**B1 — Energy dissipated between two instants: ΔE = E_t(t₀) − E_t(t₁), using extrema where i = 0, or ½Li² with i taken from u_R/R.** GAP-B. It carries the most bank weight in the notion.
- **Bank, 8 entries.**
  - bk-2021-r-x4c q3 (bank L733)
  - bk-2022-n-x3 q6 (L896)
  - bk-2023-r-x3b q3 (L1331)
  - bk-2024-n-x4 q4 (L1480)
  - bk-2024-r-x4b q4 (L1701, instants that are not extrema)
  - bk-2025-n-x3 q5 (L1882)
  - bk-2013-r-x3b q4 (L2679)
  - bk-2012-n-x4b q5 (L2051)
- **Lesson.** Stated only: « P = Ri² > 0 » (L240) and « L'énergie totale E_C + E_L diminue à chaque oscillation » (L286). Never computed in the lesson or its exercises (exercises L83-88 are qualitative).
- **Tests.** Tested once: RLC-R9-2 (items L1797).
- **Minimal fix.** Add a worked example in R6 after L426: two successive maxima 5,0 V then 3,0 V, C = 3 µF → ΔE = ½C(5² − 3²). Add a second item for non-extremal instants.

**B2 — Energy split at a generic instant in the ideal circuit: E_m(t₁) = E_t − ½C·u_C(t₁)², with u_C(t₁) = U₀cos(2πt₁/T₀).** GAP-B.
- **Bank.** bk-2019-n-x3 q4b (bank L240, cos 216°), bk-2020-n-x4 q2d (L487), bk-2023-n-x3 q3 (L1173, cos 324°).
- **Lesson.** Conservation is stated (L85-95). The numerical example stops at t = 0 and t = T₀/4 (L200-204).
- **Tests.** RLC-M2-2 is also only at T₀/4.
- **Minimal fix.** One item at t = 0,3·T₀.

**B3 — Showing dE_T/dt = −R·i² from the damped ED.** GAP-B.
- **Bank.** bk-2025-n-x3 q4 (bank L1866) and bk-2012-n-x4b q4 (bank L2027). The reasoning says « Le chapitre 4 ÉNONCE … sans le démontrer ».
- **Lesson.** Stated at L240 and L286, never derived. No item.
- **Minimal fix.** Add a three-line derivation after L340.

**B4 (low) — Phase φ of i(t) = I_m·cos(2πt/T₀ + φ) from i(0) and the sign of di/dt.**
- **Bank.** bk-2020-n-x4 q2b (bank L463).
- **Lesson.** « φ … fixée par les conditions initiales » (L170), never worked for RLC. The mechanical analogue is worked in systemes-oscillants L166-174.
- **Minimal fix.** One item.

## 8. rotation-axe-fixe
**Tally.** 3 entries, 10 techniques, 10 demonstrated. The incline decomposition is in lois-de-newton (the lesson L438 says so); θ(t), T₀ and the synchronous pendulum are in systemes-oscillants; the energy diagram is in aspects-energetiques. **1 gap (B)**.

**B1 — Coupled system « load in translation + pulley in rotation »: Newton on the load, the fundamental rotation law (RFD) on the pulley, and a = r·θ̈ to eliminate the tension T.** GAP-B.
- **Bank.** bk-2011-r-x1 q1 (bank L105, 1,5 pt, « En appliquant la deuxième loi de Newton et la R.F.D … montrer que a_G1 = … ») and bk-2024-n-x1 q3 (bank L265, 1 pt). This is the defining bac rotation question.
- **Lesson.** The RFD is worked only with an imposed moment (the merry-go-round, L300-326). The pulley and string appear only in one sentence (L436).
- **Demonstration.** Only exercises.yaml r-bac (L48-114) and r-variation (L137-187).
- **Tests.** No item or checkpoint involves a string tension; ROT-22 imposes F directly.
- **Minimal fix.** Add one item: pulley J, radius r, suspended mass m, released from rest → a. Distractors: J forgotten, and T = mg.

## 9. suivi-temporel-vitesse
**Tally.** 5 entries, 12 techniques, 10 demonstrated (ester hydrolysis and equilibrium K through the sister notions), **1 gap (B, with an A part)**.

**B1 — Working on a SUBSTITUTE curve (σ(t), G(t), ΔP(t)): turn x_max/2 into the measured quantity to read t½, and dx/dt into dσ/dt for the rate.** GAP-B.
- **Bank.**
  - bk-2021-n-x1 q3-q5 (bank L176/L190/L204): σ = 0,25 − 160x and v = −(1/160V₀)·dσ/dt.
  - bk-2011-n-x1 q4-q6 (bank L627/L640/L652, 2,5 pt): x = ΔP·V/RT, x = x_max·ΔP/ΔP_max, t½ at ΔP_max/2.
  - transformations-lentes-rapides bk-2010-n-x1 q3/q5 (bank L296/L368): G = −0,72x + 2,5×10⁻³.
- **Lesson.** Lists the methods qualitatively (conductimetry L47, manometric L49). t½ and v are only worked on x(t) (L101-123, L169-189).
- **Demonstration.** The conductimetric case is worked only in embedded exercises: suivi-temporel-vitesse r-bac (exercises L68-93), and transformations-lentes-rapides r-bac and r-variation (exercises L85-121, L176-204).
- **The A part.** The manometric case (ΔP·V = x·R·T) is demonstrated nowhere; a grep for gaz parfait, PV or ΔP across all PC notions finds nothing.
- **Tests.** No item computes t½ or v from a substitute curve. STV-8/9 are qualitative shapes; transformations-lentes-rapides cp-r5-t-demi is a definition.
- **Minimal fix.** Add one worked example in R4: t½ read on σ(t) through σ(x_max/2). Add one item on the pressure case: x = x_max·ΔP/ΔP_max, so t½ is where ΔP = ΔP_max/2.

## 10. systemes-oscillants
**Tally.** 8 entries, 15 techniques, 15 demonstrated, **0 gaps**.

Checked:
- **Phase from x(0) with the ± ambiguity lifted by the sign of v(0)** (bk-2023-r-x4b q2, bank L672, φ = +π/3). The π/2 variant is worked at L166-174 and tested by SO-12 and SO-42; it transfers.
- **Reading a velocity graph** (bk-2025-n-x4b q2a, bank L897; bk-2025-r-x4b q2b, L1117). The lesson says T₀ is the same for x, ẋ and ẍ (L124), and X_m = |v|/ω₀ is worked at L172.
- **Energy questions** (W = −ΔE_pe, E_pp ≈ ½mgℓθ², θ̇_max, torsion work by the kinetic-energy theorem): aspects-energetiques L319, L505, L445-455, L511-525.

## 11. transformations-deux-sens
**Tally.** 1 entry, 7 techniques, 7 demonstrated (all in sister notions), **0 gaps**.

- **Q_r,éq = K_A1/K_A2 and τ with equal amounts through √K** (bank L197/L221): worked in reactions-acido-basiques R7, L343-357 and L377-406.
- **Reflux, ester equation, yield and shifting the equilibrium** (bank L243-L288): esterification-hydrolyse L152-L267.

## 12. transformations-lentes-rapides
**Tally.** 1 entry, 5 techniques, 5 demonstrated, **0 own gaps**.

- bk-2010-n-x1 is the same subject as its r-bac (exercises L60-121).
- The explanation for G decreasing is tested by cp-r5-conductimetrie and the conductance-nombre-d-ions items (items L1287+).
- The t½ read on G(t) is counted in suivi-temporel-vitesse B1.

---

## Top 10 across these notions (most valuable first)

The weights are how central the technique is to the bac and how many verified bank entries need it.

| # | Notion | Gap | Sev. | Bank entries | Minimal fix |
|---|---|---|---|---|---|
| 1 | reactions-acido-basiques | C and pH → τ → Q_r,éq → pK_A: worked at L221-243 and L311-323, but no item in this notion or etat-equilibre tests it | B | ~10 | 2 items (τ; pK_A) |
| 2 | reactions-acido-basiques | Titration tableau d'avancement at V ≠ V_E (ratio (V_E−V)/V, % acid form, x_f and τ≈1, excess, C at E). The lesson declares it out of scope (L488, L570); worked only in r-bac q8 | B | 8 | worked example in R10 + 1 item |
| 3 | rlc-serie | Energy dissipated between two instants: stated at L240 and L286, never worked; tested once (RLC-R9-2) | B | 8 | worked example in R6 |
| 4 | ondes-mecaniques-progressives (also propagation-onde-lumineuse, rlc-serie) | Oscillogram reading, divisions × sensitivity: no lesson body among the 12 does it, no item; taught only in ondes-em-modulation, about 10 chapters later. Bank reasoning at L198 and L402 attributes it to a lesson section that lacks it | B | 7 | rewrite the R4 two-mic example + 1 item |
| 5 | rc-charge | τ on a decreasing curve (discharge, i(t), u_R(t)): the lesson method covers only rising curves (L223-231); all 4 tangent/63 % items use rising curves | B | 5 | 1 sentence + reading in L305-319, 1 item |
| 6 | rc-charge | Setting up the ED and identifying the solution: worked at L57-73 and L110-142, never tested. The i(t)/u_R(t) forms are not even worked (A) | B + A | 11 (+2) | 2 items + 3-line addition |
| 7 | reactions-acido-basiques | Weak base in water: τ from [HO⁻] and K_A = Ke/Q_r,éq | A | 2 (3,5 pt) | worked NH₃ example + item |
| 8 | rotation-axe-fixe | Coupled load + pulley (Newton + RFD + a = rθ̈): only in the embedded exercises, no item | B | 2 (2,5 pt) | 1 item |
| 9 | rc-charge | Charging at constant current, u_C = I₀t/C, C from the slope | A | 2 | short worked example + item |
| 10 | piles | Faraday chain in the other two directions (Δt_max from the limiting reagent; concentration ↔ charge) | B | 4 | worked Δt_max example + item |

Just below the cut:
- propagation-onde-lumineuse A1, diffraction ratio / diffraction in a liquid (A, 2 entries)
- rlc-serie B2, energy at a generic instant (B, 3 entries)
- suivi-temporel-vitesse B1, substitute curves σ and ΔP (B/A, 3 entries)
- ondes-mecaniques-progressives A1, echo, and A2, emitter between receivers (A, 1 entry each)
- rlc-serie B3, dE/dt = −Ri² (B, 2 entries)
- rc-charge B3, the line du_C/dt = f(u_C) (B, 1 entry)
- reactions-acido-basiques A2, pH = (pK_A1 + pK_A2)/2 (A, 1 entry)
- ondes-mecaniques-periodiques B1, λ over n intervals (B, 1 entry)

## Totals

| | Count |
|---|---|
| Bank entries read | 87 (426 questions) |
| Techniques named | ~153 |
| Gaps | 25 (7 GAP-A, 18 GAP-B, including 5 marked "low"; one of the B findings has an A part) |
| Notions with no gap | systemes-oscillants, transformations-deux-sens, transformations-lentes-rapides |

Two bank reasoning texts make false claims about what the corpus teaches:
- ondes-mecaniques-progressives bank L198 and L402: the division reading they attribute to « chapitre 5 » is not there.
- propagation-onde-lumineuse bank L1015: photon energy is taught in atome-mecanique-newton L191.
