# Spec v3 : dipôle RL (`pc/dipole-rl`)

> Plan d'auteur pour la leçon pilote `/pilote/dipole-rl` (le nom du dossier `content/pc/dipole-rl/`,
> §9, question 6), deuxième chapitre du sous-domaine « Electricité », **suite directe de
> `/pilote/dipole-rc`**. Règles : [`07-regles-du-format.md`](../07-regles-du-format.md),
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md), [`09-regles-du-mouvement.md`](../09-regles-du-mouvement.md).
> Modèle de forme : la leçon livrée `web/src/components/pilote/dipole-rc-moteur.js` et ses scènes
> `dipole-rc-scenes-a.js` (`circuit`), `-b.js` (`courbe`), `-c.js` (`droite`, `quiz`, `end`), `-d.js`
> (`couple`) ; le plan [`dipole-rc.md`](dipole-rc.md), §9 compris (ses décisions valent ici sauf
> mention contraire). Fiche : bible E2 (`docs/bible/02-physique.md`, l. 729-796), raccord E1
> (l. 641-725). Leçon minée, non portée : `content/pc/dipole-rl/` (`lesson.md`, `items.yaml`,
> `misconception-ledger.md`). Sujets : `docs/sujets/pc/dipole-rl.md`, et `docs/sujets/pc/rlc-serie.md`
> pour la notation de l'énergie.
>
> L'auteur suit ce plan étape par étape ; il rédige les textes, il ne décide ni l'ordre, ni les paris,
> ni les leurres. **Tout nombre cité ici est à recalculer par le code** (`dipole-rl-outils.js`, §8.1) ;
> les valeurs écrites sont des contrôles faits à la main.
>
> **Aucune scène d'un type nouveau.** Les quatre scènes de RC se copient et s'adaptent (`circuit`,
> `courbe`, `droite`, `couple`), plus `quiz` et `end`. Trois adaptations méritent pourtant le regard du
> propriétaire (§9, question 1) : deux jeux nouveaux dans `circuit` (`lampes`, `henry`), le jeu
> `triangle` de `couple`, et les lignes de champ dans la bobine de `couple`.

---

## 1. Périmètre

### 1.1 Ce que l'élève sait déjà, et ce que la leçon ne refait pas

L'élève sort de RC. Il sait : l'additivité des tensions dans une maille, la convention récepteur, le
pas à pas qui ralentit, vérifier une solution A(1 − e^{−t/τ}) par substitution, la tangente à
l'origine qui coupe l'asymptote en τ, les repères 63 % (montée) et 37 % (descente), 5τ, les équations
aux dimensions, une énergie quadratique ½Cu², le branchement minimal de l'oscilloscope.

**Le fil de la leçon : « même équation, autre grandeur continue ».** En RC, u_C est continue et i
saute ; en RL, **i est continu et u_L saute**. L'équation L/(R + r)·di/dt + i = E/(R + r) est celle du
condensateur, i à la place de u_C, L/(R + r) à la place de RC. La leçon ne reconstruit donc pas
l'exponentielle : elle la **transfère** (`meme-equation`), la vérifie une fois (`verif`), et consacre
ses étapes à ce qui est propre à la bobine :
1. le **retard à l'établissement** du courant (`deux-lampes`, `allure`, `u0`, `pas-pari`) ;
2. la **bobine réelle**, de résistance r : u = r·i + L·di/dt, le palier E/(R + r), u_L(∞) = r·I₀,
   la mesure de r et de L (`bobine-reelle`, `triangle`, `r-palier`, `uL-t`) ;
3. **deux grandeurs qui changent avec R** (le palier et τ), alors qu'en RC R ne change que τ
   (`double-R`) : le piège du transfert ;
4. la **rupture** : i continue de circuler sans générateur, u_L change de signe, et la **surtension**
   quand la maille de rupture est très résistante, qui explique l'étincelle de Henry (`surtension`) ;
5. l'**énergie magnétique** ½Li², d'où vient le courant de la rupture.

Ce qui est repris de RC sans être réenseigné : la construction pas à pas manipulée (`pas`, cinq clics)
devient une animation déclenchée par le pari `pas-pari` ; la dérivée de e^{u} (`x-test`,
`expo-rappel`) n'est pas reprise ; la tangente et le 63 % se lisent en une étape (`tau-63`) au lieu
de trois.

### 1.2 Le nom et les capacités officielles

Chapitre **« 2- Dipôle RL »** du « Sous domaine 3 : Electricité » (cadres 2025, p. 8 ; SVT p. 7-8).
Annexe des contenus (PC p. 21, `pc-pc.yaml` l. 513 ; SM p. 22, `pc-sm.yaml` l. 527) : « 2.1. La
bobine. - description sommaire d'une bobine - symbole. - tension aux bornes d'une bobine en convention
récepteur : u = r.i + L.di/dt - inductance, son unité. » puis « 2.2. Dipôle RL. - réponse d'un dipôle
RL à un échelon de tension : * étude expérimentale. * étude théorique. - énergie emmagasinée dans une
bobine. » Travaux pratiques de l'annexe (PC p. 26, `pc-pc.yaml` l. 542 ; SM p. 27, `pc-sm.yaml`
l. 555) : « Tension entre les bornes d'une bobine dans le cas de l'application d'une tension
triangulaire. - Réponse d'un dipôle RL à un échelon de tension », objectifs « Déterminer l'inductance
d'une bobine. » et « Mettre en évidence l'influence de R et L sur la réponse du dipôle RL et mesurer la
constante du temps. » Le cadre SVT n'a pas d'annexe (`pc-svt.yaml` l. 418).

Les identifiants **PC et SM sont les mêmes** ; ceux de **SVT sont décalés** à partir du 13ᵉ tiret.
Libellés mot pour mot : `pc-pc.yaml` l. 199-214 ; `pc-sm.yaml` l. 200-215 ; `pc-svt.yaml` l. 198-213.
Variantes de graphie SVT, sans effet sur le sens : « Établir » (1.3.2.5) ; « l'établissement et la
rupture du courant » au lieu de « la disparition » (1.3.2.8, noté `pc-svt.yaml` l. 424).

| PC, SM | SVT | Libellé (cadre 2025, PC, mot pour mot) | Où |
|---|---|---|---|
| `1.3.2.1` | `1.3.2.1` | Représenter les tensions u_R et u_L en convention récepteur. | partie 2 |
| `1.3.2.2` | `1.3.2.2` | Connaître et exploiter l'expression de la tension u = r.i + L.di/dt aux bornes d'une bobine en convention récepteur. | parties 2, 4, 7 |
| `1.3.2.3` | `1.3.2.3` | Connaître la signification des grandeurs qui interviennent dans l'expression de la tension u aux bornes d'une bobine et leurs unités. | partie 2 |
| `1.3.2.4` | `1.3.2.4` | Déterminer les deux caractéristiques d'une bobine (l'inductance L, la résistance r) à partir des résultats expérimentaux. | parties 2, 6, 11 |
| `1.3.2.5` | `1.3.2.5` | Etablir l'équation différentielle et vérifier sa solution lorsque le dipôle RL est soumis à un échelon de tension. | parties 4, 5, 7, 11 |
| `1.3.2.6` | `1.3.2.6` | Déterminer l'expression de l'intensité du courant i(t) lorsque le dipôle RL est soumis à un échelon de tension et en déduire l'expression de la tension aux bornes de la bobine et aux bornes du conducteur ohmique. | parties 4, 5, 11 |
| `1.3.2.7` | `1.3.2.7` | Reconnaître et représenter les courbes de variation, en fonction du temps, de l'intensité du courant i(t) passant dans la bobine et les grandeurs qui lui sont liées et les exploiter. | parties 3, 6, 7, 9 |
| `1.3.2.8` | `1.3.2.8` | Connaître qu'une bobine retarde l'établissement et la disparition du courant et que l'intensité i(t) est une fonction du temps continue et que la tension entre ses bornes est une fonction discontinue à t=0. | parties 1, 3, 7, 10 |
| `1.3.2.9` | `1.3.2.9` | Connaître et exploiter l'expression de la constante de temps. | parties 5, 6, 12 |
| `1.3.2.10` | `1.3.2.10` | Utiliser les équations aux dimensions. | partie 5 |
| `1.3.2.11` | `1.3.2.11` | Exploiter des documents expérimentaux pour : * reconnaître les tensions observées. * mettre en évidence l'influence de R et de L sur la réponse d'un dipôle RL. * déterminer la constante de temps. | parties 6, 9, 11 |
| `1.3.2.12` | `1.3.2.12` | Proposer le schéma d'un montage expérimental permettant l'étude de la réponse d'un dipôle RL soumis à un échelon de tension. | parties 3, 9 |
| — | `1.3.2.13` | (SVT seulement) Reconnaitre l'intérêt d'un montage mettant en jeu un dipôle RL soumis à un échelon de tension. | partie 10, **à trancher** (§9, question 5) |
| `1.3.2.13` | `1.3.2.14` | Connaître comment brancher un oscilloscope et un système d'acquisition informatisé pour visualiser les différentes tensions. | partie 9 |
| `1.3.2.14` | `1.3.2.15` | Déterminer l'influence de R, de L et de l'amplitude de l'échelon de tension sur la réponse d'un dipôle RL. | partie 6 |
| `1.3.2.15` | — | (PC, SM seulement) Etablir l'expression de l'énergie magnétique emmagasinée dans une bobine. | partie 8 (`energie-etablir`) |
| `1.3.2.16` | `1.3.2.16` | Connaître et exploiter l'expression de l'énergie magnétique emmagasinée dans une bobine. | partie 8 |

