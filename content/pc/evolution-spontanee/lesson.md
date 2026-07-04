# Évolution spontanée d'un système

---

## R0 — Accroche : le zinc qui cède, le cuivre qui reçoit

Plonge une lame de zinc métallique dans un tube à essai contenant une solution de sulfate de cuivre, d'un bleu franc (des ions $Cu^{2+}$ en solution). Observe, minute après minute : la couleur bleue pâlit progressivement, un dépôt rougeâtre de cuivre métallique se dépose sur la lame de zinc, et si tu poses la main sur le tube, tu sens qu'il devient tiède. Quelque chose réagit, et cette réaction libère de l'énergie.

Avant de lire la suite, prends position, en une phrase : pourquoi la réaction se produit-elle dans CE sens précis - le zinc qui cède des électrons, les ions $Cu^{2+}$ qui les captent - et pas dans l'autre sens ? Si tu plongeais, à la place, une lame de cuivre métallique dans une solution d'ions $Zn^{2+}$, penses-tu que tu observerais la réaction inverse, tout aussi spontanément ?

La réponse la plus fréquente ressemble à ceci : « c'est comme ça, le zinc est plus réactif que le cuivre » - une propriété qu'on attache au métal lui-même, presque une hiérarchie à mémoriser, couple par couple. Garde cette réponse en tête ; on va la mettre à l'épreuve.

Ce dont tu as vraiment besoin, ce n'est pas une liste de métaux à classer par coeur. C'est un outil qui prédit, par le calcul, dans quel sens N'IMPORTE QUELLE transformation spontanée va évoluer - que ce soit celle-ci, une réaction acido-basique, ou une précipitation. Tu as déjà construit cet outil, dans le chapitre sur l'état d'équilibre : le quotient de réaction $Q_r$ comparé à la constante d'équilibre $K$. Cette leçon montre comment l'appliquer ici, à une transformation d'oxydoréduction qui se produit par simple contact direct - et elle répond à trois questions que le tube à essai laisse ouvertes : comment écrire précisément ce qui se passe (le langage des demi-équations électroniques), pourquoi cette énergie part en chaleur ici plutôt qu'ailleurs, et si c'est toujours le cas pour toute transformation spontanée.

---

## R1 — Le mécanisme : une oxydoréduction est un transfert d'électrons

### Oxydant, réducteur, couple

Reprends la transformation de l'accroche. Le zinc métallique perd des électrons : on dit qu'il est **oxydé**, et une espèce capable de céder des électrons est un **réducteur**. Les ions $Cu^{2+}$, eux, gagnent des électrons : on dit qu'ils sont **réduits**, et une espèce capable de capter des électrons est un **oxydant**.

Le réducteur $Zn$ et son oxydant associé $Zn^{2+}$ forment un **couple oxydant/réducteur**, noté $Zn^{2+}/Zn$ : ce sont les deux états, oxydé et réduit, d'une même espèce chimique, qui ne diffèrent que par le nombre d'électrons échangés. De même, $Cu^{2+}$ et $Cu$ forment le couple $Cu^{2+}/Cu$.

### La demi-équation électronique de chaque couple

Pour chaque couple oxydant/réducteur, on écrit une **demi-équation électronique** : elle exprime le passage entre la forme oxydée et la forme réduite, avec les électrons échangés explicitement.

$$Zn^{2+} + 2\,e^- \rightleftharpoons Zn$$

$$Cu^{2+} + 2\,e^- \rightleftharpoons Cu$$

*Pourquoi cette écriture, précisément :* une demi-équation, à elle seule, ne décrit pas une transformation qui peut réellement se produire seule - des électrons libres $e^-$ n'existent pas durablement en solution. C'est une brique : elle ne devient une réaction réelle qu'associée à une autre demi-équation, qui fournit (ou absorbe) exactement les électrons que la première consomme (ou libère).

### Combiner deux demi-équations : équilibrer les électrons échangés

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut obtenir l'équation-bilan de la réaction réelle - celle qui ne fait plus apparaître d'électrons libres, parce que ce sont eux qui, physiquement, passent directement d'une espèce à l'autre, sans jamais s'accumuler nulle part.

Dans notre transformation, le zinc s'oxyde (il cède ses électrons, donc on lit sa demi-équation de droite à gauche) et les ions $Cu^{2+}$ se réduisent (ils captent des électrons, donc on lit sa demi-équation de gauche à droite) :

