# HANDOFF — the July-2026 sprint, closed (2026-07-03 · addendum 07-06)

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
