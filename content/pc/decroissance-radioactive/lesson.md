# Décroissance radioactive

---

## R0 — Accroche : le noyau qui va se désintégrer... mais lequel, et quand ?

Pose un compteur Geiger à côté d'un échantillon radioactif et écoute. Tu n'entends pas un tic-tac régulier, métronomique, comme une horloge. Tu entends : « tac... tac-tac.......... tac..... tac-tac-tac... » — des clics complètement irréguliers, sans le moindre rythme. Un noyau se désintègre maintenant. Le suivant, personne ne sait quand.

Voici la question qui va porter toute cette leçon. Imagine deux noyaux de carbone 14, strictement identiques en tout point mesurable : même composition, même énergie, plongés dans le même environnement. Le seul fait qui les distingue, c'est leur histoire : l'un vient tout juste de se former, l'autre existe déjà depuis 3000 ans.

Avant de lire la suite, prends position, vraiment, par écrit si tu peux : le noyau qui existe depuis 3000 ans a-t-il **plus de chances** de se désintégrer dans la prochaine seconde que celui qui vient de se former — comme une ampoule usée qui a plus de chances de griller parce qu'elle a déjà beaucoup servi ? Ou bien les deux noyaux ont-ils **exactement** la même chance, quel que soit leur âge ?

Garde ta réponse en tête. On va la tester directement — pas dans l'abstrait, mais avec les faits que la physique nucléaire a établis sur ce phénomène précis.

Et voici le paradoxe qu'on va devoir démêler : à l'échelle d'un seul noyau, l'instant de la désintégration est totalement imprévisible — personne, avec aucune mesure, aussi précise soit-elle, ne peut dire « celui-ci va se désintégrer dans 4 secondes ». Et pourtant, si tu comptes le nombre de noyaux restants dans un grand échantillon au cours du temps, tu obtiens une courbe parfaitement lisse, reproductible, et calculable à l'avance avec une précision redoutable. Individuellement imprévisible. Collectivement, une loi d'une précision totale.

C'est cette tension — hasard individuel, loi collective exacte — qu'on va construire pas à pas : d'abord pourquoi un noyau est stable ou ne l'est pas, ensuite ce qu'il fait pour se stabiliser, et enfin la loi mathématique qui décrit sans exception le déclin d'une population de noyaux radioactifs — une loi qui te permettra, à la fin de cette leçon, de dater un objet vieux de plusieurs milliers d'années.

---

## R1 — Le noyau : isotopes et stabilité

### Ce qu'il y a dans un noyau

Un noyau atomique est un tas de **nucléons** : des protons (charge $+e$, en nombre $Z$, appelé numéro atomique) et des neutrons (électriquement neutres, en nombre $N$). Le nombre total de nucléons, $A = Z + N$, s'appelle le nombre de masse. On note un noyau $^{A}_{Z}\text{X}$, où X est le symbole chimique de l'élément — par exemple $^{14}_{6}\text{C}$ pour le carbone 14 : $Z=6$ protons, $A=14$ nucléons, donc $N = A - Z = 8$ neutrons.

Retiens bien ce que chaque lettre verrouille : $Z$ fixe l'identité chimique de l'élément — c'est lui qui détermine le nombre d'électrons, donc les propriétés chimiques. $A$, lui, ne dit rien sur l'élément — deux noyaux de même $Z$ mais de $A$ différent restent le même élément chimique.

### Les isotopes : même élément, masse différente

Des **isotopes** sont des noyaux qui partagent le même $Z$ (donc le même élément chimique) mais qui ont un nombre de neutrons $N$ différent — donc un $A$ différent. Le carbone en offre l'exemple le plus utile pour la suite de cette leçon :

| Noyau | $Z$ | $N$ | $A$ | Statut |
|---|---|---|---|---|
| $^{12}_{6}\text{C}$ | 6 | 6 | 12 | stable |
| $^{13}_{6}\text{C}$ | 6 | 7 | 13 | stable |
| $^{14}_{6}\text{C}$ | 6 | 8 | 14 | **instable** (radioactif) |

Les trois sont du carbone — même $Z=6$, donc chimiquement indiscernables, un chimiste ne peut pas les séparer par une réaction chimique. Mais le troisième, avec deux neutrons de plus que le premier, est instable. Ça veut dire que ce n'est pas l'identité chimique qui décide de la stabilité d'un noyau — c'est autre chose. Lequel ?

