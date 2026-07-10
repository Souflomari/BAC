# Suivi temporel d'une transformation — vitesse de réaction

---

## R0 — Accroche : la teinte qui apparaît, minute après minute

Rappelle-toi la réaction du chapitre précédent : les ions peroxodisulfate $S_2O_8^{2-}$ et les ions iodure $I^-$ réagissent lentement pour donner des ions sulfate et du diiode $I_2$ — une espèce qui colore la solution d'une teinte jaune-brune de plus en plus marquée. Tu as utilisé cette teinte pour UNE SEULE chose : chronométrer la durée totale de la transformation. 40 minutes à température ambiante, 6 minutes à $50\,^\circ\text{C}$. Un chronomètre, un nombre, un point final.

Mais si, au lieu d'attendre la fin, tu mesurais l'intensité de cette teinte minute après minute, dès l'instant où tu mélanges les réactifs — et que tu portais chaque mesure sur un graphique, avec le temps en abscisse et la quantité de diiode formé en ordonnée ?

Avant de lire la suite, prends position, en une phrase : à quoi ressemblerait cette courbe, à ton avis ? Une droite qui monte à rythme constant, à la même vitesse du début à la fin ? Ou une courbe qui grimpe vite au tout début, puis de plus en plus lentement, jusqu'à devenir presque plate bien avant que tu n'aies arrêté ton chronomètre ?

[[figure:prediction-avancement]]

Voici ce qu'on observe réellement, si on prend une mesure toutes les minutes : la courbe ne monte JAMAIS à rythme constant. Elle grimpe vite dès les premières minutes, puis ralentit sans cesse, et devient quasiment horizontale largement avant la « fin » que tu chronométrais dans le chapitre précédent. Si tu avais prédit une droite, l'écart avec cette observation est justement ce qu'on va comprendre. Si tu avais deviné le ralentissement, la vraie question commence maintenant : comment transformer cette courbe en un nombre précis — une vitesse, à un instant donné, exprimée dans une unité — plutôt qu'une impression visuelle de « ça ralentit » ?

C'est exactement la promesse du chapitre précédent : mesurer une grandeur physique liée à l'avancement de la réaction, minute après minute, pour en tirer une vitesse chiffrée. C'est l'objet de cette leçon : comment suivre une transformation dans le temps, comment construire et lire sa courbe d'avancement $x(t)$, comment en extraire une vitesse volumique de réaction à n'importe quel instant, et comment repérer un repère de durée particulier, le temps de demi-réaction.

---

## R1 — Le mécanisme : suivre une transformation qui dure

### La condition pour qu'un suivi ait un sens

Suivre une transformation dans le temps, concrètement, ça veut dire choisir une grandeur physique qu'on peut mesurer facilement et à répétition — une couleur, une conductivité, un pH, un volume de gaz — et s'en servir comme substitut de l'avancement $x$, qu'on ne peut pas mesurer directement.

Pour que ce substitut soit utilisable, une seule condition compte vraiment : la grandeur mesurée doit varier de façon connue et monotone avec l'avancement — elle doit croître (ou décroître) tout du long, sans stagner ni changer de sens, pour qu'à chaque valeur mesurée corresponde une seule valeur de $x$. Si la grandeur choisie ne bouge pas du tout pendant que la réaction avance, ou si elle varie de façon ambiguë, le suivi ne dit rien : tu peux prendre autant de mesures que tu veux, tu ne sauras jamais où en est la transformation.

*Ce qu'on cherche ici, et pourquoi ce geste :* avant même de choisir UNE méthode de suivi, il faut vérifier que la réaction étudiée fait bien varier, de façon monotone, la grandeur que cette méthode mesure. C'est ce test — pas la disponibilité de l'appareil — qui décide si une méthode convient.

### Une méthode chimique : le titrage, par prélèvements bloqués

La méthode la plus générale, applicable à n'importe quelle transformation, est le **titrage** (dosage) : à intervalles réguliers, on prélève un petit volume du mélange réactionnel (une **prise d'essai**), puis on dose l'une des espèces qu'il contient pour en déduire l'avancement à cet instant précis.

