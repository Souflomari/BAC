# Dénombrement

---

## R0 — Accroche : le cadenas à quatre chiffres

Ton ami a perdu le papier où il avait noté le code de son cadenas à roulettes. Le cadenas a 4 roues, chacune portant les chiffres de 0 à 9, et les chiffres peuvent se répéter (0000, 1111, 1234... tout est possible). Il te dit, plutôt confiant : "Je vais essayer tous les codes un par un, à raison d'un essai par seconde. Ça devrait aller vite."

Avant de lire la suite, prends position : à ton avis, combien de codes à 4 chiffres existe-t-il en tout ? Et à raison d'un essai par seconde, combien de temps faudrait-il pour tous les essayer, dans le pire des cas ? Note mentalement une estimation avant de continuer.

La tentation, c'est de vouloir lister : 0000, 0001, 0002... et de perdre patience très vite. Il existe pourtant un moyen de connaître le nombre exact de codes sans en écrire un seul, en observant juste la structure du problème : 4 roues, 10 choix indépendants sur chacune. C'est exactement ce que ce chapitre va t'apprendre à faire — compter sans lister. On y reviendra très précisément à la fin de la deuxième étape, et tu verras que la réponse est nettement plus grande que ce que la plupart des gens imaginent.

---

## R1 — Le principe multiplicatif : compter sans lister

### Une situation simple, comptée deux fois

Un petit restaurant propose un menu à choix : 3 entrées possibles (salade, soupe, ou pastilla) et 2 plats possibles (tajine ou couscous). Combien de menus complets (une entrée + un plat) peut-on composer ?

On peut lister, puisque c'est petit : (salade, tajine), (salade, couscous), (soupe, tajine), (soupe, couscous), (pastilla, tajine), (pastilla, couscous). Six menus.

Maintenant regarde la structure : pour CHACUNE des 3 entrées, il y a exactement 2 plats possibles derrière. Trois groupes de deux, ça fait $3 \times 2 = 6$. Le compte tombe juste.

### Pourquoi ça marche : l'arbre des choix

Ce n'est pas une coïncidence. Imagine un arbre : à la racine, tu choisis l'entrée (3 branches). Au bout de chaque branche "entrée", tu choisis le plat (2 branches). Le nombre de chemins complets dans cet arbre, c'est exactement le nombre de menus. Et parce que CHAQUE branche "entrée" se prolonge par le MÊME nombre de branches "plat" (2, toujours 2, peu importe l'entrée choisie), le nombre total de chemins est : (nombre de branches au premier niveau) fois (nombre de branches à chaque prolongement).

[[figure:arbre-denombrement]]

**Principe multiplicatif.** Si une situation se décompose en $k$ choix successifs, et si le $i$-ème choix offre toujours $n_i$ possibilités (peu importe ce qui a été choisi avant), alors le nombre total de résultats possibles est :

$$n_1 \times n_2 \times \cdots \times n_k$$

Le mot-clé qui signale ce principe, c'est "et" : une entrée ET un plat, une roue ET une autre roue, un choix ET encore un choix. Chaque "et" dans l'énoncé multiplie.

### Le principe additif : le cas du "ou"

Il existe une deuxième situation, plus simple, mais qu'on confond parfois avec la première. Si un choix se fait par une alternative — soit dans un groupe, soit dans un autre groupe, jamais les deux à la fois — alors on ADDITIONNE les possibilités.

Reprenons le menu : si le restaurant propose en plus un menu "entrée seule" (sans plat), avec les 3 mêmes entrées possibles, et que tu veux savoir combien de façons il y a de commander SOIT un menu complet, SOIT une entrée seule, tu ne multiplies pas — tu additionnes, parce que ce sont deux façons de commander qui s'excluent mutuellement (tu ne fais pas les deux à la fois) :

$$\underbrace{6}_{\text{menus complets}} + \underbrace{3}_{\text{entrées seules}} = 9 \text{ façons de commander}$$

