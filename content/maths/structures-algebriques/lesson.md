# Structures algébriques

---

## R0 — Accroche : l'horloge qui boucle

Il est 9h. Dans 5 heures, quelle heure sera-t-il ?

Réponse immédiate : 14h, bien sûr, $9+5=14$. Mais regarde une horloge à cadran, avec 12 graduations numérotées de $0$ à $11$ : personne ne dit "il est 14h" — on dit "il est 2h". L'horloge a bouclé : une fois qu'on dépasse $11$, on repart de $0$.

Sur cette horloge, "ajouter 5 heures à 9h" donne 2h, parce que $9+5=14$ et que $14$ divisé par $12$ laisse un reste de $2$. Autrement dit, on ne calcule pas $9+5$ dans $\mathbb{Z}$ tout court : on calcule $9+5$, puis on ne garde que le reste modulo $12$. Tu connais déjà cette idée — c'est la congruence, du chapitre précédent.

Baptisons cette opération d'horloge $\oplus$ : $9 \oplus 5 = 2$. Avant de lire la suite, prends position sur $\oplus$ — engage-toi vraiment, une réponse pour chacune de ces questions :

- Est-ce que $\oplus$ est commutative ? ($a \oplus b = b \oplus a$, toujours ?)
- Est-ce que $\oplus$ est associative ?
- Existe-t-il une heure "neutre", qui ajoutée à n'importe quelle autre ne change rien ?
- Pour une heure donnée, peut-on toujours trouver une heure "opposée" qui, ajoutée à elle, ramène à cette heure neutre ?

Réfléchis vraiment avant de continuer.

Voici les réponses, et elles sont nettes : oui à tout. $\oplus$ est commutative, associative, il existe un neutre ($0$h, qui ne change rien), et chaque heure a une opposée — l'heure opposée à $5$h est $7$h, puisque $5 \oplus 7 = 12$, et $12$ laisse un reste de $0$ modulo $12$. Cette opération d'horloge, malgré son bouclage étrange, se comporte exactement comme l'addition habituelle sur toutes les propriétés qui comptent vraiment.

Ce n'est pas un hasard isolé. C'est un exemple d'un phénomène général : n'importe quel ensemble, muni d'une opération qui combine deux de ses éléments pour en produire un troisième, peut posséder — ou non — ces mêmes propriétés : commutativité, associativité, existence d'un neutre, existence d'un opposé. Et selon lesquelles il possède, on donne à l'ensemble muni de son opération un nom précis : **groupe**, **anneau**, **corps**. Ce chapitre construit ce vocabulaire — et surtout la méthode pour vérifier, avec certitude et non à l'intuition, qu'un ensemble donné mérite bien ce nom.

Ne cherche pas encore les définitions précises. On les construit ensemble, pièce par pièce.

---

## R1 — Loi de composition interne : définition et table de loi

### Ce qu'est une loi, précisément

Soit $E$ un ensemble non vide. Une **loi de composition interne** (en abrégé **LCI**) sur $E$ est une opération, notée par exemple $\star$, qui à tout couple $(x,y)$ d'éléments de $E$ associe un unique élément de $E$, noté $x \star y$ :

$$\star : E \times E \to E, \qquad (x,y) \mapsto x \star y$$

Le mot **interne** est celui qui compte vraiment : il dit que le résultat $x \star y$ reste **dans** $E$, quels que soient $x$ et $y$ choisis dans $E$. Une opération qui, pour au moins un couple $(x,y)$, produit un résultat hors de $E$, n'est tout simplement pas une loi de composition interne sur $E$ — pas "une loi interne avec une exception", mais pas une loi interne du tout.

### Un contre-exemple pour fixer l'idée

Prends $E = \mathbb{N}$ et l'opération $-$ (soustraction usuelle). Est-ce une LCI sur $\mathbb{N}$ ?

Teste-la : $3 - 5 = -2$. Or $-2 \notin \mathbb{N}$. Un seul couple suffit à casser la propriété : la soustraction n'est **pas** une loi de composition interne sur $\mathbb{N}$. (Elle l'est en revanche sur $\mathbb{Z}$ : quels que soient les entiers relatifs $a$ et $b$, $a-b$ reste un entier relatif.)

