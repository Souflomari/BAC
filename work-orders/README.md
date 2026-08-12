# Les bons de travail

Un **bon** = une tâche, un agent, un fichier. Autoportant : un agent qui
a lu `docs/ops/SCENE-CONTRACT.md` et son bon n'a besoin de rien d'autre.

## Amorce à donner à un agent

> Lis `docs/ops/SCENE-CONTRACT.md` en entier, puis exécute
> `work-orders/<le bon>.md`. Ne touche à aucun fichier hors de ceux que
> le bon nomme. Ne modifie ni le contrat, ni `animations/bac_scene.py`,
> ni une scène déjà `validé`. Franchis les six portes dans l'ordre et
> **colle la sortie réelle de chacune** dans le bloc RÉSULTAT du bon.
> Si la banque semble incohérente, ARRÊTE-toi et écris-le : ne corrige
> jamais la banque.

## Règles de circulation

- **Un bon à la fois par agent.** Plusieurs agents en parallèle : oui,
  mais sur des bons différents (donc des fichiers différents).
- **Pas deux rendus Manim simultanés** sans nécessité sur la même
  machine : une course sur dvisvgm a déjà fait échouer un rendu sain.
  Si un rendu échoue bizarrement, **relance-le seul avant de
  diagnostiquer**.
- `git pull` avant de commencer ; un commit par bon terminé.
- Les seuls points de contact entre bons : `animations/manifest.yaml`
  (une ligne par scène) et `LEDGER.md` (append-only). Conflits triviaux.

## Ordre conseillé

1. `BT-000-gardes-structurels.md` — monte les deux gardes dans
   `bac_scene.py`. **À faire en premier : tout le reste en hérite.**
2. `BT-001-graduations.md` — rattrape les 14 scènes validées sans
   graduations numériques (nouvelle exigence owner).
3. `BT-002-scenes-en-cours.md` — finit les deux scènes interrompues.
4. Ensuite, les `BT-<notion>-<entrée>.md` dans l'ordre du manifeste.

## Régénérer

```bash
python scripts/make-work-order.py           # tous les « a-produire »
python scripts/make-work-order.py --ledger  # seulement le journal
```

Les bons se **génèrent** : ils ne s'écrivent pas à la main, pour qu'ils
ne puissent pas mentir sur les numéros de ligne d'une banque qui bouge.
(Les trois bons `BT-00x` ci-dessus sont l'exception : ce sont des
tâches de chantier, pas des scènes.)
