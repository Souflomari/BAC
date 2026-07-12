# `suites-numeriques` — Suites numériques (récurrence, monotonie, convergence, limite)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Les suites arrivent presque toujours en **fin de problème d'analyse** : une
> suite récurrente $u_{n+1} = f(u_n)$ dont on étudie l'encadrement (récurrence),
> la monotonie, la convergence et la limite. L'entrée SM ci-dessous est une
> étude de suite **autonome et complète** ; les autres études de suite de ce lot
> sont cross-listées (transcription in extenso dans le fichier du problème).

---

## 2019 — session normale — Exercice 4, PARTIE II  *(filière SM)*
Source: https://www.alloschool.com/element/68482
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème (exercice complet : 10 points)
- Images lues : `.../course-436/upload-54931/0005-big.jpg`
- Pages du scan : 5 (sur 5)
- La fonction $f$ et le réel $\alpha$ sont définis dans la **Partie I** du même
  exercice (voir `fonction-exponentielle.md`) : $f(x) = 4x\left(e^{-x} + \frac{1}{2}x - 1\right)$,
  $\alpha$ l'unique zéro de $f$ dans $\left]\frac{3}{2},2\right[$.

**Suite récurrente $u_{n+1} = f(u_n) + u_n$ (majoration, monotonie, convergence, comportement selon $u_0$).**

On considère la suite numérique $(u_n)_{n \in \mathbb{N}}$ définie par : $u_0 < \alpha$ et $(\forall n \in \mathbb{N})\ ;\ u_{n+1} = f(u_n) + u_n$

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

## Cross-lists — suites en fin de problème d'analyse (SExp)

Transcrites in extenso dans le fichier du problème correspondant :

- **2019 — session normale — Problème, 2ᵉ partie** (NS 22F, `element/68527`) :
  $u_0 = 1$, $u_{n+1} = f(u_n)$ avec $f$ bâtie sur $\ln$ ; $1 \le u_n \le e$,
  croissante, convergente, limite. → `fonction-logarithme.md`.
- **2023 — session normale — Problème, Q7** (NS 22F, `element/137482`) :
  $u_0 \in ]\alpha,1[$, $u_{n+1} = f(u_n)$ ; $\alpha < u_n < 1$, croissante,
  convergente. → `fonction-logarithme.md`.
- **2022 — session normale — Problème, Q8** (NS 22F, `element/136586`) :
  $u_0 = 1$, $u_{n+1} = f(u_n)$ avec $f$ bâtie sur $e^{x/2}$ ; $0 < u_n < \ln 4$,
  décroissante, convergente. → `fonction-exponentielle.md`.
