# Nombres complexes — forme algébrique et géométrie

---

## R0 — Accroche : l'équation qui n'a pas de solution

Reprends l'histoire des ensembles de nombres que tu connais déjà, depuis le collège.

- Dans $\mathbb{N}$ (les entiers naturels), l'équation $x+5=3$ n'a pas de solution : aucun entier naturel, augmenté de 5, ne donne 3. Il a fallu inventer les entiers négatifs, et $\mathbb{N}$ est devenu $\mathbb{Z}$.
- Dans $\mathbb{Z}$, l'équation $2x=3$ n'a pas de solution : aucun entier, doublé, ne donne 3. Il a fallu inventer les fractions, et $\mathbb{Z}$ est devenu $\mathbb{Q}$.
- Dans $\mathbb{Q}$, l'équation $x^2=2$ n'a pas de solution (tu l'as sans doute déjà démontré : $\sqrt{2}$ n'est pas un nombre rationnel). Il a fallu inventer les irrationnels, et $\mathbb{Q}$ est devenu $\mathbb{R}$.

À chaque étape, le même schéma se répète : une équation toute simple n'a pas de solution dans l'ensemble où on travaille, alors on **agrandit** l'ensemble pour lui en fournir une.

[[figure:tour-des-ensembles]]

Maintenant, regarde cette équation, posée cette fois dans $\mathbb{R}$ :

$$x^2 = -1$$

A-t-elle une solution réelle ? Non : le carré d'un nombre réel, positif ou négatif, est toujours positif ou nul. Aucun réel, élevé au carré, ne peut donner un nombre négatif. L'équation $x^2=-1$ n'a donc **aucune solution dans $\mathbb{R}$**.

Avant de lire la suite, prends position : d'après le schéma qu'on vient de dérouler trois fois de suite, que devrait-on faire ? S'arrêter là, en disant que $x^2=-1$ est une impasse définitive — ou répéter le geste, et inventer un nouveau nombre pour combler ce manque, comme à chaque étape précédente ?

[[checkpoint:cp-r0-predict]]

Et si un tel nombre existait vraiment, à quoi ressemblerait le calcul avec lui ? Est-ce qu'on pourrait encore additionner, multiplier, diviser, comme avec n'importe quel autre nombre ?

C'est exactement ce choix que les mathématiciens ont fait. Ils ont posé qu'un tel nombre existe, lui ont donné un nom — $i$ — et ont construit, avec lui, tout un système cohérent de calcul : l'ensemble des nombres complexes, noté $\mathbb{C}$. Dans cette leçon, on va faire ce travail : définir ce nombre, apprendre à calculer avec lui, et découvrir qu'il a aussi une image géométrique bien concrète, dans un plan.

---

## R1 — L'ensemble $\mathbb{C}$ et la forme algébrique

### Le postulat de départ

On pose l'existence d'un nombre, noté $i$, qui vérifie :

$$i^2 = -1$$

Ce n'est pas quelque chose qu'on démontre — c'est le point de départ, la brique fondatrice de tout ce chapitre. À partir de ce seul nombre $i$, on définit un nouvel ensemble de nombres.

### La forme algébrique

**Définition.** L'ensemble des nombres complexes, noté $\mathbb{C}$, est l'ensemble des nombres qui s'écrivent sous la forme

$$z = a + bi$$

où $a$ et $b$ sont des nombres réels. Cette écriture s'appelle la **forme algébrique** de $z$.

- $a$ s'appelle la **partie réelle** de $z$, notée $\text{Re}(z)$.
- $b$ s'appelle la **partie imaginaire** de $z$, notée $\text{Im}(z)$.

**Un piège classique à éviter tout de suite :** $\text{Im}(z)$ est un nombre **réel** — c'est $b$, pas $bi$. Dans $z=3-5i$, la partie imaginaire est $-5$ (un réel), pas $-5i$. Le "$i$" fait partie de l'écriture de $z$, pas de la valeur de $\text{Im}(z)$.

Deux cas particuliers, aux extrémités :

- Si $b=0$, alors $z=a$ est un nombre réel : $\mathbb{R}$ est donc contenu dans $\mathbb{C}$ (c'est exactement le cas $b=0$).
- Si $a=0$ et $b \neq 0$, alors $z=bi$ est un **imaginaire pur**.

### Pourquoi l'écriture $a+bi$ est unique — l'égalité de deux complexes

Voici une question naturelle : si on t'écrit un nombre complexe sous la forme $a+bi$, cette écriture est-elle la seule possible ? Autrement dit, deux écritures différentes peuvent-elles désigner le même nombre ?

**Règle.** Deux nombres complexes $a+bi$ et $a'+b'i$ (avec $a,b,a',b'$ réels) sont égaux si et seulement si $a=a'$ **et** $b=b'$ :

$$a+bi = a'+b'i \iff \begin{cases} a=a' \\ b=b' \end{cases}$$

**Pourquoi c'est vrai — la preuve, avec l'aide de $i^2=-1$.** Suppose que $a+bi=a'+b'i$. En réarrangeant les termes :

$$a - a' = (b'-b)i$$

