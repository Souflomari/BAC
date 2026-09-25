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

---

## 2025 — session normale — Exercice 4
Source: https://www.alloschool.com/element/145783
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 145783 → course-436/upload-87482 re-dérivé ; énoncé EXERCICE4 sur l'image 0006 = p.5/5), diff caractère-par-caractère conforme au scan (valeurs, entrées des matrices $A$/$O$/$I$ $3\times3$, la matrice $A=\left(\begin{smallmatrix}-1&-1&0\\-1&-1&0\\-1&1&-2\end{smallmatrix}\right)$, exposants, loi $T$ et $\varphi(x)=M(\frac{1-x}{2})$, barème par question sommant à 3,5 pts) ; identités $A^2=-2A$ et $(x-\frac12)(y-\frac12)=-\frac12(x+y-2xy-\frac12)$ re-dérivées et confirmées ; Unicode propre (pas de mojibake) ; filière Sciences Mathématiques (A)/(B) خيار فرنسية et code NS 24F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-87482/0002-big.jpg` (consignes / composantes), `.../course-436/upload-87482/0006-big.jpg` (énoncé Exercice 4)
- Pages du scan : 5 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : aucun — ce scan 2025 est rendu en Unicode correct ($\mathbb{R}$, $M_3(\mathbb{R})$, matrices $3\times 3$, $\varphi$) ; pas de substitution de police.

**Structures algébriques (sous-ensemble $E = \{I + xA\}$ de $M_3(\mathbb{R})$ avec $A^2 = -2A$ : partie stable et groupe multiplicatif après retrait d'un élément, loi $T$, isomorphisme depuis $(\mathbb{R},+)$, corps commutatif).**

On rappelle que $(M_3(\mathbb{R}),+,\times)$ est un anneau unitaire et non commutatif de zéro la matrice $O = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$ et d'unité la matrice $I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$, et que $(M_3(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel.

Soient la matrice $A = \begin{pmatrix} -1 & -1 & 0 \\ -1 & -1 & 0 \\ -1 & 1 & -2 \end{pmatrix}$ et l'ensemble $E = \left\{ M(x) = I + xA\ /\ x \in \mathbb{R} \right\}$.

1. a) (0,25) Vérifier que : $A^2 = -2A$
   b) (0,25) En déduire que : $\forall(x,y) \in \mathbb{R}^2$ ; $M(x) \times M(y) = M(x + y - 2xy)$
2. a) (0,25) Calculer $M\!\left(\dfrac{1}{2}\right) \times \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix}$
   b) (0,25) En déduire que la matrice $M\!\left(\dfrac{1}{2}\right)$ n'est pas inversible dans $(M_3(\mathbb{R}),\times)$.
3. (0,25) Montrer que : $E - \left\{ M\!\left(\dfrac{1}{2}\right) \right\}$ est stable pour la multiplication dans $M_3(\mathbb{R})$
   *(on pourra utiliser l'identité : $\left(x - \dfrac{1}{2}\right)\left(y - \dfrac{1}{2}\right) = -\dfrac{1}{2}\left(x + y - 2xy - \dfrac{1}{2}\right)$)*
4. (1) Montrer que : $\left( E - \left\{ M\!\left(\dfrac{1}{2}\right) \right\}, \times \right)$ est un groupe commutatif.
5. On munit $E$ de la loi de composition interne $T$ définie par :
   $$\forall(x,y) \in \mathbb{R}^2\ ;\ M(x)\,T\,M(y) = M\!\left(x + y - \dfrac{1}{2}\right)$$
   et on considère l'application $\varphi$ définie de $\mathbb{R}$ vers $E$ par : $\forall x \in \mathbb{R}$ ; $\varphi(x) = M\!\left(\dfrac{1-x}{2}\right)$.
   a) (0,5) Montrer que $\varphi$ est un homomorphisme de $(\mathbb{R},+)$ vers $(E,T)$ et que $\varphi(\mathbb{R}) = E$.
   b) (0,25) En déduire que $(E,T)$ est un groupe commutatif.
