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
Statut: vérifié — 2026-08-06, **3ᵉ passe : re-lecture indépendante par un
troisième agent, schéma re-lu au zoom et droite re-régressée de zéro —
figures CONFORMES ⇒ entrée promue** (README §3). Historique : transcription
(passe 1), diff adverse (passe 2 : symbole du générateur de courant corrigé,
étiquettes $C_1$/$C_2$, drapeau de pente adjugé, « (page suivante) » rétabli).
Détail de la 3ᵉ passe en fin de bloc.
Transcription initiale : 2026-08-06, depuis scan
course-422/upload-45118, pages 4–5. **Vérification adverse indépendante
(second agent) effectuée le 2026-08-06 — entrée NON promue : écart de figure
trouvé et corrigé, drapeau de pente adjugé et levé.** `element/57726`
re-fetché, `course-422/upload-45118` (8 pages) re-dérivé de façon indépendante
et **conforme** ; en-tête du scan **confirmé** (NS28F, 2018 session normale,
Sciences Physiques BIOF option française, 3 h, coef 7 ; couverture p. 1 :
« Exercice III (5 points) : - Détermination expérimentale de la capacité d'un
condensateur - Etude d'un circuit RLC série »). Diff caractère par caractère
des p. 4–5 — **aucun écart de valeur** ($C_1 = 7{,}5\ \mu\text{F}$, $C_2$
inconnue, $I_0$, $R$, $K$, $t_0 = 0$, $u_{AB}$), libellés conformes.
Numérotation imprimée : **1.1, 1.2, 1.3** (sous-questions du bloc « 1. En
utilisant un générateur de courant »), restituée ici par la liste $1$–$3$ sous
le titre gras, conformément à l'usage du fichier. Barème re-additionné sur la
marge : $0{,}5+0{,}75+0{,}5 = 1{,}75$ point (l'exercice complet vaut $5$ points,
le solde $0{,}5+0{,}5+0{,}5$ pour I-2 et $1{,}75$ pour la partie II).
**Écart bloquant relevé — figure 1 :** la description disait « symbole flèche
dans un cercle » pour le générateur de courant. Au zoom ×3, le symbole est un
**cercle barré d'un trait horizontal**, la flèche $I_0$ étant tracée
**à l'extérieur, à gauche** du cercle ; par ailleurs les condensateurs portent
sur le schéma les étiquettes $C_1$ et $C_2$ (et non $(c_1)$/$(c_2)$, graphie
réservée au texte). Description réécrite d'après l'image ; la topologie
(boucle $I_0$–$R$–$K$ avec $C_1 \parallel C_2$ entre $A$ et $B$) était, elle,
correcte.
**Drapeau « pente exacte / $C_{eq}$ à confirmer » adjugé et levé :** régression
sur $215$ pixels de la droite ⇒ pente $= 10{,}01\ \mu\text{C.V}^{-1}$,
ordonnée à l'origine $-0{,}13\ \mu\text{C}$, résidu quadratique moyen
$0{,}31$ px ; le quadrillage mesuré vaut $1$ V $\times$ $10\ \mu\text{C}$ par
division sur $6\times6$ divisions, et la droite joint l'origine au coin
$(6\ \text{V}\,;\,60\ \mu\text{C})$. ⇒ **$C_{eq} = 10\ \mu\text{F}$** et donc
$C_2 = C_{eq} - C_1 = 10 - 7{,}5 = \mathbf{2{,}5\ \mu\text{F}}$.
**Recoupement physique exact avec la sous-partie I-2** (déjà vérifiée,
ci-dessous) : $\tau = R\,C_2 = 1600 \times 2{,}5\cdot10^{-6} = 4{,}0$ ms, soit
précisément l'abscisse à laquelle la tangente à l'origine de la figure 4 coupe
l'axe des temps — les deux méthodes du sujet donnent bien la même capacité.
Corrections appliquées ⇒ **une re-lecture est requise avant promotion**
(README §3). Observation non bloquante : le membre « (page suivante) » de la
phrase de montage, omis à la transcription, a été rétabli.

**PASSE 3 — re-lecture indépendante (troisième agent, 2026-08-06) : figures 1
et 2 CONFORMES, entrée PROMUE.** `element/57726` re-fetché, `upload-45118`
(8 pages) re-dérivé indépendamment ; `0004-big.jpg` et `0005-big.jpg`
re-téléchargés ($1240\times1752$).
- **Figure 1, zoom $\times 4$** (crop $x\in[220,600]$, $y\in[260,590]$ de la
  p. 5) : le générateur est bien un **cercle barré d'un unique trait
  horizontal en son milieu**, et la **flèche verticale montante étiquetée
  $I_0$ est tracée à l'extérieur, à gauche** du cercle (elle ne le touche
  pas) — la correction de la passe 2 est confirmée, la graphie « flèche dans
  un cercle » de la passe 1 était bien fausse. Les deux condensateurs portent
  sur le schéma les étiquettes **$C_1$** (à gauche de l'armature gauche) et
  **$C_2$** (à droite de l'armature droite), en **capitale**, sans
  parenthèses — alors que le corps de texte de la p. 4 écrit bien « (c₁) »
  et « (c₂) » en bas de casse : les deux graphies coexistent, comme transcrit.
  Topologie re-vérifiée trait par trait : $R$ (rectangle) sous le générateur,
  $K$ (levier ouvert, étiquette au-dessus) sur la branche du haut, nœuds $A$
  (point noir, étiquette au-dessus) et $B$ (point noir, étiquette au-dessous),
  $C_1 \parallel C_2$ entre $A$ et $B$, boucle refermée par le bas.
- **Figure 2, régression refaite de zéro** : traits principaux détectés à
  $x = 753{,}5/795{,}5/837{,}5/879{,}5/921{,}5/963{,}5/1005$ et
  $y = 287{,}5/328/368{,}5/409/449{,}5/490{,}5/530{,}5$ ⇒ **grille de
  $6\times6$ divisions**, $41{,}92$ px par division en abscisse, $40{,}50$ px
  en ordonnée ; seuls $1$ et $2$ sont chiffrés en abscisse, $10$ et $20$ en
  ordonnée (plus le $0$) ⇒ pas de **$1$ V $\times$ $10\ \mu$C**, cadre
  jusqu'à $6$ V $/\ 60\ \mu$C. Régression sur **$213$ pixels** du trait
  (traits de grille exclus) : pente pixel $-0{,}9670$, résidu quadratique
  moyen **$0{,}30$ px**, soit **pente $= 10{,}008\ \mu\text{C.V}^{-1}$**,
  ordonnée à l'origine **$-0{,}12\ \mu$C** ; la droite vaut $59{,}93\ \mu$C à
  $u_{AB} = 6$ V et passe par $(1\,;\,9{,}89)$, $(2\,;\,19{,}89)$,
  $(3\,;\,29{,}90)$, $(4\,;\,39{,}91)$, $(5\,;\,49{,}92)$ — donc bien
  **origine $\to$ coin supérieur droit $(6\ \text{V}\,;\,60\ \mu\text{C})$**,
  lecture gridline-exacte. $\Rightarrow C_{eq} = 10\ \mu$F et
  $C_2 = 2{,}5\ \mu$F, **indépendamment confirmés** (et $\tau = RC_2 = 4{,}0$
  ms recoupe la figure 4 de la sous-partie I-2).
- **« (page suivante) »** re-lu sur la p. 4 : le scan imprime bien
  « … le montage expérimental de la figure 1 (page suivante) constitué des
  éléments suivants: » — restitution conforme.
Vérifié par agent-relecteur-indépendant le 2026-08-06, diff OK (3 passes).

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
professeur, le montage expérimental de la figure 1 (page suivante) constitué
des éléments suivants :
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

*Figure 1 (schéma) :* boucle unique. Branche **de gauche**, de haut en bas : le
générateur idéal de courant, dessiné par un **cercle barré horizontalement en
son milieu**, avec une **flèche verticale montante tracée à l'extérieur, à sa
gauche**, étiquetée « $I_0$ » ; puis, sous le cercle, le conducteur ohmique
(rectangle vertical) étiqueté « R » à sa gauche. Branche **du haut** : depuis
le sommet du générateur, un fil part vers la droite, porte l'interrupteur $K$
(levier ouvert, étiquette « K » **au-dessus**) et rejoint le nœud **A** (point
noir, étiquette « A » au-dessus). Branche **de droite** : de $A$, le fil
descend et se dédouble en deux branches parallèles portant chacune un
condensateur — celui de gauche étiqueté « $C_1$ » (étiquette à sa gauche),
celui de droite « $C_2$ » (étiquette à sa droite) — qui se rejoignent et
descendent vers le nœud **B** (point noir, étiquette « B » au-dessous).
Branche **du bas** : de $B$, le fil repart vers la gauche jusqu'au bas du
conducteur ohmique, fermant la boucle.

*Figure 2 (courbe) :* $q\ (\mu\text{C})$ en fonction de $u_{AB}\ (\text{V})$,
sur un quadrillage de **6 divisions en largeur et 6 divisions en hauteur**.
Seules les valeurs $10$ et $20$ sont chiffrées en ordonnée, $1$ et $2$ en
abscisse, plus le $0$ à l'origine : le pas du quadrillage vaut donc
$1\ \text{V}$ horizontalement et $10\ \mu\text{C}$ verticalement, et le cadre
va jusqu'à $6\ \text{V}$ / $60\ \mu\text{C}$. Droite croissante partant
**exactement de l'origine** et rejoignant **exactement le coin supérieur droit
du cadre** $(6\ \text{V}\,;\,60\ \mu\text{C})$, en passant par les
intersections $(1\,;\,10)$, $(2\,;\,20)$, $(3\,;\,30)$… du quadrillage
principal : la pente se lit donc **$10\ \mu\text{C.V}^{-1}$**, soit
$C_{eq} = 10\ \mu\text{F}$ (lecture gridline-exacte, pas une estimation).

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
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK
(agent-vérificateur, 2026-08-06) ; **figures re-lues indépendamment (passe 3,
troisième agent, 2026-08-06) et jugées fidèles ; corrections confirmées.**
Transcription issue du scan course-422/upload-84195, page(s) 5–6. Historique :
vérification adverse (second agent) ayant relevé et corrigé un écart de
figure — écart et correction **confirmés à la passe 3**.
`element/127287` re-fetché, `course-422/upload-84195` (8 pages)
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
$u_C$) était, elle, correcte. Description réécrite d'après l'image.
**Passe 3 (re-lecture indépendante, troisième agent, 2026-08-06)** — figures
re-mesurées sur le scan sans réutiliser la lecture précédente : figure 1
confirmée au zoom ×8 (« R » sous le rectangle, « K » au-dessus du fil, flèche
« E » à gauche du cercle générateur, « D » à gauche du condensateur, flèche
$u_C$ à sa droite, flèche $i$ en haut à gauche) ; figure 2 confirmée par
régression sur 199 pixels de trace — la droite passe par $(0\,;\,996{,}5)$,
$(6\,;\,503)$ et coupe l'axe des abscisses en $u_c = 12{,}12$ V, résidu
quadratique moyen $0{,}37$ px, soit **exactement** $(0\,;\,1000) \to
(6\,;\,500) \to (12\,;\,0)$ ; quadrillage principal mesuré : pas de $3$ V en
abscisse et de $250$ V.s⁻¹ en ordonnée, seules les valeurs $0/6/12$ et
$0/500/1000$ étant chiffrées. Le barème de la partie ($0{,}5+0{,}5$) et la
partition $1{,}0+2{,}0+1{,}75 = 4{,}75$ ont été re-additionnés sur les p. 5–7.
⇒ **entrée promue.** Observation non bloquante : le titre gras « Exercice IV —
Les circuits des appareils électriques » n'est **pas** imprimé sur le scan
(l'exercice n'y porte pas de titre propre) ; il est dérivé de la première
phrase du chapeau — re-confirmé à la passe 3.

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

---

## 2025 — session normale — Exercice 3 (Partie 1)
Source: https://www.alloschool.com/element/145796
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-87489, page(s) 4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points ; **Partie 1**
  = 1,0 point ($0{,}5+0{,}5$)
- Images lues (reproductibilité) : `.../course-422/upload-87489/0004-big.jpg`
- Pages du scan : 4 (sur 6)
- Portée : **1- Charge d'un condensateur par une source de courant**,
  première sous-partie de l'exercice III. Le circuit complet (figure 1)
  comporte aussi la **décharge du même condensateur dans un dipôle RL**
  (pseudopériodique), transcrite sous `rlc-serie.md` (même figure 1, non
  reproduite là), et une troisième partie, **sélection et démodulation d'une
  onde modulée en amplitude**, transcrite sous `ondes-em-modulation.md`.

**EXERCICE 3 : Electricité (5 points).**

*(Cadrage de l'exercice, transcrit intégralement : « Les composantes
électroniques telle que les diodes, les bobines, les condensateurs se
trouvent dans différents circuits électriques et électroniques de plusieurs
appareils électriques qui sont utilisés dans le domaine industriel, de
communication, de numérisation…. On se propose dans cet exercice d'étudier :
- la charge d'un condensateur et sa décharge dans un dipôle RL ; - la
sélection et la démodulation d'une onde modulée en amplitude. Le montage
électrique représenté par le schéma de la figure 1 comporte un circuit de
charge d'un condensateur et un autre de sa décharge. »)*

**1- Charge d'un condensateur par une source de courant**

On veut déterminer la capacité $C_0$ d'un condensateur, initialement
déchargé, en utilisant le montage présenté sur la figure 1. Le générateur de
courant $G$ débite un courant électrique d'intensité constante
$I_0 = 1\ \mu\text{A}$.

À un instant choisi comme origine des dates $(t_0 = 0)$, on met
l'interrupteur $K$ en position (1). Un système d'acquisition informatisé
adéquat permet d'obtenir la courbe d'évolution temporelle de la tension
$u_C(t)$ aux bornes du condensateur lors de sa charge (figure 2).

1. **1-1.** (0,5) Exprimer la tension $u_C(t)$ en fonction de $I_0$, $C_0$ et
   $t$.
2. **1-2.** (0,5) Vérifier que $C_0 = 1\ \mu\text{F}$.

*Figure 1 (schéma, commun aux trois parties de l'exercice) :* boucle
comportant, de gauche à droite en partant du bas : le générateur $G$ (symbole
cercle contenant un arc courbe — symbole générique de source), monté en
série avec le conducteur ohmique $R$ (rectangle, étiquette « R » au-dessus)
sur la branche du haut, jusqu'au nœud étiqueté « (1) » ; à droite de ce
nœud, un interrupteur à double position, actionné par le levier « K »
(étiqueté au-dessus), pouvant basculer sur la position « (1) » (vers $R$–$G$)
ou sur la position « (2) » (vers le nœud « N », à droite). Le condensateur
$C_0$ est monté verticalement entre le nœud (1)/K et le nœud « M » en bas ;
sa tension $u_C$ est fléchée vers le haut à sa droite, et le courant $i$ est
fléché vers le bas juste en dessous du condensateur. À droite, entre N (en
haut) et M (en bas), la bobine « (b) » de caractéristiques $(L, r)$ est
dessinée en spires. Légende : « Figure 1 ».

*Figure 2 (courbe) :* $u_C\ (\text{V})$ en fonction de $t\ (\text{s})$, sur
quadrillage à double graduation (traits principaux noirs, sous-quadrillage
fin bleu). Axe des ordonnées gradué aux traits principaux $2$ et $4$ (traits
non chiffrés au-delà) ; axe des abscisses gradué aux traits principaux $2$
et $4$ (traits non chiffrés au-delà). Droite croissante partant exactement de
l'origine, passant par les points $(2\,;\,2)$ et $(4\,;\,4)$ — pente
apparente $1\ \text{V.s}^{-1}$, cohérente avec $I_0/C_0$ — et se prolongeant
en ligne droite jusqu'au coin supérieur droit du cadre *(valeur exacte du
coin non chiffrée sur le scan — lecture à confirmer)*.

---

## 2022 — session normale — Exercice 3 (1. Réponse d'un dipôle RC à un échelon de tension)
Source: https://www.alloschool.com/element/136621
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-84516, page(s) 5. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image ; le résumé HTML
  d'AlloSchool pour `element/136621` annonce à tort « Sciences Mathématiques
  B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 4,5 points ;
  **section 1 (réponse RC)** = 1,5 point ($0{,}25+0{,}5+0{,}5+0{,}25$,
  barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-84516/0005-big.jpg`
- Pages du scan : 5 (sur 8)
- Portée : **section 1 (réponse d'un dipôle RC à un échelon de tension)** de
  l'exercice 3. La **section 2 (oscillations libres dans un circuit RLC
  série)** du même exercice est sous `rlc-serie.md` (même montage, figure 1).

**EXERCICE 3 (4,5 points).**

*(Cadrage de l'exercice, transcrit intégralement : « Cet exercice se
propose : - de déterminer la capacité d'un condensateur ; - de déterminer
l'inductance d'une bobine ; - d'effectuer une étude énergétique d'un circuit
RLC série. »)*

On réalise le montage électrique schématisé sur la figure 1. Ce montage est
constitué des éléments suivants :
- un générateur idéal de tension de force électromotrice $E$ ;
- un condensateur de capacité $C$ initialement déchargé ;
- une bobine d'inductance $L$ et de résistance $r$ ;
- un conducteur ohmique de résistance $R$ ;
- un interrupteur $K$ à double position.

**1. Réponse d'un dipôle RC à un échelon de tension**

À un instant choisi comme origine des dates $t = 0$, on place l'interrupteur
$K$ sur la position (1). Les courbes $(C_1)$ et $(C_2)$ de la figure 2
représentent l'évolution de la tension $u_C(t)$ aux bornes du condensateur
et celle de l'intensité $i(t)$ du courant électrique qui circule dans le
circuit.

La droite $(T)$ étant la tangente à la courbe $(C_1)$ au point d'abscisse
$t = 0$.

1. **1.1.** (0,25) Montrer que l'équation différentielle vérifiée par la
   tension $u_C(t)$ s'écrit sous la forme :
   $\dfrac{du_C}{dt} + \dfrac{1}{RC}u_C = \dfrac{E}{RC}$.
2. **1.2.** La solution de cette équation différentielle est de la forme :
   $u_C(t) = E\left(1 - e^{-t/RC}\right)$.
   1. **1.2.1.** (0,5) Établir l'expression de l'intensité du courant $i(t)$
      en fonction de $E$, $R$, $C$ et $t$.
   2. **1.2.2.** (0,5) En exploitant les courbes de la figure 2, déterminer
      la valeur de $R$.
   3. **1.2.3.** (0,25) Montrer que la capacité $C$ du condensateur est :
      $C = 50\ \mu\text{F}$.

*Figure 1 (schéma) :* boucle comportant, en haut, un conducteur ohmique $R$
(rectangle) suivi d'un interrupteur $K$ à double position, de bornes « (1) »
et « (2) ». À gauche, le générateur $E$ (symbole cercle, flèche de tension).
Au centre, le condensateur (tension $u_C$ fléchée) monté entre le nœud
(1)/$K$ et le bas du circuit. À droite de la position (2), une bobine
étiquetée « $(L,r)$ ». Légende : « Figure 1 ».

*Figure 2 (deux courbes côte à côte) :* à gauche, $u_C\ (\text{V})$ en
fonction de $t\ (\text{ms})$ ; axe des ordonnées gradué $0,\ 3,\ 6,\ 9,\ 12$ ;
axe des abscisses gradué $0,\ 50,\ 100,\ 150,\ 200$. Courbe $(C_1)$
croissante, concave, partant de $0$ et tendant asymptotiquement vers un
palier à $u_C = 12\ \text{V}$ ; une droite en pointillés $(T)$, tangente à
l'origine, est tracée. À droite, $i\ (\text{mA})$ en fonction de
$t\ (\text{ms})$ ; mêmes graduations d'axes ($0,\ 3,\ 6,\ 9,\ 12$ en
ordonnée ; $0,\ 50,\ 100,\ 150,\ 200$ en abscisse). Courbe $(C_2)$
décroissante, partant d'une valeur proche de $12\ \text{mA}$ à $t = 0$ et
décroissant de façon exponentielle vers $0$. Légende : « Figure 2 ».
