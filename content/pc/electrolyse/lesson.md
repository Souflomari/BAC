# Transformations forcées — électrolyse

---

## R0 — Accroche : faire tourner la pile à l'envers

Reprends le montage de la leçon précédente : une pile Daniell, lame de zinc plongée dans une solution de sulfate de zinc, lame de cuivre plongée dans une solution de sulfate de cuivre, les deux compartiments reliés par un pont salin. Tu sais déjà ce qui se passe quand on relie les deux lames par un simple fil et un ampèremètre : la pile fonctionne spontanément - le zinc se dissout peu à peu, le cuivre se dépose peu à peu, et un courant électrique utilisable circule dans le fil, dans le sens imposé par la chimie elle-même.

Maintenant, retire l'ampèremètre et branche à sa place un générateur électrique réglable - une alimentation de laboratoire, capable de délivrer une tension continue de plusieurs volts. Branche-le de sorte que sa tension s'oppose au sens naturel de la pile, et augmente-la progressivement.

Avant de lire la suite, prends position : à ton avis, que va-t-il se passer sur chaque lame à mesure qu'on augmente la tension du générateur - rien de notable, un simple ralentissement du courant, ou carrément l'inverse de ce qu'on observait avec la pile seule ?

Voici ce qu'on observe, une fois la tension du générateur suffisamment élevée. La lame de zinc, qui se dissolvait dans le fonctionnement spontané de la pile, se met à grossir : un dépôt de zinc métallique frais s'y forme. La lame de cuivre, elle, qui se recouvrait de cuivre dans le fonctionnement spontané, se met au contraire à se dissoudre - la solution qui l'entoure devient plus intensément bleue, signe qu'elle s'enrichit en ions $Cu^{2+}$.

C'est très exactement l'inverse de ce que toute la leçon précédente a établi : le sens $Zn + Cu^{2+} \rightleftharpoons Zn^{2+} + Cu$, celui que $Q_{r,i} < K$ imposait comme seul sens possible, spontanément. Livré à lui-même, ce système n'évoluerait jamais dans le sens inverse $Cu + Zn^{2+} \rightleftharpoons Cu^{2+} + Zn$ - le critère de spontanéité l'interdit, aussi sûrement qu'un objet ne remonte jamais une pente tout seul. Et pourtant, avec ce générateur, on vient de le forcer à faire exactement ça.

Si tu avais prédit que rien ne changerait fondamentalement - juste un courant modifié, dans le même sens -, l'écart entre ta prédiction et cette inversion complète est justement ce qu'on va comprendre. Si tu avais deviné l'inversion, la vraie question commence maintenant : comment un simple générateur peut-il imposer un sens que la chimie elle-même interdit ? Cette inversion du sens change-t-elle aussi les noms qu'on donne aux électrodes - ou seulement leur polarité ? Et jusqu'où peut-on pousser ce genre de détournement ?

C'est tout l'objet de cette leçon : l'électrolyse, la transformation forcée.

---

## R1 — Le mécanisme : la cellule d'électrolyse impose ce que la chimie refuse

### Ce qu'on appelle une cellule d'électrolyse

Une **cellule d'électrolyse**, c'est un dispositif à trois ingrédients : deux électrodes, plongées dans un **électrolyte** - un milieu contenant des ions mobiles, capable de conduire le courant (le plus souvent une solution aqueuse ionique, mais ce peut aussi être un sel fondu, tu le verras au rung 5) -, le tout relié non pas par un simple fil, mais par un **générateur électrique extérieur**.

C'est précisément ce troisième ingrédient qui change tout par rapport à la pile.

### Ce qui bascule : qui commande, la chimie ou le générateur ?

