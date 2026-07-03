# Limites et continuité

---

## R0 — Accroche : la fonction qui semble ne pas exister

Regarde cette fonction :

$$f(x) = \frac{x^2-1}{x-1}$$

Essaie de calculer $f(1)$.

Tu tombes sur $\frac{1^2-1}{1-1} = \frac{0}{0}$. Ça n'a pas de sens : $f$ n'est tout simplement pas définie en $1$. Le point $x=1$ est un trou dans le domaine de $f$.

Mais voici la question intéressante : **que fait $f$ tout près de $1$, même si elle n'existe pas exactement en $1$ ?**

Avant de lire la suite, prends position : d'après toi, quand $x$ se rapproche de plus en plus de $1$, est-ce que $f(x)$ se rapproche d'un nombre précis, ou est-ce que ça part n'importe où, de façon imprévisible ?

Voici ce que donne une calculatrice quand on prend des valeurs de $x$ de plus en plus proches de $1$, par la gauche et par la droite :

| $x$ | $0{,}9$ | $0{,}99$ | $0{,}999$ | $\to 1 \leftarrow$ | $1{,}001$ | $1{,}01$ | $1{,}1$ |
|---|---|---|---|---|---|---|---|
| $f(x)$ | $1{,}9$ | $1{,}99$ | $1{,}999$ | $?$ | $2{,}001$ | $2{,}01$ | $2{,}1$ |

Regarde la deuxième ligne : $1{,}9$, puis $1{,}99$, puis $1{,}999$... et de l'autre côté $2{,}1$, puis $2{,}01$, puis $2{,}001$. Les deux colonnes se resserrent, chacune de son côté, vers le même nombre : $2$.

Autrement dit, même si $f(1)$ n'existe pas, $f$ se comporte comme si elle valait $2$ en $1$. Ce nombre "fantôme" a un nom : c'est la **limite** de $f$ en $1$. On note ça $\lim_{x \to 1} f(x) = 2$.

Pourquoi ce resserrement se produit-il exactement à $2$, et comment le prouver sans construire un tableau de valeurs à chaque fois ? C'est tout l'objet de cette leçon. On va construire, étape par étape, les outils qui permettent de calculer une limite proprement — et à la fin de la troisième étape, on reviendra sur cette fonction précise et on prouvera que $2$ est bien la bonne valeur, sans tableau ni calculatrice.

---

## R1 — Limite d'une fonction : se rapprocher, en un point ou à l'infini

### Le sens intuitif, avant la notation

Dire que $f(x)$ tend vers $L$ quand $x$ tend vers $a$, ça veut dire : **on peut rendre $f(x)$ aussi proche qu'on veut de $L$, à condition de prendre $x$ suffisamment proche de $a$.** C'est tout. Pas de piège, pas de formalisme caché — juste l'idée de rapprochement, appliquée à une fonction plutôt qu'à une suite de nombres.

Prenons un cas simple, sans surprise : $f(x) = 2x+1$, et on regarde ce qui se passe quand $x$ tend vers $3$. Quand $x$ vaut $2{,}9$ puis $2{,}99$ puis $2{,}999$ (on approche $3$ par valeurs inférieures), $f(x)$ vaut $6{,}8$ puis $6{,}98$ puis $6{,}998$. Quand $x$ vaut $3{,}1$ puis $3{,}01$ puis $3{,}001$ (on approche par valeurs supérieures), $f(x)$ vaut $7{,}2$ puis $7{,}02$ puis $7{,}002$. Des deux côtés, $f(x)$ se resserre vers $7$ — qui est justement $f(3)$. On note :

$$\lim_{x \to 3} (2x+1) = 7$$

Ici, rien de spécial : $f$ n'a pas de trou en $3$, donc la limite est simplement la valeur de $f$ en ce point. Ce cas confortable (aucune opération suspecte, pas de division par $0$) porte un nom : on dit qu'on peut calculer la limite **par substitution directe**. C'est toujours la première chose à essayer.

### Limite à gauche, limite à droite — et la condition d'existence

Le tableau du R0 montrait deux directions d'approche : par valeurs inférieures à $1$ (par la gauche) et par valeurs supérieures à $1$ (par la droite). C'est un point important : pour qu'une limite existe **en un point**, il faut que ces deux approches donnent le **même** nombre.

