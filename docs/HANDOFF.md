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
