# Dipôle RC — réponse à un échelon de tension

---

## R0 — Accroche : la tension qui grimpe au lieu de sauter

Imagine le montage le plus simple du monde. Un générateur qui délivre une tension constante $E$, un interrupteur, et — branchés à sa suite — une résistance et un condensateur vide. Rien ne circule tant que l'interrupteur est ouvert : le condensateur est déchargé, la tension à ses bornes vaut zéro.

Maintenant tu fermes l'interrupteur.

Avant de lire la suite, engage-toi vraiment, en une phrase : à ton avis, la tension $u_C$ aux bornes du condensateur saute-t-elle **instantanément** à $E$ — le condensateur se remplit d'un coup, comme un interrupteur qu'on bascule — ou bien se passe-t-il quelque chose de plus lent ? Prends position avant de continuer.

Voici ce qu'on observe réellement, si on branche un oscilloscope sur le condensateur : $u_C$ **ne saute pas**. Elle part de zéro et grimpe progressivement vers $E$ — vite au début, puis de plus en plus lentement, sur une durée qui se mesure en millisecondes. Le condensateur ne se remplit pas d'un coup ; il se charge sur un temps caractéristique bien réel.

Si tu avais parié sur un saut instantané, ta prédiction et la réalité se contredisent — et c'est exactement cet écart qu'on va comprendre. Si tu avais deviné juste, la vraie question commence maintenant : **pourquoi la tension grimpe-t-elle progressivement au lieu de sauter, et qu'est-ce qui fixe la durée de cette montée ?**

C'est tout l'objet de cette leçon : comprendre le mécanisme de la charge, établir l'équation qui la gouverne, en poser et vérifier la solution, et lire dessus le temps caractéristique du phénomène.

---

## R1 — Le mécanisme : pourquoi la charge ralentit en se remplissant

Avant les équations, comprendre le mécanisme. Un condensateur qui se charge n'est pas un réservoir qu'on remplit à débit constant — et voir *pourquoi* rend toute la suite évidente.

On ferme un interrupteur K à l'instant $t=0$ sur un circuit série : un générateur idéal qui impose une tension constante $E$, une résistance $R$, un condensateur $C$ initialement déchargé. Avant $t=0$, rien ne circule. À $t=0$, la tension $E$ est appliquée brutalement au dipôle RC — c'est ce qu'on appelle un échelon de tension.

Décrivons le montage précisément, puisqu'on va y revenir sans cesse : c'est une boucle en série où se suivent le générateur idéal (f.é.m. constante $E$), l'interrupteur $K$, le conducteur ohmique de résistance $R$, et le condensateur de capacité $C$. On oriente le courant dans le sens qui charge le condensateur, et on compte les deux tensions — $u_R$ aux bornes de la résistance, $u_C$ aux bornes du condensateur — en convention récepteur.

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

---

## R2 — Résoudre l'équation : poser la solution, la vérifier, en déduire $i(t)$

On a établi en R1 l'équation qui gouverne la charge :

$$RC\frac{du_C}{dt} + u_C = E$$

On ne va pas l'intégrer par une machinerie de calcul. On va faire ce que fait un physicien devant une équation de ce type : **deviner la forme de la solution à partir du mécanisme, puis vérifier qu'elle marche vraiment** — et la vérification, en prime, va nous imposer la valeur de $\tau$.

### Ce que l'équation raconte

Réécrivons-la en isolant la dérivée :

$$\frac{du_C}{dt} = \frac{E - u_C}{RC}$$

Elle dit : la vitesse à laquelle $u_C$ monte est proportionnelle à l'écart $E - u_C$, c'est-à-dire à ce qu'il reste de chemin jusqu'à $E$. Loin de $E$, $u_C$ monte vite ; proche de $E$, elle ralentit. C'est exactement une approche qui décélère à mesure qu'elle arrive — pas une droite, pas un saut. La fonction mathématique qui décroît proportionnellement à sa propre valeur, c'est l'exponentielle.

### Poser l'hypothèse, puis la vérifier

