# Pedagogy spec — Oscillations libres dans un circuit RLC série (PC · 2ème Bac)

> **Notion:** Oscillations libres dans un circuit RLC série (free oscillations in a series RLC circuit)
> **Subject / stream:** Physique-Chimie — Sciences Physiques (PC stream / Sciences Expérimentales), 2ème Bac
> **`skills.code` target:** `rlc_serie` *(the cadre chapitre id; do NOT reuse the legacy old-project skill code `pc_rlc_oscillations` — ADR 0011 / mining report §1. supabase-architect reconciles to the live `skills.id` UUID at encode time, step 7.)*
> **`subject_code`:** `physics` *(verbatim `subjects.code` per ADR 0008 §2 — NOT `phys`, NOT `pc`)*
> **Curriculum path:** `domaines → physique → sous_domaines → electricite → chapitres → rlc_serie` (`docs/cadre/curriculum/pc-physique-chimie.yaml`)
> **Pipeline step:** 1 of 7 (`docs/pipeline/pipeline.md`). This spec is the input to content-author (step 2), item-author (step 3), diagram-author, interactive-author.
> **Authored by:** pedagogy-architect (Opus), autonomously.
> **Language policy:** This spec's *meta* is English. **Every student-facing string** — lesson prose, item stems, choices, explanations, hints, and each misconception's `label` / `description` / `contradicts_principle` as stored and shown — **MUST be authored in French.** The French exemplars here are the register and substance the authors copy; they are not English placeholders to be translated.
>
> ---
>
> ## ⚠ VALIDATION STATUS — NOT YET HUMAN-VALIDATED
>
> Per the pedagogy-architect lane (RULES; agent "Working rules"), Phases 1–3 are **human-gated collaboration, not autonomous work.** This spec was produced **autonomously** because the human directed "run the full Phase 1→3 design now" for the first real exercise of the pipeline. It has **not** had the human's domain-judgment pass. The human holds bacs in SMA and Sciences Physiques and knows where PC students actually fail; that knowledge has **not** been applied here yet. The human reviews at the **rendered-notion editorial gate**, not before. Treat every pedagogical claim, every misconception, every difficulty placement, and especially every **scope boundary** below as *proposed*. Items flagged ⚠ are the ones most likely to need the human's correction.

---

## 0. Scope and prerequisite placement

### 0.1 Prerequisite placement (the chain)

The PC électricité strand runs, in cadre chapitre order:
**`dipole_rc` (condensateur, échelon, τ=RC, E_C=½Cu²) → `dipole_rl` (bobine, échelon, τ=L/R, E_L=½Li²) → `rlc_serie` (THIS notion) → `applications_modulation` (circuit bouchon LC, AM).**

This notion sits **after** RC and RL and **before** modulation. It is the synthesis of the two prior dipôles: the condensateur (which stores `E_C=½Cu²` and obeys `i=C·du_C/dt`, i.e. `i=dq/dt`, `q=C·u_C`) and the bobine (which stores `E_L=½Li²` and obeys `u=L·di/dt+r·i`) are now placed in the **same loop with no driving source**, and the energy they each learned to store now **sloshes between them** while R bleeds it off. Everything the student needs from RC/RL is a *prerequisite to assume, not to re-teach.*

The mining report (§1) confirms this chain matches the old project's prereq edges (RC + RL → RLC → modulation) — a useful cross-check that the boundary's placement is right.

### 0.2 What the bac asks here — IN SCOPE (the savoir_faire, bound tightly)

The lesson covers **exactly** these eleven savoir_faire and **does not exceed them** (carried verbatim from `rlc_serie.savoir_faire` via `docs/cadre/validation/rlc-scope-check.md`):

