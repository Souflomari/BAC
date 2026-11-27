# Component States — Interaction Reference

> **Authority:** ADR 0022 → ADR 0023 (warm-editorial) → **ADR 0024 (the
> state-layer model — current).** This document defines the concrete interaction
> states for every interactive surface. Critics and authors use it as the
> checkable bar for "premium" micro-craft.
>
> **ADR 0024 deltas (READ FIRST — these supersede the per-component hover columns
> below where they conflict):** hover/pressed feedback is now ONE neutral
> `.state-layer` wash on every interactive control (not per-component
> `accent-subtle` washes); disabled is the single `.state-disabled` treatment
> (`--state-disabled .38`, was 40%); the focus ring radius **tracks the host**
> (`--focus-radius`: 8px on rounded-md/rounded chrome, 12px on `.btn-primary`,
> 16px on cards) rather than a flat 6px; the two motion engines share one
> `TransportButton`. See **§0.4** below.
>
> **ADR 0023 deltas:** the focus ring is the **accent CSS variable** (was
> hardcoded `#3E5C86`); cards are **shadow-first** (the `elevation-1/2` hairline
> ring replaces drawn borders); a single **`.btn-primary`** is the one confident
> accent action per surface (see §Primary Button).
>
> **Token references:** `docs/design/TOKENS.md` for all values.
> **Focus utility:** `.focus-ring` class (see §Focus Ring below).
> **Floor:** ≥48px touch target height on all interactive elements.
> **Color-not-alone rule:** correctness states always pair color with
> icon or text — never color alone (DESIGN-BIBLE §2, §9).

---

## 0.4 The state-layer interaction model (ADR 0024 — the one feedback language)

This is the **current authority** for hover/pressed/disabled feedback. Where an
older per-component table below still says "hover: `accent-subtle`", read it as
**superseded by the neutral state-layer wash** described here — the accent no
longer washes interactive surfaces on hover (it leads in exactly one place per
surface; the wash is neutral).

**`.state-layer`** — add to any interactive element. A neutral on-surface
`::after` overlay (`background: --state-color` = text-primary) whose opacity
steps with interaction. `position: relative` + `border-radius: inherit` are
handled by the utility; content reads through the low-opacity wash, so no child
z-index juggling is needed.

| State | Overlay opacity | Token |
|---|---|---|
| rest | 0 | — |
| hover | **6%** | `--state-hover: 0.06` |
| pressed (`:active`) | **10%** | `--state-pressed: 0.10` |
| dragged | 16% (**reserved** — no draggable surfaces today) | `--state-dragged: 0.16` |

**~10% is the hard ceiling** for the neutral wash — above it the overlay starts
to mute the content reading through it. The overlay transitions on
`--duration-micro --ease-between`. **Never a ripple.**

**`.state-disabled`** — the single dimmed/inert treatment: `opacity:
var(--state-disabled)` (0.38) + `pointer-events: none`. Replaces the scattered
`opacity-40/50/80`.

**Focus is NOT a state-layer.** Focus stays the accent ring + jewel halo
(`:focus-visible`), with the radius matched to the host via `--focus-radius`
(see §1).

**`.btn-primary`** carries its own on-accent state-layer (`::after`,
`background: --color-text-on-accent`, hover 8% / active 12%) so the one filled
action shares the vocabulary; its hover does NOT also leap elevation (two cues —
overlay + fill-shift; elevation only drops on press).

**Coverage (every interactive control carries `.state-layer`):** home notion
cards, MCQ + checkpoint option rows, the `TransportButton` (both motion engines),
the FontSizeStepper thumbs (incl. the active thumb), SiteHeader wordmark + nav,
EmbedPanel external links, the McqItem "Voir la solution complète" `<summary>`,
and `.btn-primary`. A new interactive component MUST adopt `.state-layer` rather
than inventing a hover treatment — this is a component-quality gate (ADR 0024).

---

## 0. State taxonomy

Every interactive surface cycles through some subset of these states. Not
every state applies to every component — the tables below list only the
applicable ones.

| State | Trigger |
|---|---|
| **rest** | Default — no user interaction |
| **hover** | Mouse cursor over (desktop only; collapses to tap on touch) |
| **focus-visible** | Keyboard focus (`:focus-visible` pseudo-class) |
| **active** | Mouse/touch pressed (`:active` pseudo-class), held |
| **disabled** | Interaction blocked (`disabled` attribute or `aria-disabled`) |
| **loading** | Async operation in progress (button after submit, etc.) |
| **empty** | Control has no value / no content to show |
| **error** | Validation or network failure |

