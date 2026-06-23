# Oscillations libres dans un circuit RLC série

---

## R0 — Accroche : le balancement électrique

Imagine qu'on charge complètement un condensateur — on lui donne une réserve d'énergie — puis on le connecte directement à une bobine, sans source de tension, sans piles. Le circuit est fermé. Le condensateur commence à se décharger.

[[figure:rlc-schema]]

Avant de lire la suite, prends trente secondes et pose-toi vraiment la question : **que va faire la tension $u_C(t)$ aux bornes du condensateur ?**

Engage-toi : c'est une décharge, tu l'as vue dans le circuit RC juste avant — qu'est-ce que tu prédis ?

La plupart des élèves qui arrivent ici ont une réponse nette : « la tension descend progressivement vers zéro, comme dans le RC. Elle s'amortit et c'est fini. »

C'est ta prédiction ? Bien. Garde-la.

Maintenant regarde le panneau « périodique » de la figure ci-dessous — c'est la trace réelle de $u_C(t)$ pour ce circuit.

[[figure:regimes-uc]]

La tension ne descend pas vers zéro et ne s'y arrête pas. Elle descend, passe par zéro, **remonte de l'autre côté**, redescend, repasse par zéro, remonte encore — et ainsi de suite. Ce n'est pas une décharge. C'est une oscillation.

Ta prédiction et la réalité vont dans des directions opposées. C'est précisément ça qu'on va comprendre.

Le condensateur se vide, mais l'énergie ne disparaît pas : elle **traverse** dans la bobine, et la bobine la **renvoie** vers le condensateur, dans l'autre sens. Ça oscille. C'est un balancement — un pendule électrique.

Et voilà les deux questions qu'on va porter tout au long de cette leçon :

**Où va l'énergie à chaque instant ?**

**Qu'est-ce qui fait que ça s'arrête ?**

Ne cherche pas encore les réponses — on les construit ensemble, pièce par pièce.

---

## R1 — Le mécanisme : le pendule d'énergie

Avant les équations, comprendre le mécanisme. Parce que le mécanisme, une fois vu, rend tout le reste évident.

On part d'un circuit LC idéal — condensateur, bobine, et pour l'instant on suppose la résistance négligeable, $R \approx 0$. On reviendra sur R plus tard.

[[figure:energy-exchange]]

### Un cycle, narré pas à pas

**Instant initial.** Le condensateur est chargé à la tension maximale $U_0$. Toute l'énergie du circuit est stockée dans le condensateur sous forme d'énergie électrique :

$$E_C = \frac{1}{2}C u_C^2 = \frac{1}{2}C U_0^2$$

Le courant est nul — $i = 0$. La bobine ne stocke rien : $E_L = \frac{1}{2}L i^2 = 0$.

**Le condensateur se décharge.** Il commence à envoyer du courant dans le circuit. Ce courant augmente progressivement, car la bobine s'oppose aux variations brusques de courant — c'est sa nature. Pendant que le courant monte, l'énergie électrique du condensateur diminue, et l'énergie magnétique de la bobine grandit.

**Un quart de période plus tard.** La tension $u_C$ est arrivée à zéro — le condensateur est vide. Mais le courant, lui, est à son maximum. Toute l'énergie est maintenant dans la bobine :

$$E_L = \frac{1}{2}L i^2 = \frac{1}{2}L I_{max}^2$$

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

---

## R2 — Établir l'équation différentielle (cas idéal) et trouver $T_0$

Maintenant qu'on a le mécanisme, on va le traduire en langage mathématique. L'objectif : trouver l'équation qui gouverne $q(t)$, puis en déduire la période propre $T_0$.

### Écrire la loi des mailles

Dans le circuit LC idéal ($R = 0$, ou plus précisément $R$ négligeable), la loi des mailles donne :

$$u_C + u_L = 0$$

On connaît les deux expressions depuis les chapitres précédents :

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

**Vérification.** On calcule la dérivée seconde :

