# ADR 0036 — La bonne chose, cherchée sous une seule de ses formes

**Date :** 2026-09-20 · **Statut :** accepté (prolonge ADR 0031, 0033, 0034 et
0035, dont il ne contredit rien) · **Preuves :** `docs/HANDOFF.md` §11.130 à
§11.140 · **Instruments :** `wide-measure --apres`, `constantes-physiques`,
`champs-morts`, `dette-manipulable`, `tracabilite-spec` (deux sens),
`deploye-sweep`, `validate-content` §11.132–§11.133, `dom-truth` (en-têtes
servis)

## Contexte

ADR 0035 demandait « qu'est-ce qui tourne, au juste ? ». L'arc suivant a posé
une question voisine et plus sournoise : **quand une mesure dit « absent », de
quoi est-ce la preuve ?**

Sept fois dans la même journée, un balayage a répondu « il n'y a rien » alors
que la chose était là, écrite autrement. Aucune de ces sept erreurs n'était une
faute de logique : le motif était juste, le corpus était juste, et la
conclusion était fausse parce que la chose avait **une autre forme** que celle
qu'on avait imaginée.

## Décisions

### 1. Une chose absente n'est prouvée absente que si l'on a énuméré ses FORMES

Les sept cas du jour, tous mesurés :

| Cherché | Forme imaginée | Forme réelle | Ce que la mesure a dit |
|---|---|---|---|
| L'identité du build déployé | `<meta … sha …>` | `data-build-sha` sur le pied de page | « aucune identité servie » |
| L'interdiction d'indexer | en-tête `x-robots-tag`, `robots.txt` | `<meta name="robots">` | « ce déploiement est indexable » |
| Un barreau de leçon | `## R<n>` | `### R<n>` sous un `## Décortiquer` | 39 orphelins au lieu de 16 |
| Un bloc `correct_feedback` | `feedback: >` | `feedback: \|-` | essai rouge MUET |
| Une substitution de manipulable | « remplace » et `[[embed:` sur une ligne | séparés par un retour à la ligne | 5 substitutions au lieu de 6 |
| Une constante physique | le SYMBOLE (`c`, `g`, `h`) | symbole **et** unité | 278 « k » de maths en faux positifs |
| Une vitesse | `\text{m}` accepté | `\text{m}` est un MÈTRE | le rayon de l'orbite de Jupiter lu comme supraluminique |

**La règle :** avant d'écrire « la classe est vide » ou « le champ n'existe
pas », écrire la liste des formes sous lesquelles la chose peut apparaître, et
dire laquelle on a balayée. Une mesure qui n'a vu qu'une forme ne conclut que
sur cette forme — c'est l'ADR 0033 (« la porte exacte sur une AUTRE question »)
appliqué non plus aux portes mais aux **sondes**.

**Corollaire opérationnel :** deux mécanismes sur trois mesurés ne font pas une
conclusion. J'étais à une phrase d'annoncer qu'une branche de travail était
exposée aux moteurs de recherche ; le troisième mécanisme disait `noindex`.

### 2. Un filtre qui exige que la famille existe déjà ne verra jamais la famille qui n'a jamais existé

Cherchant les identifiants d'item cités par une spec, le premier balayage
exigeait que le PRÉFIXE cité existe déjà dans la notion — pour écarter le
bruit. Conséquence : `CH-FR-3` était invisible, parce qu'aucun item de cette
notion ne commence par `CH`. **Précisément le cas qui comptait.**

Un filtre anti-bruit construit sur « ce qui existe déjà » est structurellement
aveugle à ce qui manque entièrement. Quand la question est « qu'est-ce qui
manque ? », le filtre doit s'ancrer sur autre chose que l'existant — ici, sur
le VERBE D'USAGE (« sert X », « Item X »), qui ne présume rien du corpus.

### 3. Une porte qui se cite elle-même se disculpe

`champs-morts` compare les noms de champ du corpus à tout le code du dépôt. Son
en-tête cite `correct_feedback` pour expliquer pourquoi elle existe — et comme
elle lit `web/scripts`, **la citation suffisait à déclarer le champ « lu »**.
Elle se rendait aveugle au défaut même qui l'a fait naître, et à tout champ
qu'elle nommerait un jour.

**Une porte s'exclut de ce qu'elle mesure.** La règle vaut au-delà de ce cas :
tout instrument dont le texte fait partie de son propre corpus de lecture doit
retirer son propre fichier.

### 4. Un total auquel chaque contrôle doit s'inscrire est un plancher, pas une somme

