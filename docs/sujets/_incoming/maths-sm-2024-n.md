# Examen national Mathématiques — SM — 2024, session NORMALE (NS 24F) — exercices 1 et 2

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué chaque exercice `Statut: vérifié`.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que les
> **exercices 1 et 2** (les deux volets d'analyse). Les exercices 3
> (nombres complexes), 4 (arithmétique) et 5 (structures algébriques) sont
> **déjà en banque** — `bk-2024-n-x3` de `nombres-complexes-2`,
> `bk-2024-n-x5` de `arithmetique`, `bk-2024-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves (`web/src/lib/examens.ts`) somme les
> `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2024 session normale** est assemblée à **10,00/20** dans
Examens blancs : les trois exercices « algèbre » y sont, les deux exercices
d'analyse n'y sont pas. Même diagnostic que SM 2023 normale, transcrit en
parallèle : c'est le motif de toutes les épreuves SM de session normale du
corpus.

## En-tête du scan (p. 1/5, relue)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2024**
- Code sujet **NS 24F** · مادة : الرياضيات
- شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — **Sciences Mathématiques A et B, option française**
- Durée **4 h** · coefficient **9**
- Marqueur « α » imprimé en haut à droite de chaque page.
- Source : https://www.alloschool.com/element/145739
- Images : `.../course-436/upload-87447/000{1..5}-big.jpg` (5 pages)

**Consignes (p. 1, transcrites) :** « La durée de l'épreuve est de 4 heures. —
L'épreuve comporte cinq exercices indépendants. — Les exercices peuvent être
traités selon l'ordre choisi par le candidat. » Puis la carte des composantes :

| Exercice | Domaine | Barème |
|---|---|---|
| 1 | analyse | **7,5 pts** |
| 2 | analyse | **2,5 pts** |
| 3 | nombres complexes | 3,5 pts |
| 5 | structures algébriques | 3,5 pts |
| 4 | arithmétique | 3 pts |

Somme : $7{,}5+2{,}5+3{,}5+3{,}5+3 = \mathbf{20}$ ✔

**Détail de transcription à conserver :** la page 1 énumère bien les
composantes dans l'ordre **1, 2, 3, 5, 4** — l'exercice 5 est annoncé *avant*
l'exercice 4. Ce n'est pas une erreur de lecture : c'est ainsi que le scan est
imprimé. Le corps du sujet, lui, suit l'ordre 1, 2, 3, 4, 5.

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## NOTE DE LECTURE — pas de mojibake sur ce scan

Contrairement au sujet **2023** (normale comme rattrapage), ce scan rend
**correctement** les lettres ajourées ($\mathbb{N}$, $\mathbb{N}^*$,
$\mathbb{C}$) et le symbole $\le$. Aucune adjudication de glyphe n'a été
nécessaire, et aucune n'est à confirmer. C'est un fait à vérifier, pas à
supposer : le vérificateur doit le confirmer plutôt que de l'hériter.

---

## 2024 — session normale — Exercice 1
Source: https://www.alloschool.com/element/145739
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-23. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **7,5 points**
- Recompte question par question, relevé dans la marge du scan :
  $0{,}5+0{,}5$ (q1, q2) $+\ 0{,}25+0{,}5+0{,}25$ (q3) $+\ 0{,}5+0{,}5$ (q4)
  $+\ 0{,}5+0{,}5+0{,}5+0{,}5$ (q5) $+\ 0{,}25+0{,}5$ (q6) $+\ 0{,}5$ (q7)
  $+\ 0{,}5+0{,}5+0{,}25$ (q8) $= \mathbf{7{,}5}$ ✔ conforme à la carte de la p. 1
- Images lues : `.../0002-big.jpg` (q1 à q8, début), `.../0003-big.jpg` (fin de q8)
- Pages du scan : 2 et 3 (sur 5)
- Aucune figure n'est imprimée : la question 6-b demande au candidat de **tracer** la courbe.

**EXERCICE 1 (7,5 points)**

Soit $f$ la fonction numérique définie sur l'intervalle $[1, +\infty[$ par :

$$f(1) = \frac{1}{2} \qquad \text{et pour tout } x \in\, ]1, +\infty[\ ,\qquad f(x) = \frac{\ln(x)}{x^2 - 1}$$

Soit $(C)$ la courbe représentative de la fonction $f$ dans un repère orthogonal $(O, \vec{i}, \vec{j})$.

1. *(0,5)* Montrer que $f$ est continue à droite en $1$.

2. *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ puis interpréter graphiquement le résultat obtenu.

3. **a)** *(0,25)* Soit $x \in\, ]1, +\infty[$. En posant $t = (x-1)^2$, vérifier que : $\dfrac{1 - x + \ln(x)}{(x-1)^2} = \dfrac{-\sqrt{t} + \ln(1+\sqrt{t})}{t}$

   **b)** *(0,5)* Montrer que $\left(\forall t \in\, ]0, +\infty[\right)$, $\quad -\dfrac{1}{2} < \dfrac{-\sqrt{t} + \ln\left(1+\sqrt{t}\right)}{t} < \dfrac{-1}{2(1+\sqrt{t})}$

   *(On pourra utiliser le théorème des accroissements finis sur l'intervalle $[0\,;t]$)*

   **c)** *(0,25)* En déduire que : $\displaystyle\lim_{x \to 1^{+}} \dfrac{1 - x + \ln(x)}{(x-1)^2} = -\dfrac{1}{2}$

