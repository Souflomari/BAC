# Ondes mécaniques progressives périodiques

---

## R0 — Accroche : la corde qui n'arrête plus de vibrer

Reprends l'image du chapitre précédent : une corde tendue, un vibreur fixé à une extrémité. Mais cette fois, au lieu de donner un seul aller-retour bref à la source, on laisse le vibreur osciller sans s'arrêter — il monte, redescend, remonte, toujours avec exactement le même mouvement, encore et encore, à intervalles de temps réguliers.

Deux façons de regarder cette corde, maintenant.

**Premier regard : une photo.** Tu prends une photo de toute la corde à un instant donné. Tu vois une suite de bosses et de creux, régulièrement espacés, qui s'étend le long de la corde.

**Second regard : un film, sur un seul point.** Tu fixes ton regard sur un seul point de la corde, disons à un mètre du vibreur, et tu le filmes pendant que le temps passe. Tu vois ce point monter, redescendre, remonter — toujours le même mouvement, qui se répète, encore et encore.

Avant de lire la suite, prends position, en une phrase : ces deux répétitions — l'espacement des bosses sur la photo, et l'intervalle de temps entre deux passages du point par le même mouvement — sont-elles deux choses complètement indépendantes, qu'on pourrait faire varier librement l'une sans l'autre ? Ou sont-elles nécessairement liées, forcées d'aller ensemble, dès que la corde et le vibreur sont fixés ?

[[checkpoint:cp-r0-predict]]

Voici ce que montre l'expérience, si tu resserres le rythme du vibreur (il monte-descend plus vite, sans toucher à la tension de la corde) : les bosses sur la photo se rapprochent aussi. Sans que tu aies touché à l'espacement à la main, il a changé tout seul, exactement au rythme du vibreur. Si les deux répétitions étaient vraiment indépendantes, resserrer le rythme dans le temps n'aurait aucune raison de resserrer l'espacement dans l'espace. Et pourtant, les deux bougent ensemble.

Ce n'est donc pas une coïncidence. Il y a bien deux répétitions dans une onde progressive périodique — l'une dans le temps, l'autre dans l'espace — mais elles ne sont pas indépendantes : elles sont les deux faces d'un même phénomène. Comprendre pourquoi, et comment elles se calculent l'une à partir de l'autre, c'est tout l'objet de cette leçon.

---

## R1 — Le mécanisme : une source périodique, un milieu qui la copie fidèlement

### Le cas particulier où la source se répète

Une **onde progressive périodique** est le cas particulier, étudié au chapitre précédent, d'une onde progressive — une perturbation qui se propage de proche en proche dans un milieu de propagation, sans transport de matière, avec transport d'énergie — où la perturbation créée par la source est elle-même **périodique** : la source refait, à l'identique, le même mouvement, à intervalles de temps égaux.

On note $T$ cet intervalle de temps, la **période** de la source : si $y_S(t)$ est l'élongation de la source à l'instant $t$, dire que la source est périodique de période $T$ signifie, très précisément :

$$y_S(t + T) = y_S(t) \quad \text{pour tout } t$$

Le vibreur qui monte-descend sans s'arrêter, dans l'accroche, est un exemple immédiat : chaque cycle dure exactement $T$, et le cycle suivant reproduit le précédent trait pour trait.

### Chaque point du milieu hérite exactement de la période de la source

On sait déjà, depuis le chapitre précédent, comment un point $M$ du milieu, situé à la distance $d$ de la source $S$, se comporte : il **rejoue**, avec un retard $\tau = d/c$, le mouvement que $S$ a fait un peu plus tôt.

*(On reprend ici la définition de la célérité vue au chapitre précédent — la vitesse à laquelle la perturbation avance dans le milieu. On la note $c$ dans ce chapitre, conformément à l'usage pour les ondes périodiques ; c'est exactement la même grandeur que celle notée $v$ précédemment.)*

$$y_M(t) = y_S(t - \tau), \qquad \tau = \frac{d}{c}$$

La question à se poser maintenant : si la source est périodique de période $T$, qu'en est-il du mouvement de $M$ ? Est-ce que $M$ oscille lui aussi de façon périodique — et si oui, avec quelle période ?

Vérifions-le, en partant de ce qu'on sait déjà.

$$y_M(t + T) = y_S\big((t + T) - \tau\big)$$

On réarrange l'intérieur de la parenthèse, sans rien changer à sa valeur :

