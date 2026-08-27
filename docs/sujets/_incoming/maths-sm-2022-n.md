# Examen national Mathématiques — SM — 2022, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué l'exercice `Statut: vérifié`.
>
> **⚠️ CE SUJET EST LE PLUS RISQUÉ DES QUATRE TRANSCRITS CETTE NUIT.** Son
> scan souffre d'une substitution de police massive (voir la note de lecture
> ci-dessous) : presque **tous** les symboles mathématiques non alphabétiques
> y sont remplacés par des caractères d'une autre police. Chaque occurrence a
> dû être adjugée. La vérification doit être proportionnellement plus lente et
> plus méfiante ici que sur les sujets 2024 et 2025.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 1** (le problème d'analyse, 10 pts). Les exercices 2, 3 et 4
> sont **déjà en banque** — `bk-2022-n-x2` de `nombres-complexes-2`,
> `bk-2022-n-x3` de `arithmetique`, `bk-2022-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves somme les `bareme_total`, un doublon fausserait
> le /20.

## Pourquoi ce sujet

L'épreuve **SM 2022 session normale** est assemblée à **10,00/20** dans
Examens blancs. Cet exercice vaut exactement les 10 points qui manquent.
Quatrième pièce du gisement SM.

## En-tête du scan (relu)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2022** — الموضوع
- Code sujet **NS 24F** · مادة : الرياضيات
- مسلك العلوم الرياضية — أ و ب — خيار فرنسية
- Source : https://www.alloschool.com/element/136604
- Images : `.../course-436/upload-84506/000{1..5}-big.jpg` (5 pages)
- L'exercice 1 occupe les pages 2 et 3 (paginées « 2/5 » et « 3/5 »).

## ⚠️ NOTE DE LECTURE — substitution de police massive

Ce scan a été produit à partir d'un document dont les polices de symboles
n'ont pas été incorporées. Le résultat est une substitution **systématique**,
et non intermittente comme sur les sujets 2023. **Aucun glyphe ne se lit pour
ce qu'il montre.** Voici la table de correspondance établie, occurrence par
occurrence, par la logique de l'exercice :

| Rendu à l'écran | Lu comme | Base de l'adjudication |
|---|---|---|
| `"` | $\forall$ | Position en tête de quantificateur, systématique |
| `Î` | $\in$ | Toujours entre une variable et un ensemble |
| `¡` | $\mathbb{R}$ | Dans « $\forall x \in$ ¡$^+$ », et l'exercice porte sur des réels positifs |
| `¥` | $\mathbb{N}$ ou $+\infty$ | **Deux valeurs distinctes !** $\mathbb{N}$ quand l'indice est entier (« $n \in$ ¥ »), $+\infty$ dans les bornes d'intervalle (« $[0,+$¥$[$ ») |
| `£` | $\le$ | Toujours dans des encadrements |
| `®` | $\to$ | Dans « $x$ ® $+$¥ » sous un `lim` |
| `¢` | $'$ (prime) | Dans « $f$¢$(x)$ » et « $F$¢$(x)$ » |
| `a` | $\alpha$ | Le point fixe de $f$, noté $\alpha$ partout ailleurs dans le corpus |
| `p,+¥ [` | $]0,+\infty[$ | Le `p` initial est le crochet ouvrant renversé |
| `ò` | $\int$ | Signe d'intégrale |
| `å` | $\sum$ | Signe de somme |
| `æ ö ç ÷ è ø` | grandes parenthèses | Fragments d'une parenthèse extensible ; le contenu est entre elles |
| `1` (isolé, E-2c) | $\ell$ | « la limite 1 de la suite » n'a aucun sens ; c'est la lettre $\ell$ |
| `D` (E) | $D_k$ | Lettre latine, pas $\Delta$ — le contexte est une différence indexée |
| `D` (ex. 2) | $\Delta$ | Là, c'est bien le discriminant |

**Deux pièges spécifiques à ce scan, que le vérificateur doit contrôler en
priorité :**

1. **Le glyphe `¥` a DEUX significations** selon le contexte ($\mathbb{N}$ ou
   $+\infty$). Toute lecture qui les confond casse un quantificateur ou une
   borne.
2. **En D-2a, le « l » de « ln » a été absorbé** par le glyphe de parenthèse
   extensible : le scan affiche « …$\big)$$n(1+x)$ », qu'il faut lire
   « $\big)\ln(1+x)$ ». Contrôle indépendant qui le confirme : à $x = 1$,
   $F(1) = \int_1^1 f = 0$, et l'expression lue donne
   $2\ln 2 - (1+1)\ln 2 = 0$ ✔. Une autre lecture ne passerait pas ce test.

Aucune **valeur numérique** n'est touchée par la substitution — seuls les
symboles le sont.

---

## 2022 — session normale — Exercice 1
Source: https://www.alloschool.com/element/136604
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-27. En attente
d'une passe adversariale indépendante avec re-fetch du scan. **Vigilance
renforcée demandée** (voir la note de lecture ci-dessus).

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **10 points**
- Recompte question par question, relevé dans la marge du scan :
  A $= 0{,}25+0{,}25 = 0{,}5$ ·
  B-1 $= 0{,}5 \times 3 = 1{,}5$ ·
  B-2 $= 0{,}5+0{,}5+0{,}25+0{,}25 = 1{,}5$ ·
  B-3 $= 0{,}25+0{,}5 = 0{,}75$ ·
  C-1 $= 0{,}5$ ·
  C-2 $= 0{,}5+0{,}5+0{,}5+0{,}25 = 1{,}75$ ·
  D-1 $= 0{,}5$ ·
  D-2 $= 0{,}5+0{,}5+0{,}5 = 1{,}5$ ·
  E-1 $= 0{,}25+0{,}5 = 0{,}75$ ·
  E-2 $= 0{,}25+0{,}25+0{,}25 = 0{,}75$ —
  total $= \mathbf{10}$ ✔
- Images lues : `.../0002-big.jpg` (parties A, B, début de C), `.../0003-big.jpg` (fin de C, D, E)
- Aucune figure n'est imprimée : la question B-3-b demande au candidat de **représenter** la courbe.

**EXERCICE 1 (10 points)**

**A**

1. *(0,25)* Vérifier que : $\left(\forall x \in \mathbb{R}^{+}\right)\ ;\quad 0 \le 1 - x + x^2 - \dfrac{1}{x+1} \le x^3$

2. *(0,25)* En déduire que : $\left(\forall x \in \mathbb{R}^{+}\right)\ ;\quad 0 \le x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \ln(1+x) \le \dfrac{x^4}{4}$

**B** — On considère la fonction $f$ définie sur $I = [0, +\infty[$ par :

$$f(0) = \frac{1}{2} \qquad \text{et pour tout } x \text{ de } ]0, +\infty[\ ;\quad f(x) = \frac{x - \ln(1+x)}{x^2}$$

et soit $(C)$ sa courbe représentative dans un repère orthonormé $(O\,; \vec{i}, \vec{j})$.

1. **a)** *(0,5)* Montrer que $f$ est continue à droite en $0$.

   **b)** *(0,5)* Montrer que $f$ est dérivable à droite en $0$.

   **c)** *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$, puis interpréter graphiquement le résultat obtenu.

