# `rlc-serie` — Oscillations libres dans un circuit RLC série

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3. Provenance sur chaque entrée.
>
> ⚠ Rappel de périmètre (cadre `rlc_serie`, cf.
> `content/pc/rlc-serie/_mined-reference.md`) : la **seule** solution analytique
> au programme est le cas **non amorti** (LC idéal / entretenu). Le régime amorti
> se limite à l'**établissement de l'équation différentielle** et à
> l'interprétation énergétique (pas de pseudo-période $f(R,L,C)$, pas de
> coefficient d'amortissement en forme close). Les deux exercices ci-dessous
> respectent ce périmètre : ils demandent l'équa. diff. du cas amorti puis
> traitent le cas **sinusoïdal** (LC ou entretenu).

---

## 2019 — session normale — Exercice III (partie II)
Source: https://www.alloschool.com/element/68300
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 4,5 points
- Images lues : `.../course-422/upload-54757/0004-big.jpg`, `.../0005-big.jpg`
- Pages du scan : 4 et 5 (sur 7)
- Portée : **Partie II (oscillations LC)**. La Partie I (charge RC) et le schéma
  (figure 1, mêmes $E,R,C,L,K$) sont transcrits sous `rc-charge.md`.

**Charge et décharge d'un condensateur — II. Étude des oscillations électriques
dans le circuit LC.**

Une fois que le régime permanent est établi, on bascule l'interrupteur $K$ en
position (2) à un instant choisi comme nouvelle origine des dates ($t=0$). On
visualise, à l'aide d'un dispositif adéquat, les variations de la tension $u_c$
aux bornes du condensateur en fonction du temps.

1. (0,25) Montrer que l'équation différentielle vérifiée par la tension
   $u_c(t)$ aux bornes du condensateur s'écrit :
   $$\dfrac{d^{2}u_c}{dt^{2}} + \dfrac{1}{LC}\, u_c = 0.$$
2. L'une des trois courbes (a), (b) ou (c) de la figure 3 représente, pour cette
   expérience, l'évolution de la tension $u_c(t)$.
   1. (0,5) Indiquer la courbe qui représente l'évolution de la tension $u_c(t)$
      lors de cette expérience. Justifier votre réponse.
   2. (0,25) Trouver la période propre $T_0$ de l'oscillateur LC.
3. (0,5) Déterminer l'inductance $L$ de la bobine. (On prend $\pi^{2} = 10$).
4. À l'aide de la courbe représentant l'évolution de la tension $u_c(t)$ pour
   cette expérience :
   1. (0,5) Trouver l'énergie totale $E_t$ du circuit.
   2. (0,5) En déduire l'énergie magnétique $E_{m1}$ emmagasinée dans la bobine
      à l'instant $t_1 = 12\ \text{ms}$.

*Figure 3 (trois courbes $u_c(\text{V})$ vs $t(\text{ms})$, ordonnées graduées de
$-10$ à $10$, abscisses avec repères $10$ et $20$) :*
- **(a)** : part de $u_c = +10\ \text{V}$ à $t=0$, oscillation d'**amplitude
  décroissante** (allure pseudopériodique) — premier minimum $\approx -6\
  \text{V}$ vers $t\approx 10$, remontée à $\approx +4\ \text{V}$ vers $t\approx
  20$.
- **(b)** : part de $u_c = +10\ \text{V}$ (**maximum**) à $t=0$, sinusoïde
  d'**amplitude constante** $10\ \text{V}$ ; minimum $-10\ \text{V}$ vers
  $t\approx 10$, maximum $+10\ \text{V}$ vers $t\approx 20$ (période $\approx 20\
  \text{ms}$).
- **(c)** : sinusoïde d'amplitude constante $10\ \text{V}$, mais **déphasée** —
  à $t=0$ elle **ne part pas d'un extremum** (démarre près de zéro puis croît)
  *(lecture d'échelle du départ à confirmer)*.

---

## 2018 — session normale — Exercice III (partie II)
Source: https://www.alloschool.com/element/57726
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points
- Images lues : `.../course-422/upload-45118/0006-big.jpg`
- Pages du scan : 6 (sur 8)
- Portée : **Partie II (circuit RLC série)**. Les parties I-1 / I-2 (capacité
  d'un condensateur, décharge RC) sont sous `rc-charge.md`.

**Détermination expérimentale de la capacité d'un condensateur / Étude d'un
circuit RLC série — II. Étude d'un circuit RLC série.**

Un élève de la même classe réalise le montage représenté sur la figure 5 qui
comporte :
- un condensateur, totalement chargé, de capacité $C = 2,5\ \mu\text{F}$ ;
- une bobine d'inductance $L$ et de résistance $r$ ;
- un interrupteur $K$.

Après fermeture du circuit, on visualise, à l'aide d'un système d'acquisition
informatisé, des oscillations pseudopériodiques représentant les variations de la
charge $q(t)$ du condensateur.

1. (0,25) Pourquoi observe-t-on des oscillations pseudopériodiques ?
2. Pour obtenir des oscillations électriques entretenues, un générateur $G$
   délivrant une tension proportionnelle à l'intensité du courant
   $u_G(t) = k\, i(t)$ est inséré en série dans le circuit précédent.
   1. (0,5) Établir l'équation différentielle vérifiée par la charge $q(t)$.
   2. (0,25) En ajustant le paramètre $k$ sur la valeur $k = 5$ (exprimée dans le
      système d'unités international), les oscillations deviennent sinusoïdales
      (figure 6). Déterminer la valeur de $r$.
   3. (0,75) En exploitant la courbe de la figure 6, trouver la valeur de
      l'inductance $L$ de la bobine.

*Figure 5 (schéma) :* circuit série entre bornes $A$ et $B$ : condensateur $C$,
interrupteur $K$, et bobine notée $(L, r)$.

*Figure 6 (courbe) :* $q\ (\mu\text{C})$ en fonction de $t\ (\text{ms})$ ;
sinusoïde d'**amplitude constante** oscillant entre $+q_m$ et $-q_m$ (valeur
$q_m$ non chiffrée sur l'axe, repérée par un trait). Abscisses graduées $1,\ 2,\
3,\ 4$ ; les maxima successifs apparaissent vers $t\approx 1\ \text{ms}$ puis
$t\approx 3\ \text{ms}$ (période $\approx 2\ \text{ms}$) *(lecture d'échelle à
confirmer)*.
