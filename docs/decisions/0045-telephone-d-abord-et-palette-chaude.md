# ADR 0045 — Le téléphone d'abord, une palette chaude, un accueil sans grand compte à rebours

- **Date** : 2026-11-23
- **Statut** : accepté (décision du propriétaire, sur le rapport externe 04)

## Contexte

Le rapport 04 de l'auditeur externe (`rapports/04-ui-ux.md`, branche `antigravity/revue` ; réponses dans [`DECISIONS.md`](../revue-externe/DECISIONS.md)) a mesuré le coût du « bureau d'abord » sur téléphone : un accueil de
5 791 px, 67 cibles tactiles sous 40 px, un chiffre de 176 px au-dessus de l'action du jour. Les
surfaces `#FFFFFF` et `#0A0A0A` contredisaient la bible elle-même (« ni noir pur ni blanc pur »).

## Décision

1. **Le téléphone d'abord.** Chaque écran se conçoit à 390 × 844, puis prend de l'air sur
   ordinateur. `DESIGN-BIBLE.md` §1 est réécrit en ce sens.
2. **Une palette chaude.** Fond papier (`#FAFAF7`), charbon chaud en sombre (`#121210`), et un rouge
   signal plus doux (`#C81E2B` clair, `#F04E5A` sombre) au lieu de `#E3051B` / `#FF2A3B`. Les
   contrastes restent vérifiés par `contrast-gate.mjs`.
3. **L'accueil commence par la séance du jour.** Le grand compte à rebours devient une ligne
   factuelle (date estimée, semaines restantes).

## Conséquences

La refonte de l'interface (`revue-externe/MANDAT-UI.md`) suit ces trois choix, PR par PR, à commencer
par les jetons.