Dans une pile (leçon précédente, rung 1), on empêchait le contact direct entre le réducteur et l'oxydant pour forcer les électrons à faire un détour par un fil - mais le sens de ce détour restait entièrement dicté par la chimie elle-même : c'est la comparaison $Q_{r,i}$ face à $K$ qui décidait quelle électrode cède ses électrons et laquelle les reçoit. La pile ne fait qu'obéir à ce que la réaction veut faire spontanément ; elle se contente de canaliser ce mouvement à travers un circuit exploitable.

Dans une cellule d'électrolyse, ce n'est plus la chimie qui dicte le sens : c'est le générateur, un objet extérieur au système chimique, qui impose sa loi - y compris quand cette loi va à l'encontre de ce que $Q_{r,i}$ face à $K$ aurait décidé tout seul.

Voici comment, concrètement. Le générateur pousse, par sa borne −, des électrons dans le fil, en direction d'une des deux électrodes. Cette électrode reçoit donc un afflux d'électrons *imposé de l'extérieur* - ce n'est plus une chimie spontanée qui les y accumule, c'est le générateur qui les y pousse de force. Ces électrons forcés, arrivant en excès, sont alors captés par une espèce en solution à leur contact : une **réduction** s'y produit, imposée.

Symétriquement, à l'autre électrode, le générateur, par sa borne +, tire des électrons hors du métal, vers lui-même. L'électrode s'appauvrit en électrons de force, ce qui oblige une espèce à son contact à en céder pour combler ce manque : une **oxydation** s'y produit, elle aussi imposée.

Le vocabulaire ne change pas d'un mot : l'électrode où se produit l'oxydation continue de s'appeler l'**anode**, celle où se produit la réduction continue de s'appeler la **cathode** - exactement comme pour une pile. Ce qui change, c'est *qui décide* laquelle est laquelle : dans une pile, c'est le calcul $Q_{r,i}$ face à $K$ ; dans une électrolyse, c'est le câblage du générateur, qui peut très bien forcer le sens que ce même calcul interdirait si le système était livré à lui-même.

### Teste l'idée avant de la croire : « une électrolyse, ça produit de l'énergie électrique, comme une pile »

Un courant électrique circule dans les deux dispositifs - dans une pile comme dans une cellule d'électrolyse. Il est tentant d'en conclure que les deux « produisent » de l'électricité de la même façon.

Regarde d'où vient l'énergie dans chaque cas. Dans une pile, c'est la réaction chimique spontanée elle-même qui est la source : elle libère de l'énergie parce qu'elle évolue vers son équilibre ($Q_{r,i} < K$, elle « veut » avancer), et cette énergie est récupérée sous forme électrique dans le circuit extérieur. La pile est un générateur : elle fournit de l'énergie électrique à qui veut bien s'y brancher.

Dans une cellule d'électrolyse, c'est l'inverse. Le générateur extérieur doit fournir de l'énergie électrique pour forcer une réaction qui n'irait jamais spontanément dans ce sens ($Q_{r,i}$ face à $K$ s'y opposerait si on laissait faire la chimie seule). Cette énergie électrique ne disparaît pas : elle se retrouve stockée sous forme d'énergie chimique dans les produits qu'on vient de fabriquer de force - le dépôt de zinc de l'accroche, ou, tu le verras au rung 5, un gaz comme le dihydrogène. Une cellule d'électrolyse ne produit jamais d'énergie électrique nette : elle en **consomme**, pour construire quelque chose que la chimie, seule, refuserait de construire.

Si une cellule d'électrolyse produisait plus d'énergie électrique qu'elle n'en reçoit, on aurait construit une machine qui crée de l'énergie à partir de rien - ce qui ne peut pas arriver. Le générateur donne toujours plus d'énergie électrique à la cellule que ce que la réaction, seule, n'en aurait jamais fourni dans ce sens ; une partie de cette énergie se retrouve stockée dans les produits, le reste se dissipe en chaleur par effet Joule dans les fils et l'électrolyte.

### Exemple travaillé : nommer les deux électrodes de l'accroche

