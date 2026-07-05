# Noyaux — masse et énergie

---

## R0 — Accroche : le Soleil ne peut pas brûler

Le Soleil brille, à peu de choses près avec la même puissance, depuis environ 4,6 milliards d'années — c'est l'âge du système solaire, établi par la datation des plus vieilles roches et météorites (une méthode que tu connais déjà si tu as étudié la décroissance radioactive : c'est exactement le même principe qui donne cet âge).

Avant de lire la suite, engage-toi vraiment sur un chiffre, même approximatif. Imagine que le Soleil ne soit rien d'autre qu'une gigantesque boule de combustible chimique — le meilleur charbon, le meilleur pétrole qu'on puisse imaginer, brûlant dans tout l'oxygène nécessaire. Combien de temps, à ton avis, une masse pareille pourrait-elle continuer à libérer une puissance pareille avant de s'éteindre ? Quelques millions d'années ? Autant que son âge réel, 4,6 milliards d'années ?

Fais le calcul d'ordre de grandeur toi-même si tu veux : il ne faut que la masse du Soleil, sa puissance rayonnée, et l'énergie libérée par kilogramme dans une combustion ordinaire (quelques dizaines de mégajoules par kilogramme, l'ordre de grandeur du charbon ou de l'essence). Le résultat tient en une poignée de milliers d'années. Quelques milliers d'années — pas des millions, encore moins des milliards.

Le Soleil a pourtant 4,6 milliards d'années, et brille toujours. L'écart entre les deux nombres n'est pas un facteur 2, ni un facteur 10 : c'est un facteur de l'ordre du million. Aucune réaction chimique, aussi énergétique soit-elle, ne peut combler un tel écart. Il se passe au cœur du Soleil quelque chose qui n'a tout simplement rien à voir, en ordre de grandeur, avec le fait de « brûler » au sens chimique.

Ce quelque chose, c'est une réaction entre noyaux atomiques — une fusion — et la source de son énergie est encore plus déroutante que sa puissance : cette énergie vient d'une masse qui disparaît. Littéralement : la matière produite pèse un peu moins lourd que la matière de départ, et cette masse manquante s'est transformée en énergie. C'est cette idée — que la masse elle-même est une forme d'énergie, et qu'on peut la convertir en calculant précisément combien elle « vaut » — qu'on va construire dans cette leçon, jusqu'à pouvoir chiffrer exactement l'énergie libérée par une réaction de fusion ou de fission.

---

## R1 — L'équivalence masse-énergie : E = mc²

### Un postulat, pas un résultat qu'on peut redériver ici

Toute la physique que tu as construite jusqu'ici — mécanique, électricité — repose sur une hypothèse implicite qu'on ne remet jamais en question : la masse et l'énergie sont deux grandeurs séparées, chacune conservée de son côté. Un système peut échanger de l'énergie sans perdre le moindre gramme de matière.

Einstein, en 1905, a montré que cette séparation n'est qu'une approximation — excellente aux vitesses et aux énergies de la vie courante, mais fausse en toute rigueur. Sa relativité restreinte établit un résultat qu'on admet ici sans le redémontrer (la démonstration demande des outils hors-programme) : la masse elle-même est une forme d'énergie. Un système de masse $m$, même immobile, même « au repos », possède de ce seul fait une énergie :

$$E = mc^2$$

où $c \approx 3{,}00\times10^8\ \text{m/s}$ est la vitesse de la lumière dans le vide. Réciproquement — et c'est ce sens-là qu'on va utiliser tout au long de cette leçon — toute variation d'énergie $\Delta E$ d'un système s'accompagne d'une variation de masse $\Delta m = \dfrac{\Delta E}{c^2}$. Masse et énergie ne sont plus deux choses séparément conservées : ce sont deux façons de mesurer la même chose, reliées par un facteur de conversion fixe, $c^2$.

Ça ne veut pas dire qu'une réaction chimique fait « perdre de la masse » de façon détectable : $c^2$ est un nombre énorme (environ $9\times10^{16}\ \text{m}^2/\text{s}^2$), donc convertir une énergie, même conséquente à notre échelle, en variation de masse donne un $\Delta m$ ridiculement petit — indétectable par la meilleure balance. C'est seulement à l'échelle nucléaire, où les énergies mises en jeu par réaction sont des millions de fois plus grandes qu'en chimie (on le chiffre précisément au R4), que cette variation de masse devient mesurable et significative.

