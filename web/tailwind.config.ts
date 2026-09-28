import type { Config } from "tailwindcss";
import { typeScale, radius, screens, motion } from "./src/lib/tokens";

// ── Single source of truth ──────────────────────────────────────────────────
// Scales come from src/lib/tokens.ts (the ONE place design values live). The
// color keys below reference the CSS custom properties that tokens.ts also
// generates into src/app/tokens.generated.css — so a value has exactly one home
// and the tailwind aliases are just named handles onto it.
//
// MAINTENANCE: a custom key added here MUST be registered in cn()'s classGroups
// (src/lib/utils.ts) in the same commit, or tailwind-merge silently drops it
// (audit U1). dom-truth's cn() tripwire asserts this on every run.

/** Reference a CSS custom property by name: v("color-accent") → "var(--color-accent)". */
const v = (name: string) => `var(--${name})`;

/** typeScale → Tailwind fontSize tuples: [size, { lineHeight, letterSpacing? }]. */
type FontSizeValue = [string, { lineHeight: string; letterSpacing?: string }];
const fontSize: Record<string, FontSizeValue> = Object.fromEntries(
  Object.entries(typeScale).map(([key, t]): [string, FontSizeValue] => [
    key,
    [
      `${t.rem}rem`,
      { lineHeight: String(t.lineHeight), ...(t.tracking ? { letterSpacing: t.tracking } : {}) },
    ],
  ]),
);

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ── L'ÉCHELLE DE FENÊTRE, EN REMPLACEMENT ET NON EN AJOUT ───────────────
    // `screens` vit ici (theme.screens) et non dans `extend` : posé dans
    // `extend`, il S'AJOUTAIT aux défauts Tailwind (sm 640, md 768, lg 1024,
    // xl 1280, 2xl 1536), qui restaient donc utilisables. C'est ainsi que
    // treize classes `sm:`/`md:` avaient survécu dans le code et qu'une
    // règle à 1536 px se retrouvait encore dans le CSS servi après qu'on ait
    // cru retirer ce palier.
    //
    // En remplacement, l'échelle Material (M3 : compact <600, medium 600,
    // expanded 840, large 1200, extra-large 1600) est la SEULE qui existe :
    // une classe `md:` égarée ne produit plus rien du tout au lieu de
    // produire un quatrième point de rupture silencieux. On rend l'erreur
    // impossible plutôt que déconseillée.
    screens,
    extend: {
      // ── Color palette (DESIGN-BIBLE §2) — values are the generated CSS vars ──
      // text + border moved to textColor/borderColor below so the classes read
      // `text-primary` / `border-subtle` (not the dead `text-text-primary`).
      colors: {
        surface: {
          base: v("color-surface-base"),
          raised: v("color-surface-raised"),
          overlay: v("color-surface-overlay"),
          // Surface-container tonal ladder (ADR 0024 — M3 tone-based surfaces).
          "container-lowest": v("color-surface-container-lowest"),
          "container-low": v("color-surface-container-low"),
          container: v("color-surface-container"),
          "container-high": v("color-surface-container-high"),
          "container-highest": v("color-surface-container-highest"),
        },
        // Single signature accent (ADR 0023).
        accent: {
          DEFAULT: v("color-accent"),
          strong: v("color-accent-strong"),
          light: v("color-accent-light"),
          subtle: v("color-accent-subtle"),
        },
        // Semantic — DEFAULT is the fill; `on` is the text/icon color on that fill.
        success: {
          DEFAULT: v("color-success"),
          subtle: v("color-success-subtle"),
          on: v("color-on-success"),
        },
        warning: {
          DEFAULT: v("color-warning"),
          subtle: v("color-warning-subtle"),
        },
        error: {
          DEFAULT: v("color-error"),
          subtle: v("color-error-subtle"),
          on: v("color-on-error"),
        },
        // Figure palette — consumed by figure containers and SVG wrappers.
        figure: {
          surface: v("figure-surface"),
          ink: v("figure-ink"),
          "ink-soft": v("figure-ink-soft"),
          grid: v("figure-grid"),
          accent: v("figure-accent"),
          "energy-C": v("figure-energy-C"),
          "energy-L": v("figure-energy-L"),
          "regime-periodic": v("figure-regime-periodic"),
          "regime-pseudo": v("figure-regime-pseudo"),
          "regime-aperiodic": v("figure-regime-aperiodic"),
        },
      },
      // Text color hierarchy → `text-primary` / `text-secondary` / … (never #000).
      // `border-soft` is here too because it is used as a text color in a few
      // places (a neutral inked hairline label).
      textColor: {
        primary: v("color-text-primary"),
        secondary: v("color-text-secondary"),
        tertiary: v("color-text-tertiary"),
        "on-accent": v("color-text-on-accent"),
        "border-soft": v("color-border-soft"),
      },
      // Border color → `border-subtle` / `border-soft`. `text-secondary` is used
      // as a border color on a couple of emphasized rules.
      borderColor: {
        subtle: v("color-border-subtle"),
        // `border-field` — le trait des champs de formulaire, à 3:1 (WCAG
        // 1.4.11). Voir tokens.ts pour la raison du jeton séparé.
        field: v("color-border-field"),
        soft: v("color-border-soft"),
        "text-secondary": v("color-text-secondary"),
      },
      // Cross-role neutrals used as BACKGROUNDS (thin hairline fills). Surfaces,
      // accent-subtle, and the semantic fills come from `colors` above.
      backgroundColor: {
        "border-subtle": v("color-border-subtle"),
        "border-soft": v("color-border-soft"),
        "text-tertiary": v("color-text-tertiary"),
      },
      // Divider color → `divide-border-subtle`.
      divideColor: {
        "border-subtle": v("color-border-subtle"),
      },
      // Text-decoration color → `decoration-border-soft`.
      textDecorationColor: {
        "border-soft": v("color-border-soft"),
      },
      // The single dimmed/inert opacity (state-layer) → `opacity-disabled`.
      opacity: {
        disabled: v("state-disabled"),
      },

      // ── Typography (DESIGN-BIBLE §3, ADR 0023) ─────────────────────────────
      fontFamily: {
        // `serif` ne subsiste que pour la prose de leçon (ADR 0030 D2) ;
        // `display` = la même grotesque que `sans`, alias sémantique posé
        // par le codemod font-serif→font-display : les titres du chrome le
        // portent, et il pourra diverger (coupe display) sans re-codemod.
        serif: ["var(--font-reading-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-ui)", "system-ui", "sans-serif"],
        display: ["var(--font-ui)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // fontSize derived from tokens.ts typeScale (was literal rem/lineHeight here).
      fontSize,
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ── Spacing — Tailwind's default 4px-base scale is the 8-pt grid (§4). ──

      // ── Reading column ─────────────────────────────────────────────────────
      // --measure-prose (65ch) is the canonical CSS-var source; these mirror it.
      // Gouttière de page fluide — `px-gutter` (tokens.ts `--gutter`).
      padding: {
        gutter: v("gutter"),
      },

      maxWidth: {
        reading: "65ch",
        content: "72ch",
        wide: "90ch",
        lead: v("measure-lead"),
        list: v("measure-list"),
        // Les bandes de coquille viennent de tokens.ts (jetons CSS) : elles
        // sont fluides et doivent grandir jusqu'aux classes M3 large/XL.
        page: v("band-page"),
        atelier: v("band-atelier"),
        notion: "1140px",
      },

      // ── Border radius (DESIGN-BIBLE §4/§6) — derived from tokens.ts ─────────
      borderRadius: radius,

      // ── Motion / transitions (DESIGN-BIBLE §5, ADR 0022) — never bounce. ────
      // Derived from tokens.ts `motion`; each key references the CSS var the
      // generator emits, so the tailwind utility and the CSS-side var are one
      // definition (was: two literal copies that had drifted — CSS lacked
      // `slow`, tailwind lacked `view`).
      transitionDuration: Object.fromEntries(
        Object.keys(motion.duration).map((k) => [k, v(`duration-${k}`)]),
      ),
      transitionTimingFunction: Object.fromEntries(
        Object.keys(motion.ease).map((k) => [k, v(`ease-${k}`)]),
      ),

      // ── New systemized families (Phase A / W3) ─────────────────────────────
      // Eyebrow small-caps tracking — replaces `tracking-[0.14em]` (13 files).
      letterSpacing: {
        eyebrow: v("tracking-eyebrow"),
      },
      // A11y touch target — replaces `min-h-[48px]` / `min-w-[48px]`.
      minHeight: {
        touch: v("touch-target"),
      },
      minWidth: {
        touch: v("touch-target"),
      },
      // Semantic z-index tiers — replace raw z-10 / z-40 / z-50.
      zIndex: {
        raised: v("z-raised"),
        header: v("z-header"),
        overlay: v("z-overlay"),
      },

      // ── Box shadow — 5-step elevation via CSS vars (ADR 0022) ──────────────
      // The legacy cool-palette `subtle`/`soft` aliases were removed in Phase A
      // (dead: 0 uses, and they contradicted the warm ADR 0023 palette).
      boxShadow: {
        none: "none",
        "elevation-0": v("elevation-0"),
        "elevation-1": v("elevation-1"),
        "elevation-2": v("elevation-2"),
        "elevation-3": v("elevation-3"),
        "elevation-4": v("elevation-4"),
      },

      // ── Focus ring (DESIGN-BIBLE §9) ───────────────────────────────────────
      ringColor: {
        focus: v("color-accent"),
      },
      ringOffsetWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