On pose l'hypothèse — une supposition qu'on va tester, pas encore une certitude — qu'une fonction de la forme

$$u_C(t) = E + K\,e^{-t/\tau}$$

convient, où $K$ est une constante à déterminer et $\tau$ un temps encore inconnu. On connaît déjà la condition initiale : avant $t=0$ le condensateur est déchargé, donc $u_C(0) = 0$. Cette condition fixe $K$ :

$$u_C(0) = E + K = 0 \implies K = -E$$

L'hypothèse devient :

$$u_C(t) = E\left(1 - e^{-t/\tau}\right)$$

**Vérifions que cette fonction satisfait bien l'équation différentielle.** On calcule d'abord sa dérivée :

$$\frac{du_C}{dt} = \frac{E}{\tau}\,e^{-t/\tau}$$

On substitue $u_C$ et $\dfrac{du_C}{dt}$ dans le membre de gauche $RC\dfrac{du_C}{dt} + u_C$ :

$$RC\frac{du_C}{dt} + u_C = RC\cdot\frac{E}{\tau}\,e^{-t/\tau} + E\left(1 - e^{-t/\tau}\right)$$

On développe :

$$RC\frac{du_C}{dt} + u_C = \frac{RC}{\tau}\,E\,e^{-t/\tau} + E - E\,e^{-t/\tau}$$

Pour que ce membre de gauche soit égal à $E$ **à chaque instant**, il faut que les deux termes en $e^{-t/\tau}$ se compensent exactement — donc que leur somme soit nulle :

$$\frac{RC}{\tau}\,E\,e^{-t/\tau} - E\,e^{-t/\tau} = 0 \implies \frac{RC}{\tau} = 1 \implies \tau = RC$$

Et alors il reste tout juste $E = E$. L'équation est vérifiée, **quel que soit $t$** — mais seulement si $\tau = RC$. Si on avait choisi un autre $\tau$, le résidu exponentiel ne se serait pas annulé et l'exponentielle n'aurait pas été solution. L'hypothèse est confirmée, et la vérification vient de nous livrer gratuitement la valeur de la constante de temps : c'est exactement le groupement $RC$ qu'on avait deviné en R1.

$$\boxed{u_C(t) = E\left(1 - e^{-t/\tau}\right), \qquad \tau = RC}$$

### Ce que dit la courbe $u_C(t)$, et le sens exact de $\tau$

Lisons cette solution, valeur par valeur :

- À $t = 0$ : $u_C(0) = E(1 - 1) = 0$. La tension part bien de zéro — elle ne saute pas, contrairement à ce que l'accroche invitait à croire.
- Quand $t$ devient grand ($t \gg \tau$) : $e^{-t/\tau} \to 0$, donc $u_C(t) \to E$. La tension tend vers $E$ sans jamais la dépasser : c'est le **régime permanent**, condensateur chargé.
- Entre les deux, la montée est **rapide au début, puis de plus en plus lente** — l'approche qui décélère, jamais un saut, jamais une droite.

Maintenant on peut donner à $\tau$ le sens quantitatif promis en R1. À l'instant $t = \tau$ :

$$u_C(\tau) = E\left(1 - e^{-1}\right) \approx E \times 0{,}63$$

Au bout d'une constante de temps, le condensateur a franchi **63 %** du chemin vers $E$. Et au bout de $5\tau$ :

$$u_C(5\tau) = E\left(1 - e^{-5}\right) \approx E \times 0{,}993$$

soit plus de **99 %** : en pratique, on considère la charge terminée et le régime permanent atteint au bout de $\approx 5\tau$. Voilà la réponse exacte à la question laissée ouverte en R1 : $\tau$ n'est pas l'instant où « ça s'arrête » (ça ne s'arrête jamais tout à fait), c'est l'échelle qui règle toute la montée.

[[figure:uc-charge]]

### En déduire le courant $i(t)$ — et le point où $u_C$ est continue mais $i$ ne l'est pas

Le courant se déduit directement de $u_C$, sans nouvelle hypothèse : c'est $i = C\dfrac{du_C}{dt}$, et on a déjà calculé cette dérivée. Avec $\tau = RC$ :

