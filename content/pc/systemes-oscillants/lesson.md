# Systèmes oscillants

---

## R0 — Accroche : le ressort qui ne s'arrête pas au repos

Imagine un chariot accroché à un ressort horizontal, posé sur une table presque sans frottement. Au repos, le chariot est immobile, le ressort ni étiré ni comprimé. Tu tires le chariot vers toi, tu l'écartes de quelques centimètres de sa position de repos, puis tu le lâches, sans vitesse initiale.

Avant de lire la suite, prends position : qu'est-ce que le chariot va faire, à ton avis ? Est-ce qu'il va revenir tout simplement vers sa position de repos et s'y arrêter — comme un objet qu'on relâche et qui retrouve son équilibre — ou bien va-t-il se passer autre chose ?

Beaucoup répondent : « il retourne au point de départ (l'équilibre) et s'arrête là, puisque c'est là que le ressort n'exerce plus aucune force. » C'est un raisonnement naturel — après tout, l'équilibre, c'est justement l'endroit où plus rien ne pousse.

Engage vraiment ta réponse avant de continuer.

[[checkpoint:cp-r0-predict]]

Maintenant regarde ce qui se passe réellement, avec un ressort dont le frottement est très faible. Le chariot revient vers l'équilibre — oui — mais il ne s'y arrête pas. Il **traverse** la position d'équilibre, file de l'autre côté, s'écarte presque autant qu'au départ, s'arrête un court instant, puis repart en sens inverse. Et ça continue : aller-retour, aller-retour, un mouvement de va-et-vient qui se répète, presque à l'identique à chaque cycle, encore et encore.

Ce n'est pas un retour au repos. C'est une **oscillation**.

Si tu as prédit l'arrêt à l'équilibre, ta prédiction et l'observation vont dans des directions opposées : ce point n'arrête pas le mouvement, c'est un point que le mouvement traverse, encore et encore. Et si tu avais vu juste, la vraie question commence maintenant.

Deux questions vont porter toute cette leçon :

**Qu'est-ce qui fixe la durée d'un aller-retour complet — et de quoi cette durée dépend-elle vraiment ?**

**Comment traduire ce va-et-vient en équation, pour le prévoir précisément, pas seulement le décrire ?**

Ne cherche pas encore la réponse — on va la construire pièce par pièce, avec la méthode que tu connais déjà : la deuxième loi de Newton.

---

## R1 — Le mécanisme : le pendule élastique horizontal, équation et période propre

### La force de rappel du ressort — et pourquoi elle est proportionnelle à x

Repère la position du chariot par $x$, l'écart algébrique entre sa position et la position d'équilibre — $x>0$ si le ressort est étiré, $x<0$ s'il est comprimé.

Un ressort, dans le domaine où il obéit à la loi de Hooke (pas trop étiré, pas trop comprimé), exerce sur le solide accroché une force qui vérifie deux propriétés simples : elle est toujours dirigée VERS l'équilibre (jamais dans le sens qui accentue l'écart — sinon le ressort n'aurait aucune tendance à ramener le solide), et son intensité est proportionnelle à l'écart $x$ : deux fois plus étiré, deux fois plus de force de rappel. On écrit cette force de rappel :

$$\vec{F}_{rappel} = -k\,x\,\vec{u}$$

où $\vec{u}$ est le vecteur unitaire de l'axe $(Ox)$ choisi dans le sens du mouvement, et $k$ (en N/m) est la **raideur** du ressort — une grande raideur signifie un ressort « dur », qui rappelle fort pour un petit écart. Le signe « $-$ » n'est pas un détail : c'est lui qui traduit le mot « rappel » — la force pointe toujours dans le sens opposé à $x$.

### Établir l'équation différentielle, avec la méthode déjà connue

On applique exactement la méthode du chapitre précédent : système, référentiel galiléen (le référentiel terrestre convient), bilan des forces, deuxième loi, repère, projection.

**Système :** le solide de masse $m$. **Référentiel :** terrestre, supposé galiléen. **Bilan des forces :** le poids $\vec{P}$ (vertical, vers le bas), la réaction normale de la table $\vec{N}$ (verticale, vers le haut), la force de rappel du ressort $\vec{F}_{rappel} = -k\,x\,\vec{u}$ (horizontale). Les frottements sont négligés dans un premier temps — on y reviendra en fin de leçon.

**Deuxième loi de Newton :**

$$\vec{P} + \vec{N} + \vec{F}_{rappel} = m\,\vec{a}_G$$

**Repère :** axe $(Ox)$ horizontal, dans le sens du mouvement, origine à la position d'équilibre. Comme le solide reste sur la table, le mouvement est purement horizontal — exactement comme pour la caisse tirée sur le sol (chapitre précédent) : la projection sur l'axe vertical donne $N = P$, et cette égalité ne joue aucun rôle dans le mouvement horizontal.

**Projection sur $(Ox)$ :** seule $\vec{F}_{rappel}$ a une composante horizontale.

$$-k\,x = m\,\ddot{x}$$

Ce qui se réécrit dans l'ordre standard :

$$\boxed{\ddot{x} + \frac{k}{m}\,x = 0}$$

C'est l'**équation différentielle de l'oscillateur harmonique**. Remarque quelque chose d'essentiel, qu'on va réutiliser tout au long de cette leçon : ni l'amplitude du lâcher ni la masse ne fixent, à elles seules, la forme de cette équation — seul le rapport $k/m$ y figure.

### Chercher la solution — on devine, puis on vérifie

L'équation dit que $\ddot{x}$ est proportionnel à $-x$ : la fonction et sa dérivée seconde ont la même forme, à un signe et un facteur près. C'est exactement la signature des fonctions trigonométriques, $\cos$ et $\sin$. On pose donc l'hypothèse — une supposition qu'on va vérifier, pas une certitude déjà acquise :

$$x(t) = X_m \cos(\omega_0 t + \varphi)$$

où $X_m$ est l'amplitude (toujours positive) et $\varphi$ la phase à l'origine. Vérifions que cette fonction satisfait bien l'équation, et voyons ce que ça impose sur $\omega_0$.

$$\dot{x}(t) = -X_m\,\omega_0\,\sin(\omega_0 t + \varphi)$$

$$\ddot{x}(t) = -X_m\,\omega_0^2\,\cos(\omega_0 t + \varphi) = -\omega_0^2\,x(t)$$

On substitue dans $\ddot{x} + \dfrac{k}{m}x = 0$ :

$$-\omega_0^2\,x + \frac{k}{m}\,x = 0$$

$$x\left(\frac{k}{m} - \omega_0^2\right) = 0$$

Cette égalité doit être vraie à CHAQUE instant $t$, alors que $x(t)$ n'est pas nul en général : c'est donc le facteur entre parenthèses qui doit s'annuler, pas $x$.

$$\omega_0^2 = \frac{k}{m} \quad \Longrightarrow \quad \omega_0 = \sqrt{\frac{k}{m}}$$

L'hypothèse est confirmée, à condition que $\omega_0$ prenne exactement cette valeur. On en déduit la **période propre** :

$$T_0 = \frac{2\pi}{\omega_0} = 2\pi\sqrt{\frac{m}{k}}$$

$T_0$ ne dépend que de $m$ et de $k$ — les deux seules grandeurs qui figurent dans l'équation différentielle. Rien d'autre n'y apparaît, donc rien d'autre ne peut apparaître dans $T_0$ : ni l'amplitude $X_m$, ni la phase $\varphi$. On y reviendra précisément dans le prochain chapitre.

[[figure:pendule-elastique]]

### Le pendule élastique, analogue mécanique du circuit LC

Si tu as déjà étudié le circuit RLC en régime libre, cette équation devrait te sembler familière. $\ddot{x} + \omega_0^2 x = 0$ est EXACTEMENT la même forme que celle du circuit LC idéal, $\ddot{q} + \dfrac{1}{LC}\,q = 0$ (avec $q$ à la place de $x$, et $\dfrac{1}{LC}$ à la place de $\dfrac{k}{m}$). Un pendule élastique est, mathématiquement, l'analogue exact d'un circuit LC oscillant : la masse $m$ joue le rôle de l'inductance $L$ (l'inertie du système, ce qui résiste à un changement brusque), et la raideur $k$ joue le rôle de l'inverse de la capacité $1/C$ (le rappel). Ce n'est pas une coïncidence de notation — c'est la même mathématique qui gouverne les deux phénomènes physiques, mécanique d'un côté, électrique de l'autre. On retrouvera cette parenté plus loin, pour l'énergie et pour l'amortissement.

