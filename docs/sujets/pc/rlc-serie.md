# `rlc-serie` — Oscillations libres dans un circuit RLC série

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3. Provenance sur chaque entrée.
>
> ⚠ Rappel de périmètre (cadre `rlc_serie`, cf.
> `content/pc/rlc-serie/_mined-reference.md`) : la **seule** solution analytique
> au programme est le cas **non amorti** (LC idéal / entretenu). Le régime amorti
> se limite à l'**établissement de l'équation différentielle** et à
> l'interprétation énergétique (pas de pseudo-période $f(R,L,C)$, pas de
> coefficient d'amortissement en forme close). Les deux exercices ci-dessous
> respectent ce périmètre : ils demandent l'équa. diff. du cas amorti puis
> traitent le cas **sinusoïdal** (LC ou entretenu).

---

## 2019 — session normale — Exercice III (partie II)
Source: https://www.alloschool.com/element/68300
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 4,5 points
- Images lues : `.../course-422/upload-54757/0004-big.jpg`, `.../0005-big.jpg`
- Pages du scan : 4 et 5 (sur 7)
- Portée : **Partie II (oscillations LC)**. La Partie I (charge RC) et le schéma
  (figure 1, mêmes $E,R,C,L,K$) sont transcrits sous `rc-charge.md`.

**Charge et décharge d'un condensateur — II. Étude des oscillations électriques
dans le circuit LC.**

Une fois que le régime permanent est établi, on bascule l'interrupteur $K$ en
position (2) à un instant choisi comme nouvelle origine des dates ($t=0$). On
visualise, à l'aide d'un dispositif adéquat, les variations de la tension $u_c$
aux bornes du condensateur en fonction du temps.

1. (0,25) Montrer que l'équation différentielle vérifiée par la tension
   $u_c(t)$ aux bornes du condensateur s'écrit :
   $$\dfrac{d^{2}u_c}{dt^{2}} + \dfrac{1}{LC}\, u_c = 0.$$
2. L'une des trois courbes (a), (b) ou (c) de la figure 3 représente, pour cette
   expérience, l'évolution de la tension $u_c(t)$.
   1. (0,5) Indiquer la courbe qui représente l'évolution de la tension $u_c(t)$
      lors de cette expérience. Justifier votre réponse.
   2. (0,25) Trouver la période propre $T_0$ de l'oscillateur LC.
3. (0,5) Déterminer l'inductance $L$ de la bobine. (On prend $\pi^{2} = 10$).
4. À l'aide de la courbe représentant l'évolution de la tension $u_c(t)$ pour
   cette expérience :
   1. (0,5) Trouver l'énergie totale $E_t$ du circuit.
   2. (0,5) En déduire l'énergie magnétique $E_{m1}$ emmagasinée dans la bobine
      à l'instant $t_1 = 12\ \text{ms}$.

*Figure 3 (trois courbes $u_c(\text{V})$ vs $t(\text{ms})$, ordonnées graduées de
$-10$ à $10$, abscisses avec repères $10$ et $20$) :*
- **(a)** : part de $u_c = +10\ \text{V}$ à $t=0$, oscillation d'**amplitude
  décroissante** (allure pseudopériodique) — premier minimum $\approx -6\
  \text{V}$ vers $t\approx 10$, remontée à $\approx +4\ \text{V}$ vers $t\approx
  20$.
- **(b)** : part de $u_c = +10\ \text{V}$ (**maximum**) à $t=0$, sinusoïde
  d'**amplitude constante** $10\ \text{V}$ ; minimum $-10\ \text{V}$ vers
  $t\approx 10$, maximum $+10\ \text{V}$ vers $t\approx 20$ (période $\approx 20\
  \text{ms}$).
