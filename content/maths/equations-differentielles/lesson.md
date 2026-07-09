# Équations différentielles

---

## R0 — Accroche : la tasse qui refroidit (mais qui n'atteint jamais la température de la pièce)

Tu verses un café à $90\ °\text{C}$ dans une tasse, dans une pièce à $20\ °\text{C}$. Tu poses un thermomètre dedans et tu relèves la température minute après minute.

Avant de lire la suite, prends position, vraiment — choisis un modèle avant de continuer.

**Modèle A.** Le café perd de la chaleur à un rythme constant, disons $x\ °\text{C}$ par minute, toujours le même, jusqu'à ce qu'il atteigne $20\ °\text{C}$ — et s'arrête net à ce moment-là.

**Modèle B.** Le café perd de la chaleur vite au début, quand il est très chaud, et de moins en moins vite à mesure qu'il se rapproche de $20\ °\text{C}$ — sans jamais l'atteindre tout à fait.

Engage-toi sur l'un des deux. Voici maintenant ce qu'on relève réellement, minute après minute :

| $t$ (min) | $0$ | $5$ | $10$ | $20$ |
|---|---|---|---|---|
| $T$ ($°\text{C}$) | $90$ | $62,5$ | $45,8$ | $29,5$ |

Regarde les écarts, pas seulement les valeurs. Entre $t=0$ et $t=5$ (soit $5$ minutes), la température chute de $90-62,5=27,5\ °\text{C}$ — un rythme d'environ $5,5\ °\text{C}$ par minute. Entre $t=5$ et $t=10$ (encore $5$ minutes), elle chute de $62,5-45,8=16,7\ °\text{C}$ — un rythme d'environ $3,3\ °\text{C}$ par minute. Le rythme a changé du tout au tout, alors que l'intervalle de temps est identique.

[[figure:refroidissement-modeles]]

Si le modèle A était vrai, ce rythme serait resté le même — $5,5\ °\text{C}$ par minute dans les deux cas. Il ne l'est pas. Le refroidissement ralentit à mesure que le café se rapproche de la température de la pièce : c'est le modèle B qui décrit la réalité.

Voici l'idée qui explique ce ralentissement : ce n'est pas la température elle-même qui pilote la vitesse de refroidissement, c'est l'**écart** entre la température du café et celle de la pièce. Un grand écart ($90-20=70$) donne un refroidissement rapide ; un petit écart ($29,5-20=9,5$) donne un refroidissement lent. En langage mathématique, si $T(t)$ est la température à l'instant $t$, cette idée s'écrit :

$$T'(t) = -k\big(T(t)-20\big)$$

où $k>0$ est une constante qui dépend du café, de la tasse, de l'air ambiant. Une équation où la **dérivée** d'une fonction s'exprime à partir de la fonction elle-même — pas à partir de $t$ directement — s'appelle une **équation différentielle**.

Tu as déjà croisé une fonction dont la dérivée s'exprime à partir d'elle-même : $\exp$, avec $(e^x)'=e^x$ (chapitre précédent). Ce chapitre généralise cette idée : quelles fonctions vérifient $y'=ay$, ou des variantes un peu plus riches comme $y'=ay+b$, ou même une équation sur la dérivée **seconde** ? Et surtout : comment être sûr d'avoir trouvé **toutes** les solutions, pas seulement une qui a l'air de marcher ?

À la fin de cette leçon, tu sauras écrire l'expression exacte de $T(t)$ pour la tasse de café — et vérifier qu'elle redonne bien les valeurs du tableau ci-dessus. Garde cette question en tête ; on la referme au R3.

---

## R1 — Le mécanisme : $y'=ay$, et pourquoi $Ce^{ax}$ est TOUTE la famille de solutions

### Poser l'équation la plus simple

Soit $a$ un réel fixé. On appelle **équation différentielle** $y'=ay$ le problème suivant : trouver toutes les fonctions $y$, dérivables sur $\mathbb{R}$, telles que pour tout réel $x$ :

$$y'(x) = a\,y(x)$$

Une solution n'est donc pas un nombre : c'est une **fonction tout entière**, qui doit vérifier cette égalité en **chaque** point de $\mathbb{R}$.

### Une famille de solutions qui marche — et on le vérifie

Essayons $y(x) = Ce^{ax}$, où $C$ est une constante réelle quelconque. On dérive :

$$y'(x) = C \times a e^{ax} = a \times Ce^{ax} = a\,y(x)$$

L'égalité $y'=ay$ est vérifiée, quelle que soit la valeur de $C$. Donc **chaque** fonction $x \mapsto Ce^{ax}$, pour chaque choix de $C \in \mathbb{R}$, est une solution. Ça fait déjà une infinité de solutions — une par valeur de $C$.

### Mais est-ce qu'on les a TOUTES ? La question qui compte

Vérifier qu'une famille de fonctions marche ne dit pas qu'il n'en existe pas d'autres, d'une forme complètement différente, qu'on aurait ratées. Pour résoudre l'équation complètement, il faut montrer l'inverse : que **toute** fonction $y$ qui vérifie $y'=ay$ est nécessairement de la forme $Ce^{ax}$. C'est ce que dit vraiment « résoudre » une équation différentielle — pas « en proposer une qui marche », mais « caractériser l'ensemble complet ».

