---
name: verification
description: La vérité rendue et déployée — lancer/étendre dom-truth, screenshots, langage de statut. Déclencheurs — tout commit touchant web/ ou content/, toute demande de vérifier/tester/screenshoter, toute annonce de déploiement, tout changement de modèle exécutant.
---

# verification — rien n'est vrai tant que ce n'est pas rendu

## Les trois jambes (aucune ne remplace l'autre — HANDOFF §5)

1. **dom-truth** : `cd /home/user/BAC/web && node scripts/dom-truth.mjs`
   (**253 contrôles au 2026-09-05**, deux fois si un échec ne se reproduit
   pas — le boot à froid flake). Boot autonome port 3200+(pid%500) ; vérifie
   le build stamp == HEAD (attrape le .next périmé).
   *(Ce nombre disait « 121+ » jusqu'au 2026-09-05, soit moins de la moitié
   du réel : un chiffre écrit dans une compétence TOUJOURS chargée, que rien
   ne réexécute, vieillit comme les autres.)*
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

## Les portes, et l'ordre où les lancer

dom-truth n'est qu'une des portes. La liste complète et ce que chacune juge
vit dans `docs/audits/INSTRUMENTS.md` ; l'ordre d'exécution est celui de
`.github/workflows/gates.yml`. En local, du moins cher au plus cher :

```sh
cd /home/user/BAC/web
npm run test-learner-model && npm run test-attempt-events   # sans navigateur
node scripts/liens-fichiers.mjs --porte                     # sans navigateur
node scripts/validate-content.mjs --strict $(cd .. && ls -d content/*/*/)
node scripts/couverture-diagnostique.mjs --porte
node scripts/resume-couverture.mjs --porte
node scripts/indice-longueur.mjs --porte
node scripts/indice-absolu.mjs --porte
npm run build
npm run dom-truth                                           # ~15 min
node scripts/ancres-uniques.mjs --porte
node scripts/donnees-sweep.mjs --porte
```

Deux règles qui les gouvernent toutes :

- **Une porte ne s'arme que sur une classe PROPRE.** Sinon l'instrument
  reste un OUTIL et la dette s'écrit — une porte armée sur une classe sale
  est désarmée la semaine suivante.
- **Toute exception vit dans le fichier**, et NOMME sa cible :
  `RECOUVREMENT ASSUMÉ:`, `DETTE OWNER:`, `CHEMIN DISPARU:`,
  `data-hors-panneau`. Un marqueur qui vaudrait pour tout un fichier ferait
  taire l'instrument pour l'accident qu'on y introduira demain.

## Langage de statut (§13) et discipline

- Jamais « déployé/en ligne » sans vérification du déploiement : dire
  « poussé, déploiement non vérifié ». Les webhooks Vercel sont des
  rapports de plateforme, pas des vérifications.
- Échec de test → le rapporter tel quel avec la sortie ; étape sautée →
  le dire ; honest-state s'applique aux rapports d'agent aussi.
- **Swap de modèle** : re-lancer dom-truth + une passe gestalt AVANT tout
  travail nouveau.
- `git` depuis `/home/user/BAC` (jamais depuis web/ — le cwd persiste).
