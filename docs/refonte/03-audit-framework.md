# 03 — Audit du cadre de travail : outillage, documents, règles, agents

*Audit en lecture seule du 2026-10-21, sur le commit `816ddc5b` (branche `claude/vibrant-fermi-v1lxj5`).
Rien n'a été modifié, déplacé ni commité dans le dépôt, à part ce fichier. La batterie locale a été
chronométrée dans un clone jetable (`git clone --shared` dans le scratchpad de la session), pour que ses
essais rouges, qui cassent puis restaurent des fichiers, ne touchent pas l'arbre de travail.
Chaque chiffre est suivi de la commande qui le produit (depuis la racine du dépôt, sauf mention).*

---

## 0. Résumé

**Le constat en une phrase.** En trois mois, le dépôt a construit un appareil de vérification aussi gros
que le produit qu'il vérifie : **146 scripts et 46 430 lignes dans `web/scripts/`, contre 45 144 lignes
dans `web/src/`** ; une CI de **104 étapes en 5 jobs, qui prend 52 à 61 min de bout en bout et environ
178 min de runner à chaque poussée** ; **91 « lois » de méthode** réparties dans les ADR 0031–0041 ; un
`HANDOFF.md` de **161 488 mots**. Ce que l'appareil attrape est concentré dans un petit nombre
d'étapes : **sur les 76 runs de CI depuis le 2026-09-24, 38 ont été annulés (la CI est plus lente que le
rythme des poussées) et 10 ont été rouges, tous causés par 9 seulement des 104 étapes.**