**Principe additif.** Si $A$ et $B$ sont deux ensembles finis disjoints ($A \cap B = \emptyset$, ils ne partagent aucun élément), alors :

$$\text{card}(A \cup B) = \text{card}(A) + \text{card}(B)$$

**Le réflexe pour ne pas confondre :** demande-toi si les choix sont FAITS ENSEMBLE, l'un après l'autre (alors "et", on multiplie) ou si c'est UN SEUL choix entre deux familles séparées (alors "ou", on additionne). Confondre les deux est l'erreur la plus fréquente de ce chapitre — elle donne souvent un nombre bien trop petit là où il fallait multiplier.

### Exemple travaillé : un choix à trois étapes

Pour aller à un examen, tu choisis un t-shirt parmi 5, un pantalon parmi 3, et une paire de chaussures parmi 2. Combien de tenues complètes différentes peux-tu porter ?

**Ce qu'on cherche et pourquoi ce geste :** trois choix se font l'un après l'autre, et aucun des trois ne dépend des deux autres (choisir un t-shirt ne réduit ni n'augmente le nombre de pantalons ou de chaussures disponibles) — c'est très exactement la situation du principe multiplicatif, avec ici trois facteurs plutôt que deux.

$$5 \times 3 \times 2 = 30$$

Il y a 30 tenues complètes possibles. **Le signal à repérer :** dès qu'un énoncé annonce plusieurs choix qui se combinent TOUS ensemble (un t-shirt ET un pantalon ET des chaussures), c'est le principe multiplicatif — même avec plus de deux facteurs, le mécanisme est identique : un arbre qui se ramifie à chaque étape.

---

## R2 — Tirages avec remise, les p-listes : $n^p$

Le principe multiplicatif prend toute sa force quand les $k$ choix successifs ont TOUS le même nombre de possibilités $n$ — c'est exactement la situation d'un **tirage avec remise** : on choisit un élément, on le remet, puis on recommence, si bien que rien ne change d'un tirage à l'autre.

### Le vocabulaire : p-liste

Une **p-liste** (ou **p-uplet**) d'un ensemble $E$ à $n$ éléments, c'est une suite ORDONNÉE de $p$ éléments de $E$, où les répétitions sont autorisées. "Ordonnée" veut dire que $(1,2)$ et $(2,1)$ sont deux p-listes différentes, même si elles contiennent les mêmes chiffres.

