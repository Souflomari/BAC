# Pedagogy spec-EXTENSION — Aspects énergétiques (PC · 2ème Bac) — CADRE RE-SCOPING CORRECTION

> **Notion:** Aspects énergétiques des systèmes mécaniques (oscillator energy)
> **Subject / stream:** Physique-Chimie — Sciences Physiques (PC), 2ème Bac
> **Curriculum path:** `domaines → physique → sous_domaines → mecanique → chapitres → aspects_energetiques` (`docs/cadre/curriculum/pc-physique-chimie.yaml`)
> **`skills.code` target:** `aspects_energetiques` (the cadre chapitre id).
> **This is an EXTENSION spec, not a fresh spec.** The lesson exists (`lesson.md`, R0–R6) but **teaches the WRONG thing for its cadre slot**: it delivers generic 1ère-Bac TEC + gravitational energy, while the cadre assigns this chapitre the **energy of the oscillators** (élastique, torsion, pesant). This file specifies the recentering. Do **not** touch `lesson.md` / `items.yaml` here.
> **Coupled file:** `content/pc/systemes-oscillants/spec-extension.md`. Read both; §8 (reconciliation) is shared and load-bearing — it decides where `½kx²` and `½Cθ²` live.
> **Language policy:** meta is English; **every student-facing string** (prose, stems, choices, feedback, misconception labels) is authored in **French**.
>
> ## ⚠ VALIDATION STATUS — NOT YET HUMAN-VALIDATED
> Phases 1–3 are human-gated. Produced from the cadre + the existing lessons; the human's SM/Sciences-Physiques teaching judgment has **not** been applied. Treat the "how much generic-TEC to keep" decision and every misconception as *proposed*.

---

## 0. The mis-scoping, diagnosed

### 0.1 What the cadre assigns this chapitre
`aspects_energetiques.programme`: *"Travail d'une force de ressort, énergie potentielle élastique, énergie mécanique (solide-ressort) ; énergie potentielle de torsion et énergie mécanique (pendule de torsion) ; énergie mécanique d'un pendule pesant."* Its four `savoir_faire`:
1. Déterminer le **travail d'une force de ressort** ; connaître/exploiter l'**énergie potentielle élastique** et la relation travail/ΔEp élastique.
2. Connaître/exploiter l'**énergie mécanique (solide-ressort)** ; conservation/non-conservation ; **diagrammes d'énergie**.
3. **TORSION** : travail du couple ; **énergie potentielle de torsion** ; énergie mécanique ; conservation/non ; diagrammes.
4. **PENDULE PESANT** : Ep de pesanteur + Ec → énergie mécanique (petites oscillations) ; conservation.

**This chapitre is about OSCILLATOR energy** — spring PE `½kx²`, torsion PE `½Cθ²`, the mechanical energy of the three pendulums, and their **energy diagrams**.

### 0.2 What the lesson currently teaches (the defect)
Current R0–R6 = generic **1ère-Bac** material: Ec = ½mv² (R1), TEC (R2), travail du poids indépendant du chemin + Epp = mgz (R3), Em = Ec + Epp conservation (R4), TEC vs 2e loi de Newton on an inclined plane (R5), entraînement (R6). **There is NO `½kx²` derivation, NO torsion energy `½Cθ²` (absent from the entire corpus), NO oscillator energy diagrams.** The chapter delivers the *prerequisites* to its cadre topic and then stops before the topic itself.

**Net defect:** the cadre's four oscillator-energy savoir_faire are essentially **all missing**; the lesson is foundation without the building.

### 0.3 The fix — recenter onto oscillator energy
Keep the generic energy tools as a **compressed foundation** (they are genuine prerequisites the oscillator derivations build on), **drop** the off-cadre TEC-vs-Newton comparison, and **add** three oscillator-energy chapters that **derive** `½kx²` and `½Cθ²` (currently only asserted / absent) and build the energy diagrams.

### 0.4 Decision — how much generic-TEC prose to KEEP vs REPLACE (asked explicitly)
- **KEEP as compressed foundation (current R1–R4):** Ec = ½mv² (R1); **travail d'une force + TEC** (R2) — genuinely needed, and **extend it** to the **work of a VARIABLE force** (the spring force `kx` is not constant — this is the hinge for deriving `½kx²`); travail du poids indépendant du chemin + Epp = mgz (R3) — needed for the pendule pesant energy; Em = Ec + Epp, conservation/non-conservation with friction (R4). Compress the prose (these are 1ère-Bac recalls, not the 2ème-Bac heart) but keep the mechanism intact.
- **REPLACE / DROP:** old **R5 (TEC vs 2e loi de Newton, plan incliné)** — a generic method-comparison that does **not** serve oscillator energy. Fold its single useful insight ("choisir l'outil : le TEC va droit à la vitesse quand on ne veut ni le temps ni l'accélération") into a **two-line note inside R4**. Retire the `plan-incline-travaux.svg` figure (or repurpose).
- **REPLACE:** the entraînement's generic ski/incline exercises → **oscillator-energy** exercises (spring, torsion, pendulum energy bilans + energy-diagram reading).

