# Pedagogy spec-EXTENSION — Systèmes oscillants (PC · 2ème Bac) — CADRE RE-SCOPING CORRECTION

> **Notion:** Systèmes oscillants (mechanical oscillators)
> **Subject / stream:** Physique-Chimie — Sciences Physiques (PC), 2ème Bac
> **Curriculum path:** `domaines → physique → sous_domaines → mecanique → chapitres → systemes_oscillants` (`docs/cadre/curriculum/pc-physique-chimie.yaml`)
> **`skills.code` target:** `systemes_oscillants` (the cadre chapitre id).
> **This is an EXTENSION spec, not a fresh spec.** The lesson exists (`lesson.md`, R0–R7) and is largely correct. It is **mis-scoped in ONE place (R6)** and **couples with `aspects-energetiques` on the oscillator-energy topic (R5)**. This file specifies exactly what to KEEP / REFOCUS / REMOVE / ADD. Do **not** touch `lesson.md` / `items.yaml` here — those are edited in a later pipeline step against this spec.
> **Coupled file:** `content/pc/aspects-energetiques/spec-extension.md`. Read both; §8 (reconciliation) is shared and load-bearing.
> **Language policy:** meta is English; **every student-facing string** (prose, stems, choices, feedback, misconception labels) is authored in **French**. The French exemplars below are the register and substance to copy, not placeholders to translate.
>
> ## ⚠ VALIDATION STATUS — NOT YET HUMAN-VALIDATED
> Phases 1–3 are human-gated. This was produced from the cadre + the existing lessons. The human holds the SM/Sciences-Physiques bacs and knows where PC students actually fail on résonance and amortissement; that judgment has **not** been applied yet. Treat every misconception, difficulty placement, and especially the résonance scope line as *proposed*.

---

## 0. The mis-scoping, diagnosed

### 0.1 What the cadre assigns this chapitre
`systemes_oscillants.programme` ends with: *"phénomène de résonance (présentation expérimentale : excitateur, résonateur, influence de l'amortissement)."* Its `savoir_faire` includes: *"RÉSONANCE : reconnaître excitateur, résonateur, résonance mécanique et conditions de production ; reconnaître l'influence de l'amortissement sur les régimes de résonance."* The cadre TP list carries *"Résonance mécanique → influence de la période de l'excitateur sur l'amplitude ; influence de l'amortissement."*

**The cadre assigns this chapter RÉSONANCE MÉCANIQUE. It does NOT assign it "entretien des oscillations."**

### 0.2 What R6 currently teaches (the defect)
Current R6 = *"L'amortissement et l'entretien des oscillations."* The **amortissement** half is in scope. The **entretien** half is **out of scope for this chapitre** — *entretien des oscillations* is listed in the cadre under **`electricite → rlc_serie`** (`savoir_faire`: *"Connaître le rôle du dispositif d'entretien… Établir l'équation différentielle d'un RLC entretenu…"*), and the current R6 even closes on the RLC-generator analogy. **Entretien is an électricité/RLC deliverable that has leaked into the mécanique chapter.** Meanwhile the cadre's actual mécanique deliverable — **résonance** — is entirely **absent** from the lesson.

**Net defect:** R6 teaches an off-cadre topic (entretien) and the chapter omits an in-cadre topic (résonance).

### 0.3 The fix (three moves)
1. **REFOCUS R6** → *amortissement* only (three regimes: pseudo-périodique, critique, apériodique). **Remove the developed "entretien" section**; replace with a **one-line cross-reference** to `rlc_serie` (électricité), where entretien is formally treated. Do not duplicate it.
2. **ADD R7 — Résonance mécanique** (new chapter): excitateur / résonateur, condition de résonance (fexc ≈ f₀), influence de l'amortissement sur l'acuité, montage expérimental (pendule élastique excité). **Qualitative / experimental only** (LIMITE, §0.5).
3. **RE-SCOPE R5** (energy) → trim to a qualitative aperçu; the derivation of ½kx² and the quantitative energy diagrams move to `aspects-energetiques` (§8 reconciliation).

### 0.4 Chapter-count decision (asked explicitly)
- **R6 is edited IN PLACE** (amortissement refocused — no new chapter for the refocus).
- **Résonance is a NEW chapter R7** (not folded into R6): it carries its own `savoir_faire` + its own TP + three misconceptions, and is distinct enough that cramming it into an "amortissement + résonance" chapter would violate one-idea-per-beat (DESIGN-BIBLE §7).
- The former **R7 "Pour t'entraîner" becomes R8** (renumber).
- **R5 is edited in place** (trimmed, no count change).

**NET CHAPTER DELTA for systemes-oscillants: +1** (from 8 headings R0–R7 to 9 headings R0–R8). The +1 is the new résonance chapter; everything else is in-place edit or renumber.

### 0.5 HARD scope boundaries — NON-NEGOTIABLE (carried from `systemes_oscillants.limites` + `mecanique.exclusions`)

