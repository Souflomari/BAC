# STUDIO-SPEC — l'anatomie exacte de l'identité Studio

> **Autorité :** ADR 0030 (pivot Studio) + `docs/product/REFONTE-STUDIO.md`
> (le plan, décisions D1–D4 verrouillées par l'owner le 2026-08-17).
> **Audience : un exécutant SANS contexte de session** (Antigravity / un
> modèle froid) qui reproduit les surfaces restantes du site à partir de la
> tranche de référence construite en R2/R3/R4. Ce document dit exactement
> QUOI construire, avec QUELS jetons et QUELLES classes ; la discipline
> (cœur calme, honest-state, vérité rendue) reste dans
> `docs/product/DESIGN-BIBLE.md`, qui prime en cas de conflit.
>
> **La tranche de référence EST le spec exécutable.** En cas de doute entre
> ce texte et le code de la tranche (`SiteHeader.tsx`, `CommandPalette.tsx`,
> `ProgrammeMap.tsx`, `SessionCard.tsx`, `Atelier.tsx`, `Figures.tsx`,
> `PageShell.tsx`, `Lien.tsx`, la section R4 de `globals.css`), le code
> validé par les portes fait foi — lis-le avant d'inventer.

---

## 0 · Les trois lois d'exécution

1. **Jetons seulement.** Aucun hex, aucune valeur brute dans un composant.
   La source unique est `web/src/lib/tokens.ts` ; les composants parlent en
   ALIAS (`bg-surface-raised`, `text-primary`, `border-subtle`,
   `duration-standard`…). `token-gate.mjs` échoue le commit sinon.
2. **Portes vertes à chaque lot.** `npm run build` + `npm run dom-truth`
   (181 checks) + `npm run token-gate` + `npm run contrast-gate` — zéro
   échec, deux runs dom-truth consécutifs. Aucune exception.
3. **Honest-state.** Signé-déconnecté, il n'existe AUCUNE donnée par
   élève. Seuls les faits de COUVERTURE du cadre (« M/N chapitres »,
   depuis `subjectChapterCount` / `subjectAvailableCount`) peuvent être
   visualisés. Un pourcentage de progrès fabriqué est un défaut bloquant.

## 1 · Le contrat de jetons (valeurs verrouillées, R1)

Source : `web/src/lib/tokens.ts` (les valeurs ci-dessous sont un extrait
de référence — le fichier fait foi).

**Surfaces (clair)** : fond de page `--color-surface-base #F7F7F4` ;
cartes `--color-surface-raised #FFFFFF` ; docks/entrées
`--color-surface-container-low #F4F3F0`. Deux niveaux d'élévation réels
(`shadow-elevation-1` cartes, `shadow-elevation-2` survol,
`shadow-elevation-3` overlays) — la hiérarchie vient du TON et des
bordures, pas des ombres (méthode Linear).

**Encre** : `text-primary #1D1A14` · `text-secondary #55524A` ·
`text-tertiary #6F6C63`. **Accent produit** : `--color-accent #00746A`
(sarcelle recalibré), texte dessus `text-on-accent #FFFFFF`.

**Matières — cinq triades OKLCH à clarté/chroma égales (D3)** :

| id | `--subject-*` | `-subtle` | usage |
|---|---|---|---|
| maths | `#3F5D93` | `#E9F1FE` | point, barre de couverture, chip |
| pc | `#864D23` | `#FBEDE4` | idem |
| svt | `#3F6A35` | `#E9F4E7` | idem |
| philo | `#7E4873` | `#F9EBF6` | idem |
| si | `#006B7B` | `#E2F4F8` | idem |

Règle d'usage : la couleur de matière est un MARQUEUR (point 10 px, barre
2 px, chip), jamais un fond de section entier. `-on` est blanc partout —
vérifié par `contrast-gate` (80 paires AA, les deux thèmes).

**Typo (D2)** : `--font-ui` = Geist (tout le chrome, les titres, tout
l'atelier) ; `--font-mono` = Geist Mono (TOUT nombre qui change :
compteurs, readouts, minutes, `dispo/total`) avec `tabular-nums` ; le
sérif (Source Serif 4) survit UNIQUEMENT dans le corps de prose des
leçons (`.prose-lesson`), jamais dans ses titres (forcés `--font-ui` par
`globals.css`). Classe `font-display` = graisse/tracking du typeScale,
pas une seconde famille.

**Bandes** : `--band-page min(1760px,100%)` (toutes pages),
`--band-atelier min(2040px,100%)` (surfaces dont le contenu EST une
figure), `--gutter clamp(1rem,3vw,4rem)`. La prose reste 65ch À
L'INTÉRIEUR ; la largeur gagnée va aux figures et aux listes, jamais au
vide.

**Ruptures — l'échelle M3 SEULE** : `bp-medium` 600 · `bp-expanded` 840 ·
`bp-large` 1200 · `bp-xl` 1600. Les classes Tailwind par défaut
(`sm: md: lg:`) N'EXISTENT PAS dans ce projet (theme.screens remplacé) —
une classe `md:` écrite par réflexe ne produit RIEN. Relis-toi.

