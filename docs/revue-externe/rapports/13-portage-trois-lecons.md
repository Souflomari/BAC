# Rapport 13 — Revue du portage des trois leçons et de `/ou-j-en-suis`

- **Date** : 25 novembre 2026
- **Branche auditée** : `claude/vibrant-fermi-v1lxj5` (commit `5ab72149`, incluant les commits de portage `db46319b` et `e7ec083e`)
- **Périmètre** : parcours complets dans Chromium de `/pilote/dipole-rc` (56/56 étapes), `/pilote/meiose` (52/52 étapes) et `/pilote/suites` (53/53 étapes) à `1280×800` (clair) et `390×844` (clair et sombre), en cliquant une mauvaise réponse d’abord sur chaque question, suivis de la visite de `/ou-j-en-suis` à `1280×800` et `390×844` (251 réponses enregistrées sur cet appareil).
- **Méthode de mesure de taille de texte (règle M5)** : `parseFloat(getComputedStyle(t).fontSize) × (svgRect.width / viewBox.baseVal.width)` sur tous les `<text>` visibles du SVG à `390 px` de large.

---

## 1. Synthèse chiffrée du parcours

| Page | Étapes parcourues | Textes SVG `< 11 px` réels à `390 px` (min mesuré) | Débordement horizontal (`scrollWidth > innerWidth`) | Constat principal |
| :--- | :---: | :---: | :---: | :--- |
| `/pilote/dipole-rc` | 56 / 56 | 2 étapes (`8,58 px` sur `courbe` ; `11,0 px` sur `couple`) | 0 | `cinq-tau` divulgue la réponse avant le choix ; axe `i(t)` vide affiché avant révélation ; circuit à ~165 px sur téléphone |
| `/pilote/meiose` | 52 / 52 | 6 étapes (`7,80 px` sur `bac` ; `11,0 px` sur `division`) | 0 | `courbe` divulgue « division II » sur l’axe ; 3 styles de chromosomes coexistent ; collision de chromosomes à `tetrade` |
| `/pilote/suites` | 53 / 53 | 6 étapes (`5,85 px` sur `toile`) | 0 | `depart` divulgue `u_10 ≈ 2,003` avant le pari ; `depart-mono` et `rappel` tracent déjà l’escalier descendant ; graduations à `5,85 px` |
| `/ou-j-en-suis` | 251 réponses | — | 0 | Slug brut `dipole-rc` dans le texte ; capacités dupliquées ×3 sans filière (`14 031 px` / `16 956 px` de haut) ; faux « après quelques jours » |

---

## 2. Défauts relevés, classés par gravité

Format : `leçon : clé · écran · thème · ce qui cloche · correction proposée`

### Priorité 1 — Scène qui donne la réponse avant le pari (règle M9)

- `suites : depart` · 1280 et 390 px · clair et sombre · `lecU: 1` affiche `u_0 = 5 : u_10 ≈ 2,003` en haut à droite avant que l’élève parie si les marches vont vers 2, plus haut ou 5 · mettre `lecU: 0` dans `set` et ne passer `lecU: 1` que dans `pari.reveal`
- `meiose : courbe` · 1280 et 390 px · clair et sombre · l’axe horizontal de la courbe d’ADN affiche déjà les libellés `G1`, `phase S`, `division I`, `division II`, `gamètes` directement sous la chute de 2q à q alors que la question demande ce que représente cette chute · masquer les étiquettes `division II` et `gamètes` (ou toutes les phases après `division I`) avant la réponse, puis les afficher dans `pari.reveal`
- `dipole-rc : cinq-tau` · 1280 et 390 px · clair et sombre · `set: CP({ t: 0, ic: 1 })` et `seq: [{ p: { t: T6 }, d: 4500 }]` animent automatiquement `t` jusqu’à `6τ = 13,2 s` avec `u_C` qui atteint `12,0 V` autour de `11 s` et `63 %` marqué à `τ = 2,2 s`, ce qui dévoile la réponse « environ 5τ = 11 s » avant le choix · figer `t` à `0` (ou `τ`) sans lancer `seq` jusqu’à `T6` avant le choix, et jouer l’animation `t: 0 → T6` dans `verifie.reveal`
- `suites : depart-mono` · 1280 et 390 px · clair et sombre · `set: { u0: 5, k: 4 }` trace déjà 4 marches descendantes de 5 vers 2 avant que l’élève réponde si la suite est croissante, décroissante ou ni l’une ni l’autre · partir à `k: 0` (seul `u_0 = 5` posé) et tracer les 4 marches dans `pari.reveal`
- `suites : rappel` · 1280 et 390 px · clair et sombre · même problème : `set: { f: 'dose', u0: 5, k: 6 }` dessine déjà les 6 marches descendantes avant la question sur le sens de variation · mettre `k: 0` dans `set` et révéler `k: 6` dans `verifie.reveal`
- `dipole-rc : permanent` · 1280 et 390 px · clair et sombre · `trans: 1` affiche déjà les étiquettes « régime transitoire » et « permanent » sur la courbe alors que le texte `apres` introduit ces termes après la réponse, et l’animation auto-joue jusqu’à `6τ` · réserver `trans: 1` au `reveal` avec `ic: 1`