2. **a)** *(0,5)* Montrer que : $\left(\forall x \in\, ]0, +\infty[\right)\ ;\quad f'(x) = -\dfrac{g(x)}{x^3}$

   où $g(x) = x + \dfrac{x}{x+1} - 2\ln(1+x)$

   **b)** *(0,5)* Montrer que : $\left(\forall x \in I\right)\ ;\quad 0 \le g'(x) \le x^2$

   **c)** *(0,25)* En déduire que : $\left(\forall x \in I\right)\ ;\quad 0 \le g(x) \le \dfrac{x^3}{3}$

   **d)** *(0,25)* Déterminer le sens de variation de $f$ sur $I$.

3. **a)** *(0,25)* Dresser le tableau de variation de $f$.

   **b)** *(0,5)* Représenter graphiquement la courbe $(C)$ dans le repère $(O\,;\vec{i}, \vec{j})$. *(On prendra $\|\vec{i}\| = 2\,cm$ et $\|\vec{j}\| = 2\,cm$)*

**C**

1. *(0,5)* Montrer qu'il existe un unique réel $\alpha \in\, ]0\,;1[$ tel que $f(\alpha) = \alpha$.

2. On considère la suite $(u_n)_{n \in \mathbb{N}}$ définie par :

   $$u_0 = \frac{1}{3} \qquad \text{et} \qquad \left(\forall n \in \mathbb{N}\right)\ ;\quad u_{n+1} = f(u_n)$$

   **a)** *(0,5)* Montrer que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad u_n \in [0\,;1]$

   **b)** *(0,5)* Montrer que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{3}|u_n - \alpha|$

   **c)** *(0,5)* Montrer par récurrence que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad |u_n - \alpha| \le \left(\dfrac{1}{3}\right)^{n}$

   **d)** *(0,25)* En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ converge vers $\alpha$.

**D** — Pour tout $x \in I$, on pose : $F(x) = \displaystyle\int_x^{1} f(t)\,dt$

