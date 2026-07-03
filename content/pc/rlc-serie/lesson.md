# Oscillations libres dans un circuit RLC série

---

## R0 — Accroche : le balancement électrique

Imagine qu'on charge complètement un condensateur — on lui donne une réserve d'énergie — puis on le connecte directement à une bobine, sans source de tension, sans piles. Le circuit est fermé. Le condensateur commence à se décharger.

[[figure:rlc-schema]]

Avant de lire la suite, prends trente secondes et pose-toi vraiment la question : **que va faire la tension $u_C(t)$ aux bornes du condensateur ?** C'est une décharge, et tu viens de voir le circuit RC — alors engage-toi vraiment : choisis une réponse avant de continuer.

[[checkpoint:cp-r0-predict]]

Maintenant regarde la trace réelle de $u_C(t)$ pour ce circuit, en régime périodique.

[[figure:regimes-uc]]

La tension ne descend pas vers zéro et ne s'y arrête pas. Elle descend, passe par zéro, **remonte de l'autre côté**, redescend, repasse par zéro, remonte encore — et ainsi de suite. Ce n'est pas une décharge. C'est une oscillation.

Si tu avais prédit la décharge du RC, ta prédiction et la réalité vont dans des directions opposées — et c'est précisément cet écart qu'on va comprendre. Si tu avais vu juste, la vraie question commence maintenant : **pourquoi** ça oscille ?

<!-- SLOT D'AMÉLIORATION (jamais bloquant — audit C5) : clip « balancement »
     à insérer ici quand l'asset vidéo existera. Le hook fonctionne sans lui ;
     le marqueur ci-dessous est ignoré silencieusement tant que l'asset manque. -->

[[video:balancement]]

Le condensateur se vide, mais l'énergie ne disparaît pas : elle **traverse** dans la bobine, et la bobine la **renvoie** vers le condensateur, dans l'autre sens. Ça oscille. C'est un balancement — un pendule électrique.

Et voilà les deux questions qu'on va porter tout au long de cette leçon :

**Où va l'énergie à chaque instant ?**

**Qu'est-ce qui fait que ça s'arrête ?**

Ne cherche pas encore les réponses — on les construit ensemble, pièce par pièce.

---

## R1 — Le mécanisme : le pendule d'énergie

Avant les équations, comprendre le mécanisme. Parce que le mécanisme, une fois vu, rend tout le reste évident.

On part d'un circuit LC idéal — condensateur, bobine, et pour l'instant on suppose la résistance négligeable, $R \approx 0$. On reviendra sur R plus tard.

[[figure:rlc-schema]]

### Avant de parler d'énergie : qu'est-ce que le courant, exactement ?

On utilise $i = \frac{dq}{dt}$ depuis le chapitre condensateur, mais ça vaut la peine de s'arrêter un instant sur ce que ça dit.

[[figure:origin-i]]

Le courant $i$, c'est la vitesse à laquelle la charge passe par un point du circuit. Si tu imagines les porteurs de charge comme une foule qui franchit une porte : $i$ mesure combien de charge passe par cette porte chaque seconde. La charge totale qui a franchi la porte jusqu'à l'instant $t$, c'est $q(t)$. Donc le débit instantané — la vitesse à laquelle $q$ augmente ou diminue — c'est $\frac{dq}{dt}$. Voilà pourquoi $i = \frac{dq}{dt}$ : ce n'est pas une convention arbitraire, c'est la définition même du courant comme flux de charge. Quand le condensateur se décharge, $q$ diminue, donc $i = \frac{dq}{dt}$ est négatif — le courant sort dans le sens inverse de la convention. L'équation dit exactement ça.

### Un cycle, narré pas à pas

[[motion:energy-pendulum]]

**Instant initial.** Le condensateur est chargé à la tension maximale $U_0$. Toute l'énergie du circuit est stockée dans le condensateur sous forme d'énergie électrique :

$$E_C = \frac{1}{2}C u_C^2 = \frac{1}{2}C U_0^2$$

Le courant est nul — $i = 0$. La bobine ne stocke rien : $E_L = \frac{1}{2}L i^2 = 0$.

**Le condensateur se décharge.** Il commence à envoyer du courant dans le circuit. Ce courant augmente progressivement, car la bobine s'oppose aux variations brusques de courant — c'est sa nature. Pendant que le courant monte, l'énergie électrique du condensateur diminue, et l'énergie magnétique de la bobine grandit.