$$y_M(t + T) = y_S\big((t - \tau) + T\big)$$

Et ici intervient la périodicité de la source : $y_S(\,\cdot\, + T) = y_S(\,\cdot\,)$, quel que soit l'instant considéré — en particulier à l'instant $t - \tau$ :

$$y_M(t + T) = y_S(t - \tau)$$

Mais $y_S(t - \tau)$, c'est très exactement $y_M(t)$, par la définition même de $y_M$ :

$$y_M(t + T) = y_M(t)$$

**C'est le résultat.** $M$ est, lui aussi, périodique — et de la **même période $T$** que la source. Pas une période approchée, pas une période « proche » : rigoureusement la même. Le retard $\tau$ ne fait que décaler le mouvement de $M$ dans le temps ; décaler une fonction périodique ne change jamais sa période, seulement l'instant où le cycle commence à être observé. Ce mécanisme vaut pour n'importe quel point $M$ du milieu, quelle que soit sa distance à la source : dès qu'un point commence à vibrer, il vibre avec la période $T$ de la source, jusqu'à ce que la source elle-même change de comportement.

### Ce qui s'ensuit : la fréquence, une signature de la source

On appelle **fréquence** $f$ de l'onde le nombre de répétitions du mouvement par seconde :

$$f = \frac{1}{T}$$

$f$ se mesure en hertz ($\text{Hz}$). Puisque tous les points du milieu partagent la même période $T$ que la source, ils partagent tous, aussi, exactement la même fréquence $f$. Et cette fréquence ne vient que d'un seul endroit : le mouvement imposé à la source. **Ni la distance à la source, ni la nature du milieu traversé, ne peuvent la modifier** — le milieu ne fait que relayer, point après point, le rythme déjà fixé par la source. On y reviendra avec le son en R4, car c'est exactement là que cette idée est la plus utile.

[[figure:heritage-periode-retard]]

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on part de la seule donnée qu'on a — la durée d'un cycle du vibreur — et on en tire la fréquence, qui est l'inverse immédiat de cette durée.

Un vibreur fait un aller-retour complet toutes les $25\ \text{ms}$ : c'est sa période, $T = 25\ \text{ms} = 0{,}025\ \text{s}$. Sa fréquence est :

$$f = \frac{1}{T} = \frac{1}{0{,}025} = 40\ \text{Hz}$$

N'importe quel point de la corde, aussi loin soit-il du vibreur, vibrera — une fois que la perturbation l'aura atteint — avec cette même fréquence de $40\ \text{Hz}$, à $60\ \text{cm}$ du vibreur comme à $6\ \text{m}$.

---

## R2 — La double périodicité : dériver la relation $\lambda = cT$

### Le retard entre deux points quelconques, pas seulement entre S et M

Prenons deux points du milieu, $M_1$ et $M_2$, alignés avec la source dans la direction de propagation, $M_2$ étant plus loin que $M_1$ d'une distance $d$. Chacun ne fait que relayer $S$, avec son propre retard :

$$y_{M_1}(t) = y_S\!\left(t - \frac{d_1}{c}\right), \qquad y_{M_2}(t) = y_S\!\left(t - \frac{d_2}{c}\right), \qquad d_2 = d_1 + d$$

On veut savoir comment $y_{M_2}$ s'exprime à partir de $y_{M_1}$, sans repasser par $S$. On remplace $d_2$ :

$$y_{M_2}(t) = y_S\!\left(t - \frac{d_1 + d}{c}\right)$$

On réarrange l'intérieur :

$$y_{M_2}(t) = y_S\!\left(\left(t - \frac{d}{c}\right) - \frac{d_1}{c}\right)$$

Et le membre de droite, c'est exactement $y_{M_1}$ évaluée à l'instant $t - d/c$ :

$$y_{M_2}(t) = y_{M_1}\!\left(t - \frac{d}{c}\right)$$

Ce résultat généralise ce qu'on savait déjà entre $S$ et $M$ : deux points quelconques du milieu, séparés d'une distance $d$ le long de la propagation, sont dans la même relation — le plus éloigné rejoue le mouvement du plus proche, avec un retard $d/c$.

### Que se passe-t-il pendant une période complète ? — dériver $\lambda = cT$

Voici la question centrale : existe-t-il une distance $d$ particulière pour laquelle $M_2$ ne fait pas que rejouer $M_1$ avec du retard, mais reproduit **à chaque instant, exactement**, ce que $M_1$ est en train de faire — comme si les deux vibraient en parfaite unisson ?

