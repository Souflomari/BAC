# Dérivabilité et étude des fonctions

---

## R0 — Accroche : la vitesse qu'affiche le compteur

Une bille roule sur une rampe. Sa position, en mètres, au bout de $t$ secondes, est donnée par $d(t) = t^2$.

Une question simple : **quelle est la vitesse de la bille exactement à $t=2$ secondes** — pas en moyenne sur un intervalle, mais à cet instant précis, comme ce qu'afficherait un compteur de vitesse collé sur la bille ?

Avant de lire la suite, prends position : d'après toi, a-t-on le droit de parler d'une vitesse "à un instant précis", ou est-ce qu'une vitesse n'a de sens que "sur une durée" ?

[[checkpoint:cp-r0-predict]]

Ce qu'on sait calculer facilement, c'est une **vitesse moyenne** entre deux instants. Entre $t=2$ et $t=2+h$ (pour un petit $h>0$), la bille parcourt $d(2+h)-d(2)$ mètres en $h$ secondes, donc sa vitesse moyenne sur cet intervalle est $\dfrac{d(2+h)-d(2)}{h}$.

Voici ce que donne ce calcul pour des valeurs de $h$ de plus en plus petites, c'est-à-dire pour des intervalles de plus en plus courts autour de $t=2$ :

| $h$ | $0{,}1$ | $0{,}01$ | $0{,}001$ | $\to 0$ |
|---|---|---|---|---|
| vitesse moyenne sur $[2, 2+h]$ | $4{,}1$ | $4{,}01$ | $4{,}001$ | $?$ |

Plus l'intervalle se resserre autour de $t=2$, plus la vitesse moyenne se rapproche d'un nombre précis : $4$. Ce n'est pas un hasard — et ce n'est pas non plus une coïncidence numérique : c'est exactement ce qu'on appelle la **vitesse instantanée** en $t=2$, et c'est exactement ce que le compteur d'une voiture affiche à chaque instant : pas une moyenne sur un trajet, mais la limite de la vitesse moyenne quand la durée d'observation tend vers zéro.

Ce nombre — la limite du taux d'accroissement d'une fonction quand l'écart tend vers zéro — porte un nom en mathématiques : le **nombre dérivé**. C'est l'objet de toute cette leçon. On va construire, étape par étape, tout ce qu'on peut en faire : le calculer pour n'importe quelle fonction usuelle, l'utiliser pour tracer une tangente, s'en servir pour connaître les variations d'une fonction sans tracer un seul point, et terminer par une méthode complète pour étudier n'importe quelle fonction du programme.

---

## R1 — Le nombre dérivé : limite du taux d'accroissement, et la tangente

### Le taux d'accroissement

Pour une fonction $f$ et deux réels $a$ et $a+h$ (avec $h \neq 0$) de son domaine, le **taux d'accroissement** de $f$ entre $a$ et $a+h$ est le quotient

$$\tau(h) = \frac{f(a+h)-f(a)}{h}$$

C'est exactement le calcul du chapitre 1 : la variation de $f$ ($f(a+h)-f(a)$), divisée par la variation de la variable ($h$). Géométriquement, c'est la **pente de la droite qui passe par les points $(a, f(a))$ et $(a+h, f(a+h))$** de la courbe de $f$ — une droite **sécante** à la courbe.

### Le nombre dérivé, comme limite

Faire tendre $h$ vers $0$, c'est rapprocher le second point du premier — la sécante "pivote" autour de $(a, f(a))$. Si cette pente a une limite finie, on l'appelle le **nombre dérivé de $f$ en $a$**, noté $f'(a)$ :

$$f'(a) = \lim_{h \to 0} \frac{f(a+h)-f(a)}{h}$$

En posant $x = a+h$ (donc $h = x-a$, et $h \to 0 \iff x \to a$), on obtient une écriture équivalente, tout aussi utilisée :

$$f'(a) = \lim_{x \to a} \frac{f(x)-f(a)}{x-a}$$

Quand cette limite existe (et est finie), on dit que $f$ est **dérivable en $a$**.

**Résolvons le chapitre 1 avec cette définition**, pour $d(t) = t^2$ en $a=2$ :

$$\tau(h) = \frac{d(2+h)-d(2)}{h} = \frac{(2+h)^2 - 4}{h}$$

$$(2+h)^2 - 4 = 4 + 4h + h^2 - 4 = 4h+h^2$$

$$\tau(h) = \frac{4h+h^2}{h} = 4+h \quad (h \neq 0)$$

Puisque $h \neq 0$ dans tout le calcul de la limite, on a bien pu simplifier par $h$ — exactement le même réflexe que pour lever une forme indéterminée $\frac{0}{0}$ dans le chapitre précédent. Il ne reste plus qu'à faire tendre $h$ vers $0$ dans l'expression simplifiée :

$$d'(2) = \lim_{h \to 0} (4+h) = 4$$

**Le tableau du chapitre 1 avait raison** : la vitesse instantanée en $t=2$ est bien $4$ m/s, et maintenant tu peux le prouver sans tableau. Le même calcul, mené pour un point $a$ quelconque au lieu de $2$, donne $\tau(h) = \dfrac{(a+h)^2-a^2}{h} = \dfrac{2ah+h^2}{h} = 2a+h \to 2a$. Donc $d'(a) = 2a$ pour tout $a$ — une formule générale qu'on retrouvera au chapitre 3.

### De la sécante à la tangente : l'équation de la tangente

Quand $f$ est dérivable en $a$, la droite sécante qui "pivotait" a une position limite : c'est la **tangente** à la courbe de $f$ au point d'abscisse $a$. Sa pente est $f'(a)$, et elle passe par le point $(a, f(a))$ — deux informations qui suffisent à écrire son équation :

$$T_a : \quad y = f'(a)(x-a) + f(a)$$

**Ce que fait cette formule et pourquoi ce geste :** une droite de pente $m$ passant par $(a, f(a))$ s'écrit toujours $y - f(a) = m(x-a)$ — c'est juste la définition de la pente, réarrangée. Ici, on utilise $m = f'(a)$, parce que c'est précisément la pente que la sécante atteint à la limite. Il n'y a rien de nouveau à mémoriser : la tangente est une droite comme les autres, dont on connaît un point et la pente.

**Exemple travaillé.** Donner l'équation de la tangente à la courbe de $d(t)=t^2$ au point d'abscisse $2$.

