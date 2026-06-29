# Design Tokens — Canonical Reference

> **Authority:** ADR 0022, **re-tuned warm by ADR 0023.** This document
> discharges the DESIGN-BIBLE appendix's deferred "concrete tokens." It is the
> single source of truth for every token.
>
> **ADR 0023 (warm-editorial) changed the VALUES below, not the structure:** the
> palette is now warm ivory/charcoal with a **deep-teal signature accent** (was
> cool blue-gray); typography is an **editorial serif + Plex sans pairing** (was
> sans-only); `elevation-1/2` lead with a faint hairline **ring** for shadow-first
> cards; semantics are muted (not neon). The scale/mechanism (5-step elevation,
> easing curves, figure `var(--figure-*)` indirection) is unchanged.
>
> **Implementation:** `web/src/app/globals.css` (CSS custom properties) and
> `web/tailwind.config.ts` (Tailwind mappings to those vars). All component
> code consumes the CSS vars or Tailwind aliases; hard-coded hex is forbidden.
>
> **Living document.** Add tokens here before implementing them. Remove nothing
> without a migration note.

---

## 1. Color Palette

> **ADR 0023 — warm-editorial palette.** All values below are the warm ramps.

### 1.1 Surface (light / dark)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--color-surface-base` | `#F4EFE6` | `#1A1612` | Page background (warm ivory / charcoal) |
| `--color-surface-raised` | `#FBF7F0` | `#231E18` | Cards, panels, raised elements |
| `--color-surface-overlay` | `#FFFDF8` | `#2C261F` | Modals, tooltips, overlays |

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

**Rule:** semantic colors always paired with an icon, label, or shape — never
color alone conveys meaning (DESIGN-BIBLE §2, §9). The signature teal accent is
deliberately separated from these hues so a teal mark never reads as a warning.

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
| `h1` | 1.875rem (30px) | 1.2 | -0.02em | Page / notion title |
| `display` | 2.25rem (36px) | 1.15 | -0.025em | Hero / splash only |

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
| Secondary label | `text-text-secondary text-caption` |
| Eyebrow (the ONE per surface) | accent hairline `<span class="h-px w-6 bg-accent/60">` + `uppercase tracking-[0.14em] text-accent` |
| **The one** primary action | `.btn-primary` (deep-teal fill, `text-on-accent`, elevation-2 → hover accent-strong) — used sparingly |
| Quiet / secondary control | ghost: `text-text-secondary border-border-soft` or text-only |
| Focus ring | `.focus-ring` class (or global `:focus-visible` catch-all) — 2px accent, 6px radius |
| Success state | `text-success bg-success-subtle` + icon |
| Error state | `text-error bg-error-subtle` + icon |
| Figure container | `bg-figure-surface` with `--figure-*` vars on SVG children |
| Elevation (figure panel) | `shadow-elevation-1` |
| Elevation (checkpoint) | `shadow-elevation-2` |
| Elevation (floating header) | `shadow-elevation-3` |
| Standard enter transition | `duration-standard ease-enter` |
| Beat entrance (GSAP) | `ease-emphasized` (via GSAP `power3.out` equivalent) |
