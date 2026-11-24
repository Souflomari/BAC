# 06 — Le plan jusqu'au lancement, et qui fait quoi

> Écrit le 2026-11-23, à la demande du propriétaire : un audit complet, une interface de niveau
> « premium », des pilotes améliorés, des règles pour refaire les autres cours, la partie données,
> et l'inventaire de ce qui reste avant le lancement. Ce document est le tableau de bord de ce
> chantier ; il se réécrit à chaque étape.

## 1. Où on en est

| Chantier | État |
|---|---|
| Interface : palette chaude, en-tête, accueil, filière, connexion, matières, examens, notions | fait (PR #6 à #12 d'Antigravity, relues et fusionnées) |
| Accueil : les trois leçons montrées par leur figure (`LeconsVitrine`) | fait (ce commit) |
| Interface « premium » : le reste (voir §2) | à faire |
| Pilotes : améliorations (voir §3) | à faire — la critique pédagogique est faite |
| Règles du format, vérifiables (voir §4) | à écrire, après les améliorations des pilotes |
| Données d'apprentissage et rappel espacé | spécifié : [`docs/design/APPRENTISSAGE-DONNEES.md`](../design/APPRENTISSAGE-DONNEES.md). **Construit le 2026-11-23** : le journal local (`web/src/lib/journal.ts`), branché sur les leçons et les exercices ; la reprise des leçons. **Reste** : le modèle (preuves, boîtes, calendrier), ce qu'on montre à l'élève, les identifiants d'erreurs et de capacités dans le contenu |
| Inventaire avant lancement | fait (voir §5) |

## 2. Interface « premium » : ce qui reste

Le site était juste mais sec. Le principe retenu : **la richesse vient de la matière** (les figures,
les nombres vrais, la typographie), jamais d'un décor.

1. **Programme de l'accueil** : les quatre cartes sont vides tant qu'on ne les ouvre pas. Y montrer
   la couverture réelle et les trois ou quatre premiers chapitres.
2. **Pages matières** : une figure d'en-tête par matière, tirée d'un vrai chapitre ; les unités
   comme un sommaire de manuel.
3. **Page de notion (ancien format)** : c'est la page la plus lue et la plus lourde (388 kB de
   JavaScript). Alléger, soigner la colonne de lecture, les encadrés et les figures.
4. **Examens** : la liste comme un vrai palmarès de sujets (année, session, durée, barème).
5. **Micro-détails partout** : transitions de survol sobres, états de focus, sélection de texte,
   pied de page complet (à propos, contact, mentions), pages d'erreur, page « à propos ».
6. **Coquille des pilotes et pages d'exercices** : cibles tactiles, barre du haut sur téléphone.
7. **Identité** : nom et logo (chantier 3 du brief), maquettes au propriétaire d'abord.

## 3. Pilotes : les améliorations retenues

Trois manques communs aux trois leçons (critique pédagogique du 2026-11-23) :

1. **Aucun rappel d'une partie précédente dans la séance.** Ajouter, après la pause du milieu, une
   étape `rappel` de deux ou trois questions sur les parties d'avant. La pause devient une vraie
   frontière : on peut y couper la leçon en deux séances.
2. **L'élève ne rédige jamais.** Après l'exemple commenté du bac, un second exemple où il choisit
   au moins deux lignes de la copie, puis une copie fautive où il trouve le point perdu.
3. **Les dérivations se lisent.** Une ligne choisie par l'élève dans toute dérivation de trois
   lignes ou plus.

Par leçon, les premières corrections :

- **Maths** : faire *déduire* l'hyperbole (étape `hyper`) au lieu de l'annoncer ; remplacer le pari
  d'opinion `reve` par « f(1) = ? » ; séparer signe et équivalences dans `croissance` et faire
  pratiquer l'inéquation ; relier la fin aux exercices, piège par piège (comme en SVT).
