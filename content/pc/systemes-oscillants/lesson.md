# Systèmes oscillants

---

## R0 — Accroche : le ressort qui ne s'arrête pas au repos

Imagine un chariot accroché à un ressort horizontal, posé sur une table presque sans frottement. Au repos, le chariot est immobile, le ressort ni étiré ni comprimé. Tu tires le chariot vers toi, tu l'écartes de quelques centimètres de sa position de repos, puis tu le lâches, sans vitesse initiale.

Avant de lire la suite, prends position : qu'est-ce que le chariot va faire, à ton avis ? Est-ce qu'il va revenir tout simplement vers sa position de repos et s'y arrêter — comme un objet qu'on relâche et qui retrouve son équilibre — ou bien va-t-il se passer autre chose ?

Beaucoup répondent : « il retourne au point de départ (l'équilibre) et s'arrête là, puisque c'est là que le ressort n'exerce plus aucune force. » C'est un raisonnement naturel — après tout, l'équilibre, c'est justement l'endroit où plus rien ne pousse.

Engage vraiment ta réponse avant de continuer.

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

$T_0$ ne dépend que de $m$ et de $k$ — les deux seules grandeurs qui figurent dans l'équation différentielle. Rien d'autre n'y apparaît, donc rien d'autre ne peut apparaître dans $T_0$ : ni l'amplitude $X_m$, ni la phase $\varphi$. On y reviendra précisément dans le prochain rung.

[[figure:pendule-elastique]]

### Le pendule élastique, analogue mécanique du circuit LC

Si tu as déjà étudié le circuit RLC en régime libre, cette équation devrait te sembler familière. $\ddot{x} + \omega_0^2 x = 0$ est EXACTEMENT la même forme que celle du circuit LC idéal, $\ddot{q} + \dfrac{1}{LC}\,q = 0$ (avec $q$ à la place de $x$, et $\dfrac{1}{LC}$ à la place de $\dfrac{k}{m}$). Un pendule élastique est, mathématiquement, l'analogue exact d'un circuit LC oscillant : la masse $m$ joue le rôle de l'inductance $L$ (l'inertie du système, ce qui résiste à un changement brusque), et la raideur $k$ joue le rôle de l'inverse de la capacité $1/C$ (le rappel). Ce n'est pas une coïncidence de notation — c'est la même mathématique qui gouverne les deux phénomènes physiques, mécanique d'un côté, électrique de l'autre. On retrouvera cette parenté plus loin, pour l'énergie et pour l'amortissement.

### Exemple numérique

Prenons $k = 40\ \text{N/m}$ et $m = 0{,}40\ \text{kg}$.

$$\frac{k}{m} = \frac{40}{0{,}40} = 100\ \text{s}^{-2}$$

$$\omega_0 = \sqrt{100} = 10\ \text{rad/s}$$

$$T_0 = \frac{2\pi}{10} \approx 0{,}628\ \text{s}$$

Un aller-retour complet dure un peu plus d'un demi-seconde. Si on double la masse ($m=0{,}80\ \text{kg}$) sans changer $k$, $T_0$ devient $2\pi\sqrt{0{,}80/40} = 2\pi\sqrt{0{,}02}\approx 0{,}889\ \text{s}$ : le système est plus lent — plus d'inertie à mettre en mouvement, à raideur égale. Si on double $k$ au lieu de $m$, l'inverse se produit : le ressort plus raide rappelle plus fort, l'aller-retour se fait plus vite.

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

Teste-toi avant de continuer : reprends l'exemple du rung précédent, $\omega_0 = 10\ \text{rad/s}$. Est-ce que le système effectue dix oscillations par seconde ?

Non. $f_0 = \dfrac{\omega_0}{2\pi} = \dfrac{10}{2\pi} \approx 1{,}59\ \text{Hz}$ : un peu plus d'une oscillation et demie par seconde, pas dix. L'erreur classique consiste à lire directement la valeur numérique de $\omega_0$ comme si c'était une fréquence en Hz — alors que $\omega_0$ compte des radians par seconde, une unité d'angle, pas un nombre de cycles. Le facteur $2\pi$ (les radians parcourus en un cycle complet) sépare toujours les deux grandeurs. Pour convertir une pulsation en fréquence, ou une fréquence en pulsation, il faut TOUJOURS passer par ce facteur $2\pi$ — jamais les identifier terme à terme.

### Déterminer $X_m$ et $\varphi$ à partir des conditions initiales

