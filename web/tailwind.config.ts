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
      // ── Design-token color palette ─────────────────────────────────────────
      // DESIGN-BIBLE §2: tinted neutrals, never pure black/white, single
      // restrained blue accent.
      colors: {
        // Tinted neutrals — light mode surfaces
        surface: {
          base:    "var(--color-surface-base)",    // page background
          raised:  "var(--color-surface-raised)",  // cards, panels
          overlay: "var(--color-surface-overlay)", // modals, tooltips
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
        // Single restrained accent: brand-tinted blue
        accent: {
          DEFAULT: "#3E5C86",
          light:   "#7E9CC8",
          subtle:  "var(--color-accent-subtle)",   // very light tint for hovers
        },
        // Semantic
        success: {
          DEFAULT: "var(--color-success)",
          subtle:  "var(--color-success-subtle)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          subtle:  "var(--color-warning-subtle)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          subtle:  "var(--color-error-subtle)",
        },
      },

      // ── Typography ──────────────────────────────────────────────────────────
      // DESIGN-BIBLE §3: IBM Plex Sans, body ≥ 16px, 65ch reading column,
      // line-height 1.5, two weights.
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "caption": ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.01em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body":    ["1rem",     { lineHeight: "1.5" }],
        "body-lg": ["1.0625rem",{ lineHeight: "1.6" }], // 17px — kinder over long sessions
        "lead":    ["1.125rem", { lineHeight: "1.55" }],
        "h4":      ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "h3":      ["1.25rem",  { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "h2":      ["1.5rem",   { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        "h1":      ["1.875rem", { lineHeight: "1.2",  letterSpacing: "-0.02em" }],
        "display": ["2.25rem",  { lineHeight: "1.15", letterSpacing: "-0.025em" }],
      },
      fontWeight: {
        regular:  "400",
        medium:   "500",
        semibold: "600",
      },

      // ── Spacing — 8-pt grid ─────────────────────────────────────────────────
      // DESIGN-BIBLE §4: multiples of 8, 4px half-step available via Tailwind's
      // default scale (1 = 4px, 2 = 8px, 4 = 16px, …). The default Tailwind
      // scale already uses a 4px base, so 2 = 8px, 4 = 16px, 6 = 24px, etc.
      // Nothing extra needed — the design tokens map directly.

      // ── Reading column ──────────────────────────────────────────────────────
      maxWidth: {
        reading: "65ch",
        content: "72ch",   // slightly wider for items with choices
        wide:    "90ch",   // for embed + prose side-by-side
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
      transitionDuration: {
        micro:    "150ms",
        standard: "250ms",
        slow:     "400ms", // entering deep study only
      },
      transitionTimingFunction: {
        enter:   "cubic-bezier(0, 0, 0.2, 1)",   // ease-out
        leave:   "cubic-bezier(0.4, 0, 1, 1)",   // ease-in
        between: "cubic-bezier(0.4, 0, 0.2, 1)", // ease-in-out
      },

      // ── Box shadow — elevation through layered luminance, not heavy drops ──
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(30, 45, 70, 0.06), 0 1px 2px -1px rgba(30, 45, 70, 0.04)",
        soft:   "0 4px 12px 0 rgba(30, 45, 70, 0.08), 0 2px 4px -2px rgba(30, 45, 70, 0.05)",
        none:   "none",
      },

      // ── Focus ring ──────────────────────────────────────────────────────────
      // DESIGN-BIBLE §9: visible, clear focus indicators
      ringColor: {
        focus: "#3E5C86",
      },
      ringOffsetWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
