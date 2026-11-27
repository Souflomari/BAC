# Banque de sujets Maths — Conventions

> Comment cette banque d'annales (examen national, 2ème Bac, **Mathématiques**)
> est constituée, transcrite et vérifiée. Deux filières distinctes y coexistent
> et ne se mélangent jamais (voir §0). Lire `INDEX.md` pour l'inventaire des
> sources et la contrainte d'environnement (scans + pipeline JPG→Read).
>
> Structure calquée sur la banque PC (`docs/sujets/pc/`) : même protocole de
> fidélité, même format d'entrée, même protocole de vérification.

---

## 0. Deux filières, jamais fondues

La même matière (Mathématiques) donne **deux épreuves nationales différentes**
selon la filière. On ne fond jamais les deux :

| Filière (maslak) | Code | Durée · coef | Composition type |
|------------------|------|--------------|------------------|
| **Sciences Mathématiques A & B** (شعبة العلوم الرياضية أ و ب) | `NS 24F` | 4 h · coef 9 | 4 exercices : structures algébriques · nombres complexes · arithmétique · analyse (problème) |
| **Sciences Expérimentales** — SVT **et** Sciences Physiques (مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية) | `NS 22F` | 3 h · coef 7 | 3 exercices + 1 problème : géométrie de l'espace · nombres complexes · probabilités · analyse (ln/exp + intégrale + suites) |

Fait notable : **SVT et Sciences Physiques passent le même sujet de maths**
(`NS 22F`) — c'est la filière « Sciences Expérimentales » côté maths. Chaque
entrée porte sa filière et son code sujet en tête, sans ambiguïté.

---

## 1. Principe : fidélité avant tout

Le risque n°1 est la **fidélité de transcription**. Règles dures (identiques PC) :

- **Ne transcrire que ce qu'on lit littéralement** dans l'image de scan rendue.
  Aucune reformulation, aucun « lissage », aucune valeur reconstituée de mémoire.
- **Ne jamais inventer une valeur.** Si un scan (ou une portion) est illisible,
  l'entrée — ou la sous-question — est marquée `illisible — écarté`.
- **Provenance obligatoire** sur chaque entrée : URL `element/<n>` + année +
  session. Pas de provenance ⇒ on n'écrit pas.
- **Figures** (courbes, tableaux de variation, arbres) : décrites textuellement
  (axes, valeurs remarquables lisibles, allure). Toute lecture d'échelle
  incertaine est explicitement signalée (`(lecture d'échelle à confirmer)`).
- Tout en **français**. Math en LaTeX inline `$...$`. Notation transcrite telle
  quelle (indices, exposants, $\wedge$ produit vectoriel, congruences, etc.).

---

## 2. Format d'une entrée

Chaque fichier `docs/sujets/maths/<slug>.md` regroupe 1+ exercices, chacun sous
ce bloc (l'en-tête des 3 premières lignes est **normatif**) :

```markdown
## <année> — session <normale|rattrapage> — Exercice <n>
Source: https://www.alloschool.com/element/<n>
Statut: transcrit (non vérifié)

- Filière / épreuve : <SM (NS 24F, 4 h, coef 9) | SVT+Sc.Physiques (NS 22F, 3 h, coef 7)>
- Code sujet : <NS..F> · Barème de l'exercice : <x points>
- Images lues : <.../course-XXX/upload-YYY/000N-big.jpg, ...>
- Pages du scan : <n° (sur total)>

**Titre de l'exercice.**

<Énoncé transcrit fidèlement : données, sous-questions numérotées avec barème,
description(s) de figure.>
```

Champs :
- **`Source`** = l'URL humaine `element/<n>` (stable, citable). Les chemins
  d'images `-big.jpg` servant à la lecture sont listés dans « Images lues » pour
  que le vérificateur reproduise exactement.
- **`Statut`** ∈ { `transcrit (non vérifié)`, `vérifié`, `illisible — écarté` }.
  Une entrée naît toujours `transcrit (non vérifié)`.
- Conserver **la numérotation d'origine** des questions et le **barème** imprimé
  dans la marge du scan.

---

## 3. Protocole de vérification (un second agent)

Une entrée ne passe à `Statut: vérifié` qu'après **re-fetch indépendant et diff**
par un autre agent que le transcripteur :

1. Ouvrir la `Source` (`element/<n>`), en re-dériver `course-<X>/upload-<Y>` et
   le nombre de pages (ne pas réutiliser aveuglément « Images lues » : les
   re-dériver prouve que la source est toujours celle annoncée).
2. `WebFetch` de chaque page `-big.jpg` → le binaire est sauvegardé localement →
   `Read <chemin-local>` rend l'image.
3. **Diff** caractère par caractère de l'énoncé transcrit vs. l'image : toute
   divergence de **valeur, signe, indice, exposant, borne d'intégrale, barème**
   est bloquante ; vérifier les descriptions de figure (axes, valeurs, allure) ;
   vérifier filière / code sujet / barème sur l'en-tête du scan.
4. Si conforme → `Statut: vérifié` + signature (`Vérifié par <agent> le <date>,
   diff OK`). Sinon → corriger et **laisser en `transcrit (non vérifié)`**.

> Rappel : les *résumés* que `WebFetch` renvoie sur une page `element/` HTML
> peuvent halluciner la filière. **Seule l'image du scan fait foi** (l'en-tête
> arabe + le code `NS..F`).

