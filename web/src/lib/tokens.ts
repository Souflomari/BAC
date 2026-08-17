/**
 * tokens.ts — THE SINGLE SOURCE OF TRUTH for the design system.
 *
 * Every design value lives here exactly once. Three consumers read this
 * module — nothing else re-declares a value:
 *   1. `scripts/generate-tokens.mjs` emits `src/app/tokens.generated.css`
 *      (the :root / .dark CSS custom-property blocks) from `themes` +
 *      `invariant`. globals.css @imports that generated file.
 *   2. `tailwind.config.ts` imports this module (Tailwind v3 loads the TS
 *      config via jiti) and maps `typeScale`/`radius`/`screens`/colors into
 *      `theme.extend`.
 *   3. `scripts/dom-truth.mjs` + `src/lib/utils.ts` import it so the harness
 *      and the tailwind-merge classGroups derive from the same source — a
 *      token can never drift between definition, render, and assertion.
 *
 * Authority chain: DESIGN-BIBLE §2/§3/§4/§5 → docs/design/TOKENS.md →
 * ADR 0022 → 0023 (warm editorial) → 0024 (Hybrid-Material). Values here are
 * transcribed verbatim from the prior hand-authored globals.css / tailwind
 * config; the migration that introduced this module (Phase A / W1) kept every
 * computed value byte-identical.
 *
 * PURE DATA ONLY — no functions, no imports, no side effects. This module is
 * safe in the client bundle and loadable by plain Node via jiti.
 */

/** A block of CSS custom properties: property name → value (verbatim text). */
export type TokenVars = Record<string, string>;

export interface Theme {
  /** CSS selector the block is emitted under. */
  selector: string;
  /** The theme-varying custom properties (declared in BOTH themes). */
  vars: TokenVars;
}

/**
 * Theme-VARYING tokens — every key appears in both light and dark with a
 * different value. The generator emits one selector block per theme.
 * A future theme (e.g. « craie ») is added as one more entry keyed by
 * `[data-theme="craie"]`; nothing else in the pipeline moves
 * (THEME-ARCHITECTURE.md).
 */
