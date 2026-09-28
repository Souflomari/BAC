# `nombres-complexes-2` — Nombres complexes (approfondissement SM : équations paramétrées, transformations, configurations)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Ce fichier regroupe les exercices de **complexes de la filière Sciences
> Mathématiques (SM)** — équations à paramètre complexe, module/argument,
> rotations et configurations du plan. (Les complexes plus « standard » de
> l'épreuve Sciences Expérimentales sont sous `nombres-complexes-1.md`.)

---

## 2019 — session normale — Exercice 2
Source: https://www.alloschool.com/element/68482
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan (valeurs, notation, indices, exposants, barèmes, énoncé) ; filière et code NS..F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-54931/0003-big.jpg`
- Pages du scan : 3 (sur 5)

**Nombres complexes (équation du second degré à paramètre $m$, rotation, milieu, orthogonalité).**

Soit $m$ un nombre **complexe non réel** ($m \in \mathbb{C} - \mathbb{R}$)

**I –** On considère dans $\mathbb{C}$, l'équation d'inconnue $z$ définie par :
$$(E)\ :\ z^2 - (1+i)(1+m)z + 2im = 0$$

1. a) (0,25) Montrer que le discriminant de l'équation $(E)$ est non nul.
   b) (0,5) Déterminer $z_1$ et $z_2$, les deux solutions de l'équation $(E)$
2. On suppose dans cette question que $m = e^{i\theta}$ avec $0 < \theta < \pi$
   a) (0,5) Déterminer le module et un argument de $z_1 + z_2$
   b) (0,25) Montrer que si $z_1 z_2 \in \mathbb{R}$ alors $z_1 + z_2 = 2i$

**II –** Le plan complexe est rapporté à un repère orthonormé direct $(O;\vec{u},\vec{v})$

On considère les points suivants :
$A$ le point d'affixe $a = 1+i$, $B$ le point d'affixe $b = (1+i)m$, $C$ le point d'affixe $c = 1-i$, $D$ l'image du point $B$ par la rotation de centre $O$ et d'angle $\dfrac{\pi}{2}$ et $\Omega$ le milieu du segment $[CD]$.

1. a) (0,5) Montrer que l'affixe du point $\Omega$ est $\omega = \dfrac{(1-i)(1-m)}{2}$
   b) (0,25) Calculer $\dfrac{b-a}{\omega}$
   c) (0,5) En déduire que $(O\Omega) \perp (AB)$ et que $AB = 2\,O\Omega$
2. La droite $(O\Omega)$ coupe la droite $(AB)$ au point $H$ d'affixe $h$
   a) (0,5) Montrer que $\dfrac{h-a}{b-a}$ est un réel et que $\dfrac{h}{b-a}$ est un imaginaire pur.
   b) (0,25) En déduire $h$ en fonction de $m$

---

## 2020 — session normale — Exercice 3
Source: https://www.alloschool.com/element/109635
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element → course/upload re-dérivé), diff caractère-par-caractère conforme au scan ; glyphes mojibake confirmés.

- Filière / épreuve : Sciences Mathématiques (A) et (B), الترجمة بالفرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 25 · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-80775/0002-big.jpg`, `.../course-436/upload-80775/0003-big.jpg`
- Pages du scan : 2–3 (sur 5)

**Nombres complexes (équation paramétrée du 3ᵉ degré admettant $m$ pour racine, somme d'inverses, forme algébrique ; rotations et configuration $OQ = PR$).**

Soit $m$ un nombre complexe non nul.

**Première partie :**

On considère dans $\mathbb{C}$ l'équation d'inconnue $z$ :
$$(E)\ :\ z^3 - 2mz^2 + 2m^2 z - m^3 = 0$$

1. (0,5) Résoudre dans $\mathbb{C}$ l'équation $(E)$ (On remarque que $m$ est une solution de l'équation $(E)$).

2. On note $z_1$ et $z_2$ les deux autres solutions de l'équation $(E)$ autre que $m$.
   a) (0,25) Vérifier que : $\dfrac{1}{z_1} + \dfrac{1}{z_2} = \dfrac{1}{m}$
   b) (0,5) Dans le cas où $m = 1 + e^{i\frac{\pi}{3}}$, écrire sous la forme algébrique $z_1$ et $z_2$.

**Deuxième partie :**

Le plan complexe est rapporté à un repère orthonormé direct $(O;\vec{u},\vec{v})$.

On considère les points $A$ et $B$ d'affixes respectives $a = m\,e^{i\frac{\pi}{3}}$ et $b = m\,e^{-i\frac{\pi}{3}}$.

