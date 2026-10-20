# bac-fidelity review — PC exam-debt waves D and E (checkout /home/user/BAC, HEAD 9c210130)

Scope read: `docs/cadre/curriculum/pc-physique-chimie.yaml` (binding boundary), the 37 new items, the 14 new prose passages, the 6 new SVGs, the cited `bank.yaml` entries, and each touched notion's `exercises.yaml`. Every number in keys, distractors, feedback, solutions, prose and figure comments was recomputed. Findings already queued in `DECISIONS-EN-ATTENTE.md` §36 are **not** repeated (listed at the end so you know they were checked).

---

## HEADLINE: no cadre breach. Zero `exclusion` breaches, zero `limite` overshoots.

All five boundary questions in the brief resolve **in scope**, and I checked each against the printed `savoir_faire` rather than by feel:

| Addition | Verdict | Cadre citation |
|---|---|---|
| manometric $\Delta P\cdot V = xRT$ (`suivi-temporel-vitesse/lesson.md:249-259`) | IN | `suivi_temporel_vitesse` savoir_faire: « Exploiter les courbes d'évolution (…, **pression**, volume) ». Attested by `suivi-temporel-vitesse/bank.yaml` bk-2011-n-x1 q4-q6. The prose immediately forms the ratio that cancels $R$, $T$, $V_{gaz}$ — exactly the bank's own move (`bank.yaml:644`). Does **not** touch the `exclusions` (ordre, Arrhenius, mécanismes). |
| DC-removal stage (`ondes-em-modulation/lesson.md:225`, `media/etage-composante-continue.svg`) | IN | `applications_modulation` limite: « traitement QUALITATIF et fonctionnel : rôle des filtres, étages, spectre. PAS de fonction de transfert, PAS de diagramme de Bode, PAS de conception quantitative de filtre. » The passage names the topology and the blocking property only — **no cut-off frequency, no $1/2\pi RC$, no transfer function.** Clean. |
| diffraction-width ratio in a liquid (`propagation-onde-lumineuse/lesson.md:194-212`, POL-27) | IN | savoir_faire: « Connaître et exploiter $\theta=\lambda/a$ … exploiter des mesures pour vérifier $\theta=\lambda/a$ » + « déterminer l'indice d'un milieu » + TP « déterminer l'indice d'un milieu transparent ». Attested by bk-2023-r-x2 q3 and bk-2025-r-x2 q3a. No interference, no gratings, no polarisation — the three `ondes` exclusions are untouched. |
| energy-diagram readings (AE-40/43/44, `aspects-energetiques/lesson.md:459-477`) | IN, one format exception | `aspects_energetiques` savoir_faire: « exploiter les diagrammes d'énergie » and « TORSION : … diagrammes ». Exception = AE-43, see finding 4. |
| equimolar pH $=(pK_{A1}+pK_{A2})/2$ (`reactions-acido-basiques/lesson.md:459-473`, RAB-48/49/50) | IN | It is a rearrangement of $K_A$ (savoir_faire « Écrire et utiliser $K_A$ »), attested by bk-2023-n-x1 q3. Critically, the notion's scope note was **correctly rewritten** at `reactions-acido-basiques/lesson.md:555` to separate « concevoir à l'avance un mélange tampon » (the cadre exclusion *Henderson-Hasselbalch*) from « retrouver la composition d'un mélange déjà formé ». The new passage is on the second side of that line, and L473 states the validity condition. This is the model of how a scope note should be handled. |

Everything else added by D/E (`R=\sqrt{N^2+f^2}`, `v^2=v_0^2+2a\Delta x`, slope of $x=f(t^2)$, $M$ by Kepler 3, echo $2L=v\Delta t$, emitter between two receivers, $\tau=L(1/V_1-1/V_2)$, pulley+load, $E_{lib}$ by binding energies, reflux, non-equimolar quadratic, $Q_{r,éq}=C\tau^2/(1-\tau)$, the three spectral lines, receiver stage order) maps onto a printed `savoir_faire` and is attested by a verified bank entry. **Arithmetic: I recomputed every key, every distractor, every figure label. All correct** (details in §J).

The remaining findings are therefore *not* boundary violations. Ranked below.

---

