# `rc-charge` — Dipôle RC (charge / décharge d'un condensateur)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2019 — session normale — Exercice III
Source: https://www.alloschool.com/element/68300
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice : 4,5 points
- Images lues : `.../course-422/upload-54757/0004-big.jpg`, `.../0005-big.jpg`
- Pages du scan : 4 et 5 (sur 7)
- Portée : la **Partie I (charge)** est transcrite ici ; la **Partie II
  (oscillations LC)** du même exercice est transcrite sous `rlc-serie.md`.

**Charge et décharge d'un condensateur.**

Les condensateurs et les bobines sont des composants essentiels de nombreux
appareils électriques tels ceux utilisés pour l'émission et la réception des
ondes électromagnétiques.
Cet exercice se propose d'étudier la charge d'un condensateur et sa décharge dans
une bobine.

On réalise le montage électrique schématisé sur la figure 1, constitué des
éléments suivants :
- un générateur idéal de tension de force électromotrice $E = 10\ \text{V}$ ;
- un condensateur de capacité $C$ initialement déchargé ;
- un conducteur ohmique de résistance $R$ ;
- une bobine d'inductance $L$ et de résistance négligeable ;
- un interrupteur $K$ à double position.

*Figure 1 (schéma) :* un générateur $E$ (branche de gauche) en série avec un
conducteur ohmique $R$ (branche du bas). En haut, un interrupteur $K$ à double
position, de bornes **(1)** et **(2)**. Le condensateur $C$ (tension $u_c$ à ses
bornes) et la bobine $L$ sont montés à droite : la position (1) connecte
l'ensemble $E$–$R$ au condensateur (charge) ; la position (2) connecte le
condensateur à la bobine $L$ (oscillations).

### I — Étude de la charge du condensateur
On met l'interrupteur $K$ sur la position (1) à un instant choisi comme origine
des dates ($t=0$). Un système d'acquisition informatisé adéquat permet de tracer
la courbe d'évolution de la charge $q(t)$ du condensateur. La droite $(T)$
représente la tangente à la courbe à la date $t=0$ (figure 2).

1. (0,5) Établir l'équation différentielle vérifiée par $q(t)$ au cours de la
   charge du condensateur.
2. (0,5) Trouver, en fonction des paramètres du circuit, les expressions des
   constantes $A$ et $\alpha$ pour que la solution de cette équation
   différentielle s'écrive sous la forme : $q(t) = A\left(1 - e^{-\alpha t}\right)$.
3. Déterminer graphiquement :
   1. (0,25) la valeur de la charge $Q$ du condensateur quand le régime permanent
      est établi.
   2. (0,25) la valeur de la constante de temps $\tau$.
4. (0,25) Montrer que la capacité du condensateur est : $C = 10\ \mu\text{F}$.
5. (0,25) Trouver la valeur de la résistance $R$.