C'est exactement ce qui se passe dans un **tirage successif avec remise** : on tire un élément, on le remet dans l'ensemble de départ, on retire (l'ensemble est donc identique à chaque tirage), et ainsi de suite $p$ fois.

**Pourquoi le compte est $n^p$ :** à chaque étape, il y a exactement $n$ choix possibles — puisqu'on remet l'élément, rien ne change entre une étape et la suivante. C'est le principe multiplicatif appliqué $p$ fois de suite, avec le même nombre $n$ à chaque facteur :

$$\underbrace{n \times n \times \cdots \times n}_{p \text{ fois}} = n^p$$

**Le nombre de p-listes d'un ensemble à $n$ éléments est $n^p$.**

### Résolvons enfin le cadenas du départ

Reviens à la question du R0 : un cadenas à 4 roues, chacune avec les chiffres 0 à 9, répétitions autorisées.

**Ce qu'on cherche et pourquoi ce geste :** chaque roue se règle indépendamment des autres (choisir 7 sur la première roue ne retire pas le 7 des roues suivantes) — c'est exactement une p-liste, avec $n=10$ (les chiffres 0 à 9) et $p=4$ (les 4 roues).

$$\text{nombre de codes} = 10^4 = 10\,000$$

Il y a **10 000 codes possibles.** À raison d'un essai par seconde, ton ami mettrait 10 000 secondes dans le pire des cas — soit environ **2 h 47 min**, pas "vite" du tout. La plupart des gens sous-estiment largement ce nombre parce qu'ils imaginent lister les codes un par un, plutôt que de voir la structure des 4 roues indépendantes.

[[figure:p-liste-cadenas]]

### Exemple travaillé : des mots de 3 lettres

Combien de "mots" de 3 lettres (pas forcément des mots qui existent en français) peut-on former avec les 26 lettres de l'alphabet, sachant qu'une lettre peut être répétée plusieurs fois dans le même mot ?

**Ce qu'on cherche et pourquoi ce geste :** on choisit une lettre pour la 1ère position, une lettre pour la 2e, une lettre pour la 3e — et rien n'empêche de réutiliser une lettre déjà choisie. C'est une p-liste : $n=26$ (les lettres), $p=3$ (les positions).

$$26^3 = 17\,576$$

Il y a 17 576 mots de 3 lettres possibles avec répétition.

---

## R3 — Tirages sans remise, l'ordre compte : les arrangements $A_n^p$

### Ce qui change quand on ne remet pas

Reprenons le tirage, mais cette fois **sans remise** : on tire un premier élément et on ne le remet PAS avant de tirer le suivant. Concrètement : 8 coureurs franchissent une ligne d'arrivée, et on veut savoir qui est 1er, qui est 2e, qui est 3e (le podium). Une fois qu'un coureur est classé 1er, il ne peut plus être classé 2e — il a déjà "pris" sa place.

**Pourquoi le compte n'est plus $n^p$ :** à la première étape, il y a bien $n$ choix. Mais à la deuxième étape, un élément a déjà été "consommé" — il ne reste que $n-1$ choix. À la troisième étape, $n-2$ choix. Le nombre de choix diminue à chaque étape, exactement de 1 à chaque fois, parce que chaque tirage retire définitivement un élément du réservoir disponible.

Pour le podium parmi 8 coureurs :

$$8 \times 7 \times 6 = 336$$

### La formule générale : l'arrangement $A_n^p$

Le nombre de façons de choisir, dans l'ordre et sans répétition, $p$ éléments parmi $n$ s'appelle un **arrangement**, noté $A_n^p$ (on lit "A n p"). C'est le produit de $p$ facteurs qui commencent à $n$ et diminuent de 1 à chaque fois :

$$A_n^p = n \times (n-1) \times (n-2) \times \cdots \times (n-p+1)$$

On peut réécrire ce produit à l'aide de la factorielle. Rappel : $n! = n \times (n-1) \times \cdots \times 2 \times 1$. Le produit ci-dessus est le début de $n!$, arrêté après $p$ facteurs — ce qui revient à diviser $n!$ par la partie qu'on n'a pas gardée :

$$A_n^p = \frac{n!}{(n-p)!}$$

**Vérifions que cette formule redonne bien 336 sur le podium** ($n=8$, $p=3$). On part de la définition :

$$A_8^3 = \frac{8!}{5!}$$

On développe $8!$ en gardant $5!$ intact à la fin, pour faire apparaître la simplification :

$$\frac{8!}{5!} = \frac{8 \times 7 \times 6 \times 5!}{5!}$$

Le facteur $5!$ se simplifie exactement, parce que $8!$ contient tous les facteurs de $5!$ en plus des trois premiers :

$$\frac{8 \times 7 \times 6 \times 5!}{5!} = 8 \times 7 \times 6$$

Il ne reste plus qu'à calculer :

$$8 \times 7 \times 6 = 336$$

C'est bien le même nombre trouvé directement plus haut.

[[figure:arrangement-reservoir]]

### Exemple travaillé : un tiercé de 12 chevaux

Dans une course de 12 chevaux, on veut prédire le tiercé exact — quel cheval arrive 1er, quel cheval arrive 2e, quel cheval arrive 3e, dans cet ordre précis. Combien de tiercés différents sont possibles ?

**Ce qu'on cherche et pourquoi ce geste :** l'ordre compte absolument ici (1er ≠ 2e ≠ 3e), et un cheval qui a déjà pris une place ne peut pas en prendre une deuxième — c'est un tirage sans remise, ordonné : un arrangement, avec $n=12$ et $p=3$.

$$A_{12}^3 = 12 \times 11 \times 10 = 1\,320$$

Il y a 1 320 tiercés possibles. **Le repère à garder :** dès que l'énoncé distingue explicitement des rôles ou des rangs différents (1er/2e/3e, président/trésorier/secrétaire), et que chaque élément ne peut occuper qu'un seul rôle, c'est un arrangement.

---

## R4 — Permutations : ranger tout le monde, $n!$

### Le cas particulier où on prend absolument tout

Il existe un cas particulier d'arrangement qui mérite son propre nom : celui où on ne choisit pas $p$ éléments parmi $n$, mais où on RANGE les $n$ éléments en entier, tous, dans un certain ordre. C'est un arrangement avec $p = n$.

Cinq amis veulent s'asseoir sur un banc de 5 places. Combien de façons différentes de les asseoir ?

Le premier ami a 5 places possibles. Une fois assis, il reste 4 places pour le deuxième ami. Puis 3, puis 2, puis 1 pour le dernier. C'est exactement le même mécanisme que l'arrangement : chaque personne casée réduit le nombre de places restantes de 1.

$$5 \times 4 \times 3 \times 2 \times 1 = 120$$

### La notation $n!$ et pourquoi c'est cohérent avec $A_n^p$

Ce produit — tous les entiers de $n$ jusqu'à 1 — s'appelle la **factorielle** de $n$, notée $n!$. C'est exactement le nombre de **permutations** de $n$ éléments : le nombre de façons différentes de les ranger tous, dans un ordre.

$$\text{nombre de permutations de } n \text{ éléments} = n! = A_n^n$$

Vérifions que la formule $A_n^p = \frac{n!}{(n-p)!}$ reste cohérente quand $p=n$ :

$$A_n^n = \frac{n!}{(n-n)!} = \frac{n!}{0!}$$

Pour que ce résultat vaille bien $n!$ (et pas autre chose), il faut que $0! = 1$. C'est exactement la convention retenue : $0!$ est défini comme valant $1$, précisément pour que cette formule reste valable même dans le cas extrême $p=n$ (et aussi parce qu'il y a exactement UNE façon de ranger "zéro élément" : ne rien faire).

