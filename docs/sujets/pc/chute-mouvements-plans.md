# `chute-mouvements-plans` — Chutes verticales & mouvements plans (frottement fluide, projectile, champs)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2020 — session normale — Exercice V
Source: https://www.alloschool.com/element/109742
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice : 2,5 points
- Images lues : `.../course-422/upload-80870/0007-big.jpg`
- Pages du scan : 7 (sur 7)

**Étude du mouvement de chute verticale d'une bille dans un liquide visqueux.**

On se propose d'étudier le mouvement de la chute verticale, avec frottement
fluide, dans un liquide visqueux d'une bille homogène de masse $m$.

À l'aide d'une caméra numérique et d'un logiciel adéquat, on suit l'évolution de
la vitesse du centre d'inertie $G$ de la bille lors de sa chute verticale dans un
liquide visqueux.

On étudie le mouvement de $G$ dans un référentiel terrestre supposé galiléen.

On repère la position de $G$, à chaque instant $t$, par son ordonnée $y$ sur
l'axe vertical $(O, \vec{j})$ orienté vers le bas (figure 1).

Les forces de frottement fluide exercées sur la bille sont modélisées par la
force : $\vec{f} = -k\,v\,\vec{j}$ ; avec $v$ la vitesse instantanée de $G$ et $k$
une constante positive.

On néglige la poussée d'Archimède par rapport aux autres forces exercées sur la
bille.

**Données :**
- accélération de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- $m = 2{,}5 \cdot 10^{-2}\ \text{kg}$.

1. (0,5) En appliquant la deuxième loi de Newton sur la bille, montrer que
   l'équation différentielle du mouvement du centre d'inertie $G$ s'écrit :
   $\dfrac{dv}{dt} + \dfrac{k}{m}\,v = g$.
2. (0,25) Trouver l'expression de la vitesse limite $v_\ell$ de $G$ en fonction
   de $g$, $m$ et $k$.
3. (0,25) La courbe de la figure 2 représente l'évolution de la vitesse $v$ du
   centre d'inertie $G$ de la bille. Déterminer graphiquement la valeur de
   $v_\ell$.
4. (0,5) Vérifier que, dans le système international d'unités, l'équation
   différentielle du mouvement de $G$ s'écrit ainsi :
   $\dfrac{dv}{dt} = 10 - 6{,}67\,v$.
5. À l'aide des données du tableau ci-contre et de la méthode d'Euler, calculer :
   1. (0,5) l'accélération $a_1$ à l'instant $t_1$.
   2. (0,5) la vitesse $v_3$ à l'instant $t_3$ sachant que le pas de calcul est :
      $\Delta t = 0{,}015\ \text{s}$.

   | $t$ | $v\ (\text{m.s}^{-1})$ | $a\ (\text{m.s}^{-2})$ |
   |-----|:----------------------:|:----------------------:|
   | / | / | / |
   | $t_1$ | 0,150 | $a_1 = \ldots$ |
   | $t_2$ | 0,285 | 8,10 |
   | $t_3$ | $v_3 = \ldots$ | / |

*Figure 1 (schéma) :* axe vertical $(O, \vec{j})$ orienté vers le bas ; la bille
(centre $G$) tombe dans le liquide visqueux le long d'une règle graduée ;
ordonnée $y$ croissante vers le bas.