**Ce qu'on cherche ici, et pourquoi ce geste :** on part d'une fonction $y$ dont on sait seulement qu'elle vérifie $y'=ay$ — on ne sait rien d'autre sur elle. L'outil : fabriquer, à partir de $y$, une nouvelle fonction dont on peut montrer que la dérivée est nulle partout — car une fonction de dérivée nulle sur $\mathbb{R}$ est constante (chapitre « Dérivation »). Le bon candidat est $z(x) = y(x)\,e^{-ax}$ : le facteur $e^{-ax}$ est choisi précisément pour « défaire » le $e^{ax}$ qu'on soupçonne être caché dans $y$.

On dérive $z$ comme un produit :

$$z'(x) = y'(x)\,e^{-ax} + y(x) \times (-a)e^{-ax}$$

$$z'(x) = e^{-ax}\big(y'(x) - a\,y(x)\big)$$

Or $y$ vérifie $y'(x) = a\,y(x)$ par hypothèse, donc $y'(x) - a\,y(x) = 0$ :

$$z'(x) = e^{-ax} \times 0 = 0$$

$z'(x)=0$ pour **tout** $x \in \mathbb{R}$. Une fonction de dérivée nulle sur $\mathbb{R}$ est constante : il existe donc un réel $C$ tel que $z(x)=C$ pour tout $x$, c'est-à-dire $y(x)\,e^{-ax}=C$, soit :

$$y(x) = Ce^{ax}$$

**C'est la preuve complète.** On a montré dans les deux sens : toute fonction $Ce^{ax}$ est solution (vérification directe), et toute solution est nécessairement de cette forme (l'argument ci-dessus). L'ensemble des solutions de $y'=ay$ sur $\mathbb{R}$ est donc **exactement** :

$$\boxed{y(x) = Ce^{ax}, \qquad C \in \mathbb{R} \text{ quelconque}}$$

Retiens la méthode, pas seulement le résultat : multiplier par $e^{-ax}$ pour transformer l'équation différentielle en un simple « la dérivée de quelque chose est nulle » est le geste qui débloque tout. C'est la même famille d'idées que tu as déjà pratiquée au chapitre précédent : comparer deux fonctions en montrant que leur différence a une dérivée nulle, ou établir $(e^x)'=e^x$ en dérivant les deux membres d'une identité.

### Arrête-toi : une fonction, ou une famille de fonctions ?

Beaucoup d'élèves, après avoir vu que $\exp$ vérifie $y'=y$, s'imaginent que $\exp$ EST « la » solution de cette équation — comme s'il n'y en avait qu'une seule. Teste cette idée avant de la croire : $y(x) = 5e^{x}$ vérifie-t-elle $y'=y$ ? Dérive : $y'(x) = 5e^x = y(x)$. Oui, ça marche — et $5e^x \neq e^x$. Il y a bien une infinité de solutions, une par valeur de $C$, toutes différentes les unes des autres (elles ne passent pas par les mêmes points), et toutes vérifient exactement la même équation différentielle.

Une équation différentielle, seule, ne détermine donc jamais UNE fonction — elle détermine une **famille**. Pour épingler une solution précise dans cette famille, il faut une information supplémentaire : une valeur de $y$ en un point donné. On y revient au R3.

### Le sens du signe de $a$

Le signe de $a$ décide du comportement qualitatif de toute la famille (en dehors du cas particulier $C=0$, qui donne la fonction nulle, solution triviale) :

- $a>0$ : $e^{ax} \to +\infty$ quand $x \to +\infty$ (croissances comparées, chapitre précédent). La solution **croît** en valeur absolue sans limite — croissance exponentielle.
- $a<0$ : $e^{ax} \to 0$ quand $x \to +\infty$. La solution **s'amenuise** vers $0$ sans jamais l'atteindre — décroissance exponentielle.

Tu as sans doute déjà rencontré cette deuxième situation en physique : la décroissance radioactive vérifie $\dfrac{dN}{dt} = -\lambda N$ (avec $\lambda>0$), c'est-à-dire exactement $y'=ay$ avec $a=-\lambda<0$. La solution est donc $N(t) = Ce^{-\lambda t}$, et la condition initiale $N(0)=N_0$ (nombre de noyaux au départ) fixe $C=N_0$ — on retrouve $N(t)=N_0e^{-\lambda t}$. La méthode utilisée en physique pour l'obtenir (séparer les variables, intégrer) est différente en apparence de la fonction auxiliaire $z=ye^{-ax}$ utilisée ici, mais elle aboutit exactement à la même famille de solutions — ce qui est rassurant : deux chemins, un seul résultat.

### Exemple travaillé

Résous sur $\mathbb{R}$ l'équation différentielle $y' = -0{,}5y$.