*Figure 2 (courbe) :* axe des ordonnées $q\ (\mu\text{C})$ gradué $25,\ 50,\ 75,\
100$ ; axe des abscisses $t\ (\text{ms})$ gradué $0,\ 1,\ 2,\ 3,\ 4$. La courbe
$q(t)$ part de $0$ et croît de façon exponentielle vers un palier (asymptote
horizontale) à $q = 100\ \mu\text{C}$ (régime permanent). La tangente $(T)$ à
l'origine, en pointillés, coupe l'asymptote $q=100\ \mu\text{C}$ au voisinage de
$t = 1\ \text{ms}$ *(lecture d'échelle à confirmer)*.

---

## 2018 — session normale — Exercice III (partie I-1)
Source: https://www.alloschool.com/element/57726
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-45118, page 5. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points (sous-partie
  I-1 : 1,75 point ; $0{,}5+0{,}75+0{,}5=1{,}75$, barème en marge)
- Images lues : `.../course-422/upload-45118/0004-big.jpg` (cadrage/montage),
  `.../0005-big.jpg`
- Pages du scan : 4 (fin) et 5 (sur 8)
- Portée : la **sous-partie I-1 (détermination de la capacité $C_2$ par un
  générateur de courant)** est transcrite ici. La sous-partie I-2 (réponse du
  dipôle RC à un échelon = décharge, ci-dessous) et la Partie II (RLC, sous
  `rlc-serie.md`) du même exercice sont déjà transcrites.

**Détermination expérimentale de la capacité d'un condensateur — 1. En
utilisant un générateur de courant.**

*(Cadrage de l'exercice III, p. 4 : « Un professeur a consacré, avec ses
élèves, une séance de travaux pratiques de physique pour : - Déterminer
expérimentalement la valeur de la capacité d'un condensateur par deux méthodes
différentes. - Étudier un circuit RLC série. »)*

Un premier groupe d'élèves d'une classe réalise, sous les directives du
professeur, le montage expérimental de la figure 1 constitué des éléments
suivants :
- un générateur idéal de courant qui alimente le circuit par un courant
  électrique d'intensité $I_0$ ;
- un conducteur ohmique de résistance $R$ ;
- deux condensateurs $(c_1)$ et $(c_2)$ montés en parallèle, respectivement de
  capacités $C_1 = 7{,}5\ \mu\text{F}$ et $C_2$ inconnue ;
- un interrupteur $K$.

À l'instant $t_0 = 0$, un élève ferme le circuit. À l'aide d'un système
d'acquisition informatisé, le groupe d'élèves obtient la courbe des variations
de la charge $q$ du condensateur équivalent à l'association des deux
condensateurs $(c_1)$ et $(c_2)$ en fonction de la tension $u_{AB}$
(figure 2).

1. (0,5) Quel est l'intérêt de monter des condensateurs en parallèle ?
2. (0,75) En exploitant la courbe de la figure 2, déterminer la valeur de la
   capacité $C_{eq}$ du condensateur équivalent aux deux condensateurs
   $(c_1)$ et $(c_2)$.
3. (0,5) En déduire la valeur de la capacité $C_2$.

*Figure 1 (schéma) :* générateur idéal de courant $I_0$ (symbole flèche dans
un cercle) en série avec un interrupteur $K$ et un conducteur ohmique $R$,
alimentant deux bornes $A$ (en haut) et $B$ (en bas) ; entre $A$ et $B$, les
deux condensateurs $(c_1)$ et $(c_2)$ sont montés en parallèle.

*Figure 2 (courbe) :* $q\ (\mu\text{C})$ en fonction de $u_{AB}\ (\text{V})$,
sur quadrillage ; axe des ordonnées gradué $10,\ 20$ ; axe des abscisses
gradué $1,\ 2$. Droite croissante passant par l'origine (proportionnalité
$q = C_{eq}\,u_{AB}$) *(pente exacte / valeur de $C_{eq}$ à confirmer par
lecture du quadrillage)*.

---

## 2018 — session normale — Exercice III (partie I-2)
Source: https://www.alloschool.com/element/57726
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points
- Images lues : `.../course-422/upload-45118/0005-big.jpg`
- Pages du scan : 5 (sur 8)
- Portée : sous-partie **I-2 (réponse du dipôle RC à un échelon = décharge)**
  extraite de l'exercice III « … + Étude d'un circuit RLC série ». La
  sous-partie I-1 (générateur de courant) et la partie II (RLC) sont
  transcrites — la partie II sous `rlc-serie.md`.

**Détermination expérimentale de la capacité d'un condensateur — 2. En étudiant
la réponse du dipôle RC à un échelon de tension.**

Un deuxième groupe d'élèves de la même classe réalise le montage représenté par
la figure 3 constitué par :
- un générateur idéal de tension de force électromotrice $E$ ;
- un conducteur ohmique de résistance $R = 1600\ \Omega$ ;
- le condensateur précédent de capacité $C_2$ ;
- un interrupteur $K$ à double position.

Après avoir chargé totalement le condensateur, un élève bascule l'interrupteur
$K$ sur la position (2) à l'instant $t_0 = 0$. À l'aide d'un système
d'acquisition informatisé, le groupe d'élèves obtient la courbe des variations de
la tension $u_{C_2}(t)$ aux bornes du condensateur (figure 4).

