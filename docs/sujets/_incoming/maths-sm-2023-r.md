# Examen national Mathématiques — SM — 2023 session rattrapage (RS 24F) — transcription intégrale

> Fichier d'entrée (`_incoming`) : transcriptions **non vérifiées** — protocole
> `docs/sujets/maths/README.md`. Provenance sur chaque bloc. Sujet lu sur les
> 5 pages du scan `course-436/upload-85320` (AlloSchool element/142494).
>
> **En-tête administratif du scan (p.1)** : الامتحان الوطني الموحد للبكالوريا —
> المسالك الدولية — الدورة الاستدراكية 2023 — code sujet **RS 24F** — مادة
> الرياضيات — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — durée **4 h** —
> coefficient **9**.
>
> **Consignes (p.1)** : « La durée de l'épreuve est de 4 heures. L'épreuve
> comporte quatre exercices indépendants. Les exercices peuvent être traités
> selon l'ordre choisi par le candidat. » — « L'exercice1 se rapporte à
> l'analyse (10 pts) ; L'exercice2 se rapporte aux nombres complexes (3.5 pts) ;
> L'exercice3 se rapporte aux structures algébriques (3.5 pts) ; L'exercice4 se
> rapporte à l'arithmétique (3 pts). » — « L'usage de la calculatrice n'est pas
> autorisé. L'usage de la couleur rouge n'est pas autorisé. »
>
> **Note de lecture (mojibake, tout le sujet)** : ce scan substitue les
> blackboard-bold par un assortiment de glyphes cassés (cases tofu « □ »,
> coins « ⌐ », « ⌊ », « ∏ », barres « ‖ ») selon l'occurrence. Chaque occurrence
> est adjugée par la logique de l'exercice et marquée *(glyphe à confirmer)*
> dans le bloc concerné. Aucune figure (courbe, tableau, arbre) n'est imprimée
> dans ce sujet — les cinq pages sont du texte mathématique seul.

---

## 2023 — session rattrapage — Exercice 1
Source: https://www.alloschool.com/element/142494
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 10 points
- Images lues : `.../course-436/upload-85320/0001-big.jpg` (consignes), `.../course-436/upload-85320/0002-big.jpg`, `.../course-436/upload-85320/0003-big.jpg`
- Pages du scan : 2–3 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : en Partie II le quantificateur s'écrit
> « $\forall n \in$ □\* » puis « $\forall n \in$ ⌐\* » (deux glyphes différents
> pour le même ensemble) — lu $\mathbb{N}^*$ par l'indexation de la suite
> $(u_n)_{n\geq 1}$ *(glyphe à confirmer)*. Le reste de l'exercice est en
> Unicode exploitable.

**Analyse (fonction $\sqrt{x}\,(\ln x)^n$ : continuité, limites, variations suivant la parité de $n$, point d'inflexion ; suites $u_n = f_n(\beta)$ et $f_n(x_n)=1$ ; calcul intégral et volume de révolution).**

**Partie I**

Pour tout entier naturel **non nul** $n$, on considère la fonction $f_n$ définie sur $I = [0, +\infty[$ par : $f_n(0) = 0$ et $\left(\forall x \in\, ]0, +\infty[\right)$ ; $f_n(x) = \sqrt{x}\,(\ln x)^n$

et soit $(C_n)$ sa courbe représentative dans un repère orthonormé $\left(O; \vec{i}, \vec{j}\right)$

1. a) (0,5) Vérifier que : $\left(\forall x \in\, ]0, +\infty[\right)$ ; $\sqrt{x}\,(\ln x)^n = (2n)^n \left( x^{\frac{1}{2n}} \ln\!\left( x^{\frac{1}{2n}} \right) \right)^n$, en déduire que $f_n$ est continue à droite en $0$
   b) (0,25) Calculer $\displaystyle\lim_{x \to +\infty} f_n(x)$
   c) (0,75) Vérifier que : $\left(\forall x \in\, ]0, +\infty[\right)$ ; $\dfrac{f_n(x)}{x} = (2n)^n \left( \dfrac{\ln\!\left( x^{\frac{1}{2n}} \right)}{x^{\frac{1}{2n}}} \right)^{\!n}$, en déduire $\displaystyle\lim_{x \to +\infty} \dfrac{f_n(x)}{x}$, puis interpréter graphiquement le résultat obtenu.
   d) (0,5) Calculer, suivant la parité de $n$, $\displaystyle\lim_{x \to 0^+} \dfrac{f_n(x)}{x}$ puis interpréter graphiquement le résultat obtenu.