On note $P$ le centre de la rotation d'angle $\dfrac{\pi}{2}$ qui transforme $O$ en $A$, $Q$ le centre de la rotation d'angle $\dfrac{\pi}{2}$ qui transforme $A$ en $B$, et $R$ le centre de la rotation d'angle $\dfrac{\pi}{2}$ qui transforme $B$ en $O$.

1. (0,25) Montrer que les points $O$, $A$ et $B$ ne sont pas alignés.
2. a) (1) Montrer que l'affixe de $P$ est $p = m\,\dfrac{\sqrt{2}}{2}\,e^{i\frac{7\pi}{12}}$ et que l'affixe de $R$ est $r = m\,\dfrac{\sqrt{2}}{2}\,e^{-i\frac{7\pi}{12}}$.
   b) (0,5) Montrer que l'affixe de $Q$ est $q = m\sqrt{2}\,\sin\!\left(\dfrac{7\pi}{12}\right)$.
3. (0,5) Montrer que $OQ = PR$ et que les deux droites $(OQ)$ et $(PR)$ sont perpendiculaires.

---

## 2022 — session normale — Exercice 2
Source: https://www.alloschool.com/element/136604
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element → course/upload re-dérivé), diff caractère-par-caractère conforme au scan ; glyphes mojibake confirmés.

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-84506/0003-big.jpg`, `.../course-436/upload-84506/0004-big.jpg`
- Pages du scan : 3–4 (sur 5)

**Nombres complexes (équation paramétrée du 2ᵈ degré avec la racine cubique de l'unité $j$ ; transformation $z' = (1+j)z$, milieux et triangle équilatéral).**

Soit $m$ un nombre complexe non nul donné et $j = -\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}\,i = e^{i\frac{2\pi}{3}}$.

**I –** On considère dans l'ensemble $\mathbb{C}$ l'équation d'inconnue $z$ :
$$(E_m)\ :\ z^2 + mj^2 z + m^2 j = 0$$

1. (0,5) Vérifier que : $j^3 = 1$ et $1 + j + j^2 = 0$.
2. a) (0,25) Montrer que le discriminant de l'équation $(E_m)$ est : $\Delta = \big(m(1-j)\big)^2$ *(glyphe à confirmer : parenthèse externe / le $m$ rendus en glyphes Symbol mutilés ; forme restituée d'après le calcul $\Delta = (mj^2)^2 - 4m^2 j = -3m^2 j = (m(1-j))^2$).*
   b) (0,5) Déterminer $z_1$ et $z_2$ les deux solutions de l'équation $(E_m)$.
3. (0,5) Dans cette question, on suppose que $m = 1 + i$. Montrer que $(z_1 + z_2)^{2022}$ est un imaginaire pur.

**II –** Le plan complexe est muni d'un repère orthonormé direct $(O;\vec{u},\vec{v})$.

Soit $\varphi$ la transformation du plan complexe qui à tout point $M(z)$ fait correspondre le point $M'(z')$ tel que : $z' = (1+j)z$. *(glyphe à confirmer : le nom de la transformation est rendu « j » dans le scan — police Symbol où $\varphi$ occupe la position ASCII de « j » — mais il est distinct du nombre complexe $j = e^{i\frac{2\pi}{3}}$ ci-dessus.)*

1. (0,25) Déterminer la nature et les éléments caractéristiques de l'application $\varphi$.
2. On considère les points $A$, $B$ et $C$ d'affixes respectives $m$, $mj$ et $mj^2$, et on note $A'(a')$, $B'(b')$ et $C'(c')$ les images respectives des points $A$, $B$ et $C$ par l'application $\varphi$, et soient $P(p)$, $Q(q)$ et $R(r)$ les milieux respectifs des segments $[BA']$, $[CB']$ et $[AC']$.
   a) (0,75) Montrer que : $a' = -mj^2$, $b' = -m$ et $c' = -mj$.
   b) (0,25) Montrer que : $p + qj + rj^2 = 0$.
   c) (0,5) En déduire que le triangle $PQR$ est équilatéral.

---

## 2024 — session normale — Exercice 3
Source: https://www.alloschool.com/element/145739
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-05 : source re-fetchée indépendamment (element → course/upload re-dérivé), diff caractère-par-caractère conforme au scan ; glyphes mojibake confirmés.

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-87447/0003-big.jpg`, `.../course-436/upload-87447/0004-big.jpg`
- Pages du scan : 3–4 (sur 5)

