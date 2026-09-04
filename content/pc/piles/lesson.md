# Piles et récupération de l'énergie

---

## R0 — Accroche : de la chaleur gaspillée au courant récupéré

Tu connais déjà cette réaction. Au chapitre sur l'évolution spontanée d'un système, tu l'as vue se produire toute seule, par simple contact, quand une lame de zinc plonge dans une solution d'ions $Cu^{2+}$ :

$$Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$$

Tu y avais établi qu'elle est bien spontanée, et tu avais constaté qu'elle libère son énergie sous forme de chaleur - une énergie bien réelle, mais dissipée sur place, dans le récipient, impossible à récupérer pour faire quoi que ce soit d'utile.

Cette leçon part exactement de ce constat, avec une ambition différente : et si, au lieu de laisser cette énergie filer en chaleur, on la récoltait sous forme de courant électrique - de quoi allumer une diode, faire tourner un petit moteur ?

Voici le montage qu'on va étudier, et il change une seule chose - décisive. Cette fois, on ne met plus le zinc et les ions $Cu^{2+}$ dans le même récipient. On place la lame de zinc dans un bécher contenant une solution de sulfate de zinc, et la lame de cuivre dans un bécher séparé contenant une solution de sulfate de cuivre. On relie les deux lames par un fil électrique - en passant par un ampèremètre - et on relie les deux solutions par un pont salin. Les deux réactifs ne se touchent plus.

Avant de lire la suite, prends position : à ton avis, cette même réaction va-t-elle encore se produire, maintenant que le zinc et les ions $Cu^{2+}$ sont séparés dans deux béchers distincts, sans aucun contact direct ? Et si oui, qu'est-ce que cette séparation change, par rapport au contact direct que tu avais observé ?

[[checkpoint:cp-r0-predict]]

Voici ce qu'on observe : l'ampèremètre dévie. Un courant électrique circule dans le fil. Avec ce montage, tu peux allumer une petite diode électroluminescente, ou faire tourner un moteur miniature - précisément l'énergie que le contact direct, lui, laissait échapper en chaleur.

Chimiquement, c'est très exactement la même réaction que par contact direct : le zinc cède des électrons, les ions $Cu^{2+}$ les captent. Mais cette fois, au lieu de sauter d'une espèce à l'autre au point de contact et de s'y dissiper en chaleur, les électrons sont forcés de faire le tour par le fil - et ce trajet organisé, dirigé, c'est du courant électrique récupérable, utilisable.

Si tu avais prédit que la séparation empêcherait toute réaction, l'écart est justement ce qu'on va comprendre : la réaction se produit bel et bien, mais son énergie change de chemin. Et si tu avais deviné qu'un courant apparaîtrait, la vraie question commence maintenant : pourquoi faut-il séparer physiquement les deux réactifs pour rendre cette énergie récupérable ? Comment savoir, avant même de brancher quoi que ce soit, quelle lame va céder ses électrons et laquelle va les recevoir ? Comment nommer les deux bornes, dans quel sens circule vraiment le courant, et pourquoi ce montage finira-t-il, lui aussi, par s'arrêter ?

C'est tout l'objet de cette leçon : comprendre ce qu'est une pile, comment elle transforme spontanément de l'énergie chimique en énergie électrique, et comment prédire chacun de ses comportements par le calcul plutôt que par la mémorisation.

---

## R1 — Le mécanisme : forcer les électrons à faire un détour

### Ce qui se passe, réellement, dans le tube à essai

Reprends la réaction de l'accroche : $Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$. C'est une réaction d'oxydoréduction - un transfert d'électrons entre deux couples oxydant/réducteur, ici $Zn^{2+}/Zn$ et $Cu^{2+}/Cu$. Dans le tube à essai, ce transfert a lieu au contact direct : un ion $Cu^{2+}$ vient se coller contre la surface du zinc, et les deux électrons cédés par un atome de zinc sautent directement, sur une distance de quelques couches atomiques, jusqu'à cet ion. Ce saut libère de l'énergie - et comme il se produit très localement, en un point de contact, cette énergie se dissipe immédiatement sous forme d'agitation thermique. Aucune direction privilégiée, aucun trajet organisé : juste de la chaleur.

### L'idée : empêcher le contact direct, forcer un détour