**Un quart de période plus tard.** La tension $u_C$ est arrivée à zéro — le condensateur est vide. Mais le courant, lui, est à son maximum. Toute l'énergie est maintenant dans la bobine :

$$E_L = \frac{1}{2}L i^2 = \frac{1}{2}L i_{max}^2$$

Et $E_C = 0$, puisque $u_C = 0$.

Arrêtons-nous ici. C'est le moment crucial. Le condensateur est vide. Est-ce que l'énergie a disparu ? Non — elle est **entièrement dans la bobine**, sous forme magnétique. L'énergie n'a pas été consommée, elle a **traversé d'un côté à l'autre**.

**La bobine continue à pousser.** La bobine, qui cherche à maintenir le courant, continue à faire circuler ce courant. Ce faisant, elle recharge le condensateur — mais dans l'autre sens. La tension $u_C$ redevient négative, et l'énergie repasse de la bobine vers le condensateur.

**Un demi-période plus tard.** Le condensateur est rechargé à $-U_0$, le courant est revenu à zéro. Tout recommence en sens inverse.

**La période complète :** condensateur chargé → décharge dans la bobine → bobine pleine, condensateur vide → bobine recharge le condensateur dans l'autre sens → condensateur rechargé à l'envers → et on repart.

C'est exactement un pendule mécanique : l'énergie potentielle (hauteur) et l'énergie cinétique (vitesse) s'échangent en permanence. Ici, l'énergie électrique du condensateur joue le rôle de l'énergie potentielle, et l'énergie magnétique de la bobine joue le rôle de l'énergie cinétique. La somme reste constante.

### L'énergie totale est conservée dans le cas idéal

Dans ce circuit LC idéal ($R = 0$), l'énergie totale $E$ est la somme des deux :

$$E = E_C + E_L = \frac{1}{2}C u_C^2 + \frac{1}{2}L i^2 = \text{constante}$$

On peut aussi écrire en termes de la charge $q = C u_C$ (on connaît $q = C u_C$ depuis le chapitre condensateur) :

$$E = \frac{q^2}{2C} + \frac{1}{2}L i^2 = \text{constante}$$

L'énergie ne disparaît pas — elle oscille entre les deux éléments. Quand $E_C$ est maximale, $E_L = 0$. Quand $E_L$ est maximale, $E_C = 0$. Elles sont en opposition de phase : l'une est à son maximum exactement quand l'autre est à zéro.

Voilà ce que font le condensateur et la bobine, séparément et ensemble :

- Le **condensateur** stocke l'énergie électrique $E_C = \frac{1}{2}C u_C^2 = \frac{q^2}{2C}$. Cette énergie est maximale quand $u_C$ (et $q$) est maximal — c'est-à-dire quand le courant $i$ est nul.
- La **bobine** stocke l'énergie magnétique $E_L = \frac{1}{2}L i^2$. Cette énergie est maximale quand $i$ est maximal — c'est-à-dire quand $u_C = 0$.

Les deux éléments ne stockent pas la même chose, et leurs maxima se produisent à des instants différents — toujours décalés d'un quart de période.

### Arrête-toi — qui stocke quoi, à quel instant ?

Avant de passer aux équations, fige l'image mentale, parce que c'est ici qu'un modèle faux s'installe silencieusement. Beaucoup d'élèves retiennent « le condensateur et la bobine stockent l'énergie » — et placent les deux maxima **au même instant**, comme deux réservoirs qui se rempliraient ensemble.

Teste ce modèle avant de le croire : au quart de période, le condensateur est vide — $u_C = 0$, donc $E_C = 0$. Si les deux maxima étaient simultanés, l'énergie de la bobine devrait être nulle à cet instant aussi. L'énergie totale vaudrait… zéro. Elle serait passée où ?

Le modèle « deux réservoirs ensemble » se contredit tout seul : si l'énergie est conservée, quand l'un est vide, l'autre est **plein**. $E_C = \frac{1}{2}C u_C^2$ est maximale quand $u_C$ est maximale (et $i = 0$) ; $E_L = \frac{1}{2}L i^2$ est maximale quand $i$ est maximal (et $u_C = 0$). Les deux maxima sont en opposition de phase — c'est exactement ce que l'animation te montrait : les deux barres ne montent jamais ensemble.