**Nombres complexes (équation paramétrée du 2ᵈ degré $z^2 - 2iz + \alpha = 0$ ; alignement, module et $\mathrm{Re}(z_1\overline{z_2})$, lieu $\Gamma$ pour un triangle rectangle en $O$).**

Le plan complexe est rapporté à un repère orthonormé direct $(O;\vec{u},\vec{v})$.

On considère dans $\mathbb{C}$ l'équation d'inconnue $z$ :
$$(E_\alpha)\ :\ z^2 - 2iz + \alpha = 0 \qquad \text{où } \alpha \in \mathbb{C}$$

**Partie I :**

1. a) (0,25) Montrer que le discriminant de l'équation $(E_\alpha)$ est $\Delta = -4(1 + \alpha)$.
   b) (0,25) Déterminer l'ensemble des valeurs $\alpha$ pour lesquelles l'équation $(E_\alpha)$ admette dans l'ensemble $\mathbb{C}$ deux solutions distinctes.
2. (0,5) On note $z_1$ et $z_2$ les deux solutions de l'équation $(E_\alpha)$. Déterminer $z_1 + z_2$ et $z_1 z_2$.

**Partie II :**

Soient $\Omega$, $M_1$ et $M_2$ les points d'affixes respectivement $\alpha$, $z_1$ et $z_2$.

1. On suppose que $\alpha = m^2 - 2m$ avec $m \in \mathbb{R}$.
   a) (0,5) Déterminer $z_1$ et $z_2$ en fonction de $m$.
   b) (0,25) En déduire que les points $O$, $M_1$ et $M_2$ sont alignés.
2. On suppose que les points $O$, $M_1$ et $M_2$ ne sont pas alignés.
   a) (0,25) Montrer que $\dfrac{z_1}{z_2}$ est un imaginaire pur si et seulement si $\mathrm{Re}\!\left(z_1\overline{z_2}\right) = 0$.
   b) (0,5) Montrer que : $|z_1 - z_2|^2 = |z_1 + z_2|^2 - 4\,\mathrm{Re}\!\left(z_1\overline{z_2}\right)$.
   c) (0,25) En déduire que $\dfrac{z_1}{z_2}$ est un imaginaire pur si et seulement si $|z_1 - z_2| = 2$.
3. a) (0,25) Montrer que : $(z_1 - z_2)^2 = \Delta$.
   b) (0,5) Déterminer l'ensemble $\Gamma$ des points $\Omega$ pour que le triangle $OM_1 M_2$ soit rectangle en $O$.

---

## 2025 — session normale — Exercice 2
Source: https://www.alloschool.com/element/145783
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 145783 → course-436/upload-87482 re-dérivé ; énoncé EXERCICE2 Partie I sur l'image 0004 = p.3/5, Partie II sur l'image 0005 = p.4/5), diff caractère-par-caractère conforme au scan (valeurs, exposants $2^\alpha e^{i\alpha}$/$2^{2\alpha+1}e^{i2\alpha}$, l'équation $(E_\alpha)$, le discriminant $\Delta_\alpha=(2^\alpha e^{i\alpha}(1-2i))^2$, affixes $\frac{b}{a}=\lambda i$/$\frac{h}{b-a}$/$\frac{n}{m-a}$, barème par question sommant à 3,5 pts) ; équation, discriminant et $b/a=2i$ imaginaire pur re-dérivés et confirmés, exposants confirmés au zoom (gemini) ; filière Sciences Mathématiques (A)/(B) خيار فرنسية et code NS 24F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-87482/0004-big.jpg` (énoncé, Partie I), `.../course-436/upload-87482/0005-big.jpg` (Partie II)
- Pages du scan : 3–4 (sur 5)

> **Note de lecture (mojibake)** : aucun — ce scan 2025 est rendu en Unicode correct ($\mathbb{C}$, $\mathrm{Im}$, exposants complexes $e^{i\alpha}$, $\lambda$) ; pas de substitution de police.

**Nombres complexes (équation paramétrée du 2ᵈ degré à paramètre $\alpha$, discriminant, quotient $\frac{b}{a}$ imaginaire pur ; configuration : perpendicularité $(OH)\perp(AB)$, alignement, milieux, cocyclicité).**

Soit $\alpha \in [0; 2\pi[$.

On considère dans l'ensemble des nombres complexes $\mathbb{C}$ l'équation $(E_\alpha)$ d'inconnue $z$ :
$$(E_\alpha)\ :\ z^2 - 2^\alpha e^{i\alpha}(1+2i)z + i\,2^{2\alpha+1}e^{i2\alpha} = 0$$

**Partie I :**

1. a) (0,25) Vérifier que le discriminant de l'équation $(E_\alpha)$ est : $\Delta_\alpha = \left(2^\alpha e^{i\alpha}(1-2i)\right)^2$
   b) (0,5) En déduire les deux solutions $a$ et $b$ de l'équation $(E_\alpha)$ avec $|a| < |b|$.
2. (0,25) Vérifier que $\dfrac{b}{a}$ est un imaginaire pur.

**Partie II :**

Le plan complexe est rapporté à un repère orthonormé direct $(O;\vec{u},\vec{v})$.
On note par $M(z)$ le point d'affixe le nombre complexe $z$.
On pose $\dfrac{b}{a} = \lambda i$ avec $\lambda = \mathrm{Im}\!\left(\dfrac{b}{a}\right)$.

1. On considère les points $A(a)$, $B(b)$ et $H(h)$ avec $\dfrac{1}{h} = \dfrac{1}{a} + \dfrac{1}{b}$.
   a) (0,5) Montrer que : $\dfrac{h}{b-a} = -\left(\dfrac{\lambda}{\lambda^2+1}\right)i$ puis en déduire que les droites $(OH)$ et $(AB)$ sont perpendiculaires.
   b) (0,5) Montrer que : $\dfrac{h-a}{b-a} = \dfrac{1}{\lambda^2+1}$ puis en déduire que les points $H$, $A$ et $B$ sont alignés.