## 1. HIGH — two notions' summit exercises are now pre-solved by the prose that precedes them

This is the brief's question (3), and it is the most costly defect in the wave: the summit is the student's "jour J" rehearsal, and in both cases the lesson now walks them through it first.

**1a. `suivi-temporel-vitesse` — the summit is fully rehearsed, same reaction, same answer.**
- New worked example: `content/pc/suivi-temporel-vitesse/lesson.md:201-247`.
- Summit: `content/pc/suivi-temporel-vitesse/exercises.yaml:25-104` (r-bac = the verified 2021 N subject).
- They share: the same reaction (saponification of ethyl ethanoate by soda, ester in excess, $HO^-$ limiting), the same measurement method (conductimetry with a linear $\sigma = \sigma_0 + kx$), the same two questions (q3 « traduire $x_{max}/2$ en condition sur $\sigma$, lire $t_{1/2}$ » ; q4-q5 « $v = \frac{1}{kV}\frac{d\sigma}{dt}$ »), **and the same numerical answer $t_{1/2} = 8$ min**. Only $\sigma_0$ (0,50 vs 0,25), $k$ (−63 vs −160) and $V$ (250 vs 100 mL) differ.
- The file's own design note makes this worse: `exercises.yaml:110-113` says the r-variation was deliberately switched to spectrophotometry « pour que l'élève ne puisse pas recopier r-bac ». The new prose does precisely what that safeguard was built to prevent.
- **Minimal fix:** re-instrument the worked example on a *different* substitute curve or a different reaction — e.g. the ester-hydrolysis conductimetric follow-up, or a pH-metric follow-up — and in any case change the answer off 8 min. The pedagogy (translate the condition on $x$ into a condition on the measured quantity) transfers unchanged.

**1b. `etat-equilibre` — the worked example states verbatim what summit q2 asks, and the repayment rule says no prose was due.**
- New worked example: `content/pc/etat-equilibre/lesson.md:214-234`, heading « l'expression littérale de $Q_{r,eq}$, en fonction de $C$ et $\tau$ seulement », ending on $Q_{r,eq} = \dfrac{C\tau^2}{1-\tau}$.
- Summit q2: `content/pc/etat-equilibre/exercises.yaml:68-79` — « **Trouver l'expression du quotient de réaction à l'équilibre $Q_{r,eq}$ en fonction de la concentration $C$ et du taux d'avancement final $\tau$** », answer $\dfrac{C\tau^2}{1-\tau}$, same generic derivation ($x_f=\tau C$, $[AH]=C(1-\tau)$).
- Q1 in `dette-examen/pc-1.md:303-307` is a **GAP-B**. `DETTE-EXAMEN.md:99-101`: « un trou GAP-B "travaillé mais jamais testé" se paie par un item, **sans prose** ». Wave D added both, and the prose is the collision.
- **Minimal fix:** cut the worked example back to the *literal* construction on a generic $AH$ **without** the numeric application, or move it after the summit; EE-28 alone already pays the debt.

---

## 2. HIGH/MEDIUM — a declared diagnostic id states a physically false fact about the curve it names

`content/pc/aspects-energetiques/items.yaml:121-124`, id `mc.physics.pc_energie.diagramme-largeur-totale-confondue-amplitude`:

> description: « … lit, sur un diagramme d'énergie potentielle ($E_{p,torsion}(\theta)$ **ou** $E_{pe}(x)$), la distance ENTRE **les deux zéros de la parabole** (de $-\theta_m$ à $+\theta_m$, ou de $-X_m$ à $+X_m$) … »
> contradicts_principle: « $\theta_m$ … est l'écart maximal, mesuré depuis l'origine … jusqu'à **un zéro de la parabole** »

