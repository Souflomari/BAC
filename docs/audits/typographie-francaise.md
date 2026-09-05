# La typographie française, hors de la prose

*Mesuré et corrigé le 2026-09-05. Instrument : `web/scripts/typo-francaise.mjs`.
Corpus : 62 leçons + 7 pages hors leçon — 69 pages.*

---

## L'angle mort

Le français met une espace insécable fine (U+202F) devant `;`, `:`, `!`, `?`
et à l'intérieur des guillemets, et il écrit l'apostrophe `’`. Sans cela une
ligne peut commencer par « : », ce qu'aucun livre scolaire ne fait, et
l'apostrophe droite signe un texte non relu.

`remarkFrenchTypography` normalise la **prose** des leçons. Il ne voyait rien
de tout le reste — et le reste est visible.

Le symptôme, sur `rlc-serie` : le corps de la leçon écrivait « le pendule
**d’énergie** » et le rail des chapitres, **à trois centimètres**, « le
pendule **d'énergie** ». Deux apostrophes différentes pour le même titre, sur
le même écran.

## Ce qui a été trouvé

| Surface | Écarts | Corrigé à la source |
|---|---:|---|
| Texte des **figures** (SVG) | **947** dans 265 fichiers | `scripts/typo-figures.py` (passe unique, invariants vérifiés) |
| `\text{…}` des **formules** | **105** dans 35 fichiers | `scripts/typo-math.py` |
| **Titres de chapitre** (rail, pager, ancres) | tous | `lib/chapters.ts` — la source unique que le rail ET la page lisent |
| **Titres de leçon**, d'exercice, de banque | tous | `lib/content.ts` (`extractTitle`, titres d'exercice et de banque) |
| **Libellés du programme** (matières, blurbs) | 23 | `lib/curriculum.ts`, `lib/subjects.ts` |
| Légendes de **mouvement**, intitulés de partie, sous-titres de carte, titres de dérivation | ~30 | `frenchTypography(…)` au rendu |
| L'entrée synthétique « S’entraîner » | 2 | écrite en dur dans `MarginRail` |

**Résultat : 69 pages, zéro écart.** La porte est armée en CI.

---

## Les quatre pièges, et ils valent plus que le décompte

### 1. Une entité XML se termine par `;`

`t&#183;u` (un point médian) finit par un `;` **précédé d'un chiffre**. La
règle de la ponctuation haute y a vu « 3 ; » et a écrit `t&#183 ;u` : entité
coupée, SVG qui ne parse plus. **Huit figures cassées d'un coup.**

La passe masque désormais toute entité avant de toucher au texte — et elle
porte deux **invariants** qu'une passe typographique n'a pas le droit de
violer : *le multiensemble des entités* et *la suite des balises* doivent
être identiques avant et après. Ils tiennent même pour les **234 figures du
corpus qui n'ont jamais parsé au sens strict** (entités HTML non déclarées),
là où un simple contrôle de parsabilité serait aveugle. Le garde a été mis à
l'épreuve : en désactivant le masquage, la passe refuse le fichier.

### 2. KaTeX ne connaît pas l'insécable fine

Poser U+202F dans un `\text{…}` produit « Unrecognized Unicode character
(8239) » et « No character metrics ». U+00A0 aussi. **Dans une formule, la
fine s'écrit `\,`** — c'est la façon dont LaTeX l'écrit depuis toujours.
Vérifié avant d'éditer une seule ligne, pas après.

### 3. Le balisage coupe les mots en deux

`<text>Ω<tspan> : 9 boules</tspan></text>` sépare « Ω » et « : 9 boules » : la
règle, qui veut voir un mot AVANT, ne mord dans aucun des deux morceaux. Même
histoire quand la lettre est écrite en entité (`&#x3A9;`). Deux rattrapages —
la frontière de segment, et la sentinelle d'entité comptée comme fin de mot —
et les derniers cas tombent.

### 4. Le correctif d'un correctif peut casser plus que le défaut

Une réécriture large des littéraux de `curriculum.ts` a inséré une insécable
fine dans une classe utilitaire : `hover:underline` est devenu
`hover :underline`. La réparation, elle, a fait pire : en retirant U+202F de
toute chaîne « qui ressemble à une classe », elle a **vidé la constante
`NNBSP` de `frenchTypography.ts`** — c'est-à-dire désactivé silencieusement
le normalisateur de tout le produit. Rattrapé au `git diff`, avant tout
commit.

> **La règle : une passe automatique se relit sur le diff, pas sur son
> décompte.** Et un contrôle a été ajouté : aucun fichier source ne doit
> PERDRE d'insécables fines par rapport à `HEAD`.

---

## Ce que la mesure ne dit pas

- **Le point d'exclamation** est laissé tranquille, dans les figures comme
  dans les formules : en français il prend une fine, mais `n!` est une
  factorielle, et le corpus de dénombrement en est plein. Angle mort
  **assumé**, écrit dans les deux scripts pour que personne ne le
  « corrige » sans y penser.
- **Les guillemets droits** (`"…"`) restent hors de cette passe : le
  normalisateur de prose sait les convertir, les scripts de figures non.
  Zéro cas au rendu aujourd'hui.
- **Les commentaires XML** des figures gardent leur typographie d'origine :
  ils portent le raisonnement de l'auteur, pas du texte rendu.
