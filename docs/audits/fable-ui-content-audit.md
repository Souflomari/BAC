# Fable 5 diagnostic audit — UI and content quality

**Date:** 2026-07-01 · **Auditor:** Fable 5 (available until 2026-07-07) ·
**Scope:** the RLC chapter work on branch `claude/vibrant-fermi-v1lxj5` — app in
`web/`, content in `content/pc/rlc-serie/`, rendered screens verified on a local
production build (`next start`) with computed-style measurement, plus the full
screenshot matrix in `web/shots/site/` and `web/shots/r1/`.

**Mandate:** diagnose why the UI "feels like AI slop — an app projected on a
website, not Google/Apple grade" and why the content, while improving, is short
of VISION.md's tutoring-grade standard. Diagnosis only — no fixes in this
document. Every finding is split **[ENCODABLE]** (tokens, specs, rules,
checklists that survive Fable's departure) vs **[TASTE]** (judgment Fable must
exercise this week and then encode the *result* of).

**How to read this if you are Opus/Sonnet 4.8:** every claim carries file:line
or measured evidence. Where a finding says MEASURED, it came from computed
styles in the live DOM, not from reading class names — that distinction is
itself finding #7.

---

## 1. UI root-cause diagnosis

### Finding U1 — The rendered type hierarchy does not exist (the single biggest cause of "slop")

**Severity: CRITICAL. Root cause: a silent runtime bug, not a design decision.**

`cn()` (`web/src/lib/utils.ts:8-10`) is `clsx` + `twMerge` with tailwind-merge's
**default config**. The project's type scale uses custom fontSize keys
(`text-h1`, `text-display`, `text-body-lg`, `text-caption`, … —
`web/tailwind.config.ts:98-110`). Default tailwind-merge does not know these
keys, misclassifies them into the *text-color* group, and when any
`text-[var(--color-…)]` or named text color follows in the same `cn()` call, it
**silently deletes the size class**. Tailwind's preflight then applies
`font-size: inherit` → the element renders at body size.

**MEASURED (live DOM, production build, 1280px viewport):**

| Element | Designed | Renders | Evidence (class source) |
|---|---|---|---|
| Notion masthead h1 | 30px (`text-h1`) | **16px** | `web/src/app/notions/[subject]/[slug]/page.tsx:200` |
| Home h1 "Notions" | 36px (`text-display`) | **16px** | `web/src/app/page.tsx:154` |
| Home lead | 18px (`text-lead`) | **16px** | `web/src/app/page.tsx:161` |
| Home section h2 ("Mathématiques") | 20px (`text-h3`) | **16px** | `web/src/app/page.tsx:183` |
| Home card title h3 | 18px (`text-h4`) | **16px** | `web/src/app/page.tsx:104` |
| 404 hero "404" | 36px (`text-display`) | **16px** | `web/src/app/not-found.tsx:23` |
| 404 h1 | 24px (`text-h2`) | **16px** | `web/src/app/not-found.tsx:33` |
| Prose h2 (plain CSS, no cn) | 22px | 22px ✓ | `globals.css:486` |
| ItemsSection h2 (raw className, no cn) | 24px | 24px ✓ | `ItemsSection.tsx:65` |

**On the home page every text element renders at exactly 16px** — h1, lead,
section headings, card titles — differing only in weight. That page IS a
wireframe, mechanically. The masthead title of the notion page (16px) renders
*smaller than the section headings under it* (22px) — the page's own title is
typographically subordinate to its children.

The same mechanism hits, unmeasured but code-verified (custom `text-<size>` +
`text-[var(--color…)]`/`text-accent` inside one `cn()`): both `Eyebrow` tones
(`Eyebrow.tsx:38-41` — caption 12px → 16px), MCQ/checkpoint stems
(`McqItem.tsx:97`, `CheckpointItem.tsx:93` — 17px → 16px), motion step
indicators and captions (`MotionStage.tsx:505,544`, `MotionDiagram.tsx:221,258,272`,
`MediaDiagram.tsx:174,253`), the card "Ouvrir" row (`page.tsx:120`), solution
`<summary>` (`McqItem.tsx:144,162`), embed captions (`EmbedPanel.tsx:271,290`),
items intro (`ItemsSection.tsx:51`). Raw `className="…"` strings are unaffected
(no merge runs); that is why the lesson prose column looks composed while the
chrome around it looks undesigned.

