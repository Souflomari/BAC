# Spec v3 : transformations non totales (`pc/transformations-deux-sens`)

> Plan d'auteur de la première leçon pilote de chimie. Elle ouvre la partie 1 de l'exercice de chimie
> de chaque sujet (une solution d'acide faible : équation avec l'eau, tableau, τ par le pH ; bible
> `docs/bible/03-chimie.md` §1.1). Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ;
> fichiers et champs : [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; mouvement :
> [`09-regles-du-mouvement.md`](../09-regles-du-mouvement.md). Modèle de forme :
> [`dipole-rc.md`](dipole-rc.md). Fiche : bible **C3**. Leçon minée, non portée :
> `content/pc/transformations-deux-sens/` (`lesson.md`, `items.yaml`, figures `media/`), et la partie
> R6 de `content/pc/reactions-acido-basiques/lesson.md` (le seul endroit où l'ancienne application
> calcule τ par le pH). L'auteur suit ce plan étape par étape ; il rédige les textes, il ne décide ni
> l'ordre, ni les paris, ni les leurres.
>
> **Tout nombre cité ici est à recalculer par le code** (le fichier d'outils de la leçon, à créer ;
> nom selon la route, §8.3 question 3). Les valeurs écrites ci-dessous sont des contrôles faits à la
> main (§8.1).
>
> **Scène d'un type nouveau demandée : une seule, `solution`** (le bécher et son pH-mètre, et la loupe
> sur cent molécules d'acide ; §3.3). Les autres sont des copies adaptées : `avancement` (de `table`),
> `barres` (de `comptes`, curseurs sur le modèle de `aston`), `bac`, `quiz`, `end`.

---

## 1. Périmètre

### 1.1 Le nom et les capacités officielles

Chapitre **« 1- Transformations chimiques qui ont lieu dans les deux sens »** du « Sous domaine 2 :
Transformations non totales d'un système chimique » (PC p. 14, SM p. 15) ; en SVT, chapitre « 3- »
du même sous-domaine (p. 11 ; le cadre SVT numérote ses chapitres de chimie à la suite). Poids du
sous-domaine : 10 % (PC, `pc-pc.yaml` l. 68), 10 % (SM, `pc-sm.yaml` l. 69), 11 % (SVT,
`pc-svt.yaml` l. 71). Annexe des contenus (PC p. 23, `pc-pc.yaml` l. 525 ; SM l. 539) : « introduction
de la notion pH - mesure du pH » ; « mise en évidence expérimentale d'un avancement final différent
de l'avancement maximal » ; « modélisation d'une transformation chimique limitée par deux réactions
inverses et simultanées en utilisant l'écriture : ⇄ (double flèche) » ; « caractérisation d'une
transformation limitée (non totale) : avancement x_f < x_max » ; « taux d'avancement final d'une
réaction : τ = x_f / x_max , avec τ ≤ 1 » ; « interprétation à l'échelle microscopique de l'état
d'équilibre en tenant compte des chocs efficaces entre les espèces réactives d'une part et les
espèces produites d'autre part ». Travaux pratiques n° 3 (`pc-pc.yaml` l. 555, `pc-sm.yaml` l. 569) :
« Mesurer le pH d'une solution d'acide chlorhydrique, d'une solution d'acide éthanoïque et
déterminer l'avancement final de la réaction. » **Le cadre SVT n'a pas d'annexe** (`pc-svt.yaml`,
notes de lecture).

Libellés mot pour mot (`pc-pc.yaml` l. 411-416 ; `pc-sm.yaml` l. 426-431, identiques ;
`pc-svt.yaml` l. 332-337). Variantes SVT : « Écrire » ; « Déterminer **la valeur du** pH ».

| PC, SM | SVT | Libellé (cadre 2025, PC, mot pour mot) | Où |
|---|---|---|---|
| `2.2.1.1` | `2.2.3.1` | Définir un acide et une base selon Bronsted. | partie 2 |
| `2.2.1.2` | `2.2.3.2` | Ecrire l'équation de la réaction modélisant une transformation acido-basique et identifier les deux couples intervenants. | parties 2, 8 |
| `2.2.1.3` | `2.2.3.3` | Déterminer le pH d'une solution aqueuse. | parties 0, 1, 3 |
| `2.2.1.4` | `2.2.3.4` | Calculer l'avancement final de la réaction d'un acide avec l'eau, connaissant la valeur de la concentration et du pH de la solution de cet acide, et le comparer à l'avancement maximal. | parties 3, 8 |
| `2.2.1.5` | `2.2.3.5` | Définir le taux d'avancement final d'une réaction et le déterminer à partir de données expérimentales. | parties 3, 4, 6, 8 |
| `2.2.1.6` | — | (PC, SM seulement) Interpréter à l'échelle microscopique, l'état d'équilibre d'un système chimique. | partie 4 |
| — | `2.2.3.6` | (SVT seulement) Connaître l'influence de la dilution sur le taux d'avancement final d'une réaction. | partie 6 |

Préfixes : `pc-pc`, `pc-sm`, `pc-svt`. Le fichier des exercices porte la table PC/SM → SVT (§7).

Capacités voisines, **non enseignées ici** mais touchées par une question (signalé à l'étape) :
`pc-pc 2.2.2.2` / `pc-svt 2.2.4.2` (« cet état d'équilibre est dynamique », chapitre suivant ; en SVT,
c'est lui qui porte l'idée de la partie 4) ; `pc-pc 2.2.2.5` (« le taux d'avancement final dépend de la
constante d'équilibre et de l'état initial », annonce de la partie 6 en PC et SM) ; `pc-pc 2.4.1.6`
(SM idem, SVT `2.4.8.7` : « le catalyseur … sans modifier l'état d'équilibre », étape `catalyseur`).

Prérequis (non testés seuls) : n = C·V, tableau d'avancement, x_max par le réactif limitant (tronc
commun) ; pH et [H₃O⁺] = 10^(−pH) (1ère Bac selon la bible, [SEC], §8.2 point 9) ; puissances de 10
à la calculatrice. Le logarithme décimal (`maths-sexp 1.2.18`) peut être enseigné **après** ce
chapitre (bible §2.5) : la leçon n'utilise que 10^x, à la calculatrice.

### 1.2 Une seule séance

**Séance unique, « Où sont passés les protons ? »** (51 étapes) : Brønsted et l'équation de l'acide
avec l'eau ; le tableau, x_f par le pH, τ ; la loupe sur cent molécules (les deux réactions qui se
croisent, l'équilibre dynamique, la double flèche) ; les pièges de l'équilibre ; la dilution ; le
retour à l'énigme ; deux sujets du bac.

### 1.3 Hors programme ici, qu'on n'enseigne pas

- Q_r, K, K_A, pK_A (chapitres 2 et 3 du sous-domaine, bible C4 et C5) : jamais nommés. Le τ ≈ 0,99 du
  sujet 2012 (étape `quasi-totale`) est **cité**, pas calculé (son calcul passe par K).
- τ d'une **base** avec l'eau (ammoniac, sujet 2020 N, Q2.2-2.3) : il faut K_e (`pc-pc 2.2.3.1`, C5).
  L'ammoniac sert ici à Brønsted et à l'eau ampholyte, sans calcul de τ.
- τ par la **conductivité** (2019 N Q3.2 ; 2015 N Q1-1) : la relation σ = Σλᵢ[Xᵢ] est `2.2.2.1`
  (chapitre suivant). Proposé pour la leçon C4 (§8.3, question 7).
