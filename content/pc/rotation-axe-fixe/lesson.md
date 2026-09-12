# Rotation autour d'un axe fixe

---

## R0 — Accroche : le manège qui ne tourne pas pareil

Imagine un manège de cour de récréation : un disque horizontal qui tourne autour d'un axe vertical fixe planté en son centre. Deux enfants, de masse à peu près égale, s'assoient dessus. Un troisième enfant, resté debout, pousse le bord du manège avec une force horizontale constante, toujours la même, pendant la même durée à chaque essai.

**Premier essai** : les deux enfants assis s'installent tout près du centre, presque sur l'axe. **Deuxième essai** : ils s'installent tout au bord, jambes pendantes au-dessus du sol.

Avant de lire la suite, prends position : dans lequel des deux essais le manège tourne-t-il le plus vite au bout de la même poussée ? Le fait que les deux enfants aient exactement la même masse dans les deux cas change-t-il quelque chose, à ton avis, ou seule la masse totale embarquée compte-t-elle ?

[[checkpoint:cp-r0-predict]]

Beaucoup répondent : « la masse totale est la même dans les deux essais, donc le manège réagit pareil — ce qui compte, c'est combien de kilos on pousse, pas où ils sont assis. » C'est un raisonnement qui a l'air solide : en translation, après tout, seule la masse totale intervient dans $\vec F = m\vec a$, peu importe comment elle est répartie à l'intérieur de l'objet.

Et pourtant, ce n'est pas ce qu'on observe. Le manège où les enfants sont assis **près du centre** s'élance nettement plus vite que celui où ils sont assis **au bord**, pour la même poussée, pendant la même durée. La masse totale n'a pas bougé d'un gramme — seule sa répartition autour de l'axe a changé, et cela suffit à changer complètement la façon dont le manège répond à la poussée.

Ce n'est pas une bizarrerie du manège : c'est un fait général sur tout solide qui tourne autour d'un axe fixe, et c'est exactement ce que ce chapitre va construire, pièce par pièce.

Deux questions vont porter toute cette leçon :

**Comment décrit-on précisément la rotation d'un solide — quel est, ici, l'équivalent de la position, de la vitesse et de l'accélération qu'on utilise en translation ?**

**Qu'est-ce qui, comme la masse pour la translation, mesure la résistance d'un solide à changer sa rotation — et pourquoi cette grandeur dépend-elle de la répartition de la masse, et pas seulement de sa quantité totale ?**

Ne cherche pas encore la réponse complète — on construit tout ça avec la méthode déjà connue : celle de la deuxième loi de Newton, transposée à la rotation.

---

## R1 — Décrire la rotation : abscisse angulaire, vitesse et accélération angulaires

### Pourquoi un seul angle suffit à décrire tout le solide

Un solide en rotation autour d'un axe fixe $\Delta$ (le manège autour de son axe vertical, une porte autour de ses gonds, une roue autour de son essieu) est **rigide** : tous ses points restent à une distance constante les uns des autres. Conséquence directe de cette rigidité : à chaque instant, **tous les points du solide ont tourné exactement du même angle** depuis l'instant initial — que le point soit tout près de l'axe ou loin sur le bord.

C'est pour cette raison qu'un seul nombre suffit à décrire l'état de rotation de tout le solide, quelle que soit sa taille ou sa forme : l'angle $\theta(t)$ dont une ligne de référence attachée au solide (par exemple, un rayon peint sur le manège) a tourné par rapport à une direction fixe du référentiel. On l'appelle l'**abscisse angulaire**, mesurée en radians. On choisit un sens de rotation positif (le sens trigonométrique, par convention) une fois pour toutes, et $\theta$ est compté positivement dans ce sens.

Exactement comme la position $x(t)$ d'un point suffisait à décrire toute une translation (chapitre précédent), $\theta(t)$ suffit ici à décrire toute la rotation — à condition que le solide soit rigide et que l'axe soit fixe.

### Vitesse angulaire et accélération angulaire

De la même façon qu'on construit $v = \dot x$ à partir de $x(t)$ en translation, on construit la **vitesse angulaire** à partir de $\theta(t)$ :

$$\omega = \dot\theta = \frac{d\theta}{dt}$$

$\omega$ se mesure en radians par seconde (rad/s). Elle mesure la rapidité avec laquelle l'angle $\theta$ change — et, comme $\theta$, elle est la **même pour tous les points du solide** à un instant donné : c'est une propriété du solide entier en rotation, pas d'un point particulier.

De même, l'**accélération angulaire** mesure la façon dont $\omega$ change au cours du temps :

$$\dot\omega = \ddot\theta = \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2}$$

Les deux notations, $\dot\omega$ et $\ddot\theta$, désignent exactement la même grandeur : dériver $\omega$ une fois, ou dériver $\theta$ deux fois, revient au même. On la mesure en $\text{rad}\cdot\text{s}^{-2}$.

Si $\omega$ est constante, $\ddot\theta = 0$ : le solide tourne à vitesse angulaire constante, un mouvement de rotation uniforme.

### Ne pas confondre $\omega$ et la vitesse d'un point du solide

Voici le piège précis à éviter, et c'est le cœur de ce chapitre. $\omega$ est une vitesse **angulaire** — elle se mesure en radians par seconde, pas en mètres par seconde — et elle vaut la même chose pour n'importe quel point du solide. Mais la vitesse **linéaire** d'un point $M$ du solide, elle, dépend d'où se trouve $M$ par rapport à l'axe.

