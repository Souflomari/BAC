# Le réseau qui rampe — ce que vit un élève quand la connexion répond mal

*Mesuré le 2026-09-04. Instrument : `web/scripts/reseau-malade.mjs`.
Conditions : 300 ms de latence, ~400 kbit/s, **une requête sur cinq perdue**,
tirage déterministe à graine. Build local servi par `next start`.*

---

## Pourquoi cette mesure

`horsligne-sweep` mesure la coupure **franche**, et la coupure franche est le
cas facile : le navigateur sait qu'il est hors ligne, et l'application aussi.
Le cas d'un élève marocain en 3G de bord de village est l'autre, et c'est le
pire pour une application à chargement fractionné : **le réseau répond, mais
mal**. Aucun instrument de ce dépôt ne le mesurait — c'était le point 4 de la
liste des angles morts.

**Le témoin d'abord.** Chaque exécution commence par la même scène sur un
réseau parfait : un appui sur → change-t-il de chapitre ? Réponse : oui, en
**560 ms**. Sans ce témoin, un « jamais réactif » ne prouverait rien.

---

## Le résultat, après correction de l'instrument

| Scène | Avant correctif | Après |
|---|---|---|
| 0. Témoin, réseau parfait | réactif en **560 ms** ✓ | — |
| 1. Premier chargement | prose en **~20 s** ; **jamais interactif en 25 s** quand un morceau de JS se perd, **et rien ne le dit** | la **veille d'hydratation** prévient et propose de recharger ✓ |
| 2. Un morceau de JS perdu (75 ko) | **5 100 caractères de cours restent lisibles** ✓ mais la page est morte **en silence** | la veille prévient ✓ |
| 3. Clic vers une autre page | — | **arrive en 630 ms** ✓ |
| 4. Répondre à un QCM | le retour **s'affiche** ✓ (rendu côté client) | — |
| 5. Le réseau guérit | — | la navigation repart ✓ |

Et un cas limite qui vaut d'être nommé : avec une graine, **la requête du
document elle-même s'est perdue trois fois de suite**. Sans réessai manuel,
l'élève n'a pas une application dégradée — il n'a **aucune** application, et
le mur du navigateur, en anglais. C'est le même mur que la coupure franche
(voir `hors-ligne.md`), atteint par intermittence.

---

## Le vrai défaut : le cours est lisible, la page est morte, et rien ne le dit

C'est la bonne surprise et la mauvaise, dans la même phrase.

**Bonne** : le HTML est rendu côté serveur, donc perdre un morceau de
JavaScript ne prend pas le cours en otage — les 5 100 caractères du chapitre
restent là, à lire.

**Mauvaise** : plus rien ne répond. Les flèches ne changent pas de chapitre,
les QCM ne s'ouvrent pas, et **aucun message** ne dit à l'élève que ce n'est
pas lui qui s'y prend mal. Un élève de terminale à qui l'application ne
répond plus conclut que l'application est cassée, ou qu'il est bête. Les deux
conclusions sont fausses et coûteuses.

### Ce qui a été fait : la veille d'hydratation

Aucun composant React ne peut prévenir dans ce cas — **dans ce cas, il n'est
jamais monté**. Le correctif est donc un couple, et il tient en quinze lignes :

- `PageShell` rend, **côté serveur**, un bandeau `#hydratation-perdue`
  masqué, avec un `<a href="">` qui recharge la page courante *sans une ligne
  de JavaScript* ;
- un **script en ligne** dans le document — donc insensible à la perte d'un
  morceau — révèle ce bandeau si le signal de vie n'est pas venu en douze
  secondes ;
- `SignalVivant`, un composant client qui ne rend rien, pose ce signal à son
  montage **et referme le bandeau** : une fausse alerte se corrige seule.

**Douze secondes**, parce que la mesure donne ~0,5 s en réseau parfait et
jusqu'à 7 s en 3G chargée : le seuil ne peut pas se déclencher sur une simple
lenteur. La bible §0 interdit d'agiter l'élève ; un bandeau qui crie au loup
serait pire que le silence.

**Vérifié par la mesure, pas par l'intention** : les scènes 1 et 2 du
balayage cherchent ce bandeau et sont passées de ✗ à ✓.