$\omega_0$ (donc $T_0$) est fixée par $k$ et $m$ seuls — on vient de l'établir. $X_m$ et $\varphi$, en revanche, ne dépendent pas du ressort : ils dépendent de la façon dont on a LANCÉ le mouvement, c'est-à-dire des conditions initiales $x(0)$ et $v(0) = \dot{x}(0)$.

Il faut d'abord la vitesse $\dot{x}(t)$, déjà calculée en vérifiant l'hypothèse au rung précédent :

$$v(t) = \dot{x}(t) = -X_m\,\omega_0\,\sin(\omega_0 t + \varphi)$$

À l'instant $t=0$ :

$$x(0) = X_m \cos\varphi \qquad \qquad v(0) = -X_m\,\omega_0\,\sin\varphi$$

Deux équations, deux inconnues ($X_m$ et $\varphi$) : on peut les résoudre pour n'importe quelles conditions initiales.

### Exemple travaillé — deux lancers différents, même oscillateur

On reprend l'oscillateur du rung précédent : $k = 40\ \text{N/m}$, $m = 0{,}40\ \text{kg}$, $\omega_0 = 10\ \text{rad/s}$.

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

### L'approximation des petites oscillations

Pour des angles petits (en pratique, en dessous d'une vingtaine de degrés), $\sin\theta \approx \theta$ (avec $\theta$ en radians) — c'est une approximation, valable seulement dans ce régime, pas un fait général. Avec cette approximation :

$$\boxed{\ddot{\theta} + \frac{g}{L}\,\theta = 0}$$

C'est exactement la même forme que l'équation du pendule élastique, $\ddot{x} + \dfrac{k}{m}x = 0$ — seuls les noms changent : $\theta$ au lieu de $x$, et $g/L$ au lieu de $k/m$. La solution est donc, par le même raisonnement de vérification qu'au rung précédent :

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

On applique la même relation rotationnelle qu'au rung précédent, avec cette fois aucune autre force ne produisant de moment (le poids du solide et la réaction du fil passent par l'axe de rotation) :

$$J\,\ddot{\theta} = M_{rappel} = -C\,\theta$$

$$\boxed{\ddot{\theta} + \frac{C}{J}\,\theta = 0}$$

où $J$ est le moment d'inertie du solide par rapport à l'axe du fil. Encore une fois, la même forme d'équation — et donc, sans repasser par la vérification (elle est identique à celle du rung R1), la même famille de solution et de grandeurs :

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

## R5 — Les aspects énergétiques : la conservation de l'énergie mécanique

Revenons au pendule élastique horizontal (sans frottement), et regardons où va l'énergie au cours du mouvement — exactement la question qu'on s'était posée pour le circuit RLC oscillant, dans le chapitre sur les oscillations électriques.

### Les deux réservoirs d'énergie

Le solide en mouvement possède une énergie cinétique :

$$E_c = \frac{1}{2}m\,v^2 = \frac{1}{2}m\,\dot{x}^2$$

Le ressort déformé stocke une énergie potentielle élastique :

$$E_{pe} = \frac{1}{2}k\,x^2$$

