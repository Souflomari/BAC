# Spec v3 : le dosage acido-basique (`pc/reactions-acido-basiques`, fiche C6)

> Plan d'auteur pour une leçon pilote de chimie, la première du domaine. Règles :
> [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; mouvement : [`09-regles-du-mouvement.md`](../09-regles-du-mouvement.md) ;
> modèle de forme : [`dipole-rc.md`](dipole-rc.md) et la leçon livrée `web/src/components/pilote/dipole-rc-moteur.js`
> (sa scène couplée `couple`, `dipole-rc-scenes-d.js`, est le patron de la figure-clé, §3.3). Fiche : bible
> **C6** (`docs/bible/03-chimie.md`, avec ses §1-2 sur la méthode de l'exercice de chimie). Leçon minée, non
> portée : `content/pc/reactions-acido-basiques/` (`lesson.md` R9-R11, `items.yaml`, `spec-extension.md`,
> `media/`). L'auteur suit ce plan ; il rédige les textes, il ne décide ni l'ordre, ni les paris, ni les
> leurres. **Tout nombre cité ici est à recalculer par le code** (`dosage-acido-basique-outils.js`, à créer,
> §8.1) ; les valeurs écrites ci-dessous sont des contrôles faits à la main.
>
> **Scène d'un type nouveau demandée : une seule, `dosage`** (le montage, le contenu du bécher en jetons, le
> pH-mètre et la courbe pH = f(V_B), tous fonctions du seul volume versé V_B ; §3.3). Les autres sont des
> copies adaptées : `phv` (de `courbe`, `dipole-rc-scenes-b.js`), `table` (de `exponentielle-scenes-b.js`),
> `quiz` et `end` (de `noyaux-scenes-c.js`).

---

## 0. La leçon livrée

- **Route et titre** : `/pilote/dosage`, « Le dosage acido-basique » (`DosagePilote.tsx`, `dosage-moteur.js`, `dosage-outils.js`, `dosage-scenes-{a,b,c}.js`, `exercices/dosage.js`, catalogue `web/src/lib/apprentissage-catalogue/dosage.ts` généré par `spec-dosage.mjs`).
- **Périmètre retenu** : 11 parties, **48 étapes** (partie optionnelle de conductimétrie écartée ; aucun gabarit de conductimétrie). Valeurs de la leçon : acide éthanoïque ($pK_A = 4{,}75$, $C_A = 6{,}0 \times 10^{-2}\ \mathrm{mol\cdot L^{-1}}$, $V_A = 20{,}0\ \mathrm{mL}$) titré par la soude ($C_B = 0{,}10\ \mathrm{mol\cdot L^{-1}}$, $V_E = 12{,}0\ \mathrm{mL}$), pH calculé par électroneutralité exacte.
- **Ordre réel des 48 étapes** :
  - Partie 0 (Savoir) : `sav-test`, `sav-rappel`
  - Partie 1 (Énigme) : `goutte`, `combien`, `question`
  - Partie 2 (Réaction) : `equation`, `fleche-K`, `totale`, `montage`
  - Partie 3 (Bécher) : `avant-E`, `tableau-avant`, `pari-E`, `equivalence`, `ca`, `apres-E`
  - Partie 4 (Courbe) : `allure`, `lent`, `saut`, `pHE`, `base-faible`
  - Partie 5 (Repérer) : `rappel` (pause + curseur libre $V_B$), `tangentes`, `derivee`, `demi`, `rapport`, `pourcent`
  - Partie 6 (Indicateur) : `indicateur`, `bande`, `choix`, `bbt`
  - Partie 7 (Exploiter) : `dilution`, `masse`, `etiquette`, `ceq`
  - Partie 8 (Retour) : `retour-goutte`, `retour-volume`
  - Partie 9 (Au bac) : `bac`, `bac-lecture`, `bac-ca`, `bac-ind`, `bac-rapport` (2018 N) ; `bac-2a`, `bac-2b`, `bac-2c` (2024 N)
  - Partie 10 (Bilan) : `q1` (figure 2022 sur scène `phv`), `q2`, `q3`, `fin`
- **Écarts au plan** :
  - `q1` utilise la scène `phv` (jeu `s22`, pic à 20,0 mL et flèche pointant vers 21,7 mL) plutôt que `quiz`, afin de montrer la figure réelle du sujet 2022.
  - Les teintes d'indicateurs sont écrites en toutes lettres (« incolore », « rose ») sans aucune couleur nouvelle hors jetons.
  - Les points « à vérifier » du §8.2 (goutte = 0,05 mL, pH-mètre « étalonné », rédaction exacte d'étiquette, notation des états au barème, conductimétrie) ne sont pas affirmés comme faits à l'élève.
- **Statut** : à relire par le flux `relire-lecon` dans une conversation neuve.

---

## 0 bis. La décision de périmètre : C6 seule, C5 supposée acquise

Les deux fiches ne tiennent pas dans une leçon de 45 à 55 étapes. C5 compte neuf tirets de nature différente
(K_e et pK_e, nature d'une solution, pH ↔ [H₃O⁺] et [HO⁻], K_A et pK_A, K d'une réaction entre deux couples,
prédominance, distribution) ; à la densité du dipôle RC (18 tirets en 56 étapes, mais une seule loi qui les
porte tous), C5 seule demande 35 à 40 étapes, et C6 en demande 45. Ce plan est donc celui du **dosage (C6)**,
48 étapes (51 avec la partie optionnelle de conductimétrie, §1.3). C5 fera une leçon à part, qui la précède.

**Ce que la leçon suppose acquis de C5** (et de C3, C4), testé en partie 0 et rappelé là où il sert :

| Acquis | Capacité (PC, SM ; SVT) | Où la leçon s'en sert |
|---|---|---|
| K_e = [H₃O⁺][HO⁻], pK_e = 14 à 25 °C (valeur donnée par les sujets : « K_e = 10⁻¹⁴ ») | `2.2.3.1`, `2.2.3.2` ; `2.2.5.1`, `2.2.5.2` | `fleche-K`, `totale`, `saut` |
| nature d'une solution par son pH | `2.2.3.3` ; `2.2.5.3` | `pHE`, `base-faible` |
| pH ↔ [H₃O⁺] ou [HO⁻] (et [H₃O⁺] = 10^(−pH)) | `2.2.3.4` ; `2.2.5.4` | `totale`, `saut`, `apres-E` |
| expression de K_A, pK_A = −log K_A | `2.2.3.5`, `2.2.3.6` ; `2.2.5.5`, `2.2.5.6` | `lent`, `demi`, `bac-rapport` |
| K d'une réaction acido-basique à partir des K_A | `2.2.3.7` ; `2.2.5.7` | `fleche-K` (refait en deux lignes, pas enseigné) |
| espèce prédominante (pH, pK_A) ; diagramme de prédominance (et de distribution en PC, SM) | `2.2.3.8`, `2.2.3.9` ; `2.2.5.8`, `2.2.5.9` (prédominance seule) | `lent`, `demi`, `indicateur`, `bac-rapport` |
| acide et base de Brønsted, couples, réaction d'un acide avec l'eau, τ = x_f/x_max | C3 (`pc-pc 2.2.1.*` ; `pc-svt 2.2.3.*`) | `equation`, `totale` |
| expression littérale de Q_r | C4 (`2.2.2.3` ; `pc-svt 2.2.4.3`) | `fleche-K` |
| n = C·V, m = n·M, facteur de dilution, tableau d'avancement | tronc commun ; `2.1.2.4` | parties 3, 7 |
| logarithme décimal | `maths-sexp 1.2.18` (selon la bible §2.5) ; leçon pilote `logarithme` | `lent`, `saut`, `demi` |

Les conceptions de C5 qui ne servent pas le dosage restent à la leçon C5 (§5, fin).

---

## 1. Périmètre

### 1.1 Le nom et les capacités officielles

Le chapitre est « 3- Transformations associées à des réactions acido-basiques en solution aqueuse » du sous-domaine 2
« Transformations non totales d'un système chimique » (cadre PC p. 15 ; annexe des contenus p. 24 :
« - Zone de virage d'un indicateur coloré acide-base. », « - Titrage pH-métrique d'un acide ou d'une base en
solution aqueuse pour déterminer le volume versé à l'équivalence et choisir un indicateur coloré convenable. »,
« - Réaction totale : détermination du taux d'avancement finale à partir d'un exemple de dosage
acido-basique. », `pc-pc.yaml` l. 527). TP de l'annexe 2 : « 5- Dosage par mesure de pH. » (« Réaliser le
dosage d'un produit de la vie courante. ») et « 10- Dosage directe de l'aspirine dans un comprimé. »
(`pc-pc.yaml` l. 557, 562 ; `pc-sm.yaml` l. 571, 576).

Les rangs sont **les mêmes dans les trois filières** ; le chapitre porte le numéro `2.2.3` en PC et SM,
`2.2.5` en SVT (`pc-svt.yaml` l. 7 : le cadre SVT numérote ses chapitres de chimie à la suite). Libellés mot
pour mot (`pc-pc.yaml` l. 439-443, 392 ; `pc-sm.yaml` l. 454-458, 407 ; `pc-svt.yaml` l. 360-364, 312).

| PC, SM | SVT | Libellé (cadre 2025, PC, mot pour mot) | Où |
|---|---|---|---|
| `2.2.3.10` | `2.2.5.10` | Ecrire l'équation de réaction de dosage (en utilisant une seule flèche). | parties 2, 10 |
| `2.2.3.11` | `2.2.5.11` | Connaître le montage expérimental d'un dosage acido-basique. (SM : « le dispositif expérimental ») | partie 2 (`montage`) |
| `2.2.3.12` | `2.2.5.12` | Exploiter la courbe ou les résultats du dosage. | parties 4, 5, 7, 10 |
| `2.2.3.13` | `2.2.5.13` | Repérer et exploiter le point d'équivalence. | parties 3, 5, 10 |
| `2.2.3.14` | `2.2.5.14` | Justifier le choix de l'indicateur coloré adéquat pour repérer l'équivalence. | parties 6, 10, bilan |
| `2.1.2.2` | `2.1.2.2` | Repérer l'équivalence lors d'un titrage et l'exploiter. (chapitre C2, même geste) | parties 3, 5 |

Préfixes : `pc-pc`, `pc-sm`, `pc-svt`. Variante de graphie : SVT écrit « Écrire » ; sans effet. Poids du
sous-domaine : 10 % (PC, SM), 11 % (SVT) (bible §1). Fréquence : dosage dans 2018, 2020, 2021, 2022, 2024,
2025 N (sujets PC transcrits, `docs/sujets/pc/reactions-acido-basiques.md`).

### 1.2 Hors programme, qu'on n'enseigne pas

Le calcul du pH à l'équivalence ou à un point quelconque par une formule (le code calcule la courbe, l'élève la
**lit**) ; les solutions tampons ; les polyacides (l'acide ascorbique de 2024 est traité comme AH, comme le dit
l'énoncé) ; les dosages d'oxydoréduction ; le calcul d'une teinte intermédiaire d'indicateur. La règle
« zone de virage ≈ pK_A ± 1 » de l'ancienne leçon (R11) n'est pas reprise : aucun tiret, aucun sujet transcrit.

### 1.3 La conductimétrie : enrichissement, à trancher

La commande cite la conductimétrie. **Aucun tiret ne nomme le dosage conductimétrique**, et aucun des sujets
transcrits n'en contient : les contenus du chapitre ne parlent que du « Titrage pH-métrique » (l. 527). La
conductance est au cadre ailleurs (`2.2.2.1` ; `2.1.2.3` en PC et SM : « sa conductivité électrique, sa
conductance » ; **absente du `2.1.2.3` SVT**). `spec-extension.md` §0 avait conclu « hors-cadre pour cette
leçon ». Le plan propose donc une **partie 8 optionnelle de trois étapes**, marquée enrichissement, PC et SM
seulement, sans exercice généré tant que le propriétaire ne l'a pas retenue (§8.3, question 1). Sans elle,
48 étapes ; avec elle, 51.

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 7, 9 à 11 | entières | entières (« dispositif » pour « montage » dans le texte de `montage`) | entières |
| `pourcent` (partie 5) | `2.2.3.12` | idem | gardée : un bilan de matière, pas un diagramme de distribution (`2.2.5.12`) ; aucun diagramme de distribution n'est montré |
| Partie 8 (conductimétrie) | enrichissement | enrichissement | **retirée** (bouton « Passer à la suite », forme de `deux-voies` de `noyaux-moteur.js`) |
| Exemples du bac | 2018 N et 2024 N (sujets PC) | idem | idem (aucun sujet SVT transcrit) |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Un bécher : 20,0 mL d'une solution d'acide éthanoïque (le composant actif du
vinaigre), deux gouttes de phénolphtaléine, incolore. Au-dessus, une burette de soude à 0,10 mol·L⁻¹. On verse
millilitre par millilitre : rien, pendant 11 mL. On en est à 11,95 mL. **L'élève parie** (`goutte`) sur la
goutte suivante : rien de visible, une teinte pâle qui fonce sur plusieurs millilitres, ou tout le bécher
rose d'un coup. Deux gouttes plus loin, tout est rose. **Second pari** (`combien`, l'histoire) : avec une
solution deux fois plus concentrée, la couleur bascule à quel volume ? **Deux questions restent ouvertes :
pourquoi une seule goutte fait-elle basculer ce que douze millilitres n'avaient pas touché ? Et pourquoi ce
volume dit-il combien d'acide il y avait ?**