### Pourquoi un noyau tient-il — et pourquoi peut-il ne pas tenir

Voici la question qu'il faut se poser avant de parler de stabilité : comment des protons, tous chargés positivement, entassés à une distance minuscule les uns des autres, ne se repoussent-ils pas et ne font-ils pas exploser le noyau ? La répulsion électrique entre deux protons voisins dans un noyau est énorme.

Ce qui les tient ensemble, c'est une interaction différente de l'interaction électrique : l'**interaction nucléaire forte**. Elle attire tous les nucléons entre eux (protons et neutrons indifféremment, sans se soucier de la charge), et à la distance qui sépare deux nucléons voisins dans un noyau, elle l'emporte largement sur la répulsion électrique — d'où la cohésion du noyau. Mais elle a une propriété cruciale que la répulsion électrique n'a pas : sa portée est **très courte**. Un nucléon n'attire vraiment que ses voisins immédiats ; la répulsion électrique, elle, agit à toute distance, et s'additionne entre *chaque paire* de protons du noyau, même les plus éloignés l'un de l'autre.

C'est de cette différence de portée que naît la stabilité — ou l'instabilité. Pour un noyau léger, les nucléons sont tous plus ou moins voisins les uns des autres : l'attraction forte, à courte portée, suffit à compenser la répulsion électrique dès que $N$ et $Z$ sont proches. Mais à mesure que le noyau grossit, la répulsion électrique (qui s'additionne sur *toutes* les paires de protons) grandit plus vite que l'attraction forte (qui ne concerne que les voisins immédiats). Ajouter des neutrons supplémentaires — qui n'ajoutent que de l'attraction forte, aucune répulsion électrique en plus, puisqu'ils ne portent pas de charge — permet de compenser. C'est pourquoi les noyaux stables les plus lourds ont proportionnellement plus de neutrons que de protons, alors que les noyaux stables les plus légers ont $N \approx Z$.

Il existe donc, pour chaque valeur de $Z$, une plage étroite de valeurs de $N$ qui donne un noyau stable — ce qu'on appelle la **vallée de stabilité**. Un noyau dont le rapport $N/Z$ tombe en dehors de cette plage — trop de neutrons, pas assez, ou un noyau simplement trop lourd pour qu'aucun équilibre ne tienne — est instable : il est **radioactif**, et va se transformer spontanément pour se rapprocher de la stabilité.

### Arrête-toi : est-ce la taille du noyau qui décide, ou le rapport N/Z ?

Avant de continuer, teste l'idée qu'on vient de poser. Beaucoup d'élèves retiennent « les gros noyaux sont instables, les petits sont stables » — une règle qui ne parle que de taille. Regarde cet exemple avant de la croire : le **tritium**, $^{3}_{1}\text{H}$, un noyau d'hydrogène avec 1 proton et 2 neutrons — seulement 3 nucléons en tout, l'un des noyaux les plus légers qui existent — est pourtant **instable** (il se désintègre par radioactivité $\beta^-$, qu'on détaille au rung suivant).

Compare-le à ses cousins stables : $^{1}_{1}\text{H}$ (1 proton, 0 neutron) et $^{2}_{1}\text{H}$, le deutérium (1 proton, 1 neutron), tous deux stables. Le tritium a deux fois plus de neutrons que de protons — un rapport $N/Z = 2$, alors que ses cousins stables ont $N/Z = 0$ et $N/Z = 1$. Pour un noyau aussi léger, ce rapport est déjà trop déséquilibré : la règle « gros = instable » est fausse, prise seule — un noyau de seulement 3 nucléons peut très bien être instable si son rapport $N/Z$ s'écarte trop de la vallée de stabilité. Ce qui compte, ce n'est pas la taille seule : c'est la position par rapport à la vallée de stabilité, et cette position dépend du rapport $N/Z$, pas du nombre brut de nucléons.

---

## R2 — Les désintégrations α, β⁻, β⁺, γ et les lois de conservation (Soddy)

Un noyau instable ne reste pas instable indéfiniment : il se transforme, spontanément et naturellement, en un autre noyau — en général plus proche de la vallée de stabilité — en émettant une particule. On appelle ça une **désintégration radioactive**. Le noyau de départ s'appelle le noyau père, celui obtenu le noyau fils.

### Les deux lois que toute désintégration respecte (lois de Soddy)

