# Refonte : plan de travail

**Statut : proposition du 2026-10-21, à valider par le propriétaire.** Rien de ce plan n'est encore exécuté.

Ce plan s'appuie sur quatre pièces :

- `01-programme-bac-maroc.md` : le programme officiel du bac marocain. Ce sont les 8 cadres de référence CNEE 2025, lus par OCR, avec les coefficients, les poids et un échantillon de 55 sujets.
- `02-comprendre-en-profondeur.md` : comment faire comprendre en profondeur. On y trouve 3Blue1Brown, ParaMaths, la science de l'apprentissage, le format de notion v3 et une banque d'environ 110 accroches historiques sourcées.
- `03-audit-framework.md` : un audit du cadre de travail, avec ce qu'il faut garder, archiver ou supprimer, et pourquoi.
- `prototypes/logarithme-v3.html` : une leçon complète au nouveau format, en 34 étapes et 3 directions visuelles.

## Ce qu'on a appris, en cinq lignes

1. **Le défaut des leçons, c'est l'ordre plus que la longueur.** Elles suivent l'ordre logique (définition, propriété, preuve). Il faut l'ordre de la compréhension : problème, intuition, nom, preuve, technique (02 §0).
2. **Les visuels vont « trop vite » parce qu'ils ont trop peu d'étapes, pas à cause du minutage.** 95 % des figures en ont 5 ou moins. Une figure-clé en demande 8 à 16, avec un seul changement par étape et des paris (02 §1, §3).
3. **Les cadres officiels 2025 sont lisibles, et le dépôt se trompait sur plusieurs points.** Il se trompait sur le seuil de rattrapage (7/20), sur l'équation y″ + ay′ + by = 0 en PC/SVT et sur les poids de PC par filière. En SVT, des domaines entiers manquent (01 §7).
4. **Le cadre de travail est devenu aussi lourd que le produit.** Il compte 46 000 lignes de vérification pour 45 000 de produit, et la CI prend 52 à 60 minutes par poussée. On peut viser environ 12 minutes sans perdre ce qui protège l'élève (03 §0).
5. **Pour la génération massive d'exercices (Haiku), le vérificateur est le préalable.** Aujourd'hui, 2,4 % seulement des égalités du corpus sont vérifiables numériquement (03 §0, point 10).

## Ordre proposé

| Phase | Quoi | Pourquoi d'abord | Bloqué par |
|---|---|---|---|
| **0. Trouver le format** | Le propriétaire teste le prototype logarithme, puis on itère jusqu'à la bonne version : rythme, voix, histoire, direction visuelle. | Tout le reste en dépend : on ne régénère pas 50 notions dans un format qui n'est pas le bon. | Le retour du propriétaire. |
| **1. Alléger le cadre** | Créer un tag d'archive, alléger la CI, archiver scripts et documents, passer de 17 à 11 agents, réduire les règles à une page (03 §6–§8). | Chaque itération des phases suivantes en sera plus rapide. Peut se faire en parallèle de la phase 0. | Le feu vert du propriétaire pour archiver. |
| **2. Structure calquée sur le Maroc** | Filière → matière → créneau d'examen → domaine → chapitre → capacité officielle (01 §5). Corriger les écarts (01 §7). Dégeler la SVT, avec ses domaines manquants. | Les exercices générés et les sujets personnalisés s'accrochent aux capacités officielles. | Aucun. |
| **3. Vérificateur, puis générateur** | Vérification par code (numérique et symbolique), puis Sonnet sur les cas que le code ne tranche pas, puis un échantillon relu par Opus. Ensuite seulement, un générateur Haiku par capacité. Puis le modèle d'élève et les sujets bac personnalisés. | C'est la promesse « des centaines d'exercices qui attaquent les lacunes ». Sans vérificateur, on publierait des erreurs en masse. | Phase 2 (les capacités). |
| **4. Refonte de l'interface (ordinateur d'abord)** | Nouveau cadre visuel, examens en pleine largeur, lecteur de leçon par étapes (celui du prototype) en composant Next.js. | Le format validé en phase 0 devient le produit. | Phase 0. |
| **5. Déploiement notion par notion** | 3 notions pilotes (logarithme, décroissance radioactive, nombres complexes), puis toutes, SVT comprise. | Le coût de production est le risque principal (02 §6) : on le mesure sur 3 notions avant de généraliser. | Phases 0 et 4. |

## Décisions attendues du propriétaire

1. **Le format** : après avoir joué le prototype, qu'est-ce qui marche, qu'est-ce qui est encore trop rapide, trop lent ou trop chargé ?
2. **La direction visuelle** : Ardoise, Tableau vert, Encre, ou autre chose.
3. **L'allègement** : feu vert pour archiver (tag `archive/avant-refonte-2026-10`, puis les 5 commits de 03 §8) ?
4. **ParaMaths** : regarder 2 ou 3 épisodes et noter les moments précis qui accrochent (02, questions ouvertes).
5. **Les chaînes que les élèves marocains utilisent vraiment** : aucun classement fiable trouvé.
6. **La darija** : une glose en darija serait-elle bienvenue ?