1. **Définir et reconnaître les trois régimes** : périodique, pseudo-périodique, apériodique.
2. **Reconnaître / représenter les courbes `u_C(t)`** pour les trois régimes et les exploiter.
3. **Établir l'équation différentielle** (en `u_C` ou en charge `q`) **dans le cas d'un amortissement NÉGLIGEABLE** et vérifier sa solution.
4. **Connaître et exploiter l'expression de `q(t)`** (cas non amorti) ; **en déduire `i(t)`** et l'exploiter.
5. **Connaître et exploiter l'expression de la période propre `T₀ = 2π√(LC)`.**
6. **Expliquer énergétiquement les trois régimes** ; connaître / exploiter les **diagrammes d'énergie** et l'**énergie totale** du circuit `E = E_C + E_L = ½·q²/C + ½·L·i²`.
7. **Établir l'équation différentielle** (en `u_C` ou en charge) **dans le cas d'un amortissement** (établir SEULEMENT — voir §0.4).
8. **Connaître le rôle du dispositif d'entretien** : compenser l'énergie dissipée par effet Joule.
9. **Établir l'équation différentielle d'un RLC entretenu** par un générateur délivrant `u_G(t) = k·i(t)` (et montrer la condition `k = R` qui rend l'amortissement nul → oscillations sinusoïdales entretenues à `T₀`).
10. **Exploiter des documents expérimentaux** : tensions, régimes, **influence de R / L / C**, **pseudo-période et période propre**.
11. **Proposer un montage d'étude** des oscillations libres ; brancher oscilloscope / système d'acquisition.

### 0.3 Targets to design to (cite into items — `docs/cadre/validation/rlc-scope-check.md` §4)

- **Sous-domaine weight (`electricite.poids.part_examen`): 21 % of the whole exam** (rang physique 2 — the second-heaviest physics sous-domaine, behind mécanique). This notion is high-value; the item bank should be generous and bac-realistic.
- **Habiletés mix (exam-wide ratios, cadre p.18-19), to match in the item set:**
  - **Utilisation des ressources ≈ 50 %** — recognise a regime off a trace, apply `T₀=2π√(LC)`, read energy diagrams, state which element stores what.
  - **Résolution de problème ≈ 35 %** — establish the ODE, the entretien `k=R` condition, multi-step reasoning chains.
  - **Application expérimentale ≈ 15 %** — read a TP / oscilloscope trace: measure the pseudo-période, identify the regime, deduce the effect of changing R.
- item-author balances the 24+ items toward roughly this cognitive mix (≈ half Utilisation, ≈ third Résolution, ≈ sixth Application expérimentale). This is the numeric target for the bac-fidelity check.

### 0.4 HARD scope boundaries — NON-NEGOTIABLE (carried from `rlc_serie.limites` + `electricite.exclusions`)

These are the spine of this notion's correctness. content-author and item-author **must not cross them**; the review gate (§7) bounces any drift.

**LIMITE 1 — The damped case: ESTABLISH the ODE ONLY.**
In the amorti (R non négligeable) case, the lesson **establishes the differential equation** `L·(d²q/dt²) + R·(dq/dt) + q/C = 0` (or the equivalent in `u_C`) **and stops there.** It does **NOT**:
- solve it in closed form;
- give a pseudo-période as a function of R, L, C;
- introduce a damping coefficient (λ, α, facteur de qualité Q) or a logarithmic decrement;
- write a closed-form exponential envelope `e^{−αt}`.
The damped / pseudo-periodic / aperiodic regimes are treated **qualitatively + energetically + experimentally** (reading a TP/oscilloscope trace, recognising the regime from the shape, measuring the pseudo-période *off the graph* rather than computing it).

**LIMITE 2 — Closed-form solution ONLY in the undamped case (LC, R négligeable).**
Only here may the lesson solve the ODE: `q(t) = Q_max·cos(2πt/T₀ + φ)`, `i(t) = dq/dt`, and **`T₀ = 2π√(LC)`**. The undamped case is where all the analytic machinery lives; it is also the bridge into the *entretien* (which restores this sinusoidal regime by compensating Joule loss).

**EXCLUSIONS — DO NOT ENTER (on the `electricite` sous-domaine; apply here):**
- **Régime sinusoïdal forcé / résonance forcée / impédance / déphasage / phaseurs.** The cadre treats *free* oscillations and *entretien*, never the driven regime. ⚠ Do **not** confuse with the **mécanique** résonance (a different sous-domaine, `mecanique/systemes_oscillants`) — that one exists and is taught *there*, qualitatively; it has **nothing** to do with this electrical notion. No résonance language here at all.
- **Notation complexe / phaseurs** for circuits.
- **Puissance en régime alternatif** (puissance active/réactive, facteur de puissance).
- **Composants actifs comme objets d'étude** (transistor, AOP). Only the condensateur and the bobine are studied as dipôles; the entretien generator is treated *functionally* (it delivers `u_G=k·i`), never as a circuit to analyse internally.

**A note on the `entretien` and the boundary:** the entretien is the *one* place a driving element appears — but it is **not** the forced/résonance regime. The generator's job is described as **exactly compensating the Joule loss** (`u_G=k·i` with `k=R` cancels the `R·i` damping term), restoring the *free* sinusoidal regime at the *own* period `T₀`. It is "an undamped oscillator kept undamped," not "a driven oscillator at an imposed frequency." Keep this framing strict — it is the line between in-scope (entretien) and excluded (forced résonance).

### 0.5 A note on the agent-file "expected" misconceptions

The pedagogy-architect agent file predicts for *RLC (PC)*: "energy sloshing between capacitor and inductor while R damps (R damps, it does not drive); solving the ODE; reading pseudo-period / damping regime off a TP trace." All three are dead-centre and are reflected below: **M1** (R drives vs R damps), **M2** (energy used up vs sloshes), **M6** (solving the *damped* ODE in closed form — the boundary-violation misconception the student will *want* to commit), and **M5/M7** (reading the trace; pseudo-période vs période propre). The brief's candidate list ("more R → faster oscillation", "pseudo-période = période propre", "free vs forced") is also folded in (M3, M5, M8). Nothing in the candidate list was cut as out-of-notion; one was promoted because it is *also* a boundary tripwire (M6).

---

## 1. The misconception inventory — the diagnostic spine

Eight misconceptions. Each is a **wrong physical model**, not a slip (ADR 0008 §3 criterion a). Each names the principle it contradicts (criterion b), is distinguishable from the others on at least one stem (criterion c — the `distinguishing_mcq_stem` is that stem), and is grounded in PC didactics + standard Moroccan bac error patterns + the boundary itself (criterion d). These are the *wrong physical models PC students actually hold* — the things that survive a clean presentation of the correct model and must be **surfaced and broken** (VISION: "Physique-Chimie — confront the wrong model").

**Downstream shape contract (mined from migrations 043/044/045 and ADR 0008/0009):** each misconception, when item-author / supabase-architect encode it, carries the canonical DB fields
`{ id, label, description, contradicts_principle, label_ar:null }`
projected into `skills.common_misconceptions`. The seed JSON (`backend/seed/misconceptions/rlc_serie.json`) additionally carries `evidence[]` (≥1 citation) and `distinguishing_mcq_stem{ stem_text, distractor_choice_label, distractor_rationale, correct_choice_label, correct_rationale }`, which stay in the seed file as the audit trail + the input to distractor tagging (not in the DB). **All of `label`, `description`, `contradicts_principle`, and the stem text are French.** The `distractor_choice_label` is a letter A–D; item-author converts to the 0-based string index (`A=0, B=1, C=2, D=3`) for `items.distractor_misconceptions`.

ID format (ADR 0008 §2): `mc.physics.rlc_serie.<short-label>`.

---

### M1 — `mc.physics.rlc_serie.resistance-entretient-oscillations`
**Label (FR, as shown):** « C'est la résistance qui entretient (ou crée) les oscillations »
**The wrong model.** The student thinks R is the *active* element — the thing that "drives," "powers," or "keeps going" the oscillation — because R is the most visible component and, in a DC circuit, R is what current "flows through." So removing R should *stop* the oscillation; adding R should *strengthen* it. The conservative C↔L exchange is invisible to this model; R is mistaken for the engine.
**How it manifests.** Asked "que se passe-t-il si on supprime la résistance (R→0) ?", the student predicts the oscillations *stop* or *weaken*. Asked which element "fournit l'énergie des oscillations," the student answers "la résistance." Confuses R with the entretien generator's role.
**The correct model.** In free oscillations, **no element drives** — the energy was placed once on the condensateur (charge initiale) and then **shuttles back and forth between C and L**. **R only DISSIPATES** (effet Joule, `P=R·i²>0`), removing energy each pass; it never adds any. Take R→0: the oscillation becomes *perfect and undamped* (the LC ideal). Increase R: the oscillation **dies faster** (more damping), eventually not oscillating at all (apériodique). R is the brake, never the motor. The *entretien generator* is a separate, added device that compensates the Joule loss — that is the only thing that "drives," and it is not R.
**Confrontation strategy (predict-then-reveal — the PC core move).** Show the RLC sandbox (C2) charged once, R at a medium value: a damped oscillation. Ask the student to **predict** the trace when R is dragged to **zero**. The M1 student predicts "ça s'arrête / ça s'affaiblit." **Reveal:** at R=0 the oscillation becomes a *perfect, never-ending* sinusoid. The student's prediction is exactly backwards — the rupture that breaks "R drives." Then drag R *up* and watch the oscillation die faster, confirming R is the brake. (This is the single most important confrontation of the notion.)
**Distinguishing stem (FR):** « Dans un circuit RLC série en oscillations libres, on diminue progressivement la résistance R jusqu'à la rendre négligeable. Que deviennent les oscillations de `u_C(t)` ? Choix : A) Elles persistent sans s'amortir (régime périodique) ; B) Elles s'arrêtent car plus rien ne les entretient ; C) Elles s'amortissent plus vite ; D) Leur période augmente fortement. »
→ trigger **B** (R seen as the engine); correct **A**. (C is the *reverse* magnitude error M3; D is the period-confusion noise — neither is the M1 signature.)

---

### M2 — `mc.physics.rlc_serie.energie-consommee-non-conservee`
**Label (FR):** « L'énergie est consommée / disparaît, elle ne s'échange pas »
**The wrong model.** The student carries the everyday "energy gets used up" model: at each instant the circuit "spends" energy that vanishes, the way a battery drains. There is no picture of a *conserved quantity moving between two stores*. So `E_C` and `E_L` are not seen as two halves of a sloshing total; the student cannot say "when `E_C` is maximal, `E_L` is zero, and the total is constant (in the LC ideal)."
**How it manifests.** On an energy diagram, the student cannot place `E_C` and `E_L` in **antiphase** (one maximal when the other is zero). Asked "à l'instant où `u_C=0`, où est l'énergie ?", the student says "elle est consommée / il n'y en a plus" instead of "elle est entièrement dans la bobine." In the *amorti* case, attributes *all* loss to "the energy being used by the components" rather than specifically to **Joule heating in R**.
**The correct model.** Two distinct facts the student must hold separately:
- **In the ideal LC (R négligeable): the total electromagnetic energy is CONSERVED.** `E = E_C + E_L = ½·q²/C + ½·L·i² = constante`. It **transfers** back and forth: when the condensateur is fully charged, `E_C` is max and `E_L=0` (`i=0`); a quarter-period later the condensateur is empty, `E_C=0`, and `E_L` is max (`i` max). It is a *pendulum of energy*, not a consumption.
- **In the amorti (R ≠ 0): the total DECREASES, and the lost energy is NOT "consumed by nothing" — it is converted to HEAT in R by the effet Joule** (`E_dissipée = ∫R·i²dt`). The store-to-store exchange still happens at each swing; R just skims a bit off as heat each time.
**Confrontation strategy.** Static energy diagram (C3) + the manipulable. Freeze the trace at `u_C` maximum and ask "where is the energy?" → all in C, none in L. Step a quarter-period: `u_C=0` but `i` is maximal → all in L. The "used up" model has nowhere to put the energy at `u_C=0`; revealing it is *entirely in the bobine* is the rupture. Then turn on R and show the **total envelope shrinking** while the C↔L exchange continues — and name the destination: *not gone, turned to heat in R*. Mechanical analogy (pendulum: PE↔KE, friction→heat) makes "exchanged, not consumed" obvious.
**Distinguishing stem (FR):** « Dans un circuit LC idéal (résistance négligeable), à l'instant où la tension `u_C` aux bornes du condensateur est nulle, où se trouve l'énergie du circuit ? Choix : A) Entièrement emmagasinée dans la bobine ; B) Elle a été entièrement consommée, il n'en reste plus ; C) Entièrement dans le condensateur ; D) Répartie également entre les deux. »
→ trigger **B** (energy "used up"); correct **A**. (C is the antiphase confusion — student puts it where it *was*, not where it *is*; D ignores the antiphase entirely. Neither C nor D is "consumed," so B is the unique M2 signature.)

