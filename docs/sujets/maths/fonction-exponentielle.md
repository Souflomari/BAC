# `fonction-exponentielle` — Fonction exponentielle (étude de fonction, intégrale, suite, fonction réciproque)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Problèmes/exercices d'analyse bâtis sur $e^x$. Chaque problème est
> **multi-chapitres** (voir cross-lists en note).

---

## 2019 — session normale — Exercice 4  *(filière SM)*
Source: https://www.alloschool.com/element/68482
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 10 points
- Images lues : `.../course-436/upload-54931/0004-big.jpg`, `.../0005-big.jpg`
- Pages du scan : 4 et 5 (sur 5)
- Recoupe : `calcul-integral` (Partie I Q5), `suites-numeriques` (Partie II),
  `derivabilite-etude-fonctions` (Rolle, TAF, point d'inflexion), `limites-continuite`.

**Étude d'une fonction avec $e^{-x}$ (théorèmes de Rolle et des accroissements finis, intégrale) et suite récurrente.**

**PARTIE I :** On considère la fonction $f$ définie sur $\mathbb{R}$ par : $f(x) = 4x\left(e^{-x} + \dfrac{1}{2}x - 1\right)$
et on note $(C)$ sa courbe représentative dans un repère orthonormé $(O;\vec{i},\vec{j})$

1. (0,5) Calculer $\displaystyle\lim_{x \to -\infty} f(x)$ et $\displaystyle\lim_{x \to +\infty} f(x)$
2. a) (0,5) Montrer que $f$ est dérivable sur $\mathbb{R}$ et que $(\forall x \in \mathbb{R})\ ;\ f'(x) = 4\left(e^{-x} - 1\right)(1 - x)$
   b) (0,75) Étudier les variations de $f$ sur $\mathbb{R}$, puis donner son tableau de variations.
   c) (0,5) Montrer qu'il existe un unique réel $\alpha$ dans l'intervalle $\left]\dfrac{3}{2},2\right[$ tel que $f(\alpha) = 0$ *(On prendra $e^{\frac{3}{2}} = 4,5$)*
   d) (0,25) Vérifier que : $e^{-\alpha} = 1 - \dfrac{\alpha}{2}$
3. a) (0,5) En appliquant le théorème de ROLLE à la fonction $f'$, montrer qu'il existe un réel $x_0$ de l'intervalle $]0,1[$ tel que : $f''(x_0) = 0$
   b) (0,5) En appliquant le théorème des accroissements finis à la fonction $f''$, montrer que, pour tout réel $x$ différent de $x_0$ de l'intervalle $[0,1]$, on a : $\dfrac{f''(x)}{x - x_0} > 0$
   c) (0,25) En déduire que $I\left(x_0, f(x_0)\right)$ est un point d'inflexion de la courbe $(C)$
4. a) (0,5) Étudier les branches infinies de la courbe $(C)$
   b) (0,5) Représenter graphiquement la courbe $(C)$ dans le repère $(O;\vec{i},\vec{j})$ *(On prendra : $\|\vec{i}\| = \|\vec{j}\| = 1\,cm$, $f(1) = -0,5$ et il n'est pas demandé de représenter le point $I$)*
5. a) (0,25) Vérifier que : $(\forall x \in ]-\infty,\alpha])\ ;\ f(x) \le 0$
   b) (0,75) Montrer que : $\displaystyle\int_0^\alpha f(x)\,dx = \dfrac{2}{3}\alpha\left(\alpha^2 - 3\right)$, en déduire que : $\dfrac{3}{2} < \alpha \le \sqrt{3}$
   c) (0,5) Calculer en fonction de $\alpha$, en $cm^2$, l'aire du domaine plan limité par la courbe $(C)$ et les droites d'équations respectives : $y = 0$, $x = 0$ et $x = \alpha$

**PARTIE II :** On considère la suite numérique $(u_n)_{n \in \mathbb{N}}$ définie par : $u_0 < \alpha$ et $(\forall n \in \mathbb{N})\ ;\ u_{n+1} = f(u_n) + u_n$

1. a) (0,5) Montrer par récurrence que : $(\forall n \in \mathbb{N})\ u_n < \alpha$ *(utiliser la question 5-a) de la PARTIE I)*
   b) (0,25) En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ est décroissante.
2. On suppose que $0 \le u_0$ et on pose $(\forall x \in \mathbb{R})\ ;\ g(x) = e^{-x} + \dfrac{1}{2}x - \dfrac{3}{4}$
   a) (0,5) Montrer que : $(\forall x \in \mathbb{R})\ ;\ g(x) > 0$ *(On prendra : $\ln 2 = 0,69$)*
   b) (0,5) En utilisant le résultat de la question précédente, montrer que : $(\forall n \in \mathbb{N})\ ;\ 0 \le u_n$ *(On remarque que : $f(x) + x = 4x\,g(x)$)*
   c) (0,25) Montrer que la suite $(u_n)_{n \in \mathbb{N}}$ est convergente.
   d) (0,5) Calculer $\displaystyle\lim_{n \to +\infty} u_n$
