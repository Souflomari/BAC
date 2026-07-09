# Lois de Newton

---

## R0 — Accroche : le palet qui glisse tout seul

Imagine une patinoire. Tu lances un palet de hockey d'un coup sec, puis tu retires ta main. La glace est presque parfaitement lisse — les frottements y sont quasi nuls. Le palet part, glisse... et continue de glisser, en ligne droite, à une vitesse qui semble à peine changer, sur toute la longueur de la patinoire, longtemps après que ta main l'a quitté.

Avant de lire la suite, prends position, en une phrase : qu'est-ce qui fait avancer le palet pendant tout ce trajet, alors que plus personne ne le touche ? Y a-t-il encore, selon toi, une force qui le pousse vers l'avant pendant qu'il glisse ? Ou bien penses-tu qu'aucune force n'est nécessaire pour qu'il continue ?

Beaucoup de raisonnements naturels penchent vers la première réponse : « il continue d'avancer, donc il doit y avoir encore une force vers l'avant qui l'entretient — sinon il s'arrêterait tout de suite ». C'est une intuition ancienne (elle remonte à Aristote), et elle semble collée à l'expérience de tous les jours : un objet qu'on cesse de pousser finit toujours par s'arrêter.

Garde ta réponse en tête. On va la mettre à l'épreuve, mais il nous faut d'abord le bon vocabulaire pour en parler précisément : dans quel cadre décrit-on un mouvement, et qu'est-ce qu'on entend exactement par « la vitesse » d'un solide qui, contrairement à un point, a une taille et une forme ? C'est l'objet du rung suivant. On y revient ensuite directement.

---

## R1 — Le cadre : référentiel galiléen, centre d'inertie, vecteur vitesse

### Pourquoi un mouvement n'existe pas « dans l'absolu »

Décrire un mouvement suppose toujours de choisir un **référentiel** : un objet (ou un ensemble de points fixes les uns par rapport aux autres) par rapport auquel on mesure les positions. Un passager assis dans un train qui roule est immobile par rapport au train, mais en mouvement par rapport au quai. Aucune des deux descriptions n'est « plus vraie » que l'autre — elles décrivent juste le mouvement par rapport à deux référentiels différents. C'est pour ça qu'on ne dit jamais « ce solide est en mouvement », mais toujours « ce solide est en mouvement *par rapport à* tel référentiel ».

### Un référentiel ne « marche » pas toujours pour appliquer les lois de Newton

Voici le test à se poser : imagine que tu es debout, immobile, à l'intérieur d'un bus qui roule à vitesse constante. Une balle posée sur la tablette devant toi reste immobile — rien d'étrange. Maintenant, le chauffeur freine brutalement. Que fait la balle, vue depuis l'intérieur du bus ? Elle se met à rouler vers l'avant, toute seule, sans qu'aucune force visible ne la pousse.

Est-ce que ça veut dire qu'une force mystérieuse agit sur la balle ? Non — ça veut dire que le référentiel du bus qui freine n'est pas un bon référentiel pour appliquer les lois qu'on va énoncer dans ce chapitre : dans ce référentiel-là, un objet peut se mettre en mouvement sans qu'aucune force réelle ne s'exerce sur lui. Vu depuis le sol (le trottoir, immobile), il n'y a pas de mystère : la balle, elle, continue tout simplement sur sa trajectoire à vitesse constante pendant que c'est le bus qui ralentit autour d'elle.

On appelle **référentiel galiléen** un référentiel dans lequel les lois de Newton — à commencer par le principe d'inertie qu'on va énoncer au rung suivant — sont vérifiées. Ce n'est pas une propriété qu'on peut déduire à l'avance : c'est un fait qu'on constate, référentiel par référentiel. Le sol (référentiel terrestre) en est un, en bonne approximation, pour les mouvements de durée et d'échelle raisonnables étudiés dans ce chapitre ; un bus qui freine n'en est pas un.

Trois référentiels galiléens usuels, du plus local au plus large :