**Ce qu'on cherche et pourquoi ce geste :** il faut les deux ingrédients de la formule — $d(2)$ et $d'(2)$ — qu'on a déjà calculés juste au-dessus ; ce n'est plus qu'une substitution.

$d(2) = 4$ et $d'(2) = 4$ (calculé plus haut). Donc :

$$T_2 : \quad y = 4(x-2) + 4$$

$$y = 4x - 8 + 4 = 4x-4$$

[[figure:tangente-derivee]]

### Dérivabilité à gauche, à droite — et un contre-exemple qui compte

Exactement comme pour une limite (chapitre précédent), on peut regarder le taux d'accroissement seulement par valeurs de $h$ négatives ou seulement par valeurs positives :

- **Nombre dérivé à gauche :** $f'_g(a) = \displaystyle\lim_{x \to a^{-}} \frac{f(x)-f(a)}{x-a}$
- **Nombre dérivé à droite :** $f'_d(a) = \displaystyle\lim_{x \to a^{+}} \frac{f(x)-f(a)}{x-a}$

**La règle : $f$ est dérivable en $a$ si et seulement si $f'_g(a)$ et $f'_d(a)$ existent et sont égales** — et alors $f'(a)$ vaut cette valeur commune. Si elles diffèrent, $f$ n'est tout simplement pas dérivable en $a$, même si $f$ y est parfaitement continue.

**Exemple travaillé.** Étudier la dérivabilité de $f(x) = |x-2|$ en $x=2$.

**Ce qu'on cherche et pourquoi ce geste :** une valeur absolue change de formule de part et d'autre du point où son contenu s'annule — exactement le signal qui impose de vérifier séparément les deux côtés, comme pour une fonction définie par morceaux.

Pour $h>0$ : $f(2+h)-f(2) = |h| - 0 = h$, donc $\tau(h) = \dfrac{h}{h} = 1$.

Pour $h<0$ : $f(2+h)-f(2) = |h| - 0 = -h$ (puisque $h$ est négatif, $|h|=-h$), donc $\tau(h) = \dfrac{-h}{h} = -1$.

$$f'_d(2) = \lim_{h \to 0^{+}} 1 = 1 \qquad \qquad f'_g(2) = \lim_{h \to 0^{-}} (-1) = -1$$

$1 \neq -1$ : les deux nombres dérivés latéraux sont différents, donc **$f$ n'est pas dérivable en $2$** — même si $f$ y est parfaitement continue ($f(2)=0$ et la courbe ne "saute" pas). Graphiquement, la courbe de $|x-2|$ fait un **point anguleux** (un angle) en $x=2$ : deux demi-tangentes de pentes différentes s'y rejoignent, donc il n'existe pas UNE tangente unique à cet endroit.

**Le résultat à retenir, dans les deux sens :** dérivable en $a$ entraîne toujours continue en $a$ (avoir une tangente bien définie empêche tout saut). Mais la réciproque est fausse — l'exemple de $|x-2|$ le prouve : continue en $2$, mais pas dérivable en $2$. La continuité ne suffit jamais, à elle seule, à garantir une tangente.

---

## R2 — Dérivées des fonctions usuelles et opérations

### Les fonctions usuelles, et pourquoi leurs dérivées sont ce qu'elles sont

Le calcul du chapitre 2 pour $d(t)=t^2$ n'était pas un cas isolé : la même méthode (former $\tau(h)$, simplifier en sachant que $h \neq 0$, puis faire tendre $h$ vers $0$) fonctionne pour toutes les fonctions usuelles.

**Une fonction constante**, $f(x)=c$ : $\tau(h) = \dfrac{c-c}{h} = 0$ pour tout $h \neq 0$, donc $f'(x)=0$. Une constante ne varie jamais, sa pente est toujours nulle — cohérent.

**La fonction identité**, $f(x)=x$ : $\tau(h) = \dfrac{(a+h)-a}{h} = \dfrac{h}{h} = 1$, donc $f'(x)=1$. La droite $y=x$ a partout la pente $1$ — encore cohérent, la dérivée d'une droite est sa propre pente, constante.

**La fonction carré**, $f(x)=x^2$ : on a montré au chapitre 2 que $f'(a) = 2a$, donc $f'(x) = 2x$.

**La fonction cube**, $f(x)=x^3$ : le même principe, avec un développement en plus.

$$\tau(h) = \frac{(a+h)^3 - a^3}{h}$$

$$(a+h)^3 - a^3 = 3a^2h + 3ah^2 + h^3$$

$$\tau(h) = \frac{3a^2h+3ah^2+h^3}{h} = 3a^2+3ah+h^2 \quad (h \neq 0)$$

$$f'(a) = \lim_{h \to 0} (3a^2+3ah+h^2) = 3a^2$$

Le motif se généralise : pour $f(x)=x^n$ ($n$ entier, $n \geq 1$), $f'(x) = n x^{n-1}$. Tu peux vérifier que ça marche pour $n=1$ ($1 \times x^0 = 1$) et $n=2$ ($2x^1=2x$) — c'est exactement ce qu'on vient de retrouver.

**La fonction inverse**, $f(x)=\dfrac{1}{x}$ (pour $x \neq 0$) :

$$\tau(h) = \frac{1}{h}\left(\frac{1}{a+h} - \frac{1}{a}\right)$$

En réduisant au même dénominateur à l'intérieur de la parenthèse ($a-(a+h) = -h$) :

$$\tau(h) = \frac{1}{h} \cdot \frac{-h}{a(a+h)}$$

Puisque $h \neq 0$, on simplifie par $h$ :

$$\tau(h) = \frac{-1}{a(a+h)}$$

$$f'(a) = \lim_{h \to 0} \frac{-1}{a(a+h)} = \frac{-1}{a^2}$$

**La fonction racine carrée**, $f(x)=\sqrt{x}$ (pour $x>0$) : ici, la différence $\sqrt{a+h}-\sqrt{a}$ résiste à la simplification directe, exactement comme dans le chapitre précédent — le réflexe est donc le même : multiplier par le **quantité conjuguée**.

$$\tau(h) = \frac{\sqrt{a+h}-\sqrt{a}}{h} = \frac{(\sqrt{a+h}-\sqrt{a})(\sqrt{a+h}+\sqrt{a})}{h(\sqrt{a+h}+\sqrt{a})}$$

