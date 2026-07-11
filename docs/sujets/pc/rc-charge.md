# `rc-charge` — Dipôle RC (charge / décharge d'un condensateur)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2019 — session normale — Exercice III
Source: https://www.alloschool.com/element/68300
Statut: transcrit (non vérifié)

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

## 2018 — session normale — Exercice III (partie I-2)
Source: https://www.alloschool.com/element/57726
Statut: transcrit (non vérifié)

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
