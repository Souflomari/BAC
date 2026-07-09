# Fonction logarithme

---

## R0 — Accroche : transformer une multiplication en addition

Essaie, de tête ou à la main, de calculer $12\,345 \times 98\,765$. Pas facile, pas rapide, et une seule erreur de retenue suffit à tout fausser.

Pourtant, entre le début du XVIIe siècle et l'arrivée des calculatrices électroniques (dans les années 1970), ingénieurs, astronomes et financiers effectuaient ce genre de calcul en quelques secondes à peine. Pas en devinant, ni en calculant plus vite que toi — en changeant complètement d'opération grâce à un objet qu'on appelait une **table de logarithmes** (plus tard remplacée par la règle à calcul). Le principe : à chaque nombre positif, la table associe un autre nombre, son "logarithme", de sorte que le **produit** des deux nombres de départ se retrouve, comme par magie, transformé en **somme** des deux logarithmes lus dans la table. Additionner deux nombres lus dans un tableau est infiniment plus rapide que poser une multiplication à la main — et c'est exactement ce qui permettait ce calcul en quelques secondes.

Avant de lire la suite, prends position : imagine qu'une fonction $L$ ait vraiment cette propriété — transformer tout produit en somme, c'est-à-dire $L(a\times b) = L(a) + L(b)$ pour tous réels $a,b>0$. D'après toi, que doit valoir $L(1)$ ? Et que devient $L(a \div b)$, une fois qu'on sait ce que fait $L$ sur un produit ?

Cette fonction "magique" existe réellement, et elle porte un nom que tu as sans doute déjà croisé : le **logarithme népérien**, noté $\ln$. Le but de cette leçon est de comprendre d'où elle vient — ce n'est pas une fonction inventée par hasard pour cette seule propriété —, comment elle se construit à partir d'un outil que tu maîtrises déjà (la primitive), et comment elle se manipule : dérivée, limites, équations. À la fin, tu sauras exactement pourquoi $\ln(1)=0$ et pourquoi $\ln(a/b) = \ln(a)-\ln(b)$, et tu sauras le démontrer — pas seulement le croire sur parole.

---

## R1 — La fonction ln : définition, signe et monotonie

### Pourquoi il faut une fonction entièrement nouvelle

Tu sais déjà dériver toutes les fonctions puissances : $(x^n)' = nx^{n-1}$. Cherche un instant, parmi les fonctions que tu connais, laquelle a pour dérivée exactement $\dfrac1x = x^{-1}$ sur $]0,+\infty[$. Si tu essaies $x^n$, il faudrait $nx^{n-1} = x^{-1}$, donc $n-1=-1$, donc $n=0$ — mais la fonction constante $x^0=1$ a pour dérivée $0$, pas $\dfrac1x$. Aucune puissance de $x$ ne convient : il manque un morceau entier à ta boîte à outils, une fonction dont la dérivée soit précisément $\dfrac1x$.

### La définition

