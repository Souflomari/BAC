# LESSON-EXPERIENCE-SPEC — v2 : pagination, figures par étapes, largeur composée

**Statut :** OWNER-DIRECTED (Day 11) — la direction est décidée par le
propriétaire ; les choix d'implémentation marqués `[LEDGER]` sont consignés
dans `docs/audits/fable-day3-ledger.md` §11 avec le statut habituel
FABLE-DECIDED / OWNER-REVIEW-PENDING.
**Rôle de ce document :** contrat d'implémentation complet. Si la fenêtre de
travail se ferme en cours de build, un modèle froid (Opus/Sonnet) doit pouvoir
finir à partir d'ici seul. Chaque section donne : le contrat, les fichiers à
toucher (avec ancres), et les critères de vérification.

---

## 0. Ce qui change, en une phrase chacun

1. **Pagination** — une leçon cesse d'être une longue page : chaque section
   du rail devient une *vue de chapitre*, une seule à l'écran, avec un
   mouvement calme entre elles. (Réalise DESIGN-BIBLE §7 : « one idea or one
   task per screen/step » — `docs/product/DESIGN-BIBLE.md:345-348`.)
2. **StagedFigure** — la grammaire des beats (MotionStage) est généralisée
   aux SVG statiques : les figures se révèlent étape par étape, au rythme de
   l'élève, jamais tout d'un coup pour les graphes.
3. **Largeur composée** — la prose garde 65ch ; à gauche le rail devient le
   navigateur de chapitres ; à droite naît la zone « à retenir » (formule/
   définition clé du chapitre courant) avec des emplacements de notes de
   marge à ≥1536px. Le motif de couverture M1 habite le masthead.
   **Ceci clôt la revue M/W laissée ouverte au Day-8** (ledger §9,
   `docs/audits/fable-day3-ledger.md:554`) : adoption = M1 + (W3 adapté) +
   W1-aux-emplacements. `[LEDGER]`

Non-négociables transverses : RULES.md tient (branche seulement, aucun push
production) ; calme partout (pas de parallaxe, pas de théâtre) ; §13 pour
tout langage de déploiement ; le SVT n'est pas touché.

---

## 1. Le modèle de chapitre

### 1.1 Découpage

- Un **chapitre** = une section `## ` de `lesson.md`. Pour 60/61 leçons cela
  coïncide exactement avec les rungs `## R<n> — Titre` (census : scout D11 ;
  la seule exception est `content/maths/probabilites-conditionnelles/lesson.md`
  qui porte des `##` non-rung — elle se paginera correctement sur ses `##`
  existants, et une normalisation de contenu vers `## R<n>` est inscrite à la
  table de migration comme `pending`). `[LEDGER]`
- Le contenu avant le premier `## ` (rare : le H1 est déjà strippé par
  `stripLeadingTitle`, `web/src/lib/content.ts:265-274`) est fusionné dans le
  premier chapitre.
