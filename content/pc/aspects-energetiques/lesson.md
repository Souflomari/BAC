# Aspects énergétiques

---

## R0 — Accroche : deux billes, deux pistes, même vitesse ?

Imagine deux billes identiques, de même masse, lâchées sans vitesse initiale depuis la même hauteur $h$ au-dessus du sol. La première tombe tout droit, en chute libre verticale — exactement la situation du chapitre lois de Newton. La seconde descend une piste incurvée, en forme de toboggan, qui part du même point de départ et arrive au même niveau, mais en suivant un chemin beaucoup plus long et beaucoup plus sinueux. On néglige les frottements dans les deux cas.

Avant de lire la suite, prends position, vraiment : au moment où chacune des deux billes atteint le sol (ou le bas du toboggan), laquelle des deux arrive avec la plus grande vitesse ? La bille en chute libre, qui tombe tout droit ? La bille sur le toboggan, qui a un chemin bien plus long pour "prendre de l'élan" ? Ou bien les deux arrivent-elles avec exactement la même vitesse ?

Beaucoup de raisonnements naturels penchent pour la chute libre : elle va droit au but, alors que le toboggan s'éternise en détours — on imagine alors que la bille sur le toboggan doit arriver plus lentement, comme si le détour "coûtait" de la vitesse.

Garde ta réponse en tête. Pour trancher cette question proprement, il va falloir un outil qu'on n'a pas encore utilisé dans ce module : jusqu'ici (chapitres lois de Newton, chute et mouvements plans), pour remonter à une vitesse, il fallait toujours écrire le bilan des forces, projeter, puis primitiver — une fois pour la vitesse, une deuxième fois pour la position. Cette leçon construit un raccourci : une grandeur, l'énergie, qui permet de répondre à des questions comme celle-ci sans repasser par tout ce détour de calcul. Et à la fin de cette leçon, on referme cette question avec un argument, pas avec une impression.

---

## R1 — Rappel : l'énergie cinétique d'un solide en translation

Tu as déjà croisé cette grandeur : l'**énergie cinétique** d'un solide de masse $m$, en translation, dont le centre d'inertie $G$ est animé d'une vitesse de norme $v$, vaut :

$$E_c = \frac{1}{2} m v^2$$

Elle s'exprime en joules (J) quand $m$ est en kilogrammes et $v$ en mètres par seconde. C'est une grandeur scalaire, toujours positive ou nulle — elle ne porte pas de direction, contrairement au vecteur vitesse $\vec{v}_G$ dont elle dérive.

### Pourquoi le carré, et pas simplement $v$ ?

Arrête-toi une seconde sur ce que dit cette formule : $E_c$ ne double pas quand $v$ double — elle quadruple. Double la vitesse d'une voiture, et l'énergie cinétique qu'il faudrait dissiper pour l'arrêter est multipliée par quatre, pas par deux. C'est une conséquence directe du carré dans la formule, et ce n'est pas un détail : c'est exactement pour cette raison qu'un choc à grande vitesse est tellement plus destructeur qu'un choc à vitesse modérée.

*Exemple immédiat.* Une bille de masse $m = 0{,}20\ \text{kg}$ à $v = 2{,}0\ \text{m/s}$ a une énergie cinétique :

$$E_c = \frac{1}{2} \times 0{,}20 \times 2{,}0^2 = 0{,}40\ \text{J}$$

Si sa vitesse double, $v = 4{,}0\ \text{m/s}$ :

$$E_c = \frac{1}{2} \times 0{,}20 \times 4{,}0^2 = 1{,}6\ \text{J}$$

$1{,}6$ vaut quatre fois $0{,}40$ — pas deux fois. Retiens ce réflexe : $E_c$ varie comme $v^2$, jamais comme $v$.

Cette grandeur va être au centre de toute la leçon : le rung suivant construit l'outil qui relie ses variations aux forces qui s'exercent sur le solide.

---

## R2 — Le mécanisme : le théorème de l'énergie cinétique

### La question que ce rung résout

