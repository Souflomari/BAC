# `fonction-logarithme` — Fonction logarithme népérien (étude de fonction, intégrale, suite)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Problèmes d'analyse de l'épreuve **Sciences Expérimentales** bâtis sur $\ln$.
> Chaque problème est **multi-chapitres** : la plupart recoupent
> `calcul-integral` (intégration par parties) et `suites-numeriques` (voir
> cross-lists en note) ; les problèmes 2021 (IPP) et 2024 (aire) recoupent
> `calcul-integral` mais ne comportent pas de volet suites.

---

## 2019 — session normale — Problème
Source: https://www.alloschool.com/element/68527
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan, y compris les figures (tableau de variation de $f'$ et courbe $(C_g)$) ; filière et code NS..F confirmés sur l'en-tête du scan.

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème du problème : 11 points
- Images lues : `.../course-438/upload-54971/0003-big.jpg`, `.../0004-big.jpg`
- Pages du scan : 3 et 4 (sur 4)
- Recoupe : `calcul-integral` (Q6, IPP) et `suites-numeriques` (2ᵉ partie).

**Étude d'une fonction avec $\ln$, calcul intégral et suite numérique.**

**Première partie :**

Soit $f$ la fonction numérique définie sur $]0,+\infty[$ par : $f(x) = x + \dfrac{1}{2} - \ln x + \dfrac{1}{2}(\ln x)^2$
et $(C)$ sa courbe représentative dans un repère orthonormé $(O,\vec{i},\vec{j})$ *(unité : 1 cm)*

1. (0,5) Calculer $\displaystyle\lim_{\substack{x \to 0 \\ x > 0}} f(x)$ puis interpréter le résultat géométriquement
2. a) (0,25) Vérifier que pour tout $x$ de $]0,+\infty[$, $f(x) = x + \dfrac{1}{2} + \left(\dfrac{1}{2}\ln x - 1\right)\ln x$
   b) (0,5) En déduire que $\displaystyle\lim_{x \to +\infty} f(x) = +\infty$
   c) (0,5) Montrer que pour tout $x$ de $]0,+\infty[$, $\dfrac{(\ln x)^2}{x} = 4\left(\dfrac{\ln\sqrt{x}}{\sqrt{x}}\right)^2$ puis en déduire que $\displaystyle\lim_{x \to +\infty} \dfrac{(\ln x)^2}{x} = 0$
   d) (0,75) Montrer que $(C)$ admet au voisinage de $+\infty$ une branche parabolique de direction asymptotique la droite $(\Delta)$ d'équation $y = x$
3. a) (0,5) Montrer que pour tout $x$ de $]0,1]$ : $(x-1) + \ln x \le 0$ et que pour tout $x$ de $[1,+\infty[$ : $(x-1) + \ln x \ge 0$
   b) (1) Montrer que pour tout $x$ de $]0,+\infty[$, $f'(x) = \dfrac{x - 1 + \ln x}{x}$
   c) (0,5) Dresser le tableau de variations de la fonction $f$
4. a) (0,5) Montrer que $f''(x) = \dfrac{2 - \ln x}{x^2}$ pour tout $x$ de $]0,+\infty[$
   b) (0,5) En déduire que $(C)$ admet un point d'inflexion dont on déterminera les coordonnées.
5. a) (0,5) Montrer que pour tout $x$ de $]0,+\infty[$, $f(x) - x = \dfrac{1}{2}(\ln x - 1)^2$ et déduire la position relative de $(C)$ et $(\Delta)$
   b) (1) Construire $(\Delta)$ et $(C)$ dans le même repère $(O,\vec{i},\vec{j})$
6. a) (0,5) Montrer que la fonction $H : x \mapsto x\ln x - x$ est une primitive de la fonction $h : x \mapsto \ln x$ sur $]0,+\infty[$
   b) (0,75) À l'aide d'une intégration par parties, montrer que $\displaystyle\int_1^e (\ln x)^2\, dx = e - 2$
   c) (0,5) Calculer en $cm^2$ l'aire du domaine plan limité par $(C)$ et $(\Delta)$ et les droites d'équations $x = 1$ et $x = e$

