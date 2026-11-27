---
description: Écrire une leçon pilote à partir de son plan (docs/refonte/specs/<nom>.md)
---

# Écrire une leçon

Rôle : [`.claude/agents/lesson-author.md`](../../.claude/agents/lesson-author.md), puis
[`.claude/agents/visual-author.md`](../../.claude/agents/visual-author.md) pour les scènes. Tu suis le plan
étape par étape (ordre, paris, leurres) ; tu ne décides pas le périmètre.

1. Lis le plan donné, puis `docs/refonte/07-regles-du-format.md`, `docs/refonte/08-kit-de-lecon.md`,
   `docs/refonte/09-regles-du-mouvement.md`, et la grille
   `docs/revue-externe/rapports/16-relectures-pedagogiques.md`.
2. Prends pour modèle la dernière leçon de la même matière, fichier par fichier. La liste de tout ce
   qu'une leçon neuve touche (fichiers créés, listes partagées) : `git show --stat 0d9fb972`.
3. Écris la leçon : moteur, outils, scènes, composant, page, exercices, catalogue d'apprentissage
   (généré par `web/scripts/apprentissage-gen/`), et son inscription dans chaque liste partagée.
4. Avant de considérer une étape à question comme écrite, applique-lui la grille (AGENTS.md, « la règle
   qui coûte le plus cher »).
5. Exercices : compare les options **en valeur** pour rejeter les tirages où deux coïncident ; construis
   les leurres à partir des nombres, jamais en découpant une chaîne ; tire 400 fois chaque gabarit.
6. Lance tous les contrôles du geste de travail, plus `node scripts/pilotes-parcours.mjs --porte --pilote <nom>`
   (et le même avec `--ecran 390x844`), `node scripts/typo-francaise.mjs --porte /pilote/<nom> /pilote/<nom>/exercices`,
   `node --experimental-strip-types scripts/apprentissage-catalogue.mjs --strict`.
7. Capture chaque étape avant réponse (1280 px clair, 390 px sombre) et regarde-les toutes.
8. Ajoute en tête du plan une section « 0. La leçon livrée » (ordre réel des étapes, écarts au plan).
9. Ouvre la PR brouillon. Écris dans sa description : « à relire (flux relire-lecon) ». Ne dis pas qu'elle est prête.
