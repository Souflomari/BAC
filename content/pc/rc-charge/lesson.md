# Dipôle RC — réponse à un échelon de tension

---

## R1 — Le mécanisme : pourquoi la charge ralentit en se remplissant

Avant les équations, comprendre le mécanisme. Un condensateur qui se charge n'est pas un réservoir qu'on remplit à débit constant — et voir *pourquoi* rend toute la suite évidente.

On ferme un interrupteur K à l'instant $t=0$ sur un circuit série : un générateur idéal qui impose une tension constante $E$, une résistance $R$, un condensateur $C$ initialement déchargé. Avant $t=0$, rien ne circule. À $t=0$, la tension $E$ est appliquée brutalement au dipôle RC — c'est ce qu'on appelle un échelon de tension.

<!-- SLOT D'AMÉLIORATION (jamais bloquant — audit C5) : schéma du circuit RC
     (générateur E, interrupteur K, résistance R, condensateur C, en convention
     récepteur) à insérer ici quand l'asset SVG existera. Le raisonnement qui
     suit se comprend sur la seule description textuelle ; le marqueur
     ci-dessous est ignoré silencieusement tant que l'asset manque. -->

[[figure:rc-schema]]

On rappelle deux relations de ce chapitre : le courant est le débit de charge, $i = \dfrac{dq}{dt}$ ; et la charge posée sur les armatures fixe la tension du condensateur, $q = Cu_C$, c'est-à-dire $u_C = \dfrac{q}{C}$.

### Une prédiction naturelle — et pourquoi elle échoue

Avant de regarder ce qui se passe réellement, demande-toi : à quoi ressemble la charge d'un condensateur ? L'intuition la plus courante calque le condensateur sur un verre qu'on remplit au robinet : un débit constant, une tension $u_C$ qui monte en ligne droite, jusqu'à ce que le condensateur soit « plein » — $u_C = E$ — en un temps fini, et que ça s'arrête net.

Teste ce modèle avant de le croire. S'il était vrai, le courant $i$ resterait constant — égal à sa valeur de départ, non nulle, sinon rien ne se serait chargé du tout — pendant toute la durée de la charge, jusqu'à l'instant où $u_C$ atteindrait $E$. Regarde ce qui se passe à cet instant précis, en appliquant ce qui est toujours vrai dans ce circuit, que la charge soit rapide ou lente : la loi des mailles impose $u_R = E - u_C$, et la loi d'Ohm impose $i = \dfrac{u_R}{R}$. Au moment où $u_C = E$, ces deux lois donnent $u_R = 0$, donc $i = 0$. Le courant serait donc à la fois resté constant à sa valeur de départ non nulle et tombé à zéro au même instant — deux choses contradictoires. Le modèle « débit constant » se contredit lui-même : il ne peut pas être vrai.

### Le mécanisme : une boucle qui se referme sur elle-même

Voici pourquoi ce modèle échoue, et ce qui se passe réellement. Le générateur impose une tension totale fixe $E$, partagée à chaque instant entre la résistance et le condensateur — la loi des mailles, en convention récepteur pour $R$ et $C$ :

$$E = u_R + u_C$$

Isolée, cette relation dit $u_R = E - u_C$. Et $u_R$ fixe directement le courant par la loi d'Ohm, $u_R = Ri$, donc :

$$i = \frac{u_R}{R} = \frac{E - u_C}{R}$$

Voilà le mécanisme entier tenu dans une seule expression. Au tout début ($t=0$), le condensateur est vide, $u_C = 0$ : la totalité de $E$ tombe sur la résistance, et le courant est maximal, $i_0 = \dfrac{E}{R}$. Mais ce courant fait précisément ce que $i = \dfrac{dq}{dt}$ dit qu'il fait : il dépose de la charge sur les armatures, donc $u_C$ monte. Et dès que $u_C$ monte, il reste moins de tension disponible pour $u_R$ — donc, par $i = \dfrac{E-u_C}{R}$, le courant baisse. Moins de courant, c'est moins de charge déposée par seconde, donc $u_C$ monte plus lentement — ce qui, à son tour, laisse $u_R$ baisser plus lentement, et ainsi de suite. La charge freine son propre remplissage. Ce n'est pas un débit imposé de l'extérieur : c'est une boucle qui se referme sur elle-même, un effet qui limite sa propre cause à chaque instant.

