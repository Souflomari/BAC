# Rapport 15 — Revérification du rapport 13, relecture des quatre portages neufs, audit des six autres leçons et trois faits ouverts

- **Date** : 25 novembre 2026
- **Branche auditée** : `claude/vibrant-fermi-v1lxj5` (commit `93d59be7`, incluant `a1c54a4f`, `7f202291`, `5e765ded`, `b0e6ce69` et `3278e37c`)
- **Périmètre** : rapport uniquement (aucune modification de leçon ni de code).
- **Protocole de mesure** : rendu de production (`next build` + `next start`) ouvert dans Chromium sans tête à `1280×800` (clair) et `390×844` (sombre et clair), captures avant réponse puis après réponse sur chaque étape ciblée par sa `cle`, mesure de la taille réelle de chaque `<text>` SVG visible à `390 px` (`parseFloat(getComputedStyle(t).fontSize) × (svgRect.width / viewBox.baseVal.width)`), et contrôle de `documentElement.scrollWidth - innerWidth`.

---

## 1. Rapport 13 revérifié (`suites`, `dipole-rc`, `meiose` et `/ou-j-en-suis`)

### 1.1 Priorités 1 et 2 — Règle M9 (réponse avant le pari) et accord texte / dessin

| Leçon : clé | Défaut du rapport 13 | Verdict | Constat à `1280 px` clair et `390 px` sombre (avant → après réponse) |
| :--- | :--- | :---: | :--- |
| `suites : depart` | `lecU: 1` affichait `u_10 ≈ 2,003` avant le pari | **corrigé** | Avant : seul le point rouge `u_0 = 5` est posé sur l’axe, aucun escalier ni valeur `u_10`. Après : les marches descendent vers `2`. Min SVG à `390 px` : `11,0 px`. |
| `suites : depart-mono` | `k: 4` traçait déjà 4 marches descendantes | **corrigé** | Avant : seul `u_0 = 5` sur l’axe, zéro marche. Après : les 4 marches descendantes apparaissent dans `reveal`. |
| `suites : rappel` | `k: 6` traçait déjà 6 marches descendantes | **corrigé** | Avant : seul `u_0 = 5`, zéro marche. Après : les marches apparaissent dans `reveal`. |
| `suites : piege-2u` | L’étiquette `ℓ = 1` chevauchait le trait issu de `s_0 = 2` | **corrigé** | Avant : cercle ouvert en `(1 ; 1)` avec `ℓ = 1` décalé à gauche (`dx < 0`), `s_0 = 2` seul sans escalier. Aucune collision. |
| `dipole-rc : cinq-tau` | `seq` jouait jusqu’à `6τ` avec `u_C = 12,0 V` avant le choix ; `i` touchait le sous-titre | **corrigé** | Avant : `t = 0,0 s`, courbes en pointillé seulement, aucun repère `τ … 5τ` ni `99 %`. Le circuit est descendu (`YT = 174`), `i` ne touche plus le sous-titre. Après : repères `τ … 5τ` révélés. Min SVG à `390 px` : `11,0 px`. |
| `dipole-rc : permanent` | `trans: 1` affichait « régime transitoire » / « permanent » avant la réponse ; axe `i(t)` vide | **corrigé** | Avant : `ic = 0`, seul le graphe `u_C(t)` est visible (`t = 1,1 s`, `u_C = 4,7 V`), ni graphe `i(t)`, ni flèche rouge `i`, ni étiquette « permanent ». Après : `i(t)` et les régimes apparaissent. |
| `dipole-rc : i-t` | Axe `i (mA)` vide visible quand `ic = 0` ; repère vertical coupant `i (mA)` | **corrigé** | Avant : `ic = 0`, tout `this.iG` (axes, graduations, courbe, lecture `i`) est masqué. Le repère vertical passe derrière le halo (`rc-halo`) des titres d’axe. |
| `dipole-rc : reste` | Même axe `i (mA)` vide avant réponse | **corrigé** | Avant : seul `u_C(t)` avec `63 %` à `τ` est affiché ; `i(t)` et `37 %` n’apparaissent qu’après réponse. |
| `meiose : courbe` | L’axe affichait déjà `division II` et `gamètes` sous la chute `2q → q` | **corrigé** | Avant : la courbe ne trace que `G1 → phase S → division I` (`2q → 4q → 2q`, `seg: 3`), sans les libellés `division II` ni `gamètes`. Après : la chute `2q → q` et son libellé apparaissent dans `reveal`. Min SVG à `390 px` : `11,0 px`. |
| `meiose : tetrade` | Chevauchement vertical de `G2` et `P2` à `u = 0` | **corrigé** (+ question **corrigée autrement**) | À `u = 0` (`DISP`), les 4 chromosomes dupliqués sont bien séparés sans aucun chevauchement. De plus, la question porte désormais sur la drosophile (`2n = 8`, combien de tétrades ?) pendant que le schéma illustre `2n = 4` (2 tétrades), évitant tout spoiler. |
| `meiose : telophase1` | Ouvrait à `u = 2.6` (« Anaphase I ») alors que le texte disait « la cellule s’est partagée » | **corrigé** | Démarre à `u = 2.85` → `3` avec sous-titre « Fin de la division I » (sans dévoiler `n = 2` avant la réponse ; `cnt: 1` n’apparaît qu’au `reveal`). |
| `meiose : echange` | Ancien style horizontal, allèles figés à gauche, chiasma encore croisé | **corrigé** | Porté sur la nouvelle scène `crossing` (`web/src/components/pilote/meiose-scenes-e.js`) : chromosomes verticaux bichromatidiens, segments et allèles `D`/`d` échangés ensemble (voir §2.2 pour un détail mineur de sous-titre). |