On admet le fait suivant, comme pour toute fonction continue sur un intervalle : la fonction $t \mapsto \dfrac1t$, continue sur $]0,+\infty[$, possède des primitives sur cet intervalle.

**Définition.** La fonction **logarithme népérien**, notée $\ln$, est l'unique primitive de $t \mapsto \dfrac1t$ sur $]0,+\infty[$ qui s'annule en $1$ :

$$\ln(1) = 0 \qquad \text{et} \qquad \ln'(x) = \frac1x \ \text{ pour tout } x>0$$

**Remarque de domaine, à ne jamais oublier :** $\ln$ n'est définie que sur $]0,+\infty[$. $\ln(0)$ et $\ln(-2)$ n'existent tout simplement pas — ce n'est pas une erreur à corriger, l'expression n'a pas de sens, exactement comme $\dfrac10$. Chaque fois qu'un $\ln$ apparaît dans un exercice, le premier réflexe est de vérifier que ce qui est à l'intérieur est strictement positif.

### Une image concrète : l'aire sous la courbe de $1/t$

Comme $\ln$ est une primitive de $1/t$, elle a une interprétation géométrique directe : pour $x>1$, $\ln(x)$ est l'aire sous la courbe de $t \mapsto 1/t$, entre les abscisses $1$ et $x$. Pour $0<x<1$, cette même aire existe encore (entre $x$ et $1$ cette fois), mais $\ln(x)$ en vaut l'opposé — c'est précisément pour ça que $\ln(x)$ est négatif sur $]0,1[$.

[[figure:ln-aire-sous-courbe]]

### Signe et sens de variation

$\ln'(x) = \dfrac1x$, et $\dfrac1x>0$ pour tout $x>0$. Une dérivée strictement positive sur tout l'intervalle signifie que $\ln$ est **strictement croissante sur $]0,+\infty[$**.

Comme $\ln$ est strictement croissante et que $\ln(1)=0$, le signe de $\ln(x)$ se lit directement par comparaison à $1$ — pas par un nouveau calcul :

- $0 < x < 1 \implies \ln(x) < 0$
- $x = 1 \implies \ln(x) = 0$
- $x > 1 \implies \ln(x) > 0$

**Exemple travaillé.** Résous dans $]0,+\infty[$ l'inéquation $\ln(x) \geq 0$.

**Ce qu'on cherche et pourquoi ce geste :** on vient d'établir que le signe de $\ln$ se lit par comparaison à $1$ ; c'est ce réflexe qu'on active ici plutôt que de chercher un calcul supplémentaire.

$$\ln(x) \geq 0 \iff \ln(x) \geq \ln(1)$$

$$\iff x \geq 1 \quad (\ln \text{ strictement croissante})$$

L'ensemble des solutions est $[1,+\infty[$.

---

## R2 — Propriétés algébriques : comment le produit devient une somme

### Le résultat central, et pourquoi il est vrai

Reprenons la question du R0 : pourquoi $\ln(a\times b) = \ln(a)+\ln(b)$ ?

Fixe un réel $a>0$, et considère la fonction $\varphi$ définie sur $]0,+\infty[$ par $\varphi(x) = \ln(ax)$.

**Ce qu'on cherche et pourquoi ce geste :** pour comparer $\varphi$ à $\ln$, l'outil le plus direct est de comparer leurs dérivées — tu sais déjà que si deux fonctions ont la même dérivée sur un intervalle, leur différence a une dérivée nulle, donc est constante. Dérivons $\varphi$ avec la règle de dérivation d'une composée $x \mapsto \ln(u(x))$, où $u(x)=ax$ donc $u'(x)=a$ :

$$\varphi'(x) = u'(x) \times \frac{1}{u(x)} = a \times \frac{1}{ax}$$

$$\varphi'(x) = \frac1x$$

Donc $\varphi'(x) = \ln'(x)$ pour tout $x>0$ : $\varphi$ et $\ln$ ont la même dérivée sur $]0,+\infty[$, donc elles diffèrent d'une constante $C$ :

$$\varphi(x) = \ln(x) + C \quad \text{pour tout } x>0$$

Pour trouver $C$, évalue en $x=1$, le seul point où tout est déjà connu : $\varphi(1) = \ln(a\times 1) = \ln(a)$, et $\ln(1)+C = C$. Donc $C=\ln(a)$, et :

$$\ln(ax) = \ln(x) + \ln(a) \quad \text{pour tout } x>0$$

En particulier, pour $x=b>0$ quelconque :

**Propriété (produit).** Pour tous réels $a>0$ et $b>0$ :

$$\ln(ab) = \ln(a) + \ln(b)$$

Le geste à retenir n'est pas la formule seule : c'est la méthode — deux fonctions qui ont la même dérivée sur un intervalle sont égales à une constante près, et cette constante se trouve en évaluant en un point pratique ($x=1$, où $\ln$ vaut $0$).

### Ce que ça entraîne : inverse, quotient, puissance, racine

**Propriété (inverse).** Pour tout $a>0$ : $\ln\left(\dfrac1a\right) = -\ln(a)$.

**Pourquoi :** applique la propriété du produit à $a$ et $\dfrac1a$, dont le produit vaut $1$ :

$$\ln\left(a \times \frac1a\right) = \ln(a) + \ln\left(\frac1a\right)$$

Le membre de gauche vaut $\ln(1)=0$, donc :

$$\ln(a) + \ln\left(\frac1a\right) = 0$$

D'où :

$$\ln\left(\frac1a\right) = -\ln(a)$$

**Propriété (quotient).** Pour tous $a>0$ et $b>0$ : $\ln\left(\dfrac{a}{b}\right) = \ln(a) - \ln(b)$.

**Pourquoi :** $\dfrac{a}{b} = a \times \dfrac1b$, donc par la propriété du produit puis celle de l'inverse :

$$\ln\left(\frac{a}{b}\right) = \ln(a) + \ln\left(\frac1b\right)$$

$$\ln\left(\frac{a}{b}\right) = \ln(a) - \ln(b)$$

**Propriété (puissance entière).** Pour tout $a>0$ et tout entier $n$ : $\ln(a^n) = n\ln(a)$.

**Pourquoi (pour $n$ entier naturel, par récurrence) :** suppose que $\ln(a^n) = n\ln(a)$ (hypothèse de récurrence). Applique la propriété du produit à $a^n$ et $a$ :

$$\ln(a^{n+1}) = \ln(a^n \times a)$$

$$\ln(a^{n+1}) = \ln(a^n) + \ln(a)$$

En remplaçant $\ln(a^n)$ par $n\ln(a)$ (hypothèse de récurrence) :

$$\ln(a^{n+1}) = n\ln(a) + \ln(a)$$

$$\ln(a^{n+1}) = (n+1)\ln(a)$$

La formule passe donc du rang $n$ au rang $n+1$ ; comme elle est vraie pour $n=0$ (les deux membres valent $0$), elle est vraie pour tout entier naturel. Pour les entiers négatifs, la propriété de l'inverse l'étend directement : $\ln(a^{-n}) = \ln\left(\dfrac{1}{a^n}\right) = -\ln(a^n) = -n\ln(a)$, ce qui est bien la formule avec un exposant négatif.

**Propriété (racine carrée).** Pour tout $a>0$ : $\ln(\sqrt{a}) = \dfrac12\ln(a)$.

**Pourquoi :** $(\sqrt a)^2 = a$, donc en appliquant la propriété de la puissance ($n=2$) au nombre $\sqrt a$ :

$$\ln\big((\sqrt{a})^2\big) = 2\ln(\sqrt{a})$$

Or $(\sqrt a)^2 = a$, donc le membre de gauche vaut aussi $\ln(a)$ :

$$2\ln(\sqrt{a}) = \ln(a)$$

D'où :

$$\ln(\sqrt{a}) = \frac12\ln(a)$$

### Exemple travaillé

Sachant que $\ln(2) \approx 0{,}693$, exprime $\ln(32)$ et $\ln(0{,}5)$ à partir de $\ln(2)$, sans calculatrice.

**Ce qu'on cherche et pourquoi ce geste :** $32$ et $0{,}5$ ne sont pas des nombres au hasard ici — $32=2^5$ et $0{,}5 = \dfrac12$. Le réflexe : reconnaître la structure (puissance de $2$, ou inverse de $2$) avant de calculer quoi que ce soit.

$$\ln(32) = \ln(2^5) = 5\ln(2)$$

soit environ $5 \times 0{,}693 = 3{,}465$.

$$\ln(0{,}5) = \ln\left(\frac12\right) = -\ln(2)$$

soit environ $-0{,}693$.

---

## R3 — Dérivée de ln et de ln(u) ; étudier les variations d'une fonction avec un logarithme

### La règle de dérivation d'une composée avec ln

Tu as déjà utilisé, sans le nommer, un outil du chapitre "Dérivation" : pour une composée $x \mapsto f(u(x))$, la dérivée vaut $u'(x) \times f'(u(x))$. Applique ce résultat à $f=\ln$, dont on sait que $f'(t) = \dfrac1t$ :

**Propriété.** Si $u$ est une fonction dérivable et strictement positive sur un intervalle $I$, alors $\ln(u)$ est dérivable sur $I$ et :

$$(\ln u)'(x) = \frac{u'(x)}{u(x)}$$