---

### M3 — `mc.physics.rlc_serie.plus-de-R-oscille-plus-vite`
**Label (FR):** « Plus R est grande, plus le circuit oscille vite (R agit sur la fréquence) »
**The wrong model.** The student thinks R controls the *rate* of oscillation — "more resistance, faster (or slower) oscillations" — conflating *amplitude decay* (which R does govern) with *frequency* (which it does not, to the level the cadre treats). R is mis-cast as a tuning knob for the period, the way bigger L or C *does* change `T₀`.
**How it manifests.** Predicts that increasing R *shortens* (or lengthens) the period / pseudo-période. On a trace, attributes a change in the *number of visible oscillations* to a change in *frequency* rather than to *faster damping* (fewer oscillations because they die out, not because they speed up). Confuses "the oscillations stop sooner" with "the oscillations are faster."
**The correct model.** R governs the **amortissement (amplitude decay and which regime you are in)**, NOT the rate. Increasing R: (i) damps faster, (ii) eventually pushes the circuit from pseudo-périodique → apériodique (no oscillation at all) past a critical value — but it does **not** make the surviving oscillations "faster." What sets the rate is **L and C**: in the undamped case the **période propre `T₀ = 2π√(LC)`** depends *only* on L and C, never on R. (And per LIMITE 1 we do not even quantify how the pseudo-période drifts with R — we only say the pseudo-période is *close to* `T₀` for weak damping and that strong R kills oscillation entirely.) **More R → more damping / toward apériodique, not faster.**
**Confrontation strategy.** Manipulable: hold L and C fixed, drag R up. The student predicts "faster." Reveal: the spacing between successive peaks (the pseudo-période) stays essentially the same while the **peaks shrink faster** and the oscillation **dies out sooner** — and pushed far enough, it stops oscillating altogether (apériodique). Then drag C (or L) and show *that* is what actually changes the period. Separates "decays faster" from "oscillates faster."
**Distinguishing stem (FR):** « Dans un circuit RLC série, on augmente la résistance R en gardant L et C constants. Comment évolue le comportement de `u_C(t)` ? Choix : A) Les oscillations s'amortissent plus rapidement ; B) Les oscillations deviennent plus rapides (période plus courte) ; C) La période propre `T₀` augmente ; D) Rien ne change. »
→ trigger **B** (R → frequency); correct **A**. (C is the false "R changes `T₀`" sub-belief, co-attributable with M8 — see note; D ignores R's role entirely.)

---

### M4 — `mc.physics.rlc_serie.T0-depend-de-R`
**Label (FR):** « La période propre `T₀` dépend de R (et/ou `T₀ = 2π√(RC)`, `T₀=RC`, etc.) »
**The wrong model.** A specific, separable error distinct from M3's "rate" muddle: the student believes the **formula for `T₀` contains R**, or substitutes the RC time-constant `τ=RC` (carried over from the prior `dipole_rc` chapter) in place of the LC period. The prior chapter's `τ=RC` "leaks" into the new period formula.
**How it manifests.** Writes `T₀ = 2π√(RC)`, or `T₀ = RC`, or `T₀ = 2π√(L/C)`, or `T₀ = 2π·RLC`. Given numeric L, C, R, plugs R into the period. Cannot state that `T₀` is **independent of R**.
**The correct model.** **`T₀ = 2π√(LC)`** — it contains **only L and C**, never R. (Dimensional sanity: `√(LC)` has units of seconds; `√(RC)`=`τ` is a *charging time constant*, a different quantity that lives in the RC chapter, not a period.) R sets the damping/regime; L and C set the oscillation period. The undamped solution `q(t)=Q_max·cos(2πt/T₀+φ)` has `T₀=2π√(LC)` precisely because the only restoring/inertial terms in the (R-free) ODE are `1/C` and `L`.
**Confrontation strategy.** Establish-the-ODE walkthrough (R=0): `L·q'' + q/C = 0` → `q'' + (1/LC)·q = 0` → the angular frequency squared is `ω₀²=1/LC` → `T₀=2π√(LC)`. **R never entered the equation** (it was set to zero, and there is no other place it could appear). Make the point explicit: "regardez l'équation — R n'y figure pas, donc la période n'en dépend pas." Dimensional check: show `√(RC)` is seconds-but-it's-the-charging-time, not the period. Numeric: compute `T₀` for given L,C, then *change R* and recompute — same `T₀`.
**Distinguishing stem (FR):** « Dans un circuit RLC série en régime peu amorti, quelle est l'expression de la période propre `T₀` des oscillations ? Choix : A) `T₀ = 2π√(LC)` ; B) `T₀ = 2π√(RC)` ; C) `T₀ = 2π√(L/C)` ; D) `T₀ = RC`. »
→ trigger **B** (RC leaked in from the prior chapter); correct **A**. (C is the `√(L/C)` dimensional slip — units of resistance, a "close-to-the-line" trap worth a tagged secondary; D is the bare RC time-constant confusion. C and D are co-attributable to M4's family — see note.)

---

### M5 — `mc.physics.rlc_serie.pseudo-periode-egale-periode-propre`
**Label (FR):** « La pseudo-période (cas amorti) est exactement la période propre `T₀` » *(and its inverse: "in the damped case there IS no period at all")*
**The wrong model.** Two opposite errors that map to the same diagnostic gap — the student has no clear relationship between the **pseudo-période T** (measured off a damped trace) and the **période propre T₀** (the ideal LC value). Either (a) treats them as *identical* and computes `T` from `2π√(LC)` then reads it as the measured pseudo-période exactly, or (b) thinks the damped, decaying trace "has no period" because the amplitude changes.
**How it manifests.** On a TP trace of a pseudo-periodic regime, computes `T₀=2π√(LC)` and asserts the measured peak-to-peak spacing *equals* it to full precision; OR refuses to measure a pseudo-période at all ("ce n'est pas périodique"). Cannot articulate the cadre relationship "pseudo-période ≈ période propre pour un amortissement faible."
**The correct model (kept strictly inside LIMITE 1).** The **pseudo-période T** is the (constant) time between successive peaks of the *decaying* oscillation — it **does exist** even though the amplitude shrinks (the *spacing* is regular; only the *height* decays). For **weak damping**, `T ≈ T₀ = 2π√(LC)` — close, used as the standard approximation. **We do NOT give T as a function of R, L, C** (that is past the boundary, LIMITE 1); we only state the approximation and **measure T off the graph**. As damping grows, oscillation eventually disappears (apériodique) and the question of a period no longer applies.
**Confrontation strategy (experimental — the TP-reading mode).** Give an actual oscilloscope trace (C1 trace mode / the manipulable). Show that consecutive peaks are *evenly spaced* despite shrinking — so a pseudo-période **can** be measured. Measure it. Then compute `T₀=2π√(LC)` for the same components and compare: *close but not identical*, and "we use `T₀` as the approximation, we don't claim equality." This both refutes "no period" (the spacing is regular) and tempers "exactly equal" (it's an approximation, valid for weak damping).
**Distinguishing stem (FR):** « Sur l'oscillogramme d'un régime pseudo-périodique, on mesure le temps entre deux maximums successifs de `u_C`. Cette grandeur (la pseudo-période T) : Choix : A) existe et vaut approximativement la période propre `T₀=2π√(LC)` pour un faible amortissement ; B) n'existe pas, car l'amplitude qui diminue empêche de parler de période ; C) est exactement égale à `2π√(LC)` quel que soit l'amortissement ; D) augmente d'une oscillation à la suivante. »
→ trigger **B** ("no period") *or* secondary **C** ("exactly equal, always"); correct **A**. Primary diagnostic trigger **B**. (D is the "amplitude decay = period change" cross-link to M3 — co-attributable; see note.)

---