**Ce qu'on cherche ici, et pourquoi ce geste :** l'équation est déjà sous la forme $y'=ay$, avec $a=-0{,}5$ — on applique directement le résultat établi ci-dessus, sans repasser par la preuve.

$$y(x) = Ce^{-0{,}5x}, \qquad C \in \mathbb{R}$$

Comme $a=-0{,}5<0$, chaque solution (non nulle) tend vers $0$ quand $x \to +\infty$ : c'est une famille de décroissances exponentielles.

---

## R2 — $y' = ay+b$ : ajouter un palier

### Pourquoi $y'=ay$ ne suffit pas toujours

Reviens à la tasse de café du R0 : $T'(t) = -k\big(T(t)-20\big)$. Développe le membre de droite :

$$T'(t) = -kT(t) + 20k$$

Ce n'est **pas** de la forme $y'=ay$ : il traîne un terme constant, $20k$, qui ne dépend pas de $T$. C'est le signe que le café ne se refroidit pas vers $0\ °\text{C}$, mais vers la température de la pièce, $20\ °\text{C}$ — un **palier** non nul. Le modèle du R1 doit être élargi.

### Poser l'équation générale

Soient $a$ (non nul) et $b$ deux réels fixés. On cherche les fonctions $y$, dérivables sur $\mathbb{R}$, telles que pour tout $x$ :

$$y'(x) = a\,y(x) + b$$

### Étape 1 : chercher une solution constante

**Ce qu'on cherche ici, et pourquoi ce geste :** avant de chercher la solution générale, cherchons la solution la plus simple qui puisse exister — une fonction **constante**, $y(x)=k$ pour tout $x$. Une constante a une dérivée nulle, donc si une telle solution existe, l'équation impose une condition simple sur $k$.

Si $y(x)=k$ pour tout $x$, alors $y'(x)=0$, et l'équation $y'=ay+b$ devient :

$$0 = ak+b$$

$$k = -\frac{b}{a}$$