$$i(t) = C\frac{du_C}{dt} = C\cdot\frac{E}{\tau}\,e^{-t/\tau} = C\cdot\frac{E}{RC}\,e^{-t/\tau}$$

Le $C$ se simplifie, et il reste :

$$\boxed{i(t) = \frac{E}{R}\,e^{-t/\tau}}$$

Le courant, lui, ne part pas de zéro : il part de son **maximum** et décroît vers zéro.

- À $t = 0^+$, juste après la fermeture : $i(0^+) = \dfrac{E}{R}$. C'est le courant maximal — cohérent avec le mécanisme, où toute la tension $E$ tombe d'abord sur la résistance.
- En régime permanent ($t \gg \tau$) : $i \to 0$. Le condensateur chargé ne laisse plus passer de courant continu — il se comporte comme un interrupteur ouvert.

Arrête-toi une seconde sur $t = 0$, parce qu'il s'y joue une dissymétrie que le programme te demande de connaître. Juste avant la fermeture, aucun courant ne circule : $i(0^-) = 0$. Juste après, $i(0^+) = \dfrac{E}{R} \neq 0$. Le courant **saute** — il est **discontinu** à $t = 0$. La tension du condensateur, elle, ne saute pas : $u_C(0^-) = u_C(0^+) = 0$, elle est **continue**. Ce n'est pas une coïncidence : $u_C = \dfrac{q}{C}$, et la charge $q$ ne peut pas se téléporter d'un coup sur les armatures avec un courant fini — donc $u_C$ varie forcément de façon continue. Le courant, lui, n'est soumis à aucune contrainte de continuité dans ce circuit : rien n'interdit qu'il saute. **Dans un dipôle RC : $u_C$ est continue, $i$ est discontinue à l'instant de la fermeture.**

On peut aussi écrire la charge, si on la demande, par $q = Cu_C$ :

$$q(t) = C E\left(1 - e^{-t/\tau}\right), \qquad Q_{max} = CE$$

### Exemple numérique

Prenons un conducteur ohmique $R = 1{,}0\ \text{k}\Omega = 1000\ \Omega$, un condensateur $C = 1{,}0\ \mu\text{F} = 1{,}0\times10^{-6}\ \text{F}$, alimentés par un générateur idéal $E = 10\ \text{V}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* avant tout, la constante de temps — c'est elle qui fixe l'échelle de tout le phénomène, donc on la calcule en premier.

$$\tau = RC = 1000 \times 1{,}0\times10^{-6} = 1{,}0\times10^{-3}\ \text{s} = 1{,}0\ \text{ms}$$

Le courant juste après la fermeture (sa valeur maximale) :

$$i(0^+) = \frac{E}{R} = \frac{10}{1000} = 0{,}010\ \text{A} = 10\ \text{mA}$$

La tension du condensateur au bout d'une constante de temps, $t = \tau = 1{,}0\ \text{ms}$ :

$$u_C(\tau) = E\left(1 - e^{-1}\right) \approx 10 \times 0{,}63 = 6{,}3\ \text{V}$$

Et le courant au même instant :

$$i(\tau) = \frac{E}{R}\,e^{-1} \approx 10 \times 0{,}37 = 3{,}7\ \text{mA}$$

La charge est pratiquement terminée à $t \approx 5\tau = 5{,}0\ \text{ms}$ : à cet instant $u_C \approx 10\ \text{V}$ et $i \approx 0$. On garde ces valeurs — $\tau = 1{,}0\ \text{ms}$, $i(0^+) = 10\ \text{mA}$ — elles reviennent dans les rungs suivants.

---

## R3 — Lire et mesurer $\tau$ sur un oscillogramme

On sait maintenant que $\tau = RC$ règle toute la charge. Mais dans un TP, on ne connaît pas toujours $R$ et $C$ à l'avance : on dispose d'une courbe $u_C(t)$ enregistrée à l'oscilloscope, et on veut en **extraire** $\tau$. Deux méthodes, aux résultats équivalents.

