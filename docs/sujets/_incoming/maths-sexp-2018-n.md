# Examen national Mathématiques — SExp — 2018, session NORMALE (NS 22F) — le Problème (11 points)

> ## ⚠️ STATUT : **NON VÉRIFIÉ**
>
> **Ce fichier est une TRANSCRIPTION NON VÉRIFIÉE.** Il a été écrit en une
> passe par un transcripteur, le **2026-08-27** (date réelle, lue par
> `date -u`). Le transcripteur ne se valide pas lui-même : la vérification
> est une passe **INDÉPENDANTE**, avec **re-téléchargement du scan**, qui
> reste **entièrement à faire**.
>
> Tant qu'elle n'a pas eu lieu et n'a pas laissé sa trace dans le `Statut:`
> du bloc, **rien de ce fichier ne peut devenir une entrée de banque**
> (`content/maths/*/bank.yaml`). Protocole :
> `docs/sujets/_incoming/README.md`.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que le
> **Problème** (11 points). Les **exercices 1, 2 et 3** de la même épreuve
> sont **déjà en banque** — `bk-2018-n-x1` (`geometrie-espace`),
> `bk-2018-n-x2` (`nombres-complexes-1`), `bk-2018-n-x3` (`denombrement`) —
> et ne doivent **surtout pas** être reconvertis : `web/src/lib/examens.ts`
> **somme les `bareme_total`**, un doublon fausserait le /20.

---

## Pourquoi ce sujet

L'épreuve **SExp 2018 session normale** est assemblée à **9,00/20** dans
Examens blancs : ses trois exercices courts (3 + 3 + 3) sont en banque, son
**problème d'analyse ne l'est pas**. À 9,00 elle est **sous le seuil
d'affichage (9,75)** — donc **invisible pour l'élève aujourd'hui**. Le
problème transcrit la ferait passer d'invisible à **complète (20,00/20)**.

Le recensement (`docs/sujets/maths/CENSUS.md`, l. 216) estimait ce problème à
**« Problème (11) »** avec un **« (?) »** : le chiffre était **inféré** de
« 9 + 11 = 20 », pas lu.

> **Il est maintenant LU.** Le cartouche de la page 1 imprime
> **« Problème — Etude d'une fonction numérique, calcul intégral et suites
> numériques — 11 points »**, et le recompte des vingt barèmes de marge
> retombe sur **11,00** exactement. L'hypothèse du recensement était juste ;
> elle cesse d'être une hypothèse.

---

## Provenance

- **Page source :** `https://www.alloschool.com/element/94699`
- **Corrigé (non fetché, hors périmètre) :** `element/94704`
  (`course-438/upload-70455`, 3 fichiers)
- **Images, re-dérivées du HTML servi** (pas recopiées d'une source
  antérieure) :
  `https://www.alloschool.com/index.ph%70/assets/documents/course-438/upload-70450/000{1..4}-big.jpg`
- **Nombre de pages : 4** — confirmé deux fois : quatre fichiers `-big.jpg`
  dans le HTML, et la pagination imprimée « الصفحة 1/4 … 4/4 » relue sur
  chacune des quatre pages.
- **Format :** JPEG 1240×1754, 150 dpi (`file` sur les quatre — ce sont bien
  des images, pas des pages HTML de redirection ; piège n° 1 du README).
- **Code lu sur le scan : `NS22F`** (imprimé « NS 22F » dans le cartouche de
  la p. 1, « NS22F » sans espace dans le bandeau des p. 2, 3 et 4).
  **Ce n'est pas NS24F** — le code SM, celui du sujet à ne pas confondre.

### MD5 / SHA-256 des images réellement lues

| Page | MD5 | SHA-256 (préfixe) | Taille |
|---|---|---|---|
| `0001-big.jpg` | `3b051fc89ef6cc861bad4c05c38422c4` | `57bb5154199d5616…` | 356 300 o |
| `0002-big.jpg` | `b925017a2ffc040d2b24a0f26ddd5e66` | `63d12a4eadbf9cc8…` | 399 731 o |
| `0003-big.jpg` | `7240b2efa4a68cdf9c7728b0ca4b1e01` | `2f2fb5f9a56e4f57…` | 392 336 o |
| `0004-big.jpg` | `e61f70c31ea1f63721aa4bb36cead064` | `d8d72d8e24777bd7…` | 369 424 o |

---

## Les quatre contrôles anti-panachage — résultats

*(Protocole obligatoire né de l'incident de cache CDN d'AlloSchool :
`_incoming/README.md`, § « RÈGLE DE VÉRIFICATION AJOUTÉE LE 2026-08-27 ».
Risque aigu ici : SM 2018 N et SExp 2018 N sont deux sujets de la même année,
et un panachage page à page serait crédible.)*

### 1. Année ET code relus sur CHAQUE page — ✔ **PASS**

Recadrage du bandeau d'en-tête de chacune des quatre pages, lu au ×3 :