*Ce qu'on cherche ici, et pourquoi ce geste :* si l'énergie se perd en chaleur parce que le transfert d'électrons est local, la solution devient évidente une fois qu'on l'a vue : empêcher ce contact direct, pour que les électrons cédés par le zinc n'aient nulle part où aller sauf à travers un fil - un trajet long, dirigé, exploitable.

Pour cela, on sépare physiquement les deux espèces qui doivent échanger des électrons : le zinc métallique d'un côté, les ions $Cu^{2+}$ de l'autre, chacun dans son propre compartiment. On appelle chacun de ces compartiments une **demi-pile** : elle contient un couple oxydant/réducteur (ici $Zn^{2+}/Zn$ dans l'une, $Cu^{2+}/Cu$ dans l'autre), sous la forme d'une **électrode** (un solide conducteur - souvent le métal, forme réduite du couple) plongée dans une solution contenant l'autre espèce du couple.

Relie les deux électrodes par un fil conducteur. Maintenant, un électron libéré par l'oxydation du zinc n'a qu'une seule issue : remonter dans le fil, traverser un circuit extérieur (un ampèremètre, une lampe, n'importe quel récepteur), et ressortir à l'autre bout pour être capté par un ion $Cu^{2+}$. Le détour est devenu obligatoire - et c'est précisément ce détour, organisé et dirigé, qu'on peut exploiter comme courant électrique.

### Pourquoi il faut aussi relier les deux solutions

Sépare les deux compartiments par le fil seul, sans rien d'autre, et regarde ce qui arrive presque immédiatement. Du côté du zinc, l'oxydation produit des ions $Zn^{2+}$ - la solution y gagne des charges positives en excès (les électrons, eux, partent par le fil, ils ne restent pas en solution pour compenser). Du côté du cuivre, la réduction consomme des ions $Cu^{2+}$ - la solution y perd des charges positives.

Un côté qui s'enrichit en charge positive, un côté qui s'en appauvrit : très vite, ce déséquilibre électrique s'oppose lui-même à la réaction - la solution de zinc, de plus en plus positive, freine la formation de nouveaux $Zn^{2+}$, et la solution de cuivre, relativement de plus en plus négative, freine la réduction. Le courant s'arrêterait presque aussitôt.

C'est pour ça qu'on relie les deux solutions par un **pont salin** (un tube rempli d'un gel contenant des ions inertes, qui ne réagissent pas, comme $K^+$ et $NO_3^-$) ou, plus simplement, par une **jonction** poreuse qui laisse passer les ions sans laisser les solutions se mélanger complètement. Le pont salin fournit des anions du côté du zinc (pour compenser l'excès de $Zn^{2+}$) et des cations du côté du cuivre (pour compenser la perte de $Cu^{2+}$) : les deux solutions restent électriquement neutres, et la réaction - donc le courant - peut se poursuivre.

Retiens la règle de construction : une pile, c'est deux demi-piles (deux couples oxydant/réducteur, chacun sur une électrode), reliées électriquement en deux endroits - par un fil (qui impose aux électrons le détour extérieur) et par un pont salin ou une jonction (qui maintient l'électroneutralité des deux solutions, sans permettre aux espèces réactives de se mélanger directement).

[[figure:pile-daniell]]

---

## R2 — Prédire le sens spontané : comparer $Q_{r,i}$ et $K$

Comment savoir, avant tout branchement, quelle électrode va céder des électrons et laquelle va les recevoir ? La réponse ne demande aucun outil nouveau. Tu as établi, au chapitre sur l'évolution spontanée d'un système, le critère qui tranche le sens d'évolution de n'importe quelle transformation : on calcule le quotient de réaction à l'instant considéré, $Q_{r,i}$, on le compare à la constante d'équilibre $K$ de la réaction, et l'écart entre les deux donne le sens. On ne le redémontre pas ici - on l'applique à la réaction de la pile.

### L'expression de $Q_r$ pour la pile Daniell

Pour la réaction $Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$, c'est la même expression qu'au chapitre sur l'évolution spontanée :

$$Q_r = \frac{[Zn^{2+}]}{[Cu^{2+}]}$$

Les deux métaux, $Zn$ et $Cu$, sont des solides purs : ils n'apparaissent pas dans $Q_r$ (règle vue au chapitre sur l'état d'équilibre). Seules les espèces dissoutes, $Zn^{2+}$ et $Cu^{2+}$, y figurent.