D'après ce qu'on vient d'établir, $M_2$ rejoue $M_1$ avec un retard $d/c$. Si ce retard vaut exactement une période, $d/c = T$, c'est-à-dire $d = cT$, alors :

$$y_{M_2}(t) = y_{M_1}(t - T)$$

Et on sait, depuis R1, que $y_{M_1}$ est périodique de période $T$ — donc $y_{M_1}(t - T) = y_{M_1}(t)$ :

$$y_{M_2}(t) = y_{M_1}(t)$$

**Voilà le résultat.** Pour cette distance précise, $d = cT$, les deux points ne sont pas seulement « pareils avec du retard » : ils affichent, à chaque instant $t$, exactement la même élongation. Ils vibrent en parfaite unisson, pour toujours. Autrement dit : pendant une durée égale à une période $T$, l'onde a avancé, dans le milieu, d'exactement cette distance — c'est la définition même de la célérité (une distance parcourue pendant une durée) appliquée à l'intervalle de temps $T$.

Cette distance particulière s'appelle la **longueur d'onde**, notée $\lambda$ : la plus petite distance séparant deux points du milieu qui vibrent exactement de la même façon, à chaque instant. On vient de la dériver, pas seulement de la nommer :

$$\lambda = cT$$

Et puisque $f = 1/T$ :

$$\lambda = \frac{c}{f}$$

[[figure:double-periodicite]]

### Fixe l'image mentale : $T$ n'est pas $\lambda$

C'est ici qu'une confusion s'installe facilement, alors arrête-toi. $T$ et $\lambda$ décrivent deux répétitions différentes, lues sur deux graphiques différents :

| | Répétition **temporelle** | Répétition **spatiale** |
|---|---|---|
| Grandeur | Période $T$ | Longueur d'onde $\lambda$ (parfois appelée « période spatiale ») |
| Unité | secondes ($\text{s}$) | mètres ($\text{m}$) |
| Se lit sur | l'évolution d'**un seul point** du milieu au cours du temps (un oscillogramme, axe horizontal = temps) | une **photographie** de tout le milieu à un instant donné (axe horizontal = position) |
| Relation | $f = 1/T$ | $\lambda = cT = c/f$ |

$T$ et $\lambda$ ne sont pas la même grandeur mesurée dans deux unités différentes — l'une est une durée, l'autre une distance, et elles répondent à deux questions différentes : « combien de temps avant que le mouvement se répète en un point fixe ? » pour $T$, et « quelle distance avant que le motif se répète, à un instant fixe ? » pour $\lambda$. Elles sont liées — c'est tout l'objet de la relation $\lambda = cT$ — mais elles ne sont interchangeables ni dans leur nature, ni dans leur unité.

### Exemple numérique

*Ce qu'on cherche ici, et pourquoi ce geste :* connaissant $T$ (fixée par la source) et $c$ (fixée par le milieu), on calcule $\lambda$ directement par la relation qu'on vient de dériver — puis on vérifie par la formule équivalente $c/f$, pour être sûr qu'on a bien compris pourquoi les deux coïncident.

Un vibreur impose à une corde une période $T = 0{,}5\ \text{s}$. La célérité de l'onde le long de cette corde, pour la tension choisie, vaut $c = 3\ \text{m/s}$.

$$\lambda = cT = 3 \times 0{,}5 = 1{,}5\ \text{m}$$

Vérifions avec l'autre écriture. La fréquence est $f = 1/T = 1/0{,}5 = 2\ \text{Hz}$, donc :

$$\lambda = \frac{c}{f} = \frac{3}{2} = 1{,}5\ \text{m}$$

Les deux calculs coïncident, comme il se doit : ce sont deux écritures de la même relation, dérivée une seule fois.

[[checkpoint:cp-r2-double-periodicite]]

---

## R3 — Le cas particulier de l'onde sinusoïdale et le déphasage

### Quand la source vibre sinusoïdalement

Un cas particulier important est celui où la source ne se contente pas d'être périodique : elle vibre **sinusoïdalement**, comme le ferait un vibreur entraîné par une lame vibrante ou un diapason. Son élongation s'écrit :

$$y_S(t) = Y_m \cos\!\left(\frac{2\pi t}{T} + \varphi\right)$$

où $Y_m$ est l'amplitude (l'élongation maximale) et $\varphi$ la phase à l'origine.