| Page | Pagination imprimée | Code | Année / session | Filière imprimée |
|---|---|---|---|---|
| 1 | الصفحة **1/4** | **NS 22F** | الدورة العادية **2018** | مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية — خيار فرنسية |
| 2 | الصفحة **2/4** | **NS22F** | الدورة العادية **2018** | idem |
| 3 | الصفحة **3/4** | **NS22F** | الدورة العادية **2018** | idem |
| 4 | الصفحة **4/4** | **NS22F** | الدورة العادية **2018** | idem |

**Aucune page ne porte NS24F.** Aucune page ne mentionne
شعبة العلوم الرياضية (Sciences Mathématiques). Les quatre bandeaux sont
identiques au numéro de page près.

### 2. Recoupement par instrument NON VISUEL — ✔ **PASS**

**a) OCR (`tesseract` 5, `-l eng --psm 6`) des quatre pages, exécuté AVANT
toute lecture visuelle du corps du sujet.** L'OCR restitue, sans que le
lecteur ait rien à y projeter :

- le code **`NS22F`** en tête des pages 2 et 3 ; en tête de la page 4 il rend
  `NS29F` — **artefact d'OCR**, redressé au ×3 : le scan porte bien `NS22F`
  (les deux chiffres sont identiques au pixel près à ceux des pages 2 et 3) ;
- l'année **2018** sur les quatre pages ;
- la carte des composantes (« trois exercices et un problème »), et
  **`Probléme : (11 points )`** ;
- les énoncés des exercices 1, 2, 3 et du Problème, en clair.

**b) Re-dérivation mathématique de toutes les identités que l'énoncé demande
de « montrer ».** Elle ne passe par aucune attente du lecteur : si le scan
était panaché, ces identités ne se refermeraient pas.

| Identité imprimée | Re-dérivation | Verdict |
|---|---|---|
| $g(0)=0$ pour $g(x)=e^x-x^2+3x-1$ | $1-0+0-1=0$ | ✔ |
| $g' > 0$ sur $\mathbb{R}$ (le tableau imprimé) | $g'(x)=e^x-2x+3$, minimum en $x=\ln 2$ : $5-2\ln 2 \approx 3{,}61 > 0$ | ✔ |
| $f(x)=\frac{x^2}{e^x}-\frac{x}{e^x}+x$ | développement de $(x^2-x)e^{-x}+x$ | ✔ |
| $f(x)=\frac{x^2-x+xe^{x}}{e^{x}}$ | même expression, mise au même dénominateur | ✔ |
| $f'(x)=g(x)e^{-x}$ | $f'=(2x-1)e^{-x}-(x^2-x)e^{-x}+1=e^{-x}\!\left(e^{x}-x^2+3x-1\right)$ | ✔ |
| $f''(x)=(x^2-5x+4)e^{-x}$ | dérivée de $(-x^2+3x-1)e^{-x}+1$ ; racines **1 et 4** | ✔ (colle aux abscisses d'inflexion imprimées) |
| $H'=h$ pour $H(x)=(x^2+2x+2)e^{-x}$, $h(x)=-x^2e^{-x}$ | $(2x+2)e^{-x}-(x^2+2x+2)e^{-x}=-x^2e^{-x}$ | ✔ |
| $\int_0^1 x^2e^{-x}dx=\frac{2e-5}{e}$ | $-\big[H(1)-H(0)\big] = 2-\frac5e$ | ✔ |
| $\int_0^1 xe^{-x}dx=\frac{e-2}{e}$ | IPP : $-e^{-1}+(1-e^{-1})=1-\frac2e$ | ✔ |
| $f(4) \approx 4{,}2$ (valeur donnée pour le tracé) | $12e^{-4}+4 = 4{,}2198\ldots$ | ✔ |
| $u_0=\tfrac12$, $0\le u_n\le 1$, $(u_n)$ décroissante | $f(\tfrac12)=0{,}348\ldots$ ; $f([0,1])\subseteq[0,1]$ ; points fixes $0$ et $1$ | ✔ cohérent, limite $0$ |

**Onze identités indépendantes se referment.** Un jeu de pages panaché ne
produit pas cela.

**c) Recoupement contre la banque déjà vérifiée (contrôle non prévu au
protocole, ajouté ici).** Les exercices 1 et 2 lus par OCR sur **ma** page 2
coïncident, valeur par valeur, avec `bk-2018-n-x1` et `bk-2018-n-x2` — deux
entrées de banque vérifiées le **2026-08-07** depuis un fetch **antérieur et
indépendant** du même `element/94699` :
$A(0,-2,-2)$, $B(1,-2,-4)$, $C(-3,-1,2)$ ; $2x+2y+z+6=0$ ;
$x^2+y^2+z^2-2x-2z-23=0$ ; $\Omega(1,0,1)$, $R=5$ ; $2z^2+2z+5=0$.
Deux fetchs séparés de trois semaines rendent le même contenu.

### 3. MD5 consignés + SECOND téléchargement — ✔ **PASS**