Le numérateur devient une différence de carrés, $(a+h)-a=h$ :

$$\tau(h) = \frac{h}{h(\sqrt{a+h}+\sqrt{a})}$$

Puisque $h \neq 0$, on simplifie par $h$ :

$$\tau(h) = \frac{1}{\sqrt{a+h}+\sqrt{a}} \quad (h \neq 0)$$

$$f'(a) = \lim_{h \to 0} \frac{1}{\sqrt{a+h}+\sqrt{a}} = \frac{1}{2\sqrt{a}}$$

**Tableau récapitulatif des dérivées usuelles :**

| $f(x)$ | $f'(x)$ | Domaine de validité |
|---|---|---|
| $c$ (constante) | $0$ | $\mathbb{R}$ |
| $x$ | $1$ | $\mathbb{R}$ |
| $x^n$ ($n$ entier $\geq 1$) | $nx^{n-1}$ | $\mathbb{R}$ |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ | $x \neq 0$ |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ | $x > 0$ |

### Les opérations : construire des dérivées compliquées à partir des simples

Presque aucune fonction du programme n'est "usuelle" telle quelle — ce sont des sommes, produits, quotients de fonctions usuelles. Il faut donc savoir comment la dérivation traverse ces opérations. Dans tout ce qui suit, $u$ et $v$ sont deux fonctions dérivables en $a$.

**La somme : $(u+v)'=u'+v'$.** Le taux d'accroissement de $u+v$ se décompose immédiatement :

$$\frac{(u+v)(a+h)-(u+v)(a)}{h} = \frac{u(a+h)-u(a)}{h} + \frac{v(a+h)-v(a)}{h}$$

La limite d'une somme est la somme des limites (chapitre précédent), donc $(u+v)'(a) = u'(a)+v'(a)$. Rien de nouveau — la dérivation hérite directement de cette propriété des limites.

**Le produit : $(uv)'=u'v+uv'$.** Ici, le taux d'accroissement ne se décompose pas aussi simplement — il faut un petit tour de passe-passe : ajouter et retrancher la même quantité, $u(a)v(a+h)$, pour faire apparaître les deux taux d'accroissement séparés.

$$u(a+h)v(a+h) - u(a)v(a) = \big[u(a+h)-u(a)\big]v(a+h) + u(a)\big[v(a+h)-v(a)\big]$$

En divisant par $h$ :

$$\frac{u(a+h)v(a+h)-u(a)v(a)}{h} = \frac{u(a+h)-u(a)}{h} \cdot v(a+h) + u(a) \cdot \frac{v(a+h)-v(a)}{h}$$

Quand $h \to 0$ : le premier facteur tend vers $u'(a)$, et $v(a+h) \to v(a)$ (car $v$ dérivable en $a$ entraîne $v$ continue en $a$, résultat du chapitre 2) ; le second taux d'accroissement tend vers $v'(a)$. D'où :

$$(uv)'(a) = u'(a)v(a) + u(a)v'(a)$$

**Pourquoi ce n'est pas $u'v'$ :** une erreur fréquente est de croire que la dérivée d'un produit est le produit des dérivées. Le calcul ci-dessus montre que ce n'est pas le cas — il y a **deux** termes, parce qu'une petite variation du produit $uv$ vient de deux sources à la fois : la variation de $u$ (à $v$ presque fixé) ET la variation de $v$ (à $u$ presque fixé). Ignorer l'un des deux termes revient à ignorer une des deux sources de variation.

[[figure:regle-produit-aire]]

**Le quotient : $\left(\dfrac{u}{v}\right)' = \dfrac{u'v-uv'}{v^2}$** (là où $v(a) \neq 0$). On l'obtient en deux temps. D'abord, la dérivée de $\dfrac{1}{v}$, par le même principe que $\left(\dfrac{1}{x}\right)'=-\dfrac{1}{x^2}$ vu plus haut, généralisé à $v$ :

$$\left(\frac{1}{v}\right)'(a) = -\frac{v'(a)}{v(a)^2}$$

Puis on écrit $\dfrac{u}{v} = u \times \dfrac{1}{v}$ et on applique la règle du produit :

