# ADR 0046 — Le format de leçon v3 est validé ; pas de comptes pour l'instant

- **Date** : 2026-11-23
- **Statut** : accepté (décision du propriétaire)

## Contexte

Le format v3 attendait la validation du propriétaire sur trois pilotes (maths, physique, SVT), avec
l'interdiction de l'étendre avant son accord. Après la revue externe, les améliorations du
2026-11-23 et l'écriture des règles du format
([`refonte/07-regles-du-format.md`](../refonte/07-regles-du-format.md)), deux questions bloquaient
la suite ([`refonte/06-plan-lancement.md`](../refonte/06-plan-lancement.md) §5) : le format, et les
comptes.

## Décision

1. **Le format v3 est validé.** Il peut être étendu aux autres notions, dans les conditions des
   règles du format : contrôles automatiques verts, puis relecture d'exactitude et de pédagogie par
   un modèle plus fort que celui qui a écrit.
2. **On reste sans compte pour le moment.** Les comptes seront ajoutés juste avant le lancement.
   D'ici là, ce qui concerne l'élève (reprise d'une leçon, puis journal d'apprentissage) vit sur
   son appareil, dans le stockage local, et rien n'est envoyé.

## Conséquences

- La refonte des 59 notions restantes peut commencer, une notion à la fois.
- Le modèle d'apprentissage ([`design/APPRENTISSAGE-DONNEES.md`](../design/APPRENTISSAGE-DONNEES.md))
  se construit d'abord en local (ses étapes « sans base ») ; la partie serveur attend les comptes.
- Les opérations de production liées aux comptes (migrations 048 à 051, mot de passe oublié,
  suppression de compte, limites de débit, sauvegardes) se font juste avant le lancement, pas avant.
- Reste ouvert : les matières annoncées au lancement (sciences de l'ingénieur vide, anglais absent,
  philosophie en français alors que l'épreuve est en arabe).
