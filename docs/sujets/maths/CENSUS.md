# CENSUS — Examens nationaux Mathématiques (2ème Bac), 2008–2025, N + R

> **Phase B1 du plan `docs/pipeline/mastery-push-plan.md` (Lane B).** Carte de
> tout sujet de maths du national trouvable, **deux épreuves jamais fondues**
> (README §0) : **SM** (Sciences Maths A & B, `NS 24F`, 4 h, coef 9) et
> **SExp** (Sciences Expérimentales = SVT + Sc. Physiques, même sujet,
> `NS 22F`, 3 h, coef 7). Décomposition en exercices mappés sur les 14 slugs
> de `content/maths/` (`arithmetique` et `structures-algebriques` : SM
> seulement ; `nombres-complexes-1` : SExp ; `nombres-complexes-2` : SM).
> Ce document est un **recensement**, pas une transcription (transcription =
> B2, protocole README §3).
>
> **Honnêteté de cette passe (2026-07-24).** Session interrompue par un
> redémarrage d'infrastructure ; ce census converge sur : (a) l'inventaire
> `element/<n>` consigné dans `INDEX.md` avant redémarrage ; (b) les scans
> p. 1 téléchargés avant redémarrage (dossier de travail) relus par **cinq
> lecteurs** post-redémarrage ; (c) les 4 sujets déjà décomposés et
> **vérifiés** en passe v0.2 (SM 2019 N ; SExp 2019/2022/2023 N). Le lecteur
> des années SM anciennes (2010–2016 N) **n'a jamais rendu** : ces sessions
> sont marquées `non lu`, pas devinées. La décomposition vient de la lecture
> de la **page 1** (« composantes » + premiers énoncés) sauf pour les 4
> sujets v0.2 lus en entier : le contenu intérieur des problèmes d'analyse
> reste `(?)` / `contenu à transcrire`. **Aucune ligne n'est inventée.**
> Aucun sujet n'est marqué `introuvable` : les trous restants n'ont pas fait
> l'objet d'une recherche ayant survécu au redémarrage (≠ recherche réelle
> infructueuse).
>
> **FLAG global (lecteur SExp 2009–2015)** : les 7 fichiers SExp N
> 2009–2015 sont des **retypes enseignant (AGOUZAL/2BPCF), PAS des scans
> officiels** — pas de code NS/RS, ni durée, ni coef ; fidélité non
> vérifiable. Reporté verbatim sur chaque ligne concernée.

> **MISE À JOUR DU 2026-08-27 — cinq sessions SM réellement lues.** Les lignes
> SM 2020 N, 2022 N, 2023 N, 2024 N et 2025 N passent de `sourcé-confirmé`
> (page 1 entrevue) à **`décomposé`** : leurs pages 1 ont été relues à l'image
> et, pour quatre d'entre elles, les exercices d'analyse ont été transcrits
> dans `docs/sujets/_incoming/`. Ce que cette relecture a corrigé ou ajouté
> est porté dans la colonne « Note » de chaque ligne — et trois trouvailles
> dépassent le recensement :
>
> 1. **Le format à choix de SM 2020 a une conséquence dans le code**, que
>    personne n'avait tracée : `web/src/lib/examens.ts` somme tous les
>    `bareme_total` d'une épreuve et n'a aucune notion d'exercice optionnel.
>    Cette épreuve est **déjà sur-comptée** dans Examens blancs. Consigné en
>    `docs/grounding/known-issues.md` **K-0**, avec trois issues possibles et
>    aucune choisie.
> 2. **SM 2024 N porte un défaut du sujet officiel** : sa page 1 croise les
>    numéros des exercices 4 et 5 par rapport au corps. Sans effet sur le /20,
>    piégeux pour une conversion.
> 3. **Les scans ne se valent pas.** 2024 et 2025 sont propres ; 2023 a un
>    mojibake intermittent ; 2022 a une substitution de police totale. Cette
>    information conditionne le coût de toute transcription future et n'était
>    nulle part.
>
> **Piège opératoire, à connaître avant de re-télécharger quoi que ce soit :**
> AlloSchool répond parfois par une redirection 301 (forme `index.ph%70`) que
> `curl` enregistre en « JPEG » de 288 octets. Refetcher avec `-L` et un
> User-Agent de navigateur, puis contrôler `file *.jpg`.

**Légende statut** ·
`sourcé-confirmé` = scan officiel ouvert et lu (en-tête/composantes) ·
`sourcé-listé` = URL `element/<n>` relevée sur le hub, jamais ouverte ·
`retype-non-officiel` = document lu mais recomposé/retypé, pas un scan officiel ·
`non lu` = scan téléchargé, lecteur jamais rendu ·
`non recherché` = jamais atteint dans ce qui a survécu.

**Patterns d'URL (AlloSchool, source primaire — INDEX §2)** ·
page sujet : `https://www.alloschool.com/element/<ID>` ·
images : `https://www.alloschool.com/assets/documents/course-<X>/upload-<Y>/000k-big.jpg` ·
hub SM : `section/4660` (annonce 2010→2025 N+R, images `course-436`) ·
hub SExp : `section/5321` (annonce 2009→2024 N+R, images `course-438`).