Reprends la cellule de l'accroche - le montage Daniell, forcé à l'envers par un générateur. On observe, sur la lame de zinc, un dépôt qui se forme : $Zn^{2+}+2\,e^- \rightleftharpoons Zn$, lu de la droite vers la gauche - une **réduction**. Sur la lame de cuivre, on observe une dissolution : $Cu^{2+}+2\,e^- \rightleftharpoons Cu$, lu de la gauche vers la droite - une **oxydation**.

La lame de zinc, siège de la réduction, est donc la **cathode** de cette cellule. La lame de cuivre, siège de l'oxydation, en est l'**anode**.

Remarque quelque chose d'important : dans la pile Daniell (fonctionnement spontané), c'était exactement l'inverse - le zinc était l'anode, le cuivre la cathode. Ici, en forçant le sens contraire, les noms *anode* et *cathode* ont basculé d'une électrode à l'autre, parce que c'est désormais le générateur, et non plus la chimie spontanée, qui décide où se produit l'oxydation et où se produit la réduction.

Reste une question qu'on n'a pas encore tranchée : la cathode (zinc, ici) est-elle encore la borne +, comme dans la pile ? C'est l'objet du rung suivant - et la réponse va probablement te surprendre.

---

## R2 — La polarité s'inverse : anode = borne +, cathode = borne −

### Rappel de la pile, et ce qui semble aller de soi

Dans une pile (leçon précédente, rung 3), l'anode - siège de l'oxydation - est toujours la borne −, et la cathode - siège de la réduction - est toujours la borne +. La raison en était mécanique : l'oxydation libère des électrons qui s'*accumulent* dans le métal de l'anode, la rendant relativement négative ; la réduction *consomme* des électrons à la cathode, l'appauvrissant, donc la rendant relativement positive.

Il serait naturel de supposer que cette association tient aussi pour une cellule d'électrolyse. Ce n'est pas le cas - et comprendre pourquoi est le cœur de cette leçon.

### Pourquoi la polarité s'inverse

Reprends le mécanisme du rung 1 : dans une électrolyse, c'est le générateur qui *impose* la polarité, et cette polarité imposée qui *force* le mécanisme chimique - la flèche causale s'est inversée par rapport à la pile.

Concrètement : le générateur, par sa borne +, tire des électrons hors d'une électrode. Tirer des électrons hors d'un métal, c'est forcer les espèces à son contact à en céder pour combler le manque - c'est-à-dire forcer une **oxydation**. Cette électrode, reliée à la borne + du générateur, est donc l'**anode**.

Symétriquement, le générateur, par sa borne −, pousse des électrons dans l'autre électrode. Pousser des électrons en excès dans un métal, c'est forcer les espèces à son contact à les capter - c'est-à-dire forcer une **réduction**. Cette électrode, reliée à la borne − du générateur, est donc la **cathode**.

Le résultat : dans une cellule d'électrolyse, l'anode est la borne + et la cathode est la borne − - l'exact opposé de la pile. Le vocabulaire *anode = oxydation*, *cathode = réduction* ne bouge pas d'un mot ; c'est la polarité associée à chaque nom qui s'inverse, parce que ce n'est plus la même chose qui la détermine.

[[figure:cellule-electrolyse]]

### Teste l'idée avant de la croire : « anode = borne −, toujours »

Un élève qui vient d'apprendre, pour la pile, que l'anode est la borne − risque de transporter cette règle telle quelle à l'électrolyse. Mets cette idée à l'épreuve, plutôt que de la mémoriser telle quelle.

Imagine qu'on maintienne, en électrolyse, l'association *cathode = borne +* (comme dans une pile). La borne + d'un générateur *tire* des électrons hors du circuit extérieur - c'est sa fonction électrique, quel que soit le dispositif branché. Or tirer des électrons hors d'une électrode, c'est exactement ce qui force une **oxydation**, pas une réduction. Si la cathode (siège de la réduction, par définition) était reliée à la borne +, on obtiendrait une contradiction : la borne qui est censée forcer une réduction serait, électriquement, celle qui force une oxydation. C'est impossible. La seule façon de rester cohérent avec le mécanisme (borne + qui tire les électrons → oxydation → anode ; borne − qui pousse les électrons → réduction → cathode) est d'inverser la polarité par rapport à la pile.

