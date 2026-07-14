# Arithmétique

---

## R0 — Accroche : les deux bidons

Tu as deux bidons, sans aucune graduation : un de 3 litres, un de 5 litres, et un robinet d'eau à volonté. Les seules opérations autorisées : remplir un bidon à ras bord, le vider complètement, ou transvaser d'un bidon vers l'autre (jusqu'à ce que celui qui reçoit soit plein, ou que celui qui donne soit vide).

Peux-tu, avec seulement ces deux bidons, obtenir exactement 1 litre d'eau, mesuré avec précision ?

Avant de lire la suite, prends position : possible ou impossible ? Si tu penses que c'est possible, essaie vraiment de construire une suite d'opérations, sur papier, avant de continuer.

[[checkpoint:cp-r0-predict]]

Voici une suite qui fonctionne. Remplis le bidon de 3 L, verse-le entièrement dans le bidon de 5 L : il reste alors 2 L de place dans le grand bidon. Vide le bidon de 3 L, puis remplis-le à nouveau. Verse ce nouveau contenu dans le bidon de 5 L, jusqu'à ce que celui-ci soit plein — cela ne prend que 2 des 3 litres, puisqu'il ne restait que 2 L de place. Il reste alors, dans le bidon de 3 L, exactement $3 - 2 = 1$ litre.

[[figure:bidons-3-5]]

Ça marche. Mais est-ce un coup de chance, ou est-ce que n'importe quelle paire de bidons permettrait le même genre de tour ? Essaie avec un bidon de 4 L et un bidon de 6 L : peux-tu, cette fois, obtenir 1 litre ?

Tu vas buter sur quelque chose de systématique : avec 4 et 6, toute quantité que tu peux fabriquer est un multiple de 2 (2 L, 4 L, 6 L, 8 L, ...) — jamais 1 L. Ce n'est pas un hasard.

La différence entre la paire $(3,5)$ et la paire $(4,6)$ tient en un seul nombre : leur plus grand diviseur commun. $\mathrm{PGCD}(3,5) = 1$, alors que $\mathrm{PGCD}(4,6) = 2$. Il existe un théorème qui dit exactement, pour n'importe quelle paire de bidons et n'importe quelle quantité visée, quand une combinaison de remplissages et de vidanges peut l'atteindre. Ce théorème s'appelle le **théorème de Bézout**, et ce chapitre construit, étape par étape, tout ce qu'il faut pour le démontrer — et pour comprendre précisément pourquoi il est vrai.

Ne cherche pas encore la preuve. On la construit ensemble, pièce par pièce.

---

## R1 — Divisibilité dans $\mathbb{Z}$ et division euclidienne

### La divisibilité : une définition, pas un calcul

Un entier $b$ **divise** un entier $a$ (on note $b \mid a$, on dit aussi que $a$ est un **multiple** de $b$, ou que $b$ est un **diviseur** de $a$) s'il existe un entier $k$ tel que :

$$a = b \times k$$

Rien de plus. $6 \mid 18$ parce que $18 = 6 \times 3$. Et $6 \nmid 20$ parce qu'aucun entier $k$ ne vérifie $20 = 6k$ (le seul candidat serait $k = \frac{20}{6}$, qui n'est pas entier).

### La division euclidienne : ce qu'elle dit vraiment

Diviser 20 par 6, ce n'est pas seulement dire "6 ne divise pas 20" — c'est trouver le multiple de 6 le plus proche de 20 par en dessous, et mesurer l'écart. $18 = 6 \times 3$ est le plus grand multiple de 6 qui ne dépasse pas 20 ; l'écart est $20 - 18 = 2$.

**Théorème (division euclidienne).** Pour tout entier $a$ et tout entier $b \geq 1$, il existe un unique couple d'entiers $(q, r)$ tel que :

$$a = bq + r \qquad \text{avec} \qquad 0 \leq r < b$$

$q$ s'appelle le **quotient**, $r$ le **reste**.

### Pourquoi ce théorème est vrai

**Existence.** Range tous les multiples de $b$ sur une droite : $\ldots, -2b, -b, 0, b, 2b, 3b, \ldots$. Ces multiples découpent la droite en intervalles consécutifs de longueur $b$. Quel que soit l'entier $a$, il tombe dans exactement un de ces intervalles : il existe un entier $q$ tel que

$$bq \leq a < b(q+1)$$

Pose $r = a - bq$. Comme $a \geq bq$, on a $r \geq 0$. Et comme $a < b(q+1) = bq + b$, on a $r < b$. Donc $r$ vérifie bien $0 \leq r < b$, et $a = bq + r$ par construction. L'existence est établie : ce n'est pas un acte de foi, c'est le simple fait que $a$ doit tomber quelque part sur la droite des multiples de $b$.