---

## 1. Table par session — SM (NS 24F, 36 sujets attendus)

| Année | Session | Code lu | Source (element ; corrigé) | Statut | Note |
|------:|:-------:|:-------:|-----------------------------|--------|------|
| 2008 | N | — | — | non recherché | hors annonce hub (2010→) |
| 2008 | R | — | — | non recherché | |
| 2009 | N | — | — | non recherché | hors annonce hub |
| 2009 | R | — | — | non recherché | |
| 2010 | N | — | hub 4660, élément non consigné ; scan p.1 sur disque | non lu | lecteur jamais rendu |
| 2010 | R | — | — | non recherché | sur le hub, élément non relevé |
| 2011 | N | — | idem 2010 N | non lu | |
| 2011 | R | — | — | non recherché | |
| 2012 | N | — | idem | non lu | |
| 2012 | R | — | — | non recherché | |
| 2013 | N | — | idem | non lu | |
| 2013 | R | — | — | non recherché | |
| 2014 | N | — | idem | non lu | |
| 2014 | R | — | — | non recherché | |
| 2015 | N | — | idem | non lu | |
| 2015 | R | — | — | non recherché | |
| 2016 | N | — | idem | non lu | |
| 2016 | R | — | — | non recherché | |
| 2017 | N | NS25 | `57970` ; corrigé `57972` | **décomposé** (2026-08-27) | code ≠ NS24F, lu sur scan. 4 exercices : Ex1 structures 3,5 · Ex2 complexes 3,5 · Ex3 arithmétique 3 · **Ex4 analyse 10 pts** (transcrit ET **vérifié en deux passes**, `_incoming/maths-sm-2017-n.md` — la 1re tuée en cours d'écriture, la 2de a soldé les 5 points ouverts). **⚠️ Substitution de police MASSIVE en Partie 3**, police cassée **réellement incorporée au PDF** (273 884 o) : le dégât est cuit dans le sujet officiel. Clé de décodage : chaque point de code lu comme un code **Adobe Symbol** retombe sur le symbole attendu (10 codes indépendants). **3 défauts du sujet officiel**, dont un **ℕ* physiquement ABSENT** (image de 2×2 px à sa place) et un `;` imprimé là où le sens exige ≃ |
| 2017 | R | — | — | non recherché | |
| 2018 | N | — | `65508` ; corrigé `65510` | retype-non-officiel | recomposé, sans en-tête ministériel ; p.1 seule énumérée |
<!-- Recherche exhaustive d'un scan officiel 2018 N (2026-08-22, recon
     AlloSchool) : les documents des cours SM-A (65507) et SM-B (65508)
     sont BYTE-IDENTIQUES (md5 c1b4b10d802f55b3e546e83ba31a28d3), page 1
     inspectée : retype LaTeX/Word, AUCUN en-tête ministériel ; la
     recherche du site ne renvoie que ces paires. CONCLUSION : aucun scan
     officiel du 2018 N n'existe sur AlloSchool — la porte owner sur la
     conversion depuis ce retype reste fermée, sauf décision owner
     d'accepter le retype avec provenance explicite. -->
