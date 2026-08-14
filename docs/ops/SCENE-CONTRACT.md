# Le contrat de scène — explication animée (lane 2, ADR 0028)

> **Ce document est la loi pour quiconque écrit une scène Manim de ce
> dépôt — agent Google, agent Claude, ou humain.** Il a été extrait
> mot pour mot des consignes qui ont produit les 14 scènes validées de
> la campagne : chaque règle ci-dessous est née d'un défaut RÉEL trouvé
> par un audit image par image. Ce ne sont pas des préférences.
>
> Un bon de travail (`work-orders/*.md`) ne répète jamais ces règles :
> il dit « respecte le contrat » et n'ajoute que ce qui est propre à
> l'exercice traité.
>
> Version 1 — 2026-08-12. Toute modification passe par un bon de
> travail dédié et une entrée d'ADR : le contrat ne se change pas en
> passant, et surtout jamais pour faire passer une scène récalcitrante.

---

## 0. Ce qu'on fabrique

Pour une entrée de banque vérifiée (`content/<matière>/<notion>/bank.yaml`),
une scène `class Explication(BacScene)` dans
`animations/scenes/<matière>/<notion>/<id-de-l-entrée>.py`, qui explique
l'exercice **pas à pas, sans jamais rien sauter**, à un élève de 2ᵉ bac
qui a peur des maths.

Le rendu `--save_sections` découpe la vidéo en un clip par étape : c'est
la source du futur lecteur cliquable. **Une étape = un geste = un clic.**

La banque est la **source de vérité unique**. Chaque nombre, chaque
formule, chaque question, chaque barème vient d'elle, chiffre pour
chiffre. On ne « corrige » jamais la banque depuis une scène : si elle
semble fausse, on s'arrête et on le signale dans le bon de travail.

---

## 1. Le standard v4 — non négociable

### 1.1 La règle du zéro implicite
**Chaque geste algébrique est sa propre `etape()`** : ce qu'on fait,
pourquoi on le fait, et le calcul chiffre par chiffre. Aucun « donc »
qui saute une ligne. Si un élève peut demander « mais comment on passe
de là à là ? », il manque une étape.

### 1.2 La légende parlée
Chaque `etape()` reçoit une `legende()` en français de registre ORAL —
comme un professeur qui parle, pas comme un manuel. **≤ 3 lignes,
≤ ~60 caractères par ligne.** Les symboles se disent en toutes lettres
dans les légendes (« deux i m », « racine de x ») ; les formules exactes
restent en `MathTex`.

### 1.3 Le sens AVANT le calcul
On montre ce que la chose SIGNIFIE avant de la calculer. Table des
gestes de sens déjà validés :

| Objet | Le geste qui le fait comprendre |
|---|---|
| module | le segment-distance tracé (or) |
| argument | l'arc d'angle depuis l'axe réel positif |
| conjugué | la réflexion, miroir sur l'axe réel |
| rotation | multiplication par e^{iθ} + arc de trajectoire + **angle dessiné** |
| translation | le vecteur recopié au point, qui glisse sur son rail |
| Δ (discriminant) | le tableau-détecteur des trois cas |
| terme d'une suite | un point qui avance sur une droite graduée |
| majorant / minorant | une barrière verticale pointillée, étiquetée |
| convergence | les points qui s'entassent + un marqueur de limite distinct |
| suite auxiliaire | sa PROPRE droite, autre couleur, sauts ×q fléchés |
| limite d'une fonction | l'asymptote pointillée tracée À L'INSTANT du calcul, + recoloration de la courbe |
| domaine (ln, racine) | la frontière pointillée que la courbe longe ou où elle s'arrête |
| continuité en un point | le point marqué, la courbe qui passe sans lever le crayon |
| trou comblable (0/0) | cercle CREUX au trou → point PLEIN quand la valeur est prouvée |
| TVI / corollaire | f(a) et f(b) en points de signes opposés + crochets d'intervalle + le croisement |
| unicité (stricte monotonie) | son propre geste : la courbe ne traverse qu'une fois |
| intégrale | l'aire ombrée sous la courbe, avant tout calcul |
| tableau de variations | construit dans la zone figure ; la courbe le confirme |

**Règle d'or : montre ce que tu dis.** Si la légende dit « angle », un
angle doit être dessiné à cet instant. Si elle dit « on translate », le
vecteur doit bouger.