**LIMITE — RÉSONANCE is QUALITATIVE / EXPERIMENTAL.** *(cadre: "RÉSONANCE : traitement EXPÉRIMENTAL/qualitatif ; pas d'étude analytique du régime forcé.")* R7 may:
- name excitateur / résonateur, state the condition fexc ≈ f₀, sketch the **experimental** resonance curve (amplitude vs fexc) and how damping sharpens/broadens it.
It may **NOT**: solve the forced-regime differential equation; give a closed-form resonance amplitude A(ω); introduce a facteur de qualité Q quantitatively; plot a *theoretical* resonance curve; write any driven-oscillator phase lag φ(ω). **No forced-regime ODE, ever.**

**LIMITE — AMORTISSEMENT: establish the ODE only.** *(cadre: the closed-form solution is required "que dans le cas NON amorti".)* R6 keeps the current honest posture: establish `m·ẍ + h·ẋ + k·x = 0`, then **stop** — describe the regimes qualitatively/energetically/experimentally. **No** closed-form damped solution, **no** décrément logarithmique, **no** pseudo-période as a function of (m, h, k).

**LIMITE — pendule pesant: PETITES oscillations only** (sinθ ≈ θ). Already respected in R3; unchanged.

**EXCLUSIONS (on the `mecanique` sous-domaine; apply here):**
- *"Régime sinusoïdal forcé analytique des oscillateurs (amplitude de résonance, facteur de qualité, déphasage)"* — this is the exact line R7 must not cross.
- *Entretien des oscillations* is **not** excluded physics, but per the cadre it is **scoped to `electricite/rlc_serie`, not here.** Mechanical entretien (e.g. the watch escapement, currently in R6) exists physically but is **out of THIS chapitre's scope**; cross-reference RLC rather than teach it. **Do not silently override the cadre boundary** — if the human judges mechanical entretien belongs in mécanique too, that is a cadre-correction flag (§9), not an author decision.

### 0.6 Exam-weight targets to design items to (cite into `items.yaml`)
- **`mecanique.poids.part_examen` = 27 %** of the whole exam — **rang physique 1**, the heaviest physics sous-domaine. Résonance and amortissement items are high-value; the bank should be generous and bac-realistic.
- **Habiletés mix (exam-wide, cadre p.18-19):** Utilisation ≈ **50 %** / Application expérimentale ≈ **15 %** / Résolution ≈ **35 %**. Résonance is dominated by **Utilisation** (recognise excitateur/résonateur, state the condition) and **Application expérimentale** (read a resonance curve / a TP amplitude-vs-frequency table). Tag items so the mix is checkable.

---

## 1. R5 — RE-SCOPE (energy aperçu, coupled with aspects-energetiques)

### 1.1 What R5 currently does (the coupling problem)
Current R5 = *"Les aspects énergétiques : la conservation de l'énergie mécanique."* It:
- **asserts** `E_pe = ½kx²` (with a forward-note "établie au chapitre travail et énergie"),
- proves `E_m = ½kX_m²` constant via `sin²+cos²=1`,
- draws the Ec↔Epe exchange (the RLC "pendule d'énergie" analogue),
- runs a numeric `E_m` example,
- states pendule simple/pesant use `E_p` de pesanteur.

This is the **oscillator-energy topic that the cadre puts in the SEPARATE `aspects_energetiques` chapitre.** Keeping the full quantitative treatment here *and* building the full treatment in `aspects-energetiques` = duplication. Deriving ½kx² there while asserting it here is fine ONLY if the two never contradict.

### 1.2 Decision — trim R5 to a QUALITATIVE aperçu
Keep R5 as a chapter (it motivates R6/R7), but re-scope it:
- **KEEP (qualitative):** the two-reservoir picture (Ec = énergie cinétique du solide ; Epe = énergie stockée dans le ressort) named as **results, not derived**; the **Ec↔Epe exchange** narrative (the RLC "pendule d'énergie" analogue) — this is what makes amortissement (R6, "le frottement fait fuir cette énergie") and résonance (R7, "l'excitateur en réinjecte") intelligible; the one-line statement that pendule simple/pesant swap Epe élastique for Ep de pesanteur.
- **STATE, don't derive:** `E_pe = ½kx²` — with an **explicit forward-reference**: *"L'expression `½kx²` et la démonstration de la conservation de `E_m` sont établies au chapitre **Aspects énergétiques** ; ici on ne s'en sert que pour suivre où va l'énergie."*
- **REMOVE from R5 (moves to aspects-energetiques):** the formal `E_m = ½kX_m²` constancy proof via `sin²+cos²`; the quantitative energy **diagrams** (Ec, Ep, Em vs t and vs x); the numeric `E_m` computation. These are aspects-energetiques' job (§8).
- **Media:** `energie-oscillateur.svg` **stays** in R5 as a *qualitative* exchange illustration (Ec↔Epe, antiphase, quarter-period offset); the **quantitative** energy-vs-position / energy-vs-time diagrams are authored fresh in `aspects-energetiques`. No duplicate quantitative diagram here.