- L'autoprotolyse de l'eau : on **néglige** les H₃O⁺ venus de l'eau seule (dit une fois, à `xf`).
- L'estérification (le support de l'ancienne leçon) : chapitre C10. Elle n'apparaît pas.
- Le principe de Le Chatelier (aucun tiret ; bible C4).

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 3, 5, 7 à 9 | entières | entières | entières |
| Partie 4 (la loupe) | `2.2.1.6` | idem | **pas de tiret dans ce chapitre** ; l'idée d'équilibre dynamique est `pc-svt 2.2.4.2` (chapitre suivant) et le cadre SVT n'a pas les chocs efficaces. La partie reste pour tous (sans elle, la double flèche n'a pas de raison) ; le mot « choc efficace » n'est dit qu'en PC et SM (fiche de mot), §8.3 question 5 |
| Partie 6 (la dilution) | enrichissement marqué, annonce de `2.2.2.5` (le sujet SM N 2026, non transcrit, trace τ² en fonction du volume d'eau ajouté) | idem | `pc-svt 2.2.3.6` |
| Exemples du bac | 2022 N et 2023 N (sujets PC) | idem | idem (aucun sujet SVT transcrit dans `docs/sujets/`) |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Deux flacons, même concentration C = 1,0 × 10⁻² mol·L⁻¹ : de l'acide
chlorhydrique, et de l'acide éthanoïque (celui du vinaigre). Chaque molécule de l'un comme de l'autre
porte un proton qu'elle peut céder. Le pH-mètre affiche **2,0** dans le premier. **L'élève parie**
sur l'affichage dans le second (`deux-flacons`) : 2,0 aussi, plus de 2,0, moins de 2,0. Il affiche
**3,4** : environ 25 fois moins d'ions H₃O⁺ (`ecart`). C'est le TP n° 3 du cadre, en version calculée
(§8.2 point 1). **La question qui reste ouverte : même concentration, même proton à céder ; où sont
passés les protons qui manquent ?**

**Le retour (partie 7).**
1. Dans le flacon d'acide chlorhydrique, τ = 1 : chaque molécule a cédé son proton. Dans l'acide
   éthanoïque, τ ≈ 0,04 : les protons qui « manquent » sont restés sur les molécules d'acide ;
2. et pas toujours les mêmes : à chaque instant, des molécules cèdent leur proton et des ions
   éthanoate en reprennent un, autant dans un sens que dans l'autre. L'équation s'écrit avec ⇄ ;
3. transfert (`retour-ph`) : une solution d'acide éthanoïque de pH 2,0 est forcément plus concentrée
   que 1,0 × 10⁻² mol·L⁻¹.

Le fil rouge : **« le pH dit jusqu'où l'acide a réagi »**. x_f = 10^(−pH)·V et τ = 10^(−pH)/C
apparaissent en partie 3, sont retrouvés dans la loupe (4 molécules sur 100) en partie 4, rejoués à
la dilution (partie 6) et dans les deux sujets (partie 8).

---

## 3. La chaîne des idées

1. n = C·V, tableau d'avancement, [H₃O⁺] = 10^(−pH) → 2. l'énigme : même concentration, deux pH →
3. un acide cède un proton, une base en capte un (Brønsted) ; un couple AH/A⁻ → 4. l'acide ne cède
son proton qu'à une base : ici l'eau (couple H₃O⁺/H₂O) ; l'équation additionne deux couples ; l'eau
peut aussi céder un proton (NH₃) : ampholyte → 5. le tableau : x_max = C·V, l'eau en excès → 6. si
la réaction était totale, [H₃O⁺] = C et pH = 2,0 : c'est l'acide chlorhydrique → 7. le pH mesuré
donne x_f = 10^(−pH)·V < x_max → 8. on nomme le rapport : τ = x_f/x_max = 10^(−pH)/C ; τ < 1 :
transformation limitée → 9. pourquoi elle s'arrête : à la loupe, l'ion A⁻ formé est une base, il
reprend un proton à H₃O⁺ ; la réaction inverse grandit avec le nombre de A⁻ et de H₃O⁺ ; le compte se
stabilise → 10. au palier, les molécules changent encore, autant dans chaque sens : équilibre
dynamique ; d'où ⇄ → 11. ce que l'équilibre n'est pas : ni « il faut attendre », ni « catalyseur »,
ni « lente », ni « rien ne s'est passé » ; ⇄ n'empêche pas τ ≈ 1 ; le sens dépend de ce qu'on met
→ 12. diluer : les rencontres A⁻/H₃O⁺ se font plus rares, τ augmente → 13. retour → 14. le bac.

**Figure-clé : « les deux réactions qui se croisent »** (scène `solution`, jeu `zoom` ; 14 étapes,
un changement chacune). Un seul paramètre continu `tic` (M3) pilote à la fois la loupe, le compte et
le graphe n(A⁻) en fonction du tic (M2). Aucun texte ne nomme une couleur.

| # | Étape | Le changement |
|---|---|---|
| 1 | `loupe` (partie 4) | la loupe : 100 molécules AH, l'eau en fond (non dessinée molécule par molécule) |
| 2 | `transfert` | un proton passe d'une molécule AH à une molécule d'eau : un A⁻, un H₃O⁺ |
| 3 | `inverse` | vignette : une paire A⁻ / H₃O⁺ en gros plan ; au `apres`, le proton repasse |
| 4 | `premiers-tics` | **M** : les cinq premiers tics, un par clic ; le graphe entre à droite, un point par tic |
| 5 | `attendre` | **pari 1** ; au `reveal`, les tics 6 à 30 défilent (3 s) |
| 6 | `palier` | la courbe lisse « dans un bécher » par-dessus les points ; la droite 4 % ; le pH-mètre (3,4) en coin |
| 7 | `qui` | **pari 2** : une molécule A⁻ encadrée ; au `reveal`, son histoire tic par tic |
| 8 | `vitesses` | **pari 3** : deux compteurs, « protons cédés » et « protons repris », sur dix tics au `reveal` |
| 9 | `double-fleche` | le bandeau de l'équation : la flèche simple devient ⇄, sens 1 et sens 2 nommés |
| 10 | `equilibre` | l'étiquette « état d'équilibre » sur le palier |
| 11 | `hcl-zoom` | l'acide change : la loupe sur l'acide chlorhydrique ; 100 Cl⁻, aucun retour |
| 12 | `dilution-pari` (partie 6) | **pari 4** : le bocal dix fois plus grand (molécules espacées) ; au `reveal`, le nouveau palier (≈ 12) |
| 13 | `dilution-calc` | le pH-mètre couplé passe à 3,92 |
| 14 | `retour` (partie 7) | les deux loupes côte à côte, avec les deux flacons de l'énigme |

**Ses trois paris** : `attendre` (le compte monte-t-il jusqu'à 100 ?), `qui` (la molécule encadrée
reste-t-elle A⁻ ?), `vitesses` (autant de protons cédés que repris ?). `dilution-pari` est un
quatrième pari posé sur la même figure, comme `double` dans le dipôle RC.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 3 |
| 1 | L'énigme | Énigme | 3 |
| 2 | Acide et base | Brønsted | 6 |
| 3 | Jusqu'où l'acide a réagi | τ | 8 |
| 4 | Les deux réactions qui se croisent | Loupe | 11 |
| 5 | L'équilibre et ses pièges | Équilibre | 5 |
| 6 | La dilution | Dilution | 3 |
| 7 | Retour à l'énigme | Retour | 2 |
| 8 | Au bac | Au bac | 6 |
| 9 | Bilan | Bilan | 4 |

**51 étapes.** Notation (celle de la spec du dipôle) : **Q** question (une option `ok`, indice et
second essai) ; **P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D**
`deriv` ; **M** manipulation (`ctl`, avec `need`). ✓ juste ; ✗ fausse, suivie de la conception
affrontée (étiquette du §5) puis de l'idée du retour (B2).

### 3.2 Conventions et écritures (tenues partout)

Relevé des sujets transcrits (`docs/sujets/pc/reactions-acido-basiques.md`, `etat-equilibre.md`,
`transformations-deux-sens.md`) :
- concentration : C (2019 N), C_a (2021 N, 2022 N), C_A (2023 N) ; la leçon écrit **C**, et dit une
  fois que les sujets écrivent aussi C_a ou C_A ;
- [H₃O⁺] « à l'équilibre » : [H₃O⁺_(aq)]_éq (2022 N), « concentration molaire effective des ions
  oxonium à l'équilibre » (2019 N) ; la leçon écrit **[H₃O⁺]_f** dans le tableau et dit « _éq » au
  moment de nommer l'équilibre (`equilibre`) ;
- la double flèche : ⇄ (2012 N, avec « 1 » et « 2 » pour les deux sens), ⇌ (2015 N) ; la leçon écrit
  **⇄**, comme l'annexe du cadre ;
- les états physiques sont écrits dans les sujets : CH₃COOH_(aq), H₂O_(l), C₆H₅COO⁻_(aq) ; la leçon les
  écrit dans chaque équation (leur notation au barème : §8.2 point 8) ;
- le tableau : « tableau descriptif de l'évolution » (2012 N), « tableau d'avancement » (2019 N,
  2023 N) ; trois lignes (état initial, en cours, état final), l'eau notée **« excès »** ;
- τ en fraction ou en pourcentage (2021 N : « τ ≈ 1,32 % » ; 2015 N : « τ = 0,072 ») ; la leçon donne
  les deux, toujours avec le signe % quand c'est un pourcentage ;
- un couple s'écrit **acide/base** (« AH/A⁻ », 2021 N) ;
- l'acide ne cède son proton qu'à une base : aucun H⁺ libre n'apparaît dans une équation de réaction
  (seulement dans la demi-équation d'un couple).

Flèche provisoire : en partie 2, l'équation de l'acide avec l'eau s'écrit avec « → » et la mention
« flèche provisoire : la partie 4 dira laquelle convient » ; `double-fleche` la remplace (§8.3,
question 4).

### 3.3 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `solution` | **nouvelle, type nouveau** | voir ci-dessous |
| `avancement` | copie adaptée de `table` (`web/src/components/pilote/exponentielle-scenes-b.js`, ou celle de `suites-scenes-b.js`) | le tableau d'avancement, case par case |
| `barres` | copie adaptée de `comptes` (`radioactivite-scenes-b.js`) ; curseurs sur le modèle de `aston` (`noyaux-scenes-b.js`) | les deux barres x_max et x_f, τ ; les curseurs C et pH |
| `bac` | copie de `bac` (`radioactivite-scenes-c.js`) | la copie du sujet, ligne à ligne |
| `quiz`, `end` | copies de `noyaux-scenes-c.js` | les pièges des copies ; le bilan (cinq lignes) |

Les outils de `radioactivite-outils.js` (`outilsScene`, `fr`, `sciF`) s'importent tels quels.

**Scène nouvelle `solution`** (décision du propriétaire, 07 §3).
- *Pourquoi un type nouveau* : aucune scène existante ne dessine un bécher, un pH-mètre ni des
  molécules qui échangent un proton. `des` (les cent dés) est la plus proche par la structure (cent
  objets à deux états, des tics à graine fixe, un graphe couplé, des séries « grandes » lissées) : on
  en reprend l'architecture, pas le dessin. C'est la porte de cinq tirets (`2.2.1.3`, `.4`, `.5`,
  `.6`, et SVT `2.2.3.6`) et elle servira aux autres leçons de chimie (dosage, dilution, C4).
- **Jeu `becher`** : un ou deux béchers étiquetés (nom de l'acide, C), la sonde et l'afficheur d'un
  pH-mètre ; une fiole jaugée pour la dilution. Paramètres : `flacons` (1 ou 2), `acide` (`'hcl'`,
  `'ethan'`, `'propan'`), `C`, `ph` (0 : afficheur « - - , - » ; 1 : la valeur, calculée par les
  outils), `dil` (1 ou 10). Avant un pari, l'afficheur du flacon parié reste masqué (M9).
- **Jeu `zoom`** : une loupe circulaire sur le bécher ; 100 molécules en grille 10 × 10 (AH : disque
  plein avec son proton ; A⁻ : disque ouvert marqué −) ; des jetons H₃O⁺ (petits triangles) posés dans
  les interstices ; le transfert d'un proton s'anime en arc d'une molécule à l'autre ; à droite, le
  graphe n(A⁻) en fonction du tic (axes 0 à 30 tics, 0 à 20 molécules), les points du bocal, et la
  courbe lisse du « bécher » ; en coin, le pH-mètre couplé à la courbe lisse (jamais aux points, qui
  fluctuent : M6). Paramètres : `acide` (`'ethan'`, `'hcl'`, ou `'nh3'` : une molécule NH₃ et
  quelques molécules d'eau en gros plan, sans compte), `depart` (`'acide'` : 100 AH ; `'ions'` : 100
  A⁻ et 100 H₃O⁺, seconde série figée, étape `sens`), `tic` (continu ; partie entière = le
  tic, partie décimale = l'animation des transferts), `graph`, `lisse`, `ring` (indice de la molécule
  encadrée, ou −1), `hist` (l'histoire de la molécule encadrée), `cpt` (les deux compteurs), `eq`
  (bandeau : 0 rien, 1 flèche simple, 2 ⇄ avec 1 et 2), `etiq` (« état d'équilibre »), `vol` (1 ou 10 :
  le bocal s'agrandit, les molécules s'espacent), `vign` (la vignette de `inverse`).
- **Le modèle (dans les outils, figé, vérifié par le code)** : à chaque tic, chaque AH cède son proton
  avec la probabilité p_d ; chaque A⁻ en reprend un avec la probabilité k·n(H₃O⁺)/vol (une rencontre
  efficace avec un H₃O⁺, plus rare si le volume est plus grand). Le palier moyen vérifie
  n²/((100 − n)·vol) = p_d/k : c'est la même relation que celle qui fixe τ dans un vrai bécher, le
  rapport p_d/k est calé pour que τ = 3,95 % à C = 1,0 × 10⁻² mol·L⁻¹, et le code vérifie que le
  bocal dilué (vol = 10) donne τ = 11,95 %. Valeurs proposées : p_d = 0,01, k = 0,06 (le compte
  moyen vaut encore ≈ 3 au tic 5, sous le palier). Pour l'acide chlorhydrique : p_d = 1, k = 0. La
  série de tics vient d'une graine **choisie puis figée** ; le code vérifie ses contraintes : au
  palier (tics 10 à 40), le compte reste entre 2 et 7 ; la molécule encadrée par `qui` redevient AH
  entre les tics 31 et 35 ; sur la fenêtre de `vitesses`, cédés et repris diffèrent de 1 au plus ;
  au tic 5, le compte est sous 4. M3 : tout l'état se calcule depuis `tic` ; aller, retour, saut
  donnent la même image.
- **Note de bas de scène, toujours visible en jeu `zoom`** (M6) : « Un modèle : 100 molécules d'acide
  au lieu de milliards de milliards ; l'eau, partout autour, n'est pas dessinée ; un tic n'est pas une
  durée mesurée. »
- Lisible à 390 px (M5) : glyphes de molécule de 30 unités au moins ; au plus quatre étiquettes à la
  fois ; les valeurs (C, pH) dans le sous-titre ou l'afficheur, pas sur les molécules.
- L'élève manipule : le bouton « Tic suivant » (`ctl:'tic'`, étape `premiers-tics`), verrouillé
  après le 5ᵉ clic.

**Scène copiée `avancement`** : colonnes AH, H₂O, A⁻, H₃O⁺ ; lignes « état initial (x = 0) », « en
cours (x) », « état final (x_f) » ; paramètres `cases` (nombre de cases montrées, dans l'ordre de
lecture), `lit` (0 littéral, 1 numérique), `fx` (une case mise en évidence). L'élève ne remplit pas
les cases à la main : le moteur n'a pas de saisie dans la scène (une demande à part, §8.3 question 2) ;
les cases sont l'objet des questions du panneau.

**Scène copiée `barres`** : deux barres verticales sur le même axe, x_max et x_f, l'écart grisé et
τ au-dessus ; jeu `curseurs` (C de 10⁻³ à 10⁻¹ mol·L⁻¹ à trois crans ; pH de −log C à 6 par pas de
0,1, la borne basse imposée : τ ≤ 1). Le curseur pH ne descend jamais sous −log C (« un acide ne
fournit pas plus de H₃O⁺ qu'il n'a de molécules »).

---

### Partie 0 : Ce qu'il faut savoir (scène `avancement`, puis `solution` jeu `becher`)

- **`sav-test`** · `ctl:'saut'` (juste du premier coup : bouton vers `deux-flacons`) · **V** « C =
  1,0 × 10⁻² mol·L⁻¹, V = 100 mL. n = ? » ✓ 1,0 × 10⁻³ mol. ✗ 1,0 mol : V laissé en mL (+7) → passe
  en litres : 100 mL = 0,100 L. ✗ 0,10 mol : C divisée par V (+7) → n = C × V.
- **`sav-ph`** · jeu `becher`, `ph:1` · **V** (`2.2.1.3`) « Le pH-mètre affiche 3,0. [H₃O⁺] = ? »
  ✓ 1,0 × 10⁻³ mol·L⁻¹. ✗ 3,0 mol·L⁻¹ : le pH pris pour une concentration (+2) → [H₃O⁺] = 10^(−pH).
  ✗ 1,0 × 10³ mol·L⁻¹ : le signe de l'exposant perdu → plus le pH est grand, moins il y a d'ions
  H₃O⁺. `apres` : à la calculatrice, 10^(−3,4) ≈ 4,0 × 10⁻⁴.
- **`sav-rappel`** · scène `avancement`, `cases:0` · deux rappels : le tableau d'avancement (trois
  lignes) ; x_max, c'est l'avancement qui épuise le réactif limitant. Pas d'action.

### Partie 1 : L'énigme (scène `solution`, jeu `becher`, `flacons:2`)

- **`deux-flacons`** · `ph` : 1 sur l'acide chlorhydrique, 0 sur l'acide éthanoïque · texte : même C ;
  chaque molécule porte un proton à céder ; le premier afficheur lit 2,0. **P** « Dans l'acide
  éthanoïque, le pH-mètre affiche… » options : « 2,0 aussi : même concentration, autant de protons à
  céder » / « plus de 2,0 » / « moins de 2,0 : c'est le vinaigre, il est plus acide ». `reveal` :
  l'afficheur passe à 3,4. Conception +1 (même concentration, même pH). Retours sans jugement ; celui
  de la 1ʳᵉ option : « C'est ce que prévoit le calcul si chaque molécule cède son proton. Le pH-mètre
  dit autre chose. »
- **`ecart`** · **Q** « 3,4 au lieu de 2,0 : combien de fois moins d'ions H₃O⁺ ? » ✓ environ 25 fois
  (10^1,4). ✗ 1,4 fois : la différence des pH lue comme un rapport (+2) → une unité de pH, c'est un
  facteur 10. ✗ 1,7 fois : le rapport des pH (+2) → compare les concentrations 10^(−2,0) et
  10^(−3,4).
- **`question`** · `fort` : « Même concentration, même proton à céder. Où sont passés les protons qui
  manquent ? » Pas d'action.

### Partie 2 : Acide et base (scènes `solution` jeu `zoom`, `avancement`)

- **`bronsted`** · tag `1923` · jeu `zoom`, `acide:'nh3'` (une molécule NH₃ et des molécules d'eau en
  gros plan, sans compte) · texte : l'ammoniac NH₃, dissous dans l'eau, donne une solution basique
  (chapeau du sujet 2020 N) ; la molécule NH₃ ne contient pourtant aucun ion HO⁻. **P** « D'où
  viennent les ions HO⁻ de la solution ? » options : « NH₃ en cache dans sa molécule et les libère » /
  « NH₃ arrache un proton H⁺ à une molécule d'eau, qui devient HO⁻ » / « de l'eau seule : NH₃ n'y est
  pour rien ». `reveal` : le proton passe de H₂O à NH₃ (NH₄⁺, HO⁻). `apres` : en 1923, Brønsted et
  Lowry, chacun de son côté, définissent un [[acide]] comme une espèce qui peut céder un proton H⁺,
  une [[base]] comme une espèce qui peut en capter un [V, §8.2 point 4]. Conception +3 (une base,
  c'est une espèce qui contient HO⁻). Aucune phrase sur ce qui « clochait » avant 1923 (non sourcé).
- **`acide`** · **Q** (`2.2.1.1`) « CH₃COOH est un acide : il peut céder un proton. L'espèce qui
  reste ? » ✓ CH₃COO⁻. ✗ CH₃COOH₂⁺ : un proton ajouté au lieu de retiré → céder, c'est perdre H⁺ : la
  charge baisse de 1. ✗ HO⁻ (+3) → la base qui reste garde tout l'acide, sauf un H⁺.
- **`couple`** · tex AH ⇄ A⁻ + H⁺ (demi-équation du [[couple]] AH/A⁻ ; les A⁻ s'appellent la base
  conjuguée) · **Q** « Le couple de l'ion ammonium s'écrit… » ✓ NH₄⁺/NH₃. ✗ NH₃/NH₄⁺ : l'ordre
  inversé → un couple s'écrit acide/base. ✗ NH₄⁺/HO⁻ (+3) → la base du couple est ce qui reste quand
  NH₄⁺ a cédé H⁺.
- **`eau-base`** · scène `zoom`, `acide:'ethan'`, gros plan · **D** puis Q · lignes : CH₃COOH ⇄
  CH₃COO⁻ + H⁺ (r : le couple de l'acide) ; H₂O + H⁺ ⇄ H₃O⁺ (r : l'eau capte le proton : couple
  H₃O⁺/H₂O, ion [[oxonium]]). Pari « L'équation de la réaction ? » ✓ CH₃COOH_(aq) + H₂O_(l) →
  CH₃COO⁻_(aq) + H₃O⁺_(aq) (flèche provisoire). ✗ CH₃COOH → CH₃COO⁻ + H⁺ : la demi-équation prise pour
  l'équation (+4) → un proton ne reste pas seul : il faut la base qui le capte. ✗ CH₃COOH + HO⁻ →
  CH₃COO⁻ + H₂O : c'est la réaction avec la soude, pas avec l'eau (+9) → la base, ici, c'est H₂O.
- **`couples-eq`** · **Q** (`2.2.1.2`) « Les deux couples de cette réaction ? » ✓ CH₃COOH/CH₃COO⁻ et
  H₃O⁺/H₂O. ✗ CH₃COOH/H₂O et CH₃COO⁻/H₃O⁺ : les deux réactifs mis ensemble (+8) → un couple, c'est un
  acide et l'espèce qu'il devient. ✗ CH₃COOH/H₃O⁺ et H₂O/CH₃COO⁻ : deux acides ensemble (+8) → chaque
  couple a un acide et une base, qui diffèrent d'un H⁺.
- **`ampholyte`** · scène `zoom`, `acide:'nh3'` · **Q** « Dans NH₃ + H₂O → NH₄⁺ + HO⁻, l'eau
  joue le rôle… » ✓ d'acide : elle cède un proton (couple H₂O/HO⁻). ✗ de base, comme face à
  l'acide éthanoïque (+5) → face à une base, l'eau cède son proton. ✗ de solvant seulement (+5) → elle
  a perdu un H⁺ : elle a réagi. `apres` : l'eau est un [[ampholyte]] : acide dans H₂O/HO⁻, base dans
  H₃O⁺/H₂O.

### Partie 3 : Jusqu'où l'acide a réagi (scènes `avancement`, `solution` jeu `becher`, `barres`)

Valeurs : acide éthanoïque, C = 1,0 × 10⁻² mol·L⁻¹, V = 100 mL, pH = 3,4.

- **`tableau`** · scène `avancement`, `cases` de 0 à 8, `lit:1` · **D** puis Q · lignes : état
  initial : n(AH) = C·V = 1,0 × 10⁻³ mol, eau en excès, A⁻ et H₃O⁺ : 0 (r : on n'a mis que l'acide) ;
  en cours : 1,0 × 10⁻³ − x, excès, x, x (r : un AH consommé pour un A⁻ et un H₃O⁺ formés). Pari
  « x_max = ? » ✓ 1,0 × 10⁻³ mol : AH est le réactif limitant. ✗ on ne peut pas : il faudrait la
  quantité d'eau (+6) → l'eau est le solvant, en excès : elle ne limite pas. ✗ 1,0 mol : V en mL (+7).
- **`si-totale`** · scène `barres`, x_max seule · **Q** « Si la réaction était totale, [H₃O⁺]_f
  vaudrait C. Le pH serait… » ✓ 2,0 : exactement l'acide chlorhydrique. ✗ −2,0 : le signe perdu
  → pH = −log[H₃O⁺]. ✗ 1,0 × 10⁻² : le pH pris pour [H₃O⁺] (+2).
- **`xf`** · scène `becher`, `ph:1` (3,4) · **D** puis Q (`2.2.1.4`) · lignes :
  [H₃O⁺]_f = 10^(−pH) = 4,0 × 10⁻⁴ mol·L⁻¹ (r : le pH mesuré) ; n(H₃O⁺)_f = x_f (r : le tableau, état
  final ; on néglige les H₃O⁺ venus de l'eau seule). Pari « x_f = ? » ✓ 4,0 × 10⁻⁵ mol. ✗ 4,0 × 10⁻⁴
  mol : la concentration prise pour la quantité (+7) → multiplie par V. ✗ 0,34 mol : le pH pris pour
  une concentration (+2).
- **`comparer`** · scène `barres`, x_f apparaît au `apres` · **Q** « x_f comparé à x_max ? »
  ✓ x_f < x_max : 4 % seulement de l'acide a réagi, et la réaction s'est arrêtée. ✗ x_f = x_max, à la
  précision du pH-mètre près (B-1) → un facteur 25 n'est pas une erreur de mesure. ✗ x_f < x_max : la
  réaction n'a pas encore eu le temps (I-vitesse) → le pH reste 3,4 quand on attend (la loupe le
  montrera, partie 4 ; formulation à vérifier, §8.2 point 3).
- **`tau-def`** · `barres`, τ au-dessus · tex τ = x_f/x_max ([[tauxavancement|taux d'avancement
  final]]) · **V** (`2.2.1.5`) « τ = ? » ✓ 0,040, soit 4,0 %. ✗ 25 : rapport inversé → τ ≤ 1 : x_f au
  numérateur. ✗ 4,0 × 10⁻³ : x_f divisé par C (B-7) → une quantité divisée par une quantité : x_max,
  pas C. `apres` : 0,040 et 4,0 % sont la même valeur ; 0,040 % serait cent fois moins (B-9).
- **`tau-formule`** · **D** puis Q · lignes : τ = x_f/x_max = [H₃O⁺]_f·V/(C·V) (r : le tableau) ;
  τ = 10^(−pH)/C (r : V se simplifie). Pari « Acide chlorhydrique, C = 1,0 × 10⁻² mol·L⁻¹, pH = 2,0 :
  τ = ? » ✓ 1. ✗ 1,0 × 10⁻² : 10^(−pH) seul, C oubliée (B-7) → divise par C. ✗ on ne peut pas sans V
  (I-conclusion) → V s'est simplifié : seuls pH et C comptent.
- **`curseur-ph`** · **M** `ctl:'ph'` · `need` : chaque curseur bougé une fois · scène `barres`, jeu
  `curseurs`. Texte, `fort` : « Une unité de pH de plus : τ divisé par 10. » Une phrase : le curseur
  s'arrête à pH = −log C, là où τ = 1.
- **`limitee`** · **Q** « τ = 0,90. La transformation est… » ✓ limitée : τ < 1, même si 90 % de
  l'acide a réagi. ✗ totale : 90 %, c'est presque tout (B-4, version inverse) → totale veut dire τ = 1.
  ✗ impossible : une transformation limitée réagit à peine (B-4) → limitée veut dire « s'arrête avant
  la fin », pas « presque rien ». `apres` : [[limitee|transformation limitée (non totale)]] :
  x_f < x_max, τ < 1 ; totale : τ = 1.

### Partie 4 : Les deux réactions qui se croisent (scène `solution`, jeu `zoom`)

Voir la figure-clé (§3). Valeurs : acide éthanoïque, C = 1,0 × 10⁻² mol·L⁻¹ ; palier τ = 4 %.

- **`loupe`** · `tic:0` · texte : on regarde la solution à la loupe, au moment du mélange ; 100
  molécules d'acide ; l'eau partout autour. Nomme les acteurs : AH, H₂O, et ceux qui vont apparaître,
  A⁻ et H₃O⁺. Pas d'action. (Pré-entraînement, 02 §4.3 règle 6.)
- **`transfert`** · `seq` : un transfert, 1,5 s · **Q** « La molécule d'eau qui a capté le proton est
  devenue… » ✓ un ion H₃O⁺. ✗ un ion HO⁻ : les rôles inversés (+5) → elle a gagné un H⁺, pas perdu.
  ✗ une molécule d'eau inchangée : l'eau n'est que le solvant (+5) → regarde le proton : il est sur
  elle.
- **`inverse`** · `vign:1` (une paire A⁻ / H₃O⁺ en gros plan, hors du compte) · **Q** « Cet ion A⁻
  croise un ion H₃O⁺. Que peut-il se passer ? » ✓ A⁻ capte le proton de H₃O⁺ : AH et H₂O se
  reforment. ✗ rien : A⁻ est un produit, une réaction ne revient pas en arrière (B-5) → A⁻ est une
  base : il peut capter un proton. ✗ A⁻ cède encore un proton : il n'en a plus à céder (+3) → A⁻ est la
  base du couple. `apres` : le proton repasse (1,5 s) ; en PC et SM : une rencontre qui réagit est un
  [[chocefficace|choc efficace]].
- **`premiers-tics`** · **M** `ctl:'tic'` · `need` : 5 clics (ou « Montre-moi » après 20 s) · à chaque
  clic, les transferts du tic s'animent (dans les deux sens) ; `graph:1`, un point par tic. Texte : à
  chaque tic, quelques AH cèdent leur proton ; quelques A⁻ en reprennent un.
- **`attendre`** · pari 1/3 · `tic:5` · **P** « On laisse tourner 25 tics de plus. Le nombre de A⁻… »
  options : « monte jusqu'à 100 : chaque AH finira par céder son proton » / « monte encore un peu,
  puis reste autour d'une même valeur » / « redescend à 0 : le sens inverse finit par tout défaire ».
  `reveal` : `tic:5→30` en 3 s. Conception B-1 (il suffit d'attendre). Retour de la 1ʳᵉ : « Plus il y a
  de A⁻ et de H₃O⁺, plus ils se rencontrent : le retour finit par compenser l'aller. »
- **`palier`** · `lisse:1` · **Q** « Au palier, en moyenne 4 molécules sur 100 ont cédé leur proton.
  τ dans le bocal ? » ✓ 0,04 : ce que le pH-mètre disait. ✗ 4 : un nombre de molécules, pas un rapport
  → divise par les 100 du départ. ✗ 0,96 : la part des AH restés (+10) → τ compte ce qui a réagi.
  `apres` : « Dans un vrai bécher, des milliards de milliards de molécules : le compte ne fluctue
  plus, c'est la courbe lisse. »
- **`qui`** · pari 2/3 · `tic:30, ring:i` · **P** « Au tic 35, cette molécule encadrée… » options :
  « est encore A⁻ : le compte ne bouge plus, donc plus rien ne réagit » / « a pu redevenir AH, et une
  autre a pris sa place » / « a quitté la solution ». `reveal` : `tic:30→35`, `hist:1` (elle redevient AH
  au tic fixé par la graine ; le compte reste autour de 4). Conception B-3.
- **`vitesses`** · pari 3/3 · `cpt:0` · **P** « Pendant dix tics au palier : protons cédés (sens
  direct) et protons repris (sens inverse) ? » options : « plus de cédés : la réaction directe gagne
  toujours » / « autant, à un près » / « zéro et zéro : tout est arrêté ». `reveal` : `cpt:1`, `tic:35→45`,
  les deux compteurs. Conceptions B-3, B-5. `apres`, `fort` : « Au palier, les deux réactions continuent,
  à la même vitesse. »
- **`double-fleche`** · `eq:1` · **Q** « Comment écrire l'équation ? » ✓ avec ⇄ : les deux réactions
  ont lieu en même temps. ✗ avec →, en ne gardant que le sens direct, qui l'a emporté au début (B-5) →
  la flèche simple dit que l'acide disparaît : ici, il en reste 96 %. ✗ avec ⇄ parce que la réaction
  est lente (I-lente) → la double flèche ne dit rien de la vitesse. `apres` : `eq:2`, CH₃COOH_(aq) +
  H₂O_(l) ⇄ CH₃COO⁻_(aq) + H₃O⁺_(aq), sens 1 et sens 2 (forme du sujet 2012).
- **`equilibre`** · `etiq:1` · **Q** (`2.2.1.6`) « À l'[[equilibre|état d'équilibre]], ce qui ne change
  plus, c'est… » ✓ la quantité de chaque espèce. ✗ chaque molécule : celle qui est A⁻ le reste (B-3)
  → tu l'as vu : la molécule encadrée a changé. ✗ rien : les vitesses sont devenues nulles (B-3, I-lente)
  → elles sont égales, pas nulles. `apres` : en SVT, l'étape porte la mention « idée du chapitre
  suivant (équilibre dynamique) ».
- **`hcl-zoom`** · `acide:'hcl'`, `tic:0→10` au `apres` · **Q** « La même loupe sur l'acide
  chlorhydrique (τ = 1). Au palier, combien de Cl⁻ sur 100 ? » ✓ 100 : le sens inverse est
  négligeable, l'équation s'écrit avec →. ✗ 4, comme l'acide éthanoïque (+1) → τ = 1 : toutes ont
  cédé. ✗ 50 : moitié aller, moitié retour (B-3) → l'équilibre n'est pas « moitié-moitié » : c'est
  l'égalité des vitesses.

### Partie 5 : L'équilibre et ses pièges (scènes `barres`, `solution`)

- **`rappel`** · scène `barres` (x_max seule) · `sujet:'τ par le pH'` · texte : mi-parcours, c'est le
  bon moment pour une pause ; un rappel avant de repartir. **V** « C = 1,0 × 10⁻² mol·L⁻¹, pH = 3,0.
  τ = ? » ✓ 0,10. ✗ 1,0 × 10⁻³ : 10^(−pH) seul (B-7) → divise par C. ✗ 10 : rapport inversé → τ ≤ 1.
- **`catalyseur`** · **Q** « Un [[catalyseur]] accélère une réaction sans être consommé. Peut-il
  rendre τ égal à 1 pour une transformation limitée ? » ✓ non : il fait atteindre l'équilibre plus
  vite, sans le déplacer. ✗ oui, s'il y en a assez (B-2) → il accélère les deux sens autant. ✗ oui,
  avec assez de temps (B-1) → le palier ne bouge pas quand on attend. Mention : « tu le reverras avec
  l'estérification » (`pc-pc 2.4.1.6`).
- **`vitesse-avancement`** · **Q** « La réaction de l'acide éthanoïque avec l'eau atteint son
  équilibre très vite. Qu'en conclure sur τ ? » ✓ rien : vitesse et avancement final sont deux
  questions séparées. ✗ qu'elle est totale : rapide, donc elle va au bout (I-vitesse) → elle est rapide
  et τ = 4 %. ✗ qu'elle devrait avoir ⇄ parce qu'elle est rapide (I-lente) → ⇄ dit « deux sens », pas
  une vitesse. (Affirmation « très vite » : à sourcer, §8.2 point 3.)
- **`quasi-totale`** · sujet 2012 N, Ex. de chimie, 1-3 (1 pt) : acide éthanoïque + ammoniac, écrite
  avec ⇄ ; le sujet demande de « s'assurer que la transformation est totale » ; τ ≈ 0,99 (cité ; son
  calcul passe par K, chapitre suivant) · **Q** « ⇄ dans l'équation, et pourtant “totale” : une
  contradiction ? » ✓ non : ⇄ dit que les deux sens existent, τ dit jusqu'où ; τ ≈ 0,99, c'est
  pratiquement totale. ✗ oui : avec ⇄, τ reste loin de 1 (I-quasi) → τ ne se lit pas sur la flèche,
  il se calcule. ✗ oui : le sujet s'est trompé (I-conclusion) → c'est τ qui tranche.
- **`sens`** · scène `solution` jeu `zoom`, `tic:0`, `depart:'ions'` (A⁻ et H₃O⁺, aucun AH) · texte : on mélange de l'éthanoate de sodium (des ions A⁻) et de l'acide chlorhydrique
  (des ions H₃O⁺), ajouté en dernier ; aucune molécule CH₃COOH au départ. **Q** « Il se forme… »
  ✓ de l'acide éthanoïque : A⁻ et H₃O⁺ sont les réactifs du sens 2. ✗ des ions éthanoate en plus : un
  acide ajouté fait avancer le sens direct (B-6) → regarde les réactifs présents, pas l'ordre des
  ajouts. ✗ rien : la réaction va de l'acide vers sa base, jamais l'inverse (B-5) → le sens qui avance
  dépend de ce qu'on met. `apres` : `tic:0→15`, des AH apparaissent ; le prévoir par le calcul,
  c'est la leçon « évolution spontanée ».

### Partie 6 : La dilution (scène `solution`) · SVT `2.2.3.6` ; PC et SM : enrichissement, annonce de `2.2.2.5`

- **`dilution-pari`** · jeu `zoom`, `vol:1→10` (le bocal s'agrandit), compte au palier 4 · tag
  facultatif `1888` (§8.3, question 6) · **P** « On dilue la solution 10 fois. Le taux d'avancement
  final… » options : « ne change pas : c'est le même acide » / « augmente » / « diminue : il y a moins
  d'acide par litre ». `reveal` : `tic:45→75`, nouveau palier ≈ 12 (courbe lisse 11,95 %). Conceptions
  +11 et I-conditions. Retour de la 1ʳᵉ : « Le même acide, mais A⁻ et H₃O⁺ se rencontrent moins souvent :
  le retour ralentit. »
- **`dilution-calc`** · jeu `becher`, `dil:10`, `ph:1` (3,92) · **V** « Après dilution, C = 1,0 × 10⁻³
  mol·L⁻¹ et pH = 3,92. τ = ? » ✓ 0,12 (12 %). ✗ 1,2 × 10⁻² : la concentration d'avant la dilution
  (+7) → C a été divisée par 10. ✗ 0,040, comme avant (I-conditions) → recalcule avec le nouveau pH.
- **`dilution-pourquoi`** · **Q** « Pourquoi τ augmente-t-il ? » ✓ dilués, A⁻ et H₃O⁺ se rencontrent
  plus rarement : le sens 2 ralentit, l'équilibre s'établit plus loin. ✗ l'eau ajoutée cède des
  protons en plus (+5) → les H₃O⁺ viennent de l'acide : l'eau les capte. ✗ l'acide devient plus fort
  (+12) → sa nature n'a pas changé : c'est l'état initial qui a changé.

### Partie 7 : Retour à l'énigme (scène `solution`)

- **`retour`** · jeu `becher` puis `zoom` côte à côte, `flacons:2` · texte dépendant du pari
  `deux-flacons` (forme de `rappelEnigme`) : dans l'acide chlorhydrique, τ = 1 ; dans l'acide
  éthanoïque, τ = 0,04 : les protons « manquants » sont restés sur les molécules d'acide, pas toujours
  les mêmes. `fort` : « Le pH dit jusqu'où l'acide a réagi. » Pas d'action.
- **`retour-ph`** · **Q** « Une solution d'acide éthanoïque a un pH de 2,0. Sa concentration est… »
  ✓ plus grande que 1,0 × 10⁻² mol·L⁻¹ : τ < 1, il faut plus d'acide pour autant de H₃O⁺. ✗ égale à
  1,0 × 10⁻² mol·L⁻¹, comme l'acide chlorhydrique (+1) → c'est vrai seulement si τ = 1. ✗ plus petite
  (B-4) → l'acide éthanoïque cède moins de protons, pas plus.

### Partie 8 : Au bac (scènes `bac`, `avancement`) : voir §6

`bac`, `bac-eq`, `bac-ed`, `bac-conclure`, `bac-2a`, `bac-2b`.

### Partie 9 : Bilan (scènes `quiz`, `end`)

- **`q1`** · la copie fautive (sujet 2022 N, 1.2) · **V** « Une copie écrit : τ = C/[H₃O⁺] =
  5 × 10⁻²/7,9 × 10⁻⁴ ≈ 63. Son erreur ? » ✓ le rapport est inversé : τ = [H₃O⁺]_f/C ≈ 1,6 × 10⁻²,
  et τ ≤ 1 l'aurait signalé. ✗ elle a oublié V (I-conclusion) → V se simplifie. ✗ aucune : un τ
  grand veut dire une réaction totale (B-4) → τ ne dépasse jamais 1.
- **`q2`** · **Q** (`2.2.1.1`) « Laquelle de ces espèces est une base selon Brønsted ? » ✓ CH₃COO⁻ :
  elle peut capter un proton. ✗ H₃O⁺ (+3) → il peut céder un proton : c'est un acide. ✗ aucune, faute de
  HO⁻ (+3) → une base capte un proton, elle n'a pas à contenir HO⁻.
- **`q3`** · **Q** « 2021 N : “Montrer que τ ≈ 1,32 %”. On trouve 0,0132. C'est… » ✓ la même valeur.
  ✗ 100 fois trop petit (B-9) → 0,0132 × 100 = 1,32 %. ✗ faux, car τ s'exprime en mol (B-7) → τ est un
  rapport, sans unité.
- **`fin`** · scène `end` (cinq lignes : un acide cède un proton à une base, ici l'eau : AH + H₂O ⇄
  A⁻ + H₃O⁺ ; x_max = C·V, x_f = 10^(−pH)·V ; τ = x_f/x_max = 10^(−pH)/C, τ < 1 : limitée ; à
  l'équilibre, les deux réactions continuent à la même vitesse ; diluer augmente τ) · la fin de séance
  (forme de `profileHTML`) : les « Vérifie » réussies, les paris `deux-flacons`, `bronsted`,
  `attendre`, `qui`, `vitesses`, `dilution-pari` rappelés, et le renvoi piège par piège (B7) :
  pH ↔ [H₃O⁺] → gabarit 3 ; Brønsted, couples → 1, 2 ; tableau, x_max → 4 ; x_f, V oublié → 5 ;
  τ inversé, C oubliée, % → 6 ; limitée = rien, τ ≈ 1 → 7 ; équilibre figé, attendre, catalyseur → 8 ;
  dilution → 9 ; copie du bac → 10.

---

## 4. La pause et le rappel (A8)

La pause est proposée en tête de la partie 5, dans le texte de l'étape **`rappel`**, **32ᵉ étape sur
51 (63 %)**, à la frontière d'acte qui suit la figure-clé (02 §4.7 : la pause à une frontière d'acte).
Sa question « Vérifie » : **τ pour C = 1,0 × 10⁻² mol·L⁻¹ et pH = 3,0** (✓ 0,10). Elle rappelle la
partie 3 après onze étapes de loupe (espacement), et rejoue les deux leurres de calcul les plus
fréquents (C oubliée, rapport inversé).

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 1
(`sav-rappel` ; `question` ; `loupe` ; `premiers-tics`, une manipulation ; `retour` ; `bac-ed` ;
`fin`). Contrôle M7 : la scène change de paramètre visible à chaque étape de la partie 4 ; aucune
suite de plus de trois étapes devant une scène immobile. A6 : aucune option « je ne sais pas ».
A4 : chaque option fausse des **Q** et **V** porte un `indice` (à écrire par l'auteur).

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Sources : bible C3, « Conceptions erronées et pièges » (B-) ;
`content/pc/transformations-deux-sens/items.yaml`, les onze `misconceptions` (I-, id abrégé) ;
ajoutées ici, avec leur raison (+).

| # | Conception | Source | Étapes |
|---|---|---|---|
| B-1 | toute réaction finit par consommer ses réactifs, il suffit d'attendre | bible ; `reaction-toujours-totale` | `comparer`, `attendre`, `catalyseur` |
| B-2 | assez de catalyseur la pousse jusqu'au bout | bible ; `catalyseur-ou-temps-change-etat-final` | `catalyseur` |
| B-3 | à l'équilibre, plus rien ne réagit | bible ; `equilibre-coexistence-signifie-arret` | `qui`, `vitesses`, `equilibre`, `hcl-zoom` |
| B-4 | limitée = il ne se passe presque rien | bible ; `limitee-rien-ne-se-passe` | `limitee`, `retour-ph`, `bac-conclure`, `q1` |
| B-5 | le sens est une propriété fixe de la réaction | bible ; `sens-propriete-fixe` | `inverse`, `vitesses`, `double-fleche`, `sens` |
| B-6 | c'est l'espèce ajoutée qui impose le sens | bible ; `presence-produit-determine-sens` | `sens` |
| B-7 | τ calculé avec C au lieu de x_max (ou C oubliée) | bible | `tau-def`, `tau-formule`, `rappel`, `q3` |
| B-8 | [H₃O⁺] confondu avec C | bible | `deux-flacons`, `si-totale`, `hcl-zoom`, `retour-ph` (= +1) |
| B-9 | piège de copie : τ en fraction et en pourcentage mélangés | bible | `tau-def`, `q3` |
| I-vitesse | une réaction lente (ou rapide) a un τ déterminé par sa vitesse | `vitesse-implique-avancement` | `comparer`, `vitesse-avancement` |
| I-lente | le mélange se stabilise parce que la réaction est devenue lente ; ⇄ veut dire « lente » | `double-fleche-signifie-lente` | `double-fleche`, `equilibre`, `vitesse-avancement` |
| I-quasi | une réaction à ⇄ reste toujours loin de τ = 1 | `reversible-jamais-quasi-totale` | `quasi-totale` |
| I-conclusion | refuser de conclure alors que l'information suffit (« il manque V ») | `conclusion-refusee-a-tort` | `tau-formule`, `quasi-totale`, `bac`, `q1` |
| I-conditions | l'état final est fixé par l'équation, quoi qu'on fasse | `conditions-physiques-sans-effet` | `dilution-pari`, `dilution-calc` |
| +1 | même concentration, même pH (force et concentration confondues) | ajoutée : le leurre naturel de l'énigme ; bible C5 | `deux-flacons`, `hcl-zoom`, `retour-ph` |
| +2 | le pH lu comme une grandeur proportionnelle (différence de pH lue comme un rapport ; pH pris pour une concentration) | ajoutée : prérequis du chapitre | `sav-ph`, `ecart`, `si-totale`, `xf` |
| +3 | une base est une espèce qui contient HO⁻ (réflexe d'avant Brønsted) | ajoutée : `2.2.1.1` | `bronsted`, `acide`, `couple`, `inverse`, `q2` |
| +4 | la demi-équation prise pour l'équation (H⁺ libre) | ajoutée : `2.2.1.2` | `eau-base`, `bac-eq` |
| +5 | l'eau n'est qu'un solvant, ou son rôle est fixe | ajoutée : `2.2.1.2` (ampholyte) | `ampholyte`, `transfert`, `dilution-pourquoi` |
| +6 | l'eau limite x_max, ou il faut sa quantité | ajoutée : forme des tableaux des sujets (« excès ») | `tableau` |
| +7 | concentration et quantité confondues (V oublié ou en mL) | ajoutée : bible §2.3 | `sav-test`, `tableau`, `xf`, `dilution-calc` |
| +8 | couples mal formés (les deux réactifs ensemble) | ajoutée : `2.2.1.2` | `couples-eq` |
| +9 | la réaction de l'acide avec l'eau confondue avec celle du dosage (HO⁻) | ajoutée : 2022 N pose les deux à la suite (1.1 et 2.1) | `eau-base`, `bac-eq` |
| +10 | réactif et produit échangés dans le tableau ; α pris pour τ | ajoutée : 2023 N, 1.2 | `palier`, `bac-2a`, `bac-2b` |
| +11 | diluer diminue τ (« moins d'acide ») | ajoutée : `pc-svt 2.2.3.6` | `dilution-pari` |
| +12 | la dilution change la nature de l'acide | ajoutée : annonce de `2.2.2.4` | `dilution-pourquoi` |

Toutes les conceptions de la fiche bible et les onze de `items.yaml` sont affrontées. Limite connue :
B-6 n'a qu'une étape (`sens`) ; sa forme complète (« on ajoute un produit à l'équilibre ») demande
Q_r et K, et revient dans la leçon C7.

**Pari → conception que sa révélation réfute** (la liste demandée par B5, pour les sept paris de
prédiction) : `deux-flacons` → +1, B-8 ; `bronsted` → +3 ; `attendre` → B-1 ; `qui` → B-3 ;
`vitesses` → B-3 (et B-5) ; `dilution-pari` → +11, I-conditions ; `bac` (premier geste) →
I-conclusion.

---

## 6. Au bac (B6)

**L'exemple commenté** : bac PC 2022, session normale (NS 28F), Exercice 1, Partie 2 « Étude de
quelques propriétés d'une solution aqueuse d'acide propanoïque », §1, questions 1.1 (0,5 pt) et 1.2
(0,75 pt), barème imprimé en marge (`docs/sujets/pc/reactions-acido-basiques.md`, entrée 2022, statut
vérifié, quatre passes). Données : C_a = 5 × 10⁻² mol·L⁻¹ ; pH = 3,1. Aucun volume n'est donné.

- **`bac`** · scène `bac` · « Question 1.2 : calculer τ. Que peut-on conclure ? Premier geste ? » (pari
  sans `ok`, décision §9.8 de la spec noyaux ; `reveal` : la ligne τ = x_f/x_max s'écrit). Options :
  « Écrire la définition τ = x_f/x_max, puis exprimer x_f et x_max avec le tableau, V en lettres » (le
  bon réflexe) ; « Il manque le volume V : on ne peut pas calculer » (I-conclusion : V se simplifiera) ;
  « Poser τ = pH/C_a » (une formule inventée : τ se définit par des avancements).
- **`bac-eq`** · **Q** 1.1 (0,5 pt) « L'équation de la réaction entre l'acide propanoïque et l'eau ? »
  ✓ C₂H₅COOH_(aq) + H₂O_(l) ⇄ C₂H₅COO⁻_(aq) + H₃O⁺_(aq). ✗ C₂H₅COOH ⇄ C₂H₅COO⁻ + H⁺ (+4). ✗ C₂H₅COOH +
  HO⁻ ⇄ C₂H₅COO⁻ + H₂O : c'est l'équation du dosage, question 2.1 du même sujet (+9).
- **`bac-ed`** · **D**, commenté, sans action (pensée d'expert à voix haute) : « je pose le tableau :
  x_max = C_a·V, AH limitant, l'eau en excès » ; « je lis x_f sur la ligne finale : x_f = n(H₃O⁺)_f =
  10^(−pH)·V » ; « j'écris τ en lettres d'abord : τ = 10^(−pH)·V/(C_a·V) = 10^(−pH)/C_a, V disparaît,
  c'est pour cela que le sujet ne le donne pas » ; « je remplace : τ = 10^(−3,1)/(5 × 10⁻²) ≈ 1,6 × 10⁻²,
  soit 1,6 % » ; « je contrôle : τ ≤ 1 ». La formule littérale avant le nombre : consigne imprimée des
  sujets (`radioactivite-outils.js`, source 10).
- **`bac-conclure`** · **Q** 1.2, seconde moitié « Que peut-on conclure ? » ✓ τ < 1 : la
  transformation est limitée (non totale). ✗ τ ≈ 0 : l'acide ne réagit pas avec l'eau (B-4) → 1,6 %
  des molécules ont réagi : peu, mais pas rien. ✗ la réaction est lente (I-vitesse) → τ ne dit rien
  de la vitesse. `apres`, `html` (forme de `bac-copie`) : la rédaction attendue en quatre lignes ;
  barème 0,5 + 0,75 (cité du sujet). Aucune phrase sur ce que « le correcteur » attend au-delà.

**Le second exemple, que l'élève complète** : bac PC 2023, session normale (NS 28F), Exercice 1, §1
« Étude d'une solution aqueuse d'acide éthanoïque », questions 1.1 (0,5 pt) et 1.2 (0,75 pt),
barème imprimé (`docs/sujets/pc/etat-equilibre.md`, entrée 2023, statut vérifié). Données :
C_A = 5 × 10⁻² mol·L⁻¹ ; pH = 3,05 ; α(CH₃COOH) = [CH₃COOH]_éq/([CH₃COOH]_éq + [CH₃COO⁻]_éq).
« En vous aidant du tableau d'avancement, montrer que α = 1 − τ. » L'élève choisit deux lignes :

- **`bac-2a`** · scène `avancement`, `lit:0` · **Q** « Ligne finale du tableau : n(CH₃COOH)_éq = ? »
  ✓ C_A·V − x_f. ✗ x_f : réactif et produit échangés (+10) → x_f, c'est ce qui s'est formé. ✗ C_A·V :
  l'acide inchangé (B-4) → ce qui a réagi est retiré.
- **`bac-2b`** · **D** puis Q · lignes : α = (C_A·V − x_f)/((C_A·V − x_f) + x_f) (r : même volume
  partout, les concentrations deviennent des quantités) ; α = 1 − x_f/(C_A·V) (r : le dénominateur vaut
  C_A·V). Pari « Donc α = ? et sa valeur ? » ✓ α = 1 − τ ≈ 0,982. ✗ α = τ ≈ 0,018 (+10) → α compte
  l'acide restant. ✗ 1 − 10^(−3,05) ≈ 0,999 : C_A oubliée (B-7) → τ = 10^(−pH)/C_A.

Contrôle B3 sur ces lignes : chaque leurre donne une valeur fausse (§8.1). La copie fautive est
l'étape `q1` du bilan (2022 N, rapport inversé). La question 1.3 du sujet 2023 (pK_A) et 1.3-1.4 du
sujet 2022 (Q_r,éq, pK_A) relèvent des chapitres suivants : la leçon les nomme comme « la suite du
sujet », sans les traiter.

Autres sujets transcrits utilisés sans être l'exemple : 2012 N, 1-3 (`quasi-totale`) ; 2020 N, chapeau
(`bronsted`) ; 2021 N, Partie 2, 2.2 (`q3`, gabarit 10). Non utilisés : 2019 N et 2015 N (τ par la
conductivité, §1.3) ; 2020 N, 2.3 (τ d'une base, §1.3). Sujets 2026 cités par la bible (NS 28F, NS 27F
SVT, SM N) : **non transcrits** dans `docs/sujets/`, ils ne servent pas (seulement relevés dans
`docs/bible/sources/verification-pc.md` §6).

---

## 7. Les exercices générés (fichier de gabarits à créer, format de `exercices/modele.js`)

Format de `web/src/components/pilote/exercices/dipole-rc.js` : réponse calculée ; chaque leurre porte
`fb` et `erreur` (id du §5). **Capacités** : une fonction `CAPT(id)` qui rend `pc-pc id`, `pc-sm id`
et `pc-svt id'` selon la table du §1.1 (2.2.1.1 à 2.2.1.5 → 2.2.3.1 à 2.2.3.5 ; 2.2.1.6 → aucun ;
2.2.3.6 SVT → aucun en PC et SM, marqué enrichissement).

**Règles de tirage communes (B3).**
- Les pH « mesurés » sont calculés par le code à partir d'un pK_A de référence (ceux des sujets :
  4,79 éthanoïque, 2023 N ; 4,89 propanoïque, recalculé du sujet 2022 N ; 4,2 benzoïque et 3,75
  méthanoïque, table du sujet 2021 N), puis **arrondis à deux décimales** (ou une, forme 2022) ;
  **la réponse se calcule depuis le pH affiché**, jamais depuis le pK_A. Le pK_A n'est pas montré.
- Rejet de tout tirage où un leurre calculé tombe à 2 % de la réponse, ou de deux leurres entre eux.
  Coïncidences connues : C = 1 mol·L⁻¹ (alors 10^(−pH) = τ, leurre « C oubliée » = réponse) ;
  pH = −log C (τ = 1 = son inverse) ; et, à pH 3,1 et C = 5 × 10⁻², C/10^(−pH) ≈ 62,9 contre
  pH/C = 62 (les deux leurres ne se montrent jamais ensemble).
- pH entre 2,0 et 5,5 (les H₃O⁺ de l'eau restent négligeables) ; C dans {1,0 ; 2,0 ; 5,0} × 10⁻³ à
  10⁻¹ mol·L⁻¹ ; V dans {50 ; 100 ; 200 ; 250 ; 500} mL.

| # | id | Niveau | Tirage | Capacités (PC/SM) | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `tnt-bronsted` | 1 | une espèce parmi les acides carboxyliques des sujets (éthanoïque, propanoïque, benzoïque, méthanoïque, lactique noté AH), NH₄⁺/NH₃, H₃O⁺, H₂O ; base ou acide conjugué, écriture du couple, rôle de l'eau | 2.2.1.1 | proton ajouté au lieu de retiré ; base = HO⁻ (+3) ; ordre base/acide ; eau à rôle fixe (+5) |
| 2 | `tnt-equation` | 1 | un acide de la liste avec l'eau ; l'équation parmi quatre, puis les deux couples | 2.2.1.2 | demi-équation (+4) ; équation de dosage (+9) ; couples croisés (+8) ; charges non équilibrées |
| 3 | `tnt-ph` | 1 | pH → [H₃O⁺], ou [H₃O⁺] → pH ; comparer deux pH (facteur 10ⁿ) | 2.2.1.3 | pH pris pour une concentration (+2) ; différence lue comme rapport (+2) ; signe de l'exposant |
| 4 | `tnt-tableau` | 2 | forme 2019 N Q2 (0,75 pt) : dresser le tableau littéral (C, V, x, x_f), puis x_max numérique | 2.2.1.4 | eau limitante (+6) ; V en mL (+7) ; x_f dans la colonne de l'acide (+10) |
| 5 | `tnt-xf` | 2 | C, V, pH ; x_max, x_f, la comparaison | 2.2.1.4 | concentration prise pour quantité (+7) ; x_f = x_max à la mesure près (B-1) ; « pas encore fini » (I-vitesse) |
| 6 | `tnt-tau` | 2 | C et pH ; τ en fraction et en % ; forme « Montrer que τ ≈ … » (2021 N) | 2.2.1.5 | C oubliée (B-7) ; rapport inversé ; % mal placé (B-9) ; « il manque V » (I-conclusion) |
| 7 | `tnt-limitee` | 1 | τ donné ou calculé, dont un acide fort (acide chlorhydrique, τ = 1) et le cas 2012 (τ ≈ 0,99 cité) ; conclure : totale, limitée, pratiquement totale ; **aucun τ tiré entre 0,95 et 0,99 hors du cas 2012** | 2.2.1.5 | limitée = rien (B-4) ; ⇄ donc τ loin de 1 (I-quasi) ; « rapide donc totale » (I-vitesse) |
| 8 | `tnt-equilibre` | 2 | questions qualitatives tirées : la molécule encadrée, les deux vitesses au palier, attendre, catalyseur, sens d'un mélange A⁻ + H₃O⁺ ; en SVT, `filieres` sans la question « choc efficace » | 2.2.1.6 (SVT : aucun ; idée de `2.2.4.2`) | équilibre figé (B-3) ; attendre (B-1) ; catalyseur (B-2) ; sens fixe (B-5) ; espèce ajoutée (B-6) ; ⇄ = lente (I-lente) |
| 9 | `tnt-dilution` | 2 | C₀, facteur 10 ou 100, pH avant et après (calculés) ; τ avant, τ après, sens de variation | SVT 2.2.3.6 ; PC/SM : enrichissement | C non divisée (+7) ; τ inchangé (I-conditions) ; τ diminue (+11) ; la nature de l'acide change (+12) |
| 10 | `tnt-bac` | 3 | forme 2022 N (C_a, pH → équation, τ, conclusion) ; forme 2021 N (« montrer que τ ≈ x % », C_a donnée) ; forme 2023 N (α = 1 − τ) ; valeurs imprimées rejouées une fois sur trois | 2.2.1.2, 2.2.1.4, 2.2.1.5 | ceux des étapes `bac-*` ; **rejet si le pH arrondi fait passer τ d'un côté à l'autre d'une valeur demandée « montrer que »** |

Niveaux : 1 = restituer, lire, convertir ; 2 = appliquer une relation à un cas ; 3 = enchaîner
tableau, lecture et relation (format d'une question du bac à 0,75 pt). Chaque question porte `sujet`
(B7). Aucun exercice ne calcule K, K_A, pK_A, ni τ d'une base, ni τ par la conductivité (§1.3).

---

## 8. À vérifier, et questions pour le relecteur

### 8.1 Les données (pour le fichier d'outils)

En tête du fichier, comme `radioactivite-outils.js` : chaque donnée avec sa source et son statut.

| Donnée | Source | Statut |
|---|---|---|
| 2022 N, Ex. 1 P2 §1 : C_a = 5 × 10⁻² mol·L⁻¹, pH = 3,1 ; barème 0,5 + 0,75 | `docs/sujets/pc/reactions-acido-basiques.md` (vérifié, 4 passes) | [V] |
| 2023 N, Ex. 1 §1 : C_A = 5 × 10⁻² mol·L⁻¹, pH = 3,05, définition de α, pK_A1 ≃ 4,79 ; barème 0,5 + 0,75 | `docs/sujets/pc/etat-equilibre.md` (vérifié) | [V] |
| 2021 N, Ex. I P2 §2 : pH = 2,88, « τ ≈ 1,32 % » ; C_a = 0,10 mol·L⁻¹ déduite du dosage (lecture de figure « à confirmer », mais la valeur est verrouillée par le τ imprimé) | `docs/sujets/pc/reactions-acido-basiques.md` | [V] pour les énoncés |
| 2012 N, chimie 1-3 : équation ⇄ « 1 / 2 », pK_A 4,8 et 9,2, n₁ = n₂ = 10⁻³ mol, « s'assurer que la transformation est totale » | `docs/sujets/pc/transformations-deux-sens.md` (vérifié) | [V] |
| 2020 N, chapeau : « L'ammoniac NH₃ est un gaz qui, dissous dans l'eau, donne une solution basique » | `docs/sujets/pc/reactions-acido-basiques.md` | [V] |
| TP n° 3 du cadre (acide chlorhydrique et acide éthanoïque) ; annexe des contenus | `pc-pc.yaml` l. 525, 555 ; `pc-sm.yaml` l. 539, 569 | [V] |
| Brønsted et Lowry, 1923, « independently » ; acide « proton donor », base « proton acceptor » | Wikipédia, [Brønsted–Lowry acid–base theory](https://en.wikipedia.org/wiki/Br%C3%B8nsted%E2%80%93Lowry_acid%E2%80%93base_theory) et [Johannes Nicolaus Brønsted](https://en.wikipedia.org/wiki/Johannes_Nicolaus_Br%C3%B8nsted) (lus le 2026-11-25) | [V] sur les pages |
| Sørensen, 1909, laboratoire Carlsberg, notation d'abord « pH• » ; le sens du « p » est discuté | Wikipédia, [pH](https://en.wikipedia.org/wiki/PH) (lu le 2026-11-25) | [V] sur la page ; fiche de mot `pH` seulement |
| Ostwald, 1888 : pour un électrolyte faible, le degré de dissociation croît avec la dilution (racine carrée de la dilution) | Wikipédia, [Ostwald's dilution law](https://en.wikipedia.org/wiki/Ostwald%27s_dilution_law) (lu le 2026-11-25) | [V] sur la page ; facultatif (§8.3, question 6) |
| valeurs de la leçon : C = 1,0 × 10⁻² mol·L⁻¹, V = 100 mL ; pK_A caché 4,79 (2023 N) | choix d'auteur | — |

**Contrôles faits à la main (le code les refera).** Acide éthanoïque, K_A = 10^(−4,79) = 1,62 × 10⁻⁵ :
C = 10⁻² → x = [H₃O⁺] = 3,95 × 10⁻⁴, pH = 3,40, τ = 3,95 % ; C = 10⁻³ → [H₃O⁺] = 1,20 × 10⁻⁴,
pH = 3,92, τ = 11,95 % ; acide chlorhydrique 10⁻² : pH = 2,0, τ = 1. Énigme : 10^1,4 = 25,1 ; leurres
1,4 et 1,7. `sav-test` : 1,0 × 10⁻³ mol ; leurres 1,0 et 0,10. `xf` : 10^(−3,4) = 3,98 × 10⁻⁴ ;
x_f = 3,98 × 10⁻⁵ mol ; leurres 3,98 × 10⁻⁴ et 0,34. `tau-def` : 0,0398 ; leurres 25,1 et x_f/C =
3,98 × 10⁻³. `rappel` : 0,10 ; leurres 10⁻³ et 10. `palier` : 0,04 ; leurres 4 et 0,96.
`dilution-calc` : 10^(−3,92)/10⁻³ = 0,120 ; leurres 1,20 × 10⁻² et 0,040. Modèle du bocal :
p_d/k = 16/96 = 0,1667 ; dilué (vol = 10), n² + 1,667 n − 166,7 = 0 donne n = 12,1 (12 %). Sujet
2022 : 10^(−3,1) = 7,94 × 10⁻⁴, τ = 1,59 × 10⁻² ; leurres 7,9 × 10⁻⁴, 62,9 (inversé), et pH/C = 62
(écarté, à 1,5 % du précédent). Sujet 2023 : 10^(−3,05) = 8,91 × 10⁻⁴, τ = 1,78 × 10⁻², α = 0,982 ;
leurres 0,018 et 1 − 8,91 × 10⁻⁴ = 0,999. Sujet 2021 : 10^(−2,88)/0,10 = 1,32 × 10⁻². Sujet 2012 :
K = 10^4,4 = 2,51 × 10⁴, τ/(1 − τ) = 158,5, τ = 0,994.

Chaque leurre de calcul a été recalculé : aucun ne retombe sur la bonne valeur. **Coïncidence trouvée
et écartée** : sujet 2022, « C/[H₃O⁺] » (62,9) et « pH/C » (62) sont à 1,5 % l'un de l'autre ; un seul
des deux sert de leurre (`q1` garde le rapport inversé).

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **Le pH 3,4 de l'énigme** est calculé (pK_A 4,79), pas mesuré. Le sujet SVT NS 27F 2026 (non
   transcrit) imprime pH 3,37 pour C = 10⁻² mol·L⁻¹ (bible, `verification-pc.md` §6). Afficher
   « 3,4 » et ne pas écrire « mesuré au laboratoire » tant qu'une mesure sourcée n'est pas citée.
2. **L'acide chlorhydrique à pH 2,0** : valeur idéale (τ = 1, activités négligées). Sans risque à
   l'échelle du bac ; noté pour l'exactitude.
3. **« Le pH reste 3,4 quand on attend » ; « l'équilibre est atteint très vite »** (`comparer`,
   `vitesse-avancement`) : fait de manuel, sans source dans le dépôt. Trouver une source ou réécrire en
   « dans les conditions du laboratoire, le pH ne change plus ».
4. **Brønsted et Lowry** : la page ne dit pas que la définition d'Arrhenius « échouait » pour
   l'ammoniac ; la leçon ne le dit pas non plus (le pari porte sur un fait chimique sourcé, 2020 N).
   Si le relecteur juge que l'étape ne passe pas le test du porteur (02 §4.6), le tag `1923` devient
   une fiche de mot et `bronsted` reste un pari sans date.
5. **Ostwald, 1888** : la page résume la loi ; elle ne décrit pas une expérience précise à faire
   prédire. Prénom, mesures, contexte : non vérifiés. Tag facultatif.
6. **Arrhenius** (bible C3 ②) : non utilisé ; les pages divergent sur la note de sa thèse (« fourth
   class, reclassified third » en anglais, autre formulation en français).
7. **Berthollet et le natron** (bible C3 ①, 02 §5.4) : non utilisé, conformément à la bible.
8. **Les états physiques et la flèche au barème** (bible §2.2, « à vérifier avec un correcteur ») :
   la leçon les écrit partout ; aucun leurre ne repose sur leur absence ni sur « → au lieu de ⇄ ».
9. **Les prérequis de 1ère Bac** (Brønsted, pH-mètre, [H₃O⁺] = 10^(−pH)) : étiquetés [SEC] dans la
   bible, le programme de 1ère Bac n'est pas dans `docs/referentiel/`. La leçon les réenseigne
   (`2.2.1.1` le demande) sauf la définition du pH, rappelée en partie 0.
10. **Lecture de `2.2.1.3`** (« Déterminer le pH ») : l'annexe dit « introduction de la notion pH -
    mesure du pH ». La leçon le comprend comme : mesurer au pH-mètre, et passer du pH à [H₃O⁺] ; le
    calcul du pH depuis [H₃O⁺] ou [HO⁻] est `2.2.3.4` (C5). À confirmer.
11. **Le modèle du bocal** (probabilités par tic) est une image, pas une cinétique mesurée ; la note de
    scène le dit. Sa seule prétention quantitative, le palier, est la relation d'équilibre exacte.

**Histoire (≤ 3 places).**
1. **Brønsted et Lowry, 1923** (`bronsted`) [V] sur les pages Wikipédia citées.
2. **Ostwald, 1888** (`dilution-pari`) [V] sur la page, facultatif (point 5).
3. **Sørensen, 1909** : fiche de mot `pH` seulement, sans pari [V].

### 8.3 Pour le relecteur et le propriétaire (décisions à trancher)

1. **Scène nouvelle `solution`** (bécher et pH-mètre ; loupe sur cent molécules, modèle à graine
   figée) : décision du propriétaire. Elle porte l'énigme, la figure-clé, la dilution, et servira aux
   leçons C4 à C6.
2. **Le tableau d'avancement** : copie de `table` sans saisie (ce plan), ou une scène commune à toute
   la chimie où l'élève remplit les cases (bible §2.6) ? La seconde demande une saisie dans la scène,
   que `noyau.js` n'a pas : une demande à part.
3. **Route et nom des fichiers** : `/pilote/transformations-non-totales`, ou
   `/pilote/transformations-deux-sens` (le dossier `content/`) ?
4. **La flèche provisoire** « → » en partie 2, remplacée en partie 4 : d'accord, ou écrire ⇄ dès la
   partie 2 et le justifier en partie 4 ?
5. **SVT** : la partie 4 (pas de tiret `2.2.1.6` en SVT, pas de chocs efficaces dans son cadre) reste
   pour tous, le mot « choc efficace » réservé à PC et SM : d'accord ? **PC et SM** : la partie 6
   (dilution, tiret SVT seulement) reste comme enrichissement marqué : d'accord ?
6. **Histoire** : garder Ostwald (deuxième place) ou réduire `dilution-pari` à un pari sans date ?
7. **τ par la conductivité** (2019 N, 2015 N, SVT RS 2026) : dans la leçon C4 (ce plan), ou une
   étape ici ?
8. **L'énigme** (acide chlorhydrique et acide éthanoïque de même concentration) est aussi l'accroche
   prévue par la bible pour la leçon C5 : la prendre ici (ce plan, C3 venant d'abord) et donner une
   autre accroche à C5 ?
9. **`catalyseur`** anticipe `2.4.1.6` (chapitre de l'estérification) pour affronter B-2 : d'accord ?
10. **Valeurs de la leçon** (C = 1,0 × 10⁻² mol·L⁻¹, V = 100 mL, acide éthanoïque) : un choix
    d'auteur, pour garder les sujets 2022 et 2023 frais pour la partie 8.
