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

**Le texte à 200 % (SC 1.4.4) — 227 signalements, ramenés à 0.** Trois
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
