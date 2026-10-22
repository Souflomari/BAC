# Structures algébriques

---

## R0 — Accroche : l'horloge qui boucle

Il est 9h. Dans 5 heures, quelle heure sera-t-il ?

Réponse immédiate : 14h, bien sûr, $9+5=14$. Mais regarde une horloge à cadran, avec 12 graduations numérotées de $0$ à $11$ : personne ne dit "il est 14h" — on dit "il est 2h". L'horloge a bouclé : une fois qu'on dépasse $11$, on repart de $0$.

Sur cette horloge, "ajouter 5 heures à 9h" donne 2h, parce que $9+5=14$ et que $14$ divisé par $12$ laisse un reste de $2$. Autrement dit, on ne calcule pas $9+5$ dans $\mathbb{Z}$ tout court : on calcule $9+5$, puis on ne garde que le reste modulo $12$. Tu connais déjà cette idée — c'est la congruence, de la leçon précédente.

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

Regarde la table de $(\mathbb{Z}/4\mathbb{Z},+)$ construite au chapitre 2 : la case $(1,3)$ contient $0$, et sa réflexion, la case $(3,1)$, contient aussi $0$. Teste une autre paire : $(2,3)$ donne $1$, et $(3,2)$ donne aussi $1$. La table entière est symétrique — $+$ est commutative sur $\mathbb{Z}/4\mathbb{Z}$. Ce n'est pas surprenant : l'addition sur $\mathbb{Z}$ est déjà commutative, et cette propriété se transmet telle quelle à l'addition modulo $n$.

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

### Un exemple donné par une formule, pas par une table

Tout ce qui précède se lisait sur une table finie. Beaucoup de sujets nationaux donnent la loi par une **formule**, sur un ensemble infini — il n'y a plus de table à consulter, seulement les mêmes quatre définitions du chapitre, appliquées à un calcul littéral.

Pose $E = \mathbb{R}\setminus\{-1\}$ et, pour tous $x,y \in E$ :

$$x \ast y = x+y+xy$$

**Stabilité.** Il faut d'abord vérifier que $x \ast y$ ne s'échappe jamais de $E$, c'est-à-dire que $x \ast y \neq -1$. Ajoute $1$ des deux côtés de la définition :

$$x \ast y + 1 = x+y+xy+1 = (x+1)(y+1)$$

Comme $x \neq -1$ et $y \neq -1$, les deux facteurs $x+1$ et $y+1$ sont non nuls, donc leur produit l'est aussi : $x \ast y + 1 \neq 0$, c'est-à-dire $x \ast y \neq -1$. $\ast$ est bien une LCI sur $E$.

**Commutativité.** $x \ast y = x+y+xy = y+x+yx = y \ast x$ : héritée directement de la commutativité de $+$ et de $\times$ sur $\mathbb{R}$.

**Associativité, par expansion directe.** On développe les deux membres, pour des $x,y,z$ quelconques de $E$ :

$$(x\ast y)\ast z = (x+y+xy)+z+(x+y+xy)z = x+y+z+xy+xz+yz+xyz$$

$$x\ast(y\ast z) = x+(y+z+yz)+x(y+z+yz) = x+y+z+yz+xy+xz+xyz$$

Les deux membres sont exactement la même somme de sept termes : $\ast$ est associative sur $E$.

**Le raccourci de l'expert, une fois l'expansion vue.** La stabilité a révélé une identité qu'on peut réutiliser : $x\ast y+1=(x+1)(y+1)$. Pose $\varphi(x)=x+1$ ; cette identité dit que $\varphi(x\ast y)=\varphi(x)\times\varphi(y)$ — combiner par $\ast$, c'est multiplier les images par $\varphi$. L'associativité de $\ast$ se relit alors sans développer un seul terme, en appliquant cette identité deux fois, une transformation à la fois :

$$\varphi\big((x\ast y)\ast z\big) = \varphi(x\ast y)\times\varphi(z)$$

$$\varphi(x\ast y)\times\varphi(z) = \big(\varphi(x)\varphi(y)\big)\times\varphi(z)$$

$$\big(\varphi(x)\varphi(y)\big)\times\varphi(z) = \varphi(x)\varphi(y)\varphi(z)$$

et le même calcul à partir de $\varphi\big(x\ast(y\ast z)\big)$ donne le même produit $\varphi(x)\varphi(y)\varphi(z)$ — symétrique en $x,y,z$ par l'associativité (et la commutativité) de $\times$ sur $\mathbb{R}$, donc acquis d'un coup, dans les deux ordres de parenthésage à la fois.

**L'élément neutre, et le piège à éviter.** On cherche $e$ tel que $x\ast e=x$ **pour tout** $x$ de $E$ :

$$x+e+xe = x \iff e+xe=0 \iff e(1+x)=0$$

**Le piège : s'arrêter après avoir résolu pour une seule valeur de $x$.** Choisir un $x$ précis — par exemple $x=1$, ce qui donne $e(2)=0$ donc $e=0$ — ne prouve la relation que pour ce $x$-là, pas pour tous les autres ; un seul cas ne prouve jamais une propriété universelle, exactement comme un seul triplet ne prouvait rien pour l'associativité un peu plus haut. La bonne méthode garde $x$ générique : $e(1+x)=0$ doit tenir pour **tout** $x$ de $E$, or $1+x$ n'est jamais nul sur $E$ (puisque $x\neq-1$) — la seule valeur de $e$ qui annule le produit quel que soit $x$ est donc $e=0$. Vérifie : $x\ast0 = x+0+0=x$. ✓ Le neutre de $(E,\ast)$ est $0$.

**Le symétrique, par résolution.** Pour $x$ fixé, on cherche $x'$ tel que $x\ast x' = 0$ :

$$x+x'+xx' = 0 \iff x'(1+x) = -x \iff x' = \frac{-x}{1+x}$$

(la division est légitime car $1+x\neq0$ sur $E$). Il reste à vérifier que $x'$ ne s'échappe pas de $E$ : $x'=-1 \iff -x=-(1+x) \iff 0=-1$, impossible — donc $x'\neq-1$ pour tout $x$ de $E$, et le symétrique existe bien dans $E$.

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

**Ce qu'on cherche et pourquoi ce geste :** passer les quatre axiomes en revue, un par un, en s'appuyant sur ce qu'on a déjà établi aux chapitres 2 et 3 — vérifier un groupe n'est jamais un acte de foi, c'est une liste de contrôle qu'on parcourt entièrement.

1. **Loi interne :** montré au chapitre 2 — toutes les cases de la table sont dans $\{0,1,2,3\}$. ✓
2. **Associative :** montrée au chapitre 3 — héritée de l'associativité de $+$ sur $\mathbb{Z}$. ✓
3. **Élément neutre :** montré au chapitre 3 — c'est $0$. ✓
4. **Symétrique pour chaque élément :** montré au chapitre 3, et il faut vérifier les **quatre** éléments, pas seulement un ou deux : $0$ a pour symétrique $0$, $1$ a pour symétrique $3$, $2$ a pour symétrique $2$, $3$ a pour symétrique $1$. Chacun des quatre éléments a bien un symétrique. ✓

Les quatre conditions sont vérifiées : $(\mathbb{Z}/4\mathbb{Z}, +)$ **est un groupe**.

**Retour à l'horloge.** Les heures d'une montre à $12$ graduations, munies de l'addition modulo $12$, forment exactement ce qu'on vient de vérifier ici pour $\mathbb{Z}/4\mathbb{Z}$, mais avec $n=12$ à la place de $n=4$ : un groupe. Voilà pourquoi, dès le chapitre 1, l'addition d'heures avait toutes les bonnes propriétés — ce n'était pas un hasard, c'était un groupe, comme n'importe quel $(\mathbb{Z}/n\mathbb{Z}, +)$.

### Un second exemple : un groupe de symétries

Le mot "symétrique", au sens algébrique du chapitre 3, n'a rien à voir a priori avec les symétries géométriques — mais un ensemble de transformations géométriques peut, lui aussi, former un groupe. Regardons.

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

Reprends $(\mathbb{Z}/4\mathbb{Z},+)$ et sa table du chapitre 2, mais ne regarde que les deux éléments $H = \{0,2\}$. Combine-les entre eux, en lisant les cases correspondantes :

$$0+0=0, \qquad 0+2=2, \qquad 2+0=2, \qquad 2+2=0$$

Quatre combinaisons, quatre résultats — et les quatre sont dans $H$. La table de $H$ est donc un tableau complet, autonome, qui ne sort jamais de $H$ :

| $+$ | $0$ | $2$ |
|---|---|---|
| $0$ | $0$ | $2$ |
| $2$ | $2$ | $0$ |

Sur cette petite table, tout est là : la loi est interne (aucune case ne s'échappe), $0$ est neutre (sa ligne recopie l'en-tête), et chaque élément a un symétrique **dans $H$** ($0$ le sien, $2$ le sien). L'associativité ? Elle est déjà vraie dans $\mathbb{Z}/4\mathbb{Z}$ tout entier — donc en particulier pour les éléments de $H$, qui sont des éléments de $\mathbb{Z}/4\mathbb{Z}$ comme les autres. $(H,+)$ est un groupe. On dit que $H$ est un **sous-groupe** de $(\mathbb{Z}/4\mathbb{Z},+)$.

### La définition, et l'économie qu'elle autorise

**Définition.** Soit $(E,\star)$ un groupe et $H$ une partie de $E$. On dit que $H$ est un **sous-groupe** de $(E,\star)$ lorsque $(H,\star)$ est **lui-même un groupe**, pour la même loi $\star$ restreinte à $H$.

Rien de plus : "sous-groupe" ne désigne pas une structure nouvelle, c'est le mot qui dit "groupe, un cran plus bas". C'est pour ça que le geste te sera familier — c'est la liste de contrôle du chapitre 4, appliquée à $H$ au lieu de $E$.

Mais cette liste, tu n'as pas à la repasser en entier, et c'est tout l'intérêt du chapitre. Regarde ce que $H$ reçoit **gratuitement** de $E$, et ce qu'il doit gagner lui-même :

- **L'associativité est héritée, toujours.** L'égalité $(x\star y)\star z = x\star(y\star z)$ est vraie pour **tous** les éléments de $E$. Les éléments de $H$ sont des éléments de $E$. Donc elle est vraie pour eux aussi, sans une ligne de calcul.
- **La stabilité, elle, n'est pas héritée.** $x\star y$ est bien dans $E$ — mais rien ne garantit qu'il retombe dans $H$.
- **Le neutre non plus.** $e$ existe dans $E$, mais il peut très bien ne pas appartenir à $H$.
- **Les symétriques non plus.** Le symétrique de $x$ existe dans $E$, mais il peut sortir de $H$.

**Attention à ce que l'héritage ne dit PAS.** « L'associativité descend de $E$ vers $H$ » est vrai, et c'est tout ce que ça dit. La réciproque est fausse : une loi peut être associative **sur une partie** sans l'être partout. Un sujet d'examen a exactement joué là-dessus — session de rattrapage 2023, exercice 3 : une même loi $T$ y est montrée non associative sur l'ensemble entier, puis associative sur une partie quelques questions plus loin. Ce n'est pas une contradiction : le contre-exemple qui casse l'associativité globale utilise **au moins un** élément qui n'appartient pas à la partie. Quand deux questions voisines semblent se contredire sur une propriété, regarde toujours **où vivent** les éléments du contre-exemple.

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

$H$ est un sous-groupe de $(\mathbb{R}^*,\times)$. Ce qu'il faut retenir n'est pas le résultat, c'est le geste de la troisième ligne : on écrit le symétrique, on le **transforme** jusqu'à lui faire retrouver la forme qui définit $H$, et c'est cette réécriture qui prouve l'appartenance. Quand $H$ est décrit par une écriture du type $x+y\sqrt3$ ou $x+yi$, cette réécriture peut passer par la multiplication haut et bas par la quantité conjuguée — la même technique de rationalisation que tu connais déjà. Ce n'est pas la seule voie (le sujet du chapitre 10 s'en passe), mais c'est celle à laquelle on pense le moins vite.

### Une vérification qu'on oublie : $H$ est-il bien inclus dans $E$ ?

Quand le sujet décrit $H$ par une forme différente de celle de $E$ — par exemple $G = \{1+yi \ /\ y \in \mathbb{R}\}$, présenté comme sous-ensemble de l'ensemble $E$ des complexes de partie réelle strictement positive — l'inclusion $H \subset E$ n'est pas gratuite : elle se justifie en une ligne (ici, la partie réelle de $1+yi$ vaut $1$, qui est bien strictement positif). Une ligne, mais elle manque souvent, et sans elle la phrase "sous-groupe de $(E,\star)$" n'a pas de sens : on ne peut pas être un groupe *à l'intérieur* d'un ensemble auquel on n'appartient même pas.

### L'erreur fréquente : deux conditions sur trois

Prends $(\mathbb{Z},+)$, qui est un groupe, et $H = \mathbb{N}$. Vérifie :

- Le neutre : $0 \in \mathbb{N}$. ✓
- La stabilité : la somme de deux entiers naturels est un entier naturel. ✓
- Les symétriques : le symétrique de $3$ pour $+$ est $-3$, et $-3 \notin \mathbb{N}$. ✗