### Le critère, appliqué à la pile

Comme établi au chapitre sur l'évolution spontanée d'un système, on compare $Q_{r,i}$ à $K$ : $Q_{r,i} < K$ donne le sens direct, $Q_{r,i} > K$ le sens inverse, $Q_{r,i} = K$ un système déjà à l'équilibre. On applique ce verdict tel quel à la pile. Tant que $Q_{r,i} < K$, la réaction évolue dans le sens direct : le zinc est oxydé, les ions $Cu^{2+}$ sont réduits, et c'est précisément cette évolution qui débite le courant. Le jour où $Q_{r,i}$ rejoint $K$, l'évolution nette cesse et la pile ne débite plus de courant utile - on y reviendra au chapitre sur l'usure.

C'est ce critère, et rien d'autre, qui décide laquelle des deux électrodes cède ses électrons et laquelle les reçoit : une conséquence du calcul, pas une règle à mémoriser électrode par électrode.

### Exemple travaillé

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut savoir, avant même de brancher le montage de l'accroche, quelle lame va s'oxyder. On calcule $Q_{r,i}$ avec les concentrations initiales versées dans chaque demi-pile, et on le compare à $K$.

On verse, dans la demi-pile zinc, une solution telle que $[Zn^{2+}]_i = 1{,}0\times10^{-2}\ \text{mol/L}$, et dans la demi-pile cuivre, une solution telle que $[Cu^{2+}]_i = 1{,}0\times10^{-1}\ \text{mol/L}$. On donne, pour cette réaction à cette température, $K \approx 1{,}8\times10^{37}$.

$$Q_{r,i} = \frac{[Zn^{2+}]_i}{[Cu^{2+}]_i} = \frac{1{,}0\times10^{-2}}{1{,}0\times10^{-1}} = 0{,}10$$

$Q_{r,i} = 0{,}10$, et $K \approx 1{,}8\times10^{37}$ : $Q_{r,i}$ est plus petit que $K$ de 38 ordres de grandeur. Le critère est sans appel : le système évolue dans le sens direct. Le zinc est oxydé, les ions $Cu^{2+}$ sont réduits.

Remarque ce que ce calcul révèle : avec un $K$ aussi écrasant, à peu près n'importe quel choix raisonnable de concentrations initiales donnerait le même verdict - $Q_{r,i}$ resterait très inférieur à $K$. C'est pour ça que la pile Daniell fonctionne toujours dans le même sens en pratique : ce n'est pas une propriété qu'on mémorise électrode par électrode, c'est la conséquence d'un $K$ extrêmement grand pour cette réaction.

[[figure:qr-vs-k-echelle]]

---

## R3 — La polarité : cathode (borne +), anode (borne -)

Maintenant qu'on sait, par le calcul du chapitre précédent, quelle électrode s'oxyde et laquelle se réduit, il faut leur donner un nom - et surtout, associer chacune à la bonne borne (+ ou -) de la pile.

### Les deux noms, et pourquoi les bornes leur correspondent

- L'électrode où se produit l'**oxydation** s'appelle l'**anode**.
- L'électrode où se produit la **réduction** s'appelle la **cathode**.

Pour la pile Daniell, avec le sens spontané établi au chapitre 3 : le zinc, qui s'oxyde, est l'anode ; le cuivre, qui se réduit, est la cathode.

*Pourquoi c'est vrai, et pas l'inverse :* à l'anode, l'oxydation libère des électrons dans le métal - ils s'y accumulent, avant de partir dans le fil. Une électrode où les électrons s'accumulent est, par rapport au reste du circuit, chargée plus négativement : c'est la borne $-$. À la cathode, c'est l'inverse : la réduction consomme des électrons, les tirant hors du métal - cette électrode s'appauvrit en électrons, elle est donc, relativement, chargée plus positivement : c'est la borne $+$.

Autrement dit : l'anode (le siège de l'oxydation) est toujours la borne $-$ ; la cathode (le siège de la réduction) est toujours la borne $+$. Pour la pile Daniell : le zinc (anode) est la borne $-$, le cuivre (cathode) est la borne $+$.

### Teste l'idée avant de la croire : « réduction, ça diminue, donc c'est négatif »

