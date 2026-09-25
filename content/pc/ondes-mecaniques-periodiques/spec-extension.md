# Spec d'extension — Ondes mécaniques périodiques : diffraction + milieu dispersif

> **Statut :** spec de conception pédagogique (pedagogy-architect). N'écrit PAS le
> `lesson.md` ni les `items.yaml`. **Ne pas toucher** aux chapitres R0–R4 ni au sommet
> « Pour t'entraîner ».

---

## 0. Cadrage cadre (autorité : `docs/cadre/curriculum/pc-physique-chimie.yaml`)

- **Filière / matière :** sciences_physiques / physique_chimie
- **Domaine → sous-domaine → chapitre :** physique → `ondes` → `ondes_periodiques`
- **Poids examen (sous-domaine) :** `part_examen: 11`. Habiletés à viser (ratios U 50 /
  App. exp. 15 / Résol. 35) : Utilisation 5.5 · Application expérimentale 1.65 · Résolution 3.85.
  → La diffraction est un point **fortement expérimental** (TP diffraction d'une onde
  sonore/ultrasonore, lecture de document) ; item-author doit y placer plusieurs items de mode
  **application expérimentale** (reconnaître la diffraction sur un montage / un enregistrement).
- **Savoir-faire couverts** (cadre p.5-6, chapitre `ondes_periodiques`, programme p.20) :
  - « Connaître la **condition de diffraction** : dimension de l'ouverture ≤ longueur d'onde ;
    connaître les **caractéristiques de l'onde diffractée**. » → R5
  - « Exploiter des documents expérimentaux pour **reconnaître la diffraction** et ses
    caractéristiques. » → R5
  - « **Proposer un montage** de diffraction (ondes sonores/ultrasonores). » → R5
  - « **Définir un milieu dispersif**. » → R6
- **Limites / cadrage de profondeur portés comme contraintes DURES :**
  - Pour les **ondes mécaniques**, la diffraction est traitée **qualitativement /
    expérimentalement** : condition ($a \le \lambda$), caractéristiques de l'onde diffractée,
    montage. **La formule quantitative $\theta = \lambda/a$ (demi-largeur angulaire) appartient
    au chapitre `onde_lumineuse`** (cadre p.6 : « Connaître et exploiter $\theta=\lambda/a$ »),
    pas ici. → Ne PAS introduire $\theta=\lambda/a$ dans ce chapitre mécanique.
  - Le milieu dispersif est **défini** (célérité dépendant de la fréquence) ; aucun traitement
    quantitatif de la dispersion.
- **HORS-CADRE explicite (task + exclusions sous-domaine) :**
  - **Diffraction de la LUMIÈRE = HORS de cette leçon** : elle est traitée dans le chapitre
    `propagation-onde-lumineuse`. → **Cross-référence, ne pas dupliquer.** content-author pose un
    renvoi (« la diffraction de la lumière, et la relation $\theta=\lambda/a$, sont traitées dans
    la leçon sur l'onde lumineuse ») et s'arrête là.
  - **Interférences** (Young, interfrange, cohérence) — exclusion sous-domaine : **seule la
    diffraction est traitée, jamais les interférences.**
  - **Effet Doppler**, **réseaux**, **résolution de l'équation de propagation (PDE)**,
    **polarisation** — exclusions sous-domaine.

---

## 1. Placement et numérotation

Insérer **2 nouveaux chapitres** entre l'actuel R4 (le son, onde périodique) et le sommet
« Pour t'entraîner ».

| Nouveau | Titre |
|---|---|
| **R5** | La diffraction des ondes mécaniques : quand l'onde contourne l'obstacle |
| **R6** | Les milieux dispersifs : quand la célérité dépend de la fréquence |
| R7 | Pour t'entraîner (sommet) — ancien R5 |

**Delta chapitres réels : +2.** Le sommet passe de R5 à R7.

**Cohérence d'enchaînement.**
- R5 s'appuie sur R4 (le son / les ultrasons comme support expérimental concret de la
  diffraction) et sur R1–R2 (la diffraction **conserve** $\lambda$, $f$, $c$ — grandeurs
  définies aux rungs précédents). L'ouvrir avec le son/ultrason déjà installé en R4.
- R6 **raffine une affirmation faite en R1 et R4** : « le milieu fixe la célérité $c$ ». R6 précise :
  le milieu fixe $c$ **pour une fréquence donnée** ; dans un milieu **dispersif**, deux fréquences
  différentes n'ont pas la même célérité. C'est un prolongement naturel, pas une contradiction —
  le dire explicitement (« on avait dit que le milieu fixe $c$ ; voici la nuance »).

