# 11 — Six nouvelles maquettes, taille mesurée au téléphone et revérification du rapport 10

> Remise du mandat [`MANDAT-MOUVEMENT.md`](../MANDAT-MOUVEMENT.md) (branche `antigravity/regles-mouvement`,
> PR brouillon vers `claude/vibrant-fermi-v1lxj5`). Les règles générales sont dans
> [`docs/refonte/09-regles-du-mouvement.md`](../../refonte/09-regles-du-mouvement.md) et les primitives
> partagées dans [`web/src/components/pilote/maquettes/outils.ts`](../../../web/src/components/pilote/maquettes/outils.ts).
> Aucun fichier de leçon (`*-moteur.js`, `*-scenes-*.js`, `*-outils.js`) ni `noyau.js` n’a été modifié.

---

## 1. Correction de la taille de texte mesurée au téléphone (`390 × 844`)

### Pourquoi le rapport 10 annonçait `10,8 px` alors que `dipole-rc` affichait plus petit
Dans le rapport 10, la mesure automatique avait lu `t.getBoundingClientRect().height` (hauteur de boîte de ligne incluant l’interligne, environ `1,25×` le corps réel) au lieu de la taille de police rendue. Or sur `390 px` de large avec `viewBox="0 0 760 510"` et des marges larges, `fontSize={23}` descendait à `~10,3 px` de corps (`~7,5` à `8 px` de hauteur de capitale).

### Méthode de mesure exacte (désormais gravée dans la règle M5 de `09-regles-du-mouvement.md`)
Pour chaque `<text>` visible d’une scène SVG à `390 × 844` :
$$\text{taille réelle (px)} = \text{parseFloat}\!\left(\text{getComputedStyle}(\text{text}).\text{fontSize}\right) \times \frac{\text{svg.getBoundingClientRect().width}}{\text{svg.viewBox.baseVal.width}}$$

### Mesures réelles après passage à `SVG_FS = 25` et `viewBox="0 0 760 500"` (les 9 maquettes)

| Maquette | Largeur SVG à `390 px` | Facteur d’échelle | Corps minimal mesuré à `390 px` | Corps minimal mesuré à `1280 px` | Textes rognés / collisions `getBBox()` |
|---|---:|---:|---:|---:|---|
| `meiose` *(corrigée)* | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `dipole-rc` *(corrigée)* | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `suites` *(corrigée)* | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `logarithme` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `exponentielle` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `radioactivite` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `noyaux` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `expression-genetique` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |
| `transmission` | `348,0 px` | `0,4579` | **`11,45 px`** | `21,96 px` | `0` / `0` |

Poids compilé total de la route `/pilote/maquettes` contenant les **neuf** maquettes : **`21,5 kB`** (`~2,4 kB` par maquette en moyenne).

---

## 2. Les six nouvelles maquettes : placement (par clé), remplacement et signalements pour le texte

Les captures correspondantes (`*-1280.png` et `*-390.png`) sont jointes dans `captures-11-maquettes/` sur la branche `antigravity/revue` et embarquées dans la description de la PR brouillon.

### 1. `logarithme` — `MaquetteLogarithme.tsx`
- **Clé d’étape cible** : `exemple` (et prolongeable sur `pick` et `v-table`, beat 2, scène `table`).
- **Ce qu’elle remplace** : le surlignage séquentiel séparé de `demo: 1 → 4` dans la scène `table`, où les deux lignes ne montrent pas simultanément la correspondance entre addition en haut et multiplication en bas.
- **À signaler pour le texte (reste à Claude)** : dans `exemple`, préciser à l’élève qu’il peut suivre ensemble l’arc rouge `+ 3` sur les pas et l’arc noir `× 8` sur les puissances (ou choisir `16 × 32` comme sur `pick`).
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/logarithme-1280.png`, `captures-11-maquettes/logarithme-390.png`.

### 2. `exponentielle` — `MaquetteExponentielle.tsx`
- **Clé d’étape cible** : `course` (beat 9, scène `expo`).
- **Valeurs importées** : `R_COURSE`, `ratio()`, `fG()` directement depuis `exponentielle-outils.js`.
- **Ce qu’elle remplace** : la vue statique ou figée sur une seule échelle de `expo` lors de la croissance comparée $e^x / x$.
- **À signaler pour le texte (reste à Claude)** : garder le pari de `course` (« Quand $x$ tend vers $+\infty$, $e^x / x$… ») **avant** le déclenchement du dézoom (`reveal`), puis inviter l’élève à tirer le curseur de $x = 1$ à $x = 10$ pour voir la droite $y = x$ s’écraser sur l’axe horizontal.
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/exponentielle-1280.png`, `captures-11-maquettes/exponentielle-390.png`.

