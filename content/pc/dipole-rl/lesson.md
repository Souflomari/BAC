# Dipôle RL

---

## R0 — Accroche : la lampe qui traîne à s'allumer

Ferme les yeux une seconde et imagine l'expérience suivante. Un générateur, un interrupteur, une lampe, et une résistance en série. Tu fermes l'interrupteur : la lampe s'allume à son éclat maximal — immédiatement, sans transition visible.

Maintenant, on remplace la résistance par une bobine — un simple fil enroulé en spires. Même générateur, même lampe, même interrupteur. Tu fermes l'interrupteur.

Avant de lire la suite, engage-toi vraiment : à ton avis, la lampe atteint-elle son éclat maximal **instantanément**, exactement comme avec la résistance ? Ou bien se passe-t-il quelque chose de différent ? Prends position, en une phrase, avant de continuer.

[[checkpoint:cp-r0-predict]]

Voici ce qu'on observe réellement, si on filme au ralenti ou si on relève le courant à l'oscilloscope : la lampe **ne s'allume pas d'un coup**. Elle met un court instant — quelques millisecondes, parfois plus selon la bobine — à atteindre son éclat final. Le courant grimpe progressivement depuis zéro jusqu'à sa valeur de régime permanent, au lieu de sauter directement à cette valeur.

Si tu avais prédit un allumage instantané comme pour la résistance seule, ta prédiction et la réalité se contredisent — et c'est précisément cet écart qu'on va comprendre. Si tu avais deviné juste, la vraie question commence maintenant : **pourquoi la bobine retarde-t-elle l'établissement du courant, alors que la résistance ne le retarde pas** ?

C'est tout l'objet de cette leçon : comprendre ce qu'est une bobine, pourquoi elle s'oppose aux variations de courant, et comment le courant s'établit progressivement quand on lui applique une tension.

---

## R1 — Le mécanisme : ce qu'est une bobine, et pourquoi elle s'oppose aux variations de courant

### Qu'est-ce qu'une bobine ?

Une bobine, c'est un fil conducteur enroulé en spires serrées, souvent autour d'un noyau. Cet objet, très simple à décrire matériellement, a une propriété électrique remarquable : quand le courant qui le traverse **varie**, il apparaît à ses bornes une tension qui s'oppose à cette variation. C'est ce comportement — pas sa forme — qui définit la bobine comme dipôle.

On la représente, dans un schéma électrique, par le symbole d'un enroulement (une suite de boucles), sur lequel on inscrit les deux grandeurs qui la caractérisent entièrement :

- $L$, l'**inductance** de la bobine, exprimée en henry (H) ;
- $r$, sa **résistance interne**, exprimée en ohm ($\Omega$) — c'est la résistance ordinaire du fil qui compose l'enroulement, exactement comme n'importe quel conducteur ohmique.

Une bobine réelle n'est donc rien d'autre qu'un fil résistant ($r$) enroulé de façon à produire l'effet d'inductance ($L$). Les deux propriétés coexistent dans le même objet.

### La relation caractéristique $u = ri + L\dfrac{di}{dt}$

En convention récepteur — le courant $i$ entre par la borne où la tension $u$ est comptée positivement, exactement comme pour un résistor ou un condensateur — la tension aux bornes d'une bobine s'écrit :

$$u = ri + L\frac{di}{dt}$$

Cette expression a deux morceaux, et chacun raconte une histoire différente.

**Le terme $ri$** est la loi d'Ohm ordinaire, appliquée à la résistance interne du fil. Rien de nouveau ici : c'est exactement ce que ferait n'importe quel résistor de résistance $r$.

**Le terme $L\dfrac{di}{dt}$** est ce qui rend la bobine différente d'un simple résistor. Il ne dépend pas du courant lui-même, mais de sa **vitesse de variation**. Si le courant est constant, $\dfrac{di}{dt} = 0$, et ce terme disparaît entièrement — la bobine se comporte alors comme un simple résistor de résistance $r$, rien de plus. Mais dès que le courant varie, ce terme apparaît, et il est d'autant plus grand que le courant varie vite.

[[figure:bobine-modele-rl]]

### Le sens physique : une inertie électrique

Pourquoi ce terme existe-t-il ? Le mécanisme est le suivant : le courant qui traverse la bobine crée un champ magnétique à l'intérieur de l'enroulement. Quand ce courant varie, ce champ varie aussi — et cette variation induit, dans la bobine elle-même, une tension qui s'oppose à ce qui la cause. C'est l'auto-induction : la bobine réagit à ses propres variations de courant en générant une tension qui les freine.