Il y a un piège évident : un titrage prend du temps — plusieurs minutes, parfois. Si la réaction continuait à avancer DANS l'échantillon prélevé pendant qu'on le dose, le résultat du dosage ne représenterait plus l'avancement au moment du prélèvement, mais un avancement plus grand, mesuré trop tard. C'est pour ça qu'on réalise une **trempe** : on bloque brutalement la réaction dans l'échantillon, en général en le diluant fortement dans de l'eau glacée.

*Ce qu'on cherche ici, et pourquoi ce geste :* pourquoi une trempe fonctionne-t-elle ? Parce qu'elle actionne exactement les deux leviers établis au chapitre précédent, mais dans le sens qui ralentit : diluer l'échantillon abaisse fortement les concentrations des réactifs restants, et le refroidir abaisse fortement la température. Les deux facteurs cinétiques — concentration et température — s'effondrent en même temps, donc la vitesse de la réaction dans l'échantillon s'effondre elle aussi, jusqu'à devenir négligeable pendant la durée du dosage. La trempe ne stoppe pas la réaction au sens strict ; elle la ralentit assez pour que son avancement, à l'échelle de temps du dosage, reste pratiquement figé.

Le titrage a un défaut pratique : il est **destructif** (l'échantillon prélevé est consommé par le dosage) et **discontinu** (chaque point de la courbe $x(t)$ coûte un prélèvement, une trempe, et un dosage complet). Pour tracer une courbe précise, il faut donc répéter l'opération de nombreuses fois.

### Des méthodes physiques : continues, non destructives

Quand la réaction s'y prête, on préfère des méthodes physiques : elles mesurent en continu, sans prélever ni détruire l'échantillon, une grandeur directement liée à l'avancement.

- **La conductimétrie.** On mesure la conductivité de la solution en continu, à l'aide d'électrodes plongées dans le mélange. Elle convient quand la réaction met en jeu des ions dont la disparition ou l'apparition fait varier la conductivité globale de façon monotone avec $x$ (des ions consommés et des ions formés ne conduisent pas tous également). Elle ne convient pas à une réaction qui ne met en jeu aucune espèce ionique.
- **La pH-métrie.** On mesure le pH en continu, à l'aide d'une électrode. Elle convient quand la réaction consomme ou produit des ions oxonium $H_3O^+$ ou hydroxyde $HO^-$ — typiquement une réaction acide-base. Sur une réaction qui ne touche à aucun de ces ions, le pH resterait constant : inutile ici.
- **Le suivi manométrique ou la mesure de volume gazeux.** Quand la réaction dégage un gaz, on peut mesurer soit la pression dans une enceinte fermée à volume constant (elle augmente avec la quantité de gaz formé), soit le volume de gaz recueilli à pression constante (par déplacement d'eau dans une éprouvette renversée, par exemple). Dans les deux cas, la grandeur mesurée croît de façon monotone avec $x$, précisément parce que la quantité de gaz formé lui est directement proportionnelle.
- **La spectrophotométrie.** On mesure l'absorbance de la solution, à une longueur d'onde choisie, à l'aide d'un spectrophotomètre. Elle convient quand un réactif ou un produit est coloré : la loi de Beer-Lambert relie alors l'absorbance à la concentration de l'espèce colorée de façon directement proportionnelle — donc monotone avec $x$. Sans espèce colorée, l'absorbance ne dirait rien de l'avancement.

### Retour au fil rouge : pourquoi la spectrophotométrie convient ici

La réaction $S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$ produit du diiode $I_2$, une espèce colorée — c'est exactement la teinte jaune-brune que tu as déjà rencontrée. C'est donc un candidat naturel pour la spectrophotométrie : au lieu de se contenter d'observer la couleur à l'oeil pour chronométrer une fin de réaction, on mesure précisément l'absorbance de la solution minute après minute, et on en déduit la concentration de diiode formé à chaque instant. (La conductimétrie fonctionnerait aussi, dans son principe, puisque des ions sont consommés et formés dans cette réaction — mais on garde ici la spectrophotométrie, qui exploite directement la teinte déjà observée.)

C'est cette mesure — l'absorbance, convertie en concentration de diiode, convertie en avancement — qui va nous servir de matière première dans le rung suivant.

---

## R2 — Tableau d'avancement, $x(t)$ et vitesse volumique de réaction

### Reconstruire le tableau d'avancement

Reprends l'équation établie au chapitre précédent, et fixe des quantités de matière initiales concrètes. On mélange $n_0(S_2O_8^{2-}) = 5{,}0\ \text{mmol}$ d'ions peroxodisulfate avec $n_0(I^-) = 40\ \text{mmol}$ d'ions iodure (en large excès), dans un volume total $V = 100\ \text{mL} = 0{,}100\ \text{L}$ qu'on suppose constant tout au long de la transformation.

| | $S_2O_8^{2-}$ | $2I^-$ | $2SO_4^{2-}$ | $I_2$ |
|---|---|---|---|---|
| État initial ($t=0$) | $5{,}0$ | $40$ | $0$ | $0$ |
| À l'avancement $x$ | $5{,}0 - x$ | $40 - 2x$ | $2x$ | $x$ |

(quantités en mmol)

*Ce qu'on cherche ici, et pourquoi ce geste :* pour trouver l'avancement maximal $x_{max}$, on identifie le réactif limitant — celui qui s'annule le premier. $S_2O_8^{2-}$ s'annule pour $x = 5{,}0\ \text{mmol}$ ; $I^-$ ne s'annulerait que pour $x = 20\ \text{mmol}$ (bien au-delà). C'est donc $S_2O_8^{2-}$ qui est limitant, et en admettant que la réaction est totale :

$$x_{max} = 5{,}0\ \text{mmol}$$

### De la couleur à l'avancement : $x(t)$

Ce que tu connaissais déjà du tableau d'avancement, c'était son état final — une seule valeur de $x$, celle atteinte quand la réaction s'arrête. Ici, la nouveauté, c'est de traiter $x$ comme une fonction du temps, $x(t)$ : à chaque instant $t$ après le mélange des réactifs, l'avancement a une valeur précise, comprise entre $0$ et $x_{max}$, et cette valeur augmente au fur et à mesure que la réaction progresse.

Le lien avec la mesure spectrophotométrique est direct : le diiode a un coefficient stoechiométrique de $1$ dans l'équation, donc sa concentration à l'instant $t$ vaut exactement $[I_2](t) = \dfrac{x(t)}{V}$. En mesurant l'absorbance (donc $[I_2]$) à chaque instant, on remonte donc directement à $x(t)$ en multipliant par $V$.

*Attention, un piège à noter :* ce lien direct entre concentration mesurée et $x/V$ ne fonctionne aussi simplement que parce que le coefficient de $I_2$ vaut $1$. Si on avait choisi de suivre une espèce de coefficient différent — les ions sulfate, par exemple, de coefficient $2$ — il aurait fallu diviser sa concentration par ce coefficient avant de l'assimiler à $x/V$. C'est justement pour éviter cette complication qu'on choisit ici de suivre le diiode.

### Définir la vitesse volumique de réaction

L'avancement $x(t)$ grimpe puis ralentit, comme tu l'as anticipé en R0 — mais « ça ralentit » n'est pas un nombre. Pour quantifier à quel rythme la réaction avance à un instant donné, on définit la **vitesse volumique de réaction** :

$$v = \frac{1}{V}\frac{dx}{dt}$$

**Pourquoi le $1/V$ ?** Imagine deux expériences strictement identiques en concentrations, mais où la seconde utilise un volume de solution deux fois plus grand que la première. Il y a alors deux fois plus d'entités réactives en tout dans la seconde expérience, donc $\dfrac{dx}{dt}$ y est environ deux fois plus grand — sans que la réaction soit, au sens chimique, « deux fois plus rapide » : les concentrations, donc la fréquence des chocs par unité de volume, sont identiques dans les deux cas. Diviser par $V$ élimine cette dépendance à la taille de l'échantillon : $v$ ne dépend plus que des conditions réelles de la réaction (concentrations, température), exactement comme une concentration (en mol/L) ne dépend pas de la taille de l'échantillon, contrairement à une quantité de matière brute (en mol).

**Unité.** $x$ s'exprime en mol, $t$ en seconde, $V$ en litre, donc :

$$[v] = \frac{\text{mol}}{\text{L}\cdot\text{s}} = \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

C'est l'unité de référence. Si le graphe est gradué en minutes, on peut exprimer $v$ en $\text{mol}\cdot\text{L}^{-1}\cdot\text{min}^{-1}$, à condition de le préciser clairement — l'important est la cohérence de l'unité de temps utilisée.

[[figure:avancement-tangente]]

### Lecture graphique : la tangente, et comment l'estimer sans tangente tracée

$\dfrac{dx}{dt}$, à un instant $t$, c'est la pente de la tangente à la courbe $x(t)$ en ce point. Quand cette tangente est directement tracée sur un graphe (par exemple fournie dans un énoncé), on lit les coordonnées de deux points de cette droite et on calcule sa pente. Mais si on ne dispose que d'un tableau de mesures — comme ici — on peut estimer cette pente en traçant la **sécante** entre les deux points du tableau qui encadrent symétriquement l'instant visé.

*Ce qu'on cherche ici, et pourquoi ce geste :* pourquoi cette sécante symétrique approche-t-elle la tangente ? Parce que la tangente est la limite des sécantes quand les deux points qui l'encadrent se rapprochent l'un de l'autre. Une sécante prise juste avant et juste après l'instant visé, à distance égale, compense les écarts de premier ordre de part et d'autre — elle donne une bien meilleure approximation de la pente locale qu'une sécante prise uniquement après (ou uniquement avant) l'instant visé.

### Exemple travaillé : mesures sur la réaction $S_2O_8^{2-}/I^-$

Voici des valeurs de $x(t)$ obtenues par spectrophotométrie sur le mélange décrit plus haut ($n_0(S_2O_8^{2-}) = 5{,}0\ \text{mmol}$, $V = 0{,}100\ \text{L}$) :

| $t$ (min) | $0$ | $4$ | $8$ | $12$ | $16$ | $20$ | $30$ | $40$ | $60$ |
|---|---|---|---|---|---|---|---|---|---|
| $x$ (mmol) | $0{,}0$ | $1{,}4$ | $2{,}5$ | $3{,}4$ | $4{,}0$ | $4{,}3$ | $4{,}7$ | $4{,}85$ | $4{,}97$ |

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut $v$ à $t = 8\ \text{min}$. On construit la sécante entre les points encadrants $t = 4\ \text{min}$ et $t = 12\ \text{min}$, on en tire la pente, puis on divise par $V$ — jamais l'inverse.

$$\text{pente} \approx \frac{x(12) - x(4)}{12 - 4} = \frac{3{,}4 - 1{,}4}{8} = 0{,}25\ \text{mmol/min}$$

$$v(8\ \text{min}) = \frac{1}{V}\times\text{pente} = \frac{0{,}25\times10^{-3}}{0{,}100 \times 60}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

$$v(8\ \text{min}) \approx 4{,}2\times10^{-5}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

Garde cette valeur et ce tableau : ils reviennent dans les rungs suivants.

*Remarque en passant :* en toute rigueur, une transformation lente s'approche de son état final progressivement, de plus en plus lentement, sans qu'on puisse désigner un instant exact où elle « s'arrête » tout à fait — regarde la dernière ligne du tableau, $x$ s'approche de $x_{max} = 5{,}0\ \text{mmol}$ sans jamais l'atteindre exactement dans ces mesures. En pratique, on considère la transformation terminée dès que $x(t)$ ne varie plus de façon mesurable — dès que la courbe devient horizontale à l'oeil.

---

## R3 — Pourquoi la vitesse diminue au cours du temps

### Teste l'idée naïve avant de la croire : « la vitesse est constante »

Une intuition trompeuse consiste à imaginer une transformation chimique comme une voiture qui roulerait à vitesse constante : l'avancement progresserait alors régulièrement, au même rythme du début à la fin, et $x(t)$ serait une droite.

Regarde le tableau de R2 : entre $t=0$ et $t=4\ \text{min}$, $x$ gagne $1{,}4\ \text{mmol}$, soit un rythme de $0{,}35\ \text{mmol/min}$. Entre $t=40$ et $t=60\ \text{min}$, $x$ ne gagne plus que $0{,}12\ \text{mmol}$ en $20$ minutes, soit $0{,}006\ \text{mmol/min}$ — près de $60$ fois moins vite. Une droite unique ne peut pas passer par des points aussi inégalement espacés : l'hypothèse « vitesse constante » est directement contredite par les mesures elles-mêmes.

### Ce que dit vraiment la vitesse volumique

$v(t)$ est **maximale tout au début** de la réaction (au tout premier instant, la pente de $x(t)$ est la plus raide de toute la courbe) et **diminue continûment** ensuite, en tendant vers zéro à mesure que la réaction s'achève.

[[figure:tangentes-decroissantes]]

Reprends le calcul de R2 : $v(8\ \text{min}) \approx 4{,}2\times10^{-5}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$. Calculons maintenant $v(30\ \text{min})$, avec la même méthode de sécante symétrique, en utilisant les points $t=20\ \text{min}$ et $t=40\ \text{min}$ du tableau :

$$\text{pente} \approx \frac{x(40) - x(20)}{40 - 20} = \frac{4{,}85 - 4{,}3}{20} = 0{,}0275\ \text{mmol/min}$$

$$v(30\ \text{min}) = \frac{1}{V}\times\text{pente} \approx 4{,}6\times10^{-6}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

La vitesse a été divisée par environ $9$ entre $t=8\ \text{min}$ et $t=30\ \text{min}$ : une chute nette, pas une petite variation.

### Le lien avec les chocs efficaces

Pourquoi cette chute ? Reviens au modèle du chapitre précédent : seuls les chocs efficaces entre entités réactives font avancer une transformation, et leur fréquence dépend directement de la concentration des réactifs — plus il y a d'entités par unité de volume, plus elles se croisent souvent.

Or regarde le tableau d'avancement de R2 : les quantités de réactifs restants, $5{,}0 - x$ pour $S_2O_8^{2-}$ et $40 - 2x$ pour $I^-$, DIMINUENT continûment à mesure que $x$ augmente. Moins de réactifs restants, c'est moins d'entités par unité de volume, donc moins de chocs par seconde, donc moins de chocs efficaces par seconde — donc une vitesse plus faible. C'est exactement le même mécanisme qu'en R3-R4 du chapitre précédent, appliqué non plus à une comparaison entre deux expériences différentes, mais à l'évolution d'UNE SEULE expérience au cours du temps : au fur et à mesure qu'elle avance, une transformation consomme ses propres réactifs, donc ralentit elle-même sa propre progression.

*Ce qu'on cherche ici, et pourquoi ce geste :* c'est une idée à bien distinguer de celles du chapitre précédent. Là-bas, on comparait deux expériences DIFFÉRENTES (concentrations initiales différentes, ou températures différentes) pour isoler l'effet d'un facteur. Ici, on regarde comment UNE SEULE expérience évolue dans le temps : les concentrations chutent au fil de la réaction elle-même, pas parce qu'on a changé les conditions de départ.

### Conséquence pratique

Puisque $v$ n'est pas constante, tu ne peux jamais obtenir une vitesse instantanée valable en divisant simplement « la quantité totale produite » par « le temps total écoulé » — ce calcul donnerait une vitesse MOYENNE sur tout l'intervalle, pas la vitesse à un instant précis. Pour connaître $v$ à un instant donné, il faut toujours revenir à la pente locale de la courbe $x(t)$ en ce point — la tangente, ou son estimation par sécante symétrique vue en R2.

---

## R4 — Le temps de demi-réaction $t_{1/2}$

### Définition

Le **temps de demi-réaction** $t_{1/2}$ est l'instant où l'avancement atteint la moitié de sa valeur finale :

$$x(t_{1/2}) = \frac{x_{max}}{2}$$

### Pourquoi cet instant est unique

$x(t)$ ne fait qu'augmenter au cours du temps — un avancement ne peut jamais reculer, une transformation ne « redonne » pas ses produits en réactifs spontanément une fois formés (dans le cadre de ce chapitre). $x(t)$ croît donc continûment de $0$ à $x_{max}$, sans jamais redescendre : elle traverse forcément la valeur $x_{max}/2$ une fois, et une seule. C'est ce qui rend $t_{1/2}$ parfaitement défini, sans ambiguïté, quelle que soit l'allure exacte de la courbe.

### Lecture graphique

Concrètement : on repère (ou on calcule à partir du tableau d'avancement) la valeur $x_{max}$ — le plateau vers lequel la courbe tend. On calcule $x_{max}/2$. On trace une droite horizontale à cette hauteur sur le graphe $x(t)$ ; le point où elle coupe la courbe donne, en abscisse, $t_{1/2}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* reprends le tableau de R2. $x_{max} = 5{,}0\ \text{mmol}$, donc $x_{max}/2 = 2{,}5\ \text{mmol}$. Le tableau donne directement $x(8\ \text{min}) = 2{,}5\ \text{mmol}$ :

$$t_{1/2} = 8\ \text{min}$$

Remarque : c'est exactement l'instant qu'on a utilisé en R2 pour calculer $v(8\ \text{min})$ — pas un hasard de la nature, mais un choix pour que tu repères tout de suite où $t_{1/2}$ se situe sur la courbe qu'on vient d'étudier en détail.

[[figure:temps-demi-reaction]]

### À quoi sert $t_{1/2}$

$t_{1/2}$ condense en un seul nombre ce qui prendrait sinon toute une courbe à décrire : une durée caractéristique, facile à comparer d'une expérience à l'autre. Reprends les facteurs cinétiques du chapitre précédent : une expérience menée à plus haute température, ou à concentrations initiales plus élevées, atteint son avancement final plus vite — donc son $t_{1/2}$ est plus court. Comparer deux valeurs de $t_{1/2}$ revient ainsi à comparer directement la rapidité de deux transformations, sans avoir à comparer deux courbes entières point par point.

---

## R5 — Pour t'entraîner

### Récapitulatif express

- Suivre une transformation, c'est mesurer une grandeur physique liée de façon monotone à l'avancement $x$ : titrage (méthode chimique, par prélèvements bloqués par trempe), conductimétrie, pH-métrie, suivi manométrique ou volume gazeux, spectrophotométrie (méthodes physiques, continues).
- La vitesse volumique de réaction : $v = \dfrac{1}{V}\dfrac{dx}{dt}$, en $\text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$ ; graphiquement, la pente de la tangente à $x(t)$ divisée par $V$.
- $v(t)$ diminue continûment au cours du temps : maximale au début, elle tend vers zéro quand la réaction s'achève — parce que les concentrations des réactifs chutent, donc les chocs efficaces se raréfient (lien avec le chapitre précédent).
- Le temps de demi-réaction $t_{1/2}$ : l'instant où $x(t_{1/2}) = x_{max}/2$, lu graphiquement ; un repère de durée pratique pour comparer la rapidité de deux transformations.

### Exercice de type bac (original — entraînement, non un sujet officiel)

On étudie la même réaction, $S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$, en mélangeant $n_0(S_2O_8^{2-}) = 4{,}0\ \text{mmol}$ d'ions peroxodisulfate avec $n_0(I^-) = 30\ \text{mmol}$ d'ions iodure (en excès), dans un volume total $V = 200\ \text{mL} = 0{,}200\ \text{L}$ supposé constant. Un suivi spectrophotométrique donne :

| $t$ (min) | $0$ | $5$ | $10$ | $15$ | $20$ | $30$ | $40$ | $60$ |
|---|---|---|---|---|---|---|---|---|
| $x$ (mmol) | $0{,}0$ | $1{,}2$ | $2{,}0$ | $2{,}6$ | $3{,}0$ | $3{,}5$ | $3{,}75$ | $3{,}92$ |

**1) Dresser le tableau d'avancement et déterminer l'avancement maximal $x_{max}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie le réactif limitant en comparant, pour chaque réactif, la quantité initiale à son coefficient stoechiométrique — celui qui s'annulerait en premier fixe $x_{max}$.

$S_2O_8^{2-}$ s'annule pour $x = 4{,}0\ \text{mmol}$ ; $I^-$ ne s'annulerait que pour $x = 15\ \text{mmol}$. $S_2O_8^{2-}$ est donc limitant, et (réaction totale) :

$$x_{max} = 4{,}0\ \text{mmol}$$

Cohérent avec le tableau de mesures, qui s'approche bien de $3{,}9\text{-}4{,}0\ \text{mmol}$ aux temps longs.

**2) La tangente à la courbe $x(t)$ en $t=10\ \text{min}$ passe par les points $(5\ \text{min} ; 1{,}2\ \text{mmol})$ et $(15\ \text{min} ; 2{,}6\ \text{mmol})$. Calculer $v(10\ \text{min})$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la tangente est donnée directement par deux de ses points — on calcule sa pente, puis on divise par $V$, jamais l'inverse.

$$\text{pente} = \frac{2{,}6 - 1{,}2}{15 - 5} = \frac{1{,}4}{10} = 0{,}14\ \text{mmol/min}$$

$$v(10\ \text{min}) = \frac{1}{V}\times\text{pente} = \frac{0{,}14\times10^{-3}}{0{,}200\times 60}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

$$v(10\ \text{min}) \approx 1{,}2\times10^{-5}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

**3) Déterminer graphiquement le temps de demi-réaction $t_{1/2}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* $t_{1/2}$ correspond à $x = x_{max}/2$ ; on cherche cette valeur directement dans le tableau plutôt que de la deviner.

