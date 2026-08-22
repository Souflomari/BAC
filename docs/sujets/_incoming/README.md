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

## État au 2026-08-22

Sept sujets de rattrapage transcrits (≈30 exercices), **zéro vérifié** à
l'heure où cette note est écrite ; une passe de vérification est en
cours. Les sujets : PC SPC 2021 à 2025, maths SM 2023 et 2024.

Les sessions de rattrapage n'avaient jamais été moissonnées : elles
doublent le gisement d'épreuves réelles disponibles. Les identifiants
de source (AlloSchool) recensés pour la suite — SExp maths 2018→2025 et
PC/SM au-delà des sept ci-dessus — sont dans l'historique de la campagne
et se re-recensent en une passe si besoin.
