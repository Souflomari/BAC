# 01 — Mathématiques

> **Statut : brouillon v0, 2026-10-22, à discuter.** Capacités citées par leur identifiant dans
> [`docs/referentiel/maths-sm.yaml`](../referentiel/maths-sm.yaml) (`sm`) et
> [`docs/referentiel/maths-sexp.yaml`](../referentiel/maths-sexp.yaml) (`sexp`), relus sur les cadres
> officiels 2025. Créneaux et fréquences : [`docs/refonte/01-programme-bac-maroc.md`](../refonte/01-programme-bac-maroc.md)
> §3.1-3.2 (29 sujets SM, 6 sujets PC/SVT, [PROPRE]). Histoire : banque de
> [`docs/refonte/02-comprendre-en-profondeur.md`](../refonte/02-comprendre-en-profondeur.md) §5.1.
> Étiquettes : voir le [README](README.md).

## 1. Deux épreuves différentes

| | SM-A et SM-B | PC et SVT (sciences expérimentales) |
|---|---|---|
| Coefficient · durée | **9** · 4 h · sans calculatrice | **7** · 3 h · calculatrice non programmable |
| Poids des domaines | Analyse **50 %** · complexes + structures **35 %** · arithmétique + probabilités **15 %** | Analyse **55 %** · géométrie dans l'espace **15 %** · complexes + probabilités **30 %** |
| Niveaux d'habileté | 40 / 40 / 20 | 50 / 35 / 15 |
| Créneaux habituels | Analyse 10 · complexes 3,5 · structures 3,5 · arithmétique 3 (probabilités au rattrapage) | Problème 8 à 11 · géométrie 3 · complexes 3 à 4 · probabilités 2 à 3 · parfois suites 3 |
| Capacités | 73 | 61 |

Ce qui n'appartient qu'à SM : dichotomie, Rolle et accroissements finis, puissances réelles et
exponentielle de base a, fonctions et suites définies par une intégrale, sommes de Riemann, volume
autour de l'axe des ordonnées, `zⁿ = a`, composées de transformations, barycentre et cocyclicité en
complexes, fonction de répartition, arithmétique, structures algébriques et espaces vectoriels.
Ce qui n'appartient qu'à PC/SVT : toute la géométrie dans l'espace (produit scalaire, produit
vectoriel, sphère), le logarithme décimal, les problèmes de minimum et de maximum, la résolution
graphique d'équations. **y″ + ay′ + by = 0 est dans les deux.**

**Le problème d'analyse décide tout.** Il vaut la moitié de l'épreuve en SM (9,8 % de la moyenne
générale à lui seul) et plus de la moitié en PC/SVT (8,4 %). Il a presque toujours la même
architecture : étude complète d'une fonction (limites, dérivabilité en un point et son
interprétation graphique, variations, branches infinies, tracé), une équation f(x) = λ résolue par
le TVI, une suite u_{n+1} = f(u_n), puis une intégrale (aire, intégration par parties) ou une
fonction définie par une intégrale [PROPRE]. **Une fiche par notion ne suffit donc pas : il faut
aussi s'entraîner au problème entier**, où chaque partie réutilise la précédente.

### Ce qui fait perdre des points en maths [PROPRE, À VÉRIFIER avec un correcteur]