$$\left(\frac{u}{v}\right)'(a) = u'(a) \times \frac{1}{v(a)} + u(a) \times \left(-\frac{v'(a)}{v(a)^2}\right) = \frac{u'(a)}{v(a)} - \frac{u(a)v'(a)}{v(a)^2}$$

En mettant au même dénominateur $v(a)^2$ :

$$\left(\frac{u}{v}\right)'(a) = \frac{u'(a)v(a) - u(a)v'(a)}{v(a)^2}$$

**Exemple travaillé.** Calculer la dérivée de $f(x) = (2x+1)(x^2-3)$.

**Ce qu'on cherche et pourquoi ce geste :** $f$ est un produit de deux fonctions polynômes simples — le réflexe est d'identifier $u$ et $v$, calculer $u'$ et $v'$ séparément, puis appliquer $(uv)'=u'v+uv'$ sans chercher à développer $f$ elle-même avant de dériver.

Poser $u(x)=2x+1$ (donc $u'(x)=2$) et $v(x)=x^2-3$ (donc $v'(x)=2x$).

$$f'(x) = u'(x)v(x) + u(x)v'(x) = 2(x^2-3) + (2x+1)(2x)$$

$$f'(x) = (2x^2-6) + (4x^2+2x) = 6x^2+2x-6$$

---

## R3 — Dérivée d'une fonction composée

### L'idée : des taux qui s'enchaînent

Une fonction composée $u \circ v$ applique d'abord $v$, puis $u$ sur le résultat. Intuitivement : si $v$ change $k_1$ fois plus vite que $x$ (localement), et si $u$ change $k_2$ fois plus vite que son entrée (localement, en $v(x)$), alors $u \circ v$ change $k_1 \times k_2$ fois plus vite que $x$ — les deux taux de changement s'enchaînent en se **multipliant**, exactement comme deux rapports de vitesses qui s'enchaînent (un engrenage qui tourne 2 fois plus vite que le premier, lui-même entraîné à 3 fois la vitesse d'entrée, tourne à $2 \times 3 = 6$ fois la vitesse d'entrée).

**La règle (dérivée d'une composée) :**

$$(u \circ v)'(x) = v'(x) \times u'\big(v(x)\big)$$

Autrement dit : on dérive $u$ "à l'extérieur" (en l'évaluant au point $v(x)$, pas au point $x$), et on multiplie par la dérivée de $v$ "à l'intérieur". C'est ce facteur $v'(x)$ — la vitesse à laquelle l'intérieur change — qu'un élève pressé oublie le plus souvent.

### Deux corollaires très utilisés

**La puissance d'une fonction, $(u^n)'$.** En prenant $u(x)$ élevé à la puissance $n$ comme une composée (la fonction "puissance $n$-ième" appliquée à $u$), la règle de la composée donne :

$$(u^n)' = n \, u' \, u^{n-1}$$

**Exemple travaillé.** Calculer la dérivée de $g(x) = (3x-1)^4$.

**Ce qu'on cherche et pourquoi ce geste :** $g$ est de la forme $u^n$ avec $u(x)=3x-1$ (donc $u'(x)=3$, une constante) et $n=4$. Le réflexe : appliquer $(u^n)'=n\,u'\,u^{n-1}$ sans développer $(3x-1)^4$ à la main — ce serait beaucoup plus long et inutile.

$$g'(x) = 4 \times u'(x) \times u(x)^3 = 4 \times 3 \times (3x-1)^3$$

$$g'(x) = 12(3x-1)^3$$

**La racine carrée d'une fonction, $(\sqrt{u})'$.** De même, en traitant $\sqrt{u}$ comme une composée :

$$(\sqrt{u})' = \frac{u'}{2\sqrt{u}} \quad \text{(là où } u > 0\text{)}$$

**Exemple travaillé.** Calculer la dérivée de $g(x) = \sqrt{x^2+1}$.

**Ce qu'on cherche et pourquoi ce geste :** $g = \sqrt{u}$ avec $u(x)=x^2+1$ (donc $u'(x)=2x$). Comme $u(x)=x^2+1>0$ pour tout $x$, la formule s'applique sur $\mathbb{R}$ tout entier — pas besoin de restreindre le domaine.

$$g'(x) = \frac{u'(x)}{2\sqrt{u(x)}} = \frac{2x}{2\sqrt{x^2+1}} = \frac{x}{\sqrt{x^2+1}}$$

---

## R4 — Signe de $f'$ et sens de variation ; extremums locaux

### Le lien entre la pente de la tangente et la direction de la courbe

Voici le résultat qui rend le calcul de $f'$ aussi utile : le signe de $f'$ commande le sens de variation de $f$.

**Théorème (admis).** Soit $f$ dérivable sur un intervalle $I$.

- Si $f'(x) > 0$ pour tout $x$ de $I$ (sauf éventuellement en un nombre fini de points), alors $f$ est **strictement croissante** sur $I$.
- Si $f'(x) < 0$ pour tout $x$ de $I$ (sauf éventuellement en un nombre fini de points), alors $f$ est **strictement décroissante** sur $I$.
- Si $f'(x) = 0$ pour tout $x$ de $I$, alors $f$ est **constante** sur $I$.

**Pourquoi c'est crédible, avec l'image de la tangente :** $f'(x)$ est la pente de la tangente au point d'abscisse $x$. Si cette pente est positive **en chaque point** de $I$, la courbe "monte" localement partout sur $I$ — elle ne peut pas redescendre nulle part, sinon il existerait un point où la tangente pointerait vers le bas, donc où $f'$ serait négative, ce qui contredit l'hypothèse. Recoller ces montées locales en une seule conclusion globale demande un argument plus fin (le théorème des accroissements finis, hors programme ici) — mais l'image de la pente qui ne s'annule jamais dans le mauvais sens explique pourquoi le résultat est vrai.

### Les extremums locaux — et un piège à éviter

Un **extremum local** de $f$ en un point $a$ (maximum ou minimum) correspond, sur la courbe, à un sommet ou un creux : la tangente y est **horizontale**, donc $f'(a) = 0$.

**Mais attention : $f'(a)=0$ seul ne suffit pas à conclure à un extremum.** Ce qui fait vraiment l'extremum, c'est que $f'$ **change de signe** de part et d'autre de $a$ — la courbe monte, puis redescend (maximum), ou descend, puis remonte (minimum).

**Contre-exemple qui casse le raccourci trop rapide.** Prends $f(x) = x^3$. On a $f'(x) = 3x^2$, donc $f'(0) = 0$. Est-ce que $f$ admet un extremum en $0$ ?

Regarde le signe de $f'(x) = 3x^2$ : c'est un carré multiplié par $3$, donc $f'(x) \geq 0$ pour **tout** $x$, et $f'(x) > 0$ dès que $x \neq 0$. Le signe de $f'$ est le même des deux côtés de $0$ (positif) — il ne change pas. Donc $f$ est strictement croissante sur $\mathbb{R}$ tout entier, **y compris en traversant $0$** : il n'y a pas d'extremum en $0$, seulement un point où la tangente est horizontale un instant, sans que la courbe change de direction. La règle à retenir : $f'(a)=0$ signale un **candidat**, jamais une conclusion — il faut toujours vérifier le changement de signe autour de $a$.

### Exemple travaillé : la fonction du chapitre précédent, enfin prouvée

Tu te souviens de $f(x) = x^3-3x$, du chapitre sur les limites ? Son tableau de variations avait été donné comme **admis**. Tu peux maintenant le démontrer toi-même.

**Ce qu'on cherche et pourquoi ce geste :** pour connaître les variations de $f$, on calcule $f'$, on cherche ses racines (les candidats à un extremum), puis on étudie son signe entre ces racines.

$$f'(x) = 3x^2 - 3$$

En factorisant par $3$, puis en reconnaissant une différence de carrés ($x^2-1=(x-1)(x+1)$) :

$$f'(x) = 3(x-1)(x+1)$$

$f'$ s'annule en $x=-1$ et $x=1$. C'est un trinôme du second degré de coefficient dominant positif ($3>0$), donc $f'$ est négative **entre** ses racines et positive **à l'extérieur** :

- $f'(x) > 0$ sur $]-\infty, -1[$ : $f$ strictement croissante.
- $f'(x) < 0$ sur $]-1, 1[$ : $f$ strictement décroissante.
- $f'(x) > 0$ sur $]1, +\infty[$ : $f$ strictement croissante.

