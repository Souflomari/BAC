---
name: verification
description: La vérité rendue et déployée — lancer dom-truth et les contrôles, faire des captures et les regarder, dire honnêtement l'état. Déclencheurs — tout commit touchant web/ ou content/, toute demande de vérifier, tester ou capturer, toute annonce de déploiement.
---

# verification — rien n'est vrai tant que ce n'est pas rendu

## Les trois regards

1. **Les contrôles** : la CI (`.github/workflows/ci.yml`) et, en local, `scripts/verif-commit.sh`
   (le job `source`) puis, après `npm run build`, les contrôles avec navigateur dont la tâche a
   besoin : `npm run pw -- <contrôle> --porte` (depuis `web/`). `dom-truth` démarre son propre
   serveur et vérifie que le build servi correspond à HEAD ; s'il échoue une fois sans se
   reproduire, le relancer (démarrage à froid).
2. **Le regard** : faire une capture du rendu réel (Playwright, ou `web/scripts/shots.mjs`) et la
   REGARDER. Calme, posé, lisible ? Le JSX imaginé ne compte pas.
3. **L'œil du propriétaire** : sur l'aperçu Vercel de la branche, périodiquement. C'est lui qui juge
   le produit.

## Pièges connus

- **Serveur périmé** : `pkill -f "next start"` ne tue pas `next-server`. Tuer par
  `pgrep -f next-server | xargs kill`, puis vérifier qu'une page fraîche est servie AVANT de croire
  une capture ou un contrôle.
- **Ne jamais mesurer pendant un build** ou pendant qu'un autre contrôle avec navigateur tourne :
  page non stylée, serveur tué, verdict faux.
- **Chapitre caché** : un contrôle sur un élément d'un chapitre replié lit du texte pollué ; le
  pointer sur son lien profond `?chapitre=n`.

## Étendre dom-truth (`web/scripts/dom-truth.mjs`)

- La batterie est un tableau de cas (`sel`, `present`, `text`, `notText`, `absentSel`). Le contenu
  gardé avant une action se teste par son ABSENCE réelle du DOM (`absentSel`), jamais par un
  `display:none`.
- On garde une CLASSE de défaut (le lexique interne, la mesure de ligne), pas une instance.
- Les conditions du contrôle couvrent celles de l'élève : thème réel, largeurs réelles, vrais
  parcours.

## Dire l'état

- Jamais « déployé » ou « en ligne » sans l'avoir vérifié : dire « poussé, déploiement non
  vérifié ». Une notification Vercel est un rapport de plateforme, pas une vérification.
- Un contrôle rouge se rapporte tel quel, avec sa sortie ; une étape sautée se dit.
- Un contrôle neuf doit avoir été vu rouge une fois avant d'être cru (règle 13).
