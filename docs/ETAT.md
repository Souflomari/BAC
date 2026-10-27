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
| Format de leçon v3 | **en validation par le propriétaire** sur trois pilotes, liés depuis l'accueil : `/pilote/logarithme` (maths), `/pilote/radioactivite` (physique), `/pilote/expression-genetique` (SVT), chacun avec sa page d'exercices générés (`…/exercices`). Retours du 2026-10-26 ([`refonte/04-retours-pilotes.md`](refonte/04-retours-pilotes.md)) ; v2 le 2026-10-26 sur le noyau commun ([ADR 0043](decisions/0043-noyau-des-pilotes.md)) ; audit de la v2 et **V3 le 2026-10-27** ([`refonte/05-audit-v2-plan-v3.md`](refonte/05-audit-v2-plan-v3.md), [ADR 0044](decisions/0044-exercices-generes-et-second-essai.md)) : maths 55 étapes et 14 exercices, physique 56 et 11, SVT 54 et 10. Ne pas étendre le format aux autres notions avant son accord. |
| Bible du bac ([`docs/bible/`](bible/README.md)) | brouillon v0 complet : stratégie d'examen, maths (19 fiches), physique (19), chimie (11, relue une deuxième fois le 2026-10-22), SVT (26). Version lisible : https://claude.ai/artifact/G2iDVCxMC4mfeEYQ9hCZtk |
| Référentiel officiel 2025 ([`docs/referentiel/`](referentiel/README.md)) | les 8 cadres faits : maths (73 + 61 capacités), PC (277 + 290 + 201), SVT (94 + 89 + 22) ; règles communes dans `examen.yaml`. L'ancien `docs/cadre/` est supprimé (la proposition de philosophie et le PDF du cadre PC ont été déplacés dans le référentiel). Reste : générer la liste de `web/src/lib/curriculum.ts` depuis ce référentiel, après relecture du propriétaire. |
| Allègement du cadre de travail | fait le 2026-10-22 ([ADR 0042](decisions/0042-allegement.md)) |
| Vérificateur puis générateur d'exercices | à faire, après le format (règles 15 à 17) |

## Production

`main` = production. La fusion de la PR #2 serait un déploiement **et** apporterait quatre
migrations (`backend/supabase/migrations/048` à `051`) que la production n'a jamais reçues. Avant :
la vérification supervisée de la synchronisation (règle 7, `docs/pipeline/production-sync-session.md`),
`scripts/branch-test.ps1` vert contre staging, et la décision du propriétaire.

## Décisions attendues du propriétaire

1. **Le format de leçon** : la V3 des trois pilotes et leurs exercices conviennent-ils ? Prêts à
   relire ; ce qu'il faut regarder en priorité est listé en fin de
   [`refonte/05-audit-v2-plan-v3.md`](refonte/05-audit-v2-plan-v3.md). Points ouverts : la longueur
   (54 à 56 étapes, une pause proposée au milieu) et la séance 2 des maths (« ln comme fonction »),
   pas encore écrite.
2. **La bible** : les questions de [`docs/bible/QUESTIONS.md`](bible/QUESTIONS.md).
3. **La production** : quand vérifier la synchronisation et fusionner (voir ci-dessus).
4. **Les médias générés** (Gemini pour l'image et la vidéo, ElevenLabs pour la voix) : leurs usages
   permis. Défaut : jamais à la place d'un manipulable quand la pédagogie demande de manipuler.
5. **Les explications vidéo (Manim)** : 3 en ligne, la voie est en sommeil depuis août. Défaut :
   on les garde, on n'en produit plus avant de savoir si le format v3 les remplace.
6. **`correct_feedback`** : 1 629 rétroactions écrites et jamais affichées. Défaut : les afficher
   dans le format v3, sinon arrêter d'en écrire.