### 1.4 Le signalement DANS les formules
`entoure()` et `fleche_vers()` pour désigner un coefficient dans une
équation. Couleurs sémantiques : a = `COL_A_EQ` (teal), b = `COL_B_EQ`
(or), c = `COL_C_EQ` (vert). **`BAC_ERROR` (rouge) est RÉSERVÉ aux
pièges et aux avertissements** — jamais décoratif.

### 1.5 Les pièges
Chaque piège classique du bac reçoit **sa propre étape rouge**. Non
négociable pour les familles suivantes :
- **complexes** : le signe de b dans −2(...), la racine de Δ quand Δ est
  déjà un carré, l'ordre des vecteurs dans un quotient d'affixes ;
- **suites** : récurrence = initialisation ET hérédité, |q| < 1 écrit
  AVANT q^n → 0, raison ≠ premier terme, le sens de variation se PROUVE
  par un signe (jamais « ça se voit »), monotonie appliquée hors de
  l'intervalle où elle a été établie ;
- **fonctions** : forme indéterminée NOMMÉE avant d'être levée, le
  domaine du ln vérifié et pas supposé, (uv)′ = u′v + uv′ en entier,
  (u/v)′ n'est pas u′/v′, le facteur ½ de la dérivée composée, les
  croissances comparées NOMMÉES (jamais « on voit que »), le corollaire
  du TVI qui exige continuité ET signes opposés.

### 1.6 Les graduations numériques *(exigence owner, 2026-08-12)*
**Chaque `Axes` porte des nombres.** Un petit jeu lisible — au plus ~6
par axe — en petite taille (≈ 18), encre douce, du côté libre, jamais
en collision avec une étiquette existante. Les repères exacts (e, e²,
ln 3, fractions) gardent leur étiquette `MathTex` exacte ; les
graduations n'ajoutent que des entiers simples pour donner l'échelle.
Helper de référence : `self.graduations(axes, x_vals, y_vals)` (méthode
de `BacScene`, retourne le `VGroup` des nombres pour l'intégrer à la figure).

### 1.7 La clôture
Toute scène finit par une carte « Ce qu'il faut retenir » (les points de
méthode, pas le corrigé), `pose(5.0)`, `FadeOut(bilan)`, puis retrait du
badge d'étape. Voir `chapitre_fin` de n'importe quelle scène validée.

---

## 2. Les règles de mise en écran — chacune est un défaut vécu

### 2.1 Discipline de nettoyage — **les deux bugs structurels de la campagne**