2. Soient $I(m)$ le milieu du segment $[OH]$ et $J(n)$ le milieu du segment $[HB]$.
   a) (0,5) Montrer que : $\dfrac{n}{m-a} = -\lambda i$
   b) (0,5) En déduire que les droites $(OJ)$ et $(AI)$ sont perpendiculaires et que $OJ = |\lambda|\,AI$.
   c) (0,25) Soit $K$ le point d'intersection des droites $(OJ)$ et $(AI)$. Montrer que les points $K$, $I$, $H$ et $J$ sont cocycliques.
   d) (0,25) Montrer que les droites $(IJ)$ et $(OA)$ sont perpendiculaires.

---

## 2023 — session normale — Exercice 3
Source: https://www.alloschool.com/element/142490
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 142490 → course-436/upload-85316 re-dérivé, 5 pages ; énoncé sur les images 0003 = p.3/5 et 0004 = p.4/5), diff caractère-par-caractère conforme au scan (valeurs, $u=1+(2-\sqrt3)i$, formes exponentielles $1-i$/$1+\sqrt3 i$, $\frac{(1-i)(1+\sqrt3 i)}{2\sqrt2}=e^{i\pi/12}$, $\tan\frac{\pi}{12}=2-\sqrt3$, $u=(\sqrt6-\sqrt2)e^{i\pi/12}$, système $x_{n+1}=x_n-(2-\sqrt3)y_n$ / $y_{n+1}=(2-\sqrt3)x_n+y_n$, récurrence $x_n+iy_n=u^n$, quotients $\frac{\cos(n\pi/12)}{(\cos\pi/12)^n}$, barème par question sommant à 3,5 pts, en-tête NS 24F) ; corps mathématique en Unicode propre (exponentielles, radicaux, trigonométrie). Seul $\mathbb{N}$ mojibaké et, dans l'Ex3, il n'apparaît qu'aux Q2/Q3 (p.4), rendu de façon incohérente — tiret-bas « _ » en indice de suite, case tofu « ⊓ » et coin « ⌐ » dans les quantificateurs — lu $\mathbb{N}$ par l'indexation des suites et laissé « (glyphe à confirmer) » (nb : le « N » capitale de la note de lecture concerne l'Ex1/Ex2 voisins sur p.3, non l'Ex3).

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85316/0001-big.jpg` (page de consignes / composantes), `.../course-436/upload-85316/0003-big.jpg` (énoncé, questions 1–), `.../course-436/upload-85316/0004-big.jpg` (suite, questions 2–3)
- Pages du scan : 3–4 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : le corps mathématique est propre (exponentielles $e^{i\frac{\pi}{12}}$, radicaux, fonctions trigonométriques rendus correctement ; pas de congruence dans cet exercice). Seul $\mathbb{N}$ est substitué de façon incohérente : rendu « N » (capitale simple) sur la p.3, mais par une case tofu « ⊓ » / un coin « ⌐ » sur la p.4 dans les quantificateurs des suites (« $\forall n \in$ » et « pour tout $n \in$ ») ; lu $\mathbb{N}$ (indexation des suites) *(glyphe à confirmer)*.

**Nombres complexes (forme exponentielle et $\tan\frac{\pi}{12}$ ; suites couplées $(x_n),(y_n)$ avec $x_n+iy_n=u^n$ et forme trigonométrique ; points $A_n$ d'affixe $u^n$ : alignement et triangle rectangle).**

On considère le nombre complexe : $u = 1 + (2 - \sqrt{3})\,i$

1. a) (0,5) Écrire sous forme exponentielle les nombres complexes : $1 - i$ et $1 + \sqrt{3}\,i$.
   b) (0,25) Montrer que : $\dfrac{(1-i)(1+\sqrt{3}\,i)}{2\sqrt{2}} = e^{i\frac{\pi}{12}}$
   c) (0,25) En déduire que : $\tan\!\left(\dfrac{\pi}{12}\right) = 2 - \sqrt{3}$
   d) (0,5) Montrer que : $u = (\sqrt{6} - \sqrt{2})\,e^{i\frac{\pi}{12}}$
2. On considère les deux suites numériques $(x_n)_{n \in \mathbb{N}}$ et $(y_n)_{n \in \mathbb{N}}$ définies par :
   $$x_0 = 1, \quad y_0 = 0 \quad \text{et} \quad (\forall n \in \mathbb{N}) \ ; \ \begin{cases} x_{n+1} = x_n - (2 - \sqrt{3})\,y_n \\ y_{n+1} = (2 - \sqrt{3})\,x_n + y_n \end{cases}$$
   a) (0,5) Montrer par récurrence que pour tout $n \in \mathbb{N}$, $x_n + i y_n = u^n$.
   b) (0,5) En déduire que pour tout $n \in \mathbb{N}$ : $x_n = \dfrac{\cos\!\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n}$ et $y_n = \dfrac{\sin\!\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n}$
3. Le plan complexe est rapporté à un repère orthonormé direct $(O; \vec{e_1}, \vec{e_2})$. Pour tout entier naturel $n$, on note $A_n$ le point d'affixe $u^n$.
   a) (0,5) Déterminer les entiers $n$ pour lesquels les points $O$, $A_0$ et $A_n$ sont alignés.
   b) (0,5) Montrer que pour tout entier $n$, le triangle $O A_n A_{n+1}$ est rectangle en $A_n$.

---

## 2021 — session normale — Exercice 2
Source: https://www.alloschool.com/element/127193
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 127193 → course-436/upload-84150 re-dérivé, 4 pages ; énoncé Exercice 2 débutant sur l'image 0003 = p.3/4 et se poursuivant sur 0004 = p.4/4, page de composantes p.1), diff caractère-par-caractère conforme au scan (équation $z^2-(a+b+c)z+c(a+b)=0$, données $a=i$ / $b=e^{i\frac{\pi}{3}}$ / $c=a-b$, rotations d'angles $\frac{\pi}{2}$ et $\left(-\frac{\pi}{2}\right)$, $2p=b+a+(a-b)i$ et $2q=c+a+(c-a)i$, $k=a+\frac{i}{2}(c-b)$, cocyclicité de $K,P,Q,D$, barème par question sommant à 4 pts) ; maths re-dérivées : racines $c$ et $a+b$ par Vieta (somme $a+b+c$, produit $c(a+b)$) ✓, $2p=(a+b)+i(a-b)$ et $2q=(a+c)+i(c-a)$ via $\omega=(z_2-e^{i\theta}z_1)/(1-e^{i\theta})$ ✓ ; Unicode propre (pas de mojibake) ; filière Sciences Mathématiques (A)/(B) خيار فرنسية et code NS 24F confirmés sur l'en-tête du scan (p.1 et p.3–4).

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : 4 points
- Images lues : `.../course-436/upload-84150/0001-big.jpg` (page de composantes), `.../course-436/upload-84150/0003-big.jpg` (énoncé Exercice 2, questions 1 à 2), `.../course-436/upload-84150/0004-big.jpg` (suite, questions 2-a à 3)
- Pages du scan : 3–4 (sur 4) — composantes p.1

> **Note de lecture (mojibake)** : aucun — ce scan 2021 est rendu en Unicode correct ($\mathbb{C}$, $\vec{u}$, $\vec{v}$, exponentielles $e^{i\frac{\pi}{3}}$, $\frac{\pi}{2}$) ; pas de substitution de police.

**Nombres complexes (équation du 2ᵈ degré $z^2-(a+b+c)z+c(a+b)=0$ de racines $c$ et $a+b$ ; forme exponentielle ; centres $P$, $Q$ de deux rotations d'angles $\pm\frac{\pi}{2}$, nature du triangle $PDQ$, symétriques, cocyclicité de $K,P,Q,D$).**

Soient $a$, $b$ et $c$ trois nombres complexes non nuls tel que : $a+b \neq c$

1. a) (0,5) Résoudre dans l'ensemble $\mathbb{C}$ l'équation d'inconnue $z$
   $$(E)\ :\ z^2 - (a+b+c)z + c(a+b) = 0$$
   b) (0,5) On suppose dans cette question que : $a = i$, $b = e^{i\frac{\pi}{3}}$ et $c = a - b$
   Écrire les deux solutions de l'équation $(E)$ sous forme exponentielle.
2. Le plan complexe est rapporté à un repère orthonormé direct $(O, \vec{u}, \vec{v})$.
   On considère les trois points $A(a)$, $B(b)$ et $C(c)$ qu'on suppose non alignés.
   Soient $P(p)$ le centre de la rotation d'angle $\dfrac{\pi}{2}$ qui transforme $B$ en $A$ et $Q(q)$ le centre de la rotation d'angle $\left(-\dfrac{\pi}{2}\right)$ qui transforme $C$ en $A$ et $D(d)$ le milieu du segment $[BC]$
   a) (1) Montrer que : $2p = b + a + (a-b)i$ et $2q = c + a + (c-a)i$
   b) (0,5) Calculer : $\dfrac{p-d}{q-d}$
   c) (0,5) En déduire la nature du triangle $PDQ$
3. Soient $E$ le symétrique de $B$ par rapport à $P$ et $F$ le symétrique de $C$ par rapport à $Q$ et $K$ le milieu du segment $[EF]$
   a) (0,5) Montrer que l'affixe de $K$ est $k = a + \dfrac{i}{2}(c-b)$
   b) (0,5) Montrer que les points $K$, $P$, $Q$ et $D$ sont cocycliques.

---

## 2017 — session normale — Exercice 2
Source: https://www.alloschool.com/element/57970
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element/57970 → course-436/upload-45343 re-dérivé, 5 pages ; Partie 1 sur l'image 0002 = p.2/5, Partie 2 sur l'image 0003 = p.3/5, page de composantes p.1), diff caractère-par-caractère conforme au scan (équation $(E)\,:\,2z^2-2(m+1+i)z+m^2+(1+i)m+i=0$, $\Delta=(2im)^2$, $z_1=\frac{1+i}{2}(m+1)$ et $z_2=\frac{1-i}{2}(m+i)$, exclusion $m\in\mathbb{C}\setminus\{0,1,i\}$, affixes $1,\,i,\,m,\,z_1,\,z_2$ pour $A,B,M,M_1,M_2$, $\omega=\frac{1+i}{2}$, angle $\frac{\pi}{2}$, cercle $(\Gamma)$ de diamètre $[AB]$, indication $\frac{z_1-\omega}{z_2-\omega}=i$, barème marginal 0,5 / 0,5 (Partie 1) puis 0,25 / 0,5 / 0,5 / 0,5 / 0,75 (Partie 2) sommant à **3,5 pts**, en-tête NS 25) ; **glyphes adjugés au zoom** — £=ℂ, « p »=π, « W »=Ω (et « w »=ω), « G »=Γ **confirmés** ; **un glyphe non tagué par le transcripteur a été trouvé, ajouté à la note et adjugé** : le discriminant est imprimé « D » (position Symbol de Δ) → $\Delta$ ; **maths re-dérivées** : $\Delta=4(m+1+i)^2-8\left(m^2+(1+i)m+i\right)=-4m^2=(2im)^2$ ✓ ; racines $\frac{(m+1+i)\pm im}{2}$ = exactement $z_1,z_2$ ✓ ; $iz_2+1=z_1$ ✓ ; point fixe de $z\mapsto iz+1$ = $\frac{1+i}{2}=\omega$, multiplicateur $i$ ⇒ rotation d'angle $\frac{\pi}{2}$ ✓ ; $\frac{z_2-m}{z_1-m}=i\,\frac{m-1}{m-i}$ ✓ — **dénominateur $m-i$ et non $m+i$, re-dérivé** ($z_1-m=\frac{(i-1)(m-i)}{2}$, $z_2-m=-\frac{(1+i)(m-1)}{2}$), ce qui rend la Q2-b (alignement ⇒ cercle de diamètre $[AB]$) cohérente ; $\frac{z_1-\omega}{z_2-\omega}=\frac{(1+i)m/2}{(1-i)m/2}=i$ ✓.

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (الترجمة الفرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : NS 25 · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-45343/0001-big.jpg` (page de composantes), `.../course-436/upload-45343/0002-big.jpg` (Partie 1), `.../course-436/upload-45343/0003-big.jpg` (Partie 2)
- Pages du scan : 2–3 (sur 5) — composantes p.1

