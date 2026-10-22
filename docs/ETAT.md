# État du projet

> **Une page, réécrite à chaque changement d'état** (règle 18). Dernière réécriture : 2026-10-22.
> Point d'archive avant l'allègement : commit `d3810007` (tout ce qui a été supprimé s'y lit avec
> `git show d3810007:<chemin>`).

## Ce qui existe

- **L'application** (Next.js, `web/`) : 62 notions (14 maths, 25 PC, 12 philosophie, 11 SVT), 39
  épreuves réelles en mode examen, 17 scènes manipulables (2D et 3D), un modèle apprenant, 3
  explications vidéo. Design « Grille » (validé par le propriétaire le 2026-10-21).
- **Où elle vit** : tout le travail est sur la branche `claude/vibrant-fermi-v1lxj5` (PR #2 en
  brouillon). L'aperçu Vercel de la branche : https://bac-pink.vercel.app. `main` est la production
  et n'a pas reçu ce travail (voir « Production »).
- **La CI** : `.github/workflows/ci.yml` à chaque push (4 jobs parallèles, environ 15 min) ;
  `scenes.yml` seulement quand le code d'une scène change ; `hebdo.yml` chaque lundi pour les
  contrôles lents. Avant de pousser : `scripts/verif-commit.sh` (le job `source`, en local).

## La refonte (plan : [`docs/refonte/00-plan.md`](refonte/00-plan.md))

| Chantier | État |
|---|---|
| Design Grille | validé, appliqué au site |
| Format de leçon v3 | **en validation par le propriétaire** sur trois pilotes, liés depuis l'accueil : `/pilote/logarithme` (maths), `/pilote/radioactivite` (physique), `/pilote/expression-genetique` (SVT). Ne pas étendre le format aux autres notions avant son accord. |
| Bible du bac ([`docs/bible/`](bible/README.md)) | brouillon v0 complet : stratégie d'examen, maths (19 fiches), physique (19), chimie (11, pas encore relue), SVT (26). Version lisible : https://claude.ai/artifact/G2iDVCxMC4mfeEYQ9hCZtk |
| Référentiel officiel 2025 ([`docs/referentiel/`](referentiel/README.md)) | les 8 cadres faits : maths (73 + 61 capacités), PC (277 + 290 + 201), SVT (94 + 89 + 22) ; règles communes dans `examen.yaml`. Remplacera `docs/cadre/`, puis la liste de `web/src/lib/curriculum.ts`. |
| Allègement du cadre de travail | fait le 2026-10-22 ([ADR 0042](decisions/0042-allegement.md)) |
| Vérificateur puis générateur d'exercices | à faire, après le format (règles 15 à 17) |

## Production

`main` = production. La fusion de la PR #2 serait un déploiement **et** apporterait quatre
migrations (`backend/supabase/migrations/048` à `051`) que la production n'a jamais reçues. Avant :
la vérification supervisée de la synchronisation (règle 7, `docs/pipeline/production-sync-session.md`),
`scripts/branch-test.ps1` vert contre staging, et la décision du propriétaire.

## Décisions attendues du propriétaire

1. **Le format de leçon** : les trois pilotes conviennent-ils ? Ce qui marche, ce qui est trop
   lent, trop rapide ou trop chargé.
2. **La bible** : les questions de [`docs/bible/QUESTIONS.md`](bible/QUESTIONS.md).
3. **La production** : quand vérifier la synchronisation et fusionner (voir ci-dessus).
4. **Les médias générés** (Gemini pour l'image et la vidéo, ElevenLabs pour la voix) : leurs usages
   permis. Défaut : jamais à la place d'un manipulable quand la pédagogie demande de manipuler.
5. **Les explications vidéo (Manim)** : 3 en ligne, la voie est en sommeil depuis août. Défaut :
   on les garde, on n'en produit plus avant de savoir si le format v3 les remplace.
6. **`correct_feedback`** : 1 629 rétroactions écrites et jamais affichées. Défaut : les afficher
   dans le format v3, sinon arrêter d'en écrire.