### Exemple travaillé : ranger 6 livres sur une étagère

Combien de façons différentes de ranger 6 livres distincts (tous différents) sur une étagère qui a exactement 6 places ?

**Ce qu'on cherche et pourquoi ce geste :** on range TOUS les livres, aucun n'est laissé de côté — c'est une permutation des 6 livres, pas un simple arrangement partiel.

$$6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720$$

Il y a 720 rangements possibles. **Le repère à garder :** dès que l'énoncé dit "ranger TOUS les éléments" ou "les $n$ éléments dans leur totalité", c'est une permutation — un arrangement où $p=n$, donc $n!$.

---

## R5 — Tirages simultanés, l'ordre ne compte plus : les combinaisons $\binom{n}{p}$

### La nouvelle question : et si l'ordre n'avait pas d'importance ?

Jusqu'ici, l'ordre comptait : 1er, 2e, 3e étaient des rôles différents. Mais beaucoup de situations ne distinguent PAS d'ordre. Un exemple simple : on choisit un comité de 3 élèves parmi 8, sans distinguer de rôle particulier entre eux (pas de président, pas de trésorier — juste "faire partie du comité" ou non). Choisir {Amine, Sara, Karim} et choisir {Sara, Karim, Amine}, c'est exactement le MÊME comité — l'ordre dans lequel on les a nommés n'a aucune importance.

C'est un **tirage simultané** : on prend $p$ éléments d'un coup, tous ensemble, sans les ordonner — comme piocher une poignée de $p$ boules dans une urne, en une seule fois, plutôt que de les tirer une par une.

### Le mécanisme : combien de fois l'arrangement recompte-t-il chaque groupe ?

