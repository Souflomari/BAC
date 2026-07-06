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

Cette fois, on choisit un repère avec l'axe $Oy$ **vertical, orienté vers le haut** — c'est le choix qu'on va garder pour tout le reste de cette leçon, parce qu'il va falloir, dans quelques rungs, ajouter un axe horizontal à côté de lui, et il est plus simple de fixer une bonne fois les conventions de signe. Avec cette orientation, $\vec{g}$ pointe vers le bas, donc **à l'opposé** du sens choisi pour $Oy$ : sa composante selon $Oy$ est donc **négative**, $g_y = -g$, avec $g \approx 9{,}8\ \text{m/s}^2$.

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

Remarque ce qui vient de se produire : $t_{sol} = 2{,}0\ \text{s}$ est exactement **le double** de $t_{sommet} = 1{,}0\ \text{s}$. La montée et la descente prennent rigoureusement le même temps. Ce n'est pas une coïncidence de cet exemple précis — c'est une conséquence directe de la forme parabolique de $y(t)$, et on va retrouver exactement cette même symétrie, avec les mêmes noms, dans le mouvement à deux dimensions du rung suivant.

---

## R2 — Le mécanisme : la 2e loi de Newton décompose le mouvement en deux axes indépendants

### Le système et le bilan des forces

On lance maintenant un projectile — une balle, un ballon, une pierre — non plus à la verticale, mais avec une vitesse initiale $\vec{v}_0$ **inclinée** d'un angle $\alpha$ au-dessus de l'horizontale. On travaille dans le référentiel terrestre, supposé galiléen, et on néglige les frottements de l'air : la seule force qui s'exerce sur le projectile est son poids $\vec{P} = m\vec{g}$.

La deuxième loi de Newton s'écrit exactement comme au rung précédent :

$$\vec{P} = m\,\vec{a}_G \implies \vec{a}_G = \vec{g}$$

Rien de nouveau jusqu'ici : la masse du projectile disparaît complètement de l'équation, exactement comme en chute verticale. **Retiens ce point, on y reviendra plus loin : la trajectoire d'un projectile en chute libre ne dépend ni de sa masse ni de son poids** — deux balles de masses différentes, lancées avec le même $\vec{v}_0$, suivraient très exactement la même trajectoire.

### Choisir le repère et projeter

On choisit un repère à deux axes : $Ox$ horizontal, dans le sens du lancer ; $Oy$ vertical, vers le haut — le même $Oy$ qu'au rung précédent. L'origine est prise au point de lancement, à l'instant $t=0$.

Le vecteur $\vec{g}$ est purement vertical : il n'a **aucune** composante horizontale. En projetant $\vec{a}_G = \vec{g}$ sur les deux axes, on obtient donc deux équations scalaires **indépendantes** :

$$a_x = 0 \qquad \text{et} \qquad a_y = -g$$

Arrête-toi sur ce que dit la première équation, parce que c'est le cœur de cette leçon : **l'accélération horizontale est nulle, à tout instant du vol, du lancer jusqu'à l'impact.** Ce n'est pas une approximation qui vaudrait « au début » puis s'éroderait — c'est une égalité qui tient à chaque instant, tant qu'aucune force horizontale n'apparaît (et il n'y en a aucune ici, puisque la seule force est le poids, purement vertical).

### Ce que ça implique pour $v_x(t)$ — et pourquoi ta prédiction du R0 se teste ici

Une accélération horizontale nulle, constante, se primitive en une vitesse horizontale **constante** :

$$v_x(t) = v_{0x}$$

