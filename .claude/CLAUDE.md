# CLAUDE.md

> Lu automatiquement au début de chaque session. C'est un **index** : il pointe vers les documents
> qui comptent et ne porte que les faits toujours en vigueur.

## Le projet

Une application de préparation au baccalauréat marocain pour les filières scientifiques (SM-A,
SM-B, Sciences Physiques, SVT — 2ème Bac, en français). Le but : remplacer les cours particuliers par
un tuteur patient, exact et toujours disponible, qui mène un élève en difficulté jusqu'à la réussite
au bac.

## Lire, selon la tâche

| Document | Pour |
|---|---|
| [`docs/product/VISION.md`](../docs/product/VISION.md) | toute décision produit : ce que l'application est, et pourquoi |
| [`docs/Rules/RULES.md`](../docs/Rules/RULES.md) | comment on travaille (une page, 21 règles) |
| [`docs/ETAT.md`](../docs/ETAT.md) | où on en est, et les décisions attendues du propriétaire |
| [`docs/bible/`](../docs/bible/README.md) | notion par notion : ce que demande le bac, prérequis, pièges, représentations, histoire |
| [`docs/referentiel/`](../docs/referentiel/README.md) | ce que l'examen national teste, mot pour mot des cadres officiels 2025 |
| [`docs/refonte/`](../docs/refonte/00-plan.md) | le plan de refonte, le programme du bac (01), le format de leçon v3 (02) |
| [`docs/product/DESIGN-BIBLE.md`](../docs/product/DESIGN-BIBLE.md), [`docs/design/TOKENS.md`](../docs/design/TOKENS.md) | tout travail d'interface |
| [`docs/LOCAL-TRANSITION.md`](../docs/LOCAL-TRANSITION.md) | installer et travailler sur une machine locale |
| [`docs/decisions/`](../docs/decisions/) | l'histoire des décisions (ADR, en ajout seul) — à consulter, pas à relire |

## La pile

- **Frontend** : Next.js (App Router) + React + Tailwind dans `web/`, déployé sur **Vercel**.
- **Backend** : Supabase (Postgres, Auth, Storage, Edge Functions), projet `iwoydyudjondihzzsqay`,
  EU-Central.
- **Design** : une seule source, `web/src/lib/tokens.ts` (génère les variables CSS et la config
  Tailwind) ; le code ne parle qu'en alias de jetons (`scripts/token-gate.mjs`).
- **Contenu** : des fichiers sous `content/` (leçons Markdown, items YAML), validés par
  `web/scripts/validate-content.mjs`.

## Sécurité de production — toujours en vigueur

- **Les poussées en production sont décidées par un humain. Toujours.** Aucune poussée autonome.
- **Aucune poussée en production sans branch-test vert** contre staging (`scripts/branch-test.ps1`, ADR 0005).
- **Chaque migration porte un bloc de vérification qui affirme la cardinalité** après coup, pas
  seulement la structure (leçon : migration 046).
- **RLS activée dans la migration qui crée la table** ; les RPC d'écriture d'état utilisateur sont
  réservées à `service_role` (leçons : migrations 040, 047).
- **Aucun changement de production hors fichier de migration.** L'éditeur SQL du tableau de bord
  sert à lire (leçon : les 73 arêtes non suivies, ADR 0003).
- **Une migration passée en production ne se modifie jamais** : on en écrit une nouvelle.
- **La synchronisation de production n'est pas vérifiée.** Avant toute nouvelle migration,
  vérifier en séance supervisée que l'état de production correspond à l'historique local.

## Le geste de travail

- Travailler sur la branche, jamais sur `main` (`main` = production).
- Avant chaque poussée : `scripts/verif-commit.sh` (le job `source` de la CI, sur le commit).
- La CI (`.github/workflows/ci.yml`) doit être verte sur le commit poussé avant de dire « fait ».
- Une décision durable fait un ADR court ; l'état courant se réécrit dans `docs/ETAT.md`.

## Le rappel

Tout ici sert la vision : un tuteur calme, profond, infiniment patient, qui mène un élève en
difficulté à la maîtrise du bac. Quand une décision de construction et la vision divergent, la vision
l'emporte — ou on la révise délibérément, jamais par accident.