Second téléchargement complet, **User-Agent différent**, `Cache-Control:
no-cache`, dans un répertoire séparé. Les quatre fichiers sont
**octet-pour-octet identiques** au premier téléchargement (`cmp` : 4/4
identiques ; MD5 inchangés). Ce que sert le CDN est stable.

### 4. Le `<title>` servi par le HTML — ⚠️ **PASS QUALIFIÉ — ANOMALIE À LIRE**

```
<title>Examen National Maths Sciences et Technologies 2018 Normale - Sujet - AlloSchool</title>
```

- **Année : 2018** ✔ · **Session : Normale** ✔ · **Matière : Maths** ✔ ·
  **Type : Sujet** ✔
- **Filière : « Sciences et Technologies »** — **ce n'est ni « Sciences
  Expérimentales » ni « Sciences Mathématiques ».** Le contrôle ne rend donc
  pas le mot attendu.

**Ce que j'ai fait au lieu de passer outre :**

1. **Le fil d'Ariane de la même page** dit, lui :
   « Mathématiques 2ème BAC **Sciences Physiques** BIOF › Examens nationaux
   avec corrigés ». `course-438` est le cours SExp-PC, pas un cours ST.
2. **L'anomalie est SYSTÉMATIQUE, pas propre à cet élément.** J'ai fetché
   deux éléments voisins que le CENSUS donne déjà pour `sourcé-confirmé`
   **NS22F / SExp** :
   - `element/94525` (SExp 2017 N) → titre
     « Examen National Maths **Sciences et Technologies** 2017 Normale » ;
   - `element/94485` (SExp 2016 N) → titre
     « Examen National Maths **Sciences et Technologies** 2016 Normale ».
   Le libellé fautif couvre **tout `course-438`**. C'est une erreur de
   nommage côté AlloSchool, pas un indice de panachage.
3. **Le scan lui-même tranche, et il est sans ambiguïté.** Le cartouche de la
   p. 1 imprime la filière en toutes lettres :
   **مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية — خيار فرنسية**
   = « filière Sciences de la Vie et de la Terre et filière Sciences
   Physiques — option française », c'est-à-dire **Sciences Expérimentales**.
   Et il le réimprime sur les pages 2, 3 et 4.
4. Le mode d'échec que le contrôle n° 4 vise — « la page sert un autre
   sujet » — est **exclu** par les contrôles 1, 2 et 3, et par le
   recoupement 2-c contre la banque.

> **Verdict que je propose, et que je ne m'autorise pas à trancher seul :**
> **PASS qualifié.** Le titre est faux **sur le seul mot de la filière**, et
> il l'est identiquement sur des éléments dont ce dépôt a déjà lu le code
> NS22F sur scan. Je **transcris**, parce que je nomme la filière d'après le
> **cartouche**, jamais d'après le titre.
> **La vérification doit reprendre ce point en n° 1 de son docket** et
> l'arbitrer, y compris en décidant de rejeter ma passe.

---

## Cartouche de la page 1 — relu au ×2, tel qu'imprimé

| Champ imprimé | Valeur lue |
|---|---|
| الامتحان الوطني الموحد للبكالوريا | Examen national unifié du baccalauréat |
| المسالك الدولية — خيار فرنسية | Filières internationales — **option française** |
| الدورة | **العادية 2018** (session **normale 2018**) |
| — | **الموضوع** (le sujet) |
| Code | **NS 22F** |
| الصفحة | **1 / 4** |
| المادة | **الرياضيات** — Mathématiques |
| الشعبة أو المسلك | **مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية — خيار فرنسية** (SVT + Sciences Physiques, option française = **Sciences Expérimentales**) |
| **مدة الإنجاز** (durée) | **3** (heures) |
| **المعامل** (coefficient) | **7** |
| Émetteur | المركز الوطني للتقويم والامتحانات والتوجيه |

**INSTRUCTIONS GENERALES** *(transcrites mot à mot)* :

> ✓ L'utilisation de la calculatrice non programmable est autorisée ;
> ✓ Le candidat peut traiter les exercices de l'épreuve suivant l'ordre qui
> lui convient ;
> ✓ L'utilisation de la couleur rouge lors de la rédaction des solutions est
> à éviter.

**COMPOSANTES DU SUJET** *(transcrites mot à mot)* :

> L'épreuve est composée de trois exercices et un problème indépendants entre
> eux et répartis suivant les domaines comme suit :

| | Domaine | Barème imprimé |
|---|---|---|
| **Exercice 1** | Géométrie dans l'espace | **3 points** |
| **Exercice 2** | Nombres complexes | **3 points** |
| **Exercice 3** | Calcul des probabilités | **3 points** |
| **Problème** | Etude d'une fonction numérique, calcul intégral et suites numériques | **11 points** |

Somme : $3+3+3+11 = \mathbf{20}$ ✔

> **C'est la pièce qui tranche les 11 points.** Le « (?) » du CENSUS tombe :
> **11 est lu, pas inféré.**

### Deux écarts avec le dépôt, signalés et NON lissés