3. On suppose que $u_0 < 0$
   a) (0,5) Montrer que : $(\forall n \in \mathbb{N})\ ;\ u_{n+1} - u_n \le f(u_0)$
   b) (0,5) Montrer que : $(\forall n \in \mathbb{N})\ ;\ u_n \le u_0 + n\,f(u_0)$
   c) (0,25) En déduire $\displaystyle\lim_{n \to +\infty} u_n$

---

## 2022 — session normale — Problème  *(filière SExp)*
Source: https://www.alloschool.com/element/136586
Statut: transcrit (non vérifié)

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème du problème : 8,5 points
- Images lues : `.../course-438/upload-84495/0003-big.jpg`, `.../0004-big.jpg`
- Pages du scan : 3 et 4 (sur 4)
- Recoupe : `suites-numeriques` (Q8), `derivabilite-etude-fonctions` (fonction réciproque).

**Étude d'une fonction avec $e^{x/2}$ (concavité, points d'inflexion, fonction réciproque) et suite.**

On considère la fonction numérique $f$ définie sur $\mathbb{R}$ par $f(x) = x\left(e^{\frac{x}{2}} - 1\right)^2$
Soit $(C)$ sa courbe représentative dans un repère orthonormé $(O;\vec{i},\vec{j})$ *(unité : 1 cm)*

1. (0,5) Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ et $\displaystyle\lim_{x \to -\infty} f(x)$
2. (0,5) Calculer $\displaystyle\lim_{x \to +\infty} \dfrac{f(x)}{x}$ et interpréter géométriquement le résultat
3. a) (0,5) Montrer que la droite $(\Delta)$ d'équation $y = x$ est asymptote à la courbe $(C)$ au voisinage de $-\infty$
   b) (0,75) Étudier le signe de $(f(x) - x)$ pour tout $x$ de $\mathbb{R}$ et en déduire la position relative de la courbe $(C)$ et la droite $(\Delta)$
4. a) (0,5) Montrer que $f'(x) = \left(e^{\frac{x}{2}} - 1\right)^2 + x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}} - 1\right)$ pour tout $x$ de $\mathbb{R}$
   b) (0,5) Vérifier que $x\left(e^{\frac{x}{2}} - 1\right) \ge 0$ pour tout $x$ de $\mathbb{R}$ puis en déduire le signe de la fonction dérivée $f'$ sur $\mathbb{R}$
   c) (0,25) Dresser le tableau des variations de la fonction $f$ sur $\mathbb{R}$
5. a) (0,5) Montrer que $f''(x) = \dfrac{1}{2}e^{\frac{x}{2}}g(x)$ ; où $g(x) = (2x + 4)e^{\frac{x}{2}} - x - 4$ pour tout $x$ de $\mathbb{R}$
   b) (0,5) À partir de la courbe ci-contre de la fonction $g$, déterminer le signe de $g(x)$ sur $\mathbb{R}$ *(Remarque : $g(\alpha) = 0$)*

   *Figure $(C_g)$ :* courbe de $g$ ; négative sur $]-\infty,\alpha[$, s'annule en $x = \alpha \approx -4,5$, positive au-delà ; passe par un minimum (ordonnée $\approx -2$) au voisinage de $x = -2$, croît ensuite fortement (dépasse $+4$ vers $x \approx 1$). *(lecture d'échelle à confirmer)*

   c) (0,5) Étudier la concavité de la courbe $(C)$ et déterminer les abscisses des deux points d'inflexions.
6. (1) Construire la courbe $(C)$ dans le repère $(O;\vec{i},\vec{j})$. *(On prend : $\ln(4) \approx 1,4$, $\alpha \approx -4,5$ et $f(\alpha) \approx -3,5$)*
7. a) (0,5) Montrer que la fonction $f$ admet une fonction réciproque $f^{-1}$ définie sur $\mathbb{R}$
   b) (0,25) Calculer $\left(f^{-1}\right)'(\ln 4)$
8. Soit $(u_n)$ la suite numérique définie par $u_0 = 1$ et $u_{n+1} = f(u_n)$ pour tout $n$ de $\mathbb{N}$
   a) (0,5) Montrer par récurrence que $0 < u_n < \ln 4$ pour tout $n$ de $\mathbb{N}$
   b) (0,5) Montrer que la suite $(u_n)$ est décroissante.
   c) (0,25) En déduire que la suite $(u_n)$ est convergente.
   d) (0,5) Calculer la limite de la suite $(u_n)$.