$$Zn \rightleftharpoons Zn^{2+} + 2\,e^-$$

$$Cu^{2+} + 2\,e^- \rightleftharpoons Cu$$

Ici, les deux demi-équations échangent déjà le même nombre d'électrons - $2$ de chaque côté. Il suffit de les additionner terme à terme ; les $2\,e^-$ apparaissent une fois à droite (produits par l'oxydation du zinc) et une fois à gauche (consommés par la réduction du cuivre) : ils s'annulent exactement.

$$Zn + Cu^{2+} + 2\,e^- \rightleftharpoons Zn^{2+} + Cu + 2\,e^-$$

$$Zn + Cu^{2+} \rightleftharpoons Zn^{2+} + Cu$$

C'est l'équation-bilan de la réaction. Elle ne contient plus d'électrons - normal, puisqu'aucun électron ne s'accumule ni ne manque jamais dans le bilan global : chacun cédé par le zinc est immédiatement capté par un ion $Cu^{2+}$.

### Quand les deux demi-équations n'échangent pas le même nombre d'électrons

*Ce qu'on cherche ici, et pourquoi ce geste :* le cas précédent était favorable - $2$ électrons de chaque côté. Ce n'est pas toujours le cas, et il faut alors ajuster avant d'additionner.

Prends la réaction entre l'aluminium métallique et les ions $Cu^{2+}$. Les deux demi-équations sont :

$$Al^{3+} + 3\,e^- \rightleftharpoons Al$$

$$Cu^{2+} + 2\,e^- \rightleftharpoons Cu$$

L'aluminium échange $3$ électrons par atome oxydé, le cuivre n'en échange que $2$ par ion réduit. Pour que les électrons s'annulent dans la somme, il faut trouver un nombre d'électrons commun aux deux - ici, $6$ (le plus petit commun multiple de $3$ et $2$). On multiplie donc la demi-équation de l'aluminium (inversée, puisqu'il s'oxyde) par $2$, et celle du cuivre par $3$ :

$$2\,Al \rightleftharpoons 2\,Al^{3+} + 6\,e^-$$

$$3\,Cu^{2+} + 6\,e^- \rightleftharpoons 3\,Cu$$

Les $6\,e^-$ s'annulent maintenant exactement dans la somme :

$$2\,Al + 3\,Cu^{2+} \rightleftharpoons 2\,Al^{3+} + 3\,Cu$$

Retiens la règle : avant d'additionner deux demi-équations, multiplie chacune par le facteur qui rend le nombre d'électrons échangés identique des deux côtés - exactement comme tu ajustes des coefficients stoechiométriques ailleurs, sauf qu'ici, ce qu'on équilibre, ce sont des électrons, pas des atomes.

---

## R2 — Prédire le sens, par le calcul : $Q_{r,i}$ face à $K$

Tu as construit, dans le chapitre sur l'état d'équilibre, l'outil qui prédit le sens d'évolution de n'importe quel système chimique, avant même de l'observer : on calcule le quotient de réaction à l'instant considéré, $Q_{r,i}$, à partir des concentrations telles qu'elles sont à cet instant, et on le compare à la constante d'équilibre $K$ de la réaction, à la température de travail.

- Si $Q_{r,i} < K$ : le système évolue dans le sens direct.
- Si $Q_{r,i} > K$ : le système évolue dans le sens inverse.
- Si $Q_{r,i} = K$ : le système est déjà à l'équilibre.

Rien, dans ce critère, ne mentionne le type de réaction, ni la façon dont les réactifs sont mis en présence. Une réaction d'oxydoréduction par contact direct - comme celle de l'accroche - obéit exactement au même critère qu'une réaction acido-basique, ou qu'un système déjà à l'équilibre qu'on vient de perturber. Rien à mémoriser espèce par espèce : c'est une conséquence du calcul.

### L'expression de $Q_r$ pour notre réaction

Pour $Zn + Cu^{2+} \rightleftharpoons Zn^{2+} + Cu$ :

$$Q_r = \frac{[Zn^{2+}]}{[Cu^{2+}]}$$

Comme tu l'as vu dans le chapitre sur l'état d'équilibre, un solide pur n'entre pas dans l'expression de $Q_r$ - le zinc métallique et le cuivre métallique, tous deux solides, en sont exclus ; seules les espèces dissoutes, $Zn^{2+}$ et $Cu^{2+}$, y figurent.