1. **Le CENSUS (l. 216) écrit « probas (3) (?) »** pour l'exercice 3. Le
   cartouche imprime **« Calcul des probabilités »** — le « (?) » tombe aussi.
   Mais l'entrée de banque correspondante, `bk-2018-n-x3`, vit dans
   **`content/maths/denombrement`**, pas dans `probabilites-conditionnelles`.
   Ce n'est **pas forcément une erreur** (l'exercice tire simultanément 3
   boules d'une urne de 9 : le corps est du dénombrement, la q2 introduit une
   binomiale) — mais l'écart entre le **libellé imprimé** et le **slug de
   rangement** existe, il est ici **signalé**, et il n'est **pas** de mon
   ressort de le corriger. Hors périmètre de ce fichier.
2. **Le CENSUS n'indique ni `upload-`, ni nombre de pages** pour SExp 2018 N
   (contrairement à SExp 2019 N ou 2022 N). Je les fournis :
   **`course-438/upload-70450`, 4 pages.** À reporter au CENSUS lors d'une
   passe de mise à jour — pas par ce fichier, qui n'écrit rien d'autre que
   lui-même.

---

## Table de glyphes — le scan est PROPRE, à **une** substitution près

Ce scan **ne ressemble pas** à SM 2022 N (substitution massive) ni à
SM 2023 N (mojibake intermittent). Il rend correctement :
$\le$ (« $0 \le u_n \le 1$ », p. 4), les crochets d'intervalles ouverts/fermés
($]-\infty,0]$, $[0,+\infty[$, $[0,1]$), les $\infty$, les exposants, les
indices, les flèches $\mapsto$, l'intégrale et ses bornes.

| Glyphe imprimé | Où | Lecture retenue | Comment elle est adjugée |
|---|---|---|---|
| **`⊔`** — carré ouvert par le haut : deux hampes verticales réunies par une barre basse, angles droits, posé sur la ligne de base. Boîte mesurée : **x ≈ 933–946, y ≈ 447–466** dans `0004-big.jpg` (1240×1754), soit **≈ 13 × 20 px**. Relu au **×20**. | p. 4, **question II)5)**, entre `f(4)` et `4.2` : « (on prend : $f(4)\ \sqcup\ 4.2$ ) » | **$\approx$** (« environ égal » ; $\simeq$ conviendrait aussi) | **Par conséquence, pas par ressemblance.** L'emplacement est celui d'un **symbole de relation**. $f(4) = (16-4)e^{-4}+4 = 12e^{-4}+4 = \mathbf{4{,}2198\ldots}$ — donc **pas** $=4{,}2$, mais $\approx 4{,}2$. Aucune autre relation ($=$, $<$, $\le$, $>$) ne rend l'énoncé vrai avec la valeur imprimée `4.2`. La tournure « **on prend :** … » est la formule standard de ces sujets pour une valeur approchée de tracé. |

**Contrôle de robustesse :** le glyphe est **dessiné proprement** (traits
nets, angles droits) — ce n'est **pas** le rectangle plein/vide « caractère
manquant » d'un rendu de secours, mais un **vrai caractère d'une police
substituée**. Sa forme ne porte donc, elle non plus, **aucune information** :
seule la conséquence mathématique décide.

**Une seule occurrence trouvée** dans tout le Problème. *(La vérification doit
confirmer l'unicité — voir docket, point 3.)*

**Ce qui n'est PAS une substitution :** le scan écrit les ensembles
**`IR`** et **`IN`** (deux caractères, un I accolé au R / au N) au lieu de
$\mathbb{R}$ et $\mathbb{N}$. C'est la **typographie normale** de ces sujets
marocains, pas une casse. Idem pour les barèmes de marge, imprimés avec un
**point décimal** (`0.25`, `0.5`, `0.75`) et non une virgule ; et pour
`4.2` en II)5). *(Je les restitue ci-dessous en virgule française, comme le
reste du corpus, en le disant ici plutôt qu'en le taisant.)*

---

## Figures

**Une seule figure est imprimée dans le Problème**, et une seule figure est
**demandée** au candidat.

### Figure imprimée — le tableau de variations de $g$ (p. 3, marge droite)

Décrite **depuis le dessin**, relue au ×4. Tableau à **trois lignes**, **sans
aucune colonne intermédiaire** (aucune valeur charnière n'y figure) :

| ligne | contenu tel que dessiné |
|---|---|
| $x$ | $-\infty$ à gauche · $+\infty$ à droite |
| $g'(x)$ | un **`+`** unique, centré, sur **toute** la largeur |
| $g(x)$ | **une seule flèche montante**, de $-\infty$ (en bas à gauche) vers $+\infty$ (en haut à droite) |

> **Point important pour la pédagogie et pour la conversion :** le tableau
> **ne marque PAS** $g(0)=0$ — c'est précisément l'objet de la question I)1).
> Le tableau donne la **stricte croissance** et les **deux limites**, rien de
> plus. Une figure re-dessinée qui ajouterait le zéro **changerait
> l'exercice**.

### Figure demandée — question II)5), **1 point**

> « Construire $(D)$ et $(C)$ dans le même repère $(O,\vec{i},\vec{j})$
> (on prend : $f(4) \approx 4{,}2$) »

