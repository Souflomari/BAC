# Spec v3 : dipôle RC (`pc/rc-charge`)

> Plan d'auteur pour la leçon pilote `/pilote/dipole-rc` (nom de route à confirmer, §8.3), qui ouvre
> le sous-domaine « Electricité ». Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ;
> fichiers et champs : [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèles de forme :
> `web/src/components/pilote/noyaux-moteur.js` (la plus récente) et `radioactivite-moteur.js` (la
> même mathématique : loi exponentielle, tangente à l'origine, 37 %, τ = 1/λ). Fiche : bible E1
> (`docs/bible/02-physique.md`). Leçon minée, non portée : `content/pc/rc-charge/` (`lesson.md`,
> `items.yaml`, `misconception-ledger.md`). L'auteur suit ce plan étape par étape ; il rédige les
> textes, il ne décide ni l'ordre, ni les paris, ni les leurres. Tout nombre cité ici est à
> **recalculer par le code** (`dipole-rc-outils.js`, §8.1) ; les valeurs écrites ci-dessous sont des
> contrôles faits à la main.
>
> **Scène d'un type nouveau demandée : une seule, `circuit`** (le schéma du montage, avec
> interrupteur à deux positions, flèches de tension et de courant, charges des armatures, lampe
> témoin ; §3.2). Toutes les autres sont des copies adaptées de scènes existantes (`loi` →
> `courbe`, `expo`, `quiz`, `end`).

---

## 0. La leçon livrée (état au 2026-11-24)

Ce plan a été écrit avant la leçon. La leçon livrée (`web/src/components/pilote/dipole-rc-moteur.js`) compte **56 étapes** : la relecture pédagogique et visuelle du 2026-11-24 en a fusionné, retiré ou déplacé plusieurs. **Le fichier de la leçon fait foi** ; les sections 1 à 8 ci-dessous restent le plan d'origine (raisons, sources, leurres), avec ses comptes d'étapes d'alors. L'ordre livré :

| # | Partie | Étapes (clés, dans l'ordre) |
|---|---|---|
| 0 | Ce qu’il faut savoir | `sav-test`, `sav-rappel` |
| 1 | L’énigme | `allumage`, `flash` |
| 2 | Le condensateur | `leyde`, `armatures`, `q-u`, `parallele` |
| 3 | La charge, pas à pas | `allure`, `i0`, `pas-pari`, `pas-reste`, `pas`, `permanent`, `courant-constant` |
| 4 | L’équation | `convention`, `dqdt`, `ed-maille`, `ed-i`, `ed-q` |
| 5 | La solution | `x-test`, `expo-rappel`, `verif`, `verif-ident`, `dim`, `i-t` |
| 6 | La constante de temps | `rappel`, `tangente`, `val-tau`, `lecture-63`, `reste`, `cinq-tau`, `double`, `influence-E`, `curseurs` |
| 7 | La décharge | `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37` |
| 8 | L’énergie | `energie-pari`, `energie-etablir`, `energie-calc` |
| 9 | Mesurer | `oscillo`, `oscillo-lire` |
| 10 | Retour à l’énigme | `retour-lampe` |
| 11 | Au bac | `bac`, `bac-ed`, `bac-R`, `bac-C`, `bac-2a`, `bac-2b`, `bac-2c` |
| 12 | Bilan | `q1`, `q2`, `q3`, `fin` |

## 1. Périmètre

### 1.1 Le nom et les capacités officielles

Le nom suit les documents : chapitre **« 1- Dipôle RC »** du « Sous domaine 3 : Electricité »
(cadres 2025, p. 7 ; annexe des contenus p. 21 du cadre PC : « 1.1. Le condensateur » puis « 1.2.
Dipôle RC - réponse d'un dipôle RC à un échelon de tension : * étude expérimentale. * étude
théorique. - énergie emmagasinée dans un condensateur. »). C'est bien le premier chapitre du
sous-domaine dans les trois cadres. **Écarts avec la description de la commande** : le chapitre
contient aussi, et la leçon les enseigne, les signes des charges et la convention récepteur, i = dq/dt,
la capacité et ses unités, sa détermination graphique et par calcul (charge à courant constant :
2018 N, 2025 N), les associations série et parallèle, la continuité de u_C et la discontinuité de i,
les régimes, l'influence de R, C et E, le montage et le branchement de l'oscilloscope. La
« décharge » n'a pas de tiret propre : elle est nommée dans `1.3.1.13` (« les opérations de la charge
et de la décharge »). Le poids du sous-domaine : 21 % (PC), 21 % (SM, `pc-sm.yaml` l. 66 et 171), 19 %
(SVT) ; RC présent dans 6 sujets PC sur 10 (`01-programme-bac-maroc.md` §3.3).

Les identifiants **PC et SM sont les mêmes** ; ceux de **SVT sont décalés** à partir du 15ᵉ tiret.
Libellés mot pour mot (`docs/referentiel/pc-pc.yaml` l. 177-194 ; `pc-sm.yaml` l. 178-195 ;
`pc-svt.yaml` l. 176-193). Variantes de graphie : SVT écrit « Connaître », « Établir » ; SM 1.3.1.6
porte une espace avant la virgule ; sans effet sur le sens.

| PC, SM | SVT | Libellé (cadre 2025, PC, mot pour mot) | Où |
|---|---|---|---|
| `1.3.1.1` | `1.3.1.1` | Représenter les tensions u_R et u_C en convention récepteur et préciser les signes des charges des deux armatures d'un condensateur. | parties 2, 4 |
| `1.3.1.2` | `1.3.1.2` | Connaître et exploiter la relation i = dq/dt pour un condensateur en convention récepteur. | parties 2, 4, 7 |
| `1.3.1.3` | `1.3.1.3` | Connaitre et exploiter la relation q = C.u. | parties 2, 4 |
| `1.3.1.4` | `1.3.1.4` | Connaître la capacité d'un condensateur, son unité F et ses sous multiples µF, nF et pF . | partie 2 |
| `1.3.1.5` | `1.3.1.5` | Déterminer la capacité d'un condensateur graphiquement et par calcul. | parties 2, 11 |
| `1.3.1.6` | `1.3.1.6` | Connaitre la capacité du condensateur équivalent des montages en série et en parallèle, et l'intérêt de chaque montage. | partie 2, bilan |
| `1.3.1.7` | `1.3.1.7` | Etablir l'équation différentielle et vérifier sa solution lorsque le dipôle RC est soumis à un échelon de tension. | parties 4, 5, 11 |
| `1.3.1.8` | `1.3.1.8` | Déterminer l'expression de la tension u_C(t) aux bornes du condensateur lorsque le dipôle RC est soumis à un échelon de tension, et en déduire l'expression de l'intensité du courant dans le circuit et l'expression de la charge du condensateur. | parties 5, 7, 11 |
| `1.3.1.9` | `1.3.1.9` | Reconnaître et représenter les courbes de variation en fonction du temps, de la tension u_C(t) aux bornes du condensateur et les différentes grandeurs qui lui sont liées, et les exploiter. | parties 3, 6, 7 |
| `1.3.1.10` | `1.3.1.10` | Connaitre que la tension aux bornes d'un condensateur est une fonction du temps continue, et que l'intensité est une fonction discontinue à t=0. | partie 3 |
| `1.3.1.11` | `1.3.1.11` | Connaître et exploiter l'expression de la constante de temps. | parties 5, 6, 11 |
| `1.3.1.12` | `1.3.1.12` | Utiliser les équations aux dimensions. | partie 5 |
| `1.3.1.13` | `1.3.1.13` | Exploiter des documents expérimentaux pour : * reconnaître les tensions observées. * mettre en évidence l'influence de R et de C sur les opérations de la charge et de la décharge. * déterminer la constante de temps et la durée de charge. * déterminer le type du régime (transitoire - permanent) et l'intervalle temporel de chacun des deux régimes. | parties 3, 6, 7, 9 |
| `1.3.1.14` | `1.3.1.14` | Proposer le schéma d'un montage expérimental permettant l'étude de la réponse d'un dipôle RC soumis à un échelon de tension. | parties 1, 3, 9 |
| — | `1.3.1.15` | (SVT seulement) Reconnaître l'intérêt d'un montage mettant en jeu un dipôle RC soumis à un échelon de tension. | partie 10 (`retour-interet`) |
| `1.3.1.15` | `1.3.1.16` | Connaître comment brancher un oscilloscope et un système d'acquisition informatisé pour visualiser les différentes tensions. | partie 9 |
| `1.3.1.16` | `1.3.1.17` | Déterminer l'influence de R, de C et de l'amplitude de l'échelon de tension sur la réponse d'un dipôle RC. | parties 6, 10 |
| `1.3.1.17` | — | (PC, SM seulement) Etablir l'expression de l'énergie électrique emmagasinée dans un condensateur. | partie 8 (`energie-etablir`) |
| `1.3.1.18` | `1.3.1.18` | Connaître et exploiter l'expression de l'énergie électrique emmagasinée dans un condensateur. | partie 8 |

Préfixes : `pc-pc`, `pc-sm`, `pc-svt`. Le dossier des exercices porte une table de correspondance
PC/SM → SVT (§7), comme `noyaux.js`.

Capacités réutilisées (prérequis, non testées seules) : loi d'additivité des tensions et loi d'Ohm
(collège, tronc commun) ; I = Q/Δt (tronc commun) ; dérivée de e^{u} (`maths-sexp 1.2.23` selon la
bible, et la leçon pilote `exponentielle`, étape `eu`) ; loi exponentielle décroissante, tangente à
l'origine, τ = 1/λ (leçon pilote `radioactivite`, étapes `tau`, `v-tau`).

### 1.2 Une seule séance

**Séance unique, « Le condensateur qui se remplit et se vide »** (59 étapes ; 58 en SVT, §1.4) : le
condensateur et ses conventions, la capacité (mesure à courant constant, associations), la charge pas
à pas, l'équation différentielle, sa solution, τ lu de trois façons, la décharge, l'énergie, la
mesure à l'oscilloscope, le retour à l'énigme, deux sujets du bac. Dix-huit tirets, c'est beaucoup
pour une séance : la question d'une coupe en deux séances (condensateur / dipôle RC) est posée au
relecteur (§8.3, question 4).

### 1.3 Hors programme, qu'on n'enseigne pas

