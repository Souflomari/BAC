# `suites-numeriques` — Suites numériques (récurrence, monotonie, convergence, limite)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Les suites arrivent presque toujours en **fin de problème d'analyse** : une
> suite récurrente $u_{n+1} = f(u_n)$ dont on étudie l'encadrement (récurrence),
> la monotonie, la convergence et la limite. Les entrées SM 2019, SExp 2020,
> SExp 2021 et SExp 2024 ci-dessous sont des études de suite **autonomes et complètes** ; les autres
> études de suite de ce lot sont cross-listées (transcription in extenso dans
> le fichier du problème).

---

## 2019 — session normale — Exercice 4, PARTIE II  *(filière SM)*
Source: https://www.alloschool.com/element/68482
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element/68482 → course-436/upload-54931, p.5) et diff caractère-par-caractère conforme au scan (récurrence $u_{n+1}=f(u_n)+u_n$, $g(x)$, limites) ; filière SM et code NS 24F confirmés sur l'en-tête du scan.

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

## 2020 — session normale — Exercice 1
Source: https://www.alloschool.com/element/109797
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 109797 → course-438/upload-80918 re-dérivé, 4 pages) ; diff caractère-par-caractère conforme au scan p.2 ($u_0=\frac{3}{2}$, $u_{n+1}=\frac{2u_n}{2u_n+5}$, encadrement $0<u_{n+1}\le\frac{2}{5}u_n$ puis $0<u_n\le\frac{3}{2}\left(\frac{2}{5}\right)^n$, suite auxiliaire $v_n=\frac{4u_n}{2u_n+3}$ de raison $\frac{2}{5}$, numérotation 1/2/3-a-b/4-a-b et barème imprimé 0,25 + 0,5 + 1 + 0,5 + 0,75 + 1 = 4 pts, conforme aux 4 points de la table des composantes p.1) ; mathématiques re-dérivées : $v_{n+1}=\frac{8u_n}{5(2u_n+3)}=\frac{2}{5}v_n$ — $(v_n)$ est bien géométrique de raison $\frac{2}{5}$ ($v_0=1$) ; encadrement cohérent ($u_1=\frac{3}{8}\le\frac{3}{5}$) et terme général $u_n=\frac{3\left(\frac{2}{5}\right)^n}{4-2\left(\frac{2}{5}\right)^n}$ retrouvé et recoupé sur $u_0,u_1$ ; filière Sciences Expérimentales et code NS 22F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Expérimentales — شعبة العلوم التجريبية مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 4 points
- Images lues : `.../course-438/upload-80918/0002-big.jpg`
- Pages du scan : 2 (sur 4)
- Intitulé composantes (page 1 du scan) : « Suites numériques » — 4 points
- Remarque (source) : la page AlloSchool `element/109797` est titrée « Maths
  Sciences et Technologies » — mislabel ; l'en-tête arabe du scan (ligne de
  filière ci-dessus, p. 1) fait foi.
- Remarque : le problème du même sujet (p. 3-4) ne comporte pas de volet
  suites ; il est transcrit sous `fonction-exponentielle.md`.

> **Note de lecture (mojibake)** : aucun

**Suites numériques (suite récurrente homographique, positivité, majoration par une suite géométrique, limite, suite géométrique auxiliaire, terme général).**

Soit $(u_n)$ la suite numérique définie par : $u_0 = \dfrac{3}{2}$ et $u_{n+1} = \dfrac{2u_n}{2u_n + 5}$ pour tout $n$ de $\mathbb{N}$

1. (0,25) Calculer $u_1$
2. (0,5) Montrer par récurrence que pour tout $n$ de $\mathbb{N}$, $u_n > 0$
3. a) (1) Montrer que pour tout $n$ de $\mathbb{N}$, $0 < u_{n+1} \le \dfrac{2}{5}u_n$,
   puis en déduire que pour tout $n$ de $\mathbb{N}$, $0 < u_n \le \dfrac{3}{2}\left(\dfrac{2}{5}\right)^n$
   b) (0,5) Calculer $\lim u_n$
