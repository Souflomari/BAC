# 01 — Le bac marocain scientifique, tel qu'il est vraiment (2ème Bac SM-A, SM-B, PC, SVT)

> **Rapport de recherche — refonte de l'application.** Rédigé le 2026-10-21.
> Périmètre : la structure de l'examen, les cadres de référence officiels en vigueur, les
> programmes, les annales, ce qui décide la note, et la comparaison avec le dépôt.
> **Statut : recherche, non validée par l'owner.** Ce document ne modifie aucun autre fichier.

## Conventions de provenance (à lire avant les chiffres)

| Étiquette | Sens |
|---|---|
| **[OFF]** | Lu dans un document officiel du ministère / du CNEE (cadre de référence, guide du candidat), page citée. |
| **[OFF-sujet]** | Lu dans l'**en-tête ou les consignes d'un sujet national officiel** (le CNEE y imprime durée et coefficient). |
| **[SEC]** | Source secondaire sérieuse (site éducatif, presse). Plausible, non officiel. |
| **[PROPRE]** | Mon propre dépouillement d'annales (échantillon indiqué). Ce n'est pas une statistique officielle. |
| **[NC]** | Non confirmé : une seule source faible, ou des sources en désaccord. |
| **[NT]** | Non trouvé. Aucun chiffre n'a été inventé à la place. |

**Le fait le plus important de ce rapport.** Les cadres de référence **2025** (options
internationales, **option français** : la version BIOF, celle de l'élève), publiés par la note
ministérielle **013-25 du 5 février 2025**, ont été récupérés **en entier** (8 documents) et
**lus par OCR** (tesseract `fra`). Le dépôt affirmait que les cadres de maths et de SVT étaient des
scans « non extractibles » et que le cadre 2015 était en vigueur : ce n'est plus vrai. Toutes les
pondérations ci-dessous sont maintenant **citables à la page** (§2, §10).

---

## 0. Résumé (une page)

### L'examen en mots simples

La note du bac est une moyenne de **trois** notes ([OFF] Guide du candidat 2022, p. 6 et p. 9) :

```
Moyenne générale = ( 2 × examen national + examen régional + contrôle continu ) / 4
                    └─ 50 % ─┘             └─ 25 % ─┘        └─ 25 % ─┘
```

- **Examen régional** (fin de 1ère Bac) : français, arabe, éducation islamique,
  histoire-géographie. Il est **déjà joué** quand l'élève entre en 2ème Bac.
- **Contrôle continu** (2ème Bac) : les devoirs de l'année, dans toutes les matières.
- **Examen national** (juin de 2ème Bac) : **cinq épreuves écrites** — les trois matières
  scientifiques de la filière, la philosophie et l'anglais. **C'est là que se joue la moitié de
  la note, et c'est là que l'application doit attaquer.**
- Admis si moyenne ≥ **10/20** sans note éliminatoire. **Rattrapage** si moyenne ≥ **7/20** sans
  note éliminatoire, ou ≥ 10/20 avec une note éliminatoire dans **une seule** matière du national ;
  au rattrapage on repasse **toutes** les matières du national et on garde **la meilleure note de
  chaque épreuve** entre les deux sessions ([OFF] Guide 2022, p. 8-9).

### Coefficients et durées de l'examen national (2ème Bac)

| Épreuve | SM-A | SM-B | PC (Sc. Physiques) | SVT |
|---|:-:|:-:|:-:|:-:|
| Mathématiques | **9** · 4 h | **9** · 4 h | **7** · 3 h | **7** · 3 h |
| Physique-Chimie | **7** · 4 h | **7** · 4 h | **7** · 3 h | **5** · 3 h |
| SVT | **3** · 2 h | — | **5** · 3 h | **7** · 3 h |
| Sciences de l'ingénieur | — | 3 [SEC] · 3 h | — | — |
| Philosophie | **2** · 2 h | **2** · 2 h | **2** · 2 h | **2** · 2 h |
| Anglais (langue étrangère 2) | **2** · 2 h | **2** · 2 h | **2** · 2 h | **2** · 2 h |
| **Somme des coefficients** | 23 | 23 | 23 | 23 |

Tout est **[OFF-sujet]** (en-têtes de sujets nationaux 2014-2024, §1.3) sauf le coefficient de
sciences de l'ingénieur (**[SEC]**, 9rayti). Durées recoupées par le calendrier officiel 2022
([OFF] Guide 2022, annexe 1/8). **Les deux cellules « contestées » du dépôt (maths 7 en PC et en
SVT) sont tranchées : 7, imprimé sur les sujets.**

Examen régional (1ère Bac, mêmes matières pour SM et sciences expérimentales) : français
**coef 4** · 2 h ([OFF-sujet] régional 2024) ; arabe 2 h, éducation islamique 1 h 30,
histoire-géographie 2 h ([OFF] Guide 2022, annexe 6/8) ; coefficients arabe / islamique / HG =
**2** chacun **[SEC]** (tawjihna).

### Ce qui compte le plus, matière par matière

| Matière | Ce qui décide la note | Preuve |
|---|---|---|
| **Maths SM** | **Analyse = 50 %** (un problème de 10 pts : étude de fonction + suite récurrente + intégrales). Puis **complexes + structures algébriques = 35 %** (3,5 + 3,5 pts, présents dans presque tous les sujets) et **arithmétique ou probabilités = 15 %** (3 pts). **Aucune géométrie dans l'espace.** | [OFF] cadre SM p. 6 ; [PROPRE] 29 sujets 2010-2025 |
| **Maths PC/SVT** | **Analyse = 55 %** (problème de 8 à 11 pts). **Géométrie dans l'espace = 15 %** (3 pts, chaque année). **Complexes + probabilités = 30 %**. | [OFF] cadre SExp p. 5 ; [PROPRE] 6 sujets |
| **PC (filières PC et SM)** | **Mécanique 27 %**, **électricité 21 %**, ondes 11 %, nucléaire 8 % ; chimie 33 % — et **la chimie vaut 7 points sur 20 dans chaque sujet observé**, avec presque toujours une partie **acide-base / dosage**. | [OFF] cadres PC p. 18 et SM p. 19 ; [PROPRE] 10 sujets |
| **PC (filière SVT)** | Même architecture, **programme réduit** (pas de rotation, satellites, pendules, modulation, électrolyse) ; mécanique 26 %, électricité 19 %, ondes 14 %. | [OFF] cadre PC « Sciences agricoles » 2025 p. 13-14 [NC pour SVT, voir §3.5] |
| **SVT (filière SVT)** | **La génétique pèse 45 à 50 % (9-10 pts)** ; énergie, immunologie, géologie 15-25 % chacune. **75 % des points sont du raisonnement sur documents**, 25 % de restitution. | [OFF] cadre SVT p. 20-23 |
| **SVT (filière PC)** | 4 domaines × 25 % dont **un domaine absent de la filière SVT** : « utilisation des matières organiques et inorganiques » (ordures, pollutions, radioactivité). **Pas d'immunologie.** | [OFF] cadre SVT-PC p. 19-20 |
| **SVT (SM-A)** | Génétique uniquement : transmission + génétique humaine (50 %), variation (biométrie) + populations (50 %). | [OFF] cadre SVT-SMA p. 5-9 |

---

## 1. Architecture de l'examen

### 1.1 Les trois composantes

| Composante | Quand | Poids | Ce qu'elle contient | Source |
|---|---|:-:|---|---|
| Examen régional unifié | fin de 1ère Bac | 25 % | Matières non scientifiques (voir §1.4). Obligatoire. Ses résultats **n'entrent pas** dans la décision de passage en 2ème Bac. | [OFF] Guide 2022 p. 6-7 |
| Contrôle continu | 2ème Bac | 25 % | « Toutes les matières de la filière » de l'année terminale, devoirs semestriels. | [OFF] Guide 2022 p. 8 |
| Examen national unifié | fin de 2ème Bac | 50 % | « Les matières caractéristiques de chaque filière + la langue étrangère 2 ». Candidats libres : idem. | [OFF] Guide 2022 p. 7 |

Formule officielle (candidats scolarisés) : `(2 × national + régional + contrôle continu) / 4`.
Chaque composante est elle-même une moyenne pondérée par les coefficients des matières
(`Σ note × coef / Σ coef`, formule imprimée pour les candidats libres) ([OFF] Guide 2022 p. 9).
Base juridique citée par le guide : arrêté n° 2385.06 du 16 octobre 2006, modifié par l'arrêté
n° 16.52 du 4 janvier 2016 ([OFF] Guide 2022 p. 6).

### 1.2 Sessions, rattrapage, note éliminatoire, mentions

| Règle | Valeur | Source |
|---|---|---|
| Admission | moyenne générale ≥ 10/20 **et** aucune note éliminatoire | [OFF] Guide 2022 p. 9 |
| Accès au rattrapage | moyenne ≥ **7/20** sans note éliminatoire, **ou** ≥ 10/20 avec une note éliminatoire dans **une seule** matière du national ; ou absence pour force majeure | [OFF] Guide 2022 p. 8 |
| Contenu du rattrapage | **toutes** les épreuves du national | [OFF] Guide 2022 p. 8 |
| Calcul après rattrapage | **meilleure note de chaque épreuve** entre les deux sessions (depuis 2012), si l'élève a passé toutes les épreuves des deux sessions | [OFF] Guide 2022 p. 9 |
| Rattrapage du régional | existe pour les scolarisés absents **pour force majeure** | [OFF] Guide 2022 p. 7 ; dates 2026 : 29-30 juin [SEC] |
| Valeur de la note éliminatoire | **0/20** selon un forum ; texte officiel non retrouvé | [NC] tawjihnet (forum) |
| Seuils de mentions | le guide cite « مستحسن / حسن / حسن جدا » (AB / B / TB) sans seuils ; les seuils 12/14/16 et « Excellent ≥ 18 » ne sont pas confirmés ici | [NT] officiel |
| Présélection post-bac (ENSA…) | 75 % moyenne du national + 25 % moyenne du régional | [SEC] tawjihnet |

> Le seuil « 8/20 » du dépôt ressemble à une règle **ancienne** : un article d'Aujourd'hui le
> Maroc sur la session 2003 parle de 8/20 (vu dans un extrait de recherche, page non ouverte,
> [NC]) ; le guide officiel 2022 dit **7/20**. Voir §7.

### 1.3 Durées et coefficients — la preuve sur les sujets

Le CNEE imprime durée et coefficient dans l'en-tête de chaque sujet. Lus sur les sujets
officiels (option française) :

| Sujet (code CNEE) | En-tête lu | URL |
|---|---|---|
| Maths SM A et B — NS 24F, 2024 N | 4 h · coef 9 | [S-M1] |
| Maths « filière SVT et filière Sc. Physiques » — NS 22F, 2024 N | 3 h · coef 7 | [S-M2] |
| PC filière Sc. Physiques — NS 28F, 2024 N | 3 h · coef 7 | [S-P1] |
| PC filière SVT — NS 27F, 2023 N | 3 h · coef 5 | [S-P2] |
| PC SM A et B — NS 31, 2014 N | 4 h · coef 7 | [S-P3] |
| SVT filière SVT — NS 32F, 2024 N | 3 h · coef 7 | [S-S1] |
| SVT filière Sc. Physiques — RS 34F, 2024 R | 3 h · coef 5 | [S-S2] |
| SVT SM-A — NS 36F, 2024 N | 2 h · coef 3 | [S-S3] |
| Philosophie, toutes filières scientifiques — NS 05, 2024 N | 2 h · coef 2 | [S-F1] |
| Anglais, toutes filières scientifiques — NS 12, 2024 N | 2 h · coef 2 | [S-E1] |
| Français régional 1ère Bac, filières scientifiques — 2024 | 2 h · coef 4 (3 pour les filières littéraires) | [S-R1] |

Le cadre PC SM 2025 confirme 4 h ([OFF] cadre PC-SM p. 4) ; l'horaire officiel 2022 confirme
SI = 8 h-11 h (3 h) en SM-B ([OFF] Guide 2022 annexe 1/8). Coefficient SI = 3 : **[SEC]**
(9rayti), non vu sur un en-tête.

### 1.4 L'examen régional (1ère Bac) — ce qui compte de la 1ère année

| Matière | Durée | Coef | Source |
|---|:-:|:-:|---|
| Français (langue étrangère 1) | 2 h | 4 | [OFF-sujet] S-R1 ; durée [OFF] Guide 2022 |
| Arabe | 2 h | 2 | durée [OFF] ; coef [SEC] tawjihna |
| Éducation islamique | 1 h 30 | 2 | durée [OFF] ; coef [SEC] |
| Histoire-géographie | 2 h | 2 | durée [OFF] ; coef [SEC] |

Cadres du régional : note 25-020 du 10 mars 2025, « mêmes cadres qu'en 2023, reconduits en
2026 » [SEC] (tawjihnet). **De la 1ère Bac, ce qui compte aussi pour le national, ce sont les
prérequis** : en SM, la géométrie dans l'espace (produit scalaire, produit vectoriel), le
dénombrement, les bases de l'arithmétique et la rotation sont enseignés en **1ère** Bac
([SEC] AlloSchool, programme 1ère Bac SM) — c'est pourquoi le cadre 2ème Bac SM ne les teste pas.
En PC, travail-énergie, rotation, oxydoréduction, dosages et chimie organique de 1ère sont des
prérequis directs ([SEC] AlloSchool, PC 1ère Bac SM).

### 1.5 BIOF (option française) et filière arabe

- Le BIOF est **le même bac marocain** : mêmes épreuves, mêmes coefficients ; les **matières
  scientifiques** sont enseignées et examinées **en français** ([SEC] 9rayti, « sections
  internationales »). Les sujets BIOF portent la mention « خيار فرنسية » et un code suffixé
  **F** (NS 24F, NS 28F, NS 32F…) ; avant ~2018 la mention était « الترجمة الفرنسية »
  (traduction française du sujet arabe) ([OFF-sujet], sujets SM 2016-2017).
- Philosophie : sujet **en arabe** pour toutes les filières scientifiques (NS 05) ([OFF-sujet] S-F1).
- Il existe **trois** jeux de cadres : arabe, option français, option anglais ([SEC] tawjihnet,
  liste des fichiers de la note 013-25). Le contenu des cadres arabes n'a pas été comparé ici [NT].

### 1.6 Calendrier

Session 2026 (déjà passée) : national normal **4-6 juin 2026**, résultats **17 juin** ; rattrapage
**2-4 juillet**, résultats **11 juillet** ; 528 135 candidats ([SEC] Hespress, 4 juin 2026).
Régional : 1-2 juin, rattrapage 29-30 juin [SEC]. **Session 2027 : dates [NT].** Nouveauté 2026 :
correction-test obligatoire dans les commissions, saisie directe des notes ([SEC] Hespress 2026).

---

## 2. Les cadres de référence officiels en vigueur

### 2.1 Quels documents, quelle version

La note ministérielle **013-25 du 5 février 2025** publie les cadres de la session 2025 ; un
modérateur de tawjihnet indique qu'ils sont reconduits pour **2026** (« هو نفسه باك 2025 », avril
2026) [SEC]. **Pour 2027, aucun nouveau cadre trouvé [NT]** : hypothèse de travail = les cadres
2025 restent valables, à revérifier dès la publication de la note 2027.

