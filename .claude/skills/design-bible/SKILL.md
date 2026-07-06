---
name: design-bible
description: Charge la discipline design du projet avant TOUT travail UI — composants, pages, CSS, tokens, review visuelle. Déclencheurs — toute tâche touchant web/src/components, web/src/app, globals.css, tailwind.config, ou tout mot de type UI/design/layout/thème/couleur/typo.
---

# design-bible — la discipline avant le pixel

## Mode audit D'ABORD

Avant de générer quoi que ce soit : dresser la **feuille de charge** contre
la bible — lister ce que la tâche risque de violer (une ligne par risque,
ancre de section), PUIS produire. Générer d'abord et vérifier ensuite est
le mode d'échec documenté du sprint.

## Lectures obligatoires (dans cet ordre)

1. `docs/Product/DESIGN-BIBLE.md` — la loi. §0 cœur calme · §5 motion ·
   §7 une-idée-par-écran · §8 périphérie fonctionnelle · §10 le test du
   regard · §11 codes rungs jamais visibles (data-attributes) ·
   §12–13 rendered/deployed-truth.
2. `docs/design/TOKENS.md` + `web/src/app/globals.css` — tokens
   SEULEMENT ; jamais de hex dans les composants ni les figures.
3. `docs/design/PAGE-ANATOMY-SPECS.md` + `COMPONENT-STATES.md` — anatomies
   figées (A3/B1/C1, M1/W3) et états de composants.

## Les règles négatives (non négociables)

- Pas de ripple, FAB, bottom-nav, overshoot/bounce, autoplay,
  scroll-trigger, parallaxe, théâtre d'engagement (streaks/XP/badges).
- Prose = 65ch ; le cœur d'apprentissage n'a qu'UNE action primaire.
- prefers-reduced-motion respecté partout (filet global 0,01ms +
  branchements composant).
- Honest-state : rien d'affiché qui fabrique du progrès ou de l'état.
- Français d'abord : typographie via `frenchTypography`, aria-labels
  français rédigés à la main.

## Le test §10

Screenshot le rendu réel (jamais le JSX imaginé) et REGARDE : est-ce calme,
posé, éditorial ? Comparer aux ancres `docs/design/AUDIT-SCORECARD.md`.
Un doute = une ligne au ledger (`docs/audits/fable-day3-ledger.md`),
statut FABLE-/MODEL-DECIDED / OWNER-REVIEW-PENDING.