$$\frac{x_{max}}{2} = \frac{4{,}0}{2} = 2{,}0\ \text{mmol}$$

Le tableau donne $x(10\ \text{min}) = 2{,}0\ \text{mmol}$ exactement, donc :

$$t_{1/2} = 10\ \text{min}$$

**4) Sachant que la tangente en $t=30\ \text{min}$ passe par les points $(20\ \text{min} ; 3{,}0\ \text{mmol})$ et $(40\ \text{min} ; 3{,}75\ \text{mmol})$, calculer $v(30\ \text{min})$, comparer à $v(10\ \text{min})$, et expliquer l'écart à l'aide du modèle des chocs efficaces.**

*Ce qu'on cherche ici, et pourquoi ce geste :* même méthode de calcul qu'en question 2 ; la comparaison doit ensuite être interprétée avec le mécanisme du chapitre précédent, pas seulement constatée numériquement.

$$\text{pente} = \frac{3{,}75 - 3{,}0}{40 - 20} = \frac{0{,}75}{20} = 0{,}0375\ \text{mmol/min}$$

$$v(30\ \text{min}) = \frac{1}{V}\times\text{pente} \approx 3{,}1\times10^{-6}\ \text{mol}\cdot\text{L}^{-1}\cdot\text{s}^{-1}$$

