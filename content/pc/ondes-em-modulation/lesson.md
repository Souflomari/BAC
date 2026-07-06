# Ondes électromagnétiques — modulation d'amplitude

---

## R0 — Accroche : ta voix, à des kilomètres de distance

Imagine un ingénieur qui veut construire un petit émetteur de radio pour diffuser de la musique dans son quartier. Il branche un micro à une antenne d'un mètre de long, tout simplement. Le micro transforme le son en une tension électrique qui varie exactement comme la pression acoustique de la musique — une tension dont les fréquences vont de quelques dizaines de Hz jusqu'à une vingtaine de kHz, la limite de l'oreille humaine. Il envoie cette tension directement dans l'antenne, en espérant qu'elle se transforme en onde électromagnétique et qu'elle parte se propager dans l'espace.

Avant de lire la suite, prends position : à ton avis, ce montage va-t-il rayonner efficacement la musique jusqu'à un poste de radio du quartier ? Oui ou non — et pourquoi ?

Voici ce que disent, en réalité, les ingénieurs radio : ce montage ne rayonnera presque rien. L'antenne d'un mètre restera, pour l'essentiel, un fil qui chauffe légèrement — elle ne transmettra qu'une fraction infime de l'énergie électrique en onde électromagnétique utilisable à distance. Et pourtant, la radio, ça marche : des stations diffusent bel et bien de la musique, de la parole, à des dizaines de kilomètres, depuis des antennes qui ne mesurent, elles non plus, que quelques dizaines de mètres tout au plus.

Si tu avais prédit que le montage direct fonctionnerait, ta prédiction et la réalité se contredisent — et c'est exactement cet écart que cette leçon va combler. Si tu avais deviné juste, la question devient : **qu'est-ce que les stations de radio font de différent** pour que ça marche, elles ?

C'est tout l'objet de cette leçon : comprendre pourquoi on ne peut pas rayonner un signal basse fréquence tel quel, comment on le fait « voyager » sur une onde haute fréquence — la modulation d'amplitude —, comment on le retrouve à l'arrivée, et comment un récepteur choisit une station précise parmi toutes celles qui arrivent en même temps sur son antenne.

---

## R1 — Le mécanisme : pourquoi il faut une porteuse

### Une onde électromagnétique n'a besoin d'aucun support matériel

Tu as vu, avec les ondes mécaniques, qu'une onde transporte de l'énergie sans transporter de matière : la corde vibre, l'eau clapote, mais rien ne voyage vraiment d'un bout à l'autre, seulement une perturbation. Une onde électromagnétique fait la même chose, mais avec une différence essentielle : elle n'a besoin d'aucun milieu matériel. Elle se propage aussi bien dans l'air que dans le vide, à la même vitesse, notée $c$, la célérité de la lumière dans le vide :

$$c \approx 3{,}00 \times 10^{8}\ \text{m/s}$$

C'est exactement parce qu'elle n'a besoin de rien de matériel qu'une onde électromagnétique peut traverser l'espace entre une antenne d'émission et une antenne de réception, sur des kilomètres, sans qu'il y ait le moindre support entre les deux.

### Le lien entre fréquence et longueur d'onde

Toute onde électromagnétique sinusoïdale, de fréquence $f$, se propage dans le vide avec une longueur d'onde :

$$\lambda = \frac{c}{f}$$

Plus la fréquence est élevée, plus la longueur d'onde est courte — c'est cette relation simple qui va tout expliquer dans ce qui suit.

### Le résultat qu'on admet : une antenne rayonne à l'échelle de sa longueur d'onde

Voici un résultat de la théorie du rayonnement des antennes (une théorie qu'on n'étudie pas ici, mais dont on peut admettre la conclusion) : une antenne ne rayonne efficacement une onde électromagnétique de fréquence $f$ que si sa taille est du même ordre de grandeur qu'une fraction non négligeable de la longueur d'onde $\lambda$ correspondante — typiquement le quart de $\lambda$. En dessous de cette taille, l'essentiel de l'énergie électrique injectée dans l'antenne reste « collée » près d'elle, sans partir réellement vers l'infini : l'antenne chauffe un peu, mais elle ne rayonne quasiment rien.

