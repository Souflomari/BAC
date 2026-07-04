# Contrôle par un réactif ou par catalyse

---

## R0 — Accroche : deux leviers, une seule question à trancher d'abord

Reprends la réaction qui t'a servi de fil rouge dans les deux chapitres précédents : les ions peroxodisulfate $S_2O_8^{2-}$ et les ions iodure $I^-$, qui réagissent lentement pour donner des ions sulfate et du diiode $I_2$ :

$$S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$$

Imagine un chimiste qui a besoin, pour la suite de son travail, d'obtenir davantage de diiode à partir d'un mélange comme celui-ci - et si possible, plus vite. Deux élèves, Amine et Sofia, lui soumettent chacun une idée.

Amine propose d'augmenter, avant de mélanger, la quantité initiale d'ions peroxodisulfate.

Sofia propose plutôt de ne toucher à aucune quantité, mais d'ajouter une petite quantité d'ions fer (III), $Fe^{3+}$, qu'elle a repérés dans un manuel comme catalyseur de cette réaction.

Avant de lire la suite, prends position, en une phrase pour chacune des deux propositions : est-ce que le geste d'Amine va changer la quantité FINALE de diiode obtenue ? Et celui de Sofia ? Ou est-ce que les deux reviennent, au fond, exactement au même effet - juste deux façons différentes d'aider la réaction ?

Beaucoup d'élèves répondent que les deux propositions doivent faire à peu près la même chose : ajouter plus de réactif ou ajouter un catalyseur, dans les deux cas on donne un coup de pouce à la réaction, donc dans les deux cas on doit obtenir plus de produit. C'est une prédiction naturelle - et elle est fausse pour l'une des deux propositions, entièrement vraie pour l'autre. Cette leçon te donne de quoi trancher, avec certitude, laquelle est laquelle - et pourquoi.

---

## R1 — Le mécanisme : le réactif limitant fixe l'avancement final

### Rappel express : le tableau d'avancement

Tu as déjà construit un tableau d'avancement, au chapitre suivi temporel d'une transformation, pour calculer un avancement final $x_{max}$. Reviens sur ce geste, en insistant cette fois sur ce qui, précisément, fixe cette valeur.

Pour une transformation totale d'équation $aA + bB \rightarrow cC + dD$, le tableau donne, à l'avancement $x$ :

| | $A$ | $B$ | $C$ | $D$ |
|---|---|---|---|---|
| État initial | $n_0(A)$ | $n_0(B)$ | $0$ | $0$ |
| À l'avancement $x$ | $n_0(A) - ax$ | $n_0(B) - bx$ | $cx$ | $dx$ |

L'avancement ne peut pas grandir indéfiniment : dès que la quantité d'un réactif atteint zéro, la réaction s'arrête - il n'y a plus assez de cette espèce pour continuer. Le réactif qui s'annule EN PREMIER, quand $x$ augmente, s'appelle le **réactif limitant**. Pour le repérer, on compare, pour chaque réactif, le rapport de sa quantité initiale à son coefficient stoechiométrique - le plus petit de ces deux rapports désigne le réactif limitant, et fixe directement l'avancement final :

$$x_{max} = \min\left(\frac{n_0(A)}{a}, \frac{n_0(B)}{b}\right)$$

*Ce qu'on cherche ici, et pourquoi ce geste :* on ne compare jamais les quantités initiales brutes entre elles - on divise chacune par SON coefficient stoechiométrique avant de comparer. C'est ce rapport, pas la quantité brute, qui dit combien de fois la réaction peut consommer entièrement chaque réactif.

### Exemple travaillé : reprendre le fil rouge

Reprends les quantités de l'expérience du chapitre précédent : $n_0(S_2O_8^{2-}) = 5{,}0\ \text{mmol}$, $n_0(I^-) = 40\ \text{mmol}$ (l'iodure est en large excès), dans un volume $V = 100\ \text{mL}$ constant.