(On a besoin ici que $a \neq 0$ — sinon cette division n'a pas de sens, et l'équation $y'=b$ se traite directement comme une primitive constante, hors du cadre de ce chapitre.) La fonction constante $y_p(x) = -\dfrac{b}{a}$ est donc bien une solution — on l'appelle la **solution particulière constante**, ou le **palier** de l'équation.

### Étape 2 : ramener le cas général au R1

**Ce qu'on cherche ici, et pourquoi ce geste :** on connaît déjà toutes les solutions de $z'=az$ (R1). L'idée : montrer que l'écart entre n'importe quelle solution $y$ de notre équation et le palier $y_p$ vérifie exactement cette équation plus simple.

Soit $y$ une solution quelconque de $y'=ay+b$. Pose $z(x) = y(x) - y_p$ (rappel : $y_p=-b/a$ est une constante, donc $z'=y'$). On calcule :

$$z'(x) = y'(x) = a\,y(x)+b$$

On remplace $y(x) = z(x)+y_p$ :

$$z'(x) = a\big(z(x)+y_p\big)+b = a\,z(x) + \big(a\,y_p+b\big)$$

Or $a\,y_p+b = a\times\left(-\dfrac{b}{a}\right)+b = -b+b = 0$ — exactement la condition qui a défini $y_p$ à l'étape 1. Il reste :

$$z'(x) = a\,z(x)$$

C'est exactement l'équation du R1 ! D'après ce qu'on y a établi, il existe donc $C \in \mathbb{R}$ tel que $z(x) = Ce^{ax}$. En revenant à $y = z+y_p$ :

$$\boxed{y(x) = Ce^{ax} - \frac{b}{a}, \qquad C \in \mathbb{R} \text{ quelconque}}$$

C'est l'ensemble complet des solutions de $y'=ay+b$ sur $\mathbb{R}$ — complet pour la même raison qu'au R1 : chaque étape ci-dessus est une équivalence, pas seulement une vérification a posteriori.

### Exemple travaillé

Résous sur $\mathbb{R}$ l'équation $y' = -3y+12$.

**Ce qu'on cherche ici, et pourquoi ce geste :** identifier $a$ et $b$ d'abord, calculer le palier $y_p=-b/a$, puis appliquer directement la formule établie ci-dessus — pas besoin de refaire toute la preuve à chaque exercice.

Ici $a=-3$ et $b=12$, donc :

$$y_p = -\frac{b}{a} = -\frac{12}{-3} = 4$$

$$y(x) = Ce^{-3x} + 4, \qquad C \in \mathbb{R}$$

**Vérification rapide :** $y'(x) = -3Ce^{-3x}$, et $-3y(x)+12 = -3(Ce^{-3x}+4)+12 = -3Ce^{-3x}-12+12 = -3Ce^{-3x}$. Les deux coïncident — c'est cohérent.

### Arrête-toi : le palier, ce n'est PAS $b$

Une erreur très fréquente : recopier $b$ tel quel dans la solution, en écrivant $y(x)=Ce^{ax}+b$ au lieu de $y(x)=Ce^{ax}-\dfrac{b}{a}$. Teste ce modèle avant de le croire, avec l'exemple ci-dessus ($a=-3$, $b=12$) : si $y(x)=Ce^{-3x}+12$ était une solution, on aurait $y'(x)=-3Ce^{-3x}$, et d'autre part $ay+b = -3(Ce^{-3x}+12)+12 = -3Ce^{-3x}-36+12=-3Ce^{-3x}-24$. Les deux membres diffèrent de $24$ — ils ne coïncident jamais, quelle que soit la valeur de $C$. Le modèle « le palier, c'est $b$ » échoue clairement : le vrai palier est $-b/a=4$, pas $b=12$.

En toute généralité : si $y(x)=Ce^{ax}+b$ était solution, l'identification des deux membres imposerait $b(a+1)=0$ — donc $b=0$ ou $a=-1$ seulement. Rien de tel n'est vrai en général : recopier $b$ ne marche presque jamais.

---

## R3 — Fixer la constante : la condition initiale choisit UNE solution dans la famille

### Pourquoi il faut une information de plus

On l'a vu au R1 : l'équation différentielle seule ne détermine qu'une **famille** de courbes — une par valeur de $C$ — qui vérifient toutes la même relation entre $y$ et $y'$. Pour isoler UNE solution précise, il faut donner un point par lequel la courbe doit passer : une valeur $y(x_0)=y_0$, appelée **condition initiale** (souvent $x_0=0$, quand $x$ représente un temps qui démarre à l'origine de l'expérience).

### La méthode

On part de la solution générale (R1 ou R2 selon le cas), et on remplace $x$ par $x_0$ et $y(x_0)$ par $y_0$ : ça donne une équation à une seule inconnue, $C$, qu'on résout.

### Exemple travaillé 1 — condition initiale en $x_0=0$

Détermine la solution $g$ de $y'=4y$ qui vérifie $g(0)=7$.

**Ce qu'on cherche ici, et pourquoi ce geste :** la solution générale est $y(x)=Ce^{4x}$ (R1, $a=4$) ; il reste à utiliser $g(0)=7$ pour fixer $C$.

$$g(0) = Ce^{4\times 0} = Ce^0 = C$$

Donc $C=7$, et :

$$g(x) = 7e^{4x}$$

### Exemple travaillé 2 — condition initiale en un point $x_0 \neq 0$

Détermine la solution $h$ de $y'=3y$ qui vérifie $h(2)=18$. Calcule ensuite $h(0)$.

**Ce qu'on cherche ici, et pourquoi ce geste :** rien n'oblige la condition initiale à être donnée en $x_0=0$ — la méthode est identique, on substitue simplement $x=2$ au lieu de $x=0$. La solution générale est $y(x)=Ce^{3x}$ (R1, $a=3$).

$$h(2) = Ce^{3\times 2} = Ce^{6} = 18$$

$$C = 18e^{-6}$$

En reportant dans la solution générale :

$$h(x) = 18e^{-6}\,e^{3x} = 18\,e^{3x-6} = 18\,e^{3(x-2)}$$

Pour $h(0)$ :

$$h(0) = 18e^{-6} \approx 18 \times 0{,}00248 \approx 0{,}045$$

Remarque : $h(0)$ est très petit — cohérent avec $a=3>0$ (croissance exponentielle) : en remontant de $x=2$ vers $x=0$, on redescend fortement, exactement comme prédit par le sens de variation étudié au R1.

### Fermeture de l'arc : la tasse de café du R0

Reprenons le modèle posé en ouverture : $T'(t) = -k\big(T(t)-20\big)$, avec $k=0{,}1\ \text{min}^{-1}$ (une constante propre à cette tasse, dans cette pièce), et $T(0)=90$.

**Ce qu'on cherche ici, et pourquoi ce geste :** développer d'abord l'équation pour la ramener à la forme $y'=ay+b$ du R2, identifier $a$ et $b$, appliquer la formule, puis utiliser $T(0)=90$ pour fixer $C$.

$$T'(t) = -0{,}1\,T(t) + 0{,}1 \times 20 = -0{,}1\,T(t) + 2$$

Ici $a=-0{,}1$ et $b=2$, donc le palier vaut $-b/a = -2/(-0{,}1) = 20$ — exactement la température de la pièce, ce qui est cohérent avec l'intuition du R0 (le café se rapproche de $20\ °\text{C}$, jamais en dessous). La solution générale (R2) :

$$T(t) = Ce^{-0{,}1t} + 20$$

On utilise $T(0)=90$ :

$$C + 20 = 90 \implies C = 70$$

$$\boxed{T(t) = 70\,e^{-0{,}1t} + 20}$$

**Vérifions que ça redonne bien le tableau du R0.** À $t=5$ : $T(5) = 70e^{-0{,}5}+20 \approx 70\times 0{,}6065+20 \approx 42{,}5+20=62{,}5$ — ça correspond. À $t=10$ : $T(10)=70e^{-1}+20 \approx 70\times 0{,}3679+20 \approx 25{,}8+20=45{,}8$ — ça correspond aussi. À $t=20$ : $T(20)=70e^{-2}+20 \approx 70\times 0{,}1353+20\approx 9{,}5+20=29{,}5$ — encore cohérent.

La formule qu'on vient d'établir n'est pas juste une courbe qui « ressemble » aux données du R0 — elle les reproduit exactement, parce qu'elle a été construite à partir du mécanisme (l'écart pilote la vitesse) et fixée par la seule vraie condition initiale disponible, $T(0)=90$.

[[figure:famille-solutions]]

La figure ci-dessus rend visible ce que le R1 avait déjà annoncé : l'équation $T'=-0{,}1T+2$, à elle seule, ne dessine pas une courbe mais toute une **famille** — une par valeur de $T_0=T(0)$ — qui partagent toutes le même palier $T_p=-b/a=20$ sans jamais le franchir. La courbe en accent, celle avec $T(0)=90$, est la seule que le calcul ci-dessus a isolée dans cette famille.

---

## R4 — L'équation de l'oscillateur : $y'' + \omega^2 y = 0$

### Une équation sur la dérivée seconde

Jusqu'ici, l'équation portait sur $y'$ seule. Voici une équation différente, qui porte sur la dérivée **seconde** $y''$ : pour $\omega$ un réel strictement positif fixé (appelé **pulsation**),

$$y''(x) + \omega^2\,y(x) = 0 \qquad \text{c'est-à-dire} \qquad y''(x) = -\omega^2\,y(x)$$

Cette équation dit : la dérivée seconde de $y$ est proportionnelle à $-y$ elle-même. C'est le signe **moins** qui change tout par rapport à un simple $y''=ky$ ($k>0$, qu'on ne traite pas dans ce chapitre) : ici, quand $y$ est positif, $y''$ est négatif — la courbe se recourbe **vers** l'axe, jamais en s'en éloignant indéfiniment. C'est exactement la signature d'un mouvement qui **oscille**, sans jamais s'échapper vers l'infini.

### Vérifier que $\cos(\omega x)$ et $\sin(\omega x)$ sont solutions

Dérive $\cos(\omega x)$ deux fois de suite :

$$\big(\cos(\omega x)\big)' = -\omega\sin(\omega x)$$

$$\big(\cos(\omega x)\big)'' = -\omega^2\cos(\omega x)$$

C'est bien $-\omega^2$ fois la fonction de départ : $\cos(\omega x)$ vérifie $y''=-\omega^2 y$. Fais le même calcul pour $\sin(\omega x)$ :

$$\big(\sin(\omega x)\big)' = \omega\cos(\omega x)$$

$$\big(\sin(\omega x)\big)'' = -\omega^2\sin(\omega x)$$

$\sin(\omega x)$ vérifie aussi l'équation. Et comme la dérivation est linéaire (la dérivée d'une somme est la somme des dérivées), toute combinaison $y(x) = A\cos(\omega x)+B\sin(\omega x)$, pour $A,B$ réels quelconques, vérifie encore l'équation :

$$y''(x) = A\big(\cos(\omega x)\big)'' + B\big(\sin(\omega x)\big)'' = -\omega^2\big(A\cos(\omega x)+B\sin(\omega x)\big) = -\omega^2\,y(x)$$

### On admet la réciproque

Comme au R1, il faudrait montrer que ce sont bien LÀ toutes les solutions — pas seulement des solutions qui marchent. La preuve complète pour une équation du second ordre demande des outils (l'espace des solutions a une structure de plan vectoriel, avec un argument d'unicité qui s'appuie sur un théorème plus général) qui dépassent le programme de 2ᵉ Bac SM. On **admet** ici, comme on a admis au chapitre précédent que « la réciproque d'une bijection dérivable de dérivée jamais nulle est dérivable » : l'ensemble des solutions de $y''+\omega^2y=0$ sur $\mathbb{R}$ est exactement

$$\boxed{y(x) = A\cos(\omega x) + B\sin(\omega x), \qquad A,B \in \mathbb{R} \text{ quelconques}}$$

### Interprétation : un mouvement oscillant

Chaque solution est **périodique**, de période $T = \dfrac{2\pi}{\omega}$ (le plus petit réel positif tel que $\cos(\omega(x+T))=\cos(\omega x)$ et $\sin(\omega(x+T))=\sin(\omega x)$ pour tout $x$, puisque $\cos$ et $\sin$ ont pour période $2\pi$). $\omega$ mesure donc directement la rapidité de l'oscillation : plus $\omega$ est grand, plus la période $T$ est courte, plus les oscillations se succèdent vite.

**Remarque (forme amplitude-phase).** On peut réécrire $A\cos(\omega x)+B\sin(\omega x)$ sous une forme équivalente, souvent utilisée en physique : $R\cos(\omega x-\varphi)$, avec $R=\sqrt{A^2+B^2}$ (l'amplitude) et $\varphi$ un angle tel que $\cos\varphi = A/R$, $\sin\varphi=B/R$ (la phase à l'origine). En effet, en développant $\cos(\omega x - \varphi) = \cos(\omega x)\cos\varphi + \sin(\omega x)\sin\varphi$ (formule d'addition), on retrouve bien un coefficient $R\cos\varphi$ devant $\cos(\omega x)$ et $R\sin\varphi$ devant $\sin(\omega x)$ — soit $A$ et $B$. Les deux écritures décrivent exactement la même famille de fonctions ; on choisit celle qui est la plus commode selon ce qu'on connaît (deux constantes $A,B$, ou une amplitude et une phase $R,\varphi$).

### Déterminer $A$ et $B$ à partir de deux conditions initiales

Une équation du **second** ordre a une solution générale à **deux** constantes ($A$ et $B$) — il faut donc **deux** informations pour les fixer, typiquement la position de départ $y(0)$ ET la vitesse de départ $y'(0)$ (exactement comme en mécanique : prédire une trajectoire demande de connaître à la fois où l'on est et à quelle vitesse on va, pas l'un sans l'autre).

**Ce qu'on cherche ici, et pourquoi ce geste :** on évalue $y$ et $y'$ en $x=0$ — c'est là que $\sin(\omega\times 0)=0$ et $\cos(\omega\times 0)=1$ simplifient tout, en isolant chaque constante d'un coup.

$$y(0) = A\cos(0)+B\sin(0) = A$$

Donc $A=y(0)$ directement. Pour $B$, dérive d'abord :

$$y'(x) = -A\omega\sin(\omega x) + B\omega\cos(\omega x)$$

$$y'(0) = -A\omega\sin(0)+B\omega\cos(0) = B\omega$$

Donc $B = \dfrac{y'(0)}{\omega}$ — attention au facteur $\omega$, qui vient de la dérivée de $\sin(\omega x)$ et qu'il ne faut pas oublier.

### Exemple travaillé

Détermine la solution de $y''+16y=0$ qui vérifie $y(0)=3$ et $y'(0)=8$.

**Ce qu'on cherche ici, et pourquoi ce geste :** identifier $\omega$ d'abord ($\omega^2=16$, donc $\omega=4$, car $\omega>0$ par convention), puis appliquer directement $A=y(0)$ et $B=y'(0)/\omega$.

$$\omega = \sqrt{16} = 4$$

$$A = y(0) = 3 \qquad\qquad B = \frac{y'(0)}{\omega} = \frac{8}{4} = 2$$

$$y(x) = 3\cos(4x) + 2\sin(4x)$$

**Vérification :** $y'(x) = -12\sin(4x)+8\cos(4x)$, donc $y'(0) = 8\cos(0) = 8$ — cohérent avec la donnée.

[[figure:oscillateur-periode]]

### Arrête-toi : ne pas oublier de diviser par $\omega$

Une erreur fréquente : poser $B=y'(0)$ directement, sans diviser par $\omega$. Teste ce reflexe sur l'exemple ci-dessus : si $B=8$ (au lieu de $2$), la fonction $y(x)=3\cos(4x)+8\sin(4x)$ donnerait $y'(x) = -12\sin(4x)+32\cos(4x)$, donc $y'(0)=32 \neq 8$ — ça contredit la condition posée au départ. Le facteur $\omega$ n'est pas optionnel : il vient directement de la dérivée $(\sin(\omega x))'=\omega\cos(\omega x)$, et l'oublier fausse systématiquement la vitesse initiale.

---

## R5 — Reconnaître l'équation en physique : RC, RL, oscillateur

Les trois outils qu'on vient de construire ($y'=ay$, $y'=ay+b$, $y''+\omega^2y=0$) ne sont pas que des exercices abstraits : ce sont exactement les équations que tu rencontres — ou rencontreras — en physique, dès qu'un circuit ou un mouvement obéit à une loi qui relie une grandeur à sa (ou ses) dérivée(s). Voici comment reconnaître chaque cas et réutiliser directement les résultats ci-dessus, sans deviner.

### Charge et décharge d'un condensateur (dipôle RC)

Un condensateur de capacité $C_0$ (on note la capacité $C_0$ ici, pas $C$, pour ne pas la confondre avec la constante d'intégration) se charge à travers une résistance $R$, sous une tension constante $E$. La loi des mailles donne (établi en physique) :

$$R C_0\, u_C'(t) + u_C(t) = E$$

**Reconnaître la forme :** on divise par $RC_0$ :

$$u_C'(t) = -\frac{1}{RC_0}\,u_C(t) + \frac{E}{RC_0}$$

C'est exactement $y'=ay+b$, avec $a=-\dfrac{1}{RC_0}$ et $b=\dfrac{E}{RC_0}$. Le palier :

$$u_{C,p} = -\frac{b}{a} = -\dfrac{E/(RC_0)}{-1/(RC_0)} = E$$

La solution générale (R2) : $u_C(t) = Ke^{-t/(RC_0)}+E$ (on note la constante d'intégration $K$ ici, pour la même raison). Condensateur initialement déchargé : $u_C(0)=0$, donc $K+E=0$, soit $K=-E$ :

$$u_C(t) = E\left(1-e^{-t/(RC_0)}\right)$$

C'est la courbe de charge classique : $u_C$ démarre à $0$ et tend vers $E$ sans jamais le dépasser.

**Et la décharge ?** Sans générateur ($E=0$, condensateur déjà chargé à $U_0$ qui se vide dans $R$ seule), l'équation devient $RC_0u_C'+u_C=0$, soit $u_C'=-\dfrac{1}{RC_0}u_C$ — un cas $b=0$, donc exactement le R1 pur (le palier est $0$, puisqu'il n'y a plus de source pour maintenir une tension non nulle) :

$$u_C(t) = U_0\,e^{-t/(RC_0)}$$

C'est la différence essentielle entre charge et décharge : la charge a un palier non nul ($E$, imposé par le générateur), la décharge a un palier nul (rien ne maintient de tension une fois le générateur retiré).

[[figure:rc-charge-decharge]]

### Établissement du courant dans un dipôle RL

La loi des mailles pour une bobine $(L,r)$ en série avec un résistor $R_0$, sous une tension $E$, donne (établi en physique, avec $R=R_0+r$ la résistance totale) :

$$L\,i'(t) + Ri(t) = E$$

**Reconnaître la forme :**

$$i'(t) = -\frac{R}{L}\,i(t) + \frac{E}{L}$$

$y'=ay+b$ avec $a=-R/L$, $b=E/L$. Le palier :

$$i_p = -\frac{b}{a} = -\dfrac{E/L}{-R/L} = \frac{E}{R} = I_{max}$$

Solution générale : $i(t)=Ke^{-Rt/L}+I_{max}$. Condition initiale $i(0)=0$ (interrupteur qui vient de fermer, courant nul au départ) : $K=-I_{max}$ :

$$i(t) = I_{max}\left(1-e^{-t/\tau}\right), \qquad \tau = \frac{L}{R}$$

Retrouve exactement le résultat du chapitre « Dipôle RL » — mais cette fois obtenu directement à partir de la théorie générale de cette leçon, sans passer par « on devine une forme, puis on vérifie ».

### L'oscillateur : circuit LC idéal (et tout mouvement oscillant)

Dans un circuit LC idéal (sans résistance), la loi des mailles donne (établi en physique) $Lq''(t)+\dfrac{q(t)}{C_0}=0$, soit :

$$q''(t) = -\frac{1}{LC_0}\,q(t)$$

C'est $y''+\omega^2y=0$ avec $\omega^2 = \dfrac{1}{LC_0}$, donc $\omega=\dfrac{1}{\sqrt{LC_0}}$ — exactement la pulsation propre du circuit LC. La solution générale : $q(t)=A\cos(\omega t)+B\sin(\omega t)$. Avec un condensateur initialement chargé au maximum et un courant nul au départ ($q(0)=Q_{max}$, $i(0)=q'(0)=0$) :

$$A = q(0) = Q_{max} \qquad\qquad B = \frac{q'(0)}{\omega} = 0$$

$$q(t) = Q_{max}\cos(\omega t)$$

C'est la même famille de solutions que celle obtenue par « deviner un cosinus, puis vérifier » dans le chapitre sur les oscillations RLC — avec cette condition initiale précise (charge maximale, courant nul au départ), la phase est nulle, et on retrouve exactement le même cosinus.

Cette même équation, $y''+\omega^2y=0$, gouverne n'importe quel **mouvement oscillant** dont l'accélération est proportionnelle à l'opposé de la position — un ressort qui rappelle une masse vers sa position d'équilibre, un pendule pour de petites oscillations, par exemple. Le contexte physique change (charge électrique, position mécanique), les grandeurs changent de nom, mais l'outil mathématique — et sa solution — reste rigoureusement le même.

---

## R6 — Pour t'entraîner

### Exercice de type bac (entraînement original — pas un sujet officiel)

On considère l'équation différentielle $(E) : y' = -2y+8$, où $y$ désigne une fonction dérivable sur $\mathbb{R}$.

**1)** Déterminer la solution constante de $(E)$.

**2)** Résoudre $(E)$ sur $\mathbb{R}$.

**3)** Déterminer la solution $f$ de $(E)$ qui vérifie $f(0)=3$.

**4)** Étudier le sens de variation de $f$ sur $\mathbb{R}$, puis déterminer $\displaystyle\lim_{x\to+\infty}f(x)$ et $\displaystyle\lim_{x\to-\infty}f(x)$.

**5)** $f$ modélise, en unités adaptées, la concentration d'une substance dans un milieu ($x$ en heures). Déterminer, à $0{,}01$ heure près, l'instant où cette concentration vaut $3{,}5$.

**Raisonnement à voix haute.**

**1)** *Ce qu'on cherche ici, et pourquoi ce geste :* on identifie $a=-2$, $b=8$, et on applique directement la formule du palier établie au R2, $y_p=-b/a$ — pas besoin de repartir de zéro.