### Exemple travaillé : trancher la question de l'accroche, par le calcul

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut savoir, avant même de plonger la lame de zinc dans le tube, si la réaction va bien se produire dans le sens observé - sans invoquer une quelconque « réactivité » du zinc à mémoriser.

On plonge la lame de zinc dans une solution de sulfate de cuivre fraîchement préparée, telle que $[Cu^{2+}]_i = 1{,}0\times10^{-1}\ \text{mol/L}$. Avant la réaction, il n'y a pratiquement pas d'ions $Zn^{2+}$ en solution - disons une trace, $[Zn^{2+}]_i \approx 1{,}0\times10^{-6}\ \text{mol/L}$, comme on en trouve dans n'importe quelle verrerie jamais parfaitement propre. On donne, pour cette réaction à cette température, $K \approx 1{,}8\times10^{37}$.

$$Q_{r,i} = \frac{[Zn^{2+}]_i}{[Cu^{2+}]_i} = \frac{1{,}0\times10^{-6}}{1{,}0\times10^{-1}} = 1{,}0\times10^{-5}$$

$Q_{r,i} = 1{,}0\times10^{-5}$, et $K \approx 1{,}8\times10^{37}$ : $Q_{r,i}$ est plus petit que $K$ de $42$ ordres de grandeur. Le critère est sans appel : le système évolue dans le sens direct - le zinc s'oxyde, les ions $Cu^{2+}$ se réduisent. C'est très exactement ce que le tube à essai montre.

### Teste l'idée avant de la croire : « un petit $Q_{r,i}$, ça doit vouloir dire que ça recule »

Confusion fréquente : inverser la conclusion du critère, et croire qu'un $Q_{r,i}$ petit annonce un sens INVERSE - peut-être parce que « petit » évoque intuitivement un recul plutôt qu'une progression à venir.