4. On considère la suite numérique $(v_n)$ définie par $v_n = \dfrac{4u_n}{2u_n + 3}$ pour tout $n$ de $\mathbb{N}$.
   a) (0,75) Montrer que $(v_n)$ est une suite géométrique de raison $\dfrac{2}{5}$
   b) (1) Déterminer $v_n$ en fonction de $n$ et en déduire $u_n$ en fonction de $n$ pour tout $n$ de $\mathbb{N}$.

---

## 2021 — session normale — Exercice 2
Source: https://www.alloschool.com/element/127180
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 127180 → course-438/upload-84139 re-dérivé, 4 pages) ; diff caractère-par-caractère conforme au scan p.2 ($u_0=\frac{1}{2}$, $u_{n+1}=\frac{u_n}{3-2u_n}$, encadrement $0<u_n\le\frac{1}{2}$, rapport $\frac{u_{n+1}}{u_n}\le\frac{1}{2}$, majoration $0<u_n\le\left(\frac{1}{2}\right)^{n+1}$, $v_n=\ln(3-2u_n)$, invariant $\frac{1}{u_{n+1}}-1=3\left(\frac{1}{u_n}-1\right)$, numérotation 1/2/3/4/5 et barème imprimé 0,25 + 0,5 + 0,5 + 0,5 + 0,75 + 0,5 + 0,5 + 0,5 = 4 pts, conforme aux 4 points de la table des composantes p.1 ; doublon d'étiquette « Exercice 2 » sur la page 2 re-constaté) ; mathématiques re-dérivées : $\frac{1}{u_{n+1}}=\frac{3}{u_n}-2$ donc $\frac{1}{u_{n+1}}-1=3\left(\frac{1}{u_n}-1\right)$ — suite auxiliaire géométrique de raison 3 confirmée ($w_0=1$, $w_n=3^n$), d'où $u_n=\frac{1}{1+3^n}$, recoupé sur $u_0=\frac{1}{2}$ et $u_1=\frac{1}{4}$ ; encadrements cohérents ($3-2u_n\in[2,3)$ ⟹ rapport $\le\frac{1}{2}$ ⟹ $u_n\le\left(\frac{1}{2}\right)^{n+1}$) ; filière Sciences Expérimentales et code NS 22F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Expérimentales — شعبة العلوم التجريبية مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 4 points
- Images lues : `.../course-438/upload-84139/0002-big.jpg`
- Pages du scan : 2 (sur 4)
- Intitulé composantes (page 1 du scan) : « suites numériques » — 4 points
- Remarque (source) : la page AlloSchool `element/127180` est titrée « Maths
  Sciences et Technologies » — mislabel ; l'en-tête arabe du scan (ligne de
  filière ci-dessus, p. 1) fait foi.
- Remarque (numérotation) : sur la page 2 du scan, l'exercice de nombres
  complexes qui **suit** celui-ci est étiqueté par erreur « Exercice 2 :
  (5 points ) » — doublon d'étiquette ; la table des composantes (p. 1) fait
  foi : les complexes sont l'Exercice 3, et l'exercice transcrit ici est bien
  l'Exercice 2 (« suites numériques », 4 pts), premier « Exercice 2 » de la page.
- Remarque : le problème du même sujet (p. 3-4) ne comporte pas de volet
  suites ; il est transcrit sous `fonction-logarithme.md`.

> **Note de lecture (mojibake)** : aucun

**Suites numériques (suite récurrente homographique, encadrement, monotonie, majoration par une suite géométrique, limite, suite auxiliaire, terme général).**

Soit $(u_n)$ la suite numérique définie par : $u_0 = \dfrac{1}{2}$ et $u_{n+1} = \dfrac{u_n}{3 - 2u_n}$ pour tout $n$ de $\mathbb{N}$

1. (0,25) Calculer $u_1$
2. (0,5) Montrer par récurrence que pour tout $n$ de $\mathbb{N}$, $0 < u_n \le \dfrac{1}{2}$
3. a) (0,5) Montrer que pour tout $n$ de $\mathbb{N}$, $\dfrac{u_{n+1}}{u_n} \le \dfrac{1}{2}$
   b) (0,5) En déduire la monotonie de la suite $(u_n)$