- **Unités :** le repère est **orthonormé**, **unité : 1 cm** — déclaré en
  tête de la Partie II, pas à la question 5.
- **Aucune courbe n'est imprimée** : le candidat trace. Le sujet lui fournit
  pour cela, en amont : les deux limites (II-1a, II-1c), l'asymptote
  $(D) : y = x$ en $+\infty$ (II-1b), la branche parabolique de direction
  $(Oy)$ en $-\infty$ (II-1d), la position de $(C)$ par rapport à $(D)$
  (II-2b), le tableau de variations (II-3c), les deux points d'inflexion
  d'abscisses **1** et **4** (II-4b), et la valeur **$f(4) \approx 4{,}2$**.
- La question **6)c)** renvoie à ce même dessin (aire entre $(C)$, $(D)$,
  $x=0$ et $x=1$), mais se calcule **sans** lui.

**Aucune autre figure** dans le Problème. Aucune sur la page 4 hors le texte.

---

## 2018 — session normale — Problème
Source: https://www.alloschool.com/element/94699
Statut: **NON VÉRIFIÉ — transcrit le 2026-08-27, en attente de la passe adversariale indépendante**

- Filière / épreuve : **Sciences Expérimentales** (SVT et Sciences
  Physiques), option française — Mathématiques, **3 h**, **coefficient 7**
- Code sujet : **NS 22F** · Barème du Problème : **11 points**
- Images lues : `.../course-438/upload-70450/0003-big.jpg` (Partie I et
  Partie II questions 1 et 2) et `.../0004-big.jpg` (Partie II questions 3
  à 6, et Partie III)
- Pages du scan : **3 et 4** (sur 4). Le Problème commence au **tiers bas de
  la page 3**, juste après l'exercice 3, et se termine **au milieu de la
  page 4** ; le bas de la page 4 est vide.
- Barèmes de marge : **20 relevés**, recomptés ci-dessous.

---

**PROBLÈME (11 points)**

### Partie I

Soit $g$ la fonction numérique définie sur $\mathbb{R}$ par :

$$g(x) = e^{x} - x^{2} + 3x - 1$$

Le tableau ci-contre est le tableau de variations de la fonction $g$.

*(→ le tableau imprimé est décrit ci-dessus, § Figures : $g'(x) > 0$ sur tout
$\mathbb{R}$, $g$ croît de $-\infty$ à $+\infty$ ; aucune valeur intermédiaire
n'y est portée.)*

1. *(0,25)* Vérifier que $g(0) = 0$
2. *(0,5)* Déterminer le signe de $g(x)$ sur chacun des intervalles
   $\left]-\infty, 0\right]$ et $\left[0, +\infty\right[$

### Partie II

Soit $f$ la fonction numérique définie sur $\mathbb{R}$ par :

$$f(x) = \left(x^{2} - x\right)e^{-x} + x$$

et $(C)$ sa courbe représentative dans un repère orthonormé
$\left(O, \vec{i}, \vec{j}\right)$ ( unité : $1\ cm$ )

1. **a)** *(0,5)* Vérifier que $f(x) = \dfrac{x^{2}}{e^{x}} - \dfrac{x}{e^{x}} + x$ pour tout $x$ de $\mathbb{R}$ puis montrer que $\displaystyle\lim_{x \to +\infty} f(x) = +\infty$

   **b)** *(0,75)* Calculer $\displaystyle\lim_{x \to +\infty}\left(f(x) - x\right)$ puis en déduire que $(C)$ admet une asymptote $(D)$ au voisinage de $+\infty$ d'équation $y = x$

   **c)** *(0,5)* Vérifier que : $f(x) = \dfrac{x^{2} - x + x e^{x}}{e^{x}}$ pour tout $x$ de $\mathbb{R}$ puis calculer $\displaystyle\lim_{x \to -\infty} f(x)$

   **d)** *(0,5)* Montrer que $\displaystyle\lim_{x \to -\infty}\dfrac{f(x)}{x} = -\infty$ et interpréter le résultat géométriquement .

2. **a)** *(0,25)* Montrer $f(x) - x$ et $x^{2} - x$ ont le même signe pour tout $x$ de $\mathbb{R}$

   **b)** *(0,5)* En déduire que $(C)$ est au dessus de $(D)$ sur chacun des intervalles $\left]-\infty, 0\right]$ et $\left[1, +\infty\right[$ , et en dessous de $(D)$ sur l'intervalle $\left[0, 1\right]$

3. **a)** *(0,75)* Montrer que $f\,'(x) = g(x)\, e^{-x}$ pour tout $x$ de $\mathbb{R}$

   **b)** *(0,5)* En déduire que la fonction $f$ est décroissante sur $\left]-\infty, 0\right]$ et croissante sur $\left[0, +\infty\right[$

   **c)** *(0,25)* Dresser le tableau de variations de la fonction $f$

4. **a)** *(0,25)* Vérifier que $f\,''(x) = \left(x^{2} - 5x + 4\right)e^{-x}$ pour tout $x$ de $\mathbb{R}$

   **b)** *(0,5)* En déduire que la courbe $(C)$ admet deux points d'inflexion d'abscisses respectives $1$ et $4$