2. a) (0,75) Montrer que $f_n$ est dérivable sur $]0; +\infty[$ et que :
   $\left(\forall x \in\, ]0, +\infty[\right)$ ; $f_n'(x) = \dfrac{1}{2\sqrt{x}}\,(\ln x)^{n-1}\,(2n + \ln x)$
   b) (0,25) Vérifier que : $\forall n \geq 2$, $f_n'(x) = 0$ si et seulement si $(x = 1$ ou $x = e^{-2n})$
   c) (1) Étudier, suivant la parité de $n$, le sens de variation de $f_n$ et donner son tableau de variations.
   d) (0,25) Montrer que si $n$ est impair et $n \geq 3$ alors le point d'abscisse $1$ est un point d'inflexion de $(C_n)$

**Partie II :**

1. Soit $\beta \in\, ]1, e[$ un réel fixé. On considère la suite numérique $(u_n)_{n\geq 1}$ définie par :
   $\left(\forall n \in \mathbb{N}^*\right)$ *(glyphe à confirmer)* ; $u_n = f_n(\beta)$
   a) (0,25) Montrer que : $\left(\forall n \in \mathbb{N}^*\right)$ *(glyphe à confirmer)* ; $0 < u_n < \sqrt{e}$
   b) (0,25) Montrer que la suite $(u_n)_{n\geq 1}$ est décroissante.
   c) (0,25) Déterminer $\displaystyle\lim_{n \to +\infty} u_n$
2. a) (0,5) Montrer que pour tout entier $n$ non nul, il existe un unique réel $x_n \in\, ]1; e[$ tel que : $f_n(x_n) = 1$
   b) (0,75) Montrer que la suite $(x_n)_{n \in \mathbb{N}^*}$ *(glyphe à confirmer)* ainsi définie est croissante, en déduire qu'elle est convergente.
3. On pose : $\ell = \displaystyle\lim_{n \to +\infty} x_n$
   a) (0,5) Montrer que : $1 < \ell \leq e$
   b) (0,25) Montrer que : $\displaystyle\lim_{n \to +\infty} (\ln x_n)^n = \dfrac{1}{\sqrt{\ell}}$
   c) (0,25) Montrer que si $\ell < e$ alors $\displaystyle\lim_{n \to +\infty} n \ln(\ln x_n) = -\infty$
   d) (0,25) En déduire la valeur de $\ell$

**Partie III :**

On pose pour tout $x \in I$, $F(x) = \displaystyle\int_x^1 \left(f_1(t)\right)^2 dt$

1. a) (0,25) Montrer que la fonction $F$ est continue sur $I$
   b) (1) En utilisant une double intégration par parties, montrer que :
   $\left(\forall x \in\, ]0, +\infty[\right)$ ; $F(x) = -\dfrac{x^2}{2}\ln^2(x) + \dfrac{x^2}{2}\ln(x) + \dfrac{1}{4}\left(1 - x^2\right)$
2. a) (0,5) Calculer $\displaystyle\lim_{\substack{x \to 0 \\ x > 0}} F(x)$
   b) (0,25) En déduire la valeur de $F(0)$
   c) (0,5) Calculer, en $\text{cm}^3$, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe $(C_1)$ relative à l'intervalle $[0,1]$. (On prendra $\left\|\vec{i}\right\| = 1\ \text{cm}$)