### Priorité 2 — Scène qui ne montre pas ce que dit le texte de l’étape

- `meiose : echange` · 1280 et 390 px · clair et sombre · le texte affirme « Le chiasma se dénoue : les deux chromatides ont échangé un segment », mais la scène montre encore le chiasma croisé (`co: 0.5`) et les 4 étiquettes à gauche affichent encore `A D / A D / a d / a d` en contradiction avec les bras échangés à droite · dénouer le chiasma dès l’entrée de `echange` ou ajuster le texte, et placer `A/a` sur le bras gauche et `D/d` sur le bras droit afin que les allèles suivent le segment échangé
- `meiose : telophase1` · 1280 et 390 px · clair et sombre · le texte annonce au présent accompli « Fin de la division I : la cellule s’est partagée en deux », alors que la scène ouvre à `u: 2.6` avec le sous-titre « Anaphase I » et une seule cellule pendant `500 ms` + `2200 ms` d’animation · démarrer à `u: 2.85` (sous-titre « Fin de la division I ») ou synchroniser le texte avec l’état affiché
- `dipole-rc : permanent`, `i-t`, `reste` · 1280 et 390 px · clair et sombre · quand `ic = 0` (courant masqué avant le choix), l’axe `i (mA)` et sa graduation `1,2` restent visibles et vides en bas de la scène `couple`, donnant l’impression d’un graphe cassé ; de plus, la ligne verticale du repère de temps traverse le libellé `i (mA)` · placer les axes et graduations de `i(t)` dans le groupe `this.iG` contrôlé par `ic`, et décaler le titre `i (mA)` à gauche de l’axe ou au-dessus de `1,2`
- `meiose : tetrade` · 1280 et 390 px · clair et sombre · à `u = 0` (`DISP`), les deux chromosomes maternels noirs (`G2` en `[565, 312]`, `LG = 70` ; `P2` en `[570, 405]`, `LP = 48`) se chevauchent verticalement sur 25 unités SVG (`312 + 70 = 382 > 405 − 48 = 357`) · remonter `G2` vers `y = 268` et descendre `P2` vers `y = 425` dans `DISP` (`web/src/components/pilote/meiose-scenes-d.js`)
- `dipole-rc : cinq-tau` · 390 px · sombre et clair · dans la scène `couple`, l’étiquette rouge `i` au-dessus de la flèche du circuit (`y = YT - 26 = 116`) touche le sous-titre `E = 12 V · R = 10 kΩ · C = 220 µF` (`y = 90`) · descendre le haut du circuit (`YT`) de 16 unités ou sortir le sous-titre hors du SVG
- `suites : piege-2u` · 1280 et 390 px · clair et sombre · l’étiquette du point fixe `ℓ = 1` chevauche le trait rouge issu de `s_0 = 2` lors de la transition depuis `limite-dose` · décaler `ℓ = 1` vers le haut-gauche du cercle `(1 ; 1)` (`dx = -64, dy = -14`) pour `f === 'double'`

### Priorité 3 — Écart entre maquette et leçon qui fait perdre l’idée principale

