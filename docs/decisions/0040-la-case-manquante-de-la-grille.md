# ADR 0040 — La case manquante de la grille, et ce qu'on n'a pas rendu mesurable

**Date :** 2026-09-22 · **Statut :** accepté (prolonge ADR 0031, 0033, 0034, 0036, 0038, 0039)

---

## Contexte

Passe autonome du 2026-09-22, après ADR 0039. Trois défauts produit corrigés et
confirmés sur l'artefact déployé, deux portes neuves armées, une garde de plus
dans la batterie, trois instruments réparés, **un correctif annulé**, et deux
chiffres publiés puis corrigés. Les faits sont en `docs/HANDOFF.md` §11.180 à
§11.185 ; cet ADR ne garde que ce qui se généralise.

La CI n'a toujours pas de runner : 8 runs ce jour, tous sans machine, logs en
404. Tout ce qui est dit « vert » ici a été mesuré EN LOCAL, avec les commandes
et les arguments exacts de `gates.yml`.

---

## 1. La case manquante d'une grille est presque toujours la case PAR DÉFAUT

`§11.181.` Pour retirer une règle CSS soupçonnée inerte, j'ai bâti une grille :
téléphone × texte ×2 (7 970 paragraphes), bureau × texte ×2 (7 730), et un
contrefactuel règle neutralisée. Trois cases pleines, zéro débordement partout.
J'ai retiré la règle. `etroit-sweep` est passé de **0 à 185 débords**.

La grille ne contenait pas **téléphone × texte NORMAL** — l'état dans lequel
l'élève marocain lit, c'est-à-dire le seul qui comptait. On explore d'abord les
cas extrêmes parce qu'ils semblent plus sévères ; le cas nominal a l'air acquis
précisément parce qu'il est partout.

**La règle.** Avant de conclure d'une grille, écrire la liste de ses AXES et de
leurs valeurs, et vérifier que la combinaison NOMINALE y figure. Trois cases
pleines ressemblent à une preuve ; c'est la quatrième qui décidait.

---

## 2. Une sonde qui FABRIQUE un état que le produit ne montre jamais répond à une autre question

`§11.181.` Ma sonde forçait `details.open = true` sur tout le document pour
« tout voir ». Elle a rendu des débords de +298 à +368 px sur 5 à 7 leçons,
identiques avec et sans la règle — un chiffre stable, donc rassurant, et qui ne
correspondait à rien : `etroit-sweep` en trouve **zéro** sur le même arbre au
même moment.

C'est le cas ADR 0033 (« la porte exacte sur une AUTRE question ») déplacé dans
l'instrument : la sonde mesurait fidèlement un document que personne ne voit.

**La règle.** Une sonde qui manipule le DOM avant de mesurer doit justifier que
l'état qu'elle crée est un état que le PRODUIT produit. Sinon son chiffre n'est
pas faux : il est hors sujet, ce qui est pire, parce qu'il est cohérent.

---

## 3. Mesurer sous charge donne des verdicts faux, et ils ont l'air de résultats

`§11.183.` Trois fois ce jour :

- une capture d'écran prise pendant que la batterie tournait a rendu la page
  **sans aucune feuille de style** — et sur une page non stylée, « 0 paragraphe
  focalisé » est VRAI, pour la mauvaise raison ;
- `impression` et `copie-maths` sont sorties en erreur parce que j'avais tué le
  serveur pendant qu'elles tournaient — relancées seules : vertes ;
- huit portes ont échoué en 2 s parce que `playwright-core` réclame la build
  Chromium 1228 quand l'image en porte 1194 — rien à voir avec le produit.

**La règle.** Un verdict obtenu pendant qu'autre chose tourne n'est pas un
verdict. C'est le corollaire d'ADR 0037 (« la mesure qui mesurait le banc ») :
avant de croire un rouge, vérifier que le banc était AU REPOS et que la page
mesurée était bien stylée, servie et hydratée.

---

## 4. `node --check` prouve qu'un fichier se PARSE, pas qu'il TOURNE

`§11.182.` En donnant `BASE` à trois instruments, mon remplacement en bloc a
frappé la ligne que je venais d'écrire :
`const BASE = process.env.BASE ?? BASE + "";` — syntaxe valide, plantage garanti
à l'exécution. `node --check` est passé sur les trois.

C'est la troisième fois du jour qu'un texte de remplacement frappe le texte que
je venais d'écrire : la garde qui cherchait `PW_CHROMIUM_PATH` dans son propre
commentaire (§11.180), l'assertion qui butait sur le mien (§11.182), et
celle-ci.

**La règle.** Après une réécriture automatique, **lancer la chose**. Et faire
porter toute sonde sur le CODE, commentaires et chaînes retirés — le commentaire
qui explique la règle contient la règle.

---

## 5. Un identifiant non unique fait MENTIR l'instrument, pas le produit