6. (0,5) Montrer que $(E,T,\times)$ est un corps commutatif.

---

## 2023 — session normale — Exercice 5
Source: https://www.alloschool.com/element/142490
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 142490 → course-436/upload-85316 re-dérivé, 5 pages ; énoncé EXERCICE5 sur l'image 0005 = p.5/5), diff caractère-par-caractère conforme au scan (matrice $M(x,y)=\left(\begin{smallmatrix}x+y&y\\2y&x-y\end{smallmatrix}\right)$, produit $M(x,y)\times M(x',y')=M(xx'+3yy',\,xy'+yx')$ re-dérivé et confirmé, $M(\sqrt3,1)\times M(-\sqrt3,1)=O$, $F=\{x+y\sqrt3\}$, $G$, homomorphisme $\varphi$, barème par question sommant à 3,5 pts, en-tête NS 24F). **Jugement indépendant sur les domaines ℝ²/ℚ²** (mojibake massif et incohérent — aucune correspondance glyphe→lettre fiable : $M_2$ et le domaine de Q3 partagent le même glyphe « | ») : **E = ℝ²** (glyphe « _ » illisible, mais FORCÉ car $M(\sqrt3,1)\in E$ exige des coefficients irrationnels) ; **F = ℚ²** (glyphe « ⊓ » illisible, FORCÉ car « $x+y\sqrt3=0 \iff x=y=0$ » n'est vrai que sur ℚ) ; **G = ℚ²** (glyphe « ⌐ » illisible, FORCÉ car $G$ doit être un corps en Q4, alors que sur ℝ² il coïnciderait avec $E$ qui possède des diviseurs de zéro). Corroboré par Q3-a (domaine ℝ⁴, glyphe « ⊓⁴ ») et Q2 (ambiant ℝ*, glyphe « ⌐* »). Les glyphes de domaine restent génuinement illisibles (font-substitution cassée) → marqueurs « (glyphe à confirmer) » **conservés** dans l'énoncé ; promotion justifiée par l'unicité logique des lectures, non par le glyphe.

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85316/0001-big.jpg` (page de consignes / composantes), `.../course-436/upload-85316/0005-big.jpg` (énoncé complet)
- Pages du scan : 5 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : substitution de police massive et **incohérente** des lettres blackboard — un même ensemble est rendu tantôt par une barre verticale « | » ($M_2(\mathbb{R})$), tantôt par un tiret bas « _ », une case tofu « ⊓ » / « □ », ou un coin « ⌐ ». Aucune correspondance glyphe→lettre fiable ; chaque occurrence est résolue par la logique de l'exercice *(glyphes à confirmer)* :
> - **$\mathbb{R}$** en Partie I (l'anneau $M_2(\mathbb{R})$, l'espace vectoriel réel, le domaine de $E$ et le $\mathbb{R}^4$ de la Q3-a) — **forcé** car $M(\sqrt3,1) \in E$ exige des coefficients irrationnels, donc $E$ est bâti sur $\mathbb{R}^2$ ; et $\mathbb{R}^*$ en Partie II Q2 (car $F-\{0\}$ contient $\sqrt3 \notin \mathbb{Q}$, son groupe multiplicatif ambiant est $\mathbb{R}^*$).
> - **$\mathbb{Q}$** pour $F$, $G$ et les domaines des Q1 et Q3 de la Partie II — **forcé** car l'assertion de la Q1 « $x + y\sqrt3 = 0 \iff x = y = 0$ » n'est vraie que sur $\mathbb{Q}$ (indépendance $\mathbb{Q}$-linéaire de $1$ et $\sqrt3$), et $F-\{0\}$ n'est un groupe multiplicatif que si $F = \mathbb{Q}[\sqrt3]$ est un **corps** — cohérent avec $E$ sur $\mathbb{R}$ qui, lui, possède des diviseurs de zéro (Partie I Q4) et n'est donc pas un corps.

**Structures algébriques (ensemble de matrices $M(x,y)=\left(\begin{smallmatrix} x+y & y \\ 2y & x-y \end{smallmatrix}\right)$ avec $M(x,y)\,M(x',y')=M(xx'+3yy',\,xy'+yx')$ : sur $\mathbb{R}$ un anneau commutatif unitaire non intègre — pas un corps ; sur $\mathbb{Q}$ un corps commutatif $G \cong F = \mathbb{Q}[\sqrt3]$ via l'isomorphisme $\varphi$).**

On rappelle que $(M_2(\mathbb{R}), +, \times)$ est un anneau non commutatif de zéro la matrice $O = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ et d'unité la matrice $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, et que $(M_2(\mathbb{R}), +, \cdot)$ est un espace vectoriel réel.

On considère l'ensemble $E = \left\{ M(x,y) = \begin{pmatrix} x+y & y \\ 2y & x-y \end{pmatrix} \ /\ (x,y) \in \mathbb{R}^2 \right\}$

**Partie I :**

1. (0,5) Montrer que $E$ est un sous-groupe de $(M_2(\mathbb{R}), +)$.
2. (0,25) Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}), +, \cdot)$.
3. a) (0,25) Vérifier que : $\forall(x, y, x', y') \in \mathbb{R}^4$ ; $M(x,y) \times M(x',y') = M(xx' + 3yy',\ xy' + yx')$
   b) (0,5) En déduire que $(E, +, \times)$ est un anneau commutatif et unitaire.
4. a) (0,25) Vérifier que : $M(\sqrt{3}, 1) \times M(-\sqrt{3}, 1) = O$
   b) (0,25) En déduire que $(E, +, \times)$ n'est pas un corps.

**Partie II :**

Soient $F = \left\{ x + y\sqrt{3} \ /\ (x,y) \in \mathbb{Q}^2 \right\}$ *(glyphe à confirmer : $\mathbb{Q}$)* et $G = \left\{ M(x,y) = \begin{pmatrix} x+y & y \\ 2y & x-y \end{pmatrix} \ /\ (x,y) \in \mathbb{Q}^2 \right\}$ *(glyphe à confirmer : $\mathbb{Q}$)*.

1. (0,25) Montrer que : $\forall(x,y) \in \mathbb{Q}^2$ *(glyphe à confirmer : $\mathbb{Q}$)* ; $x + y\sqrt{3} = 0$ si et seulement si $(x = 0$ et $y = 0)$.
2. (0,25) Montrer que $F - \{0\}$ est un sous-groupe de $(\mathbb{R}^*, \times)$ *(glyphe à confirmer : $\mathbb{R}$)*.
3. Soit $\varphi$ l'application définie de $F - \{0\}$ vers $E$ par : $\forall(x,y) \in \mathbb{Q}^2 - \{(0,0)\}$ *(glyphe à confirmer : $\mathbb{Q}$)* ; $\varphi(x + y\sqrt{3}) = M(x,y)$.
   a) (0,25) Vérifier que : $\varphi(F - \{0\}) = G - \{O\}$
   b) (0,25) Montrer que $\varphi$ est un homomorphisme de $(F - \{0\}, \times)$ vers $(E, \times)$.
   c) (0,25) En déduire que $(G - \{O\}, \times)$ est un groupe commutatif.
4. (0,25) Montrer que $(G, +, \times)$ est un corps commutatif.

---

## 2017 — session normale — Exercice 1
Source: https://www.alloschool.com/element/57970
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element/57970 → course-436/upload-45343 re-dérivé, 5 pages ; EXERCICE1 entièrement sur l'image 0002 = p.2/5, page de composantes p.1), diff caractère-par-caractère conforme au scan (matrices $O$ et $I$ $3\times3$, $A=\left(\begin{smallmatrix}1&0&0\\1&1&0\\1&1&1\end{smallmatrix}\right)$ et $M(a,b)=\left(\begin{smallmatrix}a&b&-b\\0&0&0\\b&-a&a\end{smallmatrix}\right)$ **confirmées au zoom entrée par entrée**, loi $M(a,b)\,T\,M(c,d)=M(a,b)\times A\times M(c,d)$ sur $\mathbb{R}^4$, $E^*=E\setminus\{M(0,0)\}$, barème marginal 0,5 / 0,5 / 0,75 / 0,75 / 0,5 / 0,5 sommant à **3,5 pts**, en-tête NS 25 · durée 4 h · coef 9 · شعبة العلوم الرياضية (أ) و(ب) (الترجمة الفرنسية), composantes p.1 annonçant 3,5+3,5+3+10) ; **glyphes adjugés au zoom** — £=ℂ **confirmé** (« $(£,+,´)$ est un corps commutatif » et « l'application de $£^*$ … à tout nombre complexe non nul $a+ib$ » : lecture unique), j=φ **confirmé** (nom d'application, position Symbol de φ) et **typographiquement distinct** du « $J$ » capitale italique de la Q3-b (zoom dédié), «"»=∀, «¡»=ℝ, «´»=×, «Î»=∈ **confirmés** ; **maths re-dérivées** : $M(a,b)\,A\,M(c,d)=M(ac-bd,\ ad+bc)$ — la stabilité de la Q2 et l'homomorphisme de la Q3-a tombent exactement sur le produit complexe $(a+ib)(c+id)$, ce qui **force** £=ℂ et fixe le neutre $J=M(1,0)$ ; les marqueurs « (glyphe à confirmer) » de la note de lecture sont **levés** (résolutions uniques, corroborées par la structure de l'exercice).

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (الترجمة الفرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 25 · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-45343/0001-big.jpg` (page de composantes), `.../course-436/upload-45343/0002-big.jpg` (énoncé Exercice 1)
- Pages du scan : 2 (sur 5) — composantes p.1