### Exemple numérique

Prenons $k = 40\ \text{N/m}$ et $m = 0{,}40\ \text{kg}$.

$$\frac{k}{m} = \frac{40}{0{,}40} = 100\ \text{s}^{-2}$$

$$\omega_0 = \sqrt{100} = 10\ \text{rad/s}$$

$$T_0 = \frac{2\pi}{10} \approx 0{,}628\ \text{s}$$

Un aller-retour complet dure un peu plus d'une demi-seconde. Si on double la masse ($m=0{,}80\ \text{kg}$) sans changer $k$, $T_0$ devient $2\pi\sqrt{0{,}80/40} = 2\pi\sqrt{0{,}02}\approx 0{,}889\ \text{s}$ : le système est plus lent — plus d'inertie à mettre en mouvement, à raideur égale. Si on double $k$ au lieu de $m$, l'inverse se produit : le ressort plus raide rappelle plus fort, l'aller-retour se fait plus vite.

---

## R2 — Les grandeurs du mouvement : amplitude, phase, pulsation et période

Reprenons la solution qu'on vient de confirmer, et donnons un nom précis à chacun de ses ingrédients — parce que c'est exactement ici qu'une confusion fréquente s'installe.

$$x(t) = X_m \cos(\omega_0 t + \varphi)$$

- $X_m$ (en mètres) est l'**amplitude** : l'écart maximal entre le solide et sa position d'équilibre. $x(t)$ oscille entre $-X_m$ et $+X_m$.
- $(\omega_0 t + \varphi)$ (en radians) est la **phase à l'instant $t$** ; $\varphi$, sa valeur à $t=0$, est la **phase à l'origine**.
- $\omega_0$ (en rad/s) est la **pulsation propre** : elle mesure la vitesse à laquelle la phase avance, radian par radian, seconde après seconde.
- $T_0$ (en secondes) est la **période propre** : la durée d'un aller-retour complet — le temps au bout duquel $x(t)$, $\dot{x}(t)$ ET $\ddot{x}(t)$ reprennent exactement les mêmes valeurs.

### Ne pas confondre pulsation et fréquence

Voici le piège précis à éviter. La pulsation $\omega_0$ (en rad/s) N'EST PAS la fréquence $f_0$ (en Hz, c'est-à-dire en oscillations par seconde). Ce sont deux grandeurs différentes, reliées par un facteur $2\pi$ :

$$f_0 = \frac{1}{T_0} \qquad \text{et} \qquad \omega_0 = \frac{2\pi}{T_0} = 2\pi f_0$$

Teste-toi avant de continuer : reprends l'exemple du chapitre précédent, $\omega_0 = 10\ \text{rad/s}$. Est-ce que le système effectue dix oscillations par seconde ?

Non. $f_0 = \dfrac{\omega_0}{2\pi} = \dfrac{10}{2\pi} \approx 1{,}59\ \text{Hz}$ : un peu plus d'une oscillation et demie par seconde, pas dix. L'erreur classique consiste à lire directement la valeur numérique de $\omega_0$ comme si c'était une fréquence en Hz — alors que $\omega_0$ compte des radians par seconde, une unité d'angle, pas un nombre de cycles. Le facteur $2\pi$ (les radians parcourus en un cycle complet) sépare toujours les deux grandeurs. Pour convertir une pulsation en fréquence, ou une fréquence en pulsation, il faut TOUJOURS passer par ce facteur $2\pi$ — jamais les identifier terme à terme.

### Déterminer $X_m$ et $\varphi$ à partir des conditions initiales

$\omega_0$ (donc $T_0$) est fixée par $k$ et $m$ seuls — on vient de l'établir. $X_m$ et $\varphi$, en revanche, ne dépendent pas du ressort : ils dépendent de la façon dont on a LANCÉ le mouvement, c'est-à-dire des conditions initiales $x(0)$ et $v(0) = \dot{x}(0)$.

Il faut d'abord la vitesse $\dot{x}(t)$, déjà calculée en vérifiant l'hypothèse au chapitre précédent :

$$v(t) = \dot{x}(t) = -X_m\,\omega_0\,\sin(\omega_0 t + \varphi)$$

À l'instant $t=0$ :

$$x(0) = X_m \cos\varphi \qquad \qquad v(0) = -X_m\,\omega_0\,\sin\varphi$$

Deux équations, deux inconnues ($X_m$ et $\varphi$) : on peut les résoudre pour n'importe quelles conditions initiales.

### Exemple travaillé — deux lancers différents, même oscillateur

On reprend l'oscillateur du chapitre précédent : $k = 40\ \text{N/m}$, $m = 0{,}40\ \text{kg}$, $\omega_0 = 10\ \text{rad/s}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on va lancer le même système de deux façons différentes, pour bien voir que $X_m$ et $\varphi$ changent avec le lancer, alors que $\omega_0$ et $T_0$, eux, ne bougent pas.

**Premier lancer.** On écarte le chariot de $5\ \text{cm}$ ($x(0) = 0{,}05\ \text{m}$) et on le lâche sans vitesse initiale ($v(0)=0$).

$$v(0) = -X_m\,\omega_0\,\sin\varphi = 0 \quad \Longrightarrow \quad \sin\varphi = 0 \quad (\text{car } X_m \neq 0,\ \omega_0 \neq 0)$$