export const themes: Record<"light" | "dark", Theme> = {
  light: {
    selector: ":root",
    vars: {
      // Surfaces — warm ivory/cream, never pure white (DESIGN-BIBLE §2)
      "--color-surface-base": "#F4EFE6",
      "--color-surface-raised": "#FBF7F0",
      "--color-surface-overlay": "#FFFDF8",
      // Surface-container tonal ladder (ADR 0024 — M3 tone-based surfaces)
      "--color-surface-container-lowest": "#F1EBE0",
      "--color-surface-container-low": "#F7F2E9",
      "--color-surface-container": "#FBF7F0",
      "--color-surface-container-high": "#FEFAF4",
      "--color-surface-container-highest": "#FFFDF8",
      // Borders — warm
      "--color-border-subtle": "#E6DECF",
      "--color-border-soft": "#D2C6B2",
      // Bordure de CHAMP DE FORMULAIRE. Distincte de `border-soft` à dessein
      // (audit Fable §3.14) : quand un trait est la SEULE délimitation d'un
      // composant, WCAG 1.4.11 exige 3:1 — or border-soft plafonne à 1,58:1.
      // Assombrir border-soft globalement aurait alourdi tous les filets
      // décoratifs du site pour régler un problème qui ne concerne que les
      // champs. Un jeton dédié règle le cas sans peser sur le reste : 3,12:1
      // sur la surface claire la plus sombre du système.
      "--color-border-field": "#8C8477",
      // Text — warm near-black ink, three levels (none pure #000)
      "--color-text-primary": "#2A2018",
      "--color-text-secondary": "#5C5043",
      "--color-text-tertiary": "#746856",
      "--color-text-on-accent": "#FFFDF8",
      // Accent — single signature hue (deep teal)
      "--color-accent": "#1F6F6B",
      "--color-accent-strong": "#185C58",
      "--color-accent-light": "#5FB6AE",
      "--color-accent-subtle": "#E4F0EE",
      "--focus-halo": "rgba(31,111,107,.18)",
      // Semantic — muted, warm-shifted
      "--color-success": "#3F6B4E",
      "--color-success-subtle": "#E8F0E6",
      "--color-on-success": "#FFFDF8",
      // Audit Fable §3.14 : #8A6A1E donnait 4,41:1 sur le fond clair, sous
      // le seuil AA de 4,5 pour du petit corps. Assombri à 4,62:1.
      "--color-warning": "#86671D",
      "--color-warning-subtle": "#F6EEDA",
      "--color-error": "#9A3B2E",
      "--color-error-subtle": "#F6E6E1",
      "--color-on-error": "#FFFDF8",
      // Elevation — warm-tinted drops (rgba 60,45,30) with hairline ring
      "--elevation-0": "none",
      "--elevation-1":
        "0 0 0 1px rgba(60,45,30,.05), 0 1px 2px -1px rgba(60,45,30,.08), 0 2px 6px 0 rgba(60,45,30,.06)",
      "--elevation-2":
        "0 0 0 1px rgba(60,45,30,.06), 0 2px 4px -2px rgba(60,45,30,.08), 0 8px 20px -2px rgba(60,45,30,.10)",
      "--elevation-3":
        "0 6px 12px -4px rgba(60,45,30,.10), 0 14px 34px -4px rgba(60,45,30,.14)",
      "--elevation-4":
        "0 10px 22px -6px rgba(60,45,30,.12), 0 24px 56px -8px rgba(60,45,30,.18)",
      // Figure palette (ADR 0023 — warm world)
      "--figure-surface": "#FBF7F0",
      "--figure-ink": "#2A2018",
      "--figure-ink-soft": "#5C5043",
      "--figure-grid": "#E6DECF",
      "--figure-accent": "var(--color-accent)",
      "--figure-energy-C": "#4C6088",
      "--figure-energy-L": "#3C7A5E",
      "--figure-regime-periodic": "#4C6088",
      "--figure-regime-pseudo": "#9A6B3C",
      "--figure-regime-aperiodic": "#6E4A86",
    },
  },
  dark: {
    selector: ".dark",
    vars: {
      "--color-surface-base": "#1A1612",
      "--color-surface-raised": "#231E18",
      "--color-surface-overlay": "#2C261F",
      "--color-surface-container-lowest": "#15110D",
      "--color-surface-container-low": "#1E1914",
      "--color-surface-container": "#231E18",
      "--color-surface-container-high": "#2A241D",
      "--color-surface-container-highest": "#322B23",
      "--color-border-subtle": "#352E26",
      "--color-border-soft": "#473E33",
      "--color-border-field": "#84735F",
      "--color-text-primary": "#EFE8DC",
      "--color-text-secondary": "#B5A893",
      "--color-text-tertiary": "#9A8D7C",
      "--color-text-on-accent": "#11302C",
      "--color-accent": "#5FB6AE",
      "--color-accent-strong": "#7FC8C0",
      "--color-accent-light": "#5FB6AE",
      "--color-accent-subtle": "#16312F",
      "--focus-halo": "rgba(95,182,174,.22)",
      "--color-success": "#7FB890",
      "--color-success-subtle": "#16271B",
      "--color-on-success": "#112019",
      "--color-warning": "#E0BE6E",
      "--color-warning-subtle": "#2A2110",
      "--color-error": "#E08C7E",
      "--color-error-subtle": "#2C1611",
      "--color-on-error": "#2C1611",
      "--elevation-0": "none",
      "--elevation-1":
        "0 0 0 1px rgba(255,250,240,.05), 0 1px 2px 0 rgba(0,0,0,.22), inset 0 1px 0 0 rgba(255,250,240,.05)",
      "--elevation-2":
        "0 0 0 1px rgba(255,250,240,.06), 0 3px 10px 0 rgba(0,0,0,.32), inset 0 1px 0 0 rgba(255,250,240,.06)",
      "--elevation-3":
        "0 0 0 1px rgba(255,250,240,.07), 0 6px 20px 0 rgba(0,0,0,.36), inset 0 1px 0 0 rgba(255,250,240,.07)",
      "--elevation-4":
        "0 0 0 1px rgba(255,250,240,.09), 0 12px 32px 0 rgba(0,0,0,.44), inset 0 1px 0 0 rgba(255,250,240,.09)",
      "--figure-surface": "#231E18",
      "--figure-ink": "#EFE8DC",
      "--figure-ink-soft": "#B5A893",
      "--figure-grid": "#352E26",
      "--figure-accent": "var(--color-accent-light)",
      "--figure-energy-C": "#7E93BE",
      "--figure-energy-L": "#5FA886",
      "--figure-regime-periodic": "#7E93BE",
      "--figure-regime-pseudo": "#C49A6C",
      "--figure-regime-aperiodic": "#A98BD0",
    },
  },
};