**Why five self-audit rounds missed it:** the Google-audit auditors verified
class names in source, token values in config, and tracking ratios in
`TOKENS.md` — and scored Typography 19/20 (`docs/design/AUDIT-SCORECARD.md`) —
describing a hierarchy that never rendered. Nobody measured a computed style.
See Finding U7.

**Failure-mode mapping:** this is the mechanical core of *typography without
hierarchy* and amplifies *no spatial conviction* and *default-component smell*
everywhere. The DESIGN-BIBLE **covers** the type scale and was **not ignored**
— it was silently destroyed at runtime. [ENCODABLE: fix = `extendTailwindMerge`
with the custom classGroups; guard = a rendered-DOM regression test asserting
computed sizes for a battery of elements. No taste required.]

### Finding U2 — Even as designed, the scale has no drama (and the bible forbids acquiring any)

**Severity: HIGH. Root cause: DESIGN-BIBLE gap (actively suppressed).**

The designed ceiling is 36px (`display`, `tailwind.config.ts:109`) used exactly
twice (home h1, 404). The masthead of a 5,000-word lesson is designed at 30px —
Stripe docs, material.io, web.dev, Apple docs run lesson/article mastheads at
40–64px with a distinct display voice. The bible's §3 explicitly rules drama
out: *"Hierarchy through scale and weight, not decoration. Two weights …
Restraint in type is part of the calm"* (`DESIGN-BIBLE.md:194-197`) and its
named scale tops at "lead" (`:177-180`). Faithfully followed, the bible
produces a disciplined, compressed, mute hierarchy — restraint executed as
absence. A "Google-great" page has *one* loud, confident typographic moment
per surface; the system as specified cannot produce one.
[TASTE — Fable must pick the display scale top end and where display moments
are permitted, this week → then ENCODABLE as tokens + a bible amendment.]

### Finding U3 — Composition was assembled, never composed (default-component smell)

**Severity: HIGH. Root cause: DESIGN-BIBLE gap (no page-anatomy layer) + no composition review.**

Concrete evidence, all visible in `web/shots/site/`:

- **Doubled labels, twice over.** Notion masthead: breadcrumb ends
  "Physique-Chimie" (`[slug]/page.tsx:87-96`) and the very next line is an
  eyebrow reading "PHYSIQUE-CHIMIE" (`:197`). Home: section heading
  "Mathématiques" (`page.tsx:183`) sits directly above a card whose eyebrow
  reads "MATHÉMATIQUES" (`page.tsx:98`). The same word, stacked, in two styles
  — components each correct in isolation, never read as a page.
- **A card for everything.** Figure, motion stage, embed, MCQ, checkpoint, home
  notion row — all the same `rounded-xl` + elevation panel. Inside
  `origin-i.svg` the figure draws *its own* rounded sub-panels and its own bold
  title ("Pourquoi i = dq/dt ?") → panel-in-panel-in-panel, and a second
  caption voice (bold sans inside the SVG) competing with the app's figcaption
  system (`media/origin-i.svg`; screenshot `notion-expanded-light-s3.png`).
- **Internal jargon leaks to the student.** The rail's resting labels are the
  spec's rung codes **R0…R9** (`MarginRail.tsx:42-71`); the human-meaningful
  titles exist but are hidden behind hover tooltips (`MarginRail.tsx:251-278`)
  — wayfinding inverted. The lesson also renders the heading "R8 — Exercice de
  type bac **(synthèse — à sourcer)**" (`lesson.md:498`) — an authoring status
  flag shown to a student.
- **The header is an app toolbar.** 56px bar (`SiteHeader.tsx:120`) with a
  font-size stepper given permanent top-chrome billing next to a single nav
  link that, on the home page, links to the page you are on.
- **No shared spine.** The header wordmark and the content column do not align
  to any common edge (visible in every expanded shot; this was even flagged by
  the R4 self-audit as the "masthead spine mismatch" and left).

The bible has **no vocabulary for any of this**: the words *hero, masthead,
footer, full-bleed, banner, navigation* do not appear in it (verified by
extraction). §4 governs spacing *within* a column; nothing governs the page.
[Part TASTE (what the composed page anatomy IS) → then ENCODABLE as a
page-anatomy spec + a "no doubled labels within one viewport" checklist rule.]

### Finding U4 — No spatial conviction

**Severity: HIGH. Root cause: bible gap (uniform-rhythm-only) + U1 amplification.**

