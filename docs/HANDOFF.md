# HANDOFF — the July-2026 sprint, closed (2026-07-03 · addendum 07-06)

> ## ÉTIQUETTE DE STATUT — 2026-09-20
>
> **Le titre et les §0 à §5 de ce fichier datent de juillet 2026 et restent le
> compte rendu FIDÈLE de ce sprint-là.** Ils n'ont pas été réécrits : un compte
> rendu daté ne se met pas à jour, il se date (ADR 0031 — l'étiquette de statut
> est par document).
>
> **Ce qui s'est passé depuis vit au §11**, qui compte aujourd'hui 147 entrées.
> **Un propriétaire qui revient lit d'abord
> `docs/audits/DECISIONS-EN-ATTENTE.md`** — la liste, en une page, de ce qui
> attend un arbitrage et de ce que coûte chaque attente. Rien n'y est en train
> de se dégrader : chaque ligne porte un cliquet qui empêche l'état d'empirer.
>
> Une session fraîche qui veut l'ÉTAT COURANT plutôt que l'histoire lit, dans
> cet ordre :
>
> - **§11.113** — les artefacts du modèle apprenant avaient dérivé du corpus ;
>   deux misconceptions étaient déclarées évaluables alors que le banc ne les
>   évaluait plus. **Le défaut PRODUIT le plus sérieux trouvé récemment.**
> - **§11.104 / §11.110 / §11.111** — trois façons dont un INSTRUMENT a menti :
>   un essai rouge qui ne lançait pas la porte, un tampon de build qui comparait
>   deux sha au lieu de deux rendus, un serveur périmé qui imitait une
>   régression. Lire avant de croire une mesure catastrophique.
> - **§11.106** — « porte vérifiée rouge » n'est plus une phrase mais une
>   commande : `node scripts/essais-rouges.mjs`, **37** essais rejoués à chaque
>   passage.
> - **§11.117 / §11.118** — l'état de la MESURE : la CI n'a pas assigné un seul
>   runner de la journée (aucune porte n'a tourné en CI depuis le 19 au soir —
>   ne jamais lire un badge vert comme une preuve), et la dernière porte armée
>   garde une promesse textuelle du spec que rien ne gardait.
> - **§11.102 / §11.107 / §11.108** — l'état du CONTENU : quelles familles de
>   misconceptions manquent à l'inventaire, et ce qu'un élève peut obtenir sur
>   le banc sans rien savoir (31,9 % contre 25 % au hasard, l'absolu portant
>   désormais tout le reste).
>
> **Les décisions transverses de septembre** sont consolidées dans
> `docs/decisions/0033-la-porte-exacte-sur-une-autre-question.md` et
> `docs/decisions/0034-l-instrument-qui-ne-s-entendait-pas.md`.
>
> **Le §0 ci-dessous (portes ouvertes) n'a PAS été révisé** : ce sont des
> décisions de propriétaire, et aucune n'a été tranchée par une session agent.

> **07-06 :** the Fable sessions are over. Read §0 (gates, incl. 7bis),
> then **§5 — the post-Fable addendum** (D9→D12 state, the three-leg QA,
> the model-swap rule, and the first work order:
> `docs/pipeline/post-fable-work-order.md`). Consolidated records:
> ADR 0025 (first arc, 06-27→07-03) + ADR 0026 (second arc, 07-04→07-06).

> **Audience:** the next maintainer (Opus 4.8 or any standard-model session,
> cold) and the owner. This is the sprint's last act. Orientation order for
> a fresh session: `.claude/CLAUDE.md` → `docs/product/VISION.md` →
> `docs/Rules/RULES.md` → this file. The consolidated decision record is
> **ADR 0025**; the running evidence ledger is
> `docs/audits/fable-day3-ledger.md`.

---

## 0. OPEN GATES — owner decisions pending (nothing below ships around them)

1. **spec.md validation.** The RLC pedagogy re-spec was never
   human-validated (RULES §2). The rc-charge notion has NO spec at all
   (section-level test artifact) — a pedagogy-architect pass + owner gate
   before it grows.
2. **R8 bac sourcing (audit C2 — BLOCKING).**
   `content/pc/rlc-serie/exercises.yaml r8-bac.sourcing.status = unsourced`.
   The RLC notion is NOT DONE until the owner's real national sujets arrive
   and the exercise is validated against one. Template v2 §C makes this
   box uncheckable by an agent. **Do not fake it.**
3. **A3 / B1 / C1 + the accumulated taste calls** — all FABLE-DECIDED /
   OWNER-REVIEW-PENDING (full register: ledger §3/§5/§6/§7): masthead band
   A3 *(externally corroborated: the independent audit praised the
   deployed masthead unprompted)*, home B1 + cover shelf, footer C1,
   section ordinals, rung-boundary rule, R0-commit pattern, attempt-first
   register, LessonEnd anatomy as re-specced Day 7. Owner confirms or
   overrides; every spec carries its swap points.
4. **Production-sync verification** (CLAUDE.md non-negotiable). Untouched
   all sprint by design. Before ANY new migration: supervised sync check.
5. **Session-eligibility rule.** The honest "most recently updated" session
   rule now recommends the one-section rc-charge stub as today's session on
   home. Honest but front-door-wrong; an eligibility flag in notion meta is
   an owner call (do not silently invent one — it touches the honest-state
   rule).
6. **Canonical domain.** `metadataBase` and JSON-LD URLs point at the
   `bac-pink.vercel.app` preview; swap when a real domain is decided.
   `robots` stays noindex until the owner opens indexing.
7bis. **(07-06) Gates added at the Fable close:** ~~**M1 masthead +
   RetenirZone (W3 adapté)** — OWNER-DIRECTED Day 11, §3 not yet built
   (work order item 3)~~ **CONSTRUIT le 2026-09-04** — item 1 de
   `docs/pipeline/post-fable-work-order.md` : cinquième colonne de grille,
   `RetenirZone.tsx`, sidecar `retenir.json` (exemplaire rlc-serie) avec
   repli sur la première formule détachée du chapitre, et M1 devenu le rendu
   par défaut du masthead. **Deux écarts assumés avec la spec, tous deux
   documentés dans le code :** (a) le palier est **bp-xl (1600px)** et non
   1536 — la spec citait « bp-wide (1536px, existant) », or ce palier
   n'existe pas dans `tokens.ts` ; plutôt qu'inventer un sixième palier pour
   une règle, la zone s'ouvre à la classe M3 « extra-large » que le système
   possède déjà ; (b) la bande de notion **s'élargit à 1484px** à ce palier,
   ce que la spec ne disait pas — sans quoi les deux colonnes ajoutées
   prennent leur place à la prose, qui tombait de 690 à 496 px (mesuré). Six
   contrôles dom-truth gardent l'ensemble, dont l'état honnête (un chapitre
   sans formule ne rend AUCUNE carte) et la mesure de la prose, cette
   dernière testée en négatif ; **maths GeoGebra/Desmos embeds** need the owner in
   the loop (applet content unverifiable headlessly — honest-state,
   `docs/audits/d10-media-layer.md`); **the video-slot decision**
   ([[video:]] renderer-stubbed; generative tooling = CLAUDE.md open
   decision 4); **the D10 legacy figure bug** —
   `content/pc/rlc-serie/media/energy-exchange.svg` uses hex colors and
   labels a cos² peak-to-peak interval « T₀ » where physics says T₀/2
   (orphaned from lessons but in the repo: fix or delete, owner eyes)
   — **et sa voisine `loi-mailles-build.svg` relève du MÊME arbitrage**,
   découverte le 2026-09-03 par la porte de couleur alors neuve : couleurs
   codées en dur elles aussi, et la pire du corpus au rendu sombre (49 %
   de la surface reste claire — deux grands panneaux blancs sur page
   sombre). Aucune leçon ne l'appelle par un marqueur `[[figure:]]`, mais
   elle EST câblée dans l'app (aria-label dans `NotionBody`, slug dans
   `MediaDiagram`) : quelqu'un l'a branchée, ce qui fait de son sort une
   question (la corriger et la servir, ou la retirer avec son câblage) et
   non un nettoyage. Les deux fichiers portent désormais un bloc
   `DETTE OWNER:` qui dit tout cela en place ; la porte de couleur les
   laisse passer sur ce marqueur seul, donc l'arbitrage reste visible sans
   bloquer la CI. **Ni l'une ni l'autre n'a été repeinte — repeindre
   reviendrait à décider qu'on les garde.**
   **2026-09-04 — un troisième motif s'ajoute au dossier de
   `loi-mailles-build.svg` :** le tri des chevauchements d'étiquettes a
   nettoyé 24 collisions réelles dans 19 figures et laissé le corpus
   statique propre, **à sept exceptions près, toutes dans ce fichier** —
   dont trois à 100 % de recouvrement (« R n'apparaît pas. » sur « Le
   terme R·q′ subsiste. », etc.). Elles restent en place pour la même
   raison : les réparer serait décider de garder la figure. Le dossier est
   donc complet — couleurs, contraste sombre, câblage orphelin,
   lisibilité — et il n'attend qu'une décision.
   (`docs/audits/chevauchements-figures.md`)
   **ledger §11's twelve Day-11 calls** remain FABLE-DECIDED /
   OWNER-REVIEW-PENDING except where marked OWNER-DIRECTED.
7. **The maths notion is pre-sprint debt.** It predates template v2 and the
   week's grammars: rungs authored at h3 (one rail entry, no ordinals),
   ~~the arbre-pondéré figure never built while the prose references it
   (C5 — diagram-author lane)~~, summit unsourced, no
   attempt-first/derivation grammar. Its five leak classes were fixed in
   the final batch, but the full template-v2 retrofit is a dispatched
   notion-pass of its own.

   **La dette C5 est PÉRIMÉE — rectifiée le 2026-09-03.** La figure existe
   depuis le 2026-08-22 : `content/maths/probabilites-conditionnelles/media/arbre-pondere.svg`,
   avec son sidecar d'étapes (3 étapes) et son aria-label. Elle est
   même citée comme **référence or maths** par le skill
   `figure-authoring`. Ni ce point du HANDOFF ni le commentaire de la
   leçon n'avaient été mis à jour quand elle a été construite, si bien
   que le dépôt annonçait à deux endroits une dette payée — et j'ai
   moi-même perdu du temps à vouloir la payer une seconde fois avant de
   faire un `ls`. La leçon a été rectifiée dans le même mouvement.

   *Ce que la figure avait en revanche de réel, et qui est corrigé le
   même jour : onze couleurs codées en dur (boîtes quasi blanches
   éclatant en thème sombre, étiquettes d'arêtes à ~2:1 de contraste),
   une police qui détonnait de ses deux sœurs, et un
   `text { text-anchor: middle }` non scopé qui débordait sur les autres
   figures de la page.*

## 1. External-audit triage (July 2026 — full text at
`docs/audits/external-design-audit-2026-07.md`; verification measurements
and fixes in ledger §8)

| Audit item | Verdict under measurement | Disposition |
|---|---|---|
| 5.1 Authoring text leaking (3 fragments) | CONFIRMED, undercounted — 5 fragments, 2 mechanisms; the post-fix adversarial pass then found FIVE MORE residual classes (reviewer blockquote, raw placeholder tokens, h3/table R-codes, SVG spec citations, dangling cross-refs — ledger §8) | **FIXED NOW, twice-verified:** loader strip + content edits + h3 renderer strip + class guard (expanded lexicon, visible-text semantics) + notText full-text fix. Bible §13 amendment (classes, not instances). |
| 5.2 Line length ~1076px | REFUTED as stated (that's the grid container; body prose = 65.0ch exactly) — but the sweep found real bypasses (Derivation notes ~94ch, items intro ~87ch) | **FIXED NOW:** measure caps on both; permanent ≤75ch sweep in dom-truth. |
| 5.3 Contrast risks | REFUTED — worst in-scope ratio 6.57:1, no failures either theme | **INSTRUMENTED:** permanent contrast rows in dom-truth (both themes, real user paths). Side-finding fixed: rail active link now carries `aria-current`. |
| 5.6 No dark mode | CONFIRMED, worse than claimed — dark tokens existed with NO activation path; all week's "both themes" evidence was harness-forced | **FIXED NOW:** ThemeToggle (header) + pre-paint boot script; OS default + persisted choice; dom-truth exercises the real path. |
| 5.4 Metadata incomplete | CONFIRMED in full (only title/description existed) | **FIXED NOW:** favicon + apple-touch + OG/twitter pack + canonical + JSON-LD (WebSite, LearningResource) + `public/og.png` template. |
| 5.5 Breadcrumb truncation | CONFIRMED (visual-only truncation; accessible name was complete) | **FIXED NOW:** `title` attribute. |
| §6 Math accessibility | REFUTED — 487/487 formulas ship MathML | **INSTRUMENTED:** parity sweep permanent. Finding recorded: KaTeX default output is already right; don't "fix" it. |
| §6 Manipulable sims (sliders R/L/C) | Partially exists (Falstad embed `rlc-sandbox` in R3/R6; beat-engine figures are learner-paced BY DESIGN — calm bible forbids autoplay) | **ROADMAP — interactive-author lane.** The audit's ask maps to ADR 0021's interactive tier; sliders-sim is a legitimate next asset. NOT a rejection of calm: manipulation serves understanding (VISION), engagement theater still banned. |
| §6 Persistence / progression / spaced review | Correctly absent (honest-state rule) | **ROADMAP — production lane, human-gated** (per-student state = the gated 10%; supabase-architect owns; sync gate first). |
| §6 Search | Absent, correctly low priority at 3 notions | **ROADMAP — periphery surface**, post-catalog-growth (frontend-builder lane). |
| §6 Catalog depth | True (3 notions) | **ROADMAP — content pipeline** (pedagogy-architect → authors → critics, per notion; RULES cadence). |
| §6 Figure hover/zoom, PDF export, multimodal video/audio | Absent | **ROADMAP:** figure interactivity → interactive-author (low); PDF/print → a print stylesheet exists, dedicated export is low; video/audio → the Gemini/ElevenLabs lane (CLAUDE.md open decision #4 — sanctioned uses still to be written). |
| §7 "progression % / terminé states" | — | **ROADMAP tied to persistence;** any indicator must be real state, never fabricated (honest-state). |
| — | — | **REJECTED: none.** Every audit item was either verified-and-fixed, instrumented, or mapped to an existing lane with an owner. |

## 2. The portability result (Day 7 — the week's central question)

Four articles executed by cold sonnet-alias sessions from the committed
repo + a brief each (briefs are the dispatch template:
`docs/pipeline/day7-briefs/`). All four verdicts FAITHFUL; **eleven spec
bugs** surfaced and closed same-day; the (a) re-run against the tightened
spec converged (divergences → rhythm-level micro-choices). The
divergence→tightening tables live in ledger §7 per article. **The
spec-tightening loop converges — that is what makes maintenance-by-brief
credible.** Executor-honesty caveat in ledger §7 (no Sonnet 4.8 ID exists
in the harness).

**Owner blind pairs** (unlabeled, key sealed in ledger §7):
`web/shots/day7/blind/` — pair-cover, pair-derivation, pair-prose. Where
the owner's eye catches a difference, capture what he saw — it outranks
the checklist.

## 3. How not to regress this (the one-page note)

**The three QA legs — none optional (bible §13):**
1. `cd web && npm run build && node scripts/dom-truth.mjs` — 99 checks,
   self-syncing from token sources. Green before shots, shots before claims.
2. Gestalt on full-page renders vs named references (Stripe Press, Imprint,
   Brilliant) — never the author grading their own work.
3. **Periodic independent fresh-eye audit of the DEPLOYED site.** Every
   instrument sees only what it was told to see; the July audit found what
   two in-repo legs missed (the leak class, the unreachable dark mode).
   Commission one after any major batch, from a context with no access to
   this repo's history.

**The invariants that rot silently if violated (each has a guard or anchor):**

| # | Invariant | Where it lives |
|---|---|---|
| 1 | New custom Tailwind key → classGroups same commit (U1) | `web/src/lib/utils.ts`; §13 |
| 2 | Visual/deploy claims only from rendered/fetched evidence | §13; dom-truth |
| 3 | No fabricated student state, progress, or sourcing | honest-state rule; dom-truth guard; template §C |
| 4 | Attempt-first: reasoning never in DOM pre-commit | AttemptFirstExercise; dom-truth |
| 5 | Derivation steps beyond current never in DOM | Derivation.tsx; dom-truth |
| 6 | Rung counter resets on `.notion-content`, never per segment | globals.css; dom-truth |
| 7 | Authoring notes = HTML comments, stripped at load; lexicon guard on every page | `stripAuthoringComments`; dom-truth sweep; template §E |
| 8 | Running text ≤ 75ch of its own font | dom-truth sweep |
| 9 | Dark theme reachable ONLY via boot script + toggle — never ship a token set without its activation path | ThemeToggle; dom-truth round-trip |
| 10 | Tokens only; one filled accent action per surface; calm rules (no autoplay/ripple/overshoot) | bible §0/§6/§7/§13 |
| 11 | Migrations append-only; production human-gated; sync check first | RULES §2/§3; CLAUDE.md |
| 12 | Guards assert CLASSES, not instances; new internal vocabulary extends the lexicon guard same commit | §13 amendment |

**Working discipline that made the week compound:** every dispatch ends
with report-then-stop; every claim carries its evidence or the word
"unverified"; every taste call is ledgered with FABLE-DECIDED /
OWNER-REVIEW-PENDING status; every hard-won constraint is written where a
cold reader will look (the spec, not the transcript); corrections are
recorded, never overwritten (ledger §5 stands as the example).

## 4. Repo state at handoff

Branch `claude/vibrant-fermi-v1lxj5`, PR #2 (draft). All work content-lane;
production untouched all sprint. dom-truth: 99 checks green at the final
commit. Evidence dirs: `web/shots/options/` (Day-3 sets),
`web/shots/day6/report/`, `web/shots/day7/blind/`,
`web/shots/day8-audit/` (external-audit before/after). The full shot
matrices are local-only by gitignore design.

---

## 5. Post-Fable addendum (2026-07-06) — the second arc, and how to carry it

**What D9→D12 added** (record: ADR 0026; evidence: ledger §11,
`docs/audits/d10-media-layer.md`, `docs/design/LESSON-EXPERIENCE-SPEC.md`):
the full site skeleton; 61 real lessons (SVT content intact but its media
layer untouched — Fable safety scope); the D10 media layer (all PC + maths
figures, 5 verified motions, 3 curated PhET embeds); Lesson Experience v2
§§1–2 shipped (chapter pagination + StagedFigure), §§3–5 pending in the
work order.

**The three-leg QA — none substitutes for another:**
1. **dom-truth (mechanical)** — `web/scripts/dom-truth.mjs`, 121 checks,
   self-syncing battery + sweeps. Run on EVERY build that touches
   web/ or content/. A green run is necessary, never sufficient.
2. **Gestalt reference (rendered)** — screenshot against the shots
   harness and LOOK, per DESIGN-BIBLE §10; compare to
   `docs/design/AUDIT-SCORECARD.md` anchors. Catch what selectors can't.
3. **External fresh-eye (deployed)** — periodically, a session with NO
   repo context audits the deployed preview cold (precedent:
   `docs/audits/external-design-audit-2026-07.md` — it found what both
   other legs missed). Schedule one after any multi-day arc.

**The model-swap rule:** on ANY model change (Fable→Opus, Opus→Sonnet,
version bumps), re-run dom-truth + one gestalt pass BEFORE new work.
Different models regress differently; the instruments are the contract.

**Spec-first discipline (Day-11 proof):** for any architectural change,
the spec (LESSON-EXPERIENCE-SPEC standard: contracts, file:line anchors,
ledger entries, verification criteria) lands and is committed BEFORE code.
A window that closes mid-build must leave the spec as the handoff.

**The first work order** for the next session is
`docs/pipeline/post-fable-work-order.md` — written to the Day-7 tightened
brief standard, cold-executable by Sonnet.

---

## 6. Addendum du 2026-08-27 — l'arc « annales + audit de l'assembleur »

> **Écrit en fin de session, sur ce qui a réellement atterri.** Ce qui était
> encore en vol au moment de l'écriture est marqué comme tel : ne le crois pas
> fait sans regarder le dépôt.

### 6.1 Ce qui a changé pour l'élève

**Le corpus d'épreuves est passé de 22 à 38 épreuves complètes** (≥ 19,5/20),
247 entrées de banque, **38 notions dotées**. **Seize gagnées** sur cet arc :

- **vague maths** (2026-08-27) : SM 2017, 2021, 2022, 2023, 2024, 2025 normale
  et SExp 2018 — chacune par la conversion de son problème d'analyse ;
- **vague physique-chimie** (2026-08-28) : SPC 2010, 2012, 2015, 2017
  normale et **2011 rattrapage** — les CINQ sujets du recensement, chacun par
  transcription sous protocole complet, vérification adversariale
  indépendante, puis conversion de tout ce qui manquait (13 à 18,25 points
  par sujet). La conversion de 2017 **fonde la banque
  d'`aspects-energetiques`**, qui n'en avait jamais eu. **La campagne SPC est
  close, cinq sur cinq.**
- **vague SPC 2 — les sujets à zéro** (2026-08-29) : **SPC 2011 normale**
  (6 entrées, 35ᵉ épreuve) et **SPC 2015 rattrapage** (8 entrées, 36ᵉ) —
  deux sujets qui n'avaient AUCUNE entrée, chacun transcrit EN ENTIER
  (premières intégrales du sas), vérifié par passe adversariale, puis
  converti à 20,00/20. 2011 N porte la **garde S1** (figure officielle à
  l'échelle fausse d'un facteur 3,24 : déclarée en bloc ⛔, aucune valeur
  absolue n'en est tirée, t½ par lecture relative) ; 2015 R déclare ses
  quatre défauts F1–F4 (dont le « Po » imprimé pour le plomb, corrigé en
  Pb par CORRECTION ASSUMÉE). Le troisième sujet à zéro, **2010 R, est
  TRANSCRIT ET VÉRIFIÉ** (20,00 points en six blocs,
  `_incoming/pc-2010-r.md`, 30/30 questions résolubles) ; sa
  conversion reste **bloquée par un arbitrage owner** (voir §6.5, question
  d'anatomie).
- **vague SPC 4 — les rattrapages localisés** (2026-09-04) : **SPC 2013
  rattrapage** (7 entrées, 37ᵉ épreuve) et **SPC 2012 rattrapage**
  (6 entrées, 38ᵉ). Ces deux sujets étaient encore marqués `non recherché`
  au recensement la veille — des lignes vides depuis le début de la
  campagne. La prospection du gisement arabophone les a localisés avec
  leur corrigé, et ils ont été transcrits en disposant de **l'original
  arabe dès la transcription**, un avantage qu'aucune passe précédente
  n'avait eu.

  **Leur résultat de provenance renverse celui de 2010 R** : leurs deux
  éditions françaises sont **MINISTÉRIELLES** (code d'examen imprimé,
  identique à celui de l'arabe pour 2013 R), là où celle de 2010 R est une
  traduction professorale. Trois cas, deux statuts : **la question de
  provenance se pose sujet par sujet et ne se règle pas par la série.**

  2012 R sert une **question fausse du sujet officiel** de façon honnête :
  l'énoncé désigne les mauvaises parties du montage (trois témoins le
  confirment), le texte est transcrit verbatim, l'avertissement est porté
  au fil du texte que l'élève lit, et la réponse est écrite pour les
  parties que le montage autorise. L'arbitrage entre garder et réparer
  reste owner — et la note dit comment basculer en deux mots.

> **Un seuil franchi, à ne pas perdre de vue :** le corpus ne compte plus
> **aucune épreuve invisible**. Mesuré le 2026-09-04 sur le dépôt : 38
> épreuves complètes (≥ 19,5), **zéro sous le seuil d'affichage de 9,75**,
> et une seule épreuve listée-non-complète — SM 2020 normale (10,50), le
> cas K-0 suspendu. Autrement dit : tout ce qui est en banque est
> désormais soit une épreuve entière, soit l'unique cas que l'owner a
> explicitement mis en attente. Cette propriété est fragile — une seule
> conversion partielle la casse. Si tu convertis un sujet, va au bout, ou
> laisse-le à zéro.

**Sept d'entre elles étaient INVISIBLES** pour l'élève, sous le seuil
d'affichage de 9,75 : SM 2021 (8,00), SExp 2018 (9,00), SPC 2012 (7,00),
SPC 2010 (4,25), SPC 2015 (2,25), SPC 2011 R (2,25) et SPC 2017 (1,75 — le
plus gros manque du corpus). Elles n'ont pas seulement gagné des
points — elles ont commencé à exister.

Deux cas méritent d'être connus avant de reprendre :
- **SM 2021 est PARTITIONNÉE** — Partie I → `fonction-exponentielle` (5,0),
  Parties II+III → `suites-numeriques` (7,0). Voir §6.5 bis pour le critère.
- **SExp 2018 FONDE la banque de `derivabilite-etude-fonctions`**, la notion
  la plus cross-listée du corpus, qui n'en avait aucune.

**2020 normale ET rattrapage restent SUSPENDUES** sur l'arbitrage K-0 — les
deux seules épreuves SM de session normale qui ne soient pas complètes.
`docs/sujets/_incoming/README.md` porte le tableau à jour.

### 6.2 Cinq défauts trouvés en MESURANT le corpus, pas en lisant le code

Aucun des cinq n'était visible à la lecture. Tous sortent d'un script qui
compare le dépôt à lui-même. **C'est la méthode à reprendre**, plus que les
correctifs eux-mêmes.

1. **Le « fait » d'une banque s'allumait sur des exercices jamais ouverts.**
   42 `entry_id` sont partagés entre notions (un exercice découpé garde son
   identifiant dans chaque banque) ; la lecture du journal ignorait
   `notion_id`. **Corrigé** (`revealKey`), **documenté** (K-7, BANK-SPEC §4).
2. **Neuf épreuves rendues dans le désordre, dont huit à 20,00/20.** Le tri
   départageait les morceaux d'un exercice alphabétiquement : « Partie 2 »
   avant « Partie I ». **Corrigé** (`sousOrdre`), **gardé** (2 checks
   dom-truth sur SPC 2018 et SPC 2025).
3. **Quatorze épreuves annonçaient un nombre d'exercices faux** — SPC 2023
   disait « 10 exercices » pour un sujet qui en a quatre. **Corrigé**
   (`nbExercices`), **gardé**.
4. **Six glyphes cassés en production** (✔ dans du display math, guillemets
   français dans un `\text{}`). Ils sortaient dans la sortie d'une porte qui
   les IMPRIMAIT sans tomber — `throwOnError` ne couvre que l'analyse.
   **Corrigés**, et **la porte tombe dessus** désormais.
5. **Cinq identifiants mentent sur leur position** (`x1` là où le libellé dit
   Exercice 3 ou 5). **NON corrigés, délibérément** : renommer un `entry_id`
   orpheline les lignes de journal écrites dessus, et ça cascade sur les
   entrées voisines. Arbitrage owner, posé en **K-7 bis** avec le nom juste de
   chacune. La porte empêche la dette de croître.

### 6.3 Trois portes neuves dans `validate-content`

Chacune vérifiée dans les DEUX sens (elle tombe sur le défaut, elle passe sur
le corpus). Si l'une gêne, comprends d'abord ce qu'elle protège :

- **glyphe non rendable** — intercepte le `console.warn` de KaTeX ; un
  caractère absent de la police se rend en glyphe cassé chez l'élève ;
- **`notion:` ≠ dossier** — ce champ descend jusqu'à la clé « fait » ; faux,
  il ferait pointer les marques d'une banque vers une autre notion, en
  silence ;
- **position de l'identifiant ≠ libellé** — avec les cinq héritées nommées
  une par une dans `POSITIONS_HERITEES`.

### 6.4 Le protocole du sas a durci — et pourquoi

Une passe a découvert qu'**AlloSchool sert parfois, depuis son cache CDN, un
AUTRE sujet que celui demandé** : sous la bonne URL, trois pages sur six
portaient un autre sujet. Et le vérificateur, la transcription sous les yeux,
y a « retrouvé » par lecture visuelle les énoncés attendus sur des pages qui
ne les contenaient pas. **Seule une lecture non visuelle a brisé l'illusion.**

D'où les quatre exigences, désormais dans `docs/sujets/_incoming/README.md` :
année relue sur **chaque** page · recoupement par un instrument **non
visuel** · MD5 avec second téléchargement · contrôle du `<title>` servi.

Les passes menées AVANT cette règle portent une **réserve de portée**
recopiée dans l'en-tête de leur banque — pas seulement dans le sas, qui
finira archivé. Elles disent ce qu'elles ont fait et ce qu'elles n'ont pas
fait. Les re-passer sous le protocole complet est un arbitrage owner ouvert.

### 6.5 Ce qui reste à l'arbitrage de l'owner

- **K-0 — MESURÉ, et le résultat est plus tranchant que l'arbitrage ne le
  supposait.** Le balayage a été fait : `docs/audits/format-a-choix.md`.
  **Deux** épreuves à choix sur 61 examinées, pas une — SM 2020 normale ET
  **SM 2020 rattrapage**, que le recensement marquait « jamais ouvert ». Le
  format est confiné à SM 2020, inexistant partout ailleurs.
  Et le fait dur : SM 2020 normale porte trois entrées dont deux s'excluent,
  donc **un candidat réel plafonne à 7,00** ; l'assembleur affiche **10,50** ;
  le seuil d'affichage est **9,75**. Cette épreuve n'existe dans « Examens
  blancs » **que grâce au sur-comptage** — le corriger la fait disparaître de
  la liste. Le bug ne fausse pas un total, il fabrique une présence.
  L'option 3 de K-0 (laisser SM 2020 hors du mode examen) coûte donc
  exactement deux épreuves connues, ce qui en fait la moins chère des trois.
  Réserve dite par le balayage lui-même : 47 lignes non couvertes, dont 20 en
  SM — il ne prouve l'absence que sur ce qu'il a ouvert.
- **K-7 bis** — les cinq identifiants à renommer, ou pas.
  **⚠️ CE N'EST PLUS UNE QUESTION DE NOMMAGE — mesuré au rendu le
  2026-09-03.** `bk-2011-r-x1` est porté par DEUX entrées : la chimie
  Partie I et la mécanique 1ère situation. Or l'assembleur lit désormais
  la position sur l'identifiant quand le libellé ne porte pas
  « Exercice N » (ce qui est le cas de SPC 2011 rattrapage, dont le
  sujet nomme ses exercices par discipline). L'identifiant ment, donc
  **l'épreuve sort dans le désordre** : sa mécanique s'insère entre les
  deux parties de chimie. Aucun correctif de tri ne peut y remédier —
  seul le renommage le peut. Les deux autres épreuves du même cas
  (2010 N, 2011 N, 2012 N) ont été remises dans l'ordre le même jour ;
  celle-ci reste cassée, et elle est **servie**. Le nom juste est déjà
  écrit dans K-7 bis (`bk-2011-r-x1` → `x4`).
- **PC 2010 R — l'anatomie du sujet : position sur la copie contre libellé
  imprimé.** *(Neuf, 2026-09-03 ; bloque la conversion des six blocs.)*
  L'édition servie numérote la physique « Exercice 1/2/3 » et laisse la
  chimie **sans numéro** : la position sur la copie donne chimie = 1, ondes
  = 2, électricité = 3, mécanique = 4, tandis que le libellé imprimé du bloc
  « ondes » dit *Exercice 1*. Le précédent 2011 R a endossé la **position** ;
  mais `validate-content` refuse un identifiant qui contredit son libellé.
  Deux issues sont rédigées au § 7.1 du sas, **aucune choisie** : (a) garder
  les identifiants par position et faire porter aux `exercise_label` la
  double lecture (« Exercice 2 (imprimé : Exercice 1) ») ; (b) aligner les
  identifiants sur l'imprimé et loger la chimie hors numérotation. À noter,
  et c'est ce qui rend l'arbitrage moins arbitraire qu'il n'en a l'air :
  **l'original arabe n'imprime aucun numéro d'exercice** — la numérotation
  litigieuse est un artefact de la traduction, pas du ministère.

  **INSTRUIT LE 2026-09-03 par la passe de vérification — un élément
  décisif est apparu.** L'original arabe ne se contente pas de ne pas
  numéroter : il **dit ce qu'il est**, par une phrase que la traduction
  française a **supprimée** — « quatre exercices : **un en chimie** et
  trois en physique ». Le sujet décrit donc lui-même son anatomie, et
  cette description coïncide avec la position sur la copie. Conséquences
  mesurées sur l'assembleur (`numeroExercice()` de `lib/examens.ts`), les
  trois issues passant la gate : **(a)** donne l'ordre 1, 2, 3, 4 et
  `nbExercices` = **4** — ce que le sujet dit de lui-même ; **(b)** place
  la chimie en dernier ; **(c)**, le précédent 2011 N appliqué à la
  lettre, donne `nbExercices` = **1**, ce qui afficherait « 1 exercice »
  pour une épreuve qui en compte quatre. L'arbitrage reste à l'owner,
  mais il ne se joue plus entre trois conventions également défendables :
  une seule reproduit ce que le sujet déclare de lui-même.
- **PC 2010 R — le statut d'un sujet qui n'est pas l'édition officielle.**
  *(Neuf, même date, plus large que le sujet.)* Le document français servi
  par AlloSchool est une **traduction professorale signée**, au cartouche
  anachronique et sans code d'examen ; l'original arabe existe et a été
  trouvé. Question de principe que l'owner doit trancher une fois pour
  toutes, car elle se reposera : **une traduction non ministérielle est-elle
  une source acceptable pour la banque**, et si oui, sous quelle mention
  côté élève ? Le corpus n'a jamais eu à le dire jusqu'ici.
- **Docket B1** — réduit à deux lectures : l'option « le tag filière est
  erroné » est écartée par l'arithmétique des barèmes. Reste (a) la limite
  SExp dérivée est trop stricte, ou (c) le sujet déborde son cadre. **Le PDF
  du cadre SExp est nécessaire.**
- **Docket B2 et B3** — arbitrages pédagogiques de fond (rung
  Henderson-Hasselbalch ; rung birapport). Volontairement non tranchés : ce ne
  sont pas des faits qu'une mesure règle.
- **SM 2021** — slug dominant non tranché, trois options mesurées.
- **SM 2025** — partitionnement de l'exercice à 10 points, réserve conservée.
- **PC 2019** — **deux réponses publiées pour la même question** : 532 N au
  sommet de leçon, 525 N en banque, selon qu'on arrondit $\sin 10°$ à 0,17 ou
  qu'on garde 0,1736. Le sommet fournit l'arrondi ; la banque garde la valeur
  précise et note qu'arrondir tôt déplace le résultat de 7 N.
  *(Rectification : j'ai d'abord décrit ça comme « la banque appelle piège ce
  que la leçon prescrit », ce qui est trop fort — les deux textes donnent des
  conseils défendables et un élève peut tenir les deux. Ce qui reste vrai et
  suffit : **deux réponses publiées coexistent pour une seule question**, et
  la donnée arrondie est absente de la transcription vérifiée du sujet.)*

- **K-8 — les valeurs graphiques jamais re-mesurées.** La fiche est neuve et
  c'est la plus lourde des trois. Elle établit que :
  — **deux valeurs publiées sont en litige** (PC 2019 ci-dessus ; et PC 2010,
    où la banque affiche $t_{1/2} \approx 20$ min quand une mesure au pixel
    donne **12,53 min**) ;
  — ce sont **deux modes d'échec différents** : divergence (les deux endroits
    se contredisent) contre héritage (la banque a recopié le sommet, donc le
    dépôt est cohérent avec lui-même *et faux ensemble*) ;
  — **aucun contrôle interne au dépôt n'attrape l'héritage.** Deux balayages
    ont été écrits et exécutés ; ils retrouvent PC 2019 et ratent PC 2010, par
    construction ;
  — **89 entrées sur 187 — 48 % de la banque — reposent sur une lecture de
    figure.** C'est une borne HAUTE de la surface exposée, pas un compte de
    valeurs fausses ;
  — et **le corrigé officiel de PC 2010 est introuvable** (recherche détaillée
    dans le `bank.yaml` de `transformations-lentes-rapides`), donc attendre
    l'arbitre revient peut-être à attendre rien.
  **La décision** : accepter la mesure documentée, commander une seconde
  mesure indépendante, ou lancer une campagne de re-mesure. Aucune porte
  automatique ne fermera cette fiche.

  **PREMIÈRE CAMPAGNE FAITE LE 2026-09-03 — et elle change les termes de la
  décision.** `docs/audits/k8-remesure-2017-2019.md` : les 11 entrées de
  SPC 2017 N / 2018 N / 2019 N re-mesurées contre un second correcteur
  d'une autre main. **8 confirmées, 2 réfutées.** La surface passe de 89 à
  78 entrées, et surtout le taux de défaut cesse d'être supposé : **27 %**,
  soit une vingtaine d'entrées suspectes parmi les 78 restantes.

  **Deux dossiers de litige neufs, qui s'ajoutent aux trois du §6.5** —
  `bk-2018-n-x3` (période lue 2 ms contre 2,513 mesurée, donc 58 % d'écart
  sur L, et une description de figure qui décrit un dessin inexistant) et
  `bk-2018-n-x4b` (période et phase fausses en banque ET dans le sommet
  rendu à l'élève : le premier cas d'HÉRITAGE attesté, celui que K-8 dit
  indétectable de l'intérieur). **Rien n'a été corrigé** — même règle que
  les trois autres : une valeur en litige se documente, l'owner tranche.

  **Ce que la campagne apporte pour la suite, plus que ses deux prises :**
  un TROISIÈME mode d'échec, le **drapeau perdu** (la transcription écrit
  « lecture à confirmer », la conversion garde la valeur et laisse la
  réserve derrière), et le tri qui en découle — **4 lectures fausses sur 6
  drapeautées contre 1 sur 9 non drapeautées**. La prochaine campagne doit
  trier `lectures-graphiques.md` par drapeau non levé, pas par nombre de
  mentions.

### 6.5 bis Deux critères nés de la campagne, à réutiliser

Ils ne figuraient nulle part et ils valent pour tout le corpus :

- **On ne partitionne pas à travers un renvoi imprimé.** La vérification de
  SExp 2018 a écarté un découpage parce que l'énoncé porte, noir sur blanc,
  « on pourra utiliser le résultat de la question II)3)b) » : une carte
  autonome rendrait ce renvoi pendant, donc cassée pour l'élève qui l'ouvre
  seule. Quand la dépendance est seulement *mathématique* et non imprimée — le
  cas de SM 2021 — le partitionnement reste licite, à condition que la carte
  aval **rétablisse le résultat sur place** au lieu d'y renvoyer.

- **Un défaut apparent du sujet peut être un artefact de la chaîne de
  diffusion.** Avant d'écrire « défaut du sujet officiel », il faut avoir
  regardé la source la moins dégradée qu'on puisse atteindre. Sur SM 2021, un
  « + » que la transcription croyait amputé est **intact** dans la couche
  300 dpi embarquée du PDF : le trou venait du sous-échantillonnage
  300 → 150 d'AlloSchool. Sur SExp 2018, à l'inverse, le PDF a **confirmé** un
  défaut réel — il n'y a aucun point de code là où on croyait lire un symbole.

### 6.6 Une note de méthode qui vaut plus que les correctifs

Au cours de cette session, **plusieurs agents ont refusé une de mes
instructions, et chaque fois ils avaient raison** : l'un a recompté 17 barèmes
là où j'en annonçais 13 ; un autre a refusé d'antidater sa passe en citant mon
propre commit sur les dates fausses ; un troisième m'a averti qu'un fichier
bougeait sous mes pieds pendant que j'allais le commiter. Deux autres ont
signalé d'eux-mêmes la seule porte qu'ils ne pouvaient pas fermer plutôt que
de laisser croire au quitus.

**Écris les briefs pour que ça reste possible.** Ne donne pas un compte que tu
n'as pas vérifié — dis « prends-le dans la source et recompte ». Demande
explicitement de rapporter les écarts au lieu de les lisser. Le corpus s'est
amélioré à chaque fois qu'un agent m'a contredit.

---

## 7. Addendum du 2026-09-03 — l'arc « les instruments mentaient »

> Écrit en fin de session, sur ce qui a réellement atterri. Deux passes de
> vérification (SPC 2012 R et 2013 R) étaient encore en vol au moment de
> l'écriture : elles ne sont PAS comptées ici.

### 7.1 Le fil conducteur, et il vaut plus que la liste des correctifs

**À chaque fois, l'outil censé détecter le problème affirmait qu'il n'y en
avait pas.** Ce n'est pas une coïncidence de la soirée, c'est un mode d'échec
à reconnaître :

- `figure-preview` rendait des SVG effondrés à **zéro pixel** et concluait
  « aucun défaut » — sur un rendu nul, `getBBox()` renvoie des boîtes nulles,
  donc aucun texte ne peut sortir d'un cadre nul. L'œil ET la mesure morts
  ensemble, sans un signal. Il refuse désormais de capturer ce qu'il n'a pas
  rendu.
- Le **contrat de couleur** des figures était écrit dans le skill, son grep de
  contrôle prescrit, et la docstring de `figure-preview` affirmait que
  `validate-content` le vérifiait déjà. **Cette porte n'avait jamais existé.**
- Le **registre d'aria-labels** avait l'air complet : il couvrait 144 figures
  sur 246, et les 102 autres étaient annoncées à l'élève par leur slug
  (« arbre pondere »).
- L'**inventaire des 89 lectures de figure** était bâti à la main sur une
  banque de 187 entrées ; elle en comptait 234. 47 entrées jamais passées au
  repérage, toutes servies.
- Le dépôt annonçait à **deux endroits** une dette payée douze jours plus tôt
  (la figure `arbre-pondere`), et j'ai commencé la session en me préparant à
  la payer une seconde fois avant de faire un `ls`.

**La contre-mesure n'est pas « mieux lire les documents ». C'est de mesurer le
rendu, et d'exiger d'un instrument qu'il prouve avoir rendu quelque chose
avant de croire ce qu'il dit.**

### 7.2 Et mes propres corrections ont fait la même chose deux fois

À consigner sans indulgence, parce que c'est la même leçon vue de l'intérieur :

1. Mon correctif d'ordre des exercices, appliqué entrée par entrée, **a cassé
   les épreuves mixtes** : le « Problème » des sujets SExp remontait avant
   l'exercice 4, alors qu'il tombait correctement en dernier auparavant.
   Trouvé en mesurant le rendu, pas en relisant le correctif.
2. Mon **test négatif de garde passait** — j'avais neutralisé la lecture du
   libellé, mais la ligne suivante rattrapait silencieusement. Un test qui ne
   casse que la moitié d'une chaîne ne prouve rien sur la garde.

**Un test négatif doit casser la chaîne ENTIÈRE que la garde protège.**

### 7.3 Ce qui a changé pour l'élève

- **SPC 2011 normale et 2015 rattrapage converties** — 35ᵉ et 36ᵉ épreuves
  complètes, 20,00 chacune. Le corpus ne compte plus **aucune épreuve
  invisible** (36 complètes, zéro sous le seuil, une seule dans la bande : SM
  2020, suspendue sur K-0), et cette propriété est désormais **gardée**.
- **Quatre épreuves sortaient dans le désordre** — 2010 N, 2011 N, 2011 R,
  2012 N. Trois sont réparées ; 2011 R ne peut pas l'être sans renommer un
  identifiant (voir 6.5, K-7 bis).
- **17 figures avaient du texte rogné**, dont une unité d'axe affichée
  « λ (n » sur la figure qui enseigne les raies spectrales.
- **102 figures** étaient annoncées aux lecteurs d'écran par leur slug.
- **Neuf figures déversaient leur CSS sur toute la page** — une figure en
  démolissait une autre, quatorze textes hors cadre.

### 7.4 K-8 recule pour la première fois — et deux valeurs publiées tombent

`docs/audits/k8-remesure-2017-2019.md`. 11 entrées re-mesurées contre un
second correcteur d'une autre main : **8 confirmées, 2 réfutées**. Surface
89 → 78 (puis recomptée à 143 sur 234 par le générateur neuf, voir 7.5). Taux
de défaut mesuré : **27 %**.

`bk-2018-n-x4b` est le **premier cas d'HÉRITAGE attesté** : période et phase
fausses à la fois en banque et dans le sommet rendu à l'élève. Le contrôle qui
tranche ne demande aucune mesure fine — six extrema sur 1,25 s, impossible
avec la période publiée.

**Troisième mode d'échec, neuf : le DRAPEAU PERDU.** La transcription écrit
« lecture à confirmer », la conversion garde la valeur et laisse la réserve
derrière. **4 lectures fausses sur 6 drapeautées, contre 1 sur 9 non
drapeautées** — c'est le meilleur prédicteur connu, et il commande l'ordre de
la prochaine campagne (`docs/audits/drapeaux-non-leves.md`).

### 7.5 Trois documents qui ne peuvent plus pourrir en silence

- `lectures-graphiques.md` est **généré** (`web/scripts/lectures-graphiques.mjs`,
  mode `--check`). Sa calibration contre le relevé manuel a corrigé **les deux
  listes** : deux faux positifs du manuel (il comptait « figure » dans des
  phrases disant qu'il n'y en a pas) et un vrai manque du script.
- `drapeaux-non-leves.md` — l'ordre de passage, avec ses limites dites : la
  valeur la plus fausse trouvée à ce jour ne portait de drapeau **nulle part**.
- `gisement-arabophone.md` — 34 paires sujet+corrigé, mais la réserve compte
  autant que la trouvaille : **de 2020 à 2024, l'arabe et le français sont de
  la même main**. Deux documents, un seul témoin.

### 7.6 La provenance se pose sujet par sujet, jamais par série

Trois cas, trois réponses, à un an d'intervalle : l'édition française de
**2010 R est une traduction professorale** (crédit signé, cartouche
anachronique, aucun code d'examen) ; celles de **2012 R et 2013 R sont
ministérielles** (code `RS28` imprimé, identique à l'arabe pour 2013 R).

La vérification de 2010 R a créé une catégorie de défaut qui n'existait pas —
l'**artefact de traduction**, distinct du défaut imprimé et de l'artefact
d'extraction — en trouvant une consigne **durcie** par le traducteur
(« établir » là où l'arabe écrit « écris »). Elle **ne s'applique pas** aux
deux sujets ministériels.

Et un piège d'extraction neuf, à porter au protocole : **les chiffres de la
couche de texte arabe peuvent être faux ET PLAUSIBLES** (« الشكل 1 » s'extrait
« الشكل 3 »). Rien ne signale l'erreur. Sur une source arabe, un chiffre
extrait ne vaut rien tant qu'il n'a pas été **regardé au rendu**.

### 7.7 Les corrigés, jaugés pour ce qu'ils sont

**Trois corrigés pris en défaut dans la même soirée** : celui de 2010 R (+1,2 %
sur la masse de Mars), celui de 2012 R (divise par le volume d'ester au lieu du
volume total, facteur 3,33), celui de 2013 R (**se contredit lui-même** — il
lit 10 mJ aux deux tiers de l'amplitude, ce qui impose 22,5, et écrit 25).

Le contrôle marche dans les deux sens : sur PC 2017, c'est le vérificateur qui
s'était trompé là où le corrigé avait raison. **Témoin de valeurs, jamais
arbitre** — K-8 le dit, et la soirée l'a vérifié quatre fois.

---

## 8. Addendum du 2026-09-04 — l'arc « le produit sur un téléphone »

### 8.1 Le fil conducteur

Tout le harnais visuel de ce projet a été construit sur l'écran du
propriétaire : les portes de débord tirent à 1536 et 1920 px, les trois
balayages de figures ont tourné à 1280, les captures de référence aussi. Le
produit, lui, s'adresse à des lycéens marocains — qui lisent sur un
téléphone. **Personne n'avait jamais mesuré les 62 leçons sous 1280 px.**

Une journée de mesure à 320/360/390 px a sorti **quatre défauts réels**,
tous invisibles depuis un écran d'ordinateur, tous corrigés et gardés :

| # | Ce que l'élève subissait | Ampleur | État |
|---|---|---|---|
| 1 | La page glisse latéralement sous le doigt | 4 leçons à 320 px, 1 à 360 | corrigé, porte armée |
| 2 | Le texte des figures rendu à 3 px | **260 figures sur 260** | corrigé, porte armée |
| 3 | Une cible de 7 px, invisible, collée à chaque titre | 1 832 ancres | retirées sous `hover: none` |
| 4 | Fils d'Ariane sous le minimum tactile de la norme | 65 pages | 21 → 29 px |

**Aucun de ces défauts n'était un défaut d'autorat.** Les figures sont
impeccables à 1280 px ; les formules sont justes ; les liens sont les bons.
Ce sont quatre RÈGLES DE RENDU qui manquaient, et qui manquaient parce que
la mesure s'arrêtait à une largeur.

### 8.2 La règle qui les résume

**Jamais sous la taille naturelle, jamais un contrôle invisible.** Un dessin
est autoré à une échelle où son texte se lit : en dessous il ne se lit plus,
donc sous 600 px le cadre défile et le SVG garde sa largeur de viewBox. Une
formule en ligne est insécable : elle défile dans son conteneur au lieu de
pousser la page. Une ancre qui n'apparaît qu'au survol n'existe pas sur un
appareil sans survol : elle est retirée, pas rétrécie.

Dans les trois cas, l'idiome existait déjà dans le produit
(`.katex-display` défile depuis toujours) — il n'avait simplement jamais été
appliqué là où il fallait.

### 8.3 Le même jour, deux autres défauts de la même famille

**Le lien d'ancre profonde était mort pour 86 % du corpus.**
`location.hash` revient percent-encodé dès qu'un caractère sort de l'ASCII ;
`getElementById` ne trouvait donc rien pour 1 876 des 2 190 titres de leçon —
c'est-à-dire tout titre portant un accent. Comme la pagination masque tout
sauf le chapitre courant, le lien partagé n'atterrissait pas « un peu à
côté » : il atterrissait sur le chapitre 1, la cible dans un `[hidden]`.
Corrigé (`decodeURIComponent` gardé), porte armée sur une ancre ACCENTUÉE.

**Et le « flash du chapitre 1 » a enfin un chiffre** : 250 à 1 265 ms selon
la leçon (ledger 11.14). L'arbitrage était écrit depuis Day-11 ; sa durée ne
l'était pas. Ce qu'on n'a délibérément pas fait pour le supprimer — et
pourquoi — est en 11.15, et c'est une décision de propriétaire.

### 8.4 La leçon de méthode, pour la prochaine session

Les quatre défauts du §8.1 étaient **mesurables depuis le premier jour**. Ce
qui manquait n'était ni un outil ni une compétence : c'était **une largeur
dans la liste des largeurs**. Chaque fois que ce projet a élargi la fenêtre
de mesure — le rendu plutôt que la source, le thème sombre plutôt que le
clair, le téléphone plutôt que l'écran large — il a trouvé une classe entière
de défauts, jamais un cas isolé.

La prochaine fenêtre à ouvrir, dans l'ordre où je la prendrais :
**le clavier seul** (parcours de focus, ordre de tabulation, pièges) ; **le
zoom à 200 %** (SC 1.4.4, jamais mesuré) ; **la connexion lente** (ce que la
page montre avant que tout soit chargé).

### 8.5 Les trois fenêtres suivantes, ouvertes le même jour

**Le clavier seul — RIEN.** 264 arrêts de tabulation sur quatre surfaces :
aucun focus dans un chapitre masqué, aucun arrêt invisible ou de taille
nulle, aucun `tabindex` positif, aucun piège, un indicateur visible partout.
Un résultat négatif, armé quand même : cette classe régresse en silence.

**Le texte à 200 % (SC 1.4.4) — 227 signalements, ramenés à 0.** *[CORRIGÉ le
2026-09-05, §11.16 : ce zéro n'était pas reproductible. L'arbre de ce
commit (6dfcb92), reconstruit dans un worktree et balayé par son propre
script sur une machine à froid, rend 61 débords à 360 px. Les 61 étaient
réels et sont corrigés à la source le 2026-09-05 ; la cause du faux zéro
d'hier n'est pas établie.]* Trois
causes, toutes structurelles : onze titres de leçon débordaient parce qu'une
piste de grille sans `min-w-0` ne peut pas descendre sous la largeur
min-content de son contenu (`overflow-wrap: break-word` autorise la coupure
du mot mais ne change PAS cette largeur — il faut les deux) ; huit tableaux
poussaient la page parce que leur confinement défilant était enfermé dans une
media query de largeur alors qu'il traite un rapport contenu/boîte ; et les
titres des cartes d'exercice étaient COUPÉS par le `overflow-hidden` qui
arrondit leurs coins — jusqu'à 55 px de texte perdu, sans ellipse.

**La structure de titres (WCAG 1.3.1) — 79 sauts `h2 → h4`,** tous en philo,
une convention d'autorat et non un accident. 327 titres renivelés, ancres
inchangées (rehype-slug lit le texte, pas le niveau). Tout le reste de
l'ossature était propre : h1 unique, figures nommées, boutons nommés, listes
bien formées.

**La connexion lente — un défaut, et il est à l'arbitrage.** Le *Cumulative
Layout Shift* (ce que la page fait bouger en chargeant) vaut **0,000 sur les
sept pages testées sans bridage** — c'est exactement pourquoi personne ne
l'avait vu, une machine de développement ne peut pas trouver ce défaut. Bridé
à 3G lent, **`/examens/<id>` décroche à 0,320 (« mauvais » au sens Core Web
Vitals)** : le bouton « Commencer l'épreuve » monte de 98 px, 8,4 secondes
après le début du chargement. Un élève qui appuie à cet instant appuie à côté.

Cause isolée par élimination : fontes bloquées, le CLS tombe à 0,000. C'est
l'échange de fonte (`font-display: swap`) qui recoupe les lignes du seuil
d'épreuve. Les fontes sont déjà préchargées et leurs substituts portent déjà
un `size-adjust` : ce n'est pas un oubli de configuration.

**GATE PROPRIÉTAIRE.** Un essai a chiffré l'option : passer le sérif en
`display: optional` fait tomber `suites-numeriques` de 0,091 à 0,002 mais ne
change rien sur la page d'épreuve, dont le texte est en fonte d'INTERFACE.
L'essai a été défait — changer le `font-display` de la fonte d'identité
modifie ce qu'un élève voit en première visite lente, et c'est un arbitrage,
pas un correctif. Outil : `web/scripts/cls-sweep.mjs`. Pas de porte armée :
on n'arme pas une porte sur une classe qui n'est pas propre.

### 8.6 Les figures, le même jour : deux instruments de plus et une porte

Trois choses, toutes mesurées, aucune décorative.

**1. Le thème sombre a enfin été regardé.** Quatrième sonde de
`figure-preview` : la part du cadre couverte, en thème sombre, par une forme
CLAIRE dont la couleur n'est pas un jeton — c'est-à-dire une couleur qui ne
bascule pas avec le thème. **Deux figures sur 258, et ce sont les deux
connues** (`loi-mailles-build` 59 %, `energy-exchange` 51 %, la paire sous
dette owner). Le contrat de couleur tient donc au RENDU, pas seulement à la
source.

**2. Une classe nommée la veille a été fermée le lendemain.** « Le texte qui
sort de SON panneau » — l'étiquette du panneau A qui empiète sur le panneau
B et semble parler de B. Cinquième sonde. 9 cas : 4 débordements VOULUS
(déclarés `data-hors-panneau`, avec leur raison dans le fichier), 5 défauts
corrigés — dont deux chiffres du panneau « cas audio » écrits dans le
panneau « cas porteuse », et une plaque de synthèse de 416 px sous un texte
de 567.

**3. Une porte, et seulement là où c'est propre.**
`figure-preview --porte` tourne en CI sur les 258 SVG statiques et arme
**deux** classes — « déborde » et « hors panneau » — parce qu'elles sont à
zéro. Les trois autres restent des outils : leur classe n'est pas vide, et
armer une porte sur une classe sale oblige à la désarmer le lendemain.

**La campagne des tracés, elle, s'est arrêtée à un état net.** 195 → 71 cas
en huit vagues, 91 → 39 figures ; les tranches ≥ 60 %, 40–59 % et 30–39 %
sont VIDES ; et **les sept cas restants au-dessus de 20 % portent chacun une
raison écrite dans leur fichier** — deux dettes owner, deux dans une scène
3-D où aucune position n'est libre, trois où les déplacements essayés
faisaient pire. Ce n'est pas un reliquat, c'est une décision.

### 8.7 Le poids et la réactivité — un arbitrage de plus, et un défaut vivant

Premier angle mort de la liste `INSTRUMENTS.md`, ouvert et refermé le même
jour. Le détail complet est dans `docs/audits/poids-et-reactivite.md` ; voici
ce qu'un successeur doit savoir sans l'ouvrir.

**LE FAIT.** Une leçon dense **se peint en 0,5 s et ne répond à aucun appui
pendant 6,7 s** sur un téléphone bon marché (processeur bridé ×6). Ce n'est
pas une page lente, c'est une page qui a l'air prête et qui ignore le doigt —
la pire forme. Invisible depuis une machine de développement : 0,86 s au même
endroit. Le témoin qui achève la démonstration : `svt/moyens-de-defense`,
leçon complète mais SANS formules, 1 506 nœuds, répond en 0,8 s.

**LA CAUSE.** 992 formules × ~40 nœuds de KaTeX = **43 000 nœuds, dont 92 %
de KaTeX et 98 % dans des chapitres MASQUÉS**.

**CE QUI A ÉTÉ FAIT, ET CE QUE ÇA VAUT.** KaTeX est désormais posé comme une
CHAÎNE HTML et non comme un arbre React (`web/src/lib/rehypeKatexHtml.ts`),
avec **identité du DOM prouvée octet par octet sur les 70 routes**
(`web/scripts/katex-identite.mjs`). Gain réel mais partiel : **−19 à −28 %
de blocage à ×6**, dans le bruit à ×4 et ×1. Environ une seconde et demie
rendue à l'élève visé. **Ça ne referme pas le sujet.**

**CE QUI RESTE — POUR LE PROPRIÉTAIRE.** Le vrai levier vaut ~85 % du
défaut : ne pas servir les 14 chapitres d'un coup. Mais cela casse quatre
propriétés que le produit tient aujourd'hui — l'impression déplie tout, le
⌘F du navigateur trouve dans toute la leçon, un lien profond s'ouvre sans
requête, et une fois chargée la leçon ne dépend plus du réseau. C'est une
décision de PRODUIT. Le chiffre est là pour qu'elle se prenne sur un fait,
pas pour la prendre.

**UN DÉFAUT VIVANT TROUVÉ EN CHEMIN.** Cinq leçons affichaient du **LaTeX
brut en rouge** à l'élève : un bloc `$$…$$` multi-lignes dont la fermeture
était collée en fin de ligne. `validate-content` disait « math ok » parce
qu'il extrayait les blocs avec une expression permissive ; `remark-math` ne
ferme que sur une ligne `$$` seule, avalait le paragraphe suivant et le
donnait à KaTeX. Corrigé dans les cinq leçons, et la règle est désormais une
porte, testée dans les deux sens. **Troisième défaut de la semaine dont la
cause est l'écart entre ce qu'une porte MODÉLISE et ce que le moteur FAIT.**

### 8.8 L'arabe des sujets de philo était rendu à l'envers

Trouvé par accident — en inspectant les fontes — puis mesuré proprement.
Détail dans `docs/audits/arabe-direction.md`.

**LE FAIT.** L'épreuve de philosophie du bac marocain est EN ARABE. Le
corpus transcrit donc les sujets réels en arabe, à côté de leur traduction
française : c'est la bonne décision de contenu. **49 blocs, dans 10 leçons,
étaient rendus `dir="ltr"`, sans `lang`, et en italique.** La dernière ligne
se collait à gauche, la ponctuation terminale passait du mauvais côté, un
lecteur d'écran lisait l'arabe avec une voix française, et le navigateur
PENCHAIT mécaniquement une écriture qui n'a pas d'italique.

**LE CORRECTIF EST AU RENDU** (`web/src/lib/rehypeDirectionRtl.ts`), jamais
dans le contenu : un bloc dont les lettres RTL sont plus nombreuses que les
latines reçoit `dir="rtl" lang="ar"`. Plus strict que `dir="auto"`, qui
décide sur le premier caractère fort et ferait basculer une phrase
française citant un terme arabe.

**ET C'EST LA PORTE QUI A TROUVÉ LES TROIS QUARTS DU DÉFAUT.** Écrite sur ce
qu'un œil avait vu, elle ne lisait que `lesson.md` — donc une leçon sur
onze. Élargie aux sidecars (les sujets vivent dans `exercises.yaml`), elle a
révélé une seconde famille de composants, `MdBlock`, partagée par toutes les
cartes d'exercice et de banque. **Écrire la porte AVANT de croire le
correctif fini : c'est la leçon réutilisable.**

### 8.9 Le jargon de rédaction : la campagne de juillet n'avait vu qu'un tiers

Un même geste, répété trois fois dans la journée, sur trois vocabulaires
différents. Le détail est dans les commits ; voici ce qui compte.

**LA MÉTHODE QUI A TOUT CHANGÉ : compter sur le RENDU, pas sur la source.**
La campagne de juillet avait nettoyé `lesson.md`, armé une porte, déclaré le
sujet clos. Mesuré sur ce que le navigateur donne à lire :
**529 codes de barreau et 19 « rung » encore sous les yeux d'un élève**, sur
38 leçons — dans les sidecars, les légendes de figures et les TITRES, que la
porte ne regardait pas. Puis, dans la foulée, **18 slugs de leçon**
(`la-verite`) et **6 références de dépôt** (`docs/sujets/…`, `exercises.yaml`,
`rupture-gate`). Trois classes, une seule cause : *une porte qui parle de la
SOURCE ne dit rien du RENDU.*

**ET UN DÉFAUT PLUS GRAVE QUE LA FUITE, TROUVÉ EN CHEMIN.** « rung 7 » est
une autre écriture de « R7 » ; la campagne de juillet traduisait le mot et
gardait le chiffre. Or R1 est le DEUXIÈME chapitre. **98 renvois publiés
pointaient un chapitre trop tôt** — « la chute verticale pure du rung 1 »
envoyait l'élève à l'accroche au lieu du rappel actif. Réparés en retrouvant
chaque endroit par une empreinte prise dans la version d'avant la campagne
(`scripts/reparer-renvois-rung.py`), jamais en devinant. Et 13 renvois
inter-notions sur 19 tombaient sur le mauvais chapitre d'une AUTRE leçon :
re-résolus contre la table de la leçon citée.

**ÉTAT FINAL — LES TROIS CLASSES SONT VIDES ET GARDÉES.** Codes de barreau
visibles : **529 → 1**, et le survivant est le résistor « R0 » du schéma RL,
qui vit dans un `<svg>` et dont le fichier déclare `CODES R LÉGITIMES:`.
Slugs de leçon : **18 → 0**. Vocabulaire de dépôt : **6 → 0**. Mot
« rung » : **19 → 0**. Une porte unique, dans `dom-truth`, tient les trois —
au niveau du RENDU, sans navigateur (le HTML des 62 leçons, `<script>`,
`<style>` et `<svg>` retirés), et testée dans les deux sens.

**LA DESCENTE DE 71 À 1 A COÛTÉ TROIS BOGUES DE LECTURE, PAS DE RÈGLES.**
Ils valent d'être connus :

  1. **`Consigne : …` était lu comme une clé YAML.** Le français met une
     espace avant le deux-points ; le lecteur de sidecars refermait donc le
     scalaire au milieu d'un paragraphe, et tout ce qui suivait n'était plus
     traité. **37 renvois survivaient dans des champs pourtant listés** — la
     faute n'était pas dans les règles, elle était dans la LECTURE du fichier.
  2. **Un scalaire YAML est coupé à la largeur, pas à la phrase.** Le
     déclencheur (« en ») finissait une ligne, le code commençait la
     suivante : ligne à ligne, aucune règle ne mordait. Les blocs sont
     désormais réécrits ensemble, sans jamais fusionner par-dessus une
     ligne vide ou une ligne de structure markdown.
  3. **Un « R1 » n'est pas toujours un barreau : en physique, c'est une
     RÉSISTANCE.** « Loi d'Ohm sur R1 » a failli devenir « Loi d'Ohm sur le
     chapitre 2 ». Garde : dans `content/pc/` seulement, une ligne portant du
     vocabulaire de circuit protège tous ses codes. (Et « tension » est
     aussi un mot de philosophie — la garde a dû être limitée à la physique
     après avoir protégé six renvois parfaitement traduisibles.)

**LA RÈGLE D'ÉCRITURE QUI EN DÉCOULE**, pour l'auteur suivant : une vraie
résistance s'écrit `$R_1$`. Cela rend « R₁ » — la bonne typographie pour une
grandeur physique — et cela ne ressemble plus à un code de rédaction.

**LE PIÈGE DE COMPTAGE, POUR LA PROCHAINE FOIS.** En cherchant les noms de
fichier dans le HTML dépouillé de ses balises, on en trouve 144 ; au
navigateur, sur `innerText`, on en trouve 6. Les 138 autres vivent dans le
`<title>` d'un SVG — le nom ACCESSIBLE de la figure, qui a le droit de nommer
son fichier et que personne ne lit. Une porte qui crie 144 fois pour six
vrais défauts est désarmée dans la semaine.

### 8.10 Le zoom à 400 % : le premier balayage de la journée qui ne trouve rien

WCAG SC 1.4.10 (Reflow) ne parle pas seulement d'une largeur. Il parle de
**320 × 256 px CSS** — une fenêtre 1280 × 1024 vue à 400 % de zoom, ce que
fait une personne malvoyante. Les deux balayages existants passaient à côté :
l'un mesure 320 px de large à hauteur normale, l'autre double le texte à
1280 de large. **Aucun ne mettait la HAUTEUR sous pression**, et c'est elle
qui fait mal : un en-tête collant de 57 px prend 22 % d'un écran de 256.

**Résultat : 70 pages, 0 défaut.** Pas de défilement à deux dimensions, et
il reste 7 à 9 lignes de prose sous les barres. La colonne de lecture bornée
et le seul en-tête collant du site tiennent la contrainte.

**C'est le premier balayage de la journée à ne rien trouver, et il fallait le
vérifier avant de le croire** : la sonde voit bien le `header.entete-site`
(57 px, `position: sticky`) sur chaque page — elle ne passe donc pas à vide.
Une porte qui ne trouve rien parce qu'elle ne regarde rien est pire qu'une
absence de porte.

Deux de ses quatre contrôles — aucun débord horizontal, au moins trois
lignes de prose lisibles — sont armés dans `dom-truth` sur sept pages
témoins, et **testés dans les deux sens** : un `min-width: 420px` posé sur la
colonne de prose fait échouer dix contrôles en nommant les 176 px de débord ;
retiré, tout repasse.

### 8.11 Le lien d'évitement était là où il ne sert à rien

Quatrième angle mort ouvert : ce qu'un lecteur d'écran ANNONCE. Détail dans
`docs/audits/annonce-lecteur-ecran.md`.

**LE DÉFAUT, SUR 68 PAGES SUR 68.** Le site avait un lien « Aller au contenu
de la leçon » — mais seulement sur les pages de leçon, et APRÈS l'en-tête.
Un lecteur d'écran devait traverser le wordmark, la recherche, le sélecteur
de filière et le menu Notions **avant d'atteindre le lien censé lui épargner
exactement ce trajet**. Sur les six pages hors leçon, il n'y en avait aucun.
Un lien d'évitement qui n'est pas le premier focusable n'est pas un lien
d'évitement.

**ET UN ATTRIBUT DE PLUS POUR QU'IL MARCHE.** Après activation, le focus
restait sur `<body>` : Chromium déplace le « point de départ de tabulation »
(la touche suivante tombe bien dans `<main>` — vérifié) mais ne focalise pas
la cible, et plusieurs lecteurs d'écran repartent alors du haut de la page.
`tabIndex={-1}` sur `<main>`, et le comportement cesse de dépendre d'une
heuristique de navigateur.

**LA MOITIÉ SAINE DU RAPPORT, qui compte autant.** Aucune région
`aria-live="assertive"` dans tout le site — les quatre familles de régions
live sont `polite`, et ce sont exactement les bons endroits (compteur
d'étape, position de chapitre, retour d'un choix, valeur d'une figure
interactive). Aucun recul franc dans l'ordre de tabulation sur 68 pages. Le
focus survit au changement de chapitre, et le changement est annoncé.

**LA PORTE NE VÉRIFIE PAS LA PRÉSENCE DU LIEN, ELLE VÉRIFIE QU'IL MARCHE** :
première tabulation, visibilité au focus, et déplacement réel du focus dans
`<main>`. Testée dans les deux sens.

### 8.12 Hors ligne : ce qui tient, ce qui casse, et ce que ça révèle d'un autre arbitrage

Cinquième angle mort. Détail dans `docs/audits/hors-ligne.md`.

**CE QUI TIENT, et c'est beaucoup.** Réseau coupé : la navigation par
chapitre marche (tout est déjà dans la page), le retour d'un QCM s'affiche,
le bouton Retour ramène la leçon **et sa place** (parti du chapitre 5, on y
revient), et la page survit au retour du réseau sans rien à recharger.

**CE QUI CASSE.** Tout clic vers une autre page fait sortir l'élève de
l'application, sur la page d'erreur de Chrome — titre « No internet », **en
anglais**, avec des conseils sur les câbles et le modem. Pour un élève
marocain de terminale, c'est un mur.

**ET LE RÉSULTAT QUI TRANCHE UN AUTRE ARBITRAGE.** Une leçon DÉJÀ VISITÉE ne
s'ouvre pas davantage hors ligne. On pouvait espérer que les ~920 ko de
préchargement RSC de l'accueil (§8.6 du poids) achètent au moins de la
résistance à la coupure : **ils n'en achètent aucune**. Le cache du routeur
expire, la requête RSC échoue, Next retombe sur une navigation dure. Le
préchargement est donc un coût de données pur — ce qui simplifie la décision
à prendre dessus.

**L'ARBITRAGE À PRENDRE** (rien dans l'app ne peut intercepter une
navigation dure qui échoue — il faudrait un service worker) : une page de
repli en français contre le risque, connu et déjà payé ici, qu'un service
worker mal invalidé serve une version périmée du site après un déploiement.
La casse étant bornée — l'élève ne perd ni sa place ni son travail — ce n'est
pas une urgence.

**ET UNE LEÇON DE MÉTHODE, encore.** Le premier jet du balayage concluait
« le bouton Retour ne ramène rien ». C'était FAUX : la scène précédente avait
poussé une entrée d'historique (un changement de chapitre), et le « Retour »
mesurait ce recul-là. Rejouée isolément, la scène dit l'inverse. **Une scène
de test qui hérite de l'état de la précédente ne mesure pas ce qu'elle croit.**

### 8.13 Le contraste des figures : trois passes fausses, un instrument honnête, et une classe de défaut qu'on n'avait pas imaginée

Dernier angle mort de la famille « figures », nommé la veille dans
`INSTRUMENTS.md` et fermé ici. `contrast-gate` juge les 80 paires de la
palette — toutes conformes — et **rien** du voisinage réel à l'intérieur
d'une figure. Une étiquette `--figure-accent` posée sur un aplat
`--figure-accent` à 16 % tombe à 4,36:1 sans qu'aucune porte ne bouge.

**LE COMPTE HONNÊTE : 101 textes** sous le seuil de SC 1.4.3, dans 35
fichiers. **71 corrigés** ; **30 versés au dossier owner** (les deux figures
`DETTE OWNER` de `rlc-serie`, servies à aucune leçon — voir plus bas).

**LA CLASSE QUE PERSONNE N'AVAIT IMAGINÉE.** Les étapes d'une figure sont
CUMULATIVES (`StagedFigure` : `wanted = fullyRevealed || n <= stage`, groupes
insérés en `beforeend`). Ce qu'un step peint recouvre **pour de bon** ce
qu'un step antérieur avait peint. Trois figures s'effaçaient elles-mêmes, et
leur contraste nominal était parfait — jusqu'à 17,35:1 :

- `produit-vectoriel-aire` : le parallélogramme du step-2, rempli en
  `--figure-surface` (blanc sur blanc, donc invisible au relecteur), effaçait
  l'étiquette « u » du vecteur — à l'instant précis où la leçon dit « le
  parallélogramme engendré par u et v » ;
- `univers-restreint` : le voile de restriction posé DEUX FOIS sur les mêmes
  cases (le rect du step-4 est strictement contenu dans celui du step-3),
  0,97 d'opacité cumulée : les effectifs n'étaient plus atténués mais effacés ;
- `independant-vs-incompatible` : le nom de l'univers, « Ω », posé à
  l'endroit exact que la bande B recouvre au step-2.

Trois AUTRES recouvrements sont voulus (l'ion Cu²⁺ qui devient un atome de
cuivre au même site, un titre remplacé, une porteuse redessinée en gras) :
ils déclarent désormais `RECOUVREMENT ASSUMÉ: « <le texte> » — <la raison>`,
et la sonde n'exempte **que ce texte-là**.

**TROIS PASSES FAUSSES AVANT LA BONNE**, et c'est le cœur de la leçon :
`elementsFromPoint` ne répond que dans la fenêtre visible (60 faux
positifs) ; une boîte englobante n'est pas une forme et une voile à 28 %
n'est pas un aplat (418 défauts annoncés) ; une capture `fullPage` avec
`clip` ne peut pas être allouée sur une page de 100 000 px de haut, et rend
le fond de page — **soixante-dix textes parfaitement lisibles certifiés
invisibles**. À chaque fois l'instrument était sûr de lui.

**D'OÙ LA RÈGLE, écrite dans `INSTRUMENTS.md` : le modèle propose, les pixels
disposent.** La sonde raisonne (géométrie exacte via `isPointInFill`, ordre
du document, `fill-opacity`, opacité des groupes) pour DIRIGER LE REGARD ;
puis un étage pixel capture la zone, cache le texte, recapture, et prend la
couleur médiane du fond. Le verdict rendu est celui des pixels. Et
l'instrument porte son **témoin** : un fond mesuré égal au fond du corps de
la page est impossible à l'intérieur d'une carte de figure — dans ce cas il
refuse de trancher au lieu d'inventer un défaut.

**CE QU'IL FAUT SAVOIR POUR NE PAS RÉGRESSER.**

1. Le modèle seul manque **17 %** des cas (84 candidats contre 101 défauts
   réels) : il ne peut pas voir un texte recouvert par une forme peinte
   APRÈS lui. **Pour une campagne, c'est `--pixels-tous` qui fait foi** —
   deux captures par texte, ~25 min sur les 258 figures. La passe rapide
   sert à surveiller une correction, pas à certifier un corpus.
2. Les correctifs suivent quatre règles, à appliquer telles quelles :
   un texte sur un **aplat plein** prend `--figure-surface` ; un texte sur
   une **teinte** prend `--figure-ink` (l'aplat porte déjà le rôle) ; on
   **n'atténue jamais par `opacity`** un texte qui porte une information —
   on l'atténue par l'encre ; et `--figure-grid` **n'est pas une encre**
   (utilisé comme tel, il écrivait le repère d'une figure à 1,03:1).
3. **La mesure est celle du thème CLAIR.** Les correctifs sont tous en
   jetons, donc ils basculent ; le balayage `--dark --pixels-tous` reste à
   faire et c'est le prochain angle mort de la liste.

**LE DOSSIER OWNER S'ALOURDIT D'UN TROISIÈME DÉFAUT.**
`loi-mailles-build.svg` et `energy-exchange.svg` (HANDOFF §0, point 7 bis,
« fix or delete ») : leurs textes tombent entre **2,34:1 et 4,32:1**, avec
des gris et des bleus **hors palette** (`#8A8A92`, `#7E9CC8`, `#6B6B72`,
`#B06040`, `#8A6A3A`). Ce ne sont pas des jetons : le contraste n'y est pas
réparable par une bascule de thème. Si la décision est « on garde », ces
figures sont à **refaire**, pas à retoucher.

### 8.14 Le 2026-09-05 : quatre rendus du produit que personne n'avait regardés

Le fil du 2026-09-04 était « le produit sur un téléphone ». Celui-ci est plus
simple encore : **une page n'est pas le seul rendu d'un produit.** Un élève
qui révise COPIE, IMPRIME, et lit sur un réseau qui rampe ; et ce qu'il
obtient dans ces trois cas n'avait jamais été mesuré. Le quatrième rendu est
la langue elle-même.

**1. LE PRESSE-PAPIER — chaque formule sortait EN DOUBLE.** KaTeX rend chaque
formule deux fois (MathML pour les lecteurs d'écran, HTML pour l'œil) ; le
premier est masqué VISUELLEMENT mais reste dans la SÉLECTION. ⌘A ⌘C donnait
« la tension u C ( t ) u C ​ (t) aux bornes ». **138 773 caractères parasites
sur 62 leçons.** Deux lignes de CSS (`user-select: none` sur `.katex-mathml`)
et il n'en reste zéro, sur 22 947 formules. La lecture d'écran n'est pas
touchée : c'est `aria-hidden` qui la gouverne.

**2. L'IMPRESSION — le papier n'a pas de thème.** Cinq contrôles sur six
passaient déjà (chrome masqué, TOUS les chapitres dépliés, rien hors colonne,
figures dans la page, noir sur blanc). Le sixième : un élève qui LIT EN THÈME
SOMBRE imprimait ses figures sur fond `#1A1917` — des aplats noirs pleine
page. Le bloc `@media print` remettait le corps en blanc mais pas les jetons
de figure, et `.dark` gardait la main. Corrigé À LA SOURCE DES JETONS :
`generate-tokens.mjs` émet désormais la palette claire sous `@media print`.

**3. LE RÉSEAU QUI RAMPE — le cours est lisible, la page est morte, personne
ne le dit.** Sous 20 % de pertes, la perte d'UN SEUL morceau de JavaScript
laisse 5 100 caractères de cours parfaitement lisibles et la page entièrement
sourde. Aucun composant React ne peut prévenir : dans ce cas, il n'est jamais
monté. D'où la **veille d'hydratation** — un bandeau rendu par le SERVEUR, un
script EN LIGNE qui le révèle si le signal de vie manque à 12 s, et
`SignalVivant` qui le referme si l'hydratation finit par arriver.

**4. LA TYPOGRAPHIE — deux apostrophes pour le même mot, à trois centimètres.**
Le corps d'une leçon écrivait « le pendule d’énergie » ; le rail des
chapitres, juste à côté, « le pendule d'énergie ». ~1 100 écarts hors prose,
tous corrigés à leur source (figures, `\text{}` des formules, titres, libellés
du programme). 69 pages, zéro écart.

**CINQ PORTES DE PLUS EN CI** : contraste des figures en clair ET en sombre,
presse-papier, impression, typographie. Toutes avec leur test négatif joué.

**ET LA LEÇON DE MÉTHODE DU JOUR — elle vaut pour tout ce qui suit.**

- *Une scène de test qui échoue doit prouver qu'elle a EU LIEU.* Le balayage
  réseau a produit deux conclusions spectaculaires — « un clic vers une autre
  leçon échoue en silence », « la route reste morte après le retour du
  réseau » — et un diagnostic élaboré par-dessus. Les deux étaient FAUSSES :
  le lien cliqué était dans le panneau replié du header, boîte 0×0,
  `page.click` expirait, et un `.catch()` vide avalait l'erreur. **Un
  `.catch()` vide est l'endroit exact où un instrument commence à mentir.**
  Un composant d'interface avait déjà été écrit pour ce défaut imaginaire ; il
  a été supprimé.
- *Une passe automatique se relit sur le DIFF, pas sur son décompte.* La
  réparation d'une insertion malheureuse a vidé la constante `NNBSP` de
  `frenchTypography.ts` — désactivant en silence le normalisateur de tout le
  produit. Rattrapé au `git diff`, avant tout commit.
- *Vérifier l'outil AVANT d'éditer le corpus.* KaTeX refuse U+202F ; on l'a su
  en le lui demandant, pas en cassant 35 fichiers.

---

## 9. Addendum du 2026-09-05 — l'arc « ce que l'item dit sans le dire »

> Quatre défauts, tous dans le CONTENU plutôt que dans le code (le dernier
> avec un bug de générateur en prime), tous invisibles pour tous les
> instruments existants, tous mesurés puis clos puis gardés. Ils partagent un
> trait qui vaut d'être retenu : **le harnais les avait sous les yeux et ne les
> regardait pas.**

### 9.1 L'indice de longueur — le défaut que l'outil annonçait lui-même

`item-stats.mjs` mesurait depuis toujours deux biais de la clé de correction.
Le premier, la POSITION, est réglé par un mélange déterministe. Le second, la
LONGUEUR, ne l'est pas — et le script le disait dans sa propre documentation :
*« length-tell is NOT fixed by shuffling order — reported for visibility. »*
La colonne s'affichait à chaque exécution (svt 92 %, pc 53 %, maths 36 %) et
personne ne s'en était emparé.

**Mesuré :** 1 465 items QCM éligibles, **38 %** où la clé est strictement la
plus longue, **24 %** où l'avance se VOIT (≥ 20 caractères ET ≥ 20 % de la
deuxième). Onze notions de SVT à **100 %**. Pire item : 331 caractères contre
157.

**Fait :** ~1 100 choix réécrits sur 340 items. **Les 62 notions sont à zéro.**

**Gardé :** `web/scripts/indice-longueur.mjs --porte`, scellé à
**0 direct + 0 inverse sur 1 458**. Il a commencé sa vie en CLIQUET (une
notion en dette ne peut pas s'aggraver, une notion neuve naît sous plafond),
parce qu'exiger 25 % partout aurait échoué au premier commit ; les deux
campagnes l'ont amené à zéro, ce qui en fait aujourd'hui une porte franche.

**À lire avant de reprendre :** `docs/audits/indice-longueur.md` — notamment
les TROIS remèdes et comment choisir entre eux, et les deux cas où
l'instrument doit céder devant la pédagogie (`BON-19`, où les mauvaises
réponses sont courtes PARCE QUE c'est ce qui les rend mauvaises).

**Seconde campagne, l'indice INVERSE (clé strictement la plus COURTE) :**
15 % du corpus au départ, jusqu'à 52 % sur `pc/aspects-energetiques` — fermé
lui aussi, et désormais dans la même porte. Le geste est symétrique : la clé
courte est presque toujours une valeur nue ou un verdict nu, à qui l'on rend
SA justification. Deux points à retenir avant d'y toucher — (1) le rapport se
prend ici sur la CLÉ, pas sur la deuxième : une clé de 30 caractères au milieu
de trois réponses de 90 saute aux yeux, 30 caractères d'écart entre 300 et 330
non ; (2) la cible est le MILIEU du peloton, pas le sommet — une clé allongée
jusqu'à devenir la plus longue retourne simplement l'indice dans l'autre sens,
et la porte l'a refusée en direct sur `AE-26`.

**Reste ouvert :** la valeur diagnostique réelle des distracteurs allongés,
que rien ici ne mesure : c'est une relecture de la voie pédagogie.

### 9.2 Les accents perdus — un produit qui enseigne l'orthographe qu'il écrit

`typo-francaise.mjs` vérifie la PONCTUATION du texte rendu. Il ne regarde pas
les LETTRES. Le corpus contenait, à côté d'une prose soignée, des passages
entiers désaccentués : « Reduction au meme denominateur », « L'eleve croit que
la recurrence d'Euler resout exactement l'equation differentielle ».

**Mesuré au rendu :** 128 occurrences sur 65 pages, dans les libellés d'items
et les titres d'exercices. **Fait :** 4 060 accents rendus à la source en cinq
vagues. **Gardé :** `web/scripts/accents-manquants.mjs --porte`, zéro.

**Trois pièges, tous attrapés avant écriture**, et tous détaillés dans
`docs/audits/accents-francais.md` : les identifiants (`mc.philo.etat.…`), le
POINT qui sépare un identifiant ET termine une phrase, et les formules à
cheval sur deux lignes d'un bloc plié YAML.

**Un effet de bord qui vaut un avertissement général :** la régénération de
`lectures-graphiques.md` après la campagne fait remonter une entrée de 16 à 17
mentions — un « d'apres la figure » devenu détectable. **Un corpus mal
accentué rend aveugles les outils qui cherchent du français.** L'inventaire de
l'exposition K-8 comptait par défaut, et rien ne pouvait le signaler.

**Reste ouvert :** la source non rendue (champs `description` des
misconceptions, notes de banque hors page) reste partiellement désaccentuée.
Dette bornée, connue, sans effet sur l'élève.

### 9.3 L'indice de l'absolu — la deuxième chose que l'item dit sans le dire

Tous les manuels de stratégie de QCM enseignent la même règle : **« barre les
réponses qui contiennent toujours, jamais, uniquement, aucun »**. Elle marche
parce qu'un rédacteur fabrique ses distracteurs en poussant une idée jusqu'à
l'excès, et que l'excès s'écrit avec ces mots-là.

**Mesuré :** sur 1 619 items éligibles, **106** où éliminer tout ce qui
sur-affirme ne laisse qu'UNE réponse debout — et dans **54** cas c'est la
bonne. **51 %**, contre 25 % au hasard. Un élève qui n'a rien révisé doublait
sa note sur ces items-là.

**Fait :** 54 items, ramenés à **0**. Quand la stratégie tranche encore (52
items), elle désigne désormais un distracteur.

**Gardé :** `web/scripts/indice-absolu.mjs --porte`, en CI, scellé à 0 direct
et 70 inverse.

**Les deux remèdes, et celui qu'il ne faut surtout pas prendre.** Le remède
interdit est de désarmer les distracteurs : dans la quasi-totalité des cas,
l'absolu d'un distracteur **est ce qui le rend faux** (« une transformation
spontanée est *toujours* rapide »). Le retirer détruit l'erreur que l'item
diagnostique. Les deux remèdes légitimes sont (1) **rendre à la clé l'absolu
VRAI qu'elle a le droit de porter** — une loi, une définition, un théorème
s'énoncent absolument, et les écrire ainsi est plus juste, pas moins : 50 des
54 items ; (2) retirer l'absolu **gratuit** d'un distracteur, celui dont
l'erreur est ailleurs : les 4 autres.

**Pourquoi l'inverse n'est pas ramené à zéro :** sur les 424 items où un seul
choix porte un absolu, c'est la clé 70 fois — **17 %, sous le hasard**. La
stratégie symétrique fait perdre des points ; il n'y a rien à corriger, il y a
seulement à empêcher que ça grandisse, et le cliquet le fait.

**À lire :** `docs/audits/indice-absolu.md`.

### 9.4 La couverture diagnostique — le moteur ne voyait rien sur une notion sur quatre

**Le défaut le plus grave de la journée, et le plus silencieux.** Le seul fil
qui relie « l'élève se trompe » à « le produit sait quoi lui proposer ensuite »
est un champ : `misconception:` sur un distracteur. Sans lui, une mauvaise
réponse n'est qu'un point perdu et le produit redevient un quiz.

**Mesuré :** 1 017 distracteurs sur 4 855 sans aucun tag ; 47 tags pointant un
id non déclaré ; et **17 notions sur 62 AVEUGLES** — aucune misconception n'y
atteignant le plancher de 3 items du banc, donc jamais évaluable. La **SVT
entière** en faisait partie.

**Un bug de générateur, en prime.** Le corpus écrit aussi
`misconception: [a, b]` (un distracteur peut exhiber deux erreurs à la fois).
`build-learner-inputs.mjs` et son jumeau client `payload.ts` testaient
`typeof === "string"` : ces choix ne comptaient pour rien. Résultat mesuré sur
`pc/systemes-oscillants` : `M-OSC-RES-3` restait à 2 items dans la carte des
planchers pendant que le décompte écrit à la main dans le fichier annonçait 4
et `floor_met: true`. **Une vérification qui affirme sans mesurer — le mode de
défaillance que la règle des blocs de vérification existe pour empêcher,
déplacé d'une migration vers un générateur.**

**Fait :** 1 017 → **111**, et ces 111 sont tous des `misconception: null`
EXPLICITES, c'est-à-dire des décisions d'auteur. **Zéro omission, zéro
fantôme, zéro notion aveugle, 416 misconceptions évaluables (contre 340).**
Aucune erreur inventée : chaque inventaire est tiré des `feedback` déjà écrits
sur les distracteurs.

**Gardé :** `web/scripts/couverture-diagnostique.mjs --porte`, en CI. Porte
FRANCHE sur les omissions et les fantômes ; cliquet sur le reste ; le nombre de
misconceptions évaluables d'une notion ne peut que MONTER.

**Ce qui reste — et c'est une décision d'auteur, pas un défaut :** 335
misconceptions sont déclarées, visées, et sous le plancher de 3 items. Avec
6 items de banc, une notion de SVT ne peut porter que deux ou trois erreurs
évaluables. La dette est désormais EXACTE, notion par notion : `svt/soi-non-soi`
affiche 1 évaluable et 6 sous le plancher, ce qui se lit « il manque une
douzaine d'items ici ». Regrouper les erreurs pour faire le plancher aurait
menti sur la pédagogie ; ça n'a pas été fait.

**Ce que la mesure a révélé ensuite, et qui n'avait jamais été chiffré : la
SVT était quatre fois plus pauvre que les autres matières.** Médiane de 6
items QCM par notion contre 27 en maths, 24 en PC, 24 en philo — 64 items au
total contre 365, 617 et 301. Sans checkpoints ni banque d'exercices, c'était
TOUT l'entraînement et TOUT le diagnostic d'un élève de SVT sur une notion.
D'où, mécaniquement, onze notions aveugles sur onze.

**38 items neufs** ont été écrits contre ce déficit, erreur par erreur, dans le
périmètre strict des leçons : SVT 64 → 102 items, 11 → 0 notions aveugles,
41 → 0 erreurs sous le plancher, 3 → 57 erreurs évaluables. L'écart avec les
autres matières n'est pas refermé ; la matière est passée du côté où le modèle
a quelque chose à dire.

**La file d'attente, chiffrée.** 310 misconceptions restent sous le plancher
hors SVT — au mieux 167 items neufs. Les plus creuses :
`maths/geometrie-espace` (23 erreurs inévaluables), `philo/la-violence` (18),
`pc/atome-mecanique-newton` (18), `maths/nombres-complexes-1` (16),
`philo/autrui` (16). `node scripts/couverture-diagnostique.mjs` les classe.

**À lire :** `docs/audits/couverture-diagnostique.md`.

### 9.5 La règle de méthode que ces quatre arcs ajoutent

**Un instrument qui SIGNALE sans GARDER finit par ne plus être lu.**
`item-stats` disait la vérité depuis des mois, dans un format qui n'obligeait
personne. Ce qui a changé n'est pas la mesure — c'est qu'elle casse
maintenant le build.

Corollaire pratique : quand une sonde et une réparation existent en deux
langages, **elles lisent la même liste**, exportée par l'une pour l'autre. Au
premier test négatif, la sonde des accents connaissait 130 formes quand la
réparation en connaissait 600 : sur trois mots sabotés volontairement, elle
n'en voyait qu'un. Une porte plus étroite que la réparation déclare propre ce
qu'elle ne sait pas voir.

**Troisième corollaire, venu de la couverture diagnostique : un commentaire
honnête n'est pas une porte.** Deux fichiers du corpus documentaient
exactement leur propre dette — « les items R0-R7/R12 antérieurs ne portent pas
encore d'id de misconception », « SO-19, SO-20, SO-21 predate the misconception
schéma ». Les deux disaient vrai. Les deux ont vieilli en silence pendant des
mois, parce qu'aucune exécution ne les relisait. Ce qui n'est pas mesuré à
chaque commit n'est pas gardé, quelle que soit la qualité de la note qui
l'accompagne.

**Second corollaire, venu de l'indice de l'absolu : deux portes qui gardent
la même surface s'attrapent l'une l'autre, et c'est le signe qu'aucune ne
suffit.** En allongeant la clé de `CI-17` pour lui rendre son « toujours », la
campagne des absolus a fait sonner la porte des LONGUEURS : la clé était
devenue visiblement la plus longue. Le correctif d'un défaut de forme est le
plus souvent un autre défaut de forme, et seul un harnais qui garde les deux
le voit.

---

## 10. Addendum du 2026-09-05 — l'arc « la leçon qui ne demande jamais rien »

### 10.1 Le fait, mesuré avant d'être cru

La question de départ n'était pas une intuition mais une commande : compter,
notion par notion, quels fichiers existent. Le résultat tenait en quatre
lignes.

| Matière | Notions | `checkpoints.yaml` | `exercises.yaml` | `bank.yaml` |
|---|---|---|---|---|
| maths | 14 | 14 | 14 | 14 |
| pc | 25 | 25 | 25 | 24 |
| philo | 12 | 10 | 10 | 0 |
| svt | 11 | **0** | **0** | **0** |

Traduit en expérience d'élève : sur les 64 notions du produit, 51 arrêtaient
le lecteur cinq à huit fois par leçon pour lui demander de s'engager, puis lui
nommaient son modèle faux quand il se trompait. **Les treize autres — les onze
notions de SVT, plus `philo/l-histoire` et `philo/le-bonheur` — se
traversaient d'un bout à l'autre sans qu'on lui demande une seule fois de
prendre position.** La leçon leur parlait ; elles n'avaient aucun moyen de
répondre.

Ce n'est pas un défaut cosmétique. Le moteur du produit est un modèle
apprenant qui se nourrit de ce que l'élève coche ; une leçon sans point
d'arrêt ne lui envoie rien, et le premier signal arrive au banc de fin,
c'est-à-dire trop tard pour changer la lecture en cours.

### 10.2 La moitié séparable — ce qui bloquait, et ce qui ne bloquait pas

La recette de conversion du sommet
(`docs/pipeline/SUMMIT-CONVERSION-RECIPE.md`) traite `exercises.yaml` et
`checkpoints.yaml` comme les deux moitiés d'un même geste. Pour ces treize
notions, cette solidarité était précisément le blocage — et elle n'est pas
nécessaire.

`exercises.yaml` exige une annale nationale vérifiée. Or :

- **La SVT n'a pas de banque de sujets du tout** : `docs/sujets/` contient
  `maths/`, `pc/`, `philo/` — et rien pour la SVT. Ce n'est pas un oubli de
  cette session, c'est un chantier jamais ouvert.
- **Les deux notions de philo sont documentées comme non sourçables**, et pour
  une raison de périmètre : السعادة n'est pas au programme de la مجزوءة
  الأخلاق des filières scientifiques, et التاريخ n'est jamais examiné dans la
  مجزوءة الوضع البشري scientifique. Les deux fiches remontent au décideur un
  arbitrage curriculaire — ces leçons relèvent-elles d'un choix pédagogique
  assumé, ou d'une filière littéraire ? Il reste ouvert.

`checkpoints.yaml`, lui, n'exige rien qu'une annale : il s'écrit à partir de
la leçon et de son propre inventaire d'erreurs. **Séparer les deux moitiés
débloque immédiatement la seule des deux qui manque à chaque lecture**, et
laisse l'autre là où elle doit rester — entre les mains de l'humain.

### 10.3 Ce qui a été fait

**90 points d'arrêt**, sur les treize notions : 75 en SVT (6 à 8 par notion),
15 sur les deux notions de philo. Les 64 notions du corpus en portent
désormais, pour **363 marqueurs** au total.

Chacun suit la même anatomie que les 273 existants : une porte d'engagement
qui transforme le « prends position » rhétorique du premier chapitre en
engagement réel, posée entre la question et sa révélation ; puis une porte de
rupture par chapitre, à l'endroit où la leçon vient d'écarter une erreur
classique. Aucun score, aucune série, aucun décompte — et le plancher du banc
de fin n'est pas touché : ces sondes sont affichées en ligne, jamais
recomptées.

**Deux cas méritent d'être signalés pour ce qu'ils apprennent.**

`chaines-de-montagnes` posait DÉJÀ, au milieu de son deuxième chapitre, un
« prends position » sur l'Himalaya, et donnait la réponse trois lignes plus
bas : « si tu as répondu oui, c'est une prédiction logique. Elle est fausse. »
L'auteur avait écrit la sonde ; il lui manquait le moyen de recueillir la
réponse. Cinq autres leçons portaient la même trace. **Quand une leçon
interpelle et répond à elle-même, la conversion ne crée rien : elle rend
effectif ce qui était déjà voulu.**

`philo/le-bonheur` et `philo/l-histoire` étaient bloquées, en apparence, par
un arbitrage de périmètre. Elles l'étaient pour `exercises.yaml`, pas pour
leurs points d'arrêt. **Un blocage réel sur une moitié d'un livrable ne
justifie pas de tenir l'autre moitié en otage** — à condition de le dire, et
l'en-tête de chaque fichier porte l'explication pour que le prochain lecteur
ne prenne pas l'absence d'exercices pour un oubli.

### 10.4 La contrainte qui a façonné les énoncés

Une règle, tenue sur les 90 sondes : **n'utiliser que les identifiants
d'erreur déjà déclarés dans `items.yaml`.** Il aurait été plus commode
d'inventer une erreur par question — chaque distracteur aurait eu son étiquette
sur mesure. C'eût été rouvrir, le lendemain de sa fermeture, la dette de
couverture du §9.4 : une misconception déclarée sans trois items de banc n'est
jamais évaluable, et la SVT venait tout juste de passer à zéro
sous-plancher. Les 270 distracteurs se répartissent donc sur les inventaires
existants, et pas un de plus. `couverture-diagnostique` est inchangé : 458
misconceptions évaluables, 0 fantôme.

### 10.5 Les deux portes de forme, à l'épreuve d'une campagne neuve

Les instruments du §9.1 et du §9.3 balaient aussi `checkpoints.yaml`. Sur 90
items neufs écrits avec l'intention de les respecter, **ils ont mordu onze
fois** — dont une où ils se sont contredits l'un l'autre : en enrichissant la
clé trop courte de `genetique-populations/cp-r0-predict` (105 caractères
contre 133 au choix suivant, 27 % d'écart, repérable sans lire), le mot
ajouté — « alors qu'aucun d'entre eux ne montre le moindre signe » — a fait
d'elle le seul choix à sur-affirmer, et sonner la porte des absolus. C'est le
troisième cas de ce genre depuis qu'elles sont armées ensemble, et il confirme
la règle du §9.5 : le correctif d'un défaut de forme est le plus souvent un
autre défaut de forme.

La leçon d'écriture qui en sort est stable et vaut d'être notée : **on ne
désarme jamais un distracteur ; on arme celui dont l'absolu EST l'erreur.**
« Une élévation de température accélère toujours une transformation
chimique », « le substrat occupe les sites actifs sans jamais en ressortir »,
« aucun de ses arguments n'a résisté à la vérification » — dans les trois cas,
le mot absolu ajouté n'est pas un rembourrage : c'est exactement la règle
fausse que l'élève applique.

### 10.6 Ce qui reste, et à qui

Les points d'arrêt sont posés partout. **Les deux autres couches ne le sont
pas, et leur blocage n'est pas technique.**

1. **La SVT n'a ni `exercises.yaml` ni `bank.yaml`, sur ses onze notions** —
   parce qu'aucune banque de sujets SVT n'existe. Ouvrir `docs/sujets/svt/`
   est un chantier d'extraction en soi (transcription et vérification
   d'annales nationales), du même ordre que ce qui a été fait pour la PC et la
   philo. C'est le plus gros manque restant du produit, et il se chiffre :
   onze sommets encore imprimés, onze bancs d'entraînement absents.
2. **La philo n'a aucun `bank.yaml`**, sur ses douze notions. À trancher :
   est-ce un manque, ou la banque n'a-t-elle pas de sens pour une épreuve de
   dissertation ? La question n'a jamais été posée explicitement.
3. **`pc/atome-mecanique-newton` n'a pas de `bank.yaml`** — seule notion de PC
   dans ce cas, et ce n'est PAS un trou à combler : `docs/sujets/pc/INDEX.md`
   établit que la notion est absente des 21 sessions couvertes (2008-2025), le
   seul candidat de routage (2025 N, exercice 4 partie 1) ayant été confirmé
   hors périmètre le 2026-08-06. Le ship `unsourced` est une décision
   verrouillée par le propriétaire du plan. À ne rouvrir que si un sujet
   authentique apparaît.
4. **`philo/le-bonheur` et `philo/l-histoire` n'ont pas d'`exercices`**, et
   n'en auront pas tant que l'arbitrage curriculaire du §10.2 n'est pas rendu.


### 10.7 Le point d'arrêt montrait la bonne réponse sans jamais la justifier

Trouvé en regardant, pour la première fois, une des 90 sondes RENDUE plutôt
que dans son fichier — la règle du §8.4, appliquée à mon propre livrable.

Le parcours d'un élève qui se trompe était : son erreur nommée en rouge (bien),
la bonne réponse surlignée en vert (bien), et **rien d'autre**. Aucune phrase
ne lui disait pourquoi cette réponse-là est la bonne. Le composant n'affichait
le retour que du choix COCHÉ ; celui de la clé restait dans le fichier.

Ce n'était pas visible en lisant le YAML, où la justification est bien écrite,
sur les 362 points d'arrêt du corpus sans exception. Elle n'était simplement
jamais atteinte par qui en avait le plus besoin.

Deux mesures cadrent la portée du correctif :

- **362 points d'arrêt sur 362** portent une justification de la clé, et
  **0 sur 362** portent un champ `solution`. Le point d'arrêt n'a donc aucune
  autre voie pour l'expliquer : ce qui n'est pas montré là est perdu.
- La banque de fin est dans la situation inverse : **1 336 items sur 1 385**
  portent une `solution`, que `McqItem` affiche déjà après réponse. Le
  correctif ne doit donc PAS s'y appliquer — il n'y ajouterait qu'une
  redite au-dessus d'une explication plus complète.

D'où la forme retenue : un drapeau explicite (`revealCorrectFeedback`) que le
point d'arrêt lève et que la banque de fin ne lève pas. Le comportement de
`McqItem` est inchangé, par construction et non par coïncidence.

**Un détail d'accessibilité qui a changé la mise en œuvre.** La première
version donnait au nouveau bloc `role="status"`, comme son voisin rouge.
Répondre aurait alors déclenché TROIS annonces simultanées (le retour du choix
coché, la ligne de résultat, la justification), là où il y en avait deux. Le
bloc a été rendu non-live : il est du contenu explicatif, lu dans l'ordre du
document, et il est la description (`aria-describedby`) de la ligne correcte.
La règle qui s'en dégage : **ajouter du contenu à un composant n'autorise pas
à ajouter une région live.**

**Un fait mesuré, laissé au décideur.** Le champ `correct_feedback` est
renseigné sur **1 451 items du corpus — 288 151 caractères** — et n'est rendu
NULLE PART. Sur les 1 385 items de banque, il fait double emploi avec la
`solution`, plus complète et affichée : la perte est une redondance, pas un
silence. Sur les 66 points d'arrêt qui le portent en plus du retour de leur
clé, il est mort pour rien. Le brief de squelette
(`docs/pipeline/skeleton-lesson-brief.md`) le demande pourtant à chaque item
neuf. Trois issues, aucune n'étant à moi : le rendre, le supprimer du schéma,
ou l'assumer comme note d'auteur non destinée à l'élève — mais il faut
trancher, sinon chaque item écrit demain paiera à nouveau ce champ.

### 10.8 Quatre fichiers se déclaraient complets — et l'étaient à l'écriture

Le défaut le plus instructif de la journée, parce que personne n'y a menti.

Chaque `items.yaml` se termine par un `coverage_summary` : un tableau écrit à
la main qui annonce combien d'items couvrent chaque misconception et si le
plancher diagnostique de 3 items est atteint. Il est lu par les humains qui
reprennent la notion, et **réexécuté par rien**. C'est la forme exacte que le
§9.5 nomme et proscrit : *un commentaire honnête n'est pas une porte*.

**Ce qui a été mesuré.** Quatre notions déclaraient `floor_met: true` alors que
**15 misconceptions déclarées et taguées** siégeaient sous le plancher — donc
inévaluables par le modèle apprenant, à jamais : `pc/aspects-energetiques` (7),
`pc/systemes-oscillants` (4), `pc/reactions-acido-basiques` (3),
`pc/chute-mouvements-plans` (1).

**Comment c'est arrivé.** Les quatre résumés disaient VRAI le jour de leur
écriture, et deux le disaient explicitement : *« R0-R6 et R11 n'ont aucune
couverture formelle ; hors périmètre de cette passe »*, *« l'inventaire ne
contient que les 12 ids AB-\* »*. Puis une passe ultérieure a déclaré les
familles manquantes et tagué les items hérités. **Le périmètre a doublé, la
conclusion est restée.** C'est la forme la plus dangereuse du défaut : le
périmètre était énoncé, la conclusion était juste dedans, et personne n'avait
tort — seul le temps a menti. Deux affirmations annexes avaient ranci de la
même façon (« SO-19/20/21 ne portent aucun tag », idem pour AE-19/20/21 :
faux depuis la passe de tagage).

**Ce que la porte juge, et ce qu'elle refuse de juger.** Le corpus tient ses
tableaux par-misconception selon **six conventions différentes** — par item,
par distracteur, par attribution primaire — toutes légitimes et toutes
déclarées dans le fichier qui les emploie. Les comparer entre elles accuserait
de mensonge une notion honnête, et une porte qui crie au loup est désarmée dans
la semaine. `scripts/resume-couverture.mjs` ne garde donc que les deux
affirmations à **sens unique** : `floor_met` (dont la seule convention valable
est celle de la chaîne, qui construit `learner-model-data.json`) et
`total_items` (un nombre de lignes). `gated_floor_met`, affirmation de portée
réduite, est délibérément ignoré.

**La porte B mérite un mot** : elle échoue aussi sur un `floor_met: false`
alors qu'aucune misconception n'est sous le plancher. Sans ce miroir, le corpus
s'améliore et sa documentation reste au passé — une campagne d'items réussie
laisse un drapeau périmé que personne ne pense à retourner. Avec lui, **finir le
travail inclut de le dire**.

**La réparation.** Le message d'échec nomme deux remèdes, jamais un troisième :
écrire les items qui manquent, ou dire la vérité sur ce qui manque. Ici le
premier — 15 misconceptions inévaluables sont 15 erreurs d'élève que le produit
voit passer sans savoir les nommer. **Onze items** (CMP-37/38, RAB-40/41/42,
SO-42/43, AE-31→34), chacun portant deux ou trois familles distinctes sur ses
distracteurs. Les quatre résumés réécrits, tableau **généré** cette fois,
affirmations rancies supprimées plutôt que rafistolées. Corpus :
**517 → 532 misconceptions évaluables**.

**Une note de méthode, payée sur place.** En rédigeant les nouveaux résumés
j'ai écrit à la main deux nombres (« quatorze », « seize » misconceptions
exactement au plancher) — les deux étaient faux. Le même défaut, dans le même
geste, une heure après l'avoir nommé. Ils ont été recomptés par l'instrument et
corrigés. La convention de comptage a été extraite dans
`web/scripts/lib/couverture-compte.mjs`, partagée par `couverture-diagnostique`
et `resume-couverture` : deux comptages parallèles finiraient par diverger, et
le second accuserait le premier de mentir en se trompant lui-même.

**La deuxième passe.** Les 18 notions qui n'avaient AUCUN résumé en ont un,
généré : 11 en SVT, 2 en philo, 4 en PC, 1 en maths. Celles qui ne sont pas au
plancher portent un bloc `under_floor` qui nomme chaque misconception
inévaluable et le nombre d'items qui lui manquent. Un résumé absent n'est pas
un mensonge, mais il produit le même effet — une dette qu'aucun document ne
nomme est une dette qu'on ne paie jamais. Le corpus est **62 sur 62** à se
décrire, cliquet scellé à zéro : un résumé ne peut plus disparaître.

Cette passe a fait apparaître un cas qu'aucun des deux instruments ne voyait :
une misconception **déclarée mais qu'aucun item du banc ne vise**. Elle compte
zéro — pire que sous le plancher — et échappait aux deux décomptes (l'un ne
connaît que les tags rencontrés, l'autre ne compte « orpheline » que ce qui
n'est utilisé NULLE PART, checkpoints compris ; or un checkpoint ne compte pas
dans le plancher). Il y en a **16**. Le périmètre du plancher est désormais
l'union du déclaré et du tagué, dans l'instrument comme dans les tableaux.

**L'état du corpus** : 767 misconceptions déclarées ou taguées, **532
évaluables**, 235 sous le plancher (dont 16 sans aucun item de banc), **30
notions sur 62 entièrement évaluables**. Les 235 sont de la dette NOMMÉE :
chaque notion concernée déclare `floor_met: false` et dit dans son
`under_floor` ce qui manque et combien. C'est le sujet de la campagne d'items,
pas de cette porte-ci.

Détail complet : `docs/audits/resume-couverture.md`.

### 10.9 Le plancher diagnostique est atteint partout — 62 notions sur 62

La suite directe du §10.8, et le plus gros chantier de contenu de la journée.

**L'état de départ.** Une fois la porte `resume-couverture` armée et le
périmètre du plancher élargi à l'union du DÉCLARÉ et du TAGUÉ, la mesure
donnait : 767 misconceptions dans le corpus, **532 évaluables**, 235 sous le
plancher de 3 items du banc, **30 notions sur 62** entièrement évaluables.

**L'état d'arrivée.** **767 sur 767 évaluables, 0 sous le plancher, 62 notions
sur 62.** Le moteur de diagnostic voit désormais toutes les erreurs que le
corpus déclare.

**Le coût.** **165 items** écrits, en neuf lots, chacun vérifié et poussé
séparément. Le détail par notion vit dans le préambule du `coverage_summary` de
chaque fichier — réécrit à chaque fois, avec ce qui manquait et pourquoi. Ce
chiffre est REDÉRIVABLE, et l'a été avant d'être écrit ici — c'est la leçon du
§10.8 appliquée à son propre récit :
`git diff f6a8339 -- content | grep -c '^+  - id: '` → 165, zéro retrait.

**Seize familles n'avaient AUCUN item de banc.** Elles n'étaient sondées que par
un checkpoint de leçon, ce qui ne compte pas : le modèle apprenant est bâti sur
le banc de fin seul, pour ne pas compter deux fois un item cloné en ligne. Ces
seize-là étaient invisibles aux deux instruments avant l'élargissement du
périmètre — elles ne figuraient ni parmi les évaluables, ni parmi les
sous-plancher. Trois exemples de ce qu'elles couvraient : la conductimétrie et
le temps de demi-réaction en cinétique, la reconnaissance vide du maître chez
Hegel, le théorème de Rolle appliqué à $f'$ plutôt qu'à $f$.

**Une porte franche obtenue sans l'écrire.** Les 62 notions déclarant désormais
`floor_met: true`, la porte A de `resume-couverture` — qui échoue si un fichier
annonce le plancher atteint alors qu'une misconception est en dessous — vaut
maintenant sur tout le corpus : **déclarer une misconception sans lui écrire ses
trois items casse l'intégration.** La porte d'honnêteté a produit la porte de
fond, sans qu'il ait fallu la spécifier séparément. C'est un engagement réel
pour la suite : une notion neuve naît désormais sans dette, ou ne passe pas.

**Ce que les portes de forme ont coûté, et appris.** Elles ont mordu **une
quarantaine de fois** au fil des neuf lots, toujours sur les items neufs, et
jamais deux fois pour la même raison selon la matière :

- en PHILOSOPHIE, la clé tend à énoncer la thèse ET sa justification — elle
  devient alors la plus longue, repérable sans être lue. La justification
  appartient au retour, où elle enseigne ;
- en MATHÉMATIQUES et en PHYSIQUE, l'inverse : la clé est un résultat numérique
  de quatre mots au milieu de distracteurs explicatifs. Il faut l'étoffer, pas
  raccourcir les autres ;
- la porte de l'ABSOLU mord dans les deux sens, et son remède est ordonné :
  rendre à un distracteur l'absolu qui EST son erreur, avant de désarmer la
  clé.

**Trois défauts que j'ai écrits et corrigés avant commit**, notés ici parce
qu'ils se reproduiront :

1. **Des distracteurs qui disent vrai.** Deux items, dans un premier jet,
   offraient une seconde réponse défendable — l'un critiquait correctement le
   raisonnement visé, l'autre se corrigeait lui-même en cours de phrase. Un item
   à deux réponses défendables ne diagnostique rien.
2. **Des distracteurs qui donnent la bonne valeur.** Un item de chute libre
   annonçait la hauteur correcte dans ses trois distracteurs, avec de mauvais
   raisonnements : l'élève qui cherche un nombre n'avait aucune raison de lire
   les justifications. Chaque distracteur porte désormais la valeur que SON
   erreur produit — 40 m pour l'oubli du facteur ½, 0 m pour la paire
   action-réaction prise pour un équilibre.
3. **Un mauvais préfixe de misconception.** Seize tags fantômes créés d'un coup
   parce que la notion déclare `mc.math.sma_suites_numeriques.` et que j'avais
   écrit `mc.math.maths_...`. La porte `couverture-diagnostique` les aurait
   arrêtés en intégration. **Vérifier le préfixe exact avant d'écrire** fait
   désormais partie de la routine.

**Ce qui reste ouvert, et n'est pas de mon ressort.** Les arbitrages du §10.6
sont inchangés : la SVT n'a toujours ni `bank.yaml` ni `exercises.yaml` (il
n'existe aucun `docs/sujets/svt/`), douze notions de philo n'ont pas de
`bank.yaml`, et le champ `correct_feedback` reste renseigné sur 1 451 items
sans être rendu nulle part.

### 10.10 Le produit facturait 6,5 Mo à l'élève pour lui montrer une liste

**Le fait.** Sur l'accueil, écran de téléphone, cache vide : **525 ko pour
voir la page, puis 6 475 ko tirés tout seuls en défilant** — 91 % du
transfert. `next/link` précharge par défaut la charge RSC de tout lien qui
entre dans le champ de vision ; l'accueil porte 62 liens de leçon, et l'élève
en ouvrira une. Une séance de révision complète — accueil, défiler, une
matière, une leçon, dérouler, une deuxième leçon — coûtait **8,72 Mo, dont
86 % de préchargement.** Soit 117 séances dans un forfait de 1 Go.

**Le chiffre qui circulait valait sept fois moins.** `INSTRUMENTS.md` et
`poids-et-reactivite.md` annonçaient tous deux « ~920 ko de préchargement
RSC » sur l'accueil. C'était vrai pour une page IMMOBILE ; personne n'avait
défilé. Un chiffre cité dans la colonne « ce qu'on ne mesure pas » n'est pas
une mesure — rien ne le réexécute, donc il est juste le jour où on l'écrit.
C'est **le défaut du §10.8 commis sur un autre sujet**, et il a été corrigé
dans les deux documents.

**Et le balayage hors ligne avait déjà tranché la seule défense possible.**
Le 2026-09-04, `hors-ligne.md` mesurait qu'une leçon déjà préchargée ne
s'ouvre pas davantage quand la connexion tombe, et écrivait noir sur blanc :
« le préchargement est donc un coût de données pur ». La phrase est restée
sans suite pendant une journée. Il ne manquait que la mesure de ce que ce
coût valait — **une conclusion posée n'agit pas toute seule.**

**Pourquoi aucun instrument ne l'avait vu, et c'est la seule chose à retenir.**
Parce que le préchargement part APRÈS la peinture. Il n'entre dans aucun LCP,
dans aucun temps de blocage, dans aucune capture, dans aucun `cls-sweep` — et
`poids-sweep`, qui somme les `transferSize` au moment où la page se peint,
**arrête de compter exactement là où le préchargement commence**. Sept
fenêtres de mesure avaient été ouvertes sur la vitesse ; aucune ne regardait
la facture.

> **Le poids et la consommation sont deux questions différentes.** La
> première mesure la patience de l'élève, la seconde son forfait. Un produit
> peut être excellent sur l'une et ruineux sur l'autre, et c'était le cas.

**Le correctif tient dans un fichier — parce qu'il n'y a qu'une porte.**
Tout le produit passe par `src/components/ui/Lien.tsx`, l'unique wrapper de
`next/link` (écrit en R4 pour la continuité entre routes). Le préchargement y
est passé du CHAMP DE VISION à l'INTENTION : survol, focus clavier, doigt
posé (`touchstart`). Ce sont exactement les octets que le clic allait
demander — ils ne coûtent rien de plus, ils arrivent plus tôt. Entrer dans le
champ de vision n'est pas une intention. Et l'économiseur de données de
l'appareil (`navigator.connection.saveData`, ou un lien mesuré 2G) coupe
toute spéculation : l'élève a demandé qu'on dépense moins.

Une seule exception, déclarée là où elle vaut : la recommandation « quoi
étudier ensuite » du tableau de bord garde `prefetch`. C'est le seul lien
dont on sait qu'il sera suivi — une charge, pas soixante-deux.

**Après :** l'accueil passe de 7 146 ko à **791 ko**, chaque page de matière
de 1,4–2,6 Mo à ~507 ko, la séance de révision de 8,72 Mo à **1,38 Mo** —
743 séances dans le même forfait au lieu de 117. Le préchargement à
l'intention est vérifié geste par geste : survol, focus et `touchstart`
tirent chacun 79 ko, la route visée et elle seule.

**La porte a deux sens, et c'est ce qui la rend utile.** Elle échoue si une
page de liste tire quoi que ce soit sans geste — mais AUSSI si le survol ne
précharge plus rien, et AUSSI si l'économiseur n'est pas honoré. Sans les
deux derniers, on passerait le contrôle en supprimant tout préchargement,
c'est-à-dire en rendant la navigation plus lente partout. C'est la même
leçon que les deux cliquets d'indices : **le remède d'un défaut crée le
défaut symétrique s'il est appliqué sans regarder.**

Et elle a été mise au rouge exprès avant d'être armée — défaut réintroduit,
build refait, porte relancée : elle échoue en nommant les trois routes et
leurs octets. Une porte qui n'a jamais été rouge ne certifie rien.

Détail complet : `docs/audits/donnees-et-forfait.md`. Instrument :
`web/scripts/donnees-sweep.mjs` (quatre passes + `--porte`).

### 10.11 Le chemin d'écriture n'était testé que quand il réussit

**Le fait.** `src/lib/events/emitter.ts` est le premier maillon de la boucle
qui fait tout le produit : l'élève répond, l'événement part vers
`record-notion-event`, le modèle apprenant s'ajuste. Il avait 14 tests
unitaires. **Les 14 portaient sur le chemin heureux** — un envoi qui réussit.
Le chemin de PERTE — échec, réessai, borne de file, jeton expiré, coupure
réseau — n'avait rien.

C'est le point 4 de « ce que RIEN ne mesure encore », et c'est l'autre sens
du réseau : `reseau-malade` avait mesuré ce qui S'AFFICHE quand la connexion
rampe ; personne n'avait regardé ce qui S'ENVOIE. **Un affichage raté se voit
et se recharge. Un envoi raté ne se voit pas** — la leçon continue, l'élève ne
saura jamais que sa réponse n'a pas compté, et le modèle sera simplement un
peu plus faux.

**Six tests ajoutés (20 au total), et ce qu'ils établissent.** Un réessai,
un seul, à 4 s, à l'identique — donc une coupure brève est absorbée et une
coupure de plus de quatre secondes perd la réponse. Un `fetch` qui lève est
traité comme un 5xx. Un **401 est réessayé avec le MÊME jeton** : un jeton
expiré est une perte structurelle, pas un délai. La file bornée à 20 garde
les échecs **les plus anciens** et abandonne les suivants — un élève qui
enchaîne perd donc ses réponses **les plus récentes**, celles qui décrivent
le mieux son état courant.

**Et un fait qui tient à la forme du code, pas à un test :** rien ne peut
prévenir l'élève. `recordAnswerEvent` rend `void`, `AttemptEvents.tsx` ne
regarde pas. C'est le bon choix pour la séance — on n'interrompt pas un élève
au milieu d'un raisonnement pour une écriture de diagnostic — mais il faut
voir ce qu'il coûte : **le produit ne peut pas savoir qu'il oublie.**

**Un défaut de composition trouvé en écrivant les tests.**
`ChapterVisitRecorder` marque un chapitre « envoyé » AVANT de savoir si
l'envoi a réussi. Un élève qui revient sur un chapitre dont la visite s'est
perdue ne la réémettra pas. Ce n'est pas grave à l'échelle d'une visite,
c'est grave comme motif :

> **Dès qu'un envoi est feu-et-oubli, toute déduplication posée en amont
> transforme un échec transitoire en oubli définitif.**

**Deux arbitrages posés, non tranchés** (`docs/audits/envoi-des-reponses.md`) :
quel bout de la file abandonner — la borne de 20 garde aujourd'hui les plus
anciens, garder les plus récents coûterait la même mémoire ; et si la règle
d'état honnête interdit vraiment une file persistée, sachant qu'une réponse
déjà donnée mise de côté le temps que le réseau revienne n'est pas de l'état
fabriqué mais un envoi différé. La distinction est aujourd'hui implicite, et
c'est elle qui décide de ce que le modèle apprenant sait d'un élève qui
révise en 3G.

**Et une correction de dispositif au passage : les tests unitaires ne
tournaient pas en CI.** Ni `test-learner-model`, ni `test-attempt-events` —
ils existaient et ne s'exécutaient que localement, donc en pratique quand
quelqu'un y pensait. Les deux sont désormais des étapes de `gates.yml`,
placées en tête parce qu'elles sont rapides et sans navigateur. Une suite de
tests qui ne tourne pas dans la CI est une suite qui ne tourne pas.

### 10.12 Les six défauts « adjacents » consignés en juillet — trois étaient réels, et deux se voyaient

`docs/design/LESSON-EXPERIENCE-SPEC.md` §6 listait six défauts « constatés,
non corrigés ici, consignés ». Ils y dormaient depuis juillet. Chacun a été
MESURÉ avant d'être cru — et le tri a compté autant que les correctifs.

**Deux étaient déjà réparés, sans que la liste le sache.** La garde lexicale
de `validate-content` laisse bien passer… plus rien : `À FAIRE` et
`asset-pending` sont dans son lexique. Et `arbre-pondere.svg` a désormais ses
groupes d'étapes ET son sidecar `.stages.json`. Une liste de dette qui ne
sait pas ce qui a été payé fait perdre du temps deux fois : à la lire, et à
la vérifier.

**Un était une contradiction de documentation, pas de code.** L'en-tête de
`validate-content` annonçait « `[[video:slug]]` → ALWAYS fails » ; le code
avertit. Le corpus porte UN marqueur vidéo, dans `pc/rlc-serie`, précédé d'un
commentaire qui l'assume comme slot d'amélioration, et `NotionBody` rend
`null` dessus par décision de brief (omission gracieuse, jamais de
placeholder d'erreur). C'est donc l'EN-TÊTE qui mentait : il dit maintenant
ce que le code fait, et pourquoi.

**Trois étaient réels. Deux se voient depuis le siège de l'élève.**

**(1) La fin de chaque leçon proposait la même chose.** Le code lisait
`listNotions().filter(…)[0]` — l'ordre de `readdirSync` — sous un commentaire
affirmant « la notion la plus récemment mise à jour ». Résultat : **une seule
suggestion distincte pour les 62 leçons.** Trier par date de fichier n'aurait
rien sauvé — après un clone frais (donc à chaque déploiement Vercel) toutes
les dates sont celles du checkout, et « la plus récente » aurait été une
fabrication au sens de la règle d'état honnête. L'ordre du PROGRAMME, lui,
existe et ne dépend d'aucune horloge : `nextInParcours` (lib/curriculum.ts)
rend le chapitre construit suivant dans la matière, puis les matières
suivantes, puis boucle. Mesuré après : **60 suggestions distinctes sur 62
leçons, aucune nulle, aucune pointant sur elle-même, 58 restant dans la même
matière.** L'ordre des matières est désormais défini UNE fois
(`DEFAULT_SUBJECT_ORDER`) et partagé avec le « quoi étudier ensuite » du
tableau de bord — ce que le commentaire de `NextUp` réclamait déjà.

**(2) Sept ancres sur huit renvoyaient au mauvais endroit.** Chaque titre
porte une ancre « § » qui permet de copier un lien profond. Depuis la
pagination, `LessonRenderer` est appelé une fois par SEGMENT et `rehype-slug`
remet son compteur d'unicité à zéro à chaque passe : dans
`maths/suites-numeriques`, **huit titres « L'erreur à repérer » portaient le
même id**. L'élève copiait le lien de la section qu'il lisait et retombait
sur la première. 95 titres au libellé répété existent dans 32 leçons. Le
compteur est maintenant PARTAGÉ par les segments
(`web/src/lib/rehypeSlugPartage.ts`) : les ids produits sont exactement ceux
qu'aurait donnés un rendu en une passe, donc **la première occurrence garde
son id nu et les liens déjà partagés survivent.** Porte armée :
`ancres-uniques --porte`, 62 leçons, 2 190 titres, 0 doublon.

> **Le tri qui a évité une porte inutile.** Le même document portait AUSSI 29
> ids SVG dupliqués (`step-1`, un dégradé, `circuit-state-0`). Tentant d'armer
> « aucun id dupliqué ». Vérifié deux fois avant : `MediaDiagram` masque les
> étapes en réécrivant le MARKUP de chaque figure, jamais par
> `getElementById` ; et aucun identifiant du corpus n'est défini DIFFÉREMMENT
> par deux figures d'une même notion tout en étant déréférencé par `url(#…)`.
> La porte aurait été rouge sur un fait sans conséquence, et désarmée la
> semaine suivante. **Elle ne juge que les ids de titres.**

**(3) Deux pointeurs de documentation périmés** — le rail décrit comme piloté
par un `IntersectionObserver` qui n'existe plus nulle part dans `web/src/`, et
`.claude/CLAUDE.md` pointant `docs/product/`. Le second a ouvert bien plus
grand que prévu, voir §10.13.

### 10.13 `docs/Product/` et `docs/product/` existaient tous les deux

Le plus petit des six défauts consignés était « `.claude/CLAUDE.md` cite
`docs/product/` ; le répertoire réel est `docs/Product/` ». En le vérifiant,
**les deux répertoires existaient.**

- `docs/Product/` contenait `VISION.md` et `DESIGN-BIBLE.md` ;
- `docs/product/` contenait `NORTH-STAR-V2.md`, `OUTILLAGE.md`,
  `REFONTE-STUDIO.md` ;
- **23 renvois** pointaient `docs/product/VISION.md` ou
  `docs/product/DESIGN-BIBLE.md` — c'est-à-dire nulle part sur un système de
  fichiers sensible à la casse. Parmi eux : `.claude/CLAUDE.md` (« Read
  `docs/product/VISION.md` before making any product decision »), le README,
  `docs/README-docs.md`, le HANDOFF lui-même, et **neuf définitions
  d'agents** — `pedagogy-architect`, `pedagogy-critic`, `content-author`,
  `frontend-builder`, `diagram-author`, `interactive-author`,
  `visual-design-critic`, `calm-load-critic`, `ergonomics-flow-critic`.

**Chaque agent à qui l'on disait « lis la vision d'abord » lisait le vide.**
Et sur la machine du propriétaire — Windows, insensible à la casse, comme
l'atteste `scripts/branch-test.ps1` — les deux répertoires entrent en
collision au checkout.

Réparé en fusionnant vers la casse que citait la majorité des renvois
(`docs/product/`, cohérente avec `docs/audits`, `docs/decisions`,
`docs/design`, `docs/pipeline`) : deux fichiers déplacés, 13 fichiers
réécrits, **38 renvois qui résolvent tous.**

**La porte qui en est née.** `liens-fichiers.mjs` vérifie que tout chemin de
fichier cité dans le dépôt mène quelque part, résolu depuis la racine, depuis
`web/` (la convention d'exécution des scripts) ou depuis le répertoire qui le
cite. Deux zones, et c'est la seule façon honnête de l'armer :

- **zone VIVANTE** — orientation, agents, compétences, vision, règles, specs,
  runbooks, code, contenu, CI. **Porte franche** : un renvoi mort y est
  toujours un défaut.
- **zone d'ARCHIVE** — ADR, registres d'audit, CHANGELOG, rapports de
  reprise, ancrage déclaré périmé. Ces textes NOMMENT délibérément ce qui
  n'existe plus : un ADR qui acte la suppression d'un agent doit pouvoir
  écrire son chemin. Exiger qu'ils résolvent reviendrait à réécrire
  l'histoire. Comptés (13), jamais gardés.

Et l'exception vit dans le fichier, en NOMMANT son chemin —
`CHEMIN DISPARU: scripts/gemini_media.py — remplacé par le MCP gemini-image` —
exactement comme `RECOUVREMENT ASSUMÉ:` pour la sonde de contraste. Un
marqueur qui vaudrait pour tout un fichier ferait taire l'instrument pour le
renvoi cassé qu'on y introduira demain.

**Six renvois morts de plus, trouvés du même coup**, dont un qui comptait :
le runbook de bascule PRODUCTION demandait de copier des migrations depuis
`docs/drafts/migrations/`, répertoire disparu depuis que les brouillons ont
été promus en `048/049/050`. **Une étape introuvable dans un runbook de
bascule production est le pire endroit où laisser pourrir un chemin.**

> **La règle que cet arc ajoute.** Un renvoi est une INSTRUCTION. Un renvoi
> mort est une instruction qu'on croit avoir donnée — et personne ne s'en
> aperçoit, parce que c'est le lecteur suivant qui paie, en silence.

### 10.14 Le document « où nous en sommes » décrivait encore l'application Flutter

`.claude/CLAUDE.md` désigne `docs/grounding/` comme les documents d'état
courant — le « où nous en sommes » qu'une session lit pour se situer.
`architecture.md` s'y ouvrait sur :

> « Le MVP est : **Frontend : Flutter 3.x + Dart**, Riverpod, `go_router`…
> **Next.js n'apparaît nulle part dans le dépôt.** »

C'était vrai en juin 2026. Depuis la reconstruction (ADR 0016), Next.js EST
tout le frontend et il ne reste pas une ligne de Flutter dans l'application.
Le document restait néanmoins la première lecture d'orientation de toute
session — et il enseignait une pile qui n'existe plus.

**Pourquoi il n'avait pas été repris.** La proposition de réconciliation de
2026-06 disait, pour cette ligne précisément : « **bloqué sur une décision
humaine** — ne pas éditer §1/§3 tant que la décision de pile n'est pas
actée ». La décision A ÉTÉ actée depuis — ADR 0016, et `.claude/CLAUDE.md`
écrit noir sur blanc « The frontend architecture — RESOLVED ». **Le blocage
était levé et personne n'était revenu décrocher l'étiquette.**

> **La règle que ça ajoute.** Un blocage consigné doit nommer ce qui le
> lève. Sinon il survit à sa cause, et le document qu'il protégeait pourrit
> sous une étiquette « en attente » que plus rien n'attend.

**Ce qui a été fait.** Les deux documents d'architecture de l'ère Flutter —
`docs/grounding/architecture.md` et son jumeau de la racine, qui disaient la
même chose périmée à deux endroits — sont archivés tels quels sous
`docs/archive/architecture-ere-flutter-2026-06.md` et
`docs/archive/architecture-apercu-ere-flutter.md`. Ce sont des documents d'HISTOIRE, et ils gardent
leur valeur comme tels. `docs/grounding/architecture.md` est réécrit à
partir d'une mesure du dépôt : la pile, les routes, la forme d'une notion,
le schéma tel que les MIGRATIONS le déclarent, la boucle du modèle
apprenant, et une section « ce que ce document ne dit pas ».

**La discipline qui le distingue de son prédécesseur : chaque chiffre porte
la commande qui le produit.** 62 notions, 49 migrations numérotées, 25
tables, 23 fonctions, 6 fonctions edge, 102 fichiers source du site — aucun
n'est recopié d'un document antérieur ; tous sont re-dérivables en une
ligne. C'est le remède exact au défaut qui a tué la version précédente, et
c'est le §10.8 appliqué à un troisième sujet.

**Ce qui reste explicitement NON vérifié**, et le document le dit en gras à
l'endroit où ça compte : la section « backend » décrit ce que les fichiers
de migration DÉCLARENT. **La synchro de production reste NON VÉRIFIÉE.**
`schema-reconciliation.md` et `known-issues.md` restent stales, avec leurs
propositions en attente — leurs étiquettes, elles, sont exactes.

**Et la porte a mordu son auteur, deux fois.** En publiant le document,
`liens-fichiers --porte` a échoué : `docs/archive/` n'était pas dans sa zone
d'archive (un document archivé cite forcément des chemins d'avant), et le
script lui-même nommait deux chemins d'exemple qui n'existent pas. Les deux
sont réparés — le second en faisant porter à l'instrument son propre
marqueur `CHEMIN DISPARU:`. **Une sonde qui s'exempterait silencieusement
serait la première à mentir.**

### 10.15 Les deux autres documents d'ancrage : ce qui était encore vrai, et ce qui ne l'était plus

Après `architecture.md` (§10.14), les deux autres documents de
`docs/grounding/` portaient la même étiquette collective « STALE — en
attente de revue humaine ». Une étiquette collective ne distingue plus rien :
elle range sous le même mot un document dont le jugement était juste et un
autre dont la prémisse a changé. Les deux ont été re-mesurés, sans être
réécrits.

**`schema-reconciliation.md` avait RAISON.** Sa conclusion — « le modèle de
données est récupérable par extensions successives, aucune partie n'est à
réécrire » — et l'ordre qu'il recommandait (RLS → arêtes de prérequis →
schéma de misconceptions) sont exactement ce qui a été exécuté. Ce qui a
vieilli n'est pas le jugement, **c'est le temps des verbes** : il dit encore
« il faudra » de choses livrées depuis. Sept lignes re-vérifiées contre le
dépôt, dont deux qui restent vraies (aucune migration descendante ; la table
`units` jamais livrée — et probablement sans objet, le curriculum vivant en
fichiers). Sa §6, « la pile frontend : l'audit ne peut pas trancher », est
tranchée par l'ADR 0016 — **le même blocage périmé que celui du §10.14, dans
un second document.**

**`known-issues.md` décrit un produit retiré, et reste utile.** C'est le
backlog de l'audit de juin 2026, celui de l'application Flutter. Les griefs
et leurs causes ont largement survécu au changement de pile ; les libellés
d'agents (`nextjs-frontend`, `pedagogy-auditor`) désignent un roster
remplacé. Six entrées mécaniquement vérifiables ont été re-mesurées : une
résolue (la RLS du curriculum, migration 040), une toujours vraie mais morte
(`get_user_weak_areas` casse, et n'est appelée par rien), une à moitié (le
test sur branche existe, les migrations descendantes non), une interdite
depuis sans être automatisée, une toujours vraie et désormais assumée
(pas de PostHog ni de Sentry — le produit s'instrumente par balayages du
dépôt, pas par télémétrie d'élève), une devenue sans objet (le bucket de PDF
d'annales : les annales vivent en fichiers).

**Les entrées A–F n'ont PAS été triées, et c'est délibéré.** Ce sont des
griefs produit — « les explications de maths n'adressent pas le pourquoi »,
« la progression interne d'un chapitre semble aléatoire ». Dire lesquels
sont clos est un jugement pédagogique, pas une mesure. Un balayage qui se
permettrait ce verdict-là ferait exactement ce que ce projet reproche aux
tableaux écrits à la main : affirmer sans réexécuter.

> **La règle que les trois documents d'ancrage ajoutent ensemble.** Une
> étiquette de statut doit être POSÉE PAR DOCUMENT, et dire ce qui a été
> vérifié. « Stale, en attente de revue » sur trois documents à la fois a
> tenu quatre mois et cachait trois situations différentes : une prémisse
> périmée, un jugement juste au mauvais temps, et un backlog d'une autre ère
> encore largement valable.

### 10.16 Re-certifier les figures au pixel : le corpus tient, et une distinction nouvelle

Le balayage `--pixels-tous` — deux à quatre captures par texte, ~4 100
textes, plus d'une heure par thème — avait été fait le 2026-09-04. Il a été
**refait le lendemain, dans les deux thèmes**, sur les 258 figures. Résultat :
**0 défaut de classe armée sur le corpus vivant, en clair comme en sombre.**
Les 67 restants sont tous de la classe non armée « barre » (un tracé qui
traverse une étiquette) ; les 50–52 autres sont sur les deux figures
`rlc-serie` en dette owner, déjà au dossier d'arbitrage.

**Une re-certification qui ne trouve rien EST un résultat** — c'est la seule
façon de savoir que le harnais rapide, qui manque ~17 % des cas par
construction, ne cache rien sur le corpus vivant. Sans elle, « la porte est
verte » ne dit rien de plus que « la porte est verte ».

**Ce qu'elle a ajouté.** Les 67 « barre » étaient traités en bloc — « tous
sous 30 %, connus et documentés ». Rapportés à leur FICHIER :

> **37 figures en portent au moins un. Dix le DÉCLARENT dans leur fichier ;
> vingt-sept sont muettes.**

Les dix déclarées portent une vraie note de décision : `subduction-andes`
explique que l'étiquette doit rester SUR le plan qu'elle désigne et que le
bord la traverse donc « sur un cinquième de sa largeur, mesuré, pas
ignoré » ; `lecture-Ve-courbe-dosage` liste deux placements essayés et
défaits. Les vingt-sept muettes sont pour la plupart à 5–17 %, sous le seuil
où l'œil s'arrête — mais **rien n'y distingue un croisement pesé d'un
croisement jamais regardé.**

**Le pire cas du corpus était muet, et il est corrigé.**
`pc/controle-catalyse/anhydride-alcool` : la note « (l'hydrogène n'a pas
encore bougé) », posée dans l'étape 3, était rayée sur **29 % de sa largeur**
par la flèche de l'étape 4 — seul cas au-dessus de 25 %. Le croisement
n'existe qu'une fois l'étape 4 révélée, c'est-à-dire dans l'état où l'élève
TERMINE la figure ; `figure-preview` rend toutes les étapes à la fois, et
c'est précisément pour ça. Deux placements essayés, mesurés, et le premier
défait (à y=324 la note recouvrait le « C » du squelette à 56 % — pire que le
défaut de départ). Le retenu passe sous le ventre de la flèche. Vérifié aux
pixels dans les deux thèmes, et REGARDÉ. Le raisonnement est écrit dans le
SVG, à côté de l'étiquette.

**Ce qui reste, borné et rangé** : vingt-six figures muettes, toutes à 24 %
ou moins. La plus haute (`explication-bk-2019-n-x1`, 24 %) est **générée**
par `scripts/figure-geometrie-espace-2019.py`, dont le code commente déjà son
propre réglage — déclarée ailleurs, donc, et **à ne surtout pas corriger à la
main : le SVG serait réécrit à la prochaine exécution.**

> **La règle que cet arc ajoute.** Un seuil (« tous sous 30 % ») range une
> classe ; il ne la documente pas. La question utile n'est pas « combien de
> cas restent » mais **« combien ont été REGARDÉS »** — et cette
> distinction-là ne se lit pas dans un total, seulement fichier par fichier.

### 10.17 « 767 évaluables » ne veut pas dire « richement couvert »

Une fois le plancher atteint partout (§10.9), la question suivante est la
MARGE. Mesurée :

> **459 misconceptions sur 767 — soixante pour cent — sont exactement au
> plancher de trois items du banc.** 161 en ont quatre, 54 en ont cinq, et la
> queue va jusqu'à 22.

Ce n'est pas un défaut : c'est la forme attendue d'une campagne qui a écrit
trois items là où il y en avait zéro, un ou deux. Mais c'est une forme
FRAGILE, et il vaut mieux l'écrire que la découvrir : sur ces 459 familles,
**retirer ou retaguer UN seul item les fait retomber sous le plancher** — et
sous le plancher, une misconception n'est pas « moins bien couverte », elle
est INÉVALUABLE, son état reste « unassessed » à jamais.

Ce qui protège cette forme existe déjà : le cliquet de
`couverture-diagnostique` interdit à `plancher` de descendre, notion par
notion. Une réécriture d'item qui déplacerait un tag casse donc
l'intégration au lieu de dégrader le produit en silence. **C'est la
justification rétrospective d'un cliquet scellé par notion plutôt que
globalement** — un total ne bougerait pas si une notion perdait ce qu'une
autre gagne.

Ce que ce chiffre ne dit PAS : qu'il faut un quatrième item partout. Trois
est le seuil que la chaîne exige pour CONCLURE ; au-delà, chaque item ajoute
de la preuve, pas une capacité. Où mettre le prochain item — approfondir une
famille déjà évaluable, ou écrire ce qui manque ailleurs — est un arbitrage
pédagogique, pas une conséquence du tableau.

### 10.18 La colonne « à retenir » est vide sur toute la philosophie

La zone « à retenir » — la colonne de droite au palier ≥1536 px, item 1 de
l'ordre de travail post-Fable, livrée et vérifiée — n'avait jamais été
mesurée SUR LE CORPUS. Elle l'a été :

| matière | chapitres portant une carte | notions entièrement vides |
|---|---:|---|
| maths | 96 / 123 (78 %) | 0 |
| pc | 117 / 189 (62 %) | 0 |
| svt | 16 / 87 (18 %) | 6 sur 11 |
| philo | **0 / 92 (0 %)** | **12 sur 12** |
| **total** | **229 / 491 (47 %)** | **18 sur 62** |

**La cause n'est pas un oubli d'autorat, c'est la source.** Le repli
automatique n'attrape qu'un bloc `$$…$$` détaché ; une leçon de philosophie
n'en contient aucun, et la plupart des leçons de SVT non plus. **La zone est,
par construction, une fonctionnalité de maths et de physique** — et rien ne
le disait nulle part.

**Ce n'est pas un défaut pour l'élève.** Le composant ne rend la carte que si
elle existe : la colonne vide ne peint rien, il reste un peu de blanc à
droite. Le calme est préservé et la règle d'état honnête tenue — c'est
d'ailleurs écrit dans `retenir.ts` : « une leçon sans formule encadrée n'a
rien à mettre là, et le dire par le vide est plus juste que de remplir ».

**C'est un arbitrage, et il est posé, pas tranché.** Une leçon de philosophie
a évidemment quelque chose à retenir : une thèse, une distinction, un auteur.
Ce qu'elle n'a pas, c'est une FORMULE — et le schéma du sidecar (`formula`,
rendue en KaTeX) ne sait représenter que ça. Ouvrir la zone à la philo
demande une **carte textuelle**, donc une décision de design avant toute
campagne d'autorat. Un seul sidecar existe aujourd'hui (`pc/rlc-serie`,
l'exemplaire prévu par la spec).

> **La règle que ça ajoute.** Une fonctionnalité livrée et vérifiée peut
> n'être vraie que pour une partie du corpus, et la vérification ne le dit
> pas : `dom-truth` teste la zone sur des leçons TÉMOINS, toutes
> scientifiques. **Le harnais prouve que le mécanisme marche ; seule une
> mesure sur le corpus dit sur combien de pages il a quelque chose à
> montrer.**

### 10.19 Le tableau qui manquait : neuf mécanismes, et sur combien de pages

L'angle mort ouvert au §10.18 a été instrumenté le jour même.
`web/scripts/portee-corpus.mjs` compte, par notion et par matière, ce que
chaque mécanisme livré a réellement à montrer :

| mécanisme | notions où il apparaît | total |
|---|---:|---:|
| points d'arrêt | **62 / 62** | 362 |
| figures | 51 / 62 | 261 |
| figures étagées | 51 / 62 | 236 |
| exercices | 49 / 62 | 98 |
| carte « à retenir » | 44 / 62 | 229 chapitres sur 491 |
| mouvements | **6 / 62** | 11 |
| interactives | **5 / 62** | 5 |
| embarqués | **4 / 62** | 6 |
| dérivations dépliables | **1 / 62** | 2 |

**Ce que le tableau montre, et qu'aucun document ne disait.**

*Les points d'arrêt sont la seule chose universelle.* 62 notions sur 62, 4 à
8 par leçon. C'est le mécanisme qui a été porté partout — et ça se voit.

*La philosophie est un désert visuel.* 92 chapitres, **4 figures en tout**,
toutes dans une seule notion (`analyse-de-texte`). Onze leçons de philo sur
douze n'ont pas une seule image, pas un schéma, pas une carte « à retenir ».
C'est cohérent avec la matière — mais c'est un fait de produit à connaître
avant de décider qu'« une leçon est une leçon ».

*Les lanes avancées du média D10 sont des exemplaires, pas des couches.*
Mouvements 6/62, interactives 5/62, embarqués 4/62, dérivations **1/62**.
`pc/rlc-serie` porte à lui seul 6 des 11 mouvements, 2 des 6 embarqués, les
2 dérivations et l'unique `retenir.json` : **c'est la notion vitrine, et
c'est la seule.** L'ADR 0026 l'annonçait ainsi (« 5 mouvements vérifiés,
3 embarqués curatés ») ; le tableau le rend visible d'un coup d'œil au lieu
de le laisser dans un texte de juillet.

**Ce que le tableau ne dit PAS, et le script le répète en clair :** si une
portée est bonne. Une dérivation dépliable n'a de sens que là où il y a une
dérivation à déplier ; une figure absente de toute une matière est peut-être
une dette, peut-être une décision. **Le tableau est un fait, le verdict est
pédagogique** — et il appartient à l'owner.

> **La règle.** « Livré » et « vérifié » ne disent rien de « présent ». Un
> mécanisme peut être parfaitement testé et n'exister nulle part. Le
> troisième chiffre — sur combien de pages — n'était compté par personne.

### 10.20 Deux résultats négatifs sur la lane des épreuves, et une fausse alerte

**Les épreuves sont complètes.** 39 épreuves assemblées, 247 exercices,
**1 472 questions — toutes avec leur `reasoning`** (le raisonnement d'expert,
pas juste la réponse), et 4 043 étapes de solution. Les 340 questions sans
tableau d'étapes ne sont pas des trous : ce sont les questions courtes dont
la réponse EST la prose (« interpréter graphiquement le résultat obtenu »),
et le champ est optionnel par construction (`steps.length > 0 ? steps :
undefined`).

**Aucune entrée de banque n'est orpheline.** Les 247 entrées portant une
source datée sont toutes assemblées dans une épreuve : rien de transcrit
n'est invisible à l'élève. C'est la vérification symétrique de la classe
« écrit et jamais rendu » (celle du champ `correct_feedback`, §10.7) — et
sur cette lane-là, elle est vide.

**Et une fausse alerte, gardée pour la méthode.** Une extraction maison du
HTML brut (`<[^>]+>` remplacé par une espace) faisait lire « 4 exercice s »
sur l'index des épreuves. Le défaut semblait certain, et il n'existe pas :
JSX rend `exercice` et `s` en deux nœuds de texte, React SSR insère un
`<!-- -->` entre eux, et c'est ce commentaire que la substitution a
transformé en espace. Vérifié dans un navigateur avant d'être rapporté :
`innerText` dit « 4 exercices ».

> **Le texte que l'élève lit est `innerText`, jamais une regex sur le
> balisage.** C'est pourquoi `typo-francaise`, `accents-manquants` et
> `renvois-visibles` lisent tous le DOM rendu. Une sonde bricolée en deux
> minutes pour « juste vérifier » est exactement l'endroit où l'on
> réintroduit le défaut que ces instruments existent pour éviter.

### 10.21 Le lien le plus important du site pointait où le hasard le mettait

Le tableau de bord ouvre sur **une** action principale : « Ta session · MAT
… · Commencer la session ». C'est le seul `[data-primary-action]` de la page
(DASHBOARD-SPEC §5), et c'est par là qu'un élève entre dans le produit.

**Ce qu'il désignait.** `startSession` (`lib/session.ts`) triait les notions
par `updatedAtMs` — la DATE DE FICHIER — et proposait « la plus récente ».
Après un clone frais, donc **à chaque déploiement Vercel**, toutes les dates
de fichier valent l'instant du checkout : le tri s'effondre et le pick
retombe sur l'ordre du système de fichiers. C'est **exactement le défaut du
§10.12**, corrigé le même jour dans la fin de leçon — et il vivait aussi
ici, sur un lien bien plus important.

**Et la ligne du dessous disait autre chose.** `NextUp` est rendu trois
lignes plus bas et répond à la même question par l'ordre du PROGRAMME.
Mesuré sur la page d'accueil, avant correction :

> Ta session · **PHILO — L'histoire** · Commencer la session
> Ensuite dans le parcours : **Limites et continuité**.

Deux surfaces de la même page, à trois lignes d'écart, proposant deux
matières différentes à un élève qui n'a encore rien fait. Le commentaire de
`NextUp` réclamait pourtant, depuis le début, que « les deux surfaces ne
soient jamais en désaccord sur l'ordre du programme » — il parlait de
`DEFAULT_ORDER`, et personne n'avait vu que la carte, elle, ne consultait pas
le programme du tout.

**Après.**

> Ta session · **MATHS — Limites et continuité** · Commencer la session
> Ensuite dans le parcours : **Dérivabilité et étude des fonctions**.

Une seule définition, `premiereDuParcours` (`lib/curriculum.ts`), partagée
par les deux surfaces — la troisième à rejoindre `DEFAULT_SUBJECT_ORDER` et
`nextInParcours` après la fin de leçon. Et `NextUp` s'ANCRE désormais sur ce
que la carte propose au même instant (la notion reprise, ou à défaut la
première du parcours) pour annoncer ce qui vient APRÈS elle : sans cette
ancre, les deux lignes nommaient la même notion — « commence ici X » puis
« ensuite X ».

> **La règle, et c'est la troisième fois de la journée qu'elle se paie.**
> Une DATE DE FICHIER n'est pas un fait sur le contenu. Elle survit mal au
> clone, elle ne survit pas au déploiement, et elle donne au code l'air de
> savoir quelque chose qu'il ignore. **Quand un produit doit ordonner son
> contenu, l'ordre doit venir du contenu** — ici, le programme officiel, qui
> ne dépend d'aucune horloge.

### 10.22 Les 62 leçons annonçaient « mis à jour septembre 2026 »

En retirant l'usage de `updatedAtMs` (§10.21), il restait son jumeau :
`updatedAt`, la date affichée dans le masthead de CHAQUE leçon —
« 2ᵉ Bac · Sciences · 32 min de lecture · **mis à jour septembre 2026** ».

Elle vient du même endroit : le `mtime` de `lesson.md`. Mesuré avant
retrait : **les 62 notions affichaient le même mois.** Et sur Vercel ce
serait pire encore — après un clone frais à chaque déploiement, toutes les
leçons annonceraient la date du déploiement, quel que soit leur âge réel.

Deux raisons de le retirer plutôt que de le réparer :

1. **Ce n'était pas un fait calculé mais un fait FABRIQUÉ.** Le spec du
   masthead exige « computed facts only » ; une horloge d'inode n'en est pas
   un. C'est la même règle que la zone « à retenir », qui préfère le vide au
   remplissage.
2. **La date ne suivait même pas le contenu.** Une campagne qui réécrit
   `items.yaml`, `checkpoints.yaml` ou une figure sans toucher `lesson.md` ne
   la bougeait pas d'un jour — et c'est exactement ce que la journée
   d'aujourd'hui a fait sur 32 notions.

Réparer par `git log` n'aurait pas sauvé grand-chose : les déploiements
clonent en profondeur 1, et tout le dépôt porterait alors la date du HEAD.
**Le chemin de retour, s'il en faut un, est un champ AUTORÉ** (« revu le… »,
comme `retenir.json` est autoré) : une date de révision est un fait
éditorial, pas une propriété de fichier.

`updatedAt`, `updatedAtMs` et la table `FRENCH_MONTHS` sont supprimés, avec
un bloc de retrait dans `content.ts` qui dit pourquoi et interdit leur retour
pour ordonner ou dater. Deux `statSync` par notion disparaissent au passage.

> **La règle, définitivement : une date de fichier n'est un fait sur le
> contenu qu'aussi longtemps que personne ne clone le dépôt.** Elle a coûté
> trois défauts en une journée — l'ordre de la fin de leçon, l'action
> principale du tableau de bord, et cette date affichée sur 62 pages.

### 10.23 Où les décisions de cet arc sont consignées

Les §10.1 à §10.22 racontent ce qui a été mesuré, trouvé et réparé — le
détail, dans l'ordre où il est venu. Les **décisions** qui en sortent, celles
qui gouvernent le code au-delà des correctifs du jour, sont dans
`docs/decisions/0031-faits-fabriques-et-portee-mesuree.md` :

| # | La décision | Née de |
|---|---|---|
| 1 | Un fait affiché vient d'une source qui survit au clone | §10.20, §10.21, §10.22 |
| 2 | Deux surfaces qui répondent à la même question partagent leur source | §10.20, §10.21 |
| 3 | Un chiffre dans un document porte la commande qui le produit | §10.16 |
| 4 | Une étiquette de statut se pose par document | §10.17 |
| 5 | Un blocage consigné nomme ce qui le lève | §10.17 |
| 6 | Un renvoi est une instruction (zone vivante / zone d'archive) | §10.14 |
| 7 | La portée d'un mécanisme se mesure, séparément de son bon fonctionnement | §10.12 |
| 8 | Une porte a deux sens quand un seul se laisse contourner | §10.10 |

Et les deux corrections que l'arc s'est appliquées à lui-même — la fausse
alerte « 4 exercice s » et le premier correctif de figure défait par la
mesure — sont dans la section *Retractions and Corrections* du même ADR,
parce qu'une méthode qui n'enregistre que ses succès n'est pas une méthode.

## 11. Addendum du 2026-09-05 (suite) — « dans quel ordre va le programme »

*Huit sections, et un fil unique qui les traverse : **une chose qui affirme
quelque chose de faux**. Une carte qui prétend donner l'ordre du cadre et
donne l'alphabet (§11.1) ; une leçon qui annonce ses notes d'atelier comme du
contenu (§11.3) ; une carte d'exercice qui n'annonce que son numéro (§11.4) ;
un compteur qui mesure la case au lieu de la chose (§11.5) ; une pastille de
CI verte sur des portes qui ne tournaient pas (§11.7) ; et — le plus utile —
une étiquette rendue fausse par un correctif juste de la veille au matin
(§11.8). Trois de ces découvertes sont venues d'une porte qui en savait plus
que son auteur ; deux d'un simple coup d'œil à une page.*

*Trois choses ont aussi été VÉRIFIÉES ET ÉCARTÉES, et elles comptent autant :
les 212 renvois à une figure absente (tous servis), les 24 labels de
misconception truffés de TeX (rendus nulle part), et l'ordre de rendu des
morceaux d'épreuve (correct partout).*

### 11.1 Quatre surfaces, quatre réponses

Le matin avait corrigé DEUX surfaces qui répondaient chacune de leur côté à
« par où commencer » (la carte de session et la fin de leçon). L'après-midi,
en regardant simplement la page d'accueil, en a trouvé deux autres.

La carte « **Le programme** » — le plus grand bloc de l'accueil, sous-titré
« couverture du cadre officiel, matière par matière » — triait ses 62
chapitres par `title.localeCompare`. Trois blocs plus haut, sur la MÊME page,
la carte de session proposait « Limites et continuité » et la ligne du
dessous annonçait « ensuite : Dérivabilité ». La carte du programme, elle,
ouvrait maths sur « **Arithmétique** », rang 13 sur 14 — le dernier bloc de
l'année. Et `/matieres/maths`, à un clic de là, donnait le bon ordre, groupé
par unité.

**59 chapitres sur 62 changeaient de rang entre les deux ordres.** Trois
seulement coïncidaient (Dipôle RC, Dipôle RL, L'histoire).

Le tri alphabétique n'était pas un autre ordre défendable : il n'en était pas
un. « La… » passe avant « Le… » avant « Les… », donc l'ordre suivait
l'**article**. En SVT il plaçait « Dysfonctionnements et aides du système
immunitaire » (rang 8) avant « Le soi et le non-soi » (6) et « Les moyens de
défense de l'organisme » (7) : la conclusion de l'immunologie avant ses
prémisses. En philo, « La méthode de l'analyse de texte » — la leçon qui
apprend à écrire l'épreuve — remontait au rang 5 par l'accident de la lettre
M, quand le cadre la place en clôture.

La quatrième surface : les **quatre raccourcis du menu « Notions »** du
header prenaient les quatre premiers DOSSIERS (`readdirSync`, l'alphabet des
slugs). Un menu qui offre quatre entrées dans l'année les prenait donc dans
l'ordre du système de fichiers. La palette ⌘K, à vide, faisait de même.

`chapterRank` et `sortByProgramme` (lib/curriculum.ts) sont la seule façon
d'appliquer l'ordre du cadre à une liste. **Porte armée, rouge vérifié** : tri
alphabétique rétabli, build complet, les cinq contrôles tombent en nommant le
rang fautif ; restauré, 258/258.

### 11.2 Deux dérives d'épreuve trouvées au même endroit

- L'index listait **SPC 2015 rattrapage AVANT la normale** — seule année sur
  vingt-deux à le faire. Le tri n'avait pas de départage par session : deux
  épreuves de la même année restaient dans l'ordre où la `Map` les avait
  rencontrées. Un ordre instable ne se voit que le jour où il se trompe.
- Le masthead de l'unique épreuve partielle affichait « **10,5 pts** » nu —
  qui se lit « épreuve sur 10,5 ». L'index le qualifiait déjà, le panneau
  « Avant de commencer » aussi ; le titre de la page, non.

### 11.3 Quatorze leçons ouvraient sur les notes de l'atelier

En REGARDANT le haut d'une leçon de philosophie — pas en cherchant une liste
connue — un bloc apparaît sous le titre, que les 48 autres leçons n'ont pas :

> **Notion :** Autrui — Philosophie · 2ème Bac (axe : la condition humaine)
> **Repère :** analyse de notion, problématisation, méthode de la dissertation

Rien là-dedans n'est pour l'élève. La première ligne répète le titre (le
`h1`), la matière (le fil d'Ariane) et le niveau (le masthead, trois lignes
plus haut — qui l'écrit « 2ᵉ Bac », l'orthographe correcte). La seconde est
une étiquette de cadre, identique mot pour mot sur dix des douze leçons de
philo. En maths, le même bloc portait pire :

> **Skill :** `sma_suites_numeriques` (code proposé — à confirmer par
> supabase-architect)

**Un code de base de données et le nom d'un AGENT interne, rendus à
l'élève** ; et en philo, « texte-spine : Bakounine ; summit : Kant ». Les
quatorze blocs sont retirés : aucun ne disait quelque chose que la page ne
montrait pas déjà.

La porte qui gardait les slugs, les chemins de dépôt et les codes de barreau
apprend trois classes de plus — noms d'agents, cinq mots d'atelier anglais,
et l'ordinal « Nème ». Elle juge 67 pages au lieu de 62.

**Elle a fait son propre test rouge** : à son premier tour armé elle a trouvé
un « 2ème » que mon balayage n'avait pas vu, dans la banque de
`systemes-oscillants`. La raison vaut d'être retenue — **`innerText` ne rend
pas le texte des chapitres masqués**, et sur ce site tous les chapitres sont
présents-mais-masqués. La règle de septembre (« le texte que l'élève lit est
`innerText` ») vaut pour JUGER une page à l'écran ; pour BALAYER un corpus
paginé, il faut dépouiller le HTML.

### 11.4 Neuf cartes d'exercice n'annonçaient que leur numéro

Une épreuve se sert en morceaux, et le seul texte qui distingue deux cartes
empilées est le libellé de position. Neuf ne disaient rien —
« Exercice 1 — Partie 2 (Chimie) », point — à côté d'un frère qui annonçait
« Partie 1 : chromage d'une plaque d'acier par électrolyse ». Sept des neuf
venaient de la même notion : une case laissée vide, pas une décision.

Titrées depuis leur propre énoncé, dans la forme exacte du frère. Quatre
dérives de ponctuation de plus alignées. **Porte armée** — et elle a trouvé
un neuvième cas sous une forme que je n'avais pas prévue
(« Partie 2, sous-partie 1 (Chimie) »). Deuxième armement de la journée où
la porte en sait plus que celui qui l'écrit.

### 11.5 La portée hors leçon, et un résultat négatif qui valait la mesure

`portee-hors-lecon.mjs` ferme la seconde moitié de l'angle mort n° 7 : 39
épreuves, 247 morceaux, 1 472 questions — **100 % avec un raisonnement expert,
94 % dont la correction déroule l'algèbre**, l'atelier à **1 notion sur 62**.

**Ce chiffre est le second. Le premier était faux, et le récit vaut plus que
le chiffre.** L'instrument comptait d'abord les questions portant un tableau
`steps`, en trouvait 77 %, voyait quatre épreuves de rattrapage concentrer le
manque (SPC 2021 R : **zéro sur 41**) et je l'ai publié comme une lacune de
campagne — sans avoir ouvert une seule de ces corrections. Elles déroulent
l'algèbre entièrement, en blocs `$$…$$` dans le raisonnement, chaque étape
portant son « pourquoi ». Les questions SANS `steps` en portent **deux fois
plus** que celles qui en ont ; les quatre épreuves accusées sont celles qui en
déroulent le plus. Sur les 93 questions sans ni l'un ni l'autre, **zéro**
demande un calcul sans recevoir de mathématiques.

> **Un compteur qui mesure le CONTENANT mesure une habitude de rédaction, pas
> ce que l'élève reçoit.** Compter la chose, pas la case où elle est rangée —
> et, avant de publier un manque, ouvrir un des cas qu'on accuse.

Et le résultat qui valait la mesure est négatif. Les énoncés portent **212
renvois distincts à une figure** que le produit ne rend jamais en image. La
conclusion évidente — « un sujet de physique sans ses figures est
insoluble » — est **fausse** : les 212 sont servis par une description
textuelle. Le compteur brut est passé de 554 « orphelins » à 25, puis 16, à
mesure que le motif s'élargissait ; les seize derniers, ouverts un par un,
sont tous corrects.

**Une porte est volontairement NON armée sur cette classe**, et c'est la
première fois qu'on l'écrit : le corpus emploie cinq conventions pour
introduire une description, et distinguer « décrit en ligne » de « orphelin »
demande de juger le sens. Les uniformiser coûterait seize modifications de
passages déjà corrects pour l'élève — de la turbulence au service du
vérificateur. Une porte ne s'arme que sur une classe propre ; celle-ci est
propre pour l'élève sans l'être pour la machine, et **c'est un cas où l'on
s'abstient**.

### 11.6 Deux façons de ne rien mesurer sans s'en apercevoir

Commises toutes deux aujourd'hui, consignées dans `INSTRUMENTS.md` :

1. **`lib/content.ts` résout la racine du contenu depuis le répertoire
   COURANT** et rend une liste VIDE ailleurs, sans erreur. Un compteur a
   annoncé « 0 épreuve » avec le même aplomb que « 39 », deux fois. **Un
   total de zéro se suspecte comme un total absurdement grand.**
2. **`innerText` ne voit pas les chapitres masqués** (§11.3).

### 11.7 La CI était verte sur des portes qui ne tournaient pas

Le run 442 a été regardé étape par étape plutôt que par sa pastille. Il en
sort trois défauts, tous de la même famille : **une porte qui a cessé de
mesurer sans jamais rougir.**

**Une route morte dans la liste.** `/options` était dans la liste CI de la
porte typographie. Il rend un 404 depuis la purge des bancs d'options. La
porte chargeait la page « Page introuvable », la trouvait typographiquement
propre, et imprimait « **✓ /options** ». La liste de routes EST la portée
d'une porte ; une entrée fautive l'ampute en silence. Les quatre portes à
liste refusent désormais tout statut ≠ 200 — vérifié rouge sur les quatre.

**Deux portes sur le même port.** `copie-maths` et `ancres-uniques`
réclamaient 3497 ; `donnees-sweep` et `accents-manquants`, 3496. Chacune
lance son `next start` détaché, et tuer l'enveloppe `npx` orpheline l'enfant
`next-server` — un défaut décrit dans l'en-tête de `dom-truth`, avec son
remède (`3200 + process.pid % 500`), depuis des mois. Les portes écrites
APRÈS lui sont revenues aux ports fixes. Le remède est repris dans les six.

**Une porte finissait son travail et ne rendait jamais la main.**
`ancres-uniques` imprimait « porte tenue ✓ » puis restait en vie jusqu'à ce
que la limite de 30 min du job la tue — **emportant les deux portes suivantes
(données, hygiène model-id), qui n'ont jamais tourné**.

La cause : un enfant `spawn`é garde un handle sur la boucle d'événements tant
qu'il n'est pas `unref()`. Le `next start` empêchait Node de sortir, et le
crochet `process.on("exit")` censé tuer ce serveur attendait la sortie que le
serveur empêchait. Le chemin d'ÉCHEC s'en tirait — `process.exit(1)` est
brutal ; c'est le chemin de SUCCÈS qui pendait. `serveur.unref()` + arrêt
explicite ; même défaut latent réparé dans la branche rapport de
`donnees-sweep`. **Le travail réel de cette porte prend 24 secondes**, serveur
froid, chronométré après le correctif : les huit minutes que la CI lui voyait
passer étaient de l'attente pure.

**ET J'AI D'ABORD LU LA MAUVAISE CAUSE.** La pastille disait « cancelled » —
le mot exact que produit aussi `cancel-in-progress: true` quand une poussée
en remplace une autre. J'ai conclu « le budget est trop court », relevé la
limite à 50 min et écrit le découpage mesuré dans le YAML. C'est en voyant le
processus pendre sur cette machine, log complet à l'appui, que la vraie cause
est apparue. Le budget relevé reste — une marge n'a jamais nui — mais il ne
répare rien, et les documents le disent maintenant.

> **Une pastille verte dit que rien n'a échoué, pas que tout a été mesuré.**

Ce que le run a confirmé, en revanche, et qui comptait : les sept portes
ajoutées aujourd'hui — les cinq d'ordre du programme, l'en-tête d'exercice,
le titre d'exercice — passent en CI, avec le chargement jiti de
`curriculum.ts` / `examens.ts` / `content.ts` depuis `dom-truth`. Ainsi que
la nouvelle suite `test-typographie` et la porte typographie avec l'espace
insécable nombre-unité.

### 11.8 Réparer l'ordre a rendu FAUSSE l'étiquette d'à côté

Le surtitre de la fin de leçon disait, en dur :

> **CHANGER DE MATIÈRE — PHILOSOPHIE**
> **L'histoire**

…au bas de la leçon « Autrui ». Qui est en philosophie.

**C'est le correctif du matin qui l'a cassé, et il faut le dire dans ce
sens-là.** Tant que la suggestion venait de la DATE DE FICHIER, elle sautait
d'une matière à l'autre au hasard, et « Changer de matière » tombait juste
assez souvent pour ne jamais se faire remarquer. En faisant suivre à la fin
de leçon l'ordre du programme — ce qui était juste — la suite est devenue
presque toujours le chapitre suivant de la MÊME matière. Mesuré :
**58 leçons sur 62** affichaient désormais « Changer de matière » sans
changer de matière. Seules quatre — les dernières de chaque matière — en
changent réellement.

Les cinq portes armées le matin n'ont rien vu, et ne pouvaient rien voir :
elles vérifient l'ORDRE rendu, pas l'ÉTIQUETTE posée dessus. **C'est en
ouvrant une leçon de philosophie à son dernier chapitre, pour regarder autre
chose, que c'est apparu.**

Le surtitre dit maintenant « La suite du parcours — <matière> » quand on
reste, « Changer de matière — <matière> » quand on change. La porte qui le
garde emploie **DEUX témoins** — une leçon dont la suite reste dans la
matière, une dont la suite en change — parce qu'un seul témoin se satisfait
d'une étiquette figée dans le bon sens pour ce cas-là.

> **Une correction juste peut invalider une hypothèse voisine.** Le harnais
> ne prévient pas : il garde ce qu'on lui a demandé de garder. Après une
> correction qui change ce que le produit CHOISIT, il faut rouvrir les pages
> où ce choix s'AFFICHE.

### 11.9 Le lien le plus important du site n'avait aucun test

`sessionFromState` (lib/session.ts) décide de l'ACTION PRINCIPALE de la page
d'accueil : quelle notion proposer, et si l'on dit « commencer » ou
« reprendre ». C'est le premier geste d'un élève qui ouvre le produit. Le
module n'avait **aucun test** — alors qu'il est une fonction PURE (elle reçoit
`notions` et `state`, elle ne lit rien), donc la chose la plus facile à
épingler de tout le produit.

Le manque s'est vu en corrigeant `startSession` le matin même. Il triait par
DATE DE FICHIER et proposait « la plus récente » ; après un clone frais, cela
retombe sur l'ordre du système de fichiers. **Rien n'aurait signalé le retour
du défaut.**

Dix tests, dont deux tombent si le tri par tableau revient — vérifié rouge en
remettant `notions[0]` à la place de `premiereDuParcours`. Les autres épinglent
ce qui n'avait jamais été énoncé nulle part :

- la notion proposée EXISTE dans la liste reçue (le cadre connaît des
  chapitres non construits) ;
- une notion DISPARUE, ou une entrée `perNotion` absente, retombe sur
  « commencer » — jamais une reprise cassée ;
- un index de chapitre hors bornes (99, ou −5) est ramené dans l'intervalle ;
- `chaptersTotal = 0` ne produit jamais « Chapitre 1 / 0 » ;
- et le motif affiché à l'élève n'invoque plus jamais une DATE — c'est le
  défaut du matin, épinglé par son énoncé même.

Quatre suites unitaires tournent maintenant en CI, contre deux ce matin :
apprenant (26) · écriture (20) · typographie (10) · session (10).

### 11.10 Le module le plus accidenté du produit n'avait aucun test non plus

`lib/examens.ts` assemble les 33 épreuves de bac à partir de morceaux
dispersés dans les banques. Son propre en-tête raconte **quatre défauts
d'ordre déjà corrigés** :

1. le repli sur l'identifiant, qui abîmait les épreuves mixtes (K-7) ;
2. le `??` qui ne rattrape pas `NaN`, et faisait passer un romain hors table
   pour « égal » ;
3. les sujets qui ne numérotent pas leurs exercices ;
4. une cinquième convention d'ordinal, ajoutée après un désordre constaté au
   rendu.

Un **cinquième** a été trouvé le 2026-09-05 : SPC 2015 listait le rattrapage
avant la normale, faute de départage explicite par session — deux épreuves du
même millésime restaient dans l'ordre où la `Map` les avait rencontrées.

Quatre corrections consignées, une cinquième trouvée à la main, et **pas une
ligne de test**. Chacune de ces cinq régressions serait revenue en silence.

Treize tests, sur le **corpus réel**. C'est délibéré et c'est le point de
méthode : les cinq défauts viennent tous de la rencontre entre une règle et
un LIBELLÉ PARTICULIER (« Partie II », « § 2 », « Deuxième partie », « 2ᵉ
situation », « — III. »). Un jeu d'essai inventé aurait contenu les cas
auxquels je pensais, c'est-à-dire ceux qui marchent. Le corpus contient ceux
auxquels personne n'a pensé. Prix : une dizaine de secondes.

Le premier test ne vérifie pas une règle métier — il vérifie que **le corpus
est chargé**. `lib/content.ts` résout sa racine depuis le répertoire courant
et rend une liste VIDE ailleurs, SANS erreur ; c'est le piège qui m'a fait
publier deux fois « 0 épreuve » dans la journée. Sans ce test, les douze
autres seraient verts sur zéro donnée. Vérifié rouge dans les deux sens :
en retirant le départage par session (`not ok 4`), et en lançant la suite
depuis la racine du dépôt (`not ok 1`, puis `not ok 12`).

Cinq suites unitaires en CI, contre deux le matin : apprenant (26) ·
écriture (20) · typographie (10) · session (10) · épreuves (13).

### 11.11 Une affirmation vraie, dont le chiffre avait vieilli de sept points

`lib/shuffle.ts` mélange les réponses d'un QCM de façon déterministe. Son
en-tête portait, depuis des années, la justification du module :

> le biais de **58 %** sur le choix A, mesuré dans l'ordre du fichier,
> disparaît

C'est une affirmation sur des **données**, pas sur du code. Elle peut cesser
d'être vraie sans qu'une ligne change : il suffit d'ajouter des items. Elle
n'avait jamais été re-mesurée.

Re-mesurée, sur les 1 612 items à choix du corpus :

    telle qu'écrite   A 65,0 %   B 14,0 %   C 11,4 %   D  9,7 %
    après mélange     A 25,7 %   B 25,4 %   C 24,0 %   D 24,9 %

**L'affirmation tient ; son chiffre avait vieilli de sept points.** Le biais
rédactionnel a GRANDI avec le corpus — 58 % puis 65 %. C'est exactement le
cas prévu par l'ADR 0031 : un chiffre dans un document voyage désormais avec
la commande qui le produit (`npm run test-melange`), et il est re-mesuré à
chaque passage de CI plutôt que recopié.

**Deux témoins, et c'est le point de méthode.** Un test qui vérifierait
seulement « c'est plat après mélange » serait vert sur un corpus déjà plat
avant — donc vert **avec le mélange désarmé**. Le troisième test vérifie donc
que le biais rédactionnel EXISTE encore. Vérifié rouge en remplaçant le corps
de `shuffledChoices` par `return choices;` : `not ok 2`, les six autres verts.

**Une copie que rien ne gardait.** L'algorithme est recopié à l'identique dans
`item-stats.mjs` et `dom-truth.mjs` (un script Node ne peut pas importer le
TypeScript de `web/src`). L'en-tête du module affirmait que « le sweep de
dom-truth existe pour attraper la dérive » : vrai pour la copie de dom-truth,
et seulement pour la notion balayée ce jour-là. **La copie d'`item-stats.mjs`
n'était vérifiée par rien.** Le dernier test compare le COMPORTEMENT des deux
copies au vrai module sur 500 tirages — pas leur texte, pour qu'un
reformatage ne fasse pas échouer une porte de comportement. Vérifié rouge en
changeant un seul chiffre du nombre premier FNV dans la copie
(`0x01000193` → `0x01000195`) : « scripts/item-stats.mjs : hachage divergent
sur « item-0-0 » ».

**Deux soupçons écartés au passage**, et ils comptent autant. La graine est
l'identifiant de l'item SEUL : neuf identifiants sur 1 612 sont portés par
deux items — tous des `LIB-n`, « libération de l'énergie » (SVT) et « la
liberté » (philo), une homonymie d'abréviation. Inoffensif pour le mélange
(les choix diffèrent), et inoffensif ailleurs : `revealKey` préfixe déjà par
la notion, et le modèle apprenant apparie toujours `notionId` +
`misconceptionId`, jamais l'identifiant d'item seul. Un test garde quand même
le plafond, pour qu'une collision de MASSE ne s'installe pas en silence.

Six suites unitaires en CI : apprenant (26) · écriture (20) · typographie
(10) · session (10) · épreuves (13) · mélange (7).

### 11.12 « Aucun mot désaccentué sur 65 pages » — et 938 dans le corpus

La porte `accents-manquants.mjs` existe depuis des mois, tourne en CI, et
répondait, verte : **« Aucun mot français désaccentué sur 65 page(s). »**

Le corpus contenait au même moment **938 occurrences** de formes nues dans le
texte que l'élève lit : « coherent » (42), « etablie » (26), « continuite »
(25), « recurrence » (22), « champ magnetique », « L'aveuglement des
sociologues ». Rien que dans les `note:` des banques d'exercices — le
raisonnement expert, c'est-à-dire la partie du produit qui prétend enseigner.

**La porte ne mentait pas. Elle mesurait sa LISTE**, qui comptait 654 formes,
et « empeche », « echappe », « coherent » n'y étaient pas. C'est le défaut de
l'ADR 0031 décision 9 pris dans son autre sens : une pastille verte ne dit pas
que tout a été mesuré — ici, elle disait la vérité sur un périmètre que
personne n'avait re-mesuré depuis l'écriture de la liste.

**Comment trouver les candidats sans dictionnaire français hors ligne.** Ni
`aspell` ni `hunspell` n'existent dans cet environnement. Par PREUVE INTERNE :
une forme nue est suspecte quand sa variante accentuée existe déjà dans le
corpus et y est au moins cinq fois plus fréquente — « empeche » (2) contre
« empêche » (132). Le corpus est son propre dictionnaire, et il ne peut pas
être indisponible.

**578 corrections, 41 fichiers.** Reste 389 occurrences délibérément non
touchées : les formes à plusieurs lectures (`piege` → piège ou piégé ;
`arrete` → arrête ou arrêté), qu'aucune règle ne tranche sans lire la phrase.
Elles sont pour une relecture humaine, et la porte ne les garde pas.

**LA RELECTURE DU DIFF EST LE SEUL GARDE-FOU QUI A TROUVÉ QUELQUE CHOSE.** Les
deux garde-fous automatiques — une seule variante accentuée possible, contexte
français obligatoire — ont laissé passer six erreurs, toutes attrapées en
lisant `git diff --word-diff` mot par mot :

- « conjugue l'égalité tout entière » et « on conjugue d, pas b ni c » — des
  IMPÉRATIFS, devenus des participes accentués ;
- « L'aveuglement des sociologues » — le NOM, devenu l'adverbe « aveuglément » ;
- « le ressort ni serre ni » et « colore » — des conjugaisons valides ;
- et surtout **`[[video:balancement]]` devenu `[[vidéo:balancement]]`** : une
  DIRECTIVE de contenu, lue par le rendu. L'intégration vidéo de la leçon RLC
  se serait éteinte en silence. Un slug de figure y avait échappé par accident
  — il porte un trait d'union, que la frontière de mot exclut déjà. Le script
  masque maintenant la directive entière : ne jamais dépendre d'un accident.

Les six sont dans la liste d'exclusion du script, avec la raison. Cette liste
est faite pour grandir, pas pour être juste du premier coup.

**Et un chiffre qui mentait dans la porte elle-même.** Sur une première liste
de routes fautive (les leçons vivent sous `/notions/<matière>/<slug>`, pas
`/<matière>/<slug>`), les 62 routes ont rendu un 404. La porte a refusé —
c'est le correctif du matin, et il a tenu. Mais elle a imprimé, juste
au-dessus de « porte ROMPUE » : « Aucun mot français désaccentué sur **62
page(s)** ». Elle comptait `routes.length`, pas ce qu'elle avait ouvert. Elle
compte maintenant les pages RÉELLEMENT mesurées, et l'affiche sur le total :
« 65 page(s) mesurée(s) sur 65 ».

Liste de la porte : **654 → 846 formes**. Vérifié sur le rendu, 65 pages,
zéro occurrence — et zéro faux positif, ce qui était le risque réel d'un
élargissement de 192 formes.

### 11.13 Les 39 épreuves n'avaient jamais été balayées

En vérifiant l'exemption « (sic) » du §11.12, elle est restée verte dans les
deux sens — avec l'exemption, sans elle. Un contrôle qui ne peut pas devenir
rouge ne contrôle rien : la raison n'était pas l'exemption, c'était que **le
texte de l'épreuve n'était pas là**.

`EpreuveShell` a trois phases et démarre au « seuil » : la page
`/examens/<id>` ne contient, au chargement, que le masthead et les conditions.
L'énoncé n'entre dans le DOM qu'après « Commencer l'épreuve ». Les portes
faisaient `goto` puis `networkidle`, et mesuraient le masthead.

**Et les 39 routes n'étaient même pas dans la liste.** La porte accents ne
portait que `/examens` — la page de LISTE. La porte typographie portait une
seule page de sujet, ajoutée à la main, qui revenait verte pour la raison
ci-dessus. Le plus gros bloc de prose française du produit après les leçons,
et le seul transcrit VERBATIM, n'avait jamais été ouvert par un instrument.
C'est l'ADR 0031 mot pour mot : **la PORTÉE d'un mécanisme se mesure à part
de son bon fonctionnement.**

Les deux portes cliquent maintenant le bouton, et la liste des 39 se lit là où
elle est vraie (`scripts/routes-examens.mjs` appelle `listEpreuves()`, la même
fonction que la page /examens) plutôt qu'écrite en dur dans le YAML de CI —
une liste figée aurait rendu vertes les épreuves ajoutées ensuite.

Ce que l'ouverture a trouvé, en une fois :

**1. Des commentaires de rédaction AFFICHÉS à l'élève.** Quatorze notes
internes, `<!--` compris, dans le texte d'énoncé de huit sujets. Sur le
rattrapage 2012, un élève qui ouvre l'épreuve lit :

    <!-- DÉFAUT DU SUJET OFFICIEL, DÉCLARÉ ET RÉPARÉ ICI (F4), 2026-09-04.
    Le bandeau de la page 2 du document officiel francophone imprime, mot
    pour mot : « Première partie (03 points) : Électrolyse de la solution
    de cuivre II. » — les mots « bromure de » MANQUENT. […] l'original
    arabe RS28 écrit « برومور …

Le markdown des leçons retire ces commentaires ; le chemin de l'énoncé
d'épreuve, non. Rien ne pouvait le voir : le HTML pré-rendu ne les contient
pas non plus, puisque l'énoncé n'existe qu'après le clic. Les quatorze notes
sont sorties du texte rendu et remises en commentaires YAML au-dessus de leur
champ — **verbatim, pas une ligne perdue** : c'est du travail de sourcing, il
a de la valeur, il n'a simplement rien à faire sous les yeux d'un élève.

**2. 626 écarts de typographie française, sur les 39 sujets sans exception.**
Apostrophes droites, pas d'insécable devant « : ? ; ». Tous dans les deux
seuls champs rendus en texte NU — l'en-tête d'exercice (`h2`) et le libellé de
partie — donc hors du chemin markdown qui applique `remarkFrenchTypography`.
Une ligne dans `app/examens/[id]/page.tsx` répare la surface entière : **626 →
0**, sans toucher un fichier de contenu.

**3. Un mot désaccentué qui restait**, « interpretation graphique » dans un
libellé de partie de SM 2024. Plus deux régressions de MA passe du §11.12,
trouvées ici et nulle part ailleurs — voir ci-dessous.

**Les deux régressions que j'avais poussées.** La passe d'accents avait touché
deux choses qu'elle n'aurait jamais dû toucher :

- `« la transmission et la reception *(sic)* »` — du texte d'examen transcrit
  **verbatim**. Le corpus reproduit les coquilles des sujets officiels et les
  signale d'un « (sic) » : « désintegration », « coincïde » (tréma mal placé),
  « complétement ». C'est une règle éditoriale, et la corriger détruit la
  fidélité au sujet que l'élève verra le jour de l'épreuve. La marque devenait
  en plus absurde, posée sur un mot devenu correct.
- `(derivation:verification-cosinus)` → `(dérivation:…)` — un renvoi à
  l'identifiant d'une dérivation, cité en prose. Rien ne casse à l'exécution ;
  le renvoi désigne simplement un identifiant qui n'existe pas.

Les deux sont rétablies. La porte saute désormais un mot suivi d'un « (sic »
dans les 60 caractères — **la marque EST l'exemption** —, et le script de
campagne ne touche ni une ligne verbatim, ni les six lignes qui suivent une
annonce du type « Coquilles reproduites verbatim, non réparées : », ni un
renvoi de la forme `mot:identifiant`.

État après : **accents 0 sur 104 pages, typographie 0 sur 111 pages** — les
62 leçons ET les 39 épreuves —, dom-truth 262/262, six suites unitaires.

### 11.14 49 formules affichées en LaTeX brut, dans les corrigés d'épreuve

Suite immédiate du §11.13. Une fois les épreuves ouvertes, il restait une
troisième porte fermée : le **corrigé**. `EpreuveShell` est attempt-first
absolu — le raisonnement expert n'entre dans le DOM qu'en phase « correction »
(dom-truth l'asserte, et c'est une bonne chose). Il faut donc DEUX actions
pour voir tout ce que l'élève voit : « Commencer l'épreuve », puis
« Terminer ». Les deux portes les font maintenant.

Ce que la seconde action a révélé : **428 écarts de typographie, tous dans des
`span.katex-error`.** C'est-à-dire : KaTeX n'avait pas réussi à lire la
formule, et **il en peint la source, en rouge**. Un élève lisait, à la place
du raisonnement :

    \qquad\Longrightarrow\qquad
    v_L = \frac{c}{n_L}$$

    **L'application numérique.**

**49 formules, sur 11 des 39 sujets.**

La cause, une fois le message KaTeX lu (« Can't use function '$' in math
mode ») : un bloc de maths d'affichage écrit

    $$n_L = \frac{c}{v_L}
    \qquad\Longrightarrow\qquad
    v_L = \frac{c}{n_L}$$

— les `$$` **collés au contenu**, sur plusieurs lignes. Le lecteur markdown ne
reconnaît pas le bloc, passe la chaîne entière à KaTeX, et KaTeX bute sur le
`$$` de clôture qu'elle contient. La forme canonique — les deux `$$` seuls sur
leur ligne — rend partout. **215 blocs remis en forme dans 47 fichiers.**

Les 62 leçons étaient à zéro avant comme après : la même forme y passe, parce
que le markdown d'un `.md` donne au bloc un contexte que la chaîne YAML n'a
pas. C'est pour cela que rien ne l'avait vu — le défaut n'existe que sur la
surface qu'aucun instrument n'ouvrait.

Une porte neuve garde l'acquis : `formules-rendues.mjs`, 101 pages (62 leçons
+ 39 épreuves), rouge dès **une** formule illisible. Vérifiée rouge en
remettant un seul bloc dans l'ancienne forme :

    ✗ /examens/spc-2025-rattrapage — 1 formule(s) en LaTeX brut
    ParseError: KaTeX parse error: Can't use function '$' in math mode

Ce qu'elle ne dit pas, et il faut l'écrire : **elle dit qu'une formule est
LISIBLE, pas qu'elle est JUSTE.** Une formule fausse mais bien formée passe
ici sans un mot.

**La porte a DEUX directions, et aucune ne suffit seule.** La moitié « rendu »
ne peut pas ouvrir ce que l'élève n'ouvre pas non plus : les 49
`exercises.yaml` — l'exercice sommet de chaque leçon — ne se révèlent qu'après
une TENTATIVE, et aucun instrument ne sait répondre à une question. Une
seconde passe fait donc l'inverse : elle prend chaque `$…$` et `$$…$$` du
corpus, tel qu'il est écrit, et le donne à KaTeX. **71 174 formules ; une
seule refusée** — `$90^\\circ$`, une contre-oblique de trop dans un scalaire
YAML non quoté, à trois cents lignes d'un voisin quoté qui écrivait la même
chose correctement.

Et cette passe-là est AVEUGLE au défaut qui précède : chacune des 49 formules
cassées était, prise seule, du LaTeX parfaitement valide. Le défaut n'existait
qu'à la couture entre le markdown et KaTeX. Deux passes, deux angles morts
complémentaires — vérifiées rouges chacune de son côté : un bloc remis dans
l'ancienne forme pour le rendu, une formule invalide glissée dans un
`exercises.yaml` pour la source.

Trois défauts trouvés au passage dans le `\text{}` des formules, invisibles à
la porte accents tant que le corrigé restait fermé : « qu'a l'etablissement »,
« une espece chimique », « initialement charge ». Et deux renvois
`derivation:verification-cosinus` cités en prose — réécrits en français (« la
vérification du cosinus, au chapitre 3 ») : un identifiant n'a rien à faire
dans une phrase lue par un élève, et la typographie française y insérait en
plus une insécable avant le « : », ce qui le mangeait comme référence.

### 11.15 Des phrases françaises enfermées dans des boîtes de maths

Troisième instrument pointé sur les épreuves : **l'impression**. Un élève
imprime un sujet pour le faire au stylo — c'est l'usage le plus naturel de
cette page. La porte impression tourne en CI depuis des semaines ; elle ne
portait pas les 39 sujets, et les aurait passés sans rien mesurer, pour la
raison désormais familière (l'énoncé n'entre dans le DOM qu'après
« Commencer »).

Ouverte pour de bon : **7 sujets sur 39 débordaient la colonne imprimable**
(717 px), le pire à **1 147 px**. Tous pour la même cause :

    $$\boxed{\text{Une seule maille\,: condensateur } C \text{ (initialement
    chargé) en série avec le conducteur ohmique } R, \text{ boucle fermée par
    l'interrupteur a } t=0}$$

**Une formule KaTeX ne se coupe pas.** Une phrase de 127 caractères enfermée
dans `\boxed{\text{…}}` est une seule ligne indivisible. Conséquences, toutes
mesurées :

- sur papier, la fin de la phrase est **coupée par le bord de la feuille** ;
- la phrase perd la typographie française (l'apostrophe droite reste droite,
  aucune insécable) — `remarkFrenchTypography` ne traverse pas KaTeX ;
- elle perd ses accents quand l'auteur a contourné l'échappement : le corpus
  écrivait « tangente a l origine », « controle 63 % », « boucle fermee » ;
- le lecteur d'écran l'annonce comme une **formule**, pas comme une phrase ;
- et elle n'est ni sélectionnable proprement, ni trouvable par ⌘F.

**14 blocs de ≥ 70 caractères, ramenés à zéro** — plus 5 autres trouvés en
re-mesurant. Le corpus avait déjà sa forme pour cela : `**Conclusion.**`,
employée 23 fois. Les conclusions en prose la prennent ; les boîtes MIXTES
gardent la formule dans la boîte et sortent la phrase ; les gloses coincées
dans un champ `math:` rejoignent le `note:` d'à côté, ce qui leur rend au
passage leurs accents et leurs apostrophes.

Un morceau de jargon interne partait avec : « rung R4 », « rung R6 » — des
identifiants de barreau, rendus en maths au milieu d'une phrase, remplacés par
les numéros de chapitre.

Après : **impression 0 défaut sur 104 pages** (62 leçons + 39 épreuves + 3),
les deux thèmes.

### 11.16 L'audit complet — chaque instrument, chaque surface, et ce qu'il a vu

Demandé en fin de journée : « un audit complet ». Le voici, mesuré et non
raconté. Vingt instruments hors CI ont été inventoriés (`INSTRUMENTS.md`
en donne la table), puis lancés sur les 62 leçons ET les 39 épreuves — les
épreuves ouvertes en deux clics, comme les portes CI depuis le §11.13. Les
portes CI elles-mêmes tournent sur le run 454 au moment où ceci s'écrit ; le
run 451, sur la même pile d'instruments, était vert en 28 min 35 s.

**Ce qui est propre, et le chiffre qui le dit :**

| instrument | surface | résultat |
|---|---|---|
| `contrast-gate` | 80 paires, deux thèmes | tout passe |
| `regle-atelier` | l'atelier | 0 violation |
| `slugs-visibles` | 62 leçons | 0 slug visible |
| `liens-internes` | 72 pages, 108 cibles | 0 morte |
| `liens-fichiers` | 765 fichiers | 0 renvoi mort en zone vivante |
| `token-gate` | tout le code composant | une seule syntaxe |
| `validate-content --strict` | 62 notions | 0 échec |
| `etroit-sweep` | 108 pages × 320/360/390 px — les 39 épreuves ouvertes en deux clics | 0 débord |
| `zoom400-sweep` | 108 pages à 400 % (320 × 256 px) — les 39 épreuves ouvertes en deux clics | 0 débord, 0 barre collante, 0 page à moins de 3 lignes de prose, 0 navigation inatteignable |
| `zoom-sweep` (texte à 200 %, SC 1.4.4) | 67 pages, 360 px, machine à froid | **61 débords réels**, de 16 à 200 px — ramenés à **0** le même soir (§11.17). Le « 0 » consigné hier au §8.5 n'était pas reproductible : l'arbre d'hier, reconstruit, rend 61 |
| `pagination-probe` | 60 liens profonds | 60 tenues, 0 rompue |
| `annonce-sweep` | 106 pages dont les 39 épreuves | 0 région assertive, 0 focus perdu, 0 recul de tabulation |
| `copie-maths` | 39 épreuves, 29 325 formules | 0 caractère en trop |
| `impression` | 104 pages, deux thèmes | 0 défaut (après le §11.15) |
| `formules-rendues` | 101 pages + 71 169 formules à la source | 0 illisible, 0 refusée |
| `portee-hors-lecon` | 39 épreuves, 1 472 questions | 100 % avec raisonnement, 93 % avec algèbre montrée |
| `reseau-malade` | 5 scènes sous latence et pertes injectées | toutes tenues (6 requêtes perdues sur 155, par construction) |
| `cls-sweep` | 70 pages, réseau libre | 0,000 à 0,010 partout sauf **`/examens/<id>` à 0,320** — le décalage du bouton « Commencer » à l'échange de fonte, déjà mesuré et porté à l'arbitrage propriétaire (§8.5) : inchangé |
| `poids-sweep` | 70 routes, processeur bridé | la page la plus lourde du produit est `/notions/pc/rlc-serie` : 30 280 nœuds, 4,5 s de tâches longues sous bridage ×6, réactive après 3,4 s — un FAIT à garder en tête pour la vidéo et les figures, pas un défaut mesuré contre un seuil |
| `gel-epreuve` (nouveau) | 39 épreuves, processeur ×6 | 3–15 s de gel au « Commencer », 3–30 s au « Terminer » → révélation progressive, §11.20 |
| `gel-lecon` (nouveau) | 62 leçons, processeur ×6 | aucune tâche ≥ 1 s ; page réactive 1,9–7,3 s après la navigation, 16 leçons > 5 s, §11.21 |
| `gel-chapitre` (nouveau) | 62 leçons, processeur ×6 | une tâche de 1,2 s en médiane au changement de chapitre (36 leçons ≥ 1 s) → 0,4 s (2 leçons ≥ 1 s) après correctif, §11.22 |
| `clic-qcm` (nouveau) | 11 leçons, processeur ×6 | tâche la plus longue du clic 0,18 → 0,16 s de médiane à ×6 (0,36 → 0,23 s sur l'item le plus dense), un gain petit et réel, §11.23 |
| `gel-chapitre` retour + `cv-chapitre` | 62 leçons, processeur ×6 | aller sans gain (0,41 → 0,44 s), retour 0,16 → 0,10 s ; dom-truth rouge sous content-visibility → retiré, §11.24 |
| dom-truth prose-measure, dernier chapitre ouvert (portée étendue) | 3 pages × 2 états | 3 libellés de carte à 743 px (93ch) → `max-w-reading`, §11.25 |
| `js-ventilation` (nouveau) | 4 pages types | 143 ko de pipeline markdown/KaTeX sur ~350 ko de JS par leçon (épreuve 126/285), leçon sans formule comprise — levier owner, §11.26 |
| `trace-chargement` (nouveau) | 3 leçons, processeur ×6 | le JavaScript fait 50–63 % du fil principal au chargement, l'hydratation React en tête ; compilation 0,3–0,5 s seulement, §11.26 |
| `epreuve-3g` (nouveau) | 3 épreuves, 3G lente + ×4 | bouton visible à 4–7 s, mort jusqu'à ~17 s (20 appuis) → désactivé et honnête, pipeline différé, §11.27 |
| `lecon-3g` (nouveau) | 3 leçons, 3G lente + ×4 | « Chapitre suivant » visible à 4–8 s, mort jusqu'à 17–28 s → désactivé et honnête jusqu'à l'hydratation, §11.28 |
| `veille-hydratation` (nouveau) | 3 pages, 3G lente et 250 kb/s ; morceau d'entrée bloqué | un morceau perdu n'était dit que 8,3 s après la perte, par-dessus la ligne « se prépare… » → écouteur `error` en tête, +0,3 s, une seule voix, filet à 30 s, §11.29 |
| `retour-bfcache` (nouveau) | 3 paires de pages, réseau libre et 3G lente | leçons et épreuves restaurées en 0,1 s par Retour, chapitre conservé ; l'accueil rebâti pendant les 6 s de préchargement de l'action principale — assumé, §11.30 |
| `memoire` (nouveau) | 62 leçons, 3 leçons × 60 changements, 2 épreuves révélées, VmRSS de 5 pages | tas 7–11 Mo, aucune fuite ; 2 300–66 000 nœuds (97 % repliés, 90 % KaTeX) ; 166–226 Mo par leçon, 296–309 Mo par épreuve corrigée — le levier §8.7 vaut aussi pour la mémoire, §11.31 |
| `recherche-palette` (nouveau) | 17 requêtes + Échap | « maths » 0, « svt » 0, « 2025 » 0, focus perdu à Échap → 25, 12, 3, focus rendu ; « acide », « nucléaire » restent à 0 (mots-clés = contenu), §11.34 |
| `polices` (nouveau) | 5 pages ; 117 pages pour latin-ext | 6 fichiers, 324 ko par page → 4 fichiers, 239 ko (latin-ext préchargé pour 0 caractère) ; Geist Mono 70 ko pour 80 caractères — levier design, §11.35 |
| `couleurs-forcees` (nouveau) | accueil, leçon, épreuve, contraste élevé émulé | 3/5 et 13/40 commandes sans aucun bord (« Commencer l'épreuve » en texte nu) → 0 ; focus et cartes tenaient déjà, §11.36 |
| `espacement-texte` (nouveau) | 7 pages × 390/1 280 px, surcharges WCAG 1.4.12 | aucun débord ; a fait sortir les troncatures « … » de l'accueil (7/62 titres à 390 px) et des épreuves (24/24 sous-titres) → ils se plient, §11.38 |

**Ce qui est connu et reste au propriétaire** — re-mesuré à l'identique, pas
redécouvert : `horsligne-sweep` (une leçon déjà visitée, cliquée hors ligne,
donne l'écran du navigateur — `docs/audits/hors-ligne.md` §« résultat qui
tranche un autre arbitrage ») ; `recherche-navigateur` (⌘F ne trouve pas dans
un chapitre replié — §10, arbitrage assumé) ; `polices-de-repli` (287 nœuds
sur 63 pages dessinés par DejaVu Sans : `ᵉ`, `ℤ`, `✓`, l'arabe — même
inventaire qu'au §« caractères que la police ne dessine pas ») ;
`portee-corpus` (dérivation dépliable sur 1 leçon sur 62, figures animées sur
6 — des portées, pas des défauts, et le verdict est pédagogique).

**Ce que l'audit a trouvé de FAUX dans un instrument**, et c'est la seule
correction : `renvois-visibles` déclarait la leçon RL fautive pour « 1 code
R » — `R0`. C'était le **résistor** du schéma, `R_0` rendu par KaTeX en spans
dont l'`innerText` recolle « R0 », et onze étiquettes « R0 » dans
`rl-schema.svg`. Un code de barreau vit dans la prose ; la sonde lit
maintenant la prose — le texte des formules et des étiquettes SVG est vidé
avant la lecture. Vérifié rouge avec un témoin « rung R4 et R7 » injecté en
prose : la sonde mord encore (1 rung, 2 codes), et la leçon RL est à zéro.

**Les 16 « renvois visuels sans description » de `portee-hors-lecon`** ont été
lus un par un. Ce sont les faux positifs que l'instrument annonce lui-même
(« majorant ») : `**Le dispositif (figure 1).**` EST une description que son
motif rate quand un tableau précède ; « montage schématisé sur la figure 1,
constitué d'un générateur… » décrit le montage dans la phrase même ; « même
boucle que la figure 1 de la première expérience » renvoie à une figure
décrite plus haut dans la même entrée. Aucun des quatre échantillonnés n'est
un trou. Le chiffre reste un majorant ; il est maintenant lu.

**Trois instruments de plus ouvrent les épreuves** pour que ces zéros
restent vrais : `etroit-sweep`, `zoom400-sweep`, `annonce-sweep` lisent les
39 sujets par `routes-examens.mjs` et font les deux clics.

### 11.17 Texte à 200 % : le zéro d'hier n'existait pas, les 61 débords oui

Le §8.5 dit, depuis hier : « 227 signalements, ramenés à 0 ». L'audit complet
a relancé le même instrument sur le même corpus : **61 débords à 360 px**, de
16 à 200 px. Ma première explication — écrite dans le commit de l'audit — fut
que la machine était chargée et que les largeurs se lisaient avec les métriques
de la fonte de substitut. **C'était faux**, et il faut le dire dans cet ordre :
relancé seul, machine à froid, fontes attendues : 61. Puis l'arbre d'HIER
(6dfcb92), reconstruit dans un worktree et balayé par son propre script : **61
aussi**. Le zéro d'hier n'était pas reproductible ; sa cause n'est pas établie.
L'attente de `document.fonts.ready` ajoutée à l'instrument reste — c'est une
hygiène de mesure — mais elle n'expliquait rien.

**Les 61 étaient réels, et de six espèces.** Toutes tiennent à la même loi de
mise en page, celle que le §8.5 énonçait déjà sans l'avoir appliquée partout :
*une boîte flex ou une piste de grille ne descend pas sous la largeur
min-content de son contenu, et `overflow-wrap: break-word` ne change PAS cette
largeur.* À 200 % de texte, tout ce qui est dimensionné en `rem`, `ch` ou
max-content double ; l'écran, non.

| espèce | pages | débord | correction |
|---|---|---|---|
| fil d'Ariane : dernier maillon `truncate max-w-[28ch]` — 28ch font 430 px | 62 leçons | 47 à 200 px | `max-w-[min(28ch,100%)]`, `min-w-0 max-w-full` sur le maillon |
| bouton « J'ai fait ma tentative — voir le raisonnement » : inline-flex à largeur max-content dans une colonne de 208 px | 15 leçons | 47 px | `max-w-full text-left` (idem TransportButton, ExplicationPlayer) |
| légende de figure : item flex sans `min-w-0` | géométrie-espace | 49 px | `min-w-0 break-words` |
| `h1` « Physique-Chimie » : item flex à côté du point de couleur | /matieres/* | 54 px | `min-w-0 break-words` |
| cartes de filière : item de GRILLE sans `min-w-0` | /commencer | 98 px | `min-w-0` sur le `li` |
| accueil : bouton `.btn-primary` (48 px de padding de chaque côté) et piste de grille implicite `auto` fixée par « Mathématiques » | / | 16 px | `max-width: 100%` sur le bouton ; `grid-cols-1` (= `minmax(0,1fr)`) sur la grille |

Trois passes de mesure, à froid : 61 → 2 → 1 → **0 sur 67 pages**. Le mot le
plus long, « Mathématiques », a été le dernier debout : sur un item flex,
`min-w-0` suffit pour qu'il se coupe ; sur une piste de grille, non — la piste
elle-même doit être bornée (`minmax(0, 1fr)`), parce que la contribution
min-content d'un item flex ignore son `min-width: 0`.

Retiré dans l'ADR 0031 (rétractations) : le zéro du §8.5, et ma phrase sur les
métriques du substitut.

### 11.18 Le même instrument, deux surfaces de plus : les 39 épreuves ouvertes, et 320 px

Le §11.17 laissait l'instrument zoom à 0 sur 67 pages — les 62 leçons, une
seule épreuve (jamais ouverte), et 360 px comme seule largeur de téléphone.
Le soir même il a reçu ce que huit autres instruments avaient reçu dans la
journée (§11.13) : les 39 épreuves par `routes-examens.mjs`, ouvertes en deux
clics ; et une largeur de plus, 320 px, le plus petit écran que le produit
promet (§8). Il a trouvé deux choses que rien n'avait mesurées.

**Dans les cartes d'épreuve, du texte COUPÉ.** La carte d'exercice porte
`overflow-hidden` pour arrondir ses coins ; ce qui la dépasse disparaît sans
un mot. À 200 % de texte sur 360 px, 8 cartes sur 7 sujets SPC coupaient de
6 à 93 px :

- l'intitulé d'exercice (`h2`), item flex de l'en-tête, ne descend pas sous
  son mot le plus long — et sur les vieux sujets SPC l'intitulé EST le titre
  (« Exercice de Chimie — Première partie : suivi conductimétrique ») →
  `min-w-0 break-words`, même correctif que le `h1` de /matieres au §11.17 ;
- une formule inline dans une parenthèse en italique — `*(Contrôle de
  tangence refait : $(T)$ passe par…)*`, corrigé SPC 2012 R — échappait aux
  trois sélecteurs qui font défiler les formules inline sur téléphone (`p >`,
  `li >`, `td >`) : `em >` et `strong >` s'y ajoutent, et `h2/h3/h4 >` pour la
  formule d'un titre (arithmétique, « PGCD(252, 198) »).

**Sur 320 px, la PAGE déborde de 36 px sur presque toutes les leçons.** Un
seul coupable, trouvé par bissection : le libellé « VÉRIFIE TA COMPRÉHENSION »
de la carte de point d'arrêt. Le composant `Eyebrow` met son texte à côté
d'un trait, en flex, SANS boîte propre — un nœud texte nu est un item flex
anonyme, et rien ne peut lui donner `min-w-0`. La carte a 48 px de marge de
chaque côté à 200 %, il reste 160 px, et « COMPRÉHENSION » en capitales
espacées en fait 220. Le libellé est maintenant un `span` à `min-w-0
break-words`. Trois débords de moins d'un pixel de chaque côté du même écran
ont été corrigés au passage : les deux boutons « Chapitre précédent /
suivant » qui ne tenaient plus côte à côte (312 px dans 256 : `flex-wrap`),
et les titres des cartes d'exercice qui DÉFILAIENT dans leur carte au lieu
de se replier (dix sur douze dans chute-mouvements-plans, jusqu'à 218 px :
`min-w-0 break-words` sur le `h3`).

**Le second 36 px, dans la section « Pour t'entraîner ».** Une fois le
libellé de la carte de point d'arrêt replié, 49 leçons sur 62 débordaient
encore de 36 px à 320 px — le même chiffre, une autre cause, trouvée par
bissection au niveau de la SECTION (la bissection par enfant ne pouvait pas
la voir : plusieurs panneaux d'exercice débordaient à la fois). Dans le
panneau « Exercice de type bac », la colonne de question fait 88 px à 200 %
(la numérotation prend le reste), et le bouton « J'ai fait ma tentative —
voir le raisonnement » y contient « raisonnement » : 200 px. Le bouton avait
reçu `max-w-full` au §11.17 — sa BOÎTE se pliait, mais son libellé était un
nœud texte nu, item flex anonyme, et sortait de la boîte. Le libellé est
maintenant un `span` à `min-w-0 break-words` ; le bouton de l'explication
animée (ExplicationPlayer) portait le même défaut, corrigé avec.

**La porte a rougi en CI avant que le correctif n'existe.** Le run 458 —
poussé sur demande du crochet d'arrêt, avec les 49 encore présents — a rendu
la porte zoom ROUGE en 3 min 27 s, avec exactement les 49 pages du balayage
local. C'est la première fois qu'une porte de cette campagne tombe en CI, et
elle tombe pour de vrai : une porte qui ne peut pas rougir n'est pas une porte
(ADR 0031, décision 9). Le même run a mesuré la porte presse-papier allégée :
**7 min 27 s** contre 12 min 09 s la veille au soir.

**Un correctif retiré avant d'être bâti.** Le message du commit `b785dd2`
annonce un quatrième correctif : le titre de leçon d'un seul mot —
« Arithmétique », 370 px — qui « poussait la page de 58 px ». Cette mesure a
été prise sur le serveur périmé décrit ci-dessous, sans `globals.css` ; sur
le vrai build, le titre tient. L'édition (`break-words hyphens-auto` sur le
`h1`) a été retirée avant d'atteindre un build : un correctif sans défaut
mesuré est du bruit, et son commentaire aurait consigné un chiffre faux.

**Une demi-heure perdue, et une garde qui n'existait pas.** Après le
rebuild, l'instrument a rendu 876 px de débord sur une leçon que la sonde
donnait à 36. Aucun des six correctifs n'était en cause : le serveur relancé
n'avait PAS été relancé — Next renomme son processus `next-server`, le `pkill
-f "next start"` n'a rien tué, et l'ancien serveur servait un HTML pointant
vers les fichiers CSS de l'ancien build, effacés du disque. Réponse 400 sur
`globals.css`, page rendue aux seuls utilitaires Tailwind, et toute mesure
fausse. Le serveur se tue désormais par son port ; et `zoom-sweep` refuse de
mesurer une page dont une feuille de style répond ≥ 400 (INSTRUMENTS, piège
n° 4). Une page sans sa feuille de style n'est pas une page.

**La garde contre le serveur périmé a été testée en rouge.** Feuille
`globals.css` renommée sur le disque, instrument relancé : sortie 2 en 7 s,
avec le message qui nomme la feuille et le statut 400. Un premier essai avait
renommé la mauvaise feuille (la première par ordre alphabétique, que les
leçons ne chargent pas) et n'avait rien déclenché — un test rouge qui ne
rougit pas dit d'abord que le test vise à côté.

**Le chiffre final.** Build reconstruit, serveur relancé par son port,
feuilles de style vérifiées à 200 : **0 signalement sur 105 pages à 360 px,
0 sur 105 pages à 320 px** — 210 mesures en 8 min 16 s, les 39 épreuves
ouvertes. Le build mesuré portait encore le `hyphens-auto` du titre de leçon,
retiré dans le même commit ; c'est une classe qui n'agit que quand un mot ne
tient pas, et le titre tient (mesuré : 320 px de document, chapitre 1, à
200 %). La CI (run 459, porte zoom à 320 px) re-mesure le même zéro sur le
code exact.

Deux autres changements à l'instrument, pour qu'il puisse entrer en CI : il
lit d'abord la géométrie (`scrollWidth`, `clientWidth`) et ne calcule le
style que des nœuds qui débordent — sur une page de 30 000 nœuds, calculer le
style de chacun coûtait des secondes ; et il lance son propre serveur quand
`BASE` manque, comme les autres portes.

### 11.19 Deux soupçons re-mesurés, et déjà traités

Deux mesures lancées ce jour-là ont retrouvé un terrain déjà couvert, et il
faut le dire pour que personne ne le refasse une troisième fois.

**L'indice de longueur.** Mesuré : la bonne réponse est strictement la plus
longue dans 38,8 % des 1 612 items, contre 25 % au hasard. C'est exactement
le chiffre du cliquet `indice-longueur.mjs` armé plus tôt dans la journée
(« 38 % où la clé est la plus longue »). Rien de neuf.

Mais la première formulation de la mesure, elle, était fausse, et c'est ce qui
mérite d'être gardé : par matière, elle donnait « SVT 61,8 % », le pire du
corpus. En SVT les quatre choix sont des paragraphes de 200 caractères ; l'un
d'eux est forcément le plus long, et 8 caractères d'écart ne se voient pas.
Re-mesuré au RAPPORT (longueur de la clé ÷ moyenne des distracteurs), la SVT
est la matière la plus PROPRE du corpus : moyenne 1,09, et **zéro** item
au-dessus de 1,5×. « Strictement le plus long » comptait un classement ; il ne
mesurait pas ce qu'un élève peut voir.

**L'indice absolu.** Mesuré : 295 items (18,3 %) portent un « toujours /
jamais » dans un distracteur et pas dans la bonne réponse. Le cliquet
`indice-absolu.mjs`, armé le même jour, mesure la chose opérante — « éliminer
tout ce qui sur-affirme ne laisse qu'UNE réponse debout, et c'est la bonne » —
et il est à zéro. Les deux chiffres ne se contredisent pas : le mien compte
une asymétrie, le sien compte une asymétrie EXPLOITABLE.

**Repères de la nuit du 5 au 6 septembre (§11.20–11.25).** §11.20 : les
épreuves gelaient 10 et 17 s au « Commencer » et au « Terminer » → révélation
progressive, premier énoncé 1,4 s, premier corrigé 0,8 s. §11.21 : les 62
leçons au même protocole — pas un gel, un silence d'hydratation de 1,9 à
7,3 s ; une formule de leçon coûte 1 ms, une formule d'épreuve 16 ms. §11.22 :
le changement de chapitre, seul vrai gel (1,2 s, 36 leçons ≥ 1 s), causé par
un crochet qui re-rendait tous les items → 0,4 s, 2 leçons. §11.23 :
`MathText` mémoïsé. §11.24 : `content-visibility` essayé, mesuré, retiré.
§11.25 : trois libellés de 93 caractères hors de portée de la porte
prose-measure → corrigés, portée doublée. §11.26 : 143 ko de pipeline
markdown/KaTeX dans le JavaScript de chaque page — le levier « pré-rendre au
build », pour le propriétaire. §11.27 : sur 3G lente, le bouton
« Commencer l'épreuve » ignorait le doigt dix secondes → désactivé et honnête
tant que la page se charge, pipeline markdown chargé après l'hydratation. §11.28 : les leçons aussi — « Chapitre
suivant » mort jusqu'à 28 s → `useHydrated`, commandes désactivées et
`aria-busy` avant l'hydratation, « La page se prépare… ». §11.29 : un
morceau de JavaScript perdu n'était dit que 8,3 s après, par-dessus cette
ligne → écouteur `error` en tête du document + Resource Timing, bandeau à
+0,3 s (ou à l'arrivée des feuilles de style), filet à 30 s, une seule voix ;
« Recharger » coûte 75 ko. §11.30 : le bouton Retour restaure leçons et
épreuves en 0,1 s, chapitre conservé ; l'accueil est rebâti si on le quitte
pendant les 6 s de préchargement de l'action principale — su, assumé.
§11.31 : la mémoire — 7 à 11 Mo de tas, aucune fuite en 60 changements de
chapitre, 166–226 Mo de processus de rendu par leçon (296 pour une épreuve
corrigée) ; 97 % des nœuds dans des chapitres repliés, 90 % de KaTeX.
§11.32 : une adresse inconnue sous une route dynamique servait un HTML
vide (page blanche 12 s sur 3G lente) → `dynamicParams = false`, la page
introuvable prérendue est servie ; porte armée.
§11.33 : « Commencer » et « Terminer » laissaient le focus sur `<body>`
sans annonce → focus sur le premier exercice / le premier corrigé, région
`status` persistante ; `annonce-sweep` mesure les deux gestes.
§11.34 : la palette ⌘K ne trouvait ni « maths » ni « svt » ni « 2025 » et
rendait le focus à `<body>` → alias de matière, groupe Épreuves, retour du
focus ; `recherche-palette` rouge/vert.
§11.35 : 324 ko de polices par page dont 84 ko de latin-ext préchargé pour
aucun caractère (« œ » est dans latin) → `subsets: ["latin"]`, 239 ko ;
Geist Mono, 70 ko pour 80 caractères, posé au propriétaire.
§11.36 : en contraste élevé Windows, « Commencer l'épreuve » et tout
bouton sans bordure devenaient du texte nu → contour système en `outline`
sous `@media (forced-colors: active)`.
§11.37 : la CI n'a plus de runner depuis le 2026-09-11 à 18:53Z (runs 494–723 en quelques s,
sans journal ; quota ou limite de dépense du compte, à vérifier par le
propriétaire) ; la batterie a été rejouée en local sur HEAD.
§11.38 : 7 titres de leçon sur 62 en « … » sur l'accueil à 390 px, 24
sous-titres d'exercice sur 24 dans les épreuves → ils se plient.
§11.39 : l'auto-évaluation d'un corrigé coûtait 144 arrêts de tabulation de
radios (motif ARIA absent) → roving tabindex + flèches, 48 ; les 99
paragraphes focalisables (Chrome 130 + `overflow-x` de prose) mesurés,
levier `overflow-x: clip` différé.
§11.40 : la barre d'auto-évaluation changeait en silence pour un lecteur
d'écran → `aria-live="polite"` `aria-atomic` ; le chrono reste muet.
§11.41 : toute commande a un nom accessible (WCAG 4.1.2), pages et états
révélés compris — 0 sans nom ; instrument armé.
§11.42 : les cibles tactiles passent WCAG 2.5.8 (AA), les manques restants
sont AAA (44×44), assumés sur un produit de bureau.

### 11.20 Le téléphone gelait au « Commencer » et au « Terminer » d'une épreuve

Le §8 avait mesuré une leçon dense qui ignore le doigt 6,7 s sur un
téléphone bon marché (processeur bridé ×6), et laissé au propriétaire le vrai
levier — ne pas rendre tous les chapitres d'un coup — parce qu'il casse quatre
propriétés que la leçon tient. Personne n'avait posé la même question à la
page d'épreuve. Elle est pire, et son levier ne casse rien.

**LE FAIT.** Le document d'épreuve est léger (≤ 194 ko bruts, 53 ko gzip)
parce que tout se rend côté client, en deux gestes : « Commencer » rend d'un
coup tous les énoncés, « Terminer » d'un coup tous les corrigés. Sur les 39
sujets, processeur bridé ×6, l'écran gèle **de 3 à 15 s au « Commencer »**
(médiane 10 s ; 66 à 433 formules d'énoncé) et **de 3 à 30 s au
« Terminer »** (médiane 17 s ; 256 à 1 668 formules de corrigé), la plus
longue tâche unique allant de 2,6 à 15,9 s (médiane 6,4 s) — un intervalle
pendant lequel rien ne répond, ni le défilement, ni un appui. Le coût se
décompose en une part fixe et une part par formule : au « Terminer », environ
6 s + 16 ms par formule ; au « Commencer », 4 s + 25 ms par formule (le
pipeline markdown pèse plus que KaTeX sur les énoncés, courts et nombreux).
Le tableau complet, avant et après, est plus bas.

**LA CAUSE, en deux couches.** Chaque bloc de texte (énoncé, raisonnement,
intro) passe par le pipeline markdown complet — remark, GFM, typographie
française, KaTeX, RTL — dans le rendu React, et tous les blocs d'une phase
sont rendus dans le même rendu : une seule tâche, aussi longue que la somme.
Et `MdBlock`, le composant qui porte ce pipeline, n'était pas mémoïsé : à
CHAQUE rendu du parent, chaque bloc repassait par le pipeline entier. Dans
l'épreuve, le parent se re-rend à chaque seconde du chrono.

**CE QUI A ÉTÉ FAIT.** Deux choses, mesurées ensemble ci-dessous.

- `MdBlock` est mémoïsé (`React.memo`) : deux chaînes en props, inchangées,
  rien à refaire. Cela vaut pour les 62 leçons aussi (cartes d'exercice,
  points d'arrêt), pas seulement pour l'épreuve.
- `EpreuveShell` révèle les questions PAR LOTS, chaque lot dans une
  transition React (`useTransition`) : le rendu d'une transition est découpé
  en tranches, le fil d'exécution redevient libre entre deux, et chaque lot
  est validé (commit) avant que le suivant ne commence — le premier énoncé,
  puis le premier corrigé, apparaissent en une fraction du temps total. La
  taille du lot est un budget de formules (~80), arrivé à la quatrième
  version après trois mesures (récit ci-dessous). Les coquilles d'exercice
  (en-tête, points) sont là d'emblée ; les énoncés déjà rendus restent en
  place pendant la correction (deux compteurs, un par phase). La racine porte
  `data-sujet-complet` puis `data-corrige-complet` quand la dernière question
  de la phase est rendue.

**LA PREMIÈRE VERSION, ET CE QU'ELLE A APPRIS.** La révélation a d'abord
été faite par EXERCICE. Mesurée sur 12 sujets (processeur ×6) : le premier
corrigé apparaît en **0,4 à 0,9 s** (médiane 0,7 s) au lieu de 11 à 30 s, le
premier énoncé en 1,2 à 2,9 s (médiane 2,1 s) au lieu de 7 à 13 s ; le
corrigé complet en 11,5 s de médiane au lieu de 17 — mais la tâche la plus
longue restait de 1,6 à 4,8 s (médiane 2,1 s) sur les sujets denses : un exercice de corrigé de 250 formules
est un seul rendu, et React ne découpe pas À L'INTÉRIEUR d'un composant qui
parse et rend d'un bloc. L'unité est donc devenue la QUESTION : chaque bloc
de raisonnement est un rendu, la tâche la plus longue est bornée par le plus
gros bloc du sujet. Les chiffres définitifs sont ceux de la cinquième version, dans le
tableau ci-dessous.

**LA DEUXIÈME VERSION, ET CE QU'ELLE A COÛTÉ.** Par question, la tâche la
plus longue est tombée où on l'attendait (médiane 2,1 s → 0,6 s à ×6, sur 5
sujets), mais le sujet complet est passé de 5,2 s à 10,7 s de médiane et le
corrigé complet de 11,5 s à 22,5 s — plus lent que SANS révélation
progressive. Quarante
commits au lieu de dix, et chacun réconciliait les dix articles entiers : le
découpage coûtait plus qu'il n'économisait. L'article d'exercice est donc un
composant mémoïsé (`ExerciceArticle`) qui reçoit des compteurs BORNÉS à
l'exercice — un article dont rien ne change garde des props identiques et
n'est pas re-rendu. **Cela n'a rien changé** : sur trois sujets re-mesurés,
corrigé complet 22,5 → 22,0 s, 9,8 → 10,3 s, 27,0 → 25,2 s ; même nombre de
tâches longues (68, 43, 71) — du bruit. Le coût par commit n'était
donc pas la réconciliation React mais la MISE EN PAGE de toute la page à
chaque commit — trente mille nœuds relus quarante fois. La conclusion
s'inverse : moins de commits, plus gros, et bornés.

**LA QUATRIÈME VERSION, par LOTS à budget.** Chaque commit révèle autant de
questions qu'en tient un budget d'environ 80 formules (le `$` compte les
formules, à peu près), et au moins une : une dizaine de commits par sujet,
chacun borné — sauf quand une seule question dépasse le budget à elle seule,
un bloc étant atomique. L'article mémoïsé reste (il ne coûte rien). Mesurée sur les 39 sujets
(processeur ×6) : au « Commencer », le premier exercice apparaît en 2,1 à
3,5 s (médiane 2,7 s) et le sujet complet en 3,0 à 6,5 s (médiane 5,0 s,
contre 10 s avant) ; au « Terminer », le premier corrigé en 0,4 à 0,8 s
(médiane 0,6 s, contre 17 s) et le corrigé complet en 2,7 à 31,6 s (médiane
7,8 s, contre 17 s — quatre rattrapages denses dépassent 20 s, SM 2024 R en
tête à 31,6 s pour 1 668 formules) ; la tâche la plus longue tombe de 6,4 s à
0,7 s de médiane, 1,6 s au pire (quatre sujets au-dessus de 1,3 s, tous des
rattrapages). Que le TOTAL soit lui aussi deux fois plus court tient sans
doute surtout à la mémoïsation de `MdBlock` — avant elle, chaque seconde du
chrono refaisait passer par le pipeline tous les blocs déjà affichés ; la
part de chaque cause n'a pas été mesurée séparément.

**LA CINQUIÈME VERSION, le premier lot est UNE question.** Le premier
exercice mettait 2,7 s à apparaître parce que le premier lot était plein —
80 formules, l'intro comprise — alors qu'une question seule en demande une
fraction. Le premier lot de chaque phase est donc une seule question ; les
suivants gardent le budget. Mesurée sur les 39 sujets : au « Commencer »,
le gain est net — le premier exercice apparaît en 0,8 à 2,0 s (médiane 1,4 s,
contre 2,7 s à la quatrième version et 10 s avant) ; au « Terminer », il n'y en
a pas (premier corrigé 0,8 s de médiane contre 0,6 s : du bruit) — le premier
corrigé était déjà borné par la part fixe du commit de changement de phase, pas
par la taille du lot. Tout le reste est inchangé au-delà du bruit : sujet
complet 4,7 s, corrigé complet 7,8 s, tâche la plus longue 0,7 s (1,6 s au
pire, les mêmes quatre rattrapages). C'est la version en place.

Et dom-truth a trouvé un défaut de la première version avant qu'elle ne soit
mesurée : il appuie sur « Terminer » une centaine de millisecondes après
« Commencer » — pendant que les énoncés se révèlent encore. Le passage en
phase correction figeait le compteur du sujet ; les exercices dont l'énoncé
n'avait pas été révélé n'avaient ni énoncé ni corrigé, tandis que le compteur
du corrigé atteignait la fin et posait `data-corrige-complet` : « 4/10
exercices corrigés », marqueur présent. Un élève sur un téléphone lent peut
faire la même chose. Le sujet finit maintenant toujours avant que le corrigé
ne commence, quelle que soit la phase, et le marqueur du corrigé exige celui
du sujet. Re-mesuré par dom-truth sur le build corrigé, avec le même
« Terminer » à 100 ms : « 10 exercices sans correction pendant l'épreuve ;
10/10 corrigés + auto-notation après ». (Le seul rouge de ce run était le
garde-fou de fraîcheur du build — deux commits faits pendant qu'il tournait.)
Refait sur la cinquième version : 262 vérifications, zéro rouge, en local
(empreinte = HEAD) comme dans la CI (run 469, 4 min 32 s).

**LE TABLEAU — 39 sujets, processeur bridé ×6, avant (un seul rendu par
phase) → après (cinquième version).** Les colonnes « après » donnent le délai
jusqu'au PREMIER exercice ou corrigé affiché, puis jusqu'au marqueur de phase
complète ; « avant », il n'y avait qu'un seul instant, celui où tout
apparaissait. Produit par `gel-epreuve.mjs` (`CPU=6`), trié par gel au
« Terminer » décroissant.

| sujet | formules énoncé / corrigé | « Commencer » : gel avant → 1er exercice / complet après | « Terminer » : gel avant → 1er corrigé / complet après | tâche la plus longue avant → après |
|---|---|---|---|---|
| `spc-2024-rattrapage` | 409 / 1357 | 13.4 s → 1.5 s / 5.8 s | 30.4 s → 1.1 s / 22.8 s | 13.2 s → 0.9 s |
| `spc-2022-rattrapage` | 433 / 1175 | 14.8 s → 1.5 s / 6.3 s | 29.8 s → 0.9 s / 15.8 s | 10.3 s → 1.0 s |
| `sm-2023-normale` | 184 / 1152 | 13.2 s → 1.3 s / 5.7 s | 27.8 s → 0.7 s / 20.6 s | 14.9 s → 1.0 s |
| `spc-2023-rattrapage` | 279 / 1154 | 12.3 s → 1.5 s / 5.2 s | 26.8 s → 0.8 s / 18.8 s | 12.0 s → 1.3 s |
| `spc-2025-rattrapage` | 375 / 1104 | 12.9 s → 1.6 s / 6.5 s | 26.6 s → 1.0 s / 16.8 s | 10.3 s → 1.4 s |
| `sm-2024-rattrapage` | 201 / 1668 | 9.5 s → 1.3 s / 4.9 s | 25.8 s → 0.9 s / 30.2 s | 15.9 s → 1.6 s |
| `spc-2021-rattrapage` | 401 / 1147 | 13.6 s → 2.0 s / 6.5 s | 25.3 s → 0.8 s / 16.2 s | 13.2 s → 0.8 s |
| `sm-2023-rattrapage` | 183 / 1569 | 12.9 s → 1.9 s / 5.1 s | 24.4 s → 0.7 s / 23.9 s | 15.4 s → 0.8 s |
| `sm-2022-normale` | 199 / 1075 | 11.2 s → 1.9 s / 4.7 s | 21.8 s → 0.8 s / 15.6 s | 9.9 s → 0.8 s |
| `spc-2013-rattrapage` | 252 / 906 | 11.9 s → 1.4 s / 4.4 s | 21.4 s → 0.8 s / 14.8 s | 10.5 s → 1.4 s |
| `sm-2025-normale` | 145 / 820 | 9.6 s → 1.2 s / 3.9 s | 20.8 s → 0.8 s / 11.8 s | 10.5 s → 0.8 s |
| `sm-2024-normale` | 172 / 936 | 10.0 s → 1.5 s / 4.9 s | 20.1 s → 0.6 s / 15.6 s | 10.4 s → 0.9 s |
| `spc-2010-normale` | 235 / 626 | 11.2 s → 1.6 s / 4.6 s | 19.2 s → 0.8 s / 8.2 s | 7.5 s → 0.7 s |
| `spc-2017-normale` | 259 / 662 | 10.5 s → 1.5 s / 5.3 s | 18.9 s → 1.0 s / 8.5 s | 7.4 s → 0.7 s |
| `spc-2012-rattrapage` | 186 / 711 | 9.0 s → 1.4 s / 4.0 s | 18.6 s → 0.7 s / 10.7 s | 7.7 s → 0.9 s |
| `spc-2015-normale` | 263 / 650 | 12.4 s → 1.4 s / 5.4 s | 18.6 s → 0.8 s / 6.7 s | 5.8 s → 0.6 s |
| `spc-2015-rattrapage` | 263 / 680 | 10.0 s → 1.6 s / 5.0 s | 18.5 s → 0.7 s / 7.8 s | 6.8 s → 0.7 s |
| `sm-2017-normale` | 162 / 764 | 8.6 s → 1.6 s / 4.2 s | 18.4 s → 0.8 s / 11.4 s | 8.2 s → 1.0 s |
| `spc-2021-normale` | 282 / 657 | 11.7 s → 1.6 s / 5.5 s | 17.8 s → 0.8 s / 7.6 s | 6.4 s → 0.8 s |
| `sm-2019-normale` | 152 / 815 | 7.8 s → 1.3 s / 3.7 s | 17.3 s → 0.7 s / 9.0 s | 8.0 s → 0.5 s |
| `spc-2022-normale` | 295 / 514 | 13.2 s → 1.5 s / 6.5 s | 17.3 s → 1.0 s / 4.8 s | 4.4 s → 0.8 s |
| `spc-2023-normale` | 281 / 521 | 11.8 s → 1.2 s / 4.7 s | 17.3 s → 0.7 s / 5.5 s | 5.1 s → 0.7 s |
| `spc-2020-normale` | 252 / 494 | 10.0 s → 1.1 s / 4.4 s | 17.0 s → 0.7 s / 5.6 s | 5.4 s → 0.7 s |
| `spc-2019-normale` | 229 / 582 | 9.5 s → 1.2 s / 4.9 s | 16.7 s → 0.7 s / 6.6 s | 5.6 s → 0.7 s |
| `spc-2011-rattrapage` | 266 / 582 | 9.9 s → 1.6 s / 4.8 s | 16.3 s → 0.8 s / 7.2 s | 5.1 s → 0.7 s |
| `spc-2012-normale` | 251 / 616 | 9.9 s → 1.7 s / 5.0 s | 16.0 s → 0.6 s / 7.8 s | 5.2 s → 0.7 s |
| `spc-2024-normale` | 291 / 486 | 12.4 s → 1.5 s / 5.7 s | 15.7 s → 0.8 s / 4.6 s | 3.6 s → 0.6 s |
| `sm-2021-normale` | 129 / 762 | 6.8 s → 1.4 s / 3.5 s | 15.3 s → 0.5 s / 10.3 s | 7.9 s → 0.7 s |
| `spc-2011-normale` | 288 / 520 | 9.7 s → 1.5 s / 4.5 s | 14.5 s → 0.8 s / 4.6 s | 4.1 s → 0.6 s |
| `spc-2025-normale` | 270 / 489 | 10.2 s → 1.5 s / 4.7 s | 13.9 s → 0.8 s / 5.0 s | 4.9 s → 0.7 s |
| `spc-2018-normale` | 254 / 440 | 9.7 s → 1.3 s / 4.6 s | 13.4 s → 0.8 s / 3.8 s | 3.2 s → 0.6 s |
| `sexp-2023-normale` | 182 / 534 | 7.6 s → 1.4 s / 4.1 s | 11.4 s → 0.7 s / 5.3 s | 3.8 s → 0.6 s |
| `sexp-2022-normale` | 158 / 538 | 7.4 s → 1.2 s / 3.4 s | 11.1 s → 0.5 s / 5.6 s | 4.3 s → 0.7 s |
| `sexp-2020-normale` | 131 / 526 | 7.0 s → 1.3 s / 3.6 s | 10.9 s → 0.7 s / 6.2 s | 5.1 s → 0.8 s |
| `sexp-2024-normale` | 165 / 482 | 7.2 s → 0.8 s / 3.1 s | 10.8 s → 0.6 s / 5.7 s | 4.4 s → 0.6 s |
| `sexp-2021-normale` | 128 / 431 | 4.1 s → 1.1 s / 3.1 s | 10.7 s → 0.6 s / 4.0 s | 4.3 s → 0.5 s |
| `sexp-2019-normale` | 130 / 404 | 7.1 s → 1.3 s / 3.3 s | 10.6 s → 0.5 s / 4.2 s | 3.4 s → 0.5 s |
| `sexp-2018-normale` | 159 / 520 | 7.3 s → 1.3 s / 3.8 s | 10.4 s → 0.6 s / 5.0 s | 4.1 s → 0.4 s |
| `sm-2020-normale` | 66 / 256 | 3.1 s → 1.4 s / 2.7 s | 3.4 s → 0.5 s / 2.9 s | 2.6 s → 0.4 s |

**CE QUE LE TABLEAU DIT.** Médianes sur 39 sujets : « Commencer » 10,0 s →
premier exercice 1,4 s, sujet complet 4,7 s ; « Terminer » 17,3 s → premier
corrigé 0,8 s, corrigé complet 7,8 s ; tâche la plus longue 6,4 s → 0,7 s.
L'élève voit le premier énoncé en 1 à 2 s et le premier corrigé en moins
d'une seconde sur toute la banque, et plus aucun sujet ne bloque le fil plus
de 1,7 s d'un coup. Ce qui reste : les quatre corrigés les plus denses (SM
2024 R, SPC 2024 R, SM 2023 N et R) mettent encore 20 à 30 s à finir de se
rendre — lisibles et réactifs pendant ce temps ; c'est le travail total, que
la révélation progressive ne réduit pas. La mesure est un bridage émulé ×6
sur la machine de la session, pas un téléphone : les rapports avant/après
sont plus fiables que les valeurs absolues.

**CE QUE ÇA CHANGE POUR LES INSTRUMENTS.** Dix instruments ouvrent les 39
sujets ; ils attendaient `[data-exam-exo]` puis un délai de 250 à 500 ms. Avec
la révélation progressive, ce délai mesurerait une page à moitié rendue — et
la mesurerait VERTE, moins de texte donnant moins de défauts. Tous attendent
désormais les deux marqueurs (INSTRUMENTS, « Le protocole d'ouverture d'une
épreuve »), dom-truth compris.

**CE QUE ÇA NE FAIT PAS.** Le travail total ne diminue pas : le corrigé de
SPC 2024 R demande toujours ~1 350 rendus KaTeX. Il est découpé et le
premier exercice arrive tôt ; la page redevient lisible et réactive pendant
que le reste se prépare. Le levier suivant — ne rendre que ce qui est près
de l'écran — a été écarté : les instruments qui lisent le DOM après
« Terminer » perdraient leur portée, et un élève qui imprime son corrigé
aussi.

### 11.21 Le silence des leçons, mesuré sur les 62 — et ce n'est pas un gel

Le §8.7 avait mesuré trois leçons denses et un témoin : `reactions-acido-basiques` « ne répond à aucun appui pendant 6,7 s » à ×6. INSTRUMENTS listait
depuis « le gel des LEÇONS au même protocole que les épreuves » comme portée
manquante de `gel-epreuve.mjs`. Fait cette nuit : `web/scripts/gel-lecon.mjs`,
les 62 leçons, viewport 390, processeur bridé ×6, observateur de tâches
longues posé AVANT la navigation, lecture après deux secondes de calme.

**LE FAIT.** Aucune leçon ne bloque le fil plus d'une seconde d'un coup : la
tâche la plus longue va de 0,3 à 1,0 s (médiane 0,5 s ; le 1,0 s est
`pc/rlc-serie`). Le blocage total (somme des tâches longues au-delà de 50 ms)
va de 0,6 à 2,8 s (médiane 1,0 s), sur 9 tâches en médiane. Ce qui est long,
c'est le temps avant que la page ne RÉPONDE : la dernière tâche longue finit
1,9 à 7,3 s après le début de la navigation (médiane 3,5 s). Seize leçons
au-dessus de 5 s — onze de maths sur quatorze, cinq de physique-chimie ;
vingt-quatre au-dessus de 4 s (13 des 14 de maths, 11 des 25 de PC, aucune
de SVT ni de philo) ; quatorze sous 2,5 s (9 des 11 de SVT, 5 des 12 de
philo). Par matière, médiane : maths 5,3 s, PC 3,8 s, philo 2,6 s, SVT 2,3 s.
Les cinq pires : `pc/rlc-serie` 7,3 s, `maths/geometrie-espace` 6,8 s,
`pc/reactions-acido-basiques` 6,4 s, `maths/suites-numeriques` 6,1 s,
`maths/nombres-complexes-2` 6,1 s.

**CE QUE ÇA CONFIRME, ET CE QUE ÇA CORRIGE.** Sur les trois leçons denses du
§8, les deux mesures se recoupent à 0,3–0,4 s près (6,4 s ici contre
« réactif après 6,7 s » ; 6,1 contre 6,05 ; 7,3 contre 7,7). Les origines
diffèrent — ici le début de la navigation, là l'événement `load` — et cela se
voit sur le témoin léger : `svt/moyens-de-defense` fait 2,1 s ici contre
0,8 s là, l'écart étant le réseau et l'analyse du HTML (~1 s), qui pèsent
en proportion quand il n'y a presque rien à hydrater. Ce que le §8 appelait
« ignorer le doigt pendant 6,7 s » n'est donc PAS un fil gelé : c'est une
hydratation en une dizaine de tâches d'une demi-seconde, entre lesquelles la
page défile, mais pendant laquelle aucun gestionnaire React n'est encore
attaché — un appui sur la flèche de chapitre ou sur un bouton de QCM ne fait
rien. Le défaut est réel ; sa forme est autre : pas un gel, un silence. Le
§8 est laissé tel quel (il dit ce qu'il a mesuré, avec sa méthode), cette
section porte la correction.

**LE CHIFFRE QUI COMPTE POUR LES ÉPREUVES.** À ×6, une formule de leçon
coûte ~1 ms de blocage au client (régression grossière sur les 62 : 0,7 s
+ 1,0 ms par formule) ; une formule de corrigé d'épreuve en coûtait ~16 ms
(§11.20). Seize fois plus, parce que la leçon rend KaTeX au build et le
client n'hydrate que du HTML, quand l'épreuve rend KaTeX dans le navigateur.
C'est le prix du « rien du corrigé dans le DOM avant la tentative » — payé
sciemment, et connu maintenant.

**CE QUE ÇA NE CHANGE PAS.** L'arbitrage du §8.7 reste entier et reste au
propriétaire : ne pas servir les 14 chapitres d'un coup vaut ~85 % du
silence, au prix de quatre propriétés. Il a maintenant sa distribution
complète — seize leçons au-dessus de 5 s, toutes de maths ou de PC — au lieu
de trois témoins. Rien du produit n'a été modifié dans cette section.

**LA MESURE.** `BASE=http://127.0.0.1:3911 CPU=6 node scripts/gel-lecon.mjs`
depuis `web/`, machine à froid, ~12 s par leçon, build de HEAD servi par
`next start` (les deux feuilles de style vérifiées à 200 — le piège n° 4).
Un bridage émulé, pas un téléphone : les rapports comptent plus que les
valeurs. Ce qu'il ne mesure pas : un vrai appareil.

**TROUVÉ EN CHEMIN : LE CHANGEMENT DE CHAPITRE, LUI, GÈLE.** La même sonde,
prolongée d'une flèche → une fois la page calme (`gel-chapitre`, 62 leçons,
×6) : le chapitre change 0,4 à 3,4 s après l'appui (médiane 1,3 s), en UNE
tâche de 0,4 à 2,8 s (médiane 1,2 s) — 36 leçons au-dessus d'une seconde,
10 au-dessus de deux, toutes de maths ou de PC (médianes : maths 2,0 s, PC
1,4 s, philo 0,7 s, SVT 0,45 s). C'est le geste le plus fréquent de la
lecture, et c'est le seul vrai gel de la leçon. Décomposé sur `pc/rlc-serie`
(2,7 s) : démasquer le chapitre et le mettre en page coûte 0,85 s (0,57 s la
seconde fois), l'animation d'entrée 0,15 s, le focus du titre force cette
même mise en page (0,86 s de `focus` au profil, ce n'est pas un coût en
plus) — et **~1,4 s de JavaScript** : React DOM 0,5 s, le pipeline markdown
0,46 s, KaTeX 0,41 s. Or rien ne devrait se PARSER à un changement de
chapitre. La cause : `useAttemptRecorder()` — le crochet que chaque QCM,
chaque point d'arrêt et chaque exercice appellent pour dater leurs
événements du chapitre courant — lit `useChapter()`, donc **tous les items
de toute la leçon, chapitres masqués compris, se re-rendent à chaque
flèche**, et ceux qui rendent leurs formules au rendu les re-parsent. Le
correctif (un contexte STABLE dont l'index se lit au moment de l'événement,
pas au rendu) et sa mesure sont dans la section suivante.

### 11.22 Le changement de chapitre : le seul gel de la leçon, et sa cause dans un crochet

**LE FAIT.** Le §11.21 l'a trouvé en prolongeant la sonde d'une flèche : une
fois la leçon calme, ArrowRight gelait le fil 0,4 à 2,8 s d'un coup (médiane
1,2 s), 36 leçons sur 62 au-dessus d'une seconde — sur le geste le plus
fréquent de la lecture.

**LA CAUSE, PROUVÉE AU PROFIL.** Profil d'échantillonnage CDP (500 µs) sur
`pc/rlc-serie` à ×6 pendant la flèche (2,8 s) : `focus` 0,86 s — la mise en
page du chapitre démasqué, forcée par le focus du titre, la même que mesurée
seule (0,84 s), pas un coût en plus ; `(program)` 1,56 s — style, mise en
page, peinture ; et **1,4 s de JavaScript** : le morceau React DOM 0,50 s,
le morceau remark/micromark 0,46 s, le morceau KaTeX 0,41 s. Du markdown et
du KaTeX s'exécutaient à un changement de chapitre, où rien ne devrait se
parser. `useAttemptRecorder()` — appelé par `McqItem`, `CheckpointItem` et
`AttemptFirstExercise` pour dater leurs événements du chapitre courant —
lisait `useChapter()` ; ce contexte change à chaque flèche ; tous les items
de la leçon, chapitres masqués compris, se re-rendaient, et `MathText`
re-parsait ses formules au rendu.

**LE CORRECTIF.** `ChapterShell` expose un second contexte, STABLE :
`{ total, goTo, getCurrent }` — `goTo` est un `useCallback` qui lit une ref,
`getCurrent()` lit la même ref ; l'objet ne change qu'avec `total`.
`useAttemptRecorder()` s'y abonne et lit `getCurrent()` au moment de
l'événement : le `chapterIndex` des payloads est le même qu'avant, lu plus
tard. Les consommateurs qui DOIVENT se re-rendre à la flèche — le rail, le
« Chapitre n / N », la carte « à retenir », `ChapterVisitRecorder` — gardent
`useChapter()`. tsc, lint et les 20 tests attempt-events : verts ; dom-truth : vert dans la CI sur ce commit exact (run 472, 4 min 05 s ; en local, 262 vérifications, un seul rouge : le garde-fou de fraîcheur du build, attendu — le correctif a été commité pendant son build).

**LA MESURE, AVANT → APRÈS.** Sur les 62 leçons, même machine, même serveur local, avant → après : le
chapitre change 1,3 s → 0,5 s après l'appui (médiane ; étendue 0,4–3,4 s →
0,2–2,0 s) ; la tâche la plus longue 1,19 s → 0,41 s (0,4–2,8 s → 0,1–1,4 s) ;
leçons avec une tâche ≥ 1 s : **36 → 2** (`maths/probabilites-conditionnelles`
1,45 s, `pc/systemes-oscillants` 1,12 s), ≥ 2 s : 10 → 0, ≥ 0,5 s : 54 → 22 ;
18 leçons sous 0,2 s. Par matière (tâche la plus longue, médiane) : maths
2,01 → 0,67 s, PC 1,40 → 0,50 s, philo 0,67 → 0,17 s, SVT 0,45 → 0,18 s. La
somme des tâches longues du geste : 1,40 → 0,56 s de médiane. Le tableau,
trié par gel avant décroissant :

| leçon | chap. | formules | chapitre changé après : avant → après | tâche la plus longue : avant → après |
|---|---:|---:|---|---|
| `maths/probabilites-conditionnelles` | 7 | 802 | 3.4 s → 2.0 s | 2.81 s → 1.45 s |
| `maths/geometrie-espace` | 12 | 1133 | 2.9 s → 0.8 s | 2.75 s → 0.67 s |
| `maths/limites-continuite` | 9 | 1051 | 2.7 s → 1.0 s | 2.41 s → 0.79 s |
| `pc/rlc-serie` | 11 | 641 | 2.6 s → 1.2 s | 2.38 s → 0.99 s |
| `maths/equations-differentielles` | 8 | 783 | 2.5 s → 0.9 s | 2.30 s → 0.78 s |
| `pc/reactions-acido-basiques` | 14 | 1027 | 2.4 s → 0.6 s | 2.29 s → 0.47 s |
| `maths/calcul-integral` | 11 | 814 | 2.4 s → 0.9 s | 2.23 s → 0.70 s |
| `pc/systemes-oscillants` | 10 | 715 | 2.3 s → 1.3 s | 2.10 s → 1.11 s |
| `maths/derivabilite-etude-fonctions` | 8 | 1118 | 2.2 s → 1.0 s | 2.03 s → 0.76 s |
| `maths/nombres-complexes-2` | 9 | 816 | 2.2 s → 1.0 s | 2.02 s → 0.80 s |
| `maths/suites-numeriques` | 13 | 946 | 2.1 s → 0.6 s | 1.99 s → 0.46 s |
| `maths/nombres-complexes-1` | 10 | 881 | 2.1 s → 0.8 s | 1.97 s → 0.67 s |
| `pc/rc-charge` | 7 | 677 | 2.2 s → 1.0 s | 1.91 s → 0.79 s |
| `maths/fonction-exponentielle` | 10 | 868 | 1.9 s → 0.6 s | 1.85 s → 0.48 s |
| `pc/chute-mouvements-plans` | 13 | 844 | 1.9 s → 0.8 s | 1.81 s → 0.66 s |
| `maths/arithmetique` | 10 | 872 | 1.7 s → 0.7 s | 1.57 s → 0.56 s |
| `pc/aspects-energetiques` | 10 | 823 | 1.6 s → 0.6 s | 1.56 s → 0.50 s |
| `pc/atome-mecanique-newton` | 6 | 232 | 1.7 s → 0.8 s | 1.55 s → 0.71 s |
| `pc/rotation-axe-fixe` | 9 | 601 | 1.7 s → 0.7 s | 1.54 s → 0.58 s |
| `pc/lois-de-newton` | 10 | 413 | 1.7 s → 0.6 s | 1.53 s → 0.48 s |
| `pc/controle-catalyse` | 7 | 203 | 1.7 s → 0.9 s | 1.51 s → 0.70 s |
| `pc/decroissance-radioactive` | 8 | 428 | 1.6 s → 0.7 s | 1.48 s → 0.55 s |
| `pc/evolution-spontanee` | 8 | 338 | 1.6 s → 0.6 s | 1.46 s → 0.52 s |
| `maths/structures-algebriques` | 11 | 1130 | 1.5 s → 0.5 s | 1.43 s → 0.45 s |
| `pc/esterification-hydrolyse` | 8 | 327 | 1.5 s → 0.6 s | 1.40 s → 0.48 s |
| `pc/ondes-em-modulation` | 8 | 337 | 1.5 s → 0.7 s | 1.38 s → 0.58 s |
| `pc/ondes-mecaniques-periodiques` | 9 | 525 | 1.5 s → 0.6 s | 1.38 s → 0.50 s |
| `pc/dipole-rl` | 7 | 452 | 1.4 s → 0.5 s | 1.36 s → 0.42 s |
| `maths/fonction-logarithme` | 9 | 736 | 1.4 s → 0.6 s | 1.34 s → 0.48 s |
| `pc/etat-equilibre` | 9 | 475 | 1.3 s → 0.5 s | 1.25 s → 0.38 s |
| `pc/piles` | 9 | 369 | 1.3 s → 0.4 s | 1.19 s → 0.35 s |
| `svt/genetique-populations` | 7 | 321 | 1.3 s → 0.8 s | 1.19 s → 0.68 s |
| `pc/noyaux-masse-energie` | 7 | 253 | 1.3 s → 0.6 s | 1.18 s → 0.53 s |
| `pc/transformations-lentes-rapides` | 7 | 155 | 1.2 s → 0.5 s | 1.10 s → 0.40 s |
| `maths/denombrement` | 10 | 330 | 1.1 s → 0.4 s | 1.07 s → 0.35 s |
| `pc/electrolyse` | 8 | 219 | 1.1 s → 0.3 s | 1.01 s → 0.27 s |
| `philo/analyse-de-texte` | 8 | 0 | 0.9 s → 0.3 s | 0.88 s → 0.22 s |
| `philo/la-violence` | 9 | 0 | 0.9 s → 0.3 s | 0.87 s → 0.19 s |
| `pc/transformations-deux-sens` | 6 | 140 | 0.9 s → 0.4 s | 0.86 s → 0.33 s |
| `pc/ondes-mecaniques-progressives` | 7 | 252 | 0.9 s → 0.3 s | 0.84 s → 0.28 s |
| `pc/propagation-onde-lumineuse` | 8 | 326 | 0.9 s → 0.2 s | 0.83 s → 0.15 s |
| `pc/suivi-temporel-vitesse` | 7 | 338 | 0.9 s → 0.3 s | 0.81 s → 0.23 s |
| `philo/theorie-experience` | 8 | 0 | 0.8 s → 0.2 s | 0.73 s → 0.20 s |
| `philo/l-etat` | 8 | 0 | 0.8 s → 0.3 s | 0.72 s → 0.21 s |
| `philo/la-verite` | 10 | 0 | 0.7 s → 0.2 s | 0.70 s → 0.15 s |
| `philo/le-droit-la-justice` | 8 | 0 | 0.7 s → 0.2 s | 0.68 s → 0.17 s |
| `philo/autrui` | 8 | 0 | 0.7 s → 0.2 s | 0.67 s → 0.18 s |
| `svt/transmission-caracteres` | 7 | 291 | 0.7 s → 0.3 s | 0.66 s → 0.22 s |
| `svt/liberation-energie-matiere-organique` | 9 | 115 | 0.7 s → 0.4 s | 0.64 s → 0.33 s |
| `philo/la-personne` | 8 | 0 | 0.7 s → 0.2 s | 0.62 s → 0.17 s |
| `philo/l-histoire` | 8 | 0 | 0.6 s → 0.2 s | 0.56 s → 0.16 s |
| `philo/le-bonheur` | 7 | 0 | 0.6 s → 0.2 s | 0.55 s → 0.17 s |
| `philo/le-devoir` | 5 | 0 | 0.6 s → 0.2 s | 0.55 s → 0.16 s |
| `svt/genetique-humaine` | 7 | 156 | 0.6 s → 0.3 s | 0.54 s → 0.26 s |
| `philo/la-liberte` | 5 | 0 | 0.5 s → 0.2 s | 0.50 s → 0.17 s |
| `svt/dysfonctionnements-immunitaires` | 8 | 0 | 0.5 s → 0.2 s | 0.48 s → 0.17 s |
| `svt/soi-non-soi` | 7 | 0 | 0.5 s → 0.2 s | 0.45 s → 0.12 s |
| `svt/theorie-tectonique-plaques` | 9 | 1 | 0.5 s → 0.2 s | 0.44 s → 0.18 s |
| `svt/moyens-de-defense` | 10 | 20 | 0.5 s → 0.2 s | 0.43 s → 0.17 s |
| `svt/granitisation-deformation` | 7 | 0 | 0.5 s → 0.3 s | 0.43 s → 0.19 s |
| `svt/role-enzymes` | 8 | 5 | 0.4 s → 0.2 s | 0.41 s → 0.14 s |
| `svt/chaines-de-montagnes` | 8 | 0 | 0.4 s → 0.2 s | 0.39 s → 0.17 s |

**CE QUI RESTE.** Ce qui reste est la mise en page du chapitre démasqué — quelques
milliers de nœuds de KaTeX qui passent de `display:none` à visibles — 0,3 à
0,8 s sur les leçons denses à ×6, 1,45 s sur `probabilites-conditionnelles`,
dont le chapitre 2 est le plus gros du corpus — 367 lignes, ~250 formules,
20 lignes de figures et de tableaux, démasqué d'un bloc — et 1,12 s sur
`systemes-oscillants`, dont chaque chapitre porte ~80 formules. C'est le coût intrinsèque du « tout dans le DOM, un
chapitre visible » ; le levier relève de l'arbitrage du §8.7 — moins de
chapitres servis d'un coup, ou un `content-visibility` qui conserverait
l'état de rendu des chapitres masqués (hypothèse, non mesurée) — pas d'un
défaut de code. Les 36 leçons qui gelaient plus d'une seconde par un défaut
de code ne sont plus que deux, par leur poids.

**UN LEVIER MESURÉ, PAS ENCORE PRIS.** `web/scripts/cv-chapitre.mjs` (cinq
leçons, ×6) : démasquer un chapitre caché par `hidden` (`display:none`) coûte
0,88 s (`rlc-serie`), 1,40 s (`probabilites-conditionnelles`), 0,37 s
(`suites-numeriques`), 0,79 s (`systemes-oscillants`), 0,12 s (témoin SVT) la
première fois — et presque autant à CHAQUE fois (0,58 / 1,27 / 0,36 / 0,60 /
0,04 s) : `display:none` jette la mise en page. Le même chapitre caché par
`content-visibility: hidden` : la première fois coûte 0,54 / 0,98 / 0,32 /
0,58 / 0,05 s (environ −35 %), et TOUTE visite suivante d'un chapitre déjà vu
**0,017 / 0,020 / 0,021 / 0,012 / 0,006 s** — le navigateur garde l'état de
rendu. Un élève qui revient au chapitre précédent attendrait 20 ms au lieu de
600 à 1 300. Ce n'est pas pris dans ce commit : `hidden` est ce que lisent
l'impression (`.chapter-view { display:block !important }`), le lecteur
d'écran (contenu retiré de l'arbre dans les deux cas — pas de régression, à
vérifier), `recherche-navigateur` et les balayages (ils reconnaissent un
chapitre replié à `hidden`/`display:none`), et `content-visibility` demande un
repli `@supports` pour les Safari d'avant 2024. Le changement est petit, ses
points de couplage sont cinq, et il ne se fait qu'avec dom-truth, la porte
impression, la porte zoom et `recherche-navigateur` rejoués — essayé la même nuit,
mesuré, retiré : §11.24.

**LA MESURE.** `BASE=http://127.0.0.1:3911 CPU=6 node scripts/gel-chapitre.mjs`
depuis `web/`, machine à froid ; avant et après sur le même serveur local,
build de HEAD, feuilles de style vérifiées à 200. Un bridage émulé, pas un
téléphone : les rapports comptent plus que les valeurs.

### 11.23 Le clic de réponse re-parsait l'énoncé — `MathText` mémoïsé

**LE FAIT.** Le profil du §11.22 montrait remark et KaTeX à l'œuvre sur un
simple changement de chapitre. Le crochet corrigé, il restait la question :
pourquoi un re-rendu d'item PARSE-t-il ? Parce que `MathText` — le composant
qui rend l'énoncé, les choix et la solution des QCM et des points d'arrêt —
n'était pas mémoïsé : à chaque rendu du parent, sa chaîne repassait par
remark + KaTeX. Or un QCM se re-rend à chaque clic de réponse (état local
`selectedId`/`answered`) : l'énoncé et les quatre choix étaient re-parsés au
moment même où l'élève attend son verdict. Même défaut que `MdBlock`
(§11.20), même remède : `memo`, deux props qui sont des chaînes.

**LA MESURE.** `web/scripts/clic-qcm.mjs` (nouveau) : leçon chargée et calme
à ×6, on avance jusqu'au premier QCM visible, on clique son premier choix ;
délai jusqu'au verdict et tâches longues du geste. Sur un échantillon de 11
leçons (10 denses de maths et de PC, un témoin SVT sans formules), avant →
après : le clic n'a jamais été un gel — sa tâche la plus longue allait de
0,15 à 0,36 s à ×6 — mais elle parsait. Après mémoïsation : 0,13 à 0,23 s
(médiane 0,18 → 0,16 s), le gain croissant avec les formules de l'item
(`limites-continuite`, 22 formules : 0,36 → 0,23 s ; les items à 5 formules :
−0,03 à −0,08 s ; le témoin SVT sans formule : rien). Le « délai jusqu'au
verdict » de la sonde (0,67 s de médiane) est identique avant et après : il
est fait de l'aller-retour de la sonde elle-même à ×6 (clic Playwright,
relevés toutes les 25 ms), pas de parsing — il n'y a dans le code aucun délai
volontaire entre le clic et le verdict, et aucune tâche longue ne le remplit.
Petit, réel, du même bois que `MdBlock` : le tableau.

| leçon | QCM au chap. | formules de l'item | verdict après : avant → après | tâche la plus longue : avant → après | somme des tâches longues : avant → après |
|---|---:|---:|---|---|---|
| `maths/limites-continuite` | 1 | 22 | 1.03 s → 0.87 s | 0.36 s → 0.23 s | 0.49 s → 0.29 s |
| `maths/suites-numeriques` | 1 | 8 | 0.91 s → 0.95 s | 0.26 s → 0.21 s | 0.32 s → 0.27 s |
| `maths/calcul-integral` | 1 | 5 | 0.70 s → 0.60 s | 0.26 s → 0.18 s | 0.26 s → 0.18 s |
| `maths/nombres-complexes-2` | 1 | 5 | 0.64 s → 0.67 s | 0.21 s → 0.17 s | 0.21 s → 0.27 s |
| `pc/reactions-acido-basiques` | 1 | 3 | 0.78 s → 0.74 s | 0.19 s → 0.15 s | 0.19 s → 0.15 s |
| `pc/aspects-energetiques` | 1 | 1 | 0.61 s → 0.53 s | 0.18 s → 0.14 s | 0.18 s → 0.14 s |
| `maths/geometrie-espace` | 1 | 5 | 0.85 s → 0.74 s | 0.18 s → 0.19 s | 0.18 s → 0.19 s |
| `pc/rlc-serie` | 1 | 1 | 0.65 s → 0.62 s | 0.17 s → 0.16 s | 0.17 s → 0.16 s |
| `pc/systemes-oscillants` | 1 | 0 | 0.64 s → 0.43 s | 0.16 s → 0.13 s | 0.16 s → 0.13 s |
| `svt/moyens-de-defense` | 3 | 0 | 0.28 s → 0.31 s | 0.15 s → 0.14 s | 0.15 s → 0.14 s |
| `pc/chute-mouvements-plans` | 1 | 0 | 0.67 s → 0.76 s | 0.15 s → 0.16 s | 0.15 s → 0.16 s |

**CE QUE ÇA NE MESURE PAS.** Le déployé. La mesure sur la preview Vercel n'a
pas pu être faite depuis ce conteneur : le relais réseau coupe la connexion
de Chromium headless (`ERR_CONNECTION_RESET`, trois essais, `ws_closed_mid_exchange` côté relais) alors que `curl` atteint la même page en 0,7 s. Les
§11.20 à 11.23 sont donc mesurés sur le build local de HEAD, pas sur le
déployé — à refaire depuis une machine libre (INSTRUMENTS, portée).

### 11.24 Le levier essayé, mesuré, retiré : `content-visibility` sur les chapitres repliés

**CE QUI A ÉTÉ ESSAYÉ.** Le §11.22 avait mesuré le levier sans le prendre.
Il a été pris à 00:01 (commit 8259ce3) de la façon qui touchait le moins de
choses : le marqueur d'un chapitre replié — l'attribut `hidden`, que
`NotionBody` émet, que `ChapterShell` bascule et que **dix-huit instruments**
lisent — ne changeait pas ; seule sa signification CSS changeait, pour
`.chapter-view` : `display:block` + `content-visibility:hidden`, repli
`@supports` vers `display:none`, `content-visibility:visible !important` à
l'impression. Vérifié avant de mesurer : chapitres repliés à 0 px, actif à
6 055 px, impression intacte. Puis mesuré — et retiré à 00:21 (fc2b393).

**POURQUOI RETIRÉ, EN DEUX FAITS.** Premier fait : l'ALLER — la première visite d'un chapitre — ne
gagne rien. Sur les 62 leçons, même build, la règle `display:none` rejouée
en témoin (`SANS_CV=1`) contre `content-visibility` : tâche la plus longue
0,41 → 0,44 s de médiane, pire 1,55 → 1,82 s (`geometrie-espace`), 24 → 25
leçons au-dessus de 0,5 s. Le « −35 % » de la sonde `cv-chapitre` mesurait
un démasquage brut ; dans le vrai geste — commit React, focus, animation,
mise en page — il disparaît. Seul le RETOUR (ArrowLeft vers le chapitre
déjà vu) gagne : tâche la plus longue 0,16 → 0,10 s de médiane, pire 0,55 →
0,20 s, 20 → 1 leçons au-dessus de 0,2 s — mais ce retour ramène au
chapitre 1, léger : sous `display:none` il coûtait déjà 0,16 s. Le gain réel
est un dixième de seconde en médiane, sur un geste qui n'était pas un gel.
Tableau, trié par retour décroissant :

| leçon | chap. | formules | aller, tâche max : display:none → content-visibility | retour (chapitre déjà vu), tâche max : display:none → content-visibility | retour, chapitre changé après : avant → après |
|---|---:|---:|---|---|---|
| `maths/limites-continuite` | 9 | 1051 | 0.74 s → 0.85 s | 0.55 s → 0.20 s | 0.66 s → 0.28 s |
| `maths/equations-differentielles` | 8 | 783 | 0.77 s → 0.84 s | 0.47 s → 0.16 s | 0.56 s → 0.26 s |
| `maths/nombres-complexes-1` | 10 | 881 | 0.65 s → 0.59 s | 0.46 s → 0.17 s | 0.55 s → 0.27 s |
| `maths/suites-numeriques` | 13 | 946 | 0.53 s → 0.53 s | 0.40 s → 0.18 s | 0.49 s → 0.25 s |
| `maths/calcul-integral` | 11 | 814 | 0.79 s → 0.73 s | 0.39 s → 0.16 s | 0.47 s → 0.23 s |
| `maths/fonction-exponentielle` | 10 | 868 | 0.35 s → 0.49 s | 0.39 s → 0.12 s | 0.48 s → 0.19 s |
| `maths/probabilites-conditionnelles` | 7 | 802 | 1.55 s → 1.63 s | 0.36 s → 0.11 s | 0.42 s → 0.17 s |
| `maths/nombres-complexes-2` | 9 | 816 | 0.86 s → 0.88 s | 0.35 s → 0.16 s | 0.43 s → 0.25 s |
| `maths/derivabilite-etude-fonctions` | 8 | 1118 | 0.78 s → 0.78 s | 0.35 s → 0.14 s | 0.42 s → 0.23 s |
| `maths/fonction-logarithme` | 9 | 736 | 0.48 s → 0.50 s | 0.33 s → 0.16 s | 0.39 s → 0.23 s |
| `pc/rc-charge` | 7 | 677 | 0.76 s → 0.82 s | 0.30 s → 0.10 s | 0.36 s → 0.16 s |
| `maths/geometrie-espace` | 12 | 1133 | 0.77 s → 1.82 s | 0.28 s → 0.15 s | 0.33 s → 0.18 s |
| `pc/rlc-serie` | 11 | 641 | 0.96 s → 0.47 s | 0.28 s → 0.16 s | 0.33 s → 0.23 s |
| `pc/reactions-acido-basiques` | 14 | 1027 | 0.47 s → 0.51 s | 0.28 s → 0.14 s | 0.34 s → 0.20 s |
| `maths/structures-algebriques` | 11 | 1130 | 0.49 s → 0.58 s | 0.27 s → 0.10 s | 0.33 s → 0.16 s |
| `maths/arithmetique` | 10 | 872 | 0.55 s → 0.56 s | 0.27 s → 0.15 s | 0.33 s → 0.23 s |
| `pc/esterification-hydrolyse` | 8 | 327 | 0.46 s → 0.48 s | 0.27 s → 0.12 s | 0.33 s → 0.18 s |
| `pc/systemes-oscillants` | 10 | 715 | 1.00 s → 1.00 s | 0.24 s → 0.17 s | 0.28 s → 0.23 s |
| `pc/evolution-spontanee` | 8 | 338 | 0.52 s → 0.54 s | 0.23 s → 0.10 s | 0.27 s → 0.15 s |
| `pc/chute-mouvements-plans` | 13 | 844 | 0.70 s → 0.61 s | 0.21 s → 0.13 s | 0.24 s → 0.16 s |
| `pc/ondes-em-modulation` | 8 | 337 | 0.57 s → 0.47 s | 0.20 s → 0.11 s | 0.23 s → 0.14 s |
| `pc/rotation-axe-fixe` | 9 | 601 | 0.60 s → 0.65 s | 0.20 s → 0.12 s | 0.24 s → 0.17 s |
| `pc/ondes-mecaniques-periodiques` | 9 | 525 | 0.52 s → 0.55 s | 0.19 s → 0.10 s | 0.23 s → 0.13 s |
| `pc/etat-equilibre` | 9 | 475 | 0.34 s → 0.40 s | 0.19 s → 0.11 s | 0.23 s → 0.15 s |
| `pc/atome-mecanique-newton` | 6 | 232 | 0.72 s → 0.73 s | 0.18 s → 0.09 s | 0.21 s → 0.11 s |
| `pc/aspects-energetiques` | 10 | 823 | 0.49 s → 0.45 s | 0.17 s → 0.14 s | 0.20 s → 0.18 s |
| `pc/decroissance-radioactive` | 8 | 428 | 0.55 s → 0.47 s | 0.17 s → 0.10 s | 0.21 s → 0.14 s |
| `pc/piles` | 9 | 369 | 0.32 s → 0.32 s | 0.17 s → 0.10 s | 0.23 s → 0.16 s |
| `pc/suivi-temporel-vitesse` | 7 | 338 | 0.26 s → 0.21 s | 0.17 s → 0.08 s | 0.21 s → 0.15 s |
| `maths/denombrement` | 10 | 330 | 0.38 s → 0.37 s | 0.17 s → 0.12 s | 0.21 s → 0.18 s |
| `philo/analyse-de-texte` | 8 | 0 | 0.23 s → 0.21 s | 0.16 s → 0.07 s | 0.23 s → 0.13 s |
| `pc/noyaux-masse-energie` | 7 | 253 | 0.51 s → 0.55 s | 0.16 s → 0.11 s | 0.20 s → 0.15 s |
| `pc/controle-catalyse` | 7 | 203 | 0.69 s → 0.89 s | 0.16 s → 0.10 s | 0.20 s → 0.15 s |
| `pc/transformations-deux-sens` | 6 | 140 | 0.32 s → 0.31 s | 0.16 s → 0.09 s | 0.20 s → 0.12 s |
| `philo/la-violence` | 9 | 0 | 0.22 s → 0.21 s | 0.15 s → 0.09 s | 0.20 s → 0.14 s |
| `pc/dipole-rl` | 7 | 452 | 0.45 s → 0.52 s | 0.15 s → 0.13 s | 0.18 s → 0.18 s |
| `pc/lois-de-newton` | 10 | 413 | 0.50 s → 0.50 s | 0.15 s → 0.11 s | 0.19 s → 0.14 s |
| `svt/genetique-populations` | 7 | 321 | 0.69 s → 0.66 s | 0.15 s → 0.09 s | 0.18 s → 0.11 s |
| `pc/electrolyse` | 8 | 219 | 0.26 s → 0.27 s | 0.14 s → 0.07 s | 0.18 s → 0.11 s |
| `pc/ondes-mecaniques-progressives` | 7 | 252 | 0.35 s → 0.12 s | 0.14 s → 0.07 s | 0.18 s → 0.11 s |
| `pc/transformations-lentes-rapides` | 7 | 155 | 0.45 s → 0.42 s | 0.13 s → 0.08 s | 0.17 s → 0.12 s |
| `philo/l-histoire` | 8 | 0 | 0.15 s → 0.21 s | 0.13 s → 0.07 s | 0.16 s → 0.11 s |
| `philo/le-droit-la-justice` | 8 | 0 | 0.18 s → 0.16 s | 0.12 s → 0.07 s | 0.16 s → 0.10 s |
| `philo/theorie-experience` | 8 | 0 | 0.20 s → 0.18 s | 0.12 s → 0.06 s | 0.16 s → 0.10 s |
| `philo/l-etat` | 8 | 0 | 0.18 s → 0.19 s | 0.12 s → 0.07 s | 0.16 s → 0.11 s |
| `svt/liberation-energie-matiere-organique` | 9 | 115 | 0.32 s → 0.34 s | 0.12 s → 0.09 s | 0.15 s → 0.11 s |
| `philo/la-personne` | 8 | 0 | 0.19 s → 0.20 s | 0.12 s → 0.07 s | 0.16 s → 0.11 s |
| `pc/propagation-onde-lumineuse` | 8 | 326 | 0.14 s → 0.13 s | 0.11 s → 0.07 s | 0.15 s → 0.11 s |
| `philo/autrui` | 8 | 0 | 0.17 s → 0.18 s | 0.11 s → 0.06 s | 0.15 s → 0.09 s |
| `philo/la-liberte` | 5 | 0 | 0.20 s → 0.19 s | 0.11 s → 0.11 s | 0.14 s → 0.15 s |
| `svt/transmission-caracteres` | 7 | 291 | 0.31 s → 0.27 s | 0.11 s → 0.07 s | 0.14 s → 0.12 s |
| `philo/le-devoir` | 5 | 0 | 0.16 s → 0.17 s | 0.11 s → 0.07 s | 0.14 s → 0.11 s |
| `philo/la-verite` | 10 | 0 | 0.20 s → 0.18 s | 0.11 s → 0.06 s | 0.14 s → 0.10 s |
| `philo/le-bonheur` | 7 | 0 | 0.18 s → 0.20 s | 0.10 s → 0.06 s | 0.14 s → 0.09 s |
| `svt/granitisation-deformation` | 7 | 0 | 0.19 s → 0.23 s | 0.09 s → 0.06 s | 0.13 s → 0.08 s |
| `svt/soi-non-soi` | 7 | 0 | 0.14 s → 0.17 s | 0.09 s → 0.07 s | 0.12 s → 0.10 s |
| `svt/genetique-humaine` | 7 | 156 | 0.22 s → 0.23 s | 0.09 s → 0.08 s | 0.12 s → 0.11 s |
| `svt/moyens-de-defense` | 10 | 20 | 0.19 s → 0.18 s | 0.09 s → 0.06 s | 0.12 s → 0.10 s |
| `svt/theorie-tectonique-plaques` | 9 | 1 | 0.17 s → 0.18 s | 0.08 s → 0.06 s | 0.11 s → 0.09 s |
| `svt/chaines-de-montagnes` | 8 | 0 | 0.17 s → 0.18 s | 0.08 s → 0.06 s | 0.12 s → 0.09 s |
| `svt/dysfonctionnements-immunitaires` | 8 | 0 | 0.19 s → 0.16 s | 0.08 s → 0.06 s | 0.11 s → 0.09 s |
| `svt/role-enzymes` | 8 | 5 | 0.15 s → 0.14 s | 0.08 s → 0.00 s | 0.10 s → 0.06 s |

**LE SECOND FAIT : LE SOL DES INSTRUMENTS A BOUGÉ.** Sous `display:none`,
un paragraphe d'un chapitre replié mesure 0 px et n'a aucun rectangle ; sous
`content-visibility:hidden`, le même paragraphe mesure **743 px et un
rectangle** — sans être rendu. Vérifié côte à côte sur le même build (les
trois libellés « Exercice … » du chapitre S'entraîner de `rlc-serie` : 743 /
1 sous CV, 0 / 0 sous `display:none`). dom-truth est passé rouge sur
« prose measure ≤ 75ch » (CI run 476, local dt13) en mesurant des
paragraphes que l'élève ne voit pas. C'était le couplage prédit au §11.22,
et il ne se limite pas à cette porte : toute mesure de géométrie qui ne
filtre pas `closest("[hidden]")` changerait de portée d'un coup — vers le
rouge, ou vers un vert non mesuré. Rejouées sous `content-visibility` sur le build local, pour le
dossier : dom-truth ROUGE (262 vérifications, 3 rouges — les deux « prose
measure » ci-dessus et le garde-fou de fraîcheur) ; porte impression verte
(5 pages) ; porte zoom 320 : verte (0 signalement sur 105 pages) ; `recherche-navigateur` :
inchangée (10 chapitres masqués sur 11, le mot du chapitre replié introuvable, celui du chapitre ouvert trouvé) ; `annonce-sweep` : verte (0 défaut : aucun focus perdu ni changement de chapitre non annoncé sur 62 pages).

**LA DÉCISION.** Un gain de revisite seul, contre un sol déplacé sous
dix-huit instruments : retiré la même nuit, HEAD revient à `display:none`.
Le levier reste ouvert au propriétaire, avec ce qu'il coûterait vraiment :
non pas 29 lignes de CSS, mais une définition PARTAGÉE de « chapitre
replié » (un module que les dix-huit instruments importent, qui saurait
lire `hidden`, `display:none` ET `content-visibility`) — et alors seulement
le CSS. Le gain à attendre est celui de la colonne « retour » ci-dessus,
rien de plus : la première visite d'un chapitre coûte sa mise en page, quoi
qu'on fasse.

**CE QUE L'ESSAI A RAPPORTÉ QUAND MÊME.** Les trois paragraphes de 743 px
sont réels une fois le chapitre ouvert — un défaut de mesure typographique
que la porte n'atteignait pas : §11.25.

### 11.25 Trois lignes de 93 caractères que la porte ne pouvait pas voir

**LE FAIT.** Le libellé de provenance d'une carte d'exercice (« Exercice IV
— II. Décharge d'un condensateur dans une bobine… », 12 px, `text-caption`)
fait souvent plus de cent caractères et courait sur toute la largeur de la
carte : **743 px, soit ~93 caractères par ligne**, contre les 75ch (597 px à
cette taille) que la porte prose-measure de dom-truth exige de tout texte
courant. Trois cartes sur `rlc-serie`, une sur `rc-charge`. Vérifié chapitre
ouvert (`?chapitre=11`) : les trois paragraphes mesurent bien 743 px quand
l'élève les voit.

**POURQUOI LA PORTE NE LE VOYAIT PAS.** Elle mesure la page au chargement,
où seul le chapitre 1 est rendu ; les autres sont `hidden` — 0 px, aucun
rectangle — et le chapitre « S'entraîner », qui porte toutes les cartes, est
le dernier. La porte avait la bonne règle et la mauvaise PORTÉE (ADR 0031 :
la portée d'un mécanisme se mesure à part). C'est l'essai `content-visibility`
du §11.24 qui l'a révélé, en rendant mesurable ce qui ne l'était pas.

**CE QUI A ÉTÉ FAIT.** `max-w-reading` (65ch) sur ce paragraphe dans
`BankCard`. Et la porte mesure désormais chaque page DEUX fois : au
chargement, puis avec son dernier chapitre ouvert par `?chapitre=N` — en
vérifiant qu'il l'est. Rouge sur le balisage d'avant (les trois 743 px,
mesurés par la même logique chapitre ouvert), vert dans la CI sur le balisage corrigé (run 478, dom-truth 4 min 30 s) — la porte mesure désormais 3 pages × 2 états au lieu de 3 × 1.

**DÉPLOYÉ, PAS SEULEMENT BÂTI.** Le HTML servi par la preview Vercel
(`curl`, 00:43) porte `max-w-reading` sur les 17 libellés de provenance de
`rlc-serie` : l'artefact déployé est bien celui-ci. (La géométrie, elle, ne se
mesure pas d'ici — INSTRUMENTS, point 9.)

### 11.26 Le pipeline markdown/KaTeX voyage avec chaque page — 143 ko sur 350

**LE FAIT.** `web/scripts/js-ventilation.mjs` (nouveau), build local de HEAD,
390 px : une leçon dense (`rlc-serie`) télécharge 18 scripts, **352 ko de
JavaScript** (transférés, donc gzip) sur 1 053 ko de page ; une leçon SVT
sans formule (`moyens-de-defense`) 350 ko sur 827 ; une épreuve 285 ko sur
654 ; l'accueil 315 ko sur 807. Dans chacune, **les morceaux du pipeline
markdown/KaTeX côté client font 143 ko (126 sur l'épreuve)** : KaTeX 75 ko,
remark/micromark 44 ko, deux petits morceaux (17 et 7 ko) — 40 à 44 % du
JavaScript de la page, sur une leçon qui n'a pas une formule comme sur une
leçon qui en a 640 : ce sont des morceaux de ROUTE, demandés par le parseur
dès le HTML (`parser/Low`). Sur l'accueil ils arrivent par le routeur
(`script/Low`) : le préchargement des 64 liens de leçons et d'épreuves de la
page — voulu (le préchargement suit l'intention, § données), pas un défaut de
l'accueil.

**POURQUOI ILS SONT LÀ.** Cinq composants clients rendent du markdown ou du
KaTeX dans le navigateur : `MathText` (énoncés, choix et solutions des QCM
et points d'arrêt), `MdBlock` (énoncés, raisonnements et intros des
exercices), `Derivation`, `RetenirZone`, `KeyFormulaRail` — et l'épreuve
entière (`EpreuveShell`). La leçon elle-même (`LessonRenderer`) est un
composant serveur : sa prose et ses formules arrivent en HTML. Le pipeline
client existe pour ce qui se rend APRÈS un geste — la tentative, la réponse,
le « Commencer » — ou dans un composant à état.

**CE QUE ÇA COÛTE, ET LE LEVIER.** En octets : 143 ko gzip par leçon,
~460 ko bruts à analyser et compiler — une part, non isolée, du silence
d'hydratation du §11.21. En temps : chaque formule rendue par ce pipeline
coûte ~16 ms à ×6 (§11.20) contre ~1 ms quand elle arrive du serveur en HTML
(§11.21) — seize fois. Le levier est le même partout : PRÉ-RENDRE au build,
côté serveur, les blocs que le client rend aujourd'hui — du HTML dans une
prop, pas dans le DOM, ce qui respecte à la lettre « rien du corrigé dans le
DOM avant la tentative » (la chaîne markdown, elle, voyage déjà dans la
page). Pour les leçons : −143 ko et un pipeline de moins à hydrater, contre
un surcoût de HTML modeste (énoncés de QCM, raisonnements). Pour les
épreuves : −126 ko de JavaScript et un « Terminer » complet en ~1 s au lieu
de 7,8 (20 à 30 s sur les rattrapages denses), contre un HTML de sujet qui
grossirait — 800 formules × ~40 nœuds, quelques centaines de ko gzip — un
arbitrage octets contre secondes, à mesurer avant de trancher. C'est un
changement de l'architecture des données d'épreuve et d'item : pas une nuit,
un chantier. Consigné pour le propriétaire, avec l'instrument qui le
re-mesurera.

**LA PART DU JAVASCRIPT, ISOLÉE.** `web/scripts/trace-chargement.mjs`
(nouveau) : trace CDP du fil principal pendant le chargement à ×6, jusqu'à
deux secondes de calme, durées propres par famille d'événements. `rlc-serie` :
7,9 s de fil principal — **JavaScript 4,2 s (54 %)**, style et mise en page
1,3 s (17 %), analyse du HTML 0,8 s (10 %), reste 1,5 s. `suites-numeriques` :
7,1 s — JavaScript 3,5 s (50 %), mise en page 0,9 s, HTML 0,9 s. Le témoin
sans formule `moyens-de-defense` : 2,4 s — JavaScript 1,5 s (63 %), mise en
page 0,2 s. Dans le JavaScript, l'analyse et la compilation des morceaux
(`v8.compile` + `EvaluateScript`) ne font que 0,3 à 0,5 s ; le reste — 2,3 à
2,7 s de `FunctionCall` et 0,7 à 1,1 s de microtâches sur les leçons denses —
est l'HYDRATATION de React, proportionnelle aux nœuds. Deux conséquences :
le levier « pré-rendre » du paragraphe précédent vaut, au chargement, les
0,3 à 0,5 s de compilation plus la part d'hydratation des cinq composants
clients (non isolée) ; et le gros du silence reste ce que le §8.7 nomme —
l'hydratation de quatorze chapitres dont un seul est lu. (La trace ralentit
ce qu'elle mesure : 10,6 s de mur ici contre 7,3 s sans trace au §11.21 ;
les proportions valent mieux que les valeurs.)

### 11.27 Sur 3G lente, le bouton « Commencer l'épreuve » ignorait le doigt pendant dix secondes

*(Mesuré et corrigé le 6 septembre ; la session a été interrompue avant le
commit, repris et re-mesuré le 11 sur le même build de HEAD.)*

**LE FAIT.** `web/scripts/epreuve-3g.mjs` (nouveau) : réseau bridé à 400 kb/s
et 400 ms de latence, processeur ×4, trois épreuves. Le bouton « Commencer
l'épreuve » est VISIBLE à 4,1 s (`sexp-2021-normale`), 4,5 s
(`sm-2025-normale`) et 7,5 s (`spc-2024-rattrapage`) — et **ne répond à rien
pendant dix à treize secondes** : le premier énoncé arrive à 16,9, 17,3 et
17,5 s, après 20, 20 et 15 appuis. 677 à 710 ko transférés. Le §8.7 avait
nommé cette forme de lenteur sur les leçons — « une page qui a l'air prête et
qui ignore le doigt » — ; la voici sur la page du bac lui-même, et sur le
premier geste.

**LA CAUSE.** Le bouton est rendu par le serveur ; son `onClick` attend
l'hydratation ; l'hydratation attend tout le JavaScript de la route — 285 ko
gzip, dont les 126 ko du pipeline markdown/KaTeX (§11.26) que la page
n'utilise qu'APRÈS l'appui, pour rendre les énoncés. À 400 kb/s, ces 126 ko
sont trois secondes de plus avant qu'un bouton déjà visible ne fasse quelque
chose.

**CE QUI A ÉTÉ FAIT.** Deux choses dans `EpreuveShell`, sans toucher aux
marqueurs que dix instruments attendent.
- Le bouton est **désactivé et le dit** tant que le composant n'est pas
  monté (`pret`, faux au rendu serveur et au premier rendu client, vrai
  après le montage), `aria-busy`, et — d'abord — « L'épreuve se charge… » sous
  le bouton ; depuis le §11.28, c'est la ligne globale « La page se prépare… »
  qui le dit, et la légende locale ne reste que pour l'attente du module après
  l'appui. Un bouton désactivé qui le dit n'est pas un bouton mort.
- Le pipeline markdown/KaTeX (`MdBlock`) n'est plus importé statiquement :
  il se charge APRÈS l'hydratation (le temps de lire les conditions), et
  `commencer` l'exige avant de lancer la révélation — « Le sujet se
  prépare… » si l'élève appuie avant, un message et le bouton qui revient si
  le réseau tombe entre la page et le module. Les marqueurs
  `data-sujet-complet` / `data-corrige-complet` restent vrais : la
  révélation ne commence qu'avec le module présent.

**LA MESURE, AVANT → APRÈS.** Même protocole, mêmes trois épreuves, même build : le bouton est visible à
3,9–4,5 s et **désactivé, avec « L'épreuve se charge… »**, jusqu'à
11,4–12,0 s (500 ko reçus), où il devient actif — l'hydratation arrive
5,5 s plus tôt, délestée des 126 ko du pipeline. Le premier énoncé, pour un
élève qui appuie à la première seconde possible, ne bouge pas : 16,8–17,5 s
(le pipeline, chargé après l'hydratation, arrive vers 16,5 s à 400 kb/s ;
« Le sujet se prépare… » entre-temps). Pour un élève qui lit les conditions
cinq secondes, il est immédiat. Ce qui a changé n'est pas la vitesse — les
octets sont les mêmes, 677 à 711 ko — mais l'honnêteté : sept secondes d'un
bouton qui dit qu'il charge, au lieu de treize secondes d'un bouton mort, et
un bouton vrai 5,5 s plus tôt. Vérifié sur le déployé (`curl` de la preview,
16:30) : le HTML servi porte `disabled` et `aria-busy` sur le bouton. Le
levier suivant est celui du §11.26 — pré-rendre les énoncés pour ne plus
expédier le pipeline —, pas un réglage de plus ici.

**CE QUE ÇA NE CHANGE PAS, ET CE QUE ÇA VÉRIFIE.** Le premier énoncé, une
fois le bouton actif et le module là, coûte ce qu'il coûtait (§11.20) : à ×6
sur trois sujets, premier énoncé 0,8 s (`sm-2025-normale`), 2,4 s (`spc-2024-rattrapage`, 409 formules), 0,8 s (`sexp-2021-normale`) après l'appui, sujet complet 3,4 / 7,0 / 2,8 s, premier corrigé 0,6–0,8 s — dans le bruit du §11.20. Le plus dense (`spc-2024-rattrapage`) avait donné 2,4 s en mesure unique ; re-mesuré trois fois de suite : 1,29 / 1,23 / 1,14 s au premier énoncé, 4,8 / 4,6 / 4,6 s au sujet complet, 18,1 / 16,7 / 16,2 s au corrigé complet — la première mesure était un démarrage à froid, l'import différé ne coûte rien à l'appui. La ventilation (`js-ventilation`) montre le mécanisme : les trois morceaux markdown/KaTeX de la page d'épreuve arrivent désormais par le script (`script/Low`, l'import différé) et non plus par le parseur (`parser/Low`, morceaux de route) — mêmes octets, autre moment. dom-truth sur ce build : 265 vérifications, un seul rouge, le garde-fou de fraîcheur du build (commité pendant la mesure) ; le bloc d'épreuve vert — « 10 exercices sans correction pendant l'épreuve ; 10/10 corrigés + auto-notation après », avec le « Terminer » à 100 ms qui avait piégé la première révélation progressive. La CI du commit précédent (run 484) tourne au moment d'écrire ; le run 483 — premier passage complet après la nuit des §11.20–11.26 — était vert en 39 min 24 s.

### 11.28 Sur 3G lente, une leçon aussi ignorait le doigt — jusqu'à vingt-quatre secondes

**LE FAIT.** Le pendant du §11.27 côté leçon, mesuré par
`web/scripts/lecon-3g.mjs` (nouveau ; 400 kb/s, 400 ms, processeur ×4) sur
trois leçons : le bouton « Chapitre suivant » est visible à 4,0 s
(`rlc-serie`), 8,0 s (`moyens-de-defense`) et 8,1 s (`la-verite`) — et **ne
fait rien pendant 24, 9 et 9 secondes** : il réagit à 28,4, 17,3 et 17,6 s,
après 29, 17 et 16 appuis. 651 à 734 ko transférés ; `DOMContentLoaded` à
13 à 21 s. Le geste le plus fréquent de la lecture, mort pendant un temps
que personne n'avait mesuré, sur une page qui a l'air prête (§8.7 : « c'est
cassé »).

**LA CAUSE.** La même qu'au §11.27, sans le pipeline à différer cette fois :
tout ce qui est cliquable dans une leçon — transport de chapitre, rail,
choix de QCM et de point d'arrêt, « J'ai fait ma tentative », ouverture d'une
carte d'exercice — est rendu par le serveur, et son `onClick` n'existe qu'à
l'hydratation, au bout de ~350 ko de JavaScript sur un réseau qui en livre
50 par seconde. La leçon elle-même se LIT dès le HTML (§11.26) ; ce sont ses
commandes qui mentent.

**CE QUI A ÉTÉ FAIT.** Un crochet, `useHydrated()` (`web/src/lib`,
`useSyncExternalStore` : faux au rendu serveur et pendant l'hydratation, vrai
dès que React a pris la main — sans écart d'hydratation), et une règle :
**une commande qui n'existe qu'après l'hydratation se rend `disabled` +
`aria-busy` jusque-là.** Posée dans les deux primitives partagées —
`TransportButton` (chapitres, figures, dérivations, lecteur d'explication) et
`ChoiceButton` (QCM, points d'arrêt ; curseur d'attente) — et dans les quatre
boutons qui ne passent pas par elles (révélation d'exercice, porte de
l'explication, ouverture de carte, les deux listes du rail). Et une ligne,
`HydrationNotice`, « La page se prépare… », rendue par le serveur en bas de
l'écran et retirée au premier rendu après l'hydratation — invisible 1,5 s
par CSS (sur un réseau normal personne ne la voit), `aria-hidden` (les
commandes portent déjà `aria-busy` ; une région live annoncée à chaque
chargement serait du bruit), masquée par `<noscript>` pour qui n'a pas de
JavaScript du tout. L'épreuve garde sa propre attente (§11.27).

**LA MESURE, AVANT → APRÈS.** Même protocole, mêmes trois leçons, même build : le bouton « Chapitre
suivant » est **désactivé, `aria-busy`, curseur d'attente** — et le HTML le
dit — jusqu'à ce que React prenne la main : 23,6 s (`rlc-serie`), 17,3 s
(`moyens-de-defense`), 17,9 s (`la-verite`) ; il répond alors au premier appui
(`moyens-de-defense` : actif à 17,3 s, chapitre changé à 17,6 s ;
`rlc-serie` : actif à 23,6 s, chapitre changé à 29,8 s — le changement de
chapitre d'une leçon dense coûte ~1,5 s à ×4, le reste est l'aller-retour de
la sonde sur 30 000 nœuds). Les octets sont les mêmes (651 à 735 ko) ; ce qui
a changé est l'honnêteté : plus un appui dans le vide, un bouton qui dit
qu'il attend, une ligne qui dit que la page se prépare — et rien de tout
cela sur un réseau normal, où l'hydratation arrive avant la seconde de délai.

**LE HTML SERVI, ET APRÈS L'HYDRATATION.** Le HTML de `rlc-serie` tel que le serveur le sert, avant tout JavaScript
(`curl`) : **256 boutons sur 263 portent `disabled`** (les sept autres sont
le chrome de la page — thème, menu — qui n'attend pas l'hydratation), et la
ligne « La page se prépare… » y est. Une fois React en place (Playwright,
réseau libre, réseau calme + 1,5 s) : **0 `aria-busy`, 11 `disabled` sur 264 boutons** — les onze légitimes (« Chapitre précédent » au chapitre 1, les transports de figure à leur première étape) — et la ligne « La page se prépare… » a disparu. Sur le déployé (preview Vercel de 865ef67, `curl`) : 256 boutons `disabled` + `aria-busy` sur 263, la ligne présente — l'artefact servi est bien celui-ci.

**LES SEPT DERNIERS.** Les sept boutons que le HTML servi rendait encore
actifs après ce correctif étaient le chrome — recherche (deux variantes),
navigation des notions, affichage, menu compact — et « Ouvrir le bac à sable
interactif » (`EmbedPanel`). Même règle, même crochet (commits 7d3f851 et
suivant) : sur le build local, **0 bouton sans `disabled` dans le HTML
servi** d'une leçon dense, d'une leçon de maths, de l'accueil, de la liste
des épreuves et d'une épreuve. La règle est donc complète pour tout ce que
le serveur rend cliquable ; ce qui apparaît après un geste (menus ouverts,
choix après réponse) n'a pas besoin d'elle.

**LES DÉLAIS, VÉRIFIÉS.** Sur 3G lente, la ligne « La page se prépare… »
est attachée avec le HTML (à ~8 s), d'opacité 0 à +0 et à +0,8 s, 1 à +2 s —
le délai de 1,5 s tient, mouvement réduit compris (le filet global réduit la
durée du fondu, pas le délai). Les commandes visibles en attente s'estompent
à 0,38 après la seconde de délai (`cursor: progress`) ; les variantes de
bureau masquées à 390 px (`display:none`) ne s'animent pas — elles ne sont
pas là. Après l'hydratation (17,2 s ici), plus une commande `aria-busy`,
plus de ligne. Sur le déployé (preview Vercel d'ec0ec08, `curl`, 16:58) : 263 boutons servis, 0 actif, la ligne présente — l'artefact déployé porte la règle complète.

**LA PORTE, ARMÉE.** dom-truth lit désormais le HTML SERVI (fetch, pas le
DOM hydraté) d'une leçon, de l'accueil, de la liste des épreuves et d'une
épreuve : tout `<button>` que le serveur rend doit porter `disabled`. Rouge
si un composant client oublie le crochet. Testée dans les deux sens : rouge
sur le HTML servi par le build 7d3f851 (deux « Ouvrir le bac à sable »
actifs sur `rlc-serie`), verte sur ec0ec08 — en local et sur la preview
Vercel (263 boutons, 0 actif, `curl`). Une porte qui peut aller au rouge
(ADR 0031).

**LA PORTÉE, MESURÉE — ET LA PHRASE DE TROP.** Le paragraphe « les sept
derniers » ci-dessus concluait « la règle est donc complète pour tout ce que
le serveur rend cliquable » — sur cinq pages témoins. C'était une
affirmation, pas une mesure (ADR 0031 : la portée d'un mécanisme se mesure
à part). Mesurée le soir même, en deux temps : `curl` des routes restantes
(`/commencer` : **4 boutons actifs**, les cartes de filière — `onClick` =
localStorage + routeur), puis le balayage de TOUT ce que `next build`
prérend (`.next/server/app/**/*.html`) : **118 pages, 12 790 boutons, 1
actif** — « Commencer » de `/atelier`, hors témoins lui aussi. Cinq
boutons actifs sur deux pages que les témoins ne voyaient pas. Même règle,
même crochet (`FiliereChooser`, `PlanChaine`) ; re-balayage : 118 pages,
12 790 boutons, **0 actif**. La porte a changé de forme en conséquence :
sept routes servies par `fetch` (les quatre d'avant + `/commencer`,
`/matieres/pc`, `/connexion`), PLUS le balayage de toutes les pages
prérendues, avec un plancher — rouge sous 100 pages, pour qu'un dossier
vide ne soit pas vert. Testée dans les deux sens sur la batterie entière :
273 vérifications, **1 rouge** sur le build d'avant le correctif (celle-ci,
`/atelier`), **0** sur le build d'après. Ce qu'elle ne voit toujours pas :
ce qui n'est pas prérendu (rien aujourd'hui — les 118 pages couvrent chaque
patron de route de `src/app`, `_not-found` compris), et ce qu'un geste fait
apparaître. Et pourquoi `<button>` suffit comme règle : les 118 pages ne
servent AUCUN `<input>`, `<select>` ni `<textarea>`, et aucun `role=` de
commande (seulement `list`, `group`, `img`, `status`) — le formulaire de
connexion n'existe qu'après l'hydratation. La surface cliquable que le
serveur rend, c'est des boutons et des liens ; les liens marchent sans
JavaScript.

**CE QUE ÇA VÉRIFIE.** dom-truth : 265 vérifications sur ce build, un seul rouge — le garde-fou de fraîcheur (commité pendant la mesure) ; les portes qui cliquent (cartes d'exercice, révélation, transports de figure, changement de chapitre) toutes vertes. Les instruments cliquent avec
Playwright, qui attend qu'un bouton soit actif : aucun n'a eu à changer. La CI
(run 490) est verte de bout en bout sur ce build, porte comprise : 39 min
02 s. La règle et ses raisons sont consignées dans l'ADR 0032.

### 11.29 La veille d'hydratation ne voyait un morceau perdu qu'au bout d'un compte à rebours — et parlait en même temps que la ligne « se prépare… »

**LE POINT DE DÉPART.** Le §11.28 a posé la ligne « La page se prépare… » à
1,5 s. Or depuis le 2026-09-04 (`docs/audits/reseau-malade.md`), un autre
message vivait au même endroit : le bandeau « La page n'a pas fini de se
charger… Recharger » de la veille d'hydratation, révélé par un script en
ligne de `PageShell` si le signal de vie manquait **12 s après la fin du
HTML** — un seuil choisi quand l'hydratation mesurée plafonnait à 7 s. Le
§11.28 la mesure à 17–28 s sur 3G lente. Deux questions : le bandeau
crie-t-il au loup sur un réseau simplement lent ? et un morceau PERDU
attend-il vraiment douze secondes pour être dit ?

**MESURÉ AVANT** (`veille-hydratation`, 390 × 780, processeur ×4). Sur 3G
lente (400 kb/s, 400 ms), trois pages : le bandeau n'apparaît **jamais** —
pas par conception, par chronologie : son compte partait de la fin du HTML
(10–13 s sur une leçon), l'hydratation arrivait à 18–22 s, l'échéance à
22–25 s. Marge : 3 à 7 s. À 250 kb/s / 600 ms, le HTML d'une leçon finit à
~17,5 s et l'hydratation à 34 s : l'échéance à ~29,5 s aurait montré le
bandeau 4–5 s avant que la page ne réponde — une fausse alerte, avec un
« Recharger » qui aurait relancé 34 s de chargement. Et sur un morceau
perdu (le plus gros morceau d'entrée bloqué, 75 ko, perdu à 2,2 s) : le
bandeau à 10,5 s, **+8,3 s après la perte** — parce qu'il vivait en pied
de page et n'existait pas tant que le HTML n'était pas arrivé.

**CE QUI A CHANGÉ** (`VeilleHydratation.tsx`, monté depuis le layout).
Trois temps, tous sans React :
- un écouteur `error` **en tête du document**, capté sur les `<script>` de
  `/_next/` — un morceau perdu avant l'hydratation pose la classe
  `hydratation-perdue` sur `<html>` et révèle le bandeau. Il distingue
  « perdu » (instantané) de « lent » (rien) ; après `__bacVivant`, il se
  tait — les composants gèrent leurs propres chargements différés (le
  pipeline markdown de l'épreuve a son propre message) ;
- le bandeau **en tête du `<body>`**, pour exister dès les premiers
  kilo-octets ;
- le compte à rebours devient un **filet à 30 s** de la fin du HTML, pour
  la connexion qui pend sans jamais échouer — compté depuis la fin du
  HTML, il s'ajuste seul à la lenteur du réseau ;
- **une seule voix** : la classe fait taire la ligne « se prépare… »
  (`globals.css`), `SignalVivant` retire la classe et referme le bandeau.
Le signal de vie est monté depuis le layout aussi : l'atelier n'avait ni
bandeau ni signal (118 pages le portent désormais, contre 117).

**MESURÉ APRÈS.** Morceau perdu : bandeau à **+0,3 s** de la perte (2,5 s
après la navigation) sur une leçon comme sur une épreuve, la ligne jamais
montrée, aucune seconde avec les deux. 3G lente : inchangé — bandeau jamais,
ligne de 4–13 s à l'hydratation (12–22 s). 250 kb/s : bandeau jamais, ligne
de 5–19 s à l'hydratation (19–34 s). `reseau-malade` (20 % de pertes) :
cinq scènes, mêmes verdicts qu'avant, le bandeau prévient dans les deux cas
de page morte. Sur l'épreuve, le plus gros morceau (le pipeline markdown,
75 ko) se charge APRÈS l'hydratation : l'écouteur l'a ignoré, comme prévu
— c'est `EpreuveShell` qui parle dans ce cas.

**LE TROU, MESURÉ PUIS FERMÉ.** L'écouteur est dans `<head>`, mais Next.js
place ses propres `<script async>` AVANT le contenu du layout : 2 ko les
séparent. La première rédaction de ce paragraphe disait « une erreur demande
un aller-retour réseau, l'analyseur a passé ces 2 ko bien avant ; un cas
plus défavorable n'existe pas ». Faux, et mesuré faux le soir même : bloqué
par CDP (`Network.setBlockedURLs`, l'échec INSTANTANÉ d'un filtre ou d'un
proxy — pas la latence de l'interception Playwright), l'événement `error`
tire à **0,48 s**, l'écouteur n'existe pas encore, et le bandeau attendait le
filet : **40,8 s** sur la leçon, 33,2 s sur l'épreuve. Fermé par un second
détecteur : Resource Timing garde, pour chaque `<script src>` qui a échoué,
une entrée à 0 octet décodé, 0 encodé, sans statut — un morceau en cache a
une taille décodée (18 morceaux en cache à la seconde visite : 0 faux
positif), un morceau en vol n'a pas d'entrée. `__bacPerduVerif`, posée en
tête, est appelée en tête du body (dès les premiers kilo-octets) et par le
filet. Mesuré après (l'instant du bandeau pris DANS la page, par
`MutationObserver` — l'échantillonnage par `evaluate` mentait de 5 s sur une
page de 318 ko analysée à ×4) : blocage CDP → bandeau à **2,1 · 3,5 ·
7,7 s** sur la leçon, 4,6 s (×3) sur l'épreuve, pour un échec à 0,5 s ;
interception Playwright (échec à 2,2 s) → +0,1 à +0,3 s ; 3G lente saine →
jamais ; deux visites en cache → 0 faux positif.

**POURQUOI PAS PLUS TÔT — ET POURQUOI C'EST LE PLUS TÔT POSSIBLE.** Le
repère `veille-posee` (`performance.mark`) le montre : l'écouteur est posé
à **exactement l'arrivée de la seconde feuille de style** (1,7/3,5 s →
posé à 3,5 s ; 7,0/7,6 → 7,7 ; 2,8/4,5 → 4,5), et le bandeau suit dans la
même milliseconde. Un script en ligne placé après une feuille de style
attend qu'elle soit chargée — et Next.js met ses deux feuilles avant tout
contenu du layout ; sur 3G lente, en concurrence avec ~350 ko de morceaux,
elles arrivent entre 2 et 8 s. Rien dans le document ne peut donc s'exécuter
avant (le `THEME_BOOT` en tête du body attendait déjà la même chose). Mais
rien ne peut non plus se PEINDRE avant : une feuille de style en attente
bloque le premier rendu. Le bandeau apparaît donc au premier instant où
quoi que ce soit peut apparaître. Un échec qui survient APRÈS les feuilles
est dit en 0,1–0,3 s.

**CE QUE COÛTE LE CONSEIL DU BANDEAU.** « Recharger » (`<a href="">`) est
une navigation ordinaire vers la même adresse — pas un rechargement forcé —
donc le cache HTTP joue : les morceaux sont `immutable`, le HTML est
revalidé (`ETag` → 304 en local ; sur Vercel `max-age=0, must-revalidate` +
`ETag`, même geste). Mesuré, 3G lente ×4, morceau perdu puis réseau revenu,
appui après la fin du premier chargement : la leçon répond en **4,2 s** pour
**75 ko** réseau (le seul morceau perdu ; HTML 0 ko, 24 réponses du cache),
l'épreuve en 2,4 s pour 53 ko — contre 22 s et 620 ko à froid. Appuyer
PENDANT que le HTML et les morceaux sont encore en vol les annule, et ils ne
sont pas en cache : 315 ko et 12,8 s mesurés. Le conseil est bon dans les
deux cas ; il est presque gratuit dans le premier. PIÈGE PAYÉ : la première
mesure disait 695 ko et 22,8 s, « 0 du cache » — parce que `page.route()`
de Playwright DÉSACTIVE le cache HTTP. Toute mesure de cache passe par un
blocage CDP, pas par l'interception (INSTRUMENTS).

Le texte du bandeau n'a pas changé (« ta connexion est probablement
faible ») : vrai dans les deux cas qu'il couvre. L'ADR 0032 est amendé :
l'attente honnête a un troisième temps — quand rien ne viendra, le dire tout
de suite.

### 11.30 Le bouton Retour : leçons et épreuves reviennent en 0,1 s, dans l'état laissé ; l'accueil est rebâti si on le quitte pendant son préchargement

**LA QUESTION.** Un élève quitte une leçon par une navigation complète —
adresse tapée, résultat de recherche, « Recharger » de la veille — puis
revient par Retour. La page revient-elle du cache arrière/avant (bfcache),
instantanée et au chapitre où il l'a laissée, ou est-elle rebâtie — sur 3G
lente, 17 à 28 s d'hydratation à refaire ? Jamais mesuré. PIÈGE ÉVITÉ :
Chromium lancé par Playwright DÉSACTIVE le bfcache
(`--disable-back-forward-cache`) ; sans retirer ce drapeau, tout est
« rebâti » et l'instrument ment.

**MESURÉ** (`retour-bfcache`, 390 × 780 ; page A → page B → Retour). Réseau
libre : leçon (`rlc-serie` → liste des épreuves → Retour) restaurée en
130 ms, chapitre 1 conservé ; épreuve restaurée en 143 ms ; accueil en
52 ms. 3G lente ×4 : leçons restaurées en 95–232 ms, chapitre conservé (deux
leçons, deux fois) ; épreuve en 103 ms ; **l'accueil rebâti, trois fois sur
trois** — raison Chromium `JavaScriptExecution`, ou
`NetworkExceedsBufferLimit` quand c'est le favicon qui est en vol. Un séjour
long ailleurs (35 s, 45 s) ne change rien : le filet à 30 s de la veille, en
attente, n'évince pas (les minuteurs sont gelés).

**POURQUOI L'ACCUEIL.** Une page quittée avec des requêtes EN VOL n'entre
pas dans le bfcache, ou en est évincée quand la réponse arrive. Sur 3G lente,
l'accueil a encore du trafic **6,3 s après l'hydratation** : le préchargement
de l'action principale (`NextUp`, `prefetch` volontaire — « le seul lien de
la page dont on sait qu'il sera suivi », `donnees-et-forfait.md`) tire la
charge RSC de la leçon et ses morceaux, dont les 75 ko du pipeline markdown.
Une leçon, elle, est calme 0,9 s après l'hydratation ; la liste des épreuves,
0,3 s. Parti une fois le réseau calme, l'accueil est restauré. C'est donc un
arbitrage déjà pris qui a une conséquence non écrite : sur un réseau lent,
revenir à l'accueil dans les six secondes qui suivent son chargement le
rebâtit — 0,5 s ici, le HTML revalidé et les morceaux en cache. Pas de
changement : le préchargement de l'action principale vaut plus que ces six
secondes. Noté pour que personne ne cherche un bug.

**CE QUE ÇA NE MESURE PAS.** Le Retour APRÈS une navigation interne (Lien →
Lien) passe par le routeur de Next, pas par le bfcache — c'est le cache du
routeur, mesuré ailleurs (`reseau-malade`, scène 5). Firefox et Safari ont
leurs propres règles d'éviction. Et le vrai téléphone, dont le navigateur
peut décharger l'onglet pour la mémoire.

### 11.31 La mémoire d'une page : 7 à 11 Mo de tas, aucune fuite en soixante changements de chapitre — et 97 % des nœuds dans des chapitres repliés

**LA QUESTION.** Un téléphone à 2 Go tue l'onglet qui grossit ; « deux
heures à un bureau » veut dire que soixante changements de chapitre ne
doivent rien laisser derrière eux. Une leçon rend jusqu'à 316 boutons et
plus de mille formules. Jamais mesuré.

**MESURÉ** (`memoire`, CDP `Performance.getMetrics` après ramasse-miettes,
390 × 780, réseau libre). Les 62 leçons : tas JavaScript **6,8 à 11 Mo**
(médiane 8,2), nœuds DOM **2 300 à 65 900** (médiane 16 200 ; les huit plus
lourdes : `geometrie-espace` 65 893, `reactions-acido-basiques` 63 217,
`suites-numeriques` 59 675, `chute-mouvements-plans` 51 696…), écouteurs
415–652. La fuite : `rlc-serie` 10,8 → 11,2 → **10,6 Mo** après 30 puis 60
changements de chapitre au clavier, nœuds 43 717 → 43 716, écouteurs 611 →
619 → 619 (huit posés une fois, pas de croissance) ; même profil sur
`suites-numeriques` et `la-verite`. **Aucune fuite.** Les épreuves, après
« Commencer » puis « Terminer » : 5 Mo → 8 → **11,4 Mo** (SM 2025 N, 55 539
nœuds), 5 → 8 → 13,5 Mo (SPC 2024 R, 76 854 nœuds).

**L'EMPREINTE RÉELLE** (VmRSS du processus de rendu, lu dans `/proc` — le
chiffre qui compte pour un téléphone) : **166 Mo** pour une leçon légère
(`soi-non-soi`, 1 337 éléments — c'est le socle de Chromium), **222–226 Mo**
pour les lourdes (30 000–47 000 éléments), **296–309 Mo** pour une épreuve
corrigée (40 000 éléments). Sur un téléphone à 2 Go, c'est lourd sans être
mortel ; ce qui pèse, ce n'est pas le JavaScript, c'est le DOM.

**D'OÙ VIENT LE DOM.** Sur `geometrie-espace` : 1 132 formules ; KaTeX fait
**90 % des éléments** — 59 % pour son HTML, **31 % pour le MathML masqué**
(gardé exprès : c'est lui que le lecteur d'écran lit et que le collage
riche emporte, §11.x, `copier-coller.md`). Et **97 % des éléments sont dans
des chapitres repliés** (`[hidden]`) : le levier « moins de chapitres
rendus » du §8.7, déjà posé au propriétaire pour la vitesse, diviserait
aussi la mémoire par dix. Le levier MathML (`output: "html"`) diviserait les
nœuds par 1,5 au prix de l'accessibilité et du collage — non recommandé,
noté pour que le chiffre existe.

**CE QUE ÇA NE MESURE PAS.** Un vrai téléphone (le rendu GPU, les tuiles, la
version d'Android) ; Firefox et Safari ; une séance de deux heures avec des
réponses, pas seulement des flèches (mais les écouteurs stables après 60
changements sont le signal qu'on cherchait).

### 11.32 Une adresse inconnue sous /examens, /notions ou /matieres servait une page VIDE que seul le JavaScript remplissait

**TROUVÉ PAR HASARD**, en demandant une épreuve SVT qui n'existe pas
(§11.31). `/nexistepas` sert la vraie page « introuvable » — 45 ko, en-tête,
titre, neuf liens. Mais `/examens/nexistepas`, `/notions/pc/nexistepas`,
`/matieres/nexistepas` servaient **23 ko de scripts et rien d'autre** : 0
bouton, 0 lien, 0 en-tête, 0 texte — HTTP 404, titre « Page introuvable »
dans le `<head>`, et un `<body>` vide. Le déployé (preview Vercel) faisait
pareil. C'est Next 14.2 : une route dynamique dont `dynamicParams` reste
vrai rend le `notFound()` d'un paramètre inconnu **côté client** ; le
navigateur télécharge, hydrate, puis dessine la page introuvable. Mesuré :
texte visible à 0,2 s en réseau libre, à **11,9 s sur 3G lente** — une page
blanche pendant douze secondes pour l'élève au lien périmé (une épreuve
renommée, un slug mal copié) ; sans JavaScript, blanche pour toujours.

**LE CORRECTIF**, une ligne par route : `export const dynamicParams = false`
sur les quatre routes dynamiques — toutes leurs valeurs valides sont
connues au build (`generateStaticParams` : 62 leçons, 39 épreuves, 5
matières, 6 variantes). Une adresse inconnue reçoit alors la page
introuvable PRÉRENDUE : 45 ko, en-tête, `<h1>Page introuvable</h1>`, neuf
liens, texte visible à **2,4 s sur 3G lente** au lieu de 11,9. Aucune page
valide ne change (les 118 pages prérendues sont les mêmes).

**LA PORTE.** dom-truth demande quatre adresses inconnues et exige un 404
qui contient l'en-tête, un `<h1>` « introuvable » et au moins trois liens —
dans le HTML SERVI. Rouge sur le build d'avant (0 `<h1>`, 0 `<header>`),
verte après. Un lien périmé n'est pas un cas rare : c'est ce que l'élève
tape depuis un cahier.

**ET LE RESTE ?** Même question posée aux 117 pages valides
(`serveur-vs-client`, texte visible sans JavaScript contre texte visible
après l'hydratation, `main` compris) : **ratio 1,00 sur les 117** — pas un
caractère qui n'existe qu'après le JavaScript, l'action principale de
l'accueil comprise. L'adresse inconnue était le seul trou. Un résultat
négatif qui valait d'être établi : « tout est rendu par le serveur » était
une croyance ; c'est maintenant une mesure.

### 11.33 Au clavier et au lecteur d'écran, « Commencer l'épreuve » et « Terminer » laissaient le focus sur `<body>` et n'annonçaient rien

**MESURÉ AVANT** (`focus-epreuve`, sonde ; puis `annonce-sweep` étendu).
Sur une épreuve, Entrée sur « Commencer l'épreuve » : le bouton disparaît
avec le seuil, **le focus retombe sur `<body>`**, défilement 0, et aucune
région live ne dit que le sujet est là (le chrono est bien `aria-live="off"`
— un chrono qui parle chaque seconde serait pire que tout). Entrée sur
« Terminer l'épreuve » : pareil — focus sur `<body>`, le corrigé apparaît
en silence. Un lecteur d'écran repart du haut de la page ; un clavier
retraverse l'en-tête. Le changement de chapitre d'une leçon avait l'idiome
depuis l'audit du 2026-08 (`ChapterShell` : le titre reçoit le focus,
« Chapitre n / N » est poli) ; l'épreuve ne l'avait pas, et `annonce-sweep`
ne mesurait que le chapitre.

**CE QUI A CHANGÉ** (`EpreuveShell`). Même idiome : dès que le premier lot
est rendu, le titre du premier exercice (« Exercice 1 », `[data-exam-exo]
h2`) reçoit le focus après « Commencer », le premier bloc de corrigé
(`[data-exam-corrige]`) après « Terminer » — `tabIndex = -1`, `focus()`,
le défilement suit (749 px vers le premier corrigé). Une région
`role="status"` visuellement masquée, **présente dès le seuil** (une région
insérée en même temps que son texte n'est pas lue), dit la phase : « Le
sujet est affiché — le chrono a démarré. » puis « Le corrigé est affiché —
note chaque question au barème. » Rien de visible ne change.

**MESURÉ APRÈS.** Focus sur `h2 « Exercice 1 »` après Commencer, sur le
premier corrigé après Terminer ; les deux phrases dans la région `status`.
`annonce-sweep` mesure désormais les deux gestes sur chaque épreuve (focus
perdu, aucune annonce) : **39 épreuves, 0 focus perdu, 0 sans annonce** aux deux gestes ; 0 et 0 au
changement de chapitre sur les 62 leçons, comme avant. PIÈGE DE L'INSTRUMENT,
payé au passage : `annonce-sweep` prenait pour « premier focusable » le
premier `a[href]` du DOM sans regarder s'il était visible — depuis que le
bandeau de la veille (§11.29) est en tête du body, son lien « Recharger »,
sous `[hidden]`, faisait **106 faux « pas de lien d'évitement en tête »**.
Un élément sans géométrie ne reçoit jamais le focus ; le filtre est le même
que pour l'ordre de tabulation désormais, et le lien d'évitement redevient
premier sur les 106 pages.

### 11.34 La palette ⌘K ne trouvait ni « maths » ni « svt » ni « 2025 », et Échap rendait le focus à `<body>`

**MESURÉ AVANT** (`recherche-palette`, requêtes tapées comme un élève les
tape). « physique » 26 résultats, « philo » 13 — mais **« maths » 0,
« svt » 0** : « Rien ne correspond — essaie un autre mot. » Les values des
entrées ne portaient que le nom LONG de la matière (« Mathématiques »,
« Sciences de la Vie et de la Terre ») ; « physique » marchait par hasard
(« Physique-Chimie »). **« 2025 » 0, « bac 2025 » 0, « rattrapage » 0** : la
palette ne connaissait que les notions — pour une épreuve, il fallait
passer par la liste. Et Échap : **le focus retombait sur `<body>`** (le
panneau Notions et le menu Affichage, eux, le rendaient au bouton). Accents
et casse étaient déjà pliés (« derivee » = « dérivée »).

**CE QUI A CHANGÉ** (`CommandPalette`, `PageShell`, `lib/palette-epreuves`).
Des alias par matière dans les values (« maths math mathematiques », « svt
biologie geologie bio », « physique chimie pc », « philo philosophie ») ; un
groupe **Épreuves** de 39 entrées (« Examen national 2025 — session
normale », la filière à droite), le manifeste calculé côté serveur par
chaque page — PageShell est aussi rendu par la page client `/connexion` et
ne peut pas lire le corpus lui-même (`fs`), le build l'a rappelé ; le focus
rendu à l'élément actif à l'ouverture, à la fermeture seulement (pas à la
navigation).

**MESURÉ APRÈS.** 108 entrées (69 + 39). « maths » **25**, « svt » **12**,
« physique » 48, « pc » 48, « bio » 12, « philo » 13 ; « 2025 » **3**,
« bac 2025 » 3, « rattrapage » 11, « sm 2025 » 1, « spc 2019 » 1,
« examen » 40 ; Échap → focus sur « Rechercher ⌘K ». L'instrument est
ROUGE si une matière ou une année ne trouve rien, ou si le focus ne revient
pas — il l'aurait été sur le build d'avant.

**CE QUI RESTE, ET À QUI.** « acide » → 0 (la leçon s'appelle « Réactions
acido-basiques »), « nucléaire » → 0 (« Noyaux, masse et énergie »,
« Décroissance radioactive ») : la recherche est une sous-chaîne stricte
(choix documenté : le score flou de cmdk classait n'importe quoi), et les
notions n'ont pas de mots-clés de recherche — leurs `tags` sont des tags
d'items (checkpoint, formative…). Un champ `motsCles` par notion est du
contenu, pas du code : lane contenu / propriétaire.

### 11.35 Les polices pesaient 324 ko par page, dont 84 ko de sous-ensemble latin-ext préchargé pour aucun caractère

**MESURÉ** (`polices`, Chromium, réseau libre). Chaque page téléchargeait
**six fichiers de police, 324 ko** — plus que le JavaScript de la liste des
épreuves (156 ko) ou de `/commencer` (157 ko) : la serif de lecture en deux
sous-ensembles (latin 50 ko + latin-ext 41 ko) et son italique (50 + 43),
Geist Sans 68 ko, Geist Mono 70 ko. Sur 3G lente, 6,5 s de téléchargement,
en concurrence avec les morceaux de JavaScript. Ce que chaque face sert
vraiment, en caractères de texte visible sur cinq pages (chapitres
dépliés) : Geist Sans 400 **85 114**, serif 400 **80 180**, serif italique
9 759, serif 600 6 481, Geist Sans 600/500 ~18 000… et **Geist Mono 400 :
80 caractères** — le chrono, quelques nombres, « esc » — pour 70 ko.

**LATIN-EXT, POUR RIEN.** `subsets: ["latin", "latin-ext"]` fait
PRÉCHARGER les deux sous-ensembles sur chaque page. Balayage des 117 pages
(`latin-ext.mjs`, texte visible, chapitres dépliés) : l'accueil, la liste
des épreuves, `/commencer` n'emploient **aucun** caractère de la plage
étendue ; sur 74 pages, un seul caractère « étendu » apparaît en serif —
**« œ », 102 fois** — et il est dans le sous-ensemble LATIN (U+0152–0153 y
figure explicitement). Reste « ˊ » U+02CA, neuf fois sur deux leçons SVT :
dans le MathML MASQUÉ de KaTeX (un accent, `<mo>ˊ</mo>`), que la serif ne
dessine jamais — la première rédaction y voyait une coquille de
transcription, le dépôt dit KaTeX. `subsets: ["latin"]` — un mot.

**MESURÉ APRÈS.** **Quatre fichiers, 239 ko** sur chaque page (−85 ko,
−26 %) ; sur une leçon SVT pleine de « œ » et sur une leçon de philo,
`CSS.getPlatformFontsForNode` dit que la prose, l'italique et les « œ » sont
dessinés par **Source Serif 4** pour tous leurs glyphes — aucun repli
système. Les faces latin-ext restent déclarées (next/font les émet toutes)
et se chargeraient à la demande si un caractère l'exigeait ; aucun ne
l'exige. dom-truth vert (contraste, typographie, polices de repli).

**LE LEVIER QUI RESTE, AU PROPRIÉTAIRE.** Geist Mono : 70 ko sur chaque
première visite pour 80 caractères (le chrono de l'épreuve, « n / N »,
« esc », des nombres en `mono-inline`). Une pile système
(`ui-monospace, Menlo, Consolas`) ou Geist Sans en `tabular-nums` rendraient
le même service pour 0 ko ; c'est une décision de typographie (ADR 0030 D2 :
« sa mono assortie porte tout nombre qui change »), pas de mesure. Le chiffre
est posé.

### 11.36 Windows « contraste élevé » : « Commencer l'épreuve » et tout bouton sans bordure devenaient du texte nu

**JAMAIS MESURÉ.** En `forced-colors: active` (le mode « contraste élevé » de
Windows, que Chromium et Edge émulent fidèlement), les couleurs de fond et
de texte sont remplacées par celles du système, et les ombres portées sont
supprimées. Sondé (`couleurs-forcees`, `emulateMedia({ forcedColors })`,
1280 px, captures regardées) : **l'anneau de focus tient** (c'est un
`outline`, seul le halo en `box-shadow` disparaît — normal), **les cartes
tiennent** (bordures forcées en CanvasText), les liens sont soulignés et
bleus. Mais **« Commencer l'épreuve »** — `btn-primary`, un fond accent sans
bordure — se rendait en **texte gras nu**, au même endroit qu'un libellé ;
« Notions », « Aa » et les onze entrées du rail des chapitres aussi : 3
commandes sur 5 sans aucun bord sur l'accueil et l'épreuve, 13 sur 40 sur une
leçon. Un utilisateur de ce mode ne voit pas de bouton à appuyer.

**LE CORRECTIF**, sept lignes de CSS dans `@media (forced-colors: active)` :
un `outline: 1px solid ButtonText; outline-offset: -1px` sur `:where(button,
.btn-primary)` — un contour SYSTÈME, tracé vers l'intérieur pour ne pas
toucher à la mise en page, dans `:where()` (spécificité nulle) pour que
l'anneau de focus de 2 px garde le dessus ; `GrayText` pour les boutons
désactivés. Aucun effet hors de ce mode.

**MESURÉ APRÈS.** 0 commande sans bord sur les trois pages ; « Commencer
l'épreuve » est une boîte ; le rail des chapitres, onze boîtes — c'est la
convention de Windows, pas une surcharge ; le chapitre courant garde son
repère (la barre d'accent forcée en couleur système). Le focus reste
`outline solid 2px`. dom-truth vert (il mesure en couleurs normales).

**CE QUE ÇA NE MESURE PAS.** Un vrai Windows (ses thèmes « Aquatique »,
« Désert », « Nuit » changent les couleurs, pas la logique) ; les figures
SVG, qui gardent leurs couleurs propres en `forced-colors` (le contraste
de leurs textes est mesuré aux pixels par ailleurs) ; `prefers-contrast:
more`, un autre signal, plus rare.

### 11.37 La CI n'a plus de runner depuis le 2026-09-11 à 18:53Z : chaque run échoue en quelques secondes, sans journal — les commits depuis faa8990 ne sont vérifiés qu'en local

**LE FAIT.** Le run 490 (208fb99, 16:59Z) est le dernier vert de bout en
bout : 39 min 02 s. Les runs 491–493 ont été annulés normalement par le
run suivant (concurrence sur la branche), après 18 à 27 minutes chacun,
avec un runner. Puis, **à partir du run 494 (faa8990, 18:53:08Z)**, chaque
run passe à `failure` **3 à 5 secondes** après sa création : le job n'a
**aucun runner** (`runner_id: 0`, `runner_name: ""`), **aucune étape**,
et ses journaux répondent 404. Un `rerun_failed_jobs` du run 502
(tentative 2, 20:14Z) : pareil, 4 s. Neuf runs de suite (494–502).

**RE-MESURÉ LE 2026-09-21 À 04:31Z — LA PANNE A DIX JOURS, PAS UNE SOIRÉE.**
Le chiffre « neuf runs » était vrai le soir où il a été écrit ; il a vieilli de
deux ordres de grandeur. Énumération des 200 derniers runs de `gates.yml` par
l'API (`actions_list`, pages 1 à 3, puis durée = `updated_at − run_started_at`) :

```
dernier vert      run 490 · 208fb993 · 2026-09-11T16:59:42Z · 2 342 s (39 min)
début de panne    run 494 · faa8990a · 2026-09-11T18:53:08Z ·    31 s
dernier mesuré    run 723 · 551755b  · 2026-09-21T04:31:23Z ·     4 s
                  → 230 runs consécutifs (494→723), 9 j 9 h, aucun vert
                  → 199 des 200 derniers durent moins de 30 s
```

Le seul run de la fenêtre à dépasser 30 s (**run 537**, 38 s) a été ouvert
individuellement : `runner_id: 0` lui aussi. Il n'y a donc **aucun rouge réel
caché sous la panne** — pas une seule porte n'a eu l'occasion de rougir depuis
le 2026-09-11.

**Le re-run de la période a été fait** : `rerun_failed_jobs` sur le run 723 le
2026-09-21 à 04:31Z → tentative 2, 4 s, `runner_id: 0`, sortie de check vide
(`title`, `summary`, `text` tous vides). Rien n'a changé.

**Pas de troisième commentaire sur la PR #2.** Deux y sont déjà (2026-08-28 et
2026-09-11T21:53Z), et le second décrit exactement cette panne — même run 494,
même cause compte, même re-run. Répéter un diagnostic écrit n'ajoute rien.

**PAS DE PORTE SUR L'HORODATAGE NU — et la condition qui en mériterait une.**
Quatre horodatages sans date viennent d'être corrigés à la main ; le réflexe
serait d'outiller le geste (ADR 0033). Mesure d'abord : sur les 239 `.md` de
`docs/`, **25 horodatages UTC en tout, dont 4 réellement orphelins** de date —
et un motif naïf `\d{1,2}:\d{2}Z` se trompe une fois sur deux, en mordant
l'intérieur des datetimes ISO (`…T16:59:42Z` → `59:42Z`). Quatre cas vrais pour
autant de faux : une porte ici enseignerait à ignorer le rouge (ADR 0036).
**Ce qui en mériterait une :** que la population dépasse ~20 orphelins réels, ou
qu'un horodatage nu reparaisse dans un document *destiné à l'élève* plutôt que
dans le journal de bord — là, le coût d'un faux positif redevient payable.

**CE QUE CE N'EST PAS.** Le fichier `gates.yml` n'a pas changé depuis
778c2ee (une note de budget) — et les runs 491–493, créés après, avaient
un runner. Les commits concernés sont des changements de code et de docs
ordinaires ; aucun ne touche au workflow. Un job qui n'obtient jamais de
runner et n'écrit aucun journal, c'est GitHub qui refuse de le démarrer —
la signature d'un **quota de minutes épuisé ou d'une limite de dépense
atteinte** sur le compte (dépôt privé : les minutes se comptent ; à ~40
minutes le run, plusieurs par jour depuis des semaines). Ce document ne
peut pas le vérifier : c'est dans *Settings → Billing → Actions* du compte,
que seul le propriétaire voit.

**CE QUI A ÉTÉ VÉRIFIÉ QUAND MÊME.** Chaque commit depuis faa8990 a passé
en local, sur son propre build : `dom-truth` (273 → 277 vérifications, 0
rouge à chaque fois), `tsc`, `next lint` sur les fichiers touchés, et
l'instrument propre à son sujet (veille-hydratation, reseau-malade,
retour-bfcache, memoire, annonce-sweep, recherche-palette, polices,
couleurs-forcees). Ce qui n'avait PAS tourné : le reste de la batterie CI
— tests unitaires, liens, validate-content, K-8, figures (clair et sombre),
presse-papier, impression, typographie, accents, zoom, formules, les
quatre cliquets, ancres, données, hygiène des identifiants. Elle a donc été
**rejouée en local sur HEAD**, étape par étape, à partir des commandes
mêmes de `gates.yml` (`scratchpad/rejeu-ci.sh`, 19 étapes) : **19 étapes sur 19 vertes**, en 33 minutes (20:17 → 20:50Z) sur
5a43b1b — tests unitaires, liens, validate-content, K-8, figures clair et
sombre, presse-papier (717 s), impression (409 s), typographie (177 s),
accents (174 s), zoom (199 s), formules (146 s), les quatre cliquets, ancres,
données, hygiène des identifiants. Deux différences avec la CI, à savoir :
le build de HEAD était déjà là (pas de `npm ci`, pas de `next build` dans
le rejeu) et `dom-truth` avait tourné à part sur le même build (277/0) ;
le Chromium est celui du conteneur (`/opt/pw-browsers/chromium`, la
version 1194 — `playwright-core` en attendait une 1228 absente, première
tentative rouge en une seconde pour ça, pas pour le produit). Le journal
par étape est dans `scratchpad/ci-local/`

**CE QU'IL FAUT EN RETENIR.** Une porte qui ne tourne pas n'est pas verte ;
elle n'est rien. La preuve de ces commits est le rejeu local ci-dessus, et
elle vaut moins qu'un run CI (une machine, un cache, un opérateur). Dès que
le compte a de nouveau des minutes, un `rerun` du dernier run suffit — la
branche n'a pas besoin d'un nouveau commit pour ça.

### 11.38 Sur téléphone, sept titres de leçon sur soixante-deux finissaient en « … » sur l'accueil, et vingt-quatre titres d'exercice sur vingt-quatre dans les épreuves

**COMMENT C'EST SORTI.** En appliquant les surcharges d'espacement de WCAG
1.4.12 (interligne 1,5, lettres 0,12 em, mots 0,16 em, paragraphes 2 em —
ce qu'un élève dyslexique impose par une extension) à sept pages, à 390 et
1 280 px (`espacement-texte`) : aucun débord, aucun texte hors cadre, et
des « coupés » dont la plupart sont par conception — les liens `sr-only`
(invisibles exprès), les infobulles du rail des chapitres (28 ch au
survol), les figures à transport (plus larges que l'écran, on les fait
glisser). Restaient des titres en `truncate`. Mesurés SANS surcharge, à
l'espacement normal : sur l'accueil, **7 titres de leçon sur 62 finissent
en « … » à 390 px**, 12 à 360 px, 19 à 320 px (« Nombres complexes — forme
algébriq… », « Ondes électromagnétiques — modulat… ») — et le titre est le
seul texte de la ligne, les minutes ayant été retirées de cette liste.
Dans les épreuves, le sous-titre d'exercice — le SUJET de l'exercice,
« Pile fer-zinc : polarité lue sur l'ampèremètre » — était tronqué **24
fois sur 24** à 390 px (quatre épreuves), 155 px visibles sur 654 pour
« Fonction exponentielle symétrique : déri… » ; son `title=` ne sert à rien
au doigt.

**CE QUI A CHANGÉ.** `ProgrammeMap` : `truncate` → `break-words`, le titre
se plie sur deux lignes. `EpreuveShell` : le sous-titre prend sa propre
ligne sous « Exercice n » en étroit (`basis-full`), reste dans la ligne en
large (`bp-medium:flex-1`), et ne se tronque plus nulle part ; `title=`
retiré. Les autres `truncate` restent — fil d'Ariane (28 ch, le `<h1>`
juste en dessous porte le titre entier), palette (une liste défilante),
infobulle du rail.

**MESURÉ APRÈS.** Accueil : **0 titre coupé** à 320, 360, 390, 430, 768 et
1 280 px ; à 390 px, sept titres tiennent sur deux lignes (42 px), les
cinquante-cinq autres n'ont pas bougé. Épreuves : **0 sous-titre coupé** à
320, 390 et 1 280 px sur quatre épreuves ; en étroit le sujet de l'exercice
se lit en entier sur deux à trois lignes sous « Exercice n ». dom-truth
277/0 sur ce build ; la batterie CI rejouée en local (§11.37) l'avait été
sur le commit précédent — la CI, elle, n'a toujours pas de runner.

### 11.39 Dans un corrigé d'épreuve, l'auto-évaluation coûtait 243 arrêts de tabulation ; les radios en faisaient 144 (elles sont maintenant 48)

**MESURÉ** (`radios-clavier`, `tab-corrige` — tabulation d'un bout à l'autre
d'un corrigé de SM 2025, 48 questions). L'auto-évaluation, « Ta copie :
Juste / Partiel / Faux », est un `role="radiogroup"` par question. Mais les
trois boutons étaient **tous les trois dans l'ordre de tabulation** (144
arrêts) et les flèches n'y faisaient rien — un clavier devait donc appuyer
sur Tab jusqu'à trois fois par question, sur des dizaines de questions. Le
motif ARIA `radiogroup` veut l'inverse : **un** arrêt par groupe (le radio
coché, sinon le premier), et les flèches déplacent le focus ET cochent.
Total mesuré : **243 arrêts** pour parcourir un corrigé (144 radios, 99
paragraphes — voir plus bas, 4 liens).

**CE QUI A CHANGÉ** (`EpreuveShell`). Roving tabindex : `tabIndex={0}` sur le
radio coché (ou le premier si rien n'est coché), `-1` sur les autres ;
`onKeyDown` sur Flèche haut/bas/gauche/droite déplace le focus dans le
groupe et coche. Après : **48 arrêts de radio** au lieu de 144, une flèche
avance d'un cran et coche, Espace coche l'élément focalisé. Rien de visible
ne change ; c'est le clavier qui passe de « Tab, Tab, Tab » à « Tab, flèche ».

**CE QUI RESTE, MESURÉ ET DIFFÉRÉ.** Les 99 autres arrêts étaient des
PARAGRAPHES de prose. Depuis Chrome 130, un conteneur qui peut défiler est
focalisable au clavier (pour qu'on puisse le défiler) ; or `.prose-lesson p`
porte `overflow-x: auto` (posé le 2026-09-05 pour qu'une formule en ligne
trop large ne pousse pas la page à 200 % de texte), et une formule KaTeX en
ligne déborde de ~2 px de sa boîte — donc chaque paragraphe contenant une
formule devient un conteneur défilant, donc un arrêt de tabulation (99 dans
un corrigé, ~9 par chapitre de leçon). La correction essayée — déplacer le
`overflow-x` du paragraphe vers la formule en ligne — a rendu focalisables
les formules ELLES-MÊMES (même cause, 2 px) et a bougé la mesure de prose de
`dom-truth` (`over-measure`). Elle est donc RETIRÉE : le levier propre est
`overflow-x: clip` sur le paragraphe (contient une formule trop large sans
créer de conteneur défilant), à valider contre la porte zoom qui garde le
débord à 200 % — un arbitrage à poser posément, pas à trancher à la hâte un
soir où la CI est déjà à terre (§11.37). Le gain sûr — les radios — est
livré ; le reste est mesuré et écrit.

### 11.40 En s'auto-évaluant, un élève au lecteur d'écran n'entendait ni le nombre de questions notées ni la note qui monte

**MESURÉ** (`score-annonce`). En correction, la barre collante montre
« Auto-évaluation — 3/48 questions notées · 8,5/20 (indicative) », et elle
se met à jour à chaque question notée. Mais elle n'était pas une région
live : un élève au lecteur d'écran, qui note question par question au clavier
(§11.39), ne l'entendait JAMAIS changer — il gradait à l'aveugle, sans savoir
où en était son total. Le chrono voisin, lui, est correctement `aria-live=
"off"` (un compteur qui parle chaque seconde serait invivable).

**CE QUI A CHANGÉ.** La barre en correction devient `aria-live="polite"`
`aria-atomic="true"` : après chaque note, le lecteur relit la phrase entière
(« Auto-évaluation — 4/48 questions notées · 8,75/20 indicative »), et
`polite` attend une pause, donc noter vite ne fait pas bégayer. Rien de
visible ne change ; le chrono reste muet. Mesuré après : la région relit à
chaque clic de radio.

**PIÈGE PAYÉ.** La source de `EpreuveShell` emploie l'espace fine insécable
U+202F autour du `?` de `{enCorrection ?}` (une passe de typographie
française a couru sur le code lui-même) ; un premier essai d'ancrage sur
`{enCorrection ?` avec une espace ASCII ne matchait pas, l'édition n'a pas
pris, et un `{/* commentaire JSX */}` glissé dans une branche de ternaire a
cassé le build (une branche de ternaire n'accepte qu'UNE expression). Refait
en n'ajoutant que les deux attributs, la note en commentaire ailleurs.

### 11.41 Toute commande a un nom accessible — mesuré, y compris dans les états révélés (résultat négatif)

**MESURÉ** (`noms-accessibles`, WCAG 4.1.2). Un bouton, un lien, un champ
dont l'arbre d'accessibilité ne donne aucun nom s'annonce « bouton » tout
court. Balayage de neuf pages types à 390 et 1 280 px — aria-label,
aria-labelledby, texte, title, alt d'image, `<title>` de SVG, `<label>`
associé — puis des états que seul un geste ouvre : une épreuve sujet révélé,
une épreuve corrigé révélé (les 144 radios, les transports de figure), un
atelier démarré, les menus de l'en-tête ouverts. **Zéro commande sans nom,
partout.** Un résultat NÉGATIF qui valait d'être établi : la loupe seule
(un bouton icône) et le « Aa » du réglage de texte étaient les candidats
évidents, et tous deux portent un `aria-label`. La porte est armée (rouge si
une commande visible perd son nom) mais hors CI tant que la CI n'a pas de
runner (§11.37).

### 11.42 Les cibles tactiles passent WCAG 2.5.8 (AA) — mesuré (résultat négatif)

**MESURÉ** (`cibles-tactiles`, 390 px). Au niveau AA (24×24 px), les seules
commandes sous la taille sont EXEMPTÉES : le lien d'évitement (`sr-only`,
1×1, masqué jusqu'au focus) et les liens « Revoir la notion — … » du bilan
d'épreuve (18 px de haut, mais un lien de texte seul dans son propre `<p>`
— l'exception « cible en ligne » de 2.5.8, et chacun est séparé du suivant
par tout un exercice). Les radios d'auto-évaluation, candidates évidentes,
sont `min-h-touch` (≥ 44). Au niveau AAA (44×44), 8 à 67 commandes par page
restent en dessous — le chrome dense, les liens de programme — un manque
ASSUMÉ sur un produit calme d'abord pensé pour un bureau ; 2.5.5 est AAA,
pas une cible du projet. Un résultat négatif de plus, posé.

### 11.43 Un asset de figure que rien ne place ne se rend à personne — et aucune porte ne le voyait : le sens INVERSE de la porte figures, et l'inventaire des huit orphelines

**MESURÉ, puis CORRIGÉ (porte).** Les deux revues de contenu de la vague 1
(rlc-serie, limites-continuite) ont trouvé, chacune de son côté, la MÊME classe
de défaut : une figure présente dans `media/`, qui passe la porte figures
(clair + sombre) avec son sidecar `.stages.json` — mais qu'AUCUN marqueur
`[[figure:…]]` ne place dans la leçon. Elle ne se rend à personne.
`energy-exchange` (rlc-serie) et `cubique-trois-racines` (limites-continuite)
étaient orphelines par une renumérotation de marche (R6→R7) qui a laissé le
marqueur derrière.

`validate-content` n'avait qu'une moitié de porte : marqueur→asset est un échec
DUR (`[[figure:x]]` sans `media/x.svg` → « MISSING, renders nothing »). Le sens
inverse — asset→marqueur — n'existait pas. C'est exactement le trou de
l'ADR 0031 : « une porte a deux directions quand une seule peut être
contournée » ; ici elle n'était même pas contournée, juste jamais regardée. Le
précédent existait pourtant : un point d'arrêt orphelin est AVERTI depuis
toujours (« checkpoint never referenced »).

**Le sens inverse, ajouté.** `validate-content` balaie désormais chaque `.svg`
de `media/` et avertit (⚠, pas échec) si aucun marqueur — de N'IMPORTE quel
type, dans N'IMPORTE quel fichier texte du dossier (un `[[figure:…]]` vit aussi
dans exercises.yaml, checkpoints.yaml, derivations.yaml, spec-*.md) — ne le
place ; le suffixe `.motion` est retiré pour rejoindre `[[motion:slug]]`.
Avertissement et non échec parce que la classe « asset mort » ci-dessous est
légitime ; le sens marqueur→asset manquant, lui, reste dur — la porte peut
toujours virer rouge. Mesuré sur les 62 dossiers : **0 échec, 8 orphelines.**

**L'inventaire des huit, en trois classes** (placer un marqueur ou supprimer
est du travail de contenu / propriétaire — non appliqué autonomement) :

- **Retirée par spec (asset mort, supprimable) :** `pc/aspects-energetiques ::
  plan-incline-travaux` — `spec-extension.md` le dit noir sur blanc (« Old
  plan-incline-travaux.svg is retired with old R5 »). Le fichier a survécu au
  retrait de son marqueur.
- **Remplacée par un frère référencé (probablement supprimable) :** `pc/rlc-serie
  :: loi-mailles-build` (le frère `loi-des-mailles-build.motion` EST placé,
  `[[motion:…]]`) ; `maths/nombres-complexes-2 :: rotation-complexe` (frère
  `rotation-homothetie`, à confirmer).
- **Autorée puis jamais placée (attend son marqueur) :** `pc/rlc-serie ::
  energy-exchange` et `maths/limites-continuite :: cubique-trois-racines` (les
  deux connues des revues, staged-incomplètes — cf. aussi l'avertissement
  « step-N sans sidecar ») ; `maths/geometrie-espace :: explication-bk-2019-n-x1` (⚠ DANGER, relevé par la revue vague 1 du 2026-09-12 : ses sept légendes déroulent la solution COMPLÈTE du sommet r-bac, et vont au-delà de ce que le sujet 2019 demande. Aucun marqueur ne le pose aujourd'hui — donc aucune fuite — mais le poser dans R10 imprimerait le corrigé au-dessus de la porte d'essai. À supprimer, ou à réserver explicitement à l'après-essai)
  ; `pc/dipole-rl :: oscillogramme-exercice` ; `pc/rc-charge ::
  exo-oscillogramme`.

Le cadre CI est déjà à terre (§11.37) : cet ajout est une porte de plus qui
parle à chaque `validate-content` local, sans jamais bloquer. La certification
pixel (corpus figures, clair + sombre) reste vraie — ces assets sont valides ;
ils ne sont simplement pas montrés.

### 11.44 Un item accroché à un rung que la leçon n'a pas tombe de l'affichage ordonné — la porte rung↔titre, et les trois notions concernées

**MESURÉ, puis CORRIGÉ (porte).** Les deux revues de contenu maths de la vague 1
(limites-continuite, nombres-complexes-2) ont chacune relevé des items étiquetés
`rung: "R7"` — avec une nuance : nombres-complexes-2 A un titre `## R7`,
limites-continuite non. Le champ `rung` d'un item est censé nommer un titre de
rung réel de `lesson.md` ; un item qui pointe un rung absent tombe de tout
affichage ordonné par rung (le résidu typique d'une renumérotation de marche,
comme les figures orphelines du §11.43).

`validate-content` gardait le MOT « rung » hors de la prose visible (porte
jargon), mais ne vérifiait jamais que la VALEUR `rung` corresponde à un titre
existant. Balayage des 62 dossiers : **3 notions concernées** —

- `maths/derivabilite-etude-fonctions` : items R6 (titres R0–R5) — **caractérisé
  en direct le 2026-09-11** (la passe critiques a échoué sur la limite de session).
  Le sommet « ### Exercice de type bac » (`lesson.md:507`) existe mais N'EST PAS
  numéroté ; DERIVFCT-19/20 testent du contenu R4 (signe de $f'$, variation),
  DERIVFCT-23/29 du contenu R5 (Rolle sur $f'$, point d'inflexion). Même forme que
  limites-continuite : le re-tag demande la décision « que signifie rung » (relabel
  du sommet en R6 vs re-tag des items vers R4/R5) — owner/pedagogy. Setup math des
  items R6 recalculé, correct ($3(x-1)(x-3)=3x^2-12x+9$, etc.). **Sommet r-bac
  (extrait 2019) recalculé en direct : $f'=4(e^{-x}-1)(1-x)$, $f'(0)=f'(1)=0$,
  $f''=4[1+(x-2)e^{-x}]$, $f'''=4e^{-x}(3-x)>0$ sur $[0,1]$ — Rolle sur $f'$ et TAF
  sur $f''$ tous CORRECTS.** Mais Rolle et TAF sont utilisés au sommet sans être
  construits dans la rampe (l'intro l'admet) — lacune de rampe + savoir-faire SM
  (`derivabilite_rolle_taf`) à confirmer lors d'une passe critiques ultérieure.
  R5 (étude complète de $(x^2-x+1)/(x-1)$ : simplification en $x+1/(x-1)$,
  asymptote oblique $y=x$, $f'=x(x-2)/(x-1)^2$, extrema $f(0)=-1$/$f(2)=3$,
  $f''=2/(x-1)^3$) et la section *fonction réciproque* recalculées aussi —
  correctes. NB : la fonction réciproque, savoir-faire signalé ABSENT de
  limites-continuite (revue C3), est enseignée ICI — piste de scoping pour
  l'owner ;
- `maths/limites-continuite` : items R7 (titres R0–R6) — déjà consigné dans sa
  revue (le re-tag demande un choix pédagogique : fidelity propose R3/R5/R4,
  pedagogy R1/R5/R4 — consensus sur R5 et R4, désaccord sur le troisième) ;
- `maths/probabilites-conditionnelles` : items R6 ET R7 (titres R0–R5) —
  **nouveau**.

**Porte ajoutée** (avertissement, non échec) : chaque `rung: R<n>` d'items.yaml
et de checkpoints.yaml doit nommer un titre `## R<n>` de lesson.md.
Avertissement parce que le BON rung de rattachement est un choix pédagogique
(re-tag) que la porte ne peut pas faire — **à passer en échec dur une fois les
trois notions re-taguées**. Mesuré : 0 échec, 6 avertissements sur 3 notions.
Comme le §11.43, elle tourne en CI (validate-content --strict, 62 notions) sans
jamais bloquer, et le sens « valeur qui ne résout pas » complète, pour les
rungs, ce que la porte marqueur→cible fait déjà pour les figures (ADR 0031).

### 11.45 La campagne de correction de contenu vague 1 — quarante-sept notions triées (MATHS 14/14 ; PC 25/25 ; SVT 8/11 ; PHILO 0/12), 656 correctifs objectifs, les bloquants consignés

**EN COURS (une notion à la fois, cadence critiques).** Après les portes
d'intégrité (§11.43 figures orphelines, §11.44 rung↔titre), la vague-1
(bac-fidelity-critic + pedagogy-critic) est passée notion par notion. Règle de
tri constante : **appliquer seul** les correctifs objectifs — fait recalculable,
vérité de citation, renvoi, hygiène de source ; **différer** aux auteurs
(content-author / pedagogy-architect / owner) tout ce qui réécrit du contenu
enseigné, invente une misconception, ou demande une décision de conception. Une
revue horodatée par notion (`REVIEW-2026-09-1x.md`) consigne l'appliqué ET le déféré.

**Ce que la vague 1 pourra et ne pourra PAS établir sur le reste du corpus.**
Mesuré avant d'attaquer les 42 notions restantes : `exercises.yaml` et
`bank.yaml` existent sur **14/14** notions de maths et **25/25** de PC (banque
24/25), mais sur **0/11** en SVT, et **0/12** pour la banque en philo — c'est le
manque déjà établi en §10.6, et il n'a pas bougé. Conséquence pratique, à
retenir en lançant les paires : **les deux contrôles qui ont produit le plus de
correctifs objectifs jusqu'ici — le recalcul des barèmes contre le relevé, et la
vérification des affirmations de fréquence d'examen — ne peuvent tout simplement
pas tourner en SVT**, faute de relevé (`docs/sujets/svt/` n'existe pas). Pour
ces onze notions, la critique fidélité se réduit au cadre, à la cohérence
interne et à la biologie elle-même ; son silence sur les barèmes n'est pas un
quitus.

**Et un piège de sonde, consigné parce qu'il m'a eu.** J'ai tenté de trier les
notions restantes par « nombre d'affirmations de fréquence d'examen » dans la
leçon. Le compte est inutilisable : en SVT et en PC, « presque toujours »
qualifie presque toujours un **fait scientifique** (« la combinaison de CMH est
presque toujours unique », « ce virus est presque toujours intracellulaire »,
« on observe presque toujours 1/4 »), pas une fréquence d'examen. Le signal
exploitable pour prioriser, c'est le **nombre de SCOPE NOTES** et la taille de
la banque.

**CE QUE LA CAMPAGNE A APPRIS, EN UNE PAGE.** Le tableau ci-dessous est une
référence notion par notion ; il est devenu trop long pour servir d'entrée. Voici
la forme des résultats après vingt notions.

*Le fond mathématique et physique est sain, et c'est le résultat le plus
important.* Sur les vingt notions, les critiques ont recalculé indépendamment
les clés d'items, les barèmes et les blocs de couverture — et n'ont trouvé
**qu'une seule erreur d'arithmétique** dans tout ce qui a été audité
(`arithmetique`, « 2⁴¹ a 34 chiffres » → 13). Les `coverage_summary` recomptés
depuis les tags bruts tombent justes partout où ils ont été vérifiés. Les
barèmes sont tous portés par un relevé vérifié ; **un seul avait été inventé**
(`suites-numeriques`, 4 pts contre 3,75 réels). Les citations « chapitre N » —
plusieurs centaines — sont justes à une poignée près. **Les défauts ne sont pas
dans les calculs.**

*Ils sont dans ce que le texte AFFIRME.* Six classes reviennent, par ordre de
rendement :

1. **La note d'auteur qui a vieilli.** Une `SCOPE NOTE` affirme un trou
   (« grep vérifié : zéro occurrence de X »), la leçon comble le trou, la note
   reste — et continue de piloter les corrections. Trouvée dans au moins sept
   notions. Deux fois, la fausseté avait **fui dans un texte rendu à l'élève**,
   qui s'est vu dire qu'il sortait du programme sur un contenu qu'il venait
   d'apprendre.
2. **L'affirmation sur ce que demande l'examen, démentie par le relevé de la
   notion elle-même.** « Revient presque chaque année », « le cas le plus
   courant », « presque toujours par la quantité conjuguée » — vérifiables en
   une minute contre `docs/sujets/`, et fausses une fois sur deux. Les vraies
   sont à défendre aussi fort : plusieurs ont été **confirmées** et doivent
   rester (`geometrie-espace` 1/5 vrai, `denombrement` 4/5, `structures-algebriques`
   8/10 sur le sous-groupe).
3. **La réponse au-dessus de la porte d'essai.** Trois formes distinctes : le
   libellé `part` (§11.56, close), l'`intro` qui calcule ce que le premier pas
   gardé calcule (§11.62, gardée), et le checkpoint d'avant-sommet qui reprend
   les nombres du sommet (`geometrie-espace`).
4. **L'hypothèse manquante dans un encadré.** La plus coûteuse à lire, la plus
   facile à corriger — et celle où il faut le plus se méfier : dans
   `denombrement`, ajouter l'hypothèse évidente ($p \le n$) aurait **invalidé
   une étape d'examen** de la banque.
5. **Le renvoi mort.** Un chapitre, un titre de leçon, un exercice qui n'existe
   pas ; ou un renvoi vers une note d'auteur que l'élève ne peut pas lire
   (§11.61, 38 occurrences retirées, porte armée).
6. **Le contenu enseigné que rien ne teste.** Deux sous-sections de
   `geometrie-espace`, deux chapitres de `structures-algebriques`, le chapitre
   homographique de `suites-numeriques` — souvent parce que le titre n'a pas de
   code de barreau (§11.60, 876 lignes mesurées).

*Et ce qui remonte au-dessus de l'auteur.* Deux familles de déféré reviennent :
**le cadre a tort** (une `limite` ou une `exclusion` marquée `derived` que les
sujets vérifiés falsifient — au moins cinq notions, dont `geometrie-espace` sur
le produit vectoriel et `equations-differentielles` sur le second ordre) ; et
**un `savoir_faire` n'est enseigné nulle part** (`structures-algebriques` :
l'homomorphisme, dans 8 énoncés vérifiés sur 10).

Vingt notions à ce stade — les 14 de maths sont toutes passées :

| Notion | Objectifs appliqués | Déféré (marquant) |
|--------|:---:|--------|
| `maths/limites-continuite` | 8 | items R7 (re-tag pédagogique) ; savoir-faire fonction réciproque absent |
| `maths/nombres-complexes-2` | 0 (maths propres) | items R7 (a un titre R7, ≠ limites-continuite) |
| `maths/probabilites-conditionnelles` | 7 | — |
| `maths/derivabilite-etude-fonctions` | 0 (vet direct §11.44) | Rolle/TAF au sommet hors rampe ; items R6 |
| `maths/fonction-logarithme` | 7 | **fuite de filière** (annales SM à TAF servies à SExp — porte frontend) ; log base a non couvert ; mis-tag `lecture-variations-signe` (floor_met faux) |
| `pc/rc-charge` | 6 | contradiction de cadre (spec absente) |
| `pc/dipole-rl` | 8 | **collision de notation R vs R+r** (les deux critiques : fabrique `oubli-resistance-interne`) → refactor de convention ; couverture savoir-faire (u_L(t), sens inverse) ; mis-tag distracteurs |
| `pc/decroissance-radioactive` | 10 | dérive `skill_code` (5 items hors modèle apprenant) ; 3 glosses numériques fausses ; distracteur cassé DECRO-3/B ; **exclusion « filiations » trop large** (3 sujets vérifiés la falsifient) → research-lead ; notation A vs a |
| `pc/reactions-acido-basiques` | 10 | champ `chapter:` des 8 misconceptions faux (81 distracteurs mal attribués au modèle apprenant) ; 10⁷ appelé « un million » (×4) ; pKA(NH₄⁺) 9,6→9,2 ; 6 citations dérivées ; **« acide fort » biconditionnelle fausse** (R4 vs R6) → content-author |
| `svt/genetique-populations` | 3 | contradiction de cadre BLOQUANTE (S1/S2) → content-author |
| `svt/genetique-humaine` | 11 | **F1/F2 BLOQUANTS** (Test B universel faux ; solution GH-8) ; P2 mis-tag crochet → modèle apprenant |
| `maths/arithmetique` | 7 | maths **PRISTINE** (2 critiques + recalcul : la seule erreur = 2⁴¹ « 34 chiffres »→13) ; **SEV1 cadre** → research-lead : exclusion « résidus quadratiques » falsifiée par 2 sujets vérifiés (2023 N, 2025 N critère d'Euler), Fermat absent du programme mais dans `bac-reference.md:110` + 9/10 annales, poids bloc 15 % démenti ; **PPCM et ℤ/nℤ jamais enseignés** mais testés → content-author ; habileté 75/25/0 (0 niveau-3, 100 % QCM) ; 9/16 lignes de grille non rupturées ; porte pré-sommet qui spoile le sommet ; dispute couverture Fermat (réellement 1, pas 3) |
| `maths/calcul-integral` | 7 | maths **PRISTINE** (2 critiques : « aucun constat de calcul ») ; faux universel L363 (« ch.2 suppose f≥0 ») qui **contredit CI-11** ; faux universel CI-23 (μ=f(milieu) « propre aux affines uniquement ») + « à l'exception de » inversé ; renvois morts « chapitre Dérivation » (×5), « Fonction racine carrée », « chapitre suivant » (×5)→ch2 ; 2 légendes. **SEV1 cadre** → research-lead/owner : changement de variable enseigné contre la `limite` (et `bank:487` vs sujet `:1189` se contredisent), **Riemann+TAF dans une notion déclarée SExp** (exclusion SM), aucune filière en champ machine, arctan/longueur d'arc hors-cadre ; **volume de révolution TOTALEMENT absent** (savoir-faire des 2 filières) → content-author ; jargon banque (« hors socle », « SCOPE NOTE », \text dans KaTeX) **déféré avec la portée** ; habileté PC sur checkpoints maths ; sommet = 2/9 savoir-faire, partition d'un exercice |
| `maths/suites-numeriques` | 12 | maths **PRISTINE** (2 critiques + recalcul indépendant : réservoir, les 2 récurrences, ε–N, gendarmes, tout le chapitre homographique, les 2 sommets, et le `coverage_summary` recompté deux fois depuis les 114 tags — aucun écart) ; **hypothèse manquante qui fausse la recette** (« $f(I)\subset I$ donc bornée » : il faut $I$ **borné** — $u_{n+1}=u_n^2+1$ sur $[1;+\infty[$ la met en défaut) ; faux universel « le mécanisme ne dépend pas de $a,b,c,d$ » démenti par le **3ᵉ exemple de la leçon** ($\Delta=-3$) ; résultat encadré sans $u_n\neq\beta$ ; « théorème qu'on va démontrer » que le ch.8 refuse ensuite ; **2 réponses imprimées au-dessus de la porte d'essai** (les libellés de partie se rendent hors du gate) ; **barème 4 pts inventé** (le relevé vérifié n'en porte aucun ; les 9 questions somment à 3,75). **SEV1 cadre** → research-lead : notion revendiquée par les DEUX cadres alors que `maths-sexp.yaml:78` exclut les adjacentes — ch.11 + 3 items hors-programme SExp **sans barrière** ; **le chapitre homographique n'a aucun code de barreau** (0 item, 0 checkpoint, 0 figure, invisible au coverage) → content-author ; 400 lignes sans aucun commit ; aucun `habilete` ; 21 % d'application directe contre 40 % |
| `maths/fonction-exponentielle` | 11 | maths **PRISTINE** (les 31 items, les 2 sommets de bout en bout, les 6 barèmes et les sujets 2019/2020/2025 re-dérivés : aucune faute d'arithmétique ; `coverage_summary` recompté par les DEUX critiques depuis les tags bruts, juste ; 87 citations « chapitre N » sur 88 correctes) ; **33 notes de pas dont le TeX arrivait NU chez l'élève** (`e^{x/2}` rendu accolades comprises — vérifié en rendant la chaîne dans le vrai pipeline) ; **deux fautes dans une même phrase de banque** (« chapitre 2 » pour un résultat que le chapitre 2 DIFFÈRE explicitement, et « croissance stricte » qui ne donne pas la limite) ; liste des outils empruntés fausse **dans les deux sens** (l'IPP ne sert dans aucun des deux exercices ; la bijection et $(f^{-1})'$, qu'ils exigent, sont absentes) ; description de figure qui **durcit** une lecture que le relevé donne hésitante ($g(0{,}5)=1{,}92$, pas $\approx 4$) ; note décrivant $(e^{x/2})^2-1$ pour $(e^{x/2}-1)^2$ ; règle des puissances encadrée sans quantificateur ; « UNE primitive … $+C$ » ; trois commentaires périmés dont un qui affirme le CONTRAIRE de l'état publié. **SEV1 cadre** → research-lead : **aucune filière déclarée** et les fichiers se contredisent (lesson dit SM, checkpoints dit SExp) ; savoir-faire « étudier $a^x$ et $x^\alpha$ » enseigné NULLE PART ; sommet SExp 8,5 pts contre une banque SM 10 pts. Pédagogie : 4 lignes de grille non réclamées, R1/R6/R7 sans commit, **l'intro de r-variation répond à 3 de ses 9 questions**, q5b imprime sa réponse (asset $(C_g)$ manquant), falaise R7→R8, zéro ancrage réel en 471 lignes, niveau 3 à 6 % contre 20 % |
| `maths/nombres-complexes-1` | 12 | `coverage_summary` recompté INDÉPENDAMMENT par les deux critiques : exact, zéro gonflage ; toute l'arithmétique (33 items, 5 checkpoints, 2 sommets, 7 cartes de banque), les 7 barèmes et la géométrie des figures au pixel — **zéro erreur numérique, aucun barème inventé** ; les deux critiques ont recompté les 9 titres `##` et confirment que la quasi-totalité des « chapitre N » sont JUSTES. Corrigé : **quatre affirmations sur ce que demande l'examen, toutes falsifiées par le relevé de la notion** (« les sujets posent des coefficients complexes » 0/7 ; « revient dans presque tous les sujets » 0/7 ; « le cas le plus courant » 0/7 ; « se trompe une fois sur deux » alors que les racines sont conjuguées 4/4) ; encadré « $z$ imaginaire pur $\iff z=-\bar z$ » **faux sous la définition de la leçon elle-même** ($z=0$) ; titre de leçon inexistant ; **4 citations « chapitre 8 » visant un contenu que le chapitre 8 ne porte pas** ; renvoi interne mort dans un SVG ; « Discriminant complexe » pour un discriminant réel négatif ; **une réponse imprimée au-dessus de la porte d'essai dans les DEUX exercices** (l'intro donnait $a = 1-i\sqrt3$, l'une des racines que q1 demande — le sujet vérifié pose l'équation en q1 et les affixes en q2) ; 2 commentaires périmés. **SEV1 cadre** → research-lead : **brèche d'exclusion** — les chapitres 6–7 (34 % du corps) enseignent le second degré à coefficients COMPLEXES, que `maths-sexp.yaml:305` exclut nommément, dans une notion entièrement SExp ; et le cadre attribue module **ET argument** à ce slug alors que la leçon ne définit jamais l'argument tout en le faisant tester. Pédagogie : 205 lignes sans un seul commit ni item, rampe qui redescend puis saute au sommet, 13 lignes de grille sur 20 non réclamées, la figure d'accroche donne la réponse du checkpoint d'accroche |
| `maths/structures-algebriques` | 22 | **zéro erreur arithmétique** dans toute la notion (les deux critiques ont recalculé séparément : les tables de ℤ/4ℤ, la table du rectangle re-dérivée depuis les coordonnées — c'est bien le groupe de Klein —, les 26 items, les 5 checkpoints, les deux sommets de bout en bout) ; `coverage_summary` recompté depuis les tags bruts : **exact, ligne par ligne** ; tous les barèmes portés par le relevé ; les ≈150 citations « chapitre N » justes, vérifiées deux fois contre la carte des 10 titres / 8 barreaux. Corrigé : **la définition encadrée du corps était mal formée** (elle exige « un symétrique pour × » sans jamais donner de neutre à × — or « symétrique » est défini *par rapport à un neutre*, et l'anneau n'en donne pas ; la phrase suivante employait déjà `1` sans l'introduire), propagée à **quatre autres endroits dont une légende de figure** — l'hypothèse manquante (« unitaire ») était enseignée au chapitre PRÉCÉDENT ; **l'énoncé central de R7 était circulaire** (« imagine deux groupes $(E,\star)$ et $(F,\times)$ … on n'a pas à re-vérifier les axiomes sur $F$ » : si $F$ est déjà un groupe il n'y a rien à déduire) ; **trois fréquences d'examen démenties par le relevé de la notion** (« l'isomorphisme revient presque chaque année » → 1 sujet sur 10, c'est `homomorphisme` qui est dans 8 ; « presque toujours par la quantité conjuguée » → 1/10, et le sujet que la notion enseigne s'en passe ; « souvent le couple tout fait » → 2/10) ; double faux universel sur l'intégrité (« un ensemble de matrices n'a aucune raison d'être intègre » — 2022 q4-b fait prouver le contraire ; « les réels ou complexes le sont toujours » — seulement **munis des lois usuelles**) ; « loi de groupe » sur toutes les fonctions ℝ→ℝ (faux : les non-bijectives n'ont pas de symétrique) ; **citation morte dans un `stem` rendu** (« exercice « à toi de jouer » » — inexistant) ; **deux tableaux de couverture contradictoires dans le même fichier** ; **cinq notes de cadrage périmées** qui affirmaient encore des trous comblés depuis (« grep vérifié : zéro occurrence de « intègre » » → 15 aujourd'hui). **SEV1 cadre → content-author : un `savoir_faire` n'est JAMAIS enseigné** — « Étudier un homomorphisme (noyau, image) » : zéro occurrence de `homomorphisme`, `noyau`, `surjectif`, `injectif` dans la leçon, contre 8 énoncés sur 10 au relevé (§11.59) ; et **les trois gestes les plus examinés n'ont aucun item** (sous-groupe 8/10, morphisme 9/10, intégrité — les chapitres 5, 8 et 10 sont non testés, et les 3 items « R7 » sont des redites de R2/R3). Pédagogie : « corps » défini commutatif alors que l'examen demande « corps commutatif » comme cible distincte (4 sujets) ; décomptes gonflés par des distracteurs mal étiquetés (9→5, 6→3) ; niveau 3 = 0 ; **les objets travaillés (ℤ/nℤ, symétries du rectangle) apparaissent zéro fois dans les 10 sujets vérifiés**, dont les objets sont des ensembles infinis décrits par une forme — sur lesquels une table est impossible, comme la banque le concède elle-même |
| `maths/equations-differentielles` | 8 | **zéro défaut arithmétique** (les deux critiques ont recalculé : données de refroidissement, pentes de l'accroche, croisement à 12,7 min, $\Delta=-4\omega^2$, la résolution complète de $y''-3y'+2y=0$ avec ses deux contrôles, tous les paliers $-b/a$) ; **`coverage_summary` recompté tag par tag sur les 90 distracteurs des 30 items : les 22 lignes tombent juste** — une critique le qualifie du bloc de couverture le plus propre qu'elle ait audité ; barème exact (2,5 pts partagés avec `calcul-integral`, dont 1,0 ici) ; **les 49 citations « chapitre N » justes**, vérifiées une à une par les deux ; et un RÉSULTAT NÉGATIF PROPRE — **zéro affirmation de fréquence d'examen**, ce qui est la bonne décision puisque le relevé ne porte qu'UN exercice vérifié. Corrigé : **un `reasoning` RENDU à l'élève** (les deux critiques le classent premier) qui lui disait que le chapitre 5 n'enseigne pas ce qu'il vient d'y lire, puis l'envoyait « voir la SCOPE NOTE en tête de fichier » — un commentaire YAML invisible pour lui ; contradiction interne (`$y''=ky$ qu'on ne traite pas dans ce chapitre` — traité 90 lignes plus bas, Cas 1) ; $\beta=\sqrt{-\Delta}/(2a)$ négatif quand $a<0$ ; un commentaire de distracteur où l'auteur pense à voix haute au milieu de la phrase ; **trois notes de cadrage périmées** antérieures à la passe R4-bis du 2026-08-27, dont une qui recommande comme « suivi » une passe déjà faite. NON RETENU des critiques : les deux jugent « fausses » les phrases « une autre équation » — elles ne le sont pas, elles comparent la variation au sujet 2022, pas à l'exemple du chapitre ; le défaut est la duplication, pas l'affirmation. **SEV1 cadre → research-lead : c'est le CADRE qui a tort**, et les deux critiques convergent — `maths-sexp.yaml:158/307` interdisent l'équation générale du 2nd ordre en SExp, mais les deux lignes sont `derived`, l'une s'auto-signale « à confirmer », l'autre est sous un bloc « À VALIDER », et **le seul sujet vérifié de la notion est un sujet SExp qui demande exactement la chose exclue** ; `maths-sm.yaml:154` la met au programme en `research-consensus`. Ferme l'arbitrage B1. → content-author : **le cas $\Delta=0$, SEUL cas attesté dans un sujet vérifié et valant 0,5 des 1,0 point de la notion, a trois lignes, aucun exemple travaillé et aucun item** — l'élève le rencontre pour la première fois dans l'exercice d'examen ; la variation « fraîche » duplique l'exemple travaillé du chapitre (et re-drille $\Delta>0$ au lieu de $\Delta=0$) ; 17 des 22 lignes du registre de misconceptions non rompues, R4 et R5 sans commit, sidecar « à retenir » absent (deux chapitres retombent sur le mauvais repli) |
| `maths/denombrement` | 10 | fond propre, dit séparément par les deux critiques : les 27 clés d'items ET leurs 108 distracteurs, les 5 checkpoints, les 2 sommets, les 4 exercices de banque et la trentaine de calculs de la leçon **reproduisent tous** ; les **4 barèmes** tombent exactement sur le relevé ; le `coverage_summary` recompté depuis les tags bruts **par les deux** est exact ; les **16 citations de chapitre** sont justes. Et **aucune fuite d'auteur** dans un champ rendu — vérifié le jour même où cette classe était balayée ailleurs (§11.61). Corrigé : **promesse non tenue sur la notation** (« on utilisera les deux » — `C_n^p` apparaît UNE fois dans toute la notion, dans cette phrase même, contre ~40 `\binom{n}{p}`, et les figures emploient une TROISIÈME forme) ; **renvoi mort** vers un « autre chapitre » pour le binôme de Newton, que le produit n'a pas et que `maths-sexp.yaml:278` exclut nommément ; **l'arithmétique d'un commentaire de distracteur est fausse** — pour justifier 720 il écrit un produit qui vaut 5040, c'est-à-dire la BONNE réponse ; **une légende de figure définit Ω comme l'urne puis le compte comme l'ensemble des tirages**, enseignant exactement la misconception que le banc corrige ; un `reasoning` rendu affirme que l'indépendance n'est définie nulle part alors que le chapitre 9 de la même leçon l'énonce ; renvoi en avant faux deux fois (mauvais système d'étiquettes ET mauvaise position) ; **réponse au-dessus de la porte d'essai dans les DEUX exercices** (l'`intro` imprimait `card(Ω)` = le `steps[0]` gardé de q1) plus l'analogie que la variation existe pour faire trouver. **PIÈGE À NE PAS CORRIGER NAÏVEMENT** : les deux formules encadrées n'ont pas l'hypothèse $p \le n$ que porte la propriété qui en dérive — mais la banque utilise $\binom{1}{2}=0$ comme étape porteuse, donc ajouter la condition rendrait l'examen illégal ; il faut POSER la convention, c'est-à-dire enseigner → content-author. **SEV1 cadre → owner** : la banque enseigne indépendance et loi binomiale, attribuées au chapitre séparé — mais les deux critiques convergent, ce n'est PAS une brèche d'exclusion, c'est la partition que l'examen ne respecte pas (2 sujets vérifiés sur 4 la débordent dans le même exercice numéroté) : GARDER le contenu ; et la filière est un angle mort (CENSUS : SM 0, SExp 8, alors que les deux cadres revendiquent la notion). À NE PAS AFFAIBLIR : « un exercice de probabilités commence presque toujours par du dénombrement » est **confirmé 4/5** ; le principe additif, absent des lignes `programme`, est exigé par **4 sujets vérifiés sur 4** |
| `maths/geometrie-espace` | 13 | **la notion la mieux vérifiée de la campagne** : les deux critiques ont recalculé séparément les **57 clés d'items** (et l'arithmétique fausse annoncée par chaque distracteur), les **5 barèmes** question par question, et recompté le `coverage_summary` depuis les tags bruts — `total_items`, les 11 `per_rung`, les **30** `per_misconception_any_distractor` et les **26** `per_misconception_primary`, **tous exacts**, les 13 modèles au plancher siégeant bien dans 3 items distincts ; et **les ~200 citations « chapitre N » vérifiées une à une par les deux, toutes justes**. Corrigé : **deux `reasoning` RENDUS disent à l'élève qu'il sort du programme sur du contenu que la leçon lui a enseigné** (« le chapitre 10 traite la tangence plan-sphère » — le chapitre 10 porte une section titrée sur la sphère ∩ DROITE ; « ni les chapitres 2 à 10 ne nomment la médiatrice » — le chapitre 7 porte une section titrée « Le plan médiateur ») ; **réponse au-dessus de la porte d'essai** — le checkpoint d'avant-sommet reprenait EXACTEMENT les nombres de r-bac ($R=\sqrt5$, $d=\sqrt3$), c'est-à-dire les réponses de ses questions 2 et 3a, et la prose juste au-dessus nommait la décision de méthode de q3b : re-numéroté en $\sqrt{11}/\sqrt7/2$ ; **une étiquette `item_source` fausse** qui masquait précisément cela ; le milieu d'un segment attribué au chapitre 2 alors qu'il n'y est pas établi (mais j'ai VÉRIFIÉ les deux autres citations « chapitre 2 » du même lot : elles portent sur la norme et « arrivée moins départ », qui y sont — elles restent) ; équation développée de la sphère sans sa condition de nature ; titre de R9 et note de validation omettant deux sections enseignées. **SEV1 cadre → research-lead, et les deux critiques convergent : LE CADRE A TORT sur le produit vectoriel** — `maths-sexp.yaml` doute que ce soit un objet testé et classe l'affirmation parmi ses plus faibles, alors que **4 des 5 exercices vérifiés ouvrent dessus, toujours en question 1**. En revanche le produit mixte (R4) est vraisemblablement hors SExp et le relevé CORROBORE l'exclusion (0/5, et CENSUS donne SM 0 / SExp 19) → ne pas supprimer sans arbitrage, mais **GE-31 met un outil exclu dans R10, le barreau présenté comme « le format de l'épreuve »**. Pédagogie : deux sous-sections entières (plan médiateur, sphère ∩ droite) enseignées, portant chacune un modèle faux NOMMÉ, sans aucun item ni misconception déclarée ; la variation partage terme constant, corrections {1,4,9} et rayon 3 avec l'exemple travaillé du chapitre ; 3 checkpoints sur 5 clones nombre pour nombre d'items du banc ; 19 des 30 modèles non réclamés |

**578 correctifs objectifs** au total, dont **106 pour la seule campagne de
provenance de transcription** (§11.75), qui a touché 18 notions d'un coup.
Les six notions triées le 2026-09-19 ajoutent 109 correctifs :
`pc/electrolyse` 43, `pc/noyaux-masse-energie` 12,
`pc/ondes-mecaniques-progressives` 12, `pc/aspects-energetiques` 14,
`pc/ondes-mecaniques-periodiques` 16 et `pc/rotation-axe-fixe` 12.

**Le motif de l'étiquette fausse s'est présenté dans QUATRE des six.** Dans
`rotation-axe-fixe`, les deux critiques le décrivaient comme un **clone
verbatim** portant l'autre étiquette, et j'ai commencé par les croire : j'ai
écrit ici que « chercher les textes de distracteur dupliqués » serait la sonde
la moins chère du motif, et j'ai armé une porte pour ça.

**Les deux se sont révélés faux, et la porte est morte de cette vérification.**
ROT-2 D et cp-r2 D sont des **paraphrases**, pas des clones (« *sur l'axe de
rotation, si bien que* » contre « *sur l'axe : * ») ; ROT-7 C et cp-r0 C sont
deux distracteurs **différents** de la même famille. Mesure de la porte avant de
la retirer : **48 textes clonés sur 5 920 distracteurs** dans tout le corpus, et
**zéro conflit** — y compris sur le défaut réinjecté exprès, qu'elle n'a pas vu.
Troisième sonde tentée aujourd'hui, troisième échec (§11.85).

Les deux réétiquetages restent justes : ils tiennent sur le texte et le retour
de chaque distracteur pris isolément. C'est **l'argument** que j'avais repris
qui ne tenait pas. La leçon est celle que la campagne s'était déjà donnée et que
j'ai laissée passer ici : **un rapport de critique se vérifie sur le fichier,
y compris quand il est bon partout ailleurs** — et celui-ci l'était, il avait
recalculé les 25 items sans une erreur.

Deux garde-fous appris en chemin, tous deux appliqués :
- **quand aucune famille du registre ne porte le modèle que le retour décrit,
  on DÉCLARE au lieu de réétiqueter** (`ondes-mecaniques-periodiques` : deux
  étiquettes contestées par les deux critiques, aucune famille d'accueil, la
  réserve et son chiffrage écrits dans `coverage_summary`) ;
- **quand deux critiques divergent, on n'applique que leur intersection.** Sur
  la même notion, la pédagogie en conteste quatre et la fidélité trois, avec
  deux seulement en commun. Les deux communes sont traitées, les autres vont au
  propriétaire. Deux constats de ce
lot méritent d'être retenus comme *motifs*, pas comme incidents.

**Électrolyse — une convention d'écriture que la leçon respectait et que les
corrigés modèles enfreignaient partout.** Le cadre impose la double flèche aux
demi-équations d'électrode et la flèche simple au bilan. La leçon : 6 doubles,
0 simple. Le reste de la notion : **33 demi-équations en flèche simple**, plus
une brèche inverse (un bilan forcé en double flèche) — et deux clones qui
divergeaient de leur original sur ce point précis. La règle était écrite en
toutes lettres **dans la notion elle-même**, deux lignes après avoir été
enfreinte, et le sujet national 2022 qu'elle transcrit imprime la double
flèche. Le discriminant qui rend une passe de masse sûre : **une demi-équation
contient `e^-`, un bilan n'en contient jamais.**

**Noyaux — deux masses fausses de 10 MeV, en sens opposés, donc invisibles.**
La somme sortait plausible et l'arithmétique de l'item était juste : le défaut
était inerte, et le serait resté jusqu'à la première réutilisation de ces
masses. Il n'a été trouvé que parce que la notion construit toutes ses masses
de noyaux par la même règle (`masse atomique − Z·mₑ`), **vérifiable contre ce
que les fichiers écrivent** : la règle tient à ≤4×10⁻⁵ u sur cinq nuclides et
casse d'un facteur 250 sur ces deux-là. Même motif dans le diagramme d'énergie
fabriqué de la variation : **les trois niveaux décalés du même 1 280,3 MeV**,
donc toutes les différences justes et aucun niveau juste. Leçon générale :
*quand un corpus se donne une règle de construction, cette règle est un
instrument de mesure — il suffit de la retourner contre lui.*

**Le motif le plus transférable de cet arc : une étiquette de distracteur que
son propre retour dément.** Trouvé dans DEUX notions le même jour, par des
critiques différentes. Dans `aspects-energetiques`, trois distracteurs
portaient une misconception que leur `feedback` décrivait autrement, et
**c'est sur elles que reposait `floor_met: true`** : réétiquetées d'après leur
retour (chaque fois confirmé en refaisant le nombre), la famille
`confusion-v-et-v-carre` retombe de 3 à 1 et le plancher tombe. Dans
`ondes-mecaniques-progressives`, le même motif (OMP-20 D) est laissé au
propriétaire parce qu'il casse aussi un plancher. La leçon vaut pour toute la
suite de la campagne : **un compte de couverture n'est vrai que si chaque
étiquette l'est**, et le vérifier demande de relire le retour et de refaire le
nombre, distracteur par distracteur. La porte `couverture-diagnostique` compte
des étiquettes ; elle ne peut pas savoir qu'elles mentent.

**Deuxième motif de l'arc : une donnée d'énoncé qui n'existe que dans la
solution.** `ondes-mecaniques-progressives` avait un `part` rendu intitulé
« Exploitation du **tableau** des rayons du front d'onde » sans aucun tableau
nulle part : les trois valeurs ne vivaient que dans la `solution` et dans
`sourcing`, **qui n'est jamais rendu**. Trois questions d'un sujet national
étaient insolubles, et le contrat « tente d'abord » cassé. Le `sourcing`
attestait pourtant avoir lu le tableau à la source : perdu à la transcription,
pas à la lecture.
Les quatre notions triées le 2026-09-12 ajoutent 53 correctifs :
`pc/esterification-hydrolyse` 14, `pc/reactions-acido-basiques` 17,
`pc/rc-charge` 9, `pc/dipole-rl` 13. Sur ces quatre, **neuf constats de
critiques ont été DÉCLINÉS avec la mesure qui les réfute** — dont trois
bâtis sur une citation inexacte du fichier, et un (« la bonne réponse est
en position A six fois de suite ») mesuré sur le FICHIER quand le rendu
mélange les choix. Le reste du décompte antérieur (dont 14 classes sur `pc/systemes-oscillants`,
11 sur `pc/chute-mouvements-plans`, 11 sur `pc/lois-de-newton` et 9 sur
`pc/ondes-em-modulation`,
la notion la plus lourde du corpus — 211 items, 19 entrées de banque, `part_examen: 27` —
plus 2 correctifs HORS notion qu'elle a fait apparaître : voir §11.66), 0 échec
`validate-content --strict` sur les
vingt. Les défauts **bloquants** ne sont jamais réécrits en autonomie — ils
touchent des règles biologiques enseignées (genetique-humaine F1 : « un père
atteint lié à l'X ne transmet jamais à ses fils » est faux quand la mère est
conductrice) ou une décision de conception (genetique-humaine P2 : les
distracteurs de crochet portent des étiquettes de misconception qui **compilent**
dans le modèle apprenant via `record-notion-event/item-misconceptions.json`, alors
que le fichier interdit d'en déclarer de nouvelles). Ils sont consignés en tête de
chaque revue, à charge de l'auteur de contenu du domaine.

Systémique SVT re-confirmé sur les deux notions SVT : **aucun** `exercises.yaml`,
`spec.md`, ni `docs/sujets/svt` ; pas de sommet vérifié ; pas de tag `habilete`
cohérent. Campagne dédiée, pas un correctif de revue.

### 11.46 Le code de barreau « R<n> » fuyait dans le KaTeX RENDU des exercices — 12 fuites sur 5 notions, et la porte élargie à la couche exercices

**MESURÉ, CORRIGÉ, puis PORTE.** Les revues vague-1 de fonction-logarithme (F3, 12
occurrences) et dipole-rl (F16, 2) ont trouvé, chacune de son côté, la même classe :
un « R<n> » (code de barreau) glissé dans un `\text{}` d'un champ **rendu** de
`bank.yaml` (`steps[].math`, `reasoning`…) se peint **littéralement** chez l'élève —
qui ne voit jamais le code (le rail et `chapters.ts` affichent « chapitre N », avec
chapitre N = R(N−1)). C'est exactement la faute que la porte figures (§11.15) et la
porte prose (tâche #26, le mot « rung ») tuent déjà — mais **dans la couche
exercices, un angle mort** : la porte jargon existante ne balaie que la prose de
`lesson.md` (`visible`), jamais le math des exercices.

Balayage corpus (`\text{…R\d…}` dans bank/items/exercises/checkpoints) : **12 fuites
sur 5 notions maths** — suites-numeriques (×4, « théorème des gendarmes/limite
monotone, R6/R7 »), nombres-complexes-2 (×4, « Moivre, R3 » ; « rung R6 » ×2 ;
« chapitre 1, R3--R4 »), derivabilite (×2), structures-algebriques (×1),
fonction-exponentielle (×1). Toutes réécrites en « chapitre <n+1> » (les renvois
inter-notions — « R4, fonction-exponentielle » — nommés par la notion sans code ; le
« chapitre 1, R3--R4 » muddled nommé par le concept, « module et conjugué »). PC : **0
occurrence** — les résistances y sont notées `R_0` (indice), que le motif `\bR\d`
(chiffre COLLÉ au R) ne matche pas.

**Porte ajoutée** (avertissement, non échec) : chaque `\text{…R\d…}` d'un champ rendu
de bank/items/exercises/checkpoints est signalé. 0 faux positif mesuré sur les 62
notions (le motif ignore `R_0`), 0 fuite résiduelle après correction. Comme les portes
sœurs (§11.43/§11.44), elle tourne en CI (validate-content --strict) sans jamais
bloquer, et complète pour la COUCHE EXERCICES ce que la porte prose fait pour la leçon
et la porte figures pour les SVG (ADR 0031 : le sens qui manquait finissait contourné).

### 11.47 La porte §11.46 ne voyait qu'un tiers de la fuite — 61 codes de barreau RENDUS, et le recensement des chapitres corrigé

**MESURÉ, CORRIGÉ, PORTE ÉLARGIE.** La porte de §11.46 ne balayait qu'un motif :
`\text{…R\d…}`, c'est-à-dire un code de barreau **dans du KaTeX**. Un balayage
corpus (62 notions) a montré qu'elle ratait trois autres formes, toutes RENDUES :

| Forme ratée | Exemple trouvé | Fuites |
|---|---|---|
| code nu **hors** `\text{}`, dans le math | `L = f(L) \quad (R8)` | **16** |
| code en toutes lettres dans la prose | « Formule de l'intégration par parties (**chapitre R7**) » | **34** |
| mot doublé par une réécriture antérieure | « (**chapitre chapitre** 8 de Suites numériques) » | **11** |

**61 fuites rendues, 12 notions** (nombres-complexes-2 en portait 22,
fonction-exponentielle 12, probabilites-conditionnelles 5). Toutes réécrites en
« chapitre N », N **dérivé du fichier** (position du titre `##`), pas d'une
convention supposée. Corrigé aussi un renvoi mort rendu (« SCOPE NOTE — voir le
commentaire en tête de cette entrée » : l'élève ne voit pas l'en-tête d'un YAML).

**La porte suit désormais la CLÉ YAML propriétaire de chaque ligne** et n'avertit
que pour un champ rendu (`intro/stem/reasoning/note/text/feedback/solution/math`…),
jamais pour une `sourcing.note` ni un `retagged_items` — où l'auteur a le droit de
parler en barreaux. Sans ce filtre, 13 notes d'auteur criaient au loup. Les
résistances de PC (`R_0`, `R1` d'un circuit) ne matchent aucune des formes :
**0 faux positif, 0 avertissement résiduel sur les 62 notions.**

**Le recensement des chapitres était faux, et c'était un piège.** `chapters.ts`
affirmait « pour 60/61 leçons le `##` coïncide avec la grammaire `R<n>` ;
probabilites-conditionnelles est **la** seule exception ». Re-mesuré : **56/62**,
et **six** exceptions — probabilites-conditionnelles (6 titres / 1 barreau),
structures-algebriques (10/8), nombres-complexes-1 (9/7), suites-numeriques (12/11),
limites-continuite (8/7), derivabilite-etude-fonctions (7/6). Un titre `##` sans
préfixe `R<n>` **décale tout ce qui le suit** : dans suites-numeriques, le
« Suites homographiques » non numéroté rend R9 en chapitre **11**, pas 10.

**Conséquence à ne pas rater** — le raccourci « chapitre N = R(N−1) », employé par
les revues de contenu ET par les critiques vague 1, n'est valable que pour les 56
leçons à barreaux purs. Vérifié : dans les six autres, la prose cite déjà le
numéro **rendu** correct (structures-algebriques « un homomorphisme (chapitre 10) »
= R7 ; nombres-complexes-1 « chapitre 8 » = R5 géométrie), et un balayage n'a trouvé
**aucune citation dérivée**. Appliquer le raccourci naïf là-bas **casserait** des
renvois justes. Le commentaire de `chapters.ts` porte désormais le recensement, les
six noms, et cet avertissement.

### 11.48 Une leçon citée sous trois noms différents — 18 renvois morts vers des leçons inexistantes, et la porte qui le dit

**MESURÉ, CORRIGÉ, PORTE (vérifiée ROUGE).** ADR 0031 pose qu'« un renvoi est une
instruction ». Un balayage des renvois inter-leçons RENDUS (titre cité entre
guillemets après « chapitre N de », « la leçon », « la notion ») contre les 62
titres réels du corpus a trouvé **18 renvois morts sur 9 notions PC** — aucun ne
correspondait à un titre existant :

| Cité (mort) | Titre réel | × |
|---|---|---|
| « Chute libre et mouvements dans un plan » | **Chute libre et mouvements plans** | 3 |
| « Chute et mouvements sur des plans » | idem | 3 |
| « Chute verticale et mouvements plans » | idem | 1 |
| « Réactions acide-base » | **Réactions acido-basiques** | 5 |
| « Dipôle RC : charge et décharge » | **Dipôle RC — réponse à un échelon de tension** | 1 |
| « RC : charge d'un condensateur » | idem | 1 |
| « Ondes mécaniques périodiques » | **Ondes mécaniques progressives périodiques** | 1 |
| « Rotation d'un solide autour d'un axe fixe » | **Rotation autour d'un axe fixe** | 1 |
| « Ondes électromagnétiques et modulation d'amplitude » | **Ondes électromagnétiques — modulation d'amplitude** | 1 |

Le défaut marquant : **une même leçon citée sous TROIS noms** (chute-mouvements-plans),
une autre sous deux (rc-charge). L'élève qui cherche « Chute verticale et mouvements
plans » ne trouve rien — le corpus ne porte pas ce titre.

**Porte ajoutée** à `validate-content` (avertissement) : tout titre cité après une
amorce de renvoi doit correspondre à un titre réel, l'inclusion partielle tolérée
(un titre raccourci reste trouvable) ; les commentaires `#` (notes d'auteur) sont
ignorés. **Vérifiée dans les deux sens** (ADR 0031 : une porte doit pouvoir passer
au ROUGE) : un renvoi mort injecté dans lois-de-newton la déclenche, le revert la
rend verte. **0 avertissement résiduel sur les 62 notions.**

### 11.29–11.41 en un coup d'œil, et le déployé

**LA SOIRÉE DU 2026-09-11**, treize points, tous mesurés avant/après :
- **§11.29–11.30** la veille d'hydratation (un morceau perdu dit à +0,3 s au
  lieu de +8,3 s, une seule voix, filet à 30 s ; le bouton Retour restaure
  leçons et épreuves en 0,1 s) ;
- **§11.31** la mémoire (7–11 Mo de tas, 0 fuite en 60 changements de
  chapitre, 166–309 Mo d'empreinte réelle) ;
- **§11.32** une adresse inconnue servait une page VIDE → `dynamicParams=
  false`, la page introuvable prérendue, porte armée ; et les 117 pages
  valides servent tout leur texte sans JavaScript (ratio 1,00) ;
- **§11.33 · 11.39 · 11.40** l'épreuve au clavier et au lecteur d'écran : le
  focus posé aux deux gestes et annoncé, l'auto-évaluation ramenée de 144 à
  48 arrêts de tabulation (roving tabindex + flèches), la note qui monte
  enfin annoncée (aria-live polie) ;
- **§11.34** la palette ⌘K trouve « maths », « svt », « 2025 » et rend le
  focus ;
- **§11.35** les polices −85 ko par page (latin-ext préchargé pour rien) ;
- **§11.36** le contraste élevé Windows (boutons sans bord → contour
  système) ;
- **§11.38** les troncatures « … » sur téléphone (titres et sous-titres se
  plient) ;
- **§11.41** toute commande a un nom accessible (0 sans nom) ;
- **§11.37** et par-dessus tout : **la CI n'a plus de runner depuis le
  2026-09-11 à 18:53Z**
  (cause côté compte), donc chaque point ci-dessus n'est vérifié qu'en
  LOCAL — build + `dom-truth` (277/0) + `lint`, et la batterie complète
  rejouée à la main sur 5a43b1b (19/19). Une porte qui ne tourne pas n'est
  pas verte.

**LE DÉPLOYÉ** (preview Vercel, `curl`, 21:43Z) porte déjà les correctifs
observables sans navigateur : la page introuvable prérendue sur une adresse
inconnue (404 avec en-tête et `<h1>`), la règle `forced-colors` dans le CSS,
le manifeste des épreuves dans la palette, le second détecteur de la veille
(`__bacPerduVerif`) en tête du document, et quatre fichiers de police au
lieu de six. Ce que `curl` ne voit pas (le focus, les régions live, le
clavier) reste vérifié sur le build local, l'artefact déployé n'étant pas
atteignable en Chromium depuis ce conteneur (INSTRUMENTS, point 9).

### 11.49 Une notion, deux clés de jointure — six notions contradictoires, et les 68 codes qui ne joignent rien

Parti d'un constat de la revue vague 1 sur `suites-numeriques` (« dérive
`skill_code` sur les cinq items les plus récents »), re-mesuré sur les 62
notions. Le constat de départ était **à l'envers**, et le vrai défaut est
plus large.

**Ce que `skill_code` est.** Une clé de jointure vers la base : les RPC font
`SELECT lesson INTO v_lesson FROM public.skills WHERE code = p_skill_code`
(migrations 025/026/028), et l'ADR 0008 exige « verbatim `skills.code` ».

**Défaut 1 — six notions déclaraient DEUX codes à la fois** (51 lignes) :
`maths/suites-numeriques` (5 items sur 39 en `maths_…`, le reste en `sma_…`)
et cinq notions de philo où la variante **avec** article doublait la variante
sans — `philo_l_etat`/`philo_etat`, `philo_l_histoire`/`philo_histoire`,
`philo_la_violence`/`philo_violence`, `philo_le_bonheur`/`philo_bonheur`,
`philo_le_devoir`/`philo_devoir`. Au câblage, une moitié de la notion se
joindrait ailleurs — ou nulle part — en silence.

**L'arbitrage ne se prend pas à la majorité du corpus.** Le corpus penche pour
`maths_*` (12 notions de maths sur 14), ce qui aurait fait des 5 items déviants
de `suites-numeriques` les **bons**. C'est faux : le fichier est bâti sur
`sma_suites_numeriques` — tous ses ids de misconception sont
`mc.math.sma_suites_numeriques.<label>` (ADR 0011 lie ce préfixe au
`skill_code`) et 114 tags de distracteurs les visent. Même méthode en philo :
les ids y sont `mc.philo.etat.`, `mc.philo.violence.` — jamais
`mc.philo.l_etat.` — donc c'est la variante **sans** article qui est engagée,
et elle était de surcroît majoritaire dans les cinq cas. **C'est la cohérence
interne du fichier qui tranche, pas le vote du corpus.**

**Défaut 2, consigné et NON corrigé — les 68 codes ne joignent rien.** Les 108
`skills.code` réellement semés par les migrations et les 68 `skill_code`
employés par `content/` ont une intersection **vide**. Pour les suites, la base
sème `sma_sequences_review`, `sma_sequence_convergence`,
`sma_adjacent_sequences` ; le contenu dit `sma_suites_numeriques`. Aucune des
deux valeurs en litige n'existait donc côté base. Rien ne casse **aujourd'hui** :
`skill_code` est déclaré dans trois interfaces de `web/src/lib/content.ts` et
**lu nulle part** — l'app Next.js lit des fichiers, elle ne joint pas. C'est
une dette dormante, à trancher par le propriétaire du schéma quand le câblage
arrivera (l'en-tête de `items.yaml` le dit déjà : « proposé — à confirmer par
supabase-architect »). Deux notions emploient en plus un préfixe d'id abrégé qui
ne se dérive pas de leur `skill_code` (`maths/structures-algebriques` →
`structures_algebriques` ; `pc/ondes-mecaniques-progressives` → `pc_omp`) :
divergence de nommage, pas contradiction — laissée telle quelle.

**PORTE** ajoutée à `validate-content` (avertissement) : une notion ne peut
déclarer qu'un seul `skill_code`. Elle ne contrôle que la contradiction
interne — sans ambiguïté, et c'est la classe qui vient d'être corrigée. Elle ne
contrôle pas l'existence du code côté base (le défaut 2 est déféré, pas
gardé). **Vérifiée dans les deux sens** (ADR 0031 — une porte doit pouvoir
passer au rouge) : réinjecter un second code dans `suites-numeriques` la
déclenche, le revert la rend silencieuse. `validate-content --strict` : 0
failure sur les 62 notions.

### 11.50 Ce que la zone « à retenir » affiche RÉELLEMENT — 491 chapitres mesurés, et un filtre que la glose française trompait

La zone « à retenir » n'avait jamais été mesurée sur le corpus : on savait
qu'elle existait, pas ce qu'elle **dit**. Mesuré avec le code qui rend la page
(`src/lib/retenir.ts` + `src/lib/chapters.ts`), pas avec une réimplémentation —
Node 22 sait charger le TypeScript tel quel, il ne manquait qu'un crochet de
résolution pour l'alias `@/` et les imports sans extension :

```
node --experimental-strip-types --import <shim-registre> <script-de-balayage>
```

(Le commentaire de `scripts/item-stats.mjs` — « Node scripts here can't import
TS from web/src » — est faux deux fois : `scripts/test-examens.mjs` charge déjà
`lib/examens.ts` **via `jiti`**, et Node 22 sait le faire nativement. `jiti`
reste la voie de la maison ; le dépouillement natif est simplement ce qui a
servi ici, sans dépendance.)

**Ce que ça donne, sur 491 chapitres / 62 notions :**

| | chapitres | |
|---|---:|---|
| carte **authorée** (sidecar `retenir.json`) | 6 | 1 notion sur 62 en porte un |
| repli sur un `\boxed{}` (signal d'auteur fort) | 27 | |
| repli **AVEUGLE** (la 1ʳᵉ formule bloc, quelle qu'elle soit) | 193 | |
| **silence** | 265 | |

Le silence se ventile en deux choses très différentes, et il faut les séparer :

- **111 silences de BORD**, attendus : le 1ᵉʳ chapitre est l'accroche (pas encore
  de formule) et le dernier est « S'entraîner », à qui le code donne
  explicitement `null`.
- **152 silences de CŒUR sur 367 (41 %)** — et là c'est un vrai trou. Mais il
  n'est pas réparti : **maths 5 %, PC 19 %, SVT 82 %, philo 100 %** (68
  chapitres de cœur sur 68).

**Le constat pour le propriétaire, et il est de niveau produit :** « à retenir »
est de fait une fonctionnalité **maths/PC**. Un élève de philo ne la voit
*jamais*, un élève de SVT presque jamais — non par oubli de rédaction, mais
parce que le repli ne sait chercher qu'une formule `$$…$$` et que ces leçons-là
n'en contiennent pas. Ce n'est pas réparable en autonomie : il faut décider si
une carte « à retenir » de philo est une *phrase* (une thèse, une distinction)
plutôt qu'une formule, ce qui change la forme de `RetenirEntry` et demande
121 cartes authorées. Déféré — décision de conception + content-author.

**Ce qui A été corrigé — un défaut du filtre, mesuré et borné.** `estCalculNu`
rejette une formule « sans lettre », son intention écrite étant : « sans lettre,
il n'y a pas de relation, seulement un calcul ». Mais il ne retirait que le
**nom** des commandes LaTeX, pas l'**argument** des commandes textuelles — si
bien qu'une glose en français fournissait les lettres :

```
ACCEPTÉ   4 - 2 = 2 \text{ ATP nets par molécule de glucose}
REJETÉ    5 \times 4 \times 3 \times 2 \times 1 = 120
```

Les deux sont pourtant le même objet. Le filtre neutralise désormais l'argument
de `\text|\textrm|\textbf|\textit|\mathrm|\operatorname` avant le test.

**Une régression évitée en mesurant avant de livrer.** La version brutale de ce
correctif (retirer la glose, puis exiger une lettre) cassait
`svt/role-enzymes ch3`, dont la formule-clé est une **équation-mot** écrite
entièrement en `\text{}` : « Enzyme + Substrat ⇌ Complexe enzyme-substrat ».
Sans lettre *hors* glose, elle serait passée pour un calcul. Règle retenue :
une lettre hors glose ⟹ relation, on garde ; sinon on ne rejette **que** s'il
reste un **chiffre** — ni lettre ni chiffre, c'est une équation-mot, et c'est
une vraie formule en SVT.

Impact re-mesuré avec le module corrigé : **exactement 2 cartes changent**,
toutes deux de l'arithmétique d'exemple vers le silence
(`svt/liberation-energie-matiere-organique ch3` : « 4 − 2 = 2 ATP nets » ;
`svt/transmission-caracteres ch7` : « noir-simple : 49/186 ≈ 0,26 »), ce qui est
le comportement que le module revendique lui-même (« la zone se tait, ce qui
reste préférable à lui faire dire une étape intermédiaire »). L'équation-mot des
enzymes est conservée. `tsc --noEmit` : 0 erreur.

**Reste ouvert, non corrigé :** les replis aveugles ne sont pas tous justes.
L'échantillon montre du très bon (`P(E) = card(E)/card(Ω)`, `τ = x_f/x_max`,
`Δm = m_produits − m_réactifs`) et du clairement faux. Le vrai correctif n'est
pas un meilleur repli : c'est un `\boxed{}` par chapitre, ou le sidecar. 28
chapitres sur 491 portent aujourd'hui ce signal.

**Les 16 chapitres dont la carte est puisée DANS un exemple travaillé** (mesuré
en repérant si la formule retenue tombe après un sous-titre « ### Exemple… ») —
et le constat qui compte : le repli prend le PREMIER bloc `$$` recevable, donc
s'il atterrit dans l'exemple, c'est qu'**aucun bloc ne le précédait**. Autrement
dit, ces chapitres **n'énoncent jamais leur résultat en math bloc** — il est en
puces ou en math inline. C'est cela qu'il faut corriger, pas le repli :

| chapitre | ce que la zone « À RETENIR » affiche |
|---|---|
| `maths/calcul-integral` ch9 | `F(0)=0 … F(2) = 8/3-8 = -16/3 …` |
| `maths/derivabilite-etude-fonctions` ch5 | `f'(x) = 3x^2 - 3` |
| `maths/fonction-logarithme` ch3 | `φ'(x) = u'(x) × 1/u(x) = a × 1/(ax)` |
| `maths/structures-algebriques` ch5, ch9 | la définition de F ; `a/b × b/a = 1` |
| `maths/suites-numeriques` ch2, ch4 | `u_n > 20` ; `u_n ≤ 100` |
| `pc/chute-mouvements-plans` ch9 | un pas d'Euler chiffré |
| `pc/etat-equilibre` ch6 | `Q_{r,i} = 1,2×10⁻³ / (0,8×10⁻³ × 2,8…)` |
| `pc/lois-de-newton` ch6 | `P⃗ + N⃗ + F⃗ + f⃗ = m a⃗_G` *(défendable)* |
| `pc/ondes-mecaniques-periodiques` ch5 | `λ_air = 340/440 ≈ 0,77` |
| `pc/piles` ch4 | la notation d'une pile Zn/Cu particulière |
| `pc/transformations-deux-sens` ch4 | `NH₃ + H₂O ⇌ NH₄⁺ + HO⁻` *(défendable)* |
| `svt/genetique-humaine` ch7 | une probabilité conditionnelle d'un cas précis |
| `svt/genetique-populations` ch2, ch7 | `compte(B) = 2×550 + 3…` ; `q = √(1/2500) = 1/50` |

Treize sont clairement des lignes de calcul ; deux ou trois se défendent. **Non
corrigé délibérément :** choisir la formule-clé d'un chapitre est un acte
d'auteur, pas une réécriture mécanique — et durcir le repli pour qu'il refuse
toute formule d'exemple ferait taire aussi les deux ou trois bonnes. →
content-author.

### 11.51 Le barème d'une épreuve complète : 38 sur 38 font exactement 20 — et rien ne l'exigeait

Parti du barème inventé trouvé dans `suites-numeriques` (§11.45) : si un
`bareme_total` peut être faux, que vaut la note que l'élève lit ?

`bareme_total` n'est pas décoratif. Il est **rendu** (`BankCard.tsx:90`,
`EpreuveShell.tsx:164` « N pts »), **sommé** en total d'épreuve
(`examens.ts:243`) et **utilisé pour le reste à attribuer** dans
l'auto-évaluation (`EpreuveShell.tsx:450`). C'est le dénominateur de la note
sur 20.

**Mesuré** avec l'assembleur réel (`listEpreuves()`), sur les 39 épreuves
assemblées :

- **38 épreuves complètes, toutes à exactement 20,00** ;
- la 39ᵉ (`sm-2020-normale`, 10,5 pts, 3 exercices) est correctement marquée
  incomplète ;
- **247 entrées d'épreuve sur 247** portent à la fois `bareme_total` et
  `duration_min` — aucun trou ;
- le cumul des durées colle à la durée officielle (240 min SM / 180 SPC)
  partout sauf sur la seule épreuve incomplète, ce qui est attendu.

**Résultat négatif : cette couche est saine.** Ce qui ne l'était pas, c'est
qu'elle n'était gardée par rien. `test-examens.mjs` posait bien un plafond
(« le barème ne dépasse jamais 20 ») et définissait `complete` comme
`pts >= 19,5` — mais **aucun test n'exigeait qu'une épreuve complète fasse
20**. Une épreuve à 19,5 ou 19,75 passait donc les 13 tests, s'affichait comme
complète, et servait de dénominateur à une note sur 20. Un quart de point
perdu dans un seul `bareme_total` ne se serait vu nulle part.

Assertion ajoutée : « une épreuve COMPLÈTE totalise exactement 20 ».
**Vérifiée dans les deux sens** (ADR 0031) : en retirant 0,25 pt d'un seul
`bareme_total` d'arithmetique, elle tombe en nommant la coupable
(`sm-2019-normale : 19.75`) ; le revert la remet au vert. 14 tests, 14 verts.

### 11.52 Le TeX qui arrivait nu chez l'élève, et une porte de §11.48 qui ne voyait qu'un renvoi mort sur six

Deux défauts trouvés en triant `fonction-exponentielle`, tous deux plus larges
que la notion, tous deux dus à un **trou de porte**.

**(1) La note d'un pas n'était validée nulle part.** `<Note>`
(`Derivation.tsx:34`) rend par ReactMarkdown + remarkMath : une formule ne
devient du KaTeX que si elle est délimitée par `$`. Sans délimiteur, elle sort
**littéralement**. Vérifié en rendant la chaîne dans le vrai pipeline
(`react-dom/server` + `ReactMarkdown` + `remarkMath`) :

```
source : (e^{x/2}-1)^2 - 1 = e^x - 2 e^{x/2} = e^{x/2}(e^{x/2}-2).
rendu  : <p>(e^{x/2}-1)^2 - 1 = e^x - 2 e^{x/2} = e^{x/2}(e^{x/2}-2).</p>
```

L'élève lit les accolades. Mesuré sur les 4 958 notes du corpus : **90 notes sur
9 notions** portent de la syntaxe purement TeX (accolades, antislash) hors de
toute paire `$…$` — `maths/nombres-complexes-2` 22, `fonction-exponentielle` 33,
`suites-numeriques` 13, `limites-continuite` 7, le reste dispersé. À distinguer
des **529 notes** en ASCII-math lisible (`n^8`, `u_n`) : là, rien ne casse, et
c'est le style de la maison — on n'y touche pas.

*Un signalement que j'avais moi-même levé à tort :* 139 notes portent deux `_`
nus, ce que j'ai d'abord noté comme un risque d'italique markdown. **Faux**, et
le rendu le prouve : `u_n et v_n convergent vers L_1 et L_2.` ressort identique,
CommonMark excluant le souligné intra-mot de l'emphase. Aucune correction due.

**Pourquoi c'est passé :** `validate-content` fait valider `steps[i].note` pour
`derivations.yaml` — mais pour `exercises.yaml` et `bank.yaml` il ne validait que
`steps[i].math`. La note, qui porte 4 958 chaînes contre quelques dizaines dans
`derivations.yaml`, était le seul champ rendu jamais contrôlé. **Porte étendue**
aux deux fichiers.

**Campagne close le même jour : les 90 notes sont délimitées**, sur les 9
notions (`nombres-complexes-2` 24, `fonction-exponentielle` 33,
`suites-numeriques` 13, `limites-continuite` 7, `nombres-complexes-1` 4,
`arithmetique` 3, `equations-differentielles` 4, `lois-de-newton` 1,
`rc-charge` 1). Le contenu mathématique n'est pas touché — seuls les
délimiteurs sont posés, et au plus près : le fragment porteur d'accolades,
jamais la prose ni les symboles unicode (→, ≥, ×, √) qui se rendent déjà bien.

**La porte neuve a immédiatement attrapé un défaut que je venais d'introduire.**
En délimitant `e^{±iπ/3}=½±i√3/2`, le `½` est passé du texte — où il se rend
parfaitement — à l'intérieur d'une formule KaTeX, qui n'a **aucune métrique**
pour ce caractère : glyphe cassé chez l'élève. La porte a échoué en le nommant
(`bk-2020-n-x3.q4b.steps[1].note`), et le `½` est ressorti du `$…$`. C'est
exactement ce pour quoi elle a été étendue, et elle l'a prouvé sur son auteur
avant tout autre.

**(2) La porte « renvoi mort » de §11.48 ne voyait qu'un renvoi mort sur six.**
Elle exigeait une amorce — « chapitre N de », « la leçon », « la notion ». Or un
renvoi s'écrit aussi « établie **dans** « … » », « domaine « … » », « **sous**
« … » », ou en simple libellé entre parenthèses. Re-balayé par **quasi-titre**
(recouvrement de mots avec un titre réel) : **29 renvois morts subsistaient**,
dont deux que la campagne §11.48 avait laissés derrière elle.

| cité (mort) | titre réel | × |
|---|---|---|
| « dérivabilité et étude **de** fonctions » | **des** fonctions | 23 |
| « Géométrie **de** l'espace » | Géométrie **dans** l'espace | 2 |
| « Suivi temporel et vitesse de réaction » | Suivi temporel d'une transformation — vitesse de réaction | 1 |
| « Ondes électromagnétiques et modulation » | — modulation d'amplitude | 1 |
| « Chute libre et mouvements dans un plan » | Chute libre et mouvements plans | 1 |
| « Rotation d'un solide autour d'un axe fixe » | Rotation autour d'un axe fixe | 1 |

Les 29 corrigés (31 remplacements : deux vivaient dans un commentaire d'auteur).
**Second détecteur ajouté à la porte**, par quasi-titre plutôt que par amorce.
Seuil calibré sur le corpus : 0,6 de Jaccard seul, ou 0,5 avec une amorce. En
dessous vivent les citations ordinaires de philo — « chacun sa vérité », « État
de droit », « Analyse le texte et discute-le. » — toutes à 0,5 sans amorce, et
qu'il ne faut surtout **pas** signaler : le seuil a été choisi pour les épargner,
et il les épargne toutes.

**Les deux portes vérifiées dans les deux sens** (ADR 0031) : un `$…$` cassé
dans une note fait échouer `r-bac.q1.steps[0].note` en nommant l'erreur KaTeX ;
un quasi-titre injecté sans amorce déclenche le second détecteur ; le revert rend
les deux silencieuses. `validate-content --strict` : 0 failure sur les 62
notions.

### 11.53 Le mélange des réponses couvrait les checkpoints ; le témoin qui le prouve ne les voyait pas

Parti d'un constat de la critique pédagogie sur une seule notion (« la bonne
réponse est en A dans quatre checkpoints sur cinq »), re-mesuré sur le corpus.
Le biais rédactionnel est massif et général :

| | questions | A | B | C | D |
|---|---:|---:|---:|---:|---:|
| banc de fin (`items.yaml`) | 1 612 | **65,0 %** | 14,0 % | 11,4 % | 9,7 % |
| checkpoints | 362 | **75,0 %** | 18,6 % | 5,8 % | 0,6 % |

Et ce n'est pas une moyenne trompeuse : **douze notions de PC** écrivent la
bonne réponse en A sur la **totalité** de leurs checkpoints ; dix notions de SVT
et `philo/analyse-de-texte` (49 questions d'affilée) font de même sur leur banc
de fin.

**Sur le fond, résultat négatif — et le dépôt avait déjà raison.**
`lib/shuffle.ts` mélange de façon déterministe, par item, avec une graine
dérivée de l'identifiant : l'élève ne voit **jamais** l'ordre rédigé. Mieux, le
fichier documentait déjà le chiffre exact que cette mesure reproduit
(A 65,0 / 14,0 / 11,4 / 9,7), et `scripts/test-melange.mjs` le re-mesure à
chaque run — en asservissant aussi le **second témoin** (« le biais rédactionnel
EXISTE »), sans lequel « plat après mélange » serait vert avec le mélange
retiré. La discipline des deux sens était déjà là.

**Ce qui manquait est une PORTÉE, pas un mécanisme.** `lireCorpus()` ne lisait
que `items.yaml`. Les checkpoints passent pourtant par le même mélange
(`CheckpointItem.tsx:63`) et leur platitude n'était assertée nulle part — ADR
0031 : *la portée d'un mécanisme se mesure séparément de son fonctionnement.*
C'est exactement le trou fermé le même jour sur `steps[].note` (§11.52) : une
porte qui couvre un fichier mais pas son jumeau.

**Témoin étendu** — trois tests de plus (chargement, platitude après mélange, et
le second témoin du biais rédigé), sur les 360 checkpoints à quatre choix.
Après mélange : **26,1 / 24,7 / 20,3 / 28,9**, dans la fourchette 18–32 % déjà
en vigueur. Les deux corpus restent **séparés** pour que le sens des assertions
existantes sur les items ne bouge pas.

**Vérifié dans les deux sens** (ADR 0031) : en retirant le mélange du lecteur de
corpus, les *deux* tests de platitude tombent — celui des items et celui des
checkpoints ; rétabli, 10 tests sur 10 au vert. `tsc --noEmit` : 0 erreur. Les
chiffres des checkpoints sont consignés dans `shuffle.ts` à côté de ceux des
items, comme ce fichier l'exige lui-même : un chiffre voyage avec la commande
qui le produit.

### 11.54 Le champ `habilete` ne parle la langue d'aucun cadre — pourquoi la porte du ratio ne peut pas être construite

Les critiques vague 1 réclament, notion après notion, une porte sur le ratio
d'habiletés du cadre (40/40/20 en SM, 50/35/15 en SExp). Mesuré pourquoi elle
n'existe pas — et ce n'est pas le ratio qui cloche, c'est le champ.

**1. Le champ est quasi absent de la couche qui compte.**

| | portent `habilete` |
|---|---|
| items (`items.yaml`) | **36 / 1 612** — 2,2 % |
| checkpoints | 288 / 362 — 79,6 % |

Or `items.yaml` est précisément la couche sur laquelle le modèle apprenant est
bâti. Un ratio calculé sur 2,2 % des items ne mesure rien.

**2. Là où il est présent, son vocabulaire n'est celui d'aucun cadre.**

| matière | ce que le cadre définit | ce que le contenu écrit |
|---|---|---|
| **maths** | `application_directe` / `application_non_explicite` / `synthese_situations_inhabituelles` | `raisonnement` (41), `utilisation` (32) — **aucun des trois niveaux n'apparaît jamais** |
| **pc** | `utilisation_ressources` / `application_experimentale` / `resolution_probleme` | `utilisation` (110), `résolution` (27), `application_experimentale` (18) — des **abrégés** des noms du cadre, plus six valeurs étrangères |
| **svt** | `restitution_connaissances` / `raisonnement_scientifique_communication` | `raisonnement` (36), mais aussi `comprehension` (23) et `application` (16) — **39 occurrences hors taxonomie** |
| **philo** | *aucun axe d'habiletés* — le cadre dit que ce rôle est tenu par la grille d'évaluation /20 | `raisonnement` (6), `comprehension` (5), `application` (4) |

Les six valeurs étrangères de PC, nommément :
`controle-catalyse/checkpoints.yaml:128,196,332` (`restitution`, vocabulaire
SVT) ; `electrolyse:304` et `lois-de-newton:326` (`application`) ;
`ondes-mecaniques-progressives:324` (`raisonnement`).

**3. Conséquence, et pourquoi ce n'est pas corrigé ici.** Traduire
`raisonnement` vers l'un des trois niveaux maths n'est pas une réécriture
mécanique : c'est une décision curriculaire (« raisonnement » recouvre-t-il le
niveau 2, le niveau 3, ou les deux ?). La porte du ratio suppose donc trois
décisions du propriétaire, dans cet ordre : (a) une taxonomie par matière,
alignée sur le cadre ; (b) le champ porté par les items, pas seulement par les
checkpoints ; (c) alors seulement, une porte qui compare la distribution au
ratio. Tant que (a) et (b) manquent, toute porte serait verte sans rien mesurer
— précisément ce que l'ADR 0031 interdit.

**Portée du défaut : nulle côté élève.** `habilete` n'apparaît nulle part dans
`web/src` — c'est une métadonnée d'auteur, jamais rendue. Le coût est
d'auditabilité, pas d'affichage.

### 11.55 La porte des renvois morts, troisième élargissement — et une garde qui a failli l'aveugler

`nombres-complexes-1` citait *le chapitre « Nombres complexes : formes et
transformations »*, un titre qui n'existe pas. La porte de §11.48/§11.52 ne l'a
pas vu : sa cue exigeait **un numéro** (« chapitre N de »), et le détecteur de
quasi-titre ne mordait pas non plus (recouvrement 0,29 avec le vrai titre,
« Nombres complexes — forme trigonométrique et applications »).

**Troisième forme ajoutée** : « chapitre « X » » **sans numéro**. Deux
précautions ont été nécessaires, et la seconde est la leçon du jour.

**(a) Les titres de CHAPITRE sont des cibles légitimes.** « le chapitre
« Sous-groupe » » renvoie à l'intérieur d'une leçon, pas à une leçon : sans les
indexer, la porte criait au loup sur 13 renvois parfaitement justes (dont les
deux chapitres non numérotés de `nombres-complexes-1` lui-même). Les ~490 titres
`##` sont donc indexés comme cibles.

**(b) Une citation d'OUVRAGE n'est pas un renvoi.** En philo,
`la-personne/lesson.md:96` cite *le chapitre « De l'identité et de la
diversité »* — un chapitre de **Locke**, *Essai philosophique concernant
l'entendement humain*, 1690. Il fallait une garde. **La première version en
posait deux : une année, OU un titre en italique `\*[^*]{8,}\*`.** Ce second
motif attrape aussi le **gras** markdown — `**Ce qu'on cherche ici…**` — qui
ouvre la plupart des paragraphes de leçon. Résultat : la porte devenait
**aveugle sur presque tout le corpus**, et le test rouge est passé vert. Pris
uniquement parce que l'injection de contrôle n'a pas déclenché ce qu'elle aurait
dû. Garde resserrée à **l'année seule**, avec le motif d'italique explicitement
proscrit en commentaire.

**Deux renvois morts de plus, trouvés par la cue élargie et corrigés :**
`pc/transformations-deux-sens` citait « Estérification–hydrolyse » (le vrai
titre est « Estérification **et** hydrolyse ») et `maths/equations-differentielles`
citait « Dérivation » — la même leçon fantôme déjà corrigée ailleurs deux fois.

**Vérifiée dans les deux sens** (ADR 0031) : « Dérivation » réinjecté sans
numéro déclenche la porte en le nommant ; le revert la rend silencieuse ; et la
citation de Locke reste ignorée. 0 failure, 0 avertissement de renvoi sur les 62
notions.

**Corrigé aussi, dans `chapters.ts` :** l'exemple « nombres-complexes-1
« chapitre 8 » = R5 » ne disait pas dans quel FICHIER regarder. Une critique a
grepé le `lesson.md`, n'y a rien trouvé, et a rapporté l'exemple comme fabriqué.
Il ne l'est pas — les 18 occurrences sont dans `bank.yaml`, et une seconde
critique a confirmé indépendamment que chap.8 = R5 — mais un exemple qu'on ne
peut pas localiser est un exemple qu'on ne peut pas vérifier. Le commentaire
nomme désormais le fichier.

### 11.56 La réponse au-dessus de la porte d'essai : la classe est fermée côté libellés, et sa dernière racine est un asset manquant

Trois notions d'affilée ont livré le même défaut — une réponse imprimée
au-dessus de la porte d'essai — alors re-mesuré sur le corpus. Rappel du
mécanisme : dans `AttemptFirstExercise.tsx`, le libellé `part` **et** l'`intro`
se rendent HORS du gate ; seuls `reasoning` et `steps` sont gardés.

**Libellés `part` : la classe est close.** Sur les 240 libellés du corpus, **2**
portent encore un mot de résultat après un « : », et les deux sont des **faux
positifs** de philo (« un cas de coïncidence puis de divergence » décrit le
sujet de dissertation ; l'autre est une citation de chapitre). Les seuls vrais —
« Partie B … : convergence vers 0 » et « Partie C … : divergence vers −∞ » dans
`suites-numeriques` — sont corrigés (§11.45).

**Intros : une fuite de plus, trouvée et corrigée.**
`maths/fonction-logarithme`, `r-variation` — l'intro annonçait **trois de ses
propres réponses** : « $(C)$ passera **en dessous** de $(\Delta)$ » (c'est q6,
« en déduire la position relative »), « $f$ sera **strictement croissante** »
(q4, « prouver que $f$ est strictement croissante ») et « la suite sera
**décroissante** » (q10, « montrer que la suite est décroissante »). Trois
questions sur onze, dans l'exercice dont tout l'objet est de vérifier que
l'élève court seul. **Cette notion avait déjà été triée (§11.45, 7 correctifs) :
la fuite y avait été manquée.** L'intro nomme désormais les trois *dimensions*
qui basculent sans dire dans quel sens.

**La racine qui reste : un asset manquant.** Deux fuites mesurées ne se
corrigent PAS en retirant la phrase, parce que la phrase porte la **donnée** :

- `maths/fonction-exponentielle` q5b — la question demande de lire le signe de
  $g$ sur la courbe, et la description en prose **donne** le signe ;
- `pc/transformations-lentes-rapides` `r-variation` q5 — la question demande de
  déterminer $t_{1/2}$, et l'intro dit « elle atteint la moitié de sa valeur
  finale à $t = 10$ min », c'est-à-dire la lecture déjà faite. (Le jumeau
  `r-bac` fait bien : il donne les graduations, l'élève lit.)

Dans les deux cas la cause est la même : **le sujet imprimait une figure, le
corpus n'en a pas**, et la prose qui la remplace ne peut pas décrire la courbe
sans livrer ce qu'on demande d'y lire. Mesuré : **14 notions décrivent une
courbe en prose dans leurs exercices, et 12 d'entre elles ne portent AUCUN
marqueur `[[figure:]]` dans `exercises.yaml`** (seules `pc/aspects-energetiques`
et `pc/decroissance-radioactive` en ont un). C'est un manque d'ASSET, pas de
rédaction — coder ces figures relève de diagram-author (ADR 0017 : les schémas
structurels sont codés, jamais générés). **Non corrigé ici : retirer la donnée
rendrait les questions impossibles.**

### 11.57 Douze chapitres qu'aucun `retenir.json` ne pouvait atteindre — un piège qui n'aurait parlé qu'après coup

Trouvé en triant `nombres-complexes-1`. `retenir.ts` cherchait la carte
authorée ainsi :

```js
const authoree = entete?.rung && sidecar ? sidecar.find((e) => e.rung === entete.rung) : null;
```

`chapters.ts` laisse `rung` **indéfini** pour tout titre `##` sans préfixe
`R<n>`. Pour ces chapitres-là, la condition tombait donc toujours sur `null` :
**aucune entrée de sidecar ne pouvait les désigner**, quoi qu'on écrive.

**Douze chapitres, sur les six notions à titres mixtes :**
`probabilites-conditionnelles` 5, `structures-algebriques` 2,
`nombres-complexes-1` 2, `suites-numeriques` 1, `limites-continuite` 1,
`derivabilite-etude-fonctions` 1.

**Ce qui rend le piège méchant, c'est son silence.** Le défaut ne se voit pas
aujourd'hui : une seule notion du corpus porte un `retenir.json`
(`pc/rlc-serie`), et sa leçon est à barreaux purs. Il se serait déclaré le jour
où quelqu'un aurait authoré un sidecar pour l'une des six — sept chapitres sur
neuf se seraient allumés, deux seraient restés muets **sans rien signaler**, et
la cause (un préfixe de titre) n'a aucun rapport visible avec le symptôme (une
carte vide). C'est exactement le genre de défaut que §11.50 annonçait sans le
nommer : « authoring `retenir.json` fixera 7 chapitres sur 9 et en manquera
silencieusement deux ».

**Corrigé** : une entrée de sidecar peut désormais viser `rung` (« R3 »)
**ou** `chapitre` (le numéro RENDU, 1-indexé). Rétro-compatible — les entrées
existantes ne bougent pas, et `pc/rlc-serie` rend toujours ses 6 cartes
authorées. Une entrée qui ne désigne **rien** (ni `rung` ni `chapitre`) est
rejetée par `parseRetenir` : sans ce garde-fou elle se serait appliquée au
premier chapitre venu.

**Vérifié sur le module réel** : un sidecar visant `R3` atterrit au chapitre 4
de `nombres-complexes-1` (R3 est le 4ᵉ titre) ; un sidecar visant
`chapitre: 6` atteint « Résoudre une équation du second degré », le chapitre
sans préfixe qui était inatteignable ; une entrée sans cible rend `null`.
`tsc --noEmit` : 0 erreur.

**Rappel de la dépendance** : rien de tout cela ne remplace la décision de
§11.50 — 265 chapitres se taisent, 193 affichent un repli aveugle, et le vrai
correctif reste un `\boxed{}` par chapitre ou un sidecar authoré. Cette
correction-ci ne fait qu'une chose : rendre la seconde option **possible**
partout.

### 11.58 Un modèle fantôme dans le modèle apprenant — `hors_cadre_probe`, et la porte qui manquait

Contrôle d'intégrité référentielle jamais fait : **toute valeur de
`misconception:` désigne-t-elle une misconception DÉCLARÉE dans le même
fichier ?** Mesuré sur les 62 notions — 767 misconceptions déclarées, 5 614
références (distracteurs + `primary_misconception`) :

- **zéro déclarée jamais référencée** ;
- **une seule référence pendante**, sur trois emplacements.

`pc/systemes-oscillants` employait `hors_cadre_probe` comme valeur de
`misconception:` sur trois distracteurs (`SO-26`, `SO-27`,
`cp-r6-regimes`). C'est pourtant une **étiquette d'auteur** parfaitement
légitime — elle vit aussi dans `tags: [...]`, où elle veut dire « cet item
sonde du hors-cadre ».

**Pourquoi ce n'est pas cosmétique.** `build-learner-inputs.mjs:94` prend la
valeur telle quelle — `targets.add(tag)` — sans jamais la confronter à la liste
des `misconceptions:` déclarées (la ligne 164 ne fait qu'*amorcer* les déclarées
à 0 ; elle n'écarte pas les autres). Le fantôme était donc **compilé dans les
trois artefacts d'exécution** :
`backend/supabase/functions/record-notion-event/item-misconceptions.json`, son
porteur `.ts`, et `web/src/lib/learner-model-data.json`. Vérifié avant
correction :

```
pc/systemes-oscillants / SO-26        : ['M-OSC-AMO-2', 'hors_cadre_probe']
pc/systemes-oscillants / SO-27        : ['M-OSC-AMO-1', 'M-OSC-AMO-3', 'hors_cadre_probe']
pc/systemes-oscillants / cp-r6-regimes: ['M-OSC-AMO-2', 'hors_cadre_probe']
```

Un élève cochant l'un de ces distracteurs se voyait donc attribuer un état
diagnostique **qui n'existe dans aucune grille**. Les trois items portaient déjà
des cibles déclarées : retirer le fantôme ne laisse aucun distracteur orphelin.

**Corrigé** : les trois `misconception: hors_cadre_probe` retirés (l'étiquette
d'auteur reste dans `tags:`), artefacts régénérés — 0 occurrence dans les trois.

**PORTE (échec, pas avertissement)** : toute valeur de `misconception:`, sur un
item comme sur un checkpoint, doit être déclarée dans le `items.yaml` de la
notion. C'est un **échec** parce que la faute ne s'arrête pas au fichier : elle
sort dans un artefact d'exécution. Le contrôle est volontairement **par
fichier** — vérifié d'abord que les ids d'apparence inter-notions de philo
(`mc.philo.liberte.*` cité dans `l-etat`) sont bel et bien déclarés dans leur
propre fichier, donc aucun faux positif.

**Vérifiée dans les deux sens** (ADR 0031) : un tag non déclaré réinjecté fait
échouer la notion en nommant l'item, le choix et la valeur ; le revert la remet
au vert. 0 failure sur les 62 notions.

---

### 11.59 Un `savoir_faire` du cadre qui n'est enseigné nulle part — et la définition mal formée qu'il a fait sortir

Deux constats de la revue `structures-algebriques` (§11.45) méritent leur propre
entrée : le premier est **le trou de contenu le plus lourd sorti de la campagne
vague 1**, le second montre ce qu'une revue de fidélité attrape et qu'aucune
porte mécanique ne verra jamais.

**1. « Étudier un homomorphisme » est au programme et n'est enseigné nulle part.**

`docs/cadre/curriculum/maths-sm.yaml:247` met « homomorphisme de groupes » au
programme ; `:252` en fait un `savoir_faire` explicite — « Étudier un
homomorphisme (noyau, image, propriétés) ». Mesuré dans la leçon :

| mot | occurrences dans `lesson.md` |
|---|:---:|
| `homomorphisme` | **0** |
| `noyau` | **0** |
| `surjectif` / `injectif` | **0** |
| `isomorphisme` | 9 lignes, au dernier chapitre |

Mesuré dans le relevé de la notion (10 exercices d'examen vérifiés) :
`homomorphisme` est dans l'énoncé de **huit** ; `isomorphisme` dans **un**
(2019). Et la déduction qui revient n'est pas la bijection mais l'**image** :
« $\varphi(A) = B$ ⇒ en déduire que $(B, \ast)$ est un groupe commutatif », sept
fois. Le théorème correspondant — *un morphisme surjectif sur l'ensemble visé
transporte la structure* — n'est énoncé dans aucun des cinq fichiers de la
notion. `bank.yaml:248` a dû l'inventer en ligne pour pouvoir corriger ses
propres entrées, et le dit.

Conséquence directe, mesurable : les trois chapitres qui portent les gestes les
plus examinés — sous-groupe (**8/10** au relevé), anneau intègre, isomorphisme —
**n'ont aucun item**. `items.yaml` (26 items) ne contient pas une seule
occurrence de `morphisme`, `isomorphisme`, `intègre` ou `diviseur de zéro`. Les
trois items étiquetés `rung: R7` sont des redites de R2/R3. La cause mécanique
est connue et déjà consignée (§11.57) : **deux des dix chapitres n'ont pas de
code de barreau**, et sans code, aucun item ni checkpoint ne peut s'y rattacher.
Combler le trou de contenu suppose donc *d'abord* de leur donner un barreau.

→ **content-author + pedagogy-architect.** Écrire un chapitre n'est pas une
correction objective et n'a pas été fait en autonomie.

**2. La définition encadrée du corps était mal formée — et l'hypothèse
manquante était enseignée au chapitre précédent.**

`lesson.md:484` définissait : *un anneau est un corps si × est commutative et si
tout élément non nul possède un symétrique pour ×*. Il n'y est jamais exigé que
× ait un neutre. Or la notion elle-même définit « symétrique » **par rapport à un
neutre** (`:127`, « Soit $e$ le neutre de ★ »), et affirme explicitement deux
chapitres plus haut que l'anneau n'en donne pas à × (`:364`, « Rien n'exige, à ce
stade, que × ait un neutre »). La phrase suivante écrivait alors `1` sans l'avoir
introduit. La définition ne se refermait pas.

Ce qui rend le cas instructif : **le mot manquant était déjà enseigné**.
« Unitaire » est défini au chapitre 8 (`:421`), qui *précède* le chapitre du
corps. Ce n'était pas un trou de programme — juste une hypothèse non reprise.
Elle s'était propagée à quatre autres endroits, dont **une légende de figure** et
la solution d'un item.

**Ce que ça dit des portes.** Aucun instrument du dépôt ne pouvait voir ça :
la notion passe `validate-content --strict`, tous ses nombres sont justes, toutes
ses citations de chapitre pointent juste, son `coverage_summary` est exact au
tag près. Une définition circulaire ou incomplète est une propriété du *sens*,
pas de la forme. C'est exactement ce que les critiques vague 1 achètent, et la
raison pour laquelle la campagne passe notion par notion au lieu de greper le
corpus.

**Le même mécanisme, appliqué aux affirmations sur l'examen.** Trois phrases de
la leçon annonçaient une fréquence que **le relevé de la notion elle-même**
dément : « l'isomorphisme revient presque chaque année » (1 sujet sur 10),
« presque toujours par la quantité conjuguée » (1/10 — et le sujet que la notion
enseigne s'en passe), « souvent, la question qui précède te tend le couple tout
fait » (2/10). Aucune n'est invérifiable : la source est dans le dépôt, à côté du
fichier. C'est la même classe que les quatre de `nombres-complexes-1` (§11.45).
**Une affirmation sur ce que demande l'examen se vérifie contre le relevé, pas
contre le souvenir** — et quand elle est vraie, on le dit aussi : « le
sous-groupe revient presque chaque année » est **confirmé, 8/10**, et n'a pas été
touché.

---

### 11.60 Le second sens de la porte rung↔titre — 8 chapitres d'enseignement que le modèle apprenant ne peut pas voir

La porte d'intégrité des barreaux (`validate-content.mjs`, ajoutée le 2026-09-11)
attrape **un item qui vise un rung absent** : `rung: R7` alors que `lesson.md`
n'a pas de titre `R7`. Elle nomme aujourd'hui trois notions
(`limites-continuite` R7, `derivabilite-etude-fonctions` R6,
`probabilites-conditionnelles` R6/R7).

Mesuré le 2026-09-12 : **elle ne voyait qu'un sens.** Quand c'est le TITRE qui
n'a pas de code — et non l'item qui vise à côté —, rien ne signale. Or
l'accrochage d'un item à un chapitre se fait *par le code de barreau* : un
chapitre sans code ne peut recevoir **aucun** item ni checkpoint. Son contenu est
structurellement hors du modèle apprenant, et **invisible au
`coverage_summary`** — sans qu'aucun compteur ne baisse, puisque le dénominateur
ne compte que ce qui porte un rung. Le tableau reste vert sur un trou.

Balayage des 62 notions :

| Notion | Chapitre sans barreau | lignes | % du corps |
|---|---|---:|---:|
| `maths/derivabilite-etude-fonctions` | Fonction réciproque : la même courbe, lue dans l'autre sens | 172 | **30,7 %** |
| `maths/nombres-complexes-1` | Résoudre une équation du second degré dans ℂ | 130 | 22,1 % |
| `maths/nombres-complexes-1` | Somme et produit des racines (Viète) | 74 | 12,6 % |
| `maths/probabilites-conditionnelles` | Variable aléatoire | 89 | 14,4 % |
| `maths/probabilites-conditionnelles` | La loi binomiale | 92 | 14,8 % |
| `maths/structures-algebriques` | Sous-groupe : un groupe caché dans un autre | 97 | 17,6 % |
| `maths/structures-algebriques` | Anneau intègre | 79 | 14,4 % |
| `maths/suites-numeriques` | Suites homographiques | 143 | 20,9 % |

**876 lignes d'enseignement, dans 5 notions, qu'aucun item ne peut atteindre** —
jusqu'à 34,7 % du corps d'une leçon (`nombres-complexes-1`, les deux chapitres
cumulés) et 32,0 % pour `structures-algebriques`. Les titres purement
structurels (« Décortiquer », « La rampe », « Pour t'entraîner ») sont exclus du
compte : ils n'enseignent rien qui doive être testé.

**Ce n'est pas une curiosité de comptage.** Pour `structures-algebriques`, les
deux chapitres concernés portent *sous-groupe* et *anneau intègre* — et le relevé
d'annales de la notion donne une question de sous-groupe dans **8 sujets vérifiés
sur 10** (§11.59). Le geste le plus examiné du chapitre n'a aucun item, et la
cause est mécanique avant d'être pédagogique. Même forme pour
`derivabilite-etude-fonctions`, dont le savoir-faire « fonction réciproque »
était déjà porté au déféré (§11.45) sans qu'on en connaisse la cause.

**Le lien entre les deux sens.** Ce sont deux vues d'une seule cassure. Quand un
chapitre perd son code *alors que des items le visent encore*, les DEUX portes
s'allument (vérifié par injection : retirer « R3 — » au titre du PGCD dans
`arithmetique` fait parler l'ancienne porte sur `items.yaml` et `checkpoints.yaml`
*et* la nouvelle sur le chapitre). Quand le chapitre n'a jamais eu d'items — les
huit cas réels ci-dessus — **seule la nouvelle parle**. C'est exactement l'angle
mort. ADR 0031 : « une porte a deux sens. »

**Avertissement, pas échec**, et délibérément : donner un barreau à un chapitre
renumérote tous les suivants (le rail affiche « chapitre N », et `chapitre N =
R(N−1)` ne vaut déjà que pour 56 des 62 leçons — les 6 exceptions sont
*exactement* ces notions-ci) et déplace le `coverage_summary`. C'est une décision
de rampe pour `pedagogy-architect`, pas une correction mécanique.

**Vérifiée dans les deux sens** (ADR 0031) : l'injection rouge ci-dessus fait
parler la porte sur un chapitre qu'elle ignorait ; rendre son code au chapitre
« Sous-groupe » de `structures-algebriques` fait disparaître l'avertissement, et
le revert le ramène. 0 failure sur les 62 notions — le corpus reste vert, la
mesure est désormais visible à chaque exécution.

---

### 11.61 « Voir la SCOPE NOTE en tête de fichier » — 25 renvois d'auteur servis à l'élève, dans 13 notions

Trouvé en triant `equations-differentielles` : les DEUX critiques vague-1 ont
classé le même défaut en tête, chacune de son côté. Le `reasoning` de
`bk-2022-n-x4` disait à l'élève que le chapitre 5 n'enseigne pas ce qu'il venait
d'y lire — puis l'envoyait « **voir la SCOPE NOTE en tête de fichier** ».

Une SCOPE NOTE est un commentaire YAML. **L'élève ne peut pas la lire.** Le
renvoi est mort pour son unique destinataire — ADR 0031, « un renvoi est une
instruction » — et il est servi dans un champ qui se rend : vérifié dans le
code, pas supposé (`AttemptFirstExercise.tsx:167`, `EpreuveShell.tsx:196`).

**Balayage du corpus : 25 renvois, 13 notions.**

| champ rendu | occurrences |
|---|---:|
| `reasoning` | 18 |
| `intro` | 3 |
| `note` (sous une étape de calcul) | 2 |
| `stem` | 1 |
| `part` (libellé de question) | 1 |

Réparties sur `maths/calcul-integral` (5), `maths/fonction-exponentielle` (3),
`maths/suites-numeriques` (2), `pc/chute-mouvements-plans` (2),
`pc/etat-equilibre` (2), `pc/ondes-mecaniques-periodiques` (2),
`pc/propagation-onde-lumineuse` (2), `pc/transformations-lentes-rapides` (2),
et une chacune dans `pc/decroissance-radioactive`, `pc/electrolyse`,
`pc/esterification-hydrolyse`, `pc/lois-de-newton`, `pc/rc-charge`.

**Tous retirés — la phrase porteuse est conservée, seul le pointeur tombe.** La
plupart sont des incises (« … *(voir la SCOPE NOTE en tête de fichier)* … ») :
l'affirmation qui les précède (« ce théorème n'appartient pas au socle de cette
leçon ») est légitime et utile, c'est le renvoi qui ne l'est pas.

**Deux pièges, tous deux tombés dans avant d'être vus.**

1. **La première sonde a compté 92 fuites au lieu de 25.** Elle ramassait
   `sourcing.note` avec le reste. Or `sourcing` est **author-facing par
   contrat** : c'est exactement LÀ que ces notes doivent vivre. Une porte qui
   les y interdirait pousserait à les supprimer — c'est-à-dire à perdre la
   traçabilité pour faire taire un instrument. Le sous-arbre `sourcing` est donc
   hors champ, explicitement, et la porte le vérifie (voir ci-dessous).
2. **Un retrait automatique a blessé une phrase.** La forme « Voir la SCOPE NOTE
   en tête de fichier, déjà posée sur bk-2023-r-x2 q1 … » a laissé
   « …de la dispersion., déjà posée sur… ». Trouvé par un contrôle de
   ponctuation passé sur *tous* les diffs, pas seulement sur ceux qu'on
   soupçonne. En le réparant : la même incise disait à l'élève que la question
   est « **notée pour l'orchestrateur / pedagogy-architect** » — une fuite pire
   que le renvoi, dans la même phrase. Retirée aussi.

**La porte (ÉCHEC, pas avertissement).** Tout champ rendu — `intro`, `stem`,
`reasoning`, `note`, `text`, `feedback`, `solution`, `correct_feedback`,
`title`, `part`, `math`, `caption` — qui contient « SCOPE NOTE / NOTE
ÉDITORIALE … en tête de fichier » fait échouer la notion, en nommant le fichier
et le champ. Échec et non avertissement : contrairement au choix d'un barreau
(§11.60), il n'y a rien à arbitrer — un pointeur que le lecteur ne peut pas
suivre n'a aucune lecture correcte.

**Vérifiée dans les TROIS sens** (ADR 0031) : (a) rouge — un renvoi réinjecté
dans un `reasoning` fait échouer la notion en nommant le champ ; (b) vert — son
retrait la remet au vert ; (c) **exemption** — le même texte injecté sous
`sourcing.note` ne déclenche rien, donc la porte ne pousse personne à effacer sa
traçabilité. 0 failure sur les 62 notions.

**Deuxième passe, même classe, autre vocabulaire (2026-09-12).** Le renvoi
réparé en `pc/propagation-onde-lumineuse` disait aussi à l'élève que la question
est « notée pour l'orchestrateur / pedagogy-architect ». Balayage élargi aux
noms d'agents, aux chemins de dépôt et au vocabulaire de fabrication — **13
fuites de plus**, toutes corrigées :

- **6 chemins de dépôt rendus** (`content/maths/calcul-integral/bank.yaml`,
  `entrée bk-2024-r-x2`…) dans `maths/fonction-exponentielle` et
  `maths/suites-numeriques`. L'élève ne peut ni les ouvrir ni les chercher ;
  remplacés par le nom de la LEÇON et du sujet, que l'interface lui montre.
- **4 « laisse l'owner juge » / « arbitrage à l'owner »** (`pc/decroissance-radioactive`,
  `pc/esterification-hydrolyse` ×2, `pc/rotation-axe-fixe`) — une décision de
  routage interne, dans un `reasoning`. La phrase qui concerne l'élève
  (« la démonstration est refaite ici en entier ») est conservée.
- **3 drapeaux d'auteur** sous une étape de calcul (`pc/ondes-em-modulation` :
  « drapeau maintenu dans la source », « drapeau d'échelle à confirmer »).

**La porte couvre les deux premiers, PAS le troisième — et c'est délibéré.** Un
chemin de dépôt et le mot « owner » n'ont aucune lecture correcte dans un champ
rendu : ils sont en échec. « Drapeau », lui, a des emplois légitimes en
français ; une porte dessus crierait au loup. Les trois occurrences sont
corrigées, **la classe reste non gardée, et c'est écrit dans le code** — plutôt
qu'un motif approximatif qui ferait du bruit jusqu'à ce qu'on l'ignore.

**Confirmation indépendante de l'exemption.** La critique fidélité de
`denombrement`, qui ne savait rien de ce travail, a vérifié le même point dans
le code et conclu : « `sourcing` blocks never reach the student » —
`web/src/lib/content.ts:239-241, 262-263, 619-620`, délibérément non chargé.
C'est exactement l'hypothèse sur laquelle repose l'exemption de la porte, et
elle a été mesurée deux fois, séparément.

**Ce que ça rappelle.** Trois campagnes de fuite du même genre ont déjà eu lieu
— les codes de barreau dans la prose (§11.18), les slugs de fichier (§11.25), le
jargon de rédaction (§11.26). Celle-ci est la quatrième, et la seule où le texte
fuité était un **renvoi** plutôt qu'un mot : c'est ce qui l'a rendue invisible
aux portes existantes, qui cherchent un vocabulaire, pas une adresse.

---

### 11.62 La réponse au-dessus de la porte d'essai, troisième forme — et la porte qu'il a fallu resserrer trois fois

L'`intro` d'un exercice **se rend hors de la porte d'essai** : dans
`AttemptFirstExercise`, seuls `reasoning` et `steps` sont gardés. Quand elle
affirme la valeur que le premier pas gardé calcule, l'élève a la réponse avant
d'avoir essayé, et l'exercice ne mesure plus rien.

Deux formes de cette classe étaient déjà closes : les **libellés `part`**
(§11.56, campagne close sur les 240 du corpus) et les fuites de prose trouvées
**à la lecture**, notion par notion, par les critiques. Celle-ci est la première
qui se mesure **mécaniquement** : on compare le premier pas gardé au texte de
l'intro.

**Résultat : 4 fuites, toutes dans `denombrement/bank.yaml`** — `card(Ω)` annoncé
à 120, 120, 21 et 84, chaque fois le `steps[0]` de la q1 de la carte. Ce sont
**exactement** les quatre que la critique pédagogie avait trouvées à la lecture
le même jour. Aucune autre dans le corpus. Corrigées : la quantité est nommée,
plus calculée.

**Ce qui vaut d'être consigné, c'est le chemin — j'ai failli livrer deux
instruments faux.**

1. **Une première sonde a annoncé « 0 sur tout le corpus ».** Elle était écrite
   en Python avec `pathlib.glob("*/*/{exercises,bank}.yaml")` — or `pathlib` ne
   fait **pas** l'expansion des accolades. Le motif ne correspondait à **aucun
   fichier**. Le « 0 » ne voulait rien dire, et j'étais sur le point de
   l'annoncer comme un résultat négatif propre. Ce qui l'a démasqué : la
   discipline de **toujours prouver qu'une sonde peut mordre** avant de croire
   son silence — rejouée sur la version de `denombrement` d'avant le correctif
   du jour, elle a bien nommé les deux fuites connues, donc le « 0 » du corpus
   devenait suspect.
2. **La première porte livrait 60 % de faux positifs.** Elle comparait
   seulement le RÉSULTAT du pas au texte de l'intro : 10 signalements, dont
   **six faux** — « 1 » était le second membre d'une équation donnée
   (`47x - 43y = 1`), « 4 » un **numéro de question**, « 10 » un exposant de
   notation scientifique (`1,0×10⁻¹`), « 0 » l'instant initial. Une porte à ce
   taux ne sert à rien : elle se fait ignorer, puis désarmer.

**La règle retenue exige que l'intro affirme L'ÉGALITÉ**, pas qu'elle contienne
un nombre :

- le pas porte **au moins deux `=`** — c'est un calcul, pas une donnée ;
- son **membre gauche** fait au moins 3 caractères (« A », « x » ne discriminent
  rien) et se retrouve dans l'intro ;
- le **résultat suit ce membre gauche de moins de 50 caractères**, à
  **n'importe laquelle** de ses occurrences — les intros nomment souvent la
  quantité une première fois sans la calculer, et ne la chiffrent qu'ensuite.
  (Le premier essai ne regardait que la première occurrence, et manquait `r-bac`
  pour cette seule raison.)

**Vérifiée dans les trois sens** (ADR 0031) : (a) **rouge** — une des quatre
fuites réinjectée fait échouer la notion en nommant l'entrée, la quantité et la
valeur ; (b) **vert** — son retrait la remet au vert ; (c) **non-régression** —
les six notions qui produisaient un faux positif (`arithmetique`,
`limites-continuite`, `nombres-complexes-1`, `decroissance-radioactive`,
`piles`, `systemes-oscillants`) sont **toutes à zéro signalement**. 0 failure
sur les 62.

**La leçon, et elle vaut au-delà de cette porte.** Un instrument qui se tait
n'est un bon résultat que si on a montré qu'il sait parler ; et un instrument
qui parle trop est aussi inutile qu'un instrument muet — la différence, c'est
qu'on s'en aperçoit plus tard.

---

### 11.63 « La rampe redescend » — un critère que 48 notions sur 62 déclenchent, et les 9 cas qui comptent vraiment

Les critiques pédagogie signalent, notion après notion, que la rampe
« redescend » : un barreau moins difficile que le précédent. Le constat est
juste à chaque fois. Avant d'ouvrir une campagne dessus, mesuré sur les 62
notions — **moyenne du `difficulty_level` par barreau, dans l'ordre des
barreaux**.

| | |
|---|---:|
| notions avec ≥ 3 barreaux étiquetés | 62 |
| notions dont la rampe **redescend au moins une fois** | **48** |
| redescentes au total | 74 |
| dont **≤ 0,34** (un seul item d'écart d'un niveau, sur un barreau de 3) | **43** |
| dont 0,35 – 0,99 | 22 |
| dont **≥ 1,0 niveau plein** | **9** |
| **falaises** (saut ≥ 2 niveaux d'un barreau au suivant) | **2** |

**Un critère que 77 % du corpus déclenche ne trie rien.** La plupart des
barreaux portent exactement 3 items ; une moyenne y bouge de 0,33 dès qu'un
item change d'un niveau. Quarante-trois des soixante-quatorze redescentes sont
littéralement cela — du bruit d'échantillonnage, pas une décision de conception.
Les traiter comme des défauts reviendrait à ouvrir 48 chantiers dont les
trois quarts ne mesurent rien.

**Ce qui est rare, donc informatif.**

*Les deux seules falaises du corpus* : `maths/denombrement` R6→R7 (2 → 4) et
`philo/l-histoire` R1→R2 (2 → 4).

*Les neuf redescentes d'au moins un niveau plein* — et **six d'entre elles sont
en SVT, toutes à la même charnière R3→R4** : `theorie-tectonique-plaques`
(4 → 2,5), `dysfonctionnements-immunitaires` (3,33 → 2),
`transmission-caracteres` (4 → 3), `granitisation-deformation` (4 → 3),
`genetique-populations` (4 → 3), `chaines-de-montagnes` (4 → 3). Les trois
autres : `philo/la-violence` R5→R6, `philo/l-histoire` R4→R5,
`maths/denombrement` R5→R6.

**Sur la charnière SVT, une réserve explicite.** J'ai regardé les six chapitres
R4 : ce sont des sujets substantiellement différents (vaccination, dihybridisme,
cristallisation, méthode de calcul de Hardy-Weinberg, plis et chevauchements).
Il n'y a donc **pas** de cause structurelle évidente du type « R4 est par
construction un barreau plus léger ». Ce qu'on peut dire sans sur-interpréter :
la position est partagée par six notions d'une même matière, et plusieurs de ces
moyennes reposent sur **1 à 3 items** — un échantillon où la moyenne est
fragile. Cela vaut **un regard de `pedagogy-architect` sur la charnière**, pas
six constats séparés traités chacun comme un défaut de notion.

**Et le seul cas où les deux signaux se superposent : `denombrement`.** Il est
la seule notion du corpus à enchaîner une redescente franche (R5→R6, 3 → 2) et
**une falaise juste après** (R6→R7, 2 → 4) — c'est-à-dire le point le plus bas
de la rampe immédiatement avant son plus grand saut. C'est exactement ce que sa
critique pédagogie décrivait à la lecture ; la mesure corpus montre en plus que
**le cas est unique**. Consigné dans sa revue, déféré à `pedagogy-architect`.

**Pourquoi aucune porte.** Le `difficulty_level` est un jugement d'auteur, pas
une grandeur mesurée ; sa moyenne sur 3 items n'a pas la précision qu'une porte
supposerait, et une rampe qui redescend peut être un choix délibéré (un barreau
procédural après un barreau conceptuel). Ce qui est écrit ici est une **carte**,
pas un seuil — et c'est la même discipline que §11.54 : quand le champ ne
supporte pas la porte, on mesure et on le dit, plutôt que d'armer un instrument
qui aurait l'air de garder quelque chose.

---

### 11.64 « Ce checkpoint est un clone d'un item du banc » — une convention de maison, pas un défaut ; mesurée, et deux critiques corrigées

Les critiques vague-1 de `geometrie-espace` et de `denombrement` signalent, comme
un défaut de notion, que des checkpoints de leçon reprennent **nombre pour
nombre** un item du banc de fin : « l'item ne diagnostique plus rien chez un
élève qui a vu le clone en leçon ». Le constat de contamination est juste. Le
diagnostic — un défaut de ces deux notions — ne l'est pas.

Mesuré sur les 62 notions :

| | |
|---|---:|
| checkpoints déclarant `item_source: clone_of_<ITEM>` | **132** |
| dont **copies verbatim** (énoncé ≥ 0,92 de similarité) | **48** |
| dont **variations ré-habillées** (même modèle, surface et nombres refaits) | **84** |
| clones verbatim **non déclarés** | **0** |
| labels dont l'item cible **n'existe pas** | **0** |
| labels dont le checkpoint porte **le même modèle primaire** que l'item nommé | **128 / 132** |

**C'est donc une convention de maison, appliquée partout et toujours étiquetée**
— 24 notions, jamais un clone muet. Et la forme majoritaire (84 sur 132) est
précisément celle que les critiques recommandent : même modèle d'erreur, énoncé
entièrement ré-habillé. Deux exemples mesurés aux extrêmes :
`pc/rotation-axe-fixe :: cp-r1-omega-v` porte `clone_of_ROT-5` avec **0,037** de
similarité d'énoncé (manège de l'accroche contre disque, ω différent) et le
**même** modèle ; `maths/fonction-logarithme :: cp-domaine` porte
`clone_of_LOG-1` avec **1,000** — le même énoncé, mot pour mot.

**Les 4 écarts à l'invariant sont défendables**, vérifiés un par un : le
checkpoint dérive de l'item mais vise délibérément un modèle **voisin** sur le
même énoncé (`pc/rc-charge :: cp-r2-asymptote` et `RC-5` posent la même question,
et se distinguent par la mauvaise réponse retenue comme primaire :
`uc-depasse-E` contre `charge-a-debit-constant`). Un même énoncé peut porter
plusieurs modèles ; lequel est « primaire » est un jugement d'auteur.

**Ce qui reste vrai du constat des critiques, et que la convention ne couvre
pas.** Le champ `item_source` **ne distingue pas** la copie verbatim de la
variation. Les 48 copies conformes ont un coût réel — l'item du banc, pour cet
élève-là, mesure un souvenir — et **rien dans les fichiers ne dit où ce coût est
payé**. Le plancher de couverture exclut correctement les checkpoints du
*comptage* (`items.yaml` le déclare), mais personne ne peut lister les items
ainsi neutralisés sans refaire cette mesure.

**Et c'est exactement ce flou qui a laissé passer un label FAUX.**
`geometrie-espace :: cp-r9-intersection` portait `clone_of_GE-30` alors que ses
nombres étaient ceux de **r-bac** — c'est-à-dire les réponses du sommet, servies
avant l'essai (§11.45, corrigé le 2026-09-12). Tant que `clone_of_` recouvre
deux choses, l'étiquette n'est vérifiable par personne.

**Recommandation, pas correction** : distinguer `copie_of_` (verbatim, assumé)
de `variation_of_` (ré-habillé), et faire du second le défaut. C'est une
décision de convention → pedagogy-architect / owner.

**Pourquoi aucune porte.** Les trois invariants mécanisables sont **déjà tenus à
100 %** (aucun clone muet, aucun item cible manquant) ou tenus à 97 % avec des
exceptions légitimes (le modèle partagé). Armer une porte sur un invariant que
rien ne viole, et dont les violations plausibles sont des jugements d'auteur,
ajouterait un instrument qui ne peut que crier à tort. Comme en §11.54 et
§11.63 : on mesure, on écrit le chiffre, et on dit pourquoi on ne garde pas.

---

### 11.65 Les figures orphelines : la porte existait déjà — ce qu'elle ne dit pas, c'est que trois d'entre elles impriment des réponses

Trouvé en triant `geometrie-espace`, dont la critique pédagogie a repéré un SVG
qu'aucun marqueur ne pose et dont les légendes déroulent tout le corrigé du
sommet.

**CORRECTION, ÉCRITE D'ABORD PARCE QUE C'EST MON ERREUR.** J'ai d'abord
présenté ce balayage comme une mesure inédite, et conclu « aucune porte ».
**Les deux sont faux.** La porte existe depuis §11.43
(`validate-content.mjs:1194`, sens inverse de la porte figures), elle est
documentée dans `docs/audits/INSTRUMENTS.md`, et elle signale **exactement ces
fichiers à chaque exécution** : « figure asset media/... n'est placée par aucun
marqueur ». J'aurais eu la liste juste en lisant la sortie du validateur, au
lieu d'écrire une sonde — dont le premier jet comptait d'ailleurs 20 au lieu de
6. **Leçon : lire l'inventaire des instruments avant d'affirmer qu'une chose
n'est pas instrumentée.**

Ce qui reste de neuf, et qui est la partie décision-relevante : **la porte dit
qu'une figure est orpheline, elle ne dit pas laquelle est DANGEREUSE.**

**268 figures SVG ; 6 orphelines** (le chiffre de la porte).

*Une correction de méthode, avant les chiffres.* Un premier passage en annonçait
**20**. Faux : dix d'entre elles sont des `*.motion.svg`, dont le slug de
marqueur est la base **sans** le suffixe `.motion` — mon extraction gardait le
suffixe, donc elles ne pouvaient jamais correspondre. Le compte juste est 6.

**Trois des six impriment des réponses d'exercice** — c'est le fait
décision-relevant :

| Asset | Ce que ses légendes donnent |
|---|---|
| `maths/geometrie-espace :: explication-bk-2019-n-x1` | tout le corrigé de r-bac : $\vec n$, $d=1$, $\Omega$, $R=\sqrt5$, $d=\sqrt3$, la nature de l'intersection — et **au-delà** de ce que le sujet 2019 demande |
| `pc/rc-charge :: exo-oscillogramme` | les légendes portent **les numéros de question** : « … l'asymptote $E = 6$ V **(Q1)** », « $t=\tau=20$ ms **(Q2)** », « $u_C(\tau) \approx 3{,}8$ V **(Q4)** » |
| `pc/dipole-rl :: oscillogramme-exercice` | la lecture graphique faite : « la tangente coupe l'asymptote en $t=\tau=4$ ms ; $i(\tau)\approx 75{,}8$ mA » |

Les trois autres (`maths/nombres-complexes-2 :: rotation-complexe`,
`pc/aspects-energetiques :: plan-incline-travaux`,
`pc/rlc-serie :: loi-mailles-build`) sont des figures d'enseignement ordinaires.

**Aucune fuite aujourd'hui** : sans marqueur, rien ne s'affiche. Le danger est
qu'il suffit d'**une ligne** — un `[[figure:...]]` posé dans le corps de la
leçon — pour imprimer un corrigé au-dessus de la porte d'essai. Et deux de ces
trois assets sont plus tentants que la moyenne à poser, puisqu'ils illustrent
précisément l'exercice que l'élève est en train de chercher.

**À trancher (owner / diagram-author)** : supprimer les trois, ou les marquer
explicitement comme matériel d'**après-essai** — auquel cas il faut un endroit
où « après l'essai » veuille dire quelque chose, ce que le format actuel des
sidecars ne prévoit pas.

**Pourquoi la porte ne va pas plus loin.** Elle fait déjà ce qu'une porte peut
faire : nommer les orphelines. Distinguer « ses légendes donnent une réponse »
de « ses légendes enseignent » est une lecture, pas un motif — c'est pourquoi le
classement ci-dessus est écrit ici, asset par asset, plutôt que tenté en code.
Même arbitrage qu'en §11.54, §11.63 et §11.64.

---

### 11.66 Trois choses que `chute-mouvements-plans` a révélées ailleurs : sept codes de barreau dans des légendes rendues, un renvoi vers une note jamais écrite, et 29 banques sur 31 hors chronologie

La revue vague-1 de la notion la plus lourde du corpus (`pc/chute-mouvements-plans` :
211 items, 19 entrées de banque, `part_examen: 27`) a produit onze classes de
correctifs dans la notion — consignés dans son `REVIEW-2026-09-12.md` — et
**trois constats qui la débordent**. Ce sont ces trois-là qui méritent d'être
ici, parce que deux étaient des défauts réels ailleurs et que le troisième
est un piège de mesure.

**1. Sept codes de barreau `R<n>` dans des légendes RENDUES — l'angle mort
des campagnes #18 et #24.** Ces deux campagnes ont réécrit 1 086 puis 529
renvois « R\<n\> » vers un référent visible (le numéro de chapitre) : la
première dans la prose de `lesson.md`, la seconde dans les sidecars de
figures. Aucune des deux n'a regardé les **descripteurs d'embed**
(`media/*.json`). Il y restait sept « R2 », « R7 », « R1 », « R3 », « R6 »
dans le champ `caption_fr` — le **seul** champ de ces fichiers que le rendu
charge (`content.ts:928,951`) — sur deux notions, `pc/chute-mouvements-plans`
et `pc/systemes-oscillants`. L'élève ne voit « R2 » nulle part sur la page.

La leçon est la même qu'en §11.46 et §11.24 : **une campagne de nettoyage de
texte rendu doit énumérer les FAMILLES DE FICHIERS rendues, pas les fichiers
qu'on a en tête.** La liste complète est celle du contrat de `content.ts`,
pas celle de l'intuition. Corrigés vers le numéro de chapitre, après
re-mesure de la carte position→barreau sur chacune des deux leçons
(barreaux purs toutes les deux : chapitre = R+1). Sonde après correction : 0.

Ce qui n'est **pas** un défaut, et qu'il a fallu vérifier avant de toucher :
les autres champs de ces descripteurs — `param_manipulation_guide`,
`pedagogy_wiring`, `fit_caveat`, `poc_status`, `fallback_note`, `spec_ref` —
sont **auteur par contrat**, exactement comme `sourcing` (§11.61). Ils
débordent de codes de barreau et de renvois internes ; c'est légitime. Une
première lecture de cette revue avait noté « la légende du bac à sable donne
le résultat » en visant `param_manipulation_guide` : faux, ce champ n'est pas
rendu. Le défaut existait bel et bien, mais dans `caption_fr` — même
formulation, autre champ. **Lire le contrat de chargement avant de qualifier
une fuite** ; c'est le pendant de la leçon de §11.65 (« lire l'inventaire des
instruments avant de déclarer quelque chose non instrumenté »).

**2. Un renvoi vers une note qui n'a jamais été écrite.**
`pc/reactions-acido-basiques/bank.yaml:1380` disait à l'élève « voir la NOTE
DE PORTÉE en tête de cette entrée ». Deux défauts en un : c'est un
commentaire YAML que le rendu ne charge pas — **et** `grep` ne trouve « NOTE
DE PORTÉE » nulle part ailleurs dans le fichier. Le renvoi pointait le vide.
C'est la forme la plus pure de ce que l'ADR 0031 appelle « un renvoi est une
instruction » : il donnait un ordre impossible à exécuter, dans les deux sens.

La porte §11.61 ne le voyait pas : elle ne connaissait que « en tête **du
fichier** ». Élargie au **label** de la note (SCOPE NOTE, NOTE ÉDITORIALE,
NOTE DE PORTÉE, SOURCING GAP), la cible du renvoi étant indifférente.

**Le piège, et c'est le vrai contenu de ce point : `en-tête` seul ne peut pas
être le motif.** `maths/arithmetique/bank.yaml` dit « l'en-tête **imprimé sur
la copie** » — la feuille d'examen que l'élève a physiquement sous les yeux.
Prose parfaitement légitime. Une porte qui aurait simplement ajouté
`en-t[êe]te` au motif aurait mis au rouge une phrase juste, et la correction
« évidente » aurait dégradé le contenu. **Une porte de texte rendu se règle
sur la marque d'autorat, pas sur le mot.** Vérifiée rouge sur les quatre
formes d'auteur ET verte sur les deux formes légitimes, témoin vert, fichier
restauré propre — le protocole de l'ADR 0031, six cas.

**3. 29 banques sur 31 ne sont pas chronologiques — et c'est une convention,
pas un défaut.** `content.ts` **ne trie pas** `bank.yaml` au chargement :
l'ordre du fichier est l'ordre que voit l'élève. Sur `chute-mouvements-plans`
cela donne 2018→2025 puis un retour brutal à 2012, 2010, 2010, 2015, 2011,
2012 R. Le réflexe est de réordonner.

La mesure d'abord : **29 banques sur 31 mesurables** présentent au moins une
rupture. Ce n'est donc pas un accident local mais **la trace de la méthode de
construction** — une première vague sur les années récentes, puis la campagne
de rattrapage (§11.7 à §11.13) ajoutée en fin de fichier. Et l'ordre actuel
se défend : les sessions récentes d'abord, c'est ce qui ressemble le plus à
l'examen que l'élève passera. Réordonner 31 fichiers est **un choix
éditorial**, pas un correctif objectif : mesuré, écrit dans l'en-tête de la
banque concernée, **laissé à l'owner, sans porte.** Même arbitrage qu'en
§11.54, §11.63, §11.64 et §11.65.

**Ce qui a été corrigé dans l'en-tête, en revanche, l'est sans arbitrage :**
il annonçait « treize sujets, 2018 N à 2025 R » pour un fichier qui en porte
**dix-neuf, de 2010 à 2025**. Un inventaire faux n'est pas une convention.

---

### 11.67 « Contrairement aux autres sujets de cette banque (bk-2018-n-x1, bk-2019-n-x1…) » — 90 clés de fichier adressées à l'élève, la campagne, et la porte

Constat sorti de §11.66. Le texte rendu d'une carte de banque renvoie
régulièrement à une AUTRE carte — c'est une bonne chose, c'est ce qui fait
d'une banque un corpus plutôt qu'une pile. Mais il la nommait par sa **clé de
fichier** :

> « Cette question ne fournit ni figure ni polarité de générateur :
> contrairement aux autres sujets de cette banque (bk-2018-n-x1,
> bk-2019-n-x1, bk-2022-n-x1, bk-2023-r-x1), où le schéma ou les bornes
> $+$/$-$ sont déjà donnés, ici c'est à toi de le construire. »

Ces clés ne sont imprimées **nulle part** dans le rendu. L'élève lit une
référence qu'il ne peut pas résoudre — et la phrase qui la porte est bonne,
c'est *seulement* le nom qui est faux.

**Mesure : 87 clés d'entrée dans 18 notions**, plus **3 identifiants d'item**
(« voir RC-20 », « voir LIB-5 et LIB-6 ») dans 2 autres. Toutes réécrites vers
le référent visible, selon le style déjà majoritaire dans le corpus (mesuré
avant de choisir : « session normale » 167 fois, « session de rattrapage » 77,
« le sujet AAAA » 26) — donc **« le sujet 2019 »**, qualifié par la session
seulement quand la banque porte les deux sessions de cette année-là.

**Ce que la réécriture mécanique casse, et qu'il faut relire.** La
substitution jeton par jeton produit du français faux dès qu'un article la
précède. Les six réparations nécessaires, trouvées en relisant **les 72 lignes
modifiées une à une** (et non en faisant confiance au script) :

- « qu'en bk-2020-n-x1 » → « qu'en le sujet 2020 » → **« que dans le sujet 2020 »** ;
- « contrairement à bk-A ou bk-B » → le premier se contracte en « au sujet »,
  le second restait « ou le sujet » → **« ou au sujet »** ;
- « bk-2022-n-x4 et bk-2024-n-x5 portent chacune » → le référent devient
  masculin → **« portent chacun »** ;
- deux entrées DISTINCTES de la même session (`bk-2010-n-x4b`, `bk-2010-n-x4c`)
  se réduisaient au même libellé : « (entrées le sujet 2010 et le sujet 2010) »
  → **« (deux entrées du sujet 2010) »** ;
- parenthèses imbriquées « (entrée du sujet 2015 (rattrapage)) » → aplaties ;
- et une faute préexistante révélée au passage, « déjà banquee », jargon **et**
  faute d'accent dans un champ rendu → « déjà en banque ».

C'est la règle générale de ces campagnes : **un remplacement mécanique sur du
texte rendu n'est pas fini quand la sonde retombe à zéro ; il est fini quand
chaque ligne changée a été relue.** Les six défauts ci-dessus auraient tous
passé une sonde « plus aucun `bk-` » avec succès.

**La porte (§11.67, ÉCHEC).** Un identifiant interne dans un champ rendu. Deux
familles : `bk-AAAA-[nr]-…`, et `ABC-12` où **`ABC` est lu dans les `id:` de la
notion elle-même**, jamais deviné — une notion ne peut citer que ses propres
items, et un préfixe inventé ferait crier la porte sur du texte sain.

**Elle a immédiatement trouvé ce que ma propre sonde avait manqué** : trois
renvois `VIO-…` dans `philo/la-violence/exercises.yaml`. Ma sonde ne lisait que
`bank.yaml` pour les clés d'entrée ; la porte lit tous les YAML de la notion.
Rappel utile que **l'instrument doit être plus large que l'enquête qui l'a
motivé.**

**Le faux positif qu'il a fallu éteindre, et qui vaut pour deux portes.** À sa
première exécution la porte a crié sur **dix `coverage_summary > note`** —
parfaitement légitimes, puisque `coverage_summary` n'est pas chargé par le
rendu. La récursion descendait dans un sous-arbre auteur et y trouvait une clé
`note`, qui est rendue *ailleurs*. **Un champ rendu imbriqué dans un sous-arbre
auteur reste auteur.** La liste des sous-arbres hors champ (`sourcing`,
`item_source`, `coverage_summary`, `contradicts_principle`) est désormais
explicite — et le même trou latent a été bouché dans §11.61, où il n'avait
jamais tiré faute d'occurrence.

Vérifiée rouge ET verte, cinq cas (témoin vert, fichier restauré propre) :
`bk-2019-n-x4` ROUGE · `ROT-12` (préfixe réel de la notion) ROUGE ·
`le sujet 2019` VERT · `ZZZ-12` (préfixe étranger) VERT · `le chapitre 4` VERT.

---

### 11.68 Pourquoi la porte §11.62 ne regarde QUE le premier pas de la première question — mesuré, et délibérément non élargi

La porte « réponse au-dessus de la porte d'essai » (§11.62) n'inspecte que
`questions[0].steps[0].math`. Vu de loin c'est un oubli : pourquoi ne pas
balayer tous les pas de toutes les questions ? J'ai écrit l'élargissement et
je l'ai **mesuré avant de l'armer**. Il ne sera pas armé.

**Résultat : 5 signalements nouveaux, 5 faux positifs.** Vérifiés un par un,
pas échantillonnés :

| Entrée | LHS = RHS repéré | Ce que l'intro dit vraiment |
|---|---|---|
| `fonction-exponentielle` r-variation | `f(x)` … `1` | l'intro **définit** $f(x)=\frac{e^{x}-1}{e^{x}+1}$ ; le « 1 » est dans la définition, la limite calculée au pas 2 vaut 1 par coïncidence |
| `derivabilite-etude-fonctions` bk-2018-n-x4 | `g(0)` … `0` | l'intro définit $g(x)=e^{x}-x^{2}+3x-1$ |
| `fonction-logarithme` bk-2024-n-x4 | `f(x)` … `1` | l'intro définit $u(x)=e^x$ et $v(x)=x$ |
| `nombres-complexes-2` bk-2023-r-x2 | `\overline{z}` … `1` | énoncé de partie, aucune valeur affirmée |
| `rotation-axe-fixe` bk-2013-r-x4 | `\theta` … `0` | prose d'introduction sur les horloges |

Le motif commun saute aux yeux : **le membre de droite vaut 0 ou 1 dans les
cinq cas.** C'est exactement la forme de faux positif déjà rencontrée quand la
porte a été resserrée trois fois (§11.62) — un « 1 » qui est le second membre
d'une équation de l'énoncé, un « 0 » qui est l'instant initial. Plus on
élargit la portée, plus on récolte de ces coïncidences, sans récolter de
défauts.

**Et le point qui compte vraiment, parce qu'il corrige une intuition fausse :
élargir la PORTÉE n'élargit pas l'ATTEINTE.** Les six fuites réelles corrigées
à la main dans `chute-mouvements-plans` (§11.45, sa revue) étaient d'une autre
FORME : une lecture graphique affirmée en prose — « la courbe atteint un
palier à $1{,}5\ \text{m.s}^{-1}$ » — alors que la question demande de lire
cette valeur sur le graphique. Il n'y a **aucune égalité `LHS = … = RHS`**
dans le pas gardé à laquelle comparer ; le pas dit « on lit le palier ». Le
mécanisme de la porte — apparier le dernier membre d'une chaîne d'égalités
avec ce que l'intro affirme — ne peut structurellement pas voir cette forme,
à n'importe quelle portée.

Donc : la portée étroite de §11.62 **n'est pas une limite à corriger, c'est ce
qui tient sa précision**. La classe qu'elle ne voit pas (la valeur graphique
affirmée en prose) reste à la charge de la revue humaine — et c'est écrit ici
pour qu'un mainteneur qui aurait la même idée que moi trouve la mesure déjà
faite plutôt que de noyer la CI sous cinq faux positifs.

C'est l'ADR 0031 mot pour mot : « **l'ATTEINTE d'un mécanisme se mesure
séparément de la question de savoir s'il fonctionne.** » §11.62 fonctionne ;
son atteinte est bornée par sa mécanique, pas par sa portée.

---

### 11.69 Seize items que rien ne peut atteindre, un résumé qui compte deux chapitres inexistants, et une étiquette que la porte ne savait pas lire

Trouvé en triant les AVERTISSEMENTS du validateur — ceux que personne ne
relit parce qu'ils ne bloquent rien. Trois notions y signalaient depuis
longtemps des items accrochés à un barreau dont `lesson.md` ne porte aucun
titre. Mesure complète :

| Notion | Orphelins | `coverage_summary` les compte ? |
|---|---|---|
| `maths/derivabilite-etude-fonctions` | R6 : 7 | non |
| `maths/limites-continuite` | R7 : 3, **R-bac : 1** | non |
| `maths/probabilites-conditionnelles` | R6 : 3, R7 : 2 | **OUI — R6 et R7** |

**Seize items et checkpoints structurellement inatteignables.** L'accrochage
au chapitre se fait par le code ; un item qui vise un code sans titre ne peut
être ni présenté au bon endroit, ni attribué, ni compté dans un dénominateur
honnête.

**Ce que j'ai cru, et qui était faux.** Les mêmes notions portent des
avertissements §11.60 — de gros chapitres `##` SANS code (172 lignes / 30,7 %
pour « Fonction réciproque », 89 et 92 lignes pour « Variable aléatoire » et
« La loi binomiale »). La conclusion s'impose d'elle-même : le titre a perdu
son code, les items l'ont gardé, il suffit de le rendre au titre. J'ai même
mesuré la convention pour m'appuyer dessus — **55 leçons sur 57** codent leur
chapitre final, et les deux exceptions sont précisément deux des trois notions
ci-dessus.

Puis j'ai lu les items. **Ils ne parlent pas de ces chapitres.** Les sept
items R6 de `derivabilite` portent sur le signe de $f'$, les asymptotes, et
l'annulation de $f''$ — pas sur la fonction réciproque. Les items R6/R7 de
`probabilites` sont des problèmes de Bayes (test de dépistage, filtre
anti-spam, deux urnes) — pas des variables aléatoires ni la loi binomiale.
**Rendre le code au titre aurait rangé des items de Bayes dans un chapitre sur
les variables aléatoires**, et fait disparaître l'avertissement.

C'est le piège central de ce point, et il vaut pour toute la campagne :
**la porte qui repasse au vert n'est pas la preuve que le contenu est juste.**
J'ai vérifié que le correctif mécanique marche — ajouter `R6 — ` et `R7 — `
aux deux titres de `probabilites` fait tomber les six avertissements de la
notion à zéro — et c'est exactement pour cela qu'il ne faut pas l'appliquer :
il achète le vert en déplaçant le défaut là où plus aucun instrument ne
regarde. **Le vert acheté est pire que le rouge honnête.** Le rattachement de
ces seize items est une décision éditoriale (à quel chapitre appartiennent-ils
vraiment ? faut-il un chapitre de synthèse qui n'existe pas encore ?), donc
elle revient à l'owner. Même arbitrage qu'en §11.54, §11.63, §11.64, §11.65 et
§11.66.

**Deux améliorations d'instrument, elles, sont objectives et faites.**

*1. L'étiquette que la porte ne savait pas lire.* Le contrôle §11.44 comparait
`R(\d+)` d'un côté à `R(\d+)` de l'autre. Il existe dans tout le corpus **une**
étiquette non numérique — `rung: "R-bac"`, sur
`limites-continuite/checkpoints.yaml:378` — et elle passait **sans un mot** :
aucun titre ne lui correspond, et aucun avertissement non plus, parce que le
motif ne savait pas la lire. C'est la forme la plus silencieuse de trou :
**une porte qui ne sait pas lire une valeur ne dit pas « conforme », elle ne
dit rien du tout** — et un lecteur pressé lit son silence comme un succès.
L'étiquette est désormais lue entière des deux côtés ; le checkpoint
`cp-bac-produit-infini` est visible.

*2. Le résumé qui compte un chapitre inexistant.* Nouveau signal, distinct du
premier : le précédent dit « des items visent un chapitre absent », celui-ci
dit que le **document de couverture affirme couvrir ce chapitre**.
`probabilites-conditionnelles` compte R6 et R7 dans `coverage_summary.per_rung`
alors qu'aucun titre ne porte ces codes. La porte `resume-couverture` ne le
voyait pas, et ce n'est pas un défaut de sa part : elle vérifie que les
compteurs **se recomptent depuis les tags**, pas que les barreaux comptés
**existent**. Les deux contrôles sont nécessaires ; aucun ne remplace l'autre.

Les deux restent des AVERTISSEMENTS, délibérément : le remède est éditorial,
et une porte qui vire au rouge sans correctif disponible ne protège rien — elle
apprend seulement à l'équipe à ignorer le rouge. Vérifiée dans les deux sens :
2 signalements → 0 après ajout des deux codes → 2 après restauration.

---

### 11.70 Les renvois de chapitre : « N et N » armé (5 occurrences), et les 63 renvois inter-leçons vérifiés — tous justes

Deux mesures sur la même famille — « le renvoi est une instruction » (ADR 0031)
— avec deux issues opposées. Les deux méritent d'être écrites, parce que le
résultat NÉGATIF est aussi utile que l'autre.

**1. « chapitre N et N » — réel, récurrent, désormais gardé.** Cinq
occurrences, trouvées une à une au fil de la campagne et jamais comme classe :
`chute-mouvements-plans` (« chapitre 2 et 2 », « chapitres 3 et 3 »),
`reactions-acido-basiques` (« chapitre 7 et 7 », « chapitre 3 et 3 »),
`transformations-deux-sens` (« chapitre 1 et 1 »). Toutes sont des séquelles de
la renumérotation barreau→chapitre : deux barreaux distincts retombés sur le
même numéro, ou un numéro recopié. Le lecteur reçoit un renvoi double vers un
seul endroit — **le second renvoi, celui qui portait l'information, a disparu.**

Les trois dernières corrigées en résolvant chaque cible dans le dépôt, jamais
en devinant :
- `reactions-acido-basiques` « chapitre 7 et 7 » → **chapitre 8**, dont le titre
  porte littéralement « constante d'équilibre et taux d'avancement final $\tau$ » :
  les deux notions citées ($x_f$ et $x_{max}$) y vivent toutes deux, donc **un**
  numéro, pas deux.
- `reactions-acido-basiques` « chapitre 3 et 3 » → **chapitres 3 et 4** d'« État
  d'équilibre » : chapitre 3 = « Chiffrer l'avancement … le taux d'avancement »,
  chapitre 4 = « Le quotient de réaction $Q_r$ ». Les deux notions nommées dans
  la parenthèse, dans l'ordre.
- `transformations-deux-sens` « chapitre 1 et 1 » → **chapitre 1** seul (son R0
  EST l'accroche estérification : acide éthanoïque + éthanol, l'odeur qui
  n'évolue plus). Au passage, « la leçon-hôte » — du vocabulaire de fabrication
  dans un `reasoning` rendu — remplacé par le nom de la leçon, qui suivait déjà.

**Porte armée (ÉCHEC)**, sans risque de faux positif : « chapitre A et B » avec
A = B n'a aucune lecture correcte. Elle dit qu'il y a un défaut ; elle ne devine
pas le second numéro — ça demande de lire. Vérifiée rouge sur « chapitres 4 et
4 », verte sur « chapitres 4 et 5 », témoin vert, fichier restauré.

**2. Les renvois inter-leçons : 63 résolus, 0 faux — et pourquoi il n'y a pas de
porte.** Une première sonde a signalé **23 citations d'un chapitre inexistant**
(« chapitre 8 » dans une leçon qui n'en a que 7). Les 23 étaient des **faux
positifs de ma sonde** : ce sont des renvois vers une AUTRE leçon, qui la
nomment — « le signal exact du chapitre 8 de « Calcul intégral » », « déjà
signalé au chapitre 9 de « La vérité » ». Ma sonde les comparait au nombre de
chapitres de la leçon HÔTE.

Refaite correctement — une carte titre→leçon construite depuis les 62 `# ` de
`lesson.md` et les slugs, puis chaque « chapitre N de « X » » résolu contre le
nombre de chapitres de X — le résultat est net : **63 renvois inter-leçons, 0
hors bornes.** Les six libellés d'abord non résolus (titres tronqués ou
descriptifs, « État d'équilibre », « Suivi temporel d'une transformation »…)
résolvent tous par préfixe, et tous dans les bornes.

Pas de porte, pour une raison de coût et non de valeur : `validate-content`
travaille notion par notion, et ce contrôle exige une carte de TOUT le corpus
construite avant la boucle. La classe est mesurée propre aujourd'hui ; la sonde
est décrite ici assez précisément pour être refaite. **Et la leçon de méthode
vaut plus que le résultat : une sonde qui signale 23 défauts dont 23 faux n'est
pas une sonde, c'est une hypothèse mal posée.** Vérifier le contexte des
signalements AVANT d'annoncer un chiffre — ici, lire une seule des 23 citations
suffisait à voir qu'elle nommait sa leçon cible.

**3. Le risque résiduel des grandes campagnes de conversion, mesuré.** La revue
de `systemes-oscillants` a trouvé qu'un correctif mécanique du jour avait
traduit **fidèlement un code PÉRIMÉ** : « l'exercice de R7 » est devenu
« l'exercice du chapitre 8 », or le chapitre 8 ne contient aucun exercice — le
code `R7` datait d'avant une renumérotation, et l'exercice vit au chapitre 9.
La conversion était juste ; c'est sa SOURCE qui était fausse.

Cela pose une question sur les campagnes #18 et #24, qui ont converti **1 086
puis 529** renvois `R<n>` de la même façon. Combien portaient un code périmé ?

La classe détectable mécaniquement est celle-là même : un renvoi qui nomme un
OBJET (« l'exercice du chapitre N », « l'exemple travaillé du chapitre N »,
« la figure du chapitre N ») alors que le chapitre N ne contient pas cet objet.
Sonde passée sur tout le corpus, texte rendu inclus : **un seul signalement, et
c'est un faux positif de la sonde** — `pc/electrolyse` cite « l'exemple
travaillé du chapitre 7 **de la leçon sur les piles** », et `pc/piles`
chapitre 7 contient bien cet exemple travaillé, avec les mêmes $1080\ \text{C}$.

**Zéro défaut réel dans la classe détectable.** Ce qui ne prouve pas que zéro
code périmé a été converti — seulement que les conversions périmées n'ont pas
produit de renvoi vers un objet absent, sauf celle de `systemes-oscillants`,
trouvée par une critique qui LISAIT le contenu. La détection mécanique s'arrête
là ; le reste est du travail de lecture.

**Et la même erreur de sonde, deux fois dans la même session** : ici comme pour
les 23 signalements du point 2, j'ai comparé un renvoi à la leçon HÔTE alors
qu'il nommait sa leçon cible. Deux fois, le signalement s'est effondré dès que
j'ai lu la citation en entier. La règle à retenir pour toute sonde de renvoi :
**résoudre la CIBLE avant de compter**, parce que dans ce corpus un renvoi sur
deux traverse les leçons.

---

### 11.71 `lesson_placement` : 30 étiquettes qui mentaient sur la position de leur propre marqueur — et une convention qu'il a fallu MESURER avant de corriger

Classe soulevée par la critique pédagogie de `systemes-oscillants` (quatre
checkpoints déclaraient `after_R6` / `after_R7` alors que leurs marqueurs sont
au milieu des sections). Généralisée au corpus.

`lesson_placement` est une métadonnée d'**auteur** : `grep` sur `web/src` et
`web/scripts` ne trouve **aucun lecteur**. Rien ne casse pour l'élève. Mais
c'est un document qui décrit un état qui n'est pas — précisément la classe que
toute cette campagne corrige — et le premier instrument qui voudra s'en servir
mesurera faux.

**Ce qui rend ce point intéressant, c'est la façon dont le seuil a été
choisi.** Mon premier jet prenait 75 %, à vue de nez : 24 signalements. C'est
une convention *décrétée*, donc sans autorité. La convention réelle est dans le
corpus, et il suffit de la lire — sur les **322** checkpoints placés :

| étiquette | n | médiane de la position dans le chapitre | cas à ≥ 90 % |
|---|---:|---:|---:|
| `after_RN` | 255 | **99 %** | 226 |
| `in_RN` | 67 | **48 %** | 1 |

Les deux usages sont nets et disjoints : `after` veut dire « à la toute fin du
chapitre », `in` veut dire « au milieu ». Le seuil qui les sépare est **90 %**,
et il n'est pas de moi — il est écrit dans 322 fichiers. Avec lui, **30
étiquettes fausses dans 16 notions** (et non 24), toutes corrigées en
retournant l'étiquette vers ce que le fichier fait réellement.

**Porte §11.71 armée, AVERTISSEMENT.** Pas un échec : rien ne casse, et un
auteur peut légitimement vouloir poser son marqueur ailleurs — la porte lui dit
alors de mettre l'étiquette d'accord avec le fichier, jamais l'inverse. Le
seuil mesuré est écrit dans le commentaire du code, avec sa date et son n, pour
qu'un futur lecteur sache qu'il est constaté et non inventé.

**Et une erreur d'outillage, la troisième de la session, à ne plus refaire :**
pour tester la porte j'ai injecté un défaut dans
`pc/rotation-axe-fixe/checkpoints.yaml` puis fait `git checkout` — ce qui a
**effacé les deux correctifs non encore commités de ce même fichier**. Le
contrôle de fin l'a vu (2 signalements là où le corpus en annonçait 0) et ils
ont été ré-appliqués. **Règle : commiter AVANT d'utiliser `git checkout` comme
bouton d'annulation.** C'est la même erreur qu'au §11.45 (suites-numeriques,
rotation-axe-fixe, etat-equilibre, denombrement) ; elle est désormais écrite
deux fois, ce qui veut dire qu'elle mérite un réflexe et pas une note.

---

### 11.73 Vingt-trois codes de barreau survivants dans la prose RENDUE des YAML — dont un qui avait dévoré une résistance

Les campagnes #18 et #24 ont réécrit **1 086 puis 529** renvois « R\<n\> » vers
le numéro de chapitre. Elles ont balayé la prose de `lesson.md` et les sidecars
de figures. **Elles n'ont jamais regardé la prose rendue des YAML.** Mesure :
**25 codes y survivaient**, dont 11 en philo et 6 en maths — matières où
« R3 » ne peut rien désigner d'autre qu'un barreau.

23 réécrits vers le chapitre. La carte position→barreau est recalculée **pour
chaque notion**, parce que quatre leçons de maths ne sont pas à barreaux purs
et que le chapitre n'y vaut donc pas $n+1$ ; et les renvois **inter-leçons**
(`philo/la-violence` cite « L'État » et « Autrui ») sont résolus contre la
carte de la leçon **cible**, jamais de la leçon hôte — la même erreur que j'ai
commise deux fois en sondant (§11.70).

**La corruption, et c'est le cœur de ce point.** Les deux critiques de
`pc/ondes-em-modulation` l'ont trouvée indépendamment : la substitution globale
de la campagne #18 a pris le **résistor $R_3$** d'un filtre de démodulation pour
le **barreau R3**, et a écrit, dans une `note` rendue à l'élève :

> « Noeud H, après C3 et **le chapitre 4** : le signal modulant seul, centré sur zéro. »

Le `reasoning` de la même question dit correctement « après $C_3$ et $R_3$ ».
La phrase rendue est incompréhensible — et c'est le seul pas qui nomme le
passe-haut. Restaurée.

**Conséquence pour la porte : l'exemption N'EST PAS une précaution théorique.**
Une porte qui interdirait tout `R<n>` dans du texte rendu **referait ce dégât
en le déclarant conforme**. Elle reconnaît donc les étiquettes de composant au
vocabulaire de circuit voisin (résistance, bobine, condensateur, maille, nœud,
diode, filtre, borne, Ohm, C1/L2…, dipôle) dans une fenêtre de 45 caractères.
Les 5 occurrences restantes du corpus sont toutes de ce type, et l'exemption
les classe toutes correctement : **0 faux positif**.

**Et une sentinelle qui cachait une fuite.** Ma première version du motif
excluait `R<n>` suivi d'une virgule. Elle était là pour éviter d'attraper des
décimales, et elle masquait un vrai défaut : `philo/l-etat` écrit « le trait
décisif du gouvernement, **dit R1**, est qu'il change ». En retirant la
sentinelle, la sonde passe de 25 à 26 occurrences et le corpus d'une fuite
non vue à zéro. **Une exclusion posée « par prudence », sans cas mesuré qui la
justifie, ne protège de rien et aveugle sur quelque chose.** Vérifiée rouge sur
les deux formes (« au R4 ceci », « au R4, avec virgule ») et verte sur
« la résistance R4 du montage ».

### 11.72 Le barème contre son propre total — 247 entrées, 0 écart

`bareme_total` d'une entrée contre la somme des points imprimés dans les `stem`
de ses questions. **247 entrées vérifiables, 0 écart** : la convention « la
somme des questions FAIT le total » est tenue partout, donc un écart est un
défaut et la porte est un ÉCHEC.

La seule « anomalie » du premier passage était **un défaut de ma sonde** :
`pc/suivi-temporel-vitesse` écrit « (0 ,5 pt) », avec une espace avant la
virgule, et le dit — « barème tel qu'imprimé ». Mon motif strict ne savait pas
la lire et annonçait un écart de 0,5. Le motif tolère désormais cette forme.
C'est la troisième fois de la session qu'un signalement s'effondre à la
lecture ; à ce stade la règle n'est plus « vérifier avant d'annoncer » mais
**« un signalement unique sur un corpus discipliné est une hypothèse sur la
sonde avant d'être un défaut du contenu »**.

Bénéfice collatéral : la porte confirme le correctif de barème appliqué la
veille à `pc/systemes-oscillants` — les stems de `r-bac` somment à 0,75,
exactement ce que cote le relevé vérifié du sujet 2018.

---

### 11.74 Deux sondes sur l'artisanat des items : l'une redécouvre un instrument existant, l'autre trouve un signal faible que le mélange ne corrige pas

Les critiques de `systemes-oscillants` et de `lois-de-newton` ont signalé deux
défauts d'artisanat qui rendraient un QCM jouable sans physique. Mesurés sur
les **1 612 items à quatre choix** du corpus.

**1. La position de la bonne réponse : 65 % en A — et c'est déjà traité, mieux
que je ne l'aurais fait.** Le comptage dans l'ordre du fichier donne
A 65,0 % · B 14,3 % · C 11,4 % · D 9,4 %. Un élève qui coche toujours A aurait
65 %.

Ce n'est **pas** un défaut : `web/src/lib/shuffle.ts` mélange les choix de
façon déterministe par item, et `web/scripts/test-melange.mjs` re-mesure la
chose avec **deux témoins** — que c'est plat après mélange (25,7 / 25,4 / 24,0
/ 24,9 %) **et que le biais rédactionnel EXISTE toujours**, faute de quoi le
test serait vert avec le mélange désarmé. Ce second témoin est exactement la
discipline de l'ADR 0031 ; il était déjà en place.

Mon chiffre indépendant (65,0 %) **reproduit exactement** celui que le test
consigne, ce qui confirme que sa prémisse est encore vraie aujourd'hui — un
corroborant utile, pas une découverte. C'est la deuxième fois de la session que
je re-trouve un instrument existant (§11.65) : **lire `INSTRUMENTS.md` et les
tests avant de sonder reste le raccourci le moins cher.**

**2. Le distracteur qui s'accuse lui-même — signal faible, mais que le mélange
ne corrige PAS.** Un distracteur dont le texte décrit sa propre erreur
(« …, **en oubliant le facteur** $\frac12$ », « …, **en utilisant** $\omega$
au lieu de $\omega^2$ ») rend la clé repérable sans faire la physique : c'est
le seul choix qui ne s'accuse de rien. Contrairement au biais de position, **le
mélange n'y peut rien** — le tell voyage avec le texte.

Mesure : **107 distracteurs sur 4 836 (2,2 %)** contre **19 clés sur 1 612
(1,2 %)**. L'asymétrie est réelle mais faible, et aucun item du corpus n'a
*tous* ses distracteurs qui s'accusent pendant que la clé se tait — le motif
n'est donc jamais décisif à lui seul. Un seul foyer sort du lot :
`pc/rotation-axe-fixe`, **10,7 %** (8 distracteurs, ROT-16/18/19).

**Pas de porte, et la raison est une distinction, pas une prudence :** dire
« en oubliant le facteur ½ » est une **bonne** chose dans un `feedback` — c'est
exactement nommer le modèle faux — et une mauvaise chose dans le `text` d'un
choix. Un motif ne sait pas lire cette différence d'intention ; il crierait sur
la moitié des feedbacks du corpus, qui sont précisément ce que la VISION
demande. La classe est mesurée, le foyer est nommé, l'arbitrage revient à
l'owner.

### 11.75 La provenance de transcription dans 125 champs rendus — et la convergence qui l'a trouvée

La sonde est née d'une **convergence**, pas d'une intuition. J'avais trouvé
« mesure au pixel » et « Lecture ferme » dans une intro de `dipole-rl` ; le
critique de pédagogie a trouvé, indépendamment et sur une autre notion,
« CROSS-LIST honoré ici », « la règle de la maison » et « le routage
retenu » dans un raisonnement d'estérification. Deux découvertes séparées,
une seule classe : la campagne de transcription des sujets a laissé sa
chaîne d'outillage dans le texte que l'élève lit.

**Mesure : 125 occurrences, 18 notions, toutes en PC** — l'empreinte exacte
de cette campagne. « au pixel » 39, « cross-list » 16, « bitmap natif » 13,
« par la vérification » 12, « re-décrite depuis l'image » 12, « bitmap
d'origine » 9, « la règle de la maison » 4, « lectures fermes » 4, « au
vectoriel » 3.

Un élève de 2ᵉ bac apprenait ainsi qu'il existe un scan, une résolution
native, une chaîne de mesure vectorielle, une seconde chaîne au pixel, et
une règle interne d'arbitrage entre notions. Rien ne l'aide, et tout existe
déjà — mot pour mot — dans `sourcing`, que le rendu ne charge jamais.

Le cas qui a décidé de la sévérité : `transformations-lentes-rapides`
portait, **juste sous une réponse encadrée**, la consigne d'auteur « à
confirmer en priorité contre le corrigé officiel ou un re-fetch du scan
mesuré au pixel ». L'élève lisait une réponse, puis l'ordre d'aller la
vérifier ailleurs. La lacune est réelle et reste consignée en entier dans
`sourcing` (« LACUNE DE PRÉCISION SIGNALÉE ») ; le texte rendu dit
maintenant ce qui est vrai pour l'élève.

**Une exclusion MESURÉE, pas prudente.** « coquille » figurait dans la
sonde — 6 occurrences — et en a été retirée après lecture : c'est un mot
français ordinaire qui signale une vraie coquille du sujet officiel, utile
à qui a la copie sous les yeux, et dans `philo/l-etat` il porte le fond du
propos. Écartés de même : « deux chaînes » quand il s'agit de chaînes
CARBONÉES, et les deux voies de raisonnement physiques indépendantes de
`rlc-serie`. C'est la règle inverse de celle apprise en §11.73 : une
exclusion ajoutée « par prudence » ne protège rien ; une exclusion appuyée
sur un cas mesuré, si.

**Porte §11.75 armée — et le corpus a fourni ses deux témoins seul.** Je
gardais `reactions-acido-basiques` hors de la campagne le temps que deux
critiques la lisent. La porte a donc crié sur exactement ce répertoire-là
(8 signalements distincts couvrant 21 occurrences) et sur aucun des 61
autres. Les 21 corrigées dans le même commit, la porte repasse au vert.

**§11.67 élargie au passage.** En nettoyant acido : « transcrit
intégralement sous `etat-equilibre.md` » dans une intro. §11.61 n'attrape
que le CHEMIN COMPLET, jamais un nom de fichier nu. Sonde : 2 occurrences
dans 2 notions. Rouge/vert vérifiés **au troisième essai**, après deux
tests invalides pour une raison déjà consignée en §11.47 —
`validate-content` résout ses répertoires par `path.join(REPO, dir)`, donc
un chemin en `../` ne résout pas et les deux exécutions échouaient sur
« no lesson.md », pas sur la porte.

### 11.76 Une note d'étape qui contredit le calcul qu'elle commente

`steps[].note` est rendu : il s'affiche **sous** la ligne de calcul. Quand
les deux divergent, l'élève lit un calcul qui produit $9{,}2$ sous-titré
« ici lu 9,6 ». C'est le cas trouvé dans `reactions-acido-basiques` par les
deux critiques séparément — et il ne vient pas d'une faute d'auteur : il
vient d'une correction **déclarée appliquée** la veille, qui avait atteint
l'énoncé et le `math` et manqué la note posée dessous. C'est le dernier
mètre d'une passe de correction que cette porte surveille.

**Trois versions de la sonde, deux abandonnées avec leur mesure :**

| sonde | signalements | vrais |
|---|---|---|
| la note nomme un nombre absent du résultat du `math` | 55 (22 notions) | **0** — une note nomme légitimement des INTERMÉDIAIRES (« 1 u vaut 931,5 MeV », « racine de 4 vaut 2 ») |
| même symbole, deux valeurs | 9 | **0** — « tau ≪ 1 », « chapitre 3 », le 2 de $2\pi$, le 14 de $pK_e$ |
| même symbole ET la note l'AFFIRME (« = », « vaut », « lu », « trouvé », « donne »), renvois de chapitre neutralisés | 0 sur le corpus | attrape le cas réel |

Les deux premières ne sont pas armées, et c'est délibéré : une porte qui
crie 55 fois pour rien apprend à être ignorée.

**Rouge et vert sur l'état HISTORIQUE, mais pas du premier coup.** Le
premier essai a montré vert avec le défaut réinjecté, et j'ai failli en
conclure que la porte marchait. Elle marchait ; c'est le témoin qui était
faux : j'avais réinjecté la NOTE seule, alors qu'une correction antérieure
du même commit avait déjà réécrit le `math` de cette étape — il ne posait
donc plus « $pK_A$ = ⟨nombre⟩ » et il n'y avait plus rien à contredire. Une
sonde temporaire comptant les paires vues (149) a servi à établir que la
porte s'exécutait bien, avant de chercher plus loin.

### 11.77 Les renvois de chapitre, corpus entier : 5 516 citations, 2 hors bornes, 1 défaut

Le corpus renvoie **beaucoup** au chapitre. C'est une force — c'est elle
qui fait tenir le décortiquer d'une notion à l'autre — et c'est exactement
pourquoi un renvoi faux coûte : l'élève qui l'ouvre ne trouve rien et
conclut qu'il a raté quelque chose.

La porte ne juge que ce qu'elle peut trancher seule : un « chapitre N » NU
— aucune notion nommée avant lui dans le même champ — dont le numéro
dépasse le nombre de `## ` de la leçon hôte. Un renvoi nu ne peut désigner
que la leçon courante ; s'il la dépasse, il ne désigne rien.

Sur 5 516, **deux** dépassaient, **un seul** était un défaut : dans un
champ `math` de `derivabilite` — qui se rend SEUL, en formule détachée —
« (théorème de la limite monotone, chapitre 8) », alors que la leçon hôte a
7 chapitres. La cible est « Suites numériques », dont le 8ᵉ chapitre est
bien ce théorème ; et le `math` **voisin** écrivait « chapitre 9 de Suites
numériques ». Le fichier se contredisait à une ligne d'intervalle.

L'autre est un faux positif et donne l'exemption : « … et par "Réactions
acido-basiques" (chapitre 8, exemple travaillé 2) » — la cible est nommée
juste avant. D'où la règle : une notion nommée (« … » ou **gras**) AVANT le
renvoi dans le même champ, et la porte se tait.

**Mesure annexe laissée SANS porte :** 36 « chapitre N » nus vivent dans
des champs `math`, et c'est presque toujours légitime — un `math` cite le
chapitre de sa propre leçon, que l'élève lit sans ambiguïté puisqu'il y
est. Seul le dépassement distingue le défaut du cas normal.

### 11.78 Un total ré-additionné à l'un de ses propres termes — et ce qu'un correctif ÉNUMÉRÉ ne répare pas

Une leçon qui pose « $X = A + B$ » puis écrit plus loin « $X + B$ » dit,
sous sa propre déclaration, $A + 2B$.

Cas fondateur, trouvé par les **deux** critiques de `dipole-rl`
séparément : la leçon déclare « $R = R_0 + r$ » au chapitre 3, s'y tient
partout (y compris dans son exemple chiffré, $R = 50 + 10 = 60\ \Omega$),
puis écrit « $(R+r)$ » huit fois au chapitre 4. Ce n'était pas cosmétique :
deux clés de point d'arrêt s'en trouvaient contradictoires — l'une marquait
FAUX « $I_{max} = E/R$, seule la résistance du conducteur compte », l'autre
marquait VRAI « $\tau = L/R$ », les deux montrées au même élève à quelques
minutes d'intervalle.

**La leçon de méthode vaut la porte.** J'ai d'abord corrigé par
remplacements de chaînes ÉNUMÉRÉS : six sur huit. Les deux dernières
(« $\tau = L/(R+r)$ », en fin de deux longues lignes) n'ont été trouvées
que par la sonde, en relisant le fichier entier au lieu de ma propre liste.
**Un correctif énuméré ne répare que ce qu'on a pensé à lister.**

Sévérité mesurée : version large, 3 signalements dont 2 faux —
`nombres-complexes-1` déclare « $z = a + bi$ » et emploie ailleurs
« $z + b$ » (l'écriture complexe de la translation) et « $z_1 + z_2$ », où
$a$ et $b$ sont des lettres génériques réemployées. Version armée : au
moins un symbole **indicé** dans la déclaration. 0 sur le corpus.

### §11.79 — un renvoi de chapitre malformé, ou qui a mangé un symbole

Deux formes, une seule cause : la campagne de septembre 2026 qui a réécrit les
1 086 renvois « R\<n\> » en « chapitre N » (tâches #18 et #24). Elle a
réécrit ce qu'il ne fallait pas.

**Forme A — « chapitre 4/4 ».** Un renvoi de chapitre ne porte jamais de barre
oblique. Aucun usage légitime ne peut produire cette forme. Trois occurrences
dans `pc/rlc-serie/bank.yaml` (858, 892, 1886).

**Forme B — un symbole avalé.** `pc/rlc-serie/bank.yaml:1468` disait « deux
résistances ici, **chapitre 1** (conducteur ohmique ajustable) et r ». Le
composant s'appelle $R_0$ dans cette même entrée : la campagne a lu `R0` comme
un code de barreau et l'a remplacé par un numéro de chapitre. L'élève lisait
une phrase où un numéro de chapitre tenait la place d'une résistance.

**Pourquoi une porte, et pas un correctif de plus.** C'est la DEUXIÈME fois.
Le 2026-09-11 j'ai corrigé « (chapitre 5/5) » dans
`pc/reactions-acido-basiques/exercises.yaml:180` — et je n'ai rien armé. Le
2026-09-12 la même forme est revenue trois fois. Un défaut vu deux fois n'est
pas un accident : c'est une classe, et une classe se ferme par une porte.

**ÉLARGIE LE 2026-09-19 : le TIRET.** La porte ne voyait que la barre
oblique. Le critique de `transformations-deux-sens` a trouvé « chapitre 4-4 » —
la même corruption, l'autre séparateur. Balayage du corpus : **8 occurrences
dans 2 notions**, dont `reactions-acido-basiques`, où j'avais pourtant corrigé
la forme à barre oblique une semaine plus tôt. Sept étaient malformées et sont
corrigées ; chacune visait un chapitre différent de la notion sœur, donc aucune
réécriture en masse n'aurait convenu.

La huitième, « chapitre 10-11 », est un **intervalle légitime**. La porte
n'accepte donc le tiret que si **les deux nombres sont ÉGAUX** — un chapitre
doublé est une corruption, deux chapitres consécutifs sont une plage. Vérifié
rouge sur la forme réinjectée, vert sur les 62 dossiers, l'intervalle intact.

**Sévérité mesurée** sur les 62 notions, après correctifs : forme A (oblique),
0 ; forme A′ (tiret doublé), 0 ; forme B, 0. Le seul reste est une CITATION de la forme A dans un
`REVIEW-*.md`, qui documente le défaut — les fichiers de revue ne sont pas
rendus et ne sont pas examinés.

**Ce que le test rouge a attrapé en plus.** Ma première version appelait
`fail(...)`, qui n'existe pas dans cette portée — le rapporteur y est
`console.error` + `dirFail++`. Sans défaut à signaler, la porte passait verte ;
elle *ne pouvait pas* devenir rouge. C'est exactement le piège qu'ADR 0031
nomme — **une porte doit pouvoir passer au rouge** — et seul le test rouge l'a
révélé. Une porte qu'on n'a pas vue échouer n'est pas une porte.

### §11.77 bis — la PORTÉE de la porte « chapitre N », mesurée

`§11.77` n'attrape qu'un numéro de chapitre **hors bornes**. Le 2026-09-12,
`pc/suivi-temporel-vitesse/bank.yaml:431` a montré l'autre moitié du défaut :
trois renvois **dans les bornes** — « chapitre 2 » pour le groupe $-COO-$ de
l'ester, « chapitre 3 » pour les produits de l'hydrolyse, « chapitre 6 » pour
le déplacement d'équilibre — dans une leçon de cinétique à six chapitres qui
n'enseigne aucune de ces trois choses. Elles appartiennent à la notion sœur
« Estérification et hydrolyse ». La porte est restée verte tout du long.

**Deux tentatives de fermer le trou, toutes deux abandonnées, chiffrées.**
(1) *Un mot de la citation doit apparaître dans le chapitre cité* : **562
signaux**, écrasante majorité de faux — une prose dense en mathématiques n'a
presque aucun mot appariable, donc toute citation entourée de formules est
signalée. (2) *Le mot doit être absent de la leçon hôte entière* : encore
**plus de 150 signaux**, et les mots « absents » sont de la prose ordinaire
(« affirmer », « rapport », « inverse », « tranches »).

Le signal réel était **sémantique** — de la chimie des esters citée dans une
leçon de cinétique — et il ne se sépare pas lexicalement de la variation
d'écriture normale. **Rien n'a été armé.** Ce qui est acquis est une mesure,
pas une porte : un renvoi dans les bornes mais vers la mauvaise leçon n'est
pas détectable par les moyens essayés ici, et reste au jugement. C'est écrit
ici précisément pour qu'un badge vert sur §11.77 ne soit pas lu comme « les
renvois de chapitre sont vérifiés » (ADR 0031 : la PORTÉE se mesure à part).

### §11.80 — le second sens de la porte de sourçage (une porte qui s'éteignait elle-même)

Jusqu'au 2026-09-12, `validate-content.mjs` ne signalait un exercice non sourcé
**que** si `sourcing.required_for_done === true`. Autrement dit : le drapeau qui
déclare « cet exercice n'est pas bloquant » **éteignait aussi la seule voix** qui
disait qu'il n'est pas sourcé. Un badge vert ne voulait donc pas dire « tout est
sourcé », il voulait dire « rien n'a été mesuré ».

Trouvé sur `pc/rlc-serie` (r8-bac, `status: unsourced` + `required_for_done:
false`). Deux notions seulement portent la combinaison, l'autre étant
`pc/atome-mecanique-newton` (r-bac).

**Ce qui a été armé, et ce qui ne l'a pas été.** `required_for_done: false` peut
être une décision délibérée du propriétaire — un exercice volontairement non
bloquant. On la respecte : le nouveau signalement est un **⚠ qui n'échoue
jamais**, même en `--strict`. Ce qui n'est plus permis, c'est le silence.

**Sévérité mesurée** sur les 62 notions : 52 `sourced`, 44 `not-applicable`,
2 `unsourced`. `not-applicable` est le statut NORMAL des 44 variations
fabriquées — une variation n'est pas censée venir d'une annale — donc elle est
**exemptée**. Restent exactement les 2 vrais non-sourcés, et **zéro faux**.

Les deux sens sont vérifiés sur le corpus réel, sans rien injecter : le sens
« ça parle » par les 2 signalements vivants, le sens « ça se tait » par les
52 + 44 qui n'en produisent aucun. ADR 0031 : une porte a deux sens dès qu'un
seul se laisse contourner.

**Et la même erreur, commise en réparant l'erreur.** En armant ce second sens
j'avais corrigé UNE des deux occurrences de la condition : `exercises.yaml`.
Le jumeau exact vivait vingt lignes plus bas, pour `bank.yaml`. Je ne l'ai
trouvé qu'en relisant le fichier de portes lui-même **à la recherche de la
forme** — un contrôle qu'un drapeau d'adhésion peut éteindre — au lieu de ma
propre liste de correctifs. C'est le §11.78 mot pour mot : *un correctif
énuméré ne répare que ce qu'on a pensé à lister.* Deuxième fois que cette
leçon se paye dans cette campagne.

Côté banque, la sévérité mesurée est **0** : les 247 entrées du corpus sont
`sourced`. Cette porte-là ne cache donc rien aujourd'hui — elle est armée pour
que la banque ne puisse pas devenir muette demain comme les exercices
l'étaient hier. N'ayant aucun cas vivant, elle a été vérifiée **rouge par
injection** (un `status: sourced` basculé en `unsourced` sur `pc/rlc-serie` →
le ⚠ sort, nommant `bk-2019-n-x3`) puis **verte** après restauration. Une
porte qu'on n'a pas vue échouer n'est pas une porte.

### §11.72 bis — la panne de CI dure depuis une semaine (re-mesurée le 2026-09-19)

Le §11.72 consignait une panne du runner GitHub commencée le 2026-09-12 :
chaque run de `gates.yml` échoue en 3-5 s, sans runner, sans journal. **Elle
n'est pas résorbée.** Re-mesuré aujourd'hui sur les trois pushes de la
session — runs 579, 580 et 581 de `gates.yml` :

| run | poussé | terminé | durée | conclusion |
|---|---|---|---|---|
| 579 | 10:17:15Z | 10:17:18Z | 3 s | `failure` |
| 580 | 10:23:21Z | 10:23:24Z | 3 s | `failure` |
| 581 | 10:30:53Z | 10:30:56Z | 3 s | `failure` |

Même signature qu'il y a une semaine. Le dernier run vert reste le 490, du
2026-09-12 à 16:59Z. **Sept jours sans CI.** Le seul contrôle qui tourne
réellement sur la PR #2 est le déploiement Vercel.

Rien n'a été commenté de plus sur la PR : la cause racine y est déjà consignée
une fois, et la répéter n'ajouterait pas d'information. **La batterie est donc
rejouée en local avant chaque push** — 90/90 tests, `token-gate`,
`contrast-gate`, `validate-content --strict` sur 62 dossiers — et aucun commit
de cette session ne prétend « CI verte ».

### §11.81 — ma « batterie locale » était plus étroite que la CI, et cinq portes étaient rouges

**Le constat, d'abord, parce qu'il porte sur mes propres affirmations.** Depuis
le début de cette session, chaque message de commit dit « batterie locale »
et liste : 90 tests unitaires, `token-gate`, `contrast-gate`,
`validate-content --strict` sur 62 dossiers. En relisant `gates.yml` — ce que
la CI aurait lancé si elle tournait — j'ai constaté que **six portes sans
navigateur n'étaient pas dans ma batterie** : `liens-fichiers --porte`,
`lectures-graphiques --check`, `indice-longueur --porte`,
`indice-absolu --porte`, `couverture-diagnostique --porte`,
`resume-couverture --porte`.

Lancées sur HEAD : **cinq sur six ROUGES.** Avec sept jours sans CI, personne
ne l'avait vu. Elles sont désormais dans la batterie d'avant-push.

**Quatre réparées, dont trois causées par moi.**

1. **`indice-longueur` et `indice-absolu`** — tous deux sur
   `pc/decroissance-radioactive`, tous deux de mon fait. Mon correctif de
   vague 1 avait remplacé, dans la clé de DECRO-2, « *et **jamais** du nombre
   total de nucléons* » par « *pas seulement de la taille du noyau* ». La
   correction de fond était juste — au-delà de Z=83 tous les noyaux sont
   instables, donc « jamais » était trop fort — mais elle a **retiré à la clé
   son seul absolu** (les trois distracteurs en portaient : « forcément »,
   « strictement aucune », « nécessairement ») et l'a rendue **la plus
   longue**. Deux indices exploitables d'un coup. Réécrite : « *La stabilité se
   lit toujours sur la position du couple (N, Z) dans la vallée, jamais sur la
   seule taille du noyau.* » — 114 caractères au lieu de 165, deux absolus
   VRAIS, et le distracteur le plus court allongé au registre des autres.

2. **`liens-fichiers`** — de mon fait aussi, et savoureux : le renvoi mort
   était dans un **commentaire que j'avais écrit** pour la porte §11.67, où
   j'illustrais le motif par un chemin d'exemple. La porte lisait cette
   illustration comme une vraie référence. Le commentaire décrit maintenant le
   motif en mots.

3. **`lectures-graphiques --check`** — l'inventaire K-8 avait dérivé ;
   régénéré.

**Une laissée ROUGE, délibérément : `couverture-diagnostique`.**
`pc/systemes-oscillants` passe de 3 à 6 distracteurs sans étiquette. La cause
est *mon* correctif §11.58 : trois distracteurs portaient
`misconception: hors_cadre_probe`, un FANTÔME que le modèle apprenant
compilait comme une vraie misconception. Le retirer était juste. Le compteur
n'a donc pas empiré — **il a cessé de mentir** : il comptait trois étiquettes
qui n'en étaient pas.

J'ai rendu l'état explicite (`misconception: null` sur les trois, ce que la
porte sanctionne, et ce que le `coverage_summary` de la notion déclarait déjà
en champ d'auteur : « *une sonde de bord, pas une erreur nommée* »). Mais
**je n'ai pas re-scellé**, pour deux raisons :

- le sceau porte sa propre règle : « *Régénérer UNIQUEMENT après avoir amélioré
  la couverture — jamais pour faire taire une régression* ». Je n'ai pas
  amélioré la couverture : le moteur ne sait toujours pas nommer ces trois
  erreurs ;
- et je ne peux pas l'améliorer seul. Les trois portent un défaut de
  **vocabulaire des régimes** (« amorti ; critique ; forcé ») ou une
  pseudo-période en forme close — aucune des cinq misconceptions déclarées de
  la notion ne les couvre, et en déclarer une sixième échouerait au plancher
  de trois items par misconception : je n'en ai que deux.

**Décision du propriétaire**, donc : soit écrire un troisième item pour porter
une misconception « noms des trois régimes » et l'ajouter au registre, soit
acter que ces trois distracteurs restent sans étiquette et re-sceller à 6 en
écrivant pourquoi. Tant que ce n'est pas tranché, la porte reste rouge — et
c'est bien qu'elle le reste.

**Et pour que ça ne recommence pas : `npm run batterie`.**
`web/scripts/batterie-locale.mjs` lance les dix contrôles de `gates.yml` qui
ne demandent pas de navigateur, et affiche les quatre dernières lignes de
chaque échec.

Mais l'essentiel n'est pas la liste — c'est qu'elle **ne peut plus prendre du
retard en silence**. Le script relit `.github/workflows/gates.yml`, extrait
chaque `node scripts/…` que la CI lance, et échoue s'il en trouve un qu'il
n'exécute pas et qui n'est pas déclaré dans `HORS_CHAMP` avec sa raison
(navigateur ou build requis). C'est exactement la dérive qui a laissé cinq
portes rouges pendant une semaine.

Le garde-fou a servi **immédiatement** : à sa première exécution il a signalé
`routes-examens.mjs`, une dixième porte que je ne lançais pas non plus.

Et il est tombé, lui aussi, dans le piège du §11.47 : il passait à
`validate-content` des chemins en `../content/…`, que `path.join(REPO, dir)`
ne résout pas — l'outil échouait alors sur « pas de `lesson.md` », pas sur le
contenu. Troisième fois que ce piège se paye dans cette campagne ; le
commentaire est désormais dans le script, à l'endroit exact où on le
rencontre.

### §11.82 — la convention $t_{1/2}$ : la MAJORITÉ a tort (mesure close)

Le 2026-09-12 j'avais recensé la divergence sans la trancher : **25 sites du
corpus écrivent $x_{max}/2$, 10 écrivent $x_f/2$**, et deux des trois notions
concernées portent les deux formes. J'avais écrit que choisir relevait du
propriétaire, et je le maintiens. Mais la mesure, elle, est close, et elle
**inverse** ce que le décompte suggérait.

`pc/controle-catalyse` porte une transformation **limitée** — son propre
fichier le dit : *« C'est une réaction limitée : on l'écrit avec une double
flèche »* — avec $x_{max} = 200$ mmol et $x_f pprox 133$ mmol. Donc
$x_f/2 = 66{,}5$ mmol, tandis que $x_{max}/2 = 100$ mmol est **une valeur que
la courbe n'atteint jamais** : sous la formule majoritaire, $t_{1/2}$
n'existerait pas dans cette notion.

$x_f/2$ est donc la forme générale correcte, et $x_{max}/2$ n'est vrai que
sous une hypothèse de totalité que `suivi-temporel-vitesse` n'énonce qu'une
fois en passant (`lesson.md:73`) et que `transformations-lentes-rapides`
n'énonce pas du tout. **Les 25 sites majoritaires portent la formule fragile ;
les 10 minoritaires portent la juste.**

Ce qui a été fait : chaque notion a été rendue cohérente **avec elle-même**
(une contradiction dans un même fichier est objective). Ce qui reste : choisir
UNE convention pour le corpus — ce qui change ce que trois leçons enseignent,
et se décide, ne se corrige pas. La mesure ne laisse plus de doute sur le sens
de la correction.

### §11.83 — la prose imprime la réponse du point d'arrêt qui suit

**D'où vient la porte.** Les critiques de pédagogie de deux notions PC ont
signalé, le 2026-09-19 et **séparément**, la même forme : une porte
d'engagement posée APRÈS le paragraphe qui révèle la réponse — cinq fois sur
six dans `controle-catalyse`, quatre fois sur cinq dans `evolution-spontanee`.
Un défaut vu deux fois est une classe ; j'ai cherché sa forme mécanisable.

**La sonde large a été ABANDONNÉE, chiffres à l'appui.**
*Version 1* — recouvrement entre les mots de la bonne réponse et les 420
caractères de prose précédant le marqueur : **30 signaux**, beaucoup de faux.
Les points d'arrêt d'ACCROCHE (`cp-r0-predict`) partagent naturellement leur
vocabulaire avec le scénario qu'ils font prédire : c'est le dispositif, pas un
défaut.
*Version 2* — au moins 8 mots de contenu, ≥ 75 % de recouvrement, accroche
exclue : **13 signaux**, mais de **sévérité mêlée**. Certains sont un contrôle
de lecture légitime — ce qui est un jugement pédagogique, pas une erreur de
fait. Une porte bloquante n'a donc pas lieu d'être.

**Les 13, pour le pedagogy-architect** (recouvrement, nb de mots) :

| | notion | point d'arrêt |
|---|---|---|
| 1,00 (10) | `pc/controle-catalyse` | `cp-r2-catalyseur-bilan` |
| 1,00 (9) | `pc/propagation-onde-lumineuse` | `cp-r3-diffraction` |
| 0,94 (17) | `philo/le-droit-la-justice` | `cp-r6-rupture` |
| 0,92 (13) | `philo/le-bonheur` | `cp-r4-kant` |
| 0,88 (8) | `pc/rlc-serie` | `cp-r7-m8` |
| 0,87 (15) | `philo/la-violence` | `cp-r3-hobbes` |
| 0,85 (13) | `philo/theorie-experience` | `cp-r1-empirisme-rationalisme` |
| 0,80 (15) | `philo/la-verite` | `cp-r4-rupture` |
| 0,78 (9) | `pc/controle-catalyse` | `cp-r2-facteurs-cinetiques` |
| 0,75 (8) | `pc/propagation-onde-lumineuse` | `cp-r5-dispersion` |
| 0,75 (16) | `philo/la-violence` | `cp-r6-gandhi` |
| 0,75 (8) | `svt/genetique-humaine` | `cp-r1-caryotype` |
| 0,75 (12) | `svt/granitisation-deformation` | `cp-r1-cassant-ductile` |

**Ce qui EST armé** est le sous-motif qui ne demande aucun jugement : la prose
imprime littéralement « (Réponse : … ) » dans les 500 caractères précédant un
marqueur de point d'arrêt. Aucune lecture n'est nécessaire pour trancher — la
réponse est écrite noir sur blanc, puis redemandée.

**MESURE CLOSE, 2026-09-19 — pourquoi le reste ne se mécanise pas.** Après
que les critiques ont trouvé ce défaut À LA MAIN dans QUATRE notions
(`controle-catalyse` 5 portes sur 6, `evolution-spontanee` 4 sur 5, `piles`
3 sur 5, `transformations-deux-sens` 1), j'ai essayé **quatre** conceptions de
sonde :

| # | conception | signaux | verdict |
|---|---|---|---|
| 1 | sacs de mots, fenêtre 420 car. | 30 | beaucoup de faux (les accroches prédisent, donc partagent le vocabulaire du scénario) |
| 2 | idem, ≥ 8 mots de contenu, accroche exclue | 13 | sévérité mêlée |
| 3 | fenêtre portée à 1 500 car. | 35 | **n'attrape toujours aucune des 3 de `piles`** |
| 4 | phrase de 5 mots reprise MOT POUR MOT | 37 | idem |

**Aucune ne voit les cas de `piles`, et la raison est structurelle** : la bonne
réponse de `cp-r3-anode-cathode` est « *C'est la cathode, borne $+$* » — **deux
mots de contenu**. `lesson.md:119` écrit « *c'est la cathode, la borne $+$* »
vingt-deux lignes plus haut. Un écho de deux mots dans une prose qui traite
justement de la cathode est **indiscernable d'une répétition thématique
normale**. Le critique l'a trouvé en COMPRENANT, pas en appariant. Aucun seuil
ne sépare les deux cas, et en baisser un ramène les faux positifs des accroches.

**Ce qui est acquis quand même** : l'INTERSECTION des conceptions 2 et 4 —
deux appariements indépendants qui tombent d'accord — donne **5 signaux de
haute confiance**, dont celui que le critique avait trouvé à la main et que
j'ai vérifié ligne à ligne. C'est la liste à traiter en premier :

- `pc/controle-catalyse` / `cp-r2-catalyseur-bilan` *(confirmé à la main)*
- `philo/la-verite` / `cp-r4-rupture`
- `philo/la-violence` / `cp-r3-hobbes`
- `philo/la-violence` / `cp-r6-gandhi`
- `philo/le-droit-la-justice` / `cp-r6-rupture`

**LES CINQ SONT TRAITÉS (2026-09-19), et le correctif est le même partout :
déplacer le marqueur AVANT le bloc qui révèle.** La prose de rupture existait
déjà dans les cinq cas ; il ne manquait que l'ordre.

Dans `controle-catalyse`, un seul paragraphe portait la définition ET la règle
d'écriture que le point d'arrêt demande ; il est coupé en deux, la définition
avant la porte, la règle après.

Dans les quatre notions de philo, le motif était identique et plus net encore :
un encadré « **Erreur à éviter** » posé juste avant la porte, dont la bonne
réponse était la paraphrase. L'encadré passe APRÈS — ce qui est d'ailleurs sa
vraie place : il confirme ce que l'élève vient d'engager, au lieu de le lui
souffler.

**Mesuré après** : sonde A 13 → 8, sonde B 37 → 32, et l'**intersection tombe
à 0**. Les signaux restants de chaque sonde prise isolément n'ont pas de second
avis ; ils restent au jugement, comme dit plus haut.

**Sévérité mesurée** de la porte armée : 2 occurrences sur les 62 notions, toutes deux en SVT.
`genetique-humaine` écrivait *« peux-tu dire, sans relire, combien de paires
sont des autosomes, et combien sont des gonosomes ? **(Réponse : 22 et 1 …)** »*
juste avant le point d'arrêt qui demande ces deux nombres.
`genetique-populations` posait toute la situation puis concluait
*« **(Réponse : le grand effectif …)** »* avant le point d'arrêt correspondant.
Les deux sont corrigées — **la question est conservée, la réponse retirée** —
et la porte est vérifiée rouge (par réinjection) puis verte sur 62 dossiers.
0 faux positif.

---

### 11.84 Une porte sur les nombres que l'élève LIT — et les cinq fois où elle est restée VERTE sur un défaut injecté

`web/scripts/arithmetique-rendue.mjs`, câblée dans `gates.yml`, dans
`batterie-locale` et dans `npm run arithmetique-rendue`.

**Ce qu'elle mesure.** Une chaîne « a = b = c » affichée dans une leçon, un
item, un corrigé ou une entrée de banque est une PROMESSE : les segments valent
la même chose. La porte coupe chaque chaîne aux `=` / `\approx`, évalue les
segments entièrement numériques, et compare ceux qu'elle sait lire. Elle est née
du triage de `pc/noyaux-masse-energie` (§11.45), où une somme fausse n'avait été
trouvée qu'à la main : **rien ne relisait les nombres.**

**Portée MESURÉE, pas supposée** (ADR 0031 : la portée d'un mécanisme se mesure
séparément de son bon fonctionnement). Sur les 62 notions :

| | |
|---|---|
| chaînes lues | 31 655 |
| **comparaisons réellement ÉVALUÉES** | **1 342** |
| paires hors champ (segment à lettre, fraction, racine, indice ; égalité nue ; fragment de ligne) | 42 487 |
| conversions d'unité écartées (`25 min = 25×60 = 1500 s`) | 325 |
| fichiers exemptés (ℤ/nℤ, où « 2×3 = 1 » est JUSTE) | 6 |

**Ce qu'elle ne verra jamais, et qu'il ne faut pas croire couvert :** une chaîne
dont tous les segments sont justes entre eux mais fausse par rapport au monde.
C'est précisément le défaut qui l'a fait naître — deux masses fausses de 10 MeV
en sens opposés, dont la somme sortait juste. **Cette porte n'aurait pas trouvé
son propre motif.** Elle attrape les régressions d'arithmétique, pas les données
fausses.

#### Les cinq échecs du test rouge — le vrai contenu de cette entrée

ADR 0031 dit qu'**une porte doit pouvoir passer au ROUGE**. Celle-ci est restée
VERTE sur des défauts injectés exprès **cinq fois de suite**. Chaque échec a
nommé une cécité que la lecture du code seule n'aurait pas montrée :

1. **`\text{}` n'est pas qu'une unité.** Il porte aussi les indices de variable
   (`m_{\text{produits}}`, `\Delta m_{\text{réaction}}`). Comptés comme unités,
   ils faisaient voir « deux unités » dans presque toute chaîne de physique,
   donc « conversion », donc **chaîne entière écartée en silence**.
2. **Même piège, deuxième forme** : les symboles chimiques
   (`m(^{4}_{2}\text{He})`). Corrigé une bonne fois par la règle qui tient :
   **une unité est un `\text{}` en FIN de segment.**
3. **Le `^` était refusé** par le filtre de segment numérique — donc toute la
   notation scientifique, donc presque toute la physique. **+99 comparaisons**
   rien qu'en l'autorisant.
4. **Les guillemets de YAML.** Les retirer partout mangeait le prime de la
   dérivée et transformait `$(-7)'=0$` (juste) en `(-7) = 0` (faux) ; ne pas les
   retirer rendait illisible tout champ `math: '…'`. Il faut les retirer **à la
   clé et en fin de ligne seulement**.
5. **La tolérance se réglait sur le PREMIER nombre de l'expression.** Pour
   `2\times 7200 = 1{,}44\times10^{4}`, elle lisait « 2 » — un chiffre
   significatif — donc **60 % de tolérance**, donc une erreur de 7 % passait.
   La précision qui compte est celle du **résultat affiché**.

Deux formes de maths ont dû être jointes avant lecture, parce qu'un scan ligne à
ligne n'en voit qu'un fragment : les blocs `$$…$$` **et** les `$…$` simples
coupés par un retour à la ligne. Le test rouge final couvre quatre formes :
bloc `$$` en ligne, bloc `$$` multiligne, `$…$` sur deux lignes, champ `math:`
de YAML sans aucun `$`.

**Trois classes de faux positifs ont été mesurées puis écartées par une règle
nommée**, jamais par un seuil :
- le raisonnement par l'absurde (« *les deux ne coïncident que si $5=0$* ») —
  une **égalité nue** n'est pas un calcul, un calcul a un opérateur ;
- l'égalité fausse **citée pour être défaite** (« *Tu as sans doute pris
  $(-1)^{2023} = 1$. Mais 2023 est impair…* ») — la ligne porte sa réfutation ;
- ℤ/nℤ, exemption **NOMMÉE** sur un seul dossier : si une autre notion passe au
  modulaire, elle ressortira en rouge au lieu d'être avalée.

#### Ce qu'elle a trouvé

Un défaut réel, dans une notion **déjà triée** par la campagne :
`pc/systemes-oscillants/bank.yaml` écrivait
`T_0 = 3-1 = 5-3 = 7-5 = 4{,}0\ \text{s}` — trois différences qui valent toutes
**2**. L'intro de la même entrée décrit pourtant t = 1, 3, 5, 7 comme les
**extrémums** de $\dot\theta(t)$, qui alternent creux et crête : deux extrémums
voisins sont séparés d'une DEMI-période. La réponse encadrée (4,0 s) était
juste et toute la suite en dépend ($\theta_m = 0{,}16$ rad, $C = 1{,}7\times
10^{-2}$) ; c'est **le geste de lecture** qui était faux, et il enseignait à
l'élève de soustraire deux extrémums voisins. Réécrit en
`T_0 = 5-1 = 7-3`, avec le piège de la demi-période nommé et son contrôle
(« entre deux instants séparés d'une période, la courbe repart dans le **même
sens** »).

Accessoirement : `docs/audits/lectures-graphiques.md` était périmé et la
batterie l'a signalé — régénéré.

---

### 11.85 RÉSULTAT NÉGATIF — détecter par mots-clés une étiquette de distracteur fausse ne marche pas

Le motif le plus rentable du 2026-09-19 (§11.45) est **une étiquette
`misconception:` que le `feedback` du même distracteur dément**. Quatre cas
réels trouvés en une journée, dans deux notions, dont trois qui tenaient à eux
seuls un `floor_met: true`. Il valait donc la peine de tenter de le mécaniser.
**Ça ne marche pas. Consigné ici pour que personne ne le reconstruise.**

**Ce qui a été essayé.** Chaque notion porte un registre `misconceptions:` avec
`label` + `description` en clair. Pour chaque distracteur étiqueté, on compare
le vocabulaire de son `feedback` à celui de sa propre famille et à celui de
toutes les autres, et on signale quand une AUTRE famille colle mieux. Corpus :
**4 731 distracteurs étiquetés, 4 723 examinés, 62 notions.**

| règle | signalements | vérification ponctuelle |
|---|---|---|
| marge ≥ 4 mots | 53 | — |
| marge ≥ 3 mots | 170 | 2 sur 2 FAUX |
| recouvrement NUL avec sa propre famille, ≥ 4 avec une autre | 17 | 2 sur 3 FAUX, le 3ᵉ douteux |

**Pourquoi ça échoue, et c'est structurel.** Le `feedback` d'un distracteur doit
expliquer la **physique JUSTE**. Son vocabulaire recoupe donc mécaniquement la
description de toutes les familles voisines, qui parlent des mêmes grandeurs.
Exemple mesuré : `rotation-axe-fixe` ROT-1/D est étiqueté « données invoquées à
tort » — étiquette **correcte** — et se fait signaler parce que son retour
explique que la masse n'intervient que dans $J_\Delta$, vocabulaire de la
famille « répartition de la masse ». Même chose pour SNS-4/D, EE-12/D,
OMP-13/D. **Dans les trois vérifications, la famille PROPOSÉE était elle-même
fausse** — l'instrument n'aurait pas seulement fait perdre du temps, il aurait
poussé à casser des étiquettes justes.

**Le témoin qui tranche.** `ondes-mecaniques-progressives` OMP-20/D est un vrai
défaut, encore vivant, laissé au propriétaire (§ « Pour le propriétaire » de sa
revue). Il sert de **témoin positif**. Score mesuré : sa propre famille 1 mot,
la bonne famille 4 mots, **marge 3**. Il tombe donc sous le seuil de la règle la
plus permissive testée, et la règle stricte (recouvrement nul) le rate aussi.
**Une heuristique calibrée pour l'attraper noierait le signal sous 170
signalements majoritairement faux.**

**Ce qui marche, et qui n'est pas lexical.** Les quatre cas réels ont tous été
établis de la même façon : **refaire le nombre du distracteur et voir quelle
erreur le produit.** AE-4/D vaut 6,86 m/s, ce qui s'obtient par $E_{pp}=mz$
sans $g$ — donc l'étiquette est `energie-oublie-g`, pas « confusion $v$/$v^2$ ».
C'est une inférence sémantique sur l'arithmétique, pas une comparaison de
vocabulaire. Aucune porte du dépôt ne sait faire ça aujourd'hui ; les critiques
de vague 1, si.

#### Le second motif ne se mécanise pas non plus

Même tentative sur l'autre motif du jour — **une donnée d'énoncé qui n'existe
que dans la `solution`** (§11.45). Règle essayée : une question dont le `stem`
ou le `part` **rendu** invoque un support DÉFINI (« **le** tableau », « **la**
figure », « **le** document ») alors que l'`intro` de l'entrée n'en rend aucun.
Mesuré sur **345 entrées** de banque et de sommet :

| règle | signalements | verdict |
|---|---|---|
| le support nommé manque à l'intro | 71 | ~40 sont des « tableau d'**avancement** », que l'élève CONSTRUIT |
| idem, hors tableaux construits | 54 | le gros est un désaccord de VOCABULAIRE (« le graphe » pour une « courbe » décrite) |
| l'intro ne rend AUCUN support | 11 | **11 vérifiés à la main : 0 vrai positif** |

Les onze sont tous légitimes, et pour une raison qui vaut d'être écrite : **la
langue de l'examen emploie « le schéma », « le tableau », « la courbe » pour des
objets que l'élève PRODUIT ou qui sont définis mathématiquement** — « représenter
le schéma conventionnel de la pile », « déduire le tableau de variations »,
« l'aire délimitée par la courbe $(\mathcal{C}_u)$ », « situer le radium sur la
courbe d'Aston ». Un cas (`propagation-onde-lumineuse` r-bac q6) décrit même le
graphe dans son propre stem.

Le vrai défaut trouvé à la main (`bk-2024-n-x2`) était détectable — son intro ne
rendait aucun tableau — mais il est **noyé sous une classe de faux positifs
qu'aucune règle lexicale ne sépare**, parce que la distinction est
« donné » contre « à produire », et elle est sémantique.

**Bilan des deux sondes : les deux motifs les plus rentables de la journée sont
hors de portée d'une porte automatique.** Ils demandent de refaire un calcul ou
de comprendre ce qu'une question demande. C'est exactement le partage que le
dépôt entretient déjà entre les PORTES (mécaniques, binaires, dans la CI) et les
CRITIQUES de vague 1 (lecture, jugement, sur commande). Ce n'est pas un échec de
l'outillage : c'est la mesure de sa frontière.

**Conséquence à retenir pour la lecture des tableaux de couverture.**
`couverture-diagnostique` compte des étiquettes. Elle ne peut pas savoir
qu'elles mentent, et rien d'automatique ne le peut à ce jour. **Un
`floor_met: true` atteste que les étiquettes sont assez nombreuses, jamais
qu'elles sont justes.**

---

### 11.86 Les cliquets que j'ai ROMPUS exprès, et pourquoi ils doivent le rester

`couverture-diagnostique` compte désormais **quatre** ruptures. Elles n'ont pas
le même statut, et il ne faut pas les re-sceller ensemble.

> **Mise à jour du 2026-09-19 (fin d'arc).** Cette section en annonçait deux ;
> la porte en affiche quatre. Les deux ajoutées sont miennes, du même jour, et
> de la même famille que la première : un réétiquetage qui rend à un
> distracteur la misconception que son propre retour décrit, et qui fait
> retomber une famille sous le plancher. Elles sont décrites en 3 et 4
> ci-dessous. Laisser la section dire « deux » pendant que la porte en dit
> quatre aurait été exactement la faute que §11.88 raconte : un document qui
> affirme un état que le dépôt ne porte pas.

**1. `pc/aspects-energetiques` — misconceptions ÉVALUABLES : 22 → 21. C'est
moi, le 2026-09-19, et c'est voulu.** Trois distracteurs portaient une étiquette
que leur propre `feedback` démentait (§11.45). Réétiquetés d'après ce que leur
retour décrit — chaque fois confirmé en refaisant le nombre — la famille
`confusion-v-et-v-carre` retombe de 3 items à 1, sous le plancher.

Le cliquet fait donc exactement son travail : il signale qu'une misconception
est redevenue inévaluable. **Ce qu'il ne pouvait pas signaler, c'est qu'elle ne
l'avait jamais vraiment été** — les trois items qui la portaient confrontaient
autre chose. Le compte était vert parce que les étiquettes mentaient.

Deux sorties possibles, toutes deux pour le propriétaire : écrire deux items
qui confrontent réellement « prendre $v^2$ pour $v$ », **ou** décider qu'une
étourderie d'exécution n'est pas un modèle physique faux au sens de la VISION
et la retirer du registre (les deux critiques penchent pour la seconde ; cinq
des vingt-deux lignes du registre de cette notion sont de ce type). **Ne pas
re-sceller la ligne de base sans trancher** : ce serait remettre le vert
au-dessus du même trou.

**2. `pc/systemes-oscillants` — distracteurs SANS TAG : 3 → 6. Antérieur, et
déjà connu.** Vérifié en rejouant la porte sur `51eec4c` : la rupture est là
avant l'arc du 2026-09-19. Les six portent `misconception: null` **de façon
explicite**, pas par oubli, et leurs retours disent pourquoi : SO-26 D nomme un
régime « forcé » qui est hors de ce chapitre, SO-27 D réclame une formule
fermée de pseudo-période que la leçon refuse délibérément de donner. Ce sont
des imports hors cadre, pas des modèles du registre. L'arbitrage reste celui
déjà consigné : écrire un item qui porte vraiment une misconception « noms des
régimes », ou re-sceller à 6 **avec la raison écrite à côté des nulls**.

**3. `pc/atome-mecanique-newton` — misconceptions ÉVALUABLES : 19 → 18. C'est
moi, le 2026-09-19, et c'est voulu.** AMN-27 D portait
`ingredient-manquant-mal-identifie` alors que son propre retour écrit
« L'ingrédient manquant est BIEN identifié, mais le mot "faux" est mal
employé » — contradiction frontale. Rendu à
`calcul-incomplet-confondu-avec-calcul-faux`, déjà la `primary` de l'item. La
famille retombe à 2. Le résumé de couverture dit maintenant 2, `floor_met`
dit `false`, et la famille est nommée dans `under_covered` — il a fallu un
second passage pour ça, voir §11.88. Sortie : écrire l'item qui manque, ou
retirer la ligne du registre.

**4. `svt/soi-non-soi` — misconceptions ÉVALUABLES : 7 → 6. C'est moi, le
2026-09-19, et c'est voulu.** SNS-11 C portait `mauvais-antigene-vise` (« on
vérifie l'antigène du RECEVEUR au lieu de celui du DONNEUR ») pour un élève qui
n'inverse rien : il rabat le Rhésus sur l'ABO. Le `checkpoints.yaml` de la même
notion étiquette déjà ce raisonnement `systemes-de-marqueurs-confondus`. Rendu
à cette famille ; `mauvais-antigene-vise` retombe à 2 (SNS-4, SNS-10). Sortie :
écrire un item qui force vraiment l'inversion donneur/receveur — un cas où
l'élève doit décider quel côté porte l'antigène et quel côté porte l'anticorps,
sans que l'énoncé le lui dise.

> La règle qui se dégage de ces quatre cas, et qui vaut pour tout cliquet :
> **une ligne de base n'est un progrès que si ce qu'elle scelle est vrai.**
> Re-sceller pour reverdir transforme un instrument de mesure en décor.
> Corollaire découvert à la dure le même jour : **le cliquet ne dit pas
> qu'une famille ÉTAIT évaluable — il dit qu'elle comptait trois étiquettes.**
> Trois de ces quatre ruptures révèlent une couverture qui n'a jamais existé.

---

### 11.87 Deux fautes de MA part dans l'arc du 2026-09-19, et ce qu'elles apprennent

Consignées parce qu'elles sont toutes deux des variantes d'un défaut que ce
document reproche ailleurs aux instruments.

**1. J'ai repris une caractérisation de critique sans la vérifier.** Deux
rapports décrivaient des distracteurs mal étiquetés comme ayant un « clone
verbatim » portant l'autre étiquette. J'ai écrit cette phrase dans une revue,
dans §11.45, et j'ai armé une porte dessus. **C'était faux** : ce sont des
paraphrases, ou des distracteurs simplement voisins. Les réétiquetages tenaient
sur autre chose et ont survécu ; l'argument, non. Le même arc a produit **cinq
autres citations de critique qui ne correspondaient pas au fichier** (une
formule « admise au programme » absente, un compte de « 125 » donné pour trois
sites où il y en avait un d'une formulation et deux d'une autre, une explication
de distracteur introuvable telle que citée). **Règle appliquée depuis : on
n'écrit dans le dépôt que ce qu'on a épinglé soi-même dans le fichier**, et un
rapport excellent partout ailleurs ne dispense pas de cette vérification — celui
qui a produit le faux « clone » avait recalculé 25 items sans une erreur.

**2. J'ai poussé avec une porte au ROUGE, sans le voir.** La commande enchaînait
`validate-content … | tail -2 && git commit && git push`. **Le tube renvoie le
code de sortie de `tail`, toujours 0** : le `&&` n'a rien gardé, la porte était
rouge et la chaîne a continué. (Le défaut venait de ma propre correction : j'avais
restauré des étiquettes de récepteurs d'oscilloscope en « R1 et R2 », que la
porte §11.73 lit comme des codes de barreau — l'ambiguïté que son message
signale lui-même.) Corrigé au commit suivant.

C'est §11.84 retournée contre moi : **une porte dont on ne lit pas le verdict ne
contrôle rien.** Depuis, la sortie va dans un fichier et c'est le **code de
sortie** qui est testé avant tout commit — visible dans les commandes des
derniers commits de l'arc.

---

### 11.88 La SVT ouverte : trois notions triées, et une TROISIÈME faute de ma part — j'avais gaté sur la mauvaise porte

**Où en est la campagne.** Maths et PC sont bouclés. La SVT s'ouvre avec
`soi-non-soi`, `role-enzymes` et `transmission-caracteres` — **47 notions sur
62, 602 correctifs objectifs** (24 dans cet arc : 4 renvois nus qualifiés
dans `transformations-deux-sens`, 1 résumé de couverture rendu honnête dans
`atome-mecanique-newton`, 10 + 6 + 3 sur les trois notions SVT). Il reste 8 notions SVT et 12 philo.

**Ce que la SVT change au protocole, mesuré avant d'attaquer.** Pas de
`docs/sujets/svt/`, pas d'`exercises.yaml`, pas de `bank.yaml` sur aucune des
onze notions. Les deux contrôles les plus productifs du corpus maths/PC — le
recalcul des barèmes contre le relevé et la vérification des affirmations de
fréquence d'examen — ne peuvent tout simplement pas tourner. Les trois notions
triées ne portent d'ailleurs **aucune** affirmation de fréquence, ce qui est la
bonne décision : on ne peut pas sourcer ce qu'on n'a pas. Le rendement se
déplace vers trois classes : le **renvoi qui désigne le mauvais endroit**, le
**faux universel démenti par la leçon elle-même**, et la **note d'auteur
périmée**. Les trois notions en ont donné 18 correctifs.

**Le motif le plus productif de la SVT, et il est nouveau : le renvoi
« chapitre suivant » qui désigne en fait la LEÇON suivante.** `soi-non-soi` le
fait deux fois, dans deux champs rendus. Le premier est dans le chapitre 3 et
annonce que la production des anticorps « est le sujet du chapitre suivant » —
le chapitre 4 est « Le CMH », qui n'en dit rien ; c'est la leçon voisine. Le
second, dans le chapitre 6, envoie l'élève au chapitre 7, qui est « Pour
t'entraîner ». Le corpus a pourtant une convention pour ça et l'emploie
ailleurs (« la leçon précédente », trois occurrences vérifiées). **Le reste des
citations de chapitre de la notion — une quarantaine — est juste**, ce qui rend
ces deux-là des anomalies isolées, pas un décalage systématique.

**Le second faux universel, et il se démentait tout seul à deux chapitres
d'écart.** Deux retours de `soi-non-soi` disaient à l'élève que « le sang de
groupe O passe chez tout le monde » / « O est d'ailleurs transfusable à tous »
— le second à propos d'une donneuse **O+**, que la leçon interdit nommément
(`lesson.md:163`). Et le chapitre 5 de la même notion présente ce raisonnement
comme un **modèle faux NOMMÉ** (`cp-r4-rhesus` C, étiqueté
`systemes-de-marqueurs-confondus`). L'élève lisait donc au chapitre 4 ce qu'on
lui reprocherait au chapitre 5.

**RÉSULTAT NÉGATIF — la citation de chapitre HORS BORNE n'existe pas.** Sonde
écrite et passée sur les 62 leçons : 20 citations `chapitre N` dépassent le
nombre de titres `## ` de leur propre leçon ; après résolution du nom de leçon
cité dans la phrase, **il en reste zéro**. La classe est vide, et une porte qui
la garderait serait verte sans rien mesurer. Deux pièges consignés parce qu'ils
m'ont eu tous les deux : (a) j'ai d'abord filtré sur une ligne **tronquée à 160
caractères**, ce qui a produit trois faux positifs dont le nom de leçon vivait
au-delà de la troncature ; (b) chercher le nom de la leçon cible seulement
APRÈS le numéro en rate autant qu'il en trouve (« dans « La vérité »
(chapitre 9) » le nom précède). Un résolveur qui se trompe dans les deux sens
ne peut pas garder une porte.

**Ce que la sonde a quand même trouvé, et qui est réel.** `transformations-deux-sens`
n'a que **5 chapitres**, et sa banque cite quatre fois « chapitre 5 » en
voulant dire le chapitre 5 d'« Estérification et hydrolyse » — dont le test
« flacon A contre flacon B », mot qui apparaît **zéro fois** dans la leçon
hôte. L'élève était envoyé vers « Pour t'entraîner ». Les quatre renvois sont
désormais qualifiés. La classe plus large — « renvoi nu dans un fichier qui
mêle plusieurs leçons » — a été mesurée puis **abandonnée comme porte** : 51
fichiers, plusieurs milliers d'occurrences, aucun discriminant. Le renvoi nu
est la forme NORMALE de l'auto-référence.

**MA TROISIÈME FAUTE DE L'ARC, et c'est §11.87 qui se répète d'un cran.** Au
commit précédent j'avais réétiqueté AMN-27 D dans `atome-mecanique-newton`,
fait retomber une famille de 3 à 2 items, et **écrit** la conséquence dans un
commentaire — en ajoutant fièrement « les comptes ci-dessous n'ont PAS été
retouchés pour masquer ça ». J'ai gaté le commit sur `validate-content` et sur
`arithmetique-rendue`, tous deux verts. Je n'ai pas lancé
`resume-couverture`, qui était **ROUGE** : `floor_met: true` avec une famille à
2. J'avais donc poussé un résumé de couverture qui ment, en croyant faire le
contraire.

La leçon n'est pas « lancer plus de portes », c'est plus précis :
**laisser un compte périmé n'est pas de l'honnêteté, c'est la même faute sous
un autre nom.** « Je n'ai pas retouché les chiffres » sonne comme une vertu et
décrit un fichier qui affirme un état faux. La forme honnête est celle que
`aspects-energetiques` avait déjà : le compte dit la vérité (2),
`floor_met` dit `false`, la famille est nommée dans `under_covered`, et un
`honest_state` daté dit ce qu'il faut écrire pour combler. C'est maintenant
appliqué à `atome-mecanique-newton` et à `soi-non-soi`, et la porte est verte
sur les 62 notions.

**Corollaire opératoire, à tenir :** *tout commit qui touche une étiquette
`misconception:` gate aussi sur `resume-couverture`.* Le réétiquetage est
exactement le geste qui déplace un compte, et `validate-content` ne le voit
pas.

**Un réétiquetage appliqué avec sa conséquence, un déclaré.** Dans
`soi-non-soi`, SNS-11 C portait `mauvais-antigene-vise` (« on vérifie
l'antigène du RECEVEUR au lieu de celui du DONNEUR ») pour un élève qui
n'inverse rien : il rabat le Rhésus sur l'ABO. Le **même** raisonnement est
déjà étiqueté `systemes-de-marqueurs-confondus` dans le `checkpoints.yaml` de
la même notion. Deux fichiers d'une même notion ne peuvent pas nommer deux
modèles pour une seule erreur : c'est la preuve interne la plus forte
disponible, et elle se vérifie seule. Appliqué ; la famille tombe à 2 et c'est
écrit partout. En revanche SNS-9 D est **déclaré, pas déplacé** : la famille
que le critique propose (« le statut d'antigène serait absolu ») n'existe pas
au registre, et on ne tranche pas en inventant une troisième réponse.

**Et une notion à re-passer, dite comme telle.** Sur
`transmission-caracteres`, la passe fidélité s'est arrêtée sur la limite de
session avant d'émettre son rapport. Il n'y a donc **pas d'intersection entre
deux rapports** — et cinq étiquettes contestées, dont quatre feraient tomber
une famille sous le plancher, sont restées **non tranchées**, déclarées dans
un `honest_state` daté et dans la revue. Seule celle qui ne franchit aucun
plancher et dont le registre porte déjà la bonne famille (TC-6 C, `15/16`, une
classe de l'échiquier prise pour une autre) a été appliquée. Un rapport unique
ne suffit pas quand la conséquence est un plancher.

---

### 11.89 Le renvoi relatif qui sort de la leçon — douze sites, une porte qui ne peut pas se tromper

**Trouvé en SVT, vrai partout.** `soi-non-soi` écrivait deux fois « le chapitre
suivant » pour désigner la **leçon** suivante (§11.88). En balayant le motif sur
les 62 leçons : **202 renvois relatifs**, dont **13 dont la cible ne peut pas
exister** — un « chapitre précédent » écrit dans le chapitre 1, ou un
« chapitre suivant » écrit dans le dernier. Douze sont dans de la prose rendue,
un seul dans un bloc de notes d'auteur.

**Pourquoi ça compte plus que ça n'en a l'air.** L'élève ne lit pas
« chapitre » comme un mot vague : la page lui affiche « Chapitre n / N » et un
rail numéroté. Un « chapitre précédent » dans le chapitre 1 l'envoie donc vers
rien. Et les trois sites les plus coûteux sont exactement ceux qu'on ne voudrait
pas rater :

- **`fonction-exponentielle/lesson.md:7`** — la PREMIÈRE phrase de la leçon :
  « Rappelle-toi ce qu'on a établi à la toute fin du chapitre précédent
  (chapitre 6) ». Le chapitre 6 de CETTE leçon ne parle pas de la bijection de
  $\ln$ ; c'est le chapitre 6 de la leçon précédente.
- **`suivi-temporel-vitesse/lesson.md:7`** — également la première phrase, et
  la notion en porte **trois** occurrences.
- **`nombres-complexes-1/lesson.md:547`** — un **titre de section** :
  « Ce que ces exercices empruntent au chapitre suivant ».

Les douze sont réécrits en « la leçon précédente / suivante » — la formule que
le corpus emploie déjà ailleurs, et qui était donc disponible.

**La porte (§11.89, dans `validate-content`).** Elle ne juge pas le SENS du
renvoi : elle vérifie seulement que sa cible existe. Un chapitre 0, ou un
chapitre N+1, n'a **aucune lecture correcte** — le faux positif est impossible
par construction, ce qui est ce qui la rend armable d'un coup sur tout le
corpus. Portée : `lesson.md` seul, blocs `<!-- … -->` exclus (notes d'auteur).
Les sidecars n'ont pas de position dans la leçon : « chapitre suivant » y est
ambigu pour une autre raison, et c'est une autre porte, **non armée** — dit ici
pour que le vert de celle-ci ne soit pas lu plus large qu'il n'est.

**Vérifiée ROUGE dans les DEUX directions**, puis remise au vert :
réinjection d'un « chapitre précédent » dans le chapitre 1 de
`granitisation-deformation` (ROUGE), et d'un « chapitre suivant » ajouté après
le dernier titre de `fonction-logarithme` (ROUGE). Ce second test vaut double :
il tombe **après** le gros bloc de notes d'auteur de ce fichier, et prouve donc
que l'exclusion des commentaires se **referme** — une exclusion qui ne se
referme pas est exactement ce qui rend une porte verte en silence (§11.84).

**Deux notes d'auteur fausses, trouvées par la même passe.** Le balayage des
affirmations de trou (« zéro occurrence », « n'apparaît nulle part »,
« grep vérifié ») donne 65 lignes, dont l'écrasante majorité sont de la prose
légitime (« la masse n'apparaît pas dans cette équation »). Deux étaient de
vraies notes d'auteur devenues fausses :

- **`systemes-oscillants/bank.yaml:81`** affirmait que la forme énergétique de
  la rotation « n'apparaît nulle part ici ». `lesson.md:494` l'écrit et la
  nomme. Ce qui reste vrai — et c'est la seule formulation défendable — est
  que la leçon la NOMME et dit où la chercher, sans la construire.
- **`nombres-complexes-2/bank.yaml:134`** affirmait que « birapport »
  « n'apparaît pas dans le reasoning rendu ». Juste pour `reasoning` (zéro),
  **faux pour ce que l'élève lit** : trois occurrences dans des champs `note:`,
  qui sont rendus au même titre. La note servait de justification à « aucun
  objet nouveau à retenir » — elle justifiait donc à côté.

Les deux notes de `structures-algebriques` que §11.45 avait signalées portent
bien, elles, leur MISE À JOUR datée : re-grep refait, elles disent vrai.

---

### 11.90 Une garde de périmètre revendiquait une filière que le cadre déclare non extraite — les onze notions SVT

Trouvé sur `soi-non-soi` (§11.88), puis compté : **les onze `checkpoints.yaml`
de la SVT** ouvrent sur « Garde de périmètre : 2ème Bac **SVT/PC** ». Or
`docs/cadre/curriculum/svt.yaml` porte un bloc `variante_pc` dont le statut est
« **DISTINCTE — non extraite** » : la SVT en filière Sciences Physiques a un
cadre séparé (élément AlloSchool distinct), un coefficient différent et un
programme allégé, et « nécessitera sa propre passe si l'app ouvre la filière
PC ». Rien dans le dépôt ne permet donc d'affirmer que ce périmètre vaut pour
PC.

Deux revues de septembre l'avaient déjà signalé notion par notion
(`genetique-humaine` F13, `genetique-populations` S5) sans que la classe soit
traitée. Les onze sont maintenant restreintes à « 2ème Bac, filière SVT », avec
la raison écrite **dans le fichier** — pas seulement ici : une garde de
périmètre est lue par l'auteur suivant au moment où il écrit, et c'est là qu'il
faut que la raison soit.

C'est un défaut d'auteur, pas un défaut rendu : aucun élève ne lit ces lignes.
Mais c'est exactement le genre d'affirmation qui pilote des décisions de
contenu — « on peut / on ne peut pas mettre ça, c'est dans le périmètre » —, et
une affirmation de périmètre fausse coûte le travail qu'elle autorise à tort.

---

### 11.91 La note d'auteur qui INVENTORIE le corpus — cinq notes que le corpus a dépassées

Sous-classe de la note périmée (§11.45 §1), et la plus mécanique de toutes :
une note d'auteur qui **énumère l'état du corpus** (« quatre autres notions PC
restent sans banque — A, B, C, D »). Elle est datée du jour où elle est écrite
et fausse dès le commit suivant. Cinq trouvées, toutes fausses :

| Fichier | Ce que la note affirmait | Mesuré le 2026-09-19 |
| --- | --- | --- |
| `pc/transformations-deux-sens/bank.yaml` | 4 notions PC + 1 maths sans banque | **1 PC, 0 maths** |
| `pc/controle-catalyse/bank.yaml` | 4 notions PC + 1 maths sans banque | idem |
| `pc/lois-de-newton/bank.yaml` | 6 notions sans banque | idem |
| `pc/transformations-lentes-rapides/bank.yaml` | 4 notions PC + 1 maths | idem |
| `pc/propagation-onde-lumineuse/bank.yaml` | « TROIS entrées », « la moins couverte du corpus PC » | **5 entrées, exactement à la médiane** |

**L'état vrai, et la commande qui le produit** — parce qu'un chiffre recopié
se périme et qu'une commande, non (ADR 0031) :

```
for d in content/*/*/; do [ -f "$d/bank.yaml" ] || echo "${d#content/}"; done
grep -c "^  - id: bk-" content/pc/*/bank.yaml
```

24 notions sur 62 sans `bank.yaml` — **1 en PC** (`atome-mecanique-newton`),
les 12 de philo, les 11 de SVT. 13 sans `exercises.yaml` — 2 en philo
(`l-histoire`, `le-bonheur`) et les 11 de SVT. Distribution PC des entrées de
banque : de 0 à 19, médiane 5.

**La règle qui en sort, et elle vaut pour toute la documentation du dépôt :**
*une note d'auteur ne recopie pas un état, elle porte la commande qui le
mesure.* Les cinq notes portent désormais leur commande. Ce n'est pas
cosmétique : ces listes servent à décider où travailler ensuite — quatre
d'entre elles envoyaient encore le prochain auteur écrire une banque qui
existe déjà.

**Deux résultats négatifs de la même passe, consignés pour ne pas les
refaire.** (1) **Les attributions de philosophes en philo sont saines.** Sonde
sur les 12 notions, 2 700 mentions d'auteurs : 59 citations apparaissent près
de deux noms ou plus, mais toutes sont des artefacts de proximité. Les sept
plus risquées vérifiées à la main — « pierre qui vole » (Spinoza), « faisceau
de perceptions » (Hume), « forensique » (Locke), « animal politique »
(Aristote), « L'impulsion du seul appétit est esclavage » et « le plus fort
n'est jamais assez fort » (Rousseau) — **toutes justes**. Le seul endroit où
une formule de Hume est prêtée à Locke est un DISTRACTEUR, qui est là pour ça.
(2) **Les 117 renvois inter-leçons nommés** (« chapitre N de « Titre » »)
résolvent tous dans les bornes de la leçon citée, et le titre du chapitre visé
correspond au sujet invoqué partout où c'est jugeable.

---

### 11.92 Vérifier que les corrections ARRIVENT — et ce que la vérification a appris sur l'aperçu Vercel

Discipline de la maison : une correction n'est faite que si elle atteint
l'élève. Les huit correctifs de prose rendue de l'arc ont donc été relus **dans
le HTML SERVI**, pas dans le fichier source.

**Premier essai, raté, et il faut le dire :** l'aperçu de branche Vercel
répond **302 vers `vercel.com/sso-api`** — il est derrière l'authentification
de l'équipe, donc illisible depuis cette session. L'alias public
`bac-pink.vercel.app` répond 200 mais sert un build ANTÉRIEUR : on y retrouve
encore « à la toute fin du chapitre précédent (chapitre 6) » et « Rappelle-toi
la réaction du chapitre précédent ». **Conclusion honnête : la vérité DÉPLOYÉE
de cette branche n'est pas vérifiable d'ici.** Ne pas confondre l'alias public
avec l'aperçu de la branche.

**Second essai, concluant : `npm run build` puis `next start` en local**, et
lecture du HTML servi sur quatre routes. Toutes les corrections y sont, aucune
chaîne ancienne n'y survit — vérifié dans les deux couches :

| Route | Corrigé servi | Ancien |
| --- | --- | --- |
| `/notions/maths/fonction-exponentielle` | « à la toute fin de la leçon précédente (son chapitre 6) » | absent |
| `/notions/pc/suivi-temporel-vitesse` | « Rappelle-toi la réaction de la leçon précédente » | absent |
| `/notions/svt/role-enzymes` | « elle se dénature », « un autre glucide », « pH proche de la neutralité, intestin grêle » | absent |
| `/notions/svt/soi-non-soi` | « la leçon suivante, « Les moyens de défense… » | absent |

**Et un fait de PORTÉE à retenir pour toutes les vérifications futures, parce
qu'il m'a d'abord fait conclure à tort.** Le HTML d'une leçon porte ses
chapitres **deux fois** : 7 sections hors `<script>` (ce que le navigateur
peint) et 7 autres dans la charge RSC (ce que React reprend à l'hydratation) —
14 au total sur `soi-non-soi`. Un texte de **retour de checkpoint** (« le sang
de groupe O- passe chez tout le monde ») n'existe QUE dans la charge RSC, parce
qu'il ne s'affiche qu'après la réponse de l'élève. Une sonde qui retire les
`<script>` avant de chercher — comme `renvois-visibles` le fait, à raison, pour
compter ce qui est LU — **ne voit donc aucun feedback de checkpoint**. Les deux
lectures sont légitimes et ne répondent pas à la même question :

- *« qu'est-ce que l'élève lit sans rien faire ? »* → HTML hors `<script>` ;
- *« la correction est-elle partie en production ? »* → charge complète, RSC
  incluse.

Les deux ont été faites ici. Confondre les deux, c'est soit croire qu'un
défaut de feedback n'existe pas, soit croire qu'un texte de script est sous les
yeux de l'élève.

---

### 11.93 Le trio d'immunologie et le métabolisme — 21 correctifs, et le défaut le plus cher de tout l'arc était dans une FIGURE

**Où en est la campagne : 47 notions sur 62, 656 correctifs objectifs.**
MATHS 14/14, PC 25/25, **SVT 8/11**, PHILO 0/12 — restent trois notions SVT
(`chaines-de-montagnes`, `granitisation-deformation`,
`theorie-tectonique-plaques`) et les douze de philo.

> **Le compte, et la commande qui le produit** — parce que le tour de cet arc a
> été de corriger cinq notes d'auteur qui recopiaient un état périmé (§11.91),
> et que ce paragraphe-ci ne va pas faire la même chose. Les revues datées se
> comptent avec :
> ```
> ls -d content/*/*/ | while read d; do ls "$d"REVIEW-*.md >/dev/null 2>&1 && echo "$d"; done | wc -l
> ```
> **44 notions portent une revue datée.** Les trois qui manquent pour arriver à
> 47 sont triées mais sans revue, parce qu'elles n'avaient RIEN à déférer —
> `derivabilite-etude-fonctions` (traitée directement en §11.44),
> `nombres-complexes-2` et une troisième en PC. Une revue absente ne vaut donc
> pas « non triée » ; c'est le tableau ci-dessous qui fait foi, pas le compte
> de fichiers. (Correction du 2026-09-19, même journée : ce paragraphe a
> d'abord annoncé « 50 notions » et « SVT 6/11 ». Les deux étaient faux, faute
> d'avoir compté avant d'écrire.)

**LE DÉFAUT LE PLUS CHER DE L'ARC, et il n'était pas dans un texte.** La figure
du cycle de Krebs (`liberation-energie`) affichait, sur l'étape « les deux
tours », le jeton **8 NADH,H⁺**. Un tour charge 3 NADH,H⁺ : deux tours en
chargent **6**. Le 8 est le TOTAL de la matrice (2 de l'oxydation des pyruvates
+ 6), et c'est exactement ce que le tableau de la leçon écrit — mais l'étape
précédente de la figure avait DÉJÀ émis ses 2. La figure comptait donc 10
NADH,H⁺ dans la matrice, soit 12 par glucose au lieu de 10, soit **44 ATP au
lieu de 38**. Le nombre affiché au sommet de la notion ne se recomposait plus
depuis ses parts, et rien ne le voyait : ni `validate-content`, ni
`arithmetique-rendue` (qui lit les chaînes d'égalité du texte, pas les jetons
d'un SVG), ni `resume-couverture`. **La leçon à en tirer : la porte
arithmétique s'arrête au bord des figures, et une figure porte des nombres.**
C'est la première fois de la campagne qu'un défaut de calcul survit dans le
rendu — les quarante-neuf notions précédentes n'en avaient produit qu'un seul,
et il était dans du texte.

**Le motif SVT qui se confirme : la leçon enseigne ce que le banc sanctionne.**
Trois occurrences distinctes dans cet arc seul. (a) `role-enzymes` (§11.88)
disait le pH « potentiellement réversible » quand le banc tague l'irréversible.
(b) `liberation-energie` faisait du dioxygène l'accepteur final des électrons
**du cycle de Krebs** dans deux champs rendus, alors qu'un de ses propres
checkpoints tague ce modèle comme une misconception nommée. (c)
`dysfonctionnements-immunitaires` interdit aux IgE de circuler, puis pose en
donnée d'énoncé des anticorps anti-pollen **dans le sang** — et là c'est la
leçon qui a tort, le dosage sérique étant le test d'allergie usuel. Les deux
premières sont corrigées ; la troisième est déférée parce qu'elle demande de
nuancer un contenu enseigné.

**Le barreau qui ment, deuxième fois de la campagne.** Quatre items sur trois
notions portaient un `rung` auquel ils n'étaient pas répondables : leur clé
repose sur un contenu enseigné plus loin. `moyens-de-defense` en avait deux
(un item sur les anticorps rangé au chapitre de la phagocytose, un item sur le
LTc rangé au chapitre de la sélection clonale des LB) ; `liberation-energie`
deux autres. **Dans les deux cas, corriger le barreau VIDE un chapitre** — le
chapitre de la phagocytose ici, le chapitre du bilan chiffré là — et c'est
écrit dans `ramp_coverage` avec sa raison, jamais recompté à l'envers. Le trou
existait avant ; il était rangé sous une mauvaise étiquette, donc invisible.

**Un tableau qui n'énumère que ses barreaux servis cache ses trous.**
`dysfonctionnements-immunitaires` omettait `R1` au lieu d'écrire `R1: 0` — et
R1 porte TOUT le mécanisme de l'allergie, première ligne de programme du
chapitre. Le zéro est maintenant écrit. **Règle : un `ramp_coverage` énumère
tous les barreaux, y compris à zéro.** C'est le même principe que le
`floor_met` de §11.88 : un compte absent n'est pas un compte neutre.

**Trois notes d'auteur périmées de plus**, toutes de la famille §11.91 : une
qui annonçait « TROIS items ajoutés » là où il y en a cinq (et refermait au
passage une dette qu'elle aurait dû nommer), une qui renvoyait la photosynthèse
à « une autre notion » qui n'existe pas — le cadre la classe en exclusion —, et
un commentaire de figure citant une numérotation abandonnée.

**Ce que les six rapports confirment sur le fond.** Les `coverage_summary` des
trois notions, recomptés distracteur par distracteur **par les deux critiques
séparément**, sont exacts. Toute l'arithmétique du bilan énergétique se
recompose (glycolyse, matrice, carbone, conversion, 34/38 ≈ 90 %) — la seule
rupture était la figure. Les ~90 citations « chapitre N » des trois notions
résolvent toutes. Aucune brèche d'exclusion. Aucune réponse au-dessus de la
porte d'essai. **Le fond biologique est juste de bout en bout**, comme le fond
mathématique et physique l'était : les défauts sont dans ce que le texte
AFFIRME et dans la façon dont il est rangé, pas dans la science.

**Et un couplage d'étiquettes à ne pas manquer, consigné pour l'auteur.** Dans
`dysfonctionnements-immunitaires`, deux réétiquetages proposés sont LIÉS : si
la clause universelle de DI-7 C tombe seule, `vaccin-protection-universelle`
passe sous le plancher ; elle ne remonte que si DI-10 D est réétiqueté dans le
MÊME commit. Dans `liberation-energie`, le sens choisi pour le modèle « perte
thermique avant la glycolyse » décide lui aussi d'un plancher, dans un sens et
pas dans l'autre. Aucun des deux n'est tranché ici : ce sont des décisions de
registre, et les trancher au jugé casserait un compte vrai.

---

### 11.94 RÉSULTAT NÉGATIF — « un nombre qui n'est que dans la figure » n'est pas la classe ; le défaut de Krebs était autre chose

Après §11.93, la tentation était de transformer le défaut du cycle de Krebs en
campagne : chercher partout les nombres qui vivent dans une figure et pas dans
le texte. **Mesuré, puis abandonné — et il faut dire pourquoi, sinon quelqu'un
le refera.**

**Premier compte, inutilisable, et le piège qui l'explique.** Sur les 62
notions : 4 060 nombres lus dans des `<text>` de SVG, des `aria-label` et des
`caption` de sidecar ; 435 absents du texte de leur notion. Presque tous
étaient des **artefacts d'entités HTML** : `&#8747;` (∫), `&#8722;` (−),
`&#215;` (×), `&#183;` (·), `&#8230;` (…) — ma sonde lisait les chiffres à
l'intérieur du codage du caractère. Leçon de sonde : **dépouiller `&#\d+;` et
`&[a-z]+;` avant de chercher un nombre dans du balisage.**

**Second compte, propre, et c'est un résultat négatif.** Entités retirées,
restreint à PC et SVT, et limité aux nombres porteurs (au moins deux chiffres
significatifs) : **58 figures** portent un nombre absent du texte de leur
notion. Lues, elles sont **légitimes dans leur immense majorité** — ce sont des
graduations d'axe, des coordonnées, des valeurs qui n'existent QUE
graphiquement parce que la figure est le document. Une figure a le droit de
porter ses propres nombres ; c'est même son travail.

**Donc la classe n'est pas « absent du texte ». Elle est « contredit la
décomposition du texte ».** Le jeton « 8 NADH,H⁺ » du cycle de Krebs était
présent dans le texte — c'est le TOTAL de la matrice — mais posé sur l'étape
qui n'en produit que 6, après une étape qui avait déjà émis les 2 autres. Aucun
test d'appartenance ne l'aurait vu : il fallait **refaire l'addition en suivant
l'ordre des étapes de la figure**. C'est un contrôle sémantique, pas lexical,
et il n'est pas mécanisable à bon compte.

**Ce qui reste, et qui est actionnable :** dans la commande d'une critique
fidélité, exiger explicitement la comparaison des nombres des SVG et de leurs
sidecars à ceux de la leçon — c'est comme ça que le défaut a été trouvé, par un
œil à qui on avait dit où regarder, pas par une porte. Les commandes de l'arc
géologie le portent déjà.

**Contrôles faits en passant, et tenus** : `noyaux-masse-energie/defaut-masse`
— 4,03190 − 4,00151 = 0,03039 u, et 0,03039 × 931,5 = 28,31 MeV, ce qui est
bien l'énergie de liaison de l'hélium-4 ; `atome-mecanique-newton/spectre-raies`
— 410, 434, 486, 656 nm sont les quatre raies de Balmer visibles, justes.

---

### 11.95 Deux sondes de plus, deux RÉSULTATS NÉGATIFS — et pourquoi il faut les écrire

Même logique que §11.85 et §11.94 : une sonde qui ne trouve rien coûte cher à
refaire, et elle est perdue si personne ne dit qu'elle a été passée.

**1. « L'énoncé donne X » — X est-il vraiment dans l'énoncé ?** Motif attendu :
un raisonnement qui attribue à l'énoncé une donnée que l'énoncé ne porte pas,
c'est-à-dire un exercice qui se répond avec ce que la LEÇON a donné en se
faisant passer pour l'examen. Sonde écrite : pour chaque entrée, rassembler
tous les champs d'énoncé (`stem`, `intro`, `part`, `title`, `text`) de l'entrée
ENTIÈRE, puis vérifier que chaque jeton mathématique cité après « d'après
l'énoncé / l'énoncé donne / précise / fournit » y figure.

**77 appels examinés, 14 signalés, 0 défaut** après lecture. Les 14 sont des
artefacts de sonde, de deux sortes, et ce sont les deux à connaître avant de la
refaire : (a) **l'énoncé dit la chose EN TOUTES LETTRES plutôt qu'en LaTeX** —
`rlc-serie` écrit « Sachant que la pseudopériode est approximativement égale à
la période propre $T_0$ », et le raisonnement la cite comme « $T\approx T_0$ » ;
la comparaison de jetons ne peut pas les rapprocher ; (b) **la donnée vit dans
un champ FRÈRE** — une masse molaire donnée dans l'`intro` de l'exercice et
citée dans le `reasoning` de la question 3. Une première version de la sonde,
qui prenait pour unité le plus petit dict portant un `stem`, donnait 38 faux
positifs pour cette seule raison ; passer à l'entrée entière en a supprimé les
deux tiers. **La portée de la sonde EST la définition de l'énoncé.**

**2. Une légende de sidecar par groupe `step-N` du SVG.** Motif attendu : une
légende qui ne s'affiche jamais (plus de légendes que d'étapes) ou une étape
muette (l'inverse). C'est mécanique et sans faux positif possible.
**235 sidecars examinés, 0 écart.** La couche de mise en scène est
structurellement saine — ce qui, dit à côté du défaut de §11.93, situe
exactement le problème : **les figures sont bien CÂBLÉES, ce sont leurs
nombres qui ne sont relus par rien.**

---

### 11.96 Les barreaux muets, comptés sur tout le corpus — et une fiche à moi qui disait vrai sur le mot, faux sur la chose

Application de la règle de §11.93 (« un `ramp_coverage` énumère TOUS les
barreaux, y compris à zéro ») à l'échelle du dépôt, plutôt que notion par
notion. Sonde : comparer, pour chaque notion, les titres `## R<n>` de la leçon,
les `rung:` bruts des items, et les clés du `ramp_coverage`.

**⚠ RÉTRACTÉ LE MÊME JOUR — §11.97.** Ce paragraphe posait « une convention,
dite une fois pour toutes » : R0 et le dernier chapitre « Pour t'entraîner »
seraient exemptés « parce qu'ils n'ont jamais d'item par construction ». **La
justification est fausse, et elle était mesurable en une commande.** Sur les 62
notions, **51 portent au moins un item à R0 et 50 au dernier barreau**. Loin
d'être vides par construction, ces deux barreaux sont servis dans la grande
majorité du corpus — ce qui rend leur zéro, quand il arrive, d'autant plus
informatif. La « convention » n'était pas une convention : c'était une règle
inventée pour faire taire une sonde qui gênait, et elle m'a fait classer « faux
positif » un constat JUSTE de deux critiques. Les onze notions SVT portent
désormais leurs deux comptes. Voir §11.97 pour la porte qui rend le cas
impossible à réintroduire.

> La leçon, et elle est plus large que ce paragraphe : **quand une sonde
> signale onze cas d'un coup, la tentation est d'inventer l'exemption qui les
> fait tomber.** Le réflexe juste est l'inverse — MESURER la prémisse de
> l'exemption avant de l'écrire. Ici, une boucle de trois lignes suffisait.

**Trois notions avaient un barreau d'ENSEIGNEMENT muet et tu.** Deux sont
écrites maintenant :

- **`moyens-de-defense` — quatre barreaux à zéro**, et c'est le vrai état de la
  notion : R1 (la réaction inflammatoire, dont les quatre signes cardinaux sont
  le meilleur « pourquoi c'est vrai » du document), R2 (la phagocytose et ses
  cinq étapes), R7 (la coopération CPA/LT4, qui n'a **ni item ni checkpoint**
  alors que la leçon en fait le point de bascule), R8 (la mémoire immunitaire,
  qui répond à la seconde des deux questions d'ouverture).
- **`role-enzymes` — R5 à zéro** : la concentration en substrat et le palier de
  saturation, chapitre enseigné, mis en scène, dont la misconception est rompue
  en prose — et qui ne porte aucune ligne du registre.
- La troisième (`theorie-tectonique-plaques`, R5) est laissée à la passe en
  cours sur la géologie, pour ne pas écrire par-dessus une critique qui lit le
  même fichier.

**Et une fiche de tâche à moi qui disait vrai sur le mot et faux sur la
chose.** La fiche §11.69 affirmait que `derivabilite-etude-fonctions` et
`limites-continuite` « n'ont pas de table `per_rung`, donc rien de faux à y
déclarer ». Exact pour `per_rung` ; trompeur pour ce qui compte : les deux
portent un `ramp_coverage` qui déclare bel et bien le barreau fantôme (R6 avec
5 items pour l'une, R7 avec 3 pour l'autre), parce que leur dernier chapitre
n'a pas de code `R<n>`. **Les tables sont cohérentes avec les tags bruts** — ce
n'est pas un faux compte, c'est un barreau sans titre. Rien n'a été modifié :
le correctif évident (coder les deux derniers chapitres) est exactement celui
que §11.69 interdit d'appliquer mécaniquement, parce que les items orphelins ne
portent pas sur le sujet de ces chapitres. La fiche est corrigée ; le fond
reste une décision d'auteur.

> Ce que ça ajoute à §11.91 : **une affirmation peut être littéralement vraie et
> quand même désinformer.** « Pas de table `per_rung` » était vrai ; ce que le
> lecteur en tirait — « rien à vérifier ici » — était faux.

---

### 11.97 La table de barreaux qui ne décrivait pas sa leçon — et la porte qui ne regardait que 4 notions sur 62

Cette fiche commence par une rétractation, parce que le défaut est le mien.
§11.96 avait posé « une convention, dite une fois pour toutes » : R0 et le
dernier chapitre « Pour t'entraîner » seraient exemptés d'un `ramp_coverage`
« parce qu'ils n'ont jamais d'item par construction ». Deux critiques de la
vague 1 avaient signalé l'omission sur deux notions de géologie ; j'ai écrit,
dans deux revues datées, que leur constat était un **faux positif**.

La prémisse était fausse et se mesurait en trois lignes :

```
for f in content/*/*/items.yaml; do d=$(dirname $f);
  L=$(grep "^## R" $d/lesson.md | tail -1 | grep -o "R[0-9]*" | head -1);
  grep -q 'rung: "R0"' $f && echo R0; grep -q "rung: \"$L\"" $f && echo LAST;
done | sort | uniq -c        # → 51 R0, 50 LAST, sur 62 notions
```

**51 notions sur 62 portent au moins un item à R0, et 50 au dernier barreau.**
Ces deux barreaux sont servis dans la grande majorité du corpus. Leur zéro,
quand il arrive, n'est donc pas une fatalité de structure : c'est un état de la
notion, et c'est exactement ce qu'une table doit montrer.

> **La leçon, plus large que le cas.** Quand une sonde signale onze cas d'un
> coup, la tentation est d'inventer l'exemption qui les fait tomber — ça
> ressemble à du tri, ça se raconte comme du discernement. Le réflexe juste est
> l'inverse : **mesurer la prémisse de l'exemption avant de l'écrire.** C'est la
> même faute que §11.88 sous une autre forme — là je laissais un compte périmé,
> ici j'invente la règle qui rend le compte inutile.

**Ce que la sonde a trouvé une fois écrite correctement.** Elle a dû être
réécrite trois fois, et chaque réécriture a retiré des faux positifs qui
étaient les miens, pas ceux du corpus :

1. premier jet — comptait les `rung: "Rn"` **présents dans les commentaires
   YAML** (mes propres notes « RE-BARREAUDÉ : portait `rung: "R2"` » se
   comptaient comme des items). Deux notions déclarées « comptes faux » à tort ;
2. deuxième jet — ne lisait pas les valeurs suivies d'un `# commentaire`, et ne
   reconnaissait que les titres `## R<n>`, pas les `### R<n>`. Quatre notions
   déclarées fausses à tort ;
3. troisième jet — ne cherchait que la clé `ramp_coverage`. Or **57 notions
   écrivent cette table sous ce nom, 4 sous le nom `per_rung`**. Quatre notions
   déclarées « sans table » alors qu'elles en ont une.

État réel, après les trois corrections : **15 notions sur 62**, en trois
familles nettes — 11 SVT qui omettaient R0 et leur dernier barreau (les deux
vrais zéros), 3 qui déclarent un barreau sans titre, 1 sans aucune table.

**La porte existait déjà, et elle ne servait à rien.** `validate-content`
portait depuis le 2026-09-19 un contrôle du barreau fantôme. Il lisait
`coverage_summary.per_rung` — donc **4 notions sur 62**, et se taisait sur les
57 autres. Et il n'émettait qu'un `⚠` : il ne pouvait, par construction, rien
faire échouer. Son vert ne disait pas « conforme », il disait « pas regardé ».
C'est ADR 0031 dans les deux sens à la fois : la PORTÉE d'un mécanisme se
mesure séparément de son fonctionnement, et une porte qui ne peut pas devenir
rouge n'est pas une porte.

**Ce qui est armé maintenant.** Les deux noms de clé sont lus. Trois choses
font ÉCHOUER : aucune table alors que la notion a des items ; un chapitre
`## R<n>` absent de la table ; un compte déclaré qui ne vaut pas le nombre
d'items réellement tagués à ce barreau.

Le barreau fantôme reste une **dette déclarée**, nominative et datée, parce que
son remède est éditorial et non mécanique : coder le titre voisin ferait tomber
les signalements à zéro en rangeant trois problèmes de Bayes sous un chapitre
« variable aléatoire » et cinq questions de tableau de signes sous un chapitre
« fonction réciproque » (§11.69). **Le ratchet joue dans les deux sens** : une
notion hors liste qui déclare un barreau fantôme échoue, et une entrée de la
liste qui ne correspond plus à rien échoue aussi, pour qu'on vienne la retirer.
Sans ce second sens, la liste serait le tapis sous lequel glisser les cas neufs.

Quatre essais rouges, puis vert : barreau retiré de la table → rouge ; compte
faussé → rouge ; barreau fantôme hors dette → rouge ; entrée de dette périmée →
rouge. Restauré : 0 échec sur 62.

**Piège de méthode, à ne pas refaire.** Les essais rouges ont été joués avec
`git checkout --` pour restaurer — sur du travail NON COMMITTÉ. Le dernier
`checkout` a effacé la porte elle-même et les deux comptes que je venais
d'écrire. Rien n'a été perdu définitivement (tout a été refait), mais la règle
est simple : **committer avant de jouer un essai rouge**, ou restaurer depuis
une copie, jamais depuis l'index.

**Trouvé en passant, sans le chercher :** cinq notions PC logent une `note:` en
prose DANS la table de barreaux ; la porte ne lit que les clés en forme de code
de barreau. Et `philo/analyse-de-texte` était la seule notion des 62 sans
aucune table, sous aucun des deux noms — elle en a une maintenant, recomptée
depuis les tags bruts (3+8+6+7+6+16+3+0 = 49).

---

### 11.98 Le lien interne qui ne mène nulle part — un instrument qui ne regardait que la moitié du site

`liens-internes.mjs` existait depuis le début et **n'était pas en CI** : il pouvait
donc pourrir sans que personne le sache. Il a été relancé le 2026-09-19, et la
première tentative a échoué platement — il cherche son serveur sur le port 3497
par défaut, le serveur local tournait sur 3911. `BASE=…` suffit.

**Et là, le vrai constat, qui n'est pas celui que je cherchais.** Sa liste de
pages est écrite en dur : 10 routes fixes + les 62 notions énumérées depuis
`content/` = **72 pages**. Et **aucune page d'épreuve**. Son « 0 lien mort »
portait donc sur le seul versant leçon, en laissant de côté les 39 épreuves —
la moitié la plus dense en liens du site. Encore un vert qui ne disait pas
« conforme » mais « pas regardé » (ADR 0031, et §11.97 deux fiches plus haut :
la PORTÉE se mesure séparément du fonctionnement).

Les routes d'épreuve sont maintenant énumérées par `routes-examens.mjs`, la même
source que les portes impression et presse-papier — une épreuve neuve entre donc
dans le balayage sans qu'on ait à y penser. Et si cette source rend une liste
vide, l'instrument **s'arrête en erreur** au lieu de mesurer 72 pages en
silence : une portée amputée ne doit pas pouvoir se lire comme un succès.

Portée avant : 72 pages. Après : **111**. Verdict : inchangé — **108 cibles
distinctes, 0 morte**. Les épreuves n'ajoutent aucune cible neuve, elles pointent
le même jeu de destinations. Le verdict était donc déjà juste ; ce qui a changé,
c'est qu'il veut maintenant dire quelque chose.

**Armé en CI.** L'instrument a reçu le motif autonome d'`impression.mjs` et de
`dom-truth` — sans `BASE`, il lève son propre `next start` sur un port dérivé du
PID et le tue en sortant. C'est ce qui lui permet d'entrer dans `gates.yml`, où
aucun serveur partagé ne tourne. Vérifié rouge (une cible 404 injectée : exit 1,
la cible ET la page qui la cite sont nommées) puis vert (111 pages, 0 morte),
et le chemin CI — mode autonome, sans `BASE` — testé pour de vrai.

> **Le piège de méthode, répété de §11.97 parce qu'il vient de me coûter une
> reprise :** les essais rouges se restaurent depuis une COPIE
> (`cp fichier /tmp/sauvegarde`), jamais par `git checkout --` tant que le
> travail n'est pas committé. Le dernier `checkout` de la série précédente avait
> effacé la porte que je venais d'écrire.

---

## §11.99 — La note d'auteur qui décrit un dépôt qui n'existe plus

**Ce qui a été mesuré le 2026-09-19, sur TOUT le corpus, pas sur une matière.**
Le commit précédent avait cadré ce défaut comme « philo ». Il ne l'est pas : il
est dans **trois matières** et il a deux formes.

**Forme (a) — le chemin qui ne se résout pas.** Quarante-sept fichiers citaient
leur propre porte par `scripts/resume-couverture.mjs` ou
`scripts/indice-longueur.mjs`. Ces chemins **n'existent pas** — les fichiers
sont sous `web/`. Et ce n'était pas une abréviation : le dépôt a un VRAI
répertoire `scripts/` à la racine, donc le chemin désignait autre chose, qui
n'était pas là. ADR 0031 : *un renvoi est une instruction*.

**Forme (b) — la couverture nulle affirmée au présent.** Quatorze notes, dans
onze notions, affirmaient au présent qu'une misconception n'avait « AUCUN item
de banc », alors que le tableau du **même fichier**, quelques lignes plus bas,
lui en comptait trois ou plus. Elles décrivaient l'état d'avant la passe
d'élargissement du 2026-09-05 et n'avaient jamais été redatées.

Ce n'est pas cosmétique : **ces notes sont ce qui JUSTIFIE le placement des
sondes.** Un auteur qui les lit pose sa prochaine sonde sur un trou refermé
depuis. Le placement reste souvent bon ; son motif écrit, non.

**La porte** (`validate-content.mjs`, dans la boucle par notion) fait deux
choses : tout chemin `…/*.mjs` cité dans un commentaire doit désigner un
fichier existant, **résolu depuis la racine, SANS repli sur `web/`** — tolérer
le repli rendrait la porte aveugle au défaut qu'elle vise ; et une couverture
nulle affirmée au présent contre le `coverage_summary` du même corpus échoue.

**L'échappatoire est volontairement étroite** : la ligne passe si elle porte une
marque de temps ou de rectification (`AVANT`, `alors`, `était`, `à l'époque`,
`RE-MESURÉ`, `CORRIGÉ`, `→`, `depuis`). Le but n'est **pas** d'effacer l'ancien
chiffre — c'est lui qui explique pourquoi la sonde est là — mais d'obliger à le
**dater**.

**Rouge vérifié** dans les deux directions (chemin cassé ; couverture nulle
réaffirmée au présent), puis vert : 0 échec sur 62.

### Le fait à retenir, et il porte sur moi

**La passe manuelle qui a précédé la porte était INCOMPLÈTE.** J'avais corrigé
quarante fichiers et écrit que le défaut était traité. Une fois armée, la porte
a trouvé **dix citations de plus** — sept de `resume-couverture`, trois
d'`indice-longueur` — dans des fichiers que je croyais faits.

Ce n'est pas un argument pour « mieux sonder ». C'est l'argument pour que **la
porte, et non la passe, soit ce qui établit le compte**. Une passe dit ce que
j'ai fait ; une porte dit ce qui reste.

---

## §11.100 — La casse laissée par « R\<n\> → chapitre N »

**Vingt et une occurrences, treize fichiers, trois matières** (maths, pc,
philo), **toutes en champs RENDUS à l'élève**. La passe de §11.18, qui a réécrit
1 086 renvois de barreau en numéros de chapitre, a substitué le texte **sans
relire la phrase autour** :

```
« Que répondre, à la lumière de chapitre 2 ? »      ← l'article est parti avec le code
« …au seul fait divers : Le chapitre 1 annonce »    ← capitale restée en milieu de phrase
« l'erreur à éviter de Le chapitre 5 le précise »   ← substitution brute
```

**Pourquoi personne ne les avait vues.** Le motif **traverse un pli YAML** :
entre « de » et « chapitre » il y a un retour à la ligne et douze espaces. Toute
sonde ligne-à-ligne rend zéro. La porte aplatit le pli (`\n\s+` → espace) avant
de chercher, et ne lit que les champs rendus (commentaires retirés).

### Deux fois de suite, la porte a battu la passe qui la précédait

Ma sonde écrivait `chapitre\s+\d` sans le `s` du pluriel. Elle a manqué
« dans **chapitres** 1 et 3 » (`philo/le-bonheur/lesson.md`), que la porte a
trouvé seule, immédiatement après avoir été armée. C'est le même enseignement
qu'en §11.99, deux commits plus tôt, sur un autre défaut : **la portée d'une
sonde définit la portée de son verdict, et une sonde écrite par la même main que
la correction hérite des angles morts de cette main.**

### RÉTRACTATION DE MÉTHODE — le piège consigné deux fois, et repris une troisième

J'ai de nouveau détruit du travail non committé avec `git checkout --` pour
défaire un essai rouge. Ce piège est écrit en **§11.97**, puis **répété en
§11.98 parce qu'il venait déjà de me coûter une reprise**. Deux notes n'ont rien
empêché.

**La règle cesse donc d'être une note.** Avant tout essai rouge : *soit* le
travail est committé, *soit* le fichier est copié hors de l'arbre. Un essai
rouge ne se défait jamais depuis l'index tant qu'il reste de l'inédit autour.
Si la règle est reprise une quatrième fois, ce n'est pas la note qu'il faut
réécrire — c'est l'essai rouge qu'il faut outiller (un script qui copie,
casse, mesure et restaure depuis la copie).

---

## §11.101 — La porte de longueur mesurait la VISIBILITÉ du défaut, pas le défaut

**Le fait, mesuré le 2026-09-20** (`node web/scripts/indice-longueur.mjs`) :

> **42 des 62 notions ont un taux brut d'indice de longueur supérieur au hasard.
> Seize dépassent 50 %.** Le hasard vaut 25 % à quatre choix.

| matière | médiane | max | notions > 50 % |
|---|---|---|---|
| philo | 16 % | 61 % | 2 |
| maths | 23 % | 57 % | 1 |
| **pc** | **45 %** | **79 %** | **9** |
| **svt** | **50 %** | **67 %** | **4** |

Pire notion : `pc/transformations-deux-sens`, **19 items sur 24**. Puis
`pc/suivi-temporel-vitesse` 17/22, `svt/granitisation-deformation` 10/15,
`pc/ondes-mecaniques-progressives` 16/25.

Un élève qui coche systématiquement la réponse la plus longue a raison plus
d'une fois sur deux dans seize notions. L'item ne mesure alors plus ce qu'il
prétend mesurer — **et c'est le diagnostic qui en découle qui porte tout le
reste du produit.**

### Et la porte était VERTE. Légitimement.

`indice-longueur --porte` compte l'indice **EXPLOITABLE** : la clé est la plus
longue **ET** l'avance dépasse 20 caractères **ET** 20 % du second choix.
Corpus entier : **0 sur 1804.** La porte disait vrai. Elle répondait simplement
à une autre question que celle qu'on croyait lui poser.

C'est ADR 0031 dans sa forme la plus pure : *un badge vert dit que rien n'a
échoué, pas que tout a été mesuré.* Et le piège est plus fin que d'habitude —
la porte n'était ni morte (§11.100) ni aveugle : elle était **exacte sur une
question plus étroite**, et son en-tête laissait lire la plus large. Plusieurs
notions portent, en commentaire d'auteur, « ÉQUILIBRE DES LONGUEURS — vérifié
par `indice-longueur --porte` ». C'est vrai du cliquet. C'est faux du défaut.

### La seconde direction, armée

ADR 0031 : *une porte a deux sens quand un seul se contourne.* Le cliquet garde
désormais **aussi le taux BRUT** par notion — la part des items où la clé est
strictement la plus longue, quelle que soit la marge.

**Tolérance : ne crie qu'au-dessus de 25 % ET au-delà de 12 points de hausse.**
En dessous, le bruit d'échantillon d'une notion de quinze items dépasse le
signal, et une porte qui crie pour du bruit finit désarmée.

**Vérifiée dans les trois états** : dérive de 39 points → ROUGE ; dérive de 13
points (juste au-dessus de la tolérance) → ROUGE ; dérive de 7 points (en
dessous) → VERTE, sans faux positif.

### Deux choses que cette mesure corrige sur moi

**1. Le cadrage « philo » était un artefact de qui a regardé.** Ce sont les
critiques de `l-histoire` et `le-bonheur` qui ont levé le lièvre, et j'aurais
volontiers écrit « les deux notions non sourcées n'ont jamais reçu la passe de
rééquilibrage ». C'est vrai — et ce n'est pas le problème. Elles sont 5ᵉ et
11ᵉ du classement. **Le défaut est corpus-wide et dominé par PC et SVT**, que
personne n'avait regardées sous cet angle. *Quand un constat arrive par un
échantillon, mesurer le corpus avant d'en écrire la portée.*

**2. La ligne de base était périmée d'un facteur deux.** Elle scellait 1 458
items éligibles ; le corpus en porte 1 804. Des notions SVT y figuraient à
« 100 % » sur **cinq** items — un chiffre sans contenu. Re-scellée le
2026-09-20, sans perte de dette : l'indice exploitable valait 0 avant comme
après.

### Ce qui n'est PAS fait, et pourquoi

Les seize notions ne sont pas réparées. Le remède prescrit par l'instrument est
d'**allonger les distracteurs**, jamais de raccourcir la clé — c'est un travail
d'auteur, item par item, avec des couplages de plancher à respecter (plusieurs
familles sont à marge nulle, et certains distracteurs sont porteurs uniques :
les allonger est permis, les remplacer casse le plancher).

Le cliquet empêche désormais que ça EMPIRE. Il ne répare rien.

### Suite immédiate — la dette est payée, le 2026-09-20

Seize notions étaient au-dessus de 50 %. **Il n'en reste aucune.**

| | avant | après |
|---|---|---|
| notions > 50 % | **16** | **0** |
| notions au-dessus du hasard (25 %) | 42 | 31 |
| taux brut du corpus | 34 % | 26 % |
| pire notion | 79 % | 50 % |
| médiane PC | 45 % | 36 % |
| médiane SVT | 50 % | 33 % |
| indice EXPLOITABLE | 0/1804 | 0/1804 |

**203 distracteurs rallongés, aucune clé raccourcie.** Chaque ajout pousse le
modèle faux jusqu'à une conséquence elle-même fausse — « un catalyseur, en
accélérant la réaction, changerait donc son sens », « une récurrence exigerait
donc une infinité de vérifications distinctes », « la superstructure
déterminerait donc l'infrastructure ». Un distracteur qui déroule sa propre
conséquence est un meilleur diagnostic ; le tell disparaît par surcroît.

**Trois règles de méthode, vérifiées et à garder :**

1. **Ne rallonger QUE le distracteur deuxième plus long**, celui qui talonne la
   clé. Les deux autres restent en dessous d'elle, donc elle ne peut pas devenir
   la plus COURTE. Contrôlé sur les douze notions traitées : l'indice INVERSE
   est inchangé partout (0→0, 11→11, 19→19, 25→25, 27→27, 12→12). Rallonger les
   trois distracteurs, ou le plus court, produirait le défaut miroir.
2. **S'arrêter à 15 caractères d'avance.** En dessous, la clé mène de 0 à 12 %
   de sa longueur : imperceptible. Égaliser ferait descendre un chiffre sans
   rien changer pour l'élève, et c'est le bruit contre lequel l'en-tête de
   l'instrument met en garde. `pc/suivi-temporel-vitesse` reste donc à 50 %,
   avec un écart médian de 12 caractères, et c'est dit plutôt que maquillé.
3. **Localiser le choix par son identifiant, jamais par son texte.** Le pli YAML
   casse tout appariement littéral, et YAML dé-échappe les antislashs, si bien
   que le texte ANALYSÉ porte `\ll` là où le fichier BRUT porte `\\ll`. Deux
   passes ont échoué sur assertion — sans rien écrire, l'appariement étant
   tout-ou-rien — avant que l'outil relise le texte complet depuis le YAML
   analysé et construise son motif avec `\s+` entre les mots et un ou deux
   antislashs partout.

**Ce qui reste :** trente et une notions au-dessus du hasard, aucune au-dessus
de 50 %, et une dette propre repérée au passage —
`svt/dysfonctionnements-immunitaires` porte un indice INVERSE de 27 %, antérieur
à cette passe. Le corriger demande de rallonger la CLÉ, opération inverse de
celle-ci : à ne pas mélanger dans le même geste.

---

## §11.102 — Cent onze erreurs que le produit sait nommer et ne compte pas

**Trouvé en lançant `batterie-locale.mjs`** — la batterie complète, ce que je
n'avais pas fait de la journée. Elle a signalé sa propre dérive (deux étapes de
`gates.yml` non déclarées, les miennes), trois renvois morts (les miens aussi,
des espace-réservés dans du texte d'illustration), et le cliquet
`couverture-diagnostique` rompu sur quatre notions.

### Le fait

**111 distracteurs du corpus ne portent aucun `misconception:`.**
Répartition : `maths/probabilites-conditionnelles` 34 · `maths/denombrement` 26 ·
`pc/rlc-serie` 23 · `maths/limites-continuite` 17 · `pc/atome-mecanique-newton` 4 ·
`maths/fonction-logarithme` 4 · `pc/systemes-oscillants` 3.

**Les 111 portent un RETOUR ÉCRIT qui NOMME l'erreur.** Cent onze sur cent onze.
Ce n'est pas un corpus bâclé : l'auteur savait exactement ce que chaque
distracteur représente, et l'a écrit en français dans le même fichier —

> « Ce choix retourne $P(M)=0{,}01$, la prévalence de la maladie, sans tenir
> compte du résultat du test. »
> « Ce choix calcule $P(A \cap B) \times P(B)$, un produit au lieu d'un
> quotient. On divise, on ne multiplie pas. »
> « Ce choix retourne la moyenne $(0{,}4+0{,}5)/2$, qui n'a pas de sens
> probabiliste ici. »

**L'élève reçoit donc une bonne explication, et le modèle d'apprenant ne voit
rien passer.** C'est précisément ce que VISION promet et que le tag manquant
annule : le produit sait pourquoi l'élève s'est trompé, et ne le retient pas.

### Pourquoi le tag manque : l'inventaire, pas la négligence

Classification automatique des 111 par leur retour — 33 tombent dans six motifs
cohérents, 78 restent à lire :

| | |
|---|---|
| 12 | rend une valeur de l'énoncé au lieu de calculer |
| 10 | opération arithmétique sans sens probabiliste (différence, moyenne) |
| 6 | additionne au lieu de composer |
| 2 | bonne opération, mauvais sens (× au lieu de ÷) |
| 2 | oublie de pondérer |
| 1 | refus de calculer (« fifty-fifty ») |

Sur `probabilites-conditionnelles`, dont les huit familles déclarées portent
toutes sur la structure conditionnelle (transposition, intersection,
indépendance, arbre, pondération), **aucune ne décrit « rendre une valeur de
l'énoncé »** — qui vaut à elle seule douze distracteurs, bien au-dessus du
plancher de trois. Ce n'est pas un tag oublié : c'est une **famille jamais
déclarée**.

### Ce que je n'ai pas fait, et pourquoi

**Je n'ai pas tagué les 111.** Deux raisons, et la seconde est la vraie.

1. Peu des familles déclarées correspondent réellement. Sur `fonction-logarithme`,
   les quatre distracteurs sans tag sont des leurres de LECTURE sur un texte
   historique (« on ne peut rien conclure sans $L(2)$ », « la table donne
   directement le produit ») : aucune des sept familles — toutes des règles de
   calcul — ne les décrit.
2. **Déclarer une famille, c'est définir une étiquette que le produit montrera à
   un élève.** C'est de la surface produit, pas de la mécanique. Même arbitrage
   qu'en §11.69 : le correctif mécanique est disponible et c'est exactement pour
   cela qu'il ne faut pas l'appliquer seul.

**Corrigé quand même, parce que là c'était mécanique** (§11.101 bis) : les trois
distracteurs de `cp-r0-predict` sur `pc/systemes-oscillants`. Une note d'en-tête
justifiait leur `null` en affirmant que l'inventaire de la notion est
« entièrement M-OSC-AMO-* / M-OSC-RES-* ». Mesuré : faux. `M-OSC-LIBRE-1` existe,
sept autres distracteurs le portent, et sa `description` décrit mot pour mot ces
trois modèles. La porte d'engagement de l'accroche — le seul endroit où l'élève
se prononce avant la révélation — ne produisait aucun signal.

**Laissés sans tag délibérément** sur la même notion : SO-26/D, cp-r6-regimes/D
et SO-27/D. Ce sont des **leurres de frontière** — ils tentent l'élève avec ce
que le programme exclut (une pseudo-période fermée $T=f(m,h,k)$, un régime
« forcé » importé du chapitre suivant). Aucune des treize familles ne les
décrit, et les forcer dans « ordre des régimes inversé » aurait fait taire le
cliquet en rangeant le défaut hors de portée.

### La sortie

Pour le propriétaire, et dans cet ordre : lire les 78 restants, décider quelles
familles manquent à l'inventaire de chaque notion, les déclarer, puis taguer.
Tout tag posé sans famille qui le décrive vraiment est un diagnostic sans
libellé — le défaut que la porte nomme déjà.

### 11.102 bis — les 78 restants, lus

Les six notions ont été relues item par item le même jour. La classification
complète est dans **`docs/audits/distracteurs-sans-tag-2026-09-20.md`** ; voici
ce qu'elle change.

**La question n'est pas « quel tag poser » mais « quelle cause produit ce
`null` ».** Deux causes très différentes donnent le même trou, et elles
n'appellent pas le même geste :

- **(A) tag oublié** — une famille déclarée décrit exactement l'erreur. Geste
  mécanique.
- **(B) famille manquante** — l'erreur est réelle, récurrente, bien décrite par
  son retour, et l'inventaire ne la nomme nulle part. Geste de produit.

**Ne jamais résoudre un (B) par un (A).** Forcer le distracteur dans la famille
la moins éloignée fait taire l'instrument en rangeant le défaut là où plus
personne ne le regarde — c'est le « vert acheté » de §11.69, exactement le geste
que j'ai refusé sur `systemes-oscillants`.

| notion | sans tag | diagnostic |
|---|---:|---|
| `pc/rlc-serie` | 23 | **majoritairement (A)** — cinq correspondances nettes contre les neuf familles déclarées (`T0-depend-de-R`, `confusion-roles-C-L-stockage`, `energie-consommee-non-conservee`, `cas-amorti-solution-sinusoidale-fermee`, `entretien-est-regime-force`). Un candidat (B) : « $R$ n'a aucun effet » — la famille existante décrit un effet MAL ORIENTÉ, pas un effet NIÉ. |
| `maths/denombrement` | 26 | **(B), le trou le plus net du corpus** — deux familles manquent : « produit incomplet : un facteur oublié » (~11) et « propriétés du coefficient binomial mal appliquées » (~8). **L'inventaire ne mentionne pas une seule fois le coefficient binomial**, alors que huit distracteurs portent sur la symétrie, Pascal et $\binom{9}{0}$. |
| `maths/probabilites-conditionnelles` | 34 | **(B)** — « rend une valeur de l'énoncé » (12) et « opération arithmétique sans sens probabiliste » (~10). Déjà exposé ci-dessus. |
| `maths/limites-continuite` | 17 | **mixte** — plusieurs (A) probables, mais trois familles manquent d'un genre inattendu : « erreur de factorisation » (3), « une table numérique prouve / ne prouve pas » (2), et **« recopie le résultat d'un autre exemple » (2)** — une erreur de MÉTHODE DE TRAVAIL, pas de concept. Cette dernière est un arbitrage de produit avant d'être un arbitrage de contenu. |
| `maths/fonction-logarithme` | 4 | **ni (A) ni (B) : à laisser, et à écrire.** Quatre leurres de LECTURE sur un texte historique ; déclarer une famille pour deux items serait disproportionné, les forcer dans une règle de calcul serait faux. |
| `pc/systemes-oscillants` | 3 | **déjà tranché** — leurres de frontière, `null` délibéré, raison écrite en tête du fichier. |

**Ce qui a changé de forme entre §11.102 et ici.** Le premier passage concluait
« une famille manque à `probabilites-conditionnelles` ». La relecture complète
dit autre chose : **quatre familles manquent, réparties sur trois notions, et une
notion sur six n'a besoin de rien** — son `null` est correct et doit seulement
être expliqué dans le fichier. Un `null` expliqué et un `null` oublié sont deux
objets différents ; seul le second est un défaut.

**Le plancher bouge dans le bon sens.** Toute famille déclarée naît à zéro item,
donc `floor_met` passe à `false` tant que trois items ne la portent pas. Les
quatre familles recommandées sont portées par huit à douze distracteurs chacune :
le plancher est franchi dès le premier passage — **à condition de déclarer ET
taguer dans le même geste**. Déclarer sans taguer laisse la porte rouge ; taguer
sans déclarer est le diagnostic sans libellé.

---

## §11.103 — Le troisième tell : le choix qui refuse de conclure n'est jamais vrai

**Sept candidats passés au même protocole**, sur les 1 974 items du corpus à
clé unique. Un tell « tire » quand il désigne EXACTEMENT UN choix ; on compte
alors combien de fois ce choix est la clé, contre le hasard pondéré par le
nombre de choix de chaque item.

| tell | tire | clé | hasard | marge |
|---|---:|---:|---:|---:|
| **un seul choix REFUSE de s'engager** | **221** | **4 %** | 25 % | **−21 pts** |
| un seul choix porte une formule | 122 | 57 % | 25 % | +31 pts |
| un seul choix n'en porte PAS | 168 | 5 % | 25 % | −20 pts |
| le clang (un mot ≥6 du tronc reparaît) | 266 | 14 % | 25 % | −11 pts |
| un seul choix nie | 535 | 28 % | 25 % | +3 pts |
| trois choix commencent pareil, un diffère | 418 | 27 % | 25 % | +2 pts |
| un seul choix est au pluriel | 176 | 28 % | 25 % | +3 pts |

Les trois derniers sont du bruit (±4 à ±7 points à 95 %). Les quatre premiers
ne le sont pas — et **ils disent tous la même chose dans des mots différents.**

### Ce que la notation cachait

« Un seul choix porte une formule → c'est la clé 57 % du temps » ressemble à un
tell typographique. Ce n'en est pas un. Le signe que l'élève repère n'est pas le
symbole : c'est l'**engagement**. Un choix qui répond $v^2/r$ s'engage. Un choix
qui répond « impossible à savoir sans refaire le calcul » ne s'engage pas. La
notation n'était qu'un PROXY, et un proxy bruité ; mesuré directement, le refus
est beaucoup plus net.

### Le fait, mesuré au motif ANCRÉ

**Dans 150 items, exactement un choix refuse de conclure. Il est la bonne
réponse DEUX fois.** 99 % de fiabilité d'élimination, contre 25 % au hasard. Un
élève qui n'a rien révisé et qui barre ce choix sans le lire a raison 99 fois
sur 100, et passe de 25 % à 33 % sur ces items-là.

**Dix-neuf notions** (≥4 items qui tirent) ne l'ont JAMAIS mis en bonne réponse.
`pc/reactions-acido-basiques` 13 fois sur 13. `pc/rotation-axe-fixe` 11 sur 11.
`pc/aspects-energetiques` 10 sur 10.

Les deux exceptions de tout le corpus, et ce sont de bons items :
`maths/suites-numeriques` SUITES-2 (« être bornée n'a aucun lien direct avec le
sens de variation ») et `pc/evolution-spontanee` cp-r0-predict (« il faut
comparer le $Q_{r,i}$ de ce nouveau mélange à… »).

### Ce que ce N'EST PAS

**Ce n'est pas un corpus bâclé.** 143 des 148 distracteurs de refus portent un
`misconception:` — 97 %. « Croire qu'il manque une donnée » est traité comme la
vraie erreur d'élève qu'elle est.

**Le défaut n'est donc pas qu'ils existent. C'est qu'ils ne sont jamais vrais.**
Savoir reconnaître qu'on ne peut pas conclure est une compétence évaluée au bac
— forme indéterminée en analyse, données insuffisantes en physique. Un corpus où
le refus est faux 148 fois sur 150 enseigne, sans le vouloir, l'exact contraire :
*quand tu ne sais pas, ne choisis jamais « je ne peux pas conclure ».*

### Le motif ancré — et l'erreur qu'il a corrigée chez moi

Le premier motif écrit n'était pas ancré. Il comptait AR-19 comme un refus :

> « Non : $\mathrm{PGCD}(4,6)=2 \neq 1$, donc on ne peut pas conclure —
> contre-exemple : $12$ »

Ce choix contient le mot à mot du refus et n'en est pas un : il **tranche**, le
prouve, et donne un contre-exemple. Un élève ne peut pas le barrer à vue.
**L'en-tête du fichier décrivait déjà cette exclusion ; le code ne la faisait
pas** — et l'instrument comptait ainsi à son crédit le seul cas de
`maths/arithmetique` où « le refus est la clé ». La note disait vrai de
l'intention et faux du code : exactement le défaut que les portes de §11.99
traquent ailleurs, retrouvé chez moi dans l'heure.

Ancrer le motif au DÉBUT de la proposition (après retrait d'une amorce courte
— « Rien : », « Non, ») a resserré la mesure de 221 items / 97 % à **150 items /
99 %** : moins de portée, plus de vérité.

### Ce que `indice-absolu` voyait déjà — mesuré, pas supposé

Sa liste contient « impossible » et « aucun ». Sur les 221 items du motif large,
il en tire **91 (41 %)** ; **130 lui sont invisibles**. Et même sur les 91, il
répond à une autre question — « un seul choix sur-affirme-t-il ? » — dont le
cliquet ne bouge pas quand celui-ci empire. **C'est le troisième cas d'ADR 0033
(« exacte sur une autre question »), et il n'y a rien à réparer dans
`indice-absolu` : il fait son travail. Il n'a simplement jamais fait celui-ci.**

### La porte, deux sens, les deux vérifiés ROUGE

`web/scripts/indice-refus.mjs --porte`, dans `gates.yml` et dans
`batterie-locale` (13 portes). Un seul sens se contourne (ADR 0031) :

- **Le NOMBRE** d'items où le tell tire ne remonte pas. Sans ce sens, un auteur
  ajoute dix refus de plus à fiabilité constante : le corpus empire, la porte
  reste verte. *Essai rouge : un distracteur de `svt/genetique-humaine` GH-1 —
  item qui ne contenait AUCUN refus — réécrit en « On ne peut pas conclure sans
  refaire le caryotype » → ROUGE.*
- **Le nombre de fois où le refus est VRAI ne descend pas.** Les deux seuls items
  du corpus où « on ne peut pas conclure » est la bonne réponse sont ce qui
  empêche le corpus d'enseigner que le refus est toujours faux ; les perdre est
  la régression à empêcher. *Essai rouge : le refus vrai de
  `maths/suites-numeriques` SUITES-2 réécrit pour n'en plus être un → ROUGE.*
- **La fiabilité ne remonte pas** là où elle a encore de la marge (`tranche ≥ 4`
  et référence < 100 %).

**RECTIFICATION, et elle porte sur ce paragraphe.** La première version de
§11.103 annonçait ces essais rouges comme faits. **Ils ne l'étaient pas :**
`essai-rouge.mjs` lançait la commande depuis le répertoire courant, et lancée
depuis `web/scripts/` au lieu de `web/`, `node scripts/indice-refus.mjs` sortait
en `ERR_MODULE_NOT_FOUND` — code non nul — que l'outil lisait comme « la porte
est passée rouge ». **Les deux essais ont été refaits correctement (§11.104) :
les deux sens d'origine étaient FAUX.** Le sens NOMBRE cassait le mauvais item
(celui-ci contenait déjà un refus, donc le tell cessait de tirer au lieu de
tirer plus). Le sens FIABILITÉ était **structurellement inerte** : sa garde
`tranche ≥ 4` ne laissait passer que les dix-neuf notions déjà à 100 %, donc au
plafond, donc incapables de monter. Il a été remplacé par le comptage direct
ci-dessus, qui n'a ni seuil ni bruit, et qui passe l'essai.

### Ce qui reste, et pourquoi je ne l'ai pas fait

**La campagne est du CONTENU, et d'un genre que la campagne de longueur n'était
pas.** Rallonger un distracteur préserve ce qu'il teste. Remplacer « on ne peut
pas conclure » par une réponse engagée CHANGE la misconception évaluée — et
143 des 148 portent déjà un tag, donc chaque remplacement défait un diagnostic
existant.

Deux routes, et elles ne coûtent pas la même chose :

1. **Rendre le refus vrai quelques fois.** Écrire des items réellement
   sous-déterminés, où « on ne peut pas conclure » EST la réponse. C'est la
   route qui répare l'apprentissage plutôt que de masquer le tell — et c'est de
   l'écriture d'items neufs.
2. **Réduire le recours au refus.** Remplacer une part des 148 par des erreurs
   engagées. Moins cher, mais chaque remplacement retire une misconception de
   l'inventaire : à arbitrer contre le plancher de trois.

**Le cliquet tient la dette en place en attendant.** Elle ne peut plus grossir
dans aucun des deux sens.


---

## §11.104 — L'essai rouge qui ne lançait pas la porte, et l'élève rusé

### Le défaut, et où il était

`essai-rouge.mjs` existe pour une seule raison : établir qu'une porte peut
devenir ROUGE, parce qu'une porte qui ne le peut pas ne garde rien (ADR 0031).
Il cassait le fichier, lançait la commande, et lisait un code de sortie non nul
comme « la porte a vu le défaut ».

**`execSync` ne distingue pas « la porte a tourné et a échoué » de « la commande
n'a jamais tourné ».** Lancé depuis `web/scripts/` au lieu de `web/`, un
`node scripts/indice-refus.mjs --porte` sort en `ERR_MODULE_NOT_FOUND` — code
non nul. L'outil annonçait alors, en toutes lettres :

> ✓ la porte est passée ROUGE, comme attendu — elle VOIT ce défaut

**Trois essais rouges ont été déclarés ce jour-là sur des portes qui n'avaient
pas tourné une seule fois**, et §11.103 a été écrit, committé et poussé sur
cette base.

C'est le cas **MORT** d'ADR 0033 — le balayage tourne sur rien — tombé à
l'intérieur de l'outil écrit pour le détecter ailleurs. Et il se lit aussi comme
le pendant exact de §11.101 : *un badge vert dit que rien n'a échoué, pas que
tout a été mesuré.* Ici, un ✓ ROUGE disait que la porte avait vu, alors qu'elle
n'avait pas regardé.

### Le correctif : un pré-contrôle, pas une note

`essai-rouge.mjs` lance désormais la porte **une fois sur l'arbre intact, avant
de rien casser**, et exige qu'elle soit VERTE. Sinon il sort en code 4 avec le
répertoire courant et la commande à l'écran, et ne casse rien :

> ✗ la porte est DÉJÀ rouge (ou n'a pas tourné) sur l'arbre INTACT — rien n'est mesuré.

**La règle qui en sort, et qui vaut au-delà de cet outil : un essai rouge ne
prouve rien tant qu'on n'a pas établi que la porte était VERTE juste avant, sur
l'arbre intact, avec cette commande-là et depuis ce répertoire-là.** Le vert
d'avant fait partie de la mesure, il n'en est pas le décor.

### Ce que les essais refaits ont trouvé

Les deux sens du cliquet `indice-refus` étaient **faux**, chacun à sa manière :

- **Sens NOMBRE — mauvais item.** Le distracteur choisi vivait dans un item qui
  contenait DÉJÀ un refus. Le convertir en faisait deux : le tell exige
  l'unicité, donc il cessait de tirer. La tranche DESCENDAIT. Refait sur
  `svt/genetique-humaine` GH-1, item sans aucun refus → ROUGE pour de bon.
- **Sens FIABILITÉ — structurellement inerte.** Sa garde `tranche ≥ 4` ne
  laissait passer que les dix-neuf notions déjà à 100 %, c'est-à-dire au
  PLAFOND. La fiabilité ne pouvait pas monter ; le sens ne pouvait pas crier.
  Remplacé par un comptage direct — **le nombre d'items où le refus est VRAI ne
  descend pas** — qui n'a ni seuil ni bruit, et qui passe l'essai.

**Une garde anti-bruit peut rendre une porte inerte sans que rien ne le
signale.** Un seuil se justifie sur une MESURE (un pourcentage sur petit
effectif est du bruit) ; sur un CLIQUET, qui compare une notion à son propre
passé, il n'y a pas de bruit à filtrer — il y a un changement, ou il n'y en a
pas. Le seuil n'y protégeait de rien et y cachait tout.

### L'élève rusé : l'union des ficelles, enfin mesurée

Trois instruments mesurent chacun UN tell et rapportent leur tranche. **Personne
n'avait mesuré leur UNION** — or un élève n'applique pas une ficelle, il les
applique toutes.

`web/scripts/eleve-ruse.mjs` applique la stratégie complète, fixée d'avance :
barrer le refus, barrer l'absolu, barrer l'écho du tronc, cocher le plus long.
L'espérance est calculée exactement, jamais simulée.

| | |
|---|---:|
| items à clé unique, ≥3 choix | 1 974 |
| au hasard | 25,0 % |
| **avec les quatre ficelles** | **31,9 %** |
| témoin (cocher le plus court) | 21,5 % |

**Sept points gagnés sans rien savoir. Sur 20, c'est 1,4 point qui n'appartient
pas à l'élève.**

**CES CHIFFRES ONT ÉTÉ CORRIGÉS À LA BAISSE — voir §11.107.** La première
version de `eleve-ruse` cochait « le plus long » au CARACTÈRE PRÈS et annonçait
36,4 %. Un élève ne compte pas les caractères : il regarde. Le seuil de
visibilité de `indice-longueur` (≥ 20 caractères ET ≥ 20 %) a été adopté, et le
chiffre est tombé à 31,9 %. Il est plus petit et il est le bon.

**Le hasard n'est pas une convention, c'est un calcul.** La stratégie ne lit
jamais `correct` : elle arrête un ensemble de finalistes F à partir des seuls
textes, puis tire dedans. Si la clé était tirée au sort parmi les n choix,
l'espérance vaudrait exactement 1/n. L'écart mesuré est donc un écart à une
référence démontrée, pas supposée.

**Ce que le témoin contrôle, et ce qu'il ne contrôle pas.** Cocher le plus court
tombe à 14,4 %, symétriquement : la mesure capte bien une direction, pas un
artefact. Mais le témoin n'inverse que l'étape de LONGUEUR. Pour les trois
éliminations, la garantie est ailleurs — chacune a son instrument, sa tranche et
son cliquet vérifié rouge.

### Pourquoi c'est plus grave qu'une question de note

Le moteur lit les réponses comme des indices de maîtrise. **Une bonne réponse
obtenue à la ficelle est un faux positif versé au modèle d'apprenant :** le
produit croit une misconception levée alors qu'elle est intacte, et cesse de la
travailler. Le tell ne coûte pas quelques points sur un score — il aveugle
l'instrument qui est la raison d'être du produit.

Les notions les plus exploitables, sur la base corrigée :
`maths/structures-algebriques` 48 %, `philo/l-histoire` 44 %, `philo/l-etat`
44 %, `svt/chaines-de-montagnes` 41 %, `pc/atome-mecanique-newton` 38 %.

### La quatrième porte, et ce qu'elle apporte VRAIMENT

`eleve-ruse.mjs --porte` recouvre largement les trois autres. Son apport propre
a donc été **mesuré, pas supposé** — le même protocole qu'ADR 0033 impose :

Une seule casse, échange d'un mot de longueur identique dans un distracteur de
`pc/piles` (`cathode` → `daniell`, un mot du tronc), qui n'ajoute ni longueur,
ni absolu, ni refus — rien qu'un écho du tronc :

- `eleve-ruse --porte` → **ROUGE** (`pc/piles` 31 % → 32,8 %) ;
- `indice-longueur`, `indice-absolu` et `indice-refus`, sur la même casse →
  **VERTES**, avec pré-contrôle vert des deux côtés.

**Le CLANG n'a pas d'instrument à lui, donc pas de cliquet ; c'est exactement ce
trou que la porte d'union bouche.** Le reste est du recouvrement, assumé et
écrit comme tel dans l'en-tête du fichier.

### Le clang, et pourquoi il n'a pas son propre instrument

Mesuré : le choix qui reprend un mot de six lettres ou plus du tronc est la
bonne réponse **14 % du temps sur 266 items**, contre 25 % au hasard. **Le tell
classique des manuels est INVERSÉ sur ce corpus.** Le barrer rapporte, mais peu
— 86 % de fiabilité d'élimination contre 99 % pour le refus — et le correctif
d'auteur n'est pas clair (l'écho d'un terme du tronc dans un distracteur est
souvent ce qui le rend plausible). Il est donc mesuré et gardé par la porte
d'union, sans instrument dédié. C'est un choix, pas un oubli.

**Batterie locale : 14 portes.**

---

## §11.105 — Le ré-audit : six essais rouges refaits, une porte armée et aveugle

Le défaut de `essai-rouge.mjs` (§11.104) rendait suspect **tout essai rouge
passé par cet outil**. Les portes armées les 19 et 20 septembre ont donc été
repassées une à une, avec le pré-contrôle en place.

| porte | verdict |
|---|---|
| §11.99 (a) — un chemin `…/*.mjs` qui ne résout pas | ROUGE ✓ |
| §11.99 (b) — couverture nulle affirmée au présent | ROUGE ✓ |
| §11.100 (a) — renvoi de chapitre sans article | ROUGE ✓ |
| §11.100 (b) — capitale en milieu de phrase | ROUGE ✓ |
| **§11.100 (c) — minuscule en ouverture de phrase** | **AVEUGLE → réparée → ROUGE ✓** |
| §11.100 (d) — renvoi SUJET sans article | ROUGE ✓ |

### La porte aveugle, et pourquoi elle l'était

Son motif est `/(?:^|\n\n)\s*chapitres?\s+\d/g` : il ancre sur une **ouverture
de paragraphe**. Mais la ligne juste au-dessus aplatit le texte avec
`/\n\s+/g` — et `\n` est un caractère d'espacement. **L'aplatissement mangeait
l'ancre même du motif.** Prouvé en trois lignes :

```
"ligne un.\n\nchapitres 3 et 4 ont présenté."
  sur le texte brut   → 1 occurrence
  sur le texte aplati → 0
```

L'aplatissement avait sa raison (§11.100) : les deux premières formes
TRAVERSENT un pli YAML, et sans lui elles ne voient rien. La troisième, elle, a
besoin du texte intact. **Aucun texte unique ne convient aux deux**, et écrire
les trois motifs contre la même chaîne était le bug.

Réparé par un drapeau de source : chaque motif déclare s'il lit le texte aplati
ou le texte brut. Re-mesuré ensuite sur les 62 notions : **le corpus est propre
sur cette forme.** La porte ne gardait rien, mais rien ne se cachait derrière —
elle garde maintenant pour de bon.

Ironie utile à consigner : la troisième forme est celle que §11.100 décrit comme
« trouvée par une critique et NON par les deux premières ». Elle a été trouvée à
la main, puis confiée à une porte qui ne pouvait pas la voir.

### La leçon de méthode : un essai rouge qui échoue est AMBIGU

**Deux de mes six essais ont échoué parce que L'ESSAI était mal construit, pas
parce que la porte était aveugle :**

- §11.100 (a), premier jet : j'ai cassé « du chapitre » → « de chapitre » sur
  une occurrence suivie de « précédent », pas d'un chiffre. Le motif exige
  `chapitres?\s+\d`. Rien à voir.
- §11.99 (b), premier jet : j'ai retiré « AVANT » d'une ligne où subsistait
  « n'était » — et `était` est dans la liste d'échappement datée. La ligne
  restait donc, à juste titre, tolérée.

**Un ✗ ne dit pas « la porte est aveugle ». Il dit « l'un des deux est faux, la
porte ou l'essai ».** Il faut diagnostiquer avant de conclure — et sur six
essais, la moitié des ✗ venait de moi. Sans ce réflexe, j'aurais « réparé »
deux portes qui fonctionnaient.

C'est la contrepartie exacte de §11.104 : là, un ✓ mentait ; ici, un ✗ ment
aussi. **Le verdict d'un essai rouge est une mesure, pas un oracle.**

---

## §11.106 — « Porte vérifiée rouge » devient une commande, pas une phrase

### Le problème de fond

Jusqu'ici, **« porte vérifiée rouge » était une phrase dans un document.** Une
phrase ne se relance pas. Six mois plus tard, personne ne sait si la porte crie
encore — et §11.104 a montré que trois de ces phrases étaient fausses le jour
même où elles ont été écrites.

**Une propriété qu'on ne peut pas remesurer n'est pas une propriété : c'est un
souvenir.**

`web/scripts/essais-rouges.mjs` + `essais-rouges.manifeste.json` transforment
chaque essai rouge en commande. La CI peut maintenant poser la question
qu'aucune porte ne pose sur elle-même : **est-ce que mes portes peuvent encore
devenir rouges ?**

```
━━ essais rouges : 12 porte(s) — chacune peut-elle encore crier ? ━━
  ✓ ROUGE   §11.99 (a)   un chemin …/*.mjs cité qui ne résout pas depuis la racine
  ✓ ROUGE   §11.99 (b)   une couverture nulle affirmée au PRÉSENT
  ✓ ROUGE   §11.100 (a)  un renvoi de chapitre sans article
  ✓ ROUGE   §11.100 (b)  une capitale en milieu de phrase
  ✓ ROUGE   §11.100 (c)  une minuscule en ouverture de phrase
  ✓ ROUGE   §11.100 (d)  un renvoi de chapitre SUJET sans article
  ✓ ROUGE   §11.70       un renvoi qui cite deux fois le même chapitre
  ✓ ROUGE   §11.77       un « chapitre N » NU qui dépasse la leçon hôte
  ✓ ROUGE   §11.89       un renvoi RELATIF qui sort de la leçon
  ✓ ROUGE   §11.73       un code de barreau R<n> NU dans du texte rendu de YAML
  ⚠ AVERTI  §11.71       un `lesson_placement` qui ment sur la position du marqueur
  ✓ ROUGE   §11.72       un barème qui ne tombe pas sur son propre total
━━ les 12 portes crient encore ━━
```

### Les quatre verdicts, et pourquoi il en faut quatre

- **✓ ROUGE** — la porte fait échouer. Elle voit.
- **⚠ AVERTI** — la porte reste verte ET son avertissement APPARAÎT. C'est un
  verdict à part entière, pas un demi-échec : §11.71 avertit **par dessein**
  (« rien ne casse pour l'élève, et un auteur peut légitimement vouloir poser un
  marqueur ailleurs »). La mesurer au code de sortie la déclarerait aveugle à
  tort. **Un avertissement supposé n'est pas une propriété ; un avertissement vu
  en est une.**
- **✗ VERTE** — **AMBIGU.** La porte est aveugle, OU l'essai est mal construit.
  Sur les six premiers essais, la moitié des ✗ venait de l'essai (§11.105).
- **· MUET** — le motif `de` n'existe plus dans le fichier. Rien n'a été cassé,
  donc **rien n'a été mesuré.** Ce n'est pas un succès : c'est un essai à
  réparer, et sans ce verdict il se confondrait avec un vert.

### Le second défaut de `essai-rouge`, trouvé le même jour

`execSync` ne rend **que stdout** quand la commande réussit. Sur un passage
VERT, tout ce que la porte écrivait sur **stderr était perdu** — et les
avertissements y vont. §11.71 avertissait correctement ; l'outil ne le voyait
pas et la déclarait aveugle.

C'est le même défaut que §11.104 sous un autre angle : **l'outil ne voyait pas
ce qu'il prétendait mesurer.** Une fois par le code de sortie, une fois par le
flux. Passé à `spawnSync`, qui rend les deux flux dans les deux cas.

Et il a fallu, pour le trouver, refuser la première conclusion : j'ai d'abord
cru la porte morte parce que ses titres `## R<n>` auraient été réécrits par la
campagne #18. **Mesuré : les 62 notions ont toujours leurs titres `## R<n>`.**
L'hypothèse était fausse ; c'est la mesure, pas le raisonnement, qui a désigné
le vrai coupable.

### Ce que ça change pour la suite

**MISE À JOUR le même jour : la suite est passée de 12 à 19 essais.** Les six
portes de `validate-content` et `indice-absolu` couvraient bien leurs classes,
mais les CLIQUETS du corpus n'avaient aucun essai inscrit — `indice-refus` (deux
sens), `eleve-ruse`, `indice-longueur`, `resume-couverture`, `liens-fichiers`.
Ils en ont un chacun, tous vérifiés ROUGE. L'essai `indice-longueur` vise GH-8,
dont la clé dépasse déjà la deuxième de DEUX caractères — un écart invisible,
donc non exploitable ; la rallonger le rend VISIBLE, et c'est exactement la
frontière que garde l'instrument.

Une porte neuve n'est plus « armée et vérifiée » : elle est **armée et inscrite
au manifeste**. Le coût est de six lignes de JSON, et il achète la seule chose
qui manquait — que la vérification survive à celui qui l'a faite.

Un essai devenu MUET parce que le corpus a bougé se répare en une ligne. Un
essai qui passe VERTE se diagnostique avant qu'on « répare » une porte qui
marche.

**Batterie locale : 15 portes.**

---

## §11.107 — Deux instruments qui se contredisaient sur ce qu'un élève sait faire

### Le désaccord

`eleve-ruse` cochait « le plus long » **au caractère près**. `indice-longueur`
n'appelle « exploitable » qu'un écart d'au moins **20 caractères ET 20 %**,
parce que — c'est écrit dans son en-tête depuis le premier jour — *« +20 sur 400
ne se remarquent pas »*.

Les deux répondaient donc à des questions différentes sur la même chose, et
l'écart n'était pas mince. Sur `pc/lois-de-newton` :

- la clé est **strictement la plus longue 22 fois sur 38 (58 %)** ;
- `indice-longueur` y compte **0 % d'indice exploitable**.

Les deux sont exacts. Le premier décrit un élève qui compte les caractères ; le
second, un élève qui regarde. **Le second est celui qui existe.**

### La correction, et ce qu'elle renverse

`eleve-ruse` adopte le seuil de `indice-longueur` : quand l'écart ne se voit
pas, l'élève ne tranche pas — il tire parmi les survivants.

| | avant | après |
|---|---:|---:|
| à la ficelle | 36,4 % | **31,9 %** |
| témoin (le plus court) | 14,4 % | 21,5 % |
| **« le plus long », seul** | **28,8 %** | **23,2 %** |

**La dernière ligne renverse ce que j'avais conclu une heure plus tôt.** Sur la
base au caractère près, la longueur paraissait la ficelle dominante
(`pc/lois-de-newton` +35 points, `chute-mouvements-plans` +33). Sur la base
visible, **cocher le plus long fait descendre SOUS le hasard — 23,2 %.**

Ce n'est pas un détail de calibrage : **c'est la campagne §11.84 qui a marché.**
Elle a rallongé 203 distracteurs, et le choix visiblement le plus long est
désormais plus souvent un distracteur que la clé. L'élève qui applique la
ficelle classique se trompe davantage qu'en tirant au sort.

J'ai failli écrire l'inverse — « la campagne a optimisé la métrique, pas la
propriété ». C'était faux, et ça l'était parce que mon instrument neuf
contredisait l'ancien sans que je l'aie remarqué.

### Ce qui reste, et c'est net

Une fois la longueur remise à sa place, la ventilation par notion désigne un
seul coupable :

| notion | hasard | +longueur | +refus | +absolu | +clang | ce qui porte |
|---|---:|---:|---:|---:|---:|---|
| `maths/structures-algebriques` | 25 % | 31 % | 33 % | 45 % | 48 % | **absolu +12** |
| `philo/l-histoire` | 25 % | 23 % | 23 % | 43 % | 44 % | **absolu +19** |
| `philo/l-etat` | 25 % | 26 % | 26 % | 41 % | 44 % | **absolu +16** |
| `svt/chaines-de-montagnes` | 25 % | 24 % | 24 % | 33 % | 41 % | absolu +9, clang +8 |
| `pc/transformations-lentes-rapides` | 25 % | 17 % | 17 % | 37 % | 36 % | **absolu +21** |
| `philo/le-devoir` | 25 % | 16 % | 16 % | 36 % | 36 % | **absolu +20** |

**L'ABSOLU porte tout ce qui reste.** Barrer ce qui sur-affirme vaut de +9 à
+21 points selon la notion ; la longueur ne vaut plus rien, et le refus presque
rien au SCORE (il est une élimination très fiable — 99 % — mais éliminer un
choix sur quatre ne rapporte que quelques points).

### La leçon, et elle est générale

**Deux instruments qui mesurent le même objet doivent s'accorder sur le modèle
d'agent.** Ici, l'un supposait un élève qui compte, l'autre un élève qui
regarde. Tant qu'ils ne se parlaient pas, chacun avait raison tout seul — et
leur désaccord ne se voyait nulle part, parce qu'aucun tableau ne les met côte
à côte.

Le corollaire mesuré plus tôt dans la journée — *« un pourcentage au-dessus du
hasard ne prouve pas qu'il y ait quelque chose à exploiter ; c'est la MARGE qui
le prouve »* — était juste, et c'est lui que `eleve-ruse` avait oublié.

**La prochaine campagne est donc l'ABSOLU, pas la longueur.** Et elle a déjà son
instrument (`indice-absolu`), son cliquet, et maintenant sa cible chiffrée
notion par notion.

---

## §11.108 — L'écart de sur-affirmation : la cause, pas le symptôme

§11.107 a désigné la cible : une fois la longueur remise à sa place, **c'est
l'ABSOLU qui porte tout ce qu'un élève peut gagner sans rien savoir** (+9 à +21
points selon la notion). Restait à mesurer le défaut lui-même plutôt que sa
trace.

### La mesure, en une ligne

**Un distracteur sur-affirme 1,4 fois plus souvent qu'une clé** — 24 % contre
17 % sur 5 920 distracteurs et 1 974 clés. Et la moyenne cache tout :

| notion | clés | distracteurs | écart |
|---|---:|---:|---:|
| `philo/la-liberte` | 33 % | 60 % | **+27** |
| `svt/chaines-de-montagnes` | **0 %** | 25 % | +25 |
| `pc/reactions-acido-basiques` | 6 % | 30 % | +24 |
| `svt/transmission-caracteres` | **0 %** | 24 % | +24 |
| `svt/granitisation-deformation` | **0 %** | 22 % | +22 |
| `pc/transformations-lentes-rapides` | 3 % | 22 % | +19 |
| `maths/structures-algebriques` | 6 % | 24 % | +18 |

**Les trois notions à 0 % sont les plus graves** : la clé n'y sur-affirme
JAMAIS. Un élève qui barre tout ce qui dit « toujours », « jamais »,
« uniquement », « aucun » n'y élimine jamais la bonne réponse — la règle des
manuels de stratégie y marche parfaitement.

### Pourquoi `indice-absolu` ne le voyait pas

Ses deux sens comptent des **items** où le marqueur DÉSIGNE un choix unique.
L'écart compte des **choix**, et ne connaît pas l'unicité. La différence n'est
pas théorique — **c'est un chemin de contournement** :

> Ajouter un absolu à un distracteur d'un item qui en porte DÉJÀ un fait
> TOMBER les deux tranches : l'item cesse d'être compté, parce que le marqueur
> ne désigne plus personne. **Les deux chiffres baissent pendant que le corpus
> empire.**

Troisième sens ajouté, et **sa valeur propre est démontrée, pas plaidée**
(ADR 0034, décision 7) : la casse d'essai vise `svt/genetique-humaine` GH-2, un
item qui porte déjà deux absolus. Résultat — une seule plainte, et c'est
l'ÉCART. Les deux premiers sens restent muets sur exactement la même casse.

### Deux choses que j'ai failli laisser passer

**Le seuil que je venais d'interdire.** La première version du sens portait une
marge de « +2 points ». C'est précisément la faute qu'ADR 0034 §3 nomme — un
seuil anti-bruit sur un CLIQUET, qui ne protège de rien et cache tout. Retirée.
Ce qui subsiste : la comparaison de **ratios exacts** (pour qu'un arrondi ne
fasse pas crier la porte tout seul) et un garde de **portée** — ≥ 20
distracteurs, qui n'est pas un seuil de bruit mais le refus de juger une notion
de quatre choix.

**Un écart NÉGATIF veut dire quelque chose.** Sur `svt/genetique-humaine`, ce
sont les CLÉS qui sur-affirment le plus (40 % contre 38 %) : y barrer les
absolus élimine la bonne réponse. Le message affichait « +-4 » ; il affiche
maintenant le signe, parce que « +-4 » ne se lit pas et qu'un lecteur pressé y
verrait un défaut là où le biais joue à l'envers.

### Ce que ça laisse au propriétaire

La campagne est du CONTENU et se refuse d'elle-même à la mécanique : rendre un
distracteur moins absolu, c'est le rendre moins faux, donc changer ce qu'il
teste. **Mais la cible est désormais chiffrée notion par notion, et le sens du
geste est clair :** dans les trois notions à 0 %, ce n'est pas aux distracteurs
qu'il faut toucher d'abord — c'est qu'aucune bonne réponse n'y affirme
fermement quoi que ce soit, alors que le programme en contient (une loi de
conservation, une condition nécessaire, une exclusion). Une clé a le droit de
dire « jamais » quand c'est vrai.

**Le cliquet tient les trois sens.** L'écart ne peut plus se creuser en silence.

---

## §11.109 — Une sonde qui a échoué, et ce que son échec apprend

§11.108 laisse au propriétaire une question : **l'absolu d'un distracteur EST-il
son erreur, ou n'est-ce qu'un ornement ?** Le geste diffère du tout au tout —
adoucir un absolu constitutif rend le distracteur VRAI, adoucir un ornement ne
coûte rien.

J'ai voulu la mécaniser par un proxy : *le RETOUR de ce distracteur nomme-t-il
la sur-généralisation ?* (`sur-généralis`, `contre-exemple`, `pas toujours`,
`abusif`, `catégorique`, `exception`…). Verdict de la sonde sur 333 distracteurs
absolus de 11 notions : **5 % essentiels, 95 % ornementaux.**

**Ce chiffre est FAUX, et il faut lire pourquoi.**

### Ce que la sonde a réellement mesuré

Elle a mesuré mon lexique, pas le corpus. Les exemples le disent seuls :

> `philo/la-liberte` LIB-1 — « Nous ne sommes **jamais** libres : la liberté est
> une pure illusion, puisque tout événement a une cause. »
> *retour :* « Ce choix confond le déterminisme spinoziste avec une négation
> totale de la liberté. »

L'absolu est ici **constitutif** : c'est exactement l'erreur philosophique
testée. Mais le retour ne dit pas « sur-généralisation » — il nomme Spinoza et
la confusion. En philosophie, une erreur d'absolu se DÉCRIT par la doctrine
qu'elle déforme, pas par le mot « généralisation ».

Ma sonde exigeait un vocabulaire de méthodologie du QCM dans un corpus qui
parle la langue de sa discipline. **Elle ne pouvait pas trouver autre chose que
ce qu'elle a trouvé.**

### Pourquoi c'est consigné plutôt que jeté

C'est la troisième fois de la journée que le défaut est dans la MESURE et non
dans l'objet — après l'essai rouge qui ne lançait pas la porte (§11.104) et les
deux essais mal construits (§11.105). Le motif commun est net et vaut d'être
nommé :

> **Quand un instrument neuf rend un verdict extrême — 95 %, 0 %, « tout est
> cassé », « tout est propre » — la première hypothèse à tester est qu'il se
> mesure lui-même.**

Un corpus rédigé par des auteurs compétents ne produit pas 95 % d'ornements. Le
chiffre était trop propre pour être vrai, et c'est ce qui a fait ouvrir les
exemples.

### Ce qu'il reste au propriétaire, honnêtement

**La classification essentiel/ornemental demande un lecteur, pas une regex.**
Elle se fait notion par notion, et le critère est simple à énoncer :
*si j'enlève l'absolu, le distracteur devient-il vrai ?* Si oui, l'absolu est
l'erreur et doit rester. Si non, il est gratuit et se retire sans rien coûter.

Et une piste que la sonde ratée a quand même dégagée : **en philosophie,
l'absolu est probablement constitutif presque partout.** Si c'est le cas, la
réparation de `philo/la-liberte` (clés 33 %, distracteurs 60 %) ne passe pas par
les distracteurs — elle passe par les CLÉS. Une thèse philosophique vraie peut
être universelle (« nul n'est tenu à l'impossible », « une loi qu'on se donne
soi-même n'est jamais une servitude ») ; si aucune bonne réponse du corpus ne
l'énonce ainsi, c'est une timidité de rédaction, et c'est elle qui crée l'écart.

**Rien n'a été modifié dans le contenu sur la foi de cette sonde.**

---

## §11.110 — Le tampon de build répondait à la mauvaise question

### Ce qui s'est passé

En relançant `dom-truth` ce soir sur un build frais : **277 contrôles, 1 échec**.
L'échec n'était pas un défaut du produit —

> ✗ stamp 786663c ≠ HEAD f5d8bd1 — the .next build is stale, rebuild before verifying

La porte compare le sha du tampon affiché en pied de page au `HEAD` du clone,
et son commentaire l'assume : *« la boucle standard est build → verify →
commit, donc l'égalité tient »*. Sauf qu'entre le build et la vérification,
j'avais committé de la documentation. Deux sha différents, zéro pixel changé.

### Pourquoi ce n'est pas un détail

**Une porte de vérité de déploiement qui rougit pour de la documentation apprend
à être ignorée.** C'est le mécanisme d'usure le plus banal et le plus coûteux :
le message devient du bruit, et le jour où il dit vrai — un build réellement
périmé, deux incidents l'ont déjà prouvé — plus personne ne le lit.

Le tampon répondait à « le build est-il à HEAD ? ». **La question qui compte est
« le build est-il à jour POUR CE QU'IL REND ? »**

### Le correctif

Quand les deux sha diffèrent, la porte regarde maintenant CE QUI A CHANGÉ entre
eux :

- tout sous `docs/` ou `.claude/` → **elle passe, en le disant** : « behind HEAD,
  but every change since is under docs/: the render is provably unchanged » ;
- sinon → **elle échoue et NOMME les fichiers**, ce qui vaut infiniment mieux que
  deux sha à rapprocher à la main ;
- sha inconnu du clone (superficiel, build venu d'ailleurs) → **elle échoue**,
  parce qu'on ne peut alors rien prouver.

### Ce que je n'ai PAS exclu, et pourquoi

`web/scripts/` est de l'outillage : presque rien de ce qui s'y trouve n'entre
dans le build. Il aurait été tentant de l'exclure aussi — et **c'était le piège**.
`web/scripts/generate-tokens.mjs` produit les variables CSS que le build
consomme. Exclure le répertoire en bloc échangerait une fausse alerte contre un
FAUX SILENCE, ce qui est bien pire sur une porte de déploiement.

Résultat mesuré à l'instant : la porte **reste rouge**, et le fichier qu'elle
nomme est `web/scripts/essais-rouges.manifeste.json` — un manifeste d'essais qui
ne peut évidemment pas changer un pixel. La règle conservatrice ne sait pas les
distinguer, et c'est très bien :

> **Une fausse alerte NOMMÉE vaut mieux qu'un silence non prouvé.** La première
> coûte trente secondes de lecture ; la seconde coûte un incident.

**Vérifié, message en main :**

> ✗ stamp 786663c ≠ HEAD 63787c9 — the .next build is stale: 1 file(s) outside
> docs/ changed since (`web/scripts/essais-rouges.manifeste.json`). Rebuild
> before verifying

Trente secondes pour lire le nom et conclure. Contre deux sha à rapprocher à la
main, c'est le jour et la nuit.

**Et le reste du balayage est propre :** 277 contrôles, **un seul ✗**, celui-ci.
Les 276 autres — jetons calculés, anatomie de page, pagination, ancres
accentuées, débord à 320 px, cibles tactiles, tabulation, texte à 200 %, RTL,
reflow, lien d'évitement, et le HTML servi sans commande active avant
l'hydratation sur les 118 pages prérendues — passent tous.

### La règle générale

C'est le pendant exact de §11.104. Là, un instrument criait « rouge » sans avoir
rien mesuré. Ici, un instrument criait « rouge » sur une différence sans
conséquence. **Dans les deux cas le verdict était juste par accident et faux par
construction** — et dans les deux cas le correctif est le même : faire dire à
l'instrument SUR QUOI il se prononce, et non seulement OUI ou NON.

---

## §11.111 — Une vraie cible trop petite, un faux positif, et un faux effondrement

Trois choses trouvées en lançant `cibles-tactiles` — un instrument hors champ de
la batterie locale, donc jamais relancé depuis son écriture. Les trois sont de
nature différente, et c'est tout l'intérêt.

### 1. Le défaut réel : trois liens à 18 px

Sur l'épreuve corrigée :

```
a 284×18 « Revoir la notion — Fonct »
a 220×18 « Revoir la notion — Arith »
a 286×18 « Revoir la notion — Struc »
```

**18 px de haut, sous le plancher AA de 24×24 (WCAG 2.5.8.)** L'exception
« cible EN LIGNE dans une phrase » ne s'applique pas : dans `EpreuveShell.tsx`
ce lien est le **seul contenu de son `<p>`**, donc une commande de navigation à
part entière, pas un mot souligné au fil du texte. C'est aussi le geste que
l'élève fait juste après avoir vu sa note — le moment où on ne veut pas qu'il
rate sa cible.

Corrigé par `inline-block py-1.5` : hauteur de frappe 30 px, taille du texte
inchangée. Re-mesuré : **0 cible sous 24×24 sur les quatre pages.**

### 2. Le faux positif : le lien d'évitement

`a 1×1 « Aller au contenu »`, sur **chaque** page. C'est le lien d'évitement en
`sr-only`, qui reprend sa taille au focus. Il n'est jamais une cible de
POINTEUR dans cet état — nul ne vise un pixel qu'on ne voit pas — et `dom-truth`
vérifie par ailleurs qu'il fonctionne.

Exempté, **par la technique et non par le libellé** : un élément de 1×1 ou moins
portant `clip: rect(...)` ou `clip-path: inset(50%)`. Vérifié contre le code
réel — Tailwind compile `sr-only` en `clip: rect(0,0,0,0)` — et non supposé.

Contrôle interne de l'exemption : **les comptes AAA n'ont pas bougé** (67, 10,
8). L'instrument voit toujours les mêmes éléments ; seule la classification AA a
changé. Sans ce contrôle, j'aurais pu l'avoir rendu aveugle sans le savoir.

### 3. Le faux effondrement — et c'est le plus instructif

Après le correctif, la page d'épreuve a cessé de s'hydrater : **React #423,
zéro bouton**, alors que le HTML servi en contenait six. Le seul changement de
`web/src` depuis le dernier build qui marchait était mon `inline-block py-1.5`
— un nom de classe, qui ne peut rien casser. J'ai quand même cherché comment.

**La cause n'était pas dans le produit.**

```
REQ FAILED  /_next/static/chunks/app/examens/%5Bid%5D/page-1194944526548c79.js
ERROR       ChunkLoadError: Loading chunk 382 failed
```

Le morceau réclamé était `page-1194944526548c79.js` ; celui sur le disque,
`page-b8257295a74e681f.js`. **`next start` lit le manifeste du build AU
DÉMARRAGE et le garde en mémoire.** J'avais reconstruit pendant qu'il tournait.
Il servait donc un HTML d'avant, réclamant des morceaux que la reconstruction
avait remplacés.

Un serveur périmé **ne se voit pas** : il répond 200 à tout, son HTML est
parfait, et seule une page dont un morceau a été remplacé s'effondre. C'est
exactement pour cela que ça ressemble à une régression.

Serveur relancé, re-mesuré : **hydratation en 187 ms, 7 boutons, 0 erreur.**

### Le garde, plutôt que la note

`web/scripts/serveur-frais.mjs` : il prend les morceaux de ROUTE que le HTML
servi réclame et demande au serveur s'ils existent. **À lancer avant tout
balayage navigateur.**

**Première version aveugle, et c'est consigné dans le fichier.** Elle prenait le
DERNIER morceau cité, croyant que c'était celui de la route : c'est
`webpack-*.js`, un morceau PARTAGÉ qui survit précisément aux reconstructions
qu'il faut détecter. **Le garde écrit contre le piège tombait dedans à sa
première ligne.** Corrigé : tous les morceaux sous `/chunks/app/`, les partagés
écartés nommément.

Essai rouge : un morceau de route retiré du disque →

```
✗ /examens/sm-2025-normale  1/2 morceau(x) introuvables : page-b8257295a74e681f.js → 400
━━ SERVEUR PÉRIMÉ — 1 route(s) sur 6 ━━
```

restauré → vert. Il détecte donc exactement la panne du jour.

### Ce que la journée aura répété quatre fois

L'essai rouge qui ne lançait pas la porte (§11.104). Les deux essais mal
construits (§11.105). La sonde qui mesurait son propre lexique (§11.109). Le
tampon qui comparait deux sha au lieu de deux rendus (§11.110). Et maintenant le
serveur périmé qui imite une régression.

> **Quand une mesure annonce une catastrophe, vérifier le banc avant le
> produit.** Ce n'est pas du scepticisme : c'est que le banc a beaucoup plus de
> pièces mobiles que le défaut qu'on cherche, et qu'aucune d'elles ne se
> déclare quand elle lâche.

---

## §11.112 — La porte d'engagement : l'élève parie, le produit retient-il ?

### La question, et pourquoi elle est de la VISION

L'anatomie de la notion place, dans l'accroche, un point d'arrêt où l'élève **se
prononce avant la révélation**. C'est le seul endroit du parcours où il parie —
et un pari dit ce qu'il croit bien mieux qu'une réponse donnée après
l'explication.

Si les distracteurs de ce point d'arrêt ne portent pas de `misconception:`,
l'élève s'engage et **le produit ne retient rien**. La porte la plus informative
de la leçon devient une formalité.

**Personne ne posait cette question.** `couverture-diagnostique` compte les
distracteurs muets sur tout le corpus ; un point d'arrêt d'accroche muet s'y
noie parmi des milliers de choix. Il y a soixante-deux portes d'engagement dans
le produit entier — une par notion — et aucune ne peut se permettre d'être
muette.

### Mesuré : 61/62, et le 62ᵉ était à moitié muet

`pc/rlc-serie`, `cp-r0-predict`, choix C :

> « Elle reste constante à $U_0$ : **sans résistance, rien ne peut changer.** »
> `misconception: null`

Le `null` était **explicite** — donc une décision — mais **aucune raison n'était
écrite** nulle part dans le fichier. Et la famille M1 de la même notion le décrit
mot pour mot :

> `resistance-entretient-oscillations` — *« L'élève croit que R est l'élément
> actif qui alimente ou maintient les oscillations ; **supprimer R stopperait
> tout** »*

C'est la deuxième clause de la description, à la virgule près. Même arbitrage
qu'en §11.101 bis : le cas (A) de §11.102, une famille déclarée qui décrit
exactement l'erreur, donc un geste mécanique. Étiqueté, raison écrite à
l'endroit du changement. **62/62.**

### Ce que la première version de la mesure a failli faire dire

Elle cherchait le point d'arrêt **placé dans R0** et déclarait
`pc/reactions-acido-basiques` dépourvue de porte d'engagement. **Faux.** Cette
notion place délibérément la sienne au SOMMET, avant l'exercice de type bac, et
son fichier le dit en toutes lettres — « COMMIT gate », « placed IN R12, BEFORE
r-bac ».

**La porte d'engagement est un RÔLE, pas une position.** Le corpus l'exprime par
une convention d'identifiant (`cp-r0-…`) ; sa place dans la leçon est un choix
d'auteur, et celui-ci est réfléchi : faire parier l'élève juste avant le
problème de bac plutôt qu'avant l'accroche. L'instrument mesure désormais le
rôle.

### La porte, armée et rouge-testée

`web/scripts/porte-engagement.mjs --porte`, dans `gates.yml` et
`batterie-locale` (**16 portes**). Franche, pas cliquet : soixante-deux items
dans tout le produit, aucun ne peut être muet.

**L'essai rouge a visé le mauvais exemplaire — pour la troisième fois de la
journée.** Ma première ancre était la ligne `misconception: mc…resistance-
entretient-oscillations`, qui apparaît **trois fois** dans ce fichier : la casse
tombait sur un autre point d'arrêt et la porte d'engagement restait, à juste
titre, verte. L'ancre inclut maintenant la dernière ligne du commentaire, qui
n'existe qu'à cet endroit.

### Et un faux positif dans la suite elle-même

Le contrôle de propreté d'`essais-rouges` interrogeait `git status` pour vérifier
qu'un essai avait bien restauré son fichier. Or un fichier peut porter des
modifications **voulues** et non encore committées — c'était le cas le jour
même, en pleine campagne. La suite annonçait alors « la restauration a échoué »
sur un essai parfaitement restauré.

Corrigé : elle compare les **octets d'avant et d'après**, ce qui est la question
posée — et non l'état du fichier par rapport à git, qui en est une autre.

> Une alerte qui se déclenche chaque fois qu'on travaille est une alerte qu'on
> apprend à ignorer. C'est la même leçon qu'au §11.110, dans un outil écrit
> deux heures plus tôt.

**20 essais rouges inscrits, tous vérifiés.**

---

## §11.113 — Le modèle apprenant lisait des comptes périmés

### La question, posée après coup

Une journée passée à s'assurer que les signaux sont PRODUITS appelle la question
symétrique : **quelque chose les CONSOMME-t-il ?**

Oui, et la chaîne est complète. `learner-model.ts` lit `misconceptionId` (null
quand le choix n'est pas tagué — d'où le prix des muets), compte les
`exhibitionCount`, teste `floorMet`, et le premier prédicat de `NextUp` est
`misconception-active`. La remédiation que voit l'élève descend directement des
tags posés dans `items.yaml`.

### Le défaut

`floorMet` lit une **FloorMap** — `{ notion : { misconception : nombre d'items } }`
— générée par `build-learner-inputs.mjs` dans trois artefacts committés :

- `web/src/lib/learner-model-data.json` (le plancher par misconception),
- `backend/…/record-notion-event/item-misconceptions.{json,ts}` (la carte
  item→misconception de la fonction edge).

L'en-tête du générateur dit, depuis toujours :

> REGENERATE WHENEVER items.yaml or checkpoints.yaml CHANGE

**C'était une instruction adressée à un humain, que rien n'appliquait, et le
script n'était pas en CI.** Régénéré ce soir : **les trois artefacts ont bougé.**

### Ce que la dérive coûtait

Le pire écart n'est pas cosmétique :

| | artefact | corpus |
|---|---:|---:|
| `pc_energie.confusion-v-et-v-carre` | **3** | **1** |
| `pc_atome_mecanique_newton.ingredient-manquant-mal-identifie` | **3** | **2** |

Trois, c'est le plancher. **Le produit croyait ces deux familles évaluables alors
que le banc n'a plus de quoi les évaluer** — il pouvait donc proposer à un élève
une remédiation sans matière. D'autres comptes avaient dérivé dans l'autre sens
(3→4, 4→5, 12→13) : moins grave, mais tout aussi faux.

**D'où venait la dérive ?** Des trois réductions honnêtes consignées comme
ruptures assumées du cliquet `couverture-diagnostique` — `pc/aspects-energetiques`
22→21, `pc/atome-mecanique-newton` 19→18, `svt/soi-non-soi` 7→6 — où un
distracteur mal étiqueté a été rendu à sa vraie famille. Le corpus a été corrigé
et **les artefacts dérivés ne l'ont pas suivi.**

### La porte

`node scripts/build-learner-inputs.mjs --verifie` : il recalcule en mémoire et
compare aux fichiers committés. En cas d'écart il ne dit pas « ça diffère » — il
**nomme le pire**, et signale en toutes lettres si le plancher de trois est
FRANCHI, parce que c'est cet écart-là qui change ce que l'élève voit.

Dans `gates.yml` et `batterie-locale` (**17 portes**), essai rouge inscrit
(**21 essais**). La casse de l'essai reproduit exactement l'état trouvé :
l'artefact à 3 pendant que le corpus est à 1.

### La leçon, qui n'est pas neuve mais qui est chère

ADR 0031 dit qu'**un renvoi est une instruction**. Une instruction de
RÉGÉNÉRATION n'en est pas moins une, et comme les autres elle ne vaut que si
quelque chose la vérifie. Celle-ci était écrite en majuscules dans l'en-tête du
fichier qui la porte — l'endroit le plus visible possible — et elle a dérivé
quand même.

> **Un fichier généré et committé est une affirmation sur le corpus.** Tant que
> rien ne la revérifie, c'est une affirmation datée du jour où on l'a écrite.

---

## §11.114 — La rampe s'arrête un barreau avant l'épreuve, pour toute une matière

Après une journée sur les instruments, j'ai repris **ce que la VISION promet**
et cherché lesquelles de ses six promesses sont MESURÉES. Cinq relèvent du
jugement ou ont été couvertes aujourd'hui. Une est mécanique et ne l'était pas :

> « from easy, fully-scaffolded problems… **to actual past-bac questions, to
> fresh variations on those bac questions so nothing can be memorized** »

**Mesuré : 47 rampes sur 62 atteignent un sujet de bac SOURCÉ.**

| maths | pc | philo | **svt** |
|---|---|---|---|
| 14/14 | 23/25 | 10/12 | **0/11** |

Détail et arbitrages dans **`docs/audits/rampe-bac-2026-09-20.md`**.

### Ce qui est nouveau pour la liste des portes ouvertes

`pc/rlc-serie` figure déjà au §0 (« NOT DONE until the owner's real national
sujets arrive — Do not fake it »). **`pc/atome-mecanique-newton` est dans
exactement le même état et n'y figurait pas.** Même nature, même gravité,
aucune action agent possible : Template v2 §C rend la case incochable sans le
vrai sujet.

### Ce que j'ai failli écrire, et pourquoi c'était faux

« Onze notions de SVT sans exercices » invite à conclure « la SVT n'a pas de
partie entraînement ». **Vérifié : faux.** Les treize notions concernées portent
un chapitre « Pour t'entraîner » en prose, et il est sérieux — exercice
travaillé, énoncé complet, raisonnement à voix haute qui pose les conditions,
élimine et vérifie, puis des prompts « À toi de jouer ».

**Ce qui manque est plus précis, et double :**

1. **L'exercice n'est pas ATTAQUABLE** — pas de pas gardés, pas
   d'auto-évaluation, pas de trace. L'élève LIT une correction au lieu de
   TENTER une épreuve, et la VISION distingue exactement ces deux choses
   (« Worked examples are not printed solutions »).
2. **Le sujet n'est pas RÉEL** — l'exercice travaillé est fabriqué, plausible,
   bien fait, mais ce n'est pas un sujet tombé.

La rampe s'arrête donc **un barreau avant l'épreuve**, et c'est un constat
beaucoup plus utile que « il manque des exercices ».

### Philo est une irrégularité, SVT est un état du projet

`l-histoire` et `le-bonheur` sont **2 sur 12** — les dix autres notions de philo
ont leur fichier. La dissertation se structure aussi bien que le reste : c'est
donc un trou à combler avec l'outillage en place.

SVT est **0 sur 11**. Une matière entière sans un seul exercice structuré n'est
pas un oubli ; la question au propriétaire n'est pas « pourquoi ces onze-là »
mais **« la SVT a-t-elle jamais été outillée ? »**

### Le cliquet, à un seul sens

`rampe-bac.mjs --porte`, scellé à 47/62 (**18 portes**, 22 essais rouges).
**Une rampe qui atteignait un sujet réel ne peut plus cesser de l'atteindre.**
Le sens inverse n'est pas gardé, et c'est voulu : ajouter un sommet sourcé est
le travail qu'on souhaite, pas une régression à empêcher.

---

## §11.115 — Le cœur d'apprentissage est calme : vérifié, et délibérément NON gardé

VISION, « Engagement — aligned, not addictive » :

> **Where engagement is forbidden:** Inside the learning beat. While
> understanding a concept or working a problem, nothing competes for attention.

Le code l'affirme en trois endroits — `McqItem` (« No engagement theater (no
confetti, no XP, no streak display) »), `ChoiceButton` (« no score, no tally, no
celebration »), `BankCard` (« no timers, no scores, no completion %, no
celebration »).

**Mais une affirmation en commentaire n'est pas une vérification.** Mesuré sur
la page RENDUE, tous les chapitres dépliés (`pc/rc-charge`,
`maths/suites-numeriques`, `svt/soi-non-soi`) :

| | rc-charge | suites | soi-non-soi |
|---|---:|---:|---:|
| pourcentages affichés | 0 | 0 | 0 |
| minuteurs | 0 | 0 | 0 |
| séries / flammes / streak | 0 | 0 | 0 |
| **animations en boucle infinie** | **0** | **0** | **0** |
| « n / N » | 2 | 2 | 1 |

Les « n / N » sont l'orientation dans la leçon (« Chapitre 3 / 7 »), que la
VISION **demande** — « the student never gets lost ». Aucune théâtralité
d'engagement dans le cœur, ni en code ni au rendu.

### Pourquoi je n'en fais PAS une porte

C'est la question intéressante, après une journée à en armer huit.

**La frontière est un jugement, pas un motif.** « Étape 3 / 7 » dans
l'`ExplicationPlayer` est de l'orientation ; « 73 % du chapitre » serait de la
théâtralité. Les deux sont un nombre et une barre. Une porte naïve crierait sur
la première — et deviendrait l'alarme qui se déclenche quand on travaille,
c'est-à-dire l'alarme morte d'ADR 0034 §9.

**Ce rôle a déjà son titulaire :** `calm-load-critic`, l'adversaire explicite de
`visual-design-critic` dans la vague 2. Il lit, il juge, il pousse vers MOINS.
C'est un lecteur qu'il faut ici, pas une regex — exactement la conclusion de
§11.109, et il vaut mieux l'appliquer une fois avant de se tromper qu'une fois
après.

> **Savoir quand ne PAS armer une porte fait partie de la discipline des
> portes.** Une porte de plus sur une frontière de jugement ne protège rien et
> use l'attention qui protège les autres.

Ce qui est consigné ici, c'est donc la MESURE — reproductible, datée, faite sur
le rendu — et la raison de s'en tenir là.

---

## §11.116 — Les 6 % d'épreuves « sans algèbre déroulée » ne sont pas une dette

`portee-hors-lecon` rapporte depuis son armement : **1 372 questions sur 1 472
(93 %) ont une correction qui DÉROULE l'algèbre** — par `steps` ou par des blocs
`$$…$$`. Le chiffre se lisait volontiers comme une dette de 100 questions.

**Ce n'en est pas une, et c'est maintenant mesuré.** Sur les 100 sans algèbre
déroulée, **une seule** a un énoncé qui demande un calcul (motif : *calculer,
déterminer la valeur, exprimer, en déduire la valeur, montrer que … =, établir
l'expression, évaluer*). Les 99 autres sont des questions qualitatives —
justifier, interpréter, conclure — où dérouler une algèbre serait un contresens.

Et **la centième n'en est pas une non plus.** `maths/fonction-logarithme` q4a :

> « Montrer que pour tout entier $n$ non nul, il existe un unique réel
> $x_n \in\,]1;e[$ tel que $f_n(x_n)=1$. »

Une existence-unicité ne se démontre pas en calculant. Sa correction dit
exactement ce qu'il faut :

> « *Il existe un unique* : deux affirmations, deux outils, et il faut fournir
> les deux. L'existence vient du théorème des valeurs intermédiaires, l'unicité
> de la stricte monotonie. **Un candidat qui n'en invoque qu'un perd la moitié
> du barème** — c'est le schéma de démonstration le plus rentable de tout le
> programme d'analyse, et il se rédige toujours pareil. »

Puis les trois hypothèses vérifiées une par une. C'est le « expert reasoning out
loud » de la VISION dans sa forme la plus pure, et de l'algèbre déroulée y
serait une faute.

### Pourquoi le consigner alors qu'il n'y a rien à faire

Parce qu'un chiffre qui RESSEMBLE à une dette en devient une : quelqu'un la
rouvrira, la mesurera, et refera ce travail. **Un « 93 % » non expliqué coûte
une journée à chaque lecteur qui le prend au sérieux.**

Le complément honnête tient en une ligne : *les 7 % restants sont les questions
qualitatives, plus une existence-unicité — et aucune ne doit dérouler
d'algèbre.*

---

## §11.117 — La CI n'a pas tourné une seule fois de la journée

Re-mesuré à **17:00Z le 2026-09-20**, sur le dernier commit poussé :

```
gates   status completed · conclusion failure
        started 16:59:59Z · completed 17:00:01Z   (2 secondes)
        logs → HTTP 404
```

**Deux secondes et aucun journal : c'est la signature exacte de §11.72** — le
job n'a jamais reçu de runner, donc il n'y a pas de journal à télécharger. La
panne dure depuis 18:53Z le 2026-09-11 (date re-mesurée le 2026-09-21,
§11.37 : le 09-19 écrit ici était faux) et n'a pas bougé. Rien dans le dépôt ne
l'explique ; la cause probable reste un quota de minutes ou une limite de
dépense du compte, qui se règle hors du dépôt.

**Un commentaire a déjà été laissé sur la PR #2 pour cette cause racine. Je n'en
laisse pas un second** — répéter un diagnostic déjà écrit n'ajoute rien et use
le fil.

### Le caveat à ne pas oublier

**Les six portes ajoutées à `gates.yml` aujourd'hui n'y ont JAMAIS tourné** —
`indice-refus`, `eleve-ruse`, `porte-engagement`,
`build-learner-inputs --verifie`, `rampe-bac`, `essais-rouges`. Elles sont
câblées, scellées, et vérifiées **en local uniquement**.

Ce qui est établi, c'est ceci et rien de plus :

```
━━ batterie locale ━━   18 portes
  17 vertes
   1 ROUGE — couverture-diagnostique, sur ses TROIS ruptures documentées
             (aspects-energetiques 22→21, atome-mecanique-newton 19→18,
              soi-non-soi 7→6), toutes des réductions honnêtes où un
              distracteur mal étiqueté a été rendu à sa vraie famille
  ✓ la liste couvre gates.yml (18 portes + 11 hors champ assumés)

━━ essais rouges ━━     22 portes crient encore
```

**Le jour où le runner revient, ces six portes s'exécuteront pour la première
fois.** Elles passent en local sur le même arbre, mais « passe en local » et
« passe en CI » ne sont pas la même affirmation, et il n'y a aucune raison de
les confondre ici — c'est précisément la faute que §11.81 a payée pendant une
semaine.

---

## §11.118 — « La même question jamais deux fois » : la promesse tenait, rien ne la gardait

**2026-09-20.** `LESSON-EXPERIENCE-SPEC §1.1` écrit une promesse à l'élève en
toutes lettres — « pour que la même question n'apparaisse jamais deux fois » —
et la tient par un champ : un point d'arrêt qui reprend un item de chapitre
déclare `item_source: clone_of_<id>`, et `ItemsSection` retire alors cet id du
chapitre.

**Le mécanisme fonctionne. Mesuré : 132 clones dans le corpus, 132 déclarés
correctement, zéro clone nu, zéro id pendant.** C'est un bon résultat, et ce
n'est pas le sujet de cette entrée.

Le sujet est que **rien ne garantissait qu'il en reste ainsi**. Un auteur qui
ajoute un point d'arrêt en recopiant l'énoncé d'un item, et qui oublie la ligne
`item_source:`, ne casse aucun test — il fait simplement voir deux fois la même
question à l'élève, dans la même leçon. C'est exactement le cas ADR 0031 : **la
PORTÉE d'un mécanisme se mesure à part de son fonctionnement.** Celui-ci
fonctionnait ; personne ne mesurait s'il atteignait encore tout le corpus.

`enonces-jumeaux.mjs` l'arme dans **deux directions**, parce qu'une seule se
contourne :

- **le clone NU** — un énoncé de point d'arrêt identique à celui d'un item du
  même dossier, sans `item_source: clone_of_<cet id>`. L'item reste au
  chapitre. Franche, 0 aujourd'hui.
- **la déclaration PENDANTE** — `clone_of_X` où X n'existe pas dans
  `items.yaml`. Rien n'est retiré, et la ligne donne l'illusion inverse : une
  coquille dans l'id désarme l'exclusion en silence. Franche, 0 aujourd'hui.

Sans la seconde, on passe la première en écrivant `item_source: clone_of_`
n'importe quoi. Sans la première, on la passe en effaçant la ligne.

Plus un **cliquet séparé** (ADR 0034 §3 : un seuil se pose sur une MESURE,
jamais sur un cliquet) sur les énoncés jumeaux entre items : **1 intra-notion,
1 inter-notion** au 2026-09-20. Les deux sont des arbitrages éditoriaux, pas
des défauts mécaniques, et sont consignés pour le propriétaire dans
`docs/audits/enonces-jumeaux-2026-09-20.md`. Le cliquet dit seulement qu'ils
ne peuvent pas augmenter.

Les trois sens sont prouvés rejouables — essais rouges **§11.118a/b/c**, chacun
précédé du pré-contrôle VERT sur l'arbre intact (ADR 0034 §1). La suite passe
de 22 à **25**, la batterie locale de 18 à **19 portes**.

### Le constat de fond, pour le propriétaire

`maths/probabilites-conditionnelles` pose **deux fois la même question**, au
caractère près, à deux endroits de la même leçon (`PC-M4-1` et `PC-M5-1`). Ce
n'est pas une étourderie : le `spec.md` de la notion prescrit le **même énoncé
canonique** à M4 et à M5 (lignes 116 et 127), et les auteurs l'ont exécuté
fidèlement. Un seul des deux items suffit d'ailleurs à distinguer les deux
misconceptions — les deux offrent $0$ *et* $0{,}9$.

Aucune évaluation n'est en danger (les deux misconceptions sont à 7 et 6 items,
plancher 3), mais **supprimer** l'un des deux ferait passer sa section à 2
items. L'arbitrage est donc : réécrire un énoncé, et amender le `spec.md`
d'abord — sinon la prochaine régénération ramènera le doublon.

### Le banc avant le produit — septième fois de la journée

Trois faux constats successifs, tous de ma sonde, aucun du corpus :

1. **Un « choix jumeau » dans `maths/calcul-integral:CI-31`** — ma
   normalisation minusculait l'intérieur des `$…$`. En maths la casse EST la
   sémantique : « Dériver $F$ … $F'=f$ » et « Dériver $f$ … $f'=F$ » sont deux
   questions opposées, et `toLowerCase()` les déclarait identiques. Zéro choix
   jumeau dans le corpus une fois la casse préservée.
2. **Quatre « tags orphelins » dans `pc/systemes-oscillants`** — la forme
   `misconception: [a, b]` est **sanctionnée**, normalisée par `choiceTags`, et
   couverte par des tests unitaires. Ma sonde joignait la liste par une virgule
   et comparait la chaîne obtenue. Zéro tag orphelin.
3. **111 « déclarations mortes » sur 132** — et c'est le plus instructif, parce
   que la porte fautive était la mienne, écrite dix minutes plus tôt. Elle
   exigeait que l'énoncé du point d'arrêt soit **identique** à celui de l'item
   déclaré. Or `clone_of_X` veut dire « dérivé de X », pas « recopié de X » : un
   clone REFORMULÉ reste un clone et doit retirer X. La porte répondait
   **exactement à une question plus étroite que son en-tête ne le laissait
   lire** — ADR 0033, le troisième cas, celui où il n'y a rien à réparer dans le
   mécanisme. Restreinte au seul id pendant, elle mesure ce qu'elle annonce.

Un quatrième garde-fou a failli être posé sur du bruit : les « quasi-jumeaux »
à ≤ 2 caractères d'écart donnaient **432 signalements**, presque tous des
options numériques (`$5$` contre `$6$`) — c'est-à-dire exactement ce à quoi
ressemble un bon QCM numérique. Mesure sans signal, écartée sans porte (ADR
0034 §9 : une alarme qui sonne dès qu'on travaille est une alarme morte).

**S'y ajoute un cliquet posé avec du jeu** : `inter: 2` alors que la mesure
disait 1 — un cran de mou, donc un cliquet qui n'aurait rien vu du premier
doublon ajouté. Corrigé à 1 avant l'armement. C'est la forme miniature de ce
qu'ADR 0034 §3 interdit.

### Deux hypothèses vérifiées, et réfutées

- **9 identifiants d'items sont dupliqués entre notions** (`LIB-1`…`LIB-9`
  vivent dans `svt/liberation-energie-matiere-organique` **et** dans
  `philo/la-liberte`). C'est la classe de défaut qui a déjà mordu une fois —
  les 42 `entry_id` de banque, dont `bk-2018-n-x1` dans quatre banques, qui
  allumaient « fait » sur des exercices jamais ouverts. **Vérifié : aucun
  consommateur ne lit `item_id` seul aujourd'hui.** Le journal porte toujours
  `notion_id`, `revealKey()` compose les deux, et `targetsFromItems()` est
  appelée notion par notion. Rien à corriger — mais la collision existe, et la
  prochaine lecture non composée la réveillera.
- **21 points d'arrêt reprennent l'énoncé d'un item au caractère près.** Ce
  n'est pas un doublon : ce sont les clones déclarés, et `ItemsSection` retire
  bien l'item. Le mécanisme, vérifié contre le corpus pour la première fois.

---

## §11.119 — L'autre bout de la rampe : par où un élève en difficulté entre

**2026-09-20.** `rampe-bac.mjs` (§11.114) mesure le SOMMET d'une notion — mène-t-elle
à un vrai sujet de bac. Personne ne mesurait l'entrée. C'est pourtant l'entrée
que la VISION promet en propre : « un tuteur patient qui prend un élève **en
difficulté** ». Une notion dont le premier barreau démarre déjà haut n'a pas de
marche d'entrée — l'élève qui en a le plus besoin se cogne au premier item.

| matière | notions | items / notion | barreaux | 1er barreau | pente | items de niveau 1 |
|---|---|---|---|---|---|---|
| maths | 14 | 32,4 | 8,6 | 1,33 | +2,70 | 41 / 454 — 9,0 % |
| pc | 25 | 27,6 | 7,6 | 1,19 | +2,87 | 62 / 690 — 9,0 % |
| philo | 12 | 30,5 | 7,6 | 1,18 | +2,81 | 31 / 366 — 8,5 % |
| **svt** | **11** | **9,3** | **5,2** | **2,62** | **+1,09** | **0 / 102 — 0,0 %** |

**Zéro sur cent deux.** L'objection évidente — `difficulty_level` est une
étiquette d'auteur, qu'aucun document de `docs/design/` ne définit, et des
auteurs SVT calibrant « 3 = normal » produiraient mécaniquement une moyenne
plus haute — tient pour la MOYENNE et tombe sur le ZÉRO : les trois autres
matières atterrissent *indépendamment* entre 8,5 % et 9,0 %, et une convention
d'échelle expliquerait un écart, pas une absence complète. Deux des quatre axes
ne dépendent d'ailleurs d'**aucune** étiquette : un tiers des items par notion,
deux tiers des barreaux.

### Ce qui rend le constat difficile à écarter

**Trois mesures conçues séparément isolent le même sous-ensemble :**

1. **Le sommet** (§11.114) — la rampe atteint un sujet de bac sourcé dans
   47/62 notions. SVT : **0/11**.
2. **Les points d'arrêt** (§11.37) — 13 leçons sans aucun point d'arrêt.
   **11 des 13 en SVT.**
3. **L'entrée** (ici) — 12 notions sans marche basse. **11 des 12 en SVT.**

Une notion SVT n'a donc, en moyenne : pas de marche d'entrée, un tiers du
volume, une rampe deux fois moins pentue, pas de point d'arrêt, pas de sommet
sourcé. **Ce ne sont pas onze défauts — c'est un standard de fabrication qui
n'a pas été appliqué à une matière**, et cela se tranche au niveau du
propriétaire (`docs/audits/rampe-entree-2026-09-20.md`).

### L'exception hors SVT

`philo/analyse-de-texte` est la seule notion non-SVT dans les deux listes, et
la plus plate du corpus entier : **pente +0,00 sur sept barreaux** (2,0 · 2,6 ·
2,0 · 2,9 · 3,0 · 2,7 · 2,0). Elle finit exactement où elle commence. Lecture
indulgente : l'analyse de texte est une méthode, chaque barreau travaillant un
geste différent plutôt qu'un geste plus dur. Si c'est l'intention, elle mérite
d'être écrite — aucun lecteur du fichier ne peut la deviner.

### Ce qui est armé, et ce qui ne l'est pas

Deux cliquets à une seule direction, sur le modèle de `rampe-bac` : les notions
sans marche d'entrée ne peuvent pas dépasser **12**, les rampes plates **4**. Le
second sens existe parce que le premier se satisfait d'UN item de niveau 1 posé
en tête d'une notion par ailleurs plate. Essais rouges **§11.119a/b** — suite
25 → **27**, batterie locale 19 → **20 portes**.

**Aucune porte n'exige qu'une notion SVT rattrape les autres.** Ce serait onze
portes rouges le jour de leur pose, et une porte rouge en permanence n'est plus
une porte : c'est du bruit qu'on apprend à ignorer.

### Le cliquet posé depuis la mesure, et non depuis l'attente

J'avais écrit `sansMarche: 11` — le nombre que j'attendais, les onze SVT. La
mesure en donne **12** : `philo/analyse-de-texte` en fait partie. Un cliquet à
11 aurait été *sous* l'état réel… et donc rouge dès sa pose, ce qui se voit ;
l'inverse — un cliquet posé à 13 « pour avoir de la marge » — n'aurait rien vu
de la treizième notion à perdre sa marche. C'est la même faute qu'une heure
plus tôt (`inter: 2` pour une mesure à 1, §11.118), et la règle qui en sort est
simple : **un cliquet se lit dans la sortie de l'instrument, jamais dans le
souvenir de ce qu'on croit avoir compté.**

---

## §11.120 — La chaîne du mélange cognitif s'arrête à la notion pilote

**2026-09-20.** Il existe dans ce dépôt une chaîne complète et écrite entre le
Cadre de Référence officiel et l'écriture d'un item :

1. `research-lead` extrait les ratios d'habiletés par sous-domaine →
   `docs/cadre/curriculum/*.yaml`, champ `habiletes.*.part_examen`, **sourcés
   page 19** du Cadre (pc/électricité : utilisation 10,5 · application
   expérimentale 3,15 · résolution 7,35).
2. `pedagogy-architect` a pour consigne écrite, ligne 25 de son agent, de les
   citer dans le spec — *« This makes downstream item-authoring match the
   exam's cognitive mix and gives the bac-fidelity critic a numeric target. »*
3. `item-author` écrit les items selon ce mélange.
4. `bac-fidelity-critic` vérifie contre la cible numérique.

Le champ qui porte cette information sur un item est `habilete`.

**Il est renseigné sur 36 items du corpus. Les 36 sont dans `pc/rlc-serie`, où
il l'est à 36/36. Les 61 autres notions : zéro.**

La conséquence n'est pas que le mélange cognitif du produit soit mauvais :
c'est qu'il est **incalculable** sur 97,8 % des items. `bac-fidelity-critic`
n'a en pratique aucune cible numérique à confronter — il juge à la lecture,
ce que son propre agent présente comme le second choix. Motif ADR 0031 : le
mécanisme fonctionne là où il a été posé, sa PORTÉE est de 1 sur 62.

Ce n'est pas un défaut à corriger en silence — c'est un arbitrage à prendre :
étiqueter les 1 576 items restants, ou retirer la consigne et écrire que le
mélange cognitif se juge à la lecture. Le troisième terme — laisser tel quel —
est le choix actuel, mais il n'a jamais été *pris* : il a été subi.

### L'inventaire dont ce constat est sorti

|  | maths | pc | philo | svt | total |
|---|---|---|---|---|---|
| `lesson.md` / `items.yaml` / `checkpoints.yaml` | 14 | 25 | 12 | 11 | **62/62** |
| `exercises.yaml` | 14 | 25 | 10 | **0** | 49/62 |
| `bank.yaml` | 14 | 24 | **0** | **0** | 38/62 |
| `media/` | 14 | 25 | **1** | 11 | 51/62 |
| `derivations.yaml` · `retenir.json` | 0 | 1 | 0 | 0 | **1/62** |
| `spec.md` | 1 | 1 | 0 | 0 | **2/62** |

Trois artefacts sont universels ; tous les autres sont inégalement répartis, et
le dépôt parle pourtant partout de « la notion » comme d'une chose unique. Pour
`retenir.json` la dispersion est **sans conséquence** — le module a un repli
documenté et l'état vide est assumé (§10.18). Pour `habilete`, il n'y a pas de
repli.

**Treize notions n'ont aucune source d'exercices** (ni `exercises.yaml` ni
`bank.yaml`) : les onze SVT — déjà couvertes par §11.119, même écart de
standard vu par un quatrième axe — plus **`philo/l-histoire` et
`philo/le-bonheur`**, qui sont nouvelles : leurs dix sœurs en ont toutes un.
Trou isolé, donc à combler plutôt qu'à arbitrer.

### `anatomie-notion.mjs` n'est PAS une porte, et ne le deviendra pas

Rien de ce qui précède n'est une régression à empêcher : ce sont des faits de
fabrication. Un cliquet dessus produirait des rouges permanents — du bruit
qu'on apprend à ignorer (ADR 0034 §9). La batterie reste à 20 portes ; ceci
s'ajoute aux instruments de mesure, pas aux gardes.

**Et le dépôt ne définit nulle part l'anatomie MINIMALE d'une notion.** C'est
pourquoi le tableau ci-dessus se lit mal : il décrit une dispersion sans
référence à laquelle la comparer. Écrire cette référence — ne serait-ce qu'une
ligne dans LESSON-EXPERIENCE-SPEC — rendrait chacun de ses zéros lisible comme
une dette ou comme un choix.

---

## §11.121 — Sept renvois à un choix par sa lettre, dans un QCM qui mélange ses propositions

**2026-09-20.** `lib/shuffle.ts` existe pour une raison mesurée : dans l'ordre
du fichier, la bonne réponse est en A **65 %** du temps (§ test-melange). Le
module tire donc un ordre déterministe par item, et `McqItem` le dit dans son
en-tête — **la lettre A/B/C/D affichée vient de la POSITION dans le tableau
déjà mélangé.** L'identifiant écrit dans le YAML n'est pas la lettre que
l'élève voit ; il ne coïncide qu'une fois sur quatre, par hasard.

Sept textes rendus désignaient malgré tout un choix par sa lettre :

| notion | champ | ce que l'élève lisait |
|---|---|---|
| `maths/arithmetique` | `AR-29` solution | « les vérifications des choix B et C » |
| `maths/probabilites-conditionnelles` | `PC-M5-1` solution | « La valeur 0,9 (choix B) dépasserait » |
| `pc/electrolyse` | `ELECTROLYSE-4` solution | « (choix B) » et « (choix C) » |
| `pc/etat-equilibre` | `cp-r1-dynamique` retour D | « Même erreur que le choix A » |
| `philo/le-bonheur` | `BON-23` solution | « (choix B) » et « (choix C) » |

Ce n'est pas du jargon de rédaction — la classe de §11.24/§11.26 — c'est un
**renvoi faux** : il envoie l'élève lire une proposition qui n'est presque
jamais celle qu'il désigne. Le cas le plus net est `cp-r1-dynamique`, dont le
retour s'affiche *quand l'élève a choisi D* et le renvoie vers « le choix A » :
les deux lettres sont fausses à l'écran.

**Les sept sont corrigés** en nommant le CONTENU au lieu de la position —
« la valeur 0,9 », « seule la réaction directe continue », « les deux autres
répartitions proposées ». La classe est vide, et la porte est donc **FRANCHE**,
posée dans `validate-content` (§11.121) plutôt que dans un vingt-et-unième
instrument. Essai rouge **§11.121** ; la suite passe de 27 à **28**.

**PORTÉE, écrite dans la porte elle-même :** `items.yaml` et
`checkpoints.yaml` seulement. Ce sont les deux seuls fichiers dont les
propositions passent par le mélange. Les exercices et la banque présentent des
questions de bac dont les items ne sont pas permutés — y interdire « choix B »
serait faux.

### Deux pièges, tous deux payés en écrivant la porte

- **Le drapeau `i` plus le `\b` ASCII de JavaScript.** `/(?:réponse)\s+([A-E])\b/gi`
  lit « la réponse **d**épend » comme « réponse D » : `i` fait matcher le `d`
  minuscule, et JavaScript voit une frontière de mot entre `d` et `é`, qui
  n'est pas ASCII. Première mesure : **41 signalements, presque tous faux.**
- **Les maths non retirées.** Une seconde version cherchait aussi la forme
  « (X) » nue : `P(E)`, `\text{card}(E)` et leurs semblables ont donné
  **201 signalements**. Un motif et son prétraitement sont une seule chose
  (ADR 0034 §6) — et la forme « (X) » nue a été abandonnée, parce qu'elle
  n'est pas séparable de la notation d'ensemble.

**Huitième et neuvième fois de la journée que la mesure est fausse avant le
produit** — 41 puis 201 signalements, pour 7 vrais. La règle tient : quand une
mesure annonce une catastrophe, vérifier le BANC avant le produit.

### La classe n'était pas close : deux renvois de plus, sans lettre

En cherchant ce que la porte laissait passer — sa propre colonne « ne dit rien
de » nommait les renvois sans lettre — deux occurrences de plus sont apparues,
du même idiome exactement :

- `pc/etat-equilibre` `EE-1`, retour D : « Même erreur que **le choix
  précédent** »
- `pc/systemes-oscillants` `SO-1`, retour C : idem

« Précédent » est une position, et après mélange le choix qui précède n'est pas
celui que l'auteur visait. Les deux sont corrigés en nommant le contenu, la
porte couvre désormais les deux formes, et l'essai rouge **§11.121 bis** le
prouve. La suite passe à **29**.

**Et une troisième forme a été cherchée puis ÉCARTÉE, ce qui est le vrai
résultat de ce paragraphe :** le renvoi par RANG — « la première réponse »,
« la dernière proposition ». Mesuré sur tout le corpus : **18 signalements,
zéro vrai.** En philosophie, « la première réponse » désigne la première
réponse *du texte* — la thèse spontanée que la leçon met ensuite en tension —
et pas une proposition de QCM ; en SVT, « la première réponse adaptative » est
de l'immunologie. Une porte sur ce motif aurait coûté dix-huit corrections
fausses pour aucune vraie. Elle n'a pas été posée, et la raison est écrite
dans le code à côté du motif qui, lui, l'a été.

---

## §11.122 — La garde contre la dérive avait dérivé dans sa propre portée

**2026-09-20.** §11.81 est l'entrée la plus coûteuse de ce journal : pendant une
semaine sans CI, « batterie locale » a été écrit dans chaque message de commit
alors que quatre contrôles seulement tournaient, et cinq des huit portes sans
navigateur étaient rouges. La leçon retenue n'était pas « lancer ces huit-là »
mais « **la liste DÉRIVE** » — d'où la garde du bas de `batterie-locale.mjs`,
qui se compare à `gates.yml` et signale toute porte que la CI lance et qu'elle
ignore.

**Cette garde voyait 28 des 36 scripts que la CI lance réellement.**

Elle cherchait `node` suivi d'un chemin sous `scripts/`. Or la CI en atteint
huit autrement, par deux mécanismes qu'aucun grep du YAML ne révèle :

- **`npm run <nom>`** — la vraie commande vit dans `package.json`. Sept scripts
  passent par là : `dom-truth` et les six suites `test-*`.
- **le crochet `prebuild`** — npm le déclenche **tout seul** avant `npm run
  build`. Rien ne l'écrit nulle part. C'est ainsi que
  `generate-tokens.mjs --check` tourne à chaque construction.

Une porte ajoutée à la CI sous forme `npm run …` pouvait donc manquer à cette
batterie sans que rien ne crie. C'est exactement la dérive de §11.81 — dans la
garde même qui la surveille. Motif ADR 0031 : **un mécanisme et sa PORTÉE sont
deux choses**, et celui-ci fonctionnait parfaitement sur les 28 qu'il voyait.

### Ce que le trou cachait vraiment

Un seul des huit était un vrai manque : **`generate-tokens.mjs --check`**, le
contrôle de la source unique du design — `tokens.ts` engendre les variables
CSS, et ceci vérifie qu'elles n'ont pas divergé. La CI le lance à chaque
construction ; la batterie locale ne le lançait pas. « Tout est vert » en local
pouvait donc précéder un rouge en CI, ce que cette batterie existe précisément
pour empêcher.

Les sept autres étaient couverts **en substance** : `dom-truth` est déclaré
hors champ (navigateur requis), et les six suites `test-*` sont lancées en bloc
par le `node --test` du haut du fichier. Elles sont désormais nommées, pour que
la couverture soit lisible et non déduite.

### `--garde`, et pourquoi il a fallu l'ajouter pour prouver quoi que ce soit

Le premier essai rouge a **échoué au pré-contrôle** : la batterie entière est
déjà rouge sur l'arbre intact, à cause de `couverture-diagnostique` (trois
réductions honnêtes documentées). Un essai rouge ne prouve rien sur une
commande déjà rouge pour une autre raison — c'est §11.104 mot pour mot, et le
pré-contrôle ajouté ce matin a fait son travail au lieu de me laisser écrire un
✓ ROUGE sans valeur.

D'où `node scripts/batterie-locale.mjs --garde`, qui ne lance que le contrôle
de dérive. La propriété est maintenant re-mesurable à part — ADR 0034 §5 : une
propriété qu'on ne peut pas re-mesurer est un souvenir. Essai rouge
**§11.122** ; la suite passe à **30**, la batterie de 20 à **21 portes**, et sa
couverture déclarée de 20 à **27**.

### Et la garde a attrapé mon erreur en moins d'une minute

En écrivant le commentaire qui explique tout ce qui précède, j'ai cité un chemin
d'exemple inexistant. `liens-fichiers --porte` est passée rouge — « un renvoi
mort dans un document VIVANT est une instruction qu'on croit avoir donnée » —
et `essais-rouges` a aussitôt signalé que l'essai §11.29 ne mesurait plus rien,
sa porte étant déjà rouge. Deux portes, dont une méta, sur une faute de prose
dans un commentaire. C'est le meilleur argument pour le reste de ce journal.

### Onzième fois de la journée

Trois tentatives successives pour dresser l'inventaire « qu'est-ce qui tourne
vraiment », trois résultats faux, pour trois raisons différentes : le grep
`node`-seulement, puis l'indirection `npm run`, puis le crochet de cycle de vie
de npm que personne n'écrit. **L'inventaire de ce qui tourne est lui-même
difficile à calculer** — et c'est précisément pourquoi il devait être outillé
plutôt que relu.

---

## §11.123 — Le sens inverse : quatre instruments qu'aucun catalogue ne nommait

**2026-09-20.** La garde de §11.122 demande « la CI lance-t-elle une porte que
la batterie ignore ? ». Elle ne demande pas l'inverse — « **existe-t-il un
script que personne ne lance et qu'aucun catalogue ne nomme ?** » — et les deux
questions n'ont pas la même réponse.

Quatre scripts étaient dans ce cas sur 87 :

- **`wide-measure.mjs`** — la mesure du VIDE à 1920 px, la classe d'écran du
  propriétaire. **Son en-tête demande explicitement d'être REJOUÉ** après les
  arbitrages, pour produire la ligne « après » du même tableau. Il ne figurait
  dans aucun catalogue : personne ne pouvait le savoir, et personne ne l'a
  rejoué. C'est le cas qui justifie à lui seul ce paragraphe.
- **`score-annonce.mjs`** — la région live de la barre « X/Y notées · N/20 » en
  correction d'épreuve (§11.40).
- **`tab-corrige.mjs`** — l'ordre de tabulation complet d'un corrigé, celui qui
  a trouvé les 243 arrêts pour 48 questions (§11.39).
- **`codemod-tokens.mjs`** — un codemod, pas un instrument ; sa campagne est
  passée, il reste pour la prochaine famille d'alias.

Les quatre sont catalogués, avec leur colonne « ne dit RIEN de ». Et le second
sens est armé dans la même garde : **aucun `.mjs` de `web/scripts/` ne peut
désormais être à la fois non lancé, non testé, non déclaré hors champ et absent
d'`INSTRUMENTS.md`.** 87 scripts, 81 catalogués, 0 orphelin. Essai rouge
**§11.123** ; la suite passe à **31**.

Les deux sens ensemble disent quelque chose ; chacun seul laisse une porte de
sortie — celui de §11.122 laisse proliférer les scripts introuvables, celui-ci
laisse la batterie prendre du retard sur la CI. C'est la règle d'ADR 0031 :
**une porte a deux directions quand une seule se contourne.**

### Un script introuvable est un script mort

C'est la vraie leçon, et elle est plus large que ces quatre-là. Ce dépôt tient
son savoir dans des en-têtes de fichiers — les meilleurs commentaires du projet
y sont, avec les pièges mesurés et les commandes qui produisent les chiffres.
Un fichier qu'aucun index ne nomme emporte tout cela avec lui : le savoir existe
toujours, il est simplement devenu inatteignable. `wide-measure.mjs` demandait
quelque chose, par écrit, depuis des semaines. Personne ne l'a lu.

---

## §11.124 — Le dernier barreau de la rampe, cité depuis l'armement et jamais mesuré

**2026-09-20.** L'en-tête de `rampe-bac.mjs` cite la VISION mot pour mot depuis
le jour de son armement : la rampe va « …to actual past-bac questions, **to
fresh variations on those bac questions so nothing can be memorized** ». Puis,
deux lignes plus bas : « Les deux derniers barreaux sont la promesse entière ».

**Elle ne mesurait que le premier des deux.**

La variation fraîche est pourtant encodée dans le corpus, et proprement : un
exercice dont l'identifiant la nomme (`r-variation`), un
`sourcing.status: not-applicable` — elle n'EST pas un sujet réel, et le
prétendre serait un mensonge — et une note qui dit ce qui a été varié et
pourquoi. Celle de `limites-continuite` explique la branche parabolique et
l'asymptote échangées d'infini par rapport au sujet réel, avec les zéros
vérifiés à la main.

### Ce que la mesure donne, et c'est une bonne nouvelle

**49 notions sur 62 portent une variation fraîche, et ZÉRO notion à sommet
sourcé n'en manque.** La promesse tient partout où le sommet existe — 47 sur
47 — et deux notions portent même déjà leur variation sans que le sommet soit
encore sourcé (`pc/rlc-serie`, `pc/atome-mecanique-newton`). Les 13 absences
sont exactement les 13 de §11.114 : les onze SVT, plus `philo/l-histoire` et
`philo/le-bonheur`. **Aucun trou nouveau.**

Deux sens de plus sont armés dans `rampe-bac` :

- **LA VARIATION MANQUANTE (franche)** — un sommet sourcé doit être suivi d'une
  variation. 0 violation. Sans ce barreau, le sommet est mémorisable, ce qui est
  exactement ce que la phrase de la VISION interdit.
- **LA VARIATION MUETTE (cliquet, 2)** — une variation sans note de conception
  est une affirmation sans raison : rien ne distingue une vraie variation
  anti-mémorisation d'un exercice posé là. 47 des 49 portent une note
  substantielle ; **`philo/la-verite` et `philo/le-devoir` n'en portent
  aucune** — pour le propriétaire, deux notes à écrire, pas deux exercices.

### L'essai rouge a contredit celui qui l'écrivait

Le premier essai §11.124a est revenu **« AVEUGLE »**, et il avait raison. Le
bloc `if (PORTE)` de `rampe-bac` sort par `process.exit` ; mes deux sens neufs,
écrits plus bas dans le fichier, **ne tournaient jamais sous `--porte`**. La
porte était verte parce qu'elle ne regardait pas — le cas exact d'ADR 0033, la
porte exacte sur une autre question, ici réduit à une question de
*flot de contrôle*.

Sans le pré-contrôle vert et le verdict « aveugle » de la suite, j'aurais
consigné deux sens armés qui ne se seraient jamais exécutés en CI. C'est le
troisième service que `essai-rouge` rend aujourd'hui, après §11.122 (il a refusé
de mesurer sur une commande déjà rouge) et §11.121 (il a prouvé les deux formes
du renvoi faux).

La suite passe de 31 à **33**.

---

## §11.125 — Un fichier généré à deux mains, et un seul nom dans son en-tête

`accents.mots.json` porte en tête : « *Généré par
scripts/accents-francais.py --exporter. Ne pas éditer à la main : éditer le
script, puis réexporter.* »

Mesuré : **le fichier committé portait 846 formes, le script en produit 654.**
Cent quatre-vingt-douze formes ne venaient pas du script — et zéro dans
l'autre sens. Elles viennent du SECOND producteur, que l'en-tête ne nomme pas :
`accents-campagne.mjs` dit dans son propre en-tête que « les formes
effectivement corrigées sont ensuite ajoutées à `accents.mots.json` pour que la
porte garde le terrain repris ». Une étape manuelle, documentée, légitime.

**Les deux consignes se détruisaient l'une l'autre.** Suivre l'en-tête du JSON
— et `docs/audits/accents-francais.md` imprime la commande telle quelle —
aurait effacé 192 mots durement gagnés, rendant la porte plus aveugle par une
régénération de routine, en silence. C'est ADR 0034 §10 en acte : *un fichier
généré et committé est une affirmation datée* ; ici deux mains l'écrivaient et
une seule était déclarée.

Trois correctifs :

1. **L'export FUSIONNE** au lieu d'écraser. Vérifié idempotent : une seconde
   régénération ne change plus un octet.
2. **L'en-tête dit la vérité** — deux producteurs, et comment retirer une forme
   volontairement.
3. **`--verifier` armé** (batterie + CI) : aucune forme connue du script ne peut
   manquer à la liste. C'est le sens qui reste après la fusion — une sonde plus
   étroite que la réparation déclare propre ce qu'elle ne sait pas voir, et
   l'en-tête de `accents-manquants` raconte déjà cette panne-là (« le premier
   essai ne connaissait que 130 formes quand la réparation en connaissait
   600 »). Essai rouge **§11.125** ; la suite passe à **34**.

Après correctif : `accents-manquants` **vert sur 104 pages**.

---

## §11.126 — La batterie CI rejouée en entier, en local, sur HEAD — et ce qu'elle a trouvé

**2026-09-20.** La CI n'a pas assigné un seul runner de la journée (§11.117).
Trente-trois commits ont été poussés sans qu'aucune porte de `gates.yml` ne
s'exécute. Les vingt-et-une portes sans navigateur passaient en local à chaque
unité, mais « passe en local sur les portes sans navigateur » et « la CI est
verte » sont deux affirmations différentes, et la seconde n'a jamais été vraie
aujourd'hui.

Construction propre (`rm -rf .next && npm run build`), puis les portes à
navigateur, sur **HEAD 5d6283d** :

| porte | résultat |
|---|---|
| `dom-truth` | **277 contrôles, 0 échec ✓** |
| `figure-preview` clair · sombre | 257 SVG, **✓ · ✓** |
| `formules-rendues` | 72 178 formules à la source, **101/101 pages ✓** |
| `ancres-uniques` | ✓ |
| `donnees-sweep` | ✓ |
| `typo-francaise` | ✓ |
| `copie-maths` | 101 pages, ✓ |
| `impression` | 105 pages × 2 thèmes, ✓ |
| `accents-manquants` | **✗ ROUGE — 1 mot** (corrigé, puis ✓ sur 104 pages) |

**Toutes vertes après le correctif.** C'est la première fois de la journée que
la batterie entière — portes à navigateur comprises — a tourné sur HEAD.

### Le seul rouge, et il était réel depuis hier

`pc/etat-equilibre`, prose de leçon : « la couleur est **repartie** ». Le mot
est entré hier, dans `5e7d950`. `accents-manquants` est une porte de CI — elle
aurait dû crier hier soir. Elle n'a pas pu : le runner ne s'assignait déjà plus.
**C'est le coût de la panne, rendu concret** : une porte rouge pendant
vingt-quatre heures sans que personne puisse le savoir.

Sauf que la porte avait tort. « Repartie » est du français correct — participe
passé de *repartir*, « la couleur est repartie » (elle a recommencé). C'est
*répartie*, de *répartir*, qui porte l'accent, et ce n'est pas le sens ici. La
sonde viole donc sa propre règle d'admission, écrite dans son en-tête :
« **uniquement des mots dont la forme SANS accent n'existe pas en français** »,
avec une liste d'exclusions explicite (« cote », « des », « sur », « ou »).
Retirée.

### Le douzième banc faussé de la journée, et la porte qui l'a attrapé

La première tentative de construction a échoué sans que je le voie : j'ai lu un
journal de build laissé par une session précédente, et conclu « BUILD EXIT: 0 ».
`dom-truth` a alors rendu **1 échec sur 277** — le tampon de build : « stamp
c8b0e6d ≠ HEAD 5d6283d, 26 fichiers changés depuis ». Il avait raison :
`.next/BUILD_ID` datait de 16:23, une heure et demie plus tôt.

C'est exactement la porte §11.110, sur exactement le défaut qu'elle a été écrite
pour attraper, contre exactement la personne qui l'a écrite. Sans elle, j'aurais
consigné « 277/277 sur HEAD » en mesurant un build d'il y a deux heures.

### Note d'environnement, pour la prochaine session

Le Chromium du conteneur est la build **1194** ; `playwright-core` 1.61.1 en
réclame **1228**. Sans rien, toutes les portes à navigateur meurent sur
« executable doesn't exist ». La parade tient en une variable, déjà lue par les
scripts :

```
export PW_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
```

---

## §11.127 — Ce qui a été mesuré et trouvé PROPRE

**2026-09-20.** Un journal qui ne consigne que les défauts fait re-mesurer
indéfiniment les mêmes choses. Voici ce qui a été vérifié aujourd'hui et tenait,
avec de quoi le refaire. Chaque ligne est un travail que la prochaine session
n'a pas à recommencer — et, si elle le recommence, un chiffre auquel se
comparer.

| propriété | mesure | verdict |
|---|---|---|
| **Tags de misconception** | 5 847 tags posés sur des choix, sur `items.yaml` ET `checkpoints.yaml`, `misconception` + `also_reveals` + `primary_misconception` | **0 orphelin**, 0 déclaration en double, sur 767 misconceptions déclarées |
| **Solutions contre leur clé** | 295 clés essentiellement numériques : la valeur de la clé apparaît-elle dans la solution ou le retour ? | **0 contradiction.** Les 2 signalements étaient des arrondis corrects (`≈ 0,48` pour un calcul à `0,483`) |
| **Clones de point d'arrêt** | 132 `item_source: clone_of_<id>` | **132 conformes**, 0 clone nu, 0 id pendant (§11.118) |
| **Forme des points d'arrêt** | 362 entrées | **toutes plates** — aucune enveloppe `items: [...]` imbriquée, donc aucun angle mort pour la porte fantôme qui lit `e.choices` |
| **Ids d'items dupliqués** | 9 collisions entre `svt/liberation-energie-matiere-organique` et `philo/la-liberte` (`LIB-1`…`LIB-9`) | **inoffensives** : aucun consommateur ne lit `item_id` seul — le journal porte toujours `notion_id`, `revealKey()` compose les deux, `targetsFromItems()` est appelée notion par notion |
| **Choix jumeaux** | 6 448 choix, casse des maths préservée | **0** |
| **Rendu, sur HEAD** | `dom-truth` | **277 contrôles, 0 échec** (§11.126) |
| **Retour espacé** | les trois sources de `NextUp` (`misconception-active`, `reprise`, `revision`) | **les trois couvertes** par `test-learner-model`. Le seuil de 21 jours est une réduction v1 **déclarée** dans le spec ET dans le code — « PAS une courbe d'oubli prétendue » — pas un oubli |

### Deux champs authorés que rien ne lit — et ce n'est pas le même cas

- **`also_reveals`** (27 choix) : **délibérément** non consulté, et
  `build-learner-inputs.mjs` l'écrit dans son en-tête — « *the `also_reveals`
  field is deliberately NOT consulted here* ». C'est une annotation d'auteur,
  pas une entrée du modèle. Rien à faire, et surtout pas de porte.
- **`habilete`** (36 items, tous dans `pc/rlc-serie`) : aucun consommateur nulle
  part, et **aucune décision écrite** pour l'expliquer. La différence est là —
  l'un est un choix consigné, l'autre est un silence. C'est §11.120.

**La règle qui en sort :** un champ que rien ne lit n'est un défaut que si
personne n'a écrit pourquoi. `also_reveals` est propre ; `habilete` attend un
arbitrage.

### Un TROISIÈME champ que rien ne lit — et le piège qu'il arme

**`items[].tags` n'a aucun consommateur dans `web/src`.** Il est renseigné sur
les 1 612 items et porte **1 027 étiquettes distinctes** — maths en compte 360
pour 454 items, philo 343 pour 366. Ce n'est pas un vocabulaire, c'est de
l'annotation libre, et c'est parfaitement cohérent avec le seul endroit qui en
parle : un commentaire de `validate-content` le décrit comme « une étiquette
d'AUTEUR parfaitement légitime ».

Ce n'est donc pas un défaut aujourd'hui. **Mais il arme un piège pour le jour
où quelqu'un s'en servira** : **trente et un concepts portent deux
orthographes**, tiret contre souligné —

| | |
|---|---|
| `application_experimentale` (4 notions) | `application-experimentale` (1) |
| `lecture_graphique` | `lecture-graphique` |
| `forme_indeterminee` (2) | `forme-indeterminee` (1) |
| `contrat_social`, `droit_naturel`, `imperatif_categorique`… | leurs jumeaux à tiret |

Le premier filtre écrit sur `tags:` en manquera silencieusement une partie.
**Aucune porte n'est posée** : trente et une alertes pour zéro dommage actuel,
c'est exactement le bruit qu'ADR 0034 §9 interdit d'armer. Ce qui est posé, à
la place, c'est cette note — pour que le piège soit connu avant d'être marché
dessus, et non après.

### Le corpus média est référencé à 99,8 %

Mesuré au passage : **521 fichiers sous `content/*/*/media/`, un seul jamais
cité par sa racine dans sa propre notion** — `pc/rlc-serie/media/loi-mailles-build.svg`
(14 ko, 2026-09-05). Son suffixe `-build` suggère un artefact de travail ; il
n'est **pas supprimé**, parce que rien ne dit s'il sert de source à autre chose
et qu'un fichier de 14 ko ne vaut pas une suppression à l'aveugle.

**Quatorzième banc faussé, et le plus instructif de la série.** La première
mesure annonçait **471 orphelins sur 521** — 90 % du corpus média. Un chiffre
pareil ne décrit jamais un produit, il décrit une sonde : les figures sont
citées par leur RACINE (`[[figure:limite-trou]]`), sans extension, et les
sidecars `.stages.json` / `.interactive.json` / `.motion.json` sont chargés par
convention à partir de cette même racine. Exiger le nom de fichier complet
déclarait orphelin tout ce qui fonctionne.

---

## §11.128 — Les non-négociables de sûreté production, mesurés pour la première fois

**2026-09-20.** `.claude/CLAUDE.md` énonce une liste de non-négociables
« toujours en vigueur », dérivés d'incidents réels et nommant les migrations
coupables. Deux d'entre eux se vérifient STATIQUEMENT, sur le texte des
migrations :

> « Toute migration embarque un bloc de vérification qui asserte la
> **CARDINALITÉ** de l'état final, pas seulement la structure. Une migration qui
> semble réussir en ne faisant silencieusement rien est le mode de défaillance
> que cela empêche. (Leçon : migration 046.) »

> « **RLS activée dans la migration qui CRÉE la table.** (Leçons : 040, 047.) »

**Rien ne les mesurait.** Ils sont écrits en tête du fichier que chaque session
lit, ils viennent d'incidents payés, et aucune porte ne les touchait.

### Les deux TIENNENT

| règle | fenêtre | résultat |
|---|---|---|
| bloc de vérification avec cardinalité | migrations ≥ 046 | **6 / 6** |
| RLS dans la migration créatrice | migrations ≥ 002 qui créent une table | **7 / 7** |

Le seul trou historique — les sept tables de curriculum de `001_initial_schema`
— a été comblé par une migration dédiée dont le nom le dit :
`040_enable_rls_curriculum_tables.sql`. C'est la leçon citée, et elle a été
apprise.

**Les fenêtres ne sont pas des seuils de confort : ce sont des dates.** Les
migrations sont une histoire append-only — « ne jamais modifier une migration
déjà passée en production » — donc exiger un bloc de vérification sur `001`
serait exiger une faute. Les deux seuils disent seulement à partir d'où chaque
règle existait.

`portes-migrations.mjs` est armé (batterie + CI, 22 portes locales) avec ses
deux essais rouges **§11.128a/b**. La suite passe à **36**.

### Un troisième non-négociable vérifié — et délibérément NON gardé

« **Ne jamais modifier une migration déjà passée en production** — les
migrations sont une histoire append-only. » Git peut répondre exactement :
combien de commits ont touché chaque fichier après celui qui l'a créé ?

**Quatre migrations sur cinquante ont plus d'un commit, et les quatre sont
légitimes.** `034_exam_papers_pc.sql` en a neuf — tous du **même jour**
(2026-05-12), nommés « Phase 3.4 Batch 1 » à « Batch 9 » puis « COMPLETE » :
c'est une rédaction par lots, pas une retouche. `048`, `049` et `050` en ont
deux, et le second dit ce qu'il fait : « *promote migrations 048-050
(**byte-identical** to reviewed drafts)* ».

**Aucune porte n'est posée dessus**, et c'est un choix. Un contrôle « aucun
commit ne modifie une migration existante » crierait sur la rédaction par lots
de `034`, qui est exactement le travail qu'on veut — dix-huit corrections
fausses pour aucune vraie, la forme de bruit qu'ADR 0034 §9 interdit d'armer.

**La limite honnête :** git dit qu'aucun fichier n'a bougé après sa finition ; il
ne dit pas lesquels ont RÉELLEMENT tourné en production. CLAUDE.md rappelle que
la synchronisation production est **NON VÉRIFIÉE** après une longue dormance —
et cette vérification-là demande une session supervisée, pas un script.

### Le quinzième banc faussé — et celui-là aurait fait peur

La première version de la porte cherchait `DO $$` et a déclaré **49 migrations
sur 50 sans bloc de vérification**. Un non-négociable de sûreté production
violé à 98 % : le genre de chiffre qu'on publie en urgence.

Il était entièrement faux. **PostgreSQL accepte le dollar-quoting NOMMÉ** —
`048` ouvre par `DO $verify$` et ferme par `END $verify$`. Le motif accepte
désormais `$[a-z_]*$`.

Deuxième couche : le premier essai rouge remplaçait `$verify$` par un autre
tag entre dollars… que le motif corrigé reconnaissait encore. L'essai est
revenu **AVEUGLE**, et ADR 0034 §2 dit qu'un essai rouge qui échoue est
AMBIGU — la porte, ou l'essai. C'était l'essai. Mais le diagnostic du second
essai, lui, a trouvé une **vraie lâcheté** : sans frontière finale,
`ENABLE ROW LEVEL SECURITY_n_importe_quoi` passait la porte. `\b` ajouté.

**L'essai était mal bâti ET la porte était lâche. Les deux corrigés** — c'est
exactement pourquoi le verdict « aveugle » se diagnostique au lieu de se croire.

---

## §11.129 — L'élève peut-il TOUCHER la figure, ou seulement la voir ?

**2026-09-20.** La VISION ne décrit pas « bien enseigné » de la même façon pour
chaque matière, et la différence qu'elle pose est une différence
d'**INTERACTION**, pas de style :

- **maths** — la couche conceptuelle « demande des interactives
  **manipulables** (glisser le point, prédire la tangente, la regarder se
  mettre à jour) » ;
- **physique-chimie** — « c'est là que les simulations interactives paient le
  plus » ;
- **SVT** — « la pensée SVT est visuelle, donc elle a besoin de vraies
  interactions de **construction de schéma (dessiner, étiqueter)**, **PAS
  d'images affichées.** »

`INTERACTIVE-FIGURE-SPEC` encode par ailleurs une demande explicite du
propriétaire (2026-07-07) : « plus de visualisations interactives ».

**Rien ne mesurait où on en est.**

| matière | notions | SVG statiques | étagées | manipulables | notions avec du manipulable |
|---|---|---|---|---|---|
| maths | 14 | 72 | 72 | 5 | **5/14** |
| pc | 25 | 134 | 125 | 6 | **4/25** |
| philo | 12 | 2 | 1 | 0 | 0/12 |
| **svt** | **11** | **49** | **37** | **0** | **0/11** |

**Neuf notions sur soixante-deux** portent quelque chose que l'élève peut
manipuler. Trois étages, et ils ne valent pas la même chose : une image, une
révélation pas à pas (l'élève avance, mais ne manipule rien), une manipulation
continue.

### SVT : exactement la forme que sa propre ligne de la VISION exclut

Quarante-neuf SVG statiques, trente-sept étagées, **zéro manipulable** — c'est
« des images affichées », et sa ligne dit `PAS d'images affichées`. C'est le
**cinquième axe indépendant** à isoler les onze notions SVT, après le sommet
(§11.114), les leçons muettes (§11.37), l'entrée (§11.119) et l'anatomie
(§11.120). Et c'est le plus tranchant des cinq, parce que la VISION nomme SVT
en propre au lieu de poser une règle générale qu'on applique ensuite.

À noter aussi, pour être juste : la ligne SVT de la VISION dit que son épreuve
est « largement du **raisonnement scientifique** — un argument travaillé montré
en entier, **puis estompé** ». Un argument ne peut pas être estompé vers rien :
il faut quelque chose d'ATTAQUABLE à la fin. SVT n'a aucun `exercises.yaml`
(§11.120). Les deux constats sont le même trou, vu par deux phrases différentes
du même paragraphe.

**Cliquet à une seule direction**, armé à 9 : on empêche d'en perdre, on
n'exige pas d'en gagner — produire une figure manipulable est un travail
d'auteur, pas un correctif. Essai rouge **§11.129** ; la suite passe à **37**,
la batterie locale à **23 portes**.

### Seizième banc faussé — la porte comptait des noms de fichiers

Le premier essai rouge est revenu **AVEUGLE**, et il avait raison. La porte
comptait les `.interactive.json` **par leur nom** : un fichier au JSON cassé —
donc mort au rendu, donc une image pour l'élève — comptait encore comme
manipulable. Elle **parse** désormais.

C'est la deuxième fois aujourd'hui qu'un essai rouge accuse une porte que je
venais d'écrire (après §11.124a, la porte sous un `process.exit`), et la
troisième fois qu'il refuse de valider quelque chose que j'aurais consigné.
**Un essai rouge ne sert à rien s'il ne peut pas contredire celui qui l'écrit.**

## §11.130 — La ligne APRÈS qu'un instrument réclamait depuis juillet

`web/scripts/wide-measure.mjs` porte cette phrase dans son propre en-tête
depuis le jour 8 : « *Throwaway after the batch? NO — kept: re-run after the
owner's picks to produce the AFTER row of the same table.* » Personne ne l'a
lue pendant deux mois, et §11.123 a dit pourquoi : le script n'était dans
aucun catalogue. Un instrument que rien ne nomme est mort, et il emporte ce
que son en-tête savait. Relancé aujourd'hui sur une construction faite de
HEAD, même page, même 1920×1000, mêmes sélecteurs, **les deux thèmes
identiques dans les deux passes**. La ligne APRÈS est au `fable-day3-ledger`
§9 bis ; ce qui suit est ce qu'elle apprend.

**Deux cercles de l'owner sur quatre sont fermés.** L'accueil ne se lit plus
comme un ruban : le plan de contenu passe de **691 px à 1760 px** (+155 %) et
la gouttière morte de **614 px à 80 px** (−87 %). La bande est complétée par
la couverture de la notion (le choix M1, posé en production le 2026-09-04) :
flancs **symétriques à 276 px**, occupation **38,3 % → 46,0 %**. Le bloc-titre
a d'ailleurs *rétréci* (1076 → 921 px) — c'est le but : il a cessé d'être seul
dans un plan de 1920 px.

**Un cercle est OUVERT, et il s'est élargi de 115 px.** À droite de la prose :
**528 px en juillet, 643 px aujourd'hui**. La colonne entière a glissé à
gauche (gouttière 390 → 218, rail 422 → 276, prose 768 → 587) et la prose
s'est élargie (624 → 690), mais rien n'a été posé à droite : le vide a suivi
le glissement. **Le jeu W n'a jamais été choisi.** Ce n'est pas une dérive,
c'est la recommandation de juillet qui attend encore.

**Ce que « choisir W3 » coûte vraiment — mesuré aujourd'hui, pas estimé.**
Juillet l'annonçait « cheap to make real (one authored formula per rung) ».
À moitié vrai, et la moitié fausse est la moitié chère : `KeyFormulaRail.tsx`
**existe et fonctionne**, mais la seule donnée qui l'alimente est une constante
`KEY_FORMULAS` écrite à la main dans `web/src/app/options/wide/[v]/page.tsx`,
pour une notion. Aucun champ `key_formulas` nulle part dans `content/` : **le
composant est bâti, le canal d'auteur ne l'est pas.** C'est un champ template
v2 plus 62 notions de contenu — la même forme de travail que W1, pas une plus
petite. Porte d'owner, chiffrée.

**Le banc avant le produit, 17ᵉ fois.** `bandVoidRightPx` répond exactement à
*une* question — la distance entre la droite du bloc-titre et la droite de la
bande — et son nom en laisse lire une plus large. En juillet cette distance
**était** du vide. Depuis M1, la formule inchangée appelle « vide » une région
occupée et annonce **724 px**. Rien n'est cassé dans la porte : c'est la page
qui a bougé dessous. Espèce ADR 0033, troisième cas. La clé de juillet est
gardée telle quelle — c'est elle qui rend les deux lignes comparables — et
trois clés disent ce qu'elle ne sait plus dire : `cover` (la boîte réellement
peinte : 352×220 à gauche de 1644), `bandFreeRightPx` (**276 px**, symétrique
du flanc gauche), `bandOccupancyWithCoverPct`. **Sans cette vérification, ce
carnet affirmerait aujourd'hui que la bande a régressé de 422 px de vide à
724 px — l'exact contraire de ce que fait la page.**

**Et un second défaut dans le même instrument :** bâti pour produire une
comparaison, il écrivait sous `before-*.png` / `measurements.json` sans
condition — chaque relance détruisait le terme auquel se comparer. Les
chiffres de juillet ont survécu par accident : `report/` est la seule
exception au `.gitignore` du dossier, et la copie suivie y est. La passe
d'après prend désormais `--apres`. Au passage, le carnet citait
`shots/day8-wide/measurements.json`, chemin que `.gitignore` efface : un
lecteur qui clone ne trouvait rien. Corrigé vers `report/`.

## §11.131 — La valeur juste entre ses segments, et fausse contre le monde

`arithmetique-rendue` relit les chaînes « a = b = c » et vérifie que les
segments s'accordent ENTRE EUX. Son en-tête nomme lui-même, depuis sa
naissance, ce qu'elle ne peut pas voir, et demande que ce soit **mesuré plutôt
que passé sous silence** (ADR 0031) : « une chaîne dont TOUS les segments sont justes entre eux
mais fausse par rapport au monde ». Une célérité de la lumière écrite
$3{,}00\times10^{7}$ passe sa porte sans un murmure, et toute l'arithmétique
qui en découle sera impeccable. C'est le deuxième en-tête de la journée qui
demandait quelque chose par écrit (l'autre : §11.130).

**Le résultat : le corpus est propre sur les deux sens.** 92 déclarations de
constante lues avec leur unité, **0 fausse** — c : 3,00×10⁸ (×16) et 2,9979×10⁸
(×1) ; g : 9,8 (×38) et 10 (×29), les deux légitimes, 10 étant la
simplification admise au bac ; N_A : 6,02×10²³ ; h : 6,63×10⁻³⁴ ;
e : 1,6×10⁻¹⁹ (×6). 1 116 vitesses en m·s⁻¹ lues, **0 au-dessus de c** hors
trois passages qui en écrivent une EXPRÈS pour nommer le piège.

**Le banc avant le produit, quatre fois dans une seule porte** — et c'est la
part instructive.

1. *Le symbole seul est inutilisable.* Première sonde : chercher `c =`, `g =`,
   `h =`. Retour : 278 occurrences de `k`, 236 de `R`, 215 de `c`… toutes en
   maths. Le coefficient `c` d'un trinôme, le rayon `R` d'une sphère, le pas
   `h` d'un taux d'accroissement. **L'unité, et non le symbole, est ce qui
   fait d'une lettre une constante physique.**
2. *Mon propre affichage mentait.* La sonde annonçait `h = 0.0` et
   `e = 0.0` — j'allais consigner « deux constantes nulles dans le corpus ».
   C'était `round(1.6e-19, 6)`, qui vaut 0,0. Les lectures étaient justes ;
   l'affichage les écrasait. Trouvé avant publication, pas après.
3. *Une borne écrite à l'exacte valeur juste accuse le nombre juste.*
   « 6{,}02 » × 10²³ se lit en virgule flottante 6.019999999999999e23,
   strictement INFÉRIEUR à 6.02e23. La porte a donc déclaré faux le seul N_A du
   corpus, qui est correct. **Une tolérance n'est pas de la mollesse : c'est
   reconnaître que le nombre lu et le nombre écrit ne sont pas le même objet.**
4. *`\text{m}` nu est un mètre, pas une vitesse.* Quinze vitesses
   « supraluminiques » au premier passage ; douze étaient des distances —
   7,8×10¹¹ m, le rayon de l'orbite de Jupiter. Les trois vraies sont de la
   **pédagogie voulue** : « Le piège de cette question… écrire
   $V = n \times c = 4{,}5\times10^{8}$ ; ce résultat est physiquement
   interdit », et un distracteur `correct: false` étiqueté
   `mc…indice-vitesse-erronee`. Exactement ce que la VISION demande.

**L'exemption est (fichier, VALEUR), jamais (fichier), et surtout jamais un
motif.** Un motif sur « piège » ou « impossible » serait une porte dérobée
qu'une faute future s'offrirait en recopiant un mot. Les trois passages sont
nommés un par un avec leur raison, visibles dans le diff. **L'essai §11.131c
existe pour ça** : il pose une valeur supraluminique NEUVE dans un fichier
DÉJÀ exempté, et la porte crie. Sans lui, « exempté » aurait pu vouloir dire
« impuni ».

**Et la porte a été attrapée par une autre en naissant.** La suite d'essais
rouges est revenue avec deux échecs de PRÉ-CONTRÔLE sur §11.122/123 : la garde
anti-dérive voyait `constantes-physiques.mjs` comme un instrument orphelin —
lancé par personne, nommé par aucun catalogue. Elle avait raison, je ne l'avais
pas encore inscrit. La garde écrite hier a arrêté le script écrit aujourd'hui.
Batterie, CI et INSTRUMENTS mis à jour : 30 portes, 90 scripts, 85 catalogués,
0 orphelin. **40 essais rouges, tous verts.**

**PORTÉE, affichée à chaque passage :** 551 couples « symbole = nombre » sans
unité collée restent HORS CHAMP, et c'est la majorité. Sans l'unité, rien ne
distingue la célérité du coefficient d'un trinôme. Restent aussi hors champ
les constantes trop rares ou trop homonymes (masses du proton/neutron, F, k,
G) et — l'angle mort qui demeure entier — une masse ou une longueur fausse
contre le réel.

## §11.132 — Le distracteur qui ne répond rien

L'élève choisit une proposition fausse. C'est LE moment de la leçon : la
VISION demande que chaque distracteur porte une misconception et qu'elle soit
CONFRONTÉE. Un distracteur sans `feedback` rend un silence — l'élève apprend
qu'il a tort, jamais pourquoi. Rien ne vérifiait cette présence :
`validate-content` passait déjà `choices[].feedback` au contrôle KaTeX et au
contrôle du texte rendu, donc au contenu du champ — **jamais à son
existence**. Un champ absent n'a pas de contenu à vérifier ; il sortait du
balayage par le haut.

**Mesuré sur tout le corpus : 7 894 retours lus, 1 974 items à choix,
5 920 distracteurs sur 5 920 portent un retour.** La classe est vide, la porte
est franche, sans cliquet ni dette.

**Le piège, et il aurait été gros.** La première mesure annonçait « 1 612
retours vides » — un cinquième du corpus. Ventilés, les 1 612 sont **tous sur
la BONNE réponse**, et c'est le dessin voulu : la bonne réponse s'explique
dans `solution`, que le composant affiche à part (362 en portent un quand même,
ce qui est permis). Une porte qui n'aurait pas séparé `correct: true` de
`correct: false` aurait ouvert une campagne de 1 612 corrections dont **aucune**
n'est un défaut. C'est le même geste qu'au §11.130 et au §11.131 : la mesure
brute annonce une catastrophe, le banc l'explique.

**SECOND SENS — le même retour sur deux choix.** L'élève qui prend D lit alors
l'explication écrite pour C. Mesuré : 0 sur 7 894. Sans ce sens, un
copier-coller entre deux distracteurs passerait sans bruit, puisque le champ
serait bel et bien REMPLI — la présence seule ne dit rien de la pertinence.
Deux directions, parce qu'une seule se laisse contourner (ADR 0031).

Les deux vérifiées ROUGE sur `svt/soi-non-soi` (essais §11.132a/b), restaurées
octet pour octet. **42 essais rouges, tous verts. validate-content : 0 échec
sur 62 notions.**

## §11.133 — Un champ écrit sur 1 678 items, lu par aucun composant

Le corpus porte `correct_feedback` sur **1 678 items, dans les 62 notions** :
l'explication de la BONNE réponse, écrite par l'auteur. `grep` sur tout
`web/src` : **zéro occurrence**. Aucun composant ne le lit. Il voyage jusqu'au
navigateur — il est dans la charge sérialisée des pages construites — et n'est
jamais affiché.

**Pour 1 629 items, la perte est invisible** : ils portent aussi une
`solution`, que `McqItem` révèle sous « Voir la solution complète ». **Pour 49,
elle ne l'est pas.** Les 49 items de `philo/analyse-de-texte` — la leçon de
méthode qui apprend à analyser un texte — n'ont pas de `solution`, et leur
choix correct ne porte pas non plus de `feedback` propre (49 sur 49, vérifié).
L'élève qui répondait JUSTE voyait la ligne « Correct », et rien d'autre.

**Le dessin était cohérent partout ailleurs, et c'est pour ça que le trou
tenait.** Un point d'arrêt n'a jamais de `solution` : `CheckpointItem` passe
donc `revealCorrectFeedback` à `ChoiceButton`, avec ce commentaire déjà en
place — « sans ceci, l'élève qui se trompe verrait la bonne réponse surlignée
sans jamais lire pourquoi elle est bonne ». `McqItem` ne le passe pas, parce
qu'il compte sur `solution`. Les 49 tombaient exactement entre les deux
branches : pas de `solution`, pas de révélation, et un troisième canal que
personne ne lisait. **Quelqu'un avait déjà résolu ce problème une fois, pour
l'autre composant.**

**Le correctif est un REPLI, pas un changement de dessin.** `McqItem` affiche
`item.solution ?? item.correct_feedback`, avec l'intitulé « Pourquoi cette
réponse est la bonne » quand il s'agit du second. Il ne peut rien retirer ni
déplacer : il ne s'ouvre que là où la carte était muette. Vérifié dans un
navigateur, sur la page servie d'une construction faite de HEAD :
`ATX-M01-1` révèle désormais **166 caractères** d'explication après une
réponse (absents avant la réponse, comme il se doit), et
`maths/limites-continuite` continue d'afficher « Voir la solution complète »
avec ses 289 caractères — **le chemin existant est inchangé**.

**La porte (§11.133) vise l'UNION des trois canaux, jamais `solution` seule.**
Exiger `solution` aurait condamné un dessin légitime : les 49 expliquent la
bonne réponse autrement, pas moins bien. Après repli : **0 item muet sur
1 612**. Essai rouge vérifié — et **MUET au premier jet**, parce que je l'avais
écrit avec `correct_feedback: >` là où le corpus écrit `|-`. Un essai muet
n'est pas un verdict sur la porte : c'est un défaut de l'essai (quatrième
verdict, ADR 0034). Corrigé, il est ROUGE.

**Ce qui reste au propriétaire :** sur les 1 629 items qui ont les DEUX, faut-il
montrer aussi le `correct_feedback` à côté de la `solution`, ou l'un rend-il
l'autre superflu ? C'est une question de dessin pédagogique, pas de code —
elle est portée en `DECISIONS-EN-ATTENTE` §9. Tant qu'elle n'est pas tranchée,
1 629 explications écrites restent sans emploi.

## §11.134 — Comparer ce que le corpus ÉCRIT à ce que le code LIT

`correct_feedback` a tenu toute la vie du corpus (§11.133) parce que **rien ne
comparait les deux listes** : les noms de champ écrits dans `content/`, et les
noms de champ que le code nomme. Une note dans un carnet n'empêche pas la
deuxième occurrence ; c'est le geste qu'il fallait outiller (ADR 0033).

**L'inventaire complet, fait une fois** : 876 noms de champ distincts dans le
corpus YAML, dont **73 vus au moins cinq fois**. Comparés à tout le code du
dépôt — `web/src`, `web/scripts`, `scripts` —, snake_case ou camelCase :
**0 champ mort**. `correct_feedback` était le seul, et il est réparé. Quatre
noms restent sans lecteur et c'est juste : ce sont des ANNOTATIONS D'AUTEUR
(`honest_state`, `honest_state_2026_09_19`, `attributes_to`,
`gated_misconceptions`), écrites pour l'humain qui relit. Elles sont permises
NOMMÉMENT, chacune avec sa raison — jamais par motif : « tout ce qui commence
par `honest_` » se serait offert à n'importe quel champ futur.

**Le premier balayage accusait quatorze champs, et treize à tort.** Il ne
lisait que `web/src` — donc `lesson_placement` (362), `habilete` (324),
`also_reveals` (246), `ramp_coverage`, `coverage_summary`… tous LUS, mais par
les instruments de `web/scripts`, pas par l'interface. Un champ consommé par
une porte n'est pas un champ mort. Élargir le champ de lecture a ramené la
liste de 14 à 4.

**Et la porte se disculpait elle-même.** Son en-tête cite `correct_feedback`
pour expliquer pourquoi elle existe. Comme elle lit tout `web/scripts`, la
citation suffisait à déclarer le champ « lu » : **elle se rendait aveugle au
défaut même qui l'a fait naître**, et à tout champ qu'elle nommerait un jour.
Elle s'exclut désormais de sa propre lecture. Une porte ne doit pas pouvoir se
disculper en parlant d'elle-même.

**L'essai rouge, AVEUGLE au premier jet, et l'essai avait tort.** Il renommait
`misconception:` en une clé inédite — mais le harnais casse UNE occurrence par
dessein (« un essai rouge doit isoler UN défaut »), et une seule occurrence
tombe sous le seuil documenté de cinq. Verdict AMBIGU, tranché du côté de
l'essai (ADR 0034) : le second jet injecte cinq occurrences en une seule
édition, et la porte crie. Le seuil de cinq n'est pas une mollesse — en
dessous, on attrape la coquille d'un auteur et non un canal.

**PORTÉE, affichée à chaque passage :** la correspondance est un simple
SOUS-MOT sur tout le code réuni. Un champ nommé `note` est réputé lu dès qu'un
commentaire contient ce mot. L'erreur va dans le sens sûr — elle SOUS-déclare
les morts — mais elle est réelle. Et un champ lu par du code sans être RENDU à
l'écran lui échappe entièrement.

## §11.135 — Six dettes honnêtes, et aucun endroit où les compter

`.claude/CLAUDE.md`, décision ouverte n°4, pose une ligne dure : **un asset
généré ne remplace pas un manipulable là où la pédagogie exige la
manipulation**. Une spec qui prescrit `[[embed:slug]]` demande une chose que
l'élève TOUCHE — un curseur qu'il pousse, une masse qu'il change, un rayon
qu'il balaie. Une figure figée montre le résultat de ce geste ; elle ne le
rend pas. Rien ne mesurait cette ligne.

**Ce que la mesure a trouvé est à l'honneur des auteurs.** Six figures ont pris
la place d'un embed prescrit, et **les six fois la substitution est ÉCRITE**,
en tête du SVG, en nommant précisément ce qui est perdu : « curseurs m,k →
ici, DEUX masses fixes tracées côte à côte » ; « curseur Δt → ici, DEUX tailles
de pas fixes tracées contre la courbe vraie » ; « au lieu d'un curseur de rayon
continu, TROIS rayons fixes ». La discipline d'état honnête (ADR 0025) a tenu
au point exact de la substitution. **Zéro promesse tombée sans un mot.**

**Ce qui manquait n'était pas l'honnêteté, c'était le REGISTRE.** Chaque dette
vivait dans l'en-tête d'un fichier que seul celui qui l'ouvre lira.
`media-manipulable` (§11.129) compte les `.interactive.json` — il ne savait
rien de ces six-là. Aucun document du dépôt ne les réunissait ; une recherche
sur leurs noms ne ramène que trois audits sans rapport. C'est l'ADR 0031 une
fois de plus, dans sa forme la plus douce : **une dette qu'aucun registre ne
nomme est invisible, même quand chaque ligne est honnête.** Le registre est
maintenant `docs/audits/dette-manipulable-2026-09-20.md`, et deux sens le
tiennent.

**Prescription et livraison sont deux ensembles DISJOINTS**, et c'est le fait le
plus étrange de la mesure. 4 prescriptions dans les specs — les 4 substituées.
4 manipulables livrés — **aucun des 4 n'avait été prescrit**. Le descripteur de
`projectile-sandbox` le dit lui-même : « Aucun spec.md pédagogique distinct
n'existe pour cette leçon […] ce callout est ajouté directement par l'agent
`interactive-author` sur instruction de la tâche confiée ». Ce qui a été
demandé n'a pas été fait ; ce qui a été fait n'avait pas été demandé. Les deux
moitiés sont défendables une par une ; ensemble elles disent qu'il n'y a pas de
canal entre la spec et le média.

**Deux erreurs de banc, toutes deux dans ma mesure.** Un motif sur une seule
ligne manquait une substitution sur trois — « figure figée (STATIQUE) qui
remplace \n l'embed manipulable » passe à la ligne entre les deux mots. Et
j'avais posé le cliquet à 7 avant de compter : il y en a 6. Le chiffre écrit
d'avance est un chiffre inventé.

**PORTÉE.** L'instrument lit des PRESCRIPTIONS, pas des besoins : une pédagogie
qui exige la manipulation sans qu'aucune spec ne l'ait écrite lui est
invisible — et les onze notions de SVT n'ont ni spec de ce genre, ni embed, ni
figure manipulable (§11.119, §11.129). Il ne juge pas non plus si le
manipulable livré manipule la bonne grandeur.

**Porte d'owner (`DECISIONS-EN-ATTENTE` §10) :** rendre les six, ou les accepter
comme définitifs — et le dire alors dans les specs, qui continuent de prescrire
un embed.

## §11.136 — L'étiquette de conception et l'item qui l'implémente

Troisième écart prescription/livraison de la journée, après les manipulables
(§11.135). Les specs de notion désignent les items qu'elles prescrivent par une
étiquette : « **Item AE-R5-1** *(Résolution — the derivation / the ½)* ». Vingt
de ces étiquettes, dans quatre notions de physique, ne correspondent à AUCUN
identifiant du corpus.

**LA PÉDAGOGIE EST LIVRÉE, et il faut le dire avant le compte**, sinon vingt se
lit comme un trou de contenu. `aspects-energetiques` porte exactement 3 items
en R5, 3 en R6, 3 en R7 — les neuf que la spec appelait `AE-R5-1 … AE-R7-3`.
`systemes-oscillants` en porte 14 en R6 et 10 en R7 là où la spec en demandait
3 et 3. Les barreaux visés sont couverts partout. **L'élève ne perd rien.**
L'auteur a simplement écrit les items sous un schéma plat (`AE-7`, `SO-12`,
`CMP-3`, `OMPP-5`) quand la spec les avait nommés par barreau.

**Ce qui manque est la TRAÇABILITÉ.** Un lecteur qui veut vérifier qu'une
figure « sert CH-FR-3 » ne peut pas remonter à l'item : l'identifiant n'existe
sous aucune forme. La vérification est *impossible*, pas fausse — et c'est
exactement ce qui m'est arrivé en voulant contrôler les trois substitutions de
manipulables du §11.135.

**UN CLIQUET, PAS UNE PORTE FRANCHE, et c'est délibéré.** Vingt étiquettes sont
dans cet état ; une porte franche serait ROUGE en permanence, et un rouge
permanent est un rouge qu'on apprend à ignorer — le projet l'écrit déjà d'une
autre porte (`DECISIONS-EN-ATTENTE` §7). Le cliquet à 20 empêche seulement la
dérive de GRANDIR : une spec neuve doit nommer un item qui existe. La dette
héritée reste lisible, datée, et ne bloque personne.

**Le banc, encore, et l'erreur était instructive.** Ma première mesure ne
trouvait que 22 étiquettes suspectes en exigeant que le PRÉFIXE cité existe
déjà dans la notion — ce qui rendait l'instrument **structurellement incapable
de voir une famille entière jamais créée**. `CH-FR-3` était invisible parce
qu'aucun item ne commence par `CH` : précisément le cas qui compte. Un filtre
qui demande à la famille d'exister déjà ne verra jamais la famille qui n'a
jamais existé. Remplacé par un ancrage sur le VERBE D'USAGE (« sert X »,
« Item X »), qui ne présume rien du corpus.

**PORTÉE.** Seules les citations portant un verbe d'usage sont lues — une
étiquette posée sans verbe échappe. L'instrument ne dit pas QUEL item
implémente quelle étiquette : cette correspondance demande de lire le type
cognitif décrit (« Résolution », « Utilisation »), donc un jugement d'auteur.
Et il ne juge pas si l'item livré fait ce que l'étiquette décrivait.

## §11.137 — « Le relais coupe Chromium » : un diagnostic recopié pendant deux semaines

`INSTRUMENTS.md`, « ce que RIEN ne mesure encore », point 9, depuis le
2026-09-06 : « la preview Vercel répond à `curl` en 0,7 s, mais le relais
réseau de la session coupe Chromium headless (`ERR_CONNECTION_RESET`). […]
**À refaire depuis une machine libre.** » Tout ce que les §11.20 à 11.25
mesurent l'était donc sur le build local, jamais sur l'artefact servi.

**Il n'a pas fallu d'autre machine, et le relais ne coupait rien.** Il
re-termine TLS avec son propre CA — c'est écrit dans son README — et Chromium
ne le connaissait pas. L'erreur mesurée aujourd'hui est
`ERR_CERT_AUTHORITY_INVALID`, **pas** `ERR_CONNECTION_RESET` : une défiance,
pas une coupure. Le magasin NSS de l'image date du 22 août ; le CA de la
session est écrit à chaque démarrage, à 14 h 23 aujourd'hui. Personne n'a
jamais ajouté le second au premier.

`certutil` n'est pas installé, donc `deploye-sweep` **épingle la clé publique**
du CA lu sur le disque (`--ignore-certificate-errors-spki-list`, recalculée à
chaque passage) : Chromium accepte exactement cette autorité-là et refuse
toutes les autres. Ce n'est pas `--ignore-certificate-errors`, qui accepterait
n'importe qui — la consigne du relais, « ne jamais désactiver la vérification
TLS », tient.

**Ce que l'artefact déployé a répondu, mesuré pour la première fois :**

- **Le commit EN LIGNE est lisible** — `data-build-sha` sur le pied de page,
  posé par `next.config.mjs` depuis `VERCEL_GIT_COMMIT_SHA`. La preview servait
  `bb9af56`, c'est-à-dire un commit de cette session, poussé vingt-cinq minutes
  plus tôt : **la branche est déployée en continu**. L'instrument le dit à
  chaque passage, parce qu'un chiffre mesuré sur un autre commit n'est pas un
  chiffre sur le nôtre.
- **L'attente honnête avant hydratation (ADR 0032) TIENT EN LIGNE** : 5, 263,
  9 et 270 commandes servies sur quatre pages, **0 active** dans les quatre
  cas. Jusqu'ici cette propriété n'était vérifiée que sur le build local.
- **L'adresse inconnue sert un vrai « introuvable »** : HTTP 404 et 381
  caractères de texte sans JavaScript, là où le défaut du §11.67 servait une
  page vide.
- **Le correctif du §11.133 est EN LIGNE**, pas seulement commis : sur la
  preview, l'élève qui répond juste à `ATX-M01-1` lit « Pourquoi cette réponse
  est la bonne ». Une heure séparait le correctif de sa vérification chez
  l'hébergeur.

**La leçon n'est pas technique.** Le diagnostic de 2026-09-06 était plausible,
écrit de bonne foi, et il a été RECOPIÉ d'une session à l'autre sans être
rejoué. Il disait « coupé » là où il fallait lire « pas de confiance », et ces
deux mots ne mènent pas au même geste. **Un angle mort noté est un angle mort
qui cesse d'être regardé** : c'est la même famille que `wide-measure` (§11.130),
qui demandait par écrit d'être rejoué et ne l'a pas été pendant deux mois.

**PAS EN CI, et c'est un choix.** L'instrument demande le réseau, un CA propre
à la session, et il mesure un artefact dont le commit varie : une porte
là-dessus serait rouge chaque fois que le déploiement a du retard sur `git
push` — donc un rouge qu'on apprendrait à ignorer. Il est catalogué, il se
lance à la main, et son en-tête dit quand.

**PORTÉE.** Le temps et la géométrie passent par le relais : les millisecondes
mesurées ici ne sont **pas** celles d'un élève marocain. La production reste
hors de portée et humainement gardée. Tout ce qui demande un compte connecté
aussi.

## §11.138 — Zéro en-tête de sécurité sur cinq, et un total qui ne comptait pas tout

Première chose mesurée grâce au §11.137, qui venait d'ouvrir l'artefact
déployé : **sur cinq en-têtes de sécurité attendus, ZÉRO était servi.** Vercel
pose `strict-transport-security` de lui-même ; tout le reste manquait, parce
que `next.config.mjs` n'avait pas de `headers()` du tout. C'est une classe que
le build local ne pouvait pas révéler — un en-tête absent ne rend rien de
visible, ne casse aucun contrôle, et ne se lit que sur la réponse servie.

**Quatre sont posés, le cinquième ne l'est pas, et les deux décisions sont
écrites.** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`
(le site CADRE des iframes PhET ; il n'a jamais besoin d'être cadré, lui),
`Referrer-Policy: strict-origin-when-cross-origin`, et `Permissions-Policy`
refusant caméra, micro et position à tout le monde, iframes tierces comprises.
Aucun ne change ce que la page rend. **`Content-Security-Policy` est laissé à
l'owner** (`DECISIONS-EN-ATTENTE` §11) : posée à l'aveugle, elle casse la page
en silence chez l'élève, et rien en local ne le verrait.

**La porte lit la RÉPONSE, jamais la configuration**, et c'est tout l'intérêt :
`headers()` peut être juste et l'en-tête absent — une clé mal orthographiée, un
`source` qui ne filtre pas la route, une option de sortie qui les supprime tous.
Lire le fichier répondrait « c'est écrit », pas « c'est servi ». L'essai rouge
casse donc `.next/routes-manifest.json`, le manifeste BÂTI, et non la config :
Next compile les en-têtes à la construction, si bien que modifier la config
sans reconstruire ne change rien à ce qui est servi — **précisément l'écart que
ce contrôle surveille**. Verdict : ROUGE sur les deux routes, fichier restauré
octet pour octet. Il n'est pas dans la suite rejouable, et la raison est écrite
à côté du contrôle : `dom-truth` prend six minutes et `essai-rouge` la lance
deux fois.

**Et le total de `dom-truth` ne comptait pas mes deux contrôles.** Après les
avoir ajoutés, le chiffre de tête était toujours « 277 checks » : `checks++`
est **opt-in** dans ce fichier — 97 sites l'appellent, chacun devant y penser.
Deux contrôles tournaient, capables d'échouer, et le nombre affiché n'avait pas
bougé. Corrigé (279), et la leçon est écrite sur place : **un total auquel
chaque contrôle doit s'inscrire est un PLANCHER, pas une somme.** L'erreur va
dans le sens sûr — on sous-compte — mais un chiffre de tête qui n'inclut pas
tout ce qui a tourné est exactement le genre de chiffre qu'on cite ensuite sans
y penser.

**Au passage, le poids servi, mesuré chez l'hébergeur :** une page de leçon
pèse **2,95 Mo de HTML brut, 254 ko une fois comprimée** (facteur 11,6). Le
chiffre brut est celui que `curl -I` annonce, et ce n'est pas celui que l'élève
télécharge — les deux méritaient d'être dans la même phrase.

## §11.139 — Ce que l'artefact déployé a répondu de PROPRE, et deux fois où j'ai mal lu

Suite du §11.137, qui venait d'ouvrir l'artefact servi. Tout ce qui suit est
mesuré sur `bac-pink.vercel.app`, pas sur un build local.

**Propre, et vérifié :**

- **Le partage.** Un élève qui colle un lien de leçon dans WhatsApp reçoit un
  vrai aperçu : `og:title` porte le titre de la notion, `og:description` la
  matière, la durée de lecture et la promesse, `og:url` l'adresse canonique,
  et **`og:image` pointe sur `/og.png` qui répond 200 avec 86 ko d'image**. La
  panne classique — une carte de partage qui montre une image morte — n'existe
  pas ici.
- **Les icônes.** `/icon.svg` et `/apple-icon.png` répondent 200.
- **L'adresse inconnue** sert un vrai « introuvable » : HTTP 404 et 381
  caractères de texte sans JavaScript (§11.67 tient en ligne).
- **Le « noindex » annoncé est IMPLÉMENTÉ.** `layout.tsx` écrit en commentaire
  « robots stays noindex: private during build » et le pose
  (`robots: { index: false, follow: false }`) ; la page servie porte bien
  `<meta name="robots" content="noindex, nofollow">`. Une intention écrite ET
  tenue.

**Deux fois, dans la même demi-heure, j'ai conclu trop vite — et les deux
fois, c'est la vérification qui m'a arrêté.**

1. *« Aucune identité sur la page déployée. »* J'avais cherché
   `<meta ... build|commit|version|sha ...>`. Le tampon existe depuis le jour 8,
   il s'appelle `data-build-sha` et vit sur le pied de page, pas dans une
   `<meta>`. **Je cherchais la bonne chose sous la mauvaise forme.**
2. *« Ce déploiement est indexable. »* J'avais regardé l'en-tête
   `x-robots-tag` (absent) et `robots.txt` (404), et j'allais l'écrire. Le
   troisième mécanisme — la balise `<meta name="robots">` — dit `noindex,
   nofollow`, et c'est celui que Google honore. **Deux mécanismes sur trois
   mesurés, et une conclusion tirée comme si c'étaient les trois.** J'étais à
   une phrase d'annoncer au propriétaire qu'une branche de travail était
   exposée aux moteurs de recherche. Elle ne l'est pas.

**Ce qui reste, et qui n'est PAS un défaut aujourd'hui :** il n'y a ni
`robots.txt` ni `sitemap.xml`. Tant que le site est `noindex` par choix, un
sitemap serait une contradiction — il invite précisément ce qu'on refuse. Les
deux deviennent du travail **le jour où l'indexation s'ouvre**, en même temps
que le domaine de production, que `layout.tsx` signale déjà comme un arbitrage
de propriétaire (`metadataBase` pointe sur le domaine de preview, avec la note
« swap when a production domain is decided »). Je ne les ajoute donc pas.

**Fait mesuré, sans jugement :** `bac-pink.vercel.app` sert le sommet de la
branche de travail et se redéploie quelques minutes après chaque `git push` —
`bb9af56` à 19 h 56, `d1e2919` à 20 h 15. C'est cohérent avec un flux de
preview ; c'est écrit ici parce qu'un déploiement continu d'une branche non
relue est le genre de chose qu'on préfère savoir que découvrir.

## §11.140 — L'anatomie d'une leçon, re-mesurée : §11.69 confirmé au nombre près

Contrôle de l'anatomie que la VISION décrit, sur les 62 leçons :

- **La numérotation des barreaux n'a AUCUN trou** : 62 leçons sur 62, la suite
  des codes `R<n>` est contiguë du premier au dernier. Une rampe dont il
  manquerait un barreau n'existe pas dans ce corpus.
- **61 leçons sur 62 nomment leur R0 « Accroche »**. La 62ᵉ,
  `maths/probabilites-conditionnelles`, écrit « Le déclencheur : une question
  qui va te surprendre » — un synonyme, pas un manque. Aucune correction : on
  ne renomme pas le chapitre de quelqu'un pour uniformiser un mot.
- **16 items visent un barreau sans chapitre** — et ce sont **exactement** les
  16 du §11.69, notion par notion et barreau par barreau : `derivabilite-
  etude-fonctions` R6×7, `limites-continuite` R7×3 + R-bac×1,
  `probabilites-conditionnelles` R6×3 + R7×2. **La classe n'a pas bougé depuis
  qu'elle a été consignée.** Une re-mesure indépendante qui retrouve le même
  nombre EST un résultat : la porte d'owner §11.69 est toujours exactement ce
  qu'elle dit être, ni plus ni moins.

**Sauf que ma première mesure annonçait 39, et 23 étaient faux.** Mon motif
n'acceptait que `## R<n>`. `probabilites-conditionnelles` range ses barreaux en
`### R1 … ### R5` **sous un `## Décortiquer`** — une anatomie parfaitement
légitime, et invisible à un motif qui présume le niveau de titre. J'allais
écrire que la classe avait plus que doublé. Le validateur, lui, lisait déjà
`^#{1,6}` : **il avait raison et c'est mon banc qui avait tort**, pour la
quatrième fois de la journée et toujours de la même façon — la bonne chose
cherchée sous une seule de ses formes.

**Ce qui change quand même : le cliquet.** `validate-content` signalait la
classe en AVERTISSEMENT, et une fois par BARREAU (5 lignes pour 16 items). Or
§11.69 a été trouvé, je cite, « en triant les AVERTISSEMENTS du validateur —
ceux que personne ne relit parce qu'ils ne bloquent rien ». Un second sens de
`tracabilite-spec` compte désormais les ITEMS et **bloque à 16** : la dette
reste lisible et ne peut plus grandir en silence. Franche impossible — c'est
une porte d'owner ouverte, et un rouge permanent est un rouge qu'on apprend à
ignorer. Essai rouge §11.140.

## §11.141 — Le barreau qu'on lit et qu'on ne peut pas gravir

L'inverse exact du §11.140. Celui-ci demandait : un item vise-t-il un chapitre
qui existe ? Celui-là demande : **un chapitre a-t-il un item ?** Mesuré dans la
même boucle, sur le même relevé de titres — deux directions d'une seule
relation, jamais deux lectures qui pourraient diverger.

**13 barreaux portent un chapitre et aucun item ni point d'arrêt.** La
répartition ne se discute pas :

| matière | notions touchées | barreaux sans item |
|---|---|---|
| maths | 0 / 14 | 0 |
| pc | 0 / 25 | 0 |
| philo | 1 / 12 | 1 (`analyse-de-texte` R7) |
| **svt** | **11 / 11** | **12** |

**Et le barreau manquant est presque toujours le DERNIER** — R6, R7, R8, R9 :
le sommet, celui où l'élève devrait affronter l'épreuve. L'élève SVT lit le
dernier chapitre de chaque notion et n'a rien à y tenter.

**C'est le CINQUIÈME axe indépendant qui isole exactement les 11 mêmes
notions** : §11.114 (aucun sommet sourcé, 0/11), §11.119 (aucune marche
d'entrée, 0 item de niveau 1 sur 102), les leçons muettes (11 des 13 sans point
d'arrêt), §11.129 (aucune figure manipulable, 0/11), et celui-ci. Cinq mesures
qui ne partagent ni motif, ni fichier, ni définition, et qui désignent le même
sous-ensemble. **Ce n'est plus une coïncidence à vérifier, c'est un standard de
fabrication** — et il se tranche au niveau du propriétaire (porte ouverte
§11.119).

**Une mesure écartée en chemin, et c'est le banc qui l'a écartée.** J'avais
d'abord cherché les INVERSIONS de difficulté : un barreau plus facile que le
précédent. Dix trouvées, dont sept en SVT, six exactement à R3→R4 — un motif
tentant. Puis j'ai regardé les effectifs : **en SVT, un barreau porte un ou
deux items.** Une « moyenne » sur un item est cet item. `4,0 → 2,5` veut dire
« un item noté 4, puis deux notés 3 et 2 ». Il n'y a pas de distribution, donc
pas d'inversion à mesurer. **La mesure a été jetée, pas publiée** — elle aurait
donné un tableau de sept lignes qui n'aurait rien voulu dire. Ce qu'elle a
laissé derrière elle est ce §11.141 : une propriété binaire par barreau, qui ne
dépend d'aucun effectif.

**Essai rouge AVEUGLE au premier jet**, et l'essai avait tort : il déplaçait un
item d'un barreau qui en portait trois, donc le barreau restait peuplé. Vider
un barreau d'un seul remplacement demande un barreau à UN SEUL item —
`svt/chaines-de-montagnes` R0 est le seul du corpus. Refait, il est ROUGE.

## §11.142 — J'ai cassé le workflow, et personne n'était là pour le dire

En vérifiant que `gates.yml` parse — un réflexe, puisque je l'avais modifié
quatre fois dans la journée — il ne parsait pas. **Depuis six commits.**

La cause est d'une banalité totale : un nom d'étape que j'avais écrit

    - name: Traçabilité spec→item (cliquet : une spec neuve nomme un item qui existe)

Un `: ` dans un scalaire non cité rend le YAML invalide. GitHub aurait refusé
de charger le workflow : **aucune porte n'aurait tourné**, et le message
d'erreur serait arrivé au premier run après le retour du runner, six commits
plus loin, sans lien évident avec sa cause.

**Deux choses expliquent que ça ait duré, et aucune n'est le YAML.**

1. **La CI n'a plus de runner depuis la veille** (§11.117). Le seul lecteur qui
   aurait protesté était absent. Une panne d'infrastructure ne fait pas que
   suspendre les contrôles : elle **retire le filet qui attrape les fautes
   qu'on fait pendant la panne**. C'est le coût caché d'une CI muette, et il
   se paie sur les modifications qu'on apporte pendant ce temps-là.
2. **La garde anti-dérive lit `gates.yml` au MOTIF** (`node scripts/…`,
   `npm run …`). Un motif se moque de la validité : il a trouvé ses lignes
   dans un fichier mort et annoncé tranquillement « la liste couvre gates.yml
   (33 portes) ». **Un instrument qui lit un fichier par expression régulière
   ne peut pas dire que le fichier est invalide** — et il donnera toujours
   l'impression contraire, puisqu'il répond quelque chose.

**Le contrôle est armé en TÊTE de la garde** : `gates.yml` est-il du YAML, et
la structure attendue (`jobs.*.steps`) est-elle là ? Il s'arrête net si non —
comparer une liste extraite d'un relevé faux serait lui donner du crédit. Il
imprime aussi son verdict quand il est vert, y compris en mode garde seule :
un contrôle qui peut passer au rouge doit dire quand il passe au vert (ADR
0034). Essai rouge §11.142, avec le défaut exact, remis à l'envers.

**Ce que ça dit de la journée.** J'ai armé sept portes aujourd'hui en écrivant
qu'une porte doit pouvoir devenir rouge. Celle-ci manquait, et son absence a
laissé passer une faute à moi, dans le fichier qui décide de toutes les autres.
La règle vaut aussi pour la plomberie : **le fichier qui liste les contrôles
est lui-même un artefact qu'il faut contrôler.**

## §11.143 — Le parcours d'un élève, bout en bout, sur l'artefact déployé

Tous les contrôles du produit regardent des pages **une par une**. Un produit
peut avoir quatre pages saines et une couture morte entre deux — et c'est la
couture que l'élève traverse. Personne n'avait suivi le chemin.

Suivi aujourd'hui, sur un téléphone de **390 × 844** et sur l'artefact
DÉPLOYÉ : accueil → « Commencer la session » → la leçon → ouvrir les chapitres
→ répondre à un item.

- « Commencer la session » mène à `/notions/maths/limites-continuite` ;
- **28 items** sont atteignables après ouverture des chapitres ;
- répondre ajoute **348 caractères** de retour à l'écran — l'élève reçoit
  quelque chose, pas un silence ;
- la cible tactile d'un choix mesure **122 px** de haut (le plancher d'usage
  est 44) ;
- **0 px** de débordement horizontal ;
- **0 erreur de page, 0 réponse ≥ 400** sur tout le parcours.

**Zéro rupture.** Le chemin que suit un élève marocain sur son téléphone,
depuis l'adresse servie par l'hébergeur, tient de bout en bout.

**Et la première version de ce parcours accusait le produit à tort — la
sixième fois de la journée.** Elle concluait que « Commencer la session » ne
menait nulle part. Le lien était juste (`/notions/maths/limites-continuite`),
visible à 390 comme à 1280, et le point central de sa boîte reçoit bien le
clic. Le défaut était dans l'attente : j'attendais `networkidle` APRÈS le clic.
Cette condition était **déjà satisfaite**, la promesse revenait avant que la
navigation ait commencé, et je relisais l'ancienne adresse. Il faut attendre
l'ADRESSE, pas le réseau. C'est écrit dans le script, à l'endroit du piège.

Sans cette vérification, j'aurais consigné que **l'action principale du produit
est morte sur téléphone** — une alarme fausse, alarmante, et parfaitement
crédible.

Le parcours rejoint `deploye-sweep` : il se rejoue d'une commande, et il dit
sur quel commit il l'a mesuré.

## §11.144 — Et le parcours d'ÉPREUVE, l'autre moitié du produit

Après le parcours de leçon (§11.143), celui qui compte le plus : **l'élève
s'assoit devant un vrai sujet tombé.** Mesuré sur l'artefact déployé, téléphone
390 px, `/examens` → `spc-2025-normale` :

- « Commencer » est offert avec une cible de **48 px** ;
- il révèle **22 675 caractères** de sujet ;
- « Terminer » révèle **29 180 caractères** de corrigé ;
- **105 commandes d'auto-évaluation** dans ce corrigé ;
- le focus après « Terminer » atterrit sur un `DIV`, **pas sur `<body>`** —
  le correctif du §11.40 tient en ligne ;
- **0 px** de débordement, **0 erreur**, **0 réponse ≥ 400**.

**Une mesure prise au mauvais moment, et c'est le dessin qui l'explique.** Mon
premier passage comptait les commandes de réponse AVANT « Terminer » et en
trouvait **zéro**. Ce n'est pas un défaut : le sujet se compose **sur papier**,
le produit sert ensuite le corrigé, et l'élève s'y auto-évalue — les 105
commandes n'existent qu'après. Compter avant, c'était mesurer une absence qui
EST le dessin. L'ordre des mesures est désormais écrit dans le script, à côté
du compte.

Les deux parcours rejoignent `deploye-sweep` : onze contrôles, une commande,
et le commit mesuré annoncé en tête.

## §11.145 — L'index des décisions promettait plus qu'il ne contenait

J'ai créé `docs/audits/DECISIONS-EN-ATTENTE.md` ce matin parce qu'il n'y avait
nulle part où voir, d'un coup d'œil, ce qui attend un arbitrage — c'est la
leçon du §11.135 (« une dette qu'aucun registre ne nomme est invisible »).
L'après-midi, j'ai appliqué la même question **à ce registre-là**.

**Mesure : 30 documents d'audit sur 50 portent au moins un signal
d'arbitrage** (« décision attendue », « arbitrage owner », « à trancher »,
« owner call »). L'index en citait un. Il ne recense pas les décisions du
dépôt : il recense **celles qu'une passe a levées et écrites dedans** — et son
titre, pris seul, promet davantage.

**Ce que je n'ai PAS fait, et c'est le point.** Je n'ai pas versé les 30 dans
l'index. Beaucoup de ces signaux sont **clos** : le choix M1 a été pris et posé
en production le 2026-09-04, des campagnes entières ont été menées depuis.
Trier ce qui tient de ce qui est levé demande de relire chaque document contre
l'état actuel — **c'est un travail de propriétaire, pas une mesure**, et une
liste de 30 lignes dont on ne sait pas lesquelles sont mortes vaut moins que
pas de liste : elle donne l'apparence de l'exhaustivité.

Ce que j'ai fait : **écrire la portée réelle de la page dans la page**, avec le
tableau des 30 documents et leur nombre de signaux. Il dit **où chercher**, pas
ce qui reste. Un signal n'est pas une décision ouverte — c'est un endroit où
quelqu'un a écrit qu'il en fallait une.

**C'est l'ADR 0031 retourné contre mon propre travail.** Un instrument affiche
sa portée ; un document devrait afficher la sienne. Celui-ci s'appelait
« Décisions en attente » et contenait « les décisions en attente que j'ai
trouvées aujourd'hui » — deux choses différentes, et la seconde est honnête
seulement si elle est écrite.

## §11.146 — Le thème, vérifié en ligne ; et trois instabilités dans mon propre instrument

Le carnet du jour 8 porte un aveu : *« le second réfuteur (sombre / pas-de-flash
/ tête / mesure) est mort sur une limite de session avant de rapporter […]
aucun agent indépendant n'a re-vérifié ces affirmations-là »*. Elles le sont
maintenant, sur l'artefact SERVI.

- **La préférence du système est suivie.** Système sombre → fond
  `rgb(17, 16, 15)` ; système clair → `rgb(247, 247, 244)`. Un téléphone en
  mode nuit reçoit la leçon en sombre sans rien demander.
- **Aucun flash.** La teinte est relevée à chaque rafraîchissement depuis le
  tout début du document : **une seule teinte peinte** dans chaque cas, pas de
  bascule en cours de route.
- **La commande de thème est atteignable sur un téléphone.** Elle est masquée
  sous 1280 px dans l'en-tête — et j'ai bien failli en faire un défaut, avant
  de trouver qu'elle vit derrière « Menu et réglages ». Deux chemins existent
  donc à 390 px : le réglage du système, et le menu.

**Et trois instabilités, toutes dans l'instrument que je venais d'écrire.** Un
balayage neuf qui passe une fois ne prouve rien ; celui-ci a été lancé cinq
fois, et les trois premières ont divergé.

1. **Le relais n'est pas le produit.** Une police signalée `HTTP 502` pendant
   un passage — puis servie **200 cinq fois sur cinq**, 71 ko, à la main. Le
   conteneur sort par un relais qui rend des 502 sous charge. Une porte qui
   compte ce 502 comme un défaut du produit **crie au loup**. Chaque adresse
   fautive est désormais re-demandée une fois avant d'accuser.
2. **Un délai fixe n'est pas une attente.** La commande de thème était
   cherchée 500 ms après l'ouverture du menu : deux passages consécutifs, deux
   verdicts opposés. On attend maintenant qu'elle PARAISSE.
3. **Le DOM court, le texte servi non.** Le tampon de commit était lu dans le
   DOM après `domcontentloaded` ; avec le rendu en flux, le pied de page peut
   arriver après. Un passage sur deux annonçait « impossible de savoir ce qui
   est en ligne » sur un artefact parfaitement sain. Il se lit désormais dans
   le **HTML servi**.

**La règle, et elle n'était pas dans l'ADR 0036 : un instrument neuf se lance
PLUSIEURS FOIS avant d'être cru.** Une porte instable est pire qu'une porte
absente — l'absente ne dit rien, l'instable enseigne à ignorer le rouge. Trois
passages consécutifs à zéro échec, maintenant, sur le même artefact.

## §11.147 — Ce que lit l'élève qui se TROMPE, vérifié en ligne

Les parcours des §11.143–144 vérifient qu'on peut répondre. Mais répondre juste
n'est pas la promesse : **ce qui fait le tuteur, c'est ce que lit celui qui se
trompe.** La VISION demande que chaque distracteur porte une misconception et
qu'elle soit CONFRONTÉE. Jamais vérifié de bout en bout.

Témoin : `LIMCONT-7`, distracteur « 2,1 » — l'élève qui prend une valeur du
tableau pour la limite. Cliqué sur l'artefact déployé, sur un téléphone. Ce
qu'il lit, mot pour mot :

> **incorrect** — 2,1 n'est qu'une des valeurs du tableau, obtenue pour
> $x = 1{,}1$ — pas la valeur limite. Il faut regarder la **TENDANCE** de toute
> la colonne (2,1, puis 2,01, puis 2,001…)

L'erreur est **nommée**, sa **cause** est donnée (« obtenue pour x = 1,1 »), et
la **bonne façon de regarder** est montrée. C'est la promesse tenue, sur
l'adresse que sert l'hébergeur.

**Et le témoin montre le §11.121 en action.** Le choix écrit « D » dans le YAML
se rend en **position A** : `lib/shuffle.ts` mélange les propositions, et la
lettre affichée n'a rien à voir avec l'identifiant d'auteur. C'est la
démonstration vivante de pourquoi un renvoi « choix B » dans une prose est faux
à l'écran — la règle armée ce matin, vue en ligne cet après-midi.

**Neuvième erreur de banc du jour, et de la même famille que les huit autres.**
Ma première assertion cherchait « n'est qu'une des valeurs » — la forme du
FICHIER. L'écran rend « n’est », parce que le produit applique la typographie
française. La chaîne authored ne se trouve pas dans le rendu, et pour une
raison qui est une qualité du produit. Le contrôle cherche désormais un
fragment sans apostrophe.

Le témoin rejoint `deploye-sweep` : deux passages consécutifs, trois contrôles
verts.


## §11.148 — La page qui s'interrompt parlait anglais

`src/app/` portait `not-found.tsx` et **rien d'autre**. Aucune frontière
d'erreur. Toute exception non rattrapée côté client remplaçait donc la page par
le repli intégré de Next :

> *Application error: a client-side exception has occurred (see the browser
> console for more information).*

En anglais, sur un produit français destiné à des élèves marocains, et en
renvoyant à la console du navigateur — ce qui ne veut rien dire pour un élève
de terminale.

**La phrase a été LUE en ligne**, par le balayage clavier de `deploye-sweep`,
qui s'est arrêté dessus au lieu du lien d'évitement :

```
  ✗ clavier — premier arrêt = lien d'évitement (« Application error: a client-si »)
```

**Et elle ne s'est PAS reproduite.** Trois balayages complets de l'artefact
déployé, après coup, sur le même commit : `✓ clavier — premier arrêt = lien
d'évitement (« Aller au contenu »)`, 0 échec les trois fois. Il faut donc dire
les deux choses, et ne pas laisser la première tenir lieu de diagnostic :

- **Ce qui est établi** : la page d'accueil déployée a rendu, une fois, le repli
  anglais de Next. Une exception cliente non rattrapée y arrive donc bel et
  bien, et le produit n'avait RIEN à opposer.
- **Ce qui ne l'est pas** : sa cause. L'hypothèse la plus économique est un
  morceau de JavaScript perdu en vol — le relais de ce conteneur rend des 502
  transitoires sur des ressources parfaitement saines, mesuré le jour même sur
  une police —, ce qui fait échouer l'hydratation, bascule la racine en rendu
  client, et casse tout si le morceau manquant est nécessaire. C'est une
  hypothèse, elle n'est pas rejouée, et elle est écrite comme telle (ADR 0036
  §7 : un diagnostic non rejoué est une rumeur).

**La frontière d'erreur, elle, ne dépend pas de ce diagnostic.** Qu'une
exception vienne d'un morceau perdu, d'un défaut de code ou d'un navigateur
exotique, ce qu'un élève lit alors ne doit pas être une phrase anglaise qui le
renvoie à la console.

**Deux frontières écrites**, dans la voix du produit (celle de
`VeilleHydratation` : calme, à la deuxième personne, une action possible) :

- `src/app/error.tsx` — « Cette page s'est interrompue », « Réessayer »,
  « Recharger la page », « Revenir à l'accueil ». Le cartouche reprend
  exactement le balisage de `not-found.tsx`, classes comprises.
- `src/app/global-error.tsx` — le dernier filet, qui rend son propre `<html>` :
  styles EN LIGNE uniquement, avec un bloc `prefers-color-scheme`, parce qu'à
  cet étage la feuille de style du site peut ne pas s'être appliquée.

**Deux pièges payés en les vérifiant**, tous deux écrits dans la route d'essai
avant de la supprimer :

1. Un dossier commençant par `_` est **privé** pour le routeur de Next : il ne
   devient pas une route. J'ai obtenu une 404 en croyant éprouver la frontière.
2. Une page qui lève **à chaque rendu** casse la CONSTRUCTION, puisqu'elle est
   pré-rendue. Pour éprouver la frontière CLIENT, il faut ne lever que dans le
   navigateur.

Vérifié dans les deux thèmes à 390 px : titre français, message rassurant,
« Réessayer » à 48 px, 0 px de débordement, plus aucune phrase anglaise. La
route d'essai a été supprimée et le build refait sans elle.

## §11.149 — Un désaccord d'hydratation éteint le thème et rapetisse le texte

C'est §11.148 qui l'a montré, et ce n'était pas ce que je cherchais. En
comparant la classe de `<html>` avant et après hydratation sur la route
d'essai, en contexte sombre :

```
  /                        après hydratation : class="… dark"   fond=rgb(17, 16, 15)
  /essai-erreur-temporaire après hydratation : class="…"        fond=rgb(247, 247, 244)
```

La page d'erreur perdait le thème. En cherchant pourquoi, le fait s'est avéré
**bien plus large que la page d'erreur** — et il n'a rien à voir avec les
erreurs.

**Le mécanisme.** Les deux réglages d'affichage vivent sur `<html>` : la classe
`.dark` et la variable `--font-scale`. Les deux sont posés avant la peinture par
le script en ligne `THEME_BOOT` du layout, et **par personne d'autre** :
`ThemeToggle` et `FontSizeStepper` ne font que LIRE l'état au montage, puis
l'écrire quand l'élève clique. Or `<html>` est rendu par React, et le serveur le
rend toujours SANS la classe et SANS la variable. Tant que l'hydratation
réussit, React n'y touche pas. Dès qu'elle échoue, React abandonne le HTML du
serveur, refait un rendu client complet, et réapplique les attributs de `<html>`
tels que le layout les déclare. Les deux préférences tombent.

**Mesuré** (thème sombre émulé, `bac-textsize=large`) :

| route                              | `dark` | `--font-scale` |
|---|---|---|
| `/` (hydratation normale)          | oui    | 1.125 |
| route à **désaccord** d'hydratation | NON   | (vide) |
| route qui lève (`error.tsx`)       | NON    | (vide) |

La ligne du milieu est celle qui compte : **un désaccord d'hydratation
n'affiche aucune erreur.** La page marche. Elle repasse simplement en clair, et
le texte agrandi redevient petit — le réglage même dont dépendent les élèves qui
voient mal, perdu sans que rien ne le dise.

**Le correctif** : `web/src/components/ui/GardePreferences.tsx`, monté en tête
du `<body>`. Il ne rend rien. Au montage — donc aussi après un rendu de secours,
puisque tout l'arbre remonte — il relit la source de vérité (localStorage, à
défaut la préférence système pour le thème) et remet la classe et la variable si
le DOM en a divergé. Il n'écrit jamais dans localStorage : il n'est pas un choix
de l'élève, seulement la mémoire de ce que l'élève a déjà choisi. Il est monté
AVANT l'en-tête pour que son effet parte avant ceux de `ThemeToggle` et
`FontSizeStepper`, qui lisent le DOM au montage — leurs icônes ne mentent donc
pas.

**La porte** : `web/scripts/preferences-secours.mjs`, en CI. Elle provoque le
vrai chemin **sans aucune route d'essai dans le produit** — elle intercepte le
HTML servi d'une vraie page et y change un texte que React compare à sa charge
RSC.

Rouge et vert par la même commande :

```
node scripts/preferences-secours.mjs https://bac-pink.vercel.app   → ROUGE (les deux axes)
node scripts/preferences-secours.mjs                               → VERTE
node scripts/preferences-secours.mjs --essai-rouge                 → doit CRIER
```

**Quatre bancs d'essai payés en l'écrivant, et ils disent tous la même chose :**

1. **La porte est revenue MUETTE à son premier passage** — et elle avait
   raison. Elle n'écoutait que la console et l'anglais (« did not match the
   server-rendered HTML »), alors qu'un build de PRODUCTION — le seul qu'elle
   mesure — LÈVE le désaccord, minifié et sans texte : « Minified React error
   #418 ». Sans le verdict MUET, elle serait sortie **verte sans avoir rien
   mesuré**. C'est l'ADR 0034 qui gagne sa place : une porte doit pouvoir dire
   « je n'ai rien éprouvé ».
2. **Mon second témoin était muet lui aussi.** Un observateur de mutations posé
   sur `document.documentElement` depuis un script d'initialisation annonçait
   « 0 réécriture de class » sur une page où la classe changeait cinq fois : à
   cet instant `<html>` n'existe pas encore, `observe(null)` lève, et personne
   ne lit cette erreur. Un témoin muet affiché à côté d'un verdict vert est pire
   que pas de témoin.
3. **Le premier essai rouge criait par la mauvaise branche.** Il neutralisait
   les deux clés de stockage et mettait le système en clair : la porte criait,
   mais par le TÉMOIN — le sabotage cassait aussi le chargement normal. Vert
   sur rouge, en ayant prouvé autre chose que ce qu'il annonce : une porte
   exacte sur une question voisine (ADR 0033). Le sabotage retenu est minimal —
   une seule clé renommée, système en sombre — et le mode `--essai-rouge` exige
   désormais que le témoin soit resté intact, faute de quoi il sort
   « INCONCLUANT ».
4. **Un serveur de cinq heures répondait encore.** Mes `kill` tuaient
   l'enveloppeur `npm`, pas le serveur : trois `next-server` orphelins
   traînaient, et l'un d'eux servait un build d'avant sur le port que je croyais
   frais. Une route pourtant présente dans le manifeste et sur le disque
   revenait 404, et j'ai commencé à chercher un middleware fautif. La mesure
   accusait le produit d'un défaut qui était le mien. La porte lève et tue
   maintenant son propre serveur **par son groupe** (`-pid`), et toute mesure
   contre un serveur local commence par prouver que c'est le bon build qui
   répond.

Stabilité (ADR 0036 §9) : trois passages verts identiques, trois essais rouges
identiques, puis trois passages verts de plus après suppression des routes
d'essai et reconstruction.

**Ce qui n'est PAS armé, et c'est écrit plutôt que taire** : la porte ne mesure
qu'une page et un seul déclencheur de secours. Elle ne dit pas combien de
désaccords d'hydratation le produit porte réellement — seulement ce qui arrive
quand il y en a un.

## §11.150 — Combien de pages désaccordent vraiment : 0 sur 118, et la preuve que le zéro compte

§11.149 garde ce qu'un désaccord d'hydratation **coûte**. Il ne dit rien du
nombre de désaccords que le produit **porte** — et son en-tête le dit, plutôt
que de laisser un vert répondre à une question qu'il ne pose pas (ADR 0036 §5).
Voici la seconde question, mesurée.

`web/scripts/desaccords-hydratation.mjs` charge les **118 routes prérendues**
du build, une par une, et écoute les trois codes du secours : #418
(l'hydratation a échoué), #423 (la racine bascule en rendu client), #425 (le
texte ne correspond pas). Sur `pageerror` autant que sur la console — un build
de production ne rédige pas ces messages, il les lève minifiés, et c'est
exactement ce qui avait rendu la porte soeur MUETTE à son premier passage.

**Résultat : 0 désaccord sur 118 routes**, trois passages identiques.

**Et le zéro a été gagné avant d'être cru.** Un « 0 » sorti d'un instrument
neuf ne vaut rien tant qu'on ne l'a pas vu reconnaître un cas positif :
`--essai-rouge` fabrique un désaccord sur la seule page d'accueil — en changeant
un texte du HTML servi, que React compare à sa charge RSC — et exige que le
balayage signale `/` **et elle seule**. S'il ne signale rien, il est aveugle ;
s'il signale tout, il crie au loup. Il signale `/ → #425 #418 #423`.

**Deuxième forme, gardée dans la même boucle.** Une page qui ne s'hydrate
JAMAIS est pire qu'une page qui désaccorde, et un balayage qui ne cherche que
des désaccords la laisserait passer en vert. Le balayage attend donc le drapeau
que le produit pose lui-même (`__bacVivant`, `SignalVivant.tsx`) et compte
« JAMAIS HYDRATÉE » comme un défaut à part entière (ADR 0036 §1 : énumérer les
FORMES avant de conclure à l'absence).

**Il attend l'événement, pas la montre.** Première version : 1 800 ms fixes par
route. C'est la faute que la journée avait déjà payée deux fois — un délai fixe
sur la commande de thème avait rendu deux verdicts opposés. En attendant le
drapeau, le balayage est passé de ~4 min à **61 s** pour tout le site, et il ne
mesure plus l'absence d'une erreur qui n'a pas encore eu lieu.

**Portée, écrite plutôt que sous-entendue** : les routes dynamiques non
prérendues n'y sont pas, ni aucun état atteint par un clic. Une page peut
s'hydrater proprement puis désaccorder après une interaction — ce balayage ne
le verrait pas. Et il mesure un `next start` local, pas l'artefact déployé.

En CI, cliquet à 0, suivi de l'essai rouge dans la même étape : une porte dont
le rouge est rejoué à chaque passage ne peut pas devenir inerte sans qu'on le
sache.

## §11.151 — Le produit ouvert, pour la première fois, ailleurs que dans Chromium

Tout ce que ce dépôt a mesuré l'a été dans un seul moteur. Les 279 contrôles de
`dom-truth`, les 258 figures certifiées aux pixels, le zoom à 400 %, les
balayages téléphone, les campagnes de contraste : **Chromium, toujours**. Un
élève qui ouvre le site sur l'iPhone d'un grand frère lit du WebKit ; sur un
Firefox Android, du Gecko. Ni l'un ni l'autre n'avait jamais été ouvert.

Ce n'est pas un raffinement. Le produit repose sur cinq endroits où les moteurs
divergent historiquement : **KaTeX**, les colonnes en `ch`,
**`content-visibility`** pour les chapitres repliés (§11.56), l'en-tête collant,
et le **script de thème avant peinture**.

Les deux moteurs ne sont pas dans l'image. Ils s'installent :

```
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  npx playwright@1.61.1 install firefox webkit
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright@1.61.1 install-deps webkit
```

WebKit **refuse de démarrer** sans la seconde commande (gstreamer, enchant,
woff2, x264…) ; Firefox démarre sans rien de plus. Obtenus : Firefox 151,
WebKit 26.5.

### Ce que ça dit

`trois-moteurs.mjs` compare un vecteur de faits objectifs sur 5 pages × 3
moteurs, à 390×844, thème système sombre. **Aucune divergence sur les huit
classes armées**, trois passages identiques :

| | chromium | firefox | webkit |
|---|---|---|---|
| formules KaTeX (leçon de maths) | 1 051 | 1 051 | 1 051 |
| erreurs de formule | 0 | 0 | 0 |
| thème avant peinture appliqué | oui | oui | oui |
| chapitres repliés qui peignent | 0 | 0 | 0 |
| exceptions | 0 | 0 | 0 |
| titres / liens | identiques | identiques | identiques |

C'est une **parité**, pas une correction : une valeur identique partout ne dit
pas qu'elle est bonne, seulement qu'elle est la même. Les deux énoncés sont
vrais et il faut les garder séparés (ADR 0031).

### Les 5 px de WebKit : la barre, pas le produit

WebKit affichait 380 px de colonne principale là où les deux autres affichent
390, et 5 px de défilement horizontal sur les leçons là où les autres affichent
0. **Avant d'appeler ça un défaut Safari, je l'ai ouvert** :

```
  chromium : innerWidth=390 · clientWidth=390 · scrollWidth=390 · barre=0px
  webkit   : innerWidth=390 · clientWidth=380 · scrollWidth=385 · barre=10px
```

Le WebKit de Playwright sous Linux peint une barre de défilement **classique**
de 10 px, qui retire 10 px au viewport de mise en page. Les seuls éléments qui
dépassent cette largeur — un SVG de figure à 656 px — la dépassent dans les
**trois** moteurs, à l'intérieur d'un conteneur qui défile : c'est le dessin
voulu. Les 5 px sont la barre. L'instrument mesure et AFFICHE désormais la
largeur de cette barre, juste au-dessus des deux lignes qu'elle explique, pour
que personne ne les relise comme un défaut.

**Et ce que ce banc ne peut pas dire** : ce que fait Safari sur un vrai iPhone,
dont la barre est en surimpression et ne prend aucune largeur. Le WebKit de
Linux est le même moteur dans un autre portage — pas le même navigateur.

### L'essai rouge a rapporté un fait de plus

Priver WebKit de ses morceaux de JavaScript doit faire diverger `hydratee` —
c'est le but. Il a aussi fait diverger `liens`, de **+1 sur les cinq pages**.
Vérifié en le lisant plutôt qu'en le supposant : le lien supplémentaire est
« **Recharger** », et il est le **premier du document**. C'est la veille
d'hydratation de §11.29, qui fonctionne donc aussi dans WebKit, et qui place sa
sortie de secours là où un élève au clavier la trouve d'abord.

L'essai rouge ATTEND désormais ce +1 au lieu de l'exclure : s'il disparaissait,
la veille aurait cessé de marcher dans ce moteur, et l'essai le dirait.

### Ce qui reste

Cinq pages, un seul gabarit, un seul thème. Ni les figures aux pixels, ni le
clavier, ni le lecteur d'écran ne sont rejoués dans les trois moteurs. Et
l'instrument est **hors CI délibérément** : deux moteurs à télécharger et une
installation apt pour WebKit — le coût est écrit à côté de ce qu'il garde,
plutôt que laissé à deviner (ADR 0036 §8).

## §11.152 — Les figures réglées contre une police que personne ne charge

§11.151 venait d'ouvrir Firefox et WebKit. La première chose à y rejouer était
celle qui dépend le plus de la fonte : **le corpus de figures**, 257 SVG réglés
étiquette par étiquette contre les métriques de texte de Chromium. Un texte hors
du `viewBox` est COUPÉ à l'affichage — l'élève lit « vitess » au lieu de
« vitesse », ou perd une unité.

**Mesuré : 5 figures ne débordent que dans Firefox.** Quatre portent la même
étiquette d'axe.

### Ce qui s'est passé quand j'ai ouvert le cas

```
  chromium : « V (mL) »  largeur 37,2u  bord droit 651,2  cadre 654   → 2,8u de marge
  firefox  : « V (mL) »  largeur 43,4u  bord droit 655,9  cadre 654   → dehors
```

Firefox dessine la même chaîne **17 % plus large**. Et la raison n'est pas
Gecko : les figures déclarent

```
font-family="'IBM Plex Sans', system-ui, sans-serif"
```

et **IBM Plex Sans n'est chargée nulle part** — ni dans ce conteneur, ni par
l'application, dont le layout ne charge que Geist et la serif de lecture. Chaque
moteur, sur chaque appareil, retombe donc sur une police différente : celle du
système de l'élève. **Le défaut n'est pas « Firefox ». Le défaut est une
étiquette réglée au pixel près contre la substitution d'un seul moteur** — un
pari sur la police d'un inconnu.

### La grandeur qui décide

Ce n'est pas le nom du navigateur, c'est la **marge en pourcentage de la largeur
du texte**. 8 % de marge veut dire qu'une police 8 % plus large coupe
l'étiquette. `marge-etiquettes.mjs` la mesure sur les 4 108 textes du corpus, en
tenant compte de l'ancre (un texte ancré à gauche grandit à droite ; centré, des
deux côtés).

**34 étiquettes sous 15 %**, dont deux déjà hors cadre à la marge d'un pixel
près. `V (mL)` était à 7,5 %.

### Corrigé, et vérifié

Les quatre `V (mL)` passent de x=614 à x=604 — 12,8u de marge au lieu de 2,8,
soit 34 % de la largeur. Le voisin le plus proche est une graduation « 25 » à
douze unités plus bas, sur une autre ligne de base : aucun contact.

```
  avant : chromium 0 · firefox 5 · webkit 0
  après : chromium 0 · firefox 1 · webkit 0
```

Le survivant est `loi-mailles-build.svg`, la dette owner déjà consignée (son
étiquette « uC » est à **−10,6 %**, la pire du corpus). Il reste tel quel : cette
figure attend un arbitrage, et la corriger au passage effacerait la question.

`figure-preview` sur les quatre figures modifiées rapporte les deux mêmes
signalements « barre » qu'AVANT la modification — vérifié en le relançant sur la
version d'origine tirée de `git show`, pas en le supposant. La classe « barre »
n'est pas armée, et ces deux-là ne sont pas de moi.

### Le piège, encore le même

Premier jet de la sonde à trois moteurs : `getBBox()` brut, marge 0,5 px, et le
bord HAUT contrôlé en plus. Verdict : « 3 figures débordent dans les trois
moteurs » — alors que la CI annonce 0 sur le même corpus. Ce n'était pas une
découverte, c'était un **désaccord d'instrument**, et c'est le mien qui avait
tort :

- `getBBox()` rend la boîte dans le repère PROPRE de l'élément ; un texte dans un
  `<g transform="…">` est alors comparé à un cadre qui n'est pas le sien (sept
  figures du corpus portent un transform et du texte) ;
- la porte armée tolère 1 px, pas 0,5 ;
- la porte armée ne contrôle pas le bord haut.

`boiteRacine` a été repris **mot pour mot** de `figure-preview.mjs`. Chromium
est alors retombé à 0, d'accord avec la CI — et c'est cet accord qui rend les 5
de Firefox croyables. **Comparer deux moteurs n'a de sens que si la question
posée est identique, y compris identique à celle que la CI garde.**

### Armé

`marge-etiquettes` est en CI (elle ne demande que Chromium), cliquet à 30, suivie
de son essai rouge — une étiquette collée au bord injectée dans une figure, que
la sonde doit voir, et elle seule. `figures-trois-moteurs` reste hors CI, comme
`trois-moteurs`, pour la même raison écrite au même endroit.

**Ce que la porte ne dit pas** : le seuil de 15 % vient d'un écart mesuré entre
deux moteurs de ce conteneur, pas d'un inventaire des polices des téléphones
marocains. Et elle ne dit pas si une étiquette coupée serait GRAVE — « V (mL) »
amputé de sa parenthèse se devine ; un chiffre, non. Les 30 restantes sont donc
un fait posé pour le propriétaire, pas une dette que j'ai décidé seul de solder.

## §11.153 — Les trois polices candidates, mesurées

Suite directe de §11.152, et la question qu'il laissait ouverte : si la police
déclarée n'est chargée nulle part, laquelle FAUDRAIT-il ?

Mesuré sur les 4 108 textes du corpus, même sonde, même tolérance, Chromium :

| | figures hors cadre | étiquettes sous 15 % de marge | largeur totale |
|---|---|---|---|
| aujourd'hui (repli système) | 0 | **30** | 374 083 u |
| Geist (la police du site) | 0 | **6** | −15,3 % |
| IBM Plex Sans (la bible) | 0 | **4** | −16,0 % |

Les deux alternatives sont meilleures que l'état actuel **sur les deux
colonnes**, et surtout elles rendent les largeurs déterministes : les mêmes sur
tous les appareils, au lieu d'une par police système. Le corpus a manifestement
été composé contre des métriques plus étroites que le repli qu'il obtient.

Geist ne coûte rien (déjà servie) et se pose en une règle CSS — une règle CSS
l'emporte sur l'attribut de présentation d'un SVG, donc les 242 fichiers ne
seraient pas touchés. IBM Plex Sans coûte 22,6 ko (sous-ensemble latin 400) et
c'est ce que la DESIGN-BIBLE §3 demande nommément, pour une raison écrite dans
`layout.tsx` : « unambiguous 1/l/I/0 for a maths product ».

**Je n'ai rien changé.** Changer le caractère de 242 figures est une décision
d'identité visuelle ; ajouter une police est une décision de poids sur un
produit destiné à des forfaits serrés. Les trois chiffres sont mesurés, le choix
ne l'est pas — il est posé en `DECISIONS-EN-ATTENTE §13`.

## §11.154 — L'élève dont le navigateur refuse le stockage

Navigation privée, « bloquer les cookies et données de site », appareil d'école
verrouillé, navigateur d'opérateur. Dans tous ces cas, `localStorage` ne rend
pas `null` : **il lève** — et il lève à l'ACCÈS, pas seulement à l'écriture.
Lire `window.localStorage` suffit à déclencher une `SecurityError`. Une lecture
non protégée dans un rendu React n'est donc pas une préférence perdue, c'est une
page morte.

Le produit y touche à cinq endroits (`layout.tsx`, `ThemeToggle`,
`FontSizeStepper`, `useFiliere`, `GardePreferences`), pour quatre valeurs qui
sont toutes des préférences — jamais de l'état d'apprentissage (ADR 0025
§2.11). La question n'est donc pas « l'élève perd-il ses réglages » : oui, et
c'est le comportement voulu. La question est **la leçon reste-t-elle lisible et
répondable**.

**Mesuré : oui, à l'identique du témoin.**

| | témoin | stockage refusé |
|---|---|---|
| le JavaScript prend la main | ✓ | ✓ |
| items atteignables sur la leçon | 28 | 28 |
| retour après une réponse | 348 car. | 348 car. |
| sujet révélé par « Commencer » | 23 459 car. | 23 459 car. |
| frontière d'erreur déclenchée | non | non |
| exceptions non rattrapées | 0 | 0 |

Trois passages identiques.

### Deux gardes sur le banc lui-même

**Le sabotage a-t-il pris ?** Le banc le demande à la page (`try { void
localStorage } catch`). Sans ce contrôle, une colonne « refusé » qui n'aurait
rien refusé rendrait un vert parfaitement vide — la porte MUETTE de l'ADR 0034
sous un autre nom.

**Les détecteurs détectent-ils ?** `--essai-rouge` bloque les morceaux de
JavaScript : le banc rapporte alors 6 échecs. Un banc qui ne sait pas échouer ne
sait rien dire.

### Et le témoin qui tombe

Premier jet : deux contrôles rouges — « répondre produit un retour » et « le
chapitre suivant s'ouvre » — **dans les DEUX colonnes**, témoin compris. C'est
le témoin qui a parlé : un banc dont le contrôle échoue ne mesure pas le
produit. J'avais inventé des sélecteurs (`input[type=radio]`,
`button[data-choix]`) qui n'existent nulle part, et surtout les chapitres sont
des `<details>` repliés — il faut les OUVRIR avant de chercher un item, sinon on
mesure une absence qui est le dessin. Sélecteurs repris de `deploye-sweep`, qui
les avait déjà payés.

**Ce que la porte ne dit pas** : le stockage PLEIN (quota dépassé) est un autre
cas — il lève à l'écriture seulement, et sous un autre code. Il n'est pas
mesuré.

## §11.155 — « Réduire les animations » : le mécanisme marchait, sa portée n'était pas mesurée

`prefers-reduced-motion` n'est pas un confort. Il est demandé par les élèves
sujets aux migraines vestibulaires, au mal des transports et aux troubles de
l'attention — exactement la population qu'une révision de trois heures met le
plus à l'épreuve.

Le mécanisme existait, et il est bien fait : `globals.css` écrase les durées de
transition à 0,01 ms sous ce réglage, `MotionDiagram` révèle toutes ses étapes
d'un coup, `MotionStage` supprime ses tweens. Et `dom-truth` le vérifie — **sur
une figure, dans une leçon.** C'est la preuve que le mécanisme FONCTIONNE. Ce
n'est pas la mesure de ce qu'il ATTEINT : un mécanisme et sa portée sont deux
choses (ADR 0031), et le corpus n'avait jamais été balayé sous ce réglage.

**Mesuré sur les 66 pages, dans les deux réglages :**

```
  no-preference   66 pages · 0 animation vivante · 22 182 transitions > 50 ms
  reduce          66 pages · 0 animation vivante ·      0 transition  > 50 ms
```

Le témoin est la moitié de la mesure : sans ces 22 182, le zéro ne prouverait
rien — il dirait seulement que la sonde ne voit aucun mouvement. La porte exige
donc explicitement que le réglage normal en montre.

### Le second sens, et la faute qu'il m'a values

Premier jet : j'ai contrôlé que la barre de transport disparaît sous « reduce »,
et déclaré **ROUGE six notions**. Elles respectaient leur contrat à la lettre.

**Il y a deux voies de mouvement, et leurs contrats sont OPPOSÉS — les deux à
juste titre :**

- **MotionDiagram** (des `<g id="step-N">` dans un SVG ordinaire) : *« under
  reduced-motion all steps are visible at once; there is nothing to step
  through »* → tout révélé, barre RETIRÉE.
- **MotionStage** (la voie `.motion.json`, jouée par GSAP) : *« every advance
  SEEKS instantly to the target settle point (zero animation). Controls still
  advance; the student still drives the reveal »* → barre GARDÉE. La retirer
  priverait l'élève du contenu, puisque c'est lui qui le déroule.

J'avais appliqué le contrat du premier aux commandes du second : une porte
exacte, sur une autre question (ADR 0033). La voie se lit dans le **dépôt** — un
`*.motion.json` signe MotionStage — et non dans le DOM, où les deux se
ressemblent.

Corrigé, les deux contrats tiennent :

```
  45 pages MotionDiagram : 251 barres → 0, 0 étape cachée
   6 pages MotionStage   :  11 barres gardées, l'élève déroule sans animation
```

### Armé

En CI, avec son essai rouge : la seconde passe n'émule plus `reduce`, et la
porte doit crier sur ses deux sens — 66 pages qui bougent encore et les barres
MotionDiagram restées. Trois passages verts identiques.

**Ce que la porte ne dit pas** : elle ne mesure que ce qui est visible au
CHARGEMENT. Une animation déclenchée par un clic — le pas à pas de MotionStage —
n'est pas parcourue ; `dom-truth` en garde l'instantanéité sur une figure
témoin, et cette portée-là reste à un.

## §11.156 — Le stockage PLEIN, et les deux commandes qui écrivent

§11.154 se terminait sur une dette écrite : « le stockage PLEIN (quota dépassé)
est un autre cas — il lève à l'écriture seulement, et sous un autre code. Il
n'est pas mesuré. » Le laisser écrit sans le fermer aurait fait une dette de
plus ; il est fermé.

**Trois cas maintenant, et ils ne lèvent pas au même endroit :**

| | l'accès lève | l'écriture lève |
|---|---|---|
| témoin | non | non |
| refusé (navigation privée) | **oui** | oui |
| plein (`QuotaExceededError`) | non | **oui** |

Et deux contrôles de plus, qui sont précisément ceux que le cas « plein »
distingue du cas « refusé » : **basculer le thème** et **agrandir le texte**.
Là, l'élève clique, l'écriture échoue, et la question est de savoir si le
réglage s'applique quand même pour la session.

**Il s'applique.** `ThemeToggle` et `FontSizeStepper` posent tous deux leur
effet APRÈS le `try` : `--font-scale` passe de ∅ à 1.125 et la classe `dark`
bascule, dans les trois cas. C'est le bon ordre, et il est maintenant gardé.

### Le témoin a reparlé

Premier jet des deux nouveaux contrôles : rouges dans les **trois** colonnes.
À 390 px, la bascule de thème et le pas de taille vivent derrière « Menu et
réglages » (§11.146) — un banc qui clique sans ouvrir le menu mesure une absence
qu'il a lui-même fabriquée. C'est la troisième fois de la journée que le témoin
attrape l'instrument avant que l'instrument n'accuse le produit ; c'est
exactement ce à quoi sert un témoin.

Essai rouge rejoué avec les trois cas : 15 échecs sous JavaScript bloqué.
Trois passages verts identiques.

## §11.157 — J'allais armer deux mesures qui ne mesurent rien

Le comparateur à trois moteurs (§11.151) comptait les formules : 1 051 dans les
trois, 0 erreur. C'est rassurant et c'est insuffisant — **une formule rendue
dans une police de SECOURS compte quand même pour une.** Si le woff2 de KaTeX ne
charge pas dans un moteur, le compte reste 1 051 et les mathématiques sont
dessinées par un Times de repli.

J'ai donc ajouté deux axes, et j'ai voulu les éprouver avant de les armer, en
bloquant réellement les polices (`route("**/*KaTeX*", abort)`) :

```
  polices servies  : 1051 formules · largeur cumulée 4138px · 20 familles déclarées, 2 chargées
  polices BLOQUÉES : 1051 formules · largeur cumulée 4178px · 20 familles déclarées, 0 chargées
```

**Les deux axes que j'allais armer ne voient rien :**

- la **largeur cumulée** des `.katex` bouge de **+1,0 %** quand les polices
  disparaissent — noyée dans le bruit de mise en page, qui vaut **7 %** entre
  moteurs à 390 px par la seule largeur de la barre de défilement ;
- le nombre de familles **déclarées** reste 20 dans les deux cas.

Seul le nombre de familles réellement **chargées** bouge : 2 → 0. C'est le seul
des trois qui est armé.

Sans cette vérification j'aurais posé un seuil de 5 % sur la largeur — il aurait
crié sur la barre de défilement de WebKit (faux rouge) et serait resté muet
quand les polices manquent (vrai vert creux). **Mesurer le rouge AVANT de
choisir le seuil**, au lieu de choisir un seuil et de croire au vert qu'il rend.

Son essai rouge est à part (`--essai-rouge-katex`) : les polices KaTeX sont
refusées au seul WebKit, et le comparateur doit signaler `katexChargees` sur la
page à formules **et rien d'autre** — le compte de formules, lui, ne bouge pas,
ce qui est précisément le piège que cet axe existe pour éviter.

*(Au passage, la largeur reste AFFICHÉE, non armée : elle documente que les
moteurs ne crénent pas pareil — « f(1) » mesure 33 px dans Chromium et Firefox,
26 px dans WebKit, pour 0,5 % d'écart sur le total à 1280 px.)*

## §11.158 — Le calcul lui-même : 543 égalités vérifiées, et trois familles d'égalités fausses EXPRÈS

Une erreur de calcul dans un corrigé est le pire défaut que ce produit puisse
avoir : l'élève qui refait le calcul et trouve autre chose conclut que c'est
**lui** qui se trompe. Rien ne vérifiait cela — tous les contrôles de contenu
portent sur la forme (étiquettes, renvois, couverture), aucun sur le nombre.

`calculs-numeriques.mjs` ne peut vérifier qu'une part étroite, et c'est assumé :
sur **21 938** expressions contenant un « = », **543 sont entièrement
numériques** (2,5 %) — pas une lettre, donc calculables sans rien interpréter.
Vérifier `v_B^2 = v_A^2 + 2ad` demanderait de comprendre la physique. Tout ce
qui n'est pas entièrement compris est **jeté, jamais deviné** : la traduction
LaTeX → expression n'accepte au bout que chiffres, opérateurs et parenthèses.

### L'essai rouge a trouvé que le balayage manquait un tiers du corpus

Premier jet : 13 936 expressions, 335 numériques, 0 écart inexpliqué. Content de
moi. Puis l'essai rouge — rendre fausse une égalité d'une leçon — **n'a pas
crié**.

La suite le dit elle-même : AMBIGU, la porte est aveugle OU l'essai est mal
construit. C'était la porte, et la cause est jolie : l'égalité mutée est en math
**AFFICHÉE**, `$$26^3 = 17\,576$$`. Un seul motif `\$\$?…\$\$?` apparie les
dollars de gauche à droite sans distinguer `$…$` de `$$…$$` : il capturait
« n=26 », puis le **texte** entre deux dollars orphelins, et laissait
l'expression affichée de côté. **Or les calculs travaillés s'écrivent en math
affichée — c'est précisément la famille qui manquait.**

Deux passes, blocs `$$…$$` d'abord puis masqués :

```
  avant : 13 936 expressions · 335 numériques
  après : 21 938 expressions · 543 numériques   (+57 % et +62 %)
```

### Trois familles d'égalités fausses, toutes volontaires

Le balayage réparé a trouvé **11 écarts**. Tous s'expliquent, et les trois
familles disent quelque chose du produit :

1. **L'arithmétique modulaire.** « $2\times2=0$ » est VRAI dans Z/4Z — et c'est
   le cœur du chapitre : $2$ n'a pas de symétrique, donc $(\mathbb{Z}/4\mathbb{Z},
   \times)$ n'est pas un groupe.
2. **L'erreur citée pour être réfutée.** Un retour de distracteur écrit « Tu as
   sans doute pris $(-1)^{2023} = 1$. Mais $2023$ est impair… ». La fausse
   égalité est là exprès.
3. **Le raisonnement par l'absurde.** « L'égalité des cotes exigerait $0=5$ »,
   « on démontrerait que $-1=1$ », « donc $0 = 1$. Absurde. »

**Un tuteur qui confronte les misconceptions et qui démontre contient des
égalités fausses par construction.** Une porte arithmétique naïve se battrait
contre la pédagogie même du produit. D'où un classement plutôt qu'un verdict, et
un cliquet sur les seuls écarts **inexpliqués** : 0 aujourd'hui.

### Armé, avec sa faiblesse écrite

En CI et dans la batterie locale (pur Node, une seconde). Essai rouge §11.158
dans la suite rejouable : les 51 portes crient.

**La faiblesse** : une vraie erreur qui tomberait à moins de 240 caractères d'un
mot comme « erreur », « absurde » ou « tu as » serait classée et absorbée. C'est
un filet à grosses mailles, pas une preuve. Et il ne voit rien des 97,5 %
d'expressions qui portent une lettre, ni des unités, ni des chiffres
significatifs.

## §11.159 — Deux leçons écrivent-elles la même prose ? Et trois masques qui mangeaient le corpus

§11.118 garde les **énoncés d'items** jumeaux. La prose des leçons n'avait
jamais été comparée à elle-même — et c'est là que le copier-coller se loge le
plus facilement : 62 leçons écrites en vagues, un gabarit commun, un paragraphe
qui « marchait bien » ailleurs. Un élève qui lit deux notions et retrouve le
même paragraphe apprend que le produit récite au lieu d'expliquer.

**Mesuré sur 281 932 mots et 1 891 paires : recouvrement maximum 4,4 %, plus
long passage propre à deux leçons 41 mots.** Aucune leçon n'est la copie d'une
autre.

### Le critère qui tranche est la DIFFUSION, pas le chapitre

Premier jet : j'exemptais tout passage porté par un chapitre de méthode, parce
que le gabarit de dissertation (81 mots) se répète à dessein. L'essai rouge —
un paragraphe de 87 mots recopié d'une leçon dans une autre — est resté
**VERT** : je l'avais collé juste sous « Pour t'entraîner ». **Une amnistie de
chapitre est un trou où un copier-coller se cache.**

La règle juste ne regarde pas le chapitre mais la diffusion : un gabarit se
répète dans BEAUCOUP de leçons (la méthode est dans les douze de philosophie) ;
un copier-coller n'existe que dans DEUX. Trois leçons ou plus : gabarit.
Exactement deux : à lire.

### Trois masques successifs mangeaient le corpus

C'est la partie qui vaut d'être lue, parce que c'est la même faute trois fois,
et que la troisième était invisible depuis le début de la journée.

1. `\$\$?[^$]*\$\$?` apparie les dollars **de gauche à droite sur tout le
   fichier** : un `$` esseulé et tout est masqué jusqu'au suivant.
2. L'affichée non ancrée confond deux maths en ligne collées (`$a$$b$`) avec un
   `$$`, et le masque repart de travers.
3. **Et la vraie coupable** : `^---[\s\S]*?^---` pour retirer le front-matter.
   Les leçons emploient `---` comme SÉPARATEUR de chapitre — `suites-numeriques`
   en a six — et le fichier **ne commence pas** par du front-matter : il
   commence par un titre. Le motif masquait donc les lignes **3 à 38**, dont le
   paragraphe que l'essai rouge venait d'y copier. L'essai restait vert parce
   que le texte « copié » n'existait plus dans sa leçon d'origine.

Correctifs : masquage **ligne par ligne** pour les maths (une boucle borne les
dégâts à une ligne ; une expression régulière propage l'erreur), et front-matter
retiré **seulement si le fichier commence par lui**. Le balayage est passé de
265 543 à **281 932 mots** — 16 473 mots de prose qui étaient invisibles.

**La leçon, pour la troisième fois de la journée** (après §11.152 pour les
boîtes de figures et §11.158 pour les calculs) : *quand une mesure paraît
propre, vérifier d'abord qu'elle a REGARDÉ.* Et le seul outil qui l'a dit à
chaque fois, c'est l'essai rouge — pas la relecture.

## §11.160 — La portée de la leçon des trois masques : quatre portes en dépendaient sans le dire

§11.158 et §11.159 ont trouvé la même faute deux fois : un appariement de `$`
qui avale la prose. La question suivante n'est pas « où l'ai-je encore faite »
mais **qui d'autre en dépend**. Quatre portes DÉJÀ ARMÉES retirent les maths
avant de lire le texte, toutes avec le même motif :

```
  validate-content · eleve-ruse · accents-campagne · dom-truth
      .replace(/\$[^$]*\$/g, " ")
```

Ce motif apparie de gauche à droite. Tant que chaque champ a un nombre **pair**
de `$`, il retire exactement les formules. Un seul dollar orphelin, et il avale
tout le texte jusqu'au suivant : les quatre portes **cessent silencieusement de
lire ce passage, en restant vertes**.

### Ce que j'ai failli conclure, et ce que la mesure a dit

Premier relevé, sur les fichiers : **1 326 lignes, dans 87 fichiers**, portent un
nombre impair de `$`. J'étais prêt à écrire que quatre portes armées étaient
aveugles sur une partie du corpus, et à les réparer toutes les quatre.

La mesure juste n'est pas celle du FICHIER, c'est celle du CHAMP — parce que
c'est le champ que ces portes reçoivent :

```
  212 fichiers YAML · 73 611 champs de texte · 0 champ impair
```

Les 1 326 lignes sont des formules **pliées** dans un bloc YAML : le fichier est
impair ligne à ligne, le champ ne l'est pas, et YAML le rejoint avant que la
porte ne le voie. **Les quatre portes ne sont pas aveugles.** Le refactor que
j'allais faire aurait été du bruit — et il aurait pu casser le seul cas qui
marche, puisque dans un champ la formule pliée EXIGE que le motif franchisse le
saut de ligne (la parade des fichiers markdown, « ne jamais apparier au-delà
d'une ligne », est ici exactement le mauvais geste).

### Ce qui restait vrai quand même

La propriété tient **aujourd'hui**, et rien ne la tenait. Un seul champ mal
écrit, un jour, et quatre portes se taisent sans que personne ne le sache.
`dollars-apparies.mjs` la tient désormais : cliquet à 0, en CI et dans la
batterie, avec son essai rouge — un `$` orphelin injecté dans un champ, la porte
doit crier (§11.160 dans la suite rejouable).

C'est la forme la plus utile qu'un audit puisse prendre : **ne pas réparer ce
qui n'est pas cassé, et garder la condition qui le maintient ainsi.**

## §11.161 — L'épreuve jusqu'au corrigé, dans les trois moteurs

§11.151 ouvrait les pages ; il ne les UTILISAIT pas. Or la surface la plus
lourde du produit est celle où l'on clique : « Terminer » rend le corrigé côté
client, des centaines de formules d'un coup (§11.52). Charger la page ne prouve
rien de ce moment-là.

**Mesuré, identique au caractère près dans les trois moteurs :**

| | chromium | firefox | webkit |
|---|---|---|---|
| caractères de sujet (« Commencer ») | 22 779 | 22 779 | 22 779 |
| caractères de corrigé (« Terminer ») | 28 551 | 28 551 | 28 551 |
| formules dans le corrigé | 489 | 489 | 489 |
| commandes d'auto-évaluation | 111 | 111 | 111 |
| durée de « Terminer » | 2,61 s | 2,65 s | 2,60 s |

### Le compte que j'allais armer était celui de la mise en page

Premier jet : je comptais `document.body.innerText`. Verdict : **DIVERGENCE**,
22 675 / 21 712 / 22 203 sur le sujet, 4 % d'écart — j'avais trouvé une
différence entre moteurs sur la page d'épreuve.

Sauf que `innerText` est *défini* comme le texte **tel que rendu** : il porte
les retours à la ligne que chaque moteur décide. `textContent`, lui, est le
texte du DOM, indépendant de la mise en page. Mesuré côte à côte :

```
  chromium  innerText=23459  textContent=125517
  firefox   innerText=22496  textContent=125517
  webkit    innerText=22989  textContent=125517
```

**125 517 dans les trois, au caractère près.** Le contenu est rigoureusement
identique ; c'est ma mesure qui regardait la typographie. L'axe armé est donc
`textContent` ; `innerText` reste affiché, pour ce qu'il est.

C'est la même leçon que §11.157 (où j'allais armer une largeur cumulée qui ne
bouge pas quand les polices disparaissent) et que §11.151 (où les 5 px de WebKit
étaient la barre de défilement) : **avant d'armer une mesure, vérifier qu'elle
mesure la chose et pas le banc.** Trois passages verts, et les deux essais
rouges du comparateur crient toujours.

## §11.162 — Les correctifs du jour, vérifiés sur l'artefact DÉPLOYÉ

Un correctif commis n'est pas un correctif livré. L'aperçu déployé porte
maintenant `014a80b`, l'un des commits de cette session, ce qui permet de
rejouer sur l'artefact en ligne les mesures qui étaient ROUGES le matin même.

**La garde des préférences (§11.149).** La même commande, sur la même base, à
quelques heures d'intervalle :

```
  le matin   node scripts/preferences-secours.mjs https://bac-pink.vercel.app
             → ROUGE : sombre=false, --font-scale="" après un rendu de secours
  le soir    même commande
             → VERTE : sombre=true, --font-scale="1.125", secours bien provoqué
                       (5 réécritures de la classe de <html>)
```

C'est la vérification la plus forte disponible ici : ce n'est ni un test local
ni une relecture, c'est le produit servi.

**Les en-têtes de sécurité.** Zéro sur cinq étaient servis ce matin ; les cinq
le sont :

```
  x-frame-options            SAMEORIGIN
  x-content-type-options     nosniff
  referrer-policy            strict-origin-when-cross-origin
  permissions-policy         camera=(), microphone=(), geolocation=()
  strict-transport-security  max-age=63072000; includeSubDomains; preload
```

(Le dernier vient de l'hébergeur, les quatre autres de `next.config.mjs`.)

**Le balayage complet : 0 échec sur 23 contrôles**, y compris le témoin §11.133
(« Pourquoi cette réponse est la bonne » est en ligne), le parcours téléphone,
le parcours d'épreuve jusqu'au corrigé, le clavier, la confrontation de
misconception et le thème dans les deux schémas.

**Ce que ça ne dit pas** : l'aperçu est à `014a80b` et HEAD local à `46a00cb` —
tout ce qui a été mesuré décrit `014a80b`. L'instrument l'annonce en première
ligne plutôt que de laisser croire qu'il parle de HEAD. Et la PRODUCTION reste
hors de portée, humainement gardée (CLAUDE.md).

## §11.163 — L'iPhone resté en iOS 15 : une page blanche, pour un lookbehind

Sur Android, le moteur du navigateur se met à jour tout seul. **Sur iPhone, il
est soudé au système** : un 6s, un 7, un SE de première génération sont bloqués
en iOS 15 et ne verront jamais Safari 16.4. C'est exactement le téléphone
d'occasion d'un lycéen.

Et une syntaxe inconnue n'y « dégrade » pas. Elle lève une **SyntaxError** : le
morceau entier meurt, la page reste blanche, et la veille d'hydratation propose
de recharger — ce qui ne changera rien. Rien ne mesurait cela, et le dépôt n'a
pas de `browserslist` : la valeur par défaut ne retient que des navigateurs de
moins de deux ans.

**Le plancher du produit, mesuré dans le paquet livré :**

```
  ?. et ??                Safari 13.1 · Chrome 80   (2020)
  .at( · structuredClone  Safari 15.4 · Chrome 92/98  (API, TypeError ciblée)
  regex lookbehind        Safari 16.4 · mars 2023   ← le plancher réel
```

### Deux sources, une corrigée

**1. Le produit lui-même.** `src/lib/frenchTypography.ts` construisait
`(?<=\p{L})'(?=\p{L})` pour remplacer l'apostrophe droite par l'apostrophe
typographique — la règle qui rend « l'élève » en « l’élève ». Elle s'exécute au
chargement du module.

Corrigé : la lettre de gauche est **capturée** puis réécrite (`$1’`) au lieu
d'être regardée derrière. Le lookahead, lui, est universel. Vérifié identique
sur sept chaînes, apostrophes en chaîne comprises (« l'a'b »), et les 10 tests
de `test-typographie` passent.

**2. Une dépendance.** `mdast-util-gfm-autolink-literal`, tirée par
`remark-gfm`, porte le sien dans un **littéral** — donc refusé à l'analyse. Elle
sert à transformer une URL nue en lien. Ce que le corpus en fait :

```
  URL nues .............. 0        tableaux GFM ........... 113
  e-mails nus ........... 0        notes, listes de tâches .. 0
```

**L'extension qui fixe le plancher ne sert à rien ici** — mais `remark-gfm` ne
se retire pas, 113 tableaux en dépendent. Recomposer le greffon avec les seules
extensions utilisées ferait retomber le plancher à Safari 13.1 ; c'est une
décision d'architecture, posée en `DECISIONS-EN-ATTENTE §14`, pas prise ici.

### La porte, et ce qu'elle a fait d'abord

`syntaxe-vieux-moteurs.mjs` inventorie dix marqueurs dans le paquet et refuse
tout lookbehind dans `src/`. Au premier passage, elle a accusé **le fichier
qu'elle venait de faire corriger** : le commentaire qui explique le correctif
cite le motif d'avant. Une porte qui punit la documentation apprend à ne plus
documenter (ADR 0036 §3) — elle retire donc les commentaires avant de chercher.

Sans build, elle garde la source et **le dit** au lieu de ne rien garder.

**Ce qu'elle ne prouve pas** : aucun vieux moteur n'a été exécuté ici —
Playwright ne fournit que des moteurs récents. La conséquence (page blanche) est
déduite des tables de support ; ce qui est observé, c'est le marqueur dans le
paquet livré.

---

## §11.164 — Le motif qui ne pouvait pas voir la couture, et la porte qui partageait son aveuglement

**2026-09-21.** Le corpus écrit :

```markdown
Ta salive contient une molécule, l'**amylase salivaire**, qui découpe…
```

mdast en fait **trois nœuds** : le texte qui se termine par `…molécule, l'`, le
`strong`, puis la suite. L'apostrophe est le **dernier caractère de son nœud** ;
la lettre qui la suit vit dans le nœud d'à côté. La règle (a) de
`frenchTypography` exige une lettre *après* l'apostrophe **dans la même
chaîne** — elle ne pouvait structurellement pas la voir.

L'élève lisait donc « l'amylase » en apostrophe droite au milieu d'une page qui,
partout ailleurs, en porte une courbe.

### Le chiffre, et la porte qui annonçait zéro

Mesuré sur le texte **rendu**, chapitres dépliés, 71 routes :

```
  vu par la porte typo-francaise ....... 0
  lisible par un élève ................. 152, sur 50 des 71 pages
```

`typo-francaise.mjs` appliquait son motif **nœud de texte par nœud de texte** —
exactement le geste du plugin qu'elle est censée surveiller. Verte, elle
répondait honnêtement à une question **plus étroite que son en-tête** : « existe-t-il
une apostrophe droite *à l'intérieur d'un seul nœud de texte* ? ». C'est le
troisième cas d'ADR 0033, celui où il n'y a rien à réparer dans la porte — et
c'est la 2ᵉ loi d'ADR 0037 en miroir : **un motif borné à une unité plus petite
que celle où vit le défaut**.

Les deux angles morts n'en faisaient qu'un. Une porte construite sur le même
découpage que le mécanisme qu'elle garde ne peut pas le prendre en défaut.

### Deux correctifs, le même geste

**Le plugin.** `remarkFrenchTypography` recolle désormais les **frères inline**.
Pour chaque parent, il regarde chaque couple (enfant *i*, enfant *i+1*) et
traite l'apostrophe posée sur la couture, dans les deux sens (`l'**mot**` et
`**l**'mot`). `inlineCode` et `inlineMath` sont **exclus** : `l'` devant `$x$`
n'est pas une élision française, et la règle (a) les laisse déjà tranquilles.
La passe ne franchit jamais un bloc — `visit` ne donne que des frères, et deux
paragraphes ne sont pas frères inline.

**La porte.** `typo-francaise.mjs` mesure désormais au **BLOC**, pas au nœud.
Trois frontières cassent la chaîne, chacune pour une raison nommée :

| frontière | pourquoi |
|---|---|
| le bloc change | deux paragraphes ne se lisent pas d'affilée |
| un nœud est sauté (code, MathML, `style`) | `l'` suivi de `<code>` n'est pas une élision — le plugin ne la convertit pas non plus |
| une formule KaTeX | chaque nœud y reste son propre îlot : `\{x : x>0\}` recollé ferait crier la règle de ponctuation haute sur du LaTeX rendu |

**Après : 152 → 0.** La porte est verte sur **110 pages**, les 39 épreuves
ouvertes *et* corrigées comprises, **sans un seul faux positif** — la crainte
que l'unité plus large fasse crier les formules était la bonne question, et
l'îlot KaTeX y répond.

### L'essai rouge qui a crié pour la mauvaise raison

Premier essai : casser `FIN_APOSTROPHE.test(gauche.value) &&` en `false &&`,
reconstruire, relancer la porte. Verdict : **« la porte est passée ROUGE »**.

C'était faux. `false &&` rend la branche inatteignable, TypeScript cesse de
réduire `gauche.value` à `string`, **la construction échoue** — et la porte
n'a jamais tourné. Le code de sortie non nul venait de `tsc`, pas d'une
apostrophe.

C'est ADR 0034 mot pour mot : *un essai rouge est AMBIGU tant qu'on n'a pas
montré que le rouge vient du défaut.* Ce qui l'a démasqué : avoir ensuite
demandé à la porte ses **chiffres**, et trouvé un `.next` sans `BUILD_ID`.

Refait avec une sabotage qui **compile** — la passe de couture réécrit une
apostrophe droite au lieu de la courbe :

```
  construction ..................... aboutie (0 « Failed to compile »)
  /notions/maths/arithmetique ...... 1 apostrophe droite
  /notions/maths/calcul-integral ... 5
  /notions/maths/denombrement ...... 2
  /notions/maths/equations-diff .... 3
  /notions/maths/fonction-exp ...... 2
  /notions/maths/geometrie-espace .. 2
```

Chiffre pour chiffre le tableau d'AVANT correctif. La porte reproduit le compte
du lecteur.

**Règle tirée de là, et elle est neuve :** une sabotage qui empêche la
compilation n'est pas un essai rouge, c'est une panne. Un essai rouge sur du
code typé doit **rester compilable** ; sinon il mesure le compilateur.

### La règle n'a pas été écrite — elle a été outillée

ADR 0033 pose que *quand une règle est reprise trois fois, c'est le geste qu'il
faut outiller, pas la note qu'il faut réécrire*. Celle-ci était la troisième
version du même défaut dans le même outil : §11.104 (« la commande n'a jamais
tourné »), §11.106 (« stderr perdu sur un passage vert »), et maintenant « la
sabotage a cassé autre chose que ce qu'on mesure ».

`essai-rouge.mjs` inspecte donc la sortie de la course sabotée et **suspend son
verdict** quand elle porte la marque d'une chaîne d'outils tombée AVANT la
porte : `Failed to compile`, `Type error:`, `error TS####:`, `Cannot find
module`, `ERR_MODULE_NOT_FOUND`, `SyntaxError:`, `build worker exited`. Il ne
dit alors ni ROUGE ni VERT — il dit **AMBIGU**, et explique comment réécrire la
sabotage (viser une VALEUR, pas une CONDITION : une condition mise à `false`
supprime aussi le rétrécissement de type).

**Le détecteur avait son propre angle mort, et il a fallu le mesurer.** Premier
jet : les motifs `Failed to compile` et `Type error:`, tous deux de la mise en
forme de *Next*. Rejoué contre `tsc` en direct, il n'a rien vu — `tsc` écrit
`fichier(126,26): error TS18048: …`. La sabotage a été refaite à la main pour
**lire le texte exact** avant d'écrire le motif. Prouvé dans les deux sens :

```
  sabotage qui ne compile pas → ✗ AMBIGU, verdict SUSPENDU  (rc 1)
  les 57 essais du manifeste  → ✓ ROUGE, tous               (aucune suspension à tort)
```

### Ce qui garde la propriété

Six tests de couture s'ajoutent à `test-typographie` (**16/16**), et trois
essais rouges les prouvent — branche gauche, branche droite, exclusion du code
et des maths — au manifeste `§11.164 (a)(b)(c)` : **57 essais, tous crient**.

L'essai rouge de la PORTE, lui, coûte deux constructions ; il n'entre pas dans
la suite pour cette raison, mais il est une commande, pas une note :

```bash
cd web && routes=$(cd .. && ls -d content/*/*/ \
  | sed 's|content/\(.*\)/\(.*\)/|/notions/\1/\2|' | sort | head -20 | tr '\n' ' ')
node scripts/essai-rouge.mjs \
  --fichier src/lib/remarkFrenchTypography.ts \
  --de 'gauche.value = gauche.value.slice(0, -1) + APOSTROPHE_TYPO;' \
  --vers 'gauche.value = gauche.value.slice(0, -1) + "'"'"'";' \
  --porte "npm run build && node scripts/typo-francaise.mjs --porte $routes"
# puis reconstruire : le `.next` laissé sur place est celui de la sabotage.
```

### Ce que cela ne dit pas

Les 152 étaient dans la **prose markdown**. Les champs rendus en texte nu — les
en-têtes d'exercice des épreuves, les étiquettes de figure SVG — ne passent pas
par un plugin remark ; ils étaient déjà propres (mesurés : 0 sur les 39
épreuves), mais rien n'empêche la prochaine écriture d'y poser une apostrophe
droite. C'est la porte, désormais au bloc, qui les tient.

---

## §11.165 — La règle française appliquée au LaTeX : la commande `\;` coupée en deux

**2026-09-21.** L'en-tête de `frenchTypography.ts` affirmait ceci, noir sur
blanc :

> *Code and math never reach here — `remarkFrenchTypography` visits mdast
> `text` nodes only, and `inlineCode`/`code`/`inlineMath`/`math` are separate
> node types.*

C'est vrai du **greffon**. C'est faux de la **fonction** : une soixantaine
d'endroits du produit l'appellent directement sur une chaîne BRUTE — titres
d'exercice, légendes de figure, libellés de partie, `aria-label`, intitulés de
l'assembleur d'épreuves —, et ces chaînes-là portent leur LaTeX avec elles,
encore entre `$`.

### Ce que la règle (c) en faisait

Mesuré sur le rendu des 101 pages (62 leçons + 39 épreuves ouvertes et
corrigées), en lisant l'annotation TeX que KaTeX conserve sous chaque
formule — c'est-à-dire **ce que le moteur a réellement reçu** :

```
  espaces insécables DANS du LaTeX ......... 24, sur 10 pages
  avertissements KaTeX à la construction ... 24  « No character metrics for ' ' »
```

Le caractère est U+202F, l'espace fine insécable. KaTeX n'a pas de métrique
pour lui et le disait **à chaque construction depuis des mois**.

**Et ce n'est pas cosmétique.** `\;` est une COMMANDE d'espacement LaTeX. La
règle glissait sa fine **entre la contre-oblique et le point-virgule** :

```
  écrit   : 0{,}3\;\ 0{,}6\;\ 0{,}9\;\ 1{,}2\ \text{m.s}^{-1}
  compilé : 0{,}3\<fine>;\ 0{,}6\<fine>;\ …
```

La commande n'existe plus. Idem pour les repères — `(O\,;\,\vec{i},\vec{j})`,
`(E')\;: z^2 - (1-i)(1+m)z = 0` — c'est-à-dire exactement la notation qu'une
copie de bac doit écrire juste.

### Le correctif

La fonction ne peut pas se fier à son appelant : elle **segmente elle-même**.
`segmentsProse` découpe la chaîne en alternant prose et maths (`$…$`, `$$…$$`,
`\$` échappé respecté), et les quatre règles ne tournent que sur la prose. Un
`$` non apparié laisse tout le reste en prose — conservateur, c'est le
comportement d'avant. Un chemin rapide (`!s.includes("$")`) laisse la majorité
des chaînes au même coût qu'avant.

**Après : 24 → 0**, et **0 avertissement KaTeX** à la construction. 53 578
formules rendues sur les 101 pages, **0 en erreur**.

### La porte a deux directions, maintenant

`typo-francaise` cherchait une espace **manquante** dans la prose. Elle cherche
désormais aussi l'espace **en trop** — une insécable posée dans une formule.
Une seule direction se triche : appliquer la règle partout rend la première
verte et **fabrique** la seconde. C'est littéralement ce qui était arrivé.

Éprouvée dans les deux sens, par une sabotage qui **compile** (§11.164 avait
montré ce que coûte l'autre genre) : construction aboutie, puis
`1, 1, 2, 1, 2, 3` insécables sur les six premières pages touchées. La porte
reproduit le compte.

---

## §11.166 — 150 formules LaTeX affichées telles quelles, et ce qui les cachait

**2026-09-21.** En réparant §11.165, la porte typographie est passée **rouge
sur trois pages** — alors que le correctif n'avait fait que *cesser* d'abîmer
des formules. L'examen de ces trois signalements a ouvert ceci :

```
  Partie II — Le plan complexe $(O;\vec{u},\vec{v})$ : $a=1+i$, $b=(1+i)m$
```

Ce n'est pas un extrait de fichier. **C'est ce que l'élève lit**, sur
`/notions/maths/nombres-complexes-2` — dollars, contre-obliques et accolades
compris. Zéro formule KaTeX dans ce paragraphe.

### Ce que la porte cachait, et pourquoi

Le sur-titre de partie (`part`) était rendu en **texte nu**. La porte ne le
voyait pas, parce que la règle (c) y insérait une fine devant le `;` de
`$(O;\vec{u}…)$` — et une fine devant une ponctuation haute, c'est exactement
ce que la porte exige. **Le défaut de §11.165 rendait la porte verte sur le
défaut de §11.166.** Ôter le premier a révélé le second : c'est le seul
moment de la journée où un correctif a rendu une porte rouge en ne cassant
rien.

### L'étendue

```
  LEÇONS   :  26 formules brutes sur  7/62 pages
  ÉPREUVES : 124 formules brutes sur 19/39 pages
  TOTAL    : 150, depuis EXACTEMENT DEUX sites de rendu
```

`EpreuveShell` (`{q.part}`) et `AttemptFirstExercise` (`{frenchTypography(part)}`).

### Le correctif, et les deux pièges qu'il a fallu mesurer

`MdBlock` reçoit un mode `inline` : un `<span>` au lieu d'un `<div>`, et `p`
rendu en fragment — parce qu'un `<div>` ou un `<p>` imbriqué dans le `<p>` du
libellé est de l'HTML invalide. Le pipeline reste **chargé à la demande** :
`EpreuveShell` reçoit `Md` comme avant (HANDOFF §11.27), aucun octet de KaTeX
n'entre dans le paquet initial de l'épreuve.

**Piège 1 — la casse.** Le style sur-titre est en `uppercase`, et
`text-transform` s'applique aussi aux glyphes de KaTeX : `$(E_\alpha)\;: z^2$`
s'affichait avec un `Z` capital, c'est-à-dire **une autre variable**.
`[&_.katex]:normal-case` l'annule.

**Piège 2 — l'hydratation, et il a fallu le MESURER.** Le premier correctif a
fait apparaître **10 erreurs React #418 sur `pc/reactions-acido-basiques`** —
zéro avant. Le corpus y écrit `part: "1. Solution aqueuse d'acide
propanoïque"`, et `1.` en tête de ligne **est** une liste ordonnée en
CommonMark. Un `<ol>` dans le `<p>` du libellé : le navigateur referme le `<p>`
en analysant, l'arbre client cesse de ressembler à l'arbre servi.

Rendre `ol`/`li` en fragments n'aurait pas suffi — l'analyseur a déjà mangé le
« 1. », et le libellé aurait perdu son numéro. `echappeBloc` (dans
`src/lib/markdownEnLigne.ts`, pur et testé) échappe donc le marqueur en tête de
chaque ligne : `1.`, `1)` (CommonMark accepte les deux), `-`, `*`, `+`, `>`,
`#`.

### Mesure finale, sur les 101 pages

```
  LaTeX affiché BRUT .................. 0    (avant : 150, sur 26 pages)
  formules en erreur .................. 0
  sur-titres encore en CAPITALES ...... 0
  erreurs d'hydratation ............... 0    (après le 1er correctif : 10)
  porte typo-francaise ................ verte sur 110 pages
```

**La leçon, et elle est la même que celle de la journée :** un correctif se
mesure APRÈS. Celui-ci en a introduit un autre, visible seulement sur une
leçon sur 62, et seulement parce que la mesure d'après regardait aussi les
erreurs de script.

---

## §11.167 — La porte `latex-nu`, et la seule description de figure écrite en LaTeX

**2026-09-21.** §11.166 a été corrigé, mais rien ne le gardait. Une propriété
réparée sans instrument est une propriété qui attend de revenir — et celle-ci
était doublement fragile, puisqu'elle avait déjà su se cacher derrière un
autre défaut.

`web/scripts/latex-nu.mjs` la tient, sur **deux axes**, parce qu'un élève peut
rencontrer du LaTeX de deux façons.

**Axe 1 — il le LIT.** Une paire de `$` dont le contenu porte une marque de
commande (`\`, `^`, `_`, `{`, `}`), dans un nœud de texte hors de toute formule
rendue. Le filtre sur la marque est délibéré : « 30 $ » n'est pas du LaTeX, et
une paire de dollars sans rien de mathématique dedans ne prouve rien.

**Axe 2 — il l'ENTEND.** La même chose dans un `aria-label`, un `alt`, un
`title`, le titre du document ou la méta-description — **là où aucun moteur ne
rendra jamais rien**. Cet axe accepte en plus une `\commande` nue et un
`^{`/`_{`, qui n'ont besoin d'aucun dollar pour être illisibles à voix haute.
Les attributs sont lus sur **tout le document**, pas seulement `<main>` : le
masthead et le pied de page se font annoncer aussi.

### Ce que l'axe 2 a trouvé en s'ouvrant

**Deux attributs, sur une seule leçon**, et tous deux la même chaîne :

```
  FIGURE  aria-label  « …suite récurrente u_{n+1} = f(u_n) : un point de départ… »
  DIV     aria-label  « Contrôles : …u_{n+1} = f(u_n)… »
```

Elle vient de la carte des descriptions de figures (`NotionBody.tsx`), et les
accolades LaTeX y sont **une anomalie isolée** : les dizaines d'entrées
voisines écrivent `E_n = −13,6/n²`, `√(R² − d²)`, `(n, u_n)`. La figure même
écrit `u(n+1) = f(u_n)` dans son propre `<title>` SVG. Corrigée pour rejoindre
sa voisine — pas réinventée.

**Ce que l'instrument ne dit PAS, et c'est écrit dans son en-tête :** il ne
juge pas la notation parlée. `u_n` se fait dire « u tiret bas n », ce qui est
imparfait ; c'est la convention de la maison sur des dizaines d'entrées, et en
changer est une décision éditoriale, pas un correctif. Seules les accolades
LaTeX sont refusées.

### État, et les deux essais rouges

Verte sur **110 pages** — 62 leçons, 39 épreuves ouvertes *et* corrigées,
9 pages hors leçon —, **0 sur les deux axes**. Ajoutée à `gates.yml`
(54 étapes) et déclarée hors champ de la batterie locale pour la même raison
que `typo-francaise` : build et navigateur requis.

Les deux essais rouges coûtent une reconstruction chacun ; ils ne sont pas dans
la suite pour cette raison, mais ce sont des commandes, pas des notes :

```bash
# Axe « entendu » — 2 attributs criés sur suites-numeriques
cd web && node scripts/essai-rouge.mjs \
  --fichier src/components/notion/NotionBody.tsx \
  --de '"suite-escalier":      "Construction en escalier de la suite récurrente u(n+1)' \
  --vers '"suite-escalier":      "Construction en escalier de la suite récurrente u_{n+1}' \
  --porte "npm run build && node scripts/latex-nu.mjs --porte /notions/maths/suites-numeriques"

# Axe « lu » — 11 et 15 formules brutes, chiffre pour chiffre le tableau d'avant
cd web && node scripts/essai-rouge.mjs \
  --fichier src/components/examens/EpreuveShell.tsx \
  --de '<Md inline>{q.part}</Md>' --vers '{q.part}' \
  --porte "npm run build && node scripts/latex-nu.mjs --porte /examens/sm-2024-normale /examens/sm-2023-normale"
# puis reconstruire : le `.next` laissé sur place est celui de la sabotage.
```

Les deux ont été joués, construction aboutie dans les deux cas (0
« Failed to compile »), et les comptes rendus par la porte sont exactement ceux
de la mesure d'avant correctif.

---

## §11.168 — Une copie parfaite valait 19,25/20

**2026-09-21.** Le geste tient en une phrase : ouvrir les 39 épreuves, marquer
**toutes** les questions « juste », lire la note affichée. Personne ne l'avait
fait.

```
  39 épreuves · tout marqué JUSTE
    note exactement 20/20 ...... 37
    écarts ..................... 2

    spc-2021-rattrapage → 19,25 / 20   (41 questions)
    spc-2010-normale    → 19,75 / 20   (32 questions)
```

Un élève qui a **tout bon** lisait qu'il n'avait pas tout bon. Pour un produit
qui prétend préparer un examen, c'est la pire espèce de défaut : il ment sur le
seul chiffre auquel l'élève tient.

### La cause était dans le produit, pas dans le corpus

`ptsDepuisStem` lisait la **première** étiquette de l'énoncé — `stem.match(…)`,
au singulier. Or un énoncé de bac groupe souvent plusieurs sous-questions
notées séparément :

```
  Recopier le numéro de la question et répondre par vrai ou faux.
  **a)** (0,25 pt) L'onde sonore est une onde électromagnétique.
  **b)** (0,25 pt) L'onde sonore est une onde longitudinale.
  **c)** (0,25 pt) …        **d)** (0,25 pt) …
```

La question vaut **1 point** ; le produit en comptait **0,25**. Les 0,75
manquants n'allaient nulle part : quand toutes les questions d'un exercice
portent une étiquette, le reste n'est réparti sur personne, et il disparaît.

**Le corpus, lui, était juste.** Vérification faite : les deux énoncés
concernés correspondent au sujet réel (quatre vrai/faux à 0,25 pt ; deux
tensions à représenter à 0,25 pt chacune).

### Ce qui rend le diagnostic sûr

Deux questions **dans tout le corpus** portent plus d'une étiquette :

```
  spc-2021-rattrapage · q1 : première=0,25  somme=1
  spc-2010-normale    · q1 : première=0,25  somme=0,5
```

Et ce sont exactement celles des deux épreuves fautives. Avec la règle « somme
des étiquettes », **les 39 épreuves ferment à 20,00**. Une hypothèse qui
explique tous les cas et n'en crée aucun.

### Le correctif, et où il vit

La règle est sortie de `EpreuveShell.tsx` pour `src/lib/bareme.ts`. **Ce
déménagement est la moitié du travail** : une porte qui recopierait le motif
vérifierait sa propre copie — verte, honnête, et répondant à une AUTRE question
(ADR 0033). `bareme-ferme.mjs` **importe** `ptsDepuisStem`, et lit les épreuves
par `listEpreuves()`, la même fonction que la page.

### La porte, et ses deux directions

1. **Par exercice** — la somme des barèmes de ses questions vaut exactement son
   barème annoncé.
2. **Par épreuve** — une copie tout juste vaut exactement 20,00/20.

Le premier contrôle est ce qui rattrape l'erreur **symétrique** : un motif trop
gourmand qui compterait « (2 points) » écrit en prose. La règle de lecture a
deux façons de se tromper ; une seule direction ne verrait que l'une.

```
  39 épreuves · 247 exercices · 1 472 questions — le barème se referme partout.
```

Arithmétique pure sur les données : ni build, ni navigateur. Elle entre donc
dans la **batterie locale** et dans `gates.yml` (55 étapes).

### Éprouvée rouge dans les deux sens, et vérifiée dans le navigateur

```
  règle revenue à « première étiquette » → 2 épreuves rouges, 19,25 et 19,75
  étiquette du corpus 0,25 → 0,75 ........ → 1 épreuve rouge, 20,5 / 20
```

Les deux sont au manifeste (`§11.168 (a)` et `(b)`, 61 essais). Et la mesure
qui avait ouvert le fil a été rejouée **dans le navigateur**, sur le build
d'après :

```
  39 épreuves · tout marqué JUSTE
    note exactement 20/20 ...... 39   (avant : 37)
    écarts ..................... 0    (avant : 2)
```

### Un troisième axe, trouvé en relisant le deuxième

Le contrôle « une copie parfaite vaut 20/20 » a un angle mort, et c'est sa
propre formule qui le crée : la note est ramenée sur 20 par règle de trois,
`distribué / ep.pts × 20`. Un barème d'exercice transcrit **trop lourd** —
3,25 devenu 6,25 — donne une épreuve de 23 points où une copie parfaite vaut
toujours **20,00/20**. Le 20/20 ne peut pas voir une épreuve trop lourde.

Troisième axe, donc : **aucune épreuve ne déclare plus de 20 points**. Ce n'est
pas un seuil de confort, c'est la règle du concours. Mesuré : 38 épreuves à
20,00 exactement, une partielle à 10,5 (`sm-2020-normale`, annoncée comme
telle), **aucune au-dessus**.

**Et il a fallu l'ISOLER pour pouvoir le dire.** La sabotage évidente — gonfler
le seul `bareme_total` — fait crier l'axe 1 en même temps : impossible alors de
savoir si le rouge vient du plafond. Refaite en gonflant le total **et**
l'étiquette d'une question du même montant, pour que la fermeture tienne :

```
  1 écart(s) :
    ✗ spc-2010-normale — l'épreuve déclare 23 points, et le bac se note sur 20.
```

Un seul signalement, et c'est le bon : la fermeture est restée verte, le 20/20
aussi. L'axe voit ce que les deux autres ne peuvent pas voir. (Sabotage à deux
endroits, donc hors du manifeste, qui n'en casse qu'un ; jouée à la main avec
sauvegarde hors de l'arbre, fichier restauré octet pour octet.)

---

## §11.169 — La table des échelles héritait d'`Object.prototype`

**2026-09-21.** Le produit ne stocke que **deux** choses dans le navigateur :
`bac-theme` et `bac-textsize`. Aucun progrès, aucune réponse — ce qui réduit
beaucoup la surface. Restait à savoir ce que ces deux valeurs font quand elles
sont **hostiles** plutôt qu'absentes : le script d'avant peinture les lit, et
un jet à cet endroit coûte une page blanche.

Treize valeurs pour la taille, sept pour le thème, chacune dans un contexte
neuf. Le thème tient sans faille — `t === "dark"` ou rien. La taille, elle :

```
  bac-textsize = "toString"        → --font-scale: function toString() { [native code] }
  bac-textsize = "constructor"     → --font-scale: function Object() { [native code] }
  bac-textsize = "__proto__"       → --font-scale: [object Object]
  bac-textsize = "valueOf"         → --font-scale: function valueOf() { [native code] }
  bac-textsize = "hasOwnProperty"  → --font-scale: function hasOwnProperty() { … }
```

La table `{small:"0.9375", base:"1", large:"1.125"}` est un **littéral d'objet**,
donc elle hérite d'`Object.prototype`. `m["toString"]` n'est pas `undefined` :
c'est une **fonction**, donc vraie, donc le garde-fou `if (s && m[s])` la laisse
passer. Du texte venu du stockage local entrait dans une propriété CSS.

Les dix autres valeurs — `""`, `"999"`, `"LARGE"`, `"large "`, `"large\0"`,
100 000 caractères, du JSON — sont toutes refusées proprement.

### Ce que cela cassait : rien, et c'est écrit tel quel

```
  sans préférence   --font-scale (vide)      hauteur 5 556 px   17,68px×21911  20,57px×6253 …
  « large »         --font-scale 1.125       hauteur 6 174 px   19,89px×21911  23,14px×6253 …
  « toString »      --font-scale function…   hauteur 5 556 px   17,68px×21911  20,57px×6253 …

  « toString » rend-il la même page que SANS préférence ? OUI
```

42 890 éléments, distribution des tailles **identique au caractère près**,
0 erreur de script. CSS juge la valeur invalide et la jette ; les usages de
`var(--font-scale, …)` retombent sur leur repli.

C'est donc un défaut **LATENT**. Il est corrigé parce qu'il est faux, pas parce
qu'il casse — et la note le dit, plutôt que de laisser croire à un incident.
Le jour où une règle CSS lirait `--font-scale` sans repli, c'est le stockage
local qui choisirait la taille de police d'un élève.

### Le correctif, aux deux endroits qui lisent la table

`Object.prototype.hasOwnProperty.call(m, s)` — dans le script d'avant peinture
(`layout.tsx`) **et** dans `GardePreferences.tsx`. `FontSizeStepper` comparait
déjà à trois littéraux et n'a jamais eu le défaut.

### L'axe, et pourquoi il est large

`preferences-secours` gagne un second axe : **quelle que soit la valeur
stockée, `--font-scale` est vide ou un nombre.** Pas « n'est pas `toString` » —
une porte écrite contre les cinq clés connues serait aveugle à la sixième.

Éprouvé rouge **des deux côtés**, ce qui n'allait pas de soi :

```
  garde retirée de layout.tsx (avant peinture) → 5 clés ✗
  garde retirée de GardePreferences.tsx (React) → 5 clés ✗
```

Le second essai est celui qui compte : sans lui, l'axe aurait pu ne surveiller
que le chemin d'avant peinture pendant que le chemin React restait libre. Les
deux constructions ont abouti (0 « Failed to compile »), donc les deux rouges
sont des verdicts de porte, pas des pannes (§11.164).

```bash
# les deux essais, à la demande — une reconstruction chacun
cd web && node scripts/essai-rouge.mjs --fichier src/app/layout.tsx \
  --de 'if(s&&Object.prototype.hasOwnProperty.call(m,s))' --vers 'if(s&&m[s])' \
  --porte "npm run build && node scripts/preferences-secours.mjs"
cd web && node scripts/essai-rouge.mjs --fichier src/components/ui/GardePreferences.tsx \
  --de 's && Object.prototype.hasOwnProperty.call(ECHELLES, s) ? ECHELLES[s] : undefined;' \
  --vers 's ? ECHELLES[s] : undefined;' \
  --porte "npm run build && node scripts/preferences-secours.mjs"
```

### Au passage : l'intégrité des items, mesurée et propre

Même balayage, sur 1 647 items des 62 notions :

```
  items sans réponse juste ........ 0
  items avec DEUX réponses justes . 0
  items à un seul choix ........... 0
  choix vides ..................... 0
  choix en double ................. 0
```

**La première passe en annonçait un** — `maths/calcul-integral:CI-31`. Elle
comparait les choix **en minuscules**. Or les deux choix étaient
« Dériver $F$… » et « Dériver $f$… » : dans un corpus de maths, `F` et `f` sont
une primitive et sa dérivée, c'est-à-dire exactement ce que l'item teste.
**La normalisation effaçait la distinction mesurée.** Encore l'unité de mesure,
sous un autre déguisement.

---

## §11.170 — « Partiel · 0,13 » pour 0,125 compté, sur 518 questions

**2026-09-21.** Suite directe de §11.168. Le barème ferme désormais à 20/20,
mais une question restait : **ce qui est écrit sur le bouton vaut-il ce qui
sera compté ?**

L'auto-évaluation propose trois verdicts, et « Partiel » vaut la **moitié** du
barème. Or la moitié d'un quart de point est un **huitième**, et l'affichage
arrondissait tout à deux décimales :

```
  0,25 pt → bouton « Partiel · 0,13 », valeur comptée 0,125   × 297 questions
  0,75 pt → bouton « Partiel · 0,38 », valeur comptée 0,375   × 219
  1,25 pt → bouton « Partiel · 0,63 », valeur comptée 0,625   ×   2

  518 questions sur 1 472 — 35 % du corpus d'épreuves.
```

**Le total, lui, était juste** : l'arrondi ne touchait que l'étiquette. Mais un
élève qui additionne ses points à la main ne retombe alors jamais sur sa propre
note — et additionner son barème est très exactement ce qu'on fait devant une
copie corrigée. Le produit lui donnait un chiffre à l'écran et un autre dans le
calcul.

### Deux formats, parce qu'il y a deux choses

`formatPoints` (dans `src/lib/bareme.ts`) écrit un **nombre de points** tel
qu'il est : trois décimales suffisent, puisque les barèmes du bac se comptent en
quarts de point et que la moitié d'un quart est un huitième. Les zéros inutiles
tombent — « 2 » reste « 2 ».

`formatNote` garde ses deux décimales pour la **note sur 20** : c'est une note,
pas un barème, et elle est explicitement « indicative ».

Six sites d'affichage basculent (barème d'exercice, `aria-label` de la
question, les trois boutons, le récapitulatif « X pts sur les Y disponibles ») ;
les deux affichages du `/20` ne bougent pas.

### Vérifié dans le navigateur

```
  Juste   · 0,25 pt | 0,5 pt | 0,75 pt | 1 pt
  Partiel · 0,125   | 0,25   | 0,375   | 0,5
```

Avant : « Partiel · 0,13 » et « 0,38 ».

### Quatrième axe de la porte

`bareme-ferme` relit chaque étiquette avec le formateur **du produit** — importé,
pas recopié — et exige que le nombre relu soit exactement la valeur comptée.
Essai rouge : le formateur ramené à deux décimales fait crier la porte
**518 fois**, chiffre pour chiffre la mesure d'ouverture. Au manifeste
(`§11.170`, 62 essais).

---

## §11.171 — Le point décimal anglais : 4 candidats, 3 délibérés, et pourquoi la porte ne sera PAS armée

**2026-09-21.** Un corpus français écrit `0{,}5` dans ses formules : la virgule
protégée par des accolades, sinon KaTeX la traite en séparateur et l'espace
mal. Un `0.5` s'y lit en anglais. Balayage des **81 575 formules** du corpus
(`$…$` et `$$…$$`) :

```
  « . » = signe MULTIPLIÉ devant 10^ (convention française) ...  13
  « \times 10^ » (l'autre écriture de la même chose) .......... 1 571
  « . » = POINT DÉCIMAL anglais ...............................    4
```

### Les quatre, un par un — et c'est là que ça devient intéressant

**Trois sont une fidélité DÉLIBÉRÉE.** `maths/fonction-logarithme` porte, en
toutes lettres dans sa note de provenance :

> *notation « 4.5 » à point décimal conservée telle [quelle]*

Le sujet officiel imprime « 4.5 ». Le corpus le garde, comme il garde
« dimentionnelle » ailleurs — la transcription est fidèle jusqu'aux défauts
d'impression, et c'est une décision écrite, pas un oubli.

**Un seul était une incohérence d'auteur** : `pc/rlc-serie`, dans un champ
`solution` où les trois nombres voisins de la MÊME formule s'écrivent
`6{,}32`, `3{,}97`, `4{,}0` — et un seul `10^{-3.5}`. Corrigé en
`10^{-3{,}5}`, ce qui l'aligne sur ses voisins immédiats, pas sur une règle
importée.

### La conclusion est de ne PAS armer de porte

Une porte « aucun point décimal dans une formule » serait **rouge sur la
fidélité**. Elle pousserait le prochain auteur à corriger le sujet officiel
pour faire taire l'outil — c'est-à-dire à dégrader le corpus pour satisfaire
un contrôle. Le rapport 3 délibérés / 1 réel dit que le gisement est vide et
que le bruit dépasserait le signal.

C'est le pendant d'ADR 0031 : *une porte qui ne peut pas devenir rouge ne
mesure rien* — mais une porte qui devient rouge sur ce qu'on veut garder
mesure **contre** le produit. Le fait est consigné ; l'instrument ne l'est pas.

### Deux autres balayages du même passage, tous deux propres

**Intégrité du catalogue d'épreuves** — 39 épreuves, 62 notions :

```
  id ≠ filière/année/session ...... 0
  notion citée qui n'existe pas ... 0
  titre d'exercice vide ........... 0
  durée officielle hors bornes .... 0   (180 min ×29, 240 min ×10)
```

**Fait pour l'owner, pas un défaut** : la puissance de dix s'écrit
`\times 10^{…}` **1 571 fois** et `.10^{…}` **13 fois**. Les deux sont du
français correct ; la seconde est résiduelle à 0,8 %. Normaliser les treize est
une décision de notation, pas un correctif — elle n'a pas été prise ici.

---

## §11.172 — La première définition gagne, partout — et le piège posé pour le prochain auteur

**2026-09-21.** Balayage HTML des 110 pages rendues, chapitres dépliés :

```
  imbrications interdites (<div> dans <p>, <a> dans <a>, …) ...... 0
  identifiants DUPLIQUÉS ...................................... 75, sur 50 pages
      189 × #step-1      5 × #step-2      3 × #r-body-grad
        2 × #step-3      1 × #liquid-grad, #circuit-state-0…2, #annot-0…2, …
```

Les figures sont **inlinées** : leurs identifiants internes se retrouvent tous
dans le même document. `ancres-uniques` l'avait déjà écrit, et avait tranché —
armer une porte sur « aucun id dupliqué » serait **rouge sur un fait inoffensif
et finirait désarmée**. Vérifié une fois de plus, au niveau RENDU cette fois :
`MediaDiagram` masque les étapes en réécrivant le markup de chaque figure,
`StagedFigure` interroge son propre `svgRoot` — jamais le document.

### Ce que ce balayage ajoute : la condition qui blesse

```
  DUPLIQUÉS **ET** DÉRÉFÉRENCÉS ... 2
    /notions/pc/electrolyse  #liquid-grad  ×2
    /notions/pc/rlc-serie    #r-body-grad  ×4
```

En SVG, `url(#id)` se résout dans **tout le document**, pas dans la figure. Deux
définitions du même id : c'est la **première** qui gagne, partout.

Les deux définitions de `liquid-grad` ont été lues côte à côte : **identiques à
l'octet près**. Les quatre `r-body-grad` viennent du même fichier posé quatre
fois. Donc **rien de visible aujourd'hui**.

Mais le jour où quelqu'un change la couleur du liquide dans **une** des deux
cellules d'électrolyse, la figure qu'il vient d'éditer continue de peindre avec
l'ancienne définition — sans erreur, sans avertissement, et sans différence de
pixels sur la figure touchée. C'est un piège posé pour le prochain auteur.

### La porte, et pourquoi elle est étroite exprès

`figures-id-divergents.mjs` exige les **trois** conditions à la fois : même id,
dans deux figures d'une même notion, définitions **différentes**, et
déréférencé. C'est mot pour mot la condition que la note d'`ancres-uniques`
nommait comme dangereuse — le raisonnement était tenu, il lui manquait
l'outillage (ADR 0033 : *quand une règle est reprise, c'est le geste qu'il faut
outiller*). Le renvoi a été posé dans les deux sens.

```
  51 notions · 267 figures · 1 078 identifiants lus — verte.
```

**Éprouvée dans les deux sens, et le second n'est pas théorique.** Rouge quand
un des deux `liquid-grad` est modifié. Et muette sur l'inoffensif — ce que le
corpus exerce **49 fois** : 49 notions sur 51 définissent un `step-N`
différemment d'une figure à l'autre, et la porte ne dit rien, parce que
personne ne les déréférence. Une porte large aurait crié 49 fois pour rien ;
celle-ci se tait 49 fois et crie une fois.

### L'unité, corrigée une heure après l'avoir écrite

La première version groupait par **notion** : deux figures d'une même leçon.
C'était l'erreur de la journée, refaite — l'unité de mesure plus petite que
celle où vit le défaut. **Une page d'épreuve inline les figures de plusieurs
notions** : deux notions qui ne partagent jamais une page de leçon se
retrouvent côte à côte dans un sujet de bac, et la collision y est exactement
aussi silencieuse.

L'unité est donc le **corpus**. Plus strict que nécessaire — deux notions qui
ne se croiseront jamais pourraient diverger sans dommage — mais cela évite de
modéliser quelles pages réunissent quelles figures, modèle qui se périmerait au
premier changement de l'assembleur d'épreuves. Mesuré **avant** de trancher :
0 collision inter-notions aujourd'hui, donc la règle stricte ne coûte rien et
ne demande aucune exemption.

Un second essai rouge garde ce que l'élargissement a acheté : renommer un
dégradé d'`electrolyse` en `ce-arrow` (défini par `transformations-lentes-
rapides`) fait crier la porte. La version « par notion » serait restée verte.

Node pur — ni build ni navigateur — donc dans la batterie locale, et
`gates.yml` passe à 56 étapes. Au manifeste : `§11.172` et `§11.172 (b)`
(64 essais).

---

## §11.173 — Le style appliqué et sans effet : `.katex` est `display: inline`

**2026-09-21.** Re-passage des instruments hors CI sur HEAD. Onze d'entre eux
tiennent ; `zoom-sweep` rapporte **11 signalements à 360 px avec le texte à
200 %**, tous sur des épreuves SPC, tous « carte coupée ».

### Attribuer avant de corriger

```
  page                      débordement DANS le sur-titre   AILLEURS
  spc-2025-normale                     7                       113
  spc-2025-rattrapage                  0                       308
  spc-2023-normale                     0                       496
  … (7 autres)                         0                    161–561
```

**Dix sur dix débordaient déjà ailleurs** — des centaines d'éléments par page,
les formules des énoncés à 360 px avec le texte doublé. Classe connue, acceptée
(§11.38 : « laisser plier »).

**Un seul signalement était le mien.** Rendre le sur-titre de partie par le
moteur (§11.166) a remplacé un `$…$` en TEXTE — qui se replie comme de la
prose — par une formule KaTeX, qui est un bloc **insécable**. Elle dépassait la
carte de 24 px, et la carte est en `overflow-hidden` : la fin du libellé était
coupée.

### Le correctif, et la mesure qui l'a démenti la première fois

La formule **seule** devient défilable, pas le paragraphe : un paragraphe
défilant serait un arrêt de tabulation de plus, et l'épreuve a déjà payé ce
prix (§11.39, 243 arrêts pour 48 questions).

Premier jet : `max-w-full` + `overflow-x-auto` sur `.katex`. Re-mesuré :
**toujours 2 éléments coupés, rien n'avait bougé**. La raison, lue dans le
style calculé plutôt que devinée :

```
  .katex  display: inline   max-width: 100%   overflow-x: auto
```

**KaTeX rend `.katex` en `display: inline`, et une boîte en ligne ignore
`max-width` comme `overflow`.** Le style était bien là — il se lisait dans le
calculé — et il ne faisait rien. Une porte qui aurait demandé « la règle
est-elle présente ? » l'aurait déclarée verte. Il fallait `inline-block`.

### Après

```
  coupés à 360 px / texte 200 %  ..... 0   (avant : 2)
  coupés à 1280 px / texte 100 % ..... 0
  zoom-sweep ......................... 10 signalements (avant : 11)
```

**Et le correctif ne coûte rien en hauteur**, ce qui n'allait pas de soi : un
`inline-block` défilant peut prendre une ligne à lui seul. Comparé dans la
MÊME page, en forçant `.katex` en `inline` puis en le relâchant — hauteur du
plus grand sur-titre **503 px dans les deux cas**, somme des treize sur-titres
**3 204 px dans les deux cas**. Le sur-titre de 503 px à 360 px avec le texte
doublé n'est pas nouveau : c'est un libellé long qui se replie sur dix-neuf
lignes, et cela ne dépend pas de la formule.

Les portes de l'épreuve re-passent vertes : barème fermé (20,00/20 sur 39),
LaTeX nu 0 sur 39, typographie 0.
