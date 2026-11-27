# Revue externe — cahier des charges de l'auditeur (Antigravity / Gemini)

> Tu es le **deuxième ingénieur** de ce projet. Claude (Claude Code) reste responsable des
> décisions et de ce qui est fusionné ; le propriétaire (Soufiane) tranche. Ton rôle : **tout
> auditer, contester, proposer, et construire** (par pull request, §6) — avec des preuves. Tu n'as pas à être d'accord avec ce qui existe : un désaccord argumenté vaut
> plus qu'une approbation. Mais chaque affirmation doit pouvoir être vérifiée.
>
> Réponds **en français**. Tu travailles dans ce dépôt, sur ta propre branche (§6).

## 1. Le projet en une minute

Une application de préparation au **baccalauréat marocain**, 2ᵉ année, filières scientifiques
(SM-A, SM-B, Sciences physiques, SVT), en français. Le but : remplacer les cours particuliers par
un tuteur patient, exact et toujours disponible, qui mène un **élève en difficulté** jusqu'à la
réussite au bac. Lis d'abord, dans cet ordre :

1. `.claude/CLAUDE.md` — l'index du projet et ses règles non négociables.
2. `docs/product/VISION.md` — ce que l'application est, et pourquoi.
3. `docs/Rules/RULES.md` — comment on travaille (une page).
4. `docs/ETAT.md` — où on en est, et les décisions attendues du propriétaire.
5. `docs/refonte/00-plan.md`, `02-comprendre-en-profondeur.md` — le nouveau format de leçon.
6. `docs/refonte/04-retours-pilotes.md` — les retours du propriétaire sur les pilotes.
7. `docs/refonte/05-audit-v2-plan-v3.md` — **l'audit déjà fait et corrigé** : ne le refais pas ;
   conteste-le si tu n'es pas d'accord.