**Unicité.** Suppose qu'il existe deux couples qui marchent : $a = bq + r$ et $a = bq' + r'$, avec $0 \leq r < b$ et $0 \leq r' < b$. En soustrayant les deux égalités :

$$b(q - q') = r' - r$$

Donc $b \mid (r' - r)$. Mais $r$ et $r'$ sont tous les deux dans $[0, b)$, donc leur différence $r' - r$ est strictement comprise entre $-b$ et $b$. Le seul multiple de $b$ strictement compris entre $-b$ et $b$, c'est $0$. Donc $r' - r = 0$, c'est-à-dire $r = r'$ — et alors $b(q - q') = 0$ avec $b \neq 0$, donc $q = q'$ aussi. Les deux couples sont en fait le même couple : l'unicité tient au fait qu'un écart de moins de $b$ ne peut jamais être, lui-même, un multiple non nul de $b$.

### Exemple travaillé : diviser 157, puis diviser $-157$

**Ce qu'on cherche et pourquoi ce geste :** trouver le quotient et le reste, c'est trouver le multiple de 12 immédiatement en dessous de 157 (ou de $-157$), et mesurer l'écart — jamais l'inverse.

Pour $157$ divisé par $12$ : $12 \times 13 = 156$, et $156 \leq 157 < 168 = 12 \times 14$. Donc :

$$157 = 12 \times 13 + 1$$

Quotient $13$, reste $1$ — et $0 \leq 1 < 12$, la condition est bien vérifiée.

Pour $-157$ divisé par $12$, attention au piège : le reste doit rester **positif ou nul**, donc on ne peut pas se contenter d'inverser le signe du quotient précédent. On cherche le multiple de 12 immédiatement en dessous de $-157$ : c'est $12 \times (-14) = -168$, pas $12 \times (-13) = -156$ (qui, lui, est au-dessus de $-157$). Donc :

$$-157 = 12 \times (-14) + 11$$

Vérification : $12 \times (-14) = -168$, et $-168 + 11 = -157$. ✓ Et $0 \leq 11 < 12$. Le quotient est $-14$ (pas $-13$) précisément parce que le reste doit être choisi dans $[0, 12)$ et non centré autour de zéro.

[[figure:division-euclidienne-droite]]

---

## R2 — Congruences modulo $n$ : propriétés et calculs de restes

### Définition

Pour un entier $n \geq 1$, on dit que $a$ est **congru à** $b$ **modulo** $n$, noté :

$$a \equiv b \pmod{n}$$

si $n \mid (a - b)$, c'est-à-dire si $a - b$ est un multiple de $n$.

**Pourquoi c'est équivalent à "même reste" :** si $n \mid (a-b)$, écris $a - b = nk$. Note $r$ le reste de la division euclidienne de $a$ par $n$, donc $a = nq + r$ avec $0 \leq r < n$. Alors $b = a - nk = nq + r - nk = n(q-k) + r$. C'est une division euclidienne valide de $b$ par $n$ (le reste $r$ vérifie toujours $0 \leq r < n$), donc par l'unicité vue en R1, le reste de $b$ dans sa division par $n$ est ce même $r$. Conclusion : $a \equiv b \pmod{n}$ dit exactement que $a$ et $b$ laissent le même reste dans la division par $n$ — les deux définitions sont une seule et même idée vue sous deux angles.

### Compatibilité avec $+$ et $\times$ — et pourquoi c'est vrai

**Propriété.** Si $a \equiv b \pmod{n}$ et $c \equiv d \pmod{n}$, alors :

$$a + c \equiv b + d \pmod{n} \qquad \text{et} \qquad ac \equiv bd \pmod{n}$$

**Preuve pour l'addition.** Par hypothèse, $n \mid (a-b)$ et $n \mid (c-d)$. Or :

$$(a+c) - (b+d) = (a-b) + (c-d)$$

Une somme de deux multiples de $n$ est un multiple de $n$, donc $n \mid \big((a+c)-(b+d)\big)$, ce qui est exactement $a+c \equiv b+d \pmod{n}$.

**Preuve pour la multiplication.** On écrit $ac - bd$ en faisant apparaître les deux quantités qu'on sait divisibles par $n$ :

$$ac - bd = ac - bc + bc - bd$$

$$ac - bd = c(a-b) + b(c-d)$$

Le premier terme est un multiple de $n$ (car $n \mid (a-b)$), le second aussi (car $n \mid (c-d)$) ; leur somme l'est donc également. Donc $n \mid (ac - bd)$, c'est-à-dire $ac \equiv bd \pmod{n}$.

**Conséquence utile.** En appliquant la compatibilité avec $\times$ plusieurs fois de suite (prendre $c = a$ et $d = b$, répéter), on obtient : si $a \equiv b \pmod{n}$, alors pour tout entier $k \geq 1$ :

$$a^k \equiv b^k \pmod{n}$$

C'est cet outil, précisément, qui rend les congruences utiles : elles permettent de calculer des restes de très grands nombres sans jamais calculer le grand nombre lui-même.

### Application 1 — calculer un reste sans calculer la puissance

Quel est le reste de la division de $2^{41}$ par 7 ?

**Ce qu'on cherche et pourquoi ce geste :** calculer $2^{41}$ directement est absurde (34 chiffres). On cherche plutôt une périodicité dans les puissances de 2 modulo 7, puis on ramène l'exposant 41 dans cette période grâce à la division euclidienne — exactement l'outil du R1, réutilisé ici.

$$2^1 \equiv 2 \pmod{7}, \qquad 2^2 \equiv 4 \pmod{7}, \qquad 2^3 \equiv 1 \pmod{7}$$

La puissance $2^3$ revient à $1$ modulo 7 : le cycle a une longueur de 3. On divise l'exposant 41 par cette longueur :

$$41 = 3 \times 13 + 2$$

Donc $2^{41} = \left(2^3\right)^{13} \times 2^2$. En appliquant la compatibilité avec $\times$ (et la conséquence sur les puissances) :

$$2^{41} \equiv 1^{13} \times 2^2 \equiv 4 \pmod{7}$$

Le reste de $2^{41}$ par 7 est **4** — obtenu sans jamais écrire le nombre $2^{41}$ en entier.

### Application 2 — un critère de divisibilité, expliqué et non appris par cœur

Pourquoi peut-on tester la divisibilité par 9 en additionnant simplement les chiffres ? La réponse tient en une seule observation :

$$10 \equiv 1 \pmod{9}$$

(en effet $10 - 1 = 9$, qui est bien un multiple de 9). En appliquant la conséquence sur les puissances, pour tout $k$ :

$$10^k \equiv 1^k \equiv 1 \pmod{9}$$

Or un nombre écrit en base 10 avec les chiffres $a_p, a_{p-1}, \ldots, a_1, a_0$ vaut exactement $\sum_{i=0}^{p} a_i \times 10^i$. En remplaçant chaque $10^i$ par son reste modulo 9, qui vaut toujours 1, et en utilisant la compatibilité de la congruence avec la somme :

$$\sum_{i=0}^{p} a_i \times 10^i \equiv \sum_{i=0}^{p} a_i \times 1 \equiv \sum_{i=0}^{p} a_i \pmod{9}$$

Le nombre entier est donc congru, modulo 9, à la simple somme de ses chiffres. **C'est pour ça** que "divisible par 9" équivaut à "somme des chiffres divisible par 9" — ce n'est pas une coïncidence numérique, c'est une conséquence directe de $10 \equiv 1 \pmod 9$.

**Exemple :** $4581$. Somme des chiffres : $4+5+8+1 = 18$, qui est divisible par 9. Donc $4581$ est divisible par 9 — vérification directe : $4581 = 9 \times 509$, exact.

(Le même argument, avec $10 \equiv 1 \pmod 3$, donne le critère de divisibilité par 3 : somme des chiffres divisible par 3.)

[[checkpoint:cp-r2-congruence]]

---

## R3 — $\mathrm{PGCD}$ et l'algorithme d'Euclide

### Définition

Pour deux entiers $a, b$ non tous les deux nuls, le **plus grand diviseur commun**, noté $\mathrm{PGCD}(a,b)$, est le plus grand entier positif qui divise à la fois $a$ et $b$.

### Le lemme qui fait tout marcher

**Lemme d'Euclide.** Si $a = bq + r$ (la division euclidienne de $a$ par $b$, avec $b \neq 0$), alors :

$$\mathrm{PGCD}(a,b) = \mathrm{PGCD}(b,r)$$

**Pourquoi c'est vrai — la preuve.** On va montrer que $(a,b)$ et $(b,r)$ ont exactement les mêmes diviseurs communs ; s'ils ont le même ensemble de diviseurs communs, ils ont en particulier le même plus grand.

Soit $d$ un diviseur commun de $a$ et $b$. Comme $r = a - bq$, et que $d \mid a$ et $d \mid b$ (donc $d \mid bq$), on a $d \mid (a - bq) = r$. Donc $d$ divise aussi $b$ et $r$ : $d$ est un diviseur commun de $(b,r)$.

Réciproquement, soit $d$ un diviseur commun de $b$ et $r$. Comme $a = bq + r$, et que $d \mid b$ (donc $d \mid bq$) et $d \mid r$, on a $d \mid (bq + r) = a$. Donc $d$ divise aussi $a$ et $b$ : $d$ est un diviseur commun de $(a,b)$.

Les deux ensembles de diviseurs communs coïncident exactement. Leur plus grand élément est donc le même nombre : $\mathrm{PGCD}(a,b) = \mathrm{PGCD}(b,r)$.

### L'algorithme, et pourquoi il s'arrête

Le lemme dit qu'on peut remplacer la paire $(a,b)$ par la paire $(b,r)$ sans changer le $\mathrm{PGCD}$ cherché — et $(b,r)$ est une paire de nombres plus petits. On répète :

$$a = bq_0 + r_0, \qquad b = r_0 q_1 + r_1, \qquad r_0 = r_1 q_2 + r_2, \qquad \ldots$$

À chaque étape, le nouveau reste vérifie $0 \leq r_{k+1} < r_k$ : la suite des restes est **strictement décroissante** et reste toujours positive ou nulle. Une suite d'entiers naturels strictement décroissante ne peut pas continuer indéfiniment — elle doit atteindre $0$ après un nombre fini d'étapes. C'est pour cette raison, et uniquement celle-là, que l'algorithme se termine toujours.

Le **dernier reste non nul** de cette suite est le $\mathrm{PGCD}(a,b)$ : c'est une application répétée du lemme, jusqu'à ce que le reste devienne nul (à ce moment-là, $\mathrm{PGCD}(r_{k-1}, r_k) = \mathrm{PGCD}(r_k, 0) = r_k$, puisque tout diviseur de $r_k$ divise aussi $0$).

### Exemple travaillé : $\mathrm{PGCD}(252, 198)$

**Ce qu'on cherche et pourquoi ce geste :** appliquer la division euclidienne successivement, en remplaçant à chaque fois la paire par (diviseur, reste), jusqu'au premier reste nul.

$$252 = 198 \times 1 + 54$$

$$198 = 54 \times 3 + 36$$

$$54 = 36 \times 1 + 18$$

$$36 = 18 \times 2 + 0$$

Le dernier reste non nul est $18$ :

$$\mathrm{PGCD}(252, 198) = 18$$

[[figure:euclide-cascade]]

[[checkpoint:cp-r3-pgcd-ppcm]]

---

## R4 — Nombres premiers entre eux et le théorème de Bézout

### Une définition qu'on confond trop souvent

Deux entiers $a$ et $b$ sont dits **premiers entre eux** si $\mathrm{PGCD}(a,b) = 1$.

Arrête-toi ici, avant de continuer, et prends position honnêtement : les entiers $8$ et $9$ sont-ils premiers entre eux ? Beaucoup d'élèves répondent "non", en pensant : "ni 8 ni 9 n'est un nombre premier, donc ils ne peuvent pas être premiers entre eux." Est-ce ton raisonnement aussi ?

Teste-le par le calcul, pas par l'intuition. $8 = 2^3$ n'est pas premier ; $9 = 3^2$ n'est pas premier non plus. Mais quels sont leurs diviseurs communs ? Les diviseurs de 8 sont $1, 2, 4, 8$ ; les diviseurs de 9 sont $1, 3, 9$. Le seul diviseur commun est $1$. Donc $\mathrm{PGCD}(8,9) = 1$ : **8 et 9 sont premiers entre eux**, alors qu'aucun des deux n'est un nombre premier.

Le mot "premiers" dans "premiers entre eux" ne parle pas d'un nombre isolé — il parle d'une **paire**, et de ce qu'ils ont (ou n'ont pas) en commun. "Être premier" est une propriété d'un seul nombre (n'avoir que 1 et lui-même comme diviseurs) ; "être premiers entre eux" est une propriété d'une paire (ne partager aucun diviseur commun autre que 1). Un nombre composé peut très bien être premier avec un autre nombre composé — c'est même le cas le plus fréquent.

