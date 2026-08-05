# Page-anatomy component specs

> **Authority:** DESIGN-BIBLE §11–§13 (Day-4 amendments). **Audience: a model
> with NO session context** (Sonnet 5 cold) building or maintaining these
> components after 2026-07-07. Every spec states: purpose, anatomy, tokens,
> invariants (what dom-truth asserts), and the swap points (what the owner may
> still override — marked OWNER-REVIEW-PENDING in
> `docs/audits/fable-day3-ledger.md`).
>
> Ground rules that apply to ALL components here: consume tokens only (no raw
> hex/px outside the token set); any new custom Tailwind key must be
> registered in `web/src/lib/utils.ts` classGroups in the same commit (U1
> rule); every interactive element carries `.state-layer` + `.focus-ring`
> with a host-matched `--focus-radius` (COMPONENT-STATES.md §0.4);
> **wayfinding and title text never ellipsizes — wrap** (Day-3 rail rule,
> generalized Day 7: a truncated title hides exactly the words a student
> navigates by); verify with `npm run build && npm run dom-truth` — green
> before shots, shots before claims (DESIGN-BIBLE §13).

---

## PageShell — the spine (`web/src/components/ui/PageShell.tsx`)

**Purpose.** The one place a page's width is decided; the structural guarantee
that header, main, and footer share a left edge (DESIGN-BIBLE §11).

**Anatomy.** `<div min-h-screen flex-col>` → `SiteHeader container={spine}` →
`<main id="main-content" className={spine + "py-12 md:py-16 flex-1"}>` →
`SiteFooter container={spine}`. The spine class is
`"w-full mx-auto px-4 bp-medium:px-6 bp-expanded:px-8" + maxWidthClass`,
where `maxWidthClass` comes from the `width` prop
(reading 65ch / content 72ch / wide 90ch / notion 1140px / page 1280px).

**Invariants (dom-truth).** `spine: header aligns with main` and
`spine: footer aligns with main` — left edges within 0.5px AND equal
`padding-left`. Footer present on every page.

**Rules.** Never hand a page its own container; never bypass PageShell
(exception: temporary `/options/*` mock routes, which reproduce the spine
constant and are deleted after owner review). No page-entry animation in
`<main>` — mount animations are autoplay (calm core, ADR 0024).

## Masthead band (in `web/src/components/notion/NotionPageView.tsx`)

**Purpose.** The lesson surface's front door and its ONE display moment
(DESIGN-BIBLE §3 display tier + §11). [Set A = A3; OWNER-REVIEW-PENDING.]

**Anatomy.** Above the notion grid, inside PageShell:
`<div data-band="masthead">` with
`-mt-12 md:-mt-16 mb-12 py-12` (pulls up to the header, 48px vertical padding),
full-bleed via `mx-[calc(50%-50vw)] px-[calc(50vw-50%)]` (breaks to viewport
edges, content stays on the spine), `bg-[var(--color-surface-container-low)]`,
`border-b border-[var(--color-border-subtle)]`. Inside, on the spine:
breadcrumb nav → `<h1 font-serif font-bold text-display-lg max-w-[26ch]>` →
metadata line (`mt-4 text-body-sm` secondary: level chip · `N min de lecture`
· `mis à jour <mois année>` — computed facts only, from
`NotionMeta.readingMinutes/updatedAt` in `web/src/lib/content.ts`).

**Invariants.** `[data-band='masthead']` present with background ==
`var(--color-surface-container-low)`; h1 computed 56px/1.06/700/serif;
metadata line present at body-sm. No eyebrow in the masthead (doubled-label
rule — the breadcrumb already names the subject).

**Swap points.** The variant prop (`mastheadVariant`, default `"a3"`) keeps
a1 (30px control) and a2 (44px) renderable at `/options/masthead/*` until the
owner's laptop review; override = change the default. After sign-off: inline
the winner, delete the prop + `/options` tree + this paragraph.

**Wide-tier composition (Day-8 — OWNER PICKS PENDING).** At ≥1536px the
band's flanks and the content column's right margin need holders (bible §4
composed-space test; measured at 1920: band 38.3% occupied, 422px void per
flank, 528px right of prose). Candidates render at `/options/wide/[v]`
(`wideOption` prop on NotionPageView): Set M = m1 cover-in-band (COVER-SPEC
tie-in promoted to presence) / m2 bounded band / m3 motif watermark; Set W =
w1 margin notes (`MarginNotes`, needs an authored channel if picked) / w2
`notionWide` PageShell width + earned full-bleed / w3 key-formula rail
(`KeyFormulaRail`, needs an authored formula field if picked). On pick:
inline the winner, spec it here, add its dom-truth wide-tier assertions,
delete the losing candidates + this paragraph's candidate list.

## SiteFooter — quiet colophon (`web/src/components/ui/SiteFooter.tsx`)

**Purpose.** Every page ends (DESIGN-BIBLE §11). [Set C = C1;
OWNER-REVIEW-PENDING.]

