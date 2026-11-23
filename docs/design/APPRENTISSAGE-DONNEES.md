# APPRENTISSAGE-DONNEES — collecter, juger « compris », faire revenir

> **Statut** : proposition (2026-11-23), à valider par le propriétaire (§8). Rien ici n'est une
> migration ni ne touche une base. **Portée** : les trois leçons pilotes (format v3) et leurs
> exercices générés ; s'étend aux autres notions avec le format. **S'appuie sur** :
> LEARNER-MODEL-SPEC (A/C/U, planchers, honest-state), ADR 0044 (gabarits, second essai),
> EXAM-MODE-SPEC (auto-notation), `docs/referentiel/` (capacités, poids, calendrier).
> **Remplace, pour les notions pilotes** : la règle « à revoir = 21 jours » (LEARNER-MODEL-SPEC
> §4, §6) — voir §3 et décision 9.

## 0 · L'état des lieux mesuré (ce que le code émet aujourd'hui)

- **Rien n'est enregistré.** `noyau.js` garde tout dans `S = {ans, first, lignes, vu, essais}`
  (l. 73), effacé par `reset()` ; `ExercicesPilote.tsx` garde `EtatEx` dans un `useState`.
- **Leçons** (`web/src/components/pilote/noyau.js`) : `choose(st, j)` (l. 199) connaît l'étape
  (`st.k` = `cle`, l. 97), l'option choisie dans l'ordre de l'auteur (`j`, les options étant
  mélangées par `melanger`, l. 102), le premier choix (`S.first`), les essais (`S.essais`) ;
  `isQuiz(P)` distingue un **pari** (aucune option `ok`, jamais noté) d'une **question** (`verifie`
  ou pari à option `ok`). Les options portent `indice` mais **ni `erreur` ni `capacites`** : une
  étape de leçon ne dit pas quelle capacité officielle elle travaille.
- **Exercices** (`ExercicesPilote.tsx`, `verifier(j)` l. 108) : par question, `essais`, `juste`,
  l'étiquette `erreur` de l'option ou du piège (`o.erreur`, `p.erreur`), les indices demandés
  (`e.indices`), la correction ouverte avant réussite (`corrigeAvant`), la graine (`e.graine`,
  4 chiffres, `hasard.js`). Chaque gabarit porte `capacites` (identifiants du référentiel) et
  `erreurs` (`exercices/modele.js`). `bilan()` (l. 53) classe déjà « premier / après / corrigé ».
- **Épreuves** (`web/src/components/examens/EpreuveShell.tsx`) : `verdicts` Juste / Partiel / Faux
  par question, auto-notés ; durée en `secondes`. Rattachées à la notion, pas à une capacité.
- **Couverture réelle** (rejeu de 1 286 graines par gabarit, le 2026-11-23) :

| Pilote | gabarits | capacités citées | étiquettes `erreur` | dont ≥ 3 gabarits |
|---|---|---|---|---|
| logarithme | 16 (dont 7 en séance 2) | 13 | 51 | 2 |
| radioactivité | 12 | 45 (3 filières) | 28 | 4 |
| expression génétique | 11 | 12 | 36 | 2 |

  Conséquences : (1) avec le plancher de LEARNER-MODEL-SPEC §0.2, **8 erreurs sur 115 seulement
  sont diagnostiquables** aujourd'hui ; les autres restent « pas encore évaluée », et on le dit.
  (2) Les étiquettes sont du texte libre (« ln(ab) = ln a × ln b ») : les corriger changerait leur
  identité. (3) Certains gabarits ont très peu d'énoncés distincts (`ln-etude` 3, `ln-tangente` 4,
  `lire-demivie-tau` 3, `adn-arn` 2) : « jamais le même énoncé » demande une règle (§3.4).
  (4) Un gabarit cite 2 à 12 capacités ; une réussite les crédite toutes, ce qui sur-crédite.

## 1 · Les événements

### 1.1 L'enveloppe (commune)

`{ v: 1, id: uuid, t: ISO-8601 client, seance: uuid (une par ouverture de page), notion:
"maths/fonction-logarithme", filiere: "PC"|"SVT"|"SM-A"|"SM-B", type, …champs }`. `notion` est la
clé de contenu (la correspondance nom de pilote → clé vit dans `catalogue.js`). Jamais de nom,
de texte libre de l'élève, d'adresse IP ni d'identifiant d'appareil dans l'événement.