1. Appliquer le TVI ou les accroissements finis sans écrire les hypothèses (continuité, stricte
   monotonie, dérivabilité sur l'ouvert).
2. Une récurrence sans hypothèse écrite à l'hérédité, ou sans conclusion.
3. Une limite « évidente » sans justification (forme indéterminée non levée).
4. Ne pas donner l'interprétation graphique demandée (« demi-tangente verticale », « asymptote
   d'équation… »).
5. Abandonner après une question ratée, alors que la suivante donne son résultat.
6. Les erreurs de calcul en SM, sans calculatrice ; les erreurs d'arrondi en PC/SVT.

---

## 2. Tableau d'ensemble

| Fiche | Notion | Filières | Poids et fréquence | Difficulté [À VÉRIFIER] | Dans l'application |
|---|---|---|---|---|---|
| A1 | Suites numériques | SM, PC/SVT | dans chaque problème ; exercice séparé 3/6 en PC/SVT | moyenne | `suites-numeriques` |
| A2 | Limites, continuité, TVI | SM, PC/SVT | chaque problème | moyenne | `limites-continuite` |
| A3 | Fonction réciproque | SM, PC/SVT | fréquente en SM (arctan, √) | haute | `derivabilite-etude-fonctions` (R5b) |
| A4 | Dérivation et étude de fonctions | SM, PC/SVT | chaque problème | moyenne | `derivabilite-etude-fonctions` |
| A5 | Rolle et accroissements finis | SM | presque chaque problème SM | haute | `derivabilite-etude-fonctions` (R4b) |
| A6 | Fonction logarithme | SM, PC/SVT | très fréquente | moyenne | `fonction-logarithme` |
| A7 | Exponentielle, puissances réelles | SM, PC/SVT | très fréquente | moyenne | `fonction-exponentielle` |
| A8 | Équations différentielles | SM, PC/SVT | occasionnelle (exercice de 2,5 en 2022 N SExp) | faible | `equations-differentielles` |
| A9 | Primitives et calcul intégral | SM, PC/SVT | chaque problème | moyenne | `calcul-integral` |
| A10 | Intégrales en SM : fonctions définies par une intégrale, Riemann | SM | fréquente | haute | `calcul-integral` (partielle) |
| B1 | Complexes : forme algébrique, équations | SM, PC/SVT | 29/29 SM · 6/6 PC/SVT | faible | `nombres-complexes-1` |
| B2 | Complexes : formes trigonométrique et exponentielle, géométrie, transformations | SM, PC/SVT | idem | moyenne | `nombres-complexes-2` |
| B3 | Dénombrement et probabilités | SM, PC/SVT | 6/6 PC/SVT ; SM au rattrapage | moyenne | `denombrement`, `probabilites-conditionnelles` |
| B4 | Variable aléatoire, loi binomiale, fonction de répartition | SM, PC/SVT (répartition : SM) | dans l'exercice de probabilités | moyenne | `probabilites-conditionnelles` (répartition absente) |
| B5 | Produit scalaire dans l'espace, plans, sphères | PC/SVT | 6/6 (3 pts) | faible | `geometrie-espace` |
| B6 | Produit vectoriel | PC/SVT | dans l'exercice de géométrie | faible | `geometrie-espace` |
| B7 | Arithmétique | SM | 16/16 sessions normales (3 pts) | haute | `arithmetique` |
| B8 | Structures algébriques : lois, groupes, anneaux, corps | SM | 28/29 (3,5 pts) | moyenne | `structures-algebriques` |
| B9 | Espaces vectoriels | SM | dans l'exercice de structures | moyenne | `structures-algebriques` (R8) |

---

## 3. Les fiches — analyse

### A1. Suites numériques   (`suites-numeriques`)

**Filières et poids.** `sm 1.1.1`-`1.1.5`, `sm 1.3.17` (suites et accroissements finis) ;
`sexp 1.1.1`-`1.1.5`. Présentes dans presque chaque problème d'analyse, sous la forme
u_{n+1} = f(u_n) ; exercice séparé de 3 points dans 3 sujets PC/SVT sur 6 [PROPRE].

**Ce que le bac demande.** Montrer par récurrence que u_n ∈ I ; étudier la monotonie ; conclure
à la convergence (suite monotone et bornée) ; trouver la limite comme solution de f(ℓ) = ℓ ;
utiliser une suite auxiliaire géométrique ou arithmétique (en PC/SVT, u_{n+1} = au_n + b et la
suite homographique, `sexp 1.1.1`) ; en SM, majorer |u_{n+1} − α| ≤ k|u_n − α| par les
accroissements finis et conclure ; suites adjacentes (`sm 1.1.2`).

**L'idée-clé.** Une suite récurrente, c'est une machine qu'on fait tourner ; si la machine
envoie I dans I et qu'un point fixe l'attire, les termes s'y empilent.
*Image-clé :* l'escalier (ou la spirale) entre la courbe de f et la droite y = x.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Suites arithmétiques et géométriques | 1ère Bac | « u_0 = 3, u_{n+1} = 2u_n : u_5 ? » | 1ère Bac, suites |
| Raisonnement par récurrence | 1ère Bac (logique) | « Où utilise-t-on l'hypothèse de récurrence ? » | logique, récurrence |
| Sens de variation d'une fonction | 1ère Bac | « f croissante et a ≤ b : comparer f(a) et f(b) » | dérivation |
| Inégalités et encadrements | tronc commun | « 0 < x < 1 : comparer x² et x » | calcul numérique |

**Conceptions erronées et pièges.**
- *« Croissante donc tend vers +∞ »* : une suite croissante majorée converge. **Pari** : la suite
  u_{n+1} = √(2 + u_n) grimpe sans cesse ; dépasse-t-elle 10 ?
- *« La limite se calcule en remplaçant n par ∞ dans u_{n+1} = f(u_n) »* : on résout f(ℓ) = ℓ, et
  seulement après avoir prouvé la convergence.
- Confondre « f croissante » et « (u_n) croissante » quand f est décroissante (les termes
  alternent).
- La récurrence qui démontre ce qu'elle suppose (hérédité circulaire).

**Représentations.**
- **Figure-clé pas à pas : l'escalier de la toile d'araignée** (10 à 12 étapes) : la courbe, la
  droite y = x, u_0 sur l'axe, monter à la courbe, aller à la droite, redescendre… **Pari** à
  l'étape 6 : « vers où vont les marches ? ». Déjà en partie dans `suite-escalier.stages.json`.
- **Manipulable** : glisser u_0 et voir l'escalier changer, y compris hors de I (la suite
  s'échappe : pourquoi on exige f(I) ⊂ I). Existe : `suite-escalier.interactive.json`.
- **Analogie** : le réservoir qui se vide et se remplit (accroche existante de la leçon).
- **Animation** : les suites adjacentes comme un étau (`suites-adjacentes-etau.stages.json`).

**Histoire et personnages.**
① **Malthus, 1798** : la population en progression géométrique, la nourriture en progression
arithmétique, donc la famine — l'opposition du programme comme argument politique [V].
② **al-Karaji (vers l'an 1000)** prouve pour n = 1, 2, 3… et dit qu'on peut continuer : un pas majeur
vers la récurrence, que Pascal formalise en 1654 [V].
③ **Fibonacci, 1202**, et avant lui **Pingala** (vers 200 av. J.-C.) pour compter les mètres
poétiques [V]. *Légende* : Gauss enfant et la somme 1 + … + 100, à raconter comme légende [L].

**Pour aller plus loin.** La méthode de Héron pour √2 (une suite qui converge très vite) ; les
intérêts composés et les crédits immobiliers (suite arithmético-géométrique).

**Liens.** A2 (continuité de f pour passer à la limite), A5 (accroissements finis), A10 (suites
définies par une intégrale) ; PC : la décroissance radioactive par pas de temps égaux.

---

### A2. Limites, continuité, théorème des valeurs intermédiaires   (`limites-continuite`)

**Filières et poids.** `sm 1.2.1`-`1.2.5` ; `sexp 1.2.1`-`1.2.4`. Dans chaque problème : les
limites aux bornes, la continuité en un point, et l'existence (souvent l'unicité) d'une solution
de f(x) = 0 ou f(x) = x. Dichotomie (`sm 1.2.5`) : SM seulement.

**Ce que le bac demande.** Calculer des limites et lever les formes indéterminées ; étudier la
continuité en un point par les limites à gauche et à droite ; déterminer l'image d'un intervalle ;
« Montrer que l'équation f(x) = 0 admet une unique solution α dans ]a ; b[ » puis encadrer α
(« vérifier que 1,2 < α < 1,3 ») ; en SM, une ou deux étapes de dichotomie.

**L'idée-clé.** Une fonction continue sur un intervalle ne saute pas : pour aller de f(a) < 0 à
f(b) > 0, elle doit passer par 0. Strictement monotone, elle n'y passe qu'une fois.
*Image-clé :* le tracé d'un seul trait, qui coupe forcément l'axe.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Limites de référence (1/x, xⁿ, √x) | 1ère Bac | « lim de 1/x quand x → 0⁺ ? » | 1ère Bac, limites |
| Factorisation, quantité conjuguée | tronc commun | « Factoriser x² − 4 » | calcul littéral |
| Lecture d'un tableau de variations | 1ère Bac | « f croît de −1 à 3 sur [0 ; 2] : f(x) = 0 a-t-elle une solution ? » | études de fonctions |
| Valeur absolue, intervalles | tronc commun | « |x − 2| < 0,1 : quel intervalle ? » | calcul numérique |

**Conceptions erronées et pièges.**
- *« ∞ − ∞ = 0 », « 0 × ∞ = 0 »* : ce sont des formes indéterminées. **Pari** : trois fonctions qui
  tendent toutes vers « ∞ − ∞ » et ont trois limites différentes
  (`indetermination-trois-courbes.stages.json`).
- *« Le TVI donne l'unicité »* : non, c'est la stricte monotonie.
- Oublier la continuité dans la justification du TVI.
- Une fonction définie en a n'est pas forcément continue en a (le saut, le trou).

**Représentations.**
- **Figure-clé pas à pas : le TVI** (8 étapes) : f(a) en dessous, f(b) au-dessus ; **pari** :
  « peut-on relier sans couper l'axe ? » ; puis le trait levé (discontinuité) qui l'évite ; puis la
  courbe non monotone qui coupe trois fois (`cubique-trois-racines.stages.json`).
- **Manipulable** : la dichotomie comme jeu — l'élève choisit le milieu, voit le signe, garde la
  bonne moitié ; compter les étapes pour gagner une décimale (≈ 3,3 étapes).
- **Animation** : les asymptotes qui apparaissent quand on zoome à l'infini
  (`asymptotes.interactive.json`).

**Histoire et personnages.**
① **Zénon d'Élée** : Achille et la tortue — une infinité d'étapes en un temps fini, c'est une
limite [V].
② **Bolzano (1817), puis Cauchy (1821)** démontrent le TVI, qui « semblait évident » ;
**Weierstrass**, longtemps professeur de lycée, formalise l'ε–δ [V]. **Berkeley, 1734** : les
infinitésimaux de Newton sont des « fantômes de quantités disparues » — les limites répondent à
cette attaque [V].
③ **Hermite, 1893**, « se détourne avec effroi » des fonctions continues sans dérivée : continu et
dérivable, ce n'est pas pareil [S].

**Pour aller plus loin.** La méthode de dichotomie est celle des calculatrices et des
programmes qui cherchent une racine ; le « théorème de la table bancale » (on peut toujours
caler une table carrée sur un sol continu en la tournant), conséquence du TVI.

**Liens.** A1 (passer à la limite dans u_{n+1} = f(u_n)), A3 (réciproque), A4.

---

### A3. Fonction réciproque   (`derivabilite-etude-fonctions`, R5b)

**Filières et poids.** `sm 1.2.6`, `1.2.7`, `1.3.7` ; `sexp 1.2.11`. Fréquente en SM (arctan,
racines n-ièmes, réciproques de fonctions construites) [PROPRE] ; plus rare en PC/SVT.

**Ce que le bac demande.** Montrer que f réalise une bijection de I sur J = f(I) ; déterminer
f⁻¹(x) explicitement quand c'est possible ; étudier la continuité, la monotonie, la dérivabilité
de f⁻¹ et calculer (f⁻¹)′(y) = 1 / f′(f⁻¹(y)) ; tracer la courbe de f⁻¹ par symétrie par rapport à
y = x.

**L'idée-clé.** La réciproque lit la même courbe dans l'autre sens : échanger les axes, c'est
réfléchir la courbe dans la droite y = x. Une pente m devient une pente 1/m.
*Image-clé :* la courbe et son reflet, avec une tangente et sa tangente réfléchie.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Image d'un intervalle par une fonction monotone | 2ème Bac, A2 | « f croissante sur [0 ; 1], f(0) = 2, f(1) = 5 : f([0 ; 1]) ? » | A2 |
| Résoudre y = f(x) en x | tronc commun | « y = 2x + 3 : x en fonction de y ? » | équations |
| Symétrie par rapport à y = x | 1ère Bac | « Le symétrique de (2 ; 5) ? » | repérage |
| Dérivée d'une fonction composée | 2ème Bac, A4 | « (f(g(x)))′ ? » | A4 |

**Conceptions erronées et pièges.**
- *« f⁻¹ = 1/f »* : la notation trompe. **Pari** : pour f(x) = x³, f⁻¹(8) vaut-il 1/512 ou 2 ?
- Oublier de restreindre à un intervalle où f est strictement monotone.
- (f⁻¹)′(y) = 1/f′(y) au lieu de 1/f′(f⁻¹(y)).
- Ne pas vérifier f′(f⁻¹(y)) ≠ 0 (tangente verticale de la réciproque).

**Représentations.**
- **Figure-clé pas à pas** (10 étapes) : la courbe de f, un point (a ; b), son reflet (b ; a), toute
  la courbe réfléchie, la tangente en (a ; b) de pente m, la tangente réfléchie ; **pari** : « sa
  pente ? » (réponse 1/m) ; le cas m = 0 (tangente verticale).
- **Manipulable** : glisser un point sur la courbe de f et voir le point et la pente réfléchis.
- **Analogie** : la table de conversion lue dans les deux sens (euros ↔ dirhams).

**Histoire et personnages.** ① **Napier et Briggs** : les tables de logarithmes et d'antilogarithmes,
lues dans un sens puis dans l'autre [V] (voir A6). Pas d'anecdote propre à la notion dans la banque.

**Pour aller plus loin.** arctan et le calcul de π (la formule de Machin) ; la fonction racine
n-ième comme réciproque de xⁿ.

**Liens.** A6 (ln et exp sont réciproques l'une de l'autre), A2, A4.

---

### A4. Dérivation et étude de fonctions   (`derivabilite-etude-fonctions`)

**Filières et poids.** `sm 1.3.1`-`1.3.6`, `1.3.16` ; `sexp 1.2.5`-`1.2.10`, `1.2.12`, `1.2.13`,
`1.2.22`. Le cœur de chaque problème d'analyse.

**Ce que le bac demande.** Étudier la dérivabilité en un point (taux d'accroissement, dérivées à
gauche et à droite, **interprétation graphique** : tangente, demi-tangentes, point anguleux,
tangente verticale) ; calculer f′ ; dresser le tableau de variations ; branches infinies
(asymptotes, branches paraboliques) ; concavité et points d'inflexion par f″ ; position relative
d'une courbe et d'une droite ; tracé ; en PC/SVT, résolution graphique de f(x) = g(x)
(`sexp 1.2.10`) et problèmes de minimum ou de maximum (`sexp 1.2.12`).

**L'idée-clé.** La dérivée est la pente de la tangente : son signe dit si la courbe monte ou
descend ; f″ dit si elle tourne vers le haut ou vers le bas.
*Image-clé :* la sécante qui pivote jusqu'à devenir la tangente.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Nombre dérivé, dérivées usuelles | 1ère Bac | « (x³)′ ? (1/x)′ ? » | 1ère Bac, dérivation |
| Signe d'un trinôme, d'un produit, d'un quotient | tronc commun, 1ère Bac | « Signe de (x − 1)(x + 2) » | équations et inéquations |
| Équation d'une droite, coefficient directeur | tronc commun | « Droite de pente 2 passant par (1 ; 3) ? » | géométrie analytique |
| Limites (A2) | 2ème Bac | « lim (x² + 1)/x en +∞ ? » | A2 |

**Conceptions erronées et pièges.**
- *« f′(a) = 0 donc extremum »* : x³ en 0. **Pari** avant la révélation.
- *« f′ > 0 sur ]a ; b[ ∪ ]c ; d[ donc croissante sur la réunion »*.
- Dérivable ⇒ continue, mais pas l'inverse : |x| en 0 (point anguleux).
- Oublier de justifier la dérivabilité avant d'utiliser les formules (sur un intervalle).
- Confondre point d'inflexion (f″ change de signe) et f″(a) = 0.

**Représentations.**
- **Figure-clé pas à pas : la sécante devient tangente** (12 étapes) : deux points, la sécante, h
  qui diminue ; **pari** : « que devient la pente quand h → 0 ? » ; le cas du point anguleux où
  les pentes à gauche et à droite ne se rejoignent pas. Existe en partie :
  `tangente-derivee.interactive.json`.
- **Manipulable** : glisser x et lire en même temps la tangente sur la courbe et le point (x ; f′(x))
  sur la courbe de f′ (le lien entre les deux graphes).
- **Animation** : du tableau de variations à la courbe (`tableau-variations-courbe.stages.json`).
- **Manipulable (PC/SVT)** : le problème d'optimisation — la boîte sans couvercle découpée dans
  un carton, dont on fait varier le côté.

**Histoire et personnages.**
① **Fermat, vers 1636**, et son « adégalité » pour trouver maxima et tangentes, une génération
avant le calcul différentiel [V].
② **Newton et Leibniz** : Leibniz publie le premier (1684) ; la querelle de priorité culmine en
1712 [V]. Ironie : **Rolle** fut d'abord l'un des plus virulents critiques du calcul
infinitésimal [V].

**Pour aller plus loin.** La vitesse instantanée affichée par un compteur (accroche de la leçon) ;
l'optimisation partout (forme des canettes, trajets).

**Liens.** A2, A5, A6, A7 ; PC : vitesse = dérivée de la position, vitesse de réaction = dérivée de
l'avancement.

---

### A5. Rolle et accroissements finis   (`derivabilite-etude-fonctions`, R4b ; SM seulement)

**Filières et poids.** `sm 1.3.17`. Le « marqueur » des problèmes SM : la convergence d'une suite
u_{n+1} = f(u_n) par l'inégalité |u_{n+1} − α| ≤ k|u_n − α|, ou l'encadrement d'une expression ou
d'une intégrale [PROPRE].

**Ce que le bac demande.** Vérifier les hypothèses (continuité sur [a ; b], dérivabilité sur
]a ; b[) ; appliquer le théorème des accroissements finis à f entre u_n et α ; majorer |f′| par k
< 1 sur I ; en déduire |u_n − α| ≤ kⁿ|u_0 − α| et la limite. Encadrer ln(1 + x) ou arctan x
par l'inégalité des accroissements finis.

**L'idée-clé.** Entre deux points d'une courbe lisse, il existe un endroit où la tangente est
parallèle à la corde. Donc si la pente reste petite partout, les valeurs ne s'écartent pas plus
vite que k fois l'écart des abscisses.
*Image-clé :* la corde, et la tangente parallèle qui glisse jusqu'à la toucher.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Dérivée et monotonie (A4) | 2ème Bac | « f′ ≤ 1/2 sur I : que dire de f(b) − f(a) ? » | A4 |
| Valeur absolue et majorations | tronc commun | « |a| ≤ 1/2 et |b| ≤ 3 : majorer |ab| » | calcul numérique |
| Suites géométriques (kⁿ → 0 si |k| < 1) | 1ère Bac | « (0,9)ⁿ tend vers ? » | A1 |

**Conceptions erronées et pièges.**
- Oublier les hypothèses ou le « il existe c entre u_n et α ».
- Majorer f′ et non |f′|.
- Croire que c est connu, ou qu'il est le milieu.

**Représentations.**
- **Figure-clé pas à pas** (8 étapes) : la corde, sa pente ; une droite parallèle qu'on fait
  glisser ; **pari** : « touchera-t-elle la courbe ? » ; le point c ; le cas d'une courbe avec un
  point anguleux où le théorème tombe.
- **Analogie** : le radar de vitesse moyenne sur autoroute (deux portiques) : si ta moyenne est
  130 km/h, à un instant tu roulais exactement à 130.
- **Animation** : la contraction, |u_n − α| qui se divise au moins par 1/k à chaque pas.

**Histoire et personnages.** ② **Michel Rolle, 1691** : son théorème est né chez un critique du
calcul infinitésimal, qui le jugeait « collection d'ingénieux sophismes » avant de changer d'avis
[V].

**Pour aller plus loin.** Les radars « tronçon » existent : la vitesse moyenne suffit à prouver
l'excès de vitesse.

**Liens.** A1, A4, A9 (encadrer une intégrale).

---

### A6. Fonction logarithme népérien   (`fonction-logarithme` ; pilote `/pilote/logarithme`)

**Filières et poids.** `sm 1.3.9`-`1.3.11`, `1.3.16` ; `sexp 1.2.16`-`1.2.19`, `1.2.22`. Le
logarithme décimal (`sexp 1.2.18`) : PC/SVT seulement. Très fréquent dans les problèmes
(fonctions du type x − ln x, (ln x)/x, x ln x).

**Ce que le bac demande.** Les règles de calcul ; résoudre des équations, inéquations et systèmes
avec ln (en vérifiant le domaine) ; les limites de référence ((ln x)/x → 0, x ln x → 0,
ln(1 + x)/x → 1) ; dériver ln(u) ; étudier et tracer ; en PC/SVT, 10^x = a et log.

**L'idée-clé.** ln transforme les produits en sommes : c'est l'aire sous 1/t de 1 à x. Le pilote
logarithme construit cette idée de Napier à la définition du bac.
*Image-clé :* l'aire sous l'hyperbole, et les bandes [1 ; 2], [2 ; 4], [4 ; 8] d'aires égales.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Puissances entières et leurs règles | collège | « 2³ × 2⁴ ? » | puissances |
| Primitive, aire sous une courbe (intuition) | 2ème Bac, A9 | « Primitive de 2x ? » | A9 |
| Dérivée d'une fonction composée | 2ème Bac, A4 | « (√(u))′ ? » | A4 |
| Inéquations et domaine de définition | tronc commun | « ln(x − 2) existe pour quels x ? » | domaine |

**Conceptions erronées et pièges.**
- *ln(a + b) = ln a + ln b*, *ln(ab) = ln a × ln b* : les deux erreurs classiques, au cœur du quiz
  du pilote.
- Résoudre ln(x − 1) = ln(3 − x) sans écrire les conditions d'existence.
- ln x < 0 pour 0 < x < 1 : souvent oublié dans les tableaux de signes.
- Croissances comparées appliquées à l'envers.

**Représentations.**
- **Figure-clé : l'aire sous 1/t en 12 étapes** (format v3, 02 §4.3), déjà dans le pilote.
- **Manipulable** : la règle à calcul (deux règles qui glissent) — dans le pilote.
- **Manipulable** : chercher e en faisant glisser x jusqu'à ce que l'aire vaille 1 — dans le pilote.
- **Animation** : croissances comparées, ln x écrasé par x (`croissances-comparees-ln.stages.json`).

**Histoire et personnages.**
① **John Napier, 1614** : vingt ans de calcul de tables, contre « the multiplications, divisions…
of great numbers » [V].
② **Saint-Vincent et de Sarasa, avant 1649** : l'aire sous l'hyperbole vérifie A(xy) = A(x) + A(y)
[V].
③ **Kepler** dédie ses Éphémérides de 1620 à Napier [V] ; « [les logarithmes] ont doublé la vie
des astronomes », attribué à Laplace [S]. Briggs et Napier fixent log 1 = 0 (1615) [V].

**Pour aller plus loin.** Le pH, le décibel, l'échelle des magnitudes des séismes (Agadir 1960,
Al Haouz 2023), la règle à calcul jusqu'aux années 1970.

