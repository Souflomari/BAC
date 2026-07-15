# `limites-continuite` — Limites et continuité (sourcing par extrait)

> Annales examen national, Mathématiques 2ème Bac. Cette notion n'a **pas
> d'exercice dédié** dans les sujets nationaux atteints à ce jour — elle
> apparaît seulement en amont des problèmes d'étude de fonction (calcul de
> limites, asymptotes, branches infinies), jamais isolée en exercice propre.
> Confirmé dans `docs/sujets/maths/INDEX.md` §3, ligne `limites-continuite` :
> **« cross-list — pas d'exercice dédié »**.
>
> **Décision de sourcing (campagne de conversion sommet, pilote maths).** En
> l'absence d'exercice dédié, le sommet `r-bac` de
> `content/maths/limites-continuite/exercises.yaml` est sourcé par
> **EXTRAIT** d'un problème d'analyse déjà vérifié et versé dans la banque
> sous `fonction-exponentielle.md` — les questions 1, 2, 3a et 3b du
> problème **2022, session normale, filière SExp**, qui portent
> spécifiquement sur les limites à l'infini, l'interprétation géométrique du
> quotient $f(x)/x$, et l'étude d'une asymptote oblique (position relative
> via le signe de $f(x)-x$). Le reste du problème (dérivée, concavité,
> fonction réciproque, suite — questions 4 à 8) relève d'autres notions
> (`derivabilite-etude-fonctions`, `suites-numeriques`) et n'est **pas**
> repris ici.

---

## 2022 — session normale — Problème, Questions 1, 2, 3a, 3b *(filière SExp)*
Source : https://www.alloschool.com/element/136586
Statut : **corrigé** (conforme au scan) — hérité intégralement de
`docs/sujets/maths/fonction-exponentielle.md` (agent-vérificateur-adversarial,
2026-07-12) : re-fetch indépendant (element/136586 → course-438/upload-84495,
p.3-4), énoncé diffé conforme au scan. **Le seul écart relevé par la passe de
vérification concernait la description de la figure $(C_g)$ de la question
5b** (signe de la fonction auxiliaire $g$) — une question qui n'est **pas**
reprise ici. Les questions 1, 2, 3a et 3b utilisées dans cette notion sont du
texte d'énoncé pur (aucune figure en jeu), diffées conformes au scan sans
réserve.

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques,
  3 h, coef 7
- Code sujet : NS 22F · Barème du problème complet : 8,5 points (Q1 : 0,5 pt ;
  Q2 : 0,5 pt ; Q3a : 0,5 pt ; Q3b : 0,75 pt — soit 2,25 points sur les
  quatre questions extraites ici)
- Images lues : `.../course-438/upload-84495/0003-big.jpg`
- Page du scan : 3 (sur 4)
- Provenance complète du problème (étude de la fonction $f(x)=x(e^{x/2}-1)^2$,
  concavité, fonction réciproque, suite $u_{n+1}=f(u_n)$) :
  `docs/sujets/maths/fonction-exponentielle.md`, entrée « 2022 — session
  normale — Problème (filière SExp) ».

**Fonction étudiée.** On considère la fonction numérique $f$ définie sur
$\mathbb{R}$ par $f(x) = x\left(e^{\frac{x}{2}} - 1\right)^2$. Soit $(C)$ sa
courbe représentative dans un repère orthonormé $(O;\vec{i},\vec{j})$
*(unité : 1 cm)*.

**Questions extraites, transcrites fidèlement :**

1. (0,5) Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ et
   $\displaystyle\lim_{x \to -\infty} f(x)$
2. (0,5) Calculer $\displaystyle\lim_{x \to +\infty} \dfrac{f(x)}{x}$ et
   interpréter géométriquement le résultat
3. a) (0,5) Montrer que la droite $(\Delta)$ d'équation $y = x$ est
      asymptote à la courbe $(C)$ au voisinage de $-\infty$
   b) (0,75) Étudier le signe de $(f(x) - x)$ pour tout $x$ de $\mathbb{R}$
      et en déduire la position relative de la courbe $(C)$ et la droite
      $(\Delta)$

*(Les questions 4 à 8 du même problème — signe de la dérivée $f'$, tableau
de variations, concavité et points d'inflexion via $g$, construction de la
courbe, fonction réciproque $f^{-1}$, étude de la suite $u_{n+1}=f(u_n)$ —
relèvent d'autres notions et ne sont pas transcrites ici ; voir
`fonction-exponentielle.md` pour le problème complet, y compris la
correction apportée à la description de la figure $(C_g)$ de la question
5b.)*

---

## Utilisation dans `content/maths/limites-continuite/exercises.yaml`

`r-bac` transcrit fidèlement les quatre questions ci-dessus
(`sourcing: {status: sourced}`, note citant l'année 2022 et la session
normale — voir le fichier pour le libellé exact). `r-variation` est une
variation fraîche construite exprès pour cette leçon (fonction
$g(x)=x(e^{-x}-1)^2$, mêmes compétences profondes — limite d'un produit à
l'infini, quotient $f(x)/x$ et branche parabolique, asymptote oblique via
$f(x)-x \to 0$, position relative par étude de signe — mais avec la branche
parabolique et l'asymptote oblique situées aux infinis **opposés** par
rapport à `r-bac`, pour empêcher toute mémorisation de réponse) ;
`sourcing: {status: not-applicable}`.