Quelle que soit la particule émise, deux quantités sont toujours conservées dans l'équation d'une désintégration :

- **Conservation du nombre de nucléons** : la somme des $A$ avant est égale à la somme des $A$ après.
- **Conservation de la charge électrique** : la somme des $Z$ avant est égale à la somme des $Z$ après (en comptant la charge de la particule émise).

Ces deux règles, une fois posées, permettent de retrouver n'importe quel noyau fils ou n'importe quelle particule émise à partir des trois autres — c'est l'outil qu'on utilise dans tous les exemples qui suivent.

### La désintégration α — pour les noyaux les plus lourds

Un noyau très lourd (grand $A$) émet un noyau d'hélium $^{4}_{2}\text{He}$, appelé **particule alpha**. Pourquoi celle-là précisément, et pas n'importe quel fragment ? Parce que le noyau $^{4}_{2}\text{He}$ est lui-même exceptionnellement bien lié — c'est un des noyaux légers les plus stables qui existent. Éjecter ce paquet compact de 2 protons et 2 neutrons est donc un moyen efficace pour un noyau surchargé de nucléons de perdre à la fois de la masse et de la charge d'un coup, et de se rapprocher de la vallée de stabilité.

L'équation générale s'écrit :

$$^{A}_{Z}\text{X} \longrightarrow \ ^{A-4}_{Z-2}\text{Y} + \ ^{4}_{2}\text{He}$$

**Exemple — le radium 226.** Le radium $^{226}_{88}\text{Ra}$ est un émetteur $\alpha$ connu. Cherchons son noyau fils.

*Ce qu'on cherche ici, et pourquoi ce geste : on ne connaît que le père et le type de particule émise — les deux lois de conservation suffisent à reconstruire le fils, on n'a besoin de rien d'autre.*