On sait, depuis les lois de Newton, que la somme des forces détermine l'accélération : $\sum \vec{F}_{ext} = m\vec{a}_G$. Mais retrouver une vitesse à partir de là demande, en général, tout un détour : bilan des forces, projection, primitivation une fois pour la vitesse, une deuxième fois pour la position. Ce rung construit un raccourci qui relie directement les forces à la variation de $E_c$, sans repasser par tout ce détour.

### D'abord : le travail d'une force constante

Avant d'énoncer le théorème, il faut un outil : le **travail** d'une force. Pour une force $\vec{F}$ constante (en norme et en direction) qui s'exerce sur un solide pendant qu'il se déplace d'un point $A$ à un point $B$, le travail de cette force vaut :

$$W(\vec{F}) = \vec{F} \cdot \vec{AB} = F \times AB \times \cos\theta$$

où $\theta$ est l'angle entre $\vec{F}$ et le déplacement $\vec{AB}$. C'est un produit scalaire : il ne mesure que la partie de $\vec{F}$ qui est alignée avec le déplacement — la partie perpendiculaire au déplacement ne travaille pas du tout.

Trois cas à distinguer, selon le signe de $\cos\theta$ :

- si $0^\circ \leq \theta < 90^\circ$ (la force pousse globalement dans le sens du mouvement), $\cos\theta > 0$ : le travail est **positif**, on dit que la force est **motrice**.
- si $90^\circ < \theta \leq 180^\circ$ (la force s'oppose globalement au mouvement), $\cos\theta < 0$ : le travail est **négatif**, la force est **résistante**.
- si $\theta = 90^\circ$ exactement (la force est perpendiculaire au déplacement), $\cos\theta = 0$ : le travail est **nul**, la force ne modifie ni n'entretient le mouvement.

Ce dernier cas, tu l'as déjà rencontré sans le nommer. Au chapitre lois de Newton, sur le plan horizontal avec frottement, tu avais remarqué que la réaction normale $\vec{N}$ n'intervenait jamais dans l'accélération horizontale — seules $F$ et $f$ y intervenaient. Voilà pourquoi, en langage énergétique : $\vec{N}$ est perpendiculaire au déplacement (qui reste horizontal, tant que le solide ne décolle pas du plan), donc $W(\vec{N}) = 0$. Une force peut être indispensable à l'équilibre vertical (elle empêche le solide de s'enfoncer dans le sol) sans jamais travailler.

### Le théorème de l'énergie cinétique — et pourquoi c'est vrai

Voici l'énoncé qu'on va utiliser pour tout le reste de cette leçon :

**Entre deux instants (ou deux points) $A$ et $B$, la variation de l'énergie cinétique d'un solide est égale à la somme des travaux de toutes les forces extérieures qui s'exercent sur lui :**

$$\Delta E_c = E_{c,B} - E_{c,A} = \sum W(\vec{F}_{ext})$$

D'où vient cette égalité ? Regarde le cas le plus simple : un solide de masse $m$ qui se déplace en ligne droite, sur une distance $d = AB$, sous l'effet d'une force résultante constante $\sum \vec{F}_{ext}$, alignée avec le déplacement. La deuxième loi de Newton donne une accélération constante :

$$a = \frac{\sum F_{ext}}{m}$$

Tu connais déjà, depuis le chapitre lois de Newton, la relation entre vitesse et distance parcourue pour une accélération constante :

$$v_B^2 = v_A^2 + 2 a d$$

Multiplions les deux membres par $\frac{1}{2}m$ :

$$\frac{1}{2} m v_B^2 = \frac{1}{2} m v_A^2 + m a d$$

Or $m a = \sum F_{ext}$ (deuxième loi de Newton), donc $m a d = \left(\sum F_{ext}\right) \times d$. Et $\left(\sum F_{ext}\right) \times d$, pour une force constante alignée avec un déplacement rectiligne de longueur $d$, c'est exactement la définition du travail de cette force résultante :

$$\frac{1}{2} m v_B^2 - \frac{1}{2} m v_A^2 = \sum W(\vec{F}_{ext})$$

Le membre de gauche, c'est $\Delta E_c$. Le théorème est établi, dans ce cas simple — et on admet qu'il reste vrai, sous la même forme, pour un mouvement quelconque (pas seulement rectiligne) et des forces qui peuvent varier en direction (le poids, lui, reste constant, mais ce n'est pas une exigence du théorème lui-même).

Remarque ce que ce théorème fait de nouveau : il relie directement les forces à $E_c$, sans jamais passer par l'accélération, la vitesse instantanée $v(t)$, ou la position $x(t)$. C'est exactement le raccourci annoncé en R0.

### Exemple travaillé : retrouver la vitesse de la chute libre, par le TEC

*Ce qu'on cherche ici, et pourquoi ce geste :* on reprend l'exemple de chute libre du chapitre lois de Newton — un objet lâché sans vitesse initiale, tombant d'une hauteur $h = 19{,}6\ \text{m}$ — et on retrouve sa vitesse au sol par le TEC, pour comparer directement au résultat obtenu là-bas par primitivation.

**Bilan des forces :** en chute libre, frottements négligés, seul le poids $\vec{P} = m\vec{g}$ s'exerce sur l'objet. Le déplacement est vertical, vers le bas, de norme $h$, et $\vec{P}$ est lui aussi vertical, vers le bas : les deux sont alignés, donc $\theta = 0^\circ$, $\cos\theta = 1$.

$$W(\vec{P}) = mgh$$

**Théorème de l'énergie cinétique**, entre l'instant du lâcher (vitesse nulle) et l'arrivée au sol :

$$E_{c,sol} - E_{c,0} = W(\vec{P})$$

$$\frac{1}{2} m v_{sol}^2 - 0 = mgh$$

La masse $m$ se simplifie des deux côtés — exactement comme elle avait disparu de $\vec{a}_G = \vec{g}$ au chapitre lois de Newton. On isole $v_{sol}$ :

$$v_{sol} = \sqrt{2gh}$$

**Application numérique**, avec $g \approx 9{,}8\ \text{m/s}^2$ et $h = 19{,}6\ \text{m}$ :

$$v_{sol} = \sqrt{2 \times 9{,}8 \times 19{,}6} = \sqrt{384{,}16} \approx 19{,}6\ \text{m/s}$$

C'est très exactement le résultat trouvé au chapitre lois de Newton par la méthode complète (primitiver $a_y$ deux fois, puis résoudre $y(t_{sol}) = 0$) : $v_G(t_{sol}) \approx 19{,}6\ \text{m/s}$. Les deux méthodes donnent le même nombre — et on n'a même pas eu besoin de connaître la masse de l'objet, ni le temps de chute, pour obtenir directement la vitesse au sol.

---

## R3 — Le travail du poids ne dépend pas du chemin suivi

### Revenons à la question de R0

Tu as maintenant l'outil qu'il faut : le TEC dit que $\Delta E_c = \sum W(\vec{F}_{ext})$. Pour comparer la bille en chute libre et la bille sur le toboggan, il faut donc comparer le travail du poids sur les deux trajets — l'un rectiligne vertical, l'autre un chemin sinueux. Est-ce que ces deux travaux sont égaux ?

### Le mécanisme : décomposer n'importe quel chemin en petits pas

Prends un chemin quelconque entre un point de départ $A$ et un point d'arrivée $B$ — aussi tordu, aussi long que tu veuilles. Découpe-le mentalement en une succession de tout petits déplacements rectilignes, bout à bout. Sur chacun de ces petits déplacements, le poids $\vec{P}$ (toujours vertical, vers le bas) ne "voit" que la composante **verticale** du petit déplacement : sa composante horizontale, quelle qu'elle soit, est perpendiculaire à $\vec{P}$, donc ne contribue rien au travail sur ce petit bout.

Additionne maintenant tous ces petits travaux, le long de tout le chemin. Chaque petit travail ne dépend que de la petite variation d'altitude de ce pas-là. Et quand tu additionnes toutes ces petites variations d'altitude, les niveaux intermédiaires s'annulent deux à deux — le solide quitte chaque altitude intermédiaire puis y repasse, ou la traverse une seule fois, mais dans la somme totale, seule compte l'altitude de départ et l'altitude d'arrivée. Tous les détours, tous les allers-retours horizontaux, disparaissent de la somme.

Il ne reste que :

$$W(\vec{P})_{A \to B} = mg\,(z_A - z_B)$$

où $z_A$ et $z_B$ sont les altitudes de $A$ et de $B$ (axe vertical orienté vers le haut). **Le travail du poids ne dépend que de la différence d'altitude entre le départ et l'arrivée — jamais de la forme, de la longueur, ou du nombre de détours du chemin suivi.**

Regarde ce que dit cette formule dans les deux cas extrêmes : si $A$ et $B$ sont à la même altitude ($z_A = z_B$, un déplacement purement horizontal), $W(\vec{P}) = 0$ — c'est cohérent, puisque le poids est alors perpendiculaire au déplacement à chaque instant. Si le déplacement est une chute verticale pure de hauteur $h$ ($z_A - z_B = h$), on retrouve $W(\vec{P}) = mgh$, exactement le résultat utilisé au rung précédent.

### L'erreur à repérer

Voici le réflexe fautif à éliminer : penser qu'un chemin plus long "fatigue" davantage le poids, ou au contraire qu'un chemin plus long lui donne "plus de temps pour agir" — et donc changer le résultat en fonction de la longueur du trajet. Le travail du poids ne connaît ni la longueur du chemin, ni sa forme, ni le temps mis pour le parcourir : il ne connaît que $z_A$ et $z_B$.

### Résoudre la question de R0

La bille en chute libre et la bille sur le toboggan partent toutes deux de la même altitude et arrivent toutes deux à la même altitude, sans frottement dans les deux cas. Donc $W(\vec{P})$ est **strictement le même** dans les deux cas, malgré la longueur très différente des deux chemins. Par le TEC, $\Delta E_c$ ne dépend, ici, que de $W(\vec{P})$ (aucune autre force ne travaille : les frottements sont négligés, et la réaction de la piste, si elle en exerce une, est perpendiculaire au déplacement à chaque instant, donc de travail nul) — donc $\Delta E_c$ est le même dans les deux cas, et les deux billes arrivent avec **exactement la même vitesse**.

Si ta prédiction de R0 penchait pour la chute libre plus rapide, voilà l'écart à corriger : ce n'est pas la longueur du chemin qui compte, c'est la dénivelée. La bille sur le toboggan met plus de temps à arriver (elle a plus de chemin à parcourir), mais elle arrive avec la même vitesse.

### L'énergie potentielle de pesanteur

Le résultat qu'on vient d'établir se reformule avec une nouvelle grandeur, qui va simplifier tout ce qui suit. On définit l'**énergie potentielle de pesanteur** d'un solide de masse $m$, à l'altitude $z$ (mesurée par rapport à un niveau de référence choisi une bonne fois, où $E_{pp} = 0$) :

$$E_{pp} = mgz$$

Avec cette définition, le travail du poids entre $A$ et $B$ se réécrit :

$$W(\vec{P})_{A \to B} = E_{pp,A} - E_{pp,B}$$

$$W(\vec{P})_{A \to B} = -\Delta E_{pp}$$

**Le travail du poids est l'opposé de la variation de l'énergie potentielle de pesanteur.** Quand le solide descend ($z$ diminue), $E_{pp}$ diminue, et $W(\vec{P})$ est positif (moteur) — le poids "encaisse" cette perte d'altitude en travail positif. Quand le solide monte, c'est l'inverse : $W(\vec{P})$ est négatif (résistant), et $E_{pp}$ augmente.

*Exemple numérique.* Une bille de masse $m = 0{,}20\ \text{kg}$ descend de $h = 4{,}0\ \text{m}$ — peu importe le chemin, d'après ce qu'on vient d'établir.

$$W(\vec{P}) = mgh = 0{,}20 \times 9{,}8 \times 4{,}0 \approx 7{,}8\ \text{J}$$

$$\Delta E_{pp} = -W(\vec{P}) \approx -7{,}8\ \text{J}$$

L'énergie potentielle a diminué d'environ $7{,}8\ \text{J}$ ; le poids a fourni un travail moteur de la même valeur.

---

## R4 — L'énergie mécanique : $E_m = E_c + E_{pp}$

### Construire la conservation

On définit l'**énergie mécanique** d'un solide comme la somme de son énergie cinétique et de son énergie potentielle de pesanteur :

$$E_m = E_c + E_{pp}$$

Regarde ce que dit le TEC quand les seules forces qui s'exercent sur un solide sont son poids et une réaction (normale, ou la tension d'un fil, etc.) qui ne travaille jamais — c'est-à-dire quand il n'y a **aucun frottement** :

$$\Delta E_c = W(\vec{P}) + W(\vec{N})$$

$$\Delta E_c = W(\vec{P})$$

On vient d'établir, au rung précédent, que $W(\vec{P}) = -\Delta E_{pp}$. Donc :

$$\Delta E_c = -\Delta E_{pp}$$

$$\Delta E_c + \Delta E_{pp} = 0$$

$$\Delta E_m = 0$$

**En l'absence de frottement, l'énergie mécanique se conserve : elle est constante tout au long du mouvement.** C'est exactement la conséquence du TEC de R2 et du travail du poids de R3, combinés : $E_c$ et $E_{pp}$ varient chacune séparément (l'une monte quand l'autre descend), mais leur somme, elle, ne bouge pas.

### Arrête-toi ici : $E_c$ n'est pas $E_m$

C'est le moment de fixer une confusion très fréquente. $E_m$ est constante ; $E_c$, elle, **ne l'est pas** — $E_c$ varie constamment, à mesure que l'altitude change. Ce qui est conservé, c'est la **somme** $E_c + E_{pp}$, jamais $E_c$ toute seule (sauf dans le cas particulier, rare, où l'altitude ne change pas du tout).

Teste-le sur un exemple concret. Un solide part du repos ($v = 0$, donc $E_c = 0$) au sommet d'une piste sans frottement, avec une énergie mécanique $E_m = 6{,}0\ \text{J}$ (constante). Au sommet, $E_c = 0$ — toute l'énergie mécanique y est de l'énergie potentielle : $E_{pp} = 6{,}0\ \text{J}$. Plus bas sur la piste, disons à un point où $E_{pp} = 2{,}0\ \text{J}$, l'énergie cinétique y vaut $E_c = E_m - E_{pp} = 4{,}0\ \text{J}$ — $E_c$ a changé, $E_m$ non. Si tu réponds "$E_c = 6{,}0\ \text{J}$ au sommet" parce que "l'énergie vaut $6{,}0\ \text{J}$ partout", tu confonds $E_c$ avec $E_m$ — or au sommet, avec $v = 0$, $E_c$ ne peut être que nulle, quelle que soit la valeur de $E_m$.

### Quand il y a des frottements : $E_m$ diminue

Reprenons le TEC, mais cette fois avec un frottement $\vec{f}$ qui s'exerce en plus du poids et de la réaction normale :

$$\Delta E_c = W(\vec{P}) + W(\vec{N}) + W(\vec{f})$$

$$\Delta E_c = -\Delta E_{pp} + W(\vec{f})$$

$$\Delta E_c + \Delta E_{pp} = W(\vec{f})$$

$$\Delta E_m = W(\vec{f})$$

**La variation de l'énergie mécanique est égale au travail du frottement.** Et le frottement, par nature, s'oppose toujours au mouvement : il est donc toujours résistant, $W(\vec{f}) < 0$ (sauf à l'arrêt, où il ne travaille pas). Donc, dès qu'il y a du frottement, $\Delta E_m < 0$ : **l'énergie mécanique diminue**, elle ne se conserve plus — toute la perte est exactement égale au travail (négatif) du frottement, ni plus, ni moins.

### L'erreur à repérer

Ne raisonne jamais "l'énergie mécanique est toujours conservée" par réflexe : ce n'est vrai que dans le cas particulier sans frottement. Dès qu'un énoncé mentionne un frottement (ou une résistance de l'air non négligée), le bilan de $E_m$ doit inclure ce terme — **l'oublier revient à annoncer une vitesse finale plus grande que la vitesse réelle**, puisqu'on aurait ignoré une perte d'énergie qui a bel et bien eu lieu.

### Exemple travaillé : un bilan avec frottement

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule une vitesse à l'aide du bilan de l'énergie mécanique, en incluant explicitement le terme de frottement — pour bien voir la différence entre "conservée" et "diminue d'exactement $W(\vec{f})$".

Un solide de masse $m = 0{,}50\ \text{kg}$ glisse sur une piste avec frottement, du point $A$ (départ, $v_A = 0$) au point $B$. Entre $A$ et $B$, son altitude diminue de $\Delta z = 1{,}2\ \text{m}$, et le travail des frottements vaut $W(\vec{f}) = -1{,}0\ \text{J}$. Quelle est la vitesse en $B$ ?

**Travail du poids** (indépendant du chemin, R3) :

$$W(\vec{P}) = mg\,\Delta z = 0{,}50 \times 9{,}8 \times 1{,}2 \approx 5{,}88\ \text{J}$$

**TEC entre $A$ et $B$ :**

$$E_{c,B} - 0 = W(\vec{P}) + W(\vec{N}) + W(\vec{f})$$

$$E_{c,B} = 5{,}88 + 0 - 1{,}0 = 4{,}88\ \text{J}$$

**Vitesse :**

$$v_B = \sqrt{\frac{2 E_{c,B}}{m}} = \sqrt{\frac{2 \times 4{,}88}{0{,}50}} \approx 4{,}4\ \text{m/s}$$

Si on avait oublié le terme de frottement (en supposant, à tort, $E_m$ conservée), on aurait trouvé :

$$E_{c,B}^{faux} = W(\vec{P}) \approx 5{,}88\ \text{J}$$

$$v_B^{faux} = \sqrt{\frac{2 \times 5{,}88}{0{,}50}} \approx 4{,}8\ \text{m/s}$$

Une vitesse plus grande que la vraie, parce qu'on aurait ignoré l'énergie réellement dissipée par le frottement.

---

## R5 — Deux outils, une même réponse : TEC contre la 2e loi de Newton

### Reprendre exactement l'exemple du plan incliné

Au chapitre lois de Newton, tu avais étudié un solide de masse $m = 1{,}0\ \text{kg}$, glissant sans vitesse initiale sur un plan incliné d'angle $\alpha = 30^\circ$, freiné par un frottement de norme $f = 2{,}0\ \text{N}$ opposé à la descente ($g \approx 9{,}8\ \text{m/s}^2$). La méthode de la 2e loi de Newton avait donné, en projetant sur l'axe de la descente :

$$a_{G,x} = g\sin\alpha - \frac{f}{m} = 9{,}8 \times 0{,}5 - 2{,}0 = 2{,}9\ \text{m/s}^2$$

Ajoutons une seule donnée à cet exemple : le solide parcourt une distance $d = 2{,}0\ \text{m}$ le long du plan, en partant du repos. Quelle est sa vitesse à cet instant ?

### Méthode 1 : la 2e loi de Newton, puis la cinématique

C'est la méthode déjà maîtrisée. On a $a_{G,x} = 2{,}9\ \text{m/s}^2$ (calculé ci-dessus), une accélération constante, un départ du repos ($v_A = 0$), sur une distance $d = 2{,}0\ \text{m}$ :

$$v_B^2 = v_A^2 + 2\,a_{G,x}\,d = 2 \times 2{,}9 \times 2{,}0 = 11{,}6$$

$$v_B = \sqrt{11{,}6} \approx 3{,}4\ \text{m/s}$$

### Méthode 2 : le théorème de l'énergie cinétique

Reprenons le même solide, avec le même bilan des forces (poids $\vec{P}$, réaction normale $\vec{N}$, frottement $\vec{f}$), mais cette fois on applique directement le TEC entre le départ et le point situé à $d = 2{,}0\ \text{m}$ le long du plan.

**Travail du poids** : la descente sur le plan, sur une longueur $d$, correspond à une perte d'altitude $\Delta z = d \sin\alpha$ (projection de $d$ sur la verticale) :

$$W(\vec{P}) = mg\,d\sin\alpha = 1{,}0 \times 9{,}8 \times 2{,}0 \times 0{,}5 = 9{,}8\ \text{J}$$

**Travail de la réaction normale** : $\vec{N}$ est perpendiculaire au plan, donc perpendiculaire au déplacement (qui reste le long du plan) :

$$W(\vec{N}) = 0$$

**Travail du frottement** : $\vec{f}$ s'oppose au sens du mouvement sur toute la distance $d$ :

$$W(\vec{f}) = -f \times d = -2{,}0 \times 2{,}0 = -4{,}0\ \text{J}$$

**TEC entre le départ (repos) et le point à $d = 2{,}0\ \text{m}$ :**

$$E_{c,B} - 0 = W(\vec{P}) + W(\vec{N}) + W(\vec{f})$$

$$E_{c,B} = 9{,}8 + 0 - 4{,}0 = 5{,}8\ \text{J}$$

$$v_B = \sqrt{\frac{2 \times 5{,}8}{1{,}0}} \approx 3{,}4\ \text{m/s}$$

### Le même nombre, deux chemins différents

Les deux méthodes donnent exactement le même résultat : $v_B \approx 3{,}4\ \text{m/s}$. Ce n'est pas une coïncidence — ce sont deux formulations équivalentes de la même mécanique, la 2e loi de Newton étant, comme tu l'as vu en R2, le point de départ dont le TEC est déduit.

Mais regarde ce que chaque méthode a demandé, en chemin. La méthode de Newton a exigé de calculer $N$ (même si $N$ ne sert finalement à rien dans l'équation selon l'axe de la descente — il faut quand même l'écrire pour boucler le bilan des forces), puis $a_{G,x}$, puis d'appliquer une relation cinématique pour remonter à $v_B$. La méthode du TEC est allée directement des travaux des forces à $E_{c,B}$, sans jamais calculer ni $N$, ni $a_{G,x}$, ni aucune grandeur intermédiaire — parce que la question posée ("quelle vitesse ?") ne demandait, au fond, qu'une variation d'énergie cinétique.

**Ce que ça dit sur le choix de l'outil :** si tu as besoin de l'accélération elle-même, ou de $v(t)$ à chaque instant, ou du temps de parcours, la 2e loi de Newton (et la cinématique qui en découle) reste indispensable — le TEC ne donne jamais l'accélération ni le temps. Mais si tu ne veux que la vitesse en un point donné (ou l'inverse : la distance nécessaire pour atteindre une vitesse donnée), le TEC va souvent plus vite, parce qu'il saute directement des forces à $E_c$.

---

## R6 — Pour t'entraîner

### Récapitulatif express

- $E_c = \frac{1}{2}mv^2$ : l'énergie cinétique varie comme le carré de la vitesse, jamais comme la vitesse elle-même.
- Le travail d'une force constante : $W(\vec{F}) = \vec{F} \cdot \vec{AB}$ — positif (moteur), négatif (résistant), ou nul (force perpendiculaire au déplacement), selon le signe de $\cos\theta$.
- Le **théorème de l'énergie cinétique** : $\Delta E_c = \sum W(\vec{F}_{ext})$ entre deux instants — un raccourci qui relie directement les forces à la vitesse, sans passer par l'accélération ni le temps.
- Le travail du poids ne dépend **que** de la différence d'altitude : $W(\vec{P}) = mg(z_A - z_B)$, jamais du chemin suivi. D'où l'énergie potentielle de pesanteur $E_{pp} = mgz$, avec $W(\vec{P}) = -\Delta E_{pp}$.
- L'énergie mécanique $E_m = E_c + E_{pp}$ se **conserve** en l'absence de frottement ; en présence de frottement, $\Delta E_m = W(\vec{f}) < 0$ — elle diminue exactement de ce que le frottement a dissipé.
- La 2e loi de Newton et le TEC répondent à la même mécanique par deux chemins différents — le TEC est le plus direct quand seule une vitesse (ou une distance) est recherchée.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Un skieur de masse $m = 70\ \text{kg}$ part sans vitesse initiale du sommet d'une piste rectiligne inclinée, de longueur $L = 80\ \text{m}$, telle que $\sin\alpha = 0{,}25$. Les frottements (neige et air) sont assimilés à une force constante, opposée au mouvement, de norme $f = 40\ \text{N}$. On prend $g \approx 9{,}8\ \text{m/s}^2$. Au bas de la piste inclinée, le skieur aborde une portion horizontale où les frottements deviennent plus importants : une force constante $f' = 200\ \text{N}$, opposée au mouvement, jusqu'à l'arrêt complet.

**1) Calculer le travail du poids entre le sommet et le bas de la piste inclinée.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la piste est rectiligne ici, donc on pourrait aussi bien calculer $W(\vec{P})$ directement à partir de la dénivelée $h = L\sin\alpha$ — exactement la formule établie en R3, valable quel que soit le chemin.

$$h = L\sin\alpha = 80 \times 0{,}25 = 20\ \text{m}$$

$$W(\vec{P}) = mgh = 70 \times 9{,}8 \times 20 = 13\,720\ \text{J}$$

**2) Calculer le travail des frottements sur la piste inclinée.**

*Ce qu'on cherche ici, et pourquoi ce geste :* le frottement est constant et opposé au mouvement sur toute la longueur $L$ — un travail résistant, à calculer directement par $-f \times L$.

$$W(\vec{f}) = -f \times L = -40 \times 80 = -3\,200\ \text{J}$$

**3) En déduire, par le théorème de l'énergie cinétique, la vitesse du skieur au bas de la piste inclinée.**

*Ce qu'on cherche ici, et pourquoi ce geste :* le TEC combine directement les deux travaux qu'on vient de calculer (la réaction normale $\vec{N}$, perpendiculaire au déplacement, ne travaille pas) — sans avoir besoin de l'accélération ni de la durée de la descente.

$$E_{c,bas} - 0 = W(\vec{P}) + W(\vec{N}) + W(\vec{f})$$

$$E_{c,bas} = 13\,720 + 0 - 3\,200 = 10\,520\ \text{J}$$

$$v_{bas} = \sqrt{\frac{2 \times 10\,520}{70}} = \sqrt{300{,}6} \approx 17{,}3\ \text{m/s}$$

**4) Sur la portion horizontale, calculer la distance $d'$ parcourue par le skieur avant l'arrêt complet.**

*Ce qu'on cherche ici, et pourquoi ce geste :* sur le plat, l'altitude ne change pas, donc $W(\vec{P}) = 0$ (cas particulier de R3, où $z_A = z_B$) ; seul le frottement $\vec{f}'$ travaille. On applique le TEC entre le bas de la piste (vitesse $v_{bas}$ trouvée en 3) et l'arrêt ($v = 0$).

$$0 - E_{c,bas} = W(\vec{P}) + W(\vec{N}) + W(\vec{f}')$$

$$-E_{c,bas} = -f' \times d'$$

$$-10\,520 = -200 \times d'$$

$$d' = \frac{10\,520}{200} = 52{,}6\ \text{m}$$

Le skieur s'arrête après avoir parcouru $52{,}6\ \text{m}$ sur le plat. Remarque la méthode : on n'a jamais eu besoin de connaître le temps de parcours ni l'accélération sur le plat — le TEC est passé directement de la vitesse en bas de piste à la distance d'arrêt, via l'énergie dissipée par le frottement.

### À toi

**Variation 1.** Le skieur change de fartage et réduit le frottement sur la piste inclinée à $f = 20\ \text{N}$ (toutes les autres grandeurs de l'exercice précédent restant inchangées). Sans refaire tout le calcul, indique si la vitesse au bas de la piste serait plus grande, plus petite, ou égale à celle trouvée en question 3, et justifie ta réponse à partir du TEC établi en R2.

**Variation 2.** Reprends les données des questions 1 à 3 (piste inclinée, sans reprendre les calculs). Calcule la variation d'énergie mécanique $\Delta E_m$ du skieur entre le sommet et le bas de la piste, et vérifie qu'elle correspond exactement au travail des frottements $W(\vec{f})$ calculé en question 2 — conformément à la relation établie en R4.
