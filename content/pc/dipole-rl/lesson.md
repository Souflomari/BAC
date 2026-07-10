# Dipôle RL

---

## R0 — Accroche : la lampe qui traîne à s'allumer

Ferme les yeux une seconde et imagine l'expérience suivante. Un générateur, un interrupteur, une lampe, et une résistance en série. Tu fermes l'interrupteur : la lampe s'allume à son éclat maximal — immédiatement, sans transition visible.

Maintenant, on remplace la résistance par une bobine — un simple fil enroulé en spires. Même générateur, même lampe, même interrupteur. Tu fermes l'interrupteur.

Avant de lire la suite, engage-toi vraiment : à ton avis, la lampe atteint-elle son éclat maximal **instantanément**, exactement comme avec la résistance ? Ou bien se passe-t-il quelque chose de différent ? Prends position, en une phrase, avant de continuer.

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

---

## R2 — Établir l'équation différentielle et trouver $i(t)$

### Le circuit et la loi des mailles

On étudie le montage classique : un générateur idéal de force électromotrice $E$, un interrupteur $K$, et en série, un résistor de résistance $R_0$ et la bobine $(r, L)$. Avant $t = 0$, le circuit est ouvert, aucun courant ne circule. À $t = 0$, on ferme $K$ : c'est un échelon de tension $E$ appliqué brutalement au dipôle RL.

[[figure:rl-schema]]

Pour alléger l'écriture, on regroupe toutes les résistances du circuit en une seule résistance totale $R = R_0 + r$ — la résistance ajoutée et la résistance interne de la bobine jouent exactement le même rôle du point de vue de la loi d'Ohm, rien ne justifie de les garder séparées dans l'équation.

La loi des mailles donne, à chaque instant :

$$E = R_0 i + u_{bobine}$$

On remplace $u_{bobine}$ par son expression établie en R1 :

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

À $t = 0$ : $i(0) = I_{max}(1-1) = 0$. Le courant part bien de zéro — continu, comme R1 l'imposait.

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

On garde ces valeurs — $R = 60\ \Omega$, $L = 0{,}3\ \text{H}$, $I_{max} = 100\ \text{mA}$, $\tau = 5\ \text{ms}$ — elles reviendront dans les rungs suivants.

---

## R3 — La constante de temps $\tau = L/R$

### Sens physique

$\tau$ mesure la **durée caractéristique** de l'établissement du courant — le temps qu'il faut, en ordre de grandeur, pour que le courant se rapproche significativement de sa valeur finale $I_{max}$. Ce n'est pas l'instant où le courant « finit » de s'établir (il ne l'atteint jamais exactement, on l'a vu : $i(t)$ ne fait que se rapprocher de $I_{max}$ sans jamais l'atteindre en un temps fini) — c'est l'échelle de temps sur laquelle ce rapprochement se joue.

Comme pour toute constante de temps, on retient une règle pratique : au bout d'une durée d'environ $5\tau$, le courant est pratiquement confondu avec $I_{max}$ (l'écart restant est inférieur à $1\%$) ; on considère alors le régime permanent atteint.

### D'où vient la formule, et pourquoi cette dimension

$\tau = L/R$ n'est pas un choix arbitraire : c'est exactement la combinaison qui a permis, dans la vérification de R2, aux deux termes exponentiels de s'annuler. Un autre choix de $\tau$ aurait laissé un reste non nul dans l'équation différentielle.

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

On reprend le circuit de R2 : $R = 60\ \Omega$, $L = 0{,}3\ \text{H}$, donc $\tau = 5\ \text{ms}$ et $I_{max} = 100\ \text{mA}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la méthode des 63 % pour retrouver, sur un oscillogramme, une valeur qu'on a déjà calculée exactement en R2 — c'est ce recoupement qui valide la méthode graphique.

Par la méthode des 63 % : à $t = 5\ \text{ms}$, on doit lire $i \approx 0{,}63 \times 100 = 63\ \text{mA}$ sur l'oscillogramme — cohérent avec le calcul exact fait en R2 ($\approx 63\ \text{mA}$).

Le régime permanent est pratiquement atteint à $t \approx 5\tau = 25\ \text{ms}$.

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

Toujours avec $L = 0{,}3\ \text{H}$ et $I_{max} = 100\ \text{mA} = 0{,}1\ \text{A}$ (le circuit de R2-R3), une fois le régime permanent atteint :

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

### Exercice de type bac (original — entraînement, non un sujet officiel)

On réalise le montage suivant : un générateur idéal de f.é.m. $E = 12\ \text{V}$, un interrupteur $K$, un résistor $R_0 = 90\ \Omega$ et une bobine d'inductance $L$ et de résistance interne $r = 10\ \Omega$, tous en série. On ferme $K$ à $t = 0$ et on enregistre $i(t)$ à l'oscilloscope. La courbe montre un courant qui croît de $0$ vers une asymptote horizontale $I_{max} = 120\ \text{mA}$, et la tangente à l'origine coupe cette asymptote à $t = 4\ \text{ms}$.

[[figure:oscillogramme-exercice]]

**1) Vérifier la valeur de $I_{max}$ lue sur la courbe à partir des données du circuit.**