### M6 — `mc.physics.rlc_serie.cas-amorti-solution-sinusoidale-fermee`
**Label (FR):** « Le cas amorti a une solution sinusoïdale fermée `q(t)=Q_max·cos(...)` comme le cas idéal »
**The wrong model.** Having just learned to *solve* the undamped ODE into a clean sinusoid, the student over-generalises: assumes the **damped** ODE also has a simple closed-form sinusoidal solution of the same shape, and reaches for it. This is the misconception that is **also the boundary tripwire** — it is exactly the off-cadre move LIMITE 1 forbids, and the student's instinct will push them straight into it.
**How it manifests.** Writes `q(t)=Q_max·cos(2πt/T+φ)` for the *amorti* case (no decay factor), or attempts a closed-form damped solution. Treats the pseudo-periodic trace as a pure cosine. Tries to "find the formula for the pseudo-période in terms of R, L, C."
**The correct model (this is where the boundary IS the pedagogy).** In the **amorti** case we **establish the ODE and stop**: `L·q'' + R·q' + q/C = 0`. We do **not** solve it in closed form — the damped, decaying oscillation is described **qualitatively** (a sinusoid-like shape whose amplitude shrinks), **energetically** (total energy decreasing via Joule), and **experimentally** (measured off a trace). A clean closed-form sinusoid is correct **only** in the **R-négligeable (LC ideal)** case, where `q(t)=Q_max·cos(2πt/T₀+φ)` with `T₀=2π√(LC)`. The *presence of the `R·q'` term* is precisely what makes the simple cosine no longer a solution — the student must see that the cosine, plugged into the damped ODE, does **not** satisfy it.
**Confrontation strategy (predict-then-reveal, anchored to verification).** Ask the student to *verify* whether `q(t)=Q_max·cos(2πt/T₀+φ)` solves the **damped** ODE (substitute it in). It does **not** — the `R·q'` term leaves a leftover that cannot cancel. The failed verification is the rupture: "the clean cosine works for R=0; switch R on and it stops being a solution." Then state the rule explicitly: undamped → we solve; damped → we only establish the equation and read the rest off the experiment. (This doubles as the lesson's honest statement of *why* the cadre draws the line there: solving the damped case requires machinery beyond the programme.)
**Distinguishing stem (FR):** « Pour un circuit RLC série avec une résistance R non négligeable (régime pseudo-périodique), quelle affirmation est correcte concernant la charge `q(t)` ? Choix : A) On établit l'équation différentielle `L·q'' + R·q' + q/C = 0`, mais on ne donne pas de solution `q(t)` sous forme close ; on décrit le régime qualitativement et expérimentalement ; B) `q(t) = Q_max·cos(2πt/T₀ + φ)` avec `T₀=2π√(LC)`, comme dans le cas idéal ; C) `q(t)` est une exponentielle décroissante pure `q(t)=Q_max·e^{−t/τ}` ; D) `q(t)` est constante. »
→ trigger **B** (over-generalised closed-form sinusoid — the boundary violation); correct **A**. (C is the apériodique/RC-decay confusion — student grabs the RL/RC exponential; D is the no-oscillation degenerate noise. C is a tagged secondary linking to the regime-confusion family.)

---

### M7 — `mc.physics.rlc_serie.confusion-roles-C-L-stockage`
**Label (FR):** « Le condensateur et la bobine stockent la même chose / on confond leurs rôles et leurs grandeurs »
**The wrong model.** The student does not have a clean, separated picture of *what each element stores and when it is maximal*. The condensateur's `E_C=½q²/C=½Cu_C²` (electric, maximal when charge/tension is max, `i=0`) and the bobine's `E_L=½Li²` (magnetic, maximal when current is max, `u_C=0`) blur together: the student uses `i` in the condensateur's energy, or `u` in the bobine's, or thinks both are maximal at the same instant.
**How it manifests.** Writes `E_C=½Li²` or `E_L=½Cu²` (swapped). Places both energy maxima at the same time on the diagram. Cannot say "when `i` is max, the energy is all magnetic (in L) and `u_C=0`." Uses `q=C·u` and `i=dq/dt` inconsistently when setting up the ODE.
**The correct model.** **Two different stores, antiphase in the ideal case:**
- **Condensateur:** stores **electric** energy `E_C = ½·q²/C = ½·C·u_C²`. Maximal when `u_C` (and `q`) is maximal — at which instant `i=0` (no current flows when the condensateur is fully charged/discharged turning point).
- **Bobine:** stores **magnetic** energy `E_L = ½·L·i²`. Maximal when `i` is maximal — at which instant `u_C=0` (the condensateur is empty, all energy has crossed over).
They trade places every quarter-period; `E_C+E_L` is the conserved total in the LC ideal. The relations `q=C·u_C` and `i=dq/dt` are the bookkeeping that links them and that build the ODE (write `u_C+u_L+u_R=0` → substitute → get `L·q''+R·q'+q/C=0`).
**Confrontation strategy.** The static energy diagram (C3) with both curves drawn in antiphase, each labelled with *which variable* it depends on. Walk one full period: at `t=0` (condensateur chargé) `E_C` max / `E_L=0`; quarter later `E_C=0` / `E_L` max; etc. Force the swapped formula into a sanity check: "`½Li²` when `i=0` gives zero — so if you put the condensateur's energy as `½Li²`, you'd say the *charged* condensateur stores *nothing*, which is absurd." The absurdity breaks the swap.
**Distinguishing stem (FR):** « Dans un circuit RLC série, quelles sont les expressions correctes des énergies emmagasinées ? Choix : A) condensateur `E_C=½·q²/C` (maximale quand `u_C` est maximale), bobine `E_L=½·L·i²` (maximale quand `i` est maximal) ; B) condensateur `E_C=½·L·i²`, bobine `E_L=½·C·u_C²` ; C) les deux énergies sont maximales au même instant ; D) `E_C` et `E_L` sont toujours égales à chaque instant. »
→ trigger **B** (swapped formulae); correct **A**. (C is the same-instant-maxima error — a distinct facet, tagged secondary; D is the "always equal" misconception, noise here.)

---