L'analogie la plus parlante est mécanique. Pense à la masse d'un objet : plus un objet est massif, plus il résiste aux changements de vitesse — il faut une force plus grande pour l'accélérer ou le freiner rapidement. La masse est une inertie **mécanique**. De la même façon, l'inductance $L$ est une inertie **électrique** : plus $L$ est grand, plus la bobine résiste aux changements rapides du courant qui la traverse. Un courant constant ne rencontre aucune opposition de ce type ($di/dt = 0$) ; un courant qui cherche à varier brutalement rencontre une opposition d'autant plus forte que $L$ est grand.

### Teste la prédiction naïve avant de la croire

Revenons à la question posée en ouverture : pourquoi le courant ne peut-il pas sauter instantanément à sa valeur finale, dès la fermeture de l'interrupteur ?

Imagine que ce saut instantané se produise réellement : à l'instant $t = 0$, le courant passerait de $0$ à une valeur finale non nulle en un temps nul. Une variation de courant en un temps nul, c'est une vitesse de variation $\dfrac{di}{dt}$ **infinie** à cet instant. Or la tension aux bornes de la bobine contient le terme $L\dfrac{di}{dt}$ — qui deviendrait donc infini lui aussi. Un générateur réel, de force électromotrice finie $E$, ne peut pas fournir une tension infinie à un dipôle du circuit.

Le saut instantané est donc physiquement impossible : il exigerait une tension que rien dans le circuit ne peut produire. Le courant qui traverse une bobine ne peut varier que **continûment** — jamais par un saut brusque. C'est exactement pourquoi la lampe de l'accroche s'allume progressivement : le courant grimpe, il ne saute pas.

Vérifie ta compréhension de la continuité du courant.

[[checkpoint:cp-r1-i-continuite]]

---

## R2 — Établir l'équation différentielle et trouver $i(t)$

### Le circuit et la loi des mailles

On étudie le montage classique : un générateur idéal de force électromotrice $E$, un interrupteur $K$, et en série, un résistor de résistance $R_0$ et la bobine $(r, L)$. Avant $t = 0$, le circuit est ouvert, aucun courant ne circule. À $t = 0$, on ferme $K$ : c'est un échelon de tension $E$ appliqué brutalement au dipôle RL.

[[figure:rl-schema]]

Pour alléger l'écriture, on regroupe toutes les résistances du circuit en une seule résistance totale $R = R_0 + r$ — la résistance ajoutée et la résistance interne de la bobine jouent exactement le même rôle du point de vue de la loi d'Ohm, rien ne justifie de les garder séparées dans l'équation.

La loi des mailles donne, à chaque instant :

$$E = R_0 i + u_{bobine}$$

On remplace $u_{bobine}$ par son expression établie au chapitre 2 :

$$E = R_0 i + ri + L\frac{di}{dt}$$

On regroupe les deux termes résistifs :

$$E = (R_0 + r)\,i + L\frac{di}{dt} = Ri + L\frac{di}{dt}$$

Ce qui s'écrit, dans l'ordre standard d'une équation différentielle :

$$\boxed{L\frac{di}{dt} + Ri = E}$$

C'est l'**équation différentielle du dipôle RL** soumis à un échelon de tension $E$.

### Deviner la solution, puis vérifier

Réorganisons l'équation pour voir ce qu'elle dit vraiment :

$$\frac{di}{dt} = \frac{E - Ri}{L} = -\frac{R}{L}\left(i - \frac{E}{R}\right)$$

Elle dit : la vitesse à laquelle $i$ varie est proportionnelle à l'écart entre $i$ et une valeur particulière, $\dfrac{E}{R}$. Plus $i$ est loin de cette valeur, plus il varie vite ; plus $i$ s'en approche, plus il ralentit. C'est exactement le mécanisme de la lampe qui ralentit son allumage à mesure qu'elle approche de son éclat final.

Appelons $I_{max} = \dfrac{E}{R}$ cette valeur cible, et $\tau = \dfrac{L}{R}$ (on justifiera ce choix dans un instant). L'équation se lit alors $\dfrac{di}{dt} = -\dfrac{1}{\tau}(i - I_{max})$.

On pose l'hypothèse — une supposition qu'on va vérifier, pas une certitude encore — qu'une fonction de la forme $i(t) = I_{max} + Ke^{-t/\tau}$ convient, où $K$ est une constante à déterminer. On sait déjà qu'avant $t=0$ le circuit était ouvert : le courant initial est nul, $i(0) = 0$. Cette condition fixe $K$ :

