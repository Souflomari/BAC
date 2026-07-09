# Atome et mécanique de Newton

---

## R0 — Accroche : un modèle planétaire, stable ou condamné ?

Au début du vingtième siècle, les physiciens se représentaient l'atome comme un système solaire miniature : au centre, un noyau minuscule et massif (les protons et les neutrons) ; autour, un électron, beaucoup plus léger, qui tourne en orbite circulaire, exactement comme la Terre tourne autour du Soleil. Sauf qu'ici, ce n'est pas la gravitation qui retient l'électron : c'est l'attraction électrique entre sa charge négative et la charge positive du noyau.

Tu viens de passer tout un chapitre à maîtriser la deuxième loi de Newton, le mouvement circulaire, les forces centrales. Applique ce que tu sais déjà : si cette image du système solaire miniature est prise au sérieux — un électron classique, en mouvement circulaire uniforme, retenu par une force électrique qui joue exactement le rôle de la gravitation pour une planète — alors cet atome devrait-il durer indéfiniment, inchangé, exactement comme le système solaire dure depuis des milliards d'années ?

Avant de lire la suite, prends position, vraiment : d'après toi, ce modèle planétaire de l'atome, traité avec les seules lois de la mécanique que tu connais, prédit-il un atome stable pour toujours ? Ou bien y voit-on déjà, rien qu'avec la mécanique, une raison de douter ?

Garde ta réponse en tête. Voici ce qu'on va découvrir, pas à pas, dans ce chapitre : la mécanique de Newton, appliquée correctement à ce modèle, donne effectivement une orbite parfaitement stable — on va même la calculer précisément, vitesse et période, avec exactement la même méthode que pour n'importe quel mouvement circulaire. Mais un ingrédient qui n'appartient pas à la mécanique va s'inviter dans l'histoire, et il va tout changer : une charge électrique qui accélère — et un électron en orbite accélère en permanence, même à vitesse constante — rayonne de l'énergie. Cette énergie doit venir de quelque part. Et la matière qui t'entoure, elle, ne s'effondre pas : tu es fait d'atomes stables depuis des milliards d'années.

C'est ce paradoxe — un calcul mécanique parfaitement correct, et pourtant contredit par ce qu'on observe — qu'on va construire et refermer dans ce chapitre : d'abord la force qui tient ce modèle (R1), puis le calcul complet de l'orbite (R2), puis pourquoi ce calcul, aussi juste soit-il, ne suffit pas (R3), et enfin, très brièvement, ce que la physique moderne met à la place (R4).

---

## R1 — Le mécanisme : quelle force retient l'électron ?

### Deux candidats, une seule bonne réponse à cette échelle

Dans le modèle planétaire, l'électron (charge $-e$) est retenu autour du noyau (charge $+Ze$, où $Z$ est le nombre de protons — pour l'atome d'hydrogène, $Z=1$) par une force attractive. Deux interactions, a priori, pourraient jouer ce rôle : la gravitation (les deux particules ont une masse) et l'interaction électrostatique (les deux particules ont une charge).

Les deux forces ont la même forme mathématique — une décroissance en $1/r^2$ avec la distance — mais ce sont deux interactions de nature complètement différente :

| Interaction | Expression de la norme | Toujours attractive ? |
|---|---|---|
| Gravitationnelle | $F_G = G\dfrac{m_1 m_2}{r^2}$ | Oui, toujours, entre deux masses |
| Électrostatique (Coulomb) | $F_C = k\dfrac{\lvert q_1 q_2\rvert}{r^2}$ | Attractive si $q_1$ et $q_2$ sont de signes opposés ; répulsive s'ils sont de même signe |

Ici $G \approx 6{,}67 \times 10^{-11}\ \text{N}\cdot\text{m}^2\cdot\text{kg}^{-2}$ est la constante de gravitation universelle, et $k \approx 9{,}0 \times 10^{9}\ \text{N}\cdot\text{m}^2\cdot\text{C}^{-2}$ est la constante de Coulomb. La force électrostatique, elle, est toujours dirigée le long de la droite qui joint les deux charges — attractive ici, puisque l'électron ($-e$) et le noyau ($+Ze$) sont de signes opposés, donc dirigée vers le noyau : exactement la direction dont un mouvement circulaire a besoin pour sa force centrale.