### M8 — `mc.physics.rlc_serie.entretien-est-regime-force`
**Label (FR):** « L'entretien des oscillations, c'est imposer une fréquence de l'extérieur (régime forcé) »
**The wrong model.** The student conflates **entretien** (in scope) with a **forced/résonance** regime (excluded). They think the entretien generator *imposes its own frequency* on the circuit (a driving oscillator), rather than *compensating the energy lost to R* so the circuit keeps oscillating at *its own* `T₀`. This is the misconception that, if uncorrected, drags the student across the EXCLUSION boundary into forced-regime territory the cadre forbids.
**How it manifests.** Describes the entretien generator as "donnant le rythme" / "imposant la fréquence." Confuses the entretien condition with a résonance condition. Thinks the maintained oscillation period is set by the generator, not by L and C. May import (wrongly, from elsewhere) résonance/impédance language.
**The correct model.** The entretien generator delivers `u_G(t)=k·i(t)` — a voltage **proportional to the current itself**, not an externally-timed signal. Inserting it into the loop equation turns the damping term `R·i` into `(R−k)·i`; choosing **`k=R`** makes the net damping **zero**, so the ODE becomes the **undamped** one (`L·q''+q/C=0`) and the circuit oscillates **freely, undamped, at its OWN période propre `T₀=2π√(LC)`** — forever. The generator's only role is to **return exactly the Joule-lost energy each cycle** (effet Joule compensation); it does **not** impose a frequency. Entretien = "keep the *free* oscillation alive by refilling the leak," NOT "drive at an imposed frequency." This is the strict line between in-scope (entretien) and excluded (forced résonance — §0.4).
**Confrontation strategy.** Establish the entretenu ODE: `u_C + u_L + u_R = u_G`, i.e. `q/C + L·q'' + R·q' = k·q'` → `L·q'' + (R−k)·q' + q/C = 0`. Ask the student what value of `k` removes the damping term. Reveal `k=R` → the equation is *identical to the ideal LC*, so the period is `T₀=2π√(LC)`, set by L and C — **the generator's `k` does not appear in the period.** "The generator chooses *how much energy to give back*, not *how fast to oscillate*." Contrast in one sentence with the mécanique forced résonance (different sous-domaine, not studied here) to seal the boundary.
**Distinguishing stem (FR):** « On entretient les oscillations d'un circuit RLC à l'aide d'un générateur délivrant une tension `u_G(t)=k·i(t)`. Quel est le rôle de ce dispositif et que vaut la période des oscillations entretenues ? Choix : A) Il compense l'énergie dissipée par effet Joule ; les oscillations se font à la période propre `T₀=2π√(LC)` ; B) Il impose sa propre fréquence au circuit (régime forcé) ; C) Il augmente la résistance du circuit ; D) Il rend la période dépendante de k. »
→ trigger **B** (entretien read as forced regime — the boundary crossing); correct **A**. (D is the "k sets the period" sub-error, co-attributable to M8's own family; C is noise.)

---

### Co-attribution / dual-tag note (carry verbatim to item-author)

Several misconceptions here are *cousins* (the R-role family M1/M3; the period family M3/M4/M5; the regime-boundary family M6 with M5; the entretien M8 with M3/M4). This produces **legitimate cross-reachable distractors**, which per the agent standard are **NOT stem defects**:

- *Correct-answer contamination* (a stem that lets a misconception reach the **correct** answer) **is** a defect — revise the stem. None of the stems above do this; verify each authored item.
- *Target-distractor co-attribution across misconceptions* (a single distractor reachable by more than one wrong model) **is expected and fine** — it requires **dual-tagging**: `items.distractor_misconceptions` maps that choice index to **both** misconception IDs where genuinely co-reachable, while each item's *primary* trigger stays unique.

Concretely flagged co-attributions item-author must handle:
- **M3 ↔ M4:** "R changes `T₀` / the period" is reachable both by the "R sets the rate" model (M3) and the "`T₀` formula contains R" model (M4). On M3's primary item the trigger is the *behavioural* claim ("oscillations become faster"); on M4's primary item the trigger is the *formula* (`2π√(RC)`). Tag the shared "period depends on R" distractor to both where it appears.
- **M5 ↔ M3:** "the pseudo-période changes from one oscillation to the next" (M5's choice D) is also reachable by M3 (R→rate). Tag to both.
- **M6 ↔ M5:** the closed-form-damped-sinusoid belief (M6) and the "pseudo-période exactly equals `T₀`" belief (M5) co-occur in students who over-generalise the ideal solution. Keep M6's primary on the *form of `q(t)`* and M5's primary on the *measured spacing*; tag the shared over-generalisation where it surfaces.
- **M8 ↔ M4:** "the period depends on k / the generator" (M8's D) is the entretien-flavoured cousin of M4's "period depends on R." Distinct primaries (entretien role vs `T₀` formula); tag the period-dependence distractor across both where genuinely co-reachable.

---

## 2. The graduated ramp

Reasoning-demand rises and scaffolding fades across the rungs (VISION: "early rungs build fluency … later rungs build recognition"). The PC confront-the-model profile means **several rungs are predict-then-reveal**, and **all three PC modes appear**: conceptual (the energy/role picture), procedural (establish-the-ODE, compute `T₀`), and experimental (read the TP/oscilloscope trace). Each rung names the misconception(s) it confronts and the scaffolding level.

| Rung | Type | Mode | Scaffolding | Confronts | What the student does |
|---|---|---|---|---|---|
| **R0 — Hook** | predict-then-reveal | conceptual | full (narrative) | M1, M2 (sets them up) | The "perpetual swing" surprise: a charged condensateur connected to a bobine — predict what `u_C(t)` does. Most expect "it discharges and stops" (RC intuition). Reveal the *oscillation*. Plant: "where does the energy go, and what makes it eventually die?" Left open. (C4 optional hook image.) |
| **R1 — Décharge C dans L : le mécanisme** | worked, conceptual | conceptual + procedural | full — every step + expert voice | M2, M7 | Walk one cycle of the **ideal LC**: condensateur chargé → discharges through L → current builds → condensateur empty but `i` max (energy now all in L) → L drives current on, recharges C the other way → … The energy *pendulum*. Establish `E=E_C+E_L=½q²/C+½Li²=const`. Confront M2 (not consumed) and M7 (which store, when). |
| **R2 — Établir l'équation (cas idéal) + `T₀`** | worked example | procedural | high — loop law pre-set, student substitutes | M4 | From `u_C+u_L=0` with `i=dq/dt`, `q=Cu_C`: derive `L·q''+q/C=0` → `T₀=2π√(LC)`, `q(t)=Q_max·cos(2πt/T₀+φ)`, `i(t)=q'`. Expert voice: "R ne figure pas dans l'équation idéale — donc la période n'en dépend pas." Confront M4 (R not in `T₀`). |
| **R3 — Le rôle de R : amortissement, pas moteur** | confront-the-contradiction | conceptual + experimental | medium — contradiction staged via the sandbox | M1, M3 | Manipulable: drag R→0 (predict "stops" → reveal "perfect undamped"); drag R up (faster *decay*, not faster *oscillation*; eventually apériodique). Confront M1 (R drives) and M3 (R→rate). The single most important beat. |
| **R4 — Les trois régimes (qualitatif + énergétique)** | worked → guided | conceptual + experimental | fading | M3, M5 | Recognise périodique / pseudo-périodique / apériodique from `u_C(t)` shapes (C1 traces). Energy view: total envelope shrinks (Joule). Introduce the **pseudo-période** as the regular peak spacing of a *decaying* trace; state `T ≈ T₀` for weak damping (LIMITE 1 — measured, not derived). Confront M5. |
| **R5 — Cas amorti : établir l'équation, et S'ARRÊTER LÀ** | worked example, high reasoning | procedural | low | M6 | Establish `L·q''+R·q'+q/C=0`. **Verify** that the ideal cosine does **NOT** solve it (the `R·q'` leftover). State the rule out loud: undamped → solve; damped → establish only, describe qualitatively/experimentally. Confront M6 (the boundary-violation misconception). **This rung IS the boundary, taught as pedagogy.** |
| **R6 — Lecture d'oscillogramme (TP)** | experimental, guided→solo | experimental | low | M5, M3, M7 | Read a real TP/oscilloscope trace: identify the regime, **measure the pseudo-période**, compare to `T₀=2π√(LC)`, deduce the effect of having changed R. The Application-expérimentale habileté (15% target). Confront M5 (measure it), M3 (more R = faster decay, not faster), M7 (read energy off the trace). |
| **R7 — Entretien des oscillations** | worked → guided | conceptual + procedural | low | M8, M1 (revisited) | Establish the entretenu ODE with `u_G=k·i` → `L·q''+(R−k)·q'+q/C=0` → find `k=R` cancels damping → free undamped oscillation at `T₀`. The generator *compensates Joule loss*, does NOT impose a frequency. Confront M8 (entretien ≠ forced) and re-confront M1 (now the *real* "driver" appears, and it isn't R). |
| **R8 — Past-bac** | exam item, unscaffolded | all, mixed | none | all | **Real PC bac questions** on RLC libres / entretien. ⚠ The recovered old bank (`034_exam_papers_pc.sql`) gives *types* but **provenance is unverified** (mining report §3) — may be reconstructions. **Flag for the human / curriculum-extraction:** insert genuine past PC national-exam RLC questions with year+session citations, **screened against the boundary** (reject any forced-regime/impédance question). Until sourced, R8 uses bac-style reconstructions clearly labelled as such. |
| **R9 — Fresh variation** | novel transfer | all | none | recognition under unfamiliar dress | Same deep structure as R8, re-skinned so nothing is memorisable: e.g. the entretien question re-dressed with different `u_G` proportionality, or a trace-reading with unfamiliar component values / a different oscilloscope calibration. Tests "can you see which procedure applies when the problem is dressed unfamiliarly" (VISION). |

**Where scaffolding fades:** full at R0–R2, medium at R3, then steadily down — by R5/R6 the student establishes the ODE and reads traces with only a structural prompt; R8–R9 are unscaffolded. The **reasoning demand** rises faster than the arithmetic: R5's algebra is no harder than R2's, but the *decision* (we establish but do not solve; verify the cosine fails) is the whole difficulty, and R6's trace-reading is pure recognition.

**Arc closure (important for felt coherence):** the "what makes it eventually die, and where does the energy go?" planted in R0 is *deliberately left open* until R3–R4 (R dissipates it as Joule heat) and finally *answered fully* at R7 (entretien refills exactly that loss). content-author must wire this callback explicitly — it is the payoff that makes the notion one journey, not a list of formulas. **R0's "perpetual swing" → R7's "we can make it truly perpetual by refilling the leak"** is the spine.

---

## 3. Media / interactive callouts (every callout typed per ADR 0017)

Only what the concept genuinely needs (DESIGN-BIBLE §6 coherence principle; VISION "every element is summoned by *learning*"). Five callouts; one is REQUIRED (the manipulable — the hard part of this notion *is* manipulation of R/L/C against the regimes), the rest are judged against "does the idea *need* this modality."

### C1 — RLC circuit schematic + the three `u_C(t)` regime traces — REQUIRED
- **Type:** `structural-diagram`
- **Tool:** **svg+katex** — **never gemini.** (ADR 0017: a diffusion model renders a *plausible* circuit, not a *correct* one — garbled component symbols, wrong topology, incoherent labels. The smoke-test evidence is explicit: structure and glyphs must be code.)
- **Where:** the schematic at R0/R1 (the loop being described); the three traces at R4 (regime recognition) and reused at R6 (trace-reading).
- **What it MUST show, exactly:**
  - **The series RLC loop:** condensateur **C**, bobine **L** (with its internal resistance **r** if the lesson uses the realistic bobine), conducteur ohmique **R**, an **interrupteur K**, drawn in a single series loop in **convention récepteur** with `u_C`, `u_R`, `u_L` and the current `i` arrowed consistently. (For R7, a variant adds the entretien generator delivering `u_G`.)
  - **Three `u_C(t)` traces, clearly distinguished and labelled** (KaTeX axes `u_C` vs `t`): **périodique** (R≈0: undamped sinusoid), **pseudo-périodique** (damped oscillation with regular peak spacing and shrinking amplitude — the pseudo-période `T` marked between two peaks), **apériodique** (monotonic decay, no oscillation). A **critical/apériodique critique** variant may be shown qualitatively as the fastest non-oscillating return.
  - **Signaling, not clutter** (DESIGN-BIBLE §6): a soft highlight to mark the pseudo-période on the damped trace; the antiphase relationship referenced to C3, not duplicated here.
- **DESIGN-BIBLE:** flat, soft, muted, single restrained accent; labels integrated *beside* the elements/curves (no split-attention); KaTeX for every symbol and axis label ("math is rendered, not imaged", §3).
- **Number values:** round, hand-checkable component values for the traces (see §5 worked-number seeds) so a student can verify `T₀` by hand.

### C2 — The RLC manipulable (drag R/L/C → regimes, trace, energy exchange) — REQUIRED
- **Type:** `manipulable`
- **Tool:** **embed — falstad** (primary; Falstad's circuit simulator handles RLC natively and shows live `u_C(t)` and the energy split) **or geogebra** (fallback, for a parameter-driven trace + energy applet). **Do not rebuild** (ADR 0017; Flutter is retired, ADR 0016).
- **Behaviour reference (NOT code):** the mined `mobile/bac_app/lib/widgets/physics/rlc_simulator_widget.dart` (mining report §5) already implemented exactly the right interaction — sliders for R/L/C, the three regimes live, the C↔L energy exchange, an oscilloscope-style trace. **It is the behaviour spec the embed must reproduce; it is not reusable code.**
- **Behaviour the embed must have:**
  - Sliders / inputs for **R, L, C**; the **`u_C(t)` trace updates live**.
  - Dragging **R→0** shows the *perfect undamped* sinusoid; dragging **R up** shows *faster decay* and the transition pseudo-périodique → apériodique (the **R3** confrontation).
  - The **energy split `E_C` vs `E_L`** displayed live (bars or two curves), showing the **antiphase exchange** and, with R>0, the **shrinking total** (the **M2/M7** picture).
  - Changing **L or C** changes the **period**; changing **R does not** (the **M3/M4** separation).
- **Placement:** the engine of **R3** (predict-then-reveal on R) and revisited at R4/R6. In the calm core — no engagement theater, no reward animation; it is a clarifying instrument, not a toy (DESIGN-BIBLE §7).
- **Boundary guard:** the embed stays on **free oscillations + entretien** only. **No forced/driven-frequency sweep, no résonance curve, no impédance readout** — those are EXCLUSIONS (§0.4). If the chosen embed exposes a driven-AC mode, it must be hidden/disabled in the lesson configuration.
- **Fallback:** if no embed is wired in time, C1 (static traces) + C3 (energy diagram) with 2–3 pre-set parameter snapshots carry the load; the manipulable is the *intended* primary because the hard part is manipulation, but it must degrade gracefully.

### C3 — Energy-exchange diagram `E_C` ↔ `E_L` (antiphase, with the shrinking total under damping) — REQUIRED (static)
- **Type:** `structural-diagram`
- **Tool:** **svg+katex** — exact antiphase curves and labels carry the meaning; never Gemini.
- **Where:** R1 (ideal: conserved total, antiphase) and R4 (damped: total envelope shrinks toward zero, energy → Joule heat in R).
- **What it MUST show:** two curves `E_C(t)=½q²/C` and `E_L(t)=½Li²` in **antiphase** (one maximal when the other is zero), their **sum `E_C+E_L`** drawn as a **horizontal line (ideal)** and as a **decreasing envelope (damped)**; the instants `u_C` max / `i=0` and `u_C=0` / `i` max marked. KaTeX for all energy expressions. Soft signaling to point at "all in C here / all in L here."
- **Why static, not motion:** see the motion decision below.

### C4 — Hook image (the "perpetual electrical swing") — OPTIONAL, light
- **Type:** `atmospheric-illustration`
- **Tool:** **gemini** (gemini-image MCP) with the **DESIGN-BIBLE style preamble appended verbatim** (mandatory).
- **Where:** R0 hook only. A calm, gallery-like scene evoking *oscillation / back-and-forth exchange* — e.g. a single pendulum at rest in a quiet room, or an abstract "energy passing between two vessels" motif — **mood and metaphor only, ZERO circuit structure, zero numbers, zero labels, no oscilloscope, no equations.** The instant any circuit, trace, or notation is needed, that is C1/C3's job (structural → code), never Gemini.
- **Strictly bounded:** if it risks stimulation over comprehension (VISION), cut it. The hook works on prose + the manipulable alone; the image is a mood, not information.

### Motion decision — NO Manim callout (bias-toward-not, honoured)
- The brief asks whether a `motion`/`manim` callout for the C↔L energy exchange is genuinely warranted. **Decision: NO.** The C↔L exchange is best *manipulated* (C2 — the student drives time and parameters and watches the split respond), not *watched*. A passive Manim animation of energy sloshing would be **decoration that the manipulable already delivers interactively and better** — and motion is reserved for "the hardest dynamic concepts" (ADR 0017), where the dynamism cannot be conveyed any other way. Here the manipulable (C2) plus the static antiphase diagram (C3) cover the dynamic picture fully. Adding Manim would violate DESIGN-BIBLE §6 ("only the marks essential to the idea") and the VISION "no stimulation for its own sake."
- **The one future candidate, flagged not built:** if the human's review finds that students cannot grasp the *antiphase* purely from C2+C3, a *single* short, calm Manim clip of `E_C` and `E_L` trading places over one period (paced as a clarifying reveal, not a punchy edit) could be added — `type: motion` / `tool: manim`. Flagged for the editorial gate; **not** in this build.

---

## 4. Build spec — for content-author (writes `lesson.md`)

**Profile:** Physique-Chimie — **confront the wrong model** (VISION). Students arrive with the wrong physical models in §1; they will **not** be displaced by a clean presentation. **Predict-then-reveal** at R0, R3, R5. **All three modes appear and are required:** conceptual (energy/role picture), procedural (establish-the-ODE, `T₀`, entretien condition), experimental (read the TP/oscilloscope trace). The hard part is the **2nd-order ODE + the three regimes + the energy picture** — NOT motion.

**Structure to produce, in this order (VISION's "what a notion is"):**
1. **Hook (R0)** — the "perpetual swing" surprise. Make the student *predict* `u_C(t)` for a charged condensateur connected to a bobine; reveal the oscillation; plant "what makes it die, and where does the energy go?" Leave it open. (C4 optional image.)
2. **Décortiquer** — take the oscillation fully apart, **concrete before abstract**, mechanism made *obvious*:
   - **The energy pendulum (R1):** one cycle of the ideal LC, narrated as energy crossing from C to L and back; arrive at `E=E_C+E_L=const` as the *mechanism*, not a stated fact. Confront **M2** (not consumed), **M7** (which store, when). Use the **mechanical-pendulum analogy** (PE↔KE; friction→heat) — concrete before abstract.
   - **Establish the ideal ODE + `T₀` (R2):** `u_C+u_L=0`, substitute `i=dq/dt`, `q=Cu_C` → `L·q''+q/C=0` → `q(t)=Q_max·cos(2πt/T₀+φ)`, `T₀=2π√(LC)`. Expert voice: "R n'apparaît pas — donc la période n'en dépend pas." Confront **M4**.
   - **R is the brake, not the motor (R3):** the manipulable predict-then-reveal on R→0 and R↑. Confront **M1**, **M3**. **Highest-importance beat — pace it; check each prediction before revealing.**
   - **The three regimes (R4):** recognise from shapes (C1); energy envelope shrinks (Joule); introduce **pseudo-période** as measured spacing, `T≈T₀` weak damping (LIMITE 1). Confront **M5**.
   - **Damped ODE — establish and STOP (R5):** establish `L·q''+R·q'+q/C=0`; **verify the ideal cosine fails to solve it**; state the rule (undamped → solve; damped → establish only, describe qualitatively/experimentally). Confront **M6**. **This is the boundary, taught as the lesson.**
   - **Trace-reading (R6):** measure the pseudo-période off an oscillogram, compare to `T₀`, deduce R's effect. Confront **M5, M3, M7**.
   - **Entretien (R7):** `u_G=k·i` → `L·q''+(R−k)·q'+q/C=0` → `k=R` cancels damping → free undamped oscillation at `T₀`; the generator *compensates Joule loss*, does NOT impose a frequency. Confront **M8**, re-confront **M1**. **Close the R0 arc here.**
3. **Expert reasoning shown out loud** in every worked example — not "on établit l'équation" but the *deciding*: "*on écrit la loi des mailles, on remplace `i` par `dq/dt` et `u_C` par `q/C` — et on regarde si R apparaît : dans le cas idéal il n'y est pas, donc T₀ ne dépend que de L et C.*" For R5: "*on essaie le cosinus idéal dans l'équation amortie — le terme `R·q'` laisse un reste qui ne s'annule pas, donc ce cosinus n'est PAS solution ; c'est pourquoi, en régime amorti, on s'arrête à l'équation et on lit le reste sur l'expérience.*"
4. **Graduated ramp** R1→R9 as §2, scaffolding fading as specified.
5. **Grounded throughout** — concrete contexts (the charged condensateur "let go" into the coil; the oscilloscope on the bench; the mechanical-pendulum analogy). Reuse RC/RL numbers as familiar anchors (the prerequisites), author prose fresh.

**Hard rules for content-author:**
- **French, voice-ready** (VISION; "on calcule…" impersonal per content-guide). Every student-facing string is French.
- **KaTeX for all math**, never images of equations (DESIGN-BIBLE §3). The ODEs, `T₀=2π√(LC)`, `E_C`/`E_L`, the entretien condition — all KaTeX.
- **RESPECT THE BOUNDARY (§0.4), absolutely:**
  - Damped case → **establish the ODE only.** No closed-form damped solution, no pseudo-période as `f(R,L,C)`, no damping coefficient / decrement / exponential envelope formula.
  - Closed form **only** undamped (`q(t)=Q_max·cos(2πt/T₀+φ)`, `T₀=2π√(LC)`).
  - **No** résonance forcée / impédance / phaseurs / notation complexe / puissance alternative — anywhere.
  - The entretien is **Joule-loss compensation restoring the FREE regime at `T₀`**, framed strictly so it never reads as a forced/driven regime.
- **Place C1/C2/C3 exactly where §2/§3 specify;** C2 (manipulable) is the engine of R3.
- **Do not re-teach RC/RL;** assume them (cite `τ=RC`, `q=Cu`, `i=dq/dt`, `u_L=L·di/dt`, `E_C=½Cu²`, `E_L=½Li²` as known).
- **One idea per beat** (DESIGN-BIBLE §7); R3 (R-is-the-brake) is the beat to slow down on.

## 5. Build spec — for item-author (writes `items.yaml`)

**Coverage floor (the explicit build target):** **≥3 items per misconception** before its `exhibited_count` is confidence-bearing (VISION; ADR 0011 learner-model floor; agent standard). With **8 misconceptions**, the floor is **≥24 misconception-driven items.** Diminishing-returns ceiling is **6/misconception** (ADR 0011) — do not exceed 6. **Target: 3 per misconception (24 items) for v1-to-floor; the harness slice may ship a smaller proof set but must state its per-misconception count in the coverage summary.**

**Habileté mix (the bac-fidelity target, §0.3):** across the item set, aim for roughly **Utilisation ≈ 50 %** (regime recognition, apply `T₀`, read energy diagrams, state roles), **Résolution ≈ 35 %** (establish ODE, entretien `k=R`, multi-step), **Application expérimentale ≈ 15 %** (read a TP/oscilloscope trace — measure pseudo-période, identify regime, deduce R's effect). Tag items so the mix is checkable. The Application-expérimentale items are anchored on **R6** (trace-reading) and on M5/M7.

**Per misconception, author ≥3 items that:**
- use the misconception's `distinguishing_mcq_stem` (§1) as the **canonical first item**, then **2 structural variants** — same wrong-model trigger, *different surface* (different component values, different framing — schematic vs trace vs energy diagram vs ODE) so nothing is memorisable and the trigger is robust.
- have **4 choices**, exactly one correct, with `distractor_misconceptions` mapping the trigger choice's **0-based string index** to the misconception ID (`A=0,B=1,C=2,D=3`).
- carry `tags` including `'misconception_driven'` and `'rlc_serie'`; the trace-reading items also `'document_experimental'` (ADR 0011 marker for PC TP-reasoning), and the entretien items `'entretien'`.
- include `explanation.text_fr` + `steps[]` (French), and `wrong_choice_explanations[]` aligned to the choices array (content-guide), each naming the *specific* wrong physical model for that distractor — that is what turns a wrong answer into a diagnosis. (content-guide: `null` for the correct index and for noise distractors with no named misconception.)

**Item-type spread (PC, all three modes):**
- **MCQ** for the conceptual confrontations (M1, M2, M3, M6, M7, M8) and the formula (M4) — the misconception-trigger choice is the whole point.
- **Numeric** items for `T₀=2π√(LC)` computation (Utilisation) — use `item_type: numeric` with `unit` and `tolerance` (content-guide).
- **Document-experimental MCQ/numeric** reading a trace (M5, M3, M7) — the stem references a C1-style oscillogram (figure), the student measures/identifies. These carry `'document_experimental'`.

**Worked-number seeds (reuse numbers, not prose — mining report §2; all hand-checkable, inside the boundary):**
- **Ideal LC for `T₀`:** `L = 0,1 H`, `C = 10 µF` → `T₀ = 2π√(LC) = 2π√(10⁻⁶) ≈ 6,28 ms`. (Clean: `√(LC)=10⁻³ s`.) Alternative: `L = 0,4 H`, `C = 10 µF` → `√(LC)=2·10⁻³`, `T₀≈12,6 ms`. Vary these for the M4 / `T₀` items.
- **RC/RL anchors (prerequisites, for "this is NOT the period" contrasts):** the recovered `τ=RC` example (`R=1 kΩ`, `C=100 µF` → `τ=0,1 s`) is the *charging time constant* — use it as the M4 contrast ("`√(RC)` is this τ, a time, not the period").
- **Energy:** with `C=10 µF` charged to `U₀=6 V`: `E_C(max)=½Cu²=½·10⁻⁵·36=1,8·10⁻⁴ J`; this is the conserved total in the ideal case, the max of `E_L` a quarter-period later. Round, checkable.
- **Entretien:** generic `u_G=k·i`, condition `k=R`; if `R=20 Ω`, then `k=20 Ω` (i.e. V/A) cancels the damping. (No résonance, no impédance.)
- All component values stay round so the student verifies by hand; none of them requires solving the damped case.

**Stem-defect discipline (carry verbatim):**
- **Correct-answer contamination is a defect** — if any misconception's wrong model can reach the *correct* choice on a stem, **revise the stem.** Check every item.
- **Cross-misconception co-attribution is NOT a defect** — it requires **dual-tagging** (§1 co-attribution note). Specifically handle **M3↔M4** (period-depends-on-R), **M5↔M3** (pseudo-période changes per oscillation), **M6↔M5** (over-generalised ideal solution), **M8↔M4** (period-depends-on-k/generator). Where a non-target distractor is genuinely reachable by another misconception, **tag it to that misconception too** rather than reshuffling to hide it.

**BOUNDARY DISCIPLINE for items (non-negotiable, §0.4):**
- **No item** may require or reward a closed-form damped solution, a pseudo-période computed as `f(R,L,C)`, a damping coefficient/decrement, résonance, impédance, complex notation, or AC power.
- **M6's correct answer is itself the boundary** ("we establish the ODE and do not solve it") — make sure the *correct* choice states the establish-only rule and the *trigger* is the over-generalised closed-form. This item polices the boundary inside the diagnosis.
- Trace-reading items **measure** the pseudo-période off the graph; they never ask the student to **derive** it.

**Diagnostic isolation:** each item's **primary** trigger must distinguish *its* misconception from the other seven (criterion c). The cousins (M1/M3; M3/M4/M5; M6/M5; M8/M4) are the hard cases — use the framing shown in their stems (behavioural claim for M3 vs formula for M4; measured-spacing for M5 vs form-of-`q(t)` for M6; entretien-role for M8).

**Difficulty (`difficulty_level`, content-guide mapping):** regime-recognition and role/energy items 2; `T₀` computation and the three-regime energetics 2–3; establish-the-ODE (ideal) 3; establish-the-damped-ODE-and-stop (M6) and the entretien `k=R` derivation 3–4; trace-reading with deduced R-effect 3. Tag the M6 and entretien items so the SRS does not surface them before the easier conceptual ones.

**Diagnostic-output contract (ADR 0011, non-negotiable):** until a student has seen a tagged item, a misconception is **"unassessed"**, never "no misconception detected." Item-author does not implement this, but authors *enough* coverage (the ≥3 floor) that the diagnosis can leave "unassessed."

**Coverage summary (end of `items.yaml`, required by pipeline step 3):** a table of items-per-misconception so the ≥3 floor is checkable at a glance; the habileté-mix tally (Utilisation / Résolution / Application expérimentale counts vs the 50/35/15 target); and an explicit list of every dual-tagged distractor with the misconceptions it attributes to.

## 6. Build spec — for diagram-author (C1, C3 — `svg+katex`)

- **C1 — RLC schematic + three regime traces.** Series loop C–L(–r)–R–K in convention récepteur, `u_C`/`u_R`/`u_L`/`i` arrowed consistently; an R7 variant adds the `u_G` generator. Three labelled `u_C(t)` traces (périodique / pseudo-périodique / apériodique) with the **pseudo-période `T` marked** on the damped one. KaTeX for every symbol/axis; flat, soft, muted, single accent; labels beside the marks (no split-attention). Round component values matching §5 seeds so `T₀` is hand-verifiable.
- **C3 — Energy diagram.** `E_C(t)` and `E_L(t)` in **antiphase**; their **sum** as a flat line (ideal) and a **decreasing envelope** (damped); the `u_C` max/`i=0` and `u_C=0`/`i` max instants marked; KaTeX for `½q²/C`, `½Li²`. Soft signaling, no clutter (DESIGN-BIBLE §6 coherence).
- **Hard rule:** **never send these to Gemini** (ADR 0017 — structure + glyphs must be code). No résonance/impédance content in any figure (§0.4).

## 7. Build spec — for interactive-author (C2 — embed)

- **Build the RLC manipulable as a Falstad embed** (primary) or GeoGebra (fallback). **Behaviour reference (not code):** `mobile/bac_app/lib/widgets/physics/rlc_simulator_widget.dart` (mining report §5) — reproduce its interaction, do not port its Flutter code (retired, ADR 0016).
- **Required behaviour:** R/L/C inputs; live `u_C(t)` trace; R→0 ⇒ undamped sinusoid; R↑ ⇒ faster decay then apériodique; live `E_C`/`E_L` split (antiphase, shrinking total under damping); L/C change the period, R does not.
- **Placement:** the engine of R3 (predict-then-reveal), reused R4/R6. Calm core, no engagement theater (DESIGN-BIBLE §7).
- **Boundary guard (non-negotiable):** free oscillations + entretien ONLY. **Disable/hide any driven-AC, résonance-sweep, or impédance feature** the embed exposes (EXCLUSION, §0.4).
- **Graceful degradation:** if not wired in time, C1 + C3 with 2–3 preset snapshots carry the load; flag the gap, do not block the lesson.

*(No motion-author task — see §3 motion decision. If the editorial gate later calls for the one flagged Manim clip, that task is created then, not now.)*

---

## 8. Review checklist (pedagogy-architect, pipeline step 4 — against THIS spec)

Bounce the authored lesson/items back if any of these drift:
- **Boundary held (§0.4):** damped case → ODE established but **not solved**; **no** pseudo-période as `f(R,L,C)`, **no** damping coefficient/decrement/closed-form envelope; closed form **only** undamped (`q(t)`, `T₀=2π√(LC)`); **no** résonance/impédance/phaseurs/complex/AC-power anywhere; entretien framed as Joule-loss compensation restoring the FREE regime at `T₀`, never as a forced regime.
- All 8 misconceptions present in the inventory the items target; **≥3 items each** (or the harness count stated); habileté mix ≈ 50/35/15; co-attributions **dual-tagged**, not hidden.
- **No correct-answer contamination** on any stem; M6's correct answer states the establish-only rule.
- **C1/C3 are svg+katex** (no Gemini structural art); the schematic topology and traces are exact; C2 is a Falstad/GeoGebra **embed** (not rebuilt) with the boundary guard on.
- **Hook→entretien arc closed** (R0 "perpetual swing / where does the energy go" resolved at R3–R4 and R7).
- All three PC modes present (conceptual / procedural / experimental); R3 (R-is-the-brake) and R5 (establish-and-stop) are paced, not rushed.
- Everything student-facing is French, voice-ready, KaTeX-rendered.

---

## 9. Open items for the human (validation / editorial gate)

1. ⚠ **Misconception completeness** — are these the 8 where PC students actually fail on RLC, or is one missing / one not real? (The human's teaching experience is the authority the agent must not fabricate.) In particular: is **M5** best as one misconception spanning both "no period" and "exactly equals `T₀`", or split into two?
2. ⚠ **M3 / M4 granularity** — is splitting "R changes the rate" (M3, behavioural) from "`T₀` formula contains R" (M4, the formula) the right grain, or should they be one?
3. ⚠ **Notation** — confirm the Moroccan PC manuels' conventions: `q(t)` vs `u_C(t)` as the primary variable for the ODE; `T₀` vs `T_0` glyph; bobine modelled as ideal (L) or realistic (L, r). The spec leads with `q` for the ODE and mentions `r`; confirm.
4. ⚠ **Real past-bac items (R8)** — the recovered `034_exam_papers_pc.sql` provenance is unverified (mining report §3); genuine year+session national-exam RLC questions must be sourced and **screened against the boundary** (reject forced-regime/impédance items).
5. ⚠ **Manim** — confirm the §3 decision to NOT build a motion clip (manipulable + static diagram suffice). The one flagged future candidate (antiphase energy clip) is held for the human's call.
6. **Skill code/UUID** (§0, header) — supabase-architect confirms the live `rlc_serie` `skills.id` before any step-7 migration; do **not** reuse the old `pc_rlc_oscillations` code.

---

### Sources consulted (scope verification)
- **Curriculum boundary (authoritative):** `docs/cadre/curriculum/pc-physique-chimie.yaml` → `physique/electricite/rlc_serie` (savoir_faire, limites) + `electricite` (exclusions, poids, habiletes). Cadre de référence 2025, Sciences Physiques / Physique-Chimie.
- **Carried-forward boundary:** `docs/cadre/validation/rlc-scope-check.md` (limites/exclusions/targets extracted).
- **Archive mining (reference only, no prose reused):** `docs/cadre/validation/rlc-mining-report.md`; worked NUMBERS from `backend/supabase/migrations/033_long_lessons_pc.sql` (RC/RL/RLC seeds); behaviour reference `mobile/bac_app/lib/widgets/physics/rlc_simulator_widget.dart`.
- **Standard:** `docs/Product/VISION.md` (notion anatomy; PC confront-the-model profile), `docs/Product/DESIGN-BIBLE.md` §3 (typography/KaTeX) + §6 (visual language), ADR 0017 (media taxonomy), ADR 0007/0008/0009/0011 (misconception schema + authoring conventions + coverage floor + dual-tagging).