Retiens la distinction : dans une pile, la polarité est une **conséquence** de la chimie spontanée (l'oxydation crée un excès d'électrons, donc une borne −). Dans une électrolyse, la polarité est **imposée en premier** par le générateur, et c'est elle qui force le mécanisme chimique à s'y conformer. Le mot est le même, la logique causale est inversée.

### Exemple travaillé : le tableau de comparaison

Reprends la cellule de l'accroche, forcée à l'envers. La lame de zinc, reliée à la borne − du générateur, est la cathode : $Zn^{2+}+2\,e^- \rightleftharpoons Zn$. La lame de cuivre, reliée à la borne + du générateur, est l'anode : $Cu^{2+}+2\,e^- \rightleftharpoons Cu$, lu en sens inverse ($Cu \rightleftharpoons Cu^{2+}+2\,e^-$).

Voici la comparaison complète avec la pile Daniell de la leçon précédente, pour ce même couple de réactifs :

| | Pile Daniell (sens spontané) | Électrolyse (sens forcé) |
|---|---|---|
| Zinc | anode, borne − (oxydation) | cathode, borne − (réduction) |
| Cuivre | cathode, borne + (réduction) | anode, borne + (oxydation) |
| Qui impose le sens | la réaction chimique elle-même ($Q_{r,i}$ face à $K$) | le générateur extérieur |

Remarque bien ce que cette dernière ligne veut dire : le zinc reste, dans les deux cas, relié physiquement à la borne − - mais son rôle chimique bascule complètement, de l'oxydation (pile) à la réduction (électrolyse), parce que le sens du courant lui-même a été inversé par le générateur.

---

## R3 — La tension minimale : il faut pousser plus fort que la pile

### Pourquoi un générateur trop faible ne suffit pas

Toute cellule d'électrolyse, même avant qu'on y branche un générateur, contient déjà les ingrédients d'une pile : deux électrodes, un électrolyte, un couple oxydant/réducteur de chaque côté. Elle possède donc, comme n'importe quelle pile, une tendance spontanée à évoluer dans un sens précis - le sens que $Q_{r,i}$ face à $K$ imposerait si on la laissait faire seule -, et une force électromotrice propre, $E$, qui mesure cette tendance (leçon précédente, rung 5).

Le générateur qu'on branche pour forcer le sens *contraire* doit donc surmonter cette tendance naturelle, pas seulement s'y ajouter. Si la tension imposée par le générateur reste inférieure à $E$, la réaction continue d'évoluer, au moins en partie, dans son sens spontané - le générateur ne fait alors que freiner ce sens naturel, sans jamais l'inverser. Il faut que la tension imposée dépasse $E$, en valeur absolue et branchée en opposition au sens spontané, pour que le sens forcé l'emporte réellement.

### Exemple travaillé

Reprends la pile Daniell de la leçon précédente : sa force électromotrice propre vaut $E \approx 1{,}1\ \text{V}$.

Imagine qu'on branche, à la place de l'ampèremètre, un générateur réglé sur $U = 0{,}9\ \text{V}$, en opposition au sens spontané. Cette tension reste inférieure à $E \approx 1{,}1\ \text{V}$ : le générateur affaiblit le courant spontané, mais ne l'inverse pas - le zinc continue de se dissoudre (plus lentement), le cuivre continue de se déposer (plus lentement). Aucun dépôt de zinc n'apparaît, contrairement à ce que décrivait l'accroche.

