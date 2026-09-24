# Pedagogy spec-EXTENSION — Calcul intégral (Maths · 2ème Bac) — LE VOLUME D'UN SOLIDE DE RÉVOLUTION

> **Notion:** `content/maths/calcul-integral` (existing lesson, R0–R9)
> **Streams:** 2ème Bac **Sciences Expérimentales (SExp)** *and* **Sciences Mathématiques (SM)** — the savoir-faire is explicit in BOTH cadres.
> **Curriculum path (SExp):** `analyse → calcul_integral → integrale_primitives` (`docs/cadre/curriculum/maths-sexp.yaml:169-182`)
> **Curriculum path (SM):** `analyse → calcul_integral → integrale_riemann_ipp` (`docs/cadre/curriculum/maths-sm.yaml:179-190`)
> **This is an EXTENSION spec, not a fresh spec.** The lesson is sound; it is **missing one explicit savoir-faire**. This file specifies **one new rung (R9)**, its misconceptions, its checkpoint, its items, its figures and its 3D scene. Do **not** touch `lesson.md` / `items.yaml` / `checkpoints.yaml` / `exercises.yaml` here — downstream authors do that from this spec.
> **Language policy:** meta is English; **every student-facing string** (prose, stems, choices, feedback, misconception labels, scene text) is authored in **French**, tutoiement, voice-ready.
>
> ## ⚠ VALIDATION STATUS — NOT YET HUMAN-VALIDATED
> Phases 1–3 are human-gated (RULES §2). Produced from the two cadre files + the existing lesson + one **verified** bac precedent. The human's SMA / Sciences-Physiques teaching judgment has **not** been applied. Every misconception is *proposed*; §1.4 (what is OUT) contains **two judgment calls that are not cadre citations** and are flagged in §10.

---

## 0. The gap, diagnosed

`REVIEW-2026-09-12.md` § « DÉFÉRÉ — couverture », item **S2.6**:

> **le volume d'un solide de révolution est TOTALEMENT absent**, alors qu'il est un `savoir_faire` explicite des DEUX filières (`maths-sexp.yaml:175,179` ; `maths-sm.yaml:184,188`). **Plus gros trou de couverture, non signalé.**

The cadre is unambiguous in both files:

| Fichier | Ligne | Texte |
|---|---|---|
| `maths-sexp.yaml` | 166 | *« …les utiliser pour des calculs d'aires et de **volumes de révolution**. »* (compétence ciblée) |
| `maths-sexp.yaml` | 175 | *« …calcul d'aires (sous une courbe, entre deux courbes) ; **volume d'un solide de révolution**. »* (programme) |
| `maths-sexp.yaml` | 179 | *« Appliquer l'intégration par parties ; **calculer une aire et un volume de révolution**. »* (savoir-faire) |
| `maths-sm.yaml` | 166 | *« …calculer **aires et volumes**. »* (compétence ciblée) |
| `maths-sm.yaml` | 184 | *« …calcul d'aires et de **volumes de révolution**. »* (programme) |
| `maths-sm.yaml` | 188 | *« Calculer une aire entre courbes et **un volume de révolution**. »* (savoir-faire) |

R8 teaches the area (signed integral vs area, area between curves, u.a. → cm²) and stops. The volume is the *next sentence* of the cadre and it is not written.

**Net defect:** one explicit savoir-faire of both streams, testable at the national exam, is not taught anywhere in the corpus.

---

## 1. Scope — bounded to the cadre

### 1.1 What the new rung teaches (and nothing more)

Rotation, **d'un tour complet**, of the portion of the curve of a continuous function **f ≥ 0** on `[a,b]`, **autour de l'axe des abscisses (Ox)**, in a **repère orthonormé** :

$$V = \pi\int_a^b \big(f(x)\big)^2\,\mathrm{d}x \qquad\text{(en unités de volume, u.v.)}$$

