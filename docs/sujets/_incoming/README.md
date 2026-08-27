# `_incoming` — le sas des transcriptions non vérifiées

> **Ce dossier n'est PAS une source.** Rien de ce qu'il contient ne peut
> devenir une entrée de banque (`content/*/bank.yaml`) tant que la
> vérification adversariale n'a pas eu lieu et n'a pas laissé sa trace
> dans le `Statut:` de chaque exercice.

## Pourquoi ce sas existe

La campagne de rattrapage (2026-08-22) a lancé la chaîne complète
**transcription → vérification adversariale → conversion**. La chaîne a
été interrompue en vol par l'épuisement des crédits : les transcripteurs
ont livré, les vérificateurs sont morts avant de commencer. Plutôt que
de mélanger du transcrit-non-vérifié aux fichiers de
`docs/sujets/{pc,maths}/` — où chaque entrée porte un statut vérifié et
sert de source à une banque —, tout attend ici.

## La règle (non négociable)

La fidélité de transcription est le risque n°1 documenté du projet, et
la vérification indépendante a déjà payé plusieurs fois : période
confondue avec une flèche de calibration, hélicoptère qui était un
avion sur la photo, amplitudes de modulation inversées, valeur
contaminée par la ligne du dessus. Aucune de ces erreurs n'était
visible sans re-lire le scan.

Donc :

1. Un exercice ne quitte `_incoming` que marqué
   `Statut: vérifié — <méthode>` par un vérificateur **qui a re-fetché
   le scan lui-même**, jamais par relecture du texte transcrit.
2. La vérification re-décrit les figures **depuis l'image**, jamais
   depuis l'énoncé — c'est la classe de défauts la plus fréquente.
3. Un point indécidable reste `(lecture à confirmer)`. Un exercice
   illisible est **écarté**, jamais complété d'imagination.
4. Le déplacement vers `docs/sujets/<matière>/<notion>.md` et la
   conversion en banque se font **après**, jamais en même temps.

## État au 2026-08-27 — LA CHAÎNE EST BOUCLÉE

**Les sept sujets sont vérifiés ET convertis.** Les 30 exercices des sept
fichiers portent un `Statut: vérifié — re-fetch indépendant + re-dérivation`,
et chacun de leurs blocs a trouvé sa banque.

| Sujet | Blocs convertis | Assemblé dans Examens blancs |
|---|---|---|
| `pc-spc-2021-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2022-r.md` | 9 | **20,00/20 — complet** |
| `pc-spc-2023-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2024-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2025-r.md` | 8 | **20,00/20 — complet** |
| `maths-sm-2023-r.md` | 4 | **20,00/20 — complet** |
| `maths-sm-2024-r.md` | 5 | **20,00/20 — complet** |

**Sept épreuves de rattrapage sur sept s'assemblent en entier.** Avant la
campagne, le corpus n'en comptait **aucune** : toutes les banques étaient en
session normale. Le corpus est passé de 12 à 18 épreuves complètes.

### La règle de répartition qui a tenu tout du long

Un exercice de bac se répartit souvent sur plusieurs notions. `lib/examens.ts`
**somme les `bareme_total`** pour reconstituer le /20 : dupliquer un exercice
sur ses notions cross-listées fausserait chaque total. La règle appliquée sans
exception :

- le barème est **réparti**, jamais dupliqué — les parties d'un même exercice
  vont chacune dans leur notion, et la somme retombe sur le barème imprimé ;
- un cross-list qui ne pèserait qu'une demi-question **ne devient pas une
  entrée** : ce serait un orphelin illisible. Il est honoré dans le
  `reasoning`, qui nomme le domaine et renvoie à sa leçon ;
- chaque décision de ce type est écrite en `NOTE ÉDITORIALE` en tête de
  l'entrée, avec sa raison, et laissée à l'arbitrage de l'owner.

Chaque total a été recompté question par question contre le scan, et le
recompte est consigné dans le `sourcing.note`. Les sept retombent juste.

### Ce que la vérification a réellement trouvé

Le détail est dans `JOURNAL-VERIFICATION.md` et dans le bloc de chaque
exercice. Les trois plus coûteux, à garder en mémoire parce qu'ils
définissent les classes de défauts à chasser :