> **Note de lecture (mojibake)** : ce scan 2017 substitue plusieurs polices. Glyphes de la legend connue : $\mathbb{R}$ = « ¡ », $\times$ = « ´ », $\in$ = « Î ». Glyphes **nouveaux, non couverts par la legend fournie**, résolus par la logique de l'exercice et par le mapping alphabétique standard de la police Symbol (chaque lettre latine occupe la position de son homologue grec) : $\mathbb{C}$ = « £ » *(confirmé — vérification 2026-08-06)* — cohérent avec « (£,+,´) est un corps commutatif » et « £* » comme ensemble de départ de $\varphi$, recoupé avec l'Exercice 2 du même scan où « £ » désigne sans ambiguïté $\mathbb{C}$ (équation posée « dans £ ») ; $\varphi$ = « j » *(confirmé — vérification 2026-08-06)* (position Symbol de φ) ; $\forall$ = « " » *(confirmé — vérification 2026-08-06)* (position Symbol de ∀). L'élément neutre du groupe $(E^*,T)$ est noté par la lettre latine simple « $J$ » — caractère distinct du « j » minuscule (= $\varphi$), lu tel quel, sans mojibake apparent.

**Structures algébriques (matrices $3\times 3$, loi $T$ construite via une matrice pivot $A$, homomorphisme depuis $(\mathbb{C}^*,\times)$, corps commutatif).**