Deux conditions sur trois, et pourtant $\mathbb{N}$ n'est **pas** un sous-groupe de $(\mathbb{Z},+)$ — il suffit d'un seul élément dont le symétrique s'échappe. C'est exactement l'exigence du quatrième axiome du chapitre 4 : "**tout** élément possède un symétrique", jamais "certains éléments". Et c'est la condition qu'on oublie le plus, parce que la stabilité, elle, saute aux yeux.

L'erreur inverse coûte moins cher mais se voit tout autant : repartir de zéro et rédiger une démonstration de l'associativité sur $H$ — le plus souvent en la testant sur un seul triplet, ce qui ne prouve rien (chapitre 3). L'associativité s'hérite ; le reste se vérifie.

### Ce que tu gagnes une fois le sous-groupe établi

Le mot n'est pas qu'une étiquette. Dès que $H$ est reconnu comme sous-groupe de $(E,\star)$, tu disposes sur $H$ de tout ce qu'un groupe garantit — et la commutativité s'hérite exactement comme l'associativité : si $x\star y = y \star x$ vaut pour tous les éléments de $E$, elle vaut en particulier pour ceux de $H$. Un sous-groupe d'un groupe commutatif est donc **automatiquement** commutatif. C'est ce qui permet d'enchaîner, dans un sujet, "$H$ est un sous-groupe de $(\mathbb{R}^*,\times)$, qui est commutatif, donc $(H,\times)$ est un groupe commutatif" — sans rien revérifier.

---

## R4 — Groupe commutatif (abélien)

### La définition

**Définition.** Un groupe $(E, \star)$ est **commutatif** (on dit aussi **abélien**) si, de plus, $\star$ est commutative :

$$\text{pour tous } x,y \in E, \qquad x \star y = y \star x$$

**Le mécanisme pour le vérifier :** exactement celui du chapitre 3 — la table est symétrique par rapport à sa diagonale principale.

Regarde les deux tables construites jusqu'ici. Celle de $(\mathbb{Z}/4\mathbb{Z}, +)$, au chapitre 2, est symétrique (déjà vérifié au chapitre 3). Celle du groupe des symétries du rectangle, au chapitre 4, l'est aussi : compare, par exemple, la case $(s_h, r)$, qui contient $s_v$, et sa réflexion $(r, s_h)$, qui contient également $s_v$. Les deux groupes rencontrés jusqu'ici sont donc **abéliens**.

### Un contre-exemple : la composition n'est pas commutative en général

Attention à ne pas conclure trop vite que "composer, c'est toujours commutatif" — le groupe des symétries du rectangle est un cas particulier, pas la règle générale. Prends deux fonctions bien connues, définies sur $\mathbb{R}$ : $f(x) = x+1$ et $g(x)=2x$. Calculons $f \circ g$ et $g \circ f$.

$$(f \circ g)(x) = f(g(x)) = f(2x) = 2x+1$$

$$(g \circ f)(x) = g(f(x)) = g(x+1) = 2(x+1) = 2x+2$$

Pour $x=0$ par exemple, $(f\circ g)(0) = 1$ alors que $(g \circ f)(0) = 2$ : les deux fonctions composées sont différentes. La composition de fonctions **n'est pas commutative** en général — même si elle reste toujours associative (fait admis au chapitre 4). Associativité et commutativité sont deux propriétés indépendantes : une loi peut avoir l'une sans l'autre. C'est précisément pour ça que "groupe commutatif" mérite son propre nom : ce n'est pas automatique dès qu'on a un groupe.

---

## R5 — La structure d'anneau

### La définition

Un anneau met en jeu **deux** lois sur le même ensemble, notées en général $+$ et $\times$.

**Définition.** $(E, +, \times)$ est un **anneau** si :

1. $(E, +)$ est un **groupe commutatif** (on note $0$ son élément neutre) ;
2. $\times$ est **associative** sur $E$ ;
3. $\times$ est **distributive** par rapport à $+$, à gauche et à droite : pour tous $x,y,z \in E$,

$$x \times (y+z) = x \times y + x \times z \qquad \text{et} \qquad (y+z) \times x = y \times x + z \times x$$

Remarque la dissymétrie voulue entre les deux lois : $+$ doit satisfaire les quatre axiomes complets du groupe (et être commutative), alors que $\times$ n'a besoin que d'être associative et de bien s'articuler avec $+$ par la distributivité. Rien n'exige, à ce stade, que $\times$ ait un neutre pour tout le monde, ni que chaque élément ait un symétrique pour $\times$ — ce sont des exigences plus fortes, réservées à la structure suivante (chapitre 9).

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

1. $(\mathbb{Z}/4\mathbb{Z}, +)$ est un groupe commutatif : déjà établi au chapitre 4. ✓
2. $\times$ est associative sur $\mathbb{Z}/4\mathbb{Z}$ : héritée de l'associativité de $\times$ sur $\mathbb{Z}$, exactement comme pour $+$ au chapitre 3. ✓
3. Distributivité, vérifiée sur un triplet : $2 \times (1+3) = 2 \times 0 = 0$ (car $1+3=4\equiv 0 \pmod 4$), et $2\times 1 + 2 \times 3 = 2+6=8 \equiv 0 \pmod 4$. Les deux membres valent $0$ : cohérent, pour la même raison d'héritage. ✓

$(\mathbb{Z}/4\mathbb{Z}, +, \times)$ **est un anneau**.

**Une observation qui va compter pour la suite.** Regarde la ligne du $1$ dans la table de $\times$ : elle recopie l'en-tête $0,1,2,3$ — $1$ est bien neutre pour $\times$. Mais est-ce que **chaque** élément a un symétrique pour $\times$ ? Regarde la ligne du $2$ : $2\times0=0$, $2\times1=2$, $2\times2=0$, $2\times3=2$ — jamais $1$. **$2$ n'a pas de symétrique pour $\times$.** Donc $(\mathbb{Z}/4\mathbb{Z}, \times)$, prise seule, **n'est pas un groupe** — l'axiome 4 échoue pour l'élément $2$ — alors même que $(\mathbb{Z}/4\mathbb{Z}, +, \times)$ est bel et bien un anneau. C'est exactement ce que la définition de l'anneau annonçait : rien n'exige que $\times$ forme un groupe. Un anneau n'est **pas** "deux lois qui sont chacune un groupe" — c'est un groupe commutatif pour $+$, accompagné d'une seconde loi $\times$ moins exigeante.

[[figure:table-multiplication-modulo4]]

---

## Anneau intègre : quand un produit nul force un facteur nul

### Un réflexe du collège, mis à l'épreuve

Pour résoudre $(x-2)(x+3)=0$, tu utilises depuis des années une règle si familière qu'elle ne se dit même plus : un produit est nul seulement si l'un de ses facteurs l'est. Question : est-ce une conséquence des **axiomes de l'anneau**, ou une propriété particulière de $\mathbb{R}$ ?

Regarde la table de $\times$ construite au chapitre 7 pour $(\mathbb{Z}/4\mathbb{Z},+,\times)$, à la case ligne $2$, colonne $2$ :

$$2 \times 2 = 4 \equiv 0 \pmod 4$$

Deux facteurs valant $2$, donc non nuls, et un produit nul. La règle du collège est **fausse** dans cet anneau. Elle ne découle donc pas des trois axiomes du chapitre 7 : c'est une propriété supplémentaire, que certains anneaux possèdent et d'autres non. Elle a un nom.

### Les définitions

**Définition.** Soit $(E,+,\times)$ un anneau, de neutre additif $0$. Un élément $x \in E$ est un **diviseur de zéro** si $x \neq 0$ et s'il existe $y \in E$, avec $y \neq 0$, tel que $x \times y = 0$.

**Définition.** L'anneau $(E,+,\times)$ est **intègre** s'il ne possède **aucun** diviseur de zéro, c'est-à-dire si :

$$\text{pour tous } x,y \in E, \qquad x \times y = 0 \ \Longrightarrow\ x = 0 \ \text{ ou } \ y = 0$$

Dans les énoncés d'examen, "intègre" arrive presque toujours accompagné de deux autres adjectifs. Un anneau est dit **unitaire** quand $\times$ possède un élément neutre, noté $1$, et **commutatif** quand $\times$ est commutative — ni l'un ni l'autre n'est exigé par la définition de base du chapitre 7, et c'est pour ça que l'énoncé prend la peine de les annoncer. "Anneau commutatif unitaire et intègre" est la formule complète que tu liras en tête de sujet à propos de $(\mathbb{Z},+,\times)$. Mais c'est bien le troisième mot qui fait tout le travail dans les questions.

Avec cette définition, deux exemples déjà rencontrés se rangent d'un coup :

- $(\mathbb{Z},+,\times)$ **est** intègre : un produit de deux entiers non nuls n'est jamais nul.
- $(\mathbb{Z}/4\mathbb{Z},+,\times)$ n'est **pas** intègre : $2$ y est un diviseur de zéro, le calcul ci-dessus vient de l'établir.

Un anneau intègre n'est donc pas un anneau "meilleur" au sens vague : c'est un anneau où tu as le droit de raisonner sur les produits nuls comme tu le fais dans $\mathbb{R}$.

### Le geste : montrer qu'un anneau n'est pas intègre

**Ce qu'on cherche et pourquoi ce geste :** l'intégrité est une propriété universelle ("pour tous $x,y$…"). Pour la **réfuter**, un seul couple suffit — exactement comme un seul contre-exemple a suffi, au chapitre 3, à casser l'associativité de la division. Il n'y a rien à démontrer en général : il faut **exhiber** deux éléments non nuls dont le produit est nul, et dire explicitement pourquoi chacun des deux est non nul.

Dans $(M_2(\mathbb{R}),+,\times)$ :

$$\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} \times \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} = O$$

