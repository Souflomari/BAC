# 03 — Chimie : les 7 points fixes de chaque sujet de physique-chimie

> **Statut : brouillon v0, 2026-10-22, à discuter avec le propriétaire. Deuxième lecture faite le
> 2026-10-22** : les 81 identifiants cités existent au référentiel, les citations sont mot pour mot,
> les calculs refaits (parts de la moyenne, τ, K, rendements), les dates d'histoire contrôlées. Les capacités citées
> (`pc-pc 2.2.3.13`, `pc-svt 2.2.3.6`) renvoient au référentiel officiel transcrit mot pour mot :
> [`docs/referentiel/pc-pc.yaml`](../referentiel/pc-pc.yaml), [`pc-sm.yaml`](../referentiel/pc-sm.yaml),
> [`pc-svt.yaml`](../referentiel/pc-svt.yaml). Identifiant à quatre chiffres : domaine (2 = chimie) ·
> sous-domaine · chapitre · rang du tiret (reconstitué). **Attention** : le cadre de la filière SVT
> numérote ses chapitres de chimie de 1 à 9 à la suite (`pc-svt 2.2.3` = chapitre « 3- », premier
> chapitre du sous-domaine 2). La vérification est dans
> [`sources/verification-pc.md`](sources/verification-pc.md) ; la physique dans
> [`02-physique.md`](02-physique.md). Étiquettes : voir le [README](README.md). **[À VÉRIFIER]** =
> proposition de l'auteur.

---

## 1. La chimie dans l'épreuve

| | Filière PC | SM-A, SM-B | Filière SVT |
|---|---|---|---|
| Poids des sous-domaines (rapides-lentes · non totales · sens d'évolution · contrôle) | 6 · 10 · 10 · 7 % (C-P1 p. 18) | 6 · 10 · 10 · 7 % (C-P2 p. 19) | **7 · 11 · 7 · 8 %** (C-P3 p. 13) |
| Total chimie | 33 % (calculé) | 33 % | **33 %** (imprimé) |
| Points dans les sujets | **7 / 20** dans les 10 sujets 2019-2025 de 01 et dans les 2 sujets 2026 | 7 / 20 (2 sujets 2026) | 7 / 20 (2023 N, 2 sujets 2026) |
| Ce qui manque | — | un tiret (« Savoir qu'une électrolyse est une transformation forcée ») | **l'électrolyse**, les chocs efficaces ; + dilution, K de l'estérification |
| Part de la moyenne générale | 0,5 × 7/23 × 35 % ≈ **5,3 %** | ≈ 5,3 % | 0,5 × 5/23 × 35 % ≈ **3,8 %** |

Sources : [OFF] cadres, pages citées ; points : en-têtes et sommaires des sujets [OFF-sujet] ;
pourcentages de la moyenne générale avec 7 points sur 20 (35 %) plutôt que les 33 % du cadre.

**Le fait qui commande tout le chapitre.** Le cadre donne 33 % à la chimie ; **les sujets lui donnent
exactement 7 points**, toujours en **exercice 1**, en **deux parties indépendantes**. Sur les 10
sujets PC de 01 (2019-2025) : acide-base / dosage **10/10**, électrolyse 4/10, cinétique / suivi
temporel 3/10, pile 1/10, estérification-hydrolyse 1-2/10 [PROPRE 01 §3.3]. Sur les **six sujets
2026** (trois filières, deux sessions) : acide-base **6/6**, estérification 3/6, électrolyse 2/6,
pile 1/6, suivi cinétique 2/6 (par dosage ou par t₁/₂) [OFF-sujet, verification-pc §6].

### 1.1 Comment l'exercice de 7 points est construit

Le patron le plus fréquent [PROPRE, 6 sujets 2026 + corpus `docs/sujets/pc/`] :

- **Partie 1 (≈ 3,5 à 4 pts) : une solution d'acide faible.** Un acide carboxylique (éthanoïque,
  propanoïque, butanoïque, lactique, benzoïque) ou une base (ammoniac). Équation avec l'eau ; tableau
  d'avancement ; **τ** à partir du pH (ou de la conductivité) ; Q_r,éq et K ; **pK_A** ; espèce
  prédominante ; parfois l'effet de la **dilution** ; parfois une réaction entre deux couples et sa
  constante K.
- **Partie 2 (≈ 3 à 3,5 pts) : une transformation « à contrôler ».** Selon l'année : un **dosage**
  (2018, 2020, 2021, 2024, 2025 N), une **estérification** suivie dans le temps (2023 N, 2025 N,
  2026 N, SM R 2026), une **électrolyse** (2018, 2019, 2022 N ; PC R et SM N 2026), une **pile**
  (2020 N, SVT R 2026), un **suivi cinétique** (2021 N, 2024 N vitamine C).
- Chaque partie ouvre souvent par un **QCM** ou un **vrai / faux** (« Recopier le numéro de la
  question et choisir… »).

Exemples de chapeaux [OFF-sujet] : « L'acide butanoïque est utilisé dans l'industrie alimentaire
pour ses propriétés aromatisantes… » (NS 28F 2026) ; « Pour protéger l'aluminium contre la formation
d'une couche d'alumine, on peut le recouvrir par un métal, tel que le nickel » (RS 28F 2026) ;
« L'acide éthanoïque est le composant actif du vinaigre » (RS 27F 2026). La chimie de l'examen parle
de produits réels : vitamine C, aspirine, vinaigre, jus de fruits, chromage, savon.

### 1.2 Pourquoi l'application doit commencer par là [À VÉRIFIER]

L'acide-base tombe **dans chaque sujet** et pèse à lui seul 3,5 à 7 points ; c'est le meilleur
rendement de toute la physique-chimie (5,3 % de la moyenne générale pour l'ensemble de la chimie en
PC et SM). Un élève qui maîtrise **le tableau d'avancement, τ, Q_r, K, pK_A et l'équivalence** a la
moitié de l'exercice de chimie de n'importe quel sujet.

---

## 2. La méthode de l'exercice de chimie

### 2.1 Les cinq outils qui reviennent partout

1. **Le tableau d'avancement** (« tableau descriptif de l'évolution ») : état initial, en cours (x),
   final (x_f) ; x_max par le réactif limitant. Les sujets le font **compléter** (RS 27F 2026 donne
   le tableau vide) ou **dresser** (« Dresser le tableau d'avancement de cette réaction, en utilisant
   les grandeurs C_A, V et x_f », NS 27F 2026).
2. **Le taux d'avancement final** τ = x_f / x_max (≤ 1) : < 1 → transformation limitée. Pour un acide
   dans l'eau, x_f = [H₃O⁺]_f·V = 10^(−pH)·V, donc τ = 10^(−pH)/C.
3. **Le quotient de réaction** Q_r (produits au numérateur, coefficients en exposants, **ni l'eau
   solvant ni les solides**), sa valeur à l'équilibre Q_r,éq = **K**, et le critère d'évolution
   (Q_r,i < K → sens direct).
4. **L'équivalence** : les réactifs sont dans les proportions stœchiométriques ; pour une réaction
   1:1, C_A·V_A = C_B·V_BE. Lecture graphique : méthode des tangentes ou maximum de la dérivée.
5. **La quantité d'électricité** (piles, électrolyse) : Q = I·Δt = n(e⁻)·F, puis la demi-équation
   pour passer des électrons à la matière (masse déposée, volume de gaz).

### 2.2 Les écritures exigées par le cadre

