# Aspects énergétiques

---

## R0 — Accroche : deux billes, deux pistes, même vitesse ?

Imagine deux billes identiques, de même masse, lâchées sans vitesse initiale depuis la même hauteur $h$ au-dessus du sol. La première tombe tout droit, en chute libre verticale — exactement la situation du chapitre lois de Newton. La seconde descend une piste incurvée, en forme de toboggan, qui part du même point de départ et arrive au même niveau, mais en suivant un chemin beaucoup plus long et beaucoup plus sinueux. On néglige les frottements dans les deux cas.

Avant de lire la suite, prends position, vraiment : au moment où chacune des deux billes atteint le sol (ou le bas du toboggan), laquelle des deux arrive avec la plus grande vitesse ? La bille en chute libre, qui tombe tout droit ? La bille sur le toboggan, qui a un chemin bien plus long pour "prendre de l'élan" ? Ou bien les deux arrivent-elles avec exactement la même vitesse ?

[[checkpoint:cp-r0-predict]]

Beaucoup de raisonnements naturels penchent pour la chute libre : elle va droit au but, alors que le toboggan s'éternise en détours — on imagine alors que la bille sur le toboggan doit arriver plus lentement, comme si le détour "coûtait" de la vitesse.

Garde ta réponse en tête. Pour trancher cette question proprement, il va falloir un outil qu'on n'a pas encore utilisé dans ce module : jusqu'ici (chapitres lois de Newton, chute et mouvements plans), pour remonter à une vitesse, il fallait toujours écrire le bilan des forces, projeter, puis primitiver — une fois pour la vitesse, une deuxième fois pour la position. Cette leçon construit un raccourci : une grandeur, l'énergie, qui permet de répondre à des questions comme celle-ci sans repasser par tout ce détour de calcul. Et à la fin de cette leçon, on referme cette question avec un argument, pas avec une impression.

Et cet outil énergétique, on va surtout s'en servir pour les oscillateurs — ressort, torsion, pendule — où il rend limpide un va-et-vient qu'aucune équation horaire ne montre aussi bien.

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

[[figure:ec-parabole]]

Cette grandeur va être au centre de toute la leçon : le chapitre suivant construit l'outil qui relie ses variations aux forces qui s'exercent sur le solide.

---

## R2 — Le mécanisme : le théorème de l'énergie cinétique

### La question que ce chapitre résout

On sait, depuis les lois de Newton, que la somme des forces détermine l'accélération : $\sum \vec{F}_{ext} = m\vec{a}_G$. Mais retrouver une vitesse à partir de là demande, en général, tout un détour : bilan des forces, projection, primitivation une fois pour la vitesse, une deuxième fois pour la position. Ce chapitre construit un raccourci qui relie directement les forces à la variation de $E_c$, sans repasser par tout ce détour.

### D'abord : le travail d'une force constante

Avant d'énoncer le théorème, il faut un outil : le **travail** d'une force. Pour une force $\vec{F}$ constante (en norme et en direction) qui s'exerce sur un solide pendant qu'il se déplace d'un point $A$ à un point $B$, le travail de cette force vaut :

$$W(\vec{F}) = \vec{F} \cdot \vec{AB} = F \times AB \times \cos\theta$$

où $\theta$ est l'angle entre $\vec{F}$ et le déplacement $\vec{AB}$. C'est un produit scalaire : il ne mesure que la partie de $\vec{F}$ qui est alignée avec le déplacement — la partie perpendiculaire au déplacement ne travaille pas du tout.

Trois cas à distinguer, selon le signe de $\cos\theta$ :

