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

## État au 2026-08-23 — LA CHAÎNE EST BOUCLÉE

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

## Ce qui reste à moissonner

Les sessions de rattrapage n'avaient jamais été moissonnées : elles
doublent le gisement d'épreuves réelles disponibles, et sept sujets ne
sont qu'un début. Les identifiants de source (AlloSchool) recensés pour
la suite — SExp maths 2018→2025, et PC/SM au-delà des sept ci-dessus —
sont dans l'historique de la campagne et se re-recensent en une passe si
besoin.