R5 stays `structural-diagram` / `svg+katex` for its one figure. No item changes required for R5 beyond removing any item that tests the *quantitative* `E_m` value (those migrate to aspects-energetiques); a qualitative "where is the energy at x=0 / x=±Xm" item may remain here.

---

## 2. R6 — REFOCUS: Amortissement (three regimes), entretien removed

### 2.1 R-heading + objective
**R6 — L'amortissement : quand le frottement fait décroître les oscillations.**
Objective: the student recognises the three amortissement regimes from an `x(t)` diagram, knows that friction **dissipates** mechanical energy (never supplies it), knows that for weak damping the **pseudo-période T ≈ T₀**, and knows that establishing the damped ODE is as far as the analysis goes (LIMITE). Entretien is named once and **handed off** to the RLC chapter.

### 2.2 What to KEEP (from current R6)
- The damped ODE establishment: `−k·x − h·ẋ = m·ẍ` → `m·ẍ + h·ẋ + k·x = 0`, then **stop** (LIMITE). Keep the honest "on établit et on s'arrête là" framing — it is the boundary taught as pedagogy, exactly like RLC.
- The energy sentence: friction dissipates `E_m` as heat (microscopic analogue of effet Joule), so amplitude decays cycle after cycle.
- The `ressort-sandbox` manipulable to show the regimes live.

### 2.3 What to CHANGE
- **Regime naming — align to the cadre's damping regimes.** Present the **régime périodique** as the *idealised, frictionless* case already studied (R1–R2), i.e. **not** an amortissement regime. The amortissement regimes proper are:
  - **Pseudo-périodique** (amortissement faible) : le solide oscille encore, l'amplitude décroît à chaque aller-retour ; la **pseudo-période T ≈ T₀** (amortissement faible). *[This reconciles the cadre's "deux types d'amortissement" (oscillant vs non-oscillant) with the mission's three-regime naming: the two behavioural types are pseudo-périodique (oscillates) and apériodique (does not); the critique is the boundary between them.]*
  - **Régime critique** : le **retour le plus rapide à l'équilibre SANS oscillation** — le cas-limite qui sépare le pseudo-périodique de l'apériodique. **ADD this** (currently absent).
  - **Apériodique** (amortissement fort) : retour lent à l'équilibre, sans oscillation, **plus lent** que le critique.
- **REMOVE the "Entretenir les oscillations" subsection** (the watch-escapement + RLC-generator development). Replace with a single cross-reference sentence: *"Peut-on compenser cette perte pour entretenir les oscillations ? Oui — mais ce dispositif d'entretien est étudié en détail au chapitre **Oscillations libres dans un circuit RLC** (électricité), où l'on établit l'équation d'un oscillateur entretenu ; le principe (restituer à chaque cycle l'énergie dissipée) y est le même."* Nothing more here.

### 2.4 Mechanism to make obvious (why, not what)
- **Why amplitude decays but rhythm barely changes (weak damping):** the frictional term `h·ẋ` only removes a small slice of energy per swing; the restoring term `k·x` (which sets the rhythm) is untouched, so the peak-to-peak spacing stays ≈ T₀ while the peak *height* shrinks. **Rhythm ← rappel (k, m); amplitude decay ← friction (h).** Two separate effects — do not let the student fuse them.
- **Why critique ≠ apériodique:** more friction is not "always slower to settle." Below critical, the system overshoots and oscillates (pseudo-périodique). At critical, it returns fastest without overshoot. Above critical (apériodique), the heavy friction *itself* slows the return — the system crawls back. So the return time is **minimal at critical**, longer on both sides for different reasons.
- **Why friction never restores energy:** `W(f⃗) = f⃗·displacement < 0` always (friction opposes motion) — it is a pure sink. An oscillator left alone can only lose. Restoring energy requires an **external device** (entretien — RLC chapter). This sentence is also the clean boundary between amortissement (this chapter) and entretien (RLC).

### 2.5 Misconceptions confronted at R6

**M-OSC-AMO-1 — « L'amortissement change la période (l'amplitude décroît, donc la période aussi). »**
- *Wrong model:* fuses amplitude decay with period change; thinks a damped oscillator's rhythm is strongly altered by friction.
- *Manifests:* on a pseudo-periodic trace, reads the shrinking amplitude as a shrinking (or growing) period; refuses to accept T ≈ T₀.
- *Correct model:* pour un **amortissement faible**, la pseudo-période **T ≈ T₀ = 2π√(m/k)** ; l'amplitude décroît, mais l'espacement entre deux passages par un même extrême reste ≈ celui de la période propre. (Kept inside the LIMITE: T ≈ T₀ stated, **not** derived as a function of h.)
- *Confrontation:* manipulable — hold m, k fixed, raise h. Predict "the oscillations speed up / slow down." Reveal: peak *spacing* stays essentially constant while peak *height* shrinks. Separate the two effects on screen.