**Liens.** A7 (réciproque), A9 ; PC : pH (log₁₀), demi-vie t½ = ln 2 / λ, temps de charge d'un
condensateur ; SVT : échelles logarithmiques des documents.

---

### A7. Fonction exponentielle et puissances réelles   (`fonction-exponentielle`)

**Filières et poids.** `sm 1.3.12`-`1.3.16` (dont exponentielle de base a et puissances réelles,
SM seulement) ; `sexp 1.2.20`-`1.2.22`. Très fréquente dans les problèmes (x eˣ, eˣ − x − 1,
fonctions avec e^{−x}).

**Ce que le bac demande.** Calculer avec exp ; résoudre équations, inéquations et systèmes ;
limites de référence (eˣ/x → +∞, x e^{−x} → 0, (eˣ − 1)/x → 1) ; dériver e^{u} ; étudier et
tracer ; en SM, aˣ = e^{x ln a} et x^α.

**L'idée-clé.** exp défait ln : elle transforme les sommes en produits ; c'est la seule fonction
égale à sa dérivée et qui vaut 1 en 0 — la croissance proportionnelle à ce qu'on a.
*Image-clé :* la courbe de exp, reflet de celle de ln dans y = x, au-dessus de sa tangente
y = x + 1.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Fonction ln (A6) | 2ème Bac | « ln(e²) ? » | A6 |
| Fonction réciproque (A3) | 2ème Bac | « Si f(2) = 5, f⁻¹(5) ? » | A3 |
| Suites géométriques | 1ère Bac | « Placer 1000 DH à 5 % : après 10 ans ? » | A1 |