(cette expression vient du travail qu'il faut fournir pour étirer ou comprimer le ressort d'une quantité $x$ — une grandeur que tu retrouveras établie en détail au chapitre sur le travail et l'énergie).

L'énergie mécanique totale est leur somme, $E_m = E_c + E_{pe}$.

### Vérifier que $E_m$ est constante — en utilisant l'équation déjà établie

*Ce qu'on cherche ici, et pourquoi ce geste :* plutôt que d'invoquer l'absence de frottement en général, on va le VÉRIFIER directement à partir de $x(t) = X_m\cos(\omega_0 t + \varphi)$, la solution déjà confirmée — la preuve est dans le calcul, pas dans une affirmation.

On calcule $E_c(t)$ et $E_{pe}(t)$ séparément, en utilisant $\dot{x}(t) = -X_m\omega_0\sin(\omega_0 t+\varphi)$ (établi en R2) :

$$E_c(t) = \frac{1}{2}m\,X_m^2\,\omega_0^2\,\sin^2(\omega_0 t + \varphi)$$

$$E_{pe}(t) = \frac{1}{2}k\,X_m^2\,\cos^2(\omega_0 t + \varphi)$$

On sait que $k = m\omega_0^2$ (établi en R1). On remplace $k$ dans $E_{pe}$ :

$$E_{pe}(t) = \frac{1}{2}m\,\omega_0^2\,X_m^2\,\cos^2(\omega_0 t + \varphi)$$

On additionne les deux :

$$E_m(t) = E_c(t) + E_{pe}(t) = \frac{1}{2}m\,\omega_0^2\,X_m^2\left[\sin^2(\omega_0 t+\varphi) + \cos^2(\omega_0 t+\varphi)\right]$$

$$E_m(t) = \frac{1}{2}m\,\omega_0^2\,X_m^2 = \frac{1}{2}k\,X_m^2$$

Le crochet vaut $1$ à chaque instant (identité $\sin^2+\cos^2=1$) : $E_m$ ne dépend pas de $t$. Elle est bien CONSTANTE, et sa valeur est fixée uniquement par $k$ (ou $m\omega_0^2$, c'est la même chose) et par l'amplitude $X_m$ — deux grandeurs qui ne changent pas au cours du mouvement.

### Le pendule d'énergie, à nouveau

Exactement comme dans le circuit RLC idéal, où l'énergie électrique du condensateur et l'énergie magnétique de la bobine s'échangeaient sans jamais disparaître, ici $E_c$ et $E_{pe}$ s'échangent en permanence :

- Quand $x = 0$ (passage par l'équilibre) : $E_{pe} = 0$, toute l'énergie est cinétique — c'est là que la vitesse est maximale.
- Quand $x = \pm X_m$ (écart maximal) : $\dot{x} = 0$ (le solide s'arrête un instant pour repartir en sens inverse), donc $E_c = 0$ — toute l'énergie est dans le ressort.

Entre ces deux instants, l'énergie ne disparaît pas et ne surgit pas de nulle part : elle **traverse** d'un réservoir à l'autre, exactement comme elle traversait entre le condensateur et la bobine. Les maxima de $E_c$ et de $E_{pe}$ sont en opposition de phase, décalés d'un quart de période — la même signature que $E_C$ et $E_L$ dans le circuit RLC.

[[figure:energie-oscillateur]]

### Exemple numérique

Reprenons l'oscillateur des rungs précédents : $k=40\ \text{N/m}$, $X_m = 0{,}05\ \text{m}$.

$$E_m = \frac{1}{2}\times 40 \times (0{,}05)^2 = \frac{1}{2}\times 40 \times 0{,}0025 = 0{,}05\ \text{J}$$

Au passage par l'équilibre, cette énergie est intégralement cinétique : $\frac{1}{2}m\,v_{max}^2 = 0{,}05\ \text{J}$, donc

$$v_{max} = \sqrt{\frac{2\times 0{,}05}{0{,}40}} = \sqrt{0{,}25} = 0{,}5\ \text{m/s}$$

— exactement la vitesse de lancer du deuxième exemple de R2, ce qui n'est pas un hasard : ce deuxième lancer envoyait précisément toute l'énergie sous forme cinétique au passage par l'équilibre.

Pour un pendule simple ou pesant, sans frottement, le même principe s'applique : $E_m = E_c + E_p$ reste constante, où $E_p$ est cette fois l'énergie potentielle de PESANTEUR (et non élastique) — le mécanisme est identique, seule la nature de l'énergie potentielle change.

---

## R6 — L'amortissement et l'entretien des oscillations

Dans la réalité, aucun oscillateur mécanique n'est parfait : il existe toujours un peu de frottement (l'air, le support, les liaisons internes). Qu'est-ce que ça change ?

### Établir l'équation, avec le frottement

Reprenons le pendule élastique horizontal, en ajoutant cette fois une force de frottement fluide, proportionnelle à la vitesse et opposée au mouvement : $\vec{f} = -h\,\dot{x}\,\vec{u}$ (avec $h>0$, en $\text{kg/s}$, le coefficient de frottement). La deuxième loi de Newton, projetée sur $(Ox)$, donne cette fois :

$$-k\,x - h\,\dot{x} = m\,\ddot{x}$$

$$\boxed{m\,\ddot{x} + h\,\dot{x} + k\,x = 0}$$

C'est l'**équation de l'oscillateur amorti**. Exactement comme pour le circuit RLC, on établit cette équation, et on s'arrête là : la résoudre complètement demande des outils mathématiques hors-programme. Ce qu'on peut faire, en revanche, c'est décrire le comportement qualitativement, et savoir ce que devient l'énergie.

### Les trois régimes

Selon l'intensité du frottement (la valeur de $h$, à $m$ et $k$ fixés), on observe trois comportements :

- **Régime périodique** ($h \approx 0$) : les oscillations se maintiennent, à amplitude constante, à la période propre $T_0 = 2\pi\sqrt{m/k}$. C'est le cas idéal étudié dans les rungs précédents.
- **Régime pseudo-périodique** ($h$ modéré) : le solide oscille encore, mais l'amplitude décroît progressivement à chaque aller-retour, jusqu'à l'arrêt. On peut encore mesurer un intervalle de temps régulier entre deux passages successifs par un même extrême — la **pseudo-période** $T$ — et, pour un amortissement faible, $T \approx T_0$.
- **Régime apériodique** ($h$ grand) : le solide revient vers l'équilibre sans jamais le dépasser. Plus aucune oscillation.

C'est exactement la même trichotomie que pour le circuit RLC — et pour une raison identique : dans les deux cas, un terme proportionnel à la « vitesse » (électrique ou mécanique) s'oppose au mouvement et dissipe de l'énergie, sans jamais en fournir.

[[embed:ressort-sandbox]]

### Où va l'énergie perdue

Le frottement dissipe l'énergie mécanique sous forme de chaleur (par les mêmes mécanismes microscopiques que l'effet Joule dissipe l'énergie électrique dans une résistance) : à chaque cycle, $E_m = E_c + E_{pe}$ diminue un peu. C'est cette perte, cycle après cycle, qui fait décroître l'amplitude dans le régime pseudo-périodique, et qui arrête complètement le mouvement dans le régime apériodique.

### Entretenir les oscillations

Peut-on empêcher cet amortissement, et faire durer les oscillations indéfiniment, à amplitude constante ? Oui, à condition de **restituer**, à chaque cycle, exactement l'énergie perdue par frottement — ni plus, ni moins. C'est le rôle d'un **dispositif d'entretien** : un mécanisme qui apporte, à chaque période, un petit complément d'énergie, calé pour compenser exactement la perte.

C'est le principe utilisé, par exemple, dans une montre mécanique : un ressort moteur (le barillet), via un mécanisme d'échappement, redonne au balancier — un petit pendule de torsion — une impulsion à chaque oscillation, pile ce qu'il faut pour compenser les frottements internes. Le balancier continue d'osciller à SA période propre, fixée par son moment d'inertie et la raideur de son ressort spiral — le dispositif d'entretien ne fixe pas le rythme, il compense seulement la fuite d'énergie, exactement comme le générateur d'entretien du circuit RLC.

---

## R7 — Pour t'entraîner

### Récapitulatif express

- Un système oscille selon $\ddot{X} + \omega_0^2 X = 0$ dès qu'une grandeur d'inertie et une grandeur de rappel proportionnelle à l'écart sont en jeu, sans autre force : pendule élastique ($x$, $k/m$), pendule simple ($\theta$, $g/L$), pendule pesant ($\theta$, $mgd/J_\Delta$), pendule de torsion ($\theta$, $C/J$).
- La solution est $X(t) = X_m\cos(\omega_0 t + \varphi)$ ; $\omega_0$ et $T_0=2\pi/\omega_0$ sont fixés par le système (masse, raideur, longueur...) ; $X_m$ et $\varphi$ sont fixés par les conditions initiales.
- **Pulsation $\omega_0$ (rad/s) $\neq$ fréquence $f_0$ (Hz)** : $\omega_0 = 2\pi f_0 = 2\pi/T_0$, toujours ce facteur $2\pi$.
- Pour le pendule simple (et, en pratique, tout pendule aux petites oscillations) : $T_0$ ne dépend ni de la masse, ni de l'amplitude — seulement de $L$ et $g$ (ou de l'équivalent inertie/rappel pour les autres pendules).
- Sans frottement, l'énergie mécanique $E_m = E_c + E_p$ est constante ; avec frottement, elle décroît (régimes pseudo-périodique ou apériodique) ; un dispositif d'entretien peut compenser exactement cette perte.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Un solide $(S)$, de masse $m = 200\ \text{g}$, est accroché à un ressort horizontal de raideur $k$, l'autre extrémité du ressort étant fixe. Le solide peut glisser sans frottement sur un banc horizontal. On repère sa position par $x$, l'écart algébrique par rapport à sa position d'équilibre. On écarte $(S)$ de $x_0 = 4{,}0\ \text{cm}$ par rapport à l'équilibre et on le lâche sans vitesse initiale à l'instant $t=0$. Un dispositif de mesure indique que le solide effectue $10$ allers-retours complets en $6{,}28\ \text{s}$. On prendra $\pi^2 \approx 10$ pour les applications numériques.

**1) Déterminer la période propre $T_0$, puis la pulsation propre $\omega_0$ du mouvement.**

*Ce qu'on cherche ici, et pourquoi ce geste :* l'énoncé donne la durée de PLUSIEURS cycles, pas d'un seul — il faut diviser avant d'aller plus loin, sinon on confond « durée totale » et « période ».

$$T_0 = \frac{6{,}28}{10} = 0{,}628\ \text{s}$$

$$\omega_0 = \frac{2\pi}{T_0} = \frac{2\pi}{0{,}628} \approx 10\ \text{rad/s}$$

**2) En déduire la raideur $k$ du ressort.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on inverse la relation $\omega_0 = \sqrt{k/m}$ établie en R1 — c'est le même $\omega_0$ que celui qu'on vient de mesurer, donc $k$ se déduit directement, sans nouvelle expérience.