**M-OSC-AMO-2 — « Le régime critique oscille encore » / « l'apériodique revient plus vite que le critique ».**
- *Wrong model:* orders the regimes by "more friction = more sluggish oscillation," so critique is imagined as a slow oscillation, and apériodique as the fastest return.
- *Manifests:* labels a monotonic-return trace "pseudo-périodique"; claims apériodique settles faster than critique.
- *Correct model:* **pseudo-périodique** oscille en s'amortissant ; **critique** = retour le plus rapide **sans** osciller (cas-limite) ; **apériodique** = retour **plus lent**, sans osciller. Le retour est **le plus rapide au régime critique**.
- *Confrontation:* three `x(t)` traces side by side (structural diagram); mark the settling time on each; show it is minimal at critique.

**M-OSC-AMO-3 — « Un oscillateur amorti finit par se relancer / l'amortissement fournit ou entretient l'énergie. »**
- *Wrong model:* no clean "friction is a pure sink" picture; conflates amortissement with entretien (the very topic being removed) — thinks the system tops itself back up.
- *Manifests:* predicts the amplitude eventually grows again; says friction "maintains" the motion; expects entretien to be automatic.
- *Correct model:* le frottement **dissipe** l'énergie mécanique en chaleur, il n'en **fournit jamais** ; sans **dispositif d'entretien extérieur** (étudié en RLC), l'amplitude décroît jusqu'à l'arrêt. Amortissement = fuite ; entretien = un apport séparé, ailleurs.
- *Confrontation:* energy narrative — `E_m` decreasing monotonically (no bump upward is possible from friction alone); name the only way to reverse it (external device → RLC cross-reference).

### 2.6 Worked-example arc (R6)
Reuse the existing R8 (ex-R7) exercise question 5 (identify the pseudo-periodic regime from "regular spacing + shrinking amplitude") — it already exercises M-OSC-AMO-1/2 well. **Add** a short guided beat: given three `x(t)` sketches, name each regime and rank their settling times (targets M-OSC-AMO-2). Expert voice: *"amplitude qui décroît ET espacement régulier → pseudo-périodique ; retour direct sans dépassement, le plus rapide → critique ; retour direct mais lent → apériodique."*

### 2.7 Three diagnostic items for R6 (stem + per-distractor misconception)

**Item SO-R6-1** *(Utilisation — pseudo-période)*
Stem: « Un solide-ressort (m, k fixés) oscille sur un banc à frottement faible. On mesure l'intervalle de temps entre deux passages successifs par l'écart maximal du même côté. Comparé à la période propre `T₀ = 2π√(m/k)`, cet intervalle (la pseudo-période T) : »
- A. vaut approximativement `T₀` (amortissement faible). **[correct]**
- B. est nettement plus court, car l'amplitude diminue à chaque aller-retour. → **M-OSC-AMO-1**
- C. n'existe pas : dès qu'il y a frottement, il n'y a plus de période. → **M-OSC-AMO-1 (variante « pas de période »)**
- D. augmente d'un aller-retour au suivant. → **M-OSC-AMO-1 (variante « décroissance = dérive de la période »)**

