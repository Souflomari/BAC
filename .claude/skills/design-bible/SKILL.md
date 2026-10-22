---
name: design-bible
description: Charge la discipline design du projet avant tout travail d'interface — composants, pages, CSS, jetons, revue visuelle. Déclencheurs — toute tâche touchant web/src/components, web/src/app, globals.css, tokens.ts, ou tout mot de type UI, design, mise en page, thème, couleur, typographie.
---

# design-bible — la discipline avant le pixel

## À lire

1. `docs/product/DESIGN-BIBLE.md` — la loi : §0 cœur calme, §5 mouvement, §7 une idée par écran,
   §8 périphérie fonctionnelle, §10 le test du regard, §11 aucun code interne visible.
2. `docs/design/TOKENS.md` et `web/src/lib/tokens.ts` — les jetons, seulement les jetons : jamais
   de couleur brute dans un composant ou une figure (`scripts/token-gate.mjs`).
3. `docs/design/PAGE-ANATOMY-SPECS.md` et `docs/design/COMPONENT-STATES.md` — les anatomies de
   page et les états des composants.

Le style courant est **Grille** (refonte 2026-10) : typographie suisse (Archivo), surfaces
blanches, encre quasi noire, un seul rouge (`signal`) réservé à ce qui demande d'agir. Les quatre
directions explorées vivent dans `docs/refonte/design/`.

## Les règles négatives

- Pas de ripple, de bouton flottant, de barre de navigation en bas, de rebond, de lecture
  automatique, de déclenchement au défilement, de parallaxe, de théâtre d'engagement (séries, XP,
  badges).
- Prose à 65 caractères ; le cœur d'apprentissage n'a qu'une action primaire.
- `prefers-reduced-motion` respecté partout.
- État honnête : rien d'affiché qui fabrique du progrès ou de l'état.
- Français d'abord : typographie par `frenchTypography`, libellés ARIA rédigés en français.

## Le test du regard (§10)

Capturer le rendu réel et le REGARDER, en clair et en sombre, au bureau et au téléphone : est-ce
calme, posé, lisible ? En cas de doute, le dire au propriétaire avec la capture.
