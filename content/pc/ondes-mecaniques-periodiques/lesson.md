# Ondes mécaniques progressives périodiques

---

## R0 — Accroche : la corde qui n'arrête plus de vibrer

Reprends l'image du chapitre précédent : une corde tendue, un vibreur fixé à une extrémité. Mais cette fois, au lieu de donner un seul aller-retour bref à la source, on laisse le vibreur osciller sans s'arrêter — il monte, redescend, remonte, toujours avec exactement le même mouvement, encore et encore, à intervalles de temps réguliers.

Deux façons de regarder cette corde, maintenant.

**Premier regard : une photo.** Tu prends une photo de toute la corde à un instant donné. Tu vois une suite de bosses et de creux, régulièrement espacés, qui s'étend le long de la corde.

**Second regard : un film, sur un seul point.** Tu fixes ton regard sur un seul point de la corde, disons à un mètre du vibreur, et tu le filmes pendant que le temps passe. Tu vois ce point monter, redescendre, remonter — toujours le même mouvement, qui se répète, encore et encore.

Avant de lire la suite, prends position, en une phrase : ces deux répétitions — l'espacement des bosses sur la photo, et l'intervalle de temps entre deux passages du point par le même mouvement — sont-elles deux choses complètement indépendantes, qu'on pourrait faire varier librement l'une sans l'autre ? Ou sont-elles nécessairement liées, forcées d'aller ensemble, dès que la corde et le vibreur sont fixés ?

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

### Exemple

*Ce qu'on cherche ici, et pourquoi ce geste :* on sépare bien ce qui appartient à la source (la fréquence) de ce qui appartient au milieu (la célérité, et donc la longueur d'onde) — c'est exactement la distinction qui vient d'être posée.

Un diapason vibre à $f = 440\ \text{Hz}$ — c'est la note *la*, imposée par la vibration mécanique de ses branches métalliques. Ce son se propage d'abord dans l'air, où $c_{air} \approx 340\ \text{m/s}$ :

$$\lambda_{air} = \frac{c_{air}}{f} = \frac{340}{440} \approx 0{,}77\ \text{m}$$

Si ce même diapason, vibrant toujours à $440\ \text{Hz}$, était plongé dans l'eau — où $c_{eau} \approx 1500\ \text{m/s}$ — sa fréquence resterait rigoureusement $440\ \text{Hz}$ : rien dans le changement de milieu ne touche à la vibration de la source elle-même. Seule la longueur d'onde changerait, parce que la célérité a changé :

$$\lambda_{eau} = \frac{c_{eau}}{f} = \frac{1500}{440} \approx 3{,}41\ \text{m}$$

Le son garderait exactement la même hauteur perçue (même $f$) dans les deux milieux ; seul son « pas » dans l'espace — sa longueur d'onde — serait différent.

---

## R5 — Pour t'entraîner

### Récapitulatif express

- Une onde progressive périodique : cas particulier d'une onde progressive où la source refait, à l'identique, le même mouvement à intervalles de temps réguliers $T$.
- Double périodicité : temporelle ($T$, en secondes, $f = 1/T$ en hertz) et spatiale ($\lambda$, en mètres) — deux répétitions différentes, lues sur deux graphiques différents (un oscillogramme pour $T$, une photographie du milieu pour $\lambda$).
- Relation fondamentale, dérivée à partir du retard et de la périodicité : $\lambda = cT = c/f$.
- Cas particulier de l'onde sinusoïdale : le déphasage entre deux points distants de $d$ vaut $\Delta\varphi = 2\pi d/\lambda$ ; $d$ multiple entier de $\lambda$ → concordance de phase ; $d$ multiple impair de $\lambda/2$ → opposition de phase.
- Le son : onde mécanique longitudinale, périodique si la source l'est ; sa hauteur dépend de $f$ (fixée par la source, jamais par le milieu) ; le milieu ne fixe que $c$, donc $\lambda$.

### Exercice de type bac (original — entraînement, non un sujet officiel)

Un vibreur fait osciller l'extrémité $S$ d'une corde tendue horizontalement, à la fréquence $f = 50\ \text{Hz}$. La célérité de l'onde le long de cette corde, pour la tension utilisée, vaut $c = 15\ \text{m/s}$.

**1) Quelle est la période $T$ de vibration de la source ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* $T$ est l'inverse direct de $f$, par définition de la fréquence.

$$T = \frac{1}{f} = \frac{1}{50} = 0{,}02\ \text{s} = 20\ \text{ms}$$