Reviens au mécanisme (chapitre état d'équilibre) : un $Q_{r,i}$ petit signifie qu'il y a, à cet instant, proportionnellement peu de produits et beaucoup de réactifs par rapport à ce que l'équilibre exigerait. La réaction directe - celle qui consomme les réactifs abondants et forme le produit encore rare - l'emporte alors sur la réaction inverse, et $Q_r$ grimpe vers $K$. « $Q_{r,i}$ petit » ne signifie donc jamais « ça recule » : ça signifie « la réaction directe a encore beaucoup de chemin à faire pour rejoindre $K$ », donc elle avance. Vérifie sur l'exemple : $Q_{r,i}=1{,}0\times10^{-5} \ll K$, et c'est exactement le sens direct - la production de $Zn^{2+}$, la disparition de $Cu^{2+}$ - qu'on observe.

Et si, au contraire, on avait préparé un mélange où $Q_{r,i} > K$ ? Imagine une solution où $[Zn^{2+}]_i = 1{,}0\times10^{-1}\ \text{mol/L}$ mais où $[Cu^{2+}]_i$ serait aussi infime que $1{,}0\times10^{-40}\ \text{mol/L}$ (une concentration inaccessible en pratique - bien moins d'un ion pour des litres de solution) :

$$Q_{r,i} = \frac{1{,}0\times10^{-1}}{1{,}0\times10^{-40}} = 1{,}0\times10^{39}$$

Ici $Q_{r,i} \approx 1{,}0\times10^{39} > K \approx 1{,}8\times10^{37}$ : le critère imposerait alors le sens inverse - ce serait le cuivre métallique qui céderait ses électrons aux ions $Zn^{2+}$. Ce n'est pas « le zinc qui a une propriété fixe de céder ses électrons » : c'est la comparaison $Q_{r,i}$ face à $K$, à cet instant précis, qui décide - et avec un $K$ aussi écrasant pour ce couple, il faudrait des concentrations extrêmes, presque jamais rencontrées en pratique, pour renverser le verdict.

---

## R3 — Le transfert direct d'électrons : pourquoi ça part en chaleur

Le critère du rung précédent dit SI la réaction va se produire, et dans quel sens. Il ne dit rien sur COMMENT, physiquement, les électrons passent du zinc aux ions $Cu^{2+}$ - ni sur ce que devient l'énergie libérée.

### Ce qui se passe, réellement, au contact

Dans le tube à essai, il n'y a rien entre le zinc et les ions $Cu^{2+}$ : un ion $Cu^{2+}$ vient se coller directement contre la surface du métal, et les deux électrons cédés par un atome de zinc sautent directement, sur une distance de quelques couches atomiques, jusqu'à cet ion. Ce saut libère de l'énergie - et comme il se produit très localement, en un point de contact microscopique, cette énergie se dissipe immédiatement dans le désordre, sous forme d'agitation thermique des molécules environnantes. Aucune direction privilégiée, aucun trajet organisé : juste de la chaleur, répartie dans le tube.

C'est cette agitation thermique, multipliée par un nombre immense de sauts d'électrons simultanés à l'échelle du tube à essai, qui fait grimper la température que tu sens sous tes doigts.

### Teste l'idée avant de la croire : « une transformation spontanée dégage toujours une chaleur qu'on peut sentir »

Voici une généralisation trompeuse, et elle vient précisément de l'exemple qu'on vient de voir : puisque CETTE réaction spontanée chauffe le tube de façon nette, on peut être tenté de conclure qu'une transformation spontanée dégage TOUJOURS une chaleur perceptible - que « spontané » et « qui chauffe » seraient presque synonymes.

Reviens au critère du rung 2 : ce qui définit une évolution spontanée, c'est UNIQUEMENT la comparaison $Q_{r,i}$ face à $K$ - rien, dans cette comparaison, ne parle de température ni de quantité de chaleur. Le critère est purement une affaire de concentrations. La chaleur dégagée, elle, dépend de tout autre chose : la quantité de matière qui réagit réellement, et le trajet que prend l'énergie libérée.

Deux façons de mettre en défaut l'idée « spontané = ça chauffe forcément » :

- **La quantité compte.** Reprends l'expérience avec une pointe de zinc minuscule plongée dans une goutte de solution très diluée : la même réaction, tout aussi spontanée ($Q_{r,i} < K$, rigoureusement identique), ne fait réagir qu'une quantité infime de matière. L'énergie totale libérée est alors si faible qu'aucune élévation de température ne sera perceptible au toucher - alors que le critère de spontanéité, lui, n'a absolument pas changé.
- **Le trajet compte.** Imagine qu'on empêche ce contact direct - qu'on force ces mêmes électrons à emprunter un long détour, par un circuit électrique extérieur, avant d'atteindre les ions $Cu^{2+}$ (tu verras ce montage en détail dans un prochain chapitre). La réaction reste EXACTEMENT la même, avec le même $K$, le même critère $Q_{r,i} < K$ - mais une grande partie de l'énergie libérée emprunte alors ce circuit sous forme électrique, plutôt que de se dissiper sur place en chaleur. Le tube à essai en contact direct chauffe nettement ; le montage à détour, lui, chauffe à peine, alors que la transformation chimique sous-jacente est rigoureusement identique.

La conclusion à retenir : la chaleur perçue est une conséquence du chemin emprunté par l'énergie libérée (contact local, ou détour organisé) et de la quantité de matière qui réagit - jamais une propriété qui définit, à elle seule, ce que veut dire « spontané ». Le seul juge de la spontanéité reste le critère $Q_{r,i}$ face à $K$.

---

## R4 — Transfert direct ou pile : le test qui tranche

Le rung précédent a laissé entrevoir qu'on peut forcer ces mêmes électrons à emprunter un détour extérieur plutôt qu'un contact direct. Il faut maintenant savoir reconnaître, face à un montage donné, lequel des deux se produit réellement - parce que « il y a une oxydoréduction » ne suffit pas, à lui seul, à dire « c'est une pile ».

### Le critère qui distingue les deux montages

Deux montages peuvent faire réagir exactement le même couple de réactifs, avec exactement la même équation-bilan et le même critère $Q_{r,i}$ face à $K$ - et pourtant se comporter très différemment :

- **Contact direct (comme dans le tube à essai) :** le réducteur ($Zn$) et l'oxydant ($Cu^{2+}$) sont mélangés dans le même récipient, au contact l'un de l'autre. Les électrons sautent directement d'une espèce à l'autre, sur place. Aucun fil, aucun circuit extérieur, donc aucun courant mesurable à l'ampèremètre - même si la réaction se produit bel et bien, avec un transfert d'électrons tout aussi réel.
- **Détour forcé (une pile, sujet d'un prochain chapitre) :** le réducteur et l'oxydant sont physiquement séparés dans deux compartiments distincts, reliés uniquement par un fil conducteur (et une jonction qui maintient l'électroneutralité des solutions). Les électrons n'ont alors qu'une seule issue : passer par le fil. Un ampèremètre placé sur ce fil dévie - un courant électrique mesurable circule, exploitable.

Le test qui tranche, face à un montage inconnu, n'est donc jamais « y a-t-il une oxydoréduction ? » (cette question ne suffit pas à elle seule) mais : **les réactifs sont-ils physiquement séparés, avec un courant mesurable dans un circuit extérieur - ou sont-ils en contact direct dans le même récipient ?**

### Teste l'idée avant de la croire : « toute réaction entre un métal et une solution d'ions métalliques est une pile »

C'est une confusion facile, précisément parce que le tube à essai de l'accroche met en jeu une oxydoréduction bien réelle, avec un transfert d'électrons authentique entre le zinc et les ions $Cu^{2+}$ - tous les ingrédients chimiques d'une pile semblent réunis.

Vérifie sur le montage de l'accroche : y a-t-il un fil conducteur reliant deux compartiments séparés ? Non - la lame de zinc baigne directement dans la solution de sulfate de cuivre, dans le même tube. Y a-t-il un courant mesurable dans un circuit extérieur ? Non, il n'existe même pas de circuit extérieur à mesurer. Le tube à essai n'est donc PAS une pile, même s'il met en jeu très exactement la même réaction chimique, avec le même critère de spontanéité, que celle qu'on retrouvera plus tard dans un montage en pile. Ce qui fait une pile, ce n'est pas la nature de la réaction : c'est la séparation physique forcée des réactifs, qui contraint les électrons à un détour mesurable.

Inversement, ne conclus pas non plus qu'une pile mettrait en jeu une réaction chimique différente ou « plus forte » : c'est rigoureusement la même transformation, gouvernée par le même $K$, seulement empêchée de se produire par contact direct.

---

## R5 — Un critère universel : acido-basique, précipitation, et au-delà

Le critère $Q_{r,i}$ face à $K$ ne doit rien à l'oxydoréduction en particulier - il s'applique à N'IMPORTE QUELLE transformation chimique en solution aqueuse, pourvu que tu saches écrire l'équation de la réaction et calculer son quotient de réaction. Vérifie-le sur deux familles de réactions complètement différentes.

### Une réaction acido-basique

Reprends un couple acide/base $AH/A^-$ (chapitre réactions acido-basiques), mis en présence d'une base $B$ appartenant à un autre couple $BH^+/B$ :

$$AH + B \rightleftharpoons A^- + BH^+$$

Cette réaction est un transfert de proton, pas d'électron - mais le critère de spontanéité s'écrit exactement de la même façon. On calcule le quotient de réaction à un instant donné :

$$Q_{r,i} = \frac{[A^-]_i\,[BH^+]_i}{[AH]_i\,[B]_i}$$

et on le compare à la constante d'équilibre $K$ de cette réaction (on peut l'obtenir à partir des constantes d'acidité $K_A$ des deux couples, mais ce n'est pas l'objet ici). Si $Q_{r,i} < K$, le mélange évolue dans le sens direct - l'acide $AH$ cède son proton à la base $B$ - exactement selon la même logique que pour le zinc et les ions $Cu^{2+}$.

### Une réaction de précipitation

Prends la dissolution d'un solide ionique, par exemple le chlorure d'argent :

$$AgCl_{(s)} \rightleftharpoons Ag^+ + Cl^-$$

Le solide $AgCl$, comme tout solide pur, n'entre pas dans l'expression de $Q_r$ (rung 2, et déjà vu dans le chapitre état d'équilibre) :

$$Q_r = [Ag^+]\,[Cl^-]$$

Si tu verses, dans une même solution, des ions $Ag^+$ et des ions $Cl^-$ à des concentrations telles que $Q_{r,i} = [Ag^+]_i\,[Cl^-]_i > K$, le critère impose le sens inverse de cette équation de dissolution - c'est-à-dire, ici, la formation d'un précipité de $AgCl$ solide, jusqu'à ce que $Q_r$ redescende à $K$. Si au contraire $Q_{r,i} < K$, un éventuel solide $AgCl$ déjà présent continuerait à se dissoudre.

### Ce que ces deux exemples montrent

Trois familles de réactions - oxydoréduction, acido-basique, précipitation - dont les mécanismes microscopiques n'ont rien en commun (échange d'électrons, échange de protons, formation ou rupture d'un réseau cristallin). Et pourtant, un seul et même critère prédit, dans les trois cas, le sens d'évolution : comparer $Q_{r,i}$, calculé à partir des concentrations de l'instant, à $K$, la constante d'équilibre de la réaction considérée. Ce n'est pas une coïncidence : ce critère ne dépend jamais du mécanisme microscopique de la réaction - seulement de l'écart entre où en est le système et où il « veut » être à l'équilibre.

---

## R6 — Pour t'entraîner

### Récapitulatif express

- Toute réaction chimique, oxydoréduction incluse, obéit au même critère (chapitre état d'équilibre) : on compare $Q_{r,i}$, calculé à partir des concentrations de l'instant, à $K$. $Q_{r,i}<K$ : sens direct. $Q_{r,i}>K$ : sens inverse. $Q_{r,i}=K$ : équilibre déjà atteint.
- Une réaction d'oxydoréduction est un transfert d'électrons entre un réducteur et un oxydant. On l'écrit à l'aide de deux demi-équations électroniques, combinées en équilibrant le nombre d'électrons échangés (au besoin, en multipliant chacune par un facteur différent).
- Par contact direct, ce transfert se fait localement, et l'énergie libérée s'y dissipe en chaleur. Mais la spontanéité elle-même ne dépend que de $Q_{r,i}$ face à $K$ - jamais de la chaleur perçue, qui dépend de la quantité de matière qui réagit et du chemin emprunté par l'énergie.
- Transfert direct (réactifs dans le même récipient, pas de courant mesurable) et pile (réactifs séparés, détour forcé par un circuit, courant mesurable) mettent en jeu la même réaction et le même critère - seul le montage diffère.
- Ce critère $Q_{r,i}$ face à $K$ est universel : il s'applique de la même façon aux réactions acido-basiques et aux précipitations, pas seulement à l'oxydoréduction.

### Exercice de type bac (original - entraînement, non un sujet officiel)

On plonge une pointe de fer métallique, directement, dans un bécher contenant une solution de nitrate d'argent fraîchement préparée, telle que $[Ag^+]_i = 2{,}0\times10^{-1}\ \text{mol/L}$. Avant la réaction, on considère que $[Fe^{2+}]_i \approx 1{,}0\times10^{-6}\ \text{mol/L}$ (trace). On donne, pour la réaction entre le fer métallique et les ions argent(I), à la température de l'expérience : $K \approx 4{,}0\times10^{15}$. Un dépôt métallique gris argenté se forme sur la pointe de fer, et le bécher tiédit légèrement.

**1) Écris les deux demi-équations électroniques des couples $Ag^+/Ag$ et $Fe^{2+}/Fe$, puis combine-les pour obtenir l'équation-bilan de la réaction entre le fer métallique et les ions argent(I).**

*Ce qu'on cherche ici, et pourquoi ce geste :* on écrit chaque couple sous sa forme demi-équation (rung 1), puis on repère que le fer échange $2$ électrons par atome oxydé alors que l'argent n'en échange qu'$1$ par ion réduit - il faut donc multiplier la demi-équation de l'argent par $2$ avant d'additionner.

$$Ag^+ + e^- \rightleftharpoons Ag \qquad\qquad Fe^{2+} + 2\,e^- \rightleftharpoons Fe$$

$$Fe \rightleftharpoons Fe^{2+} + 2\,e^-$$

$$2\,Ag^+ + 2\,e^- \rightleftharpoons 2\,Ag$$

$$Fe + 2\,Ag^+ \rightleftharpoons Fe^{2+} + 2\,Ag$$

**2) Calcule $Q_{r,i}$ à l'instant initial, compare-le à $K$, et déduis-en le sens d'évolution spontané : quelle espèce est oxydée, quelle espèce est réduite ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le critère du rung 2 - calculer $Q_{r,i}$ avec les concentrations de l'énoncé (le fer et l'argent solides sont exclus de $Q_r$), et comparer à $K$.

$$Q_{r,i} = \frac{[Fe^{2+}]_i}{[Ag^+]_i^{\,2}} = \frac{1{,}0\times10^{-6}}{(2{,}0\times10^{-1})^2} = 2{,}5\times10^{-5}$$

$Q_{r,i} = 2{,}5\times10^{-5} \ll K \approx 4{,}0\times10^{15}$ : le système évolue dans le sens direct. Le fer est oxydé ($Fe \to Fe^{2+}+2\,e^-$), les ions $Ag^+$ sont réduits ($Ag^++e^- \to Ag$).

**3) Un camarade affirme : « Un ampèremètre plongé n'importe où dans ce bécher devrait dévier, puisqu'il y a bien un courant d'électrons qui circule du fer vers les ions $Ag^+$. » Explique pourquoi ce raisonnement est faux.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le test du rung 4 - la seule présence d'une oxydoréduction ne suffit pas à définir un courant mesurable ; il faut un circuit extérieur réel.

Les électrons passent directement, sur quelques couches atomiques, du fer aux ions $Ag^+$ en contact - ils ne traversent aucun fil, aucun circuit extérieur qu'un ampèremètre pourrait mesurer. Un ampèremètre plongé dans le bécher ne mesurerait rien, car il n'existe aucun trajet organisé et macroscopique pour ces électrons : c'est un transfert direct, pas une pile. Pour obtenir un courant mesurable, il faudrait séparer physiquement le fer et les ions $Ag^+$ dans deux compartiments reliés par un fil (et une jonction) - un montage totalement différent de celui décrit ici, même si la réaction chimique sous-jacente serait rigoureusement la même.

**4) Le bécher ne tiédit que « légèrement », alors que la réaction est nettement spontanée ($Q_{r,i} \ll K$). Un camarade en déduit que la réaction n'est « pas vraiment spontanée, sinon ça chaufferait plus fort ». Explique pourquoi cette déduction est fausse, et cite un facteur qui, ici, limite l'élévation de température perçue.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le rung 3 - la spontanéité se juge uniquement sur $Q_{r,i}$ face à $K$ ; la chaleur perçue dépend d'autre chose.

Le critère de spontanéité ($Q_{r,i}\ll K$) ne dit rien sur la quantité de chaleur perceptible : c'est une comparaison de concentrations, pas une mesure d'énergie. La chaleur ressentie dépend, elle, de la quantité de matière qui réagit réellement. Si la pointe de fer est petite et la solution modérément concentrée, seule une quantité limitée de réactif est consommée en peu de temps, donc l'énergie totale libérée à cet instant reste modeste - même si le critère de spontanéité est aussi net que possible. « Peu de chaleur perceptible » ne remet donc absolument pas en cause le fait que la réaction soit spontanée.

**5) Si, au lieu du contact direct, on séparait le fer et les ions $Ag^+$ dans deux compartiments reliés par un fil et une jonction, prédis (sans calcul) ce que deviendrait la chaleur dégagée dans les deux compartiments par rapport au montage en contact direct, et pourquoi.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on applique le contraste du rung 3 entre contact direct et détour forcé.

