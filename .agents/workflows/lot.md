---
description: Traiter d'affilée, sans s'arrêter, toutes les lignes ouvertes de la file docs/revue-externe/FILE-ANTIGRAVITY.md
---

# Traiter un lot

Tu travailles longtemps et seul. La file est [`docs/revue-externe/FILE-ANTIGRAVITY.md`](../../docs/revue-externe/FILE-ANTIGRAVITY.md).
On te dit quel **genre** de lignes traiter (`corriger`, `planifier`, `ecrire` ou `relire`) ; tu les prends
dans l'ordre de la file, l'une après l'autre, jusqu'à la dernière.

## La boucle

Pour chaque ligne du genre demandé dont l'état est « à faire » :

1. Mets-toi sur la branche indiquée (crée-la depuis `claude/vibrant-fermi-v1lxj5` à jour si elle n'existe pas).
2. Applique le flux de la ligne ([`planifier-lecon`](planifier-lecon.md), [`ecrire-lecon`](ecrire-lecon.md),
   [`relire-lecon`](relire-lecon.md), [`corriger-lecon`](corriger-lecon.md)) en entier.
3. Pousse, ouvre ou mets à jour la PR brouillon vers `claude/vibrant-fermi-v1lxj5`.
4. Sur la branche `antigravity/file`, mets la ligne à jour dans la file : état, numéro de PR, une phrase
   de bilan (pour une relecture : le décompte). Pousse. **C'est ce qui permet de reprendre après une coupure.**
5. Passe à la ligne suivante sans attendre de réponse.

## Tu ne poses pas de question

- Une décision ouverte dans un plan : prends le choix par défaut du plan et note-le dans la PR.
- Aucune couleur nouvelle, aucun changement du lecteur (`noyau.js`), aucune leçon importée dans une autre.
- Un contrôle rouge : corrige et relance, deux fois au plus. S'il reste rouge, écris « bloquée » dans la
  file avec la raison en une phrase, et passe à la ligne suivante. Ne pousse jamais un contrôle rouge.

## Pour tenir la distance

- `npm ci` dans `web/` une seule fois par lot.
- Travaille sous `npx next dev` ; **ne lance pas `next build`** : la CI de la PR le fait.
- Ne relis pas les fichiers communs à chaque ligne (lecteur, scripts de contrôle, règles) : une fois par lot.
- Une ligne = un travail fermé. Ne reviens pas sur une ligne terminée.

## À la fin du lot

Un seul message : pour chaque ligne, son état, sa PR et son bilan ; puis ce que tu n'as pas pu vérifier.