$\sin\varphi = 0$ donne $\varphi = 0$ ou $\varphi = \pi$. Comme $x(0) = X_m\cos\varphi = 0{,}05 > 0$ et qu'on choisit $X_m > 0$, il faut $\cos\varphi > 0$, donc $\varphi = 0$. Alors $x(0) = X_m\cos(0) = X_m$, donc :

$$X_m = 0{,}05\ \text{m} = 5\ \text{cm}$$

Un lâcher sans vitesse, depuis l'écart maximal : logiquement, l'écart de lâcher EST l'amplitude, et la phase à l'origine est nulle.

**Deuxième lancer.** Cette fois, on pousse le chariot au passage par l'équilibre ($x(0) = 0$), en lui donnant une vitesse $v(0) = -0{,}5\ \text{m/s}$ (vers les $x$ négatifs).

$$x(0) = X_m\cos\varphi = 0 \quad \Longrightarrow \quad \cos\varphi = 0 \quad \Longrightarrow \quad \varphi = \frac{\pi}{2} \text{ ou } \varphi = -\frac{\pi}{2}$$

$$v(0) = -X_m\,\omega_0\,\sin\varphi = -0{,}5$$

Avec $\varphi = \pi/2$ : $\sin\varphi = 1$, donc $v(0) = -X_m\,\omega_0 = -0{,}5$, soit $X_m = \dfrac{0{,}5}{\omega_0} = \dfrac{0{,}5}{10} = 0{,}05\ \text{m}$ — cohérent avec $v(0)<0$ demandé. On retient $\varphi = \dfrac{\pi}{2}$.

$$X_m = 5\ \text{cm}, \qquad \varphi = \frac{\pi}{2}$$

Le même oscillateur, lancé différemment, retrouve la même amplitude ici (une coïncidence des chiffres choisis) mais une phase différente : $\omega_0$ et $T_0$ n'ont pas changé d'un iota — ils appartiennent au ressort et à la masse, pas à la façon dont on a lancé le mouvement.

[[embed:ressort-sandbox]]

---

## R3 — Le pendule simple et le pendule pesant : l'isochronisme des petites oscillations

On change de système : plus de ressort, mais un fil (ou une tige) qui pivote autour d'un point fixe, sous l'effet de la pesanteur. Deux cas : le **pendule simple** (une masse ponctuelle au bout d'un fil inextensible et sans masse) et le **pendule pesant** (un solide quelconque, de forme et de répartition de masse arbitraires, qui pivote autour d'un axe fixe ne passant pas par son centre d'inertie).

### Prends position avant de calculer quoi que ce soit

Deux questions, à trancher honnêtement avant de voir le calcul.

**Question 1.** Deux pendules simples, même longueur de fil $L$, mais des masses différentes — une bille en acier, une bille en plastique. Lâchés du même angle, en même temps : lequel met le moins de temps pour un aller-retour complet ?

**Question 2.** Le même pendule simple, lâché une fois avec un petit angle (disons $5°$), une fois avec un angle un peu plus grand (disons $12°$, mais on reste dans les « petites oscillations ») : la période change-t-elle avec l'angle de lâcher ?

Beaucoup répondent « la bille en acier va plus vite, elle est plus lourde » à la première question — la même confusion masse/poids qu'en chute libre (chapitre précédent) — et « oui, plus grand angle, plus long trajet, donc plus de temps » à la seconde. Garde ces deux réponses en tête. Le calcul va trancher les deux à la fois.

### Établir l'équation du pendule simple

*Ce qu'on cherche ici, et pourquoi ce geste :* même méthode qu'au chapitre précédent (bilan, repère, projection), mais avec un repère adapté à la trajectoire circulaire : un axe tangent au mouvement, un axe perpendiculaire (radial). C'est la projection TANGENTIELLE qui va donner l'équation.

On repère la position par l'angle $\theta(t)$ entre le fil et la verticale (l'équilibre correspond à $\theta = 0$). Le point matériel, de masse $m$, décrit un arc de cercle de rayon $L$ ; son accélération tangentielle vaut $L\,\ddot{\theta}$ (exactement comme, pour une trajectoire rectiligne, l'accélération est $\ddot{x}$ — ici, c'est l'arc $L\theta$ qui joue le rôle de la position curviligne).

**Bilan des forces :** le poids $\vec{P} = m\vec{g}$ (vertical, vers le bas), la tension du fil $\vec{T}$ (le long du fil, vers le point fixe). La tension est purement RADIALE — elle n'a aucune composante tangentielle, donc elle n'intervient pas dans la projection qui suit.

**Deuxième loi de Newton, projetée sur l'axe tangentiel :** seule la composante tangentielle du poids agit. Quand le fil fait un angle $\theta$ avec la verticale, cette composante vaut $-mg\sin\theta$ (le signe « $-$ » traduit que le poids rappelle toujours vers $\theta = 0$, quel que soit le sens de l'écart).

$$m\,L\,\ddot{\theta} = -mg\sin\theta$$

Simplifions par $m$ — remarque bien que ça se fait des DEUX côtés, exactement comme la masse s'était simplifiée dans l'équation de la chute libre :

$$L\,\ddot{\theta} = -g\sin\theta \qquad \Longrightarrow \qquad \ddot{\theta} = -\frac{g}{L}\sin\theta$$

C'est l'équation EXACTE du pendule simple — mais ce n'est pas encore l'équation d'un oscillateur harmonique, à cause du $\sin\theta$.

[[figure:bilan-pendule-simple]]

### L'approximation des petites oscillations

Pour des angles petits (en pratique, en dessous d'une vingtaine de degrés), $\sin\theta \approx \theta$ (avec $\theta$ en radians) — c'est une approximation, valable seulement dans ce régime, pas un fait général. Avec cette approximation :

$$\boxed{\ddot{\theta} + \frac{g}{L}\,\theta = 0}$$

C'est exactement la même forme que l'équation du pendule élastique, $\ddot{x} + \dfrac{k}{m}x = 0$ — seuls les noms changent : $\theta$ au lieu de $x$, et $g/L$ au lieu de $k/m$. La solution est donc, par le même raisonnement de vérification qu'au chapitre précédent :

$$\theta(t) = \theta_m \cos(\omega_0 t + \varphi), \qquad \omega_0 = \sqrt{\frac{g}{L}}, \qquad T_0 = 2\pi\sqrt{\frac{L}{g}}$$

### Trancher les deux questions posées au début

Regarde ce qui figure dans l'équation $\ddot{\theta} + (g/L)\theta = 0$ et dans $T_0 = 2\pi\sqrt{L/g}$ : $L$ et $g$. C'est tout. La masse $m$ a disparu dès la troisième ligne du calcul — elle s'est simplifiée AVANT même qu'on parle de $T_0$. Une grandeur n'apparaît pas dans le résultat final si elle n'apparaît pas dans l'équation qui le gouverne : c'est le même argument qu'en chute libre, et le même qu'on ferait pour $R$ dans le circuit LC idéal.

**Réponse à la question 1 :** la bille en acier et la bille en plastique, même longueur de fil, ont exactement la même période. La masse ne joue aucun rôle — pas parce qu'elle est « négligeable », mais parce qu'elle s'annule EXACTEMENT dans le calcul.

**Réponse à la question 2 :** l'amplitude $\theta_m$ n'apparaît nulle part dans $T_0 = 2\pi\sqrt{L/g}$ non plus. Tant qu'on reste dans le régime des petites oscillations (là où $\sin\theta \approx \theta$ est valable), la période ne dépend pas de l'angle de lâcher. C'est ce qu'on appelle l'**isochronisme des petites oscillations** : $5°$ ou $12°$, même $T_0$, à condition de rester dans le domaine où l'approximation tient.

<!-- Note d'honnêteté (jamais dans le rendu) : au-delà des petites oscillations, T dépend légèrement de
     l'amplitude en réalité (le pendule n'est plus rigoureusement isochrone) — hors-programme ; la phrase
     ci-dessous nuance une seule fois, en toute honnêteté, sans laisser installer une fausse généralité. -->

