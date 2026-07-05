# État d'équilibre d'un système chimique

---

## R0 — Accroche : la couleur qui s'arrête

Verse une solution contenant des ions fer(III) $Fe^{3+}$ (presque incolores) dans une solution contenant des ions thiocyanate $SCN^-$ (incolores eux aussi). Rien, dans l'aspect des deux solutions de départ, ne laissait prévoir ce qui suit : le mélange devient instantanément rouge sang. Les deux ions se combinent pour former un complexe, l'ion $FeSCN^{2+}$, responsable de cette teinte intense.

Si tu mesures l'intensité de cette couleur seconde après seconde, elle continue à grimper pendant quelques instants, puis... elle s'arrête. Elle se fige, à une valeur constante, et n'évolue plus : tu peux attendre une heure, elle reste rigoureusement la même.

Avant de lire la suite, prends position : à ton avis, que s'est-il passé, chimiquement, à l'instant où la couleur a cessé de changer ? Le mélange a-t-il épuisé l'un de ses réactifs ? La réaction a-t-elle simplement cessé de se produire ?

Voici l'expérience qui va trancher. Prends ce même mélange, à cet instant où plus rien ne semble bouger, et ajoute-lui, sans changer le volume, une pincée de thiocyanate de potassium solide (une source supplémentaire d'ions $SCN^-$).

Résultat : la couleur rouge s'intensifie de nouveau, immédiatement. Le mélange, qui semblait figé, était donc parfaitement capable de réagir davantage - à condition qu'on le bouscule un peu.

Si tu avais prédit une réaction terminée (plus de réactif disponible, transformation achevée), cette relance immédiate te dit le contraire : les ions $Fe^{3+}$ étaient toujours là, disponibles, prêts à réagir. Si tu avais deviné que quelque chose continuait à se passer malgré l'apparence figée, la vraie question commence maintenant : qu'est-ce qui, exactement, se joue dans ce mélange quand la couleur ne bouge plus - et comment le prévoir, plutôt que de le découvrir après coup en ajoutant un réactif au hasard ?

C'est tout l'objet de cette leçon : comprendre ce que veut vraiment dire un état d'équilibre chimique, construire l'outil qui permet de suivre où en est un système à chaque instant - le quotient de réaction $Q_r$ - et t'en servir pour prédire, par le calcul, dans quel sens un mélange va évoluer.

---

## R1 — Le mécanisme : un équilibre qui n'est pas un arrêt

Reprends le mélange $Fe^{3+}/SCN^-$ de l'accroche, à l'instant précis où sa couleur cesse de changer. Deux explications sont a priori possibles : soit la réaction s'est réellement arrêtée (plus aucune transformation ne se produit), soit quelque chose d'autre se joue. L'ajout de $SCN^-$ supplémentaire vient de trancher : la couleur est repartie, donc la réaction n'était pas terminée. Il faut un modèle qui explique à la fois pourquoi la couleur peut rester rigoureusement stable pendant des heures, ET pourquoi le système reste capable de réagir davantage dès qu'on le perturbe.

### Deux réactions, pas une

La réaction que tu as observée en R0 n'est pas à sens unique. Écris-la avec la double flèche $\rightleftharpoons$ :

$$Fe^{3+} + SCN^- \rightleftharpoons FeSCN^{2+}$$

Dans le sens direct (de la gauche vers la droite), un ion $Fe^{3+}$ et un ion $SCN^-$ se rencontrent et se combinent pour former le complexe $FeSCN^{2+}$. Mais rien n'empêche l'inverse : un complexe $FeSCN^{2+}$ déjà formé peut, à tout moment, se dissocier spontanément et redonner un ion $Fe^{3+}$ et un ion $SCN^-$ libres. Les deux réactions - directe et inverse - se produisent en permanence, simultanément, dans le même mélange.

### Pourquoi une couleur constante ne veut pas dire un système figé

Tu as vu, dans le chapitre sur le suivi temporel d'une transformation, que la vitesse d'une réaction dépend directement des concentrations des espèces qui doivent se rencontrer et réagir : plus il y a d'entités par unité de volume, plus les chocs efficaces sont fréquents, plus la réaction va vite.

Applique ce principe aux deux réactions, directe et inverse, séparément.