**Voix (dispositifs obligatoires) :** worked/example ouverts par « *Ce qu'on cherche ici, et
pourquoi ce geste :* » ; predict-then-break par « **Prends position avant de…** » /
« **Fixe l'image mentale** » ; médias `[[figure:slug]]` (structural-diagram), `[[embed:slug]]`
(manipulable), `[[motion:slug]]` (manim).

---

## 2. R5 — La diffraction des ondes mécaniques

**Objectif d'apprentissage.** Connaître la **condition de diffraction** (dimension de
l'ouverture ou de l'obstacle de l'ordre de, ou inférieure à, $\lambda$) ; connaître les
**caractéristiques de l'onde diffractée** (même $\lambda$, même $f$, même $c$, même nature) ;
savoir **proposer un montage** de diffraction avec des ondes sonores/ultrasonores et
**reconnaître** la diffraction sur un document expérimental.

**Mécanisme à enseigner (concret avant abstrait).**
1. **Le phénomène, décrit avant d'être nommé.** Une onde plane arrive sur une ouverture (fente)
   ou un obstacle. Si l'ouverture est **large** devant $\lambda$, l'onde passe presque tout droit
   (faisceau quasi rectiligne, comme en optique géométrique). Si l'ouverture devient **du même
   ordre que $\lambda$, ou plus petite**, l'onde **s'étale** derrière l'ouverture, contournant les
   bords, comme si l'ouverture était devenue une nouvelle source. Ce contournement, c'est la
   **diffraction**.
2. **La condition** (le cœur) : la diffraction est **notable** quand la dimension $a$ de
   l'ouverture (ou de l'obstacle) est **de l'ordre de / inférieure à** $\lambda$ : $a \lesssim \lambda$.
   Plus $a$ se rapproche de $\lambda$ (et en deçà), plus l'étalement est marqué. C'est un critère
   de **comparaison** entre deux longueurs, $a$ et $\lambda$ — jamais une valeur absolue.
3. **Les caractéristiques de l'onde diffractée** (le point à ancrer fort) : l'onde diffractée a
   **la même fréquence $f$, la même longueur d'onde $\lambda$, la même célérité $c$** et la même
   nature que l'onde incidente. La diffraction **ne change que la géométrie** (la direction,
   l'étalement) — **jamais** $f$, $\lambda$ ni $c$. Raccrocher à R1/R4 : $f$ est fixée par la
   source, le passage par une ouverture n'est pas un changement de source.
4. **Le montage** (ondes sonores/ultrasonores) : émetteur d'ultrasons (fréquence connue) →
   fente réglable de largeur $a$ → récepteur mobile sur un arc, qui mesure l'amplitude reçue en
   fonction de la direction. On réduit $a$ et on observe l'onde reçue s'étaler sur un domaine
   angulaire de plus en plus large.

**Misconceptions à confronter (predict-then-break).**
- **OND-DIF-1 — condition inversée : « il faut une grande ouverture (a ≫ λ) pour diffracter. »**
  Casser : c'est l'inverse — la diffraction est marquée quand l'ouverture est **petite** devant
  ou de l'ordre de $\lambda$. Une grande ouverture laisse passer l'onde presque en ligne droite.
- **OND-DIF-2 — « l'onde diffractée change de fréquence / de longueur d'onde / de célérité. »**
  Casser : $f$, $\lambda$, $c$ sont **conservées** ; seule la direction/l'étalement change. (Écho
  R1/R4 : le milieu et la source n'ont pas changé.)
- **OND-DIF-3 — intuition « géométrique » : « plus le trou est petit, plus le faisceau qui sort
  est fin/concentré. »** Casser (prédiction avant montage) : au contraire, plus l'ouverture est
  petite (vers $\lambda$), plus l'onde **s'étale** derrière — l'inverse de l'intuition « jet d'eau
  par un petit trou ».