Le cadre fixe les **flèches** [OFF] : « Ecrire l'équation de réaction de dosage (**en utilisant une
seule flèche**) » (`pc-pc 2.2.3.10`) ; pour la pile, « Ecrire les équations des réactions aux
électrodes (**avec double flèche**) et l'équation bilan lors du fonctionnement de la pile (**avec une
seule flèche**) » (`pc-pc 2.3.2.4`), et de même pour l'électrolyse, « l'équation bilan (**simple
flèche**) » (`pc-pc 2.3.3.4`) ; l'acide
avec l'eau, limité, s'écrit avec la double flèche (annexe : « modélisation d'une transformation
chimique limitée par deux réactions inverses et simultanées en utilisant l'écriture ⇄ »).
Les **états physiques** (aq), (l), (s), (g) sont attendus dans les sujets [À VÉRIFIER avec un
correcteur : sont-ils notés ?].

### 2.3 Les unités qui coûtent des points

| Grandeur | Piège | Le bon geste |
|---|---|---|
| Conductivité σ = Σ λᵢ[Xᵢ] | λ en S·m²·mol⁻¹, donc [X] en **mol·m⁻³** | ×1 000 depuis mol·L⁻¹ (RS 27F 2026 : σ = 1,1·10⁻² S·m⁻¹, λ en 10⁻³ S·m²·mol⁻¹) |
| Volumes | mL et L mélangés dans C·V | tout en L, ou tout en mL avec des mmol |
| Vitesse volumique v = (1/V)·dx/dt | oubli du 1/V ; unité | mol·L⁻¹·min⁻¹ (ou mmol·L⁻¹·h⁻¹, 2024 N) |
| pH ↔ concentration | 10^(−pH) en mol·L⁻¹ seulement | [H₃O⁺] = 10^(−pH) mol·L⁻¹ |
| Faraday | Δt en minutes ou en heures | Δt en secondes ; F = 9,65·10⁴ C·mol⁻¹ (donnée des sujets) |
| Masse, densité | densité confondue avec masse volumique | m = d·ρ_eau·V (SM R 2026 : V = 14,3 mL, d = 1,05) |

### 2.4 Les façons classiques de perdre des points [PROPRE, d'après les sujets et les inventaires de `items.yaml` ; À VÉRIFIER avec un correcteur]

1. Une équation **non équilibrée** (charges ou éléments), ou avec la mauvaise flèche.
2. **L'eau ou un solide dans Q_r** ; les coefficients oubliés en exposants.
3. **pH = 7 à l'équivalence** (vrai pour acide fort / base forte seulement) ; V_E lu à pH = 7 ;
   demi-équivalence prise pour l'équivalence.
4. **Indicateur coloré** choisi sans regarder si sa zone de virage contient le pH à l'équivalence.
5. **τ et rendement confondus** ; rendement supérieur à 100 % sans s'en étonner.
6. **Catalyseur qui « augmente le rendement »** (il ne change que la vitesse).
7. **Temps de demi-réaction** (chimie) confondu avec la **demi-vie** (nucléaire), ou lu sur la mauvaise
   courbe.
8. **Anode et cathode** : polarités d'une pile transportées telles quelles dans l'électrolyse.
9. Faraday : le **nombre d'électrons** par ion (Ni²⁺ : 2, Ag⁺ : 1) ; Δt non converti.
10. Ne pas **conclure** (« la réaction est limitée », « l'indication de l'étiquette est juste »).

### 2.5 Les outils mathématiques

| Outil | Où | Capacité de maths |
|---|---|---|
| **Logarithme décimal** : pH = −log[H₃O⁺], pK_A = −log K_A, 10^x = a | toute l'acide-base | `maths-sexp 1.2.18` — enseigné en 2ème Bac, souvent **après** le début de l'acide-base [À VÉRIFIER] ; un détour juste-à-temps (`content/maths/fonction-logarithme/lesson.md`) |
| Puissances de 10, notation scientifique | partout | collège |
| Dérivée = pente de la tangente | vitesse volumique, équivalence par la dérivée | 1ère Bac |
| Second degré | trouver x_f à partir de K (K = x²/((n − x)(n − x)) en estérification, ou K_A = Cτ²/(1 − τ)) | tronc commun |
| Fonctions et courbes (asymptote, croissance) | x(t), pH(V) | tronc commun, 1ère Bac |
| Linéarisation | τ² en fonction du volume ajouté (SM N 2026), 1/τ… | maths 2ème Bac |

**Le décalage de calendrier** (00 §7 [À VÉRIFIER]) : la chimie utilise log₁₀ dès le premier
trimestre ; prévoir un rappel de deux minutes (« log, c'est compter les zéros ») plutôt qu'un renvoi.

### 2.6 Ce que l'application doit en faire [À VÉRIFIER]

- Un **tableau d'avancement interactif** commun à tous les chapitres : l'élève remplit les cases,
  le retour corrige case par case (c'est la moitié des points de nombreuses parties 1).
- Une **« calculatrice de copie »** pour l'acide faible : pH → [H₃O⁺] → x_f → τ → Q_r,éq → pK_A, chaque
  étape écrite avant d'être calculée.
- Un **atelier de courbe de dosage** (déjà amorcé : `content/pc/reactions-acido-basiques/media/lecture-Ve-courbe-dosage.interactive.json`).
- Un entraînement **« la partie 2 inconnue »** : on tire au sort estérification, électrolyse, pile ou
  cinétique, comme le jour J.

---

## 3. Tableau d'ensemble

Poids [OFF] : sous-domaine. Fréquence : corpus [`docs/sujets/pc/`](../sujets/pc/) (filière PC,
sessions normales, années citées), six sujets 2026 (verification-pc §6), et comptages de 01 sur 10
sujets PC 2019-2025 [PROPRE] entre parenthèses. Difficulté [À VÉRIFIER]. État : dossier
`content/pc/<slug>`.

| # | Notion | PC | SM | SVT | Poids [OFF] | Fréquence aux annales | Difficulté | État dans l'application |
|:-:|---|:-:|:-:|:-:|---|---|:-:|---|
| C1 | Transformations lentes et rapides ; facteurs cinétiques ; chocs efficaces | ✓ | ✓ | sans chocs efficaces | 6 % (SVT 7 %) | 2010 N ; souvent en question d'ouverture (01 : cinétique 3/10 avec C2) | faible | `transformations-lentes-rapides` |
| C2 | Suivi temporel, vitesse volumique, temps de demi-réaction | ✓ | ✓ | ✓ (+ t₁/₂ et facteurs) | idem | 2021 N, 2024 N (vitamine C) ; PC N 2026 (t₁/₂ d'une estérification), SM R 2026 | moyenne | `suivi-temporel-vitesse` |
| C3 | Transformations non totales : acide de Brønsted, pH, taux d'avancement final | ✓ | ✓ | ✓ (+ dilution) | 10 % (SVT 11 %) | **chaque sujet** (partie 1) : 2012 N ; 2026 : 6/6 | moyenne | `transformations-deux-sens` |
| C4 | État d'équilibre : Q_r, K, conductance | ✓ | ✓ | ✓ | idem | 2015 N, 2023 N ; dans toutes les parties 1 | moyenne | `etat-equilibre` |
| C5 | Acides et bases : K_e, pH, K_A, pK_A, prédominance, distribution, indicateurs | ✓ | ✓ | ✓ (prédominance seule) | idem | 2019, 2022, 2023 N ; 2026 : 6/6 (01 : 10/10 avec C6) | moyenne à haute | `reactions-acido-basiques` R1-R8, R11 |
| C6 | Dosage acido-basique : équivalence, pH-métrie, conductimétrie | ✓ | ✓ | ✓ | idem | 2018, 2020, 2021, 2024, 2025 N | moyenne | `reactions-acido-basiques` R9-R11 |
| C7 | Évolution spontanée : critère Q_r,i face à K | ✓ | ✓ | ✓ | 10 % (SVT 7 %) | 2012 N ; dans chaque pile ; SVT R 2026 | moyenne | `evolution-spontanee` (scène échelle des quotients) |
| C8 | Piles et récupération de l'énergie | ✓ | ✓ | ✓ | idem | 2020 N (argent-chrome) ; SVT R 2026 (argent-plomb) (01 : 1/10) | moyenne | `piles` |
| C9 | Transformations forcées : électrolyse | ✓ | ✓ (un tiret de moins) | **—** | idem | 2018, 2019, 2022 N ; PC R 2026 (nickelage), SM N 2026 (dihydrogène) (01 : 4/10) | moyenne | `electrolyse` (scène banc d'électrolyse) |
| C10 | Estérification et hydrolyse | ✓ | ✓ | ✓ (+ K) | 7 % (SVT 8 %) | 2018, 2023 N ; PC N, SM R, SVT N 2026 (01 : 1-2/10) | moyenne | `esterification-hydrolyse` |
| C11 | Contrôle de l'évolution : anhydride, catalyse, saponification, rendement, montages | ✓ | ✓ | ✓ | idem | 2025 N ; questions de montage (reflux, NS 27F 2026) | faible à moyenne | `controle-catalyse` |

**Ce que dit le tableau.** Toutes les notions de chimie existent dans l'application, et deux scènes
et deux manipulables les servent. Ce qui manque est plus fin : les **gestes de laboratoire** exigés
par le cadre (`pc-pc 2.4.2.1-2` : chauffage à reflux, distillation fractionnée, cristallisation,
filtration sous vide, règles de sécurité — aucune occurrence dans `controle-catalyse`), la **conductimétrie**
comme méthode de dosage et de mesure (une seule mention dans la leçon d'acide-base), le **profil SVT**
(dilution et K d'estérification en plus, électrolyse en moins).

---

## 4. Les fiches

### Sous-domaine « Transformations rapides et transformations lentes d'un système chimique »

---

### C1. Transformations lentes et rapides ; facteurs cinétiques ; chocs efficaces   (`transformations-lentes-rapides`)

**Filières et poids.** `pc-pc 2.1.1.1-2` (oxydoréduction, couples ; influence des facteurs
cinétiques) et `2.1.2.11` (chocs efficaces) ; SM identique ; SVT `pc-svt 2.1.1.1-2`, plus
« Connaître les facteurs cinétiques : concentration des réactifs et température » (`2.1.2.6`) et
leur influence sur le temps de demi-réaction (`2.1.2.12`), **sans** les chocs efficaces.
Sous-domaine : 6 % (PC, SM), 7 % (SVT). Fréquence : rarement un exercice à elle seule — 2010 N
(inventaire des ions, conductance) [`docs/sujets/pc/transformations-lentes-rapides.md`] — mais
présente dans les questions d'ouverture et dans chaque suivi cinétique (C2) ; « Proposer deux
facteurs cinétiques pour accélérer la réaction » (2018 N, estérification).

**Ce que le bac demande.** Écrire l'équation d'une oxydoréduction à partir de deux couples ;
reconnaître une transformation lente ou rapide ; **l'influence de la température et de la
concentration** sur la vitesse, déterminée à partir de résultats expérimentaux ; (PC, SM)
l'interpréter par les **chocs efficaces** (plus de chocs par unité de temps, plus de chocs assez
énergétiques).

**L'idée-clé.** « Lente » ou « rapide » se juge **à l'échelle de nos instruments** : une
transformation est rapide si elle semble terminée dès qu'on mélange. La vitesse dépend du nombre de
**chocs efficaces** par seconde : plus de réactifs par litre, plus de chocs ; plus chaud, plus de
chocs et plus de chocs assez énergétiques.
*Image-clé :* deux boîtes de particules côte à côte (froide / chaude, ou diluée / concentrée), avec
un compteur de chocs efficaces.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Couple oxydant / réducteur, demi-équation | 1ère Bac (« réactions d'oxydo-réduction ») [SEC AlloSchool] | « Demi-équation du couple MnO₄⁻/Mn²⁺ ? » | R2 de la leçon |
| Concentration molaire, dilution | tronc commun | « 10 mL de solution à 0,1 mol/L dilués à 100 mL : C ? » | TC, « concentration molaire » |
| Tableau d'avancement | tronc commun (« bilan de la matière ») | « x_max pour 2 mol de A et 3 mol de B (1:1) ? » | C3 |

**Conceptions erronées et pièges** (`content/pc/transformations-lentes-rapides/items.yaml`, 18 entrées).
- *« Rapide / lente est une propriété absolue de la réaction »* : elle dépend des conditions et des
  moyens d'observation. **Pari** (accroche de la leçon, « le clou qui rouille, l'allumette qui
  s'enflamme ») : la même réaction peut-elle être lente dans un bécher et rapide dans un autre ?
- *« Le froid détruit les réactifs »* ; *« le froid diminue la concentration »* — la **trempe** (eau
  glacée) ne fait que ralentir.
- *« N'importe quelle rencontre suffit »* : il faut assez d'énergie **et** une bonne orientation.
- *« On peut conclure sur un facteur sans l'isoler »* (deux paramètres changés à la fois).
- *Demi-équations mal équilibrées* ; *électrons non égalisés* avant l'addition.
- Piège de copie : dire « la vitesse augmente » sans comparer deux expériences précises.

**Représentations.**
- **Figure-clé : « la boîte à chocs »** [À VÉRIFIER] (10 étapes) : deux espèces de particules ; un
  choc qui rebondit (pas assez d'énergie) ; un choc efficace ; **pari** : si je double le nombre de
  particules, le nombre de chocs par seconde double-t-il ? ; on chauffe : les flèches de vitesse
  s'allongent, la proportion de chocs efficaces monte.
- **Simulation particulaire** : curseurs température et concentration ; compteur de produits formés
  par seconde ; c'est une **simulation** au sens de la bible (la loi émerge de beaucoup d'événements).
- **Expérience réelle** : thiosulfate + acide (la croix qui disparaît sous le précipité) à deux
  températures ; iodure + eau oxygénée (la teinte qui apparaît, accroche de C2) [À VÉRIFIER :
  sécurité et vidéos].
- **Analogie** : une cour de récréation (plus d'élèves, plus de rencontres ; plus d'agitation, plus
  de rencontres « réussies »). Limite : l'orientation.

**Histoire et personnages.**
① **Wilhelmy, 1850** : il suit au polarimètre la transformation du sucre en milieu acide — la
première loi de vitesse mesurée [V] ([Ludwig Wilhelmy](https://en.wikipedia.org/wiki/Ludwig_Wilhelmy)).
② Le moment où ça a coincé : qu'est-ce qui rend une rencontre « efficace » ? [NT dans la banque :
piste Arrhenius et l'énergie d'activation, hors cadre].

**Pour aller plus loin.** Le réfrigérateur et la conservation des aliments (cité par le cadre,
compétences ciblées p. 29 : « conserver les produits alimentaires et les protéger de la
corrosion ») ; la rouille ; la cuisson sous pression.

**Liens.** C2 (mesurer la vitesse) ; C11 (catalyse : un troisième facteur) ; SVT : enzymes et
température (`content/svt/role-enzymes/lesson.md`, hors cadre SVT mais même idée) ; physique :
agitation thermique [À VÉRIFIER].

---

### C2. Suivi temporel d'une transformation ; vitesse volumique ; temps de demi-réaction   (`suivi-temporel-vitesse`)

**Filières et poids.** `pc-pc 2.1.2.1` à `2.1.2.10` ; SM identique ; SVT `pc-svt 2.1.2.1-12` (courbes
de quantité, concentration ou avancement seulement ; + facteurs cinétiques et leur influence sur
t₁/₂). Sous-domaine : 6 % (SVT 7 %). Fréquence : 2021 N (étude cinétique par conductivité), 2024 N
(**dégradation de la vitamine C dans un jus**, t₁/₂, vitesse en mmol·L⁻¹·h⁻¹)
[`docs/sujets/pc/suivi-temporel-vitesse.md`] ; 2026 : PC N (estérification suivie par dosage de
l'acide restant, t₁/₂ lu sur n_ac(t)), SM R (« Montrer que V_BE(t₁/₂) = … ») [OFF-sujet] ; 01 :
cinétique 3/10.

**Ce que le bac demande.** Justifier les opérations d'un suivi (prélèvement, **trempe**, dosage) ;
repérer l'équivalence d'un titrage ; exploiter les courbes de **quantité de matière, concentration,
avancement, conductivité, conductance, pression ou volume** (SVT : les trois premières) ; le tableau
d'avancement ; **v = (1/V)·dx/dt** ; l'influence de la concentration et de la température ;
interpréter qualitativement la variation de la vitesse sur une courbe ; **déterminer graphiquement
v** (tangente) ; **définir et déterminer t₁/₂**. Formes : « Déterminer graphiquement t₁/₂ » ;
« Déterminer, en mmol·L⁻¹·h⁻¹, la vitesse volumique à t = … » ; relier une grandeur mesurée (σ, P, V
de gaz) à x par une relation à établir ; vrai / faux sur la vitesse.

**L'idée-clé.** On suit une transformation en mesurant au cours du temps une grandeur qui
**dépend de l'avancement** ; la vitesse est la **pente** de x(t) divisée par le volume ; elle diminue
parce que les réactifs s'épuisent ; t₁/₂ est l'instant où x = x_f/2.
*Image-clé :* la courbe x(t) avec deux tangentes (pente forte au début, faible ensuite) et la
lecture de t₁/₂ à mi-hauteur de l'asymptote x_f.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Tableau d'avancement | tronc commun / 1ère Bac (« suivi d'une transformation chimique ») [SEC] | « n(I₂) = x : que vaut x quand n(I₂) = 2 mmol ? » | C3 |
| Conductimétrie : G = k·σ, σ = Σλᵢ[Xᵢ] | 1ère Bac (« mesure … par conductimétrie ») [SEC] | « Unité de λ ? » | §2.3 |
| Dosage direct, équivalence | 1ère Bac (« dosages directs ») [SEC] | « C_A·V_A = C_B·V_BE : quand ? » | C6 |
| Pente d'une tangente, dérivée | 1ère Bac maths | « Pente de la tangente en t = 0 ? » | atelier graphe (02 §2.6) |
| Loi des gaz parfaits P·V = n·R·T (suivi par pression) | 1ère Bac ? [À VÉRIFIER : niveau] | « n de gaz si P = 1,2·10⁵ Pa, V = 1 L, T = 300 K ? » | rappel |

**Conceptions erronées et pièges** (`content/pc/suivi-temporel-vitesse/items.yaml`).
- *« t₁/₂ est la moitié de la durée totale »* (ou l'instant où la réaction s'arrête). **Pari** : la
  réaction dure « 60 min » ; t₁/₂ vaut-il 30 min ? (non : on le lit à x_f/2, souvent bien avant).
- *Vitesse lue comme l'ordonnée x(t)* au lieu de la pente ; *oubli du 1/V* ; *corde au lieu de
  tangente*.
- *« La vitesse est constante »* (x(t) en droite) ; *« la réaction accélère »*.
- *« Le ralentissement vient du temps qui passe »* (c'est l'épuisement des réactifs).
- *Trempe mal comprise* ; *méthode de suivi mal choisie*.
- Piège de copie : t₁/₂ (demi-réaction, chimie) confondu avec la demi-vie (nucléaire, `02-physique.md` N1) —
  deux définitions, deux courbes.

**Représentations.**
- **Figure-clé : « la teinte qui apparaît »** (accroche de la leçon) en 10 étapes [À VÉRIFIER] :
  mélange ; prélèvements à intervalles égaux ; trempe ; dosage ; points n(t) ; **pari** : le point
  suivant sera-t-il plus loin ou plus près du précédent ? ; la courbe ; x_f ; x_f/2 → t₁/₂ ; tangente
  → v.
- **Manipulable « vitesse = pente »** : un point glisse sur x(t), la tangente le suit, v s'affiche ;
  **pari** : où la vitesse est-elle maximale ?
- **Manipulable « facteurs »** : deux courbes (deux températures ou deux concentrations) ; l'élève
  dit laquelle est la plus chaude ; t₁/₂ comparés (SVT `2.1.2.12`).
- **Expérience réelle** : vitamine C d'un jus laissé à l'air (2024 N) ; dégagement de gaz mesuré à la
  seringue [À VÉRIFIER].

**Histoire et personnages.** ① **Wilhelmy, 1850** (C1) [V]. Pas d'autre accroche vérifiée dans la
banque [NT].

**Pour aller plus loin.** La dégradation de la vitamine C (2024 N) et la conservation des jus ;
le temps de prise d'une colle ; la cinétique en pharmacie (date de péremption) [À VÉRIFIER].

**Liens.** C1 ; C6 (le suivi par dosage) ; C10 (suivi d'une estérification, PC N 2026) ; physique :
N1 (une autre « demi » : la demi-vie), E1 (lecture de tangente) ; maths : dérivée, tangente.

**À trancher.** La leçon traite la **spectrophotométrie** (7 occurrences) : elle n'est plus au cadre
2025 (`pc-pc 2.1.2.3` ne cite que quantité, concentration, avancement, conductivité, conductance,
pression, volume). La garder en « pour aller plus loin » ?

---

### Sous-domaine « Transformations non totales d'un système chimique »

---

### C3. Transformations dans les deux sens : acide de Brønsted, pH, taux d'avancement final   (`transformations-deux-sens`)

**Filières et poids.** `pc-pc 2.2.1.1` à `2.2.1.6` ; SM identique ; SVT `pc-svt 2.2.3.1-6`, avec
**« Connaître l'influence de la dilution sur le taux d'avancement final d'une réaction »**
(`2.2.3.6`, propre au cadre SVT). Sous-domaine : 10 % (SVT 11 %). Fréquence : **la partie 1 de
chaque sujet** ; 2012 N (acide éthanoïque, ammoniac, alcool) [`docs/sujets/pc/transformations-deux-sens.md`] ;
2026 : 6/6 (acides butanoïque, éthanoïque ; bleu de bromothymol ; un acide AH) ; SVT N 2026 :
« Quel est l'effet de la dilution sur le taux d'avancement final ? » [OFF-sujet].

**Ce que le bac demande.** Acide et base selon **Brønsted** ; équation d'une réaction acido-basique
et ses deux couples ; déterminer le pH ; **calculer x_f** à partir de C et du pH et le comparer à
x_max ; **définir et déterminer τ** ; interpréter à l'échelle microscopique l'état d'équilibre (deux
réactions inverses simultanées). Formes : « Vérifier que τ = 4,26 %. Déduire » (NS 27F 2026) ;
« Justifier que la réaction de l'acide butanoïque avec l'eau est limitée » (NS 28F 2026) ;
« Calculer τ … Déduire » (RS 27F 2026).

**L'idée-clé.** Certaines réactions s'arrêtent **avant** l'épuisement du réactif limitant : la
réaction directe et la réaction inverse ont lieu en même temps, et le système se fige à un état où
elles se compensent. Le pH mesuré dit **jusqu'où** l'acide a réagi : x_f = 10^(−pH)·V, τ = x_f/x_max.
*Image-clé :* deux barres côte à côte, x_max (ce que l'équation permettrait) et x_f (ce que le pH
mesure) — l'écart, c'est « limitée ».

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Tableau d'avancement, réactif limitant, x_max | tronc commun | « 10⁻³ mol d'acide, eau en excès : x_max ? » | TC |
| Réactions acido-basiques (Brønsted), couples | 1ère Bac [SEC] | « Base conjuguée de CH₃COOH ? » | 1ère Bac ; C5 |
| pH et [H₃O⁺] = 10^(−pH) | 1ère Bac (mesure de pH) ; log en maths 2ème Bac | « pH = 3 : [H₃O⁺] ? » | détour log (§2.5) |
| Concentration, quantité n = C·V | tronc commun | « C = 10⁻² mol/L, V = 100 mL : n ? » | TC |

**Conceptions erronées et pièges** (`content/pc/transformations-deux-sens/items.yaml`).
- *« Toute réaction finit par consommer ses réactifs, il suffit d'attendre »* ; *« assez de catalyseur
  la pousse jusqu'au bout »*. **Pari** (accroche, « une odeur qui ne va jamais jusqu'au bout ») :
  en attendant un jour de plus, τ augmentera-t-il ?
- *« À l'équilibre, plus rien ne réagit »* (l'équilibre est **dynamique**).
- *« Limitée = il ne se passe presque rien »* (τ peut valoir 90 %).
- *« Le sens est une propriété fixe de la réaction »* ; *« c'est l'espèce ajoutée qui impose le
  sens »*.
- *τ calculé avec C au lieu de x_max* ; *[H₃O⁺] confondu avec C*.
- Piège de copie : τ en fraction ou en pourcentage, mélangés.

**Représentations.**
- **Figure-clé : « les deux réactions qui se croisent »** [À VÉRIFIER] (10 étapes) : des molécules
  d'acide dans l'eau ; un proton passe ; **pari** : tous les acides vont-ils céder leur proton ? ;
  la réaction inverse commence ; les deux vitesses s'égalisent ; on compte : τ ; la barre x_f à côté
  de x_max.
- **Manipulable « pH → τ »** : curseurs C et pH (ou C et pK_A) ; x_f, x_max et τ en barres ; **pari**
  (SVT) : en diluant 10 fois, τ augmente-t-il, diminue-t-il ou reste-t-il ? (il augmente pour un acide
  faible).
- **Expérience réelle** : pH d'une solution d'acide chlorhydrique et d'acide éthanoïque de même
  concentration — c'est le TP 3 de l'annexe (`pc-pc` : « Avancement final d'une réaction acide-base »)
  et l'accroche de la leçon d'acide-base.

**Histoire et personnages.**
① **Berthollet**, membre de l'expédition d'Égypte (1798-1801), défend que les réactions sont
réversibles [V] ([Claude Louis Berthollet](https://en.wikipedia.org/wiki/Claude_Louis_Berthollet)) ;
[S] le récit des lacs de natron égyptiens n'est pas confirmé : ne pas le raconter comme un fait
(02 §5.4).
② **Arrhenius, 1884** : sa thèse sur la dissociation ionique obtient la note la plus faible ; Nobel
1903 [V] ([Svante Arrhenius](https://fr.wikipedia.org/wiki/Svante_Arrhenius)).
③ **Brønsted et Lowry, 1923**, chacun de son côté : l'acide **donne** un proton [V]
([Brønsted–Lowry](https://en.wikipedia.org/wiki/Br%C3%B8nsted%E2%80%93Lowry_acid%E2%80%93base_theory)).

**Pour aller plus loin.** Le vinaigre (acide éthanoïque, RS 27F 2026) ; pourquoi un acide « fort »
n'est pas forcément « concentré ».

**Liens.** C4 (chiffrer l'équilibre par K) ; C5 (pK_A) ; C10 (l'estérification, autre transformation
limitée) ; maths : log₁₀ ; SVT : pH et enzymes [À VÉRIFIER].

---

### C4. État d'équilibre : quotient de réaction, constante d'équilibre, conductance   (`etat-equilibre`)

**Filières et poids.** `pc-pc 2.2.2.1` à `2.2.2.5` ; SM identique ; SVT `pc-svt 2.2.4.1-5`
(« Donner et **exploiter** »). Sous-domaine : 10 % (SVT 11 %). Fréquence : 2015 N (τ, Q_r,éq, pK_A),
2023 N (proportion de CH₃COOH, pH du mélange) [`docs/sujets/pc/etat-equilibre.md`] ; en fait dans
**chaque** partie 1 ; 2026 : « Montrer que Q_r,éq = 10^(−2pH)/(C_A − 10^(−pH)) » (NS 27F), K par la
conductivité (RS 27F), K_A en fonction de C et τ (SM N, SM R) [OFF-sujet].

**Ce que le bac demande.** La relation entre la **conductance** G d'une portion de solution et les
concentrations des ions ; l'équilibre **dynamique** ; l'expression littérale de **Q_r** ; **Q_r,éq = K**,
indépendante des concentrations initiales ; τ dépend de K **et** de l'état initial. Formes :
« Exprimer Q_r,éq en fonction de C et τ » ; « Montrer que K = Cτ²/(1 − τ) » ; « Trouver K à partir de
la mesure de σ » ; choisir la valeur de K après dilution (QCM, NS 27F 2026 : K ne change pas).

**L'idée-clé.** Q_r mesure où en est le mélange ; à l'équilibre il prend une valeur **K** qui ne
dépend que de la réaction et de la température — pas de ce qu'on a mis au départ. C'est K qui dit si
la réaction est « presque totale » (K grand) ou « à peine commencée » (K petit) ; c'est l'état initial
qui fixe τ.
*Image-clé :* plusieurs mélanges de départ différents dont les Q_r convergent tous vers la **même**
ligne horizontale K.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C3 (x_f, τ, tableau) | 2ème Bac | « τ = 4 % : x_f/x_max ? » | C3 |
| Conductivité, λᵢ, unités | 1ère Bac [SEC] | « [Na⁺] = 10 mol·m⁻³, λ = 5·10⁻³ S·m²·mol⁻¹ : contribution à σ ? » | §2.3 |
| Puissances et fractions algébriques | collège | « Simplifier (Cτ)²/(C(1 − τ)) » | rappel |
| Second degré (trouver x_f connaissant K) | tronc commun | « Résoudre x²/(1 − x) = 4 » | maths |

**Conceptions erronées et pièges** (`content/pc/etat-equilibre/items.yaml`).
- *« L'équilibre, c'est la réaction qui s'arrête »* ; *« une des deux réactions bloque l'autre »*.
- *« K dépend des concentrations initiales ou du volume »*. **Pari** (NS 27F 2026 l'a posé en QCM) :
  après dilution, K vaut-il plus, moins, ou la même chose ? (la même).
- *« Q_r et K sont la même chose »* ; *« Q_r est constant »*.
- *« La dilution a toujours le même effet sur τ »*.
- *Q_r mal construit* (eau au numérateur, exposants oubliés, réactifs en haut).
- Piège de copie : σ calculé avec des concentrations en mol/L.

**Représentations.**
- **Figure-clé : « tous les chemins mènent à K »** [À VÉRIFIER] (10 étapes) : trois mélanges de départ ;
  Q_r,i calculé pour chacun ; **pari** : lequel atteindra la plus grande valeur de Q_r à l'équilibre ? ;
  les trois courbes Q_r(t) convergent vers K ; τ différents.
- **Manipulable « échelle des quotients »** (scène de C7, `content/pc/evolution-spontanee/media/echelle-des-quotients.json`) :
  placer Q_r,i et K sur une échelle logarithmique ; le mélange glisse vers K.
- **Expérience réelle** : TP 4 de l'annexe (« Détermination de la constante d'équilibre chimique par
  mesure de la conductance »).

**Histoire et personnages.**
① **Guldberg et Waage, 1864**, loi d'action de masse : l'équilibre est **dynamique**, deux vitesses
égales ; van 't Hoff y arrive seul en 1877 [V] ([Law of mass action](https://en.wikipedia.org/wiki/Law_of_mass_action)).
② **Le Chatelier, 1884** [V] ([Le Chatelier's principle](https://en.wikipedia.org/wiki/Le_Chatelier%27s_principle))
— à citer en culture : son principe n'est pas écrit au cadre, qui parle seulement d'excès de réactif et
d'élimination d'un produit (C10).

**Pour aller plus loin.** L'équilibre de l'hémoglobine et du dioxygène [À VÉRIFIER] ; les eaux
gazeuses (CO₂ dissous) ; pourquoi une boisson gazeuse « s'évente ».

**Liens.** C3, C5, C7 (le critère Q_r,i face à K) ; C10 (K ≈ 4 de l'estérification) ; physique :
conductance (1ère Bac) ; maths : second degré.

### C5. Acides et bases en solution aqueuse : K_e, pH, K_A, pK_A, prédominance, indicateurs   (`reactions-acido-basiques`, R1-R8, R11)

**Filières et poids.** `pc-pc 2.2.3.1` à `2.2.3.9` et `2.2.3.14` ; SM identique ; SVT `pc-svt
2.2.5.1-9`, `2.2.5.14` (« **Représenter** et exploiter le diagramme de prédominance », sans le
diagramme de distribution). Sous-domaine : 10 % (SVT 11 %). Fréquence : la notion la plus fréquente
de la chimie — 2019 N (acide benzoïque, conductimétrie), 2022 N (acide propanoïque, τ, Q_r,éq, pK_A),
2023 N (acide éthanoïque et ion méthanoate, pH du mélange) [`docs/sujets/pc/reactions-acido-basiques.md`] ;
2026 : **6 sujets sur 6** — pK_A ≈ 4,81 (acide butanoïque, PC N), pK_A = 4,72 et espèce prédominante
(SVT N), pK_A = 4,8 (SVT R), BBT et courbe de distribution, pK_A(NH₄⁺/NH₃) ≃ 9,25 (SM R),
pH d'un mélange acide éthanoïque / ammoniac = ½(pK_A1 + pK_A2) (SM N) [OFF-sujet] ; 01 : 10/10
avec C6.

**Ce que le bac demande.** K_e, constante de l'autoprotolyse, **pK_e = −log K_e** ; nature d'une
solution par son pH ; pH à partir de [H₃O⁺] ou [HO⁻] ; **K_A** et **pK_A = −log K_A** ; K d'une
réaction acido-basique à partir des K_A des deux couples (K = K_A1/K_A2) ; **l'espèce prédominante**
connaissant pH et pK_A ; les diagrammes de **prédominance** et de **distribution** (PC, SM) ; le choix
de l'**indicateur coloré**. Formes : « Montrer que K_A = … » ; « Indiquer, en justifiant, l'espèce
prédominante » ; « Calculer K associée à la réaction de dosage » (NS 28F 2026 : K ≈ 1,55·10⁹) ;
lire pK_A au croisement des courbes de distribution ; pH du mélange de deux couples.

**L'idée-clé.** Chaque couple acide / base a son pK_A : à pH < pK_A, c'est l'acide qui domine ; à
pH > pK_A, la base ; à pH = pK_A, autant de l'un que de l'autre. Une réaction entre l'acide d'un
couple et la base d'un autre est d'autant plus avancée que K = 10^(pK_A2 − pK_A1) est grand.
*Image-clé :* l'**axe des pH** avec les pK_A posés dessus, et de part et d'autre de chaque pK_A, le
nom de l'espèce qui domine.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C3, C4 (τ, Q_r, K) | 2ème Bac | « HA + H₂O ⇄ A⁻ + H₃O⁺ : Q_r,éq en fonction de C et τ ? » | C3, C4 |
| Logarithme décimal ; 10^x | 2ème Bac maths (`maths-sexp 1.2.18`), parfois après | « −log(2·10⁻⁵) ≈ ? » | `content/maths/fonction-logarithme/lesson.md` |
| Brønsted, couples, pH-mètre | 1ère Bac [SEC] | « L'eau est-elle un acide, une base, ou les deux ? » | R1 de la leçon |
| Propriétés du log : log(a/b), log(a·b) | 2ème Bac maths | « log(K_A1/K_A2) = ? » | maths |

**Conceptions erronées et pièges** (`content/pc/reactions-acido-basiques/items.yaml`, 22 entrées).
- *« Force et concentration, c'est pareil »*. **Pari** (accroche de la leçon, « deux acides, une même
  concentration, deux pH différents ») : HCl et CH₃COOH à 10⁻² mol/L ont-ils le même pH ?
- *Échelle de pH lue à l'envers* ; *pH et concentration confondus* ; *K_A et pK_A comparés à l'envers*
  (le plus fort a le plus petit pK_A).
- *« À pH = pK_A, tout est acide »* (frontière lue comme une bascule totale) ; *croisement des
  courbes de distribution à pH = 7*.
- *Prédominance et distribution confondues* ; *virage d'un indicateur assimilé à pH = 7*.
- *« Un acide faible ne réagit presque pas »* ; *pH d'un mélange de deux couples mal dérivé*.
- Piège de copie : K de la réaction écrit K_A2/K_A1 au lieu de K_A1/K_A2 (selon le sens de l'équation).

**Représentations.**
- **Figure-clé : « l'axe des pH »** (fichiers étagés existants : `diagramme-predominance`,
  `zones-predominance-2`, `echelle-acide-neutre-basique` dans `content/pc/reactions-acido-basiques/media/`) ;
  à porter à 8-12 étapes avec un **pari** : « à pH = 6, dans le vinaigre dilué, qui domine ? »
  [À VÉRIFIER].
- **Manipulable existant** : `content/pc/reactions-acido-basiques/media/distribution-curseur-pH.interactive.json`
  (curseur de pH de 1 à 9, pourcentages de AH et A⁻ affichés) ; ajouter un pari avant le curseur.
- **Manipulable « indicateur »** : choisir un indicateur pour un dosage donné ; sa zone de virage
  glisse sur la courbe ; **pari** : la phénolphtaléine convient-elle pour doser l'ammoniac par HCl ?
- **Expérience réelle** : le jus de chou rouge comme indicateur universel [À VÉRIFIER : vidéo] ; le BBT
  qui vire du jaune au bleu (SM R 2026).

**Histoire et personnages.**
① **Sørensen, 1909**, au **laboratoire Carlsberg** (la brasserie) : il invente le pH, d'abord noté
« pH• » [V] ([pH](https://en.wikipedia.org/wiki/PH)). L'énigme d'ouverture parfaite : pourquoi une
brasserie avait-elle besoin d'une échelle d'acidité ?
② **Arrhenius** (1884) puis **Brønsted et Lowry** (1923) : deux définitions de l'acide [V] (C3).
**Maroc** : l'**OCP** produit de l'**acide phosphorique** à Jorf Lasfar (1,86 Mt en 2016) et à Safi,
où le complexe comprend une unité d'**acide sulfurique** [V]
([OCP Group](https://en.wikipedia.org/wiki/OCP_Group)) — l'acide-base à l'échelle industrielle.

**Pour aller plus loin.** Le pH de la peau et des cosmétiques (l'acide butanoïque de NS 28F 2026) ;
les pluies acides ; le pH des sols (agriculture : lien avec la filière « Sciences agronomiques » du
cadre SVT) [À VÉRIFIER].

**Liens.** C3, C4, C6 ; maths : log₁₀ ; SVT : acide lactique et fermentation (`04-svt.md`, E1 et E2 ;
l'acide lactique est aussi le sujet de 2018 N) ; SVT filière PC : pollutions (`svt-pc 3.2`).

---

### C6. Dosage acido-basique : équivalence, pH-métrie, conductimétrie   (`reactions-acido-basiques`, R9-R11)

**Filières et poids.** `pc-pc 2.2.3.10` à `2.2.3.14`, et `2.1.2.2` (« Repérer l'équivalence lors
d'un titrage ») ; SM : « Connaître le **dispositif** expérimental d'un dosage » (`pc-sm 2.2.3.11`) ;
SVT `pc-svt 2.2.5.10-14`. TP de l'annexe : « Dosage par mesure de pH » (réaliser le dosage d'un
produit de la vie courante), « Dosage directe de l'aspirine dans un comprimé » [sic] (`pc-pc` TP 5 et
10 de la chimie). Fréquence : 2018 N (acide lactique, indicateur), 2020 N (ammoniac), 2021 N (acide
carboxylique, pH_E et V_bE), 2024 N (**vitamine C d'un comprimé**), 2025 N (**hydrogénosulfite de
sodium**, vérifier l'étiquette) [`docs/sujets/pc/reactions-acido-basiques.md`] ; 2026 : dosage de
l'acide restant dans une estérification (PC N, SM R) [OFF-sujet].

**Ce que le bac demande.** L'équation de dosage (**une seule flèche**) ; le montage ; exploiter la
courbe pH = f(V) ou les résultats ; **repérer et exploiter l'équivalence** (méthode des tangentes,
dérivée) ; **justifier l'indicateur coloré**. Formes : « Déterminer graphiquement les coordonnées
(V_BE ; pH_E) » ; « Déterminer C_A » ; « En déduire la masse de vitamine C dans le comprimé » ;
« Justifier si l'indication de l'étiquette est juste » ; « Choisir, parmi les indicateurs suivants,
l'indicateur adéquat ».

**L'idée-clé.** On verse la solution titrante jusqu'à ce que le réactif titré soit **exactement**
consommé : à ce point (l'équivalence), les quantités introduites sont dans les proportions de
l'équation. Le pH saute brutalement autour de ce point ; l'indicateur qui change de couleur dans ce
saut le signale.
*Image-clé :* la courbe pH = f(V) en S, avec les deux tangentes parallèles et la médiane qui coupe
la courbe à l'équivalence ; en dessous, la courbe dérivée et son pic au même V_E.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Dosage direct, équivalence, burette | 1ère Bac (« dosages directs ») [SEC] | « 10 mL de C_A titrés, V_E = 12 mL de soude à 0,1 mol/L : C_A ? » | rappel |
| C5 (K de la réaction de dosage, quasi totale) | 2ème Bac | « Une réaction de dosage doit-elle être totale ? » | C5 |
| Masse molaire, m = n·M | tronc commun | « n = 2·10⁻³ mol d'acide ascorbique (M = 176 g/mol) : m ? » | TC |
| Dilution (facteur) | tronc commun | « On dose une solution diluée 10 fois : C de départ ? » | TC |

**Conceptions erronées et pièges** (`content/pc/reactions-acido-basiques/items.yaml`).
- *« L'équivalence est à pH = 7 »* ; *« V_E se lit à pH = 7 »*. **Pari** : en dosant l'acide
  éthanoïque par la soude, le pH à l'équivalence est-il < 7, = 7 ou > 7 ? (> 7).
- *« À l'équivalence, les volumes (ou les concentrations) sont égaux »*.
- *« Dérivée nulle à l'équivalence »* (elle est **maximale**) ; *demi-équivalence prise pour
  l'équivalence*.
- *« N'importe quel indicateur convient »* ; *« une réaction limitée peut servir de dosage »*.
- Piège de copie : oublier le facteur de dilution ou de prélèvement (le comprimé dissous dans 100 mL,
  dont on dose 10 mL).

**Représentations.**
- **Figure-clé** : les fichiers étagés existants `equivalence-methode-tangentes`, `equivalence-courbe-derivee`,
  `zone-virage-sur-saut`, `montage-dosage-phmetrique` (`content/pc/reactions-acido-basiques/media/`).
- **Manipulable existant** : `lecture-Ve-courbe-dosage.interactive.json` (un point qu'on glisse sur
  la courbe, V et pH lus) ; ajouter le **pari** « où est l'équivalence ? » avant le glisser.
- **Simulation de dosage goutte à goutte** [À VÉRIFIER] : burette virtuelle, pH-mètre, l'élève verse,
  la courbe se trace ; mode conductimétrique (la courbe en V, deux droites dont l'intersection donne
  V_E) — la conductimétrie est au cadre (`pc-pc 2.1.2.3`, TP 2 et 4 de la chimie) mais presque absente
  de la leçon.
- **Expérience réelle** : dosage d'un comprimé d'aspirine ou de vitamine C (TP 10 de l'annexe ;
  2024 N).

**Histoire et personnages.** ① L'aspirine (1897, Hoffmann ou peut-être Eichengrün, chez Bayer) [V]
(C11) — à raconter avec le TP de l'aspirine. ② Sørensen (C5) [V]. Pas d'accroche propre au dosage
dans la banque [NT].

**Pour aller plus loin.** Le contrôle qualité (l'étiquette du produit est-elle juste ? 2025 N) ;
l'analyse de l'eau ; l'acidité du lait et de l'huile d'olive [À VÉRIFIER : normes marocaines à
sourcer].

**Liens.** C5 ; C2 (le dosage comme méthode de suivi) ; C10 (l'acide restant d'une estérification) ;
maths : dérivée, tangentes.

**À trancher.** La conductimétrie (dosage et mesure de K) mérite-t-elle un acte propre dans la leçon
d'acide-base, ou un petit chapitre « mesurer en chimie » commun à C2, C4 et C6 ?

---

### Sous-domaine « Sens d'évolution d'un système chimique »

---

### C7. Évolution spontanée : le critère Q_r,i face à K   (`evolution-spontanee`)

**Filières et poids.** `pc-pc 2.3.1.1-2` ; SM identique ; SVT `pc-svt 2.3.6.1-2`. Sous-domaine :
10 % (PC, SM), 7 % (SVT). Fréquence : 2012 N (pile, sens spontané) [`docs/sujets/pc/evolution-spontanee.md`] ;
en fait dans **chaque** exercice de pile ; SVT R 2026 (« Déterminer la valeur de Q_r,i … Déduire, en
justifiant, le sens d'évolution spontané », K = 6,8·10²⁸) [OFF-sujet].

**Ce que le bac demande.** Calculer Q_r d'un système dans un état donné ; déterminer le **sens
d'évolution spontanée** : Q_r,i < K → sens direct ; Q_r,i > K → sens inverse ; Q_r,i = K → équilibre.
(Annexe : critère illustré sur des réactions acido-basiques **et** d'oxydoréduction.)

**L'idée-clé.** Un système évolue toujours pour que Q_r **se rapproche de K** : on n'a pas besoin de
« deviner » le sens, on le calcule.
*Image-clé :* l'échelle des quotients (logarithmique) avec K marqué : Q_r,i posé à gauche → le mélange
glisse vers la droite.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C4 (Q_r, K) | 2ème Bac | « Q_r de Cu²⁺ + Zn → Cu + Zn²⁺ ? » | C4 |
| Oxydoréduction, demi-équations | 1ère Bac [SEC] | « Zn → Zn²⁺ : oxydation ou réduction ? » | R1 de la leçon |
| Puissances de 10 (K ≈ 10³⁷) | collège | « 10⁻² / 10⁻¹ = ? » | rappel |

**Conceptions erronées et pièges** (`content/pc/evolution-spontanee/items.yaml`, 18 entrées).
- *Le seuil du critère serait 1* (Q_r,i > 1 → sens inverse). **Pari** de la scène (étape 2) : sur 25
  mélanges, combien évoluent dans le sens inverse ?
- *Comparaison inversée* (Q_r,i petit annoncerait un recul).
- *« Spontané veut dire instantané »* (un sens possible peut être très lent).
- *Un solide dans Q_r* ; *exposants oubliés* ; *produits et réactifs inversés*.
- *Oxydé et réduit inversés*.

**Représentations.**
- **Figure-clé : la scène « échelle des quotients »** (`content/pc/evolution-spontanee/media/echelle-des-quotients.json`,
  5 étapes, 5 paris : sens d'un mélange, 25 mélanges, étain et plomb, expression de Q_r,i, ce qui se
  passe dans le bécher).
- **Expérience réelle** : une lame de zinc dans une solution de sulfate de cuivre (dépôt rouge, la
  couleur bleue qui pâlit) — l'accroche de la leçon.

**Histoire et personnages.** Guldberg et Waage (C4) [V] ; Berthollet (C3) [V].

**Pour aller plus loin.** La corrosion (sens spontané qu'on veut empêcher) ; la protection des
coques de bateau par des anodes de zinc [À VÉRIFIER].

**Liens.** C4 ; C8 (une pile est une évolution spontanée qu'on fait passer par un fil) ; C9 (l'électrolyse
force le sens inverse).

---

### C8. Piles et récupération de l'énergie   (`piles`)

**Filières et poids.** `pc-pc 2.3.2.1` à `2.3.2.5` ; SM identique ; SVT `pc-svt 2.3.7.1-5`.
Sous-domaine : 10 % (SVT 7 %). Fréquence : 2020 N (pile argent-chrome) [`docs/sujets/pc/piles.md`] ;
SVT R 2026 (pile argent / plomb : Q_r,i, sens spontané, QCM sur l'oxydation, le schéma conventionnel
et le pont salin, Q_max, masse d'argent déposée) [OFF-sujet] ; 01 : 1/10.

**Ce que le bac demande.** Schématiser une pile (schéma conventionnel) ; le sens de déplacement des
porteurs de charges par le critère d'évolution ; **interpréter** le fonctionnement à partir d'une
seule information (sens du courant, f.é.m., réactions, polarité) ; équations aux électrodes (double
flèche) et bilan (simple flèche) ; **Q = I·Δt = n(e⁻)·F** pour trouver une quantité d'électricité,
un avancement, une variation de masse. Formes : « Préciser l'anode de la pile. Justifier » ;
« Représenter le schéma conventionnel » ; « Déterminer la quantité d'électricité maximale fournie
par la pile » ; « Déterminer la masse d'argent déposée ».

**L'idée-clé.** Dans une pile, la même réaction spontanée qu'en mélange direct se fait **à distance** :
les électrons passent par le fil (d'où un courant utilisable), les ions par le pont salin. La pile
s'use parce que Q_r monte vers K ; à Q_r = K, elle est « usée ».
*Image-clé :* les deux béchers reliés par le fil et le pont, avec les flèches : électrons dans le fil
de l'anode (−) vers la cathode (+), courant en sens inverse, ions dans le pont.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C7 (sens spontané) | 2ème Bac | « Q_r,i < K : quel métal se dissout ? » | C7 |
| Oxydation à l'anode, réduction à la cathode | 1ère Bac / 2ème Bac | « La cathode est-elle le lieu de la réduction ? » | R3 de la leçon |
| Courant électrique, sens conventionnel, Q = I·Δt | tronc commun / collège | « 0,1 A pendant 1 h : Q ? » | physique TC |
| Masse molaire | tronc commun | « 2 mmol d'argent : masse ? » | TC |

**Conceptions erronées et pièges** (`content/pc/piles/items.yaml`).
- *Anode et cathode, ou leur polarité, confondues* (piège « réduction = négatif »).
- *« Le courant va dans le même sens que les électrons »*.
- *« Une pile branchée ne s'use pas »*. **Pari** : une pile débite 0,1 A ; Q_r augmente-t-il, diminue-t-il,
  ou reste-t-il constant ?
- *Pont salin et fil interchangeables* ; *le réactif limitant est « celui qu'on voit »* (la lame).
- *Erreurs sur Q = n(e⁻)·F* (nombre d'électrons par ion).

**Représentations.**
- **Figure-clé** [À VÉRIFIER] (10 étapes) : la lame de zinc dans le cuivre (C7) — l'énergie part en
  chaleur ; **pari** : et si l'on sépare les deux espèces ? ; deux béchers ; le fil seul (rien ne passe) ;
  le pont salin ; le courant ; les flèches ; le schéma conventionnel qui se dessine à partir du montage.
- **Manipulable « pile qui s'use »** : Q_r(t) qui monte vers K, l'intensité qui baisse, la masse des
  électrodes ; **pari** sur l'instant où elle s'arrête.
- **Expérience réelle** : pile Daniell ; pile citron [À VÉRIFIER : à présenter honnêtement, ce n'est pas
  le citron qui fournit l'énergie] ; TP 6 de l'annexe (« Réaliser des piles faisant intervenir des
  couples de type Mⁿ⁺/M »).

**Histoire et personnages.**
① **Galvani, 1780** : des cuisses de grenouilles mortes se contractent (publié en 1791) ; **Volta** y
voit un effet des deux métaux et décrit sa pile à la Royal Society le **20 mars 1800** [V]
([Voltaic pile](https://en.wikipedia.org/wiki/Voltaic_pile)).
② Le moment où ça a coincé : électricité « animale » (Galvani) ou électricité des métaux (Volta) ?
[V, même source].
③ **Goodenough**, Nobel 2019 (batteries lithium-ion) à 97 ans, le plus âgé de l'histoire [V]
([John B. Goodenough](https://en.wikipedia.org/wiki/John_B._Goodenough)).

**Pour aller plus loin.** Le téléphone, la voiture électrique ; recharger un accumulateur, c'est faire
une électrolyse (C9, compétence ciblée p. 29).

**Liens.** C7 ; C9 (le même dispositif, sens forcé) ; physique : courant, Q = I·Δt (E1) ; SVT :
oxydoréductions de la respiration (chaîne respiratoire : transfert d'électrons, `04-svt.md` E1).

---

### C9. Transformations forcées : l'électrolyse   (`electrolyse`) — PC et SM

**Filières et poids.** `pc-pc 2.3.3.1` à `2.3.3.5` ; SM : 4 tirets (`pc-sm 2.3.3.1-4`, sans
« Savoir qu'une électrolyse est une transformation forcée ») ; **absente du cadre SVT**. Sous-domaine :
10 %. TP de l'annexe : « Electrolyse en solution aqueuse » (réaliser des transformations forcées ;
**déterminer la constante de Faraday**). Fréquence : 2018 N (bromure de plomb), 2019 N (iodure de
zinc), 2022 N (**chromage** d'une plaque d'acier) [`docs/sujets/pc/electrolyse.md`] ; 2026 : PC R
(**nickelage** d'une lame d'aluminium), SM N (**synthèse du dihydrogène**, pH de la solution obtenue)
[OFF-sujet] ; 01 : 4/10.

**Ce que le bac demande.** Savoir que l'électrolyse est forcée ; reconnaître **anode (oxydation)** et
**cathode (réduction)** à partir du sens du courant imposé ; schématiser le montage ; équations aux
électrodes et bilan ; **Q = I·Δt = n(e⁻)·F** pour trouver un avancement, une masse déposée, un volume
de gaz. Formes : « Identifier l'électrode qui joue le rôle de la cathode. Justifier » ; « Déterminer
la masse de chrome déposée en 2 h » ; « Calculer le volume de dihydrogène produit » (SM N 2026 :
I = 1 A, Δt = 10 min).

**L'idée-clé.** Un générateur **impose** le sens inverse du sens spontané : il « pompe » les
électrons à l'anode (borne +) et les force à la cathode (borne −). La quantité de matière transformée
est fixée par la **charge** qui a traversé la cellule, pas par la tension.
*Image-clé :* la pile retournée — même montage, mais le générateur à la place de la résistance, et
les flèches inversées.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C7, C8 (sens spontané, électrodes) | 2ème Bac | « Dans une pile, l'anode est-elle + ou − ? » | C8 |
| Demi-équations, nombre d'électrons | 1ère Bac | « Cr³⁺ + ? e⁻ → Cr » | 1ère Bac |
| Volume molaire des gaz | tronc commun | « 2·10⁻³ mol de H₂ à V_m = 24 L/mol : V ? » | TC |
| Q = I·Δt, conversions h → s | collège | « 2 h = ? s » | rappel |

**Conceptions erronées et pièges** (`content/pc/electrolyse/items.yaml`).
- *« Forcer, c'est accélérer le sens spontané »*. **Pari** de la scène « banc d'électrolyse »
  (étape 1) : les deux fils échangés, la lame de zinc s'épaissit-elle ou s'amincit-elle ?
- *« Comme dans une pile, l'anode est la borne − »* (transfert de polarité).
- *« La quantité déposée se lit sur la tension »*. **Pari** (étape 5) : à 12 V au lieu de 6 V,
  la masse déposée change-t-elle à charge égale ?
- *Mauvais nombre d'électrons dans Faraday* ; *minutes non converties* ; *F qui dépendrait du métal*.
- *« Une cellule d'électrolyse produit de l'énergie »*.

**Représentations.**
- **Figure-clé : la scène « banc d'électrolyse »** (`content/pc/electrolyse/media/banc-electrolyse.json`,
  5 étapes, 5 paris : fils échangés, dépôt au bout d'1 h 30, demi-courant, moles d'électrons, F
  mesurée à 12 V).
- **Expérience réelle** : électrolyse de l'eau ; cuivrage d'une clé ; TP 7 de l'annexe (mesure de F)
  [À VÉRIFIER : sécurité].

**Histoire et personnages.**
① **Davy, 1807** : avec la pile, il isole le potassium et le sodium par électrolyse [V]
([Humphry Davy](https://en.wikipedia.org/wiki/Humphry_Davy)).
② **Hall et Héroult, 1886**, chacun de son côté, inventent l'électrolyse de l'aluminium ; tous deux
sont nés en 1863 et morts en 1914 ; avant, l'aluminium était si précieux qu'on en coiffa le Washington Monument [V]
([Hall–Héroult process](https://en.wikipedia.org/wiki/Hall%E2%80%93H%C3%A9roult_process)).
③ Ce que ça a changé : l'aluminium bon marché, le chromage, la recharge des batteries.

**Pour aller plus loin.** L'hydrogène « vert » par électrolyse de l'eau (SM N 2026) [À VÉRIFIER :
projets marocains à sourcer] ; la purification du cuivre ; la galvanoplastie (nickelage, chromage).

**Liens.** C8 (sens inverse) ; physique : courant, Q = I·Δt ; maths : proportionnalité.

**À trancher.** En filière SVT, la leçon `electrolyse` est hors cadre : la masquer pour ce profil ?

---

### Sous-domaine « Méthode de contrôle de l'évolution des systèmes chimiques »

---

### C10. Estérification et hydrolyse   (`esterification-hydrolyse`)

**Filières et poids.** `pc-pc 2.4.1.1` à `2.4.1.8` ; SM identique ; SVT `pc-svt 2.4.8.1-9`, avec
**« Écrire et exploiter l'expression de la constante d'équilibre K correspondant aux équations des
réactions d'estérification et d'hydrolyse »** (`2.4.8.6`, propre au cadre SVT). Sous-domaine : 7 %
(SVT 8 %). Fréquence : 2018 N (acide lactique et méthanol), 2023 N (acide éthanoïque et méthanol,
t₁/₂) [`docs/sujets/pc/esterification-hydrolyse.md`] ; 2026 : PC N (acide butanoïque et méthanol :
butanoate de méthyle, suivi par dosage, rôle de l'acide sulfurique, rendement), SM R (classe d'un
alcool C₃H₈O par le rendement de l'estérification), SVT N (acide éthanoïque et éthanol à reflux,
0,4 mol d'ester pour 0,6 + 0,6 mol, rendement et comment l'améliorer) [OFF-sujet] ; 01 : 1-2/10.

**Ce que le bac demande.** Les groupes caractéristiques (hydroxyle, carboxyle, ester, anhydride) ;
équations d'estérification et d'hydrolyse ; retrouver acide et alcool à partir de l'ester ; **nommer
les esters jusqu'à cinq carbones** ; réactions **lentes et limitées** ; le catalyseur accélère **sans
modifier l'équilibre** ; un **excès de réactif** ou l'**élimination d'un produit** déplace l'équilibre
dans le sens direct ; la composition du mélange à un instant. Formes : « Écrire, en utilisant les
formules semi-développées, l'équation … Nommer E » ; « Indiquer, en justifiant, la courbe
correspondant à … » ; « Répondre par vrai ou faux : le rôle de l'acide sulfurique est de diminuer
t₁/₂ » (vrai, NS 28F 2026) ; « Calculer le rendement » ; « Proposer une méthode pour améliorer le
rendement ».

**L'idée-clé.** Acide + alcool ⇄ ester + eau : lente, et limitée (pour un mélange équimolaire d'acide
et d'alcool primaire, environ deux tiers d'ester, K ≈ 4) ; on l'**accélère** par la chaleur et un
catalyseur, on l'**avance** en mettant un réactif en excès ou en retirant l'eau ou l'ester.
*Image-clé :* deux leviers distincts sur un même graphe n_ester(t) : le catalyseur rend la courbe
plus raide **sans changer son palier** ; l'excès d'alcool **relève le palier**.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Chimie organique : chaînes, groupes caractéristiques, nomenclature | 1ère Bac (« groupes caractéristiques », « réactivité des alcools ») [SEC] | « Nom de CH₃–CH₂–COOH ? » | 1ère Bac |
| C3, C4 (τ, K) | 2ème Bac | « τ = 2/3 : x_f si x_max = 0,6 mol ? » | C3 |
| C1 (facteurs cinétiques) | 2ème Bac | « Deux moyens d'accélérer ? » | C1 |
| Second degré (K = 4 → x_f) | tronc commun | « x²/(1 − x)² = 4, 0 < x < 1 : x ? » | maths |

**Conceptions erronées et pièges** (`content/pc/esterification-hydrolyse/items.yaml`).
- *« Le catalyseur augmente le rendement »*, *« chauffer améliore le rendement »*. **Pari** : deux
  ballons identiques, l'un avec acide sulfurique ; au bout de 48 h, lequel contient le plus d'ester ?
  (le même).
- *« L'estérification finit par être totale »* ; *« x_f = x_max »*.
- *Radicaux inversés dans le nom de l'ester* (le « -oate » vient de l'acide).
- *K et Q_r confondus* ; *« τ dépend de n₀ »* (pour un mélange équimolaire, non).
- Piège de copie : rendement calculé sur l'alcool en excès au lieu du réactif limitant.

**Représentations.**
- **Figure-clé : « deux leviers »** [À VÉRIFIER] (10 étapes) : les deux courbes n(t) ; on ajoute le
  catalyseur : **pari** sur le palier ; on met l'alcool en excès : **pari** sur le palier ; on retire
  l'eau (Dean-Stark, sans le nom) [À VÉRIFIER : hors cadre comme montage].
- **Manipulable « K = 4 »** : curseurs n(acide), n(alcool) ; la composition à l'équilibre calculée ;
  le rendement affiché ; **pari** : 1 mol d'acide et 3 mol d'alcool, rendement > ou < 2/3 ?
- **Expérience réelle** : synthèse d'un ester odorant (arôme de banane, d'ananas) au chauffage à
  reflux ; TP 8 de l'annexe [À VÉRIFIER : sécurité].

**Histoire et personnages.**
① **Berthelot et Péan de Saint-Gilles, 1862**, *Recherches sur les affinités* : acide et alcool
atteignent un équilibre qui dépend des quantités [S]
([Péan de Saint-Gilles](https://en.wikipedia.org/wiki/L%C3%A9on_P%C3%A9an_de_Saint-Gilles)) ; les
« deux tiers » se calculent avec K = 4 — un bon pari d'élève (02 §5.2).
② **Fischer et Speier, 1895** : l'estérification catalysée par un acide [V]
([Fischer–Speier esterification](https://en.wikipedia.org/wiki/Fischer%E2%80%93Speier_esterification)).

**Pour aller plus loin.** Les arômes et parfums (le butanoate de méthyle de NS 28F 2026) ; les
polyesters ; les graisses sont des esters (C11).

**Liens.** C3, C4 ; C11 (anhydride, saponification) ; C2 (suivi par dosage) ; maths : second degré ;
SVT : lipides [À VÉRIFIER : pas au cadre SVT de 2ème Bac].

---

### C11. Contrôle de l'évolution : anhydride d'acide, catalyse, saponification, rendement, montages   (`controle-catalyse`)

**Filières et poids.** `pc-pc 2.4.2.1` à `2.4.2.8` ; SM identique à un mot près (« consignes » de
sécurité au lieu de « règles », `pc-sm 2.4.2.2`) ;
SVT `pc-svt 2.4.9.1-8`. Sous-domaine : 7 % (SVT 8 %). TP de l'annexe : « Préparation et propriétés
des savons » (TP 9). Fréquence : 2025 N (suivi cinétique d'une estérification, vrai / faux sur le
catalyseur) [`docs/sujets/pc/controle-catalyse.md`] ; questions de montage : choisir le montage de
chauffage à reflux (NS 27F 2026), rôle des pierres ponce ; SM R 2026 (« Choisir le procédé qui
permet d'améliorer… » : catalyseur, éliminer l'eau, excès d'eau, température) [OFF-sujet].

**Ce que le bac demande.** **Justifier le matériel** : chauffage à reflux, distillation fractionnée,
cristallisation, filtration sous vide ; les **règles de sécurité** ; proposer un protocole ; l'**anhydride
d'acide** avec un alcool (**rapide et totale**) ; l'**hydrolyse basique** d'un ester (saponification) ;
calculer un **rendement** ; parties **hydrophile** et **hydrophobe** d'un ion carboxylate à longue
chaîne (le savon) ; rôles **accélérateur et sélectif** du catalyseur.

**L'idée-clé.** Deux façons de « contrôler » une synthèse : changer de **réactif** (l'anhydride
d'acide rend la réaction rapide **et totale**, la soude rend l'hydrolyse totale) ou ajouter un
**catalyseur** (plus vite, même état final, et parfois une seule réaction parmi plusieurs : la
sélectivité).
*Image-clé :* le montage de chauffage à reflux légendé, et à côté l'ion carboxylate du savon, tête
dans l'eau, queue dans la graisse.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| C10 | 2ème Bac | « Pourquoi l'estérification est-elle limitée ? » | C10 |
| Matériel de laboratoire, sécurité | tronc commun (« extraction, séparation, synthèse ») [SEC] | « À quoi sert un réfrigérant à boules ? » | TC |
| Polarité, solubilité (eau / huile) | tronc commun / 1ère Bac [À VÉRIFIER] | « Pourquoi l'huile ne se mélange-t-elle pas à l'eau ? » | rappel |

**Conceptions erronées et pièges** (`content/pc/controle-catalyse/items.yaml`).
- *« L'anhydride, c'est comme l'acide »* (double flèche, eau produite) : il donne un **acide**, pas
  de l'eau, et la réaction est totale.
- *« Le catalyseur déplace l'équilibre »* ; *« il figure dans le bilan »* ; *« il accélère toutes les
  réactions »*.
- *« La saponification est un équilibre »* ou *« produit un acide gras »* (elle produit des ions
  carboxylate).
- *« Vitesse et avancement final vont ensemble »* (rapide = totale).
- *Le reflux sert à « faire bouillir plus fort »* (il sert à chauffer sans perte de matière) [À VÉRIFIER :
  inventaire à compléter, la leçon ne traite pas les montages].

**Représentations.**
- **Figure-clé : « le montage de reflux pas à pas »** [À VÉRIFIER] (8 étapes, absente : aucune
  occurrence de « reflux », « distillation », « cristallisation » ni « filtration » dans la leçon) :
  ballon, pierres ponce, chauffe-ballon, réfrigérant, circulation d'eau ; **pari** : sans le réfrigérant,
  que devient le rendement ?
- **Animation « savon »** : des ions carboxylate qui entourent une goutte d'huile (micelle) ; **pari** :
  la queue va-t-elle vers l'eau ou vers l'huile ?
- **Expérience réelle** : fabrication d'un savon (huile + soude, TP 9 de l'annexe ; **soude caustique :
  consignes de sécurité indispensables**) [À VÉRIFIER : vidéo].

**Histoire et personnages.**
① **Chevreul** montre (1823) que les graisses sont des esters du glycérol et d'acides gras ; il vit
jusqu'à 102 ans [V] ([Michel Eugène Chevreul](https://en.wikipedia.org/wiki/Michel_Eug%C3%A8ne_Chevreul)).
② **Döbereiner, 1823** : un briquet où un fil de platine enflamme l'hydrogène sans être consommé ;
**Berzelius** nomme la « catalyse » en 1835 [V] ([Catalysis](https://en.wikipedia.org/wiki/Catalysis)).
③ **Haber, 1909** : l'ammoniac tiré de l'air ; Mittasch trouve un catalyseur au fer bon marché ;
usine d'Oppau en 1913 [V] ([Haber process](https://en.wikipedia.org/wiki/Haber_process)) ;
**Sabatier**, Nobel 1912, l'hydrogénation catalysée par les métaux [V] (02 §5.2) ; **l'aspirine**
(1897), un ester de l'acide salicylique, dont l'écorce de saule était utilisée depuis au moins
2 400 ans [V] ([Aspirin](https://en.wikipedia.org/wiki/Aspirin)).

**Pour aller plus loin.** Les savons et détergents ; les pots catalytiques ; les enzymes, catalyseurs
du vivant (SVT) ; le savon noir traditionnel [À VÉRIFIER : à sourcer avant de l'utiliser comme
exemple marocain].

**Liens.** C10 ; C1 (facteurs cinétiques) ; SVT : enzymes (`content/svt/role-enzymes/lesson.md`, hors
cadre SVT mais exemple de catalyse sélective).

**À trancher.** La leçon enseigne « les trois visages de la catalyse : homogène, hétérogène,
enzymatique » (R3), absents du cadre 2025, et ne traite pas les montages exigés (`pc-pc 2.4.2.1-2`).
Réordonner la leçon ?

---

## 5. Ce qui manque, ce qui dépasse

**Au cadre, absent ou presque de l'application :**

- **Les montages** (chauffage à reflux, distillation fractionnée, cristallisation, filtration sous
  vide) et **les règles de sécurité** (`pc-pc 2.4.2.1-2`) : aucune occurrence dans `controle-catalyse`.
- **La conductimétrie** comme méthode (dosage, mesure de K ; `pc-pc 2.1.2.3`, `2.2.2.1`, TP 2 et 4) :
  une seule mention dans `reactions-acido-basiques`, deux dans `etat-equilibre`.
- **L'aspirine** (TP 10) : aucune occurrence dans la leçon d'acide-base.
- **Profil SVT** : la dilution (`pc-svt 2.2.3.6`) est traitée (`etat-equilibre` R6) ; la constante K
  de l'estérification (`pc-svt 2.4.8.6`) est traitée (R3 de `esterification-hydrolyse`) ; mais
  l'**électrolyse** et les **chocs efficaces** doivent être masqués pour ce profil.

**Dans l'application, au-delà du cadre 2025 :** la spectrophotométrie (`suivi-temporel-vitesse`), les
trois types de catalyse (`controle-catalyse` R3), la précipitation comme illustration du critère
(`evolution-spontanee` R5 — acceptable en illustration).

**Les représentations existantes** : deux scènes (échelle des quotients, banc d'électrolyse) et deux
manipulables (curseur de pH sur la distribution, lecture de V_E) ; une vingtaine de figures étagées
en acide-base.

**Priorités proposées** [À VÉRIFIER] : (1) le **tableau d'avancement interactif** et la « chaîne de
l'acide faible » (pH → τ → K → pK_A), qui servent **chaque** sujet ; (2) le **dosage simulé**
(pH-métrie et conductimétrie) ; (3) la figure **« deux leviers »** (catalyseur contre excès) ; (4) les
**montages** ; (5) le profil SVT.