$f'$ change bien de signe en $-1$ (de $+$ à $-$ : maximum local) et en $1$ (de $-$ à $+$ : minimum local) :

$$f(-1) = (-1)^3 - 3(-1) = -1+3 = 2 \qquad \qquad f(1) = 1^3-3(1) = 1-3=-2$$

Ce sont exactement les valeurs $f(-1)=2$ et $f(1)=-2$ que le chapitre précédent avait données comme admises — tu viens de les retrouver par le calcul, sans les supposer.

[[figure:tableau-variations-courbe]]

[[checkpoint:cp-r4-extremum]]

---

## R5 — Concavité, dérivée seconde, point d'inflexion — et l'étude complète d'une fonction

### La dérivée seconde et ce qu'elle mesure

Si $f'$ est elle-même dérivable, sa dérivée se note $f''$ et s'appelle la **dérivée seconde** de $f$. Puisque $f'(x)$ est la pente de la tangente au point $x$, $f''(x)$ mesure **comment cette pente évolue** : si $f''(x)>0$, la pente de la tangente est croissante (les tangentes successives "tournent" dans le sens direct, de plus en plus vers le haut) ; si $f''(x)<0$, la pente est décroissante.

**Concavité.** Sur un intervalle où $f''(x) > 0$, la courbe de $f$ est dite **convexe** (elle se situe au-dessus de chacune de ses tangentes — la courbe "se creuse vers le haut", comme un bol). Sur un intervalle où $f''(x) < 0$, la courbe est dite **concave** (elle se situe en dessous de chacune de ses tangentes — la courbe "se creuse vers le bas", comme un dôme).

**Pourquoi c'est cohérent avec l'image des tangentes qui tournent :** si la pente des tangentes augmente sans cesse en balayant l'intervalle de gauche à droite ($f''>0$), chaque nouvelle tangente "monte plus vite" que la précédente — la courbe ne peut alors que rester au-dessus des tangentes déjà tracées, sinon elle redescendrait sous une tangente plus ancienne alors que sa propre pente ne fait qu'augmenter.

**Point d'inflexion.** Un point $a$ où $f''$ **change de signe** (concavité qui bascule) est un **point d'inflexion** : la courbe traverse sa propre tangente en ce point exact, passant d'un côté à l'autre.

**Exemple travaillé — on continue $f(x)=x^3-3x$ du chapitre 5.** On a $f'(x)=3x^2-3$, donc :

$$f''(x) = 6x$$

$f''(x) < 0$ pour $x<0$ (concave) et $f''(x)>0$ pour $x>0$ (convexe) : $f''$ change de signe en $x=0$. Donc $f$ admet un **point d'inflexion** en $x=0$, de coordonnées $\big(0, f(0)\big) = (0,0)$.

### La méthode complète pour étudier une fonction

Voici, rassemblé, tout ce qu'une étude complète de fonction demande — dans l'ordre où on le mène en pratique :