**Deuxième partie :**

Soit $(u_n)$ la suite numérique définie par : $u_0 = 1$ et $u_{n+1} = f(u_n)$ pour tout $n$ de $\mathbb{N}$

1. a) (0,5) Montrer par récurrence que $1 \le u_n \le e$ pour tout $n$ de $\mathbb{N}$
   b) (0,5) Montrer que la suite $(u_n)$ est croissante.
   c) (0,5) En déduire que la suite $(u_n)$ est convergente.
2. (0,75) Calculer la limite de la suite $(u_n)$.

---

## 2021 — session normale — Problème
Source: https://www.alloschool.com/element/127180
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-438/upload-84139, page(s) 3-4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Expérimentales — شعبة العلوم التجريبية مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème du problème : 9 points
- Images lues : `.../course-438/upload-84139/0003-big.jpg`, `.../0004-big.jpg`
- Pages du scan : 3 et 4 (sur 4)
- Intitulé composantes (page 1 du scan) : « Etude de fonctions numériques et calcul intégral » — 9 points
- Remarque (source) : la page AlloSchool `element/127180` est titrée « Maths
  Sciences et Technologies » — mislabel ; l'en-tête arabe du scan (ligne de
  filière ci-dessus, p. 1) fait foi.
- Classement : la fonction étudiée $f(x) = 2x\ln x - 2x$ (prolongée par
  $f(0) = 0$) est bâtie sur $\ln$ ($e$ n'apparaît que comme borne
  d'intégration et dans la constante $e^{\frac{3}{2}} \simeq 4.5$ du tracé)
  → `fonction-logarithme`.
- Recoupe : `calcul-integral` (Q5 — IPP puis intégrale de $f$),
  `derivabilite-etude-fonctions` (Q3-a taux d'accroissement en $0$, Q3-b/c
  dérivée et tableau de variations, Q7 fonction réciproque, Q8 dérivabilité
  à gauche en $0$), `limites-continuite` (Q1, Q2, Q3-a, Q8-a). **Pas de
  volet suites** dans ce problème (les suites sont l'Exercice 2 autonome,
  voir `suites-numeriques.md`).

> **Note de lecture (mojibake)** : aucun

**Fonction logarithme (étude de $f(x) = 2x\ln x - 2x$ prolongée en $0$ : continuité à droite, branches infinies, tableau de variations, IPP, minimum et inégalité, fonction réciproque, fonction définie par morceaux).**

Soit la fonction $f$ définie sur $[0, +\infty[$ par : $f(0) = 0$ et $f(x) = 2x\ln x - 2x$ si $x > 0$
et $(C)$ sa courbe représentative dans un repère orthonormé $(O, \vec{i}, \vec{j})$ *(unité : 1cm)*

1. (0,5) Montrer que $f$ est continue à droite au point $0$.
2. a) (0,5) Calculer $\displaystyle\lim_{x \to +\infty} f(x)$
   b) (0,5) Calculer $\displaystyle\lim_{x \to +\infty} \dfrac{f(x)}{x}$ puis interpréter géométriquement le résultat
3. a) (0,75) Calculer $\displaystyle\lim_{x \to 0^+} \dfrac{f(x)}{x}$ et interpréter géométriquement le résultat
   b) (0,5) Calculer $f'(x)$ pour tout $x$ de $]0, +\infty[$
   c) (0,5) Dresser le tableau de variations de la fonction $f$ sur $[0, +\infty[$
4. a) (0,5) Résoudre dans l'intervalle $]0, +\infty[$ les équations $f(x) = 0$ et $f(x) = x$
   b) (1) Construire la courbe $(C)$ dans le repère $(O, \vec{i}, \vec{j})$ *(on prend $e^{\frac{3}{2}} \simeq 4.5$)*
5. a) (0,5) En utilisant une intégration par parties, montrer que $\displaystyle\int_1^e x\ln x\, dx = \dfrac{1 + e^2}{4}$
   b) (0,5) En déduire : $\displaystyle\int_1^e f(x)\, dx$