**Arc d'exemple travaillé.** Ultrasons de fréquence $f = 40\ \text{kHz}$ dans l'air
($c \approx 340\ \text{m/s}$). *Ce qu'on cherche :* (1) calculer $\lambda = c/f = 340/40000 \approx
8{,}5\times10^{-3}\ \text{m} \approx 8{,}5\ \text{mm}$ (réutilise $\lambda=c/f$ de R2/R4) ; (2)
décider si une fente de $a = 5\ \text{mm}$ diffracte nettement : $a$ est du même ordre que
$\lambda$ (même **inférieur**) → **diffraction notable**. Comparer à une porte de $a = 0{,}8\ \text{m}$ :
$a \gg \lambda$ → l'onde passe quasi tout droit. (3) Rappeler qu'après la fente, l'onde garde
$f = 40\ \text{kHz}$, $\lambda = 8{,}5\ \text{mm}$, $c = 340\ \text{m/s}$ — inchangés.

**Médias (ADR 0017).**
- `[[figure:diffraction-fente-fronts]]` — **type: structural-diagram · tool: svg+katex.**
  Deux cas côte à côte : fronts d'onde plans traversant une **grande** ouverture (quasi
  rectiligne) et une **petite** ouverture ($a\lesssim\lambda$, fronts circulaires étalés).
  Labels $a$, $\lambda$ exacts, condition annotée.
- `[[figure:montage-diffraction-ultrasons]]` — **type: structural-diagram · tool: svg+katex.**
  Schéma légendé : émetteur ultrasons → fente réglable ($a$) → récepteur mobile sur arc gradué.
- `[[embed:cuve-a-ondes]]` — **type: manipulable · tool: scene2d.** **LIVRÉ le 2026-09-24**
  (`spec-scene-cuve.md`, ADR 0041). Prescrit à l'origine sous le slug `cuve-a-ondes-diffraction`,
  en PhET « Waves Intro » ou Falstad embarqué — « ne pas la reconstruire » ; ces outils sont fermés
  aux nouveaux embeds depuis l'amendement du 2026-07-07 à l'ADR 0017, la figure statique
  `cuve-a-ondes-diffraction` l'a remplacée le 2026-09-20 (une substitution écrite), et c'est une cuve
  de première partie, calculée dans le navigateur, qui la solde. Elle fait ce que la ligne demandait —
  l'élève réduit la largeur de la fente et voit l'étalement croître (OND-DIF-1, OND-DIF-3) — et ce
  qu'elle ne demandait pas : la **même** fente traversée par deux ondes (OND-DIF-4).

**HORS-CADRE (citer la limite / exclusion).** Pas de **$\theta = \lambda/a$** (demi-largeur
angulaire) : cette relation quantitative appartient au chapitre `onde_lumineuse` (cadre p.6),
pas au traitement mécanique. **Diffraction de la lumière = renvoi** à `propagation-onde-lumineuse`,
non dupliquée. Pas d'**interférences** (exclusion : « seule la diffraction est traitée »), pas de
figure de diffraction quantitative, pas de réseaux.

**3 items diagnostiques.**
1. *Stem :* À quelle condition une onde subit-elle une diffraction notable au passage d'une ouverture de dimension $a$ ?
   - (A) Quand $a$ est de l'ordre de, ou inférieure à, $\lambda$ ($a \lesssim \lambda$) — **CORRECT.**
   - (B) Quand $a$ est très grande devant $\lambda$ ($a \gg \lambda$) — encode **OND-DIF-1.**
   - (C) Quand la fréquence de l'onde est très élevée — encode confusion (critère sur $f$ seul, sans $\lambda$).
   - (D) Quand $a$ est nulle — encode caricature de la condition.
2. *Stem :* Après avoir été diffractée par une fente, l'onde a, par rapport à l'onde incidente :
   - (A) La même fréquence, la même longueur d'onde et la même célérité — **CORRECT.**
   - (B) Une fréquence plus basse — encode **OND-DIF-2** (variante $f$).
   - (C) Une longueur d'onde plus petite — encode OND-DIF-2 (variante $\lambda$).
   - (D) Une célérité plus grande — encode OND-DIF-2 (variante $c$).
3. *Stem :* On envoie des ultrasons ($\lambda \approx 8{,}5\ \text{mm}$) sur une fente dont on réduit progressivement la largeur jusqu'à ~5 mm. Que devient l'onde derrière la fente ?
   - (A) Elle s'étale davantage sur un domaine angulaire de plus en plus large — **CORRECT.**
   - (B) Elle se concentre en un faisceau de plus en plus fin — encode **OND-DIF-3.**
   - (C) Elle ne change pas : la fente n'a aucun effet — encode négation de la diffraction.
   - (D) Sa fréquence diminue à mesure que la fente se rétrécit — encode OND-DIF-2.

---

## 3. R6 — Les milieux dispersifs