**Item SO-R6-2** *(Application expérimentale — reconnaître les régimes)*
Stem: « On enregistre `x(t)` pour trois amortissements croissants. Le premier oscille en s'amortissant ; le troisième revient à l'équilibre sans osciller, mais lentement ; le deuxième revient à l'équilibre sans osciller, le plus rapidement possible. Quels sont, dans l'ordre, les trois régimes ? »
- A. pseudo-périodique ; critique ; apériodique. **[correct]**
- B. pseudo-périodique ; apériodique ; critique. → **M-OSC-AMO-2** (critique/apériodique inversés)
- C. périodique ; pseudo-périodique ; apériodique. → **M-OSC-AMO-2** (confond le cas idéal non amorti avec un régime d'amortissement)
- D. amorti ; critique ; forcé. → distractor bruit (vocabulaire hors-cadre : « forcé » n'est pas un régime d'oscillations libres)

**Item SO-R6-3** *(Résolution — bilan énergétique / boundary)*
Stem: « Un pendule pesant oscille avec frottement, sans aucun dispositif extérieur. Que peut-on affirmer sur son énergie mécanique `E_m` et sur son mouvement à long terme ? »
- A. `E_m` décroît (dissipée en chaleur) et l'amplitude tend vers zéro ; sans dispositif d'entretien, le mouvement s'arrête. **[correct]**
- B. `E_m` finit par réaugmenter et l'amplitude repart, car l'oscillateur s'entretient de lui-même. → **M-OSC-AMO-3**
- C. `E_m` reste constante : le frottement ne change que la période, pas l'énergie. → **M-OSC-AMO-1 + M-OSC-AMO-3** (dual-tag)
- D. `E_m` décroît, donc on peut en déduire la pseudo-période par une formule `T = f(m, h, k)`. → distractor **boundary tripwire** (LIMITE : pas de pseudo-période en forme close) — tag `hors_cadre_probe`

---

## 3. R7 — ADD: Résonance mécanique (NEW chapter)

### 3.1 R-heading + objective
**R7 — La résonance mécanique : quand on pousse au bon rythme.**
Objective: the student distinguishes **excitateur** (imposes an adjustable frequency) from **résonateur** (has a fixed own frequency f₀), states the **condition de résonance** (fexc ≈ f₀ → amplitude du résonateur maximale), and knows that **faible amortissement → résonance aiguë**, **fort amortissement → résonance floue**. **Qualitative / experimental only** (LIMITE §0.5).

### 3.2 Mechanism to make obvious (why the amplitude peaks at f₀)
- **Résonateur ≠ excitateur.** The résonateur is one of the R1–R4 systems (masse-ressort, pendule…) with a **fixed** own frequency `f₀` set by its m, k (or J, C…). The excitateur is a device (a motor / vibreur) that forces the résonateur at a frequency `fexc` the experimenter **sets and can vary**. In steady state the résonateur oscillates **at fexc** (the imposed frequency), **not** at its own f₀ — its own f₀ never changes.
- **Why amplitude is maximal at fexc ≈ f₀ (energy argument, qualitative — cadre-safe):** each period the excitateur does work on the résonateur. When `fexc ≈ f₀`, the pushes arrive **in phase** with the résonateur's natural motion — every push adds energy the same way each cycle, so amplitude **builds up large**. Off-resonance, pushes fall partly out of step and sometimes *oppose* the motion, so they add little (or remove) energy — amplitude stays small. This is a **rhythm-matching** phenomenon, not a "push harder / push faster" one.
- **Why damping controls the acuité (sharpness):** amplitude grows until the energy dissipated by friction per cycle **balances** the energy injected per cycle. **Faible amortissement** → balance reached only at very large amplitude, and only in a narrow band around f₀ → **résonance aiguë** (pic haut et étroit). **Fort amortissement** → balance reached at modest amplitude, over a wide band → **résonance floue** (pic bas et large). Damping is a brake here too — it never sharpens the peak; it flattens and widens it.
- Present the **experimental resonance curve** (amplitude of the résonateur vs fexc) as a **measured** result — a hump peaking near f₀, taller/narrower for weak damping. **Sketched from data, never derived** (LIMITE).

### 3.3 Misconceptions confronted at R7

**M-OSC-RES-1 — condition de résonance mal comprise : « la résonance se produit quand l'excitateur va le plus vite / à haute fréquence » (ou « à n'importe quelle fréquence si on attend »).**
- *Wrong model:* thinks big amplitude comes from a *fast* or *strong* excitateur, not from a *frequency match*.
- *Correct model:* l'amplitude du résonateur est **maximale quand `fexc ≈ f₀`**, la fréquence **propre** du résonateur — ni la plus haute, ni la plus basse fréquence, mais **celle qui coïncide** avec f₀.
- *Confrontation:* manipulable / resonance-curve — sweep fexc from low to high; the amplitude peaks **in the middle**, at f₀, and falls off on **both** sides. "Le plus vite" is contradicted by the fall-off above f₀.

**M-OSC-RES-2 — rôle de l'amortissement inversé : « plus l'amortissement est fort, plus la résonance est aiguë / intense ».**
- *Wrong model:* imagines damping "focuses" or intensifies the resonance.
- *Correct model:* **faible amortissement → résonance aiguë** (pic haut et étroit) ; **fort amortissement → résonance floue** (pic bas et large). L'amortissement **émousse** la résonance.
- *Confrontation:* overlay two resonance curves (weak vs strong damping) — the weak-damping curve is the tall, narrow one. Directly reverses the wrong ordering.

**M-OSC-RES-3 — excitateur / résonateur confondus : « c'est le résonateur qui impose le rythme » / « f₀ change pour se caler sur l'excitateur ».**
- *Wrong model:* no clean separation of who has the adjustable frequency (excitateur) and who has the fixed own frequency (résonateur); thinks f₀ shifts to meet fexc.
- *Correct model:* l'**excitateur impose** `fexc` (réglable) ; le **résonateur** garde sa fréquence propre `f₀` **fixe** (fixée par m, k ou J, C) ; la résonance survient quand `fexc` **rejoint** ce `f₀` fixe. f₀ ne se déplace jamais.
- *Confrontation:* two labelled objects in the montage diagram; state which frequency is a knob (fexc) and which is a fixed property (f₀); the peak sits at the *fixed* f₀ regardless of how fexc is swept.