On rappelle que $(M_3(\mathbb{R}),+,\times)$ est un anneau unitaire de zéro la matrice nulle $O = \begin{pmatrix}0&0&0\\0&0&0\\0&0&0\end{pmatrix}$ et d'unité la matrice $I = \begin{pmatrix}1&0&0\\0&1&0\\0&0&1\end{pmatrix}$ et que $(\mathbb{C},+,\times)$ est un corps commutatif.

On pose $A = \begin{pmatrix}1&0&0\\1&1&0\\1&1&1\end{pmatrix}$ et pour tout $(a,b)$ de $\mathbb{R}^2$, $M(a,b) = \begin{pmatrix}a&b&-b\\0&0&0\\b&-a&a\end{pmatrix}$

On considère l'ensemble $E = \{M(a,b) \ /\ (a,b) \in \mathbb{R}^2\}$

1. (0,5) Montrer que $E$ est un sous-groupe du groupe $(M_3(\mathbb{R}),+)$
2. (0,5) On définit dans $M_3(\mathbb{R})$ la loi de composition interne $T$ par : $\forall(a,b,c,d)\in\mathbb{R}^4$ ; $M(a,b)\,T\,M(c,d) = M(a,b)\times A\times M(c,d)$
   Vérifier que $E$ est stable dans $(M_3(\mathbb{R}),T)$