Prérequis (non testés seuls) : toute la leçon `dipole-rc` ; le champ magnétique créé par un courant
dans un solénoïde (1ère Bac, selon la bible E2, « Prérequis ») ; le taux de variation Δi/Δt.

### 1.3 Hors programme, qu'on n'enseigne pas

L'induction de Faraday et la loi de Lenz nommées comme telles (aucun tiret ; la phrase « la bobine
s'oppose aux variations du courant » suffit, c'est le sens de 1.3.2.8) ; L = μ₀N²S/ℓ (aucun tiret) ;
la diode de roue libre (absente des cadres et des sujets transcrits, §8.2, point 5) ; la linéarisation
par ln ; le temps de seuil t = −τ ln(1 − i/I₀) ; l'induction mutuelle (bible : « hors programme »).

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 7, 9 à 12 | entières | entières | entières |
| `triangle`, `triangle-L` (partie 2) | TP de l'annexe (l. 542) | TP de l'annexe (l. 555) | pas d'annexe ; la capacité `1.3.2.4` est la même, la méthode reste licite |
| `energie-etablir` (partie 8) | `1.3.2.15` | idem | **hors cadre** : ligne « Filières PC et SM. En SVT, ce n'est pas à ton programme. » et bouton « Passer à la suite » (`data-aller="energie-calc"`), forme livrée en RC |
| Au bac | 2023 N, 2024 N (sujets PC) | idem | idem (aucun sujet SVT ni SM transcrit) |

**50 étapes (49 en SVT).** Une seule séance, comme RC (décision RC §9.4).

---

## 2. L'énigme et son retour

**L'énigme (partie 1), deux expériences.**
1. **`deux-lampes`.** Deux branches en parallèle sur le même générateur et le même interrupteur K :
   la lampe L₁ en série avec un conducteur ohmique de même résistance que la bobine ; la lampe L₂ en
   série avec la bobine. **L'élève parie** sur ce qu'il voit en fermant K : elles s'allument ensemble
   (même résistance) ; L₂ s'allume en retard, puis brille autant que L₁ ; L₂ ne s'allume jamais (la
   bobine bloque le courant). L₂ traîne, puis rattrape L₁. Expérience de principe, qualitative,
   aucune valeur de composant affichée (même statut que la lampe de RC, décision RC §9.7 ; §8.2,
   point 1).