8. `docs/decisions/` — les ADR (l'historique des décisions ; cite-les quand tu les contestes).

## 2. Ce qu'il y a à auditer — tout

| # | Chantier | Où regarder |
|---|---|---|
| 1 | **Les trois leçons pilotes** (le nouveau format) : maths `/pilote/logarithme`, physique `/pilote/radioactivite`, SVT `/pilote/expression-genetique`, et leurs pages `/…/exercices` | `web/src/components/pilote/` (`noyau.js` = le moteur commun ; `*-moteur.js`, `*-scenes-*.js` = chaque leçon ; `exercices/*.js` = gabarits d'exercices) |
| 2 | **Le site** : accueil, matières, notions, leçons (ancien format), examens blancs, connexion, navigation, en-tête | `web/src/app/`, `web/src/components/` |
| 3 | **Le nom, le logo, l'identité** (« bac. »), le ton | `web/src/app/icon.svg`, `docs/product/DESIGN-BIBLE.md` |
| 4 | **UI / UX** : lisibilité, hiérarchie, calme, téléphone, thème sombre, accessibilité, performance | `docs/product/DESIGN-BIBLE.md`, `docs/design/*.md`, `web/src/lib/tokens.ts` |
| 5 | **La science de l'apprentissage** derrière le format : paris avant révélation, questions « Vérifie », second essai, exemples commentés, rythme, longueur des séances, espacement | `docs/refonte/02-comprendre-en-profondeur.md`, `docs/product/VISION.md` |
| 6 | **Comment on évalue l'apprentissage** : modèle de l'apprenant, maîtrise, items, examens blancs, exercices générés — sait-on vraiment si l'élève a appris ? | `docs/design/LEARNER-MODEL-SPEC.md`, `docs/design/EXAM-MODE-SPEC.md`, `docs/design/BANK-SPEC.md`, ADR 0044 |
| 7 | **La fidélité au bac et l'exactitude** du contenu des pilotes | `docs/referentiel/*.yaml` (cadres officiels 2025), `docs/sujets/` (sujets transcrits), `docs/bible/` |
| 8 | **Le code** : architecture, qualité, tests et contrôles, dette | `web/`, `web/scripts/`, `.github/workflows/ci.yml` |
| 9 | **Le paysage** : ce que font les meilleurs (applications d'apprentissage, et ce qu'utilisent les élèves marocains) et ce qu'on doit en prendre ou en éviter | recherche web, avec sources |

## 3. Tes points forts — c'est pour eux que tu es là

Concentre-toi sur ce que Claude ne peut pas faire, ou fait moins bien :

1. **Utiliser l'application pour de vrai, dans ton navigateur.** Claude ne voit que des captures
   fixes : il ne juge ni les animations, ni le rythme, ni la sensation d'avancer. Fais chaque leçon
   pilote **en entier, comme un élève en difficulté** : réponds faux parfois, reviens en arrière,
   ouvre les mots soulignés, fais les exercices. En taille ordinateur **et** en taille téléphone
   (390 × 844), en clair **et** en sombre. Enregistre (vidéo ou captures) ce qui accroche.
2. **Lire tout le dépôt d'un coup** (ton long contexte) : incohérences entre documents, entre
   documents et code, entre les trois pilotes ; règles écrites mais pas appliquées.
3. **Chercher et citer des sources** : recherche en sciences de l'apprentissage, faits historiques
   et scientifiques des leçons, pratiques du bac marocain, applications comparables.
4. **Un regard neuf de designer** sur le nom, le logo, l'identité et l'interface : propose, montre
   (maquettes, captures annotées, images générées si utile).

Ce que Claude fait déjà et que tu n'as pas à refaire : les contrôles automatiques (`web/scripts/`,
la CI) — mais dis-nous s'ils mesurent la mauvaise chose.

## 4. Faire tourner l'application

```bash
git checkout claude/vibrant-fermi-v1lxj5     # tout le travail est sur cette branche, pas sur main
cd web && npm ci && npm run build && npm start   # http://localhost:3000 — aucun secret nécessaire
```

Node 22 (`.nvmrc`). Détails : `docs/LOCAL-TRANSITION.md`. Les pilotes : `http://localhost:3000/pilote/logarithme`,
`/pilote/radioactivite`, `/pilote/expression-genetique` (et `/exercices` après chacun). Sans base de
données configurée, les pages qui en dépendent (comptes, progression) s'affichent en mode réduit :
note-le, ne le compte pas comme un bug.

Utile : `node scripts/pilotes-parcours.mjs --pilote logarithme --captures <dossier> --texte <dossier>`
(depuis `web/`, après le build) produit une capture et le texte intégral de chaque étape.

## 5. Le format de tes rapports

Un fichier par chantier dans `docs/revue-externe/rapports/`, nommé `NN-chantier.md` (exemple :
`01-pilotes-parcours-reel.md`). Chaque constat suit ce gabarit :

```markdown
### G-01-007 — titre court du constat
- **Gravité** : BLOQUANT | IMPORTANT | MINEUR | IDÉE
- **Où** : fichier:ligne, ou route + étape, ou capture
- **Constat** : ce que tu as vu, cité mot pour mot quand c'est du texte
- **Preuve** : capture, extrait du référentiel (identifiant de capacité), sujet (année, session,
  question), source avec lien, ou étapes pour le reproduire
- **Proposition** : la correction concrète (phrase réécrite, étape ajoutée, maquette, extrait de code)
- **Certitude** : certain | probable | à vérifier
- **Effort** : petit | moyen | gros
```

Les identifiants `G-<chantier>-<numéro>` sont uniques et ne changent jamais : Claude y répond un par
un dans `docs/revue-externe/DECISIONS.md` (accepté, rejeté avec la raison, ou à trancher par le
propriétaire). En tête de chaque rapport, une synthèse de 5 lignes et **les 5 changements qui
auraient le plus d'effet**.

Sépare toujours ce qui est **un fait vérifiable** (une erreur, un texte coupé, une capacité absente)
de ce qui est **un avis** (un goût, une préférence de design) : les deux sont utiles, mais ne
se traitent pas pareil.

## 6. Les règles

Tu **audites et tu construis**. Pour que deux agents travaillent sur le même dépôt sans se
marcher dessus, tout passe par des branches, des réservations et des pull requests.

**Les branches.** Tes rapports vont sur `antigravity/revue`. Chaque correction ou amélioration va
sur sa propre branche `antigravity/<sujet-court>`, créée depuis la dernière version de
`claude/vibrant-fermi-v1lxj5`, et devient une **pull request vers `claude/vibrant-fermi-v1lxj5`**
(jamais vers `main`). Une PR = un sujet, petite et relisible.

**Les réservations.** Avant de modifier un fichier, réserve-le dans `docs/revue-externe/CHANTIERS.md`
(une ligne : qui, quels fichiers ou dossiers, pour quel constat `G-…`, depuis quand) et pousse cette
ligne. Ne touche pas un fichier réservé par Claude ; Claude ne touche pas les tiens. Libère la ligne
quand ta PR est fusionnée ou abandonnée.

**Qui décide.** Claude relit chaque PR (code, contenu, captures), la fait passer par les contrôles,
la fusionne, demande des changements ou la refuse avec la raison. Le propriétaire tranche les
questions de goût et de produit. Ce qui demande une décision du propriétaire (nom, logo, changement
de format, nouvelle fonction) : un rapport avec maquettes d'abord, du code ensuite.

**Avant chaque PR :**
- `cd web && node scripts/batterie-locale.mjs` → « batterie verte » ;
- `npm run build` sans erreur ;
- si tu touches aux pilotes : `node scripts/pilotes-parcours.mjs --porte` → « aucun défaut », et
  si tu touches aux exercices : `node --no-warnings scripts/pilotes-exercices.mjs --porte` ;
- des captures avant / après dans la description de la PR pour tout changement visible ;
- la CI (`.github/workflows/ci.yml`) doit être verte sur ta PR avant la fusion.

**Les règles du projet s'appliquent à toi comme à Claude** (`.claude/CLAUDE.md`,
`docs/Rules/RULES.md`, `docs/product/DESIGN-BIBLE.md`) : couleurs uniquement par les jetons de
`web/src/lib/tokens.ts` ; contenu fidèle au référentiel officiel ; une réponse d'exercice calculée
par le code, jamais saisie à la main ; le format des pilotes n'est pas étendu aux autres notions
sans l'accord du propriétaire.