### Vérifions l'argument sur des nombres

*Ce qu'on cherche ici, et pourquoi ce geste :* on compare la taille d'antenne exigée par un signal audio brut à celle exigée par une onde à quelques centaines de kHz — c'est cette comparaison, et elle seule, qui explique pourquoi la radio ne diffuse jamais le son directement.

Prenons d'abord un signal audio typique, $f = 1\ \text{kHz} = 10^{3}\ \text{Hz}$ — une fréquence bien à l'intérieur de ce qu'un micro délivre. Sa longueur d'onde, si on essayait de le rayonner tel quel :

$$\lambda = \frac{c}{f} = \frac{3{,}00\times10^{8}}{10^{3}} = 3{,}00\times10^{5}\ \text{m} = 300\ \text{km}$$

Le quart de cette longueur d'onde, c'est $75\ \text{km}$ : la taille d'antenne qu'il faudrait pour rayonner efficacement ce signal. Aucune antenne de quartier ne mesure $75\ \text{km}$.

Prenons maintenant une onde à $f_p = 900\ \text{kHz} = 9{,}00\times10^{5}\ \text{Hz}$ — une fréquence typique des stations de radio en modulation d'amplitude :

$$\lambda = \frac{c}{f_p} = \frac{3{,}00\times10^{8}}{9{,}00\times10^{5}} \approx 333\ \text{m}$$

Le quart de cette longueur d'onde vaut environ $83\ \text{m}$ — une taille d'antenne tout à fait réalisable, comparable aux vrais mâts des stations de radio AM. En passant d'un signal à $1\ \text{kHz}$ à une onde à $900\ \text{kHz}$, la taille d'antenne nécessaire est divisée par $900$.

### La conclusion : il faut une porteuse

Voilà pourquoi on ne peut pas rayonner directement la musique ou la voix : leurs fréquences sont bien trop basses pour qu'une antenne raisonnable les rayonne efficacement. La solution consiste à confier l'information à une onde de fréquence bien plus élevée — quelques centaines de kHz à quelques MHz —, une onde qu'on appelle la **porteuse**, et qui, elle, se rayonne très bien avec une antenne de taille humaine. La question devient alors : comment fait-on « porter » un signal basse fréquence par une porteuse haute fréquence, sans perdre l'information ? C'est l'objet du prochain rung.

---

## R2 — Le principe de la modulation d'amplitude

### La porteuse seule ne transporte aucune information

Une porteuse sinusoïdale d'amplitude constante s'écrit :

$$u_p(t) = U_0 \cos(2\pi f_p t)$$

où $U_0$ est son amplitude et $f_p$ sa fréquence — fixe, une fois pour toutes, propre à la station. Regardée seule, cette tension ne raconte rien : elle oscille indéfiniment, toujours de la même façon. Une onde parfaitement répétitive ne transporte aucune information — pour transmettre quelque chose, il faut que quelque chose change dans le temps, au rythme du message.

### L'idée : faire varier l'amplitude au rythme du signal

Le signal qu'on veut transmettre — la musique, la voix — est une tension basse fréquence, notée $s_m(t)$, qui varie au rythme du son. C'est ce signal qui porte l'information ; c'est lui qu'on veut faire voyager.

L'idée de la **modulation d'amplitude (AM)** : au lieu de garder l'amplitude de la porteuse fixe à $U_0$, on la fait varier, à chaque instant, en lui ajoutant le signal informatif :

$$s(t) = \big(U_0 + s_m(t)\big)\cos(2\pi f_p t)$$

Regarde bien cette expression. Le terme $\cos(2\pi f_p t)$ oscille très vite, toujours à la même fréquence $f_p$ — c'est lui qui permet à l'antenne de rayonner efficacement, comme on vient de le voir en R1. Le terme $\big(U_0 + s_m(t)\big)$, lui, varie lentement, au rythme du signal informatif : c'est l'**amplitude instantanée** de l'oscillation rapide. Cette amplitude est une fonction affine de $s_m(t)$ : elle suit fidèlement ses hauts et ses bas, simplement décalée de $U_0$.