---

## 2023 — session rattrapage — Exercice 2
Source: https://www.alloschool.com/element/142494
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85320/0003-big.jpg` (Partie I), `.../course-436/upload-85320/0004-big.jpg` (Partie II)
- Pages du scan : 3–4 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : le domaine du système est rendu par trois
> glyphes différents selon l'occurrence — « ⌊ $^2_+$ » (énoncé), « ∏ $^2_+$ »
> (Q1), « ⌐ $^2_+$ » (Q2) — tous porteurs du même indice $+$ et de l'exposant
> $2$ : lus $\left(\mathbb{R}_+\right)^2$ par la présence de $\sqrt{x}$ et
> $\sqrt{y}$ *(glyphe à confirmer — l'étoile éventuelle $\mathbb{R}_+^*$ n'est
> pas lisible)*. En Partie II le quantificateur Q1 s'écrit
> « $\forall z \in$ ⌐ » — lu $(U)$ (le cercle défini juste au-dessus) par la
> logique de l'équivalence $|z| = 1$ *(glyphe à confirmer)*.

**Nombres complexes (Partie I : système non linéaire ramené à une équation du second degré en $z = \sqrt{x} + i\sqrt{y}$ ; Partie II : cercle unité, points $A, B, C$, cordes parallèles et perpendiculaires, $p = \frac{bc}{a}$).**

**Les parties I et II peuvent être traitées indépendamment.**

**PARTIE I :**

On considère dans $\left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* le système suivant : $(S) : \begin{cases} \sqrt{x}\left(1 + \dfrac{1}{x+y}\right) = \dfrac{12}{5} \\[2mm] \sqrt{y}\left(1 - \dfrac{1}{x+y}\right) = \dfrac{4}{5} \end{cases}$

1. Soit $(x, y) \in \left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* une solution du système $(S)$. On pose : $z = \sqrt{x} + i\sqrt{y}$
   a) (0,25) Montrer que : $z + \dfrac{1}{z} = \dfrac{12}{5} + \dfrac{4}{5}i$
   b) (0,75) Montrer que : $z^2 - \left(\dfrac{12}{5} + \dfrac{4}{5}i\right)z + 1 = 0$, en déduire les valeurs possibles de $z$
   ( On remarque que : $\dfrac{28}{25} + \dfrac{96}{25}i = \left(\dfrac{2}{5}(4 + 3i)\right)^2$ )
   c) (0,25) En déduire les valeurs du couple $(x, y)$
2. (0,5) Résoudre dans $\left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* le système $(S)$

**PARTIE II :**

Le plan complexe est rapporté à un repère orthonormé direct $\left(O; \vec{u}, \vec{v}\right)$

Soit $(U)$ le cercle de centre $O$ et de rayon $1$ et $A(a)$, $B(b)$ et $C(c)$ trois points du cercle $(U)$ deux à deux distincts.

1. (0,25) Montrer que : $\left(\forall z \in (U)\right)$ *(glyphe à confirmer)* ; $|z| = 1 \iff \bar{z} = \dfrac{1}{z}$
2. a) (0,5) La droite passant par $A$ et parallèle à $(BC)$ coupe le cercle $(U)$ au point $P(p)$
   Montrer que : $p = \dfrac{bc}{a}$
   b) (0,5) La droite passant par $A$ et perpendiculaire à $(BC)$ coupe le cercle $(U)$ au point $Q(q)$. Montrer que : $q = -p$
   c) (0,5) La droite passant par $C$ et parallèle à $(AB)$ coupe le cercle $(U)$ au point $R(r)$
   Montrer que les deux droites $(PR)$ et $(OB)$ sont perpendiculaires.

---

## 2023 — session rattrapage — Exercice 3
Source: https://www.alloschool.com/element/142494
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85320/0004-big.jpg` (énoncé et Q1–Q4 début), `.../course-436/upload-85320/0005-big.jpg` (Q4-a à Q5)
- Pages du scan : 4–5 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : les blackboard-bold de cet exercice sont
> presque tous rendus en glyphes cassés (« ⌐ », « □ », « ⌊ », « ⌐ », « ‖ »,
> « $^-$ », etc.), différents d'une occurrence à l'autre. Adjudication par la
> logique de l'exercice, chaque lecture marquée *(glyphe à confirmer)* :
> $M_3(\mathbb{R})$ (anneau des matrices réelles $3\times 3$) ; $(a,b,c) \in
> \mathbb{R}^3$ (les coefficients de $M(a,b,c)$) ; l'ensemble d'arrivée
> $\mathbb{R} \times \mathbb{C}$ (forcé par $\varphi(M(a,b,c)) = (a,\ b+ci)$ :
> première composante réelle, seconde complexe) ; $z \in \mathbb{C}$ (partie
> réelle $\operatorname{Re}(z)$, partie imaginaire $\operatorname{Im}(z)$) ;
> $x \in \mathbb{R}$ (première composante de la loi $T$) ; $\mathbb{C}^*$
> (domaine de $\psi$, muni de $\times$).