### Le théorème de Bézout

**Théorème.** Pour tous entiers $a, b$ non tous deux nuls, en notant $d = \mathrm{PGCD}(a,b)$, il existe des entiers $u, v$ (appelés **coefficients de Bézout**) tels que :

$$au + bv = d$$

**Cas particulier essentiel :** $a$ et $b$ sont premiers entre eux si et seulement s'il existe des entiers $u, v$ tels que $au + bv = 1$.

Le sens direct (si $\mathrm{PGCD}(a,b)=1$, alors une telle égalité existe) est le théorème ci-dessus appliqué avec $d=1$. La réciproque mérite sa propre preuve, courte : si $au+bv=1$ pour des entiers $u,v$, alors tout diviseur commun $\delta$ de $a$ et $b$ divise $au$ et divise $bv$, donc divise leur somme $au+bv=1$. Un entier positif qui divise $1$ ne peut être que $1$ lui-même. Donc $\mathrm{PGCD}(a,b) = 1$.

### Pourquoi le théorème est vrai : on le construit, on ne l'admet pas

La preuve est constructive : elle remonte l'algorithme d'Euclide à l'envers, en substituant chaque ligne dans la précédente. Reprends l'exemple du R3, $\mathrm{PGCD}(252,198) = 18$ :

$$252 = 198 \times 1 + 54 \qquad (\text{ligne 1})$$

