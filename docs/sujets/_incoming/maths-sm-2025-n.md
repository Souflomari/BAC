# Examen national Mathématiques — SM — 2025, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué l'exercice `Statut: vérifié`.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 1** (le problème d'analyse, 10 pts). Les exercices 2
> (nombres complexes), 3 (arithmétique) et 4 (structures algébriques) sont
> **déjà en banque** — `bk-2025-n-x2` de `nombres-complexes-2`,
> `bk-2025-n-x3` de `arithmetique`, `bk-2025-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves (`web/src/lib/examens.ts`) somme les
> `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2025 session normale** est assemblée à **10,00/20** dans
Examens blancs. Cet exercice vaut exactement les 10 points qui manquent.
Troisième pièce du gisement SM, après 2023 N et 2024 N transcrits en parallèle.

## En-tête du scan (relu)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2025**
- Code sujet **NS - 24F** · مادة : الرياضيات
- شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — **Sciences Mathématiques A et B, option française**
- Durée **4 h** · coefficient **9**
- Source : https://www.alloschool.com/element/145783
- Images : `.../course-436/upload-87482/000{1..6}-big.jpg` (**6 fichiers**)

**Deux particularités de pagination, à ne pas prendre pour des erreurs :**

1. Le scan compte **six fichiers image** mais la pagination interne annonce
   « 1/5 », « 2/5 », etc. Le **premier fichier est une page de couverture**
   (armoiries, « الدورة العادية 2025 » en rouge, code NS 24F) qui ne porte
   pas de numéro de page. Les consignes sont donc sur le **fichier 2**, qui
   se numérote lui-même « 1/5 ». **Décalage constant de un** entre numéro de
   fichier et numéro de page imprimé.
2. L'organisme émetteur imprimé change par rapport aux années précédentes :
   « المركز الوطني للامتحانات المدرسية وتقييم التعلمات » au lieu de
   « المركز الوطني للتقويم والامتحانات ». Relevé, sans conséquence.

**Consignes (fichier 2, transcrites) :** « La durée de l'épreuve est de 4
heures. — L'épreuve comporte **quatre** exercices indépendants. — Les exercices
peuvent être traités selon l'ordre choisi par le candidat. » Puis la carte des
composantes :

| Exercice | Domaine | Barème |
|---|---|---|
| 1 | analyse | **10 pts** |
| 2 | nombres complexes | 3,5 pts |
| 3 | arithmétique | 3 pts |
| 4 | structures algébriques | 3,5 pts |

Somme : $10+3{,}5+3+3{,}5 = \mathbf{20}$ ✔

**À noter :** ce sujet ne comporte que **quatre** exercices, là où 2023 N et
2024 N en comptaient cinq (deux volets d'analyse au lieu d'un). L'analyse y
est donc concentrée en un seul problème de 10 points.

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## NOTE DE LECTURE — pas de mojibake sur ce scan

Comme le sujet 2024 et contrairement aux deux sujets 2023, ce scan rend
**correctement** les lettres ajourées ($\mathbb{R}$, $\mathbb{N}$,
$\mathbb{N}^*$, $\mathbb{C}$) et le symbole $\le$. Aucune adjudication de
glyphe n'a été nécessaire. **À confirmer par le vérificateur**, pas à hériter.

---

## 2025 — session normale — Exercice 1
Source: https://www.alloschool.com/element/145783
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-23. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS - 24F · Barème de l'exercice : **10 points**
- Recompte question par question, relevé dans la marge du scan :
  Partie I $= 0{,}25+0{,}25+0{,}5+0{,}5+0{,}5+1+0{,}5+0{,}5+0{,}25+0{,}25+0{,}5+0{,}25 = 5{,}25$ ·
  Partie II $= 0{,}5+0{,}5+0{,}25+0{,}5+0{,}5+0{,}5+0{,}5+0{,}25 = 3{,}5$ ·
  Partie III $= 0{,}25+0{,}5+0{,}5 = 1{,}25$ —
  total $5{,}25+3{,}5+1{,}25 = \mathbf{10}$ ✔ conforme à la carte des composantes
- Images lues : fichiers `0003-big.jpg` (pagination « 2/5 » : Partie I et début de la Partie II) et `0004-big.jpg` (pagination « 3/5 » : fin de la Partie II et Partie III)
- Aucune figure n'est imprimée : la question 3 de la Partie I demande au candidat de **représenter** la courbe.

**EXERCICE 1 (10 points)**

