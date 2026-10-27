# ADR 0031 — Les faits fabriqués, et la portée qu'on ne mesurait pas

**Date :** 2026-09-05 · **Statut :** accepté (dérivé de règles déjà
verrouillées — honest-state, « une porte ne s'arme que sur une classe
propre », « toute exception vit dans le fichier ») · **Preuves :**
`docs/HANDOFF.md` §10.8 à §10.22 ·
**Instruments :** `donnees-sweep`, `liens-fichiers`, `ancres-uniques`,
`portee-corpus`

## Contexte

Une journée de mesure a produit deux familles de défauts qui n'avaient
aucun instrument, et qui se ressemblent plus qu'il n'y paraît.

**Première famille — le fait FABRIQUÉ.** Un chiffre ou une date que le
produit présente comme un fait, et qui n'en est pas un. La règle
honest-state interdisait déjà d'inventer de l'état ; ce qui manquait,
c'est qu'une valeur *calculée* peut être aussi fausse qu'une valeur
inventée quand sa source ne dit pas ce qu'on croit. La date de fichier en
est le cas pur : elle a produit **trois** défauts distincts, tous
présentés comme des faits —

- la suggestion de fin de leçon triait par `updatedAtMs` : **une seule
  suggestion distincte pour 62 leçons** ;
- l'action principale du tableau de bord — le seul
  `[data-primary-action]` de la page — faisait de même, et **contredisait
  la ligne rendue trois lignes plus bas**, qui, elle, suivait le
  programme ;
- le masthead de chaque leçon affichait « mis à jour <mois> », et **les
  62 affichaient le même mois** — celui du dernier `git clone`.

Et la même famille, côté documents : un `coverage_summary` écrit à la
main qui affirmait `floor_met: true` avec quinze misconceptions sous le
plancher (§10.8) ; un « ~920 ko de préchargement » cité dans deux
documents et faux d'un facteur sept ; « dom-truth (121+ verts) » dans une
compétence toujours chargée, quand la batterie en compte 253.

**Seconde famille — la PORTÉE non mesurée.** `dom-truth` prouve qu'un
mécanisme FONCTIONNE, sur des leçons témoins, et il a raison de le faire.
Rien ne disait sur combien de pages ce mécanisme a quelque chose à
MONTRER. Mesuré : la zone « à retenir », livrée et verte au harnais, est
vide sur **100 % de la philosophie** ; les mouvements existent sur 6
notions sur 62, les dérivations dépliables sur **une**.

## Décision

1. **Un fait présenté à l'élève ou à une session doit venir d'une source
   qui SURVIT au clone.** Une date de fichier n'en est pas une : après un
   clone frais — donc à chaque déploiement — elle vaut l'instant du
   checkout pour tout le dépôt. `updatedAt` et `updatedAtMs` sont
   supprimés du modèle de contenu, avec un bloc de retrait qui interdit
   leur retour. **Quand le produit doit ordonner son contenu, l'ordre
   vient du contenu** — ici le programme officiel (`lib/curriculum.ts`).
   Si une date de révision revient un jour, ce sera un champ AUTORÉ.

2. **Deux surfaces qui répondent à la même question partagent leur
   source.** `DEFAULT_SUBJECT_ORDER`, `premiereDuParcours` et
   `nextInParcours` vivent dans `lib/curriculum.ts` et sont partagés par
   la carte de session, la ligne « ensuite dans le parcours » et la fin de
   leçon. Aucune des trois ne redéfinit l'ordre du programme.

3. **Un chiffre écrit dans un document porte la commande qui le
   produit.** Appliqué à `docs/grounding/architecture.md`, réécrit à
   partir d'une mesure du dépôt : 62 notions, 49 migrations, 25 tables,
   6 fonctions edge — chacun re-dérivable en une ligne. C'est le remède au
   défaut qui a tué sa version précédente.

4. **Une étiquette de statut se pose PAR DOCUMENT et dit ce qui a été
   vérifié.** « Stale, en attente de revue » sur trois documents
   d'ancrage à la fois a tenu quatre mois en cachant trois situations
   différentes : une prémisse périmée, un jugement juste au mauvais temps,
   un backlog d'une autre ère encore largement valable.

5. **Un blocage consigné doit nommer ce qui le lève.** La proposition de
   réconciliation de 2026-06 disait « bloqué sur une décision humaine » ;
   la décision (ADR 0016) était rendue depuis, et l'étiquette avait
   survécu à sa cause dans DEUX documents.