> **Note de lecture (mojibake)** : ce scan 2017 substitue plusieurs polices. Glyphe de la legend connue : $\mathbb{C}$ = « £ » *(confirmé — vérification 2026-08-06, cf. Exercice 1 du même scan)*. Glyphes **nouveaux, non couverts par la legend fournie**, résolus par le mapping alphabétique standard de la police Symbol (chaque lettre latine occupe la position de son homologue grec) : $\pi$ = « p » *(confirmé — vérification 2026-08-06)* — « d'angle de mesure p/2 » lu $\pi/2$, cohérent avec une rotation ; $\Omega$ = « W » *(confirmé — vérification 2026-08-06)* — le point-centre de rotation nommé « W » dans le scan est en réalité $\Omega$ (position Symbol de Ω), employé de façon cohérente sur toute la Partie 2 (« le point W d'affixe w », « les points W, M, M₁ et M₂ ») ; $\Gamma$ = « G » *(confirmé — vérification 2026-08-06)* — « le cercle (G) de diamètre [AB] » lu $(\Gamma)$ (position Symbol de Γ, notation standard pour un cercle) ; **glyphe ajouté à la vérification** : $\Delta$ = « D » *(confirmé — vérification 2026-08-06)* — la Partie 1 imprime « D = (2im)² » (position Symbol de Δ), lu $\Delta$ et forcé par le calcul du discriminant. *(Nota de fidélité : le scan orthographie « le discriminent » ; la transcription rétablit « discriminant » — coquille de la source, sans incidence sur une valeur.)*