3. Soit $\varphi$ l'application de $\mathbb{C}^*$ dans $E$ qui à tout nombre complexe non nul $a+ib$ (où $(a,b)\in\mathbb{R}^2$) fait correspondre la matrice $M(a,b)$ de $E$
   a) (0,75) Vérifier que $\varphi$ est un homomorphisme de $(\mathbb{C}^*,\times)$ vers $(E,T)$ et que $\varphi(\mathbb{C}^*) = E^*$ où $E^* = E\setminus\{M(0,0)\}$
   b) (0,75) En déduire que $(E^*,T)$ est un groupe commutatif dont on déterminera l'élément neutre $J$
4. a) (0,5) Montrer que la loi de composition interne « $T$ » est distributive par rapport à la loi de composition interne « $+$ » dans $E$
   b) (0,5) En déduire que $(E,+,T)$ est un corps commutatif.

---

## 2018 — session normale — Exercice 1
Source: https://www.alloschool.com/element/65508
Statut: **vérifié (contre source retypée)** — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element/65508 → course-436/upload-52280 re-dérivé, 4 pages ; EXERCICE 1 entièrement sur l'image 0001 = p.1/4), diff caractère-par-caractère conforme au document (matrices $O$, $I$, $M(x,y)=\left(\begin{smallmatrix}x&-2y\\y&x+2y\end{smallmatrix}\right)$, $J=M(0,1)$, base $(I,J)$, $\varphi(x+iy)=M(x+y,-y)=\left(\begin{smallmatrix}x+y&2y\\-y&x-y\end{smallmatrix}\right)$, domaine $\mathbb{R}^2-\{(0,0)\}$, $E^*=E-\{O\}$, barème marginal 0,25 / 0,25 / 0,5 / 0,5 / 0,5 / 0,5 / 0,5 / 0,25 / 0,25 sommant à **3,5 pts**) ; aucun mojibake (Unicode propre) — aucun glyphe à adjuger ; **maths re-dérivées** : $M(x+y,-y)=\left(\begin{smallmatrix}x+y&2y\\-y&x-y\end{smallmatrix}\right)$ ✓ (l'égalité imprimée est exacte), $M(x,y)\times M(a,b)=M(xa-2yb,\ xb+ya+2yb)$ ✓ (stabilité Q3-a), $\det M(x,y)=(x+y)^2+y^2$ ⇒ $E$ sans diviseur de zéro. **Q5 « groupe commutatif » : lecture confirmée, coquille de la source.** Le retype imprime bien « Montrer que $(E,+,\times)$ est un **groupe** commutatif » (zoom) ; le corrigé de la même compilation (element/65510 → course-436/upload-52282, p.4/17) reproduit **la même** coquille tout en démontrant exactement les axiomes d'un **corps** ($(E,+)$ groupe commutatif, $(E^*,\times)$ groupe commutatif, $\times$ distributive sur $+$) — la coquille appartient donc à la source, pas à la transcription ; texte conservé **verbatim**, la lecture officielle présumée étant « corps commutatif ». **Chasse au scan brut : négative** — le hub SM (section/4660) ne liste pour 2018 que 4 éléments (sujet N 65508, corrigé N 65510, sujet R 65512, corrigé R 106223) ; la page element/65508 ne porte qu'un seul upload (52280) et le corrigé 65510 est **le même retype éditeur** (même en-tête « 2ème Année Sciences Maths / Examen National 2018 », sans en-tête administratif ni code NS). ⚠️ **Source retypée non-officielle — conversion en banque soumise à arbitrage owner** (ni code NS, ni durée, ni coefficient confirmables ; fidélité au sujet officiel non établie).

