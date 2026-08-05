# `structures-algebriques` — Structures algébriques (lois de composition, groupes, anneaux, corps, morphismes)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Chapitre **spécifique à la filière Sciences Mathématiques (SM)** — absent de
> l'épreuve Sciences Expérimentales (SVT / Sc. Physiques).

---

## 2019 — session normale — Exercice 1
Source: https://www.alloschool.com/element/68482
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan (valeurs, notation, indices, exposants, barèmes, énoncé) ; filière et code NS..F confirmés sur l'en-tête du scan.

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

---

## 2020 — session normale — Exercice 2
Source: https://www.alloschool.com/element/109635
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element/109635 → course-436/upload-80775 re-dérivé, 5 pages), diff caractère-par-caractère conforme au scan (valeurs, indices, exposants, entrées de matrices, barèmes, numérotation, énoncé, consignes) ; code sujet « NS 25 » (sans suffixe F) confirmé sur l'en-tête ; glyphes mojibake confirmés (ℝ=«¡», ℝ*=«¡*», ×=«´», ∈=«Î», ∀=«"», φ=«j») ; coin haut-gauche de la matrice de $E$ = **1** (non $x$) et $F$ : $M(x)=\left(\begin{smallmatrix}1&x-1\\0&x\end{smallmatrix}\right)$ confirmés au zoom.

- Filière / épreuve : Sciences Mathématiques (A) et (B) (شعبة العلوم الرياضية (أ) و (ب)), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 25 · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-80775/0001-big.jpg` (en-tête, consignes), `.../course-436/upload-80775/0002-big.jpg` (énoncé Exercice 2)
- Pages du scan : 2 (sur 5)
- Exercice **au choix** : la page de consignes impose EXERCICE3 (complexes) et EXERCICE4 (analyse) et laisse choisir EXERCICE1 (arithmétique) **ou** EXERCICE2 (structures). Cette entrée transcrit EXERCICE2.
- Note glyphes (scan ré-exporté, police substituée — **à confirmer par le vérificateur**) : $\mathbb{R}$ est rendu « ¡ » (donc $\mathbb{R}^*$ = « ¡* ») ; $\times$ = « ´ » ; $\in$ = « Î » ; l'application $\varphi$ est rendue « j » ; les crochets de matrices sont des fragments Word (« æ ö / ç ÷ / è ø »). Restitution d'après le contexte.

**Structures algébriques (partie stable de $(M_2(\mathbb{R}),\times)$, groupe non commutatif, homomorphisme depuis $(\mathbb{R}^*,\times)$).**

On note par $M_2(\mathbb{R})$ l'ensemble des matrices carrées d'ordre deux.
On rappelle que $(M_2(\mathbb{R}),+,\times)$ est un anneau non commutatif unitaire d'unité $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ et que $(\mathbb{R}^*,\times)$ est un groupe commutatif.

On considère le sous-ensemble $E$ de $M_2(\mathbb{R})$ défini par :
$$E = \left\{ \begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix} \ /\ x \in \mathbb{R}\ \text{ et }\ y \in \mathbb{R}^* \right\}$$

1. a) (0,5) Montrer que $E$ est une partie stable de $(M_2(\mathbb{R}),\times)$
   b) (0,5) Montrer que la multiplication n'est pas commutative dans $E$
   c) (0,5) Vérifier que : $(\forall x \in \mathbb{R})(\forall y \in \mathbb{R}^*)$ ;
   $$\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix}\begin{pmatrix} 1 & -\dfrac{x}{y} \\ 0 & \dfrac{1}{y} \end{pmatrix} = \begin{pmatrix} 1 & -\dfrac{x}{y} \\ 0 & \dfrac{1}{y} \end{pmatrix}\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$
2. (0,5) Montrer que $(E,\times)$ est un groupe non commutatif.
3. On considère le sous-ensemble $F$ de $E$ défini par :
   $$F = \left\{ M(x) = \begin{pmatrix} 1 & x-1 \\ 0 & x \end{pmatrix} \ /\ x \in \mathbb{R}^* \right\}$$
   a) (0,5) Montrer que l'application $\varphi$ définie par : $(\forall x \in \mathbb{R}^*)$ ; $\varphi(x) = M(x)$ est un homomorphisme de $(\mathbb{R}^*,\times)$ vers $(E,\times)$.
   b) (1) En déduire que $(F,\times)$ est un groupe commutatif dont on précisera l'élément neutre.

---

## 2022 — session normale — Exercice 4
Source: https://www.alloschool.com/element/136604
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element/136604 → course-436/upload-84506 re-dérivé, 5 pages), diff caractère-par-caractère conforme au scan (valeurs, indices, exposants, entrées de matrices, barèmes, énoncé) ; code sujet « NS 24F » confirmé ; deux glyphes d'ensembles **visuellement distincts** confirmés au zoom du scan — «¡»=ℝ dans $M_2(\cdot)$ (trait vertical, point d'exclamation inversé) et «¢»=ℤ pour l'anneau des scalaires (signe cent, barre traversant le c) ; lecture ℤ corroborée doublement : par la logique de l'énoncé (3-b, 4-b/c) ET par l'emploi identique de «¢» pour ℤ² dans l'exercice d'arithmétique 2020 (« ¢´¢ », équation diophantienne) ; $M(a,b)=\left(\begin{smallmatrix}a&3b\\b&a\end{smallmatrix}\right)$ et $M(a,b)\times M(c,d)=M(ac+3bd,\ ad+bc)$ confirmés.

- Filière / épreuve : Sciences Mathématiques (A) et (B) (مسلك العلوم الرياضية – أ و ب – خيار فرنسية / BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-84506/0001-big.jpg` (en-tête, consignes), `.../course-436/upload-84506/0005-big.jpg` (énoncé Exercice 4)
- Pages du scan : 5 (sur 5)
- Note glyphes (scan ré-exporté, police substituée — **à confirmer par le vérificateur**) : $\times$ = « ´ » ; $\in$ = « Î » ; $\Longleftrightarrow$ = « Û » ; l'application $\varphi$ est rendue « j » ; crochets de matrices = fragments Word. Deux glyphes distincts pour les ensembles : « ¡ » (dans $M_2(\cdot)$) et « ¢ » (l'anneau des scalaires et $\cdot^2$). **Lecture retenue : $M_2(\mathbb{R})$ et anneau des scalaires $=\mathbb{Z}$** — ce dernier point est *forcé par la logique de l'énoncé*, pas seulement lu : sur $\mathbb{R}$ ou $\mathbb{Q}$ la question 3-b) (« inversible $\Rightarrow \varphi=1$ ») est fausse, seul $\mathbb{Z}$ la rend vraie ainsi que l'intégrité de 4-b) et la réponse attendue en 4-c). Glyphe « ¢ » = $\mathbb{Z}$ **à confirmer** sur le scan.