**(a) `ardoise()` NE NETTOIE PAS.** Elle réinitialise le registre
`self._lignes = []` sans rien effacer à l'écran. Donc : **tout chapitre
dont le suivant appelle `ardoise()` DOIT se terminer par
`self.nettoie()`.** Sinon sa dernière ligne reste affichée pour le
restant de la scène et surimprime tout (défaut réel : la question
« Construire (Δ) et (C) » de bk-2019 est restée à l'écran de l'étape 61
à l'étape 93).

**(b) Un `FadeOut(fig["group"])` n'efface que ce que le groupe contient
À L'INSTANT du fondu.** Un point, une étiquette ou une flèche ajoutés à
la figure après la construction du groupe deviennent des orphelins qui
flottent pour toujours (défaut réel : dots, étiquettes et une flèche
survivants aux étapes 61-71 ; la droite (Δ) traversant le tableau de
variations aux étapes 39-41).
**Le remède structurel** : ne jamais muter un `VGroup` figé — ranger
chaque mobject sous sa propre clé dans le dictionnaire `fig`, et
reconstruire le groupe à la volée au moment du fondu via le helper
monté dans `bac_scene.py` (`_fig_membres(fig)` ou `self.fig_membres(fig)`) :
```python
def _fig_membres(fig: dict) -> VGroup:
    return VGroup(*[v for k, v in fig.items() if k != "group"])
```

### 2.2 Étiquettes
- Sur le côté **LIBRE** de leur point : jamais sur un axe, jamais sur un
  segment ou une courbe, jamais sur une autre étiquette.
- Un point bas reçoit une étiquette **latérale** (gauche/droite), jamais
  vers le bas dans la bande des légendes.
- Une étiquette de segment ou de vecteur ne s'ancre pas au milieu si ce
  milieu tombe sur un axe : ancrer à `point_from_proportion(0.7)`.
- Étiquettes d'axes **à l'intérieur** de la figure, au bout **libre**,
  jamais contre le label O ; « axe imaginaire » toujours à DROITE de
  l'axe.

### 2.3 Géométrie
- `Angle(l1, l2, other_angle=False)` : l'ORDRE des opérandes choisit le
  secteur non réflexe — le vérifier sur les directions réelles, et
  l'INVERSER pour un angle de rotation négatif.
- Étiquette d'angle : `ang.point_from_proportion(p)` poussée vers
  l'extérieur de 0,32 à 0,36. **Piège de la bissectrice** : si la
  direction depuis le sommet pointe sur un repère (un point, une
  étiquette), prendre p = 0,25 ou 0,75 au lieu de 0,5.
- `ArcBetweenPoints(A, B, angle=PI/2)` sur une corde **gauche→droite**
  bombe vers le BAS. Pour bomber vers le haut : `angle=-PI/2`.
- Une courbe ne se trace **jamais en un seul appel à travers une
  asymptote verticale** : une branche par appel.
- **Le repère doit être ISOTROPE (même échelle en x et en y) dès qu'une
  figure illustre un CERCLE ou un ANGLE DROIT** — un `Axes(x_range=…,
  y_range=…, x_length=…, y_length=…)` où
  `x_length / (x_range[1]-x_range[0])` ≠ `y_length / (y_range[1]-y_range[0])`
  déforme silencieusement la géométrie à l'écran : un cercle construit
  en espace-écran à partir de deux points déjà projetés via `axes.c2p()`
  reste un vrai cercle À L'ÉCRAN, mais un TROISIÈME point projeté par le
  même `axes.c2p()`, mathématiquement cocyclique dans l'espace de
  données, **atterrit visiblement hors du cercle** — le dessin
  contredit alors la preuve qu'il illustre. Défaut RÉEL trouvé le
  2026-08-14 (`nombres-complexes-2/bk-2025-n-x2.py`, question de
  cocyclicité K/I/H/J : écart de 36,9 % entre le rayon écran et la
  distance H-centre, alors que le produit scalaire en espace de données
  valait ≈0). **Avant de construire tout `Circle(...)` ou tout angle
  droit dessiné (`RightAngle`, `Angle`) à partir de points passés par
  `axes.c2p()`, vérifie `x_length/(x_span) == y_length/(y_span)`** — au
  besoin, ajuste `x_length` ou `y_length` (jamais les `range`, qui
  suivent les valeurs de l'énoncé) pour égaliser les deux échelles,
  quitte à ce que la figure ne remplisse pas tout son cadre.

### 2.4 Zones
- La colonne de travail (ardoise) à GAUCHE, la figure à DROITE.
- La bande des légendes monte jusqu'à y ≈ −2,4 : **aucune étiquette de
  figure sous y ≈ −1,9**. Ne pas descendre un `ComplexPlane` plus bas
  que ~0,15·DOWN quand des légendes de trois lignes sont utilisées.
- `nettoie()` avant de construire une carte `epingle()` (la carte occupe
  le haut de la colonne ; une ligne déjà écrite là entrerait dedans).
- Les éléments de démonstration (arcs, vecteurs, marques d'angle) sont
  fondus à la fin de leur chapitre.

### 2.5 Typographie
- Ne jamais couper une chaîne `MathTex` au milieu d'un `\dfrac` ni à un
  endroit où les accolades se déséquilibrent.
- `Text()` n'interprète PAS le LaTeX : dans une légende, écrire
  « e puissance 1,5 », pas `e^{3/2}`.
- Tailles : ≤ ~28 pour les lignes longues, 20–22 pour les chaînes très
  longues. **16 est le plancher absolu de lisibilité.**
- `ecrit()` réduit d'office ce qui dépasse `LARGEUR_MAX` — mais viser
  une taille qui ne déclenche pas la réduction.

---

## 3. Les règles de procédure

- **Écriture INCRÉMENTALE : jamais plus de ~120 lignes par appel
  d'écriture.** D'abord l'en-tête + les imports + les constantes, puis
  un chapitre par appel. (Un agent est mort en tentant d'émettre un
  fichier entier.)
- En-tête de module en français : entrée de banque, année, points,
  provenance vérifiée, et la liste des gestes de sens de la scène.
- **Aucun identifiant de modèle** nulle part dans le dépôt hors
  `.claude/agents/*.md`.
- Rythme calme : `pose()` entre 2,6 et 4,4.
- Constantes numériques en tête de module, avec le commentaire citant la
  banque. **Assertions numériques bienvenues** (différences finies pour
  les dérivées, `np.trapezoid` — **jamais `np.trapz`**, supprimé en
  numpy 2 — pour les intégrales) : elles échouent au chargement, donc
  avant le rendu.
- Une valeur calculée au-delà du barème (pour tracer, pour illustrer)
  est **signalée dans la légende** comme illustration, jamais présentée
  comme une donnée de l'énoncé. Un paramètre laissé symbolique par
  l'énoncé garde UNE valeur d'illustration, annoncée à l'écran :
  « Illustration : … (un choix, pas une donnée) ».
- Un `bandeau_question()` par question, fondu dans le nettoyage de fin
  de chapitre.
- Le `manifest.yaml` n'est passé à `validé` **qu'après** l'audit complet.

---

## 4. Les portes de vérification (dans l'ordre)

Une scène n'est pas finie tant que les six portes ne sont pas passées.
Le bon de travail exige le **collage de la sortie réelle** de chaque
commande — pas une affirmation.

| # | Porte | Commande | Critère |
|---|---|---|---|
| 0 | Le module se charge, assertions comprises | `python -c "import importlib.util,sys; …"` | aucune exception |
| 1 | Lint de scène | `python scripts/scene-lint.py <fichier>` | 0 erreur |
| 2 | Rendu brouillon | `cd animations && manim render <f> Explication -ql --media_dir media/<matière>-<notion> --save_sections` | pas d'erreur ; nb de sections == nb d'`etape()` |
| 3 | **Audit image par image** | extraire la dernière image de CHAQUE section, monter des planches-contact 2×2, **les REGARDER toutes** | zéro chevauchement, zéro orphelin, zéro étiquette sur un trait, zéro débordement |
| 4 | Fidélité à la banque | `python scripts/bank-fidelity.py <bank> <id> <fichier>` | tous les nombres de la banque présents |
| 5 | Rendu final + statut | rendu `-qm`, puis `statut: validé` dans le manifeste, puis commit | vidéo + sections écrites |

### Le protocole d'audit (porte 3), en commandes
```bash
S=/tmp/audit; D=animations/media/<matière>-<notion>/videos/<id>/480p15/sections
mkdir -p $S; i=0
for f in $(ls $D/*.mp4 | sort); do i=$((i+1));
  ffmpeg -sseof -0.15 -i "$f" -frames:v 1 -y $S/f$(printf %02d $i).png -loglevel error; done
# planches 2×2 :
ffmpeg -i $S/f01.png -i $S/f02.png -i $S/f03.png -i $S/f04.png \
  -filter_complex "[0][1]hstack[t];[2][3]hstack[b];[t][b]vstack" -y $S/sheet1.png -loglevel error
```
Un geste transitoire (un arc qui se trace, une transformation) n'est pas
visible sur la dernière image : pour ces étapes-là, extraire une image
**au milieu** de la section (`-ss $(duration*0.5)`).

**L'audit est le cœur du métier.** Les 14 scènes validées ont coûté
~20 défauts trouvés à l'œil, dont aucun n'était détectable autrement.

---

## 5. Les scènes de référence (à imiter, jamais à copier bêtement)

| Besoin | Modèle validé |
|---|---|
| structure générale, chapitres, carte épinglée | `maths/nombres-complexes-1/bk-2023-n-x2.py` |
| plan complexe, rotations, angles dessinés | `maths/nombres-complexes-1/bk-2022-n-x2.py` |
| suites : droite graduée, barrières, entassement | `maths/suites-numeriques/bk-2020-n-x1.py` |
| suites : suite auxiliaire, arcs ×q, gendarmes | `maths/suites-numeriques/bk-2021-n-x2.py` |
| courbes : Axes, asymptote au bon moment, aires | `maths/limites-continuite/bk-2020-n-x3.py` |
| TVI, trou comblable, crochets d'intervalle | `maths/limites-continuite/bk-2021-n-x1.py` |
| très long problème, tableau de variations, toile d'araignée | `maths/fonction-logarithme/bk-2019-n-x4.py` |

---

## 6. Ce qu'un agent n'a PAS le droit de faire

- Modifier `animations/bac_scene.py`, `bac_style.py`, ce contrat, ou une
  scène déjà `validé` — **sauf bon de travail explicite le demandant**.
  (Un garde structurel qui manque se DEMANDE ; il ne s'improvise pas au
  milieu d'une scène.)
- Modifier `content/**/bank.yaml` : la banque est vérifiée en amont. Une
  incohérence se signale, elle ne se corrige pas.
- Toucher à un fichier hors du périmètre de son bon de travail.
- Marquer `validé` sans avoir collé la sortie des six portes.
- Toucher aux migrations, à Supabase, ou à quoi que ce soit de
  production : **poussées de production humaines, toujours** (voir
  `.claude/CLAUDE.md`).