2. **`etincelle`** (histoire, B8). Joseph Henry, 1832 : une pile, deux coupelles de mercure, un fil de
   trente à quarante pieds (une dizaine de mètres), enroulé en hélice. Il établit le contact, puis le
   rompt en tirant un bout du fil hors du mercure. **L'élève parie** : où voit-il une étincelle ? Au
   contact seulement ; à la rupture seulement ; aux deux, pareilles ; nulle part (une pile faible ne
   fait pas d'étincelle). Réponse, citée : aucune étincelle au contact, « a vivid spark » à la rupture,
   un peu plus forte quand le fil est enroulé en hélice (§8.1, source [V]).

**Deux questions restent ouvertes : pourquoi la bobine retarde-t-elle le courant sans l'empêcher ? Et
d'où vient, à la rupture, une étincelle que la pile ne donne pas au contact ?**

**Le retour (partie 10, `retour-lampes`, et la fin de la partie 7, `surtension`).**
1. Le courant d'une bobine ne peut pas sauter : il part de 0 et monte vers E/(R + r) avec
   τ = L/(R + r) ; L₂ traîne pendant quelques τ, puis brille comme L₁, car en régime permanent la
   bobine se comporte comme un conducteur ohmique de résistance r.
2. À la rupture, le courant de la bobine ne peut pas tomber d'un coup non plus. Il est forcé à
   travers ce qui ferme la maille : si c'est l'air entre deux contacts qui s'écartent, une résistance
   énorme, la tension u = R'·i devient énorme, et l'air claque : l'étincelle. Au contact, rien de tel,
   le courant part de 0. L'énergie de l'étincelle est le ½Li² emmagasiné.

Le fil rouge : **« la bobine fait au courant ce que le condensateur fait à la tension »**. Il apparaît
dans `u0`, `meme-equation`, `rappel`, `rupture-pari`, `uL-rupture`, et chacun de ces paris a un leurre
qui transfère RC **à l'envers** (le courant qui saute, u_L qui serait continue).

---

## 3. La chaîne des idées

1. RC : même équation, u_C continue, i qui saute → 2. l'énigme : une lampe en série avec une bobine
traîne à s'allumer ; une étincelle à la rupture, pas au contact → 3. une bobine, c'est un fil enroulé ;
deux grandeurs, L (henry) et r (ohm) ; en convention récepteur, u = r·i + L·di/dt : la bobine répond à
la **variation** du courant, pas au courant → 4. un courant triangulaire donne une tension en créneaux :
on lit L ; un courant constant ne laisse que r·i → 5. à la fermeture, i = 0, donc toute la tension E
est sur la bobine : u_L saute à E, et c'est elle qui fixe la pente de départ E/L ; à mesure que i
monte, u_R prend sa part, la montée ralentit → 6. l'additivité donne L·di/dt + (R + r)·i = E : l'équation
de RC, i à la place de u_C → 7. la solution se transfère : i = I₀(1 − e^{−t/τ}), I₀ = E/(R + r),
τ = L/(R + r), une durée ; on en déduit u_L(t) et u_R(t) ; u_L finit à r·I₀, pas à 0 → 8. τ se lit comme
en RC ; mais **R change le palier et τ**, L ne change que τ, E ne change que le palier ; le palier donne
r → 9. la rupture : la bobine rend le courant, même τ si la maille garde sa résistance ; u_L change de
signe d'un coup ; si la maille est très résistante, u_L dépasse de loin E (Henry) → 10. l'énergie ½Li²,
qui alimente la rupture → 11. la mesure : u_R est l'image de i, u_L se reconnaît à son saut → 12. retour
→ 13. le bac.

### 3.1 La figure-clé : i(t) et u_L(t), au même instant que le circuit

Scène **`couple`** (copie adaptée de `dipole-rc-scenes-d.js`), complétée par `courbe` pour les lectures
fines. Valeurs de la leçon : **E = 6 V, R = 50 Ω, r = 10 Ω, L = 0,30 H**, d'où R + r = 60 Ω,
I₀ = 100 mA, τ = 5,0 ms (choix au §9, question 2). Les temps sont en millisecondes, comme sur un écran
d'oscilloscope. Aucun texte ne nomme une couleur.

| # | Étape | Scène | Le changement (un seul) |
|---|---|---|---|
| 1 | `allure` | `courbe` (jeu `etab`) | axes t (ms), i (mA), **sans palier chiffré** ; la courbe i(t) se trace au `reveal` |
| 2 | `u0` | `couple` | K se ferme, t = 0⁺ : i = 0, aucune ligne de champ ; le point u_L(0⁺) = E paraît au `reveal` |
| 3 | `pas-pari` | `courbe` (`pas:1`) | le premier pas : +10 mA en 0,5 ms ; le second (+9 mA) au `reveal`, puis les pas 3 à 10 et la courbe exacte s'animent |
| 4 | `permanent` | `couple` | t de 0 à 6τ : i monte, u_L descend ; la valeur du palier (100 mA) et u_L(∞) = 1,0 V au `reveal` |
| 5 | `rappel` | `couple` | les deux courbes entières, le repère vertical à t = 0 (la pause) |
| 6 | `tau-63` | `courbe` | la tangente à l'origine et le point (τ ; 63 mA), au `reveal` |
| 7 | `double-L` | `courbe` | la courbe fantôme L × 2 se superpose au `reveal` |
| 8 | `double-R` | `courbe` | la courbe fantôme R × 2 au `reveal` : palier et τ ont changé tous les deux |
| 9 | `curseurs` | `courbe` | quatre curseurs L, R, r, E ; palier et τ affichés |
| 10 | `r-palier` | `couple` | t = 6τ, lectures i = 100 mA et u_L = 1,0 V |
| 11 | `rupture-pari` | `couple` | K bascule en (2) ; la suite de i(t) se trace au `reveal` |
| 12 | `rupture-tau` | `couple` | le repère τ et la lecture à 37 % sur la descente |
| 13 | `uL-rupture` | `couple` | la courbe u_L après la bascule (saut de +1,0 V à −5,0 V) au `reveal` |
| 14 | `surtension` | `couple` | un conducteur ohmique R₂ = 1,0 kΩ sur la borne (2) ; au `reveal`, l'axe de u_L change d'échelle et le saut à −105 V paraît |
| 15 | `energie-pari` | `courbe` (jeu `energie`) | la parabole E_m(i) et les points 100 mA, 200 mA au `reveal` |
| 16 | `bac` | `courbe` (jeu `bac23`) | la figure 2 du sujet 2023 : i(t), la tangente (T), le palier 48 mA |

**Ses trois paris** (les autres paris de la leçon sont posés sur d'autres figures ou sur celle-ci en
plus) : `allure` (le courant saute-t-il ?), `double-R` (R change-t-il le palier, τ, ou les deux ?),
`rupture-pari` (le courant tombe-t-il à zéro quand on retire le générateur ?).

### 3.2 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 2 |
| 2 | La bobine | Bobine | 6 |
| 3 | L'établissement du courant | Établissement | 4 |
| 4 | L'équation | Équation | 3 |
| 5 | La solution | Solution | 3 |
| 6 | La constante de temps | τ | 7 |
| 7 | La rupture | Rupture | 5 |
| 8 | L'énergie | Énergie | 3 |
| 9 | Mesurer | Mesurer | 2 |
| 10 | Retour à l'énigme | Retour | 1 |
| 11 | Au bac | Au bac | 8 |
| 12 | Bilan | Bilan | 4 |

**50 étapes.** Notation : **Q** question (une option `ok`, indice, second essai) ; **P** pari de
prédiction (`BET`, sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ; **M** manipulation
(`ctl`, avec `need`). ✓ juste ; ✗ fausse, suivie de la conception (étiquette du §5) puis de l'idée du
retour (B2).

### 3.3 Conventions et signes (tenues partout)

Relevé des sujets transcrits (`docs/sujets/pc/dipole-rl.md`) : 2023 N, figure 1 : i fléché vers la
droite sur la branche du haut, la bobine (b) puis R en série sur la branche de droite, E fléchée vers le
haut à gauche du générateur ; 2024 N, figure 3 : i fléché vers le haut sur la branche gauche, au-dessus
du générateur, E vers le haut ; 2020 N, figure 1 : « tension u_L à ses bornes ». **Le sens de la flèche
u_L n'est décrit dans aucune transcription** (§8.2, point 4).

**La convention de la leçon** (scènes, textes, exercices) : le montage de RC (`couple`, interrupteur à
deux positions), la bobine à la place du condensateur ; i fléché du pôle + vers R puis la bobine ;
**u_L fléchée à l'opposé de i** (convention récepteur, `1.3.2.1`), **u_R = R·i** fléchée à l'opposé de
i ; **u_L = r·i + L·di/dt** (la notation u_L désigne la tension aux bornes de la bobine réelle, comme
dans le sujet 2020 ; en 2023, r est négligeable et u_L = L·di/dt). Établissement (K en 1) :
u_R + u_L = E ; rupture (K en 2, mêmes flèches) : u_R + u_L = 0, d'où u_L < 0 juste après la bascule.

### 3.4 Les scènes (toutes copiées de RC, dans `dipole-rl-scenes-a.js` à `-d.js`)

| Scène | Origine | Ce qui change pour RL |
|---|---|---|
| `circuit` | `dipole-rc-scenes-a.js` | la bobine (spires, « (L, r) ») remplace le condensateur ; jeux `rl` (la boucle), `bobine` (la bobine seule, comme `cond`), `oscillo` (voies Y₁ sur R, Y₂ sur la bobine, masse commune), **`lampes`** (deux branches en parallèle, l'éclat de chaque lampe suit le carré du courant de sa branche, comme la lampe de RC) et **`henry`** (une pile, deux coupelles, un fil en hélice dont un bout se soulève ; l'étincelle au `reveal`) |
| `couple` | `dipole-rc-scenes-d.js` | courbe du haut i(t) (trait d'accent : le rouge reste à i, comme en RC), courbe du bas u_L(t) ; à la place des charges des armatures, **des lignes de champ dans la bobine, en nombre proportionnel à i** (§9, question 1) ; `ul` (0 → 1 : la courbe u_L, cachée tant qu'une question la demande) ; `dis` (la rupture) ; `r2` (0 ou 1 : le conducteur ohmique R₂ sur le fil de la borne (2)) ; `ech` (l'échelle de u_L : 6 V ou 120 V, changement animé, M1) ; jeu **`triangle`** : le générateur devient un GBF, i(t) triangle en haut, u(t) en bas (créneaux légèrement inclinés : le terme r·i est dessiné, M6) |
| `courbe` | `dipole-rc-scenes-b.js` | jeux `etab` (i monte vers I₀), `rupture`, `energie` (E_m en fonction de i), `bac23` ; paramètres repris (`curve`, `pas`, `exact`, `tan`, `p63`, `lect`, `taus`, `ghost`, `live`) ; `ghost` prend deux valeurs, `'L'` (L × 2) et `'R'` (R × 2) ; curseurs L, R, r, E (`ctl:'rl'`) |
| `droite` | `dipole-rc-scenes-c.js` | jeux `rampe` (i(t) linéaire, triangle de pente) et `didt` (figure 4 du sujet 2024, quadrillage imprimé) |
| `quiz`, `end` | `dipole-rc-scenes-c.js` | contenus seulement |

Les outils `outilsRc`, `fr`, `sciH` s'importent de `dipole-rc-outils.js` ; les données de la leçon
vivent dans `dipole-rl-outils.js` (§8.1). M9 partout : à l'écran avant le pari, la situation seule.

---

## 4. Les étapes

### Partie 0 : Ce qu'il faut savoir (scène `circuit`, jeu `rl`, K ouvert : rien qui donne la réponse)

- **`sav-test`** · `ctl:'saut'` (juste du premier coup : bouton vers `deux-lampes`) · **V** « Dipôle RC :
  τ = RC = 2,0 ms, E = 6 V. À t = 2,0 ms, u_C vaut… » ✓ environ 3,8 V (63 % de E). ✗ 6 V : τ pris pour
  la fin de la charge → à τ, 63 % seulement. ✗ 2,2 V : le repère 37 % appliqué à une montée → 37 %,
  c'est ce qui reste.
- **`sav-rappel`** · deux rappels : un solénoïde parcouru par un courant crée un champ magnétique,
  d'autant plus intense que le courant est grand ; un taux de variation : i passe de 0 à 0,2 A en
  1 ms, Δi/Δt = 200 A·s⁻¹. Pas d'action.

### Partie 1 : L'énigme (scène `circuit`)

- **`deux-lampes`** · jeu `lampes`, `K:0` · **P** (énoncé du §2) options : « elles s'allument ensemble :
  même résistance, même courant » / « L₂ s'allume en retard, puis brille autant que L₁ » / « L₂ ne
  s'allume jamais : la bobine bloque le courant ». `reveal` : `K:1`, `t:0→1`. Conceptions B-1, B-2.
  Retours sans jugement ; celui de la 1ʳᵉ : « Juste pour la fin : les deux lampes finissent pareilles.
  Mais au début, L₂ traîne. »
- **`etincelle`** · tag `1832` · jeu `henry`, `rv:0` · **P** (énoncé du §2) quatre options. `reveal` :
  `rv:1`, l'étincelle à la rupture, et la citation traduite (« Aucune étincelle quand on établit le
  contact ; quand on le rompt en tirant un bout du fil hors du mercure, une vive étincelle jaillit. »,
  traduction de l'auteur, §8.2, point 2). `apres`, `fort` : « Pourquoi au moment où l'on coupe, et pas
  quand on branche ? La réponse est à la fin de la rupture. » Conceptions +11, +7.

### Partie 2 : La bobine (scènes `circuit`, `droite`, `couple`)

- **`bobine`** · jeu `bobine` · une [[bobine]] : un fil conducteur enroulé en spires ; son symbole ;
  deux grandeurs, l'[[inductance]] L en [[henry]] (H), la résistance r du fil en ohm. tex
  u = r·i + L·di/dt (`1.3.2.2`, `1.3.2.3`). **Q** « Dans cette expression, r est… » ✓ la résistance du
  fil de la bobine. ✗ une résistance qu'on ajoute en série dans le montage (B-4) → r est dans la bobine
  elle-même : on ne peut pas l'enlever. ✗ zéro pour une bonne bobine, on l'oublie toujours (B-4) → les
  sujets donnent r, ou demandent de la mesurer.
- **`convention`** · jeu `rl`, `K:1`, flèche i posée · **Q** (`1.3.2.1`) « En convention récepteur, la
  flèche de u_L… » ✓ s'oppose à i. ✗ suit le sens de i (S-1) → pour un récepteur, la flèche de tension
  s'oppose au courant. ✗ se met au choix, puisque la bobine n'a pas de pôle + (S-1) → une fois i
  orienté, la convention fixe u_L. `reveal` : la flèche u_L, puis u_R.
- **`pente-tension`** · scène `droite`, jeu `rampe` · texte : bobine de résistance négligeable,
  L = 0,30 H ; i passe régulièrement de 0 à 0,20 A en 8,0 ms. **Q** « u = ? » ✓ 7,5 V
  (L·Δi/Δt = 0,30 × 25). ✗ 0,06 V : L·i (+1) → la bobine répond à la variation de i, pas à i. ✗ 0 :
  une bobine est un fil (B-2) → tant que i varie, L·di/dt n'est pas nul. `apres` : tex
  [L] = [U]·[T]/[I] : 1 H = 1 V·s·A⁻¹ ; fiche `henry` (l'unité porte le nom de Joseph Henry, §8.1).
- **`bobine-reelle`** · scène `circuit`, jeu `bobine` · **Q** « La même bobine, r = 10 Ω, est
  traversée par un courant constant de 0,10 A. u = ? » ✓ 1,0 V : r·i, car di/dt = 0. ✗ 0 : di/dt = 0,
  donc plus rien (B-4) → il reste le terme r·i. ✗ 0,03 V : L·i (+1) → L multiplie di/dt, nul ici.
  `apres`, `fort` : « En courant constant, une bobine réelle se comporte comme un conducteur ohmique de
  résistance r. » (prépare `deux-lampes`, `permanent`, `r-palier`.)
- **`triangle`** · scène `couple`, jeu `triangle`, `ul:0` · TP de l'annexe (§1.2) : un GBF impose un
  courant triangulaire, de −20 mA à +20 mA en 5,0 ms, puis retour. **P** « La tension aux bornes de la
  bobine… » options : « un triangle aussi, comme i » / « des créneaux : elle change de signe quand la
  pente de i change » / « presque nulle : i revient sans cesse à zéro ». `reveal` : `ul:1`, les créneaux
  ±2,4 V, légèrement inclinés par r·i (±0,2 V). Conception +1.
- **`triangle-L`** · même scène, `ul:1`, une lecture posée où i = 0 · **V** (`1.3.2.4`) « Là où i = 0,
  r·i est nul et u = 2,4 V ; la pente de i vaut 8,0 A·s⁻¹. L = ? » ✓ 0,30 H. ✗ 60 H : Δt oublié,
  2,4/0,040 (I-8) → L = u divisé par la pente, en A·s⁻¹. ✗ 3,3 H : rapport inversé, 8,0/2,4 (I-8) →
  l'unité tranche : V·s·A⁻¹. ✗ 0,33 H : u lue à 2,6 V, en bout de rampe, où r·i s'ajoute (B-4) → lis là
  où i = 0. `apres` : « r se mesure à part, en courant constant (`bobine-reelle`) ou à l'ohmmètre. »

### Partie 3 : L'établissement du courant (scènes `courbe`, `couple`)

- **`allure`** · pari de la figure 1/3 · scène `courbe`, jeu `etab`, `curve:0` · texte : le montage
  de RC, la bobine à la place du condensateur ; E = 6 V, R = 50 Ω, bobine L = 0,30 H, r = 10 Ω ; on
  ferme K à t = 0. **P** « Prédis i(t). » options : « il saute aussitôt à sa valeur finale, comme le
  courant de RC » / « il monte en ligne droite, puis s'arrête net » / « il part de 0, monte vite, puis de
  plus en plus lentement ». `reveal` : `curve:1`. Conceptions B-1, +2.
- **`u0`** · scène `couple`, `t:0`, `ul:0` · **Q** « À t = 0⁺, i est encore nul. La tension aux bornes
  de la bobine vaut… » ✓ E = 6 V : u_R = R·i = 0, toute la tension est sur la bobine. ✗ 0, comme i
  (+2) → u_L = E − u_R, et u_R = 0. ✗ 1,0 V, r·I₀ (B-4) → r·i est nul tant que i = 0 ; c'est L·di/dt
  qui vaut E. `reveal` : `ul:1` (le point u_L(0⁺)). `apres` : tex L·di/dt(0) = E, donc
  di/dt(0) = E/L = 20 A·s⁻¹ ; `fort` : « i est continu ; c'est u_L qui saute, de 0 à E. L'inverse du
  condensateur. » (`1.3.2.8`)
- **`pas-pari`** · pari de la figure 2/3 · scène `courbe`, `curve:0, pas:1` · texte : pendant 0,5 ms,
  on garde la pente de départ, 20 A·s⁻¹ : i monte de 10 mA. **P** « Pendant les 0,5 ms suivantes, i
  monte de… » options : « 10 mA encore : même durée, même montée » / « moins de 10 mA » / « plus de
  10 mA : la bobine s'est mise en route ». `reveal` : `pas:2`, puis les pas 3 à 10 et `exact:1`
  (animation, sans clic : la construction manipulée a été faite en RC). Le retour de la 2ᵉ : « u_R vaut
  déjà 50 × 0,010 = 0,5 V, et r·i 0,1 V : il reste 5,4 V pour L·di/dt, la pente tombe à 18 A·s⁻¹, la
  montée à 9 mA. Comme en RC, le reste est multiplié par 0,9 à chaque pas. » Conception B-1 (le saut),
  +1.
- **`permanent`** · scène `couple`, `t:0`, `seq` jusqu'à 6τ · **Q** « Longtemps après, i ne varie
  plus. Il vaut… » ✓ E/(R + r) = 100 mA. ✗ E/R = 120 mA (B-4) → en courant constant, la bobine est une
  résistance r en série avec R. ✗ 0 : une fois « chargée », la bobine bloque (B-2, +2) → c'est le
  condensateur chargé qui bloque ; la bobine laisse passer un courant constant. `reveal` : la valeur du
  palier, u_L(∞) = r·I₀ = 1,0 V, la bande « régime transitoire ». `apres` : le texte dépendant du pari
  `deux-lampes` (forme de `rappelLampe`).

### Partie 4 : L'équation (scène `circuit`, puis `couple`)

- **`ed-maille`** · jeu `rl`, `K:1`, flèches posées · **D** puis Q · lignes : u_R + u_L = E (r :
  l'additivité, K en 1) ; u_R = R·i (r : la loi d'Ohm) ; u_L = r·i + L·di/dt (r : `bobine`). Pari
  « L'équation vérifiée par i ? » ✓ L·di/dt + (R + r)·i = E. ✗ L·di/dt + R·i = E (B-4) → r·i est dans
  u_L. ✗ L·i + (R + r)·di/dt = E (+1) → L multiplie la dérivée, R + r multiplie i.
- **`ed-forme`** · **Q** « Le sujet 2020 (Ex. IV, Partie I, Q1, 0,5 pt) demande la forme
  di/dt + ((R + r)/L)·i = E/L. On l'obtient en… » ✓ divisant par L. ✗ multipliant par L (S-2, I-8) →
  l'homogénéité tranche : L·(R + r)·i n'est pas en A·s⁻¹. ✗ divisant par R + r (S-2) → c'est une autre
  forme, celle où le coefficient de i vaut 1 ; le sujet veut celui de di/dt égal à 1. `apres` : la forme
  du sujet 2024, di/dt = −((R₁ + r)/L)·i + E/L, est la même.
- **`meme-equation`** · le pont avec RC · scène `couple` (RC) en vignette non requise · texte : divise
  plutôt par R + r : (L/(R + r))·di/dt + i = E/(R + r). En RC : RC·du_C/dt + u_C = E. **Q** « Sans
  calcul, i(t) = ? » ✓ (E/(R + r))·(1 − e^{−t/τ}), avec τ = L/(R + r) : i joue le rôle de u_C.
  ✗ (E/(R + r))·e^{−t/τ} : la loi du courant de RC recopiée (+2) → dans l'équation, i est à la place de
  u_C, pas de i. ✗ E·(1 − e^{−t/τ}) : le second membre recopié (I-8) → E est en volts, i en ampères :
  le second membre ici vaut E/(R + r). `apres`, `fort` : « Même équation, autre grandeur continue. »

### Partie 5 : La solution (scènes `courbe`, `couple`)

- **`verif`** · `courbe`, jeu `etab`, `exact:1` · **D** puis Q (`1.3.2.5`) · lignes : on essaie
  i = A(1 − e^{−t/τ}) ; di/dt = (A/τ)e^{−t/τ} ; L(A/τ)e^{−t/τ} + (R + r)A − (R + r)A·e^{−t/τ} = E ;
  A·(L/τ − (R + r))·e^{−t/τ} + (R + r)A = E (r : on regroupe). Pari « Pour que ce soit vrai à tout
  instant ? » ✓ A = E/(R + r) et τ = L/(R + r). ✗ A = E/R et τ = L/R (B-4) → la substitution garde
  R + r partout. ✗ A = E/(R + r) et τ = (R + r)/L (B-5) → le terme en e^{−t/τ} s'annule si L/τ = R + r.
  `apres` : tex i(t) = I₀(1 − e^{−t/τ}), I₀ = E/(R + r), τ = L/(R + r) ; contrôle : i(0) = 0.
- **`dim`** · **Q** (`1.3.2.10`) « De u = L·di/dt, [L] = [U]·[T]/[I] ; de u = R·i, [R] = [U]/[I].
  [L/(R + r)] = ? » ✓ [T]. ✗ [T]⁻¹ : c'est (R + r)/L, le coefficient de i dans la forme du sujet 2020
  (B-5). ✗ sans dimension (B-5) → [U] et [I] s'éliminent, [T] reste. `apres` : « Comme RC, τ est une
  durée. Ici 0,30/60 = 5,0 ms. »
- **`uL-t`** · scène `couple`, `ul:0` · **D** puis Q (`1.3.2.6`) · lignes : u_R = R·i =
  R·I₀(1 − e^{−t/τ}) (r : la loi d'Ohm) ; u_L = E − u_R (r : la maille). Pari « u_L(t) = ? »
  ✓ r·I₀ + R·I₀·e^{−t/τ}, soit 1,0 + 5,0·e^{−t/τ} (V). ✗ E·e^{−t/τ} : la bobine supposée idéale (B-4)
  → avec r, u_L finit à r·I₀ = 1,0 V, pas à 0. ✗ E(1 − e^{−t/τ}) : u_L monte comme i (+2) → u_L part de
  E et descend. `reveal` : `ul:1`. `apres` : « Si r est négligeable, u_L = E·e^{−t/τ} : c'est le cas du
  sujet 2023. »

### Partie 6 : La constante de temps (scènes `couple`, `courbe`)

- **`rappel`** · scène `couple`, les deux courbes, repère à t = 0 · `sujet:'i et u_L à t = 0'` ·
  texte : mi-parcours, c'est le bon moment pour une pause ; un rappel avant de repartir. **V** « À
  t = 0⁺, que valent i et u_L ? » ✓ i = 0 et u_L = E. ✗ i = E/(R + r) et u_L = 0 : c'est le condensateur
  que tu décris (+2) → la bobine garde i continu ; c'est u_L qui saute. ✗ i = 0 et u_L = 0 (B-1) →
  u_R = 0, donc toute la tension E est sur la bobine.
- **`tau-63`** · scène `courbe`, jeu `etab`, `exact:1, tan:0` · **V** (`fixe:true`) « Le palier vaut
  100 mA. Comme pour u_C, lis τ. » ✓ 5,0 ms, là où i = 63 mA. ✗ 3,5 ms : lu à 50 mA, la moitié (+5) →
  c'est τ·ln 2. ✗ 2,3 ms : lu à 37 mA (+6) → 37 % est le repère d'une courbe qui descend. `reveal` :
  `tan:1, p63:1` (la tangente coupe le palier au même τ). `apres` : 5τ = 25 ms pour le régime permanent
  (I-6).
- **`double-L`** · `ghost:0` · **P** « On double L (0,60 H), le reste ne change pas. La courbe… »
  options : « monte deux fois plus lentement, vers le même palier » / « monte vers un palier deux fois
  plus bas » / « monte plus vite : plus de spires, plus de courant ». `reveal` : `ghost:'L'`
  (τ = 10 ms, palier 100 mA). Conception B-3.
- **`double-R`** · pari de la figure 3/3 · `ghost:0` · texte : retour à L = 0,30 H ; on double R
  (100 Ω), r ne change pas. Rappelle-toi : en RC, doubler R ne changeait que τ. **P** « Ici… » options :
  « seul τ change, comme en RC » / « seul le palier baisse » / « le palier et τ baissent tous les
  deux ». `reveal` : `ghost:'R'` (palier 54,5 mA, τ = 2,7 ms). Conception +3. `apres` : « R est au
  dénominateur des deux : I₀ = E/(R + r) et τ = L/(R + r). »
- **`curseurs`** · **M** `ctl:'rl'` · `need` : chaque curseur bougé une fois · L de 0,10 à 1,0 H,
  R de 10 à 220 Ω, r de 0 à 20 Ω, E de 3 à 12 V (à crans) ; palier et τ affichés. Texte, `fort` : « L ne
  règle que la durée, E que la hauteur, R + r les deux. »
- **`influence-E`** · `E:12` · **V** (`1.3.2.14`) « On passe à E = 12 V. » ✓ le palier double, τ ne
  change pas. ✗ τ double aussi (+4) → τ = L/(R + r) ne contient pas E. ✗ τ est divisé par deux : plus de
  tension, montée plus rapide (+4) → la courbe monte plus haut dans le même temps.
- **`r-palier`** · scène `couple`, `t:6τ`, lectures · forme du sujet 2020, Q2 (valeurs de la leçon) ·
  **Q** (`1.3.2.4`) « En régime permanent, on lit i = 100 mA et u_L = 1,0 V. r = ? » ✓ 10 Ω. ✗ 0 : une
  bobine en courant constant n'a pas de tension (B-4) → u_L = r·I₀ = 1,0 V, pas 0. ✗ 60 Ω : E/I₀ (I-8)
  → c'est R + r ; pour r seule, u_L/I₀, ou E/I₀ − R. ✗ 0,1 Ω : I₀/u_L (I-8) → V/A = Ω.

### Partie 7 : La rupture (scène `couple`)

- **`rupture-pari`** · `t:6τ, dis:0` · texte : le régime permanent est atteint, i = 100 mA ; à t = 0,
  on bascule K en (2) : le générateur sort de la maille, qui reste fermée par R. **P** « Le
  courant… » options : « tombe à 0 aussitôt : plus de générateur » / « décroît de 100 mA vers 0 » /
  « change de sens aussitôt, comme à la décharge du condensateur ». `reveal` : `dis:1`, `t:0→6τ`. Les
  lignes de champ s'éteignent à mesure. Conceptions +7, +2.
- **`ed-rupture`** · **D** puis Q · lignes : u_R + u_L = 0 (r : plus de générateur) ; mêmes relations
  qu'à l'établissement. Pari « L'équation ? » ✓ L·di/dt + (R + r)·i = 0. ✗ L·di/dt + (R + r)·i = E
  (S-3) → E a quitté la maille. ✗ L·di/dt − (R + r)·i = 0 (S-2) → avec ce signe, i grandirait sans fin.
  `apres` : tex i = I₀·e^{−t/τ}, même τ, car la maille a gardé R + r ; continuité : i(0⁺) = I₀.
- **`rupture-tau`** · `tau1:1` · **Q** « À t = 5,0 ms après la bascule, i vaut… » ✓ environ 37 mA.
  ✗ 63 mA (+6) → 63 %, c'est ce qu'atteint une courbe qui monte ; ici il reste 37 %. ✗ 0 : τ est la fin
  de la rupture (I-6) → à 5τ seulement, il reste moins de 1 %. `reveal` : `lect:1`. `apres` : « La
  bobine retarde aussi la disparition du courant. » (`1.3.2.8`)
- **`uL-rupture`** · `dis:1, ul:0` · **Q** « Juste avant la bascule, u_L = 1,0 V. Juste après… »
  ✓ −5,0 V : u_L = −u_R = −R·I₀. ✗ +1,0 V : u_L continue (+2) → c'est i qui est continu ; u_L peut
  sauter, même changer de signe. ✗ 0 : plus de générateur (+7) → i vaut encore I₀, donc u_R aussi.
  `reveal` : `ul:1`.
- **`surtension`** · `dis:0, r2:1, ech:0` · texte : on recommence, mais le fil de la borne (2) passe
  maintenant par un conducteur ohmique R₂ = 1,0 kΩ. **P** « Juste après la bascule, la tension aux
  bornes de la bobine vaut, en valeur absolue… » options : « au plus 6 V : la bobine ne peut pas rendre
  plus que le générateur » / « environ 100 V » / « 0 : le générateur est parti ». `reveal` : `dis:1`,
  `ech:1`, le saut à −105 V : i(0⁺) = 100 mA traverse R₂ + R = 1 050 Ω ; la décroissance est vingt fois
  plus rapide (τ' = L/(R₂ + R + r) ≈ 0,28 ms). Conception +8. `apres`, `fort` : « Plus la maille de
  rupture résiste, plus la tension monte. Ouvrir K, c'est mettre de l'air dans la maille : la tension
  devient assez grande pour faire jaillir l'étincelle de Henry. » (Rappel du pari `etincelle`.)

### Partie 8 : L'énergie (scène `courbe`, jeu `energie`)

- **`energie-pari`** · `curve:0` · texte : après la bascule, sans générateur, la bobine a fait passer
  du courant dans R. **P** « Avec un courant établi deux fois plus grand (200 mA), elle en aurait
  donné… » options : « deux fois plus d'énergie » / « quatre fois plus d'énergie » / « rien de plus : la
  bobine stocke du courant, pas de l'énergie ». `reveal` : la parabole, les points 1,5 mJ et 6,0 mJ.
  Conceptions B-6, B-2.
- **`energie-etablir`** · PC, SM ; ligne d'ouverture SVT et bouton « Passer à la suite » (§1.4) · **D**
  puis Q (`1.3.2.15`) · lignes : p = u_L·i (r : la puissance reçue, convention récepteur) ;
  p = r·i² + L·i·di/dt (r : u_L = r·i + L·di/dt). Pari « La part emmagasinée est la dérivée de… »
  ✓ ½·L·i² (r·i² est perdu par effet Joule dans le fil). ✗ L·i² : la dérivée de i² est 2i·di/dt (B-6)
  → d'où le ½. ✗ ½·L·i² + r·i² : toute la puissance reçue serait stockée (B-2) → r·i² chauffe le fil,
  elle n'est pas une dérivée. `apres` : tex E_m = ½·L·i² ([[energiemagnetique|énergie magnétique]],
  notation des sujets, §8.1).
- **`energie-calc`** · **V** (`1.3.2.16`) « L = 0,30 H, i = 100 mA : E_m = ? » ✓ 1,5 mJ. ✗ 15 mJ : le
  carré oublié, ½·L·i (B-6). ✗ 1,5 × 10³ J : mA non converti (+9). `apres` : « À la rupture, cette
  énergie est dissipée par effet Joule dans R et r, ou dans l'étincelle. »

### Partie 9 : Mesurer (scènes `circuit`, `couple`)

- **`oscillo`** · `circuit`, jeu `oscillo` (voie Y₁ aux bornes de R, Y₂ aux bornes de la bobine, masse
  commune) · **Q** (`1.3.2.13`) « Pour voir l'allure de i(t), on visualise… » ✓ u_R, car u_R = R·i.
  ✗ u_L (B-7) → u_L = r·i + L·di/dt n'est pas proportionnelle à i. ✗ rien : un oscilloscope ne voit pas
  les courants (B-7) → u_R en est l'image, à R près. (Le signe d'une voie avec la masse commune : §8.2,
  point 8.)
- **`oscillo-voies`** · `couple`, deux courbes sans nom · **V** (`1.3.2.11`) « Une courbe part de 0 et
  monte vers 5,0 V ; l'autre part de 6,0 V et descend vers 1,0 V. u_L est… » ✓ celle qui part de 6,0 V.
  ✗ celle qui part de 0 (B-7) → au départ, i = 0 : toute la tension est sur la bobine. ✗ aucune des
  deux, u_L doit finir à 0 (B-4) → la bobine réelle garde r·I₀ = 1,0 V.

### Partie 10 : Retour à l'énigme (scène `circuit`, jeu `lampes`)

- **`retour-lampes`** · `K:1, t:0→1` · texte dépendant du pari `deux-lampes` : i est continu dans la
  bobine, il monte vers E/(R + r) avec τ = L/(R + r) ; L₂ traîne quelques τ, puis brille comme L₁, car en
  courant constant la bobine n'est plus que sa résistance r. `fort` : « La bobine ne bloque pas le
  courant : elle le retarde. » Pas d'action. (L'étincelle de Henry a eu son retour dans `surtension`.)

### Partie 11 : Au bac — voir §6

`bac`, `bac-ed`, `bac-AB`, `bac-L`, `bac-uL`, `bac-2a`, `bac-2b`, `bac-2c`.

### Partie 12 : Bilan (scènes `courbe`, `quiz`, `end`)

- **`q1`** · la copie fautive · **V** « Une copie : τ = L/R = 0,30/50 = 6,0 ms. Son erreur ? » ✓ r
  oubliée : τ = L/(R + r) = 5,0 ms. ✗ il fallait R/L (B-5) → R/L est en s⁻¹. ✗ aucune : r ne compte
  qu'en régime permanent (B-4) → r est dans l'équation à tout instant.
- **`q2`** · **Q** « En régime permanent, une bobine réelle se comporte comme… » ✓ un conducteur
  ohmique de résistance r. ✗ un fil sans résistance (B-4). ✗ un interrupteur ouvert (B-2).
- **`q3`** · **Q** « L = 20 mH, R = 90 Ω, r = 10 Ω : τ = ? » ✓ 0,20 ms. ✗ 0,22 ms : r oubliée (B-4).
  ✗ 0,20 s : mH non converti (+9).
- **`fin`** · scène `end`, cinq lignes : u = r·i + L·di/dt en convention récepteur ; i est continu,
  u_L saute (à E à la fermeture, change de signe à la rupture) ; L·di/dt + (R + r)·i = E, solution
  I₀(1 − e^{−t/τ}) ; τ = L/(R + r), I₀ = E/(R + r) : R change les deux, L seulement τ ; E_m = ½·L·i².
  La fin de séance (forme de `profileHTML`) rappelle les paris `deux-lampes`, `etincelle`, `allure`,
  `double-R`, `rupture-pari`, `surtension`, et renvoie piège par piège (B7) : saut du courant → gabarits
  7, 11 ; r oubliée → 1, 4, 5, 7 ; L·i au lieu de L·di/dt → 2, 3 ; transfert de RC → 6, 10, 11 ; τ et
  63/37 % → 8 ; droite di/dt = f(i) → 9 ; énergie → 12 ; voies → 13.

---

## 5. Conceptions erronées → étape (B5)

Sources : bible E2, « Conceptions erronées et pièges » (B-) ; `content/pc/dipole-rl/items.yaml`, les
huit `misconceptions` (I-, avec leur id, préfixe `mc.physics.pc_dipole_rl.`) ; signes (S-) ; ajoutées
ici, avec leur raison (+).

| # | Conception | Source | Étapes (leurre ou pari) |
|---|---|---|---|
| B-1 | le courant saute à sa valeur finale à la fermeture | bible ; `courant-saute-instantane` | `deux-lampes`, `allure`, `pas-pari`, `rappel` |
| B-2 | la bobine bloque, stocke ou amplifie le courant | bible ; `bobine-nature-erronee` | `deux-lampes`, `pente-tension`, `permanent`, `energie-pari`, `energie-etablir`, `q2` |
| B-3 | I_max dépend de L | bible ; `imax-etablissement-mal-compris` | `double-L`, `curseurs` |
| B-4 | r oubliée (dans τ, le palier, u_L, l'équation) | bible ; `oubli-resistance-interne` | `bobine`, `bobine-reelle`, `triangle-L`, `u0`, `permanent`, `ed-maille`, `verif`, `uL-t`, `r-palier`, `oscillo-voies`, `q1`, `q2`, `q3`, `bac-2a` |
| B-5 | τ = R/L (et groupements faux) | bible ; `tau-mauvais-groupement` | `verif`, `dim`, `q1`, `bac-2c` |
| B-6 | E = L·i (pas de carré, pas de ½) | bible ; `energie-lineaire-en-i` | `energie-pari`, `energie-etablir`, `energie-calc` |
| B-7 | lire u_R pour u_L, ou l'inverse, sur deux voies | bible (piège de copie) | `oscillo`, `oscillo-voies` |
| I-6 | τ est l'instant où tout est fini | `lecture-tau-erronee` | `tau-63` (`apres`), `rupture-tau` |
| I-8 | la relation est écrite, on retourne les nombres de travers | `isolement-grandeur-non-controle` | `triangle-L`, `r-palier`, `ed-forme`, `meme-equation`, `bac-L`, `bac-2b` |
| S-1 | u_L fléchée comme i | §3.3 ; S-1 de `dipole-rc.md` | `convention` |
| S-2 | un signe perdu (forme normalisée, rupture) | §3.3 | `ed-forme`, `ed-rupture`, `bac-2a` |
| S-3 | E gardé dans la maille de rupture | §3.3 | `ed-rupture` |
| +1 | u_L proportionnelle à i (L·i au lieu de L·di/dt) | ajoutée : leurre naturel de 1.3.2.2 | `pente-tension`, `bobine-reelle`, `triangle`, `pas-pari`, `ed-maille` |
| +2 | transfert de RC à l'envers : i saute, u_L est continue, i suit la loi du courant de RC | ajoutée : la leçon suit RC | `allure`, `u0`, `meme-equation`, `uL-t`, `rappel`, `rupture-pari`, `uL-rupture`, `permanent` |
| +3 | R ne règle que τ, comme en RC | ajoutée : transfert de RC (`double` de RC) | `double-R`, `curseurs` |
| +4 | E change τ | ajoutée : 1.3.2.14 (« amplitude de l'échelon ») | `influence-E` |
| +5 | τ lu à la moitié (τ·ln 2) | ajoutée : héritage de RC (+5) | `tau-63`, `sav-test` |
| +6 | 63 % et 37 % échangés | ajoutée : héritage de RC (+6, I-12) | `tau-63`, `rupture-tau`, `sav-test`, `bac-L` |
| +7 | sans générateur, le courant tombe à 0 aussitôt | ajoutée : leurre naturel de la rupture | `rupture-pari`, `uL-rupture`, `etincelle` |
| +8 | la bobine ne peut pas donner plus de tension que le générateur | ajoutée : l'étincelle de Henry | `surtension` |
| +9 | préfixes non convertis (mH, ms, mA) | ajoutée : dette du registre (`misconception-ledger.md` §7, point 3) | `energie-calc`, `q3`, `bac-uL` |
| +10 | au bac, « établir l'équation » en dérivant la solution donnée | ajoutée : forme du sujet 2023 | `bac` |
| +11 | l'étincelle est au contact (ou aux deux) | ajoutée : leurre naturel de Henry | `etincelle` |

Toutes les conceptions de la fiche bible et les huit de `items.yaml` sont affrontées. Limite connue :
B-2 « amplifie » n'a pas de leurre propre ; « bloque » et « stocke du courant » en ont.

---

## 6. Au bac (B6)

**La pause et le rappel (A8).** `rappel` est la **21ᵉ étape sur 50 (42 %** ; 21/49 = 43 % en SVT, qui
saute `energie-etablir`, placée après). Sa question : i et u_L à t = 0⁺ (✓ 0 et E), qui rejoue B-1 et
le transfert à l'envers (+2). Contrôle A7 sur la liste : la plus longue suite d'étapes sans pari ni
« Vérifie » est de 1 (`sav-rappel`, `retour-lampes`, `bac-ed`, `fin`) ; `curseurs` est encadrée de deux
paris. M7 : la plus longue suite sur une même scène est `tau-63` à `influence-E` (cinq étapes de
`courbe`), et chacune change un paramètre visible (tangente, fantômes, curseurs, E) ; à contrôler sur
la leçon écrite.

**L'exemple commenté** — bac PC 2023, session normale (NS 28F), Exercice 3, §1 « Réponse d'un dipôle RL
à un échelon de tension », questions 1-1 (0,25 pt), 1-2-1 (0,5 pt), 1-2-2 (0,5 pt), 1-3 (0,5 pt),
barème imprimé en marge, total 1,75 pt (`docs/sujets/pc/dipole-rl.md`, statut vérifié, figures mesurées
au pixel). Données : E = 24 V ; bobine de résistance négligeable ; i(t) = A + B·e^{−t/τ} donnée ; palier
I₀ = 48 mA ; la tangente (T) coupe le palier à τ = 2,0 ms.

- **`bac`** · scène `courbe`, jeu `bac23` · « Question 1-1 : établir l'équation différentielle vérifiée
  par i(t). Premier geste ? » (pari sans `ok`, `reveal` : scène `circuit` en vignette, flèches posées).
  Options : « écrire l'additivité des tensions avec les flèches du schéma » (le bon réflexe) ;
  « dériver i(t) = A + B·e^{−t/τ} et remplacer » (+10 : c'est la question suivante) ; « lire τ sur la
  tangente (T) » (aucune valeur n'est demandée en 1-1).
- **`bac-ed`** · **D** commenté, sans action : u_R + u_L = E ; u_R = R·i ; u_L = L·di/dt (r
  négligeable, dit l'énoncé) ; L·di/dt + R·i = E ; di/dt + (R/L)·i = E/L.
- **`bac-AB`** · **Q** 1-2-1 « A et B en fonction de E et R ? » ✓ A = E/R, B = −E/R (régime permanent :
  i → A ; continuité : i(0) = A + B = 0). ✗ A = E/R, B = +E/R (B-1) → i(0) vaudrait 2E/R ; or i(0) = 0.
  ✗ A = 0, B = E/R (+2) → c'est le courant de RC, qui décroît ; ici i monte vers E/R.
- **`bac-L`** · **Q** 1-2-2 « Montrer que L = 1 H. » ✓ R = E/I₀ = 24/(48 × 10⁻³) = 500 Ω, puis
  L = R·τ = 500 × 2,0 × 10⁻³ = 1,0 H. ✗ L = τ/R = 4 × 10⁻⁶ H (I-8) → τ = L/R donne L = R·τ. ✗ τ lu où
  i = 37 % de I₀, 0,92 ms, d'où L ≈ 0,46 H (+6). `apres`, `html` (forme de `bac-copie`) : la rédaction
  attendue, la formule littérale avant le nombre (consigne imprimée des sujets,
  `radioactivite-outils.js` source 10, reprise par RC) ; barème 0,25 + 0,5 + 0,5 + 0,5 (cité du sujet).
- **`bac-uL`** · **Q** 1-3 « Expression numérique de u_L(t), en unités SI ? » ✓ u_L = 24·e^{−500t}
  (u_L = L·di/dt = E·e^{−t/τ}, 1/τ = 500 s⁻¹). ✗ u_L = 24·e^{−0,5t} : τ laissé en ms (+9). ✗ u_L =
  24(1 − e^{−500t}) : u_L monte comme i (+2).

**Le second exemple, que l'élève complète** — bac PC 2024, session normale (NS 28F), Exercice 4,
Partie 2, questions 2-1, 2-2-1, 2-2-2 (0,5 pt chacune, barème imprimé ; même fichier, statut vérifié,
trois passes). Données : E = 6 V ; la droite di/dt = f(i) va de (0 ; 3 × 10³ A·s⁻¹) à (6 mA ; 0).

- **`bac-2a`** · **Q** 2-1 « En appliquant l'additivité, montrer que di/dt = −((R₁ + r)/L)·i + E/L.
  Quelle ligne est juste ? » ✓ R₁·i + r·i + L·di/dt = E. ✗ R₁·i + L·di/dt = E (B-4) → la bobine (b) a
  une résistance r. ✗ R₁·i + r·i − L·di/dt = E (S-2) → avec ce signe, la pente de la droite serait
  positive.
- **`bac-2b`** · scène `droite`, jeu `didt` · **D** puis Q 2-2-1 · lignes : à i = 0, di/dt = E/L (r :
  l'ordonnée à l'origine, lue 3 × 10³ A·s⁻¹). Pari « L = ? » ✓ 6/(3 × 10³) = 2 × 10⁻³ H. ✗ 5 × 10² H :
  rapport inversé (I-8) → l'unité tranche : V/(A·s⁻¹) = H. ✗ 3,3 × 10⁻⁴ H : 1/ordonnée, E oublié (I-8).
- **`bac-2c`** · **Q** 2-2-2 « τ = ? » ✓ 2 × 10⁻⁶ s : 1/|pente| = I₀/(di/dt)₀ = 6 × 10⁻³/(3 × 10³).
  ✗ 5 × 10⁵ s : la pente prise pour τ (B-5) → la pente vaut −1/τ, en s⁻¹. ✗ 1 × 10⁻⁶ s : l'intersection
  lue à 3 mA (I-8) → la droite coupe l'axe en i = 6 mA (lecture au trait, `dipole-rl.md`).

Contrôle B3 : chaque leurre donne une valeur fausse (§8.1). Sujet 2020 N : seul l'énoncé de la Q1 sert
(`ed-forme`) ; la figure 2 n'est pas utilisée tant que sa lecture n'est pas confirmée (§8.2, point 3).
Sujets 2026 cités par la bible (PC N, SVT N, SM N) : **non transcrits**, ils ne servent pas.

---

## 7. Les exercices générés (`components/pilote/exercices/dipole-rl.js`)

Format de `exercices/dipole-rc.js` et `exercices/modele.js` : réponse calculée, chaque leurre porte `fb`
et `erreur` (id du §5), chaque question `sujet`. **Capacités** : `CAPR(id)` rend `pc-pc id`, `pc-sm id`
et `pc-svt id'` : 1.3.2.1 à 1.3.2.12 → mêmes ids ; 1.3.2.13 → 14 ; 1.3.2.14 → 15 ; 1.3.2.15 → aucun
(question marquée `filieres: ['PC','SM']`) ; 1.3.2.16 → 16. `pc-svt 1.3.2.13` sans gabarit (§9,
question 5). **Règle de tirage (B3)** : un tirage où un leurre coïncide avec la réponse à 2 % près est
rejeté, y compris les coïncidences de chiffres entre grandeurs d'unités différentes ; et **r/(R + r) ≥
5 %**, sinon le leurre « r oubliée » tombe trop près de la réponse. Valeurs : L ∈ {10 mH … 1 H}, R de la
série E12 (10 Ω à 1 kΩ), r ∈ {2 … 30} Ω, E ∈ {3 … 24} V ; sujets rejoués avec leurs valeurs imprimées
(2023, 2024).

| # | id | Niv. | Tirage | Capacités (PC/SM) | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `rl-unites` | 1 | L, R, r tirés ; τ en ms ou µs ; I₀ | 1.3.2.3, 1.3.2.9, 1.3.2.10 | r oubliée (B-4) ; R/L (B-5) ; préfixe (+9) |
| 2 | `rl-tension-bobine` | 1 | i(t) par morceaux (rampes et paliers) ; u sur chaque intervalle, r tiré ou négligeable | 1.3.2.2, 1.3.2.3 | L·i (+1) ; r·i oublié sur un palier (B-4) ; signe de di/dt (S-2) |
| 3 | `rl-triangle` | 2 | i triangle (amplitude, demi-période) ; créneaux ; L | 1.3.2.4, 1.3.2.2 | Δt oublié, rapport inversé (I-8) ; lecture où r·i ≠ 0 (B-4) |
| 4 | `rl-r-palier` | 2 | forme 2020 : I₀ et u_L(∞), ou I₀, E et R ; r | 1.3.2.4, 1.3.2.7 | r = E/I₀ (I-8) ; r = 0 (B-4) ; I₀/u (I-8) |
| 5 | `rl-equation` | 2 | établissement ou rupture ; inconnue i ; forme normalisée (2020) ou forme di/dt = … (2024) | 1.3.2.5, 1.3.2.2 | r oubliée (B-4) ; signe (S-2) ; E gardé (S-3) ; multiplié par L (I-8) |
| 6 | `rl-solution` | 2 | forme 2023 : i = A + B·e^{−t/τ} ; A, B, τ | 1.3.2.5, 1.3.2.6, 1.3.2.9 | B = +A (B-1) ; A = 0 (+2) ; τ = (R + r)/L (B-5) |
| 7 | `rl-expressions` | 2 | i(t) donné ; u_L(t), u_R(t) ; valeurs à 0, τ, ∞ | 1.3.2.6, 1.3.2.8 | u_L(∞) = 0 (B-4) ; u_L(0) = 0 (+2) ; i(0) = I₀ (B-1) |
| 8 | `rl-lecture-tau` | 3 | courbe i(t) ou u_R(t), montée ou rupture, avec ou sans tangente ; τ puis L ou R + r | 1.3.2.7, 1.3.2.9, 1.3.2.11 | 50 % (+5) ; 63/37 % échangés (+6) ; ms (+9) ; τ fin (I-6) |
| 9 | `rl-droite-didt` | 3 | forme 2024 : ordonnée E/L, racine I₀ ; L, τ, R + r | 1.3.2.5, 1.3.2.7, 1.3.2.4 | ordonnée inversée (I-8) ; pente prise pour τ (B-5) ; E oublié |
| 10 | `rl-influence` | 2 | trois courbes pour trois (R, L, E) ; attribuer ; une paire de même τ et de paliers différents une fois sur trois | 1.3.2.14, 1.3.2.11 | L change le palier (B-3) ; R ne change que τ (+3) ; E change τ (+4) ; **paliers et τ distincts de plus de 20 % sauf la paire voulue** |
| 11 | `rl-rupture` | 2 | maille de rupture R' tirée (dont R' ≫ R) ; i(0⁺), u_L(0⁺), τ' | 1.3.2.8, 1.3.2.2, 1.3.2.5 | i(0⁺) = 0 (+7) ; u_L continue (+2) ; |u_L| ≤ E (+8) ; τ' = τ alors que R' ≠ R (+2) |
| 12 | `rl-energie` | 2 | L, i ; E_m ; rapport quand i double ; en PC/SM, une question « établir » | 1.3.2.16 (+ 1.3.2.15 PC/SM) | ½Li (B-6) ; Li² (B-6) ; r·i² compté (B-2) ; préfixe (+9) |
| 13 | `rl-mesure` | 1 | deux voies (sensibilités tirées) ; reconnaître u_L et u_R ; l'image de i ; τ en divisions ; schéma à compléter | 1.3.2.12, 1.3.2.13, 1.3.2.11 | u_L prise pour l'image de i (B-7) ; divisions lues comme unités |
| 14 | `rl-bac` | 3 | forme 2023 : E ∈ {6 ; 12 ; 24} V, I₀ et τ lus ; ED, A, B, L, u_L(t) en SI | 1.3.2.5 à 1.3.2.9 | ceux des étapes `bac-*` ; **rejet si E (V) et I₀ (mA) ont la même valeur numérique** |

Niveaux : 1 restituer, convertir ; 2 appliquer une relation ; 3 enchaîner une lecture graphique et deux
relations. Aucun gabarit ne teste la diode de roue libre, la linéarisation ou le temps de seuil.

---

## 8. Données et « à vérifier »

### 8.1 Les données (pour `dipole-rl-outils.js`)

| Donnée | Source | Statut |
|---|---|---|
| 2023 N, Ex. 3 §1 : E = 24 V, r négligeable, I₀ = 48 mA, τ = 2,0 ms, R = 500 Ω, L = 1 H ; barème 0,25 + 0,5 + 0,5 + 0,5 | `docs/sujets/pc/dipole-rl.md` (vérifié, 2ᵉ passe, pixel) | [V] |
| 2024 N, Ex. 4 Partie 2 : E = 6 V, droite (0 ; 3 × 10³ A·s⁻¹) → (6 mA ; 0), L = 2 mH, τ = 2 µs, R₁ + r = 1 000 Ω ; barème 0,5 × 3 ; lecture erronée à 3 mA → 1 µs | idem (vérifié, 3ᵉ passe) | [V] |
| 2020 N, Ex. IV Partie I : R = 90 Ω, énoncé de Q1 à Q3, barème 0,5 × 3 | idem (vérifié) ; figure 2 « lecture d'échelle à confirmer » | [V] pour l'énoncé ; figure non utilisée |
| notation E_m de l'énergie magnétique | `docs/sujets/pc/rlc-serie.md` : 2023 N, Ex. 3 §2, 2-2-2 ; 2019 N, Ex. III, « E_{m1} » | [V] |
| Henry : pile, coupelles de mercure ; fil d'au plus un pied : aucune étincelle ; fil de 30 à 40 pieds : aucune au contact, « a vivid spark » à la rupture ; « somewhat increased by coiling the wire into a helix » | texte de Henry reproduit par [Princeton, Joseph Henry Project, « Self Inductance »](https://commons.princeton.edu/josephhenry/joseph-henry/self-inductance/) (lu le 2026-11-25), réf. : Henry, « On the Production of Currents and Sparks of Electricity from Magnetism », *American Journal of Science* 22 (1832), p. 403-408 | [V] (source primaire citée) |
| l'unité henry porte le nom de Joseph Henry ; Faraday publie le premier | [Wikipédia, Joseph Henry](https://en.wikipedia.org/wiki/Joseph_Henry) (lu le 2026-11-25) | [V] ; fiche de mot `henry` seulement |
| TP « tension triangulaire » | `pc-pc.yaml` l. 542, `pc-sm.yaml` l. 555 | [V] |
| valeurs de la leçon : E = 6 V, R = 50 Ω, r = 10 Ω, L = 0,30 H ; R₂ = 1,0 kΩ ; triangle ±20 mA en 5,0 ms | choix d'auteur (E, R, r, L repris de l'ancienne leçon, `lesson.md` R2) | — |

**Contrôles faits à la main (le code les refera).** R + r = 60 Ω ; I₀ = 0,100 A ; τ = 5,00 ms ;
E/L = 20 A·s⁻¹ ; i(τ) = 63,2 mA ; t(50 mA) = τ·ln 2 = 3,47 ms ; t(36,8 mA) en montée = 0,459τ = 2,29 ms ;
5τ = 25 ms (99,3 %) ; u_L = 1,0 + 5,0·e^{−t/τ} : 6,0 V à 0, 2,84 V à τ, 1,0 V à l'infini ; u_R(∞) =
5,0 V. Pas de 0,5 ms : +10 mA, puis (6 − 0,6)/0,3 × 0,5 × 10⁻³ = 9 mA ; 10 pas : 100(1 − 0,9¹⁰) =
65,1 mA contre 63,2. L × 2 : τ = 10 ms, palier 100 mA ; R × 2 : R + r = 110 Ω, palier 54,5 mA,
τ = 2,73 ms ; E = 12 V : 200 mA, 5 ms. Leurre r oubliée : 120 mA, 6,0 ms. `pente-tension` : 25 A·s⁻¹ →
7,5 V ; leurre L·i = 0,06 V. `bobine-reelle` : 1,0 V ; leurre 0,03 V. `triangle` : pente 8 A·s⁻¹,
L·di/dt = 2,4 V, r·i ∈ [−0,2 ; 0,2] V ; leurres 60 H, 3,33 H, 2,6/8 = 0,325 H (8 % de la réponse).
`r-palier` : 10 Ω ; leurres 60 Ω, 0,1 Ω. Rupture : i(τ) = 36,8 mA ; u_L(0⁺) = −5,0 V. Surtension :
−(1 000 + 50) × 0,1 = −105 V ; τ' = 0,30/1 060 = 0,283 ms. Énergie : ½ × 0,3 × 0,01 = 1,50 mJ ; à
200 mA, 6,00 mJ ; leurres 15 mJ, 1 500 J. `q3` : 20 × 10⁻³/100 = 0,20 ms ; leurre 0,222 ms (11 %),
0,20 s. Sujet 2023 : R = 500 Ω, L = 1,0 H ; leurres 4 × 10⁻⁶ H, 0,459 × 2 ms = 0,918 ms → 0,459 H ;
u_L = 24·e^{−500t} ; leurre e^{−0,5t}. Sujet 2024 : L = 2,0 × 10⁻³ H ; leurres 500 H, 3,33 × 10⁻⁴ H ;
τ = 2,0 × 10⁻⁶ s ; leurres 5 × 10⁵ s, 1 × 10⁻⁶ s. `sav-test` : 6 × 0,632 = 3,79 V ; leurre 2,21 V.

**Coïncidences cherchées et écartées.** (1) `pente-tension`, premier essai (0 → 0,1 A en 10 ms) : L·i et
L·Δt/Δi valaient tous deux 0,03 V ; d'où 0,20 A en 8,0 ms. (2) `uL-t` : le leurre « L·(I₀/τ)·e^{−t/τ} »
(r·i oublié) est égal au leurre « E·e^{−t/τ} » ; un seul est gardé. (3) `bobine-reelle` et
`energie-calc` : 0,03 V (L·i) et 0,03 J (L·i à 100 mA) ne sont jamais dans la même étape. (4) r = 10 Ω
et τ ≠ 10 ms : aucun leurre ne lit l'un pour l'autre. Aucun leurre de calcul ne retombe sur la bonne
valeur.

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **Les deux lampes** : qualitatif ; aucune expérience testée. La durée visible du retard suppose
   une bobine de forte inductance (à noyau de fer) : non sourcé, aucune valeur affichée.
2. **Henry** : la citation est en anglais ; la traduction est de l'auteur, à marquer comme telle. Le
   mois de parution diverge (juillet selon les archives de la Smithsonian, numéro d'octobre selon
   Princeton, d'après la recherche du 2026-11-25) : tag « 1832 » sans mois. « Une dizaine de mètres »
   est la conversion de 30 à 40 pieds (9,1 à 12,2 m).
3. **Sujet 2020 N, figure 2** : u_L(0) « ≈ 9 V » et palier « ≈ 1 V » sont marqués « à confirmer ». Ils
   sont incompatibles avec u_L(0) = E = (R + r)·I₀ si r = u_L(∞)/I₀ = 10 Ω (il faudrait E = 10 V).
   Relire le scan avant tout usage de la figure.
4. **Le sens de la flèche u_L** dans les figures 2020, 2023 et 2024 : non décrit ; relire les scans si
   une étape les montre.
5. **La diode de roue libre** : courante dans les manuels, absente des cadres et des sujets transcrits ;
   la leçon ne la traite pas. À confirmer sur un sujet avant d'en faire une étape.
6. **La surtension et l'étincelle** : le calcul (−105 V) découle de la continuité de i ; le seuil de
   claquage de l'air n'est pas donné et ne doit pas l'être sans source.
7. **L'« intérêt » d'un montage RL** (`pc-svt 1.3.2.13`) : même question ouverte qu'en RC (bible E1,
   « À trancher »). La leçon démontre deux faits utilisables (retarder l'établissement du courant ;
   produire une forte tension à la rupture) ; les exemples (allumage d'un moteur, bible E2 « Pour aller
   plus loin ») ne sont pas sourcés.
8. **Le branchement de l'oscilloscope** : avec la masse commune entre R et la bobine, l'une des voies
   montre l'opposé de sa tension ; même décision qu'en RC (§9.11 de `dipole-rc.md`) : branchement
   minimal, pas de voie inversée.
9. **Les lignes de champ ∝ i** dessinées dans la bobine : B est proportionnel à i dans un solénoïde
   (programme de 1ère Bac selon la bible E2, non relu dans un cadre de 1ère) ; le dessin reste
   qualitatif (M6).
10. **Le champ créé par un solénoïde** comme prérequis de `sav-rappel` : la référence de la bible
    (« 1ère Bac [SEC AlloSchool] ») n'est pas un cadre officiel.

**Histoire (≤ 3 places).** 1. **Henry, 1832** (`etincelle`, retour dans `surtension`) [V], source
primaire. 2. L'unité henry : fiche de mot, sans pari [V]. 3. Aucune troisième : Faraday (1831) n'a pas
d'expérience à prédire qui serve la leçon.

---

## 9. Décisions à trancher (propriétaire ou relecteur)

1. **Scènes.** Aucun type nouveau, mais quatre adaptations à regarder : les jeux `lampes` et `henry` de
   `circuit` ; le jeu `triangle` de `couple` (GBF, deux courbes sur le même axe) ; les lignes de champ
   en nombre proportionnel à i, à la place des charges des armatures. Les accepter comme copies
   adaptées, ou les traiter comme types nouveaux ?
2. **Valeurs de la leçon** : E = 6 V, R = 50 Ω, r = 10 Ω, L = 0,30 H (τ = 5 ms, I₀ = 100 mA), lues en
   millisecondes comme à l'oscilloscope, quand RC se lisait en secondes. Alternative : une bobine à
   noyau (L ≈ 1 H) pour un τ plus long, au prix de valeurs non sourcées.
3. **Pas de construction manipulée** : `pas-pari` déclenche une animation au lieu des cinq clics de RC
   (la manipulation reste `curseurs`). D'accord ?
4. **La rupture par l'interrupteur à deux positions** (même montage que la décharge de RC, même τ), et
   la surtension par un R₂ ajouté sur la borne (2), plutôt que la diode de roue libre de l'ancienne
   leçon.
5. **SVT `1.3.2.13`** (« l'intérêt d'un montage RL ») : ajouter une étape `retour-interet` (« retarder
   l'établissement du courant ; produire une forte tension à la rupture ») ou laisser sans étape ni
   gabarit, comme RC ?
6. **Route** : `/pilote/dipole-rl` (fichiers `dipole-rl-*.js`), le nom du dossier `content/` ; pas de
   conflit avec RC, qui a pris `dipole-rc` au lieu de `rc-charge`.
7. **L'équation en u_R** (bible : sujet PC N 2026, non transcrit) : hors leçon et hors gabarits tant
   qu'un sujet transcrit ne la montre pas ?
8. **Partie 0** : `sav-test` porte sur RC (la suite directe) plutôt que sur le champ magnétique. Une
   erreur renvoie-t-elle vers `/pilote/dipole-rc`, ou seulement vers le rappel ?