- **(c)** : sinusoïde d'amplitude constante $10\ \text{V}$, mais **déphasée** —
  à $t=0$ elle **ne part pas d'un extremum** (démarre près de zéro puis croît)
  *(lecture d'échelle du départ à confirmer)*.

---

## 2018 — session normale — Exercice III (partie II)
Source: https://www.alloschool.com/element/57726
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points
- Images lues : `.../course-422/upload-45118/0006-big.jpg`
- Pages du scan : 6 (sur 8)
- Portée : **Partie II (circuit RLC série)**. Les parties I-1 / I-2 (capacité
  d'un condensateur, décharge RC) sont sous `rc-charge.md`.

**Détermination expérimentale de la capacité d'un condensateur / Étude d'un
circuit RLC série — II. Étude d'un circuit RLC série.**

Un élève de la même classe réalise le montage représenté sur la figure 5 qui
comporte :
- un condensateur, totalement chargé, de capacité $C = 2,5\ \mu\text{F}$ ;
- une bobine d'inductance $L$ et de résistance $r$ ;
- un interrupteur $K$.

Après fermeture du circuit, on visualise, à l'aide d'un système d'acquisition
informatisé, des oscillations pseudopériodiques représentant les variations de la
charge $q(t)$ du condensateur.

1. (0,25) Pourquoi observe-t-on des oscillations pseudopériodiques ?
2. Pour obtenir des oscillations électriques entretenues, un générateur $G$
   délivrant une tension proportionnelle à l'intensité du courant
   $u_G(t) = k\, i(t)$ est inséré en série dans le circuit précédent.
   1. (0,5) Établir l'équation différentielle vérifiée par la charge $q(t)$.
   2. (0,25) En ajustant le paramètre $k$ sur la valeur $k = 5$ (exprimée dans le
      système d'unités international), les oscillations deviennent sinusoïdales
      (figure 6). Déterminer la valeur de $r$.
   3. (0,75) En exploitant la courbe de la figure 6, trouver la valeur de
      l'inductance $L$ de la bobine.

*Figure 5 (schéma) :* circuit série entre bornes $A$ et $B$ : condensateur $C$,
interrupteur $K$, et bobine notée $(L, r)$.

*Figure 6 (courbe) :* $q\ (\mu\text{C})$ en fonction de $t\ (\text{ms})$ ;
sinusoïde d'**amplitude constante** oscillant entre $+q_m$ et $-q_m$ (valeur
$q_m$ non chiffrée sur l'axe, repérée par un trait). Abscisses graduées $1,\ 2,\
3,\ 4$ ; les maxima successifs apparaissent vers $t\approx 1\ \text{ms}$ puis
$t\approx 3\ \text{ms}$ (période $\approx 2\ \text{ms}$) *(lecture d'échelle à
confirmer)*.

---

## 2020 — session normale — Exercice IV (parties II et III)
Source: https://www.alloschool.com/element/109742
Statut: vérifié — 2026-08-06, vérification adverse indépendante par un second
agent (README §3), **figures re-lues élément par élément sur l'image et
lectures graphiques arbitrées à la mesure de pixels**. `element/109742`
re-fetché sans reprendre les URLs citées : `course-422/upload-80870`
(**7 pages**) re-dérivé et **conforme** ; pp. 5–6 confirmées comme portant
les parties II et III. En-tête **confirmé sur l'image du scan** (p. 1 :
« NS 28F » ; « شعبة العلوم التجريبية مسلك العلوم الفيزيائية (خيار فرنسية) » =
Sciences Physiques BIOF ; مدة الإنجاز 3 h ; المعامل 7 ; « Exercice IV
(5 points) ») ; le chapeau et le bandeau « **EXERCICE IV ( 5 points)** »
figurent en bas de la **p. 4** (non transcrits, hors portée RLC) —
*NB : le résumé HTML d'AlloSchool annonce « 2ème BAC Sciences Mathématiques
B », ce que l'image dément ; seule l'image fait foi.* Diff caractère par
caractère des pp. 5–6 (libellés, numérotation, indices/exposants, valeurs et
unités : $R = 90\ \Omega$, $L = 1\ \text{H}$, $\pi^{2} = 10$,
$u_G(t) = k.i(t)$, $i(t) = I_m\cos(\frac{2\pi}{T_0}.t + \varphi)$,
$t_1 = 16\ \text{ms}$, grandeurs $C$, $k_0$, $I_m$, $T_0$, $\varphi$, $E_t$,
$E_{e1}$) — **aucun écart** (seules différences : accents/espaces
typographiques, « Etablir » → « Établir »). **Partition du barème vérifiée
sur la marge du scan** : partie I (p. 5) $0{,}5{+}0{,}5{+}0{,}5 = 1{,}5$ ;
partie II (p. 6) $0{,}25{+}0{,}5{+}0{,}5 = 1{,}25$ ; partie III (p. 6)
$0{,}5{+}0{,}75{+}0{,}5{+}0{,}5 = 2{,}25$ ⇒ portée transcrite ici
$1{,}25 + 2{,}25 = 3{,}5$ pts sur $5{,}0$ — **conforme**, et la partie I est
bien un échelon de tension sur dipôle RL (portée `dipole-rl.md`).
**Schémas jugés élément par élément (zooms, jamais d'après la prose de
l'entrée)** — *fig. 3* : flèche $i$ vers la droite au coin haut-gauche,
$R$ (rectangle, étiquette sous le rectangle) en haut, bobine $(L,r)$ en
spires à droite (étiquette à gauche du symbole), condensateur $C$ (deux
traits parallèles, étiquette à droite) sur la branche gauche, branche basse
= simple fil : **conforme**, avec la précision ajoutée ci-dessous que la
figure 3 ne porte **ni interrupteur $K$ ni flèche $u_L$**, contrairement à
la figure 1 (le raccourci « même disposition que la figure 1, avec $E$
remplacé par $C$ » pouvait laisser croire le contraire). *Fig. 5* :
identique à la figure 3 **plus** un générateur $G$ (cercle étiqueté « G »)
inséré **dans la branche basse**, entre le pied de la branche $C$ et le pied
de la branche $(L,r)$ : **conforme**. **Lectures graphiques arbitrées**
(grilles et courbes mesurées au pixel) — *fig. 4* : pas de graduation
numérique sur l'axe $u_C$ (seul « 0 » est écrit), repères $5/10/15/20/25$
portés par les traits noirs (pas de 5 ms, quadrillage bleu à mi-carreau) ;
les extrema tombent **exactement** sur ces repères (maxima $t = 0$ / 10 / 20
et un dernier vers 30, minima $t = 5$ / 15 / 25 ; passages par zéro à
$2{,}5$ / $7{,}5$ / $12{,}5$ / $17{,}5$ / $22{,}5$ / $27{,}5$ ms) ⇒
**pseudo-période $T = 10\ \text{ms}$ confirmée, drapeau levé**. *Fig. 6* :
ordonnées $8/4/0/-4/-8$ mA, quadrillage fin bleu au pas de $1\ \text{ms}$ et
$0{,}8\ \text{mA}$ ; amplitude **constante** $\pm 8\ \text{mA}$ ; la courbe
part de l'axe à $t=0$ en décroissant ; minima à $2{,}5$ / $12{,}5$ /
$22{,}5$ ms, maxima à $7{,}5$ / $17{,}5$ / $27{,}5$ ms, passages par zéro
sur $0/5/10/15/20/25$ ⇒ **$T_0 = 10\ \text{ms}$ et $\varphi = \pi/2$ —
les six drapeaux « lecture à confirmer » sont levés**. **Physique
re-dérivée et cohérente** : $T = T_0 = 2\pi\sqrt{LC}$ avec $T = 10$ ms,
$L = 1$ H et $\pi^2 = 10$ ⇒ $C = T^{2}/(4\pi^{2}L) = 2{,}5\ \mu\text{F}$
(valeur ronde — corrobore indépendamment la lecture $T = 10$ ms) ; la
période lue sur la fig. 6 est identique à la pseudo-période de la fig. 4,
comme l'énoncé l'affirme ; entretien ⇔ $k_0 = R + r$, et la partie I donne
$r = u_L(\infty)/I_0 = 1/0{,}1 = 10\ \Omega$ d'où $k_0 = 100$ SI, cohérent
avec $\tau = L/(R+r) = 10$ ms lu sur la tangente de la fig. 2 (ce qui
« vérifie $L = 1$ H ») ; $E_t = \frac12 L I_m^{2} = 3{,}2\times10^{-5}$ J ;
à $t_1 = 16$ ms, $i = I_m\cos(3{,}7\pi) \approx +4{,}7$ mA (la courbe donne
$\approx +5$ mA, écart d'un demi-carreau fin, dans l'épaisseur du trait) ⇒
$E_{e1} \approx 2{,}1\times10^{-5}$ J. Équation de la partie I imprimée sur
la p. 5 dimensionnellement homogène ($\text{A.s}^{-1}$ partout). **Aucune
divergence bloquante** ⇒ promue. *(Quatre corrections de précision ont été
apportées pendant cette passe — descriptions des figures 3, 4 et 6, et la
ligne de titre, qui présentait l'intitulé de la partie I comme celui de
l'exercice alors que la page de garde en donne deux ; elles demandent, par
discipline, une re-lecture par un tiers.)*

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan : « الفيزياء والكيمياء » / « شعبة العلوم التجريبية مسلك
  العلوم الفيزيائية (خيار فرنسية) »)
- Code sujet : NS 28F · Barème de l'exercice complet (Ex IV) : 5 points ·
  Barème de la portée RLC transcrite ici (parties II + III) : 3,5 points
- Images lues : `.../course-422/upload-80870/0005-big.jpg`,
  `.../0006-big.jpg` (et `0001-big.jpg` pour la couverture / le barème ;
  `0004-big.jpg`, relue à la vérification, porte le bandeau « EXERCICE IV
  ( 5 points) » et le chapeau de l'exercice)
- Pages du scan : 5 et 6 (sur 7)
- Portée : Exercice IV du sujet 2020 N est composé de trois parties **I, II,
  III** partageant le même montage (bobine $(L,r)$, résistance $R = 90\
  \Omega$). **Partie I — « Réponse d'un dipôle RL à un échelon de tension »**
  (figures 1-2, questions sur $i(t)$, $u_L(t)$, détermination de $r$ et $L$)
  est **hors périmètre RLC** et transcrite sous `dipole-rl.md`. **Parties II
  — « Décharge d'un condensateur dans un dipôle RL »** (oscillations
  libres/pseudopériodiques, figure 3-4) et **III — « Entretien des
  oscillations dans un circuit RLC série »** (régime sinusoïdal entretenu,
  figure 5-6) forment le circuit RLC série proprement dit et sont
  transcrites intégralement ci-dessous.

**Exercice IV — intitulés de la page de garde : « Réponse d'un dipôle RL à un
échelon de tension » / « Etude de l'amortissement et de l'entretien des
oscillations dans un circuit RLC série » — II. Décharge d'un condensateur dans
un dipôle RL — III. Entretien des oscillations dans un circuit RLC série.**

**II - Décharge d'un condensateur dans un dipôle RL**

On monte en série, à un instant choisi comme nouvelle origine des dates
$t = 0$, un condensateur de capacité $C$, totalement chargé, avec la bobine
précédente et un conducteur ohmique de résistance $R = 90\ \Omega$. (figure 3).

La courbe de la figure 4 représente l'évolution de la tension $u_c(t)$ aux
bornes du condensateur.

1. (0,25) Quel est le régime d'oscillation mis en évidence par la courbe de
   la figure 4 ?
2. (0,5) Établir l'équation différentielle vérifiée par la tension $u_c(t)$.
3. (0,5) Sachant que la pseudopériode est égale à la période propre, trouver
   la capacité $C$ du condensateur. (On prend : $\pi^{2} = 10$).

**III - Entretien des oscillations dans un circuit RLC série**

Pour entretenir les oscillations électriques dans le circuit précédent
représenté sur la figure 3, on insère dans ce circuit un générateur $G$
délivrant une tension proportionnelle à l'intensité du courant :
$u_G(t) = k \cdot i(t)$. (Figure 5).

La courbe de la figure 6 représente l'évolution de l'intensité $i(t)$ dans le
circuit dans le cas où $k = k_0$.

1. (0,5) Trouver, dans le système international d'unités, la valeur de $k_0$.
2. (0,75) Sachant que l'expression de l'intensité $i(t)$ dans le circuit
   s'écrit ainsi : $i(t) = I_m\cos\!\left(\dfrac{2\pi}{T_0}\, t + \varphi\right)$,
   déterminer les valeurs de $I_m$, $T_0$ et $\varphi$.
3. (0,5) Déterminer l'énergie totale $E_t$ du circuit.
4. (0,5) Trouver l'énergie électrique $E_{e1}$ emmagasinée dans le
   condensateur à l'instant $t_1 = 16\ \text{ms}$.

*Figure 3 (schéma) :* boucle série : coin haut-gauche, flèche $i$ vers la
droite ; branche haute = $R$ (rectangle, étiquette « R » sous le rectangle) ;
coin haut-droit → descend vers la branche de droite = bobine $(L, r)$
(dessinée en spires, étiquette « (L,r) » à gauche du symbole) ; branche basse
= **simple fil** qui referme le circuit vers le coin bas-gauche ; branche
gauche (remontant vers le coin haut-gauche) = condensateur $C$ (symbole à deux
traits parallèles, étiquette « C » à droite). Même disposition que la figure 1
de la partie I avec $E$ remplacé par $C$, **mais la figure 3 ne porte ni
l'interrupteur $K$ ni la flèche de tension $u_L$** qui figurent, eux, sur la
figure 1.

*Figure 4 (courbe) :* $u_C$ (V) en fonction de $t$ (ms) ; **aucune valeur
numérique** portée sur l'axe $u_C$ (seul le niveau $0$ est repéré, à gauche de
l'origine) ; axe des temps gradué avec repères $5, 10, 15, 20, 25$ (traits
noirs tous les $5\ \text{ms}$, quadrillage bleu secondaire à mi-carreau, soit
$2,5\ \text{ms}$). Oscillation pseudopériodique d'**amplitude décroissante** :
la courbe part à $t = 0$ de sa valeur la plus élevée (elle démarre au bord
supérieur du cadre), descend à un premier minimum — le plus profond de la
courbe — en $t = 5$, remonte à un maximum (plus bas que celui de départ) en
$t = 10$, redescend à un second minimum (moins profond que le premier) en
$t = 15$, remonte à un maximum (plus bas que celui de $t = 10$) en $t = 20$,
redescend à un troisième minimum (le moins profond des trois) en $t = 25$,
puis remonte vers un dernier maximum en fin de tracé, au voisinage du bord
droit du cadre ($t \approx 30$). Les extrema tombent **exactement** sur les
repères $5, 10, 15, 20, 25$ et les passages par zéro à mi-chemin
($2,5$ ; $7,5$ ; $12,5$ ; $17,5$ ; $22,5$ ; $27,5\ \text{ms}$) : la
pseudo-période lue vaut **$T = 10\ \text{ms}$** (lecture confirmée à la mesure
de pixels lors de la vérification).

*Figure 5 (schéma) :* même boucle série que la figure 3 (condensateur $C$ à
gauche, $R$ en haut avec flèche $i$, bobine $(L, r)$ à droite), mais la
branche basse porte en plus un générateur $G$ (cercle libellé « G ») inséré
en série entre le bas de la branche $C$ et le bas de la branche $(L, r)$.

*Figure 6 (courbe) :* $i$ (mA) en fonction de $t$ (ms) ; axe des ordonnées
gradué $8, 4, 0, -4, -8$ ; axe des temps gradué avec repères $5, 10, 15, 20,
25$ ; quadrillage secondaire fin (bleu) au pas de $1\ \text{ms}$ en abscisse
et $0,8\ \text{mA}$ en ordonnée (5 subdivisions par carreau dans les deux
directions). Sinusoïde d'**amplitude constante**, oscillant entre $+8$ et
$-8$ mA. La courbe **part de l'axe à $t = 0$** ($i \approx 0$) en décroissant
immédiatement, atteint un minimum $-8\ \text{mA}$ en $t = 2,5$, coupe l'axe
en $t = 5$, atteint un maximum $+8\ \text{mA}$ en $t = 7,5$, coupe l'axe en
$t = 10$, minimum $-8\ \text{mA}$ en $t = 12,5$, axe en $t = 15$, maximum
$+8\ \text{mA}$ en $t = 17,5$, axe en $t = 20$, minimum $-8\ \text{mA}$ en
$t = 22,5$, axe en $t = 25$, puis un dernier maximum $+8\ \text{mA}$ en
$t = 27,5$ (fin du tracé). Les extrema tombent donc sur les multiples impairs
de $2,5\ \text{ms}$ et les passages par zéro sur les repères
$0, 5, 10, 15, 20, 25$ : période **$T_0 = 10\ \text{ms}$** (lectures
confirmées à la mesure de pixels lors de la vérification).

---

## 2021 — session normale — Exercice IV (Partie II)
Source: https://www.alloschool.com/element/127287
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK
(agent-vérificateur, 2026-08-06) ; **figures re-lues indépendamment (passe 3,
troisième agent, 2026-08-06) et jugées fidèles ; corrections confirmées.**
Transcription issue du scan course-422/upload-84195, page(s) 6. Historique :
vérification adverse (second agent) ayant trouvé et corrigé un **écart de
figure majeur** ($T_0$) — écart et correction **confirmés par mesure
indépendante à la passe 3**. `element/127287` re-fetché,
`course-422/upload-84195` (8 pages) re-dérivé de façon indépendante et
**conforme** ; en-tête du scan **confirmé** (NS 28F, Sciences Physiques BIOF
option française, 3 h, coef 7 ; couverture : « Exercice IV (4,75 points) »).
Diff caractère par caractère de la p. 6 (énoncé, libellés, numérotation,
expression $q(t) = Q_m\cos(2\pi t/T_0)$, $\pi^2 = 10$, barème en marge) —
**aucun écart sur le texte**. Barème re-additionné :
$0{,}25+0{,}5+0{,}5+0{,}25+0{,}5 = 2{,}0$ points ; **partition de l'exercice
vérifiée** : $1{,}0$ (I) $+\ 2{,}0$ (II) $+\ 1{,}75$ (III) $= 4{,}75$ =
couverture. **Figure 3 jugée élément par élément au zoom — fidèle** (boucle
série bobine $L$ dessinée en spires sur la branche gauche + condensateur $D$
sur la branche droite, flèche $i$ en haut vers la droite, flèche $u_C$ vers le
haut ; **aucun conducteur ohmique** dans la boucle, cohérent avec le régime
non amorti).
**Écart bloquant relevé — figure 4 :** la description précédente affirmait un
passage par zéro sur le repère $t = 7$, un minimum vers $t = 14$, une remontée
coupant l'axe vers $t = 21$ et un maximum vers $t = 28$ — c'est-à-dire
$T_0 = 28$ ms. Le relevé numérique de la courbe sur le scan (repères
principaux localisés aux colonnes du quadrillage puis tracé échantillonné)
donne : maximum à $t = 0$, zéro descendant à $t \simeq 5{,}25$ ms, minimum à
$t \simeq 10{,}5$ ms, zéro montant à $t \simeq 15{,}75$ ms, **maximum
exactement sur le repère $t = 21$ ms**, zéro descendant à $t \simeq 26{,}25$
ms, second minimum à $t \simeq 31{,}5$ ms — soit **$T_0 = 21$ ms**, structure
en quarts de période parfaitement régulière. La description de figure a été
réécrite en conséquence. *Conséquence pédagogique : la question 4 (« déterminer
graphiquement $T_0$ ») vaut $21$ ms et non $28$ ms, et la question 5 donne
$L = T_0^2/(4\pi^2 C) = (21\times10^{-3})^2/(40\times12\times10^{-6})
\simeq 0{,}92$ H, et non $\simeq 1{,}63$ H.*
**Drapeau « lecture à confirmer » adjugé et levé** sur l'amplitude : les
extrema ne sont pas « au-delà de $72$ » de façon indéterminée, ils sont
**exactement tangents aux traits principaux non chiffrés à $\pm 144\
\mu\text{C}$** (le pas du quadrillage principal vaut $72\ \mu\text{C}$ ;
mesure : $108{,}5$ px pour $54{,}5$ px par graduation, soit $2{,}00$
graduations). Recoupement physique **exact** avec la partie I : $Q_m = C\cdot E
= 12\ \mu\text{F} \times 12\ \text{V} = 144\ \mu\text{C}$.
**Passe 3 (re-lecture indépendante, troisième agent, 2026-08-06)** — figure 4
re-mesurée à partir du scan, sans réutiliser le relevé précédent. Traits
principaux horizontaux localisés aux ordonnées $+144$, $+72$, $0$, $-72$,
$-144\ \mu\text{C}$ (pas mesuré $54{,}25$ px $= 72\ \mu\text{C}$, deux traits
non chiffrés à $\pm 144$ **confirmés**), traits principaux verticaux à $0$,
$7$, $14$, $21$, $28$, $35$ ms (pas mesuré $54{,}30$ px $= 7$ ms). Repères de
la courbe relevés indépendamment : maximum tangent à $+144$ en $t = 0$ ; zéro
descendant $5{,}33$ ms ; minimum tangent à $-144$ vers $10{,}7$ ms ; zéro
montant $16{,}05$ ms ; **maximum suivant $21{,}25$ ms**, soit sur le repère
chiffré $21$ ms à $0{,}25$ ms près — moins que l'épaisseur du trait de courbe
(4–5 px) ; zéro descendant $26{,}65$ ms ; second minimum $\simeq 31{,}9$ ms.
⇒ **$T_0 = 21$ ms confirmé** (et la lecture antérieure de $28$ ms
définitivement écartée), $L \simeq 0{,}92$ H confirmé. Figure 3 re-confirmée
au zoom ×6 (bobine en spires à gauche étiquetée « L », flèche $i$ en haut vers
la droite, condensateur « D » à droite avec flèche $u_C$ vers le haut, aucun
conducteur ohmique). ⇒ **entrée promue.**

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28F · Barème de l'exercice complet : 4,75 points · Barème de
  la Partie II transcrite ici : 2,0 points
- Images lues : `.../course-422/upload-84195/0006-big.jpg`
- Pages du scan : 6 (sur 8)
- Portée : **Partie II (oscillations non amorties dans un circuit LC)** de
  l'exercice IV du sujet 2021 N, transcrite ici. La **Partie I (réponse d'un
  dipôle RC à un échelon)** est sous `rc-charge.md` ; la **Partie III
  (modulation d'amplitude)** est sous `ondes-em-modulation.md`. Régime
  respecté : la courbe (figure 4) est purement sinusoïdale d'amplitude
  constante (cas non amorti au programme, cf. rappel de périmètre en tête de
  fichier).

**II- Oscillations électriques non amorties dans un circuit LC.**

On réalise le montage représenté sur le schéma de la figure 3. Ce montage est
constitué du condensateur précédent $D$, initialement chargé, et d'une bobine
d'inductance $L$ et de résistance négligeable. Un système d'acquisition
informatisé permet de tracer la courbe représentant l'évolution de la charge
$q(t)$ du condensateur (figure 4).

1. (0,25) Préciser, parmi les trois régimes d'oscillations, le régime mis en
   évidence par la courbe de la figure 4.
2. (0,5) Établir l'équation différentielle vérifiée par la charge $q(t)$ du
   condensateur.
3. (0,5) Trouver l'expression de la période propre $T_0$ de l'oscillateur en
   fonction de $L$ et de $C$ pour que l'expression $q(t) = Q_m \cos\!\left(
   \dfrac{2\pi}{T_0}\,t\right)$ soit solution de cette équation différentielle.