Voilà la question clé pour trouver la formule. On sait déjà compter les arrangements — les sélections ORDONNÉES de $p$ éléments parmi $n$, ça fait $A_n^p$. Un arrangement, c'est un choix de $p$ éléments PLUS un ordre sur ces $p$ éléments.

Prends un groupe fixé de $p$ éléments — disons {Amine, Sara, Karim}. Combien d'arrangements DIFFÉRENTS ce même groupe de 3 personnes produit-il, une fois qu'on les ordonne de toutes les façons possibles ? C'est exactement une permutation de ces 3 personnes entre elles : $3! = 6$ ordres différents, tous construits à partir du MÊME groupe de personnes.

Donc chaque groupe de $p$ éléments est compté **$p!$ fois** dans $A_n^p$ — une fois pour chacun de ses ordres possibles. Pour obtenir le nombre de GROUPES (sans ordre), il faut diviser $A_n^p$ par ce facteur de surcomptage. On définit ainsi la **combinaison** :

$$\binom{n}{p} = \frac{A_n^p}{p!}$$

Et puisqu'on connaît déjà $A_n^p = \dfrac{n!}{(n-p)!}$ depuis le R3, on substitue pour obtenir la formule explicite :

$$\binom{n}{p} = \frac{n!}{p! \, (n-p)!}$$

Cette quantité se note $\binom{n}{p}$ ou $C_n^p$ (les deux notations désignent exactement le même nombre — on utilisera les deux dans ce chapitre).

### Résolvons le comité de 3 parmi 8

$$A_8^3 = 8 \times 7 \times 6 = 336 \qquad \qquad 3! = 6$$

$$\binom{8}{3} = \frac{336}{6} = 56$$

Il y a **56 comités possibles** — bien moins que les 336 tiercés ordonnés du même groupe de 8 personnes, exactement parce qu'on a "effacé" l'ordre : chaque comité de 3 personnes correspond à 6 tiercés différents (les $3!=6$ façons de les ordonner), et $336 = 56 \times 6$.

[[figure:arrangement-combinaison]]

### Exemple travaillé : une main de cartes

Un jeu contient 32 cartes. On tire simultanément une main de 5 cartes (un tirage "d'un coup", pas une par une). Combien de mains différentes sont possibles ?

**Ce qu'on cherche et pourquoi ce geste :** une main de cartes n'a pas d'ordre — recevoir le roi de cœur puis l'as de pique, ou l'as de pique puis le roi de cœur, donne exactement la même main. C'est un tirage simultané : une combinaison, avec $n=32$ et $p=5$.

$$\binom{32}{5} = \frac{32!}{5!\,27!}$$

On développe $32!$ jusqu'à $27!$ pour faire apparaître la simplification :

$$\frac{32!}{5!\,27!} = \frac{32 \times 31 \times 30 \times 29 \times 28}{5 \times 4 \times 3 \times 2 \times 1}$$

Il ne reste qu'à calculer numérateur et dénominateur :

$$\frac{32 \times 31 \times 30 \times 29 \times 28}{5 \times 4 \times 3 \times 2 \times 1} = \frac{24\,165\,120}{120} = 201\,376$$

Il y a 201 376 mains différentes. **Le repère à garder :** dès que l'énoncé parle de "tirage simultané", "une poignée", "un groupe", "un comité SANS rôles distincts", ou dès que deux sélections identiques mais listées dans un ordre différent doivent être comptées UNE seule fois, c'est une combinaison.

### Récapitulatif des trois situations

| Situation | Ordre ? | Répétition ? | Formule | Nom |
|---|---|---|---|---|
| Tirage successif avec remise | Oui | Oui | $n^p$ | p-liste |
| Tirage successif sans remise | Oui | Non | $\dfrac{n!}{(n-p)!}$ | Arrangement $A_n^p$ |
| Tirage simultané | Non | Non | $\dfrac{n!}{p!(n-p)!}$ | Combinaison $\binom{n}{p}$ |