- **Items en ligne, par chapitre (amendement 2026-07, « question generator »).**
  Les items diagnostiques `items.yaml` ne vivent plus dans un chapitre
  synthétique final unique : chaque item est regroupé par son `rung` et rendu
  **à la fin du chapitre correspondant**, via `ChapterQuestions` (bloc « Vérifie
  ta compréhension », en aval de la prose et des figures du chapitre). Il n'y a
  donc **plus** de chapitre synthétique « S'entraîner » ni d'`ItemsSection` de
  fin de leçon ; `totalChapters = realChapters`, et `LessonEnd` clôt le dernier
  chapitre réel (`NotionBody`, `hasTrailingChapter=false`).
  - Regroupement : `NotionPageView` construit `itemsByRung` (`rung → items`),
    en excluant les items déjà clonés en checkpoints inline (`item_source:
    clone_of_<id>`) pour que la même question n'apparaisse jamais deux fois.
  - Filet anti-perte : les items dont le `rung` ne correspond à aucun titre
    `## R<n>` (p. ex. l'exception à titres non-rung) sont rassemblés dans le
    dernier chapitre — aucun item authored n'est perdu.
  - Bible : §0/§7 (coda de pratique calme, pas de théâtre), §11 (le code de
    rung n'est JAMAIS affiché — le titre du bloc est générique). Le `McqItem`
    partagé porte le feedback immédiat par choix (source unique).

### 1.2 Où le découpage se calcule

`NotionBody.splitIntoSegments` (`web/src/components/notion/NotionBody.tsx:205-238`)
reste la première passe (marqueurs). Une seconde passe **chapterize** :

- re-découpe chaque segment `prose` aux lignes `^##\s` (le split marqueur est
  aveugle aux titres — fait vérifié, il faut donc re-splitter la prose) ;
- attribue à CHAQUE segment un `chapterIndex` ;
- **le compteur d'occurrences des figures répétées reste GLOBAL au document**
  (ordre d'auteur), calculé avant tout découpage — sinon `regimes-uc`
  (placements aux R0/R6/R8 de rlc-serie) casse. C'est le piège n°1 pour un
  repreneur froid.

Sortie serveur : `chapters: Array<{ index, railLabel, headingId, minutes,
segments }>` — `minutes` = mots du chapitre / 180, min 1 (même règle que
`readingMinutesOf`, `web/src/lib/content.ts:311-319`).

### 1.3 La coquille client — `ChapterShell`

Nouveau composant client `web/src/components/notion/ChapterShell.tsx` :

- **Tous les chapitres sont rendus dans le DOM** (SSG intact, impression
  intacte, ancres résolubles). Les non-actifs portent `hidden` +
  `data-chapter-active="false"`. C'est un choix DÉLIBÉRÉMENT différent du
  contrat StagedFigure (§2.5) : un chapitre non lu n'est pas un spoiler
  pédagogique ; une étape de lecture de graphe l'est. `[LEDGER]`
- **Mouvement** (bible §5) : à l'activation, la vue entrante glisse+fond
  ~300ms, direction-aware (avancer = entre depuis la droite ; reculer =
  depuis la gauche). Implémentation : classes utilitaires sur la vue active,
  `transform: translateX(±16px) → 0` + `opacity: 0 → 1`,
  `transition: 300ms cubic-bezier(0,0,0.2,1)` (l'ease `enter` de
  `web/tailwind.config.ts:162-188`). Nouveau token
  `--duration-view: 300ms` dans `globals.css:91-93` à côté de
  `--duration-standard`. Pas de parallaxe, pas d'animation de sortie
  élaborée (l'ancienne vue disparaît instantanément — un seul mouvement à
  l'écran). `prefers-reduced-motion` : échange instantané (le filet global
  0.01ms de `globals.css:323-332` couvre déjà, mais la classe d'entrée est
  aussi retirée sous `motion-reduce:`). `[LEDGER]`
- **URL adressable** : `?chapitre=<n>` (1-based). `[LEDGER — choix contre le
  segment de chemin :]` le segment multiplierait les pages SSG et casserait
  la vue imprimée unique ; le query param garde UNE page statique, l'état est
  lu au montage (`window.location.search`) et écrit via
  `history.pushState` ; `popstate` est écouté (retour/avant navigateur
  respectés). Un deep-link `#<heading-id>` (ids `rehype-slug`,
  `LessonRenderer.tsx:135`) est résolu au montage : la coquille active le
  chapitre contenant cette ancre puis laisse le navigateur scroller.
- **Clavier** : `keydown` global sur la coquille — `ArrowRight`/`ArrowLeft`
  = chapitre suivant/précédent. Ignoré si `event.target` est dans
  `input, textarea, select, [contenteditable]` ou si un modificateur est
  tenu. (Première écoute clavier du codebase — fait vérifié : aucun
  `keydown` n'existe dans `web/src` aujourd'hui.)
- **Affordance de position** : près du rail, texte calme `Chapitre 3 / 10`
  (`text-body-sm`, `--color-text-secondary`). Pas de barre de progression,
  pas de pourcentage, rien de gamifié. Sur mobile (<600px, où le rail est
  `display:none` — `globals.css:764-788`) la même ligne s'affiche au-dessus
  du contenu.
- **Prev/next en fin de chapitre** : deux `TransportButton`
  (`web/src/components/notion/TransportButton.tsx:24-50`) — « Chapitre
  précédent » / « Chapitre suivant » (dernier chapitre : pas de suivant ;
  LessonEnd assure la sortie). Grammaire visuelle identique à
  MotionStage/Derivation — une seule langue de transport dans le produit.
- **Temps de lecture** : le masthead garde le total (`MastheadMeta`,
  `NotionPageView.tsx:61-76`) ; chaque vue de chapitre affiche son
  `~N min` propre à côté du titre de chapitre.
- **Focus** : à l'activation d'un chapitre, focus programmatique sur le
  heading du chapitre (`tabIndex={-1}` + `.focus({preventScroll:false})`) —
  lecteurs d'écran et clavier atterrissent au bon endroit.

### 1.4 Le rail devient navigateur

`MarginRail` (`web/src/components/notion/MarginRail.tsx`) :

- Les entrées restent dérivées des `## ` (élargi depuis « rungs seulement »
  pour couvrir l'exception ; le label court garde `shortTitleOf`,
  `MarginRail.tsx:53-56`).
- Le scroll-spy rAF (`MarginRail.tsx:118-147`) devient inutile en mode
  paginé : l'actif = chapitre courant, poussé par `ChapterShell` (prop ou
  contexte). Le code spy est retiré du chemin paginé (pas supprimé du
  dépôt : la vue imprimée/linéaire ne l'utilise pas non plus — il meurt).
- Clic = activation de chapitre (callback), plus un saut d'ancre natif.
- Visuel : chapitre courant accentué (dot + label pleine encre), lus =
  calmes (spine accent/40 existant), non-lus = neutres. Mêmes classes
  qu'aujourd'hui (`MarginRail.tsx:176-306`), sémantique d'état changée.
- Plus d'entrée synthétique « S'entraîner » (amendement items-en-ligne, §1.1) :
  le rail dérive uniquement des `## ` réels ; `MarginRail` reçoit
  `hasItems={false}`, les questions vivant désormais dans leur chapitre.

### 1.5 Impression

- `@media print` (`globals.css:280-320`) : les vues de chapitre perdent
  `hidden`/`display:none` (`.chapter-view { display: block !important }`),
  les contrôles de transport et l'affordance de position sont masqués —
  la leçon s'imprime linéairement, entière. Les élèves impriment : c'est un
  invariant, pas un nice-to-have.
- Les StagedFigures s'impriment COMPLÈTES via `beforeprint` (voir §2.6).

---

## 2. StagedFigure — le contrat

### 2.1 Grammaire

Généralisation du modèle beats aux SVG statiques. Une figure staged se
révèle en étapes ; l'élève avance ; l'étape courante est pleine, les
antérieures restent visibles mais calmes.

### 2.2 Déclaration — sidecar `.stages.json`

Nouveau fichier optionnel à côté du SVG :
`content/<matière>/<slug-leçon>/media/<slug-figure>.stages.json`

```json
{
  "slug": "regimes-uc",
  "stages": [
    { "caption": "Les axes : u_C en fonction du temps, l'échelle fixée." },
    { "caption": "Le régime pseudo-périodique se trace." },
    { "caption": "La lecture : la pseudo-période sur les crêtes." }
  ]
}
```

- `stages.length` DOIT égaler le plus grand `id="step-N"` du SVG (les
  groupes gardent la convention `step-N` existante — pas de churn sur les 4
  figures déjà groupées). La caption de l'étape N s'affiche sous la figure
  (même emplacement que `stepCaption` aujourd'hui,
  `MediaDiagram.tsx:249-262`).
- Chargement : `loadNotion` (`web/src/lib/content.ts:391`) gagne
  `mediaStages: Record<slug, StagesSpec>` (même motif que `motionSpecs`).

### 2.3 Rendu — composant client `StagedFigure`

Nouveau `web/src/components/notion/StagedFigure.tsx` :

- Dispatch : dans `NotionBody` (`:296-424`), un segment `figure` dont le slug
  a un `stages.json` rend `<StagedFigure>` au lieu de `MediaDiagramFigure`.
- **Absence réelle du DOM** : les groupes `step-N` avec N > étape courante
  sont RETIRÉS de la chaîne SVG avant injection (regex de découpe de groupe,
  même niveau chaîne que `applyStepVisibility`,
  `MediaDiagram.tsx:93-103` — mais suppression, pas `display:none`).
  Avancer ré-injecte. C'est le motif AttemptFirst appliqué aux figures : une
  étape de lecture porteuse de pédagogie n'existe pas avant d'être demandée.
- **Émphase calme** : les groupes des étapes antérieures reçoivent
  `opacity="0.55"` (injection chaîne) ; l'étape courante pleine. Pas d'autre
  traitement.
- **Contrôles** : la grammaire transport exacte de MotionStage
  (`MotionStage.tsx:491-534`) — `TransportButton` « Précédent » /
  `Étape n / N` (`aria-live="polite"`) / « Suivant » ; au dernier stade le
  bouton devient « Recommencer ». Tab+Enter/Espace natifs ; pas de flèches
  (les flèches appartiennent aux chapitres — un seul propriétaire par
  geste). `[LEDGER]`
- **initialStage** : `= min(occurrence, stages.length)` — le compteur global
  d'occurrences (§1.2) donne l'étape de départ. Un placement unique part à
  l'étape 1 ; les placements répétés (rlc-schema ×4, regimes-uc ×3,
  arbre-pondere ×3, i-etablissement ×2, uc-charge ×2) partent pré-révélés au
  niveau qu'ils avaient — l'élève peut toujours avancer jusqu'au complet.
  Ceci UNIFIE l'ancien mécanisme (allowlist `STEPPED_FIGURE_MAX_STEPS`,
  `NotionBody.tsx:52-55`) qui sera supprimé une fois rlc-serie migré.
- `VERTICALLY_STACKED_PANELS`/`applyViewBoxCrop` (`MediaDiagram.tsx:82-136`)
  restent : StagedFigure les applique à l'étape courante (regimes-uc en
  dépend).

