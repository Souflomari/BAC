# Chute libre et mouvements plans

---

## R0 — Accroche : le ballon qui part... et qui revient plus loin

Imagine un joueur de basket qui tire au panier. Il ne lance pas le ballon à l'horizontale : il lui donne un angle vers le haut, et le ballon dessine dans les airs une belle courbe en cloche avant de retomber dans le panier, plus loin et plus bas que le point le plus haut de sa trajectoire.

Avant de lire la suite, prends position, vraiment, sur une seule question : pendant tout ce vol — de la main du joueur jusqu'au panier — **est-ce que la vitesse horizontale du ballon change ?** Ralentit-elle progressivement, comme si le ballon « s'essoufflait » horizontalement à mesure qu'il monte, pour reprendre de la vitesse en redescendant ? Ou reste-t-elle rigoureusement la même, du premier instant au dernier ?

Beaucoup de raisonnements naturels penchent pour la première réponse : on voit le ballon ralentir en montant (ça, c'est vrai, mais c'est sa vitesse *verticale*), et on généralise cette impression à tout le mouvement, y compris à l'horizontale. C'est une confusion qui mérite d'être testée directement, pas supposée.

Garde ta réponse en tête. Cette leçon va construire, morceau par morceau, exactement les outils qu'il faut pour trancher cette question avec un calcul, pas avec une impression — et pour répondre ensuite à des questions voisines : jusqu'où va le ballon (sa **portée**) ? Jusqu'à quelle hauteur monte-t-il (sa **flèche**) ? Et qu'est-ce qui changerait si on lançait, à la place du ballon, une petite particule chargée dans un champ magnétique ?

On commence par le cas le plus simple : un mouvement qui n'a qu'une seule direction.

---

## R1 — Rappel actif : la chute libre verticale, une seule dimension d'abord

### Ce qu'on reprend du chapitre précédent

Au chapitre des lois de Newton, tu as établi que pour un objet en **chute libre** — soumis uniquement à son poids, frottements de l'air négligés — le vecteur accélération de son centre d'inertie vaut $\vec{g}$, quelle que soit sa masse. On repart directement de ce résultat, avec la méthode bilan / repère / projection déjà vue :

$$\vec{P} = m\,\vec{a}_G$$

$$m\,\vec{g} = m\,\vec{a}_G$$

$$\vec{a}_G = \vec{g}$$

Cette fois, on choisit un repère avec l'axe $Oy$ **vertical, orienté vers le haut** — c'est le choix qu'on va garder pour tout le reste de cette leçon, parce qu'il va falloir, dans quelques chapitres, ajouter un axe horizontal à côté de lui, et il est plus simple de fixer une bonne fois les conventions de signe. Avec cette orientation, $\vec{g}$ pointe vers le bas, donc **à l'opposé** du sens choisi pour $Oy$ : sa composante selon $Oy$ est donc **négative**, $g_y = -g$, avec $g \approx 9{,}8\ \text{m/s}^2$.

Retiens bien ce point de méthode : ce signe négatif n'a rien de mystérieux ni d'universel — il est la conséquence directe du choix « $Oy$ vers le haut ». Si tu avais choisi $Oy$ vers le bas (comme au chapitre précédent), tu aurais trouvé $a_y = +g$. Les deux sont corrects ; ce qui compte, c'est de projeter honnêtement TA propre convention, pas de mémoriser un signe tout fait.

### Construire $v_y(t)$ puis $y(t)$

Projeté sur $Oy$, $\vec{a}_G = \vec{g}$ donne une accélération verticale **constante** :

$$a_y = -g$$

Une accélération constante se primitive directement pour donner la vitesse : si $v_{0y}$ est la vitesse verticale à l'instant initial $t=0$,

$$v_y(t) = v_{0y} - g\,t$$

Et une seconde primitivation, avec $y_0$ la position verticale initiale, donne la position :

$$y(t) = y_0 + v_{0y}\,t - \frac{1}{2}g\,t^2$$

$v_{0y}$ peut être positive (objet lancé vers le haut), négative (objet lancé vers le bas) ou nulle (objet lâché sans vitesse, comme au chapitre précédent) — la formule ne change pas, seul le signe de $v_{0y}$ change.

### Exemple travaillé : une balle lancée verticalement vers le haut

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut voir concrètement comment $v_y(t)$ et $y(t)$ se comportent avec une vitesse initiale non nulle — et repérer une symétrie qui va nous resservir plus tard, presque telle quelle, pour le mouvement d'un projectile.

On lance une balle verticalement vers le haut, depuis le sol ($y_0 = 0$), avec une vitesse initiale $v_{0y} = 9{,}8\ \text{m/s}$. On prend $g \approx 9{,}8\ \text{m/s}^2$.

$$v_y(t) = 9{,}8 - 9{,}8\,t$$

$$y(t) = 9{,}8\,t - 4{,}9\,t^2$$

**Instant où la balle atteint le sommet :** c'est l'instant où la vitesse verticale s'annule — la balle cesse un instant de monter avant de redescendre.

$$v_y(t) = 0 \implies 9{,}8 - 9{,}8\,t = 0 \implies t_{sommet} = 1{,}0\ \text{s}$$

$$y(t_{sommet}) = 9{,}8 \times 1{,}0 - 4{,}9 \times 1{,}0^2 = 9{,}8 - 4{,}9 = 4{,}9\ \text{m}$$

**Instant où la balle retombe au sol :** on cherche l'autre instant (que $t=0$) où $y(t) = 0$.

$$9{,}8\,t - 4{,}9\,t^2 = 0 \implies t\,(9{,}8 - 4{,}9\,t) = 0 \implies t = 0 \ \text{ou}\ t_{sol} = 2{,}0\ \text{s}$$

Remarque ce qui vient de se produire : $t_{sol} = 2{,}0\ \text{s}$ est exactement **le double** de $t_{sommet} = 1{,}0\ \text{s}$. La montée et la descente prennent rigoureusement le même temps. Ce n'est pas une coïncidence de cet exemple précis — c'est une conséquence directe de la forme parabolique de $y(t)$, et on va retrouver exactement cette même symétrie, avec les mêmes noms, dans le mouvement à deux dimensions du chapitre suivant.

[[figure:symetrie-montee-descente]]

---

## R2 — Le mécanisme : la 2e loi de Newton décompose le mouvement en deux axes indépendants

### Le système et le bilan des forces

On lance maintenant un projectile — une balle, un ballon, une pierre — non plus à la verticale, mais avec une vitesse initiale $\vec{v}_0$ **inclinée** d'un angle $\alpha$ au-dessus de l'horizontale. On travaille dans le référentiel terrestre, supposé galiléen, et on néglige les frottements de l'air : la seule force qui s'exerce sur le projectile est son poids $\vec{P} = m\vec{g}$.

La deuxième loi de Newton s'écrit exactement comme au chapitre précédent :

$$\vec{P} = m\,\vec{a}_G \implies \vec{a}_G = \vec{g}$$

Rien de nouveau jusqu'ici : la masse du projectile disparaît complètement de l'équation, exactement comme en chute verticale. **Retiens ce point, on y reviendra plus loin : la trajectoire d'un projectile en chute libre ne dépend ni de sa masse ni de son poids** — deux balles de masses différentes, lancées avec le même $\vec{v}_0$, suivraient très exactement la même trajectoire.

### Choisir le repère et projeter

On choisit un repère à deux axes : $Ox$ horizontal, dans le sens du lancer ; $Oy$ vertical, vers le haut — le même $Oy$ qu'au chapitre précédent. L'origine est prise au point de lancement, à l'instant $t=0$.

Le vecteur $\vec{g}$ est purement vertical : il n'a **aucune** composante horizontale. En projetant $\vec{a}_G = \vec{g}$ sur les deux axes, on obtient donc deux équations scalaires **indépendantes** :

$$a_x = 0 \qquad \text{et} \qquad a_y = -g$$

Arrête-toi sur ce que dit la première équation, parce que c'est le cœur de cette leçon : **l'accélération horizontale est nulle, à tout instant du vol, du lancer jusqu'à l'impact.** Ce n'est pas une approximation qui vaudrait « au début » puis s'éroderait — c'est une égalité qui tient à chaque instant, tant qu'aucune force horizontale n'apparaît (et il n'y en a aucune ici, puisque la seule force est le poids, purement vertical).

### Ce que ça implique pour $v_x(t)$ — et pourquoi ta prédiction du chapitre 1 se teste ici

Une accélération horizontale nulle, constante, se primitive en une vitesse horizontale **constante** :

$$v_x(t) = v_{0x}$$

Ce résultat mérite qu'on s'y arrête, parce qu'il tranche directement la question posée au chapitre 1. Beaucoup d'élèves imaginent que la vitesse horizontale ralentit en même temps que la vitesse verticale ralentit (en montée), pour ensuite « reprendre » en redescente — comme si les deux composantes étaient liées. Ce n'est pas le cas : ce sont deux mouvements **complètement indépendants**, gouvernés par deux équations séparées. La composante verticale $v_y(t)$ change bel et bien avec le temps (elle diminue, s'annule au sommet, puis devient négative) — c'est elle qu'on voit ralentir puis s'inverser. Mais $v_x(t)$, elle, ne bouge pas d'un iota : elle vaut $v_{0x}$ au lancer, $v_{0x}$ au sommet, $v_{0x}$ à l'impact. Rien dans le bilan des forces ne pourrait la faire changer, puisque $a_x = 0$ à chaque instant.