4. a) (0,75) Montrer que pour tout $n$ de $\mathbb{N}$, $0 < u_n \le \left(\dfrac{1}{2}\right)^{n+1}$ ; puis calculer la limite de la suite $(u_n)$
   b) (0,5) On pose $v_n = \ln\left(3 - 2u_n\right)$ pour tout $n$ de $\mathbb{N}$, calculer $\lim v_n$
5. a) (0,5) Vérifier que pour tout $n$ de $\mathbb{N}$, $\dfrac{1}{u_{n+1}} - 1 = 3\left(\dfrac{1}{u_n} - 1\right)$
   b) (0,5) En déduire $u_n$ en fonction de $n$ pour tout $n$ de $\mathbb{N}$

---

## 2024 — session normale — Exercice 1
Source: https://www.alloschool.com/element/144505
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 144505 → course-438/upload-87124 re-dérivé, 4 pages) ; diff caractère-par-caractère conforme au scan p.2 ($u_0=4$, $u_{n+1}=\frac{4u_n-2}{1+u_n}$, forme $u_{n+1}=4-\frac{6}{1+u_n}$, encadrement $2\le u_n\le 4$, différence $u_{n+1}-u_n=\frac{(u_n-1)(2-u_n)}{1+u_n}$, $v_n=\frac{2-u_n}{1-u_n}$ de raison $\frac{2}{3}$, terme général $u_n=1+\frac{1}{1-\left(\frac{2}{3}\right)^{n+1}}$ avec l'exposant $n+1$ vérifié au zoom, numérotation 1/2/3 et barème imprimé 0,25 + 0,5 + 0,25 + 0,5 + 0,5 + 0,5 + 0,5 = 3 pts, conforme aux 3 points de la table des composantes p.1) ; mathématiques re-dérivées : $2-u_{n+1}=\frac{2(2-u_n)}{1+u_n}$ et $1-u_{n+1}=\frac{3(1-u_n)}{1+u_n}$ donc $v_{n+1}=\frac{2}{3}v_n$ — géométrique de raison $\frac{2}{3}$ confirmée ($v_0=\frac{2}{3}$, $v_n=\left(\frac{2}{3}\right)^{n+1}$) ; inversion $u=\frac{2-v}{1-v}=1+\frac{1}{1-v}$ redonne exactement la formule de 3-b, recoupée sur $u_0=4$ et $u_1=\frac{14}{5}$ ; décroissance et limite 2 cohérentes avec l'encadrement ; filière Sciences Expérimentales et code NS 22F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Expérimentales — مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) *(SVT **et** Sciences Physiques, BIOF)* — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 3 points
- Images lues : `.../course-438/upload-87124/0002-big.jpg`
- Pages du scan : 2 (sur 4)
- Intitulé composantes (page 1 du scan) : « Suites numériques » — 3 points
- Remarque : le problème du même sujet (p. 4) ne comporte pas de volet suites ;
  il est transcrit sous `fonction-logarithme.md`.

> **Note de lecture (mojibake)** : aucun

**Suites numériques (suite récurrente homographique, encadrement, monotonie, suite géométrique auxiliaire, limite).**

On considère la suite $(u_n)$ définie par : $u_0 = 4$ et $u_{n+1} = \dfrac{4u_n - 2}{1 + u_n}$, pour tout entier naturel $n$

1. a) (0,25) Vérifier que $u_{n+1} = 4 - \dfrac{6}{1 + u_n}$, pour tout entier naturel $n$
   b) (0,5) Montrer par récurrence que $2 \le u_n \le 4$, pour tout entier naturel $n$
2. a) (0,25) Montrer que $u_{n+1} - u_n = \dfrac{(u_n - 1)(2 - u_n)}{1 + u_n}$, pour tout entier naturel $n$
   b) (0,5) Montrer que la suite $(u_n)$ est décroissante et en déduire que $(u_n)$ est convergente.
3. Soit $(v_n)$ la suite numérique définie par $v_n = \dfrac{2 - u_n}{1 - u_n}$, pour tout entier naturel $n$
   a) (0,5) Montrer que $(v_n)$ est une suite géométrique de raison $\dfrac{2}{3}$
   b) (0,5) Montrer que $u_n = 1 + \dfrac{1}{1 - \left(\dfrac{2}{3}\right)^{n+1}}$, pour tout entier naturel $n$
   c) (0,5) Calculer la limite de la suite $(u_n)$

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