### Un exemple qui va nous servir tout le chapitre : $(\mathbb{Z}/n\mathbb{Z}, +)$

Rappelle-toi des congruences modulo $n$ (chapitre précédent) : deux entiers sont dans la même classe modulo $n$ s'ils ont le même reste dans la division euclidienne par $n$. Notons $\mathbb{Z}/n\mathbb{Z} = \{0, 1, 2, \ldots, n-1\}$ cet ensemble de restes possibles, et munissons-le de l'addition **modulo $n$** : on additionne comme d'habitude, puis on ne garde que le reste modulo $n$.

Prenons $n=4$, donc $E = \mathbb{Z}/4\mathbb{Z} = \{0,1,2,3\}$. Construisons la **table de la loi** — un tableau qui donne, pour chaque couple $(x,y)$, la valeur de $x+y$ à l'intersection de la ligne $x$ et de la colonne $y$ :

| $+$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $0$ | $0$ | $1$ | $2$ | $3$ |
| $1$ | $1$ | $2$ | $3$ | $0$ |
| $2$ | $2$ | $3$ | $0$ | $1$ |
| $3$ | $3$ | $0$ | $1$ | $2$ |

Par exemple, la case ligne $2$, colonne $3$ donne $2+3=5$, et $5$ divisé par $4$ laisse un reste de $1$ : donc $2+3=1$ dans $\mathbb{Z}/4\mathbb{Z}$ — exactement ce qu'affiche la table.

**Vérifier que c'est bien une LCI, directement sur la table :** regarde chaque case du tableau. Toutes contiennent un élément de $\{0,1,2,3\}$ — aucune case ne s'échappe hors de $E$. C'est exactement ce que veut dire "loi interne" : la table est un objet fini, entièrement rempli d'éléments de $E$, sans exception. Si une case avait affiché $4$ ou $-1$, la loi ne serait pas interne sur $E$.

---

## R2 — Propriétés d'une loi : commutativité, associativité, neutre, symétrique

### Commutativité — se lit sur la table

**Définition.** $\star$ est **commutative** sur $E$ si, pour tous $x,y \in E$ :

$$x \star y = y \star x$$

**Le mécanisme pour la vérifier sur une table finie :** échanger $x$ et $y$, c'est échanger la ligne et la colonne — donc échanger la case $(x,y)$ avec la case $(y,x)$, qui est sa réflexion par rapport à la **diagonale principale** du tableau. La loi est commutative si et seulement si la table entière est symétrique par rapport à cette diagonale.

Regarde la table de $(\mathbb{Z}/4\mathbb{Z},+)$ construite au R1 : la case $(1,3)$ contient $0$, et sa réflexion, la case $(3,1)$, contient aussi $0$. Teste une autre paire : $(2,3)$ donne $1$, et $(3,2)$ donne aussi $1$. La table entière est symétrique — $+$ est commutative sur $\mathbb{Z}/4\mathbb{Z}$. Ce n'est pas surprenant : l'addition sur $\mathbb{Z}$ est déjà commutative, et cette propriété se transmet telle quelle à l'addition modulo $n$.

### Associativité — ne se lit pas sur la table, elle se teste

**Définition.** $\star$ est **associative** sur $E$ si, pour tous $x,y,z \in E$ :

$$(x \star y) \star z = x \star (y \star z)$$

Contrairement à la commutativité, l'associativité met en jeu **trois** éléments à la fois : il n'y a pas de symétrie visuelle simple à repérer sur une table à deux entrées. On la teste par le calcul.

**Exemple travaillé.** Vérifions un cas particulier sur $(\mathbb{Z}/4\mathbb{Z},+)$, avec $x=1$, $y=2$, $z=3$ :

$$(1+2)+3 = 3+3 = 6 \equiv 2 \pmod 4$$

$$1+(2+3) = 1+5 = 6 \equiv 2 \pmod 4$$