**Objectif d'apprentissage.** **Définir un milieu dispersif** : un milieu où la célérité de
l'onde **dépend de sa fréquence** ; savoir distinguer milieu dispersif et non dispersif, et
en reconnaître la conséquence sur un signal composé de plusieurs fréquences.

**Mécanisme à enseigner (concret avant abstrait).**
1. **Le raffinement de R1/R4.** On avait dit : « le milieu fixe la célérité $c$, la source fixe
   la fréquence $f$ ». Vrai — mais avec une nuance. **Dans certains milieux, la célérité n'est
   pas la même pour toutes les fréquences.** Un tel milieu s'appelle **dispersif**.
2. **La définition, testable :** un milieu est **dispersif** si la célérité $c$ y **dépend de la
   fréquence $f$** de l'onde ; il est **non dispersif** si toutes les fréquences y ont la **même**
   célérité. Le test opératoire : envoyer deux ondes de fréquences différentes et comparer leurs
   célérités — égales → non dispersif ; différentes → dispersif.
3. **La conséquence** (concret) : une onde complexe est une **superposition de plusieurs
   fréquences**. Dans un milieu non dispersif, toutes voyagent à la même vitesse → la forme du
   signal est **conservée**. Dans un milieu dispersif, les composantes de fréquences différentes
   se **désynchronisent** (elles avancent à des vitesses différentes) → le signal **se déforme**
   en se propageant. Exemple parlant : l'air est **quasi non dispersif** pour le son audible —
   c'est pourquoi une mélodie arrive au fond d'une salle sans être déformée (aigus et graves
   voyagent à la même vitesse). Les ondes à la surface de l'eau, elles, **sont** dispersives.
4. **Ce qui ne change pas :** dans tous les cas, $f$ reste fixée par la source (R1) ; ce qui
   dépend du milieu et — s'il est dispersif — de la fréquence, c'est $c$, et donc $\lambda = c/f$.

**Misconceptions à confronter (predict-then-break).**
- **OND-DISP-1 — « la célérité d'une onde dans un milieu est toujours une constante fixe du
  milieu. »** Casser : c'est vrai seulement dans un milieu **non dispersif** ; dans un milieu
  dispersif, $c$ dépend de $f$. C'est le raffinement exact de l'affirmation de R1/R4.
- **OND-DISP-2 — « dispersif = qui atténue / absorbe l'onde. »** Casser : la dispersion concerne
  la **dépendance de $c$ en $f$**, pas la perte d'énergie. Un milieu peut disperser sans absorber
  (et inversement). Ne pas confondre dispersion et amortissement/absorption.
- **OND-DISP-3 — « dans un milieu dispersif, c'est la fréquence de l'onde qui change. »** Casser :
  $f$ reste imposée par la source (R1) ; ce sont les **célérités** des différentes fréquences qui
  diffèrent. La dispersion ne modifie pas $f$.