4. (0,25) Déterminer graphiquement la valeur de $T_0$.
5. (0,5) En déduire la valeur de $L$. (on prend $\pi^{2} = 10$).

*Figure 3 (schéma) :* boucle série ; à gauche, la bobine $L$ (dessinée en
spires, étiquette « L » à côté) ; flèche de courant $i$ en haut, orientée vers
la droite ; à droite, le condensateur $D$ (deux traits parallèles) avec une
flèche $u_C$ orientée vers le haut à côté.

*Figure 4 (courbe) :* ordonnée $q\ (\mu\text{C})$, seules les valeurs $72$,
$0$ et $-72$ étant chiffrées sur l'axe ; le quadrillage principal horizontal
est régulier et de pas $72\ \mu\text{C}$, si bien qu'il existe deux traits
principaux **non chiffrés** à $+144$ et $-144\ \mu\text{C}$. Abscisse
$t\ (\text{ms})$ : traits principaux chiffrés $7$, $14$, $21$, $28$ (pas
régulier de $7$ ms ; un dernier trait principal non chiffré ferme le cadre à
droite, à $t = 35$ ms), avec quadrillage secondaire régulier entre eux.

Courbe sinusoïdale d'allure cosinus, d'**amplitude constante**, tangente
exactement aux traits principaux $+144$ et $-144\ \mu\text{C}$ : elle part de
son **maximum** $Q_m = 144\ \mu\text{C}$ à $t = 0$, coupe l'axe des abscisses
en descendant vers $t \simeq 5{,}25$ ms (soit **avant** le repère $7$),
atteint son **minimum** $-144\ \mu\text{C}$ vers $t \simeq 10{,}5$ ms (à
mi-chemin entre les repères $7$ et $14$), recoupe l'axe en montant vers
$t \simeq 15{,}75$ ms, retrouve son **maximum** $+144\ \mu\text{C}$
**exactement sur le repère $t = 21$ ms**, puis recoupe l'axe vers
$t \simeq 26{,}25$ ms et redescend jusqu'à un second minimum vers
$t \simeq 31{,}5$ ms en fin de tracé.