Les deux membres donnent $2$ : l'égalité tient, pour ce triplet. Un seul triplet ne prouve rien pour tous les triplets — mais ici l'associativité tient pour **tous** les triplets, parce qu'elle est **héritée** de l'associativité de $+$ sur $\mathbb{Z}$ : additionner puis réduire modulo $4$, quel que soit l'ordre de regroupement, donne toujours le même reste. C'est ce type d'argument d'héritage — pas une vérification triplet par triplet — qui établit l'associativité pour une loi construite à partir d'une loi déjà connue comme associative.

**Un contre-exemple, pour sentir que ce n'est pas automatique.** Prends $E = \mathbb{R}^*$ et l'opération $\div$. Est-elle associative ?

$$(8 \div 4) \div 2 = 2 \div 2 = 1$$

$$8 \div (4 \div 2) = 8 \div 2 = 4$$

$1 \neq 4$ : un seul contre-exemple suffit à conclure que la division **n'est pas** associative sur $\mathbb{R}^*$. L'ordre de regroupement des parenthèses change le résultat — c'est précisément ce que l'associativité interdit, et ce que ce calcul vient de démontrer par l'exemple.

### Élément neutre — se lit aussi sur la table

**Définition.** $e \in E$ est **élément neutre** pour $\star$ si, pour tout $x \in E$ :

$$x \star e = e \star x = x$$

**Le mécanisme pour le repérer sur une table :** un élément $e$ est neutre exactement quand sa ligne recopie fidèlement la ligne d'en-tête, et sa colonne recopie fidèlement la colonne d'en-tête — combiner n'importe quel élément avec $e$ ne le change pas.

Regarde la ligne du $0$ dans la table de $(\mathbb{Z}/4\mathbb{Z},+)$ : elle affiche $0,1,2,3$, identique à la ligne d'en-tête. Même chose pour la colonne du $0$. Donc $0$ est l'élément neutre de $(\mathbb{Z}/4\mathbb{Z},+)$ — cohérent avec ce que tu sais déjà : ajouter $0$ ne change rien.

**Pourquoi il ne peut y avoir qu'un seul neutre.** Suppose que $e$ et $e'$ soient tous les deux neutres pour $\star$. Calcule $e \star e'$ de deux façons différentes. D'une part, $e$ est neutre, donc combiner $e$ avec n'importe quel élément — en particulier $e'$ — redonne cet élément :

$$e \star e' = e'$$

D'autre part, $e'$ est neutre lui aussi, donc combiner n'importe quel élément avec $e'$ — en particulier $e$ — redonne cet élément :

$$e \star e' = e$$

Les deux calculs portent sur la même quantité $e \star e'$ : donc $e = e'$. Il ne peut exister qu'un seul élément neutre. C'est ce qui autorise à parler "du" neutre, avec un article défini, et non "d'un" neutre parmi d'autres.

### Symétrique d'un élément — un rôle différent, pour chaque élément

**Définition.** Soit $e$ le neutre de $\star$ sur $E$. Un élément $x' \in E$ est un **symétrique** de $x \in E$ si :

$$x \star x' = x' \star x = e$$

**Arrête-toi ici : c'est le point où deux idées se mélangent souvent.** Le neutre $e$ est un **seul** élément, fixé une fois pour toutes pour l'ensemble $E$ tout entier — c'est celui qui ne change rien à personne. Le symétrique $x'$, lui, **dépend de $x$** : c'est l'élément qui, combiné à $x$ précisément, ramène au neutre $e$ — pour un autre élément $y$, le symétrique $y'$ sera en général différent de $x'$. Le neutre est un point fixe universel ; le symétrique est une relation entre deux éléments particuliers.

Reprends $(\mathbb{Z}/4\mathbb{Z},+)$, où $e=0$. Cherche, pour chaque élément, celui qui l'amène à $0$ :

- Symétrique de $0$ : c'est $0$ lui-même, puisque $0+0=0$.
- Symétrique de $1$ : c'est $3$, puisque $1+3=4 \equiv 0 \pmod 4$.
- Symétrique de $2$ : c'est $2$ lui-même, puisque $2+2=4 \equiv 0 \pmod 4$.
- Symétrique de $3$ : c'est $1$, puisque $3+1=4 \equiv 0 \pmod 4$.