**Conceptions erronées et pièges.**
- *e^{a+b} = eᵃ + eᵇ* ; *(eˣ)′ = x eˣ⁻¹* (confusion avec xⁿ).
- eˣ > 0 oublié dans un tableau de signes.
- Confondre eˣ et xᵉ, aˣ et xᵃ en SM.

**Représentations.**
- **Figure-clé pas à pas : la croissance proportionnelle** (10 étapes) : une quantité qui augmente
  chaque jour d'une fraction d'elle-même ; **pari** de Bernoulli : « capitaliser de plus en plus
  souvent fait-il fortune ? » ; le plafond e.
- **Manipulable** : le curseur n dans (1 + 1/n)ⁿ.
- **Figures existantes** : `exp-reciproque-de-ln.stages.json`, `exp-au-dessus-de-x-plus-1.stages.json`.

**Histoire et personnages.**
① **Jacob Bernoulli, 1683**, et les intérêts composés : on plafonne entre 2,5 et 3 [V].
② **Euler** utilise la lettre e dès 1727 ou 1728, dans un manuscrit sur le tir des canons [V].

**Pour aller plus loin.** Les épidémies (croissance exponentielle des premiers jours), la
datation au carbone 14, le refroidissement d'une tasse de thé.

**Liens.** A6, A8 (y′ = ay) ; PC : décroissance radioactive, charge RC, RL ; SVT : croissance d'une
population de bactéries.

---

### A8. Équations différentielles   (`equations-differentielles`)

**Filières et poids.** `sm 1.3.18`-`1.3.20` ; `sexp 1.2.23`, `1.2.24`. **y″ + ay′ + by = 0 est au
cadre des deux filières** (contrairement à ce qu'affirmait l'ancien `docs/cadre`). Exercice
séparé rare (2,5 pts en SExp 2022 N) ; souvent une question dans le problème (« montrer que f est
solution de… »).

**Ce que le bac demande.** Résoudre y′ = ay + b ; trouver la solution qui vérifie une condition
initiale ; résoudre y″ + ay′ + by = 0 selon le signe du discriminant de l'équation
caractéristique (racines réelles distinctes, double, complexes conjuguées) ; ramener une équation
à l'une des deux formes par un changement de fonction (`sm 1.3.20`).

**L'idée-clé.** Une équation différentielle dit, en chaque point, dans quelle direction la courbe
doit partir ; la condition initiale choisit une courbe dans la famille.
*Image-clé :* le champ des pentes, et les courbes qui le suivent.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Exponentielle et sa dérivée (A7) | 2ème Bac | « (e^{3x})′ ? » | A7 |
| Équation du second degré, discriminant | tronc commun | « r² + 2r − 3 = 0 ? » | équations |
| Nombres complexes (racines complexes) | 2ème Bac, B1 | « r² + 4 = 0 dans ℂ ? » | B1 |
| cos, sin et leurs dérivées | 1ère Bac | « (cos 2x)′ ? » | trigonométrie |

**Conceptions erronées et pièges.**
- *« La solution »* au lieu de la famille de solutions (oublier la constante).
- Confondre l'équation caractéristique et l'équation différentielle.
- Racines complexes α ± iβ : écrire e^{αx}(A cos βx + B sin βx), pas e^{(α+iβ)x}.
- En PC, reconnaître l'équation (u_C, i, x) sans la réécrire sous la forme du cours.

**Représentations.**
- **Scène existante : le champ des pentes** (`champ-des-pentes.json`, scène 2D vérifiée) : l'élève
  pose un point de départ et la courbe suit les pentes. **Pari** : « partant d'ici, la courbe
  monte-t-elle ou descend-elle ? ».
- **Figure** : la famille de solutions et le choix par la condition initiale
  (`famille-solutions.stages.json`).
- **Figures croisées avec la PC** : `rc-charge-decharge.stages.json`, `oscillateur-periode.stages.json`.

**Histoire et personnages.**
① **Newton, 1701**, publie anonymement sa loi du refroidissement : y′ = −k(y − T) [V].
② **Kelvin, 1853**, prédit que la décharge d'un condensateur dans une bobine oscille ; **Feddersen,
1857**, photographie l'étincelle oscillante [V].
③ La datation au carbone 14, c'est y′ = −λy appliquée au temps profond [V].

**Pour aller plus loin.** Les modèles de population (logistique), le pendule, les circuits
électriques.

**Liens.** A7 ; PC : RC, RL, RLC, oscillateurs, chute avec frottement, radioactivité — **le
décalage de calendrier** (la PC en a besoin avant les maths) est discuté dans
[00 §7](00-reussir-le-bac.md).