**Le retour (partie 9).**
1. Jusqu'à 12,0 mL, chaque HO⁻ versé trouve un CH₃COOH et disparaît : le bécher garde l'acide et sa base
   conjuguée, son pH suit leur rapport et monte lentement. À 12,0 mL, le dernier acide est consommé. Les HO⁻
   suivants restent libres, et une goutte suffit à porter le pH d'environ 7,1 à 10,2 : il traverse d'un coup
   la zone de virage 8,2-10 de la phénolphtaléine.
2. Le volume compte les moles : C_A·V_A = C_B·V_E. Deux fois plus d'acide, deux fois plus de soude : 24 mL.

Le fil rouge : **« la soude compte l'acide, jeton par jeton »**. Dans la scène, un jeton vaut 1,0 × 10⁻⁴ mol ;
un millilitre de soude apporte un jeton HO⁻ ; le bécher en contient douze CH₃COOH au départ. L'équivalence
tombe au douzième millilitre parce qu'il y avait douze jetons à compter. Il revient dans `avant-E`, `pari-E`,
`ca`, `rappel`, `demi`, `retour-volume`.

---

## 3. La chaîne des idées

1. n = C·V ; pH, pK_A, prédominance (C5) → 2. l'énigme : la couleur bascule à une goutte près, et le volume
dépend de la quantité d'acide → 3. doser, c'est faire réagir tout le titré avec un titrant connu ; la réaction
du dosage CH₃COOH + HO⁻ → CH₃COO⁻ + H₂O ; K = K_A/K_e ≈ 1,8 × 10⁹, τ ≈ 1 : une seule flèche → 4. le montage :
burette, prise d'essai, agitation, sonde du pH-mètre → 5. dans le bécher, goutte à goutte : avant
l'équivalence HO⁻ est limitant et disparaît ; à l'équivalence il ne reste que la base conjuguée ; ensuite HO⁻
s'accumule → 6. l'équivalence : les réactifs sont dans les proportions de l'équation, C_A·V_A = C_B·V_E → 7. la
courbe pH = f(V_B) : montée lente (le rapport [A⁻]/[AH] change peu), saut (le dernier acide est parti), palier
→ 8. pH_E > 7 pour un acide faible titré par la soude, < 7 pour une base faible titrée par un acide fort →
9. repérer E : tangentes parallèles et médiane ; maximum de la dérivée → 10. la demi-équivalence : pH = pK_A ;
le rapport [AH]/[A⁻] = V_E/V_B − 1 → 11. l'indicateur : un couple dont les formes ont deux couleurs ; sa zone
de virage doit contenir pH_E → 12. exploiter : dilution, prélèvement, masse, étiquette, concentration à
l'équivalence → (13. la conductimétrie, optionnelle) → 14. retour à l'énigme → 15. le bac.

**Figure-clé : la scène `dosage`** (nouvelle, §3.3 ; 13 étapes, un changement chacune). Valeurs de la leçon :
acide éthanoïque, pK_A = 4,75 (tableau du sujet 2021 N, `docs/sujets/pc/reactions-acido-basiques.md`),
C_A = 6,0 × 10⁻² mol·L⁻¹, V_A = 20,0 mL, soude C_B = 0,10 mol·L⁻¹, d'où V_E = 12,0 mL (choix motivé §8.3,
question 3). Aucun texte ne nomme une couleur de trait ; « rose » et « incolore » sont les couleurs de
l'indicateur, des faits chimiques, pas des classes.