*Figure 2 (courbe) :* $v\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$ ;
courbe croissante depuis $0$ vers un palier (vitesse limite) au voisinage de
$v_\ell \approx 1{,}5\ \text{m.s}^{-1}$ *(lecture d'échelle à confirmer)* ;
ordonnées graduées $0{,}3,\ 0{,}6,\ 0{,}9,\ 1{,}2,\ 1{,}5$ ; abscisses graduées
$0{,}15,\ 0{,}3,\ 0{,}45,\ 0{,}6$.

---

## 2019 — session normale — Exercice IV (Partie II)
Source: https://www.alloschool.com/element/68300
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-422/upload-54757, page(s) 6–7. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice IV : 5 points (Partie I — plan
  incliné / force motrice / 2ème loi, non transcrite ici, voir
  `lois-de-newton.md` : 3 points ; Partie II — saut/projectile, transcrite
  ici : 2 points)
- Images lues : `.../course-422/upload-54757/0006-big.jpg, 0007-big.jpg`
- Pages du scan : 6–7 (sur 7)
- Mojibake : aucun

*Thème : mouvement plan dans le champ de pesanteur uniforme — projectile
après un tremplin (sans frottement).*

**Mouvement du centre d'inertie d'un système mécanique.**

**Contexte (page 6, tel que lu — la phrase d'introduction du système (S)
figure en page 5, non relue pour cette entrée, hors périmètre ; cf.
`lois-de-newton.md` pour la Partie I complète) :**

Cette piste est formée :
- d'une partie rectiligne A'B' inclinée d'un angle β par rapport à
  l'horizontale ;
- d'un tremplin B'C' circulaire ;
- d'une zone d'atterrissage (π) plane et horizontale. (figure 1).

Dans tout l'exercice, les frottements sont négligés et l'étude du mouvement
du centre d'inertie G est réalisée dans le référentiel terrestre considéré
comme galiléen.

**Données :**
- L'angle $\beta = 10°$ ;
- Intensité de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- Masse du système (S) : $m = 190\ \text{kg}$.

> **Figure 1 (description d'après le scan)** : schéma de la piste complète,
> en trois éléments raccordés. À gauche, un plan incliné rectiligne A'B'
> faisant un angle β avec l'horizontale (angle marqué à la base de la
> pente) ; sur ce plan, une moto avec son pilote (le système (S)) est
> dessinée en position initiale, avec le point A en haut de la pente
> (portant le vecteur $\vec{i}$ orienté le long du plan incliné, dans le
> sens de la descente) et le centre d'inertie G marqué sur le véhicule ; le
> bas de la pente est noté A' (sommet côté pente) et se prolonge vers B'
> (base réelle de la piste), avec un point B situé sur l'horizontale en
> pointillés servant de référence. Un tremplin B'C' de forme courbe
> (circulaire) relève ensuite la trajectoire de B' jusqu'au point C. Au
> point C est défini le repère local $(C, \vec{i_1}, \vec{j_1})$ —
> $\vec{j_1}$ vertical vers le haut, $\vec{i_1}$ horizontal — et le vecteur
> vitesse $\vec{V_C}$ y fait l'angle α avec l'horizontale ($\vec{i_1}$). Une
> trajectoire en arc pointillé part de C, survole un axe horizontal gradué
> noté « x », et retombe au point P, situé sur la zone d'atterrissage (π)
> représentée par une bande horizontale épaisse à droite du schéma. Un
> repère vertical global (origine au-dessus de C, axe « y ») surmonte la
> figure, apparemment pour fixer l'orientation d'ensemble du schéma.
> Légende : « Figure 1 ».

*(Partie I — « Étude du mouvement sur la partie A'B' » : plan incliné,
force motrice constante, deuxième loi de Newton — déjà transcrite sous
`lois-de-newton.md`, non reprise ici.)*

**II- Etude du mouvement de G lors de la phase du saut**

A un instant choisi comme nouvelle origine des dates (t = 0), le système (S)
quitte le tremplin lors du passage de G par le point C avec une vitesse
$\vec{V_C}$ formant un angle $\alpha = 18°$ avec l'horizontale. (S) retombe
en une position où le point G se confond avec le point P. On suppose que le
système n'est soumis qu'à son poids au cours de cette phase. L'étude du
mouvement est effectuée dans le repère orthonormé $(C, \vec{i_1},
\vec{j_1})$ indiqué sur la figure 1.

1. (0,5) En appliquant la deuxième loi de Newton, montrer que les équations
   différentielles vérifiées par les coordonnées $x_G(t)$ et $y_G(t)$ du
   centre d'inertie G dans le repère $(C, \vec{i_1}, \vec{j_1})$ s'écrivent
   ainsi : $\dfrac{dx_G}{dt} = V_C.\cos\alpha$ et $\dfrac{dy_G}{dt} =
   -g.t + V_C.\sin\alpha$
2. (0,5) Les expressions numériques des équations horaires $x_G(t)$ et
   $y_G(t)$ du mouvement de G s'écrivent ainsi : $x_G(t) = 19{,}02.t$ et
   $y_G(t) = -5.t^2 + 6{,}18.t$ ($x_G$ et $y_G$ exprimées en mètre et $t$
   en seconde). Vérifier que la vitesse de G au point C est :
   $V_C = 20\ \text{m.s}^{-1}$.
3. On considère qu'un saut est réussi si la condition $CP \geq 30\ \text{m}$
   est vérifiée.
   1. (0,5) Montrer que le saut effectué dans ce cas n'est pas réussi.
   2. (0,5) Déterminer la vitesse minimale $V_{min}$ avec laquelle doit
      passer G par le point C pour que le saut soit réussi.

---

## 2021 — session normale — Exercice V
Source: https://www.alloschool.com/element/127287
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-422/upload-84195, page(s) 7–8. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28F · Barème de l'exercice : 2,75 points (exercice complet)
- Images lues : `.../course-422/upload-84195/0007-big.jpg, 0008-big.jpg`
- Pages du scan : 7–8 (sur 8)
- Mojibake : aucun

*Thème : chute verticale avec frottement fluide quadratique — mouvement
d'un parachutiste (chute libre puis régime avec frottement en $v^2$).*

**EXERCICE V (2,75 points) — Étude du mouvement d'un parachutiste.**

*Le parachute est un dispositif destiné, après son ouverture, à freiner le
mouvement d'un parachutiste en chute verticale dans l'air.*

Cet exercice se propose d'étudier un modèle simplifié du mouvement d'un
parachutiste. Ce dernier se laisse tomber sans vitesse initiale d'un
hélicoptère en vol stationnaire situé à une hauteur h au-dessus du sol. On
étudie le mouvement du centre d'inertie G du système (S), constitué d'un
parachutiste équipé de son parachute, dans le repère $(O, \vec{k})$ lié à
un référentiel terrestre considéré comme galiléen (figure 1). On considère
que la trajectoire de G est verticale et que l'accélération de la
pesanteur reste constante.

**Données :**
- La masse du système (S) : $m = 100\ \text{kg}$ ;
- Accélération de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- La hauteur h : $h = 660\ \text{m}$.

Le mouvement du système s'effectue en deux phases.

**1) Phase 1 : parachute fermé**