---

### A9. Primitives et calcul intégral   (`calcul-integral`)

**Filières et poids.** `sm 1.3.8`, `1.4.1`-`1.4.4` ; `sexp 1.2.14`, `1.2.15`, `1.3.1`-`1.3.4`.
Dans presque chaque problème : une aire, une intégration par parties, un encadrement.

**Ce que le bac demande.** Trouver une primitive (formes u′uⁿ, u′/u, u′eᵘ) ; calculer une intégrale ;
intégrer par parties ; utiliser la linéarité, Chasles, la positivité ; l'aire entre deux courbes
**en unités d'aire** (attention au repère) ; le volume d'un solide de révolution autour de l'axe
des abscisses (SM : des deux axes) ; encadrer une intégrale ; la valeur moyenne.

**L'idée-clé.** L'intégrale additionne une infinité de tranches fines ; et pour la calculer, il
suffit de connaître une fonction dont c'est la dérivée.
*Image-clé :* les rectangles qui s'affinent sous la courbe.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Dérivées usuelles (lues à l'envers) | 1ère Bac | « Quelle fonction a pour dérivée 3x² ? » | dérivation |
| Aires usuelles (rectangle, triangle, trapèze) | collège | « Aire sous y = x entre 0 et 2 ? » | géométrie |
| Signe d'une fonction | 1ère Bac | « Signe de x² − 1 sur [0 ; 2] » | A4 |
| Unité d'aire d'un repère | collège | « i = 2 cm, j = 1 cm : 1 u.a. = ? » | repérage |