### 1.2 Priorités 3 à 6 du rapport 13

| Priorité | Sujet du rapport 13 | Verdict | Constat sur `93d59be7` |
| :---: | :--- | :---: | :--- |
| **3** | `dipole-rc` (`couple`) : absence de jauge empilée `u_C \| u_R`, de boutons paliers (`0`, `τ`, `5τ`) et de curseur sur `permanent` ; `seq` lance `t` sur `i-t`/`reste` | **toujours là** (partiellement corrigé) | Les paliers et la jauge empilée n’ont pas été ajoutés à `couple` ; sur `i-t`, `seq: [{ p: { t: T6 }, d: 3500 }]` joue encore à l’entrée (mais `ic = 0`, donc sans divulgâcher `i(t)`). |
| **3** | `suites` (`escalier`, `piege-2u`) : pas de bouton pas-à-pas comme dans `MaquetteSuites` | **toujours là** | Les marches défilent en bloc sans contrôle pas-à-pas individuel. |
| **4** | Textes SVG `< 11 px` réels à `390 px` (`suites` `5,85 px`, `meiose` `7,80 px`, `dipole-rc` `8,58 px`) | **corrigé** | Le plancher typographique à `390 px` relève les textes mesurés à **`11,0 px`** sur `suites : depart`, `dipole-rc : cinq-tau` / `i-decharge` / `v-37` et `meiose : courbe` / `chiasma` / `echange` / `v-intra` (`0` débordement horizontal). |
| **5** | Styles de chromosomes mélangés dans `meiose` (`chiasma`..`v-intra` vs `division` vs `bac`/`schema`) | **corrigé** sur `chiasma`..`v-intra`, **toujours là** sur `bac`/`schema` | Les 4 étapes du crossing-over sont désormais unifiées avec `division` grâce à `meiose-scenes-e.js`. Les étapes `bac`/`schema` conservent leurs schémas simplifiés de copie d’examen. |
| **6** | Lisibilité du circuit `dipole-rc` sur téléphone (circuit serré à gauche par les 5 lignes chiffrées) | **corrigé autrement** | Le circuit a été élargi (`XL = 70` à `XR = 595`, `PW = 140`) et les lectures décalées à `XRO = 782` : les armatures et charges `+`/`−` sont bien plus lisibles à `390 px`. Seule contrepartie mineure : à `390 px`, la ligne la plus longue (`u_R = R i = −10,8 V`) affleure le bord droit de l’écran sans être coupée. |