### 3. `radioactivite` — `MaquetteRadioactivite.tsx`
- **Clé d’étape cible** : `c14` (couplée dès le beat 2 avec la logique de `nz`).
- **Valeurs importées** : `T14` (`5 730` ans) depuis `radioactivite-outils.js`.
- **Ce qu’elle remplace** : la séparation entre le zoom du noyau `atome` (à `c14`) et la carte `(N, Z)` (à `nz` quatre étapes plus loin), qui empêche l’élève de voir que le saut diagonal $(-1 ; +1)$ est la traduction directe de $n \to p^+ + e^-$.
- **À signaler pour le texte (reste à Claude)** : conserver le pari de `c14` (« Que devient le noyau ? ») avant `reveal` ; ajouter une phrase courte qui relie le changement de couleur du nucléon à gauche au saut d’une case vers la vallée $N = Z$ à droite.
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/radioactivite-1280.png`, `captures-11-maquettes/radioactivite-390.png`.

### 4. `noyaux` — `MaquetteNoyaux.tsx`
- **Clé d’étape cible** : `dm-def` (avec prolongement naturel sur `axe-energie`, beats 3–4, scène `niveaux`).
- **Valeurs importées** : `M_SEP_HE`, `DM_HE`, `EL_HE`, `F931`, `fg()` directement depuis `noyaux-outils.js`.
- **Ce qu’elle remplace** : le diagramme statique `niveaux` seul (deux traits horizontaux abstraits), en rendant visible l’assemblage physique des 2 protons et 2 neutrons face à la balance qui penche du côté des nucléons séparés.
- **À signaler pour le texte (reste à Claude)** : dans `dm-def`, attirer l’œil sur le fait que le plateau « `2p+2n` » descend (plus lourd : `4,031 88 u`) tandis que le plateau « `⁴He` » remonte (`4,001 51 u`), ce qui rend le signe positif de $\Delta m$ intuitif avant le calcul de `calc-dm`.
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/noyaux-1280.png`, `captures-11-maquettes/noyaux-390.png`.

### 5. `expression-genetique` — `MaquetteExpressionGenetique.tsx`
- **Clé d’étape cible** : `decalage` (beat 6, scène `atelier`, délétion `FS6` du nucléotide `A` du codon 6 `GAG`).
- **Valeurs importées** : `CDS`, `C6`, `toARN()`, `traduire()`, `AA3` directement depuis `expression-genetique-code.js`.
- **Ce qu’elle remplace** : le basculement instantané du ruban muté (`mut: FS6` en `10 ms` puis `600 ms`), où l’élève voit la nouvelle séquence sans voir le mouvement de glissement vers la gauche à travers des crochets de 3 bases fixes.
- **À signaler pour le texte (reste à Claude)** : garder le pari de `decalage` (« Combien d’acides aminés vont changer ? ») avant `reveal` ; mentionner explicitement que les crochets de lecture ne bougent pas pendant que les bases situées à droite glissent d’un cran.
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/expression-genetique-1280.png`, `captures-11-maquettes/expression-genetique-390.png`.

### 6. `transmission` — `MaquetteTransmission.tsx`
- **Clé d’étape cible** : `echiquier` (et `derniere-case`, beat 2, scène `echiquier`, croisement F1 × F1 `L//ℓ × L//ℓ`).
- **Valeurs importées** : `CAS.f2` (gamètes, génotypes, phénotypes et fractions) directement depuis `transmission-outils.js`.
- **Ce qu’elle remplace** : l’apparition instantanée du texte dans une case lors du clic, en faisant glisser simultanément le gamète de la ligne et celui de la colonne depuis les bords jusqu’au centre de la case, avec mise à jour en direct des barres `[L]` et `[ℓ]`.
- **À signaler pour le texte (reste à Claude)** : aucune refonte lourde nécessaire ; sur `echiquier`, souligner simplement que les deux gamètes se rejoignent dans la case choisie et que leurs fractions se multiplient (`½ × ½ = ¼`).
- **Taille de texte mesurée à `390 px`** : **`11,45 px`** (`0` débordement, `0` collision).
- **Captures** : `captures-11-maquettes/transmission-1280.png`, `captures-11-maquettes/transmission-390.png`.

---

## 3. Revérification des défauts du rapport 10 sur les leçons d’aujourd’hui

Les quatre défauts signalés dans le rapport 10 ont été revérifiés directement dans Chromium sur la branche `claude/vibrant-fermi-v1lxj5` (`ca9f40a9`) aux clés exactes :

| Défaut du rapport 10 | Leçon et clé vérifiée | Statut aujourd’hui | Observation directe |
|---|---|---|---|
| Sous-titre resté à « Prophase I » et plaque équatoriale absente devant la question d’anaphase I | `meiose`, clé `anaphase1` (`13 / 52`, `1280 × 800`) | **Corrigé** | Le sous-titre affiche désormais « Métaphase I », la plaque verticale en pointillés est présente et les 4 chromosomes bichromatidiens avec centromères blancs sont bien placés de part et d’autre. *(Remarque incidente : dans le bandeau haut de navigation des parties à `1280 px`, « Bac » et « Bilan » chevauchent légèrement « Exercices ».)* |
| Ligne *« Types de gamètes obtenus »* coupée par la barre du bas + 4 cellules finales affichées d’avance | `meiose`, clé `orientation` (`24 / 52`, `390 × 844`) | **Corrigé** | La scène montre bien les paires `(A, a)` et `(B, b)` face à face avant le clic sur « Retourne la petite paire », et plus aucune ligne n’est coupée par la barre collée du bas. |
| Étiquettes pâles (`tangente`, `2τ`, `86 %`) quasi illisibles sur la courbe | `dipole-rc`, clé `cinq-tau` (`32 / 56`, `1280 × 800`) | **Corrigé** *(résidu très léger)* | Les axes, `E = 12 V`, `u_C (V)`, `t (s)` et la courbe sont nets et bien contrastés. Un filigrane très pâle d’une étape précédente (`4,4 V`) et un tout petit trait rouge près de `12 V` restent à peine visibles à gauche de la courbe. |
| Droite $y = x$ et $u_0$ trop pâles sur le quadrillage | `suites`, clé `escalier` (`10 / 53`, `1280 × 800`) | **Corrigé** | `y = x`, `y = f(x)` et `u_0` sont désormais tracés en encre sombre très lisible sur le quadrillage. |