$$\frac{d^2q}{dt^2} = -\left(\frac{2\pi}{T_0}\right)^2 Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right) = -\frac{4\pi^2}{T_0^2}\, q$$

On substitue dans l'équation différentielle :

$$L \cdot \left(-\frac{4\pi^2}{T_0^2}\,q\right) + \frac{q}{C} = 0$$

$$q\left(\frac{1}{C} - \frac{4\pi^2 L}{T_0^2}\right) = 0$$

Pour que cette équation soit vérifiée pour tout $t$ (c'est-à-dire pour tout $q \neq 0$), il faut que le terme entre parenthèses soit nul :

$$\frac{1}{C} = \frac{4\pi^2 L}{T_0^2}$$

D'où :

$$T_0^2 = 4\pi^2 LC$$

$$\boxed{T_0 = 2\pi\sqrt{LC}}$$

L'hypothèse est confirmée : le cosinus est bien une solution, et la substitution nous a offert en prime la valeur de $T_0$. C'est la **période propre** du circuit. Elle ne dépend que de $L$ et de $C$. R n'y figure pas — et ce n'est pas un hasard : R n'était tout simplement pas dans l'équation idéale, donc il ne peut pas apparaître dans $T_0$.

### Déduire $i(t)$

On dérive $q(t)$ par rapport au temps :

$$i(t) = \frac{dq}{dt} = -\frac{2\pi Q_{max}}{T_0}\sin\!\left(\frac{2\pi t}{T_0} + \varphi\right)$$

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

---

## R3 — R est le frein, pas le moteur

On a dit « $R$ négligeable ». Qu'est-ce qui se passe quand on tient compte de la résistance ? Et d'abord, quel est le rôle de R dans un circuit oscillant ?

Voici la question à se poser honnêtement, avant de voir quoi que ce soit : **si on supprime complètement la résistance du circuit — on imagine $R \to 0$ — que penses-tu qu'il arrive aux oscillations ?**

Engage-toi : est-ce qu'elles s'arrêtent, s'affaiblissent, ou se maintiennent ?

La réponse que beaucoup d'élèves donnent : « ça s'arrête, parce que plus rien ne les entretient. » C'est une prédiction naturelle — R est le composant le plus visible dans un circuit en courant continu, c'est lui qui « consomme ». Si R disparaît, les oscillations s'éteignent.

Garde cette prédiction. Maintenant, on regarde ce que disent les données.

[[embed:rlc-sandbox]]

Si le simulateur n'est pas accessible, voici trois instantanés mesurés sur le même circuit ($L = 0{,}1\ \text{H}$, $C = 10\ \mu\text{F}$, $T_0 \approx 6{,}28\ \text{ms}$ dans les trois cas) :

- **$R \approx 0\ \Omega$ :** la courbe $u_C(t)$ est une sinusoïde parfaite, à amplitude constante, qui ne s'amortit jamais. Régime **périodique**.
- **$R \approx 5\ \Omega$ :** la courbe oscille, mais les pics diminuent progressivement. La tension finit par s'éteindre. Régime **pseudo-périodique**.
- **$R \approx 200\ \Omega$ :** la courbe redescend vers zéro sans jamais repartir de l'autre côté. Pas d'oscillation du tout. Régime **apériodique**.

Regarde le premier instantané : $R \approx 0$ donne une sinusoïde parfaite qui ne meurt jamais. C'est exactement l'opposé de ce que la prédiction annonçait. Quand on enlève R, les oscillations ne s'arrêtent pas — elles deviennent parfaites et durent indéfiniment.

Et regardons les suivants : plus R augmente, plus les oscillations s'amortissent vite, jusqu'à ce qu'elles disparaissent complètement (régime apériodique).

La prédiction et la réalité sont à l'envers. Voilà pourquoi cette question est importante.

**R ne nourrit pas les oscillations — R les freine.** À chaque passage de courant, la résistance dissipe de l'énergie sous forme de chaleur : c'est l'**effet Joule**, avec une puissance $P = Ri^2 > 0$. Cette puissance est toujours positive — R prend toujours de l'énergie, jamais n'en donne. C'est un frein, pas un moteur.

Et si on change $L$ ou $C$ (avec $R$ fixée), c'est la **période** des oscillations qui change — pas l'amortissement. C'est $L$ et $C$ qui fixent le rythme. $R$ ne fait que contrôler à quelle vitesse les oscillations disparaissent.

R est le frein. Rien d'autre.

---

## R4 — Les trois régimes

En fonction de la valeur de $R$, on observe trois comportements qualitativement différents. Ces trois comportements s'appellent les **trois régimes** des oscillations libres.

[[figure:regimes-uc]]

[[figure:energy-exchange]]

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

---

## R5 — Le cas amorti : établir l'équation, et s'arrêter là

Dans le cas réel où la résistance n'est pas négligeable, on va écrire l'équation qui gouverne le circuit. Et on va faire quelque chose d'important : **établir cette équation, puis s'arrêter**.

Mais avant d'écrire quoi que ce soit, une question à se poser honnêtement.

On a vu que dans le cas idéal, la solution est $q(t) = Q_{max}\cos\!\left(\frac{2\pi t}{T_0} + \varphi\right)$. Maintenant on ajoute R. **Est-ce que ce cosinus idéal vérifie encore l'équation amortie ?**

Prends position : oui ou non, et pourquoi ?

La réponse intuitive : « R n'est qu'un frein, il ralentit l'amplitude mais ne change pas la forme — donc le cosinus devrait encore marcher. » C'est une prédiction raisonnable.

On va la tester par le calcul. Voilà le révélateur.

### Établir l'équation différentielle

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

L'écart avec $T_0 \approx 6{,}28\ \text{ms}$ est faible — environ 2 %. L'amortissement est bien faible, l'approximation $T \approx T_0$ est valide.

[[figure:regimes-uc]]

---

## R7 — L'entretien des oscillations

On revient maintenant aux deux questions posées en ouverture : *où va l'énergie, et qu'est-ce qui fait que ça s'arrête ?*

On a la réponse. C'est $R$ qui fait que ça s'arrête — R dissipe l'énergie par effet Joule à chaque oscillation. Chaque cycle, le circuit perd un peu d'énergie en chaleur, et les oscillations s'amortissent.

La question suivante est naturelle : peut-on **compenser** cette perte, et ainsi maintenir les oscillations indéfiniment ?

Oui. On ajoute au circuit un **dispositif d'entretien** — un générateur spécial qui restitue exactement l'énergie perdue par effet Joule à chaque cycle. Ni plus, ni moins.

### Comment fonctionne ce dispositif

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

---

## R8 — Exercice de type bac (synthèse — à sourcer)

> **Note de provenance :** cet exercice est un exercice de synthèse de style bac, construit pour couvrir les savoir-faire de la notion. Il n'est pas tiré d'un sujet national réel identifié. Il est labellisé **à sourcer** : avant d'être présenté à un élève comme un sujet bac, il devra être remplacé ou validé par un vrai sujet national avec année et session. (Règle ADR 0019.)

### Mise en situation

Un condensateur de capacité $C = 10\ \mu\text{F}$ est chargé sous une tension $U_0 = 6\ \text{V}$. À $t = 0$, on le connecte à une bobine d'inductance $L = 0{,}1\ \text{H}$ et de résistance interne $r = 5\ \Omega$. Le circuit est fermé. On observe à l'oscilloscope la tension $u_C(t)$ aux bornes du condensateur.

L'oscillogramme montre des oscillations dont l'amplitude décroît progressivement. On mesure deux maxima successifs : le premier à $t_1 = 3\ \text{ms}$ et le deuxième à $t_2 = 9{,}4\ \text{ms}$.

**Partie 1 — Identifier le régime et établir l'équation différentielle**

**Question 1.** Quel régime d'oscillations observe-t-on ? Justifier en s'appuyant sur la description de l'oscillogramme.

*Raisonnement expert.* On lit la description : amplitude qui décroît, mais oscillations présentes. C'est la signature du régime pseudo-périodique — ni le régime périodique (amplitude constante), ni le régime apériodique (pas d'oscillations). La justification tient en deux lignes : oscillations présentes + amplitude décroissante.