- le **référentiel terrestre**, lié au sol : suffisant pour la quasi-totalité des mouvements étudiés ici (chute d'un objet, solide sur un plan) ;
- le **référentiel géocentrique**, centré sur le centre de la Terre, avec des axes dirigés vers des étoiles fixes : utilisé pour les satellites ;
- le **référentiel héliocentrique**, centré sur le Soleil : utilisé pour le mouvement des planètes.

Dans tout ce chapitre, sauf mention contraire, on travaille dans le référentiel terrestre, supposé galiléen.

### Le centre d'inertie G : réduire un solide à un point

Un solide (une caisse, une bille, une voiture) a une taille, une forme, et chacun de ses points pourrait en principe bouger un peu différemment des autres — sauf dans le cas qu'on étudie exclusivement dans ce chapitre : la **translation**, où tous les points du solide ont, à chaque instant, exactement le même vecteur déplacement, donc la même vitesse et la même accélération.

Dans ce cas précis, suivre le mouvement d'UN SEUL point suffit à connaître le mouvement de tout le solide. On choisit pour cela un point particulier, le **centre d'inertie** $G$ (le barycentre des masses du solide — pour un solide homogène et symétrique, c'est simplement son centre géométrique). C'est ce point $G$ dont on va décrire le mouvement, et auquel on va appliquer les lois de Newton, pour tout le chapitre.

### Construire le vecteur vitesse $\vec{v}_G$

Avant de parler d'accélération, il faut être précis sur ce qu'on entend par « la vitesse » de $G$ — parce que ce n'est pas juste un nombre, c'est un **vecteur**, et c'est un point sur lequel il ne faut pas glisser.

Entre deux instants proches $t_1$ et $t_2$, le point $G$ se déplace d'une position $G_1$ à une position $G_2$. On définit la vitesse moyenne vectorielle sur cet intervalle par :

$$\vec{v}_{moy} = \frac{\overrightarrow{G_1G_2}}{t_2 - t_1}$$

Cette vitesse moyenne pointe dans la direction du déplacement, et sa norme est d'autant plus grande que $G$ a parcouru une grande distance dans un temps court. En resserrant l'intervalle $t_2 - t_1$ jusqu'à un instant quasi ponctuel, on obtient la vitesse **instantanée**, notée $\vec{v}_G$ :

$$\vec{v}_G = \frac{d\overrightarrow{OG}}{dt}$$

où $O$ est un point fixe du référentiel. Concrètement, $\vec{v}_G$ est **tangent à la trajectoire** de $G$ à chaque instant, dirigé dans le sens du mouvement, et sa norme est la vitesse au sens usuel (en m/s).

[[figure:vecteur-vitesse-tangente]]

Retiens bien ceci, parce que ça va compter dans les rungs suivants : $\vec{v}_G$ peut être grand ou petit, constant ou changeant — **ce n'est pas la vitesse elle-même qui va nous renseigner sur les forces**. Ce qui va compter, c'est de savoir si, et comment, $\vec{v}_G$ **change** au cours du temps.

---

## R2 — La première loi de Newton : le principe d'inertie

### Reviens à la question du palet

On y revient. Le palet glisse en ligne droite, à vitesse à peu près constante, sans que personne ne le touche.

Teste ton intuition initiale avant de la garder : si un objet en mouvement avait vraiment besoin d'une force pour continuer à avancer, cette force devrait venir de quelque part. Or, une fois que ta main a quitté le palet, plus rien ne le touche horizontalement — ni la glace (frottement quasi nul), ni l'air (résistance négligeable à cette vitesse), ni ta main. S'il fallait une force horizontale pour que le palet continue, il n'y en a tout simplement plus aucune disponible après le lâcher. Et pourtant, il continue.

### Le principe, énoncé précisément

**Dans un référentiel galiléen, un solide dont la somme vectorielle des forces extérieures est nulle est soit au repos, soit en mouvement rectiligne uniforme** — c'est-à-dire que son vecteur vitesse $\vec{v}_G$ reste constant (même norme, même direction, même sens) :

$$\sum \vec{F}_{ext} = \vec{0} \quad \Longleftrightarrow \quad \vec{v}_G = \text{constante}$$

La réciproque est vraie aussi, et elle est tout aussi utile : si tu observes qu'un solide est au repos ou se déplace en ligne droite à vitesse constante, tu peux affirmer, sans avoir besoin de connaître chaque force en détail, que la somme des forces extérieures qui s'exercent sur lui est nulle.

### Ce que ce principe corrige, précisément

Voici l'erreur de raisonnement à repérer et à éliminer : **ce n'est pas le mouvement qui a besoin d'une cause — c'est le CHANGEMENT de mouvement.** Un vecteur vitesse constant, aussi grand soit-il, ne réclame aucune force pour se maintenir. Ce qui réclame une force, c'est de faire varier ce vecteur : le faire accélérer, le ralentir, ou changer sa direction.

Le palet ralentit un tout petit peu en réalité, sur une très longue distance — c'est le frottement résiduel, non nul mais très faible, qui grignote lentement sa vitesse. Sur une glace parfaitement lisse et sans air (un cas idéal, jamais atteint mais utile pour raisonner), le palet continuerait en ligne droite, à vitesse rigoureusement constante, indéfiniment, sans qu'aucune force ne soit nécessaire pour ça.

Un autre exemple, pour vérifier que l'idée tient dans un contexte différent : dans une voiture qui freine brutalement, ceinture non attachée, ton corps continue d'avancer vers l'avant pendant que la voiture ralentit autour de toi. Ce n'est pas une force mystérieuse qui te projette en avant : c'est justement l'ABSENCE de force horizontale suffisante sur ton corps (tant que rien ne te retient) qui te fait continuer sur ta lancée, à l'ancienne vitesse, jusqu'à ce qu'une force — la ceinture, le tableau de bord — te fasse changer de vitesse à ton tour.

### Un solide au repos : un cas particulier du même principe

Le principe couvre aussi le repos, qui est juste le cas particulier $\vec{v}_G = \vec{0}$ maintenu constant. Un livre posé sur une table est soumis à deux forces : son poids $\vec{P}$ (vertical, vers le bas) et la réaction normale de la table $\vec{N}$ (verticale, vers le haut). Le livre reste immobile, donc $\vec{v}_G = \vec{0}$ constant, donc, par le principe d'inertie :

$$\vec{P} + \vec{N} = \vec{0} \qquad \text{soit} \qquad N = P = mg$$

Les deux forces ont même norme, même direction, et des sens opposés — mais attention, on reviendra en R4 sur une confusion très fréquente à leur sujet : ce n'est PAS pour cette raison qu'elles forment une paire d'action-réciproque au sens de la troisième loi.

---

## R3 — La deuxième loi de Newton : $\sum \vec{F}_{ext} = m\,\vec{a}_G$

### Avant l'énoncé : que se passe-t-il quand la somme des forces N'EST PAS nulle ?

Le principe d'inertie décrit ce qui se passe quand $\sum \vec{F}_{ext} = \vec{0}$. Mais la plupart des situations réelles ne sont pas de ce type : une voiture qui démarre, une caisse qu'on tire, une bille qu'on lâche — dans tous ces cas, la somme des forces n'est pas nulle, et le vecteur vitesse change.

Prends position avant de continuer : si tu pousses avec exactement la même force horizontale un chariot vide et un chariot identique mais chargé de briques (frottements négligés dans les deux cas), lequel des deux se met à accélérer le plus vite ?

L'intuition correcte, ici, est en général la bonne : le chariot chargé, plus difficile à mettre en mouvement, accélère moins vite pour la même force. C'est exactement ce que formalise la deuxième loi.

### Construire $\vec{a}_G$

De la même façon qu'on a construit $\vec{v}_G$ à partir de $\overrightarrow{OG}$, on construit le vecteur accélération $\vec{a}_G$ à partir de $\vec{v}_G$ : c'est la dérivée du vecteur vitesse par rapport au temps,

$$\vec{a}_G = \frac{d\vec{v}_G}{dt}$$

$\vec{a}_G$ mesure la façon dont $\vec{v}_G$ change — en norme (le solide accélère ou ralentit) et/ou en direction (le solide tourne). Si $\vec{v}_G$ est constant, alors $\vec{a}_G = \vec{0}$ : c'est exactement le principe d'inertie, vu comme un cas particulier de ce qu'on énonce maintenant.

### L'énoncé de la deuxième loi

**Dans un référentiel galiléen, la somme vectorielle des forces extérieures appliquées à un solide de masse $m$ est égale au produit de sa masse par le vecteur accélération de son centre d'inertie :**

$$\sum \vec{F}_{ext} = m\,\vec{a}_G$$

### Pourquoi c'est vrai : la masse comme mesure de l'inertie

Cette loi dit deux choses à la fois, et c'est important de les séparer :

- $\vec{a}_G$ est **colinéaire et de même sens** que $\sum \vec{F}_{ext}$ : l'accélération pointe toujours dans la direction de la force résultante, JAMAIS forcément dans la direction de $\vec{v}_G$ elle-même (un solide peut très bien accélérer dans une direction différente de celle où il se déplace déjà — c'est ce qui produit un changement de trajectoire, pas seulement un changement de norme de vitesse).
- la masse $m$ joue le rôle de coefficient de proportionnalité entre force et accélération : à force égale, un solide plus massif accélère moins. C'est précisément ce que ton intuition sur les deux chariots vient de confirmer. La masse mesure donc l'**inertie** d'un solide — sa résistance à changer de vitesse. Plus $m$ est grande, plus il faut une force importante pour produire la même accélération.

### Exemple travaillé : vérifier le rapport des accélérations

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut confirmer numériquement l'intuition du chariot, pour voir que la loi ne dit pas juste « plus lourd accélère moins », mais donne un rapport PRÉCIS, directement lié au rapport des masses.

On applique la même force horizontale $F = 20\ \text{N}$ à deux chariots initialement immobiles, de masses $m_A = 10\ \text{kg}$ et $m_B = 40\ \text{kg}$ (frottements négligés dans les deux cas). D'après la deuxième loi, appliquée séparément à chaque chariot :

$$a_A = \frac{F}{m_A} = \frac{20}{10} = 2{,}0\ \text{m}\cdot\text{s}^{-2}$$

$$a_B = \frac{F}{m_B} = \frac{20}{40} = 0{,}5\ \text{m}\cdot\text{s}^{-2}$$

Le chariot A accélère quatre fois plus vite que le chariot B — exactement le rapport inverse de leurs masses ($m_B/m_A = 4$). La force appliquée est identique dans les deux cas ; c'est uniquement la masse qui distingue les deux résultats.

[[figure:deux-chariots-inertie]]

---

## R4 — La troisième loi : les actions réciproques

### Teste l'idée avant de la lire

Imagine que tu es sur des patins à roulettes, immobile, tout près d'un mur. Tu poses les mains sur le mur et tu pousses fort, horizontalement. Le mur ne bouge évidemment pas — il est fixe, massif, immobile. Est-ce que ça veut dire que le mur n'exerce, lui, aucune force sur toi, puisqu'il ne bouge pas ?

Non : tu recules, toi, en t'éloignant du mur, dès que tu pousses. Le mur a donc bien exercé une force sur toi — dans le sens opposé à celle que tu as exercée sur lui — même s'il n'a lui-même bougé de nulle part.

### L'énoncé de la troisième loi

**Si un corps $A$ exerce sur un corps $B$ une force $\vec{F}_{A \to B}$, alors le corps $B$ exerce sur le corps $A$ une force $\vec{F}_{B \to A}$, de même droite d'action, de même norme, mais de sens opposé :**

$$\vec{F}_{B \to A} = -\vec{F}_{A \to B}$$

Cette loi est **toujours vraie**, pour n'importe quelle interaction (contact, gravitation, etc.), que les deux corps soient immobiles, en mouvement, en train d'accélérer, ou pas — contrairement aux deux premières lois, elle ne demande même pas que le référentiel soit galiléen. Toute force vient toujours d'une interaction entre EXACTEMENT deux corps, et cette interaction va nécessairement dans les deux sens.

### Le piège classique : distinguer une paire « action-réaction » d'un simple équilibre

Reprends le livre posé sur la table (R2). Deux forces s'exerçaient sur le livre : son poids $\vec{P}$ et la réaction normale $\vec{N}$ de la table. On avait $\vec{P} + \vec{N} = \vec{0}$, car le livre est immobile.

Voici la question piège : est-ce que $\vec{P}$ et $\vec{N}$ forment une paire d'action-réaction au sens de la troisième loi ?

**Non.** Et voici pourquoi, précisément : une paire d'action-réaction relie **deux forces qui s'exercent sur deux corps DIFFÉRENTS**, issues d'une seule et même interaction entre ces deux corps. Or $\vec{P}$ et $\vec{N}$ s'exercent toutes les deux **sur le même corps**, le livre — ce n'est pas une paire action-réaction, c'est un équilibre (conséquence du principe d'inertie, vu en R2).

Pour trouver la vraie réciproque de $\vec{N}$ (la force exercée par la table sur le livre), il faut chercher l'AUTRE force de la même interaction : celle que le livre exerce, en retour, sur la table.

$$\vec{N}_{\text{table} \to \text{livre}} \quad \text{a pour réciproque} \quad \vec{N}_{\text{livre} \to \text{table}} = -\vec{N}_{\text{table} \to \text{livre}}$$

Cette force réciproque s'exerce SUR LA TABLE, pas sur le livre — c'est pour ça qu'elle n'apparaît jamais dans le bilan des forces du livre. De même, la réciproque du poids $\vec{P}$ (qui est la force exercée par la Terre sur le livre) est la force que le livre exerce, en retour, sur la Terre — une force minuscule en effet sur un objet aussi massif, mais qui existe bien, par la troisième loi.

[[figure:actions-reciproques-livre-table]]

### Synthèse des trois lois

| Loi | Énoncé en une phrase | Remarque |
|---|---|---|
| 1ʳᵉ loi (principe d'inertie) | Si $\sum \vec{F}_{ext} = \vec{0}$, alors $\vec{v}_G$ est constant (le solide est au repos ou en mouvement rectiligne uniforme). | Cas particulier de la 2ᵉ loi, quand $\vec{a}_G = \vec{0}$. |
| 2ᵉ loi | $\sum \vec{F}_{ext} = m\,\vec{a}_G$ : la somme des forces détermine l'accélération de $G$, proportionnellement à la masse. | La masse est la mesure de l'inertie. |
| 3ᵉ loi (actions réciproques) | $\vec{F}_{B \to A} = -\vec{F}_{A \to B}$ : toute force a une réciproque, sur l'AUTRE corps. | Vraie à tout instant, que les corps bougent ou non — ne concerne pas les forces en équilibre sur un même corps. |

---

## R5 — Méthode de résolution : bilan, repère, équations du mouvement

Voici la méthode que tu vas appliquer à chaque exercice de dynamique, dans l'ordre :

1. **Définir le système** étudié (le solide) et vérifier — ou admettre, si l'énoncé le précise — que le référentiel est galiléen.
2. **Faire le bilan des forces extérieures** qui s'exercent sur le système : identifie chacune (poids, réaction normale, frottement, tension, force appliquée...), sans en oublier ni en inventer.
3. **Écrire la deuxième loi de Newton** sous forme vectorielle : $\sum \vec{F}_{ext} = m\,\vec{a}_G$.
4. **Choisir un repère adapté** — en général un axe dans le sens du mouvement, l'autre perpendiculaire — et **projeter** l'équation vectorielle sur ces axes : une équation vectorielle en 2D devient deux équations scalaires.
5. **Résoudre** ces équations scalaires pour obtenir les composantes de $\vec{a}_G$, puis, si besoin, en déduire la vitesse ou la position par les relations horaires du mouvement.

### Exemple travaillé : solide sur un plan horizontal, avec frottement

Une caisse de masse $m = 2{,}0\ \text{kg}$ glisse sur un sol horizontal. Elle est tirée par une force horizontale $\vec{F}$, de norme $F = 8{,}0\ \text{N}$, dans le sens du mouvement. Les frottements exercent une force $\vec{f}$, de norme $f = 3{,}0\ \text{N}$, opposée au mouvement. On prend $g \approx 9{,}8\ \text{m}\cdot\text{s}^{-2}$. On cherche l'accélération $\vec{a}_G$ de la caisse.

*Ce qu'on cherche ici, et pourquoi ce geste :* on suit la méthode dans l'ordre. Le bilan des forces d'abord — quatre forces ici, pas deux : le poids et la réaction normale ne s'annulent pas « par hasard », c'est la projection sur l'axe vertical qui va nous le confirmer.

**Bilan des forces :** le poids $\vec{P}$ (vertical, vers le bas, $P = mg$), la réaction normale du sol $\vec{N}$ (verticale, vers le haut), la force motrice $\vec{F}$ (horizontale, sens du mouvement), le frottement $\vec{f}$ (horizontal, sens opposé au mouvement).

**Deuxième loi :**

$$\vec{P} + \vec{N} + \vec{F} + \vec{f} = m\,\vec{a}_G$$

**Repère :** axe $Ox$ horizontal, dans le sens du mouvement ; axe $Oy$ vertical, vers le haut.

*Ce qu'on cherche ici, et pourquoi ce geste :* on projette d'abord sur $Oy$, parce que le mouvement reste purement horizontal — la caisse ne décolle pas du sol et ne s'y enfonce pas, donc son accélération verticale est nulle. C'est ce fait physique, pas une coïncidence de calcul, qui donne $N = P$.

**Projection sur $Oy$ :**

$$-P + N = m\,a_{G,y}$$

$$a_{G,y} = 0 \quad (\text{le solide reste sur le plan})$$

$$N = P = mg = 2{,}0 \times 9{,}8 = 19{,}6\ \text{N}$$

**Projection sur $Ox$ :**

$$F - f = m\,a_{G,x}$$

$$a_{G,x} = \frac{F - f}{m}$$

$$a_{G,x} = \frac{8{,}0 - 3{,}0}{2{,}0} = 2{,}5\ \text{m}\cdot\text{s}^{-2}$$

L'accélération de la caisse vaut $2{,}5\ \text{m}\cdot\text{s}^{-2}$, dans le sens du mouvement. Remarque un point de méthode important : $N$ n'intervient **pas** dans l'équation selon $Ox$ — le poids et la réaction normale se compensent verticalement, mais ils n'ont aucun effet sur l'accélération horizontale. Seules $F$ et $f$, les forces qui ont une composante selon $Ox$, déterminent $a_{G,x}$.

[[figure:bilan-forces-caisse-horizontale]]

---

## R6 — Application : la chute verticale

### Prends position avant de calculer quoi que ce soit

On lâche, au même instant et sans vitesse initiale, depuis la même hauteur, une bille en acier de masse $200\ \text{g}$ et une bille en plastique de masse $20\ \text{g}$ (dix fois plus légère). On néglige les frottements de l'air — on parle alors de **chute libre**. Laquelle touche le sol en premier, à ton avis ?

Beaucoup répondent : « la bille en acier, parce qu'elle est plus lourde, donc elle tombe plus vite ». C'est une confusion très répandue entre la masse et le poids, et on va la démonter par le calcul.

### Établir $\vec{a}_G$ en chute libre

En chute libre, la seule force qui s'exerce sur la bille est son poids $\vec{P} = m\vec{g}$ (les frottements de l'air étant négligés). La deuxième loi de Newton donne directement :

$$\vec{P} = m\,\vec{a}_G$$

$$m\,\vec{g} = m\,\vec{a}_G$$

$$\vec{a}_G = \vec{g}$$

La masse $m$ se simplifie **complètement** des deux côtés de l'équation. L'accélération en chute libre ne dépend donc ni de la masse, ni du poids de l'objet : elle vaut $\vec{g}$, la même pour tous les objets, quelle que soit leur masse. Les deux billes, acier et plastique, tombent avec exactement la même accélération, donc touchent le sol **au même instant** — la prédiction « plus lourd tombe plus vite » est directement contredite par ce calcul.

[[figure:chute-libre-comparaison]]

### Pourquoi masse et poids ne sont pas la même chose

C'est le moment de fixer clairement une distinction sur laquelle on glisse souvent :

- la **masse** $m$ (en kilogrammes) est une grandeur **scalaire** qui caractérise la quantité de matière d'un objet, et donc son inertie — sa résistance à changer de vitesse (vu en R3). Elle ne dépend pas du lieu où se trouve l'objet.
- le **poids** $\vec{P} = m\vec{g}$ (en newtons) est une **force**, donc un vecteur, verticale, dirigée vers le bas. Sa valeur dépend de $m$ ET de $g$, l'intensité de la pesanteur au lieu considéré. Or $g$ n'est PAS une constante universelle : $g \approx 9{,}8\ \text{N/kg}$ sur Terre, contre $g \approx 1{,}6\ \text{N/kg}$ sur la Lune. Le même objet, avec la même masse $m$, aurait donc un poids environ six fois plus faible sur la Lune que sur Terre — alors que sa masse, elle, n'aurait pas changé d'un gramme.

C'est exactement pour cette raison que l'accélération de chute libre, $\vec{a}_G = \vec{g}$, dépend du LIEU (elle diffère entre la Terre et la Lune) mais jamais de la masse de l'objet qui tombe : masse et poids sont deux grandeurs de nature différente, et seule la seconde varie avec le lieu.

### Exemple travaillé : temps de chute et vitesse d'arrivée

On lâche un objet sans vitesse initiale depuis une hauteur $h = 19{,}6\ \text{m}$, en chute libre (frottements négligés). On prend $g \approx 9{,}8\ \text{m}\cdot\text{s}^{-2}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on vient d'établir $\vec{a}_G = \vec{g}$, une accélération constante. On réutilise les relations horaires du mouvement uniformément accéléré (vues au chapitre de cinématique) pour remonter, par intégration successive, de l'accélération à la vitesse puis à la position — pas l'inverse.

$$v_G(t) = g\,t \qquad (\text{car } v_G(0) = 0)$$

$$x(t) = \frac{1}{2}g\,t^2 \qquad (\text{en prenant l'origine des positions au point de lâcher})$$

On cherche l'instant $t_{sol}$ où $x(t_{sol}) = h$ :

$$h = \frac{1}{2}g\,t_{sol}^2 \quad \Longrightarrow \quad t_{sol} = \sqrt{\frac{2h}{g}}$$

$$t_{sol} = \sqrt{\frac{2 \times 19{,}6}{9{,}8}} = \sqrt{4{,}0} = 2{,}0\ \text{s}$$

La vitesse à l'arrivée au sol vaut alors :

$$v_G(t_{sol}) = g \times t_{sol} = 9{,}8 \times 2{,}0 = 19{,}6\ \text{m/s} \approx 20\ \text{m/s}$$

Remarque : ni $t_{sol}$ ni $v_G(t_{sol})$ ne dépendent de la masse de l'objet lâché — exactement la conséquence directe de $\vec{a}_G = \vec{g}$ établie plus haut. Un objet deux fois plus lourd, lâché de la même hauteur, arriverait au sol exactement au même instant, à la même vitesse.

---

## R7 — Application : solide sur un plan incliné, avec frottement

On reprend la méthode de R5, sur un cas plus riche : un solide de masse $m = 1{,}0\ \text{kg}$ glisse, sans vitesse initiale, sur un plan incliné faisant un angle $\alpha = 30^\circ$ avec l'horizontale. Les frottements exercent une force $\vec{f}$, de norme $f = 2{,}0\ \text{N}$, opposée au sens de la descente. On prend $g \approx 9{,}8\ \text{m}\cdot\text{s}^{-2}$.

### Bilan des forces et repère

**Bilan :** le poids $\vec{P}$ (vertical, vers le bas, $P = mg$), la réaction normale du plan $\vec{N}$ (perpendiculaire au plan, dirigée vers l'extérieur du plan), le frottement $\vec{f}$ (le long du plan, opposé au sens de la descente, donc dirigé vers le haut du plan).

**Repère :** axe $Ox$ le long du plan, orienté dans le sens de la descente ; axe $Oy$ perpendiculaire au plan, orienté vers l'extérieur (là où pointe $\vec{N}$).

### Pourquoi le poids se décompose en $mg\sin\alpha$ et $mg\cos\alpha$

Le poids $\vec{P}$ est toujours vertical, mais le repère qu'on vient de choisir est incliné par rapport à la verticale — d'où la nécessité de décomposer $\vec{P}$ selon $Ox$ et $Oy$.

*Ce qu'on cherche ici, et pourquoi ce geste :* pour vérifier que la décomposition est dans le bon sens, regarde les deux cas extrêmes. Si $\alpha \to 0^\circ$ (le plan devient horizontal), le poids ne doit avoir AUCUNE composante le long du plan, et toute sa norme doit se retrouver perpendiculairement : c'est bien ce que donnent $\sin 0^\circ = 0$ et $\cos 0^\circ = 1$. Si $\alpha \to 90^\circ$ (le plan devient vertical, une chute libre le long d'une paroi), le poids doit se retrouver ENTIÈREMENT le long du plan : $\sin 90^\circ = 1$ et $\cos 90^\circ = 0$ confirment ça aussi. C'est ce test aux deux extrêmes qui fixe, sans ambiguïté, que la composante le long du plan est $mg\sin\alpha$ et la composante perpendiculaire est $mg\cos\alpha$ — pas l'inverse.

$$P_x = mg\sin\alpha \qquad P_y = -mg\cos\alpha$$

(le signe négatif sur $P_y$ vient de ce que la composante perpendiculaire du poids pointe vers l'intérieur du plan, à l'opposé du sens choisi pour $Oy$).

[[figure:plan-incline-forces]]

### Deuxième loi, projetée

$$\vec{P} + \vec{N} + \vec{f} = m\,\vec{a}_G$$

**Projection sur $Oy$ :** le solide reste sur le plan, donc $a_{G,y} = 0$.

$$-mg\cos\alpha + N = 0$$

$$N = mg\cos\alpha$$

$$N = 1{,}0 \times 9{,}8 \times \cos 30^\circ \approx 1{,}0 \times 9{,}8 \times 0{,}87 \approx 8{,}5\ \text{N}$$

**Projection sur $Ox$ :** le frottement s'oppose à la descente, donc sa composante selon $Ox$ (orienté dans le sens de la descente) est $-f$.

$$mg\sin\alpha - f = m\,a_{G,x}$$

$$a_{G,x} = g\sin\alpha - \frac{f}{m}$$

$$a_{G,x} = 9{,}8 \times \sin 30^\circ - \frac{2{,}0}{1{,}0} = 9{,}8 \times 0{,}5 - 2{,}0 = 4{,}9 - 2{,}0 = 2{,}9\ \text{m}\cdot\text{s}^{-2}$$

Le solide accélère bien dans le sens de la descente ($a_{G,x} > 0$), parce que la composante motrice du poids ($4{,}9\ \text{N}$, en divisant par $m=1{,}0$ kg cela donne $4{,}9\ \text{m}\cdot\text{s}^{-2}$) l'emporte sur le frottement résistant. Si le frottement avait été plus grand que $mg\sin\alpha$, on aurait trouvé $a_{G,x} < 0$ : le solide, s'il était déjà en mouvement, aurait décéléré ; s'il partait du repos, il ne se serait tout simplement pas mis en mouvement — le frottement statique aurait suffi à le retenir, un cas qui sort du cadre de ce chapitre mais qu'il est utile de savoir reconnaître.

---

## R8 — Pour t'entraîner

### Récapitulatif express

- Un mouvement se décrit toujours par rapport à un **référentiel** ; les lois de Newton n'y sont valables que si ce référentiel est **galiléen** (référentiel terrestre, géocentrique, héliocentrique selon l'échelle du problème).
- Le **centre d'inertie $G$** représente tout le solide en translation ; son vecteur vitesse $\vec{v}_G$ et son vecteur accélération $\vec{a}_G = \dfrac{d\vec{v}_G}{dt}$ sont des VECTEURS, pas de simples nombres.
- **1ʳᵉ loi (principe d'inertie) :** $\sum \vec{F}_{ext} = \vec{0} \iff \vec{v}_G$ constant. Ce n'est pas le mouvement qui a besoin d'une force, c'est sa VARIATION — c'est exactement ce que le palet de R0 démontrait.
- **2ᵉ loi :** $\sum \vec{F}_{ext} = m\,\vec{a}_G$. La masse mesure l'inertie : à force égale, un solide plus massif accélère moins.
- **3ᵉ loi (actions réciproques) :** $\vec{F}_{B \to A} = -\vec{F}_{A \to B}$, toujours vraie, sur deux corps DIFFÉRENTS — à ne jamais confondre avec deux forces en équilibre sur un même corps.
- **Méthode :** système + référentiel → bilan des forces → $\sum \vec{F}_{ext} = m\,\vec{a}_G$ → repère et projection → équations scalaires.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Une caisse de masse $m = 25\ \text{kg}$, initialement immobile sur un sol horizontal, est tirée par une corde qui exerce une force horizontale de tension $T = 100\ \text{N}$, dans le sens du mouvement. Les frottements exercent une force constante $f = 60\ \text{N}$, opposée au mouvement. On prend $g \approx 9{,}8\ \text{m}\cdot\text{s}^{-2}$.

**1) Faire le bilan des forces et déterminer la valeur de l'accélération $a_G$ de la caisse pendant qu'elle est tirée.**

*Ce qu'on cherche ici, et pourquoi ce geste :* quatre forces au total (poids, réaction normale, tension, frottement) ; on projette d'abord verticalement pour confirmer que $N$ n'intervient pas horizontalement, puis on résout selon l'axe du mouvement.

Sur l'axe vertical : $N = mg$ (le mouvement reste horizontal). Sur l'axe horizontal, dans le sens du mouvement :

$$T - f = m\,a_G$$

$$a_G = \frac{T - f}{m} = \frac{100 - 60}{25} = 1{,}6\ \text{m}\cdot\text{s}^{-2}$$

**2) En partant du repos, quelle vitesse la caisse atteint-elle après avoir parcouru $d = 5{,}0\ \text{m}$ ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* l'accélération étant constante (question 1), on réutilise la relation entre vitesse, accélération et distance parcourue du mouvement uniformément accéléré, sans repasser par le temps.

$$v_G^2 = 2\,a_G\,d = 2 \times 1{,}6 \times 5{,}0 = 16$$

$$v_G = \sqrt{16} = 4{,}0\ \text{m/s}$$

**3) À l'instant où elle atteint cette vitesse, la corde est coupée. Le frottement, lui, continue de s'exercer. La caisse s'arrête-t-elle immédiatement ? Justifier à l'aide d'une des lois du chapitre.**

*Ce qu'on cherche ici, et pourquoi ce geste :* c'est une question de principe, pas de calcul — elle teste directement si tu confonds « il n'y a plus de force motrice » avec « il n'y a plus de mouvement du tout ».

Non, la caisse ne s'arrête pas immédiatement. Une fois la corde coupée, la seule force horizontale restante est le frottement $f = 60\ \text{N}$, opposé au mouvement : $\sum \vec{F}_{ext} \neq \vec{0}$ (le poids et $N$ se compensent verticalement, mais $f$ subsiste horizontalement), donc, par la deuxième loi, $\vec{a}_G \neq \vec{0}$ — mais cette accélération est maintenant dirigée en sens INVERSE du mouvement (une décélération). La vitesse diminue progressivement jusqu'à s'annuler ; elle ne tombe pas à zéro instantanément, exactement comme le principe d'inertie l'impose : il faut une durée, pas un instant, pour faire varier un vecteur vitesse non nul jusqu'à zéro sous l'effet d'une force finie.

**4) On remplace la caisse par une caisse de masse $2m = 50\ \text{kg}$ (donc de poids double), tirée par la même tension $T = 100\ \text{N}$ et freinée par le même frottement $f = 60\ \text{N}$. Que devient l'accélération pendant la traction ? Commenter le rôle de la masse et celui du poids dans ce résultat.**

*Ce qu'on cherche ici, et pourquoi ce geste :* cette question sépare explicitement l'effet de la masse (qui apparaît directement dans la deuxième loi) de celui du poids (qui, ici, ne joue aucun rôle dans l'équation horizontale).

$$a_G' = \frac{T - f}{2m} = \frac{100 - 60}{50} = 0{,}8\ \text{m}\cdot\text{s}^{-2}$$

L'accélération est divisée par deux exactement quand la masse double — conforme à la deuxième loi, $a_G = \sum F_{ext}/m$. Remarque bien que le POIDS, qui a doublé lui aussi, n'apparaît nulle part dans ce calcul : il est intégralement compensé par $N$ sur l'axe vertical, et n'a aucun effet sur le mouvement horizontal. C'est la MASSE, pas le poids, qui gouverne la résistance au changement de vitesse ici.

### À toi

**Variation 1.** On lâche, sans vitesse initiale et en chute libre, un même objet depuis la même hauteur, une fois sur Terre ($g \approx 9{,}8\ \text{N/kg}$) et une fois sur la Lune ($g \approx 1{,}6\ \text{N/kg}$). Sans reprendre tout le calcul de R6, indique sur laquelle des deux la chute dure le plus longtemps, et justifie ta réponse à partir de la relation $\vec{a}_G = \vec{g}$ établie en R6 — en particulier, précise si la masse de l'objet change quoi que ce soit à ta réponse.

**Variation 2.** Un solide est lâché sans vitesse initiale en haut d'un plan incliné, une fois SANS frottement, une fois AVEC frottement (même angle, même masse dans les deux cas). Décris, sans calcul, comment évolue le vecteur $\vec{v}_G$ pendant la descente dans chacun des deux cas (direction, sens, norme), puis explique dans lequel des deux cas l'accélération $a_{G,x}$ est la plus grande, en t'appuyant sur le bilan des forces établi en R7.