**2) En déduire la longueur d'onde $\lambda$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique la relation dérivée en R2, en utilisant $T$ qu'on vient de calculer.

$$\lambda = cT = 15 \times 0{,}02 = 0{,}3\ \text{m}$$

**3) Un point $M$ de la corde est situé à $d = 0{,}9\ \text{m}$ de $S$. Quel est le retard $\tau$ entre $S$ et $M$ ? Combien de périodes ce retard représente-t-il ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule d'abord $\tau$ par sa définition, puis on le compare à $T$ pour savoir combien de cycles complets se sont écoulés — c'est ce rapport qui dira si $M$ est en phase avec $S$.

$$\tau = \frac{d}{c} = \frac{0{,}9}{15} = 0{,}06\ \text{s} = 60\ \text{ms}$$

$$\frac{\tau}{T} = \frac{0{,}06}{0{,}02} = 3$$

Le retard représente exactement $3$ périodes entières.

**4) Que peut-on en déduire sur la relation de phase entre $M$ et $S$ ? Vérifie en calculant le déphasage $\Delta\varphi$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* un nombre entier de périodes de retard signifie que $M$ est revenu exactement dans le même état que $S$ à chaque instant — c'est la concordance de phase ; le calcul du déphasage doit confirmer ce raisonnement.

Puisque $\tau$ correspond à un nombre entier de périodes, $M$ vibre en **concordance de phase** avec $S$. Vérification :

$$\Delta\varphi = \frac{2\pi d}{\lambda} = \frac{2\pi \times 0{,}9}{0{,}3} = 6\pi\ \text{rad}$$

$6\pi$ est un multiple entier de $2\pi$ ($6\pi = 3 \times 2\pi$) : la concordance de phase est confirmée.

**5) Un second point $M'$ est situé à $d' = 1{,}05\ \text{m}$ de $S$. Quelle est sa relation de phase avec $S$ ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* même démarche qu'aux questions 3 et 4, sur une nouvelle distance — c'est l'occasion de voir apparaître l'autre cas particulier.

$$\tau' = \frac{d'}{c} = \frac{1{,}05}{15} = 0{,}07\ \text{s}, \qquad \frac{\tau'}{T} = \frac{0{,}07}{0{,}02} = 3{,}5$$

$3{,}5$ périodes : un nombre entier de périodes ($3$), plus une demi-période. Vérifions par le déphasage :

$$\Delta\varphi' = \frac{2\pi d'}{\lambda} = \frac{2\pi \times 1{,}05}{0{,}3} = 7\pi\ \text{rad}$$

$7\pi = 6\pi + \pi$ : c'est un multiple entier de $2\pi$ plus $\pi$, donc un multiple **impair** de $\pi$. $M'$ vibre en **opposition de phase** avec $S$.

**6) Le vibreur change de fréquence : il oscille maintenant deux fois plus vite ($f' = 100\ \text{Hz}$), sans que la tension de la corde soit modifiée. Que devient la longueur d'onde $\lambda'$ ? Et la célérité ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* la célérité ne dépend que du milieu (sa nature, son état — ici la tension de la corde), jamais de la source (chapitre précédent) ; elle ne peut donc pas changer ici. C'est $\lambda$ qui doit absorber tout le changement de fréquence.

La tension de la corde ne change pas, donc la célérité reste $c = 15\ \text{m/s}$. La nouvelle période est $T' = 1/f' = 1/100 = 0{,}01\ \text{s}$, et :

$$\lambda' = \frac{c}{f'} = \frac{15}{100} = 0{,}15\ \text{m}$$

La longueur d'onde est divisée par deux, exactement comme la fréquence a été multipliée par deux — mais la célérité, elle, n'a pas bougé : elle est restée fixée par la corde, pas par le vibreur.

### À toi

**Variation 1.** Un diapason vibre à $f = 1000\ \text{Hz}$. Calcule sa longueur d'onde dans l'air ($c_{air} \approx 340\ \text{m/s}$), puis dans l'eau ($c_{eau} \approx 1500\ \text{m/s}$). Sa fréquence a-t-elle changé entre les deux milieux ? Justifie ta réponse en te basant sur ce qui fixe la fréquence d'une onde périodique (R1 et R4).

**Variation 2.** Deux points d'une corde, distants de $d = 2\ \text{m}$, vibrent avec un déphasage $\Delta\varphi = 4\pi\ \text{rad}$. Sachant que la célérité de l'onde le long de cette corde vaut $c = 8\ \text{m/s}$, calcule la longueur d'onde $\lambda$, puis la période $T$ de la source.
