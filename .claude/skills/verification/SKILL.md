---
name: verification
description: La vérité rendue et déployée — lancer/étendre dom-truth, screenshots, langage de statut. Déclencheurs — tout commit touchant web/ ou content/, toute demande de vérifier/tester/screenshoter, toute annonce de déploiement, tout changement de modèle exécutant.
---

# verification — rien n'est vrai tant que ce n'est pas rendu

## Les trois jambes (aucune ne remplace l'autre — HANDOFF §5)

1. **dom-truth** : `cd /home/user/BAC/web && node scripts/dom-truth.mjs`
   (121+ verts, deux fois si un échec ne se reproduit pas — le boot à
   froid flake). Boot autonome port 3200+(pid%500) ; vérifie le build
   stamp == HEAD (attrape le .next périmé).
2. **Gestalt** : shots.mjs + REGARDER (bible §10) contre
   `docs/design/AUDIT-SCORECARD.md`.
3. **Œil externe frais** sur le site déployé, périodique, sans contexte
   repo (précédent : docs/audits/external-design-audit-2026-07.md).

## Étendre dom-truth (web/scripts/dom-truth.mjs)

- BATTERY = tableau duck-typed (~:80) : `sel/present/text/notText/
  absentSel` ; extraction dans le page.evaluate partagé (~:256) ;
  assertions (~:343). Contenu gardé pré-action : `absentSel` (absence
  RÉELLE du DOM, motif AttemptFirst) — jamais un simple display:none.
- Sweeps pleine-page après la boucle (~:437) : contraste, mesure ≤75ch,
  lexique d'auteur, stamp. **Règle des classes** : on garde une CLASSE de
  défaut (lexique, mesure), pas une instance — tout nouveau vocabulaire
  interne s'ajoute à la garde DANS LE MÊME COMMIT.
- Les conditions de vérification COUVRENT les conditions propriétaire :
  thème réel (pas classList forcé), viewports réels, chemins utilisateur.
- Pagination : les checks d'éléments dans un chapitre caché lisent du
  texte pollué (innerText ne filtre plus) — pointer le check sur son
  deep-link `?chapitre=n`.

## Screenshots (web/scripts/shots.mjs)

`BASE_URL=http://localhost:<port> node scripts/shots.mjs --slug <m>/<leçon>
--out shots/<dir>` — serveur `next start` requis. **Piège zombie** :
`pkill -f "next start"` ne tue pas `next-server` ; tuer par
`pgrep -f next-server | xargs kill` (exit 144 attendu), puis prouver par
curl qu'une chaîne fraîche est servie AVANT de croire un shot (trois
séries périmées ont été servies en une seule journée).

## Langage de statut (§13) et discipline

- Jamais « déployé/en ligne » sans vérification du déploiement : dire
  « poussé, déploiement non vérifié ». Les webhooks Vercel sont des
  rapports de plateforme, pas des vérifications.
- Échec de test → le rapporter tel quel avec la sortie ; étape sautée →
  le dire ; honest-state s'applique aux rapports d'agent aussi.
- **Swap de modèle** : re-lancer dom-truth + une passe gestalt AVANT tout
  travail nouveau.
- `git` depuis `/home/user/BAC` (jamais depuis web/ — le cwd persiste).