$$0 = I_{max} + K \implies K = -I_{max}$$

L'hypothèse devient :

$$i(t) = I_{max}\left(1 - e^{-t/\tau}\right)$$

**Vérifions que cette fonction satisfait bien l'équation différentielle.** On calcule sa dérivée :

$$\frac{di}{dt} = \frac{I_{max}}{\tau}\,e^{-t/\tau}$$

On substitue $i(t)$ et $\dfrac{di}{dt}$ dans $L\dfrac{di}{dt} + Ri = E$ :

$$L\frac{di}{dt} + Ri = L\frac{I_{max}}{\tau}e^{-t/\tau} + RI_{max}\left(1 - e^{-t/\tau}\right)$$

Si — et seulement si — $\tau = \dfrac{L}{R}$, alors $\dfrac{L}{\tau} = R$, et le premier terme devient $RI_{max}e^{-t/\tau}$ :

$$L\frac{di}{dt} + Ri = RI_{max}e^{-t/\tau} + RI_{max} - RI_{max}e^{-t/\tau} = RI_{max}$$

Les deux termes en $e^{-t/\tau}$ s'annulent exactement, et il reste $RI_{max} = R \cdot \dfrac{E}{R} = E$. L'équation est vérifiée, **quel que soit l'instant $t$**. L'hypothèse est confirmée — et au passage, la vérification vient de nous imposer la valeur de $\tau$ : ce n'est que pour $\tau = L/R$ que les deux termes exponentiels s'annulent. Si on avait choisi un autre $\tau$, l'équation ne se serait pas refermée sur elle-même.

### Ce que dit la courbe $i(t)$

$$i(t) = I_{max}\left(1 - e^{-t/\tau}\right), \qquad I_{max} = \frac{E}{R}, \qquad \tau = \frac{L}{R}$$

À $t = 0$ : $i(0) = I_{max}(1-1) = 0$. Le courant part bien de zéro — continu, comme le chapitre 2 l'imposait.

Quand $t$ devient grand ($t \gg \tau$) : $e^{-t/\tau} \to 0$, donc $i(t) \to I_{max}$. Le courant tend vers sa valeur de régime permanent $I_{max} = E/R$, sans jamais la dépasser ni sauter jusqu'à elle.

Entre les deux, la montée est **rapide au début, puis de plus en plus lente** — exactement l'allure d'un ralentissement progressif, jamais un saut, jamais une ligne droite.

[[figure:i-etablissement]]

### Exemple numérique

Prenons un résistor $R_0 = 50\ \Omega$, une bobine de résistance interne $r = 10\ \Omega$ et d'inductance $L = 0{,}3\ \text{H}$, alimentés par un générateur idéal $E = 6\ \text{V}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* avant de calculer quoi que ce soit, on identifie la résistance totale du circuit — c'est elle qui pilote à la fois le courant final et la constante de temps, jamais $R_0$ ou $r$ isolément.

$$R = R_0 + r = 50 + 10 = 60\ \Omega$$

Le courant de régime permanent :

$$I_{max} = \frac{E}{R} = \frac{6}{60} = 0{,}1\ \text{A} = 100\ \text{mA}$$

La constante de temps :

$$\tau = \frac{L}{R} = \frac{0{,}3}{60} = 5\times10^{-3}\ \text{s} = 5\ \text{ms}$$

À l'instant $t = \tau = 5\ \text{ms}$, le courant vaut :

$$i(\tau) = I_{max}\left(1 - e^{-1}\right) \approx 0{,}1 \times 0{,}632 \approx 0{,}0632\ \text{A} \approx 63\ \text{mA}$$

On garde ces valeurs — $R = 60\ \Omega$, $L = 0{,}3\ \text{H}$, $I_{max} = 100\ \text{mA}$, $\tau = 5\ \text{ms}$ — elles reviendront dans les chapitres suivants.

Vérifie d'abord que tu distingues bien l'instant de la fermeture du régime permanent.

[[checkpoint:cp-r2-etablissement-permanent]]

Puis assure-toi du rôle de la résistance interne $r$ de la bobine.

[[checkpoint:cp-r2-role-r]]

---

## R3 — La constante de temps $\tau = L/R$

### Sens physique