### 1.2 Les types

| type | émis par (fonction) | quand | champs propres |
|---|---|---|---|
| `lecon_etape` | `noyau.js` `go(i)` | une étape s'affiche | `cle`, `index`, `total` |
| `lecon_reponse` | `noyau.js` `choose(st,j)` | chaque choix | `cle`, `nature` (`pari`/`question`), `option` (index auteur `j`), `essai` (1 ou 2), `juste` (null pour un pari), `erreur` (id, si l'option en porte) |
| `lecon_fin` | `noyau.js` `next()` à la dernière étape | fin de leçon | `etapes_vues` |
| `exo_tirage` | `ExercicesPilote` (calcul de `tirage`) | un énoncé s'affiche | `gabarit`, `graine`, `niveau`, `seance`, `signature` (§3.4), `origine` (`libre`/`revision`/`remediation`) |
| `exo_reponse` | `ExercicesPilote` `verifier(j)` | chaque vérification | `gabarit`, `graine`, `question` (j), `qtype`, `essai` (n), `juste`, `erreur` (id ou null), `classee` (la réponse fausse correspond-elle à un piège prévu), `indice_vu`, `correction_vue`, `ms` (depuis l'affichage) |
| `exo_indice` | bouton « Un indice » | demande d'indice | `gabarit`, `graine`, `question` |
| `exo_correction` | bouton « Voir la correction » | ouverture | `gabarit`, `graine`, `tout_juste` |
| `epreuve_verdict` | `EpreuveShell` (radiogroup) | auto-notation | `epreuve`, `question`, `verdict`, `pts` |
| `epreuve_fin` | `EpreuveShell` « Terminer » | fin | `epreuve`, `secondes` |

Branchements minimaux : `monterLecon(root, construire, { journal })` reçoit une fonction
`journal(evt)` (sans elle, rien ne change : les tests actuels restent identiques) ;
`ExercicesPilote` et `EpreuveShell` reçoivent le même `journal` par prop. Une seule fonction
d'écriture, dans un module `web/src/lib/journal.ts`, décide où va l'événement (local ou serveur).

### 1.3 Ce que le contenu doit ajouter (sans quoi le modèle ne peut rien dire)

1. **Un registre d'erreurs par notion** (`exercices/<notion>.js` → `ERREURS = { id: libellé }`),
   les options et pièges citant l'`id`. La CI (`scripts/pilotes-exercices.mjs`) refuse un `id`
   inconnu et imprime, par erreur, le nombre de gabarits qui la piègent (le plancher).
2. **`capacites` par question** (facultatif, défaut : celles du gabarit), pour ne créditer que ce
   que la question teste.
3. **Dans les leçons** : `capacites` sur les étapes `verifie`, `erreur` sur leurs options fausses
   (l'`indice` nomme déjà l'erreur : il suffit de lui donner son identifiant).

### 1.4 Sans compte, avec compte

| | Sans compte (aujourd'hui, tout élève) | Avec compte |
|---|---|---|
| Stockage | `localStorage` de l'appareil, clé `bac-journal-v1`, observations compactées, plafond 4 000 entrées (≈ 1 Mo) | table `learning_events` (§6) |
| Ce qui marche | tout le modèle (§2–§5) : il est calculé dans le navigateur | idem, sur tous les appareils |
| Ce qui ne marche pas | changer d'appareil ; vider le navigateur efface tout ; **aucune donnée ne nous parvient**, donc aucune mesure du modèle hors exports volontaires | — |
| Affichage obligé | « Gardé sur cet appareil seulement » à côté de tout état | — |
| Passage | à la création du compte, proposer d'importer le journal local (consentement explicite) | |

Cela **renverse une position écrite** : `lib/events/emitter.ts` et EXAM-MODE-SPEC §3 refusent le
stockage local de l'état (« plutôt rien que du localStorage qui ment en changeant d'appareil »).
Ce n'est un mensonge que si on le cache ; la phrase « sur cet appareil seulement » le dit. C'est la
décision 1 du propriétaire.

## 2 · Le modèle : quand une capacité est « comprise »

### 2.1 L'unité : l'observation

Chaque question d'exercice tentée donne **une observation** sur chacune de ses capacités (celles
de la filière de l'élève seulement), notée :

- **solide** : juste au premier essai, sans indice, sans correction ouverte, sur un énoncé jamais vu ;
- **aidée** : juste au second essai ou plus, ou après un indice, ou sur un énoncé déjà vu ;
- **échec** : deux essais faux, ou correction ouverte avant de réussir ;
- rien : question ouverte puis abandonnée (pas de preuve, ni pour ni contre).

### 2.2 Le poids des preuves

| Source | compte pour « comprise » | pourquoi |
|---|---|---|
| Exercice généré, solide | **1** | rappel sans aide, énoncé neuf (effet de test : Roediger & Karpicke 2006) |
| Épreuve blanche, « Juste » auto-noté, question rattachée à la capacité | 1, au plus une fois | conditions réelles, mais auto-évaluation |
| Exercice, aidée | 0 (enregistrée, non comptée) | un indice ou un second essai change ce qu'on mesure ; les tuteurs intelligents comptent d'ordinaire l'aide comme une non-réussite (pratique d'ASSISTments, à vérifier) |
| Question `verifie` de leçon, premier essai juste | 0 (sert à l'aiguillage) | posée juste après l'explication, elle mesure la performance du moment, pas l'apprentissage (Soderstrom & Bjork 2015, revue « learning versus performance ») |
| Pari de leçon | 0, jamais | non noté par construction (ADR 0044) ; s'engager avant de savoir aide à apprendre (Kornell, Hays & Bjork 2009), ce n'est pas une preuve |

L'**ancienneté** n'entre pas dans un poids : elle est portée par le calendrier (§3). Une preuve
ancienne ne s'efface pas ; c'est la capacité qui devient « à revoir » quand sa date est passée.

### 2.3 Les règles (calculables, une phrase chacune)

Soit `E(c)` la somme des poids des observations de `c` **depuis le dernier échec**.

- **Non évaluée** : aucune observation d'exercice. « Pas encore d'exercice fait sur ce point. »
- **En cours** : au moins une observation, critère « comprise » non atteint.
- **Comprise** quand, tout à la fois :
  1. `E(c) ≥ 2`, dont **au moins une** réussite solide d'exercice généré (jamais l'auto-notation seule) ;
  2. les deux réussites viennent de **deux énoncés distincts**, de deux gabarits distincts si `c`
     en a au moins deux ;
  3. au moins une des deux est une question **à saisie** (`nombre` ou `texte`), si `c` en a une ;
  4. aucune erreur liée à `c` n'est Active (§4).
  Phrase : « Tu as réussi seul, du premier coup, deux exercices différents sur ce point. »
- **Retenue** : une réussite solide à une révision faite **au moins 7 jours** après la réussite
  solide précédente (boîte ≥ 4, §3). « Réussi seul après 7 jours sans y toucher. »
- **À revoir** : comprise, et sa date de révision est passée.

**Justification des seuils.** Deux réussites : sur un QCM à 4 options, deviner deux fois de suite
arrive une fois sur 16 (≈ 6 %) ; une question à saisie ramène ce risque près de zéro (condition 3).
Deux, c'est aussi la règle de levée d'une erreur (LEARNER-MODEL-SPEC §3) : une seule règle à
apprendre. Trois réussites coûteraient une séance de plus par capacité, sur ~70 capacités par
filière pour les seuls pilotes. Sept jours pour « retenue » : la distinction entre réussir
aujourd'hui et retenir n'apparaît qu'après un délai ; une semaine est la plus courte durée où les
études d'espacement mesurent un oubli net (Cepeda et al. 2006, méta-analyse), et un seuil d'une
semaine reste atteignable avant le bac. Ce sont des **choix fixes, dits comme tels**, pas des
paramètres appris ; §7 dit comment on les vérifie.

**Une notion** est dite « comprise » quand toutes ses capacités ayant au moins un exercice le sont
(pour la filière et les séances écrites) ; on affiche un compte « 9 points compris sur 13 », jamais
un pourcentage, et les capacités sans exercice sont listées à part (« pas encore d'exercice »).

### 2.4 Les options, comparées honnêtement

| Option | Ce qu'il faut | Pour nous au lancement |
|---|---|---|
| **Compteur à seuils** (§2.3) | rien d'appris | explicable en une phrase, testable ; ne planifie rien seul |
| **Leitner** (boîtes à intervalles fixes, Leitner 1972) | une échelle d'intervalles choisie | simple, déterministe, explicable ; intervalles non personnalisés |
| **SM-2** (SuperMemo, Wozniak, fin des années 1980) | une note de 0 à 5 par révision, un facteur de facilité par carte | conçu pour des cartes revues à l'identique ; la note 0–5 demande à l'élève de s'auto-juger ; ses constantes (1 j, 6 j, facteur 2,5) ne sont pas mieux fondées qu'une échelle Leitner |
| **FSRS** (modèle difficulté–stabilité–récupérabilité, projet open-spaced-repetition) | paramètres par défaut ajustés sur un très grand corpus de révisions Anki ; ajustement personnel avec assez de révisions (seuil exact à vérifier) | l'état de l'art du rappel espacé de cartes ; mais nos « cartes » sont des capacités procédurales revues par des énoncés neufs, et nous n'avons aucune révision pour vérifier que les paramètres par défaut s'appliquent |
| **BKT** (Corbett & Anderson 1995) | 4 paramètres par capacité (connaissance initiale, apprentissage, deviner, glisser), ajustés sur des données | donne une probabilité de maîtrise, mais avec des paramètres inventés elle serait un chiffre fabriqué ; ne planifie pas l'oubli |
| **Elo** (Pelánek 2016, pour l'éducation) | beaucoup d'élèves par exercice pour stabiliser les difficultés | utile plus tard pour choisir le niveau d'un exercice ; muet avec dix élèves |

**Recommandation pour le lancement : compteur à seuils pour « comprise » + échelle de Leitner pour
le retour, comprimée par la date du bac.** Raison : c'est la seule combinaison dont chaque sortie
s'écrit en une phrase vraie sans paramètre appris, et dont chaque règle est un test unitaire.
**Évolution : FSRS**, une fois qu'il y a assez de révisions réelles pour comparer (§7.3) ; son
modèle (stabilité par capacité, récupérabilité visée) est le bon cadre, son ajustement attend nos
données. BKT et Elo ne sont pas au programme avant plusieurs centaines d'élèves.

## 3 · Le calendrier de révision

### 3.1 Les boîtes

| Boîte | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Intervalle avant le prochain passage | lendemain | 1 j | 3 j | 7 j | 16 j | 35 j |

- Une capacité entre en **boîte 0** à sa première observation (ou à la fin de la leçon qui l'enseigne).
- Elle passe en **boîte 1** quand elle devient comprise.
- À une révision **due** (au moins la moitié de l'intervalle écoulée ; avant, c'est de l'entraînement
  libre, qui n'avance pas la boîte) : **solide** → boîte + 1 (max 5) ; **aidée** → même boîte,
  intervalle relancé ; **échec** → boîte − 2 si la boîte était ≥ 3, sinon retour en boîte 0
  (`E` repart de 0, la capacité redevient « en cours »).
- Facteur ≈ 2,2 entre intervalles : un espacement croissant, comme Leitner et SM-2 ; les valeurs
  sont un choix, pas une courbe d'oubli mesurée (LEARNER-MODEL-SPEC §6 refusait à raison de
  prétendre le contraire). Elles se corrigent par la mesure M1 (§7).

### 3.2 La date du bac comprime les intervalles

`D` = 2027-06-01 (`docs/referentiel/examen.yaml`, `calendrier_2027`, source secondaire : **date
estimée**, à confirmer par l'arrêté). `J` = jours restants.

- Intervalle effectif = `min(intervalle de la boîte, max(1, ⌊0,2 × J⌋))`.
- Aucune date de révision après `D − 2`.
- **Phase finale** (`J ≤ 14`) : chaque capacité au moins comprise reçoit un passage entre `D − 14`
  et `D − 2`, les moins récemment réussies d'abord ; aucune nouvelle notion n'est proposée.
- Après `D` : plus de calendrier (le rattrapage, début juillet, est une décision à part).

Pourquoi 0,2 : l'écart optimal entre deux études grandit avec le délai jusqu'au test, mais moins
vite que lui ; il vaut environ 20 % du délai pour un test à une semaine et descend vers 5–10 % pour
un an (Cepeda, Vul, Rohrer, Wixted & Pashler 2008, la « crête » de l'espacement ; chiffres à
vérifier sur l'article). À 190 jours du bac (aujourd'hui), le plafond est 38 j et l'échelle passe
entière ; à 30 jours, il tombe à 6 j.

### 3.3 La forme d'un retour

Toujours **un tirage neuf d'un exercice généré** qui cite la capacité, de niveau 1–2 tant que la
boîte est ≤ 2, de niveau 2–3 au-delà (l'habileté « situation inhabituelle » pèse 15 % du cadre de
maths, `maths-sexp.yaml`). Jamais la leçon entière. Exception : **deux échecs de suite** sur une
capacité → on propose de revoir les étapes de la leçon qui l'enseignent (celles dont `capacites`
la cite, §1.3), puis un exercice de niveau 1.

### 3.4 « Jamais le même énoncé »

`signature` = empreinte (hachage court) de `enonce` + intitulés des questions du tirage. Pour une
révision : jusqu'à 50 graines essayées pour trouver une signature jamais vue par l'élève ; sinon un
autre gabarit qui cite la capacité ; sinon on réutilise un énoncé vu, signalé « déjà rencontré », et
sa réussite compte **aidée** (on peut se souvenir de la réponse sans refaire le raisonnement).

### 3.5 Entrelacement et charge par séance

- **Composition d'une séance** (≈ 25 min) : d'abord les révisions dues (**5 au plus**), puis au plus
  **une remédiation** d'erreur Active (§4), puis la suite du parcours (leçon ou exercices neufs).
- **Ordre des révisions** : retard relatif `(aujourd'hui − date due) / intervalle` décroissant ;
  à égalité, le poids officiel du domaine de la capacité (`poids` dans `docs/referentiel/*.yaml`).
- **Entrelacement** : jamais deux révisions de suite de la même notion quand une autre est due.
  Mélanger les types de problèmes améliore le choix de la méthode, qui est ce que l'épreuve teste
  (Rohrer & Taylor 2007 ; Dunlosky et al. 2013 classent l'entrelacement « utilité modérée », les
  tests et l'espacement « utilité élevée »). Les exercices neufs d'une notion en cours d'étude
  restent groupés : l'entrelacement sert la révision, après une première compréhension (à vérifier
  pour l'apprentissage initial, les résultats y sont moins nets).
- **Surplus** : au-delà de 5 dues, les moins urgentes glissent d'un jour, et on le dit
  (« 3 révisions reportées à demain ») ; un échec récent ne glisse jamais. Jours sans séance : rien
  ne se perd, les révisions attendent, sans reproche.

## 4 · Le diagnostic des erreurs classiques

- **Exhibition** : une réponse fausse qui correspond à un piège portant l'erreur `m`, au **premier
  essai** (au second, l'élève sort d'un indice qui a déjà nommé l'erreur).
- **États** (LEARNER-MODEL-SPEC §3, inchangés) : `m` est évaluable si au moins **3 gabarits
  distincts** de la filière de l'élève piègent `m` (des tirages d'un même gabarit testent le même
  geste, ils ne comptent qu'une fois) ; **Active** à 2 exhibitions sur 2 énoncés distincts ;
  **Surmontée** après 2 réussites solides sur des questions où `m` était un piège possible, sans
  exhibition entre elles ; une nouvelle exhibition la rouvre. Sous le plancher : **Pas encore
  évaluée**, toujours — c'est le cas de 107 erreurs sur 115 aujourd'hui (§0).
- **Choisir le prochain exercice** quand `m` est Active : un gabarit qui piège `m`, **différent** de
  celui où elle est apparue (on veut voir l'erreur tomber ailleurs, pas sur l'énoncé appris), de
  niveau ≤ celui de l'échec, sur un énoncé neuf. Une seule remédiation par séance.
- **Le message** : sous le plancher, seulement le `fb` du piège, déjà écrit (« ln change le produit
  en somme… »), sans rien affirmer sur l'élève. Active : « Tu as fait deux fois la même erreur :
  {libellé}. Voici un exercice fait pour la déjouer. » Surmontée : « Surmontée : {libellé}. »
- **Faux non classés** (réponse fausse qui ne tombe sur aucun piège, `classee: false`) : un échec
  pour la capacité, rien pour le diagnostic. Avec des comptes, les valeurs qui reviennent chez
  plusieurs élèves deviennent des candidates à un nouveau piège, que l'auteur valide (jamais
  automatiquement).

## 5 · Ce qu'on montre à l'élève

- Par notion : « 9 points compris sur 13 · 4 retenus après une semaine · 2 à revoir aujourd'hui ».
  Des comptes de choses vraies, avec leur dénominateur réel ; jamais un pourcentage.
- Par capacité : son libellé officiel, son état (§2.3) dans sa phrase, et la date du prochain
  passage (« jeudi »).
- Par erreur : « À travailler / Surmontée / Pas encore évaluée » (LEARNER-MODEL-SPEC §3) ; sous le
  plancher, « il faut encore des exercices sur ce point ».
- Sans compte : « Gardé sur cet appareil seulement » sur chaque écran d'état.
- **Interdits** : %, « maîtrisé », séries de jours, badges, points, comparaison à d'autres élèves,
  compte à rebours rouge. Le mot « compris » n'apparaît que si la règle l'a établi ; « retenu » que
  si une révision espacée l'a montré. Chaque état affiché porte `data-state-source` (le nom de la
  règle), comme l'exige la garde dom-truth.
- **Écart avec VISION** : VISION.md place séries et « de 40 % à 75 % » aux bords de la séance ; ce
  document suit la règle honest-state, plus stricte. À arbitrer (décision 2).

## 6 · Tables, RPC, vie privée (esquisse, pas une migration)

À écrire par supabase-architect, derrière la porte de production. Les brouillons 048/049 n'ont
jamais tourné en production ; leur `kind` ('item','checkpoint','exercise_reveal') ne couvre pas ces
événements. Plutôt que de les modifier, une table distincte (à trancher par l'architecte, qui sait
s'ils ont tourné sur staging). L'erreur réutilise `user_notion_misconception_states` (049), avec
`misconception_id` = l'id du registre d'erreurs.

```sql
-- Le journal, seule source de vérité ; l'état (§2–§4) se calcule à la lecture,
-- par le même module pur que dans le navigateur (web/src/lib/apprentissage.ts).
CREATE TABLE public.learning_events (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_event_id UUID NOT NULL,              -- l'id de l'enveloppe : rend l'envoi et l'import idempotents
  occurred_at     TIMESTAMPTZ NOT NULL,       -- horloge du client
  received_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  origine         TEXT NOT NULL CHECK (origine IN ('direct','import_local')),
  seance_id       UUID NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('lecon_etape','lecon_reponse','lecon_fin','exo_tirage',
                    'exo_reponse','exo_indice','exo_correction','epreuve_verdict','epreuve_fin')),
  notion_id       TEXT NOT NULL,              -- clé de contenu, pas de FK (précédent 043)
  filiere         TEXT NOT NULL,
  ref             TEXT,                       -- cle d'étape, id de gabarit ou id d'épreuve
  graine          INT,
  question_index  INT,
  essai           INT,
  juste           BOOLEAN,
  erreur_id       TEXT,
  details         JSONB NOT NULL DEFAULT '{}' CHECK (pg_column_size(details) < 1024),
                                              -- indice_vu, correction_vue, signature, ms, verdict…
  UNIQUE (user_id, client_event_id)
);
ALTER TABLE public.learning_events ENABLE ROW LEVEL SECURITY;   -- dans la migration créatrice (040)
CREATE POLICY "lecture de son propre journal" ON public.learning_events
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
-- Aucune policy INSERT/UPDATE/DELETE : écriture par RPC service_role seulement (047).
CREATE INDEX ON public.learning_events (user_id, occurred_at);

-- Écriture par lots, appelée par une fonction Edge `record-learning-events` qui tire user_id
-- du JWT (jamais du corps), comme record-notion-event.
CREATE FUNCTION public.record_learning_events(p_user_id UUID, p_events JSONB)
RETURNS INT  -- nombre de lignes réellement insérées
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ … $$;
--   refuse > 500 événements par appel ; occurred_at ni > NOW() + 5 min ni < '2026-09-01' ;
--   INSERT … ON CONFLICT (user_id, client_event_id) DO NOTHING.
REVOKE EXECUTE ON FUNCTION public.record_learning_events(UUID, JSONB) FROM PUBLIC, authenticated, anon;
GRANT  EXECUTE ON FUNCTION public.record_learning_events(UUID, JSONB) TO service_role;

-- Les consentements, datés et versionnés (texte affiché = version).
CREATE TABLE public.user_consents (
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  objet      TEXT NOT NULL CHECK (objet IN ('journal_apprentissage','import_local','accord_parental')),
  version    TEXT NOT NULL,
  donne_le   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  retire_le  TIMESTAMPTZ,
  PRIMARY KEY (user_id, objet, version)
);  -- RLS : SELECT self ; écriture par RPC service_role (record_consent / revoke_consent).

-- Bloc de vérification (046) : RLS active sur 2/2 tables, 0 policy d'écriture pour authenticated,
-- EXECUTE des RPC réservé à service_role (cast roles::text[], ADR 0007), et cardinalité :
-- 0 ligne dans chaque table après création.
```

Pas de table d'état dérivé au lancement : quelques centaines d'événements par élève se recalculent
en quelques millisecondes. Une table cache viendra si la mesure le demande.

**Vie privée.** Les élèves de 2ème Bac ont en général 17–18 ans : beaucoup sont **mineurs**.
- La loi marocaine **09-08** (2009) encadre le traitement des données personnelles ; son autorité
  est la **CNDP**. Elle prévoit une déclaration (ou une autorisation) préalable du traitement auprès
  de la CNDP, et des règles pour les transferts vers l'étranger — notre base est en Union
  européenne (EU-Central). Ce qu'elle exige précisément pour les mineurs (accord parental, âge) et
  pour ce transfert : **à vérifier par un juriste avant l'ouverture des comptes**. Une révision de
  la loi a été annoncée : à vérifier aussi.
- Minimisation, quoi qu'il arrive : pas de nom exigé, aucun texte libre de l'élève dans le journal
  (les saisies `texte` sont des codons ou des acides aminés, déjà normalisées ; on stocke au plus si
  elles correspondent à un piège), aucune IP ni empreinte d'appareil, aucune donnée revendue ni
  partagée, aucun service d'analyse tiers.
- Effacement : `delete-self-account` existe (`ON DELETE CASCADE`) ; le journal local s'efface d'un
  bouton « Effacer mes données sur cet appareil ». Export : « Télécharger mon journal » (JSON).
- Conservation : à fixer (décision 7) ; défaut proposé, effacement du journal 6 mois après la
  session du bac sauf si l'élève continue.

## 7 · Le plan en étapes, et comment on vérifie

**Étape 0 — contenu (sans base).** Registre `ERREURS` par notion et ids dans les options ;
`capacites` sur les questions et sur les étapes `verifie` ; la CI imprime la couverture par erreur
et par capacité. Sans cela, §2 et §4 tournent à vide.

**Étape 1 — local (sans compte), après la décision 1.**
- `web/src/lib/apprentissage.ts`, **pur** (aucun accès au navigateur) : `observer(evts)`,
  `etatCapacite(obs, regles)`, `boite(obs)`, `prochaineDate(boite, dernier, aujourdhui, D)`,
  `composerSeance(etats, aujourdhui)`, `choisirTirage(capacite, signaturesVues)`,
  `classerErreur(evts, couverture)`.
- `web/scripts/test-apprentissage.mjs`, une table de cas, au minimum : aide ≠ solide ; deux solides
  sur le même énoncé ≠ comprise ; deux QCM seuls ≠ comprise si une saisie existe ; l'auto-notation
  seule ≠ comprise ; un échec remet `E` à 0 ; échec en boîte 4 → boîte 2, en boîte 2 → boîte 0 ;
  révision faite trop tôt n'avance pas la boîte ; compression à J = 30 → 6 j ; rien après `D − 2` ;
  phase finale ; 6 dues → 5 + 1 reportée, l'échec récent jamais reporté ; pas deux révisions de
  suite de la même notion quand une autre est due ; signature vue → autre graine → autre gabarit →
  « déjà rencontré » compté aidé ; erreur sous le plancher → non évaluée ; exhibition au second
  essai ignorée ; Surmontée puis réouverture.
- `lib/journal.ts` (local, compacté), branché dans `noyau.js`, `ExercicesPilote`, `EpreuveShell` ;
  une page « Mes révisions » pour les trois pilotes ; export JSON.
- Vérification possible à ce stade : les élèves testeurs et le propriétaire **exportent** leur
  journal volontairement ; les mesures ci-dessous se calculent sur ces exports.

**Étape 2 — avec compte**, après la décision 6 et la revue juridique : migration (architecte,
branch-test vert, décision humaine), fonction Edge, import du journal local avec consentement,
lecture du journal par le même module pur.

**Étape 3 — mesurer** (script hors ligne sur le journal, chaque mois) :
- **M1, la justesse du calendrier** : part de réussites solides aux révisions dues, par boîte.
  Cible 75–90 %. Au-dessus de 95 %, les intervalles sont trop courts (temps perdu) ; sous 70 %,
  trop longs. On ne touche une boîte qu'avec **au moins 30 révisions** dans cette boîte (à p = 0,8
  et n = 30, l'intervalle de confiance à 95 % fait environ ± 14 points).
- **M2, « comprise » prédit-il ?** Réussite solide à la première révision des capacités comprises,
  contre celles « en cours » révisées au même délai. Un écart faible veut dire que le critère est
  trop lâche.
- **M3, le diagnostic** : quand `m` est Active, taux d'exhibition à la prochaine rencontre d'un
  piège `m`, contre le même taux chez les élèves où `m` n'est pas Active.
- **M4, l'épreuve** : part des capacités retenues d'une notion contre l'auto-note des exercices
  d'épreuve de cette notion. Descriptif seulement (auto-notation, peu d'élèves).
- **Passage à FSRS** : quand il y a au moins 2 000 révisions dues observées, rejouer le journal avec
  l'échelle actuelle, FSRS aux paramètres par défaut, puis FSRS ajusté ; comparer la perte
  logarithmique sur « réussite solide à la révision ». On change si le gain est net, et le
  propriétaire décide. Le seuil de 2 000 est une prudence de notre part, pas une valeur publiée.

## 8 · Les décisions du propriétaire

1. **Stockage local sans compte** (renverse `emitter.ts` et EXAM-MODE-SPEC §3). Défaut proposé :
   oui, avec « sur cet appareil seulement » visible.
2. **VISION contre honest-state** : séries et pourcentages aux bords de la séance (VISION), ou
   aucun (ce document) ? Défaut : aucun.
3. **L'échelle 1–3–7–16–35 j, la compression à 0,2 × J, la phase finale à J − 14, la date du bac
   (2027-06-01, estimée)**.
4. **Les seuils** : « comprise » à 2 réussites solides (avec les conditions de §2.3), « retenue » à
   7 jours, l'échec qui fait descendre de deux boîtes.
5. **La charge** : 5 révisions et 1 remédiation par séance.
6. **L'ouverture des comptes** : âge minimal, accord parental, déclaration CNDP, hébergement en
   UE ; revue juridique avant.
7. **La durée de conservation** du journal (défaut : 6 mois après le bac).
8. **Aucune donnée anonyme envoyée sans compte** (défaut : aucune ; sinon c'est une collecte
   auprès de mineurs, à traiter comme telle).
9. **Remplacer, pour les notions au format v3, la règle « à revoir à 21 jours »** de
   LEARNER-MODEL-SPEC §4/§6 par ce calendrier — un ADR court.
10. **Le poids de l'auto-notation d'épreuve** (défaut : une preuve au plus, jamais seule).
11. **Le travail de contenu de l'étape 0** (registre d'erreurs, capacités par question et dans les
    leçons), préalable à tout le reste, et l'effort pour porter plus d'erreurs au plancher de
    3 gabarits (8 sur 115 aujourd'hui).

## Références (citées seulement là où on en est sûr ; le reste porte « à vérifier »)

- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*.
- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in
  verbal recall tasks. *Psychological Bulletin*.
- Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing effects in
  learning: a temporal ridgeline of optimal retention. *Psychological Science*.
- Bjork, R. A. (1994). Memory and metamemory considerations in the training of human beings
  (« difficultés désirables »).
- Soderstrom, N. C., & Bjork, R. A. (2015). Learning versus performance. *Perspectives on
  Psychological Science*.
- Kornell, N., Hays, M. J., & Bjork, R. A. (2009). Unsuccessful retrieval attempts enhance
  subsequent learning. *JEP: Learning, Memory, and Cognition*.
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving
  students' learning with effective learning techniques. *Psychological Science in the Public Interest*.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning.
  *Instructional Science*.
- Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing. *User Modeling and User-Adapted Interaction*.
- Pelánek, R. (2016). Applications of the Elo rating system in adaptive educational systems.
  *Computers & Education*.
- FSRS : projet open-spaced-repetition (modèle DSR) ; détails des paramètres et seuils d'ajustement
  à vérifier sur sa documentation au moment de l'étape 3.

## Retraits et corrections

*(néant pour l'instant)*

---

Fichiers que ce document commande et qui n'existent pas encore :

- CHEMIN À CRÉER: web/src/lib/apprentissage.ts — le modèle pur (preuves, boîtes, calendrier)
- CHEMIN À CRÉER: web/scripts/test-apprentissage.mjs — la table de cas du modèle