1. (0,5) Établir l'équation différentielle vérifiée par la tension $u_{C_2}(t)$
   au cours de la décharge du condensateur.
2. (0,5) La solution de cette équation différentielle est de la forme
   $u_{C_2}(t) = E\, e^{-t/\tau}$. Trouver l'expression de la constante de temps
   $\tau$ en fonction de $R$ et $C_2$.
3. (0,5) Déterminer de nouveau la valeur de la capacité $C_2$.

*Figure 3 (schéma) :* générateur $E$, interrupteur $K$ à double position de
bornes (1) et (2), condensateur $C_2$ (tension $u_{C_2}$, courant $i$) et
conducteur ohmique $R$ ; en position (2), le condensateur se décharge dans $R$.

*Figure 4 (courbe) :* $u_{C_2}\ (\text{V})$ en fonction de $t\ (\text{ms})$ ;
ordonnée maximale $9\ \text{V}$ à $t=0$ ; abscisses graduées $4,\ 8,\ 12$.
Décroissance exponentielle vers $0$. Tangente à l'origine en pointillés coupant
l'axe des abscisses vers $t = 4\ \text{ms}$ *(lecture d'échelle à confirmer)*.

> Contexte de l'exercice (rappel, transcrit p.4–5) : la capacité $C_2$ y est
> déterminée par **deux méthodes** ; en I-1, un générateur **de courant** $I_0$
> charge deux condensateurs $C_1 = 7,5\ \mu\text{F}$ et $C_2$ (inconnue) montés
> **en parallèle**, et l'on exploite la droite $q = f(u_{AB})$ (figure 2) pour
> obtenir la capacité équivalente $C_{eq}$ puis $C_2$.

---

## 2021 — session normale — Exercice IV (Partie I)
Source: https://www.alloschool.com/element/127287
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-84195, page(s) 5–6. **Vérification adverse indépendante
(second agent) effectuée le 2026-08-06 — entrée NON promue, une correction
appliquée.** `element/127287` re-fetché, `course-422/upload-84195` (8 pages)
re-dérivé de façon indépendante et **conforme** à la citation ; en-tête du
scan **confirmé** (NS 28F, Sciences Physiques BIOF option française, 3 h,
coef 7 ; couverture : « Exercice IV (4,75 points) — Réponse d'un dipôle RC à
un échelon de tension / Oscillations électriques non amorties dans un circuit
LC / Modulation d'amplitude d'un signal »). Diff caractère par caractère des
p. 5–6 (chapeau de l'exercice, liste des éléments du montage, $R = 10^{3}\
\Omega$, forme de l'équation différentielle avec ses signes, $C = 12\
\mu\text{F}$, libellés, numérotation, barème en marge) — **aucun écart**.
Barème de la partie : $0{,}5+0{,}5 = 1{,}0$ point ; **partition de l'exercice
vérifiée** : $1{,}0$ (I) $+\ 2{,}0$ (II) $+\ 1{,}75$ (III) $= 4{,}75$ =
couverture. **Figure 2 jugée élément par élément au zoom — fidèle** : la
droite part **exactement** de $(0\,;\,1000)$, passe **exactement** par
$(6\,;\,500)$ et coupe l'axe des abscisses **exactement** en $(12\,;\,0)$ ;
seules les graduations $0/500/1000$ et $0/6/12$ sont chiffrées. Physique
re-dérivée et **cohérente** : l'ordonnée à l'origine donne $E/(RC) = 1000$
V.s⁻¹ et l'abscisse à l'origine donne $E = 12$ V, d'où $RC = 1{,}2\times
10^{-2}$ s et, avec $R = 10^{3}\ \Omega$, $C = 1{,}2\times10^{-5}$ F $= 12\
\mu\text{F}$ — exactement la valeur à montrer en question 2 ; la pente
$(500-1000)/6 = -83{,}3 = -1/(RC)$ recoupe le même résultat.
**Seul écart relevé, corrigé par le vérificateur — figure 1 :** la description
plaçait l'étiquette « R » *au-dessus* du rectangle et « K » *en dessous* du
fil ; sur le scan c'est l'inverse (« R » **sous** le rectangle, « K »
**au-dessus** du fil). La topologie (boucle série E–R–D–K, flèches $i$ et
$u_C$) était, elle, correcte. Description réécrite d'après l'image ⇒ **une
re-lecture est requise avant promotion** (README §3). Observation non
bloquante : le titre gras « Exercice IV — Les circuits des appareils
électriques » n'est **pas** imprimé sur le scan (l'exercice n'y porte pas de
titre propre) ; il est dérivé de la première phrase du chapeau.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28F · Barème de l'exercice complet : 4,75 points · Barème de
  la Partie I transcrite ici : 1,0 point
