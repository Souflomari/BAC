---
name: figure-authoring
description: Auteur de figures pédagogiques codées (SVG) et de leur mise en étapes. Déclencheurs — créer/modifier un fichier sous content/*/media/, un marqueur [[figure:]], un sidecar .stages.json, ou toute demande de diagramme/graphe/schéma de leçon.
---

# figure-authoring — SVG codé, étapes autorées

## Contrat de rendu (dur — le renderer ne passe AUCUN KaTeX sur les figures)

- SVG `<text>/<tspan>` pur ; sub/superscripts par tspans décalés en dy ;
  variables en italique ; « ln » et les mots droits.
- Couleurs UNIQUEMENT `var(--figure-surface|ink|ink-soft|grid|accent)`
  (+ `--figure-energy-C/L` réservés énergie). Jamais hex/currentColor/
  foreignObject/gradients. **Porte réelle depuis le 2026-09-03**
  (`validate-content`) — avant, la règle était écrite et rien ne
  l'exécutait. Deux sorties, toutes deux à ARGUMENTER dans le fichier :
  `COULEURS SÉMANTIQUES:` quand la couleur EST l'information (spectre
  d'un prisme, indicateur coloré — un spectre en nuances d'encre n'est
  plus un spectre), et `DETTE OWNER:` pour une figure héritée dont le
  sort est un arbitrage ouvert.
- **Aucun sélecteur nu dans un `<style>`** (`text { … }`, `rect { … }`).
  Un `<style>` de SVG inliné n'est PAS scopé : il s'applique au document
  ENTIER. Prouvé le 2026-09-03 — neuf figures déclaraient
  `text { text-anchor: middle }` et co-rendre l'une d'elles avec
  `bezout-remontee` poussait QUATORZE textes de cette dernière hors de
  son cadre. Ce qui est propre à une figure va sur SA racine
  (`style="…"`) ou sur SES classes. Gardé par `validate-content`.
- `viewBox` seul, en principe. **Dans les faits, 123 des 258 figures
  portent width/height sur leur racine et rendent correctement**
  (mesuré le 2026-09-03) : la règle est une préférence, pas un
  invariant, et il n'y a AUCUNE raison de lancer une migration des 123.
  Ce qu'il faut savoir en revanche : un SVG sans width/height n'a pas de
  taille intrinsèque et s'effondre à zéro dans un conteneur en
  `width: max-content` — c'est ce qui avait cassé l'outil d'aperçu.
- **Le cadre doit contenir le texte.** Élargis le `viewBox` plutôt que
  de déplacer une étiquette bien placée. Le premier balayage visuel réel
  du corpus (2026-09-03, rendu possible par la réparation de l'outil) a
  trouvé 17 figures au texte rogné — dont une unité d'axe affichée
  « λ (n ».
- L'accent marque UNE idée par figure (répétée = une idée, précédent
  demi-vies). Courbes CALCULÉES depuis la vraie formule ; toute
  exagération schématique divulguée en commentaire d'en-tête ET, si
  visible, en note de pied de figure.
- Marqueur `[[figure:slug]]` SEUL sur sa ligne, lignes vides autour.
  Nom de fichier == slug.

## Mise en étapes (LESSON-EXPERIENCE-SPEC §2 — lire avant d'agir)

- Seuil (ledger 11.6) : graphes TOUJOURS stagés (axes → données →
  lecture) ; autres si l'ordre des couches est un geste d'enseignement ;
  refus documenté légitime (table ledger §11).
- Groupes `<g id="step-N">` — **EN DERNIERS enfants du SVG** (piège
  assembleSvg : la réassemblage insère avant `</svg>` ; du contenu
  non-steppé après les groupes serait réordonné).
- Sidecar `media/<slug>.stages.json` : `stages[].caption` prosifiées
  (jamais de x_y/u_C bruts dans le texte visible) ; compte == max step-N
  (validate-content l'impose en échec dur).
- L'ordre des étapes est AUTORÉ dans le brief (template v2 §E), jamais
  improvisé.

## Vérification (chaque figure, pas d'exception)

1. `node web/scripts/validate-content.mjs content/<matière>/<leçon>` vert.
   Cette porte couvre désormais les couleurs et les sélecteurs nus ; le
   grep manuel qui figurait ici n'est plus le filet, il est redondant.
2. **Rendu réel :**
   `node web/scripts/figure-preview.mjs [--dark] <chemin.svg>` — clair ET
   sombre, et **REGARDE les PNG**. L'outil dit lui-même que sa détection
   de chevauchement est indicative et non certifiante : elle DIRIGE le
   regard, elle ne le remplace pas. Sa détection de débordement, elle,
   est fiable.
   *Il refuse maintenant de capturer ce qu'il n'a pas rendu.* Pendant une
   période indéterminée il produisait des carrés de 26 px en annonçant
   « aucun défaut » : un SVG effondré renvoie des `getBBox()` nuls, donc
   aucun texte ne peut sortir d'un cadre nul — l'œil et la mesure morts
   ensemble, sans un signal. S'il te dit « HARNAIS EN ÉCHEC », le fautif
   est l'outil, pas ta figure.
3. **Un aria-label sur la racine du SVG**, en français, décrivant ce que
   la figure MONTRE. C'est lui que le lecteur d'écran annonce : depuis le
   2026-09-03, `figureAriaLabel` va le chercher dans le fichier.
   `FIGURE_ARIA_LABELS` (NotionBody.tsx) reste prioritaire mais n'est
   plus obligatoire — ne l'utilise que pour reformuler quand la
   description du fichier ne convient pas au rôle de région. *(Avant ce
   correctif, 102 des 246 figures appelées par une leçon étaient
   annoncées par leur slug : « arbre pondere ».)*
   Schéma structurel → `STRUCTURAL_SLUGS` (MediaDiagram.tsx).

Références or : `content/pc/rc-charge/media/uc-charge.svg` (courbe),
`content/pc/dipole-rl/media/rl-schema.svg` (schéma),
`content/maths/probabilites-conditionnelles/media/arbre-pondere.svg`
(maths), `content/pc/rlc-serie/media/regimes-uc.*` (stagée complète).