### 2.4 Reduced-motion

La figure se rend COMPLÈTE (toutes étapes présentes, émphase aucune),
contrôles masqués — le précédent Derivation (`Derivation.tsx:81,121,145`),
pas le précédent MotionStage : ici il n'y a pas de timeline à seeker,
l'échange instantané par clics n'apporte rien de plus que le tout-statique.
`[LEDGER]`

### 2.5 Règle de seuil (owner-overridable) `[LEDGER]`

- **Graphes : toujours staged** — l'ordre canonique est
  `axes → données → lecture` (lecture = tangente, asymptote, construction,
  annotation de méthode).
- **Autres figures** (schémas, diagrammes) : staged si ≥3 couches
  sémantiques ET si l'ordre des couches est un *geste d'enseignement* (un
  bilan de forces se construit ; une pile Daniell se regarde). Le census
  mécanique dit « tout a ≥3 couches » — le critère décisif est le geste,
  pas le comptage. Refus documenté = état légitime de la table de migration.
- **Trivial → entier.** Pas de théâtre de clic.
- Le propriétaire peut forcer dans les deux sens ; chaque dérogation est une
  ligne de ledger.

### 2.6 Impression

`beforeprint` → révéler toutes les étapes ; `afterprint` → restaurer l'état.
Le DOM reste propre jusqu'à l'impression réelle. (Chrome/Firefox : événements
`beforeprint`/`afterprint` ; Safari couvert par `matchMedia('print')`.)

