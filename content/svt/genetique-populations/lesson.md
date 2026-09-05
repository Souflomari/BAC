# La génétique des populations

---

## R0 — Accroche : le porteur invisible

Voici un chiffre pour commencer. Dans une population donnée, on estime que de l'ordre de 1 personne sur 10 000 naît avec un albinisme (l'absence de pigmentation de la peau, des cheveux et des yeux) — une maladie génétique bien caractérisée, due à un allèle récessif porté par un gène autosomal.

Cette maladie ne s'exprime que chez les individus qui portent **deux** exemplaires de l'allèle responsable. Un individu qui n'en porte qu'un seul exemplaire est phénotypiquement normal — il ne sait même pas qu'il le porte.

**Avant de lire la suite, prends position.** À ton avis, dans cette même population, à quel point les porteurs sains (hétérozygotes, invisibles) sont-ils fréquents ? Choisis un ordre de grandeur avant de continuer : à peu près aussi rares que les malades (1 sur 10 000), dix fois plus fréquents (1 sur 1 000), ou bien plus fréquents encore (1 sur 100, 1 sur 50) ?

[[checkpoint:cp-r0-predict]]

Garde ta réponse en tête.

---

La réponse mesurée dans ce genre de population est saisissante : **environ 1 personne sur 50 est porteuse** de l'allèle albinos, sans jamais le savoir. C'est presque **200 fois plus fréquent** que la maladie elle-même.

Comment un seul chiffre observable — la fréquence des malades, 1 sur 10 000 — permet-il de calculer un chiffre qu'on n'observe jamais directement — la fréquence des porteurs, 1 sur 50 ? Ce n'est pas une estimation approximative ni une moyenne nationale mémorisée : c'est un calcul, qui repose sur un raisonnement précis, applicable à n'importe quelle maladie récessive et n'importe quelle population.

C'est exactement l'outil que cette leçon construit, pièce par pièce : passer d'un individu (ce que tu savais déjà faire depuis les deux chapitres précédents) à une **population entière**, en donnant un sens précis et calculable à des mots comme « fréquence d'un allèle ». À la fin, on referme cette question, et le 1 sur 50 n'aura plus rien de mystérieux.

---

## R1 — La population, son pool génique, et ce que veut vraiment dire une fréquence

### Pourquoi on change d'échelle

Dans les deux chapitres précédents, l'unité d'étude était l'individu ou la famille : un génotype précis, un arbre généalogique précis. Ici, l'unité d'étude change : c'est la **population** — l'ensemble des individus d'une même espèce, vivant dans une même aire géographique, et interféconds (capables de se reproduire entre eux).

**Pourquoi ce changement d'échelle est nécessaire, et pas seulement une curiosité :** un individu ne change jamais de génotype après sa conception — il naît A//A, A//a ou a//a, et le reste toute sa vie. Un individu, à titre individuel, n'évolue pas génétiquement. Ce qui PEUT changer, génération après génération, c'est la composition d'une population entière — quelle proportion porte quel allèle. C'est pour ça que l'évolution génétique se définit et se mesure au niveau de la population, jamais au niveau d'un individu isolé.

Ce que porte une population, collectivement, s'appelle son **pool génique** (ou patrimoine héréditaire commun) : l'ensemble de tous les allèles, de tous les gènes, portés par tous les individus de la population, à un instant donné. Chaque nouvel individu ne fait qu'emprunter deux allèles à ce pool commun (un de chaque parent) ; il n'en est jamais le seul propriétaire.

### Un exemple pour construire les outils

Prenons une population de 1 000 escargots d'une même espèce, pour un gène qui contrôle la couleur de la coquille : l'allèle $B$ (coquille brune) est dominant, l'allèle $b$ (coquille claire) est récessif. On a pu déterminer le génotype exact de chacun des 1 000 individus. Voici le décompte :

| Génotype | Effectif | Fréquence génotypique |
|--|--|--|
| $B//B$ | 550 | $f(B//B) = 550/1\,000 = 0{,}55$ |
| $B//b$ | 300 | $f(B//b) = 300/1\,000 = 0{,}30$ |
| $b//b$ | 150 | $f(b//b) = 150/1\,000 = 0{,}15$ |
| **Total** | **1 000** | $0{,}55 + 0{,}30 + 0{,}15 = 1{,}00$ |