**Et un piège payé dans l'heure, attrapé par une porte existante.** Le
conteneur du bandeau portait la classe `flex`. `[hidden]` n'est qu'une règle
de la feuille par défaut du navigateur : une classe utilitaire qui pose
`display: flex` la **bat**. Le bandeau restait donc dans le flux, invisible
mais présent — et `dom-truth` a immédiatement signalé un lien focalisable
« Recharger » **dans un `[hidden]`** sur les 68 pages, plus 243 px de barres
collantes qui ne laissaient plus une seule ligne de prose à 320 × 256. Le
correctif tient en un mot : aucune classe de `display` sur l'élément qui
porte `hidden` ; la mise en page vit dans l'enfant. Une porte armée la
veille a rattrapé un défaut introduit le lendemain — c'est exactement à ça
qu'elles servent.

---

## LA CORRECTION QUI COMPTE : deux conclusions ont été retirées

La première version de ce document affirmait deux choses fausses, et elles
étaient **spectaculaires** — c'est bien pour ça qu'il faut les raconter :

> « Un clic vers une autre leçon échoue en silence. » — **FAUX.**
> « La route qui a échoué reste morte après le retour du réseau, alors qu'une
> autre repart en 500 ms. » — **FAUX.**

La cause : le premier `a[href^="/notions/"]` d'une page de leçon se trouve
dans le **panneau Notions du header, replié** — boîte 0×0. `page.click`
expirait au bout de trente secondes, le `.catch()` avalait l'erreur, et la
scène concluait « navigation perdue » alors qu'**aucun clic n'avait eu
lieu**. Le diagnostic élaboré par-dessus — « le cache du routeur est
empoisonné » — était une belle histoire construite sur un clic qui n'existait
pas.

Avec une cible **visible**, la navigation sous 20 % de pertes arrive en
**630 ms**, et la guérison est immédiate. Vérifié en plus, exprès : même en
coupant **toutes** les charges RSC, le routeur retombe proprement sur une
navigation dure et arrive. Il n'y a pas de route empoisonnée.

Un bandeau « la connexion est lente » avait été écrit pour ce défaut
imaginaire. **Il a été supprimé** : livrer une interface pour un problème
qu'on n'a pas démontré, c'est de la complexité spéculative, et un bandeau
capable de se déclencher à tort sur un défaut inexistant est un défaut de
plus. Ce qui reste, c'est la veille d'hydratation — pour un défaut, lui,
mesuré, et dont la correction est mesurée aussi.

**La règle, une fois de plus :** *une scène de test qui échoue doit prouver
qu'elle a eu lieu.* Un clic qu'on n'a pas vérifié n'est pas une mesure ; un
`.catch()` vide est l'endroit exact où un instrument commence à mentir.

---

## Addendum du 2026-09-11 : la veille change de forme (HANDOFF §11.29)

Le compte à rebours de douze secondes reposait sur « jusqu'à 7 s en 3G
chargée » ; le §11.28 mesure l'hydratation à 17–28 s sur 3G lente et à 34 s
à 250 kb/s. Le seuil ne criait pas au loup à 400 kb/s — par chronologie (le
compte partait de la fin du HTML), pas par conception — et l'aurait fait à
250 kb/s. Et un morceau PERDU attendait 8,3 s après la perte pour être dit,
parce que le bandeau vivait en pied de page.

Depuis : un écouteur `error` en tête du document révèle le bandeau à la
perte (+0,3 s) ; le bandeau vit en tête du `<body>` ; le compte à rebours est
un filet à 30 s ; le bandeau fait taire la ligne « La page se prépare… »
(ADR 0032). Tout cela dans `web/src/components/ui/VeilleHydratation.tsx`,
monté depuis le layout — plus dans `PageShell`. Les cinq scènes de cet
instrument rendent les mêmes verdicts ; l'instrument
`veille-hydratation.mjs` mesure les temps.

## Ce que la mesure ne dit pas

- **Le vrai réseau.** Tout est ici un build local derrière une émulation
  Chromium : pas de DNS, pas de TLS, pas de CDN, pas de cache Vercel. Les
  ~20 s de premier chargement sont un ORDRE DE GRANDEUR, pas une promesse.
- **Le comportement d'un service worker**, puisque le produit n'en a pas.
  C'est un arbitrage owner ouvert (voir `hors-ligne.md`).
- **La reprise d'un enregistrement** (progression, tentative) coupé en vol.
  Le QCM répond côté client ; ce qui est ENVOYÉ ensuite n'est pas mesuré ici.