- **Physique** : retirer de `bac-copie` les phrases de barème non sourcées ; ajouter l'étape
  (N, Z) promise (l'exercice 12 interroge une capacité que la leçon n'enseigne pas) ; `c14` donne
  sa réponse dans l'énoncé ; couper `tau` (trois idées) ; affronter « t½ = 1/λ » et « la demi-vie
  dépend de la température ».
- **SVT** : le test de saut `v-savoir` vérifie une idée et en saute quatre ; `pari-u` est une
  devinette ; `fin-traduction` porte quatre idées sans pari ; poser en tant que telle la question
  « complémenter ou pas ? » ; barème de `bac-redaction` marqué « indicatif ».

**Fait le 2026-11-23 (première série)** : dans les trois leçons, la pause est suivie d'une étape
`rappel` ; maths : `reve` devient le pari « f(1) = ? », `croissance-2` fait pratiquer l'inéquation,
`egales` répare le pari faux, `retour` rappelle la règle du produit, options de `v-regle` de même
forme ; physique : phrases de barème non sourcées retirées de `bac-copie` ; SVT : `pari-u` devient un
raisonnement, nouveau pari `stop` avant la terminaison, barème marqué « indicatif ».

**Fait le 2026-11-23 (deuxième série)** : une ligne choisie par l'élève dans quatre calculs (maths :
`derivee`, `r-puissance2`, la racine carrée passe dans sa propre étape `r-racine` ; physique : `verif`,
et `ln2` avec le leurre « t½ = 1/λ ») ; physique : nouveau pari `spontanee` (chauffer ne change pas le
rythme) ; le texte ne réapparaît plus sous la barre « Retour / Suivant » quand le panneau défile.

**Fait le 2026-11-23 (troisième série)** : la reprise après rechargement (étape et réponses gardées
sur l'appareil) ; physique : scène et étape du diagramme (N, Z), une ligne choisie dans l'exemple du
bac ; maths : l'élève déduit l'hyperbole (`hyper-pourquoi`), second exemple du bac à compléter
(`bac-2`, `bac-2-suite`) et copie fautive à juger (`bac-erreur`) ; SVT : le réflexe « transcrit ou
non transcrit ? » (`reflexe-brin`).

**Reste** : le second exemple du bac en physique et en SVT ; le test de saut de la SVT ; couper `tau`
en physique ; le bilan produit par l'élève ; une ligne choisie dans les dérivations encore lues (le
contrôle les liste comme cibles) ; les étapes qui demandent de faire défiler le panneau quand l'élève
s'est trompé deux fois ; pendant `bac-2`, la scène montre un repère vide.

À unifier dans le moteur (`noyau.js`), aujourd'hui codé trois fois : le saut de « Ce qu'il faut
savoir », la pause, le sujet « à revoir », l'exercice lié à chaque piège.

## 4. Les règles du format (à figer après §3)

**Fait le 2026-11-23** : les règles sont écrites dans [`07-regles-du-format.md`](07-regles-du-format.md).
Neuf sont armées et vérifiées par `web/scripts/pilotes-regles.mjs` dans la CI ; dix autres demandent un
relecteur. La liste d'origine :

1. Un vrai pari : au moins deux options défendables, pas d'option « aucune idée », la réponse
   n'est pas dans le texte de l'étape.
2. Chaque option fausse a son retour, qui nomme l'erreur et la répare en deux phrases au plus.
3. Une ligne choisie par dérivation de trois lignes ou plus.
4. Une idée par étape : au plus quatre phrases, soixante mots hors formules, une phrase forte.
5. Une pause au milieu, suivie d'un rappel de deux ou trois questions.
6. Chaque conception erronée de la fiche bible est le leurre d'au moins une question.
7. Au bac : un exemple commenté, puis un exemple à compléter ; tout barème cite sa source ou dit
   « indicatif ».
8. Leçon et exercices se répondent : aucune capacité testée en exercice sans étape qui l'enseigne.
9. Pas d'indice de forme : la bonne réponse fait au plus 1,3 fois la longueur médiane des autres.
10. Un bilan que l'élève produit lui-même avant la fin.