5. *(1)* Construire $(D)$ et $(C)$ dans le même repère $\left(O, \vec{i}, \vec{j}\right)$ (on prend : $f(4) \approx 4{,}2$)

   > ⚠️ **Glyphe substitué** : le scan imprime `f(4) ⊔ 4.2`. Lu $\approx$ —
   > voir la table de glyphes ci-dessus. La valeur numérique **4,2** est,
   > elle, parfaitement lisible.

6. **a)** *(0,5)* Montrer que la fonction $H : x \mapsto \left(x^{2} + 2x + 2\right)e^{-x}$ est une primitive de la fonction $h : x \mapsto -\,x^{2}\,e^{-x}$ sur $\mathbb{R}$ puis en déduire que $\displaystyle\int_{0}^{1} x^{2}e^{-x}\,dx = \dfrac{2e - 5}{e}$

   **b)** *(0,75)* A l'aide d'une intégration par parties montrer que $\displaystyle\int_{0}^{1} x e^{-x}\,dx = \dfrac{e - 2}{e}$

   **c)** *(0,75)* Calculer en $cm^{2}$ l'aire du domaine plan limité par $(C)$ et $(D)$ et les droites d'équations $x = 0$ et $x = 1$

### Partie III

Soit $(u_{n})$ la suite numérique définie par : $u_{0} = \dfrac{1}{2}$ et $u_{n+1} = f(u_{n})$ pour tout $n$ de $\mathbb{N}$

1. *(0,75)* Montrer que $0 \le u_{n} \le 1$ pour tout $n$ de $\mathbb{N}$ ( on pourra utiliser le résultat de la question II)3)b) )
2. *(0,5)* Montrer que la suite $(u_{n})$ est décroissante .
3. *(0,75)* En déduire que $(u_{n})$ est convergente et déterminer sa limite.

---

## Recompte du barème — question par question, contre la marge du scan

**20 barèmes relevés dans la colonne de marge**, dans l'ordre du scan :

| Partie | Question | Barème imprimé |
|---|---|---|
| I | 1) | 0,25 |
| I | 2) | 0,5 |
| **I — sous-total** | 2 questions | **0,75** |
| II | 1)a) | 0,5 |
| II | 1)b) | 0,75 |
| II | 1)c) | 0,5 |
| II | 1)d) | 0,5 |
| II | 2)a) | 0,25 |
| II | 2)b) | 0,5 |
| II | 3)a) | 0,75 |
| II | 3)b) | 0,5 |
| II | 3)c) | 0,25 |
| II | 4)a) | 0,25 |
| II | 4)b) | 0,5 |
| II | 5) | 1 |
| II | 6)a) | 0,5 |
| II | 6)b) | 0,75 |
| II | 6)c) | 0,75 |
| **II — sous-total** | 15 questions | **8,25** |
| III | 1) | 0,75 |
| III | 2) | 0,5 |
| III | 3) | 0,75 |
| **III — sous-total** | 3 questions | **2,00** |

$$0{,}75 \;+\; 8{,}25 \;+\; 2{,}00 \;=\; \mathbf{11{,}00}$$

> ✔ **Le recompte tombe exactement sur les 11 points du cartouche.** Aucun
> écart à déclarer, donc rien à ajuster ni à taire. **20 questions barémées.**
>
> Et $3 + 3 + 3 + 11 = 20$ : l'épreuve **SExp 2018 N** passerait de
> **9,00/20** (invisible, sous le seuil de 9,75) à **20,00/20 — complète**.

---

## Classement proposé vers `content/maths/`