6. a) (0,25) Déterminer le minimum de $f$ sur $]0, +\infty[$
   b) (0,5) En déduire que pour tout $x$ de $]0, +\infty[$, $\ln x \ge \dfrac{x - 1}{x}$
7. Soit $g$ la restriction de la fonction $f$ à l'intervalle $[1, +\infty[$
   a) (0,5) Montrer que la fonction $g$ admet une fonction réciproque $g^{-1}$ définie sur un intervalle $J$ qu'on déterminera.
   b) (0,75) Construire dans le même repère $(O, \vec{i}, \vec{j})$ la courbe représentative de la fonction $g^{-1}$
8. On considère la fonction $h$ définie sur $\mathbb{R}$ par $\begin{cases} h(x) = x^3 + 3x & ;\ x \le 0 \\ h(x) = 2x\ln x - 2x & ;\ x > 0 \end{cases}$
   a) (0,5) Etudier la continuité de $h$ au point $0$
   b) (0,5) Etudier la dérivabilité de la fonction $h$ à gauche au point $0$ puis interpréter géométriquement le résultat.
   c) (0,25) La fonction $h$ est-elle dérivable au point $0$ ? justifier.

---

## 2023 — session normale — Problème
Source: https://www.alloschool.com/element/137482
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan, y compris les figures (tableau de variation de $f'$ et courbe $(C_g)$) ; filière et code NS..F confirmés sur l'en-tête du scan.

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème du problème : 11 points
- Images lues : `.../course-438/upload-84924/0003-big.jpg`, `.../0004-big.jpg`
- Pages du scan : 3 et 4 (sur 4)
- Recoupe : `calcul-integral` (Q6, IPP) et `suites-numeriques` (Q7).

**Étude d'une fonction avec $\ln$, points d'inflexion, calcul intégral et suite.**

On considère la fonction numérique $f$ définie sur $]0,+\infty[$ par $f(x) = 2 - \dfrac{2}{x} + (1 - \ln x)^2$
Soit $(C_f)$ sa courbe représentative dans un repère orthonormé $(O,\vec{i},\vec{j})$ *(unité : 1 cm)*.

1. a) (0,25) Vérifier que pour tout $x \in ]0,+\infty[$ : $f(x) = \dfrac{3x - 2 - 2x\ln x + x(\ln x)^2}{x}$
   b) (0,5) Montrer que $\displaystyle\lim_{x \to 0^+} x(\ln x)^2 = 0$ et que $\displaystyle\lim_{x \to +\infty} \dfrac{(\ln x)^2}{x} = 0$ *(On peut poser : $t = \sqrt{x}$)*
   c) (0,5) Déduire que $\displaystyle\lim_{x \to 0^+} f(x) = -\infty$, puis donner une interprétation géométrique du résultat.
   d) (0,75) Calculer $\displaystyle\lim_{x \to +\infty} f(x)$, puis montrer que la courbe $(C_f)$ admet une branche parabolique de direction l'axe des abscisses au voisinage de $+\infty$
2. (0,5) Montrer que pour tout $x \in ]0,+\infty[$ : $f'(x) = \dfrac{2(1 - x + x\ln x)}{x^2}$
3. En exploitant le tableau de variation ci-dessous, de la fonction dérivée $f'$ de $f$ sur $]0,+\infty[$ *(On donne $\beta \approx 4.9$)* :

   *Tableau (figure) :* variable $x$ de $0$ à $+\infty$ avec valeurs remarquables $1$ et $\beta$. $f'(x)$ part de $+\infty$ en $0^+$, **décroît jusqu'à $0$** en $x = 1$, **croît jusqu'à $f'(\beta)$**, puis **décroît vers $0$** en $+\infty$. (Donc $f'(x) \ge 0$ sur $]0,+\infty[$, nul seulement en $x = 1$.)

   a) (0,5) Prouver que $f$ est strictement croissante sur $]0,+\infty[$ puis dresser le tableau de variations de $f$
   b) (0,5) Donner le tableau de signe de la dérivée seconde $f''$ de la fonction $f$ sur $]0,+\infty[$
   c) (1) Déduire la concavité de la courbe $(C_f)$ en précisant les abscisses de ses deux points d'inflexion.