Ce résultat mérite qu'on s'y arrête, parce qu'il tranche directement la question posée en R0. Beaucoup d'élèves imaginent que la vitesse horizontale ralentit en même temps que la vitesse verticale ralentit (en montée), pour ensuite « reprendre » en redescente — comme si les deux composantes étaient liées. Ce n'est pas le cas : ce sont deux mouvements **complètement indépendants**, gouvernés par deux équations séparées. La composante verticale $v_y(t)$ change bel et bien avec le temps (elle diminue, s'annule au sommet, puis devient négative) — c'est elle qu'on voit ralentir puis s'inverser. Mais $v_x(t)$, elle, ne bouge pas d'un iota : elle vaut $v_{0x}$ au lancer, $v_{0x}$ au sommet, $v_{0x}$ à l'impact. Rien dans le bilan des forces ne pourrait la faire changer, puisque $a_x = 0$ à chaque instant.

On primitive une seconde fois pour obtenir les positions — ce sont les **équations horaires** du mouvement :

$$x(t) = v_{0x}\,t$$

$$y(t) = v_{0y}\,t - \frac{1}{2}g\,t^2$$

où $v_{0x}$ et $v_{0y}$ sont les composantes du vecteur vitesse initial $\vec{v}_0$, obtenues par projection de $\vec{v}_0$ sur les deux axes :

$$v_{0x} = v_0\cos\alpha \qquad \text{et} \qquad v_{0y} = v_0\sin\alpha$$