6. **Un renvoi est une instruction.** `liens-fichiers` garde en porte
   FRANCHE que tout chemin cité dans un document VIVANT mène quelque part.
   La zone d'ARCHIVE (ADR, registres, CHANGELOG) est exemptée : ces textes
   nomment délibérément ce qui n'existe plus. L'exception ponctuelle vit
   dans le fichier et NOMME son chemin (`CHEMIN DISPARU:`), comme
   `RECOUVREMENT ASSUMÉ:`.

7. **La portée d'un mécanisme se mesure.** `portee-corpus` compte, par
   notion et par matière, ce que neuf mécanismes livrés ont réellement à
   montrer. Le tableau est un FAIT ; le verdict — « cette portée est-elle
   bonne ? » — reste pédagogique et appartient au propriétaire.

8. **Une porte qui a deux sens quand un seul se laisse contourner.**
   `donnees-sweep` échoue si une page de liste tire des octets sans geste
   de l'élève, MAIS AUSSI si le survol ne précharge plus rien : couper
   tout préchargement passerait le premier contrôle en rendant la
   navigation plus lente partout. Même logique que les deux cliquets
   d'indices.

9. **Une porte doit pouvoir devenir ROUGE, et une pastille verte ne dit pas
   que tout a été mesuré.** Ajouté en fin de journée, après trois cas trouvés
   dans le système de portes lui-même :

   - une ROUTE MORTE dans une liste (`/options`, 404 depuis la purge des
     bancs) : quatre portes chargeaient la page « Page introuvable », la
     trouvaient propre, et imprimaient un ✓. **La liste de routes EST la
     portée** ; toute route ≠ 200 fait désormais tomber la porte ;
   - une porte qui FINIT son travail et ne rend jamais la main
     (`ancres-uniques` : 24 s de travail, puis une attente infinie parce
     qu'un enfant `spawn`é non-`unref()` garde la boucle d'événements). Elle
     a emporté les deux portes suivantes, qui n'ont plus tourné du tout ;
   - une porte écrite pour garder une invariant **inatteignable** (aucune
     vidéo sans geste — mais la vidéo dort derrière trois portes fermées,
     donc le contrôle ne pouvait qu'être vert). Non armée, et la raison
     écrite.

   Le corollaire opératoire : **le test rouge ne sert pas à confirmer qu'on a
   raison, il sert à découvrir ce que le contrôle mesure vraiment.** Il a
   contredit l'auteur trois fois aujourd'hui — deux fois en passant quand il
   aurait dû tomber, une fois en tombant sur un cas non prévu.

## Ce qui est remplacé, ce qui tient

- **Remplacé** : le tri par `updatedAtMs` (fin de leçon, carte de
  session), l'affichage « mis à jour <mois année>» du masthead, le
  préchargement au champ de vision de `next/link`, et l'étiquette « stale »
  collective des trois documents d'ancrage.
- **Tient, intégralement** : honest-state (ces décisions en sont des
  applications, pas des amendements), le calme (aucune de ces corrections
  n'ajoute d'élément à l'écran — deux en retirent), la règle « une porte ne
  s'arme que sur une classe propre », et l'ordre d'autorité
  VISION → RULES → agents.

## Conséquences

- Quatre portes de plus dans `gates.yml` : `liens-fichiers`,
  `ancres-uniques`, `donnees-sweep`, et les deux suites de tests
  unitaires — qui existaient et ne tournaient QUE localement.
- Une séance de révision passe de **8,72 Mo à 1,38 Mo** ; l'accueil de
  7 146 ko à 791 ko. Le préchargement est désormais gouverné à un seul
  endroit (`components/ui/Lien.tsx`) et honore l'économiseur de données.
- Deux angles morts fermés dans `INSTRUMENTS.md` (consommation de
  données ; sémantique de la perte d'un envoi), un troisième ouvert et
  aussitôt instrumenté (la portée), un quatrième constaté sans objet (la
  gravité d'un chevauchement : zéro sur le corpus vivant).
- Trois arbitrages POSÉS, non tranchés, pour le propriétaire : quel bout
  de la file d'envoi abandonner ; si la règle d'état honnête interdit une
  file persistée ; si la zone « à retenir » doit accepter une carte
  TEXTUELLE pour ouvrir la philosophie.

## Retractions and Corrections

- **Une fausse alerte, rapportée ici parce qu'elle a failli être
  publiée.** Une extraction maison du HTML brut faisait lire « 4 exercice
  s » sur l'index des épreuves ; le défaut n'existe pas — React SSR
  insère un `<!-- -->` entre deux nœuds de texte, et la substitution l'a
  transformé en espace. Vérifié au navigateur avant d'être rapporté.
  **Le texte que l'élève lit est `innerText`, jamais une regex sur le
  balisage.**
- **Une alarme publiée, puis retirée le jour même.** L'instrument de portée
  hors leçon comptait les questions d'épreuve portant un tableau `steps`, en
  trouvait 77 %, voyait quatre rattrapages concentrer le manque (SPC 2021 R :
  zéro sur 41) et l'a publié comme une lacune de campagne — **sans avoir
  ouvert une seule de ces corrections**. Elles déroulent l'algèbre
  entièrement, en blocs `$$…$$` dans le raisonnement, chaque étape portant son
  « pourquoi ». Les questions SANS `steps` en portent deux fois plus que
  celles qui en ont, et les quatre épreuves accusées sont celles qui en
  déroulent le plus. Compte honnête : **94 %**, et zéro question demandant un
  calcul sans recevoir de mathématiques. **Un compteur qui mesure le CONTENANT
  mesure une habitude de rédaction, pas ce que l'élève reçoit** — c'est la
  neuvième décision de cet arc, et elle est née d'une erreur, pas d'un défaut
  du produit.
- **Un correctif juste qui a rendu FAUSSE l'étiquette d'à côté.** La décision
  2 (deux surfaces qui répondent à la même question partagent leur source) a
  fait suivre à la fin de leçon l'ordre du programme. Juste — et le surtitre
  posé au-dessus, « Changer de matière — <matière> », écrit en dur, est
  devenu faux sur **58 leçons sur 62** : la suite est désormais presque
  toujours dans la MÊME matière. Tant que la suggestion venait de la date de
  fichier, elle sautait d'une matière à l'autre au hasard et l'étiquette
  tombait juste assez souvent. Les cinq portes armées le matin n'ont rien vu
  et ne POUVAIENT rien voir : elles gardent l'ordre rendu, pas l'étiquette
  posée dessus. **Une correction juste peut invalider une hypothèse
  voisine ; après une correction qui change ce que le produit CHOISIT,
  rouvrir les pages où ce choix s'AFFICHE.** Corrigé, et gardé par une porte
  à DEUX témoins (une suite qui reste dans la matière, une qui en change).
- **Une cause diagnostiquée à l'envers, corrigée dans l'heure.** Devant un
  run de CI tronqué et une pastille « cancelled », j'ai conclu « le budget de
  30 min est trop court », relevé la limite à 50 et écrit le découpage mesuré
  dans le YAML. La vraie cause était une porte qui pendait après avoir fini
  (voir la décision 9) : son travail prend 24 secondes. « cancelled » est
  aussi le mot que produit `cancel-in-progress` quand une poussée en remplace
  une autre — deux causes, un seul mot. **Devant un « cancelled », regarder
  les ÉTAPES avant de conclure.** Le budget relevé reste comme marge ; les
  trois documents qui l'annonçaient comme un correctif sont corrigés.
- **Un correctif défait par la mesure.** Le pire croisement tracé/étiquette
  du corpus (29 %) a d'abord été « corrigé » en montant l'étiquette de
  28 px : la mesure a montré un recouvrement à 56 % avec le squelette —
  pire que le défaut de départ. Le placement retenu est le second, vérifié
  aux pixels dans les deux thèmes.
- **Un zéro consigné qui n'existait pas, et une explication fausse publiée
  avant la mesure.** Le HANDOFF §8.5 consignait, pour le texte à 200 %,
  « 227 signalements, ramenés à 0 ». L'audit complet a relancé le même
  instrument sur le même corpus : **61 débords réels**, de 16 à 200 px, sur
  67 pages. Ma première explication — écrite dans le commit de l'audit —
  fut que la machine était chargée et que les largeurs se lisaient avec les
  métriques de la fonte de substitut. C'était faux : relancé seul, à froid,
  fontes attendues, 61 ; l'arbre d'hier, reconstruit et balayé par son propre
  script, 61 aussi. Le zéro d'hier n'est pas reproductible et sa cause n'est
  pas établie ; les 61 étaient réels et sont corrigés (HANDOFF §11.17 : six
  espèces, une seule loi — une boîte flex ou une piste de grille ne descend
  pas sous la largeur min-content de son contenu, et `overflow-wrap` n'y
  change rien). **Quand une mesure contredit un chiffre consigné, la
  première hypothèse à écarter est que le chiffre était faux — pas que la
  machine était lente.** Et une explication d'écart se mesure avant de
  s'écrire : la mienne tenait dans un `document.fonts.ready` qui, ajouté,
  n'a rien changé au compte.