$E_{p,torsion}=\frac12C\theta^2$ and $E_{pe}=\frac12kx^2$ each have **exactly one** zero, at the origin. $\pm\theta_m$ / $\pm X_m$ are where the parabola **meets the line $E_m$**, not zeros. The same false description is propagated into three places:
- `items.yaml:2385-2388` (AE-40 choice C) — « l'écart ENTRE les deux zéros de la parabole, $-\theta_m$ à $+\theta_m$ », ambiguous as to which curve, false for $E_p$;
- `items.yaml:2571-2575` (AE-43 choice C) — « les deux zéros de la parabole $E_C(\dot\theta)$ »: $E_C=\frac12J\dot\theta^2$ likewise has one zero;
- `items.yaml:2625-2628` (AE-44 choice B) — « les deux zéros de la parabole, $-X_m$ à $+X_m$ » for $E_{pe}(x)$: false.
- A fourth instance, in AE-43's own `solution`, `items.yaml:2592`: « Au sommet de la parabole $E_C(\dot\theta)$ (là où elle coupe $E_m$) » — an upward parabola's summit is at $\dot\theta=0$, where $E_C=0$.

§36 caught the AE-43 wording only. **The id declaration itself and AE-44 are new**, and the declaration is the one the learner model will surface.
- **Minimal fix:** in the declaration and in all four feedbacks, replace « les deux zéros de la parabole » with « les deux points où la parabole rejoint la droite $E_m$ » (equivalently « les deux zéros de $E_c$ »), and delete « le sommet » from AE-43's solution line.

---

## 3. MEDIUM — three scope notes that wave D itself made false, left uncorrected

`DETTE-EXAMEN.md:100-102` is explicit: « une note de portée contredite par un sujet vérifié se corrige **avant** d'écrire quoi que ce soit ». Wave D wrote the prose and left the notes:

- `content/pc/lois-de-newton/bank.yaml:79-92` — three SCOPE NOTES still assert that reading $a$ on a $v(t)$ line and on an $x=f(t^2)$ line is « n'est montrée **NULLE PART** dans la leçon », with « À remonter à pedagogy-architect : ajouter ce geste … ou l'assumer hors périmètre ». Both gestures now live at `lois-de-newton/lesson.md:367-389`, with the $a/2$ trap named at L385.
- `content/pc/chute-mouvements-plans/bank.yaml:154-163` — « le geste … n'est modélisé **nulle part** pas à pas. Ponté au point d'usage ». Now modelled step by step at `chute-mouvements-plans/lesson.md:294-324`.
- `content/pc/noyaux-masse-energie/bank.yaml:50-62` — « il n'est **jamais dérivé pas à pas** dans lesson.md ». Now derived at `noyaux-masse-energie/lesson.md:190-200`.
- **Also still open, pre-existing, and named by the audit being paid:** `content/pc/propagation-onde-lumineuse/bank.yaml:933-936` — « $E=hc/\lambda$ n'est enseignée par aucun rung de cette leçon ni **d'aucune autre notion du corpus PC actuel** » — false: `atome-mecanique-newton/lesson.md:191` teaches $\Delta E=h\nu$ with `cp-r4-planck` (`dette-examen/pc-2.md:113`, and repeated at pc-2.md:318).
- **Minimal fix:** four comment edits; each note becomes « geste enseigné depuis 2026-09-27 à <fichier>:<rung> » rather than a claim of absence.

---

## 4. MEDIUM — AE-43 builds a diagram the bac never prints (format mismatch)

`content/pc/aspects-energetiques/items.yaml:2540-2551`: « on trace cette fois l'énergie cinétique $E_C$ **en fonction de la vitesse angulaire $\dot\theta$** ».

Every energy diagram in the verified corpus is energy **versus position**: `aspects-energetiques/bank.yaml:209-214` (« l'axe des abscisses de la figure 2 porte θ(rad) »), bank L299 (« en fonction de l'abscisse angulaire $\theta$ … $E_p$ et $E_C$ »), bank L86 (« une maille = 0,2 rad horizontalement »). An $E_C$-vs-$\dot\theta$ plot is not a bac document; it is also a curve of states the oscillator never occupies beyond $\pm\dot\theta_{max}$, which is what makes the "zéros" wording in finding 2 go wrong in the first place. The cadre's savoir_faire is « exploiter **les** diagrammes d'énergie » — i.e. the ones the exam prints.
- **Minimal fix:** re-cast AE-43 on a $E_c(\theta)$ / $E_p(\theta)$ pair (read $E_m$ at $\theta=0$ on $E_c$, read $\theta_m$ at its zeros, then $J$ from a separately given $\dot\theta_{max}$ — the exact shape of bk-2017-n-x4b q2/q3), or drop the graph framing and state $E_m$ and $\dot\theta_{max}$ plainly.