**Nombres complexes (équation du 2ᵈ degré à paramètre $m$, rotation de centre $\Omega$, cercle $(\Gamma)$, cocyclicité).**

Soit $m$ un nombre complexe **non nul**.

**Partie 1 :** On considère dans $\mathbb{C}$ l'équation :
$$(E)\ :\ 2z^2 - 2(m+1+i)z + m^2 + (1+i)m + i = 0$$

1. (0,5) Vérifier que le discriminant de l'équation $(E)$ est : $\Delta = (2im)^2$
2. (0,5) Résoudre dans $\mathbb{C}$ l'équation $(E)$

**Partie 2 :** Le plan complexe est rapporté à un repère orthonormé direct $(O,\vec{e_1},\vec{e_2})$

On suppose que : $m \in \mathbb{C} \setminus \{0,1,i\}$ et on pose : $z_1 = \dfrac{1+i}{2}(m+1)$ et $z_2 = \dfrac{1-i}{2}(m+i)$

On considère les points $A$, $B$, $M$, $M_1$ et $M_2$ d'affixes respectifs $1$, $i$, $m$, $z_1$ et $z_2$

1. a) (0,25) Vérifier que : $z_1 = iz_2 + 1$
   b) (0,5) Montrer que $M_1$ est l'image de $M_2$ par la rotation de centre le point $\Omega$ d'affixe $\omega = \dfrac{1+i}{2}$ et d'angle de mesure $\dfrac{\pi}{2}$
