# Day 3 ledger — mechanical batch decisions + option-set recommendations

**Date:** 2026-07-03 · Companion to `fable-ui-content-audit.md` (Day 1) and
`fable-day2-notes.md` (Day 2). The owner picks each option set with these
recommendations visible; every provisional adoption below is
**OWNER-OVERRIDABLE** and structured for a cheap swap.

---

## 1. Decisions made inside the mechanical batch (craft calls, ledgered)

### The shared spine (audit U3 — "no shared edge")
**Decision: one container primitive, consumed by header, main, and footer.**
`PageShell` builds a single container class (max-width + responsive padding)
and passes it to `SiteHeader` and `SiteFooter`; `<main>` uses the same class.
The wordmark, the rail, the content column, and the footer text therefore
share a left edge **by construction** — a misaligned header is now impossible
rather than unlikely. Reasoning: the alternative (nudging the header to match
each page's column with per-page offsets) fixes the symptom and rots; making
the spine structural means page width is decided in exactly one place (the
`width` prop) and every horizontal band consumes it. Verified by two dom-truth
checks (`spine: header/footer aligns with main`, left edge ±0.5px + equal
padding). Note the intentional geometry: the PROSE column centers *within* the
content area (its own deliberate measure); the spine is wordmark ↔ rail ↔
band ↔ footer.

### Masthead anatomy after the doubled-label kill
The accent Eyebrow ("PHYSIQUE-CHIMIE") was removed from the notion masthead —
it duplicated the breadcrumb's subject one line above (U3). The masthead is
now breadcrumb → title → **metadata line** (level · reading time · updated).
Consequence: the masthead currently has NO accent moment; where the surface's
one accent lives again is decided by option Set A. The home card's muted
eyebrow died for the same reason (section heading directly above).

### Metadata honesty constraints
Reading time = word count / 180 wpm (French), computed at build. Updated date
= lesson.md mtime, month + year only (day-level precision would fake an
editorial cadence we don't have). Level chip = "2ᵉ Bac · Sciences" — app-wide
truth; **per-notion filière detail needs a small content-meta file → Day-5
content-schema item.**

### Scroll-spy replacement
IntersectionObserver (threshold-crossing, visibly lagging a section) →
rAF-throttled scroll listener with one deterministic rule: active = last
heading whose top passed the reading line (96px). Verified working at page
bottom (last rung active). Rail rungs now resolve headings by `data-rung`
attribute (the visible R-codes are gone from prose — see below).

### In-prose R-tags
`## R0 — Titre` renders as the human title alone; the rung code moved to
`data-rung` (matching) and the heading gained a hover § anchor. The old
`.rung-tag` CSS is retired. Numbered sections ("1., 2., …") were considered
and NOT adopted mechanically — whether sections carry visible numbers is a
Day-4 taste question; nothing blocks it.

---

## 2. Option-set recommendations (the owner's decision, my pick visible)

### Set A — masthead scale (`/options/masthead/a1|a2|a3`, image `set-a-masthead.png`)
**Recommendation: A3 (56px display in a full-bleed tonal band).**
The audit's central taste finding (U2, confirmed by the real 30px render on
Day 2) is that the masthead *titles* the page but doesn't *open* it. A2 (44px)
is a bigger label — better, same anatomy, still reads "section." A3 changes
the anatomy: the band gives a 5,000-word lesson a front door, gives the new
metadata line a home, and gives every notion page its ONE display moment at
zero accent cost (the band is a tone step on the existing ladder, not a new
color; no motion). It also separates "chapter opening" from "reading surface,"
which matches the tutor-session mental model. Risk: it is the boldest step
from the current identity — if it reads too editorial-magazine on the phone,
**A2 is the safe middle**. (A3 finish note for Day 4 if picked: align the
band's masthead text to the grid content edge rather than the centered prose
measure.)

### Set B — home anatomy (`/options/home/b1|b2|b3`, image `set-b-home.png`)
**Recommendation: B1 (session-first), keeping B2's row language for the
library section (already grafted into B1).**
VISION is explicit: *guided-primary — the app opens on "here's today's
session" and walks the student through it.* B1 is the only variant whose
primary element IS the session. B3 leads with the mastery map — honest and
calm, but it makes progress the door instead of the work; §8 says the
periphery *invites the return*, and the strongest invitation is the open seat,
not the scoreboard. B2 is the most beautiful as pure typography, but a
contents page leads with the library — free-secondary promoted to front door.
B1 also grows into the real product: the continue card becomes the session
card when adaptivity lands (audit C6), the "Ensuite" row becomes the
spaced-retrieval slot. Mock data must be replaced by real state before any
"done" claim — until then home ships unchanged.

### Set C — page end (`/options/end/c1|c2`, image `set-c-end.png`)
**Recommendation: C1 (quiet colophon) as the SITE-WIDE footer; file C2's
"handoff band" as a lesson-end COMPONENT candidate, not a footer.**
The footer's one job is to end the page without competing with the content
above it (bible §0: engagement lives in designed periphery surfaces, not in
every page's tail). C2's three columns add navigation nobody asked for at the
bottom of a 5,000-word lesson. BUT C2's top half — the "Et maintenant" handoff
— is genuinely right *for the lesson page specifically*: it answers "what do I
do now?" at the exact moment the student finishes. That belongs to the lesson
surface (a `LessonEnd` component, Day-4/5), not to the global footer.

---

## 3. Decision status — FABLE-DECIDED / OWNER-REVIEW-PENDING (Day-4 update)

Day 4's dispatch converted the valve into **explicit owner delegation**: the
picks are Fable's, taken and built, and are recorded as **FABLE-DECIDED /
OWNER-REVIEW-PENDING — never "owner-approved."** The U8 lesson is the reason
for the wording: validation the author grants itself is not validation. The
owner's laptop review remains the gate before any of these is called done.

| Set | Decision | Status | Built (Day 4) | Swap cost if overridden |
|---|---|---|---|---|
| A | **A3** — 56px `display-lg` masthead band | FABLE-DECIDED / OWNER-REVIEW-PENDING | Default on all notion pages, both themes verified | `NotionPageView.mastheadVariant` default; a1/a2 still live at `/options/masthead/*` |
| B | **B1** — session-first home | FABLE-DECIDED / OWNER-REVIEW-PENDING | Promoted to `/` under the honest-state rule (see below) | b2/b3 still live at `/options/home/*` |
| C | **C1** — quiet colophon | FABLE-DECIDED / OWNER-REVIEW-PENDING | Site-wide footer; C2's handoff refiled as `LessonEnd` (built) | C2 at `/options/end/c2`; one component edit |

**Revision window (used: no).** Day-4's rebuild did not contradict any
stitched mock; no pick was revised. One finish-note executed as planned: the
A3 band's masthead sits on the page spine (not the centered prose measure).

**The honest-state rule (owner directive, Day 4).** Home fabricates nothing:
the shipped state is the truthful first visit ("Aujourd'hui — commencer
<the most recently updated notion>"), the `SessionState` contract
(`web/src/lib/session.ts`) only produces `resume` from real persisted state
(which does not exist yet), and dom-truth carries an explicit honest-state
guard (no "en cours"/"Reprendre"/progressbar on home today).

## 3b. Gestalt pass v1 (Day 4) — verdict and loss list

**Reference set (named):** m3.material.io article/docs pages, docs.stripe.com,
web.dev articles — the three "designed documentation" anatomies the audit's
"Google-grade" bar implies. **Instrument limitation (ledgered):** live
reference captures failed — the environment's egress proxy resets browser
traffic to external hosts (`ERR_CONNECTION_RESET`, tried direct + proxied).
The comparison ran against these references' well-documented anatomies from
model knowledge; the owner's eye on the real preview is the external referee
until reference captures are possible (Day-6 note for the portability test).

**Verdict, answered straight:** the notion page now reads *designed* — the
band + display title + metadata + worded TOC + spine is the same structural
anatomy those references use, executed in our identity; dark holds. Home
reads *ordered and honest* but thinner than designed — one card + a short
list is anatomy without abundance; it will read fully designed only when real
content volume (more notions, real state) fills the contract. Nothing reads
as slop.

**Loss list (Day-5+ work, none blocking):**
1. Figure-internal typography — bold sans titles inside content SVGs
   ("Pourquoi i = dq/dt ?") compete with the app's figcaption system
   (audit U3 residual; content-asset fix, goes with Day-5 content work).
2. Dark masthead band's tonal step is near-invisible (hairline carries it) —
   acceptable; consider widening the dark `container-low` step with the
   light-ladder spread item from the R4 scorecard.
3. Home session card inner hierarchy slightly flat; "Ta session" h1 +
   "AUJOURD'HUI" eyebrow have a mild semantic echo — copy polish.
4. Trailing whitespace between library and footer at low content counts —
   resolves with content volume; revisit only if owner flags it.
5. Header nav "Notions" + breadcrumb "Notions" render twice in the notion
   fold — chrome vs breadcrumb, not a doubled label per §11's rule, but
   noted for the owner's eye.
6. Gestalt iteration executed this round: metadata line breathing under the
   display title (mt-3 → mt-4). Items 1–5 deliberately NOT executed (one-
   iteration budget).

## 4. Deferred / new items

- Per-notion filière metadata (content-meta file) — Day 5.
- `LessonEnd` handoff component (from C2) — Day-4/5 candidate.
- Section numbering in prose headings — Day-4 taste question.
- dom-truth battery v2: drive one interaction for post-answer states.
- The Eyebrow component has no live instances; re-audit its place in the
  system on Day 4 (keep in library vs retire).

## 5. Day-5 additions

**Record correction (deployed-truth discipline, applied to ourselves):** the
Day-4 report claimed dom-truth was hardened (unique port + process-group
kill). **It was not** — the shell cell carrying that edit killed itself
(`pkill -f "next-server"` matched its own command line) before the edit ran,
and the follow-up verification passed for an unrelated reason (the orphans had
just died). The hardening was applied FOR REAL on Day 5 and verified (run
green, zero leftover servers). The Day-4 commit message overclaims this one
item; this entry is the correction. This exact failure class is why the
deployed-truth clause now exists in DESIGN-BIBLE §13: an issued command is not
an applied change; a push is not a deployment.

**Day-5 content-systems decisions:**
- The attempt-first commit mechanic v1 is a self-declared attempt gate (button
  after paper work) — honest about what a static page can know; an mcq-commit
  question type is spec'd as the natural extension (PAGE-ANATOMY... no:
  AttemptFirstExercise header comment) but not built.
- The R0 hook now commits through `cp-r0-predict` (M2 primary); the video slot
  is an enhancement comment (C5 closed). R1 gained the M7 prose rupture
  (EXEMPLARS.md §2). R8/R9 render through AttemptFirstExercise (C1 closed —
  dom-truth guards "no printed solutions").
- **C2 remains open BY DESIGN:** `exercises.yaml r8-bac.sourcing.status =
  unsourced` and template v2's blocking box mean the RLC notion is NOT DONE
  until the owner's real bac sources arrive. Nothing was faked.
- Per-notion filière metadata (content-meta file) still deferred — carried to
  the handoff list.
- OWNER-REVIEW-PENDING set unchanged: A3 / B1 / C1 + now the R0-commit
  checkpoint pattern and the attempt-first component register (content-side
  taste calls made under the same delegation).

## 6. Day-6 additions (richness iteration)

**Followability pass — the tired-student read of the full RLC lesson.**
Method: one uninterrupted read of `lesson.md` as rendered order, asking only
"where do I get lost?" Findings and what was done about each:

1. **No position sense off-desktop.** The rail is desktop-only; on compact a
   student 20 minutes into the lesson has no idea whether they're at section
   3 of 10 or 8 of 10. **Change:** rung headings now carry a muted ordinal
   ("3 · Le mécanisme") via a CSS counter (`globals.css`, counter reset on
   `.notion-content` because markers split the prose into several
   `.prose-lesson` containers). The rail mirrors the same numbers — rail and
   page tell one map. This RESOLVES the §4 deferred item "Section numbering
   in prose headings" — status FABLE-DECIDED / OWNER-REVIEW-PENDING.
   Reasoning: human 1-based numbers, never the R-codes (§11 no internal
   vocabulary); a number is the cheapest honest position affordance — no
   progress theater, no fabricated "80% done" claims, works with zero JS.
2. **Rung boundaries read as furniture, not rhythm.** The `---` breaks
   rendered as full-width 1px hairlines — the exact grammar of a Wikipedia
   table border, nearly invisible at reading speed. **Change:** short
   centered rule (3rem, border-soft, 4em air) — LESS ink, clearer "chapter
   pause" (§11 section rhythm). The lesson's leading `# h1 + ---` never
   reaches the renderer (stripLeadingTitle), so this styles rung breaks only.
3. **R4 opens with two stacked motion players** (`regime-traces-forming`
   then `energy-pendulum`) with zero prose between — a tired student doesn't
   know which to play or why the second is there (it replays R1's ideal
   exchange inside the *regimes* rung). Deferred until the motion-author
   agent lands (it is editing lesson.md concurrently — two writers on one
   file is how conflicts happen); fix in chunk C.
4. **R5's algebra test kept as narrated block math, NOT migrated to the
   Derivation component.** Considered and rejected: each step there carries a
   full prose paragraph (the misconception rupture is the narration, not the
   algebra); the Derivation note field is a one-liner "why this move" layer
   and would compress the lesson's centerpiece. Display-math discipline is
   already satisfied (one transformation per line, prose between). The
   component is for *procedural* multi-step algebra (R2 verification, R8/R9
   solution steps), not for staged ruptures.

**Gestalt notes vs the expanded reference set (Imprint, Brilliant).** Live
captures of both remain blocked by the egress proxy (ledgered Day 4 —
instrument limitation, judged from model knowledge, LOW confidence vs a
rendered comparison): the Day-6 home shelf moves us from "index of links"
(Wikipedia grammar) toward the reference grammar both apps share — content as
covered *objects* on a shelf, one motif per cover, flat vector in a bounded
palette. Where we still differ deliberately: their covers are illustrative
scenes; ours are single subject-true motifs (§6 zero-seductive-detail — a
scene invites browsing-as-entertainment). Where we genuinely lag: cover-motif
variety (2 notions share the pc curve family today; fine at 2, thin at 20 —
the per-notion specialization path in COVER-SPEC is the answer, starter set
proves it with rlc-serie).

**Motion coverage (the motion-decision rule applied to RLC):** R3 teaches
energy *dissipating over time* and R7 teaches *compensation per cycle* — both
dynamic relationships, neither had a motion figure; both commissioned through
the beat engine (`amortissement-energie`, `entretien-compensation`) — outcome
recorded below when the authoring agent lands. R5 (algebra test) and R6
(oscillogram reading) are static-suffices: R5's object is an equation
contradiction, R6's is a measurement procedure on a frozen trace — records
per the rule, silence is the failure mode.

**Motion outcome (agent landed, verified rendered):**
- `amortissement-energie` (4 beats, R3): circuit-with-R + energy bars whose
  TOTAL visibly shrinks under a dashed E_max reference while E_C ↔ E_L keep
  swapping; cumulative heat marks at R; honest "hauteurs qualitatives, aucun
  coefficient (§0.4)" footnote. `entretien-compensation` (3 beats, R7):
  decayed trace joins a constant-amplitude trace with phase continuity at a
  "générateur activé" marker; the k = R badge; no pseudo-period formula
  (§0.4). Both specs machine-checked (beat-0 settled, eases in the allowed
  set, durations ≤ 0.85 s) and dom-truth-guarded (presence of both figures —
  an unknown slug is a SILENT no-op in NotionBody, so presence is the only
  rendered proof the marker wired up). The authoring agent had no Bash and
  said so (honest report); the build + rendered verification ran here.
- **Two rendered-truth catches static checks missed:** the generator's
  "générateur d'entretien" label sat at the SVG top edge and read as a
  continuation of the figure subtitle; after the first fix the right wire
  struck through the u_G = k·i relation. Both repositioned beside the glyph
  (left-anchored, clear of the wire) and re-verified from re-shot renders —
  exactly the failure class §13 exists for.
- **R4 stacked-motions fix applied** (finding 3 above): the
  `energy-pendulum` replay removed from R4 with an explanatory comment;
  `regime-traces-forming` stays as R4's single on-point motion.
- **Engine constraint encoded:** the agent discovered `fill` is single-shot
  per element (MotionStage stashes then collapses the geometry; a second
  `fill` on the same id animates to nothing). Written into
  MOTION-CHOREOGRAPHY.md's `fill` entry with the pre-baked-bars +
  cross-fade workaround pattern — a hard-won constraint now findable by a
  cold author instead of re-discovered.

## 7. Day-7 — the portability test (record + handoff skeleton)

**Executor honesty (§13):** the dispatch names Sonnet 4.8; this harness
exposes model aliases (sonnet/opus/haiku), documents the current Sonnet as
**Sonnet 5**, and offers no 4.8 ID. The test ran pinned to the `sonnet`
alias. If the alias resolves newer than 4.8, the test is *easier* than the
target claim — the verdicts below carry that caveat and never claim more
than "the sonnet-alias executor, cold."

**Method notes:** briefs committed before any run (`day7:` commit); article
(a) ran delete-and-rebuild in the working tree with the authored version
preserved in HEAD (same non-destructive guarantee the dispatch's worktree
suggestion serves — no node_modules in a fresh worktree, so the executor
could not have run the build there); runs sequential (shared tree, .next
contention); acceptance rows in dom-truth committed red before the runs.
Spec-drift fix applied BEFORE the test (PAGE-ANATOMY home anatomy was
pre-Day-6 — a stale spec would mismeasure the executor, so calibrating the
instrument is not coaching).

**Blind-pair answer key (SEALED — not in the report):**
`web/shots/day7/blind/` — pair-cover: **A = executor (rc-charge), B =
authored (rlc-serie)**; pair-derivation: **A = authored
(verification-cosinus), B = executor (i-de-t)**; pair-prose: **A =
executor (RC mechanism paragraph), B = authored (RLC R3 paragraph)**.
A/B assignment was coin-flipped per pair before shooting; both sides of
each pair shot with identical treatment (same viewport, element
screenshots; height differences are natural content length).
*Blindness caveat:* the owner has already seen the authored cover and
derivation in Day-6 evidence, and the prose pairs are from different
topics — his guesses test whether the LANGUAGE diverges to the eye, not
pure authorship anonymity. Where his eye catches a difference, capture
what he saw — that observation outranks the checklist.

**Spec-bug log (questions the docs should have answered):** *(filled per
article as runs land)*

### Article (a) — LessonEnd rebuild: gap analysis

Committed as produced (`day7(a)` commit). Invariants: ALL green (dom-truth
LessonEnd rows, build, tokens, state-layer/focus-ring, honest-state).
Divergence table vs the Day-4 authored version:

| # | Divergence | Class | Canon decision |
|---|---|---|---|
| 1 | Aside wrapped in `.notion-prose` (measure-capped) vs full content column | substantive (visible layout) | **Executor's call adopted** — argued correctly from bible §10; the authored full-width aside was the weaker call. Spec now states it. |
| 2 | Title ABOVE context line (spec's literal listing order) vs authored context-line-first | cosmetic, caused by MY spec ambiguity | **Authored order stays canon** (house eyebrow-then-title grammar, matches session card). Spec now numbers the order explicitly. |
| 3 | `truncate` on the recommendation title | substantive-minor (hides wayfinding words) | **Rejected** — Day-3 never-ellipsize rule was ledger-only, not in any spec; generalized into PAGE-ANATOMY ground rules. |
| 4 | Hover cue: title→accent (library-card cue) vs authored arrow-translate | cosmetic | **Executor's adopted** (one feedback language with the shelf). Spec states it. |
| 5 | Row metrics px-6/py-6/rounded-xl/focus-16 vs px-4/py-4/rounded-lg/focus-12 | cosmetic (both on-grid) | **Executor's adopted as-shipped;** spec states one set to kill the ambiguity. |
| 6 | `aria-label="Et maintenant"` + decorative Eyebrow vs "Fin de la leçon" + raw `<p>` | cosmetic (a11y-better) | **Executor's adopted** — no double announcement; shared Eyebrow = the one eyebrow language. Also resolves the §4 deferred item "Eyebrow has no live instances": it now has one — KEEP. |
| 7 | `philo` added to local subject map | improvement | Adopted. |

**Spec bugs logged (tightened in PAGE-ANATOMY-SPECS same day):** measure
treatment unstated (the sharpest gap — executor's words: "technically
compliant but sprawling with no signal something's missing"); element order
listed in the wrong order in the spec's own prose; C2-refile visual delta
(boxed band → flowing row) asserted but never reconciled; null-`next`
behavior unspecified; never-ellipsize rule not generalized beyond the rail.
**Verdict: FAITHFUL on every stated invariant; where the spec was silent
the executor reasoned from the bible rather than inventing — the failure
mode the week was built against (silent plausible drift) did not occur.**
The committed component diverges from the TIGHTENED spec on rows 2–3; the
post-tightening re-run tests convergence.

### Article (b) — RC-charge mechanism section: gap analysis

Committed as produced (`day7(b)` commit). Physics verified sound (the
constant-rate reductio is internally valid: the naive model grants finite-
time arrival at u_C = E, where mailles + Ohm force i = 0 against the
model's own constant i ≠ 0; the loop mechanism, reservoir analogy, Ω·F = s
check, and the honest "τ is a scale, not a stopping instant" framing are
all correct and cadre-safe). Boxes: voice / mechanism-why /
reasoning-annotation / display-math all checkable at the cited lines.
dom-truth DAY7(b) rows green (masthead band, rung section renders, no
R-codes). Divergences and findings:

| # | Finding | Class | Outcome |
|---|---|---|---|
| 1 | ODE establishment authored as narrated block math, not the Derivation component, despite the template box's literal "≥3 steps → component" | faithful-to-CORPUS, divergent from the box's letter | **Template spec bug.** The practiced boundary (RLC R2 mailles narrated; verification componentized; Day-6 R5 decision) was never encoded. Display-math box tightened: component vs narrated decided by the math's ROLE (verification/solution vs establishment spine). |
| 2 | ASCII apostrophes in source, pipeline converts | faithful (matches both existing lessons) | **Template + brief bug:** the orthotypography box said "no hardcoded ASCII apostrophes," contradicting the practiced convention. Box rewritten (markdown = ASCII + pipeline; TSX chrome = hand-typed curly). Brief (b) carried the same wrong phrasing — left as-run for the record. |
| 3 | Invented the misconception to rupture (constant-rate/robinet) absent any spec/ledger for the notion; staged it properly (voice → test → break) and FLAGGED it as needing pedagogy-architect confirmation vs alternatives (u_C continuity at t=0) | honest judgment under missing spec | Recorded: rc-charge misconception inventory is pedagogy-architect debt; the invented target is plausible but unconfirmed. |
| 4 | Prerequisite-boundary question: is « le condensateur » (i=dq/dt, q=Cu_C) assumed known or to be taught? Executor chose one-line rappel and asked | **spec bug (the sharpest of article b)** | Section-level briefs must state prerequisite assumptions. Encoded in day7-briefs/README (dispatch template rule). |
| 5 | Near-verbatim reuse of RLC's R1 opener cadence ("Avant les équations, comprendre le mécanisme…") | cosmetic | Exemplar-imitation working as intended; watch at scale (10 notions opening identically would read formulaic — noted for the coherence-critic's brief, not a rule yet). |

**Verdict: FAITHFUL — tutoring-grade section, correct physics, honest
handling of every gap it hit. The two real bugs it exposed are TEMPLATE
bugs (box letter vs corpus practice), both tightened same-day.**

### Article (c) — i-de-t derivation: gap analysis

Committed as produced (`day7(c)` commit). Math verified correct (chain rule
staged as symbolic-outer → evaluate-inner → substitute; the boxed result
matches R5's reused derivative and the corpus's i_max convention). Both
wrong-reflex layers are real student errors placed at the exact steps they
occur. The prose weld is better than the original: the closing paragraph
ties the sinus/cosinus quadrature back to R1's quarter-period energy
observation — cross-rung coherence the bare formula never had. dom-truth:
present + step-2-absent both green; build green. Divergences and findings:

| # | Finding | Class | Outcome |
|---|---|---|---|
| 1 | `i_{max}` (lowercase) over the brief's `I_max` | faithful (to corpus) — the BRIEF was wrong | Brief bug noted; the brief's own "keep the lesson's existing notation" clause resolved the conflict correctly. Left as-run. |
| 2 | Step 1 restates q(t) as an anchor step (0 transformations) | faithful — mirrors `verification-cosinus`'s opening-step pattern | None. The exemplar carried the convention; this is exemplar-transfer working. |
| 3 | Executor found the pre-authored DAY7(c) acceptance row only by grepping the id "out of caution" | **dispatch-protocol bug (the sharpest of article c)** | A brief that names a machine-checked deliverable must POINT AT the check. Encoded in day7-briefs/README: acceptance sections name their dom-truth rows. The executor's stated failure mode is exact: a different id would have shipped green-looking with the row permanently red. |

**Verdict: FAITHFUL — component contract, corpus conventions, and physics
all held; the one real bug is in the dispatch protocol, tightened
same-day.**

### Article (d) — rc-charge cover: gap analysis

Committed as produced (`day7(d)` commit). Verified rendered both themes on
the home shelf next to the authored covers: same stroke band (2.5/3.5),
figure-palette vars only, dark mode by construction, composition on the
spec's geometry. dom-truth 68/68 green including the tightened
motif-specific row. Findings:

| # | Finding | Class | Outcome |
|---|---|---|---|
| 1 | Motif choice: asymptotic rise to a DASHED CEILING, deliberately breaking the pc oscillation family ("subject-generic but notion-false") | faithful — and the strongest design reasoning of the four articles: it read the lesson before choosing, and the ceiling encodes the notion's one non-negotiable fact (approached, never reached) | Adopted as-is. The reasoning pattern (read the lesson; find the one visual fact the notion cannot lose) belongs in COVER-SPEC's language section for the Gemini lane — carried to the consolidated ADR list. |
| 2 | data-motif contract lived only in a Cover.tsx code comment, not in COVER-SPEC's placement rules — executor flagged that a spec-only reader would ship dom-truth-red work | **spec bug (found by the executor, real)** | COVER-SPEC placement rules now state the data-cover / data-motif split and the done-condition selector. |
| 3 | Reused `--figure-accent` (pc hue) for the new pc notion | faithful — COVER-SPEC's per-subject accent table implies it | None. |

**Verdict: FAITHFUL — and the first article where the executor's design
REASONING (not just execution) met the bar; the brief's
acceptance-instrument pointer (added after article c) demonstrably worked:
the executor ran the exact row and reported it green.**

### Article (a) RE-RUN — post-tightening convergence test

Same brief, fresh cold session, against the TIGHTENED spec. Result:
**both previously-divergent rows converged** — element order now
caption-above-title, no `truncate` (title wraps). Every previously-pinned
choice reproduced (notion-prose cap, Eyebrow+aria, row metrics, hover cue,
static arrow). Build green; dom-truth 68/68. The re-run then surfaced a
FINER layer of ambiguity, resolved sensibly and tightened same-day:

- Row caption: second `Eyebrow` instance vs plain session-card caption —
  executor chose plain (right, via §11 doubling logic); spec now states it.
- "serif h3 title": element vs type-scale — executor chose span-at-scale
  (right, library-card convention); spec now states it.
- Internal rhythm (label→row, row→return) unpinned — executor chose
  mt-4/mt-6 on-grid; spec now pins them.
- Subject-map duplication (its 4th flag across both runs) — and the re-run
  PROVED the drift risk by mirroring NotionPageView's philo-less copy,
  silently dropping v1's philo fix. **Closed in code, not just spec:**
  `web/src/lib/subjects.ts` is now the one home (labels + notionHref);
  page.tsx / NotionPageView / LessonEnd consume it; spec names it.

**Convergence pattern worth recording for the handoff:** each tightening
pass eliminates the previous run's divergences and exposes a strictly
finer layer. Two passes took LessonEnd from "faithful with 7 divergences"
to "faithful with rhythm-level micro-choices." The spec-tightening loop
CONVERGES — this, more than any single verdict, is the portability
result.

## 8. Final batch — the external-audit event (2026-07-03)

An independent design audit of the deployed preview arrived
(`docs/audits/external-design-audit-2026-07.md`). §13 applied to inbound
claims: every finding was measured before fixing (5-agent measurement
fan-out against the built site; full numbers in the triage table,
`docs/HANDOFF.md` §1). Verdicts: 5.1 leak CONFIRMED-undercounted (5
fragments, 2 mechanisms — react-markdown v9 renders raw nodes as literal
text; plus one AUTHORED note in the maths ramp table); 5.2 measure REFUTED
as stated (the audit measured the 1076px grid, body prose = 65.0ch) but
the sweep found two real bypasses (Derivation notes ~94ch, items intro
~87ch); 5.3 contrast REFUTED (worst in-scope 6.57:1); 5.6 dark CONFIRMED
and worse (no activation path at all); 5.4 head CONFIRMED in full; 5.5
breadcrumb CONFIRMED (visual-only); math-a11y REFUTED (487/487 MathML).

**Instrument confessions (recorded, not excused):**
- All week's "verified both themes" claims were true of a harness-forced
  `.dark` class no user could reach. The audit's fresh eye, not our
  battery, caught it. → the §13 three-legs rule.
- dom-truth's `notText` guards tested only the first 60 characters of an
  element's text — the honest-state and attempt-first guards were
  silently shallow. Found while building the class guard; all notText
  rows now test full text.
- The first version of the measure sweep flagged card BOXES as text lines
  and the first contrast sweep was defeated by its own persistence fix
  (the dark choice survives navigation — evidence the feature works,
  recorded as a sweep-sequencing lesson).

**Fixes (all rendered-verified, battery at 99 checks green):**
stripAuthoringComments at load + maths note edited out + case-aware
lexicon class-guard on every page; measure caps (Derivation ol at
--measure-prose, items intro at --measure-wide) + permanent ≤75ch sweep;
permanent contrast rows both themes via REAL user paths (persisted-boot +
toggle round-trip); ThemeToggle + pre-paint boot script (bible §2
satisfied: OS default + persisted manual choice; chrome preferences may
persist — ADR 0025 §2.11; FontSizeStepper non-persistence recorded as
debt); head pack (icon.svg/apple-icon/og.png/OG/twitter/canonical/JSON-LD
site+notion); breadcrumb title attr; rail aria-current; KaTeX parity
sweep (finding: already accessible — do not "fix").

**Structural amendments:** bible §13 "guards target classes, not
instances" + the three-legs corollary; template v2 §E annotation channel;
RULES fresh-session section (dispatch-brief protocol + three legs);
ADR 0025 (the consolidated week, incl. Retractions).

**Adversarial verification round (the classes-not-instances lesson,
demonstrated INSIDE the fix batch):** a fresh-eye refuter was sent against
the fixed build with orders to break the claim "no internal authoring text
renders." It did: my named fixes all held, but FIVE residual leak classes
the first lexicon never imagined were rendering — (1) a full reviewer
note in a markdown BLOCKQUOTE in the maths notion (a third mechanism:
authored visible markdown, neither comment nor incidental note); (2) raw
`[[ARBRE_PONDERE]]` placeholder tokens ×3 (uppercase non-marker form falls
through the marker regex as prose); (3) R-codes in 11 maths h3 headings +
7 ramp-table cells (the U3 de-jargon strip was h2-only — itself an
instance fix that missed a sibling); (4) internal spec citations
"(§0.4)" painted in all five motion SVGs' rendered footnotes (my own
Day-6 authoring); (5) dangling "en R1/R2" cross-refs in rlc prose and a
derivation note pointing at labels no student can see. ALL FIVE fixed:
note → stripped comment; placeholders → proper silent slots (+ C5 debt
recorded: the maths prose references a tree figure that doesn't exist —
diagram-author lane); h3 renderer now strips R-codes like h2; ramp table
renumbered 1–7; SVG citations removed (honest scope notes kept); prose
refs rewritten to visible referents. Lexicon guard expanded to the new
classes (`[[`, `§\d`, "Note de validation", `R\d —`) — with the innerText
fix so the RSC script payload (which legitimately carries raw markdown)
isn't false-flagged. Battery: 99 checks, 0 failures.

**Verification honesty:** the second refuter (dark/no-flash/head/measure)
died on a session rate-limit before reporting. Its entire scope is covered
mechanically (toggle round-trip + persistence, head presence rows, measure
sweep — all green) and by my own rendered checks (dark-via-toggle
screenshot in `web/shots/day8-audit/report/`), but no independent agent
re-verified those specific claims: recorded as-is rather than claimed
otherwise.

## 9. Day-8 — wide-viewport composition (owner review, ~2000px monitor)

**Instrument confession #3 (encoded first, bible §13 amendment #3):** every
check all week ran at 1280px; the owner's monitor is ~2000px. The battery
now carries a permanent wide tier (1536/1920 structural rows; site-shots
gained wide/ultrawide viewports). His annotated screenshot arrived INLINE
and was not persisted by the harness — the file could not be committed;
the four circled regions are transcribed below as measurements. If the
original should be archived, re-attach it (intended path:
docs/audits/owner-wide-viewport-annotations.png).

**The BEFORE numbers at 1920 (both themes identical;
`web/shots/day8-wide/report/measurements.json` + before-shots):**
*(Path corrected 2026-09-20: the citation named
`shots/day8-wide/measurements.json`, which `.gitignore` drops — `report/` is
the one exception. A reader cloning the repo found nothing there. The July
numbers themselves survived untouched in `report/`.)*

| Region (owner's circle) | Measured |
|---|---|
| Band occupancy | title block 1076×209 in a 1920×306 full-bleed plane = **38.3%** |
| Band flank voids | **422px each side** inside the band |
| Left gutter | 390px to container; rail at 422px |
| Right of content / of prose | **422px / 528px** |
| Home at 1920 | main = **691px wide** (max-w-content); **614px dead gutter per side**; the page reads as a ribbon |
| 404 at 1920 | centered utility block; voids symmetric (acceptable under §4's balanced clause — held, not dead; no fix needed) |

### 9 bis. The AFTER row — measured 2026-09-20

`wide-measure.mjs` has carried this request in its own header since July —
*"Throwaway after the batch? NO — kept: re-run after the owner's picks to
produce the AFTER row of the same table."* Nobody read it: the script was in
no catalogue (§11.123). Re-run today on a build made from HEAD, same page
(`/notions/pc/rlc-serie`), same 1920×1000 viewport, same selectors. **Both
themes identical again, in both runs.** Evidence:
`web/shots/day8-wide/report/measurements-apres.json` + `after-*-1920-light.png`.

| Region (owner's circle) | July (BEFORE) | 2026-09-20 (AFTER) |
|---|---|---|
| Band occupancy | title block 1076×209 in a 1920×306 plane = **38.3%** | title block 921×221 in a 1920×318 plane = **33.3%** — and **46.0%** once the M1 cover (352×220) is counted as the content it is |
| Band flank voids | **422px each side** | **276px left / 276px right** — symmetric. The raw `bandVoidRightPx` reads 724px; that is the instrument, not the page (below) |
| Left gutter | 390px to container; rail at 422px | **218px** to container; rail at **276px** |
| Right of content / of prose | **422px / 528px** | **580px / 643px** — the one number that moved the wrong way |
| Home at 1920 | main **691px** wide; **614px dead gutter per side**; "reads as a ribbon" | main **1760px** wide; **80px** gutter per side; session card 1645px |
| 404 at 1920 | symmetric, no fix needed | unchanged |

**Two of the four circles are closed, one is open and now measurably wider,
one was never a defect.**

- **Home — closed, and it is the biggest move of the two months.** The ribbon
  is gone: the content plane went 691px → 1760px (+155%) and the dead gutter
  614px → 80px (−87%). This was the owner's loudest circle.
- **The band — closed by the M1 pick.** M1 (cover-in-band) was recommended in
  July and shipped on 2026-09-04. The band's right region now carries the
  notion's own cover, the flanks are symmetric at 276px, and occupancy rose
  38.3% → 46.0%. The title block itself got *narrower* (1076 → 921px), which
  is the point: it stopped being the only thing in a 1920px plane.
- **Right of prose — OPEN, and 115px wider than in July (528 → 643px).** The
  whole column moved left (gutter 390 → 218, rail 422 → 276, prose 768 → 587)
  and the prose itself got wider (624 → 690px), but nothing was put on the
  right, so the void grew with the shift. **Set W was never picked.** This is
  not drift — it is the July recommendation still waiting.
- **What "picking W3" actually costs, measured today rather than estimated.**
  July called W3 "cheap to make real (one authored formula per rung)".
  Half-true, and the half that is false is the expensive half:
  `KeyFormulaRail.tsx` **exists and works**, but the only data feeding it is a
  hardcoded `KEY_FORMULAS` constant in `web/src/app/options/wide/[v]/page.tsx`,
  for one notion. `grep` over `content/` finds no `key_formulas` field
  anywhere: **the component is built, the authoring channel is not.** Picking
  W3 is a template-v2 field plus 62 notions of authored content — the same
  shape of work as W1, not a smaller one.

**Instrument amendment (the ADR 0033 species, again).** `bandVoidRightPx`
answers exactly one question — *distance from the title block's right edge to
the band's right edge* — and its name invites a wider reading. In July that
distance **was** void. Since M1 shipped, the same untouched formula calls an
occupied region "void" and reports 724px. Nothing in the gate broke; the page
moved underneath it. The July key is kept verbatim so the two rows stay
comparable, and three keys were added to say what it can no longer say:
`cover` (the box actually painted), `bandFreeRightPx` (band edge minus the
rightmost of title *or* cover), `bandOccupancyWithCoverPct`. Had the script
simply been re-run and the number read off, this ledger would now claim the
band regressed from 422px of void to 724px — the exact opposite of what the
page does.

**A second defect in the same instrument:** built to produce a comparison, it
wrote its output to `before-*.png` / `measurements.json` unconditionally, so
every re-run destroyed the term it was to be compared against. The July
evidence survived by accident — `report/` is the single exception to the
folder's `.gitignore`, and the tracked copy lives there. The after-pass now
takes `--apres` and writes `after-*` / `measurements-apres.json`.

**Option sets (live at `/options/wide/m1..m3, w1..w3`; stitched
comparisons both themes in `web/shots/day8-wide/report/`):** built as
prop-driven variants of the REAL page (`wideOption` on NotionPageView);
W-mocks use verbatim lesson content, hand-anchored — a pick converts the
channel to authored content (template-v2 field), stated in the route file.

**Recommendations (FABLE-RECOMMENDED — the owner picks; no provisional
adoption this round):**
- **Set M → M1 (cover-in-band).** It completes the band with the notion's
  OWN identity — the Day-6 cover language reused, not new noise; dark mode
  works by construction (the cover's background var equals the band's, so
  only the motif reads); it makes shelf→lesson visually continuous; and it
  implements COVER-SPEC's existing masthead tie-in clause (promoted from
  ≤0.6 echo to full presence — the clause gets updated on pick). M2 demotes
  the A3 display moment to a card and forfeits the full-bleed chapter
  furniture that the external audit praised as deployed; M3 holds the space
  but adds nothing and reads accidental at some crops.
- **Set W → W3 now (key-formula rail), W1 as the deep second.** W3 is
  sparse, real content, calm, and cheap to make real (one authored formula
  per rung). W1 (margin notes) is the richest long-session pattern and the
  best fit for the "pourquoi ce geste" layer, but it requires an authored
  margin-note channel per notion — worth doing deliberately, possibly ON
  TOP of W3 later; picking it today means content-pipeline work per notion.
  **W2 recommended AGAINST, with the measured reason:** current figures are
  design-capped (680–880px), so at 1920 nothing earns the extra width —
  the demo shows a wider band with the same content sizes; the strategy
  only pays after a figure-width pass that no other goal demands.

**Home/404 sweep:** 404 passes §4's balanced test. Home fails at wide tiers
(the ribbon) — the fix follows the picked Set-W grammar (e.g., W3's
composition logic would let the shelf go 3-up inside a wider content shell;
decided with the picks, not before).

**Collateral catch (rendered evidence, again):** the W1 option shot exposed
a LIVE production bug — the R2 heading rendered "trouver T0T_0T0": the
Day-3 rung-strip rendered flattenText(children), destroying KaTeX heading
children (MathML text + TeX annotation + HTML concatenated). Student-visible
since Day 3; no instrument looked at heading text WITH math. Fixed
(stripRungPrefix preserves children; flattenText deleted); class-guarded
(heading innerText carries no underscore artifact; R2 heading contains a
real .katex). Battery: **106 checks, 0 failures.**

## 10. Day-8.5 — deployment truth, closed as a class

Second occurrence: the owner cannot see Day-8 work live, during his review
window (first occurrence Day 4.5, mooted when the symptom self-resolved).
Findings, each measured:

1. **Clean-checkout build proof — PASS.** Fresh git worktree of `d8acef7`,
   `npm ci` + `next build` from `web/` (the Vercel way): exit 0, all 23
   pages generated, `/options/wide/*` m1–m3 + w1–w3 in the route list.
   Nothing load-bearing is gitignored; zero `process.env` reads in app
   code; no engines pin (Node default aligns); no case-sensitivity traps.
   The commit Vercel received builds clean → the cause is ACCESS-side
   (which URL / alias / protection), not build-side.
2. **Vercel-side inspection — NOT REACHABLE.** No Vercel CLI installed, no
   auth; per the dispatch, stated and stopped — no inference from push
   events. What the webhook metadata alone shows (platform report, not
   verified): rootDirectory "web"; two URL families — the branch URL
   (`bac-git-claude-vibrant-fermi-…`) while Building and `bac-pink` when
   Ready.
3. **Config audit:** no `vercel.json`, no `.vercel/` — the project is
   configured entirely dashboard-side (invisible from the repo). This
   asymmetry is WHY the class recurs: the repo cannot prove what the
   dashboard does. The build stamp closes the loop from the other side.
4. **The permanent fix — the build stamp.** Footer colophon now renders
   "· v. <short-sha> · <date>", injected at build (next.config.mjs:
   VERCEL_GIT_COMMIT_SHA on Vercel / git locally / "inconnu"). dom-truth
   asserts presence AND stamp==HEAD (mismatch = stale build — itself
   signal). Battery: **107 checks, 0 failures.** From the next deployment
   on, "which version am I looking at?" is answered by the page itself.

**Diagnosis matrix (keyed to the owner's dashboard answer; staged fixes
execute on receipt):** see the Day-8.5 report — recorded identically
there and here: (a) old-version → owner is on the production domain or a
pinned alias; fix = confirm the URL he uses; production only updates on
PR merge (owner-gated), bac-pink should track the branch — if it doesn't,
re-alias in the dashboard (owner action; no settings changes from here).
(b) blank page → runtime JS error; fix = his browser console text, then
targeted repro (clean build renders locally, so likely extension/network
local to him). (c) Vercel-404 → deployment not found/expired link; fix =
open the PR's latest Ready link. (d) auth-wall → Deployment Protection on
previews; fix = dashboard toggle or bypass link (owner action). (e)
options-routes-404-only → deployment predates d8acef7; fix = confirm the
footer stamp on what he sees (the stamp exists for exactly this) and
redeploy/wait for the d8acef7+ build.

### Handoff skeleton (next dispatch fills this in)

1. **Open gates (owner decisions pending):**
   - spec.md validation for the RLC re-spec (pedagogy-architect output
     never human-validated — RULES §2 gate).
   - **R8 bac sourcing (audit C2, BLOCKING):** `exercises.yaml
     r8-bac.sourcing.status = unsourced` — notion NOT DONE until the
     owner's real sujets arrive. Do not fake it.
   - A3 / B1 / C1 + Day-6 taste calls (ordinals, boundary rule, covers,
     R0-commit pattern, attempt-first register): all FABLE-DECIDED /
     OWNER-REVIEW-PENDING — owner laptop review confirms or overrides;
     specs carry the swap points.
   - Production-sync verification (CLAUDE.md non-negotiable) — untouched
     all week by design; still open.
2. **Consolidated ADR for the week** (one document, next number free in
   docs/decisions/): bible amendments 1–6 + §11–13, TOKENS v2
   (display-lg tier), template v2 (measurable boxes + display-math +
   motion-decision), the component set (Derivation, AttemptFirstExercise,
   Cover/COVER-SPEC, LessonEnd, masthead band), the instrument suite
   (dom-truth self-syncing battery + shots harnesses), rendered-truth +
   deployed-truth discipline, the U1 root-cause rule, honest-state rule.
   Retractions section present even if empty.
3. **RULES/ROSTER pointer updates:** RULES.md gains pointers to the day7
   briefs dir as the dispatch template; agent roster revision (CLAUDE.md
   open decision #3) folds in what the week proved: motion-author works
   from beat-spec + choreography docs; content agents build to template-v2
   boxes; critics check boxes with citations.
4. **The "how not to regress this" one-pager for Opus 4.8:** the ~10
   invariants that, if violated, silently rot the product (U1 classGroups
   rule; rendered-truth/§13; honest-state; attempt-first pre-commit DOM
   guard; derivation pre-reveal guard; counter-scope invariant; tokens
   only; calm budget/count limits; append-only migrations; production
   human-gate) — each with its dom-truth row or doc anchor.

## 11. Day-11 — Lesson Experience v2 (pagination · StagedFigure · largeur composée)

Direction OWNER-DIRECTED (message Day 11). Contrat d'implémentation :
`docs/design/LESSON-EXPERIENCE-SPEC.md`. Statuts ci-dessous :
OWNER-DECIDED = dicté par le propriétaire ; FABLE-DECIDED /
OWNER-REVIEW-PENDING = choix d'implémentation, révisable.

| # | Décision | Statut |
|---|---|---|
| 11.1 | La revue M/W du Day-8 (laissée « no provisional adoption », §9) est CLOSE par supersession : M1 (cover-in-band) au masthead ; zone « à retenir » à droite (W3 adapté en `RetenirZone`, par-chapitre) ; notes de marge (esprit W1) en emplacements ≥1536px dans la même zone. w2 mort. | OWNER-DECIDED |
| 11.2 | Chapitre = section `## ` de lesson.md (≡ rungs pour 60/61 leçons) ; chapitre synthétique final « S'entraîner » quand des items existent ; LessonEnd reste la clôture du dernier chapitre. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.3 | URL de chapitre = `?chapitre=<n>` (1-based), PAS un segment de chemin : garde UNE page SSG, survit à l'impression linéaire ; pushState/popstate ; deep-link `#ancre` résolu vers son chapitre au montage. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.4 | Les chapitres non actifs RESTENT dans le DOM (`hidden`) — impression, SSG, ancres. Les étapes de StagedFigure n'y sont PAS (retrait réel de la chaîne SVG) — motif AttemptFirst. Deux mécanismes, délibérément différents. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.5 | Mouvement de chapitre : 300ms, ease `enter` (cubic-bezier(0,0,0.2,1)), slide 16px + fade, direction-aware, entrée seule ; nouveau token `--duration-view: 300ms`. Reduced-motion = échange instantané. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.6 | Règle de seuil figures : graphes TOUJOURS staged (axes → données → lecture) ; autres si ≥3 couches ET si l'ordre est un geste d'enseignement ; trivial = entier ; refus documenté légitime. Owner-overridable par ligne de ledger. | OWNER-DIRECTED (seuil), FABLE-DECIDED (critère « geste ») |
| 11.7 | `initialStage = min(occurrence, stages)` : les placements répétés (rlc-schema ×4, regimes-uc ×3…) partent pré-révélés à leur niveau historique — unifie et remplace l'allowlist `STEPPED_FIGURE_MAX_STEPS`. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.8 | StagedFigure reduced-motion = figure complète statique, contrôles masqués (précédent Derivation, pas MotionStage). Flèches clavier réservées aux chapitres ; les figures restent Tab+Enter (un geste, un propriétaire). | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.9 | Impression : chapitres dépliés par CSS print ; StagedFigure révélée complète via `beforeprint`/`afterprint` (le DOM reste propre jusqu'à l'impression réelle). | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.10 | « À retenir » : sidecar `retenir.json` par leçon (prioritaire) ; fallback = premier bloc `$$…$$` du chapitre ; sinon zone vide et silencieuse. rlc-serie porte l'exemplaire autoré. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.11 | probabilites-conditionnelles (seule leçon à `##` non-rung) se pagine sur ses `##` tels quels ; normalisation de contenu vers `## R<n>` inscrite `pending` à la table de migration. | FABLE-DECIDED / OWNER-REVIEW-PENDING |
| 11.12 | Dette notée : hack thème de shots.mjs (classList) conservé ce jour ; défauts adjacents du §6 de la spec consignés, non corrigés. | FABLE-DECIDED |
| 11.13 | **Le lien d'ancre profonde était mort — 86 % du corpus.** Vérification de l'item 2 (2026-09-04) : `location.hash` revient percent-encodé dès qu'un caractère sort de l'ASCII (`#r8--pour-tentraîner` → `#r8--pour-tentra%C3%AEner`), et le `getElementById` de `readChapterFromLocation` ne trouvait rien. La promesse 11.3 (« deep-link `#ancre` résolu vers son chapitre ») ne tenait donc que pour 314 des 2 190 titres de leçon. Corrigé par un `decodeURIComponent` gardé (repli sur la chaîne brute si la séquence est malformée : un fragment tapé à la main ne doit pas emporter la page). Porte dom-truth armée sur une ancre ACCENTUÉE — le cas qui cassait. | CORRECTIF |
| 11.14 | **Le « flash du chapitre 1 » a maintenant un chiffre.** L'arbitrage était écrit (SSG ne connaît pas la query string ; le premier peint est toujours le chapitre 1), sa DURÉE ne l'était pas. Mesurée sur cinq leçons témoins, du `goto` au bon chapitre actif : 250 ms (philo/la-verite), 250 ms (svt/genetique-humaine), 736 ms (pc/lois-de-newton), 937 ms (maths/probabilites-conditionnelles), **1 265 ms (maths/suites-numeriques)**. Un élève qui ouvre un lien partagé vers le chapitre 3 d'une grosse leçon lit donc le chapitre 1 pendant plus d'une seconde. | MESURE |
| 11.15 | **Ce qui n'a PAS été fait en 11.14, et pourquoi.** Un script d'amorçage en ligne, placé après les sections (comme `THEME_BOOT` l'est pour le thème), lirait `?chapitre=n` et déplierait la bonne section avant le premier peint. Non fait : le compteur « Chapitre 1 / 10 » est rendu par le serveur, et le corriger dans le même script serait une divergence de TEXTE entre le HTML serveur et le rendu d'hydratation — exactement la classe d'erreur (#418/#423/#425) documentée en tête de `ChapterShell.tsx`, dont la récupération re-rend tout l'arbre et efface la classe de thème. Sans le corriger, la page afficherait le bon chapitre sous un compteur faux : deux vérités à l'écran. L'arbitrage appartient au propriétaire ; le chiffre de 11.14 est là pour qu'il se décide sur un fait. | GATE PROPRIÉTAIRE |

### Table de migration des figures (état vivant — mise à jour au fil du sweep)

Census : 72 SVG statiques (50 pc, 22 maths) ; 34 graphes / 23 schémas /
15 diagrammes-autres ; 4 déjà groupés step-N (tous rlc-serie, dont 2
orphelins : energy-exchange, loi-mailles-build). La table détaillée
(done / pending / declined-with-reason, une ligne par figure) est tenue
en fin de cette section au fur et à mesure du fan-out Day-11.

**Clôture 2026-07-08 : le fan-out complet (Item 3, post-fable-work-order.md)
est terminé.** 65/72 figures staged, 7 déclinées avec raison documentée
(aucun refus par paresse — chaque décline nomme un critère du seuil §2.5).
SVT exclu de tout ce passage (gate propriétaire pré-existante, D10). Pilote
(`courbe-exponentielle`) et cas le plus délicat (`arbre-pondere`, 3
placements) traités personnellement avant le fan-out ; le reste par vagues
d'agents parallèles, un par leçon, `validate-content.mjs` vert à chaque
leçon, `dom-truth.mjs` (155 vérifs) sans régression après coup.

| # | Figure | Leçon | Statut | Détail |
|---|---|---|---|---|
| 1 | tangente-derivee | maths/derivabilite-etude-fonctions | ✅ staged (interactif) | pilote interactif 1 (vague antérieure) |
| 2 | aire-sous-courbe | maths/calcul-integral | ✅ staged (interactif) | pilote interactif 2 |
| 3 | racines-unite | maths/nombres-complexes-2 | ✅ staged (interactif) | pilote interactif 3 |
| 4 | suite-escalier | maths/suites-numeriques | ✅ staged (interactif) | pilote interactif 4 |
| 5 | asymptotes | maths/limites-continuite | ✅ staged (interactif) | pilote interactif 5 |
| 6 | rlc-schema | pc/rlc-serie | ✅ staged | legacy, déjà groupé avant Day-11 |
| 7 | regimes-uc | pc/rlc-serie | ✅ staged | legacy, déjà groupé avant Day-11 |
| 8 | courbe-exponentielle | maths/fonction-exponentielle | ✅ staged (3) | pilote mécanique de cette vague |
| 9 | arbre-pondere | maths/probabilites-conditionnelles | ✅ staged (3) | cas le plus délicat : 3 placements, initialStage 1/2/3 confirmé en rendu |
| 10 | energy-exchange | pc/rlc-serie | ⛔ declined | orphelin : aucun `[[figure:...]]` dans lesson.md, remplacé par energy-pendulum.motion.json |
| 11 | loi-mailles-build | pc/rlc-serie | ⛔ declined | orphelin : aucun `[[figure:...]]` dans lesson.md, remplacé par loi-des-mailles-build.motion.json |
| 12 | euclide-cascade | maths/arithmetique | ✅ staged (5) | schéma récursif : chaque ligne dérive de la précédente (geste réel) |
| 13 | aire-entre-courbes | maths/calcul-integral | ✅ staged (2) | graphe |
| 14 | arbre-denombrement | maths/denombrement | ✅ staged (3) | arbre de dénombrement, même famille qu'arbre-pondere |
| 15 | arrangement-combinaison | maths/denombrement | ✅ staged (3) | recompter → replier → appliquer |
| 16 | tableau-variations-courbe | maths/derivabilite-etude-fonctions | ✅ staged (3) | graphe + tableau |
| 17 | famille-solutions | maths/equations-differentielles | ✅ staged (3) | graphe (famille de courbes) |
| 18 | courbe-logarithme | maths/fonction-logarithme | ✅ staged (3) | graphe |
| 19 | plan-normal | maths/geometrie-espace | ✅ staged (3) | construction géométrique 3D |
| 20 | sphere-plan | maths/geometrie-espace | ✅ staged (3) | construction géométrique 3D |
| 21 | continuite-tvi | maths/limites-continuite | ✅ staged (3) | graphe (TVI) |
| 22 | module-argument | maths/nombres-complexes-1 | ✅ staged (3) | symétries dans le plan complexe |
| 23 | plan-complexe | maths/nombres-complexes-1 | ✅ staged (3) | construction plan complexe |
| 24 | rotation-complexe | maths/nombres-complexes-2 | ✅ staged (4) | construction géométrique (rotation) |
| 25 | table-groupe | maths/structures-algebriques | ✅ staged (3) | table de Cayley : neutre puis symétrique, ordre du texte R2 |
| 26 | convergence-limite | maths/suites-numeriques | ✅ staged (2) | graphe |
| 27 | conservation-em | pc/aspects-energetiques | ✅ staged (2) | graphe (diagramme d'énergie) |
| 28 | travail-poids-chemin | pc/aspects-energetiques | ⛔ declined | instantané de comparaison unique, dérivation déjà portée par la prose |
| 29 | niveaux-energie | pc/atome-mecanique-newton | ✅ staged (3) | schéma (niveaux quantiques) |
| 30 | spectre-raies | pc/atome-mecanique-newton | ✅ staged (3) | schéma (raies spectrales) |
| 31 | deflexion-magnetique | pc/chute-mouvements-plans | ✅ staged (3) | graphe (trajectoire) |
| 32 | trajectoire-parabolique | pc/chute-mouvements-plans | ✅ staged (3) | graphe (trajectoire) |
| 33 | effet-catalyseur | pc/controle-catalyse | ✅ staged (3) | graphe |
| 34 | facteurs-cinetiques | pc/controle-catalyse | ✅ staged (3) | graphe |
| 35 | decroissance-courbe | pc/decroissance-radioactive | ✅ staged (3) | graphe |
| 36 | tangente-tau | pc/decroissance-radioactive | ✅ staged (3) | graphe + tangente |
| 37 | i-etablissement | pc/dipole-rl | ✅ staged (3) | graphe |
| 38 | rl-schema | pc/dipole-rl | ⛔ declined | placement unique, une phrase, trivial → entier |
| 39 | cellule-electrolyse | pc/electrolyse | ✅ staged (4) | schéma (cause → conséquence forcée) |
| 40 | rendement-esterification | pc/esterification-hydrolyse | ✅ staged (2) | graphe |
| 41 | equilibre-concentrations | pc/etat-equilibre | ✅ staged (3) | graphe |
| 42 | quotient-vers-K | pc/etat-equilibre | ✅ staged (3) | graphe |
| 43 | critere-qr-k | pc/evolution-spontanee | ✅ staged (3) | schéma (droite graduée qualitative) |
| 44 | deux-chariots-inertie | pc/lois-de-newton | ✅ staged (3) | schéma (bilan de forces) |
| 45 | plan-incline-forces | pc/lois-de-newton | ✅ staged (4) | schéma (décomposition du poids) |
| 46 | courbe-aston | pc/noyaux-masse-energie | ✅ staged (3) | graphe (courbe d'Aston) |
| 47 | defaut-masse | pc/noyaux-masse-energie | ✅ staged (3) | schéma (avant/après, geste pile-Daniell) |
| 48 | bonne-surmodulation | pc/ondes-em-modulation | ✅ staged (3) | graphe |
| 49 | modulation-amplitude | pc/ondes-em-modulation | ✅ staged (2) | graphe |
| 50 | dephasage | pc/ondes-mecaniques-periodiques | ✅ staged (3) | graphe |
| 51 | double-periodicite | pc/ondes-mecaniques-periodiques | ✅ staged (3) | graphe |
| 52 | onde-propagation-retard | pc/ondes-mecaniques-progressives | ✅ staged (2) | graphe |
| 53 | transverse-longitudinal | pc/ondes-mecaniques-progressives | ⛔ declined | comparaison côte-à-côte, la vue simultanée EST le point |
| 54 | pile-daniell | pc/piles | ✅ staged (3) | schéma, exemple cité littéralement par la spec §2.5 |
| 55 | diffraction-fente | pc/propagation-onde-lumineuse | ✅ staged (4) | schéma (montage → prédiction → réel → mesure) |
| 56 | dispersion-prisme | pc/propagation-onde-lumineuse | ✅ staged (3) | schéma (montage → phénomène → conséquence) |
| 57 | uc-charge | pc/rc-charge | ✅ staged (3) | graphe |
| 58 | uc-decharge | pc/rc-charge | ✅ staged (3) | graphe |
| 59 | rc-schema | pc/rc-charge | ⛔ declined | placement unique, une phrase, trivial → entier (même famille que rl-schema) |
| 60 | diagramme-predominance | pc/reactions-acido-basiques | ✅ staged (3) | schéma (zones de prédominance) |
| 61 | zones-predominance-2 | pc/reactions-acido-basiques | ✅ staged (4) | schéma (deux pKa, chevauchement) |
| 62 | origin-i | pc/rlc-serie | ✅ staged (3) | schéma (origine i = dq/dt) |
| 63 | origin-uL | pc/rlc-serie | ✅ staged (3) | schéma (origine u_L = L·di/dt) |
| 64 | origin-uc | pc/rlc-serie | ✅ staged (4) | graphe (origine u_C = q/C) |
| 65 | moment-force | pc/rotation-axe-fixe | ✅ staged (4) | schéma (bilan de moments) |
| 66 | moment-inertie | pc/rotation-axe-fixe | ✅ staged (3) | schéma (tige vs haltère, comparaison chiffrée à l'échelle) |
| 67 | avancement-tangente | pc/suivi-temporel-vitesse | ✅ staged (3) | graphe |
| 68 | temps-demi-reaction | pc/suivi-temporel-vitesse | ✅ staged (3) | graphe |
| 69 | energie-oscillateur | pc/systemes-oscillants | ✅ staged (3) | graphe |
| 70 | pendule-elastique | pc/systemes-oscillants | ⛔ declined | figure composée 2-panneaux, trois états à voir ensemble ; déjà déclarée statique dans son propre en-tête (autorat D10) |
| 71 | avancement-limite | pc/transformations-deux-sens | ✅ staged (3) | graphe |
| 72 | lente-rapide | pc/transformations-lentes-rapides | ✅ staged (3) | graphe |

| 73 | montage-diffraction-ultrasons | pc/ondes-mecaniques-periodiques | ⛔ declined | schéma d'appareil, lu d'un coup (comme rl-schema / rc-schema) — refus écrit dans l'en-tête du SVG. AJOUTÉE À LA TABLE le 2026-09-04 : créée après le census Day-11, elle n'y figurait pas |
| 74 | balancoire-resonance | pc/systemes-oscillants | ⛔ declined | illustration d'ambiance, zéro texte, zéro nombre — refus écrit dans l'en-tête, citant 11.6. AJOUTÉE À LA TABLE le 2026-09-04, même raison |

**Bilan : 65 staged, 9 declined (raison documentée), 0 pending.** SVT :
non touché, hors census (gate D10 pré-existante, confirmée non levée).

**RE-MESURE DU 2026-09-04, sur le corpus entier (258 SVG statiques, pas les
72 du census) :** 238 staged, 20 non staged — et **les vingt portent un refus
ÉCRIT dans leur propre en-tête**, vérifié fichier par fichier (12 SVT, 7 pc,
1 philo). Le fan-out n'a pas 70 figures de retard comme le disait l'ordre de
travail : il est terminé, et ce qui restait à faire était de le CONSTATER.


## 12. Extension — la chasse adversariale (2026-07-06, post-ADR-0026)

Nouvel instrument `web/scripts/hunt.mjs` : toutes routes × 5 viewports
(390/768/1280/1536/1920) × 2 thèmes RÉELS × print/reduced-motion/params
hostiles/clavier/persistance/embed-bloqué. dom-truth 121 → **129**.

- **P0 mobile (corrigé + gardé)** : les 10 débordements à 390px avaient UNE
  cause — le `h1` du masthead (un mot français long à 3.5rem dépasse 390px ;
  pire cas 169px, SVT). Fix : `clamp()` fluide + césure fr. sous 600px +
  contention tableaux/formules-inline. Garde F9 (balayage 390px, 7 routes
  condamnées + témoins). Bible §1 « adapts down gracefully » : VÉRIFIÉ.
- **P1 KaTeX-YAML (corrigé + gardé)** : `\approx` à simple backslash dans
  une chaîne YAML double-quotée → escape mangé → `.katex-error « R pprox 0 »`.
  Garde double : classe author-time (validate-content) + backstop rendu (F8).
- **Contenu (flag-only, owner-gated)** : 3 critiques, chaque nombre des 61
  leçons recalculé. 2 P1 (He⁺ v=3,1e6→4,4e6 CONFIRMÉ ; Hardy-Weinberg
  4 vs 5 conditions), 2 P2, 3 P3 → `docs/audits/hunt-flags-2026-07.md`.
  1 faux positif écarté par vérité rendue (`P(B\|A)` rend juste). Corpus
  autrement sain (chaîne nucléaire, Bayes, Mendel, philo — exacts).
- **Passes confirmés par la chasse** (non-régressions prouvées, pas
  supposées) : print déplie les chapitres + masque les contrôles ; params
  `?chapitre=0/99/abc/-3` clampés à 1 chapitre visible ; reduced-motion =
  StagedFigure complète sans contrôles ; anneaux de focus partout au Tab ;
  StagedFigure opérable au clavier ; la page survit à PhET injoignable ;
  thème persistant à la navigation.

## 13. Extension — le hunt de correctness du contenu (2026-07-06)

Passe profonde : 6 auditeurs `general-purpose` parallèles (Python, recalcul
×2), ~350 exemples travaillés sur les 61 leçons. Docket owner-gated :
`docs/audits/content-correctness-docket-2026-07.md`.
- **0 P0** — aucune valeur/loi fausse sur un chemin correct. **50/61 leçons
  entièrement propres** (les 11 de philo incluses, citations vérifiées).
- 2 P1 (He⁺ v/T facteur-2, CONFIRMÉ 3× indépendamment ; anneau non-unitaire
  cadre+incohérence), 2 P2 (compte HW « quatre » vs 5 puces — **corrige** le
  flag B1 « panmixie omise », fausse lecture ; pH trypsine), 13 P3.
- 1 faux positif re-écarté par vérité rendue (`P(B\|A)`).
- **Aucun fix ce passage** : tout est substantiel → docket, jamais corrigé
  en silence (le propriétaire est la porte de correctness). Le garde de la
  classe « correction numérique » est le sweep d'auditeurs (process), pas
  dom-truth (129, inchangé — aucun code touché). Docket = session de
  décision proprio → nettoyage Sonnet gaté.

## 14. Extension — l'arc persistance (2026-07-07) : décisions

Specs : LEARNER-MODEL-SPEC, AUTH-SPEC. Brouillons : docs/drafts/migrations/
048-050. Tout FABLE-DECIDED / OWNER-REVIEW-PENDING sauf mention.

| # | Décision | Raison courte |
|---|---|---|
| 14.1 | v1 clé NOTION par chaînes TEXT (précédent 043) ; user_misconception_states (skills) INTACTE, jumelle notion séparée | le contenu est la vérité filesystem ; pas de registre dupliqué ; zéro migration de données |
| 14.2 | `cleared_at` (pas `resolved_at`) sur la jumelle | le nom suit le contrat de lecture Cleared |
| 14.3 | Clearing v1 = 2 succès distincts post-exhibition sans ré-exhibition | symétrique du plancher ≥2 ; 1 = chance, 3 = décourageant |
| 14.4 | « lu » RÉGRESSE à « entamé » si le contenu grandit | honest-state : l'état dit ce qui est vrai maintenant |
| 14.5 | « à revoir » = lu ET >21 jours | mi-trimestre de révision ; PAS une courbe d'oubli prétendue — assumé et dit |
| 14.6 | Ordre reco : misconception-active > reprise > révision > parcours | la faute active est le signal le plus actionnable d'un tuteur |
| 14.7 | Retour espacé v2 (intervalles adaptatifs) DIFFÉRÉ | sans données réelles d'oubli, des intervalles inventés = pseudo-science |
| 14.8 | « maîtrisé » reste BANNI même à données riches | le mot promet plus que le modèle ne sait |
| 14.9 | Auth : email+mdp socle, Google rapide, PAS de SMS-OTP ni magic-link seul | coût SMS + numéro sensible (mineurs) ; friction mail lycéen ; pas de verrouillage Google |
| 14.10 | Confirmation e-mail DÉSACTIVÉE en v1 | friction > risque sur produit gratuit ; à réévaluer si abus |
| 14.11 | @supabase/ssr cookies + middleware scoppé /moi et /connexion SEULEMENT | le site reste SSG ; l'accueil s'hydrate côté client |
| 14.12 | Leçons publiques ; /moi authentifié ; écritures service_role-only via RPC | bible (partageable) + règle 047 |
| 14.13 | Preview → STAGING (jamais prod), gated par la fermeture 050 + session de sync | preview→prod écrirait des comptes réels en prod : violation RULES §0 |
| 14.14 | Modes off/mock/live ; dépendance @supabase n'entre qu'avec live | pas de dépendance dormante ; le build de session = mock |

## 15. Extension — l'arc persistance (2026-07-07) : le build sans persistance

Livrable 4 : UI auth (modes off/mock/live, AUTH-SPEC §3/§5) + tableau de
bord état-zéro (DASHBOARD-SPEC §1/§3/§4). Vérifié rendu : dom-truth passe
de 129 à 143 contrôles, 0 échec — dont la nouvelle batterie D12 (carte
session « Commence ici », jamais « continuer » sans état ; NextUp
`data-reco-source="parcours"` ; lexique interdit /%\|maîtrisé\|streak\|XP\|
points/i ; /connexion fermée sans formulaire en off ; en-tête sans
affordance auth en off) et le sweep arithmétique §5 (UN SEUL
`[data-primary-action]` ; jetons `[data-mastery-token]` == notions sur
disque, dénominateur filesystem = 61 aujourd'hui, jamais codé en dur).
Évidence : `web/shots/d12/report/` (7 captures, deux thèmes).

Notes de vérification :

- **L'appel interprétatif §4/§5 (ordre de lecture au palier 1536) est
  CONFORME** : la spec définit elle-même l'invariant comme « ordre DOM
  stable, colonnes par grid » — c'est ce qui est construit (capture
  1536 : rail matières fin à gauche, carte session dominante au centre,
  maîtrise à droite) ; la carte session reste l'élément focal sans
  ambiguïté.
- **Deux instruments corrigés en passant** : la garde honest-state de
  l'accueil porte une exception nommée pour « Ensuite dans le parcours »
  (la formulation §3 exacte — tout autre « Ensuite » reste interdit) ; et
  le runner notText reconstruisait les regex EN PERDANT leurs flags — le
  /i du lexique interdit aurait été silencieusement désarmé (corrigé :
  flags préservés).
- **Verrue connue, mode mock seulement** : sur les pages en largeur
  « content » (/connexion, notions), le lien « Se connecter » ajouté à
  l'en-tête déborde la colonne et l'en-tête passe à la ligne (capture
  connexion-mock-light). Le build par défaut (off) est byte-identique —
  rien ne change sur la preview. À traiter avec le câblage live
  (AUTH-SPEC §4) : traitement compact de l'affordance auth sous largeur
  content, PAS un hot-fix du spine.
- Les trois rangées D9 « Tes matières » de dom-truth sont retirées AVEC
  la surface qu'elles gardaient (remplacée par le dashboard composé) ;
  Dashboard.tsx / SubjectCard.tsx restent en source, non référencés —
  suppression = décision propriétaire (ils portent le choix filière
  inline).

## 16. Extension — la couche média SVT + philo, gel du modèle (2026-07-07)

Contexte : D10 avait explicitement exclu SVT (`docs/audits/d10-media-layer.md:4-6`
— sécurité du modèle Fable 5 sur du contenu biologique). La session bascule sur
un autre modèle (Sonnet 5) et le propriétaire demande explicitement de
continuer à illustrer toutes les leçons — la condition d'attente documentée
(« attend une session non-Fable ») est remplie ; traité comme l'autorisation
explicite requise, pas une décision silencieuse.

**Bug trouvé en vérifiant le pilote, corrigé et gardé en permanence** :
atterrir directement sur `?chapitre=N` (N>1) provoquait un vrai mismatch
d'hydratation React (erreurs #418/#423/#425 — `ChapterShell` lisait
`window.location` DANS l'initialiseur `useState`, donc le rendu serveur et le
rendu d'hydratation client calculaient des `current` différents, une valeur
qui atterrit dans du texte visible). La récupération de React après un
mismatch est un re-rendu complet, qui effaçait aussi la classe `.dark` posée
par le script de démarrage sur `<html>` — un symptôme qui n'avait presque rien
à voir avec sa cause réelle. Corrigé à la source
(`web/src/components/notion/ChapterShell.tsx` : `current` démarre TOUJOURS à
0, la vraie valeur est résolue depuis l'URL dans un effet post-hydratation) ;
`web/scripts/dom-truth.mjs` porte désormais un sweep permanent (« deep-linked
chapter + dark theme ») qui aurait détecté cette classe de bug — 129 → 144
contrôles.

**Couche média SVT — pilote + fan-out parallèle** (diagram-author, un agent
par leçon, contrat D10 repris verbatim) :
- Pilote : `transmission-caracteres/disjonction-alleles.svg` — disjonction des
  allèles en méiose, cible directement l'erreur R3 (« un hétérozygote au
  phénotype dominant ne transmet pas QUE l'allèle dominant »). Vérifié
  build+dom-truth+screenshots clair/sombre avant tout fan-out.
- **Fan-out : 10/10 lessons, 11/11 aucun refus** — chaque leçon SVT porte
  désormais au moins une figure ciblant une erreur classique nommée dans
  son propre texte (12 figures au total, `moyens-de-defense` en porte deux) :

  | Leçon | Slug(s) | Cible |
  |---|---|---|
  | dysfonctionnements-immunitaires | `sensibilisation-reaction-allergie` | 1er contact sensibilise sans symptôme ; seul un contact ultérieur pontant deux IgE déclenche |
  | moyens-de-defense | `cascade-inflammatoire`, `reponse-humorale-cellulaire` | même cascade quelle que soit la cause ; LB/LT jamais confondus, seul LTc détruit par contact direct |
  | genetique-populations | `comptage-alleles` | fréquence génotypique ≠ fréquence allélique (hétérozygote compte 1 dans chaque camp) |
  | genetique-humaine | `pedigree-drepanocytose` | arbre généalogique : distinguer déduction certaine vs. probable |
  | role-enzymes | `cycle-enzyme-substrat` | l'enzyme n'est jamais consommée (site actif identique aux 4 étapes) |
  | soi-non-soi | `cmh-abo-independants` | ABO-compatible ≠ CMH-compatible |
  | liberation-energie-matiere-organique | `respiration-fermentation` | la fermentation produit encore de l'ATP (jamais zéro) |
  | chaines-de-montagnes | `plis-chevauchement` | l'inversion d'âge sur une coupe prouve un charriage |
  | theorie-tectonique-plaques | `expansion-oceanique` | le plancher se crée en continu, ne glisse pas sur un fond fixe |
  | granitisation-deformation | `granite-texture-grenue` | le granite ne se forme jamais en surface |

  Vérifié : `validate-content` (0 échec, 10 dirs) + grep anti-contrat (0
  hex/`currentColor`/`foreignObject` sur les 12 SVG) + build + dom-truth
  (144/0) + captures clair/sombre (`web/shots/persistance-wave/report/`).

**Philosophie — AUCUNE figure, décision documentée (pas un oubli)** : les 11
leçons suivent toutes la même anatomie (R0 accroche → philosophes en séquence
dialectique → méthode de dissertation) — argumentation pure, aucune structure
ni processus diagrammable. Forcer un schéma décoratif (frise de philosophes,
carte conceptuelle fictive) violerait le précédent D10 (« une figure qui ne
sert pas la pédagogie n'est pas créée ») et risquerait l'écueil du théâtre
d'engagement. Refus honnête sur les 11, pas un gap.

## 17. Extension — le tableau de bord replié (retour propriétaire, 2026-07-07)

Retour direct : « faut-il vraiment tout montrer sur l'accueil, vu que les
couvertures portent le même logo ? Peut-être les regrouper avec un menu qui
se déplie. » Vérifié : `Cover.tsx` résout un motif **par matière** (5 formes),
pas par notion — seules `rlc-serie` et `rc-charge` ont un motif propre. À 61
notions, l'étagère « Disponible maintenant » répétait donc la même poignée
d'illustrations des dizaines de fois, à plat.

**Fait** : `AvailableShelf.tsx` (nouveau fichier, extrait de page.tsx) — un
`Accordion.Item` Radix par matière, REPLIÉ par défaut (premier vrai usage de
`@radix-ui/react-accordion`, dépendance jusque-là inutilisée). Le déclencheur
porte le motif en aperçu + le libellé + le compte réel ; déplier révèle la
grille de couvertures inchangée. `Presence` de Radix DÉMONTE le contenu fermé
(pas juste `display:none`) — le coût DOM des 59 couvertures répétées n'existe
qu'une fois une matière vraiment ouverte. Reveal calme en hauteur
(`.shelf-accordion-content`, @keyframes, pas de bounce), `prefers-reduced-
motion` respecté.

**Effet de bord trouvé en vérifiant (test du regard, bible §10)** : l'étagère
courte a révélé un vide de ~1000px dans la colonne gauche au palier 1280 — la
grille CSS étire la ligne "primary/mastery" à la hauteur de `MasteryMap`
(61 liens à plat), bien plus haute que la carte de session. Corrigé en
bornant `MasteryMap` (`.mastery-map-scroll`, ≥1280px seulement — sous ce
palier tout défile en une colonne) : hauteur max 640px + défilement interne +
un DÉGRADÉ bas (`mask-image`) signalant « plus de contenu » (les défileurs
overlay du système sont invisibles au repos sur la plupart des configurations
— mesuré aussi en Chromium headless). Répond au même retour d'un second
angle : la carte de maîtrise montrait AUSSI « tout », sans logo cette fois
mais avec la même sensation de trop-plein.

Hauteur totale de la page d'accueil (desktop, 1280px) : **3756px → 2072px**
(-45 %). Vérifié : dom-truth 143/0 (2 contrôles retargetés sur le
déclencheur au repos — texte inchangé, ils ne testaient qu'un sélecteur
devenu invalide — et 2 anciens contrôles présence-de-couverture déplacés
dans un nouveau SWEEP interactif qui ouvre Physique-Chimie et confirme
`rlc-serie` + le motif propre de `rc-charge`, absents avant / présents
après). Aucune règle enfreinte : ordre DOM inchangé (aucun `order` CSS,
aucune leçon réordonnée), `[data-mastery-token]` toujours == notions sur
disque (61) que le filtre soit actif ou non.

---

## 2026-08-22 — Les quatre arbitrages de fin-R6, tranchés sur mandat

Owner (2026-08-22) : « Continue. Don't stop for anything for my approval…
attack everything: UI, content, header ». Les quatre points owner-gatés de
l'audit fin-R6 sont tranchés en jugement, statut FABLE-DECIDED, réversibles
à son retour :

1. **Header — MenuAffichage « Aa » (EXÉCUTÉ).** A−/A/A+ et thème regroupés
   derrière un déclencheur unique : 8 → 6 cibles permanentes (charge-calme
   servie), réglages à UN clic avec cibles 48 px inchangées (a11y servie).
   Global — le header garde un seul gabarit sur toutes les routes (§3.4).
   dom-truth retargeté : présence du déclencheur + round-trip thème PAR le
   menu (le vrai chemin de l'élève).
2. **NextUp « Ensuite dans le parcours » — CONSERVÉ tel quel.** Le critic
   visuel voulait l'agrandir, le critic calme le retirer : contradiction
   frontale = la forme actuelle (une ligne calme, périphérie fonctionnelle
   §8) est précisément le point d'équilibre. Aucun changement.
3. **Stagger du panneau Notions — CONSERVÉ.** Sanctionné par le plan R4,
   déclenché uniquement par le geste de l'élève, 120 ms de traîne,
   neutralisé par prefers-reduced-motion. La règle « pas d'animation au
   chargement » reste intacte — ceci n'en est pas une.
4. **Bancs /options — PURGE PARTIELLE (EXÉCUTÉE).** Supprimés : masthead
   a1-a3 (a3 acté depuis le verdict V1), home b1-b3 (accueil ProgrammeMap
   les a remplacés), end c1-c2 (option C actée au footer) + les SIX
   composants dashboard orphelins (Dashboard, MasteryMap, AvailableShelf,
   SubjectProgress, SubjectCard, MilestoneSlot — 0 consommateur).
   CONSERVÉ : /options/wide (W1/W3, décision Set-W réellement pendante).
   La plomberie mastheadVariant de NotionPageView reste (code mort typé,
   marqué CANDIDAT AU RETRAIT — chirurgie dédiée, pas en passant).

SM 2018 (banque depuis source retypée) : la porte n'est PAS contournée —
le mandat couvre les décisions, pas la fidélité du contenu. Traitement au
lot suivant : sourcer le scan officiel (element/65508) et vérifier, puis
convertir ; sinon la porte reste.