| # | Étape | Le changement |
|---|---|---|
| 1 | `goutte` (partie 1) | montage, bécher incolore à V_B = 11,95 mL ; au `reveal`, deux gouttes : V_B → 12,05 mL, le bécher vire |
| 2 | `combien` | une seconde burette fantôme : le volume de virage pour 2C_A apparaît au `reveal` (24 mL) |
| 3 | `montage` (partie 2) | les légendes du montage, une par une (burette, prise d'essai, agitateur, sonde, pH-mètre) |
| 4 | `avant-E` (partie 3) | les jetons : 12 CH₃COOH ; V_B 0 → 4 mL, quatre HO⁻ tombent et deviennent quatre CH₃COO⁻ |
| 5 | `pari-E` | V_B 4 → 8 mL avant le pari ; au `reveal`, 8 → 12 mL : plus aucun CH₃COOH, aucun HO⁻ |
| 6 | `equivalence` | le compteur « 12 jetons versés = 12 jetons d'acide au départ » |
| 7 | `apres-E` | V_B 12 → 16 mL : quatre HO⁻ restent libres |
| 8 | `allure` (partie 4) | le repère pH = f(V_B) vide ; au `reveal`, V_B 0 → 20 mL : la courbe se trace avec les jetons et le pH-mètre |
| 9 | `lent` | la portion 4 → 8 mL mise en valeur ; le pH-mètre lit 4,45 puis 5,05 |
| 10 | `saut` | le zoom : V_B 11,95 → 12,05 mL, le pH-mètre saute de 7,1 à 10,2 |
| 11 | `pHE` | le point E, pH-mètre masqué ; au `reveal`, (12,0 mL ; 8,7) et la droite pH = 7 |
| 12 | `base-faible` | le jeu `base` (sujet 2020) : la courbe décroissante de NH₃ par HCl, E sous pH = 7 au `reveal` |
| 13 | `rappel` (partie 5) | la courbe seule, sans jetons (la pause) |

**Ses trois paris** : `pari-E` (le contenu du bécher à l'équivalence), `allure` (la forme de la courbe),
`pHE` (pH_E face à 7). `goutte` et `combien` sont les paris de l'énigme, posés sur la même scène.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 3 |
| 2 | La réaction du dosage | Réaction | 4 |
| 3 | Dans le bécher | Bécher | 6 |
| 4 | La courbe | Courbe | 5 |
| 5 | Repérer l'équivalence | Repérer | 6 |
| 6 | L'indicateur coloré | Indicateur | 4 |
| 7 | Exploiter le résultat | Exploiter | 4 |
| 8 | (optionnelle) La conductimétrie | Conductance | (3) |
| 9 | Retour à l'énigme | Retour | 2 |
| 10 | Au bac | Au bac | 8 |
| 11 | Bilan | Bilan | 4 |

**48 étapes** (51 avec la partie 8). Notation : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ; **M**
manipulation. Dans les options : ✓ juste ; ✗ fausse, suivie de la conception affrontée (étiquette du §5) puis
de l'idée du retour (B2).

### 3.2 Notations et écritures (tenues partout)

Relevé des sujets transcrits : AH / A⁻ (2018, 2021, 2024), C_A, V_A, C_B, V_BE (2018, 2024, 2025) ou C_a,
V_a, V_bE (2021, 2022) ; « l'équation de la réaction de dosage » (2018, 2021, 2022), « l'équation chimique
modélisant la réaction de dosage » (2025) ; soude écrite Na⁺(aq) + HO⁻(aq). **La leçon écrit** : C_A, V_A
pour le titré, C_B, V_B pour la soude, V_E (V_BE dans les étapes qui citent un sujet qui l'écrit ainsi) ;
pH_E ; l'équation **sans les ions spectateurs, avec une seule flèche et les états (aq), (l)** ; la réaction de
l'acide avec l'eau garde ⇄ (C3). La notation des états est-elle notée au barème : à vérifier (bible §2.2).

### 3.3 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `dosage` | **nouvelle, type nouveau** | voir ci-dessous |
| `phv` | copie adaptée de `courbe` (`dipole-rc-scenes-b.js`) | les lectures sur pH = f(V_B) : tangentes, médiane, dérivée, demi-équivalence, bandes de virage ; les figures 2018, 2022, 2024 redessinées |
| `table` | copie adaptée de `table` (`exponentielle-scenes-b.js`) | le tableau d'avancement de la réaction de dosage (avant E, à E) |
| `quiz`, `end` | copies de `noyaux-scenes-c.js` | les copies fautives ; le bilan (cinq lignes) |

Outils : `outilsScene`, `fr`, `sciF` de `radioactivite-outils.js`, importés tels quels.

**Scène nouvelle `dosage`** (décision du propriétaire, 07 §3.3).
- *Pourquoi un type nouveau* : aucune scène ne dessine un montage de chimie ni un contenu de solution. Le
  patron est `couple` du dipôle RC (M2) : le mécanisme (les jetons qui réagissent) et la grandeur mesurée (le pH
  et sa courbe) partagent **un seul paramètre**, V_B, et avancent ensemble. C'est la forme des sujets (« en
  suivant les variations du pH du mélange réactionnel en fonction du volume V_B versé », 2018) et la porte de
  quatre tirets (`2.2.3.11` à `.13`, `2.1.2.2`) ; elle servira aussi C2 (suivi par dosage) et C10 (acide
  restant).
- *État* (M3) : `etat(V_B)`, fonction pure ; paliers nommés : 0 « le départ », V_E/2 « la demi-équivalence »,
  V_E « l'équivalence », 1,5·V_E « l'excès de soude ». pH, nombres de jetons, couleur de l'indicateur et tracé
  viennent de `dosage-acido-basique-outils.js` (pH calculé par l'électroneutralité exacte, sans approximation
  affichée).
- Disposition (1000 × 720, comme `couple`) : en haut à gauche la burette (niveau qui baisse, graduations) au-dessus
  du bécher (jetons dans le liquide, remplissage `s-dim` ou `s-a` selon l'indicateur) et le pH-mètre
  (afficheur) ; en haut à droite le compteur de jetons ; en bas, le repère pH = f(V_B) (0 à 20 mL, 0 à 14).
- Jetons : 1 jeton = 1,0 × 10⁻⁴ mol ; CH₃COOH (cercle plein), CH₃COO⁻ (cercle à trait), HO⁻ (cercle d'accent
  `k-a`, le seul élément qui agit, M5) ; Na⁺ en option (`na`), discret ; l'eau n'est pas dessinée.
- Paramètres : `jeu` (`'enigme'`, `'montage'`, `'jetons'`, `'courbe'`, `'base'`, `'chaine'`, `'cond'`) ;
  `V` (mL) ; `ind` (0, 1 : la phénolphtaléine présente) ; `jet` (les jetons) ; `phm` (l'afficheur ; 0 = masqué,
  pour les paris, M9) ; `cv` (0 → 1 : la courbe tracée jusqu'à V) ; `lab` (légendes du montage, 0 à 5) ;
  `zoom` (la fenêtre 11,9 → 12,1 mL) ; `pe` (le point E) ; `p7` (la droite pH = 7) ; `ghost` (la burette ou la
  courbe fantôme de `combien`, `base`) ; `ch` (le maillon mis en valeur dans `'chaine'` : flacon S₀, fiole de
  dilution, pipette, bécher) ; `rv`.
- M9 : avant chaque pari, la scène s'arrête **avant** l'issue (`goutte` à 11,95 mL, `pari-E` à 8 mL, `allure`
  repère vide, `pHE` afficheur masqué) ; le `reveal` seul fait avancer V. M4 : rien ne démarre seul ; sous
  `prefers-reduced-motion`, sauts francs entre paliers.
- Lisible à 390 px (M5) : au plus quatre étiquettes à la fois ; les valeurs (20,0 mL ; 0,10 mol·L⁻¹) dans le
  sous-titre. L'élève ne manipule pas V dans le fil (pas de curseur libre avant les paris) ; un curseur V
  s'ouvre à `rappel` et au bilan.
- Jeu `'chaine'` (partie 7) : un schéma de flacons, pas un dessin de laboratoire ; il porte les pièges de
  dilution et de prélèvement.
- Poids (M8) : ≤ 5 Ko compressés ; à mesurer.

**Copie adaptée `phv`** (type « courbe avec lecture graphique »). Jeux : `'lecon'` (la courbe de la leçon),
`'s18'` (2018 : 0 à 20 mL, 0 à 12, tangentes parallèles de pente 0,89 pH·mL⁻¹, E en (10,0 ; 8,0)), `'s22'`
(2022 : courbe et dérivée sans échelle d'ordonnée, pic sur 20,0 mL, étiquette fléchée vers 21,7 mL), `'s24'`
(2024 : 0 à 35 mL, 0 à 14, pic de la dérivée sur 25,0 mL). Paramètres : `curve`, `tg` (les deux tangentes),
`med` (la médiane), `pe`, `der` (la dérivée), `demi`, `lect` (droites de lecture), `bande` (une zone de virage :
bornes), `p7`. Graduations et positions : celles des figures mesurées dans le fichier des sujets.

---

### Partie 0 : Ce qu'il faut savoir (scène `phv`, axe des pH seul)

- **`sav-test`** · `ctl:'saut'` (forme des pilotes : juste du premier coup, bouton vers `goutte`) · **V**
  « Une solution est à pH = 4,0 ; le couple CH₃COOH/CH₃COO⁻ a pK_A = 4,75. Qui prédomine ? » ✓ CH₃COOH.
  ✗ CH₃COO⁻ (AB-BASE-1) → sous le pK_A, c'est l'acide. ✗ aucun, les deux sont à égalité (AB-DIST-1) → l'égalité,
  c'est à pH = pK_A seulement.
- **`sav-rappel`** · trois rappels : n = C·V, V en litres ; [H₃O⁺] = 10^(−pH), [H₃O⁺][HO⁻] = K_e = 10⁻¹⁴ ;
  pH < pK_A : l'acide prédomine. Pas d'action. Si `sav-test` est raté : renvoi vers la leçon C5 (quand elle
  existera) et la leçon pilote `logarithme`.

### Partie 1 : L'énigme (scène `dosage`, jeu `enigme`)

- **`goutte`** · `V:11.95, ind:1, phm:0` · texte : 20,0 mL de solution d'acide éthanoïque, deux gouttes de
  [[phenolphtaleine|phénolphtaléine]] ; on a versé 11,95 mL de soude à 0,10 mol·L⁻¹, sans aucun changement.
  **P** « La goutte suivante… » options : « ne change rien de visible : il faudra encore plusieurs mL » / « donne
  une teinte pâle, qui fonce peu à peu sur plusieurs mL » / « fait virer tout le bécher, d'un coup ».
  `reveal` : `V:12.05` en deux gouttes (2 s), le bécher vire. Conceptions +10 (« tout change
  progressivement ») et +11. Le retour de la 2ᵉ option : « C'est ce qu'on voit au tout début avec d'autres
  indicateurs. Ici, deux gouttes suffisent. »
- **`combien`** · tag `1791 · Descroizilles` · `ghost:0` · texte : vers 1791, Descroizilles fabrique un tube
  gradué pour verser une solution et lire le volume versé ; il s'en sert pour mesurer la force des alcalis du
  commerce, puis le titre du vinaigre (§8.2, point 1). **P** « Avec une solution d'acide deux fois plus
  concentrée, même volume, la couleur basculera vers… » options : « 12 mL : c'est le même acide » / « 24 mL » /
  « 6 mL : plus concentré, il réagit plus vite ». `reveal` : `ghost:1`, la seconde burette vire à 24 mL.
  Conceptions +21 (la 1ʳᵉ : le volume serait une propriété de l'acide), AB-BASE-3 (la 3ᵉ).
- **`question`** · `fort` : « Une goutte fait basculer ce que 12 mL n'avaient pas touché. Pourquoi ? Et pourquoi
  ce volume dit-il combien d'acide il y avait ? » Pas d'action.

### Partie 2 : La réaction du dosage (scènes `dosage`, `table`)

- **`equation`** · **Q** (`2.2.3.10`) « La [[titrage|réaction du dosage]] de l'acide éthanoïque par la soude
  s'écrit… » ✓ CH₃COOH(aq) + HO⁻(aq) → CH₃COO⁻(aq) + H₂O(l). ✗ CH₃COOH + H₂O ⇄ CH₃COO⁻ + H₃O⁺ (+1) → c'est la
  réaction de l'acide avec l'eau ; la soude apporte HO⁻. ✗ CH₃COOH + Na⁺ + HO⁻ → CH₃COONa + H₂O (+2) → Na⁺
  ne réagit pas ; on ne l'écrit pas. ✗ CH₃COOH + HO⁻ ⇄ CH₃COO⁻ + H₂O (+3) → le cadre impose une seule flèche ;
  l'étape suivante dit pourquoi.
- **`fleche-K`** · **D** puis Q (`2.2.3.7` réutilisé) · lignes : K = [CH₃COO⁻] / ([CH₃COOH]·[HO⁻]) (r : Q_r,éq ;
  l'eau, solvant, n'y figure pas) ; on multiplie en haut et en bas par [H₃O⁺] (r : pour faire paraître K_A et
  K_e). Pari « K = ? » ✓ K_A/K_e = 10^(14 − 4,75) ≈ 1,8 × 10⁹. ✗ K_e/K_A ≈ 5,6 × 10⁻¹⁰ (AB-BASE-7) → K_A est
  au numérateur : l'acide du couple réagit. ✗ K_A·K_e ≈ 1,8 × 10⁻¹⁹ (AB-BASE-7) → on divise. `apres` : « K est
  immense : la réaction est pratiquement totale. D'où une seule flèche. » (Forme : 2024 N 5-4, 2025 N 1-5.)
- **`totale`** · scène `table` · **D** puis Q (annexe : « Réaction totale : détermination du taux d'avancement
  finale à partir d'un exemple de dosage acido-basique ») · lignes, à V_B = 6,0 mL, pH mesuré 4,75 : x_max =
  C_B·V_B = 6,0 × 10⁻⁴ mol (r : HO⁻ est limitant) ; n(HO⁻) restant = 10^(pH − 14)·(V_A + V_B) ≈ 1,5 × 10⁻¹¹ mol
  (r : le pH mesuré, et K_e). Pari « τ = ? » ✓ τ ≈ 1 : chaque HO⁻ versé a consommé un acide. ✗ τ ≈ 3 × 10⁻⁴,
  par 10^(−pH)/C_A (+4) → c'est le calcul de l'acide dans l'eau ; ici on suit HO⁻. ✗ τ ≈ 0,5 : la réaction de
  dosage est limitée comme celle de l'acide avec l'eau (AB-TIT-3) → n(HO⁻) restant est 10⁷ fois plus petit que
  x_max. `apres`, `fort` : « Totale : c'est ce qui permet au volume versé de compter l'acide. »
- **`montage`** · scène `dosage`, jeu `montage`, `lab:0→5` · **Q** (`2.2.3.11`) « La solution de concentration
  connue se place… » ✓ dans la burette graduée. ✗ dans le bécher, avec la sonde (+5) → le bécher reçoit la
  [[prise|prise d'essai]] de la solution à doser. ✗ dans la pipette jaugée (+5) → la pipette mesure V_A, la
  prise d'essai. `apres` : les cinq éléments nommés (burette, bécher et prise d'essai, agitateur magnétique,
  sonde, pH-mètre) ; le pH-mètre « étalonné » : à vérifier (§8.2, point 3).

### Partie 3 : Dans le bécher (scènes `dosage`, jeu `jetons` ; `table`)

- **`avant-E`** · `jet:1, V:0→4` (la descente des quatre HO⁻ est l'idée, M1) · **Q** « 4,0 mL de soude ont
  apporté 4 jetons HO⁻. Combien en reste-t-il dans le bécher ? » ✓ aucun : chacun a pris un proton à un
  CH₃COOH. ✗ quatre : la réaction attend l'équivalence (+6) → la réaction est totale à chaque goutte. ✗ deux :
  la moitié réagit (AB-TIT-3) → τ ≈ 1, pas 0,5. `apres` : avant l'équivalence, HO⁻ est le
  [[limitant|réactif limitant]].
- **`tableau-avant`** · scène `table` · **D** puis Q · lignes : n(CH₃COO⁻) = C_B·V_B (r : un HO⁻ consommé, un
  CH₃COO⁻ formé) ; n(CH₃COOH) = C_A·V_A − C_B·V_B (r : ce qui reste de l'acide). Pari « À V_B = 4,0 mL,
  n(CH₃COOH) = ? » ✓ 8,0 × 10⁻⁴ mol. ✗ 1,2 × 10⁻³ mol (+6) → quatre jetons sont partis. ✗ 4,0 × 10⁻⁴ mol → c'est
  n(CH₃COO⁻), l'espèce formée.
- **`pari-E`** · pari de la figure · `V:8` · **P** « À V_B = 12,0 mL, on aura versé autant de HO⁻ qu'il y avait
  de CH₃COOH. Le bécher contiendra… » options : « CH₃COOH et HO⁻ à parts égales » / « CH₃COO⁻ (et Na⁺), plus
  d'acide ni de HO⁻ » / « CH₃COOH et CH₃COO⁻, moitié-moitié ». `reveal` : `V:12`. Conceptions +7 (la 1ʳᵉ),
  AB-EQU-3 (la 3ᵉ, c'est la demi-équivalence, à 6 mL).
- **`equivalence`** · compteur « 12 = 12 » · le nom : l'[[equivalence|équivalence]], les réactifs ont été
  mélangés dans les proportions de l'équation ; le réactif limitant change. tex n(AH)₀ = n(HO⁻)_E ⇔
  C_A·V_A = C_B·V_E. **Q** (`2.2.3.13`) « À l'équivalence, ce qui est égal, ce sont… » ✓ les quantités
  n(AH)₀ et n(HO⁻) versée. ✗ les volumes V_A et V_E (AB-TIT-2) → 20 mL et 12 mL. ✗ les concentrations C_A et
  C_B (AB-TIT-2) → seuls les produits C·V le sont. ✗ le pH vaut 7 (AB-TIT-1) → la définition ne parle pas du
  pH ; la partie 4 le mesure.
- **`ca`** · **V** « V_A = 20,0 mL, C_B = 0,10 mol·L⁻¹, V_E = 12,0 mL. C_A = ? » ✓ 6,0 × 10⁻² mol·L⁻¹.
  ✗ 0,17 mol·L⁻¹ : C_B·V_A/V_E (+8) → isole C_A : C_B·V_E/V_A. ✗ 0,10 mol·L⁻¹ (AB-TIT-2).
- **`apres-E`** · `V:12→16` · **Q** « Après l'équivalence, chaque goutte de soude… » ✓ ajoute des HO⁻ qui
  restent libres : il n'y a plus d'acide. ✗ fait réagir CH₃COO⁻ (AB-BASE-5) → CH₃COO⁻ est une base, comme HO⁻ :
  deux bases ne s'échangent pas de proton. ✗ ne change plus rien dans le bécher (+9) → les HO⁻ s'accumulent.

### Partie 4 : La courbe (scène `dosage`, jeux `courbe`, `base`)

- **`allure`** · pari de la figure · `jeu:'courbe', V:0, cv:0` (l'afficheur lit 3,0) · **P** « Prédis
  pH = f(V_B) de 0 à 20 mL. » options : « une droite, de 3 à 12 » / « une montée lente, un saut de plusieurs
  unités vers 12 mL, puis un palier » / « un pH qui reste à 3 jusqu'à 12 mL, puis une montée en ligne droite ».
  `reveal` : `V:0→20, cv:1` (2,5 s), jetons et afficheur couplés. Conceptions +10, +11.
- **`lent`** · `V:4→8`, la portion mise en valeur · **Q** « De 4 à 8 mL, le pH passe seulement de 4,45 à 5,05.
  Pourquoi si peu ? » ✓ le bécher contient CH₃COOH et CH₃COO⁻ : le pH suit leur rapport, qui change peu.
  ✗ la soude est trop diluée pour agir (+6) → chaque HO⁻ réagit ; c'est le pH qui change peu. ✗ les HO⁻ versés
  restent libres (+6) → ils sont consommés : relis `avant-E`. `apres` : tex pH = pK_A + log([A⁻]/[AH]),
  tirée de K_A (forme de 2024 N 5-1).
- **`saut`** · `zoom:1, V:11.95→12.05` · **Q** « Une goutte de 0,05 mL fait passer le pH de 7,1 à 10,2.
  Pourquoi ? » ✓ le dernier acide est parti : les HO⁻ de cette goutte restent libres. ✗ l'indicateur change de
  couleur et fait monter le pH (+12) → l'indicateur signale le saut, il ne le cause pas. ✗ cette goutte est plus
  concentrée (+12, variante) → toutes les gouttes sont identiques ; c'est le bécher qui a changé. `apres` :
  le [[saut|saut de pH]] ; le pH compte les HO⁻ libres en puissances de 10.
- **`pHE`** · pari de la figure · `pe:1, phm:0` · **P** « Au milieu du saut, à l'équivalence, pH_E… » options :
  « = 7 : l'acide est neutralisé » / « > 7 » / « < 7 ». `reveal` : (12,0 mL ; 8,7), `p7:1`. Conception
  AB-TIT-1. Le retour de la 1ʳᵉ : « Le bécher ne contient plus que CH₃COO⁻ : une base. »
- **`base-faible`** · `jeu:'base', ghost:1` · sujet 2020 N, Partie 1 (NH₃, V_b = 15 mL, HCl à
  10⁻² mol·L⁻¹) · **Q** « On dose une base faible, NH₃, par un acide fort. À l'équivalence, le bécher contient
  NH₄⁺. pH_E est… » ✓ < 7 : NH₄⁺ est un acide. ✗ > 7, comme pour l'acide éthanoïque (+13) → c'est l'espèce
  présente à l'équivalence qui décide. ✗ = 7 (AB-TIT-1). `reveal` : la courbe décroissante, E sous la droite
  pH = 7 (pH_E calculé ≈ 5,8 ; à recalculer).

### Partie 5 : Repérer l'équivalence (scène `phv`)

- **`rappel`** · `jeu:'lecon', curve:1` (curseur V ouvert) · `sujet:'le bécher à l'équivalence'` · texte :
  mi-parcours, c'est le bon moment pour une pause ; un rappel avant de repartir. **V** « À V_B = V_E, le bécher
  contient… et son pH… » ✓ CH₃COO⁻ (et Na⁺) ; pH > 7. ✗ CH₃COOH et HO⁻ à parts égales ; pH = 7 (+7, AB-TIT-1)
  → les HO⁻ ont tous réagi, et la base restante rend la solution basique. ✗ CH₃COOH et CH₃COO⁻ moitié-moitié ;
  pH = pK_A (AB-EQU-3) → c'est la demi-équivalence, à V_E/2.
- **`tangentes`** · **D** puis Q (`2.2.3.13`) · lignes : deux tangentes parallèles, de part et d'autre du saut
  (r : `tg:1`) ; la parallèle à égale distance des deux (r : `med:1`) ; elle coupe la courbe en E (r :
  `pe:1`). Pari « E = ? » ✓ (12,0 mL ; 8,7). ✗ (12,0 mL ; 7,0) (AB-EQU-1) → pH_E se lit sur la courbe, à
  la médiane. ✗ (6,0 mL ; 4,75) (AB-EQU-3) → c'est la demi-équivalence. **Leurre interdit** : « V_E lu là où
  pH = 7 » donne ici 11,9 mL, presque la bonne valeur (le saut est vertical) ; le leurre porte donc sur
  pH_E (§8.1).
- **`derivee`** · `der:1` (forme 2022, 2024) · **Q** « La courbe dpH/dV_B a un pic. V_E se lit… » ✓ à l'abscisse
  du maximum. ✗ là où la dérivée revient à zéro (AB-EQU-2) → elle est nulle sur les paliers, loin de E. ✗ sur
  l'axe vertical, à la hauteur du pic (+14) → on lit une abscisse ; en 2022, la dérivée n'a même pas
  d'échelle.
- **`demi`** · `demi:1` · **D** puis Q · lignes : à V_E/2, n(CH₃COOH) = n(CH₃COO⁻) (r : la moitié a réagi) ;
  K_A = [CH₃COO⁻]·[H₃O⁺]/[CH₃COOH] (r : C5). Pari « Donc, à V_E/2, pH = ? » ✓ pK_A = 4,75. ✗ pH_E/2 ≈ 4,3
  (+15) → le pH n'est pas proportionnel au volume. ✗ 7 (AB-DIST-3) → l'égalité des deux formes se fait au
  pK_A du couple. `apres` : la [[demi|demi-équivalence]] ; lire le pK_A sur la courbe.
- **`rapport`** · **D** puis Q (forme 2024 N 5-2) · lignes : n(A⁻) = C_B·V_B ; n(AH) = C_A·V_A − C_B·V_B =
  C_B·(V_E − V_B) (r : C_A·V_A = C_B·V_E). Pari « [AH]/[A⁻] = ? » ✓ V_E/V_B − 1. ✗ V_B/V_E (+16) → le rapport
  est renversé. ✗ V_E/V_B (I-9) → (V_E − V_B)/V_B, le « − 1 » vient de la soustraction.
- **`pourcent`** · **V** (forme 2022 N 2.5, valeurs de la leçon) « À V_B = 3,0 mL, quel pourcentage de la forme
  acide ? » ✓ 75 % (rapport 3). ✗ 25 % (+16) → c'est la forme basique. ✗ 50 % (AB-EQU-3) → 50 %, c'est à
  V_E/2 = 6,0 mL.

### Partie 6 : L'indicateur coloré (scène `phv`)

- **`indicateur`** · axe des pH, la bande 8,2-10 · un [[indicateur|indicateur coloré]] est un couple HIn/In⁻
  dont les deux formes n'ont pas la même couleur ; sa [[virage|zone de virage]]. **Q** « Phénolphtaléine, zone
  8,2-10 (tableau du sujet 2020). Dans une solution à pH = 5, elle est… » ✓ incolore : la forme HIn prédomine.
  ✗ rose (AB-BASE-1) → sous sa zone, c'est la forme acide. ✗ de teinte intermédiaire (AB-IND-2) → la teinte
  intermédiaire n'apparaît que dans la zone.
- **`bande`** · `bande:[3.1,4.4]` posée à gauche, pas encore sur la courbe · **P** « On met par erreur de
  l'hélianthine (3,1-4,4). Elle virera vers… » options : « 12 mL, comme la phénolphtaléine : tout indicateur
  vire à l'équivalence » / « les premiers millilitres » / « jamais ». `reveal` : la bande glisse sur la courbe,
  virage entre 0,3 et 3,7 mL environ. Conceptions AB-IND-1, AB-IND-3 (la 1ʳᵉ).
- **`choix`** · **Q** (`2.2.3.14`) « Hélianthine (3,1-4,4), rouge de méthyle (4,2-6,2), phénolphtaléine
  (8,2-10) : laquelle pour ce dosage ? » ✓ la phénolphtaléine : sa zone contient pH_E = 8,7. ✗ le rouge de
  méthyle : il vire pendant le dosage (AB-IND-1) → de 2,6 à 11,6 mL : il vire bien avant l'équivalence.
  ✗ l'hélianthine (AB-IND-1). `apres`, `fort` : « La zone de virage doit contenir pH_E. »
- **`bbt`** · `bande:[6,7.6]` (tableau 2018) · **Q** « Le B.B.T (6-7,6) vire autour de 7. Convient-il ici ? »
  ✓ non : sa zone ne contient pas pH_E = 8,7. ✗ oui : l'équivalence est à pH = 7 (AB-TIT-1, AB-IND-2) → ici
  pH_E = 8,7. ✗ oui : un indicateur vire toujours vers 7 (AB-IND-2) → chaque indicateur a sa zone.
  (Le critère « contient pH_E » est celui qui rend unique la réponse des sujets 2018 et 2020 ; §8.2, point 4.)

### Partie 7 : Exploiter le résultat (scène `dosage`, jeu `chaine` ; `table`)

- **`dilution`** · `ch:'fiole'` · sujet 2025 N, 1-3 (0,25 pt) : (S₀) diluée 100 fois ; C_A = 4,8 × 10⁻²
  mol·L⁻¹. **V** « C₀ = ? » ✓ 4,80 mol·L⁻¹. ✗ 4,8 × 10⁻⁴ mol·L⁻¹ (+17) → diluer divise ; on remonte en
  multipliant. ✗ 4,8 × 10⁻² mol·L⁻¹ (+17) → c'est la solution diluée.
- **`masse`** · `ch:'flacon'` · sujet 2022 N, 2.4 (0,5 pt) : S_a diluée 10 fois de S₀ ; C_a = 5 × 10⁻² ;
  M = 74 g·mol⁻¹ ; masse dissoute dans un litre de S₀. **V** ✓ m = C₀·M = 37 g. ✗ 3,7 g (+17) → C₀ = 10·C_a.
  ✗ 0,74 g : C₀·V_a·M (+18) → on veut un litre de S₀, pas la prise d'essai.
- **`etiquette`** · sujet 2025 N, 1-4 (0,75 pt) : étiquette 500 g·L⁻¹ ; M = 104 g·mol⁻¹. **Q** « L'indication
  est-elle vérifiée ? » ✓ oui : C₀·M ≈ 499 g·L⁻¹, écart relatif 0,2 %. ✗ non : 499 n'est pas 500 (+19) → une
  mesure se compare avec son écart relatif. ✗ on ne peut pas conclure sans pK_A (+19, variante) → la masse par
  litre suffit. (La rédaction attendue : à vérifier, §8.2, point 5.)
- **`ceq`** · scène `table` · sujet 2025 N, 1-6 (0,75 pt) : V_A = 20,0 mL, V_BE = 9,6 mL ; la concentration
  C_eq des ions SO₃²⁻ à l'équivalence. **D** puis Q · lignes : x_max = C_A·V_A = 9,6 × 10⁻⁴ mol (r : le tableau
  à l'équivalence) ; n(SO₃²⁻) = x_max. Pari « C_eq = ? » ✓ x_max/(V_A + V_BE) ≈ 3,2 × 10⁻² mol·L⁻¹.
  ✗ 4,8 × 10⁻² mol·L⁻¹ : divisé par V_A (+20) → la soude a ajouté son volume. ✗ 0,10 mol·L⁻¹ : divisé par
  V_BE (+20).

### Partie 8 (optionnelle, PC et SM, enrichissement) : La conductimétrie (scène `dosage`, jeu `cond`)

Ouverte par « Pour aller plus loin. Hors des tirets du chapitre » et un bouton « Passer à la suite ».
- **`cond-pari`** · une cellule de conductimétrie à la place de la sonde, σ affiché · **P** « Après
  l'équivalence, la conductivité monte… » options : « plus vite qu'avant » / « au même rythme » / « elle
  redescend ». `reveal` : les deux branches. Idée : les HO⁻ libres conduisent beaucoup mieux que les ions
  qu'ils remplacent.
- **`cond-droites`** · **Q** « V_E se lit… » ✓ à l'intersection des deux droites. ✗ au point le plus bas
  (+14, variante) → la courbe n'a pas de minimum ici. ✗ là où σ est maximal.
- **`cond-lire`** · **V** lecture de V_E sur un relevé (valeurs du code ; λ à sourcer, §8.2, point 7).

### Partie 9 : Retour à l'énigme (scène `dosage`, jeu `enigme`)

- **`retour-goutte`** · `V:11.95→12.05, ind:1, phm:1` · texte dépendant du pari `goutte` (forme de
  `rappelEnigme`) : à 12,0 mL le dernier acide est parti ; la goutte suivante laisse ses HO⁻ libres ; le pH
  traverse d'un coup la zone 8,2-10. `fort` : « La couleur bascule parce que le pH saute. » Pas d'action.
- **`retour-volume`** · rappel du pari `combien` · **Q** « Une autre solution d'acide éthanoïque (même V_A)
  demande 18,0 mL de soude. C_A = ? » ✓ 9,0 × 10⁻² mol·L⁻¹. ✗ 6,0 × 10⁻² : la concentration ne change pas, c'est
  le même acide (+21). ✗ 0,11 mol·L⁻¹ : C_B·V_A/V_E (+8).

### Partie 10 : Au bac — voir §6

`bac`, `bac-lecture`, `bac-ca`, `bac-ind`, `bac-rapport`, `bac-2a`, `bac-2b`, `bac-2c`.

### Partie 11 : Bilan (scènes `quiz`, `end`)

- **`q1`** · la copie fautive (sujet 2022 N, figure 2) · **V** « Une copie lit V_bE à 21,7 mL, au bout de la
  flèche de l'étiquette « dpH/dV_b », et trouve C_a ≈ 5,4 × 10⁻² mol·L⁻¹. Son erreur ? » ✓ la flèche désigne la
  courbe ; V_bE se lit au sommet du pic, 20,0 mL. ✗ aucune : V_E se lit où la dérivée redevient nulle
  (AB-EQU-2). ✗ il fallait lire là où pH = 7 (AB-EQU-1). Aucune phrase sur ce que « le correcteur » fait.
- **`q2`** · **Q** (`2.2.3.14`, sujet 2020 N, 1.4) « NH₃ dosé par HCl : hélianthine (3,1-4,4), rouge de méthyle
  (4,2-6,2), phénolphtaléine (8,2-10) ? » ✓ rouge de méthyle (pH_E ≈ 5,8). ✗ phénolphtaléine, comme pour
  l'acide (+13). ✗ hélianthine (AB-IND-1).
- **`q3`** · **Q** « Sur une courbe de dosage, pH = pK_A se lit à… » ✓ V_E/2. ✗ V_E (AB-EQU-3). ✗ là où
  pH = 7 (AB-DIST-3).
- **`fin`** · scène `end` (cinq lignes : réaction totale, une flèche ; à l'équivalence C_A·V_A = C_B·V_E ; E au
  milieu du saut, tangentes ou maximum de la dérivée ; pH_E dépend de l'espèce présente à E, pK_A à V_E/2 ; la
  zone de virage contient pH_E) · fin de séance (forme de `profileHTML`) : paris `goutte`, `combien`,
  `pari-E`, `allure`, `pHE` rappelés ; renvoi piège par piège (B7) : pH = 7 → gabarits 6, 9 ; volumes égaux et
  rapport inversé → 4 ; dérivée nulle → 6 ; demi-équivalence → 7, 8 ; indicateur → 9 ; dilution et
  prélèvement → 10 ; équation et flèche → 1, 2 ; contenu du bécher → 5.

---

## 4. La pause et le rappel (A8)

La pause est proposée en tête de la partie 5, dans le texte de l'étape **`rappel`**, **21ᵉ étape sur 48
(44 %** ; 21/51 = 41 % avec la partie 8, placée après). Sa question « Vérifie » : **que contient le bécher à
l'équivalence, et que vaut son pH face à 7 ?** Elle mêle le contenu du bécher (partie 3) et la courbe (partie
4), et rejoue les deux conceptions les plus fréquentes du dosage, AB-TIT-1 et AB-EQU-3.

Contrôle A7 sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 1 (`sav-rappel`,
`question`, `retour-goutte`, `bac-lecture`, `fin`). A6 : aucune option « je ne sais pas ». A4 : chaque option
fausse des **Q** et **V** porte un `indice`. M7 : chaque étape de la figure change un paramètre visible ; la
plus longue suite sur une scène fixe est `derivee` → `pourcent` (4 étapes, chacune avec un ajout : `der`,
`demi`, lignes de `rapport`, `lect`).

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Sources : bible C6 « Conceptions erronées et pièges » ; `content/pc/reactions-acido-basiques/items.yaml`
(ids AB-) ; ajoutées ici, avec leur raison (+).

| # | Conception | Source | Étapes |
|---|---|---|---|
| AB-TIT-1 | l'équivalence est à pH = 7 | bible ; `items.yaml` | `equivalence`, `pHE`, `base-faible`, `rappel`, `bbt` |
| AB-EQU-1 | V_E (ou E) se lit à pH = 7 | bible ; `items.yaml` | `tangentes` (sur pH_E), `q1`, `bac` |
| AB-TIT-2 | à l'équivalence, volumes ou concentrations égaux | bible ; `items.yaml` | `equivalence`, `ca`, `bac-ca` |
| AB-TIT-3 | une réaction limitée peut servir de dosage | bible ; `items.yaml` | `totale`, `avant-E` ; gabarit 2 |
| AB-EQU-2 | la dérivée est nulle à l'équivalence | bible ; `items.yaml` | `derivee`, `q1`, `bac-2a` |
| AB-EQU-3 | demi-équivalence prise pour l'équivalence | bible ; `items.yaml` | `pari-E`, `rappel`, `tangentes`, `pourcent`, `q3`, `bac-2a` |
| AB-IND-1 | n'importe quel indicateur convient | bible ; `items.yaml` | `bande`, `choix`, `q2`, `bac-ind` |
| AB-IND-2 | tout indicateur vire à pH = 7 | `items.yaml` | `indicateur`, `bbt`, `bac-ind` |
| AB-IND-3 | la couleur donne le volume exact, quel que soit l'indicateur | `items.yaml` | `bande` |
| B-dil | oublier le facteur de dilution ou de prélèvement | bible (piège de copie) ; scindé en +17, +18 | ci-dessous |
| AB-BASE-1 | échelle de pH lue à l'envers | `items.yaml` (C5) | `sav-test`, `indicateur` |
| AB-BASE-3 | force et concentration confondues | `items.yaml` (C5) | `combien` |
| AB-BASE-5 | Brønsted mal appliqué (deux bases qui réagissent) | `items.yaml` (C5) | `apres-E` |
| AB-BASE-7 | constante de réaction mal construite | `items.yaml` (C5) | `fleche-K` |
| AB-DIST-1 | la frontière pK_A lue comme une zone d'égalité | `items.yaml` (C5) | `sav-test` |
| AB-DIST-3 | l'égalité des deux formes placée à pH = 7 | `items.yaml` (C5) | `demi`, `q3` |
| I-9 | une expression réécrite à l'œil (le « − 1 » perdu) | forme de la spec RC | `rapport` |
| +1 | réaction de dosage confondue avec la réaction de l'acide avec l'eau | ajoutée : les deux équations se suivent dans chaque sujet (2021, 2022) | `equation` |
| +2 | ions spectateurs écrits ; NaOH « moléculaire » | ajoutée : énoncés « Na⁺(aq) + HO⁻(aq) » | `equation` |
| +3 | double flèche dans l'équation de dosage | ajoutée : `2.2.3.10` « une seule flèche » | `equation`, `fleche-K` |
| +4 | τ du dosage calculé comme celui de l'acide dans l'eau | ajoutée : annexe « Réaction totale » ; réflexe de C3 | `totale` |
| +5 | titré et titrant échangés dans le montage | ajoutée : `2.2.3.11` | `montage` |
| +6 | la réaction « attend » l'équivalence ; HO⁻ s'accumule avant E | ajoutée : sert le contenu du bécher | `avant-E`, `tableau-avant`, `lent` |
| +7 | à l'équivalence, les deux réactifs à parts égales dans le bécher | ajoutée : lecture fautive de « équivalent » | `pari-E`, `rappel` |
| +8 | rapport inversé dans C_A·V_A = C_B·V_E | ajoutée : calcul des sujets 2018, 2021, 2024 | `ca`, `retour-volume`, `bac-ca`, `bac-2b` |
| +9 | après l'équivalence, plus rien ne change dans le bécher | ajoutée : symétrique de +6 | `apres-E` |
| +10 | le pH monte proportionnellement au volume versé | ajoutée : leurre naturel de `allure` et `goutte` | `goutte`, `allure` |
| +11 | le pH ne bouge pas tant qu'il reste de l'acide | ajoutée : leurre naturel de `allure` | `goutte`, `allure` |
| +12 | l'indicateur cause le saut (signal pris pour cause) | ajoutée : sert `saut` ; non sourcée | `saut` |
| +13 | pH_E > 7 recopié pour une base titrée par un acide | ajoutée : sujet 2020 ; « variation » de l'ancienne leçon (R12) | `base-faible`, `q2` |
| +14 | une valeur lue sur l'axe de la dérivée, ou au bout d'une flèche | ajoutée : figure 2022 (dérivée sans échelle, flèche vers 21,7 mL) | `derivee`, `q1` |
| +15 | pH à la demi-équivalence = pH_E/2 | ajoutée : proportionnalité | `demi` |
| +16 | formes acide et basique échangées dans un rapport ou un pourcentage | ajoutée : sujets 2022 (2.5), 2024 (5-2) | `rapport`, `pourcent`, `bac-rapport` |
| +17 | facteur de dilution oublié ou appliqué à l'envers | bible (piège de copie) | `dilution`, `masse` |
| +18 | prise d'essai confondue avec le volume de la solution | bible (piège de copie) | `masse`, `bac-2c` |
| +19 | égalité stricte exigée avec l'étiquette | ajoutée : 2025 N 1-4 ; attendu à vérifier | `etiquette` |
| +20 | volume total oublié pour une concentration à l'équivalence | ajoutée : 2025 N 1-6 | `ceq` |
| +21 | le volume d'équivalence est une propriété de l'acide, pas de sa quantité | ajoutée : leurre naturel de `combien` | `combien`, `retour-volume` |

Toutes les conceptions de la fiche C6 et toutes les entrées AB-TIT, AB-EQU, AB-IND de `items.yaml` sont
affrontées. **Restent à la leçon C5**, non affrontées ici : AB-BASE-2, -4, -6, -8, -9, AB-DIST-2, AB-CHAIN-1.

---

## 6. Au bac (B6)

**L'exemple commenté** — bac PC 2018, session normale (NS28F), Exercice I, Partie II, sous-partie 1
« Réaction de l'acide lactique avec l'hydroxyde de sodium », questions 1 à 5, barème 0,5 + 0,5 + 0,5 + 0,5 +
0,75 = 2,75 pt imprimé en marge (`docs/sujets/pc/reactions-acido-basiques.md`, statut vérifié, trois passes,
figure mesurée au pixel). Données : V_A = 15 mL, C_B = 3 × 10⁻² mol·L⁻¹, K_A = 10^(−3,9) ; tableau
hélianthine 3-4,4, B.B.T 6-7,6, rouge de crésol 7,2-8,8 ; E lu en (10,0 mL ; 8,0).

- **`bac`** · scène `phv`, jeu `s18`, `tg:0` · « Question 2 : déterminer V_BE et pH_E. Premier geste ? » (pari
  sans `ok`, forme de la spec RC) · options : « Tracer deux tangentes parallèles de part et d'autre du saut,
  puis leur parallèle à égale distance » (le bon réflexe) ; « Chercher sur la courbe le point où pH = 7 »
  (AB-EQU-1 : ce n'est pas E) ; « Calculer V_BE = C_A·V_A/C_B » (C_A est l'inconnue de la question 3). `reveal` :
  `tg:1, med:1, pe:1`.
- **`bac-lecture`** · **D**, commenté, sans action : l'équation AH(aq) + HO⁻(aq) → A⁻(aq) + H₂O(l) (Q1) ; E en
  (10,0 mL ; 8,0) (Q2). Pas d'action (A7 : une seule étape).
- **`bac-ca`** · **Q** Q3 « C_A = ? » ✓ C_B·V_BE/V_A = 2,0 × 10⁻² mol·L⁻¹. ✗ 4,5 × 10⁻² : C_B·V_A/V_BE (+8).
  ✗ 3 × 10⁻² : C_A = C_B (AB-TIT-2).
- **`bac-ind`** · **Q** Q4 « L'indicateur adéquat ? » ✓ rouge de crésol : seule zone qui contient pH_E = 8,0.
  ✗ B.B.T : l'équivalence est vers 7 (AB-TIT-1, AB-IND-2). ✗ hélianthine (AB-IND-1).
- **`bac-rapport`** · **Q** Q5 (0,75 pt) « À V_B = 10 mL : [A⁻]/[AH] ? Espèce prédominante ? » ✓
  10^(pH_E − pK_A) = 10^(4,1) ≈ 1,3 × 10⁴ : A⁻ prédomine. ✗ 1 : autant de l'un que de l'autre (AB-EQU-3) → c'est
  à 5 mL. ✗ 7,9 × 10⁻⁵ : AH prédomine (+16) → 10^(pK_A − pH) est le rapport inverse. `apres`, `html` (forme de
  `bac-copie`) : la pensée d'expert, « ici V_B = V_BE : la formule V_E/V_B − 1 donne 0 et ne sert plus ; on
  passe par K_A et le pH lu » ; la rédaction en cinq lignes, l'expression littérale avant le nombre (consigne des
  sujets, `radioactivite-outils.js` source 10) ; barème cité du sujet.

**Le second exemple, que l'élève complète** — bac PC 2024, session normale (NS 28F), Exercice 1, Partie 2
« Dosage d'une solution aqueuse de la vitamine C », questions 2 (0,5 pt), 3 (0,5 pt), 4 (0,75 pt) (même fichier,
statut vérifié, deux passes, figure re-mesurée). Données : comprimé dissous, V_SA = 50,0 mL ; V_A = 15,0 mL ;
C_B = 1,50 × 10⁻² mol·L⁻¹ ; M(AH) = 176 g·mol⁻¹ ; pic de (C₂) sur 25,0 mL. L'élève choisit trois lignes :

- **`bac-2a`** · scène `phv`, jeu `s24` · **Q** Q2 « V_BE ? » ✓ 25,0 mL, sous le sommet du pic de (C₂). ✗ là où
  (C₂) redevient nulle, vers 30 mL (AB-EQU-2). ✗ 12,5 mL, où pH ≈ pK_A (AB-EQU-3).
- **`bac-2b`** · **Q** Q3 « C_A ? » ✓ 2,5 × 10⁻² mol·L⁻¹. ✗ 9,0 × 10⁻³ : C_B·V_A/V_BE (+8). ✗ 1,5 × 10⁻²
  (AB-TIT-2).
- **`bac-2c`** · `jeu:'chaine'` en vignette · **Q** Q4 « La masse restante ? » ✓ C_A·V_SA·M ≈ 0,22 g.
  ✗ C_A·V_A·M ≈ 0,066 g (+18) → le comprimé est dans 50,0 mL, on n'en a dosé que 15,0. ✗ 0,25 g : la masse
  annoncée recopiée → le comprimé a réagi avec l'air ; c'est la question.

Contrôle B3 : chaque leurre donne une valeur fausse (recalculées §8.1). Non utilisés pour l'exemple : 2021 N
(figure : « coordonnées du point d'équivalence à confirmer par lecture ») ; 2024 N 5-3 (le pH à V_B = 8,5 mL
vient de la figure, valeur non imprimée : à vérifier avant usage) ; 2019 N et 2023 N (C5, pas de dosage).

---

## 7. Les exercices générés (`components/pilote/exercices/dosage-acido-basique.js`, à créer)

Format de `exercices/noyaux.js` et `exercices/modele.js` : réponse calculée, chaque leurre porte `fb` et `erreur`
(étiquette du §5). **Capacités** : une fonction `CAPD(rang)` qui rend `pc-pc 2.2.3.rang`, `pc-sm 2.2.3.rang`,
`pc-svt 2.2.5.rang` (mêmes rangs, 10 à 14), et `2.1.2.2` dans les trois. **Couples admis** (valeurs des sujets
transcrits seulement) : HCOOH/HCOO⁻ 3,75 ; C₆H₅COOH/C₆H₅COO⁻ 4,2 ; CH₃COOH/CH₃COO⁻ 4,75 ;
C₂H₅COOH/C₂H₅COO⁻ 4,9 (tableau 2021) ; acide lactique 3,9 (2018) ; HSO₃⁻/SO₃²⁻ 7,2 (2025) ; NH₄⁺/NH₃ ≈ 9,2
(2020, calculé du Q_r,éq imprimé). **Indicateurs admis** : ceux des tableaux 2018 et 2020, avec la plage du
sujet rejoué (l'hélianthine est 3-4,4 en 2018, 3,1-4,4 en 2020). **Règles de tirage communes (B3)** : rejet si un
leurre calculé tombe à 2 % de la réponse ; volumes de 10,0 à 25,0 mL, concentrations de 1,0 × 10⁻² à
1,0 × 10⁻¹ mol·L⁻¹ (séries 1,0 ; 1,5 ; 2,0 ; 2,5 ; 3,0 ; 5,0) ; V_E entre 5 et 25 mL ; sujets rejoués avec leurs
valeurs imprimées (2018, 2020, 2022, 2024, 2025).

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `dos-equation` | 1 | un couple admis, titrant soude ou acide chlorhydrique ; quatre équations, une juste | 2.2.3.10 | +1 ; +2 ; +3 ; H⁺ libre (AB-BASE-5) |
| 2 | `dos-K` | 2 | K de la réaction de dosage (10^(14 − pK_A) avec HO⁻, 10^(pK_A) avec H₃O⁺) ; une fois sur trois, une réaction entre deux couples proches (K ≈ 0,1 à 10) proposée comme support : « convient-elle ? » | 2.2.3.10 (+ 2.2.3.7 réutilisé) | K inversé, produit (AB-BASE-7) ; réaction limitée acceptée (AB-TIT-3) |
| 3 | `dos-montage` | 1 | un schéma légendé à compléter ; où va le titrant, avec quoi on mesure V_A | 2.2.3.11 | +5 |
| 4 | `dos-equivalence` | 2 | C_A·V_A = C_B·V_E, inconnue tirée parmi les quatre ; mL et L mêlés une fois sur deux | 2.2.3.13, 2.1.2.2 | +8 ; AB-TIT-2 ; mL non converti ; **rejet si V_A = V_E** (les leurres « rapport inversé » et « C égales » retombent sur la réponse) |
| 5 | `dos-becher` | 2 | V_B tiré avant, à, ou après V_E ; quantités de AH, A⁻, HO⁻ ; réactif limitant | 2.2.3.12 | +6 ; +7 ; +9 |
| 6 | `dos-lecture` | 3 | une courbe calculée (couple, C_A, V_A, C_B tirés), avec tangentes ou dérivée ; V_E et pH_E | 2.2.3.12, 2.2.3.13 | AB-EQU-1 ; AB-EQU-2 ; AB-EQU-3 ; +14 ; **le leurre « lu à pH = 7 » porte sur V_E seulement si pK_A ∈ [6 ; 8] (HSO₃⁻), sinon sur pH_E** (§8.1) |
| 7 | `dos-demi` | 2 | lire pK_A à V_E/2 ; identifier l'acide dans le tableau 2021 | 2.2.3.12 (+ 2.2.3.8) | +15 ; AB-DIST-3 ; AB-EQU-3 ; **rejet si deux pK_A du tableau sont à moins de 0,15 de la lecture** |
| 8 | `dos-rapport` | 3 | formes 2022 (pourcentage de la forme acide) et 2024 (rapport, puis pK_A = pH + log(V_E/V_B − 1)) ; V_B ∈ ]0 ; V_E[ | 2.2.3.12 | +16 ; I-9 ; AB-EQU-3 ; **rejet si V_B = V_E/2** (rapport 1, le leurre « demi » coïncide) |
| 9 | `dos-indicateur` | 2 | pH_E calculé (acide faible par la soude, ou base faible par un acide fort) ; trois indicateurs admis | 2.2.3.14 | AB-IND-1 ; AB-IND-2 ; AB-TIT-1 ; +13 ; **exactement une zone contient pH_E, sinon rejet** |
| 10 | `dos-chaine` | 2 | formes 2022 (masse par litre de S₀), 2024 (masse dans le comprimé), 2025 (C₀, étiquette) ; facteur 10 ou 100 | 2.2.3.12 | +17 ; +18 ; +19 |
| 11 | `dos-ceq` | 2 | concentration de la base (ou de l'acide) formée, à l'équivalence (forme 2025) | 2.2.3.12, 2.2.3.13 | +20 ; C_B recopiée |
| 12 | `dos-bac` | 3 | rejoue 2018, 2020, 2022, 2024, 2025 ; ou une forme tirée qui enchaîne équation, E, C_A, indicateur | 2.2.3.10 à 2.2.3.14 | ceux des étapes `bac-*` |

Niveaux : 1 = restituer, reconnaître ; 2 = appliquer une relation à un cas ; 3 = enchaîner une lecture
graphique et deux relations (une question de bac à 0,5 ou 0,75 pt). Chaque question porte `sujet` (B7). Aucun
gabarit de conductimétrie tant que la partie 8 n'est pas retenue (B7).

---

## 8. À vérifier, et questions pour le relecteur

### 8.1 Les données (pour `dosage-acido-basique-outils.js`)

| Donnée | Source | Statut |
|---|---|---|
| 2018 N : V_A = 15 mL, C_B = 3 × 10⁻², K_A = 10^(−3,9), indicateurs 3-4,4 / 6-7,6 / 7,2-8,8, E (10,0 ; 8,0), tangentes de pente 0,89 ; barème 2,75 | `docs/sujets/pc/reactions-acido-basiques.md` | [V] trois passes |
| 2020 N : V_b = 15 mL, C_a = 10⁻², C_b = 10⁻², pH(S_b) = 10,6, Q_r,éq = 1,65 × 10⁻⁵, indicateurs 3,1-4,4 / 4,2-6,2 / 8,2-10 | idem | [V] ; figure « à confirmer par lecture » : la courbe de la leçon est **calculée**, pas relevée |
| 2021 N : tableau des pK_A (3,75 ; 4,2 ; 4,75 ; 4,9) | idem | [V] ; figure non utilisée |
| 2022 N : C_a = 5 × 10⁻², V_a = 20 mL, C_b = 5 × 10⁻², M = 74, dilution 10, pic sur 20,0 mL, flèche vers 21,7 mL, dérivée sans échelle ; barème 0,5 + 0,25 + 0,5 + 0,5 + 0,5 | idem | [V] quatre passes |
| 2024 N : 250 mg, V_SA = 50,0 mL, V_A = 15,0 mL, C_B = 1,50 × 10⁻², M = 176, pic sur 25,0 mL ; barème | idem | [V] deux passes |
| 2025 N : 500 g·L⁻¹, M = 104, pK_A = 7,2, dilution 100, V_A = 20,0 mL, C_B = 0,10, V_BE = 9,6 mL, C₀ = 4,80 ; barème 3,75 | idem | [V] |
| K_e = 10⁻¹⁴ à 25 °C | données des sujets 2020, 2024, 2025 | [V] |
| phénolphtaléine : incolore → rose (« colorless to purple-pink », 8,3-10,0) | Wikipédia, [pH indicator](https://en.wikipedia.org/wiki/PH_indicator) (lu le 2026-11-25) | [V] couleurs ; la leçon garde la plage **des sujets** (8,2-10) |
| valeurs de la leçon : C_A = 6,0 × 10⁻², V_A = 20,0 mL, C_B = 0,10, pK_A = 4,75 | choix d'auteur | — |

**Contrôles faits à la main (le code les refera).** V_E = 0,06 × 20/0,10 = 12,0 mL. pH(0) : h² + K_A·h −
K_A·C_A = 0 avec K_A = 1,778 × 10⁻⁵ → h = 1,024 × 10⁻³, pH = 2,99. pH(3) = 4,75 + log(3/9) = 4,27 ;
pH(4) = 4,45 ; pH(6) = 4,75 ; pH(8) = 5,05 ; pH(11,95) = 4,75 + log 239 = 7,13. pH(12,00) : [A⁻] =
1,2 × 10⁻³/0,032 = 3,75 × 10⁻², K_b = 5,62 × 10⁻¹⁰, [HO⁻] = 4,59 × 10⁻⁶, pH = 8,66. pH(12,05) : excès
5 × 10⁻⁶ mol dans 32,05 mL → 1,56 × 10⁻⁴, pH = 10,19. pH(16) = 12,05 ; pH(20) = 12,30. K = 10^(9,25) =
1,78 × 10⁹ ; leurres 5,6 × 10⁻¹⁰ et 1,8 × 10⁻¹⁹. `totale` : n(HO⁻) restant = 10^(−9,25) × 0,026 = 1,5 × 10⁻¹¹
mol, τ = 1 − 2,4 × 10⁻⁸ ; leurre 10^(−4,75)/0,06 = 3,0 × 10⁻⁴. `ca` : leurre 0,167. `combien` : 24 mL ; leurre
6 mL. `retour-volume` : 0,10 × 18/20 = 9,0 × 10⁻² ; leurre 0,10 × 20/18 = 0,111. `pourcent` : 12/3 − 1 = 3,
75 %. `demi` : leurre 8,66/2 = 4,33. Virages sur la courbe de la leçon (approximation du rapport, le code
refera le calcul exact près de V = 0) : hélianthine 3,1 → 4,4 entre ≈ 0,3 et 3,71 mL ; rouge de méthyle
4,2 → 6,2 entre 2,64 et 11,59 mL ; B.B.T 6 → 7,6 entre 11,36 et 11,98 mL ; phénolphtaléine 8,2 → 10 entre
11,996 et 12,03 mL. Sujet 2020 : V_aE = 15 mL ; pK_A = 14 − (−log 1,65 × 10⁻⁵) = 9,22 ; [NH₄⁺]_E = 5 × 10⁻³,
pH_E = 5,76 : seul le rouge de méthyle convient. Sujet 2018 : C_A = 2,0 × 10⁻² ; leurre 4,5 × 10⁻² ; Q5 :
10^(4,1) = 1,26 × 10⁴, leurre 7,9 × 10⁻⁵. Sujet 2022 : copie 5 × 10⁻² × 21,7/20 = 5,4 × 10⁻² ; m = 37 g ;
leurres 3,7 g et 0,5 × 0,020 × 74 = 0,74 g. Sujet 2024 : C_A = 2,5 × 10⁻² ; leurre 9,0 × 10⁻³ ; m = 0,22 g,
leurre 0,066 g. Sujet 2025 : C₀ = 4,80 ; 4,80 × 104 = 499,2 g·L⁻¹ ; C_eq = 9,6 × 10⁻⁴/0,0296 =
3,24 × 10⁻² ; leurres 4,8 × 10⁻² et 0,10.

**Deux coïncidences trouvées et écartées.** (1) Sur un acide de pK_A éloigné de 7, le pH passe 7 dans le saut
vertical : « V_E lu à pH = 7 » donne 11,9 mL au lieu de 12,0 (même chose en 2018 et 2020) ; le leurre de
`tangentes` porte donc sur pH_E, et le gabarit 6 ne l'applique à V_E que pour HSO₃⁻ (pK_A = 7,2 : pH = 7 est
atteint vers 0,39·V_E). (2) À V_B = V_E/2, le rapport vaut 1 et le leurre « demi-équivalence » coïncide avec la
réponse : `pourcent` prend V_E/4, et le gabarit 8 rejette V_E/2.

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **Descroizilles** : Wikipédia en. ([Titration](https://en.wikipedia.org/wiki/Titration)) dit « developed the
   first burette (which was similar to a graduated cylinder) in 1791 » ; Wikipédia fr.
   ([François-Antoine-Henri Descroizilles](https://fr.wikipedia.org/wiki/François-Antoine-Henri_Descroizilles),
   lu le 2026-11-25) nomme « l'instrument connu sous le nom d'alcalimètre », « dont il étendit l'emploi à
   l'évaluation du titre du vinaigre », sans date ni le mot burette. Que l'alcalimètre soit le tube gradué de
   1791, et qu'il y ait eu un indicateur coloré, n'est **pas** établi : le texte de `combien` s'en tient au
   tube gradué, aux alcalis et au vinaigre. À confirmer sur une source d'histoire de la chimie.
2. **« Une goutte ≈ 0,05 mL »** : ordre de grandeur courant, non sourcé ici. Le texte peut dire « deux gouttes »
   sans chiffre, le code gardant 0,05 mL.
3. **Le montage attendu** : « pH-mètre étalonné », « agitateur magnétique », « pipette jaugée » ; aucun sujet
   transcrit ne demande le schéma. À relire dans le manuel ou un corrigé.
4. **Le critère de l'indicateur** : « la zone contient pH_E » rend unique la réponse des sujets 2018 et 2020 ;
   le critère « la zone est dans le saut » (manuels) n'est pas sourcé ici. Ce que le corrigé exige comme
   justification : à vérifier.
5. **L'étiquette (2025, 1-4)** : comparer par l'écart relatif, ou par la masse par litre seule ? La rédaction
   attendue n'est pas connue.
6. **Les états physiques** dans l'équation de dosage : notés au barème ? (bible §2.2, déjà « à vérifier »).
7. **La conductimétrie (partie 8)** : conductivités molaires de Na⁺, HO⁻, CH₃COO⁻ non sourcées (le sujet 2019
   ne donne que λ(H₃O⁺) = 35 × 10⁻³ et λ(C₆H₅COO⁻) = 3,23 × 10⁻³ S·m²·mol⁻¹) ; la forme des deux branches pour
   un acide faible dépend de la dilution. Rien ne s'affiche avant sourçage.
8. **Les « limites du cadre p. 15 »** citées par `spec-extension.md` §0 (« pH par exploitation expérimentale et
   bilans ; équivalence repérée graphiquement ») viennent d'un fichier supprimé ; elles ne sont pas dans
   `docs/referentiel/`. Le plan ne s'appuie pas sur elles.
9. **pK_A de l'acide éthanoïque** : 4,75 (2021 N) ; la bible cite aussi 4,72 et 4,8 dans des sujets 2026 non
   transcrits. La leçon garde 4,75.

**Histoire (≤ 3 places).**
1. **Descroizilles, vers 1791** (`combien`) [V] sur les deux pages (point 1 pour leurs limites). Pari : le
   volume pour une solution deux fois plus concentrée.
2. **Gay-Lussac, 1824**, qui forge les mots « pipette » et « burette » (« invented the terms "pipette" and
   "burette" in an 1824 paper on the standardization of indigo solutions », Wikipédia en. *Titration*) [V] :
   **fiche de mot `burette` seulement**, sans pari (B8).
3. **Boyle et le sirop de violette** (acides rouges, alcalis verts, 1664) [S] : récit de seconde main
   (article de vulgarisation, pharmacopée de 1911) ; sources discordantes sur les couleurs ; la page
   Wikipédia de Boyle cite l'ouvrage de 1664 sans le décrire. Candidat pour `indicateur` (un pari sur la
   couleur dans le vinaigre et dans une solution alcaline) **si** une source primaire ou un historien le
   confirme ; sinon, rien.

### 8.3 Pour le relecteur

1. **La conductimétrie** : partie 8 optionnelle (3 étapes, PC et SM, enrichissement), ou rien ici et un
   chapitre « mesurer en chimie » commun à C2, C4, C6 (question « À trancher » de la fiche C6) ? Le plan
   recommande **rien ici** tant que le point 7 n'est pas sourcé : 48 étapes.
2. **Scène nouvelle `dosage`** (montage, jetons, pH-mètre et courbe couplés par V_B) : décision du
   propriétaire. Elle porte l'énigme, le contenu du bécher et la figure-clé ; elle reprendra pour C2
   (suivi par dosage) et C10.
3. **Valeurs de la leçon** (C_A = 6,0 × 10⁻², V_A = 20,0 mL, C_B = 0,10, V_E = 12,0 mL) : choisies pour que
   1 mL = 1 jeton et 12 jetons d'acide ; elles gardent les sujets frais pour leurs étapes. Confirmer, ou
   passer aux valeurs d'un sujet (2022 : V_E = 20 mL).
4. **Route** : `/pilote/dosage-acido-basique` (fichiers `dosage-acido-basique-*.js`) ou un nom tiré du dossier
   `content/pc/reactions-acido-basiques` ? Et la leçon C5 : quand, et sous quel nom ?
5. **Les jetons** : dessiner Na⁺ (exact, mais quatre familles à 390 px) ou le dire seulement en texte ?
   Le plan propose `na` en option, éteint par défaut.
6. **Le curseur V** : ouvert seulement à partir de `rappel` (pour que les paris de la figure ne soient pas
   tranchés d'avance, M9), puis libre au bilan. D'accord ?
7. **SVT** : `pourcent` gardé comme bilan de matière (`2.2.5.12`), sans diagramme de distribution. D'accord ?
8. **Exemple commenté** : 2018 (le seul qui enchaîne équation, tangentes, C_A, indicateur et prédominance, avec
   le piège V_B = V_BE en Q5) ; second exemple : 2024 (dérivée, chaîne de prélèvement). Ou 2022 pour l'un
   des deux ?
9. **`base-faible`** : une seule étape pour le dosage d'une base (sujet 2020). Suffisant, ou une seconde au
   bilan (`q2` la complète déjà) ?