**Vérification aux deux cas extrêmes** (la même méthode qu'au chapitre précédent, pour être sûr du bon rôle de $\sin$ et $\cos$) : si $\alpha \to 0^\circ$ (lancer parfaitement horizontal), toute la vitesse doit être horizontale — $\cos 0^\circ = 1$ et $\sin 0^\circ = 0$ confirment $v_{0x} = v_0$, $v_{0y} = 0$. Si $\alpha \to 90^\circ$ (lancer parfaitement vertical), toute la vitesse doit être verticale — $\cos 90^\circ = 0$ et $\sin 90^\circ = 1$ confirment $v_{0x} = 0$, $v_{0y} = v_0$. Ce dernier cas est exactement la chute verticale du rung précédent : elle n'est pas un cas séparé, c'est le cas particulier $\alpha = 90^\circ$ du mouvement qu'on étudie maintenant, où le mouvement horizontal disparaît simplement parce que $v_{0x} = 0$.

### Exemple travaillé : construire les quatre équations

*Ce qu'on cherche ici, et pourquoi ce geste :* avant de pouvoir parler de trajectoire, de flèche ou de portée dans les rungs suivants, il faut ces quatre équations, une bonne fois, proprement établies. On va les réutiliser telles quelles.

On lance un projectile avec une vitesse initiale de norme $v_0 = 25\ \text{m/s}$, faisant un angle $\alpha$ avec l'horizontale tel que $\sin\alpha = 0{,}60$ et $\cos\alpha = 0{,}80$. On prend $g \approx 9{,}8\ \text{m/s}^2$, origine au point de lancement.

**Composantes de la vitesse initiale :**

$$v_{0x} = v_0\cos\alpha = 25 \times 0{,}80 = 20\ \text{m/s}$$

$$v_{0y} = v_0\sin\alpha = 25 \times 0{,}60 = 15\ \text{m/s}$$

**Les quatre équations du mouvement :**

$$v_x(t) = 20\ \text{m/s} \qquad (\text{constante, pour tout } t)$$

$$v_y(t) = 15 - 9{,}8\,t$$

$$x(t) = 20\,t$$

$$y(t) = 15\,t - 4{,}9\,t^2$$

On va garder cet exemple — ce même $v_0$, ce même $\alpha$ — pour les rungs suivants.

---

## R3 — De deux équations horaires à une trajectoire : éliminer le temps

### Ce que $x(t)$ et $y(t)$ ne disent pas directement

Les équations horaires $x(t)$ et $y(t)$ du rung précédent disent où se trouve le projectile à un instant $t$ donné. Mais elles ne disent pas directement, sans passer par $t$, quelle **forme géométrique** dessine sa trajectoire — la courbe que suivrait un pinceau attaché au projectile. Pour ça, il faut une relation entre $y$ et $x$ seuls, sans $t$ dedans. On l'obtient en **éliminant le temps** entre les deux équations horaires.

### La méthode

$$x(t) = v_{0x}\,t$$

Cette relation est réversible tant que $v_{0x} \neq 0$ (c'est-à-dire tant que $\alpha \neq 90^\circ$ — le seul cas où elle ne le serait pas est la chute verticale pure du rung 1, qui n'a pas de trajectoire à proprement parler puisque $x$ reste nul). On peut donc isoler $t$ :

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

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la formule à l'exemple du rung précédent, puis on vérifie le résultat à un point qu'on connaît déjà par un autre calcul — c'est la meilleure garantie qu'on n'a pas fait d'erreur de substitution.

Avec $v_0 = 25\ \text{m/s}$, $\sin\alpha = 0{,}60$, $\cos\alpha = 0{,}80$, $g \approx 9{,}8\ \text{m/s}^2$ :

$$\tan\alpha = \frac{0{,}60}{0{,}80} = 0{,}75$$

$$\frac{g}{2v_0^2\cos^2\alpha} = \frac{9{,}8}{2 \times 25^2 \times 0{,}80^2} = \frac{9{,}8}{800} = 0{,}01225$$

$$y(x) = 0{,}75\,x - 0{,}01225\,x^2$$

**Vérification à $x = 20\ \text{m}$ :** d'après les équations horaires du rung précédent, $x(t) = 20t = 20\ \text{m}$ à l'instant $t = 1{,}0\ \text{s}$, et à cet instant $y(1{,}0) = 15\times 1{,}0 - 4{,}9\times 1{,}0^2 = 15 - 4{,}9 = 10{,}1\ \text{m}$. Avec l'équation de la trajectoire : $y(20) = 0{,}75\times 20 - 0{,}01225\times 20^2 = 15 - 4{,}9 = 10{,}1\ \text{m}$. Les deux méthodes donnent exactement le même résultat — l'élimination du temps n'a rien perdu, elle a seulement changé de variable.

---

## R4 — La flèche et la portée : deux grandeurs, deux définitions

### Arrête-toi avant de lire la suite

Voici deux mots qu'on va employer tout le temps dans ce rung, et qu'il ne faut jamais confondre : la **flèche** et la **portée** d'un tir. Avant de lire leurs définitions précises, prends position : d'après toi, laquelle des deux mesure une hauteur, et laquelle mesure une distance horizontale au sol ?

Ce n'est pas un hasard si on te pose la question maintenant : c'est exactement le genre de vocabulaire qu'on peut apprendre « à l'envers » si on ne s'arrête pas dessus une bonne fois. Voici les définitions, sans ambiguïté :

- La **flèche**, c'est la **hauteur maximale** atteinte par le projectile — une grandeur *verticale*, mesurée à partir du point de lancement. Elle se situe au sommet de la trajectoire.
- La **portée**, c'est la **distance horizontale totale** parcourue par le projectile, du point de lancement jusqu'à son point de chute (au même niveau que le départ) — une grandeur *horizontale*.

Retiens l'image : la flèche, c'est « jusqu'où ça monte » ; la portée, c'est « jusqu'où ça va, au sol ». Les deux se calculent à partir des mêmes équations horaires, mais ce ne sont pas la même question, et ce ne sont jamais le même nombre.

[[figure:trajectoire-parabolique]]

### Calculer la flèche : le sommet, c'est $v_y = 0$

Le sommet de la trajectoire est l'instant où le projectile cesse un instant de monter avant de redescendre — exactement le même critère qu'au rung 1 pour la balle lancée à la verticale : la vitesse verticale s'y annule.

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

Remarque immédiatement : $t_{portee} = 2\,t_{sommet}$ — exactement la même symétrie « montée = descente » observée au rung 1. Ce n'est toujours pas un hasard : la trajectoire $y(x)$ est une parabole (R3), et une parabole est symétrique par rapport à son sommet.

La **portée** est la position horizontale à cet instant :

$$D = x(t_{portee}) = v_{0x}\cdot\frac{2v_{0y}}{g} = \frac{2\,v_0\cos\alpha \cdot v_0\sin\alpha}{g}$$

$$D = \frac{2v_0^2\sin\alpha\cos\alpha}{g}$$

Un rappel de trigonométrie ($2\sin\alpha\cos\alpha = \sin(2\alpha)$) permet de récrire ce résultat sous une forme plus compacte, qu'on utilisera au rung suivant :

$$D = \frac{v_0^2\sin(2\alpha)}{g}$$

### Exemple travaillé : flèche et portée du tir de référence

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique les deux formules au même exemple numérique qu'aux rungs précédents, pour voir concrètement que flèche et portée sont deux nombres différents, de nature différente.

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

**La portée est donc maximale pour un angle de lancement de $45^\circ$, à vitesse initiale fixée.** Ni le tir le plus plat, ni le tir le plus vertical, ne donnent la plus grande distance — c'est un compromis entre les deux qui l'emporte.

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

### Première conséquence : la norme de la vitesse ne change pas

Voici le point qui rend ce mouvement complètement différent de celui du projectile. Décompose l'accélération dans la base de Freinet, comme au chapitre des lois de Newton — une composante tangentielle (le long de la vitesse) et une composante normale (perpendiculaire, tournée vers l'intérieur de la courbe, où $R$ désigne le rayon de courbure) :

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