### 1.3 `/ou-j-en-suis` (commit `a1c54a4f`)

Vérifié à `1280×800` et `390×844` (`overflow = 0` sur les deux formats) :

| Défaut du rapport 13 (§3) | Verdict | Constat sur `93d59be7` |
| :--- | :---: | :--- |
| Slug brut `dipole-rc` dans la phrase de recommandation | **corrigé** | `web/src/lib/apprentissage.ts` et `web/src/app/ou-j-en-suis/OuJEnSuis.tsx` résolvent désormais le titre de la leçon. |
| Faux « après quelques jours » pour des réponses du même jour | **corrigé** | Vérification de l’écart réel ; sinon « revient souvent ». |
| Capacités dupliquées ×2/×3 sans filière (`14 031 px` / `16 956 px` de haut) | **corrigé** | Dédoublonnage actif (*« Ta filière n’est pas choisie : les points de tous les programmes sont listés, chacun une seule fois »*, 37 Maths + 59 PC + 16 SVT = 112 points uniques) et blocs *« Reste à voir … + (afficher) »* repliés par défaut : la page tombe à **`3 082 px`** à `1280 px` et **`3 253 px`** à `390 px`. |
| LaTeX brut et majuscule non accentuée (« Etudier … `u_{n+1}` ») | **corrigé** | Libellés officiels normalisés dans `OuJEnSuis.tsx`. |
| Liste complète des erreurs repérées non filtrée | **corrigé** | Limité aux 5 premières erreurs avec dépliage pour le reste. |
| *(Nouveau détail mineur relevé)* | **à retoucher** | Quand une seule réponse est enregistrée, le compteur affiche *« Fondé sur 1 réponse, **gardées** sur cet appareil. »* — accorder « gardée » au singulier quand `n === 1`. |

---

## 2. Relecture des quatre portages neufs (grille du rapport 13)

### 2.1 `dipole-rc` — décharge (scène `couple` : `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37`)

- **Règle M9 (réponse cachée avant le pari)** : **OK sur les 4 étapes**.
  - `ed-decharge` : K est en `(2)`, le générateur est estompé, `i` est dessiné en encre neutre (convention), `u_C(t)` pointillé ne dévoile pas le signe dans l’équation différentielle.
  - `sol-decharge` : `cu = 0` — même la courbe pointillée de `u_C(t)` est masquée avant le choix entre `E e^{+t/RC}`, `E e^{-t/RC}` et `E(1 − e^{-t/RC})`.
  - `i-decharge` : `ic = 0` — ni courbe `i(t)`, ni flèche rouge « sens réel », ni lecture `i = −… mA` avant la réponse. Après réponse : flèche rouge « sens réel » vers la gauche sous `R`, `i(t)` part de `−1,2 mA` vers `0`, et `u_R + u_C = 0,0 V`.
  - `v-37` : courbe `u_C(t)` et ligne horizontale `37 % de E` (`4,4 V`) affichées, sans le repère vertical `τ`, obligeant l’élève à lire `2,2 s` sur l’axe.
- **Exactitude physique du dessin** : **OK**. En position `(2)`, le générateur sort de la maille (`opacity: 0.3`), la flèche de convention `i` ne change pas de sens (vers A), `u_C` reste en convention récepteur (de B vers A), les charges `+` et `−` restent sur les faces extérieures des armatures (jamais dans l’isolant), la flèche rouge « sens réel » va de A vers R (à l’opposé de `i`), et `u_R = R i = −u_C` vérifie `u_R + u_C = 0,0 V` à chaque instant.
- **Accord texte / dessin** : **OK** sur les 4 étapes.
- **Taille de texte à `390 px`** : **`11,0 px`** mesurés sur `i-decharge` et `v-37`, `overflow = 0`. Seul point d’attention visuel : `u_R = R i = −10,8 V` frôle le bord droit en `390 px` sombre (lisible, non coupé).

### 2.2 `meiose` — crossing-over (scène `crossing` : `chiasma`, `echange`, `quand-co`, `v-intra`)