D'après R1, tout point $M$ du milieu vibre avec la même fréquence que $S$, en rejouant son mouvement avec un retard $\tau = d/c$ :

$$y_M(t) = y_S(t - \tau) = Y_m \cos\!\left(\frac{2\pi (t - \tau)}{T} + \varphi\right)$$

On développe l'intérieur du cosinus :

$$y_M(t) = Y_m \cos\!\left(\frac{2\pi t}{T} - \frac{2\pi \tau}{T} + \varphi\right)$$

$M$ vibre donc sinusoïdalement, à la même fréquence que $S$, avec la même amplitude — mais avec, à l'intérieur du cosinus, un terme supplémentaire qui décale l'argument : $-\dfrac{2\pi \tau}{T}$.

### Le déphasage : le retard, mesuré en angle

Ce terme, $\Delta\varphi = \dfrac{2\pi \tau}{T}$, s'appelle le **déphasage** entre $S$ et $M$ : c'est le même retard $\tau$ qu'avant, mais exprimé non plus en secondes, en fraction d'un tour complet ($2\pi$ radians, un cycle entier). Un retard d'une période entière correspond ainsi à un déphasage de $2\pi$ ; un retard d'une demi-période correspond à un déphasage de $\pi$.

On peut réécrire ce déphasage en fonction de la distance $d$, en remplaçant $\tau = d/c$ et $T = \lambda/c$ :

$$\Delta\varphi = \frac{2\pi}{T}\cdot\frac{d}{c} = \frac{2\pi d}{cT}$$

Et puisque $cT = \lambda$ (R2) :

$$\Delta\varphi = \frac{2\pi d}{\lambda}$$

C'est la formule à retenir : le déphasage entre deux points séparés d'une distance $d$ se lit directement en comptant combien de longueurs d'onde $d$ représente ($d/\lambda$), puis en convertissant ce compte en angle par le facteur $2\pi$ — un tour complet par longueur d'onde entière.

### Les deux cas particuliers à repérer

- Si $d$ est un multiple entier de $\lambda$ ($d = k\lambda$, $k$ entier), alors $\Delta\varphi = 2k\pi$ : les deux points vibrent en **concordance de phase** — ils affichent, à chaque instant, exactement la même élongation (c'est le cas qu'on a dérivé en R2 avec $d = \lambda$).
- Si $d$ est un multiple impair d'une demi-longueur d'onde ($d = (2k+1)\lambda/2$), alors $\Delta\varphi = (2k+1)\pi$ : les deux points vibrent en **opposition de phase** — l'un est à son élongation maximale exactement quand l'autre est à son élongation minimale.

[[figure:dephasage]]

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique directement $\Delta\varphi = 2\pi d/\lambda$ à des données numériques, puis on identifie si le résultat correspond à l'un des deux cas particuliers nommés ci-dessus — c'est ce repérage qui donne du sens au nombre obtenu.

Reprenons la corde de l'exemple précédent, $\lambda = 1{,}5\ \text{m}$. Deux points $M_1$ et $M_2$ sont distants de $d = 0{,}9\ \text{m}$.

$$\Delta\varphi = \frac{2\pi d}{\lambda} = \frac{2\pi \times 0{,}9}{1{,}5} = 1{,}2\pi\ \text{rad} \approx 3{,}77\ \text{rad}$$