$$198 = 54 \times 3 + 36 \qquad (\text{ligne 2})$$

$$54 = 36 \times 1 + 18 \qquad (\text{ligne 3})$$

On part de la dernière ligne avant le reste nul, en isolant le reste $18$ :

$$18 = 54 - 36 \times 1$$

On remplace $36$ grâce à la ligne 2 ($36 = 198 - 54 \times 3$) :

$$18 = 54 - (198 - 54 \times 3)$$

$$18 = 54 \times 4 - 198 \times 1$$

On remplace maintenant $54$ grâce à la ligne 1 ($54 = 252 - 198 \times 1$) :

$$18 = (252 - 198) \times 4 - 198 \times 1$$

$$18 = 252 \times 4 - 198 \times 5$$

On obtient $18 = 252 \times 4 + 198 \times (-5)$ : les coefficients de Bézout sont $u = 4$, $v = -5$.

**Vérification :** $252 \times 4 = 1008$, $198 \times 5 = 990$, et $1008 - 990 = 18$. ✓

Ce mécanisme — remonter l'algorithme d'Euclide ligne par ligne, en substituant à chaque étape — fonctionne toujours, quels que soient $a$ et $b$ : c'est exactement pour ça que le théorème est vrai pour toute paire d'entiers, pas seulement pour cet exemple.