### La méthode des 63 %

On relève d'abord $E$ : c'est la valeur de l'asymptote horizontale, la tension vers laquelle la courbe se stabilise en régime permanent. On calcule $0{,}63 \times E$, on cherche l'instant où $u_C(t)$ atteint cette valeur — et cet instant **est** $\tau$. C'est la traduction directe de $u_C(\tau) = E(1 - e^{-1}) \approx 0{,}63\,E$ qu'on a établie en R2.

### La méthode de la tangente à l'origine

On trace la tangente à la courbe $u_C(t)$ au point $t = 0$. Cette tangente coupe l'asymptote horizontale $u_C = E$ en un point dont l'abscisse est exactement $t = \tau$.

D'où vient cette propriété ? La pente de $u_C$ à l'origine se lit sur la dérivée calculée en R2 :

$$\frac{du_C}{dt}(0) = \frac{E}{\tau}\,e^{0} = \frac{E}{\tau}$$

Une droite qui part de $0$ avec cette pente atteint la hauteur $E$ après une durée $\dfrac{E}{E/\tau} = \tau$. La tangente à l'origine « vise » donc l'asymptote pile en $t = \tau$ — c'est une lecture graphique très rapide, souvent plus précise que le pointage des 63 %.

[[figure:uc-charge]]

### Exemple de lecture

Reprenons le circuit de R2 : $R = 1{,}0\ \text{k}\Omega$, $C = 1{,}0\ \mu\text{F}$, donc on attend $\tau = 1{,}0\ \text{ms}$ et une asymptote à $E = 10\ \text{V}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on retrouve, sur la courbe, une valeur qu'on a déjà calculée exactement — ce recoupement valide la lecture graphique.

Par la méthode des 63 % : à $t = 1{,}0\ \text{ms}$, on doit lire $u_C \approx 0{,}63 \times 10 = 6{,}3\ \text{V}$ sur l'oscillogramme — cohérent avec le calcul de R2. Par la tangente : la droite tracée en $t=0$ coupe l'asymptote $u_C = 10\ \text{V}$ à l'abscisse $t = 1{,}0\ \text{ms}$. Les deux méthodes donnent le même $\tau$, et de $\tau = RC$ on remonterait à $C$ (ou à $R$) si l'une des deux était inconnue.

Et si on refait l'expérience en **augmentant $R$** (ou $C$), même générateur : l'asymptote reste à $E = 10\ \text{V}$ — la valeur finale ne dépend que de $E$ — mais la montée est plus lente, $\tau$ plus grand. C'est $\tau = RC$ qui règle la vitesse, pas la hauteur.

---

## R4 — L'énergie emmagasinée, et un mot sur la décharge

### L'énergie stockée dans le condensateur

Pendant la charge, le générateur fournit de l'énergie. Une partie est dissipée par effet Joule dans la résistance ; le reste est **emmagasiné** dans le condensateur. Combien, et sous quelle forme ?

La puissance reçue par le condensateur à chaque instant, c'est le produit de la tension à ses bornes par le courant qui le traverse, $p = u_C\,i$. On remplace $i$ par $C\dfrac{du_C}{dt}$ :

$$p = u_C\,i = u_C\cdot C\frac{du_C}{dt}$$

Ce terme se reconnaît : c'est exactement la dérivée par rapport au temps de $\dfrac{1}{2}Cu_C^2$. Vérifions-le :

$$\frac{d}{dt}\left(\frac{1}{2}Cu_C^2\right) = \frac{1}{2}C\cdot 2u_C\frac{du_C}{dt} = Cu_C\frac{du_C}{dt}$$

C'est bien $p$. Donc la puissance reçue par le condensateur est la dérivée de $\dfrac{1}{2}Cu_C^2$ : cette quantité est l'**énergie qu'il a accumulée** à l'instant considéré.

$$\boxed{E_C = \frac{1}{2}Cu_C^2}$$

