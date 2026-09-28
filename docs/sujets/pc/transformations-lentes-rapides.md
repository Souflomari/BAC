# `transformations-lentes-rapides` — Transformations rapides et lentes d'un système chimique

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.
>
> Statut de couverture : **une entrée dédiée sourcée** (2010 normale). Une
> transformation **lente** (hydrolyse basique / saponification d'un ester) y est
> suivie dans le temps par conductimétrie (décroissance de $G$, temps de
> demi-réaction $t_{1/2}$) — le fait que la transformation soit **lente** est ce
> qui rend possible ce suivi temporel, par opposition aux réactions
> instantanées. Recoupe `suivi-temporel-vitesse` et `controle-catalyse`
> (pour la comparaison directe rapide/lente selon les facteurs cinétiques, voir
> aussi l'entrée 2025 sous `controle-catalyse.md`).

---

## 2010 — session normale — Exercice de Chimie (Première partie)
Source: https://www.alloschool.com/element/94443
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-14)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28 · Barème de l'exercice de Chimie complet : 7 points ;
  Première partie (suivi de l'hydrolyse) = 4,25 points (0,75 + 1 + 1 + 0,5 + 1)
- Images lues (reproductibilité) : `.../course-422/upload-70311/0002-big.jpg`
  (Première partie + figure 1) ; `.../0003-big.jpg` (Deuxième partie, pile à
  combustible)
- Pages du scan : 2 (sur 6)
- Portée : **Première partie** (suivi cinétique par conductimétrie d'une
  transformation lente). La **Deuxième partie** (pile à combustible
  méthanol / dioxygène) relève de `piles`.

**Étude de l'hydrolyse d'un ester en milieu basique (transformation lente,
suivi conductimétrique).**

*Chapeau (transcrit) :* « L'hydrolyse basique des esters est un moyen de
préparation des alcools à partir de produits naturels, en plus d'autres
applications dans le domaine médical et industriel. » Le but de cet exercice est
de suivre, par conductimétrie, l'évolution de la réaction du méthanoate de
méthyle avec une solution d'hydroxyde de sodium, et l'étude d'une pile à
combustible utilisant le méthanol résultant.

**Données :**
- Toutes les mesures sont effectuées à $25\ ^\circ\text{C}$ ;
- Conductance à un instant $t$ : $G = k\,\sum \lambda_i[X_i]$, avec $\lambda_i$
  conductivité molaire ionique de l'ion $X_i$ et $k$ constante de la cellule de
  mesure de valeur $k = 0{,}01\ \text{m}$ ;
- Conductivités molaires ioniques :
  $\lambda(\text{Na}^+_{aq}) = 5{,}01\cdot10^{-3}$,
  $\lambda(\text{OH}^-_{aq}) = 19{,}9\cdot10^{-3}$,
  $\lambda(\text{HCO}_{2\,aq}^-) = 5{,}46\cdot10^{-3}$ (en $\text{S}\cdot\text{m}^2\cdot\text{mol}^{-1}$) ;
- On néglige la concentration des ions hydronium $\text{H}_3\text{O}^+$ devant les
  autres concentrations des ions présents dans le mélange réactionnel.

On verse dans un bécher un volume $V = 2\cdot10^{-4}\ \text{m}^3$ d'une solution
$S_B$ d'hydroxyde de sodium de concentration molaire $C_B = 10\ \text{mol}\cdot\text{m}^{-3}$,
et on y ajoute à l'instant $t_0$ considéré comme origine des temps, une quantité
de matière $n_E$ du méthanoate de méthyle égale à la quantité de matière $n_B$
d'hydroxyde de sodium ($n_E = n_B$). (On considère que le volume reste constant
$V = 2\cdot10^{-4}\ \text{m}^3$.)
Une étude expérimentale a permis de tracer la courbe représentative des
variations de la conductance $G$ du mélange en fonction du temps (Figure 1).
On modélise la réaction étudiée par l'équation de réaction suivante :
$$\text{HCO}_2\text{CH}_{3(aq)} + \text{OH}^-_{aq} \;\longrightarrow\; \text{HCO}_{2(aq)}^- + \text{CH}_3\text{OH}_{(aq)}$$

1. **1.** (0,75) Faire l'inventaire des ions présents dans le mélange à un
   instant $t$.
2. **2.** (1) Construire le tableau descriptif de l'évolution de cette
   transformation. (On notera $x$ l'avancement de la réaction à l'instant $t$.)
3. **3.** (1) Montrer que la conductance $G$ dans le milieu réactionnel vérifie
   la relation : $G = -0{,}72\,x + 2{,}5\cdot10^{-3}$ (S).
4. **4.** (0,5) Justifier la décroissance de la conductance $G$ au cours de la
   réaction.
5. **5.** (1) Déterminer la valeur du temps de demi-réaction $t_{1/2}$.

*Figure 1 (courbe) :* axe des ordonnées $G\ (\text{mS})$ gradué $0{,}5 ;\ 1 ;\
1{,}5 ;\ 2 ;\ 2{,}5$ ; axe des abscisses $t\ (\text{min})$ gradué de $0$ à $90$
(par pas de $10$). La courbe part d'une valeur initiale voisine de
$G \approx 2{,}5\ \text{mS}$ à $t = 0$ et **décroît** de façon monotone vers un
palier voisin de $G \approx 1\ \text{mS}$ *(lectures d'échelle à confirmer sur le
corrigé)*.

---

## Contenu « transformation lente » présent dans les transcriptions existantes

- **2021 N — Ex I Partie 1** (cinétique de la saponification de l'éthanoate
  d'éthyle par les ions hydroxyde), transcrit intégralement sous
  `suivi-temporel-vitesse.md` : transformation **lente** suivie par
  conductimétrie (vitesse volumique, temps de demi-réaction $t_{1/2}$).

> **Partiellement résolu (v0.3)** : l'entrée dédiée **2010 N** ci-dessus fournit
> une **transformation lente** (saponification) suivie dans le temps. Pour la
> **comparaison directe des vitesses** selon les facteurs cinétiques (température,
> catalyseur), voir aussi l'entrée **2025 N** sous `controle-catalyse.md` (courbes
> (a)/(b)/(c) d'une même estérification). Un exercice opposant frontalement une
> réaction **instantanée** (précipitation / acido-basique) à une réaction
> **lente** (oxydoréduction) resterait un complément idéal — piste : sessions
> rattrapage non encore lues.