Documents récupérés (tous : « Cadres de référence de l'examen national du baccalauréat — Options
internationales du baccalauréat marocain — option français — 2025 », CNEE) :

| Document | Pages | Lien (Google Drive, publié par tawjihnet) |
|---|:-:|---|
| Maths — Sc. Mathématiques A et B | 6 | [C-M1] |
| Maths — Sc. Expérimentales (PC + SVT) | 5 | [C-M2] |
| PC — Sc. Physiques | 29 | [C-P1] (identique au PDF du dépôt) |
| PC — Sc. Mathématiques A et B | 30 | [C-P2] |
| PC — Sc. Expérimentales « Sciences agricoles » (donné pour la filière SVT) | 15 | [C-P3] |
| SVT — filière SVT | 23 | [C-S1] |
| SVT — filière Sc. Physiques | 20 | [C-S2] |
| SVT — SM-A | 9 | [C-S3] |

Antécédent : en mai 2021 le ministère avait déjà « actualisé » 167 cadres, dont 62 pour le
national, en fonction des « taux d'exécution différenciés des programmes » ([SEC] Hespress
2021). En janvier 2024, après les grèves, les cadres de l'année ont été **révisés** ([SEC]
Medias24) — ce qui explique des sujets 2024 atypiques (§3.6).

### 2.2 La machinerie commune

Chaque cadre garantit **couverture** (tous les domaines testés), **représentativité** (poids des
domaines et des habiletés respectés) et **conformité** (situations conformes aux compétences,
contenus et conditions) ; il contient un tableau des contenus, un tableau des niveaux
d'habileté et un **tableau de spécification** ([OFF] cadre PC p. 2-3). La **grille de
correction** doit indiquer, pour chaque question, ses points et **la référence de la question
dans le cadre** ([OFF] cadre PC p. 4).

---

## 3. Par filière × matière

### 3.1 Mathématiques — SM-A et SM-B (coef 9, 4 h, calculatrice interdite)