La structure du champ électrique entre les armatures et la formule C = εS/d (aucun tiret) ; la
méthode d'Euler nommée comme telle (elle est au cadre en mécanique, M2 ; ici on construit des pas
sans la nommer) ; la résolution générale de y' = ay + b (on **vérifie** une solution, `1.3.1.7`) ; la
linéarisation ln u_R = ln E − t/τ (citée par la bible pour le sujet PC R 2026, non transcrit ; le
logarithme n'est pas enseigné ici, §8.3, question 8) ; le temps pour atteindre un seuil par
t = −τ ln(1 − u_s/E) (pas de tiret ; présent dans l'ancienne leçon, non repris) ; le bilan
« le générateur fournit CE², la moitié est perdue par effet Joule » (aucun tiret ; non repris) ;
l'absorption diélectrique de la bouteille de Leyde (fiche de mot au plus).

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 7, 9 à 12 | entières | entières | entières |
| `energie-etablir` (partie 8) | entière (`1.3.1.17`) | idem | **hors cadre** : l'étape s'ouvre par « Filières PC et SM. En SVT, la formule est à connaître, pas à établir. » et un bouton « Passer à la suite » (`data-aller="energie-calc"`, forme de `deux-voies` de `noyaux-moteur.js`, décision §9.2 de la spec noyaux) |
| `retour-interet` (partie 10) | enrichissement marqué (aucun tiret PC/SM) | idem | `pc-svt 1.3.1.15` |
| Exemple du bac | 2022 N et 2021 N (sujets PC) | idem | idem (mêmes tirets 1 à 14 ; aucun sujet SVT transcrit dans `docs/sujets/`) |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Un générateur de 12 V, un interrupteur K à deux positions, une petite
lampe et un condensateur vide, en série. Entre les deux armatures du condensateur, il y a un
isolant : le circuit est coupé. **L'élève parie** sur ce que fait la lampe quand on ferme K
(`allumage`) : elle ne s'allume pas (le circuit est coupé), elle s'allume et reste allumée, ou elle
s'allume puis s'éteint peu à peu. Elle s'allume, puis s'éteint. **Second pari** (`flash`) : on bascule
K pour retirer le générateur ; la lampe reste seule avec le condensateur. Rien (plus de générateur),
une lueur qui dure, ou une lueur qui s'éteint peu à peu ? Elle se rallume, puis s'éteint. **Deux
questions restent ouvertes : pourquoi un courant passe-t-il, un moment, dans un circuit coupé par un
isolant ? Et qu'est-ce qui règle la durée de la lueur ?**

La lampe est un **témoin qualitatif** : une lampe à filament n'est pas un conducteur ohmique (sa
résistance change avec la température), la leçon ne lui attribue aucun nombre. Dès la partie 3, on la
remplace par un conducteur ohmique R (« pour calculer, on remplace la lampe par une résistance R »).

**Le retour (partie 10).** Les deux questions tombent avec les outils de la leçon :
1. aucune charge ne traverse l'isolant : le courant apporte des charges sur l'armature A et en
   retire autant de l'armature B ; il vaut E/R au départ (u_C = 0), puis (E/R)e^{−t/RC} ; la lampe
   s'éteint quand u_C a rejoint E, après environ 5τ ;
2. la durée de la lueur est réglée par τ = RC : doubler C (ou R) la double ; doubler E ne la change
   pas (`retour-duree`) ;
3. la seconde lueur vient de l'énergie ½CE² emmagasinée pendant la charge et dissipée dans la lampe
   à la décharge ; c'est l'intérêt du montage : stocker, puis rendre (`retour-interet`).

Le fil rouge : **« ce qui reste à charger fond comme les noyaux qui restent »**. E − u_C = u_R suit
la loi E·e^{−t/τ}, la même que N₀e^{−λt}, avec 1/τ à la place de λ. Il apparaît dans les pas de la
partie 3 (l'écart à E est multiplié par 0,9 à chaque pas, comme les dés par 5/6), dans `reste`
(partie 6) et dans la décharge (partie 7), et c'est lui qui explique les deux repères 63 % et 37 %.

---

## 3. La chaîne des idées

1. Additivité des tensions, loi d'Ohm, I = Q/Δt → 2. l'énigme : une lampe s'allume puis s'éteint
dans un circuit coupé par un isolant, et se rallume sans générateur → 3. un condensateur, ce sont
deux conducteurs séparés par un isolant ; chargé, ses armatures portent q et −q (Leyde) → 4. on
oriente : i entre par l'armature A, q = q_A, u_C fléchée vers A (convention récepteur) ; alors
i = dq/dt, avec son signe → 5. u_C est proportionnelle à q : q = C·u_C ; C se mesure par une pente
(q = f(u), ou u_C = I₀t/C avec une source de courant) ; parallèle : les capacités s'ajoutent → 6. avec
un générateur de tension et une résistance, le courant vaut (E − u_C)/R : plus le condensateur est
chargé, moins il passe de courant, la montée ralentit (pas à pas) ; u_C est continue, i saute à E/R
→ 7. la même intensité traverse R et C (Nollet) ; l'additivité donne RC·du_C/dt + u_C = E → 8. on
vérifie E(1 − e^{−t/τ}) : elle impose τ = RC, une durée (équation aux dimensions) ; on en déduit i et q
→ 9. τ se lit trois fois : tangente à l'origine, 63 % atteints, 37 % restants ; 5τ pour le régime
permanent ; seul le produit RC compte, E fixe l'asymptote → 10. la décharge : même τ, la loi des
noyaux, i négatif → 11. l'énergie emmagasinée ½Cu_C², et où elle va → 12. la mesure : l'oscilloscope
ne voit que des tensions → 13. retour à l'énigme → 14. le bac.

**Figure-clé : la courbe u_C(t)** (scène `courbe`, copie adaptée de `loi` ; 15 étapes, un changement
chacune). Valeurs de la leçon : E = 12 V, R = 10 kΩ, C = 220 µF, τ = 2,2 s (choix motivé au §8.3,
question 3). Aucun texte ne nomme une couleur : les tracés se désignent par leur nom (« la courbe
u_R », « la tangente »), les classes `k-ink` / `k-a` ne sont jamais dites à l'écran.

| # | Étape | Le changement |
|---|---|---|
| 1 | `allure` (partie 3) | axes t, u_C ; la droite u = E en pointillés ; la courbe se trace au `reveal` |
| 2 | `pas-pari` | le premier pas (0 → 1,2 V en 0,22 s) ; le second (1,08 V) apparaît au `reveal` |
| 3 | `pas` | les pas suivants, un par clic de l'élève ; puis la courbe exacte par-dessus |
| 4 | `permanent` | la bande « régime transitoire », l'étiquette « régime permanent » sur l'asymptote |
| 5 | `rappel` (partie 6) | la courbe seule (la pause) |
| 6 | `tangente` | la tangente à l'origine, qui coupe u = E en τ ; le point (τ ; 7,6 V) au `reveal` |
| 7 | `lecture-63` | la droite u = 7,6 V et la verticale qui descend en τ = 2,2 s |
| 8 | `reste` | la courbe u_R = E − u_C (trait d'accent), sa tangente qui coupe l'axe des temps en τ, le point 37 % |
| 9 | `cinq-tau` | les repères τ … 5τ et leurs pourcentages (63 ; 86 ; 95 ; 98 ; 99,3 %) |
| 10 | `double` | la courbe fantôme R × 2, C / 2 : elle se superpose au `reveal` |
| 11 | `curseurs` | trois curseurs R, C, E ; la courbe se redessine, τ affiché |
| 12 | `influence-E` | E = 24 V : même τ, asymptote doublée |
| 13 | `sol-decharge` (partie 7) | la décharge, de E vers 0 ; sa tangente coupe l'axe en τ ; 37 % |
| 14 | `v-37` | la droite u = 4,4 V |
| 15 | `bac` (partie 11) | les courbes (C₁) et (C₂) du sujet 2022, la tangente (T) qui coupe le palier à 50 ms |

**Ses trois paris** : `allure` (l'allure de la montée), `pas-pari` (le second pas plus petit),
`tangente` (où est la courbe à t = τ). `double` est un quatrième pari posé sur la même figure.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 3 |
| 2 | Le condensateur | Condensateur | 8 |
| 3 | La charge, pas à pas | Charge | 6 |
| 4 | L'équation | Équation | 4 |
| 5 | La solution | Solution | 5 |
| 6 | La constante de temps | τ | 8 |
| 7 | La décharge | Décharge | 4 |
| 8 | L'énergie | Énergie | 3 |
| 9 | Mesurer | Mesurer | 2 |
| 10 | Retour à l'énigme | Retour | 3 |
| 11 | Au bac | Au bac | 7 |
| 12 | Bilan | Bilan | 4 |

**59 étapes.** Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`, avec `need`). Dans les options : ✓ juste ; ✗ fausse, suivie de la
conception affrontée (étiquette du §5) puis de l'idée du retour (B2).

### 3.2 Conventions et signes (tenues partout)

Relevé des sujets transcrits (`docs/sujets/pc/rc-charge.md`) :
- **2021 N, Ex. IV, figure 1** : boucle série ; « une flèche de tension orientée vers le haut,
  étiquetée E » à gauche du générateur ; « flèche de courant i en haut à gauche, orientée vers la
  droite » ; « une flèche u_C orientée vers le haut » à droite du condensateur. Le courant descend dans
  le condensateur et u_C monte : **convention récepteur** (flèche de tension opposée au courant).
- **2025 N, Ex. 3, figure 1** : « u_C fléchée vers le haut à droite du condensateur, i fléchée vers le
  bas sous le condensateur » : même convention.
- **2022 N, Ex. 3, figure 1** et **2018 N, Ex. III, figure 3** : u_C et i fléchées, sens non décrits
  dans la transcription (à relire sur le scan si l'étape les montre, §8.2).
- Les sujets écrivent l'équation de la charge sous deux formes : du_C/dt + u_C/(RC) = E/(RC) (2022 N,
  1.1) et du_C/dt = −u_C/(RC) + E/(RC) (2021 N, Q1) ; en q : q(t) = A(1 − e^{−αt}) (2019 N, Q2) ; la
  décharge : u_{C₂}(t) = E·e^{−t/τ} (2018 N, I-2, Q2).

**La convention de la leçon, partout** (scène `circuit`, textes, exercices) :
- l'armature du haut s'appelle **A**, celle du bas **B** ; i est orienté de façon à **entrer par A**
  (le sens de la charge) ; **q = q_A**, la charge de l'armature où entre i ; q_B = −q ;
- **u_C = u_AB**, flèche vers A (convention récepteur) ; **u_R = R·i**, flèche opposée à i ;
- **i = dq/dt** et **q = C·u_C**, donc i = C·du_C/dt ;
- charge (K en position 1) : **u_R + u_C = E** ; décharge (K en position 2, **mêmes flèches**) :
  **u_R + u_C = 0**, d'où i < 0.

Les erreurs de signe classiques, chacune leurre d'une question : i = −dq/dt (q de l'autre armature,
ou convention générateur) → `ed-maille`, `dqdt` ; u_C fléchée dans le sens de i → `convention` ;
u_R − u_C = E ou signe perdu dans la forme normalisée → `ed-forme`, `bac-2a` ; décharge écrite
u_R = u_C → `ed-decharge` ; i positif à la décharge → `i-decharge` ; décharge avec E au second
membre → `ed-decharge`, `sol-decharge`.

### 3.3 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `circuit` | **nouvelle, type nouveau** | voir ci-dessous |
| `courbe` | copie adaptée de `loi` (`radioactivite-scenes-b.js`) ; curseurs sur le modèle de `aston` (`noyaux-scenes-b.js`) | la figure-clé, et les droites des sujets (q = f(u), u_C = I₀t/C, du_C/dt = f(u_C)), la parabole de l'énergie |
| `expo` | copie de `expo` (`radioactivite-scenes-b.js`) | e^{−x}, de 1 vers 0 ; e^{−1} ≈ 0,37 |
| `quiz`, `end` | copies de `noyaux-scenes-c.js` | les pièges des copies ; le bilan (cinq lignes) |

Les outils de `radioactivite-outils.js` (`outilsScene`, `fr`, `sciF`, `TN`, `TS`) s'importent tels
quels ; les scènes se **copient** dans `dipole-rc-scenes-a.js` / `-b.js` / `-c.js`.

**Scène nouvelle `circuit`** (le schéma du montage ; décision du propriétaire, 07 §3.3).
- *Pourquoi un type nouveau* : aucune scène existante ne dessine un circuit. `schema` (méiose) pose
  des légendes sur un dessin fixe ; il faut ici un interrupteur qui bascule, des flèches de tension et
  de courant qui portent la convention, des charges qui s'accumulent sur les armatures et une lampe
  dont l'éclat suit i. C'est la forme exacte des sujets (« le montage schématisé sur la figure 1 »,
  dans les cinq sujets transcrits) et la porte de cinq tirets (`1.3.1.1`, `.2`, `.14`, `.15`, et la
  lecture des signes pour `.7`).
- Montre : jusqu'à six dipôles sur une boucle rectangulaire (générateur de tension, cercle et flèche
  E ; générateur de courant, cercle barré d'un trait, flèche I₀ à l'extérieur, comme 2018 et 2025 ;
  interrupteur K à deux positions (1) et (2) ; conducteur ohmique, rectangle ; condensateur, deux
  traits, armatures A et B nommées ; lampe) ; les flèches i (trait `k-ink`), u_R, u_C, E ; les
  charges + et − sur les armatures, en nombre proportionnel à q ; deux branchements d'oscilloscope
  (voie Y₁, masse).
- Paramètres : `jeu` (`'lampe'`, `'leyde'`, `'cond'`, `'rc'`, `'source'`, `'para'`, `'chaine'`,
  `'oscillo'`) ; `K` (0 ouvert, 1, 2 ; l'animation fait pivoter le levier) ; `t` (0 → 1 : le temps
  réduit t/5τ, d'où l'éclat de la lampe, proportionnel à i², et le nombre de charges) ; `fl` (flèches,
  0 ou 1) ; `fa` (une flèche mise en évidence, classe `k-a` : `'i'`, `'uC'`, `'uR'`) ; `ch` (charges) ;
  `osc` (branchements) ; `rv` (le `reveal` d'un pari : la chaîne de Nollet s'éclaire, la décharge de
  Leyde).
- `'leyde'` : un schéma, pas un dessin d'époque : un vase (trait), l'eau (remplissage `s-dim`), un fil
  vers un canon suspendu, une main ; au `reveal`, les deux conducteurs (eau, main) et l'isolant (verre)
  se nomment. `'chaine'` : une boucle d'environ 40 points (les moines, représentés, pas comptés) et une
  bouteille ; au `reveal`, tous s'éclairent ensemble.
- Lisible à 390 px : au plus quatre étiquettes à la fois ; les valeurs (12 V, 10 kΩ, 220 µF) dans le
  sous-titre, pas sur le dessin.
- L'élève ne manipule rien dans `circuit` : la scène sert aux paris et aux conventions.

**Scène copiée et adaptée `courbe`** (type « courbe avec lecture graphique »).
- Jeux : `'charge'` (u_C, et u_R ou i en second tracé), `'decharge'`, `'qu'` (q = f(u_AB), sujet
  2018 : droite de l'origine à (6 V ; 60 µC)), `'courant'` (u_C = f(t), sujet 2025 : droite par
  (2 ; 2), (4 ; 4), jusqu'à (10 s ; 10 V)), `'dudt'` (sujet 2021 : (0 ; 1000), (6 ; 500), (12 ; 0)),
  `'energie'` (E_e en fonction de u_C, parabole), `'bac22'` (les deux repères côte à côte du sujet
  2022, graduations 0 à 200 ms, 0 à 12).
- Paramètres : `curve`, `Eline`, `pas` (nombre de pas affichés, 0 à 10), `exact`, `trans`, `tan`,
  `p63`, `lect` (droite de lecture et sa valeur), `uR`, `p37`, `taus`, `ghost`, `R`, `C`, `E` (les
  curseurs), `osc` (quadrillage en divisions, pour `oscillo-lire`), `pts` (deux points d'une énergie).
- L'élève manipule : le bouton « Pas suivant » (`ctl:'pas'`, étape `pas`) et les trois curseurs
  (`ctl:'rc'`, étape `curseurs`), verrouillés tant que le pari qui précède n'est pas posé, comme le
  curseur `nuc` de `aston`.

---

### Partie 0 : Ce qu'il faut savoir (scène `circuit`, jeu `rc`, sans condensateur chargé)

- **`sav-test`** · `ctl:'saut'` (forme de `sav-test` des pilotes : juste du premier coup, bouton vers
  `allumage`) · **V** « Dans une boucle série, E = 12 V et u_C = 4 V. u_R = ? » ✓ 8 V. ✗ 16 V : les
  tensions ajoutées au lieu de partagées → dans une maille, u_R + u_C = E. ✗ 3 V : E divisé par u_C →
  l'additivité est une somme, pas un quotient. ✗ 4 V : « la tension se partage moitié-moitié » → elle
  se partage selon les dipôles, la somme vaut E.
- **`sav-rappel`** · deux rappels : l'intensité est un débit de charge (I = Q/Δt : 2 mA pendant 5 s
  apportent 10 mC) ; la loi d'Ohm u_R = R·i, la flèche de u_R opposée à celle de i. Pas d'action.

### Partie 1 : L'énigme (scène `circuit`, jeu `lampe`)

- **`allumage`** · `K:0` · texte : un générateur 12 V, K, une lampe, un condensateur vide, en série ;
  entre les armatures, un isolant. **P** « Tu bascules K en position 1. La lampe… » options : « reste
  éteinte : l'isolant coupe le circuit » / « s'allume et reste allumée » / « s'allume, puis s'éteint
  peu à peu ». `reveal` : `K:1`, `t:0→1` en 3 s (l'éclat suit i²). Conceptions : « isolant, donc
  aucun courant, jamais » (+1) et B-8 (« le condensateur laisse passer le courant en permanent »).
  Retours sans jugement (forme de `tiroir`) ; celui de la 1ʳᵉ option : « Juste pour la fin : quand la
  lampe s'est éteinte, plus rien ne passe. Mais au début, elle s'allume. »
- **`flash`** · `K:1, t:1` (lampe éteinte) · texte : le condensateur est resté chargé. On bascule K
  en position 2 : le générateur sort du circuit, la lampe reste seule avec le condensateur. **P**
  options : « rien : sans générateur, pas de courant » / « la lampe se rallume, puis s'éteint peu à
  peu » / « la lampe se rallume et reste allumée ». `reveal` : `K:2`, `t:0→1`. Conception : « un
  condensateur ne garde rien ; sans générateur, aucun courant » (+2) ; la 3ᵉ option, « le condensateur
  est un générateur qui ne s'épuise pas » (+2, variante).
- **`question`** · `fort` : « Un courant a passé, un moment, dans un circuit coupé par un isolant.
  Pourquoi ? Et qu'est-ce qui règle la durée de la lueur ? » Pas d'action.

### Partie 2 : Le condensateur (scènes `circuit`, `courbe`)

- **`leyde`** · tag `1746 · Leyde` · jeu `leyde`, `rv:0` · texte : un canon de fer suspendu à des fils
  de soie est électrisé par une sphère de verre qu'on frotte ; on en tire de petites étincelles en
  approchant le doigt. Musschenbroek tient dans sa main droite un vase de verre à demi plein d'eau, où
  plonge un fil relié au canon ; de l'autre main, il approche le canon. **P** options : « la même
  petite étincelle : le verre isole l'eau de sa main » / « rien du tout : l'eau absorbe
  l'électricité » / « un choc bien plus fort ». `reveal` : `rv:1` et la citation [V] « Tout à coup ma
  main droite fut frappée avec tant de violence, que j'eus tout le corps ébranlé comme d'un coup de
  foudre » (lettre à Réaumur). Idée : l'eau et la main, séparées par le verre, ont accumulé des charges
  opposées ; en touchant le canon, il les a reliées à travers son corps. Conception +1 (« un isolant
  entre deux conducteurs empêche tout »). La 1ʳᵉ option est défendable : le retour le dit (le verre
  isole, c'est justement pour cela que les charges s'y accumulent de part et d'autre).
- **`armatures`** · jeu `cond`, `ch:1` · un [[condensateur]] : deux conducteurs, les
  [[armature|armatures]], séparés par un isolant ; son symbole. **Q** « Pendant la charge, l'armature
  A porte q = 3,0 µC. L'armature B porte… » ✓ −3,0 µC. ✗ 0 : seule l'armature reliée au générateur se
  charge (+3) → le courant retire de B ce qu'il apporte à A. ✗ +3,0 µC : les deux armatures se
  chargent pareil → alors le condensateur serait chargé au total, et rien ne traverse l'isolant.
  `apres` : « La [[charge|charge du condensateur]] q désigne celle de A. »
- **`convention`** · `fl:1, fa:'uC'` · i entre par A (vers le bas dans le condensateur). **Q** « En
  [[conventionrecepteur|convention récepteur]], la flèche de u_C… » ✓ pointe vers A, à l'opposé de i.
  ✗ suit le sens de i : c'est la convention générateur (S-1) → pour un récepteur, la flèche de tension
  s'oppose au courant. ✗ se met dans n'importe quel sens, seul le signe compte (S-1) → le sens de la
  flèche fixe le signe de u_C : il est imposé par la convention. `apres` : « Comme dans les sujets 2021
  et 2025 : i vers le bas dans le condensateur, u_C vers le haut. »
- **`dqdt`** · i = dq/dt, avec q = q_A (tex) · **V** « Pendant 2,0 s, q passe régulièrement de 6,0 µC
  à 2,0 µC. i = ? » ✓ −2,0 µA. ✗ +2,0 µA : le signe perdu (S-1) → q diminue, dq/dt < 0 : i circule
  à l'inverse de sa flèche. ✗ −0,50 µA : Δt/Δq au lieu de Δq/Δt → un débit est une charge par
  seconde.
- **`q-u`** · scène `courbe`, jeu `qu` · sujet 2018 N, Ex. III, 1.2 (0,75 pt) : la charge q en fonction
  de u_AB est une droite passant par l'origine et par (6 V ; 60 µC). tex q = C·u_C ; la
  [[capacite|capacité]] C. **Q** « C = ? » ✓ 10 µF. ✗ 0,10 µF : u/q au lieu de q/u (I-10) → C est la
  pente de q = f(u). ✗ 360 µF : q × u (I-10) → q = C·u, donc C = q/u.
- **`farad`** · l'unité, le [[farad]] F, et ses sous-multiples µF, nF, pF (tex). **V** « 220 µF = ? »
  ✓ 2,2 × 10⁻⁴ F. ✗ 2,2 × 10⁻⁷ F : c'est 220 nF (I-11) → µ = 10⁻⁶. ✗ 0,22 F : c'est 220 mF (I-11).
- **`courant-constant`** · scène `courbe`, jeu `courant`, scène `circuit` jeu `source` en vignette non
  requise · sujet 2025 N, Ex. 3, 1-1 et 1-2 (0,5 + 0,5 pt) : un générateur de courant débite
  I₀ = 1 µA ; u_C(t) est une droite de pente 1 V·s⁻¹. **D** puis Q · lignes : q = I₀·t (r : i constant,
  condensateur vide à t = 0) ; u_C = q/C₀ = (I₀/C₀)·t (r : q = C·u). Pari « C₀ = ? » ✓ I₀/pente =
  1 × 10⁻⁶ F. ✗ pente/I₀ = 10⁶ F : rapport inversé (I-10) → l'unité tranche : A/(V·s⁻¹) = F. ✗ 1 F :
  µA non converti (I-11). **Leurre interdit** : « I₀ × pente », qui donne aussi 1 × 10⁻⁶ avec les
  valeurs du sujet (pente = 1). `apres` : `fort` « Une droite : seulement parce que la source impose le
  courant. » (prépare B-3).
- **`parallele`** · jeu `para` · sujet 2018 N, Ex. III, 1.1 et 1.3 (0,5 + 0,5 pt) : C₁ = 7,5 µF et C₂
  en parallèle ; la capacité équivalente lue vaut 10 µF. **Q** « C₂ = ? » ✓ 2,5 µF. ✗ 17,5 µF : C₁
  ajoutée au lieu de retranchée → en parallèle, C_éq = C₁ + C₂. ✗ 4,3 µF : la formule du montage en
  série appliquée (C₁C_éq/(C₁ + C_éq)) (+3) → elle vaut pour la série. `apres` : tex C_éq = C₁ + C₂
  (parallèle) ; 1/C_éq = 1/C₁ + 1/C₂ (série) ; l'intérêt : en parallèle, une capacité plus grande ;
  en série, une capacité plus petite (seule affirmation vérifiée, §8.2, point 8).

### Partie 3 : La charge, pas à pas (scènes `courbe`, `circuit`)

- **`allure`** · pari de la figure 1/3 · scène `courbe`, jeu `charge`, `curve:0, Eline:1` · texte : on
  remplace la lampe par un conducteur ohmique ; E = 12 V, R = 10 kΩ, C = 220 µF ; on ferme K à t = 0.
  **P** « Prédis u_C(t). » options : « elle saute à E aussitôt » / « elle monte en ligne droite
  jusqu'à E, puis s'arrête » / « elle monte vite, puis de plus en plus lentement vers E ». `reveal` :
  `curve:1` (2 s). Conceptions B-1 (saut) et B-3 (débit constant) ; le retour de la 2ᵉ option renvoie à
  `courant-constant` : « Ce serait vrai avec une source de courant. Ici, c'est la tension qui est
  imposée. »
- **`i0`** · scène `circuit`, jeu `rc`, `K:1, t:0, fl:1, fa:'i'` · **Q** « À t = 0⁺, u_C = 0. Le
  courant vaut… » ✓ E/R = 1,2 mA : toute la tension est sur R. ✗ 0, comme u_C (B-2) → u_C = 0 laisse
  toute la tension E à R. ✗ 0,6 mA : la tension partagée moitié-moitié → u_R = E − u_C = E.
- **`pas-pari`** · pari de la figure 2/3 · scène `courbe`, `curve:0, pas:1` · texte : pendant 0,22 s,
  ce courant de 1,2 mA apporte 0,264 mC à A : u_C monte de 1,2 V. **P** « Au pas suivant, encore
  0,22 s, u_C monte de… » options : « 1,2 V encore : même durée, même montée » / « moins de 1,2 V » /
  « plus de 1,2 V : le condensateur s'est mis en route ». `reveal` : `pas:2` ; i = (12 − 1,2)/10 kΩ =
  1,08 mA, d'où 1,08 V. Conception B-3. Le retour de la 1ʳᵉ : « Le courant n'est plus 1,2 mA : u_C
  a pris 1,2 V à R. »
- **`pas`** · **M** `ctl:'pas'` · `need` : 10 pas (ou « Montre-moi » après 20 s) · chaque pas affiche
  « ce qui reste à charger : × 0,9 ». Après le 10ᵉ, `exact:1`. Texte, `fort` : « À chaque pas, ce qui
  reste à charger est multiplié par 0,9 : comme tes dés, multipliés par 5/6 à chaque tic. » Une phrase :
  les pas montent un peu trop vite ; plus ils sont courts, plus ils collent à la courbe.
- **`continuite`** · scène `circuit`, `t:0` · **Q** (`1.3.1.10`) « À la fermeture, lequel peut
  sauter d'un coup ? » ✓ i : de 0 à E/R. ✗ u_C (B-1) → u_C = q/C, et q ne peut pas sauter avec un
  courant fini. ✗ les deux (B-1) → seul i saute. `apres` : u_C est continue ; i est discontinu à t = 0.
- **`permanent`** · scène `courbe`, `exact:1, trans:1` · **Q** « Longtemps après, u_C = E. Le
  courant… » ✓ est nul : u_R = E − u_C = 0. ✗ vaut E/R : le condensateur chargé laisse passer le
  courant (B-8) → u_R = 0, donc i = 0. ✗ devient négatif : u_C dépasse E et le condensateur renvoie du
  courant (B-7) → la montée ralentit à mesure qu'elle approche E et ne le franchit pas. `apres` : le
  [[regime|régime transitoire]], puis le régime permanent.

### Partie 4 : L'équation (scène `circuit`)

- **`nollet`** · tag `1746` · jeu `chaine`, `rv:0` · texte : l'abbé Nollet place environ deux cents
  moines en un cercle d'environ 1,6 km, reliés par des fils de fer, et décharge une bouteille de Leyde
  à travers eux. **P** « Qui sent le choc ? » options : « les premiers seulement : le courant s'use en
  chemin » / « tous, l'un après l'autre, comme une vague qui fait le tour » / « tous, presque au même
  instant ». `reveal` : `rv:1`, tous s'éclairent ensemble [V, §8.1]. `apres`, `fort` : « Dans une
  boucle en série, le courant a la même intensité partout, au même instant. Le même i traverse R et
  C. » Conception +4 (« le courant s'use »).
- **`ed-maille`** · jeu `rc`, `K:1, fl:1` · **D** puis Q · lignes : u_R + u_C = E (r : la loi
  d'additivité des tensions, K en position 1) ; u_R = R·i (r : la loi d'Ohm, convention récepteur).
  Pari « i, en fonction de u_C ? » ✓ i = dq/dt = C·du_C/dt (q = C·u_C, C constant). ✗ i = C·u_C :
  c'est q, pas i (I-9) → i est un débit : la dérivée de q. ✗ i = −C·du_C/dt (S-1) → q est la charge de
  A, où entre i : i = +dq/dt. `apres` : tex RC·du_C/dt + u_C = E.
- **`ed-forme`** · **Q** « Le sujet 2022 (Ex. 3, 1.1, 0,25 pt) demande la forme normalisée. De
  RC·du_C/dt + u_C = E, on tire… » ✓ du_C/dt + u_C/(RC) = E/(RC). ✗ du_C/dt + RC·u_C = RC·E : on a
  multiplié par RC au lieu de diviser (I-9) → l'homogénéité tranche : RC·u_C n'est pas en V·s⁻¹.
  ✗ du_C/dt − u_C/(RC) = E/(RC) : un signe perdu (S-2, I-9) → avec ce signe, la solution grandirait
  sans limite. `apres` : la forme du sujet 2021, du_C/dt = −u_C/(RC) + E/(RC), est la même.
- **`ed-q`** · **V** « Le sujet 2019 (Ex. III, Q1, 0,5 pt) demande l'équation vérifiée par q(t). »
  ✓ R·dq/dt + q/C = E. ✗ R·dq/dt + C·q = E : q = C·u donne u = q/C, pas C·q (I-9). ✗ R·q + (1/C)·dq/dt
  = E : les rôles échangés → u_R = R·i = R·dq/dt, u_C = q/C.

### Partie 5 : La solution (scènes `expo`, `courbe`)

- **`x-test`** · **V** (juste du premier coup : bouton « Je sais dériver e^{u} : passer le rappel »
  vers `verif`, forme de `x-test` de la radioactivité) « La dérivée de t ↦ E(1 − e^{−t/τ}) ? »
  ✓ (E/τ)e^{−t/τ}. ✗ −(E/τ)e^{−t/τ} : deux signes moins, un seul compté → (e^{u})′ = u′e^{u} avec
  u′ = −1/τ, et le « − » devant e^{u} donne +. ✗ E·e^{−t/τ} : le facteur 1/τ oublié → u′ = −1/τ.
- **`expo-rappel`** · scène `expo` · texte : la leçon [[exponentielle]] : (e^{u})′ = u′e^{u} ; avec
  u = −t/τ, e^{−t/τ} décroît de 1 vers 0 sans l'atteindre ; e^{−1} ≈ 0,37 ; e^{−5} ≈ 0,007. Pas
  d'action.
- **`verif`** · scène `courbe`, `exact:1` · **D** puis Q · forme du sujet 2019, Q2 (0,5 pt) et 2022,
  1.2 · lignes : on essaie u_C = A(1 − e^{−t/τ}) (r : elle part de 0, monte vers A) ;
  du_C/dt = (A/τ)e^{−t/τ} (r : la dérivée) ; RC·(A/τ)e^{−t/τ} + A − A·e^{−t/τ} = E (r : on remplace
  dans l'équation) ; A·(RC/τ − 1)·e^{−t/τ} + A = E (r : on regroupe). Pari « Pour que ce soit vrai à
  tout instant ? » ✓ A = E et τ = RC. ✗ A = E, τ quelconque (I-9) → le terme en e^{−t/τ} change avec
  t : il doit s'annuler, donc RC/τ = 1. ✗ A = E/R et τ = R/C (B-5) → c'est la substitution qui donne
  τ = RC. `apres` : tex u_C(t) = E(1 − e^{−t/RC}) ; la [[tau|constante de temps]] τ = RC. Contrôle :
  u_C(0) = 0.
- **`dim`** · **D** puis Q (`1.3.1.12`) · lignes : [R] = [U]/[I] (r : u = R·i) ; [C] = [Q]/[U] =
  [I]·[T]/[U] (r : q = C·u, et i = dq/dt donne [Q] = [I]·[T]). Pari « [RC] = ? » ✓ [T] : τ est en
  secondes. ✗ sans dimension : R et C se compensent (B-5) → [U]/[I] × [I]·[T]/[U] laisse [T].
  ✗ [T]⁻¹ : c'est l'unité de 1/τ, le α du sujet 2019 → le produit des deux lignes. `apres` : « Comme
  1/λ pour les noyaux, τ est une durée. » ([[dimensions|équation aux dimensions]].)
- **`i-t`** · **D** puis Q (`1.3.1.8`) · lignes : i = C·du_C/dt (r : `ed-maille`) ;
  du_C/dt = (E/τ)e^{−t/τ} (r : `x-test`). Pari « i(t) = ? » ✓ (E/R)e^{−t/RC} (C·E/(RC) = E/R). ✗
  (E/(RC))e^{−t/RC} : C oublié, c'est du_C/dt, en V·s⁻¹ → multiplie par C. ✗ (E/R)(1 − e^{−t/RC}) : le
  courant monte comme u_C (B-2) → i part de E/R et décroît. `apres` : tex q(t) = C·u_C = CE(1 − e^{−t/RC})
  et u_R = R·i = E·e^{−t/RC}.

### Partie 6 : La constante de temps (scène `courbe`)

- **`rappel`** · `exact:1, tan:0` · `sujet:'u_C et i à t = 0'` · texte : mi-parcours, c'est le bon
  moment pour une pause ; un rappel avant de repartir. **V** « u_C(t) = E(1 − e^{−t/RC}) et
  i(t) = (E/R)e^{−t/RC}. À t = 0⁺… » ✓ u_C = 0 et i = E/R. ✗ u_C = 0 et i = 0 (B-2) → e^{0} = 1 :
  i(0) = E/R. ✗ u_C = E et i = 0 (B-1) → 1 − e^{0} = 0.
- **`tangente`** · pari de la figure 3/3 · **D** puis P · lignes : du_C/dt(0) = E/τ (r : la pente à
  l'origine) ; la [[tangente]] : y = (E/τ)·t (r : elle part de 0) ; y = E ⇔ t = τ (r : elle coupe
  l'asymptote en τ ; `tan:1`). **P** « À t = τ, la courbe est à… » options : « E : la charge est
  finie » / « environ 63 % de E » / « la moitié de E ». `reveal` : `p63:1`, le point (2,2 s ; 7,6 V) ;
  1 − e^{−1} ≈ 0,63. Conception B-4.
- **`lecture-63`** · `lect:7.6` · **V** (`fixe:true`) « Ici E = 12 V : la courbe passe à 7,6 V. Lis
  τ. » ✓ 2,2 s. ✗ 1,5 s : lu à 6 V, la moitié de E (+5) → c'est τ·ln 2, la « demi-vie » de la charge.
  ✗ 1,0 s : lu à 4,4 V, 37 % de E (+6) → 37 % est le repère d'une courbe qui descend.
- **`reste`** · `uR:1` · **Q** « Ce qui reste à charger, E − u_C, c'est u_R = E·e^{−t/τ}. Elle suit la
  loi… » ✓ des noyaux N₀e^{−λt}, avec 1/τ à la place de λ. ✗ de u_C : elle monte vers E (I-12) → elle
  part de E et descend. ✗ d'une droite qui atteint 0 en τ (B-4) → elle ne touche jamais 0. `reveal` :
  `p37:1` ; `apres` : « Comme pour les noyaux : sa tangente à l'origine coupe l'axe des temps en τ, et à
  τ il reste 37 %. Sur i(t), la même lecture : i(τ) ≈ 0,44 mA. » Les trois lectures sont posées.
- **`cinq-tau`** · `taus:1` · **Q** « Au bout de combien de temps la charge est-elle pratiquement
  finie (plus de 99 %) ? » ✓ environ 5τ = 11 s. ✗ τ = 2,2 s (B-4) → à τ, 63 % seulement. ✗ 2τ = 4,4 s
  → 86 % seulement. `apres` : le régime transitoire dure environ 5τ (`1.3.1.13`).
- **`double`** · `ghost:0` · **P** « On double R et on divise C par deux. La courbe… » options :
  « monte plus vite : un C plus petit se remplit plus vite » / « ne change pas » / « monte plus
  lentement : un R plus grand freine ». `reveal` : `ghost:1`, superposée. Conception +7 (« R seul, ou C
  seul, règle la vitesse »).
- **`curseurs`** · **M** `ctl:'rc'` · `need` : chaque curseur bougé au moins une fois · R de 1 à
  20 kΩ, C de 47 à 470 µF, E de 6 à 24 V (valeurs à crans, τ affiché). Texte, `fort` : « Seul le
  produit RC règle la vitesse. E règle la hauteur. »
- **`influence-E`** · `E:24` · **V** (`1.3.1.16`) « On charge sous 24 V au lieu de 12 V. τ… » ✓ ne
  change pas : seule l'asymptote double. ✗ double (+8) → τ = RC ne contient pas E. ✗ est divisé par
  deux : avec plus de tension, la charge va plus vite (+8) → elle monte plus haut dans le même temps.

### Partie 7 : La décharge (scènes `circuit`, `courbe`)

- **`ed-decharge`** · scène `circuit`, `K:2, fl:1` · texte : le condensateur est chargé, u_C = E. À
  t = 0, on bascule K en position 2 : le générateur sort de la maille ; on garde les mêmes flèches.
  **D** puis Q · lignes : u_R + u_C = 0 (r : plus de générateur dans la maille) ; u_R = R·i et
  i = C·du_C/dt (r : les mêmes relations). Pari « L'équation ? » ✓ RC·du_C/dt + u_C = 0. ✗ RC·du_C/dt
  − u_C = 0 : u_R = u_C, signe perdu (S-3) → avec ce signe, u_C grandirait sans fin. ✗ RC·du_C/dt +
  u_C = E (I-12) → E a quitté la maille.
- **`sol-decharge`** · scène `courbe`, jeu `decharge` · **Q** « u_C(0) = E. La solution ? » ✓
  E·e^{−t/RC}. ✗ E(1 − e^{−t/RC}) (I-12) → elle vaut 0 à t = 0, pas E. ✗ E·e^{+t/RC} (S-3) → elle
  grandit sans fin. `reveal` : `curve:1, tan:1, p37:1`. `apres` : « C'est N₀e^{−λt}, avec E pour N₀ et
  1/τ pour λ. Même τ qu'à la charge. »
- **`i-decharge`** · scène `circuit`, `K:2, fa:'i'` · **Q** « Pendant la décharge, i(t) = ? »
  ✓ −(E/R)e^{−t/RC} : négatif, le courant circule à l'inverse de sa flèche. ✗ +(E/R)e^{−t/RC} (S-4,
  I-12) → i = C·du_C/dt et u_C décroît : i < 0. ✗ nul à t = 0⁺, comme u_C est continue (B-2) → c'est
  u_C qui est continue ; i saute de 0 à −E/R.
- **`v-37`** · scène `courbe`, jeu `decharge`, `lect:4.4` · **V** « Décharge depuis 12 V : lis τ. »
  ✓ 2,2 s, là où il reste 4,4 V (37 %). ✗ 1,0 s : lu à 7,6 V, le repère de la montée (I-12) → sur une
  courbe qui descend, on lit où il reste 37 %. ✗ 1,5 s : lu à 6 V (+5) → c'est τ·ln 2.

### Partie 8 : L'énergie (scène `courbe`, jeu `energie`)

- **`energie-pari`** · `curve:0` · **P** « Chargé sous 12 V, le condensateur a rallumé la lampe.
  Chargé sous 24 V, il lui donnera… » options : « deux fois plus d'énergie » / « quatre fois plus
  d'énergie » / « la même énergie : c'est le même condensateur ». `reveal` : la parabole, les points
  15,8 mJ et 63,4 mJ. Conception B-6. Retour de la 1ʳᵉ : « Deux fois plus de charge, poussée par une
  tension deux fois plus grande : quatre fois plus. »
- **`energie-etablir`** · PC, SM · texte d'ouverture : « Filières PC et SM. En SVT, la formule est à
  connaître, pas à établir. » + bouton « Passer à la suite » (`data-aller="energie-calc"`) · **D**
  puis Q · lignes : p = u_C·i (r : la puissance reçue, convention récepteur) ; p = C·u_C·du_C/dt (r :
  i = C·du_C/dt). Pari « p est la dérivée de… » ✓ ½·C·u_C². ✗ C·u_C² : la dérivée de u_C² est
  2u_C·du_C/dt (B-6) → d'où le ½. ✗ C·u_C (B-6) → c'est q, une charge. `apres` : tex
  E_e = ½·C·u_C² ([[energieemmagasinee|énergie emmagasinée]] ; notation à vérifier, §8.2).
- **`energie-calc`** · **V** (`1.3.1.18`) « C = 220 µF chargé sous 12 V : E_e = ? » ✓ 15,8 mJ.
  ✗ 1,58 × 10⁴ J : µF non converti (I-11). ✗ 1,32 mJ : le carré oublié, ½·C·u (B-6). `apres` : « À la
  décharge, cette énergie est dissipée par effet Joule dans R. »

### Partie 9 : Mesurer (scènes `circuit`, `courbe`)

- **`oscillo`** · jeu `oscillo`, `osc:1` (voie Y₁ sur A, masse sur B : u_C) · **Q** (`1.3.1.15`) « Un
  oscilloscope ne montre que des tensions. Pour voir l'allure de i(t), on visualise… » ✓ u_R, car
  u_R = R·i. ✗ u_C (+9) → u_C suit q, pas i. ✗ rien : un oscilloscope ne voit pas les courants (+9) →
  u_R en est l'image, à R près. (Branchement de la seconde voie et inversion : §8.2, point 5.)
- **`oscillo-lire`** · scène `courbe`, `osc:1` (quadrillage, 0,5 s/div) · **V** « La tangente coupe
  l'asymptote à 4,4 divisions. τ = ? » ✓ 2,2 s. ✗ 4,4 s : des divisions lues comme des secondes
  (B-9) → multiplie par la sensibilité horizontale. ✗ 8,8 s : divisé par la sensibilité (B-9) →
  divisions × secondes par division.

### Partie 10 : Retour à l'énigme (scène `circuit`, jeu `lampe`)

- **`retour-lampe`** · `K:1, t:0→1` · texte dépendant du pari `allumage` (forme de `rappelEnigme`) :
  aucune charge n'a traversé l'isolant ; le courant a apporté des charges à A et en a retiré à B ; il
  vaut E/R au départ, puis décroît avec τ ; la lampe s'éteint après environ 5τ. `fort` : « Le courant
  passe tant que le condensateur se charge. » Pas d'action.
- **`retour-duree`** · **Q** « Pour que la lueur dure deux fois plus longtemps, on… » ✓ double C.
  ✗ double E (+8) → E fixe la hauteur, pas τ. ✗ divise R par deux (+7) → τ = RC serait divisé par deux.
- **`retour-interet`** · `K:2` · **V** (`pc-svt 1.3.1.15` ; enrichissement en PC, SM) « Ce montage
  permet… » ✓ de stocker de l'énergie, puis de la rendre en un temps réglé par RC. ✗ de produire de
  l'énergie (+2) → le condensateur rend ce que le générateur lui a donné. ✗ de laisser passer un
  courant continu (B-8) → en régime permanent, i = 0. (Exemples d'usage, flash, minuterie : à
  vérifier, non affichés, §8.2, point 6.)

### Partie 11 : Au bac (scènes `courbe`, `circuit`) — voir §6

`bac`, `bac-ed`, `bac-i`, `bac-R`, `bac-C`, `bac-2a`, `bac-2b`.

### Partie 12 : Bilan (scènes `quiz`, `end`)

- **`q1`** · la copie fautive (sujet 2022, courbe (C₂)) · **V** « Une copie lit τ sur i(t) là où
  i = 63 % de 12 mA, soit 7,6 mA, trouve τ ≈ 23 ms, puis C ≈ 23 µF. Son erreur ? » ✓ sur une courbe qui
  descend, τ se lit là où il reste 37 %, ici 4,4 mA. ✗ elle aurait dû lire à la moitié, 6 mA (+5) →
  c'est τ·ln 2. ✗ aucune : 63 % vaut pour toutes les courbes (I-12) → 63 %, c'est ce qui est atteint
  par une courbe qui monte. Aucune phrase sur ce que « le correcteur » fait.
- **`q2`** · **Q** (`1.3.1.6`) « Deux condensateurs de 10 µF en série : C_éq ? » ✓ 5 µF. ✗ 20 µF :
  c'est en parallèle (+3). ✗ 10 µF : la capacité ne change pas (+3) → 1/C_éq = 1/10 + 1/10.
- **`q3`** · **Q** « R = 10 kΩ, C = 220 µF : τ = ? » ✓ 2,2 s. ✗ 4,5 × 10⁷ s : R/C (B-5). ✗ 2,2 × 10⁶
  s : µF non converti (I-11).
- **`fin`** · scène `end` (cinq lignes : q = C·u_C et i = dq/dt, en convention récepteur ; u_C est
  continue, i saute à E/R ; RC·du_C/dt + u_C = E, solution E(1 − e^{−t/RC}) ; τ = RC : tangente, 63 %
  atteints, 37 % restants, 5τ ; E_e = ½·C·u_C²) · la fin de séance (forme de `profileHTML`) : les
  « Vérifie » réussies, les paris `allumage`, `allure`, `pas-pari`, `tangente`, `double` rappelés, et
  le renvoi piège par piège (B7) : saut de u_C, courant initial → gabarits 7, 8 ; débit constant → 3 ;
  63 % et 37 % → 8 ; R/C → 1, 6 ; signes → 2, 5 ; graphes → 3, 9 ; préfixes → 1, 12 ; énergie → 12 ;
  divisions → 13.

---

## 4. La pause et le rappel (A8)

La pause est proposée en tête de la partie 6, dans le texte de l'étape **`rappel`**, **29ᵉ étape sur
59 (49 %** ; 29/58 = 50 % en SVT, qui saute `energie-etablir`, placée après). Sa question « Vérifie » :
**à t = 0⁺, que valent u_C et i ?** (✓ 0 et E/R). Elle mêle la continuité (partie 3) et les
expressions établies (partie 5), et rejoue les deux conceptions les plus fréquentes, B-1 et B-2.

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 1
(`sav-rappel` ; `question` ; `expo-rappel` ; `retour-lampe` ; `bac-ed` ; `fin`). Les manipulations
`pas` et `curseurs` ne comptent pas comme actions pour A7 et sont chacune encadrées de deux paris.
A6 : aucune option « je ne sais pas ». A4 : chaque option fausse des **Q** et **V** porte un `indice`
(à écrire par l'auteur, sur le modèle des pilotes).

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Sources : bible E1, « Conceptions erronées et pièges » (B-) ; `content/pc/rc-charge/items.yaml`, les
douze `misconceptions` (I-, avec leur id) ; signes relevés au §3.2 (S-) ; ajoutées ici, avec leur
raison (+).

| # | Conception | Source | Étapes |
|---|---|---|---|
| B-1 | u_C saute instantanément à E | bible ; `uc-saute-instantanement` | `allure`, `continuite`, `rappel` |
| B-2 | le courant part de zéro, comme u_C | bible ; `courant-part-de-zero` | `i0`, `i-t`, `rappel`, `i-decharge` |
| B-3 | la charge se fait à débit constant (u_C linéaire) | bible ; `charge-a-debit-constant` | `allure`, `pas-pari` (contraste : `courant-constant`) |
| B-4 | τ est l'instant où la charge est finie | bible ; `tau-instant-d-arret` | `tangente`, `reste`, `cinq-tau` |
| B-5 | τ = R/C (et groupements faux de τ) | bible ; `tau-mauvais-groupement` | `verif`, `dim`, `q3` |
| B-6 | E = C·u (oubli du ½ et du carré) | bible ; `energie-lineaire-en-u` | `energie-pari`, `energie-etablir`, `energie-calc` |
| B-7 | u_C dépasse E | bible ; `uc-depasse-E` | `permanent` |
| B-8 | en régime permanent, le condensateur laisse passer le courant | bible ; `condensateur-conduit-en-permanent` | `allumage`, `permanent`, `retour-interet` |
| B-9 | piège de copie : τ lu en divisions sans la sensibilité ; tangente tracée sur u_R au lieu d'u_C | bible | `oscillo-lire` ; la tangente de u_R : `reste` (elle coupe l'axe des temps, pas l'asymptote), gabarit 8 |
| I-9 | l'équation se réécrit à l'œil (signe, facteur RC) | `ed-transformee-sans-verification` | `ed-maille`, `ed-forme`, `ed-q`, `verif`, `bac-2a` |
| I-10 | la valeur lue sur le graphe est la réponse (rapport inversé, facteur oublié) | `lecture-graphique-mal-exploitee` | `q-u`, `courant-constant`, `bac-2b` |
| I-11 | préfixes non convertis | `prefixe-unite-non-converti` | `farad`, `courant-constant`, `energie-calc`, `q3`, `bac-R` |
| I-12 | la décharge, c'est la charge (mêmes lois, même 63 %) | `charge-et-decharge-memes-lois` | `reste`, `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37`, `q1` |
| S-1 | i = −dq/dt, ou u_C fléchée comme i (mauvaise armature, convention générateur) | §3.2 | `convention`, `dqdt`, `ed-maille` |
| S-2 | un signe perdu dans la forme normalisée | §3.2 | `ed-forme`, `bac-2a` |
| S-3 | décharge écrite u_R = u_C (solution en e^{+t/τ}) | §3.2 | `ed-decharge`, `sol-decharge` |
| S-4 | i positif à la décharge | §3.2 | `i-decharge` |
| +1 | un isolant entre les armatures empêche tout courant, même un instant | ajoutée : leurre naturel de l'énigme et de Leyde | `allumage`, `leyde` |
| +2 | un condensateur ne garde rien (ou : il produit de l'énergie, sans s'épuiser) | ajoutée : leurre naturel de `flash` | `flash`, `retour-interet` |
| +3 | formules série et parallèle échangées ; « la capacité ne change pas » | ajoutée : 2018 N, Q1.1 et 1.3 | `armatures` (seule A se charge), `parallele`, `q2` |
| +4 | le courant s'use le long du circuit | ajoutée : conception classique, sert la ligne « même i dans R et C » | `nollet` |
| +5 | τ confondu avec t½ = τ·ln 2 (lecture à la moitié) | ajoutée : héritage de la radioactivité | `lecture-63`, `v-37`, `q1`, `bac-C` |
| +6 | le repère 37 % appliqué à une montée | ajoutée : symétrique de I-12 | `lecture-63`, `bac-C` |
| +7 | R seul (ou C seul) règle la vitesse | ajoutée : items RC-12 (`tau-mauvais-groupement`, rôles de R et C) | `double`, `retour-duree` |
| +8 | E change τ | ajoutée : `1.3.1.16` (« amplitude de l'échelon ») | `influence-E`, `retour-duree` |
| +9 | on visualise i directement, ou par u_C | ajoutée : `1.3.1.15` | `oscillo` |
| +10 | au bac, « montrer l'équation » en dérivant la solution donnée | ajoutée : forme des sujets 2021, 2022 | `bac` |

Toutes les conceptions de la fiche bible et toutes celles de `items.yaml` sont affrontées. Limite
connue : la moitié « tangente tracée sur u_R » de B-9 n'est affrontée dans la leçon que par la phrase
de `reste` ; elle est le leurre du gabarit 8.

---

## 6. Au bac (B6)

**L'exemple commenté** — bac PC 2022, session normale (NS 28F), Exercice 3, §1 « Réponse d'un dipôle RC
à un échelon de tension », questions 1.1 (0,25 pt), 1.2.1 (0,5 pt), 1.2.2 (0,5 pt), 1.2.3 (0,25 pt),
barème imprimé en marge, total 1,5 pt (`docs/sujets/pc/rc-charge.md`, statut vérifié, figure mesurée
au pixel). Données lues : palier E = 12 V ; i(0) = 12 mA ; la tangente (T) coupe le palier à
t = 50 ms. Solution donnée : u_C(t) = E(1 − e^{−t/RC}).

- **`bac`** · scène `courbe`, jeu `bac22` · « Question 1.1 : montrer que l'équation différentielle
  s'écrit du_C/dt + u_C/(RC) = E/(RC). Premier geste ? » (pari sans `ok`, décision §9.8 de la spec
  noyaux ; `reveal` : scène `circuit` en vignette, flèches posées). Options : « Écrire l'additivité des
  tensions dans la maille, avec les flèches du schéma » (le bon réflexe) ; « Dériver la solution
  donnée en 1.2 et la remplacer » (+10 : c'est vérifier une solution, pas établir l'équation ; c'est
  la question suivante) ; « Lire τ sur la courbe (T) » (inutile en 1.1 : aucune valeur n'est
  demandée).
- **`bac-ed`** · **D**, commenté, sans action : u_R + u_C = E ; u_R = R·i ; i = dq/dt = C·du_C/dt ;
  RC·du_C/dt + u_C = E ; on divise par RC. Pas d'action (A7 : une seule étape).
- **`bac-i`** · **Q** 1.2.1 (0,5 pt) « i(t) en fonction de E, R, C et t ? » ✓ i = C·du_C/dt =
  (E/R)e^{−t/RC}. ✗ (E/(RC))e^{−t/RC} : c'est du_C/dt, C oublié. ✗ (E/R)(1 − e^{−t/RC}) (B-2).
- **`bac-R`** · **Q** 1.2.2 (0,5 pt) « R ? » ✓ i(0) = E/R, donc R = 12/(12 × 10⁻³) = 1,0 × 10³ Ω.
  ✗ 1 Ω : mA non converti (I-11). ✗ 1,0 × 10⁻³ Ω : i₀/E au lieu de E/i₀ (I-10).
- **`bac-C`** · **Q** 1.2.3 (0,25 pt) « Montrer que C = 50 µF. » ✓ τ = 50 ms lu par (T), C = τ/R =
  5,0 × 10⁻⁵ F. ✗ τ ≈ 23 ms, lu où u_C = 37 % de E, d'où C ≈ 23 µF (+6). ✗ τ ≈ 35 ms, lu où
  u_C = E/2, d'où C ≈ 35 µF (+5). `apres`, `html` (forme de `bac-copie`) : la rédaction attendue en
  quatre lignes, la formule littérale avant le nombre (consigne imprimée des sujets,
  `radioactivite-outils.js` source 10) ; barème 0,25 + 0,5 + 0,5 + 0,25 (cité du sujet).

**Le second exemple, que l'élève complète** — bac PC 2021, session normale (NS 28F), Exercice IV,
Partie I « Réponse d'un dipôle RC à un échelon de tension », Q1 (0,5 pt) et Q2 (0,5 pt), barème imprimé
(même fichier, statut vérifié, trois passes). Données : R = 10³ Ω ; la droite du_C/dt = f(u_C) passe
par (0 ; 1000), (6 ; 500) et (12 ; 0). L'élève choisit deux lignes :

- **`bac-2a`** · **Q** Q1 « Montrer que du_C/dt = −u_C/(RC) + E/(RC). De RC·du_C/dt + u_C = E… »
  ✓ du_C/dt = −u_C/(RC) + E/(RC). ✗ du_C/dt = −RC·u_C + RC·E : multiplié au lieu de divisé (I-9).
  ✗ du_C/dt = u_C/(RC) − E/(RC) : les deux signes inversés (S-2).
- **`bac-2b`** · scène `courbe`, jeu `dudt` · **D** puis Q · lignes : à u_C = 0, du_C/dt = E/(RC) =
  1000 V·s⁻¹ (r : l'ordonnée à l'origine) ; la pente vaut −1/(RC) = −1000/12 ≈ −83,3 s⁻¹ (r : la droite
  coupe l'axe en u_C = E = 12 V). Pari « C = ? » ✓ RC = 1,2 × 10⁻² s, C = 1,2 × 10⁻⁵ F = 12 µF.
  ✗ 1 µF : 1000 pris pour 1/(RC), E oublié (I-10). ✗ 8,3 × 10⁻² F : 83,3 pris pour RC au lieu de
  1/(RC) (I-10). **Leurre interdit** : « τ = 12 ms lu sur l'axe des u_C » donne par hasard C = 12 µF
  (la valeur de E, 12 V, a le même chiffre que τ en ms).

Contrôle B3 sur ces lignes : chaque leurre donne une valeur fausse (recalculées §8.1). La copie
fautive est l'étape `q1` du bilan (courbe (C₂) du sujet 2022, 63 % sur une courbe qui descend).

Autres sujets transcrits, utilisés dans la leçon sans être l'exemple : 2018 N, Ex. III, 1.1 à 1.3
(`parallele`, `q-u`) ; 2019 N, Ex. III, Q1 et Q2 (`ed-q`, `verif`) ; 2025 N, Ex. 3, 1-1 et 1-2
(`courant-constant`). Non utilisés : 2019 N, Q3 à Q5 (la lecture de τ ≈ 1 ms est « à confirmer » dans
la transcription) ; 2018 N, I-2 (figure 4 : « lecture d'échelle à confirmer », E non lu). Sujets 2026
cités par la bible (PC R, SM R, SVT R) : **non transcrits**, ils ne servent pas.

---

## 7. Les exercices générés (`components/pilote/exercices/dipole-rc.js`)

Format de `noyaux.js` : réponse calculée, chaque leurre porte `fb` et `erreur` (id du §5).
**Capacités** : une fonction `CAPR(id)` qui rend `pc-pc id`, `pc-sm id` et, selon la table du §1.1,
`pc-svt id'` : 1.3.1.1 à 1.3.1.14 → mêmes ids ; 1.3.1.15 → 16 ; 1.3.1.16 → 17 ; 1.3.1.17 → aucun
(gabarit marqué `filieres: ['PC','SM']` pour la question concernée) ; 1.3.1.18 → 18. `pc-svt 1.3.1.15`
n'a pas de gabarit (§8.3, question 5). **Règle de tirage commune (B3)** : un tirage où un leurre
calculé coïncide avec la réponse à 2 % près est rejeté, **y compris les coïncidences de chiffres entre
grandeurs d'unités différentes** (cas 2021 : E = 12 V et τ = 12 ms ; cas 2025 : pente = 1, où I₀/pente
= I₀ × pente). Valeurs tirées dans les séries usuelles (E12 : 1,0 ; 2,2 ; 4,7… ; E de 5 à 12 V) ;
sujets rejoués avec leurs valeurs imprimées (2018, 2021, 2022, 2025).

| # | id | Niveau | Tirage | Capacités (PC/SM) | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `rc-unites` | 1 | R ∈ {100 Ω … 100 kΩ}, C ∈ {pF, nF, µF} ; conversions, puis τ = RC en s ou ms | 1.3.1.4, 1.3.1.11 | préfixe non converti (I-11) ; nF pris pour µF ; τ = R/C (B-5) |
| 2 | `rc-signes` | 1 | un schéma (i et u_C fléchés, deux orientations tirées), charge ou décharge ; signe de q_B, de u_C, de i ; i = Δq/Δt sur un intervalle où q varie linéairement | 1.3.1.1, 1.3.1.2 | i = −dq/dt (S-1) ; u_C fléchée comme i (S-1) ; Δt/Δq ; i positif à la décharge (S-4) |
| 3 | `rc-capacite-graphe` | 2 | forme 2018 (q = f(u), droite) ou forme 2025 (u_C = I₀t/C, I₀ ∈ {0,5 ; 1 ; 2 ; 5} µA) ; C | 1.3.1.3, 1.3.1.5 | rapport inversé (I-10) ; préfixe (I-11) ; pente lue sur un intervalle qui ne part pas de l'origine ; « la charge est toujours linéaire » (B-3, question qualitative) ; **produit I₀ × pente retiré si pente = 1** |
| 4 | `rc-associations` | 2 | deux ou trois condensateurs, série ou parallèle ; C_éq, ou une capacité inconnue (forme 2018) ; l'intérêt (parallèle : plus grande ; série : plus petite) | 1.3.1.6 | formules échangées (+3) ; moyenne ; addition au lieu de soustraction |
| 5 | `rc-equation` | 2 | charge ou décharge ; inconnue u_C, q, u_R ou i ; quatre formes proposées, une juste | 1.3.1.7, 1.3.1.2, 1.3.1.3 | signe perdu (S-2, S-3) ; facteur RC multiplié (I-9) ; E gardé à la décharge (I-12) ; i = C·u_C |
| 6 | `rc-solution` | 2 | forme 2019 q(t) = A(1 − e^{−αt}) ou u_C = A(1 − e^{−t/τ}), ou décharge U₀e^{−t/τ} ; identifier A et α (ou τ) | 1.3.1.7, 1.3.1.8, 1.3.1.11 | α = RC au lieu de 1/(RC) (B-5) ; A = E pour q (au lieu de CE) ; τ = R/C ; « τ quelconque » |
| 7 | `rc-expressions` | 2 | u_C(t) donnée ; i(t), q(t), u_R(t) ; valeurs à t ∈ {0 ; τ ; 2τ} | 1.3.1.8, 1.3.1.10 | i en (1 − e) (B-2) ; C oublié dans i ; i(0) = 0 (B-2) ; u_C(0) = E (B-1) ; signe à la décharge (S-4) |
| 8 | `rc-lecture-tau` | 3 | une courbe tracée (u_C charge, u_C décharge, u_R ou i), avec ou sans tangente ; τ, puis R ou C | 1.3.1.9, 1.3.1.11, 1.3.1.13 | 63 % sur une descente (I-12) ; 37 % sur une montée (+6) ; lecture à la moitié (+5) ; tangente de u_R lue sur l'asymptote (B-9) ; préfixe ms |
| 9 | `rc-droite-dudt` | 3 | forme 2021 : la droite du_C/dt = f(u_C), R donné ; E et C | 1.3.1.7, 1.3.1.9, 1.3.1.5 | ordonnée prise pour 1/(RC) (I-10) ; pente prise pour RC ; **rejet si la valeur numérique de E égale celle de τ en ms ou en s, à 2 % près** |
| 10 | `rc-regimes` | 1 | τ donné ; part de E atteinte à nτ (n ∈ {1, 2, 3, 5}) ; durée du régime transitoire ; régime à un instant donné | 1.3.1.13 | τ = fin de la charge (B-4) ; 37 % et 63 % échangés ; régime permanent avec i ≠ 0 (B-8) |
| 11 | `rc-influence` | 2 | trois courbes pour trois couples (R, C) ou trois E ; attribuer chaque courbe ; une paire de même produit RC proposée une fois sur trois (« même courbe ») | 1.3.1.16, 1.3.1.13 | R seul règle la vitesse (+7) ; E change τ (+8) ; un R plus grand charge plus vite ; **produits RC distincts de plus de 20 % sauf la paire voulue** |
| 12 | `rc-energie` | 2 | C ∈ {nF … mF}, u ∈ {5 … 24} V ; E_e ; rapport quand u double ; énergie dissipée à la décharge ; en PC/SM, une question « établir » (quelle dérivée) | 1.3.1.18 (+ 1.3.1.17, PC/SM) | ½·C·u (B-6) ; C·u² ; préfixe (I-11) ; « ×2 quand u double » |
| 13 | `rc-mesure` | 1 | un oscillogramme (sensibilités tirées : 0,1 à 2 V/div, 0,5 ms à 1 s/div) ; quelle tension voit-on, quelle voie montre l'image de i ; τ en divisions → τ en s ; le schéma de montage à compléter | 1.3.1.14, 1.3.1.15 | divisions lues comme unités (B-9) ; division par la sensibilité ; i visualisé par u_C (+9) |
| 14 | `rc-bac` | 3 | forme 2022 : E ∈ {6 ; 9 ; 12} V, R ∈ {470 Ω … 10 kΩ}, C ∈ {10 … 470} µF ; équation, i(t), R par i₀, C par τ | 1.3.1.7, 1.3.1.8, 1.3.1.9, 1.3.1.11 | ceux des étapes `bac-*` ; **rejet si E (en V) et i₀ (en mA) ont la même valeur et que le leurre « mA non converti » donne R/1000 égal à une autre option** |

Niveaux : 1 = restituer, convertir, lire ; 2 = appliquer une relation à un cas ; 3 = enchaîner une
lecture graphique et deux relations (format d'une question du bac à 0,5 pt). Chaque question porte
`sujet` (B7). Aucun exercice ne teste la linéarisation par ln ni le temps de seuil (non enseignés, §1.3).

---

## 8. À vérifier, et questions pour le relecteur

### 8.1 Les données (pour `dipole-rc-outils.js`)

En tête du fichier, comme `radioactivite-outils.js` : chaque donnée avec sa source et son statut.

| Donnée | Valeur | Source | Statut |
|---|---|---|---|
| sujet 2022 N, Ex. 3 §1 : E = 12 V, i₀ = 12 mA, τ = 50 ms, R = 1000 Ω, C = 50 µF ; barème 0,25 + 0,5 + 0,5 + 0,25 | — | `docs/sujets/pc/rc-charge.md` (vérifié, figure mesurée au pixel) | [V] |
| sujet 2021 N, Ex. IV Partie I : R = 10³ Ω, droite (0 ; 1000), (6 ; 500), (12 ; 0) ; C = 12 µF ; barème 0,5 + 0,5 | — | idem (vérifié, trois passes) | [V] |
| sujet 2018 N, Ex. III, I-1 : C₁ = 7,5 µF, droite q = f(u) jusqu'à (6 V ; 60 µC), C_éq = 10 µF, C₂ = 2,5 µF ; barème 0,5 + 0,75 + 0,5 | — | idem (vérifié, trois passes) | [V] |
| sujet 2025 N, Ex. 3, 1- : I₀ = 1 µA, pente 1 V·s⁻¹, C₀ = 1 µF ; barème 0,5 + 0,5 | — | idem (vérifié) | [V] |
| sujet 2019 N, Ex. III, Q1, Q2 (formes ; barème 0,5 + 0,5) | — | idem (vérifié) ; figure 2 « lecture d'échelle à confirmer » | [V] pour les énoncés ; figure non utilisée |
| consigne « On donnera les expressions littérales avant de passer aux applications numériques » | — | `radioactivite-outils.js`, source 10 | [V] |
| Musschenbroek : citation « Tout à coup ma main droite fut frappée avec tant de violence, que j'eus tout le corps ébranlé comme d'un coup de foudre » ; le canon suspendu à des fils de soie, la sphère de verre frottée, le vase d'eau dans la main droite, l'autre main vers le canon | — | Wikipédia, [Bouteille de Leyde](https://fr.wikipedia.org/wiki/Bouteille_de_Leyde) (lu le 2026-11-24) | [V] sur la page ; date de la lettre : voir §8.2, point 1 |
| Kleist, 1745 : bouteille, clou, choc en touchant le clou | — | Wikipédia fr. et [Leyden jar](https://en.wikipedia.org/wiki/Leyden_jar) | [V] sur les pages ; fiche de mot seulement |
| Nollet, 1746 : « about two hundred monks », cercle « about a mile (1.6 km) », fils de fer, « each man reacted at substantially the same time » | — | Wikipédia, [Jean-Antoine Nollet](https://en.wikipedia.org/wiki/Jean-Antoine_Nollet), qui cite P. E. Gundersen, *The Handy Physics Answer Book*, 1998, p. 233 | [V] sur la page ; [S] pour la source (ouvrage de vulgarisation) |
| valeurs de la leçon : E = 12 V, R = 10 kΩ, C = 220 µF | choix d'auteur, pas des données | — | — |

**Contrôles faits à la main (le code les refera).** τ = 10⁴ × 2,2 × 10⁻⁴ = 2,2 s ; i₀ = 1,2 mA ;
u_C(τ) = 12 × 0,632 = 7,59 V ; 37 % de E = 4,41 V ; t pour u_C = 6 V : τ·ln 2 = 1,52 s ; t pour
u_C = 4,41 V (charge) : −τ·ln(0,632) = 0,459τ = 1,01 s ; 1 − e^{−2} = 86,5 % ; 1 − e^{−5} = 99,3 % ;
pas de 0,22 s : 1,2 mA × 0,22 s = 0,264 mC, /220 µF = 1,20 V ; second pas 1,08 V ; après 10 pas
12(1 − 0,9¹⁰) = 7,82 V contre 7,59 V exact ; i(τ) = 0,441 mA ; E_e = ½ × 2,2 × 10⁻⁴ × 144 = 15,84 mJ ;
à 24 V : 63,4 mJ ; leurres 15 840 J et 1,32 mJ ; R/C = 4,55 × 10⁷ ; R × 220 = 2,2 × 10⁶ ; décharge :
t pour 7,59 V = τ·ln(12/7,59) = 1,01 s. Sujet 2022 : R = 1000 Ω, C = 50 µF ; u_C = 4,44 V à
0,459 × 50 = 22,9 ms (leurre 23 µF) ; t½ = 34,7 ms (leurre 35 µF) ; i = 7,56 mA à 22,9 ms (`q1`) ;
leurres R : 1 Ω, 10⁻³ Ω. Sujet 2021 : 1/(RC) = 83,3 s⁻¹, C = 12 µF ; leurres 1 µF et 0,083 F.
Sujet 2018 : leurres 17,5 µF et 7,5 × 10/17,5 = 4,29 µF. Sujet 2025 : leurres 10⁶ F et 1 F.
`dqdt` : −4/2 = −2 µA, leurre 2/(−4) = −0,5. Série 10 + 10 µF : 5 µF.

Chaque leurre de calcul a été recalculé : aucun ne retombe sur la bonne valeur. **Trois coïncidences
trouvées et écartées** : (1) sujet 2025 : « I₀ × pente » = I₀/pente, la pente valant 1 (leurre
interdit dans `courant-constant`) ; (2) sujet 2021 : l'abscisse 12 (V) lue comme τ = 12 ms donne la
bonne capacité (leurre interdit dans `bac-2b`) ; (3) valeurs de la leçon : τ = 1 s, d'abord envisagé,
aurait rendu τ et 1/τ numériquement égaux (leurre α = 1/τ) ; d'où C = 220 µF et τ = 2,2 s. Vérifié
aussi : 63 % et 37 % ne tombent jamais sur la même lecture (0,459τ, 0,693τ, τ sont distincts), et la
demi-charge τ·ln 2 n'est jamais égale à τ.

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **La date de la lettre de Musschenbroek** : 20 avril 1746 selon Wikipédia fr., 20 janvier 1746
   selon Wikipédia en. (qui cite Present 2022). Tag proposé : « 1746 · Leyde », sans jour.
2. **Nollet** : le nombre (« about two hundred » sur la page Nollet ; la page *Leyden jar* parle de
   180 gardes puis d'un « groupe plus grand » de chartreux, d'après Priestley 1769 ; Wikipédia fr.
   *Bouteille de Leyde* parle de « plus de deux cents courtisans » devant Louis XV) et la simultanéité
   viennent d'une source secondaire de vulgarisation. Le texte dit « environ deux cents moines » et
   « presque au même instant » ; à confirmer sur Priestley (*The History and Present State of
   Electricity*, 1767) ou retirer le chiffre.
3. **La lampe de l'énigme** : comportement qualitatif seulement ; une expérience réelle (valeurs de
   C, lampe ou DEL) n'a pas été testée. La bible le signale déjà (« valeurs à tester »).
4. **Les flèches des figures 2022 et 2018** : non décrites dans la transcription ; si une étape montre
   ces schémas, relire le scan.
5. **Le branchement de l'oscilloscope** : avec une masse commune entre R et C, la seconde voie montre
   −u_R (il faut inverser la voie) ; la forme attendue au bac n'est dans aucun sujet transcrit. La
   leçon se limite à « Y₁ sur A, masse sur B : u_C » et « u_R est l'image de i ».
6. **L'« intérêt » d'un montage RC** (`pc-svt 1.3.1.15`) : la leçon dit « stocker de l'énergie puis la
   rendre ; une durée réglée par RC », ce que la leçon démontre. Les exemples (flash, temporisation,
   lissage) ne sont pas sourcés et ne s'affichent pas ; ce que le correcteur attend est la question
   « à trancher » de la bible.
7. **La notation de l'énergie** (E_e, W_e, ℰ_e ?) : aucun sujet transcrit ne la porte dans la partie
   RC. À relire dans un sujet (2026 PC R ou SM R, non transcrits) ou dans le manuel.
8. **L'intérêt du montage en série** : seule « une capacité plus petite » découle de la formule ;
   « supporter une tension plus grande » est courant dans les manuels mais non sourcé ici : non affiché.

**Histoire (≤ 3 places).**
1. **Musschenbroek, 1746** (`leyde`) [V] Wikipédia fr. : la citation et le montage. Kleist (1745) :
   fiche de mot `leyde`, sans pari.
2. **Nollet, 1746** (`nollet`) [V] sur la page, [S] pour la source (point 2). Il sert une ligne de la
   dérivation (le même i dans R et C) ; s'il ne paraît pas en valoir la place, l'étape devient une
   phrase de `ed-maille` et la leçon tombe à 58 étapes (§8.3, question 6).
3. Aucune troisième place : le flash d'appareil photo (bible, « à vérifier ») n'est pas utilisé.

### 8.3 Pour le relecteur

1. **Scène nouvelle `circuit`** (schéma du montage, interrupteur à deux positions, flèches, charges,
   lampe, oscilloscope) : décision du propriétaire (07 §3.3). Elle porte l'énigme, les conventions et
   la décharge ; elle reprendra pour RL et RLC.
2. **`courbe`** : une seule copie de `loi` avec sept jeux (dont trois droites des sujets et la parabole
   de l'énergie), ou une seconde copie `droite` pour les droites ? Le plan dit une seule.
3. **Valeurs de la leçon** (12 V, 10 kΩ, 220 µF, τ = 2,2 s) : un choix d'auteur, pour garder le sujet
   2022 frais pour l'exemple du bac et lire τ en secondes à l'œil. La règle §9.11 de la spec noyaux
   (« priorité aux données des sujets ») vise des données ; ici, aucune donnée n'est en jeu. Confirmer,
   ou passer aux valeurs de 2022 (τ = 50 ms) partout.
4. **Une séance ou deux ?** 59 étapes pour dix-huit tirets. Une coupe naturelle : séance 1, le
   condensateur et la charge (parties 0 à 5, 28 étapes) ; séance 2, τ, décharge, énergie, mesure, bac.
   Le format suppose une pause au milieu ; deux séances demanderaient deux rappels.
5. **SVT** : bouton « passer » sur `energie-etablir` ; `retour-interet` porte `pc-svt 1.3.1.15` sans
   gabarit d'exercice tant que la réponse attendue n'est pas connue (§8.2, point 6). D'accord ?
6. **Nollet** : garder la deuxième place d'histoire, ou la réduire à une phrase ?
7. **L'énigme à la lampe**, qualitative, avec la phrase « pour calculer, on remplace la lampe par une
   résistance » : suffisant pour B9 ?
8. **La linéarisation ln u_R** (bible : sujet PC R 2026, non transcrit) : hors leçon ici. À ajouter en
   une étape si un sujet transcrit la confirme ?
9. **Route** : `/pilote/dipole-rc` (fichiers `dipole-rc-*.js`) ou `/pilote/rc-charge` (le nom du
   dossier `content/`) ?
10. **`pas`** : dix clics pour arriver à τ. Trop ? Cinq pas de τ/5 tombent plus loin de la courbe
    (12(1 − 0,8⁵) = 8,07 V contre 7,59) et le lien « × 0,9 comme × 5/6 » se perd.

## 9. Décisions du relecteur (2026-11-24)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **Scène nouvelle `circuit`** : accordée. L'auteur la construit d'abord, seule, et regarde ses
   captures (ordinateur et 390 px) : flèches de tension et de courant, signes des charges lisibles.
2. **Courbes** : deux scènes, `courbe` (les exponentielles et leurs lectures) et `droite` (les
   graphiques en ligne droite), plutôt qu'une seule à sept modes.
3. **Valeurs** : celles de la leçon (E = 12 V, R = 10 kΩ, C = 220 µF, τ = 2,2 s) ; celles du sujet
   2022 restent pour l'exemple du bac.
4. **Une seule séance.**
5. **Filière SVT** : l'établissement de l'expression de l'énergie s'ouvre par une ligne « Filières PC
   et SM. En SVT, ce n'est pas à ton programme » et un bouton « Passer à la suite ». Aucun gabarit
   pour « l'intérêt d'un circuit RC » tant que la réponse attendue n'est pas établie sur un sujet.
6. **Histoire** : Musschenbroek seul, étiquette « 1746 » sans jour. Nollet est retiré (récits
   discordants) ; la leçon descend à 58 étapes.
7. **La lampe de l'énigme** : acceptée comme expérience de principe, qualitative. Aucune valeur de
   composant n'est donnée dans ces étapes, et le texte ne dit pas que la lampe est un conducteur
   ohmique.
8. **Linéarisation ln u_R** : non, pas dans cette leçon.
9. **Route** : `/pilote/dipole-rc`.
10. **Construction pas à pas** : cinq clics de l'élève, puis l'animation termine la courbe.
11. **Oscilloscope** : le branchement minimal (voie sur u_C, masse commune) ; la voie inversée n'est
    pas traitée tant qu'aucun sujet transcrit ne la montre. **Notation de l'énergie** : E_e, à
    confirmer sur un sujet avant la mise en ligne.