---

## 1. Focus Ring — the shared utility

**CSS class:** `.focus-ring` (defined in `globals.css`, `@layer components`)

```css
.focus-ring:focus-visible {
  outline: 2px solid var(--color-accent);   /* signature teal, ADR 0023 */
  outline-offset: 2px;
  border-radius: var(--focus-radius, 6px);  /* tracks the host, ADR 0024 */
  box-shadow: 0 0 0 4px var(--focus-halo);  /* jewel halo, ADR 0023 polish */
}
```

Usage: add `focus-ring` to any interactive element's class list. The class
applies the ring only on `:focus-visible` (keyboard / assistive-technology
focus) — it does not appear on mouse click, preserving the clean visual for
mouse users while ensuring keyboard navigators always see a clear indicator.

**Host-matched radius (ADR 0024).** The outline rounds to `--focus-radius` so its
corners track the host's own corner instead of a flat 6px. Set it per control to
the host's radius: **8px** on `rounded-md`/`rounded` (8px) chrome (transport
buttons, FontSizeStepper, SiteHeader wordmark + nav, EmbedPanel links, McqItem
summary) via `[--focus-radius:8px]`; **12px** on `.btn-primary` (radius `lg`);
**16px** on cards (radius `xl`) via `[--focus-radius:16px]`. The default (6px)
applies where no host override is set.

The **global catch-all** `html :focus-visible { ... }` in `globals.css`
applies the same styling to every focusable element that does not carry an
explicit override. The `.focus-ring` class exists so future component-specific
overrides (e.g., a focus ring that follows a non-rectangular shape) have a
clear migration path.

### Focus Ring Migration List

The following files currently use the ad-hoc Tailwind utility chain:
```
focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2
```

**DO NOT migrate these in Phase 1.** The global catch-all already provides
visual parity. Migrate file-by-file in a later pass, after critics have
validated the token set and after MotionStage is built (Phase 2).

| File | Occurrences |
|---|---|
| `src/app/not-found.tsx` | 1 |
| `src/app/notions/[subject]/[slug]/page.tsx` | 1 |
| `src/app/page.tsx` | 1 |
| `src/components/notion/EmbedPanel.tsx` | 3 |
| `src/components/notion/CheckpointItem.tsx` | 1 |
| `src/components/ui/SiteHeader.tsx` | 2 |
| `src/components/notion/McqItem.tsx` | 2 |
| `src/components/ui/FontSizeStepper.tsx` | 1 |
| `src/components/notion/MarginRail.tsx` | 1 |
| `src/components/notion/MotionDiagram.tsx` | 1 |

---

## 2. Buttons and Primary Controls

### 2.1 Primary Button — `.btn-primary` (the ONE accent action, ADR 0023)