Un modèle moins fort n'appliquera ces règles que si un contrôle automatique les vérifie : les
règles 1, 4, 5, 8 et 9 se contrôlent par script, et c'est le préalable à toute production en série.

## 4 bis. La production des autres notions

Le format est validé (ADR 0046). La chaîne, une notion à la fois :

1. `notion-designer` écrit le plan de la notion (cadre officiel, fiche bible, sujets réels) ;
2. `lesson-author` et `visual-author` écrivent la leçon, les scènes et les exercices, avec le kit
   ([`08-kit-de-lecon.md`](08-kit-de-lecon.md)) ;
3. les contrôles automatiques passent (règles, parcours, exercices) ;
4. `bac-fidelity-critic` puis `pedagogy-critic` relisent ; un modèle plus fort corrige ou renvoie.

**Notion d'essai : la fonction exponentielle** (maths, la suite naturelle du logarithme). La série
ne démarre que si cet essai tient : qualité des paris, exactitude, scènes lisibles au téléphone.

**Résultat de l'essai (2026-11-23) : il tient.** La leçon `/pilote/exponentielle` (58 étapes, 14
gabarits d'exercices) a été écrite par l'auteur à partir du plan, puis relue en entier. Tous les
contrôles passent. La relecture a trouvé une seule faute de fond, qu'aucun contrôle ne voit : dans
le second exemple du bac, un leurre menait à la bonne solution par un mauvais calcul (corrigé en
changeant l'équation). Leçon pour la série : le relecteur vérifie que **chaque leurre mène à un
résultat faux**. La leçon n'est pas liée depuis l'accueil ; restent à confirmer avant de la montrer
les points « à vérifier » du plan (exp définie comme réciproque de ln dans le programme officiel).

**La série (2026-11-24).** Deuxième leçon écrite par la chaîne : `/pilote/meiose` (SVT : la méiose,
la fécondation et les brassages ; 58 étapes, 12 gabarits), relue, tous contrôles verts, non liée
depuis l'accueil. Son « au bac » repose sur des exercices types : de vrais sujets de SVT sont
maintenant transcrits (dossier des sujets de SVT, statut « à vérifier ») et remplaceront le premier
exemple une fois vérifiés. Plan prêt et tranché pour la suivante : `specs/noyaux-masse-energie.md`
(physique). Règle de relecture ajoutée : un texte ne nomme une couleur que si elle est la même en
thème clair et en thème sombre (l'accent rouge, jamais « noir »).

Troisième leçon de la série : `/pilote/noyaux` (physique : noyaux, masse et énergie ; 59 étapes,
14 gabarits, une scène nouvelle, le diagramme d'énergie des sujets), relue sans retouche, tous
contrôles verts, non liée depuis l'accueil. Son « au bac » cite trois vrais sujets (2019, 2020,
2023). Reste « à vérifier » avant de la montrer : les emplois cités dans l'étape des usages.

Quatrième leçon de la série : `/pilote/suites` (maths : les suites numériques, séance 1 ; 59 étapes,
14 gabarits, une scène nouvelle, l'escalier d'une suite récurrente), relue sans retouche, tous
contrôles verts, non liée depuis l'accueil. Son « au bac » cite les sujets 2022 et 2019. Plans
prêts et tranchés pour les deux suivantes : `specs/dipole-rc.md` et `specs/transmission-caracteres.md`.

Cinquième leçon de la série : `/pilote/dipole-rc` (physique ; 58 étapes, 15 gabarits, une scène
nouvelle, le schéma de circuit), relue, tous contrôles verts, non liée depuis l'accueil. Relecture :
une étape montrait le circuit en charge pour une question sur une charge qui diminue ; le schéma
est accordé. Règle de relecture ajoutée : **la scène affichée dit la même situation que la
question**. Reste « à vérifier » : la notation de l'énergie emmagasinée, la disposition du schéma
du sujet 2022.

Sixième leçon de la série : `/pilote/transmission` (SVT : les lois de la transmission des caractères ;
59 étapes, 14 gabarits, une scène nouvelle, l'échiquier de croisement), relue sans retouche, tous
contrôles verts, non liée depuis l'accueil. Elle s'appuie sur quatre sujets de SVT encore « à
vérifier » et sur les effectifs de Mendel pris dans des sources secondaires : rien de cela ne se
montre aux élèves avant vérification. L'hérédité liée au sexe et la codominance restent à faire.

**Sujets de SVT vérifiés (2026-11-24).** Un second lecteur a relu les vingt blocs du dossier des
sujets de SVT sur les sources re-téléchargées : tous « vérifiés ». Conséquences : les barèmes et les
pourcentages que cite `/pilote/transmission` (sujet 2022, exercice 2) concordent avec le corrigé
imprimé ; ce verrou-là est levé, il lui reste les effectifs de Mendel. Pour `/pilote/meiose`, aucun
exercice réel ne porte sur les phases et la courbe d'ADN : seuls des QCM et un vrai-faux de
restitution existent ; ses deux exemples restent des exercices types, dits tels. Constaté sur les
corrigés : les mots « tétrade », « bivalent » et « ségrégation indépendante » n'y figurent pas ; la
filière PC écrit les phénotypes avec un point-virgule, la filière SVT avec une virgule.

**Retour du propriétaire sur `/pilote/suites` (2026-11-24)** : « assez bonne », mais chargée, des
couleurs à revoir à l'étape des zones, une interface encore un peu ennuyeuse. Deux critiques dédiés
(visuel sur captures, pédagogie sur le script) ont trouvé ce que la relecture d'exactitude n'avait
pas vu. Corrigé : la leçon passe de 59 à 53 étapes ; les zones sont un aplat léger, une à la fois,
dans une fenêtre resserrée ; l'hérédité s'enseigne par « f croissante », comme au bac ; le report
sur l'axe se fait en trois temps ; l'élève rédige la justification de la convergence et cite les
conditions de f(ℓ) = ℓ. La coquille commune est allégée (plus rien sur la scène que « Rejouer »,
« Suivant » seul bouton fort, l'option fausse en gris).

**La chaîne change** : après les contrôles automatiques et la relecture d'exactitude, chaque leçon
passe devant `ux-critic` (sur captures, ordinateur et téléphone) et `pedagogy-critic` (sur le
script), puis l'auteur corrige. Les cinq autres leçons de la série y passent avant toute nouvelle
production. Le second regard d'Antigravity est décrit dans
[`../revue-externe/MANDAT-LECONS.md`](../revue-externe/MANDAT-LECONS.md).

**Les cinq autres, relues et corrigées (2026-11-24)** : méiose 58 → 52 étapes, exponentielle 58 → 53,
noyaux 59 → 54, dipôle RC 59 → 56, transmission 59 → 53. Chaque plan de `specs/` porte maintenant en
tête une section 0, « La leçon livrée », avec l'ordre réel des étapes ; le fichier de la leçon fait
foi, le reste du plan garde les raisons et les sources. Trois défauts communs aux neuf leçons sont
corrigés dans le lecteur : une étape à calcul déroule toutes ses lignes avant de montrer la question ;
un fondu au bas du panneau dit qu'il reste du texte ; au téléphone, les textes de scène remontent à
11 px quand ils ne se touchent pas. Leçon pour la série : une expression régulière à regard arrière
casse les téléphones d'avant 2023, et seul `syntaxe-vieux-moteurs.mjs` le voit ; il se lance avant
chaque poussée de leçon.

## 5. Avant le lancement : les bloquants

Inventaire vérifié dans le dépôt le 2026-11-23. Trois faits qui cadrent tout :

- **`main` ne contient pas le site.** Fusionner la PR #2 serait le premier déploiement du site en
  production.
- **Le site est fermé aux moteurs de recherche** (`noindex` dans `web/src/app/layout.tsx`).
- **Les comptes sont éteints** : rien n'est enregistré pour l'élève, et un rechargement au milieu
  d'une leçon pilote repart de zéro.

Les dix bloquants, dans l'ordre :

| # | Bloquant | Nature |
|---|---|---|
| 1 | Le périmètre du lancement. **Tranché le 2026-11-23 (ADR 0046) : sans comptes pour l'instant, comptes juste avant le lancement.** Reste : quelles matières (SI vide, anglais absent, philosophie en français alors que l'épreuve est en arabe) | décision du propriétaire |
| 2 | Le nouveau format de leçon : **validé le 2026-11-23 (ADR 0046)** | fait |
| 3 | Séance supervisée : la production correspond-elle à l'historique des migrations ? | opération sensible, avec le propriétaire |
| 4 | Branch-test vert contre staging, puis migrations 048 à 051 | opération sensible |
| 5 | Fusion de la PR #2 et configuration Vercel (dossier `web/`, variables) | opération sensible + décision |
| 6 | Pages légales et de confiance : mentions, confidentialité (loi 09-08, élèves mineurs), contact, à propos, droits sur les sujets officiels | décision + rédaction |
| 7 | Nom de domaine, retrait du `noindex`, sitemap, robots, canonical hérité à corriger | petit |
| 8 | Suivi d'erreurs et mesure d'audience minimale (aujourd'hui : aucune visibilité) | décision (outil, vie privée) + petit |
| 9 | Progression de l'élève : reprise locale des leçons ; avec comptes : mot de passe oublié, suppression de compte, limites de débit, sauvegardes | moyen à gros |
| 10 | Essai sur de vrais téléphones (Android modeste, Safari iOS, connexion lente) : poids des pages, étiquettes des scènes, clavier et lecteur d'écran dans les pilotes | vérification réelle |

## 6. Qui fait quoi

Le principe : le modèle le plus fort conçoit, juge et fait ce qui est irréversible ou ambigu ; les
modèles plus rapides exécutent ce qui est spécifié et contrôlé par script.

| Qui | Pourquoi lui | Travaux |
|---|---|---|
| **Fable (cette session)** | conception, jugement, cohérence d'ensemble | la direction « premium » (§2) et ses pages de référence ; les améliorations des pilotes (§3) ; le moteur commun ; les règles du format et leurs contrôles (§4) ; la relecture de tout ce que produisent les autres |
| **Opus** | raisonnement long et prudent, opérations sensibles | la séance de synchronisation de production, le branch-test, les migrations (bloquants 3 à 5) ; le modèle d'apprentissage en code (`journal`, `apprentissage`, table de cas) ; les comptes (mot de passe oublié, suppression, limites de débit) ; la relecture d'exactitude des leçons produites en série |
| **Antigravity** | un vrai navigateur, un long contexte, la recherche sourcée | les essais sur de vrais écrans et le rapport de performance (bloquant 10) ; les PR d'interface restantes (pages d'erreur, coquille des pilotes) ; le paysage et l'identité avec maquettes (chantiers 9 et 3) ; l'audit d'accessibilité (clavier, lecteur d'écran) ; la vérification des faits « à confirmer » à la source |
| **Sonnet** | exécution soignée sur spécification | refaire les 59 autres notions au nouveau format, une par une, à partir de la fiche bible, des règles (§4) et d'un pilote modèle, sous contrôle des scripts ; les gabarits d'exercices ; les pages légales à partir des décisions du propriétaire ; sitemap, robots, canonical, manifeste |
| **Haiku** | rapide, peu coûteux, pour le mécanique | la transcription des annales manquantes (SVT, PC filière SM) avec double relecture ; le registre des erreurs classiques (identifiants stables à la place du texte libre) ; les étiquettes de capacités par question ; les passes de typographie et de cohérence |
| **Le propriétaire** | lui seul peut | le périmètre du lancement, le format, le nom et le logo, le domaine, l'offre Supabase, l'outil de mesure, les textes légaux, chaque mise en production |

Deux garde-fous pour la production en série (Sonnet, Haiku) : rien n'est étendu avant la validation
du format par le propriétaire, et aucune leçon n'entre sans passer les contrôles automatiques puis
une relecture d'exactitude par un modèle plus fort.
