# Design Tokens — Canonical Reference

> **Authority:** ADR 0022. This document discharges the DESIGN-BIBLE appendix's
> explicitly-deferred "concrete tokens — the first concrete step of building the
> UI, not yet settled." It is the single source of truth for every token.
>
> **Implementation:** `web/src/app/globals.css` (CSS custom properties) and
> `web/tailwind.config.ts` (Tailwind mappings to those vars). All component
> code consumes the CSS vars or Tailwind aliases; hard-coded hex is forbidden.
>
> **Living document.** Add tokens here before implementing them. Remove nothing
> without a migration note.

---

## 1. Color Palette

### 1.1 Surface (light / dark)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-surface-base` | `#F5F6F8` | `#14181F` | Page background |
| `--color-surface-raised` | `#FAFBFC` | `#1C2230` | Cards, panels, raised elements |
| `--color-surface-overlay` | `#FFFFFF` | `#242B3B` | Modals, tooltips, overlays |

### 1.2 Border

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-border-subtle` | `#E4E7ED` | `#2A3245` | Very faint dividers, figure grids |
| `--color-border-soft` | `#CDD3DE` | `#3A4560` | Visible borders, blockquote rules |

### 1.3 Text

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-text-primary` | `#1A2332` | `#E8ECF2` | Body, headings, all primary reading text |
| `--color-text-secondary` | `#4A5568` | `#9AAABF` | Captions, labels, secondary information |
| `--color-text-tertiary` | `#7A8899` | `#5E7289` | Metadata, step indicators, placeholders |
| `--color-text-on-accent` | `#FFFFFF` | `#FFFFFF` | Text on accent-colored backgrounds |

### 1.4 Accent

| Token | Value | Usage |
|---|---|---|
| `accent.DEFAULT` | `#3E5C86` | Primary CTA, links, focus rings, key marks |
| `accent.light` | `#7E9CC8` | Lighter variant for dark-mode figures |
| `--color-accent-subtle` | `#EBF0F8` / `#1E2E46` (dark) | Hover background tint on accent targets |

**Rule:** one accent, used sparingly. It marks the primary action or the one
thing that matters. Never decorative.

### 1.5 Semantic

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-success` | `#2D6A4F` | `#4ADE80` | Correct answer, positive feedback |
| `--color-success-subtle` | `#EAF4EE` | `#0F2B1A` | Background of correct feedback |
| `--color-warning` | `#7D5A00` | `#FCD34D` | Caution states |
| `--color-warning-subtle` | `#FFF8E6` | `#2B2000` | Background of warning states |
| `--color-error` | `#8B2020` | `#F87171` | Incorrect answer, error states |
| `--color-error-subtle` | `#FDF0F0` | `#2B0F0F` | Background of error states |

**Rule:** semantic colors always paired with an icon, label, or shape — never
color alone conveys meaning (DESIGN-BIBLE §2, §9).

---

## 2. Typography

### 2.1 Typefaces

| Role | Font | Tailwind key |
|---|---|---|
| UI + body + math prose | IBM Plex Sans | `font-sans` |
| Inline code, code blocks | IBM Plex Mono | `font-mono` |

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
| `h1` | 1.875rem (30px) | 1.2 | -0.02em | Page / notion title |
| `display` | 2.25rem (36px) | 1.15 | -0.025em | Hero / splash only |

All rem values are relative to `html { font-size: calc(16px * var(--font-scale, 1)) }`.
The `--font-scale` CSS var is controlled by FontSizeStepper (values: 0.9375 / 1 / 1.125).

### 2.3 Font weights

| Token | Value | Usage |
|---|---|---|
| `regular` | 400 | Body, secondary labels |
| `medium` | 500 | UI elements, h4 |
| `semibold` | 600 | Headings h1–h3, strong, button labels |

### 2.4 Measure tokens

| CSS var | Value | Usage |
|---|---|---|
| `--measure-prose` | `65ch` | **Canonical prose line length.** Used by `.prose-lesson` and `.notion-prose`. |
| `--measure-wide` | `72ch` | Wider prose (items with options, intro cards). |

`--measure-prose` is the source of truth. The Tailwind `maxWidth.reading: "65ch"` and
`maxWidth.content: "72ch"` mirror it but are secondary. Components that set prose width
must use `var(--measure-prose)` (or the CSS classes), not hard-coded `65ch`.

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

### 6.1 Light mode — tinted blue-gray drop shadows

| Level | CSS var value | Tailwind class | Usage |
|---|---|---|---|
| 0 | `none` | `shadow-elevation-0` | Flat (no lift). Inline SVG elements, flush table rows. |
| 1 | `0 1px 2px -1px rgba(30,45,70,.06), 0 1px 3px 0 rgba(30,45,70,.05)` | `shadow-elevation-1` | Figure panels, cards at rest. Also aliased as `shadow-subtle`. |
| 2 | `0 2px 4px -2px rgba(30,45,70,.06), 0 4px 12px 0 rgba(30,45,70,.08)` | `shadow-elevation-2` | Checkpoints, raised interactive cards. Also aliased as `shadow-soft`. |
| 3 | `0 4px 8px -3px rgba(30,45,70,.08), 0 8px 24px -2px rgba(30,45,70,.10)` | `shadow-elevation-3` | Site header after scroll (floating). Dropdowns at rest. |
| 4 | `0 8px 16px -4px rgba(30,45,70,.10), 0 16px 40px -4px rgba(30,45,70,.14)` | `shadow-elevation-4` | Modals, overlays, popovers. |