$\tau$ mesure la **durée caractéristique** de l'établissement du courant — le temps qu'il faut, en ordre de grandeur, pour que le courant se rapproche significativement de sa valeur finale $I_{max}$. Ce n'est pas l'instant où le courant « finit » de s'établir (il ne l'atteint jamais exactement, on l'a vu : $i(t)$ ne fait que se rapprocher de $I_{max}$ sans jamais l'atteindre en un temps fini) — c'est l'échelle de temps sur laquelle ce rapprochement se joue.

Comme pour toute constante de temps, on retient une règle pratique : au bout d'une durée d'environ $5\tau$, le courant est pratiquement confondu avec $I_{max}$ (l'écart restant est inférieur à $1\%$) ; on considère alors le régime permanent atteint.

### D'où vient la formule, et pourquoi cette dimension

$\tau = L/R$ n'est pas un choix arbitraire : c'est exactement la combinaison qui a permis, dans la vérification du chapitre 3, aux deux termes exponentiels de s'annuler. Un autre choix de $\tau$ aurait laissé un reste non nul dans l'équation différentielle.

Vérifions que cette combinaison a bien la dimension d'un temps. On isole le terme purement inductif de la relation caractéristique de la bobine, $u_L = L\dfrac{di}{dt}$, d'où $L = \dfrac{u_L}{di/dt}$ : l'inductance s'exprime donc en volt (unité de $u_L$) divisé par un courant divisé par un temps, c'est-à-dire en volt-seconde par ampère.

$$[L] = \frac{\text{V}}{\text{A}/\text{s}} = \text{V}\cdot\text{s}/\text{A}, \qquad [R] = \frac{\text{V}}{\text{A}}$$

$$\frac{[L]}{[R]} = \frac{\text{V}\cdot\text{s}/\text{A}}{\text{V}/\text{A}} = \text{s}$$

$L/R$ a donc bien la dimension d'un temps — ce n'est pas une coïncidence, c'est la confirmation que $\tau$ mesure une durée.

### Lire $\tau$ sur un graphe expérimental

Deux méthodes pratiques, aux résultats équivalents, pour mesurer $\tau$ sur une courbe $i(t)$ enregistrée à l'oscilloscope :

- **La méthode des 63 %.** On relève $I_{max}$ (la valeur asymptotique, en régime permanent). On cherche l'instant où $i(t)$ atteint $0{,}63 \times I_{max}$ ($1 - e^{-1} \approx 0{,}63$) : cet instant est $\tau$.
- **La méthode de la tangente à l'origine.** On trace la tangente à la courbe $i(t)$ au point $t = 0$. Cette tangente coupe l'asymptote horizontale $i = I_{max}$ en un point d'abscisse exactement $t = \tau$. (Cette propriété vient directement de la pente à l'origine, $\dfrac{di}{dt}(0) = \dfrac{I_{max}}{\tau}$ : une droite de cette pente, partant de $0$, atteint $I_{max}$ précisément en $t = \tau$.)

[[figure:i-etablissement]]

### Exemple numérique

On reprend le circuit du chapitre 3 : $R = 60\ \Omega$, $L = 0{,}3\ \text{H}$, donc $\tau = 5\ \text{ms}$ et $I_{max} = 100\ \text{mA}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la méthode des 63 % pour retrouver, sur un oscillogramme, une valeur qu'on a déjà calculée exactement au chapitre 3 — c'est ce recoupement qui valide la méthode graphique.

Par la méthode des 63 % : à $t = 5\ \text{ms}$, on doit lire $i \approx 0{,}63 \times 100 = 63\ \text{mA}$ sur l'oscillogramme — cohérent avec le calcul exact fait au chapitre 3 ($\approx 63\ \text{mA}$).

Le régime permanent est pratiquement atteint à $t \approx 5\tau = 25\ \text{ms}$.

Vérifie ta compréhension de la constante de temps — le point d'arrêt t'attend à la fin de ce chapitre, après les deux sections qui suivent.

### Une troisième lecture : la droite $\dfrac{di}{dt} = f(i)$

Les deux méthodes précédentes lisent le temps en abscisse. Un sujet peut te donner une courbe d'un autre genre : la **dérivée** $\dfrac{di}{dt}$ portée en fonction de $i$, sans aucun axe de temps. La bonne réaction n'est pas de chercher $\tau$ à l'œil, c'est de relire l'équation différentielle du chapitre 3, qui donne la réponse d'avance.

Reprends-la et isole la dérivée :

$$
L\,\frac{di}{dt} + (R_0 + r)\,i = E
\qquad\Longrightarrow\qquad
\frac{di}{dt} = \frac{E}{L} - \frac{R_0 + r}{L}\,i
$$