1. **Un fichier entier décrivait un autre sujet.** `pc-spc-2024-r.md`
   contenait le rattrapage 2023, habillé d'un faux avertissement
   « discordance d'année » reposant sur une lecture d'en-tête arabe
   fausse. Le fichier a été entièrement réécrit. L'avertissement de
   provenance est reconduit dans le `sourcing.note` de **chaque** entrée
   issue de ce sujet, pour que la trace survive à la conversion.
2. **Des figures décrites depuis le TEXTE et non depuis le dessin.**
   Une cote de terrain qui partait du mauvais point (PC 2023 R, ex. 4),
   un minimum de sinusoïde placé à 0,2 s alors qu'il est à 0,138 s
   (idem), un trait intérieur de quadrillage pris pour le bord du cadre
   (PC 2022 R, ex. 2). Chacune portait une question entière.
3. **Deux défauts dans le SUJET OFFICIEL lui-même**, documentés et non
   « réparés » : l'échelle des ordonnées de la figure 4 du rattrapage
   2024 est incompatible d'un facteur ≈ 60 avec les données de l'énoncé
   (sans conséquence sur le résultat demandé, mais aucune valeur
   d'intensité ne doit en être tirée), et une courbe de dosage 2021 non
   cohérente avec le pK_A.

Le sujet **maths SM 2024 rattrapage** est le seul des sept où la passe
adversariale n'a trouvé **aucun défaut** : ni d'énoncé, ni de
transcription, ni de lecture laissée en suspens.

## La deuxième vague : les problèmes d'analyse SM (2026-08-27)

La campagne rattrapage bouclée, un second gisement est ouvert dans ce même
sas. Le diagnostic tient en une phrase : **les six épreuves SM de session
normale du corpus sont toutes assemblées à 10,00/20**, parce que leurs trois
exercices d'algèbre sont en banque et que leur volet d'ANALYSE n'y est pas.
Une épreuve SM consacre la moitié de son barème à l'analyse ; c'est
exactement la moitié qui manque.

Quatre sujets transcrits à ce jour, tous **NON VÉRIFIÉS**, tous en attente
d'une passe adversariale :

| Fichier | Ce qui est transcrit | Barème |
|---|---|---|
| `maths-sm-2023-n.md` | exercices 1 et 2 (deux volets d'analyse) | 7,75 + 2,25 |
| `maths-sm-2024-n.md` | exercices 1 et 2 (deux volets d'analyse) | 7,5 + 2,5 |
| `maths-sm-2025-n.md` | exercice 1 (problème unique) | 10 |
| `maths-sm-2022-n.md` | exercice 1 (problème unique) | 10 |

Chacun recompté question par question contre la marge du scan, et chacun
retombe exactement sur les 10 points qui manquent à son épreuve.

**Portée partielle assumée.** Aucun de ces fichiers ne transcrit les
exercices d'algèbre du même sujet : ils sont déjà en banque, et l'assemblage
d'épreuves somme les `bareme_total` — les reconvertir fausserait le /20. La
portée est dite en tête de chaque fichier pour qu'elle ne passe pas pour un
oubli.

### Ce que cette vague a appris sur les scans

Les quatre sujets ne se ressemblent pas du tout côté fidélité, et c'est le
renseignement le plus utile pour la suite :

- **2024 N et 2025 N : scans propres.** Lettres ajourées et symbole $\le$
  rendus correctement, aucune adjudication de glyphe nécessaire.
- **2023 N : mojibake intermittent.** Le symbole $\le$ y est rendu par une
  double virgule à cinq endroits, et les lettres ajourées cassent par
  intervalles — la même lettre rendue par deux glyphes différents à deux
  lignes d'écart. Chaque occurrence adjugée par la logique, jamais par la
  forme du glyphe.
- **2022 N : substitution de police MASSIVE**, systématique et non
  intermittente. Aucun symbole mathématique non alphabétique ne s'y lit pour
  ce qu'il montre. Le fichier porte une **table de correspondance complète**,
  glyphe par glyphe, avec la base de chaque adjudication. Deux pièges y sont
  isolés : un glyphe qui vaut tantôt $\mathbb{N}$ tantôt $+\infty$ selon le
  contexte, et un « l » de « ln » absorbé par une parenthèse extensible —
  celui-ci adjugé non pas à l'œil mais par une **conséquence vérifiable**
  ($F(1)$ doit valoir $0$, et une seule lecture le donne). C'est ainsi qu'on
  tranche un glyphe.

### Deux lacunes signalées AVANT conversion, et non pendant

- **`arctan`** apparaît dans le sujet 2025 N. Fonction spécifique à la filière
  SM, sans rung nulle part dans le corpus. Si l'exercice est converti, il
  faudra la ponter au point d'usage — comme le corpus le fait déjà pour Rolle
  et le théorème des accroissements finis.
- **Le théorème des accroissements finis** est invoqué nommément par les
  sujets 2023 N et 2024 N. Le docket de complétude le classe en catégorie C
  (spécifique SM, volontairement non promu au rang de rung) : l'usage est
  légitime, mais il devra être ponté et non supposé acquis.

### Reste de la vague

`SM 2017 N` (`element/57970`, code **NS25** et non NS24F) et `SM 2020 N`
(`element/109635`, que le CENSUS signale comme un **format à CHOIX** —
exercice 1 OU exercice 2 — à contrôler avant toute transcription).

---

## Trois pièges de procédure payés le 2026-08-27, à ne pas repayer

Ces trois-là n'ont rien à voir avec les mathématiques ou la physique. Ils
viennent de la mécanique du travail, et chacun a coûté quelque chose.

### 1. Des scans qui n'en sont pas — vérifier `file *.jpg`

Un vérificateur a téléchargé les cinq pages d'un scan et obtenu cinq
« JPEG » de **288 octets**. C'étaient des pages HTML de redirection 301
(forme `index.ph%70`). Un `curl` naïf les enregistre sans broncher, et
l'outil de lecture d'images échoue ensuite sans dire pourquoi.

**La parade :** refetcher avec `-L` et un User-Agent de navigateur, puis
**contrôler systématiquement `file *.jpg`**. Un fichier de quelques centaines
d'octets n'est jamais une page de scan. Ce contrôle coûte une seconde et
évite de conclure « le scan est illisible » alors qu'il n'a jamais été
téléchargé.

### 2. Ne jamais committer un fichier qu'un agent est en train d'écrire

Un commit a été passé au milieu d'une passe de vérification, sur le fichier
que le vérificateur éditait. Résultat : la version publiée portait sept
formules mathématiques coupées sur plusieurs lignes, laissant **seize lignes
avec un `$` non apparié**. Le vérificateur a corrigé après coup, mais la
version fautive existe dans l'historique.

**La parade :** avant tout `git add`, vérifier qu'aucun agent ne travaille sur
le chemin visé. Et ne jamais utiliser `git add -A` — nommer les chemins, ce
que ce projet avait déjà appris à ses dépens lors de la campagne rattrapage.

### 3. Une date fausse dans un enregistrement de provenance

C'est le plus instructif, parce que c'est un vérificateur qui a **refusé une
consigne** pour l'éviter. La consigne de vérification lui demandait de dater
sa passe du 2026-08-23 ; il l'a datée du 2026-08-27, date réelle, en disant
qu'inscrire une fausse date dans un enregistrement de provenance était
contraire à l'esprit de la tâche.

Il avait raison, et le problème était plus large que sa passe : cette session
a commencé le 2026-08-23 puis repris le 2026-08-27 après une interruption, et
tout le travail de la seconde moitié portait par inadvertance la date de la
première. **Soixante-sept lignes de provenance étaient datées faux** — dans le
docket de complétude, dans BANK-SPEC, dans les fichiers de ce sas, et dans
trois notes éditoriales de banques. Elles ont été corrigées en distinguant
deux cas :

- une date qui **cite** une passe de vérification du rattrapage, réellement
  faite le 2026-08-23 → conservée ;
- une date qui **enregistre le travail de la seconde moitié de session** →
  portée au 2026-08-27.

**La parade :** ne jamais coder une date en dur dans une consigne d'agent.
Écrire « date du jour » et laisser l'agent la lire. Une date est une donnée
de provenance au même titre qu'un numéro de page ou une URL — un projet dont
le risque n°1 est la fidélité ne peut pas se permettre de l'approximer.

---

## Ce qui reste à moissonner

Les sessions de rattrapage n'avaient jamais été moissonnées : elles
doublent le gisement d'épreuves réelles disponibles, et sept sujets ne
sont qu'un début. Les identifiants de source (AlloSchool) recensés pour
la suite — SExp maths 2018→2025, et PC/SM au-delà des sept ci-dessus —
sont dans l'historique de la campagne et se re-recensent en une passe si
besoin.
