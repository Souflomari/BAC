# INTERACTIVE-FIGURE-SPEC — figures manipulables, bâties sur StagedFigure

**Statut :** OWNER-DIRECTED (2026-07-07) — le propriétaire a demandé plus de
visualisations interactives, pas à pas (« le contenu reste léger ») ; ce
document encode la décision : construire une capacité de manipulation
continue de première partie (glisser un point, tirer un curseur), pas de
nouveaux embeds GeoGebra/Desmos (voir ADR 0017, amendement 2026-07-07).
**Rôle de ce document :** contrat d'implémentation complet, dans l'esprit de
`LESSON-EXPERIENCE-SPEC.md`. Si la fenêtre de travail se ferme en cours de
build, un modèle froid doit pouvoir finir à partir d'ici seul.

---

## 0. Ce qui change, en une phrase

Une figure déjà « staged » (`.stages.json`, révélation axes → données →
lecture, cliquer pour avancer) peut désormais, **une fois la dernière
étape atteinte**, déverrouiller un contrôle de manipulation continue
(glisser un point le long d'une courbe, ou tirer un curseur) qui recalcule
en direct une portion du SVG déjà affiché — jamais un second type de
figure, jamais une figure qui saute l'étapage.

Non-négociables transverses : RULES.md tient (branche seulement) ; DESIGN-
BIBLE §0 (cœur calme, aucun théâtre d'engagement) et §5 (jamais d'autoplay,
jamais de scroll-trigger, tout est déclenché par l'élève) tiennent sans
exception ; `prefers-reduced-motion` reste respecté ; français partout.

---

## 1. Le modèle de séquence (staged → puis manipulable)

1. La figure se révèle exactement comme aujourd'hui, étape par étape,
   transport identique (`Précédent` / `Étape n/N` / `Suivant→Recommencer`),
   même contrat d'absence réelle du DOM pour les groupes `step-N` non
   encore révélés (`StagedFigure.tsx`, inchangé).
2. **Seulement** quand `stage === stages.length` (la dernière étape,
   « lecture »), le contrôle de manipulation apparaît, **sous** la barre de
   transport existante — il ne la remplace pas. L'élève peut toujours
   revenir en arrière (`Précédent` reste actif) ; le contrôle se démonte
   simplement en repassant sous la dernière étape.
3. Aucune figure ne saute l'étapage pour aller direct à la manipulation —
   §2.5 de LESSON-EXPERIENCE-SPEC (« graphes : toujours staged ») s'applique
   sans exception aux figures manipulables aussi.

C'est le patron de Distill.pub (« un cadre narratif révélé par étapes qui
enveloppe un contenu manipulable ») exprimé avec les deux primitives que ce
code possède déjà (transport à étapes, puis un contrôle lié en direct) —
pas un troisième modèle mental.

---

## 2. Les deux fichiers par figure manipulable

### 2.1 Le sidecar de contenu (donnée pure)

`content/<matière>/<slug-leçon>/media/<slug-figure>.interactive.json`,
posé À CÔTÉ du `.stages.json` existant (jamais sans lui) :

```json
{
  "slug": "tangente-derivee",
  "control": {
    "kind": "drag-point",
    "axis": "x",
    "domain": [-1.5, 3],
    "step": 0.05,
    "initial": 1
  },
  "bindings": [
    { "target": "#point-mobile",    "recompute": "point" },
    { "target": "#droite-tangente", "recompute": "tangentPath" },
    { "target": "#lecture-pente",   "recompute": "slopeLabel" }
  ],
  "unlockAfterStage": 3,
  "readoutTemplate": "En x = {x} : f'(x) = {slope}"
}
```

Champs :
- `control.kind` — `"drag-point"` (un point SVG glissable) ou `"slider"`
  (curseur seul, pas de geste de glisser sur la courbe — ex. compter des
  rectangles de Riemann, ou le degré `n` des racines de l'unité).
- `control.axis` — nom de l'axe manipulé (documentaire, lu par le module
  math pour savoir quel argument recalculer).
- `control.domain` — `[min, max]` en espace-données (jamais en pixels SVG).
- `control.step` — incrément du curseur natif (clavier flèches, `<input
  type="range">`).
- `control.initial` — valeur de départ, **jamais** un état persistant côté
  navigateur (règle honest-state existante) : chaque montage repart d'ici.
- `bindings[]` — `target` est un sélecteur CSS résolu **dans le SVG déjà
  injecté** (un `id` authored dans le `.svg`, jamais inventé côté React) ;
  `recompute` est la clé qui pointe vers une fonction du même nom dans le
  module `.ts` jumeau (§2.2).
- `unlockAfterStage` — DOIT être égal à `stages.length` du `.stages.json`
  jumeau (validé, §4). Le contrôle n'existe dans le DOM qu'à partir de là.
- `readoutTemplate` — optionnel, gabarit français pour un texte de lecture
  en direct (`{x}`, `{slope}`, etc. substitués par le hook).

### 2.2 Le module de calcul (code, pas du contenu)

`web/src/lib/interactive-figures/<slug-figure>.ts` — un fichier par figure,
enregistré dans `web/src/lib/interactive-figures/index.ts` (même patron que
`STRUCTURAL_SLUGS`/`VERTICALLY_STACKED_PANELS` dans `MediaDiagram.tsx`) :

```ts
// web/src/lib/interactive-figures/types.ts
export type RecomputeResult =
  | { kind: "path"; d: string }
  | { kind: "point"; x: number; y: number }
  | { kind: "text"; value: string };

export interface InteractiveFigureModel {
  domain: [number, number];
  toSvgPoint(dataX: number, dataY: number): { x: number; y: number };
  toDataX(svgX: number): number;
  f(x: number): number;
  fPrime?(x: number): number;
  recompute: Record<string, (value: number) => RecomputeResult>;
  formatValue(value: number): string; // virgule française, pas un toString() brut
}
```

**Pourquoi la donnée vit dans `web/src/lib`, pas dans un sidecar exécutable
sous `content/`** : chaque autre convention de sidecar sous `content/`
(`.stages.json`, `.motion.json`, `embed.json`) est de la **donnée pure**,
lue via `JSON.parse` — aucune n'est du code exécutable. Introduire un
`.ts` que le build Next doit importer depuis l'arbre de contenu serait un
précédent plus lourd (résolution de module à travers une frontière
aujourd'hui délibérément data-only). Le patron « petit registre de
fonctions nommées par slug, en code applicatif, lu via un registre » existe
déjà deux fois dans ce code — cette spec l'étend, elle n'en invente pas un
troisième.

**Dégradation gracieuse** : si `.interactive.json` existe mais qu'aucun
module n'est enregistré pour ce slug dans le registre, `StagedFigure` rend
la figure exactement comme aujourd'hui — aucune erreur, aucune affordance
de manipulation. Même discipline que chaque autre patron de secours de ce
code (marqueur inconnu → no-op silencieux, etc.).

---

## 3. StagedFigure — l'extension

Un seul prop optionnel ajouté à `StagedFigureProps` :

```ts
interactiveConfig?: InteractiveFigureConfigSpec; // JSON pur — aucune fonction ne traverse cette frontière
```

`content.ts` gagne, en miroir exact du chargeur `mediaStages` existant
(`web/src/lib/content.ts:228,535,610`) :

```ts
export interface InteractiveControlSpec {
  kind: "drag-point" | "slider";
  axis: string;
  domain: [number, number];
  step: number;
  initial: number;
}
export interface InteractiveBindingSpec { target: string; recompute: string; }
export interface InteractiveFigureConfigSpec {
  slug: string;
  control: InteractiveControlSpec;
  bindings: InteractiveBindingSpec[];
  unlockAfterStage: number;
  readoutTemplate?: string;
}
// NotionContent gagne :
mediaInteractive: Record<string, InteractiveFigureConfigSpec>;
```

`NotionBody.tsx` passe `interactiveConfig={mediaInteractive[seg.slug]}` au
seul site d'appel `StagedFigure` existant — `undefined` pour les ~100
autres figures staged/plates, sans effet sur elles.

À l'intérieur de `StagedFigure` : `const model = interactiveConfig ?
getInteractiveFigureModel(slug) : undefined;`. Le contrôle ne monte que si
`model !== undefined && stage === totalStages`.

---

## 4. Les deux primitives de contrôle

`web/src/components/notion/InteractiveControl.tsx` exporte :

- **La poignée glissable** — un `<circle>` (ou l'id du point déjà authored
  dans le SVG) avec `pointerdown/pointermove/pointerup`, `toDataX` bornée
  au `domain`. Écrit *impérativement* dans le sous-arbre SVG déjà injecté
  (`setAttribute("d", …)`, repositionnement, texte) — exactement comme
  `MotionStage.tsx` écrit déjà dans son propre SVG injecté, pas de conflit
  avec le cycle de rendu React.
- **Un `<input type="range">` natif apparié** — la source de vérité
  accessible : clavier natif (flèches, Home/End), tactile natif,
  `aria-valuenow/min/max` natifs. Pour `control.kind === "slider"`, SEUL ce
  contrôle est rendu (pas de geste de glisser sur la courbe pertinent).
  **Piège évité** : `ChapterShell`'s écouteur global `ArrowLeft/ArrowRight`
  ignore déjà les éléments `input` par nom de balise — aucune collision de
  geste, aucun nouveau gestionnaire clavier à déboguer.
- Style : `--state-dragged` (`globals.css:79`, réservé et commenté
  « ce produit n'a aucune surface glissable aujourd'hui » depuis son
  écriture) — ce token sort enfin de sa réserve.
- `prefers-reduced-motion` : la manipulation elle-même n'est **jamais**
  désactivée (c'est le point, pas une décoration) — le recalcul écrit
  toujours la valeur finale directement, aucun tween à sauter. Seule
  chose gérée : un éventuel micro-affordance `pulse-settle` à un
  atterrissage remarquable (§7 de la spec du plan) reste soumis aux règles
  de réduction de mouvement déjà en vigueur pour ce verbe (`MOTION-
  CHOREOGRAPHY.md`), rien de nouveau à auditer.
- Impression : masqué sous la branche `fullyRevealed` déjà existante (rien
  à glisser sur papier) — aucune logique nouvelle, juste étendre la garde
  `!fullyRevealed &&` autour du nouveau bloc de rendu.

---

## 5. Règles de validation (`web/scripts/validate-content.mjs`)

Échec dur si, pour tout `.interactive.json` trouvé :
- aucun `.stages.json` jumeau n'existe (une figure manipulable est
  TOUJOURS staged d'abord) ;
- `unlockAfterStage !== stages.length` du jumeau ;
- un `bindings[].target` ne résout à aucun `id=` présent dans le `.svg`
  jumeau (grep direct sur le fichier, pas de suppositions) ;
- `control.domain` n'est pas `[min, max]` avec `min < max` ;
- (best-effort, avertissement non bloquant si le module `.ts` n'existe pas
  encore au moment du commit content-only — mais bloquant dans le pipeline
  final avant merge : chaque `recompute` nommé dans `bindings[]` doit
  exister comme clé dans le module `.ts` enregistré pour ce slug).

---

## 6. dom-truth — les contrôles nouveaux (par figure pilote)

Avant d'écrire ces contrôles : combler l'absence PRÉEXISTANTE et non
reliée de couverture pour `StagedFigure`/`EmbedPanel` (zéro test aujourd'hui
malgré la spec §5 de LESSON-EXPERIENCE-SPEC) — voir la tâche dédiée, dans
son propre commit, avant celui-ci.

Pour chaque figure manipulable, la batterie ajoute :
- **État initial, aucun glissé appliqué** : la valeur de l'`<input
  type="range">` égale `String(config.control.initial)` ; l'attribut lié
  (`d`/position) égale ce que produit `model.recompute[...](initial)` —
  calculé par le script de vérification en import-ant **le même** module
  `.ts` que le composant utilise (pas une attente dupliquée à la main).
- **Glissé via l'API souris de Playwright** : `page.mouse.move/down/up`
  vers une coordonnée cible ; assertion sur l'attribut `d` recalculé et le
  texte de lecture.
- **Clavier** : focus sur l'`<input>`, `ArrowRight` répété, assertion que
  la valeur avance de `step` et que la cible SVG suit.
- **`prefers-reduced-motion`** : le contrôle reste présent et fonctionnel
  (mêmes assertions glissé/clavier) ; aucune transition/animation CSS
  appliquée à la cible pendant la mise à jour.
- **Impression** : contrôle absent, courbe/tangente pleinement affichées à
  l'état final quel qu'il soit — même patron que l'assertion `fullyRevealed`
  déjà éprouvée pour StagedFigure nu.
- **Verrouillage AttemptFirst** : `absentSel` du sélecteur `input[type=range]`
  avant d'atteindre la dernière étape ; `present: true` après y avoir cliqué.

---

## 7. Portée explicitement HORS de cette spec

- Aucun nouvel embed GeoGebra/Desmos — voir ADR 0017 amendement
  2026-07-07 (raisons : licence commerciale, vérification headless
  impossible, fidélité du vocabulaire français).
- Le pipeline de migration « staging simple » des ~29 graphes et ~36
  schémas restants (`docs/pipeline/post-fable-work-order.md` Item 3)
  continue sur sa propre voie, non bloqué par cette spec — la plupart de
  ces figures n'ont pas besoin de manipulation.
- `arbre-pondere` (déjà signalé comme la migration la plus difficile,
  3 placements, zéro groupe `step-N`) reste hors de la première vague
  pilote — cumuler « première migration du cas le plus dur » et « première
  utilisation d'une primitive neuve » violerait la discipline « pilote
  d'abord » déjà établie sur ce projet.

## Retraits et corrections

*(néant pour l'instant)*