Cette énergie est stockée sous forme **électrique**, dans le champ entre les armatures — pas dissipée. Elle croît pendant la charge, et se stabilise une fois le régime permanent atteint, quand $u_C = E$ :

$$E_C = \frac{1}{2}CE^2 = \frac{1}{2}\times 1{,}0\times10^{-6}\times 10^2 = 5{,}0\times10^{-5}\ \text{J} = 50\ \mu\text{J}$$

(avec le circuit de R2, $C = 1{,}0\ \mu\text{F}$, $E = 10\ \text{V}$).

### Et si on décharge ?

Une fois le condensateur chargé à $E$, coupe le générateur et laisse le condensateur se vider dans la résistance seule. La loi des mailles devient $u_R + u_C = 0$, soit, avec $u_R = Ri$ et $i = C\dfrac{du_C}{dt}$, l'équation de la **décharge** :

$$RC\frac{du_C}{dt} + u_C = 0$$

C'est la même équation qu'à la charge, mais avec un second membre nul (plus de générateur qui pousse). Même méthode : on pose $u_C(t) = A\,e^{-t/\tau}$, la condition initiale $u_C(0) = E$ donne $A = E$, et la vérification impose de nouveau $\tau = RC$. La solution est une décroissance exponentielle pure :

$$u_C(t) = E\,e^{-t/\tau}$$

Le courant s'en déduit, $i = C\dfrac{du_C}{dt}$ :

$$i(t) = -\frac{E}{R}\,e^{-t/\tau}$$

Il est **négatif** : le courant circule maintenant dans le sens inverse de la charge — le condensateur se vide au lieu de se remplir. Sa constante de temps est la même, $\tau = RC$ : la décharge est pratiquement complète au bout de $\approx 5\tau$, et l'énergie $\frac{1}{2}CE^2$ qui était stockée finit entièrement dissipée par effet Joule dans $R$. Charge et décharge sont les deux faces du même temps caractéristique.

Vérifie tout ça par toi-même, en manipulation directe : construis le montage, charge le condensateur, double $R$ (ou $C$) et regarde $\tau$ doubler à son tour sans que la hauteur finale $E$ ne bouge — puis retire le générateur pour observer la décharge.

[[embed:rc-sandbox]]

[[figure:uc-decharge]]

---

## R5 — Pour t'entraîner

### Récapitulatif express

- Circuit RC série soumis à un échelon $E$ : $u_C$ **continue** ($u_C(0)=0$), $i$ **discontinue** ($i(0^+)=E/R$, alors que $i(0^-)=0$).
- Équation de la charge : $RC\dfrac{du_C}{dt} + u_C = E$, solution $u_C(t) = E\left(1 - e^{-t/\tau}\right)$, avec $\tau = RC$.
- Courant : $i(t) = \dfrac{E}{R}\,e^{-t/\tau}$ — part de $E/R$, décroît vers $0$.
- $\tau = RC$ est une durée ($\Omega\cdot F = s$) : $63\,\%$ de $E$ à $t=\tau$, régime permanent ($>99\,\%$) à $t \approx 5\tau$. Lecture graphique : méthode des $63\,\%$ ou tangente à l'origine.
- Énergie emmagasinée : $E_C = \dfrac{1}{2}Cu_C^2$, soit $\dfrac{1}{2}CE^2$ une fois chargé.
- Décharge : $u_C(t) = E\,e^{-t/\tau}$, même $\tau$.

### Exercice de type bac (original — entraînement, non un sujet officiel)

On réalise le montage série suivant : un générateur idéal de f.é.m. $E$, un interrupteur $K$, un conducteur ohmique de résistance $R$ inconnue, et un condensateur de capacité $C = 10\ \mu\text{F}$ initialement déchargé. À $t = 0$ on ferme $K$ et on enregistre $u_C(t)$ à l'oscilloscope. La courbe part de $0$ et croît vers une asymptote horizontale à $6\ \text{V}$ ; la tangente à la courbe à l'origine coupe cette asymptote à l'instant $t = 20\ \text{ms}$.

**1) Déterminer la f.é.m. $E$ du générateur à partir de la courbe.**

