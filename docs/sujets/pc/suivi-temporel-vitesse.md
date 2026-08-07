# `suivi-temporel-vitesse` — Suivi temporel, vitesse de réaction, temps de demi-réaction

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.
>
> Note de classement : le suivi temporel s'appuie sur une transformation lente
> (recoupe `transformations-lentes-rapides`) ; classé ici par la question
> dominante (vitesse volumique, $t_{1/2}$).

---

## 2021 — session normale — Exercice I (Partie 1)
Source: https://www.alloschool.com/element/127287
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 7 points (Partie 1 ≈ 2,5 points)
- Images lues : `.../course-422/upload-84195/0002-big.jpg`
- Pages du scan : 2 (sur 8)
- Portée : la **Partie 1 (étude cinétique)** est transcrite ici ; la **Partie 2
  (dosage d'un acide carboxylique)** du même exercice est sous
  `reactions-acido-basiques.md`. Mention en tête : « Les parties 1 et 2 sont
  indépendantes ».

**Partie 1 — Étude cinétique d'une réaction chimique.**

L'une des plus anciennes réactions de synthèse est la fabrication du savon. Le
savon est un produit composé de molécules obtenues par réaction chimique, entre
un composé organique et une solution aqueuse d'hydroxyde de sodium.

Cette partie de l'exercice se propose d'étudier, par conductimétrie, la cinétique
de la réaction de synthèse d'un savon. Cette réaction se produit entre
l'éthanoate d'éthyle de formule $\text{CH}_3\text{COOC}_2\text{H}_5$ et une
solution aqueuse d'hydroxyde de sodium
$\text{Na}^+_{(aq)} + \text{HO}^-_{(aq)}$.

À un instant choisi comme origine des dates $t = 0$, on introduit, en excès,
l'éthanoate d'éthyle dans un ballon contenant une quantité de matière
$n_0(\text{HO}^-) = 10^{-3}\ \text{mol}$ d'ions hydroxyde. On obtient un mélange
réactionnel ayant un volume $V_0 = 100\ \text{mL}$.

Il se produit, sous une température constante, une réaction modélisée par
l'équation chimique suivante :

$$\text{CH}_3\text{COOC}_2\text{H}_{5(aq)} + \text{HO}^-_{(aq)} \rightarrow \text{CH}_3\text{COO}^-_{(aq)} + \text{C}_2\text{H}_5\text{OH}_{(aq)}$$

1. (0,75) Dresser le tableau d'avancement de cette réaction et déterminer la
   valeur de l'avancement final $x_f$ sachant que cette réaction est totale.
2. On mesure, à chaque instant, la conductivité $\sigma$ du mélange réactionnel.
   La courbe de la figure 1 donne les variations de la conductivité du mélange
   réactionnel en fonction du temps. La droite $(T)$ représente la tangente à la
   courbe au point d'abscisse $t_1 = 4\ \text{min}$.
   L'expression de la conductivité $\sigma$ du mélange réactionnel en fonction de
   l'avancement $x$ de la réaction est : $\sigma = 0{,}25 - 160\,x$ où $\sigma$
   est exprimée en $\text{S.m}^{-1}$ et $x$ en mol.
   1. (0,25) Définir le temps de demi-réaction $t_{1/2}$.
   2. (0,5) À l'aide de l'expression $\sigma = f(x)$ et de la courbe de la
      figure 1, déterminer la valeur de $t_{1/2}$.
   3. (0,5) Montrer que la vitesse volumique de la réaction à un instant $t$
      s'écrit sous la forme : $v = -\dfrac{1}{160\,V_0} \cdot \dfrac{d\sigma}{dt}$.
   4. (0,5) Déterminer, en $\text{mol.m}^{-3}.\text{min}^{-1}$, la valeur $v_1$ de
      cette vitesse à l'instant $t_1 = 4\ \text{min}$.

*Figure 1 (courbe) :* axe des ordonnées $\sigma\ (\text{S.m}^{-1})$ gradué
$0{,}05,\ 0{,}1,\ 0{,}15,\ 0{,}2,\ 0{,}25$ ; axe des abscisses $t\ (\text{min})$
gradué $4,\ 8,\ 12,\ 16,\ 20$. La courbe part de $\sigma = 0{,}25\ \text{S.m}^{-1}$
à $t = 0$ et décroît (allure exponentielle) vers un palier au voisinage de
$\sigma \approx 0{,}09\ \text{S.m}^{-1}$ *(lecture d'échelle à confirmer)*. La
tangente $(T)$ (en pointillés) est tracée au point d'abscisse $t_1 = 4\ \text{min}$.

---

## 2024 — session normale — Exercice 1 (Chimie), Partie 1
Source: https://www.alloschool.com/element/145763
Statut: transcrit (non vérifié) — **1ʳᵉ passe de vérification adversariale
effectuée (agent-vérificateur-tiers, 2026-08-06)** : `element/145763` re-dérivé
indépendamment → `course-422/upload-87465`, **6 pages** ; couverture p.1 relue —
**NS 28F**, SPC/BIOF, 3 h, coef 7 ; carte du sujet
$7+2{,}5+2+3{,}5+5=\mathbf{20}$ ✓. **Énoncé (texte, valeurs, unités, barème) :
conforme**, diff caractère par caractère contre `0002-big.jpg` ($V=200$ mL,
$\theta$, $t_1=60$ h, affirmations a/b/c, unité mmol.L$^{-1}$.h$^{-1}$) ; barème
marginal recompté $0{,}75+0{,}5+1=\mathbf{2{,}25}$ ✓. **Mais la description de la
figure 1 comportait une divergence bloquante, corrigée ci-dessous** ⇒ conformément
au README §3, l'entrée **reste `transcrit (non vérifié)`** et appelle un nouveau
tour de lecture sur ce seul point.
**❌→✅ Figure 1 — confusion entre la courbe et la tangente $(T)$.** L'ancienne
description faisait partir **la courbe** de « une valeur légèrement au-dessus du
repère $0{,}2$ » à $t=0$. Relevé au pixel : **la courbe part exactement de
l'origine $(0\,;\,0)$** (encre suivie jusqu'au coin, $x=0{,}025$ mmol à $t=1{,}7$ h)
— c'est **la droite $(T)$** qui coupe l'axe des ordonnées vers $0{,}26$ mmol.
Grille mesurée : traits principaux à $x=785{,}5/844{,}5/904/963{,}5/1022{,}5/1082/
1141{,}5$ px et $y=1066/1006{,}5/947{,}5/888/828{,}5/769{,}5$ px (pas $59{,}3$ px) ;
étiquettes **40** ($x=845$) et **80** ($x=904$), **0,1** ($y=1007$) et **0,2**
($y=947$) ⇒ **1 division $=40$ h et $0{,}1$ mmol**. Le **palier vaut donc
$\simeq0{,}5$ mmol** (encre à $y=772$ px, le trait principal non chiffré de $0{,}5$
étant à $769{,}5$) — et non « une valeur non chiffrée au-dessus de 0,2 » ; il
n'y a **aucun trait pointillé** au niveau du palier (c'est la courbe elle-même qui
s'aplatit). Point de tangence marqué « × » relevé à $t\simeq60$ h,
$x\simeq0{,}41$ mmol ; pente de $(T)$ mesurée $2{,}5\cdot10^{-3}$ mmol.h$^{-1}$ ⇒
$v_{vol}(t_1)=\frac1V\frac{dx}{dt}\simeq1{,}3\cdot10^{-2}$ mmol.L$^{-1}$.h$^{-1}$
(la figure est bien exploitable pour la Q3) ; $x_{max}/2=0{,}25$ mmol donne
$t_{1/2}\simeq24$ h (Q2).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF (« شعبة العلوم التجريبية مسلك العلوم الفيزيائية
  (خيار فرنسية) ») — README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 7 points ; **Partie 1**
  = 2,25 points ($0{,}75+0{,}5+1$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0002-big.jpg`
- Pages du scan : 2 (sur 6)
- Portée : **Partie 1** (suivi temporel de la dégradation de la vitamine C).
  La **Partie 2** (dosage d'une solution aqueuse de vitamine C) du même
  exercice est transcrite sous `reactions-acido-basiques.md`. Mention en tête
  de l'exercice : « On se propose d'étudier dans cet exercice : - le suivi
  temporel de la dégradation de la vitamine C dans un jus d'orange, - le
  dosage d'une solution aqueuse contenant de la vitamine C. »

**EXERCICE 1 (7 points) : Chimie.**

*(Cadrage de l'exercice, transcrit intégralement : « L'acide ascorbique, de
formule brute $\text{C}_6\text{H}_8\text{O}_6$ appelé vitamine C, est un
antioxydant présent dans de nombreux fruits et légumes. La vitamine C
possède des propriétés rédox et acido-basiques. Cette vitamine se dégrade à
la chaleur, à l'air ;… »)*

**Partie 1 : Suivi temporel de la dégradation de la vitamine C dans un jus
d'orange.**

On dispose d'une solution (S) de jus d'orange de volume $V = 200\ \text{mL}$
à une température $\theta$. Si on expose ce jus à l'air, la vitamine C qu'il
contient se dégrade par oxydation avec le dioxygène.

On suit, par dosage, l'évolution temporelle de la dégradation de cette
vitamine. Le graphe de la figure 1 représente l'évolution temporelle de
l'avancement $x$ de la réaction d'oxydation de la vitamine C. La droite $(T)$
dans la figure 1 représente la tangente à la courbe au point d'abscisse
$t = t_1 = 60\ \text{h}$.

1. Répondre par vrai ou faux (sans justification) aux affirmations
   suivantes : (0,75 pt)
   a- La concentration initiale des réactifs est un facteur cinétique.
   b- L'évolution d'un système chimique est toujours considérée comme
      terminée au bout d'une durée égale à deux fois le temps de
      demi-réaction.
   c- Plus les chocs entre les espèces réactives sont nombreux et efficaces,
      plus la réaction chimique est rapide.
2. (0,5) Déterminer graphiquement $t_{1/2}$ le temps de demi-réaction.
3. (1) Déterminer, en unité $\text{mmol.L}^{-1}.\text{h}^{-1}$, la vitesse
   volumique de la réaction à l'instant $t_1$.

*Figure 1 (courbe) :* axe des ordonnées $x\ (\text{mmol})$, gradué (traits
principaux chiffrés) $0{,}1$ et $0{,}2$, origine $0$ ; axe des abscisses
$t\ (\text{h})$, gradué (traits principaux chiffrés) $40$ et $80$.
Sous-quadrillage bleu fin (10 carreaux par division). Le cadre compte
**6 divisions principales en abscisse** ($1$ division $=40\ \text{h}$, soit
$240\ \text{h}$ de large) et **5,5 divisions en ordonnée** ($1$ division
$=0{,}1\ \text{mmol}$) ; les traits principaux de $0{,}3$, $0{,}4$ et $0{,}5$
existent mais ne sont **pas** chiffrés.

**Courbe** : croissante et concave (allure de saturation), **partant exactement
de l'origine $(0\,;\,0)$**, montant très rapidement puis s'incurvant vers un
**palier horizontal à $\simeq 0{,}5\ \text{mmol}$** — le tracé vient se coucher
juste sous le trait principal non chiffré de $0{,}5$ et le suit jusqu'au bord
droit (aucun trait pointillé n'est ajouté pour matérialiser ce palier).

**Droite $(T)$** : droite unique, tracée en trait plein, **tangente à la courbe
au point marqué d'une croix « $\times$ »**, situé à $t_1 = 60\ \text{h}$
(entre les repères $40$ et $80$) où $x \simeq 0{,}41\ \text{mmol}$. Elle coupe
l'axe des ordonnées, à $t = 0$, à $\simeq 0{,}26\ \text{mmol}$ *(hors trait :
lecture à confirmer)* et se prolonge au-delà du point de tangence jusqu'au bord
supérieur du cadre, tandis que la courbe continue de s'incurver vers son palier.
L'étiquette « $(T)$ » est portée à droite de la droite, dans le haut du cadre.
Légende : « Figure 1 ».

---

## Contenu « suivi temporel / temps de demi-réaction » présent dans les transcriptions existantes

- **2025 N — Exercice 1 (Chimie), Partie 2** (suivi cinétique d'une
  estérification acide éthanoïque + propan-1-ol, trois conditions
  expérimentales — température et catalyseur $\text{H}_2\text{SO}_4$),
  transcrit sous `controle-catalyse.md` (`Statut: vérifié`) :
  - Q2-3 : temps de demi-réaction $t_{1/2}$ (définition graphique) ;
  - Q2-4 (0,75) : détermination graphique de $t_{1/2}$ pour l'expérience (2) ;
  - courbes $x(t)$ (avancement en mmol) pour trois expériences, dont la
    comparaison des vitesses initiales fait l'objet de ce chapitre.
  - Non repris ici en entrée autonome pour éviter la duplication : l'exercice
    est classé dans `controle-catalyse.md` (question dominante : comparaison
    de facteurs cinétiques température/catalyseur), cf. `README.md` §4.

- **2023 N — Exercice 1 (Chimie), §3** (estérification acide éthanoïque +
  méthanol, catalysée vs non catalysée), transcrit sous
  `esterification-hydrolyse.md` :
  - Q3.4 (0,5) : détermination de la valeur de $t_{1/2}$, le temps de
    demi-réaction, dans le cas de la transformation correspondant à la
    courbe $C_2$ (non catalysée).