Le résultat : une oscillation rapide (à $f_p$) dont l'enveloppe — la courbe qui relie les sommets successifs — dessine exactement la forme de $s_m(t)$, décalée vers le haut de $U_0$. L'information ne voyage pas dans la fréquence de l'oscillation (elle reste $f_p$, immuable) : elle voyage entièrement dans l'amplitude.

[[motion:construction-modulation]]

### Exemple numérique

*Ce qu'on cherche ici, et pourquoi ce geste :* on écrit explicitement $s(t)$ pour une porteuse et un signal donnés, pour voir concrètement à quoi ressemble le résultat de la formule — avant de s'en servir pour vérifier des conditions dans le rung suivant.

Prenons une porteuse d'amplitude $U_0 = 6\ \text{V}$ et de fréquence $f_p = 900\ \text{kHz}$ (les valeurs de R1). Le signal informatif est, pour simplifier, une note pure : $s_m(t) = S_m\cos(2\pi f_{signal} t)$, avec une amplitude $S_m = 3\ \text{V}$ et une fréquence $f_{signal} = 3\ \text{kHz}$ (une fréquence bien audible).

La tension modulée s'écrit alors :

$$s(t) = \big(6 + 3\cos(2\pi \times 3\,000\, t)\big)\cos(2\pi \times 900\,000\, t)$$

L'amplitude instantanée, $6 + 3\cos(2\pi \times 3\,000\,t)$, oscille entre $6-3=3\ \text{V}$ et $6+3=9\ \text{V}$, au rythme de $3\ \text{kHz}$. À l'intérieur de cette enveloppe, la tension oscille $300$ fois plus vite, à $900\ \text{kHz}$. Si tu observais $s(t)$ à l'oscilloscope, tu verrais une multitude d'oscillations rapides et serrées, dont les sommets, si tu les reliais, dessineraient une courbe douce montant et descendant entre $3\ \text{V}$ et $9\ \text{V}$ toutes les $\frac{1}{3\,000} \approx 0{,}33\ \text{ms}$.

[[figure:modulation-amplitude]]

Garde ces valeurs — $U_0=6\ \text{V}$, $f_p=900\ \text{kHz}$, $S_m=3\ \text{V}$, $f_{signal}=3\ \text{kHz}$ — elles reviennent dans les rungs suivants.

---

## R3 — La condition de bonne modulation

Pour que la modulation fonctionne vraiment — pour que l'enveloppe reproduise fidèlement $s_m(t)$, et qu'on puisse la retrouver à la réception — deux conditions doivent être respectées. On les découvre en se demandant, à chaque fois, ce qui casserait le mécanisme si elles n'étaient pas là.

### Condition 1 : $f_p \gg f_{signal}$

Reprends l'exemple de R2 : la porteuse oscille $300$ fois plus vite que le signal. Imagine maintenant que $f_p$ ne soit que deux ou trois fois plus grande que $f_{signal}$ — presque du même ordre de grandeur. L'enveloppe (qui varie à $f_{signal}$) et l'oscillation rapide (qui varie à $f_p$) deviendraient alors difficiles à distinguer : il n'y aurait plus assez d'oscillations rapides par cycle du signal pour dessiner une enveloppe lisse. C'est un peu comme dessiner une courbe douce avec seulement deux ou trois points : la forme devient méconnaissable.

Il faut donc que la porteuse oscille beaucoup plus vite que le signal qu'elle transporte :

$$f_p \gg f_{signal}$$

C'est cette condition qui garantit que chaque cycle du signal informatif contient un grand nombre d'oscillations de la porteuse — assez pour que l'enveloppe se dessine clairement, comme une courbe tracée point par point avec une résolution largement suffisante.

### Condition 2 : le taux de modulation $m < 1$

Reviens à l'amplitude instantanée, $U_0 + s_m(t)$. Cette quantité doit rester **positive à tout instant** pour que l'enveloppe ait un sens physique — une amplitude négative n'existe pas : elle se traduirait par une inversion de phase de l'oscillation rapide, ce qui casse la forme qu'on veut transmettre.