### Laquelle des deux compte vraiment ici ? Un calcul, pas une intuition

Ne choisis pas encore : vérifie. Prenons l'électron et un unique proton (l'atome d'hydrogène, $Z=1$), séparés d'une distance typique $r \approx 5{,}3 \times 10^{-11}\ \text{m}$ (l'ordre de grandeur d'un rayon atomique). On donne $m_e \approx 9{,}1 \times 10^{-31}\ \text{kg}$ (masse de l'électron), $m_p \approx 1{,}67 \times 10^{-27}\ \text{kg}$ (masse du proton), $e \approx 1{,}6 \times 10^{-19}\ \text{C}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on calcule les deux forces avec les mêmes données, à la même distance, pour comparer directement leur ordre de grandeur — c'est le seul moyen honnête de savoir laquelle domine, plutôt que de le supposer.

**Force de Coulomb :**

$$F_C = k\frac{e^2}{r^2} = \frac{9{,}0 \times 10^{9} \times (1{,}6 \times 10^{-19})^2}{(5{,}3 \times 10^{-11})^2}$$

$$F_C \approx 8{,}2 \times 10^{-8}\ \text{N}$$

**Force gravitationnelle :**

$$F_G = G\frac{m_e m_p}{r^2} = \frac{6{,}67 \times 10^{-11} \times 9{,}1 \times 10^{-31} \times 1{,}67 \times 10^{-27}}{(5{,}3 \times 10^{-11})^2}$$

$$F_G \approx 3{,}6 \times 10^{-47}\ \text{N}$$

**Comparons :**

$$\frac{F_C}{F_G} \approx 2{,}3 \times 10^{39}$$

La force électrostatique est environ $10^{39}$ fois plus grande que la force gravitationnelle entre l'électron et le proton — un facteur si énorme qu'il n'a pas d'équivalent à l'échelle humaine. Remarque aussi que ce rapport ne dépend pas de $r$ : les deux forces varient toutes les deux en $1/r^2$, donc ce facteur $1/r^2$ se simplifie exactement dans le rapport, quelle que soit la distance choisie.

**Conclusion, à retenir précisément :** à l'échelle de l'atome, la gravitation existe bel et bien entre l'électron et le noyau, mais elle est totalement négligeable devant la force électrostatique. C'est donc la seule force de Coulomb qui gouverne le mouvement de l'électron dans ce modèle — pas parce qu'on l'a décidé arbitrairement, mais parce que le calcul le montre. Les deux forces se ressemblent dans leur écriture (la même forme en $1/r^2$), mais ce sont deux interactions distinctes, de grandeurs sans commune mesure à cette échelle : ne les confonds jamais l'une avec l'autre.

---

## R2 — Établir la vitesse et la période dans le modèle planétaire

### Le mouvement est circulaire uniforme : ce que ça veut dire pour l'accélération

Avant toute équation, fixe un point qui trompe souvent : le mouvement de l'électron est supposé circulaire **uniforme** — la norme de sa vitesse $v$ reste constante. Est-ce que ça veut dire que son accélération est nulle ?

Non. Teste cette idée avant de la garder : le vecteur vitesse $\vec{v}$ garde la même norme, d'accord — mais sa **direction** change à chaque instant, puisque l'électron tourne. Un vecteur qui change de direction n'est pas un vecteur constant, même si sa norme ne bouge pas. Or l'accélération mesure justement la variation du vecteur vitesse dans le temps — donc l'accélération n'est pas nulle ici, même si le mouvement est uniforme.

Dans un mouvement circulaire uniforme, l'accélération a exactement deux propriétés : elle n'a aucune composante tangentielle (aucune force ne fait varier la norme de $v$, puisque le mouvement reste uniforme), et elle a une composante normale, dirigée **vers le centre** du cercle (vers le noyau), de norme :

$$a_N = \frac{v^2}{r}$$

C'est cette accélération centripète, non nulle, qui courbe la trajectoire de l'électron à chaque instant — exactement ce que la deuxième loi de Newton va relier à la force qui s'exerce sur lui.

### Appliquer la deuxième loi de Newton

Dans le référentiel du noyau (supposé galiléen ici, le noyau étant très largement plus massif que l'électron et donc quasiment immobile), la seule force qui s'exerce sur l'électron, on vient de l'établir en R1, est la force de Coulomb $\vec{F}_C$, dirigée vers le noyau. La deuxième loi de Newton s'écrit :

$$\vec{F}_C = m_e\,\vec{a}_G$$

En projetant sur la direction normale (vers le centre), et puisque $F_C = k\dfrac{e^2}{r^2}$ (cas de l'hydrogène, $Z=1$) et $a_N = \dfrac{v^2}{r}$ :

$$k\frac{e^2}{r^2} = m_e\frac{v^2}{r}$$

[[figure:bilan-forces-orbite]]

### Résoudre pour la vitesse $v$

*Ce qu'on cherche ici, et pourquoi ce geste :* isoler $v$ demande d'éliminer $r$ progressivement des deux côtés — on avance une transformation à la fois, pour ne jamais perdre le fil de la résolution.

On multiplie les deux membres par $r$ :

$$k\frac{e^2}{r} = m_e v^2$$

On isole $v^2$ en divisant par $m_e$ :

$$v^2 = \frac{k e^2}{m_e r}$$

On prend la racine carrée (une vitesse est positive) :

$$\boxed{v = \sqrt{\frac{k e^2}{m_e r}}}$$

Remarque la structure du résultat : $v$ **diminue** quand $r$ augmente — plus l'électron est loin du noyau, plus il tourne lentement, exactement comme une planète plus éloignée du Soleil orbite plus lentement.

### En déduire la période de révolution $T$

*Ce qu'on cherche ici, et pourquoi ce geste :* la période est le temps pour parcourir un tour complet, une circonférence $2\pi r$, à la vitesse $v$ qu'on vient de trouver. On passe par $T^2$ plutôt que par $T$ directement, pour éviter une racine carrée au dénominateur.

$$T = \frac{2\pi r}{v} \quad \Longrightarrow \quad T^2 = \frac{4\pi^2 r^2}{v^2}$$

On remplace $v^2$ par l'expression obtenue plus haut :

$$T^2 = \frac{4\pi^2 r^2}{\dfrac{k e^2}{m_e r}}$$

Diviser par une fraction, c'est multiplier par son inverse :

$$T^2 = 4\pi^2 r^2 \times \frac{m_e r}{k e^2} = \frac{4\pi^2 m_e r^3}{k e^2}$$

On prend la racine carrée :

$$\boxed{T = 2\pi\sqrt{\frac{m_e r^3}{k e^2}}}$$

Ce résultat a exactement la même forme que la troisième loi de Kepler pour un satellite en orbite circulaire ($T^2 \propto r^3$) : ce n'est pas une coïncidence, c'est la même méthode — force centrale en $1/r^2$, mouvement circulaire uniforme — appliquée à une force différente.

### Exemple numérique : l'atome d'hydrogène

Prenons, comme en R1, $r \approx 5{,}3 \times 10^{-11}\ \text{m}$, avec $k \approx 9{,}0 \times 10^{9}\ \text{N}\cdot\text{m}^2\cdot\text{C}^{-2}$, $e \approx 1{,}6 \times 10^{-19}\ \text{C}$, $m_e \approx 9{,}1 \times 10^{-31}\ \text{kg}$.

$$v = \sqrt{\frac{9{,}0 \times 10^{9} \times (1{,}6 \times 10^{-19})^2}{9{,}1 \times 10^{-31} \times 5{,}3 \times 10^{-11}}} \approx 2{,}2 \times 10^{6}\ \text{m/s}$$

$$T = \frac{2\pi r}{v} = \frac{2\pi \times 5{,}3 \times 10^{-11}}{2{,}2 \times 10^{6}} \approx 1{,}5 \times 10^{-16}\ \text{s}$$

L'électron, dans ce modèle, tournerait à plus de deux millions de mètres par seconde, en faisant un tour complet en un dixième de milliardième de milliardième de seconde. Une vitesse et une période parfaitement définies, parfaitement stables dans le temps — rien, dans ce calcul, ne dit que $r$ devrait un jour changer. Retiens bien ce point : on y revient au rung suivant.

---

## R3 — Le retour du paradoxe : les limites de la mécanique de Newton

### Arrête-toi : ce calcul est-il faux ?

Non. Le calcul de R2 est parfaitement correct : la deuxième loi de Newton et la force de Coulomb, appliquées à un mouvement circulaire uniforme, donnent bien une vitesse et une période précises, et rien dans ces deux lois ne force le rayon $r$ à changer avec le temps. Tant qu'on reste strictement à l'intérieur de la mécanique, cette orbite est parfaitement stable, indéfiniment — exactement comme un satellite autour de la Terre.

Voici l'erreur à éviter, précisément celle que beaucoup d'élèves commettent : conclure que, puisque le calcul mécanique est juste, il **explique tout** — que la mécanique de Newton, à elle seule, rend compte de la stabilité de l'atome. Ce n'est pas le cas, et voici pourquoi.

### L'ingrédient qui manque : une charge qui accélère rayonne

Il existe un résultat de l'électromagnétisme (qu'on peut énoncer ici sans le démontrer, car sa démonstration dépasse largement ce chapitre) : **toute charge électrique accélérée rayonne de l'énergie sous forme d'onde électromagnétique.** Une antenne émettrice fonctionne exactement sur ce principe : des charges qu'on fait accélérer dans un fil émettent des ondes radio, en perdant de l'énergie à chaque instant.

Or on vient d'établir en R2 que l'électron, même en mouvement circulaire **uniforme**, possède une accélération non nulle — l'accélération centripète $a_N = v^2/r$, dirigée vers le noyau. L'électron est donc une charge en accélération permanente. D'après ce résultat de l'électromagnétisme, il devrait rayonner de l'énergie électromagnétique en continu.

Cette énergie rayonnée doit venir de quelque part : elle est prélevée sur l'énergie même de l'orbite (l'énergie cinétique et l'énergie potentielle électrique de l'électron). À mesure que l'électron perd de l'énergie, il ne peut plus rester sur une orbite de rayon $r$ constant — il doit se rapprocher du noyau, sur une trajectoire en spirale, de plus en plus vite à mesure qu'il se rapproche (car $v$ augmente quand $r$ diminue, d'après la formule de R2). Les physiciens qui ont fait ce calcul au début du vingtième siècle ont trouvé un résultat saisissant : un tel effondrement, pour un atome d'hydrogène, prendrait, classiquement, une fraction de seconde extrêmement courte — un temps largement inférieur au milliardième de seconde.

[[figure:spirale-rayonnement]]

### Le paradoxe, formulé clairement

Voici la contradiction, mise côte à côte :

- **Ce que prédit la mécanique de Newton, combinée à l'électromagnétisme classique :** un électron en orbite devrait rayonner de l'énergie en continu et s'effondrer sur le noyau en un temps extrêmement bref.
- **Ce qu'on observe :** la matière ordinaire est stable. Les atomes qui composent ce texte, ton corps, cette planète, n'ont pas changé de taille depuis des milliards d'années. Aucun électron ne s'effondre jamais sur son noyau.

Ce n'est pas un détail, ni une approximation qu'on pourrait améliorer en calculant plus finement : c'est une contradiction frontale entre une prédiction de la physique classique (mécanique et électromagnétisme réunis) et l'expérience la plus élémentaire qui soit — le fait même que la matière existe durablement. La physique classique ne résout pas ce paradoxe : elle le pose, sans pouvoir y répondre depuis l'intérieur de son propre cadre.

C'est exactement la limite qu'il faut retenir de ce chapitre : la mécanique de Newton n'est pas fausse dans ce qu'elle calcule (R2 tient toujours, comme description instantanée d'une orbite à rayon fixe) — elle est **incomplète** face à ce que l'atome fait réellement dans le temps.

---

## R4 — Vers un modèle quantifié

Si la mécanique classique ne peut pas expliquer pourquoi l'atome ne s'effondre pas, il faut un ingrédient différent — pas seulement une correction, un changement de cadre. C'est ce qu'on appelle la physique quantique, et ce chapitre s'arrête au seuil, sans y entrer : voici seulement le constat, tel qu'il est établi expérimentalement.

L'énergie d'un atome n'est pas libre de prendre n'importe quelle valeur, contrairement à ce que la mécanique classique autoriserait (dans le modèle de R2, rien n'empêche $r$, et donc l'énergie de l'électron, de varier de façon continue). En réalité, l'énergie d'un atome est **quantifiée** : elle ne peut prendre qu'un ensemble de valeurs bien précises et discrètes, comme des marches d'escalier plutôt qu'une rampe continue. Un électron ne peut pas se trouver n'importe où entre deux de ces niveaux d'énergie autorisés.

Quand un atome passe d'un niveau d'énergie à un autre, il échange de l'énergie avec l'extérieur sous forme d'un photon (un grain de lumière), et cet échange obéit à une relation simple :

$$\Delta E = h \cdot \nu$$

où $\Delta E$ est la différence d'énergie entre les deux niveaux, $\nu$ la fréquence de la lumière émise ou absorbée, et $h \approx 6{,}63 \times 10^{-34}\ \text{J}\cdot\text{s}$ la constante de Planck. C'est cette quantification qui explique que les atomes émettent ou absorbent la lumière à des fréquences bien précises, formant des raies dans un spectre, plutôt qu'une lumière de toutes les couleurs mélangées.

[[figure:niveaux-energie]]

[[figure:spectre-raies]]

Rien, dans la deuxième loi de Newton ni dans la force de Coulomb, ne prédit cette quantification : ces lois, à elles seules, autoriseraient un continuum d'orbites et d'énergies, exactement le modèle de R2. C'est précisément pour rendre compte de cette quantification — et, du même coup, de la stabilité de l'atome, puisqu'il existe un niveau d'énergie le plus bas en dessous duquel l'électron ne peut pas descendre — qu'un cadre entièrement nouveau a été nécessaire. Ce cadre, la mécanique quantique, sort du programme de ce chapitre ; retiens seulement, de ce rung, le constat qui referme la boucle ouverte en R0 : la mécanique de Newton permet de calculer une orbite (R2), mais elle ne permet pas d'expliquer pourquoi l'énergie de l'atome est quantifiée, ni pourquoi l'atome, en définitive, ne s'effondre pas.

---

## R5 — Pour t'entraîner

### Récapitulatif express

- Le modèle planétaire de l'atome place un électron en mouvement circulaire uniforme autour du noyau, retenu par la force de Coulomb $F_C = k\dfrac{\lvert q_1 q_2\rvert}{r^2}$ — pas par la gravitation, négligeable d'un facteur $10^{39}$ à cette échelle.
- Un mouvement circulaire **uniforme** a une accélération non nulle : purement normale (centripète), de norme $a_N = v^2/r$, même si la norme de la vitesse est constante.
- En appliquant $\vec{F}_C = m_e\vec{a}_G$, on obtient $v = \sqrt{\dfrac{k e^2}{m_e r}}$ et $T = 2\pi\sqrt{\dfrac{m_e r^3}{k e^2}}$ — un calcul mécanique parfaitement correct.
- Ce calcul est incomplet : une charge accélérée rayonne de l'énergie (électromagnétisme), ce qui devrait faire s'effondrer l'électron sur le noyau presque instantanément. C'est une limite de la mécanique de Newton (et de l'électromagnétisme classique), pas une erreur de calcul.
- La résolution passe par la quantification de l'énergie de l'atome ($\Delta E = h\nu$), un fait expérimental que la mécanique classique ne peut pas expliquer.

### Exercice de type bac (original — entraînement, non un sujet officiel)

On modélise un ion hélium simplement ionisé, $\text{He}^+$ (un noyau de charge $+2e$ autour duquel tourne un seul électron), par le modèle planétaire de ce chapitre. On donne $k \approx 9{,}0 \times 10^{9}\ \text{N}\cdot\text{m}^2\cdot\text{C}^{-2}$, $e \approx 1{,}6 \times 10^{-19}\ \text{C}$, $m_e \approx 9{,}1 \times 10^{-31}\ \text{kg}$, et on prend, pour cet ion, un rayon d'orbite $r = 2{,}6 \times 10^{-11}\ \text{m}$.

**1) Établir l'expression de la force de Coulomb entre l'électron et le noyau de cet ion, en fonction de $k$, $e$ et $r$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* le noyau porte une charge $+2e$ (deux protons) et non $+e$ — c'est le seul changement par rapport à l'hydrogène de R1-R2 ; il faut le faire apparaître dès la mise en équation, pas seulement à la fin.

Le noyau a pour charge $q_1 = +2e$, l'électron $q_2 = -e$. La norme de la force est :

$$F_C = k\frac{\lvert q_1 q_2 \rvert}{r^2} = k\frac{2e \times e}{r^2} = \frac{2ke^2}{r^2}$$

**2) En appliquant la deuxième loi de Newton au mouvement circulaire uniforme de l'électron, établir l'expression de sa vitesse $v$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* même méthode qu'en R2 — seule la force change (facteur $2$ en plus), donc on refait le même calcul avec ce facteur, sans repartir de zéro.

$$\frac{2ke^2}{r^2} = m_e\frac{v^2}{r} \quad \Longrightarrow \quad v^2 = \frac{2ke^2}{m_e r} \quad \Longrightarrow \quad v = \sqrt{\frac{2ke^2}{m_e r}}$$

**3) Calculer numériquement $v$, puis la période de révolution $T$.**

$$v = \sqrt{\frac{2 \times 9{,}0 \times 10^{9} \times (1{,}6 \times 10^{-19})^2}{9{,}1 \times 10^{-31} \times 2{,}6 \times 10^{-11}}} \approx 3{,}1 \times 10^{6}\ \text{m/s}$$

$$T = \frac{2\pi r}{v} = \frac{2\pi \times 2{,}6 \times 10^{-11}}{3{,}1 \times 10^{6}} \approx 5{,}3 \times 10^{-17}\ \text{s}$$

**4) Cet électron reste-t-il indéfiniment sur cette orbite ? Justifier en une ou deux phrases à l'aide des limites de la mécanique de Newton discutées dans ce chapitre.**

*Ce qu'on cherche ici, et pourquoi ce geste :* la question ne demande aucun calcul supplémentaire — elle teste si tu distingues ce que la mécanique calcule (une orbite stable, en apparence) de ce qu'elle est incapable d'expliquer (la stabilité réelle de l'atome).

Non, pas d'après la physique classique complète : l'électron, en accélération centripète permanente, devrait rayonner de l'énergie électromagnétique et s'effondrer sur le noyau en une fraction de seconde extrêmement courte — exactement le paradoxe de R3. Le calcul mécanique de la question 3 décrit une orbite à rayon fixe, mais il ne prouve pas que ce rayon reste fixe dans le temps : c'est précisément là où la mécanique de Newton (associée à l'électromagnétisme classique) atteint sa limite.

### À toi de jouer

**Prompt 1.** Reprends la méthode de l'exercice précédent pour un noyau de charge $+3e$ (par exemple un ion lithium doublement ionisé, $\text{Li}^{2+}$, un seul électron autour d'un noyau de charge $+3e$), avec un rayon d'orbite $r = 1{,}8 \times 10^{-11}\ \text{m}$. Établis l'expression de $v$ en fonction de $k$, $e$, $m_e$, $r$, puis calcule sa valeur numérique et celle de $T$.

**Prompt 2.** Un élève affirme : « Puisque la gravitation existe aussi entre l'électron et le noyau, il faudrait l'ajouter à la force de Coulomb dans le calcul de R2, sinon le résultat est faux. » Cette affirmation est-elle correcte ? Justifie ta réponse, sans calcul, en t'appuyant sur le rapport des deux forces établi en R1.