> **Contrôle des slugs : FAIT.** J'ai exécuté un vrai
> `ls content/maths/` le **2026-08-27**. L'arborescence réelle contient
> exactement 14 slugs : `arithmetique`, `calcul-integral`, `denombrement`,
> `derivabilite-etude-fonctions`, `equations-differentielles`,
> `fonction-exponentielle`, `fonction-logarithme`, `geometrie-espace`,
> `limites-continuite`, `nombres-complexes-1`, `nombres-complexes-2`,
> `probabilites-conditionnelles`, `structures-algebriques`,
> `suites-numeriques`.
> **Les cinq slugs que je cite ci-dessous existent tous** —
> `derivabilite-etude-fonctions`, `limites-continuite`, `calcul-integral`,
> `suites-numeriques`, `fonction-exponentielle`. Aucun slug inventé, aucune
> faute de frappe. *(Rappel de filière, contrôlé lui aussi : SExp utilise
> `nombres-complexes-1` — c'est bien là que vit `bk-2018-n-x2` — et non
> `nombres-complexes-2`. Aucun des deux n'est mobilisé par le Problème.)*

| Bloc | Barème | Slug proposé |
|---|---|---|
| Problème | 11 pts | **`derivabilite-etude-fonctions`** (dominant) · cross-lists : `limites-continuite`, `calcul-integral`, `suites-numeriques`, `fonction-exponentielle` |

### Pourquoi `derivabilite-etude-fonctions` domine — le poids, question par question

| Domaine | Questions | Poids |
|---|---|---|
| **`derivabilite-etude-fonctions`** | I-1, I-2 (signe via le tableau donné) · II-2a/2b (position relative) · II-3a/3b/3c (dérivée, monotonie, tableau) · II-4a/4b (dérivée seconde, inflexions) · II-5 (tracé) | **4,75** |
| `limites-continuite` | II-1a, II-1b, II-1c, II-1d (limites, asymptote, branche parabolique) | 2,25 |
| `calcul-integral` | II-6a, II-6b, II-6c (primitive, IPP, aire) | 2,00 |
| `suites-numeriques` | III-1, III-2, III-3 | 2,00 |
| `fonction-exponentielle` | **transversal** — $e^{x}$ et $e^{-x}$ portent $g$, $f$, $f'$, $f''$, $H$, $h$ et les deux intégrales | *(non chiffrable séparément)* |

**Total réparti : $4{,}75 + 2{,}25 + 2{,}00 + 2{,}00 = 11{,}00$** ✔

### Note pour l'owner — répartir ou ne pas répartir

Le README du sas pose la règle : **le barème est réparti, jamais dupliqué**,
et « un cross-list qui ne pèserait qu'une demi-question ne devient pas une
entrée ». Deux lectures s'affrontent ici, et **je ne tranche pas** :

- **Une seule entrée à 11 pts** sous `derivabilite-etude-fonctions`, les
  quatre autres domaines honorés dans le `reasoning` — c'est ce qu'ont fait
  `maths-sm-2022-n.md` et `maths-sm-2025-n.md` pour leur problème unique de
  10 pts. Avantage : le problème reste **un objet cohérent**, ce qu'il est
  pédagogiquement (chaque partie se sert de la précédente).
- **Quatre entrées** selon le tableau de poids ci-dessus (4,75 / 2,25 / 2,00 /
  2,00). Avantage : chaque notion reçoit ce qui lui revient. Inconvénient :
  les Parties II-6 et III **dépendent explicitement** de résultats établis en
  II-2b et II-3b — découpées, elles deviennent des orphelins qui devraient
  réimporter tout le contexte.

Dans les deux cas la somme retombe sur **11,00** et l'épreuve sur **20,00**.
**Décision d'owner, pas de transcripteur.**

### Une remarque de contenu, pas de classement

Le cartouche annonce « Etude d'une fonction numérique, **calcul intégral** et
**suites numériques** » — les trois y sont. Le CENSUS (l. 216) prévoyait en
plus « **ln|exp (?)** ». **Il n'y a AUCUN logarithme dans ce problème** :
c'est de l'exponentielle pure, du début à la fin. Le « (?) » se lève dans ce
sens. `fonction-logarithme` **ne doit pas** être cross-listé.

---

## ⚠️ Ce que la vérification devra trancher EN PRIORITÉ

*(Docket écrit par le transcripteur. Chaque point est une chose que **je n'ai
pas pu clore seul**, ou dont je veux qu'un œil indépendant reprenne la
décision. Ordre = ordre de risque décroissant.)*

1. **🔴 LE `<title>` D'ALLOSCHOOL DIT « SCIENCES ET TECHNOLOGIES ».**
   C'est le seul des quatre contrôles qui ne rend pas le mot attendu, et
   c'est le point n° 1 du docket. Ma position : **anomalie de nommage côté
   AlloSchool**, systématique sur tout `course-438` (démontré sur
   `element/94525` et `element/94485`, deux SExp `sourcé-confirmé` NS22F),
   contredite par le fil d'Ariane (« 2ème BAC Sciences Physiques BIOF ») et
   **écrasée par le cartouche du scan**, qui imprime la filière en toutes
   lettres sur les quatre pages. **À reprendre depuis zéro, avec un fetch
   indépendant, et à arbitrer explicitement** — y compris en rejetant ma
   passe si le vérificateur conclut autrement. **Ne pas convertir avant que
   ce point soit soldé par écrit.**

2. **🔴 Le glyphe `⊔` de la question II)5).** Boîte **x ≈ 933–946,
   y ≈ 447–466** dans `0004-big.jpg`. Je le lis **$\approx$**, adjugé par la
   conséquence ($f(4) = 4{,}2198\ldots$, la valeur imprimée est `4.2`), pas
   par sa forme. **À recadrer au ×20 et à confirmer.** Point de méthode
   emprunté au README : *un contrôle par conséquence valide une lecture sans
   exiger qu'on ait compris pourquoi le glyphe est illisible* — je n'ai
   **pas** identifié la police substituée, et je le dis.

3. **🟠 L'unicité de cette substitution.** Je n'ai trouvé **qu'une**
   occurrence du glyphe cassé dans tout le Problème, et le reste du scan rend
   correctement $\le$, les crochets d'intervalle et les $\infty$. **À
   confirmer par un balayage page 3 + page 4**, pas par confiance : les
   scans de ce corpus qui cassent un glyphe en cassent souvent d'autres,
   par intermittence (cas SM 2023 N).