$$\omega_0^2 = \frac{k}{m} \quad \Longrightarrow \quad k = m\,\omega_0^2$$

$$k = 0{,}200 \times 10^2 = 20\ \text{N/m}$$

**3) Écrire l'équation horaire $x(t)$ du mouvement.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie $X_m$ et $\varphi$ à partir des conditions initiales EXACTEMENT données par l'énoncé (lâcher sans vitesse depuis l'écart maximal) — un cas déjà rencontré en R2, donc reconnu, pas recalculé de zéro.

Le solide est lâché depuis $x_0 = 4{,}0\ \text{cm}$ sans vitesse initiale : c'est exactement la configuration du premier lancer de R2, donc $\varphi = 0$ et $X_m = x_0 = 0{,}040\ \text{m}$.

$$x(t) = 0{,}040\,\cos(10\,t) \quad \text{(en mètres)}$$

**4) Calculer l'énergie mécanique du système, et la vitesse maximale atteinte par le solide.**

*Ce qu'on cherche ici, et pourquoi ce geste :* $E_m$ se calcule directement avec $k$ et $X_m$ (formule de R5) ; la vitesse maximale s'en déduit en écrivant que TOUTE l'énergie est cinétique au passage par l'équilibre — pas besoin de dériver $x(t)$ une deuxième fois.