Concrete CSS class in `globals.css` (`@layer components`). Used **sparingly** —
only the genuine primary action of a surface (e.g. "open the interactive
sandbox"); every other control stays quiet (ghost/secondary). Deep-teal fill;
on-accent text (warm-white in light, **deep teal** `#11302C` in dark — the dark
accent is light, so white would fail contrast). Touch target: min-height 48px.

| State | Background | Text | Border | Shadow | Transition |
|---|---|---|---|---|---|
| rest | `accent` (`#1F6F6B` / dark `#5FB6AE`) | `text-on-accent` | none | `elevation-2` | — |
| hover | `accent-strong` (`#185C58` / dark `#7FC8C0`) | `text-on-accent` | none | `elevation-3` | 150ms `ease-between` |
| focus-visible | `accent` | `text-on-accent` | `:focus-visible` outline | `elevation-2` | 150ms |
| active | `accent-strong` | `text-on-accent` | none | `elevation-1` (pressed in) | 150ms |
| disabled | `accent` at 40% opacity | `text-on-accent` at 40% | none | none | — |

### 2.2 Secondary Button (border + surface)

Used for: Précédent/Suivant/Recommencer controls, secondary actions.

| State | Background | Text | Border | Shadow | Transition |
|---|---|---|---|---|---|
| rest | `surface-raised` | `text-secondary` | `border-subtle` | `elevation-0` | — |
| hover | `surface-raised` | `text-primary` | `border-soft` | `elevation-1` | 150ms `ease-enter` |
| focus-visible | `surface-raised` | `text-primary` | `.focus-ring` outline | `elevation-1` | 150ms |
| active | `surface-base` | `text-primary` | `border-soft` | `elevation-0` | 100ms `ease-leave` |
| disabled | `surface-raised` at 40% opacity | `text-tertiary` | `border-subtle` at 40% | none | — |

### 2.3 Ghost Button / Icon Button

Used for: close buttons, toolbar icons, font-size stepper.

| State | Background | Foreground | Transition |
|---|---|---|---|
| rest | transparent | `text-secondary` | — |
| hover | `accent-subtle` | `text-primary` | 150ms `ease-enter` |
| focus-visible | transparent | `text-primary` | `.focus-ring` outline |
| active | `border-subtle` | `text-primary` | 100ms `ease-leave` |
| disabled | transparent | `text-tertiary` at 40% | — |

---

## 3. MotionStage Controls (Précédent / Suivant / Recommencer)

These are Secondary Buttons (§2.2) with the following additions.

| State | Additional behavior |
|---|---|
| rest (Précédent at step 1) | `disabled` state — 40% opacity, cursor-not-allowed |
| rest (Suivant at last step) | Label changes to "Recommencer" + reset icon |
| focus-visible | `.focus-ring` outline (already on the secondary button) |
| active | Brief 100ms scale-down (scale 0.97) to give tactile press feedback — `ease-leave` |

**Step indicator** (`Étape N / N`):
- Text: `text-secondary`, `body-sm`, `tabular-nums` (functional UI text — must
  clear the 4.5:1 contrast floor, so secondary not tertiary)
- `aria-live="polite" aria-atomic="true"` — screen reader announces on change
- No interactive state (it is display-only)

**Reduced-motion mode:** the controls STAY VISIBLE and the student still drives
the reveal — each "Suivant"/"Précédent"/"Recommencer" SEEKS the beat-spec
timeline instantly to its settled state (zero animation), so the click-to-advance
learning interaction (the term-by-term equation build, the regime reveal) is
preserved for exactly the users §9 protects. The engine branches on a
`reduced` flag (it does not hide the controls). [Corrected — an earlier draft
said "controls hidden + static notice"; that would strip the interaction from
reduced-motion users and is wrong.]

---

## 4. MCQ / Checkpoint Option Cards

### 4.1 MCQ option (before answer)

Each option is a `<button>` wrapping the option text.
Touch target: full card height ≥48px.

| State | Background | Border | Text | Shadow |
|---|---|---|---|---|
| rest | `surface-raised` | `border-subtle` | `text-primary` | `elevation-1` |
| hover | `accent-subtle` | `border-soft` | `text-primary` | `elevation-2` |
| focus-visible | `surface-raised` | `.focus-ring` outline | `text-primary` | `elevation-2` |
| active (pressed) | `accent-subtle` | `border-soft` | `text-primary` | `elevation-0` (pressed) |

### 4.2 MCQ option (after answer — correctness states)

Color-not-alone rule: correctness is indicated by background color + border
color + icon + text label. Never color alone.

| State | Background | Border | Left indicator | Text |
|---|---|---|---|---|
| correct | `success-subtle` | `success` | ✓ icon (`success` color) | `text-primary` |
| incorrect (chosen) | `error-subtle` | `error` | ✗ icon (`error` color) | `text-primary` |
| incorrect (not chosen) | `surface-raised` | `border-subtle` | — | `text-secondary` |
| correct (not chosen) | `success-subtle` (revealed) | `success` | ✓ icon | `text-secondary` |

Transition into correctness state: 250ms `ease-between` on background and
border; the icon fades in with `assemble` (70ms per element if multiple).

### 4.3 Checkpoint card container

The card that wraps the question, options, and feedback.

| State | Shadow |
|---|---|
| rest | `elevation-2` |
| after submission (result shown) | `elevation-2` (unchanged — the card is stable) |

---

## 5. Margin Rail — les entrées du navigateur de chapitres

Boutons collants dans le rail de gauche. Cible tactile : ≥48 px de hauteur
par entrée.

| État | Indicateur | Texte | Transition |
|---|---|---|---|
| repos | Petit point, `text-tertiary` | `text-tertiary`, `text-caption` | — |
| survol | Point légèrement plus grand / couleur d'accent | `text-secondary` | 150ms `ease-enter` |
| focus-visible | Contour `.focus-ring` | `text-secondary` | — |
| actif (chapitre courant) | Point plein, couleur `accent` | `text-primary` | 250ms `ease-between` |

**Corrigé le 2026-09-05.** Ce paragraphe décrivait encore un scroll-spy
`IntersectionObserver` qui calculait l'entrée active à partir de la position
de défilement. Ce code n'existe plus depuis que la pagination par chapitres a
atterri (LESSON-EXPERIENCE-SPEC §1.4 : « le code spy est retiré du chemin
paginé… il meurt »), et il n'y a plus une seule occurrence
d'`IntersectionObserver` dans `web/src/`. Le rail n'est plus un indicateur
passif : **c'est un navigateur.** Un clic ACTIVE un chapitre via le contexte
de `ChapterShell`, et l'entrée active est simplement `current` poussé depuis
ce contexte — jamais mesuré. La transition reste du CSS sur le changement de
classe.

Une épine de progression (ligne verticale) traverse les entrées : la portion
au-dessus de l'entrée active — celle-ci comprise — est peinte en accent, le
reste en `border-subtle`. Aucune animation : un dégradé CSS lu sur `current`.

---

## 6. Font-Size Stepper

Three buttons: A− / A / A+. Ghost button style (§2.3).

| State | Additional behavior |
|---|---|
| rest | Current active size: `text-primary`, `font-semibold` |
| inactive sizes | `text-secondary`, `font-regular` |
| hover | `accent-subtle` background, `text-primary` |
| focus-visible | `.focus-ring` outline |
| active size (selected) | `accent-subtle` background at rest, no hover change needed |
| disabled (at min/max) | 40% opacity, `cursor-not-allowed` |

---

## 7. Site Header

The header is a persistent `<header>` at the top of every page.

| State | Background | Shadow | Border-bottom |
|---|---|---|---|
| at top of page | `surface-base` (transparent feel — matches page bg) | `elevation-0` | `border-subtle` (1px, very faint) |
| after first scroll (floating) | `surface-raised` | `elevation-3` | none (shadow replaces border) |

Transition between scroll states: 250ms `ease-between` on `box-shadow` and `background-color`.

**Header nav links:**

| State | Color | Underline |
|---|---|---|
| rest | `text-secondary` | none |
| hover | `text-primary` | none (or subtle 1px accent underline) |
| focus-visible | `.focus-ring` outline | — |
| active/current page | `text-primary`, `font-medium` | 2px bottom border `accent` |

---

## 8. Text Links (inline prose)

Links inside `.prose-lesson` content.

| State | Color | Decoration | Transition |
|---|---|---|---|
| rest | `accent` (#3E5C86) | underline, 1px, `border-subtle` color | — |
| hover | `accent` (slightly lighter — use `accent.light` in dark, same in light) | underline, 1px, `accent` color | 150ms `ease-enter` |
| focus-visible | `accent` | `.focus-ring` outline | — |
| active | `accent` - 10% | underline | 100ms |
| visited | `text-tertiary` | underline, `border-subtle` | — |

---

## 9. EmbedPanel (iframe / PhET)

The EmbedPanel wraps external embeds in a resizable panel with controls.

| Control | State | Behavior |
|---|---|---|
| Expand/collapse toggle | rest / hover / focus-visible | Ghost button (§2.3); `.focus-ring` |
| Full-screen button | rest / hover / focus-visible | Ghost button; `.focus-ring` |
| Loading state | — | `surface-raised` placeholder with subtle shimmer animation (only non-beat motion allowed — it is feedback, not decoration; 1.5s linear loop, opacity 0.4→0.8) |
| Error state | — | `error-subtle` background, `error` text + icon, descriptive message |

---

## 10. Accessibility floor — all components

These apply to every interactive surface without exception.

| Requirement | Value | Notes |
|---|---|---|
| Touch target height | ≥48px | All buttons and links; use `min-h-[48px]` |
| Touch target width | ≥48px | Icon-only buttons: also `min-w-[48px]` |
| Contrast — body text | ≥4.5:1 | WCAG 2.2 AA |
| Contrast — large text / UI | ≥3:1 | WCAG 2.2 AA |
| Focus ring | 2px solid `#3E5C86`, 2px offset | Via `.focus-ring` or global catch-all |
| Color-not-alone | Always paired with icon/text/shape | Correctness states, semantic colors |
| Keyboard navigable | Full tab order, no focus traps | Including MCQ, embed, rail |
| Reduced-motion | All animations skip; function preserved | MotionStage: settled state |
| `aria-live` | Step indicators, result announcements | `polite` for non-urgent, `assertive` for errors |