- **Règle M9** : **OK sur les 4 étapes**.
  - `chiasma` : tétrade non croisée (`AA/DD` rouge, `aa/dd` noir), aucun indice avant la question sur chromatides sœurs vs non sœurs.
  - `echange` : montre la tétrade après échange des segments (`AD`, `Ad`, `aD`, `ad`) mais avant séparation en gamètes (`u: 2`, puis `u: 4` au `reveal`), ce qui permet de raisonner sur la tétrade sans montrer les 4 gamètes finis.
  - `quand-co` : sous-titre neutre *« Quatre cellules »* (ne mentionne pas « Prophase I » avant la question d’item bac).
  - `v-intra` : les 4 gamètes ont des bordures neutres sans étiquettes « recombiné » / « parental » avant la réponse (`rc: 0`, révélé après).
- **Exactitude biologique du dessin** : **OK**. Chromosomes verticaux à 2 chromatides réunies par un centromère unique jusqu’à la métaphase II ; rupture et échange uniquement sur les deux chromatides internes non sœurs (`k = 1, 2` dans `web/src/components/pilote/meiose-scenes-e.js`) ; les allèles inférieurs `D` et `d` suivent exactement leurs segments échangés (en clair comme en sombre).
- **Accord texte / dessin** : **OK**, avec un **détail mineur** sur `echange` avant réponse : le sous-titre dit *« Prophase I : le chiasma s’est dénoué, les segments sont échangés »* alors que le cercle pointillé rouge et le mot `chiasma` restent visibles au croisement jusqu’à la réponse (et en mode sombre `390 px`, le mot `chiasma` en rouge sombre est un peu discret).
- **Taille de texte à `390 px`** : **`11,0 px`** mesurés sur `chiasma`, `echange` et `v-intra`, `overflow = 0`.

### 2.3 `exponentielle` — miroir `ln`/`exp` (scène `miroir` : `pliage`, `reflet-pente`, `derivee`)

- **Règle M9** : **OK sur les 3 étapes**.
  - `pliage` : étape d’exploration avec curseur `Pliage` (`ctl: 'plie'`), sans question piège.
  - `reflet-pente` : avant réponse, seule la tangente rouge à `ln` en `(4 ; ln 4)` avec son triangle `(4 ; 1)` et `pente 1/4` est affichée (`tanB2: 0, rb: 0`). La tangente réfléchie et `pente 4` ne glissent de l’autre côté de `y = x` qu’au `reveal`.
  - `derivee` : avant réponse, seules les courbes `exp`, `ln` et `y = x` apparaissent (`tanX: 0, mr: 0`). Le point mobile sur `exp`, son symétrique sur `ln` et la légende chiffrée (`hauteur 0,24`, `pente 0,24`, `pente de ln 4,24`) n’apparaissent qu’après réponse.
- **Exactitude mathématique du dessin** : **OK**. Repère strictement orthonormé (`U = 76 × (1 + 3,5 × zm)` sur `X` et `Y` dans `web/src/components/pilote/exponentielle-scenes-a.js`), droite `y = x` à 45° exacts, tangente en `(x ; e^x)` de pente `e^x` égale à la hauteur, et pente au point miroir `(e^x ; x)` égale à `1/e^x`.
- **Accord texte / dessin** : **OK** (clair et sombre).
- **Taille de texte à `390 px`** : **`11,0 px`** mesurés sur `pliage`, `reflet-pente` et `derivee`, `overflow = 0`.

### 2.4 `transmission` — gènes liés (scène `lies` : `crossing-over`, `deux-sur-quatre`, `pourcentage`)

- **Règle M9** : **OK sur les 3 étapes**.
  - `crossing-over` : tétrade parentale intacte `GG / LL` et `gg / ℓℓ` avant le pari (`u = 0`), échange et séparation dans `reveal`.
  - `deux-sur-quatre` : les 4 cellules issues du crossing-over sont affichées avec des contours neutres (`gam: 0, rc: 0`), sans les étiquettes « parental » / « recombiné » avant la réponse.
  - `pourcentage` : `seq` fait apparaître la barre proportionnelle du test-cross (`48,29 %`, `1,29 %`, `1,71 %`, `48,71 %`), mais la somme `recombinés : 1,29 + 1,71 = 3 % du total` reste masquée (`sum: 0`) jusqu’au `reveal`.