| 2018 | R | — | — | non recherché | |
| 2019 | N | NS24F | `68482` (`upload-54931`, 5 p.) ; corrigé `106425` | sourcé-confirmé | décomposé v0.2, 4 entrées `vérifié` |
| 2019 | R | RS25 | `94396` | sourcé-confirmé | code sans F, lu sur scan |
| 2020 | N | NS25 | `109635` (`upload-80775`, 5 p.) ; corrigé `109637` | **décomposé** (2026-08-27) | **format à CHOIX, confirmé sur la p. 1 lue** : « traiter EXERCICE3 et EXERCICE4 et choisir de traiter EXERCICE1 **ou bien** EXERCICE2 — au total **trois** exercices ». Ex1 arithmétique 3,5 *au choix* · Ex2 structures algébriques 3,5 *au choix* · Ex3 complexes 3,5 obligatoire · **Ex4 analyse 13 pts** obligatoire. Barème d'un candidat = 3,5+3,5+13 = 20. **Conséquence tracée jusqu'au code : voir `docs/grounding/known-issues.md` K-0** — `lib/examens.ts` somme tout et sur-compte déjà cette épreuve |
| 2020 | R | — | `109639` | sourcé-listé | jamais ouvert |
| 2021 | N | NS24F | `127193` (`upload-84150`, **4 p.**) ; corrigé `136837` | **décomposé** (2026-08-27) | **3 exercices, confirmé au cartouche** (« L'épreuve comporte 3 exercices indépendants ») : **Ex1 analyse 12 pts** (transcrit, NON vérifié, `_incoming/maths-sm-2021-n.md`) · Ex2 complexes 4 · Ex3 arithmétique 4. **Les 12 pts sont LUS, plus inférés** ; les deux notes atypiques (3 exercices, pas de structures algébriques) sont confirmées. 24 questions, toutes à 0,5. Scan **propre** — ni substitution ni mojibake. Métadonnées PDF : `KONICA MINOLTA bizhub 287`, créé le **2021-06-14** (fenêtre de la session). ⚠️ Piège d'OCR consigné : la bande d'en-tête entière rend l'année des p. 2-3 comme « 2024 » — artefact du contexte arabe, cassé dès qu'on recadre sur les 4 chiffres |
| 2021 | R | — | `127195` | sourcé-listé | |
| 2022 | N | NS24F | `136604` (`upload-84506`, 5 p.) ; corrigé `136841` | **décomposé** (2026-08-27) | 5 exercices : **Ex1 analyse 10 pts** (transcrit, `_incoming/maths-sm-2022-n.md`) · Ex2 complexes 3,5 · Ex3 arithmétique 3 · Ex4 structures 3,5. **⚠️ Scan à substitution de police MASSIVE** — aucun symbole non alphabétique ne s'y lit pour ce qu'il montre ; table de glyphes dans le fichier `_incoming` |
| 2022 | R | RS24F | `136606` | sourcé-confirmé | |
| 2023 | N | NS24F | `142490` (`upload-85316`, 5 p.) ; corrigé `142492` | **décomposé** (2026-08-27) | 5 exercices : **Ex1 analyse 7,75** + **Ex2 analyse 2,25** (les deux transcrits ET **vérifiés**, `_incoming/maths-sm-2023-n.md`) · Ex3 complexes 3,5 · Ex4 arithmétique 3 · Ex5 structures 3,5. Mojibake **intermittent** (le $\le$ rendu par une double virgule à six endroits) |
| 2023 | R | RS24F | `142494` | sourcé-confirmé | |
| 2024 | N | NS24F | `145739` (`upload-87447`, 5 p.) ; corrigé `145737` | **décomposé** (2026-08-27) | 5 exercices : **Ex1 analyse 7,5** + **Ex2 analyse 2,5** (les deux transcrits ET **vérifiés**, `_incoming/maths-sm-2024-n.md`) · Ex3 complexes 3,5 · Ex4 structures 3,5 · Ex5 arithmétique 3. Scan **propre**, aucun mojibake. **⚠️ Défaut du sujet officiel** : la p. 1 croise les numéros 4 et 5 par rapport au corps — documenté, non réparé |
| 2024 | R | RS25 | `145741` | sourcé-confirmé | FLAG lecteur : code sans « F » |
| 2025 | N | NS - 24F | `145783` (`upload-87482`, **6 fichiers**) ; corrigé non listé | **décomposé** (2026-08-27) | **QUATRE** exercices seulement : **Ex1 analyse 10 pts** (transcrit, `_incoming/maths-sm-2025-n.md`) · Ex2 complexes 3,5 · Ex3 arithmétique 3 · Ex4 structures 3,5. Scan propre. **Pagination décalée** : 6 fichiers pour une pagination « n/5 » — le fichier 1 est une couverture non numérotée. Émetteur imprimé changé (« المركز الوطني للامتحانات المدرسية وتقييم التعلمات »). **`arctan` apparaît en I-5b** — aucun rung dans une leçon, mais **déjà ponté au point d'usage** par `bk-2024-r-x2` dans `content/maths/calcul-integral/bank.yaml` (l'affirmation « aucun précédent dans le corpus » était fausse). **CONVERTI** le 2026-08-27 : `bk-2025-n-x1` dans `fonction-exponentielle`, épreuve à 20,00/20 |
| 2025 | R | RS24F | `145785` | sourcé-confirmé | |

**SM : 13 sourcé-confirmé · 1 retype-non-officiel · 2 sourcé-listé ·
7 non lu · 13 non recherché.**

## 1bis. Table par session — SExp (NS 22F, 36 sujets attendus)

