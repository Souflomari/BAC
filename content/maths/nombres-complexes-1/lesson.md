# Nombres complexes — forme algébrique et géométrie

---

## R0 — Accroche : l'équation qui n'a pas de solution

Reprends l'histoire des ensembles de nombres que tu connais déjà, depuis le collège.

- Dans $\mathbb{N}$ (les entiers naturels), l'équation $x+5=3$ n'a pas de solution : aucun entier naturel, augmenté de 5, ne donne 3. Il a fallu inventer les entiers négatifs, et $\mathbb{N}$ est devenu $\mathbb{Z}$.
- Dans $\mathbb{Z}$, l'équation $2x=3$ n'a pas de solution : aucun entier, doublé, ne donne 3. Il a fallu inventer les fractions, et $\mathbb{Z}$ est devenu $\mathbb{Q}$.
- Dans $\mathbb{Q}$, l'équation $x^2=2$ n'a pas de solution (tu l'as sans doute déjà démontré : $\sqrt{2}$ n'est pas un nombre rationnel). Il a fallu inventer les irrationnels, et $\mathbb{Q}$ est devenu $\mathbb{R}$.

À chaque étape, le même schéma se répète : une équation toute simple n'a pas de solution dans l'ensemble où on travaille, alors on **agrandit** l'ensemble pour lui en fournir une.

Maintenant, regarde cette équation, posée cette fois dans $\mathbb{R}$ :

$$x^2 = -1$$

A-t-elle une solution réelle ? Non : le carré d'un nombre réel, positif ou négatif, est toujours positif ou nul. Aucun réel, élevé au carré, ne peut donner un nombre négatif. L'équation $x^2=-1$ n'a donc **aucune solution dans $\mathbb{R}$**.

Avant de lire la suite, prends position : d'après le schéma qu'on vient de dérouler trois fois de suite, que devrait-on faire ? S'arrêter là, en disant que $x^2=-1$ est une impasse définitive — ou répéter le geste, et inventer un nouveau nombre pour combler ce manque, comme à chaque étape précédente ?

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

**C'est le résultat clé :** $z \times \overline{z}$ est **toujours un nombre réel, positif ou nul** — les deux $i$ ont complètement disparu. Multiplier par le conjugué transforme un complexe en réel. C'est ce mécanisme qui rend le conjugué utile dans toute la suite de ce rung.

### Propriétés du conjugué

En repartant de la définition $\overline{a+bi} = a-bi$, on obtient directement :

