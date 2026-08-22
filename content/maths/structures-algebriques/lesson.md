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

[[checkpoint:cp-r0-predict]]

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

[[checkpoint:cp-r1-stabilite]]

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

[[figure:table-groupe]]

**Pourquoi le symétrique est unique, quand la loi est associative.** Suppose que $x'$ et $x''$ soient tous les deux symétriques de $x$, pour une loi $\star$ associative. Pars de $x'$, et récris-le en insérant le neutre $e$ à droite — ce qui ne change rien, par définition du neutre :

$$x' = x' \star e$$

Remplace $e$ par $x \star x''$ — légitime, puisque $x''$ est un symétrique de $x$, donc $x \star x'' = e$ :

$$x' \star e = x' \star (x \star x'')$$

L'associativité permet de redéplacer les parenthèses :

$$x' \star (x \star x'') = (x' \star x) \star x''$$

Mais $x'$ est aussi un symétrique de $x$, donc $x' \star x = e$ :

$$(x' \star x) \star x'' = e \star x''$$

Et $e$ est neutre, donc $e \star x'' = x''$. En suivant la chaîne de ces égalités, $x' = x''$ : les deux symétriques supposés sont en réalité le même élément. Remarque où l'associativité intervient — à la troisième étape, quand on redéplace les parenthèses : sans elle, cette chaîne ne tiendrait pas. C'est pour cette raison que "le" symétrique de $x$ n'a de sens, avec l'article défini, que lorsque la loi est associative.

[[checkpoint:cp-r2-neutre-symetrique]]

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

[[figure:symetries-rectangle]]

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

## Sous-groupe : un groupe caché dans un autre

Tu viens de vérifier, deux fois, qu'un ensemble muni d'une loi est un groupe : quatre axiomes, cochés un par un. Ce chapitre pose la même question un cran plus bas — et c'est celle que l'examen national pose presque chaque année : **une partie** d'un groupe déjà connu forme-t-elle, à elle seule, un groupe pour la même loi ?

### Un premier cas, sur une table déjà construite

Reprends $(\mathbb{Z}/4\mathbb{Z},+)$ et sa table du R1, mais ne regarde que les deux éléments $H = \{0,2\}$. Combine-les entre eux, en lisant les cases correspondantes :

$$0+0=0, \qquad 0+2=2, \qquad 2+0=2, \qquad 2+2=0$$

Quatre combinaisons, quatre résultats — et les quatre sont dans $H$. La table de $H$ est donc un tableau complet, autonome, qui ne sort jamais de $H$ :

| $+$ | $0$ | $2$ |
|---|---|---|
| $0$ | $0$ | $2$ |
| $2$ | $2$ | $0$ |

Sur cette petite table, tout est là : la loi est interne (aucune case ne s'échappe), $0$ est neutre (sa ligne recopie l'en-tête), et chaque élément a un symétrique **dans $H$** ($0$ le sien, $2$ le sien). L'associativité ? Elle est déjà vraie dans $\mathbb{Z}/4\mathbb{Z}$ tout entier — donc en particulier pour les éléments de $H$, qui sont des éléments de $\mathbb{Z}/4\mathbb{Z}$ comme les autres. $(H,+)$ est un groupe. On dit que $H$ est un **sous-groupe** de $(\mathbb{Z}/4\mathbb{Z},+)$.

### La définition, et l'économie qu'elle autorise

**Définition.** Soit $(E,\star)$ un groupe et $H$ une partie de $E$. On dit que $H$ est un **sous-groupe** de $(E,\star)$ lorsque $(H,\star)$ est **lui-même un groupe**, pour la même loi $\star$ restreinte à $H$.

Rien de plus : "sous-groupe" ne désigne pas une structure nouvelle, c'est le mot qui dit "groupe, un cran plus bas". C'est pour ça que le geste te sera familier — c'est la liste de contrôle du R3, appliquée à $H$ au lieu de $E$.

Mais cette liste, tu n'as pas à la repasser en entier, et c'est tout l'intérêt du chapitre. Regarde ce que $H$ reçoit **gratuitement** de $E$, et ce qu'il doit gagner lui-même :

- **L'associativité est héritée, toujours.** L'égalité $(x\star y)\star z = x\star(y\star z)$ est vraie pour **tous** les éléments de $E$. Les éléments de $H$ sont des éléments de $E$. Donc elle est vraie pour eux aussi, sans une ligne de calcul.
- **La stabilité, elle, n'est pas héritée.** $x\star y$ est bien dans $E$ — mais rien ne garantit qu'il retombe dans $H$.
- **Le neutre non plus.** $e$ existe dans $E$, mais il peut très bien ne pas appartenir à $H$.
- **Les symétriques non plus.** Le symétrique de $x$ existe dans $E$, mais il peut sortir de $H$.

Trois questions au lieu de quatre — et les trois qui restent posent toutes la même question : **est-ce qu'on sort de $H$ ?**

**Critère du sous-groupe.** Soit $(E,\star)$ un groupe de neutre $e$, et $H$ une partie de $E$. Alors $H$ est un sous-groupe de $(E,\star)$ si et seulement si :

1. $e \in H$ (ce qui assure au passage que $H$ n'est pas vide) ;
2. pour tous $x,y \in H$ : $x \star y \in H$ ;
3. pour tout $x \in H$ : le symétrique $x'$ de $x$ appartient à $H$.

### Exemple travaillé, dans l'habillage de l'examen

**Ce qu'on cherche et pourquoi ce geste :** les sujets ne présentent presque jamais $H$ par la liste de ses éléments — ils le décrivent par une **forme** ("les matrices qui s'écrivent comme ceci", "les complexes dont la partie réelle vaut $1$"). Vérifier la stabilité, c'est alors combiner deux éléments de cette forme et regarder si le résultat garde la même forme.

Dans $(M_2(\mathbb{R}),+)$ — un groupe commutatif, puisque l'addition matricielle se fait coefficient par coefficient et hérite tout de $(\mathbb{R},+)$ — considère

$$F = \left\{ M(a,b) = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \ /\ (a,b) \in \mathbb{Z}^2 \right\}$$

et montrons que $F$ est un sous-groupe de $(M_2(\mathbb{R}),+)$.

1. **Le neutre.** Le neutre de $(M_2(\mathbb{R}),+)$ est la matrice nulle $O$. Or $O = M(0,0)$, et $(0,0) \in \mathbb{Z}^2$ : donc $O \in F$. ✓
2. **La stabilité.** Prends deux éléments quelconques de $F$ — deux, écrits avec des lettres différentes, jamais deux fois le même :

$$M(a,b) + M(c,d) = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} + \begin{pmatrix} c & -d \\ d & c \end{pmatrix} = \begin{pmatrix} a+c & -(b+d) \\ b+d & a+c \end{pmatrix} = M(a+c,\ b+d)$$

Le résultat a exactement la forme $M(\cdot,\cdot)$, et ses deux paramètres $a+c$ et $b+d$ sont des entiers, puisque $\mathbb{Z}$ est stable pour $+$. Donc $M(a,b)+M(c,d) \in F$. ✓

3. **Les symétriques.** Le symétrique de $M(a,b)$ pour $+$ est son opposé $-M(a,b)$, qui vaut $M(-a,-b)$ — encore de la forme voulue, avec $-a$ et $-b$ entiers. Donc $-M(a,b) \in F$. ✓

Les trois conditions tiennent : $F$ est un sous-groupe de $(M_2(\mathbb{R}),+)$, donc $(F,+)$ est un groupe. Remarque surtout ce qui n'a **pas** été écrit : pas une ligne sur l'associativité de $+$, pas une ligne sur sa commutativité. Elles sont vraies dans $M_2(\mathbb{R})$ tout entier, donc dans $F$.

### Quand la loi est $\times$ : le symétrique devient le vrai travail

Pour une loi additive, le symétrique est l'opposé, et il se lit tout de suite. Pour une loi multiplicative, il faut le **calculer**, puis vérifier qu'il a encore la bonne forme — c'est presque toujours là que se joue la question.

Dans $(\mathbb{R}^*,\times)$, prends $H = \{2^n \ /\ n \in \mathbb{Z}\}$.

- Neutre : le neutre de $\times$ est $1$, et $1 = 2^0$ avec $0 \in \mathbb{Z}$, donc $1 \in H$. ✓
- Stabilité : $2^n \times 2^m = 2^{n+m}$, et $n+m \in \mathbb{Z}$. ✓
- Symétrique : le symétrique de $2^n$ pour $\times$ est $\dfrac{1}{2^n} = 2^{-n}$, et $-n \in \mathbb{Z}$ — il est encore dans $H$. ✓

$H$ est un sous-groupe de $(\mathbb{R}^*,\times)$. Ce qu'il faut retenir n'est pas le résultat, c'est le geste de la troisième ligne : on écrit le symétrique, on le **transforme** jusqu'à lui faire retrouver la forme qui définit $H$, et c'est cette réécriture qui prouve l'appartenance. Quand $H$ est décrit par une écriture du type $x+y\sqrt3$ ou $x+yi$, cette réécriture passe presque toujours par la multiplication haut et bas par la quantité conjuguée — la même technique de rationalisation que tu connais déjà.

### Une vérification qu'on oublie : $H$ est-il bien inclus dans $E$ ?

Quand le sujet décrit $H$ par une forme différente de celle de $E$ — par exemple $G = \{1+yi \ /\ y \in \mathbb{R}\}$, présenté comme sous-ensemble de l'ensemble $E$ des complexes de partie réelle strictement positive — l'inclusion $H \subset E$ n'est pas gratuite : elle se justifie en une ligne (ici, la partie réelle de $1+yi$ vaut $1$, qui est bien strictement positif). Une ligne, mais elle manque souvent, et sans elle la phrase "sous-groupe de $(E,\star)$" n'a pas de sens : on ne peut pas être un groupe *à l'intérieur* d'un ensemble auquel on n'appartient même pas.

### L'erreur fréquente : deux conditions sur trois

Prends $(\mathbb{Z},+)$, qui est un groupe, et $H = \mathbb{N}$. Vérifie :

- Le neutre : $0 \in \mathbb{N}$. ✓
- La stabilité : la somme de deux entiers naturels est un entier naturel. ✓
- Les symétriques : le symétrique de $3$ pour $+$ est $-3$, et $-3 \notin \mathbb{N}$. ✗

Deux conditions sur trois, et pourtant $\mathbb{N}$ n'est **pas** un sous-groupe de $(\mathbb{Z},+)$ — il suffit d'un seul élément dont le symétrique s'échappe. C'est exactement l'exigence du quatrième axiome du R3 : "**tout** élément possède un symétrique", jamais "certains éléments". Et c'est la condition qu'on oublie le plus, parce que la stabilité, elle, saute aux yeux.

L'erreur inverse coûte moins cher mais se voit tout autant : repartir de zéro et rédiger une démonstration de l'associativité sur $H$ — le plus souvent en la testant sur un seul triplet, ce qui ne prouve rien (R2). L'associativité s'hérite ; le reste se vérifie.

### Ce que tu gagnes une fois le sous-groupe établi

Le mot n'est pas qu'une étiquette. Dès que $H$ est reconnu comme sous-groupe de $(E,\star)$, tu disposes sur $H$ de tout ce qu'un groupe garantit — et la commutativité s'hérite exactement comme l'associativité : si $x\star y = y \star x$ vaut pour tous les éléments de $E$, elle vaut en particulier pour ceux de $H$. Un sous-groupe d'un groupe commutatif est donc **automatiquement** commutatif. C'est ce qui permet d'enchaîner, dans un sujet, "$H$ est un sous-groupe de $(\mathbb{R}^*,\times)$, qui est commutatif, donc $(H,\times)$ est un groupe commutatif" — sans rien revérifier.

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

[[figure:table-multiplication-modulo4]]

---

## Anneau intègre : quand un produit nul force un facteur nul

### Un réflexe du collège, mis à l'épreuve

Pour résoudre $(x-2)(x+3)=0$, tu utilises depuis des années une règle si familière qu'elle ne se dit même plus : un produit est nul seulement si l'un de ses facteurs l'est. Question : est-ce une conséquence des **axiomes de l'anneau**, ou une propriété particulière de $\mathbb{R}$ ?

Regarde la table de $\times$ construite au R5 pour $(\mathbb{Z}/4\mathbb{Z},+,\times)$, à la case ligne $2$, colonne $2$ :

$$2 \times 2 = 4 \equiv 0 \pmod 4$$

Deux facteurs valant $2$, donc non nuls, et un produit nul. La règle du collège est **fausse** dans cet anneau. Elle ne découle donc pas des trois axiomes du R5 : c'est une propriété supplémentaire, que certains anneaux possèdent et d'autres non. Elle a un nom.

### Les définitions

**Définition.** Soit $(E,+,\times)$ un anneau, de neutre additif $0$. Un élément $x \in E$ est un **diviseur de zéro** si $x \neq 0$ et s'il existe $y \in E$, avec $y \neq 0$, tel que $x \times y = 0$.

**Définition.** L'anneau $(E,+,\times)$ est **intègre** s'il ne possède **aucun** diviseur de zéro, c'est-à-dire si :

$$\text{pour tous } x,y \in E, \qquad x \times y = 0 \ \Longrightarrow\ x = 0 \ \text{ ou } \ y = 0$$

Dans les énoncés d'examen, "intègre" arrive presque toujours accompagné de deux autres adjectifs. Un anneau est dit **unitaire** quand $\times$ possède un élément neutre, noté $1$, et **commutatif** quand $\times$ est commutative — ni l'un ni l'autre n'est exigé par la définition de base du R5, et c'est pour ça que l'énoncé prend la peine de les annoncer. "Anneau commutatif unitaire et intègre" est la formule complète que tu liras en tête de sujet à propos de $(\mathbb{Z},+,\times)$. Mais c'est bien le troisième mot qui fait tout le travail dans les questions.

Avec cette définition, deux exemples déjà rencontrés se rangent d'un coup :

- $(\mathbb{Z},+,\times)$ **est** intègre : un produit de deux entiers non nuls n'est jamais nul.
- $(\mathbb{Z}/4\mathbb{Z},+,\times)$ n'est **pas** intègre : $2$ y est un diviseur de zéro, le calcul ci-dessus vient de l'établir.

Un anneau intègre n'est donc pas un anneau "meilleur" au sens vague : c'est un anneau où tu as le droit de raisonner sur les produits nuls comme tu le fais dans $\mathbb{R}$.

### Le geste : montrer qu'un anneau n'est pas intègre

**Ce qu'on cherche et pourquoi ce geste :** l'intégrité est une propriété universelle ("pour tous $x,y$…"). Pour la **réfuter**, un seul couple suffit — exactement comme un seul contre-exemple a suffi, au R2, à casser l'associativité de la division. Il n'y a rien à démontrer en général : il faut **exhiber** deux éléments non nuls dont le produit est nul, et dire explicitement pourquoi chacun des deux est non nul.

Dans $(M_2(\mathbb{R}),+,\times)$ :

$$\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \times \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} = O$$

