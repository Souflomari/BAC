# Travailler en local

> Réécrit le 2026-10-22 après l'allègement (ADR 0042). Où en est chaque chantier :
> [`ETAT.md`](ETAT.md).

## Démarrer en cinq étapes

```bash
# 1. Cloner et se placer sur la branche de travail (tout le travail y est, pas sur main)
git clone https://github.com/Souflomari/BAC.git && cd BAC
git checkout claude/vibrant-fermi-v1lxj5

# 2. Node 22 (la version de la CI ; .nvmrc la donne, `nvm use` la prend)
nvm use

# 3. Les dépendances, et le Chromium des contrôles qui pilotent un navigateur
cd web && npm ci && npx playwright@1.61.1 install --with-deps chromium

# 4. Construire et regarder
npm run build && npm start            # http://localhost:3000 — aucun secret nécessaire

# 5. Le contrôle d'avant poussée, sur une copie propre du commit (depuis la racine)
cd .. && scripts/verif-commit.sh      # doit finir sur « exit 0 »
```

**Quelle machine.** Linux, macOS, ou **WSL2 sous Windows** (fortement conseillé : c'est l'Ubuntu de
la CI). Windows natif suffit pour éditer et pour les contrôles sans navigateur, pas pour les
contrôles avec navigateur (ils arrêtent `next start` par groupe de processus, ce que seul POSIX
fait). Exceptions : `scripts/branch-test.ps1` et `scripts/edge-function-smoke-test.ps1` sont en
PowerShell. Les fins de ligne sont fixées à LF par `.gitattributes`.

## Le geste quotidien

| Quoi | Commande (depuis `web/` sauf mention) |
|---|---|
| serveur de développement | `npm run dev` |
| valider une notion | `node scripts/validate-content.mjs content/<matière>/<notion>` |
| tous les contrôles sans navigateur (le job `source` de la CI) | `node scripts/batterie-locale.mjs` |
| **avant chaque poussée** | `scripts/verif-commit.sh [commit]` depuis la racine : la même batterie, sur une copie propre du commit |
| un contrôle avec navigateur | `npm run build`, puis `npm run pw -- <contrôle> --porte` (exemple : `npm run pw -- scene-quotient --porte`) |
| après avoir modifié des items | `npm run build-learner-inputs` |

Ne jamais lancer deux contrôles avec navigateur, ou un contrôle et un build, en même temps : les
mesures sensibles au temps deviennent instables.

## La CI

- `ci.yml`, à chaque push sur la PR : `source` (sans navigateur), `rendu`, `texte`, `telephone` ;
  environ 15 minutes.
- `scenes.yml` : les 17 scènes, seulement quand leur code, leurs descripteurs ou le design changent.
- `hebdo.yml` : chaque lundi, et à la main depuis l'onglet Actions (« Run workflow ») : impression,
  presse-papier, zoom, accents, stockage refusé, verdict des QCM sur tout le corpus, toutes les scènes.

## Git

- **Tout est sur `claude/vibrant-fermi-v1lxj5`**, porté par la PR #2 en brouillon.
- **`main` est la production.** Fusionner la PR #2, c'est déployer **et** apporter quatre migrations
  (`backend/supabase/migrations/048` à `051`) que la production n'a jamais vues. Les non-négociables de
  `.claude/CLAUDE.md` s'appliquent : branch-test vert contre staging, synchronisation vérifiée en
  séance supervisée, et ta décision explicite.
- Les anciennes branches distantes (`claude/wizardly-hypatia-2fmoui`, `reestablish-state`) sont
  antérieures à ce travail : à garder ou supprimer, à ta guise.

## Claude Code en local

- `.claude/CLAUDE.md` est lu automatiquement ; les agents (`.claude/agents/`) et les trois skills du
  projet (`design-bible`, `figure-authoring`, `verification`) fonctionnent tels quels.
- Lancer deux ou trois agents à la fois, pas plus, et commiter entre les vagues : le 2026-09-28, onze
  agents simultanés ont épuisé la limite de session et sont tous morts en cours de tâche.
- `.mcp.json` déclare deux serveurs MCP pour les médias : `gemini-image` (il faut `GEMINI_API_KEY`
  dans l'environnement) et `notebooklm`.