C'est exactement le calcul que tu as fait au R2 pour prouver $\ln(ax)=\ln(x)+\ln(a)$ — seulement, cette fois, on le nomme et on le garde comme outil à part entière : chaque fois qu'un logarithme apparaît dans une fonction à dériver, la dérivée est "dérivée de l'intérieur, divisée par l'intérieur".

**Rappel de vigilance :** cette formule n'a de sens que là où $u(x)>0$ — donc avant de dériver, vérifie toujours le domaine.

**Exemple travaillé 1.** Dérive $f(x) = \ln(x^2+1)$, définie sur $\mathbb{R}$ (car $x^2+1>0$ pour tout $x$, sans condition à vérifier).

**Ce qu'on cherche et pourquoi ce geste :** ici $u(x)=x^2+1$, donc $u'(x)=2x$. On applique directement la formule.

$$f'(x) = \frac{u'(x)}{u(x)} = \frac{2x}{x^2+1}$$

Le signe de $f'(x)$ est celui de $2x$ (car $x^2+1>0$ toujours) : $f'(x)<0$ pour $x<0$, $f'(x)>0$ pour $x>0$. Donc $f$ est strictement décroissante sur $]-\infty,0]$ puis strictement croissante sur $[0,+\infty[$.

**Exemple travaillé 2.** Dérive $g(x) = \ln(3x-2)$, dont il faut d'abord préciser le domaine.