Une précision honnête, pour ne pas transformer ce résultat en loi universelle : cette indépendance à l'amplitude n'est vraie QUE dans l'approximation des petites oscillations. Pour de grands angles, $\sin\theta$ s'écarte de $\theta$, l'équation n'est plus celle d'un oscillateur harmonique, et la période dépend alors un peu de l'amplitude — mais ce régime sort du cadre de ce chapitre.

### Le pendule pesant : un solide quelconque, pas un point

Le pendule simple suppose une masse ponctuelle. Un pendule RÉEL — une porte, une balançoire, le balancier d'une horloge — est un solide étendu, dont la masse est répartie sur tout son volume, pivotant autour d'un axe fixe $\Delta$ qui ne passe généralement pas par son centre d'inertie $G$. On appelle ça un **pendule pesant**.

La méthode change : on ne peut plus appliquer directement $\sum \vec{F}_{ext} = m\vec{a}_G$ à un point, puisque le solide tourne autour de $\Delta$. On utilise l'analogue rotationnel de la deuxième loi (vu au chapitre sur la rotation d'un solide autour d'un axe fixe) :

$$J_\Delta\,\ddot{\theta} = \sum M_\Delta(\vec{F}_{ext})$$

où $J_\Delta$ est le moment d'inertie du solide par rapport à l'axe $\Delta$ (en $\text{kg}\cdot\text{m}^2$), et $M_\Delta$ le moment de chaque force par rapport à cet axe. La réaction de l'axe passe par $\Delta$ : son moment est nul. Seul le poids produit un moment non nul, appliqué en $G$, à une distance $d = \Delta G$ de l'axe :

$$M_\Delta(\vec{P}) = -mgd\sin\theta$$

(le signe « $-$ » a exactement le même rôle que pour le pendule simple : un moment qui rappelle vers $\theta=0$). L'équation devient :

$$J_\Delta\,\ddot{\theta} = -mgd\sin\theta$$

Et, dans l'approximation des petites oscillations :

$$\ddot{\theta} + \frac{mgd}{J_\Delta}\,\theta = 0 \qquad \Longrightarrow \qquad T_0 = 2\pi\sqrt{\frac{J_\Delta}{mgd}}$$

Cette fois, la masse $m$ NE disparaît PAS forcément du résultat, parce que $J_\Delta$ dépend lui-même de $m$ et de la façon dont cette masse est répartie — le rapport $J_\Delta/(mgd)$ ne se simplifie pas en général. L'indépendance à la masse du pendule simple n'est donc pas une propriété universelle de « tout pendule » : c'est une conséquence du cas particulier où toute la masse est concentrée en un seul point.

### Vérification de cohérence : le pendule simple, cas particulier du pendule pesant

*Ce qu'on cherche ici, et pourquoi ce geste :* si la formule du pendule pesant est correcte, elle doit redonner exactement celle du pendule simple quand on l'applique à une masse ponctuelle — sinon l'une des deux formules serait fausse.

Pour une masse ponctuelle $m$ au bout d'un fil de longueur $L$ : le moment d'inertie par rapport à l'axe de pivot vaut $J_\Delta = mL^2$, et la distance à l'axe est $d = L$. On substitue dans la formule du pendule pesant :

$$T_0 = 2\pi\sqrt{\frac{J_\Delta}{mgd}} = 2\pi\sqrt{\frac{mL^2}{mgL}} = 2\pi\sqrt{\frac{L}{g}}$$

On retrouve exactement la formule du pendule simple — la masse $m$ se simplifie ici PARCE QUE $J_\Delta = mL^2$ est lui-même proportionnel à $m$. Ce n'est pas une coïncidence : c'est la vérification que les deux résultats sont cohérents entre eux, le pendule simple n'étant qu'un cas particulier (la masse concentrée en un point) du pendule pesant.

---

## R4 — Le pendule de torsion : la même équation, un autre contexte

Un dernier système, plus rapide à traiter parce que le travail est déjà fait : le **pendule de torsion**. Un solide (souvent un disque ou une barre) est suspendu par un fil vertical, fixé à ses deux extrémités. On fait tourner le solide d'un angle $\theta$ autour de l'axe du fil, puis on le lâche.

Le fil tordu se comporte comme un ressort, mais pour la rotation plutôt que pour la translation : il exerce un **moment de rappel** proportionnel à l'angle de torsion, et qui s'oppose toujours à cet angle :

$$M_{rappel} = -C\,\theta$$

où $C$ (en $\text{N}\cdot\text{m}/\text{rad}$) est la **constante de torsion** du fil — l'analogue exact de la raideur $k$ du ressort, mais pour un moment plutôt que pour une force.

On applique la même relation rotationnelle qu'au chapitre précédent, avec cette fois aucune autre force ne produisant de moment (le poids du solide et la réaction du fil passent par l'axe de rotation) :

$$J\,\ddot{\theta} = M_{rappel} = -C\,\theta$$

$$\boxed{\ddot{\theta} + \frac{C}{J}\,\theta = 0}$$

où $J$ est le moment d'inertie du solide par rapport à l'axe du fil. Encore une fois, la même forme d'équation — et donc, sans repasser par la vérification (elle est identique à celle du chapitre 2), la même famille de solution et de grandeurs :

$$\theta(t) = \theta_m\cos(\omega_0 t + \varphi), \qquad \omega_0 = \sqrt{\frac{C}{J}}, \qquad T_0 = 2\pi\sqrt{\frac{J}{C}}$$

### Ce qu'il faut retenir : un seul mécanisme, plusieurs habillages

Les systèmes étudiés obéissent tous à LA MÊME équation différentielle, $\ddot{X} + \omega_0^2 X = 0$ (avec $X$ une position ou un angle) — seuls les noms des grandeurs changent :

