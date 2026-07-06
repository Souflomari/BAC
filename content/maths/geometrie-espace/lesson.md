# Géométrie dans l'espace

---

## R0 — Accroche : la diagonale du cube

Imagine un cube $ABCDEFGH$ : $ABCD$ est la face du bas, $EFGH$ la face du haut, avec $E$ juste au-dessus de $A$, $F$ au-dessus de $B$, $G$ au-dessus de $C$, $H$ au-dessus de $D$.

Trace mentalement deux segments : la **grande diagonale** $(AG)$, qui traverse le cube de part en part d'un coin à son coin opposé, et la **diagonale de la face du bas** $(BD)$.

Avant de lire la suite, prends position : d'après toi, ces deux droites sont-elles perpendiculaires, ou n'ont-elles aucun lien particulier ? Regarde le cube dans ta tête, tourne-le, essaie de trancher à l'oeil.

C'est difficile, non ? Et c'est bien le problème. À l'oeil, sur un dessin en perspective, deux droites de l'espace peuvent sembler perpendiculaires sans l'être, ou l'inverse — la perspective ment. Pire : $(AG)$ et $(BD)$ ne se croisent même pas (elles ne passent pas par le même point), donc « perpendiculaires » n'a même pas un sens évident ici.

Ce dont on a besoin, c'est d'un moyen de trancher ce genre de question **avec des nombres**, sans dépendre d'un dessin ni d'une intuition. C'est exactement ce que cette leçon construit : une façon de décrire un point, une droite, un plan de l'espace par des coordonnées, puis de calculer à partir de ces coordonnées des distances, des angles, des aires, des volumes — et de répondre à des questions comme celle du cube avec une certitude totale.

On y revient précisément à la fin de la partie R2. Ne cherche pas encore la réponse — on construit l'outil, pièce par pièce, et on revient trancher.

---

## R1 — Repère de l'espace : coordonnées et distances

### Ajouter une troisième dimension

Tu connais déjà le repère du plan : un point $O$, deux vecteurs $\vec{i}$ et $\vec{j}$ unitaires et orthogonaux, et tout point $M$ du plan est repéré par un couple $(x,y)$. Un point de l'espace a besoin d'une information de plus : à quelle hauteur il se trouve au-dessus (ou en dessous) de ce plan.

On ajoute donc un troisième vecteur $\vec{k}$, unitaire, et **orthogonal aux deux premiers** — perpendiculaire à tout le plan $(O,\vec{i},\vec{j})$, pas seulement à l'un des deux vecteurs. Le triplet $(O\,;\,\vec{i},\vec{j},\vec{k})$ est un **repère orthonormé de l'espace**.

Tout point $M$ de l'espace est alors repéré par un triplet $(x,y,z)$ : $x$ et $y$ te disent où se trouve, dans le plan $(O,\vec{i},\vec{j})$, le pied $H$ de la perpendiculaire abaissée de $M$ sur ce plan (le **projeté** de $M$) ; $z$ te dit à quelle hauteur, le long de $\vec{k}$, il faut monter (ou descendre, si $z<0$) depuis $H$ pour atteindre $M$. Localiser un point de l'espace, c'est toujours cette même démarche en deux temps : d'abord où, à plat ; ensuite, à quelle hauteur.

Un vecteur $\overrightarrow{AB}$, avec $A(x_A,y_A,z_A)$ et $B(x_B,y_B,z_B)$, a pour coordonnées $(x_B-x_A,\ y_B-y_A,\ z_B-z_A)$ — exactement la même règle « arrivée moins départ » que dans le plan, coordonnée par coordonnée.

### La formule de la distance — et pourquoi elle est juste

Comment calculer $AB$, la distance entre deux points de l'espace ? On va la construire à partir d'un seul outil, déjà connu : le théorème de Pythagore, appliqué **deux fois de suite**.

Notons $H_A(x_A,y_A,0)$ et $H_B(x_B,y_B,0)$ les projetés de $A$ et $B$ sur le plan $(O,\vec{i},\vec{j})$ (on « aplatit » les deux points en oubliant leur hauteur).

**Premier Pythagore, à plat.** Dans le plan $(O,\vec{i},\vec{j})$, $H_A$ et $H_B$ sont deux points ordinaires du plan, et la formule de distance plane (déjà connue) donne :

$$H_AH_B = \sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$$

**Second Pythagore, à la verticale.** Les segments $AH_A$ et $BH_B$ sont tous deux parallèles à $\vec{k}$, donc perpendiculaires au plan $(O,\vec{i},\vec{j})$ — en particulier perpendiculaires au segment $H_AH_B$, qui vit dans ce plan. Le triangle $ABH_A H_B$ (dans le plan vertical qui contient ces quatre points) est donc rectangle, avec pour côtés $H_AH_B$ (horizontal) et $|z_B-z_A|$ (la différence de hauteur). Le théorème de Pythagore donne :

$$AB^2 = H_AH_B^2 + (z_B-z_A)^2$$

On substitue le premier résultat dans le second :