---

## 4. Correspondance chapitre `content/maths/<slug>` ↔ thème d'examen

Les slugs sont ceux des dossiers sous `content/maths/`. La colonne « thème » est
la correspondance de travail utilisée pour classer les exercices.

| Slug (`content/maths/`) | Filière(s) porteuse(s) | Thème d'examen national |
|-------------------------|------------------------|-------------------------|
| `probabilites-conditionnelles` | SExp (+ SM) | Probabilité conditionnelle, arbre pondéré, variable aléatoire & sa loi |
| `denombrement` | SExp (+ SM) | Probabilité par dénombrement (tirages simultanés, combinaisons) |
| `nombres-complexes-1` | SExp | Complexes : 2nd degré, forme trigo, rotation/translation, cercles |
| `nombres-complexes-2` | SM | Complexes (approfondissement) : équation paramétrée, configurations |
| `structures-algebriques` | SM | Lois de composition, groupes, anneaux, corps, morphismes |
| `arithmetique` | SM | Congruences, Bézout, Gauss, petit théorème de Fermat |
| `geometrie-espace` | SExp | Produit scalaire/vectoriel, plans, sphères, droites |
| `fonction-logarithme` | SExp | Étude de fonction avec $\ln$ (problème d'analyse) |
| `fonction-exponentielle` | SM & SExp | Étude de fonction avec $e^x$ (problème d'analyse) |
| `calcul-integral` | SM & SExp | Primitives, intégration par parties, aires |
| `equations-differentielles` | SExp | Éq. diff. linéaires 2nd ordre à coefficients constants |
| `suites-numeriques` | SM & SExp | Suite récurrente $u_{n+1}=f(u_n)$ (fin de problème) |
| `limites-continuite` | SM & SExp | *(embarqué dans les problèmes d'analyse — pas d'exercice dédié)* |
| `derivabilite-etude-fonctions` | SM & SExp | *(embarqué : dérivées, Rolle, TAF, variations, fonction réciproque)* |

Note de classement (analyse) : un **problème d'analyse** (10–11 pts) recoupe
toujours plusieurs slugs (limites, dérivation, intégrale, suite). Convention :
la transcription complète va sous le slug **dominant** (la fonction étudiée :
`fonction-logarithme` ou `fonction-exponentielle`) et les autres slugs portent un
**cross-list** (pointeur) — voir `calcul-integral.md` et `suites-numeriques.md`.
Convention probabilités : **arbre pondéré / conditionnelle / variable aléatoire**
→ `probabilites-conditionnelles` ; **tirage simultané + combinaisons sans
conditionnement** → `denombrement`.

---

## 5. Fichiers de la banque
- `INDEX.md` — inventaire des sources, contrainte d'environnement, pipeline, couverture.
- `README.md` — ce document.
- `<slug>.md` — transcriptions par chapitre (voir table §4).