### 2.7 Validation & vérité

- `validate-content.mjs` (`web/scripts/validate-content.mjs:86-118`) gagne :
  sidecar `.stages.json` présent → le SVG frère DOIT exister, le compte
  d'étapes DOIT égaler le max `step-N` du SVG, captions non vides (échec
  dur) ; SVG avec `step-N` sans sidecar ni entrée legacy → avertissement
  (migration en attente).
- `dom-truth.mjs` : voir §5.

### 2.8 Template v2 — amendement

`docs/pipeline/NOTION-TEMPLATE-V2.md` §E (Assets, lignes 115-130) gagne un
champ **`stages`** : tout brief de figure déclare soit `stages: [ordre des
étapes + ce que chaque étape enseigne]`, soit `stages: entier (raison)`.
L'ordre des étapes est AUTORÉ, jamais improvisé par l'agent d'implémentation.

---

## 3. Largeur composée

### 3.1 Grille

`.notion-page-grid` (`globals.css:736-757`) : aujourd'hui `208px 32px 1fr`
dès 840px. Ajout d'un palier `bp-wide` (1536px, existant —
`web/tailwind.config.ts:15-21`) :

```
@media (min-width: 1536px):
  grid-template-columns: 208px 40px minmax(0, 1fr) 40px 264px;
```