### 3.4 Worked-example arc (R7)
Predict-then-reveal, experimental. Present a **TP table**: résonateur amplitude measured at fexc = 0.5 f₀, 0.8 f₀, 0.95 f₀, 1.0 f₀, 1.1 f₀, 1.5 f₀, for two damping settings. Ask the student to (i) locate the resonance, (ii) state at which fexc the résonateur oscillates biggest, (iii) say which column (damping) gives the sharper peak. Expert voice: *"on ne cherche pas une formule d'amplitude — on lit le tableau : l'amplitude culmine là où fexc rejoint f₀, et le pic est plus pointu quand l'amortissement est faible."* This is squarely the **Application expérimentale** habileté (15 % target).

### 3.5 Three diagnostic items for R7 (stem + per-distractor misconception)

**Item SO-R7-1** *(Utilisation — condition de résonance)*
Stem: « Un résonateur de fréquence propre `f₀` est forcé par un excitateur de fréquence `fexc` réglable. Pour quelle valeur de `fexc` l'amplitude des oscillations du résonateur est-elle maximale ? »
- A. `fexc ≈ f₀`. **[correct]**
- B. Pour `fexc` la plus grande possible. → **M-OSC-RES-1**
- C. Pour n'importe quelle `fexc`, si on attend assez longtemps. → **M-OSC-RES-1 (variante « n'importe quelle fréquence »)**
- D. Pour `fexc` la plus petite possible. → distractor symétrique de B (bruit orienté)