---

## R2 — Établir l'équation différentielle (cas idéal) et trouver $T_0$

Maintenant qu'on a le mécanisme, on va le traduire en langage mathématique. L'objectif : trouver l'équation qui gouverne $q(t)$, puis en déduire la période propre $T_0$.

[[figure:rlc-schema]]

### Ce que dit $u_C = \frac{q}{C}$ — et pourquoi c'est vrai

[[figure:origin-uc]]

Un condensateur stocke de la charge sur ses armatures. Plus on empile de charge $q$ entre les deux plaques, plus elles se repoussent fort — et cette répulsion se manifeste comme une tension $u_C$ entre les armatures. La relation est simple : double la charge, tu doubles la tension. C'est une proportionnalité directe. Le coefficient de proportionnalité, c'est $\frac{1}{C}$, où $C$ mesure la capacité du condensateur à accumuler de la charge pour une tension donnée — un grand $C$ signifie qu'il faut beaucoup de charge pour n'obtenir qu'une petite tension. On écrit $q = C \cdot u_C$, ce qui donne, en isolant la tension : $u_C = \frac{q}{C}$. C'est la définition même de la capacité, traduite en termes de la charge instantanée $q(t)$.

### Ce que dit $u_L = L\frac{di}{dt}$ — et pourquoi c'est vrai

[[figure:origin-uL]]

Une bobine s'oppose aux changements de courant — c'est son caractère fondamental. Si le courant varie lentement, la bobine réagit peu ; si le courant change brusquement, la bobine résiste fort. Ce qu'elle mesure, c'est le **taux de variation** du courant : $\frac{di}{dt}$. Plus ce taux est élevé, plus la bobine pousse en sens inverse — c'est une inertie pour le courant, exactement comme la masse est une inertie pour le mouvement. La tension aux bornes de la bobine est donc proportionnelle à ce taux de variation : $u_L = L\frac{di}{dt}$, où $L$ est l'inductance, qui mesure la force de cette opposition. Une grande inductance résiste beaucoup aux changements rapides ; une petite inductance laisse varier le courant plus facilement. Il n'y a pas de flux intégral à connaître ici : l'idée est celle d'une inertie électrique.

### Écrire la loi des mailles, terme par terme

[[motion:loi-des-mailles-build]]

Dans le circuit LC idéal ($R = 0$, ou plus précisément $R$ négligeable), la loi des mailles donne :

$$u_C + u_L = 0$$

On connaît les deux expressions — on vient d'en expliquer l'origine :

$$u_C = \frac{q}{C} \qquad \text{et} \qquad u_L = L\frac{di}{dt}$$

Et on sait que $i = \frac{dq}{dt}$, donc $\frac{di}{dt} = \frac{d^2q}{dt^2}$.

On substitue :

$$\frac{q}{C} + L\frac{d^2q}{dt^2} = 0$$

Ce qui s'écrit plus proprement :

$$L\frac{d^2q}{dt^2} + \frac{q}{C} = 0$$

C'est l'**équation différentielle du circuit LC idéal**. Remarquons quelque chose d'essentiel : **R n'apparaît nulle part dans cette équation.** On n'a pas posé $R = 0$ par simplification après coup — R n'est tout simplement pas dans l'équation d'un circuit sans résistance. Donc la période des oscillations ne peut pas dépendre de R.

### Chercher la solution — on devine, puis on vérifie

Regardons l'équation qu'on vient d'obtenir :

$$L\frac{d^2q}{dt^2} + \frac{q}{C} = 0 \implies \frac{d^2q}{dt^2} = -\frac{1}{LC}\,q$$

Elle dit que la dérivée seconde de $q$ est proportionnelle à $-q$. Autrement dit : la fonction et sa dérivée seconde ont le même module, mais des signes opposés.

Quelle fonction se comporte comme ça ? On cherche une $f(t)$ telle que $f'' = -k \cdot f$ pour une constante positive $k$. La réponse, on la connaît depuis les fonctions trigonométriques : $\cos$ et $\sin$ ont exactement cette propriété — $(\cos)'' = -\cos$, $(\sin)'' = -\sin$.

On pose donc l'hypothèse — c'est une supposition, pas une certitude encore — que la solution a la forme :

$$q(t) = Q_{max} \cos\!\left(\frac{2\pi t}{T_0} + \varphi\right)$$