La **période propre se lit donc $T_0 = 21$ ms** (maximum à $t = 0$ et maximum
suivant sur le repère $t = 21$ ; écart entre passages par zéro consécutifs
$\simeq 10{,}5$ ms $= T_0/2$).

---

## 2025 — session normale — Exercice 3 (Partie 2)
Source: https://www.alloschool.com/element/145796
Statut: transcrit (non vérifié) — ⚠️ **corrections de figure importantes
appliquées** par agent-vérificateur-adversarial, 2026-08-06 : l'entrée **reste non
vérifiée** et appelle impérativement une re-lecture indépendante (README §3).
**Élément re-dérivé** : `element/145796` → `course-422/upload-87489`, **6 pages**
(`0007-big.jpg` = 404) ; couverture p.1 relue — **NS28F**, SPC/BIOF, 3 h, coef 7 ;
carte $7+2{,}5+5+5{,}5=\mathbf{20}$ ✓.
**Énoncé (texte) : conforme.** Diff caractère par caractère contre `0004-big.jpg`
(chapeau « 2- Décharge d'un condensateur dans un dipôle RL », $u_C=U_0=10\ \text{V}$,
position (2), $(t_0=0)$, Q2-1) et `0005-big.jpg` (Q2-2, Q2-2-1, Q2-2-2, Q2-3
$\frac{dE_T}{dt}=-r.i^2$, Q2-4 $|E_{th}|$ entre $t=0$ et $t=t_A$) ; barème marginal
recompté **$0{,}5\times5=2{,}5$** pts, et $1{,}0+2{,}5+1{,}5=\mathbf{5}$ ✓.
**Figure 3 : trois divergences bloquantes, corrigées ci-dessous.**
1. ❌→✅ **Le repère « $7\cdot10^{-5}\,\text{s}$ » n'encadre pas deux maxima
   consécutifs.** Relevé au pixel : sa double flèche s'étend **exactement d'un
   trait principal au suivant** (une seule division), entre les deux verticales
   principales qui suivent $t_A$. C'est **l'étalon de l'axe des temps**
   (non gradué) : **1 division $=7\cdot10^{-5}\ \text{s}$**.
