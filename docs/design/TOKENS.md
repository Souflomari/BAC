# Design Tokens — Canonical Reference

> **Authority:** ADR 0022 → ADR 0023 (warm-editorial) → **ADR 0024 (Hybrid-Material
> mechanisms — current).** This document discharges the DESIGN-BIBLE appendix's
> deferred "concrete tokens." It is the single source of truth for every token.
>
> **ADR 0024 (Hybrid-Material) ADDED these token families:** a **surface-container
> tonal ladder** (§1.1) so depth reads through tone + shadow; **interaction
> state-layer** tokens (§1.6) — one neutral hover/pressed wash for every control;
> semantic **on-colors** (§1.5); a **`--measure-lead`** token (§2.4); motion **CSS
> vars** mirroring the tailwind curves + an `enter`/`emphasized` duration pair
> (§5); and re-tuned **dark elevation** (warm ring on all 4 steps; §6.2). The
> focus ring radius now **tracks the host** (§4).
>
> **ADR 0023 (warm-editorial) changed the VALUES, not the structure:** warm
> ivory/charcoal palette + a **deep-teal signature accent**; an **editorial serif
> + Plex sans pairing**; `elevation-1/2` lead with a hairline **ring**; muted
> semantics.
>
> **Implementation — single source of truth (Phase A, 2026-08-05):** every value
> lives exactly once in **`web/src/lib/tokens.ts`**. From it: `scripts/generate-
> tokens.mjs` emits `web/src/app/tokens.generated.css` (the `:root`/`.dark`
> custom-property blocks, `@import`ed by globals.css); `tailwind.config.ts`
> derives the type scale, radius, breakpoints, motion, and the color aliases; and
> `dom-truth.mjs` + `cn()` read the same module so definition, render, and
> assertion cannot drift. Editing a value means editing `tokens.ts` and nothing
> else — a `prebuild` `--check` fails the build if the generated CSS is stale.
>
> **Enforcement:** component code speaks named aliases ONLY (`text-secondary`,
> `bg-surface-raised`, `tracking-eyebrow`, `min-h-touch`, …). `scripts/token-
> gate.mjs` (a commit gate and dom-truth's first gate) rejects any arbitrary
> token utility — `-[var(--…)]`, `-[#hex]`, `tracking-[…]`, `z-[…]`,
> `min-h/w-[48px]`, `duration/ease-[…]`; a deliberate one-off carries a
> `token-gate-allow` marker. dom-truth's token-parity sweep asserts every var
> resolves to its `tokens.ts` value in both themes, and the cn() tripwire keeps
> tailwind-merge from silently dropping a custom class (audit U1).
>
> **Living document (v2 — Phase A).** Add a token to `tokens.ts` AND here in the
> same change; remove nothing without a migration note. Changelog at the foot.

---

## 0. Phase A reconciliation (2026-08-05) — read first

The design system was fully systemized in Phase A. This section reconciles the
doc with the code; the detailed tables below (§1–§8) remain authoritative for
values.

**Tokens that were code-only and are now on the record (values unchanged):**

| Token / family | Value | Where |
|---|---|---|
| `--duration-view` | `300ms` | chapter-view enter (motion, §5) |
| `--focus-halo` | accent @18% / @22% dark | focus jewel halo |
| `--focus-radius` | `6px` (host-tracking) | focus ring |
| Breakpoints | `bp-medium` 600 · `bp-expanded` 840 · `bp-wide` 1536 | tailwind `screens` (TS-only — media queries can't read CSS vars) |
| `--font-scale` | `1` default (0.9375 / 1 / 1.125) | FontSizeStepper A−/A/A+, injected on `<html>` (not a themed token) |
| `max-w-page` / `max-w-notion` | `1280px` / `1140px` | layout bands |

**New families added in Phase A (W3):**

| Token | Value | Alias |
|---|---|---|
| `--tracking-eyebrow` | `0.14em` | `tracking-eyebrow` |
| `--touch-target` | `48px` | `min-h-touch` / `min-w-touch` |
| `--z-raised` / `--z-header` / `--z-overlay` | `10` / `40` / `50` | `z-raised` / `z-header` / `z-overlay` |
| `--duration-slow` | `400ms` | `duration-slow` (CSS var added; tailwind already had it) |
| `--ease-enter/leave/emphasized/standard-svg` | (curves, §5.2) | `ease-*` (CSS vars added; tailwind already had them) |

**Removed:** the legacy cool-palette `shadow-subtle` / `shadow-soft` aliases (0
uses, off the warm ADR-0023 palette).

**Explicitly out of scope (not tokenized):** the ~125 raw px/rem literals inside
globals.css `@layer components` (component-level styling that already consumes
the color/motion vars); one-off figure/layout geometry in `ch`/`px` (`w-[36ch]`,
`h-[460px]`, …), which is content-shaped, not a design-system value.

**Multi-theme registry deferred:** `THEME-ARCHITECTURE.md` specs a `data-theme`
registry (a `craie` theme, `next-themes`). It is NOT built (`next-themes` is not
a dependency) — treat it as a deferred target, not a spec-in-force. `tokens.ts`
is shaped to accept it: a new theme is one more entry in `themes` keyed by
`[data-theme="…"]`, with nothing else in the pipeline moving.

---

## 1. Color Palette

> **ADR 0023 — warm-editorial palette.** All values below are the warm ramps.

### 1.1 Surface (light / dark)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-surface-base` | `#F4EFE6` | `#1A1612` | Page background (warm ivory / charcoal) |
| `--color-surface-raised` | `#FBF7F0` | `#231E18` | Cards, panels, raised elements (= `container`) |
| `--color-surface-overlay` | `#FFFDF8` | `#2C261F` | Modals, tooltips, overlays |

#### 1.1b Surface-container tonal ladder (ADR 0024 — M3 tone-based surfaces)

Depth reads through **tone** as well as shadow: a higher tier sits on a lighter
warm surface. `base ≤ lowest ≤ low ≤ container(=raised) ≤ high ≤ highest`. Tone
and shadow must **agree** — a raised (elevation-1+) chip is toned at or above its
host, never below it (the CheckpointItem fix, ADR 0024).

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-surface-container-lowest` | `#F1EBE0` | `#15110D` | Recessed wells (code blocks `pre`) |
| `--color-surface-container-low` | `#F7F2E9` | `#1E1914` | Gently raised (stepper track) |
| `--color-surface-container` | `#FBF7F0` | `#231E18` | Cards at rest (= `surface-raised`) |
| `--color-surface-container-high` | `#FEFAF4` | `#2A241D` | Elevation-2 cards step up in tone (MCQ / checkpoint) |
| `--color-surface-container-highest` | `#FFFDF8` | `#322B23` | Overlays / modals |

### 1.2 Border

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-border-subtle` | `#E6DECF` | `#352E26` | Very faint dividers, figure grids |
| `--color-border-soft` | `#D2C6B2` | `#473E33` | Visible borders, blockquote rules |

> Note: ADR 0023's **shadow-first cards** drop most drawn borders; the
> `elevation-1/2` hairline ring carries the edge. Borders remain for interactive
> option rows (state-semantic) and dashed "empty/placeholder" affordances.

### 1.3 Text

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-text-primary` | `#2A2018` | `#EFE8DC` | Body, headings, all primary reading text |
| `--color-text-secondary` | `#5C5043` | `#B5A893` | Captions, labels, secondary information |
| `--color-text-tertiary` | `#8A7E6E` | `#7E7264` | Metadata, quiet separators (large/UI/decorative only — below 4.5:1) |
| `--color-text-on-accent` | `#FFFDF8` | `#11302C` | Text on the accent fill (DARK is deep teal: the dark accent is light, so white would fail) |

### 1.4 Accent — signature deep teal (CSS variables)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-accent` (`accent.DEFAULT`) | `#1F6F6B` | `#5FB6AE` | Links, focus rings, eyebrows, the one primary action, key marks |
| `--color-accent-strong` (`accent.strong`) | `#185C58` | `#7FC8C0` | Hover / active (darkens in light, brightens in dark) |
| `--color-accent-light` (`accent.light`) | `#5FB6AE` | `#5FB6AE` | Lighter contexts; dark-mode `--figure-accent` |
| `--color-accent-subtle` (`accent.subtle`) | `#E4F0EE` | `#16312F` | Very light tint for hover backgrounds |

**Rule:** one **signature** accent, used sparingly, **promoted to a CSS variable**
(ADR 0023) so it themes centrally. It marks the primary action or the one thing
that matters per surface — never decorative, never a region wash.

### 1.5 Semantic — muted, never neon (ADR 0023)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-success` | `#3F6B4E` | `#7FB890` | Correct answer, positive feedback |
| `--color-success-subtle` | `#E8F0E6` | `#16271B` | Background of correct feedback |
| `--color-warning` | `#8A6A1E` | `#E0BE6E` | Caution states |
| `--color-warning-subtle` | `#F6EEDA` | `#2A2110` | Background of warning states |
| `--color-error` | `#9A3B2E` | `#E08C7E` | Incorrect answer, error states |
| `--color-error-subtle` | `#F6E6E1` | `#2C1611` | Background of error states |
| `--color-on-success` | `#FFFDF8` | `#112019` | Text/glyph on a FILLED success chip (dark = deep green: the dark success fill is light) |
| `--color-on-error` | `#FFFDF8` | `#2C1611` | Text/glyph on a FILLED error chip (dark = deep rust) |

**Rule:** semantic colors always paired with an icon, label, or shape — never
color alone conveys meaning (DESIGN-BIBLE §2, §9). The signature teal accent is
deliberately separated from these hues so a teal mark never reads as a warning.
The **on-colors** (ADR 0024) are for a letter/icon sitting ON a filled
success/error chip — in dark mode the fills are light, so white-on-fill fails;
the on-color is a dark ink instead.

### 1.6 Interaction state-layer (ADR 0024 — the one feedback language)

One neutral on-surface overlay (`.state-layer` `::after`) whose opacity steps with
interaction, applied UNIFORMLY to every interactive control so chrome and content
respond identically. Neutral (text-color) wash, **not** accent — the accent still
leads in exactly one place per surface. See COMPONENT-STATES.md §0.4.

| Token | Value | Meaning |
|---|---|---|
| `--state-color` | `var(--color-text-primary)` | The neutral wash color (darkens light / lightens dark) |
| `--state-hover` | `0.06` | Hover overlay opacity |
| `--state-pressed` | `0.10` | Pressed (`:active`) overlay opacity — **~10% is the hard ceiling** (above it the wash mutes content) |
| `--state-dragged` | `0.16` | **RESERVED** — no draggable surfaces today; kept for scale completeness |
| `--state-disabled` | `0.38` | The single dimmed/inert opacity (`.state-disabled`); replaces ad-hoc `opacity-40/50/80` |

Focus is **not** a state-layer — it stays the accent ring + jewel halo (§4).
`.btn-primary` carries its own on-accent overlay (hover 8% / active 12%).

---

## 2. Typography

### 2.1 Typefaces — editorial pairing (ADR 0023)

| Role | Font | Tailwind key | CSS var |
|---|---|---|---|
| **Lesson prose + ALL headings** | **Source Serif 4** | `font-serif` | `--font-reading-serif` |
| UI chrome, labels, controls, figure + math labels | IBM Plex Sans | `font-sans` | `--font-ibm-plex-sans` |
| Inline code, code blocks | IBM Plex Mono | `font-mono` | `--font-ibm-plex-mono` |

The reading serif carries warmth/scholarship for the heavy reading load. Plex
Sans keeps the unambiguous figures (1/l/I/0) where digits and variables are read
— chrome and inside figures. Headings **outside** `.prose-lesson` (notion
masthead `h1`, home `h1`, items `h2`, not-found) take an explicit `font-serif`.
KaTeX keeps its own math fonts.

### 2.2 Type scale

| Token | Size | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|
| `caption` | 0.75rem (12px) | 1.5 | +0.01em | Metadata, step counters, figcaptions |
| `body-sm` | 0.875rem (14px) | 1.5 | — | Secondary labels |
| `body` | 1rem (16px) | 1.5 | — | UI elements, buttons |
| `body-lg` | 1.0625rem (17px) | 1.6 | — | Lesson prose (`.prose-lesson`) |
| `lead` | 1.125rem (18px) | 1.55 | — | Introductory paragraphs |
| `h4` | 1.125rem (18px) | 1.4 | -0.01em | Subsection labels |
| `h3` | 1.25rem (20px) | 1.35 | -0.01em | Section headers |
| `h2` | 1.5rem (24px) | 1.3 | -0.015em | Major section breaks |
| `h1` | 1.875rem (30px) | 1.2 | -0.02em | Page / notion title (non-band surfaces) |
| `display` | 2.25rem (36px) | 1.15 | -0.025em | Periphery h1 (home), 404 hero |
| `display-lg` | 3.5rem (56px) | 1.06 | -0.03em | **The masthead-band tier** (Day-4 freeze, Set A = A3; FABLE-DECIDED / OWNER-REVIEW-PENDING). Exactly ONE display-voice moment per surface (DESIGN-BIBLE §3/§11); never in chrome. Title measure-capped ~26ch. |

All rem values are relative to `html { font-size: calc(16px * var(--font-scale, 1)) }`.
The `--font-scale` CSS var is controlled by FontSizeStepper (values: 0.9375 / 1 / 1.125).

### 2.3 Font weights

| Token | Value | Usage |
|---|---|---|
| `regular` | 400 | Body, secondary labels |
| `medium` | 500 | UI elements, h4 |
| `semibold` | 600 | In-prose headings, strong, button labels |
| `bold` | 700 | Serif display/masthead headings (ADR 0023) |

> ADR 0023 tightened tracking on display/heading sizes (display `-0.03em`, h1
> `-0.022em`, h2 `-0.018em`) and loosened it on captions / uppercase eyebrows
> (`+0.02em` / `0.14em`). See `tailwind.config.ts` `fontSize`.
>
> **Masthead band (Day-4 freeze — DESIGN-BIBLE §11, spec
> PAGE-ANATOMY-SPECS.md):** full-bleed `--color-surface-container-low` plane,
> `border-b` subtle hairline, `py-12` (48px) vertical padding, content on the
> page spine; carries the `display-lg` title + the metadata line
> (`text-body-sm`, secondary, `mt-4`). Notion/lesson surfaces only.
>
> **twMerge registration rule (audit U1 — enforced by dom-truth):** every
> custom `fontSize` key here MUST also be registered in the `font-size`
> classGroup in `web/src/lib/utils.ts` in the same commit, or tailwind-merge
> silently deletes it at runtime.

### 2.4 Measure tokens

| CSS var | Value | Usage |
|---|---|---|
| `--measure-prose` | `65ch` | **Canonical prose line length.** Used by `.prose-lesson` and `.notion-prose`. |
| `--measure-wide` | `72ch` | Wider prose (items with options, intro cards). |
| `--measure-lead` | `52ch` | Standfirst / intro lead — tighter than body (ADR 0024); Tailwind `max-w-lead`. |
| `--measure-list` | `42rem` | Home notion-card column — one cap per spine (ADR 0024); Tailwind `max-w-list`. |

`--measure-prose` is the source of truth. The Tailwind `maxWidth.reading: "65ch"` and
`maxWidth.content: "72ch"` mirror it but are secondary. Every measure cap resolves to
a token — components must use `var(--measure-*)` (or the Tailwind `max-w-*` aliases),
not hard-coded `ch` values (ADR 0024 — no magic measures).

---

## 3. Spacing — 8-pt grid

All spacing is multiples of 8px (the Tailwind default scale: 1 unit = 4px, so
`gap-2` = 8px, `gap-4` = 16px, etc.). The 4px half-step is available for
tight icon-to-label pairings. No custom spacing tokens are defined — the default
Tailwind scale maps directly to the grid.

| Grid unit | px | Tailwind class |
|---|---|---|
| 0.5 | 2px | `p-0.5` (pixel-level adjustment only) |
| 1 | 4px | `gap-1`, `p-1` (icon-label tight pair) |
| 2 | 8px | `gap-2`, `p-2` |
| 4 | 16px | `gap-4`, `p-4` |
| 6 | 24px | `gap-6`, `p-6` |
| 8 | 32px | `gap-8`, `p-8` |
| 12 | 48px | `gap-12`, `py-12` |
| 16 | 64px | `gap-16` (section breaks, generous whitespace) |

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` / `rounded-[4px]` | 4px | Focus ring, inline code, small chips |
| `rounded` / `rounded-md` | 8px | Buttons, inputs, cards (default) |
| `rounded-lg` | 12px | Panels, motion stage |
| `rounded-xl` | 16px | Large cards, embed containers |
| `rounded-2xl` | 20px | Hero areas |
| `rounded-full` | 9999px | Pills, avatars |

---

## 5. Motion

### 5.1 Duration

| Token | Value | Usage |
|---|---|---|
| `duration-micro` | 150ms | Hover color, focus ring appearance, icon swaps |
| `duration-standard` | 250ms | Panel enter/exit, tooltip, badge state change |
| `duration-slow` | 400ms | Enter-deep-study transition only (DESIGN-BIBLE §5) |

### 5.2 Easing curves

| Token | Curve | Usage |
|---|---|---|
| `ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements arriving (decelerate) |
| `ease-leave` | `cubic-bezier(0.4, 0, 1, 1)` | Elements departing (accelerate) |
| `ease-between` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transitioning between states |
| `ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | **Premium decelerate.** Strong initial velocity, gentle deliberate settle. Beat entrances, panel slides, KaTeX term assembly. No overshoot. |
| `ease-standard-svg` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | **CSS analogue of GSAP power2.out.** For SVG-adjacent CSS transitions (wrapper highlight fills, hover tints on figure containers). The GSAP motion engine uses its own ease registry directly on timeline tweens. |

**HARD RULE — never bounce, never overshoot, never elastic, anywhere in the
learning core.** Spring / bounce curves are the texture of a game. This product
is a calm study environment. Any curve with `y > 1` or `y < 0` at any point is
prohibited. The calm-load critic treats any overshoot as a blocking issue.

---

## 6. Elevation Scale

5-step scale (ADR 0022). Tailwind classes: `shadow-elevation-0` … `shadow-elevation-4`.
Values live in `--elevation-N` CSS vars in `:root` (light) and `.dark` (dark).

### 6.1 Light mode — WARM-tinted drops; 1/2 lead with a hairline RING (ADR 0023)

`elevation-1/2` start with `0 0 0 1px rgba(60,45,30,.0N)` so shadow-first cards
drop their borders and still hold a crisp edge on the low-contrast ivory.

| Level | CSS var value | Tailwind class | Usage |
|---|---|---|---|
| 0 | `none` | `shadow-elevation-0` | Flat (no lift). Inline SVG elements, flush rows. |
| 1 | `0 0 0 1px rgba(60,45,30,.05), 0 1px 2px -1px rgba(60,45,30,.08), 0 2px 6px 0 rgba(60,45,30,.06)` | `shadow-elevation-1` | Figure/motion/embed panels, cards at rest, stepper track. |
| 2 | `0 0 0 1px rgba(60,45,30,.06), 0 2px 4px -2px rgba(60,45,30,.08), 0 8px 20px -2px rgba(60,45,30,.10)` | `shadow-elevation-2` | Checkpoint + MCQ cards, primary button, lifted stepper thumb. |
| 3 | `0 6px 12px -4px rgba(60,45,30,.10), 0 14px 34px -4px rgba(60,45,30,.14)` | `shadow-elevation-3` | Site header after scroll (floating). |
| 4 | `0 10px 22px -6px rgba(60,45,30,.12), 0 24px 56px -8px rgba(60,45,30,.18)` | `shadow-elevation-4` | Modals, overlays, popovers. |

> The legacy `shadow-subtle` / `shadow-soft` aliases still carry the OLD cool
> values — prefer the warm `elevation-N` names in new code.

### 6.2 Dark mode — layered luminance + a warm perimeter ring (ADR 0023)

Dark elevation = a warm top-edge **inset** hairline (`inset 0 1px 0 0
rgba(255,250,240,.0N)`, a lit top edge) + a soft dark drop; `1/2` add a warm
**perimeter ring** so shadow-first cards hold their edge on the warm charcoal.

| Level | CSS var value (dark) |
|---|---|
| 0 | `none` |
| 1 | `0 0 0 1px rgba(255,250,240,.05), 0 1px 3px 0 rgba(0,0,0,.24), inset 0 1px 0 0 rgba(255,250,240,.05)` |
| 2 | `0 0 0 1px rgba(255,250,240,.06), 0 2px 8px 0 rgba(0,0,0,.28), inset 0 1px 0 0 rgba(255,250,240,.06)` |
| 3 | `0 6px 20px 0 rgba(0,0,0,.34), inset 0 1px 0 0 rgba(255,250,240,.07)` |
| 4 | `0 10px 32px 0 rgba(0,0,0,.42), inset 0 1px 0 0 rgba(255,250,240,.09)` |

### 6.3 Usage guide

| Surface | Elevation |
|---|---|
| Inline figure elements, flush rows | 0 |
| Figure panels (MotionStage, MediaDiagram, EmbedPanel at rest) | 1 |
| Checkpoint cards, MCQ option containers | 2 |
| Site header (after first scroll only) | 3 |
| Modals, overlays, command palette | 4 |

**Backward compatibility.** `shadow-subtle` and `shadow-soft` are kept as-is and
are conceptually equivalent to elevation-1 and elevation-2 respectively. Do not
remove them; new code should prefer the `elevation-N` names.

---

## 7. Figure Role Palette

Canonical colors for all motion/figure SVGs. **ADR 0023 re-tuned these warm** to
match the ivory/charcoal world (the surface/ink follow the warm UI family; the
energy/régime role hues stay Okabe-Ito-distinguishable and INDEPENDENT of the
signature accent, so the accent can change without breaking figures).

**All figures must use these CSS vars.** Hard-coded colors in SVG files are
forbidden. The SVG elements reference `var(--figure-*)` so re-tuning here re-skins
every figure with zero per-file edits; dark-mode just works.

### 7.1 Surface and ink (warm UI family)

| CSS var | Light value | Dark value | Usage |
|---|---|---|---|
| `--figure-surface` | `#FBF7F0` | `#231E18` | Figure background / container fill (= surface-raised) |
| `--figure-ink` | `#2A2018` | `#EFE8DC` | Primary labels, axis text, strokes |
| `--figure-ink-soft` | `#5C5043` | `#B5A893` | Secondary labels, tick marks, units |
| `--figure-grid` | `#E6DECF` | `#352E26` | Grid lines, axis guides |
| `--figure-accent` | `var(--color-accent)` `#1F6F6B` | `var(--color-accent-light)` `#5FB6AE` | Emphasis, pointers, active curve segments (follows the signature) |

### 7.2 Energy role colors

Color-blind distinguishable. Slate-blue (denim) vs. teal-green: distinguishable
under protanopia, deuteranopia, tritanopia. The denim was desaturated from a
cobalt (ADR 0023 converge) so it harmonizes with the warm world while keeping the
blue hue for distinction.

| CSS var | Light | Dark | Physical role |
|---|---|---|---|
| `--figure-energy-C` | `#4C6088` | `#7E93BE` | Capacitor energy $E_C = \frac{q^2}{2C}$ (slate-blue) |
| `--figure-energy-L` | `#3C7A5E` | `#5FA886` | Inductor energy $E_L = \frac{Li^2}{2}$ (teal-green) |

The two bars/areas in an energy-exchange animation MUST use these two vars — never
ad-hoc colors.

### 7.3 Regime role colors

Three regimes must be simultaneously distinguishable (three-hue strategy:
slate-blue / warm-brown / muted plum — safe under common color-vision
deficiencies).

| CSS var | Light | Dark | Regime |
|---|---|---|---|
| `--figure-regime-periodic` | `#4C6088` | `#7E93BE` | Régime périodique (undamped oscillation) |
| `--figure-regime-pseudo` | `#9A6B3C` | `#C49A6C` | Régime pseudo-périodique (underdamped) |
| `--figure-regime-aperiodic` | `#6E4A86` | `#A98BD0` | Régime apériodique (overdamped) |

When all three traces appear on one axis, the reading order (top-to-bottom or
legend order) must be: périodique → pseudo → apériodique (matches increasing
damping, natural physical progression).

---

## 8. Usage Rules Summary

| What you're building | Tokens to reach for |
|---|---|
| Page background | `bg-surface-base` |
| Card / panel (shadow-first, no border) | `bg-surface-raised shadow-elevation-1` |
| Modal / overlay | `bg-surface-overlay shadow-elevation-4` |
| Prose body text + headings | `.prose-lesson` (serif, `max-width: var(--measure-prose)`) |
| Heading outside prose | `font-serif text-h1/display font-bold` |
| Secondary label | `text-secondary text-caption` |
| Eyebrow (the ONE per surface) | accent hairline `<span class="h-px w-6 bg-accent/60">` + `uppercase tracking-eyebrow text-accent` |
| **The one** primary action | `.btn-primary` (deep-teal fill, `text-on-accent`, elevation-2 → hover accent-strong) — used sparingly |
| Quiet / secondary control | ghost: `text-secondary border-soft` or text-only |
| Focus ring | `.focus-ring` class (or global `:focus-visible` catch-all) — 2px accent, 6px radius |
| Success state | `text-success bg-success-subtle` + icon |
| Error state | `text-error bg-error-subtle` + icon |
| Figure container | `bg-figure-surface` with `--figure-*` vars on SVG children |
| Elevation (figure panel) | `shadow-elevation-1` |
| Elevation (checkpoint) | `shadow-elevation-2` |
| Elevation (floating header) | `shadow-elevation-3` |
| Standard enter transition | `duration-standard ease-enter` |
| Beat entrance (GSAP) | `ease-emphasized` (via GSAP `power3.out` equivalent) |

---

## Changelog

- **v2 — 2026-08-05 (Phase A: full systemization).** Single source of truth
  moved to `web/src/lib/tokens.ts`; `tokens.generated.css` now carries the
  `:root`/`.dark` blocks (globals.css `@import`s it); tailwind.config, dom-truth,
  and `cn()` all derive from `tokens.ts`. Added the eyebrow-tracking, touch-
  target, and z-index token families and the missing motion CSS vars
  (`--duration-slow`, `--ease-enter/leave/emphasized/standard-svg`); removed the
  dead `shadow-subtle`/`soft` aliases. Component code migrated to named aliases
  (429 arbitrary usages codemodded); `scripts/token-gate.mjs` now bars new
  arbitraries; dom-truth gained the token-parity sweep + cn() tripwire.
  Documented the previously code-only tokens (§0). No token VALUES changed.
- **v1** — ADR 0022 → 0023 (warm-editorial) → 0024 (Hybrid-Material). See §1–§8.