Voici une confusion facile à commettre, et elle vient du mot lui-même : « réduction » évoque une diminution, quelque chose qui rétrécit - et on associe spontanément « diminuer » à « négatif ». À l'inverse, « oxydation » sonne plus actif, presque agressif - on l'associe facilement à « positif ». Cette association mène droit à l'erreur inverse de la réalité : cathode (réduction) = borne $-$, anode (oxydation) = borne $+$.

Reviens au mécanisme, pas au mot. Ce qui compte, ce n'est pas ce que le nom « réduction » évoque dans la langue courante, c'est ce qui se passe réellement avec les électrons à chaque électrode. La réduction consomme des électrons - l'électrode qui en manque relativement devient la borne $+$. L'oxydation en produit - l'électrode qui en a l'excès devient la borne $-$. Le sens de circulation réel des électrons tranche, pas la sonorité du mot.

### Exemple travaillé

Reprends la pile Daniell du chapitre 3. On a établi que $Q_{r,i} < K$, donc le zinc s'oxyde et les ions $Cu^{2+}$ se réduisent. Nomme complètement les deux électrodes :

- Le zinc est le siège de l'oxydation : c'est l'**anode**, la **borne** $-$.
- Le cuivre est le siège de la réduction : c'est la **cathode**, la **borne** $+$.

Un voltmètre branché entre les deux lames, avec sa borne rouge sur le cuivre et sa borne noire sur le zinc, doit donc afficher une valeur positive - c'est bien ce qu'on observe expérimentalement sur une pile Daniell en fonctionnement.

### Le schéma conventionnel : écrire une pile en une ligne

Décrire une pile en trois phrases, comme on vient de le faire, est long et se prête mal à une copie d'examen. Les chimistes ont donc une écriture compacte, normalisée, qui dit exactement la même chose sur une seule ligne : le **schéma conventionnel** de la pile. Un sujet de bac peut demander directement « schématiser cette pile », et il attend cette écriture-là.

**La règle d'écriture, en trois points.**

1. On écrit les deux électrodes **aux extrémités**, en portant leur polarité : la **borne $-$ à gauche**, la **borne $+$ à droite**. C'est l'ordre conventionnel, et il n'est pas négociable — c'est lui qui rend le schéma lisible sans commentaire.
2. Une **barre simple** $|$ marque une **frontière entre deux phases différentes** : le métal solide d'un côté, la solution qui le baigne de l'autre. C'est là que se produit la demi-réaction.
3. Une **double barre** $\|$ marque la **jonction entre les deux solutions** — c'est le pont salin (ou la paroi poreuse) du chapitre 2. Elle sépare les deux demi-piles, qui ne doivent jamais se mélanger.

**Sur la pile Daniell**, avec le zinc en anode (borne $-$) et le cuivre en cathode (borne $+$) :

$$\ominus\ \text{Zn}_{(s)}\ \big|\ \text{Zn}^{2+}_{(aq)}\ \big\|\ \text{Cu}^{2+}_{(aq)}\ \big|\ \text{Cu}_{(s)}\ \oplus$$

**Lis la ligne de gauche à droite et retrouve toute la pile.** À gauche, le zinc métallique en contact avec sa solution d'ions $Zn^{2+}$ : c'est la demi-pile où le zinc s'oxyde et libère des électrons, donc la borne $-$. Au centre, la double barre : le pont salin, qui maintient l'électroneutralité sans laisser les solutions se mélanger. À droite, les ions $Cu^{2+}$ en contact avec le cuivre métallique : la demi-pile où la réduction consomme les électrons, donc la borne $+$. Rien n'a été perdu par rapport aux trois phrases — et dans le sens de lecture, de gauche à droite, on suit **le trajet des électrons dans le circuit extérieur**, de l'anode vers la cathode.

*Le piège de cette écriture, et il coûte un point entier :* écrire la pile **à l'envers**, borne $+$ à gauche. Le schéma n'est pas symétrique, il porte l'information de polarité dans son ordre même. Le contrôle à faire systématiquement : l'espèce écrite à l'extrême gauche doit être celle **qui s'oxyde**, celle qui disparaît en donnant ses électrons. Sur la Daniell, c'est le zinc — et c'est cohérent avec ce que le chapitre 3 a établi ($Q_{r,i} < K$).