- Filière / épreuve : Sciences Mathématiques (A) et (B), BIOF — d'après le titre du document et la structure du programme ; **aucun code NS ni en-tête administratif arabe visible** sur ce document retype — voir la note à l'entrée `arithmetique.md` 2018 Exercice 2 pour le détail.
- Code sujet : non visible sur ce scan (document retype) · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-52280/0001-big.jpg`
- Pages du scan : 1 (sur 4)

> **Note de lecture** : aucun mojibake — document retype Unicode propre. La question 5 imprime littéralement « Montrer que $(E,+,\times)$ est un **groupe** commutatif » (et non « corps », alors que $(E,+,\times)$ vient d'être établi anneau commutatif en Q3-b et $(E^*,\times)$ groupe commutatif en Q4-c) — transcrit **verbatim**, sans correction ; possible coquille de la source elle-même — ***confirmée à la vérification du 2026-08-06*** : le re-fetch lit bien « groupe », et le corrigé de la même compilation (element/65510, upload-52282, p.4/17) répète la coquille tout en prouvant les trois axiomes du **corps** ; la coquille est donc celle de la source (lecture officielle présumée « corps commutatif »), le verbatim est maintenu.

**Structures algébriques (sous-espace vectoriel et sous-anneau de $M_2(\mathbb{R})$, base $(I,J)$, homomorphisme depuis $(\mathbb{C}^*,\times)$).**

On rappelle que $(\mathbb{C},+,\times)$ est un corps commutatif et que $(M_2(\mathbb{R}),+,\times)$ est un anneau unitaire, de zéro la matrice nulle $O = \begin{pmatrix}0&0\\0&0\end{pmatrix}$ et d'unité la matrice $I = \begin{pmatrix}1&0\\0&1\end{pmatrix}$ et que $(M_2(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel.

Pour tout couple $(x,y)\in\mathbb{R}^2$, on pose $M(x,y) = \begin{pmatrix}x&-2y\\y&x+2y\end{pmatrix}$ et on considère l'ensemble $E = \{M(x,y) \ /\ (x,y)\in\mathbb{R}^2\}$

1. (0,25) Montrer que $E$ est un sous-groupe du groupe $(M_2(\mathbb{R}),+)$
2. a) (0,25) Montrer que $E$ est un sous-espace vectoriel de l'espace vectoriel $(M_2(\mathbb{R}),+,\cdot)$
   b) (0,5) On pose $J = M(0,1)$. Montrer que $(I,J)$ est une base de l'espace vectoriel réel $(E,+,\cdot)$
3. a) (0,5) Montrer que $E$ est une partie stable de $(M_2(\mathbb{R}),\times)$
   b) (0,5) Montrer que $(E,+,\times)$ est un anneau commutatif.
4. Soit $\varphi$ l'application de $\mathbb{C}^*$ vers $M_2(\mathbb{R})$ définie par : $\left(\forall(x,y)\in\mathbb{R}^2-\{(0,0)\}\right)$ ; $\varphi(x+iy) = M(x+y,-y) = \begin{pmatrix}x+y&2y\\-y&x-y\end{pmatrix}$
   a) (0,5) Montrer que $\varphi$ est un homomorphisme de $(\mathbb{C}^*,\times)$ vers $(M_2(\mathbb{R}),\times)$
   b) (0,5) On pose $E^* = E - \{O\}$. Montrer que $\varphi(\mathbb{C}^*) = E^*$
   c) (0,25) En déduire que $(E^*,\times)$ est un groupe commutatif.
5. (0,25) Montrer que $(E,+,\times)$ est un groupe commutatif.

---