- La **limite à gauche** de $f$ en $a$, notée $\lim_{x \to a^{-}} f(x)$, regarde ce qui se passe quand $x$ approche $a$ par valeurs inférieures.
- La **limite à droite**, notée $\lim_{x \to a^{+}} f(x)$, regarde l'approche par valeurs supérieures.

**La règle : $\lim_{x \to a} f(x)$ existe si et seulement si les deux limites latérales existent et sont égales.** Si elles diffèrent, la fonction n'a tout simplement pas de limite en $a$ — ce n'est pas une erreur de calcul, c'est un fait sur la fonction.

**Exemple travaillé.** Soit $f$ définie par

$$f(x) = \begin{cases} x + 1 & \text{si } x < 1 \\ x^2 & \text{si } x \geq 1 \end{cases}$$

Que peut-on dire de $\lim_{x \to 1} f(x)$ ?

**Ce qu'on cherche et pourquoi ce geste :** dès qu'une fonction est définie par deux formules différentes de part et d'autre d'un point, le réflexe est automatique — on ne peut *jamais* supposer que la limite existe sans vérifier séparément les deux côtés, parce que rien ne garantit que les deux formules "se raccordent" au point de jonction.

Limite à gauche (on utilise la formule $x<1$, donc $x+1$) :
$$\lim_{x \to 1^{-}} f(x) = \lim_{x \to 1^{-}} (x+1) = 2$$

Limite à droite (on utilise la formule $x \geq 1$, donc $x^2$) :
$$\lim_{x \to 1^{+}} f(x) = \lim_{x \to 1^{+}} x^2 = 1$$

$2 \neq 1$. Les deux limites latérales sont différentes, donc **$\lim_{x \to 1} f(x)$ n'existe pas**. Ce n'est pas grave que $f(1) = 1^2 = 1$ soit parfaitement défini — la limite, elle, ne l'est pas. On reviendra sur cet exemple précis dans la leçon, parce qu'il va aussi nous servir à comprendre la continuité.

### Quand la limite explose : la limite infinie en un point

Il existe un deuxième type de comportement en un point : au lieu de se resserrer vers un nombre, $f(x)$ peut grossir indéfiniment.

Prends $f(x) = \dfrac{1}{(x-2)^2}$. Que se passe-t-il quand $x$ se rapproche de $2$ ?

Quand $x=2{,}1$ : $(x-2)^2 = 0{,}01$, donc $f(x) = 100$. Quand $x = 2{,}01$ : $(x-2)^2 = 0{,}0001$, donc $f(x) = 10\,000$. Même chose par la gauche : à $x=1{,}9$, on a encore $(x-2)^2 = 0{,}01$, donc $f(x)=100$.