Le cas particulier $p=n$ d'un arrangement (ranger tous les éléments) donne une **permutation**, $n!$.

---

## R6 — Propriétés des combinaisons : symétrie et triangle de Pascal

### La symétrie : $\binom{n}{p} = \binom{n}{n-p}$

Choisir 3 membres d'un comité parmi 8, ou choisir les 5 personnes qu'on LAISSE DE CÔTÉ parmi les 8 — ce sont, au fond, deux façons de décrire exactement la même décision. Chaque choix de 3 personnes à inclure détermine EXACTEMENT un choix des 5 personnes à exclure, et réciproquement. Il y a donc autant de façons de choisir 3 personnes que de choisir 5 personnes parmi les mêmes 8 :

$$\binom{8}{3} = \binom{8}{5}$$

Vérifions par le calcul : $\binom{8}{5} = \dfrac{8!}{5!\,3!}$ et $\binom{8}{3} = \dfrac{8!}{3!\,5!}$ sont littéralement la même fraction, les deux facteurs au dénominateur étant simplement écrits dans l'autre ordre.

**Propriété (symétrie).** Pour tout $n$ et tout $p$ avec $0 \leq p \leq n$ :

$$\binom{n}{p} = \binom{n}{n-p}$$

Deux cas particuliers utiles à connaître par cœur, parce qu'ils reviennent tout le temps : $\binom{n}{0} = \binom{n}{n} = 1$ (il n'y a qu'une seule façon de choisir "rien du tout", et une seule façon de choisir "tout le monde"), et $\binom{n}{1} = \binom{n}{n-1} = n$ (choisir une seule personne, ou choisir toutes les personnes sauf une, ça fait $n$ façons dans les deux cas).

### Exemple travaillé : vérifier la symétrie sur un cas concret

Un enseignant doit choisir 2 délégués parmi 7 élèves pour un projet — ce qui revient, de manière équivalente, à choisir les 5 élèves qui n'y participeront PAS. Est-ce que ces deux comptages donnent bien le même nombre ?

**Ce qu'on cherche et pourquoi ce geste :** on vérifie la propriété de symétrie sur un exemple concret plutôt que de l'accepter sans preuve — chaque choix des 2 délégués détermine de façon unique le groupe des 5 exclus, donc les deux comptages doivent coïncider.

$$\binom{7}{2} = \frac{7 \times 6}{2 \times 1} = 21 \qquad \qquad \binom{7}{5} = \frac{7!}{5!\,2!} = \frac{7 \times 6}{2 \times 1} = 21$$

Les deux valent 21 : choisir 2 délégués parmi 7, c'est exactement la même décision que choisir les 5 qu'on écarte.

### Le triangle de Pascal : construire les combinaisons sans factorielle

Il existe une deuxième propriété, qui permet de calculer $\binom{n}{p}$ de proche en proche, sans repasser par les factorielles à chaque fois.