$$y_p = -\frac{b}{a} = -\frac{8}{-2} = 4$$

**2)** *Ce qu'on cherche ici, et pourquoi ce geste :* on applique le résultat général du R2 avec $a=-2$ et le palier trouvé en 1).

$$y(x) = Ce^{-2x}+4, \qquad C \in \mathbb{R}$$

**3)** *Ce qu'on cherche ici, et pourquoi ce geste :* on utilise $f(0)=3$ pour fixer la constante $C$ — la même méthode qu'au R3.

$$f(0) = C+4 = 3 \implies C=-1$$

$$f(x) = 4-e^{-2x}$$

**4)** *Ce qu'on cherche ici, et pourquoi ce geste :* dériver $f$ pour son signe, puis utiliser les limites de référence de $e^{-2x}$ (chapitre précédent) en $\pm\infty$.

$$f'(x) = 2e^{-2x}$$

Pour tout $x \in \mathbb{R}$, $e^{-2x}>0$, donc $f'(x)>0$ : $f$ est **strictement croissante** sur $\mathbb{R}$.

Quand $x\to+\infty$, $e^{-2x}\to 0$ (croissances comparées, chapitre précédent), donc $f(x)\to 4$. Quand $x\to-\infty$, $e^{-2x}\to+\infty$, donc $-e^{-2x}\to-\infty$ et $f(x)\to-\infty$.