Le signal $s_m(t)$ oscille entre $-S_m$ et $+S_m$, où $S_m$ est son amplitude maximale. Le pire cas, c'est quand $s_m(t) = -S_m$ : l'amplitude instantanée devient $U_0 - S_m$. Pour qu'elle reste positive :

$$U_0 - S_m > 0 \quad\Longleftrightarrow\quad S_m < U_0$$

On formalise ça avec le **taux de modulation** (ou indice de modulation), le rapport entre l'amplitude maximale du signal et l'amplitude de la porteuse :

$$m = \frac{S_m}{U_0}$$

La condition $S_m < U_0$ se réécrit alors simplement :

$$m < 1$$

Quand $m < 1$, l'enveloppe reste toujours positive et reproduit fidèlement $s_m(t)$ : c'est une **bonne modulation**. Quand $m \geq 1$, l'amplitude instantanée $U_0+s_m(t)$ s'annule ou deviendrait négative à certains instants : la tension modulée se déforme, l'oscillation rapide change brutalement de phase là où l'amplitude formelle serait négative, et l'enveloppe ne suit plus fidèlement le signal d'origine. On appelle ça la **surmodulation**, et un récepteur ne peut plus reconstituer correctement le message à partir d'une telle tension.

### Exemple numérique : vérifier la condition, puis casser volontairement la condition

*Ce qu'on cherche ici, et pourquoi ce geste :* on vérifie d'abord les deux conditions sur l'exemple de R2, pour confirmer que c'est bien une « bonne modulation » ; puis on change une seule valeur pour observer, par le calcul, ce que ça change — c'est ce contraste qui rend visible la frontière entre bonne modulation et surmodulation.

Avec $U_0=6\ \text{V}$, $f_p=900\ \text{kHz}$, $S_m=3\ \text{V}$, $f_{signal}=3\ \text{kHz}$ :

$$\frac{f_p}{f_{signal}} = \frac{900\,000}{3\,000} = 300$$

$300 \gg 1$ : la première condition est largement vérifiée.

$$m = \frac{S_m}{U_0} = \frac{3}{6} = 0{,}5$$

$m = 0{,}5 < 1$ : la seconde condition est vérifiée aussi. C'est une bonne modulation — l'enveloppe oscille entre $U_0-S_m=3\ \text{V}$ et $U_0+S_m=9\ \text{V}$, toujours positive.

Imagine maintenant qu'on augmente l'amplitude du signal informatif jusqu'à $S_m = 8\ \text{V}$, sans changer $U_0=6\ \text{V}$ :

$$m = \frac{8}{6} \approx 1{,}33$$

$m > 1$ : c'est une surmodulation. À l'instant où $s_m(t)$ atteint son minimum $-8\ \text{V}$, l'amplitude instantanée formelle vaudrait $6-8=-2\ \text{V}$ — négative, impossible pour une amplitude réelle. Concrètement, l'oscillation rapide change de phase à cet instant au lieu de suivre une amplitude qui continuerait de baisser : l'enveloppe se « replie » sur elle-même, et ne redessine plus fidèlement la forme de $s_m(t)$. Un récepteur qui essaierait de démoduler ce signal reconstituerait un message déformé.

[[figure:bonne-surmodulation]]

---

## R4 — La démodulation : retrouver l'enveloppe

### Ce qu'il faut reconstituer

À la réception, l'antenne délivre la tension modulée $s(t) = (U_0+s_m(t))\cos(2\pi f_p t)$ — mais ce n'est pas ça que l'auditeur veut entendre. Il veut $s_m(t)$, le signal informatif basse fréquence, celui qui reproduit fidèlement le son d'origine une fois envoyé dans un haut-parleur. La **démodulation**, c'est l'opération qui extrait $s_m(t)$ à partir de $s(t)$ — l'opération inverse de la modulation faite à l'émission.

### Le principe : ne garder que l'enveloppe

On l'a vu en R2 : l'information est entièrement portée par l'enveloppe de $s(t)$, la courbe qui relie les sommets de l'oscillation rapide. Démoduler, c'est donc simplement **retracer cette enveloppe**, en effaçant l'oscillation rapide qui ne sert qu'à permettre le rayonnement — et qui, une fois le signal reçu, n'a plus d'utilité.

