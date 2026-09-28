# Transformations dans les deux sens

---

## R0 — Accroche : une odeur qui ne va jamais jusqu'au bout

Au labo, tu verses de l'acide éthanoïque (celui du vinaigre) et de l'éthanol dans un ballon, tu ajoutes quelques gouttes d'acide sulfurique comme catalyseur, et tu chauffes doucement à reflux pendant plusieurs heures. Peu à peu, une odeur fruitée caractéristique se dégage - celle de l'éthanoate d'éthyle, l'ester qui se forme :

$$CH_3COOH + C_2H_5OH \rightarrow CH_3COOC_2H_5 + H_2O$$

(pour l'instant, une flèche simple - on va y revenir dans un instant)

Avant de lire la suite, prends position : si tu laisses ce mélange chauffer encore plus longtemps - toute une journée, une semaine - est-ce que tout l'acide éthanoïque et tout l'éthanol finiront, à un moment ou un autre, par se transformer entièrement en ester et en eau ? Engage-toi sur une réponse avant de continuer.

[[checkpoint:cp-r0-predict]]

Voici ce que montre un test chimique, effectué sur ce même mélange après plusieurs heures, une fois que l'odeur ne semble plus évoluer : en cherchant précisément la présence d'acide éthanoïque et d'éthanol dans le ballon, on en détecte encore - en quantité loin d'être négligeable. Et si tu laisses chauffer encore plus longtemps, rien ne change : la même quantité d'acide et d'alcool reste là, indéfiniment.

Si tu avais prédit une conversion totale, cet écart - une portion d'acide et d'alcool qui ne disparaît jamais, quel que soit le temps qu'on attend - est justement ce qu'on va comprendre. Si tu avais deviné qu'il resterait toujours un peu d'acide et d'alcool, la vraie question commence maintenant : comment écrire une équation qui dise honnêtement ça ? Comment savoir, à l'avance, si une réaction ira jusqu'au bout ou non ? Et est-ce que le sens dans lequel une réaction évolue peut lui-même changer, selon ce qu'on met dans le ballon au départ ?

Ce système précis - l'estérification, et sa réaction inverse, l'hydrolyse - fera l'objet d'un chapitre à part entière plus loin dans le programme, où tu apprendras à le traiter avec précision. Ici, on se concentre sur l'essentiel qualitatif : comprendre pourquoi certaines réactions ne vont jamais jusqu'au bout, comment l'écrire, et comment prévoir - sans calcul - dans quel sens ça penche.

---

## R1 — Le mécanisme : une réaction et son inverse peuvent coexister

### Pourquoi l'acide et l'alcool ne disparaissent jamais complètement

Reprends le mélange de l'accroche, à l'instant où l'odeur ne change plus. Dans ce ballon, à cet instant, quatre espèces coexistent, physiquement mélangées, en contact permanent : l'acide éthanoïque et l'éthanol qui restent, et l'ester et l'eau qui se sont formés. Rien, dans cette situation, ne distingue ces quatre espèces d'un mélange ordinaire de produits chimiques capables de réagir entre eux.

Et c'est précisément le problème : si l'acide et l'alcool ont pu réagir ensemble pour donner l'ester et l'eau, pourquoi l'ester et l'eau ne pourraient-ils pas, à leur tour, réagir ensemble pour redonner l'acide et l'alcool ? Rien ne l'empêche chimiquement - ce sont des molécules comme les autres, capables de se rencontrer et de réagir. Cette réaction inverse - l'hydrolyse de l'ester - se produit réellement, en même temps que l'estérification, dans le même ballon.

Voilà pourquoi l'acide et l'alcool ne disparaissent jamais totalement : au fur et à mesure que l'estérification en consomme, l'hydrolyse en régénère. Les deux réactions - directe (l'estérification) et inverse (l'hydrolyse) - coexistent en permanence dans le même mélange.

### La double flèche : écrire cette coexistence

Une flèche simple $\rightarrow$ affirme que la réaction ne va que dans un sens : des réactifs vers des produits, un point c'est tout. C'est un engagement fort - il dit qu'à la fin, au moins un réactif aura complètement disparu.

Quand ce n'est pas le cas - quand on sait que la réaction inverse se produit aussi, et que réactifs et produits coexistent durablement - on écrit l'équation avec la double flèche $\rightleftharpoons$ :

$$CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$$

Cette double flèche est un symbole honnête : elle dit « cette transformation se produit dans les deux sens, et aucun des deux ne l'emporte jusqu'à faire disparaître l'autre ». Ce n'est pas une notation cosmétique - c'est une information chimique précise sur ce que fait réellement le système.

[[figure:sens-direct-inverse]]

### Contre-exemple : une transformation qui, elle, va jusqu'au bout

Pour bien voir la différence, regarde une réaction qui se comporte autrement. On verse une solution contenant des ions $Ag^+$, en excès, dans une solution contenant une petite quantité d'ions $Cl^-$. Un précipité blanc de chlorure d'argent apparaît aussitôt :

$$Ag^+ + Cl^- \rightarrow AgCl$$

Le chlorure d'argent formé est un solide très peu soluble : une fois précipité, il se dépose au fond du récipient, à l'écart des ions restés en solution. La réaction inverse - le solide $AgCl$ qui se redissoudrait spontanément pour redonner des ions $Ag^+$ et $Cl^-$ - est ici négligeable. Rien ne vient reformer les réactifs de départ. Les ions $Cl^-$, apportés en quantité limitée, finissent par disparaître complètement de la solution : c'est le réactif limitant, et il s'épuise pour de bon. Cette transformation-là mérite bien sa flèche simple $\rightarrow$.

### Teste l'idée avant de la croire : « la double flèche, c'est pour les réactions lentes »

Une confusion facile à faire, en voyant $\rightleftharpoons$ pour la première fois à côté de $\rightarrow$ : penser que la différence entre les deux, c'est une question de vitesse - la double flèche pour ce qui est lent, la flèche simple pour ce qui est rapide, comme si on retrouvait la distinction du chapitre précédent.

Ce n'est pas ça du tout. La double flèche ne dit strictement rien sur la vitesse - elle dit uniquement si la transformation va jusqu'au bout ou non. Ce sont deux questions complètement indépendantes. Une réaction peut être rapide ET non totale : de nombreuses réactions acido-basiques s'installent en une fraction de seconde, tout en laissant coexister durablement réactifs et produits. Et une réaction peut être lente ET totale : la rouille d'un clou en fer prend des mois, mais si tu attends assez longtemps et que les conditions le permettent, le fer métallique disponible finit par disparaître complètement.

« Rapide ou lente » (le chapitre précédent) et « totale ou limitée » (celui-ci) sont deux axes séparés pour décrire une réaction. Ne les confonds pas.

[[checkpoint:cp-r1-deux-sens]]

---

## R2 — Transformation totale ou limitée : le test qui tranche

### Le critère

Comment savoir, concrètement, si une transformation est totale ou limitée ? Le test est simple à énoncer : une fois que plus rien ne semble changer (couleur, odeur, ou toute autre grandeur observable stabilisée), cherche si tu peux encore détecter, dans le mélange, une quantité non nulle de CHAQUE réactif de départ.

- Si tu détectes encore une quantité non nulle de chaque réactif initial, aussi petite soit-elle, aussi longtemps que tu attendes : la transformation est **limitée** (non totale). Aucun réactif n'a totalement disparu. On écrit l'équation avec $\rightleftharpoons$.
- Si au moins un réactif initial est devenu indétectable - il a réellement disparu, plus aucun test ne le révèle : la transformation est **totale**. Ce réactif est le réactif limitant. On écrit l'équation avec $\rightarrow$.

### Exemple travaillé : appliquer le test aux deux mélanges déjà rencontrés

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut vérifier, avec un test concret et non avec une impression, laquelle des deux réactions du chapitre précédent est totale et laquelle est limitée.

**Le mélange acide éthanoïque + éthanol.** Une fois que l'odeur ne change plus, on peut tester la présence d'acide restant (par exemple avec un indicateur coloré, ou en dosant précisément la quantité d'acide encore présente) : le test révèle systématiquement une quantité détectable d'acide éthanoïque, et une quantité détectable d'éthanol - même après un temps très long. Les deux réactifs coexistent avec les deux produits. Conclusion : cette transformation est **limitée**.

**Le mélange $Ag^+$ + $Cl^-$.** Une fois le précipité formé et la solution filtrée, on ajoute quelques gouttes supplémentaires d'une solution contenant des ions $Ag^+$ à ce qui reste de la solution : si un nouveau précipité, même minime, apparaît, c'est qu'il restait du $Cl^-$ non consommé. Ici, en prenant $Cl^-$ comme réactif limitant introduit en faible quantité face à un excès de $Ag^+$, ce test supplémentaire ne fait apparaître aucun nouveau précipité : plus aucun ion $Cl^-$ n'est détectable. Conclusion : cette transformation est **totale**.

### Teste l'idée avant de la croire : « limitée, ça veut dire que rien ne s'est passé »

Une deuxième confusion, tout aussi naturelle : en entendant « transformation limitée », on peut imaginer que rien - ou presque rien - ne s'est réellement produit, puisque les réactifs sont encore là.

Regarde à nouveau le mélange acide + alcool : une quantité tout à fait notable d'ester et d'eau S'EST FORMÉE - assez pour dégager une odeur fruitée franche, assez pour la mesurer précisément au laboratoire. La transformation a bel et bien eu lieu, et elle a produit quelque chose de réel. « Limitée » ne veut absolument pas dire « rien ne s'est passé » - ça veut dire seulement que la transformation s'est arrêtée avant que l'un des réactifs de départ ait totalement disparu. Les deux réactions, directe et inverse, ont bien fonctionné - simplement, aucune des deux n'a eu le dernier mot.

[[checkpoint:cp-r2-tau]]

---

## R3 — Le sens d'évolution dépend de ce qu'on a mis au départ

### Deux expériences miroir

Pour une transformation non totale, les deux sens - direct et inverse - sont toujours chimiquement possibles en même temps, comme tu l'as vu au chapitre 2. Mais lequel des deux domine, à un instant donné, dans un mélange donné ? Ça dépend de ce qu'on a mis dans le ballon au départ - pas d'une propriété fixe de la réaction elle-même.

*Ce qu'on cherche ici, et pourquoi ce geste :* on va comparer deux expériences sur exactement la même réaction, en ne changeant qu'une chose - la composition du mélange au tout début - pour voir si le sens observé change avec elle.

**Expérience A.** On part, comme dans l'accroche, d'acide éthanoïque et d'éthanol purs, sans une seule trace d'ester ni d'eau ajoutée au départ. Ce qu'on observe : l'odeur fruitée de l'ester apparaît et grandit au fil du temps. Le sens **direct** (l'estérification) domine, jusqu'à ce que le mélange se stabilise.

**Expérience B.** Cette fois, on part de l'inverse : de l'éthanoate d'éthyle pur, mélangé à de l'eau, sans une seule trace d'acide éthanoïque ni d'éthanol au départ. Ce qu'on observe : une odeur âcre d'acide apparaît et grandit au fil du temps - l'ester se décompose peu à peu. Le sens **inverse** (l'hydrolyse) domine cette fois, jusqu'à ce que ce mélange, lui aussi, se stabilise.

C'est très exactement la même réaction, gouvernée par la même équation $\rightleftharpoons$ - et pourtant, le sens observé au début est opposé d'une expérience à l'autre. Ce qui a changé, ce n'est pas la réaction : c'est la composition du mélange à l'instant zéro.

[[figure:experiences-miroir]]

### Pourquoi, intuitivement

Imagine deux salles reliées par une porte toujours ouverte dans les deux sens. Si une salle est bondée et l'autre vide, le flux net de personnes va, au début, de la salle bondée vers la salle vide - simplement parce qu'il y a beaucoup plus de monde disponible pour passer dans ce sens-là. Au fur et à mesure que la salle vide se remplit, le flux inverse devient lui aussi de plus en plus important, jusqu'à ce qu'un équilibre s'installe entre les deux flux.

C'est la même idée ici : un mélange qui démarre chargé en acide et alcool, et vide en ester et eau, voit d'abord le sens direct l'emporter, pour la même raison de disponibilité. Un mélange qui démarre chargé en ester et eau, et vide en acide et alcool, voit d'abord le sens inverse l'emporter. Cette idée reste ici qualitative - le chapitre suivant te donnera un nombre précis pour la rendre parfaitement calculable, dans n'importe quelle situation, même les moins intuitives.

### Un deuxième exemple : une réaction acido-basique, elle aussi à double sens

Ce phénomène n'est pas propre à l'estérification. Dissous de l'ammoniac gazeux $NH_3$ dans de l'eau pure - aucune trace de $NH_4^+$ ni de $HO^-$ au départ. La réaction :

$$NH_3 + H_2O \rightleftharpoons NH_4^+ + HO^-$$

évolue nettement dans le sens direct : des ions $NH_4^+$ et $HO^-$ apparaissent. Mais elle ne va pas jusqu'au bout - une quantité importante de $NH_3$ intact subsiste indéfiniment aux côtés de ces ions, exactement comme l'acide et l'alcool subsistaient aux côtés de l'ester. Si, à l'inverse, on partait d'une solution déjà riche en ions $NH_4^+$ et $HO^-$ et pauvre en $NH_3$ libre, c'est le sens inverse qui dominerait au départ. Tu retrouveras cette réaction, avec des outils bien plus précis, dans le chapitre sur les réactions acido-basiques.

[[checkpoint:cp-r3-sens]]

---

## R4 — Pour t'entraîner

### Récapitulatif express

- Une transformation chimique peut se produire **dans les deux sens** : le sens direct et le sens inverse peuvent coexister dans le même mélange, en même temps.
- On signale ce caractère non total en écrivant l'équation avec la double flèche $\rightleftharpoons$, au lieu d'une flèche simple $\rightarrow$.
- Une transformation est **totale** quand, une fois que plus rien ne change, au moins un réactif de départ est devenu indétectable (le réactif limitant a réellement disparu) - flèche simple $\rightarrow$.
- Une transformation est **limitée (non totale)** quand chaque réactif de départ reste détectable indéfiniment, aux côtés des produits formés - double flèche $\rightleftharpoons$. « Limitée » ne veut pas dire « rien ne s'est passé » : une quantité réelle de produit s'est bel et bien formée.
- La double flèche ne dit rien sur la vitesse de la réaction : rapide/lente et totale/limitée sont deux questions indépendantes.
- Pour une transformation non totale, le sens qui domine au départ dépend de la composition initiale du mélange - pas d'une propriété fixe de la réaction. Ce même critère sera rendu précis, par le calcul, dans la leçon suivante.
- Enfin, « pouvoir se produire dans les deux sens » ne dit pas encore *jusqu'où* : une transformation réversible peut être nettement limitée, ou au contraire presque totale (il ne reste alors qu'une trace infime de réactifs). Ce degré se quantifiera dans la leçon suivante - et les réactions qu'on traite comme presque totales, on les écrit alors souvent avec une flèche simple $\rightarrow$, même si en toute rigueur elles restent réversibles.

[[figure:avancement-limite]]

### Exercice de type bac

[[exercise:r-bac]]

[[checkpoint:cp-r4-esterification]]

### Une variation pour ne pas mémoriser

[[exercise:r-variation]]
