# Ce qui est ENVOYÉ après une réponse — et ce qui se perd

> Écrit le 2026-09-05. Point 4 de « ce que RIEN ne mesure encore »
> (`docs/audits/INSTRUMENTS.md`) : « la reprise d'un enregistrement coupé en
> vol ». Le balayage `reseau-malade` (2026-09-04) mesurait ce qui
> S'AFFICHE quand le réseau rampe ; celui-ci regarde l'autre sens — ce que
> le produit ENVOIE, et ce qu'il en advient quand l'envoi échoue.

---

## Pourquoi ce sens-là compte autant que l'autre

Tout le produit repose sur une boucle : l'élève se trompe, le modèle
apprenant reconnaît QUELLE erreur, la remédiation vise cette erreur-là. Le
premier maillon de cette boucle n'est pas une page qui s'affiche, c'est un
POST qui part : `record-notion-event`, appelé par
`src/lib/events/emitter.ts`.

Un affichage raté se voit et se recharge. **Un envoi raté ne se voit pas.**
La leçon continue, l'élève ne saura jamais que sa réponse n'a pas compté, et
le modèle apprenant sera simplement un peu plus faux — sans que rien, nulle
part, ne le signale.

## Le contrat, tel qu'il est écrit

`emitter.ts` le pose en toutes lettres dans son en-tête, et il découle de la
règle d'état honnête (rien ne se fabrique ni ne se persiste dans le
navigateur) :

- envoi **feu-et-oubli** (`keepalive: true`), jamais attendu par l'interface ;
- en cas d'échec, **un** réessai, **4 s** plus tard ;
- la file de réessai est **bornée à 20** et vit le temps de la page — elle
  n'est jamais persistée, et un rechargement la vide ;
- **aucune erreur ne remonte** au code appelant : `recordAnswerEvent` rend
  `void`, et `AttemptEvents.tsx` ne regarde pas.

Ce contrat est une décision, pas un accident. Ce document ne la conteste
pas : il la rend **vérifiable**, parce qu'un contrat que rien ne réexécute
dérive en silence — c'est la leçon du §10.8 du HANDOFF.

## Ce qui était couvert, et ce qui ne l'était pas

`scripts/test-attempt-events.mjs` comptait 14 tests. Ils couvraient les
constructeurs de charge utile, la forme du fil, le mode « off », l'absence
de jeton — **tous sur le chemin HEUREUX**. Le chemin de PERTE n'avait aucun
test : ni l'échec, ni le réessai unique, ni son délai, ni la borne de 20, ni
le jeton expiré, ni la coupure réseau.

Six tests ont été ajoutés (20 au total). Ce qu'ils établissent :

| fait | conséquence pour l'élève |
|---|---|
| un envoi échoué est réessayé **une** fois, à 4 s, **à l'identique** | une coupure brève est absorbée |
| si le réessai échoue, **il n'y a pas de troisième tentative** | une coupure de plus de ~4 s **perd la réponse** |
| un `fetch` qui LÈVE (navigateur hors ligne) est traité comme un 5xx | la coupure franche est gérée comme la panne serveur |
| un **401** est réessayé avec le **même** jeton | un jeton expiré est une perte structurelle, pas un délai |
| la file garde les **20 plus ANCIENS** échecs, abandonne les suivants | un élève qui enchaîne perd ses réponses **les plus récentes** |
| une visite de chapitre suit le même chemin | la progression se perd comme les réponses |

Et un fait établi par lecture, pas par test, parce qu'il tient à la forme du
code : **rien ne peut prévenir l'élève.** `recordAnswerEvent` rend `void` et
avale tout ; aucun appelant n'a de quoi afficher un état d'envoi. C'est le
bon choix pour la SÉANCE — on n'interrompt pas un élève au milieu d'un
raisonnement pour une écriture de diagnostic — mais il faut voir ce qu'il
coûte : **le produit ne peut pas savoir qu'il oublie.**

## Un défaut de composition, trouvé en écrivant les tests

`ChapterVisitRecorder` déduplique les visites par index de chapitre pour la
durée de la page (`sentRef`), et il marque le chapitre comme envoyé **avant**
de savoir si l'envoi a réussi. Un élève qui revient sur un chapitre dont la
visite s'est perdue ne la réémettra donc pas. La dédup et la perte se
composent : la seconde chance qu'offrirait naturellement un retour en
arrière n'existe pas.

Ce n'est pas grave à l'échelle d'une visite — c'est grave comme motif : dès
qu'un envoi est feu-et-oubli, toute dédup posée en amont transforme un échec
transitoire en oubli définitif.

## Ce qui reste à l'arbitrage de l'owner

Deux questions, posées et non tranchées ici — elles touchent le modèle
apprenant, donc le cœur du produit.

1. **Quel bout de la file abandonner ?** Aujourd'hui la borne de 20 garde les
   échecs les plus ANCIENS. Garder les plus RÉCENTS coûterait exactement la
   même mémoire, et le plus récent est ce qui décrit le mieux l'état courant
   de l'élève. Le changement est de deux lignes ; il n'a pas été fait ici
   parce que c'est une décision sur la valeur d'une preuve, pas une
   correction de bogue.
2. **La règle d'état honnête interdit-elle une file persistée ?** Elle
   interdit de FABRIQUER de l'état dans le navigateur et d'y faire vivre la
   vérité. Une réponse déjà donnée par l'élève, mise de côté le temps que le
   réseau revienne, n'est pas de l'état fabriqué — c'est un envoi différé.
   La distinction mérite d'être tranchée explicitement, dans un sens ou dans
   l'autre : aujourd'hui elle est implicite, et c'est elle qui décide de ce
   que le modèle apprenant sait d'un élève qui révise en 3G.

## Ce que ce document ne dit PAS

- **Ce qui arrive côté serveur.** L'idempotence de `record-notion-event`, le
  double envoi, les écritures concurrentes : rien de cela n'est mesuré ici.
- **Le taux réel de perte.** Il dépend du réseau de l'élève. Ce document
  établit la SÉMANTIQUE de la perte, pas sa fréquence.
- **Le comportement en production.** Tout est mesuré sur le code client, en
  tests unitaires, avec un `fetch` scripté. La synchro de production reste
  NON VÉRIFIÉE (`CLAUDE.md`).