**Pondérations [OFF] cadre SM p. 6**

| Domaine | Sous-domaines | Poids |
|---|---|:-:|
| Analyse | Suites numériques · Limites et continuité · Dérivabilité et étude de fonctions · Calcul intégral | **50 %** |
| Algèbre et géométrie | Nombres complexes · Structures algébriques | **35 %** |
| Algèbre et géométrie | Arithmétique · Calcul des probabilités | **15 %** |

Habiletés [OFF] p. 6 : application directe **40 %** · connaissances non explicites en situation
habituelle **40 %** · situations inhabituelles par synthèse **20 %**.

**Les 73 capacités du cadre** ([OFF] p. 2-5 ; libellés résumés, numéros exacts) :

- **1.1 Suites (5)** — 1.1.1 suites arithmétiques/géométriques pour étudier des suites
  récurrentes ; 1.1.2 suites de référence, critères de convergence, **suites adjacentes** ;
  1.1.3 limite de `f(u_n)` ; 1.1.4 suites `u_{n+1}=f(u_n)` avec `f(I)⊂I` ; 1.1.5 problèmes variés.
- **1.2 Limites et continuité (7)** — continuité en un point / sur un intervalle ; image d'un
  intervalle ; **TVI** ; **dichotomie** (1.2.5) ; **fonction réciproque** : la déterminer (1.2.6),
  théorème de la bijection (1.2.7).
- **1.3 Dérivation et étude de fonctions (20)** — dérivabilité ; monotonie ; signe depuis un
  tableau ou un graphe ; dérivée seconde, inégalités ; **dérivée de la réciproque** (1.3.7) ;
  primitives par formules (1.3.8) ; logarithmes (1.3.9-1.3.11) ; **exponentielle de base a**
  (1.3.12-1.3.14) ; **puissances réelles** (1.3.15) ; étude complète et tracé (1.3.16) ;
  **Rolle, accroissements finis, inégalité des AF** pour les suites `u_{n+1}=f(u_n)` et les
  encadrements (1.3.17) ; **équations différentielles** `y'=ay+b` (1.3.18),
  `y''+ay'+by=0` (1.3.19), et celles qui s'y ramènent (1.3.20).
- **1.4 Calcul intégral (7)** — techniques de calcul ; aire entre deux courbes ; **volume de
  révolution autour de l'un ou l'autre axe** (1.4.3) ; inégalités, limites, approximations ;
  **fonctions `x ↦ ∫ f`** (1.4.5) ; **sommes de Riemann** (1.4.6) ; fonctions et suites définies
  par une intégrale (1.4.7).
- **2.1 Arithmétique (9)** — PPCM/PGCD par décomposition ; diviseurs ; Euclide, Bézout ;
  **systèmes de numération** : écrire, calculer, comparer, utiliser (2.1.4-2.1.6) ; congruences,
  ℤ/nℤ (2.1.7) ; divisibilité, **Gauss, Bézout, Fermat**, nombres premiers (2.1.8) ;
  `ax+by=c` (2.1.9).
- **2.2 Nombres complexes (10)** — calcul dans les trois écritures ; traduction géométrique
  (distance, angle, **barycentre**, alignement, orthogonalité, **cocyclicité**) ; trigonométrie
  (linéarisation) ; équations du 2nd degré et celles qui s'y ramènent ; **`zⁿ = a`** et
  interprétation (2.2.7) ; écriture complexe des transformations **et de leurs composées**
  (2.2.8) ; problèmes géométriques.
- **2.3 Probabilités (7)** — modèle combinatoire ; réunion, contraire, intersection ;
  conditionnelle ; indépendance ; variable aléatoire et paramètres ; **fonction de répartition**
  (2.3.6) ; **loi binomiale**.
- **2.4 Structures algébriques (8)** — loi de composition interne ; **groupe, anneau, corps,
  espace vectoriel** ; transport de structure par **homomorphisme / isomorphisme** (2.4.5) ;
  sous-groupe, sous-espace ; **famille libre, génératrice, base** ; composantes dans une base.

**Format observé [PROPRE] — 29 sujets SM lus (normales 2010-2025 ; rattrapages 2010-2013,
2015-2018, 2020, 2022-2025)**

| Créneau | Points habituels | Fréquence |
|---|:-:|---|
| Analyse (1 problème de 10 pts, ou 2 exercices 7,5 + 2,5 / 7,75 + 2,25) | 10 | 29/29 |
| Nombres complexes | 3,5 | 29/29 |
| Structures algébriques | 3,5 (3,5-4,5) | 28/29 (absent 2021 N ; au choix avec l'arithmétique en 2020 N et R) |
| Arithmétique | 3 | **16/16 normales**, 8/13 rattrapages |
| Probabilités | 3 | **0/16 normales**, 6/13 rattrapages (2010 R, 2013 R, 2015 R mixte, 2016 R, 2017 R, 2018 R) |

Exemples récents ([OFF-sujet] consignes) : 2022 N et 2025 N = analyse 10 · complexes 3,5 ·
arithmétique 3 · structures 3,5 ; 2023 N = analyse 7,75 + 2,25 · complexes 3,5 · arith. 3 ·
structures 3,5 ; 2024 N = analyse 7,5 + 2,5 · complexes 3,5 · arith. 3 · structures 3,5.
2020 (Covid) : 3 exercices dont 1 au choix, analyse 13 pts ; 2021 : analyse 12, complexes 4,
arithmétique 4, pas de structures.

**Le problème d'analyse, presque toujours** [PROPRE] (lecture des énoncés 2022-2025) : étude
complète d'une fonction (limites, dérivabilité en un point avec interprétation graphique,
variations, branches, tracé), existence/unicité d'une solution (TVI), **suite récurrente
`u_{n+1}=f(u_n)`** (récurrence, monotonie, convergence, souvent via les accroissements
finis), puis **intégrales** (IPP, changement de variable, aire) ou **fonction / suite définie
par une intégrale**. Marques SM récurrentes : TAF, réciproque (et arctan), sommes de Riemann.

**Structures** : un ensemble de matrices `M₂(ℝ)` ou `M₃(ℝ)`, une loi `*`, un morphisme vers
`(ℂ*,×)` ou `(ℝ,+)`, conclure « groupe / anneau / corps » — le même squelette d'année en année
[PROPRE]. **Arithmétique** : un nombre premier `p`, des congruences, **Fermat** (2016 N, 2023 N),
Gauss/Bézout, une équation diophantienne [PROPRE].

**À viser** : le problème d'analyse (la moitié de l'épreuve) ; puis structures et complexes, qui
sont des points quasi garantis à format stable ; l'arithmétique (3 pts à chaque session
normale). Les probabilités sont au cadre, mais n'ont pas été tirées en session normale depuis
2010 dans l'échantillon — à travailler, pas en premier.

### 3.2 Mathématiques — filières PC et SVT (coef 7, 3 h, calculatrice non programmable)

**Pondérations [OFF] cadre SExp p. 5**

| Domaine | Sous-domaines | Poids |
|---|---|:-:|
| Analyse | Suites · Continuité, dérivation et étude de fonctions · Calcul intégral | **55 %** |
| Algèbre et géométrie | Produit scalaire dans l'espace · Applications du produit scalaire · **Produit vectoriel** | **15 %** |
| Algèbre et géométrie | Nombres complexes · Calcul de probabilités | **30 %** |

Habiletés [OFF] p. 5 : **50 % / 35 % / 15 %**.