- **Exactitude biologique du dessin** : **OK** (`web/src/components/pilote/transmission-scenes-e.js` : 2 chromatides non sœurs échangées, allèles `L` et `ℓ` solidaires de leurs segments, proportions `48,29 %` / `1,29 %` / `1,71 %` / `48,71 %` exactes sur la barre).
- **Accord texte / dessin** : **OK**. Petit détail visuel à `390 px` sur `pourcentage` (après réponse) : dans la barre grise proportionnelle, les deux lignes `G L` / `48,29 %` (et `g ℓ` / `48,71 %`) sont très serrées verticalement contre les bords supérieur et inférieur de la barre (lisibles, sans chevauchement).
- **Taille de texte à `390 px`** : **`11,0 px`** mesurés sur `crossing-over`, `deux-sur-quatre` et `pourcentage`, `overflow = 0`.

---

## 3. Audit des six autres leçons portées (M9 sur `seq` avant question, accord texte/dessin et `390 px`)

### 3.1 `logarithme` (`/pilote/logarithme`, 62 étapes)
- **Étapes `seq` avant question vérifiées** : `reve`, `trou`, `a24`, `bande`, `r-quotient`, `retour`, `bac`.
- **Constat M9** :
  - `reve`, `trou`, `a24`, `bande`, `retour`, `bac` : **OK** (`seq` pose la situation ou le calcul déjà commenté sans dévoiler la réponse).
  - **`logarithme : r-quotient` · 1280 et 390 px · clair et sombre** : **tension M9 + collision courbe/texte**. Le `seq: [{ p: { quot: 1 }, d: 900, w: 300 }]` affiche déjà **`ln 6 − ln 2 = ln 3`** sur la figure avant que l’élève réponde à *« La ligne suivante ? »* (`ln(a/b) = ln(a × 1/b)` → `ln a + ln(1/b)`). Même si l’étape demande la ligne intermédiaire, la figure saute directement à la conclusion soustractive ; de plus, à `390 px`, la courbe `y = 1/x` coupe directement le début du libellé `ln 6 − ln 2 = ln 3`. **Correction proposée** : différer `quot: 1` dans `pari.reveal` (ou masquer le libellé `= ln 3` avant réponse) et remonter légèrement le texte au-dessus de la courbe.
- **Taille de texte à `390 px`** : `16/62` étapes mesurées, **`min = 11,0 px`**, `0` étape `< 11 px`, `overflow = 0`.

### 3.2 `exponentielle` (`/pilote/exponentielle`, 53 étapes)
- **Étapes `seq` avant question vérifiées** : `defaire`, `somme-produit`, `notation`, `bac-sol` (en plus de `pliage`, `reflet-pente`, `derivee` vus au §2.3).
- **Constat M9** : **OK sur toutes les étapes**. En particulier sur `somme-produit`, `seq` s’arrête à `demo: 2` (`2 + 3 = 5 pas`) sans afficher `→ 32 = 4 × 8` (réservé à `demo: 4`). Sur `bac-sol`, `seq` s’arrête aux racines en `t` (`roots: 1`) et n’affiche le retour à `x` (`back: 1`) qu’au `reveal`.
- **Taille de texte à `390 px`** : `13/53` étapes mesurées, **`min = 9,79 px`** (`1` étape légèrement sous `11 px`), `11,0 px` sur toute la scène `miroir`, `overflow = 0`.