## R7 — Pour t'entraîner

### Récapitulatif express

- En chute libre (frottements négligés), $\vec{a}_G = \vec{g}$, **indépendant de la masse** — vrai en une dimension (R1) comme dans le mouvement plan d'un projectile (R2, R3).
- Pour un projectile lancé avec un angle $\alpha$ et une vitesse $v_0$, le mouvement se décompose en deux axes **indépendants** : $a_x = 0$ (donc $v_x(t) = v_{0x} = v_0\cos\alpha$, **constante pendant tout le vol**) et $a_y = -g$ (donc $v_y(t) = v_{0y} - gt$, qui change continûment).
- En éliminant le temps entre $x(t)$ et $y(t)$, on obtient l'équation de la trajectoire, une **parabole** : $y(x) = \tan\alpha \cdot x - \dfrac{g}{2v_0^2\cos^2\alpha}x^2$.
- La **flèche** $f = \dfrac{v_0^2\sin^2\alpha}{2g}$ est une hauteur (au sommet, où $v_y=0$) ; la **portée** $D = \dfrac{v_0^2\sin(2\alpha)}{g}$ est une distance horizontale (au sol, à l'arrivée). Ce ne sont jamais le même nombre.
- À $v_0$ fixé, la portée est maximale pour $\alpha = 45^\circ$ ; deux angles complémentaires donnent la même portée. À $\alpha$ fixé, $f$ et $D$ varient comme $v_0^2$.
- Une particule chargée qui entre dans un champ magnétique uniforme (avec $\vec{B}\perp\vec{v}_0$) subit la force de Lorentz $\vec{F} = q\,\vec{v}\wedge\vec{B}$, toujours perpendiculaire à la vitesse : elle ne travaille pas, la **norme de la vitesse reste constante** ($v = v_0$), et le mouvement est **circulaire uniforme** de rayon $R = \dfrac{m\,v_0}{|q|\,B}$. La déflexion à la traversée d'un couloir de champ de largeur $\ell$ vérifie $\sin\theta = \dfrac{\ell}{R}$.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Un joueur de handball tire au but. Le ballon quitte sa main à une hauteur négligeable au-dessus du sol, avec une vitesse initiale de norme $v_0 = 20\ \text{m/s}$, faisant un angle $\alpha$ avec l'horizontale tel que $\sin\alpha = 0{,}50$ et $\cos\alpha \approx 0{,}87$. On prend $g \approx 9{,}8\ \text{m/s}^2$, on néglige les frottements de l'air, et on prend l'origine au point de lancement.

**1) Établir les équations horaires $x(t)$ et $y(t)$ du mouvement du ballon.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique directement la méthode du rung 2 — bilan des forces (seul le poids agit), deuxième loi, projection sur deux axes indépendants.