Pourquoi c'est vrai : si $M$ est à une distance $d$ de l'axe $\Delta$, et que le solide tourne d'un petit angle $\Delta\theta$ (en radians) pendant un temps $\Delta t$, alors $M$ parcourt, le long de son cercle de rayon $d$, un arc de longueur $\Delta s = d\,\Delta\theta$ — c'est la définition même du radian : un arc de longueur égale au rayon correspond à un angle d'un radian. En divisant par $\Delta t$ et en resserrant l'intervalle, on obtient la vitesse instantanée du point $M$ :

$$v_M = \frac{ds}{dt} = d\,\frac{d\theta}{dt} = d\,\omega$$

$d$ est fixe (c'est la distance de $M$ à l'axe, qui ne change pas puisque le solide est rigide), donc cette dérivation est directe. Voilà pourquoi $v_M = d\,\omega$ n'est pas une coïncidence : c'est ce que dit très précisément la définition du radian, appliquée à un point qui tourne.

Résultat immédiat : deux points du même solide, à des distances différentes de l'axe, ont la **même** $\omega$ mais des vitesses linéaires **différentes** — proportionnelles à leur distance à l'axe. Le point le plus loin de l'axe va toujours plus vite (en mètres par seconde) que le point le plus proche, même s'ils tournent « à la même vitesse angulaire ».

### Exemple travaillé : deux points du même manège

*Ce qu'on cherche ici, et pourquoi ce geste :* on prend un seul manège, une seule valeur de $\omega$, et on regarde ce que ça donne en vitesse linéaire à deux endroits différents — pour rendre concrète la distinction entre $\omega$ (une seule valeur pour tout le disque) et $v$ (une valeur par point).

Le manège de l'accroche a un rayon $R = 1{,}5\ \text{m}$. Il tourne à une vitesse angulaire constante $\omega = 2{,}0\ \text{rad/s}$. On regarde deux points : un enfant assis à $d_1 = 0{,}30\ \text{m}$ de l'axe, et le bord du manège à $d_2 = 1{,}5\ \text{m}$ de l'axe.

$$v_1 = d_1\,\omega = 0{,}30 \times 2{,}0 = 0{,}60\ \text{m/s}$$

$$v_2 = d_2\,\omega = 1{,}5 \times 2{,}0 = 3{,}0\ \text{m/s}$$

Le bord va cinq fois plus vite que le point proche du centre — alors que $\omega$ vaut $2{,}0\ \text{rad/s}$ **partout sur le disque**, y compris exactement sur l'axe (où $d=0$, donc $v=0$ : le centre du manège ne bouge pas du tout, même quand le manège tourne). C'est exactement ce que dit $v = d\,\omega$ : une seule pulsation angulaire, mais autant de vitesses linéaires que de distances à l'axe.

[[figure:omega-vitesse-point]]

[[checkpoint:cp-r1-omega-v]]

---

## R2 — Le moment d'une force par rapport à l'axe : ce qui fait vraiment tourner

### Pourquoi la force seule ne suffit pas

En translation, une force est une force : on l'ajoute vectoriellement aux autres dans $\sum \vec F_{ext} = m\vec a_G$, et son point d'application précis sur le solide n'entre jamais en jeu — seule la résultante compte. Mais pour la rotation, l'intuition du manège dit autre chose : pousser fort tout près de l'axe fait à peine bouger le manège, alors que la même force, appliquée loin de l'axe, sur le bord, le fait décoller. Le point d'application compte maintenant — et pas qu'un peu.

Il faut donc une nouvelle grandeur, qui capture non seulement l'intensité de la force, mais aussi son efficacité à faire tourner autour de $\Delta$, selon où et comment elle s'applique.

### Construire le moment d'une force

Pour une force $\vec F$ appliquée en un point du solide et dirigée tangentiellement (perpendiculairement au rayon qui va de l'axe $\Delta$ à ce point — c'est le cas le plus efficace pour faire tourner), on définit le **moment de la force par rapport à l'axe $\Delta$** :

$$\mathcal{M}_\Delta(\vec F) = \pm\,d \cdot F$$

où $d$ est la distance entre l'axe $\Delta$ et la droite d'action de $\vec F$ (le **bras de levier**), et $F$ la norme de la force. Tu la retrouveras parfois notée $M_\Delta(\vec F)$, sans le style calligraphié — c'est exactement la même grandeur. Elle se mesure en newton-mètre ($\text{N}\cdot\text{m}$).

Le signe traduit le sens dans lequel la force tend à faire tourner le solide, par rapport au sens positif choisi pour $\theta$ : $+$ si $\vec F$ tend à faire tourner dans le sens positif, $-$ sinon.

Pourquoi c'est écrit comme un produit $d \times F$, et pas juste $F$ : parce que l'effet de rotation d'une force dépend des **deux** à la fois. Une petite force loin de l'axe peut avoir le même moment — donc le même effet de rotation — qu'une grande force près de l'axe. C'est exactement le principe du levier : le bras de levier $d$ **multiplie** l'efficacité de la force, il ne s'ajoute pas à elle.

[[figure:moment-force]]

### Deux façons d'avoir un moment nul

Ce point est essentiel, et il confronte directement l'erreur la plus fréquente sur ce sujet : **une force non nulle peut avoir un moment strictement nul.**