### 3.3 `radioactivite` (`/pilote/radioactivite`, 59 étapes)
- **Étapes `seq` avant question vérifiées** : `tiroir`, `enigme`, `grands`, `ruther`.
- **Constat M9** :
  - `tiroir`, `enigme`, `grands` : **OK** (`dev: 1`, `big: 1`, `law: 1` sont bien dans `reveal`).
  - **`radioactivite : ruther` · 1280 et 390 px · clair et sombre** : **spoiler partiel M9**. À l’entrée, `seq: [{ p: { pts: 1 }, d: 1600, w: 200 }]` trace **tous** les points de mesure de Rutherford (`RUTH` dans `web/src/components/pilote/radioactivite-scenes-b.js`, ligne 241), y compris le point **`(118 s ; 0,23)`** posé juste au-dessus de la graduation `2 min` et à hauteur `0,25`, alors que la question demande *« Au bout de combien de temps tombe-t-il au quart ? »* (`Vers 1 min 30 s` / `Vers 2 min` / `Vers 4 min`). Même si l’annotation rouge *« 0,23 à 118 s : presque 1/4 »* et les pointillés attendent `stairs: 1` dans `reveal`, le point lui-même se lit directement sur le graphe avant le pari. **Correction proposée** : n’afficher avant le pari que les points jusqu’à `62 s` (`0,51 à 62 s`), et révéler les points suivants (dont `118 s`) avec `stairs: 1` dans `pari.reveal`.
- **Taille de texte à `390 px`** : `13/59` étapes mesurées, **`min = 11,0 px`**, `0` étape `< 11 px`, `overflow = 0`.

### 3.4 `noyaux` (`/pilote/noyaux`, 54 étapes)
- **Étapes `seq` avant question vérifiées** : `deux-routes`, `retour-de`.
- **Constat M9** : **OK sur les deux étapes**. Sur `deux-routes`, `route: 1` trace les deux flèches de montée (`on fournit ΣEℓ(réactifs)`) et de descente (`on récupère Eℓ(produits)`) qui illustrent le texte de mise en place, tandis que la flèche bilan `ΔE` (`de: 1`) attend `pari.reveal`. Sur `retour-de`, `lvB: 1` pose les niveaux initiaux/finaux et `de: 1` attend `pari.reveal`.
- **Taille de texte à `390 px`** : `13/54` étapes mesurées, **`min = 11,0 px`**, `0` étape `< 11 px`, `overflow = 0`.

### 3.5 `expression-genetique` (`/pilote/expression-genetique`, 57 étapes)
- **Étapes `seq` avant question vérifiées** : `v-savoir`, `drep`, `gene-chr`, `pari-u`, `nirenberg`, `bac-doc`.
- **Constat M9** : **OK sur les 6 étapes**. `drep` anime uniquement la déformation du globule rouge en faucille (sans montrer l’hémoglobine) ; `pari-u` s’arrête à la première base transcrite (`n: 1`, `fo: 1` montre la position suivante sans la remplir, `n: 3` est dans `reveal`) ; `nirenberg` montre seulement l’ARNm `UUUUUU…` (`pu: 1`), la chaîne `Phe – Phe – Phe` (`pf: 1`) attend `reveal` ; `bac-doc` affiche le document (`doc: 1`) et garde la première étape corrigée (`e1: 1`) dans `reveal`.
- **Taille de texte à `390 px`** : `11/57` étapes mesurées, **`min = 6,24 px`** (`1` famille d’éléments nettement sous `11 px` : dans `web/src/app/pilote/expression-genetique/expression-genetique.css`, `.eg-cod`, `.eg-aa` et `.eg-l16` sont à `16px`, soit `16 × 0,39 = 6,24 px` réels à `390 px`). **Correction proposée** : relever ces classes à `≥ 28px` (ou réduire la largeur du `viewBox` sur les scènes de codons). `overflow = 0`.

### 3.6 `transmission` (`/pilote/transmission`, 53 étapes)
- **Étapes `seq` avant question vérifiées** : `pourcentage` (seule étape `seq + pari` de la leçon, analysée au §2.4 : **OK sur M9**, la somme `3 %` n’apparaît qu’au `reveal`).
- **Taille de texte à `390 px`** : `13/53` étapes mesurées, **`min = 9,79 px`** (`1` étape légèrement sous `11 px`), **`11,0 px`** sur toute la nouvelle scène `lies`, `overflow = 0`.

---

## 4. Trois faits restés ouverts dans le rapport 12

