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
| Rapport 01, part de Claude | corrigé | Claude | commit « Pilots: fixes from the external review, report 01 » ; contrôles verts à 1280 × 800, 1366 × 768 et 390 × 844. Les réservations de Claude sont libérées. |
| Rapport 01, part d'Antigravity | fusionné | Antigravity | branches `antigravity/exercices-ux` (b2a2f4fd) et `antigravity/controles` (38ca7735) relues et intégrées. Contrôles verts ; le contrôle « en-tête sur la scène » vérifié en réintroduisant le défaut (il échoue bien, 57 px). Réservations libérées. |
| **Rapport 07 — fidélité au bac et exactitude** (vérifié le 2026-11-22 contre le code de `8ffe20d6`) | | | |
| G-07-001 β⁻ affirmé pour Pu 238 → Np 238 | accepté | Claude | vrai, et grave : Z passe de 94 à 93, c'est β⁺. Feedback corrigé (« Ce serait β⁺ : Z − 1 »). |
| G-07-002 indice ex. 10 SVT codé pour le brin non transcrit | accepté | Claude | vrai : défaut introduit par Claude en ajoutant les indices du rapport 01. L'indice suit le brin tiré. |
| G-07-003 ex. 8 SVT : délétions / insertions ambiguës | accepté | Claude | vrai, reproduit indépendamment : 238 indels ambigus sur 1 184 (3 000 tirages). Le générateur rejette tout tirage plaçable dans un autre triplet, et toute insertion à une frontière ; contrôle après : 0 sur 1 184. |
| G-07-004 diagramme (N, Z) absent | accepté | Claude (étape de leçon) · Antigravity (exercice 12, figure SVG) | vrai, et déjà noté dans 05 §5 comme manque. Antigravity : un exercice `nz-diagramme` tagué `CAP("1.2.1.3", "1.2.1.4")`, figure SVG en jetons (`s-…`), tirages lisibles (isotope au-dessus / au-dessous de la vallée, Z > 82), vérifié par `pilotes-exercices.mjs`. Claude : une étape dans « Écrire la désintégration ». |
| G-07-005 ln a / log m non fournis (SM sans calculatrice) | accepté | Claude | vrai. « On donne ln a ≈ … » (ex. 13, 14) et « log m ≈ … » (ex. 10), à 3 décimales. |
| G-07-006 ex. 14 sans limite en +∞ ni branche infinie | accepté | Antigravity | vrai. Ajouter la limite en +∞ (factorisation par x, croissance comparée) et l'interprétation géométrique (asymptote x = 0), en QCM avec pièges commentés. |
| G-07-007 systèmes, 10^x ≤ a, primitives u′/u, lim ln(1+x)/x | accepté | Antigravity | vrai, les quatre. Varier l'ex. 10 (équation / inéquation), ajouter ln(1+x)/x au pool de l'ex. 11, deux exercices séance 2 (système ; primitive de u′/u avec ln\|u\|). |
| G-07-008 indices 12 b, 13 b, 14 d qui divulguent la question précédente | accepté | Claude | vrai. Les trois indices renvoient à « la question précédente » sans en donner la réponse. |
| G-07-009 1.2.1.14 sans question, 1.2.1.5 absente, Y* pour γ | accepté | Claude (γ : noyau fils excité dans la leçon) · Antigravity (question d'analyse dimensionnelle à l'ex. 5, définition d'un noyau radioactif en QCM) | vrai. Leçon : Ir 192 → Pt 192* + e⁻, puis Pt 192* → Pt 192 + γ. |
| G-07-010 2.2.4 annoncée, absente des exercices | accepté | Antigravity | vrai. Un exercice léger « schéma de synthèse » (figure numérotée, couples à recopier), tagué `CAP("2.2.4")`. |
| G-07-011 étiquettes pc-sm, pc-svt, maths-sm manquantes | accepté | Claude | vrai ; les 15 capacités 1.2.1 ont les mêmes identifiants et le même sens dans les trois filières (vérifié). Helper `CAP` en physique ; maths-sm 1.3.16 (et 1.3.11) aux ex. 12–14. |
| G-07-012 `x^{1}` | accepté | Claude | vrai. |
| G-07-013 polarité 3′→5′ de l'anticodon | accepté | Claude | juste : la leçon, la fiche et le retour du ribosome écrivent maintenant 3′-UAC-5′. L'étiquette de la scène (`scenes-b.js:297`) reste sans polarité, faute de place ; le texte à côté la donne. |
| G-07-014 délétions / insertions dans l'ex. 10 | accepté | Antigravity | utile. Ajouter la délétion (et l'insertion) au pool, avec le même filtre d'ambiguïté que l'ex. 8. |
| G-07-015 aucune expression littérale dans l'ex. 11 PC | accepté | Antigravity | juste : l'énoncé l'exige. Un QCM d'expression littérale avant la question 3 ou 4, sur le modèle de l'ex. 7. |
| Rapport 07, part de Claude | corrigé | Claude | commit « Pilots: fixes from the external review, report 07 ». Antigravity part de ce commit (ou d'un plus récent) : les fichiers `exercices/*.js` ont bougé. |