**Question 2.** Établir l'équation différentielle vérifiée par la charge $q(t)$.

*Raisonnement expert.* On écrit la loi des mailles dans le circuit série complet. La bobine a une résistance interne $r$, donc sa tension est $u_L = L\frac{d^2q}{dt^2} + r\frac{dq}{dt}$. Il n'y a pas de résistance extérieure séparée ici — c'est $r$ qui joue le rôle de la résistance d'amortissement.

Loi des mailles :

$$u_C + u_L = 0$$

$$\frac{q}{C} + L\frac{d^2q}{dt^2} + r\frac{dq}{dt} = 0$$

$$\boxed{L\frac{d^2q}{dt^2} + r\frac{dq}{dt} + \frac{q}{C} = 0}$$

On s'arrête là pour le cas amorti. On n'essaie pas de résoudre cette équation en forme fermée.

**Partie 2 — Exploiter l'oscillogramme**

**Question 3.** Mesurer la pseudo-période $T$ à partir de l'oscillogramme.

*Raisonnement expert.* On repère deux maxima consécutifs et on soustrait leurs coordonnées temporelles :

$$T = t_2 - t_1 = 9{,}4\ \text{ms} - 3\ \text{ms} = 6{,}4\ \text{ms}$$

**Question 4.** Calculer la période propre $T_0$ du circuit et comparer à $T$.