$$\frac{n_0(S_2O_8^{2-})}{1} = 5{,}0\ \text{mmol}$$

$$\frac{n_0(I^-)}{2} = \frac{40}{2} = 20\ \text{mmol}$$

Le plus petit des deux rapports est $5{,}0\ \text{mmol}$, celui de $S_2O_8^{2-}$ : c'est donc lui le réactif limitant, et :

$$x_{max} = 5{,}0\ \text{mmol}$$

C'est exactement la valeur que tu avais trouvée au chapitre précédent - rien de nouveau ici, seulement le geste posé plus consciemment : comparer des rapports, pas des quantités brutes.

### Et si on change la quantité initiale du réactif limitant ?

Voici la question qui nous intéresse vraiment dans ce chapitre : que se passe-t-il sur $x_{max}$ si on double la quantité initiale de $S_2O_8^{2-}$, sans toucher à celle d'iodure ? Reprends le même calcul avec $n_0'(S_2O_8^{2-}) = 10{,}0\ \text{mmol}$, $n_0(I^-) = 40\ \text{mmol}$ inchangé :

$$\frac{n_0'(S_2O_8^{2-})}{1} = 10{,}0\ \text{mmol}$$

$$\frac{n_0(I^-)}{2} = 20\ \text{mmol}$$

$S_2O_8^{2-}$ reste le réactif limitant (son rapport, $10{,}0\ \text{mmol}$, reste le plus petit), donc :

$$x_{max}' = 10{,}0\ \text{mmol}$$

L'avancement final a exactement doublé, tout comme la quantité initiale qu'on a doublée. Voilà ce qu'on appelle **contrôler une transformation par un réactif** : changer volontairement la quantité initiale du réactif limitant pour changer, dans les mêmes proportions, la quantité finale de produit obtenu. C'est, très précisément, ce que proposait Amine dans l'accroche - et sa proposition, elle, change bel et bien la quantité finale de diiode.

Une prudence à garder en tête : cette proportionnalité ne dure que tant que le réactif qu'on augmente reste limitant. Pousse l'augmentation assez loin, et à un moment, c'est l'autre réactif qui prendra le relais comme facteur limitant - $x_{max}$ cessera alors d'augmenter proportionnellement, et plafonnera. Tu retrouveras cette bascule dans l'exercice de fin de chapitre.

---

## R2 — Le mécanisme du catalyseur : un chemin plus rapide, pas une autre arrivée

### Ce qu'est un catalyseur, précisément

Un **catalyseur** est une espèce chimique qui accélère une réaction sans être consommée : elle intervient dans le déroulement microscopique de la réaction, mais elle en ressort intacte, en quantité et en nature chimique rigoureusement identiques à ce qu'elle était au départ. On l'écrit généralement au-dessus (ou à côté) de la flèche de l'équation - jamais parmi les réactifs, jamais parmi les produits, puisqu'elle n'appartient ni vraiment à l'un ni vraiment à l'autre camp.

### L'image du col de montagne

Imagine l'énergie du système - réactifs, puis produits - comme l'altitude d'un chemin de montagne. Les réactifs se trouvent à une certaine altitude ; les produits, plus loin sur le chemin, à une autre altitude. Cette différence d'altitude ne dépend que de la nature chimique des réactifs et des produits eux-mêmes - jamais du chemin emprunté pour aller de l'un à l'autre.

Mais entre les deux, il faut franchir un col : un point du chemin plus haut que le départ ET que l'arrivée. La hauteur de ce col au-dessus des réactifs porte un nom : l'**énergie d'activation**, notée $E_a$. C'est l'énergie qu'il faut, ne serait-ce que transitoirement, pour amorcer la transformation. Plus ce col est haut, moins il y a, à une température donnée, de chocs entre entités réactives suffisamment énergétiques pour le franchir - donc moins de chocs efficaces (le critère vu au chapitre transformations lentes et rapides), donc une réaction plus lente.

Un catalyseur agit UNIQUEMENT sur la hauteur de ce col : il ouvre, entre les mêmes réactifs et les mêmes produits, un chemin différent - un tunnel, pas un pont plus haut - dont le point culminant est plus bas que celui du chemin non catalysé. Son énergie d'activation $E_a'$ est donc plus petite que $E_a$. À température égale, une plus grande proportion des chocs franchit désormais ce col abaissé : plus de chocs efficaces par seconde, donc une transformation plus rapide.

### Ce que le tunnel ne change jamais

Regarde bien les deux extrémités du chemin : le tunnel ne déplace ni le point de départ (l'énergie des réactifs) ni le point d'arrivée (l'énergie des produits) - seulement le chemin suivi entre les deux, et la hauteur de son point culminant. Réactifs et produits restent les mêmes espèces chimiques, avec la même énergie, qu'on emprunte le chemin catalysé ou non.

Deux conséquences directes, qui ne sont jamais celles qu'on croit spontanément :

- La quantité finale de produit formé ne change pas. Elle reste fixée, comme tu viens de le voir en R1, par la quantité initiale du réactif limitant - un catalyseur n'ajoute et ne retranche aucune matière, il ne fait que faciliter le passage.
- Pour une transformation qui n'est pas totale (celle vue au chapitre état d'équilibre d'un système chimique, par exemple), la constante d'équilibre $K$ ne change pas non plus. $K$ ne dépend que de la réaction elle-même et de la température - jamais du chemin microscopique par lequel le système l'atteint.

### Pourquoi, plus précisément, un catalyseur ne peut pas déplacer un équilibre

Voici l'argument qui rend ce deuxième point solide, et pas simplement affirmé : un véritable catalyseur accélère la réaction directe ET la réaction inverse, dans les mêmes proportions - le tunnel qu'il ouvre se parcourt dans les deux sens à la fois. Or l'équilibre, c'est exactement l'instant où la vitesse directe égale la vitesse inverse. Si le catalyseur multiplie les deux vitesses par le même facteur, leur égalité continue à se produire pour le même rapport de concentrations qu'avant - donc pour la même valeur de $K$. Un tunnel emprunté seulement dans un sens changerait la position de l'équilibre, c'est vrai - mais alors, ce ne serait plus un catalyseur au sens propre : ce serait autre chose, qui privilégierait une des deux réactions sur l'autre.

### Teste l'idée avant de la croire : « un catalyseur améliore le rendement »

Reviens sur la proposition de Sofia dans l'accroche. Si le $Fe^{3+}$ qu'elle veut ajouter changeait la quantité finale de diiode, cela voudrait dire une chose précise : que le chemin catalysé mène à une altitude d'arrivée différente de celle du chemin normal - autrement dit, que $Fe^{3+}$ transforme une partie de $S_2O_8^{2-}$ ou de $I^-$ en autre chose que $SO_4^{2-}$ et $I_2$, ou fait apparaître du produit au-delà de ce que permet le réactif limitant. Rien de tout ça n'est ce que fait un catalyseur, par définition : il n'est ni consommé, ni transformé, et il ne crée pas de matière à partir de rien.

Sofia obtiendra donc, avec les quantités de l'expérience de R1, exactement les mêmes $5{,}0\ \text{mmol}$ de diiode qu'Amine sans catalyseur - mais en un temps bien plus court que les quarante minutes mesurées au chapitre précédent. Voilà ce qui distingue enfin les deux propositions de l'accroche : celle d'Amine change la quantité finale ; celle de Sofia ne change que le temps pour l'atteindre.

---

## R3 — Les trois visages de la catalyse : homogène, hétérogène, enzymatique

### Catalyse homogène : même phase que les réactifs

Un catalyseur est dit **homogène** quand il se trouve dans la même phase que les réactifs - le plus souvent, dissous dans la même solution qu'eux. C'est le cas des ions $Fe^{3+}$ de l'accroche : dissous dans la même solution aqueuse que $S_2O_8^{2-}$ et $I^-$, ils accélèrent la réaction en deux étapes rapides qui, additionnées, redonnent exactement l'équation bilan, sans que $Fe^{3+}$ (régénéré) n'apparaisse jamais dans ce bilan.

Tu as croisé un autre exemple sans t'y attarder, au chapitre transformations dans les deux sens : l'estérification de l'acide éthanoïque et de l'éthanol, réalisée avec quelques gouttes d'acide sulfurique comme catalyseur. L'acide sulfurique $H_2SO_4$, dissous dans le même mélange liquide que les réactifs organiques, est lui aussi un catalyseur homogène.

### Catalyse hétérogène : une phase différente, une réaction de surface

Un catalyseur est dit **hétérogène** quand il se trouve dans une phase différente de celle des réactifs - le plus souvent un solide, en contact avec des réactifs gazeux ou en solution. La réaction catalysée se produit alors à la SURFACE du catalyseur solide : les molécules réactives s'y fixent temporairement (on dit qu'elles s'adsorbent), y réagissent, puis les produits formés s'en détachent, libérant la surface pour de nouvelles molécules.

L'exemple le plus concret : le pot catalytique automobile, un bloc de céramique recouvert de platine, de palladium et de rhodium métalliques, solides. Les gaz d'échappement - monoxyde de carbone, oxydes d'azote, hydrocarbures imbrûlés, tous gazeux - traversent ce bloc et réagissent à la surface des métaux pour donner du dioxyde de carbone, du diazote et de l'eau, bien moins polluants.

### Teste-toi : homogène ou hétérogène ?

Le platine du pot catalytique et les gaz d'échappement : deux phases clairement différentes - un solide, des gaz. C'est un catalyseur hétérogène. Et c'est précisément parce qu'il est hétérogène - donc solide, donc physiquement séparable du flux gazeux - qu'on peut le laisser en place, des années durant, sans jamais avoir à le récupérer ni à le remplacer à chaque trajet : seule sa surface travaille, au contact de ce qui la traverse.

Une confusion à éviter : un catalyseur n'est pas hétérogène simplement parce qu'il s'agit d'une espèce chimique différente des réactifs - TOUS les catalyseurs, homogènes ou hétérogènes, sont des espèces différentes des réactifs, sinon on ne pourrait pas les distinguer d'eux. Ce qui tranche entre homogène et hétérogène, c'est uniquement la PHASE : dissous avec les réactifs (homogène) ou dans une phase séparée, typiquement solide (hétérogène) - jamais la nature chimique du catalyseur en elle-même.

### Catalyse enzymatique : le catalyseur du vivant

Une **enzyme** est un catalyseur biologique, une protéine produite par les cellules vivantes. Elle agit selon exactement le même mécanisme que tout catalyseur : elle ouvre, pour une réaction chimique précise, un chemin d'énergie d'activation plus basse, sans jamais changer l'état final. Ce qui la distingue des catalyseurs chimiques usuels, c'est son extrême spécificité : une enzyme donnée ne catalyse en général qu'une seule réaction, sur un seul type de molécule (son substrat), grâce à une forme géométrique qui s'ajuste précisément à cette molécule - une clé qui n'ouvre qu'une seule serrure. C'est ce qui permet à des milliers de réactions différentes de se dérouler côte à côte, sans se gêner, dans une seule cellule vivante, chacune pilotée par son enzyme propre, à une température de l'ordre de $37\,^\circ\text{C}$ - là où un catalyseur chimique industriel exige souvent des conditions bien plus dures (haute température, haute pression) pour un résultat comparable.

Exemple purement chimique : l'amylase salivaire catalyse l'hydrolyse de l'amidon, une grosse molécule, en molécules de glucose bien plus petites - une réaction d'hydrolyse, de la même famille que celle rencontrée pour les esters, mais ici accélérée par une enzyme plutôt que par un acide.

---

## R4 — L'autocatalyse : quand un produit catalyse sa propre formation

### Une réaction où le produit devient acteur

Dans tous les exemples précédents, le catalyseur était apporté depuis l'extérieur, dès le départ. Un cas particulier mérite qu'on s'y arrête : et si un PRODUIT de la réaction, une fois formé, se mettait lui-même à catalyser la réaction qui l'a produit ?

Prends la réaction, en milieu acide, entre les ions permanganate $MnO_4^-$ (violets, oxydants) et l'ion oxalate $C_2O_4^{2-}$ (réducteur, incolore), qui donne des ions manganèse (II) $Mn^{2+}$ (incolores) et du dioxyde de carbone :

$$MnO_4^- + 8H^+ + 5e^- \rightarrow Mn^{2+} + 4H_2O \qquad \text{(réduction)}$$

$$C_2O_4^{2-} \rightarrow 2CO_2 + 2e^- \qquad \text{(oxydation)}$$

Les deux demi-équations échangent respectivement $5$ et $2$ électrons ; pour les combiner, on multiplie la première par $2$ et la seconde par $5$, afin d'égaler les $10$ électrons échangés :

$$2MnO_4^- + 16H^+ + 5C_2O_4^{2-} \rightarrow 2Mn^{2+} + 8H_2O + 10CO_2$$

### Ce qu'on observe : ni une vitesse constante, ni une vitesse qui ne fait que chuter

Verse ces deux solutions ensemble et regarde la teinte violette du permanganate. D'abord, presque rien ne semble se passer : la couleur reste violette pendant un temps notable, comme si la réaction hésitait à démarrer. Puis, assez brusquement, la décoloration s'accélère nettement - la teinte violette disparaît de plus en plus vite. Enfin, vers la fin, la décoloration ralentit de nouveau, jusqu'à l'arrêt complet.

Voici, à titre d'illustration, la durée mesurée pour décolorer chaque quart successif de la quantité initiale de permanganate, dans une expérience type :

| Tranche décolorée | $0 \to 25\,\%$ | $25 \to 50\,\%$ | $50 \to 75\,\%$ | $75 \to 100\,\%$ |
|---|---|---|---|---|
| Durée | $90\ \text{s}$ | $25\ \text{s}$ | $20\ \text{s}$ | $70\ \text{s}$ |

*Ce qu'on cherche ici, et pourquoi ce geste :* une vitesse constante donnerait quatre durées égales, quart après quart. Une vitesse qui ne ferait QUE diminuer, comme celle établie au chapitre précédent, donnerait quatre durées croissantes du début à la fin. Ici, ni l'un ni l'autre : la deuxième tranche va plus vite que la première, la troisième plus vite encore, puis la quatrième ralentit nettement. La vitesse de cette réaction n'a pas seulement diminué au cours du temps - elle a d'abord AUGMENTÉ.

### Pourquoi : deux effets qui s'affrontent

Au tout premier instant, il n'existe encore aucun ion $Mn^{2+}$ dans le mélange : la réaction ne peut se produire que par son chemin non catalysé, lent - malgré des concentrations en réactifs maximales à cet instant, la vitesse de départ reste faible. Mais chaque trace de $Mn^{2+}$ formée agit, à son tour, comme catalyseur pour les molécules encore présentes : elle ouvre pour elles un chemin réactionnel plus rapide. Plus il se forme de $Mn^{2+}$, plus le mélange devient auto-catalytique, plus la réaction s'accélère elle-même - un emballement progressif, qui explique la deuxième et la troisième tranche du tableau.

Puis, à mesure que $MnO_4^-$ et $C_2O_4^{2-}$ s'épuisent, l'effet inverse - la raréfaction des chocs efficaces par manque de réactifs, déjà rencontrée au chapitre transformations lentes et rapides - finit par l'emporter sur l'effet catalytique croissant : la vitesse retombe, jusqu'à s'annuler quand la transformation s'achève. C'est la quatrième tranche, plus longue de nouveau.

### Le contraste à retenir

Compare cette allure à celle établie au chapitre suivi temporel d'une transformation : là-bas, $v(t)$ ne faisait que diminuer, continûment, dès le tout premier instant jusqu'à la fin - parce qu'aucun mécanisme catalytique ne s'ajoutait à la simple raréfaction des réactifs. Ici, deux effets s'opposent en cours de route : l'auto-catalyse (qui pousse $v$ à monter) et l'épuisement des réactifs (qui pousse $v$ à descendre) - et le premier l'emporte d'abord, avant que le second ne prenne le dessus. La courbe $v(t)$ dessine une bosse, pas une pente uniformément décroissante.

---

## R5 — Pour t'entraîner

### Récapitulatif express

| Levier actionné | Effet sur $x_{max}$ (ou sur $K$) | Effet sur la vitesse |
|---|---|---|
| Quantité initiale du réactif limitant | Change $x_{max}$, dans les mêmes proportions (tant qu'il reste limitant) | Peut aussi changer, mais ce n'est pas son rôle principal ici |
| Catalyseur | Ne change ni $x_{max}$, ni $K$ | Accélère la réaction (abaisse $E_a$), dans les deux sens si la réaction est réversible |

- Le **réactif limitant** est celui dont le rapport quantité initiale / coefficient stoechiométrique est le plus petit ; il fixe $x_{max}$, et changer sa quantité initiale change $x_{max}$ proportionnellement - tant qu'il reste limitant.
- Un **catalyseur** ouvre un chemin réactionnel d'énergie d'activation plus basse, sans jamais changer l'énergie des réactifs ni des produits : il accélère la réaction sans changer ni la quantité finale de produit, ni (pour une transformation réversible) la constante d'équilibre $K$.
- Trois catégories de catalyse : **homogène** (même phase que les réactifs), **hétérogène** (phase différente, réaction de surface), **enzymatique** (catalyseur biologique, extrêmement spécifique).
- L'**autocatalyse** : un produit de la réaction catalyse sa propre formation - la vitesse augmente d'abord, avant de diminuer, contrairement au cas général où elle ne fait que diminuer.
- Pour choisir son levier : si l'objectif est d'obtenir PLUS de produit, il faut jouer sur les quantités initiales de réactifs - jamais sur un catalyseur, qui en est structurellement incapable. Si l'objectif est d'obtenir la même quantité de produit plus vite, un catalyseur est le bon levier.

### Exercice de type bac (original — entraînement, non un sujet officiel)

On étudie la réaction, totale, entre les ions peroxodisulfate $S_2O_8^{2-}$ et les ions iodure $I^-$ :

$$S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$$

On réalise trois expériences, dans un volume $V = 100\ \text{mL}$ constant à chaque fois :

- **Expérience A** : $n_0(S_2O_8^{2-}) = 3{,}0\ \text{mmol}$, $n_0(I^-) = 8{,}0\ \text{mmol}$, sans catalyseur.
- **Expérience B** : $n_0(S_2O_8^{2-}) = 6{,}0\ \text{mmol}$, $n_0(I^-) = 8{,}0\ \text{mmol}$ (seule la quantité de peroxodisulfate a changé par rapport à A), sans catalyseur.
- **Expérience C** : mêmes quantités initiales que l'expérience A, mais avec quelques gouttes de solution de $Fe^{3+}$ ajoutées au mélange.

**1) Dresser le tableau d'avancement de l'expérience A, identifier le réactif limitant, et calculer $x_{max,A}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* comparer les deux rapports quantité initiale / coefficient, pas les quantités brutes.

$$\frac{n_0(S_2O_8^{2-})}{1} = 3{,}0\ \text{mmol}$$

$$\frac{n_0(I^-)}{2} = \frac{8{,}0}{2} = 4{,}0\ \text{mmol}$$

Le plus petit rapport est celui de $S_2O_8^{2-}$ : c'est le réactif limitant, et $x_{max,A} = 3{,}0\ \text{mmol}$.

**2) Dans l'expérience B, la quantité initiale de peroxodisulfate a doublé par rapport à A. Identifier le réactif limitant de B, calculer $x_{max,B}$, et comparer à $x_{max,A}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* refaire le même test de comparaison qu'en question 1, sans supposer d'avance que c'est toujours le même réactif qui limite.

$$\frac{n_0(S_2O_8^{2-})}{1} = 6{,}0\ \text{mmol}$$

$$\frac{n_0(I^-)}{2} = 4{,}0\ \text{mmol}$$

Cette fois, le plus petit rapport est celui de $I^-$ : c'est lui qui est devenu limitant, et $x_{max,B} = 4{,}0\ \text{mmol}$.

L'avancement final n'a PAS doublé (il serait passé à $6{,}0\ \text{mmol}$ si $S_2O_8^{2-}$ était resté limitant) : il n'a gagné que $1{,}0\ \text{mmol}$, parce qu'au-delà d'un certain point, c'est l'iodure qui plafonne désormais la réaction. Augmenter encore la quantité de peroxodisulfate, sans toucher à celle d'iodure, ne changerait plus rien à $x_{max}$.

**3) Quel est l'avancement final $x_{max,C}$ de l'expérience C ? Justifier sans nouveau calcul, puis indiquer l'effet observable de l'ajout de $Fe^{3+}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* mobiliser directement le mécanisme du catalyseur vu en R2, plutôt que refaire un tableau d'avancement.

$Fe^{3+}$ est un catalyseur : il ne change ni les quantités de réactifs, ni l'énergie des réactifs et des produits, donc pas non plus l'avancement final. $x_{max,C} = x_{max,A} = 3{,}0\ \text{mmol}$, exactement. L'effet observable est uniquement cinétique : la teinte jaune-brune du diiode apparaît et se stabilise beaucoup plus vite qu'en expérience A, sans que la quantité finale de diiode obtenue ne change.

**4) Identifier le type de catalyse mis en jeu dans l'expérience C, et justifier.**