2. ❌→✅ **La pseudopériode ne vaut donc pas $7\cdot10^{-5}$ s.** Les extremums
   tombent exactement sur les traits principaux, un sur deux (maxima aux
   divisions 0, 4, 8 ; minima aux divisions 2, 6, 10) et les passages par zéro
   aux divisions 1, 3, 5, 7, 9 : **deux maxima consécutifs sont séparés de
   4 divisions**, soit $T=4\times7\cdot10^{-5}=\mathbf{2{,}8\cdot10^{-4}\ \text{s}}$.
   **Recoupement physique décisif** : $T\simeq T_0=2\pi\sqrt{LC_0}$ avec
   $C_0=1\ \mu\text{F}$ (Partie 1) et $L=2\ \text{mH}$ (valeur **donnée par le
   sujet lui-même** en Partie 3, même bobine (b)) donne
   $2\pi\sqrt{2\cdot10^{-3}\times10^{-6}}=2{,}81\cdot10^{-4}\ \text{s}$ ✓ ;
   la lecture erronée ($7\cdot10^{-5}$ s) aurait exigé $L\approx0{,}12\ \text{mH}$,
   incompatible avec l'énoncé.
3. ❌→✅ **Il n'y a pas de « dernier maximum » en fin de tracé** : après le
   troisième maximum la courbe redescend et le tracé **s'arrête sur le troisième
   minimum, situé au bord droit du cadre**.
**Drapeaux « lecture à confirmer » adjugés** : (a) valeur de départ — **levée** :
$u_C(0)=\mathbf{10\ \text{V}}$ exactement (2,5 divisions de 4 V au-dessus de 0,
mesuré au pixel), ce qui est précisément le $U_0=10\ \text{V}$ de l'énoncé ;
(b) position de $t_B$ — **levée** : $t_B$ est le **passage par zéro descendant**
qui suit le maximum $t_A$, exactement **une division ($T/4$) après $t_A$**, tous
deux sur un trait principal (cohérent avec la Q2-2-2 : $i=C\frac{du_C}{dt}<0$
entre $t_A$ et $t_B$) ; (c) profondeur du premier minimum — **maintenue** :
$\approx-8{,}5\ \text{V}$, soit légèrement **sous** le trait principal non chiffré
de $-8\ \text{V}$ ; la valeur n'est pas au trait, donc non affirmée.
**Autres relevés confirmés** : le niveau **7** est marqué par un **trait pointillé
bleu + son étiquette**, et **n'est pas un trait principal** (les traits principaux
chiffrés sont 4, 0 et $-4$ ; ceux de $\pm8$ existent, non chiffrés) ; axe des
abscisses non gradué, simple flèche « t » ; légende « Figure 3 ».

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points ; **Partie 2**
  = 2,5 points ($0{,}5+0{,}5+0{,}5+0{,}5+0{,}5$)