*Ce qu'on cherche ici, et pourquoi ce geste :* $I_{max}$ correspond au régime permanent, là où $\dfrac{di}{dt} = 0$ — on repart donc de l'équation différentielle en y annulant ce terme, plutôt que de deviner une formule.

En régime permanent, $L\dfrac{di}{dt} = 0$, donc l'équation $L\dfrac{di}{dt} + Ri = E$ se réduit à $Ri_{max} = E$, soit $I_{max} = E/R$. La résistance totale du circuit est $R = R_0 + r = 90 + 10 = 100\ \Omega$. Donc :

$$I_{max} = \frac{E}{R} = \frac{12}{100} = 0{,}12\ \text{A} = 120\ \text{mA}$$

C'est cohérent avec la valeur lue sur la courbe.

**2) En déduire la valeur de l'inductance $L$ de la bobine.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la tangente à l'origine coupe l'asymptote en $t = \tau$ — c'est la définition même de cette méthode de lecture (R3). On lit donc directement $\tau = 4\ \text{ms}$, puis on en tire $L$ à partir de $\tau = L/R$.

$$\tau = 4\ \text{ms} = 4\times10^{-3}\ \text{s}$$

$$L = \tau \times R = 4\times10^{-3} \times 100 = 0{,}4\ \text{H}$$

**3) Calculer le courant $i$ à l'instant $t = 4\ \text{ms}$, puis à $t = 8\ \text{ms}$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* $t = 4\ \text{ms}$ est exactement $\tau$ : on peut utiliser directement le facteur $1-e^{-1}\approx 0{,}63$ sans repartir de zéro. Pour $t = 8\ \text{ms} = 2\tau$, on utilise $1-e^{-2}\approx 0{,}865$.

$$i(\tau) = I_{max}(1-e^{-1}) \approx 0{,}12 \times 0{,}632 \approx 0{,}0758\ \text{A} \approx 75{,}8\ \text{mA}$$

$$i(2\tau) = I_{max}(1-e^{-2}) \approx 0{,}12 \times 0{,}865 \approx 0{,}104\ \text{A} \approx 104\ \text{mA}$$

**4) Calculer l'énergie emmagasinée dans la bobine en régime permanent.**

*Ce qu'on cherche ici, et pourquoi ce geste :* « régime permanent » signifie $i = I_{max}$ — on applique $E_L = \frac{1}{2}Li^2$ avec cette valeur finale, pas avec une valeur instantanée de la phase transitoire.

$$E_L = \frac{1}{2}L I_{max}^2 = \frac{1}{2} \times 0{,}4 \times (0{,}12)^2$$

$$E_L = \frac{1}{2} \times 0{,}4 \times 0{,}0144 = 2{,}88\times10^{-3}\ \text{J} \approx 2{,}9\ \text{mJ}$$

### À toi

**Variation 1.** Un circuit RL a pour données $E = 9\ \text{V}$, $R_0 = 40\ \Omega$, $r = 5\ \Omega$, $L = 0{,}225\ \text{H}$. Calcule $I_{max}$, $\tau$, puis l'énergie emmagasinée en régime permanent. Vérifie ensuite, par le calcul, que $i(\tau) \approx 0{,}63 \times I_{max}$.

**Variation 2.** On double la résistance totale $R$ d'un circuit RL, sans changer ni $L$ ni $E$. Sans calculer de valeurs numériques, explique, à partir des formules $\tau = L/R$ et $I_{max} = E/R$, comment évoluent la constante de temps et le courant final, puis donne le sens physique de chaque changement : reviens à la lampe de l'accroche — atteint-elle son éclat final plus vite ou plus lentement, avec un éclat plus fort ou plus faible ?