---

## 5. MEDIUM — nine distractors carry a misconception id whose *declared description* does not cover them

Brief question (6). In each case the declaration is the contract, and the tag breaks it. Three of the four authors flagged the stretch themselves in a comment, which is honest but does not fix what the learner model records.

- **`erreur-cinematique-uniforme`** (`lois-de-newton/items.yaml:60-64`, declared as: « Oublier le facteur ½ (ou 2) dans $h=\frac12gt^2$, oublier la racine carrée dans $v=\sqrt{2ad}$, ou traiter un mouvement accéléré comme à vitesse constante »):
  - LDN-39 D (`items.yaml:2980-2989`): reading the abscissa 9 as $t=9$ s when the axis carries $t^2$ — an axis misreading, none of the three.
  - LDN-40 B (`items.yaml:3030-3040`): inverting the order of the subtraction in the numerator only — a sign slip, none of the three.
  - LDN-40 D (`items.yaml:3045-3055`): dividing by $t_2$ instead of $\Delta t$ — none of the three.
  - (LDN-40 A, $v_2/t_2$, is the closest to « comme à vitesse constante » and I would let it stand.)
  - The author names the gap at `items.yaml:2932-2939`: « aucune des 20 misconceptions … ne nomme une pente lue sur un graphe ».
- **`role-normale-mal-compris`** (`lois-de-newton/items.yaml:106-111`): LDN-41 D (`items.yaml:3108-3117`) is « deux vecteurs perpendiculaires additionnés au lieu d'être composés » — a vector-composition error, not a misunderstanding of $\vec N$. Author flags it at L2934-2938.
- **`OND-CALC-1`** (`ondes-mecaniques-periodiques/items.yaml:82-87`, declared as inversions of the fundamental wave relations: $\tau=c/d$, $\lambda=c/T$, déphasage sans $2\pi$, $f=T$, $d/T$): **all three** OMPP-29 distractors (`items.yaml:2053-2086`) are "wrong divisor when a scale bar spans $n$ intervals" — not in the list at all.
- **`signe-et-projection-mal-poses`** (`chute-mouvements-plans/items.yaml:39-50`, declared as $a_y=+g$ / sin↔cos swap / wrong justification of $a_x=0$): CMP-46 A and CMP-46 D (`items.yaml:2726-2764`) are "confused a horizontal projection with the distance along the slope". Author acknowledges at `items.yaml:2678`.
- **Minimal fix (cheapest honest one):** widen the two *declarations* rather than the tags — add to `erreur-cinematique-uniforme` an explicit face « lecture de pente sur un relevé graphique ($x=f(t^2)$, $v=f(t)$) : facteur mal appliqué, axe relu comme $t$, intervalle compté depuis l'origine », and to `OND-CALC-1` a face « cote couvrant $n$ intervalles divisée par le mauvais nombre ». For LDN-41 D and CMP-46 A/D, the declared families genuinely do not stretch; these two want the new ids that §35 question 3 already put to the owner ("deux identifiants manquants en lois de Newton"). Resolve §35 q3 rather than re-tagging.

---

## 6. MEDIUM-LOW — three distractors whose stated model does not produce their number

- **EH-30 choice C** (`esterification-hydrolyse/items.yaml:1742-1750`): feedback says « les deux termes croisés ont été oubliés, comme si ce produit valait $0{,}75-x^2$ ». Dropping the cross terms of $(0{,}50-x)(1{,}50-x)=0{,}75-2x+x^2$ gives $0{,}75+x^2$, and $x^2=4(0{,}75+x^2)$ has **no real root**. The author had to flip the sign to $0{,}75-x^2$ to manufacture $0{,}77$. A student who makes the named error reaches a dead end, not this option. *Fix:* re-word the model as « produit développé en gardant seulement le premier et le dernier terme, avec un signe moins reporté à tort du binôme », or replace C with $x=0{,}50$ mol ($x_{max}$ itself), which is the error `avancement-final-egale-maximal` actually names.
- **OMP-27 choice D** (`ondes-mecaniques-progressives/items.yaml:1956-1967`): $6{,}49\times10^{-9}$ m is $\Delta t/(2v)$. The feedback describes only the inversion, which gives $\Delta t/v = 1{,}30\times10^{-8}$ m. *Fix:* set D to $1{,}3\times10^{-8}$ m, or add « … et le facteur 2 conservé » to the feedback.
- **STV-19 choice D** (`suivi-temporel-vitesse/items.yaml:1081-1090`): «20 min» tagged as reading $t_{1/2}$ off the rate. On the given table the rate falls to half its initial value ($0{,}375$ vs $0{,}75$ kPa/min) over the interval [16, 20], i.e. at $\approx 18$ min. *Fix:* 18 min, or say « vers 20 min » in the feedback.