`§11.184.` Neuf ids sont partagés par deux notions (`LIB-1..9`). §11.178 les
avait dits « latents aujourd'hui, piège demain » et laissés au propriétaire.
Le premier instrument à vouloir identifier un item PAR SON ID est tombé dedans
le jour même : carte keyée sur l'id nu → l'item SVT écrase celui de philo →
**quatre contradictions annoncées sur un produit correct**.

**La règle.** Une collision d'identifiants n'est pas une dette cosmétique : elle
est une dette d'OBSERVABILITÉ, et elle se paie au premier outil qui essaie de
nommer les choses. Toute carte d'objets de contenu se clé par `notion::id`,
jamais par l'id seul, tant que l'unicité n'est pas garantie par une porte.

---

## 6. Rendre une chose MESURABLE est un travail, pas un préalable gratuit

`§11.185.` `McqItem` portait `data-item-id` ; `CheckpointItem`, qui partage le
même mélange et la même ligne de verdict, ne portait rien. Les **362 points
d'arrêt** du corpus — ce qu'un élève rencontre EN PREMIER, avant toute banque de
fin — n'étaient adressables par aucun instrument. Non pas « vérifiés verts » :
**non mesurables**. Une ligne d'attribut a suffi, et elle manquait depuis
toujours.

**La règle.** L'absence d'un point de prise dans le DOM ne se voit pas : la page
est parfaite, l'élève ne voit rien. Quand une surface n'a jamais été mesurée,
demander d'abord si elle PEUT l'être — et si non, poser le point de prise et le
dire, plutôt que de conclure que la surface va bien.

---

## 7. Un chiffre qu'on ne sait pas EXPLIQUER est une rumeur, même exact

`§11.184.` J'ai publié « 131 items jamais rendus ». Le nombre était juste ; le
mot était faux. Ces items sont surfacés en ligne comme points d'arrêt et retirés
de la banque de fin pour que l'élève ne revoie pas la même question — j'avais
cherché les marqueurs `clone_of_` dans `items.yaml` au lieu de
`checkpoints.yaml`, trouvé zéro, et conclu au contenu mort.

La porte ne compte plus : elle VÉRIFIE une propriété dans les deux sens — tout
absent est un clone, tout clone est absent, **131/131**. L'écart résiduel
(132 clones pour 131 items) s'explique aussi : `EQDIFF-10` est cité par deux
points d'arrêt aux énoncés différents, `item_source` étant une PROVENANCE et non
une copie.

**La règle.** Un total publié doit venir avec la raison de chacun de ses termes.
Tant qu'un écart n'est pas expliqué — fût-il de un —, le chiffre entier est une
observation, pas une mesure. C'est la version « comptabilité » d'ADR 0039 §7
(deux valeurs qui devraient différer et sont égales).

---

## 8. Une porte locale qu'aucune procédure ne lance a quand même fait le travail

`§11.183.` La CI dormant depuis onze jours, j'ai lancé ses seize portes au
navigateur à la main. Quinze vertes ; `zoom-sweep` en a trouvé une vraie :
**10 épreuves SPC dont le contenu est COUPÉ** à 320 px et 200 % de texte, un lien
`inline-block` de 263 px dans une carte de 213 à `overflow-hidden`. La porte
imprimait elle-même la loi et le correctif sous son propre rouge.

Et la porte qui m'a rattrapé au §1, `etroit-sweep`, **n'est pas armée en CI**.
Elle garde pourtant la condition par défaut du public visé.

**La règle.** Quand la CI est morte, son travail ne disparaît pas : il devient
manuel. Le lancer avec les COMMANDES ET LES ARGUMENTS EXACTS du workflow, pas
avec une approximation — et inscrire au registre du propriétaire toute porte qui
garde une condition par défaut sans être armée.

---

## Ce que cet ADR ne tranche pas

- **La CI n'a toujours pas de runner.** 8 runs ce jour, 2 à 10 s, logs en 404,
  une relance manuelle comprise. Les trois portes neuves (`source-en-double`,
  `header-manifestes`, `verdict-qcm`) n'ont JAMAIS tourné en CI.
- **DECISIONS §16** — armer `etroit-sweep` en CI à 320 px (~3 min) ou la laisser
  locale.
- **DECISIONS §17** — `verdict-qcm` sur six leçons (73 s) ou sur les 62 (~13 min),
  contre un budget de 50 min dont ~38 sont pris.
- **Les arbitrages hérités** : renommage de `LIB-1..9`, plancher de 48 px
  (§15), plancher Safari 16.4 (§14).

---

## Retractions and Corrections

- **§11.181 — correctif ANNULÉ le jour même.** Le retrait de
  `.prose-lesson p { overflow-x: auto }` était annoncé sûr sur quatre mesures
  convergentes. `etroit-sweep` : 0 → 185 débords. Arbre revenu en arrière,
  re-mesuré seul sur serveur frais : 0 sur 108 pages × 3 largeurs. Le levier
  différé en §11.39 l'était à raison.
- **§11.184 — chiffre corrigé le jour même.** « 131 items jamais rendus » →
  131 items surfacés en points d'arrêt, vérifié 131/131 dans les deux sens.
- Aucune autre rétractation à ce jour.