2. a) (0,5) Vérifier que : $\dfrac{z_2-m}{z_1-m} = i\,\dfrac{m-1}{m-i}$
   b) (0,5) Montrer que si les points $M$, $M_1$ et $M_2$ sont alignés alors $M$ appartient au cercle $(\Gamma)$ de diamètre $[AB]$
   c) (0,75) Déterminer l'ensemble des points $M$ pour que les points $\Omega$, $M$, $M_1$ et $M_2$ soient cocycliques (remarquer que : $\dfrac{z_1-\omega}{z_2-\omega} = i$)

---

## 2018 — session normale — Exercice 3
Source: https://www.alloschool.com/element/65508
Statut: **vérifié (contre source retypée)** — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element/65508 → course-436/upload-52280 re-dérivé, 4 pages ; EXERCICE 3 entièrement sur l'image 0002 = p.2/4), diff caractère-par-caractère conforme au document (équation $(E_m)\,:\,z^2+(im+2)z+im+2-m=0$, $\Delta=(im-2i)^2$, **$m=i\sqrt{2}$** à la Q I-2, affixes $a=-1-i$, $\omega=i$, $m'=-im-1+i$, rotation d'angle $-\frac{\pi}{2}$, relation $m'-a=\frac{\omega-a}{\omega-b}(m-b)$, barème marginal 0,25 / 0,5 / 0,5 (I) puis 0,25 / 0,5 / 0,5 / 0,5 / 0,5 (II) sommant à **3,5 pts**) ; aucun mojibake (Unicode propre) — aucun glyphe à adjuger ; **maths re-dérivées** : $\Delta=(im+2)^2-4(im+2-m)=-(m-2)^2=(im-2i)^2$ ✓ ; racines $-1-i$ et $-im-1+i$ (= l'affixe $m'$ de la Partie II, cohérence interne forte) ✓ ; rotation $z\mapsto -iz-1+i$ de centre $i=\omega$ ✓ et $b=2$ ✓ ; $\frac{\omega-a}{\omega-b}=\frac{1+2i}{i-2}=-i$ et $m'-a=-im+2i=-i(m-2)$ ✓. **Valeur $m=i\sqrt{2}$ mise en doute puis confirmée** : elle donne une seconde racine $\sqrt2-1+i$ de module $\sqrt{4-2\sqrt2}$ et d'argument $\frac{3\pi}{8}$ — inhabituel pour une « forme exponentielle » de bac (un $m=2i$ eût donné $1+i$) ; le corrigé indépendant de la même compilation (element/65510 → course-436/upload-52282, p.7/17) traite explicitement « Pour $m=i\sqrt2$ » et aboutit à $\sqrt2\,e^{-i\frac{3\pi}{4}}$ et $2\sqrt2\cos\!\left(\frac{3\pi}{8}\right)e^{i\frac{3\pi}{8}}$ — identique à la re-dérivation : **lecture $i\sqrt2$ confirmée, pas une coquille**. **Chasse au scan brut : négative** — voir le détail à l'entrée `structures-algebriques.md` 2018 Exercice 1. ⚠️ **Source retypée non-officielle — conversion en banque soumise à arbitrage owner** (ni code NS, ni durée, ni coefficient confirmables ; fidélité au sujet officiel non établie).