1. *(0,5)* Montrer que la fonction $F$ est dérivable sur $I$ et calculer $F'(x)$ pour tout $x \in I$.

2. **a)** *(0,5)* En utilisant la méthode d'intégration par parties, montrer que :

   $$\left(\forall x \in\, ]0, +\infty[\right)\ ;\quad F(x) = 2\ln 2 - \left(1 + \frac{1}{x}\right)\ln(1+x)$$

   **b)** *(0,5)* Calculer $\displaystyle\lim_{x \to 0^{+}} F(x)$, puis en déduire que : $\displaystyle\int_0^{1} f(t)\,dt = 2\ln 2 - 1$

   **c)** *(0,5)* Calculer, en $cm^2$, l'aire du domaine plan limité par la courbe $(C)$, l'axe des abscisses, l'axe des ordonnées et la droite d'équation $x = 1$.

**E** — On pose : pour tout $k$ de $\mathbb{N}$, $\quad D_k = f(k) - \displaystyle\int_k^{k+1} f(t)\,dt$

et pour tout $n$ de $\mathbb{N}^{*}$, $\quad S_n = \displaystyle\sum_{k=0}^{k=n-1} D_k$

1. **a)** *(0,25)* Vérifier que : $\left(\forall k \in \mathbb{N}\right)\ ;\quad 0 \le D_k \le f(k) - f(k+1)$

   **b)** *(0,5)* En déduire que : $\left(\forall n \in \mathbb{N}^{*}\right)\ ;\quad 0 \le S_n \le \dfrac{1}{2}$

2. **a)** *(0,25)* Montrer que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est monotone.

   **b)** *(0,25)* En déduire que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est convergente.

   **c)** *(0,25)* Montrer que la limite $\ell$ de la suite $(S_n)_{n \in \mathbb{N}^{*}}$ vérifie : $\dfrac{3}{2} - 2\ln 2 \le \ell \le \dfrac{1}{2}$

---

## Classement proposé (à confirmer par le vérificateur)

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 10 pts | **`fonction-logarithme`** (dominant : $f(x) = \frac{x-\ln(1+x)}{x^2}$, et les parties A et B tournent entièrement autour de l'encadrement de $\ln(1+x)$) · cross-lists : `limites-continuite` (B-1), `derivabilite-etude-fonctions` (B-1b, B-2, B-3), `suites-numeriques` (C-2, E), `calcul-integral` (D tout entière, E) |

## Ce que la vérification devra trancher en priorité

**Ce sujet demande une vigilance renforcée : la substitution de police est
totale, pas intermittente.** Priorités :

1. **Chaque occurrence du glyphe `¥`**, qui vaut tantôt $\mathbb{N}$ tantôt
   $+\infty$. Il y en a une dizaine. Une seule confusion casse un
   quantificateur ou une borne d'intervalle.
2. **L'expression de $F(x)$ en D-2a** : le « l » de « ln » est absorbé par le
   glyphe de parenthèse. Lu $2\ln 2 - \left(1+\frac1x\right)\ln(1+x)$, et
   confirmé par le test $F(1) = 0$. À revérifier au zoom.
3. **L'exposant de la majoration en C-2c** : lu $\left(\frac13\right)^{n}$
   **sans** facteur $|u_0 - \alpha|$. Comparer avec les sujets 2023 N, 2024 N
   et 2025 N transcrits en parallèle, qui n'écrivent pas tous la même forme —
   c'est un endroit où un transcripteur normalise sans s'en rendre compte.
4. **La borne supérieure de la somme en E** : lu $\sum_{k=0}^{k=n-1}$.
   Vérifier que ce n'est pas $k=n$.
5. **L'encadrement final de E-2c** : $\frac32 - 2\ln 2 \le \ell \le \frac12$.
   Contrôle de vraisemblance déjà fait : $\frac32 - 2\ln 2 = 0{,}114$, donc
   l'encadrement $0{,}114 \le \ell \le 0{,}5$ est cohérent. À confirmer.
6. **Le recompte du barème**, partie par partie, dans la marge.
7. **La re-dérivation mathématique complète.** Points obligatoires :
   l'encadrement de A-1 et sa conséquence A-2 (par intégration terme à terme
   entre $0$ et $x$) ; l'expression de $f'$ en B-2a ; l'encadrement de $g'$ en
   B-2b, qui doit donner celui de $g$ en B-2c par intégration ; l'intégration
   par parties de D-2a ; et l'inégalité $D_k \le f(k) - f(k+1)$ de E-1a, qui
   doit découler de la décroissance de $f$.