- $\overline{\overline{z}} = z$ (conjuguer deux fois revient à l'identité : on change le signe de $b$, puis on le change à nouveau).
- $\overline{z+z'} = \overline{z} + \overline{z'}$ (le conjugué d'une somme est la somme des conjugués).
- $\overline{z \times z'} = \overline{z} \times \overline{z'}$ (le conjugué d'un produit est le produit des conjugués).
- $z + \overline{z} = 2a = 2\,\text{Re}(z)$, un nombre réel.
- $z - \overline{z} = 2bi = 2i\,\text{Im}(z)$, un imaginaire pur.

Deux caractérisations très utiles découlent de ces deux dernières lignes :

$$z \text{ est réel} \iff z = \overline{z} \qquad \qquad z \text{ est imaginaire pur} \iff z = -\overline{z}$$

**Pourquoi c'est vrai :** si $z=\overline{z}$, alors $a+bi = a-bi$. D'après la règle d'égalité du R1, ça impose $b=-b$, donc $b=0$ — et $z=a$ est bien réel. Réciproquement, si $z$ est réel ($b=0$), alors $\overline{z}=a-0i=a=z$. Le même type de raisonnement, avec les rôles inversés, donne la caractérisation de l'imaginaire pur.

### Exemple travaillé

Vérifier, sur $z=4-3i$, que $z+\overline{z} = 2\,\text{Re}(z)$.

**Ce qu'on cherche et pourquoi ce geste :** c'est une vérification directe de la propriété — on calcule les deux membres séparément et on compare, pour bien voir que la propriété n'est pas une formule à croire sur parole.

Le conjugué de $z=4-3i$ est $\overline{z}=4+3i$.

$$z + \overline{z} = (4-3i)+(4+3i) = 8$$

Et $2\,\text{Re}(z) = 2 \times 4 = 8$. Les deux valeurs coïncident : $8=8$.

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

---

## R5 — Représentation géométrique : affixe, image, et interprétation de $|z-z'|$

### Le plan complexe

Tu connais déjà un repère orthonormé $(O; \vec{u}, \vec{v})$ pour placer des points par leurs coordonnées $(x,y)$. On va utiliser exactement ce même repère, mais en l'appelant **plan complexe**, et en associant à chaque point un nombre complexe plutôt qu'un simple couple de coordonnées.

**Définition.** Au nombre complexe $z=a+bi$, on associe le point $M(a,b)$ : on dit que $M$ est **l'image** de $z$, et que $z$ est **l'affixe** de $M$.

La même idée s'applique à un vecteur : l'affixe du vecteur $\vec{OM}$ est $z$ lui-même, et plus généralement, l'affixe du vecteur $\vec{AB}$ (où $A$ a pour affixe $z_A$ et $B$ pour affixe $z_B$) est

$$z_{\vec{AB}} = z_B - z_A$$

### L'addition, vue comme une addition de vecteurs

**Pourquoi ça marche :** l'affixe $z=a+bi$ correspond au couple de coordonnées $(a,b)$. Additionner deux affixes, $(a+bi)+(a'+b'i)=(a+a')+(b+b')i$, revient donc exactement à additionner les coordonnées $(a,b)$ et $(a',b')$ terme à terme — c'est précisément la règle de l'addition vectorielle que tu connais déjà. Ajouter deux affixes, c'est ajouter les deux vecteurs correspondants.

### Deux images simples à repérer

- Le point d'affixe $\overline{z}$ est le **symétrique** du point d'affixe $z$ par rapport à l'axe des réels (l'axe des abscisses) : conjuguer, c'est changer le signe de $b$ seul, donc changer le signe de la deuxième coordonnée uniquement.
- Le point d'affixe $-z$ est le **symétrique** du point d'affixe $z$ par rapport à l'origine $O$ : on change le signe des deux coordonnées à la fois.

### L'interprétation géométrique du module : une distance

Voici l'idée la plus importante de ce rung. Reprends l'affixe du vecteur $\vec{AB}$, où $A(x_A,y_A)$ et $B(x_B,y_B)$ :

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

---

## R6 — Pour t'entraîner

Voici un exercice de type bac, **original** (ce n'est pas un sujet officiel — c'est un exercice d'entraînement construit pour cette leçon), qui rassemble plusieurs des outils vus dans ce chapitre.

### Exercice travaillé

On considère les nombres complexes $z_1 = 2-i$ et $z_2 = -1+3i$.

**Partie A.**

1. Calculer $z_1+z_2$ et $z_1 \times z_2$ sous forme algébrique.
2. Calculer $\dfrac{z_1}{z_2}$ sous forme algébrique.
3. Calculer le module $|z_1|$.

**Partie B.** Soient $A$ et $B$ les points d'affixes respectives $z_1$ et $z_2$.

4. Calculer la distance $AB$.
5. Déterminer l'affixe du point $I$, milieu du segment $[AB]$.

**Raisonnement à voix haute.**

**Question 1.** On additionne parties réelles et parties imaginaires séparément :

$$z_1+z_2 = (2-i)+(-1+3i) = (2-1)+(-1+3)i = 1+2i$$

Pour le produit, on développe puis on remplace $i^2$ par $-1$ :

$$z_1 \times z_2 = (2-i)(-1+3i) = -2+6i+i-3i^2$$

$$= -2+7i-3(-1) = -2+7i+3 = 1+7i$$

**Question 2.** On multiplie haut et bas par le conjugué du dénominateur, $\overline{z_2}=-1-3i$ :

$$\frac{z_1}{z_2} = \frac{(2-i)(-1-3i)}{(-1+3i)(-1-3i)}$$

Le dénominateur, produit d'un complexe par son conjugué, vaut $(-1)^2+3^2=10$.

Le numérateur se développe :

$$(2-i)(-1-3i) = -2-6i+i+3i^2 = -2-5i-3 = -5-5i$$

$$\frac{z_1}{z_2} = \frac{-5-5i}{10} = -\frac{1}{2}-\frac{1}{2}i$$

**Question 3.** $|z_1| = |2-i| = \sqrt{2^2+(-1)^2} = \sqrt{5}$.

**Question 4.** La distance $AB$ est le module de la différence des affixes :

$$AB = |z_2-z_1| = |(-1+3i)-(2-i)| = |-3+4i| = \sqrt{(-3)^2+4^2} = \sqrt{25} = 5$$

**Question 5.** L'affixe du milieu est la moyenne des deux affixes :

$$z_I = \frac{z_1+z_2}{2} = \frac{1+2i}{2} = \frac{1}{2}+i$$

### À toi de jouer

**(a)** Calculer, sous forme algébrique, $(1+2i)(3-i)$, puis son module.

**(b)** Soient $A$ et $B$ les points d'affixes respectives $z_A=-2+i$ et $z_B=4-3i$. Déterminer l'affixe du milieu $I$ de $[AB]$, puis calculer la distance $AB$.

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts pour la relecture
     pédagogique, non résolus par cet auteur :
     (1) skill_code proposé ici : `maths_complexes_algebrique` (convention
     "<subject>_<short>" du brief, choisi pour se distinguer d'un futur
     chapitre 2 sur la forme trigonométrique/exponentielle). À confirmer
     contre la convention réelle utilisée en base avant intégration.
     (2) Périmètre : cette leçon couvre volontairement PARTIE 1 seulement
     (forme algébrique, opérations, conjugué, module, géométrie du plan
     complexe) et exclut l'argument, les formes trigonométrique/exponentielle,
     et les équations du second degré à coefficients complexes — laissés pour
     un chapitre 2 séparé, comme demandé. À confirmer que ce découpage en deux
     notions correspond exactement à la progression réelle du manuel/cadre SM.
     (3) Le module des propriétés listées au R4 omet volontairement l'inégalité
     triangulaire ($|z+z'| \leq |z|+|z'|$), qui n'était pas dans le périmètre
     demandé pour cette notion — à confirmer si elle doit être ajoutée ici ou
     réservée à un usage ultérieur (optimisation géométrique, etc.).
     (4) L'accroche du R0 (progression historique ℕ → ℤ → ℚ → ℝ → ℂ, chaque
     extension motivée par une équation sans solution) est un choix
     pédagogique de cet auteur, pas une citation du cadre officiel ni un fait
     historique sourcé précisément (l'histoire réelle de i passe surtout par
     la résolution des équations du troisième degré, hors programme ici) — à
     valider comme dispositif d'accroche, pas comme contenu à examiner.
-->