**Structures algébriques (sous-anneau $E\cong\mathbb{Z}[\sqrt{3}]$ de $M_2(\mathbb{R})$ : homomorphisme multiplicatif, inversibilité, intégrité, corps ?).**

On rappelle que $(M_2(\mathbb{R}),+,\times)$ est un anneau unitaire non commutatif d'unité $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ et que $(\mathbb{Z},+,\times)$ est un anneau commutatif unitaire et intègre.

Soit $E = \left\{ M(a,b) = \begin{pmatrix} a & 3b \\ b & a \end{pmatrix} \ /\ (a,b) \in \mathbb{Z}^2 \right\}$

1. a) (0,25) Montrer que $E$ est un sous-groupe de $(M_2(\mathbb{R}),+)$
   b) (0,25) Vérifier que pour tout $a,b,c$ et $d$ de $\mathbb{Z}$, on a : $M(a,b)\times M(c,d) = M(ac+3bd,\ ad+bc)$
   c) (0,5) Montrer que $(E,+,\times)$ est un anneau commutatif et unitaire.
2. (0,5) Soit $\varphi$ l'application définie de $E$ vers $\mathbb{Z}$ par : $\forall(a,b) \in \mathbb{Z}^2$ ; $\varphi(M(a,b)) = |a^2 - 3b^2|$.
   Montrer que $\varphi$ est un homomorphisme de $(E,\times)$ vers $(\mathbb{Z},\times)$.
3. Soit $M(a,b) \in E$.
   a) (0,25) Montrer que $M(a,b)\times M(a,-b) = (a^2 - 3b^2)\cdot I$
   b) (0,5) Montrer que si $M(a,b)$ est inversible dans $(E,\times)$ alors $\varphi(M(a,b)) = 1$
   c) (0,5) On suppose que $\varphi(M(a,b)) = 1$. Montrer que $M(a,b)$ est inversible dans $(E,\times)$ et préciser son inverse.