### Les unités adaptées à l'échelle du noyau

Exprimer la masse d'un noyau en kilogrammes donne des nombres illisibles, de l'ordre de $10^{-27}\ \text{kg}$. On utilise donc une unité adaptée, l'**unité de masse atomique**, notée $\text{u}$ : par définition, $1\ \text{u} = 1{,}6605\times10^{-27}\ \text{kg}$ — à peu de choses près la masse d'un nucléon isolé.

De même, exprimer une énergie nucléaire en joules donne des nombres minuscules, de l'ordre de $10^{-13}\ \text{J}$ par réaction. On utilise l'**électronvolt** (eV) et ses multiples, en particulier le **méga-électronvolt** (MeV, avec $1\ \text{MeV} = 10^6\ \text{eV} = 1{,}602\times10^{-13}\ \text{J}$).

*Ce qu'on cherche ici, et pourquoi ce geste : ces deux unités sont chacune adaptées à l'échelle nucléaire, mais $E=mc^2$ les relie l'une à l'autre — on peut donc convertir $1\ \text{u}$ directement en son équivalent énergétique en MeV. C'est ce facteur de conversion, une fois établi, qu'on va utiliser pour tout le reste de la leçon, sans jamais repasser par les kilogrammes et les joules.*

On applique $E = mc^2$ à une masse $m = 1\ \text{u} = 1{,}6605\times10^{-27}\ \text{kg}$, avec $c = 2{,}9979\times10^8\ \text{m/s}$ :

$$E = 1{,}6605\times10^{-27} \times (2{,}9979\times10^8)^2$$

$$E = 1{,}6605\times10^{-27} \times 8{,}9874\times10^{16}$$

$$E \approx 1{,}4924\times10^{-10}\ \text{J}$$