**Pourquoi c'est vrai — le raisonnement par cas :** fixe UN élément particulier de l'ensemble à $n$ éléments — appelons-le $x$. Un groupe de $p$ éléments, soit CONTIENT $x$, soit ne le CONTIENT PAS — ces deux cas sont mutuellement exclusifs (c'est le principe additif du R1) et couvrent tous les groupes possibles.

- **Si le groupe contient $x$ :** il reste à choisir les $p-1$ autres membres parmi les $n-1$ éléments restants (tous sauf $x$) : $\binom{n-1}{p-1}$ façons.
- **Si le groupe ne contient pas $x$ :** il faut choisir les $p$ membres entièrement parmi les $n-1$ éléments restants : $\binom{n-1}{p}$ façons.

Ces deux cas sont disjoints et couvrent tout, donc on additionne (principe additif) :

$$\binom{n}{p} = \binom{n-1}{p-1} + \binom{n-1}{p}$$

C'est la **relation de Pascal**. Elle permet de construire le tableau suivant, où chaque valeur est la somme des deux valeurs juste au-dessus d'elle (une case au-dessus à gauche, une case au-dessus à droite) :

| $n \backslash p$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 0 | 1 | | | | | |
| 1 | 1 | 1 | | | | |
| 2 | 1 | 2 | 1 | | | |
| 3 | 1 | 3 | 3 | 1 | | |
| 4 | 1 | 4 | 6 | 4 | 1 | |
| 5 | 1 | 5 | 10 | 10 | 5 | 1 |

Regarde par exemple $\binom{5}{2} = 10$ : c'est bien la somme de $\binom{4}{1}=4$ et $\binom{4}{2}=6$ juste au-dessus, $4+6=10$. Ce tableau s'appelle le **triangle de Pascal**.

[[figure:triangle-pascal]]

**Une mention utile pour plus tard :** ces mêmes nombres $\binom{n}{p}$ réapparaissent comme coefficients dans le développement de $(a+b)^n$ — le binôme de Newton — mais ce développement fait l'objet d'un autre chapitre ; on ne le traite pas ici.

---

## R7 — Dénombrement et probabilités : l'équiprobabilité

### Le lien : compter pour calculer une probabilité

Tout ce chapitre prend tout son sens dans une situation précise : une expérience aléatoire où tous les résultats possibles ont EXACTEMENT la même probabilité de se produire (par exemple : tirer une boule au hasard dans une urne, où chaque boule a autant de chances d'être tirée que n'importe quelle autre). C'est l'**équiprobabilité**.

Dans ce cas, la probabilité d'un événement $E$ se calcule uniquement en COMPTANT :

$$P(E) = \frac{\text{card}(E)}{\text{card}(\Omega)} = \frac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}$$

où $\Omega$ est l'univers (l'ensemble de tous les résultats possibles). **Pourquoi cette formule est vraie :** si les $\text{card}(\Omega)$ résultats sont tous équiprobables, chacun a probabilité $\frac{1}{\text{card}(\Omega)}$. L'événement $E$ regroupe $\text{card}(E)$ de ces résultats, donc sa probabilité est la somme de $\text{card}(E)$ termes identiques valant chacun $\frac{1}{\text{card}(\Omega)}$ — soit exactement $\frac{\text{card}(E)}{\text{card}(\Omega)}$.

Tout ce que tu as appris dans ce chapitre — p-listes, arrangements, permutations, combinaisons — sert exactement à calculer ces deux cardinaux, $\text{card}(E)$ et $\text{card}(\Omega)$, selon le TYPE de tirage décrit dans l'énoncé.

### Exemple travaillé : une urne à deux couleurs

Une urne contient 5 boules rouges et 4 boules vertes, indiscernables au toucher. On tire simultanément 3 boules. Quelle est la probabilité d'obtenir exactement 2 boules rouges et 1 boule verte ?

**Ce qu'on cherche et pourquoi ce geste :** "tirage simultané" signale immédiatement une combinaison, à la fois pour $\Omega$ (l'ensemble des tirages possibles de 3 boules parmi les 9) et pour l'événement favorable — mais l'événement favorable se décompose lui-même en DEUX choix indépendants (rouges ET vertes), donc principe multiplicatif entre deux combinaisons plus petites.

**Cardinal de l'univers** — choisir 3 boules parmi les 9 boules de l'urne, sans ordre :

$$\text{card}(\Omega) = \binom{9}{3} = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = 84$$

**Cardinal de l'événement favorable** — 2 rouges parmi les 5 rouges, ET 1 verte parmi les 4 vertes :

$$\text{card}(E) = \binom{5}{2} \times \binom{4}{1} = 10 \times 4 = 40$$

**La probabilité :**

$$P(E) = \frac{40}{84} = \frac{10}{21} \approx 0{,}476$$

**Le piège à éviter ici :** ne PAS confondre "choisir 2 rouges ET 1 verte" (un ET entre deux groupes différents, donc une multiplication de deux combinaisons) avec "choisir 3 boules parmi 9" (un seul groupe, une seule combinaison). C'est le "ET" entre rouges et vertes qui déclenche la multiplication — exactement le principe multiplicatif du R1, appliqué ici à des combinaisons plutôt qu'à des choix simples.