Every surface runs one density: `space-y-12` home sections, `my-10` figures,
uniform card padding, one column width. Nothing is allowed to be huge (no hero
band, no full-bleed figure moment) and nothing tight (no dense reference
block). The home page is the extreme: two cards + all-16px type + no footer =
a void that "just stops" (`home-expanded-light-fold.png` — content ends at 55%
of viewport height with dead ivory below). The notion band caps at 1140px
(`max-w-notion`) with no moment that breaks it. The bible actively pushes more
whitespace everywhere (*"it usually needs more"*, `DESIGN-BIBLE.md:207-212`)
but has no concept of density **contrast** as a compositional tool.
[TASTE → ENCODABLE as section-rhythm rules in the page-anatomy spec.]

### Finding U5 — Missing web-native texture ("an app projected on a website")

**Severity: MEDIUM-HIGH. Root cause: bible gap (topic absent).**

- **No `<footer>` exists anywhere in the app** (grep over `web/src`: the only
  match is a comment in `MotionStage.tsx`). Pages end mid-air.
- **No visible heading anchors** — headings carry slug ids (`rehype-slug`) but
  no hover anchor affordance; a student cannot link a section.
- **No `::selection` styling** (0 matches in `globals.css`) — the one visual
  every reader touches constantly is browser-default blue on warm ivory.
- **No metadata layer** — no reading time, no filière/level chip, no
  "dernière mise à jour" anywhere on the notion page.
- **No print stylesheet** (bac students print revision material).
- The sticky app bar + sticky rail + stacked cards + no footer + no page-end
  is precisely the "app canvas" gestalt the owner names. The bible's
  web-native coverage is one line about hover existing
  (`DESIGN-BIBLE.md:79-81`). [ENCODABLE — a web-native texture pack spec;
  near-zero taste needed.]

### Finding U6 — Restraint hierarchy inverted: nothing leads

**Severity: MEDIUM. Root cause: bible rule exists but is not operationalized per surface.**

The bible's backbone rule — *"One primary thing per screen"*
(`DESIGN-BIBLE.md:221-223`), accent = *"the one thing that matters"*
(`:117-121`) — is implemented as *nothing* being primary: on home, no element
answers "start here" (no continue-session card, no today's-session CTA — the
periphery §8 promises exactly this and no component delivers it); on the
notion page the one accent moment is a 12px-designed eyebrow. Every card sits
at the same elevation; the only filled-accent element in the entire product
(`.btn-primary`) appears once, inside the embed panel, below the fold. Result:
uniform flatness that reads as template, not calm. [TASTE per surface — name
the primary element of home / notion-open / lesson-end → then ENCODABLE as a
per-surface "primary element" table the critics check.]

### Finding U7 — Motion: largely NOT guilty (with one mis-signal)

**Severity: LOW. For the record — the motion front is close to the bar.**

The beat engine is learner-paced, no autoplay/scroll-trigger/timer, three-way
reduced-motion, no-overshoot eases (`MotionStage.tsx` playback contract;
verified again post-R5 by the calm adversary). The R5 pass removed the two
mount-autoplay leaks. Residual issue: the rail's scroll-spy shows **R0 active
while R1 content fills the viewport** (`notion-expanded-light-s2/s3.png`);
probe inconclusive — needs verification of the IntersectionObserver thresholds
(`MarginRail.tsx:113`). And the *content* motion assets stop at R2 — R3–R9
have zero figures animated by the engine built for exactly this.

### Finding U8 — Absence of a taste pass: the audit instrument measures compliance, not gestalt

**Severity: CRITICAL (process). Root cause: pipeline — the QA loop cannot see what the owner sees.**

The apparatus ran five rounds, 13 fronts, adversarial calm verification, and
converged at min 18 / avg 18.5 (`docs/design/AUDIT-SCORECARD.md`) — while the
page's real h1 rendered 16px and the owner's one-line verdict was "AI slop."
Three instrument defects, all fixable:

1. **It graded artifacts, not renders**: class names, token files, contrast
   ratios — never computed styles, never measured type. (U1 was invisible to
   it by construction.)
2. **It graded rules, not gestalt**: no front asks "does this page read as a
   designed product? what does it look like next to material.io / Stripe docs
   at the same zoom?" Side-by-side reference comparison was never part of the
   loop.
3. **It graded its own work**: same model family, fresh context but shared
   priors, scoring against a rubric it wrote. The scores drifted toward the
   rubric's ceiling, not toward the owner's eye.