*Raisonnement expert.* On utilise la formule du cas idéal — c'est la seule formule analytique qu'on a. On calcule $LC$ :

$$LC = 0{,}1 \times 10 \times 10^{-6} = 10^{-6}\ \text{s}^2 \implies \sqrt{LC} = 10^{-3}\ \text{s}$$

$$T_0 = 2\pi\sqrt{LC} = 2\pi \times 10^{-3} \approx 6{,}28\ \text{ms}$$

L'écart entre $T = 6{,}4\ \text{ms}$ et $T_0 \approx 6{,}28\ \text{ms}$ est d'environ 2 %. L'amortissement est faible, donc l'approximation $T \approx T_0$ est valide.

**Partie 3 — Bilan énergétique**

**Question 5.** Calculer l'énergie totale du circuit à $t = 0$. Où est-elle stockée ? Que devient-elle au bout d'un quart de pseudo-période ?

*Raisonnement expert.* À $t = 0$, le condensateur est chargé à $U_0$ et le courant est nul — la bobine ne stocke rien encore.

$$E(0) = E_C(0) + E_L(0) = \frac{1}{2}C U_0^2 + 0 = \frac{1}{2} \times 10^{-5} \times 36 = 1{,}8 \times 10^{-4}\ \text{J}$$

Toute l'énergie est dans le condensateur.

Un quart de pseudo-période plus tard, $u_C \approx 0$ et le courant est maximal : l'énergie est essentiellement dans la bobine. Mais comme le régime est amorti, $E(T/4) < E(0)$ — une partie a été dissipée par effet Joule dans $r$.

**Question 6.** Expliquer pourquoi les oscillations s'amortissent. Quel rôle joue $r$ ?

*Raisonnement expert.* À chaque cycle, la résistance $r$ dissipe de l'énergie sous forme de chaleur — effet Joule, puissance $P = r\,i^2 > 0$. Cette puissance est toujours positive : $r$ ne peut que prélever de l'énergie, jamais en restituer. L'énergie totale $E_C + E_L$ diminue donc à chaque oscillation, et l'amplitude décroît.

**Partie 4 — Entretien des oscillations**

