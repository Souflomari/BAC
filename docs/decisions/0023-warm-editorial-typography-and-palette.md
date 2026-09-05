# ADR 0023 — Warm-editorial typography (reading serif + Plex sans) and palette (warm ramps + a signature teal accent)

**Status.** Accepted, 2026. Triggered by the human's editorial review of the
rendered `rlc_serie` notion AFTER the ADR 0022 craft pass: *"still far from the
objective, especially the UI part; the UI needs to be SOTA, something clean, but
elegant, extremely elegant."* This ADR settles the typeface, palette, and the
signature accent so they are not re-litigated.

**Relates to.** VISION, RULES, `docs/product/DESIGN-BIBLE.md` (§2 color, §3
typography — updated by this ADR), ADR 0022 (design-system tokens + motion stack
— **partially superseded**, see Retractions), ADR 0017 (coded-figure rule —
reaffirmed). Living references updated alongside: `docs/design/TOKENS.md`,
`docs/design/COMPONENT-STATES.md`.

---

## Context

ADR 0022 delivered the craft layer (elevation, easing, beat-spec motion, a
unified figure palette) and a critic panel rated the result 4.5/5. But that panel
measured the **floor** — calm, accessible, rule-compliant, no overlap. *"Extremely
elegant"* is a **ceiling of micro-craft the rubric never measured.** A fresh
3-agent audit independently scored the UI ~6.5/10 against a Linear/Stripe/Apple/
Things bar of 9–9.5, with one diagnosis: **"calm" had been executed as "plain."**

Concrete gaps the audit named: (1) **typography** utilitarian — IBM Plex Sans
only, conservative tracking, no editorial voice; (2) the **palette** had no
signature — flat cool blue-gray, surfaces nearly equal in luminance, the accent
"restrained to invisibility," dark-mode semantics were neon Tailwind defaults;
(3) **cards boxed-in by borders** where elegant products imply containment with
shadow; the **page heading had no anchor**; (4) missing **craft signals** (hanging
punctuation, optical tracking, tuned shadows, refined focus). The fix is **not
adding more — it is deepening the choices already made**, inside the calm /
no-engagement-theater core.

The direction was chosen WITH the human, not asserted: an editorial typeface
pairing and a warm palette were selected, and the signature accent was picked from
**live direction studies** rendered on the real notion page (refined indigo, deep
teal, warm terracotta) before any rollout — de-risking the taste call.

## Decision

1. **Editorial typeface pairing.** A reading **serif** — **Source Serif 4**
   (`--font-reading-serif`, weights 400/500/600/700 + italic, `display:swap`,
   preloaded) — for lesson **prose and all headings** (warmth, scholarship; a
   screen-optimized text serif with full French diacritic + guillemet coverage
   that holds at 17px and does not fight KaTeX strokes). **IBM Plex Sans** is kept
   for **UI chrome, labels, controls, and figure/math labels** (unambiguous
   1/l/I/0 for a maths product; matches the SVG figure roots). **IBM Plex Mono**
   for code. KaTeX keeps its own fonts. Headings outside `.prose-lesson` (notion
   masthead `h1`, home `h1`, items `h2`, not-found) take an explicit `font-serif`.

2. **Warm-editorial palette (replaces the cool tinted-neutral set).** Light:
   warm ivory/cream surfaces with confident luminance separation (base `#F4EFE6`,
   raised `#FBF7F0`, overlay `#FFFDF8`), warm near-black ink (`#2A2018`), warm
   borders, and **muted (never neon) semantics**. Dark: a warm charcoal with a
   faint brown undertone (base `#1A1612`, raised `#231E18`), warm off-white ink,
   muted semantics. The full ramps live in `docs/design/TOKENS.md` and
   `web/src/app/globals.css`.

3. **A single signature accent — deep teal — promoted to CSS variables.** The
   accent is promoted to `--color-accent` / `-strong` / `-light` / `-subtle` so a
   study is a one-line override and rollout is central. The locked hue is **deep
   teal** (`#1F6F6B` light / `#5FB6AE` dark), chosen from the live studies: calm
   and premium, harmonizes with the warm surfaces, and is **semantically separated**
   from success/warning/error. Dark on-accent text is a **deep teal** (`#11302C`),
   not white — the dark accent is light, so white would fail contrast. The figure
   palette's `--figure-accent` follows the signature automatically; re-tuning the
   `--figure-*` tokens re-skins every coded SVG with zero per-file edits.

4. **Shadow-first cards.** `elevation-1/2` lead with a faint warm hairline **ring**
   (`0 0 0 1px`) so cards drop their drawn borders and still hold a crisp edge on
   the low-contrast ivory — the Stripe/Linear card: *lifted, not boxed-in.* Applied
   to figure / motion / embed panels, checkpoint + MCQ cards, the font-size stepper
   (segmented control with a lifted "selected" thumb), and the home notion cards
   (lift on hover). Interactive option rows keep their state-semantic borders.

5. **One confident primary action.** A `.btn-primary` component class (deep-teal
   fill, on-accent text, `elevation-2`, hover → `accent-strong`) — the accent's
   single filled moment, used **sparingly**: on the genuine primary action of a
   surface only (e.g. "open the interactive sandbox"), quiet everywhere else. The
   calm opt-in is unchanged — the heavy iframe still mounts only on click.

6. **Masthead anchor + dedup.** The notion page heading becomes an accent
   **eyebrow + hairline rule** over a serif title — the page's one accent moment.
   The leading H1 (and its thematic break) is stripped from rendered prose, since
   the header already provides the titled anchor; this removes a visible duplicate
   title and a second `<h1>` (an accessibility defect). The display title is still
   extracted from the raw markdown before stripping.

7. **Micro-craft.** 6px accent focus ring; warmed floating scrollbar thumb;
   `hanging-punctuation: first last` + `text-wrap: pretty` on prose; optical
   heading margins; tightened display/heading tracking + a `700` weight; loosened
   caption / uppercase-eyebrow tracking.

**Calm core, accessibility, and no-engagement-theater are untouched.** Elegant ≠
loud: the accent leads in exactly one place per surface, semantics are muted not
neon, no drop-cap, no new motion. Every token pair was contrast-verified
(≥4.5:1 body text, ≥3:1 decorative/UI) in both themes. The calm-load critic
remains the blocking adversary.

## Consequences

- The visual-design / calm-load critics now judge a **ceiling** (the 9–9.5 SOTA
  bar with calm-preserved as a blocking axis), not just the floor.
- The accent being a CSS variable makes future re-theming a central, low-risk edit.
- Source Serif 4 enters the font load (tight weight list, preloaded — prose is
  above the fold). Content-lane only (rendered to the **preview**); production/DB
  stay human-gated.
- DESIGN-BIBLE §2/§3, `TOKENS.md`, and `COMPONENT-STATES.md` are updated to the
  warm-editorial system; the old cool-palette / sans-only descriptions are retired.

## Retractions and Corrections

- **Supersedes ADR 0022's implicit typeface lock** (IBM Plex Sans for everything):
  prose and headings are now a reading serif (Source Serif 4); Plex Sans is
  retained for chrome / labels / figure + math labels. The serif+Plex pairing is
  deliberate, not a drift.
- **Supersedes ADR 0022's cool tinted-neutral palette** (blue-gray surfaces, cool
  elevation, neon dark semantics) with the warm-editorial ramps and the signature
  teal accent above. ADR 0022's elevation *scale*, easing curves, beat-spec motion
  stack, figure-token *mechanism*, and the coded-vs-generated hard line all stand —
  only the *values* (hues, shadows) are re-tuned warm, and `elevation-1/2` gain a
  hairline ring.