4. **a)** *(0,5)* Montrer que : $\forall x \in\, ]1, +\infty[\ ,\quad \dfrac{f(x) - \dfrac{1}{2}}{x - 1} = -\dfrac{\ln(x)}{x-1} \times \dfrac{1}{2(x+1)} + \dfrac{\ln(x) - x + 1}{2(x-1)^2}$

   **b)** *(0,5)* En déduire que $f$ est dérivable à droite en $1$ puis interpréter graphiquement le résultat obtenu.

5. Pour tout $x \in [1, +\infty[$ on pose $I(x) = \displaystyle\int_1^x \frac{t^2-1}{t^3}\,dt$ et $J(x) = \displaystyle\int_1^x \frac{t^2-1}{t^2}\,dt$

   **a)** *(0,5)* Montrer que : $\forall x \in [1, +\infty[$, $\ 0 \le I(x) \le J(x)$

   **b)** *(0,5)* Montrer que pour tout $x \in [1, +\infty[$, $\ I(x) = \ln(x) - \dfrac{x^2-1}{2x^2}$ et $J(x) = \dfrac{(x-1)^2}{x}$

   **c)** *(0,5)* Montrer que : $\forall x \in\, ]1, +\infty[$, $\ f'(x) = \dfrac{-2}{(x+1)^2} \times \dfrac{I(x)}{J(x)}$

   **d)** *(0,5)* En déduire que : $\forall x \in\, ]1, +\infty[$, $\ -\dfrac{1}{2} \le f'(x) \le 0$

6. **a)** *(0,25)* Dresser le tableau de variations de la fonction $f$.

   **b)** *(0,5)* Tracer la courbe $(C)$. *(On prendra $\|\vec{i}\| = 1\ \text{cm}$ et $\|\vec{j}\| = 2\ \text{cm}$)*

7. *(0,5)* Montrer que l'équation $f(x) = x - 1$ admet une unique solution $a$ dans $]1\,;2[$.

8. Soit $(a_n)_{n \in \mathbb{N}}$ la suite numérique définie par :

   $$a_0 \in [1, +\infty[ \qquad \text{et} \qquad \text{pour tout } n \in \mathbb{N},\quad a_{n+1} = 1 + f(a_n)$$

   **a)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})$, $\ |a_{n+1} - a| \le \dfrac{1}{2}|a_n - a|$

   **b)** *(0,5)* Montrer par récurrence que : $(\forall n \in \mathbb{N})$, $\ |a_n - a| \le \left(\dfrac{1}{2}\right)^n |a_0 - a|$

   **c)** *(0,25)* En déduire que la suite $(a_n)_{n \in \mathbb{N}}$ est convergente.

---

## 2024 — session normale — Exercice 2
Source: https://www.alloschool.com/element/145739
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-23. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **2,5 points**
- Recompte question par question, relevé dans la marge du scan :
  $0{,}5+0{,}5+0{,}5+0{,}5+0{,}5 = \mathbf{2{,}5}$ ✔
- Images lues : `.../0003-big.jpg`
- Page du scan : 3 (sur 5)
- Aucune figure n'est imprimée.

**EXERCICE 2 (2,5 points)**

Soit $F$ la fonction numérique définie sur l'intervalle $[0\,;1]$ par : $F(x) = \displaystyle\int_0^x e^{t^2}\,dt$

1. **a)** *(0,5)* Montrer que $F$ est continue, strictement croissante sur $[0\,;1]$.

   **b)** *(0,5)* En déduire que $F$ est une bijection de $[0\,;1]$ vers $[0\,;\beta]$ avec $\beta = \displaystyle\int_0^1 e^{t^2}\,dt$

