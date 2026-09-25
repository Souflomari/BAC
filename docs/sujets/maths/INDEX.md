# Banque de sujets — Examens nationaux Mathématiques (2ème Bac)

> **Inventaire honnête des sources réellement atteignables** à travers le proxy
> de cet environnement, pour la campagne « sujets de bac maths » qui doit
> alimenter les sommets de leçon sous `content/maths/`.
>
> Deux épreuves distinctes (jamais fondues — voir `README.md` §0) :
> - **Sciences Mathématiques (A & B)**, خيار فرنسية (BIOF) — `NS 24F`, 4 h, coef 9.
> - **Sciences Expérimentales** (SVT **et** Sciences Physiques), خيار فرنسية
>   (BIOF) — `NS 22F`, 3 h, coef 7. *(SVT et Sc. Physiques partagent le même
>   sujet de maths.)*
>
> Statut : **v0.2, passe de vérification adversariale faite (2026-07-12).**
> Quatre examens session normale lus en profondeur (SM 2019 ; SExp 2019, 2022,
> 2023) et 14 exercices/problèmes transcrits couvrant **12 slugs** sur 14
> (voir §4). Les 4 sources ont été **re-fetchées indépendamment** (element →
> course/upload re-dérivé) et diffées caractère-par-caractère contre les scans :
> **13 entrées `vérifié`**, **1 entrée `corrigé`** (fonction-exponentielle 2022
> SExp : description de la figure $(C_g)$ reprise d'après le scan — voir §4).
>
> **Priorité pilote CONFIRMÉE :** l'entrée `probabilites-conditionnelles`
> (2023 SExp N, Ex 3) est sourcée, provenancée, transcrite **et vérifiée
> conforme au scan** (en-tête filière/code confirmé sur page 1) — le pilote de
> conversion maths peut procéder.

---

## 1. Contrainte d'environnement — À LIRE EN PREMIER

Identique à la campagne PC. Deux faits déterminent la stratégie :

1. **Tous les sujets d'examen national marocains atteignables sont des SCANS**
   (images), pas du texte machine. AlloSchool sert **chaque page comme un JPG
   individuel**.
2. **Cet environnement n'a ni `poppler-utils` ni OCR** : `Read` ne peut pas
   rendre une page PDF, et `WebFetch` ne sait pas lire une image. L'extraction de
   texte directe des scans est donc impossible.

### Le pipeline qui fonctionne (et par lequel les transcriptions ont été faites)

```
https://www.alloschool.com/assets/documents/course-<X>/upload-<Y>/0001-big.jpg
                                             upload-<Y>/0002-big.jpg  ...
```

1. `WebFetch` de la page `element/<n>` → récupérer `course-<X>/upload-<Y>` et le
   nombre de pages.
2. `WebFetch` de chaque `...-big.jpg` → le binaire est **sauvegardé localement**
   par l'outil (`Binary content (image/jpeg) also saved to <chemin>`).
3. `Read <chemin-local-du-jpg>` → l'outil **rend l'image** ; un lecteur
   multimodal (Opus) la lit visuellement et transcrit.

Les scans AlloSchool testés sont **nets et parfaitement lisibles** à cette
résolution (`-big.jpg`, ~350–400 Ko/page). Là où un scan serait illisible :
marquer `illisible — écarté`, ne rien inventer.

---

## 2. Sources primaires : AlloSchool — hubs « Examens Nationaux »

Deux hubs distincts (un par filière) :

| Filière | Hub (section) | Couverture | Course des images |
|---------|---------------|-----------|-------------------|
| **Sciences Maths (A & B)** | https://www.alloschool.com/section/4660 | 2010 → 2025 (N + R) | `course-436` |
| **Sciences Exp (SVT + Sc. Physiques)** | https://www.alloschool.com/section/5321 | 2009 → 2024 (N + R) | `course-438` |

Format de toutes : **scanned-PDF + JPG par page** (aucun texte machine).
Watermark éditeur visible sur certains scans — sans incidence : la provenance
citée est l'URL AlloSchool `element/<n>`.

### Index des `element/<n>` — Sujets session **normale** (relevé sur les hubs)

**Sciences Mathématiques (section/4660, `course-436`) — Sujets N :**

| Année | Sujet | Corrigé |
|------:|:-----:|:-------:|
| 2017 | `57970` | `57972` |
| 2018 | `65508` | `65510` |
| 2019 | `68482` | `106425` |
| 2020 | `109635` | `109637` |
| 2021 | `127193` | `136837` |
| 2022 | `136604` | `136841` |
| 2023 | `142490` | `142492` |
| 2024 | `145739` | `145737` |
| 2025 | `145783` | — |

*(Rattrapage disponible aussi : 2019 R `94396`, 2020 R `109639`, 2021 R `127195`,
2022 R `136606`, 2023 R `142494`, 2024 R `145741`, 2025 R `145785`, etc. —
liste complète 2010→2025 sur le hub, non re-listée ici.)*

**Sciences Expérimentales (section/5321, `course-438`) — Sujets N :**

| Année | Sujet | Corrigé |
|------:|:-----:|:-------:|
| 2016 | `94485` | `94490` |
| 2017 | `94525` | `94530` |
| 2018 | `94699` | `94704` |
| 2019 | `68527` | `100965` |
| 2020 | `109797` | `109803` |
| 2021 | `127180` | `136793` |
| 2022 | `136586` | `136803` |
| 2023 | `137482` | `137472` |
| 2024 | `144505` | `144510` |

*(Rattrapage disponible aussi : 2016 R `94502`, 2019 R `106247`, 2020 R `109808`,
2021 R `127185`, 2022 R `136591`, 2023 R `142250`, 2024 R `145811`, etc.)*

### `course/upload-<ID>` déjà résolus (bases d'images vérifiées cette passe)

| Examen | Base d'images | Pages | Code |
|--------|---------------|------:|------|
| **SM 2019 N — Sujet** | `.../course-436/upload-54931/` | 5 | NS 24F |
| **SExp 2019 N — Sujet** | `.../course-438/upload-54971/` | 4 | NS 22F |
| **SExp 2022 N — Sujet** | `.../course-438/upload-84495/` | 4 | NS 22F |
| **SExp 2023 N — Sujet** | `.../course-438/upload-84924/` | 4 | NS 22F |

### Carte des exercices par examen (relevée sur les scans, page 1 « composantes »)

- **SM 2019 N** (NS 24F, 4 h coef 9, 5 p.) : Ex1 = structures algébriques (3,5) ·
  Ex2 = nombres complexes (3,5) · Ex3 = arithmétique (3) · Ex4 = analyse (10,
  fonction $e^{-x}$ + Rolle/TAF + intégrale + suite).
- **SExp 2019 N** (NS 22F, 3 h coef 7, 4 p.) : Ex1 = géométrie de l'espace (3) ·
  Ex2 = nombres complexes (3) · Ex3 = probabilités **par dénombrement** (3) ·
  Problème = fonction $\ln$ + intégrale (IPP) + suite (11).
- **SExp 2022 N** (NS 22F, 3 h coef 7, 4 p.) : Ex1 = géométrie de l'espace (3) ·
  Ex2 = nombres complexes (3) · Ex3 = probabilités **par dénombrement** (3) ·
  Ex4 = équations différentielles + calcul intégral (2,5) · Problème = fonction
  $e^{x/2}$ + suite (8,5).
- **SExp 2023 N** (NS 22F, 3 h coef 7, 4 p.) : Ex1 = géométrie de l'espace (3) ·
  Ex2 = nombres complexes (3) · **Ex3 = probabilités conditionnelles** (arbre
  pondéré, $p(A/B)$, variable aléatoire) (3) · Problème = fonction $\ln$ +
  intégrale (IPP) + suite (11).

> **Distinction critique probabilités.** 2019 N et 2022 N ont un exercice de
> probabilité **combinatoire pure** (urne, tirage simultané, $p(A),p(B)…$) → slug
> `denombrement`. Seul **2023 N** a le format **conditionnel** (mise en jeu
> dépendante entre deux urnes, $p(A/B)$, loi de $X$) → slug
> `probabilites-conditionnelles`. C'est pourquoi le pilote pointe sur 2023.

---

## 3. Ce qui a été transcrit dans cette passe

| Slug | Entrées | Origine |
|------|--------:|---------|
| `probabilites-conditionnelles` | 1 | **2023 SExp N Ex3** (arbre, $p(A/B)$, variable aléatoire $X$) — **pilote** |
| `structures-algebriques` | 1 | 2019 SM N Ex1 (loi interne sur $\mathbb{C}$, groupe, isomorphisme matriciel) |
| `nombres-complexes-2` | 1 | 2019 SM N Ex2 (équation paramétrée, rotation, milieu, $\perp$) |
| `arithmetique` | 1 | 2019 SM N Ex3 (congruences mod 2969 premier, Bézout, Fermat) |
| `nombres-complexes-1` | 3 | 2019 SExp N Ex2 ; 2022 SExp N Ex2 ; 2023 SExp N Ex2 |
| `geometrie-espace` | 3 | 2019 SExp N Ex1 ; 2022 SExp N Ex1 ; 2023 SExp N Ex1 |
| `denombrement` | 2 | 2019 SExp N Ex3 ; 2022 SExp N Ex3 |
| `fonction-logarithme` | 2 | 2019 SExp N Problème ; 2023 SExp N Problème (études complètes) |
| `fonction-exponentielle` | 2 | 2019 SM N Ex4 ; 2022 SExp N Problème |
| `calcul-integral` | 1 (+3 cross-list) | 2022 SExp N Ex4 (primitive + IPP) ; cross-lists 2019/2023 SExp + 2019 SM |
| `equations-differentielles` | 1 | 2022 SExp N Ex4-Q2 ($y''-2y'+y=0$) |
| `suites-numeriques` | 1 (+3 cross-list) | 2019 SM N Ex4 Partie II ; cross-lists 2019/2022/2023 SExp problèmes |

**Total : 14 exercices/problèmes transcrits, couvrant 12 des 14 slugs.**

### Couverture par slug (14 slugs `content/maths/`)

| Slug | Année(s)/session | Statut |
|------|------------------|--------|
| `probabilites-conditionnelles` | 2023 SExp N | **vérifié** (2026-07-12) — **pilote** |
| `denombrement` | 2019, 2022 SExp N | **vérifié** (2026-07-12) |
| `nombres-complexes-1` | 2019, 2022, 2023 SExp N | **vérifié** (2026-07-12) |
| `nombres-complexes-2` | 2019 SM N | **vérifié** (2026-07-12) |
| `structures-algebriques` | 2019 SM N | **vérifié** (2026-07-12) |
| `arithmetique` | 2019 SM N | **vérifié** (2026-07-12) |
| `geometrie-espace` | 2019, 2022, 2023 SExp N | **vérifié** (2026-07-12) |
| `fonction-logarithme` | 2019, 2023 SExp N | **vérifié** (2026-07-12) — figures $f'$/$(C_g)$ confirmées |
| `fonction-exponentielle` | 2019 SM N, 2022 SExp N | 2019 SM **vérifié** ; 2022 SExp **corrigé** (figure $(C_g)$, 2026-07-12) |
| `calcul-integral` | 2022 SExp N (+ cross-lists) | **vérifié** (2026-07-12) |
| `equations-differentielles` | 2022 SExp N | **vérifié** (2026-07-12) |
| `suites-numeriques` | 2019 SM N (+ cross-lists) | **vérifié** (2026-07-12) |
| `limites-continuite` | (embarqué dans problèmes d'analyse) | **cross-list — pas d'exercice dédié** |
| `derivabilite-etude-fonctions` | (embarqué dans problèmes d'analyse) | **cross-list — pas d'exercice dédié** |

---

## 4. Ce qui N'A PAS été atteint / à faire

1. **Vérification — FAITE (2026-07-12).** Passe adversariale exécutée (README
   §3) : les 4 examens ont été re-fetchés indépendamment (les `upload-<ID>`
   re-dérivés depuis `element/<n>` : 68527→54971, 136586→84495, 137482→84924,
   68482→54931 — tous confirmés) et les 14 entrées diffées caractère-par-caractère
   contre les scans, en-têtes filière/code inclus. Résultat : **13 entrées
   conformes → `vérifié`** ; **1 divergence → corrigée** : la description de la
   figure $(C_g)$ de **fonction-exponentielle 2022 SExp** (Q5) inversait le signe
   de $g$ et manquait son second zéro — le scan montre $g$ nulle en $\alpha\approx
   -4,5$ **et** en $0$, positive puis négative sur $]\alpha,0[$ puis positive, ce
   qui est cohérent avec les *deux* points d'inflexion de Q5c ; corrigée d'après le
   scan (entrée en `corrigé`). Les autres figures « lecture d'échelle à confirmer »
   — tableau de variation de $f'$ 2023 et courbe $(C_g)$ 2023 SExp — ont été
   **confrontées au scan et trouvées fidèles**. (Restent hors périmètre de cette
   passe : confrontation aux *corrigés* pour les valeurs-réponses, item 5.)
2. **`limites-continuite` et `derivabilite-etude-fonctions` sans entrée dédiée.**
   Ils sont partout dans les problèmes d'analyse mais jamais isolés. Décider :
   soit cross-list assumé (état actuel), soit chercher un exercice court dédié
   (ex. continuité/TVI, ou étude de dérivabilité en un point) dans d'autres
   années.
3. **Étoffer les slugs SM.** Un seul examen SM (2019) lu. Ajouter d'autres années
   SM (2017, 2018, 2020–2023 ; `upload-<ID>` non encore résolus) pour varier
   arithmétique, structures algébriques et complexes SM. La probabilité existe
   aussi dans le programme SM récent — vérifier si les sujets SM 2020+ contiennent
   un exercice de probabilité conditionnelle (renforcerait le pilote).
4. **Sessions rattrapage.** Non explorées cette passe — souvent d'autres
   configurations (utile pour la diversité d'items).
5. **Corrigés.** Non transcrits (scans aussi, même pipeline JPG requis).
   Nécessaires pour les valeurs-réponses et pour confirmer les lectures de figure.

---

## 5. Prochaine passe recommandée
1. ~~**Vérification adversariale** des 14 entrées~~ — **FAITE le 2026-07-12**
   (voir §4.1 ; 13 `vérifié`, 1 `corrigé`). Reste conseillé : re-vérifier
   indépendamment le *texte corrigé* de la figure $(C_g)$ 2022 SExp (un correctif
   devrait être re-lu par un tiers, README §3).
2. **Résoudre les `upload-<ID>`** des examens SM 2017–2023 et SExp 2016–2021/2024
   (fetch `element/<n>`), lire les pages « composantes » puis les exercices
   ciblant les slugs faibles (`limites-continuite`, `derivabilite-etude-fonctions`,
   plus de probabilité conditionnelle SExp 2020/2021/2024).
3. **Confronter aux corrigés** les valeurs de figure marquées « à confirmer ».
