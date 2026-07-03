# The Design Bible

> The canonical design system for the product — the web app (the principal
> surface, used primarily on laptop/desktop) and every generated visual asset
> (imagery, diagrams, illustrations, eventual video). It governs how the
> product *looks*, *moves*, and *feels*, and it constrains both the React UI
> and the Gemini-generated visuals so they speak one visual language.
>
> It answers to `docs/product/VISION.md`. Where the vision says *what* the
> product is and how it should feel, this bible says *how that feeling is
> built* — concretely, in tokens and rules. When a design choice and the
> vision conflict, the vision wins.
>
> **Grounding:** this bible is the synthesis of a state-of-the-art research
> pass across (1) premium web/UI craft, (2) best-in-class learning apps, (3)
> the cognitive science of flow, cognitive load, and attention, and (4)
> adjacent masters of calm, focused design. The research artifact is the
> evidence base; this is the decision.
>
> **ADR 0024 (Hybrid-Material) — current system layer.** The warm-editorial
> identity (ADR 0023) now sits on a Google/Material-grade *mechanism* layer:
> a single `.state-layer` interaction model (one neutral hover/pressed wash for
> every control — see `docs/design/COMPONENT-STATES.md` §0.4), a
> surface-container tonal ladder (depth through tone + shadow), formal M3
> window-size classes (compact/medium/expanded), one `Icon` system, and
> French-aware content rules. It was graded front-by-front to **18–19/20 on all
> 13 fronts** against `docs/design/GOOGLE-AUDIT-RUBRIC.md`
> (scorecard: `docs/design/AUDIT-SCORECARD.md`). **Scorecard-authority note
> (Day-4 amendment #6):** those scores were produced by an instrument that
> verified class names and token files, never computed styles — it missed the
> entire type hierarchy rendering at 16px (audit finding U1/U8,
> `docs/audits/fable-ui-content-audit.md`). Keep the scorecard as a record of
> mechanism adoption; do NOT cite it as evidence of rendered quality. Rendered
> claims answer to §13 (rendered truth) and `web/scripts/dom-truth.mjs`.
> The hard line held throughout:
> adopted mechanisms that leaked **autoplay/engagement-theater were removed** —
> the protected calm core (§0) wins over any Material mechanism.

---

## 0. The one principle everything else serves

**Spatial separation of focus and engagement.**

The product has one central tension: it must be *calm and flow-protective*
(so a student can sink into deep study) yet *engaging enough that students
return*. The research resolves this not by compromise but by **separating the
two into different zones of the product**:

- **The learning core is sacred.** Inside an active lesson or practice
  session, there is *nothing* that competes for attention — no streaks, no XP,
  no leaderboards, no notifications, no timers, no reward animations. The only
  reward is understanding. This is a calm-technology zone: it asks for the
  smallest possible amount of attention and protects the fragile 10–15-minute
  ramp into flow.
- **Engagement lives in the periphery.** All retention mechanics — progress
  made vivid, a gentle daily nudge, "what to study next," earned milestones —
  live at the *edges*: the home screen, the dashboard, the session open and
  close, and at most one respectful daily notification. The periphery invites
  the student back; the core protects their focus once they arrive.

Every rule in this bible descends from this principle. When in doubt about
where something belongs, ask: *does this help the student understand right
now, or does it help them come back later?* Understanding-now goes in the
core. Come-back-later goes in the periphery. Nothing that serves return is
allowed to invade the core.

---

## 1. Surface and platform

**Desktop-web-primary.** The principal surface is the web app on a laptop or
desktop — that is where students do their long study sessions. The design is
built **desktop-first** and adapts *down* to smaller screens, not the reverse.

This has real consequences that distinguish this product from mobile-first
learning apps (including Imprint, the aesthetic reference, which is
phone-shaped):

- **Restraint is a deliberate choice, not a constraint.** On a phone, the
  small screen *forces* one-thing-at-a-time. On a wide desktop viewport,
  many things *could* fit — so calmness must be *chosen* and *enforced*. The
  default temptation on desktop is to fill the width; resist it. Use the
  extra space for generous margins and a centered, bounded reading/working
  column, not for more stuff.
- **Mouse and keyboard, not thumb.** Interactions are precise (hover states
  matter, which they don't on touch), and the keyboard is available (support
  keyboard navigation and shortcuts for the deep-study flow).
- **Long sessions at a desk.** The desktop context is where flow is most
  achievable — a student sitting down for a real study block. The design
  should feel like a calm desk, not a busy feed.
- **Adapts down gracefully.** On tablet and phone, the bounded column becomes
  the full width, hover states collapse into tap states, and the same calm
  language holds. Mobile is supported and real, but it is the *secondary*
  shape.

**The website and the app are the same thing.** There is no separate marketing
site with a different language from the product. One visual system, one feel,
from the first page a student lands on to the deepest practice screen.

---

## 2. Color

**Philosophy: calm, low-stimulation, WARM tinted-neutral, single signature accent.**

> **Updated by ADR 0023 (warm-editorial).** The palette is now an explicitly
> **warm** set — ivory/cream surfaces and warm near-black ink in light, a warm
> charcoal (faint brown undertone) in dark — replacing the earlier cool
> blue-gray. The single accent is now a deliberate **signature hue (deep teal),
> chosen from live direction studies**, promoted to a CSS variable so it themes
> centrally. Concrete ramps live in `docs/design/TOKENS.md`. Everything below
> still holds; the values just got warm and the accent got a signature.

- **Never pure black or pure white.** Every surface, border, and text color
  carries a faint tint (a trace of warmth or of the brand hue). Pure `#FFFFFF`
  and `#000000` read as harsh and digital; tinted neutrals read as calm and
  considered. Paper has warmth; screens should borrow it.
- **A near-monochrome base.** The overwhelming majority of every screen is
  tinted neutrals — backgrounds, surfaces, raised surfaces, text at three
  levels (primary, secondary, tertiary), borders. This near-monochrome calm is
  what makes the product feel like a focused study environment rather than a
  game.
- **One restrained accent, used sparingly.** A single accent color carries the
  brand and marks the *primary* action or the *one* thing that matters on a
  screen. One color used sparingly hits harder than five colors used
  everywhere. The accent is never decorative — it always means "this is the
  action" or "this is the focus."
- **Semantic colors, not decorative ones.** Beyond the accent, color is
  reserved for *meaning*: success, warning, destructive/error, information.
  These appear only when they carry that meaning. A green is a "correct," not
  a decoration.
- **Avoid full saturation.** Saturated colors are harsher, more likely to fail
  contrast, and "vibrate" against dark backgrounds. The palette leans toward
  slightly muted, desaturated tones throughout — including in the accent.

**Dark mode is first-class, not an afterthought.**

- Dark mode uses a soft near-black (a deep tinted charcoal, *not* `#000000`).
  Pure black causes glare and haloing ("halation"), especially for students
  with astigmatism — and these are students staring at screens for hours.
- Build depth and elevation through *layered luminance* (slightly lighter
  surfaces sit "above" darker ones), not through heavy drop shadows.
- Text in dark mode is an off-white on charcoal, never pure white on pure
  black.
- Tune contrast per semantic role so the dark theme stays *calm* — contrast
  shouldn't spike aggressively everywhere.
- Respect the OS setting by default; offer a manual toggle.

**Contrast and accessibility (non-negotiable floor): WCAG 2.2 AA.**

- 4.5:1 minimum for normal text; 3:1 for large text (≥18px, or ≥14px bold) and
  for UI components and meaningful graphics.
- **Never convey meaning by color alone.** Correct/incorrect, states,
  categories — always pair color with an icon, label, shape, or position. A
  colorblind student must get the same information.

---

## 3. Typography

Type is the single most important craft element in this product, because the
product is *deeply* text-heavy — the décortiquer, the exposed reasoning, the
explanations are the heart, and they are read, at length, on a desktop screen.

> **Updated by ADR 0023 (editorial pairing).** A **reading serif (Source Serif 4)**
> now carries lesson **prose and headings** — warmth and scholarship, like a fine
> textbook. **IBM Plex Sans** is kept for **UI chrome, labels, controls, and
> figure/math labels** (the unambiguous-figures requirement below applies to the
> sans, which is where digits and variables are read). KaTeX still owns math. The
> serif/sans split is the new rule; the bullet below about "one excellent sans"
> now means "one excellent sans *for chrome*, one reading serif *for prose*."

- **The measure (line length) is 60–70 characters for prose.** This is the
  readability sweet spot and it matters enormously for long-form explanation.
  On a wide desktop viewport this means the reading column is *bounded and
  centered* — text does not run the full width of a laptop screen. Implement
  with a `max-width` around `65ch` for any prose block. (This is the single
  most common desktop mistake the product must avoid: full-width body text is
  exhausting to read.)
- **Line height 1.5 for body text.** Generous leading reduces strain over long
  sessions. Set line heights to multiples of the spacing base for vertical
  rhythm.
- **A modular type scale, named as tokens.** A small set of named sizes
  (caption, body, lead, and a heading scale) on a consistent ratio. Body text
  is at least 16px; for a reading-heavy product, a slightly larger base (17–18px)
  is defensible and kinder over long sessions.
- **Adjustable text size.** Students study for hours and vary in eyesight and
  device. Offer a text-size control. (This directly fixes a documented
  weakness of Imprint, which does not allow it — we do better.)
- **A confident, legible, screen-optimized sans for UI and body.** The
  typeface must have unambiguous figures (clear 1/l/I and 0/O — this matters
  in a maths product where a student reads `l`, `1`, and `I` in the same
  expression). Choose one excellent sans and commit to it.
- **Math is rendered, not imaged.** Use KaTeX for mathematical notation — it
  renders synchronously, needs no page reflow, is self-contained, and was built
  by Khan Academy for exactly this high-volume, low-latency educational case.
  Math is *live text*, never a picture of an equation: it stays crisp at any
  zoom, is selectable, and is accessible. This is a hard rule for a maths-heavy
  product.
- **Hierarchy through scale and weight, not decoration.** Two weights
  (regular, medium/semibold) carry almost everything. Headings are larger and
  slightly heavier; they are not colored, boxed, or ornamented. Restraint in
  type is part of the calm.
- **Restraint governs COUNT, not amplitude — the display tier.** [Day-4
  amendment #2, audit U2.] The scale includes a true display voice
  (`display` 36px, `display-lg` 56px — TOKENS.md §2.2): every core surface
  gets **exactly one** display-voice moment (the notion masthead band, the
  home h1) and everything else stays on the restrained scale. A page whose
  largest voice is a section label reads undesigned, not calm — the Day-1
  audit's "typography without hierarchy" finding was partly this rule's old
  wording, which suppressed amplitude instead of count. One loud, confident
  typographic moment per surface IS the calm reading of drama.

---

## 4. Spacing, layout, and rhythm

**The 8-point grid.** All spacing is in multiples of 8 (8, 16, 24, 32, 48,
64, 96…), with 4px available as a half-step for tight pairings (icon-to-label).
This produces visual rhythm, scales cleanly across pixel densities, and keeps
every screen internally consistent.

- **Whitespace is an active material, not leftover space.** The instinct on a
  wide desktop screen is to fill it; the discipline is to leave it open. When a
  layout feels like it has "enough" space, it usually needs more. Generous
  whitespace is what lets a single idea breathe and is most of what makes the
  product feel calm and premium.
- **Composed space vs dead space (Day-8 amendment — the owner's
  wide-viewport review).** The rule above is about QUANTITY; this one is
  about STRUCTURE. Open space reads calm only when the composition HOLDS it:
  anchored (an element on one side gives the emptiness a referent), balanced
  (voids symmetric about the content axis), or bounded (a visible plane edge
  makes the emptiness "outside"). Space that is merely LEFT OVER — a
  full-bleed plane 38% occupied, an off-axis column with one fat margin —
  reads unfinished, not elegant (measured live: the owner circled every such
  region at 1920px). Filling is still forbidden; composing is mandatory.
  Test: at every viewport tier, can you say which element holds each open
  region? If no element holds it, the composition — not the content — is
  incomplete.
- **A bounded, centered working column.** Content does not sprawl across the
  full desktop width. A central column (for reading and for most practice)
  holds the focus; the surrounding space is calm margin. This is the desktop
  translation of Imprint's one-idea-per-card calm.
- **Internal spacing ≤ external spacing.** Padding *inside* a grouped element
  is tighter than the space *between* groups, so the eye reads groupings as
  distinct (Gestalt proximity). This is how a screen organizes itself without
  borders and boxes everywhere.
- **One primary thing per screen.** Especially in the learning core: each
  screen, each step, presents one idea or one task. The layout makes the one
  important thing obvious and gives everything else less weight.
- **Layout structure:** a 12-column grid for desktop composition where needed,
  collapsing to fewer columns on tablet and a single column on mobile, with
  consistent gutters on the spacing scale.

---

## 5. Motion

**Motion serves comprehension and continuity, never decoration.** Every
animation must provide feedback, guide attention, or show a state change. If
an animation isn't doing one of those, it doesn't exist. The best motion in
this product often goes unnoticed — it just makes things feel coherent.

- **Durations:** micro-interactions (hover, small state changes) 100–200ms;
  standard transitions (a panel appearing, a step advancing) 200–300ms; larger
  view transitions 300–500ms. Keep utility motion snappy.
- **Easing:** ease-out for elements entering (they arrive and settle), ease-in
  for elements leaving, ease-in-out for moving between states. Never linear
  (robotic). **Never bounce or overshoot** — playful spring motion is the
  texture of a game, not a calm study environment.
- **Duration scales with distance and size** — a small element moves quickly; a
  large surface takes slightly longer, so motion feels physically plausible.
- **One deliberate exception — entering deep study.** Borrowing from Headspace,
  the transition *into* a focused study session may run slightly slower
  (~400ms) than utility motion, as a deliberate cue to slow down and settle.
  This is the one place motion is allowed to set a mood rather than just serve
  utility — because the mood it sets (calm, focus) *is* the function.
- **Respect `prefers-reduced-motion`.** When a student requests reduced motion,
  swap large transitions and any parallax for simple fades, but keep functional
  feedback (loading, correctness, errors). This is an accessibility
  requirement, not a nicety.
- **No motion in the learning core that isn't feedback.** Inside a lesson,
  motion is limited to: advancing a step, revealing the next part of a worked
  example, and per-action correctness feedback. No ambient animation, no
  decorative movement, nothing that pulls the eye away from the idea.

---

## 6. The illustration and generated-visual language

This section governs **every generated visual** — Gemini-produced imagery,
diagrams, illustrations, and eventual video. The visuals must look like they
belong to the same product as the UI. A jarring, stylistically-foreign visual
breaks the calm as badly as a cluttered layout.

**The aesthetic target: calm and clarifying, never punchy and stimulating.**
The reference points are Imprint and Headspace — a quiet, gallery-like,
beautifully-illustrated feel, *not* a fast-paced, high-contrast, attention-
grabbing edit. A generated visual's job is to help a concept land, then
recede.

**The visual language:**
- **Flat vector with subtle gradients for depth.** Borderline-flat shapes with
  slight gradients to give dimension — the Imprint construction. Not
  photorealistic, not heavily 3D, not busy.
- **Rounded forms, soft geometry.** Rounded corners and soft shapes (the
  Headspace language) read as calm; sharp, aggressive geometry reads as
  tense. Even diagrams favor soft, clean forms.
- **Muted, palette-coherent color.** Generated visuals use the *same*
  tinted-neutral, desaturated palette as the UI, with per-topic accent
  palettes that stay muted. No pure black or white in illustrations either;
  shadows are colored (tinted), not gray. A visual must never be more
  saturated or higher-contrast than the UI around it.
- **Coherence-principle restraint in every diagram.** This is a hard rule from
  the cognitive science: a diagram contains *only* the marks essential to the
  idea. No decorative elements, no interesting-but-irrelevant detail (the
  "seductive details" that measurably lower learning). To direct attention,
  use *signaling* — a subtle highlight, a soft arrow, a muted-then-emphasized
  contrast — rather than adding clutter.
- **Integrate labels with the picture.** A diagram and its explanatory text
  live together spatially — never a diagram with a separated caption the eye
  must bridge (the split-attention effect lowers learning and slows reading).
  Labels sit on or beside the thing they label.

**For animation/video (when it arrives):**
- Lightweight, smooth vector animation (the Lottie approach Imprint uses) for
  in-product motion graphics.
- Calm pacing — slow, clarifying reveals, not fast cuts. An explainer video
  here is closer to a quiet illustrated walk-through than a punchy montage. The
  same "calm and clarifying, never punchy" rule that governs static visuals
  governs motion.

**The test for any generated visual:** *would this feel at home in a calm,
premium, gallery-like study environment — or does it feel like it's trying to
grab attention?* If it grabs, it's wrong, regardless of how impressive it is.

---

## 7. The learning core — the sacred zone

This is where the spatial-separation principle is enforced most strictly.
Inside an active lesson or practice session:

- **One idea or one task per screen/step.** The student is never choosing
  among competing stimuli. The flow leads them forward, one focused beat at a
  time. (The desktop translation of Imprint's swipe-forward cards: a centered,
  bounded step that advances cleanly.)
- **Integrated text and visuals.** Explanation and its diagram are spatially
  together (split-attention rule). Worked examples reveal step by step, with
  the reasoning exposed, and give immediate feedback at each step — which
  satisfies both a flow condition and a learning condition at once.
- **Immediate, per-action feedback.** Every answer, every step gets immediate
  response. This is non-negotiable: it's required for flow *and* for learning.
- **Absolutely no engagement theater.** No streaks, XP, points, leaderboards,
  badges, timers, countdowns, reward chests, or celebratory slot-machine
  animations inside the session. None. The reward is the click of
  understanding.
- **No interruptions.** No modals, no toasts, no notifications during a
  session. Anything non-critical waits for a session boundary. The 10–15-minute
  flow ramp is fragile and a single pop-up resets it.
- **A "Deep Study" / focus mode.** For long solving or reading blocks, offer a
  mode (the iA Writer pattern) that dims everything except the current
  problem or passage. This is the product's deepest expression of flow
  protection.
- **Difficulty stays in the flow channel.** Content is sequenced and adapted so
  challenge ≈ skill — never so easy it bores (the Duolingo trap of
  under-challenging to juice engagement), never so hard it triggers anxiety.

---

## 8. The periphery — gentle return

Everything that serves *return* rather than *understanding-now* lives here:
the home screen, the dashboard, session open/close, and notifications.

- **Progress made vivid — the honest dopamine.** The mastery map filling in,
  the bac-readiness climbing, "you went from 40% to 75% on Analyse." This is
  accurate feedback about genuine progress toward the thing the student
  desperately wants, and it is the strongest, most aligned motivator available.
  Make it *visible and felt* — generously. This is where the product is allowed
  to be motivating.
- **A calm mastery map, not a streak or a league.** Per-skill states
  (e.g., attempted → familiar → proficient → mastered) shown as a quiet map of
  where the student stands. This is the Khan-style mastery model, presented
  calmly. No league tables, no rankings.
- **One clear "what to study next."** A single, confident recommendation — not
  a feed of options to choose among. The product *leads* (the guided-primary
  vision); the periphery is where that leadership is expressed.
- **Earned milestones, rare and real.** Genuinely hard achievements —
  conquering a notion, nailing a past-bac question — get a quiet, warm
  acknowledgment (the Headspace register), rare enough to stay meaningful.
  Never confetti-for-everything, which devalues the moment.
- **At most one respectful daily nudge.** A single notification tied to the
  student's chosen study time, in invitational language ("ready for today's
  session?"), *never* loss-aversion or fear ("your streak will die!"). Respect
  exam-season pressure and social norms. The student can turn it off.
- **A gentle habit indicator is allowed — but never weaponized.** A soft "days
  studied" marker in the periphery is fine. It is never made anxiety-inducing,
  never monetized (no streak-freeze purchases), never moved into the core.

**The optimization target, stated in the design itself:** the product
optimizes for *learning per hour*, not time-on-app. The periphery exists to
bring a student back to do focused, efficient work and then go live their
life — not to maximize minutes. Any peripheral mechanic that would trap a
student or waste their time violates the vision and is out.

---

## 9. The accessibility floor (applies everywhere)

These are requirements, not enhancements — and they matter especially for a
product students use for hours, daily, under stress:

- **WCAG 2.2 AA contrast** (4.5:1 text, 3:1 large text and UI/graphics).
- **Never color alone** to convey meaning — always paired with icon, text,
  shape, or position.
- **Adjustable text size.**
- **Visible, clear focus indicators** for keyboard navigation.
- **Honor `prefers-reduced-motion`.**
- **Full keyboard navigability**, especially through the learning flow.
- **Touch targets ≥ ~48px** on touch devices.
- **Math as live, accessible text** (KaTeX), never as images.

---

## 10. The design test (apply to every decision)

Before shipping any screen, component, or generated visual, ask:

1. **Does it serve understanding-now or come-back-later?** And is it in the
   right zone (core vs periphery) accordingly?
2. **Would a struggling, stressed bac student find this calm — or busy?** If
   busy, cut.
3. **Is every element earning its place by aiding comprehension** — or is
   something there to decorate or to stimulate? Cut the decoration. (Coherence
   and seductive-details principles.)
4. **Could this be more spacious?** Usually yes.
5. **Does any motion here do anything other than feedback/guidance/state?** If
   so, remove it.
6. **Does this generated visual feel gallery-calm, or attention-grabbing?**
   Calm only.
7. **Does it meet the accessibility floor?**
8. **On a wide desktop screen, is the reading/working column bounded and
   centered — not sprawling full-width?**

If a decision passes all eight, it belongs in the product.

---

## 11. Page anatomy and composition (Day-4 amendment #1 — audit U3/U4)

A page is a composed artifact, not a stack of correct components. The Day-1
audit's "app projected on a website" verdict traced largely to this section
not existing. Rules; component-level build specs live in
`docs/design/PAGE-ANATOMY-SPECS.md`.

- **The shared spine.** Header wordmark, content column, rail, and footer
  share ONE left edge by construction: `PageShell` builds a single container
  class (max-width + responsive padding) and header/main/footer all consume
  it. Page width is decided in exactly one place (the `width` prop). A
  surface that bypasses `PageShell` must reproduce the spine and is suspect
  by default. (Verified by dom-truth `spine:` checks, ±0.5px.)
- **Masthead treatment per surface type.** A *lesson* surface opens with the
  masthead BAND: full-bleed `surface-container-low` plane, bottom hairline,
  breadcrumb → `display-lg` serif title (measure-capped ~26ch) → metadata
  line (level · reading time · updated), all on the spine. A *periphery*
  surface (home) opens with a `display` serif h1 + lead on the spine — no
  band. Utility surfaces (404) use `display` scale, centered allowed. The
  band is the page's one display moment — never two bands per page.
  [FABLE-DECIDED / OWNER-REVIEW-PENDING — Set A pick A3.]
- **Every page ends.** The footer (quiet colophon: identity line, one nav
  link, cadre note — Set C pick C1) is mandatory on every surface; a page
  that just stops is a defect (dom-truth guards presence). Engagement never
  lives in the footer; the lesson's session-close moment is the `LessonEnd`
  component ON the lesson surface, above the footer.
- **Section rhythm.** A section boundary changes more than a gap: heading
  scale step + hairline where the content family changes (home library), or
  band-tone change (masthead → reading surface). Uniform card-stacks are the
  smell this rule exists to prevent — a panel is reserved for genuinely
  interactive or stateful content (MCQ, checkpoint, embed, motion); flowing
  content is NOT boxed.
- **No doubled labels within a viewport.** The same word may not appear as
  two adjacent labels in different styles (breadcrumb + eyebrow; section
  heading + card eyebrow — both were live defects). Checklist rule; dom-truth
  guards the two killed instances.
- **No internal vocabulary on student surfaces.** Spec rung codes (R0…),
  authoring flags ("à sourcer"), phase names, agent names: never rendered.
  Machine needs use data attributes (`data-rung`), not visible text.
- **Full-bleed permissions.** Full-bleed (viewport-edge) treatment is
  permitted for: the masthead band, and nothing else today. Any new full-bleed
  moment is an owner decision — it spends the page's calm budget.
- **Viewport-tier composition (Day-8 amendment).** Every surface has an
  explicit answer at each tier — 1280 (design base) / 1536 (wide) / 1920
  (owner's monitor class) — for §4's composed-space test. The tiers are
  instrumented (dom-truth wide battery + the shot matrices; §13 amendment
  #3). At 1280 the shipped compositions hold as designed. At ≥1536, the
  open regions each need a holder: the masthead band's flanks (Set-M
  candidates: cover-in-band / bounded band / watermark) and the content
  column's right margin (Set-W candidates: margin notes / symmetric
  re-center + earned full-bleed / key-formula rail) — **owner picks
  pending (Day-8 option sets, `/options/wide/*`); the chosen rules get
  written HERE and specced in PAGE-ANATOMY-SPECS on pick.** Standing
  regardless of pick: prose measure never grows with the viewport; a
  periphery surface (home) that narrows to a ribbon at wide tiers is a
  composition failure (614px dead gutters measured per side at 1920 —
  the fix rides the picked strategy).

## 12. Web-native texture (Day-4 amendment #3 — audit U5)

The product is a website; it must feel native to the medium. The shipped set
(all dom-truth-guarded where assertable):

- **Text selection** is themed: `::selection` = `--color-accent-subtle` wash.
- **Heading anchors:** every prose h2/h3 carries a hover-revealed § link to
  its stable slug id — students can deep-link any section.
- **Masthead metadata line:** level chip · reading time (word count / 180 wpm)
  · "mis à jour" date (lesson mtime, month + year only — day-level precision
  would fake an editorial cadence). Honesty rule: metadata states only
  computable facts.
- **Print stylesheet:** chrome hidden, single column, ink-on-paper, no page
  breaks inside figures — bac students print revision material.
- **The page ends** (footer — see §11).
- Deliberately NOT adopted: scroll-triggered effects, sticky share bars,
  reading-progress bars (the rail already carries position), and anything the
  calm core forbids (§0/§5).

## 13. Rendered truth (Day-4 amendment #5 — audit U1/U8)

**A visual claim is verified only against the rendered DOM — computed styles
and measured screenshots — never against source class names or token files.**
The entire type hierarchy once rendered at 16px for five audit rounds while
class names and tokens looked perfect (finding U1); the instrument that
missed it cited source as evidence (finding U8).

- The standing instrument is `web/scripts/dom-truth.mjs` (`npm run dom-truth`):
  computed-style battery, expectations derived from the token sources, exits
  non-zero on violation. It runs green before any visual work is called done.
- Adding a custom key to `tailwind.config.ts` REQUIRES registering it in the
  `cn()` classGroups (`web/src/lib/utils.ts`) in the same commit — unregistered
  keys are silently deleted by tailwind-merge (the U1 mechanism).
- Gestalt (does the page read as designed?) is judged on full-page renders
  against named references, by a human or a fresh-context judge — never by
  the author of the change grading their own compliance (the U8 lesson).
- **Deployed truth (Day-5 amendment, the Day-4.5 lesson):** nothing is
  described as "live" or "deployed" without a verified fetch of the deployed
  URL or explicit owner confirmation — a push event, a CI notification, or a
  platform "Ready" status is NOT evidence of what a user would see. When the
  deployment cannot be verified from the working environment, the report
  language is exactly: **"pushed, deployment unverified."** The same
  discipline applies inward: a claimed code change is verified by re-reading
  the file or re-running the instrument, not by the fact that an edit command
  was issued.
- Per-surface **primary element** table (amendment #4 — §7's rule made
  checkable): home → the session card's filled action; notion (lesson) → the
  embed's `btn-primary` (mid-lesson) with the masthead band as the display
  moment; 404 → the return link. Exactly one filled accent action per
  surface; a second is a defect.
- **Guards target CLASSES, not instances (July-2026 amendment — the
  external-audit lesson).** An independent audit of the deployed site found
  three authoring comments rendering as student-visible text while dom-truth
  ran green: the battery guarded specific *instances* of internal vocabulary
  (the R-codes, two known flags) but nobody had stated the *class* — "no
  page's rendered text contains authoring-marker lexicon." When a guard is
  written, name the failure CLASS it protects against and assert the class
  (every page, every theme where applicable), not the instance that prompted
  it; an instance-guard silently licenses every sibling it doesn't mention.
  Corollary — **every instrument sees only what it was told to see:** the QA
  loop therefore has three legs, none optional: dom-truth (mechanical,
  self-syncing), gestalt against named references (taste), and a periodic
  independent fresh-eye audit of the DEPLOYED site (what neither in-repo
  instrument was told to look for — and the only leg that sees what users
  actually reach: the same audit revealed "verified both themes" claims were
  true of a harness-forced state no real user could activate).
- **Verification conditions span the OWNER'S actual conditions (July-2026
  amendment #3 — the wide-viewport lesson).** Three instrument confessions
  in one week share a root: the harness verified conditions the user never
  has (forced theme class) or missed conditions the user always has (a
  ~2000px monitor, while every check ran at 1280px — the owner found dead
  zones the whole battery was blind to). The rule: theme via the real
  controls; the deployed URL when verifiable; and a PERMANENT viewport
  battery of 1280 / 1536 / 1920 for both dom-truth's composition tier and
  the shot matrices. A check that passes only under conditions the owner
  doesn't use is not a pass.

---

## Appendix — what to settle next (concrete system specifics)

This bible sets the principles and the rules. The *concrete instances* — the
exact palette hex values, the chosen typeface(s), the precise type scale
ratio, the exact spacing tokens, the named motion curves, the component
library choice (e.g., a headless/Tailwind approach) — are the next layer of
decisions, made against these principles and recorded as they're settled.
They become the actual design tokens the React UI and the visual-generation
pipeline both consume. Settling them is the first concrete step of building
the UI, and they should be captured as a living tokens reference alongside
this bible.

## Caveats and open items

- **Arabic / RTL typography is deferred with the Arabic language phase.** This
  bible is built French-first. Arabic-script measure, line-height, and
  typeface behavior differ from Latin and will need their own focused research
  and testing when Arabic content is built — it is not a blocker now.
- **Imprint's exact type and palette are not publicly documented**; the
  aesthetic guidance here is drawn from its construction approach and feel, not
  from copied specifics. Our concrete tokens will be our own.
- **The gamification stance is deliberate and contested.** The research shows
  engagement mechanics reliably lift engagement *metrics* but their link to
  *learning outcomes* diverges at the edges (the Duolingo critique). This bible
  bets firmly on intrinsic motivation + a calm periphery, and treats engagement
  metrics as a proxy to watch, never a goal to chase. If retention proves weak,
  the response is a richer periphery first — never invading the core.