[[figure:bezout-remontee]]

### Retour aux bidons

La paire $(3,5)$ du R0 admet, par ce même mécanisme, l'écriture $3 \times 2 + 5 \times (-1) = 1$ (vérifie-le : $6 - 5 = 1$). Et c'est précisément la manœuvre effectuée avec les bidons : remplir le bidon de 3 L **deux fois** ($u=2$), et transvaser de façon à retirer l'équivalent d'**un** bidon de 5 L ($v=-1$). Le théorème de Bézout n'est pas qu'une formule abstraite — il décrit exactement, en une seule égalité, la manipulation physique qui marche.

---

## R5 — Le théorème de Gauss

### L'énoncé

**Théorème (Gauss).** Soient $a$, $b$, $c$ des entiers. Si $a \mid bc$ et si $\mathrm{PGCD}(a,b) = 1$, alors $a \mid c$.

### Pourquoi c'est vrai — la preuve à partir de Bézout

**Ce qu'on cherche et pourquoi ce geste :** on veut fabriquer $c$ comme un multiple de $a$. Le théorème de Bézout donne une égalité qui vaut $1$ ; il suffit de la multiplier par $c$ pour faire apparaître $c$ tout court.

Comme $\mathrm{PGCD}(a,b) = 1$, le théorème de Bézout (R4) donne des entiers $u, v$ tels que :

$$au + bv = 1$$

On multiplie les deux membres par $c$ :

$$acu + bcv = c$$

Regarde chaque terme du membre de gauche. Le premier terme, $acu$, est un multiple de $a$ (facteur $a$ apparent). Le second terme, $bcv$, est aussi un multiple de $a$ — mais pour une autre raison : c'est l'hypothèse $a \mid bc$ qui le garantit, donc $bc = ak$ pour un entier $k$, et $bcv = akv$ est bien un multiple de $a$. La somme de deux multiples de $a$ est un multiple de $a$, donc $c = acu + bcv$ est un multiple de $a$ :

$$a \mid c$$

### Pourquoi l'hypothèse $\mathrm{PGCD}(a,b)=1$ n'est pas optionnelle

Avant de continuer, prends position : peut-on appliquer ce théorème sans vérifier que $a$ et $b$ sont premiers entre eux ? Beaucoup d'élèves, une fois le théorème appris, l'appliquent à n'importe quel $a \mid bc$ en concluant directement "$a \mid b$ ou $a \mid c$" — sans jamais vérifier la condition de coprimalité.