**Conceptions erronées et pièges.**
- *« L'intégrale est une aire »* même quand f est négative (l'intégrale est alors négative).
- Oublier la constante d'intégration… là où elle compte (primitive qui vaut une valeur donnée).
- L'aire entre deux courbes sans la valeur absolue, ou sans découper aux points d'intersection.
- Unités d'aire mal converties en cm².
- IPP mal choisie (dériver l'exponentielle et intégrer le polynôme).

**Représentations.**
- **Figure-clé pas à pas : de l'aire à la primitive** (12 étapes), comme dans le pilote logarithme :
  la bande fine qu'on ajoute, A′(x) = f(x). **Pari** : « si la courbe double de hauteur, l'aire… ».
- **Manipulable existant** : `aire-sous-courbe.interactive.json`.
- **Scène 3D existante : le solide de révolution** (`solide-de-revolution.json`) : la tranche qui
  tourne devient un disque.
- **Figures** : Chasles (`chasles-decoupage-aire.stages.json`), inégalité de la moyenne.

**Histoire et personnages.**
① **Archimède** : l'aire du segment de parabole vaut 4/3 du triangle inscrit [V] ; *La Méthode*,
grattée et recouverte en 1229, retrouvée en 1906 (le palimpseste) [V].
② **Ibn al-Haytham (vers l'an 1000)** calcule le volume d'un paraboloïde avec la somme des
puissances quatrièmes : une intégration avant la lettre [V].
③ **Leibniz invente ∫ en 1675** (un S long pour *summa*) ; **Riemann** définit l'intégrale
moderne en 1854 [V].

**Pour aller plus loin.** La distance parcourue sous une courbe de vitesse (accroche de la
leçon) ; le volume d'un tonneau (Kepler, 1615 [À VÉRIFIER]).

**Liens.** A6 (ln comme intégrale), A10 ; PC : travail d'une force, énergie.

---

### A10. Intégrales en SM : fonctions définies par une intégrale, sommes de Riemann   (`calcul-integral`, partielle ; SM seulement)

**Filières et poids.** `sm 1.4.5`-`1.4.7`. Une « marque SM » des problèmes récents : F(x) = ∫ₐ^{u(x)}
f(t) dt, des suites u_n = ∫ … , des limites de sommes [PROPRE].

**Ce que le bac demande.** Étudier F(x) = ∫ₐ^{u(x)} f(t) dt sans la calculer (dérivabilité, F′(x) =
u′(x) f(u(x)), variations, limites par encadrement) ; reconnaître une somme de Riemann
((b − a)/n) Σ f(a + k(b − a)/n) et trouver sa limite ; étudier une suite définie par une intégrale
(monotonie, encadrement, limite).

**L'idée-clé.** Une intégrale dont la borne bouge est une fonction comme une autre, et sa dérivée
est la hauteur de la courbe à la borne ; une somme de rectangles de plus en plus fins tend vers
l'aire.
*Image-clé :* la borne qui glisse et l'aire qui suit ; les rectangles qui s'affinent.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| A9 (intégrale, propriétés) | 2ème Bac | « ∫₀¹ x dx ? » | A9 |
| Dérivée d'une composée | 2ème Bac | « (F(2x))′ ? » | A4 |
| Somme Σ et notation | 1ère Bac | « Σ_{k=1}^{n} k ? » | suites |
| Théorème des gendarmes | 2ème Bac | « −1/n ≤ u_n ≤ 1/n : limite ? » | A1 |

**Conceptions erronées et pièges.**
- Vouloir calculer F explicitement alors que f n'a pas de primitive usuelle (e^{−t²}).
- Oublier le facteur u′(x).
- Mal identifier a, b et f dans une somme de Riemann.

**Représentations.**
- **Manipulable** : la borne x qui glisse, l'aire F(x) qui s'affiche, et la courbe de F qui se
  trace en même temps.
- **Figure existante** : `riemann-rectangles.stages.json` ; **pari** : « la somme avec k de 1 à n
  est-elle au-dessus ou en dessous de l'aire ? » (dépend du sens de variation).

**Histoire et personnages.** ③ **Riemann, 1854** (habilitation, publiée en 1868) [V] — voir A9.

**Liens.** A9, A1, A5.

---

## 4. Les fiches — algèbre et géométrie

### B1. Nombres complexes : forme algébrique, conjugué, module, équations   (`nombres-complexes-1`)

**Filières et poids.** `sm 2.2.1`, `2.2.3`, `2.2.5`, `2.2.6` ; `sexp 2.4.1`, `2.4.4`, `2.4.8`,
`2.4.9`. L'exercice de complexes est dans **29 sujets SM sur 29** (3,5 pts) et **6 sujets PC/SVT
sur 6** (3 à 4 pts) [PROPRE] : il s'ouvre presque toujours sur une équation du second degré.

**Ce que le bac demande.** Calculer en forme algébrique ; utiliser le conjugué pour diviser ;
calculer un module ; résoudre az² + bz + c = 0 (coefficients réels en PC/SVT, complexes en SM :
`sm 2.2.5`, avec la recherche d'une racine carrée de Δ) ; placer les images ; interpréter |z − a|
comme une distance.

**L'idée-clé.** ℂ est le plan : un nombre complexe est un point, l'addition est une translation,
et i est le nombre qu'on a dû inventer pour que les équations aient toujours des solutions.
*Image-clé :* le plan complexe, avec z, son conjugué symétrique, et le cercle des points de même
module.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Équation du second degré, discriminant | tronc commun | « x² − 2x + 5 = 0 a-t-elle des solutions réelles ? » | équations |
| Identités remarquables | collège | « (a + b)(a − b) ? » | calcul littéral |
| Repérage, distance dans le plan | tronc commun | « Distance entre (1 ; 2) et (4 ; 6) ? » | géométrie analytique |
| Vecteurs et coordonnées | tronc commun | « AB→ avec A(1 ; 1), B(3 ; 4) ? » | vecteurs |

**Conceptions erronées et pièges.**
- *i² = 1*, ou *√(−4) = −2*.
- *« On a inventé i pour résoudre x² = −1 »* : historiquement faux, c'est la cubique de Bombelli qui
  l'a imposé (02 §5.4). L'accroche actuelle de la leçon est à corriger.
- Diviser sans multiplier par le conjugué ; module d'une somme = somme des modules.
- Oublier que les deux racines d'une équation à coefficients réels sont conjuguées.

**Représentations.**
- **Figure-clé pas à pas : le détour par l'impossible** (10 étapes) : x³ = 15x + 4, la formule de
  Cardan qui donne ∛(2 + √−121) + ∛(2 − √−121), **pari** : « la formule est-elle fausse ? », puis
  (2 + i)³ = 2 + 11i et la somme qui revient à 4 (esquisse 02 §4.8).
- **Figure** : le plan complexe (`plan-complexe.stages.json`), module et argument
  (`module-argument.stages.json`).
- **Manipulable** : glisser z et voir son conjugué, son opposé, son module se mettre à jour.

**Histoire et personnages.**
① **Le duel Tartaglia–Fior, 1535**, puis Cardan et *Ars Magna* (1545) [V].
② **Bombelli, 1572** : la formule donne des racines de nombres négatifs alors que la solution est
réelle ; il calcule avec et retrouve 4 — « cela me parut plus sophistique que vrai » [V].
③ **Descartes, 1637** : le mot « imaginaires », par dérision [S].

**Pour aller plus loin.** Les complexes en électricité (l'impédance, en PC SM pour le RLC forcé),
en traitement du signal, en mécanique quantique.

**Liens.** B2, A8 (racines complexes de l'équation caractéristique).

---

### B2. Nombres complexes : formes trigonométrique et exponentielle, géométrie, transformations   (`nombres-complexes-2`)

**Filières et poids.** `sm 2.2.1`-`2.2.4`, `2.2.7`-`2.2.10` (dont barycentre, cocyclicité, zⁿ = a et
composées de transformations : SM seulement) ; `sexp 2.4.1`-`2.4.7`. La seconde moitié de
l'exercice de complexes, à chaque session.

**Ce que le bac demande.** Passer de la forme algébrique à la forme trigonométrique et
exponentielle ; Moivre et Euler ; linéariser cos³x ; traduire géométriquement : distances,
angles, alignement, orthogonalité (un quotient réel ou imaginaire pur), nature d'un triangle ;
reconnaître une translation, une homothétie, une rotation à partir de z′ = az + b ; en SM,
résoudre zⁿ = a (sommets d'un polygone régulier), composer des transformations, cocyclicité.

**L'idée-clé.** Multiplier par e^{iθ}, c'est tourner d'un angle θ ; multiplier par r, c'est agrandir.
La géométrie devient du calcul.
*Image-clé :* 1 → i → −1 → −i → 1, le quart de tour répété.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| B1 (forme algébrique, module) | 2ème Bac | « |1 + i| ? » | B1 |
| Trigonométrie : cercle, valeurs remarquables, formules d'addition | tronc commun, 1ère Bac | « cos(π/3) ? cos(a + b) ? » | trigonométrie |
| Angles orientés, mesure principale | 1ère Bac | « 7π/4 ramené dans ]−π ; π] ? » | angles orientés |
| Transformations du plan (rotation, homothétie) | tronc commun, 1ère Bac (SM) | « L'image de A par la rotation de centre O et d'angle π/2 ? » | transformations |

**Conceptions erronées et pièges.**
- arg(z + z′) = arg z + arg z′ (c'est vrai pour le produit, pas la somme).
- Un argument « oublié modulo 2π » ; la mauvaise mesure principale.
- Confondre le rapport et l'angle dans z′ − ω = a(z − ω).
- Conclure « triangle rectangle » sans dire en quel sommet.

**Représentations.**
- **Figure-clé pas à pas : multiplier par i** (10 étapes) : le point qui tourne d'un quart de tour,
  **pari** : « et multiplier par 1 + i ? » (rotation de π/4 et agrandissement de √2).
  Existe : `multiplication-par-i.stages.json`.
- **Scènes 2D existantes** : la transformation (`plan-complexe-transformation.json`) et le rapport
  lu depuis un sommet (`plan-complexe-rapport.json`), pour la nature d'un triangle.
- **Manipulable** : les racines n-ièmes de l'unité, n au curseur (`racines-unite.interactive.json`).
- **Animation** : la spirale de Moivre (`spirale-moivre.stages.json`).

**Histoire et personnages.**
③ **Caspar Wessel, 1797**, arpenteur danois : l'interprétation géométrique, ignorée près d'un
siècle ; **Argand** la republie à compte d'auteur en 1806 [V].
③ **Euler, 1748** : e^{ix} = cos x + i sin x [V].

**Pour aller plus loin.** Les fractales (Mandelbrot, itérer z² + c) ; les rotations dans les jeux
vidéo et la robotique.

**Liens.** B1, B8 (le groupe (ℂ*, ×) et les morphismes de l'exercice de structures).

---

### B3. Dénombrement et probabilités   (`denombrement`, `probabilites-conditionnelles`)

**Filières et poids.** `sm 2.3.1`-`2.3.4` ; `sexp 2.5.1`-`2.5.4`. Exercice de probabilités dans
**6 sujets PC/SVT sur 6** (2 à 3 pts) ; en SM, au cadre mais tiré seulement au rattrapage dans
l'échantillon (6 rattrapages sur 13, 0 session normale sur 16) [PROPRE].

**Ce que le bac demande.** Choisir le bon modèle de dénombrement (tirages successifs avec ou sans
remise, simultanés : p-listes, arrangements, combinaisons) ; calculer la probabilité d'une
réunion, du contraire, d'une intersection ; probabilité conditionnelle, arbre pondéré, formule des
probabilités totales ; reconnaître l'indépendance.

**L'idée-clé.** Compter avant de calculer : quand les issues sont équiprobables, une probabilité
est un rapport de dénombrements. Conditionner, c'est restreindre l'univers.
*Image-clé :* l'arbre pondéré, et l'univers qui rétrécit quand on sait quelque chose.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Fractions, pourcentages | collège | « 30 % de 40 % ? » | calcul numérique |
| Probabilités élémentaires | 1ère Bac [À VÉRIFIER : programme SExp] | « Un dé : P(pair) ? » | probabilités |
| Principe multiplicatif | collège, 1ère Bac (SM) | « Codes de 4 chiffres ? » | dénombrement |
| Factorielle, combinaisons | 1ère Bac (SM) ; 2ème Bac (SExp) | « C(5, 2) ? » | dénombrement |

**Conceptions erronées et pièges.**
- *P(A | B) = P(B | A)* : le piège du test médical. **Pari** classique : un test fiable à 99 % est
  positif, la maladie touche 1 personne sur 1 000 : quelle chance d'être malade ? (environ 9 %).
- *Indépendant = incompatible* (`independant-vs-incompatible.stages.json`).
- Ordre qui compte ou non : arrangement ou combinaison.
- Oublier que « au moins un » se calcule par le contraire.

**Représentations.**
- **Figure-clé pas à pas : l'univers qui rétrécit** (`univers-restreint.stages.json`), puis l'arbre
  pondéré (`arbre-pondere.stages.json`).
- **Simulation** : lancer 10 000 fois et voir la fréquence se stabiliser ; le problème de Monty Hall
  joué 100 fois.
- **Manipulable** : l'urne à deux couleurs dont on règle la composition.

**Histoire et personnages.**
① **Le problème des partis, 1654** : comment partager la mise d'un jeu interrompu ? La
correspondance Pascal–Fermat fonde les probabilités [V].
② **Le paradoxe du chevalier de Méré** (un 6 en 4 lancers contre un double 6 en 24) [S] ;
**Monty Hall, 1990** : près de 1 000 docteurs écrivent que Marilyn vos Savant se trompe ; elle
avait raison [V].
③ **Ibn Mun'im** (mort en 1228, enseigne à Marrakech) consacre un chapitre entier à la
combinatoire [S] ; **Ibn al-Bannā'** (Marrakech et Fès) donne la formule des combinaisons [V] ;
**Bayes**, publié après sa mort par Richard Price (1763) [V].

**Pour aller plus loin.** Les tests médicaux et le dépistage ; les jeux de hasard et pourquoi la
banque gagne toujours.

**Liens.** B4 ; SVT : les proportions des croisements (échiquiers), Hardy-Weinberg.

---

### B4. Variable aléatoire, loi binomiale, fonction de répartition   (`probabilites-conditionnelles`, R5b-R5c ; répartition absente)

**Filières et poids.** `sm 2.3.5`-`2.3.7` (la fonction de répartition `2.3.6` : SM seulement,
**absente de l'application**) ; `sexp 2.5.5`, `2.5.6`. Souvent la dernière question de l'exercice
de probabilités.

**Ce que le bac demande.** Donner la loi d'une variable aléatoire (tableau), son espérance, sa
variance, son écart type ; reconnaître une loi binomiale (répétition d'épreuves identiques et
indépendantes à deux issues) et calculer P(X = k) ; en SM, déterminer et représenter la fonction
de répartition (une fonction en escalier).

**L'idée-clé.** Une variable aléatoire met un nombre sur chaque issue ; sa loi dit avec quelle
probabilité elle prend chaque valeur ; l'espérance est la moyenne qu'on obtiendrait à la longue.
*Image-clé :* le diagramme en bâtons de la loi, et (SM) l'escalier de la fonction de répartition.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| B3 (probabilités, combinaisons) | 2ème Bac | « P(2 faces en 3 lancers) ? » | B3 |
| Moyenne et écart type (statistique) | tronc commun | « Moyenne de 2, 4, 9 ? » | statistiques |
| Somme Σ | 1ère Bac | « Σ k P(X = k) : que calcule-t-on ? » | suites |

**Conceptions erronées et pièges.**
- La somme des probabilités de la loi qui ne fait pas 1 (vérification oubliée).
- Appliquer la binomiale sans indépendance (tirages sans remise).
- E(X) prise pour la valeur la plus probable.
- Fonction de répartition : oublier qu'elle est continue à droite, ou la tracer comme une courbe
  continue.

**Représentations.**
- **Figure** : deux lois de même espérance et d'écarts types différents
  (`deux-lois-meme-esperance.stages.json`).
- **Simulation** : la planche de Galton — des billes qui tombent et dessinent la loi binomiale ;
  **pari** : « où tombent le plus de billes ? ».
- **Manipulable** : n et p au curseur pour la loi binomiale.

**Histoire et personnages.** ② **Jacques Bernoulli**, *Ars Conjectandi* (publié en 1713) : la loi des
grands nombres [À VÉRIFIER : sourcer avant usage].

**Liens.** B3 ; SVT : la biométrie (SM-A) et la variation des caractères.

---

### B5. Produit scalaire dans l'espace, plans, droites et sphères   (`geometrie-espace` ; PC/SVT seulement)

**Filières et poids.** `sexp 2.1.1`-`2.1.3`, `2.2.1`-`2.2.6`. **L'exercice de géométrie dans
l'espace vaut 3 points dans 6 sujets PC/SVT sur 6** [PROPRE] — des points presque garantis à format
stable. Hors du cadre SM (enseigné en 1ère Bac SM).

**Ce que le bac demande.** Exprimer l'orthogonalité par le produit scalaire ; équation d'un plan
défini par un point et un vecteur normal ; représentation paramétrique d'une droite orthogonale
à un plan ; reconnaître une sphère à partir de x² + y² + z² + ax + by + cz + d = 0 (centre, rayon) ;
l'ensemble des M tels que MA·MB = 0 ; distance d'un point à un plan ; positions relatives d'un
plan et d'une sphère (cercle d'intersection, centre et rayon), d'une droite et d'une sphère.

**L'idée-clé.** Un plan, c'est tous les points vus « à angle droit » depuis un vecteur normal ; la
distance d'un centre à un plan décide si la sphère le traverse.
*Image-clé :* la sphère coupée par le plan, et le cercle d'intersection de rayon √(R² − d²).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Produit scalaire dans le plan | 1ère Bac | « u(1 ; 2)·v(3 ; −1) ? » | produit scalaire |
| Coordonnées et vecteurs dans l'espace | tronc commun, 1ère Bac [À VÉRIFIER] | « Milieu de A(1 ; 0 ; 2) et B(3 ; 4 ; 0) ? » | repérage dans l'espace |
| Théorème de Pythagore | collège | « Côtés 3 et 4 : hypoténuse ? » | géométrie |
| Équation de cercle (forme canonique) | 1ère Bac | « x² + y² − 2x = 0 : centre et rayon ? » | cercle |

**Conceptions erronées et pièges.**
- Confondre vecteur normal et vecteur directeur.
- Rayon du cercle d'intersection pris égal au rayon de la sphère.
- Mal compléter les carrés pour trouver le centre.
- Distance point-plan sans la valeur absolue ou sans la racine.

**Représentations.**
- **Scène 3D existante : la sphère et le plan** (`sphere-plan.json`) : faire monter le plan et voir
  le cercle naître, grandir, se réduire au point de tangence. **Pari** : « à quelle hauteur le plan
  ne touche plus ? ».
- **Figures** : `plan-normal.stages.json`, `distance-point-plan.stages.json`.
- **Explication animée existante** : le sujet SExp 2019 N, exercice 1 (vidéo publiée).

**Histoire et personnages.**
① **1637** : Descartes publie la géométrie par coordonnées ; Fermat l'avait trouvée sans publier
[V]. *La mouche au plafond de Descartes n'est pas sourcée : ne pas l'utiliser.*
③ Les vecteurs et les produits scalaire et vectoriel sont nés des quaternions de Hamilton, simplifiés
par **Gibbs et Heaviside** (*Vector Analysis*, 1901) ; **Grassmann** (1844) avait tout vu sans être
reconnu [V].

**Pour aller plus loin.** Le GPS (intersection de sphères), la 3D des jeux vidéo et de
l'architecture.

**Liens.** B6 ; PC : le travail d'une force (produit scalaire), les forces en mécanique.

---

### B6. Produit vectoriel   (`geometrie-espace`, R3 ; PC/SVT seulement)

**Filières et poids.** `sexp 2.3.1`-`2.3.4`. Dans l'exercice de géométrie (3 points).

**Ce que le bac demande.** Calculer u ∧ v en coordonnées ; l'aire d'un triangle (½‖AB ∧ AC‖) ;
l'équation d'un plan par trois points (le produit vectoriel donne un vecteur normal) ; la
distance d'un point à une droite ; résoudre des problèmes.

**L'idée-clé.** u ∧ v est un vecteur perpendiculaire aux deux, dont la longueur est l'aire du
parallélogramme qu'ils forment.
*Image-clé :* le parallélogramme et le vecteur qui se dresse à angle droit.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| B5 (vecteurs et produit scalaire dans l'espace) | 2ème Bac | « u·v = 0 signifie ? » | B5 |
| Déterminant 2 × 2 | 1ère Bac [À VÉRIFIER] | « det((1 ; 2), (3 ; 4)) ? » | colinéarité |
| Aire d'un parallélogramme | collège | « Base 5, hauteur 3 : aire ? » | géométrie |

**Conceptions erronées et pièges.**
- u ∧ v = v ∧ u (en fait l'opposé) ; erreurs de signe dans la composante du milieu.
- Aire du triangle sans le facteur ½.

**Représentations.**
- **Scène 3D existante : le produit vectoriel** (`produit-vectoriel.json`) : faire tourner v et voir
  u ∧ v se dresser, s'annuler quand les vecteurs sont colinéaires. **Pari** : « si u et v sont
  colinéaires, que vaut u ∧ v ? ».
- **Figure** : `produit-vectoriel-aire.stages.json`.

**Histoire et personnages.** Voir B5 (Hamilton, Gibbs, Heaviside, Grassmann) [V].

**Pour aller plus loin.** Le moment d'une force, le couple d'une clé ; en PC SM, la force de Lorentz
q v ∧ B (scène 3D du champ magnétique).

**Liens.** B5 ; PC : force magnétique, moment d'une force (rotation autour d'un axe fixe).

---

### B7. Arithmétique   (`arithmetique` ; SM seulement)

**Filières et poids.** `sm 2.1.1`-`2.1.9`. **3 points dans les 16 sessions normales observées**
(2010-2025), 8 rattrapages sur 13 [PROPRE] : un nombre premier p, des congruences, Fermat (2016 N,
2023 N), Gauss ou Bézout, une équation diophantienne ; les systèmes de numération (`2.1.4`-`2.1.6`)
sont au cadre.

**Ce que le bac demande.** Décomposer en facteurs premiers ; PGCD par Euclide et coefficients de
Bézout ; raisonner par congruences (restes, divisibilité) ; appliquer Gauss, Bézout, Fermat ;
résoudre ax + by = c dans ℤ² ; écrire et calculer en base b.

**L'idée-clé.** On peut calculer avec les restes comme avec les nombres ; et un nombre premier p
« fait tourner » les puissances : a^{p−1} ≡ 1 [p].
*Image-clé :* l'horloge (ℤ/nℤ) où l'on calcule en tournant.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Division euclidienne, multiples, diviseurs | collège | « Reste de 47 par 5 ? » | arithmétique du collège |
| PGCD, nombres premiers | collège | « 91 est-il premier ? » | arithmétique du collège |
| Raisonnement par récurrence et par l'absurde | 1ère Bac | « Comment prouver qu'il y a une infinité de premiers ? » | logique |
| Bases de l'arithmétique (1ère Bac SM) | 1ère Bac SM | « a | b et a | c ⇒ a | ? » | arithmétique 1ère |

**Conceptions erronées et pièges.**
- *a | bc ⇒ a | b ou a | c* sans hypothèse (Gauss demande a premier avec b).
- Appliquer Fermat sans vérifier que p est premier et ne divise pas a.
- Diviser une congruence par un nombre non premier avec le module.
- Oublier toutes les solutions de ax + by = c (la solution particulière plus la forme générale).

**Représentations.**
- **Figure-clé pas à pas : les bidons de 3 et 5 litres** (accroche existante,
  `bidons-3-5.stages.json`) : mesurer 4 litres, c'est Bézout.
- **Figures** : la cascade d'Euclide (`euclide-cascade.stages.json`), la remontée de Bézout, le
  réseau des solutions diophantiennes.
- **Manipulable** : l'horloge modulo n, où l'on fait tourner les puissances de a et où l'on voit
  le cycle revenir à 1 au bout de p − 1 pas (pari : « combien de pas ? »).

**Histoire et personnages.**
① **Euclide** (vers 300 av. J.-C.) : l'un des plus anciens algorithmes encore en usage ; l'infinité
des nombres premiers au Livre IX [V].
② **Fermat, lettre à Frénicle du 18 octobre 1640** : le petit théorème, sans la preuve « de peur
d'être trop long » ; Euler la publie en 1736 [V]. L'identité de Bézout est due à **Bachet de
Méziriac (1624)** [V].
③ **RSA, 1977** : la sécurité des paiements repose sur Fermat et Euler ; Clifford Cocks l'avait
trouvé en secret dès 1973 [V].

**Pour aller plus loin.** Les clés de contrôle (RIB, codes-barres), le chiffrement des messageries.

**Liens.** B8 (ℤ/nℤ comme anneau), A1 (récurrence).

---

### B8. Structures algébriques : lois de composition, groupes, anneaux, corps   (`structures-algebriques` ; SM seulement)

**Filières et poids.** `sm 2.4.1`-`2.4.5`. **3,5 points dans 28 sujets SM sur 29** [PROPRE], au
format presque fixe : un ensemble de matrices M₂(ℝ) ou M₃(ℝ), une loi *, un morphisme vers (ℂ*, ×)
ou (ℝ, +), conclure « groupe », « anneau » ou « corps ».

**Ce que le bac demande.** Montrer qu'une loi est interne, associative, commutative ; trouver le
neutre et les symétriques ; reconnaître un groupe, un anneau, un corps ; montrer qu'une
application est un morphisme et en déduire la structure de l'image (transport de structure,
`sm 2.4.5`) ; montrer qu'une partie est un sous-groupe.

**L'idée-clé.** Des ensembles très différents (matrices, complexes, restes, symétries) ont la même
« forme » de calcul ; un morphisme le prouve et transporte les propriétés de l'un à l'autre.
*Image-clé :* deux tables d'opérations qui se superposent case pour case.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Calcul matriciel élémentaire (produit 2 × 2) | 2ème Bac SM [À VÉRIFIER : vu dans le chapitre] | « Produit de deux matrices 2 × 2 ? » | matrices |
| Nombres complexes (B1, B2) | 2ème Bac | « (ℂ*, ×) : neutre et inverse de 1 + i ? » | B1-B2 |
| Congruences (B7) | 2ème Bac SM | « 3 × 3 dans ℤ/8ℤ ? » | B7 |
| Quantificateurs, logique | 1ère Bac | « Écrire « tout élément a un symétrique » avec ∀ et ∃ » | logique |

**Conceptions erronées et pièges.**
- Oublier de vérifier que la loi est **interne**.
- Le symétrique calculé « à droite » seulement pour une loi non commutative.
- Morphisme : f(x * y) = f(x) ⊤ f(y), en confondant les deux lois.
- Corps : oublier « tout élément non nul est inversible ».

**Représentations.**
- **Figure** : la table d'un groupe (`table-groupe.stages.json`), les symétries du rectangle
  (`symetries-rectangle.stages.json`), l'échelle des structures (`echelle-structures.stages.json`).
- **Figure-clé proposée** [À VÉRIFIER] : deux tables (matrices d'un côté, complexes de l'autre) qui
  se colorient en même temps quand on applique le morphisme ; **pari** : « ces deux tables sont-elles
  la même déguisée ? ».

**Histoire et personnages.**
① Pourquoi pas de formule pour le degré 5 ? **Ruffini (1799) et Abel (1824)** prouvent
l'impossibilité ; **Galois** comprend pourquoi, avec les groupes, et meurt en duel en 1832 à 20 ans
[V].
③ **Hamilton, 16 octobre 1843** : i² = j² = k² = ijk = −1, gravé sur le pont de Broom à Dublin ;
une structure où ab ≠ ba [V].

**Pour aller plus loin.** Le Rubik's cube est un groupe ; la cryptographie moderne utilise des
groupes.

**Liens.** B9, B7, B2.

---

### B9. Espaces vectoriels   (`structures-algebriques`, R8 ; SM seulement)

**Filières et poids.** `sm 2.4.6`-`2.4.8`. Souvent la dernière partie de l'exercice de structures.

**Ce que le bac demande.** Montrer qu'une partie est un sous-espace vectoriel (propriété
caractéristique) ; reconnaître une famille libre, génératrice, une base ; déterminer les composantes
d'un vecteur dans une base ; dimension.

**L'idée-clé.** Un espace vectoriel, c'est un endroit où l'on peut additionner et étirer ; une
base, c'est un jeu minimal de directions qui permet d'atteindre tout le monde, de façon unique.
*Image-clé :* le plan engendré par deux vecteurs non colinéaires, et une droite qui ne l'est que par
un.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Vecteurs du plan et de l'espace, colinéarité | tronc commun, 1ère Bac | « (2 ; 4) et (1 ; 2) sont-ils colinéaires ? » | vecteurs |
| Systèmes linéaires | tronc commun | « Résoudre x + y = 3, x − y = 1 » | systèmes |
| B8 (groupes) | 2ème Bac SM | « (ℝ², +) est-il un groupe ? » | B8 |

**Conceptions erronées et pièges.**
- Oublier que le vecteur nul doit appartenir au sous-espace.
- *« Libre »* et *« génératrice »* confondus.
- Une famille de trois vecteurs de ℝ² prise pour une base.

**Représentations.**
- **Figures existantes** : `sous-espaces-plan.stages.json`, `echelle-dimensions-r3.stages.json`.
- **Manipulable** : deux vecteurs au curseur ; tant qu'ils ne sont pas colinéaires, la grille
  engendrée couvre tout le plan ; **pari** : « et s'ils deviennent colinéaires ? ».

**Histoire et personnages.** ③ **Grassmann (1844)** : la théorie des espaces de dimension
quelconque, longtemps ignorée [V].

**Liens.** B8, B5-B6 (géométrie), A8 (l'ensemble des solutions d'une équation différentielle
linéaire est un espace vectoriel — hors programme, mais éclairant).

---

## 5. Ce que la refonte doit en tirer [À VÉRIFIER]

1. **Le problème d'analyse comme parcours** : après les fiches A1 à A10, un entraînement au problème
   entier, où chaque partie réutilise la précédente, avec le barème réel.
2. **Les points « à format stable »** : complexes (SM et PC/SVT), structures (SM), géométrie dans
   l'espace (PC/SVT). Un entraînement par gabarit y rapporte vite.
3. **Combler les trous** : la fonction de répartition (SM `2.3.6`) et le barycentre en complexes
   (SM `2.2.2`) n'ont pas de leçon.
4. **Corriger l'accroche des complexes** (l'invention de i par Bombelli, pas pour x² = −1).
5. **Construire le juste-à-temps pour la PC** : exp, ln et les équations différentielles,
   disponibles quand la physique en a besoin ([00 §7](00-reussir-le-bac.md)).

## 6. Questions au propriétaire (maths)

1. **SM ou PC/SVT d'abord** pour la refonte des maths ? Les deux épreuves partagent l'analyse, mais
   SM a 4 heures, pas de calculatrice et 12 capacités en plus.
2. **Les probabilités en SM** : au cadre, mais absentes des sessions normales observées depuis 2010.
   On les traite comme les autres, ou en second ?
3. **La dichotomie** est au cadre SM seulement ; l'ancien référentiel la plaçait aussi en PC/SVT.
   On la retire des parcours PC/SVT ?
4. **Les problèmes d'annales** : faut-il un mode « problème complet » chronométré, distinct des
   examens blancs (qui font l'épreuve entière) ?
