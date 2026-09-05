# La consommation de données — ce que le produit coûte au forfait de l'élève

> Mesuré et corrigé le 2026-09-05. Point 1 de « ce que RIEN ne mesure
> encore » (`docs/audits/INSTRUMENTS.md`), ouvert le 2026-09-04 et resté
> ouvert après que `poids-sweep` a fermé la partie « temps de chargement ».
> Instrument : `web/scripts/donnees-sweep.mjs`.

---

## Pourquoi ce n'est pas la même question que le poids

`poids-sweep` mesure ce que l'élève ATTEND : LCP, TTFB, somme des
`transferSize` au moment de la peinture. C'est la bonne mesure de la
patience.

Ce document mesure ce que l'élève PAIE. Ce sont deux chiffres différents, et
le second était plus grave, pour une raison précise : **le préchargement de
`next/link` part APRÈS la peinture.** Il n'entre dans aucun LCP, dans aucun
temps de blocage, dans aucune capture d'écran, dans aucun test de rendu. Il
est invisible à tous les instruments existants — et il est facturé par
l'opérateur.

L'élève visé achète des recharges de données. C'est la raison pour laquelle
ce chiffre compte autant que le temps de chargement.

---

## Ce qui a été mesuré — avant

Écran de téléphone (390 px), cache vide, octets de FIL (corps compressé +
en-têtes : ce que l'opérateur compte).

| route | pour voir la page | puis, seule | en défilant | TOTAL | dont préchargé |
|---|---:|---:|---:|---:|---:|
| `/` | 525 ko | 1 075 ko | 5 546 ko | **7 146 ko** | 6 475 ko (91 %) |
| `/matieres/maths` | 507 ko | 1 273 ko | 825 ko | 2 605 ko | 1 938 ko (74 %) |
| `/matieres/pc` | 508 ko | 652 ko | 2 386 ko | 3 545 ko | 2 877 ko (81 %) |
| `/matieres/philo` | 506 ko | 681 ko | 460 ko | 1 648 ko | 981 ko (60 %) |
| `/examens` | 509 ko | 377 ko | 870 ko | 1 756 ko | 1 099 ko (63 %) |
| `/matieres/svt` | 506 ko | 484 ko | 439 ko | 1 429 ko | 762 ko (53 %) |

**Sur l'accueil, 91 % du transfert servait à précharger 62 leçons dont
l'élève en ouvrira une.** Défiler la page d'accueil jusqu'en bas coûtait
5,5 Mo — sans un clic.

Et la séance type — accueil, défiler, ouvrir une matière, ouvrir une leçon,
dérouler des chapitres, passer à une deuxième leçon, cache actif comme un
vrai navigateur :

> **8,72 Mo, dont 86 % de préchargement. Soit 117 séances dans un forfait
> de 1 Go.**

## Pourquoi personne ne l'avait vu

Parce que c'est correct partout où on regardait :

- le LCP est excellent — le préchargement part APRÈS la peinture ;
- le temps de blocage est bon — c'est du réseau, pas du calcul ;
- les captures sont identiques — rien ne se voit ;
- `cls-sweep` ne bouge pas — rien ne saute ;
- et `poids-sweep`, qui somme les `transferSize` au moment de la peinture,
  n'en voit qu'une fraction, parce qu'il arrête de compter là où le
  préchargement commence.

C'est le cas d'école de la règle du document des instruments : **le harnais
ne trouve que ce qu'on lui demande de regarder.** Personne ne lui avait
demandé de regarder la facture.

**Et le chiffre qui circulait était très en dessous.** `INSTRUMENTS.md` et
`poids-et-reactivite.md` annonçaient tous deux « ~920 ko de préchargement
RSC » sur l'accueil. C'était vrai — pour une page IMMOBILE. Personne n'avait
défilé. Un chiffre cité dans la colonne « ce qu'on ne mesure pas » n'est pas
une mesure : rien ne le réexécute, donc il est juste le jour où on l'écrit —
exactement le défaut que le §10.8 du HANDOFF documente pour les résumés de
couverture, commis ici sur un autre sujet.

**Le balayage hors ligne avait déjà tranché la seule défense possible.**
Le 2026-09-04, `docs/audits/hors-ligne.md` mesurait qu'une leçon DÉJÀ
préchargée ne s'ouvre pas davantage quand la connexion tombe : le cache du
routeur Next expire, la requête RSC échoue, Next retombe sur une navigation
dure qui meurt comme les autres. Conclusion écrite ce jour-là, et restée
sans suite : « **le préchargement est donc un coût de données pur.** » Il ne
manquait que la mesure de ce que ce coût valait.

## Le correctif — un seul fichier, parce qu'il n'y a qu'une porte

Tout le produit passe par `src/components/ui/Lien.tsx` : un unique wrapper
de `next/link`, écrit pour la continuité entre routes (R4). Une politique
de préchargement s'y écrit donc UNE fois, et vaut partout.

La politique, dans l'ordre :

| déclencheur | avant | après |
|---|---|---|
| le lien entre dans le champ de vision | précharge | **non** |
| survol de la souris | rien | **précharge** |
| focus clavier | rien | **précharge** |
| doigt posé (`touchstart`) | rien | **précharge** |
| économiseur de données / lien 2G | précharge | **rien du tout** |
| `prefetch` demandé par l'appelant | — | précharge (échappatoire) |

Le raisonnement : **le survol, le focus et le doigt posé sont des
intentions ; le champ de vision n'en est pas une.** Ce sont exactement les
octets que le clic allait demander — ils ne coûtent rien de plus, ils
arrivent seulement plus tôt. Entrer dans le champ de vision, non : c'est une
spéculation sur 62 leçons pour en ouvrir une.

Deux détails qui comptent :

- **un href n'est préchargé qu'une fois par page** — sans quoi chaque
  passage de souris repaierait la même charge ;
- **l'économiseur de données coupe la spéculation, jamais le clic.** On lit
  `navigator.connection.saveData` et `effectiveType` (2G) — le réglage
  système de l'élève, pas une préférence inventée par le produit.

L'unique exception est déclarée dans le code qui la demande : la
recommandation « quoi étudier ensuite » du tableau de bord (`NextUp`) garde
`prefetch`. C'est le seul lien de la page dont on sait qu'il sera suivi —
une charge, pas soixante-deux.

## Ce qui a été mesuré — après

| route | pour voir la page | puis, seule | en défilant | TOTAL | dont préchargé |
|---|---:|---:|---:|---:|---:|
| `/` | 525 ko | 266 ko | **0 ko** | **791 ko** | **0 ko** |
| `/matieres/maths` | 507 ko | 1 ko | 0 ko | 508 ko | 0 ko |
| `/matieres/pc` | 508 ko | 1 ko | 0 ko | 509 ko | 0 ko |
| `/matieres/philo` | 507 ko | 1 ko | 0 ko | 507 ko | 0 ko |
| `/examens` | 509 ko | 1 ko | 0 ko | 510 ko | 0 ko |
| `/matieres/svt` | 507 ko | 1 ko | 0 ko | 507 ko | 0 ko |

Et la séance type :

> **1,38 Mo au lieu de 8,72 Mo — 6,3 fois moins. 743 séances dans un
> forfait de 1 Go au lieu de 117.**

Le préchargement à l'intention fonctionne, vérifié geste par geste : survol,
focus clavier et `touchstart` tirent chacun **79 ko** — la route visée, et
elle seule.

Ce que l'élève perd : sur un lien qu'il n'a ni survolé ni touché — une
navigation au clavier par `Entrée` sans focus préalable, un clic
instantané — la page se charge au clic au lieu d'être déjà là. Sur une
liste, le doigt se pose avant que le clic ne parte : le préchargement a le
temps. C'est l'arbitrage, et il est assumé : quelques centaines de
millisecondes rendues contre six mégaoctets et demi rendus au forfait.

## La porte, et pourquoi elle a DEUX sens

`node scripts/donnees-sweep.mjs --porte` échoue si :

1. une page de liste tire des octets de préchargement **sans un geste de
   l'élève** — le comportement d'origine est revenu ;
2. défiler cette page coûte plus de 32 ko ;
3. **le survol d'un lien de leçon ne précharge PLUS rien** ;
4. **avec l'économiseur de données actif, le survol précharge quand même.**

Les points 3 et 4 sont là parce qu'un seul sens se satisfait d'un produit
cassé : couper tout préchargement passerait les points 1 et 2 en rendant la
navigation plus lente partout. C'est la même leçon que les deux cliquets
d'indices, qui gardent eux aussi les deux directions — le remède d'un défaut
crée le défaut symétrique s'il est appliqué sans regarder.

## Ce que la porte a prouvé sur elle-même

Une porte qui n'a jamais été rouge ne certifie rien. Celle-ci a été mise à
l'épreuve en réintroduisant le défaut — `prefetch={prefetch}` au lieu de
`prefetch={prefetch ?? false}` —, en reconstruisant, et en la relançant :
elle échoue, et elle nomme les trois routes et leurs octets. Le fichier a
ensuite été restauré et le build refait.

## Ce que cet instrument NE dit PAS

- **Le CDN et le cache de Vercel.** Tout est mesuré sur un `next start`
  local. L'ordre de grandeur est transposable — ce sont les mêmes octets —
  le chiffre à l'octet près ne l'est pas (Brotli côté Vercel, en-têtes de
  cache différents).
- **Ce que l'élève fait vraiment.** La séance de la passe C est un parcours
  plausible, pas une statistique d'usage. Un élève qui ouvre huit leçons
  paiera plus ; un élève qui en ouvre une et la lit une heure paiera moins.
- **Le coût du hors-ligne.** Ce que le produit garde en cache entre deux
  sessions n'est pas mesuré ici (voir `docs/audits/hors-ligne.md`).
- **Ce qui est ENVOYÉ.** Les octets montants — enregistrement d'une
  progression, d'une tentative — restent un angle mort déclaré
  (`INSTRUMENTS.md`, point 4).