/**
 * Theme-INDEPENDENT custom properties — declared once (folded into the
 * `:root` block by the generator), identical in every theme. State-layer
 * opacities, the CSS-side motion tokens, the measure/line-length controls,
 * and the default focus radius. (State-color resolves per-theme because it
 * *references* a themed var, but the declaration itself never changes.)
 */
export const invariant: TokenVars = {
  // Focus (the halo is themed; the default radius is not)
  "--focus-radius": "6px",
  // Interaction state-layer model (ADR 0024)
  "--state-color": "var(--color-text-primary)",
  "--state-hover": "0.06",
  "--state-pressed": "0.10",
  "--state-dragged": "0.16",
  "--state-disabled": "0.38",
  // Measure / line-length (do not change in dark mode)
  "--measure-prose": "65ch",
  "--measure-wide": "72ch",
  "--measure-lead": "52ch",
  "--measure-list": "42rem",
  // Small-caps eyebrow tracking — was `tracking-eyebrow` in 13 files.
  "--tracking-eyebrow": "0.14em",
  // A11y touch target (DESIGN-BIBLE §9) — was `min-h-touch`.
  "--touch-target": "48px",
  // Z-index scale — semantic names for the three stacking tiers (were raw
  // z-10 / z-40 / z-50 magic numbers).
  "--z-raised": "10",
  "--z-header": "40",
  "--z-overlay": "50",
};

/**
 * Motion — the ONE source for durations and easing curves. The generator
 * emits `--duration-<k>` / `--ease-<k>` CSS custom properties from this (so
 * the CSS motion layer reads them), and tailwind.config maps the SAME object
 * into transitionDuration / transitionTimingFunction (referencing those vars).
 * No bounce / overshoot / elastic in the learning core (MOTION-CHOREOGRAPHY).
 */
export const motion: {
  duration: Record<string, string>;
  ease: Record<string, string>;
} = {
  duration: {
    micro: "150ms",
    standard: "250ms",
    // Chapter-view enter transition — a full-view swap reads calmer a touch
    // slower than a hover/state change (LESSON-EXPERIENCE-SPEC §1.3).
    view: "300ms",
    // Entering deep study only.
    slow: "400ms",
  },
  ease: {
    between: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-in-out (state transitions)
    enter: "cubic-bezier(0, 0, 0.2, 1)", // ease-out (elements arriving)
    leave: "cubic-bezier(0.4, 0, 1, 1)", // ease-in (elements departing)
    // The premium decelerate (ADR 0022) — no overshoot.
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    // CSS analogue of GSAP power2.out, for SVG-adjacent transitions.
    "standard-svg": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
};

/**
 * Type scale — one entry per `text-<key>` (DESIGN-BIBLE §3, ADR 0023).
 * `rem` is the font-size in rem; `lineHeight` is unitless; `tracking` (when
 * present) is the letter-spacing. tailwind.config maps these into `fontSize`
 * and dom-truth derives its px expectations from the same numbers.
 */
export interface TypeStep {
  rem: number;
  lineHeight: number;
  tracking?: string;
}

export const typeScale: Record<string, TypeStep> = {
  caption: { rem: 0.75, lineHeight: 1.5, tracking: "0.02em" },
  "body-sm": { rem: 0.875, lineHeight: 1.5 },
  body: { rem: 1, lineHeight: 1.5 },
  "body-lg": { rem: 1.0625, lineHeight: 1.6 },
  lead: { rem: 1.125, lineHeight: 1.55 },
  h4: { rem: 1.125, lineHeight: 1.4, tracking: "-0.01em" },
  h3: { rem: 1.25, lineHeight: 1.35, tracking: "-0.012em" },
  h2: { rem: 1.5, lineHeight: 1.3, tracking: "-0.018em" },
  h1: { rem: 1.875, lineHeight: 1.18, tracking: "-0.022em" },
  display: { rem: 2.25, lineHeight: 1.12, tracking: "-0.03em" },
  "display-lg": { rem: 3.5, lineHeight: 1.06, tracking: "-0.03em" },
};

/** Border radius — `rounded-<key>` (DESIGN-BIBLE §4/§6, soft radii). */
export const radius: Record<string, string> = {
  none: "0",
  sm: "4px",
  DEFAULT: "8px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
};

/**
 * Named breakpoints (ADR 0024 — M3 windows). TS-ONLY BY NECESSITY: CSS
 * media queries cannot read custom properties, so these cannot be CSS vars.
 * tailwind.config consumes them as `screens`.
 */
export const screens: Record<string, string> = {
  "bp-medium": "600px",
  "bp-expanded": "840px",
  "bp-wide": "1536px",
};
