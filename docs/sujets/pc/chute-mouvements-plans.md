# `chute-mouvements-plans` — Chutes verticales & mouvements plans (frottement fluide, projectile, champs)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2020 — session normale — Exercice V
Source: https://www.alloschool.com/element/109742
Statut: transcrit (non vérifié)

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