**Item SO-R7-2** *(Application expérimentale — influence de l'amortissement)*
Stem: « On trace, pour un même résonateur, la courbe amplitude = f(fexc) dans deux conditions : (1) frottements faibles, (2) frottements forts. Laquelle des deux courbes présente le pic le plus haut et le plus étroit, et comment nomme-t-on cette résonance ? »
- A. La courbe à frottements faibles ; résonance aiguë. **[correct]**
- B. La courbe à frottements forts ; résonance aiguë. → **M-OSC-RES-2**
- C. La courbe à frottements forts, car un fort amortissement concentre l'énergie sur f₀. → **M-OSC-RES-2 (avec justification erronée)**
- D. Les deux courbes ont le même pic ; l'amortissement ne change que la position de f₀. → **M-OSC-RES-2 + M-OSC-RES-3** (dual-tag : amortissement inversé + f₀ « déplaçable »)

**Item SO-R7-3** *(Utilisation — excitateur vs résonateur)*
Stem: « À la résonance, on observe que le résonateur oscille avec une très grande amplitude. Que peut-on dire des fréquences en jeu ? »
- A. Le résonateur oscille à la fréquence imposée par l'excitateur (`fexc`), et cette `fexc` est proche de sa fréquence propre `f₀`, qui elle reste fixe. **[correct]**
- B. Le résonateur oscille à sa fréquence propre `f₀`, qui a augmenté pour rejoindre celle de l'excitateur. → **M-OSC-RES-3**
- C. C'est le résonateur qui impose sa fréquence à l'excitateur. → **M-OSC-RES-3 (variante rôle inversé)**
- D. Les deux oscillent à des fréquences sans rapport ; la grande amplitude vient de la puissance de l'excitateur. → **M-OSC-RES-1 + M-OSC-RES-3** (dual-tag)

---

## 4. Media / interactive callouts (typed per ADR 0017)

Only what the new/changed content needs. Existing R0–R5 figures are unchanged except `energie-oscillateur.svg` (R5 stays qualitative, §1.2).

### C-AMO-1 — Three amortissement regimes, `x(t)` traces — REQUIRED (R6)
- **Type:** `structural-diagram` · **Tool:** `svg+katex` — **never gemini** (exact curve shapes + regime labels + settling-time marks carry the meaning).
- Must show three `x(t)` curves: **pseudo-périodique** (decaying oscillation, pseudo-période T marked between two same-side extrema, T ≈ T₀ noted), **critique** (fastest monotonic return to 0, no overshoot), **apériodique** (slow monotonic return). Mark the **settling time** on each so the "critique = fastest" point is visible. KaTeX for axes and `T₀`. Flat, muted, single accent (DESIGN-BIBLE §6).

### C-AMO-2 — the existing `ressort-sandbox` manipulable, reused at R6 — REQUIRED
- **Type:** `manipulable` · **Tool:** `geogebra/desmos/falstad/phet` (embed; do not rebuild).
- Behaviour: raise the damping → watch peak spacing stay ≈ constant while peaks shrink, then the transition pseudo-périodique → critique → apériodique. This is the M-OSC-AMO-1/2 confrontation engine. **Boundary guard:** free/damped oscillations only — **no forced-frequency sweep** here (that belongs to C-RES-1 at R7, and even there stays qualitative).

### C-RES-1 — Resonance manipulable (amplitude vs driving frequency, damping slider) — REQUIRED (R7)
- **Type:** `manipulable` · **Tool:** `geogebra/desmos/falstad/phet` (embed) — the PhET *Resonance* sim (a driven masse-ressort array) or a GeoGebra amplitude-vs-fexc applet with a damping slider.
- Behaviour the embed must have: an **adjustable driving frequency** `fexc`; the résonateur amplitude responds, **peaking at f₀**; a **damping control** that makes the peak **taller/narrower (weak)** or **lower/broader (strong)**. This is the M-OSC-RES-1/2/3 engine.
- **Boundary guard (non-negotiable, LIMITE §0.5):** expose only **amplitude vs frequency** and the **damping-on-acuité** behaviour. **Hide/disable any Q-factor readout, phase-lag plot, or closed-form A(ω) fit** — those are the excluded forced-regime analytics. The sim is used to *observe* the resonance curve, never to *derive* it.

### C-RES-2 — Montage excitateur/résonateur + experimental resonance curve — REQUIRED (R7)
- **Type:** `structural-diagram` · **Tool:** `svg+katex` — never gemini (the montage topology and the labelled curve carry exact meaning).
- Must show: a **pendule élastique (masse-ressort) driven by a vibreur/excentrique** at adjustable frequency (excitateur clearly labelled, résonateur clearly labelled, f₀ marked as a fixed property of the masse-ressort); alongside, the **experimental resonance curve** amplitude = f(fexc) with **two overlaid curves** (weak vs strong damping), the peak at f₀ marked, "aiguë" vs "floue" labelled. KaTeX for `fexc`, `f₀`, amplitude axis.

### C-RES-3 — Hook image for résonance — OPTIONAL, light (R7)
- **Type:** `atmospheric-illustration` · **Tool:** `gemini` (with the DESIGN-BIBLE style preamble appended verbatim).
- A calm, evocative scene of *rhythmic pushing at the right cadence* — e.g. a child on a swing being pushed in time, or an abstract "small pushes building a big swing" motif. **Mood only: zero graph, zero numbers, zero labels, no equations, no montage structure** (all structure → C-RES-2, code). Cut it if it risks stimulation over comprehension (VISION).

---

## 5. Build spec — for content-author (edits `lesson.md`)

**Profile:** PC — **confront the wrong model** (predict-then-reveal). Résonance is intuition-heavy: students arrive with "push harder/faster = bigger" and "damping focuses resonance." A clean statement will not displace them — stage the contradiction (C-RES-1 sweep; the two-curve overlay).

**Do, in order:**
1. **R5 — trim to qualitative aperçu** (§1.2): keep the reservoir + exchange narrative; **state** `½kx²` with the forward-reference to Aspects énergétiques; **remove** the `sin²+cos²` proof, the quantitative diagrams, and the numeric `E_m` (they move to aspects-energetiques). Keep `energie-oscillateur.svg` as a qualitative figure.
2. **R6 — refocus to amortissement** (§2): keep the damped-ODE establishment (and the "on s'arrête là" boundary posture); add the **régime critique** and align the regime naming (§2.3); **delete the entretien development**, replace with the one-line RLC cross-reference (§2.3). Wire C-AMO-1 + reuse `ressort-sandbox`.
3. **R7 — write résonance fresh** (§3): excitateur/résonateur, condition fexc ≈ f₀, acuité vs amortissement, TP montage. **Qualitative/experimental only** — no forced-regime ODE, no A(ω), no Q. Wire C-RES-1, C-RES-2, optional C-RES-3. Close with the experimental resonance-curve reading (§3.4).
4. **Renumber** the old R7 "Pour t'entraîner" → **R8**; add résonance + amortissement-regime exercises to its "À toi" set.

**Hard rules:**
- **French, voice-ready; KaTeX for all math** (DESIGN-BIBLE §3).
- **RESPECT THE BOUNDARY (§0.5) absolutely:** résonance qualitative/experimental — **no** forced-regime differential solution, **no** closed-form resonance amplitude, **no** facteur de qualité, **no** theoretical resonance curve, **no** driven-oscillator phase lag. Amortissement — establish the ODE and stop; **no** closed-form damped solution, **no** pseudo-période as f(m,h,k).
- **Entretien is NOT taught here** — one cross-reference sentence to `rlc_serie`, nothing more. Do not re-import the RLC-generator equation.
- **Do not derive `½kx²` here** — it is derived in aspects-energetiques (§8). State it with the forward-reference only.
- **Structural media → svg+katex, never gemini** (C-AMO-1, C-RES-2). Manipulables are embeds (C-AMO-2, C-RES-1), not rebuilt, with the boundary guard on.

## 6. Build spec — for item-author (edits `items.yaml`)

- **Coverage floor:** **≥3 items per misconception** before its `exhibited_count` is confidence-bearing (VISION; ADR 0011). New/changed misconceptions here: **M-OSC-AMO-1, -2, -3** (R6) and **M-OSC-RES-1, -2, -3** (R7) → **≥18 items** to floor across these six, ceiling 6/misconception. The §2.7 / §3.5 items are the canonical firsts; add ≥2 structural variants each (different system dress: masse-ressort vs pendule vs torsion; trace vs table vs curve).
- **Note:** `items.yaml` currently has `misconceptions: []` and no amortissement/résonance items — the whole R6/R7 misconception set is **net-new**; add the six misconception records with French `{label, description, contradicts_principle}` and encode per ADR 0008/0009.
- **Habileté mix (§0.6):** résonance skews **Utilisation** (condition, roles) + **Application expérimentale** (read the resonance curve / TP table); amortissement skews **Utilisation** (recognise regimes) + some **Résolution** (energy bilan). Tag `document_experimental` on the curve/table items. Aim overall ≈ 50 / 15 / 35.
- **Stem-defect discipline:** *correct-answer contamination* (a stem letting a wrong model reach the **correct** choice) = defect → revise the stem. *Cross-misconception co-attribution* (one distractor reachable by two wrong models) = **not** a defect → **dual-tag** (already flagged: SO-R6-3/C = AMO-1+AMO-3; SO-R7-2/D = RES-2+RES-3; SO-R7-3/D = RES-1+RES-3).
- **Boundary discipline for items:** **no** item may require/reward a forced-regime solution, an A(ω) formula, a Q-factor, a closed-form damped solution, or a pseudo-période computed as f(m,h,k). The `hors_cadre_probe` distractor (SO-R6-3/D) is a *trap that must be the WRONG answer*, never the key.

## 7. Review checklist (pedagogy-architect, against this spec)
Bounce back if any drift:
- R6 = amortissement only; **entretien removed** and replaced by the RLC cross-reference; régime **critique** present; regime naming per §2.3.
- R7 exists, is **qualitative/experimental**; **no** forced-regime ODE / A(ω) / Q / theoretical curve / phase lag anywhere.
- R5 trimmed to qualitative; `½kx²` **stated with forward-reference**, not derived; quantitative energy diagrams **absent here** (they are in aspects-energetiques).
- Six new misconceptions present with ≥3 items each; dual-tags applied; boundary-probe distractor is never the key.
- Structural media are svg+katex (C-AMO-1, C-RES-2); manipulables are embeds with boundary guards (C-AMO-2, C-RES-1).
- Chapter count = 9 (R0–R8); net delta +1.

## 8. RECONCILIATION with aspects-energetiques (shared, load-bearing)
See the identical §8 in `content/pc/aspects-energetiques/spec-extension.md`. In one line for this file:
> **`½kx²` (élastique) and `½Cθ²` (torsion) are DERIVED exactly once — in `aspects-energetiques` — their cadre home. `systemes-oscillants` R5 only STATES `½kx²` (qualitative use, energy-exchange picture) with an explicit forward-reference, and NEVER derives it, NEVER builds the quantitative energy diagrams or the `E_m = ½kX_m²` conservation proof. Same notation (`k`, `x`, `E_pe=½kx²`; `C`, `θ`, `E_p,torsion=½Cθ²`) and same sign convention (`W(F_rappel) = −ΔE_p`) across both lessons — no duplication, no contradiction.**

## 9. Open items for the human (validation gate)
1. ⚠ **Résonance misconceptions** — are RES-1/2/3 the three where PC students actually fail, and is "the résonateur oscillates at fexc, not f₀" (in RES-3 correct answer) safely inside the *qualitative* treatment the Moroccan bac expects, or should it be softened to just "condition fexc ≈ f₀"?
2. ⚠ **Régime critique naming** — confirm the Moroccan manuels present three regimes (pseudo-périodique / critique / apériodique) vs the cadre's "deux types d'amortissement"; confirm "critique" is expected at bac or is illustrative-only.
3. ⚠ **Mechanical entretien** — the cadre scopes entretien to `rlc_serie`. Confirm mechanical entretien (watch escapement) is genuinely out of THIS chapter's scope (cross-reference only), or flag as a cadre-correction if the human judges it belongs in mécanique too.
4. **Montage de résonance** — confirm the preferred TP (pendule élastique driven by vibreur vs pendules couplés / Barton) for C-RES-2.

### Sources consulted
- **Curriculum boundary (authoritative):** `docs/cadre/curriculum/pc-physique-chimie.yaml` → `physique/mecanique/systemes_oscillants` (programme, savoir_faire, limites) + `mecanique` (exclusions, poids, habiletes, travaux_pratiques).
- **Existing lesson:** `content/pc/systemes-oscillants/lesson.md` (R0–R7), `items.yaml`.
- **Coupled cadre home for energy:** `physique/mecanique/aspects_energetiques` (savoir_faire) — see coupled spec.
- **Format reference:** `content/pc/rlc-serie/spec.md` (spec conventions, language policy, ADR references).
- **Standard:** VISION (notion anatomy; PC confront-the-model profile), DESIGN-BIBLE §3/§6/§7, ADR 0017 (media taxonomy), ADR 0008/0009/0011 (misconception schema, coverage floor, dual-tagging).
