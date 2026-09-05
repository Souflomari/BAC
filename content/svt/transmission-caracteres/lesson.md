# Les lois statistiques de transmission des caractères

---

## R0 — Accroche : deux souris grises, un petit tout blanc

Voici une situation que tout éleveur de souris de laboratoire a un jour observée. Prends le temps d'y réfléchir avant de lire la suite.

---

Un éleveur croise deux souris au pelage **gris**. Rien d'étrange à ça : deux parents gris, on s'attend à des petits gris. Et c'est bien ce qui se passe... pour la plupart des petits.

Mais dans chaque portée, un certain nombre de souriceaux naissent avec un pelage **entièrement blanc**. Aucun des deux parents n'est blanc. Aucun des deux parents n'a de tache blanche. Ils sont gris, tous les deux, sans ambiguïté.

**Avant de lire la suite, prends position.** Si tu comptais tous les souriceaux nés de nombreux croisements de ce type (gris × gris, avec apparition de blancs), quelle fraction te semble la plus plausible pour les petits blancs ? Une souris sur deux ? Une sur trois ? Une sur quatre ? Note mentalement ta réponse — on y reviendra.

[[checkpoint:cp-r0-predict]]

Ce phénomène n'a rien d'un hasard chaotique. Sur un grand nombre de portées, la fraction de souriceaux blancs se stabilise systématiquement autour d'une valeur précise. Ni $\frac{1}{2}$, ni $\frac{1}{3}$. On observe presque toujours $\frac{1}{4}$.

Comment deux parents gris peuvent-ils produire un quart de petits blancs — pas moins, pas plus ? Pour répondre à cette question avec certitude (et pas seulement par intuition), il faut construire, pièce par pièce, les outils de la génétique formelle : le vocabulaire exact, puis les lois découvertes par Mendel, puis l'outil de calcul qui les met en œuvre — l'échiquier de croisement. À la fin de cette leçon, on reviendra sur ces souris et ce $\frac{1}{4}$ n'aura plus rien de mystérieux.

---

## R1 — Le vocabulaire : ce que chaque mot désigne précisément

### Gène et allèle

Chaque cellule d'un individu porte des chromosomes, organisés en **paires** (une paire = un chromosome hérité du père, un chromosome homologue hérité de la mère). Sur un chromosome, à un endroit précis appelé **locus**, se trouve un **gène** : un segment d'ADN qui porte l'information nécessaire à la construction d'un caractère héréditaire (la couleur du pelage, la forme d'une graine, la longueur d'une aile...).

Puisque les chromosomes vont par paires, chaque individu possède **deux exemplaires** de chaque gène — un sur chaque chromosome homologue. Ces deux exemplaires peuvent être identiques, ou légèrement différents. Ces versions différentes d'un même gène sont ses **allèles**.

Pour le gène de la couleur du pelage chez la souris, il existe (entre autres) deux allèles : un allèle « gris », noté $G$, et un allèle « blanc », noté $g$. Tout individu porte deux allèles pour ce gène — un sur chaque chromosome de la paire.

### Génotype et phénotype

Le **génotype**, c'est la paire d'allèles qu'un individu porte réellement pour un gène donné — son patrimoine génétique. On le note avec un double trait `//` qui symbolise les deux chromosomes homologues : une souris peut être $G//G$, $G//g$, ou $g//g$.

Le **phénotype**, c'est ce qu'on observe : l'aspect visible du caractère (ici, la couleur réelle du pelage).

**Ce sont deux choses différentes**, et c'est là que se loge le piège de cette leçon : deux individus de génotypes différents peuvent avoir exactement le même phénotype. On va voir pourquoi tout de suite.

### Dominance et récessivité