### 6.2 Dark mode — layered luminance (not heavy black blobs)

In dark mode, elevation reads as a subtle lighter top-edge hairline (`inset 0 1px 0 0
rgba(255,255,255,.0N)`) plus a soft dark drop. The hairline mimics the physics of a
slightly lighter facing surface. Larger N = more hairline opacity + larger drop.

| Level | CSS var value (dark) |
|---|---|
| 0 | `none` |
| 1 | `0 1px 3px 0 rgba(0,0,0,.18), inset 0 1px 0 0 rgba(255,255,255,.04)` |
| 2 | `0 2px 6px 0 rgba(0,0,0,.22), inset 0 1px 0 0 rgba(255,255,255,.05)` |
| 3 | `0 4px 16px 0 rgba(0,0,0,.28), inset 0 1px 0 0 rgba(255,255,255,.06)` |
| 4 | `0 8px 28px 0 rgba(0,0,0,.36), inset 0 1px 0 0 rgba(255,255,255,.08)` |

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

Canonical colors for all motion/figure SVGs authored from Phase 2 onward (ADR 0022).
This replaces the drifted warm palette (`#F5F3EF` / `#2A2A2E`) the first-pass SVGs used.

**All figures must use these CSS vars.** Hard-coded colors in SVG files are forbidden
after Phase 2. The SVG elements reference `var(--figure-*)` so dark-mode just works.

### 7.1 Surface and ink

| CSS var | Light value | Dark value | Usage |
|---|---|---|---|
| `--figure-surface` | `#FAFBFC` | `#1C2230` | Figure background / container fill |
| `--figure-ink` | `#1A2332` | `#E8ECF2` | Primary labels, axis text, strokes |
| `--figure-ink-soft` | `#4A5568` | `#9AAABF` | Secondary labels, tick marks, units |
| `--figure-grid` | `#E4E7ED` | `#2A3245` | Grid lines, axis guides |
| `--figure-accent` | `#3E5C86` | `#7E9CC8` | Emphasis, pointers, active curve segments |

### 7.2 Energy role colors

Color-blind distinguishable (Okabe-Ito safe subset, shifted to the blue family).
Blue vs. teal-green: distinguishable under protanopia, deuteranopia, tritanopia.

| CSS var | Light | Dark | Physical role |
|---|---|---|---|
| `--figure-energy-C` | `#3E7BC2` | `#6BA3D9` | Capacitor energy $E_C = \frac{q^2}{2C}$ |
| `--figure-energy-L` | `#2D7A5F` | `#52A882` | Inductor energy $E_L = \frac{Li^2}{2}$ |

The two bars/areas in an energy-exchange animation MUST use these two vars — never
ad-hoc colors.

### 7.3 Regime role colors

Three regimes must be simultaneously distinguishable (three-hue strategy: blue /
warm-brown / purple — safe under common color-vision deficiencies).

| CSS var | Light | Dark | Regime |
|---|---|---|---|
| `--figure-regime-periodic` | `#3E5C86` | `#7E9CC8` | Régime périodique (undamped oscillation) |
| `--figure-regime-pseudo` | `#8B5E3C` | `#C49A6C` | Régime pseudo-périodique (underdamped) |
| `--figure-regime-aperiodic` | `#5C3E86` | `#9B7EC8` | Régime apériodique (overdamped) |

When all three traces appear on one axis, the reading order (top-to-bottom or
legend order) must be: périodique → pseudo → apériodique (matches increasing
damping, natural physical progression).

---

## 8. Usage Rules Summary

| What you're building | Tokens to reach for |
|---|---|
| Page background | `bg-surface-base` |
| Card / panel | `bg-surface-raised shadow-elevation-1` |
| Modal / overlay | `bg-surface-overlay shadow-elevation-4` |
| Prose body text | `.prose-lesson` class (includes `max-width: var(--measure-prose)`) |
| Secondary label | `text-text-secondary text-caption` |
| Accent button | `bg-accent text-text-onAccent` |
| Focus ring | `.focus-ring` class (or global `:focus-visible` catch-all) |
| Success state | `text-success bg-success-subtle` + icon |
| Error state | `text-error bg-error-subtle` + icon |
| Figure container | `bg-figure-surface` with `--figure-*` vars on SVG children |
| Elevation (figure panel) | `shadow-elevation-1` |
| Elevation (checkpoint) | `shadow-elevation-2` |
| Elevation (floating header) | `shadow-elevation-3` |
| Standard enter transition | `duration-standard ease-enter` |
| Beat entrance (GSAP) | `ease-emphasized` (via GSAP `power3.out` equivalent) |
