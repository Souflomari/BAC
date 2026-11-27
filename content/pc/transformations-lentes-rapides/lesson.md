# Transformations lentes et rapides

---

## R0 — Accroche : le clou qui rouille, l'allumette qui s'enflamme

Prends un clou en fer et laisse-le dehors, exposé à l'air humide. Reviens dans six mois : il a rouillé, une fine couche orangée a rongé sa surface. Reviens dans dix ans : il s'est peut-être effrité entièrement. C'est une transformation chimique bien réelle — le fer métallique a réagi avec le dioxygène de l'air pour donner un autre composé, l'oxyde de fer hydraté qu'on appelle rouille. À l'échelle des électrons, c'est un transfert du fer vers l'oxygène : exactement le genre de réaction que tu sais déjà décrire avec des couples oxydant/réducteur.

Maintenant, gratte une allumette. Le bois et le soufre s'enflamment, réagissent eux aussi avec le dioxygène de l'air, et en une fraction de seconde, c'est fini : il ne reste que cendres et fumée. Encore une transformation chimique, encore un transfert d'électrons vers le dioxygène — la même famille de réaction, au fond, que la rouille du clou.

Avant de lire la suite, prends position, en une phrase : si les deux transformations appartiennent à la même famille chimique (un transfert d'électrons vers le dioxygène), pourquoi l'une prend-elle des mois et l'autre une fraction de seconde ? Est-ce que la « famille » d'une réaction — oxydoréduction, précipitation, réaction acido-basique — fixe à elle seule sa vitesse ? Ou est-ce qu'autre chose, en dehors de cette famille, décide si une transformation sera lente ou rapide ?

[[checkpoint:cp-r0-predict]]

Si tu as répondu que la famille chimique fixe la vitesse, l'écart va se voir vite : dans cette leçon, tu vas rencontrer une seule et même réaction chimique — exactement la même équation — qui se termine en quelques dizaines de secondes dans une expérience et en plusieurs minutes dans une autre, sans changer de nature. C'est cet écart qu'on va comprendre : qu'est-ce qui rend une transformation lente ou rapide, quels leviers on peut actionner pour la ralentir ou l'accélérer, et pourquoi ces leviers fonctionnent, jusqu'à l'échelle des molécules elles-mêmes.

---

## R1 — Le mécanisme : le critère du temps de réaction

### Rapide, lente : par rapport à quoi ?

On dit qu'une transformation chimique est **rapide** quand elle est pratiquement terminée dès qu'on met les réactifs en contact — trop vite pour qu'on puisse suivre son évolution à l'oeil nu ou au chronomètre usuel. La précipitation d'un solide dès qu'on verse deux solutions, une combustion, une réaction acide-base : dans les trois cas, tout se passe, à notre échelle d'observation, comme si le passage de « réactifs » à « produits » était instantané.

On dit qu'une transformation est **lente** quand son évolution s'étale sur une durée qu'on peut effectivement observer et mesurer avec ces mêmes moyens usuels — de quelques secondes à plusieurs mois, voire plusieurs années. La rouille du clou de l'accroche en est un exemple. En voici un autre, qu'on va utiliser tout au long de cette leçon : la réaction entre les ions peroxodisulfate $S_2O_8^{2-}$ et les ions iodure $I^-$, qui, à température ambiante et à faible concentration, met plusieurs dizaines de minutes à se terminer — largement de quoi la suivre au chronomètre.

[[figure:lente-rapide]]

### Pourquoi ce critère est pratique, et non une propriété figée de la réaction

Remarque bien ceci : la frontière « rapide / lente » ne décrit pas une propriété physique absolue, gravée dans la nature de la réaction — elle décrit le rapport entre la durée de la transformation et nos moyens usuels d'observation. Une réaction qui paraît instantanée à l'oeil nu peut, avec un instrument de mesure plus rapide, se révéler s'étaler sur quelques millisecondes parfaitement mesurables. Ce critère sert surtout à une décision pratique : comment étudier la transformation ? Une transformation rapide ne se laisse observer qu'APRÈS coup — on ne voit que l'état final, tout est déjà joué. Une transformation lente, elle, peut être SUIVIE pendant qu'elle se déroule : on peut prélever, mesurer, tracer son évolution minute par minute — ce sera précisément l'objet de la notion « Suivi temporel d'une transformation — vitesse de réaction ».

### Quelques repères

| Transformation | Durée caractéristique | Rapide ou lente |
|---|---|---|
| Précipitation (mélange de deux solutions) | quasi instantanée | rapide |
| Combustion (allumette, gaz de ville) | quasi instantanée | rapide |
| Réaction acide-base (neutralisation) | quasi instantanée | rapide |
| Rouille d'un clou en fer, à l'air libre | plusieurs mois à années | lente |
| $S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$, à froid et diluée | plusieurs dizaines de minutes | lente |
| Fermentation du raisin en vin | plusieurs semaines | lente |

*Ce qu'on cherche ici, et pourquoi ce geste :* pour classer une transformation, on compare sa durée réelle à ce qu'un chronomètre ou un oeil humain peuvent distinguer — pas à une impression vague de « ça va vite » ou « ça prend du temps ». Une transformation qui s'étale sur plusieurs dizaines de minutes, comme celle entre $S_2O_8^{2-}$ et $I^-$ à froid, est largement mesurable par ces moyens usuels : elle est donc **lente**, même si à l'échelle d'une vie humaine, quelques dizaines de minutes paraissent courtes.

Mais cette même réaction — on va le voir — ne reste pas toujours aussi lente : selon les conditions dans lesquelles on la réalise, sa durée peut considérablement changer, sans qu'elle change de nature. C'est tout l'enjeu des chapitres qui suivent.

---

## R2 — Rappel : couples oxydant/réducteur, et l'équation qui va nous servir de fil rouge

### Rappel : écrire une demi-équation d'oxydoréduction

Un couple oxydant/réducteur (Ox/Red) relie deux espèces chimiques échangeables par transfert d'électrons ; on écrit cette relation sous la forme d'une demi-équation, avec le symbole $\rightleftharpoons$ — parce qu'un couple représente, dans l'absolu, un équilibre entre les deux formes :

$$\text{Ox} + n\,e^- \rightleftharpoons \text{Red}$$

Écrire une demi-équation, c'est appliquer deux conservations, dans cet ordre : d'abord conserver les éléments chimiques (ajuster les nombres stoechiométriques), puis conserver la charge électrique en ajoutant le nombre d'électrons $n$ qu'il faut pour équilibrer les deux membres.

Prenons les deux couples qui vont nous servir de fil rouge pour toute la suite de cette leçon.

**Couple $S_2O_8^{2-}/SO_4^{2-}$** (l'ion peroxodisulfate et l'ion sulfate) :

$$S_2O_8^{2-} + 2e^- \rightleftharpoons 2SO_4^{2-}$$

Vérifie la conservation de la charge : à gauche, $-2$ (de l'ion) $+\ -2$ (des deux électrons) $= -4$ ; à droite, $2 \times (-2) = -4$. Les deux membres portent la même charge : la demi-équation est équilibrée.

**Couple $I_2/I^-$** (le diiode et l'ion iodure) :

$$I_2 + 2e^- \rightleftharpoons 2I^-$$

Même vérification : à gauche, $0 + (-2) = -2$ ; à droite, $2 \times (-1) = -2$. Équilibrée aussi.

### Pourquoi on peut combiner ces deux demi-équations en une seule équation

Un principe simple gouverne toute réaction d'oxydoréduction : il n'existe pas d'électron libre en solution. Tout électron cédé par un réducteur doit être immédiatement capté par un oxydant. Pour obtenir l'équation globale d'une réaction entre deux couples, on doit donc faire en sorte que le nombre d'électrons échangés soit identique dans les deux demi-équations, puis les additionner membre à membre — les électrons s'annulent alors exactement.

*Ce qu'on cherche ici, et pourquoi ce geste :* avant d'additionner, il faut identifier qui cède des électrons (le réducteur, qui s'oxyde) et qui en capte (l'oxydant, qui se réduit). Ici, l'ion iodure $I^-$ est le réducteur : il cède des électrons, donc on utilise sa demi-équation dans le sens inverse de son écriture habituelle. L'ion peroxodisulfate $S_2O_8^{2-}$ est l'oxydant : il capte des électrons, donc on garde sa demi-équation dans le sens direct. Les deux couples échangent chacun 2 électrons — un heureux hasard qui évite d'avoir à multiplier l'une des deux demi-équations avant de les combiner.

$$S_2O_8^{2-} + 2e^- \rightarrow 2SO_4^{2-} \qquad \text{(réduction, sens direct)}$$

$$2I^- \rightarrow I_2 + 2e^- \qquad \text{(oxydation, sens inverse)}$$

En additionnant, les $2e^-$ des deux membres s'annulent exactement :

$$S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$$

Voilà l'équation qui va nous servir de fil rouge dans le reste de la leçon. Elle décrit une transformation lente, à température ambiante et aux concentrations usuelles de laboratoire — et elle a un avantage pratique : le diiode $I_2$ formé donne une teinte jaune-brune bien visible en solution, ce qui permet de suivre son apparition sans matériel sophistiqué.

---

## R3 — Les facteurs cinétiques : concentration et température

### Une expérience, deux béchers, une seule variable qui change

Reprenons la réaction établie au chapitre 3 : $S_2O_8^{2-} + 2I^- \rightarrow 2SO_4^{2-} + I_2$. Mets-toi à la place d'un chimiste au laboratoire, qui veut savoir ce qui contrôle la durée de cette transformation.

**Expérience A.** Il mélange des solutions de peroxodisulfate et d'iodure à température ambiante, avec des concentrations initiales usuelles. Il chronomètre l'apparition de la teinte jaune-brune : elle devient nettement visible après plusieurs dizaines de minutes.

**Expérience B.** Même température, mêmes réactifs, mais il double la concentration initiale en ions iodure (tout le reste identique). La teinte jaune-brune apparaît cette fois beaucoup plus tôt.

*Ce qu'on cherche ici, et pourquoi ce geste :* entre A et B, un seul paramètre a changé — la concentration d'un réactif — donc tout écart observé dans la durée de la transformation lui est directement imputable. C'est exactement la logique d'une mise en évidence expérimentale : ne faire varier qu'une chose à la fois.

Conclusion tirée de cette comparaison, un fait établi expérimentalement : **plus les concentrations initiales des réactifs sont élevées, plus la transformation se termine rapidement.**

**Expérience C.** Il reprend les concentrations de l'expérience A (inchangées), mais chauffe le mélange à environ $50\,^\circ\text{C}$ au lieu de le laisser à température ambiante. La teinte jaune-brune apparaît là aussi beaucoup plus tôt qu'en A.

Même logique de comparaison, même conclusion établie expérimentalement pour ce second levier : **plus la température est élevée, plus la transformation se termine rapidement.**

[[figure:comparaison-facteurs-cinetiques]]

Ces deux faits ne sont pas de simples curiosités de laboratoire : ils expliquent des choix très concrets. On chauffe un mélange réactionnel pour accélérer une synthèse en chimie industrielle. On met les aliments au réfrigérateur — donc au froid — précisément pour ralentir les transformations chimiques qui les dégradent.

Pourquoi ces deux leviers, concentration et température, fonctionnent-ils ? Établir le fait expérimental est une chose ; comprendre le mécanisme en est une autre. Il faut descendre à l'échelle des molécules elles-mêmes pour répondre — c'est l'objet du chapitre suivant.

[[checkpoint:cp-r3-lente-rapide]]

---

## R4 — Interprétation microscopique : les chocs efficaces

### Le modèle : des entités en mouvement, des rencontres, et une condition

À l'échelle microscopique, une réaction chimique se produit par rencontres — des chocs — entre les entités réactives (ions, molécules) qui se déplacent sans cesse dans la solution, animées par l'agitation thermique. Mais un choc ne provoque pas systématiquement une réaction : seul un **choc efficace** fait avancer la transformation, et un choc n'est efficace que s'il réunit deux conditions à la fois :

- une **orientation favorable** des entités l'une par rapport à l'autre au moment du choc ;
- une **énergie suffisante** lors de la rencontre, pour rompre et former les liaisons nécessaires au réarrangement chimique.

Un choc « mou », ou mal orienté, ne mène à rien : les entités se croisent sans réagir. Plus il y a de chocs efficaces par unité de temps, plus la transformation avance vite.

[[figure:chocs-efficaces]]

### Teste l'idée naïve avant de la croire : « tout choc suffit »

Avant d'aller plus loin, imagine une hypothèse plus simple que celle qu'on vient de poser : et si tout choc entre une entité $I^-$ et une entité $S_2O_8^{2-}$ déclenchait systématiquement la réaction, sans aucune condition d'orientation ni d'énergie ?

Si c'était le cas, seule la fréquence des rencontres compterait pour la vitesse de la transformation — donc uniquement la concentration, puisque augmenter la concentration, c'est augmenter le nombre d'entités par unité de volume, donc la fréquence à laquelle elles se croisent. Or on vient d'observer, au chapitre 4, que la température accélère elle aussi très nettement la réaction — alors qu'elle change assez peu le nombre total de rencontres par seconde (les entités bougent plus vite, mais restent en moyenne aussi diluées dans le même volume). Un effet aussi marqué que celui de la température ne peut donc pas s'expliquer par la seule fréquence des chocs.

L'hypothèse « tout choc suffit » est donc incompatible avec ce qu'on observe : quelque chose d'autre que la simple rencontre doit compter. C'est précisément l'énergie du choc — la deuxième condition posée plus haut.

### Pourquoi augmenter la concentration augmente le nombre de chocs efficaces

Augmenter la concentration d'un réactif, c'est augmenter le nombre de ses entités par unité de volume, sans changer leur agitation individuelle. Plus il y a d'entités dans le même volume, plus elles se croisent souvent par unité de temps — donc plus de chocs au total, et parmi eux, une fraction reste efficace. Plus de chocs efficaces par seconde : la transformation avance plus vite. C'est le mécanisme derrière le fait établi au chapitre 4.

### Pourquoi augmenter la température augmente le nombre de chocs efficaces

Augmenter la température, c'est augmenter l'agitation thermique des entités — leur vitesse moyenne de déplacement croît. Deux effets se cumulent alors :

- les entités se croisent plus souvent, puisqu'elles se déplacent plus vite (plus de chocs par seconde, comme pour la concentration) ;
- une plus grande proportion de ces chocs atteint désormais l'énergie nécessaire pour être efficace, puisque les entités arrivent à la rencontre avec plus d'énergie cinétique.

Ces deux effets s'additionnent, ce qui explique pourquoi l'effet de la température est souvent particulièrement marqué : une élévation même modeste de température peut accélérer nettement une transformation, alors qu'elle ne change presque rien à la concentration des espèces en présence.

Dans la notion « Suivi temporel d'une transformation — vitesse de réaction », tu apprendras à SUIVRE une transformation comme celle-ci minute par minute — à mesurer une grandeur physique liée à son avancement pour construire une courbe, et en tirer une vitesse de réaction chiffrée. Ici, il suffisait de comprendre *pourquoi* cette vitesse change ; la mesurer précisément attendra.

---

## R5 — Pour t'entraîner

### Récapitulatif express

- Une transformation est **rapide** si elle est achevée trop vite pour être suivie par nos moyens usuels d'observation ; elle est **lente** si son évolution est mesurable sur des secondes, minutes, ou plus. Ce critère est pratique, pas une propriété figée de la réaction.
- Rappel : une demi-équation d'oxydoréduction s'écrit $\text{Ox} + n\,e^- \rightleftharpoons \text{Red}$ ; on combine deux couples en égalant leurs électrons échangés puis en additionnant.
- Facteurs cinétiques établis expérimentalement : augmenter la **concentration** des réactifs ou la **température** accélère une transformation.
- Interprétation microscopique : seuls les **chocs efficaces** (orientation favorable + énergie suffisante) font avancer la réaction. La concentration augmente leur fréquence ; la température augmente à la fois leur fréquence et la proportion de chocs suffisamment énergétiques.

### Exercice de type bac

La réaction fil rouge (peroxodisulfate + iodure) est **lente**, donc *suivable* : puisqu'elle s'étale sur une durée mesurable, on peut relever une grandeur physique à intervalles réguliers et tracer son évolution — ce qu'une transformation rapide, déjà terminée, ne permettrait pas. L'exercice ci-dessous, tiré d'un examen national, met exactement cela en œuvre sur une autre transformation lente : une saponification suivie par conductimétrie.

[[exercise:r-bac]]

Trois points méritent qu'on s'y arrête avant de continuer — ils reviennent dans presque tous les suivis de transformation lente.

[[checkpoint:cp-r5-conductimetrie]]

[[checkpoint:cp-r5-t-demi]]

[[checkpoint:cp-r5-vitesse-pente]]

### Une variation pour ne pas mémoriser

Même démarche profonde, habillage inversé : cette fois la conductivité *augmente* au lieu de décroître. À toi de reconnaître la procédure et d'expliquer pourquoi le sens de variation s'inverse — tu ne pourras pas recopier la solution du sujet précédent.

[[exercise:r-variation]]