Le dispositif qui fait ça s'appelle un **détecteur de crête** (ou détecteur d'enveloppe). Son mécanisme, décrit qualitativement :

- Un premier élément (une diode) ne laisse passer le courant que dans un sens : il ne garde donc que la moitié positive de chaque oscillation rapide, celle qui monte vers les sommets.
- Un condensateur, placé juste après, se charge très rapidement à chaque nouveau sommet de l'oscillation rapide — presque instantanément, tellement l'oscillation à $f_p$ est rapide devant les temps de charge en jeu. Entre deux sommets, ce condensateur se décharge lentement à travers le reste du circuit, un peu comme le condensateur du chapitre RC qui se décharge progressivement dans une résistance.
- Le résultat : la tension aux bornes du condensateur monte en flèche à chaque sommet, puis redescend doucement jusqu'au sommet suivant, qu'elle rattrape. Elle suit ainsi, de près, la courbe des sommets successifs — c'est-à-dire l'enveloppe elle-même, donc $U_0 + s_m(t)$.

Il ne reste plus qu'à retirer la composante continue $U_0$ (un simple filtrage qu'on ne détaille pas ici) pour obtenir $s_m(t)$, le signal informatif, prêt à être amplifié et envoyé dans un haut-parleur.

### Pourquoi la condition $m<1$ compte ici aussi

Cette méthode ne fonctionne que si l'enveloppe représente fidèlement $s_m(t)$ : exactement la condition de bonne modulation vue en R3. En cas de surmodulation ($m \geq 1$), l'enveloppe elle-même est déjà déformée à l'émission : aucune démodulation, même parfaite, ne peut alors récupérer le signal d'origine. La qualité de la démodulation à la réception dépend donc entièrement de la qualité de la modulation à l'émission.

### Lecture d'un exemple

Reprends l'exemple de R2-R3 : l'enveloppe oscille entre $3\ \text{V}$ et $9\ \text{V}$, avec une période de $0{,}33\ \text{ms}$. Un détecteur de crête, branché sur ce signal, délivrerait une tension qui suit cette même enveloppe : elle démarre vers $9\ \text{V}$, redescend doucement vers $3\ \text{V}$ en environ une demi-période ($0{,}17\ \text{ms}$), remonte vers $9\ \text{V}$, et ainsi de suite — reconstituant, une fois l'offset $U_0=6\ \text{V}$ retiré, une tension oscillant entre $-3\ \text{V}$ et $+3\ \text{V}$ à $3\ \text{kHz}$ : exactement $s_m(t)$.

---

## R5 — Le circuit accordé : le retour au RLC

### Le problème : l'antenne reçoit tout, en même temps

Une antenne de réception ne capte pas une seule station : elle capte, superposées, toutes les ondes électromagnétiques qui l'atteignent, chacune à sa propre fréquence porteuse $f_p$ — la station qui émet à $900\ \text{kHz}$, celle qui émet à $1\,200\ \text{kHz}$, et bien d'autres encore, toutes en même temps. Comment un récepteur choisit-il celle qu'on veut écouter, sans démoduler (et donc mélanger) toutes les autres en même temps ?

### La solution : un circuit oscillant qu'on peut accorder

Rappelle-toi le circuit RLC série du chapitre précédent : un condensateur et une bobine, connectés ensemble, oscillent librement à une fréquence propre :

$$f_0 = \frac{1}{2\pi\sqrt{LC}}$$

C'est exactement cette même combinaison, bobine + condensateur, qu'on place entre l'antenne et le reste du récepteur : on l'appelle le **circuit bouchon** (ou circuit accordé). Son rôle : privilégier fortement les tensions dont la fréquence est proche de sa propre fréquence propre $f_0$, et laisser passer beaucoup moins efficacement toutes les autres fréquences.

En choisissant $L$ et $C$ de sorte que $f_0$ coïncide exactement avec la fréquence porteuse $f_p$ de la station qu'on veut recevoir, on force le circuit à répondre fortement à cette station précise — et beaucoup plus faiblement à toutes les autres, dont la fréquence est différente de $f_0$. C'est ce réglage, l'**accord**, qui réalise la sélection d'une station parmi toutes celles reçues.