*Ce qu'on cherche ici, et pourquoi ce geste :* le critère de classification est la phase du catalyseur par rapport à celle des réactifs, jamais sa nature chimique.

Les ions $Fe^{3+}$ sont dissous dans la même solution aqueuse que $S_2O_8^{2-}$ et $I^-$ : catalyseur et réactifs partagent la même phase. C'est donc une catalyse **homogène**.

### À toi

**Variation 1.** Un chimiste réalise une transformation totale d'équation $A + B \rightarrow C$ (coefficients stoechiométriques tous égaux à $1$), en mélangeant $n_0(A) = 2{,}0\ \text{mol}$ et $n_0(B) = 1{,}0\ \text{mol}$. Il veut obtenir davantage de $C$, sans changer la nature de la réaction ni chercher à l'accélérer. Identifie le réactif limitant de ce mélange, propose une modification qui augmenterait réellement la quantité finale de $C$ obtenue, et explique pourquoi ajouter un catalyseur ne résoudrait pas son problème.

**Variation 2.** Une usine fait circuler en continu un mélange gazeux de réactifs à travers un réacteur rempli de grains d'un catalyseur solide. Identifie le type de catalyse mis en jeu (homogène, hétérogène ou enzymatique) en justifiant à l'aide de la notion de phase, puis indique, à l'aide du mécanisme du catalyseur vu en R2, si ces grains doivent en principe être remplacés après chaque utilisation ou s'ils peuvent resservir pour de nombreux cycles de réaction.