| Année | Session | Code lu | Source (element ; corrigé) | Statut | Note |
|------:|:-------:|:-------:|-----------------------------|--------|------|
| 2008 | N | — | — | non recherché | hors annonce hub (2009→) |
| 2008 | R | — | — | non recherché | |
| 2009 | N | — (retype) | retype AGOUZAL/2BPCF, élément non consigné | retype-non-officiel | scan officiel probable sur hub (`course-438`), non téléchargé |
| 2009 | R | — | — | non recherché | |
| 2010 | N | — (retype) | idem | retype-non-officiel | |
| 2010 | R | — | — | non recherché | |
| 2011 | N | — (retype) | idem | retype-non-officiel | atypique : ni géométrie ni probas |
| 2011 | R | — | — | non recherché | |
| 2012 | N | — (retype) | idem | retype-non-officiel | |
| 2012 | R | — | — | non recherché | |
| 2013 | N | — (retype) | idem | retype-non-officiel | |
| 2013 | R | — | — | non recherché | |
| 2014 | N | — (retype) | idem | retype-non-officiel | |
| 2014 | R | — | — | non recherché | |
| 2015 | N | — (retype) | idem | retype-non-officiel | FLAG lecteur : session annulée ; barème visible 17/20 |
| 2015 | R | — | — | non recherché | |
| 2016 | N | NS22F | `94485` ; corrigé `94490` | sourcé-confirmé | |
| 2016 | R | — | `94502` | sourcé-listé | jamais ouvert |
| 2017 | N | NS22F | `94525` ; corrigé `94530` | sourcé-confirmé | |
| 2017 | R | — | — | non recherché | élément non relevé |
| 2018 | N | NS22F | `94699` (`course-438/upload-70450`, **4 p.**) ; corrigé `94704` | **décomposé** (2026-08-27) | Durée 3 h, coef 7. 4 exercices : géométrie espace 3 · complexes 3 · **probabilités 3** · **Problème 11 pts** (transcrit, NON vérifié, `_incoming/maths-sexp-2018-n.md`). **Les 11 pts sont LUS, plus inférés** ; 20 questions, I 0,75 + II 8,25 + III 2,00 = 11,00. Scan propre (un seul glyphe substitué, en II-5, adjugé ≈ **par conséquence** : $f(4)=4{,}2198…$, donc pas `=`). **⚠️ Anomalie de `<title>`** : le titre servi dit « Sciences et **Technologies** » — anomalie **systématique sur tout `course-438`** (vérifiée sur `94525` et `94485`, tous deux NS22F confirmés) ; la filière est nommée d'après le CARTOUCHE, qui imprime مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية = Sciences Expérimentales. À arbitrer explicitement |
| 2018 | R | — | — | non recherché | |
| 2019 | N | NS22F | `68527` (`upload-54971`, 4 p.) ; corrigé `100965` | sourcé-confirmé | décomposé v0.2, entrées `vérifié` |
| 2019 | R | RS22F | `106247` | sourcé-confirmé | |
| 2020 | N | NS22F | `109797` ; corrigé `109803` | sourcé-confirmé | ATYPIQUE : ni géométrie ni probas |
| 2020 | R | — | `109808` | sourcé-listé | |
| 2021 | N | NS22F | `127180` ; corrigé `136793` | sourcé-confirmé | ATYPIQUE : ni géométrie ni probas |
| 2021 | R | — | `127185` | sourcé-listé | |
| 2022 | N | NS22F | `136586` (`upload-84495`, 4 p.) ; corrigé `136803` | sourcé-confirmé | décomposé v0.2 |
| 2022 | R | RS22F | `136591` | sourcé-confirmé | |
| 2023 | N | NS22F | `137482` (`upload-84924`, 4 p.) ; corrigé `137472` | sourcé-confirmé | décomposé v0.2 — **pilote** |
| 2023 | R | RS22F | `142250` | sourcé-confirmé | |
| 2024 | N | NS22F | `144505` ; corrigé `144510` | sourcé-confirmé | |
| 2024 | R | RS22F | `145811` | sourcé-confirmé | |
| 2025 | N | NS-22F | élément non consigné (scan téléchargé pré-redémarrage) | sourcé-confirmé | |
| 2025 | R | RS22F | élément non consigné | retype-non-officiel | FLAG lecteur : doc recomposé LaTeX, provenance à confirmer ; incohérence « trois exercices » vs tableau de 4 |

**SExp : 14 sourcé-confirmé · 8 retype-non-officiel · 3 sourcé-listé ·
11 non recherché.**

---

## 2. Décomposition par sujet (36 sujets énumérés / 72)

Barèmes entre parenthèses (points). `(?)` = mapping incertain (lecture p.1
seulement). Problèmes d'analyse : mappés sur **tous** leurs slugs avec la
notation maison `(problème — extraits)` ; quand la fonction dominante n'a
pas été identifiée, `contenu à transcrire` — jamais deviné.

### SM (14 sujets énumérés ; 57 exercices)