On pose l'équation avec le noyau fils inconnu $^{A'}_{Z'}\text{Y}$ :

$$^{226}_{88}\text{Ra} \longrightarrow \ ^{A'}_{Z'}\text{Y} + \ ^{4}_{2}\text{He}$$

Conservation de $A$ : $226 = A' + 4$, donc $A' = 222$.

Conservation de $Z$ : $88 = Z' + 2$, donc $Z' = 86$.

Le numéro atomique 86 correspond au radon. Le noyau fils est donc $^{222}_{86}\text{Rn}$ :

$$^{226}_{88}\text{Ra} \longrightarrow \ ^{222}_{86}\text{Rn} + \ ^{4}_{2}\text{He}$$

### La désintégration β⁻ — pour les noyaux trop riches en neutrons

Un noyau dont le rapport $N/Z$ est trop élevé (trop de neutrons pour son nombre de protons, au-dessus de la vallée de stabilité) a besoin de convertir un neutron en proton pour se rapprocher de l'équilibre. À l'intérieur du noyau, un neutron se transforme en proton, et un électron est éjecté — c'est la **particule $\beta^-$**. (Cette transformation libère aussi une particule quasiment indétectable, l'antineutrino, dont tu n'as pas besoin pour raisonner sur les équations de cette leçon.)

Le nombre de nucléons $A$ ne change pas — le neutron devient un proton, il ne disparaît pas. Mais $Z$ augmente de 1, puisqu'un proton de plus est apparu :

$$^{A}_{Z}\text{X} \longrightarrow \ ^{A}_{Z+1}\text{Y} + \ ^{0}_{-1}\text{e}$$

**Exemple — le carbone 14.** C'est justement le noyau instable qu'on a repéré au rung précédent, avec ses deux neutrons excédentaires. Il est émetteur $\beta^-$ :

$$^{14}_{6}\text{C} \longrightarrow \ ^{14}_{7}\text{N} + \ ^{0}_{-1}\text{e}$$

Vérifie toi-même les deux conservations : $14 = 14 + 0$ pour $A$, et $6 = 7 + (-1)$ pour $Z$. Le noyau fils est l'azote 14 — stable. On retrouvera cet exemple précis à la toute fin de la leçon.

### La désintégration β⁺ — pour les noyaux trop riches en protons

À l'inverse, un noyau dont le rapport $N/Z$ est trop faible (pas assez de neutrons pour son nombre de protons, en dessous de la vallée de stabilité) convertit un proton en neutron. Un proton devient un neutron, et une particule de charge $+e$ est éjectée — le **positron**, noté $^{0}_{+1}\text{e}$ (l'antiparticule de l'électron : même masse, charge opposée).

Ici, $A$ ne change toujours pas, mais $Z$ **diminue** de 1 :

$$^{A}_{Z}\text{X} \longrightarrow \ ^{A}_{Z-1}\text{Y} + \ ^{0}_{+1}\text{e}$$

**Exemple — le sodium 22.** Le sodium $^{22}_{11}\text{Na}$ est émetteur $\beta^+$ :

$$^{22}_{11}\text{Na} \longrightarrow \ ^{22}_{10}\text{Ne} + \ ^{0}_{+1}\text{e}$$

Le noyau fils est le néon 22. Remarque le sens inverse de $\beta^-$ : ici $Z$ baisse, alors que pour $\beta^-$, $Z$ montait. C'est le piège le plus courant sur cette partie du programme — les deux équations se ressemblent, mais le sens du décalage de $Z$ est opposé, parce que le déséquilibre qu'elles corrigent est opposé.

### La désintégration γ — pas une désintégration à part entière

Après une désintégration $\alpha$ ou $\beta$, le noyau fils est très souvent formé dans un **état excité** : il a la bonne composition (le bon $Z$, le bon $A$), mais il porte un surplus d'énergie interne, un peu comme un atome dont un électron serait sur une couche trop haute. Ce noyau excité, noté $\text{Y}^{*}$, se débarrasse de ce surplus en émettant un photon très énergétique — un **rayonnement $\gamma$** :

$$^{A}_{Z}\text{Y}^{*} \longrightarrow \ ^{A}_{Z}\text{Y} + \gamma$$

Remarque ce qui ne change PAS ici : ni $A$ ni $Z$. Le rayonnement $\gamma$ ne transforme pas un noyau en un autre noyau — il ne fait que relâcher de l'énergie. C'est le même noyau, avant et après, juste moins excité. C'est pour ça que $\gamma$ n'apparaît jamais seul en tête d'une désintégration : il accompagne, en second temps, une désintégration $\alpha$ ou $\beta$ qui a laissé le noyau fils dans un état excité. Le cobalt 60, par exemple, se désintègre $\beta^-$ vers du nickel 60 excité, qui relâche ensuite l'excédent d'énergie par $\gamma$ — c'est ce rayonnement $\gamma$ du cobalt 60 qui est utilisé en radiothérapie.

### Vérifie ta compréhension avant de continuer

Un rayonnement $\gamma$ change-t-il l'élément chimique du noyau qui l'émet ? Réponds avant de tourner la page mentale : non — $Z$ ne change pas, donc l'élément reste le même. C'est précisément l'erreur qu'on va croiser dans les items de cette leçon : confondre « rayonnement » et « transformation ».

---

## R3 — Un phénomène aléatoire : la loi de décroissance $N(t) = N_0 e^{-\lambda t}$

Revenons à la question posée en ouverture : le noyau qui existe depuis 3000 ans a-t-il plus de chances de se désintégrer bientôt que celui qui vient de se former ?

**Non.** C'est le fait central de cette leçon, et il faut le prendre au sérieux : la désintégration d'un noyau radioactif est **spontanée** (aucune cause extérieure ne la déclenche), **aléatoire** (impossible de prédire l'instant précis pour un noyau donné), et surtout **sans mémoire** : la probabilité qu'un noyau donné se désintègre dans la prochaine seconde ne dépend ni de son âge, ni de la température, ni de la pression, ni de la façon dont il est lié chimiquement à ses voisins. Un noyau ne « s'use » pas. Il ne « sait » pas depuis combien de temps il existe. C'est une propriété intrinsèque du noyau lui-même, caractéristique du type de noyau (l'isotope) — rien d'autre.

Si ta prédiction en ouverture était « le vieux noyau a plus de chance de casser », c'est le modèle de l'ampoule usée, ou du composant mécanique qui s'use avec le temps — un modèle qui marche très bien pour un objet fabriqué, mais qui est faux ici : un noyau n'a pas de pièces qui s'usent avec le temps qui passe, il a juste, à chaque instant, la même chance de se désintégrer que n'importe quel autre noyau identique, peu importe son âge.

### La constante radioactive λ

Cette chance de désintégrer, par unité de temps, porte un nom : la **constante radioactive** (ou constante de désintégration) $\lambda$, exprimée en $\text{s}^{-1}$ (ou toute autre unité inverse d'un temps). $\lambda$ est caractéristique de l'isotope — le carbone 14 a un $\lambda$ précis, différent de celui du cobalt 60 — et ne dépend d'aucune condition extérieure. C'est ce qui distingue radicalement ce phénomène d'une réaction chimique ordinaire, dont la vitesse, elle, dépend de la température : ici, rien de ce qui se passe autour du noyau ne peut accélérer ou ralentir sa désintégration.

### De l'hypothèse statistique à la loi de décroissance

Voici comment cette propriété individuelle — chaque noyau a, à chaque instant, la même probabilité $\lambda$ de se désintégrer par unité de temps — se traduit en une loi pour toute une population.

Imagine un échantillon contenant, à l'instant $t$, un grand nombre $N(t)$ de noyaux qui n'ont pas encore désintégré. Pendant un petit intervalle de temps $dt$, chacun de ces noyaux a, indépendamment des autres, une probabilité $\lambda \, dt$ de se désintégrer. Le nombre de désintégrations attendues pendant $dt$ est donc simplement le nombre de noyaux présents multiplié par la probabilité que chacun se désintègre :

$$dN = -\lambda \, N(t) \, dt$$

(le signe moins traduit que $N$ *diminue*). Remarque ce que dit cette équation : plus il y a de noyaux présents, plus il y a de désintégrations par seconde en valeur absolue — pas parce que les noyaux restants deviennent plus instables avec le temps, mais simplement parce qu'il y a plus de noyaux pour tenter leur chance.

### Poser la solution, puis la vérifier

On réécrit l'équation précédente sous forme différentielle :

$$\frac{dN}{dt} = -\lambda N$$

C'est une équation différentielle : elle relie la fonction inconnue $N(t)$ à sa propre dérivée. Plutôt que de la résoudre à partir de rien, on procède comme on l'a fait pour le dipôle RL et le circuit RLC — on **pose la solution qu'on attend, puis on vérifie qu'elle satisfait bien l'équation.** Ce que dit l'équation guide la supposition : la dérivée de $N$ est proportionnelle à $-N$, donc la fonction et sa dérivée ont la même forme, au signe et au facteur près. Une seule famille de fonctions se comporte ainsi — les exponentielles. On pose donc l'hypothèse, une supposition qu'on va confirmer et non une certitude déjà acquise, que la solution est :

$$N(t) = N_0 \, e^{-\lambda t}$$

où $N_0$ est le nombre de noyaux présents à l'instant pris comme origine.

**Vérifions d'abord qu'elle satisfait l'équation différentielle.** On dérive cette fonction par rapport au temps — c'est la dérivée d'une exponentielle, qui fait descendre le facteur $-\lambda$ :

$$\frac{dN}{dt} = -\lambda \, N_0 \, e^{-\lambda t}$$

Or le produit $N_0 \, e^{-\lambda t}$ n'est rien d'autre que $N(t)$ lui-même. La dérivée se réécrit donc :

$$\frac{dN}{dt} = -\lambda \, N(t)$$

C'est exactement l'équation différentielle de départ : la fonction posée la vérifie, à chaque instant $t$.

**Vérifions ensuite la condition initiale.** À l'instant $t = 0$ :

$$N(0) = N_0 \, e^{0} = N_0$$

On retrouve bien le nombre de noyaux présents au départ. L'hypothèse est confirmée sur les deux fronts — l'équation différentielle *et* la condition initiale — donc on peut encadrer le résultat :

$$\boxed{N(t) = N_0 \, e^{-\lambda t}}$$

C'est la **loi de décroissance radioactive**. $N_0$ est le nombre de noyaux radioactifs présents à l'instant pris comme origine, $N(t)$ le nombre restant à l'instant $t$ — c'est-à-dire les noyaux qui n'ont pas encore désintégré (pas le nombre de noyaux fils produits, qui vaut $N_0 - N(t)$).

Si tu as déjà étudié la décharge d'un condensateur, tu reconnais la forme : une exponentielle décroissante, qui part de $N_0$, chute vite au début, puis de plus en plus lentement, sans jamais toucher exactement zéro. Mais ne confonds pas les deux phénomènes : ici, ce n'est pas un courant électrique qui s'écoule à travers une résistance — c'est un résultat purement statistique, la somme d'un nombre gigantesque d'événements aléatoires, chacun indépendant des autres. Deux mécanismes complètement différents peuvent donner la même famille de fonctions.

### Exemple numérique — le carbone 14

La demi-vie du carbone 14 (on définit précisément ce terme au rung suivant) est $t_{1/2} = 5730$ ans, ce qui donne — par la relation qu'on établit juste après — une constante radioactive $\lambda \approx 1{,}21 \times 10^{-4}\ \text{an}^{-1}$.

*Ce qu'on cherche ici : quelle fraction d'un échantillon de carbone 14 reste-t-il après 1000 ans ? On applique directement la loi — pas besoin de compter les noyaux un par un, la loi statistique s'applique dès qu'on a assez de noyaux pour que les fluctuations individuelles s'effacent.*

$$\frac{N(1000)}{N_0} = e^{-\lambda \times 1000} = e^{-1{,}21\times 10^{-4} \times 1000} = e^{-0{,}121}$$

$$\frac{N(1000)}{N_0} \approx 0{,}886$$

Après 1000 ans, environ 88,6 % des noyaux de carbone 14 initialement présents n'ont pas encore désintégré. Ni plus, ni moins — la loi ne dit rien sur *lesquels* : elle donne uniquement une proportion, valable pour n'importe quel sous-ensemble suffisamment grand de l'échantillon.

---

## R4 — Activité, demi-vie et constante de temps

### L'activité : ce que mesure vraiment un détecteur

Le compteur Geiger de l'accroche ne compte pas $N(t)$ directement — il compte le nombre de désintégrations *par seconde*. Cette grandeur porte un nom : l'**activité** $A(t)$, définie comme le nombre de désintégrations par unité de temps :

$$A(t) = -\frac{dN}{dt} = \lambda \, N(t)$$

Puisque $N(t) = N_0 e^{-\lambda t}$, l'activité suit exactement la même loi exponentielle, avec $A_0 = \lambda N_0$ :

$$A(t) = A_0 \, e^{-\lambda t}$$

Son unité est le **becquerel** (Bq), qui vaut une désintégration par seconde. C'est l'activité, pas $N(t)$ lui-même, qu'on mesure en pratique — un détecteur compte des clics, pas des noyaux.

*(Attention à un piège de notation, pas de physique : la lettre $A$ désigne ici l'activité, alors qu'ailleurs dans cette leçon $A$ désigne le nombre de nucléons. Les deux usages sont standards ; le contexte lève toujours l'ambiguïté.)*

### La demi-vie $t_{1/2}$

La **demi-vie** (ou période radioactive) $t_{1/2}$ est la durée au bout de laquelle la moitié des noyaux initialement présents ont désintégré : $N(t_{1/2}) = \dfrac{N_0}{2}$.

*Ce qu'on cherche ici : exprimer $t_{1/2}$ en fonction de $\lambda$. On repart directement de la loi de décroissance, en y injectant la condition qui définit $t_{1/2}$.*

$$\frac{N_0}{2} = N_0 \, e^{-\lambda t_{1/2}}$$

On simplifie par $N_0$ :

$$\frac{1}{2} = e^{-\lambda t_{1/2}}$$

On passe au logarithme népérien des deux membres :

$$\ln\!\left(\frac{1}{2}\right) = -\lambda t_{1/2}$$

Comme $\ln(1/2) = -\ln 2$, on obtient :

$$-\ln 2 = -\lambda t_{1/2}$$

$$\boxed{t_{1/2} = \frac{\ln 2}{\lambda}}$$

**Une propriété qu'il faut retenir précisément : après $n$ demi-vies, quel que soit l'instant de départ choisi, il reste $N_0/2^n$.** Et ce n'est pas propre à l'instant $t=0$ — c'est une conséquence directe du caractère sans mémoire établi au rung précédent : le noyau ne « sait » pas depuis quand il existe, donc la même loi s'applique à partir de *n'importe quel* instant pris comme nouvelle origine. Deux demi-vies après le début, il reste $N_0/4$ — pas $N_0/2$ retiré deux fois de façon linéaire (ce qui donnerait zéro), mais bien une division par 2 répétée : $N_0 \to N_0/2 \to N_0/4$.

[[figure:decroissance-courbe]]

### La constante de temps τ

On définit aussi $\tau = \dfrac{1}{\lambda}$, la **constante de temps**, homogène à une durée (même rôle que le $\tau = RC$ du circuit RC, si tu l'as déjà vu : un temps caractéristique du phénomène). La relation entre les deux temps caractéristiques se lit directement sur ce qu'on vient d'établir :

$$t_{1/2} = \tau \ln 2 \approx 0{,}693 \, \tau$$

La demi-vie est donc plus courte que la constante de temps ($\ln 2 < 1$). Après une durée $\tau$, il reste $N_0 e^{-1} \approx 37\%$ des noyaux — pas 50 %, ce chiffre-là correspond à $t_{1/2}$, pas à $\tau$. En pratique, on considère qu'un échantillon a quasiment fini de désintégrer après une dizaine de demi-vies (moins de 0,1 % restant).

[[figure:tangente-tau]]

### Exemple — l'iode 131

L'iode 131, utilisé en médecine pour traiter certaines maladies de la thyroïde, a une demi-vie $t_{1/2} = 8$ jours.

*Ce qu'on cherche ici : la fraction restante après 24 jours. Choix du geste : 24 jours, c'est un multiple entier de la demi-vie — on peut passer directement par les divisions par 2 successives plutôt que de recalculer $\lambda$ puis $e^{-\lambda t}$, ce qui est plus rapide et vérifie le résultat.*

$$24\ \text{jours} = 3 \times 8\ \text{jours} = 3 \times t_{1/2}$$

Trois demi-vies écoulées, donc :

$$\frac{N(24)}{N_0} = \left(\frac{1}{2}\right)^3 = \frac{1}{8}$$

Il reste un huitième de l'iode 131 initial après 24 jours — et on pourrait vérifier ce résultat en calculant $\lambda = \ln 2 / 8 \approx 0{,}0866\ \text{jour}^{-1}$ puis $e^{-\lambda \times 24}$, qui redonne bien $\frac{1}{8}$.

Vérifie ta compréhension : est-ce que $N_0/8$ signifie qu'il ne reste plus rien de significatif ? Non — un huitième reste une quantité réelle, mesurable ; l'échantillon continue de décroître, il n'a pas atteint zéro et ne l'atteindra jamais exactement.

---

## R5 — Le principe de la datation

La loi de décroissance qu'on vient d'établir a une conséquence directe et puissante : si on connaît $\lambda$ (ou $t_{1/2}$) d'un isotope, et qu'on peut comparer la quantité — ou l'activité — présente aujourd'hui à celle qui existait à un instant de référence connu, on peut calculer combien de temps s'est écoulé entre les deux. C'est le principe de la **datation radioactive**.

### Inverser la loi pour trouver le temps

On repart de $N(t) = N_0 e^{-\lambda t}$, mais cette fois l'inconnue qu'on cherche n'est plus $N(t)$ : c'est $t$ lui-même, connaissant $N(t)$, $N_0$ et $\lambda$.

On isole l'exponentielle :

$$\frac{N(t)}{N_0} = e^{-\lambda t}$$

On passe au logarithme népérien des deux membres :

$$\ln\!\left(\frac{N(t)}{N_0}\right) = -\lambda t$$

On isole $t$ :

$$\boxed{t = -\frac{1}{\lambda}\ln\!\left(\frac{N(t)}{N_0}\right) = \frac{1}{\lambda}\ln\!\left(\frac{N_0}{N(t)}\right)}$$

Cette formule est la clé de toute datation radioactive : mesure la proportion restante $N(t)/N_0$ (ou l'activité restante $A(t)/A_0$, qui suit exactement la même loi), connais $\lambda$, et tu obtiens l'âge $t$.

**Vérification de cohérence** — avant de l'utiliser sur un cas réel, vérifie que cette formule redonne bien ce qu'on sait déjà : si la fraction restante est $N(t)/N_0 = 1/2$, la formule doit redonner $t_{1/2}$. $\ln(N_0/N(t)) = \ln 2$, donc $t = \dfrac{\ln 2}{\lambda} = t_{1/2}$ — exactement la définition du rung précédent. La formule est cohérente avec tout ce qu'on a construit jusqu'ici.

### Le cas du carbone 14 : dater la matière organique

Tant qu'un organisme est vivant (une plante, un arbre, un animal), il renouvelle en permanence son carbone en échangeant avec son environnement, ce qui maintient la proportion de carbone 14 dans ses tissus à une valeur d'équilibre à peu près constante — appelons-la la référence $N_0$ (ou l'activité de référence $A_0$).

À la mort de l'organisme, les échanges s'arrêtent. Le carbone 14 déjà présent continue de désintégrer, comme on l'a vu au R2 ($^{14}_{6}\text{C} \to \ ^{14}_{7}\text{N} + \ ^{0}_{-1}\text{e}$), mais il n'est plus renouvelé : sa quantité (et donc son activité) décroît désormais selon $N(t) = N_0 e^{-\lambda t}$, où $t$ est compté depuis la mort. En mesurant aujourd'hui l'activité restante $A(t)$ d'un échantillon (un morceau de bois, un os) et en la comparant à l'activité de référence $A_0$ d'un organisme vivant, on remonte au temps écoulé depuis la mort — c'est-à-dire l'âge de l'échantillon.

---

## R6 — Pour t'entraîner

### Exercice type bac

Un fragment de bois retrouvé sur un site archéologique est analysé. On donne, pour le carbone 14 : $t_{1/2} = 5730$ ans. L'activité d'un échantillon de bois vivant de même masse, prise comme référence, vaut $A_0$. L'activité mesurée aujourd'hui sur le fragment retrouvé vaut $A = \dfrac{A_0}{4}$.

**1) Écris la composition du noyau de carbone 14, et donne son équation de désintégration.**

*Ce qu'on cherche ici, et pourquoi ce geste : avant tout calcul, on fixe qui sont les objets physiques en jeu — c'est la donnée dont dépend tout le reste de l'exercice.*

Le carbone 14 s'écrit $^{14}_{6}\text{C}$ : $Z=6$ protons, $A=14$ nucléons, donc $N = 14 - 6 = 8$ neutrons. C'est un isotope du carbone (même $Z=6$) plus riche en neutrons que le carbone 12 stable — c'est cet excès de neutrons qui le rend instable, comme établi au R1.

C'est un émetteur $\beta^-$ (un neutron excédentaire se transforme en proton) :

$$^{14}_{6}\text{C} \longrightarrow \ ^{14}_{7}\text{N} + \ ^{0}_{-1}\text{e}$$

**2) Calcule la constante radioactive $\lambda$ du carbone 14.**

*Ce qu'on cherche ici : $\lambda$ n'est pas donné directement, mais $t_{1/2}$ l'est — la relation entre les deux, établie au R4, permet de passer de l'un à l'autre immédiatement.*

$$\lambda = \frac{\ln 2}{t_{1/2}} = \frac{\ln 2}{5730} \approx 1{,}21 \times 10^{-4}\ \text{an}^{-1}$$

**3) Détermine l'âge du fragment de bois.**

*Ce qu'on cherche ici, et pourquoi ce geste : on connaît le rapport $A/A_0 = 1/4$ et $\lambda$ ; c'est exactement la situation de la formule de datation du R5 — mais ici le rapport est une puissance de $\dfrac{1}{2}$, donc on peut vérifier le résultat de deux façons.*

Première méthode — par la formule générale :

$$t = \frac{1}{\lambda}\ln\!\left(\frac{A_0}{A}\right) = \frac{1}{\lambda}\ln(4)$$

$$t = \frac{\ln 4}{1{,}21\times 10^{-4}} \approx \frac{1{,}386}{1{,}21\times 10^{-4}} \approx 11\,460\ \text{ans}$$

Deuxième méthode — par comptage direct des demi-vies, pour vérifier : $\dfrac{1}{4} = \left(\dfrac{1}{2}\right)^2$, donc 2 demi-vies se sont écoulées :

$$t = 2 \times t_{1/2} = 2 \times 5730 = 11\,460\ \text{ans}$$

Les deux méthodes donnent exactement le même résultat — ce qui confirme que la formule générale du R5 et le raisonnement par demi-vies successives du R4 disent la même chose, vue sous deux angles différents. Le fragment de bois a environ 11 460 ans.

### À toi de jouer

**Prompt 1.** Le même laboratoire analyse un second fragment, provenant d'un site différent. Cette fois, l'activité mesurée vaut $A = 0{,}10 \times A_0$ (10 % de l'activité de référence). Détermine l'âge de ce second fragment. (Ici, le rapport n'est pas une puissance simple de $\frac12$ — tu devras passer par la formule générale avec le logarithme.)

**Prompt 2.** Un échantillon d'iode 131 ($t_{1/2} = 8$ jours), utilisé pour un examen médical, est préparé avec une activité initiale $A_0$. Calcule sa constante radioactive $\lambda$, puis détermine au bout de combien de jours son activité sera tombée à $5\%$ de $A_0$.