### 0.5 New chapter structure + chapter-count delta
| Rung | Status | Content |
|---|---|---|
| R0 | KEEP + bridge | Hook (two balls / two tracks) — motivates path-independence & the energy shortcut → foundation for Epp. Add a closing bridge: *"…et cet outil énergétique, on va surtout s'en servir pour les oscillateurs — ressort, torsion, pendule — où il rend limpide un va-et-vient qu'aucune équation horaire ne montre aussi bien."* |
| R1 | KEEP (compress) | Ec = ½mv² |
| R2 | KEEP (compress + EXTEND) | Travail d'une force + TEC ; **extend to the work of a VARIABLE force = aire sous la courbe F(x)** (the hinge for R5) |
| R3 | KEEP (compress) | Travail du poids indépendant du chemin ; Epp = mgz ; `W(P⃗) = −ΔEpp` |
| R4 | KEEP | Em = Ec + Epp ; conservation (sans frottement) / non-conservation (`ΔEm = W(f⃗)`) ; **+ 2-line tool-choice note** (ex-R5) |
| ~~old R5~~ | **DROP** | TEC vs Newton (plan incliné) — off-cadre generic comparison |
| **R5** | **NEW** | Travail de la force de rappel → **Epe = ½kx² (DERIVE)** + énergie mécanique de l'oscillateur élastique + **diagrammes d'énergie** |
| **R6** | **NEW** | Travail du couple de torsion → **Ep,torsion = ½Cθ² (DERIVE)** + énergie mécanique du pendule de torsion + diagrammes |
| **R7** | **NEW** | Énergie mécanique du **pendule pesant** (Ec + Epp, petites oscillations) + conservation + diagrammes |
| **R8** | KEEP (renumber, re-populate) | Pour t'entraîner — oscillator-energy exercises (was R6) |

**NET CHAPTER DELTA for aspects-energetiques: +2** (from 8 headings R0–R6 to 10 headings R0–R8: **drop 1** old R5, **add 3** new R5/R6/R7, renumber entraînement R6→R8).