C'est une **fonction affine** de $i$. Si l'on porte $\dfrac{di}{dt}$ en ordonnée et $i$ en abscisse, on obtient donc une **droite**, dont les trois éléments remarquables se lisent directement :

- son **ordonnée à l'origine** (en $i = 0$, c'est-à-dire à l'instant de la fermeture) vaut $\dfrac{E}{L}$ — elle donne **$L$** si $E$ est connue ;
- sa **pente** vaut $-\dfrac{R_0 + r}{L}$ — négative, et c'est la signature du phénomène : plus le courant monte, plus il monte lentement. Elle donne **$R_0 + r$** une fois $L$ connue, ou directement $-\dfrac{1}{\tau}$ ;
- son **intersection avec l'axe des abscisses**, là où $\dfrac{di}{dt} = 0$, donne $i = \dfrac{E}{R_0 + r} = I_{max}$ — le régime permanent, celui où plus rien ne varie.

Deux lectures suffisent donc à identifier complètement le circuit. Et note ce que cette méthode a de mieux que les deux autres : elle donne $L$ et $R_0 + r$ **séparément**, là où les 63 % et la tangente ne donnent que leur quotient $\tau = L/(R+r)$.

*Le piège nommé de cette lecture :* prendre la pente pour $\tau$ au lieu de $-\dfrac{1}{\tau}$, ou en perdre le signe. Le contrôle qui tranche : une pente **positive** décrirait un courant qui s'établit de plus en plus vite à mesure qu'il monte — l'inverse exact du mécanisme d'inertie électrique du chapitre 2.

### La rupture du courant : ce qui se passe quand on OUVRE l'interrupteur

Tout ce qui précède décrit l'**établissement** : on ferme l'interrupteur, le courant monte. Un sujet demande aussi, très souvent, ce qui se passe à la **rupture** — quand on rouvre. C'est le même mécanisme, pris par l'autre bout, et il produit un phénomène spectaculaire qu'il faut savoir expliquer.

**Le fait de départ, c'est celui du chapitre 2.** Une bobine s'oppose aux **variations** du courant qui la traverse. À la fermeture, elle freinait la montée ; à l'ouverture, elle s'oppose à la chute — et cette fois elle a de quoi le faire, puisqu'elle a stocké de l'énergie $E_L = \frac{1}{2}Li^2$ (chapitre 5 ci-après).

**Le problème que cela pose.** Si l'on ouvrait brutalement le circuit, le courant devrait passer de $I_{max}$ à $0$ en un temps quasi nul. La tension aux bornes de la bobine, $u = r\,i + L\dfrac{di}{dt}$ — dont le second terme écrase ici le premier — deviendrait alors **énorme** en valeur absolue — c'est l'étincelle qu'on voit jaillir à l'interrupteur, et c'est ce qui détruit les composants d'un montage réel.

**La solution du montage : une voie de secours.** On place donc, en parallèle sur la bobine, un chemin par lequel le courant pourra continuer à circuler pendant qu'il décroît — le plus souvent une **diode dite « de roue libre »**, montée en sens bloquant tant que le générateur alimente, et qui devient passante dès l'ouverture. Parfois c'est simplement un second conducteur ohmique. Le courant ne s'annule alors pas d'un coup : il décroît, dans cette maille de secours, avec sa propre constante de temps.

**Ce qu'il faut savoir écrire.** Dans la maille de rupture, il n'y a plus de générateur. La loi des mailles y donne une équation **sans second membre** :

$$L\,\frac{di}{dt} + R'\,i = 0$$

où $R'$ est la résistance totale de la maille de secours (la résistance $r$ de la bobine, plus tout ce qui est sur le chemin). La solution est une décroissance exponentielle,