Les deux facteurs sont non nuls — chacun a un coefficient égal à $1$ — et leur produit est la matrice nulle : $(M_2(\mathbb{R}),+,\times)$ n'est pas intègre. Retiens ce fait, il oriente la lecture de tout un sujet : **un ensemble de matrices n'a aucune raison d'être intègre**, alors qu'un ensemble de nombres réels ou complexes, lui, l'est toujours.

Un mot sur la rédaction : "$M \neq O$" ne se dit pas "on le voit", ça se justifie — en pointant un coefficient non nul, ou une condition donnée par l'énoncé. Et dans un sujet, la question qui précède te tend souvent le couple tout fait ("Vérifier que $M \times N = O$") : ce cadeau est le signal que la question suivante va te demander d'en déduire quelque chose sur l'intégrité, ou sur le fait que la structure n'est pas un corps.

### Le geste inverse : montrer qu'un anneau est intègre

Ici, un exemple ne suffit plus : la propriété doit tenir pour **tous** les couples. Deux voies, et la première est presque toujours la bonne quand elle est disponible.

**Voie 1 — l'héritage.** Si $E$ est contenu dans un anneau déjà connu comme intègre, muni des mêmes lois, alors $E$ est intègre sans rien de plus à faire : l'implication "$x \times y = 0 \Rightarrow x=0$ ou $y=0$" est vraie pour tous les éléments du grand ensemble, donc en particulier pour ceux de $E$. C'est le même argument d'héritage qu'au R2 pour l'associativité. Exemple : $A = \{a+b\sqrt2 \ /\ (a,b) \in \mathbb{Z}^2\}$ est contenu dans $\mathbb{R}$, où un produit de deux nombres non nuls n'est jamais nul — $A$ est intègre, en une ligne.