| Sujet | Exercices → slugs |
|-------|-------------------|
| 2017 N | Ex1 structures algébriques (3,5) → `structures-algebriques` · Ex2 complexes (3,5) → `nombres-complexes-2` · Ex3 arithmétique (3) → `arithmetique` · **Ex4 analyse (10) → `fonction-exponentielle`** (tranché : $f(x)=(1+1/x)e^{-1/x}$, le $\ln$ n'est nulle part dans sa définition — 6,25 des 10 pts sans un seul logarithme) · cross-lists `limites-continuite`, `derivabilite-etude-fonctions`, `calcul-integral`, `suites-numeriques`, `fonction-logarithme` |
| 2018 N *(retype ; p.1 seule)* | Ex1 structures algébriques (3,5) → `structures-algebriques` · Ex2 arithmétique (3) → `arithmetique` · **suite du sujet non lue** |
| 2019 N *(v0.2, vérifié)* | Ex1 loi interne sur ℂ, groupe, isomorphisme (3,5) → `structures-algebriques` · Ex2 équation paramétrée, rotation (3,5) → `nombres-complexes-2` · Ex3 congruences mod 2969, Bézout, Fermat (3) → `arithmetique` · Ex4 fonction $e^{-x}$, Rolle/TAF, intégrale, suite (10) → `fonction-exponentielle` + `derivabilite-etude-fonctions` + `limites-continuite` + `calcul-integral` + `suites-numeriques` (problème — extraits) |
| 2019 R | Ex1 complexes (3,5) → `nombres-complexes-2` · Ex2 calcul des probabilités (3) → `probabilites-conditionnelles` (?) · Ex3 structures algébriques (3,5) → `structures-algebriques` · Problème analyse (10) → (?) contenu à transcrire |
| 2020 N | Ex1 arithmétique (3,5, **au choix** ; visible p.1 : $7x^3-13y=5$) → `arithmetique` · Ex2 structures algébriques (3,5, **au choix**) → `structures-algebriques` · Ex3 complexes (3,5, obligatoire) → `nombres-complexes-2` · Problème analyse (13, obligatoire) → (?) contenu à transcrire |
| 2021 N | **Ex1 analyse (12) → slug dominant NON TRANCHÉ** : mesure question par question `suites-numeriques` 5,0 · `fonction-exponentielle` 4,0 · TVI/encadrements 2,0 · `calcul-integral` 1,0. Le transcripteur refuse de trancher — les 5,0 se scindent en **deux suites indépendantes**, et retenir autre chose que l'exponentielle contredirait l'arbitrage rendu sur SM 2025. **Troisième option** : à 12 pts (le plus gros exercice du corpus SM), partitionner Partie I → `fonction-exponentielle` (5,0) / Parties II+III → `suites-numeriques` (7,0). **Arbitrage owner** · Ex complexes (4) → `nombres-complexes-2` · Ex arithmétique (4) → `arithmetique` — **pas de structures algébriques** |
| 2022 N | Problème analyse (10) → (?) · complexes (3,5) → `nombres-complexes-2` · arithmétique (3) → `arithmetique` · structures algébriques (3,5) → `structures-algebriques` |
| 2022 R | Problème analyse (10) → (?) · complexes (3,5) → `nombres-complexes-2` · structures algébriques (3,5) → `structures-algebriques` · arithmétique (3) → `arithmetique` |
| 2023 N | Analyse (7,75) → (?) · Analyse (2,25) → `calcul-integral` \| `suites-numeriques` (?) · complexes (3,5) → `nombres-complexes-2` · arithmétique (3) → `arithmetique` · structures algébriques (3,5) → `structures-algebriques` |
| 2023 R | Problème analyse (10) → (?) · complexes (3,5) → `nombres-complexes-2` · structures algébriques (3,5) → `structures-algebriques` · arithmétique (3) → `arithmetique` |
| 2024 N | Analyse (7,5) → (?) · Analyse (2,5) → (?) · complexes (3,5) → `nombres-complexes-2` · arithmétique (3) → `arithmetique` · structures algébriques (3,5) → `structures-algebriques` |
| 2024 R | Analyse (6,5) → (?) · Analyse (3,5) → (?) · complexes (3,5) → `nombres-complexes-2` · structures algébriques (3,5) → `structures-algebriques` · arithmétique (3) → `arithmetique` |
| 2025 N | **Ex1 analyse (10) → `fonction-exponentielle`** (tranché sur mesure : plus gros bloc unique 3,5/10, et $f$ EST une exponentielle) · **CONVERTI** `bk-2025-n-x1` · complexes (3,5) → `nombres-complexes-2` · arithmétique (3) → `arithmetique` · structures algébriques (3,5) → `structures-algebriques`. **Réserve owner conservée** : aucun bloc n'atteint la moitié, le partitionnement reste ouvert |
| 2025 R | Analyse (7,75) → (?) · Analyse (2,25) → (?) · complexes (3,5) → `nombres-complexes-2` · arithmétique (3) → `arithmetique` · structures algébriques (3,5) → `structures-algebriques` |

> Note lecteur SM 2023–2025 : **aucune trace de probabilités/dénombrement**
> dans ces six sujets. Le seul exercice de probabilité SM relevé est 2019 R
> (classement conditionnelle vs dénombrement incertain → `(?)`).

### SExp (22 sujets énumérés ; 99 exercices)

| Sujet | Exercices → slugs |
|-------|-------------------|
| 2009 N *(retype)* | géométrie espace (3) → `geometrie-espace` · complexes (3) → `nombres-complexes-1` · calcul intégral (2) → `calcul-integral` · dénombrement (3) → `denombrement` · Problème (9) → `fonction-exponentielle` (?) + `limites-continuite` + `derivabilite-etude-fonctions` + `suites-numeriques` (problème — extraits) — numérotation double « Ex2 » |
| 2010 N *(retype)* | géométrie espace (3) · complexes (3) · dénombrement (3) · suites (3) → `suites-numeriques` · Problème (8) → `fonction-exponentielle` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` (extraits) |
| 2011 N *(retype)* | fonction ln (2,5) → `fonction-logarithme` (?) · suites (3) · complexes (5) · Problème (9,5) → `fonction-exponentielle` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` (extraits) — ATYPIQUE : ni géométrie ni probas |
| 2012 N *(retype)* | géométrie espace (3) · complexes (3) · dénombrement (3) · suites (3) · Problème (8) → `fonction-logarithme` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` (extraits) — double « Ex3 » |
| 2013 N *(retype)* | géométrie espace (3) · complexes (3) · dénombrement (3) · suites (3) · Problème (8) → `fonction-exponentielle` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` (extraits) — double « Ex3 » |
| 2014 N *(retype)* | géométrie espace (3) · complexes (3) · suites (3) · dénombrement (3) · Problème (8) → `fonction-logarithme` + `limites-continuite` + `derivabilite-etude-fonctions` (pas d'intégrale visible) |
| 2015 N *(retype ; session annulée — flag lecteur)* | géométrie espace (3) · complexes (3) · dénombrement (3) (+ `probabilites-conditionnelles` (?) partie II, deux urnes) · Problème (8) → `fonction-logarithme` + `limites-continuite` + `derivabilite-etude-fonctions` — barème visible 17/20 ; suites manquantes (?) |
| 2016 N | suites (2,5) → `suites-numeriques` · géométrie espace (3) · complexes (3) · probas (3) → `probabilites-conditionnelles` (?) · Problème (8,5) → `fonction-logarithme` (?) + `calcul-integral` + `limites-continuite`/`derivabilite-etude-fonctions` (?) (extraits) |
| 2017 N | géométrie espace (3) · probas (3) → `denombrement` \| `probabilites-conditionnelles` (?) · complexes (3) · Problème (11) → ln (?) + `calcul-integral` + `suites-numeriques` + limites/dérivabilité (?) (extraits) |
| 2018 N | géométrie espace (3) · complexes (3) · **probabilités (3)** — le cartouche dit « Calcul des probabilités » alors que `bk-2018-n-x3` est rangé sous `denombrement` (**écart signalé**, défendable) · **Problème (11) → dominant `derivabilite-etude-fonctions`** (4,75/11) · cross-lists `limites-continuite` (2,25), `calcul-integral` (2,00), `suites-numeriques` (2,00), `fonction-exponentielle` (transversal). **PAS de `fonction-logarithme`** : le problème ne contient AUCUN logarithme — $g(x)=e^x-x^2+3x-1$ puis $f(x)=(x^2-x)e^{-x}+x$ — la prévision « ln\|exp (?) » de ce recensement était fausse |
| 2019 N *(v0.2, vérifié)* | Ex1 géométrie espace (3) → `geometrie-espace` · Ex2 complexes (3) → `nombres-complexes-1` · Ex3 probabilité par dénombrement (3) → `denombrement` · Problème fonction ln, IPP, suite (11) → `fonction-logarithme` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` + `suites-numeriques` (problème — extraits) |
| 2019 R | géométrie espace (3) · complexes (3) · probas (3) (?) · Problème (11) → `calcul-integral` + `suites-numeriques` + ln\|exp (?) (extraits) — limites/dérivabilité non relevées (?) |
| 2020 N *(ATYPIQUE)* | suites (4) → `suites-numeriques` · complexes (5) · limites + dérivabilité + intégrale (4) → `limites-continuite`/`derivabilite-etude-fonctions`/`calcul-integral` (?) · Problème (7) → ln (?) — ni géométrie ni probas |
| 2021 N *(ATYPIQUE)* | fonctions numériques (2) → `derivabilite-etude-fonctions` \| `limites-continuite` (?) · suites (4) · complexes (5) · Problème (9) → ln (?) + `calcul-integral` (extraits) — ni géométrie ni probas |
| 2022 N *(v0.2, vérifié)* | Ex1 géométrie espace (3) · Ex2 complexes (3) · Ex3 probabilité par dénombrement (3) → `denombrement` · Ex4 éq. diff. $y''-2y'+y=0$ + primitive/IPP (2,5) → `equations-differentielles` + `calcul-integral` · Problème fonction $e^{x/2}$, suite (8,5) → `fonction-exponentielle` + `limites-continuite` + `derivabilite-etude-fonctions` + `suites-numeriques` (problème — extraits) |
| 2022 R | suites (2,5) · géométrie espace (3) · complexes (3) · probas (3) (?) · Problème (8,5) → ln (?) + intégrale (?) + limites/dérivabilité (?) (extraits) |
| 2023 N *(v0.2, vérifié — pilote)* | Ex1 géométrie espace (3) · Ex2 complexes (3) · Ex3 **probabilités conditionnelles** (arbre, $p(A/B)$, v.a. $X$) (3) → `probabilites-conditionnelles` · Problème fonction ln, IPP, suite (11) → `fonction-logarithme` + `limites-continuite` + `derivabilite-etude-fonctions` + `calcul-integral` + `suites-numeriques` (problème — extraits) |
| 2023 R | suites (3) · géométrie espace (3) · complexes (3) · probas (3) (?) · Problème (8) → ln (?) + intégrale (?) + limites/dérivabilité (?) (extraits) |
| 2024 N | suites (3) · géométrie espace (3) · complexes (4) · probas (2) (?) · Problème (8) → ln (?) + intégrale (?) + limites/dérivabilité (?) (extraits) |
| 2024 R | géométrie espace (3) · complexes (4) · probas (2) (?) · Problème (11) → ln (?) + intégrale (?) + `suites-numeriques` + limites/dérivabilité (?) (extraits) |
| 2025 N | géométrie espace (3) · complexes (3,5) · probas (2,5) (?) · Problème (11) → ln\|exp (?) + intégrale (?) + `suites-numeriques` + limites/dérivabilité (?) (extraits) |
| 2025 R *(retype LaTeX — flag lecteur)* | suites (3) · géométrie espace (3) · complexes (3,5) · probas (2,5) (?) · Problème (8) → ln (?) + limites/dérivabilité (?) (extraits) |

---

## 3. Rollup par notion (14 slugs)

« Fermes » = attributions sans `(?)` (lecture v0.2 vérifiée, ou slug nommé
sans réserve par le lecteur — les retypes comptent, flag porté). Les
extraits de problème comptent 1 par slug (discipline cross-list maison).

| Slug | SM fermes | SM (?) | SExp fermes | SExp (?) | Années/sessions (fermes ; puis (?)) |
|------|:---:|:---:|:---:|:---:|--------------------------------------|
| `nombres-complexes-1` | — | — | **22** | 0 | présent dans les 22 sujets SExp énumérés (2009–2015 N retype · 2016 N → 2025 R) |
| `suites-numeriques` | 1 | 1 | **20** | 1 | SM : 2019 N (extraits) ; (?) 2023 N. SExp dédiés : 2010/2012/2013/2014 N (retype), 2016 N, 2020 N, 2021 N, 2022 R, 2023 R, 2024 N, 2025 R ; extraits : 2009 N (retype), 2017 N, 2018 N, 2019 N, 2019 R, 2022 N, 2023 N, 2024 R, 2025 N ; (?) 2015 N |
| `geometrie-espace` | — | — | **19** | 0 | 2009/2010/2012/2013/2014/2015 N (retype) + 2016–2019 N, 2019 R, 2022 N/R, 2023 N/R, 2024 N/R, 2025 N/R — absent 2011 N, 2020 N, 2021 N |
| `calcul-integral` | 1 | 1 | **12** | 6 | SM : 2019 N (extraits) ; (?) 2023 N. SExp dédiés : 2009 N (retype), 2022 N ; extraits : 2010–2013 N (retype), 2016 N, 2017 N, 2018 N, 2019 N, 2019 R, 2021 N, 2023 N ; (?) 2020 N, 2022 R, 2023 R, 2024 N/R, 2025 N |
| `structures-algebriques` (SM) | **13** | 0 | — | — | 2017 N, 2018 N (retype), 2019 N/R, 2020 N (choix), 2022 N/R, 2023 N/R, 2024 N/R, 2025 N/R — absent 2021 N |
| `arithmetique` (SM) | **13** | 0 | — | — | 2017 N, 2018 N (retype), 2019 N, 2020 N (choix), 2021 N, 2022 N/R, 2023 N/R, 2024 N/R, 2025 N/R — absent 2019 R |
| `nombres-complexes-2` (SM) | **13** | 0 | — | — | 2017 N, 2019 N/R, 2020 N, 2021 N, 2022 N/R, 2023 N/R, 2024 N/R, 2025 N/R |
| `derivabilite-etude-fonctions` | 1 | 1 | **10** | 12 | SM : 2019 N (Rolle/TAF, extraits) ; (?) 2017 N. SExp : 2009–2015 N (retype, extraits) + 2019/2022/2023 N (extraits) ; (?) 2016–2018 N, 2019 R, 2020 N, 2021 N, 2022 R, 2023 R, 2024 N/R, 2025 N/R |
| `limites-continuite` | 1 | 0 | **10** | 12 | mêmes listes que dérivabilité (embarqué — jamais d'exercice dédié, convention maison) |
| `denombrement` | 0 | 0 | **8** | 9† | SExp : 2009/2010/2012/2013/2014/2015 N (retype) + 2019 N, 2022 N ; † 9 probas non classées (voir note) |
| `fonction-logarithme` | 0 | 0 | **5** | 13 | SExp : 2012/2014/2015 N (retype, extraits) + 2019 N, 2023 N ; (?) 2011 N (dédié), 2016 N, 2017 N, 2020 N, 2021 N, 2022 R, 2023 R, 2024 N/R, 2025 R + ln\|exp 2018 N, 2019 R, 2025 N |
| `fonction-exponentielle` | 1 | 0 | **4** | 4 | SM : 2019 N. SExp : 2010/2011/2013 N (retype, extraits) + 2022 N ; (?) 2009 N (retype) + ln\|exp 2018 N, 2019 R, 2025 N |
| `probabilites-conditionnelles` | 0 | 1 | **1** | 11† | SM (?) : 2019 R. SExp ferme : **2023 N (pilote, vérifié)** ; (?) 2015 N pII, 2016 N + † les 9 non classées |
| `equations-differentielles` | 0 | 0 | **1** | 0 | SExp : 2022 N Ex4 — **seule occurrence sur les 22 sujets SExp énumérés** |

† **Probas non classées (ne pas additionner)** : 9 exercices SExp
« probas » (2017 N, 2018 N, 2019 R, 2022 R, 2023 R, 2024 N, 2024 R,
2025 N, 2025 R) dont le format (dénombrement pur vs conditionnelle) n'est
pas lisible en p.1 — comptés `(?)` à la fois sous `denombrement` et
`probabilites-conditionnelles`.

**Segments d'analyse SM non identifiés : 16 sur 17.** Seul le problème
2019 N est attribué (v0.2). Les 16 autres (2017 N → 2025 R, 21–79 % du
barème selon l'année) restent `contenu à transcrire` : leur répartition
ln/exp/limites/dérivabilité/intégrale/suites fera bouger fortement les
colonnes SM du rollup — c'est **la plus grosse inconnue de ce census**.

---

## 4. Résumé de couverture — honnête

- **Sujets tracés : 48/72** — 27 `sourcé-confirmé` (SM 13, SExp 14),
  9 `retype-non-officiel` (SExp N 2009–2015, SExp R 2025, SM N 2018),
  5 `sourcé-listé` jamais ouverts (SM R 2020/2021 ; SExp R 2016/2020/2021),
  7 `non lu` (SM N 2010–2016 : scans sur disque, lecteur jamais rendu).
  **24 `non recherché`** (2008 ×4, rattrapages 2008–2018 des deux épreuves
  sauf exceptions, SExp R 2017/2018). Aucun `introuvable` avéré.
- **Énumération : 36/72 sujets décomposés** (14 SM dont 2018 N partiel ;
  22 SExp) = **156 exercices énumérés** (57 SM + 99 SExp) sur ~280 attendus
  (sizing Lane B) ≈ **56 %**. Mais l'énumération est en profondeur p.1 :
  les intérieurs de problèmes restent non lus hors v0.2.
- **Banque transcrite existante : 14 entrées** (v0.2), 13 `vérifié` +
  1 `corrigé`, couvrant 12 slugs / 14.
- **Top-5 fermes** : `nombres-complexes-1` 22 · `suites-numeriques` 21 ·
  `geometrie-espace` 19 · `structures-algebriques` / `arithmetique` /
  `nombres-complexes-2` / `calcul-integral` 13 chacun.
- **Notions minces** : `equations-differentielles` **1** (2022 N SExp —
  une seule occurrence sur 22 sujets SExp : rare au national, à confronter
  au cadre de référence avant d'en conclure) ; `probabilites-conditionnelles`
  **1 ferme** (le pilote) + 11 (?) à départager ; `fonction-exponentielle` 5 ;
  `fonction-logarithme` 5 (les deux montent dès que les dominantes de
  problèmes seront identifiées) ; `limites-continuite` /
  `derivabilite-etude-fonctions` : jamais dédiés, toujours extraits
  (convention maison confirmée sur 36 sujets — exceptions partielles :
  SExp 2020 N Ex3 et 2021 N Ex1, seuls candidats « exercice court dédié »
  repérés, à lire en B2).
- **Constats systématiques** : (1) le squelette SM est ultra-stable —
  structures + arithmétique + complexes-2 + analyse (~10 pts), zéro
  probabilité en 2023–2025, une seule vue (2019 R (?)) ; (2) le squelette
  SExp — géométrie + complexes-1 + probas + problème ln — avec **2020 N et
  2021 N atypiques** (ni géométrie ni probas, période COVID) comme 2011 N ;
  (3) les probas SExp passent de 3 pts à 2–2,5 pts à partir de 2024 ;
  (4) codes sujet SM non uniformes : NS25/RS25 lus sur 2017 N, 2019 R,
  2020 N, 2024 R (flag lecteur) vs NS24F/RS24F ailleurs — à vérifier en B2
  sur l'en-tête ; (5) 2020 N SM est **à choix** (Ex1 OU Ex2) — unique dans
  le corpus lu.
- **Prochain incrément B1 (avant B2)** — ~45 lectures/fetchs pour clore :
  (a) **0 fetch** : lire les 7 scans SM N 2010–2016 déjà sur disque ;
  (b) ouvrir les 5 `sourcé-listé` ; (c) relever sur les hubs les éléments
  R 2010–2018 (SM) et R 2009–2015 + 2017/2018 (SExp) + re-consigner les
  éléments SExp 2025 N/R ; (d) remplacer les 8 retypes par les scans
  officiels du hub (`course-438` couvre 2009→) ; (e) lire les pages
  intérieures des 16 problèmes SM et 12 problèmes SExp non identifiés pour
  fermer les (?) du rollup. Ensuite B2 : transcription par vagues,
  plus-fréquents d'abord (analyse, complexes, probabilités — plan §B2).