**Anatomy.** `<footer mt-24 border-t subtle>` → spine container `py-10` →
row 1: identity line ("**BAC** · sciences — préparer le bac marocain,
calmement.") + nav with ONE link (Notions); row 2 (`mt-4`, caption):
"© <year> — contenu aligné sur le cadre de référence national." followed by
the **build stamp** (`[data-build-stamp]`, Day-8.5): "· v. <short-sha> ·
<yyyy-mm-dd>", injected at build time via `next.config.mjs`
(VERCEL_GIT_COMMIT_SHA on Vercel, `git rev-parse` locally, "inconnu" if
neither). It answers "which version am I looking at?" — the question
behind two deployment-truth incidents. dom-truth asserts presence AND
SHA-matches-HEAD (a mismatch = stale build).

**Invariants.** Footer present on every surface; contains "cadre de
référence"; inner container on the spine. NO engagement mechanics, no link
farms, no second accent — the lesson's next-step moment is LessonEnd, not the
footer.

**Swap points.** C2 (three-column colophon) remains at `/options/end/c2`; if
the owner overrides, port C2's column grid into this component — the spine
container and the invariants stay.

## LessonEnd — session-close handoff (`web/src/components/notion/LessonEnd.tsx`)

**Purpose.** Bible §8's session-close moment on the lesson surface (the Set-C
decision refiled C2's handoff here). One clear next recommendation, quiet
register.

**Anatomy (tightened Day 7 — the portability test hit every ambiguity in
the previous wording).** `<aside data-lesson-end aria-label="Et maintenant"
class="notion-prose mt-20 pt-8 border-t subtle">` — the aside IS
measure-capped (`.notion-prose`, same reading column as the prose above;
the close is the column's last word, not a full-width band — bible §10).
Inside, in this exact order:

1. Caps-caption label "Et maintenant" — the shared `Eyebrow` component
   (`tone="muted" decorative` — the aside's aria-label already names the
   region; don't announce twice).
2. ONE recommendation row (`mt-4` under the label), rendered only when
   `next` is non-null: a plain `state-layer` link row (`-mx-6 px-6 py-6
   rounded-xl`, focus-radius 16) — caption context line "Changer de
   matière — <subject display label>" ABOVE the serif h3 title (the house
   eyebrow-then-title grammar, as on the session card; the caption is
   PLAIN session-card-style caption text, NOT a second `Eyebrow` instance
   — two hairline-caption motifs in one aside is instrumentation
   doubling); the title is a SPAN at the h3 type scale (`font-serif
   text-h3 font-semibold`, `mt-2` under the caption), not a semantic
   `<h3>` — link-embedded titles are not document headings (library-card
   convention); accent `arrow-right` icon (20px) right-aligned. Subject
   labels and the href come from `web/src/lib/subjects.ts` (the ONE home
   of the subject map — do not re-declare it locally). Hover cue: title
   colors to accent (the library-card cue); the arrow stays static. NOT
   a filled button (the surface's one `btn-primary` belongs to the
   embed); NOT a boxed card (§11 section-rhythm reserves panels for
   stateful content — the C2 option-set mock's boxed band was
   deliberately dropped in the refile, this is the reconciliation the
   spec previously left unstated). Titles WRAP, never ellipsize
   (wayfinding words are never truncated — house rule, see ground rules).
3. Quiet "Retour aux notions" link to `/` (`mt-6`) — always present,
   including when `next` is null (the null case renders label + return
   link only, no substitute content, no apology copy). Style: the
   SiteFooter quiet-nav-link recipe, focus-radius 8.

**Data contract (HONEST-STATE RULE).** `next: NotionMeta | null`, computed
deterministically by the caller (today: most recently updated OTHER notion —
interleaving). Never fabricate ordering or student state. When per-student
state lands (production-lane, human-gated), the same slot renders the
personalized next step; markup contract unchanged.

**Invariants.** `[data-lesson-end]` present on lesson surfaces with content;
contains "Et maintenant"; no `role=progressbar` unless real state exists.

## Home session element (in `web/src/app/page.tsx` + `web/src/lib/session.ts`)

**Purpose.** The home surface's PRIMARY element (guided-primary, VISION;
bible §11 primary-element table). [Set B = B1; OWNER-REVIEW-PENDING.]

**Data contract.** `getTodaySession(): SessionState | null` where
`SessionState = start(notion, reason) | resume(notion, position, step,
totalSteps)`. **`resume` requires real persisted state and is NEVER
constructed today** — the honest first-visit `start` state (most recently
updated notion) is the shipped design, not a placeholder.

**Anatomy (Day-6 revision — covers landed).** Card
(`bg-surface-container-high shadow-elevation-2 rounded-xl overflow-hidden`,
`bp-medium:grid-cols-[1fr_240px]`): left cell `px-8 py-8` (32px) with caps
eyebrow "Aujourd'hui · <subject>" → serif h2 title → truthful line (start:
"Nouvelle notion — on la prend depuis le début (≈ N min de lecture)." /
resume: position + fraction) → progress bar ONLY in resume → `btn-primary`
("Commencer la session" / "Reprendre la session"); right cell (hidden on
compact): the suggested notion's `Cover` as an absolute-fill side panel
(art only — the session copy leads; COVER-SPEC placement rules). Below: the
library as a COVER SHELF (per subject: caps label + 2-up grid at bp-medium of
cover cards — `aspect-[8/5]` Cover on `surface-raised shadow-elevation-1`,
hover elevation-2, serif lead title + real reading minutes below the art; NO
state words without real state).

**Invariants (dom-truth).** Session h2 at text-h2 serif; card p-8;
`btn-primary` with "Commencer" present; **honest-state guard**: home contains
none of /en cours|Reprendre|vu récemment|Ensuite/ and no `[role=progressbar]`
until persistence exists (when it does, update the guard to assert the
opposite from real state — the guard encodes the CURRENT truth, not a
permanent ban).