où $Q_{max}$ est la charge maximale et $\varphi$ est la phase initiale (fixée par les conditions initiales). Maintenant on vérifie que ce cosinus vérifie réellement l'équation, et on en déduit ce que vaut $T_0$.

**Vérification — pas à pas.** Avance chaque transformation toi-même ; à chaque étape, la note te dit pourquoi c'est le bon geste.

[[derivation:verification-cosinus]]

L'hypothèse est confirmée : le cosinus est bien une solution, et la substitution nous a offert en prime la valeur de $T_0$. C'est la **période propre** du circuit. Elle ne dépend que de $L$ et de $C$. R n'y figure pas — et ce n'est pas un hasard : R n'était tout simplement pas dans l'équation idéale, donc il ne peut pas apparaître dans $T_0$.

### Déduire $i(t)$

Il ne reste qu'à dériver $q(t)$ une fois — c'est la définition posée en R1, $i = \frac{dq}{dt}$. Le cosinus qu'on vient de confirmer est une fonction composée (un facteur linéaire du temps à l'intérieur), et c'est précisément là que la plupart des erreurs de dérivation se glissent. Avance chaque transformation toi-même ; la note te dit à chaque étape où est le piège.

[[derivation:i-de-t]]

Le courant est donc lui aussi sinusoïdal, à la période $T_0$ — mais déphasé : un sinus là où $q(t)$ est un cosinus, exactement le décalage d'un quart de période qu'on a observé en R1 entre les maxima de $E_C$ et de $E_L$. L'amplitude du courant se lit directement sur le facteur de tête, $i_{max} = \frac{2\pi Q_{max}}{T_0}$.

### Exemple numérique

Prenons $L = 0{,}1\ \text{H}$ et $C = 10\ \mu\text{F} = 10 \times 10^{-6}\ \text{F}$.

On calcule $LC$ :

$$LC = 0{,}1 \times 10 \times 10^{-6} = 10^{-6}\ \text{s}^2$$

$$\sqrt{LC} = 10^{-3}\ \text{s}$$

$$T_0 = 2\pi \times 10^{-3} \approx 6{,}28\ \text{ms}$$

La pulsation propre vaut $\omega_0 = \frac{2\pi}{T_0} = \frac{1}{\sqrt{LC}} = \frac{1}{10^{-3}} = 1000\ \text{rad/s}$.

Si le condensateur est chargé initialement à $U_0 = 6\ \text{V}$, l'énergie totale conservée dans le cas idéal est :

$$E = \frac{1}{2}C U_0^2 = \frac{1}{2} \times 10^{-5} \times 36 = 1{,}8 \times 10^{-4}\ \text{J}$$

Un quart de période plus tard, toute cette énergie est dans la bobine : $E_L = 1{,}8 \times 10^{-4}\ \text{J}$, $E_C = 0$.

Vérifie ta compréhension.

[[checkpoint:cp-r2-m4]]

---

## R3 — R est le frein, pas le moteur

On a dit « $R$ négligeable ». Qu'est-ce qui se passe quand on tient compte de la résistance ? Et d'abord, quel est le rôle de R dans un circuit oscillant ?

Voici la question à se poser honnêtement, avant de voir quoi que ce soit : **si on supprime complètement la résistance du circuit — on imagine $R \to 0$ — que penses-tu qu'il arrive aux oscillations ?**

Engage-toi : est-ce qu'elles s'arrêtent, s'affaiblissent, ou se maintiennent ?

La réponse que beaucoup d'élèves donnent : « ça s'arrête, parce que plus rien ne les entretient. » C'est une prédiction naturelle — R est le composant le plus visible dans un circuit en courant continu, c'est lui qui « consomme ». Si R disparaît, les oscillations s'éteignent.

Garde cette prédiction. Maintenant, on regarde ce que disent les données.

[[figure:rlc-schema]]

[[embed:rlc-sandbox]]

Si le simulateur n'est pas accessible, voici trois instantanés mesurés sur le même circuit ($L = 0{,}1\ \text{H}$, $C = 10\ \mu\text{F}$, $T_0 \approx 6{,}28\ \text{ms}$ dans les trois cas) :