Remarque que le symétrique de $1$ est $3$, et pas $0$ : $0$ est le neutre, pas le symétrique de qui que ce soit d'autre que lui-même. Répondre "le symétrique de $1$, c'est le neutre $0$" est exactement l'erreur à éviter — $1+0=1 \neq 0$, donc $0$ n'est pas le symétrique de $1$.

**Pourquoi le symétrique est unique, quand la loi est associative.** Suppose que $x'$ et $x''$ soient tous les deux symétriques de $x$, pour une loi $\star$ associative. Pars de $x'$, et récris-le en insérant le neutre $e$ à droite — ce qui ne change rien, par définition du neutre :

$$x' = x' \star e$$

Remplace $e$ par $x \star x''$ — légitime, puisque $x''$ est un symétrique de $x$, donc $x \star x'' = e$ :

$$x' \star e = x' \star (x \star x'')$$

L'associativité permet de redéplacer les parenthèses :

$$x' \star (x \star x'') = (x' \star x) \star x''$$

Mais $x'$ est aussi un symétrique de $x$, donc $x' \star x = e$ :

$$(x' \star x) \star x'' = e \star x''$$

Et $e$ est neutre, donc $e \star x'' = x''$. En suivant la chaîne de ces égalités, $x' = x''$ : les deux symétriques supposés sont en réalité le même élément. Remarque où l'associativité intervient — à la troisième étape, quand on redéplace les parenthèses : sans elle, cette chaîne ne tiendrait pas. C'est pour cette raison que "le" symétrique de $x$ n'a de sens, avec l'article défini, que lorsque la loi est associative.

---

## R3 — La structure de groupe : les quatre axiomes

### La définition

**Définition.** $(E, \star)$ est un **groupe** si les quatre conditions suivantes sont toutes vérifiées :

1. $\star$ est une **loi de composition interne** sur $E$ ;
2. $\star$ est **associative** ;
3. $E$ possède un **élément neutre** pour $\star$ ;
4. **tout** élément de $E$ possède un **symétrique** pour $\star$.

Les quatre conditions comptent également. Il ne suffit pas d'en vérifier trois et de supposer la quatrième — c'est précisément là que se glisse l'erreur la plus fréquente de ce chapitre. Vérifier un groupe, c'est cocher les quatre cases, une par une, sans en sauter aucune — et, pour la quatrième, vérifier qu'**elle tient pour chaque élément de $E$**, pas seulement pour certains d'entre eux.

### Exemple travaillé : vérifier que $(\mathbb{Z}/4\mathbb{Z}, +)$ est un groupe

**Ce qu'on cherche et pourquoi ce geste :** passer les quatre axiomes en revue, un par un, en s'appuyant sur ce qu'on a déjà établi aux R1 et R2 — vérifier un groupe n'est jamais un acte de foi, c'est une liste de contrôle qu'on parcourt entièrement.

1. **Loi interne :** montré au R1 — toutes les cases de la table sont dans $\{0,1,2,3\}$. ✓
2. **Associative :** montrée au R2 — héritée de l'associativité de $+$ sur $\mathbb{Z}$. ✓
3. **Élément neutre :** montré au R2 — c'est $0$. ✓
4. **Symétrique pour chaque élément :** montré au R2, et il faut vérifier les **quatre** éléments, pas seulement un ou deux : $0$ a pour symétrique $0$, $1$ a pour symétrique $3$, $2$ a pour symétrique $2$, $3$ a pour symétrique $1$. Chacun des quatre éléments a bien un symétrique. ✓

Les quatre conditions sont vérifiées : $(\mathbb{Z}/4\mathbb{Z}, +)$ **est un groupe**.

**Retour à l'horloge.** Les heures d'une montre à $12$ graduations, munies de l'addition modulo $12$, forment exactement ce qu'on vient de vérifier ici pour $\mathbb{Z}/4\mathbb{Z}$, mais avec $n=12$ à la place de $n=4$ : un groupe. Voilà pourquoi, dès le R0, l'addition d'heures avait toutes les bonnes propriétés — ce n'était pas un hasard, c'était un groupe, comme n'importe quel $(\mathbb{Z}/n\mathbb{Z}, +)$.

### Un second exemple : un groupe de symétries

Le mot "symétrique", au sens algébrique du R2, n'a rien à voir a priori avec les symétries géométriques — mais un ensemble de transformations géométriques peut, lui aussi, former un groupe. Regardons.

Prends un rectangle non carré, de sommets $A$, $B$, $C$, $D$ dans cet ordre (par exemple $A=(0,0)$, $B=(6,0)$, $C=(6,4)$, $D=(0,4)$ : $AB$ le côté long, $BC$ le côté court). Quelles transformations du plan laissent ce rectangle **globalement invariant** (elles peuvent permuter les sommets, mais le rectangle occupe à la fin exactement la même région du plan) ?

- $id$ : l'identité — chaque sommet reste à sa place.
- $s_h$ : la symétrie par rapport à l'axe horizontal passant par le centre — elle échange $A \leftrightarrow D$ et $B \leftrightarrow C$.
- $s_v$ : la symétrie par rapport à l'axe vertical passant par le centre — elle échange $A \leftrightarrow B$ et $D \leftrightarrow C$.
- $r$ : la rotation de $180°$ autour du centre — elle échange $A \leftrightarrow C$ et $B \leftrightarrow D$.

Il n'y en a pas d'autres (un rectangle non carré n'a que ces quatre symétries — un carré, lui, en aurait davantage, mais restons sur le rectangle). Notons $E = \{id, s_h, s_v, r\}$, et munissons $E$ de la loi $\circ$ (composition : $f \circ g$ signifie "applique $g$, puis $f$").

**Construire une case de la table, en suivant les sommets.** Calculons $s_h \circ s_v$ (applique $s_v$, puis $s_h$), en suivant le sommet $A$ : $s_v$ envoie $A$ sur $B$ ; puis $s_h$ envoie ce $B$ sur $C$. Donc $A \mapsto C$ au total. En suivant les trois autres sommets de la même façon, on trouve $B \mapsto D$, $C \mapsto A$, $D \mapsto B$ : $A \leftrightarrow C$ et $B \leftrightarrow D$, exactement l'effet de $r$. Donc $s_h \circ s_v = r$.

En répétant ce même suivi de sommets pour chaque paire, on obtient la table complète :

| $\circ$ | $id$ | $s_h$ | $s_v$ | $r$ |
|---|---|---|---|---|
| $id$ | $id$ | $s_h$ | $s_v$ | $r$ |
| $s_h$ | $s_h$ | $id$ | $r$ | $s_v$ |
| $s_v$ | $s_v$ | $r$ | $id$ | $s_h$ |
| $r$ | $r$ | $s_v$ | $s_h$ | $id$ |

**Vérifier les quatre axiomes, comme pour $\mathbb{Z}/4\mathbb{Z}$ :**

1. **Loi interne :** toutes les cases contiennent un élément de $E$. ✓
2. **Associative :** on admet ici ce fait général et déjà connu — la composition des applications est **toujours** associative, quelles que soient les applications considérées. ✓
3. **Élément neutre :** la ligne et la colonne de $id$ recopient l'en-tête — $id$ est neutre. ✓
4. **Symétrique pour chaque élément :** la diagonale de la table est entièrement composée de $id$ ($id \circ id = id$, $s_h \circ s_h = id$, $s_v \circ s_v = id$, $r \circ r = id$) — chacun des quatre éléments est son propre symétrique. ✓

$(E, \circ)$ **est un groupe** : le groupe des symétries du rectangle.

---

## R4 — Groupe commutatif (abélien)

### La définition

**Définition.** Un groupe $(E, \star)$ est **commutatif** (on dit aussi **abélien**) si, de plus, $\star$ est commutative :

$$\text{pour tous } x,y \in E, \qquad x \star y = y \star x$$

**Le mécanisme pour le vérifier :** exactement celui du R2 — la table est symétrique par rapport à sa diagonale principale.

Regarde les deux tables construites au R3. Celle de $(\mathbb{Z}/4\mathbb{Z}, +)$ est symétrique (déjà vérifié au R2). Celle du groupe des symétries du rectangle l'est aussi : compare, par exemple, la case $(s_h, r)$, qui contient $s_v$, et sa réflexion $(r, s_h)$, qui contient également $s_v$. Les deux groupes rencontrés jusqu'ici sont donc **abéliens**.

### Un contre-exemple : la composition n'est pas commutative en général

Attention à ne pas conclure trop vite que "composer, c'est toujours commutatif" — le groupe des symétries du rectangle est un cas particulier, pas la règle générale. Prends deux fonctions bien connues, définies sur $\mathbb{R}$ : $f(x) = x+1$ et $g(x)=2x$. Calculons $f \circ g$ et $g \circ f$.

$$(f \circ g)(x) = f(g(x)) = f(2x) = 2x+1$$

$$(g \circ f)(x) = g(f(x)) = g(x+1) = 2(x+1) = 2x+2$$

Pour $x=0$ par exemple, $(f\circ g)(0) = 1$ alors que $(g \circ f)(0) = 2$ : les deux fonctions composées sont différentes. La composition de fonctions **n'est pas commutative** en général — même si elle reste toujours associative (fait admis au R3). Associativité et commutativité sont deux propriétés indépendantes : une loi peut avoir l'une sans l'autre. C'est précisément pour ça que "groupe commutatif" mérite son propre nom : ce n'est pas automatique dès qu'on a un groupe.

---

## R5 — La structure d'anneau

### La définition

Un anneau met en jeu **deux** lois sur le même ensemble, notées en général $+$ et $\times$.

**Définition.** $(E, +, \times)$ est un **anneau** si :

1. $(E, +)$ est un **groupe commutatif** (on note $0$ son élément neutre) ;
2. $\times$ est **associative** sur $E$ ;
3. $\times$ est **distributive** par rapport à $+$, à gauche et à droite : pour tous $x,y,z \in E$,

$$x \times (y+z) = x \times y + x \times z \qquad \text{et} \qquad (y+z) \times x = y \times x + z \times x$$

Remarque la dissymétrie voulue entre les deux lois : $+$ doit satisfaire les quatre axiomes complets du groupe (et être commutative), alors que $\times$ n'a besoin que d'être associative et de bien s'articuler avec $+$ par la distributivité. Rien n'exige, à ce stade, que $\times$ ait un neutre pour tout le monde, ni que chaque élément ait un symétrique pour $\times$ — ce sont des exigences plus fortes, réservées à la structure suivante (R6).

### Exemple travaillé : $(\mathbb{Z}, +, \times)$

1. $(\mathbb{Z}, +)$ est un groupe commutatif : c'est déjà connu (neutre $0$, symétrique de $x$ égal à $-x$, commutatif, associatif). ✓
2. $\times$ est associative sur $\mathbb{Z}$ : déjà connu. ✓
3. Distributivité, vérifiée sur un triplet numérique : $3 \times (4+5) = 3 \times 9 = 27$, et $3 \times 4 + 3 \times 5 = 12+15=27$. Les deux calculs coïncident — cohérent avec le fait, connu depuis le collège, que la distributivité tient pour tous les entiers, pas seulement pour ce triplet. ✓

$(\mathbb{Z}, +, \times)$ **est un anneau**.

### Un second exemple, fini cette fois : $(\mathbb{Z}/4\mathbb{Z}, +, \times)$

Construisons la table de la multiplication modulo $4$ sur $E = \{0,1,2,3\}$ :

| $\times$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $0$ | $0$ | $0$ | $0$ | $0$ |
| $1$ | $0$ | $1$ | $2$ | $3$ |
| $2$ | $0$ | $2$ | $0$ | $2$ |
| $3$ | $0$ | $3$ | $2$ | $1$ |

Par exemple, $2 \times 3 = 6$, et $6$ laisse un reste de $2$ modulo $4$ : d'où la case $(2,3) = 2$.

**Vérifier que c'est un anneau, axiome par axiome :**

1. $(\mathbb{Z}/4\mathbb{Z}, +)$ est un groupe commutatif : déjà établi au R3. ✓
2. $\times$ est associative sur $\mathbb{Z}/4\mathbb{Z}$ : héritée de l'associativité de $\times$ sur $\mathbb{Z}$, exactement comme pour $+$ au R2. ✓
3. Distributivité, vérifiée sur un triplet : $2 \times (1+3) = 2 \times 0 = 0$ (car $1+3=4\equiv 0 \pmod 4$), et $2\times 1 + 2 \times 3 = 2+6=8 \equiv 0 \pmod 4$. Les deux membres valent $0$ : cohérent, pour la même raison d'héritage. ✓

$(\mathbb{Z}/4\mathbb{Z}, +, \times)$ **est un anneau**.

**Une observation qui va compter pour la suite.** Regarde la ligne du $1$ dans la table de $\times$ : elle recopie l'en-tête $0,1,2,3$ — $1$ est bien neutre pour $\times$. Mais est-ce que **chaque** élément a un symétrique pour $\times$ ? Regarde la ligne du $2$ : $2\times0=0$, $2\times1=2$, $2\times2=0$, $2\times3=2$ — jamais $1$. **$2$ n'a pas de symétrique pour $\times$.** Donc $(\mathbb{Z}/4\mathbb{Z}, \times)$, prise seule, **n'est pas un groupe** — l'axiome 4 échoue pour l'élément $2$ — alors même que $(\mathbb{Z}/4\mathbb{Z}, +, \times)$ est bel et bien un anneau. C'est exactement ce que la définition de l'anneau annonçait : rien n'exige que $\times$ forme un groupe. Un anneau n'est **pas** "deux lois qui sont chacune un groupe" — c'est un groupe commutatif pour $+$, accompagné d'une seconde loi $\times$ moins exigeante.

---

## R6 — Corps : une brève mention

### La définition

**Définition.** Un anneau $(E, +, \times)$ est un **corps** si, de plus :

- $\times$ est **commutative** ;
- **tout élément non nul** de $E$ possède un **symétrique** pour $\times$.

Un corps est donc un anneau où la seconde loi, $\times$, se rapproche presque des exigences d'un groupe — à une exception près, et elle est capitale : le neutre $0$ de $+$ n'a jamais besoin d'un symétrique pour $\times$ (chercher un $x$ tel que $0 \times x = 1$ serait de toute façon sans espoir, puisque $0 \times x = 0$ pour tout $x$).

### Exemple travaillé : $(\mathbb{Q}, +, \times)$ est un corps

$(\mathbb{Q}, +, \times)$ est déjà un anneau (mêmes vérifications que pour $\mathbb{Z}$ au R5, héritées des propriétés connues de $+$ et $\times$ sur $\mathbb{Q}$), et $\times$ y est commutative. Reste à vérifier l'exigence supplémentaire : **tout** rationnel non nul a-t-il un symétrique pour $\times$ ?

Prends un rationnel non nul quelconque $\frac{a}{b}$ (avec $a \neq 0$). Son symétrique candidat est $\frac{b}{a}$ — qui est bien un rationnel, puisque $a \neq 0$. Vérifie :

$$\frac{a}{b} \times \frac{b}{a} = \frac{ab}{ba} = 1$$

Cette construction marche pour **n'importe quel** rationnel non nul, pas seulement pour un exemple isolé : $(\mathbb{Q}, +, \times)$ **est un corps**.

### Le contre-exemple qui sépare anneau et corps : $(\mathbb{Z}, +, \times)$ n'est pas un corps

$(\mathbb{Z}, +, \times)$ est un anneau (R5) et $\times$ y est commutative. Mais prends $2 \in \mathbb{Z}$, non nul. Existe-t-il un entier $x$ tel que $2x=1$ ? Le seul candidat serait $x=\frac{1}{2}$, qui n'est **pas** un entier — le symétrique devrait appartenir à $\mathbb{Z}$ lui-même, pas à un ensemble plus grand. Donc $2$ n'a pas de symétrique pour $\times$ **dans $\mathbb{Z}$** : $(\mathbb{Z}, +, \times)$ **est un anneau, mais n'est pas un corps**.

C'est exactement la même observation que celle faite à la fin du R5 pour $(\mathbb{Z}/4\mathbb{Z}, +, \times)$ : l'élément $2$ y était déjà sans symétrique pour $\times$. Un anneau devient un corps seulement quand **tous** les éléments non nuls, sans exception, ont un symétrique pour la seconde loi — pas seulement certains d'entre eux.

### Synthèse

| Structure | Ce qu'elle exige |
|---|---|
| Groupe $(E,\star)$ | loi interne + associative + neutre + symétrique pour **chaque** élément |
| Groupe commutatif | groupe, et de plus $\star$ commutative |
| Anneau $(E,+,\times)$ | $(E,+)$ groupe commutatif ; $\times$ associative et distributive par rapport à $+$ |
| Corps $(E,+,\times)$ | anneau, avec $\times$ commutative et **tout élément non nul** inversible pour $\times$ |

La ligne qui sépare l'anneau du corps tient en une seule exigence supplémentaire — et c'est elle qui distingue $(\mathbb{Z},+,\times)$ (anneau seulement) de $(\mathbb{Q},+,\times)$ (corps).

---

## R7 — Pour t'entraîner

### Exercice travaillé

On munit l'ensemble $E = \{1, i, -1, -i\}$ (les puissances de $i$ dans $\mathbb{C}$) de la multiplication usuelle des nombres complexes, notée $\times$.

**(a)** Construire la table de la loi $\times$ sur $E$, et vérifier qu'elle est bien interne.

**(b)** Déterminer l'élément neutre de $(E, \times)$.

**(c)** Déterminer, pour chaque élément de $E$, son symétrique.

**(d)** $(E, \times)$ est-il un groupe commutatif ?

**Raisonnement à voix haute.**

**(a)** On utilise $i^2=-1$, $i^3=-i$, $i^4=1$ pour remplir chaque case :

| $\times$ | $1$ | $i$ | $-1$ | $-i$ |
|---|---|---|---|---|
| $1$ | $1$ | $i$ | $-1$ | $-i$ |
| $i$ | $i$ | $-1$ | $-i$ | $1$ |
| $-1$ | $-1$ | $-i$ | $1$ | $i$ |
| $-i$ | $-i$ | $1$ | $i$ | $-1$ |

Toutes les cases contiennent un élément de $E$ — la loi est bien interne.

**(b)** La ligne et la colonne du $1$ recopient l'en-tête : $1$ est l'élément neutre.

**(c)** On cherche, pour chaque élément, celui avec lequel il donne $1$ : $1 \times 1 = 1$, donc $1$ est son propre symétrique. $i \times (-i) = -i^2 = 1$, donc le symétrique de $i$ est $-i$ (et réciproquement, celui de $-i$ est $i$). $(-1)\times(-1)=1$, donc $-1$ est son propre symétrique.

**(d)** La loi interne est vérifiée (a), la loi possède un neutre (b), chacun des quatre éléments a un symétrique (c) — reste l'associativité, qu'on admet ici puisqu'elle est héritée de l'associativité de $\times$ sur $\mathbb{C}$, un fait déjà connu (exactement le même type d'argument d'héritage qu'au R2 et au R3). Les quatre axiomes sont vérifiés : $(E,\times)$ est un groupe. Et la table est symétrique par rapport à sa diagonale — la loi est commutative. **$(E,\times)$ est donc un groupe commutatif.**

### À toi de jouer

**(a)** On munit $E=\{0,1,2,3,4\}$ de la loi $\oplus$ définie par l'addition modulo $5$ — c'est-à-dire $(\mathbb{Z}/5\mathbb{Z}, +)$. Construis la table de la loi, détermine l'élément neutre, et donne le symétrique de chaque élément. $(E, \oplus)$ est-il un groupe commutatif ? Justifie en vérifiant les quatre axiomes un par un.

**(b)** On munit cette fois $E=\{0,1,2,3\}$ de la multiplication modulo $4$ — c'est-à-dire $(\mathbb{Z}/4\mathbb{Z}, \times)$, et non plus l'addition. Construis la table. Y a-t-il un élément neutre ? Est-ce que **tous** les éléments de $E$ possèdent un symétrique pour cette loi, ou seulement certains ? $(E, \times)$ est-il un groupe ? Justifie en vérifiant les quatre axiomes un par un, sans en sauter aucun.
