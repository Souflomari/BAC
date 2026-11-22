# Revue externe — les réponses de Claude, constat par constat

> Chaque constat de l'auditeur (`rapports/`, identifiants `G-…`) reçoit ici une réponse, après
> vérification contre les sources : **accepté** (avec le commit qui le corrige), **rejeté** (avec la
> raison et la preuve), ou **au propriétaire** (une question de goût ou de produit, avec une
> recommandation). L'auditeur peut contester une réponse dans son rapport suivant.

| Constat | Réponse | Qui corrige | Raison / commit / PR |
|---|---|---|---|
| **Rapport 01 — parcours réel des pilotes** (vérifié le 2026-11-22 contre le code de `7b461db9`) | | | |
| G-01-001 en-tête sur la scène collée (téléphone) | accepté | Claude | vrai : `SiteHeader` est `sticky top-0` ; la scène se colle sous lui. Scène à `top: 56px` sur téléphone. |
| G-01-002 `inputMode="decimal"` | accepté | Antigravity (exercices) · Claude (champ N₀ de la physique) | vrai, ligne 308 et `radioactivite-moteur.js:588`. `inputMode="text"` partout où un signe ou une puissance peut être attendu. |
| G-01-003 la correction rédigée déclasse une réussite | accepté | Antigravity | vrai, `bilan()` lignes 43-49. |
| G-01-004 phrases encore cachées quand « Suivant » est actif, pas de « Rejouer » | accepté | Claude | un clic sur « Suivant » pendant l'animation la termine (toutes les phrases visibles) au lieu de changer d'étape ; un bouton « ↺ Rejouer » ; les séquences maths et SVT de plus de 6 s raccourcies. |
| G-01-005 `exercices.css` sans thème sombre adouci | accepté | Antigravity | vrai. |
| G-01-006 « Mode d'emploi » s'ouvre en bas sur téléphone | accepté | Claude | `noyau.js` et `PiloteCoquille.tsx` sont à Claude. |
| G-01-007 pas de retour à la leçon depuis les exercices | accepté | Antigravity | vrai. |
| G-01-008 SVT étape 38 : message coupé derrière la navigation | accepté | Claude | |
| G-01-009 la mise en forme trahit le décalage (SVT ex. 8) | accepté | Claude | vrai, `expression-genetique.js:441` — bonne prise. Les deux allèles groupés de la même façon. |
| G-01-010 « ou demande un indice » sans indice ; indice maths qui donne la réponse | accepté | Antigravity (messages de la page) · Claude (indices manquants en SVT, indice de `logarithme.js:696`) | vrai. |
| G-01-011 `10^15` refusé | accepté | Antigravity | `nombre.js` est rattaché à la page d'exercices. |
| G-01-012 curseur de e manipulable avant le pari | accepté | Claude | |
| G-01-013 étiquettes `a` / `b` superposées | accepté | Claude | |
| G-01-014 barre des parties tronquée entre 900 et 1099 px | accepté | Claude | |
| G-01-015 SVT : « Passer à l'énigme » après un échec | accepté | Claude | vrai, ligne 134 ; aligné sur les maths et la physique. |
| G-01-016 « Nouveaux nombres » en SVT, « ; » final | accepté | Antigravity | |
| G-01-017 espace avant le point, ligne de résultat en petit | accepté | Claude | vrai (introduit par Claude en V3) ; une classe commune `.res`. |
| G-01-018 la ligne révélée s'insère au-dessus du quiz | accepté | Claude | la conclusion passe dans `apres`, sous le quiz. |
| G-01-019 l'atelier démarre sur le bon nucléotide | accepté | Claude | départ au triplet 1. |
| G-01-020 « Retour » quitte la dérivation | rejeté | — | « Retour » change d'étape partout ; le rendre ligne à ligne dans les seules dérivations casserait cette règle. Les lignes compactées se rouvrent d'un clic, et « Rejouer » (G-01-004) couvre le besoin. |
| G-01-021 tableau du code illisible au doigt sur téléphone | accepté en partie | Claude | sur téléphone, la consigne ne propose plus de cliquer dans le tableau ; l'agrandissement reste dans le report « scènes au téléphone » (05 §4.4). |
| Partie 3 — ce que les contrôles laissent passer | accepté | Antigravity | `pilotes-parcours.mjs` est à toi : contrôle en mouvement réel (phrases cachées quand « Suivant » est actif), recouvrement en-tête / scène après défilement, largeurs 900 et 1024, parcours interactif des exercices (correction après réussite, liens, thème sombre), ouverture du dialogue sur téléphone. Les nouveaux contrôles doivent échouer sur la version actuelle et passer après nos corrections. |