$v(30\ \text{min})$ est environ $3{,}7$ fois plus petite que $v(10\ \text{min})$. Entre ces deux instants, les réactifs ont continué à être consommés : leurs concentrations ont diminué, donc les entités réactives se croisent moins souvent, donc les chocs efficaces par seconde se raréfient — la vitesse volumique de réaction chute, exactement comme prévu par le modèle établi au chapitre précédent.

### À toi

**Variation 1.** On étudie la réaction entre le zinc et l'acide chlorhydrique, qui dégage du dihydrogène gazeux : $Zn + 2H^+ \rightarrow Zn^{2+} + H_2$. On recueille le gaz formé dans une éprouvette renversée sur l'eau, et on mesure son volume $V_{gaz}$ minute après minute. Justifie pourquoi cette méthode de suivi convient à cette réaction (et pas, par exemple, la spectrophotométrie), puis décris, sans calcul, l'allure attendue de la courbe $V_{gaz}(t)$ et explique comment tu situerais un $t_{1/2}$ sur cette courbe.

**Variation 2.** Deux expériences identiques étudient la même transformation lente, sauf que la seconde est menée à une température plus élevée que la première. Sans aucun calcul, indique laquelle des deux a le $t_{1/2}$ le plus court, et justifie ta réponse en combinant les facteurs cinétiques du chapitre précédent (effet de la température sur les chocs efficaces) et la définition graphique de $t_{1/2}$ vue dans ce chapitre.