4. La courbe $(C_g)$ ci-contre est la représentation graphique de la fonction $g : x \mapsto f(x) - x$ et qui s'annule en $\alpha$ et $1$ ($\alpha \approx 0,3$). Soit $(\Delta)$ la droite d'équation $y = x$.

   *Figure $(C_g)$ :* courbe sur $]0,+\infty[$ ; négative (venant de $\approx -3$) puis croissante, coupe l'axe des abscisses en $x = \alpha \approx 0,3$, atteint un maximum positif faible (ordonnée $< 0,5$) entre $\alpha$ et $1$, recoupe l'axe en $x = 1$, puis décroît en restant négative (passe vers $-1$ au voisinage de $x = 2,5$, tend vers $\approx -2,5$ vers $x = 4$). *(lecture d'échelle à confirmer)*

   a) (0,5) À partir de la courbe $(C_g)$, déterminer le signe de la fonction $g$ sur $]0,+\infty[$
   b) (0,5) Déduire que la droite $(\Delta)$ est en dessous de $(C_f)$ sur l'intervalle $[\alpha,1]$ et au-dessus de $(C_f)$ sur les intervalles $]0,\alpha]$ et $[1,+\infty[$
5. (1,5) Construire la courbe $(C_f)$ et la droite $(\Delta)$ dans le repère $(O,\vec{i},\vec{j})$. *(On prend : $\alpha \approx 0,3$, $\beta \approx 4,9$ et $f(\beta) \approx 1,9$)*
6. a) (0,5) Vérifier que la fonction $x \mapsto 2x - x\ln x$ est une primitive de la fonction $x \mapsto 1 - \ln x$ sur $[\alpha,1]$
   b) (1) En utilisant une intégration par parties, montrer que $\displaystyle\int_\alpha^1 (1 - \ln x)^2\, dx = 5(1 - \alpha) + \alpha(4 - \ln\alpha)\ln\alpha$
   c) (0,75) Déduire en fonction de $\alpha$ l'aire de la partie du plan délimitée par la courbe $(C_f)$, l'axe des abscisses et les droites d'équations $x = \alpha$ et $x = 1$
7. Soit la suite numérique $(u_n)$ définie par $u_0 \in ]\alpha,1[$ et la relation $u_{n+1} = f(u_n)$, pour tout $n \in \mathbb{N}$
   a) (0,5) Montrer par récurrence que $\alpha < u_n < 1$, pour tout $n$ de $\mathbb{N}$
   b) (0,5) Montrer que la suite $(u_n)$ est croissante. *(on peut utiliser la question 4) b))*
   c) (0,75) En déduire que la suite $(u_n)$ est convergente et calculer sa limite.

---

## 2024 — session normale — Problème
Source: https://www.alloschool.com/element/144505
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-438/upload-87124, page(s) 4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Expérimentales — مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème du problème : 8 points
- Images lues : `.../course-438/upload-87124/0004-big.jpg`
- Pages du scan : 4 (sur 4) *(le problème tient sur la seule page 4)*
- Intitulé composantes (page 1 du scan) : « Etude de fonctions numériques et calcul intégral » — 8 points
- Classement : la fonction étudiée $f(x) = x + 1 - \ln\left(e^x - x\right)$ est bâtie sur $\ln$ (l'exponentielle apparaît à l'intérieur du logarithme ; la Partie I sur $u(x) = e^x$ sert à justifier $e^x - x > 0$, donc l'ensemble de définition du $\ln$).
- Recoupe : `calcul-integral` (Partie I, Q3 — aire) et `derivabilite-etude-fonctions` (fonction réciproque, Partie II Q5). **Pas de volet suites** dans ce problème (les suites sont l'Exercice 1 autonome, voir `suites-numeriques.md`).

> **Note de lecture (mojibake)** : aucun

**Fonction logarithme (étude de $x + 1 - \ln(e^x - x)$ : branche parabolique, points fixes, fonction réciproque) et calcul d'aire.**

**Partie I :** On considère les deux fonctions $u$ et $v$ définies sur $\mathbb{R}$ par : $u(x) = e^x$ et $v(x) = x$

1. (0,5) Tracer dans un même repère orthonormé les courbes $(\mathcal{C}_u)$ et $(\mathcal{C}_v)$ des fonctions $u$ et $v$
2. (0,25) Justifier graphiquement que $e^x - x > 0$ pour tout $x$ de $\mathbb{R}$
3. (0,5) Calculer l'aire de la partie du plan délimitée par la courbe $(\mathcal{C}_u)$, la courbe $(\mathcal{C}_v)$ et les droites d'équations $x = 0$ et $x = 1$

**Partie II :** On considère la fonction numérique $f$ définie par $f(x) = x + 1 - \ln\left(e^x - x\right)$.

1. a) (0,25) Vérifier que $f$ est définie sur $\mathbb{R}$
   b) (0,5) Montrer que pour tout $x \in \mathbb{R}$, $f(x) = 1 - \ln\left(1 - xe^{-x}\right)$
   c) (0,5) En déduire que $\displaystyle\lim_{x \to +\infty} f(x) = 1$, puis interpréter géométriquement ce résultat.