`dom-truth` imprime « N checks ». `checks++` est **opt-in** : 97 sites
l'appellent, chacun devant y penser. Deux contrôles ajoutés, capables
d'échouer, n'ont pas bougé le chiffre de tête. L'erreur va dans le sens sûr —
on sous-compte — mais un chiffre qu'on cite ensuite sans y penser doit dire ce
qu'il est. **Un compteur opt-in s'annonce comme un plancher.**

### 5. Prescription et livraison sont deux ensembles qu'il faut mesurer SÉPARÉMENT

Deux mesures, le même jour, le même motif :

- **Manipulables :** 4 prescrits par des specs — les 4 substitués par une figure
  figée. 4 livrés — **aucun des 4 n'avait été prescrit.**
- **Items :** 22 étiquettes de conception citées par des specs, 2 existantes.
  Les barreaux visés sont pourtant couverts : l'auteur a écrit sous un autre
  schéma de noms.

Ce qui a été demandé n'a pas été fait ; ce qui a été fait n'avait pas été
demandé. Chaque moitié est défendable seule ; ensemble elles disent qu'il n'y a
pas de canal entre la spec et la livraison. **Compter « livrés » ne répond pas
à « prescrits », et inversement.**

### 6. Une dette honnête reste invisible tant qu'aucun REGISTRE ne la nomme

Les six substitutions de manipulables sont toutes ÉCRITES, en tête du SVG qui
remplace l'embed, chacune nommant ce qui est perdu (« curseur Δt → ici, DEUX
tailles de pas fixes »). La discipline d'état honnête (ADR 0025) a tenu au
point exact de la substitution. **Et personne ne pouvait les compter** : chaque
dette vivait dans un en-tête que seul son lecteur voit ; `media-manipulable`
n'en savait rien ; aucun document ne les réunissait.

C'est l'ADR 0031 dans sa forme la plus douce : **une dette qu'aucun registre ne
nomme est invisible, même quand chaque ligne est honnête.** L'honnêteté locale
ne remplace pas l'agrégation.

### 7. Un diagnostic non rejoué est une rumeur

« Le relais réseau coupe Chromium headless — à refaire depuis une machine
libre » était écrit depuis deux semaines, de bonne foi, et recopié de session
en session. Rejoué, il donne `ERR_CERT_AUTHORITY_INVALID` et non
`ERR_CONNECTION_RESET` : **une défiance, pas une coupure.** Le relais
re-termine TLS avec son propre CA ; le magasin de l'image date de sa
construction, le CA de la session est écrit après. Deux mots — « coupé » et
« pas de confiance » — qui ne mènent pas au même geste.

Même famille que `wide-measure`, qui demandait par écrit d'être rejoué et ne
l'a pas été pendant deux mois (§11.130). **Un angle mort noté est un angle mort
qui cesse d'être regardé.** Un diagnostic recopié se re-mesure avant d'être
cité.

### 8. Ce qu'on choisit de NE PAS armer s'écrit à côté de ce qu'on arme

Trois refus, chacun avec sa raison, au même endroit que le code :

- **`deploye-sweep` n'est pas en CI** : réseau, CA propre à la session, et un
  artefact dont le commit varie — la porte serait rouge chaque fois que le
  déploiement a du retard sur `git push`.
- **`Content-Security-Policy` n'est pas posée** : à l'aveugle, elle casse la
  page en silence chez l'élève, et aucun contrôle local ne le verrait puisqu'il
  n'y a pas de CSP à vérifier. Arbitrage d'owner, chiffré.
- **Ni `robots.txt` ni `sitemap.xml`** : tant que le site est `noindex` par
  choix, un sitemap serait une contradiction.

Et deux cliquets plutôt que des portes franches — les étiquettes sans item (20)
et les items sans chapitre (16) — parce que **un rouge permanent est un rouge
qu'on apprend à ignorer**, et que les deux classes sont des portes d'owner
ouvertes, pas des défauts à corriger seul.

## Ce que cet arc a réparé pour l'élève

Une seule chose, et elle valait la journée : **49 items ne disaient rien à
l'élève qui répondait juste.** Le champ `correct_feedback` était écrit sur
1 678 items des 62 notions et lu par aucun composant. Pour 49 d'entre eux
c'était le seul canal : la carte affichait « Correct », et rien d'autre.
Corrigé par un repli, vérifié dans un navigateur, puis vérifié **en ligne** sur
l'artefact déployé une heure plus tard.

## Retractions and Corrections

Aucune à ce jour. Les sept erreurs de banc énumérées au §1 ne sont pas des
rétractations : aucune n'a été publiée comme un fait. Toutes ont été trouvées
en vérifiant avant d'écrire — c'est le seul point qui les rend racontables.
