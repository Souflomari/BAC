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
>
> **[Mise à jour 2026-08-06.]** Le sujet **2020 SExp session normale**
> (`element/109797`) comporte, lui, un exercice dédié : « Limites,
> dérivabilité et calcul intégral » (Exercice 3, 4 pts) — **première entrée
> pleine** de ce fichier, transcrite ci-dessous. Le constat « pas d'exercice
> dédié » (et la ligne correspondante d'`INDEX.md` §3) datait d'avant
> l'atteinte de ce sujet et reste vrai pour les autres années atteintes ; la
> décision de sourcing par extrait (r-bac 2022) reste inchangée.
>
> **[Mise à jour 2026-08-06 — sujet 2021.]** Le sujet **2021 SExp session
> normale** (`element/127180`) comporte lui aussi un exercice court dont le
> cœur analytique relève de ce chapitre : « fonctions numériques »
> (Exercice 1, 2 pts — équations/inéquation avec $e^x$, limite en $0$,
> existence d'une solution par TVI) — deuxième entrée pleine, transcrite
> ci-dessous.

---

## 2020 — session normale — Exercice 3 *(filière SExp)*
Source: https://www.alloschool.com/element/109797
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-438/upload-80918, page(s) 3. À faire vérifier (README §3).

- Filière / épreuve : Sciences Expérimentales — شعبة العلوم التجريبية مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 4 points
- Images lues : `.../course-438/upload-80918/0003-big.jpg`
- Pages du scan : 3 (sur 4)
- Intitulé composantes (page 1 du scan) : « Limites, dérivabilité et calcul intégral » — 4 points
- Remarque (source) : la page AlloSchool `element/109797` est titrée « Maths
  Sciences et Technologies » — mislabel ; l'en-tête arabe du scan (ligne de
  filière ci-dessus, p. 1) fait foi.
- Classement : intitulé mixte (« Limites, dérivabilité et calcul intégral »).
  Dominante retenue : la majorité du barème (Q1, 2,5 pts sur 4) est un arc
  dérivée → monotonie → encadrement qui culmine dans la question la plus
  lourde de l'exercice (Q1-d, 1 pt), une limite de croissances comparées
  $\lim_{x\to+\infty}\frac{(\ln x)^3}{x^2}$ obtenue par encadrement — cœur du
  chapitre limites. Le calcul intégral (Q2, 1,5 pt : primitive vérifiée puis
  intégrale directe, sans IPP ni aire) ne domine pas → entrée pleine ici,
  cross-lists dans `calcul-integral.md` (Q2) et
  `derivabilite-etude-fonctions.md` (Q1-a/b).
- Recoupe : `calcul-integral` (Q2 — primitive et intégrale),
  `derivabilite-etude-fonctions` (Q1-a/b — dérivée et monotonie).

> **Note de lecture (mojibake)** : aucun

**Limites, dérivabilité et calcul intégral (étude de $g(x) = 2\sqrt{x} - 2 - \ln x$ : croissances comparées par encadrement, primitive, intégrale).**

On considère la fonction numérique $g$ définie sur $]0,+\infty[$ par $g(x) = 2\sqrt{x} - 2 - \ln x$

1. a) (0,5) Montrer que pour tout $x$ de $]0,+\infty[$, $g'(x) = \dfrac{\sqrt{x} - 1}{x}$
   b) (0,5) Montrer que $g$ est croissante sur $[1,+\infty[$
   c) (0,5) en déduire que pour tout $x$ de $[1,+\infty[$, $0 \le \ln x \le 2\sqrt{x}$ *(remarquer que $2\sqrt{x} - 2 \le 2\sqrt{x}$)*
   d) (1) Montrer que pour tout $x$ de $[1,+\infty[$, $0 \le \dfrac{(\ln x)^3}{x^2} \le \dfrac{8}{\sqrt{x}}$ et en déduire $\displaystyle\lim_{x \to +\infty} \dfrac{(\ln x)^3}{x^2}$
2. a) (0,75) Montrer que la fonction $G : x \mapsto x\left(-1 + \dfrac{4}{3}\sqrt{x} - \ln x\right)$ est une primitive de $g$ sur $]0,+\infty[$
   b) (0,75) Calculer l'intégrale $\displaystyle\int_1^4 g(x)\,dx$

---

## 2021 — session normale — Exercice 1 *(filière SExp)*
Source: https://www.alloschool.com/element/127180
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-438/upload-84139, page(s) 2. À faire vérifier (README §3).

- Filière / épreuve : Sciences Expérimentales — شعبة العلوم التجريبية مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 2 points
- Images lues : `.../course-438/upload-84139/0002-big.jpg`
- Pages du scan : 2 (sur 4)
- Intitulé composantes (page 1 du scan) : « fonctions numériques » — 2 points
- Remarque (source) : la page AlloSchool `element/127180` est titrée « Maths
  Sciences et Technologies » — mislabel ; l'en-tête arabe du scan (ligne de
  filière ci-dessus, p. 1) fait foi.
- Remarque (numérotation) : la page 2 du scan porte deux étiquettes
  « Exercice 2 » (l'exercice de nombres complexes y est étiqueté par erreur
  « Exercice 2 : (5 points ) ») ; la table des composantes (p. 1) fait foi —
  l'exercice transcrit ici est bien l'Exercice 1 (« fonctions numériques »,
  2 pts), en tête de page.
- Classement : intitulé composantes générique (« fonctions numériques »).
  Le cœur analytique est limites + continuité (1 pt sur 2) : Q1-c est une
  limite en $0$ (forme indéterminée levée par la factorisation issue de
  Q1-a/b) et Q2 une existence de solution sur $[-1,0]$ par le théorème des
  valeurs intermédiaires (continuité). Q1-a/b (équation et inéquation avec
  $e^x$, 1 pt) sont la mécanique algébrique (changement de variable
  $t = e^x$) au service de cette factorisation. Aucune dérivée dans
  l'exercice → entrée pleine ici plutôt que dans
  `derivabilite-etude-fonctions.md` (aucun contenu de dérivabilité).
- Remarque : le problème du même sujet (p. 3-4) contient aussi des limites
  et de la continuité (Q1, Q2, Q3-a, Q8-a) ; il est transcrit in extenso
  sous `fonction-logarithme.md`.

> **Note de lecture (mojibake)** : aucun

**Fonctions numériques (équation et inéquation avec $e^x$, limite en $0$, existence d'une solution par TVI).**

1. a) (0,5) Résoudre dans $\mathbb{R}$ l'équation : $e^{2x} - 4e^x + 3 = 0$
   b) (0,5) Résoudre dans $\mathbb{R}$ l'inéquation : $e^{2x} - 4e^x + 3 \le 0$
   c) (0,5) Calculer $\displaystyle\lim_{x \to 0} \dfrac{e^{2x} - 4e^x + 3}{e^{2x} - 1}$
2. (0,5) Montrer que l'équation $e^{2x} + e^x + 4x = 0$ admet une solution dans l'intervalle $[-1, 0]$

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
