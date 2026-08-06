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
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-80870, page(s) 5-6. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan : « الفيزياء والكيمياء » / « شعبة العلوم التجريبية مسلك
  العلوم الفيزيائية (خيار فرنسية) »)
- Code sujet : NS 28F · Barème de l'exercice complet (Ex IV) : 5 points ·
  Barème de la portée RLC transcrite ici (parties II + III) : 3,5 points
- Images lues : `.../course-422/upload-80870/0005-big.jpg`,
  `.../0006-big.jpg` (et `0001-big.jpg` pour la couverture / le barème)
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

**Réponse d'un dipôle RL à un échelon de tension — II. Décharge d'un
condensateur dans un dipôle RL — III. Entretien des oscillations dans un
circuit RLC série.**

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

*Figure 3 (schéma) :* boucle série (même disposition que la figure 1 de la
partie I, avec $E$ remplacé par $C$) : coin haut-gauche, flèche $i$ vers la
droite ; branche haute = $R$ (rectangle) ; coin haut-droit → descend vers la
branche de droite = bobine $(L, r)$ (dessinée en spires) ; branche basse
referme le circuit vers le coin bas-gauche ; branche gauche (remontant vers
le coin haut-gauche) = condensateur $C$ (symbole à deux traits parallèles).

*Figure 4 (courbe) :* $u_C$ (V) en fonction de $t$ (ms) ; **aucune valeur
numérique** portée sur l'axe $u_C$ (seul le niveau $0$ est repéré) ; axe des
temps gradué avec repères $5, 10, 15, 20, 25$. Oscillation pseudopériodique
d'**amplitude décroissante** : la courbe part d'un maximum au voisinage de
$t=0$ (le plus haut de la courbe), descend à un premier minimum (le plus
profond de la courbe) au voisinage du repère $t=5$, remonte à un maximum
(plus bas que celui de départ) au voisinage du repère $t=10$, redescend à un
second minimum (moins profond que le premier) au voisinage du repère $t=15$,
remonte à un maximum (plus bas que celui de $t=10$) au voisinage du repère
$t=20$, puis redescend à un troisième minimum (le moins profond des trois) au
voisinage du repère $t=25$, avant de remonter en fin de tracé. Les extrema
successifs paraissent alignés sur les repères $5, 10, 15, 20, 25$, ce qui
donnerait une pseudo-période lisible $T \approx 10\ \text{ms}$ *(lecture à
confirmer)*.

*Figure 5 (schéma) :* même boucle série que la figure 3 (condensateur $C$ à
gauche, $R$ en haut avec flèche $i$, bobine $(L, r)$ à droite), mais la
branche basse porte en plus un générateur $G$ (cercle libellé « G ») inséré
en série entre le bas de la branche $C$ et le bas de la branche $(L, r)$.

*Figure 6 (courbe) :* $i$ (mA) en fonction de $t$ (ms) ; axe des ordonnées
gradué $8, 4, 0, -4, -8$ ; axe des temps gradué avec repères $5, 10, 15, 20,
25$, quadrillage secondaire fin (bleu). Sinusoïde d'**amplitude constante**,
oscillant entre $+8$ et $-8$ mA. À $t=0$, la courbe est légèrement **sous**
l'axe (valeur négative proche de $0$). Elle descend à un premier minimum
$-8\ \text{mA}$ un peu avant le repère $t=5$ *(lecture à confirmer)*, remonte
en coupant l'axe au voisinage du repère $t=5$, atteint un maximum $+8\
\text{mA}$ entre les repères $5$ et $10$ *(lecture à confirmer)*, redescend
en coupant l'axe au voisinage du repère $t=10$, atteint un minimum $-8\
\text{mA}$ entre $10$ et $15$ *(lecture à confirmer)*, remonte en coupant
l'axe au voisinage de $t=15$, atteint un maximum $+8\ \text{mA}$ entre $15$
et $20$ *(lecture à confirmer)*, redescend en coupant l'axe au voisinage de
$t=20$, atteint un minimum $-8\ \text{mA}$ entre $20$ et $25$ *(lecture à
confirmer)*, puis remonte en coupant l'axe au voisinage de $t=25$ et amorce
un nouveau maximum en fin de tracé. Le motif se répète avec une période
lisible $T_0 \approx 10\ \text{ms}$ (écart entre maxima/minima de même type
successifs) *(lecture à confirmer)*.
