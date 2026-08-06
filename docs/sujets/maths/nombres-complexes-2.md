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
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan course-436/upload-87482, page(s) 3–4. À faire vérifier (README §3).

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