4. a) (0,25) Montrer que : $\forall(a,b) \in \mathbb{Z}^2$ ; $\varphi(M(a,b)) = 0 \Longleftrightarrow a = b = 0$
   b) (0,25) En déduire que l'anneau $(E,+,\times)$ est intègre.
   c) (0,25) Est-ce que $(E,+,\times)$ est un corps ? justifier votre réponse.

---

## 2024 — session normale — Exercice 4
Source: https://www.alloschool.com/element/145739
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element/145739 → course-436/upload-87447 re-dérivé, 5 pages), diff caractère-par-caractère conforme au scan (valeurs, exposants, barèmes, énoncé) ; code sujet « NS 24F » confirmé ; numérotation confirmée sur le corps — l'exercice de structures y est bien intitulé **EXERCICE4** (p.4/5, 3,5 pts) et l'arithmétique **EXERCICE5** (p.5/5, 3 pts), à l'inverse des libellés de la page de consignes (p.1/5) ; loi $T$ : $(a,b)\,T\,(c,d)=(a\bar d+c,\ bd)$ et inverse $\left(-\frac{a}{\bar b},\ \frac1b\right)$ avec **barre de conjugaison sur $b$** au dénominateur confirmés au zoom ; sujet en Unicode propre (aucun mojibake).

- Filière / épreuve : Sciences Mathématiques (A) et (B) (شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) / BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-87447/0001-big.jpg` (en-tête, consignes), `.../course-436/upload-87447/0004-big.jpg` (énoncé Exercice 4), `.../course-436/upload-87447/0005-big.jpg` (fin de l'épreuve, contrôle de numérotation)
- Pages du scan : 4 (sur 5)
- Note numérotation : la page de consignes (1/5) annonce « EXERCICE5 … structures algébriques (3,5 pts) » et « EXERCICE4 … arithmétique (3 pts) », mais **le corps de l'épreuve intervertit ces deux libellés** : l'exercice de structures algébriques est bien intitulé **EXERCICE4** (page 4/5, 3,5 pts) et l'arithmétique **EXERCICE5** (page 5/5, 3 pts). Cette entrée suit l'intitulé du corps (Exercice 4).
- Note glyphes : sujet 2024 rendu en **Unicode propre** (pas de mojibake) — $\mathbb{C}$, $\mathbb{C}^*$, $\mathbb{R}$, $\mathbb{R}^*$, conjugué $\bar{d}$ tous lisibles directement.

**Structures algébriques (loi interne $T$ sur $\mathbb{C}\times\mathbb{C}^*$ : groupe non commutatif, sous-groupe $\mathbb{R}\times\mathbb{R}^*$).**

On considère dans $\mathbb{C}\times\mathbb{C}^*$ la loi de composition interne $T$ définie par :
$$\forall\big((a,b),(c,d)\big) \in \big(\mathbb{C}\times\mathbb{C}^*\big)^2 \ ; \ (a,b)\,T\,(c,d) = \big(a\bar{d}+c,\ bd\big)$$
($\bar{d}$ étant le conjugué du nombre complexe $d$)

1. a) (0,5) Vérifier que $(i,2)\,T\,(1,i) = (2,2i)$, puis calculer $(1,i)\,T\,(i,2)$
   b) (0,25) En déduire que la loi $T$ n'est pas commutative dans $\mathbb{C}\times\mathbb{C}^*$
2. (0,5) Montrer que la loi $T$ est associative dans $\mathbb{C}\times\mathbb{C}^*$
3. (0,25) Vérifier que $(0,1)$ est l'élément neutre pour $T$ dans $\mathbb{C}\times\mathbb{C}^*$
4. a) (0,5) Vérifier que $\forall(a,b) \in \mathbb{C}\times\mathbb{C}^*$ ; $(a,b)\,T\left(-\dfrac{a}{\bar{b}},\ \dfrac{1}{b}\right) = (0,1)$
   b) (0,5) Montrer que $(\mathbb{C}\times\mathbb{C}^*,\ T)$ est un groupe non commutatif.
5. a) (0,5) Montrer que $\mathbb{R}\times\mathbb{R}^*$ est stable par la loi de composition interne $T$
   b) (0,5) Montrer que $\mathbb{R}\times\mathbb{R}^*$ est un sous-groupe du groupe $(\mathbb{C}\times\mathbb{C}^*,\ T)$
