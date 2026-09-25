# Fonction exponentielle

---

## R0 — Accroche : défaire ce que ln a fait

Rappelle-toi ce qu'on a établi à la toute fin de la leçon précédente (son chapitre 6) : $\ln$ réalise une bijection de $]0,+\infty[$ vers $\mathbb{R}$ tout entier. Concrètement, ça veut dire : pour **tout** réel $k$, l'équation $\ln(x) = k$ admet une unique solution $x \in\, ]0,+\infty[$.

C'est un résultat puissant — existence et unicité, jamais deux solutions, jamais aucune. Mais regarde bien ce qu'il ne te donne pas : il ne te dit pas **qui** est ce $x$. Pour $k=1$, tu as déjà résolu le problème en donnant un nom à la solution : $x=e$. Mais pour $k=2$ ? Pour $k=-3$ ? Pour $k=100$ ? Tu sais que la solution existe, et qu'elle est unique — mais tu n'as, pour l'instant, aucun moyen de l'écrire autrement que « le nombre dont le logarithme vaut $k$ ».

Avant de lire la suite, prends position. Imagine une fonction, appelons-la provisoirement $E$, dont le travail est exactement de **défaire** ce que fait $\ln$ : $E(k)$ te redonnerait ce nombre $x$ tel que $\ln(x) = k$. Deux questions à te poser sérieusement, sur cette fonction hypothétique :

**Que devrait valoir $E(0)$ ?** (Indice : quel nombre a un logarithme nul ?)

**Comment $E(a+b)$ devrait-il s'exprimer en fonction de $E(a)$ et $E(b)$ ?** ($\ln$ transforme un produit en somme — que devrait faire une fonction qui défait $\ln$, sur une somme ?)

Note tes réponses avant de continuer — engage-toi vraiment, pas juste dans ta tête.

[[checkpoint:cp-r0-predict]]

Cette fonction $E$ existe réellement. Elle porte un nom que tu as probablement déjà croisé : la fonction **exponentielle**, notée $\exp$. C'est elle qui va nous occuper dans ce chapitre : d'où elle vient (elle n'est pas inventée indépendamment de $\ln$ — elle EST la réciproque de $\ln$), comment elle se manipule (propriétés algébriques, dérivée, limites), et comment elle sert à résoudre des équations que $\ln$ seul ne permettait pas de conclure proprement.

À la fin de cette leçon, tu sauras répondre exactement aux deux questions posées ci-dessus — et surtout pourquoi les réponses sont ce qu'elles sont, pas seulement les réciter.

---

## R1 — La fonction exponentielle : la réciproque de ln

### Ce que « réciproque » veut dire ici, précisément

On a vu (chapitre précédent, chapitre 6) que $\ln$ réalise une bijection de $]0,+\infty[$ vers $\mathbb{R}$. Une bijection, par définition, a une réciproque : une fonction qui **inverse** l'action de $\ln$, en repartant de $\mathbb{R}$ pour revenir à $]0,+\infty[$.

**Définition.** La fonction **exponentielle**, notée $\exp$, est la réciproque de la bijection $\ln : \,]0,+\infty[\, \to \mathbb{R}$. Elle est donc définie sur $\mathbb{R}$ tout entier, à valeurs dans $]0,+\infty[$, et caractérisée par l'équivalence fondamentale :

$$\text{pour tout } x \in \mathbb{R} \text{ et tout } y \in\, ]0,+\infty[, \qquad \exp(x) = y \iff x = \ln(y)$$

Deux identités découlent immédiatement de cette définition — ce sont elles qui traduisent, en formule, l'idée de « défaire » :

$$\ln(\exp(x)) = x \ \text{ pour tout } x \in \mathbb{R} \qquad\qquad \exp(\ln(x)) = x \ \text{ pour tout } x \in\, ]0,+\infty[$$

Applique $\ln$ après $\exp$, ou $\exp$ après $\ln$ : tu reviens à ton point de départ. C'est exactement le sens de « réciproque ».

### Répondre aux deux questions du chapitre 1

**Que vaut $\exp(0)$ ?** Par définition, $\exp(0)$ est l'unique réel positif dont le logarithme vaut $0$. Or on sait (chapitre précédent, chapitre 2) que $\ln(1) = 0$, et que $1$ est le SEUL réel dont le log s'annule ($\ln$ strictement croissante, donc injective). Donc :

$$\exp(0) = 1$$

**Que vaut $\exp(1)$ ?** Par définition, $\exp(1)$ est l'unique réel positif dont le logarithme vaut $1$ — c'est précisément la définition du nombre $e$ posée au chapitre précédent (chapitre 6) ! Donc :

$$\exp(1) = e \qquad (e \approx 2{,}718)$$

Ces deux valeurs ne sont pas à mémoriser par cœur comme des faits isolés — elles tombent directement de la définition de $\exp$ comme réciproque de $\ln$.

### Signe et sens de variation

$\exp$ est à valeurs dans $]0,+\infty[$ par définition (c'est le domaine de $\ln$, l'espace d'arrivée de la réciproque) : **$\exp(x) > 0$ pour tout réel $x$, sans aucune exception.** Il n'y a pas de condition à vérifier ici, contrairement à $\ln(x)$ qui exigeait $x>0$ : $\exp$ est définie partout sur $\mathbb{R}$, et son résultat est toujours strictement positif.

$\ln$ est strictement croissante sur $]0,+\infty[$ (chapitre précédent, chapitre 2). Un fait général sur les réciproques, qu'on admet ici : **la réciproque d'une bijection strictement croissante est elle-même strictement croissante.** (L'idée intuitive : si $\ln$ préserve l'ordre en allant de $]0,+\infty[$ vers $\mathbb{R}$, sa réciproque doit préserver l'ordre en revenant en arrière — inverser l'ordre à l'aller puis encore au retour reviendrait à ne rien inverser du tout.) Donc :

$$\exp \text{ est strictement croissante sur } \mathbb{R}$$

**Exemple travaillé.** Compare $\exp(3)$ et $\exp(-2)$ sans calculatrice.

**Ce qu'on cherche et pourquoi ce geste :** $\exp$ étant strictement croissante sur $\mathbb{R}$, comparer deux valeurs de $\exp$ revient à comparer directement leurs arguments — exactement le réflexe déjà pris avec $\ln$ au chapitre précédent.

$$3 > -2 \implies \exp(3) > \exp(-2) \quad (\exp \text{ strictement croissante})$$

Pas besoin de connaître les valeurs numériques : l'ordre des arguments suffit à conclure l'ordre des images.

### Une confusion à écarter tout de suite

Une erreur fréquente à ce stade : croire que $\exp(x)$ peut être négatif ou nul pour un $x$ très négatif. Ce n'est jamais le cas. Aussi négatif que soit $x$, $\exp(x)$ reste strictement positif — simplement, il devient très **petit**, très proche de $0$, sans jamais l'atteindre (on y reviendra précisément au chapitre 5, avec la limite en $-\infty$). $0$ n'est tout simplement **pas dans l'image** de $\exp$ : il n'existe aucun réel $x$ tel que $\exp(x) = 0$, exactement parce que $\ln(0)$ n'existe pas — il n'y a rien à « défaire » pour $y=0$.

Attention aussi à l'erreur symétrique : ce n'est pas $\exp$ qui a un domaine restreint, c'est $\ln$. $\exp(x)$ est parfaitement défini pour n'importe quel réel $x$, aussi grand ou aussi négatif soit-il.

[[figure:exp-reciproque-de-ln]]

---

## R2 — Propriétés algébriques : quand la somme redevient un produit

### Retour à la deuxième question du chapitre 1

On a demandé au chapitre 1 : comment $E(a+b)$ devrait-il s'exprimer à partir de $E(a)$ et $E(b)$ ? Puisque $\ln$ transforme un produit en somme ($\ln(uv) = \ln(u)+\ln(v)$), sa réciproque doit faire le trajet inverse : transformer une somme en produit. Vérifions-le proprement, sans se contenter de l'intuition.

**Propriété (produit).** Pour tous réels $a$ et $b$ :

$$\exp(a+b) = \exp(a) \times \exp(b)$$

**Pourquoi c'est vrai.** L'outil disponible ici, c'est l'injectivité de $\ln$ (chapitre précédent, chapitres 2 et 6) : deux réels strictement positifs qui ont le même logarithme sont égaux.

**Ce qu'on cherche et pourquoi ce geste :** on ne peut pas manipuler $\exp$ directement pour l'instant — on ne connaît en détail que $\ln$. Le geste : calculer $\ln$ des deux candidats $\exp(a+b)$ et $\exp(a)\times\exp(b)$, vérifier qu'ils coïncident, puis conclure par injectivité.

D'un côté, en utilisant l'identité fondamentale $\ln(\exp(t))=t$ (chapitre 2) :

$$\ln\big(\exp(a+b)\big) = a+b$$

De l'autre côté, en utilisant la propriété du produit de $\ln$ (chapitre précédent, chapitre 3), puis l'identité fondamentale sur chaque facteur :

$$\ln\big(\exp(a) \times \exp(b)\big) = \ln(\exp(a)) + \ln(\exp(b))$$

$$\ln\big(\exp(a) \times \exp(b)\big) = a + b$$

Les deux nombres $\exp(a+b)$ et $\exp(a)\times\exp(b)$ sont tous les deux strictement positifs (image de $\exp$, chapitre 2), et on vient de montrer qu'ils ont le **même logarithme**, $a+b$. Par injectivité de $\ln$ sur $]0,+\infty[$ :

$$\exp(a+b) = \exp(a) \times \exp(b)$$

C'est exactement la réponse prédite au chapitre 1 : la somme à l'intérieur devient un produit à l'extérieur.

### Ce que ça entraîne : opposé et puissance

**Propriété (opposé).** Pour tout réel $a$ : $\exp(-a) = \dfrac{1}{\exp(a)}$.

**Pourquoi :** applique la propriété du produit à $a$ et $-a$, dont la somme vaut $0$ :

$$\exp(a) \times \exp(-a) = \exp\big(a + (-a)\big) = \exp(0) = 1$$

Le produit $\exp(a) \times \exp(-a)$ vaut $1$, et $\exp(a) \neq 0$ (toujours strictement positif, chapitre 2), donc on peut diviser les deux membres par $\exp(a)$ :

$$\exp(-a) = \frac{1}{\exp(a)}$$

**Propriété (puissance entière).** Pour tout réel $a$ et tout entier naturel $n$ : $\exp(na) = \big(\exp(a)\big)^n$.

**Pourquoi (par récurrence, même méthode qu'au chapitre précédent pour $\ln(a^n)=n\ln(a)$) :** suppose $\exp(na) = (\exp(a))^n$ (hypothèse de récurrence). Applique la propriété du produit à $na$ et $a$ :

$$\exp\big((n+1)a\big) = \exp(na + a) = \exp(na) \times \exp(a)$$

En remplaçant $\exp(na)$ par $(\exp(a))^n$ (hypothèse de récurrence) :

$$\exp\big((n+1)a\big) = \big(\exp(a)\big)^n \times \exp(a) = \big(\exp(a)\big)^{n+1}$$

La formule passe donc du rang $n$ au rang $n+1$ ; elle est vraie pour $n=0$ (les deux membres valent $1$), donc elle est vraie pour tout entier naturel $n$. Pour les entiers négatifs, la propriété de l'opposé l'étend directement : $\exp(-na) = \dfrac{1}{\exp(na)} = \dfrac{1}{(\exp(a))^n} = (\exp(a))^{-n}$, ce qui est bien la formule avec un exposant négatif.

### D'où vient la notation $e^x$

Tu sais déjà donner un sens à $e^n$ pour $n$ entier : c'est de l'arithmétique ordinaire sur le nombre réel $e \approx 2{,}718$ (multiplier $e$ par lui-même $n$ fois, ou son inverse pour $n$ négatif) — rien de nouveau ici.

Applique la propriété de la puissance qu'on vient d'établir, avec $a=1$ : pour tout entier $n$, $\exp(n \times 1) = (\exp(1))^n$, c'est-à-dire, puisque $\exp(1) = e$ (chapitre 2) :

$$\exp(n) = e^n \quad \text{pour tout entier } n$$

**C'est cette coïncidence qui justifie tout ce qui suit :** le comportement de $\exp$ sur les entiers est exactement celui de la puissance ordinaire de $e$. On **convient** alors d'étendre la notation puissance à tous les réels, pas seulement aux entiers, en posant, pour tout réel $x$ :

$$e^x := \exp(x)$$

À partir de maintenant, on écrit $e^x$ plutôt que $\exp(x)$ — c'est la même fonction, seule la notation change. Les trois propriétés qu'on vient d'établir se relisent ainsi, sous une forme que tu reconnais déjà comme les règles des puissances :

$$e^{a+b} = e^a \times e^b \qquad\qquad e^{-a} = \frac{1}{e^a} \qquad\qquad \big(e^a\big)^n = e^{na} \quad (n \in \mathbb{Z})$$

### Exemple travaillé

Sachant que $e \approx 2{,}718$, exprime $e^{3}\times e^{-5}$ et $(e^2)^3$ sous la forme $e^{k}$ pour un entier $k$, sans calculer de valeur numérique.

**Ce qu'on cherche et pourquoi ce geste :** reconnaître directement quelle règle s'applique — produit d'exponentielles, ou puissance d'une exponentielle — avant de vouloir « calculer » quoi que ce soit numériquement.

$$e^3 \times e^{-5} = e^{3+(-5)} = e^{-2}$$

$$\big(e^2\big)^3 = e^{2 \times 3} = e^{6}$$

### L'erreur classique à écarter

Une confusion très fréquente, symétrique de celle vue avec $\ln$ : croire que $e^{a+b} = e^a + e^b$ (garder l'addition au lieu de la transformer en produit). Teste ce modèle avec $a=b=0$ : $e^{0+0} = e^0 = 1$, alors que $e^0+e^0 = 1+1=2$. Les deux ne coïncident pas — l'addition à l'intérieur de $e^{\cdot}$ devient bien un **produit** à l'extérieur, jamais une somme.

[[checkpoint:cp-r2-somme-produit]]

---

## R3 — Dérivée de exp : $(e^x)' = e^x$

### Établir la formule

On admet ici que $\exp$ est dérivable sur $\mathbb{R}$ — c'est une conséquence du théorème général de la dérivée d'une fonction réciproque (la réciproque d'une fonction dérivable dont la dérivée ne s'annule jamais est elle-même dérivable), qu'on ne démontre pas dans ce chapitre.

Ce qu'on peut établir directement, en revanche, c'est la **valeur** de cette dérivée — et pour ça, on repart de l'identité fondamentale du chapitre 2, valable pour tout réel $x$ :

$$\ln(e^x) = x$$

**Ce qu'on cherche et pourquoi ce geste :** les deux membres de cette égalité sont des fonctions de $x$ égales pour tout $x$ — donc leurs dérivées sont égales aussi. On dérive les deux côtés, en utilisant à gauche la règle $(\ln u)' = \dfrac{u'}{u}$ du chapitre précédent (chapitre 4), avec $u(x) = e^x$.

$$\big(\ln(e^x)\big)' = \frac{(e^x)'}{e^x} \qquad \text{et} \qquad (x)' = 1$$

Comme les deux membres de départ sont égaux pour tout $x$, leurs dérivées le sont aussi :

$$\frac{(e^x)'}{e^x} = 1$$

En multipliant les deux côtés par $e^x$ (toujours non nul, chapitre 2) :

$$(e^x)' = e^x$$

**La fonction exponentielle est sa propre dérivée.** C'est une propriété unique parmi les fonctions usuelles du programme : aucune autre n'est égale à sa propre dérivée.

### La dérivée de $e^{u}$

Comme pour $\ln$, on compose souvent l'exponentielle avec une autre fonction. La règle de dérivation des fonctions composées ($x \mapsto f(u(x))$ a pour dérivée $u'(x)\times f'(u(x))$), appliquée à $f = \exp$ dont on vient de montrer $f'=f$, donne :

**Propriété.** Si $u$ est une fonction dérivable sur un intervalle $I$, alors $e^{u}$ est dérivable sur $I$ et :

$$\big(e^{u}\big)'(x) = u'(x)\, e^{u(x)}$$

Contrairement à $\ln(u)$, il n'y a **aucune condition de signe** à vérifier sur $u$ ici : $e^u$ est définie et dérivable dès que $u$ l'est, quel que soit le signe de $u(x)$ — c'est une différence de domaine importante avec $\ln$, à garder en tête.

**Exemple travaillé 1.** Dérive $f(x) = e^{2x+1}$, définie et dérivable sur $\mathbb{R}$.

**Ce qu'on cherche et pourquoi ce geste :** ici $u(x) = 2x+1$, donc $u'(x)=2$. On applique directement la formule, sans condition de domaine à poser (contrairement à un $\ln$).

$$f'(x) = u'(x)\, e^{u(x)} = 2e^{2x+1}$$

**Exemple travaillé 2.** Dérive $g(x) = e^{-x^2}$.

**Ce qu'on cherche et pourquoi ce geste :** $u(x) = -x^2$, donc $u'(x) = -2x$. Le signe de $g'$ va se lire directement sur le signe de $u'$, puisque $e^{u(x)}$ est toujours strictement positif.

$$g'(x) = -2x\, e^{-x^2}$$

Comme $e^{-x^2}>0$ toujours, le signe de $g'(x)$ est celui de $-2x$ : $g'(x)>0$ pour $x<0$, $g'(x)<0$ pour $x>0$. $g$ est donc strictement croissante sur $]-\infty,0]$ puis strictement décroissante sur $[0,+\infty[$.

[[checkpoint:cp-r3-derivee-eu]]

---

## R4 — Limites de référence et croissances comparées

### Une inégalité qui va tout porter : $e^x \geq x+1$

On réutilise directement l'inégalité de référence établie au chapitre précédent (chapitre 5) : $\ln(t) \leq t-1$ pour tout $t>0$.

**Ce qu'on cherche et pourquoi ce geste :** cette inégalité porte sur $\ln$ ; on veut la même chose pour $\exp$. Le geste : substituer $t = e^x$ (toujours strictement positif, donc l'inégalité s'applique bien), puis simplifier grâce à $\ln(e^x)=x$.

$$\ln(e^x) \leq e^x - 1$$

$$x \leq e^x - 1$$

$$e^x \geq x+1 \qquad \text{pour tout réel } x$$

C'est l'inégalité fondamentale sur laquelle repose tout ce chapitre.

### Limite en $+\infty$

D'après l'inégalité qu'on vient d'établir, $e^x \geq x+1$ pour tout $x$. Quand $x \to +\infty$, $x+1 \to +\infty$ ; comme $e^x$ est toujours au-dessus de $x+1$, $e^x$ est forcé de suivre :

$$\lim_{x \to +\infty} e^x = +\infty$$

### Limite en $-\infty$

Utilise la propriété de l'opposé (chapitre 3) : $e^x = \dfrac{1}{e^{-x}}$. Pose $X = -x$ : quand $x \to -\infty$, $X \to +\infty$, donc $e^X = e^{-x} \to +\infty$ (ce qu'on vient de montrer). Un rapport dont le dénominateur explose vers $+\infty$ tend vers $0$ :

$$\lim_{x \to -\infty} e^x = \lim_{X \to +\infty} \frac{1}{e^X} = 0$$

Graphiquement : la courbe de $\exp$ admet l'**asymptote horizontale** $y=0$ en $-\infty$ (jamais atteinte, puisque $e^x>0$ toujours).

### Croissances comparées : $e^x$ contre $x$

Voici un fait moins intuitif : $e^x$ ne se contente pas de tendre vers $+\infty$, il **écrase** $x$ dans cette course :

$$\lim_{x \to +\infty} \frac{e^x}{x} = +\infty$$

**Étape 1.** Applique l'inégalité $e^t \geq t+1$ au réel $t = \dfrac{x}{2}$, pour $x>0$ :

$$e^{x/2} \geq \frac{x}{2}+1 > \frac{x}{2}$$

**Étape 2.** Les deux membres sont strictement positifs pour $x>0$ ; élève au carré (ce qui préserve l'inégalité entre deux quantités positives) :

$$e^{x} > \frac{x^2}{4}$$

**Étape 3.** Divise par $x>0$ :

$$\frac{e^x}{x} > \frac{x}{4}$$

Quand $x \to +\infty$, $\dfrac{x}{4} \to +\infty$ ; comme $\dfrac{e^x}{x}$ est toujours au-dessus, elle est forcée de suivre :

$$\lim_{x \to +\infty} \frac{e^x}{x} = +\infty$$

Ce résultat porte, comme pour $\ln$, le nom de **croissances comparées** — mais dans le sens opposé : $\ln(x)$ grossissait infiniment plus lentement que $x$ (chapitre précédent, chapitre 5) ; ici, $e^x$ grossit infiniment plus vite que $x$.

**Corollaire utile.**

$$\lim_{x \to -\infty} x\, e^x = 0$$

**Pourquoi :** pose $X=-x$ (donc $x \to -\infty \iff X \to +\infty$) :

$$x\,e^x = -X \times e^{-X} = -X \times \frac{1}{e^X} = -\frac{X}{e^X}$$

Or $\dfrac{e^X}{X} \to +\infty$ quand $X\to+\infty$ (ce qu'on vient d'établir), donc son inverse $\dfrac{X}{e^X} \to 0$ :

$$\lim_{x \to -\infty} x\,e^x = -0 = 0$$

### Exemple travaillé

Calcule $\displaystyle\lim_{x \to +\infty} \big(e^x - x\big)$.

**Ce qu'on cherche et pourquoi ce geste :** $e^x \to +\infty$ et $x \to +\infty$, donc c'est une forme indéterminée $+\infty - \infty$ (chapitre « Limites et continuité ») — le réflexe est de factoriser par le terme qui « gagne », ici $e^x$, et de reconnaître ensuite une croissance comparée.

$$e^x - x = e^x\left(1 - \frac{x}{e^x}\right)$$

Or $\dfrac{x}{e^x} = \dfrac{1}{e^x/x}$, et $\dfrac{e^x}{x}\to+\infty$, donc $\dfrac{x}{e^x} \to 0$. Le facteur entre parenthèses tend donc vers $1$, et $e^x \to +\infty$ :

$$\lim_{x \to +\infty} e^x\left(1-\frac{x}{e^x}\right) = +\infty$$

$$\lim_{x \to +\infty} \big(e^x - x\big) = +\infty$$

[[figure:exp-au-dessus-de-x-plus-1]]

[[checkpoint:cp-r4-croissances]]

[[checkpoint:cp-r4-asymptote]]

---

## R5 — Étude complète et courbe

### Tableau de variations

Rassemble ce qu'on sait : $\exp$ est définie sur $\mathbb{R}$ (chapitre 2), $(e^x)' = e^x > 0$ pour tout $x$ (chapitre 4) donc $\exp$ est strictement croissante sur $\mathbb{R}$ tout entier, avec $\displaystyle\lim_{x\to-\infty} e^x = 0$ et $\displaystyle\lim_{x\to+\infty} e^x = +\infty$ (chapitre 5). Le tableau de variations tient donc en une seule ligne strictement croissante, de $0$ (exclu) à $+\infty$, avec le passage remarquable $e^0=1$.

### Tangente en 0, et convexité

La tangente à la courbe de $\exp$ au point d'abscisse $0$ a pour coefficient directeur $(e^0)'=e^0=1$, et passe par $(0, e^0)=(0,1)$. Son équation :

$$y = e^0 + (e^0)(x-0)$$

$$y = 1+x$$

Reconnais cette droite : c'est exactement l'inégalité $e^x \geq x+1$ établie au chapitre 5 ! Ce n'est pas une coïncidence. La dérivée seconde $(e^x)'' = (e^x)' = e^x$ est strictement positive pour tout $x$ — donc $\exp$ est **convexe** sur tout son domaine, ce qui signifie précisément que sa courbe reste **au-dessus de chacune de ses tangentes**. L'inégalité du chapitre 5 est la traduction algébrique de cette convexité, lue à travers la tangente la plus commode, celle en $x=0$ — exactement comme la concavité de $\ln$ donnait l'inégalité $\ln(x)\leq x-1$ à travers sa tangente en $x=1$.

### Symétrie avec la courbe de ln

$\exp$ et $\ln$ sont réciproques l'une de l'autre (chapitre 2). Un fait général sur les fonctions réciproques, qu'on admet ici : leurs courbes sont **symétriques par rapport à la droite d'équation $y=x$**. Concrètement : le point $(1,0)$ de la courbe de $\ln$ (puisque $\ln(1)=0$) a pour symétrique le point $(0,1)$ sur la courbe de $\exp$ (puisque $e^0=1$) ; le point $(e,1)$ de $\ln$ a pour symétrique $(1,e)$ sur $\exp$ (puisque $e^1=e$). Chaque propriété de $\ln$ se lit donc « en miroir » chez $\exp$ : là où $\ln$ a une asymptote verticale ($x=0$), $\exp$ a une asymptote horizontale ($y=0$) ; là où $\ln$ grossit infiniment lentement, $\exp$ grossit infiniment vite.

### L'allure de la courbe

En rassemblant tout : la courbe de $\exp$ part de très près de $0$ (asymptote horizontale $y=0$) quand $x\to-\infty$, sans jamais toucher l'axe, traverse l'axe des ordonnées en $(0,1)$, passe par $(1,e)$, et monte ensuite de plus en plus vite vers la droite, sans jamais s'aplatir — au contraire de $\ln$, elle **accélère** indéfiniment, puisque $\dfrac{e^x}{x}\to+\infty$ (chapitre 5).

[[figure:courbe-exponentielle]]

[[checkpoint:cp-r5-lecture-courbe]]

---

## R6 — Primitives de exp

### La primitive la plus simple qui soit

Puisque $(e^x)' = e^x$ (chapitre 4), la fonction $\exp$ est **sa propre primitive** — à une constante additive près, comme toujours :

**Propriété.** Les primitives de $x \mapsto e^x$ sur $\mathbb{R}$ sont les fonctions $x \mapsto e^x + C$, où $C$ est une constante réelle.

Aucune autre fonction usuelle du programme n'a cette propriété : d'habitude, primitiver « descend » d'un cran (la primitive de $x^n$ fait apparaître $x^{n+1}$) ; ici, primitiver $e^x$ **redonne exactement $e^x$**.

### La primitive de $u'e^u$

De la règle de dérivation $(e^u)' = u'e^u$ (chapitre 4), lue à l'envers, découle directement :

**Propriété.** Si $u$ est dérivable sur un intervalle $I$, alors les primitives de $x \mapsto u'(x)e^{u(x)}$ sur $I$ sont les fonctions $x \mapsto e^{u(x)} + C$.

Le réflexe, comme toujours pour reconnaître une forme $u'e^u$ : identifier d'abord $u$, calculer $u'$, et vérifier que c'est bien ce facteur-là qui multiplie $e^{u}$ dans l'expression — pas un autre facteur.

**Exemple travaillé.** Détermine une primitive de $f(x) = 2x\,e^{x^2}$ sur $\mathbb{R}$.

**Ce qu'on cherche et pourquoi ce geste :** reconnaître la forme $u'e^u$ avant de vouloir intégrer terme à terme. Ici, l'exposant est $x^2$ : pose $u(x) = x^2$, donc $u'(x) = 2x$ — exactement le facteur qui multiplie $e^{x^2}$ dans $f$.

$$f(x) = u'(x)\,e^{u(x)} \quad \text{avec } u(x)=x^2,\ u'(x)=2x$$

Les primitives de $f$ sur $\mathbb{R}$ sont donc :

$$F(x) = e^{x^2} + C$$

**Point de vigilance :** si le facteur devant $e^{u}$ n'est pas exactement $u'$, la reconnaissance directe ne s'applique pas telle quelle. Par exemple, pour une primitive de $x\,e^{x^2}$ (sans le facteur $2$), on écrit $x\,e^{x^2} = \frac12 \times \big(2x\,e^{x^2}\big)$ pour faire apparaître exactement $u'e^u$ à l'intérieur — les primitives deviennent alors $\frac12 e^{x^2}+C$.

---

## R7 — Équations et inéquations avec exp

### La méthode : l'injectivité, sans condition de domaine à poser

$\exp$ étant strictement croissante, donc injective, sur $\mathbb{R}$ tout entier (chapitres 2 et 6) — et surtout, définie sur $\mathbb{R}$ **sans aucune restriction de domaine** — pour tous réels $A$ et $B$ :

$$e^{A} = e^{B} \iff A = B \qquad\qquad e^{A} \leq e^{B} \iff A \leq B$$

**Différence importante avec $\ln$ :** il n'y a **aucune condition de positivité à vérifier** avant d'appliquer ces équivalences — $e^A$ et $e^B$ sont automatiquement strictement positifs, quel que soit le réel $A$ ou $B$. C'est plus simple qu'avec $\ln$, où il fallait toujours commencer par poser le domaine.

**Exemple travaillé 1 (équation par injectivité directe).** Résous dans $\mathbb{R}$ : $e^{2x-1} = e^{x+3}$.

**Ce qu'on cherche et pourquoi ce geste :** les deux membres sont déjà écrits comme des exponentielles — pas besoin de domaine, juste appliquer l'injectivité pour comparer les exposants.

$$e^{2x-1} = e^{x+3} \iff 2x-1 = x+3$$

$$\iff x = 4$$

$$\mathcal{S} = \{4\}$$

**Exemple travaillé 2 (équation qui demande de passer par ln).** Résous dans $\mathbb{R}$ : $e^{x} = 5$.

**Ce qu'on cherche et pourquoi ce geste :** cette fois, le membre de droite n'est pas écrit sous la forme $e^{\cdot}$ — il faut d'abord le réécrire ainsi. Puisque $5>0$, $5$ est bien dans l'image de $\exp$ (donc une solution existe), et l'outil pour l'écrire $e^{\cdot}$, c'est $\ln$ : par l'identité fondamentale de réciprocité (chapitre 2), $5 = e^{\ln(5)}$.

$$e^x = 5 \iff e^x = e^{\ln(5)}$$

$$\iff x = \ln(5) \qquad (\text{injectivité de } \exp)$$

$$\mathcal{S} = \{\ln(5)\}$$

**Remarque de méthode :** de façon générale, $e^x = k$ (avec $k>0$) équivaut directement à $x=\ln(k)$ — c'est une autre façon de lire l'identité fondamentale du chapitre 2. Si $k \leq 0$, l'équation $e^x=k$ n'a **aucune** solution, puisque $e^x>0$ toujours : ce cas ne demande aucun calcul, juste la remarque que $e^x$ ne peut jamais atteindre une valeur négative ou nulle.

**Exemple travaillé 3 (inéquation).** Résous dans $\mathbb{R}$ : $e^{3x-2} < e^{-x+6}$.

**Ce qu'on cherche et pourquoi ce geste :** même réflexe qu'à l'exemple 1, mais avec le sens de l'inégalité conservé car $\exp$ est strictement croissante.

$$e^{3x-2} < e^{-x+6} \iff 3x-2 < -x+6 \quad (\exp \text{ strictement croissante})$$

$$\iff 4x < 8$$

$$\iff x < 2$$

$$\mathcal{S} = \,]-\infty, 2[$$

Il n'y a ici aucune intersection avec un domaine à effectuer — contrairement à $\ln$ (chapitre précédent, chapitre 7), $\exp$ ne restreint jamais l'ensemble des solutions par une condition de signe : la réponse ci-dessus est finale, telle quelle.

---

## R8 — Pour t'entraîner

Place maintenant tout le chapitre au service d'un vrai problème d'examen. Le premier ci-dessous est un **sujet national tombé au bac** (session normale 2022) : une étude de fonction complète — limites, asymptote, dérivée, variations, concavité, fonction réciproque et suite. Le second est une **variation inédite**, construite exprès sur la même machinerie mais avec un décor renversé, pour que tu reconnaisses les gestes au lieu de mémoriser un corrigé.

Dans les deux cas, la consigne est la même : **cherche d'abord, seul, avant de dérouler le raisonnement.** C'est en butant puis en te reprenant que la méthode s'installe.

### Ce que ces exercices empruntent à d'autres chapitres

Un sujet de bac ne s'arrête pas aux frontières d'une leçon. Les problèmes ci-dessous, comme la plupart des annales de ce chapitre, mobilisent des outils que **cette leçon n'enseigne pas** — ils sont établis ailleurs, et c'est là qu'il faut aller les chercher si l'un d'eux te manque. Les voici nommés, pour que tu ne croies pas les avoir oubliés :

- **Le point d'inflexion** (l'endroit où la courbe change de concavité, repéré par un changement de signe de $f''$). Il est construit dans « **Dérivabilité et étude des fonctions** », qui lui consacre un chapitre entier et un checkpoint. Cette leçon-ci n'établit la convexité de $\exp$ qu'au chapitre 6, comme un fait, sans donner le critère général.
- **L'intégration par parties**, dès qu'un sujet demande une primitive ou une aire du type $\int x\,e^{-x}\,dx$. Elle vit dans « **Calcul intégral** ». Le chapitre 7 d'ici ne donne que les deux primitives immédiates, $e^x$ et $u'e^u$ — utiles, mais insuffisantes dès qu'un facteur polynomial s'invite.
- **Le théorème de la limite monotone** (une suite décroissante et minorée converge), quand le volet « suites » d'un problème arrive. Il est dans « **Suites numériques** ».
- **Le théorème de la bijection** et **la dérivée de la réciproque**, $\left(f^{-1}\right)'(y) = \dfrac{1}{f'\!\left(f^{-1}(y)\right)}$ — c'est ce que demandent les deux problèmes ci-dessous, et cette leçon n'admet que l'*existence* d'une réciproque dérivable (chapitre 4), jamais le critère ni la formule. Les deux vivent dans « **Dérivabilité et étude des fonctions** ».

Aucun de ces trois n'est un manque de ce chapitre : ce sont des outils transversaux, et un problème d'analyse en assemble toujours plusieurs. Savoir **d'où vient** chaque geste est la moitié du travail de révision.

### Exercice de type bac — session normale 2022

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

[[exercise:r-variation]]
<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts pour la
     relecture pédagogique, non résolus par cet auteur :
     (1) skill_code proposé ici : `maths_fonction_exponentielle` (même
     convention "<subject>_<short>" que `maths_fonction_logarithme`,
     déjà utilisée dans le corpus). À confirmer contre une éventuelle
     convention de préfixe par filière avant intégration en base.
     (2) Ordre de progression supposé, en continuité directe avec
     `content/maths/fonction-logarithme/lesson.md` (dont la note de
     validation anticipait déjà ce chapitre juste après) : exp est
     introduite ICI comme réciproque de ln (pas via une équation
     différentielle y'=y, y(0)=1, autre voie d'introduction possible
     dans certains manuels). C'est ce choix qui permet de dériver
     e^x'=e^x à partir de l'identité ln(e^x)=x plutôt que d'un théorème
     d'existence-unicité d'équation différentielle, hors-programme
     2 Bac SM tel qu'identifié pour ce chapitre.
     (3) Le théorème "la réciproque d'une bijection dérivable de dérivée
     jamais nulle est dérivable" est admis sans démonstration (R3), de
     même que "la réciproque d'une bijection strictement croissante est
     strictement croissante" et "les courbes de deux réciproques sont
     symétriques par rapport à y=x" (R1, R5) — trois faits généraux
     utilisés mais non démontrés ici, cohérent avec le traitement "on
     admet" déjà utilisé dans la leçon ln pour l'existence de primitive.
     (4) Le programme marocain 2 Bac SM nomme-t-il explicitement "e^u"
     avec u dérivable quelconque (sans condition de signe), ou introduit-
     il d'abord des cas particuliers (e^{ax+b}, e^{-x}, etc.) avant la
     règle générale ? Cette leçon présente directement la règle générale
     (R3) par cohérence avec le traitement de (ln u)' dans le chapitre
     précédent — à confirmer contre la progression réelle des manuels.
-->