- Images lues : `.../course-422/upload-84195/0005-big.jpg`, `.../0006-big.jpg`
- Pages du scan : 5 et 6 (sur 8)
- Portée : Exercice IV (« Réponse d'un dipôle RC à un échelon de tension /
  Oscillations électriques non amorties dans un circuit LC / Modulation
  d'amplitude d'un signal ») se compose de trois parties partageant le même
  condensateur $D$. **Partie I (réponse RC)** est transcrite ici. **Partie II
  (oscillations LC)** est transcrite sous `rlc-serie.md`. **Partie III
  (modulation d'amplitude)** est transcrite sous `ondes-em-modulation.md`.

**Exercice IV — Les circuits des appareils électriques.**

Les circuits des appareils électriques, utilisés dans plusieurs domaines de la
vie courante, sont constitués de condensateurs, de bobines, de conducteurs
ohmiques, de circuits intégrés … L'objectif de cet exercice est d'étudier :
- la réponse d'un dipôle RC à un échelon de tension ;
- les oscillations électriques non amorties dans un circuit LC ;
- la modulation d'amplitude d'un signal.

**I- Réponse d'un dipôle RC à un échelon de tension**

On réalise le montage, représenté sur le schéma de la figure 1, constitué des
éléments suivants :
- un générateur idéal de tension de force électromotrice $E$ ;
- un condensateur $D$ de capacité $C$ initialement déchargé ;
- un conducteur ohmique de résistance $R = 10^{3}\ \Omega$ ;
- un interrupteur $K$.

On ferme l'interrupteur à un instant choisi comme origine des dates $t = 0$.
Un système d'acquisition informatisé permet de tracer la courbe de la
figure 2, représentant les variations de $\dfrac{du_c}{dt}$ en fonction de
$u_c$ ; $u_c$ étant la tension à un instant $t$ aux bornes du condensateur et
$\dfrac{du_c}{dt}$ sa dérivée par rapport au temps.

1. (0,5) Montrer que l'équation différentielle vérifiée par la tension
   $u_c(t)$ s'écrit sous la forme : $\dfrac{du_c}{dt} = -\dfrac{1}{RC}u_c +
   \dfrac{E}{RC}$.
2. (0,5) En exploitant la courbe de la figure 2, montrer que la capacité du
   condensateur est : $C = 12\ \mu\text{F}$.

*Figure 1 (schéma) :* boucle série ; à gauche, un générateur idéal (symbole
cercle) avec une flèche de tension orientée vers le haut, étiquetée « E », à
sa gauche ; flèche de courant $i$ en haut à gauche, orientée vers la droite ;
branche haute = conducteur ohmique (rectangle, étiquette « R » **en dessous**
du rectangle) ; à droite, le condensateur (deux traits parallèles) avec
l'étiquette « D » à sa gauche et une flèche $u_C$ orientée vers le haut à sa
droite ; branche basse = interrupteur (deux plots et un levier ouvert),
étiquette « K » **au-dessus** du fil, refermant la boucle vers le générateur.

*Figure 2 (courbe) :* ordonnée $\dfrac{du_c}{dt}\ (\text{V.s}^{-1})$ graduée
$0$, $500$, $1000$ (traits horizontaux) ; abscisse $u_c\ (\text{V})$ graduée
$0$, $6$, $12$. Droite décroissante partant exactement du point $(0\,;\,
1000)$, passant exactement par $(6\,;\,500)$, et atteignant l'axe des
abscisses exactement en $(12\,;\,0)$.