**Ce qu'on cherche et pourquoi ce geste :** avant même de dériver, il faut l'intérieur strictement positif : $3x-2>0 \iff x>\dfrac23$. Le domaine de $g$ est donc $\left]\dfrac23,+\infty\right[$, pas $\mathbb{R}$ tout entier comme dans l'exemple précédent.

Sur ce domaine, avec $u(x)=3x-2$ et $u'(x)=3$ :

$$g'(x) = \frac{3}{3x-2}$$

Comme $3x-2>0$ sur tout le domaine de $g$, $g'(x)>0$ partout : $g$ est strictement croissante sur $\left]\dfrac23,+\infty\right[$.

---

## R4 — Limites de référence, et pourquoi ln x grossit lentement

### Aux bornes du domaine : +∞ et 0⁺

**En $+\infty$.** Comme $2>1$ et que $\ln$ est strictement croissante avec $\ln(1)=0$ (R1), $\ln(2)>0$. Utilise la propriété de la puissance (R2) : pour tout entier naturel $n$, $\ln(2^n) = n\ln(2)$. Comme $\ln(2)>0$, ce produit grossit indéfiniment quand $n$ grossit :

$$\lim_{n \to +\infty} n\ln(2) = +\infty$$

Or $\ln$ est strictement croissante (R1) : pour tout $x \geq 2^n$, $\ln(x) \geq \ln(2^n) = n\ln(2)$. Donc, quel que soit le seuil qu'on se fixe, il suffit de prendre $n$ assez grand (donc $x=2^n$ assez grand) pour que $\ln(x)$ dépasse ce seuil. C'est exactement la définition de :

$$\lim_{x \to +\infty} \ln(x) = +\infty$$

**En $0^+$.** Pose $X=\dfrac1x$ : quand $x \to 0^+$, $X \to +\infty$. Par la propriété de l'inverse (R2), $\ln(x) = \ln\left(\dfrac1X\right) = -\ln(X)$. Comme $\ln(X) \to +\infty$ (ce qu'on vient de montrer), $-\ln(X) \to -\infty$ :

$$\lim_{x \to 0^{+}} \ln(x) = -\infty$$

Graphiquement, ce résultat donne une **asymptote verticale** d'équation $x=0$.

### Croissances comparées : ln x contre x

Voici un fait moins intuitif : même si $\ln(x) \to +\infty$, $\ln(x)$ grossit infiniment plus lentement que $x$ lui-même — au point que leur rapport tend vers $0$ :

$$\lim_{x \to +\infty} \frac{\ln(x)}{x} = 0$$