$$v_{0x} = v_0\cos\alpha = 20\times 0{,}87 \approx 17{,}4\ \text{m/s}$$

$$v_{0y} = v_0\sin\alpha = 20\times 0{,}50 = 10{,}0\ \text{m/s}$$

$$x(t) = 17{,}4\,t \qquad y(t) = 10{,}0\,t - 4{,}9\,t^2$$

**2) La vitesse horizontale du ballon est-elle la même juste après le tir et juste avant l'impact au sol ? Justifier sans refaire de calcul de trajectoire.**

*Ce qu'on cherche ici, et pourquoi ce geste :* cette question teste directement la confusion visée en R0 et R2 — elle ne demande aucun nombre nouveau, seulement de reconnaître ce que dit $a_x = 0$.

Oui, rigoureusement la même. Le poids est une force purement verticale ; sa projection sur l'axe horizontal est nulle à chaque instant, donc $a_x = 0$ tout au long du vol, et $v_x(t) = v_{0x}$ reste constante, du lancer jusqu'à l'impact — qu'importe que le ballon soit en train de monter, d'être à son sommet, ou de redescendre.

**3) Calculer la flèche et la portée du tir.**

*Ce qu'on cherche ici, et pourquoi ce geste :* deux formules, deux grandeurs de nature différente — on applique celles établies en R4, sans les confondre.

$$f = \frac{v_{0y}^2}{2g} = \frac{10{,}0^2}{2\times 9{,}8} = \frac{100}{19{,}6} \approx 5{,}1\ \text{m}$$

$$t_{portee} = \frac{2v_{0y}}{g} = \frac{2\times 10{,}0}{9{,}8} \approx 2{,}04\ \text{s}$$

$$D = v_{0x}\times t_{portee} \approx 17{,}4\times 2{,}04 \approx 35{,}5\ \text{m}$$

La flèche vaut environ $5{,}1\ \text{m}$ (une hauteur), la portée environ $35{,}5\ \text{m}$ (une distance au sol) : le ballon franchirait donc une trentaine de mètres au sol tout en ne montant que d'environ cinq mètres au-dessus de sa hauteur de tir.

### À toi

**Variation 1.** Le même joueur reprend son tir, mais cette fois avec un angle complémentaire de celui de l'exercice précédent, c'est-à-dire $\sin\alpha' \approx 0{,}87$ et $\cos\alpha' = 0{,}50$, à la même vitesse $v_0 = 20\ \text{m/s}$. Sans reprendre tout le calcul depuis le début, indique si la portée de ce nouveau tir est plus grande, plus petite, ou égale à celle de l'exercice précédent, et justifie ta réponse à partir de la formule $D = v_0^2\sin(2\alpha)/g$ établie en R5. Indique aussi, en le justifiant, lequel des deux tirs (celui de l'exercice ou celui-ci) a la flèche la plus grande.

**Variation 2.** Une particule de charge $q$ et de masse $m$, animée d'une vitesse initiale de norme $v_0$ perpendiculaire à un champ magnétique uniforme $\vec{B}$, décrit dans ce champ un cercle de rayon $R = \dfrac{m\,v_0}{|q|\,B}$ (méthode du rung 6). Sans reprendre de calcul numérique, réponds à deux questions. (a) Que devient ce rayon si on double la valeur du champ $B$, toutes les autres grandeurs restant égales ? (b) Pendant tout son trajet dans le champ, la norme de la vitesse de la particule augmente-t-elle, diminue-t-elle, ou reste-t-elle constante — et pour quelle raison de fond, liée à la direction de la force de Lorentz ?