1. **Domaine de définition** de $f$ (valeurs interdites : dénominateur nul, racine d'un nombre négatif...).
2. **Limites** aux bornes du domaine (aux infinis, et aux valeurs interdites) — ce qui révèle les **asymptotes** éventuelles (verticale, horizontale, oblique).
3. **Dérivée** $f'$, calculée avec les règles des chapitres 3 et 4.
4. **Signe de $f'$**, généralement en factorisant, pour en déduire le **tableau de variations**.
5. **Extremums locaux** : valeurs de $f$ aux points où $f'$ change de signe.
6. **Concavité et point(s) d'inflexion** (si demandés), via $f''$.
7. **Tangentes remarquables** (tangentes horizontales aux extremums, tangente en un point donné par l'énoncé).
8. **Tracé** : rassembler toutes ces informations pour décrire (ou dessiner) l'allure de la courbe.

**Exemple travaillé — étude complète.** Soit $f$ la fonction définie par $f(x) = \dfrac{x^2-x+1}{x-1}$.

**Ce qu'on cherche et pourquoi ce geste :** avant même de dériver, il vaut la peine de vérifier si l'écriture de $f$ se simplifie — une division polynomiale de $x^2-x+1$ par $x-1$ va révéler la structure de $f$ et anticiper la forme de ses asymptotes.

**1. Domaine.** $f$ est définie pour $x-1 \neq 0$, donc sur $\mathbb{R} \setminus \{1\}$.

**2. Simplification et limites.** En divisant : $x^2-x+1 = x(x-1)+1$, donc

$$f(x) = \frac{x(x-1)+1}{x-1} = x + \frac{1}{x-1}$$

Cette écriture révèle une **asymptote oblique** : quand $x \to \pm\infty$, $\dfrac{1}{x-1} \to 0$, donc $f(x) - x \to 0$ : la droite $y=x$ est asymptote à la courbe de $f$ en $+\infty$ et en $-\infty$. Pour $x>1$, $\dfrac{1}{x-1}>0$ donc la courbe est **au-dessus** de cette asymptote ; pour $x<1$, $\dfrac{1}{x-1}<0$ donc la courbe est **en dessous**.

Près de $x=1$ : quand $x \to 1^{-}$, $x-1 \to 0^{-}$ donc $\dfrac{1}{x-1} \to -\infty$, et $f(x) \to -\infty$. Quand $x \to 1^{+}$, $\dfrac{1}{x-1} \to +\infty$ donc $f(x) \to +\infty$. La droite $x=1$ est **asymptote verticale**.

**3. Dérivée.** À partir de $f(x) = x + \dfrac{1}{x-1}$, avec $\left(\dfrac{1}{x-1}\right)' = -\dfrac{1}{(x-1)^2}$ (même principe que $\left(\frac{1}{x}\right)'$, chapitre 3) :

$$f'(x) = 1 - \frac{1}{(x-1)^2} = \frac{(x-1)^2-1}{(x-1)^2}$$

En développant le numérateur :

$$(x-1)^2 - 1 = x^2-2x+1-1 = x^2-2x$$

qui se factorise en $x(x-2)$, d'où :

$$f'(x) = \frac{x(x-2)}{(x-1)^2}$$

**4. Signe de $f'$.** Le dénominateur $(x-1)^2$ est strictement positif partout où $f$ est définie. Le signe de $f'$ est donc celui du numérateur $x(x-2)$, un trinôme de racines $0$ et $2$, de coefficient dominant positif — donc négatif entre les racines, positif à l'extérieur :

- $f'(x) > 0$ sur $]-\infty, 0[$
- $f'(x) < 0$ sur $]0,1[ \, \cup \, ]1,2[$
- $f'(x) > 0$ sur $]2, +\infty[$

**5. Variations et extremums.** $f$ croît sur $]-\infty,0]$ jusqu'à $f(0) = 0 + \dfrac{1}{-1} = -1$ (maximum local), décroît sur $[0,1[$ (vers $-\infty$), décroît encore sur $]1,2]$ depuis $+\infty$ jusqu'à $f(2) = 2 + \dfrac{1}{1} = 3$ (minimum local), puis croît sur $[2,+\infty[$.

**6. Concavité (remarque).** On aurait $f''(x) = \dfrac{2}{(x-1)^3}$ : négative pour $x<1$ (concave), positive pour $x>1$ (convexe). Le signe change bien de part et d'autre de $x=1$ — mais $x=1$ n'appartient pas au domaine de $f$, donc ce n'est **pas** un point d'inflexion : c'est juste que la concavité diffère de chaque côté de l'asymptote verticale. Un point d'inflexion exige que $f$ soit réellement définie (et dérivable) à cet endroit précis.

**7. Tracé (description).** Deux branches séparées par l'asymptote verticale $x=1$. À gauche, la courbe monte de $-\infty$ jusqu'au maximum local $(0,-1)$, en restant sous l'asymptote oblique $y=x$, puis redescend vers $-\infty$ en longeant $x=1$. À droite, elle redescend de $+\infty$ jusqu'au minimum local $(2,3)$, en restant au-dessus de $y=x$, puis remonte en suivant l'asymptote oblique.

[[figure:etude-fonction-rationnelle]]

[[checkpoint:cp-r5-inflexion]]

---

## Fonction réciproque : la même courbe, lue dans l'autre sens

Tu viens de mener une étude complète : domaine, limites, dérivée, signe, variations. Tout ce travail répond toujours à la même question, dans le même sens — on te donne $x$, tu produis $f(x)$.

L'examen national retourne la question, presque chaque année, à la fin du problème d'analyse : **on te donne une valeur $y$, et on te demande le $x$ qui la produit**. Remonter de l'image vers l'antécédent. Ce chapitre montre que ce trajet inverse est parfois lui-même une fonction — et que tout ce que tu sais déjà sur $f$ suffit à la construire, à la dessiner, et à la dériver.

### Un premier cas, sur une étude déjà faite

Reprends $f(x) = x^3-3x$ du chapitre 5, mais ne la regarde que sur $[1,+\infty[$. Tu as établi là-bas que $f'(x) = 3(x-1)(x+1)$, donc $f'(x)>0$ dès que $x>1$ : $f$ est **strictement croissante** sur $[1,+\infty[$. Aux bornes de cet intervalle : $f(1)=-2$, et $f(x) \to +\infty$ quand $x \to +\infty$.

Maintenant pose la question inverse. Choisis une hauteur $y$, disons $y=2$ : existe-t-il un $x \geq 1$ tel que $f(x)=2$, et un seul ?

C'est mot pour mot le corollaire du TVI du chapitre précédent : $f$ est continue sur $[1,+\infty[$, elle y est strictement monotone, et $2$ est bien compris entre $f(1)=-2$ et la limite $+\infty$. Donc l'équation $f(x)=2$ a **exactement une** solution dans $[1,+\infty[$ (ici $x=2$, puisque $2^3-3\times2=2$).

Et ce raisonnement ne doit rien à la valeur $2$ : il tient à l'identique pour **toute** hauteur $y$ de $[-2,+\infty[$. À chaque $y$ de cet intervalle correspond donc un antécédent, et un seul. Associer à $y$ cet unique antécédent, c'est exactement définir une fonction — la **fonction réciproque** de $f$, notée $f^{-1}$, définie sur $[-2,+\infty[$.

### Le théorème d'existence, et ce qui reste vraiment à vérifier

**Théorème.** Si $f$ est **continue** et **strictement monotone** sur un intervalle $I$, alors $f$ réalise une **bijection** de $I$ sur l'intervalle image $J=f(I)$ : tout élément de $J$ a un antécédent dans $I$, et un seul. $f$ admet alors une fonction réciproque $f^{-1}$, définie sur $J$, à valeurs dans $I$, caractérisée par

$$\text{pour } x \in I \text{ et } y \in J : \qquad y = f(x) \iff x = f^{-1}(y)$$

Remarque ce que tu n'as, en pratique, presque jamais à démontrer :

- **La continuité est offerte par la dérivabilité.** Si tu as calculé $f'$ pour faire le tableau de variations, $f$ est dérivable sur $I$, donc continue sur $I$ (chapitre 2). Une ligne, pas une démonstration.
- **La stricte monotonie est déjà dans le tableau de variations.** Elle vient du signe de $f'$ (chapitre 5) — c'est-à-dire d'une question que le sujet t'a fait traiter plusieurs questions plus tôt.

Ce qui reste à ta charge, et qui porte tous les points : **déterminer $J$**. C'est la seule vraie question de la démonstration d'existence.

### Lire l'intervalle image aux bornes — et le piège du sens

Sur un intervalle où $f$ est strictement monotone, $f$ ne revient jamais en arrière : l'image de $I$ est donc simplement l'intervalle délimité par les valeurs (ou les limites) de $f$ aux **bornes** de $I$. Mais ces deux valeurs ne se rangent pas dans le même ordre selon le sens de variation :

| $f$ sur $I=[a,b]$ | $J=f(I)$ |
|---|---|
| strictement croissante | $[f(a),\ f(b)]$ — les bornes se correspondent dans l'ordre |
| strictement décroissante | $[f(b),\ f(a)]$ — **les bornes s'échangent** |

La même lecture vaut pour une borne ouverte ou infinie, en remplaçant la valeur par la limite : si $I=\,]1,2]$ et $f$ y est décroissante, alors $J=\left[f(2),\ \displaystyle\lim_{x \to 1^{+}}f(x)\right[$.

**L'erreur qui coûte les points est toujours la même :** écrire $J$ dans l'ordre des bornes de $I$ alors que $f$ décroît, et sortir un intervalle à l'envers, du type $[3,-\infty[$. Le réflexe qui l'évite : ne recopie jamais l'ordre de $I$ — écris les deux valeurs, regarde laquelle est la plus petite, et range-les.

Sur l'exemple : $f$ croît sur $I=[1,+\infty[$, avec $f(1)=-2$ et $f \to +\infty$. Donc $J=[-2,+\infty[$, dans l'ordre — et $f^{-1}$ est définie sur $[-2,+\infty[$.

### La courbe de $f^{-1}$ : le symétrique par rapport à la droite $y=x$

L'équivalence $y=f(x) \iff x=f^{-1}(y)$ dit une chose très concrète sur les points : si le point de coordonnées $(x,\,f(x))$ est sur la courbe de $f$, alors le point $(f(x),\,x)$ — les mêmes deux nombres, échangés — est sur la courbe de $f^{-1}$.

Or échanger l'abscisse et l'ordonnée d'un point, c'est exactement le symétriser par rapport à la droite d'équation $y=x$, la **première bissectrice** du repère. D'où le résultat que les sujets demandent d'appliquer :

**La courbe de $f^{-1}$ est le symétrique de la courbe de $f$ par rapport à la droite $(\Delta) : y=x$.**

Tu n'as donc aucun calcul à faire pour la tracer : tu reflètes ce qui est déjà dessiné. Trois conséquences utiles, toutes lisibles sur cette symétrie :

- **Un point situé sur $(\Delta)$ est son propre symétrique.** Sur l'exemple, $f(2)=2$ : le point $(2,2)$ est sur la première bissectrice, donc il appartient aux **deux** courbes. Les sujets s'en servent comme point de repère pour le tracé — et une remarque du type "on remarquera que $f(\alpha)=\alpha$" est presque toujours là pour ça.
- **$f^{-1}$ varie dans le même sens que $f$.** Une symétrie par rapport à $y=x$ ne retourne pas le sens de la montée : si $f$ croît, $f^{-1}$ croît ; si $f$ décroît, $f^{-1}$ décroît.
- **Les asymptotes se symétrisent aussi.** Une asymptote horizontale $y=c$ de la courbe de $f$ devient une asymptote verticale $x=c$ pour celle de $f^{-1}$, et réciproquement. Une droite perpendiculaire à $(\Delta)$, elle, est sa propre symétrique : elle reste asymptote aux deux courbes.

Sur l'exemple : la courbe de $f^{-1}$ part du point $(-2,1)$ — le symétrique de $(1,-2)$ —, passe par $(2,2)$ qui est son propre symétrique, et monte indéfiniment.

### La dérivée de la réciproque en un point

Il reste le troisième temps, celui qui se paie en points : dériver $f^{-1}$ en un point, sans jamais avoir écrit son expression.

**Théorème.** Soit $f$ une bijection d'un intervalle $I$ sur $J$, dérivable en un point $a$ de $I$, et $b=f(a)$. Si $f'(a) \neq 0$, alors $f^{-1}$ est dérivable en $b$ et

$$\left(f^{-1}\right)'(b) = \frac{1}{f'(a)} \qquad \text{c'est-à-dire} \qquad \left(f^{-1}\right)'(b) = \frac{1}{f'\!\left(f^{-1}(b)\right)}$$

**Pourquoi ce $1$ sur la pente, avec l'image de la tangente :** la tangente à la courbe de $f$ au point $(a,b)$ a pour pente $f'(a)$ ; elle avance de $1$ horizontalement pendant qu'elle monte de $f'(a)$. Symétrise cette droite par rapport à $y=x$ : elle devient la tangente à la courbe de $f^{-1}$ au point $(b,a)$, et la symétrie échange justement l'horizontal et le vertical. Le déplacement qui valait "$1$ à droite, $f'(a)$ vers le haut" devient "$f'(a)$ à droite, $1$ vers le haut" : la nouvelle pente est $\dfrac{1}{f'(a)}$.

Cette image explique aussi **pourquoi la condition $f'(a) \neq 0$ est indispensable** : si $f'(a)=0$, la tangente à la courbe de $f$ est horizontale, donc sa symétrique est **verticale** — une droite verticale n'a pas de pente, et $f^{-1}$ n'est pas dérivable en $b$. Sur l'exemple, $f'(1)=0$ : la courbe de $f^{-1}$ admet une tangente verticale au point $(-2,1)$, exactement au bord de son domaine.

**Exemple travaillé.** Pour $f(x)=x^3-3x$ bijective de $[1,+\infty[$ sur $[-2,+\infty[$, calculer $\left(f^{-1}\right)'(2)$.

**Ce qu'on cherche et pourquoi ce geste :** la formule réclame un antécédent, pas une image. Avant tout calcul de dérivée, il faut donc le $a$ de $I$ tel que $f(a)=2$ — c'est lui, et lui seul, qu'on dérivera.

On a $f(2)=2^3-3\times2=2$, donc $f^{-1}(2)=2$ : ici l'antécédent est $a=2$.

$$f'(2) = 3\times2^2-3 = 9 \neq 0$$

La condition est remplie, donc :

$$\left(f^{-1}\right)'(2) = \frac{1}{f'(2)} = \frac{1}{9}$$

**Le piège, et il est systématique :** écrire $\dfrac{1}{f'(b)}$ au lieu de $\dfrac{1}{f'(a)}$. Ici les deux se confondent parce que $2$ est son propre antécédent — c'est précisément le cas où l'erreur ne se voit pas. Dès que $b \neq a$, elle donne un résultat faux. La parade tient en une phrase : **on dérive $f$ au point de départ, jamais au point d'arrivée.** C'est pour cette raison que les sujets glissent presque toujours une indication du type "*remarquer que $f^{-1}(b)=a$*", ou renvoient à une question précédente où $f(a)=b$ a déjà été calculé : cette indication n'est pas un cadeau décoratif, c'est l'antécédent qu'il te faut.

Note enfin que $f^{-1}$ ne désigne **pas** $\dfrac{1}{f}$. C'est une notation, pas une puissance : $f^{-1}(b)$ est un antécédent, $\dfrac{1}{f(b)}$ est un inverse, et les deux n'ont rien à voir.

### Dans l'habillage de l'examen : la rédaction complète, en trois temps

**Exemple travaillé.** Soit $f(x) = \dfrac{x^2-x+1}{x-1}$, étudiée au chapitre 6. On note $g$ sa restriction à l'intervalle $I=\,]1,2]$. Montrer que $g$ admet une fonction réciproque $g^{-1}$ définie sur un intervalle $J$ à déterminer, puis calculer $\left(g^{-1}\right)'\!\left(\dfrac{7}{2}\right)$.

**Ce qu'on cherche et pourquoi ce geste :** tout est déjà fait dans l'étude du chapitre 6 — il ne s'agit pas de recommencer, mais d'aller y **prélever** les trois ingrédients : la dérivabilité (pour la continuité), le signe de $f'$ sur $I$ (pour la monotonie), et les valeurs aux bornes de $I$ (pour $J$).

**1. Existence.** $g$ est dérivable sur $I$ comme restriction d'une fonction rationnelle définie sur $I$, donc **continue** sur $I$. Le chapitre 6 a établi $f'(x)=\dfrac{x(x-2)}{(x-1)^2}$, strictement négative sur $]1,2[$ : $g$ est donc **strictement décroissante** sur $I=\,]1,2]$. Continue et strictement monotone sur un intervalle, $g$ réalise une bijection de $I$ sur $J=g(I)$.

**2. Détermination de $J$.** On lit les deux bornes, puis on les range — $g$ décroît, donc elles s'échangent :

$$g(2) = 2+\frac{1}{1} = 3 \qquad \qquad \lim_{x \to 1^{+}} g(x) = +\infty$$

$$J = \left[3,\ +\infty\right[$$

Donc $g$ admet une fonction réciproque $g^{-1}$ définie sur $J=[3,+\infty[$.

**3. Dérivée en un point.** On cherche d'abord l'antécédent de $\dfrac{7}{2}$ dans $I$. En essayant $x=\dfrac{3}{2}$ :

$$g\!\left(\frac{3}{2}\right) = \frac{3}{2} + \frac{1}{\frac{3}{2}-1} = \frac{3}{2}+2 = \frac{7}{2} \qquad \text{donc} \qquad g^{-1}\!\left(\frac{7}{2}\right) = \frac{3}{2}$$

On dérive $g$ **en cet antécédent** :

$$g'\!\left(\frac{3}{2}\right) = \frac{\frac{3}{2}\left(\frac{3}{2}-2\right)}{\left(\frac{3}{2}-1\right)^2} = \frac{\frac{3}{2}\times\left(-\frac{1}{2}\right)}{\frac{1}{4}} = \frac{-\frac{3}{4}}{\frac{1}{4}} = -3 \neq 0$$

$$\left(g^{-1}\right)'\!\left(\frac{7}{2}\right) = \frac{1}{g'\!\left(\frac{3}{2}\right)} = -\frac{1}{3}$$

Le signe négatif est une vérification gratuite : $g$ décroît, donc $g^{-1}$ décroît aussi, donc sa dérivée devait être négative. Quand tu trouves une dérivée de réciproque dont le signe contredit le tableau de variations de départ, c'est qu'une erreur s'est glissée dans le calcul — le plus souvent l'antécédent.

---

### Exercice de type bac

Le sujet ci-dessous est un **extrait** d'un problème d'analyse déjà vérifié (examen national, session normale 2019, filière Sciences Mathématiques) : cette notion n'a pas d'exercice dédié au bac, elle apparaît toujours en filigrane dans un problème plus large — voici la portion qui te concerne directement, dérivabilité, Rolle, accroissements finis et point d'inflexion.

Un piège à trancher avant de te lancer — ce que le théorème de Rolle exige exactement quand on l'applique à $f'$ plutôt qu'à $f$ :

[[checkpoint:cp-bac-rolle]]

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même enchaînement — dérivabilité, Rolle, accroissements finis, point d'inflexion — mais une autre fonction, un autre coefficient, et surtout d'autres racines : impossible de recopier les nombres du sujet précédent. Un dernier réflexe sur ce que le théorème des accroissements finis donne réellement, avant de te lancer :

[[checkpoint:cp-bac-taf]]

[[exercise:r-variation]]

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts pour la relecture
     pédagogique, non résolus par cet auteur :
     (1) skill_code proposé ici : `maths_derivabilite_etude_fonctions`
     (convention "<subject>_<short>" du brief, calquée sur
     `maths_limites_continuite` déjà en place). À confirmer contre la
     convention réelle de la base (ex. préfixe de filière type `sma_` vu sur
     `probabilites-conditionnelles`) avant intégration.
     (2) Le périmètre demandé est large : dérivabilité en un point, tangente,
     dérivées usuelles + opérations, composée, signe de f' / variations /
     extremums, concavité / point d'inflexion, ET méthode d'étude complète
     avec asymptotes. Certains manuels marocains scindent ceci en deux
     chapitres ("Dérivation" puis "Étude de fonctions numériques"). Cette
     leçon les traite comme une seule notion en 7 rungs (R0 + R1-R5 +
     R6 entraînement) ; à confirmer que ce découpage correspond à
     l'intention du produit et à la progression réelle du programme SM/PC/SVT.
     (3) Le théorème "signe de f' ⇒ sens de variation" (R4) est présenté
     comme admis, avec une justification intuitive (image de la pente) mais
     sans démonstration par les accroissements finis / le théorème de Rolle
     — choix délibéré pour rester au niveau bac. À confirmer que le
     programme n'attend pas une mention explicite du théorème des
     accroissements finis à ce niveau.
     (4) La formule $(u^n)'$ n'est établie ici que pour $n$ entier (via la
     règle de la composée) ; les puissances non entières ne sont pas
     abordées, conformément au périmètre demandé qui n'inclut ni les
     fonctions puissances généralisées ni l'exponentielle/logarithme
     (chapitres séparés du produit). À confirmer que ce choix de portée est
     bien celui voulu pour cette notion.
     (5) L'exemple filé $f(x)=x^3-3x$ du R4/R5 reprend délibérément la
     fonction laissée "admise" dans `limites-continuite` (R6), pour boucler
     la boucle entre les deux chapitres — dépend de l'ordre de progression
     réel entre "Limites et continuité" et cette notion ; à confirmer que
     "Limites et continuité" est bien enseigné AVANT cette notion dans la
     séquence produit (l'inverse casserait ce callback, sans casser la
     leçon elle-même qui reste autonome).
-->