### 0.6 HARD scope boundaries — NON-NEGOTIABLE (from `aspects_energetiques` + `mecanique.limites`/`exclusions`)
- **Pendule pesant: PETITES oscillations only** (`sinθ ≈ θ`; height change `≈ ½·d·θ²`). No large-amplitude / non-linear energy.
- **No forced-regime energy analysis** (mécanique exclusion "régime sinusoïdal forcé analytique") — energy of **free** oscillators only. Résonance energy is qualitative and lives in `systemes_oscillants` R7, not here.
- **Diagrams:** qualitative AND quantitative energy diagrams are **in scope** (savoir_faire 2 & 3 name "diagrammes d'énergie" explicitly). Ec, Ep, Em vs **t** and vs **position** are all fair game.
- **Derivation depth:** `½kx²` / `½Cθ²` are derived via the **area under the linear F(x) / M(θ) graph** (triangle) — geometric, hand-checkable. An integral `∫kx dx` may be shown as a second view, but the **triangle/average-force argument is the primary mechanism** (it makes the factor ½ *obvious*, matching the cadre's avoidance of heavy math). **No Lagrangian / Hamiltonian energy methods.**

### 0.7 Exam-weight targets (cite into `items.yaml`)
- **`mecanique.poids.part_examen` = 27 %** of the exam (rang physique 1). Energy items are high-value.
- **Habiletés mix:** Utilisation ≈ **50 %** / Application expérimentale ≈ **15 %** / Résolution ≈ **35 %**. Energy-diagram reading and `½kx²`/`½Cθ²` application are **Utilisation**; energy bilans (find a speed / an angle from conservation) are **Résolution**; reading an `x(t)` / energy trace to confirm conservation is **Application expérimentale**. Tag for the mix.

---

## 1. Foundation chapters R1–R4 — KEEP, compress, one EXTENSION

The mechanism in R1–R4 is already sound; **compress** the prose (1ère-Bac recalls) and make **one substantive addition** in R2:

**R2 EXTENSION — the work of a VARIABLE force (the hinge for `½kx²`).** Current R2 defines `W(F⃗) = F⃗·AB⃗` for a **constant** force only. The spring force `F = kx` is **not** constant — it grows with the stretch. Add the général idea, kept geometric: *the work of a force that varies along the displacement is the **area under the F-vs-position graph**.* For a constant force this area is a rectangle (`F·d`, the current case); for a force that grows linearly from 0, it is a **triangle**. Flag forward: *"c'est exactement ce qu'il nous faudra pour le ressort, dont la force n'est pas constante."* This single addition is what lets R5 **derive** `½kx²` instead of asserting it.

**R4 — absorb the ex-R5 insight in two lines:** after the conservation/non-conservation result, add the tool-choice note (TEC goes straight to a speed when neither the time nor the accélération is wanted) — no need for the full inclined-plane worked comparison. This preserves the one durable idea from the dropped R5 without keeping an off-cadre chapter.

No misconception/item changes are required for R1–R4 beyond what already exists; the new items attach to R5/R6/R7.

---

## 2. R5 — NEW: Énergie potentielle élastique `½kx²` (DERIVED) + Em élastique + diagrammes

### 2.1 R-heading + objective
**R5 — Le ressort emmagasine de l'énergie : `½kx²`, et l'énergie de l'oscillateur.**
Objective: the student **derives** `E_pe = ½kx²` from the work of the restoring force (and understands *why* the factor is ½), uses `W(F_rappel) = −ΔE_pe`, writes `E_m = ½mv² + ½kx²` for the horizontal solid-spring, proves its **conservation** without friction, and **reads the energy diagrams** (Ec, Ep, Em vs t and vs x).

### 2.2 Mechanism to make obvious — DERIVE, do not assert
This is the derivation that `systemes-oscillants` R5 currently only **asserts**; here it is the heart.
- **The restoring force is variable:** `F = kx` (intensity grows linearly with the stretch `x`). To store energy in the spring, an operator stretches it from 0 to `x` against this growing force.
- **Work = area under `F(x) = kx`** (from R2's extension): the graph is a straight line from `(0,0)` to `(x, kx)`; the area under it is a **triangle**, `½ · base · hauteur = ½ · x · (kx) = ½kx²`.
- **Why the ½ — make it *obvious*:** the force is **0** at the start and `kx` at the end; its **average** over the stretch is `½kx`. Work = average force × distance = `½kx · x = ½kx²`. *The ½ is the average of a force that grows from nothing — not a constant force.* Naming this kills the `kx²` error (M-EPE-1) at the source.
- **Définition:** `E_pe = ½kx²` (énergie potentielle élastique ; s'annule à l'équilibre `x=0` ; toujours ≥ 0). Relation: `W(F_rappel)_{A→B} = ½kx_A² − ½kx_B² = −ΔE_pe` (the restoring force is conservative; its work depends only on the endpoints' `x`, exactly parallel to the weight's `W(P⃗)=−ΔEpp` from R3).
- **Em of the horizontal solid-spring:** `E_m = E_c + E_pe = ½mv² + ½kx²`. **Conservation (no friction):** by the TEC, only the restoring force works (`P⃗` and `N⃗` do no work — they are perpendicular to the horizontal motion, R3's `W(N)=0`), so `ΔE_c = W(F_rappel) = −ΔE_pe` → `ΔE_m = 0`. **`E_m` constant.** (This replaces the `sin²+cos²` proof migrated out of `systemes-oscillants` R5 — a cleaner derivation grounded in the TEC the student now owns.)
- **Energy diagrams (savoir_faire 2 — build both):**
  - **vs position `x`:** `E_pe = ½kx²` is a **parabola** (minimum at `x=0`); `E_c = E_m − ½kx²` is the **inverted** parabola; they **cross** where `E_c = E_pe`; `E_m` is a **horizontal line** (the "energy ceiling"). At the turning points `x=±X_m`: `E_c=0`, all energy in the spring. At `x=0`: `E_pe=0`, all energy kinetic (max speed).
  - **vs time `t`:** `E_m` flat; `E_c` and `E_pe` oscillate **in antiphase**. **Subtlety to name (diagram-reading):** because they dépend on `x²` and `v²`, `E_c` and `E_pe` oscillate at **DOUBLE** the frequency of `x(t)` — period `T₀/2`, not `T₀`. (Flag M-EPE candidate #4, §2.3.)

### 2.3 Misconceptions confronted at R5

**M-EPE-1 — « Le travail de la force de rappel = force × distance = `kx²` (force traitée comme constante). »**
- *Wrong model:* applies the constant-force formula `W = F·d = (kx)·x` to a force that actually varies; misses the ½.
- *Manifests:* writes `E_pe = kx²` (or `−kx²`); on the F(x) graph, computes a rectangle instead of the triangle.
- *Correct model:* `F = kx` **varie** de 0 à `kx` ; le travail est l'**aire du triangle** `½kx²` (force moyenne `½kx` × distance `x`). Le facteur ½ vient de la croissance linéaire de la force.
- *Confrontation:* the F(x) triangle diagram (C-EPE-1) — shade the triangle, overlay the wrong rectangle (`kx²`, twice too big), name the average force `½kx`.

**M-EPE-2 — « `E_pe` dépend de la masse / de la vitesse / peut être négative en compression. »**
- *Wrong model:* imports Ec/Epp habits — thinks the spring's stored energy involves `m` or `v`, or that `x<0` (compression) makes `E_pe<0`.
- *Manifests:* writes `E_pe = ½kx² + …m…`; says the spring stores less energy for a lighter mass; assigns a négative `E_pe` when compressed.
- *Correct model:* `E_pe = ½kx²` ne dépend **que de `k` et `x`** ; `x² ≥ 0` donc `E_pe ≥ 0`, **identique** en étirement (`+x`) et compression (`−x`) de même `|x|` ; la masse n'y figure pas (elle est dans `E_c`).
- *Confrontation:* compute `E_pe` at `x=+X_m` and `x=−X_m` → same value; strip `m` from the expression explicitly.

**M-EPE-3 — « L'énergie stockée dans le ressort est de la pesanteur (`mgz`) / on confond Epe et Epp. »**
- *Wrong model:* no clean separation between elastic PE (`½kx²`) and gravitational PE (`mgz`); applies `mgz` to a horizontal spring.
- *Manifests:* on the horizontal solid-spring, writes `Epp = mgz` as the stored energy; expects altitude to matter.
- *Correct model:* pour un ressort **horizontal**, l'altitude ne change pas → `Epp` constante (sans effet sur le mouvement) ; l'énergie stockée est **élastique** `½kx²`, d'une **nature différente** de la pesanteur. (Vertical spring: both may appear, but the *elastic* part is `½kx²` measured from the new equilibrium.)
- *Confrontation:* the horizontal montage — `z` never changes, yet the spring clearly stores energy; therefore the store is not gravitational.

*(Candidate M-EPE-4, flagged for the human, §9: "les courbes `E_c(t)` et `E_pe(t)` oscillent à la même fréquence que `x(t)`" — the frequency-doubling subtlety. Add as a 4th misconception if the human confirms students trip on it; otherwise handle it as a diagram-reading note.)*

### 2.4 Worked-example arc (R5)
1. **Derive `½kx²`** from the triangle (mechanism, §2.2) — expert voice on the ½.
2. **Reconcile with `systemes-oscillants`:** *"c'est l'expression `½kx²` qu'on avait admise au chapitre Systèmes oscillants — on vient de la démontrer."* (Explicit callback — §8.)
3. **Numeric Em** (reuse the `systemes-oscillants` seeds so the numbers are familiar): `k=40 N/m`, `X_m=0,05 m` → `E_m = ½kX_m² = 0,05 J`; at `x=0` all kinetic → `v_max = √(2E_m/m) = 0,5 m/s` (with `m=0,40 kg`). This is the numeric `E_m` **migrated out of** `systemes-oscillants` R5 — it lives here now.
4. **Read the energy diagram** vs `x`: locate where `E_c=E_pe`, where each is max.

### 2.5 Three diagnostic items for R5

**Item AE-R5-1** *(Résolution — the derivation / the ½)*
Stem: « Un ressort de raideur `k` est étiré, depuis sa position d'équilibre, jusqu'à un allongement `x`. Quelle est l'énergie potentielle élastique emmagasinée ? »
- A. `½kx²`. **[correct]**
- B. `kx²`, car le travail vaut force × distance = `(kx)·x`. → **M-EPE-1**
- C. `½kx²` seulement si on connaît la masse accrochée. → **M-EPE-2**
- D. `mgx`, l'énergie stockée étant de la pesanteur. → **M-EPE-3**

**Item AE-R5-2** *(Utilisation — étirement vs compression)*
Stem: « Un même ressort (raideur `k`) est d'abord étiré de `x = +2,0 cm`, puis comprimé de `x = −2,0 cm` par rapport à l'équilibre. Comparez l'énergie potentielle élastique dans les deux cas. »
- A. Elle est identique dans les deux cas. **[correct]**
- B. Elle est positive en étirement, négative en compression. → **M-EPE-2**
- C. Elle dépend de la masse accrochée, donc on ne peut pas conclure. → **M-EPE-2 (variante masse)**
- D. Elle est plus grande en étirement, car le ressort « travaille contre la pesanteur ». → **M-EPE-3**

**Item AE-R5-3** *(Application expérimentale / Utilisation — diagramme d'énergie)*
Stem: « Sur le diagramme d'énergie d'un oscillateur élastique horizontal sans frottement, tracé en fonction de la position `x`, quelle affirmation est correcte ? »
- A. `E_pe` est une parabole minimale en `x=0` ; `E_c` est maximale en `x=0` ; `E_m` est une droite horizontale. **[correct]**
- B. `E_c` et `E_pe` sont maximales au même point. → **M-EPE (lecture de diagramme)**
- C. `E_m` diminue quand `x` augmente, car le ressort « consomme » l'énergie. → distractor bruit (confusion conservation ; lie à M-EPE-1 famille énergétique)
- D. `E_pe` est maximale en `x=0` (au passage par l'équilibre). → **M-EPE-3 (confond équilibre et extrémité) / lecture inversée**

---

## 3. R6 — NEW: Énergie potentielle de torsion `½Cθ²` (DERIVED) + Em pendule de torsion + diagrammes

### 3.1 R-heading + objective
**R6 — Le fil qui se tord emmagasine de l'énergie : `½Cθ²`, et l'énergie du pendule de torsion.**
Objective: the student **derives** `E_p,torsion = ½Cθ²` from the work of the torsion couple (the exact rotational parallel of `½kx²`), knows the rotational kinetic energy `E_c = ½Jθ̇²`, writes `E_m = ½Jθ̇² + ½Cθ²`, proves conservation, reads the diagrams. **`½Cθ²` is absent from the entire corpus today — this chapter introduces it.**

### 3.2 Mechanism to make obvious — DERIVE, parallel to R5
- **The restoring couple is variable:** `M = Cθ` (moment grows linearly with the torsion angle `θ`; `C` = constante de torsion, N·m/rad).
- **Work = area under `M(θ) = Cθ`** — a **triangle**, `½ · θ · (Cθ) = ½Cθ²`. **Same ½-mechanism:** the moment averages `½Cθ` over the twist. `E_p,torsion = ½Cθ²`; `W(M_rappel) = −ΔE_p,torsion`.
- **Rotational kinetic energy:** for a solid rotating about a fixed axis, `E_c = ½Jθ̇²` — the rotational analogue of `½mv²` (`J` plays the rôle of mass `m`; `θ̇` the rôle of `v`). Name this explicitly; the student met `J` in the RFD chapter (`ΣM_Δ = J·θ̈`) but not yet its energy.
- **Em + conservation:** `E_m = ½Jθ̇² + ½Cθ² = const` (no friction; the weight and the axis réaction produce no moment about the wire axis). Antiphase exchange `E_c ↔ E_p,torsion`, exactly as the spring. Diagrams vs `θ` (parabola `½Cθ²` + inverted parabola) and vs `t` (flat `E_m`, antiphase énergies at double frequency).

### 3.3 Misconceptions confronted at R6

**M-TOR-1 — « Travail du couple de rappel = `M·θ = Cθ²` (moment traité comme constant). »**
- *Wrong model:* the rotational twin of M-EPE-1 — constant-moment formula on a variable moment.
- *Correct model:* `M = Cθ` **varie** ; travail = aire du triangle `½Cθ²` (moment moyen `½Cθ`).
- *Confrontation:* the `M(θ)` triangle diagram (C-TOR-1); shade triangle vs overlay wrong rectangle.

**M-TOR-2 — « L'énergie potentielle de torsion dépend du moment d'inertie `J`. »**
- *Wrong model:* fuses the "inertia" and "restoring" reservoirs — puts `J` into the potential energy.
- *Correct model:* `E_p,torsion = ½Cθ²` ne dépend **que de `C` et `θ`** ; `J` apparaît dans l'**énergie cinétique** `E_c = ½Jθ̇²`, **pas** dans `E_p`. (Parallel to M-EPE-2: the restoring energy has the stiffness, not the inertia.)
- *Confrontation:* the two-reservoir table (inertie `J` → Ec ; rappel `C` → Ep); mirror it to the spring (m→Ec, k→Ep).

**M-TOR-3 — « L'énergie cinétique du disque en rotation vaut `½mv²`. »**
- *Wrong model:* applies the translational KE to a rotating solid; no rotational-KE concept.
- *Correct model:* pour un solide en **rotation** autour d'un axe fixe, `E_c = ½Jθ̇²` (analogue rotationnel : `J`↔`m`, `θ̇`↔`v`). Le disque de torsion **tourne**, il ne translate pas.
- *Confrontation:* the analogy table (translation `½mv²` ↔ rotation `½Jθ̇²`); note that a rigid disk's points all have différent `v` but one common `θ̇`, so `v` is ill-defined — only `½Jθ̇²` works.

### 3.4 Worked-example arc (R6)
Reuse the `systemes-oscillants` torsion seeds (`J = 4,0·10⁻³ kg·m²`, `C = 0,16 N·m/rad`, launched from `θ_0 = 0,20 rad` at rest) so the mechanics are familiar and only the **energy** is new. Compute `E_m = ½Cθ_0² = ½·0,16·0,04 = 3,2·10⁻³ J` (all potential at release); at `θ=0`, all kinetic → `θ̇_max = √(C/J)·θ_0` cross-checked against `E_m = ½Jθ̇_max²`. Expert voice on the perfect parallel with the spring — *"changez `k↔C`, `x↔θ`, `m↔J`, `v↔θ̇` : c'est la même énergie, habillée en rotation."*

### 3.5 Three diagnostic items for R6

**Item AE-R6-1** *(Résolution — the derivation)*
Stem: « Un fil de torsion de constante `C` est tordu d'un angle `θ` depuis sa position de repos. Quelle est l'énergie potentielle de torsion emmagasinée ? »
- A. `½Cθ²`. **[correct]**
- B. `Cθ²`, car le travail du couple vaut moment × angle = `(Cθ)·θ`. → **M-TOR-1**
- C. `½Jθ²`, l'énergie dépendant du moment d'inertie du disque. → **M-TOR-2**
- D. `½Cθ` (le moment de rappel). → distractor bruit (confond énergie et moment)

**Item AE-R6-2** *(Utilisation — Em du pendule de torsion)*
Stem: « Un pendule de torsion (disque de moment d'inertie `J`, fil de constante `C`) oscille sans frottement. Quelle est l'expression de son énergie mécanique ? »
- A. `E_m = ½Jθ̇² + ½Cθ²`. **[correct]**
- B. `E_m = ½Cθ̇² + ½Jθ²`. → **M-TOR-2 + M-TOR-3** (dual-tag : réservoirs J et C intervertis)
- C. `E_m = ½mv² + ½Cθ²`, avec `v` la vitesse du disque. → **M-TOR-3**
- D. `E_m = ½Cθ²` seulement (l'énergie cinétique de rotation étant négligeable). → distractor bruit (oublie Ec)

**Item AE-R6-3** *(Utilisation — les deux réservoirs)*
Stem: « Dans l'énergie mécanique d'un pendule de torsion, quelle grandeur joue le rôle de « l'inertie » et laquelle celui du « rappel » ? »
- A. `J` est l'inertie (dans `E_c=½Jθ̇²`) ; `C` est le rappel (dans `E_p=½Cθ²`). **[correct]**
- B. `C` est l'inertie ; `J` est le rappel. → **M-TOR-2 (réservoirs inversés)**
- C. La masse `m` est l'inertie ; `C` le rappel ; `E_c=½mv²`. → **M-TOR-3**
- D. `J` et `C` jouent le même rôle ; `E_c` et `E_p` sont toujours égales. → distractor bruit (lie à la confusion Ec=Ep de R7)

---

## 4. R7 — NEW: Énergie mécanique du pendule pesant (petites oscillations) + diagrammes

### 4.1 R-heading + objective
**R7 — L'énergie du pendule pesant : quand le « ressort » est la pesanteur.**
Objective: the student writes `E_m = E_c + E_pp` for a pendulum, understands the height change drives `E_pp` (not the wire length), proves conservation without friction (small oscillations), and reads the `E_c ↔ E_pp` exchange. **The restoring rôle is played by gravity, not a spring/wire — `E_pp = mgz` (from R3), no `½k`-style term.**

### 4.2 Mechanism to make obvious
- **The pendulum has no elastic store** — its potential energy is **gravitational**, `E_pp = mgz` (R3), where `z` is the height of the mass/centre of inertia above the lowest point. The restoring "spring" is the weight's tangential component.
- **Height change (small oscillations):** for a simple pendulum, `z = L(1−cosθ)`; for small `θ`, `1−cosθ ≈ ½θ²`, so `E_pp ≈ ½mgLθ²` — note it grows as `θ²`, mirroring the spring's `½kx²` (the effective "stiffness" is `mgL`). This parallel is worth showing but the **primary expression stays `E_pp = mgz`** (savoir_faire 4 keeps it gravitational).
- **Em + conservation:** `E_m = ½mv² + mgz = const` (no friction; tension does no work — radial). At the lowest point: `E_pp` minimal, `E_c` maximal (max speed). At the extrêmes `±θ_m`: `v=0`, `E_c=0`, all potential. Antiphase exchange, `E_m` flat. Diagrams vs `t` and vs `θ` (or vs `z`).

### 4.3 Misconceptions confronted at R7

**M-PES-1 — « L'énergie mécanique n'est pas conservée : au point haut le pendule ralentit, donc il perd de l'énergie. »**
- *Wrong model:* the R4 "`E_c` isn't `E_m`" gap, now on the pendulum — reads the slowing (falling `E_c`) as a falling `E_m`.
- *Manifests:* claims `E_m` drops toward the extrêmes; can't say where the "lost" kinetic energy went.
- *Correct model:* sans frottement, `E_m = E_c + E_pp = const` ; au point haut `E_c` chute **mais `E_pp` monte d'autant** — l'énergie n'a pas disparu, elle est devenue potentielle.
- *Confrontation:* the `E_c ↔ E_pp` exchange diagram; add `E_c + E_pp` and show it is flat while each varies.

**M-PES-2 — « `E_pp = mgL` (on prend la longueur du fil comme hauteur) / référence non fixée. »**
- *Wrong model:* uses the wire length `L` as the height, or never sets a référence level.
- *Manifests:* writes `E_pp = mgL` at the extreme; gets inconsistent énergies because the zéro of `z` floats.
- *Correct model:* `E_pp = mg·z`, `z` = **altitude par rapport à une référence choisie** ; pour un pendule la variation de hauteur entre le bas et l'angle `θ` est `L(1−cosθ)` (**pas** `L`).
- *Confrontation:* the pendulum diagram with `z = L(1−cosθ)` marked (C-PES-1); compute `E_pp` at `θ_m` with the correct height, contrast with the `mgL` error (way too big).

**M-PES-3 — « L'énergie mécanique est maximale en bas (là où la vitesse est maximale) » / « `E_c` et `E_pp` sont toujours égales. »**
- *Wrong model:* confuses the constant `E_m` with the varying `E_c`; or over-generalises the crossing point into permanent equality.
- *Manifests:* says `E_m` peaks at the bottom; claims `E_c = E_pp` throughout.
- *Correct model:* `E_m` est **constante** (elle n'a ni max ni min) ; c'est `E_c` qui est maximale en bas et `E_pp` maximale aux extrémités ; `E_c = E_pp` seulement à **des positions particulières**, pas en permanence.
- *Confrontation:* the vs-`θ` diagram — `E_m` a flat ceiling; the `E_c=E_pp` crossing marked as a *point*, not a rule.

### 4.4 Worked-example arc (R7)
A simple pendulum (`L`, `m`) released from `θ_m` at rest: `E_m = mgL(1−cosθ_m)` (all potential at release, référence at the lowest point); at the bottom, all kinetic → `v_max = √(2gL(1−cosθ_m))`. Expert voice: *"on ne dérive pas l'équation horaire — l'énergie donne la vitesse en bas directement, comme le TEC donnait la vitesse au sol en chute libre (R2)."* Ground it in the conservation frame the student already owns.

### 4.5 Three diagnostic items for R7

**Item AE-R7-1** *(Résolution — conservation)*
Stem: « Un pendule simple oscille sans frottement. À l'instant où il passe par sa position la plus haute (écart maximal `θ_m`), que peut-on dire de son énergie ? »
- A. `E_c = 0` et `E_m = E_pp` (maximale) ; `E_m` est la même qu'en bas. **[correct]**
- B. `E_m` est plus petite qu'en bas, car le pendule a ralenti (perte d'énergie). → **M-PES-1**
- C. `E_m` est maximale en bas et minimale en haut. → **M-PES-3**
- D. `E_c = E_pp` (comme partout ailleurs). → **M-PES-3 (variante « toujours égales »)**

**Item AE-R7-2** *(Utilisation — hauteur / référence)*
Stem: « Un pendule simple de longueur `L` est écarté d'un angle `θ` de la verticale. De combien son point matériel s'est-il élevé par rapport au point le plus bas ? »
- A. `L(1−cosθ)`. **[correct]**
- B. `L`. → **M-PES-2**
- C. `Lθ` (la longueur de l'arc parcouru). → **M-PES-2 (variante arc = hauteur)**
- D. On ne peut pas savoir sans la masse. → distractor bruit (la masse n'intervient pas dans la géométrie)

**Item AE-R7-3** *(Utilisation — quelle grandeur est max, où)*
Stem: « Pour un pendule pesant oscillant sans frottement, associez chaque grandeur à l'endroit où elle est maximale. »
- A. `E_c` max en bas ; `E_pp` max aux extrémités ; `E_m` constante partout. **[correct]**
- B. `E_m` max en bas ; `E_pp` max aux extrémités. → **M-PES-3**
- C. `E_c` et `E_pp` toutes deux max en bas. → **M-PES-3 + M-PES-1** (dual-tag)
- D. `E_pp` max en bas (là où le pendule va le plus vite). → **M-PES-2/3 (confond bas et haut)**

---

## 5. Media / interactive callouts (typed per ADR 0017)

Only what the new derivations need. **The two triangle-area figures are the load-bearing visuals — they carry the ½ mechanism.** Old `plan-incline-travaux.svg` is retired with old R5.

### C-EPE-1 — `F(x) = kx` triangle → `½kx²` — REQUIRED (R5)
- **Type:** `structural-diagram` · **Tool:** `svg+katex` — never gemini (the exact linear graph, the shaded triangle, the KaTeX area label carry the whole mechanism).
- Must show: the line `F = kx` from `(0,0)` to `(x, kx)`; the **shaded triangle** under it labelled `W = ½kx²`; the **average force `½kx`** marked; optionally a faint overlaid rectangle `kx²` labelled "faux (force supposée constante)" to kill M-EPE-1. KaTeX for `F`, `x`, `kx`, `½kx²`.

### C-EPE-2 — Energy diagrams of the élastique oscillator — REQUIRED (R5)
- **Type:** `structural-diagram` · **Tool:** `svg+katex`.
- Two panels: **(a) vs position `x`** — `E_pe=½kx²` parabola, `E_c` inverted parabola, `E_m` flat ceiling, crossing marked; **(b) vs time `t`** — `E_m` flat, `E_c` and `E_pe` in antiphase **at double the frequency of `x(t)`** (period `T₀/2`), with `x(t)` drawn faintly above for period comparison. KaTeX throughout. This is the savoir_faire-2 "diagrammes d'énergie" deliverable.

### C-TOR-1 — `M(θ) = Cθ` triangle → `½Cθ²` — REQUIRED (R6)
- **Type:** `structural-diagram` · **Tool:** `svg+katex`.
- The rotational twin of C-EPE-1: line `M = Cθ`, shaded triangle `½Cθ²`, average moment `½Cθ`. KaTeX for `M`, `θ`, `Cθ`, `½Cθ²`. (A small side-by-side with C-EPE-1 reinforces the `k↔C`, `x↔θ` analogy.)

### C-PES-1 — Pendulum height `L(1−cosθ)` + `E_c↔E_pp` exchange — REQUIRED (R7)
- **Type:** `structural-diagram` · **Tool:** `svg+katex`.
- The pendulum with the height rise `z = L(1−cosθ)` marked geometrically (kills M-PES-2), plus the `E_c`/`E_pp`/`E_m` exchange diagram vs `θ` (`E_m` flat ceiling; crossing point marked). KaTeX for `z`, `L(1−cosθ)`, énergies. (The existing `conservation-em.svg` can be adapted rather than built fresh.)

### C-ENERGY-SANDBOX — energy-bar manipulable — OPTIONAL (R5/R7)
- **Type:** `manipulable` · **Tool:** `geogebra/desmos/falstad/phet` (embed; do not rebuild) — e.g. PhET *Masses & Springs* (energy view) or *Pendulum Lab* (energy view), which show live `E_c`/`E_p`/`E_m` bars trading as the oscillator moves.
- Behaviour: drag/release the oscillator, watch the energy bars trade while the total stays flat (with friction toggled off). Reinforces M-PES-1 / M-EPE diagrams dynamically. **Boundary guard:** free oscillations only; **no driven/forced mode, no résonance sweep** (that is `systemes_oscillants` R7's qualitative domain, and even there not an energy analysis). Optional — the static C-EPE-2 / C-PES-1 diagrams carry the load if not wired.

---

## 6. Build spec — for content-author (edits `lesson.md`)

**Profile:** PC — three modes. Here the heart is **procedural** (derive `½kx²`, `½Cθ²` from the area/average-force argument) + **conceptual** (the two-reservoir picture, conservation) + **expérimental** (read energy diagrams / confirm conservation off a trace). **Predict-then-reveal** the ½: ask "combien vaut le travail pour étirer de `x` ?" — the M-EPE-1 student answers `kx²`; reveal the triangle.

**Do, in order:**
1. **R0–R4 — keep, compress; extend R2** to the work of a variable force = area under `F(x)` (§1); fold the ex-R5 tool-choice note into R4; **drop old R5**.
2. **R5 — derive `½kx²`** (§2.2, the triangle/average-force mechanism — *make the ½ obvious*), then Em élastique + conservation via the TEC + the energy diagrams (C-EPE-1, C-EPE-2). **Callback:** "c'est l'expression admise en Systèmes oscillants — la voici démontrée."
3. **R6 — derive `½Cθ²`** as the rotational parallel (§3.2), introduce `E_c=½Jθ̇²`, Em torsion + diagrams (C-TOR-1).
4. **R7 — pendule pesant energy** (§4.2): `E_pp=mgz` with `z=L(1−cosθ)`, Em conservation, diagrams (C-PES-1).
5. **R8 — renumber** old R6; **replace** the ski/incline exercises with oscillator-energy bilans (spring, torsion, pendulum) + energy-diagram reading.

**Hard rules:**
- **French, voice-ready; KaTeX for all math.**
- **DERIVE `½kx²` and `½Cθ²`** — do not assert them (the old corpus asserted `½kx²`; here it must be built from the area/average-force argument). The **½ must be explained** (average of a force growing from zéro), not dropped in.
- **RESPECT THE BOUNDARY (§0.6):** pendule pesant **small oscillations** only; **no forced-regime energy**; diagrams (vs t and vs position) are in scope; derivation via **area/triangle** (integral optional as a second view); **no** Lagrangian methods.
- **Structural media → svg+katex, never gemini** (C-EPE-1/2, C-TOR-1, C-PES-1). Manipulable is an embed with the boundary guard (C-ENERGY-SANDBOX).
- **Do not duplicate `systemes-oscillants`:** this lesson **owns** the `½kx²`/`½Cθ²` derivation and the quantitative energy diagrams; `systemes-oscillants` R5 only previews them qualitatively (§8).

## 7. Build spec — for item-author (edits `items.yaml`)

- **Coverage floor:** **≥3 items per misconception** (VISION; ADR 0011), ceiling 6. New misconceptions: **M-EPE-1/2/3, M-TOR-1/2/3, M-PES-1/2/3** (+ candidate M-EPE-4 if the human confirms) → **≥27 items** to floor. The §2.5/§3.5/§4.5 items are canonical firsts; add ≥2 structural variants each (différent oscillator dress, graph vs formula vs numeric).
- Add the nine (or ten) misconception records with French `{label, description, contradicts_principle}`; encode per ADR 0008/0009.
- **Habileté mix (§0.7):** derivations and diagram-reading skew **Utilisation**; energy bilans (find `v_max`, `θ̇_max`, a height) skew **Résolution**; confirming conservation off an `x(t)`/energy trace is **Application expérimentale**. Aim ≈ 50 / 15 / 35; tag `document_experimental` on the trace items.
- **Stem-defect discipline:** *correct-answer contamination* = defect → revise; *cross-misconception co-attribution* = **dual-tag** (flagged: AE-R6-2/B = TOR-2+TOR-3; AE-R7-3/C = PES-3+PES-1). The `½`-vs-`kx²` trap (M-EPE-1, M-TOR-1) is the highest-value distractor family — ensure it appears across multiple surfaces.
- **Boundary discipline:** no item may require a forced-regime energy, a large-amplitude pendulum energy, or a Lagrangian. Height items use `L(1−cosθ)`, never `L` (M-PES-2 is a trap, never the key).

## 8. RECONCILIATION with systemes-oscillants (shared, load-bearing — the ½kx²/torsion decision)

**The problem:** the oscillator-energy topic is currently **misplaced between the two lessons**. `systemes-oscillants` R5 **asserts** `½kx²` and does the full quantitative Em treatment; this lesson (aspects-energetiques) — the cadre's actual home for oscillator energy — does **not** have `½kx²` at all, and `½Cθ²` is **absent from the whole corpus**.

**The decision (exact):**
1. **`E_pe = ½kx²` is DERIVED exactly ONCE — HERE, in `aspects-energetiques` R5** — from the work of the variable restoring force (triangle / average-force). This is its cadre home (`aspects_energetiques.savoir_faire` #1: "travail d'une force de ressort → énergie potentielle élastique").
2. **`E_p,torsion = ½Cθ² is DERIVED exactly ONCE — HERE, in `aspects-energetiques` R6** (cadre home: savoir_faire #3). It is **new to the corpus**; no other lesson introduces it.
3. **`systemes-oscillants` R5 is trimmed** (per its own spec-extension §1.2): it may **STATE** `½kx²` as a **result with an explicit forward-reference** to this chapter, and use it **only qualitatively** (the Ec↔Epe exchange / RLC-analogue picture that motivates amortissement & résonance). It **NEVER derives** `½kx²`, and its `sin²+cos²` conservation proof + numeric `E_m` + quantitative energy diagrams **migrate HERE** (R5 §2.4).
4. **Quantitative energy DIAGRAMS (Ec, Ep, Em vs t and vs position) live HERE only** (C-EPE-2, C-TOR-1, C-PES-1). `systemes-oscillants` keeps only its **qualitative** exchange figure (`energie-oscillateur.svg`).
5. **Consistency contract — identical across both lessons, no contradiction:** notation `k`/`x`/`E_pe=½kx²`, `C`/`θ`/`E_p,torsion=½Cθ²`, `J`/`θ̇`/`E_c=½Jθ̇²`; sign convention `W(F_rappel) = −ΔE_pe`, `W(M_rappel) = −ΔE_p,torsion`; the same worked-number seeds (`k=40 N/m`, `X_m=0,05 m`; torsion `J=4,0·10⁻³`, `C=0,16`) so the two lessons reinforce rather than diverge.
6. **Ordering note:** the cadre lists `systemes_oscillants` **before** `aspects_energetiques`. So `systemes-oscillants` R5's mention is a **forward** référence (as the existing lesson already does: "…une grandeur que tu retrouveras établie…"). If the app's teaching order ever puts `aspects_energetiques` first, it becomes a **back** référence; the **derivation home is this lesson either way**. content-author must keep the cross-reference direction consistent with the shipped order.

**One-line summary:** *Derivation + quantitative diagrams of `½kx²` and `½Cθ²` → **aspects-energetiques** (here). Qualitative preview + forward-reference → **systemes-oscillants** R5. Same notation, same signs, same numbers. No duplication, no contradiction.*

## 9. Open items for the human (validation gate)
1. ⚠ **How much generic-TEC to keep** — confirm R1–R4 (Ec, TEC, travail du poids/Epp, Em) are safe to keep as *compressed foundation* (are they truly 1ère-Bac prerequisites the student already owns, or must they be taught in full here because 2ème-Bac mécanique introduces energy for the first time?). This decision sets the lesson's length and level.
2. ⚠ **Rotational KE `½Jθ̇²`** — confirm it is expected at PC bac for the torsion-pendulum Em (the cadre says "énergie mécanique du pendule de torsion" but does not print `½Jθ̇²` explicitly). If the human says it's assumed known from rotation, keep as a recall; if new, it needs its own short beat in R6.
3. ⚠ **M-EPE-4 (frequency-doubling of energy curves)** — is "les courbes d'énergie oscillent à la même fréquence que `x(t)`" a real, common PC error worth a 4th misconception, or a diagram-reading note?
4. ⚠ **Derivation via area vs integral** — confirm the Moroccan manuels derive `½kx²` via the F(x) triangle (area / average force) rather than `∫kx dx`; the spec leads with the triangle. Confirm the expected register.
5. ⚠ **Misconception completeness** — are these nine the places PC students actually fail on oscillator energy? (Human's teaching authority.)

### Sources consulted
- **Curriculum boundary (authoritative):** `docs/cadre/curriculum/pc-physique-chimie.yaml` → `physique/mecanique/aspects_energetiques` (programme, savoir_faire) + `mécanique` (limites, exclusions, poids, habiletes).
- **Existing lesson:** `content/pc/aspects-energetiques/lesson.md` (R0–R6), `items.yaml`.
- **Coupled source of the misplaced `½kx²`:** `content/pc/systemes-oscillants/lesson.md` R5 + `content/pc/systemes-oscillants/spec-extension.md` §1/§8.
- **Format référence:** `content/pc/rlc-serie/spec.md`.
- **Standard:** VISION (notion anatomy; PC three-mode profile), DESIGN-BIBLE §3/§6/§7, ADR 0017 (media taxonomy), ADR 0008/0009/0011 (misconception schéma, coverage floor, dual-tagging).