Quand un individu porte deux allèles différents ($G//g$), un seul des deux s'exprime dans le phénotype. Dans notre exemple, une souris $G//g$ est grise, pas grise-et-blanche, pas d'une couleur intermédiaire. L'allèle $G$ (gris) est dit **dominant** : il s'exprime dans le phénotype même en présence d'un seul exemplaire. L'allèle $g$ (blanc) est dit **récessif** : il ne s'exprime dans le phénotype que lorsqu'il est présent en double exemplaire ($g//g$) — sinon, il reste « masqué » par le dominant.

**Pourquoi un allèle en masque-t-il un autre ?** Dans la majorité des cas étudiés au lycée, l'allèle dominant code une version fonctionnelle du caractère (par exemple une protéine qui produit effectivement le pigment gris), et un seul exemplaire fonctionnel suffit à produire l'effet visible. L'allèle récessif, lui, code souvent une version non fonctionnelle (pas de pigment produit) : tant qu'il reste un exemplaire fonctionnel de l'allèle dominant dans la cellule, l'effet visible est celui du dominant. Ce n'est que lorsque les DEUX exemplaires sont la version non fonctionnelle que l'effet du dominant disparaît complètement et que le phénotype récessif apparaît. Convention d'écriture : l'allèle dominant s'écrit avec une lettre majuscule, l'allèle récessif avec la même lettre en minuscule.

### Homozygote et hétérozygote

Un individu qui porte deux allèles **identiques** pour un gène ($G//G$ ou $g//g$) est dit **homozygote** (on dit aussi qu'il appartient à une **lignée pure** pour ce caractère). Un individu qui porte deux allèles **différents** ($G//g$) est dit **hétérozygote**.

| | Génotype | Phénotype | Type |
|--|--|--|--|
| Souris 1 | $G//G$ | Grise | Homozygote (lignée pure) |
| Souris 2 | $G//g$ | Grise | Hétérozygote |
| Souris 3 | $g//g$ | Blanche | Homozygote (lignée pure) |

### L'erreur classique à éviter ici

Regarde bien la souris 1 et la souris 2 dans le tableau : **même phénotype, génotypes différents**. Une souris grise n'est donc pas forcément « pure » pour le gris — elle peut très bien porter, sans le montrer, un allèle blanc caché. C'est exactement le mécanisme qui explique le mystère du chapitre 1 : un parent gris peut être hétérozygote ($G//g$) et transmettre, sans le savoir, l'allèle $g$ à sa descendance. On ne peut jamais déduire le génotype d'un individu à partir de son seul phénotype, dès que l'un des deux allèles est récessif — on y reviendra précisément au chapitre 6.

[[checkpoint:cp-r1-vocabulaire]]

---

## R2 — Le monohybridisme et la première loi de Mendel : l'uniformité de la F1

### Une expérience contrôlée

Le **monohybridisme** est l'étude de la transmission d'**un seul** caractère à la fois. Pour l'étudier proprement, on part de deux **lignées pures** (homozygotes) qui diffèrent par ce caractère — c'est la génération **P** (parentale). On les croise, et on observe la génération suivante, la **F1** (première génération filiale).

Reprenons nos souris : on croise une lignée pure grise ($G//G$) avec une lignée pure blanche ($g//g$).

### Construire l'échiquier de croisement

L'**échiquier de croisement** (ou tableau de Punnett) est l'outil qui rend ce raisonnement mécanique et sans erreur. Son principe : on liste en ligne tous les types de gamètes que peut produire un parent, en colonne tous les types de gamètes de l'autre parent, et chaque case de la grille donne le génotype d'un descendant possible.

Un parent homozygote ne peut produire qu'**un seul type de gamète** : la méiose sépare les deux chromosomes homologues, mais puisqu'ils portent le même allèle chez un homozygote, chaque gamète reçoit forcément cet unique allèle. Le parent gris ($G//G$) ne produit que des gamètes $G$. Le parent blanc ($g//g$) ne produit que des gamètes $g$.

| | Gamète $g$ |
|--|--|
| **Gamète $G$** | $G//g$ |

Une seule case : tous les œufs fécondés reçoivent un $G$ du parent gris et un $g$ du parent blanc. **100 % de la F1 est $G//g$**, et puisque $G$ domine $g$, 100 % de la F1 est phénotypiquement grise.

### La première loi de Mendel

**Ce que fait ce résultat :** en croisant deux lignées pures qui diffèrent par un seul caractère, tous les individus de la F1 sont génétiquement identiques (ici, tous hétérozygotes $G//g$) et donc phénotypiquement identiques (ici, tous gris). C'est la **loi de l'uniformité des hybrides de première génération** : quel que soit le nombre de croisements P × P réalisés, la F1 obtenue est toujours homogène.

On appelle ces individus F1 des **hybrides**, précisément parce qu'ils portent deux allèles différents — même si, à l'œil, rien ne les distingue d'une lignée pure grise. C'est le retour du piège du chapitre 2 : la F1 est phénotypiquement uniforme, mais génétiquement, elle cache déjà l'allèle $g$.

### Pourquoi c'est nécessairement vrai

La raison n'a rien de mystérieux, une fois qu'on la regarde du côté des gamètes : un parent homozygote n'a qu'un seul type d'allèle à transmettre. Il n'y a donc qu'**une seule combinaison possible** à l'union des gamètes — l'échiquier ne peut avoir qu'une case remplie. L'uniformité de la F1 n'est pas une coïncidence : elle est la conséquence directe du fait que les parents P sont des lignées pures.

### Vérification rapide

Si on avait croisé deux lignées pures grises ($G//G \times G//G$), on obtiendrait bien sûr 100 % de $G//G$ — mais ça ne serait pas un « hybride » digne d'intérêt, puisque les deux parents partagent déjà le même allèle. Le monohybridisme s'intéresse au croisement de lignées pures **différentes** pour le caractère étudié.

[[checkpoint:cp-r2-uniformite]]

---

## R3 — La deuxième loi de Mendel : disjonction des allèles et l'échiquier de la F2

### La question qui reste ouverte

La F1 ($G//g$, phénotype gris) est hétérozygote — elle porte l'allèle $g$ sans le montrer. Que se passe-t-il si on croise deux individus F1 entre eux (ou, ce qui revient exactement au même du point de vue génétique, deux souris grises hétérozygotes) ? C'est la génération **F2**.

C'est exactement la situation du chapitre 1 : deux parents phénotypiquement gris, dont on ignore a priori qu'ils sont hétérozygotes.

### Ce que produit un hétérozygote : la disjonction des allèles

Un hétérozygote porte deux allèles différents, un sur chaque chromosome homologue. Pendant la méiose, les deux chromosomes homologues d'une paire se **séparent** (on parle de **disjonction**) et partent dans des gamètes différents. Résultat : un individu $G//g$ produit deux types de gamètes en **proportions égales** — la moitié de ses gamètes portent $G$, l'autre moitié portent $g$. Jamais un gamète ne porte les deux allèles à la fois : c'est ce que Mendel appelait la **pureté des gamètes**.

C'est la **deuxième loi de Mendel** : au moment de la formation des gamètes, les deux allèles d'une paire se séparent et se répartissent, à parts égales, dans des gamètes distincts.

[[figure:disjonction-alleles]]

### Construire l'échiquier F1 × F1

Les deux parents ($G//g \times G//g$) produisent chacun deux types de gamètes, $G$ (proportion $\frac{1}{2}$) et $g$ (proportion $\frac{1}{2}$). L'échiquier a maintenant quatre cases :

| | Gamète $G$ ($\frac{1}{2}$) | Gamète $g$ ($\frac{1}{2}$) |
|--|--|--|
| **Gamète $G$ ($\frac{1}{2}$)** | $G//G$ | $G//g$ |
| **Gamète $g$ ($\frac{1}{2}$)** | $G//g$ | $g//g$ |

**Lecture des génotypes :** $\frac{1}{4}$ de $G//G$, $\frac{2}{4}$ de $G//g$, $\frac{1}{4}$ de $g//g$ — un rapport génotypique $1:2:1$.

**Lecture des phénotypes :** $G//G$ et $G//g$ sont tous deux gris (l'allèle $G$ domine dans les deux cas). Seul $g//g$ est blanc. Le rapport phénotypique est donc $\frac{3}{4}$ gris : $\frac{1}{4}$ blanc.

### D'où vient exactement ce $\frac{1}{4}$

Regarde la case $g//g$ dans le tableau : elle exige que **les deux parents** transmettent chacun leur gamète $g$ **au même œuf**. Chaque parent transmet $g$ avec une probabilité $\frac{1}{2}$, et les deux transmissions sont indépendantes (le gamète transmis par la mère n'a aucune influence sur celui transmis par le père). On multiplie donc les deux probabilités :

$$P(g//g) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$$

Voilà l'origine précise du $\frac{1}{4}$ du chapitre 1 : ce n'est pas une fraction approximative, c'est le produit exact de deux événements indépendants de probabilité $\frac{1}{2}$ chacun.

### Fermeture de l'arc : les souris du début, résolues

Tu te souviens de la question posée au tout début ? Deux souris grises, et pourtant des petits blancs dans la portée. On a maintenant l'explication complète : les deux parents sont phénotypiquement gris, mais génétiquement hétérozygotes ($G//g$) — ils portent chacun, sans le montrer, l'allèle blanc $g$. Quand les deux gamètes $g$ (l'un de la mère, l'un du père) se rencontrent au hasard à la fécondation, ce qui arrive avec une probabilité $\frac{1}{4}$, l'œuf obtenu est $g//g$ et donne un petit au pelage entièrement blanc.

Ce n'est ni un accident ni une anomalie : c'est la conséquence directe et prévisible de la deuxième loi de Mendel, appliquée à deux parents hétérozygotes.

### L'erreur classique à éviter ici

L'erreur la plus fréquente à ce stade : penser qu'un parent au phénotype dominant ne peut transmettre que l'allèle dominant. C'est faux dès que ce parent est hétérozygote — et rien dans son phénotype ne permet de l'exclure. C'est exactement le piège signalé au chapitre 2 : phénotype gris ne veut pas dire génotype homozygote gris.

Une deuxième erreur fréquente : oublier que $\frac{1}{4}$ vient d'une **multiplication** de deux probabilités indépendantes ($\frac{1}{2} \times \frac{1}{2}$), et non d'une simple lecture directe sur une seule branche. Si un jour tu obtiens $\frac{1}{2}$ pour la case $g//g$, vérifie : as-tu bien multiplié la probabilité du gamète maternel PAR celle du gamète paternel, ou as-tu seulement regardé un des deux parents ?

### Vérification rapide

Les quatre cases de l'échiquier doivent totaliser $1$ : $\frac{1}{4} + \frac{1}{4} + \frac{1}{4} + \frac{1}{4} = 1$. C'est le cas — l'échiquier est complet, aucune combinaison de gamètes n'a été oubliée.

[[checkpoint:cp-r3-disjonction]]

---

## R4 — Le dihybridisme : deux gènes indépendants, la troisième loi

### Étudier deux caractères à la fois

Le **dihybridisme** étudie la transmission simultanée de **deux** caractères, contrôlés par deux gènes différents. Pour que le raisonnement de cette leçon s'applique, il faut une condition : les deux gènes doivent être **indépendants**, c'est-à-dire portés par deux paires de chromosomes différentes (non homologues). On appelle ce cas la **ségrégation indépendante**.

Changeons d'organisme pour cette étude, en suivant l'exemple classique utilisé en génétique : la drosophile (la mouche du vinaigre). On s'intéresse à deux caractères :
- la couleur du corps : gris (allèle $C$, dominant) ou noir (allèle $c$, récessif) ;
- la longueur des ailes : longues (allèle $L$, dominant) ou vestigiales, c'est-à-dire courtes et non fonctionnelles (allèle $l$, récessif).

### Croisement de lignées pures : la première loi, revisitée

On croise une lignée pure corps gris/ailes longues ($C//C \, ; \, L//L$) avec une lignée pure corps noir/ailes vestigiales ($c//c \, ; \, l//l$). Chaque parent, étant homozygote pour les deux gènes, ne produit qu'un seul type de gamète : $CL$ pour le premier, $cl$ pour le second. Toute la F1 est donc $C//c \, ; \, L//l$ — un **double hétérozygote**, phénotypiquement gris à ailes longues. On retrouve exactement le mécanisme de la première loi (chapitre 3), appliqué ici à deux gènes en même temps.

### Les gamètes d'un double hétérozygote

La question centrale du dihybridisme : quels gamètes produit un individu F1, double hétérozygote ($C//c \, ; \, L//l$) ?

Puisque les deux gènes sont sur des paires de chromosomes différentes, la façon dont la paire « couleur » se sépare pendant la méiose n'a **aucune influence** sur la façon dont la paire « longueur des ailes » se sépare. Les deux disjonctions sont indépendantes l'une de l'autre — d'où le nom de la **troisième loi de Mendel : la ségrégation indépendante des caractères**.

Concrètement : la moitié des gamètes reçoit $C$, l'autre moitié $c$ (indépendamment de l'autre gène) ; la moitié des gamètes reçoit $L$, l'autre moitié $l$. En combinant les deux, **quatre types de gamètes** sont produits, en proportions égales :

$$P(CL) = P(Cl) = P(cL) = P(cl) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$$

C'est le même geste de multiplication qu'au chapitre 4 (deux événements indépendants, chacun de probabilité $\frac{1}{2}$), simplement appliqué ici pour construire un gamète à la place d'un génotype.

### Construire l'échiquier F1 × F1 (16 cases)

Chaque parent F1 produit les quatre gamètes $CL$, $Cl$, $cL$, $cl$, chacun avec une probabilité $\frac{1}{4}$. L'échiquier de croisement compte donc $4 \times 4 = 16$ cases :

[[figure:echiquier-dihybride]]

| | $CL$ ($\frac14$) | $Cl$ ($\frac14$) | $cL$ ($\frac14$) | $cl$ ($\frac14$) |
|--|--|--|--|--|
| **$CL$ ($\frac14$)** | $C//C\,;\,L//L$ | $C//C\,;\,L//l$ | $C//c\,;\,L//L$ | $C//c\,;\,L//l$ |
| **$Cl$ ($\frac14$)** | $C//C\,;\,L//l$ | $C//C\,;\,l//l$ | $C//c\,;\,L//l$ | $C//c\,;\,l//l$ |
| **$cL$ ($\frac14$)** | $C//c\,;\,L//L$ | $C//c\,;\,L//l$ | $c//c\,;\,L//L$ | $c//c\,;\,L//l$ |
| **$cl$ ($\frac14$)** | $C//c\,;\,L//l$ | $C//c\,;\,l//l$ | $c//c\,;\,L//l$ | $c//c\,;\,l//l$ |

En regroupant les 16 cases par phénotype (gris domine noir, longues domine vestigiales) :

- **gris, ailes longues :** 9 cases sur 16, soit $\frac{9}{16}$
- **gris, ailes vestigiales :** 3 cases sur 16, soit $\frac{3}{16}$
- **noir, ailes longues :** 3 cases sur 16, soit $\frac{3}{16}$
- **noir, ailes vestigiales :** 1 case sur 16, soit $\frac{1}{16}$

C'est le rapport phénotypique caractéristique du dihybridisme : $9:3:3:1$.

### Pourquoi $9:3:3:1$, précisément

Ce rapport n'a rien d'arbitraire : c'est le **produit** des deux rapports monohybrides, obtenus indépendamment l'un de l'autre (comme au chapitre 4, chaque caractère seul donnerait $\frac{3}{4}:\frac{1}{4}$) :

- gris ET longues : $\frac{3}{4} \times \frac{3}{4} = \frac{9}{16}$
- gris ET vestigiales : $\frac{3}{4} \times \frac{1}{4} = \frac{3}{16}$
- noir ET longues : $\frac{1}{4} \times \frac{3}{4} = \frac{3}{16}$
- noir ET vestigiales : $\frac{1}{4} \times \frac{1}{4} = \frac{1}{16}$

**Vérification :** la somme des quatre classes doit valoir $1$ : $\frac{9}{16} + \frac{3}{16} + \frac{3}{16} + \frac{1}{16} = \frac{16}{16} = 1$. C'est cohérent.

### L'erreur classique à éviter ici

L'erreur la plus fréquente : **additionner** au lieu de **multiplier** les deux probabilités indépendantes. Un élève qui écrit $\frac{1}{4} + \frac{1}{4} = \frac{1}{2}$ pour la classe « noir, ailes vestigiales » a commis exactement l'erreur inverse de celle du chapitre 4 — combiner deux caractères indépendants demande une multiplication, jamais une addition, parce qu'on cherche la probabilité que les DEUX événements se réalisent ensemble.

Une deuxième précision, importante pour rester dans le cadre de cette leçon : le raisonnement entier repose sur la condition « gènes indépendants » (portés par des paires de chromosomes différentes). Si les deux gènes étaient portés par la **même** paire de chromosomes, leur transmission serait liée et le rapport $9:3:3:1$ ne se vérifierait plus — ce cas de figure (les gènes liés) sort du programme de cette leçon.

[[checkpoint:cp-r4-dihybridisme]]

---

## R5 — Le test-cross (croisement-test) : révéler un génotype caché

### Le problème que le test-cross résout

Le chapitre 2 a posé un piège qu'on a rencontré plusieurs fois depuis : un individu au phénotype dominant peut être homozygote ($G//G$) ou hétérozygote ($G//g$) — son apparence seule ne permet pas de trancher. Comment savoir, expérimentalement, lequel des deux génotypes il porte réellement ?

### Le principe : croiser avec un testeur homozygote récessif

La solution s'appelle le **test-cross** (ou **croisement-test**) : on croise l'individu de génotype inconnu avec un individu **homozygote récessif** pour le même caractère (par exemple $g//g$).

**Pourquoi ce choix précis de partenaire ?** Un homozygote récessif ne peut produire qu'**un seul type de gamète** (celui qui porte l'allèle récessif) — il n'apporte donc aucune variabilité au croisement. Toute variation observée dans le phénotype des descendants provient alors **entièrement** des gamètes produits par le parent qu'on teste. Le testeur agit comme un révélateur neutre : il ne fait qu'exposer, sans les brouiller, les gamètes de l'autre parent.

### Test-cross monohybride : les souris

Reprenons une souris grise de génotype inconnu ($G//G$ ou $G//g$ ?), croisée avec une souris blanche testeur ($g//g$).

- **Si la souris grise est homozygote ($G//G$) :** elle ne produit que des gamètes $G$. Tous les petits reçoivent $G$ du parent testé et $g$ du testeur : 100 % de la descendance est $G//g$, donc grise.
- **Si la souris grise est hétérozygote ($G//g$) :** elle produit des gamètes $G$ et $g$ à parts égales. La moitié des petits est $G//g$ (gris), l'autre moitié $g//g$ (blanc) : un rapport $\frac{1}{2}:\frac{1}{2}$.

[[figure:test-cross-deux-hypotheses]]

**Ce qu'il faut retenir :** le rapport phénotypique observé chez les descendants d'un test-cross est directement la signature des gamètes produits par le parent testé, puisque le testeur ne contribue aucune variation. Compter les phénotypes des petits, c'est littéralement lire le génotype caché du parent.

### Test-cross dihybride : les drosophiles

Le même principe s'étend à deux gènes. Une drosophile au phénotype gris/ailes longues, de génotype inconnu, est croisée avec un testeur double homozygote récessif ($c//c \, ; \, l//l$).

Si l'individu testé est un **double hétérozygote** ($C//c \, ; \, L//l$), il produit ses quatre gamètes $CL$, $Cl$, $cL$, $cl$ à raison de $\frac{1}{4}$ chacun (chapitre 5). Le testeur, homozygote pour les deux gènes, ne transmet que $cl$. La descendance se répartit donc en **quatre classes phénotypiques égales**, à $\frac{1}{4}$ chacune : gris-longues, gris-vestigiales, noir-longues, noir-vestigiales.

Observer ces quatre classes en proportions égales confirme **deux choses à la fois** : que l'individu testé est bien double hétérozygote, et que les deux gènes ségrégent bien indépendamment l'un de l'autre.

### L'erreur classique à éviter ici

Une erreur fréquente : croire qu'on pourrait tester le génotype avec un partenaire au phénotype dominant plutôt que récessif. Un tel partenaire pourrait lui-même être hétérozygote et produirait alors, lui aussi, deux types de gamètes — les résultats mélangeraient les contributions des deux parents, rendant la lecture impossible. Le testeur doit être homozygote récessif précisément pour supprimer toute ambiguïté de son côté.

[[checkpoint:cp-r5-test-cross]]

---

## R6 — Pour t'entraîner

### Exercice travaillé

**Énoncé.** Un éleveur possède une poule au plumage noir et à crête simple — les deux caractères étant dominants chez cette race — dont il ignore le génotype exact. Il la croise avec un coq récessif pour les deux caractères (plumage blanc, crête frisée). Sur 186 poussins obtenus, il compte : 49 noir-simple, 45 noir-frisée, 47 blanc-simple, 45 blanc-frisée.

Détermine le génotype de la poule pour ces deux caractères, et indique si les deux gènes se comportent comme des gènes indépendants.

**Raisonnement à voix haute.**

D'abord, nommons les allèles : $N$ (plumage noir, dominant) et $n$ (plumage blanc, récessif) ; $S$ (crête simple, dominante) et $s$ (crête frisée, récessive). Le coq, récessif pour les deux caractères, est donc $n//n \, ; \, s//s$.

**Ce qu'on reconnaît ici :** un partenaire homozygote récessif pour les deux gènes — c'est un test-cross dihybride. On sait, d'après le chapitre 6, que le rapport observé chez les poussins est directement la signature des gamètes produits par la poule.

Regardons les proportions observées sur les 186 poussins :

$$\text{noir-simple\,: } \frac{49}{186} \approx 0{,}26$$

$$\text{noir-frisée\,: } \frac{45}{186} \approx 0{,}24$$

$$\text{blanc-simple\,: } \frac{47}{186} \approx 0{,}25$$

$$\text{blanc-frisée\,: } \frac{45}{186} \approx 0{,}24$$

Les quatre classes sont sensiblement égales, chacune proche de $\frac{1}{4}$ (la valeur théorique exacte serait $\frac{186}{4} = 46{,}5$ poussins par classe — les petits écarts observés sont la variation normale d'un tirage réel, pas un signal d'erreur).

**Ce que révèle ce partage en quatre classes égales :** si la poule était homozygote pour l'un des deux gènes (par exemple $N//N$), elle ne pourrait transmettre que l'allèle $N$, et **aucun** poussin ne serait blanc — or on observe bien des poussins blancs, en proportion comparable aux noirs. Le même argument s'applique à la crête. La poule doit donc être **hétérozygote pour les deux gènes** : $N//n \, ; \, S//s$.

De plus, le fait que les quatre classes soient à peu près égales (et non regroupées en seulement deux classes majoritaires) confirme que les deux gènes se transmettent bien de façon **indépendante** : la poule produit ses quatre gamètes possibles ($NS$, $Ns$, $nS$, $ns$) en proportions comparables, exactement comme prévu par la troisième loi de Mendel.

**Vérification par l'échiquier :** testeur $n//n \, ; \, s//s$ ne transmettant que $ns$. Poule $N//n \, ; \, S//s$ transmettant $NS$, $Ns$, $nS$, $ns$ à $\frac{1}{4}$ chacun. Les quatre combinaisons possibles sont $N//n\,;\,S//s$ (noir-simple), $N//n\,;\,s//s$ (noir-frisée), $n//n\,;\,S//s$ (blanc-simple), $n//n\,;\,s//s$ (blanc-frisée) — chacune à $\frac{1}{4}$. C'est exactement la répartition observée dans les comptages.

### À toi de jouer

**Prompt 1.** Chez une variété de petit pois, la couleur jaune des graines (allèle $J$) est dominante sur la couleur verte (allèle $j$). On croise deux plants hétérozygotes ($J//j$) entre eux et on obtient 320 graines au total. Combien de ces graines attends-tu, en moyenne, avec un phénotype vert ? Construis l'échiquier de croisement pour justifier ta réponse.

**Prompt 2.** Chez le petit pois, la forme lisse des graines (allèle $R$) domine la forme ridée (allèle $r$), et la couleur jaune (allèle $J$) domine la couleur verte (allèle $j$) ; les deux gènes sont indépendants. On croise deux plants doubles hétérozygotes ($J//j \, ; \, R//r$) entre eux. Quelle fraction de la descendance attends-tu avec un phénotype vert ET ridé ? Et avec un phénotype jaune ET lisse ?
