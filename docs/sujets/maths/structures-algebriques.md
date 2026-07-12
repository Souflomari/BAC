# `structures-algebriques` — Structures algébriques (lois de composition, groupes, anneaux, corps, morphismes)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Chapitre **spécifique à la filière Sciences Mathématiques (SM)** — absent de
> l'épreuve Sciences Expérimentales (SVT / Sc. Physiques).

---

## 2019 — session normale — Exercice 1
Source: https://www.alloschool.com/element/68482
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Mathématiques (A) et (B) (شعبة العلوم الرياضية أ و ب), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-54931/0002-big.jpg`
- Pages du scan : 2 (sur 5)

**Structures algébriques (loi interne sur $\mathbb{C}$, groupe, isomorphisme vers un ensemble de matrices).**

On rappelle que $(\mathbb{C},+,\times)$ est un corps commutatif et que $(M_2(\mathbb{R}),+,\times)$ est un anneau unitaire de zéro la matrice nulle $O = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ et d'unité la matrice $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$

Soit $*$ la loi de composition interne définie sur $\mathbb{C}$ par :
$$\left(\forall (x,y) \in \mathbb{R}^2\right)\left(\forall (a,b) \in \mathbb{R}^2\right) \quad ; \quad (x+yi)*(a+bi) = xa + \left(x^2 b + a^2 y\right)i$$

1. a) (0,25) Montrer que la loi $*$ est commutative sur $\mathbb{C}$
   b) (0,5) Montrer que la loi $*$ est associative sur $\mathbb{C}$
   c) (0,25) Montrer que la loi $*$ admet un élément neutre $e$ que l'on déterminera.
   d) (0,25) Soit $(x,y) \in \mathbb{R}^* \times \mathbb{R}$. Montrer que le nombre complexe $x+yi$ admet le nombre complexe $\dfrac{1}{x} - \dfrac{y}{x^4}i$ comme symétrique pour la loi $*$
2. On considère le sous-ensemble $E$ de $\mathbb{C}$ défini par : $E = \left\{ x+yi \ / \ x \in \mathbb{R}_+^*\ ;\ y \in \mathbb{R} \right\}$
   a) (0,25) Montrer que $E$ est stable pour la loi $*$ dans $\mathbb{C}$
   b) (0,5) Montrer que $(E,*)$ est un groupe commutatif.
3. (0,5) On considère le sous-ensemble $G$ de $E$ défini par : $G = \left\{ 1+yi\ /\ y \in \mathbb{R} \right\}$
   Montrer que $G$ est un sous-groupe de $(E,*)$
4. On considère l'ensemble $F = \left\{ M(x,y) = \begin{pmatrix} x & y \\ 0 & x \end{pmatrix} \ / \ x \in \mathbb{R}_+^*\ ;\ y \in \mathbb{R} \right\}$
   a) (0,25) Montrer que $F$ est stable pour la loi $\times$ dans $M_2(\mathbb{R})$
   b) (0,5) Soit $\varphi$ l'application de $E$ vers $F$ qui à tout nombre complexe $x+yi$ de $E$ fait correspondre la matrice $M(x^2,y) = \begin{pmatrix} x^2 & y \\ 0 & x^2 \end{pmatrix}$ de $F$
   Montrer que $\varphi$ est un isomorphisme de $(E,*)$ vers $(F,\times)$
   c) (0,25) En déduire que $(F,\times)$ est un groupe commutatif.