2. On note $F^{-1}$ la bijection réciproque de $F$.

   Pour tout $n \in \mathbb{N}^{*}$, on pose : $S_n = \dfrac{1}{n}\displaystyle\sum_{k=1}^{k=n} F^{-1}\!\left(\dfrac{k}{n}\beta\right)$

   **a)** *(0,5)* Montrer que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est convergente de limite $\ell = \dfrac{1}{\beta}\displaystyle\int_0^{\beta} F^{-1}(t)\,dt$

   **b)** *(0,5)* Montrer que $\ell = \dfrac{1}{\beta}\displaystyle\int_0^1 u\,e^{u^2}\,du$

   *(On pourra effectuer le changement de variable $u = F^{-1}(t)$)*

   **c)** *(0,5)* En déduire que : $\ell = \dfrac{e-1}{2\beta}$

---

## Classement proposé (à confirmer par le vérificateur)

Correspondance vers les slugs `content/maths/`. **Non contrôlée contre
l'arborescence réelle par cette passe** — le vérificateur doit le faire.

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 7,5 pts | **`fonction-logarithme`** (dominant : $f(x)=\ln x/(x^2-1)$, et tout l'exercice tourne autour du comportement de $\ln$ près de $1$) · cross-lists : `limites-continuite` (q1, q2, q3-c), `derivabilite-etude-fonctions` (q3-b par le TAF, q4, q5-c/d, q6, q7), `calcul-integral` (q5 tout entière), `suites-numeriques` (q8) |
| Exercice 2 | 2,5 pts | **`calcul-integral`** (dominant : intégrale à borne variable, bijection réciproque, somme de Riemann, changement de variable) · cross-lists : `derivabilite-etude-fonctions` (la bijection réciproque de q1-b et q2), `suites-numeriques` (la convergence de $(S_n)$), `fonction-exponentielle` (l'intégrande) |

**Deux points d'attention pour le classement :**

1. L'exercice 1 **q3-b invoque nommément le théorème des accroissements
   finis**, et l'énoncé le suggère explicitement. Le docket de complétude
   (`docs/audits/lesson-completeness-docket.md`, catégorie C) note que Rolle et
   le TAF sont **spécifiques SM** et volontairement non promus au rang de rung
   dans `derivabilite-etude-fonctions`. Ce sujet étant SM, l'usage est
   légitime — il faudra le ponter au point d'usage dans le `reasoning`, comme
   le corpus le fait déjà ailleurs, et non le supposer acquis.
2. L'exercice 2 mobilise la **dérivée / l'intégrale d'une bijection
   réciproque**, outil dont le rung existe depuis la passe du 2026-08-22 dans
   `derivabilite-etude-fonctions` (docket A6, section « Fonction réciproque :
   la même courbe, lue dans l'autre sens » et « La dérivée de la réciproque en
   un point »). Le pont est donc disponible, ce qui n'était pas le cas avant.

## Ce que la vérification devra trancher en priorité

1. **Le sens des inégalités de q3-b** : le scan porte
   $-\frac12 < \cdots < \frac{-1}{2(1+\sqrt t)}$. Vérifier que le membre de
   droite est bien $\frac{-1}{2(1+\sqrt{t})}$ et non $\frac{-1}{2}(1+\sqrt t)$ —
   la position de la parenthèse change tout, et les deux se ressemblent au
   rendu.
2. **L'identité de q4-a**, longue et à trois termes : chaque signe, chaque
   dénominateur ($x-1$ contre $2(x+1)$ contre $2(x-1)^2$) est à relire au zoom.
   C'est l'endroit du sujet où une erreur de transcription serait la plus
   coûteuse et la moins visible.
3. **Les deux intégrales de q5** : $I$ a $t^3$ au dénominateur, $J$ a $t^2$.
   Une inversion casserait tout l'exercice, et les deux lignes sont adjacentes.
4. **Les échelles de q6-b** : $\|\vec i\| = 1$ cm et $\|\vec j\| = 2$ cm — le
   repère est **orthogonal**, pas orthonormé, et les deux échelles diffèrent.
5. **La somme de q2 de l'exercice 2** : les bornes sont écrites $k=1$ à $k=n$
   (et non $0$ à $n-1$), et l'argument est $\frac{k}{n}\beta$ — vérifier que le
   $\beta$ est bien à l'intérieur de $F^{-1}$.
6. **Le recompte des barèmes** des deux exercices, dans la marge.
7. **La re-dérivation mathématique complète** : chaque identité que l'énoncé
   demande de « montrer » ou de « vérifier » doit se vérifier réellement. En
   particulier l'expression de $I(x)$ et $J(x)$ en q5-b, celle de $f'(x)$ en
   q5-c, et le résultat final $\ell = \frac{e-1}{2\beta}$ de l'exercice 2.