- **$R \approx 0\ \Omega$ :** la courbe $u_C(t)$ est une sinusoïde parfaite, à amplitude constante, qui ne s'amortit jamais. Régime **périodique**.
- **$R \approx 5\ \Omega$ :** la courbe oscille, mais les pics diminuent progressivement. La tension finit par s'éteindre. Régime **pseudo-périodique**.
- **$R \approx 200\ \Omega$ :** la courbe redescend vers zéro sans jamais repartir de l'autre côté. Pas d'oscillation du tout. Régime **apériodique**.

Regarde le premier instantané : $R \approx 0$ donne une sinusoïde parfaite qui ne meurt jamais. C'est exactement l'opposé de ce que la prédiction annonçait. Quand on enlève R, les oscillations ne s'arrêtent pas — elles deviennent parfaites et durent indéfiniment.

Et regardons les suivants : plus R augmente, plus les oscillations s'amortissent vite, jusqu'à ce qu'elles disparaissent complètement (régime apériodique).

La prédiction et la réalité sont à l'envers. Voilà pourquoi cette question est importante.

**R ne nourrit pas les oscillations — R les freine.** À chaque passage de courant, la résistance dissipe de l'énergie sous forme de chaleur : c'est l'**effet Joule**, avec une puissance $P = Ri^2 > 0$. Cette puissance est toujours positive — R prend toujours de l'énergie, jamais n'en donne. C'est un frein, pas un moteur.

[[motion:amortissement-energie]]

Et si on change $L$ ou $C$ (avec $R$ fixée), c'est la **période** des oscillations qui change — pas l'amortissement. C'est $L$ et $C$ qui fixent le rythme. $R$ ne fait que contrôler à quelle vitesse les oscillations disparaissent.

R est le frein. Rien d'autre.

Vérifie ta compréhension.

[[checkpoint:cp-r3-m1]]

---

## R4 — Les trois régimes

En fonction de la valeur de $R$, on observe trois comportements qualitativement différents. Ces trois comportements s'appellent les **trois régimes** des oscillations libres.

[[motion:regime-traces-forming]]

<!-- Le rappel [[motion:energy-pendulum]] a été retiré ici (Day-6,
     followability) : deux lecteurs empilés sans prose entre eux, et le
     rejeu de l'échange idéal (R1) est hors-sujet dans le rung des régimes —
     R3 porte désormais amortissement-energie, qui montre l'échange AVEC la
     décroissance. Une seule animation par idée. -->

### Régime périodique (R négligeable)

La résistance est si faible qu'on peut la négliger. Les oscillations se maintiennent indéfiniment, sans amortissement. La courbe $u_C(t)$ est une sinusoïde parfaite de période $T_0 = 2\pi\sqrt{LC}$. C'est le cas idéal qu'on a étudié en R2.

L'énergie totale $E_C + E_L$ reste constante — aucune perte.

### Régime pseudo-périodique (R modérée)

La résistance est présente mais pas trop élevée. Les oscillations persistent, mais leur amplitude **décroît progressivement**. La courbe $u_C(t)$ ressemble à une sinusoïde amortie : elle oscille, mais de moins en moins fort, jusqu'à s'éteindre.

On appelle ce régime **pseudo-périodique** parce qu'il y a bien une répétition régulière — les pics sont espacés d'un intervalle de temps constant — mais l'amplitude change d'un pic à l'autre.

Cet espacement régulier entre deux maxima successifs s'appelle la **pseudo-période**, notée $T$. On peut la **mesurer directement sur un oscillogramme**, en repérant deux pics consécutifs et en lisant l'écart temporel.

Une propriété importante à retenir : pour un amortissement **faible**, la pseudo-période $T$ est très proche de la période propre :

$$T \approx T_0 = 2\pi\sqrt{LC}$$

On utilise cette approximation en pratique : on mesure $T$ sur le graphe, et on l'assimile à $T_0$. Attention — ce n'est qu'une approximation. La pseudo-période $T$ et la période propre $T_0$ ne sont pas exactement égales ; elles sont proches quand l'amortissement est faible.

L'énergie totale $E_C + E_L$ diminue à chaque oscillation — R dissipe de l'énergie par effet Joule. Mais à l'intérieur de chaque cycle, l'échange $E_C \leftrightarrow E_L$ continue : quand $u_C$ est maximal, toute l'énergie restante est dans le condensateur ; un quart de pseudo-période plus tard, elle est dans la bobine.

### Régime apériodique (R grande)