## 2 · La coquille (référence : `SiteHeader.tsx`, `PageShell.tsx`)

**Header** — `header.entete-site sticky top-0 z-header`, hauteur de rangée
`h-14`, bande `max-w-page px-gutter` identique sur TOUTES les routes (le
wordmark ne saute jamais). Au scroll > 8 px : `header-glass +
shadow-elevation-1`. Anatomie gauche → droite :
- wordmark : GlyphMark (arc) + « BAC » `text-h4 font-semibold` — rien
  d'autre ;
- Rechercher : bouton `h-9` bordé `bg-surface-container-low` avec
  `<kbd>⌘K</kbd>` (compact : icône loupe `min-h-touch min-w-touch`) ;
- FiliereBadge · panneau **Notions** · A−/A/A+ · thème · compte.
La toolbar complète n'existe qu'à partir de `bp-expanded` ; en dessous :
Rechercher (compact) + filière + menu compact (mêmes entrées, verticales).

**Panneau Notions** — DropdownMenu Radix `modal={false}`, contenu
`z-overlay w-[600px] rounded-xl border-subtle bg-surface-overlay p-2
shadow-elevation-3` en `grid-cols-2`. Par matière (ordre
`SUBJECT_ORDER` de `lib/subjects.ts`, la SEULE constante d'ordre) :
- une matière sans notion construite N'APPARAÎT PAS (jamais « 0/0 ») ;
- ligne de tête : point couleur matière 10 px + label `text-body-sm
  font-semibold` + `dispo/total` en mono `text-caption` à droite ;
- barre de couverture 2 px : piste `-subtle`, remplissage couleur
  matière — donnée du CADRE, pas du progrès ;
- 4 premières notions (liens `text-body-sm text-secondary`, truncate
  autorisé ICI seulement — c'est une nav, pas un titre de page) ;
- « Tout voir → » en couleur matière si > 4.
Chaque lien passe par `DropdownMenu.Item asChild` autour du `Link`
maison (voir §5 — la ref DOIT atteindre l'ancre).

**Palette ⌘K** (`CommandPalette.tsx`, cmdk) — ouverte par ⌘K/Ctrl+K ou
l'événement `ouvrir-palette`. Carte `.palette-commande min(640px,100%)`
centrée à 12vh sur voile assombri. Groupes = matières (ordre canonique)
puis « Aller à ». **Le filtre est le filtre MAISON `filtreNet`** :
substring stricte insensible aux accents, bonus préfixe/début-de-mot —
JAMAIS le scorer flou de cmdk (défaut mesuré : « atelier » classait une
notion SVT devant l'Atelier). dom-truth l'asserte.

**PageShell** — `width` décide la bande (`page` par défaut, `atelier`
pour l'atelier, `notion` pour les leçons) ; le header garde SA bande
`max-w-page` sur toutes les routes. Les pages SERVEUR passent
`notions={manifeste}` (listNotions lit le fs — interdit dans un
composant importé par une page client).

## 3 · L'accueil (référence : `page.tsx`, `ProgrammeMap.tsx`, `SessionCard.tsx`, `NextUp.tsx`)

Ordre vertical : en-tête (`h1` display « Ta session ») → SessionCard →
NextUp → ProgrammeMap. C'EST TOUT — les modules historiques
(MasteryMap, AvailableShelf, SubjectProgress, MilestoneSlot) sont morts,
ne les ressuscite pas.

**SessionCard** — texte d'abord : chip matière (`-subtle` + point +
label), eyebrow, titre `font-display text-h1`, bouton
`btn-primary[data-primary-action]`. La SEULE action primaire de l'écran.

**ProgrammeMap** — par matière active (filière narrowing via
`isNotionInFiliere`) : `<article data-programme-matiere={id}>` en carte
`bg-surface-raised border rounded-xl shadow-elevation-1
hover:shadow-elevation-2`, grille `gap-4 bp-large:grid-cols-2` :
- `<header>` : point couleur, lien-titre `text-h4`, `<span
  data-couverture="M/N">` mono « M/N chapitres » ;
- barre de couverture (piste `-subtle`, remplissage matière,
  `role="img"` + aria-label français) ;
- `<ol>` de notions : chaque `<li class="min-w-0">` porte un `Link
  w-full min-w-0 flex` avec `data-mastery-token`, titre (truncate),
  minutes en mono. Le `min-w-0` est OBLIGATOIRE (piège grid
  min-width:auto → débordement horizontal mobile, mesuré 509 px à 390).

## 4 · L'atelier (référence : `Atelier.tsx`, `Figures.tsx`)

**Workspace** — la scène est une carte `overflow-hidden rounded-xl
border bg-surface-raised shadow-elevation-1` SANS padding : la figure
vit sur `.fond-points` (grille de points 22 px, jeton `--figure-grid`),
le dock dessous.

**Dock de contrôles** — bande `border-t bg-surface-container-low` sous
la figure : composants `Stepper` (boutons −/+ `min-h-touch min-w-touch`,
readout mono `tabular-nums`, label teinté rôle-figure, `active:scale-95`)
+ readout de résultat en pilule `font-mono bg-accent-subtle` (ex.
« 2 / 4 = 0,50 »). Les curseurs natifs nus sont INTERDITS.

**Carte QCM** — options avec badge `<kbd>` A/B/C/D (rempli accent quand
la bonne réponse est révélée) ; raccourcis clavier RÉELS : a–d / 1–4
répondent, Entrée avance (garde-fous : modificateurs et champs de saisie
ignorés). Verdict jamais par couleur seule.

**Carte feedback** — `overflow-hidden rounded-xl border` (bordure
violette rôle-figure) : bandeau pleine largeur (fond violet,
`text-on-accent`, phrase d'état), corps explicatif sur
`bg-surface-raised`, pied de comparaison mono « tracée : X · attendue :
Y ». L'erreur est enseignée, jamais punie (pas de rouge plein écran).

**Rail** — fil compact en pilules, `sticky top-14 z-raised
bg-surface-base`.

## 5 · Motion (R4 — les trois couloirs)

1. **CSS** pour les micro-états : hover/focus `duration-micro
   ease-enter` ; élévation au survol des cartes CLIQUABLES uniquement.
2. **Ressorts maison** (`useRessort`/`useApparition`,
   `SPATIAL.standardDefault`) pour l'interactif — jamais d'overshoot.
3. **View Transitions** entre routes : provider `ViewTransitions` au
   layout ; **tout lien passe par `@/components/ui/Lien`** (le Link
   upstream n'a pas de forwardRef — la ref de Radix `asChild` n'atteint
   pas l'ancre et la navigation clavier meurt en silence ; le wrapper
   maison la transmet). Navigation programmatique : `useTransitionRouter`.
   Crossfade `--duration-standard` / `--ease-between` ; le header porte
   `view-transition-name: entete-site` (le chrome ne fond JAMAIS avec le
   contenu). Firefox : dégradation nette, aucun polyfill.

**Interdits absolus** : animation au mount de PAGE (autoplay), stagger
au chargement, scroll-trigger, parallaxe, bounce. Le stagger n'existe
que dans les surfaces ouvertes PAR L'ÉLÈVE (panneau : colonnes décalées
30 ms, `animation-fill-mode: both`). Radix monte son contenu déjà à
l'état open → utiliser des ANIMATIONS (`@keyframes`), jamais des
transitions, pour les entrées de panneau/palette.

**Reduced-motion** : le filet global 0,01 ms NE COUVRE PAS
`::view-transition-*` — la règle explicite de `globals.css` doit
survivre à tout refactor (dom-truth l'asserte).

## 6 · Les surfaces à reproduire (R6, bons de travail)

Discipline `docs/ops/DISTRIBUTED-BUILD.md` (éprouvée sur 53 scènes
Manim) : un bon par surface, échantillon d'acceptation d'1 surface par
lot vérifié par Claude, portes vertes par lot.

1. **/matieres/[id]** — bande `page` ; en-tête matière (point + h1
   display + couverture mono) ; liste des notions au motif ProgrammeMap
   (mêmes classes, même `min-w-0`) ; zéro % fabriqué.
2. **Leçons** (passe titres) — les titres de leçon rendent en
   `--font-ui` (déjà forcé par globals.css) ; vérifier le rythme
   vertical sur 3 leçons témoins AVANT le fan-out (risque nommé §7.3 du
   plan) ; prose sérif 65ch intouchée ; précédent/suivant en `Lien`.
3. **/connexion + 404** — bande `reading`, mêmes cartes, mêmes états ;
   le header reste la bande `page` (jamais rétréci).
4. **Vieux bancs /options/*** — à retirer sur bon dédié (owner-gaté).

## 7 · Les portes (à demeure, ne pas affaiblir)

| porte | commande | ce qu'elle tient |
|---|---|---|
| build | `npm run build` | compile + prebuild drift-check des tokens |
| dom-truth | `npm run dom-truth` | 181 checks : anatomies, honest-state, parité tokens ×2 thèmes, tripwire cn(), sweep R4 (vt-name header, reduced-motion sur ::view-transition-*, filtre palette), règle-atelier |
| token-gate | `npm run token-gate` | zéro valeur arbitraire, un seul idiome |
| contrast-gate | `npm run contrast-gate` | 80 paires WCAG, les deux thèmes |
| hygiène | grep du diff | zéro identifiant de modèle dans les artefacts |

Un lot qui touche une anatomie ÉTEND dom-truth dans le même commit
(l'assertion qui aurait attrapé la régression que tu viens d'éviter).

## Retractions and Corrections

*(présent dès la création, par discipline — vide pour l'instant)*