Le parachutiste se laisse tomber de l'hélicoptère sans vitesse initiale à
un instant choisi comme origine des dates $t = 0$. La chute se fait
durant cette phase avec le parachute fermé. On modélise l'évolution de la
vitesse du centre d'inertie G du système (S) durant cette phase par la
courbe de la figure 2.

1. (0,5) Quelle est la nature du mouvement de G ? justifier votre réponse.
2. (0,5) Peut-on considérer que le mouvement du parachutiste, durant cette
   phase, est une chute libre ? Justifier votre réponse.

**2) Phase 2 : parachute ouvert**

Le parachutiste ouvre son parachute après une durée $\Delta t_1 = 4\ \text{s}$
depuis le début de sa chute. On choisit l'instant d'ouverture du
parachute comme nouvelle origine des dates pour cette phase. Durant cette
phase, le système est soumis à son poids et aux frottements de l'air
modélisés par une force de contact $\vec{F} = -\alpha.v^2.\vec{k}$ avec $v$
la vitesse de G et $\alpha$ une constante positive. On modélise
l'évolution de la vitesse de G durant cette phase par la courbe de la
figure 3.

1. (0,5) Montrer que l'équation différentielle vérifiée par la vitesse $v$
   s'écrit : $\dfrac{dv}{dt} + \dfrac{\alpha}{m}.v^2 = g$.
2. (0,25) Trouver l'expression de la vitesse limite $V_\ell$ du mouvement
   en fonction de $m$, $g$ et $\alpha$.
