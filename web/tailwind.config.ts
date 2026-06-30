import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Adaptive window-size classes (ADR 0024 — M3 breakpoints) ────────────
      // Added alongside Tailwind's defaults (sm/md/lg/xl). Use bp-medium /
      // bp-expanded for per-window-class gutters + layout, keyed to M3's 600/840.
      screens: {
        "bp-medium": "600px",
        "bp-expanded": "840px",
      },

      // ── Design-token color palette ─────────────────────────────────────────
      // DESIGN-BIBLE §2: tinted neutrals, never pure black/white, single
      // restrained blue accent.
      colors: {
        // Tinted neutrals — light mode surfaces
        surface: {
          base:    "var(--color-surface-base)",    // page background
          raised:  "var(--color-surface-raised)",  // cards, panels
          overlay: "var(--color-surface-overlay)", // modals, tooltips
          // Surface-container tonal ladder (ADR 0024 — M3 tone-based surfaces).
          // Tone steps with elevation: a higher tier sits on a lighter warm surface.
          "container-lowest":  "var(--color-surface-container-lowest)",
          "container-low":     "var(--color-surface-container-low)",
          container:           "var(--color-surface-container)",
          "container-high":    "var(--color-surface-container-high)",
          "container-highest": "var(--color-surface-container-highest)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          soft:   "var(--color-border-soft)",
        },
        // Text hierarchy — never pure #000
        text: {
          primary:   "var(--color-text-primary)",
          secondary:  "var(--color-text-secondary)",
          tertiary:   "var(--color-text-tertiary)",
          onAccent:   "var(--color-text-on-accent)",
        },
        // Single signature accent — promoted to CSS vars (ADR 0023) so the
        // direction studies + rollout swap it centrally.
        accent: {
          DEFAULT: "var(--color-accent)",
          strong:  "var(--color-accent-strong)",   // hover / active
          light:   "var(--color-accent-light)",
          subtle:  "var(--color-accent-subtle)",   // very light tint for hovers
        },
        // Semantic — DEFAULT is the fill; `on` is the text/icon color that sits ON
        // that fill (dark in dark-mode, where the fills are light — ADR 0024 a11y).
        success: {
          DEFAULT: "var(--color-success)",
          subtle:  "var(--color-success-subtle)",
          on:      "var(--color-on-success)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          subtle:  "var(--color-warning-subtle)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          subtle:  "var(--color-error-subtle)",
          on:      "var(--color-on-error)",
        },
        // Figure palette — consumed by figure containers and SVG wrappers.
        // The actual SVG elements reference these via CSS vars; see globals.css.
        figure: {
          surface:          "var(--figure-surface)",
          ink:              "var(--figure-ink)",
          "ink-soft":       "var(--figure-ink-soft)",
          grid:             "var(--figure-grid)",
          accent:           "var(--figure-accent)",
          "energy-C":       "var(--figure-energy-C)",
          "energy-L":       "var(--figure-energy-L)",
          "regime-periodic":    "var(--figure-regime-periodic)",
          "regime-pseudo":      "var(--figure-regime-pseudo)",
          "regime-aperiodic":   "var(--figure-regime-aperiodic)",
        },
      },

      // ── Typography ──────────────────────────────────────────────────────────
      // DESIGN-BIBLE §3: IBM Plex Sans, body ≥ 16px, 65ch reading column,
      // line-height 1.5, two weights.
      // ADR 0023 — editorial pairing: serif for reading prose + headings,
      // sans for UI chrome/labels/math labels, mono for code.
      fontFamily: {
        serif: ["var(--font-reading-serif)", "Georgia", "Times New Roman", "serif"],
        sans:  ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Tracking: looser on small (caption), tighter on display sizes (ADR 0023).
        "caption": ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body":    ["1rem",     { lineHeight: "1.5" }],
        "body-lg": ["1.0625rem",{ lineHeight: "1.6" }], // 17px — kinder over long sessions
        "lead":    ["1.125rem", { lineHeight: "1.55" }],
        "h4":      ["1.125rem", { lineHeight: "1.4",  letterSpacing: "-0.01em" }],
        "h3":      ["1.25rem",  { lineHeight: "1.35", letterSpacing: "-0.012em" }],
        "h2":      ["1.5rem",   { lineHeight: "1.3",  letterSpacing: "-0.018em" }],
        "h1":      ["1.875rem", { lineHeight: "1.18", letterSpacing: "-0.022em" }],
        "display": ["2.25rem",  { lineHeight: "1.12", letterSpacing: "-0.03em" }],
      },
      fontWeight: {
        regular:  "400",
        medium:   "500",
        semibold: "600",
        bold:     "700", // serif display headings (ADR 0023)
      },

      // ── Spacing — 8-pt grid ─────────────────────────────────────────────────
      // DESIGN-BIBLE §4: multiples of 8, 4px half-step available via Tailwind's
      // default scale (1 = 4px, 2 = 8px, 4 = 16px, …). The default Tailwind
      // scale already uses a 4px base, so 2 = 8px, 4 = 16px, 6 = 24px, etc.
      // Nothing extra needed — the design tokens map directly.

      // ── Reading column ──────────────────────────────────────────────────────
      // Note: --measure-prose (65ch) is the canonical CSS-var source. These
      // tailwind maxWidth values mirror it. For prose containers, prefer the
      // CSS class (.prose-lesson / .notion-prose) over ad-hoc max-w-reading.
      maxWidth: {
        reading: "65ch",
        content: "72ch",   // slightly wider for items with choices
        wide:    "90ch",   // for embed + prose side-by-side
        list:    "var(--measure-list)", // home notion-card column (one cap per spine)
        page:    "1280px",
        notion:  "1140px", // notion page outer band — prose + wide-band figures
      },

      // ── Border radius ───────────────────────────────────────────────────────
      // DESIGN-BIBLE §4 / §6: soft radii
      borderRadius: {
        none:  "0",
        sm:    "4px",
        DEFAULT:"8px",
        md:    "8px",
        lg:    "12px",
        xl:    "16px",
        "2xl": "20px",
        full:  "9999px",
      },

      // ── Motion / transitions ────────────────────────────────────────────────
      // DESIGN-BIBLE §5: 100–200ms micro, 200–300ms standard, ease-out enter,
      // ease-in leave, ease-in-out between states. Never bounce.
      // ADR 0022: two craft easing curves added (emphasized, standard-svg).
      transitionDuration: {
        micro:    "150ms",
        standard: "250ms",
        slow:     "400ms", // entering deep study only
      },
      transitionTimingFunction: {
        // ── Existing utility curves ──────────────────────────────────────────
        enter:   "cubic-bezier(0, 0, 0.2, 1)",   // ease-out (elements arriving)
        leave:   "cubic-bezier(0.4, 0, 1, 1)",   // ease-in  (elements departing)
        between: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-in-out (state transitions)

        // ── Craft easing curves (ADR 0022) ──────────────────────────────────
        // "emphasized": the premium decelerate — strong initial velocity,
        // gentle deliberate settle. Reads as confident and considered.
        // No overshoot. Use for: beat entrances, panel slides, KaTeX assembly.
        "emphasized":   "cubic-bezier(0.2, 0, 0, 1)",

        // "standard-svg": CSS analogue of GSAP power2.out.
        // For SVG-adjacent CSS transitions (hover highlights, fill transitions
        // on SVG wrapper elements). The JS motion engine uses GSAP eases
        // directly on timeline tweens; this is the CSS-side companion.
        "standard-svg": "cubic-bezier(0.25, 0.1, 0.25, 1)",

        // HARD RULE (see docs/design/MOTION-CHOREOGRAPHY.md):
        // Never bounce, never overshoot, never elastic in the learning core.
        // Spring/bounce curves are the texture of games — not this product.
      },

      // ── Box shadow — elevation through layered luminance, not heavy drops ──
      // ADR 0022: full 5-step elevation scale via CSS vars. The existing
      // `subtle` and `soft` aliases are kept for backward compatibility and
      // map conceptually to elevation-1 and elevation-2 respectively.
      boxShadow: {
        // ── Legacy aliases (kept; do not remove) ────────────────────────────
        subtle: "0 1px 3px 0 rgba(30, 45, 70, 0.06), 0 1px 2px -1px rgba(30, 45, 70, 0.04)",
        soft:   "0 4px 12px 0 rgba(30, 45, 70, 0.08), 0 2px 4px -2px rgba(30, 45, 70, 0.05)",
        none:   "none",

        // ── 5-step elevation scale (ADR 0022) ───────────────────────────────
        // Light: tinted blue-gray drops (rgba 30,45,70). See globals.css for
        // dark-mode values (luminance elevation via inset hairline + soft drop).
        // Usage:
        //   elevation-0  flat (no shadow)        — inline figure elements
        //   elevation-1  barely lifted            — figure panels, cards at rest
        //   elevation-2  clearly above page       — checkpoints, raised cards
        //   elevation-3  floating (on-scroll)     — site header after scroll
        //   elevation-4  overlay level            — modals, popovers, drawers
        "elevation-0": "var(--elevation-0)",
        "elevation-1": "var(--elevation-1)",
        "elevation-2": "var(--elevation-2)",
        "elevation-3": "var(--elevation-3)",
        "elevation-4": "var(--elevation-4)",
      },

      // ── Focus ring ──────────────────────────────────────────────────────────
      // DESIGN-BIBLE §9: visible, clear focus indicators.
      // The .focus-ring CSS component class in globals.css is the preferred
      // delivery mechanism. These ring tokens back the global :focus-visible
      // catch-all and any bespoke Tailwind ring usage.
      ringColor: {
        focus: "var(--color-accent)",
      },
      ringOffsetWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