*Ce qu'on cherche ici, et pourquoi ce geste :* en régime permanent, le condensateur est chargé et $i = 0$ ; la loi des mailles $E = Ri + u_C$ se réduit alors à $E = u_C$. La valeur finale de $u_C$ — l'asymptote — est donc directement $E$.

$$E = u_C(\infty) = 6\ \text{V}$$

**2) Lire la constante de temps $\tau$, puis en déduire la résistance $R$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la tangente à l'origine coupe l'asymptote à $t = \tau$ — c'est la définition même de cette méthode de lecture (R3). On lit donc $\tau$ directement, puis on remonte à $R$ par $\tau = RC$.

$$\tau = 20\ \text{ms} = 20\times10^{-3}\ \text{s}$$

$$\tau = RC \implies R = \frac{\tau}{C} = \frac{20\times10^{-3}}{10\times10^{-6}} = 2{,}0\times10^{3}\ \Omega = 2{,}0\ \text{k}\Omega$$

**3) Calculer l'intensité $i(0^+)$ juste après la fermeture, et justifier pourquoi $i$ est discontinue à $t=0$ alors que $u_C$ ne l'est pas.**

*Ce qu'on cherche ici, et pourquoi ce geste :* à $t=0^+$, $u_C$ est encore nulle (elle est continue, et le condensateur était vide), donc toute la tension $E$ tombe sur $R$ — c'est là que le courant est maximal.

$$i(0^+) = \frac{E}{R} = \frac{6}{2000} = 3{,}0\times10^{-3}\ \text{A} = 3{,}0\ \text{mA}$$

$u_C$ est continue parce que $u_C = q/C$ et que la charge $q$ ne peut pas sauter avec un courant fini : $u_C(0^+) = u_C(0^-) = 0$. Le courant, lui, n'a aucune contrainte de continuité : il passe de $i(0^-)=0$ à $i(0^+)=3{,}0\ \text{mA}$ — un saut, donc une discontinuité.

**4) Calculer la tension $u_C$ à l'instant $t = \tau$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* $t = \tau$ est précisément l'instant où le facteur $1 - e^{-t/\tau}$ vaut $1 - e^{-1} \approx 0{,}63$ — on l'applique directement, sans repartir de l'équation.

$$u_C(\tau) = E\left(1 - e^{-1}\right) \approx 6 \times 0{,}63 = 3{,}8\ \text{V}$$

**5) Calculer l'énergie emmagasinée dans le condensateur une fois la charge terminée.**

*Ce qu'on cherche ici, et pourquoi ce geste :* « charge terminée » signifie régime permanent, $u_C = E$ — on applique $E_C = \frac{1}{2}Cu_C^2$ avec cette valeur finale, pas avec une valeur transitoire.

$$E_C = \frac{1}{2}CE^2 = \frac{1}{2}\times 10\times10^{-6}\times 6^2$$

$$E_C = \frac{1}{2}\times 10\times10^{-6}\times 36 = 1{,}8\times10^{-4}\ \text{J} = 180\ \mu\text{J}$$

### À toi

**Variation 1.** Un circuit RC a pour données $E = 5\ \text{V}$, $R = 4{,}7\ \text{k}\Omega$, $C = 100\ \text{nF}$. Calcule la constante de temps $\tau$, le courant initial $i(0^+)$, la tension $u_C$ à $t = \tau$, et l'énergie emmagasinée une fois le régime permanent atteint. Vérifie ensuite, par le calcul, que $u_C(\tau) \approx 0{,}63 \times E$.

**Variation 2.** On **double la capacité $C$** d'un circuit RC, sans changer ni $R$ ni $E$. Sans calculer de valeurs numériques, explique — à partir des expressions $\tau = RC$, $i(0^+) = E/R$ et $u_C(\infty) = E$ — comment évoluent la constante de temps, le courant initial et la tension finale. Puis donne le sens physique de chaque réponse : le condensateur atteint-il sa charge finale plus vite ou plus lentement, et cette charge finale est-elle plus grande ou inchangée ?