$$i(t) = I_{max}\,e^{-t/\tau'} \qquad\text{avec}\qquad \tau' = \frac{L}{R'}$$

partant de $I_{max}$ — car **le courant dans la bobine est continu** : sa valeur juste après l'ouverture est exactement celle qu'il avait juste avant. C'est le point qui décide de tout, et c'est encore le chapitre 2.

*Le piège nommé :* écrire $i(0^+) = 0$ « puisqu'on a ouvert l'interrupteur ». Non — c'est le courant dans la **branche du générateur** qui s'annule ; celui de la bobine, lui, ne peut pas sauter, et il vaut encore $I_{max}$ à cet instant. Second piège : réutiliser $\tau = L/(R+r)$ de l'établissement. La maille de rupture n'a pas la même résistance totale que celle de l'établissement, donc pas la même constante de temps.

[[checkpoint:cp-r3-tau]]

---

## R4 — L'énergie emmagasinée dans la bobine

### D'où vient cette énergie : un bilan de puissance

Reprenons la loi des mailles du circuit, $E = Ri + L\dfrac{di}{dt}$, et multiplions chaque terme par $i$ — un geste qui transforme une équation de tensions en équation de **puissances** (une tension multipliée par un courant, c'est une puissance) :

$$Ei = Ri^2 + Li\frac{di}{dt}$$

Chaque terme raconte où va la puissance fournie par le générateur, $Ei$ :

- $Ri^2$ est la puissance dissipée par effet Joule dans la résistance totale — définitivement perdue en chaleur.
- $Li\dfrac{di}{dt}$ est ce qui reste. Ce n'est pas dissipé : c'est ce que la bobine **emmagasine**.

[[figure:bilan-puissance-energie]]

### Pourquoi $Li\dfrac{di}{dt}$ est une énergie stockée : $E_L = \frac{1}{2}Li^2$

Le terme $Li\dfrac{di}{dt}$ se reconnaît : c'est exactement la dérivée par rapport au temps de $\dfrac{1}{2}Li^2$. Vérifions-le en dérivant cette expression :

$$\frac{d}{dt}\left(\frac{1}{2}Li^2\right) = \frac{1}{2}L \cdot 2i\frac{di}{dt} = Li\frac{di}{dt}$$

C'est exactement le terme qu'on cherchait à interpréter. Donc $Li\dfrac{di}{dt}$ est la **puissance reçue par la bobine**, et $\dfrac{1}{2}Li^2$ est l'**énergie qu'elle a accumulée** à l'instant considéré :

$$E_L = \frac{1}{2}Li^2$$

Cette énergie est stockée sous forme **magnétique** — dans le champ créé par le courant à l'intérieur de l'enroulement — et non dissipée. Elle croît tant que $i$ croît (à l'établissement du courant) et se stabilise dès que le régime permanent est atteint ($i = I_{max}$ constant) : à ce moment, toute la puissance fournie par le générateur part en effet Joule, et l'énergie stockée dans la bobine ne varie plus — elle reste là, disponible, tant que le courant continue de circuler.

### Exemple numérique

Toujours avec $L = 0{,}3\ \text{H}$ et $I_{max} = 100\ \text{mA} = 0{,}1\ \text{A}$ (le circuit des chapitres 3 et 4), une fois le régime permanent atteint :

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique directement $E_L = \frac{1}{2}Li^2$ avec la valeur finale du courant, puisque c'est l'énergie stockée en régime permanent qu'on veut — pas une valeur instantanée pendant la phase transitoire.

$$E_L = \frac{1}{2} \times 0{,}3 \times (0{,}1)^2$$

$$E_L = \frac{1}{2} \times 0{,}3 \times 0{,}01 = 1{,}5\times10^{-3}\ \text{J} = 1{,}5\ \text{mJ}$$

Cette énergie reste emmagasinée dans la bobine tant que le courant de $100\ \text{mA}$ continue de circuler.

---

## R5 — Pour t'entraîner

### Récapitulatif express

- La bobine : dipôle $(r, L)$, $u = ri + L\dfrac{di}{dt}$ en convention récepteur. Le terme $L\dfrac{di}{dt}$ s'oppose aux variations de courant — une inertie électrique.
- Réponse à un échelon $E$ : équation $L\dfrac{di}{dt} + Ri = E$, solution $i(t) = I_{max}(1-e^{-t/\tau})$, avec $I_{max} = E/R$ et $\tau = L/R$.
- $\tau$ est une durée ($\text{H}/\Omega = \text{s}$) ; régime permanent atteint pour $t \gtrsim 5\tau$.
- Énergie emmagasinée : $E_L = \frac{1}{2}Li^2$.

### Exercice de type bac

Ce qui suit est un exercice national **vérifié** (session normale 2020) : trois questions courtes sur la réponse d'un dipôle RL à un échelon de tension, dans le format que tu retrouveras le jour J. Pour chaque question : cherche sur papier d'abord, engage une réponse, puis seulement ouvre le raisonnement expert et compare-le au tien.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, habillage et chiffres différents — pour que tu reconnaisses la procédure au lieu de recopier la solution du sujet.

[[exercise:r-variation]]