4. **🟠 Les vingt barèmes de marge.** Ils sont imprimés au **point décimal**
   (`0.25`/`0.5`/`0.75`/`1`) dans une colonne étroite, et je les restitue en
   virgule. Les plus fragiles à relire, parce qu'un `0.25` mal lu en `0.5`
   passerait inaperçu : **II-2a (0,25)**, **II-3c (0,25)**, **II-4a (0,25)**
   — trois `0,25` isolés au milieu de `0,5`. Le recompte tombe sur 11,00, ce
   qui est un bon indice mais **pas une preuve** : deux erreurs opposées se
   compenseraient.

5. **🟠 Le tableau de variations imprimé de $g$ (p. 3).** À **re-décrire
   depuis l'image**, jamais depuis mon texte — c'est la classe de défauts la
   plus fréquente du projet. Points à confirmer : (a) le tableau n'a **aucune
   colonne intermédiaire** ; (b) $g'(x)$ porte **un seul `+`** ; (c) **aucune
   valeur** n'est marquée dans la ligne $g(x)$ — en particulier **pas**
   $g(0)=0$, qui est l'objet même de la question I)1). Si le zéro y figurait,
   la question I)1) serait vidée de son sens et ma description serait fausse.

6. **🟡 Bornes et intervalles de II-2b.** Lu : au-dessus sur
   $\left]-\infty,0\right]$ **et $\left[1,+\infty\right[$**, en dessous sur
   $\left[0,1\right]$. L'OCR rendait ce `[1,+∞[` par `[L400` — j'ai tranché
   au ×3 **et** par la cohérence ($x^2-x \ge 0$ hors $[0,1]$). Fermetures/
   ouvertures des crochets à recontrôler une à une.

7. **🟡 Les deux expressions de $f$ en II-1a et II-1c.**
   $\frac{x^2}{e^x}-\frac{x}{e^x}+x$ et $\frac{x^{2}-x+x e^{x}}{e^{x}}$ :
   c'est bien **$x e^{x}$** au numérateur de la seconde (relu au ×6), pas
   $x e^{-x}$. Les deux sont vraies, donc une erreur de signe d'exposant ne
   se verrait **pas** au calcul de la première.

8. **🟡 `f(4) ≈ 4,2` et les abscisses d'inflexion `1` et `4`.** Un `4` mal lu
   casserait le tracé demandé. Les racines de $x^2-5x+4$ sont $1$ et $4$ :
   cohérent — mais à relire directement.

9. **🟡 $u_0 = \dfrac{1}{2}$** (relu au ×6 ; l'OCR proposait `5`, ce qui est
   faux et aurait tout cassé — $u_0=5$ violerait $0\le u_n\le 1$). Et le
   renvoi de III)1) est bien à **« II)3)b) »** — donc à la monotonie de $f$,
   **pas** à II)2)b). À relire.

10. **🟢 La numérotation des parties : I) / II) / III).** L'OCR rendait la
    troisième partie « II) ». Au ×6 le scan porte bien **trois hampes**.
    À confirmer — une partie mal numérotée casserait le renvoi du point 9.

11. **🟢 Portée.** J'affirme que le Problème **commence** au tiers bas de la
    p. 3 et **finit** au milieu de la p. 4, et que **rien** n'en déborde sur
    les pages 1 et 2 (qui portent le cartouche, l'exercice 1 et l'exercice 2)
    ni sous la question III)3) (bas de p. 4 : **vide**). À confirmer, pour
    garantir que la transcription ne laisse rien dehors.

12. **🟢 Résolubilité de bout en bout.** J'ai re-dérivé les onze identités du
    tableau du contrôle n° 2b et elles se referment toutes ; je n'ai trouvé
    **aucune donnée manquante** ni aucune question incalculable. À
    re-parcourir indépendamment — ce dépôt a déjà trouvé **des défauts dans
    des sujets officiels**, et une re-dérivation qui « marche » chez moi
    n'est pas une re-dérivation faite chez quelqu'un d'autre.

### Ce que je n'ai PAS fait, et qu'il faut savoir

- Je n'ai **pas** ouvert le **corrigé** (`element/94704`). Il n'entre pas dans
  la transcription d'un énoncé, mais il constituerait un **cinquième contrôle
  d'identité** utile (un corrigé qui répond à un autre sujet se verrait).
- Je n'ai **pas** identifié la **police substituée** du glyphe `⊔` — seulement
  décodé le caractère par sa conséquence.
- Je n'ai **pas** transcrit les **exercices 1, 2 et 3** : ils sont en banque,
  et les reconvertir fausserait le /20. Je les ai seulement **lus par OCR**,
  comme instrument de contrôle d'identité du scan.
- Je n'ai **rien écrit d'autre que ce fichier** : aucun `bank.yaml`, aucune
  mise à jour du CENSUS, aucun commit.