Règle-le maintenant sur $U = 6\ \text{V}$, toujours en opposition. Cette tension dépasse largement $E \approx 1{,}1\ \text{V}$ : le générateur impose son propre sens, et c'est exactement la situation décrite dans l'accroche - le zinc se dépose, le cuivre se dissout.

### Teste l'idée avant de la croire : « n'importe quel générateur suffit à inverser le sens »

Un générateur branché en opposition au sens spontané, même s'il ne fait au départ qu'affaiblir légèrement le courant, pourrait laisser croire que l'inversion est déjà en cours - comme si tout générateur, aussi faible soit-il, produisait forcément un peu de sens inverse.

Reviens à l'exemple : à $U = 0{,}9\ \text{V}$, rien ne s'inverse - le courant continue de circuler dans le sens spontané, seulement freiné. Il n'existe pas de « demi-inversion » où les deux sens coexisteraient à parts égales : soit la tension imposée reste sous le seuil $E$ et le sens spontané l'emporte encore (freiné), soit elle le dépasse et le sens forcé prend totalement le relais. C'est un seuil à franchir, pas un curseur continu.

---

## R4 — La quantité d'électricité : $Q = I\,\Delta t = n(e^-)\,F$, réutilisée à l'envers

### La même loi, un sens inversé

Tu connais déjà cette relation (leçon précédente, rung 6) : le courant $I$, maintenu pendant une durée $\Delta t$, fait circuler une quantité d'électricité

$$Q = I\,\Delta t$$

et cette même quantité d'électricité correspond à une quantité de matière d'électrons échangés

$$Q = n(e^-)\,F$$

où $F \approx 9{,}65\times10^{4}\ \text{C/mol}$ est la constante de Faraday. En combinant les deux :

$$I\,\Delta t = n(e^-)\,F$$

Cette relation ne dépend en rien du dispositif - pile ou électrolyse - dans lequel le courant circule : c'est une relation purement électrique entre charge, courant, durée et quantité de matière d'électrons.

Ce qui change, c'est le **sens physique** de ce qu'elle mesure. Dans une pile (rung 6, leçon précédente), cette relation chiffrait l'**usure** : la masse de réactif qui disparaît irréversiblement de l'anode à mesure que la pile fonctionne. Dans une électrolyse, elle chiffre au contraire un **dépôt** ou une **transformation forcée** : la masse de matière qui apparaît à une électrode, construite de force par le courant que le générateur impose.

### Exemple travaillé

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut savoir combien de zinc a réellement été déposé à la cathode pendant que le générateur force le sens inverse de la cellule de l'accroche - chiffrer concrètement ce dépôt, pas seulement l'affirmer.

Le générateur impose un courant supposé constant $I = 200\ \text{mA} = 0{,}200\ \text{A}$ pendant $\Delta t = 1\ \text{h}\ 30 = 5400\ \text{s}$.

$$Q = I\,\Delta t = 0{,}200 \times 5400 = 1080\ \text{C}$$

$$n(e^-) = \frac{Q}{F} = \frac{1080}{9{,}65\times10^{4}} \approx 1{,}12\times10^{-2}\ \text{mol}$$

À la cathode, le zinc se dépose selon $Zn^{2+}+2\,e^- \rightleftharpoons Zn$ (lu de la droite vers la gauche) : chaque atome de zinc déposé consomme deux électrons, donc :

$$n(Zn) = \frac{n(e^-)}{2} \approx 5{,}6\times10^{-3}\ \text{mol}$$

$$m(Zn) = n(Zn) \times M(Zn) \approx 5{,}6\times10^{-3} \times 65{,}4 \approx 0{,}37\ \text{g}$$