- Images lues (reproductibilité) : `.../course-422/upload-87489/0004-big.jpg`
  (énoncé), `.../0005-big.jpg` (suite + figure 3)
- Pages du scan : 4 (fin) et 5 (sur 6)
- Portée : **2- Décharge d'un condensateur dans un dipôle RL**, deuxième
  sous-partie de l'exercice III (même circuit, figure 1, que la **Partie 1
  — charge par générateur de courant**, transcrite sous `rc-charge.md`, où
  la figure 1 est décrite en détail). Classée ici (et non sous
  `dipole-rl.md`) car la bobine $(L, r)$ possède une résistance interne $r$
  non nulle et le circuit de décharge est le condensateur $C_0$ en série
  avec cette bobine : la courbe obtenue (figure 3) est une oscillation
  **pseudopériodique amortie**, comportement RLC série libre, pas un régime
  RL du premier ordre. Même intitulé et même montage physique que le
  précédent trouvé dans la banque : **2020 N Exercice IV Partie II**, « II -
  Décharge d'un condensateur dans un dipôle RL », déjà classé sous
  `rlc-serie.md` ci-dessus — précédent direct pour ce classement.

**2- Décharge d'un condensateur dans un dipôle RL**

Lorsque la tension entre les bornes du condensateur prend la valeur
$u_C = U_0 = 10\ \text{V}$, on bascule l'interrupteur $K$ en position (2) à
un instant pris comme nouvelle origine des dates $(t_0 = 0)$. Un système
d'acquisition informatisé adéquat permet d'obtenir la courbe représentant la
tension $u_C(t)$ (figure 3).

1. **2-1.** (0,5) Établir l'équation différentielle vérifiée par $u_C(t)$.
2. **2-2.** En exploitant la courbe de la figure 3, déterminer :
   1. **2-2-1.** (0,5) la valeur de la pseudopériode des oscillations.
   2. **2-2-2.** (0,5) le signe de l'intensité du courant $i$ entre l'instant
      $t_A$ et l'instant $t_B$.
3. **2-3.** (0,5) Montrer que : $\dfrac{dE_T}{dt} = -r.i^2$, avec $E_T$
   l'énergie totale du circuit à un instant $t$.
4. **2-4.** (0,5) Calculer $|E_{th}|$ l'énergie dissipée par effet Joule dans
   le circuit entre les instants $t = 0$ et $t = t_A$.

*Figure 3 (courbe) :* $u_C\ (\text{V})$ en fonction de $t$ (axe non chiffré
en unité, flèche horizontale simple « t »), sur quadrillage à double
graduation (traits principaux noirs, sous-quadrillage fin bleu). Le cadre
compte **10 divisions principales** en abscisse. Axe des ordonnées : traits
principaux chiffrés $4$, $0$ et $-4$ (une division $=4\ \text{V}$ ; les traits
principaux de $+8$ et $-8$ existent mais ne sont pas chiffrés) ; le niveau
$u_C = 7$ n'est **pas** un trait principal — il est matérialisé par un **trait
pointillé horizontal bleu** portant l'étiquette « 7 ».

Oscillation pseudopériodique d'amplitude **décroissante**, dont **tous les
extremums tombent sur un trait principal, un trait sur deux** :
- à $t = 0$ (sur l'axe des ordonnées) : **maximum initial $u_C = 10\ \text{V}$**
  (2,5 divisions au-dessus de $0$) — c'est le $U_0$ de l'énoncé ;
- division 1 : passage par zéro descendant ;
- division 2 : **premier minimum, le plus profond du tracé**, un peu au-dessous
  du trait principal non chiffré de $-8\ \text{V}$ (≈ $-8{,}5\ \text{V}$ —
  *valeur non située sur un trait : lecture à confirmer*) ;
- division 4 : **deuxième maximum, qui touche exactement le pointillé
  $u_C = 7$** ; c'est ce maximum que repère l'abscisse **$t_A$** (trait vertical
  pointillé descendant jusqu'à l'axe, où il est étiqueté « $t_A$ ») ;
- division 5 : **$t_B$**, étiqueté de la même façon sous l'axe — c'est le
  **passage par zéro descendant** qui suit $t_A$, soit exactement une division
  ($T/4$) plus loin ;
- division 6 : deuxième minimum, moins profond que le premier (≈ $-6\ \text{V}$ —
  *hors trait : lecture à confirmer*) ;
- division 8 : troisième maximum, plus bas que celui de $t_A$ (≈ $4{,}8\ \text{V}$ —
  *hors trait : lecture à confirmer*) ;
- division 9 : passage par zéro descendant ; division 10 : **troisième minimum,
  au bord droit du cadre — le tracé s'arrête là** (il n'y a pas de maximum
  au-delà).

Un repère à **double flèche horizontale**, étiqueté « $7 \cdot 10^{-5}\ \text{s}$ »
et tracé au-dessus de la courbe, s'étend **exactement d'un trait principal au
suivant** (de la verticale de $t_B$ à la suivante) : c'est **l'étalon de
graduation de l'axe des temps — une division vaut $7 \cdot 10^{-5}\ \text{s}$** —
et non la pseudopériode. La pseudopériode se lit donc **entre deux maxima
consécutifs, soit 4 divisions** :
$T = 4 \times 7\cdot10^{-5} = 2{,}8\cdot10^{-4}\ \text{s}$ (lecture au trait,
non estimée ; recoupée par $T_0 = 2\pi\sqrt{LC_0} = 2{,}81\cdot10^{-4}\ \text{s}$
avec $C_0 = 1\ \mu\text{F}$ et $L = 2\ \text{mH}$, la valeur que le sujet donne
lui-même en Partie 3 pour la même bobine (b)). Légende : « Figure 3 ».

---

