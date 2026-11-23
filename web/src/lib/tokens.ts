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
  // ── MANUEL CALME (ADR 0045, 2026-11-23) ────────────────────────────────
  // Papier chaud en clair (#FAFAF7), charbon chaud en sombre (#121210), rouge
  // signal adouci (#C81E2B / #F04E5A), zéro ombre et angles francs à 0 px.
  // Hiérarchie par paliers tonaux chauds et filets fins. Toutes les paires
  // passent `scripts/contrast-gate.mjs` (76 paires, WCAG AA).
  light: {
    selector: ":root",
    vars: {
      // Surfaces — toile papier chaud (#FAFAF7), cartes et figures en blanc à
      // peine chaud (#FFFFFC, jamais #FFFFFF pur — DESIGN-BIBLE §2 / ADR 0045).
      "--color-surface-base": "#FAFAF7",
      "--color-surface-raised": "#FFFFFC",
      "--color-surface-overlay": "#FFFFFC",
      // Échelle container monotone croissante (même sens qu'en sombre) :
      // lowest = puits / pistes (#ECECE5) → low (#F2F2EC) → container (#F6F6F1)
      // → high (#FAF9F5) → highest = cartes élevées (#FFFFFC).
      "--color-surface-container-lowest": "#ECECE5",
      "--color-surface-container-low": "#F2F2EC",
      "--color-surface-container": "#F6F6F1",
      "--color-surface-container-high": "#FAF9F5",
      "--color-surface-container-highest": "#FFFFFC",
      // Bordures chaudes — elles portent la séparation sans ombres.
      "--color-border-subtle": "#E4E4DC",
      "--color-border-soft": "#D0CFC5",
      // Bordure de champ (WCAG 1.4.11 ≥ 3:1) : 5,14:1 sur base, 5,37:1 sur raised.
      "--color-border-field": "#6B6B63",
      // Encre chaude — 17,0:1 / 8,5:1 / 6,4:1 sur base ; tertiary ≥ 6,44:1 sur base/highest.
      "--color-text-primary": "#181816",
      "--color-text-secondary": "#4A4A44",
      "--color-text-tertiary": "#5C5C55",
      "--color-text-on-accent": "#FAFAF7",
      // Accent principal — encre chaude pour le calme (action primaire).
      "--color-accent": "#181816",
      "--color-accent-strong": "#0F0F0D",
      "--color-accent-light": "#8A8A82",
      "--color-accent-subtle": "#EFEFE9",
      // Rouge signal (ADR 0045) : réservé aux repères actifs et erreurs
      // (5,46:1 sur base, 5,70:1 sur raised).
      "--color-signal": "#C81E2B",
      "--color-signal-subtle": "#FCECEF",
      "--color-on-signal": "#FAFAF7",
      "--focus-halo": "rgba(200,30,43,.22)",
      // Sémantique — toutes ≥ 6,1:1 sur base et raised.
      "--color-success": "#146C43",
      "--color-success-subtle": "#E7F3EC",
      "--color-on-success": "#FAFAF7",
      "--color-warning": "#8A4B08",
      "--color-warning-subtle": "#FBF1DC",
      "--color-error": "#B91C1C",
      "--color-error-subtle": "#FCECEF",
      "--color-on-error": "#FAFAF7",
      // Matières — système monochrome en encre chaude (pas de code couleur par matière).
      "--subject-maths": "#181816",
      "--subject-maths-subtle": "#EFEFE9",
      "--subject-maths-on": "#FAFAF7",
      "--subject-pc": "#181816",
      "--subject-pc-subtle": "#EFEFE9",
      "--subject-pc-on": "#FAFAF7",
      "--subject-svt": "#181816",
      "--subject-svt-subtle": "#EFEFE9",
      "--subject-svt-on": "#FAFAF7",
      "--subject-philo": "#181816",
      "--subject-philo-subtle": "#EFEFE9",
      "--subject-philo-on": "#FAFAF7",
      "--subject-si": "#181816",
      "--subject-si-subtle": "#EFEFE9",
      "--subject-si-on": "#FAFAF7",
      // Ombres désactivées : la hiérarchie repose sur les paliers tonaux et les filets.
      "--elevation-0": "none",
      "--elevation-1": "none",
      "--elevation-2": "none",
      "--elevation-3": "none",
      "--elevation-4": "none",
      // Figures — repère sur blanc à peine chaud (#FFFFFC) ; teintes sémantiques
      // de scène conservées pour la stabilité des 13 portes de scène (`scenes.yml`).
      "--figure-surface": "#FFFFFC",
      "--figure-ink": "#181816",
      "--figure-ink-soft": "#4A4A44",
      "--figure-grid": "#E4E4DC",
      "--figure-accent": "#00746A",
      "--figure-energy-C": "#3C5C98",
      "--figure-energy-L": "#386B3A",
      "--figure-regime-periodic": "#3C5C98",
      "--figure-regime-pseudo": "#84582A",
      "--figure-regime-aperiodic": "#704B89",
    },
  },
  // Sombre — charbon chaud (#121210) sans halation ni noir pur ;
  // toutes les paires passent contrast-gate.mjs (pire cas : tertiary sur highest 4,86:1).
  dark: {
    selector: ".dark",
    vars: {
      "--color-surface-base": "#121210",
      "--color-surface-raised": "#1A1A17",
      "--color-surface-overlay": "#22221E",
      "--color-surface-container-lowest": "#0D0D0B",
      "--color-surface-container-low": "#171714",
      "--color-surface-container": "#1A1A17",
      "--color-surface-container-high": "#20201C",
      "--color-surface-container-highest": "#262622",
      "--color-border-subtle": "#2B2B26",
      "--color-border-soft": "#3C3C35",
      "--color-border-field": "#8E8D83",
      "--color-text-primary": "#EDECE6",
      "--color-text-secondary": "#B3B2A8",
      "--color-text-tertiary": "#939289",
      "--color-text-on-accent": "#121210",
      "--color-accent": "#EDECE6",
      "--color-accent-strong": "#FAFAF7",
      "--color-accent-light": "#6E6D65",
      "--color-accent-subtle": "#262622",
      "--color-signal": "#F04E5A",
      "--color-signal-subtle": "#2C1417",
      "--color-on-signal": "#121210",
      "--focus-halo": "rgba(240,78,90,.28)",
      "--color-success": "#4ADE80",
      "--color-success-subtle": "#13261B",
      "--color-on-success": "#121210",
      "--color-warning": "#FBBF24",
      "--color-warning-subtle": "#2B2212",
      "--color-error": "#F87171",
      "--color-error-subtle": "#2C1417",
      "--color-on-error": "#121210",
      "--subject-maths": "#EDECE6",
      "--subject-maths-subtle": "#262622",
      "--subject-maths-on": "#121210",
      "--subject-pc": "#EDECE6",
      "--subject-pc-subtle": "#262622",
      "--subject-pc-on": "#121210",
      "--subject-svt": "#EDECE6",
      "--subject-svt-subtle": "#262622",
      "--subject-svt-on": "#121210",
      "--subject-philo": "#EDECE6",
      "--subject-philo-subtle": "#262622",
      "--subject-philo-on": "#121210",
      "--subject-si": "#EDECE6",
      "--subject-si-subtle": "#262622",
      "--subject-si-on": "#121210",
      "--elevation-0": "none",
      "--elevation-1": "none",
      "--elevation-2": "none",
      "--elevation-3": "none",
      "--elevation-4": "none",
      "--figure-surface": "#1A1A17",
      "--figure-ink": "#EDECE6",
      "--figure-ink-soft": "#B3B2A8",
      "--figure-grid": "#2B2B26",
      "--figure-accent": "#6DC3B8",
      "--figure-energy-C": "#86A5DE",
      "--figure-energy-L": "#83B384",
      "--figure-regime-periodic": "#86A5DE",
      "--figure-regime-pseudo": "#CB9E72",
      "--figure-regime-aperiodic": "#B695CF",
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
  "--focus-radius": "0px",
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
  // ── Les BANDES de page (2026-08-17) ────────────────────────────────────
  // Une bande n'est pas une mesure de lecture. Les `--measure-*` ci-dessus
  // bornent une LIGNE DE TEXTE (65 caractères : au-delà, l'œil perd la ligne
  // en revenant à la marge — ça n'est pas négociable et ça ne bouge pas).
  // Les bandes ci-dessous bornent la COQUILLE, et elles, elles doivent
  // grandir : c'est là que passaient 33 % de l'écran à 1920 px.
  //
  // La règle qui les sépare : la prose reste étroite, la coquille s'élargit,
  // et la largeur gagnée va aux FIGURES et aux LISTES — jamais à la ligne de
  // texte. Un écran plus large doit montrer plus de choses, pas des phrases
  // plus longues.
  "--band-page": "min(1760px, 100%)",
  // Gouttière fluide : elle grandit avec l'écran au lieu de sauter par
  // paliers de 8 px, sans jamais dépasser 4 rem (au-delà, on recrée le vide
  // qu'on vient de supprimer).
  "--gutter": "clamp(1rem, 3vw, 4rem)",
  // Small-caps eyebrow tracking — was `tracking-eyebrow` in 13 files.
  "--tracking-eyebrow": "0.14em",
  // Familles UI (ADR 0030 D2). Pointeurs vers les variables posées par le
  // paquet geist sur <html> — l'indirection permet de changer de fournisseur
  // de fonte sans retoucher un seul composant.
  "--font-ui": "var(--font-archivo)",
  "--font-mono": "var(--font-geist-mono)",
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

// Échelle renforcée au pivot Studio (ADR 0030 ; audit Fable §3.15 : la
// hiérarchie reposait trop sur la graisse — h2 1.5rem était quasi au corps
// gras). Les crans de titre montent d'un ton et serrent leur tracking ;
// les corps ne bougent pas (la lecture était bonne).
export const typeScale: Record<string, TypeStep> = {
  caption: { rem: 0.75, lineHeight: 1.5, tracking: "0.02em" },
  "body-sm": { rem: 0.875, lineHeight: 1.5 },
  body: { rem: 1, lineHeight: 1.5 },
  "body-lg": { rem: 1.0625, lineHeight: 1.6 },
  lead: { rem: 1.125, lineHeight: 1.55 },
  h4: { rem: 1.125, lineHeight: 1.4, tracking: "-0.012em" },
  h3: { rem: 1.3125, lineHeight: 1.35, tracking: "-0.016em" },
  h2: { rem: 1.875, lineHeight: 1.15, tracking: "-0.01em" },
  h1: { rem: 2.625, lineHeight: 1.05, tracking: "-0.012em" },
  display: { rem: 3.5, lineHeight: 1, tracking: "-0.015em" },
  "display-lg": { rem: 5.5, lineHeight: 0.95, tracking: "-0.02em" },
};

/** Border radius — `rounded-<key>` (DESIGN-BIBLE §4/§6, soft radii). */
export const radius: Record<string, string> = {
  none: "0",
  sm: "0",
  DEFAULT: "0",
  md: "0",
  lg: "0",
  xl: "0",
  "2xl": "0",
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
  // M3 « large » et « extra-large ». AJOUTÉS le 2026-08-17 : ils manquaient,
  // et c'est la cause racine du vide dont se plaint l'owner. Material 3
  // définit CINQ classes de fenêtre (compact <600, medium 600, expanded 840,
  // large 1200, extra-large 1600) et place les mises en page multi-panneaux
  // à partir de « large ». Le système s'arrêtait à « expanded » et plafonnait
  // tout à 1280 px : il cessait d'adapter exactement là où M3 dit que les
  // choses intéressantes commencent. Résultat mesuré avant correction :
  // 33 % de l'écran vide à 1920 px, 52 % à 2560 px.
  "bp-large": "1200px",
  "bp-xl": "1600px",
};
// `bp-wide` (1536 px) a été RETIRÉ le 2026-08-17. C'était le `2xl` de
// Tailwind laissé en place, une valeur qui ne correspond à aucune classe
// M3 et qui tombait entre « large » (1200) et « extra-large » (1600). Elle
// retardait de 336 px l'allumage de tous les rails latéraux et des grilles
// à trois colonnes — donc elle FABRIQUAIT une partie du vide. Ses sept
// usages sont migrés vers `bp-large`, un vers `bp-xl`.