Teste ce réflexe sur un exemple. On a $6 \mid 4 \times 9$ (en effet $4 \times 9 = 36 = 6 \times 6$). Peut-on en conclure que $6 \mid 4$ ou $6 \mid 9$ ? Vérifie : $6 \nmid 4$, et $6 \nmid 9$. Aucune des deux conclusions n'est vraie.

Ce n'est pas une exception bizarre — c'est exactement ce que prédit la preuve elle-même : la preuve reposait sur l'existence de $u,v$ tels que $au+bv=1$, ce qui n'est possible que si $\mathrm{PGCD}(a,b)=1$. Ici, $\mathrm{PGCD}(6,4) = 2$ et $\mathrm{PGCD}(6,9) = 3$ : aucun des deux couples n'est premier entre eux, donc l'égalité de Bézout à $1$ n'existe pas pour ces couples, et le mécanisme de la preuve ne peut tout simplement pas démarrer. **Sans la coprimalité, le théorème ne s'applique pas — et sans lui, la conclusion peut être fausse.**

### Une conséquence immédiate, utile pour les critères de divisibilité

**Corollaire.** Si $a \mid c$, $b \mid c$, et $\mathrm{PGCD}(a,b) = 1$, alors $ab \mid c$.

**Preuve.** Comme $a \mid c$, écris $c = ak$ pour un entier $k$. Comme $b \mid c = ak$ et $\mathrm{PGCD}(a,b) = 1$ (donc aussi $\mathrm{PGCD}(b,a)=1$), le théorème de Gauss donne $b \mid k$. Écris donc $k = bk'$ pour un entier $k'$. Alors :

$$c = ak = a(bk') = (ab)k'$$

Donc $ab \mid c$.

**Exemple :** $36$ est-il divisible par $12$ ? On sait que $36$ est divisible par $3$ et par $4$ (deux vérifications rapides : $36 = 3 \times 12$, $36 = 4 \times 9$), et $\mathrm{PGCD}(3,4) = 1$. Par le corollaire, $36$ est divisible par $3 \times 4 = 12$ — confirmé directement, $36 = 12 \times 3$. C'est ainsi qu'on justifie, par exemple, qu'un nombre divisible à la fois par 3 et par 4 est automatiquement divisible par 12 : la coprimalité de 3 et 4 est ce qui rend cette combinaison légitime (elle ne le serait pas avec 4 et 6, qui ne sont pas premiers entre eux).

### Exemple travaillé : appliquer Gauss à une congruence

Un entier $n$ vérifie $11 \mid 3n$. Que peut-on en déduire sur $n$ ?

**Ce qu'on cherche et pourquoi ce geste :** avant d'appliquer Gauss, on vérifie la condition — c'est la première chose à faire, pas la dernière. Ici $a = 11$, $b = 3$, $c = n$, et $\mathrm{PGCD}(11,3) = 1$ (11 est premier, et ne divise pas 3). La condition est vérifiée, donc le théorème s'applique :

$$11 \mid 3n \quad \text{et} \quad \mathrm{PGCD}(11,3)=1 \quad \Longrightarrow \quad 11 \mid n$$

[[checkpoint:cp-r5-gauss]]

---

## R6 — Nombres premiers et décomposition en facteurs premiers

### Définition et un test pour la vérifier

Un entier $p \geq 2$ est **premier** si ses seuls diviseurs positifs sont $1$ et $p$.

**Pourquoi il suffit de tester les diviseurs jusqu'à $\sqrt{p}$ :** si $p = ab$ avec $1 < a \leq b < p$, alors $a$ et $b$ ne peuvent pas être tous les deux strictement supérieurs à $\sqrt{p}$ — sinon leur produit $ab$ dépasserait $p$. Donc au moins un des deux diviseurs, le plus petit, est inférieur ou égal à $\sqrt{p}$. Conclusion pratique : si aucun entier de $2$ à $\sqrt{p}$ (arrondi à l'entier inférieur) ne divise $p$, alors $p$ est premier — inutile de tester plus loin.

**Exemple :** $91$ est-il premier ? $\sqrt{91} \approx 9{,}5$, donc on teste $2, 3, 5, 7$. $91$ est impair (pas de 2), $9+1=10$ n'est pas divisible par 3, ne se termine pas par 0 ou 5 (pas de 5). Reste 7 : $91 = 7 \times 13$. $91$ n'est donc **pas premier**.

$97$ est-il premier ? $\sqrt{97} \approx 9{,}8$, on teste $2,3,5,7$ : aucun ne divise 97. $97$ est **premier**.

### La décomposition en produit de facteurs premiers

**Théorème.** Tout entier $n \geq 2$ peut s'écrire comme un produit de nombres premiers :

$$n = p_1^{\alpha_1} \times p_2^{\alpha_2} \times \cdots \times p_k^{\alpha_k}$$

