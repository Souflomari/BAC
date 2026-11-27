# ADR 0044 — Des exercices générés pour les pilotes, et un second essai dans les leçons

- **Date** : 2026-10-27
- **Statut** : accepté (décision de construction, dans le cadre de la V3 des pilotes)

## Contexte

Le propriétaire a demandé que chaque pilote ait ses exercices, pour tout relire d'un coup. L'audit
de la v2 ([`refonte/05-audit-v2-plan-v3.md`](../refonte/05-audit-v2-plan-v3.md)) a montré que les
questions des leçons étaient devinables (la bonne réponse presque toujours en premier) et que la
bonne option s'affichait dès la première erreur, sans laisser l'élève se corriger.

## Décision

- **Un exercice est un gabarit, pas un texte.** Il reçoit un tirage reproductible (une graine) et
  rend un énoncé chiffré, ses questions et sa correction ligne par ligne. La réponse est calculée
  par le code, jamais saisie à la main ; chaque mauvaise réponse prévue (option fausse, valeur
  piège, réponse écrite piège) porte son explication et le nom de l'erreur classique qu'elle
  trahit. Le format est décrit dans `web/src/components/pilote/exercices/modele.js`.
- `scripts/pilotes-exercices.mjs` rejoue 300 tirages de chaque gabarit dans la CI (job `source`) :
  capacité inconnue du référentiel, QCM sans exactement une bonne réponse, piège qui se confond
  avec la réponse, formule que KaTeX refuse, tirage non reproductible. C'est RULES 15 appliqué dès
  la conception.
- **Dans les leçons**, les options d'une question sont mélangées à chaque séance (sauf options
  ordonnées, `fixe`). Une première erreur donne un indice qui nomme l'erreur sans la réponse, puis
  un second essai ; la réponse vient après. Un pari n'est jamais noté. Le parcours automatique
  refuse une option fausse sans indice.

## Conséquences

- Les exercices des pilotes vivent dans le code (`exercices/<notion>.js`), pas encore dans
  `content/` : ils n'enregistrent rien, et le modèle apprenant ne les lit pas. Si le format est
  validé, la question de leur place (code ou contenu, et le lien avec les items YAML) sera tranchée
  avec l'extension du format aux autres notions.
- Un exercice qui dépend d'une séance pas encore écrite porte `seance: 2` : la page le range à part
  et le dit à l'élève.