On considère la fonction numérique $f$ définie sur $\mathbb{R}$ par : $f(x) = \dfrac{e^{x}}{e^{2x} + e}$

et soit $(\Gamma)$ sa courbe représentative dans un repère **orthogonal** $(O\,;\vec{i}, \vec{j})$.

**Partie I**

1. **a)** *(0,25)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad f(1-x) = f(x)$

   **b)** *(0,25)* Interpréter graphiquement le résultat obtenu.

   **c)** *(0,5)* Calculer $\displaystyle\lim_{x \to -\infty} f(x)$ puis en déduire $\displaystyle\lim_{x \to +\infty} f(x)$

   **d)** *(0,5)* Interpréter graphiquement les deux résultats obtenus.

2. **a)** *(0,5)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad f'(x) = f(x)\,\dfrac{1 - e^{2x-1}}{1 + e^{2x-1}}$

   **b)** *(1)* Donner les variations de $f$ puis en déduire que :

   $$(\forall x \in \mathbb{R})\ ;\qquad 0 < f(x) < \frac{1}{2}$$

3. *(0,5)* Représenter graphiquement la courbe $(\Gamma)$.

   *(On prendra $\|\vec{i}\| = 1\,cm$, $\|\vec{j}\| = 2\,cm$ et $\dfrac{1}{2\sqrt{e}} \cong 0{,}30$ et $\dfrac{1}{1+e} \cong 0{,}27$)*

4. **a)** *(0,5)* Montrer que : $\displaystyle\int_0^{\frac{1}{2}} f(x)\,dx = \int_{\frac{1}{2}}^{1} f(x)\,dx$

   **b)** *(0,25)* En déduire que $\displaystyle\int_0^{1} f(x)\,dx = 2\int_0^{\frac{1}{2}} f(x)\,dx$

5. **a)** *(0,25)* En effectuant le changement de variables : $t = e^{x}$, montrer que :

   $$\int_0^{\frac{1}{2}} f(x)\,dx = \int_1^{\sqrt{e}} \frac{dt}{t^2 + e}$$

   **b)** *(0,5)* Montrer que : $\displaystyle\int_0^{\frac{1}{2}} f(x)\,dx = \dfrac{1}{\sqrt{e}}\left(\arctan\left(\sqrt{e}\right) - \dfrac{\pi}{4}\right)$

   **c)** *(0,25)* En déduire l'aire, en $\text{cm}^2$, du domaine plan délimité par $(\Gamma)$, les droites d'équations respectives : $x = 0$, $x = 1$ et $y = 0$

**Partie II**

On considère la suite $(u_n)_{n \in \mathbb{N}}$ définie par : $u_0 \in\, \left]0\,;\dfrac{1}{2}\right[$ et $(\forall n \in \mathbb{N})\ ;\quad u_{n+1} = f(u_n)$

1. *(0,5)* En utilisant le résultat de la question I.2-a), montrer que :

   $$(\forall x \in \mathbb{R})\ ;\quad |f'(x)| \le f(x)$$

2. **a)** *(0,5)* Montrer que : $\left(\forall x \in \left[0\,;\dfrac{1}{2}\right]\right)\ ;\quad 0 \le f'(x) < \dfrac{1}{2}$

   **b)** *(0,25)* Montrer que la fonction $g : x \mapsto g(x) = f(x) - x$ est strictement décroissante sur $\mathbb{R}$

   **c)** *(0,5)* En déduire qu'il existe un unique réel $\alpha \in\, \left]0\,;\dfrac{1}{2}\right[$ tel que : $f(\alpha) = \alpha$

3. **a)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})\ ;\quad 0 < u_n < \dfrac{1}{2}$

   **b)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{2}|u_n - \alpha|$

   **c)** *(0,5)* Montrer par récurrence que : $(\forall n \in \mathbb{N})\ ;\quad |u_n - \alpha| \le \left(\dfrac{1}{2}\right)^{n+1}$

   **d)** *(0,25)* En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ converge vers $\alpha$

**Partie III**

On considère la suite numérique $(S_n)_{n \in \mathbb{N}}$ définie par :

$$(\forall n \in \mathbb{N}^{*})\ ;\qquad S_n = \frac{1}{n(n+1)}\sum_{k=1}^{k=n} \frac{k}{e^{\frac{k}{n}} + e^{\frac{n-k}{n}}}$$