**Question 7.** On ajoute au circuit un générateur délivrant $u_G(t) = k \cdot i(t)$. Établir la nouvelle équation différentielle et déterminer la valeur de $k$ qui permet d'entretenir des oscillations sinusoïdales.

*Raisonnement expert.* La loi des mailles avec le générateur :

$$u_C + u_L = u_G$$

$$\frac{q}{C} + L\frac{d^2q}{dt^2} + r\frac{dq}{dt} = k\frac{dq}{dt}$$

$$L\frac{d^2q}{dt^2} + (r - k)\frac{dq}{dt} + \frac{q}{C} = 0$$

On cherche $k$ tel que le terme d'amortissement disparaisse : il faut $r - k = 0$, donc $k = r$.

Avec $k = r$, l'équation devient $L\frac{d^2q}{dt^2} + \frac{q}{C} = 0$ — l'équation du circuit idéal. Les oscillations sont sinusoïdales, à amplitude constante, à la période propre $T_0 = 2\pi\sqrt{LC}$. Le générateur compense exactement la perte Joule à chaque cycle ; il ne fixe pas la fréquence.

$$\boxed{k = r = 5\ \Omega}$$

[[figure:regimes-uc]]

---

## R9 — Variation fraîche

> Même structure profonde que R8, enrobage différent. Le but est que tu ne puisses pas mémoriser la solution — tu dois reconnaître quelle procédure s'applique.

### Mise en situation

Un circuit comporte une bobine d'inductance $L = 0{,}4\ \text{H}$ (résistance interne négligeable) et un condensateur de capacité $C = 10\ \mu\text{F}$, en série avec un conducteur ohmique de résistance $R = 8\ \Omega$. Le condensateur est chargé à $U_0 = 4\ \text{V}$ puis le circuit est fermé à $t = 0$.

**Question 1.** Calculer $T_0$ pour ce circuit.

$$\sqrt{LC} = \sqrt{0{,}4 \times 10^{-5}} = \sqrt{4 \times 10^{-6}} = 2 \times 10^{-3}\ \text{s}$$

$$T_0 = 2\pi \times 2 \times 10^{-3} \approx 12{,}6\ \text{ms}$$

**Question 2.** Établir l'équation différentielle vérifiée par $q(t)$ dans ce circuit.

*La démarche est identique à R8, mais les valeurs changent.* Loi des mailles : $u_C + u_L + u_R = 0$, donc :

$$L\frac{d^2q}{dt^2} + R\frac{dq}{dt} + \frac{q}{C} = 0$$

$$0{,}4\,\frac{d^2q}{dt^2} + 8\,\frac{dq}{dt} + \frac{q}{10^{-5}} = 0$$

On établit et on s'arrête.

**Question 3.** On mesure sur l'oscillogramme une pseudo-période $T = 12{,}8\ \text{ms}$. L'approximation $T \approx T_0$ est-elle valide ?

L'écart : $|T - T_0| / T_0 \approx |12{,}8 - 12{,}6| / 12{,}6 \approx 1{,}6\ \%$. Oui, l'amortissement est faible, l'approximation est valide.

**Question 4.** Quelle est l'énergie initiale du circuit ? Où est-elle un quart de pseudo-période plus tard ?

$$E(0) = \frac{1}{2}C U_0^2 = \frac{1}{2} \times 10^{-5} \times 16 = 8 \times 10^{-5}\ \text{J}$$

Un quart de pseudo-période plus tard : essentiellement dans la bobine (moins une fraction dissipée par Joule dans R). Le transfert $C \to L$ a eu lieu, mais l'énergie totale a diminué.

**Question 5.** On souhaite entretenir les oscillations avec un générateur $u_G = k \cdot i$. Quelle valeur de $k$ faut-il choisir ? Quelle sera alors la période des oscillations entretenues ?

$k = R = 8\ \Omega$. La période reste $T_0 = 2\pi\sqrt{LC} \approx 12{,}6\ \text{ms}$ — fixée par $L$ et $C$, pas par $k$.