2. a) (0,25) Calculer $\displaystyle\lim_{x \to -\infty} f(x)$
   b) (0,5) Vérifier que pour tout $x < 0$, $f(x) = x + 1 - \ln(-x) - \ln\left(1 - \dfrac{1}{xe^{-x}}\right)$
   c) (0,75) Calculer $\displaystyle\lim_{x \to -\infty} \dfrac{f(x)}{x}$ puis déduire que la courbe $(\mathcal{C}_f)$ admet une branche parabolique de direction la droite d'équation $y = x$ au voisinage de $-\infty$
3. a) (0,5) Montrer que pour tout $x \in \mathbb{R}$ : $f'(x) = \dfrac{1 - x}{e^x - x}$
   b) (0,5) Étudier le signe de la fonction dérivée de $f$, puis déduire le tableau de variations de $f$ sur $\mathbb{R}$
   c) (0,75) Montrer que l'équation $f(x) = 0$ admet une solution unique dans l'intervalle $]-1, 0[$
4. La courbe $(\mathcal{C}_f)$ ci-contre est la représentation graphique de $f$ dans un repère orthonormé.

   > **Figure (description d'après le scan)** : repère orthonormé quadrillé, axe des abscisses gradué de $-4$ à $4$, axe des ordonnées gradué de $-3$ à $4$. Deux tracés : **(1)** une droite passant par l'origine, de pente $1$ — la droite d'équation $y = x$, non étiquetée sur le scan ; **(2)** la courbe $(\mathcal{C}_f)$, étiquetée « $(\mathcal{C}_f)$ » vers $(3\,;\,1{,}2)$. La courbe monte depuis le coin inférieur gauche du cadre (où elle est **sous** la droite et plus pentue qu'elle), coupe la droite en un point du troisième quadrant d'abscisse $\approx -2{,}7$ *(lecture à confirmer)*, coupe l'axe des abscisses en un point unique d'abscisse comprise entre $-1$ et $0$, passe par le point $(0\,;\,1)$, atteint un maximum d'ordonnée $\approx 1{,}5$ en $x = 1$ *(lecture à confirmer)*, recoupe la droite en un point d'abscisse comprise entre $1$ et $2$, puis décroît lentement vers l'ordonnée $1$ (cohérent avec l'asymptote horizontale $y = 1$ de la question 1-c) en restant **sous** la droite. Les deux intersections courbe–droite correspondent aux solutions $\alpha$ et $\beta$ de la question 4-a).

   a) (0,5) Justifier graphiquement que l'équation $f(x) = x$ admet deux solutions $\alpha$ et $\beta$.
   b) (0,5) Montrer que : $e^{\alpha} - e^{\beta} = \alpha - \beta$
5. Soit $g$ la restriction de la fonction $f$ sur l'intervalle $I = ]-\infty, 1]$
   a) (0,5) Montrer que $g$ admet une fonction réciproque $g^{-1}$ définie sur un intervalle $J$ que l'on déterminera. *(Il n'est pas demandé de déterminer $g^{-1}(x)$)*
   b) (0,75) Vérifier que $g^{-1}$ est dérivable en $1$ et calculer $\left(g^{-1}\right)'(1)$