1. **a)** *(0,25)* Vérifier que : $(\forall n \in \mathbb{N}^{*})\ ;\quad S_n = \dfrac{1}{n+1}\displaystyle\sum_{k=1}^{k=n} \dfrac{k}{n}\,f\!\left(\dfrac{k}{n}\right)$

   **b)** *(0,5)* Montrer que : $\displaystyle\int_0^{1} x\,f(x)\,dx = \int_0^{\frac{1}{2}} f(x)\,dx$

   *(On pourra effectuer le changement de variables : $t = 1 - x$)*

2. *(0,5)* Montrer que la suite $(S_n)_{n \in \mathbb{N}}$ est convergente et déterminer sa limite.

---

## Classement proposé (à confirmer par le vérificateur)

Correspondance vers les slugs `content/maths/`. **Non contrôlée contre
l'arborescence réelle par cette passe** — le vérificateur doit le faire.

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 10 pts | **`fonction-exponentielle`** (dominant : $f(x)=e^x/(e^{2x}+e)$, et la symétrie $f(1-x)=f(x)$ comme la dérivée sont des faits de l'exponentielle) · cross-lists : `limites-continuite` (Partie I-1c/1d), `derivabilite-etude-fonctions` (Partie I-2, Partie II-2), `calcul-integral` (Partie I-4/5, Partie III-1b), `suites-numeriques` (Parties II-3 et III) |

**Le choix du slug dominant est à arbitrer, et il n'est pas évident.** Deux
lectures défendables :
- **`fonction-exponentielle`** — c'est l'objet même de la fonction, et la
  symétrie remarquable $f(1-x)=f(x)$ en découle directement ;
- **`calcul-integral`** — les Parties I-4/5 et III y sont entièrement, et la
  Partie III est une somme de Riemann conclue par une intégrale.
Le vérificateur devrait trancher, ou le laisser explicitement à l'owner.

## Ce que la vérification devra trancher en priorité

1. **L'exposant $2x-1$** de la dérivée en I-2a : le scan porte
   $\dfrac{1-e^{2x-1}}{1+e^{2x-1}}$. Vérifier que ce n'est pas $2x+1$ — c'est
   la question qui porte toute la Partie I et une bonne part de la Partie II
   (elle est rappelée nommément en II-1).
2. **L'apparition de $\arctan$** en I-5b. Cette fonction est **spécifique à la
   filière SM** et n'a, à ma connaissance, aucun rung dans le corpus. Vérifier
   la lecture, puis signaler la lacune : si l'exercice est converti, il faudra
   ponter $\arctan$ au point d'usage — comme le corpus le fait déjà pour Rolle
   et le théorème des accroissements finis.
3. **Les deux valeurs approchées données en I-3** : $\frac{1}{2\sqrt e} \cong 0{,}30$
   et $\frac{1}{1+e} \cong 0{,}27$. Recalculer : $\frac{1}{2\sqrt e} = 0{,}3033$
   et $\frac{1}{1+e} = 0{,}2689$ — cohérent, mais à confirmer au zoom (le
   symbole est bien $\cong$ et non $=$).
4. **L'exposant $n+1$** de la majoration en II-3c : le scan porte
   $\left(\frac12\right)^{n+1}$ **sans facteur** $|u_0 - \alpha|$, là où les
   sujets 2023 N et 2024 N écrivent tous deux une majoration **avec** le
   facteur initial. C'est une différence réelle entre les trois sujets, et
   elle est logique ici puisque $|u_0-\alpha| < \frac12$ — mais elle mérite
   une relecture attentive, c'est exactement le genre d'endroit où un
   transcripteur normalise sans s'en rendre compte.
5. **La double sommation de la Partie III** : le dénominateur porte
   $e^{\frac{k}{n}} + e^{\frac{n-k}{n}}$ — vérifier l'exposant $\frac{n-k}{n}$
   du second terme, et le facteur $\frac{1}{n(n+1)}$ devant la somme, qui
   devient $\frac{1}{n+1}$ après réécriture en 1-a.
6. **Le recompte du barème**, dans la marge, partie par partie.
7. **La re-dérivation mathématique complète.** Points à refaire absolument :
   la symétrie $f(1-x)=f(x)$ (I-1a) ; l'expression de $f'$ (I-2a) ;
   l'inégalité $|f'(x)| \le f(x)$ (II-1), qui découle de I-2a par
   $\left|\frac{1-u}{1+u}\right| \le 1$ ; la réécriture de $S_n$ (III-1a) ; et
   le changement de variable $t = 1-x$ de III-1b, dont le résultat doit se
   recouper avec I-4a.