On convertit ce résultat en électronvolts, en divisant par $1{,}6022\times10^{-19}\ \text{J}$ (l'énergie que vaut $1\ \text{eV}$) :

$$\frac{1{,}4924\times10^{-10}}{1{,}6022\times10^{-19}} \approx 9{,}315\times10^{8}\ \text{eV}$$

$$\boxed{1\ \text{u} \approx 931{,}5\ \text{MeV}/c^2}$$

Retiens surtout la conclusion pratique, pas le détail des conversions : dès qu'une masse est exprimée en $\text{u}$, on obtient son énergie équivalente en MeV en la multipliant simplement par $931{,}5$. C'est le facteur qu'on utilise pour tout calcul de cette leçon, sans plus jamais repasser par le kilogramme et le joule.

---

## R2 — Le défaut de masse et l'énergie de liaison

### Une expérience de pensée : pèse les pièces séparées, puis assemblées

Reprends l'idée de l'accroche, mais précisément cette fois : imagine que tu puisses peser séparément, un par un, les nucléons qui composent un noyau — disons, pour fixer les idées, les 2 protons et les 2 neutrons d'un noyau d'hélium $^{4}_{2}\text{He}$ — puis que tu pèses ensuite le noyau d'hélium lui-même, une fois ces 4 nucléons assemblés.

Avant de lire la suite, prends position : le noyau assemblé pèse-t-il exactement la somme des masses des 4 nucléons séparés ? Plus lourd ? Ou moins lourd ?

La réponse, mesurée en laboratoire avec une précision extrême, est sans appel : le noyau assemblé pèse **moins** que la somme de ses nucléons séparés. Ce n'est pas une erreur de mesure ni un arrondi — c'est systématique, pour absolument tous les noyaux stables qui existent. Cette différence de masse porte un nom.

### Le défaut de masse Δm

On appelle **défaut de masse** d'un noyau $^{A}_{Z}\text{X}$, noté $\Delta m$, la différence entre la masse des $Z$ protons et $N$ neutrons pris séparément, et la masse du noyau une fois assemblé :

$$\Delta m = Z\,m_p + N\,m_n - m_{\text{noyau}}$$

où $m_p$ et $m_n$ sont les masses du proton et du neutron isolés. $\Delta m$ est toujours **positif** pour un noyau lié : le noyau assemblé est toujours plus léger que ses nucléons séparés — exactement le fait constaté ci-dessus.

### D'où vient cette masse manquante — le mécanisme

Voici pourquoi cette masse manque, et pourquoi ce n'est pas magique. Assembler des nucléons libres en un noyau, sous l'effet de l'interaction forte (rencontrée au chapitre sur la radioactivité), c'est passer d'un état où les nucléons sont séparés, immobiles, sans interaction, à un état lié où l'interaction forte les maintient ensemble. Ce passage **libère de l'énergie** — exactement comme laisser tomber un objet libère de l'énergie potentielle en la convertissant en énergie cinétique. Par l'équivalence masse-énergie du R1, cette énergie libérée doit provenir de quelque part : elle provient d'une diminution de la masse du système. Le défaut de masse $\Delta m$ n'est rien d'autre que la trace, en kilogrammes (ou en $\text{u}$), de cette énergie qui s'est échappée au moment de la formation du noyau.

Autrement dit : pour séparer de nouveau un noyau en ses nucléons individuels, il faudrait lui **fournir** exactement cette énergie en retour — le noyau ne la « rendra » jamais spontanément. C'est cette énergie qu'on appelle l'énergie de liaison.

### L'énergie de liaison $E_l$

$$E_l = \Delta m \, c^2$$

$E_l$ est l'énergie qu'il faudrait fournir à un noyau, immobile et isolé, pour le dissocier complètement en ses $Z$ protons et $N$ neutrons séparés et immobiles — ou, de façon équivalente, l'énergie libérée quand ces mêmes nucléons séparés s'assemblent pour former ce noyau. Plus $E_l$ est grande, plus il est difficile d'arracher les nucléons les uns aux autres : plus le noyau est **fortement lié**.

*Attention à ne pas te représenter $E_l$ comme une énergie stockée « à l'intérieur » du noyau, disponible à volonté, comme une pile qu'on pourrait décharger : c'est l'inverse. $E_l$ est l'énergie qu'il faut dépenser pour casser le noyau, pas une énergie qu'il contient et pourrait relâcher spontanément. Un noyau stable ne relâche rien tout seul, sans qu'on lui fournisse rien — c'est précisément pour ça qu'il est stable.*

### Exemple — l'énergie de liaison de l'hélium 4

On a rencontré le noyau $^{4}_{2}\text{He}$ au chapitre précédent comme la particule $\alpha$, en notant qu'il est « exceptionnellement bien lié ». Vérifions-le par le calcul.

*Ce qu'on cherche ici, et pourquoi ce geste : on connaît les masses séparées ($m_p$, $m_n$) et la masse du noyau assemblé — c'est exactement la donnée dont dépend $\Delta m$, donc $E_l$. On calcule $\Delta m$ d'abord, jamais $E_l$ directement : une erreur d'arrondi sur $\Delta m$ se répercute beaucoup moins si on la contrôle avant de multiplier par $931{,}5$.*

Données : $m_p = 1{,}00728\ \text{u}$, $m_n = 1{,}00867\ \text{u}$, $m(^{4}_{2}\text{He}) = 4{,}00151\ \text{u}$ (masse du noyau).

$$\Delta m = 2\,m_p + 2\,m_n - m(^{4}_{2}\text{He})$$

$$\Delta m = 2\times1{,}00728 + 2\times1{,}00867 - 4{,}00151$$

$$\Delta m = 4{,}03190 - 4{,}00151 = 0{,}03039\ \text{u}$$

On convertit en énergie avec le facteur établi au R1 :

$$E_l = 0{,}03039 \times 931{,}5 \approx 28{,}31\ \text{MeV}$$

28 MeV pour dissocier un noyau de seulement 4 nucléons : c'est énorme, comparé à ce qu'on rencontre en chimie (on quantifie précisément cet écart au R4). Voilà, chiffré, ce que veut dire « l'hélium est exceptionnellement bien lié ».

[[figure:defaut-masse]]

---

## R3 — L'énergie de liaison par nucléon et la courbe d'Aston

### Pourquoi diviser par A : une comparaison honnête

$E_l$ seule ne permet pas de comparer la solidité de deux noyaux de tailles différentes : un gros noyau, avec beaucoup de nucléons, a presque automatiquement une $E_l$ totale plus grande qu'un petit — simplement parce qu'il y a plus de liaisons à casser, pas forcément parce que chaque liaison est plus forte. Comparer les $E_l$ brutes reviendrait à comparer la résistance de deux cordes de longueurs différentes en ne regardant que la force totale qu'il faut pour les rompre, sans tenir compte de leur épaisseur.

Ce qui permet une comparaison honnête, c'est l'énergie de liaison **par nucléon** :

$$\frac{E_l}{A}$$

C'est la grandeur qui mesure, indépendamment de la taille du noyau, à quel point *chaque nucléon en moyenne* est fortement accroché à ses voisins. Plus $E_l/A$ est grand, plus le noyau est stable.

### La courbe d'Aston

Si on calcule $E_l/A$ pour tous les noyaux stables connus et qu'on la porte en fonction de $A$, on obtient une courbe caractéristique appelée **courbe d'Aston** (souvent tracée avec $-E_l/A$ en ordonnée par convention — auquel cas c'est le point le plus bas de la courbe qui correspond au noyau le plus stable ; on raisonne ici directement sur $E_l/A$, sans ce changement de signe, pour rester simple).

Voici son allure, en mots, puisqu'aucune figure ne remplace le fait de comprendre pourquoi elle a cette forme. Partant des noyaux les plus légers, $E_l/A$ **grimpe rapidement** avec $A$ : un petit noyau léger a peu de voisins immédiats par nucléon, donc l'interaction forte — à courte portée, comme vu au chapitre précédent — le lie mal. Elle continue de monter, plus lentement, jusqu'à atteindre un **maximum** pour les noyaux de masse intermédiaire, autour de $A \approx 56$ à $62$ — la région du fer et du nickel. Puis, au-delà de ce maximum, $E_l/A$ **redescend lentement** à mesure que $A$ augmente encore : dans les noyaux très lourds, la répulsion électrique entre un nombre croissant de protons — qui s'additionne sur *toutes* les paires, comme vu au chapitre précédent — finit par affaiblir la cohésion moyenne, malgré l'attraction forte.

Quelques valeurs pour donner le sens de cette allure (masse croissante de gauche à droite) :

| Noyau | $A$ | $E_l/A$ (MeV/nucléon) |
|---|---|---|
| $^{4}_{2}\text{He}$ | 4 | 7,08 |
| $^{7}_{3}\text{Li}$ | 7 | 5,61 |
| $^{12}_{6}\text{C}$ | 12 | 7,68 |
| $^{16}_{8}\text{O}$ | 16 | 7,98 |
| $^{56}_{26}\text{Fe}$ | 56 | 8,79 |
| $^{235}_{92}\text{U}$ | 235 | 7,59 |

Remarque que l'hélium ($7{,}08$) est nettement mieux lié par nucléon que son voisin plus lourd le lithium ($5{,}61$) : la courbe n'est pas parfaitement lisse partout, l'hélium est une exception locale exceptionnellement stable — c'est justement pour ça qu'il est émis tel quel dans la désintégration $\alpha$, vue au chapitre précédent. Mais la tendance générale, une montée jusqu'au fer puis une lente redescente, est bien celle décrite ci-dessus.

### Pourquoi la fusion des légers et la fission des lourds libèrent de l'énergie

Voici la conséquence directe de cette forme de courbe, et c'est elle qui explique tout le reste de cette leçon. Un noyau est d'autant plus stable, donc d'autant moins riche en énergie disponible, que son $E_l/A$ est grand. Une réaction qui rapproche des noyaux du maximum de la courbe les fait donc passer à un état de moindre énergie — et cette énergie perdue est libérée.

- **Fusion.** Deux noyaux **légers**, situés sur la partie **montante** de la courbe (à gauche du maximum), fusionnent pour former un noyau plus lourd, plus proche du maximum : le noyau formé a un $E_l/A$ plus grand que celui des noyaux de départ. Ce gain d'énergie de liaison par nucléon se traduit par une énergie libérée — c'est exactement ce qui alimente le Soleil, comme annoncé à l'accroche.

- **Fission.** Un noyau **lourd**, situé sur la partie **descendante** de la courbe (à droite du maximum), se casse en deux noyaux de masse intermédiaire, plus proches du maximum : les noyaux fils ont, ensemble, un $E_l/A$ moyen plus grand que le noyau de départ. Là encore, ce gain se traduit par une énergie libérée — c'est le principe d'un réacteur nucléaire.

Dans les deux cas — fusion à gauche, fission à droite — la réaction se dirige vers le sommet de la courbe, vers le fer et le nickel, les noyaux les plus stables qui existent. On chiffre précisément cette énergie libérée au rung suivant.

[[figure:courbe-aston]]

---

## R4 — Bilan énergétique d'une réaction nucléaire : fission et fusion

### La méthode générale

Pour une réaction nucléaire (fission ou fusion), on procède exactement comme pour un seul noyau au R2, mais en comparant la masse totale des réactifs à la masse totale des produits :

$$\Delta m = m_{\text{produits}} - m_{\text{réactifs}}$$

Si $\Delta m < 0$ — les produits pèsent moins lourd que les réactifs, c'est le cas pour la fission et la fusion étudiées ici — de l'énergie est **libérée**, et sa valeur absolue vaut :

$$|E| = |\Delta m|\,c^2$$

Si, à l'inverse, $\Delta m > 0$, la réaction ne peut pas se produire spontanément : il faudrait au contraire lui **fournir** cette énergie pour qu'elle ait lieu.

### Exemple — la fission de l'uranium 235

Un neutron lent percute un noyau d'uranium 235, qui se casse en deux fragments plus légers et éjecte des neutrons supplémentaires :

$$^{1}_{0}\text{n} + \ ^{235}_{92}\text{U} \longrightarrow \ ^{141}_{56}\text{Ba} + \ ^{92}_{36}\text{Kr} + 3\,^{1}_{0}\text{n}$$

Vérifie toi-même, avec les lois de Soddy du chapitre précédent, que cette équation est correcte : $1+235 = 141+92+3$ pour $A$, et $0+92 = 56+36+0$ pour $Z$.

*Ce qu'on cherche ici, et pourquoi ce geste : on calcule la masse totale de chaque côté, réactifs puis produits, jamais noyau par noyau isolément — c'est la différence globale qui compte, pas le défaut de masse individuel de chaque fragment.*

Données (masses des noyaux) : $m(\text{n}) = 1{,}00867\ \text{u}$, $m(^{235}_{92}\text{U}) = 234{,}99342\ \text{u}$, $m(^{141}_{56}\text{Ba}) = 140{,}88367\ \text{u}$, $m(^{92}_{36}\text{Kr}) = 91{,}90639\ \text{u}$.

$$m_{\text{réactifs}} = m(\text{n}) + m(^{235}_{92}\text{U}) = 1{,}00867 + 234{,}99342 = 236{,}00209\ \text{u}$$

$$m_{\text{produits}} = m(^{141}_{56}\text{Ba}) + m(^{92}_{36}\text{Kr}) + 3\,m(\text{n}) = 140{,}88367 + 91{,}90639 + 3\times1{,}00867 = 235{,}81607\ \text{u}$$

$$\Delta m = 235{,}81607 - 236{,}00209 = -0{,}18602\ \text{u}$$

$$E = 0{,}18602 \times 931{,}5 \approx 173{,}3\ \text{MeV}$$

Cette fission unique libère environ 173 MeV — déjà 6 fois l'énergie de liaison entière de l'hélium 4 (R2), obtenue en une seule cassure d'un seul noyau. Multiplié par le nombre gigantesque de noyaux d'uranium présents dans un réacteur (de l'ordre de $10^{23}$ à $10^{25}$), cette énergie par réaction devient la puissance électrique d'une centrale entière.

### Exemple — la fusion deutérium-tritium

C'est la réaction de fusion la plus étudiée pour les futurs réacteurs à fusion (comme le projet ITER) :

$$^{2}_{1}\text{H} + \ ^{3}_{1}\text{H} \longrightarrow \ ^{4}_{2}\text{He} + \ ^{1}_{0}\text{n}$$

Données (masses des noyaux) : $m(^{2}_{1}\text{H}) = 2{,}01355\ \text{u}$, $m(^{3}_{1}\text{H}) = 3{,}01550\ \text{u}$, $m(^{4}_{2}\text{He}) = 4{,}00151\ \text{u}$ (déjà rencontrée au R2), $m(\text{n}) = 1{,}00867\ \text{u}$.

$$m_{\text{réactifs}} = 2{,}01355 + 3{,}01550 = 5{,}02905\ \text{u}$$

$$m_{\text{produits}} = 4{,}00151 + 1{,}00867 = 5{,}01018\ \text{u}$$

$$\Delta m = 5{,}01018 - 5{,}02905 = -0{,}01887\ \text{u}$$

$$E = 0{,}01887 \times 931{,}5 \approx 17{,}6\ \text{MeV}$$

Une seule réaction de fusion, entre seulement 2 noyaux légers, libère 17,6 MeV — presque autant d'un coup que les 173 MeV de la fission de l'uranium, mais à partir d'une masse de départ des centaines de fois plus petite. C'est ce rapport énergie-libérée sur masse-consommée exceptionnellement élevé qui rend la fusion si attirante comme source d'énergie.

### Ordres de grandeur : pourquoi le nucléaire domine à ce point le chimique

Compare maintenant ces chiffres à une réaction chimique ordinaire. Une réaction de combustion typique libère, par molécule qui réagit, une énergie de l'ordre de quelques électronvolts seulement — un ordre de grandeur qu'on obtient en divisant une énergie molaire de combustion usuelle (quelques centaines de kilojoules par mole) par le nombre d'Avogadro : de l'ordre de $4\ \text{eV}$ par molécule, par exemple.

Compare : $4\ \text{eV}$ pour une réaction chimique, contre $17{,}6\times10^6\ \text{eV}$ pour la fusion deutérium-tritium, ou $173\times10^6\ \text{eV}$ pour la fission de l'uranium 235. Le rapport est de l'ordre de $10^7$ à $10^8$ : une seule réaction nucléaire libère, par événement, entre dix millions et cent millions de fois plus d'énergie qu'une seule réaction chimique. C'est tout l'écart rencontré à l'accroche entre les quelques milliers d'années d'un Soleil chimique et ses 4,6 milliards d'années réels — et ce n'est pas une coïncidence : c'est exactement ce facteur qui comble l'écart.

---

## R5 — Pour t'entraîner

### Exercice type bac (original — entraînement, non un sujet officiel)

On donne : $m_p = 1{,}00728\ \text{u}$, $m_n = 1{,}00867\ \text{u}$, $m(^{4}_{2}\text{He}) = 4{,}00151\ \text{u}$, $m(^{7}_{3}\text{Li}) = 7{,}01436\ \text{u}$ (masses des noyaux), $1\ \text{u} \approx 931{,}5\ \text{MeV}/c^2$.

**1) Calcule le défaut de masse $\Delta m$ et l'énergie de liaison $E_l$ du noyau de lithium 7.**

*Ce qu'on cherche ici, et pourquoi ce geste : le lithium 7 a $Z=3$ et $N=4$ (donc $A=7$) — on applique directement la définition du R2, en comptant bien 3 protons et 4 neutrons, pas 7 nucléons indifférenciés.*

$$\Delta m = 3\,m_p + 4\,m_n - m(^{7}_{3}\text{Li})$$

$$\Delta m = 3\times1{,}00728 + 4\times1{,}00867 - 7{,}01436 = 7{,}05652 - 7{,}01436 = 0{,}04216\ \text{u}$$

$$E_l = 0{,}04216 \times 931{,}5 \approx 39{,}27\ \text{MeV}$$

**2) Calcule $E_l/A$ pour le lithium 7. Ce noyau est-il plus ou moins stable, par nucléon, que l'hélium 4 (R2) ? Où se situe-t-il par rapport à l'hélium sur la courbe d'Aston ?**

*Ce qu'on cherche ici, et pourquoi ce geste : c'est $E_l/A$, pas $E_l$, qui permet la comparaison — le lithium a plus de nucléons que l'hélium, donc comparer les $E_l$ brutes serait trompeur (R3).*

$$\frac{E_l}{A} = \frac{39{,}27}{7} \approx 5{,}61\ \text{MeV/nucléon}$$

C'est nettement moins que les $7{,}08\ \text{MeV/nucléon}$ de l'hélium 4 (R2) : malgré ses 3 nucléons de plus, le lithium 7 est **moins** stable par nucléon que l'hélium. Sur la courbe d'Aston, il se situe plus bas que l'hélium — un cas où la courbe n'est pas parfaitement monotone, l'hélium étant un point exceptionnellement haut pour sa masse, comme relevé au R3.

**3) On bombarde un noyau de lithium 7 avec un proton, ce qui produit deux noyaux d'hélium 4 : $^{1}_{1}\text{p} + \ ^{7}_{3}\text{Li} \longrightarrow 2\,^{4}_{2}\text{He}$. Calcule l'énergie libérée par cette réaction.**