[ENCODABLE: a two-instrument QA — (a) a mechanical rendered-DOM checker
(computed sizes/spacing/contrast against TOKENS.md), (b) a gestalt pass that
diff-compares full-page screenshots against 2–3 named references with the
explicit question "which of these looks designed?" — plus the standing rule
that **no visual audit may cite a class name as evidence for a rendered
property.** The reference set and the pass/fail calibration are TASTE, once,
this week.]

---

## 2. DESIGN-BIBLE verdict

**Verdict: sound-but-incomplete — and in one place actively wrong. Not
"unenforced": the parts it specifies were mostly built (and one was destroyed
by a bug it had no means to detect).**

**Were the concrete tokens ever settled?** Yes. The appendix
(`DESIGN-BIBLE.md:423-433`) was discharged: `docs/design/TOKENS.md` (palette,
scale, spacing, elevation, motion curves — ADRs 0022/0023/0024) is real,
canonical, and consumed via CSS vars. **Token absence is NOT the root cause.**
The root causes are (a) U1 — a runtime bug between the settled tokens and the
screen, which no rule guards against; (b) genuine coverage gaps; (c) one
overcorrected rule.

**Where the bible is sound and was followed:** §0 calm/periphery split, §5
motion (strong, concrete, enforced — the calm adversary works), §7 sacred
core, §9 accessibility floor, §2 color philosophy. These survive contact with
the owner's verdict: nothing in "AI slop" indicts calmness itself.

**Amendments required (explicit list):**