**Structures algébriques (sous-groupe de matrices de $M_3(\mathbb{R})$, homomorphismes $\varphi$ et $\psi$, lois $*$ et $T$ sur $\mathbb{R} \times \mathbb{C}$, groupe commutatif, corps commutatif $(G, *, T)$).**

On rappelle que $\left(M_3(\mathbb{R})\ \text{(glyphe à confirmer)}, +, \times\right)$ est un anneau unitaire et non commutatif d'unité $I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$. Soit $E = \left\{ M(a,b,c) = \begin{pmatrix} a & 0 & 0 \\ 0 & b & -c \\ 0 & c & b \end{pmatrix} \ /\ (a,b,c) \in \mathbb{R}^3\ \text{(glyphe à confirmer)} \right\}$

1. (0,25) Montrer que $E$ est un sous-groupe de $\left(M_3(\mathbb{R})\ \text{(glyphe à confirmer)}, +\right)$
2. On munit l'ensemble $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* de la loi de composition interne $*$ définie par :
   $\forall \left((x, z), (x', z')\right) \in \left(\mathbb{R} \times \mathbb{C}\right)^2$ *(glyphe à confirmer)* ; $(x, z) * (x', z') = (x + x',\ z + z')$ et on considère l'application $\varphi$ définie de $E$ vers $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* par :
   $\forall (a, b, c) \in \mathbb{R}^3$ *(glyphe à confirmer)*, $\varphi\left(M(a,b,c)\right) = (a,\ b + ci)$
   a) (0,5) Montrer que $\varphi$ est un homomorphisme de $(E, +)$ vers $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)* et que $\varphi(E) = \mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
   b) (0,25) En déduire que $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)* est un groupe commutatif.
3. On munit $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* de la loi de composition interne $T$ définie par :
   $\forall \left((x, z), (x', z')\right) \in \left(\mathbb{R} \times \mathbb{C}\right)^2$ *(glyphe à confirmer)* ; $(x, z)\, T\, (x', z') = \left(x \operatorname{Re}(z') + x' \operatorname{Re}(z),\ zz'\right)$
   ( $\operatorname{Re}(z)$ désigne la partie réelle du nombre complexe $z$ )
   a) (0,25) Montrer que $T$ est commutative.
   b) (0,25) Vérifier que $(0, 1)$ est l'élément neutre de $T$ dans $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
   c) (0,5) Vérifier que $\forall x \in \mathbb{R}$ *(glyphe à confirmer)*, $(1, i)\, T\, (x, -i) = (0, 1)$ ; en déduire que $T$ est non associative dans $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