Remarque quelque chose de frappant : ce sont exactement les mêmes $1080\ \text{C}$, la même quantité de matière d'électrons, et la même masse de zinc - $0{,}37\ \text{g}$ - que dans l'exemple travaillé du rung 6 de la leçon sur les piles. Mais là où cette masse de zinc **disparaissait** progressivement de l'anode (la pile s'usait), ici elle **apparaît** à la cathode (l'électrolyse la dépose). Le calcul ne change pas d'un iota ; c'est le sens physique de la transformation qui s'est inversé - exactement comme le générateur a inversé le sens de la réaction elle-même.

À l'anode, le cuivre se dissout selon la même logique : $n(Cu) = n(e^-)/2 \approx 5{,}6\times10^{-3}\ \text{mol}$, soit une masse dissoute $m(Cu) \approx 5{,}6\times10^{-3} \times 63{,}5 \approx 0{,}36\ \text{g}$.

### Teste l'idée avant de la croire : « la loi de Faraday ne s'applique qu'aux piles »

Puisque $Q = I\,\Delta t = n(e^-)\,F$ a été introduite pour la première fois avec une pile, on pourrait croire qu'elle lui est propre.

Reviens à ce que mesure réellement cette relation : elle relie une charge électrique, un courant, une durée, et une quantité de matière d'électrons - rien dans ces grandeurs ne présuppose que le courant provient d'une réaction spontanée. Que les électrons soient poussés par la chimie (pile) ou par un générateur extérieur (électrolyse), ils portent la même charge élémentaire, et $F$ ne change pas de valeur. La loi de Faraday est une loi de comptage des électrons échangés - elle s'applique à tout courant traversant toute cellule électrochimique, quelle que soit son origine.

---

## R5 — Applications : forcer une réaction utile

L'électrolyse sert précisément à fabriquer, de force, des produits qu'aucune réaction spontanée ne fournirait. Voici trois usages concrets.

### L'électrolyse de l'eau

L'eau pure conduit très mal le courant (peu d'ions mobiles) ; en pratique, on utilise une solution aqueuse légèrement acidifiée, suffisamment conductrice, entre deux électrodes inertes (souvent en platine ou en graphite), reliées à un générateur.

À la cathode (borne −), les ions $H^+$ de la solution sont réduits, ce qui dégage du dihydrogène gazeux :

$$2\,H^+ + 2\,e^- \rightleftharpoons H_2$$

À l'anode (borne +), l'eau est oxydée, ce qui dégage du dioxygène gazeux :

$$2\,H_2O \rightleftharpoons O_2 + 4\,H^+ + 4\,e^-$$

*Ce qu'on cherche ici, et pourquoi ce geste :* pour obtenir le bilan global, on équilibre le nombre d'électrons échangés - la cathode n'en échange que $2$ par molécule de $H_2$ formée, l'anode en échange $4$ par molécule de $O_2$ formée. On double donc la demi-équation de la cathode avant de sommer :

$$4\,H^+ + 4\,e^- \rightleftharpoons 2\,H_2$$

$$2\,H_2O \rightleftharpoons O_2 + 4\,H^+ + 4\,e^-$$

Les $4\,H^+$ et les $4\,e^-$ s'annulent exactement dans la somme, et il reste le bilan global (écrit avec une flèche simple, comme il est d'usage pour une équation bilan) :

$$2\,H_2O \rightarrow 2\,H_2 + O_2$$

L'eau ne se décompose jamais spontanément en dihydrogène et dioxygène gazeux dans les conditions ordinaires - c'est précisément une transformation non spontanée, qu'on force ici grâce au générateur.

### Le dépôt métallique - galvanoplastie

Recouvrir un objet (souvent peu coûteux ou peu résistant à la corrosion) d'une fine couche d'un métal protecteur ou décoratif - argent, or, chrome, nickel, zinc - suit exactement le mécanisme calculé au rung 4. L'objet à recouvrir est branché en **cathode** (borne −) : c'est là que les ions métalliques de la solution sont réduits et viennent se déposer en une fine couche.