- si $0^\circ \leq \theta < 90^\circ$ (la force pousse globalement dans le sens du mouvement), $\cos\theta > 0$ : le travail est **positif**, on dit que la force est **motrice**.
- si $90^\circ < \theta \leq 180^\circ$ (la force s'oppose globalement au mouvement), $\cos\theta < 0$ : le travail est **négatif**, la force est **résistante**.
- si $\theta = 90^\circ$ exactement (la force est perpendiculaire au déplacement), $\cos\theta = 0$ : le travail est **nul**, la force ne modifie ni n'entretient le mouvement.

Ce dernier cas, tu l'as déjà rencontré sans le nommer. Au chapitre lois de Newton, sur le plan horizontal avec frottement, tu avais remarqué que la réaction normale $\vec{N}$ n'intervenait jamais dans l'accélération horizontale — seules $F$ et $f$ y intervenaient. Voilà pourquoi, en langage énergétique : $\vec{N}$ est perpendiculaire au déplacement (qui reste horizontal, tant que le solide ne décolle pas du plan), donc $W(\vec{N}) = 0$. Une force peut être indispensable à l'équilibre vertical (elle empêche le solide de s'enfoncer dans le sol) sans jamais travailler.

[[figure:travail-force-signe]]

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

Remarque ce que ce théorème fait de nouveau : il relie directement les forces à $E_c$, sans jamais passer par l'accélération, la vitesse instantanée $v(t)$, ou la position $x(t)$. C'est exactement le raccourci annoncé au chapitre 1.

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

### Et si la force n'est pas constante ?

Tout ce qu'on vient de voir suppose une force $\vec{F}$ constante — même norme, même direction, tout au long du déplacement. Mais certaines forces changent d'intensité à mesure que le solide avance. Le théorème de l'énergie cinétique reste vrai dans ce cas (rien, dans sa démonstration, n'exigeait une force constante) — mais il faut généraliser ce qu'on entend par « travail ».

Reprends $W(\vec{F}) = F \times AB$ pour une force constante alignée avec le déplacement, et trace $F$ en fonction de la position $x$ parcourue : $F$ dessine une droite horizontale, et $W$ est exactement l'**aire du rectangle** sous cette droite, entre $0$ et $AB$.

Cette image se généralise directement : **le travail d'une force qui varie le long du déplacement est l'aire sous la courbe $F(x)$**, quelle que soit la forme de cette courbe. Le cas d'une force constante n'est qu'un cas particulier — celui où cette aire reste un rectangle. Mais si $F$ croît, par exemple linéairement avec $x$ depuis $F = 0$, l'aire sous la droite devient un **triangle**, pas un rectangle — et un triangle n'a pas la même aire qu'un rectangle de même base et même hauteur : il vaut exactement la moitié.

Retiens cette image : c'est exactement ce qu'il nous faudra pour le ressort, un peu plus loin dans cette leçon, dont la force de rappel n'est pas constante — elle grandit avec l'étirement.

---

## R3 — Le travail du poids ne dépend pas du chemin suivi

### Revenons à la question du chapitre 1

Tu as maintenant l'outil qu'il faut : le TEC dit que $\Delta E_c = \sum W(\vec{F}_{ext})$. Pour comparer la bille en chute libre et la bille sur le toboggan, il faut donc comparer le travail du poids sur les deux trajets — l'un rectiligne vertical, l'autre un chemin sinueux. Est-ce que ces deux travaux sont égaux ?

### Le mécanisme : décomposer n'importe quel chemin en petits pas

Prends un chemin quelconque entre un point de départ $A$ et un point d'arrivée $B$ — aussi tordu, aussi long que tu veuilles. Découpe-le mentalement en une succession de tout petits déplacements rectilignes, bout à bout. Sur chacun de ces petits déplacements, le poids $\vec{P}$ (toujours vertical, vers le bas) ne "voit" que la composante **verticale** du petit déplacement : sa composante horizontale, quelle qu'elle soit, est perpendiculaire à $\vec{P}$, donc ne contribue rien au travail sur ce petit bout.

Additionne maintenant tous ces petits travaux, le long de tout le chemin. Chaque petit travail ne dépend que de la petite variation d'altitude de ce pas-là. Et quand tu additionnes toutes ces petites variations d'altitude, les niveaux intermédiaires s'annulent deux à deux — le solide quitte chaque altitude intermédiaire puis y repasse, ou la traverse une seule fois, mais dans la somme totale, seule compte l'altitude de départ et l'altitude d'arrivée. Tous les détours, tous les allers-retours horizontaux, disparaissent de la somme.

Il ne reste que :

$$W(\vec{P})_{A \to B} = mg\,(z_A - z_B)$$

où $z_A$ et $z_B$ sont les altitudes de $A$ et de $B$ (axe vertical orienté vers le haut). **Le travail du poids ne dépend que de la différence d'altitude entre le départ et l'arrivée — jamais de la forme, de la longueur, ou du nombre de détours du chemin suivi.**

Regarde ce que dit cette formule dans les deux cas extrêmes : si $A$ et $B$ sont à la même altitude ($z_A = z_B$, un déplacement purement horizontal), $W(\vec{P}) = 0$ — c'est cohérent, puisque le poids est alors perpendiculaire au déplacement à chaque instant. Si le déplacement est une chute verticale pure de hauteur $h$ ($z_A - z_B = h$), on retrouve $W(\vec{P}) = mgh$, exactement le résultat utilisé au chapitre précédent.

### L'erreur à repérer

Voici le réflexe fautif à éliminer : penser qu'un chemin plus long "fatigue" davantage le poids, ou au contraire qu'un chemin plus long lui donne "plus de temps pour agir" — et donc changer le résultat en fonction de la longueur du trajet. Le travail du poids ne connaît ni la longueur du chemin, ni sa forme, ni le temps mis pour le parcourir : il ne connaît que $z_A$ et $z_B$.

[[figure:travail-poids-chemin]]

### Résoudre la question du chapitre 1

La bille en chute libre et la bille sur le toboggan partent toutes deux de la même altitude et arrivent toutes deux à la même altitude, sans frottement dans les deux cas. Donc $W(\vec{P})$ est **strictement le même** dans les deux cas, malgré la longueur très différente des deux chemins. Par le TEC, $\Delta E_c$ ne dépend, ici, que de $W(\vec{P})$ (aucune autre force ne travaille : les frottements sont négligés, et la réaction de la piste, si elle en exerce une, est perpendiculaire au déplacement à chaque instant, donc de travail nul) — donc $\Delta E_c$ est le même dans les deux cas, et les deux billes arrivent avec **exactement la même vitesse**.

Si ta prédiction du chapitre 1 penchait pour la chute libre plus rapide, voilà l'écart à corriger : ce n'est pas la longueur du chemin qui compte, c'est la dénivelée. La bille sur le toboggan met plus de temps à arriver (elle a plus de chemin à parcourir), mais elle arrive avec la même vitesse.

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

On vient d'établir, au chapitre précédent, que $W(\vec{P}) = -\Delta E_{pp}$. Donc :

$$\Delta E_c = -\Delta E_{pp}$$

$$\Delta E_c + \Delta E_{pp} = 0$$

$$\Delta E_m = 0$$

**En l'absence de frottement, l'énergie mécanique se conserve : elle est constante tout au long du mouvement.** C'est exactement la conséquence du TEC du chapitre 3 et du travail du poids du chapitre 4, combinés : $E_c$ et $E_{pp}$ varient chacune séparément (l'une monte quand l'autre descend), mais leur somme, elle, ne bouge pas.

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

[[figure:conservation-em]]

### L'erreur à repérer

Ne raisonne jamais "l'énergie mécanique est toujours conservée" par réflexe : ce n'est vrai que dans le cas particulier sans frottement. Dès qu'un énoncé mentionne un frottement (ou une résistance de l'air non négligée), le bilan de $E_m$ doit inclure ce terme — **l'oublier revient à annoncer une vitesse finale plus grande que la vitesse réelle**, puisqu'on aurait ignoré une perte d'énergie qui a bel et bien eu lieu.

### Exemple travaillé : un bilan avec frottement

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule une vitesse à l'aide du bilan de l'énergie mécanique, en incluant explicitement le terme de frottement — pour bien voir la différence entre "conservée" et "diminue d'exactement $W(\vec{f})$".

Un solide de masse $m = 0{,}50\ \text{kg}$ glisse sur une piste avec frottement, du point $A$ (départ, $v_A = 0$) au point $B$. Entre $A$ et $B$, son altitude diminue de $h = 1{,}2\ \text{m}$ (donc $\Delta z = z_B - z_A = -1{,}2\ \text{m}$, négatif : on descend), et le travail des frottements vaut $W(\vec{f}) = -1{,}0\ \text{J}$. Quelle est la vitesse en $B$ ?

**Travail du poids** (indépendant du chemin, chapitre 4) :

$$W(\vec{P}) = -mg\,\Delta z = mg\,h = 0{,}50 \times 9{,}8 \times 1{,}2 \approx 5{,}88\ \text{J}$$

**TEC entre $A$ et $B$ :**

$$E_{c,B} - 0 = W(\vec{P}) + W(\vec{N}) + W(\vec{f})$$

$$E_{c,B} = 5{,}88 + 0 - 1{,}0 = 4{,}88\ \text{J}$$

**Vitesse :**

$$v_B = \sqrt{\frac{2 E_{c,B}}{m}} = \sqrt{\frac{2 \times 4{,}88}{0{,}50}} \approx 4{,}4\ \text{m/s}$$

Si on avait oublié le terme de frottement (en supposant, à tort, $E_m$ conservée), on aurait trouvé :

$$E_{c,B}^{faux} = W(\vec{P}) \approx 5{,}88\ \text{J}$$

$$v_B^{faux} = \sqrt{\frac{2 \times 5{,}88}{0{,}50}} \approx 4{,}8\ \text{m/s}$$

Une vitesse plus grande que la vraie, parce qu'on aurait ignoré l'énergie réellement dissipée par le frottement.

### Choisir entre le TEC et la 2ᵉ loi de Newton

Un dernier repère, avant de changer de terrain. Quand une question ne demande qu'une vitesse (ou une distance), sans jamais réclamer le temps ni l'accélération, le TEC va droit au but : il relie directement les travaux à $E_c$, sans repasser par $a$ ni par $t$. Mais dès qu'il faut connaître $a$, $v(t)$ à un instant quelconque, ou une durée de parcours, c'est la 2ᵉ loi de Newton (et la cinématique qu'elle permet) qui reste indispensable — le TEC ne les donne jamais.

---

## R5 — Le ressort emmagasine de l'énergie : $\frac{1}{2}kx^2$, et l'énergie de l'oscillateur

Tu as maintenant tout l'outillage générique : $E_c$, le TEC, le travail d'une force (constante ou variable), l'énergie mécanique et sa conservation. Le reste de cette leçon met cet outillage au travail sur les trois oscillateurs du programme — ressort, fil de torsion, pendule pesant — les mêmes systèmes qu'au chapitre Systèmes oscillants, regardés cette fois du côté de l'énergie.

### Combien ça coûte, étirer un ressort de $x$ ?

Tu as rencontré, au chapitre Systèmes oscillants, la force de rappel d'un ressort : $\vec{F}_{rappel} = -kx\,\vec{u}$, toujours dirigée vers l'équilibre, d'intensité proportionnelle à l'écart $x$. Pose-toi une question neuve : pour étirer ce ressort depuis l'équilibre ($x=0$) jusqu'à un allongement $x$, quel travail faut-il fournir contre cette force de rappel ?

Avant de lire la suite, engage-toi vraiment. Le réflexe le plus naturel : la force de rappel vaut $kx$ à l'arrivée, le déplacement vaut $x$, donc $W = F \times d = kx \times x = kx^2$. Écris ce résultat, puis continue.

### Le piège : $F$ n'est pas la même du début à la fin

Ce réflexe traite $kx$ comme si c'était la force de **tout** le trajet — comme si le ressort résistait déjà avec cette intensité dès le premier millimètre. Ce n'est pas le cas. Au tout début de l'étirement, $x$ est proche de $0$ : le ressort résiste à peine. Ce n'est qu'à l'extrémité du trajet, quand l'allongement atteint sa valeur finale $x$, que la force de rappel atteint $kx$. Entre les deux, $F$ grandit continûment, de $0$ à $kx$ : c'est exactement une force **variable**, le cas traité au chapitre 3.

### L'aire du triangle, et le sens du $\frac{1}{2}$

[[figure:travail-ressort-triangle]]

Reprends l'outil du chapitre 3 : le travail d'une force qui varie avec la position est l'aire sous la courbe $F(x)$. Ici, $F(x) = kx$ est une droite qui part de $(0, 0)$ et arrive à $(x, kx)$ — l'aire sous cette droite est un **triangle**, pas un rectangle.

$$W = \frac{1}{2} \times \text{base} \times \text{hauteur}$$

$$W = \frac{1}{2} \times x \times (kx) = \frac{1}{2}kx^2$$

Regarde d'où sort exactement ce $\frac{1}{2}$, parce que c'est lui qui distingue ce résultat de ta première réponse. La force vaut $0$ au départ et $kx$ à l'arrivée ; sa **valeur moyenne**, sur tout le trajet, est la moyenne de ces deux extrêmes :

$$F_{moy} = \frac{0 + kx}{2} = \frac{1}{2}kx$$

Le travail, c'est cette force moyenne multipliée par la distance parcourue :

$$W = F_{moy} \times x = \frac{1}{2}kx^2$$

Le $\frac{1}{2}$ n'est pas une constante à mémoriser à part : c'est **la moyenne d'une force qui part de zéro et grandit régulièrement jusqu'à $kx$**. Si tu avais répondu $kx^2$ tout à l'heure, ton calcul avait traité $kx$ — la force du tout dernier instant — comme si elle s'était appliquée dès le départ. Le vrai travail, celui de l'aire du triangle, vaut exactement la **moitié** de ce que donnerait cette hypothèse.

### L'énergie potentielle élastique

On définit l'**énergie potentielle élastique**, l'énergie emmagasinée dans le ressort étiré (ou comprimé) de $x$ par rapport à l'équilibre :

$$E_{pe} = \frac{1}{2}kx^2$$

Exactement comme le travail du poids s'écrivait $W(\vec{P}) = -\Delta E_{pp}$ (chapitre 4), le travail de la force de rappel s'écrit :

$$W(\vec{F}_{rappel})_{A \to B} = \frac{1}{2}kx_A^2 - \frac{1}{2}kx_B^2 = -\Delta E_{pe}$$

C'est exactement l'expression $\frac{1}{2}kx^2$ qu'on avait *admise*, sans la démontrer, au chapitre Systèmes oscillants — la voici établie, à partir du travail de la force de rappel et de l'aire du triangle.

[[checkpoint:cp-r5-epe]]

### L'énergie mécanique du pendule élastique horizontal, et sa conservation

Pour un solide de masse $m$ accroché à un ressort horizontal, sans frottement, l'énergie mécanique est :

$$E_m = E_c + E_{pe} = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$

Applique le TEC : sur ce montage horizontal, le poids $\vec{P}$ et la réaction $\vec{N}$ sont tous deux perpendiculaires au déplacement (chapitres 3 et 4) — ils ne travaillent jamais. Seule $\vec{F}_{rappel}$ travaille.

$$\Delta E_c = W(\vec{F}_{rappel}) + W(\vec{P}) + W(\vec{N})$$

$$\Delta E_c = W(\vec{F}_{rappel})$$

$$\Delta E_c = -\Delta E_{pe}$$

$$\Delta E_c + \Delta E_{pe} = 0$$

$$\Delta E_m = 0$$

**Sans frottement, l'énergie mécanique du pendule élastique se conserve** — exactement le même raisonnement qu'au chapitre 5, avec $E_{pe}$ à la place de $E_{pp}$ et $\vec{F}_{rappel}$ à la place du poids.

### Arrête-toi — étirement ou compression, même énergie ?

Un même ressort est d'abord étiré de $x = +2{,}0\ \text{cm}$, puis comprimé de $x = -2{,}0\ \text{cm}$. Avant de calculer, prédis : l'énergie potentielle élastique est-elle la même dans les deux cas, plus grande en étirement, ou plus grande en compression ?

Calcule les deux :

$$E_{pe}(+2{,}0\ \text{cm}) = \frac{1}{2}k\,(0{,}020)^2 \qquad E_{pe}(-2{,}0\ \text{cm}) = \frac{1}{2}k\,(-0{,}020)^2$$

$x$ est élevé au carré : $(-0{,}020)^2 = (0{,}020)^2$. Les deux valeurs sont **rigoureusement identiques**, quel que soit $k$. $E_{pe}$ ne dépend que de $k$ et de $x^2$ — jamais du signe de $x$ (étirement ou compression), et jamais de la masse accrochée : la masse n'apparaît nulle part dans $E_{pe}$, elle vit dans $E_c$.

### L'erreur à repérer : ce n'est pas de la pesanteur

Sur un ressort **horizontal**, l'altitude $z$ du solide ne change jamais — le mouvement reste dans un plan horizontal. Pourtant, le ressort étiré stocke bel et bien de l'énergie : tu peux le sentir résister quand tu le lâches. Cette énergie ne peut donc pas être $E_{pp} = mgz$ (qui resterait constante, puisque $z$ ne bouge pas) : c'est une énergie d'une **nature différente**, l'énergie **élastique** $E_{pe} = \frac{1}{2}kx^2$, stockée dans la déformation du ressort, pas dans l'altitude du solide.

### Lire les diagrammes d'énergie

[[figure:diagrammes-energie-elastique]]

Porte $E_c$, $E_{pe}$ et $E_m$ en fonction de la **position** $x$ : $E_{pe} = \frac{1}{2}kx^2$ dessine une parabole, minimale (nulle) en $x=0$ ; $E_c = E_m - E_{pe}$ dessine la parabole inversée, maximale en $x=0$ ; $E_m$, elle, reste une droite horizontale — le plafond d'énergie que ni $E_c$ ni $E_{pe}$ ne dépasse jamais. Les deux courbes se croisent là où $E_c = E_{pe}$. Aux positions extrêmes $x = \pm X_m$ : le solide s'arrête un instant, $E_c = 0$, toute l'énergie est dans le ressort. Au passage par l'équilibre $x=0$ : $E_{pe}=0$, toute l'énergie est cinétique — c'est là que la vitesse est maximale.

Porté en fonction du **temps**, $E_m$ reste plate ; $E_c(t)$ et $E_{pe}(t)$ oscillent en antiphase (l'une monte quand l'autre descend), mais à une nuance près : parce qu'elles dépendent de $v^2$ et de $x^2$, ces deux courbes oscillent **deux fois plus vite** que $x(t)$ lui-même — leur période est $T_0/2$, pas $T_0$. Un solide qui fait un aller-retour complet ($T_0$) fait passer $E_c$ par deux maximums (un à chaque passage par l'équilibre, dans un sens puis dans l'autre) : ne confonds pas la période de la position avec celle de l'énergie.

### Exemple travaillé — l'énergie de l'oscillateur, en nombres

*Ce qu'on cherche ici, et pourquoi ce geste :* on reprend l'oscillateur déjà rencontré au chapitre Systèmes oscillants ($k = 40\ \text{N/m}$, amplitude $X_m = 0{,}05\ \text{m}$, masse $m = 0{,}40\ \text{kg}$) pour calculer, cette fois, son énergie mécanique — un calcul que ce chapitre-là n'avait pas encore les moyens de justifier.

$$E_m = \frac{1}{2}kX_m^2 = \frac{1}{2}\times 40 \times (0{,}05)^2 = 0{,}05\ \text{J}$$

Au passage par l'équilibre ($x=0$), toute cette énergie est cinétique :

$$\frac{1}{2}mv_{max}^2 = E_m \quad \Longrightarrow \quad v_{max} = \sqrt{\frac{2E_m}{m}} = \sqrt{\frac{2 \times 0{,}05}{0{,}40}} = \sqrt{0{,}25} = 0{,}5\ \text{m/s}$$

$0{,}5\ \text{m/s}$ — exactement la vitesse de lancer qu'on avait choisie, au chapitre Systèmes oscillants, pour un lâcher au passage par l'équilibre. Ce n'était pas un hasard : lancer un solide à l'équilibre, c'est lui donner toute son énergie sous forme cinétique dès le départ.

---

## R6 — Le fil qui se tord emmagasine de l'énergie : $\frac{1}{2}C\theta^2$, et l'énergie du pendule de torsion

Le pendule de torsion obéit au même mécanisme que le ressort, habillé en rotation. Tu l'as rencontré au chapitre Systèmes oscillants (chapitre 5) : un disque suspendu par un fil vertical, qu'on tord d'un angle $\theta$, subit un **moment de rappel** proportionnel à cet angle :

$$M_{rappel} = -C\,\theta$$

où $C$ (en $\text{N}\cdot\text{m}/\text{rad}$) est la constante de torsion du fil — l'exact analogue de la raideur $k$, mais pour un moment plutôt qu'une force.

### Avant de calculer : quelle grandeur entre dans l'énergie de rappel ?

Le pendule de torsion fait intervenir deux grandeurs bien distinctes : le moment d'inertie $J$ du disque (son inertie de rotation, rencontrée au chapitre sur la rotation d'un solide), et la constante de torsion $C$ du fil (son rappel). Avant de lire la suite, décide : laquelle des deux entre dans l'énergie potentielle de torsion — $J$, ou $C$ ?

### La même aire, le même $\frac{1}{2}$

[[figure:travail-torsion-triangle]]

Le réflexe du chapitre précédent reviendrait ici : traiter $M = C\theta$ comme le moment de tout le trajet, et écrire $W = C\theta \times \theta = C\theta^2$. C'est la même erreur, juste habillée en rotation — elle ignore que $M$ part de $0$ et ne vaut $C\theta$ qu'à l'instant final. Comme pour le ressort, le moment moyen sur tout le trajet est $\frac{1}{2}C\theta$, et le travail du couple de rappel, pour tordre le fil de $0$ à $\theta$, est l'aire du triangle sous la droite $M(\theta) = C\theta$ :

$$W = \frac{1}{2}\times\theta\times(C\theta) = \frac{1}{2}C\theta^2$$

On définit l'**énergie potentielle de torsion** :

$$E_{p,torsion} = \frac{1}{2}C\theta^2$$

avec, comme pour le ressort, $W(M_{rappel})_{A\to B} = -\Delta E_{p,torsion}$. Regarde ce que dit cette expression : **$J$ n'y figure nulle part.** L'énergie potentielle de torsion ne dépend que de $C$ et de $\theta$ — jamais du moment d'inertie du disque. Si tu avais répondu « $J$ » à la question posée plus haut, voilà l'écart à corriger : $J$ n'est pas un rappel, c'est une inertie — il vit ailleurs, dans l'énergie cinétique.

[[checkpoint:cp-r6-tor]]

### L'énergie cinétique de rotation

Le disque du pendule de torsion ne translate pas : il **tourne** autour de l'axe du fil, à une vitesse angulaire $\dot{\theta}$. Un point du disque proche de l'axe se déplace lentement ; un point sur le bord se déplace bien plus vite — le disque n'a pas UNE vitesse $v$, il a une vitesse angulaire $\dot\theta$ commune à tous ses points. La formule $\frac{1}{2}mv^2$, pensée pour une translation, ne s'applique donc pas telle quelle. L'énergie cinétique d'un solide en rotation autour d'un axe fixe est :

$$E_c = \frac{1}{2}J\dot{\theta}^2$$

l'analogue rotationnel exact de $\frac{1}{2}mv^2$ : $J$ (le moment d'inertie, déjà rencontré au chapitre sur la rotation d'un solide) joue le rôle de la masse, $\dot\theta$ joue le rôle de $v$.

### Les deux réservoirs, côte à côte

| | Ressort | Pendule de torsion |
|---|---|---|
| Grandeur de mouvement | $x$ | $\theta$ |
| Inertie (dans $E_c$) | $m$ | $J$ |
| Rappel (dans $E_p$) | $k$ | $C$ |
| $E_c$ | $\frac{1}{2}mv^2$ | $\frac{1}{2}J\dot\theta^2$ |
| $E_p$ | $\frac{1}{2}kx^2$ | $\frac{1}{2}C\theta^2$ |

Change $k \leftrightarrow C$, $x \leftrightarrow \theta$, $m \leftrightarrow J$, $v \leftrightarrow \dot\theta$ : c'est la même énergie, habillée en rotation. L'inertie ($m$ ou $J$) ne vit jamais dans $E_p$ ; le rappel ($k$ ou $C$) ne vit jamais dans $E_c$ — ne laisse jamais les deux réservoirs se mélanger.

### L'énergie mécanique du pendule de torsion, et sa conservation

$$E_m = E_c + E_{p,torsion} = \frac{1}{2}J\dot\theta^2 + \frac{1}{2}C\theta^2$$

Sans frottement, ni le poids ni la réaction de l'axe ne produisent de moment par rapport à l'axe du fil (ils passent par cet axe) — seul le couple de rappel travaille. Le même TEC qu'au chapitre 6 donne, terme à terme :

$$\Delta E_c = W(M_{rappel})$$

$$\Delta E_c = -\Delta E_{p,torsion}$$

$$\Delta E_c + \Delta E_{p,torsion} = 0$$

$$\Delta E_m = 0$$

**L'énergie mécanique du pendule de torsion se conserve, en l'absence de frottement** — $E_c$ et $E_{p,torsion}$ s'échangent en permanence, en antiphase, exactement comme pour le ressort.

### Exemple travaillé — le disque lâché depuis $\theta_0$

*Ce qu'on cherche ici, et pourquoi ce geste :* on reprend le pendule de torsion, dont Systèmes oscillants a établi la période ; les valeurs numériques ci-dessous sont propres à cet exemple ($J = 4{,}0\times10^{-3}\ \text{kg}\cdot\text{m}^2$, $C = 0{,}16\ \text{N}\cdot\text{m}/\text{rad}$), lâché sans vitesse angulaire depuis $\theta_0 = 0{,}20\ \text{rad}$, et on calcule son énergie — puis on vérifie le résultat par deux chemins différents, pour être sûr qu'ils s'accordent.

Au lâcher, $\dot\theta = 0$ : toute l'énergie est dans le fil.

$$E_m = \frac{1}{2}C\theta_0^2 = \frac{1}{2}\times 0{,}16 \times (0{,}20)^2 = 3{,}2\times10^{-3}\ \text{J}$$

Au passage par $\theta = 0$, toute cette énergie devient cinétique :

$$\frac{1}{2}J\dot\theta_{max}^2 = E_m \quad \Longrightarrow \quad \dot\theta_{max} = \sqrt{\frac{2E_m}{J}} = \sqrt{\frac{2\times 3{,}2\times10^{-3}}{4{,}0\times10^{-3}}} = \sqrt{1{,}6} \approx 1{,}26\ \text{rad/s}$$

Vérifie avec l'autre chemin, celui de l'équation horaire (chapitre Systèmes oscillants, chapitre 5) : $\omega_0 = \sqrt{C/J} = \sqrt{0{,}16/4{,}0\times10^{-3}} = \sqrt{40} \approx 6{,}32\ \text{rad/s}$, et $\dot\theta_{max} = \omega_0\,\theta_0 \approx 6{,}32 \times 0{,}20 \approx 1{,}26\ \text{rad/s}$. Les deux méthodes s'accordent — l'énergie et l'équation horaire décrivent le même mouvement, vu sous deux angles différents.

---

## R7 — L'énergie du pendule pesant : quand le « ressort » est la pesanteur

Dernier système du programme : le pendule pesant. Ici, ni ressort ni fil de torsion — c'est la pesanteur elle-même qui joue le rôle du rappel, exactement comme au chapitre Systèmes oscillants (chapitre 4), où c'était déjà $g/L$ qui fixait le rythme.

### Prédis, avant de calculer

Un pendule simple oscille sans frottement, lâché depuis un angle $\theta_m$. Au passage par l'écart maximal $\theta_m$ (l'instant où le pendule ralentit, s'arrête un instant, puis repart), qu'arrive-t-il à son énergie mécanique $E_m$ ?

Beaucoup répondent : « $E_m$ diminue, puisque le pendule ralentit — il a perdu de la vitesse, donc de l'énergie. » Engage-toi vraiment avant de continuer : garde cette réponse, ou corrige-la, mais choisis.

### Ce que dit vraiment le ralentissement

Ce raisonnement confond deux choses : $E_c$ ralentit (chute vers $0$), et $E_m$ « diminuerait » avec elle. Mais $E_m$ n'est **pas** $E_c$ — c'est exactement la confusion identifiée au chapitre 5. Reprends le bilan : sans frottement, la seule force qui travaille est le poids (la tension du fil est radiale, perpendiculaire au déplacement, donc $W(\vec{T}) = 0$).

$$\Delta E_c = W(\vec{P}) + W(\vec{T})$$

$$\Delta E_c = W(\vec{P})$$

$$\Delta E_c = -\Delta E_{pp}$$

$$\Delta E_c + \Delta E_{pp} = 0$$

$$\Delta E_m = 0$$

— exactement la même démonstration qu'au chapitre 5, avec la tension du fil à la place de la réaction $\vec{N}$. **$E_m$ ne bouge pas.** Ce qui ralentit, c'est $E_c$ — et ce qu'elle perd, $E_{pp}$ le gagne intégralement : le pendule monte, il ne perd rien, il **convertit**.

### La hauteur, exactement

[[figure:pendule-pesant-energie]]

Pour appliquer $E_{pp} = mgz$ (chapitre 4) à un pendule, il faut la vraie hauteur $z$ — pas la longueur du fil, pas la longueur de l'arc parcouru. Place le pendule à l'angle $\theta$ par rapport à la verticale : le point matériel est alors à une distance verticale $L\cos\theta$ **sous** le point de suspension (projection du fil sur la verticale). Au point le plus bas ($\theta=0$), cette distance vaut $L$. La hauteur gagnée par rapport au point le plus bas est donc la différence :

$$z = L - L\cos\theta = L(1-\cos\theta)$$

Ni $L$ seul (ça, c'est la longueur du fil, pas une hauteur), ni $L\theta$ (ça, c'est la longueur de l'**arc** parcouru, une distance le long de la trajectoire courbe — pas un dénivelé vertical) : c'est $L(1-\cos\theta)$, la vraie projection géométrique.

[[checkpoint:cp-r7-pes]]

### L'énergie mécanique du pendule pesant, et sa conservation

$$E_m = E_c + E_{pp} = \frac{1}{2}mv^2 + mgz, \qquad z = L(1-\cos\theta)$$

Sans frottement, $\Delta E_m = 0$ (établi ci-dessus). Au point le plus bas ($\theta=0$, $z=0$) : $E_{pp}=0$, toute l'énergie est cinétique, la vitesse y est maximale. Aux écarts extrêmes ($\theta=\pm\theta_m$) : $v=0$, $E_c=0$, toute l'énergie est potentielle. Entre les deux, $E_c$ et $E_{pp}$ s'échangent en permanence — le même va-et-vient qu'entre $E_c$ et $E_{pe}$ pour le ressort (chapitre 6), ou entre $E_c$ et $E_{p,torsion}$ pour la torsion (chapitre 7) — mais cette fois le réservoir de rappel est **gravitationnel**, pas élastique.

Une remarque, pour ne pas la laisser filer : pour de petites oscillations, $1-\cos\theta \approx \frac{1}{2}\theta^2$ (même régime des petites oscillations que le $\sin\theta \approx \theta$ de Systèmes oscillants, poussé d'un ordre de plus), donc $E_{pp} \approx \frac{1}{2}(mgL)\theta^2$ — la même forme que $\frac{1}{2}kx^2$, avec $mgL$ qui joue le rôle d'une « raideur » effective. Ce n'est qu'un éclairage : l'expression à retenir reste $E_{pp}=mgz$, exacte à tout angle, pas seulement aux petites oscillations.

### L'erreur à repérer : $E_m$ n'est ni maximale en bas, ni toujours égale à $E_c$

Deux pièges à séparer clairement. D'abord : $E_m$ est **constante** — elle n'est maximale nulle part, elle ne varie pas du tout ; c'est $E_c$ qui est maximale en bas (et $E_{pp}$ maximale aux extrémités). Ensuite : $E_c = E_{pp}$ n'est vrai qu'à des positions **particulières** (là où les deux courbes se croisent sur le diagramme d'énergie) — jamais en permanence. Confondre $E_m$ avec le maximum d'$E_c$, ou généraliser une égalité de passage en règle constante, ce sont deux erreurs différentes, mais qui viennent toutes les deux d'un même relâchement : ne plus distinguer $E_c$, $E_{pp}$ et $E_m$ comme trois grandeurs séparées.

### Exemple travaillé — vitesse au point bas

*Ce qu'on cherche ici, et pourquoi ce geste :* la vitesse en bas se lit directement sur le bilan d'énergie, sans jamais résoudre l'équation horaire — le même raccourci qu'au chapitre 3 pour la chute libre.

Un pendule simple, $L = 1{,}0\ \text{m}$, $m = 0{,}20\ \text{kg}$, est lâché sans vitesse depuis $\theta_m = 0{,}30\ \text{rad}$ ($g\approx9{,}8\ \text{m/s}^2$). Au lâcher, toute l'énergie est potentielle :

$$E_m = mgL(1-\cos\theta_m) = 0{,}20\times9{,}8\times1{,}0\times(1-\cos0{,}30)$$

$$1 - \cos0{,}30 \approx 0{,}0447 \quad \Longrightarrow \quad E_m \approx 0{,}20\times9{,}8\times1{,}0\times0{,}0447 \approx 8{,}8\times10^{-2}\ \text{J}$$

(Vérifie au passage : l'approximation $\frac{1}{2}\theta_m^2 = \frac{1}{2}\times0{,}30^2 = 0{,}045$ tombe très proche de $0{,}0447$ — cohérent avec les petites oscillations.)

Au point le plus bas, toute cette énergie est cinétique :

$$v_{max} = \sqrt{2gL(1-\cos\theta_m)} = \sqrt{2\times9{,}8\times1{,}0\times0{,}0447} \approx \sqrt{0{,}876} \approx 0{,}94\ \text{m/s}$$

---

## R8 — Pour t'entraîner

### Récapitulatif express

- $E_c = \frac{1}{2}mv^2$ ; théorème de l'énergie cinétique : $\Delta E_c = \sum W(\vec{F}_{ext})$, un raccourci qui relie directement les forces à la vitesse.
- Le travail d'une force **variable** est l'aire sous la courbe $F(x)$ — un triangle, pas un rectangle, quand $F$ croît linéairement depuis $0$.
- Le travail du poids ne dépend que de l'altitude : $W(\vec{P}) = -\Delta E_{pp}$, avec $E_{pp}=mgz$. Sans frottement, $E_m=E_c+E_{pp}$ se conserve ; avec frottement, $\Delta E_m = W(\vec{f}) < 0$.
- **Ressort** : $E_{pe} = \frac{1}{2}kx^2$ (démontrée depuis l'aire du triangle sous $F=kx$) ; $E_m = \frac{1}{2}mv^2+\frac{1}{2}kx^2$ se conserve sans frottement.
- **Torsion** : $E_{p,torsion} = \frac{1}{2}C\theta^2$ ; $E_c=\frac{1}{2}J\dot\theta^2$ ; $E_m$ se conserve sans frottement. Les deux réservoirs ne se mélangent jamais : l'inertie ($m$ ou $J$) dans $E_c$, le rappel ($k$ ou $C$) dans $E_p$.
- **Pendule pesant** : $E_{pp}=mgz$ avec $z=L(1-\cos\theta)$ (jamais $L$, jamais $L\theta$) ; $E_m=\frac{1}{2}mv^2+mgz$ se conserve sans frottement.
- Sur un diagramme d'énergie (en fonction de $x$ ou de $\theta$) : $E_m$ est une droite horizontale, $E_p$ une parabole, $E_c$ la parabole inversée — elles se croisent, jamais superposées en permanence.

### Exercice de type bac

À toi. Cherche entièrement sur papier avant de dévoiler la correction — engage une réponse à chaque question, puis confronte-la au raisonnement expert qui n'apparaît qu'après ta tentative.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

La variation qui suit change l'habillage — d'autres oscillateurs, d'autres nombres — mais tu dois reconnaître la même procédure derrière : identifier le réservoir de rappel, écrire $E_m$, et exploiter sa conservation.

[[exercise:r-variation]]