*Ce qu'on cherche ici, et pourquoi ce geste : même méthode qu'au R4 — comparer la masse totale des réactifs à celle des produits, pas noyau par noyau. (C'est, historiquement, l'une des toutes premières réactions nucléaires provoquées et mesurées en laboratoire, en 1932 — l'une des premières vérifications expérimentales directes de $E=mc^2$.)*

$$m_{\text{réactifs}} = m_p + m(^{7}_{3}\text{Li}) = 1{,}00728 + 7{,}01436 = 8{,}02164\ \text{u}$$

$$m_{\text{produits}} = 2\,m(^{4}_{2}\text{He}) = 2\times4{,}00151 = 8{,}00302\ \text{u}$$

$$\Delta m = 8{,}00302 - 8{,}02164 = -0{,}01862\ \text{u}$$

$$E = 0{,}01862 \times 931{,}5 \approx 17{,}3\ \text{MeV}$$

**Vérification de cohérence — une seconde méthode.** L'énergie libérée par une réaction peut aussi se retrouver comme la différence entre l'énergie de liaison totale des produits et celle des réactifs (le proton seul n'a aucune énergie de liaison, ce n'est pas un noyau composé) :

$$E = 2\,E_l(^{4}_{2}\text{He}) - E_l(^{7}_{3}\text{Li}) = 2\times28{,}31 - 39{,}27 = 56{,}62 - 39{,}27 \approx 17{,}35\ \text{MeV}$$

Les deux méthodes donnent le même résultat, aux arrondis près : c'est cohérent, puisque les deux ne font, au fond, que comparer les mêmes masses par deux chemins différents.

### À toi de jouer

**Prompt 1.** Le noyau de carbone 12, $^{12}_{6}\text{C}$, a une masse (masse du noyau) $m(^{12}_{6}\text{C}) = 11{,}99671\ \text{u}$. Calcule son défaut de masse, son énergie de liaison, puis son énergie de liaison par nucléon. Compare cette valeur à celle de l'hélium 4 (R2) et à celle du fer 56 ($8{,}79\ \text{MeV/nucléon}$, R3) : le carbone 12 est-il, sur la courbe d'Aston, plus proche du sommet que l'hélium ou que le lithium ?

**Prompt 2.** Une autre réaction de fusion entre noyaux de deutérium produit de l'hélium 3 et un neutron : $^{2}_{1}\text{H} + \ ^{2}_{1}\text{H} \longrightarrow \ ^{3}_{2}\text{He} + \ ^{1}_{0}\text{n}$. On donne $m(^{2}_{1}\text{H}) = 2{,}01355\ \text{u}$, $m(^{3}_{2}\text{He}) = 3{,}01493\ \text{u}$, $m(\text{n}) = 1{,}00867\ \text{u}$. Calcule $\Delta m$ pour cette réaction, précise si de l'énergie est libérée ou absorbée, puis calcule cette énergie en MeV. Compare enfin ce résultat à l'ordre de grandeur d'une réaction chimique (R4) : par quel facteur, environ, cette fusion est-elle plus énergétique ?