plus the conversion **u.v. → cm³**: `1 u.v.` is the volume of the **cube** built on the unit; in a repère orthonormé where the unit is `k` cm on each axis, `1 u.v. = k³ cm³` (k = 2 cm → **8 cm³**; the bac's own convention `‖i⃗‖ = 1 cm` → `1 u.v. = 1 cm³`).

### 1.2 Prerequisite placement

The rung consumes, and only consumes, tools the student already owns:

| Tool | Owned since |
|---|---|
| `∫_a^b f = F(b) − F(a)` ; indépendance de la primitive | R1 |
| Linéarité (pour sortir le facteur constant) | R2 |
| Intégration par parties | R7 |
| L'intégrale comme mesure d'une région, et l'unité d'aire | R1 + R8 |
| Aire du disque `πr²`, volume du cône `πr²h/3` | collège / tronc commun |

Nothing new is needed. **The rung is a re-use rung**, and that is its pedagogical strength: the same region, now spun.

### 1.3 Exam weight + habiletés — cite into `items.yaml`

- **SExp:** `analyse.poids.part_examen = 55 %` (`maths-sexp.yaml:52`); `calcul_integral` carries `part_domaine: "Analyse"`, *« ≈ 4 capacités (pdfmath) »* — **the cadre gives no per-sous-domaine `part_examen` for calcul_integral; do not invent one.**
- **SM:** `analyse.poids.part_examen = 50 %` (`maths-sm.yaml:55`); `calcul_integral` *« ≈ 7 capacités »*.
- **Habiletés (exam-wide ratios, the numeric target for the item mix):**
  - **SExp** (`maths-sexp.yaml:40-43`): `application_directe` **50 %** / `application_non_explicite` **35 %** / `synthese_situations_inhabituelles` **15 %**.
  - **SM** (`maths-sm.yaml:39-42`): **40 / 40 / 20**.
  - **Build target for the 16 new items (SExp-leaning, the notion's declared filière): 8 / 5 / 3** — see §7.
- ⚠ **fid-S5.20 (REVIEW, systemic and unresolved):** the existing checkpoints carry the **Physique-Chimie** habileté triplet (`raisonnement` / `utilisation`) on a maths notion. New items and the new checkpoint **must carry the MATHS triplet** (`application_directe` / `application_non_explicite` / `synthese`). Do not copy the PC vocabulary from the neighbouring checkpoints.

### 1.4 HARD boundaries — NON-NEGOTIABLE

Carried from the chapitres' `limites` **and** the sous-domaines' `exclusions_transversales` (both apply).

| # | Boundary | Source | Status |
|---|---|---|---|
| **B1** | **SExp: NO Riemann sums as a construction** — no `Σ`, no `Σ f(xᵢ)Δx → ∫`, no `n → +∞`, no encadrement by lower/upper sums. The integral is introduced via the primitive. | `maths-sexp.yaml:181` (limite) + `:304` (exclusion transversale) | **HARD.** See §3 for what the slicing picture *is* allowed to do. |
| **B2** | **NO changement de variable formel** — no volume example may need one. | `maths-sexp.yaml:182` + `maths-sm.yaml:177` | **HARD** (and already an open REVIEW blocker, S1.1 — do not worsen it). |
| **B3** | **IPP: once (possibly iterated on simple cases) for SExp.** The taught volume examples use **at most one IPP**. The double IPP of the 2023 SM sujet is **SM-only**. | `maths-sexp.yaml:182` | **HARD for SExp.** |
| **B4** | **NO intégrales impropres / généralisées** — every interval is a segment, f continuous on it. | `maths-sm.yaml:342` (exclusion) | **HARD.** |
| **B5** | **Rotation autour de (Ox) ONLY.** | judgment — see §10 Q1 | **DECIDED OUT: (Oy).** Justification: (a) no cadre text names an axis; (b) the only verified bac precedent says *« autour de l'axe des abscisses »*; (c) the (Oy) case needs either `x = g(y)` (fonction réciproque — SM-specific, and absent from the SExp cadre) or the shell method (B6). **Flagged for the human.** |
| **B6** | **NO méthode des tubes / coquilles (shell method).** | absent from both programmes; no bac precedent | **HARD OUT.** |
| **B7** | **NO théorème de Pappus–Guldin** — not even named. Naming it licenses `V = 2π·ȳ·A`, which is the exact shape of misconception **`volume-circonference-vs-disque`** (§5). | absent from both programmes | **HARD OUT.** |
| **B8** | **NO volume between two curves (washers, `π∫(f²−g²)`).** In BOTH cadres, *« entre courbes »* attaches to the **aire**, never to the volume (`maths-sm.yaml:188`: « une aire entre courbes **et** un volume de révolution »). No bac precedent found. | judgment on the cadre's own sentence structure | **DECIDED OUT. Flagged** — §10 Q2. If the human confirms the Moroccan manuels state it, it is a 10-line addition + 3 items, not a redesign. |
| **B9** | **NO surface of revolution / arc length** (`2π∫f√(1+f'²)`, `∫√(1+f'²)`). | REVIEW S1.5 already flags the arc-length formula as hors-programme in `bank.yaml:1020` | **HARD OUT.** |
| **B10** | **The formula presupposes a repère ORTHONORMÉ.** In a merely orthogonal frame the cross-section is not a disc and `V = π∫f²` is false. State it as a hypothesis; **never teach an anisotropic unité de volume.** (This is the clean line that separates the volume conversion from the area conversion, where the anisotropic case `1 u.a. = ab` IS taught — CI-33.) | mathematical necessity + every bac statement says *repère orthonormé* | **HARD.** |
| **B11** | **f ≥ 0 on `[a,b]`.** The formula is stated, as in the manuels, for a positive function. Name that `f²` is automatically ≥ 0 — so **no sign-splitting is ever needed inside the integral** (unlike R8's area) — but do **not** generalise the formula to a sign-changing f. | textbook statement register | **HARD.** |

---

## 2. Placement and numbering — DECIDED

**The human's preference is adopted, with justification.**

| Rung | Before | After |
|---|---|---|
| R0 … R7 | unchanged | unchanged |
| R8 | « Calculer des aires… » | **unchanged** |
| **R9** | *(was: « Pour t'entraîner »)* | **NEW — « Faire tourner la région : le volume d'un solide de révolution »** |
| **R10** | — | « Pour t'entraîner : les questions de type bac » (ex-R9, **renumbered**) |

**Why here and not elsewhere:**
1. The rung is *literally* R8's object, spun. « La région que tu viens de mesurer, fais-la maintenant tourner. » Adjacency is load-bearing; any gap between them costs that sentence.
2. R8's last beat is the **unité d'aire → cm²** conversion. The **unité de volume → cm³** conversion is its exact continuation (`k` → `k²` → `k³`). Splitting them wastes the one place where the dimensional reflex can be built in a single move.
3. The practice rung must stay **last** — it is the summit of the ramp; a new teaching rung after it would break the ramp's monotonicity.

**Mechanical consequences (for the authors — do all of them):**
- `lesson.md`: insert `## R9 — …` after R8; rename the existing `## R9 — Pour t'entraîner…` to `## R10 — …`.
- **Chapter-numbering convention `chapitre N = R(N−1)` holds** (verified in the REVIEW, 40+ citations). In prose the new rung is **« chapitre 10 »**, the practice rung **« chapitre 11 »**. No existing cross-reference needs rewriting: every « chapitre 9 » in R1/R3 points at R8 (areas) and stays correct.
- `items.yaml`: **retag CI-28, CI-29, CI-30 from `rung: "R9"` to `rung: "R10"`**; add the 16 new items; update `coverage_summary` (`total_items: 50`, `ramp_coverage: R9: 14, R10: 5`, and the `per_misconception` block).
- `checkpoints.yaml`: add `cp-volume-disque`, `lesson_placement: in_R9`.
- `exercises.yaml`: add `r-volume` (§8.4).

**Does the practice rung gain a volume question? YES — one, and only one.** See §8.4: a **fresh variation** at single-IPP level (SExp-safe, therefore valid for both streams), written in the bac's own register. The verbatim 2023 SM question is **cited as the precedent, not shipped**, until the filière arbitration (REVIEW S1.2/S1.3) lands — see §8.4 and §10 Q3.

---

## 3. Le décortiquer — how the mechanism is made obvious

### 3.1 The chain, in the order the student must meet it

1. **Le geste.** La région sous la courbe, sur `[a,b]`, tourne **d'un tour complet** autour de `(Ox)`. Elle ne balaie plus une surface : elle **engendre un solide**.
2. **Où couper.** On coupe le solide par un plan **perpendiculaire à l'axe**, à l'abscisse `x`. C'est le seul découpage qui rende la coupe simple — parce que l'axe de rotation la traverse au centre.
3. **La coupe est un DISQUE, pas un cercle.** Le segment vertical qui va de `(x, 0)` à `(x, f(x))` appartient **entièrement** à la région. Chacun de ses points, à la hauteur `y`, décrit un **cercle de rayon `y`** ; le segment tout entier balaie donc **tous** les cercles de rayon `0` à `f(x)` : un disque **plein** de rayon `f(x)`.
4. **L'aire de cette tranche.** `π·f(x)²`. **Le rayon est au carré** — c'est le point où tout se joue : *doubler `f` ne double pas la tranche, il la **quadruple***.
5. **On accumule le long de `[a,b]`.** L'aire de tranche `π f(x)²` change avec `x` ; la quantité accumulée d'un bout à l'autre de l'intervalle est exactement ce que l'intégrale calcule. D'où :
   $$V = \pi\int_a^b \big(f(x)\big)^2\,\mathrm{d}x \quad \text{(u.v.)}$$
6. **Ce qu'on admet, et dans quel registre.** Comme au chapitre 2 pour l'aire (« On admet, comme pour toute fonction continue positive, le fait suivant… », `lesson.md:51`), **on admet ici que l'accumulation des aires de tranches est donnée par cette intégrale.** Même registre, même honnêteté : on dit qu'on l'admet, on ne le déguise pas en démonstration.
7. **Hypothèses, énoncées, pas sous-entendues :** `f` continue et **positive** sur `[a,b]` (B11) ; repère **orthonormé** (B10).

### 3.2 RULING on the SExp `limite` (no Riemann sums as a construction)

**Question:** may the lesson / the scene show a **stack of thin discs** as the intuition of *why*, while the formula is admitted for SExp?

**RULING — YES for the picture, NO for the sum. Both streams get the same treatment.**

- **Permitted, for both streams:** the slice at `x` as a disc of radius `f(x)` and area `π f(x)²` ; a **stack of thin discs** filling the solid, with the number of discs as a manipulable control ; the sentence *« on accumule cette aire de tranche le long de `[a,b]` — c'est ce que fait l'intégrale »*.
- **Forbidden, for both streams (it is the SExp `limite`, and SM gains nothing by breaking the shared text):** any `Σ`, any `Σ π f(xᵢ)² Δx`, any `n → +∞` limit passage, any **numeric sum** of the displayed discs, any encadrement by lower/upper sums.

**Why this line and not another.** The `limite` forbids Riemann sums **as a construction of the integral** (`maths-sexp.yaml:181`: *« définition/approximation par sommes … L'intégrale est introduite via la primitive »*). The disc picture does not construct the integral — the integral was constructed in R1, from the primitive. The picture does exactly one job: it **identifies the integrand** (*what quantity is being accumulated: the slice's area, `π f(x)²`*). That is the same job the shaded region does for the area at R1, and R1 is already inside the boundary. The test is mechanical and the authors can apply it: **a `Σ` sign or the word "somme" on screen = out of bounds; a picture of slices with no arithmetic on them = in bounds.**

**SM extra — DEFERRED, deliberately, and this is a decision, not an omission.** The SM cadre does own the sommes de Riemann, and the disc stack *is* their natural application. But REVIEW **S1.2** is an **open owner arbitration**: three of four bank cards are already built on Riemann/TAF inside a notion declared SExp, and the owner has not decided whether to filter or split. Adding a fourth SM-only element would **worsen the exact defect the review flagged**. So: **no SM-only Riemann aside in this extension.** When S2.7 (the missing Riemann rung) is built, the volume slice is its best application and the cross-reference is written *then*, in one direction, once. Recorded here so it is not re-invented: §10 Q4.

### 3.3 L'erreur à repérer — the four wrong formulas, side by side

Placed immediately after the mechanism, before the worked examples, computed on the **same** function so the numbers are comparable (`f(x) = √x` sur `[0,4]`, aire `A = 16/3`):

| Ce qu'on écrit | Ce que ça vaut | Le modèle qui tourne derrière |
|---|---|---|
| `V = π∫₀⁴ x dx = 8π ≈ 25,13` | **correct** | la tranche est un **disque** d'aire `πf²` |
| `π∫₀⁴ √x dx = 16π/3 ≈ 16,76` | faux | le rayon n'est pas élevé au carré |
| `2π∫₀⁴ √x dx = 32π/3 ≈ 33,51` | faux | « un tour complet vaut `2π`, donc on multiplie l'aire par `2π` » / on prend la **circonférence** pour le disque |
| `∫₀⁴ x dx = 8` | faux | « l'intégrale donne directement le volume, comme elle donnait l'aire » |
| `π(∫₀⁴ √x dx)² = 256π/9 ≈ 89,36` | faux | le carré posé sur **l'intégrale** au lieu de la **fonction** |

The break for `2π × aire` must be **geometric, not numeric authority**: *les points de la région ne sont pas tous à la même distance de l'axe — celui qui est à la hauteur `1` décrit un cercle de rayon `1`, celui qui est à la hauteur `2` un cercle deux fois plus grand. Multiplier toute l'aire par un seul facteur revient à supposer qu'ils balaient tous la même chose.* (Do **not** name Pappus — B7.)

---

## 4. Les exemples travaillés — arithmetic complete and verifiable

Voice: « **Ce qu'on cherche et pourquoi ce geste** » before each, as everywhere in this lesson. Expert *decision* exposed on every step (NOTION-TEMPLATE-V2 box A).

### 4.1 Exemple 1 — le carré est immédiat : `f(x) = √x` sur `[0,4]`

**Ce qu'on cherche et pourquoi ce geste :** le carré n'est pas une corvée, c'est une **chance** — il fait disparaître la racine. `(√x)² = x`, un polynôme. *Chaque fois qu'un énoncé de bac met une racine dans `f`, c'est très souvent pour que `f²` soit simple* — c'est exactement le procédé du sujet 2023 (§8.1 : `f₁(x)=√x·ln x` → `f₁² = x(ln x)²`).

$$V = \pi\int_0^4 \big(\sqrt{x}\big)^2\,\mathrm{d}x = \pi\int_0^4 x\,\mathrm{d}x = \pi\left[\frac{x^2}{2}\right]_0^4 = \pi\left(\frac{16}{2}-0\right)$$

$$\boxed{V = 8\pi\ \text{u.v.} \approx 25{,}13\ \text{u.v.}}$$

*(Le solide est un paraboloïde — le bol qu'on obtient en faisant tourner une parabole couchée.)*

### 4.2 Exemple 2 — le cône, pour se rassurer : `f(x) = \tfrac{2}{3}x` sur `[0,3]`

**Ce qu'on cherche et pourquoi ce geste :** on prend une figure dont on connaît **déjà** le volume depuis le collège, et on vérifie que l'outil neuf redonne la vieille formule. Si ça ne collait pas, c'est l'outil qui serait faux.

La droite `y = \tfrac23 x` sur `[0,3]` engendre un **cône** de rayon `r = 2` (la valeur de `f` en `3`) et de hauteur `h = 3`.

$$V = \pi\int_0^3 \left(\frac{2}{3}x\right)^2\mathrm{d}x = \pi\int_0^3 \frac{4}{9}x^2\,\mathrm{d}x = \pi\cdot\frac{4}{9}\left[\frac{x^3}{3}\right]_0^3 = \pi\cdot\frac{4}{9}\cdot\frac{27}{3} = \pi\cdot\frac{4}{9}\cdot 9$$

$$\boxed{V = 4\pi\ \text{u.v.}}$$

**La vérification :** la formule du cône donne `πr²h/3 = π × 2² × 3 / 3 = 4π`. **Identique.**

**Le cas général, en trois lignes** (le montrer : c'est la preuve que la coïncidence n'en est pas une) — avec `f(x) = \tfrac{r}{h}x` sur `[0,h]` :

$$\pi\int_0^h \frac{r^2}{h^2}x^2\,\mathrm{d}x = \pi\frac{r^2}{h^2}\left[\frac{x^3}{3}\right]_0^h = \pi\frac{r^2}{h^2}\cdot\frac{h^3}{3} = \frac{\pi r^2 h}{3}$$

*La formule du cône n'est plus une formule à retenir : c'est une intégrale qu'on sait refaire.*

### 4.3 Exemple 3 — quand `f²` demande une IPP : `f(x) = \sqrt{\ln x}` sur `[1,e]`

**Ce qu'on cherche et pourquoi ce geste :** sur `[1,e]`, `ln x ≥ 0`, donc `f` est bien définie et positive. Le carré donne `f(x)² = ln x` — et cette intégrale-là, **on l'a déjà calculée au chapitre 8** (exemple travaillé 2 de l'IPP). Le réflexe d'expert n'est pas de recalculer : c'est de **reconnaître** et de réutiliser.

$$V = \pi\int_1^e \big(\sqrt{\ln x}\big)^2\,\mathrm{d}x = \pi\int_1^e \ln(x)\,\mathrm{d}x = \pi \times 1$$

$$\boxed{V = \pi\ \text{u.v.} \approx 3{,}14\ \text{u.v.}}$$

*(Rappel du chapitre 8, une ligne, sans refaire l'IPP : `∫₁^e ln x dx = [x ln x]₁^e − ∫₁^e 1 dx = e − (e−1) = 1`.)*

### 4.4 L'unité de volume, et la conversion en cm³

**Le mécanisme, en une image :** `1 u.a.` est l'aire du **carré** bâti sur l'unité des deux axes. `1 u.v.` est le volume du **CUBE** bâti sur l'unité — trois longueurs, pas deux.

Dans un repère **orthonormé** où l'unité vaut `k` cm sur chaque axe :

$$1\ \text{u.a.} = k^2\ \text{cm}^2 \qquad\text{et}\qquad \boxed{1\ \text{u.v.} = k^3\ \text{cm}^3}$$

**Avec `k = 2` cm :** `1 u.v. = 2×2×2 = 8 cm³`, donc l'exemple 1 vaut

$$V = 8\pi\ \text{u.v.} = 8\pi \times 8 = 64\pi\ \text{cm}^3 \approx 201{,}1\ \text{cm}^3$$

**L'erreur à repérer :** multiplier par `k² = 4` (le facteur de l'**aire**) et annoncer `32π cm³`. C'est l'erreur d'un élève qui a **bien** appris la règle de l'aire et l'a transportée d'un cran trop court. Le réflexe qui protège, et qu'il faut nommer : **une longueur se convertit avec `k`, une aire avec `k²`, un volume avec `k³`** — compte les directions.

**Et pourquoi cette conversion ne s'apprend jamais toute seule :** le bac écrit très souvent *« On prendra `‖i⃗‖ = 1 cm »*. Alors `1 u.v. = 1 cm³` et **le nombre ne change pas** — la conversion est invisible, donc jamais exercée. Le jour où l'énoncé écrit `2 cm`, l'élève qui n'a jamais vu le cube multiplie par `4`. (C'est exactement le cas du sujet 2023, §8.1.)

**Pourquoi on ne convertit jamais en cours de route :** l'intégrale rend **toujours** des u.v. ; la conversion vient à la toute fin. Même règle qu'au chapitre 9 pour les u.a.

### 4.5 Le réflexe de bac — traduire la phrase

Le bac ne demande jamais « calcule `π∫f²` ». Il écrit :

> « Calculer, en cm³, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe `(C)` relative à l'intervalle `[a,b]`. (On prendra `‖i⃗‖ = 1 cm`) »

Trois mots à repérer, et la traduction est automatique : **« un tour complet »** → le disque est entier ; **« autour de l'axe des abscisses »** → `V = π∫ₐᵇ f(x)²dx` ; **« en cm³ »** → il y aura une conversion à la fin, `1 u.v. = k³ cm³`.

---

## 5. Misconception inventory — 5 new ids

Registry format (`items.yaml` → `misconceptions:`), ids `mc.math.maths_calcul_integral.<slug>`, **all three fields in French**.

**The merge rule applied here, stated once so it can be checked:** *two wrong models that always produce the **same number** cannot be separated by a student's answer, and therefore share **one** id* (the feedback names both routes). This is why « circonférence au lieu de l'aire du disque » and « un tour complet vaut `2π`, donc `2π × aire` » are **one** misconception (`M-VOL-2`) — both yield `2π∫f`, always. Conversely, `π∫f`, `2π∫f`, `∫f²`, `π(∫f)²` yield **four distinct numbers** on every non-degenerate seed, so they are four ids.

---

### M-VOL-1 — `volume-oubli-du-carre`

```yaml
- id: mc.math.maths_calcul_integral.volume-oubli-du-carre
  label: "Volume de révolution : le rayon n'est pas élevé au carré"
  description: >-
    L'élève écrit $V=\pi\int_a^b f(x)\,\mathrm{d}x$ : il a retenu le $\pi$ et
    l'intégrale, mais traite la tranche comme si son aire était proportionnelle
    au rayon $f(x)$, et non à son carré. Il transporte l'aire sous la courbe
    (une somme de longueurs) dans une question de volume, en lui collant un
    $\pi$ devant.
  contradicts_principle: >-
    La tranche perpendiculaire à $(Ox)$ à l'abscisse $x$ est un DISQUE de rayon
    $f(x)$ : son aire vaut $\pi f(x)^2$, pas $\pi f(x)$. Doubler $f$ QUADRUPLE
    la tranche. D'où $V=\pi\int_a^b \big(f(x)\big)^2\,\mathrm{d}x$.
```
- **Se manifeste :** répond `16π/3` au lieu de `8π` sur `f=√x, [0,4]` ; écrit la bonne formule au tableau puis intègre `f` ; ne voit aucune différence entre la question d'aire et la question de volume.
- **Confrontation :** la figure de la tranche (§6, `volume-revolution-tranche`) + la **vue de face** de la scène 3D (étape 2), où le disque se voit comme un vrai cercle ; et le contrôle dimensionnel : `π∫f` a la dimension d'une aire, pas d'un volume.

### M-VOL-2 — `volume-circonference-vs-disque`

```yaml
- id: mc.math.maths_calcul_integral.volume-circonference-vs-disque
  label: "Volume de révolution : la circonférence prise pour le disque (ou « un tour complet = ×2π »)"
  description: >-
    L'élève écrit $V=2\pi\int_a^b f(x)\,\mathrm{d}x$, par l'une de deux routes
    qui donnent toujours le même nombre : soit il prend la CIRCONFÉRENCE
    $2\pi r$ du cercle pour l'aire du disque, soit il raisonne « un tour complet
    vaut $2\pi$ radians, donc le volume est l'aire de la région multipliée par
    $2\pi$ ».
  contradicts_principle: >-
    La tranche est un disque PLEIN : ce qui s'accumule est son AIRE $\pi f(x)^2$,
    pas son périmètre $2\pi f(x)$ (un périmètre est une longueur). Et l'angle de
    rotation ne se multiplie pas à l'aire : les points de la région sont à des
    distances différentes de l'axe, donc ils ne balaient pas tous la même chose.
```
- **Se manifeste :** répond `32π/3` au lieu de `8π` ; justifie par « un tour complet, c'est `2π` » ; dit que la tranche « est un cercle ».
- **Confrontation :** étape 1 de la scène (le pari `2π × aire` casse sur sa propre conséquence : on voit les points hauts balayer de grands cercles et les points bas de petits) ; puis étape 2, où le disque apparaît **plein** en vue de face.
- ⚠ **Piège de contamination à interdire (stem defect) :** `πr² = 2πr` exactement quand **`r = 2`**. Un item ou un pari construit sur une tranche de rayon `2` laisse ce modèle faux atteindre la **bonne** réponse. **Interdit.** Voir §7.3.

### M-VOL-3 — `volume-integrale-sans-pi`

```yaml
- id: mc.math.maths_calcul_integral.volume-integrale-sans-pi
  label: "Volume de révolution : l'intégrale rendue telle quelle, sans le facteur π"
  description: >-
    L'élève calcule $\int_a^b \big(f(x)\big)^2\,\mathrm{d}x$ et annonce ce
    nombre comme le volume. Modèle sous-jacent : « pour l'aire, l'intégrale
    DONNAIT la réponse ; pour le volume, ce doit être pareil » — l'intégrale est
    prise pour la réponse elle-même, sans facteur géométrique.
  contradicts_principle: >-
    L'intégrale accumule l'AIRE DES TRANCHES, et l'aire d'une tranche de rayon
    $f(x)$ vaut $\pi f(x)^2$ : le $\pi$ fait partie de la grandeur accumulée, il
    n'est pas un ornement. $V=\pi\int_a^b \big(f(x)\big)^2\,\mathrm{d}x$, jamais
    $\int_a^b \big(f(x)\big)^2\,\mathrm{d}x$ seule.
```
- **Se manifeste :** répond `8` au lieu de `8π` ; rend un volume « sans `π` » alors que tous les volumes de révolution du bac en portent un.
- **Confrontation :** étape 1 de la scène (le choix « la rotation ne change pas la quantité ») + la comparaison explicite aire `16/3` u.a. / volume `8π` u.v. dans le tableau §3.3.

### M-VOL-4 — `volume-carre-mal-place`

```yaml
- id: mc.math.maths_calcul_integral.volume-carre-mal-place
  label: "Volume de révolution : le carré posé sur l'intégrale au lieu de la fonction"
  description: >-
    L'élève écrit $V=\pi\left(\int_a^b f(x)\,\mathrm{d}x\right)^2$ : il sait
    qu'un carré intervient, mais il l'applique au RÉSULTAT de l'intégration au
    lieu de la fonction sous le signe intégral. C'est la linéarité étendue au
    produit ($\int f\cdot f = \int f \cdot \int f$), appliquée au carré.
  contradicts_principle: >-
    $\left(\int_a^b f\right)^2 \neq \int_a^b f^2$ : l'intégrale n'est pas
    multiplicative (chapitre 3). Le carré porte sur la FONCTION, parce qu'il
    vient du rayon de la tranche : on carre d'abord $f(x)$, on intègre ensuite.
```
- **Se manifeste :** répond `256π/9` au lieu de `8π` ; calcule `∫f` d'abord « parce que c'est plus simple », puis carre.
- **Confrontation :** contre-exemple d'une ligne sur `f(x)=x` sur `[0,1]` : `∫f = 1/2` donc `(∫f)² = 1/4`, alors que `∫f² = 1/3` — **deux nombres différents**, donc l'opération n'est pas permutable. Renvoi explicite à `linearite-abusive` (chapitre 3).
- **DUAL-TAG (ADR 0009) :** tout distracteur `π(∫f)²` porte **les deux** ids `volume-carre-mal-place` **et** `linearite-abusive`. Ce n'est pas un défaut d'énoncé (co-attribution entre compétences), c'est le cas que la règle prévoit.

### M-VOL-5 — `conversion-unites-volume`

```yaml
- id: mc.math.maths_calcul_integral.conversion-unites-volume
  label: "Conversion u.v. → cm³ avec le facteur de l'aire (k²) au lieu du cube (k³)"
  description: >-
    Pour convertir un volume exprimé en unités de volume, l'élève multiplie par
    le carré de l'échelle (le facteur qu'il a appris pour les AIRES), ou par
    l'échelle seule, ou ne convertit pas du tout. Il compte deux directions là
    où il y en a trois.
  contradicts_principle: >-
    $1$ u.v. est le volume du CUBE bâti sur l'unité : dans un repère orthonormé
    d'unité $k$ cm, $1$ u.v. $=k^3$ cm³ (et $1$ u.a. $=k^2$ cm²). Une longueur se
    convertit avec $k$, une aire avec $k^2$, un volume avec $k^3$ — le facteur
    compte les DIRECTIONS.
```
- **Se manifeste :** `8π u.v.` avec `k = 2 cm` rendu en `32π cm³` (facteur `4`) ou `16π cm³` (facteur `2`) au lieu de `64π cm³` ; ou « rien à convertir ».
- **Confrontation :** la figure `unite-de-volume-cube` (§6) — le carré unité **à côté** du cube unité — et l'étape 5 de la scène, où le cube apparaît en volume à côté du solide.

#### ⚠ Décision demandée par le brief : étendre `conversion-unites-aire` ou créer un frère ? → **FRÈRE. Justification, en trois points :**
1. **Le modèle existant serait rendu faux.** `conversion-unites-aire.label` / `.description` / `.contradicts_principle` disent tous « aire », « carré de l'échelle », « `1 u.a. = k² cm²` ». Les élargir aux volumes remplacerait un principe net par un principe flou, et brouillerait les trois items qui l'attestent aujourd'hui (CI-27, CI-33, CI-34), tous sur des aires.
2. **L'attribution deviendrait FAUSSE, et le modèle apprenant s'en nourrit.** L'erreur volume la plus fréquente (`×k²` au lieu de `×k³`) est commise par un élève qui a **parfaitement** appris la règle de l'aire et l'a sur-transportée. La taguer `conversion-unites-aire` dirait au moteur « il ne sait pas convertir une aire » — l'inverse de la vérité. Un faux positif versé au modèle est précisément ce que `eleve-ruse` documente comme le coût réel d'un item mal réglé.
3. **La remédiation diffère.** Aire : « tu n'as compté qu'une direction ». Volume : « tu en as compté deux sur trois ». Deux phrases, deux gestes.

**Contrainte de tagage pour item-author :** le distracteur « `×k²`, le facteur de l'aire » porte **`conversion-unites-volume` SEULEMENT**, jamais `conversion-unites-aire`. Ajouter dans la `description` du frère un renvoi textuel (« voir aussi `conversion-unites-aire` pour le cas 2D »), **pas** un double tag.

---

## 6. Media / interactive callouts (typés ADR 0017 + ADR 0041)

> **Taxonomy note — read before "correcting" a tool value.** ADR 0017's amendment du 2026-07-07 **closed** new GeoGebra/Desmos embeds (licence, vérification headless impossible, fidélité du vocabulaire français). ADR 0041 (2026-09-23) makes the first-party **three.js scene** the sanctioned `manipulable`. So the value below is `tool: scene3d`, **deliberately**, and it is not a drift from the older `geogebra/desmos/falstad/phet` list.

### C-VOL-1 — `[[figure:volume-revolution-tranche]]` — **REQUIRED**
- **`type: structural-diagram`** · **`tool: svg+katex`** — never gemini (exact geometry + KaTeX labels carry the whole mechanism).
- Doit montrer : la région sous `y=f(x)` sur `[a,b]` ; le solide engendré en perspective légère ; **la tranche perpendiculaire à `(Ox)` à l'abscisse `x`, hachurée, avec son rayon `f(x)` tracé du centre au bord** ; l'étiquette KaTeX `\mathcal{A}_{\text{tranche}} = \pi f(x)^2` ; l'épaisseur de la tranche suggérée, **sans aucun `Σ` ni aucune somme chiffrée** (B1).
- Elle est aussi le **repli papier / sans-WebGL** de la scène (ADR 0041 §5) : elle doit se suffire à elle-même.
- `stages` requis (LESSON-EXPERIENCE-SPEC §2.8) : (1) la région plane ; (2) la région a tourné, le solide apparaît ; (3) la tranche isolée, son rayon et son aire.

### C-VOL-2 — `[[embed:solide-de-revolution]]` — **REQUIRED** — voir §9
- **`type: manipulable`** · **`tool: scene3d`** (three.js, ADR 0041).
- **Elle est aussi la réponse à la box « Motion-decision rule » de NOTION-TEMPLATE-V2 :** le rung enseigne une relation dynamique (le balayage). Justification écrite, comme la box l'exige : **on livre la manipulation plutôt qu'un `motion`/manim, parce que l'élève doit pouvoir arrêter le balayage où il veut et comparer un demi-tour à un tour complet** — « an interactive appears because manipulation is the path to understanding » (VISION). Pas de clip manim sur ce rung.

### C-VOL-3 — `[[figure:unite-de-volume-cube]]` — **REQUIRED**
- **`type: structural-diagram`** · **`tool: svg+katex`**.
- Doit montrer : côte à côte, le **carré** unité (côté `k` cm, `1 u.a. = k² cm²`) et le **cube** unité (côté `k` cm, `1 u.v. = k³ cm³`), avec `k = 2` cm chiffré (`4 cm²` / `8 cm³`) ; et la ligne des trois facteurs `longueur → k`, `aire → k²`, `volume → k³`. KaTeX pour toutes les formules.
- `stages` : (1) le segment unité et `k` ; (2) le carré et `k²` ; (3) le cube et `k³`.

### C-VOL-4 — `[[figure:cone-verification]]` — **OPTIONAL**
- **`type: structural-diagram`** · **`tool: svg+katex`** : le cône `r=2, h=3` avec la droite génératrice, `r` et `h` cotés, et les deux calculs qui se rejoignent (`π∫₀³(2x/3)²dx` et `πr²h/3`, tous deux `4π`).
- **Optionnel** : l'étape 4 de la scène porte déjà cette vérification. À livrer seulement si la scène glisse ; sinon, DESIGN-BIBLE (calme) préfère deux figures à quatre sur un même rung.

**Rien d'autre sur ce rung.** Pas d'illustration d'ambiance : la notion n'a pas besoin d'une mise en scène, elle a besoin qu'on voie la tranche.

---

## 7. Build spec — for item-author (`items.yaml`)

### 7.1 Ce qu'il faut ajouter
- **5 misconception records** (§5), champs `label` / `description` / `contradicts_principle` **en français**, recopiés tels quels.
- **16 items, CI-35 → CI-50** (§7.2).
- **Retaguer CI-28, CI-29, CI-30 : `rung: "R9"` → `rung: "R10"`.**
- **Mettre à jour `coverage_summary` :** `total_items: 50` ; `ramp_coverage` → `R9: 14`, `R10: 5` (les autres inchangés) ; `per_misconception` + les 5 nouvelles lignes ; `floor: 3`, `floor_met: true`. Réécrire `honest_state` (aujourd'hui : « six modèles y siègent EXACTEMENT ») en recomptant — le tableau est **généré** et gardé par `web/scripts/resume-couverture.mjs`, ne pas l'écrire à la main sans relancer le script.
- **`habilete` sur chacun des 16 nouveaux items** (triplet MATHS, §1.3) — c'est le correctif en avant de fid-S5.19. Cible : **8 `application_directe` / 5 `application_non_explicite` / 3 `synthese`**.
- **Tag par distracteur sur les 16** (les items récents du fichier le font déjà ; ne pas régresser).

### 7.2 Table des items — id → misconception → rung → intention

| id | rung | habileté | primary_misconception | tags distracteurs | intention (une ligne) | graine vérifiée |
|---|---|---|---|---|---|---|
| **CI-35** | R9 | directe | `volume-oubli-du-carre` | circonference, sans-pi | Choix de **formule** : quel calcul donne `V` ? | `f=√x, [0,4]` → `8π` ; faux : `16π/3`, `32π/3`, `8` |
| **CI-36** | R9 | directe | `volume-oubli-du-carre` | carre-mal-place, sans-pi | Valeur numérique, cas le plus simple | `f=x, [0,1]` → `π/3` ; faux : `π/2`, `π/4`, `1/3` |
| **CI-37** | R9 | non explicite | `volume-oubli-du-carre` | sans-pi, carre-mal-place | **Abstrait** : on donne `∫f` et `∫f²`, aucun calcul — le modèle seul | `∫₁⁴f=3`, `∫₁⁴f²=5` → `5π` ; faux : `3π`, `5`, `9π` |
| **CI-38** | R9 | non explicite | `volume-circonference-vs-disque` | oubli-du-carre, sans-pi | **Aire d'UNE tranche** (pas le volume) : disque vs cercle | rayon `1,5` → `2,25π` ; faux : `3π`, `1,5π`, `1,5` |
| **CI-39** | R9 | non explicite | `volume-circonference-vs-disque` | oubli-du-carre, sans-pi | Critiquer la phrase « un tour complet vaut `2π`, donc `2π × aire` » | `f=√x, [0,4]` → `8π` ; faux : `32π/3`, `16π/3`, `16/3` |
| **CI-40** | R9 | synthèse | `volume-circonference-vs-disque` | conversion-unites-volume | **Échelle :** on remplace `f` par `2f` — `V` est multiplié par… | `4` ; faux : `2` (modèle linéaire), `8` (réflexe du cube) |
| **CI-41** | R9 | directe | `volume-integrale-sans-pi` | oubli-du-carre, circonference | Le cône, en item : la formule connue doit sortir | `f=2x/3, [0,3]` → `4π` ; faux : `4`, `3π`, `6π` |
| **CI-42** | R9 | directe | `volume-integrale-sans-pi` | oubli-du-carre, circonference | Le `π` n'est pas un ornement — contrôle par la grandeur accumulée | `f=x², [0,1]` → `π/5` ; faux : `1/5`, `π/3`, `2π/3` |
| **CI-43** | R9 | directe | `volume-integrale-sans-pi` | carre-mal-place, oubli-du-carre | Exponentielle : `f²` immédiat, bornes non triviales | `f=e^{-x}, [0,ln 2]` → `3π/8` ; faux : `3/8`, `π/4`, `π/2` |
| **CI-44** | R9 | non explicite | `volume-carre-mal-place` (+ `linearite-abusive`) | oubli-du-carre, sans-pi | Un élève a écrit `π(∫f)²` — corriger et dire pourquoi | `f=x+1, [0,2]` → `26π/3` ; faux : `16π`, `4π`, `26/3` |
| **CI-45** | R9 | non explicite | `volume-carre-mal-place` (+ `linearite-abusive`) | sans-pi, oubli-du-carre | **Abstrait**, autre cadrage que CI-37 : `(∫f)²` vs `∫f²` | `∫f=4`, `∫f²=10` → `10π` ; faux : `16π`, `10`, `4π` |
| **CI-46** | R9 | directe | `conversion-unites-volume` | — | Conversion nue, `k = 2` cm | `5 u.v.` → `40 cm³` ; faux : `20`, `10`, `5` |
| **CI-47** | R9 | directe | `conversion-unites-volume` | — | Conversion avec `π` et `k = 3` cm | `2π u.v.` → `54π cm³` ; faux : `18π`, `6π`, `2π` |
| **CI-48** | R9 | directe | `conversion-unites-volume` | — | **Les deux sujets côte à côte** : `‖i⃗‖=1 cm` puis `2 cm`, même solide `3 u.v.` | `3 cm³` / `24 cm³` ; faux : `3/12`, `3/6`, `3/3` |
| **CI-49** | **R10** | synthèse | `conversion-unites-volume` | sans-pi, oubli-du-carre | **Synthèse :** `f²` par IPP donnée, puis conversion `k = 2` cm | `f=√(ln x), [1,e²]`, `∫ln x = e²+1` → `8π(e²+1) cm³` |
| **CI-50** | **R10** | synthèse | `volume-carre-mal-place` (+ `linearite-abusive`) | sans-pi, circonference | **Synthèse, patron 2023 :** `∫ t ln t` donnée, le carré mal placé piégé | `f=√(x ln x), [1,e]`, `∫₁^e t ln t = (e²+1)/4` → `π(e²+1)/4 u.v.` |

**Couverture obtenue (≥ 3 partout, avec marge — la marge est voulue : `honest_state` signale aujourd'hui six modèles à zéro marge) :**

| misconception | items | total |
|---|---|---|
| `volume-oubli-du-carre` | CI-35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 49 | **11** |
| `volume-circonference-vs-disque` | CI-35, 38, 39, 40, 41, 42, 50 | **7** |
| `volume-integrale-sans-pi` | CI-35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 49, 50 | **12** |
| `volume-carre-mal-place` | CI-36, 37, 43, 44, 45, 50 | **6** |
| `conversion-unites-volume` | CI-40, 46, 47, 48, 49 | **5** |

*(Méthode de comptage du fichier : une misconception compte un item dès qu'**au moins un** distracteur la porte, une seule fois par item.)*

### 7.3 Contraintes de qualité — dures, gardées par les portes du dépôt

1. **`indice-longueur`** (`web/scripts/indice-longueur.mjs`) — la clé **ne doit pas être le choix strictement le plus long** ; le cliquet arme à partir de `ÉCART_MIN = 20` caractères et `AVANCE_MIN = 20 %` sur le deuxième, et une notion neuve doit naître sous `PLAFOND_NEUF = 40 %`. **L'indice INVERSE est gardé aussi** : la clé ne doit pas non plus être nettement la plus courte. *Piège propre à ce rung :* la bonne réponse porte naturellement la justification la plus riche (« car la tranche est un disque d'aire `πf(x)²` ») — **donner une justification de longueur comparable à CHAQUE distracteur**, pas seulement à la clé.
2. **`indice-absolu`** — pas de `toujours`, `jamais`, `forcément`, `aucun(e)`, `tous les`, `toutes les`, `uniquement`, `seulement` comme marqueur. Corollaire gardé dans les deux sens : ne pas non plus réparer en collant un absolu **sur la clé** si elle est alors la seule à en porter un.
3. **`indice-refus`** (99 % fiable, donc le tell le plus coûteux) — **aucun distracteur du type « on ne peut pas conclure », « il manque une donnée », « impossible sans `‖j⃗‖` »**. Ce rung en appelle un naturellement (les conversions) : l'interdire explicitement.
4. **Le *clang*** — ne pas faire de la clé **le seul** choix qui reprend un mot saillant du tronc (« disque », « tour complet », « orthonormé »).
5. **`eleve-ruse`** — l'union des quatre ficelles ne doit pas battre l'item : après application de la stratégie (barrer les refus, barrer les absolus, barrer le clang, cocher le plus long), l'espérance doit rester au hasard. **Vérifier item par item avant de livrer.**
6. **`enonces-jumeaux`** — deux portes franches. (a) Aucun énoncé de checkpoint identique à un item **sans** `item_source: clone_of_<id>` ; (b) aucun `clone_of_X` dont `X` n'existe pas. **Application ici :** `cp-volume-disque` reprend le tronc de **CI-35** → il porte **`item_source: clone_of_CI-35`**, et CI-35 doit exister. Et la mesure des jumeaux **entre items** ne peut pas augmenter : CI-35 / CI-39 / CI-44 tournent sur des graines proches — **cadrages et nombres différents obligatoires** (choix de formule / critique d'une phrase / correction d'un calcul, et trois fonctions différentes comme prescrit au tableau).
7. **⚠ CONTAMINATION DE LA BONNE RÉPONSE — la contrainte arithmétique propre à ce rung (défaut d'énoncé, à réviser, pas à taguer).** Sur chaque graine, calculer les **cinq** valeurs et vérifier qu'elles sont **deux à deux distinctes** :
   `π∫f²` (clé) · `π∫f` · `2π∫f` · `∫f²` · `π(∫f)²`.
   Collisions connues, **interdites** :
   - **tranche de rayon `r = 1`** → `πr² = πr` : `oubli-du-carre` atteint la clé ;
   - **tranche de rayon `r = 2`** → `πr² = 2πr` : `circonference-vs-disque` atteint la clé ;
   - **`∫f = 2`** → `2π∫f = π(∫f)²` : deux distracteurs fusionnent (pas faux, mais l'item perd un modèle) ;
   - **cône `r = 3`** (p. ex. `f = 3x/4` sur `[0,4]`) → `2π∫f = πr²h/3` : `circonference-vs-disque` atteint la clé. **C'est pourquoi le cône de la leçon est `r = 2, h = 3`, et non `r = 3, h = 4`.**
   Toutes les graines du tableau §7.2 ont été vérifiées contre ces quatre collisions.
8. **Dual-tag assumé, pas corrigé** (ADR 0009) : `π(∫f)²` porte `volume-carre-mal-place` **et** `linearite-abusive`. La co-attribution entre compétences n'est pas un défaut ; la contamination de la **clé** (point 7) en est un.
9. **Frontière :** aucun item ne peut exiger un changement de variable (B2), une rotation autour de `(Oy)` (B5), un volume entre deux courbes (B8), ni une double IPP pour SExp (B3).

---

## 8. Build spec — for content-author (`lesson.md`, `checkpoints.yaml`, `exercises.yaml`)

### 8.1 Le précédent de bac — vérifié, à citer, à imiter dans le registre

**`docs/sujets/_incoming/maths-sm-2023-r.md:122`** — examen national **2023, session de rattrapage, Sciences Mathématiques**, Exercice 1, Partie III, question 2c (0,5 pt) :

> « Calculer, en `cm³`, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe `(C₁)` relative à l'intervalle `[0,1]`. (On prendra `‖i⃗‖ = 1 cm`) »

avec `f₁(x) = √x · ln x`, résolu via `F(x) = ∫ₓ¹ (f₁(t))² dt` établie par **double IPP** à la question 1b, puis `V = π·F(0) = **π/4 cm³**`. Arithmétique re-vérifiée ici : `G(t) = \frac{t^2}{2}\ln^2 t - \frac{t^2}{2}\ln t + \frac{t^2}{4}` est une primitive de `t\ln^2 t` (`G' = t\ln^2 t`), `F(0) = G(1) = 1/4`, `V = π/4 cm³` — conforme au vérificateur adversarial du dépôt (`maths-sm-2023-r.md:140-145`) et à la correction publique du sujet.

**Ce que ce précédent impose au rung, et qui doit s'y retrouver mot pour mot :**
- la **phrase-type** (§4.5) ;
- le dispositif `‖i⃗‖ = 1 cm` (→ `1 u.v. = 1 cm³`, conversion **invisible** — d'où §4.4) ;
- le **procédé de fabrication des énoncés** : une racine dans `f` pour que `f²` soit intégrable par IPP. C'est ce qui justifie les fonctions choisies en §4.1, §4.3 et §8.4.

Autres précédents recherchés : la formule circule dans les manuels marocains sous la forme canonique *« si `h` est continue et positive sur `[a,b]` … alors le volume `V` du solide de révolution engendré par la rotation de `E` autour de l'axe des abscisses est, **en unités de volume**, `V = π∫ₐᵇ (h(x))² dx` »* — c'est le registre à adopter. **Aucun second sujet national n'a pu être vérifié caractère par caractère** (les corpus consultés indexent les PDF sans les exposer). Ne **pas** en inventer un : `exercises.yaml` n'accepte `sourcing.status: sourced` que pour un sujet identifié (NOTION-TEMPLATE-V2 §C, box bloquante). Voir §10 Q3.

### 8.2 Le plan du rung R9 — dans cet ordre

**Titre :** `## R9 — Faire tourner la région : le volume d'un solide de révolution`

1. **Le pont depuis R8** (2–3 phrases) : « Au chapitre 9, tu as mesuré une région. Fais-la maintenant tourner d'un tour complet autour de l'axe des abscisses : elle ne balaie plus une surface, elle engendre un **solide** — et ce solide a un volume que la même intégrale sait calculer. » Poser tout de suite la phrase du bac (§4.5) : c'est de là que vient la question.
2. **`[[embed:solide-de-revolution]]`** — **AVANT la prose qui donne les réponses** (ADR 0041 §6 et sa rétractation : une scène posée derrière les paragraphes qui expliquent ne casse plus rien). Un paragraphe d'annonce, court et calme, qui dit ce qu'on va y parier.
3. **Le mécanisme** (§3.1, points 1→7), avec **`[[figure:volume-revolution-tranche]]`** au point 4.
4. **`[[checkpoint:cp-volume-disque]]`** (§8.3) — porte de rupture, **après** le mécanisme, **avant** les exemples travaillés.
5. **L'erreur à repérer** (§3.3, le tableau des quatre formules fausses).
6. **Exemple travaillé 1** (§4.1) — `f=√x`, `[0,4]`, `V = 8π u.v.`
7. **Exemple travaillé 2 — le cône** (§4.2) — `4π u.v.`, puis le cas général `πr²h/3`. *(Optionnel : `[[figure:cone-verification]]`.)*
8. **Exemple travaillé 3** (§4.3) — `f=√(ln x)` sur `[1,e]`, `V = π u.v.`, en **réutilisant** `∫₁^e ln x dx = 1` du chapitre 8.
9. **Les unités de volume** (§4.4) + **`[[figure:unite-de-volume-cube]]`** + l'erreur `×k²`.
10. **Le réflexe de bac** (§4.5) — traduire la phrase, trois mots, trois conséquences.

### 8.3 Le checkpoint — `cp-volume-disque`

```yaml
- id: cp-volume-disque
  rung: "R9"
  habilete: application_directe        # triplet MATHS (§1.3), pas le triplet PC
  skill_code: maths_calcul_integral
  tags: [checkpoint, formative, misconception_driven, maths_calcul_integral, volume_revolution]
  primary_misconception: mc.math.maths_calcul_integral.volume-oubli-du-carre
  item_source: clone_of_CI-35          # §7.3 point 6 — CI-35 doit exister
  lesson_placement: in_R9
```

**Tronc :** « La courbe de `f(x)=\sqrt{x}` sur `[0,4]` tourne d'un tour complet autour de l'axe des abscisses. Quel calcul donne le volume du solide engendré, en unités de volume ? »

| | Choix | Correct | Tag |
|---|---|---|---|
| A | `\pi\int_0^4 x\,\mathrm{d}x`, car la tranche à l'abscisse `x` est un disque d'aire `\pi f(x)^2` | **oui** (`8π`) | — |
| B | `\pi\int_0^4 \sqrt{x}\,\mathrm{d}x`, car le rayon de la tranche à l'abscisse `x` vaut `f(x)` | non (`16π/3`) | `volume-oubli-du-carre` |
| C | `2\pi\int_0^4 \sqrt{x}\,\mathrm{d}x`, car un tour complet fait `2\pi` radians | non (`32π/3`) | `volume-circonference-vs-disque` |
| D | `\int_0^4 x\,\mathrm{d}x`, car l'intégrale donne directement la grandeur cherchée | non (`8`) | `volume-integrale-sans-pi` |

**Feedbacks (nommer le modèle, pas le fait d'avoir faux — convention du fichier) :**
- **B :** « Modèle détecté : **le rayon non élevé au carré**. La tranche n'est pas un segment, c'est un **disque** de rayon `f(x)` : son aire vaut `πf(x)²`, pas `πf(x)`. Vérifie sur la scène en vue de face — double le rayon, la tranche est quatre fois plus grande. »
- **C :** « Modèle détecté : **la circonférence à la place du disque** (ou « un tour complet vaut `2π`, donc on multiplie l'aire par `2π` »). `2πf(x)` est le **périmètre** du cercle — une longueur. Et les points de la région ne sont pas tous à la même distance de l'axe : celui de hauteur `2` décrit un cercle deux fois plus grand que celui de hauteur `1`. »
- **D :** « Modèle détecté : **l'intégrale prise pour la réponse**. C'était vrai pour l'aire ; ici ce qui s'accumule est l'aire d'une tranche, et l'aire d'un disque de rayon `f(x)` vaut `πf(x)²` — le `π` fait partie de la grandeur, pas de la décoration. »
- **Correct :** « Exact. `(\sqrt x)^2 = x` : le carré fait disparaître la racine — c'est presque toujours pour ça qu'un énoncé de bac en met une. `V = \pi[x^2/2]_0^4 = 8\pi` u.v. »

*Contrôle de longueur : les quatre choix portent une justification de longueur comparable — c'est la contrainte `indice-longueur` (§7.3 point 1). Ne pas allonger A.*

### 8.4 Le sommet — une question de volume à R10

Ajouter **une** troisième question au rung d'entraînement, `[[exercise:r-volume]]`, après `r-bac` et `r-variation`, avec le contrat de révélation étagée (`AttemptFirstExercise`) : **rien n'est imprimé avant l'engagement** (NOTION-TEMPLATE-V2 §C ; et péd-F3 du REVIEW — ne pas annoncer la stratégie avant que l'élève cherche).

```yaml
- id: r-volume
  title: "Une question de volume, comme au bac"
  sourcing:
    status: not-applicable      # variation fraîche, pas un sujet recopié
    note: >-
      Variation construite sur le PATRON d'une question nationale vérifiée :
      2023, session de rattrapage, Sciences Mathématiques, Exercice 1 Partie III
      question 2c (docs/sujets/_incoming/maths-sm-2023-r.md:122) — même phrase,
      même dispositif d'unité, même procédé (une racine dans f pour que f² se
      traite par IPP). Le sujet 2023 lui-même demande une DOUBLE IPP : il est SM
      et reste hors de cette variation (limite SExp, B3). Sa reprise verbatim
      comme item « sourced » attend l'arbitrage de filière (REVIEW S1.2/S1.3).
```

**Énoncé (deux questions, dans l'ordre et le registre du bac) :**

> Soit `f` la fonction définie sur `[1,e]` par `f(x) = \sqrt{x\ln x}`, et `(C)` sa courbe dans un repère **orthonormé** `(O;\vec i,\vec j)`.
> 1. À l'aide d'une **intégration par parties**, montrer que `\displaystyle\int_1^e t\ln t\,\mathrm{d}t = \frac{e^2+1}{4}`.
> 2. Calculer, en `cm^3`, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe `(C)` relative à l'intervalle `[1,e]`. (On prendra `\|\vec i\| = 1\ \text{cm}`.)

**Corrigé, arithmétique vérifiée :**
- IPP avec `u = \ln t` (`u' = 1/t`) et `v' = t` (`v = t^2/2`) :
  `\int_1^e t\ln t\,dt = \left[\frac{t^2}{2}\ln t\right]_1^e - \int_1^e \frac{t}{2}\,dt = \frac{e^2}{2} - \left[\frac{t^2}{4}\right]_1^e = \frac{e^2}{2} - \frac{e^2}{4} + \frac14 = \frac{e^2+1}{4}`.
- Sur `[1,e]`, `x\ln x \ge 0` donc `f` est bien définie et **positive**, et `f(x)^2 = x\ln x`. D'où
  `V = \pi\int_1^e x\ln x\,dx = \dfrac{\pi(e^2+1)}{4}` u.v. `\approx 6{,}59` u.v.
- `\|\vec i\| = 1` cm en repère orthonormé → `1` u.v. `= 1^3 = 1` cm³, donc **`V = \dfrac{\pi(e^2+1)}{4}\ \text{cm}^3 \approx 6{,}59\ \text{cm}^3`**.

**Raisonnement expert à exposer (100 % des questions — box §C de NOTION-TEMPLATE-V2) :**
- Q1 : *pourquoi `u = ln t` et pas `v' = ln t` — parce que `ln` se **dérive** en `1/t`, ce qui simplifie, alors que le primitiver rendrait l'intégrale pire (chapitre 8).*
- Q2 : *le premier geste n'est pas de calculer, c'est de **traduire la phrase** : « un tour complet autour de l'axe des abscisses » ⇒ `V = π∫f²`. Le deuxième est de **regarder `f²` avant de paniquer** : la racine disparaît, et ce qui reste est **exactement** l'intégrale de la question 1 — le sujet l'a préparée. Le troisième est de **ne pas oublier l'unité** : ici `‖i⃗‖ = 1 cm`, donc le nombre ne bouge pas ; il aurait été multiplié par `8` avec `2 cm`.*

**Anti-mémorisation :** dire à l'élève, en une ligne, que la reconnaissance est l'objet — *« une racine dans `f`, une IPP qui t'a été préparée juste avant : c'est le montage standard d'une question de volume au bac ».*

### 8.5 Règles dures pour la prose

- **Français, voice-ready, tutoiement**, apostrophes ASCII en markdown (la chaîne `remarkFrenchTypography` convertit au rendu — ne jamais taper U+202F à la main).
- **KaTeX pour toutes les maths** ; math de **bloc** dès qu'il y a ≥ 2 transformations, une transformation par ligne ; pas de chaîne `a = b = c = d`.
- **Respecter §1.4 intégralement.** En particulier : **aucun `Σ`, aucune somme, aucun `n → +∞`** (B1) ; **jamais `(Oy)`** (B5) ; **jamais Pappus** (B7) ; **jamais un repère non orthonormé pour un volume** (B10).
- **Ne pas réintroduire les défauts corrigés le 2026-09-12 :** pas de faux universel (« tout ce qu'on a vu suppose… »), pas de renvoi mort (le chapitre de dérivation s'appelle **« Dérivabilité et étude des fonctions »**), pas de « chapitre suivant » ambigu (écrire le numéro).
- **`validate-content --strict content/maths/calcul-integral` doit rester à 0 failure.**

---

## 9. La scène 3D — `solide-de-revolution`

### 9.1 Le critère d'ADR 0041 §1, appliqué

**L'idée est SPATIALE, sans discussion.** (a) Une région **plane** engendre un **solide** : le passage 2D → 3D *est* le concept. (b) La coupe perpendiculaire à l'axe est un **disque**, et toute figure plane le dessine en **ellipse** — c'est exactement le défaut que le registre de `geometrie-espace` nomme `perspective-fiable`. Vue **de face**, en regardant le long de `(Ox)`, le disque redevient un vrai cercle et le rayon `f(x)` se lit au bon endroit. (c) Le **balayage** lui-même est une rotation dans la troisième dimension : un demi-tour, un tour complet, et la question « et si on multipliait l'aire par `2π` ? » tombe sous les yeux. Le relief n'est jamais invoqué.

### 9.2 Descripteur — `content/maths/calcul-integral/media/solide-de-revolution.json`

**Noms de champs, copiés à l'identique de `content/maths/geometrie-espace/media/produit-vectoriel.json` :**
racine → `slug`, `tool` (= `"scene3d"`), `scene`, `title_fr`, `caption_fr`, `etapes`, `boundary`, `fit_caveat`, `fallback_note`, `pedagogy_wiring` (`misconceptions`, `why_3d`, `predict_then_reveal`), `spec_ref`, `adr_ref`.
étape → `id`, `titre`, `consigne`, `pari` { `question`, `choix`[ { `id`, `texte`, `juste`, `misconception`?, `retour` } ] }, `suite`?, `controles`, `lectures`, `etat`.
**Pas de `revele_apres_h`** : la scène n'a pas de temps simulé, et `validate-content` refuse `revele_apres_h > 0` sur une scène sans temps (ADR 0041, addendum sphère).

- `slug`: `solide-de-revolution` · `scene`: `solide-revolution` · `tool`: `scene3d`
- `title_fr`: « Le solide de révolution, en trois dimensions »
- `caption_fr`: « Une région plane qui tourne, et le solide qu'elle engendre. Cinq étapes : à chaque fois tu paries d'abord, puis tu vois. Les fonctions sont celles des exemples travaillés. »

### 9.3 Les cinq étapes

> **Contrat de pari (ADR 0041 §6 + addendum du soir) : avant l'engagement, RIEN ne répond.** Ni le contrôle de l'étape, ni le solide balayé, ni la fiche de lectures, ni la description lue au lecteur d'écran. Ce qui reste visible, c'est l'énoncé : la scène telle que l'étape la pose.

#### Étape 1 — `balayage` · « La région tourne »
- `etat`: `{ fonction: "racine", balayage_deg: 0, x_tranche: 2.25, n_tranches: 1, unite_cm: 1, vue: "biais" }` · `controles`: `["balayage"]` · `lectures`: `["aire_region", "volume"]`
- `consigne` : « La région sous la courbe de `f(x)=\sqrt x` sur `[0,4]` : son aire vaut `\int_0^4\sqrt x\,dx = \left[\frac23 x\sqrt x\right]_0^4 = \frac{16}{3}` u.a. On la fait tourner d'un tour complet autour de l'axe des abscisses. »
  *(Corrigé à l'intégration, 2026-09-24 : la première rédaction disait « celle dont tu as calculé l'aire au chapitre 9 » — c'est faux, R8 n'a jamais calculé l'aire sous `√x` ; ses exemples sont `x²−4` sur `[0,3]` et l'aire entre `x` et `x²`. La consigne livrée calcule l'aire sur place.)*
- `pari.question` : « Un tour complet, c'est `2\pi` radians. Le volume engendré vaut donc… »
  - `2pi_aire` — « `2\pi` fois l'aire de la région, soit `\frac{32\pi}{3}` u.v. » · `juste: false` · **`volume-circonference-vs-disque`**
    `retour` : « Les points de la région ne sont pas tous à la même distance de l'axe : celui qui est à la hauteur `1` décrit un cercle de rayon `1`, celui qui est à la hauteur `2` un cercle deux fois plus grand. Multiplier toute l'aire par un seul facteur revient à supposer qu'ils balaient tous la même chose. Tourne le balayage et regarde les bords. »
  - `pi_f2` — « `\pi\int_0^4 x\,dx = 8\pi` u.v. : chaque tranche balaie un disque de rayon `f(x)` » · `juste: true`
    `retour` : « Oui. Ce qui s'accumule le long de `[0,4]`, ce n'est pas une longueur mais l'aire d'un disque : `\pi f(x)^2`. L'étape suivante regarde ce disque de face. »
  - `aire_inchangee` — « l'aire elle-même, `\frac{16}{3}` u.v. : tourner ne crée pas de matière » · `juste: false` · **`volume-integrale-sans-pi`**
    `retour` : « Tourner ne crée pas de matière, mais ce n'est plus la même grandeur : `\frac{16}{3}` mesure une **surface** (u.a.), `8\pi` mesure un **volume** (u.v.). Une aire ne peut pas être la réponse à une question de volume. »
- `suite` : « Fais varier l'angle de `0°` à `360°` : à `180°` tu as la moitié du solide, à `360°` le solide entier. L'aire de la région, elle, ne bouge pas. »
- **Ce que la scène montre APRÈS le pari :** le balayage s'ouvre ; la région tourne ; à `360°` la lecture affiche `V = 8\pi ≈ 25{,}13` u.v. **à côté de** l'aire `16/3 ≈ 5{,}33` u.a. — deux grandeurs, deux unités.

#### Étape 2 — `tranche` · « La coupe est un disque »
- `etat`: `{ fonction: "racine", balayage_deg: 360, x_tranche: 2.25, n_tranches: 1, unite_cm: 1, vue: "face" }` · `controles`: `["tranche"]` · `lectures`: `["rayon", "aire_tranche"]`
- `consigne` : « On coupe le solide par un plan perpendiculaire à l'axe, à l'abscisse `x = 2{,}25`. Le rayon de la coupe vaut `f(2{,}25)=\sqrt{2{,}25}=1{,}5`. La scène regarde le long de l'axe : le disque se voit en vrai. »
- `pari.question` : « L'aire de cette coupe vaut… »
  - `circonference` — « `2\pi\times 1{,}5 = 3\pi`, le tour du cercle » · `juste: false` · **`volume-circonference-vs-disque`**
    `retour` : « `2\pi r` est le **périmètre** — une longueur, pas une aire. La coupe n'est pas un cercle, c'est un disque **plein** : le segment qui va de l'axe au bord appartient tout entier à la région, donc il balaie tout l'intérieur. »
  - `disque` — « `\pi\times 1{,}5^2 = 2{,}25\pi`, l'aire du disque » · `juste: true`
    `retour` : « Oui : `\pi r^2` avec `r=f(x)`. Et remarque la conséquence : passe le rayon de `1{,}5` à `3` et l'aire ne double pas, elle **quadruple**. »
  - `rayon_seul` — « `\pi\times 1{,}5 = 1{,}5\pi`, le rayon fois `\pi` » · `juste: false` · **`volume-oubli-du-carre`**
    `retour` : « C'est l'erreur la plus fréquente du chapitre : le rayon n'est pas élevé au carré. L'aire d'un disque est `\pi r^2`. Déplace la tranche et regarde `\pi r` à côté de `\pi r^2` : ils ne suivent pas la même courbe. »
- `suite` : « Déplace la tranche le long de l'axe : le rayon `f(x)` suit la courbe, et l'aire de la tranche suit son **carré**. »
- **⚠ Contrainte dure :** `x_tranche = 2,25` (rayon `1,5`). **Ne jamais poser ce pari sur un rayon de `1` ou de `2`** — `\pi r^2` y coïncide avec `\pi r` puis avec `2\pi r`, et le modèle faux atteindrait la bonne réponse (§7.3 point 7).

#### Étape 3 — `tranches` · « Empiler les tranches »
- `etat`: `{ fonction: "racine", balayage_deg: 360, x_tranche: 2.25, n_tranches: 1, unite_cm: 1, vue: "biais" }` · `controles`: `["tranches"]` · `lectures`: `["rayon", "aire_tranche", "volume"]`
- `consigne` : « On reconstitue le solide avec des tranches de plus en plus minces, empilées le long de `[0,4]`. »
- `pari.question` : « La quantité qu'on accumule d'un bout à l'autre de l'intervalle, c'est… »
  - `aire_tranche` — « l'aire de chaque tranche, `\pi f(x)^2` — d'où `V=\pi\int_0^4 f(x)^2 dx` » · `juste: true`
    `retour` : « Oui. L'intégrale accumule l'aire de la tranche, tranche après tranche : c'est ce qui fait apparaître `f^2` et le `\pi`. »
  - `rayon` — « le rayon de chaque tranche, `f(x)` — d'où `V=\pi\int_0^4 f(x)dx` » · `juste: false` · **`volume-oubli-du-carre`**
    `retour` : « Un rayon est une longueur : en empilant des longueurs, on n'obtient pas un volume. Ce qui a une épaisseur et une aire, c'est la tranche. »
  - `perimetre` — « le tour de chaque tranche, `2\pi f(x)` » · `juste: false` · **`volume-circonference-vs-disque`**
    `retour` : « Le tour de la tranche décrit sa **peau**, pas son contenu. Le solide est plein : ce sont les disques qu'on empile, pas les cercles. »
- `suite` : « Augmente le nombre de tranches : l'escalier se referme sur le solide. »
- **⚠ Frontière B1 — non négociable :** ce contrôle n'affiche **AUCUNE somme**, aucun `\Sigma`, aucun total des disques, aucun « quand `n` devient grand… ». Il montre une **image** ; le seul nombre affiché pour le volume est la valeur **exacte** de l'intégrale. C'est ce qui le garde du côté autorisé de la `limite` SExp (§3.2).

#### Étape 4 — `fonction` · « Le cône, pour vérifier »
- `etat`: `{ fonction: "cone", balayage_deg: 360, x_tranche: 2.25, n_tranches: 1, unite_cm: 1, vue: "biais" }` · `controles`: `["fonction"]` · `lectures`: `["volume", "verification_cone"]`
- `consigne` : « On change de fonction : la droite `f(x)=\frac{2}{3}x` sur `[0,3]`. En tournant, elle engendre un **cône** de rayon `2` et de hauteur `3` — un solide dont tu connais le volume depuis le collège, `\frac{\pi r^2 h}{3}`. »
- `pari.question` : « L'intégrale `\pi\int_0^3 f(x)^2 dx` doit donc redonner `\frac{\pi\times 2^2\times 3}{3}`. Elle vaut… »
  - `quatre_pi` — « `4\pi` u.v. » · `juste: true`
    `retour` : « `\pi\int_0^3 \frac49 x^2 dx = \pi\cdot\frac49\cdot 9 = 4\pi`, et `\frac{\pi r^2h}{3} = \frac{\pi\cdot 4\cdot 3}{3} = 4\pi`. La formule du cône n'est plus à retenir : c'est une intégrale qu'on sait refaire. »
  - `trois_pi` — « `3\pi` u.v. » · `juste: false` · **`volume-oubli-du-carre`**
    `retour` : « `3\pi`, c'est `\pi\int_0^3 f(x)dx` — le rayon, pas son carré. Et le cône y perdrait : `\frac{\pi r^2h}{3}` vaut bien `4\pi`. »
  - `neuf_pi` — « `9\pi` u.v. » · `juste: false` · **`volume-carre-mal-place`**
    `retour` : « `9\pi = \pi\left(\int_0^3 f\right)^2 = \pi\times 3^2` : le carré a été posé sur l'**intégrale** au lieu de la **fonction**. `\left(\int f\right)^2 \neq \int f^2` — c'est la linéarité étendue au produit, refusée au chapitre 3. »
- `suite` : « Passe d'une fonction à l'autre : la racine donne un bol, la droite un cône, le logarithme la forme du sujet de bac. »

#### Étape 5 — `unite` · « Des unités de volume aux cm³ »
- `etat`: `{ fonction: "racine", balayage_deg: 360, x_tranche: 2.25, n_tranches: 1, unite_cm: 2, vue: "biais" }` · `controles`: `["unite"]` · `lectures`: `["volume", "volume_cm3"]`
- `consigne` : « Le repère est **orthonormé** et l'unité vaut `2` cm sur chaque axe. Le solide de l'étape 1 mesure `8\pi` u.v. »
- `pari.question` : « En `cm^3`, cela fait… »
  - `cube` — « `64\pi\ \text{cm}^3` : l'unité de volume est le cube de côté `2` cm, soit `8\ \text{cm}^3` » · `juste: true`
    `retour` : « Oui : trois directions, donc `2^3 = 8`. `8\pi \times 8 = 64\pi \approx 201\ \text{cm}^3`. »
  - `carre` — « `32\pi\ \text{cm}^3` : l'unité de volume vaut `2^2 = 4\ \text{cm}^3`, comme pour une aire » · `juste: false` · **`conversion-unites-volume`**
    `retour` : « `2^2` est le facteur d'une **aire** — tu as compté deux directions sur trois. Regarde le cube posé à côté du carré : il a une profondeur en plus. »
  - `echelle` — « `16\pi\ \text{cm}^3` : l'unité de volume vaut `2\ \text{cm}^3`, l'échelle du repère » · `juste: false` · **`conversion-unites-volume`**
    `retour` : « `2` est le facteur d'une **longueur**. Longueur `\to k`, aire `\to k^2`, volume `\to k^3` : le facteur compte les directions. »
- `suite` : « Fais varier l'unité de `1` à `3` cm : à `1` cm le nombre ne change pas du tout — c'est le cas du sujet de bac, et c'est pour ça que cette conversion ne s'apprend jamais toute seule. »
- **Ce que la scène montre après :** le **cube unité** apparaît, posé à côté du solide, arête cotée en cm ; la lecture bascule en `cm^3`.

### 9.4 Champs de fin de descripteur

- `boundary` : « Cadre de la leçon (R9) : rotation d'un tour complet autour de l'axe des **abscisses**, d'une région sous une courbe `y=f(x)` avec `f` continue et **positive**, en repère **orthonormé** ; `V=\pi\int_a^b f(x)^2 dx` en u.v. ; conversion `1` u.v. `= k^3` cm³. **Pas** de rotation autour de `(Oy)`, pas de méthode des tubes, pas de volume entre deux courbes, pas de théorème de Guldin, **aucune somme de Riemann** (limite SExp) : les tranches s'affichent, elles ne s'additionnent jamais. »
- `fit_caveat` : « Le solide et la tranche sont à la vraie grandeur de la fonction choisie. Le curseur de tranche avance par pas de `0{,}25` et est borné à l'intervalle de la fonction courante ; le balayage par pas de `15°`, pour que `180°` et `360°` soient atteints exactement. La caméra ne recadre qu'au changement de fonction, jamais pendant le balayage. »
- `fallback_note` : « Sans WebGL, le panneau le dit et garde les paris, les réglages et les calculs ; la figure `volume-revolution-tranche`, juste au-dessus dans la leçon, en montre l'essentiel. À l'impression, le panneau disparaît et les figures figées restent. »
- `pedagogy_wiring.misconceptions` : les quatre ids `volume-oubli-du-carre`, `volume-circonference-vs-disque`, `volume-integrale-sans-pi`, `volume-carre-mal-place`, `conversion-unites-volume` (préfixés `mc.math.maths_calcul_integral.`).
- `pedagogy_wiring.why_3d` : le §9.1, resserré en trois phrases.
- `pedagogy_wiring.predict_then_reveal` : « Chaque étape demande un pari AVANT toute preuve ; le solide balayé, le disque de coupe, la fiche de lectures et le verdict n'apparaissent qu'une fois le pari posé (ADR 0041 §6 et son addendum du soir). »
- `spec_ref` : `content/maths/calcul-integral/spec-extension.md` §9 ; `adr_ref` : `docs/decisions/0041-scenes-3d-de-premiere-partie.md`.

### 9.5 Ce que la scène exige du code — **frontend-builder, pas content-author**

Prescrit ici, à ne pas écrire depuis ce fichier :
1. **`web/src/lib/scene3d/scenes.json`** — nouvelle entrée `"solide-revolution"` :
   `temps: false` · `controles: ["balayage","tranche","tranches","fonction","unite"]` · `etat: ["fonction","balayage_deg","x_tranche","n_tranches","unite_cm","vue"]` · `bornes: { balayage_deg: [0,360], x_tranche: [0,4], n_tranches: [1,40], unite_cm: [1,3] }` · `valeurs: { fonction: ["racine","cone","log"], vue: ["biais","face","cote"] }` · `lectures: ["rayon","aire_tranche","volume","aire_region","volume_cm3","verification_cone"]`.
   `validate-content` échoue **en dur** sur une scène inconnue, un contrôle inconnu, un état hors bornes ou un contrôle qu'aucune étape n'ouvre : l'entrée doit précéder le descripteur.
2. **Les trois fonctions**, avec leur intervalle et leur volume exact, calculés par le code (pas codés en dur) : `racine` `\sqrt x` sur `[0,4]` → `8\pi` ; `cone` `\frac23 x` sur `[0,3]` → `4\pi` ; `log` `\sqrt{\ln x}` sur `[1,e]` → `\pi`. `x_tranche` est **clampé** à l'intervalle courant.
3. **La porte de rendu** (ADR 0041 §8) : `scene-solide-revolution`, qui lit les **pixels** dans les deux sens (le disque vu **de face** est un cercle au pixel près ; vu de **biais** il ne l'est pas), recalcule les nombres par une **seconde implémentation**, vérifie la famille `avant-pari` (rien qui dépende de l'issue n'est dans le DOM avant l'engagement), et sort **MUET en échec** si WebGL manque au banc. `--essai-rouge` : chaque famille doit crier.
4. **Le contrat de calme** : fermée par défaut ; un seul contrôle neuf par étape, les autres **absents du DOM** ; couleurs lues sur les jetons `--figure-*` ; plateau collant avec `scroll-margin-top` sur chaque contrôle (WCAG 2.4.11) ; trois vues prédéfinies comme équivalent clavier du glisser.

---

## 9 bis. Revue et corrections — ce qui a été livré autrement (2026-09-24)

Livré par trois auteurs en parallèle (prose, items, figures) et la scène, puis
revu par deux critiques indépendants (fidélité au bac ; pédagogie). Aucun
hors-programme, tous les nombres re-dérivés justes. Ce qui a changé par rapport
à ce document, et pourquoi — pour que la spec ne se lise pas comme ce qui est
en ligne :

- **Items : 13 et non 16.** CI-35 (le rappel du point d'arrêt et de
  l'exemple 1), CI-40 (son « ×8 » affirmait un défaut de conversion que la
  réponse ne montre pas) et CI-45 (le cadrage de CI-37) sont retirés ; les ids
  ne sont pas réutilisés. Répartition 7 / 4 / 2. Couverture : oubli du carré 8,
  circonférence 4, sans π 10, carré mal placé 5, conversion 4.
- **CI-39** porte `f = x` sur `[1 ; 3]` (et non √x sur [0 ; 4], qui doublait
  CI-35) ; **CI-44** a été ré-ensemencé sur `x + 2` sur `[0 ; 1]` — `x + 1` sur
  `[0 ; 2]` est le translaté de CI-39 : même solide, même clé 26π/3.
- **CI-38** : distracteur « sans π » = 2,25 (r², pas 1,5) ; **CI-41** : le cône
  `x/3` sur `[0 ; 6]` (r = 2, h = 6, V = 8π), pas celui de l'exemple travaillé ;
  **CI-45** (avant retrait) : `[0 ; 2]`, cohérent avec Cauchy–Schwarz ;
  **CI-49** : pas de distracteur « oubli du carré » (aucune valeur honnête sur
  cette graine) ; **CI-50** : trois choix (« 2π∫f² » n'est pas le modèle
  enregistré 2π∫f).
- **Les retours « sans π »** disaient « ∫f² mesure l'aire des tranches
  accumulées » — faux : la tranche vaut πf², et π∫f² EST le volume. Réécrits.
- **`cp-volume-disque`** porte sur `f(x) = x²` sur `[0 ; 2]` et n'est plus un
  clone : sur √x, il redemandait ce que la scène et l'exemple 1 venaient de
  répondre. **`cp-volume-unite`** est ajouté (clone de CI-47), après l'unité.
- **La prose** : le tour de potier ; les nombres de la scène dans le mécanisme ;
  l'épaisseur d'une tranche et le parallèle avec le chapitre 2 (sans Σ) ; une
  rupture par ligne de la table (dont le contrôle dimensionnel) ; une ligne de
  décision entre les blocs des exemples ; le repère orthonormé justifié par le
  CUBE unité (§1.4 B10 écrivait « la coupe n'est un disque que si le repère est
  orthonormé » — la coupe physique reste un disque dans un repère orthogonal ;
  c'est `1 u.v. = k³ cm³` qui casse).
- **La scène** : l'étape 1 ne dit plus que l'élève a calculé l'aire sous √x
  au chapitre 9 (§9.3, corrigé en place) ; la question de l'étape 4 n'imprime
  plus πr²h/3 (le pari se répondait tout seul) ; l'étape 3 ne dit plus
  « l'escalier se referme » (un passage à la limite) et `fit_caveat` écrit que
  la lecture du volume ne dépend jamais du nombre de tranches.

## 10. Open questions for the human — the validation gate

1. ⚠ **Rotation autour de `(Oy)` — vraiment hors périmètre ?** Aucun des deux cadres ne nomme d'axe ; le seul sujet vérifié dit « autour de l'axe des abscisses ». J'ai tranché **OUT** (B5) parce que le cas `(Oy)` demande soit `x = g(y)` (fonction réciproque, marquée SM-spécifique par le cadre et absente de SExp), soit la méthode des tubes (hors programme). **Si les manuels marocains énoncent le cas `(Oy)` pour une fonction bijective, dis-le** : c'est un beat de 8 lignes + 3 items, pas une refonte — mais il ne doit pas être inventé.
2. ⚠ **Volume entre deux courbes (`\pi\int(f^2-g^2)`) — hors périmètre ?** Dans les deux cadres, « entre courbes » qualifie l'**aire**, jamais le volume, et aucun précédent de bac n'a été trouvé. J'ai tranché **OUT** (B8). À confirmer contre les manuels.
3. ⚠ **Le sujet 2023 SM verbatim au sommet.** La question réelle (`maths-sm-2023-r.md:122`) est **SM** et demande une **double IPP** — à la limite de la `limite` SExp (« une seule fois, éventuellement itérée sur des cas simples »). J'ai mis au sommet une **variation** à une seule IPP (§8.4) et laissé le sujet 2023 en **précédent cité**. Confirmer : (a) la double IPP sur `x(\ln x)^2` est-elle acceptable en SExp ? (b) et surtout — **la notion est-elle SExp, SM, ou les deux ?** (REVIEW S1.2/S1.3 : la filière n'existe qu'en commentaire YAML ; `r-bac` est un sujet SExp 2022 ; trois cartes de banque sont SM.) Tant que ce n'est pas tranché, aucun contenu SM-spécifique n'est ajouté ici.
4. ⚠ **L'aparté « sommes de Riemann » pour SM.** Le cadre SM les possède, et l'empilement de disques en est l'application naturelle. Je l'ai **délibérément différé** (§3.2) pour ne pas ajouter un quatrième élément SM-seulement dans une notion dont le partage de filière est en arbitrage. Confirmer que c'est le bon ordre (d'abord S1.2/S2.7, ensuite le renvoi), ou demander l'aparté maintenant.
5. ⚠ **Complétude des misconceptions.** Les cinq modèles de §5 sont-ils **les** endroits où les élèves marocains échouent sur un volume de révolution ? Deux candidats écartés, à re-examiner si l'expérience dit le contraire : (a) « je dois découper aux racines et prendre des valeurs absolues, comme pour l'aire » (sur-transfert de R8 — écarté parce que `f^2 \ge 0` rend le découpage sans objet, et l'énoncé de bac donne toujours `f \ge 0`) ; (b) « le volume, c'est l'aire multipliée par la longueur de l'intervalle » (écarté : non attesté, et le nombre coïncide avec d'autres modèles selon les graines).
6. ⚠ **Le fond de tiroir des unités.** J'ai décidé que **la conversion de volume ne se traite qu'en repère orthonormé** (B10) — parce que la rotation exige l'isotropie du plan `(yOz)` pour que la coupe soit un disque. La leçon enseigne pourtant le cas anisotrope pour les **aires** (CI-33, `2 cm × 3 cm`). Confirmer que ce contraste est bien celui des manuels, et qu'il ne déroute pas.
7. ⚠ **Nombre d'items.** 16 items neufs (CI-35 → CI-50) portent la notion de 34 à 50, et le rung R9 à 14 items. C'est délibérément au-dessus du plancher (`honest_state` signale aujourd'hui six modèles à marge nulle). Si le volume doit rester proportionné aux ≈ 4 capacités du cadre SExp, dire lesquels couper — je recommande de couper CI-42 et CI-47 en premier (les plus redondants).

### Sources consultées
- **Frontière de programme (autoritaire) :** `docs/cadre/curriculum/maths-sexp.yaml` (`calcul_integral/integrale_primitives`, `limites`, `exclusions_transversales`, `habiletes_ratios_examen`, `poids`) ; `docs/cadre/curriculum/maths-sm.yaml` (`calcul_integral/integrale_riemann_ipp`, idem).
- **Précédent d'examen vérifié :** `docs/sujets/_incoming/maths-sm-2023-r.md:80, 115-122, 140-146` (2023 rattrapage SM, Partie III 2c ; `V = \pi/4` cm³), recoupé avec la version publique du sujet et sa correction.
- **État de la notion :** `content/maths/calcul-integral/lesson.md` (R0–R9), `items.yaml` (registre + `coverage_summary`), `checkpoints.yaml`, `exercises.yaml`, `REVIEW-2026-09-12.md` (S2.6 ; et les blocages ouverts S1.1–S1.5, fid-S5.19/20, péd-F3/F4).
- **Standard :** `docs/product/VISION.md` (anatomie de la notion, profil maths), `docs/pipeline/NOTION-TEMPLATE-V2.md` (boxes A/B/C/E), `docs/product/DESIGN-BIBLE.md` (calme), ADR 0017 + son amendement du 2026-07-07 (taxonomie média), **ADR 0041** (scènes 3D : critère spatial, contrat de pari, calme, honnêteté des nombres, porte de pixels), ADR 0008/0009/0011 (schéma de misconception, dual-tag, plancher), ADR 0031/0033/0034 (discipline des portes).
- **Portes d'items :** `web/scripts/indice-longueur.mjs`, `indice-absolu.mjs`, `indice-refus.mjs`, `enonces-jumeaux.mjs`, `eleve-ruse.mjs`.
- **Modèle de descripteur de scène :** `content/maths/geometrie-espace/media/produit-vectoriel.json`.
- **Précédent de spec-extension :** `content/pc/aspects-energetiques/spec-extension.md`.