La résistance est trop élevée. La tension $u_C$ ne fait qu'un seul mouvement : elle revient vers zéro sans jamais repartir dans l'autre sens. Plus d'oscillations. Le condensateur se vide progressivement et s'arrête.

L'énergie est dissipée trop rapidement pour que le transfert $C \to L \to C$ ait le temps de se compléter.

### Synthèse du rôle de R dans les régimes

| R | Régime | Comportement de $u_C(t)$ |
|---|---|---|
| $R \approx 0$ | Périodique | Sinusoïde parfaite, amplitude constante |
| $R$ modérée | Pseudo-périodique | Oscillations amorties, amplitude décroissante |
| $R$ grande | Apériodique | Retour monotone à zéro, pas d'oscillations |

Vérifie ta compréhension.

[[checkpoint:cp-r4-m5]]

---

## R5 — Le cas amorti : établir l'équation, et s'arrêter là

Dans le cas réel où la résistance n'est pas négligeable, on va écrire l'équation qui gouverne le circuit. Et on va faire quelque chose d'important : **établir cette équation, puis s'arrêter**.

Mais avant d'écrire quoi que ce soit, une question à se poser honnêtement.

On a vu que dans le cas idéal, la solution est $q(t) = Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right)$. Maintenant on ajoute R. **Est-ce que ce cosinus idéal vérifie encore l'équation amortie ?**

Prends position : oui ou non, et pourquoi ?

La réponse intuitive : « R n'est qu'un frein, il ralentit l'amplitude mais ne change pas la forme — donc le cosinus devrait encore marcher. » C'est une prédiction raisonnable.

On va la tester par le calcul. Voilà le révélateur.

### Établir l'équation différentielle

[[motion:loi-des-mailles-build]]

On reprend la loi des mailles dans le circuit RLC série complet :

$$u_C + u_L + u_R = 0$$

On connaît les trois expressions :

$$u_C = \frac{q}{C}, \qquad u_L = L\frac{d^2q}{dt^2}, \qquad u_R = Ri = R\frac{dq}{dt}$$

On substitue :

$$\frac{q}{C} + L\frac{d^2q}{dt^2} + R\frac{dq}{dt} = 0$$

Ce qu'on réécrit dans l'ordre standard :

$$\boxed{L\frac{d^2q}{dt^2} + R\frac{dq}{dt} + \frac{q}{C} = 0}$$

C'est l'**équation différentielle du circuit RLC amorti**.

### Tester la prédiction : le cosinus idéal vérifie-t-il l'équation amortie ?

Voici le calcul qui répond à la question qu'on a posée au début. On prend $q(t) = Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right)$ et on le substitue dans l'équation amortie qu'on vient d'établir. Si la prédiction est juste, tout doit s'annuler.

On calcule les dérivées — mêmes dérivées que dans le cas idéal, car la forme du cosinus n'a pas changé :

$$\frac{dq}{dt} = -\frac{2\pi Q_{max}}{T_0}\sin\!\left(\frac{2\pi t}{T_0} + \varphi\right)$$

$$\frac{d^2q}{dt^2} = -\frac{4\pi^2 Q_{max}}{T_0^2}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right) = -\frac{4\pi^2}{T_0^2}\,q$$

On substitue dans $L\frac{d^2q}{dt^2} + R\frac{dq}{dt} + \frac{q}{C} = 0$ :

$$L\left(-\frac{4\pi^2}{T_0^2}\,q\right) + R\left(-\frac{2\pi Q_{max}}{T_0}\sin\!\left(\frac{2\pi t}{T_0} + \varphi\right)\right) + \frac{q}{C} = 0$$

Le premier et le troisième termes se compensent — c'est exactement ce qui se passait dans le cas idéal, et c'est ce qui avait donné $T_0 = 2\pi\sqrt{LC}$. Mais le deuxième terme — le terme $R\frac{dq}{dt}$, qui n'existait pas dans le cas idéal — laisse un reste qu'on ne peut pas annuler :

$$-\frac{2\pi R Q_{max}}{T_0}\sin\!\left(\frac{2\pi t}{T_0} + \varphi\right) \neq 0$$

Ce reste ne s'annule jamais — il vaut quelque chose à chaque instant où $\sin \neq 0$. La prédiction était fausse : le cosinus idéal **ne vérifie pas** l'équation amortie. C'est le terme $R\,q'$ qui fait la rupture — il introduit un $\sin$ dans une équation qui ne contient que des $\cos$ et des $q$, et rien ne peut absorber ce résidu. Une sinusoïde d'amplitude constante n'est plus solution dès que R est non nulle.