[[figure:urne-deux-couleurs]]

---

## R8 — Pour t'entraîner

Voici un exercice de type bac, **original** (ce n'est pas un sujet officiel — c'est un exercice d'entraînement construit pour cette leçon), pour mettre en pratique plusieurs outils de ce chapitre.

### Exercice travaillé

Un comité de gestion d'un club doit être formé à partir de 6 filles et 4 garçons (10 membres au total).

**Partie A.** On choisit simultanément 3 membres pour former le comité, sans distinction de rôle. Combien de comités différents peut-on former ?

**Partie B.** Parmi ces comités de 3 membres, combien contiennent exactement 2 filles et 1 garçon ?

**Partie C.** On tire au hasard un comité de 3 membres parmi les 10 personnes (tous les comités sont équiprobables). Quelle est la probabilité que ce comité contienne exactement 2 filles et 1 garçon ?

**Raisonnement à voix haute.**

**Partie A.** "Simultanément" et "sans distinction de rôle" signalent une combinaison : on choisit 3 personnes parmi 10, sans ordre.

$$\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$$

Il y a 120 comités possibles.

**Partie B.** Un comité avec exactement 2 filles et 1 garçon se décompose en deux choix indépendants : 2 filles parmi les 6 filles, ET 1 garçon parmi les 4 garçons. Le "ET" entre deux groupes distincts déclenche le principe multiplicatif entre deux combinaisons.

$$\binom{6}{2} \times \binom{4}{1} = 15 \times 4 = 60$$

Il y a 60 comités avec exactement 2 filles et 1 garçon.

**Partie C.** On est dans une situation d'équiprobabilité (tous les comités de 3 parmi 10 ont la même chance d'être tirés) : la probabilité est le rapport des cardinaux trouvés aux parties A et B.

$$P(\text{2 filles et 1 garçon}) = \frac{60}{120} = \frac{1}{2}$$

Il y a exactement une chance sur deux d'obtenir un comité à 2 filles et 1 garçon.

### À toi de jouer

**(a)** Un badge d'accès a un code formé de 3 lettres parmi les 26 lettres de l'alphabet, suivies de 2 chiffres parmi 0 à 9. Les lettres peuvent se répéter entre elles, et les chiffres aussi. Combien de codes de badge différents existe-t-il ?

**(b)** Une urne contient 7 boules numérotées de 1 à 7. On tire simultanément 2 boules. Quelle est la probabilité que la somme des deux numéros tirés soit égale à 8 ?

<!-- NOTE DE VALIDATION (relecture humaine) — trois points ouverts, non résolus
     par cet auteur :
     (1) skill_code proposé ici : `maths_denombrement` (convention
     "<subject>_<short>" du brief, cohérente avec `maths_limites_continuite`
     déjà en place). À confirmer contre la convention réelle utilisée ailleurs
     en base (ex. préfixe de filière type `sma_` vu sur
     probabilites-conditionnelles) avant intégration.
     (2) Notation des combinaisons : cette leçon introduit $\binom{n}{p}$ et
     $C_n^p$ à égalité, comme demandé dans le brief. Certains manuels
     marocains ne mettent en avant qu'une seule des deux notations en cours ;
     à confirmer laquelle est réellement primaire dans les manuels SM/PC/SVT
     avant intégration en base.
     (3) Ce chapitre couvre 7 sous-notions distinctes du programme (principes
     additif/multiplicatif, p-listes, arrangements, permutations,
     combinaisons + propriétés, lien probabiliste) et compte 9 rungs de
     contenu (R0-R8) — plus long que limites-continuite (7 rungs). À
     confirmer que le découpage en une seule notion (plutôt que "dénombrement"
     puis "probabilités" en deux notions séparées) correspond à la
     progression réelle du programme marocain 2ème Bac.
-->
