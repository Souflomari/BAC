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