On reste ici volontairement descriptif, au niveau où le programme le demande : ce phénomène de renforcement sélectif porte un nom, la **résonance**, mais on n'en fait pas ici une étude quantitative — pas de calcul de l'amplitude du signal en fonction de la fréquence, pas de déphasage (ça, c'est le régime sinusoïdal forcé, qui n'est pas étudié dans ce programme). Ce qu'il faut retenir, c'est uniquement le rôle fonctionnel : régler $C$ change $f_0$, et c'est la coïncidence $f_0 = f_p$ qui sélectionne la station.

Concrètement, dans un poste de radio, $C$ est un **condensateur variable** : tourner le bouton de sélection des stations, c'est faire varier $C$, donc faire varier $f_0$, jusqu'à ce qu'il coïncide avec la porteuse de la station qu'on veut écouter. Le condensateur ne change évidemment rien à la fréquence émise par la station elle-même : il ne fait que régler la fréquence propre du récepteur pour qu'elle s'accorde avec elle.

### Exemple numérique

*Ce qu'on cherche ici, et pourquoi ce geste :* on connaît déjà $f_0=1/(2\pi\sqrt{LC})$ depuis le chapitre RLC ; ici, on l'utilise à l'envers — on fixe la fréquence qu'on veut atteindre ($f_p$, la station voulue) et on en déduit la valeur de $C$ à régler, pour une bobine $L$ donnée.

On veut accorder un récepteur, équipé d'une bobine $L = 300\ \mu\text{H} = 3{,}00\times10^{-4}\ \text{H}$, sur la station de R1-R2, qui émet à $f_p = 900\ \text{kHz} = 9{,}00\times10^{5}\ \text{Hz}$.

On part de $f_0 = \dfrac{1}{2\pi\sqrt{LC}}$ et on isole $C$ :

$$f_0 = \frac{1}{2\pi\sqrt{LC}}$$

$$2\pi\sqrt{LC} = \frac{1}{f_0}$$

$$\sqrt{LC} = \frac{1}{2\pi f_0}$$

$$LC = \frac{1}{(2\pi f_0)^2}$$

$$C = \frac{1}{(2\pi f_0)^2 L}$$

On règle $C$ pour que $f_0$ coïncide avec $f_p=900\ \text{kHz}$ :

$$2\pi f_p = 2\pi \times 9{,}00\times10^{5} \approx 5{,}655\times10^{6}\ \text{rad/s}$$

$$(2\pi f_p)^2 \approx 3{,}198\times10^{13}\ \text{rad}^2/\text{s}^2$$

$$C = \frac{1}{3{,}198\times10^{13} \times 3{,}00\times10^{-4}} \approx 1{,}04\times10^{-10}\ \text{F} \approx 104\ \text{pF}$$

Une centaine de picofarads : c'est exactement l'ordre de grandeur des condensateurs variables qu'on trouve réellement dans un circuit d'accord de récepteur AM.

---

## R6 — Pour t'entraîner

### Récapitulatif express

- Une antenne ne rayonne efficacement une onde que si sa taille est de l'ordre de sa longueur d'onde ($\lambda=c/f$) : impossible pour un signal audio (des centaines de km), réalisable pour une porteuse à quelques centaines de kHz-MHz (quelques dizaines à centaines de m).
- Modulation d'amplitude : $s(t) = (U_0+s_m(t))\cos(2\pi f_p t)$ — l'amplitude instantanée porte l'information, la fréquence $f_p$ ne change jamais.
- Bonne modulation : $f_p \gg f_{signal}$ (enveloppe lisible) et $m = S_m/U_0 < 1$ (pas de surmodulation, enveloppe toujours positive).
- Démodulation : un détecteur de crête retrace l'enveloppe (charge rapide, décharge lente), et ne fonctionne bien que si la modulation d'origine n'était pas surmodulée.
- Réception : un circuit oscillant (bobine + condensateur variable) accordé sur $f_0 = 1/(2\pi\sqrt{LC})$ sélectionne, parmi toutes les porteuses captées par l'antenne, celle dont $f_p$ coïncide avec $f_0$.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Une station de radio AM émet une porteuse d'amplitude $U_0 = 5\ \text{V}$ et de fréquence $f_p = 1\,200\ \text{kHz}$. À la réception, juste après le circuit accordé et avant démodulation, on enregistre à l'oscilloscope une tension qui oscille très rapidement ; les sommets successifs de ces oscillations, une fois reliés, dessinent une courbe qui monte progressivement d'un minimum de $3\ \text{V}$ jusqu'à un maximum de $7\ \text{V}$, redescend jusqu'à $3\ \text{V}$, puis recommence à l'identique toutes les $0{,}2\ \text{ms}$.