Souvent, l'autre électrode est constituée du métal même qu'on veut déposer - une **anode soluble** : elle s'oxyde et se dissout progressivement, ce qui réalimente la solution en ions métalliques à mesure qu'ils se déposent sur l'objet, et permet de maintenir la concentration à peu près constante tout au long du procédé. C'est très exactement ce que fait la lame de cuivre dans l'exemple du rung 4 - elle joue le rôle d'une anode soluble pour la cellule considérée.

### La production industrielle de l'aluminium

L'aluminium métallique ne peut pas être obtenu à partir de son minerai (la bauxite, qui contient de l'oxyde d'aluminium) par une simple réaction chimique spontanée - il faut le forcer par électrolyse. Industriellement, on dissout l'oxyde d'aluminium dans un bain de cryolithe fondue (pour permettre la conduction ionique à une température de fusion plus accessible), puis on électrolyse ce mélange fondu avec des électrodes en carbone : l'aluminium métallique se dépose à la cathode. Ce procédé consomme énormément d'énergie électrique - c'est pourquoi les usines de production d'aluminium s'installent souvent à proximité de grands barrages hydroélectriques.

Dans les trois cas, le même schéma se répète : la cathode produit ce qu'on cherche à obtenir (dihydrogène, dépôt métallique, aluminium), l'anode consomme ou libère ce qui permet au circuit de se refermer (dioxygène, métal dissous) - et dans les trois cas, c'est un générateur extérieur, et lui seul, qui rend cette production possible.

---

## R6 — Pour t'entraîner

### Récapitulatif express

- Une cellule d'électrolyse force une réaction à évoluer dans le sens non spontané - celui que $Q_{r,i}$ face à $K$ interdirait si le système était livré à lui-même -, en imposant un courant grâce à un générateur électrique extérieur relié aux deux électrodes.
- L'anode reste, comme dans une pile, le siège de l'oxydation ; la cathode reste le siège de la réduction. Mais la polarité s'inverse : en électrolyse, l'anode est la borne +, la cathode la borne − - l'exact opposé de la pile -, parce que c'est le générateur qui impose la polarité, et donc le mécanisme, plutôt que l'inverse.
- Il faut que le générateur impose une tension supérieure, en valeur absolue, à la force électromotrice propre de la cellule pour inverser réellement le sens de la réaction ; en dessous de ce seuil, le sens spontané continue de l'emporter, simplement freiné.
- La quantité d'électricité mise en jeu suit la même loi que pour la pile, $Q = I\,\Delta t = n(e^-)\,F$ - sauf qu'elle sert ici à calculer une masse déposée ou transformée, pas une masse consommée par usure.
- L'électrolyse ne produit jamais d'énergie électrique nette : elle en consomme, pour construire des produits qu'aucune réaction spontanée ne fournirait (électrolyse de l'eau, dépôt métallique par galvanoplastie, production industrielle de l'aluminium).

### Exercice de type bac (original - entraînement, non un sujet officiel)

On veut recouvrir d'une fine couche d'argent un couvert de table en métal ordinaire, par galvanoplastie. On plonge le couvert et une lame d'argent massif dans un bain contenant des ions $Ag^+$ (solution de nitrate d'argent), et on relie les deux électrodes à un générateur réglé pour imposer un courant constant $I = 500\ \text{mA}$ pendant $\Delta t = 20\ \text{min}$. On donne $F \approx 9{,}65\times10^{4}\ \text{C/mol}$ et $M(Ag) = 108\ \text{g/mol}$.

**1) Pour que l'argent se dépose sur le couvert, celui-ci doit-il être branché à l'anode ou à la cathode du montage ? Précise la polarité (borne + ou −) à laquelle il doit être relié.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on repère d'abord le mécanisme chimique voulu (rung 1), puis on en déduit la polarité correspondante (rung 2).

Le dépôt d'argent métallique sur le couvert correspond à une réduction, $Ag^+ + e^- \rightleftharpoons Ag$ (lu de la gauche vers la droite) : cela doit se produire à la cathode. Dans une cellule d'électrolyse, la cathode est la borne − du générateur (rung 2, polarité inversée par rapport à la pile) : le couvert doit être relié à la borne − du générateur.

