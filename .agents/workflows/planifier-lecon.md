---
description: Écrire le plan d'auteur d'une leçon pilote (docs/refonte/specs/<nom>.md) à partir du cadre officiel, de la bible et des sujets
---

# Planifier une leçon

Rôle : [`.claude/agents/notion-designer.md`](../../.claude/agents/notion-designer.md). Tu écris un seul
fichier, le plan ; aucune ligne de code.

1. Lis la fiche de la notion dans `docs/bible/`, ses capacités dans `docs/referentiel/` (mot pour mot,
   cite les identifiants, dis ce qui relève de SM, PC, SVT), ses questions d'examen dans `docs/sujets/`,
   et l'ancienne leçon dans `content/` (à miner, pas à porter).
2. Prends pour modèle de forme le plan le plus proche dans `docs/refonte/specs/` (même matière) et sa
   leçon livrée : mêmes sections, même niveau de détail.
3. **Format allégé** : 30 à 35 étapes, 6 gabarits d'exercices, et les scènes existantes de la matière
   réutilisées. Au plus une scène d'un type nouveau, et seulement si la figure-clé l'exige ; dis-le en tête.
4. Écris dans le plan lui-même, pour chaque étape à question : la conception erronée que chaque leurre
   attrape ; des options de même forme ; rien, dans le titre de la partie ni dans l'étape précédente, qui
   donne la réponse. Vérifie à la main que deux leurres ne tombent ni sur la même valeur ni sur la bonne.
5. Tout nombre est « à recalculer par le code ». Tout fait ou chiffre non sourcé est marqué « à
   vérifier » et ne s'affichera pas.
6. Termine le plan par les décisions à trancher, **chacune avec ton choix par défaut** : c'est ce choix
   que l'écriture suivra si personne ne répond.