- Si la force est appliquée **exactement sur l'axe** ($d = 0$), son moment est nul, quelle que soit son intensité $F$ : $\mathcal{M}_\Delta(\vec F) = 0 \times F = 0$. La force existe bien, elle s'exerce bien sur le solide — mais elle ne le fait pas tourner d'un iota.
- Si la force est dirigée **radialement** — droit vers l'axe, ou droit à l'opposé, sans aucune composante tangentielle — elle ne fait pas tourner le solide non plus, pour la même raison géométrique : elle n'a pas de « bras de levier » utile dans le sens de la rotation.

Ce deuxième fait est celui qu'on va réutiliser tout au long du chapitre : la réaction de l'axe sur le solide (la force que l'axe exerce pour maintenir le solide en place) s'applique précisément **au niveau de l'axe** — son bras de levier est nul par construction. Son moment par rapport à $\Delta$ est donc **toujours nul**, quelle que soit son intensité. Elle disparaît systématiquement des équations de rotation qu'on va écrire dans ce chapitre.

### Arrête-toi — une grande force peut avoir un effet nul

Voici le piège qui s'installe silencieusement : confondre « il y a une force » avec « ça va tourner ». Teste-le : imagine que tu pousses de toutes tes forces exactement sur l'axe du manège, en plein sur le pivot central. Le manège tourne-t-il ?

Non — quelle que soit l'intensité de ta poussée. $d = 0$ à cet endroit précis, donc $\mathcal{M}_\Delta(\vec F) = 0$, quelle que soit la valeur de $F$. Une force réelle, mesurable, peut donc avoir un effet de rotation strictement nul. Ce qui fait tourner un solide n'est jamais « la force » toute seule : c'est le **moment** de la force, qui tient compte à la fois de son intensité et de son bras de levier.

[[checkpoint:cp-r2-bras-levier]]

### Exemple travaillé : pousser le manège à deux endroits différents

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la même force, à deux distances différentes de l'axe, pour chiffrer l'écart d'efficacité — et vérifier que ce n'est pas un petit écart, mais un rapport de plusieurs fois.

On pousse le manège ($R = 1{,}5\ \text{m}$), toujours tangentiellement, avec une force de même norme $F = 30\ \text{N}$, dans deux essais.

**Essai 1 — poussée sur le bord**, à $d_1 = 1{,}5\ \text{m}$ de l'axe (le rayon complet) :

$$\mathcal{M}_\Delta(\vec F)_1 = d_1 \times F = 1{,}5 \times 30 = 45\ \text{N}\cdot\text{m}$$

**Essai 2 — poussée tout près de l'axe**, à $d_2 = 0{,}20\ \text{m}$ :

$$\mathcal{M}_\Delta(\vec F)_2 = d_2 \times F = 0{,}20 \times 30 = 6{,}0\ \text{N}\cdot\text{m}$$

Le même geste, la même force, mais un moment presque huit fois plus grand ($45$ contre $6{,}0\ \text{N}\cdot\text{m}$) selon l'endroit où l'on pousse. C'est exactement ce que l'intuition du manège annonçait dans l'accroche : où l'on pousse compte autant que la force qu'on y met.

---

## R3 — Le moment d'inertie $J_\Delta$ : quand la masse ne suffit pas

### Revenir à l'énigme du manège

On peut maintenant expliquer précisément ce qui s'est passé dans l'accroche. Les deux essais avaient **la même masse totale embarquée** (les deux mêmes enfants), et pourtant le manège réagissait très différemment selon qu'ils étaient assis près du centre ou au bord. Ce qui manquait à la description, c'était une grandeur qui tient compte non seulement de la masse, mais de **là où elle se trouve par rapport à l'axe**.

### Construire cette grandeur, à partir d'un point matériel

Prends un point matériel de masse $m$, situé à une distance $d$ de l'axe $\Delta$, entraîné en rotation avec le solide. On sait, depuis le chapitre 2, que sa vitesse linéaire vaut $v = d\,\omega$. Son énergie cinétique, avec la formule habituelle de la translation, vaut donc :

$$E_c = \frac{1}{2}m v^2 = \frac{1}{2}m\,(d\,\omega)^2 = \frac{1}{2}\big(m\,d^2\big)\,\omega^2$$

Regarde la forme de ce résultat : c'est $\frac{1}{2} \times (\text{quelque chose}) \times \omega^2$ — exactement la même forme que $E_c = \frac12 m v^2$ en translation, mais avec $\omega$ à la place de $v$, et $m\,d^2$ à la place de $m$. Ce « quelque chose », $m\,d^2$, est le **moment d'inertie** de ce point matériel par rapport à $\Delta$. C'est lui qui joue, pour la rotation, le rôle que joue la masse pour la translation.

Et voilà pourquoi la répartition de la masse compte : ce n'est pas $m$ tout seul qui mesure l'inertie de rotation, c'est $m\,d^2$ — la masse pondérée par le **carré** de sa distance à l'axe. Une masse deux fois plus loin de l'axe compte quatre fois plus, pas deux fois plus. C'est cette dépendance en $d^2$ (et non en $d$) qui explique pourquoi déplacer la même masse vers le bord change si radicalement le comportement du manège.

### L'additivité : un solide, c'est une somme de points

Un solide réel n'est pas un point unique, mais un ensemble de très nombreux points matériels, chacun à sa propre distance de l'axe. L'énergie cinétique totale de rotation du solide est la somme des énergies cinétiques de chacun de ses points :

$$E_c = \sum_i \frac{1}{2}m_i\,d_i^2\,\omega^2 = \frac{1}{2}\left(\sum_i m_i\,d_i^2\right)\omega^2$$

On définit alors le moment d'inertie du solide entier par rapport à $\Delta$ comme cette somme :

$$J_\Delta = \sum_i m_i\,d_i^2$$

Cette additivité a une conséquence pratique immédiate : le moment d'inertie d'un système composé de plusieurs parties (un disque et deux enfants assis dessus, par exemple) est la **somme** des moments d'inertie de chaque partie par rapport au même axe $\Delta$ — à condition, bien sûr, de calculer chaque contribution par rapport au même axe.

### Valeurs usuelles (données, sans démonstration)

Pour un solide continu (pas seulement quelques points), la somme ci-dessus devient une intégrale sur tout le volume — un calcul hors du programme. On retient directement, pour les solides homogènes les plus courants, les résultats suivants :

| Solide | Axe $\Delta$ | Moment d'inertie $J_\Delta$ |
|---|---|---|
| Tige de longueur $L$, masse $m$ | perpendiculaire à la tige, passant par son **milieu** | $\dfrac{1}{12}\,m L^2$ |
| Tige de longueur $L$, masse $m$ | perpendiculaire à la tige, passant par une **extrémité** | $\dfrac{1}{3}\,m L^2$ |
| Disque plein de rayon $R$, masse $m$ | perpendiculaire au disque, passant par son **centre** (axe de symétrie) | $\dfrac{1}{2}\,m R^2$ |
| Cylindre plein de rayon $R$, masse $m$ | axe de révolution (l'axe du cylindre lui-même) | $\dfrac{1}{2}\,m R^2$ |

Remarque, sans la démontrer : le moment d'inertie du cylindre ne dépend que de sa masse totale et de son rayon $R$ — pas de sa longueur. Un cylindre long et un cylindre court, de même masse totale et même rayon, ont exactement le même $J_\Delta$. C'est cohérent avec l'idée de départ : $J_\Delta$ pondère la masse par le carré de sa distance à l'axe, et cette distance ne dépend que du rayon (la position autour de l'axe), jamais de la position le long de l'axe.

### Arrête-toi — « même masse » ne veut pas dire « même $J_\Delta$ »

Voici le piège à éliminer, avec un contre-exemple chiffré. Compare deux systèmes de **même masse totale** :

- une **tige homogène** de masse $m = 2{,}0\ \text{kg}$ et de longueur $L = 1{,}0\ \text{m}$, tournant autour d'un axe perpendiculaire passant par son milieu ;
- un **haltère** : deux masses ponctuelles de $1{,}0\ \text{kg}$ chacune (même masse totale, $2{,}0\ \text{kg}$), fixées aux deux extrémités d'une tige sans masse de même longueur $1{,}0\ \text{m}$, tournant autour du même axe central.

Pour la tige homogène :

$$J_{tige} = \frac{1}{12}\,m L^2 = \frac{1}{12} \times 2{,}0 \times 1{,}0^2 \approx 0{,}167\ \text{kg}\cdot\text{m}^2$$

Pour l'haltère, chaque masse ponctuelle est à $d = L/2 = 0{,}50\ \text{m}$ de l'axe :

$$J_{halt\grave{e}re} = 2 \times m_{point} \times d^2 = 2 \times 1{,}0 \times 0{,}50^2 = 0{,}50\ \text{kg}\cdot\text{m}^2$$

Même masse totale ($2{,}0\ \text{kg}$), même longueur totale ($1{,}0\ \text{m}$) — et pourtant $J_{halt\grave{e}re}$ vaut **trois fois** $J_{tige}$. La différence ne vient pas de « combien de masse », mais uniquement de **comment** cette masse est répartie par rapport à l'axe : concentrée aux extrémités (loin de l'axe), ou étalée uniformément (dont une bonne partie reste proche de l'axe). « Même masse » ne veut jamais dire « même $J_\Delta$ ».

[[figure:moment-inertie]]

[[checkpoint:cp-r3-repartition]]

### Exemple travaillé : chiffrer l'énigme du manège

*Ce qu'on cherche ici, et pourquoi ce geste :* on reprend exactement le manège de l'accroche, on lui donne des valeurs précises, et on calcule $J_\Delta$ dans les deux configurations — pour vérifier, avec des chiffres, que l'intuition qualitative du chapitre 1 est bien confirmée par la définition qu'on vient de construire.

Le manège est un disque homogène de masse $M = 60\ \text{kg}$ et de rayon $R = 1{,}5\ \text{m}$ :

$$J_{disque} = \frac{1}{2}MR^2 = \frac{1}{2}\times 60 \times 1{,}5^2 = \frac{1}{2}\times 60 \times 2{,}25 = 67{,}5\ \text{kg}\cdot\text{m}^2$$

Deux enfants, assimilés à des masses ponctuelles de $25\ \text{kg}$ chacun, s'assoient dessus.

**Configuration A — près du centre**, à $d = 0{,}30\ \text{m}$ de l'axe :

$$J_{enfants,A} = 2 \times 25 \times 0{,}30^2 = 2 \times 25 \times 0{,}09 = 4{,}5\ \text{kg}\cdot\text{m}^2$$

$$J_{total,A} = J_{disque} + J_{enfants,A} = 67{,}5 + 4{,}5 = 72{,}0\ \text{kg}\cdot\text{m}^2$$

**Configuration B — au bord**, à $d = 1{,}5\ \text{m}$ de l'axe :

$$J_{enfants,B} = 2 \times 25 \times 1{,}5^2 = 2 \times 25 \times 2{,}25 = 112{,}5\ \text{kg}\cdot\text{m}^2$$

$$J_{total,B} = J_{disque} + J_{enfants,B} = 67{,}5 + 112{,}5 = 180{,}0\ \text{kg}\cdot\text{m}^2$$

La configuration B a un moment d'inertie **deux fois et demi plus grand** que la configuration A ($180$ contre $72\ \text{kg}\cdot\text{m}^2$), pour exactement la même masse totale embarquée ($60 + 25 + 25 = 110\ \text{kg}$ dans les deux cas). C'est ce nombre-là, $J_\Delta$, qui va gouverner combien le manège accélère pour une poussée donnée — c'est l'objet du chapitre suivant.

---

## R4 — La relation fondamentale de la dynamique de rotation

### Reconstruire la deuxième loi, pour la rotation

On a maintenant les trois ingrédients : une accélération angulaire $\ddot\theta$ (chapitre 2), un moment de force $\mathcal{M}_\Delta(\vec F)$ (chapitre 3), et un moment d'inertie $J_\Delta$ (chapitre 4). Il reste à les relier entre eux, exactement comme la deuxième loi de Newton relie $\vec a_G$, $\vec F$ et $m$ en translation. On ne va pas se contenter de remplacer les lettres : on va vérifier que la substitution est justifiée, à partir d'un point matériel.

### Justifier la relation, à partir d'un point matériel

Prends un point matériel de masse $m$, à une distance $d$ de l'axe $\Delta$, soumis à une force **tangentielle** $F$ (dans le sens du mouvement, la composante radiale étant compensée par les liaisons internes qui maintiennent le point sur son cercle). La deuxième loi de Newton, appliquée à ce point le long de la direction tangentielle, donne :

$$F = m\,a_{tan}$$

où $a_{tan}$ est la composante tangentielle de l'accélération de ce point. Or, de la même façon qu'on a obtenu $v = d\,\omega$ au chapitre 2 (en dérivant l'arc $s = d\,\theta$ une fois), on obtient l'accélération tangentielle en dérivant $v = d\,\omega$ une deuxième fois, $d$ restant constant :

$$a_{tan} = \frac{dv}{dt} = d\,\frac{d\omega}{dt} = d\,\ddot\theta$$

On substitue dans la loi de Newton :

$$F = m\,d\,\ddot\theta$$

Multiplions les deux membres par $d$ :

$$F \cdot d = m\,d^2\,\ddot\theta$$

Le membre de gauche, $F \cdot d$, est exactement le moment de cette force tangentielle par rapport à $\Delta$ (chapitre 3 : $\mathcal{M}_\Delta(\vec F) = d \cdot F$, puisque $F$ est déjà tangentielle). Le facteur $m\,d^2$, au membre de droite, est exactement le moment d'inertie de ce point matériel (chapitre 4). Pour ce point isolé :

$$\mathcal{M}_\Delta(\vec F) = (m\,d^2)\,\ddot\theta$$

### Sommer sur tout le solide

Un solide, c'est un ensemble de points matériels maintenus rigides entre eux. Les forces intérieures — celles que les points du solide exercent les uns sur les autres pour le maintenir rigide — s'annulent par paires dans la somme des moments, par la troisième loi de Newton, exactement comme les forces intérieures s'annulaient déjà dans la somme des forces pour la translation d'un système de points. Il ne reste, en sommant sur tous les points du solide, que les moments des forces **extérieures** :

$$\sum \mathcal{M}_\Delta(\vec F_{ext}) = \left(\sum_i m_i\,d_i^2\right)\ddot\theta = J_\Delta\,\ddot\theta$$

D'où la **relation fondamentale de la dynamique de rotation** :

$$\boxed{\sum \mathcal{M}_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta}$$

C'est l'analogue exact, pour la rotation autour d'un axe fixe, de la deuxième loi de Newton $\sum \vec F_{ext} = m\,\vec a_G$ pour la translation — et on vient de voir précisément **pourquoi** la substitution est légitime : $m \to J_\Delta$ et $\vec F \to \mathcal{M}_\Delta(\vec F)$ ne sont pas des analogies vagues, ce sont les deux mêmes grandeurs qui ressortent, terme à terme, du même calcul appliqué point par point puis sommé.

Rappel utile (chapitre 3) : la réaction de l'axe sur le solide a toujours un moment nul par rapport à $\Delta$ (elle s'applique sur l'axe lui-même, $d=0$). Elle n'apparaît donc jamais dans $\sum \mathcal{M}_\Delta(\vec F_{ext})$ : seules les forces dont la ligne d'action ne passe pas par $\Delta$ contribuent.

### Le dictionnaire translation ↔ rotation

| Translation | Rotation autour d'un axe fixe $\Delta$ |
|---|---|
| Position $x$ | Abscisse angulaire $\theta$ |
| Vitesse $v = \dot x$ | Vitesse angulaire $\omega = \dot\theta$ |
| Accélération $a = \ddot x$ | Accélération angulaire $\ddot\theta$ (ou $\dot\omega$) |
| Masse $m$ (mesure l'inertie) | Moment d'inertie $J_\Delta$ (mesure l'inertie de rotation) |
| Force $\vec F$ | Moment d'une force $\mathcal{M}_\Delta(\vec F)$ |
| $\sum \vec F_{ext} = m\,\vec a_G$ | $\sum \mathcal{M}_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta$ |

### Exemple travaillé : le manège, dans les deux configurations

*Ce qu'on cherche ici, et pourquoi ce geste :* on reprend la poussée du chapitre 3 (sur le bord, $F=30\ \text{N}$, à $d=1{,}5\ \text{m}$, donc $\mathcal{M}_\Delta(\vec F) = 45\ \text{N}\cdot\text{m}$) et les deux valeurs de $J_\Delta$ trouvées au chapitre 4, pour voir, chiffres à l'appui, si le manège de la configuration A (masses près du centre) réagit vraiment plus vite que celui de la configuration B.

On applique la relation fondamentale à chaque configuration, la seule force ayant un moment non nul étant la poussée (la réaction de l'axe a un moment nul, le poids et la réaction verticale du sol n'ont pas de moment tangentiel utile ici) :

**Configuration A** ($J_{total,A} = 72{,}0\ \text{kg}\cdot\text{m}^2$) :

$$\ddot\theta_A = \frac{\mathcal{M}_\Delta(\vec F)}{J_{total,A}} = \frac{45}{72{,}0} = 0{,}625\ \text{rad/s}^2$$

**Configuration B** ($J_{total,B} = 180{,}0\ \text{kg}\cdot\text{m}^2$) :

$$\ddot\theta_B = \frac{\mathcal{M}_\Delta(\vec F)}{J_{total,B}} = \frac{45}{180{,}0} = 0{,}25\ \text{rad/s}^2$$

La configuration A accélère deux fois et demie plus vite que la configuration B — exactement l'inverse du rapport des $J_\Delta$, comme pour la masse en translation. En partant du repos, et l'accélération angulaire étant constante (comme un mouvement uniformément accéléré déjà rencontré en translation, on intègre de la même façon), la vitesse angulaire après $t = 4{,}0\ \text{s}$ vaut $\omega = \ddot\theta\,t$ :

$$\omega_A(4{,}0) = 0{,}625 \times 4{,}0 = 2{,}5\ \text{rad/s} \qquad \omega_B(4{,}0) = 0{,}25 \times 4{,}0 = 1{,}0\ \text{rad/s}$$

En reconvertissant en vitesse linéaire du bord du manège ($R = 1{,}5\ \text{m}$, relation $v = R\,\omega$ établie au chapitre 2) :

$$v_{bord,A} = 1{,}5 \times 2{,}5 = 3{,}75\ \text{m/s} \qquad v_{bord,B} = 1{,}5 \times 1{,}0 = 1{,}5\ \text{m/s}$$

Le bord du manège de la configuration A file deux fois et demie plus vite que celui de la configuration B, après la même poussée pendant la même durée. C'est exactement ce que l'accroche annonçait qualitativement — et maintenant on sait précisément pourquoi, et de combien.

[[checkpoint:cp-r4-relation-fondamentale]]

---

## R5 — L'énergie cinétique de rotation

### La formule, déjà rencontrée

On a déjà construit cette formule, morceau par morceau, au chapitre 4 : pour un point matériel, $E_c = \frac12 (m d^2)\omega^2$ ; en sommant sur tous les points d'un solide :

$$E_c = \sum_i \frac{1}{2}m_i\,d_i^2\,\omega^2 = \frac{1}{2}\left(\sum_i m_i\,d_i^2\right)\omega^2 = \frac{1}{2}\,J_\Delta\,\omega^2$$

D'où l'**énergie cinétique de rotation** d'un solide tournant à la vitesse angulaire $\omega$ autour de l'axe fixe $\Delta$ :

$$\boxed{E_c = \frac{1}{2}\,J_\Delta\,\omega^2}$$

C'est très exactement le même moule que $E_c = \frac12 m v^2$ en translation, avec la même substitution déjà justifiée deux fois ($m \to J_\Delta$, ici $v \to \omega$) : ce n'est donc pas une nouvelle formule à mémoriser à part, c'est la conséquence directe de tout ce qu'on a établi depuis le chapitre 4.

### Exemple travaillé : l'énergie du manège, et une vérification par l'additivité

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule l'énergie cinétique de la configuration A du manège à l'instant $t=4{,}0\ \text{s}$ (chapitre 5 : $\omega_A = 2{,}5\ \text{rad/s}$), puis on vérifie que ce résultat est cohérent avec l'additivité de $J_\Delta$ établie au chapitre 4 — la preuve est dans le calcul, pas dans une affirmation.

**Calcul direct**, avec $J_{total,A} = 72{,}0\ \text{kg}\cdot\text{m}^2$ :

$$E_c = \frac{1}{2}\times 72{,}0 \times 2{,}5^2 = \frac{1}{2}\times 72{,}0 \times 6{,}25 = 225\ \text{J}$$

**Vérification en calculant séparément** l'énergie du disque et celle des deux enfants, à la même $\omega = 2{,}5\ \text{rad/s}$ :

$$E_{c,disque} = \frac{1}{2}\times 67{,}5 \times 2{,}5^2 = \frac{1}{2}\times 67{,}5\times 6{,}25 = 210{,}9\ \text{J}$$

$$E_{c,enfants} = \frac{1}{2}\times 4{,}5 \times 2{,}5^2 = \frac{1}{2}\times 4{,}5\times 6{,}25 = 14{,}1\ \text{J}$$

$$E_{c,disque} + E_{c,enfants} = 210{,}9 + 14{,}1 = 225{,}0\ \text{J}$$

Les deux méthodes donnent exactement le même résultat, $225\ \text{J}$ — ce qui confirme que l'additivité de $J_\Delta$ (chapitre 4) se transmet directement à l'additivité de l'énergie cinétique de rotation : l'énergie totale d'un système composite, en rotation à une $\omega$ commune, est la somme des énergies de chacune de ses parties.

---

## R6 — Application : le pendule pesant, un solide qui oscille en tournant

### Le système

Un **pendule pesant** est un solide quelconque — pas nécessairement une masse ponctuelle — pouvant pivoter sans frottement autour d'un axe fixe horizontal $\Delta$ qui ne passe généralement pas par son centre d'inertie $G$. C'est le cas d'une porte, d'un balancier d'horloge, ou d'une simple tige suspendue par une extrémité. On note $d = \Delta G$ la distance entre l'axe et le centre d'inertie, et $\theta$ l'angle entre la droite $\Delta G$ et la verticale (l'équilibre stable correspond à $\theta = 0$, quand $G$ est à la verticale sous $\Delta$).

Ce système va nous permettre de mettre tout ce chapitre au travail en même temps : la cinématique angulaire (chapitre 2), le moment d'une force (chapitre 3), le moment d'inertie (chapitre 4), et la relation fondamentale (chapitre 5).

### Établir l'équation du mouvement

**Bilan des moments par rapport à $\Delta$.** Deux forces s'exercent sur le solide : son poids $\vec P = m\vec g$, appliqué en $G$, et la réaction de l'axe, appliquée sur l'axe lui-même. Par le chapitre 3, la réaction de l'axe a un bras de levier nul : son moment par rapport à $\Delta$ est **toujours nul**. Seul le poids contribue.

**Le moment du poids.** Le poids est vertical. Quand la droite $\Delta G$ fait un angle $\theta$ avec la verticale, la distance entre l'axe $\Delta$ et la ligne d'action verticale du poids — le vrai bras de levier — est le côté du triangle rectangle $\Delta G$ (hypoténuse, longueur $d$) opposé à l'angle $\theta$, c'est-à-dire $d\sin\theta$. Le moment du poids vaut donc, en norme, $mg\,d\sin\theta$ ; le signe est négatif parce que ce moment tend **toujours** à ramener $\theta$ vers $0$, quel que soit le sens de l'écart (à droite de la verticale, il pousse vers la gauche ; à gauche, vers la droite) :

$$\mathcal{M}_\Delta(\vec P) = -mg\,d\sin\theta$$

[[figure:pendule-pesant-bras-levier]]

**La relation fondamentale**, avec ce seul moment non nul :

$$J_\Delta\,\ddot\theta = -mg\,d\sin\theta$$

C'est l'équation du mouvement du pendule pesant. Remarque sa forme : c'est la même famille d'équation que celle du pendule simple (déjà rencontrée au chapitre sur les systèmes oscillants) — sauf qu'ici, $J_\Delta$ remplace la masse ponctuelle $m L^2$ du pendule simple, parce que la masse du solide n'est plus concentrée en un seul point.

### Pourquoi l'oscillation, pour les petits angles

Comme pour le pendule simple, cette équation exacte n'est pas encore celle d'un oscillateur harmonique, à cause du $\sin\theta$. Mais dans l'approximation des petites oscillations ($\sin\theta \approx \theta$, valable en dessous d'une vingtaine de degrés), elle devient :

$$\ddot\theta + \frac{mg\,d}{J_\Delta}\,\theta = 0$$

exactement la forme $\ddot\theta + \omega_0^2\,\theta = 0$ déjà résolue au chapitre sur les systèmes oscillants, avec $\omega_0 = \sqrt{\dfrac{mg\,d}{J_\Delta}}$ et une période propre :

$$T_0 = 2\pi\sqrt{\frac{J_\Delta}{mg\,d}}$$

La résolution complète de cette équation (vérification du cosinus, isochronisme des petites oscillations) est faite en détail dans ce chapitre-là ; ici, on se contente d'utiliser le résultat pour calculer une situation concrète.

### Exemple travaillé : une tige suspendue par une extrémité

*Ce qu'on cherche ici, et pourquoi ce geste :* on prend une tige homogène, on la suspend par un bout (exactement la configuration « tige, axe à une extrémité » de la table du chapitre 4), et on calcule sa période propre — pour voir tout le chapitre converger sur un seul résultat numérique.

Une tige homogène de masse $m = 0{,}80\ \text{kg}$ et de longueur $L = 1{,}5\ \text{m}$ pivote sans frottement autour d'un axe horizontal $\Delta$ passant par l'une de ses extrémités. On prend $g \approx 9{,}8\ \text{m/s}^2$.

**Moment d'inertie**, avec la valeur usuelle « tige, axe à une extrémité » (chapitre 4) :

$$J_\Delta = \frac{1}{3}\,m L^2 = \frac{1}{3}\times 0{,}80\times 1{,}5^2 = \frac{1}{3}\times 0{,}80\times 2{,}25 = 0{,}60\ \text{kg}\cdot\text{m}^2$$

**Distance $\Delta G$** : pour une tige homogène, le centre d'inertie est en son milieu, donc :

$$d = \frac{L}{2} = 0{,}75\ \text{m}$$

**Période propre** :

$$mg\,d = 0{,}80\times 9{,}8\times 0{,}75 = 5{,}88\ \text{N}\cdot\text{m}$$

$$T_0 = 2\pi\sqrt{\frac{J_\Delta}{mg\,d}} = 2\pi\sqrt{\frac{0{,}60}{5{,}88}} = 2\pi\sqrt{0{,}102} \approx 2{,}0\ \text{s}$$

Un aller-retour complet dure environ deux secondes, pour cette tige suspendue par un bout et lâchée avec un petit angle.

**Et pour un angle qui n'est pas petit ?** À titre de comparaison, calculons l'accélération angulaire instantanée, avec l'équation exacte (pas l'approximation), pour un lâcher à $\theta = 10^\circ \approx 0{,}175\ \text{rad}$ (où $\sin 10^\circ \approx 0{,}174$) :

$$\ddot\theta = -\frac{mg\,d\sin\theta}{J_\Delta} = -\frac{5{,}88\times 0{,}174}{0{,}60} \approx -1{,}7\ \text{rad/s}^2$$

Le signe négatif confirme que le moment du poids ramène toujours la tige vers la verticale, quel que soit le côté d'où on l'a lâchée — exactement le mécanisme de rappel déjà rencontré pour le pendule simple, ici porté par le moment du poids plutôt que par une composante tangentielle de force sur un point isolé.

[[checkpoint:cp-r6-pendule-pesant]]

---

## R7 — Pour t'entraîner

### Ce que ces exercices empruntent à d'autres chapitres

Un sujet de rotation fait rarement tourner un solide dans le vide. Il l'accroche à un fil qui passe sur une poulie, le pose sur un plan incliné, ou lui demande un bilan d'énergie. Deux outils reviennent alors, que **cette leçon n'enseigne pas** :

- **La décomposition du poids sur un plan incliné** — la composante $mg\sin\alpha$ le long de la pente, $mg\cos\alpha$ perpendiculairement. Elle est établie dans « **Les lois de Newton** », au chapitre consacré au solide sur un plan incliné, et reprise dans « **Chute libre et mouvements plans** ». Un exercice de rotation la mobilise dès qu'un objet en translation tire le solide tournant.
- **Le travail d'une force et le théorème de l'énergie cinétique**, dans « **Aspects énergétiques** ». Ce chapitre-ci donne l'énergie cinétique de rotation $E_c = \frac{1}{2}J_\Delta\,\dot\theta^{\,2}$ (chapitre 6), mais pas la machinerie du travail qui la fait varier.

Ce ne sont pas des manques : un exercice de mécanique assemble presque toujours translation et rotation, cinématique et énergie. Savoir **d'où vient** chaque geste évite de croire qu'on a oublié une formule de ce chapitre.

### Récapitulatif express

- La rotation d'un solide rigide autour d'un axe fixe $\Delta$ se décrit avec un seul angle, l'**abscisse angulaire** $\theta(t)$, commun à tout le solide ; sa **vitesse angulaire** $\omega = \dot\theta$ et son **accélération angulaire** $\ddot\theta = \dot\omega$ en découlent.
- La vitesse **linéaire** d'un point du solide à distance $d$ de l'axe vaut $v = d\,\omega$ : $\omega$ est la même partout sur le solide, $v$ ne l'est pas.
- Le **moment d'une force** par rapport à $\Delta$, $\mathcal{M}_\Delta(\vec F) = \pm\,d\cdot F$, mesure son efficacité à faire tourner : une force au bras de levier nul ($d=0$, ou appliquée sur l'axe) a un moment nul, quelle que soit son intensité.
- Le **moment d'inertie** $J_\Delta = \sum_i m_i d_i^2$ mesure la résistance d'un solide à changer sa rotation : il dépend de la masse **et** de sa répartition par rapport à l'axe (une masse deux fois plus loin compte quatre fois plus). Il est additif, et se lit directement sur une table pour les solides usuels (tige, disque, cylindre).
- La **relation fondamentale de la dynamique de rotation**, $\sum \mathcal{M}_\Delta(\vec F_{ext}) = J_\Delta\,\ddot\theta$, est l'analogue exact — et justifié terme à terme — de $\sum \vec F_{ext} = m\,\vec a_G$.
- L'**énergie cinétique de rotation** $E_c = \frac12 J_\Delta \omega^2$ suit la même forme que $\frac12 m v^2$, avec la même substitution.
- Le **pendule pesant** applique tout ceci : $J_\Delta\,\ddot\theta = -mg\,d\sin\theta$, qui redonne, aux petites oscillations, l'équation harmonique et $T_0 = 2\pi\sqrt{J_\Delta/(mg\,d)}$.

### Exercice de type bac

À toi. L'exercice qui suit est la transcription fidèle d'un sujet officiel : la 1ère situation de l'exercice « Mécanique » de la session rattrapage 2011 (« Étude dynamique d'une grue »), la seule occurrence nationale dédiée trouvée pour cette notion. Cherche sur papier d'abord, engage une réponse à chaque question, puis seulement ouvre le raisonnement expert et compare-le au tien.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, enrobage différent : un treuil de chantier au lieu d'une grue, pour vérifier que tu reconnais la procédure plutôt que le décor.

[[exercise:r-variation]]