- `dipole-rc : permanent`, `i-t`, `reste`, `cinq-tau` · 1280 et 390 px · clair et sombre · dans `MaquetteDipoleRc`, l’élève peut comparer d’un clic les paliers `t = 0⁺`, `τ`, `3τ`, `5τ` et voit visuellement la répartition `u_C + u_R = E` sous forme d’une jauge empilée ; dans la scène `couple` portée, `u_R + u_C = E` n’est qu’une ligne de texte chiffré sans jauge visuelle, il n’y a aucun bouton de palier (`τ`, `5τ`), et `permanent` n’a pas de curseur `ctl: 'temps'` après réponse · ajouter une jauge empilée `u_C | u_R` sur `E` et des raccourcis de paliers (`0`, `τ`, `5τ`) sous le curseur `ctl: 'temps'`, et activer `ctl: 'temps'` aussi sur `permanent` après réponse
- `dipole-rc : permanent`, `i-t`, `reste`, `cinq-tau` · 1280 et 390 px · clair et sombre · la scène `couple` démarre toute seule (`seq` lance `t: 0 → T6` à l’entrée), en rupture avec la règle M3 (« rien ne démarre seul ») · ne lancer `t` que sur action de l’élève ou au `reveal` après le pari
- `suites : premiere-marche`, `escalier`, `ou-vont`, `piege-2u` · 1280 et 390 px · clair et sombre · la maquette `MaquetteSuites` offrait un bouton pas-à-pas (« Étape suivante : monter → reporter → descendre ») permettant à l’élève de décomposer chaque marche à son rythme ; dans `suites-scenes-a.js`, les 4 marches de `escalier` défilent d’une traite en `2,6 s` sans commande de pas-à-pas · proposer un contrôle pas-à-pas (ou un curseur de marche `k`) après la révélation sur `escalier` et `piege-2u`

### Priorité 4 — Texte de scène inférieur à `11 px` réels sur téléphone (`390 px`, règle M5)

- `suites : bac-heredite`, `bac-mono`, `bac-lim`, `bac-copie`, `bac-2` · 390 px · clair et sombre · les graduations `.t-tick` (`15` unités dans un `viewBox` de `1000`) mesurent **`5,85 px`** réels (`0,75`, `1,5`) ; `v-lim-composee` mesure **`6,20 px`** (`3`) ; le sous-titre `t-sous` (`16` unités) et les libellés de la jauge `t-lab` (`18` unités) restent également sous `11 px` · porter les tailles SVG de `suites` à au moins `28` unités (pour `viewBox="0 0 1000 720"`, `28 × 0,39 = 10,92 px`, soit `30` unités = `11,7 px` réels) ou resserrer le `viewBox` à `760`
- `meiose : bac-phases`, `bac-courbe`, `bac-copie`, `bac-2`, `bac-schema`, `q1` · 390 px · clair et sombre · les textes `.t-lab2` / `.t-lab` / `.t-sous` (« Document 1 », « temps », descriptions sous les cellules) mesurent **`7,80 px`** réels à `390 px` · relever `.t-sous`, `.t-lab` et `.t-lab2` de la scène `bac` à `29`–`30` unités SVG (`≥ 11,3 px` réels)
- `dipole-rc : influence-E`, `curseurs` · 390 px · clair et sombre · les graduations d’axe de `scene: "courbe"` mesurent **`8,58 px`** réels (`0`, `2`, `4`…) · relever la taille des graduations dans `outilsRc` (`web/src/components/pilote/dipole-rc-outils.js`, `axes`, actuellement `22`) à `29` unités SVG (`11,3 px` réels)

### Priorité 5 — Styles de dessin mélangés dans la même leçon

- `meiose : chiasma`, `echange`, `quand-co`, `v-intra` · 1280 et 390 px · clair et sombre · juste après 12 étapes en chromosomes verticaux bichromatidiens à un centromère (`scene: "division"`), la partie crossing-over retombe sur l’ancien style `scene: "meiose"` : 4 barres horizontales portant chacune son propre rond de centromère, ce qui donne visuellement l’impression de 4 chromosomes indépendants au moment même où l’on demande la différence entre chromatides sœurs et non sœurs · unifier `chiasma`, `echange`, `quand-co`, `v-intra` sur le style bichromatidien vertical à 1 centromère par chromosome (objet de la maquette de crossing-over du chantier 3)
- `meiose : interphase`, `retour-mendel`, `bac-qcm`, `bac-vf`, `schema-phases`, `bac-doc`, `bac-phases`, `bac-2`, `bac-schema` · 1280 et 390 px · clair et sombre · ces étapes conservent soit les barres horizontales de `scene: "meiose"`, soit les X horizontaux aplatis de `dessinCellule` (`scene: "schema"` et `scene: "bac"`), soit les bâtons simples de `scene: "quiz"` : trois grammaires visuelles coexistent dans la même leçon · faire converger `dessinCellule` et `scene: "meiose"` vers les mêmes chromosomes verticaux bichromatidiens que `meiose-scenes-d.js`

