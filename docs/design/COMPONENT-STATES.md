# Component States — Interaction Reference

> **Authority:** ADR 0022. This document defines the concrete interaction
> states for every interactive surface in the product. Critics and authors
> in later phases use this as the checkable bar for "premium" micro-craft.
>
> **Token references:** `docs/design/TOKENS.md` for all values.
> **Focus utility:** `.focus-ring` class (see §Focus Ring below).
> **Floor:** ≥44px touch target height on all interactive elements.
> **Color-not-alone rule:** correctness states always pair color with
> icon or text — never color alone (DESIGN-BIBLE §2, §9).

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
  outline: 2px solid #3E5C86;   /* accent color */
  outline-offset: 2px;
  border-radius: 4px;
}
```

Usage: add `focus-ring` to any interactive element's class list. The class
applies the ring only on `:focus-visible` (keyboard / assistive-technology
focus) — it does not appear on mouse click, preserving the clean visual for
mouse users while ensuring keyboard navigators always see a clear indicator.

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

### 2.1 Primary Button (accent-filled)

Used for: submit, confirm, primary CTA on landing pages.
Touch target: min-height 44px.

| State | Background | Text | Border | Shadow | Transition |
|---|---|---|---|---|---|
| rest | `accent` (#3E5C86) | `text-on-accent` (#FFF) | none | `elevation-0` | — |
| hover | `accent` + 8% white overlay (~#4A6C99) | `text-on-accent` | none | `elevation-1` | 150ms `ease-enter` |
| focus-visible | `accent` | `text-on-accent` | `.focus-ring` outline | `elevation-1` | 150ms |
| active | `accent` - 10% (~#344E74) | `text-on-accent` | none | `elevation-0` (pressed in) | 100ms `ease-leave` |
| disabled | `accent` at 40% opacity | `text-on-accent` at 40% | none | none | — |
| loading | `accent` | spinner + label | none | `elevation-0` | — |

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
- Text: `text-tertiary`, `text-caption`, `tabular-nums`
- `aria-live="polite" aria-atomic="true"` — screen reader announces on change
- No interactive state (it is display-only)

**Reduced-motion mode:** controls are hidden; a static notice appears in
`text-tertiary italic` — "Vue statique — mouvement réduit activé."

---

## 4. MCQ / Checkpoint Option Cards

### 4.1 MCQ option (before answer)

Each option is a `<button>` wrapping the option text.
Touch target: full card height ≥44px.

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

## 5. Margin Rail Rungs

Small sticky anchor links in the left rail. Touch target: ≥44px height per rung.

| State | Indicator | Text | Transition |
|---|---|---|---|
| rest | Small dot or rung mark, `text-tertiary` | `text-tertiary`, `text-caption` | — |
| hover | Dot slightly larger / accent color | `text-secondary` | 150ms `ease-enter` |
| focus-visible | `.focus-ring` outline | `text-secondary` | — |
| active (in-view section) | Dot filled, `accent` color | `text-primary` | 250ms `ease-between` (scroll-spy fires this) |

The active rung is set by IntersectionObserver (scroll-spy), not by click.
The transition is CSS on the scroll-spy class toggle, 250ms `ease-between`.

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
| Touch target height | ≥44px | All buttons and links; use `min-h-[44px]` |
| Touch target width | ≥44px | Icon-only buttons: also `min-w-[44px]` |
| Contrast — body text | ≥4.5:1 | WCAG 2.2 AA |
| Contrast — large text / UI | ≥3:1 | WCAG 2.2 AA |
| Focus ring | 2px solid `#3E5C86`, 2px offset | Via `.focus-ring` or global catch-all |
| Color-not-alone | Always paired with icon/text/shape | Correctness states, semantic colors |
| Keyboard navigable | Full tab order, no focus traps | Including MCQ, embed, rail |
| Reduced-motion | All animations skip; function preserved | MotionStage: settled state |
| `aria-live` | Step indicators, result announcements | `polite` for non-urgent, `assertive` for errors |