**Étape 1 — une inégalité de référence.** Considère la fonction auxiliaire $\varphi(t) = t-1-\ln(t)$ sur $]0,+\infty[$.

**Ce qu'on cherche et pourquoi ce geste :** pour montrer que $\ln(t) \leq t-1$ pour tout $t>0$, on étudie le signe de leur différence $\varphi$ — la méthode standard pour prouver une inégalité entre deux expressions.

$$\varphi'(t) = 1 - \frac1t = \frac{t-1}{t}$$

$\varphi'(t)$ a le signe de $t-1$ (car $t>0$) : négatif sur $]0,1[$, positif sur $]1,+\infty[$, nul en $t=1$. $\varphi$ est donc strictement décroissante sur $]0,1]$ puis strictement croissante sur $[1,+\infty[$ : elle admet un **minimum global** en $t=1$, qui vaut $\varphi(1) = 1-1-\ln(1) = 0$.

Donc $\varphi(t) \geq 0$ pour tout $t>0$, c'est-à-dire :

$$\ln(t) \leq t-1 \quad \text{pour tout } t>0$$

**Étape 2 — appliquer l'inégalité à $\sqrt x$.** Pour $x>0$, instancie l'inégalité en $t=\sqrt x$ :

$$\ln(\sqrt{x}) \leq \sqrt{x} - 1$$

Or $\ln(\sqrt x) = \dfrac12\ln(x)$ (propriété racine carrée, R2), donc :

$$\frac12\ln(x) \leq \sqrt{x} - 1$$

En multipliant par $2$ :

$$\ln(x) \leq 2\sqrt{x} - 2$$

Et puisque $2\sqrt{x}-2 < 2\sqrt{x}$ :

$$\ln(x) < 2\sqrt{x} \quad \text{pour tout } x>0$$

**Étape 3 — diviser par $x$ et encadrer.** Pour $x>1$ (donc $x>0$ et $\ln(x)>0$), divise l'inégalité précédente par $x>0$ :

$$0 < \frac{\ln(x)}{x} < \frac{2\sqrt{x}}{x}$$

Or $\dfrac{2\sqrt x}{x} = \dfrac{2}{\sqrt x}$, donc :

$$0 < \frac{\ln(x)}{x} < \frac{2}{\sqrt{x}}$$

Quand $x \to +\infty$, $\dfrac{2}{\sqrt x} \to 0$ (limite de référence sur les puissances). Le rapport $\dfrac{\ln(x)}{x}$ est donc coincé entre $0$ et une quantité qui tend vers $0$ : par le théorème des gendarmes,

$$\lim_{x \to +\infty} \frac{\ln(x)}{x} = 0$$

Ce résultat porte le nom de **croissances comparées** : dans la course vers $+\infty$, $x$ écrase $\ln(x)$.

[[figure:croissances-comparees-ln]]

**Corollaire utile.**

$$\lim_{x \to 0^{+}} x\ln(x) = 0$$

**Pourquoi :** pose à nouveau $X=\dfrac1x$ (donc $x \to 0^+ \iff X \to +\infty$) :

$$x\ln(x) = \frac1X\ln\left(\frac1X\right) = \frac1X \times \big(-\ln(X)\big) = -\frac{\ln(X)}{X}$$

Quand $X \to +\infty$, $\dfrac{\ln(X)}{X} \to 0$ (croissances comparées, juste établi), donc :

$$\lim_{x \to 0^{+}} x\ln(x) = 0$$

### Exemple travaillé

Calcule $\displaystyle\lim_{x \to +\infty} \big(\ln(x) - x\big)$.

**Ce qu'on cherche et pourquoi ce geste :** $\ln(x) \to +\infty$ et $x \to +\infty$, donc la différence est une forme indéterminée $+\infty-\infty$ (chapitre "Limites et continuité") — le réflexe est de factoriser le terme qui "gagne", ici $x$, et c'est justement le résultat de croissances comparées qui va permettre de conclure.

$$\ln(x) - x = x\left(\frac{\ln(x)}{x} - 1\right)$$

Quand $x \to +\infty$, $\dfrac{\ln(x)}{x} \to 0$ (croissances comparées), donc le facteur entre parenthèses tend vers $-1$, et $x \to +\infty$ :

$$\lim_{x \to +\infty} x\left(\frac{\ln(x)}{x}-1\right) = -\infty$$

$$\lim_{x \to +\infty} \big(\ln(x)-x\big) = -\infty$$

---

## R5 — Étude complète, la courbe de ln, et le nombre e

### Tableau de variations

Rassemble ce qu'on sait : $\ln$ est définie sur $]0,+\infty[$ (R1), $\ln'(x)=\dfrac1x>0$ pour tout $x>0$ donc $\ln$ est strictement croissante sur tout son domaine (R1), $\displaystyle\lim_{x \to 0^{+}} \ln(x) = -\infty$ et $\displaystyle\lim_{x \to +\infty} \ln(x) = +\infty$ (R4). Le tableau de variations tient donc en une seule ligne strictement croissante, de $-\infty$ à $+\infty$, avec le passage remarquable $\ln(1)=0$.

### ln réalise une bijection de ]0,+∞[ sur ℝ

$\ln$ est dérivable donc continue, et strictement croissante sur $]0,+\infty[$, avec pour limites $-\infty$ et $+\infty$ aux deux bornes. Par le corollaire du théorème des valeurs intermédiaires (existence et unicité, vu au chapitre "Limites et continuité") : **pour tout réel $k$, l'équation $\ln(x)=k$ admet une unique solution $x \in\, ]0,+\infty[$.** Autrement dit, $\ln$ réalise une **bijection** de $]0,+\infty[$ vers $\mathbb{R}$ tout entier — aucun réel $k$ n'est "manqué", et chacun n'est atteint qu'une seule fois.

### Le nombre e

Applique ce résultat au cas particulier $k=1$ : il existe un unique réel strictement positif dont le logarithme vaut $1$.

**Définition.** $e$ est l'unique réel tel que $\ln(e)=1$. On a $e \approx 2{,}718$.

Grâce à la propriété de la puissance (R2), $\ln(e^n) = n\ln(e)$ pour tout entier $n$. Comme $\ln(e)=1$ par définition :

$$\ln(e^n) = n$$

Ce fait servira dès le prochain rung pour résoudre des équations numériques.

**Exemple travaillé.** Résous dans $]0,+\infty[$ l'équation $\ln(x) = 1$.

**Ce qu'on cherche et pourquoi ce geste :** c'est exactement le cas particulier $k=1$ de la bijection qu'on vient d'établir — la solution n'est autre que le nombre $e$ défini pour cette occasion précise.

Comme $\ln$ réalise une bijection de $]0,+\infty[$ sur $\mathbb{R}$, l'équation $\ln(x)=1$ a une unique solution, et par définition de $e$, cette solution est $x=e$.

### Tangente en 1, et concavité

La tangente à la courbe de $\ln$ au point d'abscisse $1$ a pour coefficient directeur $\ln'(1)=1$, et passe par $(1,\ln(1))=(1,0)$. Son équation :

$$y = \ln(1) + \ln'(1)(x-1)$$

$$y = x - 1$$

Regarde ce que ça donne : l'équation de cette tangente est exactement l'inégalité $\ln(x) \leq x-1$ démontrée au R4 ! Ce n'est pas une coïncidence : $\ln''(x)$ (la dérivée de $\ln'(x)=\dfrac1x$) vaut $-\dfrac{1}{x^2}$, strictement négative pour tout $x>0$ — donc $\ln$ est **concave** sur tout son domaine, ce qui signifie précisément que sa courbe reste **en dessous de chacune de ses tangentes**. L'inégalité du R4 n'était donc pas un calcul isolé : c'est la traduction algébrique de la concavité de $\ln$, vue à travers sa tangente la plus commode, celle en $x=1$.