### Priorité 6 — Lisibilité du circuit sur téléphone dans `dipole-rc` (`~165 px` de large)

- `dipole-rc : permanent`, `i-t`, `reste`, `cinq-tau` · 390 px · clair et sombre · dans `dipole-rc-scenes-d.js`, le circuit occupe `XL = 90` à `XR = 450` (360 unités sur 1 000, soit ~140 px pour la boucle et ~165 px avec les étiquettes `E` et `u_C`) parce que les 5 lignes de lectures (`t`, `u_C`, `i`, `u_R`, `u_R + u_C`) prennent la moitié droite (`XRO = 650..960`). Les symboles `E`, `A`, `B`, `u_C` restent lisibles, mais les charges `+`/`−` sur les armatures sont minuscules (~8 px), le `i` rouge touche le sous-titre `E = 12 V · R = 10 kΩ · C = 220 µF`, et les 5 lectures chiffrées à droite sont à la limite de la lisibilité (~10–11 px) · **proposition** : sortir les lectures chiffrées (`t`, `u_C`, `i`, `u_R`, `u_R + u_C`) du SVG vers une bande HTML compacte au-dessus ou au-dessous de la figure (`font-mono tabular-nums`, 13–14 px natifs), et étendre le circuit sur toute la largeur haute du SVG (`XL = 140` à `XR = 840`, soit ~275 px sur téléphone : armatures et charges 2× plus lisibles, aucun chevauchement entre `i` et le sous-titre)

---

## 3. Revue de `/ou-j-en-suis` (1280 px et 390 px, après 251 réponses)

La page ne déborde pas horizontalement (`overflow = 0` à 1280 et 390 px) et respecte le refus des notes, scores et barres de progression. Cinq défauts concrets apparaissent dès qu’un élève a parcouru plusieurs leçons :

- `ou-j-en-suis : prochaine-action` · 1280 et 390 px · clair · la première carte affiche le slug technique brut dans une phrase en français : *« Plusieurs erreurs en **dipole-rc** viennent peut-être d’un même point… »* · passer `lecon` par `titreLecon(...)` dans la génération de la raison (ou dans `web/src/app/ou-j-en-suis/OuJEnSuis.tsx`) pour afficher *« en Le dipôle RC »* / *« dans Le dipôle RC »*
- `ou-j-en-suis : prochaine-action` · 1280 et 390 px · clair · la deuxième carte affirme *« Cette erreur est revenue **après quelques jours** : 2 choix par paire, n paires : 2ⁿ »*, alors que les 251 réponses ont toutes été saisies en quelques minutes le même jour · vérifier l’écart temporel réel entre deux erreurs (au moins 24 h) avant d’écrire « après quelques jours » ; sinon écrire « plusieurs fois »
- `ou-j-en-suis : bilan-capacites` · 1280 et 390 px · clair · tant qu’aucune filière n’est choisie, chaque capacité partagée entre SM, PC et SVT est affichée **deux ou trois fois de suite à l’identique** (ex. `Le dipôle RC` répète 3 fois chaque capacité ; `La méiose` répète 2 fois), produisant une page de **`14 031 px`** de haut sur ordinateur et **`16 956 px`** sur téléphone · dédupliquer les capacités par libellé identique quand aucune filière n’est choisie (ou replier par défaut les blocs « Reste à voir » et afficher un sélecteur de filière en haut de la section)
- `ou-j-en-suis : bilan-capacites` · 1280 et 390 px · clair · certains libellés issus du référentiel affichent du LaTeX brut et une majuscule non accentuée : *« **Etudier** la convergence d’une suite `(u_n)` de la forme `u_{n+1} = f(u_n)` »* · normaliser la typographie des libellés (`Étudier`, `uₙ`, `uₙ₊₁`) ou rendre les formules en ligne
- `ou-j-en-suis : erreurs-reperees` · 1280 et 390 px · clair · la section « Les erreurs repérées » liste toutes les erreurs en une longue colonne verticale non filtrée (plus de 20 blocs identiques sur 390 px) · regrouper par leçon ou limiter l’affichage initial aux 5 erreurs prioritaires avec un dépliage « Voir toutes les erreurs repérées »