- Filière / épreuve : Sciences Mathématiques (A) et (B), BIOF — d'après le titre du document et la structure du programme ; **aucun code NS ni en-tête administratif arabe visible** sur ce document retype — voir la note à l'entrée `arithmetique.md` 2018 Exercice 2 pour le détail.
- Code sujet : non visible sur ce scan (document retype) · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-52280/0002-big.jpg`
- Pages du scan : 2 (sur 4)

> **Note de lecture** : aucun mojibake — document retype Unicode propre ($\mathbb{C}$, $\Omega$, $\pi$ tous lisibles directement).

**Nombres complexes (équation paramétrée du 2ᵈ degré, rotation d'angle $-\frac{\pi}{2}$, alignement $\iff$ cocyclicité, lieu = cercle).**

Soit $m$ un nombre complexe.

**I –** On considère dans l'ensemble complexes $\mathbb{C}$ l'équation $(E_m)$ d'inconnue $z$ :
$$z^2 + (im+2)z + im+2-m = 0$$

1. a) (0,25) Vérifier que $\Delta = (im-2i)^2$ est le discriminant de l'équation $(E_m)$
   b) (0,5) Donner, suivant les valeurs de $m$, l'ensemble des solutions de l'équation $(E_m)$
2. (0,5) Pour $m = i\sqrt{2}$, écrire les deux racines de l'équation $(E_m)$ sous la forme exponentielle.

**II –** Le plan complexe est rapporté à un repère orthonormé direct $(O,\vec{u},\vec{v})$

On considère les points $A$, $\Omega$, $M$ et $M'$ d'affixes respectifs $a=-1-i$, $\omega=i$, $m$ et $m'=-im-1+i$

1. Soit $R$ la rotation d'angle $-\dfrac{\pi}{2}$ qui transforme $M$ en $M'$
   a) (0,25) Vérifier que $\Omega$ est le centre de $R$
   b) (0,5) Déterminer l'affixe $b$ de $B$, où $B$ est le point tel que : $A = R(B)$
2. a) (0,5) Vérifier que : $m'-a = \dfrac{\omega-a}{\omega-b}(m-b)$
   b) (0,5) En déduire que les points $A$, $M$ et $M'$ sont alignés si et seulement si les points $A$, $B$, $\Omega$ et $M$ sont cocycliques.
   c) (0,5) Montrer que l'ensemble des points $M$ tel que les points $A$, $M$ et $M'$ soient alignés est un cercle dont on déterminera le centre et le rayon.

---