**Voie 2 — quand l'héritage ne joue pas.** C'est le cas d'un ensemble de matrices : $M_2(\mathbb{R})$ n'étant pas lui-même intègre, il n'y a rien à hériter, et la démonstration doit être menée sur $E$. On part alors de l'hypothèse $M \times N = O$, avec $M$ et $N$ dans $E$, et on cherche à en tirer $M = O$ ou $N = O$ — le plus souvent en traduisant "être la matrice nulle" par une condition **numérique** sur les paramètres qui décrivent $E$, puis en raisonnant sur ces nombres, où le réflexe du collège, lui, est parfaitement légitime.

### L'erreur fréquente : garder les réflexes de $\mathbb{R}$ sans vérifier qu'on y a droit

Résous $x^2 = 0$ dans $\mathbb{Z}/4\mathbb{Z}$. Le réflexe répond "$x = 0$, et c'est tout". La table du R5 dit autre chose : $2 \times 2 = 0$, donc $x=2$ est une seconde solution. Dans un anneau non intègre, une factorisation ne donne plus la liste complète des solutions — elle n'en donne que certaines.

Deuxième réflexe à surveiller, le même en miroir : **simplifier par un facteur**. Toujours dans $\mathbb{Z}/4\mathbb{Z}$, lis la ligne du $2$ : $2 \times 1 = 2$ et $2 \times 3 = 2$. Les deux membres sont égaux, le facteur $2$ est non nul, et pourtant $1 \neq 3$ — on ne peut pas simplifier. Dans un anneau **intègre**, en revanche, on le peut, et la raison est exactement l'intégrité : de $a \times x = a \times y$ on tire $a \times (x - y) = 0$ par distributivité, donc, si $a \neq 0$, $x - y = 0$, c'est-à-dire $x = y$.