**À garder.** Les sept non-négociables de production, sans changement. `validate-content`, le build, un
`dom-truth` aminci, la porte des figures (clair et sombre), la largeur téléphone, les liens internes, le
rendu des formules, les contrôles numériques (qui sont la graine du futur vérificateur d'exercices), les
entrées du modèle apprenant, les tests unitaires, le cadre et les annales (`docs/cadre/`, `docs/sujets/`).

**À couper.** Les instruments qui mesurent d'autres instruments : les essais rouges, la « porte des
portes », la garde de dérive de la batterie, les campagnes de sabotage. Les 9 sceaux et cliquets.
Une vingtaine de sondes ponctuelles dont le résultat est déjà consigné. `HANDOFF.md` dans le chemin de lecture.
Les spécifications de 4 000 lignes. La chaîne de critiques en deux vagues (6 critiques). Les identifiants
de modèle de génération précédente épinglés dans les 17 agents.

**Ce qui manque pour la nouvelle direction.** Un **vérificateur d'exercices générés**. Aujourd'hui,
seules **333 des 13 936 égalités du corpus (2,4 %) sont vérifiables numériquement** (en-tête de
`web/scripts/calculs-numeriques.mjs`). Faire générer des centaines d'exercices par notion à Haiku n'a de
sens que si ce vérificateur existe. C'est le seul instrument neuf qui vaille d'être construit. Il ne coûte
presque rien à faire tourner (§7.3) : générer tout le corpus coûte moins de 50 $ par passe.

| | Aujourd'hui (mesuré) | Proposé | Gain attendu |
|---|---|---|---|
| CI, durée de bout en bout par poussée | 52 min 09 s (run 824) · 60 min 36 s (run 822) | ≈ 12–15 min (3 jobs parallèles ; les scènes ne tournent que si leurs fichiers changent) ; ≈ 10 min après fusion de quelques portes | **−75 à −80 %** |
| CI, minutes de runner par poussée | ≈ 178 min (run 824 : 52 + 40 + 41 + 21 + 24) | ≈ 27 min ; une passe complète **par semaine** (≈ 180 min) | **−85 %** par poussée |
| Batterie locale (`batterie-locale.mjs`) | **123 s**, dont 92 s d'instruments sur instruments | ≈ 35 s | **−70 %** |
| `web/scripts/` | 146 scripts + 10 JSON (9 sceaux + 1 manifeste de 46 Ko) | 47 scripts archivés ; 0 sceau ; 99 restants (28 portes, 15 tests, 17 scènes, 39 sondes à la demande) | −47 fichiers, −10 JSON |
| `docs/` | 282 fichiers, 14 Mo, environ 19 000 mots de lecture obligatoire | 107 fichiers archivés (4,2 Mo) ; environ 15 documents à lire, environ 6 000 mots | −107 fichiers |
| Règles à connaître | CLAUDE.md 274 lignes / 2 541 mots ; RULES.md 305 lignes ; 91 lois d'ADR ; 18 cases du gabarit v2 ; 9 sceaux à resceller à la main ; 69 essais rouges à entretenir | **20 règles sur une page** (§6) ; CLAUDE.md ≈ 60 lignes | ≈ −80 % du texte normatif |
| Agents | 17 fichiers, 9 569 mots, `claude-opus-5` / `claude-sonnet-5` épinglés | 11 sous-agents + 2 programmes (générateur, vérificateur), alias de modèle | −6 agents, 3 rôles neufs |

Les gains de CI ont un prix, et il faut le dire : une porte qui passe en hebdomadaire attrape sa
régression avec jusqu'à une semaine de retard. Sur le dernier mois, cela aurait retardé **2 rouges réels
sur 10** (impression ×1, et typographie ×2 si on ne la convertit pas d'abord en contrôle de la source). Le
plan (§3.1) transforme typographie et accents en contrôles de la source, rapides, avant de déplacer leur
version rendue en hebdomadaire.

---

## 1. Inventaire chiffré

### 1.1 `web/scripts/`

`ls web/scripts/*.mjs web/scripts/*.js web/scripts/*.sh | wc -l` → **146** · `wc -l … | tail -1` →
**46 430 lignes** · `lib/` : 3 fichiers, 553 lignes · `du -sh web/scripts` → 3,1 Mo.

| Groupe (classement du §3) | Fichiers | Lignes | Exemples |
|---|---|---|---|
| A — portes et outils à garder | 28 | 13 498 | `dom-truth` 4 713, `validate-content` 2 966, `figure-preview` 1 440 |
| Tests unitaires `test-*.mjs` | 15 | 3 312 | 6 tests du produit, 9 tests de modèles de scène |
| Portes de scène `scene-*.mjs` (hors `scene-ergonomie`) | 17 | 14 749 | `scene-tremplin` 1 226, `scene-champ-pentes` 1 216 |
| B — sondes à la demande ou hebdomadaires | 39 | 9 194 | `copie-maths`, `stockage-refuse`, `impression`… |
| C — à archiver | 47 | 5 676 | `essais-rouges`, `portee-portes`, `rampe-*`… |

**Qui lance quoi** (calcul fait à partir de `gates.yml`, des `npm run` qu'il appelle, du crochet
`prebuild` et des listes `ETAPES` et `HORS_CHAMP` de `batterie-locale.mjs` ; script en annexe B, [C3]) :
- **87** scripts sont atteints par la CI : directement, par `npm run`, ou par `prebuild`.
- **49** sont lancés par la batterie locale, dont 47 aussi en CI.
- **44** sont déclarés « hors champ » de la batterie : 40 tournent en CI, 4 ne tournent nulle part
  (`trois-moteurs`, `figures-trois-moteurs`, `temps-de-chargement`, `scene-ergonomie`).
- **53** ne sont lancés ni par la CI ni par la batterie. 50 d'entre eux sont catalogués comme outils à la
  demande dans `INSTRUMENTS.md (supprimé le 2026-10-22)` (2 595 lignes). Les 3 autres (`_srv.sh`,
  `audit-round3-wf.js`, `audit-round4-wf.js`) échappent au contrôle d'orphelins, qui ne regarde que les
  `.mjs`.
- Dates : 126 des 146 scripts ont été créés entre le 2026-09-03 et le 2026-09-28
  (`git log --diff-filter=A --format=%cs -- web/scripts/<f>`).

**Sceaux** (`ls web/scripts/*.json`) : `carte-chapitres.base.json` 31 826 o · `essais-rouges.manifeste.json`
45 917 o (69 essais, 41 commits) · `indice-absolu` 12 078 o · `indice-longueur` 9 518 o · `couverture-diagnostique`
6 640 o (14 commits) · `eleve-ruse` 4 901 o · `indice-refus` 3 880 o · `rampe-bac` 2 698 o · `resume-couverture` 457 o ·
plus `accents.mots.json`, une liste de mots et non un sceau. Chaque sceau se « resselle » à la main (`--sceller`) :
c'est un rituel de plus à connaître.

### 1.2 `scripts/` (racine)

`find scripts -type f | xargs wc -l | tail -1` → **17 fichiers, 5 382 lignes**.

| Fichier | Lignes | Dernière modif. | Utilisé par |
|---|---|---|---|
| `branch-test.ps1` | 518 | 2026-05-16 | sécurité production (CLAUDE.md, CONTRIBUTING) |
| `edge-function-smoke-test.ps1` | 381 | 2026-05-18 | sécurité production |
| `verif-commit.sh` | 29 | 2026-10-20 | geste d'avant-poussée (LOCAL-TRANSITION) |
| `accents-francais.py` | 748 | 2026-09-20 | CI (vérifie la liste de mots) |
| `renvois-barreaux.py` | 1 120 | 2026-09-04 | campagne unique, terminée |
| `reparer-renvois-rung.py` | 111 | 2026-09-04 | campagne unique, terminée |
| `typo-math.py`, `typo-figures.py` | 60 + 195 | 2026-09-05 | outils de réparation |
| `figure-geometrie-espace-2019.py` | 403 | 2026-09-04 | générateur d'une seule figure |
| `make-work-order.py` | 285 | 2026-08-12 | bons de travail Antigravity (expérience d'août) |
| `bank-fidelity.py`, `scene-lint.py`, `publish-explications.py` | 132 + 283 + 550 | 2026-08 | voie « explication animée » (Manim) |
| `gemini-vision.mjs` | 58 | 2026-08-07 | premier jet de transcription par Gemini |
| `campagnes/` (3 fichiers) | 509 | 2026-10-20 | campagnes de sabotage des portes de scène |

### 1.3 `docs/`

`for d in docs/*/; do … git log -1 --format=%cs -- "$d"; done` (annexe B, [C5]) → **282 fichiers, 14 Mo,
131 218 lignes de Markdown**.

| Dossier | Fichiers | Taille | Lignes .md | Dernière modif. |
|---|---|---|---|---|
| `HANDOFF.md` | 1 | 1 012 Ko | 16 730 (161 488 mots ; 452 titres, 95 sections `### 11.x`) | 2026-10-20 |
| `LOCAL-TRANSITION.md` | 1 | 16 Ko | 213 | 2026-10-20 |
| `README-docs.md` · `content-guide.md` · `quiz-demo.html` · `reestablish-state-report.md` | 4 | 72 Ko | 84 · 196 · 638 · 587 | 09-05 · 05-12 · 05-12 · 06-22 |
| `Rules/` | 1 | 20 Ko | 305 | 2026-08-15 |
| `agents/` | 1 | 28 Ko | 386 | 2026-09-05 |
| `archive/` | 4 | 144 Ko | 2 484 | 2026-09-05 |
| `audits/` | 72 | 1 876 Ko | 22 487 | 2026-10-20 |
| `cadre/` | 14 | 2 616 Ko (un PDF de 2,2 Mo) | 1 170 | 2026-10-20 |
| `decisions/` | 39 | 2 376 Ko (deux PNG de preuve, 1,9 Mo) | 7 660 | 2026-09-25 |
| `design/` | 19 | 248 Ko | 3 858 | 2026-09-24 |
| `grounding/` | 4 | 128 Ko | 2 333 | 2026-09-20 |
| `ops/` | 5 | 80 Ko | 1 409 | 2026-08-14 |
| `pipeline/` | 24 | 1 844 Ko | 21 966 | 2026-10-20 |
| `product/` | 5 | 96 Ko | 1 513 | 2026-09-05 |
| `reestablish-state/` | 3 | 20 Ko | 115 | 2026-06-22 |
| `sujets/` | 85 | 3 076 Ko | 47 722 | 2026-09-04 |

Les plus gros fichiers : `docs/pipeline/propositions/` contient **8 spécifications, 19 752 lignes, environ 257 000
mots**. La spécification d'**un seul** manipulable (`maths-equations-differentielles-scene-pentes.md`)
fait **4 124 lignes et 59 242 mots, avec 197 mentions de « vague »** (`wc -w`, `grep -ciE 'vague ?[0-9]'`).
Viennent ensuite `INSTRUMENTS.md` (2 595 lignes, 43 001 mots) et `DECISIONS-EN-ATTENTE.md` (2 281 lignes,
41 sections, 23 901 mots).

**ADR** (`docs/decisions/`) : 37 ADR, numérotés de 0003 à 0041 (0001, 0002, 0014 et 0015 manquent). Les ADR
0003 à 0013 (mai) traitent du schéma et des misconceptions ; 0016 à 0030, de la pile, du design et des
voies média ; **0031 à 0040 sont dix ADR de méthode de mesure** (« la porte exacte sur une autre
question », « l'instrument qui ne s'entendait pas », etc.), qui totalisent 72 décisions numérotées. 0041 (853
lignes) porte sur les scènes 3D (19 décisions). Les ADR 0031 à 0041 font ensemble 23 391 mots
(`cat docs/decisions/00{31..41}*.md | wc -w`).

**Audits** (`docs/audits/`) : 72 fichiers. 3 registres sont vivants (`DECISIONS-EN-ATTENTE`,
`DETTE-CADRE`, `cadre-couverture`). 19 accompagnent des fils encore ouverts (`critiques/` 13,
`dette-examen/` 4, `DETTE-EXAMEN.md`, `INSTRUMENTS.md`). **50 sont des rapports datés** : 14 n'ont plus
bougé depuis août, 36 ont été modifiés pour la dernière fois en septembre (liste en annexe A.2).

### 1.4 Agents, skills, règles, produit

| Objet | Mesure (commande) |
|---|---|
| `.claude/CLAUDE.md` | **274 lignes, 2 541 mots, 16 895 octets (environ 4 800 jetons chargés à chaque session)**. Le résumé des ADR (lignes 60 à 182) en fait **1 482 mots, soit 58 %** (`awk '/ADR 0025 consolidates/,/docs\/HANDOFF.md/' … \| wc -w`) |
| `docs/Rules/RULES.md` | 305 lignes, 2 299 mots, 9 sections, 31 puces |
| `.claude/agents/*.md` | **17 agents, 9 569 mots** ; `model:` → 10 × `claude-opus-5`, 7 × `claude-sonnet-5` (`grep -h '^model:'`) ; 17 × « Status: v0.1 Provisional » |
| `.claude/skills/` | 3 skills (`design-bible` 42 lignes, `figure-authoring` 91, `verification` 87), 1 573 mots |
| `docs/product/` | VISION 266 lignes (2 121 mots) · DESIGN-BIBLE 633 lignes (5 464 mots, 90 puces) · NORTH-STAR-V2 206 · OUTILLAGE 173 · REFONTE-STUDIO 235 |
| Lecture imposée par RULES §8 et LOCAL-TRANSITION | CLAUDE + VISION + DESIGN-BIBLE + RULES + ROSTER + architecture + LOCAL-TRANSITION = **environ 19 000 mots** (`wc -w`), auxquels s'ajoutent les 23 391 mots des ADR 0031–0041 que CLAUDE.md résume, et les renvois à HANDOFF, INSTRUMENTS et DECISIONS (228 390 mots) |

### 1.5 `content/`

Commande : `cd web && node -e '<compteur js-yaml>'` (annexe B, [C6]) et `cat content/<m>/*/lesson.md | wc -l`.

| Matière | Notions | Lignes de leçon | Items | Checkpoints | Banque | Exercices | Misconceptions | SVG | Étapes (`.stages.json`) | Descripteurs média |
|---|---|---|---|---|---|---|---|---|---|---|
| maths | 14 | 10 780 | 686 | 108 | 73 | 32 | 286 | 80 | 79 | 12 |
| pc | 25 | 9 932 | 827 | 130 | 174 | 50 | 346 | 156 | 138 | 28 |
| philo | 12 | 3 811 | 366 | 89 | 0 | 20 | 194 | 2 | 1 | 0 |
| svt | 11 | 3 253 | 103 | 75 | 0 | 0 | 57 | 49 | 37 | 0 |
| **Total** | **62** | **27 776** (384 687 mots) | **1 982** | **402** | **247** | **102** | **883** | **287** | **255** | **40** |

Marqueurs dans les leçons (`grep -oE '\[\[[a-z0-9_-]+:'`) : 404 checkpoints, 279 figures, 104 exercices,
23 embeds, 13 dérivations, 12 animations (motion), 1 vidéo. Les 40 descripteurs média se répartissent en
**17 scènes** (6 `scene3d`, 11 `scene2d`), 4 embeds PhET et 19 figures interactives ou animées. `content/`
contient aussi **67 fichiers `REVIEW-*.md` (9 154 lignes, 92 207 mots)** et 24 autres `.md` de travail
(spécifications de scène, ledgers) : ce sont des notes d'auteur rangées à côté du contenu.

### 1.6 `web/src/`

`find web/src \( -name '*.ts' -o -name '*.tsx' \) | xargs wc -l` → **188 fichiers, 45 144 lignes** ;
81 composants `.tsx` sous `components/`. Répartition : `components/notion` 58 fichiers / 18 335 lignes ;
`lib` 85 / 19 590 ; `app` 14 / 3 292 ; `ui` 16 / 2 324. **Les scènes représentent 21 737 lignes, soit 48 %
de `web/src`** : `lib/scene2d` et `lib/scene3d` 11 652, `components/notion/scene` (24 panneaux) 10 085. Il y a
9 routes `page.tsx`, dont `/options/wide/[v]` (temporaire, voir §5) et `/atelier` (prototype).

### 1.7 Autres dossiers

`work-orders/` : 43 fichiers (bons de travail Manim, 2026-08-23). `animations/` : 63 fichiers, 1,8 Mo, 54
scènes Manim écrites mais **3 seulement publiées** (`animations/published.json`), dernière modification le
2026-08-14. `backend/seed/` : 127 fichiers, 4,3 Mo, dont des encodeurs Dart de l'ère Flutter, dernière
modification le 2026-05-16. Les migrations 048 à 051 n'ont jamais été appliquées en production
(LOCAL-TRANSITION §3).

---

## 2. Coût de l'outillage

### 2.1 CI — durées réelles (API GitHub)

`gh api repos/Souflomari/BAC/actions/runs/<id>/jobs` plus un calcul `completed_at − started_at` par étape
(annexe B, [C1]).

| Run (commit) | `gates` | `scenes` | `scene-champ` | `qcm` | `telephone` | Bout en bout | Runner cumulé |
|---|---|---|---|---|---|---|---|
| 824 (34345bf5), vert | 52:06 | 41:01 | 40:23 | 23:53 | 20:41 | **52:09** | **≈ 178 min** |
| 822 (e265bcb7), vert | 60:31 | 42:02 | 43:41 | 23:19 | 16:28 | **60:36** | ≈ 186 min |
| 823 (9e3a204b), rouge (impression) | 45:15 | 41:10 | 43:20 | 23:26 | 20:20 | 45:19 | ≈ 173 min |

**Où passe le temps (run 824).** 11 étapes du job `gates` font **85 % de ses 52 min** : presse-papier 468 s,
stockage refusé 450 s, impression 339 s, réduire les animations 325 s, dom-truth 232 s, zoom 157 s,
typographie 156 s, accents 146 s, build 145 s, formules 126 s, hydratation 120 s. **Les portes de scène
consomment 5 290 s, soit 88 min de runner par poussée** (la moitié du total) : le manège seul 1 110 s, le champ
magnétique 1 141 s. **Le build est refait 5 fois** (751 s de runner), un par job. Les commentaires de
`gates.yml` (lignes 19 à 109) retracent la montée du budget : 30 min, puis 50, 80 et enfin 90 min.

**Ce que la CI attrape.** `gh api 'repos/Souflomari/BAC/actions/runs?per_page=100&created=>=2026-09-24'`
→ **76 runs : 38 annulés, 10 rouges, 28 verts**. Les annulations viennent de `cancel-in-progress` à chaque
nouvelle poussée, et **35 des 177 commits de la période portent `[skip ci]`** pour éviter d'annuler un run en
cours (`git log --since=2026-09-24 --oneline | grep -c "skip ci"`). Les 10 rouges, étape par étape
([C2]) : typographie française ×2, impression, figures (thème clair), marge des étiquettes, prose jumelle,
scène de l'orbite, scène des noyaux, porte liens (une spec citait un chemin mort), essais rouges. **Au
moins 6 de ces 10 rouges sont des défauts que l'élève aurait vus** (typographie, impression, figures,
marges, prose dupliquée). Un relève de l'hygiène des docs, un autre de la méta-instrumentation, et les deux
rouges de scène restent à qualifier. **Les 95 autres étapes n'ont rien attrapé en un mois.**

### 2.2 Batterie locale

Mesurée dans le clone d'audit (`cd web && node scripts/batterie-locale.mjs`, horodatée) : **123 s, tout
vert**. Temps de chaque étape lancée seule :

| Contrôle | Durée | Nature |
|---|---|---|
| `essais-rouges.mjs` (69 essais) | **73,7 s** | instrument sur instruments |
| `portee-portes.mjs` | **18,6 s** | instrument sur instruments |
| `validate-content` (62 notions) | 12,4 s | contenu |
| `arithmetique-rendue --strict` | 8,7 s | contenu |
| tests unitaires (15 suites) | 2,6 s | produit |
| `prose-jumelle` | 1,7 s | contenu |
| les 20 autres | < 0,6 s chacun | contenu et sécurité |

**75 % du temps de la batterie (92 s sur 123) sert à vérifier les vérificateurs.** Le script fait 518
lignes, dont 279 de commentaires, et embarque trois gardes sur lui-même : la dérive par rapport à
`gates.yml`, les orphelins par rapport à `INSTRUMENTS.md`, `PW_CHROMIUM_PATH`.

### 2.3 Ce qu'un contributeur doit savoir avant de toucher un fichier

- Environ **19 000 mots** de lecture imposée (§1.4), plus les 23 391 mots des ADR de méthode que CLAUDE.md
  résume en 1 482 mots chargés à chaque session.
- **91 lois de méthode** (ADR 0031 à 0041). **18 cases** du gabarit v2 (`NOTION-TEMPLATE-V2.md`), qu'un
  critique vérifie « case par case, avec une citation par case ». **90 puces** dans la DESIGN-BIBLE.
- **7 marqueurs d'exception** reconnus par les portes et écrits dans les fichiers : `RECOUVREMENT ASSUMÉ:`,
  `DETTE OWNER:`, `CHEMIN DISPARU:`, `CHEMIN À CRÉER:`, `COULEURS SÉMANTIQUES:`, `LÉGITIMES:` et
  `data-hors-panneau`.
- **9 sceaux** à resceller, **69 essais rouges** à entretenir dans un manifeste JSON, et un protocole de
  campagne de sabotage (`scripts/campagnes/`, environ 4 min par sabotage, 44 à 87 sabotages par porte).
- Le flux de notion par critiques (`ROSTER.md (supprimé le 2026-10-22)` §4–5) : vague 1 (2 critiques), puis vague 2 (4
  critiques), avec un ordre d'arbitrage entre critiques.

### 2.4 Où est allé l'effort (depuis le 2026-09-01)

`git log --since=2026-09-01 --name-only` classé par zone touchée ([C4]) : **718 commits**, dont 321 touchent
`content/`, 87 le produit web sans contenu, **132 uniquement des instruments** (`web/scripts`, `.github`) et
**172 uniquement des docs**. En lignes ajoutées : **68 609 dans instruments, audits et ADR**, contre 162 503
dans `content/` et `web/src/` (`git log --numstat`). Environ un tiers de l'énergie de septembre et octobre
a servi à l'appareil de mesure.

---

## 3. Ce qui sert l'élève, et ce qui sert les instruments

Trois classes :
- **A, GARDER** : attrape souvent et à faible coût un défaut que l'élève verrait.
- **B, OPTIONNEL** : utile mais lent ou rare ; tourne chaque semaine, à la demande, ou seulement quand ses
  fichiers changent.
- **C, ARCHIVER** : instrument sur instrument, audit ponctuel déjà exploité, mort ou remplacé.

### 3.1 Les étapes de CI (job `gates`, durées du run 824)

| Étape | s | Classe | Raison (une ligne) |
|---|---|---|---|
| Tests unitaires (15 suites) | 6 | A | logique du produit et modèles de scène, quasi gratuits |
| Porte liens (`liens-fichiers`) | 1 | A, temporaire | le filet de sécurité des suppressions (§8) ; ensuite, limitée aux docs vivants |
| `validate-content --strict` | 7 | A | la porte de la source ; à délester des règles de « barreaux » quand la v3 arrivera |
| Inventaire K-8 à jour (`lectures-graphiques --check`) | 0 | C | régénère un inventaire documentaire, rien côté élève |
| Build (+ `prebuild` generate-tokens) | 145 | A | indispensable |
| `dom-truth` | 232 | A, à amincir | la vérité rendue ; 4 713 lignes, dont 1 234 de commentaires, plus des rangées « Day-x » pour des anatomies retirées |
| Préférences après rendu de secours | 20 | B | régression rare |
| Désaccords d'hydratation | 120 | A, à fusionner dans dom-truth | une hydratation ratée = une page morte |
| Marge des étiquettes | 4 | A | étiquettes de figure coupées ; un rouge réel ce mois-ci |
| Stockage refusé | 450 | B, hebdo | navigation privée ; défaut corrigé, régression rare |
| Réduire les animations | 325 | B, hebdo | un contrôle source de `prefers-reduced-motion` peut remplacer la passe rapide |
| Calculs numériques | 0 | A | une erreur de calcul dans un corrigé est le pire défaut ; graine du vérificateur |
| Prose jumelle | 2 | B | hygiène éditoriale, pas un défaut d'élève |
| Dollars appariés | 0 | A, à fusionner dans validate-content | un `$` orphelin, c'est du LaTeX brut à l'écran |
| Syntaxe pour vieux moteurs | 0 | A | iOS 15 plante sur un lookbehind |
| Figures, thème clair et thème sombre | 94 | A | cadre, panneau, contraste ; un rouge réel ce mois-ci |
| Glyphes confondus | 5 | B | police ; défaut corrigé |
| Liens internes | 40 | A | aucun 404 |
| Porte des portes (`portee-portes`) | 14 | C | méta : mesure ce que validate-content a scanné |
| Essais rouges | 43 | C | méta : « mes portes peuvent-elles encore rougir ? » |
| Presse-papier (`copie-maths`) | 468 | B, hebdo | doublons de MathML au copier-coller ; défaut corrigé |
| Impression | 339 | B, hebdo | un rouge réel en un mois (tableau trop large de 10 px) ; coût accepté |
| Typographie française | 156 | A en contrôle de la source, rendu en B | 2 rouges réels sur 10 : réécrire en lint de la source (les scripts `typo-math.py` et `typo-figures.py` existent déjà) |
| Identifiants de figures | 0 | A | collision d'id SVG = figure cassée |
| Barème fermé | 1 | A | une copie parfaite doit valoir 20/20 |
| Source de leçon en double | 8 | B | poids de page ; régression rare |
| Manifestes du header | 13 | B | régression rare |
| LaTeX nu | 73 | A, à fusionner avec « formules » | une formule affichée en LaTeX brut |
| Liste d'accents à jour | 0 | C | méta : la sonde lit-elle ce que la réparation connaît ? |
| Accents | 146 | A en contrôle de la source, rendu en B | même logique que la typographie |
| Zoom 200 % | 157 | B, hebdo | WCAG 1.4.4 ; 0 défaut depuis le correctif |
| Formules | 126 | A, fusion avec LaTeX nu | erreurs KaTeX visibles |
| Cliquets indice-longueur, indice-absolu, indice-refus, eleve-ruse | 1 | B, devient une règle du vérificateur | les indices de forme des QCM restent un vrai risque avec Haiku ; on garde le contrôle, sans sceau ni cliquet |
| Carte des chapitres | 1 | C | numéros de chapitre scellés ; la structure v3 changera |
| Porte d'engagement | 0 | C | règle du gabarit v2 (un pari en R0) ; à réécrire dans la spec v3 si elle est gardée |
| Énoncés jumeaux | 0 | A | même question deux fois ; le dédoublonnage est vital pour le générateur |
| Artefacts du modèle apprenant à jour | 0 | A | cœur de la nouvelle direction |
| Cliquets rampe-bac et rampe-entree | 1 | C | cliquets sur la rampe v2 |
| Non-négociables migrations | 0 | A | sécurité production |
| media-manipulable | 0 | C | compteur « ne pas perdre de manipulables » |
| Constantes physiques | 0 | A | juste contre le monde |
| Champs morts | 0 | B | hygiène de développement ; utile pendant la refonte |
| Dette de manipulation | 1 | C | registre prescription/livraison des anciennes specs |
| Traçabilité spec→item | 0 | C | relie les propositions aux items ; méta |
| Couverture diagnostique | 0 | B | rapport utile au modèle apprenant ; retirer le sceau |
| resume-couverture | 1 | C | méta : « un fichier ne se déclare pas complet à tort » |
| Arithmétique rendue | 6 | A | les nombres que l'élève lit tombent juste |
| Ancres | 17 | B | régression rare |
| Données (forfait) | 48 | B, hebdo | coût réseau ; stable |
| Hygiène des identifiants de modèle | 0 | A | gratuit |

**Total du job `gates`** : A ≈ 855 s, plus environ 50 s d'installation · **B ≈ 2 156 s (69 %)** · C ≈ 60 s.

**Les autres jobs.**
- `telephone` : le balayage à 320, 360 et 390 px (269 s) est en **A**, parce que l'élève est sur
  téléphone.
- `qcm` : le verdict des QCM sur le corpus entier (1 180 s) passe en **B hebdo**, avec un **échantillon de
  6 leçons en A** (environ 100 s ; mesure : 1 180 s pour 62 leçons plus 6).
- Les **17 portes de scène et `figures-manipulables`** (job `scenes` 41 min, job `scene-champ` 40 min, et
  722 s dans `telephone`) passent en **B, filtrées par chemin**. Une scène ne tourne que si ses fichiers
  changent, et seulement en passe verte. La passe rouge ne tourne qu'à la demande et dans la passe
  hebdomadaire.

### 3.2 Les scripts hors CI

La liste complète, avec une ligne de raison par script, est en **annexe A.1**. En résumé :
- **47 en C.** Instruments sur instruments (`essai-rouge`, `essais-rouges`, `portee-portes`,
  `portee-corpus`, `portee-hors-lecon`, `resume-couverture`, `tracabilite-spec`). Campagnes uniques
  terminées (`accents-campagne`, `codemod-tokens`, `audit-round3-wf.js`, `audit-round4-wf.js`). Sondes
  ponctuelles dont le résultat est consigné (`gel-chapitre`, `gel-epreuve`, `epreuve-3g`, `lecon-3g`,
  `js-ventilation`, `trace-chargement`, `memoire`, `clic-qcm`, `cv-chapitre`, `polices`,
  `espacement-texte`, `retour-bfcache`, `score-annonce`, `tab-corrige`, `radios-clavier`,
  `recherche-navigateur`, `recherche-palette`, `katex-identite`, `veille-hydratation`, `cls-sweep`).
  Mécanismes v2 qui vont changer (`carte-chapitres`, `rampe-bac`, `rampe-entree`, `porte-engagement`,
  `pagination-probe`, `media-manipulable`, `dette-manipulable`). Doublons de gardes déjà présentes ailleurs
  (`slugs-visibles`, `renvois-visibles`). Restes du conteneur cloud (`_srv.sh`). Route temporaire
  (`wide-measure`).
- **39 en B**, à ranger dans un sous-dossier `sondes/` ou à laisser en place :
  - accessibilité : `annonce-sweep`, `noms-accessibles`, `cibles-tactiles`, `couleurs-forcees`,
    `zoom400-sweep` ;
  - réseau et performance : `temps-de-chargement`, `poids-sweep`, `gel-lecon`, `horsligne-sweep`,
    `reseau-malade`, `deploye-sweep` ;
  - captures et balayage : `shots`, `hunt` ;
  - moteurs : `trois-moteurs` ;
  - les étapes CI devenues hebdomadaires (§3.1) ;
  - et `regle-atelier.mjs`, qui implémente « LA RÈGLE » de NORTH-STAR-V2 (au plus 2 phrases visibles, aucun
    écran sans action) et qui est **la graine naturelle de la porte « page légère » de la v3**.
- **28 en A** et les 15 tests unitaires, conservés.

### 3.3 Les documents

| Verdict | Fichiers | Taille | Contenu |
|---|---|---|---|
| **GARDER, vivant** | 15 documents de travail + 85 annales + 14 cadre + 39 ADR | 8,1 Mo | VISION (à amender pour la v3), DESIGN-BIBLE (à condenser), RULES (à réécrire en une page), LOCAL-TRANSITION (à mettre à jour), README-docs ; design : TOKENS, LEARNER-MODEL-SPEC, EXAM-MODE-SPEC, BANK-SPEC, INTERACTIVE-FIGURE-SPEC, AUTH-SPEC ; grounding/architecture ; audits : DECISIONS-EN-ATTENTE (condensé), DETTE-CADRE, cadre-couverture ; `cadre/` et `sujets/` (**ce sont les entrées du générateur**) ; `decisions/` (historique en ajout seul : on le garde, mais il sort du chemin de lecture) |
| **GARDER le temps que les fils se ferment** | 22 | 720 Ko | `audits/critiques/` (13), `dette-examen/` + `DETTE-EXAMEN.md` (5), `INSTRUMENTS.md` (à réduire à une page en même temps que les scripts), NORTH-STAR-V2 (à fusionner dans la spec v3), `pipeline/production-sync-session.md` (la synchronisation production n'est toujours pas vérifiée), `engine-cutover-runbook.md` |
| **ARCHIVER** (tag git, puis suppression) | 107 | 4,2 Mo | `HANDOFF.md` (remplacé par un `ETAT.md` d'une page) ; 50 rapports datés de `audits/` ; `pipeline/` sauf les deux fichiers ci-dessus (dont les 8 propositions et le gabarit v2, qui seront remplacés par la spec v3) ; `ops/` (expériences Antigravity, NotebookLM et « build distribué » d'août) ; 13 fichiers de `design/` (anatomies v2, scorecards, briefs, dashboard v1, studio, motion-choreography si MotionStage est gelé) ; `grounding/` sauf architecture (known-issues = backlog de l'app Flutter, schema-reconciliation = exécuté, dislike-list = mai) ; `product/OUTILLAGE` et `REFONTE-STUDIO` (exécutés) ; `ROSTER.md` (remplacé) ; `archive/`, `reestablish-state*`, `content-guide.md`, `quiz-demo.html` |

Liste exhaustive en annexe A.2. Hors `docs/`, il faut aussi archiver `work-orders/` (43 fichiers). Trois
décisions reviennent au propriétaire :
- **`animations/`** : la voie Manim est dormante depuis le 14/08, avec 3 explications publiées sur 54 écrites.
  Elle peut servir les « visuels lents » de la v3, ou être gelée.
- **`content/**/REVIEW-*.md`** (67 fichiers, 92 000 mots de notes d'auteur) : à archiver avec la refonte des
  leçons.
- **`backend/seed/`** (encodeurs Dart de l'ère Flutter) : RULES §7 demande de supprimer les artefacts Flutter,
  mais c'est **adjacent à la production**. On n'y touche qu'avec supabase-architect, après la vérification
  supervisée de la synchronisation.

### 3.4 Les agents

Usage mesuré avec `git log --format=%B | grep -c <agent>` (sur tout l'historique, puis depuis le 2026-09-01).

| Agent | Mots | Mentions (total / depuis sept.) | Verdict | Raison |
|---|---|---|---|---|
| `bac-fidelity-critic` | 397 | 10 / 6 | **GARDER**, absorbe research-challenger | le seul critique qui ait une vraie grille (le cadre) ; il auditera les gabarits du générateur |
| `pedagogy-critic` | 452 | 10 / 4 | **GARDER**, rubrique v3 | |
| `calm-load-critic` | 394 | 3 / 2 | fusionner dans `ux-critic` | quatre critiques de rendu pour un seul écran, rarement lancés |
| `visual-design-critic` | 383 | 3 / 1 | fusionner dans `ux-critic` | idem |
| `ergonomics-flow-critic` | 356 | 1 / 0 | fusionner dans `ux-critic` | idem |
| `coherence-critic` | 350 | 1 / 0 | fusionner dans `ux-critic`, ou supprimer | jamais utilisé depuis septembre |
| `content-author` | 587 | 42 / 19 | remplacé par `lesson-author` (v3) | |
| `item-author` | 467 | 22 / 7 | remplacé par générateur + vérificateur (volume) ; les checkpoints passent à `lesson-author` | |
| `diagram-author` | 684 | 27 / 1 | fusionner dans `visual-author` | |
| `motion-author` | 1 075 | 10 / 0 | fusionner dans `visual-author` | voie Manim : décision du propriétaire |
| `interactive-author` | 523 | 9 / 0 | **SUPPRIMER** | « embarquer GeoGebra/Desmos/PhET, ne pas reconstruire » : le dépôt a fait l'inverse (17 scènes maison, 4 embeds PhET) |
| `pedagogy-architect` | 1 417 | 37 / 12 | remplacé par `notion-designer` (v3) | |
| `research-lead` | 560 | 17 / 15 | **GARDER** | sourcing des annales et du cadre : la vérité du générateur |
| `research-challenger` | 436 | 7 / 2 | fusionner dans `bac-fidelity-critic` | |
| `frontend-builder` | 406 | 9 / 1 | **GARDER**, avec Bash pour build et tests | un constructeur qui ne peut pas lancer `npm run build` ne peut pas vérifier son travail |
| `supabase-architect` | 637 | 12 / 1 | **GARDER tel quel** (sécurité), alias de modèle | |
| `pr-reviewer` | 445 | 4 / 0 | **GARDER** (sécurité) | jamais lancé : la prochaine poussée en production sera son premier passage |

---

## 4. Règles écrites pour des modèles plus anciens, ou qui encodent du rituel

Le critère suivi est celui du guide d'audit de prompts d'Anthropic. On supprime ce qui compense un
défaut du modèle d'alors, ou qui raconte l'incident au lieu de dire la règle. On garde le contexte, les
contraintes réelles et les interdictions qui protègent encore contre un échec qui se reproduit aujourd'hui.

| Emplacement | Règle ou pratique | Ce qu'elle compensait | Proposition |
|---|---|---|---|
| `.claude/CLAUDE.md:60-182` | Résumé de 11 ADR de méthode (1 482 mots, 58 % du fichier, chargés à chaque session) | les leçons de sessions où le modèle croyait vert ce qui était rouge, sous forme de récits d'incidents (« douze fois en un jour la mesure était fausse… ») | réduire à 3 principes dans RULES.md (§6, règles 12 à 14) et laisser un lien vers `docs/decisions/` |
| `.claude/CLAUDE.md:41` contre `:255` | « [STATUS: roster under revision…] » à côté de « The agent roster — RESOLVED » | — | contradiction : supprimer la ligne 41 |
| `.claude/CLAUDE.md:241-270` | « Open decisions (resolve before resuming build) », dont 3 sur 5 marquées RESOLVED | — | fossile : ne garder que la synchronisation production et la voie média |
| `docs/Rules/RULES.md:156-184` (§5) | « 5-family budgets (Fable 5, Opus 5, Sonnet 5…) » ; « des specs assez détaillées pour que Sonnet 5 exécute fidèlement au lieu de deviner » | un exécutant plus faible que le concepteur, d'où la séparation « Opus pense, Sonnet exécute » et des specs-contrats énormes | des noms de modèle épinglés vieillissent sans prévenir : décrire des rôles (« jugement », « volume », « génération en lot ») et mettre les modèles dans un seul tableau |
| `RULES.md:150`, `:277-278`, `:302` | « not yet decided », « roster forthcoming », « Status summary: Not yet decided… the exact agent roster » | — | contredit par §5 (« RESOLVED ») : supprimer |
| `RULES.md:279-286` et `README.md (supprimé le 2026-10-22):16-42` | protocole de brief : « ne jamais redire les docs », « Do not commit — le dispatcher vérifie, mesure et commite », test de portabilité sur une session froide | conçu pour des sessions froides de modèle standard (test du Day 7) | le principe utile tient en une ligne : « un brief nomme son critère d'acceptation vérifiable ». Le reste est à archiver |
| `RULES.md:287-292` | « The QA loop has three legs, none optional », dont un audit externe périodique | des instruments qui ne voyaient que ce qu'on leur demandait | garder l'idée, remplacer le rituel : passe hebdomadaire plus regard du propriétaire sur le site |
| `.claude/agents/*.md`, `model:` | 10 × `claude-opus-5`, 7 × `claude-sonnet-5` | — | génération précédente (les identifiants courants sont `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`) : utiliser les alias `opus` / `sonnet` / `haiku` / `inherit` |
| les 17 agents, dernière ligne | « Status: v0.1. Provisional; refine against the first notion » | — | fossile : 62 notions plus tard. Supprimer |
| `content-author.md:14`, `item-author.md:14`, `frontend-builder.md:14` | « no Bash by design — you physically cannot, and should not try to route around it » | méfiance envers un agent qui pourrait toucher la production | la sécurité vient du portail humain et de l'absence d'identifiants, pas du retrait de Bash. Un constructeur sans build contredit la skill `verification`. Donner Bash ; garder l'interdiction de déployer |
| `content-author.md:17`, `item-author.md:17`, `pedagogy-architect.md:56` | entrée : `content/<subject>/<notion>/spec.md` | — | le dépôt dit autre chose : 2 `spec.md` sur 62 ; les vraies specs vivent dans `docs/pipeline/propositions/` et `content/*/*/spec-*.md` |
| `pedagogy-architect.md:64` contre `motion-author.md` | « type: motion → tool: manim » ; motion-author : « in-product motion = MotionStage, pas Manim » (ADR 0022) | — | deux fichiers d'instructions se contredisent |
| `interactive-author.md:8` | « embeds of mature tools… don't rebuild » | — | contredit par ADR 0041 et les 17 scènes : supprimer l'agent |
| `.claude/agents/*-critic.md` (6), `ROSTER.md:320-350` | vague 1 puis vague 2 ; « explicit adversary » ; ordre d'arbitrage entre critiques | des critiques uniques qui rataient des choses ; une recherche de couverture par multiplication des juges | 2 critiques de contenu (cadre, pédagogie) et 1 critique de rendu, appelés à la demande ; 4 critiques sur 6 n'ont presque jamais servi (§3.4) |
| `docs/pipeline/propositions/*` | une spec par manipulable, revue en vague 1, 1bis, 2… (59 242 mots pour une scène) | specs-contrats pour un exécutant qu'on ne croyait pas capable de juger | spec v3 courte (chaîne de concepts, étapes, gabarits d'exercices) ; les détails vivent dans le code et ses tests |
| `NOTION-TEMPLATE-V2.md` (18 cases) et §« Critic protocol » | « one verdict + citation per box », « 100 % reasoning annotation » | une rubrique transformée en arithmétique, pour forcer un critique à tout regarder | garder ce que le code peut vérifier, donner le reste au jugement du critique (rubrique en prose) |
| `SUMMIT-CONVERSION-RECIPE.md:100` et `indice-*.mjs` + sceaux | règles anti-indices des options (longueur, absolus, refus), avec sceaux et cliquets | des items écrits par LLM où « la plus longue = la bonne » (≈ 97 % en philo, historiquement) | **le risque existe toujours avec Haiku** : en faire des règles déterministes du vérificateur, appliquées à chaque item généré ; supprimer sceaux, cliquets et prose |
| ADR 0034–0040, `essais-rouges`, `scripts/campagnes/` | chaque porte prouvée rouge, rejouée à chaque commit, et 44 à 87 sabotages par porte de scène | une période où le modèle annonçait « batterie locale verte » sans l'avoir lancée (en-tête de `batterie-locale.mjs`, §11.81) | ce défaut était une faute de compte rendu, pas une faiblesse des portes. Le remède est une CI qui tourne, et une seule règle : « une porte neuve se voit rouge une fois » |
| `.claude/skills/verification/SKILL.md:10-11,54,87` | `cd /home/user/BAC/web`, « 253 contrôles au 2026-09-05 », « ~15 min » | — | chemins du conteneur cloud, invalides en local ; chiffres périmés (dom-truth prend 232 s en CI) |
| `verification/SKILL.md:85` | « Swap de modèle : re-lancer dom-truth + une passe gestalt AVANT tout travail nouveau » | la variabilité entre modèles | la CI le fait à chaque poussée : supprimer |
| `.claude/skills/design-bible/SKILL.md:8-12` | « Mode audit D'ABORD… feuille de charge… PUIS produire » | un mode d'échec du sprint de juillet | chorégraphie imposée pour une tâche de jugement : garder les règles négatives, retirer le script |
| `.claude/skills/figure-authoring/SKILL.md:14-40` | règles accompagnées de récits datés (« Prouvé le 2026-09-03 — neuf figures… ») | — | garder la règle, retirer l'archéologie |
| `DECISIONS-EN-ATTENTE.md (supprimé le 2026-10-22)` (41 sections) | « N questions tranchées par défaut » pour chaque scène (de 8 à 16) | un agent qui ne s'autorisait pas à trancher, alors il documentait chaque défaut | une file d'au plus 10 questions ouvertes, chacune avec son défaut ; le reste est tranché et vit dans le code |

**À garder absolument** : les non-négociables de production (`CLAUDE.md:204-228`, `RULES.md` §3), le
principe « deux sortes de travail » (`RULES.md` §0), le rôle du propriétaire comme rédacteur en chef et
non comme relecteur de code (`RULES.md` §1), l'« état honnête » (DESIGN-BIBLE), la frontière du cadre
(bac-fidelity), et le contexte élève de la VISION. Ce n'est pas de la compensation pour un modèle faible :
c'est le métier.

---

## 5. Bugs et dette rencontrés en passant

1. **`scripts/verif-commit.sh` rougit sur une machine neuve.** Il crée un lien symbolique `web/node_modules`.
   `.gitignore:29` porte `node_modules/`, un motif qui ne vise que les dossiers ; un lien symbolique est un
   fichier pour git, donc il apparaît non suivi. La batterie sort alors **ROUGE à « fichiers non suivis »**.
   Le conteneur cloud masquait le problème avec `.git/info/exclude` (local, non versionné). Reproduit dans le
   clone d'audit : `git status --short` → `?? web/node_modules`. Correctif : `node_modules` sans barre finale
   dans `.gitignore`.
2. **Les 21 avertissements de `validate-content`**
   (`node web/scripts/validate-content.mjs $(ls -d content/*/*/ | sed 's#/$##') --strict 2>&1 | grep "⚠"`,
   12 s, 0 échec) :
   - 6 étiquettes de barreau sans titre : `derivabilite-etude-fonctions` R6 (items et checkpoints),
     `limites-continuite` R7 (items) et R-bac (checkpoints), `probabilites-conditionnelles` R6 et R7 ;
   - **7 figures que rien ne place** : `geometrie-espace/explication-bk-2019-n-x1.svg`,
     `limites-continuite/cubique-trois-racines.svg`, `nombres-complexes-2/rotation-complexe.svg`,
     `dipole-rl/oscillogramme-exercice.svg`, `rc-charge/exo-oscillogramme.svg`,
     `rlc-serie/energy-exchange.svg` et `rlc-serie/loi-mailles-build.svg` ;
   - 2 SVG `rlc-serie` à l'ancien mécanisme `step-N` sans sidecar ;
   - 2 sommets non sourcés : `atome-mecanique-newton` r-bac et `rlc-serie` r8-bac ;
   - `[[video:balancement]]` ne rend **rien** ;
   - **2 chapitres de `structures-algebriques` sans code de barreau** (« Sous-groupe », 97 lignes ; « Anneau
     intègre », 79 lignes) : **invisibles au modèle apprenant**.
3. **Une route morte, `/options/wide/[v]`.** C'est un outil de décision du Day 8 (juillet), marqué « TEMPORARY —
   deleted after the owner's picks ». La décision n'a jamais été prise (DECISIONS §8). La route fait vivre
   `MarginNotes.tsx` et `KeyFormulaRail.tsx` (165 lignes, sans autre usage), `wide-measure.mjs`, et des
   entrées dans `header-manifestes.mjs:84` et `hunt.mjs:58`.
4. **`/atelier` est un prototype NORTH-STAR-V2** (noindex) **accessible depuis ⌘K**
   (`CommandPalette.tsx:225`) et balayé par 5 portes (dom-truth, etroit-sweep, liens-internes,
   header-manifestes, annonce-sweep). Le propriétaire doit dire s'il est la graine de la v3 ou s'il faut le
   retirer.
5. **1 629 `correct_feedback` écrits et jamais affichés** (DECISIONS §9). C'est un champ mort à trancher : on
   l'affiche, ou on arrête d'en générer. **C'est à décider avant de lancer le générateur.**
6. **9 collisions d'identifiants d'items connues entre notions** (sortie de validate-content, « 9 connue(s),
   §11.178 »). Le générateur a besoin d'un espace d'id global (`notion::id`) dès le départ.
7. **Le garde d'orphelins de la batterie ne voit que les `.mjs`** : `_srv.sh`, `audit-round3-wf.js` et
   `audit-round4-wf.js` lui échappent.
8. **La CI annule la moitié de ses runs** (38 sur 76) et pousse à marquer `[skip ci]` 1 commit sur 5 : c'est
   le signe direct qu'elle est trop lente.
9. **Les ADR 0001, 0002, 0014 et 0015 n'existent pas** (trous dans la numérotation) : mineur, mais
   l'ADR 0042 devrait le mentionner.
10. **La porte d'hygiène des identifiants de modèle** (`gates.yml:912-919`) interdit `claude-(opus|sonnet|fable|haiku)`
    dans `content/`, `docs/sujets/`, `web/src/` et `animations/`. **Le code et les prompts du générateur
    doivent donc vivre ailleurs** (`pipeline/` ou `web/scripts/generation/`), sinon la CI rougira.
11. Pour le §8 : `INSTRUMENTS.md` est lu par `batterie-locale.mjs` (garde d'orphelins), et
    `lectures-graphiques.mjs` comme `anatomie-notion.mjs` lisent des fichiers de `docs/audits/`. Les
    supprimer dans le mauvais ordre fait rougir la batterie.

---

## 6. Proposition : le jeu de règles minimal (une page, remplace RULES.md et le résumé d'ADR de CLAUDE.md)

> **Sécurité production — inchangée, non négociable**
> 1. Aucune poussée en production sans décision explicite du propriétaire. Aucun agent ne pousse sur `main`.
> 2. Aucune poussée en production sans `scripts/branch-test.ps1` vert contre staging.
> 3. Chaque migration porte un bloc de vérification qui affirme la cardinalité après coup, et l'identité
>    du contenu pour une migration de contenu.
> 4. RLS activée dans la migration qui crée la table ; les RPC d'écriture d'état utilisateur sont réservées
>    à `service_role`.
> 5. Aucun changement de production hors fichier de migration ; l'éditeur SQL du tableau de bord sert à lire.
> 6. Une migration passée en production ne se modifie jamais : on en écrit une nouvelle.
> 7. Tant que la synchronisation production n'a pas été vérifiée en séance supervisée, aucune migration ne
>    part (048 à 051 attendent).
>
> **Produit**
> 8. La VISION tranche. L'écran ne montre que du vrai : pas de progrès fabriqué, pas de faux état.
> 9. Le cœur d'apprentissage est calme : une idée par écran, les visuels avancent au rythme de l'élève
>    (au clic), sans théâtre d'engagement, et `prefers-reduced-motion` est respecté.
> 10. Les maths sont du texte vivant (KaTeX) ; le français est juste (accents, typographie) ; l'arabe
>     s'affiche dans le bon sens.
> 11. Rien hors programme : le cadre (`docs/cadre/`) borne chaque leçon et chaque exercice.
>
> **Vérité**
> 12. « Fait » veut dire que la CI rapide est verte sur le commit poussé. Ce qui n'a pas été vérifié se dit
>     « non vérifié ».
> 13. Une porte neuve doit avoir été vue rouge une fois, sur un défaut réel ou provoqué, avant d'être crue.
>     On ne la re-prouve pas à chaque commit.
> 14. Une porte qui ne protège pas l'élève, ou qui n'a rien attrapé en trois mois, passe en hebdomadaire ou
>     disparaît. Pas de sceau ni de cliquet sans propriétaire nommé.
>
> **Exercices générés**
> 15. Aucun item généré n'entre dans `content/` sans passer le vérificateur : schéma, recalcul numérique ou
>     symbolique, doublons, indices de forme (longueur, absolus, refus), périmètre du cadre, rendu KaTeX.
> 16. Un échantillon aléatoire de chaque lot est relu (par un juge Opus, puis par le propriétaire), et le
>     taux de rejet est noté dans le lot.
> 17. Le générateur ne modifie jamais le cadre, les misconceptions déclarées ni les annales sources.
>
> **Travail**
> 18. L'état courant tient dans `ETAT.md` (fichier à créer dans `docs/`) : une page, qu'on réécrit au lieu de l'allonger. L'histoire,
>     c'est git.
> 19. Une décision durable fait un ADR court (une page au plus, avec sa section « Retractions and
>     Corrections »). Pas de journal de session dans un ADR.
> 20. Les questions au propriétaire tiennent dans un seul fichier : au plus dix ouvertes, chacune avec un
>     défaut et la façon de le défaire.

CLAUDE.md devient un index d'environ 60 lignes : ce que fait le projet (3 lignes), la pile (4), les règles
1 à 7 recopiées (parce qu'elles doivent être lues à chaque session), et des liens vers VISION, RULES, ETAT,
le cadre et la CI.

---

## 7. Proposition : le roster pour la nouvelle direction

### 7.1 Les rôles

| Rôle | Forme | Modèle | Entrée → sortie | Ne fait pas |
|---|---|---|---|---|
| **orchestrateur** | session principale | Opus 5.5 (`claude-opus-5-5`) | planifie, route, tient les deux portails, commite | ne pousse pas en production |
| **notion-designer** (neuf, remplace pedagogy-architect) | sous-agent | `opus` | cadre + annales + misconceptions → **spec v3 courte** : chaîne de concepts, étapes visuelles lentes, **gabarits d'exercices paramétrés** (compétence, habileté, paramètres admissibles, distracteurs → misconceptions) | ni prose finale ni items en volume |
| **lesson-author** (remplace content-author) | sous-agent | `sonnet` | spec v3 → `lesson.md` léger + checkpoints | n'invente pas le périmètre |
| **visual-author** (fusion de diagram, motion et interactive) | sous-agent | `sonnet` | appels de visuels → SVG en étapes, MotionStage, descripteurs de scène existants | une **nouvelle** scène relève d'une décision du propriétaire |
| **exercise-generator** (neuf) | **programme** (API Batch, sorties structurées) | **Haiku 5.5** (`claude-haiku-5-5`) | gabarit + extrait du cadre + misconceptions → N items JSON (énoncé, réponse, solution, distracteurs étiquetés, habileté, difficulté, gabarit d'origine) | n'écrit jamais dans `content/` sans le vérificateur |
| **exercise-verifier** (neuf) | **programme déterministe** + juge LLM | code (SymPy ou numérique, schéma, doublons, lint d'indices repris de `indice-*`, `enonces-jumeaux`, `calculs-numeriques`, `arithmetique-rendue`, `constantes-physiques`) ; `sonnet` sur les cas que le code ne tranche pas ; `opus` sur un échantillon de 2 à 5 % | items → accepté / rejeté + raison + taux par lot | ne « corrige » pas un item : il le rejette, avec sa raison, vers le générateur |
| **tutor-diagnostician** (neuf) | sous-agent (conception) + code (exécution) | `opus` | items vérifiés + événements élève → calibration item→misconception, estimation de maîtrise, choix de l'item suivant, **épreuves de bac personnalisées** (poids du cadre + EXAM-MODE-SPEC) | ne touche pas la production : les migrations passent par supabase-architect |
| **bac-fidelity-critic** (absorbe research-challenger) | sous-agent | `opus` | spec, leçon, gabarits → constats cités contre le cadre | |
| **pedagogy-critic** | sous-agent | `opus` | leçon v3 → constats (profondeur conceptuelle, rythme) | |
| **ux-critic** (fusion des 4 critiques de rendu) | sous-agent | `sonnet` | captures du rendu → calme, ergonomie, cohérence | |
| **research-lead** | sous-agent | `opus` | sources officielles → cadre et annales transcrites | |
| **frontend-builder** | sous-agent, **avec Bash** pour build et tests | `sonnet` | composants v3 | pas de déploiement |
| **supabase-architect** + **pr-reviewer** | sous-agents (inchangés) | `opus` | migrations, synchronisation, branch-test | |

Résultat : **11 fichiers d'agent** au lieu de 17, plus 2 programmes de pipeline dont les prompts vivent
dans le code (hors des surfaces surveillées par la porte d'hygiène des identifiants de modèle). On écrit des
alias (`opus` / `sonnet` / `haiku` / `inherit`) plutôt que des identifiants datés, et environ 200 mots
par agent : rôle, entrées, sorties, ce qu'il ne fait pas, et pourquoi.

### 7.2 Le flux

```
cadre + annales ──► notion-designer ──► spec v3 (gabarits) ──► bac-fidelity-critic
                                         │                         │ (ok)
                                         ▼                         ▼
                              lesson-author + visual-author   exercise-generator (Haiku, lot)
                                         │                         │
                                         ▼                         ▼
                                  pedagogy-critic,           exercise-verifier
                                  ux-critic (rendu)          (code → Sonnet → échantillon Opus)
                                         │                         │ items acceptés
                                         └────────► content/ ◄─────┘
                                                        │
                                                        ▼
                                  tutor-diagnostician → modèle apprenant → épreuves personnalisées
```

### 7.3 Ordre de grandeur du coût de génération

Tarifs de la table du skill `claude-api`, mise en cache le 2026-10-06 ; à re-vérifier avant tout budget.
Haiku 5.5 coûte 0,10 $ en entrée et 0,50 $ en sortie par million de jetons (prompts ≤ 100 K) ; Sonnet 5.5,
2 $ / 10 $ ; Opus 5.5, 4 $ / 20 $ ; l'API Batch coûte 50 % de moins.

Hypothèse : 62 notions × 300 items, soit **18 600 items** ; un appel produit 10 items à partir de 4 K jetons
d'entrée (mis en cache) et donne environ 7 K jetons de sortie.

- **Génération Haiku** : 7,4 M jetons en entrée et 13 M en sortie, soit **≈ 7 $, ≈ 3,5 $ en Batch**.
- **Juge Sonnet sur 30 % des items** : ≈ 50 $, ≈ 25 $ en Batch.
- **Audit Opus sur 2 %** : ≈ 13 $.

**Moins de 50 $ par passe complète du corpus.** Ce qui coûte, c'est la vérification, et surtout l'attention
humaine sur l'échantillon. **Il faut donc construire le vérificateur avant le générateur.**

---

## 8. Plan de suppression sûr

**Prérequis.**
- La CI est verte sur la tête. Le run 824 est vert sur `34345bf5` ; `816ddc5b` est un commit de docs
  `[skip ci]`.
- Quatre décisions du propriétaire peuvent attendre, parce que le plan laisse leurs objets en place : le
  sort des 17 scènes, la voie Manim, `/atelier`, et `backend/seed/`.
- Rien de ce qui suit ne touche `backend/supabase/migrations/` ni `main`.

**Étape 0 — archiver, sans rien supprimer.**
```bash
git switch claude/vibrant-fermi-v1lxj5 && git pull --ff-only
git tag -a archive/avant-refonte-2026-10 -m "Outillage, docs et agents complets avant l'allègement (audit 03)"
git push origin archive/avant-refonte-2026-10
git branch archive/outillage-2026 && git push origin archive/outillage-2026   # facultatif : lisible sur GitHub
git ls-remote --tags origin | grep avant-refonte                              # preuve que le tag est sur le serveur
```
Tout ce qui sera supprimé ensuite se retrouve par `git show archive/avant-refonte-2026-10:<chemin>`.

**Étape 1 — un commit « CI : voie rapide + hebdomadaire ». Rien n'est supprimé.**
- `gates.yml` passe à trois jobs :
  - **`rapide`** (sans navigateur) : tests, validate-content, contrôles numériques, migrations, tokens,
    liens-fichiers, hygiène des identifiants de modèle ;
  - **`rendu`** : build, dom-truth, liens internes, formules, LaTeX nu, figures en clair et en sombre,
    marges, hydratation ;
  - **`telephone`** : build, largeur téléphone, verdict des QCM sur 6 leçons.
- Les scènes passent par un petit script, `scenes-touchees.mjs` : il lit le diff contre la base de la PR et
  lance la passe **verte** de la seule scène concernée. Pas d'action tierce.
- Un nouveau **`hebdo.yml`** (`schedule` hebdomadaire + `workflow_dispatch`) porte toutes les étapes B et
  les passes rouges des scènes.
- `batterie-locale.mjs` lit la même liste que `rapide`, dans un seul tableau, et perd ses trois gardes sur
  elle-même.
- **À relancer** : `scripts/verif-commit.sh` doit finir sur exit 0 (après le correctif `.gitignore` du §5.1).
  La CI de la PR doit être verte. Puis **`hebdo.yml` lancé à la main et vert** : c'est la preuve que rien n'a
  été perdu en route.

**Étape 2 — un commit « scripts : archiver 47 instruments ».**
- `git rm` des 47 scripts de classe C (annexe A.1), des 9 `.base.json`, de `essais-rouges.manifeste.json` et
  de `scripts/campagnes/` ; retrait de leurs entrées dans `web/package.json`.
- Réécrire `INSTRUMENTS.md` en une page : une ligne par porte restante, ce qu'elle mesure, ce qu'elle ne mesure
  pas.
- **À relancer** :
  - `cd web && node scripts/liens-fichiers.mjs --porte` : la porte rougit sur **chaque renvoi devenu mort**
    dans un document vivant. On corrige le renvoi, ou on archive le document dans le même commit.
  - `node scripts/batterie-locale.mjs`, puis `npm run build && npm run dom-truth`.
  - Ne pas se contenter de `node --check` : il prouve qu'un fichier se lit, pas qu'il tourne.

**Étape 3 — un commit « docs : archiver 107 fichiers ».**
- `git rm` de la liste de l'annexe A.2 et de `work-orders/`.
- `HANDOFF.md` est remplacé par `ETAT.md` (fichier à créer dans `docs/`) (une page : ce qui marche, les fils ouverts, la prochaine
  étape de chacun).
- `DECISIONS-EN-ATTENTE.md` est condensé aux questions ouvertes ; `README-docs.md` et
  `LOCAL-TRANSITION.md` §2 sont réécrits (nouvelle CI, nouvelle batterie).
- **À relancer** : `liens-fichiers --porte` (corriger chaque renvoi signalé), la batterie, la CI.

**Étape 4 — un commit « agents, règles, CLAUDE.md ».**
- Créer les nouveaux agents (§7) et supprimer les anciens ; passer `model:` en alias.
- Remplacer RULES.md par le §6 ; ramener CLAUDE.md à environ 60 lignes.
- Skill `verification` : retirer `/home/user/BAC` et les chiffres datés ; skill `design-bible` : retirer la
  chorégraphie.
- Écrire **l'ADR 0042 « Allègement »** : il déclare les ADR 0031–0040 historiques, leurs principes étant
  repris dans les règles 12 à 14, et il contient une section « Retractions and Corrections ».
- **À relancer** : `liens-fichiers` et l'étape d'hygiène des identifiants de modèle. Puis un **test de lecture
  à froid** : une session neuve doit, sans autre aide, énoncer les règles de sécurité et la commande d'avant
  poussée.

**Étape 5 — un commit « dette en passant ».**
- `.gitignore` : `node_modules` sans barre finale.
- Supprimer `/options/wide/[v]`, `MarginNotes.tsx` et `KeyFormulaRail.tsx`, et les entrées correspondantes
  dans `header-manifestes.mjs` et `hunt.mjs`.
- Selon la décision du propriétaire, retirer `/atelier` de ⌘K.
- Traiter les 21 avertissements de validate-content.
- **À relancer** : `npm run build`, `npm run dom-truth`, `node scripts/liens-internes.mjs --porte`, puis la CI
  complète et `hebdo.yml`.

**Règle de retour en arrière.** Une étape qui ne revient pas verte se défait par `git revert <commit>`.
L'étape 0 garantit que rien n'est perdu. Le propriétaire reste seul à décider du jour où cette branche
deviendra `main`, avec les non-négociables qui vont avec (branch-test, synchronisation vérifiée, décision
explicite).

---

## Annexe A.1 — Les 146 scripts de `web/scripts/`, un par ligne

Légende : **CI** = atteint par `gates.yml` · **bat** = batterie locale · **—** = rien ne le lance ·
classes A, B ou C comme au §3.

| Script | Lignes | Lancé par | Classe | Raison |
|---|---|---|---|---|
| `_srv.sh` | 41 | — | C | aide propre au conteneur cloud (`/proc/comm`) ; remplacé par `serveur-frais` et `pw` |
| `accents-campagne.mjs` | 275 | — | C | campagne de réparation unique, terminée |
| `accents-manquants.mjs` | 240 | CI | B | défaut visible ; à réécrire en contrôle de la source, rendu en hebdo |
| `anatomie-notion.mjs` | 108 | — | C | rapport ponctuel pour le propriétaire (2026-09-20) |
| `ancres-uniques.mjs` | 151 | CI | B | liens profonds ; régression rare |
| `annonce-sweep.mjs` | 193 | — | B | sonde lecteur d'écran, à la demande |
| `arithmetique-rendue.mjs` | 214 | CI, bat | A | les nombres lus tombent juste ; graine du vérificateur |
| `audit-round3-wf.js` | 241 | — | C | script de workflow d'audit de juin, ponctuel |
| `audit-round4-wf.js` | 246 | — | C | idem |
| `bareme-ferme.mjs` | 156 | CI, bat | A | copie parfaite = 20/20 |
| `batterie-locale.mjs` | 518 | npm | A, à réécrire | garder le geste ; une seule liste, sans gardes sur elle-même |
| `build-learner-inputs.mjs` | 279 | CI, bat | A | entrées du modèle apprenant |
| `calculs-numeriques.mjs` | 181 | CI, bat | A | égalités numériques ; vérificateur |
| `carte-chapitres.mjs` | 161 | CI, bat | C | numéros de chapitre scellés (sceau de 32 Ko) ; la v3 change la structure |
| `champs-morts.mjs` | 134 | CI, bat | B | hygiène de développement, à la demande pendant la refonte |
| `cibles-tactiles.mjs` | 44 | — | B | sonde d'accessibilité |
| `clic-qcm.mjs` | 68 | — | C | mesure ponctuelle (mémoïsation de MathText), faite |
| `cls-sweep.mjs` | 71 | — | C | couvert par `temps-de-chargement` |
| `codemod-tokens.mjs` | 134 | — | C | codemod ponctuel (Phase A), fait |
| `components-shots.mjs` | 71 | — | C | harnais d'images de juin |
| `constantes-physiques.mjs` | 197 | CI, bat | A | constantes justes contre le monde |
| `contrast-gate.mjs` | 123 | bat, dom-truth | A | contraste des jetons |
| `copie-maths.mjs` | 280 | CI | B | presse-papier ; défaut corrigé ; hebdo |
| `couleurs-forcees.mjs` | 42 | — | B | sonde d'accessibilité |
| `couverture-diagnostique.mjs` | 211 | CI, bat | B | rapport pour le modèle apprenant ; retirer le sceau |
| `cv-chapitre.mjs` | 64 | — | C | expérience ; levier retiré |
| `deploye-sweep.mjs` | 421 | — | B | mesurer l'artefact déployé, à la demande |
| `desaccords-hydratation.mjs` | 178 | CI | A | page morte ; à fusionner dans dom-truth |
| `dette-manipulable.mjs` | 203 | CI, bat | C | registre de l'ancienne prescription des specs |
| `dollars-apparies.mjs` | 89 | CI, bat | A, à fusionner dans validate-content | un `$` orphelin = du LaTeX brut |
| `dom-truth.mjs` | 4 713 | CI | A, à amincir | la vérité rendue |
| `donnees-sweep.mjs` | 440 | CI | B | coût réseau ; hebdo |
| `eleve-ruse.mjs` | 355 | CI, bat | B, devient règle du vérificateur | union des ficelles de QCM, sans sceau |
| `enonces-jumeaux.mjs` | 202 | CI, bat | A | doublons ; vital pour le générateur |
| `epreuve-3g.mjs` | 67 | — | C | mesure ponctuelle faite |
| `espacement-texte.mjs` | 54 | — | C | 0 défaut, ponctuel |
| `essai-rouge.mjs` | 202 | via essais-rouges | C | instrument sur instruments |
| `essais-rouges.mjs` | 115 | CI, bat | C | idem ; 74 s sur les 123 de la batterie |
| `etroit-sweep.mjs` | 241 | CI | A | débord à 320–390 px |
| `figure-preview.mjs` | 1 440 | CI | A | porte des figures, clair et sombre |
| `figures-id-divergents.mjs` | 149 | CI, bat | A | collisions d'id SVG |
| `figures-manipulables.mjs` | 321 | CI | B | filtré par chemin |
| `figures-trois-moteurs.mjs` | 175 | — | C | Firefox et WebKit, jamais lancé |
| `formules-rendues.mjs` | 209 | CI | A, fusion avec latex-nu | erreurs KaTeX |
| `gel-chapitre.mjs` | 134 | — | C | mesure ponctuelle faite |
| `gel-epreuve.mjs` | 66 | — | C | idem |
| `gel-lecon.mjs` | 105 | — | B | garder une sonde de réactivité |
| `generate-tokens.mjs` | 135 | prebuild, bat | A | source unique du design |
| `glyphes-confondus.mjs` | 293 | CI | B | police ; hebdo |
| `header-manifestes.mjs` | 222 | CI | B | hebdo ; retirer `/options/wide` |
| `horsligne-sweep.mjs` | 211 | — | B | sonde réseau |
| `hunt.mjs` | 265 | — | B | balayage adversarial à la demande |
| `impression.mjs` | 214 | CI | B | papier ; hebdo |
| `indice-absolu.mjs` | 384 | CI, bat | B, devient règle du vérificateur | sans sceau |
| `indice-longueur.mjs` | 408 | CI, bat | B, devient règle du vérificateur | sans sceau |
| `indice-refus.mjs` | 352 | CI, bat | B, devient règle du vérificateur | sans sceau |
| `item-stats.mjs` | 251 | npm | B | position et longueur des clés ; à fusionner dans le vérificateur |
| `js-ventilation.mjs` | 54 | — | C | mesure ponctuelle |
| `katex-identite.mjs` | 105 | — | C | preuve ponctuelle (rehypeKatexHtml) |
| `latex-nu.mjs` | 184 | CI | A, fusion avec formules | LaTeX brut visible |
| `lecon-3g.mjs` | 60 | — | C | ponctuel |
| `lectures-graphiques.mjs` | 246 | CI, bat | C | régénère un inventaire documentaire (K-8) |
| `liens-fichiers.mjs` | 207 | CI, bat | A, temporaire | filet des suppressions |
| `liens-internes.mjs` | 142 | CI | A | aucun 404 |
| `marge-etiquettes.mjs` | 167 | CI | A | étiquettes coupées |
| `media-manipulable.mjs` | 168 | CI, bat | C | cliquet de comptage |
| `memoire.mjs` | 112 | — | C | ponctuel (aucune fuite) |
| `mouvement-reduit.mjs` | 235 | CI | B | hebdo |
| `noms-accessibles.mjs` | 37 | — | B | sonde d'accessibilité |
| `pagination-probe.mjs` | 247 | — | C | pagination de la Lesson v2 |
| `poids-sweep.mjs` | 230 | — | B | sonde de poids |
| `polices-de-repli.mjs` | 140 | lib de glyphes | B | va avec `glyphes-confondus` |
| `polices.mjs` | 40 | — | C | ponctuel |
| `porte-engagement.mjs` | 106 | CI, bat | C | règle du gabarit v2 |
| `portee-corpus.mjs` | 143 | — | C | mesure de portée (méta) |
| `portee-hors-lecon.mjs` | 122 | — | C | idem |
| `portee-portes.mjs` | 108 | CI, bat | C | porte des portes (méta) |
| `portes-migrations.mjs` | 117 | CI, bat | A | non-négociables migrations |
| `preferences-secours.mjs` | 302 | CI | B | hebdo |
| `prose-jumelle.mjs` | 225 | CI, bat | B | hygiène éditoriale |
| `pw.mjs` | 54 | npm | A | Chromium local |
| `radios-clavier.mjs` | 35 | — | C | ponctuel |
| `rampe-bac.mjs` | 178 | CI, bat | C | cliquet sur la rampe v2 |
| `rampe-entree.mjs` | 146 | CI, bat | C | idem |
| `recherche-navigateur.mjs` | 68 | — | C | ponctuel |
| `recherche-palette.mjs` | 46 | — | C | ponctuel |
| `regle-atelier.mjs` | 138 | — | B | graine de la porte « page légère » v3 |
| `renvois-visibles.mjs` | 105 | — | C | classe gardée ailleurs |
| `reseau-malade.mjs` | 386 | — | B | sonde réseau |
| `resume-couverture.mjs` | 226 | CI, bat | C | méta (`coverage_summary` auto-déclaré) |
| `retour-bfcache.mjs` | 56 | — | C | ponctuel |
| `routes-examens.mjs` | 36 | CI, bat | A | bibliothèque : la liste des épreuves |
| `scene-*.mjs` (17 : orbite, sphere, vectoriel, revolution, manege, lorentz, cuve, corde, noyaux, diffraction, tremplin, modulation, electrolyse, plan-complexe, plan-complexe-rapport, quotient, champ-pentes) | 14 749 | CI (3 jobs) | B | filtrées par chemin ; passe verte en PR, rouge à la demande et en hebdo |
| `scene-ergonomie.mjs` | 116 | — | B | la famille « ergonomie », lancée seule |
| `score-annonce.mjs` | 26 | — | C | ponctuel |
| `serveur-frais.mjs` | 93 | bibliothèque | A | utilisé par 3 portes |
| `shots.mjs` | 319 | — | B | captures (skill verification) |
| `site-shots.mjs` | 140 | — | C | harnais de juillet |
| `slugs-visibles.mjs` | 67 | — | C | classe gardée dans dom-truth |
| `source-en-double.mjs` | 190 | CI | B | hebdo |
| `stockage-refuse.mjs` | 209 | CI | B | hebdo |
| `syntaxe-vieux-moteurs.mjs` | 152 | CI, bat | A | iOS 15 |
| `tab-corrige.mjs` | 28 | — | C | ponctuel |
| `temps-de-chargement.mjs` | 205 | — | B | performance |
| `test-*.mjs` (15 : learner-model, attempt-events, typographie, session, examens, melange + 9 tests de scène) | 3 312 | CI, bat | A | 6 s ; les tests de scène vivent aussi longtemps que leur scène |
| `token-gate.mjs` | 96 | bat, dom-truth | A | jetons du design |
| `tracabilite-spec.mjs` | 224 | CI, bat | C | spec→item (propositions) |
| `trace-chargement.mjs` | 79 | — | C | ponctuel |
| `trois-moteurs.mjs` | 332 | — | B | Safari et Firefox, à la demande |
| `typo-francaise.mjs` | 293 | CI | B, à réécrire en contrôle de la source | 2 rouges réels en un mois |
| `validate-content.mjs` | 2 966 | CI, bat | A | la porte de la source |
| `veille-hydratation.mjs` | 131 | — | C | ponctuel |
| `verdict-qcm.mjs` | 288 | CI | A sur 6 leçons, B sur le corpus | l'élève qui répond juste est dit juste |
| `wide-measure.mjs` | 161 | — | C | mesure de la route `/options/wide`, à supprimer |
| `zoom-sweep.mjs` | 203 | CI | B | hebdo |
| `zoom400-sweep.mjs` | 136 | — | B | sonde d'accessibilité |
| `lib/` (katex-erreurs, couverture-compte, scene-ergonomie) | 553 | bibliothèques | A | |

## Annexe A.2 — Les 107 fichiers de `docs/` à archiver

- **Racine** : `HANDOFF.md`, `content-guide.md`, `quiz-demo.html`, `reestablish-state-report.md`.
- **`reestablish-state/`** : les 3 fichiers. **`archive/`** : les 4 fichiers.
- **`agents/ROSTER.md`**.
- **`audits/`, 50 fichiers** :
  - accents-francais, anatomie-notion-2026-09-20, annonce-lecteur-ecran, arabe-direction ;
  - b2-visual-coverage-ledger, b4-items-coverage-ledger ;
  - chevauchements-figures, codes-de-barreau-fuites, completion-evaluation-2026-07,
    content-correctness-docket-2026-07, contraste-figures, copier-coller, couverture-diagnostique ;
  - d10-media-layer, d95-content-audit, dette-manipulable-2026-09-20, distracteurs-sans-tag-2026-09-20,
    donnees-et-forfait, drapeaux-non-leves ;
  - enonces-jumeaux-2026-09-20, envoi-des-reponses, external-design-audit-2026-07 ;
  - fable-day2-notes, fable-day3-ledger, fable-ui-content-audit, figure-stage-depth-audit, format-a-choix ;
  - gisement-arabophone, hors-ligne, hunt-flags-2026-07, impression, indice-absolu, indice-longueur,
    interactivity-candidates-2026-07 ;
  - k8-remesure-2017-2019, lectures-graphiques, lesson-completeness-docket ;
  - poids-et-reactivite, polices-de-repli, portee-hors-lecon, rampe-bac-2026-09-20, rampe-entree-2026-09-20,
    recherche-navigateur, remediation-campaign-2026-07, reseau-malade, resume-couverture ;
  - traces-barrant-etiquettes, typographie-francaise, ux-bac-readiness-closure-2026-07,
    ux-bac-readiness-evaluation-2026-07.

  **Deux à relire avant l'archivage**, parce qu'ils contiennent des faits utiles au générateur :
  `gisement-arabophone.md` (836 lignes) et `distracteurs-sans-tag-2026-09-20.md`.
- **`design/`, 13 fichiers** : 01-rlc-design-pass-brief, AUDIT-SCORECARD, COMPONENT-STATES, COVER-SPEC,
  DASHBOARD-SPEC, DASHBOARD-V2-SPEC, GOOGLE-AUDIT-RUBRIC, LESSON-EXPERIENCE-SPEC, MOTION-CHOREOGRAPHY,
  PAGE-ANATOMY-SPECS, SITE-MAP, STUDIO-SPEC, THEME-ARCHITECTURE. Pour ces trois-là, archiver après la spec
  v3 : COMPONENT-STATES, LESSON-EXPERIENCE et PAGE-ANATOMY décrivent l'interface actuelle.
- **`grounding/`** : dislike-list, known-issues, schema-reconciliation.
- **`ops/`** : les 5 fichiers.
- **`pipeline/`, 22 fichiers** :
  - EXEMPLARS, NOTION-TEMPLATE-V2, PHILO-ANALYSE-DE-TEXTE-SPEC, SUMMIT-CONVERSION-RECIPE, mastery-push-plan,
    pipeline (déjà marqué SUPERSEDED), post-fable-work-order, skeleton-lesson-brief, tutor-first-plan ;
  - `day7-briefs/` (5) ;
  - `propositions/` (8), une fois leurs fils fermés (LOCAL-TRANSITION §4).
- **`product/`** : OUTILLAGE, REFONTE-STUDIO.

## Annexe B — Les commandes

- **[C1] Durées réelles de CI.**
  `gh api repos/Souflomari/BAC/actions/runs?per_page=8`, puis pour chaque id :
  `gh api repos/Souflomari/BAC/actions/runs/<id>/jobs > jobs.json`, et
  `node -e 'const j=require("./jobs.json");for(const b of j.jobs){console.log(b.name,(new Date(b.completed_at)-new Date(b.started_at))/1000);for(const s of b.steps)console.log("  ",Math.round((new Date(s.completed_at)-new Date(s.started_at))/1000),s.name)}'`.
  Runs utilisés : 824 = 39477782508, 823 = 39463725344, 822 = 39446579071.
- **[C2] Runs rouges et étape fautive.**
  `gh api 'repos/Souflomari/BAC/actions/runs?per_page=100&created=>=2026-09-24&status=failure' --jq '.workflow_runs[].id'`,
  puis `gh api …/runs/<id>/jobs --jq '.jobs[]|select(.conclusion=="failure")|.steps[]|select(.conclusion=="failure")|.name'`.
  Bilan : `--jq '[.workflow_runs[].conclusion]|group_by(.)|map({(.[0]):length})|add'` sans filtre de statut.
- **[C3] Qui lance quel script.** Un script Node lit `gates.yml` (motif `scripts/<f>`, les `npm run <n>`
  résolus par `web/package.json`, et `prebuild` pour `build`), puis les tableaux `ETAPES` et `HORS_CHAMP` de
  `batterie-locale.mjs`, et les chemins `web/scripts/*.mjs` cités dans `INSTRUMENTS.md`. C'est la même logique
  que la garde de `batterie-locale.mjs` (lignes 404 à 420), sans la sortie en erreur. Les dates viennent de
  `git log -1 --format=%cs -- web/scripts/<f>` et de `git log --diff-filter=A --format=%cs -- web/scripts/<f>`.
- **[C4] Commits par zone.**
  `git log --since=2026-09-01 --format='@@%h' --name-only | awk '…'` : un commit est classé « contenu » s'il
  touche `content/`, sinon « produit web » s'il touche `web/src/`, sinon « instruments » s'il touche
  `web/scripts/` ou `.github/`, sinon « docs ».
  Lignes ajoutées : `git log --since=2026-09-01 --numstat --format= -- <chemins> | awk '{a+=$1}END{print a}'`.
- **[C5] Les docs par dossier.**
  `for d in docs/*/; do echo "$d $(find "$d" -type f | wc -l) $(du -sk "$d"|cut -f1)K $(find "$d" -name '*.md' -exec cat {} + | wc -l) $(git log -1 --format=%cs -- "$d")"; done`.
- **[C6] Le contenu.**
  `cd web && node -e 'const y=require("js-yaml"),fs=require("fs");for(const s of fs.readdirSync("../content")){let t={n:0,it:0,cp:0,bk:0,ex:0,mc:0};for(const n of fs.readdirSync("../content/"+s)){const d=`../content/${s}/${n}`;if(!fs.existsSync(d+"/lesson.md"))continue;t.n++;const L=f=>{try{return y.load(fs.readFileSync(d+"/"+f,"utf8"))||{}}catch{return{}}};const i=L("items.yaml");t.it+=(i.items||[]).length;t.mc+=(i.misconceptions||[]).length;t.cp+=(L("checkpoints.yaml").checkpoints||[]).length;t.bk+=(L("bank.yaml").entries||[]).length;t.ex+=(L("exercises.yaml").exercises||[]).length}console.log(s,JSON.stringify(t))}'`.
- **[C7] La batterie chronométrée, dans un clone jetable.**
  `git clone -q --shared --no-checkout /chemin/BAC clone && cd clone && git checkout -q --detach 816ddc5b && ln -s /chemin/BAC/web/node_modules web/node_modules && echo web/node_modules >> .git/info/exclude && cd web && S=$(date +%s); node scripts/batterie-locale.mjs; echo $(( $(date +%s)-S ))`.
  L'ajout à `.git/info/exclude` est justement le contournement du bug du §5.1.
- **[C8] Usage des agents.**
  `for a in $(ls .claude/agents | sed 's/.md//'); do echo "$a $(git log --format=%B | grep -c $a) $(git log --since=2026-09-01 --format=%B | grep -c $a)"; done`.