$$\lim_{x\to+\infty}f(x) = 4 \qquad\qquad \lim_{x\to-\infty}f(x) = -\infty$$

**5)** *Ce qu'on cherche ici, et pourquoi ce geste :* $f$ étant strictement croissante avec $\lim_{+\infty}f=4$, toute valeur strictement inférieure à $4$ est atteinte une seule fois (corollaire du TVI, chapitre « Limites et continuité ») — $3{,}5<4$, donc l'équation $f(x)=3{,}5$ a bien un sens ; on la résout en isolant l'exponentielle, puis en passant par $\ln$ (chapitre précédent).

$$4-e^{-2x} = 3{,}5$$

$$e^{-2x} = 0{,}5$$

$$-2x = \ln(0{,}5) = -\ln 2$$

$$x = \frac{\ln 2}{2} \approx \frac{0{,}6931}{2} \approx 0{,}35$$

La concentration atteint $3{,}5$ au bout d'environ $0{,}35$ heure.

### À toi de jouer

**(a)** Résous sur $\mathbb{R}$ l'équation différentielle $y'=5y$, puis détermine la solution $g$ qui vérifie $g(0)=-4$. Calcule $g(1)$ (valeur exacte, puis arrondie à $0{,}01$ près).

**(b)** Un point mobile a une position $x(t)$ (en cm) qui vérifie l'équation différentielle $x''+25x=0$. Sachant qu'à l'instant $t=0$ la position est $x(0)=2$ et la vitesse $x'(0)=-15$, détermine $x(t)$. Quelle est la période des oscillations ?

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts, non résolus par cet auteur :
     (1) skill_code proposé : `maths_equations_differentielles` (convention
     "<subject>_<short>" majoritaire dans le corpus maths ; quelques notions
     utilisent un préfixe `sma_` non généralisé — à confirmer par
     supabase-architect avant intégration en base, comme pour les autres
     notions marquées "proposed" dans le corpus).
     (2) Choix pédagogique : la preuve d'unicité (R1, fonction auxiliaire
     z=y e^{-ax}) est la méthode standard du programme marocain 2 Bac SM pour
     ce théorème ; elle réutilise explicitement le fait "dérivée nulle sur un
     intervalle => fonction constante" déjà établi et cité dans
     `derivabilite-etude-fonctions` / `calcul-integral` / `fonction-logarithme`.
     Pour y''+omega^2 y=0 (R4), la réciproque (toutes les solutions sont de
     cette forme) est ADMISE sans démonstration, cohérent avec le traitement
     "on admet" déjà pratiqué dans `fonction-exponentielle` pour des théorèmes
     hors-portée du programme — à confirmer que ce choix de scope (pas de
     Wronskien, pas de résolution de l'équation caractéristique via les
     complexes) correspond bien à la progression réelle des manuels 2 Bac SM.
     (3) R5 (applications RC/RL/oscillateur) suppose que les équations
     différentielles physiques (RC u_C'+u_C=E, L i'+Ri=E, L q''+q/C=0) sont
     déjà établies côté physique (cf. `content/pc/rc-charge`,
     `content/pc/dipole-rl`, `content/pc/rlc-serie`) — cette leçon ne les
     re-dérive pas depuis la loi des mailles, elle les RECONNAÎT et les
     résout avec l'outil mathématique construit aux R1-R2-R4. Notation
     `C_0` utilisée pour la capacité (au lieu de `C`) afin d'éviter tout
     conflit avec la constante d'intégration — à valider que cette convention
     ne heurte pas une notation déjà fixée ailleurs en base.
     (4) Les valeurs numériques du R0 (café à 90°C, pièce à 20°C, k=0,1/min)
     et de l'exercice R6 sont des données ILLUSTRATIVES construites pour cette
     leçon, choisies pour boucler proprement (cohérence R0 <-> R3) — non
     sourcées, non présentées comme un relevé réel ni comme un sujet officiel.
-->