Plus $x$ se rapproche de $2$, plus le dénominateur $(x-2)^2$ devient minuscule (mais reste positif, puisqu'il est au carré), et diviser $1$ par un nombre de plus en plus petit donne un résultat de plus en plus grand. On note :

$$\lim_{x \to 2} \frac{1}{(x-2)^2} = +\infty$$

Graphiquement, ça correspond à une **asymptote verticale** d'équation $x=2$ : la courbe de $f$ colle de plus en plus près de cette droite verticale sans jamais la toucher, en montant indéfiniment des deux côtés.

### Ce qui se passe "au loin" : la limite à l'infini

Jusqu'ici, $x$ se rapprochait d'un point précis. On peut aussi se demander ce qui se passe quand $x$ devient très grand (on note $x \to +\infty$) ou très négatif ($x \to -\infty$) — c'est-à-dire quand $x$ "s'en va à l'infini" plutôt que de se rapprocher d'un point fixe.

**Limites de référence à connaître** (elles servent de brique de base à tout le reste du chapitre) :

$$\lim_{x \to +\infty} x^n = +\infty \quad (n \geq 1) \qquad \qquad \lim_{x \to +\infty} \frac{1}{x^n} = 0 \quad (n \geq 1)$$

$$\lim_{x \to -\infty} x^n = \begin{cases} +\infty & \text{si } n \text{ pair} \\ -\infty & \text{si } n \text{ impair} \end{cases}$$

La dernière ligne mérite un mot d'explication : un carré, une puissance quatrième, etc., sont toujours positifs, donc même si $x$ part vers $-\infty$, $x^n$ (avec $n$ pair) part vers $+\infty$. Une puissance impaire, elle, garde le signe de $x$ : $x \to -\infty$ donne $x^n \to -\infty$.

**Et quand $f(x)$ tend vers un nombre fini à l'infini ?** Prends $f(x) = \dfrac{2x+1}{x} = 2 + \dfrac{1}{x}$. Quand $x=10$, $f(x) = 2{,}1$. Quand $x=100$, $f(x)=2{,}01$. Quand $x=1000$, $f(x)=2{,}001$. La fonction se resserre vers $2$ :

$$\lim_{x \to +\infty} \frac{2x+1}{x} = 2$$

Ici aussi, il y a une image graphique : quand $\lim_{x \to +\infty} f(x) = L$ (un nombre fini), la courbe de $f$ se rapproche indéfiniment de la droite horizontale $y=L$ — une **asymptote horizontale**.

---

## R2 — Opérations sur les limites : ce qui marche, ce qui coince

### La règle générale : les opérations respectent le rapprochement

Si $f(x)$ se rapproche de $L$ et $g(x)$ se rapproche de $L'$ quand $x \to a$, il est naturel que $f(x) + g(x)$ se rapproche de $L + L'$ : additionner deux quantités qui sont "presque $L$" et "presque $L'$" donne quelque chose de "presque $L+L'$". Le même raisonnement s'applique au produit et, avec une précaution, au quotient. C'est le mécanisme derrière toutes les règles ci-dessous — **tant que $L$ et $L'$ sont des nombres finis**, les opérations sur les limites se comportent exactement comme les opérations sur les nombres eux-mêmes.

Les choses se compliquent quand $L$ ou $L'$ vaut $+\infty$ ou $-\infty$. Voici les tableaux de référence.

**Somme de limites :**

| $\lim f$ | $\lim g$ | $\lim (f+g)$ |
|---|---|---|
| $L$ | $L'$ | $L+L'$ |
| $L$ | $+\infty$ | $+\infty$ |
| $L$ | $-\infty$ | $-\infty$ |
| $+\infty$ | $+\infty$ | $+\infty$ |
| $-\infty$ | $-\infty$ | $-\infty$ |
| $+\infty$ | $-\infty$ | **forme indéterminée** |

**Produit de limites :**

| $\lim f$ | $\lim g$ | $\lim (f \times g)$ |
|---|---|---|
| $L \neq 0$ | $L'$ | $L \times L'$ |
| $L > 0$ | $+\infty$ | $+\infty$ |
| $L < 0$ | $+\infty$ | $-\infty$ |
| $+\infty$ | $+\infty$ | $+\infty$ |
| $+\infty$ | $-\infty$ | $-\infty$ |
| $0$ | $+\infty$ ou $-\infty$ | **forme indéterminée** |

**Quotient de limites** (on suppose $g(x) \neq 0$ au voisinage de $a$, sauf peut-être en $a$) :

| $\lim f$ | $\lim g$ | $\lim (f/g)$ |
|---|---|---|
| $L$ | $L' \neq 0$ | $L/L'$ |
| $L$ | $\pm\infty$ | $0$ |
| $L \neq 0$ | $0$ | $\pm\infty$ (étudier le signe de $g$) |
| $\pm\infty$ | $L' \neq 0$ | $\pm\infty$ (selon les signes) |
| $0$ | $0$ | **forme indéterminée** |
| $\pm\infty$ | $\pm\infty$ | **forme indéterminée** |

Quatre cases sont marquées **forme indéterminée (FI)** : $+\infty - \infty$, $0 \times \infty$, $\frac{0}{0}$, $\frac{\infty}{\infty}$. Dans ces quatre cas précis, les règles générales ne suffisent pas — il faut retravailler l'expression avant de conclure. C'est l'objet du prochain rung.

### Pourquoi ces quatre cas sont vraiment "indéterminés"

"Indéterminé" ne veut pas dire "impossible à calculer" — ça veut dire que **la forme symbolique seule ne suffit pas à connaître la réponse**. Deux expressions qui ont exactement la même forme "$\infty - \infty$" peuvent avoir des limites totalement différentes. Regarde ces trois fonctions, toutes de la forme "$+\infty - \infty$" quand $x \to +\infty$ :

$$\lim_{x \to +\infty} (x^2 - x) = +\infty \qquad \text{(le terme } x^2 \text{ écrase } x\text{)}$$

$$\lim_{x \to +\infty} (x - x^2) = -\infty \qquad \text{(cette fois c'est } -x^2 \text{ qui écrase)}$$

$$\lim_{x \to +\infty} \big((x+5) - x\big) = 5 \qquad \text{(les deux termes s'annulent presque, il ne reste qu'une constante)}$$

Trois expressions, une seule forme apparente ("$\infty - \infty$"), et trois réponses différentes : $+\infty$, $-\infty$, et un nombre fini. C'est exactement ça, une forme indéterminée : le symbole ne code pas assez d'information pour trancher. Il faut regarder les fonctions *elles-mêmes*, pas juste l'étiquette "$\infty-\infty$" qu'on leur colle.

### Exemple travaillé : un cas où le dénominateur s'annule sans que ce soit une FI

Toutes les divisions par $0$ ne sont pas des formes indéterminées $\frac{0}{0}$. Regarde $f(x) = \dfrac{1}{x-2}$ (sans le carré, cette fois) quand $x \to 2$.

**Ce qu'on cherche et pourquoi ce geste :** le numérateur tend vers $1$ (pas vers $0$), donc ce n'est pas la forme $\frac{0}{0}$ du tableau — c'est le cas "$L \neq 0$ divisé par $0$", qui donne un résultat infini, **mais dont le signe dépend du signe du dénominateur**. Il faut donc revenir à l'étude par la gauche et par la droite du R1, exactement comme pour une limite en un point qui explose.

- Par la gauche ($x \to 2^{-}$) : $x-2$ tend vers $0$ en restant **négatif** (par exemple $x=1{,}9 \Rightarrow x-2 = -0{,}1$). Donc $\frac{1}{x-2} \to -\infty$.
- Par la droite ($x \to 2^{+}$) : $x-2$ tend vers $0$ en restant **positif**. Donc $\frac{1}{x-2} \to +\infty$.

$$\lim_{x \to 2^{-}} \frac{1}{x-2} = -\infty \qquad \qquad \lim_{x \to 2^{+}} \frac{1}{x-2} = +\infty$$

Les deux limites latérales ne sont pas seulement différentes — elles ne sont même pas du même signe. Il n'y a donc pas de limite globale en $2$, mais la courbe a bien une asymptote verticale d'équation $x=2$, avec un comportement opposé de chaque côté. **Le réflexe à retenir :** dès que tu obtiens "nombre non nul divisé par $0$", n'écris jamais juste "$\infty$" — étudie le signe du dénominateur de chaque côté avant de conclure.

---

## R3 — Lever une forme indéterminée : factorisation, conjugué, terme dominant

Une forme indéterminée n'est pas une impasse — c'est un signal qui dit "retravaille l'expression avant de prendre la limite". Il existe trois techniques principales au programme. Chacune répond à un type de situation précis.

### Technique 1 — La factorisation (formes $\frac{0}{0}$ avec des polynômes)

**Pourquoi ça marche :** si $f(x) = \frac{N(x)}{D(x)}$ donne $\frac{0}{0}$ en $x=a$, c'est que $N(a)=0$ **et** $D(a)=0$ — les deux ont donc $a$ comme racine commune, ce qui veut dire que $(x-a)$ est un facteur commun aux deux. Or, dans le calcul d'une limite, $x$ se rapproche de $a$ **sans jamais être égal à $a$** — donc $x - a \neq 0$ pendant tout le calcul, et on a parfaitement le droit de simplifier par ce facteur commun. C'est cette simplification qui fait disparaître la forme $\frac{0}{0}$.

**Résolvons enfin l'exemple du départ** : $\displaystyle\lim_{x \to 1} \frac{x^2-1}{x-1}$.

Le numérateur est une différence de carrés : $x^2 - 1 = (x-1)(x+1)$.

$$\frac{x^2-1}{x-1} = \frac{(x-1)(x+1)}{x-1}$$

Puisque $x \neq 1$ dans le calcul de la limite, on peut simplifier par $(x-1)$ :

$$\frac{(x-1)(x+1)}{x-1} = x+1$$

Il ne reste plus qu'à faire tendre $x$ vers $1$ dans cette expression simplifiée, qui elle n'a plus aucun problème :

$$\lim_{x \to 1} (x+1) = 2$$

**Le tableau du R0 avait raison** : les valeurs se resserraient bien vers $2$. Maintenant tu sais pourquoi, et tu peux le prouver sans calculatrice.

### Technique 2 — Le quotient conjugué (formes $\frac{0}{0}$ avec une racine carrée)

**Pourquoi ça marche :** une racine carrée résiste à la factorisation habituelle. Le tour consiste à multiplier haut et bas par la **quantité conjuguée** (même expression, signe changé devant la racine) — ce qui transforme la soustraction avec racine en une différence de carrés, qui elle se simplifie normalement, exactement comme dans $a^2-b^2=(a-b)(a+b)$ mais utilisée à l'envers.

**Exemple travaillé.** $\displaystyle\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x}$.

**Ce qu'on cherche et pourquoi ce geste :** en $x=0$, le numérateur vaut $\sqrt{1}-1=0$ et le dénominateur vaut $0$ — c'est une forme $\frac{0}{0}$, mais la factorisation habituelle ne marche pas à cause de la racine. Le réflexe : multiplier par le conjugué du numérateur, $\sqrt{x+1}+1$, **en haut et en bas** (sinon on change la valeur de l'expression).

$$\frac{\sqrt{x+1}-1}{x} = \frac{(\sqrt{x+1}-1)(\sqrt{x+1}+1)}{x(\sqrt{x+1}+1)}$$

Le numérateur devient une différence de carrés : $(\sqrt{x+1})^2 - 1^2 = (x+1)-1 = x$.

$$\frac{(\sqrt{x+1}-1)(\sqrt{x+1}+1)}{x(\sqrt{x+1}+1)} = \frac{x}{x(\sqrt{x+1}+1)}$$

Puisque $x \neq 0$ dans le calcul de la limite, on simplifie par $x$ :

$$\frac{x}{x(\sqrt{x+1}+1)} = \frac{1}{\sqrt{x+1}+1}$$

Cette expression n'a plus de forme indéterminée en $0$ : le dénominateur y vaut $\sqrt{1}+1=2 \neq 0$.

$$\lim_{x \to 0} \frac{1}{\sqrt{x+1}+1} = \frac{1}{2}$$

### Technique 3 — Le terme dominant (formes $\frac{\infty}{\infty}$ et $\infty-\infty$ à l'infini)

**Pourquoi ça marche :** quand $x$ devient très grand (ou très négatif), dans une somme de puissances de $x$, c'est le terme de plus haut degré qui "gagne la course" — les autres deviennent négligeables en comparaison. En factorisant ce terme dominant, on isole la partie qui pilote vraiment le comportement à l'infini, et le reste devient une fraction qui tend vers $0$.

**Exemple travaillé.** $\displaystyle\lim_{x \to +\infty} \frac{3x^2-5x+1}{2x^2+7}$.

**Ce qu'on cherche et pourquoi ce geste :** en remplaçant $x$ par "l'infini" formellement, numérateur et dénominateur tendent tous les deux vers $+\infty$ — c'est la forme $\frac{\infty}{\infty}$. Le réflexe : factoriser $x^2$ (le terme de plus haut degré) en haut ET en bas.

$$\frac{3x^2-5x+1}{2x^2+7} = \frac{x^2\left(3 - \dfrac{5}{x}+\dfrac{1}{x^2}\right)}{x^2\left(2+\dfrac{7}{x^2}\right)}$$

Puisque $x \neq 0$ quand $x \to +\infty$, on simplifie par $x^2$ :

$$\frac{x^2\left(3 - \dfrac{5}{x}+\dfrac{1}{x^2}\right)}{x^2\left(2+\dfrac{7}{x^2}\right)} = \frac{3 - \dfrac{5}{x}+\dfrac{1}{x^2}}{2+\dfrac{7}{x^2}}$$

Or $\dfrac{5}{x}$, $\dfrac{1}{x^2}$ et $\dfrac{7}{x^2}$ tendent tous vers $0$ quand $x \to +\infty$ (limites de référence du R1). Il ne reste que les constantes :

$$\lim_{x \to +\infty} \frac{3 - \dfrac{5}{x}+\dfrac{1}{x^2}}{2+\dfrac{7}{x^2}} = \frac{3}{2}$$

**Le raccourci à retenir pour les fonctions rationnelles à l'infini**, une fois qu'on a compris le mécanisme : on compare le degré du numérateur et du dénominateur. Si les degrés sont égaux, la limite est le rapport des coefficients dominants (ici $\frac{3}{2}$). Si le degré du numérateur est plus grand, la limite est infinie. Si le degré du numérateur est plus petit, la limite vaut $0$. Ce raccourci n'est qu'un résumé du calcul qu'on vient de faire — pas une nouvelle règle à mémoriser par cœur sans comprendre.

---

## R4 — Continuité en un point et sur un intervalle

### La définition, et pourquoi elle a trois parties

Une fonction $f$ est **continue en $a$** quand trois choses sont vraies **en même temps** :

1. $f(a)$ existe (le point $a$ est dans le domaine de $f$) ;
2. $\lim_{x \to a} f(x)$ existe ;
3. cette limite est **égale** à $f(a)$.

$$f \text{ continue en } a \iff \lim_{x \to a} f(x) = f(a)$$

Pourquoi trois conditions et pas une seule ? Parce que chacune peut échouer indépendamment des autres, et il faut les trois pour que la courbe n'ait "aucun accident" en $a$ : sans la 1, il n'y a même pas de point à ce niveau-là ; sans la 2, la courbe part dans deux directions incompatibles ; sans la 3, la courbe a une limite bien définie mais elle "saute" par-dessus la valeur réellement atteinte en $a$ (un trou avec un point isolé ailleurs). Intuitivement, sur un intervalle, une fonction continue est une fonction dont tu peux tracer la courbe **sans lever le crayon**.

**Reprenons l'exemple du R1** pour voir la définition en action côté "échec" : $f(x) = x+1$ si $x<1$, $f(x)=x^2$ si $x \geq 1$. On avait trouvé $\lim_{x \to 1^{-}} f(x) = 2$ et $\lim_{x \to 1^{+}} f(x) = 1$ : ces deux limites latérales diffèrent, donc $\lim_{x \to 1} f(x)$ **n'existe pas** — la condition 2 échoue. Résultat : $f$ n'est pas continue en $1$, même si $f(1)=1$ est parfaitement défini (condition 1 vérifiée). Une seule des trois conditions suffit à faire échouer la continuité.

**Exemple travaillé, côté "ça marche" cette fois.** Soit

$$g(x) = \begin{cases} x^2 - 1 & \text{si } x \leq 2 \\ 2x - 1 & \text{si } x > 2 \end{cases}$$

$g$ est-elle continue en $2$ ?

**Ce qu'on cherche et pourquoi ce geste :** au point de jonction d'une fonction définie par morceaux, il faut vérifier les trois quantités séparément — même quand elles "ont l'air" de devoir coïncider, ce n'est jamais automatique tant qu'on ne l'a pas vérifié.

- $g(2)$ : on utilise la branche $x \leq 2$, donc $g(2) = 2^2-1 = 3$.
- Limite à gauche : $\lim_{x \to 2^{-}} (x^2-1) = 2^2-1 = 3$.
- Limite à droite : $\lim_{x \to 2^{+}} (2x-1) = 2(2)-1 = 3$.

Les trois valeurs valent $3$. Les trois conditions sont réunies, donc **$g$ est continue en $2$**.

### Continuité sur un intervalle, et la boîte à outils des fonctions usuelles

$f$ est **continue sur un intervalle** $I$ quand elle est continue en chaque point de $I$. Recalculer une limite à chaque point serait épuisant — heureusement, le programme admet une boîte à outils de résultats qui couvrent presque tous les cas rencontrés au bac :

- toute fonction **polynôme** est continue sur $\mathbb{R}$ ;
- toute fonction **rationnelle** (quotient de polynômes) est continue sur son domaine de définition (partout où le dénominateur ne s'annule pas) ;
- la fonction **racine carrée** est continue sur $[0, +\infty[$ ;
- la **somme**, le **produit**, et le **quotient** (là où le dénominateur ne s'annule pas) de deux fonctions continues sont continus ;
- la **composée** de deux fonctions continues est continue.

Ces résultats permettent d'affirmer la continuité d'une fonction "d'un coup d'œil" dans l'immense majorité des cas du bac, sans repasser par la définition à trois conditions à chaque fois — cette dernière ne redevient nécessaire qu'aux points de jonction d'une fonction définie par morceaux, comme dans l'exemple ci-dessus.

---

## R5 — Le théorème des valeurs intermédiaires

### L'énoncé, et pourquoi il est vrai

**Théorème des valeurs intermédiaires (TVI).** Si $f$ est continue sur un intervalle $[a,b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe **au moins** un réel $c \in [a,b]$ tel que $f(c) = k$.

**Pourquoi c'est vrai, avec les mots du R4 :** une fonction continue sur $[a,b]$, c'est une courbe qu'on peut tracer d'un seul trait, sans lever le crayon, du point $(a, f(a))$ jusqu'au point $(b, f(b))$. Pour aller d'une hauteur $f(a)$ à une hauteur $f(b)$ sans jamais lever le crayon, le trait est bien obligé de traverser **toutes** les hauteurs intermédiaires au moins une fois — il ne peut pas "sauter" par-dessus une hauteur $k$ sans y passer, puisqu'il n'y a aucune coupure dans le tracé. C'est tout le théorème : il traduit en langage précis ce que "continu" veut dire graphiquement.

### Le corollaire le plus utilisé : l'existence d'une solution

Le cas particulier $k=0$ est de loin le plus utile en pratique :

**Corollaire (existence).** Si $f$ est continue sur $[a,b]$ et si $f(a)$ et $f(b)$ sont de signes contraires (c'est-à-dire $f(a) \times f(b) < 0$), alors l'équation $f(x) = 0$ admet **au moins** une solution dans $]a,b[$.

C'est exactement le TVI appliqué à $k=0$ : si $f(a)<0$ et $f(b)>0$ (ou l'inverse), alors $0$ est bien compris entre $f(a)$ et $f(b)$, donc le théorème garantit un $c$ avec $f(c)=0$.

**Attention à ce que ce corollaire ne dit pas :** il garantit l'**existence**, jamais l'**unicité**. Pour être sûr qu'il n'y a qu'une seule solution, il faut un ingrédient supplémentaire :

**Corollaire (existence et unicité).** Si, en plus d'être continue, $f$ est **strictement monotone** (strictement croissante ou strictement décroissante) sur $[a,b]$, alors la solution de $f(x)=k$ est **unique** dans $[a,b]$.

**Pourquoi l'unicité vient de la monotonie stricte :** une fonction strictement monotone ne repasse jamais deux fois par la même hauteur sur l'intervalle considéré — chaque hauteur n'est atteinte qu'une seule fois, au plus. Combiné au TVI qui garantit "au moins une fois", on obtient "exactement une fois".

**Exemple travaillé.** Montrer que l'équation $x^3+x-1=0$ admet une unique solution dans $[0,1]$.

**Ce qu'on cherche et pourquoi ce geste :** ce type d'énoncé est un signal qui annonce presque toujours "TVI + monotonie". On pose $g(x) = x^3+x-1$ et on vérifie les trois ingrédients dans l'ordre : continuité, signes opposés aux bornes, monotonie stricte.

- $g$ est un polynôme, donc continue sur $\mathbb{R}$, en particulier sur $[0,1]$.
- $g(0) = 0^3+0-1 = -1 < 0$ et $g(1) = 1^3+1-1 = 1 > 0$ : les signes sont opposés.
- $g$ est **strictement croissante** sur $\mathbb{R}$ : $x \mapsto x^3$ est strictement croissante sur $\mathbb{R}$ (fonction de référence), $x \mapsto x$ aussi, et une somme de deux fonctions strictement croissantes est strictement croissante.

Les trois conditions sont réunies : par le corollaire d'existence et d'unicité, l'équation $g(x)=0$ admet **une unique** solution $c \in \, ]0,1[$.

### La méthode à retenir pour un exercice de bac

Face à une question du type "montrer que l'équation $f(x)=k$ admet une solution (unique) dans $[a,b]$", la procédure est toujours la même :

1. Vérifier que $f$ est continue sur $[a,b]$ (le plus souvent immédiat : polynôme, rationnelle, etc. — boîte à outils du R4).
2. Calculer ou comparer $f(a)$ et $f(b)$ à $k$, et vérifier que $k$ est bien compris entre les deux (pour $k=0$ : vérifier que $f(a)$ et $f(b)$ sont de signes contraires).
3. Si on demande l'**unicité**, établir la stricte monotonie de $f$ sur $[a,b]$ (fonctions de référence, ou un tableau de variations donné dans l'énoncé).
4. Conclure en citant le théorème (ou son corollaire) explicitement.

---

## R6 — Pour t'entraîner

Voici un exercice de type bac, **original** (ce n'est pas un sujet officiel — c'est un exercice d'entraînement construit pour cette leçon), pour mettre en pratique plusieurs des outils qu'on vient de voir.

### Exercice travaillé

Soit $f$ la fonction définie sur $[-3,3]$ par $f(x) = x^3-3x$.

**Partie A.** Calculer $\displaystyle\lim_{x \to +\infty} (x^3-3x)$ et $\displaystyle\lim_{x \to -\infty} (x^3-3x)$.

**Partie B.** On admet le tableau de variations suivant de $f$ sur $[-3,3]$ : $f$ est strictement croissante sur $[-3,-1]$ (de $f(-3)=-18$ à $f(-1)=2$), strictement décroissante sur $[-1,1]$ (de $f(-1)=2$ à $f(1)=-2$), puis strictement croissante sur $[1,3]$ (de $f(1)=-2$ à $f(3)=18$). Montrer que l'équation $f(x)=0$ admet exactement trois solutions dans $[-3,3]$.

**Raisonnement à voix haute.**

**Partie A.** $x^3-3x$ est de la forme $\infty - \infty$ à l'infini : on factorise le terme dominant $x^3$.

$$x^3-3x = x^3\left(1-\frac{3}{x^2}\right)$$

Quand $x \to +\infty$, $\frac{3}{x^2} \to 0$ donc le facteur entre parenthèses tend vers $1$, et $x^3 \to +\infty$ :

$$\lim_{x \to +\infty} x^3\left(1-\frac{3}{x^2}\right) = +\infty$$

Quand $x \to -\infty$, le même facteur tend encore vers $1$, mais cette fois $x^3 \to -\infty$ :

$$\lim_{x \to -\infty} x^3\left(1-\frac{3}{x^2}\right) = -\infty$$

**Partie B.** Le tableau de variations découpe $[-3,3]$ en trois intervalles où $f$ est strictement monotone. Sur chacun, on vérifie que $0$ est bien compris entre les deux valeurs aux bornes, ce qui donne exactement une solution par le corollaire d'existence et d'unicité (le calcul le plus important ici : $f$ étant un polynôme, elle est continue sur les trois intervalles sans qu'on ait besoin de le redémontrer).

- Sur $[-3,-1]$ : $f$ continue et strictement croissante, $f(-3)=-18 < 0$ et $f(-1)=2>0$. $0$ est compris entre les deux : il existe une unique solution $c_1 \in \, ]-3,-1[$.
- Sur $[-1,1]$ : $f$ continue et strictement décroissante, $f(-1)=2>0$ et $f(1)=-2<0$. $0$ est compris entre les deux : il existe une unique solution $c_2 \in \, ]-1,1[$.
- Sur $[1,3]$ : $f$ continue et strictement croissante, $f(1)=-2<0$ et $f(3)=18>0$. $0$ est compris entre les deux : il existe une unique solution $c_3 \in \, ]1,3[$.

Les trois intervalles ouverts $]-3,-1[$, $]-1,1[$, $]1,3[$ sont disjoints, et aux points de jonction $f(-1)=2 \neq 0$ et $f(1)=-2 \neq 0$ (donc ces points ne sont pas eux-mêmes solutions). Les solutions $c_1$, $c_2$, $c_3$ sont donc bien trois solutions **distinctes**. L'équation $f(x)=0$ admet **exactement trois** solutions dans $[-3,3]$.

### À toi de jouer

**(a)** Calculer $\displaystyle\lim_{x \to 2} \frac{x^2-x-2}{x-2}$.

**(b)** Une fonction $h$ est continue sur $[0,4]$ et vérifie $h(0)=-3$ et $h(4)=5$. Justifier que l'équation $h(x)=1$ admet au moins une solution dans $]0,4[$.

<!-- NOTE DE VALIDATION (relecture humaine) — trois points ouverts pour la
     relecture pédagogique, non résolus par cet auteur :
     (1) skill_code proposé ici : `maths_limites_continuite` (convention
     "<subject>_<short>" du brief). À confirmer contre la convention réelle
     utilisée ailleurs dans le produit (ex. préfixe de filière type `sma_`
     vu sur d'autres notions) avant intégration en base.
     (2) Le périmètre demandé ("limite en un point et à l'infini, opérations,
     formes indéterminées, continuité, TVI") est large — certains manuels
     marocains le scindent en deux chapitres séparés ("Limites" puis
     "Continuité et TVI"). Cette leçon les traite comme un seul notion en 6
     rungs de contenu (R1-R5 + R6 entraînement) ; à confirmer que le
     découpage en une seule notion correspond à l'intention du produit.
     (3) R5 justifie la stricte croissance de x^3+x-1 et de l'exercice R6 par
     la monotonie connue des fonctions de référence (x -> x^3, x -> x),
     jamais par un calcul de dérivée, et le tableau de variations de
     l'exercice R6 est donné comme admis plutôt que dérivé — choix
     délibéré pour que la leçon reste autonome quel que soit l'ordre réel
     entre ce chapitre et le chapitre "Dérivation" dans la progression. À
     confirmer que cet ordre de progression correspond au programme réel.
-->
