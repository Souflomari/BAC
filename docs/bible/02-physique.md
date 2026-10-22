# 02 — Physique : ondes, nucléaire, électricité, mécanique

> **Statut : brouillon v0, 2026-10-22, à discuter avec le propriétaire.** Les capacités citées
> (`pc-pc 1.3.1.7`, `pc-sm 1.3.3.21`, `pc-svt 1.4.3.7`) renvoient au référentiel officiel transcrit
> mot pour mot : [`docs/referentiel/pc-pc.yaml`](../referentiel/pc-pc.yaml),
> [`pc-sm.yaml`](../referentiel/pc-sm.yaml), [`pc-svt.yaml`](../referentiel/pc-svt.yaml). Un
> identifiant a quatre chiffres : domaine · sous-domaine · chapitre · rang du tiret (le rang est
> reconstitué, le reste est la numérotation du document). La vérification des cadres et des
> sujets 2026 est dans [`sources/verification-pc.md`](sources/verification-pc.md). La chimie est
> au chapitre [`03-chimie.md`](03-chimie.md). Étiquettes : voir le [README](README.md). Tout ce qui
> est marqué **[À VÉRIFIER]** est une proposition de l'auteur.

---

## 1. La physique dans l'épreuve de physique-chimie

La physique-chimie est **une seule épreuve**, avec trois cadres de référence 2025 selon la
filière. Dans les trois, la physique pèse **67 %** (somme des sous-domaines) et, dans tous les
sujets observés, **13 points sur 20** : la chimie en prend toujours 7.

| | Filière PC | SM-A, SM-B | Filière SVT |
|---|---|---|---|
| Coefficient · durée | **7** · 3 h | **7** · **4 h** | **5** · 3 h |
| Exercices | 3 ou 4 (C-P1 p. 4) | **4 ou 5** (C-P2 p. 4) | 3 ou 4 (C-P3 p. 4) |
| Ondes · nucléaire · électricité · mécanique | 11 · 8 · 21 · 27 % (C-P1 p. 18) | 11 · 8 · 21 · 27 % (C-P2 p. 19) | **14** · 8 · **19 · 26** % (C-P3 p. 13) |
| Habiletés (ressources · expérimental · problème) | 50 · 15 · 35 % | **45 · 15 · 40** % | **60 · 15 · 25** % |
| Ce qu'elle a en plus | — | **RLC forcé** ; **particule dans un champ électrique** | — |
| Ce qu'elle n'a pas | RLC forcé, champ électrique | — | fission-fusion, modulation, Euler et frottement fluide, Lorentz, satellites, rotation, pendules pesant et de torsion, atome |
| Part de la moyenne générale (physique) | 0,5 × 7/23 × 67 % ≈ **10,2 %** | ≈ **10,2 %** | 0,5 × 5/23 × 67 % ≈ **7,3 %** |

Coefficients : en-têtes des sujets [OFF-sujet] (les cadres ne les impriment pas). Le reste :
[OFF], pages citées.

**Comment un sujet est construit** [OFF-sujet, sujets 2026 ; PROPRE 01 §3.3]. Page 1, un sommaire
annonce les exercices et leurs points : « Exercice 1 : Chimie (7 points) · Exercice 2 : … ».
Filière PC 2026 : **7 + 2,5 (nucléaire) + 5 (électricité) + 5,5 (mécanique)**, en normale comme en
rattrapage ; SM 2026 normale : 7 + 1,75 (nucléaire) + 1,75 (ondes) + 4,25 (électricité) + 5,25
(mécanique) ; filière SVT 2026 : 7 + 2,5 ou 3 + 5 + 5,5 ou 5. Chaque exercice d'électricité ou de
mécanique est en **deux parties indépendantes** (« Les parties I et II sont indépendantes »), qui
enchaînent souvent deux chapitres (RL puis modulation ; chute avec frottement puis pendule
élastique). Le barème est imprimé en marge, au quart de point.

**Ce que la répartition des points dit à l'élève.** La mécanique (5 à 5,5 pts) et l'électricité
(4,25 à 5 pts) sont dans **chaque** sujet : ensemble, ≈ la moitié de la note de physique-chimie.
Ondes et nucléaire se partagent les 2 à 3,5 points restants, et l'un des deux peut manquer (pas
d'ondes dans les deux sujets de la filière PC 2026, pas de nucléaire en SVT rattrapage 2026).

**Lire les habiletés** [À VÉRIFIER, lecture de l'auteur]. En filière SVT, 60 % des points sont de
l'« utilisation des ressources » : connaître une formule, l'appliquer, décrire un phénomène. En SM,
40 % sont de la « résolution de problème » : mobiliser, organiser les étapes, utiliser les outils
mathématiques, construire une déduction. Le même chapitre (RC, pendule élastique) s'entraîne donc à
deux hauteurs : en SVT, la fluidité des gestes de base ; en SM, l'enchaînement non guidé.

---

## 2. La méthode d'un exercice de physique

### 2.1 La consigne imprimée sur chaque sujet

> « On donnera les expressions littérales avant de passer aux applications numériques. »
> (NS 28F 2026, filière PC) — « La formule littérale doit être donnée avant l'application numérique
> et le résultat accompagné de son unité. » (RS 28F 2026, NS 30F 2026 SM) — « On donnera les
> expressions littérales avant toute application numérique » (NS 27F 2026, SVT) [OFF-sujet].

Ce que ça veut dire sur la copie : on écrit **la relation littérale isolant la grandeur cherchée**
(τ = R·C, T₀ = 2π√(m/K), v_ℓ = √(mg/μ)), puis **la substitution** avec les valeurs en unités SI,
puis **le résultat avec son unité** et un nombre raisonnable de chiffres significatifs. Une valeur
juste sans expression littérale perd l'essentiel des points de la question ; une expression juste
avec une application fausse en garde une partie [À VÉRIFIER avec un correcteur : le partage exact
dépend de la grille].

### 2.2 Les gestes qui reviennent

1. **Définir le système et le référentiel** (« dans un référentiel terrestre supposé galiléen »),
   **choisir un repère** et l'orienter : l'énoncé le fait souvent, il faut le recopier.
2. **Faire le bilan des forces** (ou des tensions, en électricité : loi d'additivité des tensions,
   loi d'Ohm, u = r·i + L·di/dt, i = dq/dt, q = C·u) et le **schématiser**.
3. **Appliquer la loi** (deuxième loi de Newton, relation fondamentale de la dynamique de rotation,
   loi des mailles), **projeter** sur les axes.
4. **Écrire l'équation différentielle** sous la forme demandée (« Montrer que l'équation
   différentielle s'écrit … ») : c'est le cœur de presque tous les exercices d'électricité et de
   mécanique.
5. **Vérifier une solution** proposée (on la dérive, on remplace, on identifie les constantes) :
   on ne demande jamais de résoudre une équation différentielle « à la main » au sens des maths ;
   on demande de vérifier et d'identifier τ, T₀, A, φ [OFF] (« Etablir l'équation différentielle et
   vérifier sa solution », `pc-pc 1.3.1.7`).
6. **Exploiter un graphe** : tangente à l'origine (τ), asymptote (régime permanent, vitesse
   limite), 63 % (τ), période (plusieurs périodes lues ensemble), pente, ordonnée à l'origine.
7. **Exploiter un graphe linéarisé** : dv/dt en fonction de v² (NS 28F 2026), ln u_R en fonction de
   t (RS 28F 2026), E_pe en fonction de x² (RS 28F 2026), L en fonction de D ou de 1/a
   (diffraction, 2021 N). Le geste : écrire la relation théorique sous la forme Y = a·X + b,
   **identifier** a et b, les **lire** sur la droite.
8. **Les équations aux dimensions** : capacité présente dans presque chaque chapitre (`pc-pc
   1.1.1`, `1.2.1.14`, `1.3.1.12`, `1.3.2.10`, `1.4.1.10`) : montrer que RC, L/R, √(m/K) sont des
   temps.
9. **Proposer un montage** (schéma légendé, branchement de l'oscilloscope ou de la carte
   d'acquisition) : c'est la part « application d'une solution expérimentale » (15 %).

### 2.3 Les formes de question, et ce qu'elles attendent

| Forme | Ce qu'on attend | Erreur qui coûte |
|---|---|---|
| **Montrer que** (une équation, une expression donnée) | partir des lois, aboutir à l'expression **imprimée** | recopier le résultat sans chemin ; changer les notations de l'énoncé |
| **Établir** | la même démarche, sans le résultat sous les yeux | oublier une force, un signe, la projection |
| **Vérifier que** (C = 10 µF, T₀ = …) | une application numérique qui retombe sur la valeur | poser la valeur et « constater » |
| **Déterminer graphiquement** | la construction (tangente, lecture) **et** la valeur avec unité | une valeur sans trace de lecture ; une seule période lue |
| **Déduire** | une conclusion courte qui s'appuie sur la question précédente | refaire tout le calcul autrement |
| **Choisir la proposition juste** (QCM) | une lettre, parfois justifiée | recopier une proposition sans numéro |
| **Répondre par vrai ou faux en justifiant** | le verdict **et** l'argument | le verdict seul (la moitié des points au mieux) |
| **Dire si ce modèle explique la réalité** | comparer un résultat calculé à une donnée de l'énoncé | ne pas conclure |

### 2.4 Les façons classiques de perdre des points [PROPRE, d'après les corrigés et les sujets ; À VÉRIFIER avec un correcteur]

1. L'application numérique **sans expression littérale**, ou **sans unité**.
2. Les **unités non converties** : µF, nF, mH, km/h, MeV, u, cm, ms ; et la calculatrice en
   **degrés** quand la formule exige des radians (θ = λ/a, petits angles).
3. Une **seule période** lue sur un graphe au lieu de plusieurs ; une demi-période prise pour la
   période ; la **largeur totale** entre deux élongations extrêmes prise pour l'amplitude.
4. Le **signe** dans la projection (axe orienté vers le bas en chute, poids sur un plan incliné,
   force de rappel −K·x).
5. La **résistance interne r de la bobine** oubliée dans τ = L/(R + r) et dans le courant permanent.
6. Confondre **τ** (constante de temps, ≈ 63 %) et **t₁/₂** (demi-vie, 50 %), ou **demi-vie** et
   **temps de demi-réaction** (chimie).
7. **Kepler** avec le mauvais exposant (T²/r³ et non T²/r ; r = R_T + h et non h).
8. Le **facteur ½** des énergies (½Cu², ½Li², ½Kx², ½Jω²) ou le **carré** oublié.
9. Le **retard d'un écho** compté pour un aller seulement.
10. Ne pas **conclure** quand la question demande « en déduire » ou « ce modèle explique-t-il… ».

### 2.5 Les outils mathématiques, et le décalage du calendrier

La physique de 2ème Bac consomme des outils que le cours de maths de la même année n'a pas
toujours encore faits (00 §7, « décalage de calendrier » [À VÉRIFIER avec le propriétaire]).

| Outil | Capacité de maths (cadre SExp) | Où la physique en a besoin | Remarque |
|---|---|---|---|
| Dérivée, dérivée d'une composée, dérivée seconde | 1ère Bac ; `maths-sexp 1.2.13` | vitesse, accélération, i = dq/dt, vérifier une solution | acquis en début d'année |
| Exponentielle et ln | `maths-sexp 1.2.16-1.2.21` | décroissance radioactive, RC, RL, chute avec frottement, linéarisation | en physique dès le nucléaire (début d'année) |
| y' = ay + b | `maths-sexp 1.2.23` | RC, RL, chute avec frottement (modèle linéaire) | la physique **vérifie** une solution donnée : le cours de maths n'est pas un préalable strict |
| y'' + ay' + by = 0 (dont y'' + ω²y = 0) | `maths-sexp 1.2.24` | RLC, oscillateurs | en maths, ce sont des capacités de fin de programme [À VÉRIFIER] |
| Trigonométrie (cos, sin, phase), radians | tronc commun, 1ère Bac | oscillations, modulation, diffraction | le mode radian de la calculatrice |
| Vecteurs, projection, produit scalaire | tronc commun, 1ère Bac | lois de Newton, a⃗·v⃗, travail | |
| Produit vectoriel | `maths-sexp 2.3.1-2.3.4` (SExp, 2ème Bac) | force de Lorentz qv⃗∧B⃗ | en SM, le produit vectoriel est vu en 1ère Bac (01 §1.4 [SEC]) |
| Second degré | tronc commun | portée d'un projectile, temps de vol | |
| Logarithme décimal | `maths-sexp 1.2.18` | pH (chimie), pas en physique | |

**Ce que l'application doit en tirer** [À VÉRIFIER] : un **détour juste-à-temps** de quelques
minutes (« ce qu'il faut savoir de l'exponentielle pour lire une charge de condensateur »), branché
sur la leçon de maths correspondante (`content/maths/fonction-exponentielle/lesson.md`,
`content/maths/equations-differentielles/lesson.md`), et non un renvoi « va faire le chapitre de
maths ».

### 2.6 Ce que l'application doit en faire [À VÉRIFIER]

- Un **atelier de lecture de graphe** commun à toute la physique : tangente à l'origine, asymptote,
  63 %, période sur plusieurs oscillations, linéarisation (on choisit Y et X, la droite apparaît).
- Un **gabarit de rédaction** : expression littérale → substitution → résultat avec unité, que le
  retour corrige séparément (trois petites cases au lieu d'une grande).
- Un **entraînement par créneau** : « l'exercice de mécanique de 5,5 points » comme unité de
  pratique, en deux parties indépendantes, comme le jour J.
- Le **profil de filière** : même notion, deux hauteurs (SVT : application ; SM : enchaînement).

---

## 3. Tableau d'ensemble

Poids : sous-domaine [OFF] (une notion partage le poids de son sous-domaine). Fréquence :
exercices du corpus [`docs/sujets/pc/`](../sujets/pc/) (filière PC, sessions normales 2017-2025,
cités par année) et des six sujets 2026 (verification-pc §6) ; comptages de 01 §3.3 sur 10 sujets
PC 2019-2025 [PROPRE] entre parenthèses. Difficulté : jugement de l'auteur [À VÉRIFIER]. État :
dossier `content/pc/<slug>` existant, ou « absente ».

| # | Notion | PC | SM | SVT | Poids [OFF] | Fréquence aux annales | Difficulté | État dans l'application |
|:-:|---|:-:|:-:|:-:|---|---|:-:|---|
| O1 | Ondes mécaniques progressives | ✓ | ✓ | ✓ | ondes 11 % (SVT 14 %) | 2018, 2022, 2024 ; SM N 2026, SVT R 2026 (01 : 5/10 avec O2) | faible | `ondes-mecaniques-progressives` (scène corde) |
| O2 | Ondes périodiques, diffraction mécanique, dispersion | ✓ | ✓ | ✓ | idem | 2019, 2020 | faible à moyenne | `ondes-mecaniques-periodiques` (scène cuve à ondes) |
| O3 | Lumière : diffraction, indice, dispersion | ✓ | ✓ | ✓ | idem | 2021 ; SVT R 2026 (01 : 3/10) | moyenne | `propagation-onde-lumineuse` (scène banc de diffraction) |
| N1 | Décroissance radioactive | ✓ | ✓ | ✓ | nucléaire 8 % | chaque année 2019-2025 ; PC N, SM N, SM R, SVT N 2026 (01 : 7/10) | moyenne | `decroissance-radioactive` (scène courbe et noyaux) |
| N2 | Noyaux, masse et énergie ; fission, fusion | ✓ | ✓ | sans fission-fusion | idem | 2020, 2023 ; PC R 2026 (fission), SM N 2026 | moyenne | `noyaux-masse-energie` |
| E1 | Dipôle RC | ✓ | ✓ | ✓ | électricité 21 % (SVT 19 %) | 2018, 2019, 2021, 2022, 2025 ; PC R, SM R, SVT R 2026 (01 : 6/10) | moyenne | `rc-charge` |
| E2 | Dipôle RL | ✓ | ✓ | ✓ | idem | 2020, 2023, 2024 ; PC N, SM N, SVT N 2026 (01 : 6/10) | moyenne | `dipole-rl` |
| E3 | RLC série : oscillations libres et entretenues | ✓ | ✓ | ✓ | idem | 2018 à 2025 (8 entrées) ; SM N, SVT N, SVT R 2026 (01 : 5/10) | moyenne à haute | `rlc-serie` |
| E4 | RLC série en régime sinusoïdal forcé | — | ✓ | — | idem (SM) | SM N 2026 | haute | **absente** |
| E5 | Ondes électromagnétiques, modulation d'amplitude | ✓ | ✓ | — | idem | 2017, 2021, 2023, 2025 ; PC N, PC R, SM R 2026 (01 : 6/10) | moyenne | `ondes-em-modulation` (scène banc de modulation) |
| M1 | Lois de Newton (cinématique, Frenet, 2ᵉ et 3ᵉ lois) | ✓ | ✓ | ✓ | mécanique 27 % (SVT 26 %) | partout (outil) ; 2019 (tremplin) | moyenne | `lois-de-newton` (scène tremplin) |
| M2 | Chute verticale libre et avec frottement ; Euler | ✓ | ✓ | chute libre | idem | 2018, 2020, 2021, 2022, 2023, 2024 ; PC N, PC R, SVT N 2026 (01 : 3/10 + 2/10) | moyenne | `chute-mouvements-plans` R1, R7-R8 |
| M3 | Plan horizontal ou incliné ; projectile | ✓ | ✓ | ✓ | idem | 2019 ; SM N, SVT R 2026 (01 : 2/10 + 2/10) | moyenne | `lois-de-newton` R7 ; `chute-mouvements-plans` R2-R5 |
| M4 | Particule chargée : champ magnétique (et électrique en SM) | ✓ (B) | ✓ (B, E) | — | idem | 2016 N cité par le corpus (non transcrit) | moyenne | B : `chute-mouvements-plans` R6 (scène 3D) ; **E absent** |
| M5 | Satellites et planètes, Kepler | ✓ | ✓ | — | idem | 2022, 2025 (01 : 2/10) | moyenne | `chute-mouvements-plans` R9-R10 (scène 3D) |
| M6 | Rotation autour d'un axe fixe | ✓ | ✓ | — | idem | 2011 R, 2024 ; SM R 2026 (poulie) | haute | `rotation-axe-fixe` (scène 3D manège) |
| M7 | Systèmes oscillants (élastique, pesant, torsion ; amortissement ; résonance) | ✓ | ✓ | ressort horizontal | idem | 2018, 2023, 2025 ; PC N, PC R, SM N, SM R, SVT N, SVT R 2026 (01 : 5-6/10) | moyenne à haute | `systemes-oscillants` |
| M8 | Aspects énergétiques des oscillateurs | ✓ | ✓ | ressort | idem | dans M7 (2018, 2023, 2025 ; 2026) | moyenne | `aspects-energetiques` |
| M9 | Atome et mécanique de Newton | ✓ | ✓ | — | idem | **aucun** exercice trouvé (21 couvertures lues) | faible | `atome-mecanique-newton` |

**Ce que dit le tableau.** La physique de l'application couvre le cadre PC presque entier ; il
lui manque **ce qui est propre à SM** (E4 et la moitié électrique de M4) et elle n'a **pas de
version SVT** (une leçon de SVT ne doit pas enseigner le pendule de torsion ni la fission comme
exigibles). Neuf notions sur dix-neuf ont une scène interactive (M2 a deux curseurs simples) ;
**aucun oscillateur** (M7, E3) n'en a, alors que c'est le chapitre le plus fréquent de tous.

---

## 4. Les fiches

### Sous-domaine « Ondes »

---

### O1. Ondes mécaniques progressives   (`ondes-mecaniques-progressives`)

**Filières et poids.** Les trois filières, même liste de 7 tirets : `pc-pc 1.1.1.1` à `1.1.1.7`,
`pc-sm 1.1.1.1-7` (le tiret 6 ajoute « la longueur d'onde »), `pc-svt 1.1.1.1-7` (le tiret 6 ajoute
« une amplitude » et « l'état de vibration d'un point par rapport à un autre point »). Sous-domaine
ondes : 11 % (PC, SM), 14 % (SVT). Fréquence : 2018 N (ultrasons dans un liquide), 2022 N (son,
durée de parcours), 2024 N (surface de l'eau, QCM) [`docs/sujets/pc/ondes-mecaniques-progressives.md`] ;
SM 2026 N (ultrasons et qualité d'une huile d'olive, 1,75 pt) ; SVT 2026 R (épaisseur d'une nappe
de pétrole par ultrasons) [OFF-sujet].

**Ce que le bac demande.** Définir onde mécanique, célérité, transversale / longitudinale ; écrire
y_M(t) = y_S(t − τ) ; exploiter τ = SM / v ; lire sur un oscillogramme ou une « photo » une
distance, un retard, une célérité ; proposer un montage de mesure du retard (deux récepteurs,
oscilloscope). Formes qui reviennent : « Les ondes ultrasonores sont-elles longitudinales ou
transversales ? » (2018 N, SVT R 2026) ; « En exploitant la figure 2, déterminer le retard
temporel » ; un **écho** (sonde, réflexion sur le fond : le retard compte un aller-retour) ; un
QCM d'ouverture (« Choisir la proposition juste », 2024 N ; « L'onde ultrasonore se propage dans le
vide avec la célérité v = 340 m/s » à réfuter, SM 2026).

**L'idée-clé.** Une onde transporte une **perturbation** et de l'**énergie**, pas de matière :
chaque point du milieu refait, avec un retard τ = d / v, exactement ce qu'a fait la source.
*Image-clé :* deux graphes côte à côte qu'il ne faut jamais confondre — la **photo** de la corde
(élongation en fonction de la position, à un instant) et le **film** d'un point (élongation en
fonction du temps, en un lieu).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Vitesse moyenne d = v·t, conversions (km/h, ms, µs) | collège | « Un son parcourt 1,02 km en 3 s : sa célérité ? » | rappel de proportionnalité [À VÉRIFIER : niveau exact] |
| Écriture scientifique, puissances de 10 | collège | « 2,1 µs = ? s » | atelier de conversions |
| Lire un oscillogramme (sensibilité horizontale, divisions) | collège ou tronc commun (oscilloscope) [À VÉRIFIER] | « 4 divisions à 0,5 ms/div : quelle durée ? » | atelier de lecture de graphe (§2.6) |
| Translation d'une courbe : f(t − τ) est f décalée vers la droite | tronc commun, maths | « Le graphe de t ↦ f(t − 2) est-il décalé à gauche ou à droite ? » | `content/maths/derivabilite-etude-fonctions/lesson.md` [À VÉRIFIER : la translation y est-elle traitée ?] |
| Le son, une vibration qui a besoin d'un milieu | collège [À VÉRIFIER] | « Entend-on une explosion dans l'espace ? » | O1, R4 de la leçon |

**Conceptions erronées et pièges** (inventaire de `content/pc/ondes-mecaniques-progressives/items.yaml`).
- *« L'onde emporte la matière »* : le bouchon dériverait avec la vague. **Pari** (l'accroche de la
  leçon, R0) : un bouchon posé loin du bord rejoindra-t-il le bord ? Il monte et descend sur place.
- *« La célérité dépend de la source »* (amplitude, forme, force du geste). **Pari** de la scène
  « corde » (étape 4) : avec un geste deux fois plus ample, le point M commencera-t-il à bouger plus
  tôt ? Non : la célérité est une propriété du **milieu** (sa tension, sa nature).
- *« La célérité est la vitesse d'un point du milieu »* : un point de la corde va et vient, à une
  vitesse qui n'a rien à voir avec v.
- *Photo et film confondus* ; *τ = v/d* ou *y_M(t) = y_S(t + τ)* ; *l'écho compté pour un seul
  trajet* ; *une onde mécanique dans le vide*.
- Piège de copie : prendre la **largeur d'une salve** pour le retard ; mesurer le décalage entre
  le début d'une salve et la fin de l'autre.

**Représentations.**
- **Figure-clé : la scène « corde, photo et film »** (`content/pc/ondes-mecaniques-progressives/media/corde-photo-film.json`,
  5 étapes, 5 paris) : une secousse unique, le film de M (le même graphe que la main, décalé de τ),
  la photo de la corde (le geste **retourné** le long de la corde), deux photos pour mesurer v, la
  tension du fil qui change v. C'est l'idée centrale ; elle devrait passer à 8-12 étapes avec un
  pari sur la photo (« la photo ressemble-t-elle au geste, ou à son reflet ? ») [À VÉRIFIER].
- **Manipulable « écho »** : un curseur règle la profondeur d'une couche (huile, pétrole, eau) ;
  l'oscillogramme émission / réception se met à jour ; l'élève lit τ et calcule la profondeur.
  **Pari** : en doublant la profondeur, le retard double-t-il ? Et si la célérité double ? (reprend
  SM 2026 et SVT R 2026) [À VÉRIFIER].
- **Expérience réelle** : un ressort long (type « slinky ») secoué latéralement puis
  longitudinalement ; la « ola » d'un stade (les spectateurs ne changent pas de place) [À VÉRIFIER :
  vidéo libre de droits].