[[motion:vecteurs-le-long-parabole]]

On primitive une seconde fois pour obtenir les positions — ce sont les **équations horaires** du mouvement :

$$x(t) = v_{0x}\,t$$

$$y(t) = v_{0y}\,t - \frac{1}{2}g\,t^2$$

où $v_{0x}$ et $v_{0y}$ sont les composantes du vecteur vitesse initial $\vec{v}_0$, obtenues par projection de $\vec{v}_0$ sur les deux axes :

$$v_{0x} = v_0\cos\alpha \qquad \text{et} \qquad v_{0y} = v_0\sin\alpha$$

**Vérification aux deux cas extrêmes** (la même méthode qu'au chapitre précédent, pour être sûr du bon rôle de $\sin$ et $\cos$) : si $\alpha \to 0^\circ$ (lancer parfaitement horizontal), toute la vitesse doit être horizontale — $\cos 0^\circ = 1$ et $\sin 0^\circ = 0$ confirment $v_{0x} = v_0$, $v_{0y} = 0$. Si $\alpha \to 90^\circ$ (lancer parfaitement vertical), toute la vitesse doit être verticale — $\cos 90^\circ = 0$ et $\sin 90^\circ = 1$ confirment $v_{0x} = 0$, $v_{0y} = v_0$. Ce dernier cas est exactement la chute verticale du chapitre précédent : elle n'est pas un cas séparé, c'est le cas particulier $\alpha = 90^\circ$ du mouvement qu'on étudie maintenant, où le mouvement horizontal disparaît simplement parce que $v_{0x} = 0$.

### Exemple travaillé : construire les quatre équations

*Ce qu'on cherche ici, et pourquoi ce geste :* avant de pouvoir parler de trajectoire, de flèche ou de portée dans les chapitres suivants, il faut ces quatre équations, une bonne fois, proprement établies. On va les réutiliser telles quelles.

On lance un projectile avec une vitesse initiale de norme $v_0 = 25\ \text{m/s}$, faisant un angle $\alpha$ avec l'horizontale tel que $\sin\alpha = 0{,}60$ et $\cos\alpha = 0{,}80$. On prend $g \approx 9{,}8\ \text{m/s}^2$, origine au point de lancement.

**Composantes de la vitesse initiale :**

$$v_{0x} = v_0\cos\alpha = 25 \times 0{,}80 = 20\ \text{m/s}$$

$$v_{0y} = v_0\sin\alpha = 25 \times 0{,}60 = 15\ \text{m/s}$$

**Les quatre équations du mouvement :**

$$v_x(t) = 20\ \text{m/s} \qquad (\text{constante, pour tout } t)$$

$$v_y(t) = 15 - 9{,}8\,t$$

$$x(t) = 20\,t$$

$$y(t) = 15\,t - 4{,}9\,t^2$$

On va garder cet exemple — ce même $v_0$, ce même $\alpha$ — pour les chapitres suivants.

---

## R3 — De deux équations horaires à une trajectoire : éliminer le temps

### Ce que $x(t)$ et $y(t)$ ne disent pas directement

Les équations horaires $x(t)$ et $y(t)$ du chapitre précédent disent où se trouve le projectile à un instant $t$ donné. Mais elles ne disent pas directement, sans passer par $t$, quelle **forme géométrique** dessine sa trajectoire — la courbe que suivrait un pinceau attaché au projectile. Pour ça, il faut une relation entre $y$ et $x$ seuls, sans $t$ dedans. On l'obtient en **éliminant le temps** entre les deux équations horaires.

### La méthode

$$x(t) = v_{0x}\,t$$

Cette relation est réversible tant que $v_{0x} \neq 0$ (c'est-à-dire tant que $\alpha \neq 90^\circ$ — le seul cas où elle ne le serait pas est la chute verticale pure du chapitre 2, qui n'a pas de trajectoire à proprement parler puisque $x$ reste nul). On peut donc isoler $t$ :

$$t = \frac{x}{v_{0x}}$$

On substitue cette expression de $t$ dans $y(t)$ :

$$y = v_{0y}\cdot\frac{x}{v_{0x}} - \frac{1}{2}g\left(\frac{x}{v_{0x}}\right)^2$$

Le premier terme se simplifie : $\dfrac{v_{0y}}{v_{0x}} = \dfrac{v_0\sin\alpha}{v_0\cos\alpha} = \tan\alpha$.

$$y(x) = \tan\alpha \cdot x - \frac{g}{2\,v_{0x}^2}\,x^2$$

Et puisque $v_{0x} = v_0\cos\alpha$, donc $v_{0x}^2 = v_0^2\cos^2\alpha$ :

$$y(x) = \tan\alpha \cdot x - \frac{g}{2\,v_0^2\cos^2\alpha}\,x^2$$

C'est l'**équation de la trajectoire**. Regarde sa forme : $y$ s'exprime comme $A\,x - B\,x^2$, avec $A = \tan\alpha$ et $B = \dfrac{g}{2v_0^2\cos^2\alpha}$ tous deux positifs (pour $0^\circ < \alpha < 90^\circ$). C'est l'équation d'une **parabole**, et le signe négatif devant $x^2$ dit qu'elle est tournée vers le bas — exactement la forme en cloche qu'on observe sur le ballon de basket de l'accroche.

Remarque aussi ce qui **n'apparaît pas** dans cette équation : la masse $m$ du projectile. Elle n'y a jamais été présente, à aucune étape — elle avait déjà disparu dès la deuxième loi ($\vec{a}_G = \vec{g}$, indépendant de $m$). Deux projectiles de masses différentes, lancés avec le même $v_0$ et le même $\alpha$, suivent très exactement la même courbe $y(x)$.

### Exemple travaillé : l'équation de la trajectoire, avec vérification

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la formule à l'exemple du chapitre précédent, puis on vérifie le résultat à un point qu'on connaît déjà par un autre calcul — c'est la meilleure garantie qu'on n'a pas fait d'erreur de substitution.

Avec $v_0 = 25\ \text{m/s}$, $\sin\alpha = 0{,}60$, $\cos\alpha = 0{,}80$, $g \approx 9{,}8\ \text{m/s}^2$ :

$$\tan\alpha = \frac{0{,}60}{0{,}80} = 0{,}75$$

$$\frac{g}{2v_0^2\cos^2\alpha} = \frac{9{,}8}{2 \times 25^2 \times 0{,}80^2} = \frac{9{,}8}{800} = 0{,}01225$$

$$y(x) = 0{,}75\,x - 0{,}01225\,x^2$$

**Vérification à $x = 20\ \text{m}$ :** d'après les équations horaires du chapitre précédent, $x(t) = 20t = 20\ \text{m}$ à l'instant $t = 1{,}0\ \text{s}$, et à cet instant $y(1{,}0) = 15\times 1{,}0 - 4{,}9\times 1{,}0^2 = 15 - 4{,}9 = 10{,}1\ \text{m}$. Avec l'équation de la trajectoire : $y(20) = 0{,}75\times 20 - 0{,}01225\times 20^2 = 15 - 4{,}9 = 10{,}1\ \text{m}$. Les deux méthodes donnent exactement le même résultat — l'élimination du temps n'a rien perdu, elle a seulement changé de variable.

---

## R4 — La flèche et la portée : deux grandeurs, deux définitions

### Arrête-toi avant de lire la suite

Voici deux mots qu'on va employer tout le temps dans ce chapitre, et qu'il ne faut jamais confondre : la **flèche** et la **portée** d'un tir. Avant de lire leurs définitions précises, prends position : d'après toi, laquelle des deux mesure une hauteur, et laquelle mesure une distance horizontale au sol ?

Ce n'est pas un hasard si on te pose la question maintenant : c'est exactement le genre de vocabulaire qu'on peut apprendre « à l'envers » si on ne s'arrête pas dessus une bonne fois. Voici les définitions, sans ambiguïté :

- La **flèche**, c'est la **hauteur maximale** atteinte par le projectile — une grandeur *verticale*, mesurée à partir du point de lancement. Elle se situe au sommet de la trajectoire.
- La **portée**, c'est la **distance horizontale totale** parcourue par le projectile, du point de lancement jusqu'à son point de chute (au même niveau que le départ) — une grandeur *horizontale*.

Retiens l'image : la flèche, c'est « jusqu'où ça monte » ; la portée, c'est « jusqu'où ça va, au sol ». Les deux se calculent à partir des mêmes équations horaires, mais ce ne sont pas la même question, et ce ne sont jamais le même nombre.

[[figure:trajectoire-parabolique]]

### Calculer la flèche : le sommet, c'est $v_y = 0$

Le sommet de la trajectoire est l'instant où le projectile cesse un instant de monter avant de redescendre — exactement le même critère qu'au chapitre 2 pour la balle lancée à la verticale : la vitesse verticale s'y annule.

$$v_y(t) = v_{0y} - g\,t = 0$$

$$t_{sommet} = \frac{v_{0y}}{g}$$

On substitue cet instant dans $y(t)$ pour obtenir la hauteur maximale :

$$y_{max} = v_{0y}\cdot\frac{v_{0y}}{g} - \frac{1}{2}g\left(\frac{v_{0y}}{g}\right)^2$$

$$y_{max} = \frac{v_{0y}^2}{g} - \frac{v_{0y}^2}{2g}$$

$$y_{max} = \frac{v_{0y}^2}{2g}$$

Donc, en remplaçant $v_{0y} = v_0\sin\alpha$, la **flèche** vaut :

$$f = \frac{v_0^2\sin^2\alpha}{2g}$$

### Calculer la portée : le retour à $y = 0$

Le point de chute (au même niveau que le lancement) est l'autre instant, en plus de $t=0$, où $y(t) = 0$ :

$$y(t) = t\left(v_{0y} - \frac{1}{2}g\,t\right) = 0$$

$$t = 0 \quad \text{ou} \quad t_{portee} = \frac{2v_{0y}}{g}$$

Remarque immédiatement : $t_{portee} = 2\,t_{sommet}$ — exactement la même symétrie « montée = descente » observée au chapitre 2. Ce n'est toujours pas un hasard : la trajectoire $y(x)$ est une parabole (chapitre 4), et une parabole est symétrique par rapport à son sommet.

La **portée** est la position horizontale à cet instant :

$$D = x(t_{portee}) = v_{0x}\cdot\frac{2v_{0y}}{g} = \frac{2\,v_0\cos\alpha \cdot v_0\sin\alpha}{g}$$

$$D = \frac{2v_0^2\sin\alpha\cos\alpha}{g}$$

Un rappel de trigonométrie ($2\sin\alpha\cos\alpha = \sin(2\alpha)$) permet de récrire ce résultat sous une forme plus compacte, qu'on utilisera au chapitre suivant :

$$D = \frac{v_0^2\sin(2\alpha)}{g}$$

### Exemple travaillé : flèche et portée du tir de référence

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique les deux formules au même exemple numérique qu'aux chapitres précédents, pour voir concrètement que flèche et portée sont deux nombres différents, de nature différente.

Toujours avec $v_0 = 25\ \text{m/s}$, $\sin\alpha = 0{,}60$, $\cos\alpha = 0{,}80$, $g \approx 9{,}8\ \text{m/s}^2$ (donc $v_{0x} = 20\ \text{m/s}$, $v_{0y} = 15\ \text{m/s}$) :

$$t_{sommet} = \frac{v_{0y}}{g} = \frac{15}{9{,}8} \approx 1{,}53\ \text{s}$$

$$f = \frac{v_{0y}^2}{2g} = \frac{15^2}{2\times 9{,}8} = \frac{225}{19{,}6} \approx 11{,}5\ \text{m}$$

$$t_{portee} = 2\,t_{sommet} \approx 3{,}06\ \text{s}$$

$$D = v_{0x}\cdot t_{portee} = 20 \times 3{,}06 \approx 61{,}2\ \text{m}$$

La flèche ($\approx 11{,}5\ \text{m}$) et la portée ($\approx 61{,}2\ \text{m}$) sont deux nombres très différents, mesurant deux choses différentes : l'un une hauteur atteinte une seule fois, au sommet ; l'autre une distance au sol, atteinte à l'arrivée. Ne dis jamais « la flèche vaut 61,2 m » ni « la portée vaut 11,5 m » — ce sont deux réponses à deux questions distinctes.

---

## R5 — L'influence des conditions initiales : angle et vitesse de lancement

On dispose maintenant de deux formules :

$$f = \frac{v_0^2\sin^2\alpha}{2g} \qquad \text{et} \qquad D = \frac{v_0^2\sin(2\alpha)}{g}$$

Ces deux formules disent exactement comment le tir change quand on change $v_0$ ou $\alpha$ au départ. C'est ce qu'on appelle l'influence des **conditions initiales**.

### Prends position avant de calculer

Pour une même vitesse initiale $v_0$, quel angle de lancement $\alpha$ donne, selon toi, la plus grande portée ? Le plus petit angle possible (un tir presque à l'horizontale, très rapide, très bas) ? Le plus grand (un tir presque à la verticale) ? Ou un angle entre les deux ?

[[embed:projectile-sandbox]]

### L'effet de l'angle, à $v_0$ fixé

Regarde d'abord la flèche : $f = \dfrac{v_0^2\sin^2\alpha}{2g}$ augmente avec $\alpha$ sans jamais redescendre, sur tout l'intervalle $0^\circ$ à $90^\circ$ — $\sin^2\alpha$ croît continûment de $0$ à $1$. Plus l'angle de lancement est grand, plus le tir monte haut. Ça, c'est conforme à l'intuition.

La portée, elle, se comporte différemment, à cause du terme $\sin(2\alpha)$. Regarde ce terme aux deux extrêmes : si $\alpha \to 0^\circ$ (tir presque à plat), $\sin(2\alpha) \to 0$ — la portée est presque nulle, le tir ne quitte quasiment pas le sol. Si $\alpha \to 90^\circ$ (tir presque vertical), $2\alpha \to 180^\circ$, donc $\sin(2\alpha) \to 0$ aussi — la portée est encore presque nulle, cette fois parce que le tir monte tout droit et retombe quasiment sur place. Entre les deux, $\sin(2\alpha)$ atteint sa valeur maximale, $1$, quand $2\alpha = 90^\circ$, c'est-à-dire $\alpha = 45^\circ$.

**La portée est donc maximale pour un angle de lancement de $45^\circ$ — à vitesse initiale fixée, et à condition que l'arrivée se fasse au même niveau que le départ.** Cette seconde condition compte autant que la première : dès qu'on lance d'une hauteur, ou qu'on retombe sur un plan incliné, l'angle optimal n'est plus $45^\circ$. Ni le tir le plus plat, ni le tir le plus vertical, ne donnent la plus grande distance — c'est un compromis entre les deux qui l'emporte.

### La symétrie surprenante : deux angles complémentaires, la même portée

Il y a une conséquence de $\sin(2\alpha)$ qui surprend souvent : deux angles **complémentaires** (qui s'additionnent à $90^\circ$) donnent exactement la **même portée**. En effet, $\sin(2(90^\circ - \alpha)) = \sin(180^\circ - 2\alpha) = \sin(2\alpha)$ — la même valeur.

Vérifions-le sur notre exemple numérique. On avait $\sin\alpha = 0{,}60$, $\cos\alpha = 0{,}80$, et $D \approx 61{,}2\ \text{m}$. Prenons maintenant l'angle complémentaire $\alpha' = 90^\circ - \alpha$, pour lequel $\sin\alpha' = \cos\alpha = 0{,}80$ et $\cos\alpha' = \sin\alpha = 0{,}60$ — les deux valeurs sont simplement échangées.

$$D' = \frac{2v_0^2\sin\alpha'\cos\alpha'}{g} = \frac{2\times 25^2\times 0{,}80\times 0{,}60}{g} = \frac{2\times 25^2\times 0{,}60\times 0{,}80}{g} = D$$

Le produit $\sin\alpha'\cos\alpha'$ contient les deux mêmes facteurs $0{,}60$ et $0{,}80$ que $\sin\alpha\cos\alpha$, juste échangés — et un produit ne change pas quand on échange ses deux facteurs. Les deux tirs — l'un plus plat et plus rapide horizontalement, l'autre plus haut et plus lent horizontalement — atterrissent donc au même endroit, à $61{,}2\ \text{m}$, bien que leurs trajectoires (et leurs flèches) soient très différentes : le tir à $\alpha'$ (plus incliné) a une flèche plus grande que le tir à $\alpha$, exactement parce que $\sin^2\alpha' = 0{,}80^2 = 0{,}64 > \sin^2\alpha = 0{,}60^2 = 0{,}36$.

### L'effet de la vitesse initiale, à $\alpha$ fixé

Regarde maintenant comment $f$ et $D$ dépendent de $v_0$ : les deux formules contiennent $v_0^2$, et rien d'autre en $v_0$. Doubler la vitesse de lancement ne double donc ni la flèche ni la portée — ça les **quadruple** ($2^2 = 4$).

Vérifions sur notre exemple : avec $v_0 = 25\ \text{m/s}$, on avait $f \approx 11{,}5\ \text{m}$ et $D \approx 61{,}2\ \text{m}$. Avec $v_0 = 50\ \text{m/s}$ (le double), même angle :

$$f' = \frac{50^2\times 0{,}60^2}{2\times 9{,}8} = \frac{2500\times 0{,}36}{19{,}6} = \frac{900}{19{,}6} \approx 45{,}9\ \text{m} \approx 4\times 11{,}5\ \text{m}$$

$$D' = \frac{2500\times 0{,}96}{9{,}8} = \frac{2400}{9{,}8} \approx 244{,}9\ \text{m} \approx 4\times 61{,}2\ \text{m}$$

Un lancer deux fois plus rapide monte quatre fois plus haut et va quatre fois plus loin — pas deux fois. C'est la conséquence directe du $v_0^2$ dans les deux formules.

---

## R6 — La même méthode, une force d'un nouveau genre : la particule chargée dans un champ magnétique

### Une force qui ne travaille pas

On change complètement de contexte : au lieu d'un projectile dans l'air, on envoie une particule chargée — de charge $q$ et de masse $m$ — avec une vitesse initiale $\vec{v}_0$ de norme $v_0$, dans une région où règne un **champ magnétique uniforme** $\vec{B}$. On se place dans le seul cas au programme : $\vec{B}$ **perpendiculaire** à $\vec{v}_0$. Le poids de la particule est négligé devant la force magnétique (hypothèse standard pour ce genre de particule, très légère et très rapide).

La méthode, elle, ne change pas : bilan des forces, deuxième loi de Newton, projection. Mais la force, cette fois, est d'un genre qu'on n'a encore jamais rencontré dans cette leçon — c'est la **force de Lorentz** :

$$\vec{F} = q\,\vec{v}\wedge\vec{B}$$

Le symbole $\wedge$ désigne un **produit vectoriel**, et c'est lui qui fait toute la différence. Pour ce cours, retiens deux propriétés qui suffisent à tout déduire :

- **la direction** : $\vec{v}\wedge\vec{B}$ est, par construction, **perpendiculaire à $\vec{v}$** — à chaque instant. La force de Lorentz est donc toujours perpendiculaire à la vitesse, jamais dans son prolongement. Compare-la au poids d'un projectile, qui gardait une direction fixe (vers le bas) : la force de Lorentz, elle, change de direction à chaque instant pour rester perpendiculaire à une vitesse qui, elle-même, tourne.
- **la valeur** : comme $\vec{B}\perp\vec{v}$, la norme du produit vectoriel se réduit à $v\,B$, donc la force a pour norme

$$F = |q|\,v\,B$$

### La règle du sens de la force

Pour trouver le sens de $\vec{v}\wedge\vec{B}$, sers-toi de ta main droite : pointe les doigts dans le sens de $\vec{v}$, puis referme-les vers $\vec{B}$ en balayant le plus petit angle entre les deux ; le pouce tendu donne alors le sens de $\vec{v}\wedge\vec{B}$. La force $\vec{F} = q\,\vec{v}\wedge\vec{B}$ pointe dans **ce** sens si la charge est positive ($q > 0$), et dans le sens **opposé** si la charge est négative ($q < 0$). C'est le seul endroit où le signe de la charge intervient : il décide de quel côté la trajectoire va se courber.

Avant de lire la suite, mets cette règle à l'épreuve — et devine ce qu'elle entraîne. Dans la scène qui suit, le champ est vraiment perpendiculaire au plan du mouvement : la vue « comme le manuel » le montre en ⊗ et ⊙, la vue de biais montre ce que ces symboles veulent dire. À chaque étape, tu paries d'abord, puis tu lances la particule.

[[embed:champ-magnetique]]

### Première conséquence : la norme de la vitesse ne change pas

Voici le point qui rend ce mouvement complètement différent de celui du projectile. Décompose l'accélération dans la base de Freinet, comme au chapitre 4 de la leçon « Lois de Newton », sur le tremplin circulaire — une composante tangentielle (le long de la vitesse) et une composante normale (perpendiculaire, tournée vers l'intérieur de la courbe, où $R$ désigne le rayon de courbure) :

$$\vec{a} = \frac{dv}{dt}\,\vec{u}_T + \frac{v^2}{R}\,\vec{u}_N$$

La deuxième loi de Newton, $\vec{F} = m\vec{a}$, se projette sur ces deux directions. Or la force de Lorentz est **purement normale** : perpendiculaire à $\vec{v}$, elle n'a **aucune** composante tangentielle. La projection sur la tangente $\vec{u}_T$ donne donc :

$$m\,\frac{dv}{dt} = 0$$

$$\frac{dv}{dt} = 0$$

Autrement dit, la **norme** de la vitesse ne varie pas : $v(t) = v_0$ à chaque instant. La force de Lorentz ne fait que **dévier** la particule, sans jamais l'accélérer ni la ralentir. (Une autre façon de le dire, si tu as déjà croisé la notion de travail : une force constamment perpendiculaire au déplacement ne travaille pas, donc ne change pas l'énergie cinétique, donc pas la norme de la vitesse.)

### Deuxième conséquence : un mouvement circulaire uniforme

Reprends la projection de la deuxième loi, cette fois sur la direction normale $\vec{u}_N$. La force vaut $F = |q|\,v_0\,B$ (avec $v = v_0$, qu'on vient d'établir), et la composante normale de l'accélération vaut $v_0^2/R$ :

$$m\,\frac{v_0^2}{R} = |q|\,v_0\,B$$

On isole $R$ :

$$R = \frac{m\,v_0}{|q|\,B}$$

Regarde ce résultat : $m$, $v_0$, $|q|$ et $B$ sont tous **constants**, donc $R$ l'est aussi. Le rayon de courbure ne change pas le long du trajet. Or une trajectoire de rayon de courbure constant, parcourue à une vitesse de norme constante, c'est très exactement un **mouvement circulaire uniforme** : la particule décrit un cercle de rayon

$$R = \frac{m\,v_0}{|q|\,B}$$

à la vitesse constante $v_0$. Mesure l'écart avec le projectile : là, la trajectoire était une **parabole** ouverte, et l'objet finissait par retomber ; ici, c'est un **cercle**, que la particule parcourrait indéfiniment tant qu'elle reste dans le champ. Même méthode, même deuxième loi — mais une force d'une tout autre nature, et donc un mouvement d'une tout autre nature.

Regarde enfin ce que dit la forme $R = \dfrac{m}{|q|}\cdot\dfrac{v_0}{B}$ : à champ $B$ et vitesse $v_0$ fixés, plus la particule est lourde (grand $m$), plus son cercle est large ; plus elle est chargée (grand $|q|$), ou plus le champ est fort (grand $B$), plus son cercle est serré.

### La déflexion magnétique

En pratique, le champ magnétique n'occupe souvent qu'une **région limitée** de l'espace — un couloir de largeur $\ell$ que la particule traverse. Tant qu'elle y est, elle suit son arc de cercle ; dès qu'elle en sort, plus aucune force ne l'infléchit (le poids est négligé) et elle repart en **ligne droite**, mais dans une direction qui a tourné. Cette déviation de la direction du mouvement, c'est la **déflexion magnétique**.

De combien la direction a-t-elle tourné ? Place l'entrée dans le champ à l'origine, $\vec{v}_0$ horizontale, et le centre $C$ du cercle à la distance $R$ perpendiculairement à $\vec{v}_0$. Quand la particule a avancé d'une distance horizontale $\ell$ (la largeur du champ), elle a parcouru un arc dont l'angle au centre $\theta$ vérifie une relation géométrique simple :

$$\sin\theta = \frac{\ell}{R}$$

et cet angle $\theta$ est aussi celui dont a tourné le vecteur vitesse. Tout est de nouveau contenu dans $R$ : plus $R$ est petit (champ fort, particule peu massive ou très chargée, vitesse faible), plus l'arc est serré et plus la déflexion $\theta$ est grande.

[[figure:deflexion-magnetique]]

### Exemple travaillé : rayon et déflexion d'un électron

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule le rayon du cercle décrit par un électron dans un champ magnétique, puis de combien il ressort dévié — les deux grandeurs que ce genre de dispositif sert à contrôler. On garde exactement la même méthode que pour le projectile (bilan, deuxième loi, projection), appliquée à la force de Lorentz.

Un électron, de charge de valeur $|q| = 1{,}6\times 10^{-19}\ \text{C}$ et de masse $m = 9{,}1\times 10^{-31}\ \text{kg}$, entre avec une vitesse $v_0 = 1{,}0\times 10^{7}\ \text{m/s}$ perpendiculaire à un champ magnétique uniforme $B = 1{,}0\times 10^{-3}\ \text{T}$. Le champ occupe un couloir de largeur $\ell = 2{,}0\times 10^{-2}\ \text{m}$.

**Norme de la force de Lorentz :**

$$F = |q|\,v_0\,B = 1{,}6\times 10^{-19}\times 1{,}0\times 10^{7}\times 1{,}0\times 10^{-3}$$

$$F \approx 1{,}6\times 10^{-15}\ \text{N}$$

**Rayon du cercle :**

$$R = \frac{m\,v_0}{|q|\,B} = \frac{9{,}1\times 10^{-31}\times 1{,}0\times 10^{7}}{1{,}6\times 10^{-19}\times 1{,}0\times 10^{-3}}$$

$$R = \frac{9{,}1\times 10^{-24}}{1{,}6\times 10^{-22}} \approx 5{,}7\times 10^{-2}\ \text{m} \approx 5{,}7\ \text{cm}$$

**Déflexion à la sortie du couloir :** comme $\ell = 2{,}0\ \text{cm}$ est inférieur à $R \approx 5{,}7\ \text{cm}$, la particule traverse bien le champ et en ressort. L'angle de déviation vérifie :

$$\sin\theta = \frac{\ell}{R} = \frac{2{,}0}{5{,}7} \approx 0{,}35$$

$$\theta \approx 21^\circ$$

Et la vitesse à la sortie ? Elle vaut toujours $v_0 = 1{,}0\times 10^{7}\ \text{m/s}$ — rigoureusement la même qu'à l'entrée. C'est toute la signature d'un champ magnétique : il a **dévié** l'électron de $21^\circ$ sans lui ajouter ni lui retirer la moindre vitesse. La même méthode que pour le projectile — bilan des forces, deuxième loi, projection dans un bon repère — mais appliquée à une force qui, elle, ne travaille jamais.

---

## R7 — La chute verticale réelle : quand le fluide freine

### Ce qui change par rapport au chapitre 2

Au chapitre 2, on avait négligé l'air ; ici, on ne le néglige plus. Un solide qui tombe dans un fluide réel — l'air, l'eau, l'huile — subit une seconde force, la **force de frottement fluide**, qui s'oppose au mouvement. Puisque l'objet descend, cette force est dirigée vers le haut.

Le programme retient deux modèles pour cette force, selon la vitesse :

- **frottement linéaire** : $\vec f = -k\,\vec v$ (basses vitesses) ;
- **frottement quadratique** : $\vec f$ de sens opposé à $\vec v$, de norme $f = k\,v^2$ (vitesses plus grandes).

Dans les deux cas, retiens l'essentiel : **la force de frottement croît avec la vitesse.** C'est tout le ressort de ce qui va suivre — un objet lent est presque freiné par rien ; un objet rapide l'est beaucoup.

### Établir l'équation différentielle

On garde la méthode du chapitre 2 — bilan, repère, projection — mais on choisit ici un axe $Oy$ **vertical, orienté vers le bas** (le sens de la chute), pour simplifier l'écriture. Ce n'est pas le même choix qu'aux chapitres 2 à 6 : c'est volontaire, et ça ne change rien au fond — comme au chapitre 2, le signe qu'on trouve dépend toujours de l'axe choisi, jamais d'une règle à mémoriser.

Dans le cas du frottement linéaire, deux forces : le poids $mg$ (positif, dans le sens de $Oy$) et le frottement $-kv$ (négatif, il s'oppose au mouvement). La deuxième loi de Newton, projetée :

$$m\,\frac{dv}{dt} = mg - k\,v$$

$$\frac{dv}{dt} = g - \frac{k}{m}\,v$$

C'est une **équation différentielle** : elle relie $v$ à sa dérivée $dv/dt$, sans donner directement $v(t)$. On peut la récrire sous une forme plus parlante, en **identifiant** deux grandeurs — sans rien résoudre :

$$\tau\,\frac{dv}{dt} = v_\ell - v \qquad \text{avec} \qquad \tau = \frac{m}{k} \quad \text{et} \quad v_\ell = \frac{mg}{k}$$

(Vérifie-le toi-même : $\tau\,\dfrac{dv}{dt} = v_\ell - v \iff \dfrac{dv}{dt} = \dfrac{v_\ell}{\tau} - \dfrac{v}{\tau} = g - \dfrac{k}{m}v$, exactement la même équation.) $\tau$ et $v_\ell$ sont les deux grandeurs qu'on va exploiter — sans jamais résoudre complètement l'équation.

### Régime initial : ça commence comme une chute libre

À $t=0$, l'objet est lâché sans vitesse : $v=0$. Le frottement $kv$ est alors **nul** — il n'y a pas encore de vitesse à freiner :

$$\frac{dv}{dt}\bigg|_{t=0} = g - \frac{k}{m}\times 0 = g$$

Au tout début, l'objet accélère donc **exactement comme en chute libre** (chapitre 2) : le frottement ne « mord » que lorsque la vitesse s'est installée.

### Prends position avant de voir la courbe

Si l'accélération vaut $g$ au départ, et que le frottement grandit avec $v$, est-ce que l'objet continue d'accélérer indéfiniment, de plus en plus vite, tout au long de la chute ? Ou est-ce que quelque chose finit par se stabiliser ? Décide avant de lire la suite.

### Régime permanent : la vitesse limite

Ce qui se stabilise, c'est l'accélération elle-même. À mesure que $v$ croît, le frottement $kv$ croît aussi, et se rapproche du poids $mg$. Quand les deux s'égalisent, l'accélération s'annule :

$$\frac{dv}{dt} = 0 \quad\Longrightarrow\quad g - \frac{k}{m}v_\ell = 0 \quad\Longrightarrow\quad v_\ell = \frac{mg}{k}$$

Note la méthode : $v_\ell$ s'obtient en **annulant l'accélération dans l'équation différentielle** — un calcul d'une ligne — jamais en résolvant l'équation en entier. (Pour le modèle quadratique, le même raisonnement donne $mg = kv_\ell^2$, donc $v_\ell = \sqrt{mg/k}$ : une racine carrée apparaît parce que le frottement dépend de $v^2$. Les deux formules ne se retiennent pas par cœur — elles se **retrouvent**, en repartant de « frottement = poids » à chaque fois.)

Entre le régime initial et ce **régime permanent**, $\tau$ mesure le temps caractéristique de la transition : sur une courbe $v=f(t)$ tracée expérimentalement, il se lit à la tangente à l'origine (pente $g$), qui coupe l'asymptote $v=v_\ell$ à $t=\tau$ — ou, de façon équivalente, à l'instant où $v$ atteint environ $63\,\%$ de $v_\ell$.

[[figure:vitesse-vs-temps-frottement]]

### Arrête-toi — la force de frottement a-t-elle disparu ?

À la vitesse limite, l'accélération est nulle. On pourrait en conclure, un peu vite, que « le frottement a disparu », puisque plus rien ne change. Teste cette idée : si le frottement était vraiment nul à $v_\ell$, il ne resterait que le poids $mg$, et l'accélération vaudrait $g$, pas $0$. Contradiction directe avec ce qu'on vient d'établir.

Ce qui est nul à $v_\ell$, ce n'est pas le frottement : c'est la **somme** des deux forces, parce qu'elles se sont égalées. Le frottement, à cet instant, est au contraire **à son maximum** de tout le mouvement, exactement égal au poids : $k\,v_\ell = mg$. « Somme nulle » ne veut jamais dire « pas de force » — ça veut dire que les forces présentes se compensent.

[[figure:bilan-forces-chute-frottement]]

### La masse revient

Regarde de nouveau $v_\ell = mg/k$ : elle contient $m$. Contraste frontal avec les chapitres 2 à 3, où la masse avait **disparu** ($\vec a_G = \vec g$, indépendant de $m$) — au point qu'on avait pu dire que tous les objets tombent pareil, quelle que soit leur masse. Cette règle ne vaut que **sans frottement**. Dès qu'un frottement fluide entre en jeu, deux objets de même forme (même $k$) mais de masses différentes n'ont **pas** la même vitesse limite : le plus lourd va plus vite — il lui faut une vitesse plus grande pour que $kv$ compense son poids plus important.

[[figure:sandbox-chute-frottement]]

### Exemple travaillé : la vitesse limite d'une bille dans un liquide visqueux

*Ce qu'on cherche ici, et pourquoi ce geste :* établir l'équation différentielle, puis en extraire $v_\ell$ et lire $\tau$ sur une courbe — sans jamais chercher $v(t)$ complètement, exactement la démarche qu'impose le programme sur ce point.

Une bille de masse $m = 0{,}20\ \text{kg}$ est lâchée sans vitesse initiale dans un liquide visqueux, avec un frottement linéaire de coefficient $k = 2{,}0\ \text{kg/s}$. On prend $g \approx 9{,}8\ \text{m/s}^2$.

**Bilan et équation différentielle :**

$$\frac{dv}{dt} = g - \frac{k}{m}v = 9{,}8 - 10{,}0\,v \qquad (v \text{ en } \text{m/s},\ t \text{ en } \text{s})$$

**Régime initial :** à $t=0$, $v=0$, donc $a = 9{,}8\ \text{m/s}^2$ — la bille démarre comme en chute libre.

**Vitesse limite** (accélération nulle) :

$$v_\ell = \frac{mg}{k} = \frac{0{,}20\times 9{,}8}{2{,}0} = 0{,}98\ \text{m/s}$$

**Temps caractéristique :** sur la courbe $v=f(t)$ fournie pour cette bille, la tangente à l'origine (pente $9{,}8\ \text{m/s}^2$) coupe l'asymptote $v_\ell = 0{,}98\ \text{m/s}$ à $t = \tau = 0{,}10\ \text{s}$ — cohérent avec $\tau = m/k = 0{,}20/2{,}0 = 0{,}10\ \text{s}$.

On s'arrête là : la loi complète $v(t)$ n'est **pas** demandée, et on ne la dérive pas analytiquement (voir plus bas). Ce qu'on garde, c'est l'équation différentielle elle-même, exploitée pour $v_\ell$ et $\tau$ — exactement ce qu'un TP de chute avec frottement demande de faire à partir de données réelles.

### Une troisième force, quand le fluide est dense : la poussée d'Archimède

Le bilan ci-dessus n'a que deux forces, le poids et le frottement. C'est légitime dans l'**air**, où la poussée d'Archimède est négligeable devant le poids. Ce ne l'est plus dès que le fluide est un **liquide** — et un sujet de bac qui fait tomber une bille dans de l'huile ou dans de l'eau ajoute presque toujours une troisième force. *Presque* : l'exercice de synthèse de cette leçon même en est l'exception — la bille y tombe bien dans un liquide visqueux, mais l'énoncé écrit noir sur blanc « on néglige la poussée d'Archimède devant les autres forces », et ne donne ni masse volumique ni volume. C'est la règle à retenir : **c'est l'énoncé qui tranche.** S'il te donne $\rho$ ou $V$, la poussée est attendue dans ton bilan ; s'il te dit de la négliger, tu la négliges.

**Ce qu'elle vaut.** Tout corps plongé dans un fluide subit, de la part de ce fluide, une force verticale dirigée **vers le haut**, de norme égale au poids du fluide déplacé :

$$F_A = \rho_{\text{fluide}}\;V\;g$$

où $V$ est le volume **immergé** du solide et $\rho_{\text{fluide}}$ la masse volumique du fluide. C'est un résultat d'hydrostatique, antérieur à ce chapitre ; on l'emploie ici comme un acquis.

**Ce que ça change au bilan — et ce que ça ne change pas.** Rien à la méthode : bilan, repère, projection, exactement comme plus haut. Avec l'axe $Oy$ vertical orienté **vers le bas**, la poussée est dirigée à l'opposé, donc comptée **négativement**, comme le frottement :

$$m\,\frac{dv}{dt} = mg - F_A - k\,v$$

**Ce que la vitesse limite devient.** En régime permanent, $\dfrac{dv}{dt} = 0$, donc

$$v_\ell = \frac{mg - F_A}{k}$$

La poussée d'Archimède **abaisse** la vitesse limite — le solide tombe moins vite dans un liquide dense que dans l'air, et pas seulement à cause du frottement.

*Le contrôle de cohérence, gratuit :* si $F_A > mg$, la formule donnerait une vitesse limite négative. Ce n'est pas absurde, c'est physique — cela veut dire que le solide **remonte** au lieu de descendre, ce qui est exactement le cas d'un bouchon lâché au fond d'un seau. Le signe du numérateur te dit dans quel sens le mouvement s'établit.

*Le piège nommé :* garder $v_\ell = \dfrac{mg}{k}$ par réflexe alors que l'énoncé a donné une masse volumique de fluide et un volume. Deux données qui n'apparaissent nulle part dans ta résolution sont un signal : l'énoncé ne fournit jamais de valeur pour rien.

### La limite du cadre

On établit l'équation différentielle, on l'exploite pour trouver $v_\ell$ et $\tau$, on lit la courbe $v=f(t)$ — mais on ne la **résout** jamais analytiquement. Pas de séparation des variables, pas de formule $v(t) = v_\ell\left(1-e^{-t/\tau}\right)$ dérivée à la main : cette frontière est exactement celle que tu retrouveras pour un circuit RLC amorti — établir l'équation différentielle est un objectif du programme, la résoudre à la main n'en est pas un. La suite, pour aller plus loin sans intégrer analytiquement : la résolution **pas à pas**, chapitre suivant.

---

## R8 — Résoudre pas à pas : la méthode d'Euler

### Le problème : on connaît la pente, pas la courbe

L'équation différentielle du chapitre 8, $\dfrac{dv}{dt} = g - \dfrac{k}{m}v$, donne à chaque instant la **pente** de la courbe $v(t)$ — pas $v(t)$ elle-même, et on ne va pas la résoudre analytiquement (chapitre 8). L'idée d'Euler : avancer par **petits pas** de durée $\Delta t$, en supposant que, sur un pas assez court, la pente reste à peu près constante — égale à sa valeur au début du pas.

### La formule centrale

$$v_{i+1} = v_i + \left(\frac{dv}{dt}\right)_{\!i}\!\Delta t = v_i + a_i\,\Delta t \qquad \text{avec} \qquad a_i = g - \frac{k}{m}\,v_i$$

Image mentale : tu connais où tu es ($v_i$) et dans quelle direction tu vas ($a_i$, donné par l'équation différentielle à l'endroit où tu te trouves) ; tu marches dans cette direction pendant $\Delta t$ ; arrivé au nouveau point, tu **recalcules** la direction — elle a changé, la pente n'étant constante que le temps d'un pas.

Pour suivre aussi la position, même principe, avec la vitesse en guise de pente pour $y$ :

$$y_{i+1} = y_i + v_i\,\Delta t$$

Un réflexe utile pour vérifier l'une ou l'autre formule : regarde les **unités**. $v_i \Delta t$ multiplie une vitesse par un temps — une longueur, homogène à $y_i$. $a_i \Delta t$ multiplie une accélération par un temps — une vitesse, homogène à $v_i$. Une expression qui additionnerait directement une vitesse et une accélération serait immédiatement suspecte : il manque forcément un $\Delta t$.

### Arrête-toi avant de lire la suite

La valeur $v_{i+1}$ que donne cette formule, est-ce la valeur **exacte** de $v$ à l'instant $t_{i+1}$ ? Ou seulement une valeur approchée ?

C'est une valeur **approchée**. Pendant tout le pas $\Delta t$, on a supposé la pente constante, égale à $a_i$ — alors qu'en réalité elle change en continu, puisqu'elle dépend de $v$, qui change lui-même. Cette approximation introduit une petite erreur à chaque pas, qui peut s'accumuler d'un pas à l'autre. Plus $\Delta t$ est **petit**, plus l'hypothèse « pente constante sur le pas » est raisonnable, et plus la suite $v_0, v_1, v_2, \dots$ se rapproche de la vraie courbe — sans jamais, avec un $\Delta t$ fini, l'atteindre exactement.

[[figure:euler-taille-de-pas]]

### Exemple travaillé : le tableau d'Euler de la bille du chapitre 8

*Ce qu'on cherche ici, et pourquoi ce geste :* appliquer la récurrence d'Euler, pas après pas, à la bille du chapitre 8, et vérifier que la suite de valeurs obtenue se dirige bien vers la vitesse limite calculée là-bas — une cohérence croisée entre les deux méthodes, pas un hasard.

Même bille qu'au chapitre 8 : $m = 0{,}20\ \text{kg}$, $k = 2{,}0\ \text{kg/s}$, $g \approx 9{,}8\ \text{m/s}^2$, $v_0 = 0$. On choisit un pas $\Delta t = 0{,}020\ \text{s}$, et on applique $a_i = 9{,}8 - 10{,}0\,v_i$ puis $v_{i+1}=v_i+a_i\Delta t$ à chaque ligne :

| $t_i\ (\text{s})$ | $v_i\ (\text{m/s})$ | $a_i = 9{,}8 - 10{,}0\,v_i\ (\text{m/s}^2)$ | $v_{i+1}=v_i+a_i\Delta t\ (\text{m/s})$ |
|---|---|---|---|
| $0{,}000$ | $0{,}000$ | $9{,}80$ | $0{,}196$ |
| $0{,}020$ | $0{,}196$ | $7{,}84$ | $0{,}353$ |
| $0{,}040$ | $0{,}353$ | $6{,}27$ | $0{,}478$ |
| $0{,}060$ | $0{,}478$ | $5{,}02$ | $0{,}579$ |

[[figure:tableau-euler-pas-a-pas]]

Deux choses à remarquer, et qui ne sont pas des coïncidences. D'abord, $a_i$ **décroît** à chaque ligne ($9{,}80 \to 7{,}84 \to 6{,}27 \to 5{,}02\ \text{m/s}^2$) : le frottement mord de plus en plus, exactement le mécanisme du chapitre 8. Recalculer $a_i$ à chaque pas — plutôt que garder $a=g$ fixe comme en chute libre — est ce qui capture cet effet ; garder $a=g$ tout du long reviendrait à ignorer le frottement, et donnerait une droite au lieu d'une courbe qui s'aplatit. Ensuite, la suite $v_i$ ($0 \to 0{,}196 \to 0{,}353 \to 0{,}478 \to 0{,}579\ \text{m/s}$) se dirige vers $v_\ell = 0{,}98\ \text{m/s}$ établi au chapitre 8 : à $t=0{,}060\ \text{s}$, on n'y est pas encore — normal, $\tau = 0{,}10\ \text{s}$ n'est pas atteint — mais la tendance est la bonne, et c'est cette cohérence entre l'équation différentielle (chapitre 8) et le calcul pas à pas (ici) qui valide la méthode.

### La limite du cadre

La méthode d'Euler est **la seule méthode numérique au programme** : pas de variante plus précise (point milieu, Runge-Kutta, Euler implicite) à connaître. On applique la récurrence explicite $v_{i+1}=v_i+a_i\Delta t$, point ; aucune analyse formelle de l'erreur ou de l'ordre de convergence n'est exigée — seulement l'idée qualitative que réduire $\Delta t$ rapproche du résultat exact.

---

## R9 — Gravitation et mouvement circulaire : la force centripète

### La loi de gravitation universelle

Deux corps quelconques, de masses $m_A$ et $m_B$, séparés d'une distance $r$, s'attirent mutuellement. La force que $B$ exerce sur $A$ s'écrit :

$$\vec F_{B\to A} = -G\,\frac{m_A\,m_B}{r^2}\,\vec u_{A\to B}$$

où $G$ est la **constante de gravitation universelle** (la même pour tous les corps de l'Univers) et $\vec u_{A\to B}$ le vecteur unitaire dirigé de $A$ vers $B$. Le signe « $-$ » dit que la force est **attractive** : elle pointe en sens contraire de $\vec u_{A\to B}$, donc de $A$ vers $B$ — chaque corps est tiré vers l'autre, jamais repoussé. Retiens la structure, comme pour la force de Lorentz au chapitre 7 : une direction (ici, toujours selon la droite qui joint les deux corps) et une norme, $F = G\,m_Am_B/r^2$, qui décroît quand $r$ augmente.

### Le cas du satellite : une force toujours dirigée vers le centre

Considère un satellite de masse $m$, en orbite **circulaire** de rayon $r$ autour de la Terre (masse $M$). À chaque position du satellite, la force gravitationnelle qu'il subit pointe vers le **centre** de la Terre. Cette direction change à chaque instant — parce que le satellite se déplace — mais elle reste **toujours perpendiculaire** à la vitesse, elle-même tangente au cercle. Une force ainsi dirigée en permanence vers le centre de la trajectoire s'appelle une force **centripète**.

### Même raisonnement qu'au chapitre 7, une autre force

Une force perpendiculaire à la vitesse à chaque instant : exactement la situation de la force de Lorentz au chapitre 7. Le même raisonnement s'applique mot pour mot. Décompose l'accélération dans la base de Freinet, comme au chapitre 7 :

$$\vec a = \frac{dv}{dt}\vec u_T + \frac{v^2}{r}\vec u_N$$

La force gravitationnelle étant purement normale, la projection de $\vec F = m\vec a$ sur $\vec u_T$ donne :

$$m\,\frac{dv}{dt} = 0 \quad\Longrightarrow\quad \frac{dv}{dt}=0$$

La **norme** de la vitesse ne change donc pas : le satellite se déplace à vitesse constante sur son cercle — un **mouvement circulaire uniforme**. Comme la force de Lorentz au chapitre 7, la force gravitationnelle ne **travaille** pas : elle dévie en permanence, sans jamais accélérer ni ralentir.

C'est aussi la réponse à une objection naturelle : si aucune force ne pousse le satellite vers l'avant, comment garde-t-il sa vitesse ? Il n'a besoin d'aucune force tangentielle pour ça — un objet soumis à une force purement perpendiculaire à son mouvement garde la norme de sa vitesse par inertie (première loi de Newton). Le rôle de la force centripète n'est jamais de maintenir la vitesse, seulement de courber la trajectoire.

### La vitesse orbitale

Projette la deuxième loi sur la direction normale $\vec u_N$. La force gravitationnelle a pour norme $F = GMm/r^2$, et la composante normale de l'accélération vaut $v^2/r$ :

$$m\,\frac{v^2}{r} = G\,\frac{Mm}{r^2}$$

$$v^2 = \frac{GM}{r}$$

$$v = \sqrt{\frac{GM}{r}}$$

Regarde ce qui vient de se passer : la masse $m$ du satellite, présente des deux côtés de la première ligne, s'est **simplifiée**. La vitesse orbitale ne dépend **pas** de la masse du satellite : un satellite lourd et un satellite léger, sur la même orbite, ont exactement la même vitesse. Nouvel écho de ce que tu as vu aux chapitres 3 et 4 : la masse disparaissait déjà de la trajectoire d'un projectile en chute libre, pour la même raison de fond — la deuxième loi divise par $m$ des deux côtés dès que la force elle-même est proportionnelle à $m$.

Remarque enfin le sens de la dépendance en $r$ : plus l'orbite est **haute** (grand $r$), plus la vitesse orbitale est **faible**.

[[figure:orbite-force-centripete]]

### Arrête-toi — d'où vient l'apesanteur ?

Un astronaute « flotte » dans une station spatiale en orbite. Réflexe naturel : « en orbite, il n'y a plus de gravité, c'est pour ça qu'il flotte ». Teste cette idée avec ce qu'on vient d'établir : si la gravité disparaissait vraiment, il n'y aurait **plus aucune force** sur la station — et un objet sans force part en ligne droite (inertie, première loi). Or la station ne part pas en ligne droite : elle reste sur une orbite fermée, un cercle. Il faut donc bien **une** force pour courber sa trajectoire — et cette force, c'est très précisément la gravité, à peine plus faible qu'au sol (une orbite basse ne réduit $g$ que de quelques pourcents).

Ce qui se passe réellement : la station et tout ce qu'elle contient — y compris l'astronaute — sont en **chute libre permanente**. La gravité les attire tous vers le centre de la Terre, à la même accélération, en même temps ; c'est exactement pour ça que l'astronaute ne ressent aucun contact différentiel avec les parois — il « tombe » à la même vitesse que la station qui l'entoure. L'apesanteur n'est pas une absence de gravité : c'est une chute libre qui, parce que la trajectoire est une orbite fermée, ne s'arrête jamais de tomber sans jamais atteindre le sol.

[[figure:satellite-chute-permanente]]

### Exemple travaillé : la vitesse d'un satellite en orbite basse

*Ce qu'on cherche ici, et pourquoi ce geste :* appliquer, dans l'ordre, le même bilan que pour tout ce chapitre — force, deuxième loi, projection — à un satellite réel, et retrouver un ordre de grandeur comparable à une valeur connue (la vitesse de la Station spatiale internationale, environ $7{,}7\ \text{km/s}$).

Un satellite décrit une orbite circulaire de rayon $r = 6{,}80\times 10^6\ \text{m}$ (environ $400\ \text{km}$ d'altitude) autour de la Terre, de masse $M_T = 5{,}97\times 10^{24}\ \text{kg}$. On donne $G = 6{,}67\times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2$.

**Bilan :** la seule force sur le satellite est la force gravitationnelle exercée par la Terre — c'est elle qui joue, à cette altitude, le rôle du poids du satellite.

**Force centripète $\Rightarrow$ mouvement circulaire uniforme :** même raisonnement qu'au chapitre 7 (voir plus haut).

**Vitesse orbitale** (deuxième loi projetée sur la normale) :

$$v = \sqrt{\frac{GM_T}{r}} = \sqrt{\frac{6{,}67\times 10^{-11}\times 5{,}97\times 10^{24}}{6{,}80\times 10^6}}$$

$$v \approx \sqrt{5{,}85\times 10^7} \approx 7{,}65\times 10^3\ \text{m/s} \approx 7{,}65\ \text{km/s}$$

Cette valeur, obtenue sans connaître la masse du satellite (elle a disparu de la formule, comme aux chapitres 3 et 4), est cohérente avec la vitesse orbitale réelle de la Station spatiale internationale, en orbite à peu près à cette altitude. Compare enfin cette force avec celle du chapitre 7 : les deux sont centripètes, les deux ne travaillent pas, les deux courbent une trajectoire sans jamais changer la norme de la vitesse — mais l'une est électromagnétique (Lorentz), l'autre gravitationnelle. Même méthode, deux natures de force différentes.

### La limite du cadre

Tout ce chapitre traite le cas de l'orbite **circulaire** — la seule que le programme demande de savoir traiter par le calcul. Pas de vitesse de libération, pas de bilan énergétique orbital, pas de problème à deux corps général : ces notions restent hors cadre ici.

---

## R10 — La 3e loi de Kepler (cas circulaire) et le satellite géostationnaire

### Les trois lois de Kepler

Trois lois, formulées à l'origine dans le référentiel **héliocentrique** (centré sur le Soleil, pour les planètes) mais qui s'appliquent de la même façon dans le référentiel **géocentrique** (centré sur la Terre, pour ses satellites) :

1. **Loi des orbites.** Chaque planète décrit une **ellipse** dont le Soleil occupe l'un des deux foyers (et de même pour un satellite autour de la Terre).
2. **Loi des aires.** Le segment qui relie l'astre attracteur à la planète (ou au satellite) balaie des aires égales pendant des durées égales.
3. **Loi des périodes.** Le rapport $T^2/a^3$ (avec $a$ le demi-grand axe de l'ellipse) est le même pour tous les astres qui tournent autour d'un même astre central.

Précision importante avant d'aller plus loin : le programme ne demande de **calculer** avec ces lois que dans le cas particulier où l'orbite est un **cercle** — le rayon $r$ jouant alors le rôle du demi-grand axe $a$. On énonce les trois lois en toute généralité (dont l'ellipse de la première loi), mais tout calcul de vitesse, de période ou de rayon qui suit se fait en orbite circulaire.

### Établir la 3e loi, cas circulaire

Deux expressions de la vitesse orbitale $v$, pour un satellite en orbite circulaire de rayon $r$ et de période $T$ : celle établie au chapitre 10 à partir de la deuxième loi, et celle, purement géométrique, du périmètre du cercle parcouru en une période :

$$v = \sqrt{\frac{GM}{r}} \qquad \text{(chapitre 10)} \qquad \qquad v = \frac{2\pi r}{T} \qquad \text{(MCU\,: périmètre / période)}$$

Ces deux expressions désignent la même vitesse : on peut les égaler.

$$\frac{2\pi r}{T} = \sqrt{\frac{GM}{r}}$$

On élève au carré les deux membres :

$$\frac{4\pi^2 r^2}{T^2} = \frac{GM}{r}$$

On réarrange (multiplier par $r$, diviser par $GM$) :

$$\frac{T^2}{r^3} = \frac{4\pi^2}{GM}$$

C'est la **3e loi de Kepler**, cas circulaire. Regarde où sont les puissances, plutôt que de les mémoriser à l'aveugle : le carré de la période $T$ sur le cube du rayon $r$ — et si tu doutes un jour de l'ordre (est-ce $T/r$ ? $T^3/r^2$ ?), reviens à ces trois lignes plutôt que de deviner. Le membre de droite, $4\pi^2/GM$, ne dépend que de la masse $M$ de l'astre central, jamais du satellite considéré : c'est exactement pour ça que $T^2/r^3$ est **la même constante** pour tous les satellites d'un même astre. Un satellite plus proche a une période plus courte, un satellite plus lointain une période plus longue, mais le rapport $T^2/r^3$, lui, ne change pas.

[[figure:kepler3-linearisation]]

### Le satellite géostationnaire : trois conditions à la fois

Un satellite est **géostationnaire** lorsqu'il paraît immobile pour un observateur situé au sol. Ça exige **trois conditions simultanées**, pas une seule :

1. sa période de révolution est égale à la période de rotation de la Terre sur elle-même, $T = T_{\text{Terre}} \approx 24\ \text{h}$ ;
2. son orbite est dans le **plan équatorial** ;
3. il tourne dans le **même sens** que la rotation de la Terre.

Trois conditions — vraiment trois ? Une période de 24 h ne suffirait-elle pas ? Avant de lire la suite, mets-les à l'épreuve une par une : dans la scène qui suit, tu paries d'abord, puis tu regardes.

[[embed:orbites-gravite]]

### Arrête-toi — n'importe quelle altitude convient-elle ?

Si la seule condition qui comptait était « une période de $24\ \text{h}$ », est-ce que n'importe quelle altitude pourrait convenir ? Teste avec la 3e loi : à un astre donné ($M_T$ fixé), $T^2/r^3 = 4\pi^2/GM_T$ relie $T$ et $r$ de façon **biunivoque** — se donner $T=24\ \text{h}$ détermine une seule valeur de $r$, pas une plage de valeurs possibles. Choisir une autre altitude changerait $T$, et le satellite ne resterait plus synchronisé avec la rotation du sol : il dériverait, lentement, d'ouest en est ou d'est en ouest selon le cas. Il n'existe donc qu'**une seule altitude** géostationnaire possible autour d'un astre donné :

$$r = \left(\frac{GM_T\,T^2}{4\pi^2}\right)^{1/3}$$

[[figure:orbites-gravite]]

### Immobile par rapport à quoi ?

Une dernière précision, qui trompe souvent : dire qu'un satellite géostationnaire est « immobile » ne veut pas dire qu'il ne bouge pas du tout. Dans le référentiel **géocentrique**, il parcourt bel et bien un cercle, à sa vitesse orbitale $v=\sqrt{GM_T/r}$ — de l'ordre de $3\ \text{km/s}$ à cette altitude, une vitesse loin d'être nulle. Il n'est immobile que **par rapport au sol**, parce qu'il tourne autour de la Terre exactement à la même vitesse angulaire que la Terre tourne sur elle-même : vu depuis un point fixe de l'équateur, il reste donc toujours à la verticale du même point.

[[figure:orbite-geostationnaire]]

### Exemple travaillé : le rayon de l'orbite géostationnaire

*Ce qu'on cherche ici, et pourquoi ce geste :* appliquer la 3e loi établie plus haut à la Terre du chapitre 10 (mêmes $G$, $M_T$), pour retrouver le rayon — et donc l'altitude — de l'unique orbite géostationnaire terrestre.

On reprend la Terre du chapitre précédent : $G = 6{,}67\times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2$, $M_T = 5{,}97\times 10^{24}\ \text{kg}$, rayon terrestre $R_T \approx 6{,}37\times 10^6\ \text{m}$. On prend $T = 24\ \text{h} = 8{,}64\times 10^4\ \text{s}$.

**Rayon de l'orbite** (3e loi, isolée en $r$) :

$$r = \left(\frac{GM_T\,T^2}{4\pi^2}\right)^{1/3} \approx \left(\frac{6{,}67\times 10^{-11}\times 5{,}97\times 10^{24}\times (8{,}64\times 10^4)^2}{4\pi^2}\right)^{1/3}$$

$$r \approx 4{,}2\times 10^7\ \text{m}$$

**Altitude au-dessus du sol :**

$$h = r - R_T \approx 4{,}2\times 10^7 - 6{,}4\times 10^6 \approx 3{,}6\times 10^7\ \text{m}$$

Soit environ $36\,000\ \text{km}$ — l'altitude à laquelle se trouvent, par exemple, la plupart des satellites de télécommunication. Un tel satellite bouge continuellement dans le référentiel géocentrique, à environ $3\ \text{km/s}$, mais reste en permanence au-dessus du même point de l'équateur, parce que sa vitesse angulaire est exactement celle de la Terre.

### La limite du cadre

Les orbites **elliptiques quantitatives restent hors cadre** : les trois lois de Kepler s'énoncent en toute généralité (dont la première, avec son ellipse), mais tout calcul — vitesse, période, rayon — se fait en orbite **circulaire**. Pas de demi-grand axe chiffré sur une ellipse, pas d'excentricité, pas d'équation de vis-viva, pas de bilan énergétique orbital elliptique dans ce chapitre.

---

## R11 — Pour t'entraîner

### Récapitulatif express

- En chute libre (frottements négligés), $\vec{a}_G = \vec{g}$, **indépendant de la masse** — vrai en une dimension (chapitre 2) comme dans le mouvement plan d'un projectile (chapitres 3 et 4).
- Pour un projectile lancé avec un angle $\alpha$ et une vitesse $v_0$, le mouvement se décompose en deux axes **indépendants** : $a_x = 0$ (donc $v_x(t) = v_{0x} = v_0\cos\alpha$, **constante pendant tout le vol**) et $a_y = -g$ (donc $v_y(t) = v_{0y} - gt$, qui change continûment).
- En éliminant le temps entre $x(t)$ et $y(t)$, on obtient l'équation de la trajectoire, une **parabole** : $y(x) = \tan\alpha \cdot x - \dfrac{g}{2v_0^2\cos^2\alpha}x^2$.
- La **flèche** $f = \dfrac{v_0^2\sin^2\alpha}{2g}$ est une hauteur (au sommet, où $v_y=0$) ; la **portée** $D = \dfrac{v_0^2\sin(2\alpha)}{g}$ est une distance horizontale (au sol, à l'arrivée). Ce ne sont jamais le même nombre.
- À $v_0$ fixé, la portée est maximale pour $\alpha = 45^\circ$ ; deux angles complémentaires donnent la même portée. À $\alpha$ fixé, $f$ et $D$ varient comme $v_0^2$.
- Une particule chargée qui entre dans un champ magnétique uniforme (avec $\vec{B}\perp\vec{v}_0$) subit la force de Lorentz $\vec{F} = q\,\vec{v}\wedge\vec{B}$, toujours perpendiculaire à la vitesse : elle ne travaille pas, la **norme de la vitesse reste constante** ($v = v_0$), et le mouvement est **circulaire uniforme** de rayon $R = \dfrac{m\,v_0}{|q|\,B}$. La déflexion à la traversée d'un couloir de champ de largeur $\ell$ vérifie $\sin\theta = \dfrac{\ell}{R}$.

### Vérifie tes réflexes avant de te lancer

Avant l'exercice de type bac, teste cinq réflexes-clés du chapitre — un par grande idée traversée. Engage-toi sur chacun *avant* de dérouler la correction : c'est en prenant position qu'on repère ce qu'on croyait acquis.

[[checkpoint:cp-r0-predict]]

[[checkpoint:cp-symetrie]]

[[checkpoint:cp-frottement-vlim]]

[[checkpoint:cp-euler]]

[[checkpoint:cp-gravitation-kepler]]

### Exercice de type bac

À toi de traiter un vrai sujet d'examen national — la chute verticale d'une bille dans un liquide visqueux (session normale 2020). Il mobilise les deux chapitres neufs au cœur de ce cours : l'équation différentielle de la chute **avec** frottement et sa vitesse limite (chapitre 8), puis la résolution numérique pas à pas par la **méthode d'Euler** (chapitre 9). Cherche chaque question par toi-même avant de déplier le raisonnement.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, autre habillage : une autre chute avec frottement, d'autres nombres, et une question sur le retour de la masse. Le but est que tu reconnaisses la procédure plutôt que de recopier une solution.

[[exercise:r-variation]]
