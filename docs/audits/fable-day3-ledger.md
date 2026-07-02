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