- La prose ne bouge pas : `.notion-prose` garde `max-width: 65ch`
  (`globals.css:808-812`).
- <1536px : rien ne change (la colonne droite n'existe pas).

### 3.2 La zone « à retenir » (droite, ≥1536px)

Nouveau `web/src/components/notion/RetenirZone.tsx` (adapte le candidat W3
`KeyFormulaRail.tsx` — le composant option reste intact pour l'historique
des routes `/options/wide/*`) :

- Sticky (même politique que le rail : `top: 5rem`).
- Contenu = l'« à retenir » du CHAPITRE COURANT (poussé par ChapterShell).
- **Source** : sidecar optionnel `content/<m>/<slug>/retenir.json` :
  `[{ "rung": "R3", "formula": "\\tau = RC", "note": "…" }]` (formula en
  KaTeX, rendue par le pipeline existant). **Fallback automatique** : le
  premier bloc `$$…$$` du chapitre, étiqueté par le titre court du chapitre.
  Aucun des deux → zone vide et silencieuse (le calme > le remplissage).
  `[LEDGER]` — rlc-serie reçoit le `retenir.json` exemplaire (lane contenu).
- **Emplacements de notes de marge** (candidat W1, `MarginNotes.tsx`) : la
  zone accepte sous la formule des notes de marge par chapitre — même
  sidecar, champ `note`. Pas de génération automatique de notes.

**CE QUE ÇA DONNE SUR LE CORPUS RÉEL — mesuré le 2026-09-05, jamais mesuré
avant.** La zone remplit **229 chapitres sur 491, soit 47 %** :

| matière | chapitres avec carte | notions entièrement vides |
|---|---:|---|
| maths | 96 / 123 (78 %) | 0 |
| pc | 117 / 189 (62 %) | 0 |
| svt | 16 / 87 (18 %) | 6 sur 11 |
| philo | **0 / 92 (0 %)** | **12 sur 12** |

La cause n'est pas un oubli d'autorat, c'est la SOURCE : le repli n'attrape
qu'un bloc `$$…$$`, et une leçon de philosophie n'en contient aucun. **La
zone « à retenir » est, par construction, une fonctionnalité de maths et de
physique** — et rien, jusqu'ici, ne le disait.

Ce n'est pas un défaut pour l'élève : le conteneur vide ne peint rien, il ne
reste qu'un peu de blanc à droite (vérifié dans le composant : la carte n'est
rendue que si elle existe). Le calme est préservé, la règle d'état honnête
aussi.