La **fréquence génotypique**, c'est exactement ça : la proportion d'individus qui portent tel ou tel génotype. Rien de nouveau par rapport aux chapitres précédents — c'est un simple décompte par tête.

### La fréquence allélique : ce qu'elle compte vraiment

Voici la question qui va changer la façon de compter : quelle est la fréquence de l'allèle $B$ dans cette population ? Pas la fréquence des individus $B//B$ — la fréquence de l'allèle $B$ **lui-même**, comptabilisé partout où il se trouve, y compris caché dans les hétérozygotes.

Chaque escargot est diploïde : il porte exactement deux exemplaires du gène. Sur 1 000 escargots, il y a donc $2 \times 1\,000 = 2\,000$ exemplaires du gène en circulation dans la population — c'est le vrai dénominateur d'une fréquence allélique, pas 1 000.

Comptons maintenant les exemplaires de l'allèle $B$, un par un, individu par individu :
- Un escargot $B//B$ porte **deux** exemplaires de $B$.
- Un escargot $B//b$ porte **un seul** exemplaire de $B$ (l'autre est $b$).
- Un escargot $b//b$ n'en porte **aucun**.

Le nombre total d'exemplaires de $B$ dans la population est donc :

$$\text{compte}(B) = 2 \times n_{B//B} + n_{B//b} = 2 \times 550 + 300 = 1\,400$$

Et la **fréquence allélique** de $B$, notée $p$, est ce compte rapporté au nombre total d'exemplaires du gène dans la population :

$$p = \frac{\text{compte}(B)}{2N} = \frac{1\,400}{2\,000} = 0{,}70$$

On fait exactement le même raisonnement pour l'allèle récessif $b$, noté $q$ :

$$\text{compte}(b) = 2 \times n_{b//b} + n_{B//b} = 2 \times 150 + 300 = 600$$

$$q = \frac{\text{compte}(b)}{2N} = \frac{600}{2\,000} = 0{,}30$$

**Ce qu'on cherche ici, et pourquoi ce geste :** une fréquence allélique n'est pas une fréquence d'individus — c'est une fréquence de copies de gène. Un hétérozygote compte pour une moitié dans chaque camp, jamais pour un individu entier dans un seul camp. C'est ce comptage-là, et pas un autre, qui donne le sens exact de $p$ et $q$.

### Pourquoi $p + q = 1$ n'est pas une coïncidence

Additionnons les deux comptages d'allèles :

$$\text{compte}(B) + \text{compte}(b) = \big(2\,n_{B//B} + n_{B//b}\big) + \big(2\,n_{b//b} + n_{B//b}\big)$$

Regroupons les termes semblables :

$$\text{compte}(B) + \text{compte}(b) = 2\,n_{B//B} + 2\,n_{B//b} + 2\,n_{b//b}$$

Or $n_{B//B} + n_{B//b} + n_{b//b} = N$ — chaque escargot appartient à un seul des trois génotypes, sans exception et sans double compte — donc :

$$\text{compte}(B) + \text{compte}(b) = 2N$$

En divisant les deux membres par $2N$ :

$$p + q = \frac{\text{compte}(B) + \text{compte}(b)}{2N} = \frac{2N}{2N} = 1$$

**$p + q = 1$ n'est donc pas une propriété biologique de tel ou tel gène : c'est une conséquence arithmétique directe du fait qu'il n'existe que deux allèles possibles pour ce gène**, et que chaque exemplaire du gène est forcément l'un ou l'autre. Dès qu'un gène a exactement deux allèles, leurs fréquences se complètent à 1.

### Arrête-toi — fréquence allélique et fréquence génotypique ne sont PAS le même nombre

C'est l'erreur la plus fréquente de tout ce chapitre, alors regardons-la en face. Dans notre population d'escargots :

$$p = 0{,}70 \qquad \text{mais} \qquad f(B//B) = 0{,}55$$

Ce sont deux nombres différents, et ce n'est pas une erreur d'arrondi : ils mesurent deux choses différentes. $f(B//B) = 0{,}55$ compte des **individus** — la proportion d'escargots qui sont homozygotes $B//B$. $p = 0{,}70$ compte des **allèles** — la proportion de tous les exemplaires du gène, dans toute la population, qui sont $B$. Le deuxième nombre est plus grand parce qu'il inclut aussi les exemplaires de $B$ cachés dans les 300 hétérozygotes — de la matière génétique invisible au recensement génotypique brut.

On peut d'ailleurs retrouver $p$ à partir des fréquences génotypiques directement, sans repasser par les effectifs bruts — c'est la même idée, exprimée autrement :

$$p = f(B//B) + \frac{1}{2}\,f(B//b) = 0{,}55 + \frac{1}{2}(0{,}30) = 0{,}55 + 0{,}15 = 0{,}70$$

Le terme $\frac{1}{2}f(B//b)$, c'est exactement la part d'allèle $B$ qui se cache dans les hétérozygotes — la moitié de leurs deux allèles, ni plus ni moins.

**Le réflexe à corriger :** si on te donne une fréquence génotypique et qu'on te demande une fréquence allélique (ou l'inverse), ce n'est jamais le même nombre — sauf dans le cas particulier, très rare, où toute la population serait homozygote pour un seul allèle. Vérifie toujours : est-ce qu'on parle d'individus, ou d'exemplaires de gène ?

[[checkpoint:cp-r1-frequences]]

[[figure:comptage-alleles]]

---

## R2 — Le modèle de Hardy-Weinberg : d'où vient $p^2 + 2pq + q^2 = 1$

### La question qu'on se pose maintenant

On connaît $p$ et $q$ pour la génération actuelle. Question suivante : si cette population se reproduit, à quoi doit-on s'attendre pour les génotypes de la génération **suivante** ? Peut-on prédire $f(B//B)$, $f(B//b)$ et $f(b//b)$ à l'avance, sans attendre de les recompter ?

Oui — à condition d'imaginer correctement comment se forme un nouvel individu.

### Le pool génique comme une urne géante

Imagine tout le pool génique de la population — les $2\,000$ exemplaires du gène, portés par tous les escargots — comme une immense urne de gamètes : $70\,\%$ de gamètes porteurs de $B$, $30\,\%$ porteurs de $b$ (ce sont exactement $p$ et $q$). Si les accouplements se font **au hasard** — c'est-à-dire que n'importe quel gamète a autant de chances de s'unir avec n'importe quel autre gamète de la population, sans aucune préférence liée au génotype — alors former un nouvel individu revient à tirer **deux gamètes indépendants** dans cette urne, un venant de chaque parent.

C'est exactement le même geste que l'échiquier de croisement des chapitres précédents — sauf qu'au lieu de connaître les deux parents précis, on tire dans le pool entier de la population. Construisons l'échiquier :

| | Gamète $B$ (fréquence $p$) | Gamète $b$ (fréquence $q$) |
|--|--|--|
| **Gamète $B$ (fréquence $p$)** | $B//B$ — probabilité $p \times p = p^2$ | $B//b$ — probabilité $p \times q = pq$ |
| **Gamète $b$ (fréquence $q$)** | $B//b$ — probabilité $q \times p = qp$ | $b//b$ — probabilité $q \times q = q^2$ |

**Pourquoi on multiplie :** les deux tirages (le gamète venant d'un parent, le gamète venant de l'autre) sont indépendants — le hasard qui a produit l'un n'influence pas l'autre. Pour que les deux événements indépendants se réalisent ensemble, on multiplie leurs probabilités — exactement le même principe que dans l'échiquier F1 × F1 du chapitre sur les lois de Mendel.

Les deux cases $B//b$ (une fois $p \times q$, une fois $q \times p$) sont le même génotype, obtenu par deux chemins différents (le $B$ vient de la mère ou du père) — on les additionne :

$$f(B//b) = pq + qp = 2pq$$

### La loi de Hardy-Weinberg

En rassemblant les trois cases, la génération suivante devrait présenter les proportions génotypiques :

$$f(B//B) = p^2 \qquad f(B//b) = 2pq \qquad f(b//b) = q^2$$

Et comme ces trois cases couvrent tous les cas possibles, sans en oublier aucun :

$$p^2 + 2pq + q^2 = 1$$

[[figure:echiquier-gametes]]

On peut aussi retrouver ce résultat par un pur calcul algébrique, comme vérification de cohérence : puisque $p + q = 1$ (chapitre 2), élevons les deux membres au carré :

$$(p+q)^2 = 1^2 = 1$$

Et l'identité remarquable $(p+q)^2 = p^2 + 2pq + q^2$ donne exactement la même somme. Les deux chemins — l'échiquier des gamètes et l'algèbre — se rejoignent : ce n'est pas un hasard, l'échiquier n'est jamais qu'une image concrète de ce carré.

**Application avec nos escargots** ($p = 0{,}70$, $q = 0{,}30$) : la génération suivante devrait présenter

$$f(B//B) = p^2 = 0{,}70^2 = 0{,}49 \qquad f(B//b) = 2pq = 2 \times 0{,}70 \times 0{,}30 = 0{,}42 \qquad f(b//b) = q^2 = 0{,}30^2 = 0{,}09$$

Vérification : $0{,}49 + 0{,}42 + 0{,}09 = 1{,}00$. Cohérent.

### Pourquoi on parle d'un ÉQUILIBRE

Une question mérite d'être posée avant d'aller plus loin : si la génération suivante est bien à ces proportions ($p^2$, $2pq$, $q^2$), quelle est SA fréquence allélique, $p'$ ? Est-ce qu'elle a bougé ?

Reprenons la formule du chapitre 2, appliquée à la génération suivante :

$$p' = f(B//B)_{\text{suivante}} + \frac{1}{2}\,f(B//b)_{\text{suivante}}$$

Remplaçons par les proportions de Hardy-Weinberg qu'on vient d'établir :

$$p' = p^2 + \frac{1}{2}(2pq)$$

Simplifions :

$$p' = p^2 + pq$$

Factorisons par $p$ :

$$p' = p(p + q)$$

Et $p + q = 1$ (chapitre 2), donc :

$$p' = p$$

**La fréquence allélique n'a pas bougé.** Elle vaut exactement ce qu'elle valait avant. C'est ça, un équilibre : une fois que les proportions $p^2$, $2pq$, $q^2$ sont atteintes, et tant que rien ne vient les perturber, elles se maintiennent **indéfiniment**, génération après génération, sans dérive vers l'un ou l'autre allèle. On y reviendra très concrètement au chapitre 5 : ça veut dire qu'un allèle récessif rare ne s'efface pas tout seul avec le temps.

### Ce que cette prédiction suppose — et qu'on n'a pas encore vérifié

Remarque bien ce qu'on a supposé en construisant l'échiquier : que les gamètes s'unissent **au hasard**, dans un pool suffisamment grand pour que les proportions $p$ et $q$ restent stables d'un tirage à l'autre. Rien ne garantit encore que la population des escargots vérifie réellement ces conditions. C'est précisément la question du prochain chapitre.

[[checkpoint:cp-r2-hw]]

---

## R3 — Les conditions de Hardy-Weinberg : quand le modèle s'applique (et quand il ment)

### Les quatre conditions, et pourquoi chacune est nécessaire

La prédiction $p^2 + 2pq + q^2 = 1$ du chapitre 3 n'est pas une loi universelle qui s'applique automatiquement à toute population : elle est vraie **seulement si** quatre conditions sont réunies. Chacune correspond exactement à une étape du raisonnement du chapitre 3 — si elle manque, cette étape s'effondre.

- **Population de grand effectif.** L'échiquier du chapitre 3 suppose qu'on tire dans une urne assez grande pour que les proportions réelles des tirages collent aux probabilités $p$ et $q$. Dans une toute petite population, un tirage de quelques dizaines de gamètes seulement peut s'écarter du hasard « en moyenne » par pur effet d'échantillonnage — exactement comme lancer une pièce 10 fois peut donner 7 piles sans que la pièce soit truquée. Cet écart aléatoire, dans une petite population, porte un nom : la **dérive génétique** (chapitre 6).
- **Panmixie** (croisements au hasard). L'échiquier suppose que n'importe quel gamète peut s'unir avec n'importe quel autre, sans préférence liée au génotype. Si les individus choisissent leurs partenaires selon leur propre génotype ou leur phénotype (accouplement non aléatoire), ou si la population est en réalité coupée en plusieurs sous-groupes qui ne se mélangent pas, le tirage « $p \times q$ » n'a plus le droit d'être fait : ce n'est plus un tirage indépendant dans un pool unique.
- **Absence de migration.** Le calcul part du principe que $p$ et $q$ restent ceux du pool génique de cette population, entre une génération et la suivante. Si des individus arrivent d'une autre population (aux fréquences alléliques différentes) ou en repartent, le pool génique change directement de composition — pas par le jeu des croisements, mais par l'arrivée ou le départ d'allèles entiers.
- **Absence de mutation.** Le calcul suppose que $B$ reste $B$ et $b$ reste $b$ d'une génération à l'autre. Une mutation qui convertit un allèle en un autre change $p$ et $q$ directement, à la source, avant même qu'un seul croisement n'ait eu lieu.
- **Absence de sélection naturelle.** L'échiquier suppose que les trois génotypes ont exactement les mêmes chances de survivre et de se reproduire. Si l'un des génotypes survit ou se reproduit moins bien que les autres, les proportions qui arrivent réellement à l'âge adulte et se reproduisent ne sont plus $p^2$, $2pq$, $q^2$ — et les allèles transmis à la génération suivante non plus.

### Confrontation : nos escargots vérifient-ils vraiment ces conditions ?

Reviens sur les deux résultats qu'on a maintenant sous les yeux, pour la même population d'escargots :

| | Observé (chapitre 2, recensement réel) | Prédit par Hardy-Weinberg (chapitre 3, à partir de $p=0{,}70$ et $q=0{,}30$) |
|--|--|--|
| $f(B//B)$ | $0{,}55$ | $0{,}49$ |
| $f(B//b)$ | $0{,}30$ | $0{,}42$ |
| $f(b//b)$ | $0{,}15$ | $0{,}09$ |

L'écart est net, et il n'est pas dû à une erreur de calcul — les deux calculs, chapitres 2 et 3, sont corrects chacun dans leur registre. Ce qu'il révèle, c'est qu'au moins une des quatre conditions n'est probablement pas respectée dans cette population réelle.

**Ce qu'on cherche ici, et pourquoi ce geste :** regarde la direction de l'écart, elle est informative. Les DEUX classes homozygotes sont en EXCÈS par rapport à la prédiction ($0{,}55 > 0{,}49$ et $0{,}15 > 0{,}09$), et la classe hétérozygote est en DÉFICIT ($0{,}30 < 0{,}42$). C'est exactement la signature d'un manque de panmixie — par exemple des escargots qui s'accouplent préférentiellement avec des partenaires de coquille semblable, ou une population en réalité scindée en plusieurs poches locales qui échangent peu de gamètes entre elles. Ni une mutation, ni une migration, ni une sélection ne produisent typiquement ce motif précis « excès des deux homozygotes, déficit de l'hétérozygote » — c'est la signature propre d'un défaut de brassage aléatoire.

### L'erreur classique à éviter ici

L'erreur la plus fréquente à ce stade : appliquer $p^2 + 2pq + q^2 = 1$ à n'importe quelle population, dès qu'on connaît $p$ et $q$, sans jamais se demander si les quatre conditions sont réunies. La formule n'est pas une identité magique valable partout — c'est la conséquence d'un modèle précis (union aléatoire des gamètes, dans un grand pool stable). Avant d'utiliser cette formule sur une population réelle, la bonne question n'est pas seulement « quels sont $p$ et $q$ ? » mais aussi « cette population a-t-elle une raison de ne PAS vérifier une des quatre conditions ? ». On y reviendra, sous un autre angle, au chapitre 6 : chacune de ces conditions, quand elle est violée, devient un moteur d'évolution.

### Vérification rapide

Une population de petite taille, isolée sur une île, montre des fréquences génotypiques qui s'écartent fortement de $p^2$, $2pq$, $q^2$ d'une génération à l'autre, sans qu'aucune maladie ni aucun avantage de survie ne soit en cause, et sans échange d'individus avec l'extérieur. Quelle condition manque le plus probablement ? (Réponse : le grand effectif — c'est la signature de la dérive génétique, détaillée au chapitre 6.)

[[checkpoint:cp-r3-conditions]]

---

## R4 — Remonter des malades aux porteurs : la méthode de calcul

### Le problème pratique : on ne voit jamais $q$ directement

Pour nos escargots, on avait la chance de connaître le génotype exact de chaque individu (par un test direct). Pour une vraie maladie génétique récessive chez l'être humain, ce luxe n'existe presque jamais : un individu $A//A$ (sain, homozygote) et un individu $A//a$ (sain, porteur) ont **exactement le même phénotype**. On ne peut pas les distinguer par simple observation. La seule catégorie qu'on peut compter directement, sans ambiguïté, c'est celle des malades — les $a//a$, puisque le phénotype malade révèle sans erreur possible le génotype homozygote récessif.

**Ce qu'on cherche ici, et pourquoi ce geste :** on va donc partir de la SEULE fréquence qu'on peut réellement observer — celle des malades, $f(a//a)$ — et remonter jusqu'à $q$, puis $p$, puis la fréquence des porteurs. Cette remontée n'est valide que **si on suppose que la population vérifie les conditions de Hardy-Weinberg du chapitre 4** — sans cette hypothèse, l'égalité $f(a//a) = q^2$ qu'on va utiliser n'a aucune raison d'être vraie, comme le chapitre 4 vient de le montrer avec les escargots. C'est une hypothèse de travail qu'il faut toujours énoncer, jamais un fait acquis d'avance.

### La méthode, à rebours

Sous hypothèse de Hardy-Weinberg, $f(a//a) = q^2$ — c'est directement la case « $b//b$ » du chapitre 3, transposée à notre maladie. Puisque $f(a//a)$ est observable directement (les malades sont reconnaissables), on inverse :

$$q = \sqrt{f(a//a)}$$

Puis, puisque $p + q = 1$ :

$$p = 1 - q$$

Et enfin, la fréquence des porteurs sains (hétérozygotes) :

$$f(A//a) = 2pq$$

### Exemple travaillé : fermer la boucle de l'albinisme

Reprenons la question du chapitre 1. La fréquence des malades albinos, dans cette population, est $f(a//a) = 1/10\,000 = 0{,}0001$.

**Étape 1 — Remonter à $q$ :**

$$q = \sqrt{0{,}0001} = 0{,}01$$

**Étape 2 — En déduire $p$ :**

$$p = 1 - 0{,}01 = 0{,}99$$

**Étape 3 — Calculer la fréquence des porteurs :**

$$f(A//a) = 2pq = 2 \times 0{,}99 \times 0{,}01 = 0{,}0198$$

Soit environ $0{,}02$, c'est-à-dire environ **1 personne sur 50** (plus précisément 1 sur 50,5). Le rapport entre cette fréquence et celle des malades vaut $0{,}0198 / 0{,}0001 \approx 198$ : les porteurs sont bien de l'ordre de **200 fois plus fréquents** que les malades, exactement le chiffre annoncé au chapitre 1.

### Pourquoi l'écart est si grand — l'intuition derrière le calcul

Ce résultat surprend presque tout le monde à la première rencontre, et pourtant il n'a rien de mystérieux une fois qu'on regarde le mécanisme : $q$ lui-même est déjà petit ($0{,}01$), et $f(a//a) = q^2$ est le carré d'un petit nombre — donc un nombre BEAUCOUP plus petit encore ($0{,}0001$). Passer de $q$ à $q^2$ écrase la fréquence par un facteur $q$ lui-même (ici, par $100$). À l'inverse, $2pq$ ne s'écrase pas de la même façon : avec $p$ proche de $1$, $2pq \approx 2q$ — le facteur $2$ ne compense qu'une petite partie de l'écrasement du carré. C'est cette asymétrie entre « élever au carré » et « multiplier par 2 » qui explique l'écart énorme entre malades et porteurs, dès que l'allèle récessif est rare.

### Arrête-toi — le récessif ne disparaît pas de lui-même

Une idée fausse, et tenace : penser qu'un allèle récessif, rare à l'état homozygote (peu de malades visibles), est en train de disparaître progressivement de la population, génération après génération, un peu comme s'il s'« épuisait ». Teste cette idée avec ce qu'on vient d'établir au chapitre 3 : sous les conditions de Hardy-Weinberg, on a démontré que $p' = p$ — la fréquence allélique ne bouge PAS d'une génération à l'autre, quelle que soit sa valeur de départ, tant que rien ne la perturbe.

L'explication tient dans le calcul qu'on vient de faire : la quasi-totalité des exemplaires de l'allèle $a$ ($99\,\%$ ou plus, dans notre exemple) est cachée dans des porteurs hétérozygotes parfaitement sains — pas dans les rares malades. Ces porteurs se reproduisent tout aussi normalement que n'importe qui, et transmettent leur exemplaire de $a$ exactement comme n'importe quel autre allèle. Rien, dans le simple fait d'être rare à l'état homozygote, ne réduit les chances de transmission de l'allèle — il reste protégé, invisible, indéfiniment, tant qu'aucune sélection ne vient réellement défavoriser ceux qui le portent.

[[checkpoint:cp-r4-porteurs]]

---

## R5 — Ce qui fait évoluer les fréquences alléliques

### Hardy-Weinberg décrit ce qui se passe quand rien ne se passe

Regarde en arrière : le modèle du chapitre 3 décrit une population où les fréquences alléliques restent parfaitement figées, génération après génération. C'est précisément pour ça que ce modèle est utile : il donne une référence, un état « neutre », par rapport auquel repérer un vrai changement. Or on sait, par ailleurs, que les populations réelles évoluent — les fréquences alléliques changent réellement au cours du temps. Ce changement n'est possible QUE si l'une des quatre conditions du chapitre 4 est violée. Chaque violation porte un nom, et constitue un véritable **facteur d'évolution**.

**Définition à retenir :** au niveau d'une population, évoluer génétiquement, c'est précisément voir $p$ et/ou $q$ changer d'une génération à l'autre. Pas de changement de fréquence, pas d'évolution génétique — quel que soit le nombre de naissances.

### Mutation

La mutation convertit un allèle en un autre (par exemple $A$ en $a$) au niveau de l'ADN, indépendamment de tout croisement. C'est la SEULE source qui crée réellement de la nouveauté génétique — les trois autres facteurs ne font que redistribuer des allèles déjà existants dans la population, jamais en inventer un nouveau. Une mutation isolée déplace $p$ et $q$ d'une quantité minuscule à chaque génération, mais cet effet s'accumule sur un grand nombre de générations.

### Sélection naturelle

Quand les trois génotypes n'ont PAS les mêmes chances de survivre jusqu'à l'âge de la reproduction, ou de se reproduire une fois adultes, la condition « absence de sélection » du chapitre 4 tombe : les proportions qui participent réellement à la génération suivante ne sont plus $p^2$, $2pq$, $q^2$, et les fréquences alléliques changent, génération après génération, dans une direction précise et répétable — c'est le seul des quatre facteurs qui n'est pas un pur hasard, mais qui pousse la population vers les génotypes les mieux adaptés à son environnement.

Reprends l'exemple d'une maladie récessive mortelle avant l'âge de la reproduction : les $a//a$ sont éliminés à chaque génération, sans exception. Est-ce que ça veut dire que $a$ disparaît vite ? Non — et c'est le prolongement direct de l'« Arrête-toi » du chapitre 5 : la sélection n'atteint que les homozygotes $a//a$, jamais les hétérozygotes $A//a$, où l'allèle reste protégé et continue à se transmettre normalement. Comme la quasi-totalité des exemplaires de $a$ vit cachée dans des porteurs sains (chapitre 5), l'élimination des seuls $a//a$ ne mord que sur une toute petite fraction du stock total de l'allèle à chaque génération. La fréquence $q$ décline bien, réellement, sous une vraie sélection — mais très lentement, jamais en quelques générations, et de plus en plus lentement à mesure que $q$ devient petit (puisque $q^2$ s'écrase encore plus vite que $q$).

### Migration

L'arrivée ou le départ d'individus change directement la composition du pool génique local, en y ajoutant ou en lui retirant des allèles portés par des individus venus d'ailleurs — sans qu'aucun croisement local n'ait eu lieu. Plus les populations en contact ont des fréquences alléliques différentes, plus la migration produit un changement rapide et net.

### Dérive génétique

Dans une population de petit effectif, les proportions réellement transmises d'une génération à l'autre peuvent s'écarter de $p$ et $q$ par pur effet d'échantillonnage aléatoire — comme un petit nombre de tirages qui, par hasard, ne reflète pas exactement les proportions de l'urne. Cet écart n'a AUCUNE direction préférée (contrairement à la sélection) : il peut aussi bien faire monter que descendre la fréquence d'un allèle, d'une génération à l'autre, par pur hasard. Plus la population est petite, plus cet effet est fort — c'est pour ça que le grand effectif est l'une des quatre conditions du chapitre 4. Poussée à l'extrême sur de nombreuses générations, la dérive peut même faire disparaître complètement un allèle (par pur hasard, même sans aucun désavantage) ou au contraire le généraliser à toute la population.

### Vérification rapide

Une espèce de plantes voit une partie de sa population coloniser une nouvelle île, à partir d'un tout petit nombre de graines fondatrices. Quelques générations plus tard, la fréquence d'un allèle, sur cette île, est très différente de celle de la population d'origine, sans qu'aucune maladie ni avantage de survie n'ait pu être identifié. Quel facteur d'évolution est le plus probablement en cause ? (Réponse : la dérive génétique, favorisée ici par le tout petit effectif fondateur — un cas particulier qu'on appelle parfois « effet fondateur », mais qui reste, dans son mécanisme, une dérive génétique ordinaire.)

[[checkpoint:cp-r5-evolution]]

---

## R6 — Pour t'entraîner

### Exercice travaillé

**Énoncé.** La mucoviscidose est une maladie génétique récessive autosomale. Dans une population donnée, on estime que la fréquence des naissances atteintes est de l'ordre de 1 sur 2 500. On note $M$ l'allèle normal (dominant) et $m$ l'allèle mucoviscidose (récessif).

1. Justifie pourquoi on peut directement écrire $f(m//m) = 1/2\,500$, sans avoir besoin de tester génétiquement toute la population.
2. Calcule la fréquence de l'allèle $m$, notée $q$, puis celle de l'allèle $M$, notée $p$.
3. Calcule la fréquence des porteurs sains (hétérozygotes $M//m$).
4. Sur une ville de 500 000 habitants, combien de personnes sont, selon ce calcul, porteuses saines de l'allèle $m$ ?
5. Cite les conditions qui doivent être supposées vérifiées pour que ce calcul soit valable.

**Raisonnement à voix haute.**

**1.** Le phénotype malade est entièrement déterminé par le génotype $m//m$ : on ne peut être malade que si on est homozygote récessif, et tout homozygote récessif est malade. Il n'y a donc aucune ambiguïté entre phénotype observé et génotype sous-jacent, contrairement à un individu sain ($M//M$ ou $M//m$, indiscernables à l'œil). La fréquence des malades observée dans la population EST, directement, la fréquence génotypique $f(m//m)$.

**2.** Sous hypothèse de Hardy-Weinberg, $f(m//m) = q^2$, donc :

$$q = \sqrt{f(m//m)} = \sqrt{\frac{1}{2\,500}} = \frac{1}{50} = 0{,}02$$

Et puisque $p + q = 1$ :

$$p = 1 - 0{,}02 = 0{,}98$$

**3.** La fréquence des porteurs sains :

$$f(M//m) = 2pq = 2 \times 0{,}98 \times 0{,}02 = 0{,}0392$$

Soit environ $3{,}9\,\%$ de la population — un peu moins de 1 personne sur 25.

**4.** Sur 500 000 habitants :

$$500\,000 \times 0{,}0392 = 19\,600 \text{ personnes porteuses}$$

À comparer aux $500\,000 / 2\,500 = 200$ malades attendus sur la même population : les porteurs sont, ici aussi, bien plus nombreux (environ 98 fois plus) que les malades.

**5.** Ce calcul suppose que la population vérifie les quatre conditions de Hardy-Weinberg (chapitre 4) : grand effectif, panmixie, absence de migration, de mutation et de sélection naturelle affectant ce gène. Si l'une d'elles est fortement violée — par exemple une sélection contre les homozygotes malades, ou une population très réduite et isolée — la relation $f(m//m) = q^2$ n'a plus de raison d'être exacte, et le calcul de $q$ à partir d'elle devient approximatif, voire faux.

### À toi de jouer

**Prompt 1.** Dans une population de grand effectif, en équilibre de Hardy-Weinberg, on observe que $4\,\%$ des individus présentent un phénotype récessif pour un gène donné (allèles $R$ dominant, $r$ récessif). Calcule $q$, puis $p$, puis la fréquence des hétérozygotes $R//r$. Sur une population de 250 000 individus, combien sont attendus comme porteurs hétérozygotes ?

**Prompt 2.** Sur une île isolée, une population d'oiseaux ne compte que 30 couples reproducteurs. La fréquence de l'allèle $a$ y passe de $0{,}20$ à $0{,}35$ en une seule génération, sans qu'aucune maladie ni aucun avantage de survie n'ait été observé pour l'un ou l'autre génotype, et sans qu'aucun individu n'ait migré vers l'île ou n'en soit réparti. Quel facteur d'évolution est le plus probablement en cause ? Justifie ta réponse en citant précisément la condition de Hardy-Weinberg qui n'est pas respectée ici.
