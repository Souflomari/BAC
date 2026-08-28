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
7bis. **(07-06) Gates added at the Fable close:** **M1 masthead +
   RetenirZone (W3 adapté)** — OWNER-DIRECTED Day 11, §3 not yet built
   (work order item 3); **maths GeoGebra/Desmos embeds** need the owner in
   the loop (applet content unverifiable headlessly — honest-state,
   `docs/audits/d10-media-layer.md`); **the video-slot decision**
   ([[video:]] renderer-stubbed; generative tooling = CLAUDE.md open
   decision 4); **the D10 legacy figure bug** —
   `content/pc/rlc-serie/media/energy-exchange.svg` uses hex colors and
   labels a cos² peak-to-peak interval « T₀ » where physics says T₀/2
   (orphaned from lessons but in the repo: fix or delete, owner eyes);
   **ledger §11's twelve Day-11 calls** remain FABLE-DECIDED /
   OWNER-REVIEW-PENDING except where marked OWNER-DIRECTED.
7. **The maths notion is pre-sprint debt.** It predates template v2 and the
   week's grammars: rungs authored at h3 (one rail entry, no ordinals), the
   arbre-pondéré figure never built while the prose references it (C5 —
   diagram-author lane), summit unsourced, no attempt-first/derivation
   grammar. Its five leak classes were fixed in the final batch, but the
   full template-v2 retrofit is a dispatched notion-pass of its own.

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

**Le corpus d'épreuves est passé de 22 à 34 épreuves complètes** (≥ 19,5/20),
220 entrées de banque, **38 notions dotées**. **Douze gagnées** sur cet arc :

- **vague maths** (2026-08-27) : SM 2017, 2021, 2022, 2023, 2024, 2025 normale
  et SExp 2018 — chacune par la conversion de son problème d'analyse ;
- **vague physique-chimie** (2026-08-28) : SPC 2010, 2012, 2015, 2017
  normale et **2011 rattrapage** — les CINQ sujets du recensement, chacun par
  transcription sous protocole complet, vérification adversariale
  indépendante, puis conversion de tout ce qui manquait (13 à 18,25 points
  par sujet). La conversion de 2017 **fonde la banque
  d'`aspects-energetiques`**, qui n'en avait jamais eu. **La campagne SPC est
  close, cinq sur cinq.**

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