Elle serait nettement plus faible, car une grande partie de l'énergie libérée par la réaction emprunterait alors le fil sous forme de courant électrique, plutôt que de se dissiper sur place, localement, en agitation thermique. La réaction chimique et son critère de spontanéité ($Q_{r,i}\ll K$) resteraient pourtant rigoureusement identiques - seul le chemin emprunté par l'énergie change.

### À toi

**Variation 1.** On plonge un ruban de magnésium métallique, directement, dans un bécher contenant une solution de nitrate d'argent telle que $[Ag^+]_i = 3{,}0\times10^{-1}\ \text{mol/L}$, avec $[Mg^{2+}]_i \approx 1{,}0\times10^{-6}\ \text{mol/L}$ avant réaction. On donne, pour la réaction entre le magnésium et les ions argent(I), $K$ extrêmement grand (de l'ordre de $10^{80}$). Écris les deux demi-équations électroniques des couples $Mg^{2+}/Mg$ et $Ag^+/Ag$, combine-les pour obtenir l'équation-bilan, calcule $Q_{r,i}$ et compare-le à $K$ pour prédire le sens d'évolution. Enfin, un ampèremètre est plongé directement dans ce même bécher : va-t-il dévier ? Justifie à partir du rung 4.

**Variation 2.** Un élève affirme : « Le critère $Q_{r,i}$ face à $K$, vu dans cette leçon, ne peut pas s'appliquer à une précipitation comme $AgCl_{(s)} \rightleftharpoons Ag^+ + Cl^-$, puisqu'il n'y a ici aucun transfert d'électrons. » Explique pourquoi ce raisonnement est faux, en t'appuyant sur ce que tu as vu au rung 5.