- **Simulation sismique** : ondes P (longitudinales, rapides) et S (transversales, plus lentes)
  partant d'un foyer ; l'écart d'arrivée entre P et S donne la distance [À VÉRIFIER : hors cadre
  comme calcul, utile comme application du retard].
- **Analogie** : la file de dominos (l'énergie avance, chaque domino reste où il est). Limite : un
  domino ne revient pas à sa place.

**Histoire et personnages.**
① **Académie des sciences, 1738** : des tirs de canon chronométrés donnent 332 m/s à 0 °C [V]
([Speed of sound](https://en.wikipedia.org/wiki/Speed_of_sound)). Le problème : mesurer un temps
très court sur une grande distance — exactement le « retard temporel » du cadre.
② **Colladon et Sturm, lac Léman, 1826** : une cloche frappée **sous l'eau** en même temps qu'un
éclair de poudre ; l'écart entre l'éclair et le son donne la célérité dans l'eau [V]
([Jean-Daniel Colladon](https://en.wikipedia.org/wiki/Jean-Daniel_Colladon)).
③ Les ondes sismiques ont révélé l'intérieur de la Terre : **Mohorovičić (1909)**, la frontière
croûte-manteau ; **Inge Lehmann (1936)**, le noyau interne [V]
([Inge Lehmann](https://en.wikipedia.org/wiki/Inge_Lehmann)). **Maroc** : le séisme d'**Al Haouz**,
le 8 septembre 2023 à 23 h 11 (heure locale), magnitude de moment 6,9 (6,8 selon d'autres
agences), au moins 2 960 morts, enregistré jusqu'en Égypte [V]
([2023 Marrakesh–Safi earthquake](https://en.wikipedia.org/wiki/2023_Marrakesh%E2%80%93Safi_earthquake)) ;
le séisme de Lisbonne du 1er novembre 1755 a aussi frappé le Maroc [V] (02 §5.2). À raconter avec
retenue (des élèves ont pu être touchés).

**Pour aller plus loin.** Échographie médicale et sonar (le même calcul d'écho) ; contrôle
non destructif (la célérité des ultrasons dit la pureté d'une huile, SM 2026) ; sismographes du
réseau marocain [À VÉRIFIER : institut et données ouvertes].

**Liens.** O2 (le même retard, quand la source est périodique) ; O3 et E5 (une onde qui n'a pas
besoin de milieu) ; maths : translation de courbe, fonctions du temps ; SVT : séismes et structure
du globe (programme de collège, `verification-svt.md` §7).

**À trancher.** La scène « corde » est-elle la figure-clé (elle a 5 étapes, le format v3 en veut
8 à 16), ou faut-il une figure-clé distincte et garder la scène comme bac à sable ?

---

### O2. Ondes mécaniques progressives périodiques ; diffraction ; milieu dispersif   (`ondes-mecaniques-periodiques`)

**Filières et poids.** `pc-pc 1.1.2.1` à `1.1.2.8`, identiques en SM et en SVT (« inferieur(e) » [sic]
selon le document). Même sous-domaine que O1. Fréquence : 2019 N (surface de l'eau : λ, célérité,
point M sur le front), 2020 N (QCM de 5 affirmations puis λ, N, point M)
[`docs/sujets/pc/ondes-mecaniques-periodiques.md`]. Dans les sujets, O1 et O2 forment souvent un
seul exercice de 2,5 à 3,5 points (01 §3.3).

**Ce que le bac demande.** Reconnaître une onde périodique et sa période ; définir période,
fréquence, longueur d'onde ; **λ = v·T** ; la **condition de diffraction** telle que le cadre
l'écrit : « dimension de l'ouverture inférieure ou égale à la longueur d'onde » ; les
caractéristiques de l'onde diffractée (même fréquence, même longueur d'onde, front circulaire) ;
définir un milieu dispersif ; proposer un montage de diffraction pour le son ou les ultrasons.
Formes : mesurer λ sur une photo de la cuve à ondes (plusieurs λ ensemble) ; comparer deux points
(« en phase », « en opposition de phase », d = kλ ou (2k + 1)λ/2) ; vrai / faux sur la diffraction.

**L'idée-clé.** Une source périodique imprime au milieu **deux** périodicités : dans le temps (T)
et dans l'espace (λ) ; pendant une période, l'onde avance d'une longueur d'onde : λ = v·T. Une
ouverture de taille comparable à λ transforme l'onde en une onde qui s'étale, **sans changer ni sa
fréquence ni sa longueur d'onde**.
*Image-clé :* la cuve à ondes vue de dessus, crêtes en clair, une règle pour mesurer 5 λ d'un coup.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| O1 (retard, célérité) | 2ème Bac | « M est à 30 cm de S, v = 0,6 m/s : son retard ? » | O1 |
| Période, fréquence, f = 1/T | collège (courant alternatif) [À VÉRIFIER] | « T = 20 ms : f = ? » | rappel |
| Fonction sinusoïdale, phase | tronc commun / 1ère Bac maths | « cos(ωt) et cos(ωt + π) : en phase ? » | rappel trigonométrie |
| Multiples et demi-multiples | collège | « 7,5 cm = combien de λ si λ = 1,5 cm ? » | — |

**Conceptions erronées et pièges** (`content/pc/ondes-mecaniques-periodiques/items.yaml`, familles
OND-DIF, OND-DISP, OND-DP, OND-PH).
- *« Plus l'ouverture est grande, plus ça diffracte »*. **Pari** de la scène « cuve à ondes »
  (étape 1) : derrière une large ouverture, l'onde s'étale-t-elle ? À peine ; c'est en la rétrécissant
  jusqu'à λ que le phénomène devient net.
- *« La diffraction change la longueur d'onde (ou le rythme) »*. **Pari** (étape 3) : de l'autre
  côté, l'écart entre crêtes est-il le même ? Oui.
- *« λ dépend de la source seule »* : λ = v/f dépend aussi du milieu (v).
- *Milieu dispersif* confondu avec « milieu qui atténue » ; *deux points distants de λ/2 en phase*.
- Piège de copie : mesurer **une** longueur d'onde sur une photo au lieu de plusieurs ; oublier
  l'**échelle** de la photo.

**Représentations.**
- **Figure-clé : la double périodicité, pas à pas** [À VÉRIFIER] (10 étapes) : la source bat ; on
  fige une photo (λ) ; on filme un point (T) ; on fait avancer l'onde d'une période ; **pari** :
  « pendant une période, de combien la crête a-t-elle avancé ? » ; λ = v·T apparaît ; deux points
  à λ, deux points à λ/2.
- **Manipulable : la scène « cuve à ondes »** (`content/pc/ondes-mecaniques-periodiques/media/cuve-a-ondes.json`,
  5 étapes, 5 paris) : largeur de l'ouverture et battement de la règle ; le dernier pari demande de
  **choisir** les deux réglages qui étalent le plus l'onde.
- **Stroboscope simulé** [À VÉRIFIER : la stroboscopie n'est pas écrite au cadre ; utile pour
  « figer » l'onde et mesurer λ] : un curseur de fréquence des éclairs ; immobilité apparente quand
  elle vaut la fréquence de l'onde.
- **Expérience réelle** : diffraction des ultrasons (émetteur 40 kHz, fente réglable, récepteur
  qu'on déplace) — c'est le TP 2 de l'annexe du cadre (`pc-pc` TP « Diffraction d'une onde sonore
  ou ultrasonore »).
- **Analogie** : la houle qui contourne une jetée et entre dans un port.

**Histoire et personnages.** Pas d'accroche vérifiée propre à ce chapitre dans la banque (02 §5.2)
[NT]. Réutiliser O1 (célérité du son) et annoncer O3 (Young, Fresnel).

**Pour aller plus loin.** Pourquoi on entend derrière un mur mais on n'y voit pas : λ du son
(de l'ordre du mètre) et de la lumière (de l'ordre du demi-micromètre) [À VÉRIFIER : ordres de
grandeur à poser avec les élèves] ; la houle et la dispersion (les vagues longues vont plus vite
au large).

**Liens.** O1 ; O3 (même diffraction, autre onde) ; E5 (λ = c/f, taille d'antenne) ; maths :
fonctions périodiques.

---

### O3. Propagation d'une onde lumineuse : diffraction, indice, dispersion   (`propagation-onde-lumineuse`)

**Filières et poids.** `pc-pc 1.1.3.1` à `1.1.3.13` ; même liste en SM et en SVT (le cadre SVT
écrit λ = c/υ). Sous-domaine ondes. Fréquence : 2021 N (prisme, deux radiations, puis diffraction
et courbe L = f(D), λ = 600 nm) [`docs/sujets/pc/propagation-onde-lumineuse.md`] ; SVT R 2026
(laser, fente a = 5·10⁻² mm, écran à 2 m, tache centrale de 4,2 cm : schéma du montage, aspect de
la lumière mis en évidence, λ) ; 01 : 3/10 sujets PC.

**Ce que le bac demande.** L'aspect ondulatoire prouvé par la diffraction ; l'influence de la
taille de l'ouverture (ou de l'obstacle : un fil, un cheveu) ; **θ = λ/a** (unité, signification),
et sa vérification expérimentale ; **λ = c/ν** ; lumière monochromatique / polychromatique ;
limites du visible ; la **fréquence ne change pas** d'un milieu à l'autre ; **n = c/v** ; milieux
plus ou moins dispersifs ; schéma du montage de diffraction. Formes : établir L = 2λD/a (petits
angles, tan θ ≈ θ) ; exploiter une droite L = f(D) ou L = f(1/a) ; calculer ν, puis v et λ dans le
verre ; dire quelle propriété du prisme est mise en évidence.

**L'idée-clé.** La lumière est une onde de très petite longueur d'onde ; quand l'obstacle est assez
fin, elle s'étale, d'autant plus que la fente est fine (θ = λ/a). En entrant dans un milieu, elle
garde sa **fréquence** (sa couleur) et ralentit (v = c/n), donc sa longueur d'onde diminue ; comme
n dépend de la fréquence, le prisme sépare les couleurs.
*Image-clé :* le banc laser → fente → écran, avec l'angle θ dessiné du milieu de la fente au bord
de la tache centrale.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Propagation rectiligne, lumière blanche et couleurs | collège | « Une lumière blanche contient-elle du rouge ? » | rappel |
| Angle en radians, tan θ ≈ θ pour les petits angles | tronc commun / 1ère Bac maths | « 0,01 rad en degrés ? » | atelier radians (§2.4, piège 2) |
| O2 (diffraction, λ = v·T) | 2ème Bac | « Que faut-il pour diffracter : a ≤ λ ou a ≫ λ ? » | O2 |
| Réfraction (changement de direction à l'interface) | collège / 1ère Bac (lentilles) [À VÉRIFIER] | « Pourquoi une paille semble-t-elle brisée dans l'eau ? » | rappel |
| Proportionnalité, droite passant par l'origine | collège | « L = 2λD/a : que représente la pente de L = f(D) ? » | atelier linéarisation |

**Conceptions erronées et pièges** (`content/pc/propagation-onde-lumineuse/items.yaml`).
- *« La tache sur l'écran est l'ombre de la fente »* (un peu floue). **Pari** de la scène « banc de
  diffraction » (étape 1) : avec une fente deux fois plus fine, la tache centrale sera-t-elle deux
  fois plus étroite ? Elle est deux fois plus **large** — l'inverse de l'ombre.
- *« La couleur suit λ »* ou *« ν change en changeant de milieu »* : c'est λ qui change, ν reste.
  **Pari** : un laser rouge entre dans l'eau : devient-il orange ? [À VÉRIFIER]
- *v ≥ c* ou *n < 1* ; *θ = a/λ* ; *θ en degrés* dans la formule.
- *« Un prisme disperse aussi une lumière monochromatique »* ; *le rouge est le plus dévié* (c'est
  le violet).
- Piège de copie : confondre L (largeur de la tache) et sa demi-largeur dans tan θ = (L/2)/D.

**Représentations.**
- **Figure-clé : la scène « banc de diffraction »** (`content/pc/propagation-onde-lumineuse/media/banc-de-diffraction.json`,
  5 étapes, 5 paris) : fente plus fine, laser rouge et vert, écran qu'on recule, **le cheveu** (un
  obstacle diffracte comme une fente : on mesure un diamètre), puis choix des réglages.
- **Manipulable « droite L = f(1/a) »** : l'élève place cinq fentes, relève L, la droite se trace,
  la pente donne 2λD ; **pari** sur la position du sixième point [À VÉRIFIER].
- **Manipulable « prisme »** : un curseur de longueur d'onde, l'indice n(λ) affiché, la déviation
  qui change ; deux rayons rouge et violet pour la dispersion.
- **Expérience réelle** : diffraction d'un pointeur laser sur un cheveu (sécurité : ne jamais viser
  l'œil) [À VÉRIFIER : consignes de sécurité à écrire] ; le CD qui irise la lumière (réseau,
  au-delà du programme).
- **Frise** : Ibn al-Haytham → Newton et le prisme → Young → Fresnel et la tache d'Arago.

**Histoire et personnages.**
① **Ibn al-Haytham**, *Kitāb al-Manāẓir* (≈ 1011-1021) : la vision vient de la lumière qui entre
dans l'œil ; il décrit la chambre noire [V] ([Book of Optics](https://en.wikipedia.org/wiki/Book_of_Optics)).
② **Fresnel contre Poisson, 1818-1819** : Poisson croit réfuter la théorie ondulatoire, qui
prédirait un point brillant au centre de l'ombre d'un disque ; **Arago fait l'expérience : le
point est là** [V] ([Arago spot](https://en.wikipedia.org/wiki/Arago_spot)). C'est exactement la
conception « la tache est une ombre » mise à l'épreuve.
③ **Rømer (1676)** et **Fizeau (1849)** mesurent la vitesse de la lumière [V] (02 §5.2) ; **Young**,
l'homme des fentes, a aussi aidé à déchiffrer la pierre de Rosette [V]
([Thomas Young](https://en.wikipedia.org/wiki/Thomas_Young_(scientist))).

**Pour aller plus loin.** L'arc-en-ciel (dispersion par les gouttes) ; la fibre optique ; mesurer
l'épaisseur d'un cheveu au laser ; pourquoi les télescopes sont grands (la diffraction limite la
finesse) [À VÉRIFIER : à formuler sans calcul hors programme].

**Liens.** O2 ; E5 (la lumière est une onde électromagnétique, `pc-pc 1.3.4.3`) ; M9 (spectres de
raies, ΔE = hν) ; maths : radians, linéarisation ; chimie : spectrophotométrie [À VÉRIFIER : pas
au cadre de 2ème Bac].

**À trancher.** Les limites du visible : la leçon écrit ≈ 400 nm et ≈ 750 nm ; les manuels et
sujets marocains écrivent couramment **400 nm et 800 nm** [À VÉRIFIER sur le manuel]. Lesquelles
enseigner ?

---

### Sous-domaine « Transformations nucléaires »

---

### N1. Décroissance radioactive   (`decroissance-radioactive`)

**Filières et poids.** `pc-pc 1.2.1.1` à `1.2.1.15` ; mêmes 15 tirets en SM et en SVT.
Sous-domaine nucléaire : **8 %** dans les trois cadres. Fréquence : **tous les ans** dans le corpus
PC — 2019 N (radon 222), 2021 N (plutonium 238 d'un stimulateur cardiaque), 2022 N (iode 131),
2023 N (tritium), 2024 N (iridium 192), 2025 N (cadmium 107)
[`docs/sujets/pc/decroissance-radioactive.md`] ; 2026 : soufre 35 (PC N), potassium 40 (SM N),
uranium et âge de la Terre (SM R), césium 137 (SVT N) [OFF-sujet] ; 01 : 7/10. L'exercice vaut
1,75 à 2,75 points.

**Ce que le bac demande.** La notation ᴬ_Z X et la composition du noyau ; isotopes ; le diagramme
(N, Z) et ses domaines de stabilité ; α, β⁻, β⁺, γ ; les **deux lois de conservation** (Soddy) ;
écrire une équation et reconnaître un type ; **la loi de décroissance** et sa courbe ; 1 Bq = 1
désintégration par seconde ; τ, λ, t₁/₂ et leurs relations (t₁/₂ = ln 2 / λ, τ = 1/λ) ; les unités
par l'équation aux dimensions ; **choisir le radioélément convenable pour dater**. Formes : lire t₁/₂
sur une courbe a(t) ou N(t) ; « trouver l'instant où l'activité devient inférieure à … » (déchet,
SM 2026, SVT 2026) ; calculer un âge à partir d'un rapport ; QCM d'ouverture sur la composition
ou l'équation.

**L'idée-clé.** Un noyau instable ne vieillit pas : à chaque instant il a la **même probabilité**
de se désintégrer. Sur un grand nombre de noyaux, ce hasard devient une loi exacte : pendant chaque
demi-vie, la moitié de ce qui reste disparaît — N(t) = N₀e^(−λt).
*Image-clé :* l'**escalier des demi-vies** posé sur la courbe exponentielle : N₀, N₀/2, N₀/4,
N₀/8… à intervalles égaux.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Structure de l'atome, Z, A, isotopes | tronc commun (« modèle de l'atome ») [SEC AlloSchool] | « Combien de neutrons dans ¹⁴₆C ? » | R1 de la leçon |
| Charge électrique, électron, proton | collège | « Quelle est la charge d'un électron, en e ? » | rappel |
| Puissances de 2 (division répétée) | collège | « 1 000 divisé 3 fois par 2 ? » | — |
| Exponentielle, ln, e^(−λt) | 2ème Bac maths (`maths-sexp 1.2.16-1.2.21`), **souvent après** le nucléaire | « Résoudre e^(−0,1t) = 0,5 » | détour juste-à-temps (§2.5) ; `content/maths/fonction-logarithme/lesson.md` |
| Lire une courbe décroissante, tangente | 1ère Bac | « Où lire N₀/2 ? » | atelier graphe |

**Conceptions erronées et pièges** (`content/pc/decroissance-radioactive/items.yaml`, 21 entrées).
- *« Un noyau plus âgé a plus de chances de se désintégrer bientôt »* — c'est **la** conception de la
  notion (02 §3.10). **Pari** (accroche de la leçon) : un vieux noyau et un noyau tout neuf, lequel
  se désintégrera le premier ? Aucun des deux n'a d'avance.
- *« Après n demi-vies, il reste N₀/n »* ; *« après deux demi-vies, tout a disparu »*. **Pari** de la
  scène « courbe et noyaux » (étape 2) : pour réduire de moitié les survivants, faut-il moins de
  temps qu'au début ? Le même.
- *« La loi vaut noyau par noyau »* — ou à l'inverse *« puisque c'est le hasard, rien n'est
  prévisible »*. **Pari** (étape 3) : sur 64 cases, au bout d'une demi-vie, exactement 32 ?
  Environ 32 ; sur 4·10¹⁴ noyaux, l'écart relatif devient invisible.
- *t₁/₂ = 1/λ* ; *l'activité compte les noyaux* ; *λ dépend de la température*.
- *Isotopes = même nombre de neutrons* ; *γ change Z ou A* ; *α ne change que A*.
- Piège de copie : compter les noyaux **désintégrés** au lieu des **restants** (N₀ − N).

**Représentations.**
- **Figure-clé : la population de dés** (02 §4.8, 12 étapes) : 100 dés, un « tic » lance chaque dé,
  les six disparaissent ; l'élève appuie une fois, puis cinq ; **pari** sur le nombre restant après
  10 tics ; le graphe se construit point par point ; l'escalier des demi-vies apparaît ; N = N₀e^(−λt).
  C'est du concret au symbole, et la conception « l'âge use le noyau » mise en scène puis réfutée.
- **Simulation : la scène « courbe et noyaux »** (`content/pc/decroissance-radioactive/media/courbe-et-noyaux.json`,
  5 étapes, 5 paris : lire t₁/₂, la deuxième demi-vie, 64 cases contre 4·10¹⁴ noyaux, activité
  contre nombre de noyaux, demi-vie quand λ double).
- **Manipulable « (N, Z) »** : la vallée de stabilité ; l'élève place un noyau, choisit α, β⁻ ou β⁺,
  le noyau fils se déplace (β⁻ : une case en diagonale ; α : deux et deux) ; **pari** : quel mode
  pour un noyau trop riche en neutrons ?
- **Manipulable « datation »** : un échantillon, plusieurs radioéléments (¹⁴C, ⁴⁰K, ²³⁸U…) ; on
  choisit celui dont t₁/₂ est adapté à l'âge à mesurer (capacité `1.2.1.15`, et l'exercice SM 2026
  sur l'âge de la Terre).
- **Expérience réelle** : un compteur Geiger devant une source scolaire (vidéo) : les clics
  irréguliers, la moyenne stable [À VÉRIFIER : vidéo libre de droits].

**Histoire et personnages.**
① **Becquerel, 26-27 février 1896** : le ciel est couvert, les plaques restent dans un placard ;
développées le 1er mars, elles montrent des ombres aussi nettes qu'au soleil [V]
([Henri Becquerel](https://en.wikipedia.org/wiki/Henri_Becquerel)).
② **Rutherford** forge le mot « demi-vie » (1907) [V] ; le mot « isotope » est proposé à Soddy en
1913 par la médecin **Margaret Todd** [V] ([Isotope](https://en.wikipedia.org/wiki/Isotope)).
③ **Libby, 1949** : la datation au carbone 14 testée sur du bois des tombes de Djéser et Snéfrou ;
Nobel 1960 [V] ([Radiocarbon dating](https://en.wikipedia.org/wiki/Radiocarbon_dating)). [S] Les
carnets de Marie Curie seraient encore radioactifs (02 §5.2).
**Maroc** : le **CNESTEN** exploite au centre de la Maâmora un réacteur de recherche **TRIGA Mark
II** de 2 MW, première criticité le 2 mai 2007, qui produit notamment des radio-isotopes [SEC]
([EPJ Web of Conferences 2023](https://www.epj-conferences.org/articles/epjconf/pdf/2023/14/epjconf_animma2023_04002.pdf)).

**Pour aller plus loin.** Médecine nucléaire (iode 131, technétium) ; gestion des déchets selon
leur demi-vie (« à vie très courte » si t₁/₂ < 100 jours, définition donnée par NS 28F 2026) ;
datation des roches ; radon dans les maisons.

**Liens.** N2 (l'énergie des désintégrations) ; E1, E2 et M2 (la même exponentielle, autre
mécanisme) ; chimie : temps de demi-réaction (à ne pas confondre, `03-chimie.md`) ; maths :
exponentielle et ln ; SVT : « matières radioactives et énergie nucléaire » de la filière PC
(`svt-pc 3.3`) et datation en géologie.

**À trancher.** Le cadre ne cite pas la **notation** de l'activité (A ou a) ; les sujets 2026
écrivent a(t). Uniformiser sur la notation des sujets ?

---

### N2. Noyaux, masse et énergie ; fission et fusion   (`noyaux-masse-energie`)

**Filières et poids.** `pc-pc 1.2.2.1` à `1.2.2.13` ; mêmes 13 tirets en SM ; **9 en SVT**
(`pc-svt 1.2.2.1-9`) : **ni fission ni fusion** — ni définition, ni équations, ni lecture de la
courbe d'Aston pour leur intérêt énergétique, ni « reconnaître le type de réaction » (C-P3 p. 6).
Sous-domaine nucléaire (8 %). Fréquence : 2020 N (polonium 210 et diagramme d'énergie), 2023 N
(fusion tritium-deutérium) [`docs/sujets/pc/noyaux-masse-energie.md`] ; souvent intégrée à
l'exercice de décroissance (énergie libérée) ; 2026 : **fission** donnant ¹³⁸Te et ⁹⁵Zr (PC R),
diagramme d'énergie du potassium 40 (SM N).

**Ce que le bac demande.** Défaut de masse et énergie de liaison ; énergie de liaison par
nucléon ; unités (u, MeV/c², J, eV) ; **la courbe d'Aston** (noyaux les plus stables ; intérêt de
la fission et de la fusion) ; E = mc² et énergie de masse ; équations de fission et de fusion ;
**bilan ΔE** par les énergies de masse, les énergies de liaison ou un **diagramme d'énergie** ;
E_libérée = |ΔE| ; applications et dangers. Formes : « Vérifier que E_ℓ(¹³⁸Te) = … » ; « Justifier
que ⁹⁵Zr est plus stable que ¹³⁸Te » (comparer E_ℓ/A) ; « Calculer, en joule, l'énergie libérée »
(RS 28F 2026) ; lire un diagramme à trois niveaux.

**L'idée-clé.** Un noyau pèse **moins** que ses nucléons séparés : la masse manquante est l'énergie
qu'il faudrait fournir pour le défaire (E_ℓ = Δm·c²). Les noyaux du milieu (vers le fer) sont les
plus liés par nucléon : casser un gros noyau ou fusionner deux petits **monte** vers ce sommet et
libère la différence.
*Image-clé :* la courbe d'Aston dessinée « à l'envers » (−E_ℓ/A) comme une **vallée** : le fer au
fond, la fission qui descend de la droite, la fusion qui descend de la gauche [À VÉRIFIER : vérifier
que l'inversion n'embrouille pas la lecture de la courbe officielle].

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| N1 (notation, lois de conservation) | 2ème Bac | « ²³⁵U + n → ⁹⁴Sr + ¹⁴⁰Xe + x n : x ? » | N1 |
| Énergie, joule, kWh, puissance | collège (énergie électrique) | « 1 kWh = combien de joules ? » | rappel |
| Écriture scientifique, ordres de grandeur | collège | « 1,66·10⁻²⁷ kg × (3·10⁸)² = ? » | atelier calculatrice |
| Masse molaire, constante d'Avogadro (pour « par kg de combustible ») | tronc commun (« la mole ») | « Combien de noyaux dans 1 g d'uranium 235 ? » | chimie TC |

**Conceptions erronées et pièges** (`content/pc/noyaux-masse-energie/items.yaml`).
- *« Le noyau assemblé pèse autant que ses nucléons »* ; *« la masse manquante a disparu »*.
  **Pari** : un noyau d'hélium pèse-t-il plus, autant ou moins que 2 protons + 2 neutrons ? Moins —
  et la différence, multipliée par c², est mesurable.
- *« L'énergie de liaison est une réserve que le noyau libère »* : elle est à **fournir** pour le
  défaire ; ce qui est libéré, c'est la **différence** entre avant et après.
- *« Plus E_ℓ est grand, plus le noyau est stable »* : c'est **E_ℓ/A** qu'on compare.
- *Signe de ΔE* et sens des flèches du diagramme d'énergie ; *931,5 MeV par u* mal utilisé ;
  *MeV et eV* ; masses atomiques au lieu de masses nucléaires sans le dire [À VÉRIFIER : convention
  des sujets].
- Piège de copie : oublier les neutrons émis dans le bilan de fission.

**Représentations.**
- **Figure-clé : la balance du noyau** [À VÉRIFIER] (10 étapes) : deux protons et deux neutrons sur
  un plateau, le noyau d'hélium sur l'autre ; **pari** sur le sens de la balance ; Δm apparaît ;
  ×c² ; E_ℓ ; puis divisé par A ; on place l'hélium sur la courbe d'Aston ; on y place l'uranium
  et le fer.
- **Manipulable « courbe d'Aston »** : l'élève choisit un noyau père et des noyaux fils ; la
  flèche monte ou descend ; l'énergie libérée s'affiche ; **pari** : fusionner deux noyaux de fer
  libère-t-il de l'énergie ? (non).
- **Diagramme d'énergie pas à pas** (trois niveaux : noyau père, nucléons séparés, produits) : la
  forme exacte des sujets (2020 N, SM 2026).
- **Analogie** : le prix d'un lot (le noyau) moins cher que les pièces détachées ; limite : ici, la
  « remise » est une énergie qui sort.

**Histoire et personnages.**
① **Aston** construit en 1919 un spectrographe de masse (déviation d'ions par des champs électrique
et magnétique) ; il montre que les masses des isotopes sont presque entières ; Nobel de chimie
1922 [V] ([Francis William Aston](https://en.wikipedia.org/wiki/Francis_William_Aston)). Le « presque »
est le défaut de masse ; la courbe porte son nom.
② **Meitner et Frisch, fin décembre 1938**, interprètent l'expérience de Hahn et nomment la
« fission » ; Hahn reçoit seul le Nobel 1944 ; Meitner avait été proposée 49 fois [V]
([Lise Meitner](https://en.wikipedia.org/wiki/Lise_Meitner)).
③ Ce que ça a changé : l'énergie nucléaire, civile et militaire ; l'énergie du Soleil (fusion) —
l'accroche de la leçon, « le Soleil ne peut pas brûler ».

**Pour aller plus loin.** Les centrales et la fusion contrôlée [À VÉRIFIER : sources à choisir] ;
le débat sur l'énergie nucléaire (en SVT, filière PC, « Exprimer son opinion », `svt-pc 3.3`) ;
pourquoi les étoiles s'arrêtent au fer.

**Liens.** N1 ; M4 (le spectrographe d'Aston dévie des particules chargées : la même physique) ;
M9 (ΔE = hν, quantification) ; chimie : énergie d'une réaction chimique (ordre de grandeur eV contre
MeV) ; SVT filière PC : matières radioactives (`svt-pc 3.3`).

**À trancher.** En filière SVT, la leçon actuelle enseigne la fission et la fusion (R4) alors que
le cadre SVT ne les a pas : les garder en « pour aller plus loin », ou masquer R4 pour ce profil ?

### Sous-domaine « Électricité »

---

### E1. Dipôle RC   (`rc-charge`)

**Filières et poids.** `pc-pc 1.3.1.1` à `1.3.1.18` ; SM identique ; SVT `pc-svt 1.3.1.1-18`, avec
« Reconnaître l'intérêt d'un montage mettant en jeu un dipôle RC » (`1.3.1.15`) et **sans** « Etablir
l'expression de l'énergie » (seulement la connaître et l'exploiter, `1.3.1.18`). Sous-domaine
électricité : 21 % (PC, SM), 19 % (SVT). Fréquence : 2018 N (condensateurs en parallèle), 2019 N,
2021 N, 2022 N, 2025 N (charge **par une source de courant**, C₀ = 1 µF)
[`docs/sujets/pc/rc-charge.md`] ; 2026 : PC R (**ln u_R en fonction de t**, C₀ = 2,5 nF, énergie),
SM R (énergie à la charge et à la décharge), SVT R (décharge, brancher l'oscilloscope, U₀ et τ,
C = 10 µF) [OFF-sujet] ; 01 : 6/10.

**Ce que le bac demande.** Conventions et signes des charges ; i = dq/dt ; q = C·u ; capacité,
unités et sous-multiples ; capacité **graphiquement et par calcul** (pente de q = f(u), ou charge à
courant constant u = I·t/C) ; associations en série et en parallèle et leur intérêt ; **établir
l'équation différentielle et vérifier sa solution** ; u_C(t), i(t), q(t) ; continuité de u_C,
discontinuité de i à t = 0 ; **τ = RC** et l'équation aux dimensions ; exploiter des documents
(τ, durée de charge, régimes transitoire et permanent, influence de R, C, E) ; montage et
branchement de l'oscilloscope ; énergie ½Cu². Formes : « Montrer que l'équation différentielle
vérifiée par u_C s'écrit … » ; « Déterminer graphiquement τ » (tangente à l'origine ou 63 %) ;
linéarisation ln u_R = ln E − t/τ ; « Vérifier que C = … » ; attribuer des courbes à des valeurs de R.

**L'idée-clé.** Le condensateur se remplit de **moins en moins vite** : plus il est chargé, plus il
« repousse » la tension du générateur, moins il reste de tension aux bornes de R, moins il passe de
courant. D'où une montée exponentielle de constante de temps τ = RC.
*Image-clé :* la courbe u_C(t) avec sa **tangente à l'origine** qui coupe l'asymptote E à t = τ, et
la marque « 63 % » sous le même τ.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Loi d'additivité des tensions, loi d'Ohm | collège / tronc commun | « E = 12 V, u_C = 4 V : u_R = ? » | TC, « tension électrique », « association des conducteurs ohmiques » [SEC AlloSchool] |
| Intensité = débit de charge (I = Q/Δt) | tronc commun (« courant électrique continu ») | « 2 mA pendant 5 s : quelle charge ? » | rappel |
| Dérivée d'une fonction, dérivée de e^(at) | 1ère Bac / 2ème Bac maths | « Dériver E(1 − e^(−t/τ)) » | `content/maths/fonction-exponentielle/lesson.md` |
| Exponentielle (valeurs e^(−1) ≈ 0,37, e^(−5) ≈ 0,007) | 2ème Bac maths, parfois après | « 1 − e^(−1) ≈ ? » | détour juste-à-temps (§2.5) |
| y' = ay + b | 2ème Bac maths (`maths-sexp 1.2.23`) | « Solution de τy' + y = E ? » | on **vérifie** une solution donnée : la leçon de maths n'est pas un préalable strict |
| Oscilloscope : voies, masse | collège / tronc commun | « Où brancher la masse pour voir u_C ? » | R3 de la leçon |

**Conceptions erronées et pièges** (`content/pc/rc-charge/items.yaml`).
- *« u_C saute instantanément à E »* et, symétriquement, *« le courant part de zéro, comme u_C »*.
  **Pari** : à l'instant de la fermeture, le courant est-il nul, maximal ou moyen ? Maximal, E/R :
  le condensateur vide n'oppose aucune tension.
- *« La charge se fait à débit constant »* (u_C linéaire) — c'est vrai **seulement** avec une source
  de courant (2025 N) ; avec un générateur de tension, le modèle se contredit (à u_C = E, i devrait
  être nul).
- *« τ est l'instant où la charge est finie »* : à τ, 63 % seulement ; ≈ 5τ pour le régime permanent.
- *τ = R/C* ; *E = C·u* (oubli du ½ et du carré) ; *u_C dépasse E*.
- *« En régime permanent, le condensateur laisse passer le courant »* : c'est l'inverse.
- Piège de copie : la tangente tracée à l'œil sur la courbe d'u_R (décroissante) au lieu d'u_C ;
  τ lu en divisions sans la sensibilité horizontale.

**Représentations.**
- **Figure-clé : la charge pas à pas** [À VÉRIFIER] (12 étapes) : le circuit ; t = 0, toute la
  tension sur R, courant maximal ; un instant après, u_C a monté, u_R a baissé d'autant ; **pari** :
  la montée suivante sera-t-elle plus grande ou plus petite ? ; la courbe se construit par
  petits pas (c'est la méthode d'Euler, sans le nom) ; la tangente à l'origine ; τ ; 63 % ; 5τ.
- **Manipulable « τ = RC »** (absent de l'application) : deux curseurs R et C, la courbe u_C(t) se
  redessine, τ affiché ; **pari** : en doublant R **et** en divisant C par deux, la courbe
  change-t-elle ? (non). Le curseur rend la règle « seul le produit compte » évidente.
- **Le champ des pentes** de la leçon de maths (`content/maths/equations-differentielles/media/champ-des-pentes.json`,
  scène existante) : l'équation τ·u' + u = E dessine ses pentes ; toutes les solutions convergent
  vers E. Un pont maths-physique déjà construit.
- **Expérience réelle** : charge d'un condensateur de 1 000 µF à travers 10 kΩ, mesurée au
  voltmètre toutes les 5 s (τ = 10 s : visible à l'œil) [À VÉRIFIER : valeurs à tester].
- **Analogie** : le seau qu'on remplit par un tuyau dont le débit diminue à mesure que le niveau
  monte (pression de retour). Limite : l'analogie ne dit rien de l'énergie perdue dans R.

**Histoire et personnages.**
① **La bouteille de Leyde, 1745-1746**, premier condensateur. Musschenbroek à Réaumur : « Tout à
coup ma main droite fut frappée avec tant de violence, que j'eus tout le corps ébranlé comme d'un
coup de foudre » [V] ([Bouteille de Leyde](https://fr.wikipedia.org/wiki/Bouteille_de_Leyde)).
② **L'abbé Nollet, 1746** : la décharge traverse environ 200 moines reliés par des fils de fer [V]
([Jean-Antoine Nollet](https://en.wikipedia.org/wiki/Jean-Antoine_Nollet)). La légende « pas pour
le royaume de France » n'est pas confirmée : utiliser la citation vérifiée (02 §5.4).

**Pour aller plus loin.** Le flash d'un appareil photo, la temporisation d'une minuterie, les
supercondensateurs [À VÉRIFIER : exemples sourcés] ; l'écran tactile capacitif.

**Liens.** E2 (même équation, autre dipôle) ; E3 (le condensateur chargé se décharge dans une
bobine) ; N1 et M2 (la même exponentielle) ; maths : y' = ay + b, exponentielle, ln (linéarisation) ;
chimie : conductimétrie [À VÉRIFIER : pas de lien direct au cadre].

**À trancher.** La leçon ne traite pas « Reconnaître l'intérêt d'un montage mettant en jeu un
dipôle RC » (propre au cadre SVT) : quels exemples d'« intérêt » le correcteur attend-il
(temporisation, flash, lissage) ? À demander à un enseignant de la filière SVT.

---

### E2. Dipôle RL   (`dipole-rl`)

**Filières et poids.** `pc-pc 1.3.2.1` à `1.3.2.16` ; SM identique ; SVT `pc-svt 1.3.2.1-16`
(« l'établissement et la rupture du courant », « Reconnaitre l'intérêt d'un montage … RL », sans
« Etablir l'expression de l'énergie magnétique »). Sous-domaine électricité. Fréquence : 2020 N,
2023 N, 2024 N [`docs/sujets/pc/dipole-rl.md`] ; 2026 : **PC N** (trois expériences (E, R, L), u_R(t),
r et L par la tangente, énergie magnétique), **SVT N** (R = 30 Ω et 50 Ω, r = 10 Ω, L = 0,6 H,
influence de R), **SM N** (caractéristiques d'une bobine) [OFF-sujet] ; 01 : 6/10.

**Ce que le bac demande.** u = r·i + L·di/dt en convention récepteur ; signification et unités ;
déterminer **L et r** à partir de résultats expérimentaux ; équation différentielle et vérification ;
i(t), puis les tensions ; continuité de i, discontinuité de u_L ; **τ = L/(R + r)** ; exploiter des
documents ; montage et oscilloscope ; énergie ½Li². Formes : « Montrer que l'équation
différentielle vérifiée par u_R s'écrit du_R/dt + (R + r)/L · u_R = R·E/L » (NS 28F 2026) ;
déduire u_R en régime permanent ; déterminer r à partir de I_permanent = E/(R + r) ; attribuer une
courbe à une expérience ; tension triangulaire aux bornes d'une bobine (TP 2 de l'annexe).

**L'idée-clé.** La bobine **s'oppose aux variations** du courant qui la traverse : elle ne
l'empêche pas de passer, elle le **retarde**. Le courant monte vers E/(R + r) avec la constante de
temps τ = L/(R + r) ; il ne peut pas sauter.
*Image-clé :* les deux courbes i(t) pour deux valeurs de R, même allure que la charge du
condensateur, mais avec **deux** grandeurs qui changent : le palier et τ.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| E1 (même équation) | 2ème Bac | « τ = RC vaut 2 ms ; que vaut u_C à 2 ms ? » | E1 |
| Champ magnétique créé par un courant, solénoïde | 1ère Bac (« champ magnétique créé par un courant ») [SEC AlloSchool] | « Un solénoïde parcouru par un courant crée-t-il un champ ? » | rappel 1ère Bac |
| Dérivée et taux de variation | 1ère Bac | « i passe de 0 à 0,2 A en 1 ms : di/dt ? » | — |
| Loi d'Ohm, résistance interne | tronc commun | « Un générateur réel : U = E − r·I ? » | TC, « dipôle actif » |

**Conceptions erronées et pièges** (`content/pc/dipole-rl/items.yaml`).
- *« Le courant saute à sa valeur finale à la fermeture »*. **Pari** (accroche de la leçon, « la
  lampe qui traîne à s'allumer ») : deux lampes, l'une en série avec une bobine ; laquelle
  s'allume la première ?
- *« La bobine bloque (ou stocke, ou amplifie) le courant »* : elle stocke une **énergie**
  magnétique, ½Li².
- *« I_max dépend de L »* : le palier E/(R + r) ne dépend pas de L ; seul τ en dépend.
- *Oubli de r* dans τ et dans le palier — l'erreur la plus coûteuse des sujets RL.
- *τ = R/L* ; *E = L·i*.
- Piège de copie : lire u_R au lieu de u_L, ou l'inverse, sur deux voies d'oscilloscope.

**Représentations.**
- **Figure-clé : « deux lampes »** [À VÉRIFIER] (8 étapes) : branche R, branche bobine ; fermeture ;
  **pari** ; la lampe de la bobine monte lentement ; la courbe i(t) ; tangente ; τ ; puis
  **ouverture** : l'étincelle (la bobine refuse que le courant tombe d'un coup).
- **Manipulable « τ = L/(R + r) »** : trois curseurs (L, R, r) ; deux courbes superposées ; **pari** :
  si je double R, le palier baisse-t-il, τ baisse-t-il, ou les deux ?
- **Simulation de la tension triangulaire** : i(t) en triangle, u_L(t) en créneaux (u_L = L·di/dt) :
  la pente lue sur un graphe devient une tension sur l'autre (TP de l'annexe, `pc-pc` TP 2 de
  l'électricité).
- **Analogie** : le volant d'inertie (ou un lourd chariot) qu'on pousse : il ne prend sa vitesse que
  peu à peu, et ne s'arrête pas net. L ↔ masse, i ↔ vitesse. Limite : r n'a pas d'équivalent simple.

**Histoire et personnages.**
① **Faraday, 1831**, découvre l'induction ; ancien apprenti relieur, sans formation universitaire
[V] ([Michael Faraday](https://en.wikipedia.org/wiki/Michael_Faraday)).
② **Joseph Henry** découvre l'**auto-induction** de son côté — d'où le nom de l'unité, le henry [V]
([Joseph Henry](https://en.wikipedia.org/wiki/Joseph_Henry)).

**Pour aller plus loin.** L'étincelle d'allumage d'un moteur [À VÉRIFIER : principe de la bobine
d'allumage à sourcer] ; pourquoi on ne coupe pas brutalement un circuit très inductif ; plaques à
induction (hors programme : induction mutuelle).

**Liens.** E1 ; E3 (bobine + condensateur = oscillateur) ; M2 (le même « régime transitoire →
régime permanent » qu'une chute avec frottement) ; maths : y' = ay + b ; 1ère Bac : champ
magnétique.

---

### E3. Circuit RLC série : oscillations libres et entretenues   (`rlc-serie`)

**Filières et poids.** `pc-pc 1.3.3.1` à `1.3.3.14` ; `pc-sm 1.3.3.1-14` ; `pc-svt 1.3.3.1-14`
(le RLC **est** au cadre SVT, C-P3 p. 8). Sous-domaine électricité. Fréquence : la notion la plus
présente du corpus électrique — 2018 N (pseudo-période, entretien par un générateur G), 2019 N,
2020 N (entretien, k₀), 2021 N (LC idéal), 2022 N, 2023 N (LC), 2024 N (décharge dans un RL,
énergie dissipée), 2025 N (dE_T/dt = −r·i²) [`docs/sujets/pc/rlc-serie.md`] ; 2026 : SM N (RLC
libre, entretien par u_g = 60·i), SVT N (énergie électrique E_e(t), pseudo-période, C = 104 µF,
ΔE_T), SVT R (E_e, E_m, E_t sur un même graphe, L) [OFF-sujet] ; 01 : 5/10.

**Ce que le bac demande.** Les trois régimes (périodique, pseudo-périodique, apériodique) et leurs
courbes ; l'équation différentielle **sans amortissement** (q̈ + q/(LC) = 0) et la vérification de
sa solution ; q(t), i(t) ; **T₀ = 2π√(LC)** ; l'explication **énergétique** des régimes ; les
diagrammes d'énergie ; l'énergie totale E_T = ½Cu² + ½Li² ; l'équation **avec** amortissement ;
l'**entretien** par un générateur u_G = k·i (qui compense l'effet Joule) ; exploiter des documents
(régimes, influence de R, L, C, pseudo-période et période propre) ; montage et oscilloscope. Formes :
« Expliquer de point de vue énergétique l'amortissement » ; « Montrer que dE_T/dt = −r·i² » ;
« Calculer l'énergie dissipée par effet Joule entre t = 0 et t₁ » ; trouver k pour l'entretien
(k = R + r) ; identifier E_e et E_m sur un graphe.

**L'idée-clé.** Un condensateur chargé relié à une bobine : l'énergie **passe** de l'un à l'autre,
comme celle d'un pendule passe de la hauteur à la vitesse. La résistance **ne crée pas** les
oscillations : elle les **freine** en dissipant l'énergie ; un générateur qui fournit k·i peut
exactement compenser cette perte.
*Image-clé :* les **barres d'énergie** E_e et E_m qui se vident l'une dans l'autre, et la barre E_T
qui baisse en escalier quand R ≠ 0.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| E1 et E2 (½Cu², ½Li², i = dq/dt, u_L = L·di/dt) | 2ème Bac | « Énergie d'un condensateur de 10 µF sous 6 V ? » | E1, E2 |
| Dérivée seconde, dérivées de cos et sin | 1ère / 2ème Bac maths | « (cos ωt)'' = ? » | `content/maths/equations-differentielles/lesson.md` R4 |
| y'' + ω²y = 0 | 2ème Bac maths (`maths-sexp 1.2.24`), en fin d'année [À VÉRIFIER] | « Une solution de y'' + 9y = 0 ? » | même leçon, R4 ; on vérifie une solution donnée |
| Pendule (énergie potentielle ↔ cinétique) | 1ère Bac (énergie mécanique) | « Où la vitesse d'un pendule est-elle maximale ? » | M8 |

**Conceptions erronées et pièges** (`content/pc/rlc-serie/items.yaml`).
- *« C'est la résistance qui crée (ou entretient) les oscillations »*. **Pari** (R3 de la leçon, « R
  est le frein, pas le moteur ») : si l'on annulait R, les oscillations disparaîtraient-elles ?
- *« L'énergie est consommée, elle ne s'échange pas »* ; *« le circuit se décharge comme un RC »*.
- *« Plus R est grand, plus ça oscille vite »* ; *« T₀ dépend de R »* (T₀ = 2π√(RC)).
- *« La pseudo-période vaut exactement T₀ »* (elle en est voisine si l'amortissement est faible —
  c'est ce que disent les sujets : « On considère que la pseudo-période est égale à la période
  propre »).
- *« L'entretien impose une fréquence de l'extérieur »* (c'est le régime **forcé**, E4) ; le
  générateur u_G = k·i rend de l'énergie au rythme du circuit lui-même.
- Piège de copie : E_e et E_m oscillent à la période **T₀/2** (elles dépendent de u² et de i²) ;
  lire T₀ sur un graphe d'énergie en prenant l'intervalle entre deux maxima d'énergie électrique.

**Représentations.**
- **Figure-clé : « le pendule d'énergie »** (R1 de la leçon) en 12 étapes [À VÉRIFIER] : le
  condensateur plein (barre E_e pleine) ; on ferme ; le courant monte, E_m se remplit ; **pari** :
  quand le condensateur est vide, le courant est-il nul ou maximal ? ; le condensateur se recharge
  à l'envers ; on ajoute R : chaque échange laisse un peu d'énergie en chaleur ; **pari** : la
  période change-t-elle beaucoup ?
- **Manipulable (absent, prioritaire)** : trois curseurs R, L, C ; la courbe u_C(t) et les barres
  d'énergie animées ensemble ; R balaie les trois régimes ; **pari** : à quelle valeur de R la courbe
  cesse-t-elle de traverser l'axe ?
- **Animations existantes** : la leçon a 10 animations (fichiers `motion` de
  `content/pc/rlc-serie/media/`), le plus grand nombre de la physique ; aucune n'est un
  manipulable [à confirmer à la lecture].
- **Le portrait de phase** (i en fonction de q : une ellipse ; une spirale si R ≠ 0) [À VÉRIFIER :
  hors cadre, mais c'est l'image la plus juste de l'échange d'énergie ; à réserver à « pour aller
  plus loin » ou au profil SM].
- **Expérience réelle** : oscillogramme d'un RLC avec une boîte à décades de résistance (TP 3 de
  l'annexe).

**Histoire et personnages.**
① **Kelvin (1853)** prédit que la décharge d'un condensateur dans une bobine doit **osciller** ;
② **Feddersen (1857)** photographie l'étincelle et voit les oscillations ; c'est le RLC [V]
([LC circuit](https://en.wikipedia.org/wiki/LC_circuit)).
③ Ce que ça a changé : le circuit accordé de la radio (E5).

**Pour aller plus loin.** L'accord d'un poste de radio (E5) ; les oscillateurs des montres et des
ordinateurs [À VÉRIFIER : quartz, à formuler prudemment] ; l'analogie complète électricité ↔
mécanique (L ↔ m, 1/C ↔ K, R ↔ frottement), qui fait de E3 et M7 **une seule** notion.

**Liens.** E1, E2 ; **M7** (même équation, même énergie : enseigner l'un en appelant l'autre) ;
E4 (régime forcé, SM) ; E5 (circuit bouchon LC) ; maths : y'' + ω²y = 0.

**À trancher.** Faut-il une **notion transversale « oscillateurs »** (E3 + M7 + M8), avec une seule
figure-clé et deux habillages, plutôt que trois leçons qui se répètent ?

---

### E4. Circuit RLC série en régime sinusoïdal forcé   (absente de l'application) — SM seulement

**Filières et poids.** **SM-A et SM-B uniquement** : `pc-sm 1.3.3.15` à `1.3.3.26` (C-P2 p. 9),
programme « 3.2. Oscillations forcées dans un circuit RLC série » (p. 23), TP « Circuit RLC série
à la résonance » (p. 27). Absente des cadres PC et SVT. Dans le sous-domaine électricité (21 %).
Fréquence : **SM 2026 N**, exercice 4 partie 2 (N₀ à partir de L = 2,5 mH et C = 120 nF ; vérifier
que N₁ et N₂ délimitent la bande passante à −3 dB ; N₂ à partir de Q ; R à la résonance, R ≈ 50 Ω)
[OFF-sujet, verification-pc §6]. Les sujets SM 2019-2025 n'ont pas été dépouillés [NT].

**Ce que le bac demande** (mot pour mot dans le YAML). Distinguer oscillations libres et forcées ;
le rôle de l'**excitateur** (le GBF) et du **résonateur** (le RLC) ; la phase |φ| = 2πτ/T (τ ici
est un **décalage horaire** lu entre deux courbes, pas une constante de temps) ; l'impédance
**Z = U/I** et son unité ; la **résonance électrique** (d'intensité) et ses caractéristiques ; le
**facteur de qualité Q = N₀/ΔN** ; la **bande passante à −3 dB** (I = I₀/√2) et l'influence de la
résistance sur Q ; la **surtension** ; la puissance instantanée, la **puissance moyenne
P = U·I·cos φ**, le facteur de puissance. Le cadre n'écrit **pas** l'expression générale
Z = √(R² + (Lω − 1/(Cω))²) [À VÉRIFIER : les manuels SM la donnent-ils ? le sujet 2026 s'en passe :
il utilise Z = U/I et Z = R à la résonance].

**L'idée-clé.** En régime forcé, le circuit oscille **à la fréquence du générateur**, pas à la
sienne. Mais il répond plus ou moins fort : l'intensité est **maximale quand la fréquence imposée
égale sa fréquence propre** N₀ = 1/(2π√(LC)) ; plus R est petit, plus ce pic est **étroit et haut**
(Q grand).
*Image-clé :* la **courbe de résonance** I(N) pour deux valeurs de R, avec la ligne I₀/√2 qui
découpe la bande passante.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| E3 (N₀, T₀ = 2π√(LC)) | 2ème Bac | « L = 2,5 mH, C = 120 nF : N₀ ? » | E3 |
| Tension alternative sinusoïdale, valeur efficace U = U_m/√2 | collège (courant alternatif) [À VÉRIFIER] | « U_m = 10 V : U_eff ? » | rappel |
| Lire un décalage entre deux sinusoïdes, phase | 1ère Bac maths (trigonométrie) | « Décalage de T/4 : déphasage ? » | atelier oscillogramme |
| Puissance électrique P = U·I | collège (« puissance électrique ») | « 220 V, 2 A : P ? » | rappel |
| M7 (résonance mécanique, excitateur, résonateur) | 2ème Bac | « Qui impose la fréquence : l'excitateur ou le résonateur ? » | M7 |

**Conceptions erronées et pièges** [À VÉRIFIER : la notion n'a pas d'inventaire dans l'application].
- *« En régime forcé, le circuit oscille à sa fréquence propre »*. **Pari** : on règle le GBF à
  2 kHz, N₀ vaut 9 kHz : à quelle fréquence oscille le courant ? (2 kHz).
- *« La fréquence de résonance dépend de R »* : N₀ ne dépend que de L et C ; R change la **hauteur**
  et la **largeur** du pic.
- *« Plus R est grand, plus la résonance est aiguë »* : c'est l'inverse.
- *« À la résonance, l'intensité est infinie »* : elle vaut U/R.
- *τ (décalage) confondu avec τ (constante de temps)* ; *φ en degrés dans cos φ en radians*.
- Piège de copie : la bande passante lue à I₀/2 au lieu de I₀/√2.

**Représentations.**
- **Figure-clé : « la balançoire électrique »** [À VÉRIFIER] (10 étapes) : le GBF pousse à une
  fréquence qu'on règle ; l'oscillogramme de i ; **pari** : à quelle fréquence la réponse est-elle
  la plus forte ? ; on balaie N, les points de la courbe I(N) s'ajoutent ; le pic à N₀ ; la ligne
  I₀/√2 ; ΔN ; Q ; on augmente R : **pari** sur la nouvelle courbe.
- **Manipulable « courbe de résonance »** : curseurs N (fréquence du GBF) et R ; la courbe et les
  deux oscillogrammes u(t), i(t) avec leur décalage ; le déphasage s'annule à N₀.
- **Expérience réelle** : le TP de l'annexe (GBF, RLC, oscilloscope ou carte d'acquisition) ;
  l'accord d'un poste de radio.
- **Analogie** : pousser une balançoire au bon rythme (M7). Limite : on y « voit » mal le déphasage.

**Histoire et personnages.**
① **Marconi, 1901**, première liaison radio transatlantique ; Nobel 1909 avec Braun [V]
([Guglielmo Marconi](https://en.wikipedia.org/wiki/Guglielmo_Marconi)) : choisir une station,
c'est choisir une fréquence de résonance.
② **Une légende à ne pas enseigner comme un fait** : le pont de **Tacoma Narrows** (effondré le
7 novembre 1940) n'est **pas** un exemple de résonance forcée : c'est un « flottement »
aéroélastique, et l'article cité note que des manuels le présentent à tort comme une résonance
[V] ([Tacoma Narrows Bridge (1940)](https://en.wikipedia.org/wiki/Tacoma_Narrows_Bridge_(1940))).
③ Un vrai exemple de rétroaction sur une fréquence propre : la **passerelle du Millénaire** à
Londres, ouverte le 10 juin 2000 et fermée le 12 juin à cause de vibrations latérales entretenues
par le pas des piétons (« synchronous lateral excitation ») [V]
([Millennium Bridge](https://en.wikipedia.org/wiki/Millennium_Bridge,_London)).

**Pour aller plus loin.** Filtres et égaliseurs ; le facteur de puissance des installations
électriques [À VÉRIFIER : exemple marocain à sourcer] ; l'IRM (résonance, autre physique).

**Liens.** E3 ; M7 (résonance mécanique : même vocabulaire, excitateur et résonateur) ; E5 (circuit
d'accord) ; maths SM : trigonométrie, complexes [À VÉRIFIER : la représentation de Fresnel ou les
complexes ne sont pas au cadre].

**À trancher.** Créer la leçon (prioritaire pour SM, 4,25 points en 2026) ; et décider si la
formule générale de Z est enseignée comme exigible ou comme outil.

---

### E5. Ondes électromagnétiques ; modulation et démodulation d'amplitude   (`ondes-em-modulation`)

**Filières et poids.** `pc-pc 1.3.4.1` à `1.3.4.19` (chapitre « 4- Applications : ») ; `pc-sm
1.3.4.1-19` (« 4- Applications : Production d'ondes électromagnétiques et communication ») ; **absent
du cadre SVT**. Sous-domaine électricité. Fréquence : 2017 N, 2021 N (définir la modulation,
qualité), 2023 N (spectre de fréquences), 2025 N (sélection et démodulation, C₁ d'accord)
[`docs/sujets/pc/ondes-em-modulation.md`] ; 2026 : PC N (oscillogrammes de u_AM, u_QM, u_TM ; C₀ pour
L₀ = 2 mH ; taux m), PC R (étages de réception, fréquence sélectionnée, choix du condensateur de
détection), SM R (modulation et réception) [OFF-sujet] ; 01 : 6/10. C'est presque toujours la
**seconde partie** d'un exercice d'électricité.

**Ce que le bac demande.** La chaîne de transmission ; la lumière, onde électromagnétique ;
l'antenne émettrice et réceptrice (même fréquence) ; transport d'énergie sans matière ; **la
modulation d'amplitude** (amplitude fonction affine de la tension modulante) ; les **conditions pour
éviter la surmodulation** ; les étages du montage (multiplieur, détecteur d'enveloppe, filtre) ; le
**spectre de fréquences** (F − f, F, F + f) ; la démodulation et ses conditions de qualité ; le
**circuit bouchon LC** (sélection) ; le récepteur AM. Formes : u_s(t) = A[1 + m·cos(2πft)]·cos(2πFt) ;
lire F et f sur un oscillogramme ; m = (U_max − U_min)/(U_max + U_min) ; choisir C pour que
1/F ≪ RC < 1/f [À VÉRIFIER : condition sous la forme des sujets] ; C₀ = 1/(4π²N²L₀).

**L'idée-clé.** Un son (quelques kHz) ne se rayonne pas : il faudrait des antennes immenses. On le
**confie** à une onde de haute fréquence (la porteuse) dont on fait varier l'**amplitude** au
rythme du son ; à l'arrivée, un circuit LC choisit la station, une diode et un condensateur
« suivent l'enveloppe » et rendent le son.
*Image-clé :* l'oscillogramme modulé, avec son **enveloppe** dessinée par-dessus, qui a exactement
la forme du signal.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| E3 (N₀ = 1/(2π√(LC))) | 2ème Bac | « L = 2 mH, F = 100 kHz : C pour l'accord ? » | E3 |
| E1 (constante de temps RC) | 2ème Bac | « RC = 0,1 ms : comparer à 1/F et à 1/f » | E1 |
| λ = c/f (O3), puissances de 10 | 2ème Bac | « F = 1 MHz : λ ? » | O2, O3 |
| Sinusoïdes, fréquence, période | tronc commun / collège | « T = 0,4 ms : f ? » | atelier oscillogramme |
| Produit de deux cosinus (formule de linéarisation) | 1ère Bac maths [À VÉRIFIER] | « cos a·cos b = ? » | pour le spectre ; seulement en SM ? |

**Conceptions erronées et pièges** (`content/pc/ondes-em-modulation/items.yaml`).
- *« L'information est dans la fréquence »* (confusion avec la FM) ; *porteuse et modulant inversés*.
- *« m > 1, c'est mieux »* ou *« la surmodulation se répare »*. **Pari** de la scène « banc de
  modulation » (étape 3) : en baissant U₀, le tracé va-t-il garder son enveloppe ?
- *Rôle du détecteur de crête* mal compris ; *le circuit d'accord* attribué à un autre étage.
- *Lire un oscillogramme sans la calibration* ; *raies du spectre mal placées*.
- Piège de copie : confondre la fréquence de l'oscillogramme modulé (F) et celle de l'enveloppe (f).

**Représentations.**
- **Figure-clé : la scène « banc de modulation »** (`content/pc/ondes-em-modulation/media/banc-de-modulation.json`,
  5 étapes, 5 paris : lire l'écran, m, U₀ qu'on baisse, tension aux bornes du condensateur,
  pourquoi la démodulation échoue).
- **Manipulable « détecteur d'enveloppe »** : un curseur RC ; trop petit, la tension suit la
  porteuse ; trop grand, elle rate l'enveloppe ; **pari** sur la bonne valeur (PC R 2026).
- **Spectre animé** : trois raies F − f, F, F + f qui bougent quand on change f [À VÉRIFIER : surtout
  pour SM].
- **Expérience réelle** : un récepteur AM simple (TP 4 de l'annexe : « Réaliser un récepteur radio
  AM simple ») ; écouter une station AM marocaine [À VÉRIFIER : stations encore en ondes moyennes].

**Histoire et personnages.**
① **Hertz, 1886-1887** : des étincelles d'une bobine en font jaillir dans une autre, à distance ;
ce sont les ondes de Maxwell. Interrogé sur les applications : « It's of no use whatsoever… » [V]
([Heinrich Hertz](https://en.wikipedia.org/wiki/Heinrich_Hertz)).
② **Marconi, 1901**, liaison transatlantique ; Nobel 1909 [V].
③ [L] La « première émission musicale » de Fessenden (Noël 1906) est une affirmation tardive mal
documentée : la raconter comme légende ou pas du tout (02 §5.4).

**Pour aller plus loin.** Le téléphone portable (antenne émettrice et réceptrice, cité par le cadre,
`pc-pc 1.3.4.8`) ; AM contre FM [À VÉRIFIER : FM hors cadre] ; le Wi-Fi.

**Liens.** E1, E3 ; O3 (la lumière est une onde EM) ; O1 (une onde mécanique a besoin d'un milieu,
pas l'onde EM) ; maths : trigonométrie.

**À trancher.** En filière SVT, la leçon actuelle n'a pas lieu d'être proposée comme exigible :
masquer, ou garder en « culture » ?

### Sous-domaine « Mécanique »

---

### M1. Lois de Newton : cinématique, base de Frenet, deuxième et troisième lois   (`lois-de-newton`)

**Filières et poids.** `pc-pc 1.4.1.1` à `1.4.1.10` ; SM identique ; SVT `pc-svt 1.4.1.1-10` (le
premier tiret précise « dans un repère cartésien »). Sous-domaine mécanique : **27 %** (PC, SM),
26 % (SVT) — le plus lourd du cadre. M1 est l'outil de **tous** les exercices de mécanique ; comme
exercice propre : 2019 N, exercice IV partie I (mobile sur A'B', force motrice, équation horaire)
[`docs/sujets/pc/lois-de-newton.md`] ; SVT R 2026 (solide sur une piste horizontale avec frottement,
a_G = (F − f)/m, phase de freinage) [OFF-sujet].

**Ce que le bac demande.** Vecteurs vitesse et accélération ; unité ; coordonnées de a⃗ en repère
cartésien **et dans la base de Frenet** (« Freinet » [sic] dans les trois cadres) ; le signe de
a⃗·v⃗ (accéléré / retardé) ; référentiel galiléen ; **ΣF⃗ext = m·a⃗_G** et son domaine de validité ;
rôle de la masse (inertie) ; appliquer la 2ᵉ loi pour trouver v⃗_G, a⃗_G, une force ; la 3ᵉ loi ;
les équations aux dimensions. Formes : « En appliquant la deuxième loi de Newton, montrer que
l'expression de l'accélération s'écrit … » ; exploiter v_G = f(t) (pente = a) ; en déduire une
force (frottement, force motrice) ; nature du mouvement.

**L'idée-clé.** Les forces ne font pas le mouvement, elles le **changent** : la somme des forces
extérieures est égale à la masse fois l'accélération, et l'accélération peut être tangentielle
(la vitesse change de valeur) ou normale (elle change de direction : a_N = v²/ρ).
*Image-clé :* sur une trajectoire courbe, les deux flèches a_T (le long de la trajectoire) et a_N
(vers le centre de courbure) — c'est la scène du tremplin.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Forces, représentation vectorielle, poids P = m·g | collège / tronc commun (« exemples d'actions mécaniques ») [SEC AlloSchool] | « Une pomme de 200 g : son poids ? » | rappel |
| Principe d'inertie | tronc commun | « Un palet glisse sans frottement : faut-il une force pour qu'il continue ? » | TC, « principe d'inertie » |
| Équilibre sous 2 ou 3 forces, projections | tronc commun | « Projeter P⃗ sur un axe incliné de α » | atelier projection |
| Vecteurs, coordonnées, produit scalaire | tronc commun / 1ère Bac maths | « a⃗·v⃗ < 0 : que dire ? » | rappel |
| Dérivée (vitesse = dérivée de la position) | 1ère Bac maths | « x(t) = 2t² + 3t : v(t) ? » | `content/maths/derivabilite-etude-fonctions/lesson.md` |
| Travail, énergie cinétique | 1ère Bac PC | « Théorème de l'énergie cinétique ? » | M8 |

**Conceptions erronées et pièges** (`content/pc/lois-de-newton/items.yaml`, 21 entrées).
- *« Le mouvement a besoin d'une force qui l'entretient »* (Aristote) ; *« l'élan s'épuise »*.
  **Pari** (accroche de la leçon, « le palet qui glisse tout seul ») : sur une glace parfaite, le
  palet ralentit-il ?
- *« La force est liée à la vitesse »* : elle est liée à la **variation** de vitesse.
- *« Une accélération est un nombre »* : en virage à vitesse constante, a ≠ 0. **Pari** de la scène
  « tremplin » (étape 1) : à l'entrée du tremplin, à vitesse constante, l'accélération est-elle
  nulle ? Non : a_N = v²/r.
- *Action-réaction confondue avec deux forces qui s'équilibrent* (elles s'appliquent à deux corps
  différents).
- *Projection du poids sur un plan incliné* (sin / cos inversés) ; *frottement oublié ou de mauvais
  signe* ; *réaction normale = poids toujours*.
- Piège de copie : le référentiel non nommé ; le système non défini ; le schéma sans les forces.

**Représentations.**
- **Figure-clé : la scène « tremplin circulaire »** (`content/pc/lois-de-newton/media/tremplin-circulaire.json`,
  5 étapes, 5 paris), construite sur la piste du sujet national 2019 : a_N à vitesse constante,
  a_N quand v double (×4), quand r est divisé par deux (×2), a⃗ quand on accélère (somme vectorielle
  de a_T et a_N), nature du mouvement.
- **Manipulable « deuxième loi »** [À VÉRIFIER] : un mobile sur coussin d'air, une force réglable et
  une masse réglable ; v(t) se trace ; **pari** : à force double, la pente double-t-elle ? à masse
  double ? (le TP 1 de l'annexe : « Vérifier expérimentalement la deuxième loi de Newton »).
- **Expérience réelle** : table à coussin d'air et chronophotographie (relevé point par point,
  vecteurs vitesse construits par différence) [À VÉRIFIER : vidéo].
- **Analogie** : la masse comme « paresse » du corps à changer de vitesse. Limite : le poids aussi
  dépend de la masse — d'où la chute identique de M2.

**Histoire et personnages.**
① **Halley, août 1684**, vient demander à Newton quelle orbite produit une attraction en 1/r² ;
Newton l'a déjà résolu sans le publier ; Halley finance en partie les *Principia* (1687) [V]
([Edmond Halley](https://en.wikipedia.org/wiki/Edmond_Halley)).
② Le moment où ça a coincé : l'idée d'Aristote (il faut une force pour entretenir le mouvement),
celle que l'élève apporte, a tenu deux mille ans [À VÉRIFIER : formulation à sourcer].
③ Ce que ça a changé : une seule loi pour la pomme et la Lune (M5).

**Pour aller plus loin.** La ceinture de sécurité (inertie) ; les virages relevés des circuits et
des routes (a_N) ; pourquoi on se sent « plaqué » dans un virage (référentiel non galiléen, hors
cadre).

**Liens.** M2 à M8 (toutes ses applications) ; maths : vecteurs, dérivée ; 1ère Bac : travail et
énergie ; E3 et M7 (même structure d'équation).

---

### M2. Chute verticale : chute libre, chute avec frottement fluide, méthode d'Euler   (`chute-mouvements-plans`, R1, R7, R8)

**Filières et poids.** `pc-pc 1.4.2.1` à `1.4.2.8` ; SM identique ; **SVT : chute libre seulement**
(`pc-svt 1.4.2.1-4` ; ni frottement fluide, ni Euler). Sous-domaine mécanique. Fréquence : le
**sujet de mécanique le plus fréquent** du corpus — 2018 N (bille dans un liquide), 2020 N (bille,
vitesse limite), 2021 N (parachutiste), 2022 N (bille dans l'huile, masse volumique), 2023 N (balle,
libre puis avec frottement), 2024 N (bille dans un liquide, μ et ρ_L) [`docs/sujets/pc/chute-mouvements-plans.md`] ;
2026 : PC N (**saut sans parachute**, dv/dt en fonction de v², Euler), PC R (balle de tennis de table,
f = μv², v_lim = 7,00 m/s, Euler), SVT N (boule et plume dans une chambre à vide de la NASA)
[OFF-sujet] ; 01 : 3/10 (frottement) + 2/10 (chute libre).

**Ce que le bac demande.** Les **deux modèles** de frottement fluide, F = −k·v et F = −k·v² ;
exploiter v_G = f(t) : **vitesse limite**, **temps caractéristique τ**, régime initial et régime
permanent ; établir l'équation différentielle (avec frottement, avec la poussée d'Archimède si
l'énoncé la garde) ; **la méthode d'Euler** ; définir la chute libre ; établir et résoudre son
équation ; MRUV et ses équations horaires ; diagramme de vitesse. Formes : « Montrer que l'équation
différentielle s'écrit dv/dt + (μ/m)·v² = g » ; « Déduire l'expression de v_ℓ et vérifier que μ = … » ;
« Déterminer, en utilisant la méthode d'Euler, v(t₂) » (tableau à compléter, pas Δt donné) ;
« Dire si ce modèle explique la réalité » (NS 28F 2026 : le modèle de chute libre donne une vitesse
absurde, le frottement en v² retrouve 200 km/h).

**L'idée-clé.** Dans un fluide, le frottement grandit avec la vitesse jusqu'à **équilibrer** le
poids (moins la poussée) : l'accélération s'annule, la vitesse se stabilise à v_ℓ. Sans frottement,
tous les corps tombent avec la même accélération g, quelle que soit leur masse.
*Image-clé :* la courbe v(t) avec ses deux régimes, et au-dessus, à trois instants, les flèches de
force : le poids constant, le frottement qui grandit, la résultante qui fond jusqu'à zéro.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| M1 (2ᵉ loi, projection, axe orienté vers le bas) | 2ème Bac | « Axe vers le bas : signe de la projection du poids ? » | M1 |
| Poussée d'Archimède F_A = ρ_fluide·V·g | collège / tronc commun [À VÉRIFIER : niveau] | « Une bille de 2 cm³ dans l'eau : poussée ? » | rappel |
| MRUV (v = at + v₀, x = ½at² + v₀t + x₀) | tronc commun / 1ère Bac | « Chute libre de 5 m, temps ? » | R1 de la leçon |
| Pente d'une tangente = dérivée | 1ère Bac maths | « Pente de v(t) à t = 0 ? » | atelier graphe |
| y' = ay + b (modèle k·v) | 2ème Bac maths (`maths-sexp 1.2.23`) | « Limite de la solution de y' = −2y + 10 ? » | champ des pentes (scène de maths) |

**Conceptions erronées et pièges** (`content/pc/chute-mouvements-plans/items.yaml`).
- *« Le plus lourd tombe plus vite »* (en chute libre). **Pari** (SVT 2026 l'a mis en QCM) : la boule
  de 3 kg et la plume de 5 g, dans le vide, laquelle touche le sol la première ? (ensemble).
- *« À la vitesse limite, il n'y a plus de force »* (ou *« le frottement a disparu »*). **Pari** (R7 de
  la leçon) : à v_ℓ, la force de frottement est-elle nulle, égale au poids, ou plus grande ?
- *« Avec frottement, la masse ne joue pas »* : v_ℓ = √(mg/μ) dépend de m.
- *Euler* : *v_{i+1} = v_i + a_i* (oubli de Δt), *a_i reste égale à g*, *Euler donne la valeur
  exacte*.
- *La poussée d'Archimède oubliée là où elle agit* (bille dans l'huile) ou ajoutée dans l'air.
- Piège de copie : τ lu à 63 % de v_ℓ sur une courbe qui ne part pas de 0 ; v_ℓ en km/h dans une
  formule en m/s.

**Représentations.**
- **Figure-clé : « les trois flèches »** [À VÉRIFIER] (10 étapes) : la bille lâchée ; le poids ; à
  v = 0, pas de frottement, a = g ; un instant après, la flèche de frottement apparaît ; **pari** :
  l'accélération augmente-t-elle ou diminue-t-elle ? ; la courbe v(t) se construit ; l'égalité
  poids = frottement ; v_ℓ ; τ par la tangente.
- **Manipulables existants** de la leçon : `content/pc/chute-mouvements-plans/media/euler-taille-de-pas.interactive.json`
  (curseur Δt de 0,01 à 0,05 s, la courbe d'Euler se superpose à la courbe exacte) et
  `sandbox-chute-frottement.interactive.json` (curseur de masse, l'asymptote v_ℓ se déplace). À
  compléter [À VÉRIFIER] : un **pari** avant le curseur (« avec Δt deux fois plus petit, l'erreur
  est-elle deux fois plus petite ? ») et un tableau d'Euler que l'élève remplit lui-même, deux lignes,
  comme au bac.
- **Le champ des pentes** (`content/maths/equations-differentielles/media/champ-des-pentes.json`) :
  Euler, c'est suivre les petites flèches de ce champ. Pont maths-physique à utiliser tel quel.
- **Graphe linéarisé** dv/dt = g − (μ/m)·v² : une droite en fonction de v² ; l'ordonnée à l'origine
  donne g, la pente −μ/m, le point d'annulation v_ℓ² (NS 28F 2026).
- **Expérience réelle** : bille dans de l'huile ou du glycérol filmée (TP 2 de l'annexe : « chute
  verticale avec frottement ») ; un filtre à café qui tombe (atteint vite sa vitesse limite)
  [À VÉRIFIER].

**Histoire et personnages.**
① [L] → [V] La **tour de Pise** de Galilée est probablement une expérience de pensée (récit
tardif de Viviani) ; **Stevin et de Groot** ont vraiment lâché deux boules de plomb du clocher de
Delft et l'ont publié en **1586** [V]
([Leaning Tower experiment](https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment)).
② **Apollo 15, 2 août 1971** : David Scott lâche un marteau de 1,32 kg et une plume de faucon de
0,03 kg sur la Lune ; ils touchent le sol ensemble [V]
([NASA NSSDC](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html)). Le sujet
SVT 2026 refait l'expérience « dans une chambre vide » de la NASA [OFF-sujet].
③ **Euler** propose sa méthode dans *Institutionum calculi integralis* (1768-1770) [V]
([Euler method](https://en.wikipedia.org/wiki/Euler_method)) ; c'est encore ainsi que les
ordinateurs « calculent » un mouvement, pas à pas.

**Pour aller plus loin.** Le parachute et le saut de 2016 du sujet (une vitesse limite de
200 km/h) ; la sédimentation ; le viscosimètre à bille [À VÉRIFIER] ; la simulation numérique.

**Liens.** M1 ; E1, E2 (la même équation de premier ordre et la même exponentielle pour le modèle
k·v) ; M3 (chute libre en deux dimensions) ; maths : y' = ay + b, suites (Euler est une suite
récurrente) ; chimie : masse volumique (TC).

**À trancher.** En filière SVT, les parties R7-R8 de `chute-mouvements-plans` (frottement, Euler)
sont hors cadre : masquer pour ce profil ?

---

### M3. Mouvements plans : plan horizontal ou incliné, projectile   (`lois-de-newton` R7 ; `chute-mouvements-plans` R2-R5)

**Filières et poids.** `pc-pc 1.4.2.9` à `1.4.2.12` ; `pc-sm 1.4.2.9-12` ; `pc-svt 1.4.2.5-8`
(identique, avec « et les exploiter » en fin de 1.4.2.8). Sous-domaine mécanique. Fréquence : 2019 N
(moto : piste A'B' puis phase de saut, condition CP ≥ 30 m) [`docs/sujets/pc/chute-mouvements-plans.md`,
`docs/sujets/pc/lois-de-newton.md`] ; SM N 2026 (**ballon de basket**, condition de panier,
influence d'un adversaire) ; SVT R 2026 (solide sur une piste horizontale, frottement constant)
[OFF-sujet] ; 01 : 2/10 (projectile) + 2/10 (plan incliné).

**Ce que le bac demande.** Choisir le référentiel ; établir l'équation différentielle du mouvement
sur un plan horizontal ou incliné ; grandeurs cinématiques et dynamiques ; **exploiter la
trajectoire d'un projectile** (type de mouvement plan, vecteurs vitesse et accélération, conditions
initiales) ; **appliquer la 2ᵉ loi au projectile** : équations différentielles, équations horaires,
**équation de la trajectoire**, **portée et flèche**. Formes : « Montrer que les équations horaires
s'écrivent … » ; « Déterminer v₀ pour réussir le panier » ; « Vérifier que le ballon passe
au-dessus de l'adversaire » ; projection du poids sur un plan incliné de α ; force de frottement
déduite de a.

**L'idée-clé.** Un projectile, ce sont **deux mouvements indépendants** : uniforme à
l'horizontale (aucune force), uniformément accéléré à la verticale (le poids) ; on élimine le temps,
il reste une **parabole**.
*Image-clé :* la trajectoire parabolique avec, à intervalles égaux, ses deux « ombres » sur les
axes : régulière sur x, de plus en plus espacée (puis resserrée) sur y.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| M1, M2 (chute libre verticale) | 2ème Bac | « Équations horaires d'une chute libre sans vitesse initiale ? » | M2 |
| Cosinus, sinus d'un angle ; décomposer v⃗₀ | tronc commun | « v₀ = 10 m/s à 30° : v₀ₓ ? » | atelier projection |
| Éliminer une variable entre deux équations | collège / tronc commun | « x = 3t, y = t² : y en fonction de x ? » | rappel |
| Second degré (portée, temps de vol) | tronc commun maths | « Résoudre −5t² + 10t = 0 » | rappel |

**Conceptions erronées et pièges** (`content/pc/chute-mouvements-plans/items.yaml`).
- *« Au sommet, la vitesse est nulle »*. **Pari** : au sommet de la trajectoire, la vitesse du
  ballon est-elle nulle ? (non : v = v₀ cos α).
- *« La vitesse horizontale ralentit à la montée »* ; *« le poids agit aussi sur x »*.
- *« Le plus lourd va plus loin »* (sans frottement).
- *« La descente est plus rapide que la montée »* (symétrique, sans frottement).
- *Portée, flèche et longueur de trajectoire confondues* ; *l'angle optimal est le plus grand* ;
  *coefficient ou ½ faux dans l'équation de la trajectoire*.
- Piège de copie : l'origine du repère placée au sol alors que le lancer part d'une hauteur h ;
  sinus et cosinus permutés selon l'angle donné (avec l'horizontale ou la verticale).

**Représentations.**
- **Figure-clé : « les deux ombres »** [À VÉRIFIER] (12 étapes) : un tir ; l'ombre sur l'axe des x
  avance régulièrement ; **pari** : et l'ombre sur l'axe des y ? ; elle monte, ralentit, redescend ;
  les deux équations ; on élimine t ; la parabole se superpose aux points ; flèche (v_y = 0) ; portée
  (y = 0).
- **Manipulable « tir »** (absent comme scène) : curseurs v₀ et α ; trajectoire, flèche, portée
  affichées ; **pari** : 30° et 60° à même v₀, même portée ? (la leçon, R5, traite cette symétrie).
- **Chronophotographie réelle** d'un ballon (TP 3 de l'annexe : « Mettre en évidence les facteurs
  influençant la trajectoire d'un projectile ») ; relevé des points sur une vidéo de basket
  [À VÉRIFIER : droits].
- **Analogie** : le marin qui lâche une bille du haut du mât d'un bateau qui avance (Galilée) : elle
  tombe au pied du mât.

**Histoire et personnages.**
① **Galilée, *Discours concernant deux sciences nouvelles*, Leyde, 1638** : la trajectoire d'un
projectile est la combinaison d'un mouvement horizontal uniforme et d'un mouvement vertical
naturellement accéléré ; leur combinaison est une **parabole** [V]
([Two New Sciences](https://en.wikipedia.org/wiki/Two_New_Sciences)).
② Selon la même source, personne ne l'avait testé de façon concluante avant **Gassendi (1642)** [V].
③ Ce que ça a changé : la balistique, puis le « canon de Newton » qui tire si vite qu'il ne retombe
plus (M5).

**Pour aller plus loin.** Le basket et le football (angle et vitesse de tir) ; le saut en longueur ;
les jets d'eau d'une fontaine (chaque goutte est un projectile) [À VÉRIFIER : exemples marocains,
fontaines de Fès ou de Marrakech, si une photo libre existe].

**Liens.** M2 ; M4 (en SM, la particule dans un champ électrique suit exactement la même méthode,
avec qE⃗ à la place de mg⃗) ; M5 (le canon de Newton) ; maths : trinôme, parabole.

---

### M4. Particule chargée dans un champ uniforme : magnétique (PC, SM) et électrique (SM)   (`chute-mouvements-plans`, R6 ; champ électrique absent)

**Filières et poids.** Champ magnétique : `pc-pc 1.4.2.13-14`, `pc-sm 1.4.2.15-16`. **Champ
électrique : SM seulement**, `pc-sm 1.4.2.13-14` (« Connaitre et exploiter les relations F⃗ = qE⃗ et
E = U/d » ; équations différentielles et horaires, trajectoire, **déflexion électrostatique**), et
annexe 1 p. 23. **Rien en SVT.** Sous-domaine mécanique. Fréquence : rare dans le corpus de la
filière PC — un exercice « particule chargée dans un champ magnétique / électrique » en 2016 N est
signalé par [`docs/sujets/pc/atome-mecanique-newton.md`] (non transcrit) ; **aucun** des six sujets
2026 [OFF-sujet]. Les sujets SM 2019-2025 n'ont pas été dépouillés [NT].

**Ce que le bac demande.** Champ magnétique : la **force de Lorentz** (caractéristiques, règle du
sens), et la 2ᵉ loi pour une particule avec B⃗ ⊥ v⃗₀ : **nature du mouvement** (circulaire uniforme,
R = m·v₀/(|q|·B)) et **déflexion magnétique**. Champ électrique (SM) : F⃗ = qE⃗, E = U/d entre deux
plaques ; équations horaires (comme un projectile) ; trajectoire parabolique ; déflexion
électrostatique sur un écran.

**L'idée-clé.** La force magnétique est **toujours perpendiculaire** à la vitesse : elle ne fait
que tourner la vitesse, sans jamais changer sa valeur — d'où un cercle. La force électrique,
constante, fait comme le poids pour un projectile : une parabole.
*Image-clé :* deux couloirs côte à côte, où entre la même particule : dans le couloir magnétique,
un arc de cercle ; dans le couloir électrique, un arc de parabole.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Champ magnétique, force de Laplace, règle des trois doigts | 1ère Bac (« forces électromagnétiques ») [SEC AlloSchool] | « Sens de la force sur un fil parcouru par I dans B⃗ ? » | rappel 1ère Bac |
| **Champ électrostatique**, E = U/d, énergie potentielle d'une charge | **1ère Bac SM seulement** [SEC AlloSchool] | « U = 100 V entre plaques à 2 cm : E ? » | SM : rappel 1ère Bac ; PC et SVT : non requis |
| Produit vectoriel | 1ère Bac (SM) ; 2ème Bac maths SExp (`maths-sexp 2.3`) | « Sens de u⃗ ∧ v⃗ si u⃗ = i⃗, v⃗ = j⃗ ? » | `content/maths/geometrie-espace/media/produit-vectoriel.json` (scène 3D) |
| Mouvement circulaire uniforme, a_N = v²/R | 2ème Bac (M1) | « v = 10⁷ m/s, R = 2 cm : a ? » | M1 |
| M3 (projectile) | 2ème Bac | « Équation de la trajectoire d'un projectile ? » | M3 |

**Conceptions erronées et pièges** (`content/pc/chute-mouvements-plans/items.yaml`).
- *« La force de Lorentz accélère la particule »*. **Pari** de la scène 3D (étape 2) : pendant un
  tour, la norme de la vitesse de l'électron augmente-t-elle ? (non : la force ne travaille pas).
- *« Le signe de la charge ne compte pas »*. **Pari** (étape 5) : un positon dans un champ sortant,
  de quel côté s'infléchit-il ?
- *« Champ deux fois plus grand, cercle deux fois plus grand »*. **Pari** (étape 3) : le rayon est
  deux fois plus **petit**.
- *À la sortie du champ, la particule continue de tourner* (elle repart en ligne droite, étape 4).
- [SM] *« La particule dans E⃗ décrit un cercle aussi »* ; *E = U·d*.
- Piège de copie : v⃗ ∧ B⃗ au lieu de qv⃗ ∧ B⃗ pour un électron (q < 0, sens inversé).

**Représentations.**
- **Figure-clé : la scène 3D « particule dans un champ magnétique »** (`content/pc/chute-mouvements-plans/media/champ-magnetique.json`,
  scène `particule-champ-magnetique`, 5 étapes, 5 paris : sens d'infléchissement, norme de la vitesse,
  champ doublé, couloir de largeur ℓ et déflexion, positon). La 3D est justifiée : v⃗, B⃗ et F⃗ sont
  dans trois directions (ADR 0041).
- **[SM] Manipulable « couloir électrique »** (absent, prioritaire pour SM) : tension U entre les
  plaques, vitesse d'entrée, charge ; la parabole et le point d'impact sur l'écran ; **pari** : en
  doublant U, la déflexion double-t-elle ? Réutiliser la mécanique de M3 (même équations, qE à la
  place de mg).
- **Expérience réelle** : le tube de Thomson ou le faisceau d'électrons dévié par un aimant (vidéo)
  [À VÉRIFIER].

**Histoire et personnages.**
① **J. J. Thomson, 1897** : en comparant la déviation des rayons cathodiques par un champ
électrique et par un champ magnétique, il mesure le rapport masse / charge — la découverte de
l'électron ; Nobel 1906 [V] ([J. J. Thomson](https://en.wikipedia.org/wiki/J._J._Thomson)). C'est
exactement le programme SM : E et B, déflexion.
② **Aston, 1919** : le spectrographe de masse sépare les ions par leur rapport charge / masse
(champs électrique et magnétique) et révèle les isotopes ; Nobel 1922 [V] (voir N2).

**Pour aller plus loin.** Spectrométrie de masse (datation, analyse) ; cyclotrons et protonthérapie
[À VÉRIFIER] ; les anciens écrans à tube cathodique ; les aurores polaires (particules du vent
solaire guidées par le champ terrestre) [À VÉRIFIER : formulation sans hors programme].

**Liens.** M1 (mouvement circulaire, Frenet) ; M3 (même méthode en E) ; N2 (Aston) ; M5 (une autre
force centripète) ; maths : produit vectoriel.

**À trancher.** Créer la partie « champ électrique » pour SM (leçon dédiée ou acte de plus dans
`chute-mouvements-plans`) ?

---

### M5. Satellites et planètes : gravitation, lois de Kepler   (`chute-mouvements-plans`, R9-R10)

**Filières et poids.** `pc-pc 1.4.2.15` à `1.4.2.21` ; `pc-sm 1.4.2.17-23` (« **Retrouver** la
troisième loi de Kepler », au lieu d'« Etablir ») ; **rien en SVT**. Sous-domaine mécanique.
Fréquence : 2022 N (satellite sur deux orbites circulaires), 2025 N (satellite, masse de la Terre,
3ᵉ loi de Kepler) [`docs/sujets/pc/chute-mouvements-plans.md`, note de routage] ; aucun des six
sujets 2026 [OFF-sujet] ; 01 : 2/10.

**Ce que le bac demande.** Référentiels héliocentrique et géocentrique ; **les trois lois de
Kepler** (et leur application au cas circulaire) ; la loi de gravitation **sous forme vectorielle** ;
établir (retrouver) T²/r³ = 4π²/(G·M) ; la force gravitationnelle **centripète** ; la 2ᵉ loi pour
un satellite ou une planète : nature du mouvement (circulaire uniforme), v = √(GM/r), T = 2πr/v.
Formes : « Écrire l'expression vectorielle de la force » ; « Montrer que le mouvement est uniforme » ;
« Calculer la masse de la Terre » ; satellite géostationnaire (conditions, altitude) ; comparer deux
orbites.

**L'idée-clé.** Un satellite **tombe** sans cesse vers la Terre — mais il va si vite de côté qu'il
la manque toujours : la gravitation, toujours dirigée vers le centre, courbe sa trajectoire en
cercle. Plus il est haut, plus il est lent et plus son tour est long : T² ∝ r³.
*Image-clé :* le canon de Newton — des tirs de plus en plus rapides du haut d'une montagne,
jusqu'au tir qui fait le tour de la Terre.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Gravitation universelle F = G·m·M/r² | tronc commun (« gravitation universelle ») [SEC AlloSchool] | « Si r double, F est divisée par ? » | TC |
| M1 (Frenet, a_N = v²/r) | 2ème Bac | « MCU : l'accélération est-elle nulle ? » | M1 |
| r = R_T + h | collège | « Satellite à 645 km : r ? » | — |
| Puissances, racine cubique, calculatrice | collège / tronc commun | « (4,2·10⁷)³ = ? » | atelier calculatrice |

**Conceptions erronées et pièges** (`content/pc/chute-mouvements-plans/items.yaml`).
- *« En orbite, il n'y a pas de gravité »* (les astronautes flottent). **Pari** : à 400 km
  d'altitude, la pesanteur vaut-elle 0, 10 % ou ≈ 90 % de celle du sol ? [À VÉRIFIER : valeur à
  calculer avec les élèves].
- *« Il faut un moteur pour rester en orbite »* ; *« un satellite plus lourd va plus vite »*.
- *T²/r³ mal mémorisée* ; *appliquée à des données brutes* (h au lieu de r, km au lieu de m).
- *« Le géostationnaire est immobile dans l'espace »* ; *« n'importe quelle altitude convient »*.
  **Pari** de la scène 3D (étape 1) : vu du sol, ce satellite de période 24 h va-t-il rester fixe ?
  (dépend du plan et du sens : la scène fait varier l'inclinaison et le sens).
- Piège de copie : la période de rotation de la Terre prise à 24 h exactement (jour sidéral)
  [À VÉRIFIER : convention des sujets].

**Représentations.**
- **Figure-clé : la scène 3D « orbite géostationnaire »** (`content/pc/chute-mouvements-plans/media/orbites-gravite.json`,
  5 étapes, 5 paris : période de 24 h vue du sol, orbite inclinée de 30°, sens rétrograde, vitesse
  dans le référentiel géocentrique, rapport invariant T²/r³). C'est la première scène 3D de
  l'application (ADR 0041) ; son paramètre d'affichage a été choisi pour ne pas fabriquer la
  conception « douze rayons géostationnaires ».
- **Animation : le canon de Newton** [À VÉRIFIER] : vitesse du tir en curseur ; la trajectoire passe
  de la parabole (M3) à l'orbite.
- **Manipulable « Kepler »** : les planètes du système solaire placées sur un graphe T² = f(r³) : une
  droite ; **pari** : où tombe Mars ? (données à sourcer) [À VÉRIFIER].
- **Kepler et les aires** [À VÉRIFIER : la 2ᵉ loi est au cadre (« Connaître les trois lois ») mais
  appliquée au cas circulaire] : une orbite elliptique, des secteurs balayés en temps égaux colorés.

**Histoire et personnages.**
① **Kepler, *Astronomia nova*, 1609** : l'orbite de Mars est une ellipse, tirée des données de
Tycho Brahe [V] ([Kepler's laws](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion)).
② **Halley, 1684, et Newton** : quelle orbite pour une attraction en 1/r² ? (M1) ; le **canon de
Newton** vient de *De mundi systemate*, publié en 1728 [V]
([Newton's cannonball](https://en.wikipedia.org/wiki/Newton%27s_cannonball)).
③ **Arthur C. Clarke, *Wireless World*, octobre 1945** : des satellites géostationnaires pour les
télécommunications ; l'orbite porte parfois son nom [V]
([Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke)).
**Maroc** : **Mohammed VI-A**, satellite d'observation lancé le 8 novembre 2017 par Vega depuis
Kourou, sur une orbite **héliosynchrone basse** (≈ 645 km, inclinaison 97,9°) [V]
([Mohammed VI-A](https://en.wikipedia.org/wiki/Mohammed_VI-A)). Question d'élève (02 §5.2) :
pourquoi un satellite qui photographie finement n'est-il pas géostationnaire ? Par la 3ᵉ loi de
Kepler, sa période est d'environ 1 h 37 (calcul de l'auteur, r ≈ 7 017 km).

**Pour aller plus loin.** GPS, télévision par satellite, météo ; l'apesanteur dans la Station
spatiale (chute libre permanente) ; les exoplanètes (Kepler sert encore à peser les étoiles).

**Liens.** M1, M3 ; M4 (une autre force centripète) ; M9 (le modèle planétaire de l'atome reprend
exactement ce calcul avec Coulomb) ; maths : puissances, racines.

---

### M6. Rotation d'un solide autour d'un axe fixe   (`rotation-axe-fixe`)

**Filières et poids.** `pc-pc 1.4.3.1` à `1.4.3.7` (chapitre « 3- Relation quantitative entre la
somme des moments ΣM_Δ et l'accélération angulaire θ̈ ») ; SM identique ; **rien en SVT**.
Sous-domaine mécanique. Fréquence : 2011 R (système translation + rotation), 2024 N (cylindre,
système mécanique) [`docs/sujets/pc/rotation-axe-fixe.md`] ; SM R 2026 (ressort, poulie de moment
d'inertie J_Δ et solide suspendu : z̈ + K·R²/(J_Δ + m·R²)·z = 0) [OFF-sujet]. Rarement seule : elle
sert surtout aux **systèmes composés** (M7, `pc-pc 1.4.4.31`).

**Ce que le bac demande.** Abscisse angulaire ; accélération angulaire et unité ; a_T et a_N en
fonction des grandeurs angulaires (a_T = R·θ̈, a_N = R·θ̇²) ; **ΣM_Δ = J_Δ·θ̈** pour établir et
résoudre l'équation du mouvement ; unité du moment d'inertie ; rotation uniformément variée ;
**système de deux solides** (l'un en translation, l'autre en rotation, reliés par un fil) : 2ᵉ loi
d'un côté, relation fondamentale de l'autre, tension du fil commune, v = R·θ̇.

**L'idée-clé.** Pour faire tourner, ce n'est pas la force qui compte mais son **moment** (force ×
distance à l'axe) ; et ce qui résiste à la mise en rotation, ce n'est pas la masse mais **où elle
est placée** : J_Δ.
*Image-clé :* deux manèges de même masse, l'un chargé au centre, l'autre au bord : poussés pareil,
ils ne démarrent pas pareil.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Moment d'une force, équilibre d'un solide en rotation | tronc commun [SEC AlloSchool] | « Moment d'une force de 10 N à 0,5 m de l'axe, perpendiculaire au bras ? » | TC |
| Rotation : abscisse angulaire, vitesse angulaire, v = R·ω | 1ère Bac (chapitre 1) [SEC] | « ω = 2 rad/s, R = 0,3 m : v ? » | 1ère Bac |
| Énergie cinétique de rotation ½J_Δω² | 1ère Bac | « J = 0,02 kg·m², ω = 10 rad/s : E_c ? » | M8 |
| M1 (2ᵉ loi), tension d'un fil | 2ème Bac | « Le fil tire-t-il sur la poulie et sur le solide avec la même force ? » | M1 |

**Conceptions erronées et pièges** (`content/pc/rotation-axe-fixe/items.yaml`).
- *« C'est la masse totale qui résiste »*. **Pari** de la scène 3D « manège » (dernière étape) : pour
  démarrer le plus vite, où asseoir les enfants et où pousser ?
- *« Seule l'intensité de la force compte »* ; *« une force loin de l'axe a forcément un moment »*
  (sa direction peut passer par l'axe). **Pari** (étapes 1-2) : le moment d'un poids vertical par
  rapport à un axe vertical vaut… zéro.
- *ω et v confondues* ; *θ, ω et θ̈ interchangeables sur un graphe*.
- *La poulie traitée comme un simple renvoi* (elle a une inertie, les deux tensions diffèrent) —
  l'erreur qui coûte dans les systèmes composés.
- *J d'un système composite non additif* ; *½ et ω² oubliés dans E_c*.

**Représentations.**
- **Figure-clé : la scène 3D « manège »** (`content/pc/rotation-axe-fixe/media/manege-axe-fixe.json`,
  scène `manege-rotation`, 5 étapes, 5 paris : moments de deux poids, vitesse du bord et du siège,
  vitesse angulaire au bout de 4 s, meilleur réglage).
- **Manipulable « poulie et masse »** (absent, utile pour SM R 2026 et 2024 N) : une poulie de J_Δ
  réglable, un solide suspendu ; **pari** : avec une poulie plus lourde, le solide descend-il plus
  lentement ? L'accélération a = m·g/(m + J_Δ/R²) apparaît [À VÉRIFIER : expression à faire établir].
- **Expérience réelle** : le TP 4 de l'annexe (« Vérifier expérimentalement la relation fondamentale
  de la dynamique dans le cas de la rotation ») ; un tabouret tournant et des haltères (bras
  écartés, bras serrés) [À VÉRIFIER : hors cadre, conservation du moment cinétique].

**Histoire et personnages.** Pas d'accroche vérifiée dans la banque (02 §5.2) [NT]. Piste à
sourcer : Euler et la dynamique du solide [À VÉRIFIER].

**Pour aller plus loin.** Volants d'inertie, toupies, patineurs [À VÉRIFIER] ; la roue de vélo ; les
éoliennes (moment, couple).

**Liens.** M1 ; M7 (pendule pesant et de torsion, oscillateur composé) ; M8 (½J_Δω²) ; tronc
commun : moment d'une force.

---

### M7. Systèmes oscillants : pendule élastique, pesant, de torsion ; amortissement ; résonance   (`systemes-oscillants`)

**Filières et poids.** `pc-pc 1.4.4.1` à `1.4.4.31` (31 tirets, le plus long chapitre du cadre) ;
SM identique ; **SVT : pendule élastique horizontal seulement**, avec amortissement et résonance
(`pc-svt 1.4.3.1-14`). Sous-domaine mécanique. Fréquence : 2018 N (oscillateur solide-ressort,
travail de la force de rappel), 2023 N (balançoire, pendule pesant), 2025 N (oscillateur)
[`docs/sujets/pc/systemes-oscillants.md`] ; **dans les six sujets 2026** : PC N (pendule élastique
horizontal, énergies), PC R (E_pe en fonction de x², période, vitesse, travail), SM N (ressort
comprimé qui lance un solide), SM R (ressort + poulie), SVT N (boule-ressort, ẋ(t)), SVT R
(x_G(t), T₀ et X_m) [OFF-sujet] ; 01 : 5-6/10.

**Ce que le bac demande.** Mouvement oscillatoire, oscillations libres, amortissement (types
solide et fluide, régimes), pseudo-période voisine de la période propre ; **force de rappel**
F = −K·x ; exploiter x(t), v(t), a(t) ; **établir l'équation différentielle** (ressort horizontal,
incliné, vertical — SVT : horizontal) et vérifier la solution x(t) = X_m·cos(2πt/T₀ + φ) ;
grandeurs de l'équation horaire à partir des **conditions initiales** ; **T₀ = 2π√(m/K)** ; même
chose pour le **pendule de torsion** (couple de rappel −C·θ, T₀ = 2π√(J_Δ/C)) et le **pendule
pesant** (petites oscillations, T₀ = 2π√(J_Δ/(m·g·d))) ; pendule simple synchrone ; **résonance
mécanique** (excitateur, résonateur, influence de l'amortissement) ; **systèmes composés**
(translation + rotation). Formes : « Déterminer les valeurs de X_m, T₀ et φ » (sur une courbe) ;
« En déduire la raideur K » ; « Déterminer la nature du mouvement » ; phase à l'origine selon le
sens du lâcher.

**L'idée-clé.** Une force qui ramène toujours vers l'équilibre, **proportionnelle à l'écart**,
fait osciller le système avec une période qui **ne dépend pas de l'amplitude** (isochronisme) : elle
ne dépend que de l'inertie (m, J) et de la « raideur » du rappel (K, C, m·g·d).
*Image-clé :* la courbe x(t) sinusoïdale alignée sur le dessin du ressort à cinq instants (élongation
maximale, passage à l'équilibre…), avec les flèches de force et de vitesse.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Tension d'un ressort T = K·Δℓ | tronc commun (« exemples d'actions mécaniques ») [SEC AlloSchool] | « K = 20 N/m, allongement 5 cm : T ? » | TC |
| M1 (2ᵉ loi, projection) ; M6 (RFD de rotation) pour pesant et torsion | 2ème Bac | « RFD : ΣM = ? » | M1, M6 |
| Dérivées de cos, dérivée seconde | 2ème Bac maths | « x = 2cos(5t) : ẍ = ? » | maths |
| y'' + ω²y = 0 | 2ème Bac maths (`maths-sexp 1.2.24`), tard dans l'année [À VÉRIFIER] | « Solutions de y'' + 4y = 0 ? » | `content/maths/equations-differentielles/lesson.md` R4 |
| sin θ ≈ θ pour θ petit (radians) | 1ère Bac maths | « sin(0,1) ≈ ? » | atelier radians |
| Lire une phase à l'origine (cos φ, signe de la vitesse) | 1ère Bac maths | « x(0) = X_m/2, v(0) < 0 : φ ? » | piège « cos φ donne φ » |

**Conceptions erronées et pièges** (`content/pc/systemes-oscillants/items.yaml`).
- *Isochronisme nié* : la période dépendrait de l'amplitude (ou de la masse pour le pendule simple).
  **Pari** : en écartant le ressort deux fois plus, la période double-t-elle ? (non, T₀ ne change pas).
- *« Plus raide, donc plus lent »* (c'est plus rapide) ; *formule inversée* √(K/m).
- *« Un oscillateur sans frottement s'arrête »* ; *« le frottement entretient »*.
- *Amortissement confondu avec une dérive de la période* ; *ordre des régimes inversé* ; *un seul
  type de frottement* (solide : décroissance linéaire de l'amplitude ; fluide : exponentielle).
- *Excitateur et résonateur confondus* ; *rôle de l'amortissement inversé* (un fort amortissement
  **écrase** la résonance).
- *La poulie de l'oscillateur composé traitée comme un simple renvoi* (SM R 2026).
- Piège de copie : φ déduit de cos φ sans le signe de la vitesse initiale ; T₀ lu sur une seule
  oscillation ; la largeur crête à crête prise pour X_m.

**Représentations.**
- **Figure-clé : « le ressort et sa courbe »** [À VÉRIFIER] (12 étapes) : la masse au repos ; on
  l'écarte (x = X_m, force de rappel maximale) ; on lâche ; **pari** : où la vitesse sera-t-elle
  maximale ? ; passage à l'équilibre ; élongation opposée ; un tour complet = T₀ ; on double
  l'amplitude : **pari** sur la période ; on double la masse : T₀ × √2.
- **Manipulable (absent, prioritaire : le chapitre le plus fréquent n'a aucune scène)** : curseurs m,
  K, X_m, coefficient de frottement ; trois vues synchronisées : le ressort, x(t), et les barres
  d'énergie (E_c, E_pe, E_m) ; un bouton « frottement solide / fluide » pour voir les deux formes
  d'amortissement.
- **Le portrait de phase** (v en fonction de x : une ellipse ; une spirale amortie) [À VÉRIFIER :
  hors cadre, réservé au profil SM ou à « pour aller plus loin »].
- **Simulation de résonance** : un excitateur de période réglable, l'amplitude du résonateur en
  fonction de la période, pour deux amortissements (TP 8 de l'annexe).
- **Expérience réelle** : une masse au bout d'un élastique filmée ; un pendule de torsion (fil et
  barre) ; la balançoire de 2023 N.
- **Analogie** : RLC (E3) — même équation ; on enseigne l'un en appelant l'autre.

**Histoire et personnages.**
① **Galilée, 1581**, étudiant en médecine, chronomètre à son pouls un lustre de la cathédrale de
Pise : grande ou petite amplitude, même durée (récit de Viviani) [V]
([Galileo Galilei](https://en.wikipedia.org/wiki/Galileo_Galilei)).
② **Hooke publie sa loi en 1676 sous forme d'anagramme latine**, et la dévoile en 1678 : *ut tensio,
sic vis* (« telle extension, telle force ») [V] ([Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)).
③ **Huygens** brevète l'horloge à pendule en 1657 ; **Richer, à Cayenne (1671-1673)**, doit raccourcir
son pendule battant la seconde : Newton en déduit que la Terre est renflée à l'équateur ; **Foucault,
1851** : un pendule prouve que la Terre tourne [V] (02 §5.2).
**Résonance** : la passerelle du Millénaire (Londres, 2000) [V] ; **pas** le pont de Tacoma (1940),
légende de manuel (E4) [V].

**Pour aller plus loin.** Les amortisseurs des voitures ; les sismographes ; les gratte-ciel et les
séismes (amortisseurs à masse accordée) [À VÉRIFIER] ; la montre mécanique (balancier et spiral =
pendule de torsion).

**Liens.** **E3** (même équation : L ↔ m, 1/C ↔ K) ; M8 (énergie) ; M6 (pendules pesant et de
torsion) ; E4 (résonance électrique, SM) ; maths : y'' + ω²y = 0, trigonométrie.

**À trancher.** Voir E3 : une notion transversale « oscillateurs » ? Et pour la filière SVT, la leçon
doit se limiter au ressort horizontal (R3 et R4 de la leçon, pendules simple, pesant et de torsion,
sont hors cadre SVT).

---

### M8. Aspects énergétiques des oscillateurs   (`aspects-energetiques`)

**Filières et poids.** `pc-pc 1.4.5.1` à `1.4.5.14` (ressort, torsion, pendule pesant) ; SM
identique ; **SVT : ressort seulement** (`pc-svt 1.4.4.1-6`). Sous-domaine mécanique. Fréquence :
dans les exercices d'oscillateurs (2018 N, 2023 N, 2025 N) [`docs/sujets/pc/aspects-energetiques.md`,
renvois] ; 2026 : PC N (énergies E_c et E_pe sur un graphe, E_m = 5 mJ → K), PC R (E_pe en fonction
de x², E_m, vitesse en un point, **travail de la force de rappel**), SVT N (conservation qualitative,
calcul de E_m) [OFF-sujet].

**Ce que le bac demande.** Travail d'une force de rappel **variable** (W = ½K(x_i² − x_f²)) ;
**E_pe = ½K·x²** ; relation W = −ΔE_pe ; E_m = E_c + E_pe ; conservation et non-conservation ;
diagrammes d'énergie ; les mêmes gestes pour la torsion (½C·θ²) et pour le pendule pesant (E_pp
et E_c, petites oscillations). Formes : identifier E_c et E_pe sur un graphe temporel ; déduire K de
E_m et X_m ; vitesse en un point par la conservation ; travail de la force de rappel entre deux
positions (signe !).

**L'idée-clé.** Dans un oscillateur sans frottement, l'énergie **ne fait que changer de forme** :
toute en potentielle aux extrémités, toute en cinétique au passage à l'équilibre, sa somme
constante. Le frottement la fait fuir en chaleur, et l'amplitude baisse.
*Image-clé :* la cuvette parabolique E_pe(x) avec une ligne horizontale E_m : la bille « oscille »
entre les deux bords où la ligne coupe la cuvette.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Travail d'une force constante, W = F·d·cos α | 1ère Bac (« travail et puissance ») [SEC] | « W du poids sur une pente de 2 m, h = 1 m ? » | 1ère Bac |
| Théorème de l'énergie cinétique | 1ère Bac [SEC] | « Énoncé ? » | R2 de la leçon |
| E_pp = m·g·z, énergie mécanique | 1ère Bac [SEC] | « E_pp d'un livre de 1 kg à 2 m ? » | R3-R4 de la leçon |
| M7 (x(t), X_m, T₀) | 2ème Bac | « Où E_c est-elle maximale ? » | M7 |
| Aire sous une droite (travail d'une force variable) | collège / 1ère Bac | « Aire d'un triangle de base x et de hauteur Kx ? » | atelier graphe |

**Conceptions erronées et pièges** (`content/pc/aspects-energetiques/items.yaml`, 26 entrées).
- *« Le travail de la force de rappel vaut F × distance »* (sans le ½). **Pari** : l'aire sous la
  droite F = K·x est-elle un rectangle ou un triangle ?
- *« E_pe dépend de la masse ou de la vitesse »* ; *« l'énergie du ressort est E_pp = mgz »*.
- *« Le pendule ralentit aux extrémités, donc il perd de l'énergie »* ; *« E_c et E_pe sont toujours
  égales »*.
- *Énergie mécanique conservée même avec frottement* ; *le frottement rend de l'énergie*.
- *Degrés dans une formule en radians* ; *largeur totale prise pour X_m* ; *dernière graduation
  imprimée lue à la place de la vraie valeur* (pièges de lecture de diagramme relevés dans
  l'inventaire).
- Piège de copie : le signe du travail de la force de rappel quand le solide **revient** vers
  l'équilibre (positif).

**Représentations.**
- **Figure-clé : « la cuvette d'énergie »** [À VÉRIFIER] (10 étapes) : la parabole E_pe(x) ; la ligne
  E_m ; le solide à X_m (tout en E_pe) ; **pari** : en x = X_m/2, quelle fraction de l'énergie est
  cinétique ? (trois quarts) ; les barres E_c, E_pe animées ; le frottement fait descendre la ligne.
- **Manipulable** : partagé avec M7 (barres d'énergie synchronisées).
- **Graphe linéarisé** E_pe = f(x²) : une droite de pente K/2 (RS 28F 2026).
- **Expérience réelle** : capteur de position et tableur : E_c, E_pe et E_m calculées point par point
  [À VÉRIFIER].

**Histoire et personnages.** Pas d'accroche propre vérifiée dans la banque [NT] ; réutiliser Hooke
(M7) ; piste à sourcer : la querelle des « forces vives » [À VÉRIFIER].

**Pour aller plus loin.** Le saut à l'élastique ; le trampoline ; les montagnes russes (conversion
E_pp ↔ E_c, 1ère Bac).

**Liens.** M7 ; E3 (½Cu² ↔ ½Kx², ½Li² ↔ ½mv²) ; 1ère Bac : travail et énergie ; M6 (½J_Δω²).

---

### M9. Atome et mécanique de Newton   (`atome-mecanique-newton`)

**Filières et poids.** `pc-pc 1.4.6.1` à `1.4.6.5` (5 tirets) ; SM identique ; **rien en SVT**.
Sous-domaine mécanique. Fréquence : **aucun exercice** sur les 21 couvertures de sujets PC lues
(2008-2025 N, 3 rattrapages) [`docs/sujets/pc/atome-mecanique-newton.md`] ; aucun en 2026. Le
chapitre peut tomber en **question de cours** (QCM, vrai / faux) [PROPRE, hypothèse].

**Ce que le bac demande.** Les expressions de la force gravitationnelle et de la force
électrostatique ; l'énergie de l'atome est **quantifiée** ; la mécanique de Newton **ne permet pas**
de l'expliquer ; **ΔE = h·ν** ; expliquer le spectre de raies.

**L'idée-clé.** Le modèle « planétaire » (l'électron tourne autour du noyau comme un satellite,
retenu par la force de Coulomb) prévoit n'importe quelle orbite et un électron qui devrait finir par
tomber sur le noyau. L'expérience dit autre chose : l'atome n'a que **certains niveaux d'énergie**,
et il n'émet ou n'absorbe que la lumière de fréquence ν = ΔE/h — d'où des raies.
*Image-clé :* l'échelle des niveaux d'énergie de l'hydrogène, avec une flèche de descente et la raie
colorée qu'elle produit.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| M5 (orbite circulaire, force centripète) | 2ème Bac | « v = √(GM/r) : d'où vient-elle ? » | M5 |
| Loi de Coulomb, charge élémentaire | tronc commun / 1ère Bac SM [À VÉRIFIER] | « Force entre deux charges de 1 µC à 1 m ? » | rappel |
| O3 (λ = c/ν, spectre visible) | 2ème Bac | « λ = 656 nm : ν ? » | O3 |
| eV et J | 2ème Bac (N2) | « 1 eV = ? J » | N2 |

**Conceptions erronées et pièges** (`content/pc/atome-mecanique-newton/items.yaml`, 19 entrées).
- *« La gravitation compte à l'échelle de l'atome »*. **Pari** : la force de Coulomb est-elle 10,
  10⁶ ou 10³⁹ fois plus grande que la gravitation entre l'électron et le proton ? [À VÉRIFIER :
  ordre de grandeur à faire calculer].
- *« Le calcul newtonien de l'orbite suffit à expliquer la stabilité »* ; ou à l'inverse *« puisque
  la réalité le contredit, le calcul était faux »* (il est juste, c'est le modèle qui ne suffit pas).
- *« L'énergie de l'atome varie continûment »*.
- *ΔE = hν mal manipulée* (inversée, au carré).
- *« Le MCU a une accélération nulle »* (reprise de M1).

**Représentations.**
- **Figure-clé : « l'échelle d'énergie »** [À VÉRIFIER] (8 étapes) : le modèle planétaire ; **pari** :
  un électron qui tourne rayonne-t-il ? ; la spirale de chute (ce que prédit la physique classique) ;
  le spectre réel : des raies, pas un arc-en-ciel ; l'échelle des niveaux ; une transition ; ΔE = hν ;
  la couleur de la raie.
- **Manipulable « spectre de l'hydrogène »** : l'élève choisit une transition, la raie s'allume ;
  **pari** : une transition plus grande donne-t-elle une raie plus rouge ou plus violette ?
- **Expérience réelle** : un réseau ou un spectroscope de poche devant une lampe à vapeur (sodium,
  mercure) [À VÉRIFIER : vidéo] ; les lampadaires orange au sodium.

**Histoire et personnages.**
① **Balmer, 1885**, professeur dans une école de filles à Bâle, trouve à 60 ans une formule pour les
raies de l'hydrogène sans savoir pourquoi elle marche [V]
([Johann Jakob Balmer](https://en.wikipedia.org/wiki/Johann_Jakob_Balmer)).
② **Rutherford**, sur les alphas qui rebondissent sur l'or : « as if you fired a 15-inch shell at a
piece of tissue paper and it came back and hit you » [V]
([Ernest Rutherford](https://en.wikipedia.org/wiki/Ernest_Rutherford)).
③ **Bohr, 1913** : des niveaux quantifiés expliquent la formule de Balmer [V]
([Bohr model](https://en.wikipedia.org/wiki/Bohr_model)).

**Pour aller plus loin.** Les enseignes au néon ; l'analyse spectrale des étoiles (de quoi est fait
le Soleil) ; les lasers.

**Liens.** M5 (même calcul, autre force) ; O3 (spectre, λ = c/ν) ; N2 (eV, MeV : niveaux d'énergie
du noyau, cités au programme, annexe 1 p. 22) ; chimie : couleur des solutions [À VÉRIFIER].

**À trancher.** Un chapitre sans exercice d'examen en 21 sessions : quelle part de temps lui donner
(une demi-leçon de culture plutôt qu'une leçon complète) ?

---

## 5. Hors cadre et présent dans l'application ; présent au cadre et absent

**Présent au cadre, absent de l'application :**

- **E4, RLC forcé (SM)** — 12 capacités, tombé en 2026 (4,25 pts avec la première partie).
- **M4, particule dans un champ électrique (SM)** — 2 capacités.
- **« Reconnaître l'intérêt d'un montage RC / RL »** (SVT, `pc-svt 1.3.1.15`, `1.3.2.13`).
- **Dangers et applications de la radioactivité** (`pc-pc 1.2.2.12-13`) : la leçon
  `noyaux-masse-energie` n'en parle pas (aucune occurrence de « danger » ni d'« application »).
- **Équations aux dimensions** dans la leçon `lois-de-newton` (`pc-pc 1.4.1.10`) : aucune
  occurrence.

**Enseigné à tort pour un profil** (le contenu est au cadre PC, pas au cadre SVT) : fission-fusion,
modulation, frottement fluide et Euler, Lorentz, satellites, rotation, pendules pesant et de
torsion, atome. L'application sert aujourd'hui **une seule** liste de physique aux trois filières
(01 §7.2) : le profil SVT doit en masquer une bonne moitié.

**Les scènes interactives** existantes en physique (9) : corde (O1), cuve à ondes (O2), banc de
diffraction (O3), courbe et noyaux (N1), banc de modulation (E5), tremplin (M1), particule dans B
(M4), orbite géostationnaire (M5), manège (M6) ; plus le champ des pentes de la leçon de maths, utile
en E1, E2, M2. **Deux manipulables simples** (un curseur sur une figure) en M2 : pas d'Euler, masse
et vitesse limite. **Sans rien de manipulable** : RC, RL, RLC, oscillateurs, énergie, projectile,
Kepler sur données, RLC forcé, champ électrique.

**Priorités proposées** [À VÉRIFIER] : (1) le **manipulable oscillateur** (ressort + énergie), qui
sert M7, M8 et, par analogie, E3 — six sujets 2026 sur six ; (2) le **manipulable RC / RL**
(curseurs R, C, L) ; (3) la leçon **RLC forcé** pour SM ; (4) le **profil SVT** (masquer ce qui est
hors cadre) ; (5) un **pari** et un tableau à remplir autour du curseur d'Euler existant.
