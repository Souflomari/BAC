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
  foreignObject/gradients.
- `viewBox` seul (pas de width/height) ; autonome ; statique.
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
2. Grep anti-contrat : `grep -E '#[0-9a-fA-F]{3,6}|currentColor|foreignObject'` vide.
3. Rendu réel : build + screenshot (shots.mjs) clair + sombre — REGARDER
   (collisions d'étiquettes = le défaut n°1 constaté).
4. aria-label français ajouté à `FIGURE_ARIA_LABELS` (NotionBody.tsx) ;
   schéma structurel → `STRUCTURAL_SLUGS` (MediaDiagram.tsx).

Références or : `content/pc/rc-charge/media/uc-charge.svg` (courbe),
`content/pc/dipole-rl/media/rl-schema.svg` (schéma),
`content/maths/probabilites-conditionnelles/media/arbre-pondere.svg`
(maths), `content/pc/rlc-serie/media/regimes-uc.*` (stagée complète).