$$AB^2 = (x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2$$

D'où, en prenant la racine carrée :

$$AB = \sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$$

Ce n'est pas une nouvelle idée : c'est le théorème de Pythagore, appliqué une fois à plat pour gérer $x$ et $y$ ensemble, puis une seconde fois à la verticale pour ajouter $z$. Et pour un vecteur $\vec{u}(x,y,z)$, sa norme suit exactement la même formule (c'est la distance entre son origine et son extrémité) :

$$\|\vec{u}\| = \sqrt{x^2+y^2+z^2}$$

### Exemple travaillé

On place le cube de l'accroche dans un repère orthonormé $(A\,;\,\vec{i},\vec{j},\vec{k})$ d'arête $1$, avec $\vec{i}=\overrightarrow{AB}$, $\vec{j}=\overrightarrow{AD}$, $\vec{k}=\overrightarrow{AE}$. Les sommets ont alors pour coordonnées :

$$A(0,0,0)\quad B(1,0,0)\quad C(1,1,0)\quad D(0,1,0)$$
$$E(0,0,1)\quad F(1,0,1)\quad G(1,1,1)\quad H(0,1,1)$$

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer la longueur de la grande diagonale $AG$, en appliquant directement la formule qu'on vient d'établir — c'est le cas le plus simple pour se familiariser avec elle avant de l'utiliser sur des cas moins symétriques.

$$AG = \sqrt{(1-0)^2+(1-0)^2+(1-0)^2} = \sqrt{1+1+1} = \sqrt3$$

La grande diagonale d'un cube d'arête $1$ mesure $\sqrt3$. Remarque au passage : les trois écarts de coordonnées valaient chacun $1$ — c'est le cas le plus simple de la formule, mais le mécanisme (deux Pythagore empilés) reste le même quels que soient les nombres.

---

## R2 — Le produit scalaire dans l'espace

### La définition géométrique ne change pas

Le produit scalaire de deux vecteurs $\vec{u}$ et $\vec{v}$, tel que tu l'as vu dans le plan, garde exactement le même sens dans l'espace :

$$\vec{u}\cdot\vec{v} = \|\vec{u}\|\,\|\vec{v}\|\,\cos\!\left(\vec{u},\vec{v}\right)$$

Ça marche encore, même en trois dimensions, pour une raison simple : deux vecteurs, où qu'ils pointent dans l'espace, une fois appliqués à une même origine, déterminent toujours un plan commun (deux droites concourantes sont toujours coplanaires). L'angle $(\vec{u},\vec{v})$ est donc un angle plan ordinaire, mesuré dans ce plan commun — rien de nouveau à inventer.

### L'expression analytique — et pourquoi elle est juste

Ce qui change, c'est qu'on veut calculer $\vec{u}\cdot\vec{v}$ directement à partir des coordonnées, sans avoir à connaître l'angle. Pour ça, on décompose $\vec{u}$ et $\vec{v}$ sur la base $(\vec{i},\vec{j},\vec{k})$ : $\vec{u} = x\vec{i}+y\vec{j}+z\vec{k}$ et $\vec{v} = x'\vec{i}+y'\vec{j}+z'\vec{k}$.

Comme la base est orthonormée, chaque vecteur de base a une norme $1$ et deux vecteurs de base distincts sont orthogonaux. La définition géométrique donne donc, directement :

$$\vec{i}\cdot\vec{i}=\vec{j}\cdot\vec{j}=\vec{k}\cdot\vec{k}=1 \qquad \text{et} \qquad \vec{i}\cdot\vec{j}=\vec{j}\cdot\vec{k}=\vec{k}\cdot\vec{i}=0$$

En développant $\vec{u}\cdot\vec{v}$ terme à terme (le produit scalaire se distribue sur une somme, exactement comme une multiplication ordinaire), tous les termes croisés qui associent deux vecteurs de base différents s'annulent — il ne reste que les trois termes « diagonaux » :

$$\vec{u}\cdot\vec{v} = (x\vec{i}+y\vec{j}+z\vec{k})\cdot(x'\vec{i}+y'\vec{j}+z'\vec{k})$$

$$\vec{u}\cdot\vec{v} = xx'(\vec{i}\cdot\vec{i}) + yy'(\vec{j}\cdot\vec{j}) + zz'(\vec{k}\cdot\vec{k}) + \big(\text{termes croisés, tous nuls}\big)$$

$$\vec{u}\cdot\vec{v} = xx' + yy' + zz'$$

C'est l'**expression analytique du produit scalaire dans l'espace**. Une conséquence immédiate, en prenant $\vec{v}=\vec{u}$ : $\vec{u}\cdot\vec{u} = x^2+y^2+z^2 = \|\vec{u}\|^2$, ce qui redonne exactement la formule de la norme du R1.

### Ce que ça donne : orthogonalité et angle

Deux vecteurs sont **orthogonaux** si et seulement si leur produit scalaire est nul :

$$\vec{u}\perp\vec{v} \iff \vec{u}\cdot\vec{v}=0 \iff xx'+yy'+zz'=0$$

Et quand on veut l'angle lui-même, on isole $\cos(\vec{u},\vec{v})$ dans la définition géométrique :

$$\cos\!\left(\vec{u},\vec{v}\right) = \frac{\vec{u}\cdot\vec{v}}{\|\vec{u}\|\,\|\vec{v}\|}$$

### Exemple travaillé

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer $\vec{u}\cdot\vec{v}$ pour $\vec{u}(3,1,-2)$ et $\vec{v}(2,-3,1)$. On applique directement la formule — multiplier coordonnée par coordonnée, puis additionner les trois produits, jamais additionner les coordonnées elles-mêmes.

$$\vec{u}\cdot\vec{v} = 3\times2 + 1\times(-3) + (-2)\times1 = 6-3-2 = 1$$

Le résultat n'est pas nul : $\vec{u}$ et $\vec{v}$ ne sont pas orthogonaux.

### Fermeture de l'arc : la diagonale du cube, tranchée

Reprends le cube du R0, avec les coordonnées établies au R1. La grande diagonale a pour vecteur directeur $\overrightarrow{AG}(1,1,1)$. La diagonale de la face du bas a pour vecteur directeur $\overrightarrow{BD} = D - B = (0-1,\ 1-0,\ 0-0) = (-1,1,0)$.

**Ce qu'on cherche ici, et pourquoi ce geste :** on applique le test d'orthogonalité — calculer le produit scalaire des deux vecteurs directeurs, et regarder s'il s'annule.

$$\overrightarrow{AG}\cdot\overrightarrow{BD} = 1\times(-1) + 1\times1 + 1\times0 = -1+1+0 = 0$$

Le produit scalaire est nul : les vecteurs $\overrightarrow{AG}$ et $\overrightarrow{BD}$ sont **orthogonaux**. À l'oeil, sur un dessin, ce n'était pas évident — mais avec les coordonnées, c'est tranché sans ambiguïté.

**Une nuance de vocabulaire, importante pour la suite.** $(AG)$ et $(BD)$ ne se coupent pas (ce sont deux droites de l'espace qui ne passent par aucun point commun — on le vérifierait en cherchant une solution commune à leurs deux représentations paramétriques, et on n'en trouverait pas). On dit qu'elles sont **orthogonales** — leurs directions sont perpendiculaires — mais **pas perpendiculaires**, terme réservé aux droites qui, en plus d'avoir des directions orthogonales, se coupent réellement. Deux droites de l'espace peuvent tout à fait avoir des directions orthogonales sans jamais se croiser. On retrouve cette distinction, avec un exemple similaire, au R7.

---

## R3 — Le produit vectoriel : un vecteur perpendiculaire, et une aire

### Le problème que le produit scalaire ne résout pas

Le produit scalaire renvoie un **nombre**. Mais il y a des situations où on a besoin, à partir de deux vecteurs $\vec{u}$ et $\vec{v}$, de construire un **troisième vecteur**, perpendiculaire aux deux premiers à la fois — par exemple pour trouver la direction normale à un plan (deux vecteurs du plan ne suffisent pas directement à donner « la » perpendiculaire ; il faut un outil qui en fabrique une). C'est ce que fait le **produit vectoriel**, noté $\vec{u}\wedge\vec{v}$.

### Définition par les coordonnées

Pour $\vec{u}(x,y,z)$ et $\vec{v}(x',y',z')$, on définit :

$$\vec{u}\wedge\vec{v} = \left(yz'-zy',\ zx'-xz',\ xy'-yx'\right)$$

Chaque composante s'obtient en « cachant » une des trois coordonnées (celle du même nom que la composante qu'on calcule) et en croisant les deux autres en diagonale, avec un signe. Vérifie sur un cas que tu connais déjà : $\vec{i}(1,0,0)$ et $\vec{j}(0,1,0)$ donnent $\vec{i}\wedge\vec{j} = (0\times0-0\times1,\ 0\times0-1\times0,\ 1\times1-0\times0) = (0,0,1) = \vec{k}$ — exactement la relation que tu utilises déjà sans la nommer quand tu orientes un repère.

### Pourquoi ce vecteur est orthogonal à $\vec{u}$ et à $\vec{v}$

On peut le vérifier directement avec le produit scalaire du R2 : calcule $\vec{u}\cdot(\vec{u}\wedge\vec{v})$.

$$\vec{u}\cdot(\vec{u}\wedge\vec{v}) = x(yz'-zy') + y(zx'-xz') + z(xy'-yx')$$

$$\vec{u}\cdot(\vec{u}\wedge\vec{v}) = xyz'-xzy' + yzx'-yxz' + zxy'-zyx'$$

Regarde ces six termes : ils s'annulent deux par deux ($xyz'$ et $-yxz'$ sont opposés, $-xzy'$ et $zxy'$ aussi, $yzx'$ et $-zyx'$ aussi — ce sont les mêmes produits, dans un ordre différent, avec des signes opposés). La somme vaut donc $0$. Le même calcul, avec $\vec{v}$ à la place de $\vec{u}$, donnerait aussi $0$. **C'est pour ça** que $\vec{u}\wedge\vec{v}$ est orthogonal à la fois à $\vec{u}$ et à $\vec{v}$ — ce n'est pas un postulat, c'est une conséquence directe de la formule.

### Pourquoi sa norme est une aire

Une identité algébrique (elle se vérifie en développant les deux membres terme à terme à partir des coordonnées) relie la norme du produit vectoriel au produit scalaire :

$$\|\vec{u}\wedge\vec{v}\|^2 = \|\vec{u}\|^2\|\vec{v}\|^2 - (\vec{u}\cdot\vec{v})^2$$

On remplace $\vec{u}\cdot\vec{v}$ par $\|\vec{u}\|\|\vec{v}\|\cos\theta$ (la définition géométrique du R2), où $\theta=(\vec{u},\vec{v})$ :

$$\|\vec{u}\wedge\vec{v}\|^2 = \|\vec{u}\|^2\|\vec{v}\|^2 - \|\vec{u}\|^2\|\vec{v}\|^2\cos^2\theta$$

$$\|\vec{u}\wedge\vec{v}\|^2 = \|\vec{u}\|^2\|\vec{v}\|^2\left(1-\cos^2\theta\right) = \|\vec{u}\|^2\|\vec{v}\|^2\sin^2\theta$$

D'où, en prenant la racine carrée (et puisque $\theta\in[0,\pi]$, $\sin\theta\geq0$) :

$$\|\vec{u}\wedge\vec{v}\| = \|\vec{u}\|\,\|\vec{v}\|\,\sin\theta$$

Or $\|\vec{u}\|\|\vec{v}\|\sin\theta$, c'est exactement « base fois hauteur » du parallélogramme construit sur $\vec{u}$ et $\vec{v}$ : $\|\vec{u}\|$ est la longueur de la base, et $\|\vec{v}\|\sin\theta$ est la hauteur (la composante de $\vec{v}$ perpendiculaire à $\vec{u}$). **Voilà pourquoi** $\|\vec{u}\wedge\vec{v}\|$ est l'aire du parallélogramme construit sur $\vec{u}$ et $\vec{v}$ — et l'aire du triangle correspondant en est la moitié.

### Exemple travaillé

On introduit un tétraèdre qui va servir de fil conducteur pour plusieurs rungs à venir : $A(0,0,0)$, $B(2,0,0)$, $C(0,2,0)$, $S(0,0,2)$ — un tétraèdre **trirectangle en $A$** (les trois arêtes $AB$, $AC$, $AS$ sont deux à deux perpendiculaires, portées par les axes du repère).

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer l'aire du triangle $ABC$. Plutôt que de chercher une hauteur à la main, on calcule $\overrightarrow{AB}\wedge\overrightarrow{AC}$, dont la norme donne directement l'aire du parallélogramme — il suffira de diviser par deux.

$$\overrightarrow{AB}\wedge\overrightarrow{AC} = \left(0\times0-0\times2,\ 0\times0-2\times0,\ 2\times2-0\times0\right) = (0,0,4)$$

$$\left\|\overrightarrow{AB}\wedge\overrightarrow{AC}\right\| = \sqrt{0^2+0^2+4^2} = 4$$

L'aire du parallélogramme construit sur $\overrightarrow{AB}$ et $\overrightarrow{AC}$ vaut $4$. Le triangle $ABC$ en occupe la moitié : $\text{aire}(ABC) = 2$. **Vérification directe :** $AB$ et $AC$ sont perpendiculaires (le tétraèdre est trirectangle en $A$) et mesurent chacun $2$, donc le triangle $ABC$ est rectangle en $A$ avec deux côtés de longueur $2$ : son aire vaut $\frac{1}{2}\times2\times2=2$. Les deux méthodes coïncident.

---

## R4 — Produit mixte, déterminant, et volume

### Combiner les deux outils

On dispose maintenant de deux opérations sur les vecteurs : le produit scalaire (R2), qui renvoie un nombre, et le produit vectoriel (R3), qui renvoie un vecteur. En les enchaînant sur trois vecteurs $\vec{u}$, $\vec{v}$, $\vec{w}$, on obtient un nouveau nombre, appelé le **produit mixte** :

$$\left[\vec{u},\vec{v},\vec{w}\right] = \left(\vec{u}\wedge\vec{v}\right)\cdot\vec{w}$$

En substituant la formule du produit vectoriel (R3) dans celle du produit scalaire (R2), on obtient une expression directement calculable à partir des neuf coordonnées :

$$\left[\vec{u},\vec{v},\vec{w}\right] = (yz'-zy')x'' + (zx'-xz')y'' + (xy'-yx')z''$$

où $\vec{u}(x,y,z)$, $\vec{v}(x',y',z')$, $\vec{w}(x'',y'',z'')$. Ce même nombre, en regroupant ses six termes autrement, s'appelle aussi le **déterminant** des trois vecteurs, noté $\det(\vec{u},\vec{v},\vec{w})$ — deux noms, une seule quantité.

### Pourquoi sa valeur absolue est un volume

Le parallélépipède construit sur $\vec{u}$, $\vec{v}$, $\vec{w}$ a pour volume : (aire de la base, le parallélogramme construit sur $\vec{u}$ et $\vec{v}$) $\times$ (hauteur). Or l'aire de la base vaut $\|\vec{u}\wedge\vec{v}\|$ (R3), et la hauteur est la longueur de la projection de $\vec{w}$ sur la direction perpendiculaire à la base — c'est-à-dire sur la direction de $\vec{u}\wedge\vec{v}$ lui-même, puisque ce vecteur est justement perpendiculaire à $\vec{u}$ et $\vec{v}$ (R3). Cette hauteur vaut $\dfrac{|(\vec{u}\wedge\vec{v})\cdot\vec{w}|}{\|\vec{u}\wedge\vec{v}\|}$ (la définition même d'une projection sur un vecteur). En multipliant :

$$V_{\text{parallélépipède}} = \|\vec{u}\wedge\vec{v}\| \times \frac{|(\vec{u}\wedge\vec{v})\cdot\vec{w}|}{\|\vec{u}\wedge\vec{v}\|} = \left|\left(\vec{u}\wedge\vec{v}\right)\cdot\vec{w}\right| = \left|\left[\vec{u},\vec{v},\vec{w}\right]\right|$$

Le volume du **tétraèdre** construit sur les mêmes trois arêtes s'en déduit par un facteur constant : sa base est le triangle (la moitié du parallélogramme, facteur $\frac12$), et le volume d'une pyramide vaut le tiers de (aire de la base $\times$ hauteur, facteur $\frac13$) — la même hauteur que le parallélépipède, puisque le sommet est le même point $w$. En combinant les deux facteurs, $\frac12\times\frac13=\frac16$ :

$$V_{\text{tétraèdre}} = \frac{1}{6}\left|\left[\vec{u},\vec{v},\vec{w}\right]\right|$$

Une conséquence immédiate : si $\left[\vec{u},\vec{v},\vec{w}\right]=0$, le volume est nul — les trois vecteurs sont **coplanaires** (le « parallélépipède » est aplati, sans épaisseur). C'est le test de coplanarité de trois vecteurs.

### Exemple travaillé

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer le volume du tétraèdre $SABC$ introduit au R3. On a déjà $\overrightarrow{AB}\wedge\overrightarrow{AC}=(0,0,4)$ ; il ne reste qu'à faire le produit scalaire avec $\overrightarrow{AS}=(0,0,2)$.

$$\left[\overrightarrow{AB},\overrightarrow{AC},\overrightarrow{AS}\right] = (0,0,4)\cdot(0,0,2) = 0\times0+0\times0+4\times2 = 8$$

$$V_{SABC} = \frac{1}{6}\times|8| = \frac{8}{6} = \frac{4}{3}$$

**Vérification par la formule « aire de base $\times$ hauteur » :** le triangle $ABC$ a pour aire $2$ (R3) et vit dans le plan $z=0$ ; le sommet $S(0,0,2)$ est à une hauteur $2$ au-dessus de ce plan. $V_{SABC} = \frac13\times2\times2=\frac43$. Les deux méthodes coïncident.

---

## R5 — La droite : représentations paramétrique et cartésienne

### Décrire une droite par un point et une direction

Une droite $\mathcal D$ de l'espace est entièrement déterminée par un point $A(x_A,y_A,z_A)$ qui lui appartient et un **vecteur directeur** $\vec{u}(a,b,c)$ non nul, parallèle à $\mathcal D$. Un point $M(x,y,z)$ appartient à $\mathcal D$ si et seulement si $\overrightarrow{AM}$ est colinéaire à $\vec{u}$ — c'est-à-dire s'il existe un réel $t$ tel que $\overrightarrow{AM} = t\,\vec{u}$. En coordonnées, ceci équivaut à :

$$\begin{cases} x = x_A + ta \\ y = y_A + tb \\ z = z_A + tc \end{cases} \qquad t\in\mathbb{R}$$

C'est la **représentation paramétrique** de $\mathcal D$ : chaque valeur de $t$ donne un point de la droite, et chaque point de la droite correspond à exactement une valeur de $t$.

### La forme cartésienne (symétrique) — quand elle existe

Si les trois coefficients $a,b,c$ sont tous non nuls, on peut isoler $t$ dans chacune des trois équations et les égaler :

$$t = \frac{x-x_A}{a} = \frac{y-y_A}{b} = \frac{z-z_A}{c}$$

C'est la **forme cartésienne** (ou symétrique) de la droite : deux égalités entre trois rapports, qui décrivent la même droite sans faire référence explicitement au paramètre $t$.

**Le cas particulier à connaître :** si l'une des coordonnées de $\vec{u}$ est nulle — disons $b=0$ — alors $y$ ne dépend pas de $t$ : $y=y_A$ tout le long de la droite. On ne peut plus écrire $\frac{y-y_A}{0}$ (division interdite). La droite s'écrit alors comme l'intersection de deux plans : $y=y_A$ (un plan) et $\frac{x-x_A}{a}=\frac{z-z_A}{c}$ (un autre plan, en réarrangeant). C'est encore une droite, juste décrite autrement — par un système de deux équations plutôt que par une chaîne de trois rapports.

### Exemple travaillé — cas général

**Ce qu'on cherche ici, et pourquoi ce geste :** écrire la représentation paramétrique et la forme cartésienne de la droite $\mathcal D$ passant par $P(2,-1,0)$, de vecteur directeur $\vec{u}(1,-2,3)$ — un vecteur directeur sans coordonnée nulle, pour illustrer le cas général.

$$\begin{cases} x = 2+t \\ y = -1-2t \\ z = 3t \end{cases} \qquad t\in\mathbb{R}$$

$$\frac{x-2}{1} = \frac{y+1}{-2} = \frac{z}{3}$$

**Vérifier qu'un point appartient à la droite :** le point $(3,-3,3)$ est-il sur $\mathcal D$ ? On cherche $t$ tel que $z=3t=3$, donc $t=1$. Pour cette valeur, $x=2+1=3$ (ça correspond) et $y=-1-2\times1=-3$ (ça correspond aussi). Les trois équations sont satisfaites par la même valeur de $t$ : le point est bien sur la droite.

### Exemple travaillé — cas particulier ($b=0$)

La droite $(SA)$ du tétraèdre du R3-R4, avec $S(0,0,2)$ et $A(0,0,0)$, a pour vecteur directeur $\overrightarrow{AS}(0,0,2)$, colinéaire à $(0,0,1)$. Deux des trois coordonnées sont nulles.

$$\begin{cases} x=0 \\ y=0 \\ z=t \end{cases} \qquad t\in\mathbb{R}$$

Pas de forme symétrique possible ici (division par $0$ interdite deux fois) ; la droite s'écrit simplement comme l'intersection des deux plans $x=0$ et $y=0$ — l'axe vertical passant par $A$. Remarque : la droite $(SA)$, comme objet mathématique, ne s'arrête pas en $S$ ni en $A$ : le point $(0,0,5)$, obtenu pour $t=5$, appartient bien à la droite $(SA)$, même s'il est en dehors du segment $[AS]$.

---

## R6 — Le plan : vecteur normal et équation cartésienne

### Un plan, défini par un point et une perpendiculaire

Un plan $\mathcal P$ est entièrement déterminé par un point $A_0(x_0,y_0,z_0)$ qui lui appartient et un **vecteur normal** $\vec{n}(a,b,c)$ non nul, perpendiculaire à $\mathcal P$ (donc orthogonal à tout vecteur du plan). Un point $M(x,y,z)$ appartient à $\mathcal P$ si et seulement si $\overrightarrow{A_0M}$ est orthogonal à $\vec{n}$ — exactement le test d'orthogonalité du R2 :

$$\vec{n}\cdot\overrightarrow{A_0M} = 0$$

[[figure:plan-normal]]

On développe ce produit scalaire avec la formule analytique du R2 :

$$a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$$

On distribue et on regroupe la constante :

$$ax+by+cz \underbrace{-\left(ax_0+by_0+cz_0\right)}_{\text{on note ce nombre } d} = 0$$

D'où la forme habituelle :

$$ax+by+cz+d=0$$

C'est l'**équation cartésienne** du plan : les coefficients $a,b,c$ de $x,y,z$ sont exactement les coordonnées du vecteur normal $\vec{n}$ — pas la constante $d$, qui ne fait que coder la position du plan (à quelle « distance » de l'origine, le long de $\vec{n}$).

### Trouver un plan à partir de trois points

Si on connaît trois points non alignés $A_0$, $B_0$, $C_0$ d'un plan plutôt qu'un vecteur normal directement, on fabrique ce vecteur normal avec l'outil du R3 : $\overrightarrow{A_0B_0}$ et $\overrightarrow{A_0C_0}$ sont deux vecteurs du plan, donc $\vec{n} = \overrightarrow{A_0B_0}\wedge\overrightarrow{A_0C_0}$ est orthogonal aux deux à la fois — c'est un vecteur normal au plan.

### Exemple travaillé

On reprend le tétraèdre $SABC$ ($A(0,0,0)$, $B(2,0,0)$, $C(0,2,0)$, $S(0,0,2)$) et on cherche l'équation cartésienne du plan $(SBC)$ — la face oblique.

**Ce qu'on cherche ici, et pourquoi ce geste :** on a trois points de ce plan ($S$, $B$, $C$) mais pas de vecteur normal ; on en fabrique un avec le produit vectoriel de deux vecteurs du plan, puis on applique la formule établie ci-dessus.

$$\overrightarrow{SB} = (2,0,-2) \qquad \overrightarrow{SC} = (0,2,-2)$$

$$\overrightarrow{SB}\wedge\overrightarrow{SC} = \left(0\times(-2)-(-2)\times2,\ (-2)\times0-2\times(-2),\ 2\times2-0\times0\right) = (4,4,4)$$

On peut simplifier ce vecteur normal en le divisant par $4$ (un vecteur normal reste normal si on le multiplie par un réel non nul) : $\vec{n}=(1,1,1)$. L'équation a donc la forme $x+y+z+d=0$. On détermine $d$ en imposant que $S(0,0,2)$ appartienne au plan :

$$0+0+2+d=0 \implies d=-2$$

$$\left(SBC\right):\ x+y+z-2=0$$

**Vérification sur les deux autres points :** $B(2,0,0)$ donne $2+0+0-2=0$ ✓ ; $C(0,2,0)$ donne $0+2+0-2=0$ ✓. Les trois points vérifient bien l'équation.

---

## R7 — Positions relatives : droites et plans

### Le principe commun

Deux objets (droites, plans) qui ne sont pas parallèles se coupent **toujours** dans le plan — mais **pas nécessairement dans l'espace**, où il y a une troisième dimension pour « se rater ». C'est la question centrale de ce rung : à chaque fois, on commence par regarder les directions ; si elles ne suffisent pas à conclure, on résout un système pour chercher un point commun.

### Droite et droite

Deux droites $\mathcal D_1$ (vecteur directeur $\vec{u_1}$) et $\mathcal D_2$ (vecteur directeur $\vec{u_2}$) sont :

- **parallèles** si $\vec{u_1}$ et $\vec{u_2}$ sont colinéaires (il existe $k$ tel que $\vec{u_2}=k\vec{u_1}$) ;
- sinon, on cherche si elles ont un point commun en résolvant le système obtenu en égalant leurs représentations paramétriques. **Une solution existe** → les droites sont **sécantes** (et donc coplanaires). **Aucune solution** → les droites sont **non coplanaires** (on dit aussi « gauches ») : leurs directions diffèrent, mais elles passent l'une à côté de l'autre sans jamais se toucher, à des « hauteurs » différentes dans la troisième dimension.

**Exemple travaillé.** Dans le tétraèdre $SABC$, les arêtes opposées $(SA)$ et $(BC)$ ont-elles un point commun ?

$\overrightarrow{AS}=(0,0,2)$, colinéaire à $(0,0,1)$. $\overrightarrow{BC} = C-B = (-2,2,0)$, colinéaire à $(-1,1,0)$. Ces deux directions ne sont pas colinéaires (l'une a une troisième coordonnée non nulle, l'autre non) : les droites ne sont pas parallèles.

**Ce qu'on cherche ici, et pourquoi ce geste :** puisqu'elles ne sont pas parallèles, on cherche un point commun en résolvant le système. $(SA)$ se paramètre $(0,0,t)$ ; $(BC)$ se paramètre, depuis $B(2,0,0)$, par $(2-2s,\,2s,\,0)$.

$$\begin{cases} 0 = 2-2s \\ 0 = 2s \\ t = 0 \end{cases}$$

La première équation donne $s=1$ ; la deuxième donne $s=0$. **Contradiction** : aucune valeur de $s$ ne peut vérifier les deux à la fois. Le système n'a pas de solution : $(SA)$ et $(BC)$ sont **non coplanaires**.

Remarque : $\overrightarrow{AS}\cdot\overrightarrow{BC} = 0\times(-2)+0\times2+2\times0=0$ — leurs directions sont pourtant orthogonales ! C'est exactement la nuance du R2 : $(SA)$ et $(BC)$ sont **orthogonales** (directions perpendiculaires) mais **pas perpendiculaires** (elles ne se coupent pas). Une droite peut très bien croiser « orthogonalement » une autre droite sans jamais la toucher.

### Droite et plan

Une droite $\mathcal D$ (vecteur directeur $\vec{u}$) et un plan $\mathcal P$ (vecteur normal $\vec{n}$) sont :

- **parallèles** (au sens large) si $\vec{u}\cdot\vec{n}=0$ — la direction de $\mathcal D$ est orthogonale à la normale, donc « couchée » dans une direction du plan. Il faut alors vérifier si un point de $\mathcal D$ appartient à $\mathcal P$ : si oui, $\mathcal D$ est **incluse** dans $\mathcal P$ ; sinon, $\mathcal D$ est **strictement parallèle** à $\mathcal P$ (aucun point commun) ;
- **sécants en un point unique** si $\vec{u}\cdot\vec{n}\neq0$. **Pourquoi un seul point ?** En reportant les équations paramétriques de $\mathcal D$ dans l'équation de $\mathcal P$, on obtient une équation du premier degré en $t$ (car $\vec{u}\cdot\vec{n}\neq0$ est justement le coefficient devant $t$), qui a **exactement une solution**.

**Exemple travaillé.** Soient $I$, $J$, $K$ les milieux respectifs de $[SA]$, $[SB]$, $[SC]$ : $I(0,0,1)$, $J(1,0,1)$, $K(0,1,1)$. La droite $(IJ)$ est-elle parallèle au plan de base $(ABC)$, d'équation $z=0$ (vecteur normal $\vec{k}=(0,0,1)$) ?

$$\overrightarrow{IJ} = J-I = (1,0,0)$$

$$\overrightarrow{IJ}\cdot\vec{k} = 1\times0+0\times0+0\times1 = 0$$

Le produit scalaire est nul : $(IJ)$ est parallèle à $(ABC)$ (au sens large). Comme $I(0,0,1)$ n'a pas $z=0$, $I$ n'appartient pas à $(ABC)$ : $(IJ)$ est donc **strictement parallèle** au plan de base — aucun point commun. C'est cohérent avec l'image : $(IJK)$ est le triangle « à mi-hauteur » du tétraèdre, entièrement dans le plan $z=1$, parallèle à la base.

### Plan et plan

Deux plans $\mathcal P_1$ (normale $\vec{n_1}$) et $\mathcal P_2$ (normale $\vec{n_2}$) sont :

- **parallèles** si $\vec{n_1}$ et $\vec{n_2}$ sont colinéaires — les deux plans « regardent dans la même direction » ;
- **sécants** sinon, et leur intersection est alors **une droite** (jamais un point, jamais rien d'autre) : cette droite a pour vecteur directeur $\vec{n_1}\wedge\vec{n_2}$, car ce vecteur est orthogonal à $\vec{n_1}$ (donc parallèle à $\mathcal P_1$) et orthogonal à $\vec{n_2}$ (donc parallèle à $\mathcal P_2$) à la fois.

**Exemple travaillé.** Les faces latérales $(SAB)$ (équation $y=0$, normale $(0,1,0)$) et $(SAC)$ (équation $x=0$, normale $(1,0,0)$) — les deux plans « verticaux » contenant $S$ et $A$ — sont-elles parallèles ?

$(0,1,0)$ et $(1,0,0)$ ne sont pas colinéaires : les deux plans sont sécants. Le vecteur directeur de leur intersection est $(0,1,0)\wedge(1,0,0) = (1\times0-0\times0,\ 0\times1-0\times0,\ 0\times0-1\times1) = (0,0,-1)$, colinéaire à $(0,0,1)$ — exactement la direction de $(SA)$. C'est cohérent : les deux faces latérales partagent l'arête $(SA)$, donc leur intersection ne peut être que cette droite-là.

---

## R8 — Distance d'un point à un plan, à une droite

### Distance d'un point à un plan

Pour un plan $\mathcal P$ d'équation $ax+by+cz+d=0$ (normale $\vec{n}(a,b,c)$) et un point $M_0(x_0,y_0,z_0)$, on décompose le vecteur $\overrightarrow{A_0M_0}$ (où $A_0$ est un point quelconque de $\mathcal P$) en une partie le long de $\vec{n}$ et une partie couchée dans $\mathcal P$ (orthogonale à $\vec{n}$). Seule la partie le long de $\vec{n}$ éloigne $M_0$ du plan — la partie couchée dans $\mathcal P$ ne contribue à aucun écart. La distance est donc exactement la projection de $\overrightarrow{A_0M_0}$ sur $\vec{n}$ :

$$d(M_0,\mathcal P) = \frac{\left|\vec{n}\cdot\overrightarrow{A_0M_0}\right|}{\|\vec{n}\|}$$

En développant $\vec{n}\cdot\overrightarrow{A_0M_0}$ avec la même formule qu'au R6 (et puisque $d=-(ax_A+by_A+cz_A)$ pour un point $A_0$ du plan), le numérateur se réécrit directement à partir des coordonnées de $M_0$ :

$$d(M_0,\mathcal P) = \frac{\left|ax_0+by_0+cz_0+d\right|}{\sqrt{a^2+b^2+c^2}}$$

**Exemple travaillé.** Distance du point $A(0,0,0)$ au plan $(SBC)$, d'équation $x+y+z-2=0$ (établie au R6).

$$d\left(A,(SBC)\right) = \frac{|0+0+0-2|}{\sqrt{1^2+1^2+1^2}} = \frac{2}{\sqrt3} = \frac{2\sqrt3}{3}$$

**Vérification croisée, via le volume (R4) :** $V_{SABC}=\frac13\times\text{aire}(SBC)\times d(A,(SBC))$. Le triangle $SBC$ est équilatéral de côté $SB=SC=BC=2\sqrt2$ (à vérifier avec la formule de distance du R1), d'aire $\frac{\sqrt3}{4}(2\sqrt2)^2 = 2\sqrt3$. Donc $d(A,(SBC)) = \dfrac{3V_{SABC}}{\text{aire}(SBC)} = \dfrac{3\times\frac43}{2\sqrt3} = \dfrac{4}{2\sqrt3}=\dfrac{2}{\sqrt3}=\dfrac{2\sqrt3}{3}$. Les deux méthodes donnent exactement le même résultat.

### Distance d'un point à une droite

Pour une droite $\mathcal D$ passant par $A$, de vecteur directeur $\vec{u}$, et un point $M_0$ : $\overrightarrow{AM_0}$ et $\vec{u}$ construisent un parallélogramme dont l'aire vaut $\|\overrightarrow{AM_0}\wedge\vec{u}\|$ (R3). Cette même aire vaut aussi (base $\times$ hauteur) $= \|\vec{u}\|\times d(M_0,\mathcal D)$, où $d(M_0,\mathcal D)$ est justement la hauteur cherchée — la distance de $M_0$ à la droite qui porte la base. En égalant les deux expressions de l'aire et en isolant la hauteur :

$$d(M_0,\mathcal D) = \frac{\left\|\overrightarrow{AM_0}\wedge\vec{u}\right\|}{\|\vec{u}\|}$$

**Exemple travaillé.** Distance du point $A(0,0,0)$ à la droite $(BC)$, avec $B(2,0,0)$, $C(0,2,0)$.

$$\overrightarrow{BA} = (-2,0,0) \qquad \overrightarrow{BC} = (-2,2,0)$$

$$\overrightarrow{BA}\wedge\overrightarrow{BC} = \left(0\times0-0\times2,\ 0\times(-2)-(-2)\times0,\ (-2)\times2-0\times(-2)\right) = (0,0,-4)$$

$$d\left(A,(BC)\right) = \frac{\|(0,0,-4)\|}{\|\overrightarrow{BC}\|} = \frac{4}{\sqrt{4+4+0}} = \frac{4}{2\sqrt2} = \sqrt2$$

**Vérification croisée, via l'aire du triangle (R3) :** $\text{aire}(ABC) = \frac12\times BC\times d(A,(BC))$. On a $\text{aire}(ABC)=2$ (R3) et $BC=2\sqrt2$, donc $d(A,(BC)) = \dfrac{2\times2}{2\sqrt2}=\dfrac{4}{2\sqrt2}=\sqrt2$. Même résultat par les deux méthodes.

---

## R9 — La sphère : équation cartésienne et intersection avec un plan

### L'équation d'une sphère

Une sphère de centre $\Omega(x_\Omega,y_\Omega,z_\Omega)$ et de rayon $R$ est l'ensemble des points $M(x,y,z)$ tels que $\Omega M = R$. En élevant au carré la formule de distance du R1 (pour éviter la racine carrée) :

$$(x-x_\Omega)^2+(y-y_\Omega)^2+(z-z_\Omega)^2 = R^2$$

C'est l'équation cartésienne « sous forme centre-rayon ». En développant les carrés, elle prend une forme générale $x^2+y^2+z^2+ax+by+cz+e=0$ — mais alors le centre et le rayon ne se lisent plus directement ; il faut **compléter le carré** pour revenir à la forme centre-rayon.

**Exemple travaillé — compléter le carré.** Trouver le centre et le rayon de la sphère d'équation $x^2+y^2+z^2-2x+4y-6z+5=0$.

**Ce qu'on cherche ici, et pourquoi ce geste :** regrouper les termes en $x$, en $y$, en $z$ séparément, et faire apparaître un carré parfait dans chaque groupe — la même technique que pour une parabole ou un cercle en 2D, appliquée trois fois.

$$\left(x^2-2x\right)+\left(y^2+4y\right)+\left(z^2-6z\right)+5=0$$

$$\left(x-1\right)^2-1 + \left(y+2\right)^2-4 + \left(z-3\right)^2-9+5=0$$

$$\left(x-1\right)^2+\left(y+2\right)^2+\left(z-3\right)^2 = 1+4+9-5$$

$$\left(x-1\right)^2+\left(y+2\right)^2+\left(z-3\right)^2 = 9$$

C'est une sphère de centre $\Omega(1,-2,3)$ et de rayon $R=\sqrt9=3$.

### Intersection d'une sphère et d'un plan

Soit une sphère de centre $\Omega$ et de rayon $R$, et un plan $\mathcal P$. Note $H$ le projeté orthogonal de $\Omega$ sur $\mathcal P$, et $d=\Omega H = d(\Omega,\mathcal P)$ (la formule du R8). Pour tout point $M$ commun à la sphère et au plan, le triangle $\Omega H M$ est rectangle en $H$ (car $\Omega H$ est perpendiculaire à $\mathcal P$, donc à tout segment de $\mathcal P$, en particulier à $HM$), avec $\Omega M = R$. Le théorème de Pythagore donne :

$$R^2 = d^2 + HM^2$$

Trois cas, selon la comparaison de $d$ et $R$ :

- $d>R$ : l'équation $HM^2=R^2-d^2<0$ n'a pas de solution — **aucun point commun**.
- $d=R$ : $HM=0$ — un seul point commun, $H$ lui-même ; le plan est **tangent** à la sphère en $H$.
- $d<R$ : $HM=\sqrt{R^2-d^2}$ — l'ensemble des points communs est un **cercle**, de centre $H$ et de rayon $\sqrt{R^2-d^2}$.

**Exemple travaillé.** On considère, dans le tétraèdre $SABC$, la sphère de centre $S(0,0,2)$ et de rayon $R=3$. Coupe-t-elle le plan de base $(ABC)$, d'équation $z=0$ ?

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer $d(S,(ABC))$ et la comparer à $R$ avant de conclure — jamais l'inverse.

$$d\left(S,(ABC)\right) = \frac{|0+0+2-0|}{\sqrt{0^2+0^2+1^2}} = 2$$

Puisque $d=2<R=3$, l'intersection est un cercle, de rayon $\sqrt{R^2-d^2}=\sqrt{9-4}=\sqrt5$. Son centre est le projeté orthogonal de $S$ sur $(ABC)$ : comme $\overrightarrow{AS}$ est déjà perpendiculaire à ce plan (le tétraèdre est trirectangle en $A$), ce projeté est exactement $A$. Le cercle d'intersection est donc centré en $A$, de rayon $\sqrt5$.

[[figure:sphere-plan]]

---

## R10 — Pour t'entraîner

Voici un exercice de type bac, **original** — ce n'est pas un sujet officiel, c'est un exercice d'entraînement construit pour cette leçon, qui rassemble plusieurs des outils vus dans ce chapitre.

### Exercice travaillé

L'espace est muni d'un repère orthonormé $(O\,;\,\vec{i},\vec{j},\vec{k})$. On considère les points $A(1,1,0)$, $B(3,1,0)$, $C(1,3,0)$, $D(1,1,4)$.

1. Calculer $\overrightarrow{AB}$, $\overrightarrow{AC}$, $\overrightarrow{AD}$, puis montrer que $A$, $B$, $C$, $D$ ne sont pas coplanaires, et en déduire le volume du tétraèdre $ABCD$.
2. Déterminer un vecteur normal au plan $(BCD)$, puis une équation cartésienne de ce plan.
3. Calculer la distance du point $A$ au plan $(BCD)$, d'abord directement par la formule du R8, puis à partir du volume trouvé en 1. — et vérifier que les deux méthodes s'accordent.

**Raisonnement à voix haute.**

**Question 1.** On soustrait les coordonnées, comme au R1 :

$$\overrightarrow{AB} = (2,0,0) \qquad \overrightarrow{AC} = (0,2,0) \qquad \overrightarrow{AD} = (0,0,4)$$

Pour montrer que les quatre points ne sont pas coplanaires, on calcule le produit mixte (R4) — s'il est non nul, les trois vecteurs (et donc les quatre points) ne sont pas coplanaires, et $ABCD$ est un vrai tétraèdre.

$$\overrightarrow{AB}\wedge\overrightarrow{AC} = (0\times0-0\times2,\ 0\times0-2\times0,\ 2\times2-0\times0) = (0,0,4)$$

$$\left[\overrightarrow{AB},\overrightarrow{AC},\overrightarrow{AD}\right] = (0,0,4)\cdot(0,0,4) = 16$$

Le produit mixte vaut $16\neq0$ : les points ne sont pas coplanaires, $ABCD$ est bien un tétraèdre. Son volume (R4) :

$$V_{ABCD} = \frac{1}{6}\times|16| = \frac{16}{6} = \frac{8}{3}$$

**Question 2.** On a besoin d'un vecteur normal au plan $(BCD)$ ; on le fabrique avec deux vecteurs de ce plan, comme au R6.

$$\overrightarrow{BC} = C-B = (-2,2,0) \qquad \overrightarrow{BD} = D-B = (-2,0,4)$$

$$\overrightarrow{BC}\wedge\overrightarrow{BD} = \left(2\times4-0\times0,\ 0\times(-2)-(-2)\times4,\ (-2)\times0-2\times(-2)\right) = (8,8,4)$$

On simplifie en divisant par $4$ : $\vec{n}=(2,2,1)$. L'équation du plan a la forme $2x+2y+z+d=0$ ; on détermine $d$ avec $B(3,1,0)$ :

$$2\times3+2\times1+0+d=0 \implies d=-8$$

$$\left(BCD\right):\ 2x+2y+z-8=0$$

**Vérification :** $C(1,3,0)$ donne $2+6+0-8=0$ ✓ ; $D(1,1,4)$ donne $2+2+4-8=0$ ✓.

**Question 3.** Distance directe, par la formule du R8, avec $A(1,1,0)$ :

$$d\left(A,(BCD)\right) = \frac{|2\times1+2\times1+0-8|}{\sqrt{2^2+2^2+1^2}} = \frac{|2+2-8|}{\sqrt9} = \frac{4}{3}$$

**Vérification via le volume :** $V_{ABCD}=\frac13\times\text{aire}(BCD)\times d(A,(BCD))$. L'aire de $BCD$ vaut $\frac12\|\overrightarrow{BC}\wedge\overrightarrow{BD}\| = \frac12\|(8,8,4)\| = \frac12\sqrt{64+64+16}=\frac12\sqrt{144}=6$. Donc $d(A,(BCD)) = \dfrac{3V_{ABCD}}{\text{aire}(BCD)} = \dfrac{3\times\frac83}{6} = \dfrac{8}{6}=\dfrac43$. Les deux méthodes donnent bien $\frac43$.

### À toi de jouer

**(a)** On considère, avec les mêmes points, la sphère de centre $A$ et de rayon $2$. Donner son équation cartésienne. Cette sphère coupe-t-elle le plan $(BCD)$ ? Si oui, préciser le rayon du cercle d'intersection (tu peux réutiliser la distance $d(A,(BCD))=\frac43$ trouvée ci-dessus).

**(b)** Montrer que la droite $(AD)$ est orthogonale au plan $(ABC)$.

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts, non résolus par cet
     auteur :
     (1) skill_code proposé : `maths_geometrie_espace` (convention
     "<subject>_<short>" du brief). À confirmer contre la convention réelle
     utilisée en base avant intégration.
     (2) Périmètre couvert : repère orthonormé de l'espace et coordonnées ;
     produit scalaire (expression analytique, orthogonalité, angles) ;
     produit vectoriel (définition, propriétés, norme = aire) ; produit
     mixte / déterminant et volume ; représentation paramétrique et équation
     cartésienne d'une droite et d'un plan ; positions relatives (droite/
     droite, droite/plan, plan/plan) ; distance point-plan et point-droite ;
     sphère (équation, intersection avec un plan). Conforme au périmètre
     donné dans le brief de cette leçon.
     (3) Point d'incertitude réel : selon les éditions du programme marocain
     SM, le "produit vectoriel" et le "produit mixte" ne sont pas toujours
     nommés ainsi dans le cadre officiel (certaines progressions traitent
     l'orthogonalité et le volume par d'autres voies, sans introduire
     formellement ces deux opérations). Cette leçon suit le périmètre
     explicitement fourni pour cette tâche ; à vérifier contre le cadre de
     référence officiel avant validation finale (bac-fidelity-critic).
     (4) La distinction "orthogonales" vs "perpendiculaires" pour deux
     droites de l'espace (R2, reprise au R7) est un choix pédagogique de cet
     auteur, standard dans les manuels français/marocains, mais à confirmer
     comme convention de vocabulaire attendue dans ce cours.
     (5) Le fil conducteur (tétraèdre trirectangle SABC, R3 à R9) est un
     choix de cet auteur pour maximiser la cohérence entre rungs (les mêmes
     nombres reviennent, avec vérifications croisées) — pas une citation
     d'un exercice source.
-->