## 2024 — session normale — Exercice 4 (Partie 1)
Source: https://www.alloschool.com/element/145763
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-87465, page(s) 4–5. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS28F · Barème de l'exercice complet : 3,5 points ; **Partie 1**
  = 2,0 points ($0{,}25+0{,}5+0{,}5+0{,}75$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0004-big.jpg`
  (chapeau, données, figures 1–2), `.../0005-big.jpg` (questions 1-1 à 1-4)
- Pages du scan : 4 et 5 (sur 6)
- Portée : **Partie 1 — Décharge d'un condensateur dans un dipôle RL**
  (oscillations libres, amortissement, énergétique). Classée ici (et non
  sous `dipole-rl.md`) car le circuit est un condensateur $C$ en série avec
  une bobine $(L,r)$ (résistance interne non nulle) et un conducteur ohmique
  $R$ : la courbe obtenue (figure 2) est une oscillation pseudopériodique
  amortie — comportement RLC série libre, pas un régime RL du premier ordre.
  Même intitulé et même montage physique que les précédents déjà classés
  ici : **2020 N Exercice IV Partie II** et **2025 N Exercice 3 Partie 2**
  (« Décharge d'un condensateur dans un dipôle RL »), tous deux sous
  `rlc-serie.md` — précédent direct pour ce classement. La **Partie 2
  (réponse d'un dipôle RL à un échelon de tension)**, qui suit dans le même
  exercice, est sous `dipole-rl.md`. Reste dans le périmètre du cadre
  `rlc_serie` (cf. rappel en tête de fichier) : aucune formule de
  pseudo-période n'est demandée ici, seulement l'équation différentielle et
  l'interprétation énergétique du régime amorti.

**EXERCICE 4 (3,5 points) : Electricité.**

*(Cadrage de l'exercice, transcrit intégralement : « Dans les circuits
électriques, une bobine peut se comporter comme un conducteur ohmique ou
différemment selon le type du courant électrique utilisé et les
condensateurs peuvent stocker de l'énergie et la restituer en cas de
besoin. »)*

On se propose dans cet exercice d'étudier :
- la décharge d'un condensateur dans un dipôle RL,
- la réponse d'un dipôle RL à un échelon de tension.

**1- Décharge d'un condensateur dans un dipôle RL.**

Le circuit électrique de la figure 1 comporte :
- un condensateur de capacité $C = 0{,}22\ \text{nF}$,
- une bobine $(b)$ d'inductance $L$ et de résistance $r$,
- un conducteur ohmique de résistance $R$ ajustable,
- un interrupteur $K$.

Le condensateur est initialement chargé totalement par un générateur de
tension idéale de force électromotrice $E$. On ajuste la résistance $R$ à
une valeur $R = R_0$. On ferme l'interrupteur $K$ à l'instant $t = 0$.

La courbe de la figure 2 représente l'évolution temporelle de la tension
$u_C(t)$ aux bornes du condensateur.

1. **1-1.** (0,25) Expliquer de point de vue énergétique l'amortissement
   observé des oscillations dans le circuit.
2. **1-2.** (0,5) Établir l'équation différentielle vérifiée par la tension
   $u_C(t)$ aux bornes du condensateur.
3. **1-3.** (0,5) Indiquer, en justifiant, dans quel dipôle est
   principalement emmagasinée l'énergie totale de l'oscillateur à l'instant
   $t_1$ puis à l'instant $t_2$ (figure 2).
4. **1-4.** (0,75) Calculer $E_j = |\Delta E_t|$ l'énergie dissipée par
   effet Joule dans le circuit entre les instants $t = 0$ et $t = t_2$.

*Figure 1 (schéma, circuit RLC série) :* boucle rectangulaire. Coin
haut-gauche : interrupteur $K$ (symbole d'interrupteur ouvert). Branche
supérieure : conducteur ohmique de résistance $R$ réglable (rectangle
traversé d'une flèche oblique, symbole rhéostat), étiqueté « R » en
dessous. Branche gauche (verticale) : condensateur $C$ (deux traits
parallèles), étiqueté « C » à gauche, avec une flèche $u_C$ orientée vers le
haut à côté. Branche droite (verticale) : bobine dessinée en spires,
étiquetée « (L,r) » à gauche du symbole et « (b) » à droite. Branche
inférieure : simple fil refermant la boucle. Légende : « Figure 1 ».

*Figure 2 (courbe) :* $u_C\ (\text{V})$ en fonction de $t$ (axe non chiffré
en unité, flèche horizontale simple « t »). Axe des ordonnées gradué (traits
principaux chiffrés) $2$ et $-2$, origine $0$ ; quadrillage secondaire fin.
Oscillation pseudopériodique d'amplitude **décroissante** : la courbe part,
à $t = 0$, d'une valeur non chiffrée proche du bord supérieur du cadre,
au-dessus du repère $2$ *(lecture à confirmer)*, décroît, coupe l'axe des
abscisses en un point marqué par un trait vertical en pointillés court
étiqueté « $t_1$ » (juste après $t=0$), continue de décroître jusqu'à un
premier minimum en deçà du repère $-2$ *(valeur non chiffrée, lecture à
confirmer)*, remonte à un maximum local (plus bas que le point de départ,
autour de $3$ *(lecture à confirmer)*), redescend jusqu'à un second minimum
— moins profond que le premier — marqué par un trait vertical en
pointillés-tirets étiqueté « $t_2$ » (au niveau de ce second minimum),
remonte ensuite à un nouveau maximum local (plus bas que le précédent),
avant de sortir du cadre en fin de tracé. Les amplitudes successives
diminuent régulièrement d'un extremum au suivant, signature de
l'amortissement. Légende : « Figure 2 ».

---

## 2023 — session normale — Exercice 3, §2 (Circuit oscillant LC)
Source: https://www.alloschool.com/element/142476
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-85304, page(s) 4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image : « شعبة العلوم
  التجريبية مسلك العلوم الفيزيائية (خيار فرنسية) » = Sciences Physiques,
  BIOF, option française — le résumé HTML d'AlloSchool pour `element/142476`
  annonce à tort « Sciences Mathématiques B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ; **§2** =
  1,5 point ($0{,}25+0{,}5+0{,}75$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-85304/0004-big.jpg`
- Pages du scan : 4 (sur 6)
- Portée : **§2 — Circuit oscillant LC**, réutilisant la bobine $(b)$ du §1
  (`dipole-rl.md`). Le **§3** (modulation d'amplitude) du même exercice est
  sous `ondes-em-modulation.md`. Régime respecté : circuit LC pur (pas de
  conducteur ohmique dans la boucle), cas non amorti au programme (cf.
  rappel de périmètre en tête de fichier).

**2- Circuit oscillant LC**

On réalise un circuit oscillant LC en associant la bobine (b) précédemment
utilisée avec un condensateur de capacité $C$ chargé totalement par un
générateur de tension de force électromotrice $E_0$ (figure 3).

1. **2-1.** (0,25) Établir l'équation différentielle vérifiée par la
   tension $u_C(t)$ entre les bornes du condensateur.
2. **2-2.** La courbe de la figure 4 représente les variations de la
   tension $u_C(t)$ en fonction du temps.
   1. **2-2-1.** (0,5) Trouver la valeur de la capacité $C$ du condensateur.
      (On prend $\pi^2 = 10$).
   2. **2-2-2.** (0,75) Trouver l'énergie magnétique $E_m$ emmagasinée dans
      la bobine à l'instant $t = 1{,}8\ \text{ms}$.

*Figure 3 (schéma) :* boucle rectangulaire. Branche gauche : condensateur
$C$ (deux traits parallèles, étiqueté « C »). Branche supérieure : fil
portant la flèche de courant $i$ orientée vers la droite. Branche droite
(verticale) : bobine $(b)$ dessinée en spires. Branche inférieure : simple
fil refermant la boucle. Légende : « Figure 3 ».

*Figure 4 (courbe) :* $u_C\ (\text{V})$ en fonction de $t\ (\text{ms})$, sur
quadrillage à double graduation (traits principaux, sous-quadrillage fin
bleu). Aucune valeur numérique n'est portée sur l'axe des ordonnées hormis
l'origine « $0$ » ; un repère combiné, placé près de l'origine, indique
l'échelle du quadrillage par une double flèche verticale étiquetée « 5V »
et une flèche horizontale étiquetée « 0,5 ms ». Axe des abscisses non
chiffré en dehors de ce repère (flèche horizontale simple « t(ms) »).
Oscillation sinusoïdale d'amplitude apparemment constante : la courbe,
visible sur un peu plus d'une période et demie, part d'une valeur proche
d'un maximum juste après $t = 0$, redescend en franchissant l'axe des
abscisses (« 0 ») vers un premier minimum, remonte en franchissant à
nouveau l'axe vers un second maximum situé environ au tiers droit du cadre,
puis redescend vers un second minimum en fin de tracé *(positions
temporelles exactes des extremums non chiffrées sur l'axe — lecture à
confirmer, seules les échelles « 5V » / « 0,5 ms » sont des valeurs
imprimées)*. Légende : « Figure 4 ».

---

## 2022 — session normale — Exercice 3 (2. Oscillations libres dans un circuit RLC série)
Source: https://www.alloschool.com/element/136621
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-84516, page(s) 5 (fin)–6. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image ; le résumé HTML
  d'AlloSchool pour `element/136621` annonce à tort « Sciences Mathématiques
  B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 4,5 points ;
  **section 2 (oscillations RLC)** = 3,0 points ($0{,}25+0{,}5+0{,}5+0{,}5$
  pour 2.1, $0{,}5+0{,}75$ pour 2.2, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-84516/0005-big.jpg`
  (fin, chapeau 2), `.../0006-big.jpg`
- Pages du scan : 5 (fin) et 6 (sur 8)
- Portée : **section 2 (oscillations libres dans un circuit RLC série)** de
  l'exercice 3. La **section 1 (réponse d'un dipôle RC à un échelon de
  tension)** du même exercice est sous `rc-charge.md` (même montage,
  figure 1, non reproduite ici).

**2. Oscillations libres dans un circuit RLC série**

Après avoir totalement chargé le condensateur de capacité
$C = 50\ \mu\text{F}$, on bascule l'interrupteur $K$ sur la position (2) à
un instant choisi comme nouvelle origine des dates $t = 0$. Ce condensateur
se décharge alors dans la bobine d'inductance $L$ et de résistance $r$
(figure 1).

**2.1. Premier cas :**

On suppose, dans ce cas, que la résistance de la bobine est négligeable.

1. **2.1.1.** (0,25) Montrer que l'équation différentielle vérifiée par la
   tension $u_C(t)$ s'écrit sous la forme :
   $\dfrac{d^2u_C}{dt^2} + \dfrac{1}{LC}u_C = 0$.
2. **2.1.2.** (0,5) Choisir, parmi les courbes $(C_1)$, $(C_2)$ et $(C_3)$
   de la figure 3, la courbe qui représente l'évolution de la tension
   $u_C(t)$. Justifier votre réponse.
3. **2.1.3.** La solution de l'équation différentielle précédente est :
   $u_C(t) = U_0\cos\!\left(\dfrac{2\pi}{T_0}t\right)$ où $U_0$ est la
   valeur maximale de la tension et $T_0$ la période propre des
   oscillations.
   1. **a-** (0,5) Trouver l'expression de $T_0$ en fonction de $L$ et $C$.
   2. **b-** (0,5) Montrer que la valeur de l'inductance est :
      $L = 0{,}05\ \text{H}$. (on prend $\pi^2 = 10$).

**2.2. Deuxième cas :**

En réalité, la résistance de la bobine n'est pas négligeable. On visualise
dans ce cas, à l'aide d'un système d'acquisition informatisé, les courbes
représentant l'évolution de la tension $u_C(t)$ aux bornes du condensateur
et celle de l'intensité du courant $i(t)$ qui traverse le circuit
(figure 4).

1. **2.2.1.** (0,5) Écrire l'expression de l'énergie totale $E_t$ du circuit
   en fonction de $C$, $u_C(t)$, $L$ et $i(t)$.
2. **2.2.2.** (0,75) En exploitant les courbes de la figure 4, trouver
   l'énergie $\Delta E$ dissipée dans le circuit entre les instants
   $t_0 = 0$ et $t_1 = 9\ \text{ms}$.

*Figure 3 (trois courbes $u_C\ (\text{V})$ en fonction de $t\ (\text{ms})$) :*
- **$(C_1)$** : axe des ordonnées gradué $12,\ 6,\ 0,\ -6,\ -12$ ; axe des
  abscisses gradué $5,\ 10,\ 15$. Oscillation sinusoïdale d'**amplitude
  constante** $\pm 12\ \text{V}$.
- **$(C_2)$** : axe des ordonnées gradué $10,\ 5,\ 0,\ -5,\ -10$ ; axe des
  abscisses gradué $5,\ 10,\ 15$. Oscillation sinusoïdale d'**amplitude
  constante** $\pm 10\ \text{V}$.
- **$(C_3)$** : axe des ordonnées gradué $12,\ 6,\ 0,\ -6,\ -12$ ; axe des
  abscisses gradué $2{,}5,\ 7{,}5,\ 12{,}5$. Oscillation d'**amplitude
  décroissante** (allure pseudopériodique amortie), extrema successifs de
  moins en moins marqués.

Légende commune : « Figure 3 ».

*Figure 4 (deux courbes côte à côte) :* à gauche, $i\ (\text{mA})$ en
fonction de $t\ (\text{ms})$ ; axe des ordonnées gradué
$200,\ 100,\ 0,\ -100,\ -200$ ; axe des abscisses gradué
$2{,}5,\ 5,\ 7{,}5,\ 10,\ 12{,}5$. Oscillation pseudopériodique d'amplitude
décroissante. À droite, $u_C\ (\text{V})$ en fonction de $t\ (\text{ms})$ ;
axe des ordonnées gradué $10,\ 5,\ 0,\ -5,\ -10$ ; mêmes graduations
d'abscisse ($2{,}5,\ 5,\ 7{,}5,\ 10,\ 12{,}5$). Oscillation pseudopériodique
d'amplitude décroissante, en phase avec la décroissance de $i(t)$. Légende :
« Figure 4 ».