### La règle, formulée clairement

Voilà pourquoi le programme trace une ligne :

- **Cas idéal ($R$ négligeable) :** on établit l'équation $L q'' + \frac{q}{C} = 0$, et on la résout — la solution est $q(t) = Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right)$ avec $T_0 = 2\pi\sqrt{LC}$.

- **Cas amorti ($R$ non négligeable) :** on établit l'équation $Lq'' + Rq' + \frac{q}{C} = 0$, et **on s'arrête là**. On ne cherche pas de solution analytique fermée. Le régime amorti se décrit qualitativement (les trois régimes), énergétiquement (l'enveloppe décroît par effet Joule), et expérimentalement (on lit la pseudo-période sur un oscillogramme, on n'essaie pas de la calculer).

La raison n'est pas arbitraire : résoudre l'équation amortie demande des outils mathématiques qui ne font pas partie du programme. On ne peut pas honnêtement faire semblant que c'est aussi simple que le cas idéal — ce n'est pas le cas.

---

## R6 — Lire un oscillogramme

L'oscilloscope est l'instrument de référence pour observer les oscillations d'un circuit RLC. Voici comment exploiter une courbe expérimentale.

On travaille avec le simulateur ou une trace réelle — les deux se lisent de la même façon.

[[embed:rlc-sandbox]]

### Étape 1 : identifier le régime

On regarde la forme générale de la courbe $u_C(t)$ :

- Si $u_C$ oscille indéfiniment avec amplitude constante → **régime périodique** ($R$ négligeable).
- Si $u_C$ oscille mais avec une amplitude qui décroît → **régime pseudo-périodique** ($R$ modérée).
- Si $u_C$ ne fait que revenir vers zéro sans osciller → **régime apériodique** ($R$ trop grande).

### Étape 2 : mesurer la pseudo-période

Dans le régime pseudo-périodique, on repère deux maxima consécutifs de la courbe. L'intervalle de temps entre ces deux maxima est la **pseudo-période $T$**.

On lit les coordonnées sur l'axe temporel et on soustrait :

$$T = t_{n+1} - t_n$$

où $t_n$ et $t_{n+1}$ sont les instants de deux pics successifs.

### Étape 3 : comparer à $T_0$

Pour un amortissement faible, on a $T \approx T_0$. On vérifie cette approximation en calculant $T_0 = 2\pi\sqrt{LC}$ à partir des valeurs de $L$ et $C$ du circuit, et on compare au $T$ mesuré.

Si l'écart est faible, l'approximation est validée. Si l'écart est grand, l'amortissement n'est pas faible.

### Étape 4 : déduire l'effet de R

Si on dispose de deux courbes obtenues avec des valeurs de $R$ différentes (et mêmes $L$ et $C$) :

- La courbe qui **s'amortit plus vite** correspond à la résistance **plus grande**.
- La **pseudo-période ne change pas** — les pics sont espacés du même intervalle. C'est $L$ et $C$ qui fixent le rythme, pas $R$.
- L'**amplitude décroît plus rapidement** quand $R$ est grande.

### Exemple de lecture

Prenons $L = 0{,}1\ \text{H}$ et $C = 10\ \mu\text{F}$. On calcule :

$$T_0 = 2\pi\sqrt{LC} = 2\pi \times 10^{-3} \approx 6{,}28\ \text{ms}$$

Sur la courbe expérimentale, on mesure deux maxima successifs à $t_1 = 3\ \text{ms}$ et $t_2 = 9{,}4\ \text{ms}$. On trouve :

$$T = 9{,}4 - 3 = 6{,}4\ \text{ms}$$

L'écart avec $T_0 \approx 6{,}28\ \text{ms}$ est d'environ 2 %. L'amortissement est bien faible, l'approximation $T \approx T_0$ est valide.

[[figure:regimes-uc]]

---

## R7 — L'entretien des oscillations

On revient maintenant aux deux questions posées en ouverture : *où va l'énergie, et qu'est-ce qui fait que ça s'arrête ?*

On a la réponse. C'est $R$ qui fait que ça s'arrête — R dissipe l'énergie par effet Joule à chaque oscillation. Chaque cycle, le circuit perd un peu d'énergie en chaleur, et les oscillations s'amortissent.

La question suivante est naturelle : peut-on **compenser** cette perte, et ainsi maintenir les oscillations indéfiniment ?

Oui. On ajoute au circuit un **dispositif d'entretien** — un générateur spécial qui restitue exactement l'énergie perdue par effet Joule à chaque cycle. Ni plus, ni moins.

### Comment fonctionne ce dispositif

[[motion:entretien-compensation]]

Ce générateur délivre une tension $u_G(t)$ proportionnelle au courant instantané :

$$u_G(t) = k \cdot i(t)$$

où $k$ est un paramètre réglable (en ohms — c'est une résistance de même dimension).

On inscrit ce générateur dans la loi des mailles du circuit. Le circuit entretenu donne :

$$u_C + u_L + u_R = u_G$$

$$\frac{q}{C} + L\frac{d^2q}{dt^2} + R\frac{dq}{dt} = k\frac{dq}{dt}$$

On réorganise :

$$L\frac{d^2q}{dt^2} + (R - k)\frac{dq}{dt} + \frac{q}{C} = 0$$

### La condition d'entretien : $k = R$

On cherche la valeur de $k$ qui supprime le terme d'amortissement. Le terme d'amortissement dans cette équation est $(R - k)\frac{dq}{dt}$. Pour qu'il disparaisse, il faut :

$$R - k = 0 \implies k = R$$

Avec $k = R$, l'équation devient :

$$L\frac{d^2q}{dt^2} + \frac{q}{C} = 0$$

C'est **exactement l'équation du circuit LC idéal** — celle du cas sans résistance. La solution est la sinusoïde parfaite :

$$q(t) = Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right), \qquad T_0 = 2\pi\sqrt{LC}$$

### Ce que ça veut dire concrètement

Le générateur ne fixe pas la fréquence d'oscillation — il ne « donne pas le rythme ». Ce sont toujours $L$ et $C$ qui fixent la période propre $T_0 = 2\pi\sqrt{LC}$. Le paramètre $k$ n'apparaît nulle part dans la période.

Le rôle du générateur est uniquement de **compenser exactement la perte d'énergie par effet Joule**. À chaque cycle, R dissipe une certaine quantité d'énergie en chaleur ; le générateur en restitue exactement la même quantité au circuit. Bilan net : zéro perte. Les oscillations se maintiennent, libres, à $T_0$, indéfiniment.

C'est la réponse à la question posée au début : pour que ça ne s'arrête pas, il faut refaire le plein d'énergie à chaque cycle — pas imposer un rythme de l'extérieur, mais compenser la fuite.

L'entretien, c'est remplir le seau percé exactement au débit où il fuit. Le seau continue de fonctionner à son propre rythme — et le rythme est déterminé uniquement par sa structure interne, $L$ et $C$.

### Fermeture de l'arc

On a ouvert cette leçon avec deux questions : **où va l'énergie, et qu'est-ce qui l'arrête ?**

- L'énergie **ne disparaît pas** — elle passe du condensateur à la bobine et revient, à chaque oscillation.
- Ce qui l'arrête, c'est **R** : la résistance dissipe une partie de l'énergie à chaque cycle par effet Joule. Plus R est grande, plus l'amortissement est rapide.
- Pour l'entretenir, on **compense exactement cette perte** avec un générateur $u_G = k \cdot i$ réglé à $k = R$ — et les oscillations reprennent, libres et indéfinies, à la période propre $T_0 = 2\pi\sqrt{LC}$.

Vérifie ta compréhension.

[[checkpoint:cp-r7-m8]]

---

## R8 — Exercice de type bac

<!-- Provenance / dette de sourcing : voir exercises.yaml (r8-bac.sourcing) et
     la case bloquante du template v2 — sommet non sourcé = notion non terminée. -->

À toi. Ce qui suit est un exercice complet de type bac — sept questions, quatre parties, le format que tu retrouveras le jour J. Pour chaque question : cherche sur papier d'abord, engage une réponse, puis seulement ouvre le raisonnement expert et compare-le au tien. L'oscillogramme dont parle l'énoncé est la trace ci-dessous.

[[figure:regimes-uc]]

[[exercise:r8-bac]]

---

## R9 — Variation fraîche

[[exercise:r9-variation]]