- La réaction directe a besoin d'un $Fe^{3+}$ ET d'un $SCN^-$ pour se produire : sa vitesse dépend des concentrations de ces deux réactifs. Au tout début du mélange, ces concentrations sont maximales (rien n'a encore réagi) : la réaction directe démarre vite.
- La réaction inverse a besoin d'un complexe $FeSCN^{2+}$ déjà formé pour se dissocier : sa vitesse dépend de la concentration de ce complexe. Au tout début, il n'y en a pas encore : la réaction inverse est nulle au départ.

Au fil du temps, deux évolutions opposées se produisent en même temps : les concentrations de $Fe^{3+}$ et $SCN^-$ diminuent (ils sont consommés par la réaction directe), donc la réaction directe ralentit ; la concentration de $FeSCN^{2+}$ augmente (il est produit), donc la réaction inverse accélère. La réaction directe ralentit, la réaction inverse accélère - jusqu'à ce que les deux vitesses deviennent rigoureusement égales.

C'est exactement l'instant où la couleur cesse de changer. Mais regarde bien ce que ça veut dire : les deux réactions ne s'arrêtent pas - elles continuent, chacune à sa propre vitesse, mais ces deux vitesses sont maintenant égales. Chaque seconde, autant de complexe $FeSCN^{2+}$ se forme (réaction directe) qu'il s'en dissocie (réaction inverse). Le bilan net est nul : les concentrations, mesurées globalement, ne bougent plus. Mais microscopiquement, ça n'a jamais cessé de réagir dans les deux sens. C'est ce qu'on appelle un **état d'équilibre dynamique**.

[[figure:equilibre-concentrations]]

### Teste l'idée avant de la croire : « l'équilibre, c'est la réaction qui s'arrête »

C'est la confusion la plus naturelle, et elle mérite d'être affrontée directement : en voyant une couleur - ou un pH, une conductivité, n'importe quelle grandeur observable - cesser de changer, on conclut spontanément que « la réaction est terminée », exactement comme pour une transformation totale qui atteint $x_{max}$.

Reviens à l'expérience de l'accroche. Si la réaction avait vraiment cessé de se produire (dans les deux sens - ni directe, ni inverse), alors les ions $Fe^{3+}$ restants seraient chimiquement inertes : ajouter du $SCN^-$ ne devrait rien changer, puisque plus rien ne réagit. Or la couleur s'intensifie de nouveau, immédiatement, dès l'ajout. Ce résultat contredit directement l'idée d'un arrêt : les ions $Fe^{3+}$ étaient toujours là, toujours capables de réagir avec un $SCN^-$ - la réaction directe a simplement repris, un peu plus vite que la réaction inverse pendant un moment, avant qu'un nouvel équilibre ne s'installe.

Ce qui s'arrête à l'équilibre, ce n'est pas la réaction. C'est l'évolution nette et observable des concentrations - parce que deux réactions opposées, désormais de même vitesse, se compensent exactement.

---

## R2 — Chiffrer l'avancement : transformation totale ou limitée, le taux d'avancement final $\tau$

Le fait qu'un équilibre soit dynamique explique pourquoi la couleur se fige. Mais ça ne dit pas encore à quel point la réaction a avancé avant de se figer. Deux mélanges peuvent tous les deux atteindre un équilibre - l'un après avoir consommé presque tout le réactif limitant, l'autre après en avoir consommé à peine une fraction. Il faut un nombre pour distinguer ces deux situations.

### Avancement maximal et avancement final

Reprends le tableau d'avancement, comme tu l'as construit dans les chapitres précédents. On note $x_{max}$ l'avancement qu'atteindrait la réaction si elle allait jusqu'au bout - c'est-à-dire si l'un des réactifs était totalement consommé. Et on note $x_f$ l'avancement réellement atteint, une fois que les concentrations cessent de changer - c'est-à-dire une fois l'équilibre installé.

Puisque la réaction directe et la réaction inverse peuvent coexister indéfiniment (R1), rien ne garantit que $x_f$ atteigne $x_{max}$. En général, $x_f \leq x_{max}$.

### Le taux d'avancement final $\tau$

On définit le **taux d'avancement final** de la réaction :

$$\tau = \frac{x_f}{x_{max}}$$

$\tau$ est donc compris entre $0$ (rien n'a réagi) et $1$ (la réaction est allée jusqu'au bout). Deux cas se distinguent :

- $\tau = 1$ (ou très proche de $1$) : la transformation est **totale**. Le réactif limitant a quasiment disparu à l'équilibre ; observer un équilibre ou observer une transformation totale revient, dans les faits, au même.
- $\tau < 1$ (nettement inférieur à $1$) : la transformation est **limitée** (ou non totale). Réactifs et produits coexistent en quantités notables une fois l'équilibre atteint - c'est le cas de notre mélange $Fe^{3+}/SCN^-$.

### Exemple travaillé

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut chiffrer, pour de vrai, jusqu'où va la réaction $Fe^{3+} + SCN^- \rightleftharpoons FeSCN^{2+}$. On part des concentrations initiales, on mesure ce qu'il reste à l'équilibre (par spectrophotométrie, puisque le complexe est coloré - la méthode que tu as déjà rencontrée), et on en tire $\tau$.

On mélange une solution d'ions $Fe^{3+}$ et une solution d'ions $SCN^-$ de sorte que leurs concentrations initiales, juste après le mélange, valent toutes deux $c_0 = 2{,}0 \times 10^{-3}\ \text{mol/L}$ (le volume est supposé constant tout au long de la transformation).

| | $Fe^{3+}$ | $SCN^-$ | $FeSCN^{2+}$ |
|---|---|---|---|
| État initial (mol/L) | $c_0$ | $c_0$ | $0$ |
| À l'instant $t$ (mol/L) | $c_0 - y$ | $c_0 - y$ | $y$ |

(on note $y$ la concentration de complexe formé à un instant donné, jouant ici le rôle de l'avancement volumique)

Puisque les deux réactifs sont introduits en quantités égales et se consomment un pour un, ils s'épuiseraient exactement ensemble si la réaction allait jusqu'au bout : l'avancement maximal correspond à $y = c_0$.

Une mesure spectrophotométrique, une fois que la teinte ne varie plus, donne $[FeSCN^{2+}]_{eq} = 1{,}2 \times 10^{-3}\ \text{mol/L}$. Le taux d'avancement final vaut alors :

$$\tau = \frac{[FeSCN^{2+}]_{eq}}{c_0} = \frac{1{,}2 \times 10^{-3}}{2{,}0 \times 10^{-3}} = 0{,}60$$

$\tau = 0{,}60$ : seulement $60\,\%$ de ce qui aurait pu réagir a effectivement réagi. Il reste, à l'équilibre, une quantité notable des deux réactifs de départ :

$$[Fe^{3+}]_{eq} = [SCN^-]_{eq} = c_0 - [FeSCN^{2+}]_{eq} = 2{,}0 \times 10^{-3} - 1{,}2 \times 10^{-3} = 0{,}8 \times 10^{-3}\ \text{mol/L}$$

La transformation est nettement **limitée** : réactifs et produit coexistent à l'équilibre, dans des proportions comparables. Garde ces trois concentrations - elles reviennent dans les rungs suivants.

---

## R3 — Le quotient de réaction $Q_r$ et son évolution au cours du temps

$\tau$ donne un seul nombre : celui de l'état final. Mais on aimerait aussi pouvoir décrire où en est le système à n'importe quel instant - pas seulement à la fin - et comparer deux systèmes différents entre eux, même s'ils ne portent pas sur la même réaction. Il faut un outil plus général qu'une simple concentration.

### Construire le quotient de réaction

Pour une réaction, en solution aqueuse, de la forme :

$$aA + bB \rightleftharpoons cC + dD$$

on définit le **quotient de réaction** $Q_r$, à un instant quelconque de la transformation, comme le rapport entre les concentrations des produits (chacune élevée à la puissance de son coefficient stoechiométrique) et celles des réactifs (de même) :

$$Q_r = \frac{[C]^c[D]^d}{[A]^a[B]^b}$$

*Pourquoi cette construction précisément :* un rapport produits sur réactifs mesure directement où en est la réaction - un $Q_r$ petit signifie qu'il y a encore beaucoup de réactifs et peu de produits (la réaction a peu avancé) ; un $Q_r$ grand signifie l'inverse (la réaction a beaucoup avancé). Les exposants ne sont pas décoratifs : ils reprennent exactement les coefficients de l'équation, parce que c'est cette équation-là, et aucune autre pondération, qui relie la consommation des réactifs à la formation des produits.

Une précision importante : si l'un des participants à la réaction est le solvant (l'eau, en large excès) ou un solide pur, sa concentration ne varie pratiquement pas au cours de la réaction - elle n'apparaît donc pas dans $Q_r$. On ne garde que les espèces dissoutes dont la concentration varie réellement avec l'avancement. Comme $K_e$ pour l'eau, $Q_r$ est une grandeur sans unité, par convention (chaque concentration, en mol/L, est rapportée à une concentration de référence égale à $1\ \text{mol/L}$).

### L'expression de $Q_r$ pour notre réaction

Pour $Fe^{3+} + SCN^- \rightleftharpoons FeSCN^{2+}$ (tous les coefficients valent $1$) :

$$Q_r = \frac{[FeSCN^{2+}]}{[Fe^{3+}][SCN^-]}$$

(Si la réaction s'écrivait, par exemple, $A + 2B \rightleftharpoons C$, on aurait $Q_r = \frac{[C]}{[A][B]^2}$ - retiens bien que chaque coefficient devient un exposant.)

### Pourquoi $Q_r$ augmente sans cesse, tant que la réaction avance dans le sens direct

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut comprendre, avant de calculer quoi que ce soit, pourquoi $Q_r$ ne peut qu'augmenter au cours de notre transformation - et pas se comporter n'importe comment.

Reprends le mécanisme du rung précédent : tant que la réaction directe l'emporte sur la réaction inverse, $[FeSCN^{2+}]$ (le numérateur de $Q_r$) augmente, tandis que $[Fe^{3+}]$ et $[SCN^-]$ (le dénominateur) diminuent tous les deux. Un numérateur qui grandit divisé par un dénominateur qui rétrécit : $Q_r$ ne peut qu'augmenter. C'est la même mécanique de fond que la diminution de la vitesse $v(t)$ vue dans le chapitre sur le suivi temporel - ici appliquée non pas à une vitesse, mais au rapport produits/réactifs lui-même.

### Exemple travaillé : $Q_r$ minute après minute

Reprends le mélange du rung 2 ($c_0 = 2{,}0 \times 10^{-3}\ \text{mol/L}$ pour chacun des deux réactifs). Un suivi spectrophotométrique donne, à quelques instants choisis :

| $t$ (min) | $0$ | $2$ | $5$ | $10$ | équilibre |
|---|---|---|---|---|---|
| $[FeSCN^{2+}]$ ($\times 10^{-3}\ \text{mol/L}$) | $0{,}0$ | $0{,}6$ | $0{,}9$ | $1{,}1$ | $1{,}2$ |

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule $Q_r$ à chaque instant, en réutilisant à chaque fois $[Fe^{3+}] = [SCN^-] = c_0 - [FeSCN^{2+}]$.

$$t = 0\ \text{min} : \quad Q_r = \frac{0}{(2{,}0\times10^{-3})^2} = 0$$

$$t = 2\ \text{min} : \quad [Fe^{3+}]=[SCN^-]=1{,}4\times10^{-3}, \quad Q_r = \frac{0{,}6\times10^{-3}}{(1{,}4\times10^{-3})^2} \approx 3{,}1\times10^2$$

$$t = 5\ \text{min} : \quad [Fe^{3+}]=[SCN^-]=1{,}1\times10^{-3}, \quad Q_r = \frac{0{,}9\times10^{-3}}{(1{,}1\times10^{-3})^2} \approx 7{,}4\times10^2$$

$$t = 10\ \text{min} : \quad [Fe^{3+}]=[SCN^-]=0{,}9\times10^{-3}, \quad Q_r = \frac{1{,}1\times10^{-3}}{(0{,}9\times10^{-3})^2} \approx 1{,}4\times10^3$$

$$t = \text{équilibre} : \quad [Fe^{3+}]=[SCN^-]=0{,}8\times10^{-3}, \quad Q_r = \frac{1{,}2\times10^{-3}}{(0{,}8\times10^{-3})^2} = 1875 \approx 1{,}9\times10^3$$

$Q_r$ grimpe sans relâche : $0 \to 3{,}1\times10^2 \to 7{,}4\times10^2 \to 1{,}4\times10^3 \to 1{,}9\times10^3$, et il cesse de grimper exactement à l'instant où la couleur cesse de changer. Ce n'est pas une coïncidence - c'est l'objet du rung suivant.

---

## R4 — $Q_r$ à l'équilibre : la constante $K$, indépendante de l'état initial

### $Q_r$ se fige, lui aussi

Regarde la dernière ligne du tableau du rung 3 : une fois l'équilibre atteint, $Q_r$ cesse d'augmenter et se fige à une valeur précise - ici, $1875$. C'est logique : à l'équilibre, la réaction directe et la réaction inverse se compensent exactement (R1), donc les concentrations ne bougent plus, donc $Q_r$, qui n'est construit qu'à partir de ces concentrations, ne bouge plus non plus.

On appelle cette valeur figée la **constante d'équilibre** associée à l'équation de la réaction, notée $K$. Elle est définie comme le quotient de réaction à l'équilibre :

$$Q_{r,eq} = K$$

Pour notre réaction :

$$K = \frac{[FeSCN^{2+}]_{eq}}{[Fe^{3+}]_{eq}[SCN^-]_{eq}}$$

$K$ (comme $Q_r$) est une grandeur sans unité, par convention.

[[figure:quotient-vers-K]]

### Ce que $K$ raconte - et ce qu'il ne dépend PAS

Fait central, et c'est lui qui fait de $K$ un outil puissant : $K$ ne dépend que de l'équation de la réaction et de la température. Il ne dépend ni des concentrations initiales choisies, ni du volume utilisé, ni de la quantité de matière introduite. Deux expériences, menées avec des quantités initiales complètement différentes, sur la même réaction et à la même température, doivent trouver exactement la même valeur de $K$ - même si elles n'atteignent pas le même $\tau$.

### Teste l'idée avant de la croire : « K dépend de ce qu'on a mis au départ »

C'est une confusion facile à commettre, parce que $\tau$, lui, dépend bel et bien de l'état initial (tu le verras clairement au rung 6). On pourrait croire que $K$, calculé à partir des mêmes concentrations, en dépend aussi. Vérifie-le sur deux expériences distinctes, menées sur la même réaction $Fe^{3+}+SCN^- \rightleftharpoons FeSCN^{2+}$, à la même température.

**Expérience 1** (celle du rung 2) : concentrations initiales égales, $c_0 = 2{,}0\times10^{-3}\ \text{mol/L}$ pour chaque réactif. À l'équilibre : $[FeSCN^{2+}]_{eq}=1{,}2\times10^{-3}$, $[Fe^{3+}]_{eq}=[SCN^-]_{eq}=0{,}8\times10^{-3}\ \text{mol/L}$.

$$K_1 = \frac{1{,}2\times10^{-3}}{(0{,}8\times10^{-3})^2} = \frac{1{,}2\times10^{-3}}{6{,}4\times10^{-7}} = 1875$$

**Expérience 2** : cette fois, on part de concentrations initiales différentes et déséquilibrées entre elles - $c_1' = 2{,}75\times10^{-3}\ \text{mol/L}$ pour $Fe^{3+}$, $c_2' = 0{,}95\times10^{-3}\ \text{mol/L}$ pour $SCN^-$ (le réactif limitant, cette fois, est $SCN^-$). Une nouvelle mesure à l'équilibre donne $[FeSCN^{2+}]_{eq}' = 0{,}75\times10^{-3}\ \text{mol/L}$, d'où, par un bilan de matière :

$$[SCN^-]_{eq}' = c_2' - 0{,}75\times10^{-3} = 0{,}95\times10^{-3}-0{,}75\times10^{-3} = 0{,}20\times10^{-3}\ \text{mol/L}$$

$$[Fe^{3+}]_{eq}' = c_1' - 0{,}75\times10^{-3} = 2{,}75\times10^{-3}-0{,}75\times10^{-3} = 2{,}0\times10^{-3}\ \text{mol/L}$$

$$K_2 = \frac{0{,}75\times10^{-3}}{2{,}0\times10^{-3}\times0{,}20\times10^{-3}} = \frac{0{,}75\times10^{-3}}{4{,}0\times10^{-7}} = 1875$$

$K_1 = K_2 = 1875$, très exactement, alors que les concentrations initiales n'ont rien à voir entre les deux expériences. Vérifie d'ailleurs que le taux d'avancement final, lui, diffère bel et bien : $\tau_2 = [FeSCN^{2+}]_{eq}'/c_2' = 0{,}75/0{,}95 \approx 0{,}79$, contre $\tau_1 = 0{,}60$ - deux valeurs différentes de $\tau$, pour une seule et même valeur de $K$. C'est exactement ce qu'annonce le principe : $K$ décrit la réaction elle-même, pas la manière dont on l'a préparée.

---

## R5 — Le critère qualitatif d'évolution : comparer $Q_{r,i}$ à $K$

$K$ n'est pas seulement une curiosité de fin de réaction : il donne un outil prédictif. Avant même qu'un mélange n'évolue, on peut savoir, par le calcul, dans quel sens il va bouger.

### Le critère

Prends n'importe quel mélange contenant les espèces d'une réaction dont tu connais $K$ (à la température de travail), pas nécessairement à l'équilibre. Calcule le quotient de réaction à l'instant considéré, noté $Q_{r,i}$, à partir des concentrations telles qu'elles sont à cet instant. Compare $Q_{r,i}$ à $K$ :

- Si $Q_{r,i} < K$ : le système évolue dans le **sens direct** (celui de l'équation écrite de la gauche vers la droite) - $Q_r$ va augmenter, jusqu'à rejoindre $K$.
- Si $Q_{r,i} > K$ : le système évolue dans le **sens inverse** - $Q_r$ va diminuer, jusqu'à rejoindre $K$.
- Si $Q_{r,i} = K$ : le système est déjà à l'équilibre, il n'évolue plus (macroscopiquement).

*Pourquoi ce critère fonctionne :* reprends le mécanisme du rung 1. Si $Q_{r,i}$ est plus petit que $K$, c'est qu'il y a, à cet instant, proportionnellement plus de réactifs et moins de produits que ce que l'équilibre exige - la réaction directe (qui consomme les réactifs abondants et forme le produit encore rare) l'emporte alors sur la réaction inverse, et $Q_r$ grimpe. C'est très exactement ce que tu as observé au rung 3, où l'on partait sans aucun produit ($Q_{r,i}=0 < K$) et où $Q_r$ n'a fait que croître vers $K$.

### Exemple travaillé : refermer la question de l'accroche

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut enfin comprendre, avec les nombres en main, pourquoi la couleur s'est intensifiée de nouveau dans l'expérience de l'accroche, quand on a ajouté du $SCN^-$ au mélange à l'équilibre.

Reprends l'équilibre de l'expérience 1 (rungs 2 et 4) : $[Fe^{3+}]_{eq}=[SCN^-]_{eq}=0{,}8\times10^{-3}\ \text{mol/L}$, $[FeSCN^{2+}]_{eq}=1{,}2\times10^{-3}\ \text{mol/L}$, $K = 1875$. On ajoute, sans changer le volume, assez de thiocyanate de potassium solide pour élever instantanément $[SCN^-]$ jusqu'à $2{,}8\times10^{-3}\ \text{mol/L}$ - les deux autres concentrations restant, à l'instant de l'ajout, inchangées.

$$Q_{r,i} = \frac{1{,}2\times10^{-3}}{0{,}8\times10^{-3}\times2{,}8\times10^{-3}} \approx 5{,}4\times10^2$$

$Q_{r,i} \approx 5{,}4\times10^2$, très inférieur à $K = 1875$ : le critère prédit une évolution dans le sens direct - davantage de complexe $FeSCN^{2+}$ va se former, jusqu'à ce que $Q_r$ rejoigne $K$. C'est exactement l'intensification de couleur observée en R0 : pas une coïncidence, mais la conséquence directe de la comparaison entre $Q_{r,i}$ et $K$.

---

## R6 — Diluer, changer l'état initial : l'effet sur $\tau$ (à $K$ constante)

$K$ ne bouge jamais, à température fixée - tu viens de le vérifier au rung 4. Mais $\tau$, lui, peut changer si l'on change l'état initial du système. La dilution en est l'exemple le plus direct : que se passe-t-il si l'on ajoute de l'eau à un mélange, sans rien changer d'autre ?

### Ce qui se passe, immédiatement, en diluant

*Ce qu'on cherche ici, et pourquoi ce geste :* diluer un mélange, c'est diviser toutes les concentrations par un même facteur $f>1$ (le facteur de dilution), de façon instantanée - avant même que la réaction n'ait eu le temps de réagir à ce changement. On veut savoir ce que ça fait à $Q_r$, à cet instant précis, comparé à $K$.

Pour une réaction générale $aA+bB \rightleftharpoons cC+dD$, diviser chaque concentration par $f$ donne :

$$\frac{([C]/f)^c([D]/f)^d}{([A]/f)^a([B]/f)^b} = f^{(a+b)-(c+d)} \times Q_r$$

c'est-à-dire que diluer multiplie $Q_r$ par $f^{(a+b)-(c+d)}$. Tout dépend donc du signe de l'exposant $(a+b)-(c+d)$ - c'est-à-dire de savoir si la réaction, telle qu'elle est écrite, diminue ou augmente le nombre total d'espèces dissoutes.

- Si $(a+b) > (c+d)$ (le sens direct réduit le nombre d'espèces dissoutes) : diluer **augmente** $Q_r$ - le système, s'il était à l'équilibre, se retrouve avec $Q_{r,i} > K$, donc il évolue dans le sens inverse. $\tau$ **diminue**.
- Si $(a+b) < (c+d)$ (le sens direct augmente le nombre d'espèces dissoutes) : diluer **diminue** $Q_r$ - le système se retrouve avec $Q_{r,i} < K$, il évolue dans le sens direct. $\tau$ **augmente**.
- Si $(a+b) = (c+d)$ : diluer ne change rien au rapport $Q_r/K$ (l'exposant vaut $0$) - aucune évolution, $\tau$ reste inchangé.

### Exemple travaillé : diluer le mélange $Fe^{3+}/SCN^-$

Notre réaction, $Fe^{3+}+SCN^- \rightleftharpoons FeSCN^{2+}$, a $(a+b)=2$ réactifs contre $(c+d)=1$ produit : diluer devrait donc augmenter $Q_r$ par rapport à $K$, et faire diminuer $\tau$. Vérifie-le sur l'équilibre de l'expérience 1.

Reprends l'équilibre 1 : $[Fe^{3+}]_{eq}=[SCN^-]_{eq}=0{,}8\times10^{-3}\ \text{mol/L}$, $[FeSCN^{2+}]_{eq}=1{,}2\times10^{-3}\ \text{mol/L}$, $K=1875$. On dilue ce mélange par un facteur $f=10$ (on ajoute de l'eau distillée jusqu'à multiplier le volume par dix). Immédiatement après cette dilution, avant toute nouvelle réaction :

$$[Fe^{3+}] = [SCN^-] = \frac{0{,}8\times10^{-3}}{10} = 8{,}0\times10^{-5}\ \text{mol/L}, \qquad [FeSCN^{2+}] = \frac{1{,}2\times10^{-3}}{10} = 1{,}2\times10^{-4}\ \text{mol/L}$$

$$Q_{r,i} = \frac{1{,}2\times10^{-4}}{(8{,}0\times10^{-5})^2} = \frac{1{,}2\times10^{-4}}{6{,}4\times10^{-9}} = 18750$$

On retrouve bien $Q_{r,i} = f \times K = 10 \times 1875 = 18750$. Puisque $Q_{r,i} \gg K$, le critère du rung 5 impose une évolution dans le sens inverse : une partie du complexe $FeSCN^{2+}$ va se dissocier, jusqu'à ce que $Q_r$ redescende à $K$.

Des mesures sur ce système, une fois le nouvel équilibre atteint, donnent $[FeSCN^{2+}]_{eq} \approx 4{,}5\times10^{-5}\ \text{mol/L}$ (on peut vérifier que ceci redonne bien $Q_r \approx 1875 = K$). Le nouveau taux d'avancement final, par rapport à la concentration initiale diluée $c_0'' = 2{,}0\times10^{-4}\ \text{mol/L}$, vaut :

$$\tau'' = \frac{4{,}5\times10^{-5}}{2{,}0\times10^{-4}} \approx 0{,}23$$

$\tau'' \approx 0{,}23$, nettement plus petit que $\tau_1 = 0{,}60$ avant dilution : diluer ce mélange a bien fait diminuer $\tau$, exactement comme le prévoyait le raisonnement sur $Q_r$ - alors même que $K$, lui, est resté rigoureusement identique tout au long.

---

## R7 — Pour t'entraîner

### Récapitulatif express

- Un état d'équilibre chimique est **dynamique** : la réaction directe et la réaction inverse se produisent toutes deux en permanence, à la même vitesse l'une que l'autre - ce n'est jamais un arrêt.
- Le taux d'avancement final $\tau = x_f/x_{max}$ mesure jusqu'où va réellement une transformation : $\tau=1$ (ou proche) = transformation totale ; $\tau<1$ = transformation limitée.
- Le quotient de réaction $Q_r = \frac{[C]^c[D]^d}{[A]^a[B]^b}$ (pour $aA+bB\rightleftharpoons cC+dD$ en solution aqueuse) suit l'avancement à tout instant ; il croît tant que le sens direct l'emporte.
- À l'équilibre, $Q_r$ se fige : $Q_{r,eq}=K$, la constante d'équilibre. $K$ ne dépend que de la réaction et de la température - jamais des concentrations initiales ni du volume.
- Critère d'évolution : on compare $Q_{r,i}$ (calculé à un instant donné, pas nécessairement à l'équilibre) à $K$. $Q_{r,i}<K$ : évolution dans le sens direct. $Q_{r,i}>K$ : évolution dans le sens inverse.
- Diluer change $\tau$ (via l'effet de la dilution sur $Q_r$ comparé à $K$), mais ne change jamais $K$.

### Exercice de type bac (original - entraînement, non un sujet officiel)

On prépare, à une température fixée, un mélange dans lequel les concentrations initiales, juste après mélange, valent toutes deux $c_0 = 1{,}5\times10^{-3}\ \text{mol/L}$ pour les ions $Fe^{3+}$ et pour les ions $SCN^-$ (volume supposé constant). Un suivi spectrophotométrique montre que la teinte rouge cesse d'évoluer après quelques minutes ; à cet instant, $[FeSCN^{2+}]_{eq} \approx 8{,}3\times10^{-4}\ \text{mol/L}$, et elle ne varie plus ensuite.

**1) Écris l'équation de la réaction, avec la notation d'équilibre qui convient, et donne l'expression du quotient de réaction $Q_r$ associé.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie les espèces en présence et leurs coefficients, exactement comme au rung 1, puis on construit $Q_r$ en suivant la règle du rung 3 (produits sur réactifs, coefficients en exposants).

$$Fe^{3+} + SCN^- \rightleftharpoons FeSCN^{2+} \qquad\qquad Q_r = \frac{[FeSCN^{2+}]}{[Fe^{3+}][SCN^-]}$$

**2) Détermine le taux d'avancement final $\tau$ de cette transformation. Conclus sur son caractère total ou limité.**

*Ce qu'on cherche ici, et pourquoi ce geste :* concentrations initiales égales et stoechiométrie un pour un (rung 2) : l'avancement maximal, en concentration, vaut $c_0$.

$$\tau = \frac{[FeSCN^{2+}]_{eq}}{c_0} = \frac{8{,}3\times10^{-4}}{1{,}5\times10^{-3}} \approx 0{,}55$$

$\tau \approx 0{,}55 < 1$ : la transformation est **limitée**.

**3) Détermine $[Fe^{3+}]_{eq}$ et $[SCN^-]_{eq}$, puis calcule $K$ pour cette réaction à cette température. Compare cette valeur à celle trouvée dans la leçon.**

*Ce qu'on cherche ici, et pourquoi ce geste :* bilan de matière (rung 2), puis on forme le quotient à l'équilibre (rung 4).

$$[Fe^{3+}]_{eq} = [SCN^-]_{eq} = c_0 - [FeSCN^{2+}]_{eq} = 1{,}5\times10^{-3} - 8{,}3\times10^{-4} = 6{,}7\times10^{-4}\ \text{mol/L}$$

$$K = \frac{8{,}3\times10^{-4}}{(6{,}7\times10^{-4})^2} \approx 1{,}8\times10^3$$

Aux incertitudes de mesure près, on retrouve un ordre de grandeur identique à celui trouvé au rung 4 ($K = 1875$) pour cette même réaction à cette même température - alors que les concentrations initiales utilisées ici ($1{,}5\times10^{-3}\ \text{mol/L}$) sont différentes de celles du rung 4. C'est une confirmation supplémentaire que $K$ ne dépend que de la réaction et de la température, jamais des concentrations de départ.

**4) On ajoute, sans changer le volume, du thiocyanate de potassium solide, ce qui élève instantanément $[SCN^-]$ à $2{,}0\times10^{-3}\ \text{mol/L}$ (les concentrations des deux autres espèces restant, à cet instant, inchangées). Calcule le nouveau quotient de réaction $Q_{r,i}$ juste après cet ajout, compare-le à $K$, et prédis dans quel sens le système va évoluer.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le critère du rung 5 - comparer $Q_{r,i}$, calculé avec les concentrations de l'instant, à la valeur de $K$ trouvée en question 3.

$$Q_{r,i} = \frac{8{,}3\times10^{-4}}{6{,}7\times10^{-4}\times2{,}0\times10^{-3}} \approx 6{,}2\times10^2$$

$Q_{r,i} \approx 6{,}2\times10^2$, inférieur à $K \approx 1{,}8\times10^3$ : le système va évoluer dans le sens direct - davantage de complexe $FeSCN^{2+}$ va se former, jusqu'à ce que $Q_r$ rejoigne $K$.

**5) Si, au lieu d'ajouter du thiocyanate, on avait dilué le mélange à l'équilibre (celui de la question 3) par un facteur $2$, prédis, sans calcul complet, si le taux d'avancement final de ce nouveau système serait plus grand, plus petit, ou égal à celui trouvé en question 2. Justifie uniquement à partir du sens de variation de $Q_r$ lors d'une dilution pour cette réaction.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le raisonnement général du rung 6, sans refaire tout le calcul numérique.

Pour cette réaction, $(a+b)=2$ (les deux réactifs) contre $(c+d)=1$ (un seul produit) : diluer multiplie $Q_r$ par $f^{(a+b)-(c+d)} = f^1 = f > 1$. Le nouveau $Q_{r,i}$ (juste après dilution) serait donc supérieur à $K$, ce qui impose une évolution dans le sens inverse - une partie du complexe se dissocierait. Le taux d'avancement final serait donc **plus petit** que celui de la question 2.

### À toi

**Variation 1.** On étudie, à une température fixée, la réaction de formation du complexe diammine-argent(I) : $Ag^+ + 2\,NH_3 \rightleftharpoons Ag(NH_3)_2^+$. On mélange une solution d'ions $Ag^+$ et une solution d'ammoniac $NH_3$, avec des concentrations initiales $c_1 = 1{,}0 \times 10^{-3}\ \text{mol/L}$ (pour $Ag^+$) et $c_2 = 4{,}0 \times 10^{-3}\ \text{mol/L}$ (pour $NH_3$, volontairement en excès). À l'équilibre, on mesure $[Ag(NH_3)_2^+]_{eq} = 0{,}9 \times 10^{-3}\ \text{mol/L}$. Écris l'expression de $Q_r$ pour cette réaction, calcule le taux d'avancement final $\tau$ (par rapport au réactif limitant), puis détermine $K$. Enfin, prédis, en justifiant uniquement à partir des ordres du réactif et du produit (sans calcul), si diluer ce mélange ferait augmenter ou diminuer $\tau$.

**Variation 2.** Un élève affirme : « Si je double les concentrations initiales des deux réactifs d'une réaction, alors sa constante d'équilibre $K$ double aussi, car il y a deux fois plus de matière au départ. » Explique pourquoi ce raisonnement est faux, en t'appuyant sur ce que tu as vu au rung 4 de cette leçon, puis indique ce qui, lui, change réellement quand on double les concentrations initiales (à $K$ fixée).