**Les 61 capacités** ([OFF] p. 2-4) : suites (5 : `u_{n+1}=au_n+b`, homographiques, `f(u_n)`,
convergence) ; continuité-dérivation-étude (**24** : TVI et unicité, dérivée et monotonie de la
**réciproque** 1.2.11, problèmes de min/max 1.2.12, résolution graphique 1.2.10, primitives
1.2.14-15, logarithmes et **logarithme décimal** 1.2.18, exponentielle, étude et tracé,
**`y'=ay+b` 1.2.23 et `y''+ay'+by=0` 1.2.24**) ; intégral (4 : primitive ou IPP, propriétés,
aire entre deux courbes, **volume autour de l'axe des abscisses**) ; produit scalaire (3) ;
applications (6 : plan par point + normale, droite orthogonale à un plan, ensemble
`x²+y²+z²+ax+by+cz+d=0`, sphère, `MA·MB=0`, distance point-plan, positions plan/sphère et
droite/sphère) ; **produit vectoriel (4 : aire d'un triangle, plan par trois points, distance
point-droite, problèmes)** ; complexes (9 : trois écritures, linéarisation, traduction
géométrique, **translation / homothétie / rotation**, `az²+bz+c=0` à coefficients réels) ;
probabilités (6 : dénombrement, conditionnelle, indépendance, variable aléatoire, **binomiale**).

Ce que SM a **et que SExp n'a pas** dans son cadre : Rolle/AF, sommes de Riemann, fonctions
définies par une intégrale, volume autour de l'axe des ordonnées, puissances réelles et
exponentielle de base a, dichotomie, `zⁿ=a`, composées de transformations, fonction de
répartition, arithmétique, structures. Ce que **SExp a et SM n'a pas** : toute la géométrie
dans l'espace (15 %), le logarithme décimal, les problèmes de min/max. **`y''+ay'+by=0` est
dans les deux** ([OFF] SExp 1.2.24 ; SM 1.3.19).

**Format observé [PROPRE] — 6 sujets NS/RS 22F (2022 N, 2023 N, 2023 R, 2024 N, 2024 R, 2025 R)**

| Créneau | Points | Fréquence |
|---|:-:|---|
| Géométrie dans l'espace | 3 | 6/6 |
| Nombres complexes | 3 – 4 | 6/6 |
| Probabilités | 2 – 3 | 6/6 |
| Suites (exercice séparé) | 3 | 3/6 (sinon dans le problème) |
| Équation différentielle + intégrale (exercice) | 2,5 | 1/6 (2022 N) |
| **Problème : étude de fonction + calcul intégral (+ suites)** | **8 – 11** | 6/6 |

([OFF-sujet] rubrique « Composantes du sujet », imprimée en page 1 de chaque sujet.)

### 3.3 Physique-Chimie — filière PC (coef 7, 3 h, 3 ou 4 exercices)

**[OFF] cadre PC p. 4, 18, 19**

| Domaine | Sous-domaine | Poids |
|---|---|:-:|
| Physique | Ondes | 11 % |
| Physique | Transformations nucléaires | 8 % |
| Physique | Électricité | 21 % |
| Physique | **Mécanique** | **27 %** |
| Chimie | Transformations rapides et lentes | 6 % |
| Chimie | Transformations non totales (deux sens, équilibre, acide-base) | 10 % |
| Chimie | Sens d'évolution (évolution spontanée, piles, électrolyse) | 10 % |
| Chimie | Méthode de contrôle (estérification-hydrolyse, réactif / catalyse) | 7 % |

Habiletés : utilisation des ressources **50 %**, application d'une solution expérimentale **15 %**,
résolution de problème **35 %** ([OFF] p. 18). Styles d'items : QCM, vrai/faux, appariement,
réponse courte, développement, synthèse, questions complexes ([OFF] p. 4). Le programme complet
(chapitres et travaux pratiques) est **annexé au cadre** ([OFF] p. 20-29) et déjà transcrit
dans `pc-physique-chimie.yaml (supprimé le 2026-10-22)`.

Ordre d'enseignement usuel [SEC] (AlloSchool) : ondes (3 chapitres) → nucléaire (2) → RC, RL,
RLC libre, ondes EM et modulation → mécanique (Newton, chutes, mouvements plans, satellites,
rotation, oscillateurs, énergie, atome de Bohr) ; chimie en parallèle (lentes/rapides, suivi
temporel, deux sens, équilibre, acide-base et dosage, évolution spontanée, piles, électrolyse,
estérification, contrôle).

**Format observé [PROPRE] — 10 sujets NS/RS 28F (2019 N, 2021 N, 2022 N/R, 2023 N/R, 2024 N/R,
2025 N/R), d'après le sommaire imprimé en page 1**

| Créneau | Points | Fréquence | Contenus tirés |
|---|:-:|---|---|
| **Chimie** | **7** | 10/10 | acide-base / dosage **10/10** ; électrolyse 4/10 (2019 N, 2022 N, 2022 R, 2023 R) ; cinétique / suivi temporel 3/10 ; pile 1/10 ; estérification-hydrolyse 1-2/10 |
| Ondes | 2,5 – 3,5 | 8/10 | onde mécanique 5, ondes lumineuses / diffraction 3 |
| Nucléaire | 2 – 2,5 (ou fusionné avec les ondes) | 7/10 | radioactivité, datation (C14), énergie |
| **Électricité** | 3,5 – 5 | 10/10 | RC 6, RL 6, RLC / LC libre 5, **modulation / démodulation 6** |
| **Mécanique** | 5 – 5,5 | 10/10 | chute verticale avec frottement 3, chute libre / projectile 2, plan incliné 2, **satellites 2**, oscillateurs (élastique, pesant, torsion) 5-6 |

Consigne officielle récurrente : « **On donnera les expressions littérales avant de passer aux
applications numériques** » ([OFF-sujet] PC 2024 N).

### 3.4 Physique-Chimie — SM-A et SM-B (coef 7, 4 h, **4 ou 5** exercices)

Mêmes poids de domaines que la filière PC (11/8/21/27 ; 6/10/10/7) mais habiletés **45 % / 15 % /
40 %** ([OFF] cadre PC-SM p. 19) : plus de résolution de problème. **Contenus en plus** de la
filière PC ([OFF] cadre PC-SM p. 9 et 23) :

- **Oscillations forcées dans un circuit RLC série** : régime sinusoïdal, valeurs efficaces,
  impédance, **résonance d'intensité, bande passante, facteur de qualité, puissance**.
- **Mouvement d'une particule chargée dans un champ électrique uniforme** (la filière PC n'a que
  le champ magnétique).

Les sujets SM récents n'ont pas pu être échantillonnés : AlloSchool republie les sujets de la
filière PC sous l'onglet SM (mêmes fichiers, même empreinte MD5) [PROPRE]. Le sujet SM 2014 N
montre la forme : chimie 7 pts + trois exercices de physique (nucléaire 2,25, RC 5,25,
skieur + pendule pesant 5,5) ([OFF-sujet] S-P3).

### 3.5 Physique-Chimie — filière SVT (coef 5, 3 h, 3 ou 4 exercices)

Le cadre utilisé est celui des « Sciences agricoles », que tawjihnet donne comme **le même cadre**
pour la filière SVT (option française) — **[NC]** : aucun cadre PC intitulé « filière SVT »
n'a été trouvé. Les sujets SVT (NS 27F) sont cohérents avec lui.

| Sous-domaine | Ondes | Nucléaire | Électricité | Mécanique | Rapides/lentes | Non totales | Sens d'évolution | Contrôle |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Poids [OFF] p. 13 | 14 % | 8 % | 19 % | 26 % | 7 % | 11 % | 7 % | 8 % |

Habiletés **60 % / 15 % / 25 %** ([OFF] p. 13-14). **Programme réduit** ([OFF] p. 5-12) : pas de
modulation / ondes EM, pas de rotation autour d'un axe fixe, pas de satellites, pas de pendules
pesant / de torsion, pas de chute avec frottement fluide, pas d'atome de Bohr, **pas
d'électrolyse** ; mécanique = Newton, chute libre verticale, plan horizontal / incliné,
projectile, solide-ressort horizontal et énergie. Exemple 2023 N : chimie 7 (acide propanoïque)
· ondes 3 · condensateur 5 · mouvement d'un solide 5 ([OFF-sujet] S-P2).

### 3.6 SVT — filière SVT (coef 7, 3 h)

**Domaines et poids [OFF] cadre SVT p. 2-7, 8-19 (« pourcentage de recouvrement »), 22-23**

| # | Domaine | Recouvrement | Poids à l'examen (tableau de spécification) |
|:-:|---|:-:|---|
| 1 | Consommation de la matière organique et flux d'énergie (respiration, fermentation, **muscle strié squelettique**, bilan ATP) | 17 % | 15 % ou 25 % (3 ou 5 pts) |
| 2 | **Nature de l'information génétique et mécanisme de son expression — génie génétique** (cycle cellulaire, ADN, réplication, gène-protéine, code génétique, transcription-traduction, transgenèse par *Agrobacterium*, insuline) | 18 % | génétique 2+3+4 : **45 à 50 % (9-10 pts)** |
| 3 | Transmission de l'information génétique par reproduction sexuée — génétique humaine (méiose, **brassages intra- et interchromosomique**, fécondation, Mendel, dominance / codominance / létal, **gènes liés, crossing-over, carte factorielle**, arbres généalogiques, caryotypes, anomalies) | 18 % | (idem) |
| 4 | Génétique des populations (Hardy-Weinberg, facteurs de variation, notion d'espèce) | 11 % | (idem) |
| 5 | **Immunologie** (CMH, ABO, réponse non spécifique et spécifique, coopération cellulaire, allergie, **SIDA / VIH**, vaccination, sérothérapie, greffe de moelle) | 18 % | 15-20 % ou 25 % (3-4 ou 5 pts) |
| 6 | Géologie : chaînes de montagnes (subduction, obduction, collision), déformations, **métamorphisme**, **granitisation** | 18 % | 15-20 % ou 25 % (3-4 ou 5 pts) |

Habiletés : **restitution 25 %** (QCM, vrai/faux, appariement, sériation, définitions, légendes)
· **raisonnement scientifique et communication écrite et graphique 75 %** ([OFF] p. 20).

**Structure du sujet [OFF] p. 23** :
- **Partie I (5 pts)** : restitution sur **l'un** des 6 domaines.
- **Partie II (15 pts), 3 ou 4 exercices** :
  - si la Partie I porte sur la génétique → Ex.1 énergie **3** · Ex.2 génétique **5** ·
    Ex.3 immunologie **3-4** · Ex.4 géologie **3-4** ;
  - si la Partie I porte sur un autre domaine → génétique **9** (1 ou 2 exercices) + deux exercices
    de **3** pts sur les deux domaines non évalués en Partie I.
- Matériel : calculatrice non programmable, **papier millimétré** ([OFF] p. 23).

**Échantillon [PROPRE] — 10 sujets NS/RS 32F (classement par lecture des intitulés et mots-clés ;
marge d'erreur possible sur l'attribution des exercices de génétique)**

| Sujet | Partie I | Partie II |
|---|---|---|
| 2019 N | géologie | énergie-muscle 3,25 · maladie héréditaire 4,75 · dihybridisme 3,25 · immuno (VIH, vaccin) 3,75 |
| 2021 N | info génétique | **pollution (Tianjin) 5,5** · maladie de Tay-Sachs 6,5 · dihybridisme 3 |
| 2022 N | énergie | expression + maladie 4,5 · gènes liés / carte factorielle 4,5 · immuno 3 · géologie (subduction) 3 |
| 2022 R | géologie | énergie 3 · myopathie (expression) 4,5 · croisements 4,5 · immuno 3 |
| 2023 N | immunologie | énergie (NARP, mitochondrie) 3 · maladie de Fabry 5 · maïs, gènes liés 4 · géologie (Zagros) 3 |
| 2023 R | géologie | énergie · agammaglobulinémie 5,75 · lapins, croisements 3,25 · immuno |
| 2024 N | **mixte** (allergie, chaîne respiratoire, Mendel, Klinefelter) | énergie 3 · génétique (SOD1) 5 · croisements 3 · immuno (ASLO) 4 — **pas de géologie** |
| 2024 R | **mixte** | énergie 3 · génétique (dysferline) 5 · croisements 3 · immuno 4 — **pas de géologie** |
| 2025 N | géologie | énergie-muscle (sarcopénie) 3 · génétique (Walker-Warburg) 6 · croisements 3 · immuno 3 |
| 2025 R | immunologie | muscle (myofibrille) 3 · génétique 6 · code génétique + arbre 3 · géologie (Himalaya) 3 |

Lecture : la **génétique est dans 10/10 sujets** (8 à 9,5 pts en Partie II) ; l'**énergie /
muscle** dans 9/10 (exercice de 3 pts en Partie II dans 8/10, Partie I en 2022 N) ; immunologie
9/10 (Partie I ou II) ; géologie 7/10. **Deux alertes
d'annales** : 2021 N contient un exercice « pollution » (domaine aujourd'hui **hors** du cadre
filière SVT), et 2024 N/R n'ont **pas de géologie** (cadres révisés après les grèves de 2023-24,
[SEC] Medias24) — **les annales ≤ 2024 ne définissent pas le périmètre ; le cadre 2025 le fait.**

### 3.7 SVT — filière PC (coef 5, 3 h)

**[OFF] cadre SVT-PC p. 3-6, 19-20**

| # | Domaine | Poids |
|:-:|---|:-:|
| 1 | Consommation de la matière organique et flux d'énergie (dont muscle) | 25 % (5 pts) |
| 2 | Nature de l'information génétique, expression — transmission par reproduction sexuée, lois statistiques chez les diploïdes | 25 % |
| 3 | **Utilisation des matières organiques et inorganiques** : ordures ménagères, pollutions (produits énergétiques, industries chimiques, alimentaires, minérales), **éléments radioactifs et énergie nucléaire** | 25 % |
| 4 | Géologie des chaînes de montagnes (comme filière SVT) | 25 % |

Partie I = restitution sur 1 domaine (5 pts) ; Partie II = **3 exercices de 5 pts**, chacun sur
un domaine non évalué en Partie I ([OFF] p. 20). **Pas d'immunologie, pas de génétique humaine,
pas de génétique des populations, pas de génie génétique** dans ce cadre. Exemple 2024 R :
Partie I fermentation lactique, mitochondrie, crossing-over ([OFF-sujet] S-S2).

### 3.8 SVT — SM-A (coef 3, 2 h)

**[OFF] cadre SVT-SMA p. 2-9** : deux domaines à **50 %** chacun — (1) transmission de
l'information génétique par reproduction sexuée **et génétique humaine** (méiose, brassages,
lois statistiques, gènes liés, carte factorielle, arbres, caryotypes, anomalies) ; (2) **variation
génétique (biométrie** : variation continue / discontinue, polygones de fréquences, lignée pure,
sélection artificielle) **et génétique des populations**. Partie I 5 pts sur un domaine,
Partie II 15 pts (1 ou 2 exercices). Exemples : 2024 N Partie I méiose, caryotype, brassages ;
2024 R Partie I biométrie ([OFF-sujet] S-S3).

### 3.9 Les autres épreuves (pour les poids seulement)

- **Philosophie** (2 h, coef 2, en arabe) : **un sujet au choix parmi trois** — question,
  citation à discuter, texte à analyser ([OFF-sujet] S-F1).
- **Anglais** (2 h, coef 2), commun à toutes les filières scientifiques ([OFF-sujet] S-E1).
- **Sciences de l'ingénieur** (SM-B, 3 h, coef 3 [SEC]) : non étudié ici.
- **Régional** : français (coef 4), arabe, éducation islamique, histoire-géographie (§1.4).

---

## 4. Ce qui décide la note

1. **Le format est stable et annoncé.** Chaque sujet imprime en page 1 la liste des exercices et
   leurs points (maths SM « L'EXERCICE1 se rapporte à l'analyse (10 pts) » ; maths SExp
   « Composantes du sujet » ; PC « Exercice 1 : Chimie (7 points) ») [OFF-sujet]. L'application
   peut donc entraîner **par créneau** : un élève SM sait qu'il aura 10 pts d'analyse, 3,5 de
   complexes, 3,5 de structures, 3 d'arithmétique.
2. **Les cadres écrivent les poids, les sujets les respectent à ±1 pt** : maths SM 50/35/15 ↔
   10 / 7 / 3 pts ; PC chimie 33 % ↔ 7 pts ; SVT génétique 45-50 % ↔ 8-10 pts [OFF + PROPRE].
3. **Barème fin.** Le barème est imprimé à côté de chaque question, au quart de point
   (0,25 / 0,5 / 0,75 / 1) [OFF-sujet, ex. maths SM 2025 N]. Les correcteurs travaillent en
   commission de ≥ 3, avec contrôle des additions ([OFF] Guide 2022 p. 8) et, depuis 2026, une
   correction-test commune pour harmoniser ([SEC] Hespress 2026). La grille référence chaque
   question au cadre ([OFF] cadre PC p. 4).
4. **Rédaction attendue** (ce que les sujets exigent) : en PC, l'**expression littérale avant
   l'application numérique** [OFF-sujet] ; en maths SM, sans calculatrice, des démonstrations
   complètes (« montrer que », récurrence, interprétation graphique demandée explicitement)
   [OFF-sujet] ; en SVT, des réponses au **format imposé** (recopier les couples (1,…),
   vrai/faux) en Partie I, et en Partie II l'exploitation **document par document**
   (« en vous basant sur le document 2… ») avec schémas et échiquiers [OFF-sujet].
5. **Aucun rapport officiel de correcteurs** (statistiques de réussite par question) n'a été
   trouvé [NT]. Les « éléments de réponse » officiels existent : le ministère les a envoyés aux
   candidats pour 2008-2019 ([SEC] Hespress 2020) ; AlloSchool publie des corrigés.

---

## 5. Carte proposée de l'application

Principe : **la filière est la racine**, parce que les cadres diffèrent par filière non seulement
en difficulté mais en **capacités** (§3). Un chapitre peut être partagé, mais **sa liste de
capacités, ses poids et ses épreuves dépendent de la filière**. Chaque feuille porte l'identifiant
officiel de la capacité (ex. `M-SM 1.3.17`), ce qui rend chaque leçon traçable jusqu'au cadre.

```
filière (SM-A | SM-B | PC | SVT)
└── matière (coef, durée, format d'épreuve, habiletés %)
    ├── Épreuve  ── créneaux observés (ex. SM : Analyse 10 · Complexes 3,5 · Structures 3,5 · Arith/Proba 3)
    │              └── annales rangées par créneau (code CNEE : NS 24F, NS 28F, NS 32F…)
    └── domaine (poids % du cadre)
        └── sous-domaine / chapitre
            └── capacité officielle (id + libellé du cadre + niveau d'habileté visé)
                └── exercices-types tirés des annales (ex. « suite u_{n+1}=f(u_n) + TAF »)
```

**Arbre concret (chapitres → capacités)**

- **Maths SM** (9) — Épreuve 4 h
  - Analyse 50 % : Limites et continuité + réciproque (1.2.1-1.2.7) · Dérivation, TAF/Rolle,
    réciproque (1.3.1-1.3.8, 1.3.16-1.3.17) · Logarithme (1.3.9-1.3.11) · Exponentielle et
    puissances réelles (1.3.12-1.3.15) · Équations différentielles (1.3.18-1.3.20) · Suites
    (1.1.1-1.1.5) · Primitives et calcul intégral, Riemann (1.3.8, 1.4.1-1.4.7)
  - Complexes + structures 35 % : Complexes 1 et 2 (2.2.1-2.2.10) · Lois de composition, groupes,
    anneaux, corps (2.4.1-2.4.5) · Espaces vectoriels (2.4.6-2.4.8)
  - Arithmétique + probabilités 15 % : Arithmétique et numération (2.1.1-2.1.9) · Probabilités,
    variable aléatoire, binomiale, fonction de répartition (2.3.1-2.3.7)
  - Prérequis 1ère Bac (non testés tels quels) : dénombrement, géométrie dans l'espace, rotation
- **Maths PC/SVT** (7) — Épreuve 3 h
  - Analyse 55 % : Limites, continuité, TVI (1.2.1-1.2.4) · Dérivation, réciproque, étude
    (1.2.5-1.2.13, 1.2.22) · Primitives (1.2.14-1.2.15) · Logarithme, log décimal (1.2.16-1.2.19) ·
    Exponentielle (1.2.20-1.2.21) · Équations différentielles (1.2.23-1.2.24) · Suites (1.1.1-1.1.5) ·
    Calcul intégral (1.3.1-1.3.4)
  - Géométrie 15 % : Produit scalaire et applications (2.1.1-2.2.6) · Produit vectoriel (2.3.1-2.3.4)
  - Complexes + probabilités 30 % : Complexes (2.4.1-2.4.9) · Dénombrement et probabilités (2.5.1-2.5.6)
- **PC filière PC** (7) — 3 h · **PC SM** (7) — 4 h, + RLC forcé, + particule dans champ
  électrique · **PC filière SVT** (5) — 3 h, sous-ensemble (§3.5)
  - Ondes (3 ch.) · Nucléaire (2) · Électricité (RC, RL, RLC libre, [SM : RLC forcé],
    modulation [pas en SVT]) · Mécanique (Newton, chutes, plans, [satellites, rotation,
    pendules, atome : pas en SVT]) · Chimie (lentes/rapides, suivi, deux sens, équilibre,
    acide-base/dosage, évolution spontanée, piles, [électrolyse : pas en SVT], estérification,
    contrôle)
- **SVT filière SVT** (7) — 6 domaines (§3.6) · **SVT filière PC** (5) — 4 domaines dont
  « matières organiques et inorganiques » (§3.7) · **SVT SM-A** (3) — 2 domaines génétiques (§3.8)
- **Transversal** : Philosophie (2) · Anglais (2) · Méthode d'épreuve par matière
  (rédaction, gestion du temps par créneau).

---

## 6. Ce qu'il faut attaquer en premier

Mesure : **part de la moyenne générale** = `0,5 × coef / 23 × poids du domaine` (la note du
national pèse 50 %, Σ coef = 23 dans les quatre filières). Les poids viennent des cadres [OFF] ;
la colonne « difficulté » est **mon jugement** [PROPRE], fondé sur le niveau d'habileté et les
annales.

### SM-A / SM-B

| Rang | Cible | Part de la moyenne générale | Difficulté | Pourquoi d'abord |
|:-:|---|:-:|:-:|---|
| 1 | **Maths — problème d'analyse** (étude de fonction, suite récurrente + TAF, intégrales) | **9,8 %** | haute | la moitié de l'épreuve coef 9, chaque année |
| 2 | **Maths — structures algébriques** | ≈ 3,4 % | moyenne | 3,5 pts à format quasi fixe ; spécifique SM ; gain rapide |
| 3 | **Maths — nombres complexes** | ≈ 3,4 % | moyenne | 3,5 pts dans 29/29 sujets |
| 4 | **PC — chimie** (acide-base / dosage d'abord, puis électrolyse, cinétique) | 5,0 % | moyenne | 7 pts fixes ; l'acide-base revient à chaque sujet |
| 5 | **PC — mécanique** | 4,1 % | haute | 27 % de la PC |
| 6 | **Maths — arithmétique** (Fermat, congruences, Gauss) | ≈ 2,9 % | haute | 3 pts dans 16/16 normales |
| 7 | **PC — électricité** (RC/RL/RLC, modulation ; SM : RLC forcé) | 3,2 % | moyenne | 21 % de la PC |
| 8 | Anglais · Philosophie | 4,3 % chacun | faible / moyenne | coef 2 chacun, souvent négligés |
| 9 | SVT (SM-A) génétique · SI (SM-B) | 6,5 % au total | moyenne | coef 3 |
| 10 | PC — ondes, nucléaire | 1,7 % + 1,2 % | faible | courts et standard : points faciles |
| 11 | Maths — probabilités | (dans les 2,9 %) | moyenne | au cadre, mais tirées seulement en rattrapage dans l'échantillon |

### Filière PC

| Rang | Cible | Part de la MG | Difficulté |
|:-:|---|:-:|:-:|
| 1 | **Maths — problème d'analyse** (fonction + intégrale + suites) | **8,4 %** | haute |
| 2 | **PC — chimie** (7 pts ; acide-base / dosage en tête) | 5,0 % | moyenne |
| 3 | **PC — mécanique** | 4,1 % | haute |
| 4 | **Maths — complexes + probabilités** | 4,6 % | moyenne |
| 5 | **PC — électricité** | 3,2 % | moyenne |
| 6 | **Maths — géométrie dans l'espace** (3 pts fixes) | 2,3 % | faible |
| 7 | SVT (coef 5) : 4 domaines × 2,7 % — dont **matières organiques et inorganiques**, absent de l'application | 10,9 % au total | faible à moyenne |
| 8 | Anglais · Philosophie | 4,3 % chacun | — |
| 9 | PC — ondes, nucléaire | 1,7 % + 1,2 % | faible |

### Filière SVT

| Rang | Cible | Part de la MG | Difficulté |
|:-:|---|:-:|:-:|
| 1 | **SVT — génétique** (expression, croisements et carte factorielle, génétique humaine, populations) | **6,8 – 7,6 %** | haute |
| 2 | **Maths — problème d'analyse** | 8,4 % | haute |
| 3 | **SVT — méthode Partie II** (exploiter un document, raisonner, construire un graphe) | transversal : 75 % de la SVT | haute |
| 4 | **SVT — énergie et muscle** (présente dans 9/10 sujets, 3 pts en Partie II dans 8/10) | 2,3 – 3,8 % | moyenne |
| 5 | **SVT — immunologie** | 2,3 – 3,8 % | moyenne |
| 6 | **PC — chimie** (7 pts) | ≈ 3,6 % | moyenne |
| 7 | **SVT — géologie** | 2,3 – 3,8 % | moyenne |
| 8 | Maths — complexes, probabilités, géométrie (3 pts chacun, fixes) | 6,9 % au total | faible à moyenne |
| 9 | PC — mécanique, électricité (programme réduit) | 2,8 % + 2,1 % | moyenne |
| 10 | Anglais · Philosophie | 4,3 % chacun | — |

---

## 7. Écarts avec le dépôt

### 7.1 Confirmé par les sources officielles

- Formule 50 / 25 / 25 et `(2N + R + CC)/4` — `cadre.yaml` `grading.formula`, `bac-reference.md` §2
  ✓ [OFF] Guide 2022.
- Coefficients maths 9 (SM), PC 7 (SM, PC), SVT 3 (SM-A), 5 (PC), 7 (SVT), philo 2 ; durées SM 4 h,
  SExp 3 h, SVT SM-A 2 h ✓ [OFF-sujet]. **Les deux cellules « contested » (maths 7 en PC et en
  SVT) sont confirmées à 7** : retirer le drapeau dans `cadre.yaml` et `bac-reference.md` §5.
- Poids et habiletés maths : SM 50 / 35 / 15 et 40 / 40 / 20 ; SExp 55 / 15 / 30 et 50 / 35 / 15 ✓
  [OFF] — désormais citables `cadre 2025 p. 6` (SM) et `p. 5` (SExp).
- PC filière PC : poids 11 / 8 / 21 / 27 / 6 / 10 / 10 / 7 et habiletés 50 / 15 / 35 ✓ (p. 18-19).
- SVT : barème 5 / 15 et habiletés 25 / 75 ✓ ; liste des 6 domaines de la filière SVT, **immunologie
  comprise**, ✓ ([OFF] p. 2).
- SM : géométrie dans l'espace hors cadre ✓ ; Fermat (2.1.8) ✓ ; systèmes de numération
  (2.1.4-2.1.6) ✓ ; réciproque dans les deux filières ✓ — les citations « verbatim » de
  `README-maths.md` correspondent mot pour mot au cadre officiel.
- Présélection 75 / 25 ✓ [SEC] ; dates de la session 2026 ✓ [SEC].

### 7.2 Faux ou périmé

| Fichier | Affirmation du dépôt | Ce que disent les sources |
|---|---|---|
| `cadre.yaml` `rattrapage_band: [8, 9.99]` ; `bac-reference.md` §2 | rattrapage si moyenne entre 8 et 9,99 | **≥ 7/20** sans note éliminatoire, ou ≥ 10 avec une note éliminatoire dans une seule matière ; meilleure note par épreuve ([OFF] Guide 2022 p. 8-9) |
| `cadre.yaml` `eliminatory` | national < 5/20 et régional < 3/20 éliminatoires | **[NC]** — non trouvé dans le texte officiel ; un forum indique 0/20 |
| `bac-reference.md` §2 | « pas de rattrapage du régional » | il en existe un pour les absences pour force majeure ([OFF] Guide 2022 p. 7) |
| `cadre.yaml` `mentions` (dont « excellent ≥ 18 ») | seuils donnés comme faits | **[NT]** officiellement |
| `README-maths.md`, `README-svt.md`, en-têtes des YAML maths et SVT | « cadre **2015** en vigueur pour 2026 », PDF « scanné, non extractible », donc aucune provenance `cadre p.N` | le cadre en vigueur est le **cadre 2025** (note 013-25) ; il se lit par OCR (§10) ; **toutes les provenances peuvent passer en `cadre 2025 p.N`** |
| `maths-sexp.yaml` (équations différentielles, `limites`) | « PAS de `y''+ay'+by=0` générale, qui relève du programme SM » | **faux** : capacité **1.2.24** du cadre SExp ([OFF] p. 3). La leçon `content/maths/equations-differentielles/lesson.md` l'avait déjà relevé d'après le sujet SExp 2022 N |
| `maths-sexp.yaml` | produit vectoriel « statut à confirmer en SExp » | **confirmé** : sous-domaine 2.3, 4 capacités ([OFF] p. 4) |
| `maths-sexp.yaml` | dichotomie au programme SExp | absente du cadre SExp 2025 (SM 1.2.5 seulement) — à classer en hors cadre ou en prérequis |
| `bac-reference.md` §8, `cadre.yaml` `exam_format.physique_chimie` | « 3 à 4 exercices » pour la PC | vrai pour PC et SVT ; **SM : 4 ou 5 exercices, 4 h** ([OFF] cadre PC-SM p. 4) |
| `cadre.yaml` `habiletes_ratios`, `domain_weights` | un seul jeu PC (50 / 15 / 35) | **trois** jeux : PC 50 / 15 / 35 ; SM **45 / 15 / 40** ; SVT **60 / 15 / 25** avec poids **14 / 8 / 19 / 26 ; 7 / 11 / 7 / 8** |
| `README-svt.md` §2, `svt.yaml` `variante_pc` | la SVT de la filière PC = « programme allégé (sous-ensemble) » | **pas un sous-ensemble** : elle contient un domaine absent de la filière SVT (matières organiques et inorganiques) et exclut immunologie, génétique humaine, populations, génie génétique ([OFF] SVT-PC p. 19-20) |
| `svt.yaml` | répartition par domaine « non publiée (PDF scanné) » | **publiée** : génétique 45-50 %, énergie, immuno, géologie 15-25 % chacune ; recouvrement 17 / 18 / 18 / 11 / 18 / 18 % ([OFF] p. 8-22) |
| `web/src/lib/curriculum.ts` | `geometrie-espace` commun à toutes les filières ; blurb maths « … et géométrie dans l'espace » | hors cadre SM (prérequis de 1ère Bac) → `filieres: ["pc","svt"]` |
| `curriculum.ts` | une seule liste SVT pour SM-A, PC, SVT | trois cadres différents (§3.6-3.8) |
| `curriculum.ts` | une seule liste PC pour SM, PC, SVT | SM : + RLC forcé, + particule dans un champ électrique ; SVT : programme réduit (§3.5) |
| `curriculum.ts` filières | anglais absent ; SI = « stub » sans coefficient sourcé | anglais coef 2 [OFF-sujet] ; SI coef 3 [SEC] |
| `content/svt/role-enzymes` | « rôle des enzymes dans la digestion » rangé dans le domaine énergie | **aucune occurrence** d'« enzyme » ni de « digestion » dans les trois cadres SVT 2025 → hors cadre (prérequis au mieux) |

### 7.3 Manquant dans le dépôt

- **SVT filière SVT** : le domaine 2 entier (information génétique, expression, génie génétique —
  **18 %** du recouvrement) ; le **muscle strié squelettique** (tiré au moins en 2019 N, 2024 N,
  2025 N et 2025 R) ; méiose,
  fécondation et brassage **intrachromosomique** / gènes liés / carte factorielle (explicitement au
  cadre, et tirés en 2022 N et 2023 N). Les 11 leçons ne couvrent qu'environ 4 domaines sur 6.
- **SVT filière PC** : le domaine « utilisation des matières organiques et inorganiques » (25 %).
- **SVT SM-A** : la biométrie (variation des caractères quantitatifs).
- **Maths SM** : fonction de répartition (2.3.6) ; complexes — barycentre, cocyclicité, composées
  de transformations, `zⁿ = a` (2.2.2, 2.2.7-2.2.8) : à vérifier leçon par leçon.
- **PC SM** : RLC forcé ; particule chargée dans un champ électrique.
- **La couche « épreuve »** : aucune structure ne décrit les créneaux par filière (ex. « SM :
  analyse 10 · complexes 3,5 · structures 3,5 · arithmétique 3 »), ni ne range les annales par
  créneau et par code CNEE. C'est la couche qui manque pour « savoir précisément quoi attaquer ».
- **Anglais et philosophie** : 17,4 % du national à elles deux ; seule la philosophie a une ébauche.

---

## 8. Limites et ce qui reste à faire

- Cadres de **2027** : non publiés au moment de la recherche [NT].
- Sujets **PC SM** récents : non échantillonnés (AlloSchool republie ceux de la filière PC) ;
  à prendre sur tawjihnet ou moutamadris.
- Cadre **PC pour la filière SVT** : seul le cadre « Sciences agricoles » est disponible ; son
  identité avec la filière SVT repose sur tawjihnet [NC].
- Le dépouillement SVT est un **classement par mots-clés et intitulés** ; l'attribution d'un exercice
  « génétique » entre expression, transmission et humaine peut être fausse à l'unité près.
- Coefficients du régional (arabe, islamique, HG), coefficient SI, valeur de la note éliminatoire,
  seuils des mentions : non lus sur un document officiel.
- « Orientations pédagogiques » (programmes 2007) : non retrouvées en ligne [NT]. Le programme PC est
  dans l'annexe du cadre ; pour les maths et la SVT, les capacités du cadre en tiennent lieu.

---

## 9. Sources

**Documents officiels (CNEE / MEN)**

| Id | Document | Ce qu'il soutient | URL |
|---|---|---|---|
| G22 | Guide du candidat, bac 2022 (CNEE), 37 p. | formule, 25 / 25 / 50, rattrapage ≥ 7, meilleure note, régional, durées (annexes) | https://moutamadris.ma/wp-content/uploads/2022/05/دليل-المترشح-لإمتحانات-البكالوريا-2022-.pdf |
| N13 | Note 013-25 du 5 février 2025 et liste des cadres (relais tawjihnet) | version en vigueur, reconduite en 2026 | https://www.tawjihnet.net/vb/goto/post?id=103676 |
| C-M1 | Cadre 2025 Maths SM A et B (opt. fr.) | §3.1 | https://drive.google.com/file/d/12D6bY0QnCjk-loZ15suB6iwlhTn4aB56/view |
| C-M2 | Cadre 2025 Maths Sc. Expérimentales (opt. fr.) | §3.2 | https://drive.google.com/file/d/1NisQChmknNEzTD-109MrepxToJSTauJg/view |
| C-P1 | Cadre 2025 PC Sc. Physiques (opt. fr.) — aussi `CDR_EXAM_NAT_BAC_25_PC-PC_Op_FR.pdf (supprimé le 2026-10-22)` | §3.3 | https://drive.google.com/file/d/1-wXw-Htm5DJh3Ln8oJOLDomT7R7a4Bw6/view |
| C-P2 | Cadre 2025 PC SM A et B (opt. fr.) | §3.4 | https://drive.google.com/file/d/1IQmFZEDJ8YifBaxjbDb28LG6dNDh6-Zh/view |
| C-P3 | Cadre 2025 PC Sc. Exp. « Sciences agricoles » (donné pour la filière SVT) | §3.5 | https://drive.google.com/file/d/1eU9ywURzL8t-lFfWMjl29HAjeOwzYT6E/view |
| C-S1 | Cadre 2025 SVT filière SVT (opt. fr.) | §3.6 | https://drive.google.com/file/d/1-IfDCu2r7FvdEge7V9uJxqsNc-6rzxNb/view |
| C-S2 | Cadre 2025 SVT filière Sc. Physiques (opt. fr.) | §3.7 | https://drive.google.com/file/d/1cG4PKRSDvRoJBNOVUhie0bPQQvan6Hjn/view |
| C-S3 | Cadre 2025 SVT SM-A (opt. fr.) | §3.8 | https://drive.google.com/file/d/1TJfPFrlydV5lkTRxGHhxDgHWDDlBhAJH/view |

**Sujets nationaux officiels (hébergés par AlloSchool)** — en-têtes (durée, coefficient) et
sommaires (créneaux, points)

| Id | Sujet | URL |
|---|---|---|
| S-M1 | Maths SM 2024 N (NS 24F) | https://www.alloschool.com/assets/documents/course-435/examen-national-mathematiques-sciences-maths-2024-normale-sujet.pdf |
| S-M2 | Maths SVT + PC 2024 N (NS 22F) | https://www.alloschool.com/assets/documents/course-439/examen-national-maths-sciences-et-technologies-2024-normale-sujet.pdf |
| S-P1 | PC filière PC 2024 N (NS 28F) | https://www.alloschool.com/assets/documents/course-423/examen-national-physique-chimie-spc-2024-normale-sujet.pdf |
| S-P2 | PC filière SVT 2023 N (NS 27F) | https://www.alloschool.com/assets/documents/course-489/examen-national-physique-chimie-2-bac-svt-2023-normale-sujet.pdf |
| S-P3 | PC SM 2014 N (NS 31) | https://www.alloschool.com/assets/documents/course-421/examen-national-physique-chimie-sciences-maths-2014-normale-sujet.pdf |
| S-S1 | SVT filière SVT 2024 N (NS 32F) | https://www.alloschool.com/assets/documents/course-398/examen-national-svt-2eme-bac-svt-2024-normale-sujet.pdf |
| S-S2 | SVT filière PC 2024 R (RS 34F) | https://www.alloschool.com/assets/documents/course-399/examen-national-svt-sciences-physiques-2024-rattrapage-sujet.pdf |
| S-S3 | SVT SM-A 2024 N (NS 36F) | https://www.alloschool.com/assets/documents/course-400/examen-national-svt-sciences-maths-a-2024-normale-sujet.pdf |
| S-F1 | Philosophie, filières scientifiques, 2024 N (NS 05) | https://www.alloschool.com/assets/documents/course-109/alflsfa-llshab-alalmia-oaltqnia-2024-aldora-alaadia-almodhoa.pdf |
| S-E1 | Anglais, filières scientifiques, 2024 N (NS 12) | https://www.alloschool.com/assets/documents/course-107/examen-anglais-2024-session-normale-sujet.pdf |
| S-R1 | Français régional 1ère Bac 2024 (Tanger-Tétouan-Al Hoceïma) | https://www.alloschool.com/assets/documents/course-44/examen-regional-francais-2024-tanger-tetouan-al-hoceima-sujet.pdf |

**Archives d'annales (2010-2025, normale + rattrapage, sujet + corrigé)** — utilisées pour §3 :
- Maths SM : https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-mathematiques-a-biof
- Maths PC/SVT (rangées sous « Sciences et Technologies » mais en-têtes NS 22F) :
  https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof
- PC filière PC : https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-physiques-biof
- PC filière SVT : https://www.alloschool.com/course/physique-et-chimie-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof
- SVT filière SVT : https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof
- SVT filière PC / SM-A : https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-physiques-biof ,
  https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-svt-2eme-bac-sciences-mathematiques-a-biof
- Programmes 1ère Bac (ordre et contenus usuels) :
  https://www.alloschool.com/course/mathematiques-1er-bac-sciences-mathematiques-biof ,
  https://www.alloschool.com/course/physique-et-chimie-1er-bac-sciences-mathematiques-biof
- Officiel : le ministère a envoyé « sujets et éléments de réponse 2008-2019 » aux candidats 2020 —
  https://fr.hespress.com/137340-men-bac-2020-les-documents-encadrant-les-examens-ont-ete-envoyes-aux-candidats.html

**Sources secondaires**

| Source | Ce qu'elle soutient | URL |
|---|---|---|
| Hespress, 5 mai 2021 | 167 cadres actualisés (62 national) | https://fr.hespress.com/202961-examens-certifiants-le-men-definit-167-cadres-de-reference-actualises.html |
| Medias24, 3 janv. 2024 | cadres 2024 révisés après les grèves | https://medias24.com/2024/01/03/les-cadres-de-reference-des-examens-regionaux-et-nationaux-seront-revisees-pour-lannee-en-cours/ |
| Hespress, 4 juin 2026 | dates et effectifs 2026, correction-test | https://fr.hespress.com/476079-476079.html |
| tawjihna | coefficients du régional (arabe, islamique, HG = 2) et du CC 1ère Bac | https://tawjihna.com/التوجيه/معاملات-المواد-للسنة-الاولى-باكالوريا-علوم-تجريبية.html |
| 9rayti — SM-A / PC | coefficients SM-A, SI (SM-B), horaires | https://www.9rayti.com/doros/lycee/b-sciences-mathmatique-a , https://www.9rayti.com/doros/lycee/b-sciences-physiques |
| 9rayti — sections internationales | BIOF : matières scientifiques en français | https://www.9rayti.com/article/sections-internationales-bac-marocain-matieres-examens |
| tawjihnet — présélection ENSA | 75 % national + 25 % régional | https://www.tawjihnet.net/bac-preselection-ensa-maroc-2026-2027/amp/ |
| tawjihnet (forum) | note éliminatoire = 0 [NC] | https://www.tawjihnet.net/vb/threads/134795/ |
| Aujourd'hui le Maroc (session 2003, extrait de recherche) | ancienne règle de rattrapage à 8/20 [NC] | https://aujourdhui.ma/?p=37283 |
| neosvt | liste des unités SVT et des sessions disponibles | https://neosvt.com/examens-nationaux-svt-2bac-svt/ |

---

## 10. Reproduire les chiffres

Les cadres 2025 sont des scans ; ils se lisent avec tesseract (langue `fra`), après rotation
automatique des pages en paysage (`tesseract --psm 0` donne l'angle).

```bash
# 1. Télécharger un cadre (ID Google Drive du tableau §9)
curl -sSL -o maths_sm.pdf "https://drive.usercontent.google.com/download?id=12D6bY0QnCjk-loZ15suB6iwlhTn4aB56&export=download&confirm=t"
# 2. Rendre les pages en PNG (PyMuPDF) puis OCR
python3 -c "import fitz; d=fitz.open('maths_sm.pdf'); [p.get_pixmap(dpi=300).save(f'p{i+1:02d}.png') for i,p in enumerate(d)]"
for f in p*.png; do tesseract "$f" - -l fra --psm 6; done > maths_sm.txt
# Page 6 : « Analyse 50% · Nombres complexes + Structures algébriques 35% · Arithmétique + Calcul des probabilités 15% »
```

Les créneaux des annales se lisent dans le texte des sujets (`pdftotext` ou PyMuPDF) : chercher
« se rapporte à » (maths SM), « COMPOSANTES DU SUJET » (maths SExp), « comporte » (PC).