$$E_m = \frac{1}{2}k\,X_m^2 = \frac{1}{2}\times 20 \times (0{,}040)^2 = \frac{1}{2}\times 20\times 1{,}6\times 10^{-3} = 1{,}6\times 10^{-2}\ \text{J}$$

$$E_m = \frac{1}{2}m\,v_{max}^2 \quad \Longrightarrow \quad v_{max} = \sqrt{\frac{2E_m}{m}} = \sqrt{\frac{2\times 1{,}6\times 10^{-2}}{0{,}200}} = \sqrt{0{,}16} = 0{,}40\ \text{m/s}$$

**5) On refait la même expérience, mais en frottant légèrement le banc. Le dispositif de mesure indique maintenant que l'intervalle entre deux passages successifs par l'écart maximal (du même côté) est de $0{,}63\ \text{s}$, très proche de $T_0$, mais que l'écart maximal diminue légèrement à chaque aller-retour. Quel régime observe-t-on ? Justifier.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la question teste directement la trichotomie de R6 — reconnaître le régime à partir de deux indices (persistance d'un intervalle régulier + décroissance de l'amplitude), pas juste réciter une définition.

On observe le **régime pseudo-périodique** : les oscillations persistent (un intervalle de temps régulier subsiste entre deux extrêmes successifs, ici $T\approx 0{,}63\ \text{s}\approx T_0$), mais leur amplitude décroît progressivement à chaque cycle à cause du frottement — c'est la signature exacte d'un amortissement faible, ni le régime périodique (l'amplitude ne serait pas décroissante) ni le régime apériodique (il n'y aurait plus d'aller-retour du tout).

### À toi

**Variation 1.** Un pendule simple de longueur $L = 1{,}0\ \text{m}$ oscille avec de petites oscillations au voisinage d'un lieu où $g \approx 10\ \text{m}\cdot\text{s}^{-2}$. Calcule sa période propre $T_0$, sa pulsation propre $\omega_0$ et sa fréquence propre $f_0$ (donne les trois grandeurs avec leurs unités, et fais bien attention à ne pas confondre $\omega_0$ et $f_0$). Un deuxième pendule, de même longueur $L$ mais avec une masse deux fois plus grande, oscille-t-il plus vite, moins vite, ou pareil ? Justifie à partir de l'équation différentielle, pas seulement du résultat final.

**Variation 2.** Un pendule de torsion est constitué d'un disque de moment d'inertie $J = 4{,}0\times 10^{-3}\ \text{kg}\cdot\text{m}^2$, suspendu par un fil de constante de torsion $C = 0{,}16\ \text{N}\cdot\text{m}/\text{rad}$. Détermine sa période propre $T_0$. On lâche le disque, à $t=0$, depuis un angle $\theta_0 = 0{,}20\ \text{rad}$ sans vitesse angulaire initiale : écris l'équation horaire $\theta(t)$ complète (amplitude et phase comprises), en reconnaissant le type de lancer déjà rencontré dans la leçon.