[[checkpoint:cp-r3-anode-cathode]]

---

## R4 — Sens du courant, sens des électrons : deux flèches opposées

### Une convention plus vieille que la découverte de l'électron

Le sens conventionnel du courant électrique a été fixé - par convention, arbitrairement - avant même qu'on sache ce qui se déplace réellement dans un fil : on a décidé que le courant circule dans le sens où se déplaceraient des charges positives. On a découvert seulement plus tard que, dans un fil métallique, les porteurs de charge réels sont les électrons - des charges négatives. Une charge négative qui se déplace dans un sens équivaut, pour tous les effets électriques, à une charge positive qui se déplacerait dans le sens opposé. C'est cette équivalence qui fixe, une fois pour toutes, la règle : **le courant conventionnel circule en sens inverse du déplacement réel des électrons**, dans n'importe quel circuit - une pile n'y fait pas exception.

### Application au circuit extérieur d'une pile

Reprends la pile Daniell du chapitre 4 : le zinc (anode, borne $-$) libère des électrons par oxydation ; le cuivre (cathode, borne $+$) les consomme par réduction. Dans le circuit extérieur (le fil, l'ampèremètre, la lampe éventuelle), ces électrons n'ont qu'un chemin : de l'électrode où ils sont produits vers celle où ils sont consommés.

Dans le circuit extérieur, les électrons circulent donc de la borne $-$ vers la borne $+$. Et puisque le courant conventionnel circule en sens inverse des électrons, dans ce même circuit extérieur, le courant conventionnel circule de la borne $+$ vers la borne $-$.

Concrètement, sur la pile Daniell : dans le fil qui relie les deux lames, les électrons partent du zinc et arrivent au cuivre ; le courant, lui, est conventionnellement dessiné comme partant du cuivre et arrivant au zinc - alors même que ce sont, physiquement, les mêmes électrons qui circulent, seulement décrits avec une flèche inversée.

### Teste l'idée avant de la croire : « le courant, c'est les électrons qui circulent »

C'est la confusion la plus naturelle qui soit : on dit couramment que « le courant électrique est dû à un déplacement d'électrons », et il est tentant d'en conclure que la flèche du courant suit donc le déplacement des électrons. C'est exactement l'inverse.

Vérifie-le sur la pile Daniell : les électrons vont de l'anode (zinc, $-$) vers la cathode (cuivre, $+$). Si le courant suivait le même sens que les électrons, il faudrait dire qu'un courant circule de la borne $-$ vers la borne $+$ dans le circuit extérieur - ce qui contredit directement la convention historique du sens du courant (charges positives), fixée indépendamment de la nature réelle des porteurs de charge. Les deux flèches - courant et électrons - décrivent le même phénomène physique, mais pointent dans des directions opposées, parce qu'elles ne comptent pas le même signe de charge.

### Exemple travaillé

Sur le schéma de la pile Daniell : la lame de zinc est plongée dans le bécher de gauche, la lame de cuivre dans le bécher de droite, les deux reliées par un fil passant par un ampèremètre au-dessus des béchers, et les deux solutions reliées par un pont salin.

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie d'abord l'anode et la cathode (chapitre 4), puis on en déduit les deux sens de circulation dans le circuit extérieur - électrons, puis courant, dans cet ordre, parce que le sens des électrons est le sens physique réel, et le sens du courant s'en déduit par inversion.

Le zinc (à gauche) est l'anode, borne $-$. Le cuivre (à droite) est la cathode, borne $+$. Dans le fil au-dessus des béchers : les électrons partent de la lame de zinc, traversent l'ampèremètre, et arrivent à la lame de cuivre - de gauche à droite. Le courant conventionnel, affiché par l'ampèremètre, circule en sens inverse : de la lame de cuivre vers la lame de zinc - de droite à gauche.

[[figure:courant-vs-electrons]]

[[checkpoint:cp-r4-courant-electrons]]

---

## R5 — La force électromotrice de la pile

### Ce que mesure un voltmètre à vide

Branche un voltmètre (un appareil à très forte résistance interne, qui ne laisse passer qu'un courant négligeable) directement entre les deux bornes d'une pile, sans rien connecter d'autre au circuit. La tension affichée, mesurée à courant quasiment nul, s'appelle la **force électromotrice** de la pile, notée $E$ :

$$E = V_{+} - V_{-} = V_{\text{cathode}} - V_{\text{anode}}$$

*Pourquoi cette grandeur est positive pour une pile qui fonctionne réellement :* la cathode, on l'a vu au chapitre 4, est la borne $+$ - relativement plus riche en charges positives que l'anode, la borne $-$. La différence $V_{\text{cathode}} - V_{\text{anode}}$ est donc positive dès lors que la réaction est bien spontanée dans le sens qu'on a déterminé au chapitre 3 (c'est-à-dire $Q_{r,i} < K$). Une f.é.m. positive, c'est exactement la trace électrique de la comparaison chimique $Q_{r,i} < K$ : c'est la même conclusion, vue par le voltmètre plutôt que par le calcul de $Q_r$.

### Ordre de grandeur

Pour une pile Daniell dans des conditions usuelles de concentration, on mesure typiquement une f.é.m. de l'ordre de $E \approx 1{,}1\ \text{V}$. C'est cette tension qui, une fois le circuit refermé sur un récepteur, va pousser le courant dans le sens établi au chapitre 5 : du $+$ vers le $-$ à travers le circuit extérieur.

Retiens ce que représente $E$ : c'est la grandeur électrique qui traduit, en volts, la « force » avec laquelle le système chimique veut évoluer vers l'équilibre. Plus $Q_{r,i}$ est loin en dessous de $K$, plus cette force est grande ; à mesure que la pile fonctionne et que $Q_{r,i}$ se rapproche de $K$ (chapitre suivant), cette f.é.m. s'affaiblit.

---

## R6 — La quantité d'électricité débitée, et l'usure de la pile

### Attention à un piège de notation

Une précision avant d'aller plus loin : la lettre $Q$ qu'on va utiliser dans ce chapitre - la **quantité d'électricité** - n'a rien à voir avec le quotient de réaction $Q_r$ des chapitres précédents. Ce sont deux grandeurs complètement différentes, qui portent malheureusement la même lettre par convention historique. Garde-les bien séparées : $Q_r$ compare des concentrations, sans unité ; $Q$, ici, mesure une charge électrique, en coulombs.

### Construire $Q = I\,\Delta t$

Le courant $I$ mesure un débit de charge : la quantité de charge électrique qui traverse une section du circuit, par unité de temps. Si ce débit est constant pendant une durée $\Delta t$, la charge totale ayant traversé le circuit pendant ce temps est simplement le produit du débit par la durée :

$$Q = I\,\Delta t$$

$Q$ s'exprime en coulombs (C) quand $I$ est en ampères (A) et $\Delta t$ en secondes (s).

### Relier $Q$ à la quantité de matière d'électrons échangés

Une mole d'électrons porte une charge électrique fixe : c'est le nombre d'Avogadro de charges élémentaires, une quantité qu'on appelle la **constante de Faraday**, notée $F$ :

$$F \approx 9{,}65\times10^{4}\ \text{C/mol}$$

Si la pile a échangé $n(e^-)$ moles d'électrons pendant $\Delta t$, la charge totale correspondante est :

$$Q = n(e^-)\,F$$

En combinant les deux expressions de $Q$ :

$$I\,\Delta t = n(e^-)\,F$$

Cette relation permet de passer, dans les deux sens, entre ce que mesure un ampèremètre (courant, durée) et ce qui se passe chimiquement (quantité d'électrons échangés, donc quantité de réactif consommé).

### Exemple travaillé

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut savoir combien de zinc a réellement disparu de l'anode pendant que la pile Daniell a débité un courant mesurable - c'est-à-dire chiffrer concrètement l'usure de la pile, pas seulement l'affirmer.

La pile débite un courant supposé constant $I = 150\ \text{mA} = 0{,}150\ \text{A}$ pendant $\Delta t = 2\ \text{h} = 7200\ \text{s}$.

$$Q = I\,\Delta t = 0{,}150 \times 7200 = 1080\ \text{C}$$

$$n(e^-) = \frac{Q}{F} = \frac{1080}{9{,}65\times10^{4}} \approx 1{,}12\times10^{-2}\ \text{mol}$$

À l'anode, le zinc s'oxyde ; la demi-équation du couple $Zn^{2+}/Zn$ s'écrit avec la double flèche $Zn^{2+} + 2\,e^- \rightleftharpoons Zn$, lue ici dans le sens de l'oxydation. Chaque atome de zinc consommé libère deux électrons, donc :

$$n(Zn) = \frac{n(e^-)}{2} \approx 5{,}6\times10^{-3}\ \text{mol}$$

$$m(Zn) = n(Zn) \times M(Zn) \approx 5{,}6\times10^{-3} \times 65{,}4 \approx 0{,}37\ \text{g}$$

En deux heures de fonctionnement à $150\ \text{mA}$, environ $0{,}37\ \text{g}$ de zinc a réellement disparu de la lame - transformé en ions $Zn^{2+}$ dans la solution.

### Teste l'idée avant de la croire : « une pile ne s'use pas tant qu'elle est branchée »

Voici une idée fausse et pourtant répandue : puisque la pile semble « fabriquer » du courant en continu tant qu'on la laisse branchée, on s'imagine facilement qu'elle pourrait fonctionner indéfiniment - comme si la réaction chimique se recréait toute seule.

Le calcul qu'on vient de faire dit le contraire, très concrètement : chaque coulomb débité correspond à une quantité précise et irréversible de zinc métallique qui a disparu de l'anode. La lame de zinc contient une masse finie de métal au départ - elle ne se régénère pas. Une pile n'est pas une source d'énergie illimitée : c'est un réservoir fini d'énergie chimique, qui se convertit en énergie électrique jusqu'à épuisement du réactif limitant.

On retrouve d'ailleurs cette usure dans le langage du chapitre 3 : à mesure que la pile fonctionne, $[Zn^{2+}]$ augmente et $[Cu^{2+}]$ diminue dans les deux demi-piles, donc $Q_{r,i} = [Zn^{2+}]/[Cu^{2+}]$ ne cesse d'augmenter - exactement comme pour n'importe quel système qui évolue dans le sens direct, comme tu l'as vu dans le chapitre sur l'état d'équilibre. Et à mesure que $Q_{r,i}$ se rapproche de $K$, l'écart qui alimentait la f.é.m. (chapitre 6) se réduit : la tension aux bornes de la pile faiblit, jusqu'à devenir trop petite pour débiter un courant utile. La pile est alors « usée » - non pas cassée, mais chimiquement épuisée, son système ayant rejoint (ou presque) l'équilibre $Q_{r,i} = K$.

[[checkpoint:cp-r6-quantite-electricite]]

[[checkpoint:cp-r6-usure-qr-k]]

---

## R7 — Pour t'entraîner

### Récapitulatif express

- Une pile transforme spontanément de l'énergie chimique en énergie électrique, en forçant deux demi-réactions (oxydation, réduction) à échanger leurs électrons par un détour extérieur plutôt qu'au contact direct.
- Elle est constituée de deux demi-piles (couples oxydant/réducteur, électrodes) reliées par un fil et par un pont salin (ou une jonction).
- Le sens spontané se prédit en comparant $Q_{r,i}$ à $K$ : $Q_{r,i}<K$ signifie sens direct.
- L'électrode d'oxydation est l'anode, borne $-$ ; l'électrode de réduction est la cathode, borne $+$.
- Dans le circuit extérieur, les électrons vont de $-$ vers $+$ ; le courant conventionnel va de $+$ vers $-$, en sens inverse.
- La f.é.m. $E = V_+ - V_-$ mesure la tension à vide de la pile.
- La quantité d'électricité débitée vérifie $Q = I\,\Delta t = n(e^-)\,F$ ; elle chiffre la consommation réelle des réactifs, donc l'usure de la pile.

### Exercice de type bac (2020)

Place-toi en conditions d'examen sur un vrai sujet national : l'Exercice I, Partie 2 de la session normale 2020 (examen national PC BIOF). Il porte sur une pile **argent-chrome**, différente de la pile Daniell qui a servi de fil rouge à toute la leçon - et c'est justement l'intérêt : le jour du bac, tu appliques le même raisonnement à une pile jamais vue en cours. Pour chaque question, cherche sur papier d'abord, engage une réponse, puis seulement ouvre le raisonnement expert et compare-le au tien.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, une autre pile (zinc-argent) et une donnée en moins : à toi de reconnaître quelle procédure s'applique, sans pouvoir recopier le sujet précédent.

[[exercise:r-variation]]