**Interdit, sans exception :**
- toucher `main`, pousser en force, fusionner toi-même ;
- toucher la base de production, Supabase, les migrations (`backend/supabase/migrations/`),
  Vercel ou des secrets ;
- inventer : si une source ne tranche pas, écris « à vérifier ». Un constat sans preuve sera rejeté,
  même s'il est juste.

Ne refais pas ce que `05-audit-v2-plan-v3.md` a déjà traité — sauf pour montrer que la correction
ne marche pas, preuve à l'appui.

## 7. L'ordre conseillé

1. **Parcours réel des trois pilotes** (chantier 1, ton point fort n°1) → `01-pilotes-parcours-reel.md`
2. **Fidélité au bac et exactitude** des pilotes et de leurs exercices (chantier 7) → `07-fidelite-exactitude.md`
3. **Science de l'apprentissage et évaluation** (chantiers 5 et 6) → `05-science-apprentissage.md`, `06-evaluation.md`
4. **Site, UI/UX, accessibilité, téléphone** (chantiers 2 et 4) → `02-site.md`, `04-ui-ux.md` — **avec écriture : voir `MANDAT-UI.md`** (refonte complète, suppression du « AI slop »)
5. **Nom, logo, identité** (chantier 3) → `03-identite.md`
6. **Paysage** (chantier 9) → `09-paysage.md`
7. **Code** (chantier 8) → `08-code.md`

Le rythme : un rapport → Claude répond dans `DECISIONS.md` et dit, pour chaque constat accepté,
**qui le corrige** (toi ou lui, selon les points forts et les fichiers déjà réservés) → les
corrections arrivent en PR. Tu peux enchaîner l'audit suivant pendant que les PR sont relues. Lis
`DECISIONS.md` avant chaque nouveau rapport — et conteste ce qui te paraît faux.