### L'allure de la courbe

En rassemblant tout : la courbe de $\ln$ part de $-\infty$ près de l'asymptote verticale $x=0$, traverse l'axe des abscisses en $(1,0)$, passe par $(e,1)$, et continue de monter indéfiniment vers la droite — mais de plus en plus lentement, puisque $\dfrac{\ln(x)}{x} \to 0$ (R4) : la courbe s'aplatit progressivement, sans jamais redescendre ni se stabiliser sur une horizontale.

[[figure:courbe-logarithme]]

---

## R6 — Équations, inéquations avec ln, et le logarithme décimal

### La méthode : domaine d'abord, injectivité ensuite

$\ln$ étant strictement croissante, donc injective, sur $]0,+\infty[$ (R1, R5), pour tous réels $A>0$ et $B>0$ :

$$\ln(A) = \ln(B) \iff A=B \qquad\qquad \ln(A) \leq \ln(B) \iff A \leq B$$

Mais ces équivalences ne sont valables **qu'à l'intérieur du domaine** — c'est-à-dire seulement si $A>0$ et $B>0$ sont déjà vérifiés. **Le réflexe non négociable : déterminer le domaine avant de simplifier quoi que ce soit, et ne garder à la fin que les solutions compatibles avec ce domaine.** Oublier cette étape est l'erreur la plus fréquente sur ce type d'exercice — elle peut faire "gagner" des solutions qui n'en sont pas.

**Exemple travaillé 1 (équation).** Résous dans $\mathbb{R}$ : $\ln(x+1) + \ln(x-2) = \ln(2x)$.

**Ce qu'on cherche et pourquoi ce geste :** trois logarithmes, trois conditions de domaine à poser d'abord, séparément, avant de toucher à l'équation elle-même.

Domaine : il faut $x+1>0$ (soit $x>-1$), $x-2>0$ (soit $x>2$), et $2x>0$ (soit $x>0$). Les trois conditions à la fois donnent $x>2$.

Sur ce domaine, regroupe le membre de gauche avec la propriété du produit (R2) :

$$\ln(x+1) + \ln(x-2) = \ln\big((x+1)(x-2)\big)$$

L'équation devient $\ln\big((x+1)(x-2)\big) = \ln(2x)$, donc, par injectivité (les deux membres sont positifs sur le domaine retenu) :

$$(x+1)(x-2) = 2x$$

$$x^2 - x - 2 = 2x$$

$$x^2 - 3x - 2 = 0$$

Discriminant : $\Delta = 9+8=17$. Les racines : $x = \dfrac{3-\sqrt{17}}{2}$ ou $x=\dfrac{3+\sqrt{17}}{2}$.

Reste à confronter au domaine $x>2$ : $\dfrac{3-\sqrt{17}}{2} \approx -0{,}56$, qui n'est PAS dans le domaine — cette racine, pourtant mathématiquement correcte pour l'équation polynomiale, doit être **rejetée**. Et $\dfrac{3+\sqrt{17}}{2} \approx 3{,}56$, qui est bien $>2$ : cette racine est conservée.

$$\mathcal{S} = \left\{\frac{3+\sqrt{17}}{2}\right\}$$

**Exemple travaillé 2 (équation numérique).** Résous dans $\mathbb{R}$ : $\ln(x) + \ln(2) = 0$.

**Ce qu'on cherche et pourquoi ce geste :** le membre de droite, $0$, n'est pas encore écrit sous la forme "$\ln$ de quelque chose" — on le réécrit ainsi ($0=\ln(1)$) pour pouvoir appliquer l'injectivité, comme dans l'exemple précédent.

Domaine : $x>0$ (et $\ln(2)$ est toujours défini). Regroupe le membre de gauche :

$$\ln(x) + \ln(2) = \ln(2x)$$

L'équation devient $\ln(2x) = 0 = \ln(1)$, donc par injectivité $2x=1$, soit $x=\dfrac12$ — compatible avec le domaine $x>0$.

$$\mathcal{S} = \left\{\frac12\right\}$$

**Exemple travaillé 3 (inéquation).** Résous dans $\mathbb{R}$ : $\ln(2x-1) < \ln(x+3)$.

**Ce qu'on cherche et pourquoi ce geste :** même réflexe — domaine des deux côtés d'abord, puis équivalence par stricte croissance de $\ln$ (elle conserve l'ordre), puis intersection avec le domaine.

Domaine : $2x-1>0$ (soit $x>\dfrac12$) et $x+3>0$ (soit $x>-3$). Les deux à la fois : $x>\dfrac12$.

Sur ce domaine, par stricte croissance de $\ln$ :

$$\ln(2x-1) < \ln(x+3) \iff 2x-1 < x+3$$

$$\iff x < 4$$

Intersection avec le domaine $x>\dfrac12$ :

$$\mathcal{S} = \left]\frac12, 4\right[$$

### Le logarithme décimal

Pour des grandeurs qui varient sur plusieurs ordres de grandeur, il est pratique d'avoir un logarithme qui vaut exactement $1$ en $x=10$ plutôt qu'en $x=e$. On définit :

**Définition.** Pour tout $x>0$, le **logarithme décimal** de $x$ est $\log(x) = \dfrac{\ln(x)}{\ln(10)}$.

**Pourquoi il garde toutes les propriétés de ln :** $\log$ n'est rien d'autre que $\ln$ multipliée par la constante $\dfrac{1}{\ln(10)}$. Diviser une égalité par une même constante non nulle préserve l'égalité — donc toutes les propriétés du R2 se retrouvent telles quelles : $\log(ab) = \log(a)+\log(b)$, $\log(a^n) = n\log(a)$, etc.

Par construction, $\log(10) = \dfrac{\ln(10)}{\ln(10)} = 1$, et plus généralement, pour tout entier $n$ :

$$\log(10^n) = \frac{\ln(10^n)}{\ln(10)} = \frac{n\ln(10)}{\ln(10)}$$

$$\log(10^n) = n$$

C'est cette propriété qui rend $\log$ pratique : $\log(x)$ donne directement "l'ordre de grandeur" de $x$ en puissances de $10$ (par exemple $\log(1000)=3$, $\log(0{,}01)=-2$) — un usage qu'on retrouve, entre autres, dans les échelles d'acidité, d'intensité sonore ou de magnitude sismique.

---

## R7 — Pour t'entraîner

Voici un exercice de type bac, **original** (ce n'est pas un sujet officiel — un exercice d'entraînement construit pour cette leçon), qui combine plusieurs outils du chapitre avec le théorème des valeurs intermédiaires vu au chapitre "Limites et continuité".

### Exercice travaillé

Soit $f$ la fonction définie sur $]0,+\infty[$ par $f(x) = x-2+\ln(x)$.

**1.** Calcule $\displaystyle\lim_{x \to 0^{+}} f(x)$ et $\displaystyle\lim_{x \to +\infty} f(x)$.

**2.** Calcule $f'(x)$ et détermine son signe sur $]0,+\infty[$. Dresse le tableau de variations de $f$.

**3.** Montre que l'équation $f(x)=0$ admet une unique solution $\alpha$ dans $]0,+\infty[$, puis que $1<\alpha<2$.

**4.** Déduis le signe de $f(x)$ sur $]0,+\infty[$.

**Raisonnement à voix haute.**

**1.** Quand $x \to 0^{+}$ : $x-2 \to -2$ (fini) et $\ln(x) \to -\infty$ (R4), donc la somme tend vers $-\infty$ :

$$\lim_{x \to 0^{+}} f(x) = -\infty$$

Quand $x \to +\infty$ : $x-2 \to +\infty$ et $\ln(x) \to +\infty$ (R4), donc la somme tend vers $+\infty$ (pas de forme indéterminée ici : $+\infty$ plus $+\infty$ donne $+\infty$) :

$$\lim_{x \to +\infty} f(x) = +\infty$$

**2.** $f$ est une somme d'une fonction affine et de $\ln$ :

$$f'(x) = 1+\frac1x = \frac{x+1}{x}$$

Sur $]0,+\infty[$, $x>0$ donc $x+1>0$ : $f'(x)>0$ partout. $f$ est donc **strictement croissante** sur $]0,+\infty[$, de $-\infty$ (en $0^+$) à $+\infty$ (en $+\infty$).

**3.** **Ce qu'on cherche et pourquoi ce geste :** "$f(x)=0$ admet une unique solution" est le signal caractéristique du corollaire d'existence et d'unicité du TVI — il faut réunir continuité, changement de signe, et stricte monotonie, exactement comme dans le chapitre "Limites et continuité".

$f$ est continue (dérivable) et strictement croissante sur $]0,+\infty[$, avec $\displaystyle\lim_{x\to 0^+} f(x) = -\infty <0$ et $\displaystyle\lim_{x\to+\infty} f(x) = +\infty>0$. Par le corollaire du TVI, l'équation $f(x)=0$ admet une **unique** solution $\alpha \in\, ]0,+\infty[$.

Pour l'encadrer, évalue $f$ en $1$ et en $2$ :

$$f(1) = 1-2+\ln(1) = -1+0 = -1 < 0$$

$$f(2) = 2-2+\ln(2) = \ln(2) \approx 0{,}693 > 0$$

$f$ étant strictement croissante, $f(1)<0<f(2)$ place $\alpha$ strictement entre $1$ et $2$ : $1<\alpha<2$.

**4.** $f$ est strictement croissante sur $]0,+\infty[$ et s'annule uniquement en $\alpha$ : donc $f(x)<0$ pour $x<\alpha$, et $f(x)>0$ pour $x>\alpha$ — la stricte monotonie transforme le passage par $0$ en $\alpha$ en une frontière nette entre les deux signes.

### À toi de jouer

**(a)** Résous dans $\mathbb{R}$ l'équation $\ln(3x-1) = \ln(x+5)$.

**(b)** Résous dans $\mathbb{R}$ l'inéquation $\ln(2x+1) \leq \ln(4-x)$.

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts pour la
     relecture pédagogique, non résolus par cet auteur :
     (1) skill_code proposé ici : `maths_fonction_logarithme` (même
     convention "<subject>_<short>" que `maths_limites_continuite`, déjà
     utilisée dans le corpus). Même incertitude que sur cette leçon
     précédente : à confirmer contre une éventuelle convention de préfixe
     par filière avant intégration en base.
     (2) Ordre de progression supposé : ln est défini ICI comme primitive
     de 1/x s'annulant en 1 (pas comme réciproque de exp), en anticipant
     que le chapitre "Fonction exponentielle" vient APRÈS ce chapitre dans
     la progression marocaine standard (ordre observé dans la plupart des
     manuels 2 Bac SM). C'est pour cette raison que le R6 résout les
     équations numériques ("ln(x)=1", etc.) en revenant à des ln déjà
     connus (ln(e^n)=n) plutôt qu'en écrivant "x = e^k" pour un k réel
     quelconque — cette dernière notation appartient au chapitre suivant
     (fonction exponentielle, réciproque de ln) et n'est pas utilisée ici
     pour éviter toute dépendance circulaire. À confirmer que cet ordre de
     chapitres correspond à la progression réelle du produit.
     (3) Le R7 (exercice de synthèse) réutilise explicitement le corollaire
     du théorème des valeurs intermédiaires du chapitre "Limites et
     continuité" (dont `content/maths/limites-continuite/lesson.md` existe
     déjà dans le corpus) — dépendance inter-chapitres assumée et
     cohérente avec cette leçon existante, mais à confirmer si l'ordre
     réel des notions dans le produit place bien "Limites et continuité"
     avant "Fonction logarithme".
     (4) L'existence d'une primitive de t->1/t sur ]0,+infty[ est admise
     (formulation "on admet") plutôt que déduite d'un théorème général
     "toute fonction continue sur un intervalle admet des primitives" —
     choix délibéré car ce théorème général, dans la progression
     marocaine standard, est situé au chapitre "Primitives", qui vient
     APRÈS ce chapitre. À confirmer que cette dépendance est bien gérée
     ainsi dans le produit (ou si le théorème général est en fait
     disponible plus tôt).
-->
