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
`web/shots/day8-wide/measurements.json` + before-shots):**

| Region (owner's circle) | Measured |
|---|---|
| Band occupancy | title block 1076×209 in a 1920×306 full-bleed plane = **38.3%** |
| Band flank voids | **422px each side** inside the band |
| Left gutter | 390px to container; rail at 422px |
| Right of content / of prose | **422px / 528px** |
| Home at 1920 | main = **691px wide** (max-w-content); **614px dead gutter per side**; the page reads as a ribbon |
| 404 at 1920 | centered utility block; voids symmetric (acceptable under §4's balanced clause — held, not dead; no fix needed) |

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