et cette écriture est unique, à l'ordre des facteurs près.

**Pourquoi l'existence est vraie (esquisse) :** si $n$ est premier, c'est déjà une décomposition à un seul facteur. Sinon, $n = ab$ avec $1 < a < n$ et $1 < b < n$ — et $a$, $b$, étant strictement plus petits que $n$, se décomposent eux-mêmes en facteurs premiers (en admettant que la propriété est déjà vraie pour tous les entiers plus petits que $n$) ; il suffit de rassembler leurs facteurs. On admet que cette écriture est de plus unique — la preuve complète de l'unicité repose sur une application répétée du lemme suivant, qui est lui-même un cas particulier du théorème de Gauss.

**Lemme d'Euclide (cas particulier de Gauss).** Si $p$ est premier et $p \mid ab$, alors $p \mid a$ ou $p \mid b$.

**Preuve.** Si $p \mid a$, c'est terminé. Sinon, $p \nmid a$. Comme $p$ est premier, ses seuls diviseurs positifs sont $1$ et $p$ ; donc $\mathrm{PGCD}(p,a)$ vaut $1$ ou $p$. Puisque $p \nmid a$, ce n'est pas $p$ : c'est donc $1$. Le théorème de Gauss (R5), appliqué avec $p \mid ab$ et $\mathrm{PGCD}(p,a) = 1$, donne directement $p \mid b$.

### Exemple travaillé : décomposer 360, puis retrouver un $\mathrm{PGCD}$ déjà connu

**Ce qu'on cherche et pourquoi ce geste :** décomposer, c'est diviser successivement par le plus petit facteur premier possible, jusqu'à atteindre 1.

$$360 = 2 \times 180 = 2 \times 2 \times 90 = 2 \times 2 \times 2 \times 45$$

$45$ n'est plus divisible par 2 ; on continue avec 3 :

$$45 = 3 \times 15 = 3 \times 3 \times 5$$

Donc :

$$360 = 2^3 \times 3^2 \times 5$$

Reprenons $252$ (déjà rencontré au R3), qui se décompose en $252 = 2^2 \times 3^2 \times 7$. La décomposition en facteurs premiers donne une **seconde méthode** pour calculer un $\mathrm{PGCD}$ : garder chaque facteur premier commun, à la puissance la **plus petite** des deux :

$$\mathrm{PGCD}(360, 252) = 2^{\min(3,2)} \times 3^{\min(2,2)} = 2^2 \times 3^2 = 36$$

**Vérification par l'algorithme d'Euclide** (R3), sur ces deux mêmes nombres : $360 = 252 \times 1 + 108$ ; $252 = 108 \times 2 + 36$ ; $108 = 36 \times 3 + 0$. Dernier reste non nul : $36$. Les deux méthodes, complètement différentes dans leur mécanisme, donnent exactement le même résultat — ce qui n'est pas un hasard, mais une confirmation croisée utile chaque fois que tu as un doute sur un calcul.

[[figure:factorisation-360]]

---

## R7 — Équations diophantiennes : résoudre $ax + by = c$

### Le problème

Une **équation diophantienne** est une équation dont on cherche les solutions **entières** (par opposition à réelles). On s'intéresse ici à :

$$ax + by = c \qquad (a, b, c \text{ entiers donnés}, \ a, b \text{ non tous deux nuls})$$

### Condition d'existence d'une solution

**Théorème.** L'équation $ax+by=c$ admet des solutions entières $(x,y)$ si et seulement si $\mathrm{PGCD}(a,b) \mid c$.

**Preuve du sens direct (nécessité).** Si $(x_0,y_0)$ est une solution entière, alors $d = \mathrm{PGCD}(a,b)$ divise $a$ et divise $b$, donc $d$ divise toute combinaison $ax_0+by_0$ — en particulier $d \mid c$.

**Preuve du sens réciproque (suffisance) — et c'est ici que Bézout construit la solution.** Si $d \mid c$, écris $c = dk$ pour un entier $k$. Le théorème de Bézout (R4) donne des entiers $u,v$ tels que $au+bv=d$. En multipliant cette égalité par $k$ :

$$a(uk) + b(vk) = dk = c$$

Donc $(x_0,y_0) = (uk, vk)$ est une solution entière. La preuve ne se contente pas d'affirmer qu'une solution existe : elle la **construit**, à partir des coefficients de Bézout.

### Trouver toutes les solutions — et c'est ici que Gauss intervient

Une fois une solution particulière $(x_0,y_0)$ trouvée, on cherche la solution générale. Soustrais l'équation de la solution particulière à l'équation générale :

