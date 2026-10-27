# EXAM-MODE-SPEC — l'épreuve en conditions réelles (C5, v1)

> **Statut** : v1 construite le 2026-08-22 sur mandat owner (« attack
> everything »), spec-first. **Autorité** : VISION (« remplacer les heures
> sup ») → DESIGN-BIBLE (discipline) → STUDIO-SPEC (anatomie) → ce spec.
> Phase C5 du plan de maîtrise : « timed full papers assembled from banks +
> barème self-scoring (periphery, calm core untouched) ».

## 0 · Le principe

Le bac se prépare en faisant DES ÉPREUVES ENTIÈRES, chronométrées — pas
seulement des exercices isolés. Les banques par notion contiennent déjà
les exercices des vraies épreuves, vérifiés, avec leur barème : ce mode
les REGROUPE par épreuve d'origine (filière × année × session) et fait
répéter l'examen dans ses conditions. Rien n'est inventé : une épreuve
n'existe ici que parce que ses exercices existent en banque.

**Frontière calme (§0 de la bible)** : le chrono et l'auto-notation
vivent UNIQUEMENT ici — jamais dans les leçons ni dans « S'entraîner ».
Ce mode est la salle d'examen ; la leçon reste la salle d'étude.

## 1 · Les données (lib/examens.ts)

- Source : les `bank.yaml` chargés par `loadNotion` (le parseur existant,
  jamais dupliqué). Groupement par `source.{filiere, year, session}`.
- Une épreuve : `{ id: "spc-2023-normale", filiere, year, session,
  pts (somme des bareme_total), minutes (somme des duration_min),
  dureeOfficielleMin (SM 240 ; SExp/SPC 180), complete (pts ≥ 19,5),
  refs[] (exercice + notion d'origine, ordonnés par leur position sur
  l'épreuve réelle — le numéro dans exerciseLabel) }`.
- **Honest-state dur** : une épreuve incomplète est listée avec « X pts
  sur 20 disponibles » — jamais présentée comme entière. Zéro épreuve
  fabriquée ; zéro % inventé ; aucun stockage v1 (l'auto-évaluation vit
  et meurt avec la page — la persistance viendra avec l'auth).

## 2 · Les surfaces

**/examens** (liste, bande `page`) : en-tête display + les épreuves en
cartes par matière (PC · Maths SExp · Maths SM), motif ProgrammeMap
(carte claire, bordure, mono pour les faits) : année/session, nb
d'exercices, pts disponibles, durée officielle. Complètes d'abord,
partielles étiquetées.

**/examens/[id]** (l'épreuve, bande `page`) — TROIS phases, une machine
d'états client (`EpreuveShell`) :

1. **Seuil** : les conditions (durée officielle, points disponibles,
   « travaille sur papier, comme le jour J »), avertissement honnête si
   partielle. UNE action primaire : « Commencer l'épreuve »
   (`data-primary-action`).
2. **Épreuve** : barre sticky discrète (chrono ÉCOULÉ en mono
   `text-secondary` — jamais de compte à rebours rouge, jamais de son ;
   dépassement affiché en une phrase neutre), bouton « Terminer ».
   Les exercices dans l'ordre du sujet réel : provenance, énoncé,
   questions (barème dans les stems, tel que transcrit).
   **Attempt-first ABSOLU : aucune correction dans le DOM avant
   « Terminer »** — même contrat que les leçons, asserté par dom-truth.
3. **Correction** : par question, le raisonnement expert (MdBlock) puis
   l'auto-notation à trois états « Juste / Partiel / Faux » (radiogroup,
   pts · ½ · 0). Note affichée « Auto-évaluation indicative : n / 20 »
   (règle de trois sur les pts disponibles quand partielle, dit
   explicitement). Par exercice : « Revoir la notion → » vers la leçon
   d'origine. AUCUNE célébration, aucune couleur de verdict plein écran.

**Entrées** : palette ⌘K (« Aller à ») + un lien calme sur l'accueil
(en-tête de la section programme). C'est tout — périphérie.

## 3 · Ce que la v1 ne fait PAS (et pourquoi)

- Pas de persistance des notes (auth « off » ; honest-state — plutôt
  rien que du localStorage qui ment en changeant d'appareil).
- Pas d'épreuves « type » assemblées par forme d'examen (les vraies
  années d'abord ; l'assemblage synthétique est une décision d'owner).
- Pas de mode « surveillé » (pause interdite) : la pause existe, c'est
  une RÉPÉTITION — la contrainte stricte viendra si l'owner la veut.

## 4 · Portes

dom-truth : /examens liste ≥ 1 épreuve complète avec pts en mono ;
épreuve : phase seuil sans correction dans le DOM (sweep interactif :
commencer → terminer → correction présente) ; chrono sans classe/couleur
d'alerte. Toutes les portes existantes inchangées.

## Retractions and Corrections

*(présent dès la création, par discipline — vide pour l'instant)*