4. Soit $G = \left\{ \left(\operatorname{Im}(z),\ z\right) \ /\ z \in \mathbb{C}\ \text{(glyphe à confirmer)} \right\}$
   ( $\operatorname{Im}(z)$ désigne la partie imaginaire du nombre complexe $z$ )
   a) (0,25) Montrer que $G$ est un sous-groupe de $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)*
   (On remarque que $\left(-\operatorname{Im}(z), -z\right)$ est le symétrique de $\left(\operatorname{Im}(z), z\right)$ pour la loi $*$ )
   b) (0,25) Soit $\psi$ l'application définie de $\mathbb{C}^*$ *(glyphe à confirmer)* vers $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* par : $\forall z \in \mathbb{C}^*$ *(glyphe à confirmer)* ; $\psi(z) = \left(\operatorname{Im}(z),\ z\right)$
   Montrer que $\psi$ est un homomorphisme de $\left(\mathbb{C}^*, \times\right)$ *(glyphe à confirmer)* vers $\left(\mathbb{R} \times \mathbb{C}, T\right)$ *(glyphe à confirmer)*
   c) (0,5) En déduire que $\left(G - \{(0,0)\},\ T\right)$ est un groupe commutatif.
5. (0,5) Montrer que $\left(G, *, T\right)$ est un corps commutatif.

---

## 2023 — session rattrapage — Exercice 4
Source: https://www.alloschool.com/element/142494
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3 points
- Images lues : `.../course-436/upload-85320/0005-big.jpg` (énoncé complet), `.../course-436/upload-85320/0001-big.jpg` (page de consignes)
- Pages du scan : 5 (sur 5) — consignes p.1

> **Note de lecture** : aucun glyphe à adjuger — cet exercice ne fait
> intervenir aucun blackboard-bold ; les congruences $\equiv$ et les
> modules $[q]$, $[p]$ sont imprimés proprement.

**Arithmétique (somme géométrique $S = 1 + p + p^2 + \ldots + p^{p-1}$, petit théorème de Fermat, théorème de Bézout, $q \equiv 1\ [p]$).**

Soit $p$ un nombre premier impair. On pose : $S = 1 + p + p^2 + p^3 + \ldots + p^{p-1}$

Soit $q$ un nombre premier qui divise $S$.

1. a) (0,5) Montrer que $p$ et $q$ sont premiers entre eux.
   b) (0,25) En déduire que : $p^{q-1} \equiv 1\ [q]$
   c) (0,5) Vérifier que : $p^p - 1 = (p-1)S$, en déduire que : $p^p \equiv 1\ [q]$
2. On suppose que $p$ et $q-1$ sont premiers entre eux.
   a) (0,75) En utilisant le théorème de Bézout, montrer que : $p \equiv 1\ [q]$
   b) (0,25) En déduire que $S \equiv 1\ [q]$
3. (0,75) Montrer que : $q \equiv 1\ [p]$

---

## Classement

Correspondance avec les slugs `content/maths/` (convention README §4 : le
problème d'analyse va sous le slug dominant, les autres slugs portent un
cross-list) :

| Exercice | Barème | Slug(s) cible(s) |
|----------|--------|------------------|
| Exercice 1 (analyse, 10 pts) | 10 pts | **`fonction-logarithme`** (dominant : $f_n(x) = \sqrt{x}\,(\ln x)^n$) · cross-list : `limites-continuite` (Partie I-1), `derivabilite-etude-fonctions` (Partie I-2 : dérivée, variations, inflexion ; Partie II-2a : unicité de $x_n$), `suites-numeriques` (Partie II : $(u_n)$ et $(x_n)$), `calcul-integral` (Partie III : double IPP, volume de révolution) |
| Exercice 2 (nombres complexes, 3,5 pts) | 3,5 pts | **`nombres-complexes-2`** (filière SM : système ramené au second degré en $z$ ; cercle unité et configurations) |
| Exercice 3 (structures algébriques, 3,5 pts) | 3,5 pts | **`structures-algebriques`** (sous-groupe, homomorphismes, groupe commutatif, corps) |
| Exercice 4 (arithmétique, 3 pts) | 3 pts | **`arithmetique`** (Fermat, Bézout, congruences) |
