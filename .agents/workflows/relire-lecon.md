---
description: Relire une leçon pilote livrée, en lecture seule, et rendre la liste triée de ses défauts
---

# Relire une leçon

Rôle : [`.claude/agents/pedagogy-critic.md`](../../.claude/agents/pedagogy-critic.md). **Conversation
neuve, et si possible un autre modèle que celui qui a écrit** : celui qui a écrit ne voit pas ses propres
fuites. Tu ne modifies rien.

Lis le moteur de la leçon, ses scènes, ses outils, ses exercices, son plan (section 0), et ouvre la
leçon dans le navigateur. Cherche, avec la clé de l'étape à chaque fois :

1. **La réponse donnée avant la question** : à l'écran (titre de partie, titre et sous-titre de scène,
   légendes, lectures, figure, fiches de mots) ou par l'étape précédente (texte, note, rétroactions, révélation).
2. **Les options** : bonne réponse seule chiffrée, plus longue, seule justifiée ; leurre qui s'annonce ;
   leurre que l'écran contredit ; leurre qui n'attrape aucune erreur réelle ; question oui/non.
3. **Le fond** : erreur de science ou d'écriture ; un geste enseigné ici et compté faux ailleurs ; un
   nombre écrit à la main ; un fait « à vérifier » affiché.
4. **L'ordre** : notion utilisée avant d'être construite ; plus de cinq étapes sans question.
5. **L'exemple du bac** : la pensée d'expert (pourquoi ce geste), pas seulement le calcul.
6. **Les animations, en mouvement réel** : rien ne saute, ne se chevauche, ni ne montre la réponse en route.
7. **Les exercices** : 30 tirages par gabarit ; deux réponses égales en valeur ; énoncé mal formé ;
   étiquette d'erreur qui ne correspond pas au piège.

Rends un rapport dans le dossier `docs/revue-externe/rapports/`, trié « bloquant / à corriger / à
discuter ». Pour chaque point : la clé, le défaut en une phrase avec fichier et ligne, la correction en une
phrase. Pas de compliments. Termine par le décompte. Ne signale que ce que tu as vérifié.