1. **New section — Page anatomy & composition.** Masthead treatment per
   surface type; one shared spine (header, content, rail alignment); section
   rhythm rules (what changes at a section boundary besides a gap); footer
   required on every page (what it contains); where full-bleed/band moments
   are permitted; the "no doubled labels within a viewport" rule; no internal
   codes (R0…) or authoring flags ("à sourcer") in student-facing chrome.
   *(Fixes U3/U4; currently NOTHING — the words don't appear.)*
2. **§3 amendment — a display tier and permission for drama.** Add
   display/display-lg tokens (values = taste decision this week) and the rule:
   *every surface gets exactly one display-voice moment; body/chrome stay
   restrained.* Reword `:194-197` so restraint governs *count*, not
   *amplitude*. *(Fixes U2 without opening the door to noise.)*
3. **New section — Web-native texture.** Footer, visible heading anchors,
   `::selection` in the warm palette, metadata line (reading time, filière,
   updated date), print stylesheet, scroll affordances. *(Fixes U5.)*
4. **§7/§4 amendment — operationalize "primary".** A table naming THE primary
   element for each core surface (home, notion-open, mid-lesson, lesson-end,
   404). Critics check the table, not the vibe. *(Fixes U6.)*
5. **New rule — rendered-truth enforcement.** "A visual claim is verified only
   against the rendered DOM (computed styles / measured screenshots), never
   against source class names or token files." Plus the standing regression
   battery from U1. *(Prevents the entire U1/U8 class.)*
6. **Correction of an existing false claim:** the bible's ADR 0024 preamble
   cites "18–19/20 on all 13 fronts" as evidence of Material-grade quality
   (`DESIGN-BIBLE.md:26-30`). Annotate it: the instrument that produced those
   scores could not see rendered type. Keep the scorecard, downgrade its
   authority.

---

## 3. Content root-cause diagnosis

Graded against VISION's notion anatomy (`docs/product/VISION.md:48-96,117-143`).
Headline: **the content is materially closer to the bar than the UI** — the
prose voice, hook, and misconception machinery are genuinely strong; the
failures are concentrated at the ramp summit, in grounding, and in pipeline
discipline — mostly NOT writing quality.

**What meets the bar (with evidence):**

- **Hook** — VISION L51-55 wants "I want to understand this" before any
  definition. `lesson.md:9-27` stages predict → commit ("Engage-toi… qu'est-ce
  que tu prédis ?") → confrontation with the real trace ("Ta prédiction et la
  réalité vont dans des directions opposées"). This is the standard, executed.
- **Expert reasoning shown** — VISION L65-68's exact bar ("not 'we factor
  here' but 'we got 0/0, and 0/0 is the signal…'") is met in R2/R3/R5:
  "On pose donc l'hypothèse — c'est une supposition, pas une certitude encore"
  (`lesson.md:158`); "R n'est tout simplement pas dans l'équation… donc il ne
  peut pas apparaître dans T₀" (`:184`); the R5 substitution test that
  *ruptures* the plausible-wrong belief (`:318-362`). Coverage ≈ half the
  lesson; R4/R6/R7 drop to clean exposition.
- **Misconception-aware diagnostics** — 28 items, every distractor mapped to a
  misconception id with `also_reveals` dual-tags and a coverage summary
  (`items.yaml:1388-1570`); checkpoint feedback literally names the model:
  "**Modèle détecté : « R est le moteur des oscillations »**"
  (`checkpoints.yaml:43-95`). This machinery exceeds what most commercial
  products ship.
- **Voice** — tu/on tutor register throughout, near-zero academic passive
  (tu ×7, on ×106, nous ×2). Calm: no engagement theater anywhere.

**Failures, each classified (spec / execution / pipeline):**

- **C1 — The ramp summit is read-only. [SPEC + product gap]** VISION L73-82
  demands the student be "deliberately built up" through *doing*; R8's seven
  questions and R9's variation print their *Raisonnement expert* directly
  under each question (`lesson.md:498-620`) — printed solutions at the exact
  moment VISION forbids them. The student never attempts the summit. The spec
  chain specified in-lesson checkpoints (D4) but never specified an
  attempt-first interaction contract for R8/R9, and no component exists for
  staged-reveal exercises. Severity: HIGH — this is the single largest
  content-experience gap.
- **C2 — The summit is not real. [PIPELINE]** R8 is honest about it: "Il n'est
  pas tiré d'un sujet national réel identifié… labellisé **à sourcer**"
  (`lesson.md:500`). VISION L73-76 requires "*actual past-bac questions*."
  The ADR 0019 sourcing step simply never ran. (And the status flag leaks
  into the student-facing heading — see U3.)
- **C3 — The spec was never human-validated. [PIPELINE discipline breach]**
  `spec.md:14-16` carries a banner: produced autonomously, "NOT YET
  HUMAN-VALIDATED," every scope boundary "proposed" — while the pipeline's own
  rule says Phases 1–3 are human-gated (`pedagogy-architect.md:70`,
  `docs/pipeline/pipeline.md:30`). 5,259 words + 28 items + 17 media files
  were built on an unvalidated foundation. The eight-misconception inventory
  may be right — nobody with domain judgment has said so.
- **C4 — Prose quality has no measurable acceptance criteria. [SPEC]** The
  countable outputs have hard floors (items: ≥3/misconception, coverage
  summary asserted, `item-author.md:20-30`; bac-fidelity: cadre citations
  required). Prose has adjectives ("patient, calm, mechanism-obvious",
  `content-author.md:19-27`) — no per-section checkable criteria. That is why
  R9's commentary thins (Q1 is bare computation, `lesson.md:592-596`
  [EXECUTION, minor]) and why 3 of 8 misconceptions are confronted only in
  items, never ruptured in prose (M-inventory `items.yaml:4-43` vs ~5
  confronted in lesson) without anything failing.
- **C5 — The hook's centerpiece asset doesn't exist. [PIPELINE/asset debt]**
  `[[video:balancement]]` (`lesson.md:7`) renders as a silent no-op
  (`NotionBody.tsx:311-318`). The opening was designed around a video that was
  never produced; motion assets stop at R2, leaving R3–R9 static.
- **C6 — "It knows the student" is entirely absent. [Product stage, not a
  content defect]** VISION L84-91 (adaptivity, spaced retrieval,
  never-advance-unready) has no implementation: state is in-memory only,
  resets on navigation. Fine for this stage — but it caps how "tutoring-grade"
  any static page can feel, and should be named honestly rather than expected
  from prose.

**The pipeline verdict:** the critique loop exists and ran (wave-1/wave-2,
ROSTER). Its content-side instrument has the same defect as the UI's (U8): it
checks VISION-beat *presence*, not felt quality, and the one gate that carries
taste — the human editorial pass — was deferred (C3) or spent on rendered
output where spec-level errors are expensive to unwind.

---

## 4. Force-ranked top 10 by leverage

1. **Fix the cn()/tailwind-merge type-flattening and add a rendered-DOM
   regression battery.** [ENCODABLE] One config change restores the entire
   designed hierarchy on every page; the battery makes the whole U1 class
   impossible forever. Nothing else comes close per unit effort.
2. **Rebuild the QA instrument: measured-DOM checks + reference-comparison
   gestalt pass + "no class-name evidence" rule.** [ENCODABLE harness; TASTE
   calibrates the reference set once] Without this, every future pass
   re-converges on compliant slop.
3. **Decide and encode the page anatomy** — spine, masthead band, footer,
   section rhythm, one display moment per surface. [TASTE this week →
   ENCODABLE spec + bible amendment #1/#2] This is the "website, not app
   projection" lever.
4. **Make R8/R9 attempt-first** — spec the staged-reveal exercise contract
   (question → student commits → expert reasoning unlocks), build the
   component once, amend the spec template so every notion's summit is
   interactive. [ENCODABLE]
5. **Source real bac sujets for R8 and run the ADR 0019 validation** (and
   strip "à sourcer" from student-facing text immediately). [ENCODABLE
   pipeline step; needs the human's sources or a sourcing session]
6. **De-jargonize the student surface** — rail shows titles (codes demoted to
   hover at most), kill both doubled-label instances, no authoring flags in
   render. [ENCODABLE checklist, trivial fixes]
7. **Content spec template v2 with measurable prose criteria** — per rung:
   predict-commit-confront present? mechanism-why present? every inventory
   misconception either ruptured in prose or explicitly delegated to items?
   reasoning-annotation on 100% of worked steps? Critics check boxes, not
   vibes. [ENCODABLE]
8. **Web-native texture pack** — footer, heading anchors, `::selection`,
   metadata line, print CSS. [ENCODABLE; small TASTE pass on footer content]
9. **Give home a reason to exist** — the periphery the bible already promises
   (§8): continue-session as THE primary element, honest progress. [TASTE on
   what v1 shows → ENCODABLE]
10. **Wire the human gates the pipeline already defines** — spec validation
    before authoring (C3) and the editorial gate before "done" claims; plus
    close the video/motion asset debt for R0/R3–R9 or re-author the hook to
    stand without it. [ENCODABLE process rule; asset work]

---

## 5. Proposed week plan (Fable, July 1–7)

Priority: systems that outlive me. Each day ends with an artifact Opus/Sonnet
can execute without me.

- **Day 1 (today) — this audit.** Done when committed.
- **Day 2 — kill U1, build the truth instrument.** Fix tailwind-merge config;
  write the rendered-DOM battery (computed sizes/colors/spacing vs TOKENS.md)
  as a script CI can run; re-shoot the full matrix — then do my **taste pass
  v1 on real renders** (the first time anyone will have seen the designed
  hierarchy). Deliverables: the fix, `scripts/dom-truth.mjs`, fresh shots,
  taste notes.
- **Day 3 — the taste decisions, decided and frozen.** Display scale top end;
  page anatomy (spine, masthead band, footer, section rhythm); per-surface
  primary elements; reference set for the gestalt pass. Encode all of it:
  bible amendments 1–6, TOKENS v2, page-anatomy component specs. Deliverable:
  the amended docs — the *decisions*, not just principles.
- **Day 4 — validate by rebuilding.** Apply the specs to home + notion + 404
  (RLC as the test article). Run both new instruments. One round of my own
  gestalt iteration. Deliverable: the rebuilt pages + instrument reports.
- **Day 5 — content systems.** Spec template v2 (measurable prose criteria,
  attempt-first summit contract, sourcing step as a blocking checkbox);
  exemplar rewrite of R9 + one prose rupture for an un-confronted
  misconception (the gold-standard sample Sonnet imitates); de-jargonize.
  Deliverable: template + exemplar + updated critic checklists.
- **Day 6 — portability test (the whole point).** Have **Sonnet 4.8** execute,
  cold: (a) one page-anatomy component spec, (b) one lesson section from
  template v2 on a fresh sub-topic. Measure the gap against my Day-4/5
  executions with the new instruments; tighten every spec where Sonnet
  diverged — the divergence list IS the spec bug list. Deliverable: gap
  report + tightened specs.
- **Day 7 — handoff.** Final regression suite, the open-taste-decisions
  ledger (what I decided and why; what remains genuinely open), updated
  RULES/ROSTER pointers (spec-validation gate, rendered-truth rule), and a
  one-page "how to not regress this" note for Opus 4.8.

**Constraints honored throughout:** no production-touching work (RULES.md §3;
production sync still unverified — nothing here needs the database); content
lane only; the calm core stays sacred — every taste decision passes the
calm-load adversary before it lands.

---

*Judgment calls made in this audit, flagged as such: the severity ranking of
U2–U6 (the measured U1 is not a judgment); the ≈45–55% reasoning-visible ratio
in §3 (rough section-weighted estimate); the scroll-spy mis-signal (screenshot
evidence, probe inconclusive); and the claim that content is closer to the bar
than UI — that one I will defend: read `lesson.md:148-184` and then look at
`home-expanded-light-fold.png` and decide which one embarrasses the standard.*