**1) À partir de la description de l'enveloppe, déterminer l'amplitude $S_m$ du signal informatif et la fréquence $f_{signal}$ portée par cette onde.**

*Ce qu'on cherche ici, et pourquoi ce geste :* l'enveloppe oscille entre $U_0-S_m$ et $U_0+S_m$ — on retrouve $S_m$ à partir du minimum et du maximum lus sur la courbe, puis $f_{signal}$ à partir de la période de répétition de l'enveloppe.

L'enveloppe varie entre $3\ \text{V}$ et $7\ \text{V}$. Sa valeur moyenne redonne $U_0$ :

$$U_0 = \frac{3+7}{2} = 5\ \text{V}$$

cohérent avec la valeur donnée. L'écart entre le maximum et cette moyenne donne $S_m$ :

$$S_m = 7 - 5 = 2\ \text{V}$$

La période de répétition de l'enveloppe est $T_{signal} = 0{,}2\ \text{ms} = 2\times10^{-4}\ \text{s}$, donc :

$$f_{signal} = \frac{1}{T_{signal}} = \frac{1}{2\times10^{-4}} = 5\,000\ \text{Hz} = 5\ \text{kHz}$$

**2) Vérifier que les deux conditions de bonne modulation sont respectées.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique directement les deux critères de R3 avec les valeurs qu'on vient de retrouver.

$$\frac{f_p}{f_{signal}} = \frac{1\,200\,000}{5\,000} = 240$$

$240 \gg 1$ : la première condition est largement vérifiée.

$$m = \frac{S_m}{U_0} = \frac{2}{5} = 0{,}4$$

$m = 0{,}4 < 1$ : la seconde condition est vérifiée aussi. C'est une bonne modulation, sans surmodulation.

**3) Le récepteur utilise une bobine $L = 150\ \mu\text{H}$ dans son circuit accordé. Calculer la valeur du condensateur $C$ à régler pour recevoir cette station.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut $f_0=f_p$ ; on reprend la même relation qu'en R5, avec cette nouvelle bobine et cette nouvelle porteuse.

$$C = \frac{1}{(2\pi f_p)^2 L}$$

$$2\pi f_p = 2\pi \times 1{,}20\times10^{6} \approx 7{,}540\times10^{6}\ \text{rad/s}$$

$$(2\pi f_p)^2 \approx 5{,}685\times10^{13}\ \text{rad}^2/\text{s}^2$$

$$C = \frac{1}{5{,}685\times10^{13} \times 1{,}50\times10^{-4}} \approx 1{,}17\times10^{-10}\ \text{F} \approx 117\ \text{pF}$$

### À toi

**Variation 1.** Une porteuse a pour amplitude $U_0 = 4\ \text{V}$. Le signal informatif qu'on veut lui superposer a une amplitude $S_m = 5\ \text{V}$. Calcule le taux de modulation $m$. Y a-t-il surmodulation ? Si oui, décris, en une ou deux phrases, ce qui se passe concrètement sur l'enveloppe à l'instant où $s_m(t)$ atteint son minimum $-5\ \text{V}$, et pourquoi un détecteur de crête ne pourrait plus reconstituer fidèlement le signal d'origine.

**Variation 2.** Explique, avec tes propres mots et sans calcul, pourquoi tourner le bouton de sélection des stations sur un vieux poste de radio (un bouton qui fait varier un condensateur $C$) permet de passer d'une station à l'autre, en partant du fait que l'antenne reçoit, à chaque instant, toutes les porteuses en même temps.