3. (0,25) Déterminer graphiquement $V_\ell$.
4. (0,25) En déduire la valeur de $\alpha$.

3) (0,5) Sachant que la durée totale du mouvement de G depuis le début de
la chute jusqu'à l'arrivée au sol est $\Delta t = 70\ \text{s}$, trouver la
distance $d$ parcourue par G durant le régime initial de la phase 2.

> **Figure 1 (description d'après le scan)** : schéma vertical. En haut,
> l'origine O avec le vecteur $\vec{k}$ orienté vers le bas ; à côté, un
> dessin illustre un hélicoptère en vol stationnaire d'où un personnage se
> laisse tomber (illustrant la phase de chute libre) ; plus bas sur le même
> axe, un second dessin illustre un parachutiste avec son parachute ouvert
> (illustrant la phase de freinage) ; tout en bas de l'axe, le repère se
> termine par le label « z » accompagné d'une flèche pointant vers le bas,
> confirmant que l'axe $(O, \vec{k})$ est orienté vers le bas. Légende :
> « Figure 1 ».

> **Figure 2 (courbe, phase 1) (description d'après le scan)** :
> $v\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$. Droite passant par
> l'origine, croissante, d'allure rectiligne (mouvement uniformément
> accéléré) ; ordonnées graduées $10,\ 20,\ 30$ ; abscisses graduées
> $1,\ 2,\ 3$ ; la droite passe approximativement par
> $(3\ \text{s},\ 30\ \text{m.s}^{-1})$ *(lecture à confirmer pour les
> valeurs intermédiaires)*.

> **Figure 3 (courbe, phase 2) (description d'après le scan)** :
> $v\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$. Courbe décroissante
> depuis une valeur initiale proche de $44\ \text{m.s}^{-1}$ *(lecture à
> confirmer)*, décroissance rapide puis aplatissement vers un palier
> (vitesse limite) au voisinage de $5$–$6\ \text{m.s}^{-1}$ *(lecture à
> confirmer)* ; une ligne verticale en pointillés sépare la courbe en deux
> zones annotées « Régime initial » (à gauche) et « Régime permanent » (à
> droite), la séparation se situant au voisinage de $t \approx 30\ \text{s}$
> *(lecture à confirmer)* ; ordonnées graduées $10,\ 20,\ 30,\ 40$ ;
> abscisses graduées $10,\ 20,\ 30,\ 40,\ 50$.

---

## 2018 — session normale — Exercice IV (Partie I)
Source: https://www.alloschool.com/element/57726
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-422/upload-45118, page(s) 6–7. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice IV : 5,5 points (Partie I —
  chute verticale, transcrite ici : 3,5 points ; Partie II — oscillateur
  solide-ressort, non transcrite ici, voir `systemes-oscillants.md` :
  2 points)
- Images lues : `.../course-422/upload-45118/0006-big.jpg, 0007-big.jpg`
- Pages du scan : 6–7 (sur 8)
- Mojibake : aucun

*Thème : chute verticale avec frottement fluide linéaire et poussée
d'Archimède non négligeable — bille dans un liquide visqueux (méthode
d'Euler).*

**EXERCICE IV (5,5 points) — Étude du mouvement de chute verticale d'une
bille dans un liquide visqueux.**

*Les parties I et II sont indépendantes.*

**Partie I- Étude du mouvement de chute verticale d'une bille dans un
liquide visqueux**

Afin de déterminer quelques caractéristiques du mouvement de chute d'une
bille dans un liquide visqueux, on réalise l'expérience suivante :

On remplit une éprouvette graduée par un liquide visqueux et transparent,
de masse volumique ρ, puis on libère, sans vitesse initiale dans ce
liquide, une bille de masse $m = 2.10^{-2}\ \text{kg}$, de volume $V$ et
de centre d'inertie G.

On étudie le mouvement du centre d'inertie G dans un repère $(O,
\vec{j})$ lié à un référentiel terrestre considéré comme galiléen. La
position instantanée du centre d'inertie G est repérée sur un axe
vertical $\overrightarrow{Oy}$ orienté vers le bas (figure 1). On
considère que la position de G à l'instant $t = 0$ est confondue avec
l'origine de l'axe $Oy$ et que la poussée d'Archimède $\vec{F_a}$ n'est
pas négligeable devant les autres forces.

La force de frottement fluide est modélisée par $\vec{f} = -k.\vec{v_G}$.
($\vec{v_G}$ étant le vecteur vitesse instantanée du centre d'inertie G et
$k$ une constante positive).

On rappelle que l'intensité de la poussée d'Archimède vaut le poids du
liquide déplacé : $F_a = \rho.V.g$, où $g$ est l'intensité de pesanteur.

Avec une caméra numérique et un logiciel adapté, on obtient, après
traitement des données expérimentales, la courbe des variations de la
vitesse instantanée du centre d'inertie de la bille en fonction du temps
(voir figure 2).

1. (1) En appliquant la deuxième loi de Newton, montrer que l'équation
   différentielle vérifiée par la vitesse s'écrit sous la forme :
   $\dfrac{dv_G}{dt} + \dfrac{1}{\tau}.v_G = A$, en précisant l'expression
   du temps caractéristique $\tau$ en fonction de $k$ et $m$ et
   l'expression de la constante $A$ en fonction de $g$, $m$, $\rho$ et
   $V$.
2. (0,5) Déterminer graphiquement la valeur de la vitesse limite
   $v_{Glim}$ et la valeur de $\tau$.
3. (1) Trouver la valeur de $k$ et celle de $A$.
4. (1) L'équation différentielle du mouvement de G s'écrit sous la forme
   numérique : $\dfrac{dv_G}{dt} = 9{,}26 - 18{,}52.v_G$.

   En utilisant la méthode d'Euler et les données du tableau suivant,
   calculer la valeur approchée de $a_3$ et celle de $v_4$.

   | $t\ (\text{s})$ | $v_G\ (\text{m.s}^{-1})$ | $a_G\ (\text{m.s}^{-2})$ |
   |:---:|:---:|:---:|
   | ⋮ | ⋮ | ⋮ |
   | 0,015 | 0,126 | $a_3$ |
   | 0,020 | $v_4$ | 6,28 |
   | 0,025 | 0,192 | 5,70 |

*(Partie II — « Étude énergétique d'un oscillateur mécanique
(solide-ressort) » : hors périmètre de ce slug, déjà transcrite sous
`systemes-oscillants.md`, non reprise ici.)*

> **Figure 1 (description d'après le scan)** : schéma d'une éprouvette
> graduée verticale, remplie d'un liquide visqueux et transparent (teinté
> en jaune sur le scan). En haut à gauche, le point O (origine) avec le
> vecteur $\vec{j}$ orienté vers le bas ; un cercle en pointillés est
> dessiné juste sous O, en haut du liquide (position initiale de la bille,
> à $t=0$) ; plus bas dans l'éprouvette, un disque noir plein représente
> la bille à un instant ultérieur de sa chute. En bas de l'axe, le label
> « y » avec une flèche vers le bas complète le repère $(O, \vec{j})$.
> Légende : « Figure 1 ».

> **Figure 2 (courbe) (description d'après le scan)** :
> $v_G\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{ms})$. Axe des
> ordonnées gradué $0{,}1\ ;\ 0{,}2\ ;\ 0{,}3\ ;\ 0{,}4\ ;\ 0{,}5$ ; axe des
> abscisses gradué $36\ ;\ 72\ ;\ 108\ ;\ 144$. Courbe croissante depuis
> l'origine, concave, tendant asymptotiquement vers un palier horizontal
> au voisinage de $v_{Glim} \approx 0{,}5\ \text{m.s}^{-1}$ *(lecture à
> confirmer)*. Une droite en pointillés, tangente à la courbe à l'origine,
> est tracée et coupe l'asymptote horizontale à une abscisse permettant de
> lire $\tau$ graphiquement (valeur non chiffrée sur le scan lui-même).