**2) Écris la demi-équation électronique se produisant sur la lame d'argent massif (l'autre électrode), en précisant s'il s'agit d'une anode ou d'une cathode, et son rôle dans le bain.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie l'électrode complémentaire, et son rôle d'anode soluble (rung 5).

La lame d'argent massif, reliée à la borne + du générateur, est l'anode - siège de l'oxydation : $Ag \rightleftharpoons Ag^+ + e^-$. Elle se dissout progressivement, réalimentant le bain en ions $Ag^+$ : c'est une anode soluble, exactement le rôle décrit au rung 5.

**3) Calcule la quantité d'électricité $Q$ débitée par le générateur, la quantité de matière d'électrons échangés $n(e^-)$, puis la masse d'argent déposée sur le couvert pendant les 20 minutes.**

*Ce qu'on cherche ici, et pourquoi ce geste :* même démarche qu'au rung 4 - convertir $I$ et $\Delta t$ en charge, la charge en moles d'électrons, puis les électrons en moles d'argent via la stœchiométrie de la demi-équation de la question 1 (un seul électron par atome, ici, contrairement au zinc ou au cuivre), et enfin en masse.

$$\Delta t = 20\times 60 = 1200\ \text{s}$$

$$Q = I\,\Delta t = 0{,}500 \times 1200 = 600\ \text{C}$$

$$n(e^-) = \frac{Q}{F} = \frac{600}{9{,}65\times10^{4}} \approx 6{,}22\times10^{-3}\ \text{mol}$$

Comme $Ag^+ + e^- \rightleftharpoons Ag$ n'échange qu'un seul électron par atome d'argent : $n(Ag) = n(e^-) \approx 6{,}22\times10^{-3}\ \text{mol}$.

$$m(Ag) = n(Ag) \times M(Ag) \approx 6{,}22\times10^{-3} \times 108 \approx 0{,}67\ \text{g}$$

**4) Un camarade se demande si un générateur réglé sur $U = 0{,}8\ \text{V}$ suffirait à réaliser ce dépôt, sachant que la cellule considérée possède, comme toute pile, une force électromotrice propre $E \approx 1{,}2\ \text{V}$ dans le sens opposé à celui recherché. Justifie ta réponse à partir du rung 3.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on compare la tension imposée au seuil fixé par la f.é.m. propre de la cellule (rung 3), pour juger si le sens forcé l'emporte réellement.

Non. Il faudrait une tension imposée supérieure, en valeur absolue, à la force électromotrice propre de la cellule ($1{,}2\ \text{V}$) pour véritablement inverser le sens et provoquer le dépôt. À $0{,}8\ \text{V}$, le générateur ne fait qu'affaiblir partiellement la tendance spontanée de la cellule, sans l'inverser : aucun dépôt net d'argent ne se formerait sur le couvert.

### À toi

**Variation 1.** Une usine veut zinguer (recouvrir de zinc) des pièces d'acier par électrolyse, en utilisant une anode de zinc massif et un bain contenant des ions $Zn^{2+}$. Un générateur impose un courant constant $I = 2{,}0\ \text{A}$ pendant $\Delta t = 45\ \text{min}$. Identifie l'anode et la cathode de ce montage avec leur polarité, écris les deux demi-équations électroniques mises en jeu, puis calcule la masse de zinc déposée sur les pièces d'acier (donnée : $M(Zn) = 65{,}4\ \text{g/mol}$).

**Variation 2.** Un camarade affirme : « Dans une cellule d'électrolyse, comme dans une pile, l'anode est toujours la borne négative, puisque c'est le siège de l'oxydation. » Explique pourquoi ce raisonnement est faux, en t'appuyant sur le mécanisme du rung 2 (ce qui impose la polarité dans chaque cas, et pourquoi cette cause change de sens entre une pile et une électrolyse).