| Système | Grandeur $X$ | « Inertie » | « Rappel » | $\omega_0$ | $T_0$ |
|---|---|---|---|---|---|
| Pendule élastique | $x$ | $m$ | $k$ | $\sqrt{k/m}$ | $2\pi\sqrt{m/k}$ |
| Pendule simple | $\theta$ | — (s'annule) | $g/L$ | $\sqrt{g/L}$ | $2\pi\sqrt{L/g}$ |
| Pendule pesant | $\theta$ | $J_\Delta$ | $mgd$ | $\sqrt{mgd/J_\Delta}$ | $2\pi\sqrt{J_\Delta/(mgd)}$ |
| Pendule de torsion | $\theta$ | $J$ | $C$ | $\sqrt{C/J}$ | $2\pi\sqrt{J/C}$ |
| (Circuit LC, pour mémoire) | $q$ | $L$ | $1/C$ | $\sqrt{1/(LC)}$ | $2\pi\sqrt{LC}$ |

Ce n'est pas un hasard si la même équation revient à chaque fois : chaque système a une grandeur qui joue le rôle de « l'inertie » (résiste à la mise en mouvement) et une grandeur qui joue le rôle du « rappel » (ramène vers l'équilibre, proportionnellement à l'écart). Dès que ces deux ingrédients sont présents et qu'aucune autre force ou moment ne s'en mêle, l'équation — et donc le comportement sinusoïdal — est la même, qu'il s'agisse de mécanique ou d'électricité.

---

## R5 — Les aspects énergétiques : deux réservoirs d'énergie, en aperçu

Revenons au pendule élastique horizontal (sans frottement), et regardons où va l'énergie au cours du mouvement — exactement la question qu'on s'était posée pour le circuit RLC oscillant, dans le chapitre sur les oscillations électriques. Ce chapitre reste volontairement un aperçu : la démonstration complète, avec les diagrammes d'énergie détaillés, est le sujet du chapitre **Aspects énergétiques**, qui vient juste après celui-ci. Ici, l'objectif est plus modeste — mais indispensable pour comprendre ce qui suit : savoir OÙ se trouve l'énergie, à chaque instant, sans encore la démontrer en détail.

### Les deux réservoirs d'énergie

Le solide en mouvement possède une énergie cinétique :

$$E_c = \frac{1}{2}m\,v^2 = \frac{1}{2}m\,\dot{x}^2$$

Le ressort déformé stocke une énergie potentielle élastique :

$$E_{pe} = \frac{1}{2}k\,x^2$$

Retiens cette expression comme un résultat pour l'instant, pas encore comme quelque chose que tu as démontré : l'expression $\frac{1}{2}kx^2$, et la preuve que l'énergie mécanique $E_m = E_c + E_{pe}$ reste constante, sont établies au chapitre **Aspects énergétiques** ; ici, on ne s'en sert que pour suivre où va l'énergie.

### Le pendule d'énergie, à nouveau

Exactement comme dans le circuit RLC idéal, où l'énergie électrique du condensateur et l'énergie magnétique de la bobine s'échangeaient sans jamais disparaître, ici $E_c$ et $E_{pe}$ s'échangent en permanence :

- Quand $x = 0$ (passage par l'équilibre) : $E_{pe} = 0$, toute l'énergie est cinétique — c'est là que la vitesse est maximale.
- Quand $x = \pm X_m$ (écart maximal) : $\dot{x} = 0$ (le solide s'arrête un instant pour repartir en sens inverse), donc $E_c = 0$ — toute l'énergie est dans le ressort.

Entre ces deux instants, l'énergie ne disparaît pas et ne surgit pas de nulle part : elle **traverse** d'un réservoir à l'autre, exactement comme elle traversait entre le condensateur et la bobine. Les maxima de $E_c$ et de $E_{pe}$ sont en opposition de phase, décalés d'un quart de période — la même signature que $E_C$ et $E_L$ dans le circuit RLC.

[[figure:energie-oscillateur]]

Pour un pendule simple ou pesant, sans frottement, le même principe s'applique : $E_m = E_c + E_p$ voyage entre les deux réservoirs sans se perdre, où $E_p$ est cette fois l'énergie potentielle de PESANTEUR (et non élastique) — le mécanisme est identique, seule la nature de l'énergie potentielle change.

Cette image à deux réservoirs — une énergie qui voyage sans disparaître — est la clé pour comprendre ce qui suit : ce qui se passe quand une partie de cette énergie se met à FUIR (l'amortissement, au prochain chapitre), et ce qui se passe quand quelqu'un, de l'extérieur, vient au contraire en RÉINJECTER (la résonance, juste après).

---

## R6 — L'amortissement : quand le frottement fait décroître les oscillations

Dans la réalité, aucun oscillateur mécanique n'est parfait : il existe toujours un peu de frottement (l'air, le support, les liaisons internes). Qu'est-ce que ça change ?

### Établir l'équation, avec le frottement

Reprenons le pendule élastique horizontal, en ajoutant cette fois une force de frottement fluide, proportionnelle à la vitesse et opposée au mouvement : $\vec{f} = -h\,\dot{x}\,\vec{u}$ (avec $h>0$, en $\text{kg/s}$, le coefficient de frottement). La deuxième loi de Newton, projetée sur $(Ox)$, donne cette fois :

$$-k\,x - h\,\dot{x} = m\,\ddot{x}$$

$$\boxed{m\,\ddot{x} + h\,\dot{x} + k\,x = 0}$$

C'est l'**équation de l'oscillateur amorti**. Exactement comme pour le circuit RLC, on établit cette équation, et on s'arrête là : la résoudre complètement demande des outils mathématiques hors-programme. Ce qu'on peut faire, en revanche, c'est décrire le comportement qualitativement, expérimentalement, et énergétiquement — et c'est tout aussi utile.

### Le rythme et l'amplitude : deux choses différentes

Avant de nommer les régimes, prends position sur une question précise. Le frottement fait décroître l'amplitude à chaque aller-retour — l'écart maximal diminue, cycle après cycle, c'est un fait qu'on va vérifier tout de suite. Mais la DURÉE d'un aller-retour, elle, fait-elle la même chose ? Diminue-t-elle en même temps que l'amplitude — ou peut-être augmente-t-elle, puisque le mouvement « s'essouffle » ?

Beaucoup répondent que l'un suit l'autre — soit « ça va plus vite, il y a moins à parcourir », soit « ça ralentit, le mouvement perd de l'élan ». Engage vraiment ta réponse avant de continuer.

Regarde ce qui figure dans l'équation $m\ddot{x} + h\dot{x} + kx = 0$. Le terme $h\dot{x}$ retire un peu d'énergie à chaque instant — c'est lui, et lui seul, qui fait fuir l'amplitude. Mais le terme qui FIXE le rythme, $kx$ (le même terme de rappel que sans frottement), n'est pas touché : $k$ et $m$ n'ont pas changé. Le frottement grignote l'amplitude ; il ne modifie ni la raideur du ressort ni la masse du solide, les deux seules grandeurs qui règlent le tempo.

Résultat, pour un frottement faible : la durée entre deux passages successifs par l'écart maximal du même côté — la **pseudo-période** $T$ — reste très proche de la période propre $T_0 = 2\pi\sqrt{m/k}$, alors même que l'amplitude, elle, décroît nettement d'un aller-retour au suivant. Si tu as prédit que la durée suivrait l'amplitude, ta prédiction et l'observation se séparent ici : ce sont deux effets distincts, gouvernés par deux termes distincts de l'équation. **Le rythme vient du rappel ($k$, $m$) ; la décroissance de l'amplitude vient du frottement ($h$).** Ne les confonds pas.

[[checkpoint:cp-r6-pseudo-periode]]

### Les régimes d'amortissement

On distingue le cas idéal, déjà étudié — le **régime périodique** ($h \approx 0$), oscillations à amplitude constante, période $T_0$, exactement les chapitres précédents — des régimes propres à l'amortissement :

- **Pseudo-périodique** (amortissement faible) : le solide oscille encore, l'amplitude décroît à chaque aller-retour, et la pseudo-période $T \approx T_0$ — c'est le résultat qu'on vient de discuter.
- **Critique** : le cas-limite, à la frontière entre les deux comportements suivants — le solide revient à l'équilibre **le plus rapidement possible, sans jamais le dépasser** (aucune oscillation).
- **Apériodique** (amortissement fort) : le solide revient lui aussi à l'équilibre sans le dépasser, mais **plus lentement** que dans le cas critique.

[[figure:regimes-amortissement]]

Une deuxième question, avant de continuer — prends position à nouveau. Si on augmente encore le frottement, au-delà du régime pseudo-périodique, le retour à l'équilibre devient-il de plus en plus rapide, tout simplement — « plus de frottement, plus vite arrêté », comme une voiture qui freine plus fort ?

C'est un raisonnement naturel, mais regarde les trois courbes ci-dessus : le retour le plus rapide, c'est le régime **critique** — ni le pseudo-périodique (le solide dépasse l'équilibre, et il faut plusieurs allers-retours avant de se stabiliser), ni l'apériodique (cette fois, c'est le frottement lui-même, devenu trop fort, qui freine le retour). En dessous du seuil critique, le système a trop d'élan et dépasse l'équilibre ; au-dessus, le frottement est si fort qu'il ralentit le retour autant qu'il ralentissait l'écart initial. **Le temps de retour est minimal exactement au régime critique — plus long des deux côtés, pour deux raisons opposées.** « Plus de frottement, plus vite » n'est vrai que jusqu'au seuil critique ; au-delà, c'est le contraire.

[[checkpoint:cp-r6-regimes]]

[[embed:ressort-sandbox]]

Explore le montage : augmente progressivement le frottement, et observe deux choses séparément — l'écartement entre les pics, qui reste à peu près constant tant que le régime est pseudo-périodique, et la hauteur des pics, qui diminue. Pousse encore, et regarde le passage direct du pseudo-périodique au critique, puis à l'apériodique — repère où le retour à l'équilibre est le plus rapide.

### Où va l'énergie perdue

Le frottement dissipe l'énergie mécanique sous forme de chaleur (par les mêmes mécanismes microscopiques que l'effet Joule dissipe l'énergie électrique dans une résistance) : à chaque cycle, $E_m = E_c + E_{pe}$ diminue un peu. C'est cette perte, cycle après cycle, qui fait décroître l'amplitude dans le régime pseudo-périodique, et qui arrête complètement le mouvement dans le régime apériodique.

Une dernière question, pour être sûr que ce point est solide. Un oscillateur amorti, livré à lui-même, sans aucun dispositif extérieur : son amplitude pourrait-elle, à un moment, se remettre à AUGMENTER, ne serait-ce qu'un peu ? Certains l'imaginent, en confondant amortissement et entretien — « le système finit par se relancer », ou « le frottement, avec le temps, finit par entretenir le mouvement ».

Regarde ce que fait réellement le frottement : à chaque instant, la force $\vec{f} = -h\dot{x}\,\vec{u}$ est opposée à la vitesse, donc son travail est TOUJOURS négatif — une force qui s'oppose systématiquement au déplacement ne peut que retirer de l'énergie, jamais en fournir. Il n'existe donc aucun instant où le frottement, seul, redonnerait de l'énergie au système. L'amplitude décroît de façon monotone, sans jamais remonter, jusqu'à l'arrêt complet — à moins qu'un dispositif EXTÉRIEUR n'intervienne pour compenser la perte. **Le frottement n'est jamais une source d'énergie ; c'est une fuite, et une fuite ne se rebouche pas toute seule.**

### Peut-on entretenir les oscillations ?

Peut-on compenser cette perte pour entretenir les oscillations ? Oui — mais ce dispositif d'entretien est étudié en détail au chapitre **Oscillations libres dans un circuit RLC série** (électricité), où l'on établit l'équation d'un oscillateur entretenu ; le principe (restituer à chaque cycle l'énergie dissipée) y est le même.

### Exemple travaillé — reconnaître un régime à l'œil

*Ce qu'on cherche ici, et pourquoi ce geste :* sur le terrain — un TP, un exercice — on ne voit jamais l'équation différentielle, seulement une courbe $x(t)$ enregistrée. Il faut savoir la lire directement, sans calcul, à partir de deux indices seulement : est-ce que ça oscille encore, et si non, à quelle vitesse le retour se fait.

Reprends les trois courbes de la figure ci-dessus. Voici le raisonnement, dans l'ordre où il se fait vraiment — deux questions, posées l'une après l'autre, jamais une formule :

**Première question : le solide dépasse-t-il l'équilibre au moins une fois de plus après le premier passage ?** Si oui — un deuxième pic visible du même côté, même petit — c'est forcément le régime **pseudo-périodique** : seul ce régime oscille encore. Si non — retour direct, sans jamais retraverser l'équilibre dans l'autre sens — passe à la question suivante.

**Deuxième question, seulement si la réponse à la première est non : ce retour est-il le plus rapide possible, ou plus lent ?** Compare le temps de retour à celui des autres courbes de la même famille (même $m$, même $k$, frottement croissant). Le retour le plus court, sans dépassement : c'est le **régime critique**. Un retour plus long, sans dépassement non plus : c'est le régime **apériodique**.

En résumé, dans l'ordre où on le lit sur une trace réelle : *amplitude qui décroît ET espacement régulier entre les pics → pseudo-périodique ; retour direct, sans dépassement, le plus rapide → critique ; retour direct mais lent → apériodique.* C'est exactement cette lecture qu'un exercice de type bac te demandera de faire — jamais de recalculer $h$, seulement de reconnaître le régime à partir de sa signature graphique.

---

## R7 — La résonance mécanique : quand on pousse au bon rythme

Le chapitre précédent s'est arrêté sur un constat sans appel : un oscillateur livré à lui-même, avec du frottement, ne peut que PERDRE de l'énergie — jamais en regagner tout seul. Mais que se passe-t-il si quelqu'un, de l'extérieur, vient repousser le système à intervalles réguliers ? C'est exactement ce que tu fais quand tu pousses une balançoire : tu ne donnes pas un seul grand coup, tu donnes de petites poussées répétées — et si tu les donnes AU BON MOMENT, l'amplitude grandit énormément, pour un effort qui, poussée par poussée, ne pèse pourtant pas grand-chose.

<!-- Média optionnelle (C-RES-3, gemini) : illustration d'ambiance, poussées rythmées (balançoire) — non structurante, aucune dépendance du texte à cette image. -->
[[figure:balancoire-resonance]]

C'est ce phénomène — l'excitation d'un oscillateur, et son cas le plus spectaculaire, la **résonance** — que ce dernier chapitre explore. Attention : contrairement à ce qui précède, ce qui suit reste volontairement **qualitatif et expérimental**. Il n'y a pas d'équation à résoudre ici — seulement des rôles à distinguer, une condition à reconnaître, et des courbes mesurées à lire.

### Excitateur et résonateur : deux rôles à ne pas confondre

On appelle **résonateur** le système oscillant lui-même — un pendule élastique, un pendule pesant, n'importe lequel des systèmes des chapitres précédents. Il a une fréquence propre $f_0$ (ou une période propre $T_0$), FIXÉE par ses propres caractéristiques ($m$, $k$, ou $J$, $C$...) — une propriété du système, qui ne change pas.

On appelle **excitateur** le dispositif qui vient forcer le résonateur — typiquement un moteur muni d'un excentrique (un « vibreur »), relié au résonateur, qui lui impose une fréquence $f_{exc}$ que l'expérimentateur choisit et fait varier librement, comme on tourne un bouton.

Prends position avant de continuer. Une fois le résonateur mis en mouvement forcé par l'excitateur, à quelle fréquence oscille-t-il, en régime établi — à SA fréquence propre $f_0$, ou à la fréquence $f_{exc}$ que lui impose l'excitateur ? Et si tu penses que c'est $f_0$ : cette fréquence propre finit-elle par se déplacer, pour rejoindre $f_{exc}$ ?

Beaucoup répondent que le résonateur « retourne » à sa fréquence propre, ou encore que $f_0$ « s'ajuste » pour se rapprocher de celle de l'excitateur — comme si le résonateur reprenait le contrôle du rythme. Ce n'est pas ce qui se passe. En régime établi, le résonateur oscille À LA FRÉQUENCE $f_{exc}$ — celle que l'excitateur lui impose — pas à sa propre $f_0$. Et $f_0$, elle, ne bouge JAMAIS : elle reste fixée par $m$ et $k$ (ou $J$ et $C$) du résonateur, exactement comme au chapitre 2. Ce que $f_{exc}$ fait varier, ce n'est pas $f_0$ — c'est l'AMPLITUDE de la réponse du résonateur. C'est précisément le sujet de ce qui suit.

### La condition de résonance : pourquoi l'amplitude explose près de $f_0$

À chaque période, l'excitateur fournit un peu de travail au résonateur. Prends position une dernière fois avant la partie expérimentale : un excitateur qui pousse PLUS FORT, ou PLUS VITE (fréquence plus haute), produit-il forcément une plus grande amplitude au résonateur ?

C'est une intuition naturelle — plus fort ou plus vite devrait donner plus grand. Mais ce n'est pas une question de force ou de vitesse : c'est un **accord de rythme**. Quand $f_{exc} \approx f_0$, les poussées de l'excitateur arrivent en phase avec le mouvement déjà entamé du résonateur — chaque poussée ajoute de l'énergie de la même façon, cycle après cycle, et l'amplitude s'accumule, devient grande. Loin de $f_0$, les poussées tombent partiellement à contretemps — certaines ajoutent de l'énergie, d'autres s'y opposent — et l'apport net, cycle après cycle, reste faible. L'amplitude du résonateur est donc **maximale quand $f_{exc} \approx f_0$** : c'est la **condition de résonance**.

[[checkpoint:cp-r7-resonance]]

[[figure:resonance-sandbox]]

Fais varier $f_{exc}$ sur le montage, de très bas vers très haut : regarde l'amplitude — elle grandit, culmine près de $f_0$, puis redescend. Si « plus vite, plus grand » était vrai, l'amplitude continuerait de grandir avec $f_{exc}$ ; ce n'est pas ce qu'on observe. Elle grandit puis RETOMBE après le pic — la preuve que ce n'est pas une question de vitesse, mais d'un rendez-vous entre deux fréquences.

### L'influence de l'amortissement sur l'acuité de la résonance

Une dernière question, elle aussi contre-intuitive. Un frottement plus fort rend-il la résonance plus intense, plus « pointue » — comme s'il concentrait l'énergie sur $f_0$ ?

C'est tentant à imaginer, mais c'est l'inverse qui se produit. L'amplitude du résonateur grandit tant que l'énergie injectée par l'excitateur, à chaque cycle, dépasse l'énergie dissipée par le frottement ; elle se stabilise dès que les deux s'équilibrent. Avec un **amortissement faible**, cet équilibre n'est atteint qu'à très grande amplitude, et seulement dans une bande étroite de fréquences autour de $f_0$ : la résonance est **aiguë** (un pic haut et étroit). Avec un **amortissement fort**, l'équilibre est atteint bien plus tôt, à amplitude modeste, sur une large bande de fréquences : la résonance est **floue** (un pic bas et large). Le frottement, ici comme au chapitre précédent, ne fait jamais que freiner — il n'aiguise jamais la résonance, il l'émousse.

[[checkpoint:cp-r7-acuite]]

On trace expérimentalement — jamais par le calcul, c'est la limite de ce chapitre — la **courbe de résonance** : l'amplitude du résonateur en fonction de $f_{exc}$, mesurée point par point. Elle prend la forme d'une bosse, culminant près de $f_0$ — plus haute et plus étroite pour un amortissement faible, plus basse et plus large pour un amortissement fort.

### Le montage expérimental

Le TP de référence : un pendule élastique horizontal (le résonateur), dont l'extrémité libre du ressort est reliée à un excentrique entraîné par un petit moteur électrique (l'excitateur), dont on règle la vitesse de rotation — donc $f_{exc}$. Pour chaque réglage de $f_{exc}$, on attend le régime établi, puis on mesure l'amplitude des oscillations du résonateur. On répète l'ensemble des mesures deux fois : une fois avec un frottement faible (banc bien lubrifié), une fois avec un frottement renforcé (une palette plongée dans l'eau, par exemple) — pour comparer les deux courbes de résonance.

[[figure:montage-resonance]]

### Exemple travaillé — lire une courbe de résonance sur un tableau de mesures

*Ce qu'on cherche ici, et pourquoi ce geste :* en TP, la courbe de résonance ne sort jamais d'une formule — elle sort d'un tableau de mesures, colonne par colonne. La lire, c'est répondre à trois questions précises, dans l'ordre, sans jamais chercher une expression d'amplitude.

On a mesuré l'amplitude du résonateur (en unités arbitraires) pour six réglages de l'excitateur, dans deux conditions de frottement :

| $f_{exc}/f_0$ | Amortissement faible | Amortissement fort |
|---|---|---|
| 0,5 | 1,3 | 1,3 |
| 0,8 | 2,6 | 2,2 |
| 0,9 | 4,3 | 2,8 |
| 1,0 | 6,5 | 3,0 |
| 1,2 | 2,1 | 1,7 |
| 1,5 | 0,8 | 0,7 |

**(i) Où se situe la résonance ?** On cherche la ligne où l'amplitude est maximale — pas une formule. Dans les deux colonnes, c'est $f_{exc}/f_0 = 1{,}0$, c'est-à-dire $f_{exc} = f_0$ : la résonance se produit là, et seulement là.

**(ii) À quel réglage l'amplitude est-elle la plus grande, tout court ?** On compare les deux maxima entre eux : $6{,}5$ (amortissement faible) contre $3{,}0$ (amortissement fort). Le maximum absolu du tableau est atteint pour un amortissement **faible**, à $f_{exc} = f_0$.

**(iii) Quelle colonne donne le pic le plus pointu ?** On ne compare pas les maxima seuls, on regarde comment l'amplitude chute AUTOUR du maximum. Colonne faible : de $6{,}5$ (à $1{,}0$) à $4{,}3$ (à $0{,}9$) et $2{,}1$ (à $1{,}2$) — la chute est rapide, sur un petit écart de fréquence. Colonne forte : de $3{,}0$ (à $1{,}0$) à $2{,}8$ et $1{,}7$ — la chute est beaucoup plus douce. Et remarque ce que font les deux colonnes LOIN du pic : à $0{,}5$ elles donnent la même valeur $1{,}3$. Un frottement plus fort ne donne jamais une amplitude plus GRANDE, à aucune fréquence — il ne fait qu'émousser le pic, exactement comme le dit le paragraphe précédent. La colonne « amortissement faible » donne donc le pic le plus étroit — la résonance la plus **aiguë** — exactement ce que prévoit le mécanisme du paragraphe précédent.

On ne cherche pas une formule d'amplitude — on lit le tableau : l'amplitude culmine là où $f_{exc}$ rejoint $f_0$, et le pic est plus pointu quand l'amortissement est faible.

---

## R8 — Pour t'entraîner

### Ce que ces exercices empruntent à d'autres chapitres

Le chapitre 6 n'a donné les deux réservoirs d'énergie qu'**en aperçu**. Dès qu'un sujet demande un bilan chiffré, il mobilise deux outils que cette leçon ne construit pas :

- **Le travail d'une force conservative et sa relation à l'énergie potentielle**, $W = -\Delta E_p$ — c'est elle qui permet de chiffrer le travail d'une force de rappel ou d'un couple de torsion entre deux positions, sans intégrer quoi que ce soit. Elle vit dans « **Aspects énergétiques** », avec les expressions $\frac{1}{2}kx^2$ pour le ressort et $\frac{1}{2}C\theta^2$ pour le fil de torsion.
- **L'énergie cinétique de rotation**, $E_c = \frac{1}{2}J_\Delta\,\dot\theta^{\,2}$, dès qu'il s'agit d'un pendule pesant ou de torsion — l'analogue de $\frac{1}{2}mv^2$ avec le moment d'inertie à la place de la masse. Elle est établie dans « **Rotation autour d'un axe fixe** », qui construit aussi $J_\Delta$ lui-même et la relation fondamentale de la dynamique en rotation que ces pendules utilisent pour poser leur équation.

C'est la même leçon que celle du dictionnaire translation ↔ rotation : la mécanique du mouvement oscillant est une seule machinerie, habillée de plusieurs façons. Savoir **d'où vient** chaque geste est la moitié du travail de révision.

### Récapitulatif express

- Un système oscille selon $\ddot{X} + \omega_0^2 X = 0$ dès qu'une grandeur d'inertie et une grandeur de rappel proportionnelle à l'écart sont en jeu, sans autre force : pendule élastique ($x$, $k/m$), pendule simple ($\theta$, $g/L$), pendule pesant ($\theta$, $mgd/J_\Delta$), pendule de torsion ($\theta$, $C/J$).
- La solution est $X(t) = X_m\cos(\omega_0 t + \varphi)$ ; $\omega_0$ et $T_0=2\pi/\omega_0$ sont fixés par le système (masse, raideur, longueur...) ; $X_m$ et $\varphi$ sont fixés par les conditions initiales.
- **Pulsation $\omega_0$ (rad/s) $\neq$ fréquence $f_0$ (Hz)** : $\omega_0 = 2\pi f_0 = 2\pi/T_0$, toujours ce facteur $2\pi$.
- Pour le pendule **simple** : $T_0$ ne dépend ni de la masse, ni de l'amplitude — seulement de $L$ et $g$.
- Pour les **autres** pendules, seule l'indépendance à l'**amplitude** est générale (aux petites oscillations). La masse, elle, ne disparaît pas : elle figure dans $T_0=2\pi\sqrt{m/k}$ (pendule élastique), et elle ne se simplifie pas en général dans $T_0=2\pi\sqrt{J_\Delta/(mgd)}$ (pendule pesant). Ne généralise jamais « la masse ne compte pas » depuis le seul pendule simple.
- Sans frottement, l'énergie mécanique $E_m = E_c + E_p$ voyage entre les deux réservoirs sans se perdre — l'aperçu qualitatif est ici, la démonstration complète et les diagrammes sont au chapitre **Aspects énergétiques**.
- Avec frottement, $E_m$ décroît toujours (le frottement ne fournit jamais d'énergie, il ne fait que la dissiper) ; selon son intensité, le mouvement suit le régime **pseudo-périodique** ($T \approx T_0$, amplitude décroissante), **critique** (retour le plus rapide, sans oscillation), ou **apériodique** (retour plus lent, sans oscillation) — le retour est le plus rapide exactement au régime critique. Un dispositif d'entretien peut compenser cette perte ; son étude complète appartient au chapitre RLC.
- Un **résonateur** (fréquence propre $f_0$ fixe) forcé par un **excitateur** (fréquence $f_{exc}$ réglable) oscille, en régime établi, à $f_{exc}$ — avec une amplitude maximale quand $f_{exc} \approx f_0$ (la résonance). Un amortissement faible donne une résonance aiguë (pic haut, étroit) ; un amortissement fort, une résonance floue (pic bas, large).

### Exercice de type bac

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

[[exercise:r-variation]]