**Mais c'est un arbitrage ouvert, et il vaut d'être posé :** une leçon de
philosophie a évidemment quelque chose à retenir — une thèse, une
distinction, un auteur. Ce qu'elle n'a pas, c'est une FORMULE, et le schéma
du sidecar (`formula`, rendu en KaTeX) ne sait représenter que ça. Ouvrir la
zone à la philo demanderait une carte textuelle — donc une décision de
design, pas une campagne d'autorat. Un seul sidecar existe aujourd'hui
(`pc/rlc-serie`, l'exemplaire prévu par ce document).

### 3.3 Masthead — M1

Le motif de couverture entre en production dans le band du masthead : le
branch m1 (`NotionPageView.tsx:201-211`, motifs `Cover.tsx:30-146`) devient
le rendu par défaut (fin du `wideOption` mort en prod). Statut ledger :
OWNER-DECIDED (direction Day 11), pas FABLE-DECIDED.

---

## 4. Ordre de build (contrat de reprise à froid)

1. ~~Spec~~ (ce document) + ledger §11 + amendement template v2 → commit
   (le SHA de ce commit ouvre le rapport).
2. `StagedFigure` + chargeur `mediaStages` + dispatch NotionBody + règle
   validate-content + CSS. Vérité : validate + build + dom-truth locale.
3. Coquille de pagination sur rlc-serie : chapterize + `ChapterShell` +
   rail-navigateur + prev/next + position + temps par chapitre + print CSS.
   (La pagination est renderer-level : elle embarque TOUTES les leçons dès
   qu'elle marche — rlc-serie est la leçon de PREUVE, pas un flag par leçon.)
4. Zones latérales : grille ≥1536, `RetenirZone` + notes de marge +
   `retenir.json` rlc + M1 au masthead.
5. Migration des graphes de rlc-serie : `regimes-uc.stages.json` (3),
   `rlc-schema.stages.json` (4) ; suppression de `STEPPED_FIGURE_MAX_STEPS`.
6. Sweep : vérifier la pagination sur lois-de-newton (9 ch.),
   suites-numeriques (11 ch. + motion + StagedFigure interplay),
   probabilites-conditionnelles (l'exception ##).
7. Migration figures corpus (Workflow fan-out) : les 34 graphes d'abord
   (règle : toujours staged), puis schémas/diagrammes au jugement §2.5.
   Chaque figure = éditer le SVG (envelopper en `step-N`) + écrire
   `.stages.json` + valider. Table de migration dans le ledger :
   `done / pending / declined-with-reason`.
8. Extension dom-truth (§5) + shots 1280/1536/1920 × clair/sombre →
   commit/push par pièce, rapport final.

## 5. Extension des harnais

### dom-truth (`web/scripts/dom-truth.mjs`)

Nouvelles entrées BATTERY + SWEEP (structure : BATTERY duck-typed
`:80-227`, extraction `:256-341`, assertions `:343-433`, SWEEPs `:437-610`) :

- StagedFigure : sur un graphe rlc migré — `absentSel:
  "[data-figure='regimes-uc'] g#step-2"` avant avance (motif AttemptFirst,
  précédent exact `:133`) ; après clic « Suivant » (le harnais sait cliquer :
  précédent beats, `shots.mjs:190`) le groupe existe.
- Pagination : chapitre 1 visible, chapitre 2 `hidden` présent dans le DOM ;
  `?chapitre=3` deep-link → chapitre 3 actif ; affordance `Chapitre 3 /`
  textuellement présente ; contrôles atteignables au clavier (boutons натifs
  — vérifier `document.activeElement` après Tab n'est PAS requis : les
  boutons natifs suffisent, on vérifie leur présence + `aria-label`).
- Print : `page.emulateMedia({media:'print'})` → tous les chapitres visibles
  (offsetParent non nul), contrôles masqués.

### shots (`web/scripts/shots.mjs`)

- Viewports : `desktop 1280×900` + `wide 1536×960` + `ultra 1920×1080` +
  mobile inchangé ; ouvrir les gates `vpName === "desktop"` (`:167,182`) aux
  trois tiers desktop.
- Capture par chapitre : pour la leçon de preuve, un shot par chapitre (la
  coquille est pilotable par `?chapitre=n` — pas besoin de clics).
- Le hack thème `classList.add('dark')` (`:84-88`) est un défaut CONNU
  (dom-truth l'appelle anti-pattern, `:475-492`) — hors périmètre Day 11,
  ligne de ledger « dette ».

## 6. Défauts adjacents constatés (non corrigés ici, consignés)

> **TRIÉ ET SOLDÉ le 2026-09-05** (HANDOFF §10.12–10.13). Chaque entrée a été
> MESURÉE avant d'être crue : deux étaient déjà réparées sans que cette liste
> le sache, une était une contradiction de documentation, trois étaient
> réelles — dont deux visibles par l'élève (la fin de leçon proposait la même
> notion partout ; sept ancres « § » sur huit renvoyaient à la mauvaise
> section). Le détail par entrée est annoté ci-dessous.


- ~~`LessonEnd` next = `listNotions().filter(...)[0]` — ordre filesystem, pas
  récence, contrairement au commentaire.~~ **RÉEL, CORRIGÉ** (2026-09-05) :
  une seule suggestion distincte pour les 62 leçons. Remplacé par l'ordre du
  PROGRAMME (`nextInParcours`, lib/curriculum.ts) — 60 suggestions distinctes.
  Trier par date de fichier aurait été une fabrication : après un clone frais,
  toutes les dates sont celles du checkout.
- ~~`LessonRenderer` par segment ⇒ compteur d'unicité `rehype-slug` remis à
  zéro par segment — risque d'ids dupliqués entre segments.~~ **RÉEL, ET PAS
  UN RISQUE : un fait.** Huit titres « L'erreur à repérer » avec le même id
  dans `maths/suites-numeriques` ; sept ancres « § » sur huit renvoyaient à la
  première. Corrigé par un compteur PARTAGÉ
  (`web/src/lib/rehypeSlugPartage.ts`), porte `ancres-uniques --porte`.
- ~~`validate-content.mjs` : la garde lexicale laisse passer « À FAIRE » /
  « asset-pending ».~~ **DÉJÀ RÉPARÉ** — les deux sont dans le lexique.
  Quant à `[[video:]]` qui avertit au lieu d'échouer : c'est l'EN-TÊTE qui
  mentait. `NotionBody` rend `null` sur ce marqueur par décision de brief
  (omission gracieuse), le corpus en porte UN, assumé par un commentaire.
  L'en-tête dit désormais ce que le code fait, et pourquoi.
- ~~`COMPONENT-STATES.md:277` décrit encore un scroll-spy
  IntersectionObserver.~~ **RÉEL, CORRIGÉ** : il n'y a plus une seule
  occurrence d'`IntersectionObserver` dans `web/src/`. Le §5 décrit maintenant
  le rail-navigateur et son épine de progression.
- ~~`.claude/CLAUDE.md` cite un répertoire de vision qui n'existe pas sous
  cette casse.~~ **RÉEL, ET BIEN PLUS GRAND QUE ÇA** : les DEUX répertoires
  existaient — VISION.md et DESIGN-BIBLE.md sous la casse capitale, trois
  autres documents sous la minuscule — et 23 renvois, dont ceux de CLAUDE.md,
  du README, du HANDOFF et de NEUF agents, ne menaient nulle part. Fusionné
  vers `docs/product/` ; porte `liens-fichiers --porte`. Voir HANDOFF §10.13.
- ~~`arbre-pondere.svg` n'a AUCUN groupe step malgré ses 3 placements.~~
  **DÉJÀ RÉPARÉ** — la figure porte ses groupes d'étapes et son sidecar
  `.stages.json`.

## Retraits et corrections

*(néant pour l'instant)*