---

## 7. MEDIUM-LOW — three items tagged to a rung other than the one that teaches them

(§36 already queued CMP-46 in R4 and EE-28 in R3; these three are additional and run the *other* way — the item sits after the prose, so the teaching rung has no gate.)

- **LDN-39 and LDN-40** (`lois-de-newton/items.yaml:2942`, `:3005`) declare `rung: "R7"`. The new prose is in **R6** (`lois-de-newton/lesson.md:367-389`; `## R7` starts at L405). The header comment's justification (`items.yaml:2907-2909`: « c'est le rung où la leçon établit $N=mg\cos\alpha$ (L395-401) ») is true of LDN-41 only, and its own line numbers have shifted. *Fix:* retag LDN-39/40 to R6; refresh the comment.
- **POL-27** (`propagation-onde-lumineuse/items.yaml:1676`) declares `rung: "R6"` (« Pour t'entraîner ») while the new worked example is in **R4** (`lesson.md:194-212`; `## R5` at L216). Nothing in R4 exercises the gesture the audit's A1 was about. *Fix:* R4.
- **OEM-33** (`ondes-em-modulation/items.yaml:2062`) declares `rung: "R3"` (« La condition de bonne modulation ») while the spectrum is taught in **R2** (`lesson.md:109-119`). OEM-32/34 are correctly at R2. *Fix:* R2.

---

## 8. LOW — the degrees→radians torsion id is aimed at the one context the PC bank never poses

Brief question (2). The conversion is a **real** bac gesture — `systemes-oscillants/bank.yaml:511` carries the step « theta0 = 9 degrés converti en radians » for bk-2023-n (pendule pesant, $\theta_0=9°$, $E_{pp}=\frac12mg\ell\theta^2$). But **every torsion angle in the verified corpus is already in radians**: `aspects-energetiques/bank.yaml:165` (0,8 rad), `:293` (0,4 rad), `:348` (0,2 rad), `:209-214` (axis graduated in rad). The new id is declared as torsion-specific (`aspects-energetiques/items.yaml:117-120`: « formules de la torsion ($C=2E_m/\theta_m^2$, $E_{p,torsion}=\frac12C\theta^2$, $M=C\theta$) ») and all three carrier items (AE-40, AE-41, AE-42) are torsion with degrees — while the attested locus, the pendule pesant in R7 of this very notion, is left untested.
- **Minimal fix (cheap):** broaden the id's label/description from « formules de la torsion » to « formules angulaires ($E_{p,torsion}=\frac12C\theta^2$, $E_{pp}\approx\frac12mg\ell\theta^2$) », rename to `angle-degres-non-converti`, and move **one** of the three items (AE-42 is the natural one) to the pendule-pesant case with $\theta_0$ in degrees — which also lands it in R7, where the lesson actually contains a small-oscillation $\theta^2$ formula.

---

## 9. LOW — notation collisions

- **CMP-46** (`chute-mouvements-plans/items.yaml:2721`) uses $\alpha$ for the **incline** angle. The lesson's worked example two rungs of prose earlier deliberately chose $\beta$ for the incline (`lesson.md:298`) precisely because $\alpha$ is the **launch** angle throughout R5 (`lesson.md:276`, `:288`, `:290`, `:330`). The student meets two meanings of $\alpha$ inside one rung. (The bank uses $\alpha$ for the incline, so either convention is defensible — but pick one per notion.) *Fix:* $\beta$ in CMP-46.
- **AE-40 and AE-43** (`aspects-energetiques/items.yaml:2362`, `:2547`) write $E_C$ with a **capital** C in items whose unknown is the torsion constant $C$ (AE-40) or whose sibling items solve for $C$. The lesson writes $E_c$ (`lesson.md:413`, `:431`). *Fix:* $E_c$.
- **`ondes-em-modulation`** now carries two symbol systems for the same pair: the R4 prose and OEM-28 use $F$ / $f$ (`lesson.md:219-223`), the new OEM-32/33/34 use $f_p$ / $f_s$ (matching R2, R3, R5 and the bank). Not introduced by this wave, but the wave widened it. *Fix (out of wave scope, worth a ticket):* normalise R4 onto $f_p$ / $f_s$.

## 10. LOW — miscellaneous

- `aspects-energetiques/lesson.md:475` announces $C \approx 0{,}13$ N·m/rad; `:477` then compares the trap against « $0{,}125$ ». Both are right; the student sees two answers. *Fix:* one value, with the other in parentheses.
- `mc.physics.pc_omp.deux-trajets-un-seul` (`ondes-mecaniques-progressives/items.yaml:68-71`) is a portmanteau covering three physically distinct gestures (echo factor 2; emitter between two receivers; two media on one path). Honestly declared and at floor with 3 items — but a learner-model hit tells you nothing about which gesture failed. Flag for the inventory owner; no action needed in this wave.
- The lesson prints $R = 8{,}314$ J·mol⁻¹·K⁻¹ at `suivi-temporel-vitesse/lesson.md:251`; no verified subject supplies it for this gesture (the ratio cancels it, as the prose then shows). Cosmetic over-reach; deleting the numeric value would make the "you never need it" point sharper.

---

## 11. Cognitive mix against the cadre's habileté ratios — a measurable skew, plus an unmeasurable third

Cadre p.18-19 (`pc-physique-chimie.yaml:18-21`): **Utilisation 50 % / Application expérimentale 15 % / Résolution 35 %.**

**(a) 11 of the 37 new items carry no `habilete` field at all** — LDN-39…41 and AE-37…44. `content/pc/lois-de-newton/items.yaml` and `content/pc/aspects-energetiques/items.yaml` contain **zero** occurrences of `habilete` for any item. Meanwhile in five notions (`suivi-temporel-vitesse`, `propagation-onde-lumineuse`, `ondes-mecaniques-periodiques`, `rotation-axe-fixe`, `etat-equilibre`, and `noyaux-masse-energie`) the **only** item carrying `habilete` is the new wave-D/E one. §35 recorded « habiletés des items neufs posées » for wave C; for D/E it is piecemeal. *Fix:* add `habilete` to the 11, using the value already encoded in their `tags` (AE-37/38/39/42 → résolution, AE-40/43/44 → application_experimentale, AE-41 → utilisation; LDN-39/40 → utilisation, LDN-41 → résolution).

**(b) Measured over the 37 new items** (26 declared + 11 inferred from `tags`): ≈ **24 % utilisation / 26 % application expérimentale / 50 % résolution.** Against 50/15/35 that is résolution over-weighted by ~15 pts, utilisation under-weighted by ~26 pts, application expérimentale over by ~11 pts.

Caveat I want on the record: a debt-repayment wave is *selected* by where the gaps were, and the two audits overwhelmingly named résolution-shaped gestures — so this skew is expected for one wave and is not by itself a defect. The finding is that **nobody is measuring the aggregate.** The cadre ratio is a property of the *bank*, not of a wave, and with waves A–F all pulling the same way the bank's mix should now be re-measured per sous-domaine against `part_examen`. *Fix:* one script pass over all `items.yaml` after (a) is done, reporting U/AE/R per notion against the sous-domaine's `habiletes` block; correct by commissioning *utilisation* items, not by re-labelling.

---

## J. Arithmetic and figure audit — all clear

Recomputed and confirmed correct, including every distractor's reverse-engineered model unless listed in finding 6:

- CMP-46 ($x_E=1{,}00/0{,}02=50$ m; $OE=50/0{,}91=54{,}9$ m; B $=0{,}53/0{,}02=26{,}5$; D $=50\times0{,}91=45{,}5$) · CMP-47 ($\sqrt{9{,}8\times76{,}8/0{,}96}=\sqrt{784}=28$; B $=\sqrt{1568}=39{,}6$; C $=\sqrt{4181{,}3}=64{,}7$; D $=784$) · CMP-48 ($T=1{,}08\times10^5$ s; $M=2{,}02\times10^{22}/0{,}778=2{,}6\times10^{22}$ kg; A/B/C = $4{,}38\times10^{13}$, $3{,}01\times10^{10}$, $3{,}25\times10^{15}$).
- LDN-39 ($27/9=3{,}0$ → $a=6{,}0$; D $=2\times27/81=0{,}67$) · LDN-40 ($12/4=3{,}0$; A $=22/6=3{,}67$; D $=12/6=2{,}0$) · LDN-41 ($N=8{,}036\to8{,}0$; $R=\sqrt{100}=10$; D $=14$). Physics sanity checked: with $\cos\alpha=0{,}82$, $mg\sin\alpha=5{,}6$ N $<f=6{,}0$ N, so the block decelerates — consistent with « glisse », and $\mu=0{,}75>\tan\alpha=0{,}70$ closes it.
- AE-37 ($-1{,}0\times10^{-2}$; A $-2{,}0\times10^{-2}$; C $-5{,}0\times10^{-4}$) · AE-38 ($-4{,}8\times10^{-2}$; A $-4{,}0\times10^{-4}$; D $-9{,}6\times10^{-2}$) · AE-39 ($-4{,}5\times10^{-2}$; D $-3{,}6\times10^{-3}$) · AE-40 ($30°=0{,}5236$ rad; $C=3{,}647\times10^{-2}$; A $1{,}82\times10^{-2}$; C $9{,}12\times10^{-3}$; D $1{,}11\times10^{-5}$) · AE-41 ($9{,}14\times10^{-3}$; A $30$ J; B $1{,}83\times10^{-2}$; C $3{,}05\times10^{-4}$) · AE-42 ($E_m=1{,}097\times10^{-2}$, $\dot\theta=2{,}34$; A $134$; D $5{,}48$) · AE-43 ($1{,}33\times10^{-3}$; B $6{,}67\times10^{-4}$; C $3{,}33\times10^{-4}$) · AE-44 ($4{,}0$; A $2{,}0$; B $1{,}0$; D $5{,}0$).
- NME-19 ($4\times7{,}08=28{,}32$; $3\times=84{,}96$; $92{,}16-84{,}96=7{,}20$ MeV — real triple-alpha ≈ 7,27 MeV; A $70{,}92$; B $-7{,}20$; C $177{,}12$) · lesson corollary D-T: $28{,}3-(2{,}2+8{,}5)=17{,}6$ MeV ✓.
- EH-30 ($3x^2-8x+3=0$, $\Delta=28$, $\sqrt{28}=5{,}2915$, roots $0{,}4514$ and $2{,}2152$; back-substitution gives $K=3{,}998$) · EE-28 and the lesson's $2{,}0\times10^{-4}/0{,}90=2{,}22\times10^{-4}$, and the "10 % plus petit" claim ($2{,}0/2{,}222=0{,}90$) ✓.
- OEM-32/33/34 (595/600/605; 1200, 7; 14 = 2$f_s$) · OMP-27 ($1{,}54\times10^{-2}$ m) · OMP-28 ($(1{,}34-0{,}34)/2=0{,}50$; D $=0{,}84=d-\ell$) · OMP-29 (1,0 ms; 1,2; 0,20) · OMP-30 ($1{,}000-0{,}068=0{,}932$; B $1{,}068$; C $340/4660=0{,}0730$) · OMP-31 (100 ms, 15 m/s; 300; 75; 12,5) · OMP-32 ($3-2=1$ div → 0,5 ms).
- OMPP-29 (1,2/3 = 0,4; 1,2 / 0,6 / 0,3) · POL-27 (1,47; 0,680; 2,161; 1,212) · ROT-29 ($J/r^2=1{,}0$ kg; $19{,}6/3{,}0=6{,}53$; D $=r\cdot mgr/J=19{,}6$) · STV-19 (12,0 → 6,0 at 8 min) · RAB-48 (7,0; 5,0; 4,0; 14,0) · RAB-49 ($2\times6{,}0-3{,}2=8{,}8$; 2,8; 9,2; 15,2) · RAB-50 (6,5; weighted mean $34{,}5/5=6{,}9$).
- Prose: chute R5 ($-9{,}8/392=-0{,}025$; $x_E=30$; $y_E=-22{,}5$ by both routes; $OE=30/0{,}80=37{,}5=\sqrt{30^2+22{,}5^2}$) · lois-de-newton R6 ($2{,}0$ m/s²; $1{,}5\to3{,}0$ m/s²; $R=\sqrt{76{,}25}=8{,}73$; and the $v^2=v_0^2+2a\Delta x$ derivation, $2v_0(v-v_0)+(v-v_0)^2=(v-v_0)(v+v_0)$ ✓) · aspects-énergétiques R6 ($C=0{,}125$, trap $0{,}10$, 20 % error ✓) · propagation R4 ($2{,}10/1{,}40=1{,}50$) · OMP R4 ($6\times0{,}5=3{,}0$ ms, $1{,}02/3{,}0\times10^{-3}=340$; echo $1500\times0{,}080/2=60$ m) · suivi-temporel R4 (σ_f $=0{,}185$; σ(t½) $=0{,}3425$; $\sigma_0/2=0{,}25$ at $t=18$ min by interpolation; $d\sigma/dt=-1{,}67\times10^{-4}$ S·m⁻¹·s⁻¹; $v=1{,}06\times10^{-2}$ mol·m⁻³·s⁻¹; the whole 8-point table now obeys $\sigma=0{,}50-63x$ with $0<x<x_{max}$, so §35's recomputation held) · RAB R7 ($\sqrt{0{,}10}=0{,}3162$, $x=0{,}2403n_0$, $\tau=0{,}240$, pH $=4{,}3$ by both routes).
- **Six new SVGs, every labelled value re-derived:** `chute-mouvements-plans/media/impact-plan-incline.svg` (all points on $y=-0{,}025x^2$ and $y=-0{,}75x$ verified pixel by pixel) · `lois-de-newton/media/droite-x-t2.svg` (P1/P2 on the drawn line; 288 px = 6,0 s², 144 px = 9,0 m) · `aspects-energetiques/media/lecture-diagramme-torsion.svg` ($62{,}5\theta^2$ mJ; grid step 0,5 mJ with printed labels at 1 and 2 only, exactly as the prose requires) · `ondes-em-modulation/media/etage-composante-continue.svg` (same 10 px/V in both panels; ±3 V excursion preserved, mean shifted by exactly $U_0$) · `ondes-mecaniques-progressives/media/oscillogramme-deux-micros.svg` (start-to-start 300 px = 6 div = 3,0 ms; calibration rule exactly 1 div) · `suivi-temporel-vitesse/media/t-demi-sur-sigma.svg` (model $\sigma=0{,}185+0{,}315e^{-t/11{,}02}$ is physically right here — ester in excess makes it pseudo-first-order in $HO^-$; the file itself discloses the 1,9 px offset of the construction point).

No arithmetic error found anywhere in the two waves.

---

## Deliberately not repeated (checked, already in DECISIONS-EN-ATTENTE §36)

The 2,5 mJ / 3,2 mJ mismatch in « le pendule qu'on vient d'étudier » (`aspects-energetiques/lesson.md:461`); the six degrees-conversion items testing a gesture the lesson never shows; AE-43's parabola wording (the *declaration* and AE-44 are new — finding 2); CMP-46 in R4 and EE-28 in R3; OMPP-29 counting the intervals for the student (and shipping with no figure); the surviving refusal-sentence options and guessable $pH=7{,}0$ / implausible planet masses (CMP-48's three distractors are $10^{10}$–$10^{15}$ kg); the un-BROKEN pattern (no new trap makes the student commit before it is named — OMP-32, EH-29, RAB-50, AE-39 C, AE-42 C, AE-43 D all keep long prose options, which also runs against §35 item 4's own ruling); the five stale « Récapitulatif express » blocks (confirmed for `ondes-mecaniques-progressives/lesson.md:287-294` and `suivi-temporel-vitesse/lesson.md:265-270`); the anisotropic frame of `impact-plan-incline.svg` (15 px/m × 10 px/m draws $\beta$ at $26{,}6°$ instead of $36{,}9°$, distorting the very angle whose cosine is the lesson).