Ce déphasage ne correspond à aucun des deux cas particuliers (ce n'est ni un multiple entier de $2\pi$, ni un multiple impair de $\pi$) : $M_1$ et $M_2$ vibrent simplement décalés l'un par rapport à l'autre, sans relation remarquable.

Comparons avec deux autres distances, sur cette même corde. À $d = 1{,}5\ \text{m}$ (soit $d = \lambda$) : $\Delta\varphi = 2\pi \times 1{,}5/1{,}5 = 2\pi\ \text{rad}$ — concordance de phase. À $d = 0{,}75\ \text{m}$ (soit $d = \lambda/2$) : $\Delta\varphi = 2\pi \times 0{,}75/1{,}5 = \pi\ \text{rad}$ — opposition de phase.

---

## R4 — Les ondes acoustiques : le son, une onde périodique

### Le son, un exemple concret d'onde mécanique progressive périodique

Le son est une **onde mécanique** : comme toute onde mécanique (chapitre précédent), il a besoin d'un milieu de propagation matériel — il ne se propage pas dans le vide. C'est aussi une onde **longitudinale** : il se propage par des compressions et des dilatations successives de l'air, dans la même direction que celle où le son avance.

Quand la source du son vibre périodiquement — une corde de guitare pincée, un diapason frappé, des cordes vocales qui vibrent pour tenir une note — le son qu'elle produit est une onde progressive périodique, exactement comme la corde des rungs précédents : tout ce qui a été établi en R1, R2 et R3 s'applique, avec la même mécanique de proche en proche.

Dans l'air, dans les conditions ordinaires, la célérité du son vaut environ $340\ \text{m/s}$.

### La hauteur d'un son : une affaire de fréquence, jamais de milieu

La **hauteur** d'un son — le fait qu'on le perçoive comme aigu ou comme grave — est directement liée à sa fréquence $f$ : plus $f$ est élevée, plus le son est perçu aigu ; plus $f$ est basse, plus il est perçu grave.

Et cette fréquence, on l'a établi en R1, est fixée **uniquement par la source qui vibre** — jamais par le milieu de propagation. Le milieu ne fait que relayer le rythme déjà imposé par la source ; il ne peut ni l'accélérer, ni le ralentir. Ce que le milieu fixe, en revanche, c'est la célérité $c$ — et donc, par $\lambda = c/f$, la longueur d'onde : à fréquence fixée par la source, un milieu où le son va plus vite donne une longueur d'onde plus grande, pas une fréquence différente.

[[figure:son-longitudinal-compressions]]

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on sépare bien ce qui appartient à la source (la fréquence) de ce qui appartient au milieu (la célérité, et donc la longueur d'onde) — c'est exactement la distinction qui vient d'être posée.

Un diapason vibre à $f = 440\ \text{Hz}$ — c'est la note *la*, imposée par la vibration mécanique de ses branches métalliques. Ce son se propage d'abord dans l'air, où $c_{air} \approx 340\ \text{m/s}$ :

$$\lambda_{air} = \frac{c_{air}}{f} = \frac{340}{440} \approx 0{,}77\ \text{m}$$

Si ce même diapason, vibrant toujours à $440\ \text{Hz}$, était plongé dans l'eau — où $c_{eau} \approx 1500\ \text{m/s}$ — sa fréquence resterait rigoureusement $440\ \text{Hz}$ : rien dans le changement de milieu ne touche à la vibration de la source elle-même. Seule la longueur d'onde changerait, parce que la célérité a changé :

$$\lambda_{eau} = \frac{c_{eau}}{f} = \frac{1500}{440} \approx 3{,}41\ \text{m}$$

Le son garderait exactement la même hauteur perçue (même $f$) dans les deux milieux ; seul son « pas » dans l'espace — sa longueur d'onde — serait différent.

---

## R5 — La diffraction des ondes mécaniques : quand l'onde contourne l'obstacle

### Le phénomène, avant qu'il ait un nom

Reprends le son ou les ultrasons installés au chapitre précédent : une onde progressive périodique, de fréquence $f$ et de longueur d'onde $\lambda = c/f$ (R2, R4), qui se propage dans l'air. On la fait maintenant arriver sur un obstacle percé d'une ouverture — une fente, de largeur réglable $a$ — placée sur son trajet.

Prends position avant de lire la suite. Imagine une fente très large, qu'on rétrécit ensuite peu à peu, presque jusqu'à la fermer complètement. Derrière la fente, la zone où l'onde se fait sentir devient-elle, à ton avis, de plus en plus fine et concentrée — comme un jet d'eau qu'on force à travers un trou de plus en plus petit — ou au contraire de plus en plus large et étalée ?

L'expérience tranche, et elle va à l'encontre de l'intuition du jet d'eau. Tant que la fente reste large devant $\lambda$, l'onde continue presque tout droit derrière elle : une zone étroite, dans le prolongement direct de la fente, comme en optique géométrique. Mais à mesure qu'on rétrécit la fente, jusqu'à ce que sa largeur $a$ devienne du même ordre que $\lambda$, ou plus petite, l'onde cesse d'aller tout droit : elle s'étale derrière la fente, sur un domaine angulaire de plus en plus large, comme si la fente elle-même s'était transformée en une nouvelle source rayonnant tout autour d'elle. Ce contournement de l'obstacle, cet étalement, porte un nom : c'est la **diffraction**.

[[figure:cuve-a-ondes-diffraction]]

La figure ci-dessus le montre, vue de dessus : une onde plane arrive sur une fente étroite, et derrière la fente, l'onde ne continue pas tout droit — elle s'étale en fronts circulaires, sur un large domaine, comme si la fente était devenue à elle seule une nouvelle source.

### La condition : comparer deux longueurs, jamais une valeur isolée

Ce qui décide si la diffraction est notable ou non n'est jamais une valeur absolue de $a$ : c'est une comparaison entre deux longueurs, la dimension $a$ de l'ouverture (ou de l'obstacle) et la longueur d'onde $\lambda$ de l'onde incidente.

$$a \lesssim \lambda$$

Tant que $a$ reste très grand devant $\lambda$, l'onde passe pratiquement en ligne droite : l'étalement, s'il existe, est négligeable. Dès que $a$ se rapproche de $\lambda$, ou devient plus petit qu'elle, l'étalement devient net — et plus $a$ diminue en deçà de $\lambda$, plus cet étalement s'accentue.

**Fixe l'image mentale : ce n'est pas « il faut une grande ouverture ».** L'intuition la plus répandue dit l'exact inverse de la réalité : on imagine volontiers qu'il faut une grande ouverture pour bien laisser passer l'onde et observer un effet marqué. C'est faux, et c'est précisément l'inverse : une grande ouverture, $a \gg \lambda$, laisse l'onde filer tout droit, sans diffraction notable. C'est au contraire une ouverture petite — du même ordre que $\lambda$, ou plus petite — qui fait diffracter l'onde nettement. Ce qu'il faut retenir, ce n'est pas « grande ouverture » ou « petite ouverture » dans l'absolu : c'est le sens de la comparaison entre $a$ et $\lambda$.

[[figure:diffraction-fente-fronts]]

### Ce que la diffraction change, et ce qu'elle ne change jamais

On pourrait se dire que rétrécir le passage change quelque chose à l'onde elle-même — comme un goulot d'étranglement qui accélérerait un fluide qui le traverse. Teste cette idée sur ce qu'on sait déjà : qu'est-ce qui, dans le mécanisme, pourrait faire changer la fréquence $f$ ? $f$ est fixée par la source, uniquement par elle (R1) — et la fente n'est pas une source, c'est un obstacle passif sur le trajet. Qu'est-ce qui pourrait faire changer la célérité $c$ ? $c$ est fixée par le milieu (R1, R4) — et le milieu, de part et d'autre de la fente, est le même air. Rien, dans ce simple passage par une ouverture, ne touche ni à la source ni à la nature du milieu.

L'onde diffractée garde donc exactement la même fréquence $f$, la même célérité $c$, et — puisque $\lambda = c/f$ (R2) — la même longueur d'onde $\lambda$ que l'onde incidente, ainsi que la même nature. La diffraction ne change qu'une chose : la géométrie de la propagation, la direction dans laquelle l'onde se répand, l'étendue angulaire qu'elle couvre derrière l'ouverture. Elle ne touche jamais $f$, $\lambda$ ni $c$.

### Le montage : mesurer l'étalement, pas seulement l'observer

Pour mettre en évidence la diffraction avec des ultrasons, on place, dans l'ordre, un émetteur d'ultrasons de fréquence connue, une fente de largeur réglable $a$, puis un récepteur qu'on peut déplacer sur un arc de cercle centré sur la fente, pour mesurer l'amplitude reçue en fonction de la direction. En réduisant $a$, on voit le domaine angulaire dans lequel le récepteur détecte encore un signal s'élargir : l'onde reçue s'étale sur un domaine de plus en plus large de directions, exactement comme prédit plus haut.

[[figure:montage-diffraction-ultrasons]]

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule d'abord $\lambda$ à partir de $f$ et $c$ (relation de R2/R4), puis on compare cette longueur d'onde à deux dimensions d'ouverture différentes, pour décider dans quel cas la diffraction est notable — c'est cette comparaison, pas une lecture de valeur isolée, qui tranche.

On envoie des ultrasons de fréquence $f = 40\ \text{kHz}$ dans l'air, où $c \approx 340\ \text{m/s}$.

$$\lambda = \frac{c}{f} = \frac{340}{40\,000} \approx 8{,}5\times10^{-3}\ \text{m} = 8{,}5\ \text{mm}$$

Une fente de largeur $a = 5\ \text{mm}$ est du même ordre de grandeur que $\lambda$, et même légèrement inférieure : la diffraction est notable, l'onde s'étale nettement derrière la fente. Une porte de largeur $a = 0{,}8\ \text{m}$, en revanche, est très grande devant $\lambda$ ($a \gg \lambda$) : l'onde la traverse presque tout droit, sans étalement perceptible.

Dans les deux cas, après la fente ou la porte, l'onde garde $f = 40\ \text{kHz}$, $\lambda \approx 8{,}5\ \text{mm}$ et $c \approx 340\ \text{m/s}$ — inchangés : seule la géométrie de propagation diffère entre les deux situations.

### Ce qui reste hors de cette leçon

La diffraction de la **lumière**, et la relation quantitative qui en donne la demi-largeur angulaire, $\theta = \lambda/a$, ne sont pas traitées ici : elles appartiennent à la leçon sur l'onde lumineuse (`propagation-onde-lumineuse`). Ce qu'on vient d'établir — la condition $a \lesssim \lambda$, les caractéristiques conservées, le montage — vaut pour les ondes mécaniques ; le prolongement quantitatif et le cas de la lumière se trouvent ailleurs.

[[checkpoint:cp-r5-diffraction]]

---

## R6 — Les milieux dispersifs : quand la célérité dépend de la fréquence

### La nuance qu'on n'avait pas encore posée

On avait affirmé, aux rungs R1 et R4 : c'est le milieu qui fixe la célérité $c$, la source qui fixe la fréquence $f$. Prends position avant de lire la suite : dans un même milieu, deux ondes de fréquences différentes voyagent-elles nécessairement à la même vitesse $c$, puisque « c'est le milieu qui fixe $c$ » ? Ou peut-on imaginer un milieu où la vitesse dépend aussi de la fréquence de l'onde qui le traverse ?

Ce qu'on avait dit reste vrai — c'est bien le milieu, jamais la source, qui fixe $c$ — mais il manquait une précision : *pour une fréquence donnée*. Dans certains milieux, la célérité n'est pas la même pour toutes les fréquences. Un tel milieu s'appelle **dispersif**. C'est un raffinement de l'affirmation de R1/R4, pas une contradiction : le milieu fixe toujours $c$ ; seulement, dans un milieu dispersif, il fixe une valeur de $c$ différente pour chaque fréquence.

### La définition, testable

Un milieu est dit **dispersif** si la célérité $c$ de l'onde y **dépend de sa fréquence** $f$ ; il est dit **non dispersif** si toutes les fréquences y ont, au contraire, la **même** célérité.

Le test est opératoire, pas seulement théorique : on envoie, dans le milieu étudié, deux ondes de fréquences différentes $f_1$ et $f_2$, et on compare leurs célérités $c_1$ et $c_2$. Si $c_1 = c_2$, le milieu est non dispersif pour ces fréquences. Si $c_1 \neq c_2$, il est dispersif.

[[figure:celerite-vs-frequence]]

### La conséquence, sur un signal qui contient plusieurs fréquences

Un signal complexe — une mélodie, une parole — n'est jamais réductible à une seule fréquence : c'est une superposition de plusieurs fréquences à la fois. Dans un milieu **non dispersif**, toutes ces fréquences voyagent à la même célérité : elles restent synchronisées tout au long du trajet, et la forme du signal est conservée. Dans un milieu **dispersif**, en revanche, les composantes de fréquences différentes voyagent à des célérités différentes : elles se désynchronisent progressivement en avançant, et le signal **se déforme** au fur et à mesure de sa propagation.

[[figure:paquet-qui-se-deforme]]

**Fixe l'image mentale : dispersif n'est pas synonyme d'atténué.** On pourrait croire qu'un milieu « dispersif » est un milieu qui affaiblit l'onde, qui la disperse en lui faisant perdre de l'énergie, comme on dit d'une lumière qu'elle « se disperse » en s'éparpillant. Ce n'est pas ce que veut dire dispersif ici. La dispersion, telle qu'on vient de la définir, ne concerne que la dépendance de $c$ en $f$ — rien à voir avec une perte d'énergie. Un milieu peut très bien disperser une onde sans l'atténuer, ou l'atténuer sans la disperser : ce sont deux propriétés indépendantes. Ne confonds pas dispersion et amortissement.

L'air, pour le son audible, est quasi non dispersif : c'est pour cela qu'une mélodie, faite d'aigus et de graves superposés, arrive au fond d'une salle sans être déformée — toutes ses fréquences voyagent ensemble, à la même vitesse. Les ondes à la surface de l'eau, elles, sont dispersives : un paquet d'ondes qui s'y propage change de forme en avançant.

### Ce qui ne change jamais

Dans un milieu dispersif comme dans un milieu non dispersif, la fréquence $f$ reste, à chaque instant, celle que la source a imposée (R1) : la dispersion ne modifie jamais $f$. On pourrait être tenté de penser que, puisque « quelque chose varie avec la fréquence » dans un milieu dispersif, c'est la fréquence elle-même qui change en cours de route — ce n'est pas ça. Ce qui dépend de $f$, dans un milieu dispersif, c'est $c$ : chaque fréquence a sa propre célérité, mais chacune garde, du début à la fin de son trajet, la fréquence que la source lui a donnée. Et puisque $\lambda = c/f$ (R2), c'est $\lambda$, pas $f$, qui varie elle aussi d'une fréquence à l'autre dans un milieu dispersif.

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique directement le test opératoire — comparer les célérités mesurées à deux fréquences différentes, dans un même milieu — à deux cas chiffrés, pour distinguer concrètement un milieu dispersif d'un milieu qui ne l'est pas.

Dans un premier milieu (de l'air, pour le son), on mesure : à $f_1 = 200\ \text{Hz}$, $c_1 = 340\ \text{m/s}$ ; à $f_2 = 2000\ \text{Hz}$, $c_2 = 340\ \text{m/s}$.

$c_1 = c_2$ : les deux fréquences voyagent à la même vitesse dans ce milieu — il est **non dispersif**. C'est le cas de l'air pour le son audible.

Dans un second milieu, on mesure : à $f_1$, $c_1 = 1{,}2\ \text{m/s}$ ; à $f_2$, $c_2 = 0{,}9\ \text{m/s}$.

$c_1 \neq c_2$ : la célérité dépend ici de la fréquence — ce milieu est **dispersif**.

Conséquence, pour un signal qui contiendrait à la fois $f_1$ et $f_2$ : dans le premier milieu, ses deux composantes avancent ensemble, à la même vitesse — le signal garde sa forme en se propageant. Dans le second, elles se désynchronisent en avançant — le signal se déforme au fur et à mesure de sa propagation.

[[checkpoint:cp-r6-dispersif]]

---

## R7 — Pour t'entraîner

### Récapitulatif express

- Une onde progressive périodique : cas particulier d'une onde progressive où la source refait, à l'identique, le même mouvement à intervalles de temps réguliers $T$.
- Double périodicité : temporelle ($T$, en secondes, $f = 1/T$ en hertz) et spatiale ($\lambda$, en mètres) — deux répétitions différentes, lues sur deux graphiques différents (un oscillogramme pour $T$, une photographie du milieu pour $\lambda$).
- Relation fondamentale, dérivée à partir du retard et de la périodicité : $\lambda = cT = c/f$.
- Cas particulier de l'onde sinusoïdale : le déphasage entre deux points distants de $d$ vaut $\Delta\varphi = 2\pi d/\lambda$ ; $d$ multiple entier de $\lambda$ → concordance de phase ; $d$ multiple impair de $\lambda/2$ → opposition de phase.
- Le son : onde mécanique longitudinale, périodique si la source l'est ; sa hauteur dépend de $f$ (fixée par la source, jamais par le milieu) ; le milieu ne fixe que $c$, donc $\lambda$.
- Diffraction : notable quand la dimension $a$ de l'ouverture (ou de l'obstacle) est de l'ordre de, ou inférieure à, $\lambda$ ($a \lesssim \lambda$) ; l'onde diffractée conserve $f$, $\lambda$ et $c$ — seule la géométrie de propagation change.
- Milieu dispersif : milieu où la célérité $c$ dépend de la fréquence $f$ de l'onde (non dispersif si $c$ est la même pour toutes les fréquences) ; dans un milieu dispersif, un signal composé de plusieurs fréquences se déforme en se propageant.

### Exercice de type bac

Ce qui suit est le sujet d'examen national **2019 (session normale)** sur la propagation d'une onde mécanique à la surface de l'eau — le format que tu retrouveras le jour J. Pour chaque question : cherche sur papier d'abord, engage une réponse, puis seulement ouvre le raisonnement expert et compare-le au tien.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, support différent : ici l'onde se propage le long d'un ressort — elle est *longitudinale*, et non transversale — les nombres changent, et on te demande en plus la relation de phase entre deux points. Reconnais quelle procédure s'applique quand le support, la nature de l'onde et les nombres changent.

[[exercise:r-variation]]
