# `fonction-logarithme` — Fonction logarithme népérien (étude de fonction, intégrale, suite)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Problèmes d'analyse de l'épreuve **Sciences Expérimentales** bâtis sur $\ln$.
> Chaque problème est **multi-chapitres** : il recoupe `calcul-integral`
> (intégration par parties) et `suites-numeriques` (voir cross-lists en note).

---

## 2019 — session normale — Problème
Source: https://www.alloschool.com/element/68527
Statut: transcrit (non vérifié)

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

## 2023 — session normale — Problème
Source: https://www.alloschool.com/element/137482
Statut: transcrit (non vérifié)

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