Image concrète : un réservoir source qui reste à un niveau fixe $E$ (une réserve immense — c'est le générateur), relié par un tuyau étroit (la résistance $R$) à un réservoir vide (le condensateur $C$). Le tuyau étroit ne laisse passer qu'un débit proportionnel à la différence de hauteur entre les deux réservoirs. Au départ, le réservoir $C$ est vide : la différence de hauteur est maximale, le débit aussi. À mesure que $C$ se remplit, son niveau se rapproche de celui de la source, la différence de hauteur se réduit, et le débit ralentit — sans jamais s'arrêter net, et sans jamais dépasser le niveau de la source, puisqu'il n'y aurait alors plus rien pour pousser l'eau. C'est exactement la logique de $i = \dfrac{E-u_C}{R}$ : le courant, c'est le débit ; $E - u_C$, c'est la différence de hauteur qui reste.

### Traduire ça en équation différentielle

Maintenant qu'on tient le mécanisme, on le traduit en langage mathématique — une équation qui gouverne $u_C(t)$ à chaque instant, pas seulement au début et à la fin.

On repart de la loi des mailles, $E = u_R + u_C$. On remplace $u_R$ par $Ri$ — le réflexe : on exprime chaque tension avec la grandeur qui caractérise son dipôle, ici la loi d'Ohm pour la résistance :

$$E = Ri + u_C$$

Il reste $i$ à exprimer en fonction de $u_C$ seul — sans ça, l'équation mélange deux inconnues, $i$ et $u_C$, et ne se résout jamais. On utilise les deux relations rappelées plus haut, $i = \dfrac{dq}{dt}$ et $q = Cu_C$, ce qui donne $i = C\dfrac{du_C}{dt}$ :

$$E = RC\frac{du_C}{dt} + u_C$$

On réordonne pour faire apparaître la forme standard d'une équation différentielle, terme en $u_C$ à gauche :

$$\boxed{RC\frac{du_C}{dt} + u_C = E}$$

C'est l'équation différentielle du dipôle RC soumis à un échelon de tension $E$. Elle ne dit rien de plus que le mécanisme construit plus haut — elle le dit juste précisément, à chaque instant : divise toute l'équation par $RC$, et tu retrouves exactement $\dfrac{du_C}{dt} = \dfrac{E-u_C}{RC}$, la même idée qu'avant, avec $u_C$ à la place de $i$ — la vitesse à laquelle $u_C$ monte est proportionnelle à ce qu'il reste de tension disponible.

### L'intuition de $\tau = RC$ — un temps caractéristique, pas encore une formule résolue

Le groupement $RC$ qui multiplie $\dfrac{du_C}{dt}$ n'est pas arbitraire — il porte un nom, la constante de temps, notée $\tau = RC$. Avant de résoudre quoi que ce soit, on peut déjà sentir ce qu'elle représente.

D'abord, une vérification d'unité : $R$ se mesure en ohms ($\Omega = V/A$), $C$ en farads ($F = A\cdot s/V$). Leur produit, unité par unité :

$$\Omega \times F = \frac{V}{A} \times \frac{A\cdot s}{V} = s$$

$RC$ a donc la dimension d'un temps — ce n'est pas un hasard, c'est la confirmation que $\tau$ mesure bien une durée : le temps caractéristique sur lequel la charge se déroule.

Ensuite, le sens physique de chaque facteur, à partir du mécanisme qu'on vient de voir :

- Une **résistance $R$ plus grande** limite davantage le courant pour une même tension disponible ($i = \frac{E-u_C}{R}$ — même numérateur, dénominateur plus grand) : moins de charge déposée par seconde, donc une charge plus lente. $R$ plus grand → $\tau$ plus grand.
- Une **capacité $C$ plus grande** a besoin de plus de charge ($q = Cu_C$) pour atteindre la même tension $u_C$ : à débit égal, il faut plus de temps pour l'atteindre. $C$ plus grand → $\tau$ plus grand.

$\tau = RC$ est donc le temps caractéristique de ce ralentissement progressif — pas un instant précis où « la charge s'arrête » (elle ne s'arrête jamais complètement, on vient de le voir), mais l'échelle de temps sur laquelle le rapprochement vers $E$ se joue. Ce que $\tau$ vaut *exactement* — par exemple, combien de $\tau$ il faut pour que $u_C$ atteigne la moitié de $E$, ou les deux tiers — demande de résoudre l'équation différentielle qu'on vient d'établir. C'est la suite logique de cette leçon.