Les deux facteurs sont non nuls — chacun a un coefficient égal à $1$ — et leur produit est la matrice nulle : $(M_2(\mathbb{R}),+,\times)$ n'est pas intègre. Retiens ce fait, il oriente la lecture de tout un sujet : **un ensemble de matrices n'est pas intègre par défaut** — ça se vérifie à chaque fois, et dans les deux sens (la section suivante montre justement comment prouver qu'un anneau de matrices **est** intègre) —, alors qu'un ensemble de nombres réels ou complexes **muni de l'addition et de la multiplication usuelles**, lui, l'est toujours. Cette dernière précision compte : dès qu'on pose une loi exotique, tout est à refaire.

Un mot sur la rédaction : "$M \neq O$" ne se dit pas "on le voit", ça se justifie — en pointant un coefficient non nul, ou une condition donnée par l'énoncé. Et dans un sujet, il arrive que la question qui précède te tende le couple tout fait ("Vérifier que $M \times N = O$") : ce cadeau est le signal que la question suivante va te demander d'en déduire quelque chose sur l'intégrité, ou sur le fait que la structure n'est pas un corps.

### Le geste inverse : montrer qu'un anneau est intègre

Ici, un exemple ne suffit plus : la propriété doit tenir pour **tous** les couples. Deux voies, et la première est presque toujours la bonne quand elle est disponible.

**Voie 1 — l'héritage.** Si $E$ est contenu dans un anneau déjà connu comme intègre, muni des mêmes lois, alors $E$ est intègre sans rien de plus à faire : l'implication "$x \times y = 0 \Rightarrow x=0$ ou $y=0$" est vraie pour tous les éléments du grand ensemble, donc en particulier pour ceux de $E$. C'est le même argument d'héritage qu'au chapitre 3 pour l'associativité. Exemple : $A = \{a+b\sqrt2 \ /\ (a,b) \in \mathbb{Z}^2\}$ est contenu dans $\mathbb{R}$, où un produit de deux nombres non nuls n'est jamais nul — $A$ est intègre, en une ligne.

**Voie 2 — quand l'héritage ne joue pas.** C'est le cas d'un ensemble de matrices : $M_2(\mathbb{R})$ n'étant pas lui-même intègre, il n'y a rien à hériter, et la démonstration doit être menée sur $E$. On part alors de l'hypothèse $M \times N = O$, avec $M$ et $N$ dans $E$, et on cherche à en tirer $M = O$ ou $N = O$ — le plus souvent en traduisant "être la matrice nulle" par une condition **numérique** sur les paramètres qui décrivent $E$, puis en raisonnant sur ces nombres, où le réflexe du collège, lui, est parfaitement légitime.

### L'erreur fréquente : garder les réflexes de $\mathbb{R}$ sans vérifier qu'on y a droit

Résous $x^2 = 0$ dans $\mathbb{Z}/4\mathbb{Z}$. Le réflexe répond "$x = 0$, et c'est tout". La table du chapitre 7 dit autre chose : $2 \times 2 = 0$, donc $x=2$ est une seconde solution. Dans un anneau non intègre, une factorisation ne donne plus la liste complète des solutions — elle n'en donne que certaines.

Deuxième réflexe à surveiller, le même en miroir : **simplifier par un facteur**. Toujours dans $\mathbb{Z}/4\mathbb{Z}$, lis la ligne du $2$ : $2 \times 1 = 2$ et $2 \times 3 = 2$. Les deux membres sont égaux, le facteur $2$ est non nul, et pourtant $1 \neq 3$ — on ne peut pas simplifier. Dans un anneau **intègre**, en revanche, on le peut, et la raison est exactement l'intégrité : de $a \times x = a \times y$ on tire $a \times (x - y) = 0$ par distributivité, donc, si $a \neq 0$, $x - y = 0$, c'est-à-dire $x = y$.

Dernière confusion à écarter, et elle porte sur les mots eux-mêmes : intègre ne signifie **pas** "tout élément non nul est inversible". $(\mathbb{Z},+,\times)$ est intègre, et pourtant $2$ n'y a pas de symétrique pour $\times$. Ce sont deux exigences distinctes, et la seconde est la plus forte des deux — c'est elle qui définit la structure du chapitre suivant.

### Pourquoi l'intégrité décide du sort des corps

Deux faits, dans l'ordre.

**Premier fait : dans tout anneau, $x \times 0 = 0$.** Ce n'est pas un axiome, ça se démontre — et la démonstration mérite d'être vue, parce qu'elle montre comment les deux lois d'un anneau se parlent. Pars de $0 = 0+0$ (définition du neutre de $+$), multiplie par $x$ et distribue :

$$x \times 0 = x \times (0+0) = x \times 0 + x \times 0$$

Maintenant, $(E,+)$ est un groupe : l'élément $x \times 0$ y possède un symétrique. Ajoute ce symétrique aux deux membres, et il reste $0 = x \times 0$.

**Deuxième fait : un élément non nul qui possède un symétrique pour $\times$ ne peut pas être un diviseur de zéro.** Suppose $x$ inversible, de symétrique $x'$, et suppose $x \times y = 0$. Multiplie les deux membres par $x'$ à gauche :

$$x' \times (x \times y) = x' \times 0 = 0$$

L'associativité de $\times$ (axiome 2 du chapitre 7) permet de redéplacer les parenthèses : $x' \times (x \times y) = (x' \times x) \times y = 1 \times y = y$. Les deux calculs portent sur la même quantité, donc $y = 0$ — l'autre facteur était forcément nul.

La conséquence tombe toute seule, et c'est elle que les sujets exploitent. Le chapitre suivant (chapitre 9) demande, pour un **corps**, que *tout* élément non nul possède un symétrique pour $\times$. Si un seul couple d'éléments non nuls de $E$ a un produit nul, alors aucun des deux n'est inversible, et l'exigence échoue : **exhiber un diviseur de zéro, c'est réfuter le corps d'un seul coup**, sans avoir à examiner les autres éléments un par un.

Attention à ne pas retourner l'implication. Tout corps est intègre — c'est ce qu'on vient de démontrer — mais un anneau intègre n'est pas pour autant un corps : $(\mathbb{Z},+,\times)$ est intègre et n'est pas un corps. Entre l'anneau et le corps, l'intégrité est un barreau intermédiaire : plus exigeante que l'anneau, moins exigeante que le corps.

---

## R6 — Corps : une brève mention

### La définition

**Définition.** Un anneau $(E, +, \times)$ est un **corps** si, de plus :

- $\times$ possède un **élément neutre**, noté $1$ — autrement dit l'anneau est **unitaire** (chapitre 8). Sans ce neutre, « symétrique pour $\times$ » ne voudrait rien dire : un symétrique se définit toujours *par rapport à un neutre* (chapitre 3) ;
- $\times$ est **commutative** ;
- **tout élément non nul** de $E$ possède un **symétrique** pour $\times$.

Un corps est donc un anneau où la seconde loi, $\times$, se rapproche presque des exigences d'un groupe — à une exception près, et elle est capitale : le neutre $0$ de $+$ n'a jamais besoin d'un symétrique pour $\times$ (chercher un $x$ tel que $0 \times x = 1$ serait de toute façon sans espoir, puisque $0 \times x = 0$ pour tout $x$).

### Exemple travaillé : $(\mathbb{Q}, +, \times)$ est un corps

$(\mathbb{Q}, +, \times)$ est déjà un anneau (mêmes vérifications que pour $\mathbb{Z}$ au chapitre 7, héritées des propriétés connues de $+$ et $\times$ sur $\mathbb{Q}$), et $\times$ y est commutative. Reste à vérifier l'exigence supplémentaire : **tout** rationnel non nul a-t-il un symétrique pour $\times$ ?

Prends un rationnel non nul quelconque $\frac{a}{b}$ (avec $b \neq 0$ pour que l'écriture ait un sens, et $a \neq 0$ puisque le rationnel est non nul). Son symétrique candidat est $\frac{b}{a}$ — qui est bien un rationnel, puisque $a \neq 0$. Vérifie :

$$\frac{a}{b} \times \frac{b}{a} = \frac{ab}{ba} = 1$$

Cette construction marche pour **n'importe quel** rationnel non nul, pas seulement pour un exemple isolé : $(\mathbb{Q}, +, \times)$ **est un corps**.

### Le contre-exemple qui sépare anneau et corps : $(\mathbb{Z}, +, \times)$ n'est pas un corps

$(\mathbb{Z}, +, \times)$ est un anneau (chapitre 7) et $\times$ y est commutative. Mais prends $2 \in \mathbb{Z}$, non nul. Existe-t-il un entier $x$ tel que $2x=1$ ? Le seul candidat serait $x=\frac{1}{2}$, qui n'est **pas** un entier — le symétrique devrait appartenir à $\mathbb{Z}$ lui-même, pas à un ensemble plus grand. Donc $2$ n'a pas de symétrique pour $\times$ **dans $\mathbb{Z}$** : $(\mathbb{Z}, +, \times)$ **est un anneau, mais n'est pas un corps**.

C'est exactement la même observation que celle faite à la fin du chapitre 7 pour $(\mathbb{Z}/4\mathbb{Z}, +, \times)$ : l'élément $2$ y était déjà sans symétrique pour $\times$. Un anneau devient un corps seulement quand **tous** les éléments non nuls, sans exception, ont un symétrique pour la seconde loi — pas seulement certains d'entre eux.

### Synthèse

| Structure | Ce qu'elle exige |
|---|---|
| Groupe $(E,\star)$ | loi interne + associative + neutre + symétrique pour **chaque** élément |
| Groupe commutatif | groupe, et de plus $\star$ commutative |
| Anneau $(E,+,\times)$ | $(E,+)$ groupe commutatif ; $\times$ associative et distributive par rapport à $+$ |
| Corps $(E,+,\times)$ | anneau, avec $\times$ unitaire (neutre $1$) et commutative, et **tout élément non nul** inversible pour $\times$ |

La ligne qui sépare l'anneau du corps tient en une seule exigence supplémentaire — et c'est elle qui distingue $(\mathbb{Z},+,\times)$ (anneau seulement) de $(\mathbb{Q},+,\times)$ (corps).

[[figure:echelle-structures]]

[[checkpoint:cp-r6-structures]]

---

## R7 — Isomorphisme et exercices de type bac

Tu as maintenant tout l'outillage du chapitre : reconnaître une loi de composition interne (chapitre 2), tester ses propriétés (chapitre 3), et cocher les axiomes qui font d'un ensemble un groupe, un anneau ou un corps (chapitres 4 à 9). Il reste un dernier geste, celui qui revient presque chaque année à l'examen national des Sciences Mathématiques : relier deux structures d'apparence différente — le plus souvent l'une habillée en matrices, l'autre en nombres, réels ou complexes — par une application qui respecte les lois.

### Un pont entre deux structures : l'isomorphisme

Imagine un groupe $(E, \star)$ déjà connu, un ensemble $F$ muni d'une loi interne $\times$ dont tu ne sais encore rien, et une application $\varphi : E \to F$ qui soit à la fois **bijective** (elle apparie un à un les éléments des deux ensembles) et **morphisme** — c'est-à-dire qu'elle respecte les lois :

$$\varphi(x \star y) = \varphi(x) \times \varphi(y)$$

Une telle application s'appelle un **isomorphisme**. Son intérêt est considérable : si $(E, \star)$ est déjà connu comme groupe commutatif, alors $\varphi$ **transporte** toute cette structure sur $(F, \times)$ — commutativité, neutre et symétriques compris. On n'a pas à re-vérifier les quatre axiomes un par un sur $F$ : il suffit d'exhiber l'isomorphisme. Attention à l'ordre, en revanche : pour qu'il y ait quoi que ce soit à transporter, encore faut-il que $\times$ soit **interne** sur $F$. C'est pourquoi, dans un sujet, la question qui précède te fait presque toujours prouver d'abord que $F$ est **stable** pour $\times$. C'est exactement la stratégie de la dernière question du sujet qui suit.

[[checkpoint:cp-r7-morphisme]]

### Exemple travaillé : transporter une structure par un isomorphisme

**Ce qu'on cherche et pourquoi ce geste.** Prends un ensemble $F$ muni d'une loi $\star$ donnée par une formule, et demande-toi si $(F,\star)$ est un groupe. Le premier réflexe — cocher les quatre axiomes directement sur $F$ — marche, mais l'associativité coûte cher : il faudrait développer $(x\star y)\star z$ et $x\star(y\star z)$ pour trois lettres quelconques, parenthèse par parenthèse. Le théorème qui précède ouvre un raccourci : si tu trouves une bijection $\varphi$ vers un groupe **déjà connu**, qui respecte la loi, tu n'as plus jamais besoin de toucher à l'associativité à la main. Voyons le geste sur un exemple choisi pour ça.

Pose $F = \,]1,+\infty[\,$, muni de la loi

$$x \star y = xy - x - y + 2$$

Est-ce que $(F,\star)$ est un groupe commutatif ?

**Étape 1 — $\star$ est-elle seulement interne sur $F$ ?** Avant tout transport, il faut que $\star$ ne s'échappe pas de $F$ (chapitre 2). Prends $x,y \in F$, donc $x>1$ et $y>1$, donc $x-1>0$ et $y-1>0$. Développe leur produit :

$$(x-1)(y-1) = xy - x - y + 1$$

Ajoute $1$ des deux côtés de cette identité :

$$xy - x - y + 2 = (x-1)(y-1) + 1$$

Le membre de droite est un produit de deux réels strictement positifs, plus $1$ : il est strictement supérieur à $1$. Donc $x \star y > 1$, c'est-à-dire $x \star y \in F$. ✓ $\star$ est bien une LCI sur $F$.

**Étape 2 — une bijection vers un groupe déjà connu.** $(\mathbb{R}^*_+, \times)$ est un groupe commutatif classique : le produit de deux réels strictement positifs est strictement positif (interne), $\times$ y est associative et commutative (héritée de $\mathbb{R}$), $1$ en est le neutre, et le symétrique de $t$ est $\frac1t$, lui aussi strictement positif. Considère

$$\varphi : \mathbb{R}^*_+ \to F, \qquad \varphi(t) = t+1$$

Vérifie d'abord que $\varphi$ arrive bien dans $F$ : $t>0 \Rightarrow t+1>1$. ✓ (Remarque de notation : ici c'est $\times$, la loi la plus familière, qui joue le rôle de la loi déjà connue, et $\star$ celui de la loi mystère — l'inverse des lettres du paragraphe précédent, qui n'étaient que des étiquettes illustratives. Ce qui compte n'est jamais la lettre choisie, mais laquelle des deux structures est déjà établie.)

**Étape 3 — $\varphi$ est un morphisme.** On veut $\varphi(t_1 \times t_2) = \varphi(t_1) \star \varphi(t_2)$, pour $t_1,t_2$ **quelconques** dans $\mathbb{R}^*_+$ — pas pour un couple choisi, sans quoi rien n'est prouvé pour les autres (chapitre 3). Membre de gauche, en appliquant directement la définition de $\varphi$ :

$$\varphi(t_1 t_2) = t_1 t_2 + 1$$

Membre de droite, en partant de la définition de $\star$ :

$$\varphi(t_1) \star \varphi(t_2) = (t_1+1)(t_2+1) - (t_1+1) - (t_2+1) + 2$$

Développe le produit qui ouvre ce membre :

$$(t_1+1)(t_2+1) = t_1t_2 + t_1 + t_2 + 1$$

Remplace-le dans l'expression précédente :

$$\varphi(t_1) \star \varphi(t_2) = (t_1t_2 + t_1 + t_2 + 1) - (t_1+1) - (t_2+1) + 2$$

Les termes en $t_1$ et en $t_2$ s'annulent deux à deux ; il ne reste que les constantes :

$$\varphi(t_1) \star \varphi(t_2) = t_1t_2 + 1$$

Les deux membres coïncident, pour $t_1,t_2$ quelconques : $\varphi(t_1 t_2) = \varphi(t_1) \star \varphi(t_2)$. $\varphi$ **est un morphisme**.

[[checkpoint:cp-r7-transport]]

**Étape 4 — $\varphi$ est bijective.** Résous $\varphi(t) = x$ d'inconnue $t$, pour $x \in F$ fixé : $t+1=x$, donc $t=x-1$. Vérifie que cette solution retombe bien dans l'ensemble de départ : $x>1 \Rightarrow x-1>0$, donc $t \in \mathbb{R}^*_+$. Chaque $x \in F$ a donc **exactement un** antécédent dans $\mathbb{R}^*_+$ : $\varphi$ est bijective, de bijection réciproque $\varphi^{-1}(x) = x-1$.

**La conclusion, par transport.** $\varphi$ est bijective (étape 4) et morphisme (étape 3) : c'est un isomorphisme de $(\mathbb{R}^*_+,\times)$ vers $(F,\star)$. Comme $(\mathbb{R}^*_+,\times)$ est un groupe commutatif déjà connu (étape 2), toute sa structure se transporte : $(F,\star)$ **est un groupe commutatif**. Remarque ce qui n'a **pas** été écrit : aucune ligne développant $(x\star y)\star z$ contre $x\star(y\star z)$, aucune ligne testant $x\star y = y\star x$ directement sur des lettres de $F$. C'est exactement le gain annoncé à l'étape 1 : associativité et commutativité se transportent, elles ne se redémontrent jamais à la main une fois l'isomorphisme établi.

**Le neutre et le symétrique, lus comme des images par $\varphi$.** Le transport ne donne pas qu'une conclusion générale : il donne les objets eux-mêmes, sans qu'il y ait à les chercher sur $F$.

Le neutre de $(F,\star)$ est l'image par $\varphi$ du neutre de $(\mathbb{R}^*_+,\times)$, qui est $1$ :

$$e_F = \varphi(1) = 1+1 = 2$$

**Attention ici, c'est le piège le plus tentant de cette méthode :** le neutre de $F$ n'est pas $1$, alors que celui de $\mathbb{R}^*_+$ l'est — deux ensembles différents, deux neutres différents, reliés par $\varphi$, jamais confondus. Vérifie-le directement pour t'en convaincre : $x \star 2 = 2x - x - 2 + 2 = x$, ça tient pour tout $x$, alors que $x \star 1 = x - x - 1 + 2 = 1 \neq x$ en général — $1$ n'est pas neutre dans $F$, même si c'est le neutre de $\mathbb{R}^*_+$ dont $F$ hérite pourtant toute sa structure.

Le symétrique de $x \in F$ est l'image par $\varphi$ du symétrique, dans $\mathbb{R}^*_+$, de son antécédent $t=x-1$ — c'est-à-dire de $\frac{1}{t} = \frac{1}{x-1}$ :

$$x' = \varphi\left(\frac{1}{x-1}\right) = \frac{1}{x-1} + 1$$

Réduis au même dénominateur :

$$x' = \frac{1 + (x-1)}{x-1} = \frac{x}{x-1}$$

Encore une fois, remarque le geste : pas besoin de résoudre $x \star x' = 2$ à la main sur $F$ — le symétrique se **lit** comme l'image par $\varphi$ du symétrique déjà connu dans $\mathbb{R}^*_+$.

**Et si deux lois sont en jeu ?** Le même raisonnement s'étend mot pour mot dès que $\varphi$ respecte **deux** lois à la fois — $\varphi(x+y) = \varphi(x) \oplus \varphi(y)$ pour la première, $\varphi(x\times y) = \varphi(x) \otimes \varphi(y)$ pour la seconde. Si $(E,+,\times)$ est déjà connu comme anneau (voire corps), alors $(F,\oplus,\otimes)$ hérite d'un coup de toute la structure : pas seulement le groupe additif, mais aussi la distributivité, et — pour un corps — l'inversibilité de chaque élément non nul pour la seconde loi. Rien de tout ça ne se revérifie axiome par axiome sur $F$ : c'est exactement la stratégie de l'exercice de type bac qui suit, où un unique $\varphi$, vérifié compatible avec les deux lois à la fois, transporte en un seul geste une structure de corps.

### Même geste, habillage matriciel

**Ce qu'on cherche et pourquoi ce geste.** L'exemple précédent transportait vers un ensemble de réels. À l'examen, c'est presque toujours l'ensemble d'arrivée qui est habillé en matrices — mais le geste ne change pas d'un iota : toujours un morphisme, toujours une bijection, toujours un transport. Regarde-le une fois, sur un exemple à toi, choisi pour aller vite (pas celui du sujet qui suit).

Prends $(\mathbb{C},+,\times)$, corps commutatif déjà connu (chapitre 9), et l'ensemble de matrices

$$F = \left\{ M(x,y) = \begin{pmatrix} x & -y \\ y & x \end{pmatrix} \;:\; x,y \in \mathbb{R} \right\} \subset M_2(\mathbb{R})$$

muni de l'addition et de la multiplication usuelles des matrices. Considère

$$\varphi : \mathbb{C} \to F, \qquad \varphi(x+iy) = M(x,y)$$

Remarque tout de suite ce que cette définition économise : $F$ est ici l'image de $\varphi$, donc sa stabilité pour $+$ et $\times$ dans $M_2(\mathbb{R})$ n'a pas besoin d'être prouvée à part — elle découlera du morphisme. (Dans le sujet qui suit, $F$ est donné indépendamment : sa stabilité s'y prouve en premier, comme au chapitre 2.)

**Le morphisme pour $\times$, en un seul produit.** Pose $z=x+iy$ et $z'=x'+iy'$ quelconques. D'un côté, en développant le produit dans $\mathbb{C}$ :

$$\varphi(zz') = \varphi\big((xx'-yy') + i(xy'+x'y)\big) = M(xx'-yy',\ xy'+x'y)$$

De l'autre, un unique produit matriciel, calculé une seule fois :

$$\varphi(z)\varphi(z') = \begin{pmatrix} x & -y \\ y & x \end{pmatrix}\begin{pmatrix} x' & -y' \\ y' & x' \end{pmatrix} = \begin{pmatrix} xx'-yy' & -(xy'+x'y) \\ xy'+x'y & xx'-yy' \end{pmatrix} = M(xx'-yy',\ xy'+x'y)$$

Les deux membres coïncident : $\varphi(zz')=\varphi(z)\varphi(z')$. Contraste avec l'exemple précédent, où le morphisme demandait plusieurs lignes de développement puis de simplification : ici, tout tient sur une seule ligne de calcul matriciel — l'habillage matriciel condense le morphisme en un produit, il ne le complique pas.

Le morphisme pour $+$ se lit tout aussi directement, coefficient par coefficient : $\varphi(z+z') = M(x+x',\,y+y') = M(x,y)+M(x',y') = \varphi(z)+\varphi(z')$.

**La bijection, lue sur les coefficients, sans isoler d'inconnue.** Pas d'équation à résoudre comme à l'étape 4 de l'exemple précédent : $\varphi(x+iy)=\varphi(x'+iy')$ s'écrit $M(x,y)=M(x',y')$, c'est-à-dire — en comparant les deux matrices coefficient par coefficient — $x=x'$ et $y=y'$, donc $z=z'$ : $\varphi$ est injective. Et toute matrice $M(x,y)$ de $F$ est, par construction, l'image de $x+iy$ : $\varphi$ est surjective. Bijective, donc, en lisant seulement les deux coefficients qui identifient chaque matrice.

**La conclusion, sur les deux lois à la fois.** $\varphi$ respecte $+$ et $\times$, et elle est bijective : c'est un isomorphisme de $(\mathbb{C},+,\times)$ vers $(F,+,\times)$. Comme $(\mathbb{C},+,\times)$ est un corps commutatif déjà connu, toute cette structure se transporte d'un coup : $(F,+,\times)$ **est, lui aussi, un corps commutatif** — un anneau, et de plus tout élément non nul de $F$ (toute matrice $M(x,y)$ avec $(x,y)\neq(0,0)$) admet un symétrique pour $\times$, transporté depuis l'inverse de $z=x+iy$ dans $\mathbb{C}^*$. C'est très exactement la forme du sujet qui suit : un ensemble de matrices, une structure de groupe ou de corps obtenue par isomorphisme depuis une structure déjà connue — sans qu'aucun axiome ne soit re-vérifié à la main sur les matrices elles-mêmes.

### Exercice de type bac

L'exercice ci-dessous est un sujet d'examen national (Sciences Mathématiques, session normale 2019). Cherche-le toi-même, question par question, avant de dérouler le raisonnement expert : c'est en butant, puis en te corrigeant, que le geste s'installe pour de bon.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même chaîne d'outils, un habillage différent : une autre loi, d'autres matrices, et un isomorphisme sans carré. Si tu as compris la méthode plutôt que retenu les nombres du sujet 2019, celle-ci ne te résistera pas.

[[exercise:r-variation]]

<!-- NOTE AJOUTÉE (dette d'examen, vague B — GAP-B "Transport de structure by
     an isomorphism (group, then ring/field with two laws) — stated, never
     worked", maths.md (supprimé le 2026-10-22), § structures-algebriques,
     ligne ~374 ; 8 entrées de bank.yaml sur 9 dépendent de ce geste) :
     [PROSE LIVRÉE, 2026-09-27] R7 gagne un exemple travaillé complet entre le
     théorème abstrait (529-535) et l'exercice bac (désormais après ligne
     613) : "Exemple travaillé : transporter une structure par un
     isomorphisme". Ensemble et loi ORIGINAUX, pas ceux d'un bank.yaml cité
     par l'audit : $F=\,]1,+\infty[\,$, $x\star y = xy-x-y+2$, isomorphisme
     depuis $(\mathbb{R}^*_+,\times)$ via $\varphi(t)=t+1$. Toutes les valeurs
     ont été vérifiées à la main deux fois (stabilité via $(x-1)(y-1)+1$,
     morphisme via développement direct, bijectivité par résolution de
     $\varphi(t)=x$, neutre $\varphi(1)=2$, symétrique
     $\varphi(1/(x-1))=x/(x-1)$ — chaque résultat confirmé indépendamment en
     résolvant directement sur $F$).

     Décision de notation : le paragraphe théorique qui précède (529-535)
     nomme $(E,\star)$ la structure déjà connue et $(F,\times)$ la structure
     mystère — des étiquettes illustratives, pas une convention figée.
     L'exemple travaillé inverse volontairement les symboles ($\times$ pour
     la structure connue $\mathbb{R}^*_+$, $\star$ pour la structure mystère
     $F$) parce que c'est l'usage dominant du reste de cette leçon depuis R1
     (⋆ = la loi à l'étude, encore inconnue). Signalé en une phrase dans le
     texte (fin de l'étape 2) pour qu'un lecteur qui vient de lire 531-535 ne
     s'étonne pas de l'inversion.

     Un seul checkpoint predict-commit ajouté, `cp-r7-transport`
     (checkpoints.yaml), placé APRÈS la preuve du morphisme (étape 3) et
     AVANT celle de la bijectivité (étape 4) — donc avant la conclusion par
     transport, comme demandé. Il met en scène le premier piège cité par
     l'audit : conclure au groupe transporté dès le morphisme établi, sans
     avoir prouvé la bijectivité. Trois distracteurs, trois ids DÉJÀ déclarés
     dans items.yaml (aucun id inventé pour ce checkpoint) :
     `axiome-oublie` (le morphisme suffirait, la bijectivité ne serait qu'un
     détail — c'est très exactement l'erreur nommée par l'audit),
     `generalisation-hative` (un point remarquable, $\varphi(1)=2$, généralisé
     en bijectivité de toute l'application) et `groupe-implique-commutatif`
     (repris tel quel du distracteur D de `cp-r7-morphisme`, adapté aux
     nombres de cet exemple).

     Le second piège cité par la tâche — prendre le neutre de $F$ pour le
     même nombre que le neutre de la structure connue — est traité DANS LA
     PROSE (l'"Attention" juste après $e_F=\varphi(1)=2$).

     [MISE À JOUR, 2026-09-27] La misconception proposée ci-dessus pour
     porter ce piège a été acceptée et déclarée par l'auteur d'items :
     `mc.math.structures_algebriques.neutre-non-transporte` (items.yaml:58–61),
     désormais portée par les items SA-30 à SA-33 (items.yaml).

     Aucun item ni checkpoint existant n'a été modifié par cette proposition ;
     seule la prose de R7 et cette note ont changé. `cp-r7-morphisme`,
     déjà présent avant cette édition, est inchangé et garde sa place, juste
     avant ce nouvel exemple.

     NOTE AJOUTÉE (dette d'examen, vague B1, 2026-09-27) :
     [PROSE LIVRÉE] GAP-B « A law defined by a formula (symbolic
     associativity, neutral by identification, symmetric by solving) »
     (maths.md (supprimé le 2026-10-22), § structures-algebriques, ligne
     ~389 ; 10 entrées de bank.yaml). Nouvelle sous-section en fin de R2,
     "Un exemple donné par une formule, pas par une table" : $x\ast y =
     x+y+xy$ sur $E=\mathbb{R}\setminus\{-1\}$ (ensemble et loi ORIGINAUX,
     choisis pour cet auteur — pas ceux d'un bank.yaml cité par l'audit, et
     distincts de la loi $x\star y=x+y-xy$ de SA-23/SA-24 et de la loi
     $x\star y=x+y+1$ de SA-13). Stabilité par factorisation
     ($x\ast y+1=(x+1)(y+1)$), commutativité héritée, associativité
     d'abord par expansion directe des deux membres (sept termes
     identiques), puis le raccourci de l'expert qui réutilise la même
     factorisation pour l'obtenir sans développer. Neutre $e=0$ trouvé en
     résolvant $x\ast e=x$ pour $x$ générique, avec le piège nommé
     explicitement : s'arrêter après une seule valeur de $x$ ne prouve rien
     pour les autres (même risque que l'associativité testée sur un seul
     triplet, chapitre 3). Symétrique $x'=-x/(1+x)$ par résolution directe,
     avec vérification qu'il reste dans $E$. Toutes les expansions ont été
     recopiées terme à terme et vérifiées à la main (les deux membres de
     l'associativité coïncident bien terme à terme : $x+y+z+xy+xz+yz+xyz$
     des deux côtés).

     Placée APRÈS le checkpoint `cp-r2-neutre-symetrique` (inchangé, garde sa
     place) et avant le séparateur qui ouvre R3 : aucun checkpoint existant
     déplacé, aucun nouveau checkpoint ajouté par cet auteur.
-->

---

## R8 — Espaces vectoriels : sous-espace, base, dimension

Certains sujets nationaux de Sciences Mathématiques s'ouvrent sur une phrase qu'on lit vite, parce qu'elle a l'air de ne rien demander :

> On rappelle que $(M_2(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel.

Dans le sujet de 2023 que tu rédigeras à la fin de ce chapitre, elle annonce les deux questions qui ouvrent l'exercice — celles qui viennent **avant** l'anneau, et avant l'isomorphisme du chapitre 10 que tu viens de travailler. Que promet-elle, exactement ? Deux opérations, et elles ne sont pas de la même nature. La première, $+$, additionne deux matrices : deux objets du même ensemble, comme toutes les lois rencontrées jusqu'ici. La seconde, $\cdot$, multiplie une matrice par un **réel** — et ce réel, lui, n'appartient pas à l'ensemble des matrices. C'est toute la nouveauté de ce chapitre : une seconde loi dont l'un des deux opérandes vient d'ailleurs.

Mets cette nouveauté à l'épreuve tout de suite, avant toute définition. Reprends l'ensemble du chapitre 5 :

$$F = \left\{ M(a,b) = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \ /\ (a,b) \in \mathbb{Z}^2 \right\}$$

Tu as démontré qu'il est un sous-groupe de $(M_2(\mathbb{R}),+)$. En est-il un **sous-espace vectoriel** de $(M_2(\mathbb{R}),+,\cdot)$ ? Tu n'as pas encore la définition, et c'est voulu : tranche avec ce que tu as — la phrase de l'énoncé, et les deux lois qu'elle annonce.

[[checkpoint:cp-r8-pari-scalaire]]

**Non.** La matrice $M(1,0)$ est dans $F$, puisque $a = 1$ et $b = 0$ sont des entiers — c'est d'ailleurs l'identité $I$. Multiplie-la par le réel $\tfrac12$ :

$$\tfrac12 \cdot M(1,0) = \begin{pmatrix} \tfrac12 & 0 \\ 0 & \tfrac12 \end{pmatrix}$$

Pour que ce résultat soit dans $F$, il faudrait l'écrire $M(a,b)$ avec $a = \tfrac12$, qui n'est pas un entier. Un seul couple — un réel et une matrice — suffit : $F$ n'est **pas stable pour la loi externe**. Le même ensemble est donc un sous-groupe, et pas un sous-espace. Ce que tu as démontré au chapitre 5 répondait à une question sur $+$ ; la multiplication par un réel en pose une **autre**, et c'est elle que ce chapitre apprend à poser.

### Ce que la phrase de l'énoncé affirme : un espace vectoriel réel

**Définition.** Soit $E$ un ensemble muni d'une loi interne $+$ et d'une loi externe $\cdot$, qui à un réel $\lambda$ et à un élément $u$ de $E$ associe un élément $\lambda \cdot u$ de $E$. On dit que $(E,+,\cdot)$ est un **espace vectoriel réel** si $(E,+)$ est un groupe commutatif — rien de neuf, c'est le chapitre 6 ; on note $0_E$ son neutre — et si, pour tous réels $\lambda, \mu$ et tous $u, v$ de $E$, la loi externe vérifie les quatre égalités suivantes :

$$\lambda \cdot (u + v) = \lambda \cdot u + \lambda \cdot v$$

$$(\lambda + \mu) \cdot u = \lambda \cdot u + \mu \cdot u$$

$$(\lambda \mu) \cdot u = \lambda \cdot (\mu \cdot u)$$

$$1 \cdot u = u$$

Les éléments de $E$ s'appellent des **vecteurs** — même quand ce sont des matrices — et les réels $\lambda$ des **scalaires**.

Trois espaces suffisent à tout ce chapitre : $\mathbb{R}^2$ et $\mathbb{R}^3$, les couples et les triplets de réels, qu'on additionne et qu'on multiplie par un réel coordonnée par coordonnée ; et $M_2(\mathbb{R})$, où l'on fait de même coefficient par coefficient. Dans les sujets du chapitre « S'entraîner », c'est l'énoncé qui pose l'espace ambiant, en une phrase de rappel ; ce qu'on te demande ensuite de démontrer porte sur une **partie** de cet espace, pas sur l'espace lui-même. Ces quatre égalités, tu n'as donc pas à les revérifier : on les énonce une fois, pour savoir ce qu'on a le droit d'utiliser. Le même rappel existe en $3 \times 3$, avec $M_3(\mathbb{R})$ : rien ne change au raisonnement, seule la taille des matrices change.

**Deux conséquences, et elles font tout le chapitre.** La première : multiplier par le réel $0$ donne le vecteur nul. Pars de $0 = 0 + 0$ dans $\mathbb{R}$, et distribue grâce à la deuxième égalité :

$$0 \cdot u = (0 + 0) \cdot u$$

$$(0 + 0) \cdot u = 0 \cdot u + 0 \cdot u$$

Ajoute aux deux membres l'opposé de $0 \cdot u$ dans le groupe $(E,+)$ — le geste qui démontre, dans un anneau, que $x \times 0 = 0$. Il reste $0_E = 0 \cdot u$.

La seconde : multiplier par $-1$ donne l'opposé. Calcule $(-1) \cdot u + u$, en écrivant $u = 1 \cdot u$ :

$$(-1) \cdot u + u = (-1) \cdot u + 1 \cdot u$$

$$(-1) \cdot u + 1 \cdot u = (-1 + 1) \cdot u$$

$$(-1 + 1) \cdot u = 0 \cdot u$$

et $0 \cdot u = 0_E$ par la première conséquence. Donc $(-1) \cdot u$ est le symétrique de $u$ pour $+$ : $(-1) \cdot u = -u$. **Retiens la seconde : l'opposé d'un vecteur est déjà un multiple de ce vecteur.** C'est elle qui explique la forme du critère qui suit.

### Le sous-espace vectoriel : un critère, et une condition échangée

Un **sous-espace vectoriel** de $(E,+,\cdot)$ est une partie $H$ de $E$ qui est elle-même un espace vectoriel, pour les mêmes lois. Comme au chapitre 5, une bonne partie des exigences descend gratuitement de $E$ : l'associativité et la commutativité de $+$, et les quatre égalités de la loi externe, sont vraies pour tous les vecteurs de $E$, donc en particulier pour ceux de $H$. Ce qui ne descend pas, c'est tout ce qui demande de **rester dans $H$**.

**Critère.** Soit $(E,+,\cdot)$ un espace vectoriel réel et $H$ une partie de $E$. $H$ est un sous-espace vectoriel de $(E,+,\cdot)$ si et seulement si :

1. $H$ n'est pas vide — en pratique, on montre que $0_E \in H$, et ce n'est pas plus exigeant : dès que $H$ contient un vecteur $u$, la condition 3 y met aussi $0 \cdot u = 0_E$, donc un sous-espace contient toujours $0_E$, et c'est le premier vecteur à essayer ;
2. pour tous $u, v$ de $H$ : $u + v \in H$ (stable pour la loi interne) ;
3. pour tout $u$ de $H$ et tout réel $\lambda$ : $\lambda \cdot u \in H$ (stable pour la loi externe).

Les lettres sont exactement celles du chapitre 5 — $E$ l'espace, $H$ la partie à tester — parce que le geste est le même. Mets les deux critères côte à côte :

| | sous-groupe de $(E,\star)$, chapitre 5 | sous-espace de $(E,+,\cdot)$ |
|---|---|---|
| 1 | $e \in H$ | $0_E \in H$ — la même |
| 2 | $x \star y \in H$ | $u + v \in H$ — la même |
| 3 | le symétrique $x'$ de $x$ est dans $H$ | $\lambda \cdot u \in H$ — **échangée** |

Trois conditions de chaque côté : la troisième n'est pas retirée, elle est **échangée**. Et l'échange est un gain, pas un troc à l'aveugle : la nouvelle condition contient l'ancienne, puisque $-u = (-1) \cdot u$. Dès qu'on a le droit de multiplier par $-1$, le symétrique est gratuit — mais il faut avoir ce droit, et c'est précisément ce que la loi externe apporte. Conséquence, à dire à voix haute : **tout sous-espace vectoriel est un sous-groupe de $(E,+)$**. La réciproque est fausse, et l'ensemble $F$ du début de ce chapitre vient d'en donner le contre-exemple.

### Trois parties du plan : une qui passe, deux qui tombent

**Une droite qui passe par l'origine.** Soit $D = \{(x,y) \in \mathbb{R}^2 \ /\ y = 2x\}$.

**Ce qu'on cherche et pourquoi ce geste.** « Appartenir à $D$ » ne veut dire qu'une chose : la seconde coordonnée vaut deux fois la première. À chaque condition, on ne se demande donc pas au hasard « est-ce dans $D$ ? » : on **fabrique la forme** $(t, 2t)$, en nommant $t$ ce qui occupe la première place, et on regarde si la seconde suit. Nommer la nouvelle première coordonnée, c'est tout le geste.

**Non vide.** $(0,0) \in D$, car $2 \times 0 = 0$. ✓

**Stable pour $+$.** Prends deux éléments quelconques $u = (x, 2x)$ et $v = (x', 2x')$ de $D$ :

$$u + v = (x + x',\ 2x + 2x')$$

$$(x + x',\ 2x + 2x') = \big(x + x',\ 2(x + x')\big)$$

En nommant $t = x + x'$, c'est $(t, 2t)$ : $u + v \in D$. ✓

**Stable pour $\cdot$.** Pour tout réel $\lambda$, $\lambda u = (\lambda x,\ 2\lambda x)$ ; en nommant $s = \lambda x$, c'est $(s, 2s)$ : $\lambda u \in D$. ✓

Les trois conditions tiennent : $D$ est un sous-espace vectoriel de $\mathbb{R}^2$ — une droite qui passe par l'origine.

**La même droite, décalée.** Soit $D' = \{(x,y) \in \mathbb{R}^2 \ /\ y = 2x + 1\}$. Commence par le test du vecteur nul : $2 \times 0 + 1 = 1$, et $1 \neq 0$, donc $(0,0) \notin D'$. ✗ **Une ligne suffit à conclure** : $D'$ n'est pas un sous-espace, et il n'y a rien d'autre à vérifier. Si tu veux voir que les échecs voyagent ensemble, regarde quand même l'addition : $(0,1)$ et $(1,3)$ sont dans $D'$, mais leur somme $(1,4)$ n'y est pas, puisque $2 \times 1 + 1 = 3$ et non $4$.

**Attention, le piège.** « $D'$ est une droite, comme $D$ ; une droite est un sous-espace ; donc $D'$ en est un. » Ce raisonnement ne bute pas sur le test du zéro : il le **saute**, parce que l'objet a l'air linéaire. Le mot « linéaire » du collège — une fonction affine, un graphe bien droit — n'est pas celui de ce chapitre : le terme constant $+1$ déplace l'objet hors de l'origine, et toute la structure s'effondre. Le test du zéro coûte une ligne ; c'est précisément la ligne que ce piège fait sauter.

**Une partie qui passe le test du zéro.** Ce test ne tranche que dans un sens : s'il échoue, c'est fini ; s'il réussit, il reste deux conditions. Voici un ensemble qui le passe — et qui passe aussi une deuxième condition : $X = \{(x,y) \in \mathbb{R}^2 \ /\ xy = 0\}$, les points qui sont sur au moins un des deux axes.

[[checkpoint:cp-r8-pari-stabilite]]

Reprends les trois conditions sur $X$, dans l'ordre.

**Non vide.** $(0,0) \in X$, car $0 \times 0 = 0$. ✓

**Stable pour $\cdot$.** Pour tout réel $\lambda$ et tout $(x,y)$ de $X$, $(\lambda x)(\lambda y) = \lambda^2 (xy)$, et $\lambda^2 \times 0 = 0$ : $\lambda (x,y) \in X$. ✓

**Stable pour $+$ : non.** $(1,0) \in X$ car $1 \times 0 = 0$, et $(0,1) \in X$ car $0 \times 1 = 0$. Mais

$$(1,0) + (0,1) = (1,1)$$

et $1 \times 1 = 1 \neq 0$ : $(1,1) \notin X$. ✗

$X$ passe deux conditions sur trois, et **n'est pas** un sous-espace. Contenir le vecteur nul ne suffit pas, résister à la multiplication par un réel non plus : le critère demande les trois conditions ensemble. L'avantage de les écrire en trois lignes séparées, c'est qu'on voit **laquelle** tombe. Remarque au passage que chacun des deux axes, pris seul, est un sous-espace — c'est une droite qui passe par l'origine. Leur réunion n'en est pas un : deux points pris sur des axes différents s'additionnent hors des deux.

[[figure:sous-espaces-plan]]

### Le même critère, en habillage matriciel

Dans le sujet de 2023 qui clôt ce chapitre, la partie à tester est un ensemble de matrices à deux paramètres. Voici le même habillage, sur un autre ensemble :

$$V = \left\{ Y(a,b) = \begin{pmatrix} a & a+b \\ a-b & b \end{pmatrix} \ /\ (a,b) \in \mathbb{R}^2 \right\} \subset M_2(\mathbb{R})$$

Ses éléments s'appellent ici $Y(a,b)$, parce que $M(a,b)$ désigne déjà les matrices de $F$. Dans les sujets du chapitre « S'entraîner », en revanche, la lettre $M$ revient d'un exercice à l'autre avec une forme nouvelle : relis sa définition avant de calculer.

**Ce qu'on cherche et pourquoi ce geste.** « Appartenir à $V$ », c'est avoir la forme $Y(\cdot,\cdot)$ : deux paramètres libres, et deux cases qui s'en déduisent. À chaque condition, ne compare pas des coefficients au hasard : cherche quels deux nombres joueraient le rôle de $a$ et de $b$. Lis-les sur la diagonale — les cases en haut à gauche et en bas à droite, les deux seules où un paramètre apparaît **seul** — puis vérifie que les deux autres cases valent bien leur somme et leur différence. C'est le geste de la droite $D$, avec deux noms au lieu d'un. Lire les paramètres là où ils sont seuls, c'est ce qui transforme une vérification en lecture.

Avance la vérification une transformation à la fois ; à chaque pas, la note te dit pourquoi c'est le bon geste.

[[derivation:v-sous-espace]]

Les trois conditions tiennent : **$V$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$.**

### Deux mots avant d'aller plus loin : combinaison linéaire, sous-espace engendré

**Combinaison linéaire.** Étant donnés des vecteurs $u_1, \dots, u_p$ de $E$, on appelle **combinaison linéaire** de $u_1, \dots, u_p$ tout vecteur de la forme

$$\alpha_1 u_1 + \alpha_2 u_2 + \dots + \alpha_p u_p, \qquad \text{avec } \alpha_1, \dots, \alpha_p \in \mathbb{R}$$

Rien de plus : on multiplie chacun par un réel, puis on additionne — les deux lois du chapitre, dans cet ordre. Dans $\mathbb{R}^2$, avec $u = (1,0)$ et $v = (0,1)$, le vecteur $(3,-2)$ est la combinaison $3u + (-2)v$. Et sur la droite $D$, tout point $(t, 2t)$ est la combinaison $t \cdot (1,2)$ d'un seul vecteur.

**Le critère, en une ligne.** Les conditions 2 et 3 réunies disent exactement : toute combinaison linéaire de deux éléments de $H$ est dans $H$.

$$\text{pour tous } u, v \in H \text{ et tous réels } \lambda, \mu : \quad \lambda u + \mu v \in H$$

Pourquoi c'est la même chose : si les conditions 2 et 3 tiennent, $\lambda u$ et $\mu v$ sont dans $H$ par la 3, donc leur somme aussi par la 2. Réciproquement, $\lambda = \mu = 1$ redonne la condition 2, et $\mu = 0$ redonne la condition 3, puisque $0 \cdot v = 0_E$.

Fais le regroupement toi-même sur $V$ avant de lire la suite : prends deux éléments $Y(a,b)$ et $Y(a',b')$ de $V$, deux réels $\lambda$ et $\mu$, et pose $s = \lambda a + \mu a'$ et $t = \lambda b + \mu b'$.

$$\lambda Y(a,b) + \mu Y(a',b') = \begin{pmatrix} s & s+t \\ s-t & t \end{pmatrix}$$

$$\begin{pmatrix} s & s+t \\ s-t & t \end{pmatrix} = Y(s,t)$$

et $Y(s,t) \in V$. ✓ Sur la diagonale, on lit $s$ et $t$ ; en haut à droite, $\lambda(a+b) + \mu(a'+b')$ se regroupe en $(\lambda a + \mu a') + (\lambda b + \mu b')$, c'est-à-dire $s + t$ ; en bas à gauche, de la même façon, $\lambda(a-b) + \mu(a'-b')$ se regroupe en $s - t$.

**Attention, le piège.** La forme en une ligne est juste, et elle est plus risquée à l'examen : elle oblige à écrire d'un bloc ce que le correcteur attend en trois temps, et une erreur de regroupement y coûte tout. À l'examen, rédige les trois conditions, dans l'ordre. La forme compacte sert à **comprendre** que les conditions 2 et 3 sont deux stabilités qui travaillent ensemble.

**Le sous-espace engendré.** L'ensemble de **toutes** les combinaisons linéaires de $u_1, \dots, u_p$ s'appelle le **sous-espace engendré** par la famille $(u_1, \dots, u_p)$. On le note $\mathrm{Vect}(u_1, \dots, u_p)$ — lis ce symbole comme une abréviation : « l'ensemble de toutes les combinaisons de ces vecteurs ». Et c'est bien un sous-espace ; les trois conditions se vérifient sur place :

1. $0_E = 0\,u_1 + \dots + 0\,u_p$ est une combinaison des $u_i$ ✓ ;
2. la somme de deux combinaisons en est une : $\sum \alpha_i u_i + \sum \beta_i u_i = \sum (\alpha_i + \beta_i)\, u_i$ ✓ ;
3. un multiple d'une combinaison en est une : $\lambda \sum \alpha_i u_i = \sum (\lambda \alpha_i)\, u_i$ ✓.

**Le raisonnement d'expert, dit à voix haute.** Avant d'écrire une ligne sur $V$, l'expert écrit $Y(a,b)$ comme une combinaison linéaire : il sépare ce qui multiplie $a$ de ce qui multiplie $b$.

$$Y(a,b) = a \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} + b \begin{pmatrix} 0 & 1 \\ -1 & 1 \end{pmatrix}$$

Contrôle, case par case : la première matrice multipliée par $a$ donne $\left(\begin{smallmatrix} a & a \\ a & 0 \end{smallmatrix}\right)$, la seconde multipliée par $b$ donne $\left(\begin{smallmatrix} 0 & b \\ -b & b \end{smallmatrix}\right)$, et leur somme est bien $\left(\begin{smallmatrix} a & a+b \\ a-b & b \end{smallmatrix}\right)$. L'expert **sait déjà** où il va : en notant $A$ et $B$ ces deux matrices fixes, $V$ est l'ensemble de toutes les combinaisons de $A$ et de $B$, c'est-à-dire $V = \mathrm{Vect}(A, B)$ — et un sous-espace engendré est un sous-espace, on vient de le démontrer.

**Attention, le piège.** À l'examen, la réponse qui rapporte le point est le critère rédigé, ses trois conditions dans l'ordre. Le raccourci par le sous-espace engendré n'est légitime que s'il est rédigé comme tel : « $V = \mathrm{Vect}(A, B)$, or un sous-espace engendré est un sous-espace ». L'expert s'en sert pour savoir où il va, pas pour écrire moins.

### Famille génératrice, famille libre

Une famille $(u_1, \dots, u_p)$ de vecteurs de $H$ est **génératrice** de $H$ — on dit qu'elle **engendre** $H$ — si **tout** élément de $H$ s'écrit $\alpha_1 u_1 + \dots + \alpha_p u_p$ : autrement dit, si $H = \mathrm{Vect}(u_1, \dots, u_p)$. La famille $(A, B)$ engendre $V$ : c'est l'écriture $Y(a,b) = aA + bB$ de l'expert. Mais attention à ce que cette facilité cache : ici, la famille génératrice se **lisait** sur la définition de $V$. Ce n'est pas toujours le cas, et il y a une méthode ; elle vient juste après.

Une famille $(u_1, \dots, u_p)$ est **libre** si la **seule** combinaison nulle est celle dont tous les coefficients sont nuls : dès que $\alpha_1 u_1 + \dots + \alpha_p u_p = 0_E$, alors $\alpha_1 = 0$, …, $\alpha_p = 0$. Le mot qui compte est « la seule ». Une famille qui n'est pas libre est dite **liée**.

**Une famille libre dans $\mathbb{R}^3$.** Soit $v_1 = (1,0,1)$, $v_2 = (1,1,0)$ et $v_3 = (0,1,1)$.

**Ce qu'on cherche et pourquoi ce geste.** On pose $\alpha v_1 + \beta v_2 + \gamma v_3 = (0,0,0)$, et on résout. Par où commencer ? Par l'équation qui contient le moins d'inconnues ; ici les trois en contiennent deux chacune, donc on en prend une, on en tire une inconnue en fonction d'une autre, et on **reporte**. Le signal que la famille est libre arrive à la dernière ligne : une équation à **une seule** inconnue. Si au contraire la dernière ligne devenait « $0 = 0$ », ce serait le signal inverse — une inconnue resterait libre, et la famille serait liée. On avance là où il y a le moins de choses à porter.

[[derivation:famille-libre-r3]]

La seule combinaison nulle est la combinaison à coefficients nuls : $(v_1, v_2, v_3)$ est **libre**.

### Prends position : cette famille est-elle libre ?

Voici une méthode que beaucoup d'élèves appliquent, et qui a l'air solide. Écoute-la jusqu'au bout :

> Pour savoir si une famille est libre, je regarde les vecteurs deux par deux : si aucun n'est le multiple d'un autre, ils sont indépendants. C'est ce que je fais toujours, et c'est rapide.

Mets-la à l'épreuve sur $w_1 = (1,2,3)$, $w_2 = (2,1,0)$ et $w_3 = (3,3,3)$. **Prends position avant de lire la suite : cette famille est-elle libre ?**

Les vérifications que la méthode demande sont faites, et elles passent toutes. Aucun des trois vecteurs n'est nul. Aucun couple n'est colinéaire : pour $w_1$ et $w_2$, les premières coordonnées sont dans le rapport $2$, les deuxièmes dans le rapport $\tfrac12$ ; pour $w_1$ et $w_3$, les rapports sont $3$ et $\tfrac32$ ; pour $w_2$ et $w_3$, ils sont $\tfrac32$ et $3$. La méthode conclut : libre.

Maintenant, additionne les deux premiers :

$$w_1 + w_2 = (1+2,\ 2+1,\ 3+0)$$

$$(1+2,\ 2+1,\ 3+0) = (3,3,3)$$

C'est $w_3$. Donc

$$1 \cdot w_1 + 1 \cdot w_2 + (-1) \cdot w_3 = (0,0,0)$$

avec des coefficients qui ne sont pas tous nuls : la famille est **liée**. Le test par paires a dit oui ; la définition dit non. L'un des deux est faux, et ce n'est pas la définition.

Le test par paires est un test de **deux** vecteurs ; la liberté est une propriété de la famille **entière**. Trois vecteurs peuvent se tenir deux à deux sans se tenir à trois. Le seul test qui ne se trompe pas est le système : poser $\alpha w_1 + \beta w_2 + \gamma w_3 = (0,0,0)$, et le résoudre jusqu'au bout. Ici la relation se voyait à l'œil ; elle ne se voit pas toujours.

### Engendrer : une méthode, et un témoin

**La méthode.** Pour prouver qu'une famille engendre, on part d'un élément **quelconque** et on l'écrit comme combinaison ; pour prouver qu'elle n'engendre pas, **un seul** élément sans écriture suffit — la même économie que pour la droite décalée, où un seul point manquant réglait la question.

**Une famille qui engendre : les générateurs se lisent sur l'équation.** Soit $W = \{(x,y,z) \in \mathbb{R}^3 \ /\ y = 2x\}$.

[[derivation:w-generateurs]]

On n'a pas deviné la famille : on l'a **lue** sur la solution de l'équation. C'est le geste transférable du chapitre — une partie donnée par une équation, on résout pour une lettre, et les générateurs se lisent sur l'écriture qui reste.

**Une famille libre qui n'engendre pas.** Dans $\mathbb{R}^3$, prends la famille $\big((1,2,0),\ (0,1,3)\big)$.

[[derivation:temoin-non-generatrice]]

Libre et génératrice sont donc **deux questions séparées**, et aucune ne donne l'autre : cette famille est libre sans engendrer $\mathbb{R}^3$, et tu verras plus bas une famille qui engendre sans être libre. C'est pour cela qu'une base demande les deux.

**Attention, le piège.** « Ces vecteurs touchent les trois coordonnées, donc ils engendrent tout. » Ici, $(1,2,0)$ et $(0,1,3)$ ont bien l'air de couvrir $x$, $y$ et $z$ — et $(0,0,1)$ leur échappe. La génération ne s'inspecte pas : elle se démontre, sur un élément quelconque.

### Base et dimension

Une **base** de $H$ est une famille à la fois **libre** et **génératrice** de $H$. La **dimension** de $H$, notée $\dim H$, est le nombre de vecteurs d'une base de $H$ — on admet que toutes les bases d'un même espace ont le même nombre de vecteurs.

Deux cas limites, à fixer tout de suite. Un seul vecteur $u$ **non nul** forme une famille libre : si $\lambda u = 0_E$ avec $\lambda \neq 0$, multiplier par $\tfrac1\lambda$ redonnerait $u = 0_E$, ce qui est exclu ; donc $\lambda = 0$. À l'inverse, le vecteur nul n'entre dans aucune famille libre, puisque $1 \cdot 0_E = 0_E$ avec un coefficient non nul. Le sous-espace $\{0_E\}$, réduit au vecteur nul, n'a donc aucun vecteur à mettre dans une base : sa dimension est $0$.

**Mais pourquoi exiger « libre » ?** Si une famille engendre $H$, elle écrit déjà tout vecteur de $H$ : à quoi bon la liberté ? Réponse en un mot : l'**unicité** de l'écriture. Une famille génératrice garantit qu'on peut écrire tout vecteur ; une famille libre garantit qu'on ne peut l'écrire que **d'une seule façon**. C'est cette unicité qui fait des coefficients des **coordonnées** — et donc d'un nombre de vecteurs, une dimension.

Pourquoi « libre » donne une seule écriture : si $\alpha_1 u_1 + \dots + \alpha_p u_p = \beta_1 u_1 + \dots + \beta_p u_p$, fais tout passer du même côté.

$$(\alpha_1 - \beta_1)\, u_1 + \dots + (\alpha_p - \beta_p)\, u_p = 0_E$$

C'est une combinaison nulle ; la famille étant libre, tous ses coefficients sont nuls, donc $\alpha_i = \beta_i$ pour chaque $i$. Une seule écriture.

Et ce que « liée » coûte, sur un exemple. Dans $\mathbb{R}^2$, prends $t_1 = (1,4)$, $t_2 = (3,1)$ et $t_3 = (4,5)$. Ici $t_1 + t_2 = (1+3,\ 4+1)$, c'est-à-dire $(4,5)$, qui est $t_3$. Le vecteur $(4,5)$ s'écrit donc de deux façons dans la famille $(t_1, t_2, t_3)$ :

$$1 \cdot t_1 + 1 \cdot t_2 + 0 \cdot t_3 = (4,5)$$

$$0 \cdot t_1 + 0 \cdot t_2 + 1 \cdot t_3 = (4,5)$$

Deux jeux de coefficients pour un même vecteur : « les coordonnées de $(4,5)$ dans cette famille » ne veut plus rien dire. Retire $t_3$, en revanche, et le couple $(t_1, t_2)$ est libre. Pose $\alpha(1,4) + \beta(3,1) = (0,0)$ ; la première coordonnée donne

$$\alpha + 3\beta = 0$$

$$\alpha = -3\beta$$

et la seconde, $4\alpha + \beta = 0$, reçoit cette valeur :

$$4(-3\beta) + \beta = 0$$

$$-11\beta = 0$$

Donc $\beta = 0$, puis $\alpha = -3\beta = 0$. Voilà ce que la liberté achète : non pas la capacité d'écrire, mais le **droit de parler de coordonnées**. Et c'est de ce droit que vient le mot « dimension ».

**La base de $V$, et sa dimension.** Reprends $A = Y(1,0) = \left(\begin{smallmatrix} 1 & 1 \\ 1 & 0 \end{smallmatrix}\right)$ et $B = Y(0,1) = \left(\begin{smallmatrix} 0 & 1 \\ -1 & 1 \end{smallmatrix}\right)$.

[[derivation:base-de-v]]

$(A, B)$ est une base de $V$, donc $\dim V = 2$. Remarque qu'ici $A \neq I$, et même $I \notin V$ : il faudrait lire $a = 1$ et $b = 1$ sur la diagonale, mais alors la case en haut à droite vaudrait $a + b = 2$, et non $0$. La base d'un ensemble de matrices n'est donc pas « $I$ et une autre » par nature : c'est le calcul qui la donne. Parfois, en revanche, l'ensemble contient $I$ et une base commence par $I$ — tu rencontreras cette configuration à la fin du chapitre, et c'est toi qui la produiras.

Change maintenant d'échelle : la même question, posée à l'espace qui contient $V$.

[[checkpoint:cp-r8-pari-notation]]

**$\dim M_2(\mathbb{R}) = 4$.** Pose les quatre matrices élémentaires, qui ont chacune un seul coefficient égal à $1$ :

$$E_{11} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \quad E_{12} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad E_{21} = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \quad E_{22} = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$$

[[derivation:base-m2]]

Le « 2 » de $M_2$ est l'ordre des matrices — deux lignes, deux colonnes —, pas la dimension de l'espace. Et $V$ est un sous-espace de dimension $2$ dans un espace de dimension $4$ : un sous-espace n'hérite pas de la dimension de son espace ambiant ; il en hérite seulement une **borne**. De la même façon, $\mathbb{R}^2$ est de dimension $2$ et $\mathbb{R}^3$ de dimension $3$ : leurs bases les plus simples, $\big((1,0),\ (0,1)\big)$ et $\big((1,0,0),\ (0,1,0),\ (0,0,1)\big)$, se vérifient exactement comme celle de $M_2(\mathbb{R})$.

Et la réponse qui avait l'air raisonnable, les trois matrices $I$, $E_{12}$ et $E_{21}$, qui « couvrent » la diagonale et les deux coins ? Écris leur combinaison générale :

$$\alpha I + \beta E_{12} + \gamma E_{21} = \begin{pmatrix} \alpha & \beta \\ \gamma & \alpha \end{pmatrix}$$

Les deux coefficients diagonaux y sont forcément égaux : la matrice $\left(\begin{smallmatrix} 1 & 0 \\ 0 & 2 \end{smallmatrix}\right)$ n'est pas atteinte. Une famille qui a l'air de toucher toutes les cases peut rater l'essentiel — c'est pour cela que « génératrice » se démontre sur un élément quelconque.

Dernière prise de position, sur un sous-espace donné par trois vecteurs.

[[checkpoint:cp-r8-pari-dimension]]

Les vecteurs sont $u = (1,2,-1)$, $v = (2,1,1)$ et $w = (3,3,0)$, et $G = \mathrm{Vect}(u, v, w)$. Avant de compter quoi que ce soit, cherche une relation entre les générateurs.

[[derivation:vect-trois-generateurs]]

Trois générateurs, dimension $2$ : le troisième n'apportait rien. **Compter les vecteurs écrits n'est pas compter une base.** Voilà aussi la famille annoncée plus haut : $(u, v, w)$ engendre $G$ sans être libre.

**Le même piège, en habillage matriciel.** Soit

$$G' = \left\{ N(a,b,c) = \begin{pmatrix} a+b & c \\ c & a+b \end{pmatrix} \ /\ (a,b,c) \in \mathbb{R}^3 \right\}$$

et $K = \left(\begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix}\right)$. Trois lettres dans la définition ; combien de dimensions ?

[[derivation:trois-lettres-deux-dimensions]]

$\dim G' = 2$, avec trois lettres dans la définition : $a$ et $b$ n'interviennent que par leur somme.

### Une équation coûte une dimension

Soit $P = \{(x,y,z) \in \mathbb{R}^3 \ /\ x + y + z = 0\}$. On montre que c'est un sous-espace, puis on en cherche une base.

**Ce qu'on cherche et pourquoi ce geste.** La méthode tient en une phrase, et elle sert partout : une partie décrite par une **équation** se transforme en partie décrite par des **paramètres**. On résout pour la lettre la plus facile à isoler, on réécrit l'élément quelconque avec les lettres restantes, et les générateurs sont les vecteurs qui multiplient ces lettres. Il n'y a rien à deviner — c'est la méthode qui a donné les générateurs de $W$. Et le compte suit : trois lettres, une équation, deux paramètres, deux générateurs. C'est le sens de « une équation coûte une dimension ».

[[derivation:plan-equation]]

$\dim P = 2$ : un plan passant par l'origine, dans un espace de dimension $3$.

[[figure:echelle-dimensions-r3]]

**Un raccourci, admis — énoncé après la méthode directe, jamais à sa place.** Dans un espace de dimension $n$, une famille **libre** de $n$ vecteurs est une base ; une famille **génératrice** de $n$ vecteurs aussi. Il sert de vérification, pas de dispense de calcul.

**Attention, le piège : ce raccourci se lit facilement à l'envers.** Ce qu'il dit : libre **et** $n$ vecteurs en dimension $n$, donc base. Ce qu'il ne dit pas : $n$ vecteurs en dimension $n$, donc libre. Trois vecteurs de $\mathbb{R}^3$ ne sont pas libres parce qu'ils sont trois — la famille $(w_1, w_2, w_3)$ en donnait trois qui ne le sont pas. La liberté reste l'hypothèse ; le compte n'est que la conclusion.

### Applications linéaires, noyau et image

**Définition.** Soit $E$ et $E'$ deux espaces vectoriels réels. Une application $f : E \to E'$ est **linéaire** si, pour tous $u, v$ de $E$ et tous réels $\lambda, \mu$ :

$$f(\lambda u + \mu v) = \lambda f(u) + \mu f(v)$$

Elle transporte les combinaisons linéaires : l'image d'une combinaison est la combinaison des images. Deux conséquences immédiates, qui servent tout de suite : en prenant $\lambda = \mu = 0$, on obtient $f(0_E) = 0_{E'}$ ; en prenant $\lambda = 1$ et $\mu = -1$, on obtient $f(u - v) = f(u) - f(v)$.

**Reconnaître une application linéaire.** Soit $f : \mathbb{R}^3 \to \mathbb{R}^2$ définie par $f(x,y,z) = (x - y,\ y - z)$. Pour $u = (x,y,z)$ et $v = (x',y',z')$, le vecteur $\lambda u + \mu v$ a pour coordonnées $(\lambda x + \mu x',\ \lambda y + \mu y',\ \lambda z + \mu z')$. Calcule les deux coordonnées de son image, et regroupe ce qui multiplie $\lambda$ d'un côté, ce qui multiplie $\mu$ de l'autre :

$$(\lambda x + \mu x') - (\lambda y + \mu y') = \lambda (x - y) + \mu (x' - y')$$

$$(\lambda y + \mu y') - (\lambda z + \mu z') = \lambda (y - z) + \mu (y' - z')$$

Ce sont exactement les coordonnées de $\lambda f(u) + \mu f(v)$ : $f$ est linéaire. ✓

Deux contre-exemples, courts et parlants :

- $g(x,y) = (x + 1,\ y)$ : $g(0,0) = (1,0) \neq (0,0)$. Une application linéaire envoie $0$ sur $0$ ; $g$ ne le fait pas, exactement comme la droite décalée ne passait pas par l'origine. Chaque coordonnée de $g$ est pourtant du premier degré : c'est le terme constant qui la disqualifie. ✗
- $h(x,y) = (x^2,\ y)$ : $h(2 \cdot (1,0)) = h(2,0) = (4,0)$, alors que $2\, h(1,0) = (2,0)$. ✗

**Noyau et image.** Le **noyau** de $f$ est l'ensemble des vecteurs de $E$ envoyés sur le vecteur nul : $\ker f = \{u \in E \ /\ f(u) = 0_{E'}\}$. Il vit dans l'ensemble de **départ**. L'**image** de $f$ est l'ensemble des vecteurs atteints, $\mathrm{Im}\, f = \{f(u) \ /\ u \in E\}$ ; elle vit dans l'ensemble d'**arrivée**. Reprends l'application $f$ qu'on vient de reconnaître, et commence par son noyau. Avant le moindre calcul, prends position.

[[checkpoint:cp-r8-pari-noyau]]

Maintenant, le calcul — une transformation à la fois.

[[derivation:noyau-f]]

Le noyau n'est pas réduit au vecteur nul : il contient toute une droite. Et cela se lit en termes d'injectivité : $f(1,1,1) = (0,0)$ et $f(0,0,0) = (0,0)$, avec $(1,1,1) \neq (0,0,0)$ — $f$ n'est **pas injective**.

Pour l'image, il faut trouver, pour un $(s,t)$ quelconque de $\mathbb{R}^2$, un antécédent par $f$.

**Ce qu'on cherche et pourquoi ce geste.** L'antécédent ne tombe pas du ciel, et il ne se devine pas. On veut résoudre $f(x,y,z) = (s,t)$, c'est-à-dire $x - y = s$ et $y - z = t$. **Deux équations, trois inconnues** : il reste un degré de liberté, donc on **choisit** la valeur la plus commode pour tuer une variable — ici $z = 0$. La seconde équation donne alors $y = t$, et la première $x = s + y$, soit $x = s + t$. On **remonte**, puis on **vérifie** en recalculant $f$ sur ce qu'on a trouvé. Trois temps, à dire à chaque fois : compter les degrés de liberté, choisir, remonter.

[[derivation:image-f]]

Tout vecteur de $\mathbb{R}^2$ est atteint : $\mathrm{Im}\, f = \mathbb{R}^2$.

**Injective, ou pas : le noyau le dit.** Une équivalence sert partout : $f$ est injective si et seulement si $\ker f = \{0_E\}$. La démonstration tient en trois lignes, avec la seconde conséquence de la définition :

$$f(u) = f(v) \iff f(u) - f(v) = 0_{E'}$$

$$f(u) - f(v) = 0_{E'} \iff f(u - v) = 0_{E'}$$

$$f(u - v) = 0_{E'} \iff u - v \in \ker f$$

Donc, si $\ker f = \{0_E\}$, l'égalité $f(u) = f(v)$ force $u - v = 0_E$, soit $u = v$ : $f$ est injective. Réciproquement, si $f$ est injective, tout $u$ de $\ker f$ vérifie $f(u) = 0_{E'}$ et $f(0_E) = 0_{E'}$, donc $u = 0_E$. Ce n'est pas un théorème de plus à apprendre par cœur : c'est la définition du noyau, lue deux fois — et elle est démontrée, pas admise.

**La paramétrisation est une application linéaire.** Reviens à $V$, et regarde l'application qui fabrique ses éléments :

$$\varphi : \mathbb{R}^2 \to M_2(\mathbb{R}), \qquad \varphi(a,b) = Y(a,b)$$

Elle est linéaire, et le calcul est déjà fait : c'est mot pour mot le regroupement de la forme en une ligne. Avec $s = \lambda a + \mu a'$ et $t = \lambda b + \mu b'$, on a $\lambda (a,b) + \mu (a',b') = (s,t)$, puis

$$\varphi\big(\lambda (a,b) + \mu (a',b')\big) = Y(s,t)$$

$$Y(s,t) = \lambda Y(a,b) + \mu Y(a',b')$$

Son noyau : $Y(a,b) = O$ se lit sur la diagonale, $a = 0$ et $b = 0$, donc $\ker \varphi = \{(0,0)\}$ — **c'est exactement « $(A, B)$ est libre »**. Son image : par construction, c'est $V$ tout entier — **c'est exactement « $(A, B)$ est génératrice »**.

Donc « $(A, B)$ est une base de $V$ » et « $\varphi$ est une bijection de $\mathbb{R}^2$ sur $V$ » sont **la même phrase** : l'injectivité vient de $\ker \varphi = \{(0,0)\}$, par l'équivalence qu'on vient de démontrer, et la surjectivité de $\mathrm{Im}\, \varphi = V$. Les deux espaces ont d'ailleurs la même dimension, $2$. C'est le geste de transport du chapitre 10 — une bijection qui respecte les lois —, joué sur une structure d'espace vectoriel au lieu d'une structure de groupe. Pour la nommer, ce chapitre dira simplement que $\varphi$ est une **bijection linéaire** — c'est l'expression de cette leçon, pas un mot d'énoncé à recopier.

### Le même mot chez les groupes : le noyau d'un morphisme

Le mot « noyau » ne sert pas qu'aux espaces vectoriels. Soit $f : (E,\star) \to (E',\top)$ un morphisme de groupes — au sens du chapitre 10 : $f(x \star y) = f(x) \top f(y)$ pour tous $x, y$ de $E$ —, de neutres $e_E$ et $e_{E'}$. Son noyau est $\ker f = \{x \in E \ /\ f(x) = e_{E'}\}$. Le même mot, le même geste, dans la structure d'à côté — et l'équivalence qu'on vient de démontrer se rejoue ligne pour ligne.

**Le neutre va sur le neutre.** D'une part $f(e_E) \top f(e_E) = f(e_E \star e_E)$ ; d'autre part $e_E \star e_E = e_E$. Donc

$$f(e_E) \top f(e_E) = f(e_E)$$

Compose les deux membres par le symétrique de $f(e_E)$ dans $E'$ : il reste $f(e_E) = e_{E'}$.

**Le symétrique va sur le symétrique.** Pour $x$ de $E$ et son symétrique $x'$, pars de la définition du morphisme :

$$f(x) \top f(x') = f(x \star x')$$

$$f(x \star x') = f(e_E)$$

$$f(e_E) = e_{E'}$$

Le même calcul, mené dans l'autre ordre, donne $f(x') \top f(x) = e_{E'}$. Donc $f(x')$ est le symétrique de $f(x)$ : $f(x') = \big(f(x)\big)'$.

**Le noyau est un sous-groupe de $(E,\star)$** — les trois conditions du chapitre 5, sans une de plus :

1. $e_E \in \ker f$, puisque $f(e_E) = e_{E'}$ ✓ ;
2. si $f(x) = e_{E'}$ et $f(y) = e_{E'}$, alors $f(x \star y) = e_{E'} \top e_{E'}$, c'est-à-dire $e_{E'}$ ✓ ;
3. si $f(x) = e_{E'}$, alors $f(x') = (e_{E'})'$, c'est-à-dire $e_{E'}$ ✓.

**Injective si et seulement si le noyau est réduit au neutre.** Suppose $\ker f = \{e_E\}$, et prends $x, y$ de $E$ tels que $f(x) = f(y)$. Le morphisme, puis le symétrique qui va sur le symétrique, puis l'hypothèse $f(x) = f(y)$ :

$$f(x \star y') = f(x) \top f(y')$$

$$f(x) \top f(y') = f(x) \top \big(f(y)\big)'$$

$$f(x) \top \big(f(y)\big)' = f(y) \top \big(f(y)\big)'$$

$$f(y) \top \big(f(y)\big)' = e_{E'}$$

Donc $x \star y' \in \ker f$, c'est-à-dire $x \star y' = e_E$ ; compose à droite par $y$, et il reste $x = y$. Réciproquement, si $f$ est injective, un $x$ du noyau vérifie $f(x) = e_{E'}$ et $f(e_E) = e_{E'}$, donc $x = e_E$.

**Un exemple.** Soit $f : (\mathbb{R}^*,\times) \to (\mathbb{R}^*,\times)$ définie par $f(x) = x^2$. C'est un morphisme, puisque $(xy)^2 = x^2 y^2$. Attention au neutre : celui de $(\mathbb{R}^*,\times)$ est $1$, pas $0$. Donc

$$\ker f = \{x \in \mathbb{R}^* \ /\ x^2 = 1\}$$

$$\{x \in \mathbb{R}^* \ /\ x^2 = 1\} = \{1,\ -1\}$$

C'est un sous-groupe à deux éléments : $1$ y est, $(-1) \times (-1) = 1$ y reste, et chacun est son propre symétrique. Le noyau n'est pas réduit au neutre, donc $f$ n'est **pas injective** : $f(2) = 4$ et $f(-2) = 4$. Et $\mathrm{Im}\, f = \mathbb{R}^*_+$, qui n'est pas $\mathbb{R}^*$ : l'image n'est pas non plus l'ensemble d'arrivée tout entier.

### Avant l'exercice : l'ordre des questions est un outil

Trois remarques, et aucune ne donne de réponse.

L'énoncé pose l'espace ambiant **avant** de poser sa question : c'est la phrase de rappel par laquelle ce chapitre a commencé.

Les questions sont **ordonnées**, et cet ordre est une information. Quand un sujet demande une chose, puis une chose voisine sur **le même** ensemble, la seconde question ne repart pas de zéro. Avant de rédiger, relis ce que tu viens d'établir, et demande-toi ce qui, dans la liste des trois conditions, est déjà acquis. C'est un geste de lecture, pas un résultat ; le résultat, c'est à toi de le trouver — maintenant, sur le sujet qui suit.

La suite de l'exercice sort de ce chapitre : l'énoncé enchaîne sur la stabilité pour $\times$ et sur l'anneau (chapitre 7), puis sur un isomorphisme (chapitre 10). Ce chapitre ouvre l'exercice ; il ne le ferme pas.

### Exercice de type bac

Les deux questions ci-dessous ouvrent un sujet d'examen national (Sciences Mathématiques, session normale 2023). Rédige-les toi-même, question par question, avant d'ouvrir le raisonnement expert : ici, on ne te demande pas de reconnaître une réponse, mais d'écrire une démonstration.

[[exercise:r8-bac]]

### Une variation pour ne pas mémoriser

Même chaîne, un autre ensemble de matrices — et deux questions de plus, que le sujet de 2023 ne posait pas : la base, puis l'application qui fabrique les éléments de l'ensemble. Si tu as retenu la méthode plutôt que les nombres, celle-ci ne te résistera pas.

[[exercise:r8-variation]]

<!-- NOTE D'AUTEUR (content-author, 2026-10-20) — chapitre 11, construit depuis
     maths-structures-espaces-vectoriels.md (supprimé le 2026-10-22) (révision (b)
     du 2026-10-20, après la passe arithmétique), défauts du §15 pris tels qu'écrits.

     Ordre des morceaux : exactement le §10.2 de la spec — accroche + pari 1
     (cp-r8-pari-scalaire), bloc A, bloc B (critère à TROIS conditions, table
     d'échange avec le chapitre 5, [C3] [C4], pari 2 cp-r8-pari-stabilite, [C5],
     figure sous-espaces-plan à la réponse du pari), [C6] [C6b] [C7], bloc C
     ([C8], [C9] en voix/test/rupture, [C9b]), bloc D ([C10a], [C10], pari 3
     cp-r8-pari-notation, [C11], pari 4 cp-r8-pari-dimension, [C12] [C13] [C14],
     figure echelle-dimensions-r3, raccourci admis + mise en garde sur sa
     lecture inverse), bloc E ([C15]–[C18]), clôture §6.6, puis r8-bac et
     r8-variation sous des titres ###. Aucun titre ## ajouté hors du titre du
     chapitre : la leçon compte 11 chapitres.

     Rédaction composant / prose (§10.3, correctif m2) : [C6], [C8], [C9b] (i)
     et (ii), [C10], [C11], [C12], [C13], [C14], [C16] (noyau, puis image) sont
     dans derivations.yaml ; les cinq annotations de raisonnement restent en
     prose, juste avant leur composant.

     Tous les nombres viennent du §6 (et du §12.2 pour les exercices) ; chacun a
     été recalculé en arithmétique exacte avant écriture. Écarts au texte de la
     spec, tous de forme : (1) l'annotation de [C8] ne renvoie plus « au
     chapitre 2 » — le chapitre 2 (loi interne) ne résout aucun système ; (2) les
     égalités en chaîne du §6 sont coupées en une transformation par ligne ;
     (3) une phrase ajoutée après [C11] établit dim ℝ² = 2 et dim ℝ³ = 3, que le
     pari 4 (option D) et le raccourci admis supposent connus ; (4) une phrase
     ajoutée au début du bloc B dit ce qu'hérite un sous-espace (même geste
     qu'au chapitre 5), pour que le critère ait son « pourquoi » ; (5) le
     raccourci « se lit à l'envers neuf fois sur dix » devient « très souvent » :
     pas de fréquence chiffrée sans mesure.

     RÉVISION DU 2026-10-20 (content-author), sur les deux critiques de la
     vague 1 du chapitre construit — docs/audits/critiques/espaces-vectoriels-
     build-pedagogie.md et …-build-fidelite.md :
     (a) M(a, b) nommait deux matrices dans le même chapitre (F à l'accroche,
         où M(1, 0) = I ; puis V, où M(1, 0) ≠ I) : les éléments de V
         s'appellent désormais Y(a, b) — Y est la seule majuscule latine que
         ni la leçon, ni les items, ni les checkpoints, ni les exercices
         n'emploient —, ici et dans derivations.yaml, avec une phrase qui dit
         pourquoi et rappelle que les sujets redéfinissent M (fidélité M2).
         La variation garde son M(x, y), défini dans son propre énoncé.
     (b) Après la définition de la dimension : un seul vecteur non nul est
         libre (λu = 0_E, u ≠ 0_E ⟹ λ = 0), le vecteur nul n'entre dans aucune
         famille libre, donc dim {0_E} = 0 — la figure garde son barreau
         « dimension 0 » (fidélité M1 et L4).
     (c) Un cinquième pari, cp-r8-pari-noyau, au bloc E, avant noyau-f :
         « que contient ker f ? » (pédagogie I-1). Il lève, pour ce seul pari,
         la délégation de M6 au banc d'items écrite en spec §7.5 — décision à
         reporter dans la spec par le pedagogy-architect.
     (d) r8-variation reçoit une q4 (φ(x, y) = M(x, y) : linéaire, noyau,
         image, bijection sur E), pour que le sommet monte aussi le bloc E
         (pédagogie I-2). r8-bac q1 suit désormais le critère du chapitre 5,
         sans ligne sur l'associativité (pédagogie B-1 = fidélité M3).
     (e) Une transformation par ligne affichée (pédagogie I-3) : la liberté
         de (t₁, t₂), le symétrique qui va sur le symétrique, et l'injectivité
         d'un morphisme de noyau trivial sont promus en blocs.
     (f) Petits : le « nous » éditorial des trois observations de corpus
         devient le registre du tuteur, sans fréquence (renvois au sujet de
         2023 et au chapitre « S'entraîner ») ; pourquoi « 0_E ∈ H » peut
         remplacer « H non vide » ; X nommé avant son pari, sans
         ré-introduction ; « bijection linéaire » dite expression de la leçon,
         pas mot d'énoncé (fidélité L3).
     Non fait ici, et pourquoi : la longueur du chapitre (pédagogie I-6) est
     une décision du propriétaire — aucun titre ## ajouté, rien de ce que la
     spec exige n'est retiré ; les ajouts portent le chapitre de 416 à 455
     lignes visibles, surtout par des blocs d'une transformation chacun.
-->