Dernière confusion à écarter, et elle porte sur les mots eux-mêmes : intègre ne signifie **pas** "tout élément non nul est inversible". $(\mathbb{Z},+,\times)$ est intègre, et pourtant $2$ n'y a pas de symétrique pour $\times$. Ce sont deux exigences distinctes, et la seconde est la plus forte des deux — c'est elle qui définit la structure du chapitre suivant.

### Pourquoi l'intégrité décide du sort des corps

Deux faits, dans l'ordre.

**Premier fait : dans tout anneau, $x \times 0 = 0$.** Ce n'est pas un axiome, ça se démontre — et la démonstration mérite d'être vue, parce qu'elle montre comment les deux lois d'un anneau se parlent. Pars de $0 = 0+0$ (définition du neutre de $+$), multiplie par $x$ et distribue :

$$x \times 0 = x \times (0+0) = x \times 0 + x \times 0$$

Maintenant, $(E,+)$ est un groupe : l'élément $x \times 0$ y possède un symétrique. Ajoute ce symétrique aux deux membres, et il reste $0 = x \times 0$.

**Deuxième fait : un élément non nul qui possède un symétrique pour $\times$ ne peut pas être un diviseur de zéro.** Suppose $x$ inversible, de symétrique $x'$, et suppose $x \times y = 0$. Multiplie les deux membres par $x'$ à gauche :