$$a(x - x_0) + b(y - y_0) = 0$$

$$a(x-x_0) = b(y_0 - y)$$

Divise les deux membres par $d = \mathrm{PGCD}(a,b)$, en posant $a' = \frac{a}{d}$ et $b' = \frac{b}{d}$ (des entiers, puisque $d$ divise $a$ et $b$) :

$$a'(x-x_0) = b'(y_0-y)$$

Ici, $a'$ et $b'$ sont premiers entre eux — si un entier $\delta > 1$ divisait à la fois $a'$ et $b'$, alors $\delta d$ diviserait à la fois $a$ et $b$, ce qui contredirait le fait que $d$ est déjà le **plus grand** diviseur commun. Donc $\mathrm{PGCD}(a',b')=1$.

**Ce qu'on cherche et pourquoi ce geste :** on veut isoler $y_0 - y$. On a $a' \mid b'(y_0-y)$ (le membre de gauche montre que $a'$ divise le membre de droite), et $\mathrm{PGCD}(a',b')=1$ : exactement les conditions du théorème de Gauss. Il s'applique :

$$a' \mid (y_0 - y)$$

Donc $y_0 - y = a't$ pour un entier $t$, c'est-à-dire $y = y_0 - a't$. En reportant dans $a'(x-x_0) = b'(y_0-y) = b'(a't)$, et en simplifiant par $a'$ :

$$x - x_0 = b't \qquad \text{donc} \qquad x = x_0 + b't$$

**Solution générale :**

$$x = x_0 + b't, \qquad y = y_0 - a't, \qquad t \in \mathbb{Z}$$

### Exemple travaillé : résoudre $252x + 198y = 36$ dans $\mathbb{Z}^2$

**Ce qu'on cherche et pourquoi ce geste :** vérifier d'abord que l'équation est soluble ($\mathrm{PGCD}(252,198) \mid 36$), puis construire une solution particulière à partir de Bézout, puis balayer toutes les solutions via Gauss.

On sait déjà (R3) que $\mathrm{PGCD}(252,198) = 18$, et $18 \mid 36$ (car $36 = 18 \times 2$) : l'équation est soluble.

On sait aussi (R4) que $252 \times 4 + 198 \times (-5) = 18$. En multipliant par $k=2$ :

$$252 \times 8 + 198 \times (-10) = 36$$

Une solution particulière est donc $(x_0, y_0) = (8, -10)$.

Pose $a' = \frac{252}{18} = 14$ et $b' = \frac{198}{18} = 11$ (on vérifie qu'ils sont bien premiers entre eux : $14 = 11 \times 1 + 3$, $11 = 3 \times 3 + 2$, $3 = 2 \times 1 + 1$, $2 = 1 \times 2 + 0$ — dernier reste non nul $1$, donc $\mathrm{PGCD}(14,11)=1$, confirmé). La solution générale est :

$$x = 8 + 11t, \qquad y = -10 - 14t, \qquad t \in \mathbb{Z}$$

**Vérification** (utile pour se convaincre que la méthode ne triche pas) :

$$252(8+11t) + 198(-10-14t) = 2016 + 2772t - 1980 - 2772t$$

$$= 2016 + 2772t - 1980 - 2772t = 36$$

Les termes en $t$ s'annulent exactement — ce n'est pas un hasard : $252 \times 11 = 2772$ et $198 \times 14 = 2772$ sont égaux par construction, puisque $252 \times b' = 252 \times \frac{198}{18} = \frac{252 \times 198}{18}$ et $198 \times a' = 198 \times \frac{252}{18} = \frac{198 \times 252}{18}$ sont littéralement la même quantité.

[[figure:solutions-diophantiennes-reseau]]

---

## R8 — Pour t'entraîner

Le sujet ci-dessous est un **vrai sujet d'examen national** : Sciences Mathématiques, session normale 2019 (code NS 24F, Exercice 3). Il enchaîne, en une seule chaîne serrée, les outils du chapitre — le théorème de Bézout (R4), les congruences et leurs puissances (R2), le lemme d'Euclide « un premier qui divise une puissance divise la base » (R6) — plus un outil supplémentaire du programme, le **petit théorème de Fermat**, que le rupture-gate ci-dessous rappelle avant que tu ne t'y attaques. Ne lis pas la correction d'un trait : engage-toi question par question.

[[checkpoint:cp-r6-fermat]]

[[exercise:r-bac]]

Une fois le sujet 2019 compris, voici une **variation fraîche** — un autre nombre premier, un autre exposant — pour vérifier que tu as saisi la chaîne d'outils, et pas seulement mémorisé une suite de calculs.

[[exercise:r-variation]]