Suppose, par l'absurde, que $b \neq b'$. On peut alors diviser par $(b'-b)$, qui n'est pas nul :

$$i = \frac{a-a'}{b'-b}$$

Le membre de droite est le quotient de deux nombres réels : c'est donc un nombre **réel**. Mais si $i$ était réel, alors $i^2$ serait positif ou nul (le carré d'un réel n'est jamais négatif) — or $i^2=-1$, qui est strictement négatif. Contradiction.

L'hypothèse $b \neq b'$ est donc impossible : on a forcément $b=b'$. En reportant dans $a-a'=(b'-b)i$, le membre de droite devient $0$, donc $a=a'$.

**Ce que ça veut dire concrètement :** une égalité entre deux complexes écrits sous forme algébrique se traduit toujours par **deux égalités entre réels** — une sur les parties réelles, une sur les parties imaginaires. C'est cette règle qui permet de "lire" une équation complexe comme un petit système.

### Exemple travaillé

Trouver les réels $x$ et $y$ tels que $(2x-1) + (y+3)i = 5 - 2i$.

**Ce qu'on cherche et pourquoi ce geste :** les deux membres sont déjà écrits sous forme algébrique. D'après la règle qu'on vient d'établir, cette égalité complexe équivaut à deux égalités réelles séparées — une pour chaque partie. Le réflexe : identifier partie réelle avec partie réelle, partie imaginaire avec partie imaginaire.

$$2x-1 = 5 \qquad \text{et} \qquad y+3 = -2$$

De la première équation : $2x=6$, donc $x=3$. De la seconde : $y=-5$.

**Vérification :** avec $x=3$ et $y=-5$, le membre de gauche devient $(2(3)-1)+(-5+3)i = 5-2i$, qui est bien égal au membre de droite.

---

## R2 — Opérations : somme et produit dans $\mathbb{C}$

### L'idée générale : calculer avec $i$ comme avec une lettre, puis réduire

Le point clé pour toutes les opérations dans $\mathbb{C}$ : on calcule avec $i$ exactement comme avec une lettre inconnue dans une expression algébrique habituelle (on développe, on regroupe) — puis, à la fin seulement, on utilise la règle spéciale de ce chapitre, $i^2=-1$, pour réduire.

### La somme

Pour additionner deux complexes écrits sous forme algébrique, on additionne les parties réelles entre elles, et les parties imaginaires entre elles :

$$(a+bi) + (a'+b'i) = (a+a') + (b+b')i$$

**Pourquoi ça marche :** l'addition de réels est commutative et associative, donc on peut réordonner les quatre termes $a$, $bi$, $a'$, $b'i$ à volonté. En regroupant $a$ avec $a'$ (les termes "sans $i$") et $bi$ avec $b'i$ (les termes "avec $i$"), on retombe exactement sur une nouvelle forme algébrique.

**Exemple.** $(2+3i) + (-5+i) = (2-5)+(3+1)i = -3+4i$.

### Le produit

Pour multiplier deux complexes, on développe comme un produit de deux binômes, puis on réduit avec $i^2=-1$.

**Exemple travaillé.** Calculer $(3-2i)(1+4i)$.

**Ce qu'on cherche et pourquoi ce geste :** un produit de deux sommes se développe en quatre termes, comme n'importe quel produit $(a+b)(c+d)$ — rien de spécial à $\mathbb{C}$ à ce stade, c'est de la simple distributivité. La seule étape propre à $\mathbb{C}$ arrive à la fin, quand un terme en $i^2$ apparaît : c'est là qu'on utilise $i^2=-1$.

On développe :

$$(3-2i)(1+4i) = 3 \times 1 + 3 \times 4i - 2i \times 1 - 2i \times 4i$$

$$= 3 + 12i - 2i - 8i^2$$

On regroupe les termes en $i$, et on remplace $i^2$ par $-1$ dans le dernier terme :

$$= 3 + 10i - 8(-1)$$

$$= 3 + 10i + 8$$

$$= 11 + 10i$$

**La formule générale**, pour ne plus jamais avoir à tout redévelopper depuis zéro :

$$(a+bi)(a'+b'i) = (aa'-bb') + (ab'+a'b)i$$

Retiens surtout le **mécanisme** (développer, puis remplacer $i^2$ par $-1$) plutôt que la formule brute — c'est ce mécanisme qui marche à chaque fois, y compris sur des cas que tu n'as jamais vus.

### Une conséquence utile : les puissances de $i$

Une application directe de la multiplication : que valent les puissances successives de $i$ ?

$$i^1 = i \qquad i^2 = -1 \qquad i^3 = i^2 \times i = -i \qquad i^4 = i^2 \times i^2 = (-1)\times(-1) = 1$$

À partir de $i^4=1$, le cycle recommence : $i^5=i$, $i^6=-1$, et ainsi de suite. Les puissances de $i$ se répètent par groupes de 4 — un fait pratique pour simplifier une puissance élevée de $i$ (par exemple $i^{10} = i^{8} \times i^2 = 1 \times (-1) = -1$, puisque $8$ est un multiple de $4$).

---

## R3 — Le conjugué : définition, propriétés, et l'outil pour diviser

### Définition, et le calcul qui explique tout

**Définition.** Le conjugué du complexe $z=a+bi$ est le complexe $\overline{z} = a-bi$ (on change seulement le signe de la partie imaginaire).

Pourquoi s'intéresser à ce nombre en particulier ? Regarde ce qui se passe quand on multiplie $z$ par son propre conjugué :

$$z \times \overline{z} = (a+bi)(a-bi)$$

On reconnaît une identité remarquable, $(X+Y)(X-Y) = X^2-Y^2$, avec $X=a$ et $Y=bi$ :

$$z \times \overline{z} = a^2 - (bi)^2 = a^2 - b^2 i^2$$

Et $i^2=-1$, donc $-b^2i^2 = b^2$ :

$$z \times \overline{z} = a^2+b^2$$

**C'est le résultat clé :** $z \times \overline{z}$ est **toujours un nombre réel, positif ou nul** — les deux $i$ ont complètement disparu. Multiplier par le conjugué transforme un complexe en réel. C'est ce mécanisme qui rend le conjugué utile dans toute la suite de ce chapitre.

### Propriétés du conjugué

En repartant de la définition $\overline{a+bi} = a-bi$, on obtient directement :

- $\overline{\overline{z}} = z$ (conjuguer deux fois revient à l'identité : on change le signe de $b$, puis on le change à nouveau).
- $\overline{z+z'} = \overline{z} + \overline{z'}$ (le conjugué d'une somme est la somme des conjugués).
- $\overline{z \times z'} = \overline{z} \times \overline{z'}$ (le conjugué d'un produit est le produit des conjugués).
- $z + \overline{z} = 2a = 2\,\text{Re}(z)$, un nombre réel.
- $z - \overline{z} = 2bi = 2i\,\text{Im}(z)$, un imaginaire pur.

Deux caractérisations très utiles découlent de ces deux dernières lignes :

$$z \text{ est réel} \iff z = \overline{z} \qquad \qquad z \text{ est imaginaire pur} \iff z = -\overline{z}$$

**Pourquoi c'est vrai :** si $z=\overline{z}$, alors $a+bi = a-bi$. D'après la règle d'égalité du chapitre 2, ça impose $b=-b$, donc $b=0$ — et $z=a$ est bien réel. Réciproquement, si $z$ est réel ($b=0$), alors $\overline{z}=a-0i=a=z$. Le même type de raisonnement, avec les rôles inversés, donne la caractérisation de l'imaginaire pur.

### Exemple travaillé

Vérifier, sur $z=4-3i$, que $z+\overline{z} = 2\,\text{Re}(z)$.

**Ce qu'on cherche et pourquoi ce geste :** c'est une vérification directe de la propriété — on calcule les deux membres séparément et on compare, pour bien voir que la propriété n'est pas une formule à croire sur parole.

Le conjugué de $z=4-3i$ est $\overline{z}=4+3i$.

$$z + \overline{z} = (4-3i)+(4+3i) = 8$$

Et $2\,\text{Re}(z) = 2 \times 4 = 8$. Les deux valeurs coïncident : $8=8$.

[[checkpoint:cp-r3-conjugue]]

### Le conjugué comme outil pour diviser

Voici le problème : comment calculer un quotient comme $\dfrac{2+3i}{1-2i}$ ? On ne peut pas "simplifier" une fraction dont le dénominateur contient un $i$ de la même façon qu'avec des réels — il faut d'abord se débarrasser du $i$ au dénominateur.

**Le geste, et pourquoi il marche :** on vient de voir que $z \times \overline{z}$ est toujours réel. Alors, pour un quotient $\dfrac{z}{z'}$, si on multiplie le numérateur ET le dénominateur par $\overline{z'}$ (le conjugué du dénominateur), le dénominateur devient $z' \times \overline{z'}$ — un nombre réel. La division se ramène alors à diviser une forme algébrique par un simple réel, une opération déjà connue.

**Exemple travaillé.** Calculer $\dfrac{2+3i}{1-2i}$ sous forme algébrique.

**Ce qu'on cherche et pourquoi ce geste :** le dénominateur est $1-2i$ ; son conjugué est $1+2i$. On multiplie haut et bas par cette quantité.

$$\frac{2+3i}{1-2i} = \frac{(2+3i)(1+2i)}{(1-2i)(1+2i)}$$

Le dénominateur, produit d'un complexe par son conjugué, se calcule directement (c'est $a^2+b^2$ avec $a=1$, $b=-2$) :

$$(1-2i)(1+2i) = 1^2+2^2 = 5$$

Le numérateur se développe comme un produit ordinaire :

$$(2+3i)(1+2i) = 2+4i+3i+6i^2 = 2+7i-6 = -4+7i$$

Il reste à diviser chaque partie par le réel $5$ :

$$\frac{2+3i}{1-2i} = \frac{-4+7i}{5} = -\frac{4}{5} + \frac{7}{5}i$$

---

## R4 — Le module $|z|$

### Définition, directement liée au conjugué

On vient de voir que $z\overline{z} = a^2+b^2$ est toujours un réel positif ou nul. Ça veut dire qu'on peut toujours en prendre la racine carrée — et c'est précisément cette racine qui définit le **module** de $z$.

**Définition.** Le module de $z=a+bi$ est le réel positif ou nul

$$|z| = \sqrt{a^2+b^2} = \sqrt{z\overline{z}}$$

Remarque : si $z=a$ est réel ($b=0$), alors $|z|=\sqrt{a^2}=|a|$ — le module généralise donc la valeur absolue que tu connais déjà sur $\mathbb{R}$. C'est la même idée, étendue à deux dimensions.

### Propriétés

- $|z| \geq 0$ toujours, et $|z|=0 \iff z=0$. **Pourquoi :** $a^2+b^2=0$ avec $a,b$ réels n'est possible que si $a=0$ **et** $b=0$ (une somme de deux carrés ne peut être nulle que si chaque carré l'est, puisqu'un carré est toujours $\geq 0$).
- $|\overline{z}| = |z|$ (changer le signe de $b$ ne change pas $a^2+b^2$).
- $|z \times z'| = |z| \times |z'|$.
- $\left|\dfrac{z}{z'}\right| = \dfrac{|z|}{|z'|}$ (pour $z' \neq 0$).

### Exemple travaillé

Vérifier la propriété $|z \times z'| = |z| \times |z'|$ sur $z=1+i$ et $z'=2-i$.

**Ce qu'on cherche et pourquoi ce geste :** on calcule les deux membres de l'égalité séparément, chacun par sa propre méthode, pour confirmer qu'ils coïncident.

**Membre de droite — calcul direct des deux modules :**

$$|z| = \sqrt{1^2+1^2} = \sqrt{2} \qquad \qquad |z'| = \sqrt{2^2+(-1)^2} = \sqrt{5}$$

$$|z| \times |z'| = \sqrt{2} \times \sqrt{5} = \sqrt{10}$$

**Membre de gauche — on calcule d'abord le produit, puis son module :**

$$z \times z' = (1+i)(2-i) = 2-i+2i-i^2 = 2+i+1 = 3+i$$

$$|z \times z'| = \sqrt{3^2+1^2} = \sqrt{10}$$

Les deux membres valent $\sqrt{10}$ : la propriété est vérifiée sur cet exemple.

[[checkpoint:cp-r4-module-parties]]

---

## Résoudre une équation du second degré dans $\mathbb{C}$

### Le dividende de tout ce qu'on vient de construire

Au chapitre 1, on a inventé $\mathbb{C}$ pour une raison très précise : donner une solution à $x^2=-1$. Depuis, on a appris à calculer dans ce nouvel ensemble — additionner, multiplier, conjuguer, diviser, mesurer. Le moment est venu de toucher le dividende, et il tombe exactement là où on l'attendait : sur les équations du second degré.

Rappelle-toi la classification que tu connais depuis la première, pour $az^2+bz+c=0$ à coefficients réels, avec $\Delta = b^2-4ac$ :

- $\Delta > 0$ : deux solutions réelles ;
- $\Delta = 0$ : une solution double ;
- $\Delta < 0$ : **aucune solution**.

Ce troisième cas était un mur. Dans $\mathbb{C}$, il n'existe plus.

Et les sujets d'examen national vont plus loin encore : ils posent des équations dont **les coefficients eux-mêmes sont complexes** — $az^2+bz+c=0$ avec $a$, $b$, $c$ dans $\mathbb{C}$ et $a \neq 0$. Avant de lire la suite, prends position : quand les coefficients deviennent complexes, faut-il une nouvelle formule, ou celle que tu connais tient-elle encore ?

### Le seul point vraiment neuf : une racine carrée de $\Delta$

Regarde la formule habituelle, $z = \dfrac{-b \pm \sqrt{\Delta}}{2a}$, et demande-toi quel morceau exactement pose problème dans $\mathbb{C}$.

Ni $-b$, ni $2a$, ni la division : tout ça, on sait le faire depuis le chapitre 3 et le chapitre 4. Le seul morceau douteux, c'est $\sqrt{\Delta}$. Dans $\mathbb{R}$, cette écriture a un sens parfaitement clair tant que $\Delta \geq 0$ : c'est **le** réel **positif** dont le carré vaut $\Delta$ — deux mots qui font tout le travail, « le » et « positif ».

Dans $\mathbb{C}$, ces deux mots s'effondrent ensemble. Il n'y a pas d'ordre sur $\mathbb{C}$ : « le complexe positif dont le carré vaut $\Delta$ » ne désigne rien. Et si un complexe $\delta$ vérifie $\delta^2=\Delta$, alors $(-\delta)^2 = \delta^2 = \Delta$ aussi — deux candidats, rigoureusement interchangeables, que rien ne permet de départager.

**Le geste qui remplace la notation.** On ne cherche plus « la » racine carrée de $\Delta$ : on cherche **un** nombre complexe $\delta$ tel que

$$\delta^2 = \Delta$$

et n'importe lequel des deux fait l'affaire — parce que la formule contient déjà un $\pm$, qui rattrape le choix. Choisir $-\delta$ au lieu de $\delta$ échange simplement les deux solutions entre elles.

**Un piège classique, et il coûte cher :** n'écris jamais $\sqrt{\Delta}$ quand $\Delta$ n'est pas un réel positif ou nul. Si on s'autorisait $\sqrt{-1}$ comme un symbole ordinaire, on écrirait

$$-1 = i^2 = \sqrt{-1} \times \sqrt{-1} = \sqrt{(-1)\times(-1)} = \sqrt{1} = 1$$

et on démontrerait que $-1=1$. La règle $\sqrt{x}\sqrt{y}=\sqrt{xy}$ est une règle **des réels positifs** ; elle ne survit pas au passage dans $\mathbb{C}$. Écris $\delta$, avec $\delta^2=\Delta$ : c'est plus court, et c'est vrai.

*(Une tolérance d'usage, que tu verras partout : quand $\Delta$ est un réel strictement **négatif**, tout le monde écrit $\sqrt{\Delta} = i\sqrt{|\Delta|}$. C'est sans danger, à condition de lire cette écriture comme un raccourci pour « $\delta = i\sqrt{|\Delta|}$ convient ». Et on le vérifie en une ligne : $\left(i\sqrt{|\Delta|}\right)^2 = i^2\,|\Delta| = -|\Delta| = \Delta$, puisque $\Delta$ est négatif.)*

### Pourquoi la formule reste vraie — la forme canonique

Voici la réponse à la question posée plus haut, et elle est plus intéressante qu'un simple « oui ». Repars de l'expression, avec $a \neq 0$ :

$$az^2+bz+c = a\left[z^2 + \frac{b}{a}z + \frac{c}{a}\right] = a\left[\left(z+\frac{b}{2a}\right)^2 - \frac{b^2}{4a^2} + \frac{c}{a}\right] = a\left[\left(z+\frac{b}{2a}\right)^2 - \frac{\Delta}{4a^2}\right]$$

**Regarde ce que ce calcul a utilisé :** uniquement les règles de calcul de $\mathbb{C}$ (développer, regrouper, diviser par un nombre non nul — chapitres 3 et 4). Pas une seule fois le fait que $a$, $b$, $c$ soient réels. Pas une seule fois le signe de quoi que ce soit. La forme canonique n'a jamais rien eu à voir avec $\mathbb{R}$ ; c'est nous qui l'y avions cantonnée.

Prends maintenant $\delta$ tel que $\delta^2=\Delta$. Alors $\dfrac{\Delta}{4a^2} = \left(\dfrac{\delta}{2a}\right)^2$, et le crochet devient une différence de deux carrés — la même identité $X^2-Y^2=(X-Y)(X+Y)$ qui nous avait servi au chapitre 4 :

$$az^2+bz+c = a\left(z + \frac{b}{2a} - \frac{\delta}{2a}\right)\left(z + \frac{b}{2a} + \frac{\delta}{2a}\right)$$

Un produit de nombres complexes est nul si et seulement si l'un des facteurs est nul (si le premier facteur n'est pas nul, on peut diviser par lui — le chapitre 4 nous a appris à diviser par n'importe quel complexe non nul — et le second facteur est alors forcément nul). L'équation se résout donc en annulant chaque facteur, et il reste :

$$z_1 = \frac{-b+\delta}{2a} \qquad \qquad z_2 = \frac{-b-\delta}{2a}$$

**Et la discussion se réduit à presque rien :**

- si $\Delta \neq 0$, alors $\delta \neq 0$ et l'équation a **deux solutions distinctes** ;
- si $\Delta = 0$, alors $\delta = 0$ et les deux se confondent : une **solution double**, $z = -\dfrac{b}{2a}$.

Il n'y a plus de troisième cas. Dans $\mathbb{C}$, une équation du second degré a toujours des solutions — c'est exactement le mur du chapitre 1 qui vient de tomber.

**Un piège très fréquent à l'examen :** ne discute jamais le **signe** de $\Delta$ quand $\Delta$ n'est pas réel. Écrire « $\Delta = 2i(m-1)^2 < 0$ » n'est pas une erreur de calcul, c'est une phrase qui n'a aucun sens : il n'y a pas d'ordre sur $\mathbb{C}$. Avec des coefficients complexes, la seule question qui subsiste est : $\Delta$ est-il nul, ou non ?

### Exemple travaillé 1 — coefficients réels, $\Delta$ négatif

Résoudre dans $\mathbb{C}$ l'équation $z^2-2z+4=0$.

**Ce qu'on cherche et pourquoi ce geste :** les coefficients sont réels, donc on calcule $\Delta$ par réflexe, exactement comme avant. Ce qui change, c'est ce qu'on fait quand il tombe négatif : au lieu de conclure « pas de solution », on cherche un $\delta$.

$$\Delta = (-2)^2 - 4\times1\times4 = 4-16 = -12$$

$\Delta$ est un réel négatif : $\delta = i\sqrt{12} = 2i\sqrt{3}$ convient. On le vérifie plutôt que de le croire : $\left(2i\sqrt3\right)^2 = 4i^2\times3 = -12$. C'est bien $\Delta$.

$$z = \frac{2 \pm 2i\sqrt3}{2} = 1 \pm i\sqrt3 \qquad \qquad S = \left\{\, 1-i\sqrt3\ ;\ 1+i\sqrt3 \,\right\}$$

**Ce qu'on remarque, et pourquoi ce n'est pas un hasard :** les deux solutions sont **conjuguées** l'une de l'autre. La raison mérite d'être vue, parce qu'elle dit aussi où la propriété s'arrête. Si $z_0$ est solution de $az_0^2+bz_0+c=0$, conjugue l'égalité tout entière : le conjugué d'une somme est la somme des conjugués, celui d'un produit le produit des conjugués (chapitre 4), donc $\overline{a}\,\overline{z_0}^{\,2} + \overline{b}\,\overline{z_0} + \overline{c} = 0$. Si — et seulement si — $a$, $b$, $c$ sont **réels**, on a $\overline a = a$, $\overline b = b$, $\overline c = c$, et cette égalité dit exactement que $\overline{z_0}$ est solution à son tour.

Retiens la portée exacte de ce résultat : il repose entièrement sur des coefficients réels. L'exemple suivant montre ce qui se passe quand ils ne le sont plus.

### Exemple travaillé 2 — coefficients complexes : reconnaître un carré parfait

Résoudre dans $\mathbb{C}$ l'équation $z^2 - (3+i)z + 2 + 2i = 0$.

**Ce qu'on cherche et pourquoi ce geste :** rien ne change dans la méthode — on identifie $a=1$, $b=-(3+i)$, $c=2+2i$, et on calcule $\Delta = b^2-4ac$ en développant avec les règles du chapitre 3. Ce qui change, c'est l'**arrivée** : $\Delta$ ne sera pas un réel, donc le raccourci « $\delta = i\sqrt{|\Delta|}$ » ne s'appliquera pas. Il faudra reconnaître $\Delta$ comme un carré.

$$(3+i)^2 = 9+6i+i^2 = 8+6i$$

$$\Delta = (8+6i) - 4(2+2i) = 8+6i-8-8i = -2i$$

Il faut maintenant un $\delta$ tel que $\delta^2 = -2i$. Et c'est ici qu'intervient le seul réflexe vraiment nouveau du chapitre — un petit carré qui revient dans presque tous les sujets, et qui se recalcule en trois secondes avec $i^2=-1$ :

$$(1+i)^2 = 1+2i+i^2 = 2i \qquad \qquad (1-i)^2 = 1-2i+i^2 = -2i$$

On lit directement $\delta = 1-i$. Il ne reste qu'à appliquer la formule, avec $-b = 3+i$ :

$$z = \frac{(3+i) \pm (1-i)}{2}$$

$$z_1 = \frac{4}{2} = 2 \qquad \qquad z_2 = \frac{2+2i}{2} = 1+i$$

$$S = \left\{\, 2\ ;\ 1+i \,\right\}$$

**Vérification, toujours possible et toujours rapide :** la somme des deux solutions doit redonner $3+i$ — et $2+(1+i) = 3+i$ ; leur produit doit redonner $2+2i$ — et $2(1+i) = 2+2i$. Les deux contrôles tombent juste. *(Le chapitre suivant explique pourquoi ce contrôle fonctionne, et comment en faire un outil à part entière.)*

**Le piège que cet exemple désamorce :** $2$ et $1+i$ ne sont **pas** conjugués. Dès qu'un coefficient est complexe non réel, les deux solutions n'ont plus aucune raison de l'être — la propriété de l'exemple 1 reposait entièrement sur $\overline a = a$, $\overline b = b$, $\overline c = c$, et cette hypothèse vient de sauter. L'élève qui écrit par réflexe « les deux racines sont conjuguées » se trompe une fois sur deux au bac.

### Trouver le carré parfait, quand il ne saute pas aux yeux

Trois situations, dans l'ordre de fréquence où tu les rencontreras.

**1. L'énoncé te donne le résultat.** « Montrer que le discriminant de $(E)$ est $\Delta = \big(2i(m-1)\big)^2$ » : c'est de loin le cas le plus courant. Le sens du travail est alors **inversé** — tu n'as rien à découvrir, tu as à vérifier. Développe les deux côtés séparément, chacun avec les règles du chapitre 3, et compare les deux expressions obtenues. C'est plus court, c'est plus sûr, et c'est exactement ce que le barème attend. Deviner, ici, c'est perdre du temps et des points.

**2. Le carré est là, caché sous un facteur.** Les discriminants des sujets se factorisent presque toujours en un facteur reconnaissable multiplié par un carré d'expression. Le réflexe : factorise $\Delta$ au maximum, puis traite chaque facteur séparément. La table courte qui débloque l'immense majorité des cas :

$$2i = (1+i)^2 \qquad -2i = (1-i)^2 \qquad -1 = i^2 \qquad -k^2 = (ik)^2 \ \ (k \text{ réel})$$

Et un produit de carrés est un carré : si $\Delta = A^2B^2$, alors $\delta = AB$ convient. Par exemple, un $\Delta$ qui se factorise en $2i\,(m-1)^2$ s'écrit $(1+i)^2(m-1)^2$, c'est-à-dire $\big[(1+i)(m-1)\big]^2$ — donc $\delta = (1+i)(m-1)$.

**3. Rien ne se reconnaît.** Il reste une méthode qui ne rate jamais. On pose $\delta = x+iy$ avec $x$ et $y$ réels, et on traduit $\delta^2 = \Delta$ en trois égalités **réelles** :

- $x^2-y^2 = \text{Re}(\Delta)$ et $2xy = \text{Im}(\Delta)$ — c'est l'égalité de deux complexes, lue partie par partie (chapitre 2) ;
- $x^2+y^2 = |\Delta|$ — c'est l'égalité des modules, puisque $|\delta|^2 = |\Delta|$ (chapitre 5).

La troisième est celle qui débloque tout : additionnée à la première, elle donne $x^2$ ; soustraite, elle donne $y^2$. La deuxième ne sert plus qu'à fixer le **signe** du produit $xy$.

Sur $\Delta = 3+4i$, par exemple : $x^2-y^2=3$ et $x^2+y^2=|\Delta|=5$, donc $x^2=4$ et $y^2=1$, c'est-à-dire $x=\pm2$ et $y=\pm1$. Et $2xy = 4 > 0$ impose à $x$ et $y$ d'être de même signe : $\delta = 2+i$ convient (l'autre choix, $-2-i$, est son opposé, comme prévu). Contrôle : $(2+i)^2 = 4+4i+i^2 = 3+4i$.

Garde cette méthode comme filet de sécurité : en examen elle est plus longue que la reconnaissance, mais elle aboutit toujours.

---

## Somme et produit des racines : lire l'équation sans la résoudre

### D'où ça sort

Le chapitre précédent nous a donné mieux que deux solutions : il nous a donné une **factorisation**. En regroupant les $\dfrac{1}{2a}$, la double égalité $z_1 = \dfrac{-b+\delta}{2a}$, $z_2=\dfrac{-b-\delta}{2a}$ se relit ainsi :

$$az^2+bz+c = a\,(z-z_1)(z-z_2)$$

Développe maintenant le membre de droite, comme un produit ordinaire :

$$a\,(z-z_1)(z-z_2) = a\left[z^2 - (z_1+z_2)z + z_1z_2\right] = az^2 - a(z_1+z_2)\,z + a\,z_1z_2$$

Les deux écritures désignent la même expression pour toute valeur de $z$ : on peut donc comparer terme à terme. Le coefficient de $z$ donne $b = -a(z_1+z_2)$, et le terme constant donne $c = a\,z_1z_2$. D'où :

$$z_1+z_2 = -\frac{b}{a} \qquad \qquad z_1z_2 = \frac{c}{a}$$

Ce sont les **relations entre les coefficients et les racines** (on les appelle souvent relations de Viète). Ce qui en fait un outil, et pas une curiosité : elles se **lisent** directement sur l'équation, sans calculer le moindre discriminant, et elles sont valables que les coefficients soient réels ou complexes — la démonstration ci-dessus n'a rien supposé de tel.

**Le piège de signe, et le contrôle qui l'évite :** c'est $-\dfrac{b}{a}$ pour la somme, pas $\dfrac{b}{a}$. Le moyen de ne jamais se tromper est de recontrôler sur un cas que tu connais par cœur : $z^2-3z+2=0$ a pour racines $1$ et $2$, dont la somme vaut $3$ ; et $-\dfrac{b}{a} = -\dfrac{-3}{1} = 3$. Le signe est bien là.

**Un préalable à ne pas sauter :** les formules supposent l'équation écrite sous la forme $az^2+bz+c=0$ avec **ce** $a$-là. Si l'énoncé pose $2z^2+2z+5=0$, alors $a=2$ : la somme vaut $-\dfrac{2}{2} = -1$, pas $-2$.

### Usage 1 — calculer sans résoudre

**Exemple travaillé.** Soit $m$ un nombre complexe non nul, et soient $z_1$ et $z_2$ les deux solutions de l'équation $z^2-2mz+4m^2=0$. Calculer $\dfrac{1}{z_1}+\dfrac{1}{z_2}$.

**Ce qu'on cherche et pourquoi ce geste :** avant de se lancer dans un discriminant, regarde la quantité demandée. Échanger $z_1$ et $z_2$ ne la change pas : elle est **symétrique**. C'est le signal — une expression symétrique des deux racines peut toujours s'exprimer à partir de leur seule somme et de leur seul produit. Autrement dit, on n'a pas besoin des racines pour répondre.

On lit d'abord la somme et le produit sur les coefficients ($a=1$, $b=-2m$, $c=4m^2$) :

$$z_1+z_2 = 2m \qquad \qquad z_1z_2 = 4m^2$$

Le produit $4m^2$ n'est pas nul (car $m \neq 0$), donc ni $z_1$ ni $z_2$ n'est nul : les deux inverses existent. On met au même dénominateur :

$$\frac{1}{z_1}+\frac{1}{z_2} = \frac{z_2+z_1}{z_1z_2} = \frac{2m}{4m^2} = \frac{1}{2m}$$

Aucun discriminant n'a été calculé, aucune racine n'a été écrite.

**La deuxième expression symétrique à connaître**, parce qu'elle revient sans cesse dans les sujets, est $(z_1-z_2)^2$. Elle se ramène à la somme et au produit par une identité remarquable :

$$(z_1-z_2)^2 = (z_1+z_2)^2 - 4z_1z_2 = \left(-\frac{b}{a}\right)^2 - 4\,\frac{c}{a} = \frac{b^2-4ac}{a^2} = \frac{\Delta}{a^2}$$

Autrement dit : **le carré de la différence des racines, c'est le discriminant** (divisé par $a^2$, donc égal à $\Delta$ lui-même dès que $a=1$). Sur notre exemple : $(z_1-z_2)^2 = 4m^2-16m^2 = -12m^2$, et le discriminant vaut bien $\Delta = 4m^2-16m^2 = -12m^2$.

### Usage 2 — résoudre sans discriminant, en lisant la forme somme/produit

Le sens inverse est encore plus rentable, et c'est un geste que les sujets exploitent directement.

**La règle.** Si deux nombres $u$ et $v$ vérifient $u+v=S$ et $uv=P$, alors $u$ et $v$ sont exactement les deux solutions de $z^2-Sz+P=0$.

**Pourquoi c'est vrai :** parce que $(z-u)(z-v) = z^2-(u+v)z+uv = z^2-Sz+P$. L'équation était déjà factorisée depuis le début ; il suffisait de le voir.

**Exemple travaillé.** Soient $u$ et $v$ deux nombres complexes tels que $u+v \neq 2i$. Résoudre dans $\mathbb{C}$ l'équation

$$(E)\ :\ z^2 - (u+v+2i)\,z + 2i\,(u+v) = 0$$

**Ce qu'on cherche et pourquoi ce geste :** regarde la forme des deux coefficients avant de calculer quoi que ce soit. Le coefficient de $z$ est la somme de deux blocs, $(u+v)$ et $2i$ ; le terme constant est le **produit des deux mêmes blocs**. C'est la signature de la forme somme/produit — et calculer un discriminant ici serait un long détour vers une réponse qu'on peut lire.

Mais « on voit que » n'est pas une rédaction. La façon honnête d'écrire la lecture, c'est de développer le produit candidat et de comparer :

$$\big(z-(u+v)\big)(z-2i) = z^2 - \big[(u+v)+2i\big]z + 2i\,(u+v)$$

C'est exactement $(E)$. Donc :

$$(E) \iff \big(z-(u+v)\big)(z-2i) = 0 \iff z = u+v \ \text{ ou } \ z = 2i$$

$$S = \left\{\, u+v\ ;\ 2i \,\right\}$$

Les deux solutions sont bien distinctes, puisque l'énoncé suppose $u+v \neq 2i$ — une hypothèse qui n'est jamais là par hasard : elle sert précisément à ça.

**Le piège à ne pas franchir :** les relations somme/produit donnent $S$ et $P$, jamais $z_1$ et $z_2$ séparément. Tant que tu n'as pas **reconnu** deux nombres dont la somme et le produit collent, elles ne remplacent pas la résolution — elles la contournent seulement quand la forme se laisse lire. Si rien ne se reconnaît, reviens au discriminant du chapitre précédent : c'est lui, la méthode générale.

---

## R5 — Représentation géométrique : affixe, image, et interprétation de $|z-z'|$

### Le plan complexe

Tu connais déjà un repère orthonormé $(O; \vec{u}, \vec{v})$ pour placer des points par leurs coordonnées $(x,y)$. On va utiliser exactement ce même repère, mais en l'appelant **plan complexe**, et en associant à chaque point un nombre complexe plutôt qu'un simple couple de coordonnées.

**Définition.** Au nombre complexe $z=a+bi$, on associe le point $M(a,b)$ : on dit que $M$ est **l'image** de $z$, et que $z$ est **l'affixe** de $M$.

[[figure:plan-complexe]]

La même idée s'applique à un vecteur : l'affixe du vecteur $\vec{OM}$ est $z$ lui-même, et plus généralement, l'affixe du vecteur $\vec{AB}$ (où $A$ a pour affixe $z_A$ et $B$ pour affixe $z_B$) est

$$z_{\vec{AB}} = z_B - z_A$$

### L'addition, vue comme une addition de vecteurs

**Pourquoi ça marche :** l'affixe $z=a+bi$ correspond au couple de coordonnées $(a,b)$. Additionner deux affixes, $(a+bi)+(a'+b'i)=(a+a')+(b+b')i$, revient donc exactement à additionner les coordonnées $(a,b)$ et $(a',b')$ terme à terme — c'est précisément la règle de l'addition vectorielle que tu connais déjà. Ajouter deux affixes, c'est ajouter les deux vecteurs correspondants.

### Deux images simples à repérer

- Le point d'affixe $\overline{z}$ est le **symétrique** du point d'affixe $z$ par rapport à l'axe des réels (l'axe des abscisses) : conjuguer, c'est changer le signe de $b$ seul, donc changer le signe de la deuxième coordonnée uniquement.
- Le point d'affixe $-z$ est le **symétrique** du point d'affixe $z$ par rapport à l'origine $O$ : on change le signe des deux coordonnées à la fois.

[[figure:module-argument]]

### L'interprétation géométrique du module : une distance

Voici l'idée la plus importante de ce chapitre. Reprends l'affixe du vecteur $\vec{AB}$, où $A(x_A,y_A)$ et $B(x_B,y_B)$ :

$$z_B - z_A = (x_B-x_A) + (y_B-y_A)i$$

$$|z_B-z_A| = \sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$$

Or cette dernière expression est exactement la **formule de la distance** entre deux points, que tu connais depuis la géométrie analytique. On a donc :

$$AB = |z_B-z_A|$$

**Ce que ça veut dire :** le module d'une différence d'affixes n'est pas un nombre abstrait — c'est littéralement la **distance** entre les deux points correspondants. C'est pour ça que le module s'appelle "module" : il mesure une taille, une distance à l'origine (pour $|z|$ tout seul, c'est $OM$), ou une distance entre deux points (pour $|z_B-z_A|$).

**Conséquence directe : l'équation d'un cercle.** L'ensemble des points $M$ d'affixe $z$ tels que $|z-z_\Omega|=r$ (avec $r>0$) est, par définition même de la distance, l'ensemble des points situés à une distance $r$ du point $\Omega$ d'affixe $z_\Omega$ — c'est-à-dire le **cercle de centre $\Omega$ et de rayon $r$**.

**Le milieu d'un segment.** L'affixe du milieu $I$ du segment $[AB]$ est la moyenne des deux affixes :

$$z_I = \frac{z_A+z_B}{2}$$

**Pourquoi c'est vrai :** les coordonnées du milieu d'un segment sont la moyenne des coordonnées des deux extrémités (un résultat de géométrie analytique que tu connais déjà) — et l'affixe n'est qu'une autre façon d'écrire un couple de coordonnées.

### Exemple travaillé

Soient $A$ et $B$ les points d'affixes respectives $z_A=0$ et $z_B=3+4i$, et $C$ le point d'affixe $z_C=-4+3i$. Montrer que le triangle $ABC$ est isocèle en $A$.

**Ce qu'on cherche et pourquoi ce geste :** "isocèle en $A$" signifie que les deux côtés issus de $A$ ont la même longueur, c'est-à-dire $AB=AC$. On calcule ces deux longueurs comme des modules de différences d'affixes.

$$AB = |z_B-z_A| = |3+4i-0| = \sqrt{3^2+4^2} = \sqrt{25} = 5$$

$$AC = |z_C-z_A| = |-4+3i-0| = \sqrt{(-4)^2+3^2} = \sqrt{25} = 5$$

$AB=AC=5$ : le triangle $ABC$ est bien isocèle en $A$.

**Remarque :** on n'a même pas eu besoin de dessiner la figure pour établir ce résultat — le calcul du module suffit à lui seul à comparer des longueurs.

[[checkpoint:cp-r5-difference]]

---

## R6 — Pour t'entraîner

Place maintenant les outils du chapitre sur un **vrai sujet d'examen national**. Ces exercices sont en mode « essaie d'abord » : lis l'énoncé, cherche par toi-même, engage une réponse — le raisonnement expert ne se dévoile qu'ensuite. C'est en butant, puis en comparant ta démarche à celle d'un expert, que la méthode s'installe.

Avant de te lancer, un point de bascule que le sujet exige : relier la forme algébrique d'un nombre complexe à sa forme exponentielle.

[[checkpoint:cp-bac-exponentielle]]

### Ce que ces exercices empruntent au chapitre suivant

Ce chapitre-ci enseigne le socle **algébrique** : forme algébrique, conjugué, module, géométrie du plan complexe. Un sujet national mobilise presque toujours, en plus, des outils du chapitre **« Nombres complexes : formes et transformations »** — et il vaut mieux le savoir avant de buter dessus que de croire les avoir oubliés :

- **La forme trigonométrique et la forme exponentielle**, $z = r\,e^{i\theta}$, et le passage dans les deux sens avec la forme algébrique — c'est le point de bascule que l'encadré ci-dessus te fait franchir ;
- **Les écritures complexes des transformations** : la **rotation** d'angle $\theta$ et de centre l'origine s'écrit $z' = e^{i\theta}z$, la **translation** $z' = z + b$, l'**homothétie** de rapport $k$ et de centre l'origine $z' = k\,z$. Le vocabulaire lui-même — « homothétie », « rotation d'écriture complexe » — appartient à ce chapitre-là ;
- **La résolution d'une équation du second degré à coefficients complexes**, traitée plus haut dans cette leçon.

Ce n'est pas un désordre du programme : les complexes forment un seul édifice, découpé en deux chapitres pour l'apprentissage, et un sujet de bac ne connaît pas ce découpage.

Voici le sujet — session normale 2019, filière Sciences Expérimentales (SVT et Sciences Physiques).

[[exercise:r-bac]]

Puis, pour vérifier que tu as retenu les **gestes** et non les nombres, une variation à la structure identique mais aux valeurs différentes :

[[exercise:r-variation]]

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts, non résolus ici :
     (1) skill_code : `maths_complexes_algebrique` — à confirmer contre la
     convention réelle utilisée en base avant intégration.
     (2) CONVERSION SUMMIT (campagne summit-conversion) : le summit R6 (solution
     imprimée + « À toi de jouer ») a été remplacé par la couche « essaie
     d'abord » — exercises.yaml (r-bac = sujet national vérifié 2019 SExp Ex.2 ;
     r-variation = jumeau anti-mémorisation, not-applicable) et checkpoints.yaml
     (cp-r0-predict + 4 gates de rupture : conjugué, module vs parties, distance
     |z_B − z_A|, forme algébrique ↔ exponentielle), câblés par des marqueurs
     [[exercise:]] / [[checkpoint:]].
     (3) TENSION DE PÉRIMÈTRE, à arbitrer par la relecture pédagogique : le corps
     de la leçon (R1–R5) enseigne le socle ALGÉBRIQUE (forme algébrique,
     conjugué, module, géométrie du plan complexe). Le sujet national vérifié
     2019 (r-bac) mobilise EN PLUS l'équation du second degré dans ℂ, la rotation
     z' = e^{iθ}z, et le pont forme algébrique ↔ exponentielle — hors du corps
     actuel. Le gate cp-bac-exponentielle et les champs `reasoning` de r-bac
     font le pont au point d'usage, mais un rung d'enseignement « forme
     trigonométrique / exponentielle et transformations » reste à écrire pour
     que le summit repose sur un socle complet. Voir aussi items.yaml
     coverage_summary : la couche trigo/expo n'est pas encore couverte par
     l'end-bank algébrique.
     (4) L'accroche R0 (progression ℕ → ℤ → ℚ → ℝ → ℂ) est un dispositif
     d'accroche, pas une citation du cadre officiel — à valider comme tel.
-->