$$x' \times (x \times y) = x' \times 0 = 0$$

L'associativité de $\times$ (axiome 2 du R5) permet de redéplacer les parenthèses : $x' \times (x \times y) = (x' \times x) \times y = 1 \times y = y$. Les deux calculs portent sur la même quantité, donc $y = 0$ — l'autre facteur était forcément nul.

La conséquence tombe toute seule, et c'est elle que les sujets exploitent. Le chapitre suivant (R6) demande, pour un **corps**, que *tout* élément non nul possède un symétrique pour $\times$. Si un seul couple d'éléments non nuls de $E$ a un produit nul, alors aucun des deux n'est inversible, et l'exigence échoue : **exhiber un diviseur de zéro, c'est réfuter le corps d'un seul coup**, sans avoir à examiner les autres éléments un par un.

Attention à ne pas retourner l'implication. Tout corps est intègre — c'est ce qu'on vient de démontrer — mais un anneau intègre n'est pas pour autant un corps : $(\mathbb{Z},+,\times)$ est intègre et n'est pas un corps. Entre l'anneau et le corps, l'intégrité est un barreau intermédiaire : plus exigeante que l'anneau, moins exigeante que le corps.

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

[[figure:echelle-structures]]

[[checkpoint:cp-r6-structures]]

---

## R7 — Isomorphisme et exercices de type bac

Tu as maintenant tout l'outillage du chapitre : reconnaître une loi de composition interne (R1), tester ses propriétés (R2), et cocher les axiomes qui font d'un ensemble un groupe, un anneau ou un corps (R3 à R6). Il reste un dernier geste, celui qui revient presque chaque année à l'examen national des Sciences Mathématiques : montrer que deux structures d'apparence différente — l'une habillée en nombres complexes, l'autre en matrices — sont en réalité la même.

### Un pont entre deux structures : l'isomorphisme

Imagine deux groupes $(E, \star)$ et $(F, \times)$, et une application $\varphi : E \to F$ qui soit à la fois **bijective** (elle apparie un à un les éléments des deux ensembles) et **morphisme** — c'est-à-dire qu'elle respecte les lois :

$$\varphi(x \star y) = \varphi(x) \times \varphi(y)$$

Une telle application s'appelle un **isomorphisme**. Son intérêt est considérable : si $(E, \star)$ est déjà connu comme groupe commutatif, alors $\varphi$ **transporte** toute cette structure sur $(F, \times)$ — commutativité, neutre et symétriques compris. On n'a pas à re-vérifier les quatre axiomes un par un sur $F$ : il suffit d'exhiber l'isomorphisme. C'est exactement la stratégie de la dernière question du sujet qui suit.

[[checkpoint:cp-r7-morphisme]]

### Exercice de type bac

L'exercice ci-dessous est un sujet d'examen national (Sciences Mathématiques, session normale 2019). Cherche-le toi-même, question par question, avant de dérouler le raisonnement expert : c'est en butant, puis en te corrigeant, que le geste s'installe pour de bon.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même chaîne d'outils, un habillage différent : une autre loi, d'autres matrices, et un isomorphisme sans carré. Si tu as compris la méthode plutôt que retenu les nombres du sujet 2019, celle-ci ne te résistera pas.

[[exercise:r-variation]]