### 4.1 Le théorème de la suite monotone bornée est-il « admis » au programme officiel marocain ?

- **Ce que confirment les sources premières accessibles** :
  - Dans les *Orientations pédagogiques et programmes de mathématiques du cycle secondaire qualifiant* (MEN, Maroc, 2006, `prog_2sx.pdf`, p. 5–6), la propriété de convergence de toute suite croissante majorée ou décroissante minorée (*تقارب متتالية تزايدية ومكبورة أو تناقصية ومصغورة*) figure au programme de 2e bac (Sciences expérimentales et Sciences mathématiques), **sans figurer dans la liste des théorèmes à démontrer** en Sciences mathématiques.
  - Dans la pratique des examens nationaux marocains (Sciences expérimentales PC/SVT et SM), le théorème est appliqué directement sans démonstration ; la démonstration repose sur l’axiome de la borne supérieure de $\mathbb{R}$, qui relève du programme de classes préparatoires MPSI au Maroc (*Programme de Mathématiques MPSI*, 2023, https://alkendy.ma/Articles/Programme-Maths-MPSI-23.pdf).
- **Limite d’accès à signaler honnêtement** : le PDF brut des *Orientations pédagogiques 2e Bac Sciences expérimentales — BIOF* (MEN, 2015, 13 p., référencé sur https://lycee.mathtutor.ma/documents/orientations-pedagogiques/) n’a pas pu être ouvert directement en texte intégral pour vérifier la présence mot pour mot du terme « admis » (*يُقبل*) en colonne *Orientations pédagogiques*. Sur le fond mathématique et curriculaire marocain, la formulation « admis au lycée » est exacte.

### 4.2 Définition de `exp` attendue en Sciences expérimentales

- **Ce que confirment les sources accessibles** :
  - Dans `prog_2sx.pdf` (MEN, 2006, p. 3), le programme de 2e bac propose trois approches possibles pour introduire la fonction exponentielle (en Sciences mathématiques), dont la définition comme **fonction réciproque de la fonction logarithme népérien `ln`**.
  - Dans le référentiel local du projet (`docs/referentiel/maths-sexp.yaml`), le théorème de la fonction réciproque est placé juste en amont (`1.2.11`, p. 2) avant le bloc `exp` (`1.2.20` à `1.2.22`, p. 3).
  - Les cours de référence marocains de 2e bac PC/SVT BIOF (ex. cours de M. Benmoussa Mohammed, *Fonction exponentielle 2e Bac PC/SVT*, p. 1 ; PediaMath Maroc) introduisent systématiquement `exp` comme la **fonction réciproque de `ln` sur `ℝ`**.
- **Limite d’accès** : comme au §4.1, le PDF brut des *Orientations pédagogiques 2e Bac S.Exp BIOF* (MEN, 2015) n’a pas pu être lu page par page ; il conviendra d’y vérifier la phrase exacte si le fichier est ajouté au dépôt.

### 4.3 « Tétrade » ou « bivalent » dans les sujets et manuels marocains de SVT

- **Source officielle première vérifiée (examen national)** : le terme **« tétrade »** figure mot pour mot dans un sujet officiel du baccalauréat marocain — **Examen National 2021, session normale, SVT, 2e Bac Sciences de la Vie et de la Terre**, Partie I (*Restitution des connaissances*), p. 2/14 (consultable sur https://www.alloschool.com/element/125914) :
  > *« Tétrade → c. Structure formée suite à l’appariement de deux chromosomes homologues lors de la prophase I. »*
- **Usage de « bivalent »** : le terme « bivalent » apparaît comme synonyme dans certains supports de cours BIOF marocains (*« bivalents (= tétrades de chromatides) »*), mais c’est bien **« tétrade »** qui est le terme canonique testé en restitution de connaissances au bac national marocain.
- **Limite d’accès** : aucun scan consultable des manuels papier marocains (*Fi Rihab SVT*, *Al Mofid en SVT*) n’a pu être ouvert directement en ligne ; la citation verbatim de l’Examen National 2021 suffit toutefois à valider sans ambiguïté le choix de **« tétrade »** dans la leçon `meiose`.