**Arc d'exemple travaillé.** *Ce qu'on cherche :* on donne, pour un milieu, deux mesures : à
$f_1 = 200\ \text{Hz}$, $c_1 = 340\ \text{m/s}$ ; à $f_2 = 2000\ \text{Hz}$, $c_2 = 340\ \text{m/s}$.
Conclusion : célérités égales → milieu **non dispersif** (cas de l'air pour le son). Puis un
second milieu : $c_1 = 1{,}2\ \text{m/s}$ à $f_1$ et $c_2 = 0{,}9\ \text{m/s}$ à $f_2$ →
célérités différentes → milieu **dispersif**. Faire dire la conséquence : dans le second milieu,
un signal contenant $f_1$ et $f_2$ se déforme en se propageant ; dans l'air, non.

**Médias (ADR 0017).**
- `[[figure:celerite-vs-frequence]]` — **type: structural-diagram · tool: svg+katex.**
  Graphe $c = f(\text{fréquence})$ : une droite horizontale (milieu non dispersif) vs une courbe
  décroissante/croissante (milieu dispersif). Axes et labels exacts.
- `[[motion:paquet-qui-se-deforme]]` — **type: motion · tool: manim.**
  Un signal composé de deux fréquences : dans le milieu non dispersif, il garde sa forme ; dans
  le milieu dispersif, ses composantes se désynchronisent et il s'étale/se déforme. Confronte
  OND-DISP-1 visuellement. (Média optionnel : à retenir seulement si le budget motion le permet ;
  sinon le structural-diagram suffit au cadre.)

**HORS-CADRE (citer la limite).** Le milieu dispersif est **défini**, rien de plus (cadre p.6 :
« Définir un milieu dispersif »). **Aucun** traitement quantitatif : pas de relation de
dispersion $c(f)$ explicite à exploiter, pas de vitesse de groupe / vitesse de phase, pas de
calcul d'étalement. Définition + reconnaissance qualitative uniquement.

**3 items diagnostiques.**
1. *Stem :* Qu'est-ce qu'un milieu dispersif ?
   - (A) Un milieu où la célérité de l'onde dépend de sa fréquence — **CORRECT.**
   - (B) Un milieu où l'onde perd de l'énergie en se propageant — encode **OND-DISP-2** (dispersion ↔ absorption).
   - (C) Un milieu où la fréquence de l'onde change au cours de la propagation — encode **OND-DISP-3.**
   - (D) Un milieu où la longueur d'onde ne dépend pas de la fréquence — encode inversion (négation de $\lambda=c/f$).
2. *Stem :* Dans un milieu donné, deux ondes de fréquences différentes se propagent. Vont-elles nécessairement à la même vitesse ?
   - (A) Oui si le milieu est non dispersif ; non s'il est dispersif ($c$ dépend alors de $f$) — **CORRECT.**
   - (B) Oui, toujours : la célérité est une constante fixe du milieu — encode **OND-DISP-1.**
   - (C) Non, jamais : deux fréquences vont toujours à des vitesses différentes — encode généralisation abusive de la dispersion.
   - (D) Cela dépend de leur amplitude — encode confusion avec un effet d'amplitude.
3. *Stem :* Un son complexe (plusieurs fréquences) traverse un milieu **dispersif**. Que lui arrive-t-il ?
   - (A) Il se déforme, car ses composantes de fréquences différentes voyagent à des vitesses différentes — **CORRECT.**
   - (B) Il reste identique à lui-même — encode négation de la conséquence de la dispersion.
   - (C) Sa fréquence globale change — encode OND-DISP-3.
   - (D) Il est atténué mais garde sa forme — encode OND-DISP-2 (dispersion vue comme absorption).

---

## 4. Notes de build

**Pour content-author.**
- 2 chapitres R5→R6 dans la voix existante ; renuméroter le sommet en **R7** et étoffer son
  « Récapitulatif express » (ajouter : condition de diffraction $a\lesssim\lambda$ + conservation
  de $f$, $\lambda$, $c$ par la diffraction ; définition du milieu dispersif).
- Renvois explicites : R5↔R4 (son/ultrasons comme support) et R5↔R1/R4 (la diffraction conserve
  $f$ car la source n'a pas changé) ; R6 ouvre en **raffinant** l'affirmation R1/R4 « le milieu
  fixe $c$ » (le milieu fixe $c$ pour une $f$ donnée ; en milieu dispersif $c$ dépend de $f$).
- **Renvoi obligatoire vers `propagation-onde-lumineuse`** pour la diffraction de la lumière et
  $\theta=\lambda/a$ — une phrase de cross-référence, **sans enseigner** le contenu lumineux ici.
- Ajouter au sommet une **variation « reconnaître la diffraction sur un document / montage
  d'ultrasons »** (mode application expérimentale) et une variation « dispersif ou non ? » à
  partir de deux couples $(f, c)$.

**Pour item-author.**
- Coverage floor : **≥ 3 items par misconception** (OND-DIF-1/2/3, OND-DISP-1/2/3) ; les 3
  items/chapitre ci-dessus sont des germes.
- Placer plusieurs items de mode **application expérimentale** sur la diffraction (reconnaître la
  diffraction sur un schéma de montage ultrasons ; interpréter l'étalement quand $a$ diminue) —
  cohérent avec le TP cadre p.26 (« diffraction d'une onde sonore/ultrasonore »).
- OND-DIF-1 (condition inversée) et OND-DISP-1 (« $c$ toujours constante ») sont les deux
  misconceptions à plus haute valeur diagnostique : leur consacrer plusieurs habillages.
- Ne créer **aucun** item utilisant $\theta=\lambda/a$ ni la diffraction de la lumière dans cette
  leçon (hors-cadre ici ; réservé à `propagation-onde-lumineuse`).
- Double-tag autorisé : un item « après diffraction, $\lambda$ change-t-elle ? » active OND-DIF-2
  et la relation $\lambda=c/f$ de R2 — dual-tag, pas un défaut.
