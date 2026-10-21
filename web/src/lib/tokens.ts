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
  // ── STUDIO (ADR 0030, 2026-08-18) ─────────────────────────────────────
  // Conçu en OKLCH (clarté perçue uniforme — méthode Linear), livré en hex
  // pour que tout consommateur (contraste, SVG, scripts) lise trivialement.
  // Recette générale : neutres à teinte 90° (cast chaud) et chroma ≤ 0.008 ;
  // hiérarchie par paliers de CLARTÉ + bordures, pas par ombres. Chaque
  // valeur est passée à la porte de contraste (scripts/contrast-gate.mjs) —
  // la recette L/C/H est en commentaire pour pouvoir RE-générer.
  light: {
    selector: ":root",
    vars: {
      // Surfaces — toile près-blanc oklch(.975 .003 90) ; le TRAVAIL se
      // fait sur du blanc pur (cartes, workspace). Paliers de 1-2 % de L.
      "--color-surface-base": "#FFFFFF",
      "--color-surface-raised": "#FFFFFF",
      "--color-surface-overlay": "#FFFFFF",
      // Échelle container : lowest = puits (rails, pistes), highest = blanc.
      "--color-surface-container-lowest": "#F2F2F2",
      "--color-surface-container-low": "#F5F5F5",
      "--color-surface-container": "#F8F8F8",
      "--color-surface-container-high": "#FBFBFB",
      "--color-surface-container-highest": "#FFFFFF",
      // Bordures — elles portent la séparation (les ombres ne font que
      // suggérer). subtle oklch(.92), soft oklch(.87).
      "--color-border-subtle": "#E3E3E3",
      "--color-border-soft": "#CFCFCF",
      // Bordure de champ : SEULE délimitation d'un composant ⇒ WCAG 1.4.11
      // exige 3:1. oklch(.62) → 3,64:1 sur blanc, 3,39:1 sur toile.
      "--color-border-field": "#767676",
      // Encre — oklch(.22/.44/.53, teinte 90). 17,4:1 / 7,8:1 / 5,25:1 sur
      // blanc ; tertiary tient 4,89:1 sur toile (petit corps autorisé).
      "--color-text-primary": "#0A0A0A",
      "--color-text-secondary": "#3D3D3D",
      "--color-text-tertiary": "#6B6B6B",
      "--color-text-on-accent": "#FFFFFF",
      // Accent produit — le sarcelle signature recalibré pour le blanc :
      // oklch(.50 .095 185) → 5,67:1 en texte sur blanc. `light` est
      // DÉCORATIF uniquement (jamais du texte — exempté de la porte).
      "--color-accent": "#0A0A0A",
      "--color-accent-strong": "#000000",
      "--color-accent-light": "#8A8A8A",
      "--color-accent-subtle": "#F0F0F0",
      // GRILLE (refonte 2026-10) : le SEUL rouge, réservé à ce qui demande
      // d'agir maintenant (étape courante, points en jeu, minuteur).
      "--color-signal": "#E3051B",
      "--color-signal-subtle": "#FDECEE",
      "--color-on-signal": "#FFFFFF",
      "--focus-halo": "rgba(227,5,27,.22)",
      // Sémantique — même clarté que l'accent (poids identique) :
      // success oklch(.49 .09 152), warning (.49 .095 80), error (.49 .115 28).
      "--color-success": "#1B6B39",
      "--color-success-subtle": "#E8F3EC",
      "--color-on-success": "#FFFFFF",
      "--color-warning": "#835600",
      "--color-warning-subtle": "#FBF1DC",
      "--color-error": "#D4001A",
      "--color-error-subtle": "#FDECEE",
      "--color-on-error": "#FFFFFF",
      // Matières (ADR 0030 D3) — wayfinding, PAS actions. Cinq teintes à
      // L/C ÉGALES oklch(.48 .095 h) : poids visuel identique, toutes
      // ≥ 6,2:1 en texte sur blanc. h : maths 262, pc 55, svt 140,
      // philo 335, si 210.
      "--subject-maths": "#0A0A0A",
      "--subject-maths-subtle": "#F2F2F2",
      "--subject-maths-on": "#FFFFFF",
      "--subject-pc": "#0A0A0A",
      "--subject-pc-subtle": "#F2F2F2",
      "--subject-pc-on": "#FFFFFF",
      "--subject-svt": "#0A0A0A",
      "--subject-svt-subtle": "#F2F2F2",
      "--subject-svt-on": "#FFFFFF",
      "--subject-philo": "#0A0A0A",
      "--subject-philo-subtle": "#F2F2F2",
      "--subject-philo-on": "#FFFFFF",
      "--subject-si": "#0A0A0A",
      "--subject-si-subtle": "#F2F2F2",
      "--subject-si-on": "#FFFFFF",
      // Ombres — DEUX niveaux réels (1 = carte au repos, 2 = overlay) ;
      // 3/4 conservés pour compat, compressés vers 2. La hiérarchie vient
      // des bordures et des paliers de ton (Linear : une seule vraie ombre).
      "--elevation-0": "none",
      "--elevation-1": "none",
      "--elevation-2": "none",
      "--elevation-3": "none",
      "--elevation-4": "none",
      // Figures — le repère vit sur BLANC ; encre = texte ; grille
      // oklch(.94) à peine là ; rôles alignés sur les teintes matières
      // (C = bleu maths, L = vert, pseudo = ambre, apériodique = violet),
      // tous ≥ 6:1 sur blanc.
      "--figure-surface": "#FFFFFF",
      "--figure-ink": "#0A0A0A",
      "--figure-ink-soft": "#3D3D3D",
      "--figure-grid": "#E6E6E6",
      // Les SCÈNES et figures gardent provisoirement le sarcelle d'avant la
      // refonte : treize portes de scène lisent leurs pixels contre cette
      // teinte (seuils de chrominance calibrés dessus). CORRECTION du
      // 2026-10-21 : les six portes rouges après Grille ne venaient PAS du
      // rouge — elles restaient rouges avec le sarcelle remis. La cause
      // mesurée était le lissage sous-pixel du texte (coins carrés du
      // plateau), fixée sur le banc (`scripts/lib/banc-navigateur.mjs`).
      // Passer les scènes au rouge reste un chantier à part, porte par porte
      // (docs/refonte/00-plan.md).
      "--figure-accent": "#00746A",
      "--figure-energy-C": "#3C5C98",
      "--figure-energy-L": "#386B3A",
      "--figure-regime-periodic": "#3C5C98",
      "--figure-regime-pseudo": "#84582A",
      "--figure-regime-aperiodic": "#704B89",
    },
  },
  // Sombre — MÊME méthode, clartés inversées : toile oklch(.175), travail
  // sur raised (.215), encre .93/.76/.67, accents remontés à L ≈ .73-.78.
  // Toutes les paires passent la porte (pire cas : tertiary vs highest 4,8:1).
  dark: {
    selector: ".dark",
    vars: {
      "--color-surface-base": "#0A0A0A",
      "--color-surface-raised": "#121212",
      "--color-surface-overlay": "#1A1A1A",
      "--color-surface-container-lowest": "#050505",
      "--color-surface-container-low": "#0F0F0F",
      "--color-surface-container": "#121212",
      "--color-surface-container-high": "#181818",
      "--color-surface-container-highest": "#1F1F1F",
      // #3A3934 et pas #2F2E2A (audit R6, P2-2) : à ~1,4:1 sur les surfaces
      // sombres, les cartes se dissolvaient sur un écran atténué — la
      // méthode « hiérarchie par bordures » exige des bordures qu'on voit
      // (~1,9:1 ici, toujours discret).
      "--color-border-subtle": "#262626",
      "--color-border-soft": "#333333",
      "--color-border-field": "#8A8A8A",
      "--color-text-primary": "#F2F2F2",
      "--color-text-secondary": "#C4C4C4",
      "--color-text-tertiary": "#9A9A9A",
      "--color-text-on-accent": "#0A0A0A",
      "--color-accent": "#F2F2F2",
      "--color-accent-strong": "#FFFFFF",
      "--color-accent-light": "#6B6B6B",
      "--color-accent-subtle": "#1F1F1F",
      "--color-signal": "#FF2A3B",
      "--color-signal-subtle": "#2A0F12",
      "--color-on-signal": "#0A0A0A",
      "--focus-halo": "rgba(255,42,59,.30)",
      "--color-success": "#6CC48A",
      "--color-success-subtle": "#12261A",
      "--color-on-success": "#0A0A0A",
      "--color-warning": "#E0B860",
      "--color-warning-subtle": "#2A2214",
      "--color-error": "#FF5A66",
      "--color-error-subtle": "#2A0F12",
      "--color-on-error": "#0A0A0A",
      "--subject-maths": "#F2F2F2",
      "--subject-maths-subtle": "#1F1F1F",
      "--subject-maths-on": "#0A0A0A",
      "--subject-pc": "#F2F2F2",
      "--subject-pc-subtle": "#1F1F1F",
      "--subject-pc-on": "#0A0A0A",
      "--subject-svt": "#F2F2F2",
      "--subject-svt-subtle": "#1F1F1F",
      "--subject-svt-on": "#0A0A0A",
      "--subject-philo": "#F2F2F2",
      "--subject-philo-subtle": "#1F1F1F",
      "--subject-philo-on": "#0A0A0A",
      "--subject-si": "#F2F2F2",
      "--subject-si-subtle": "#1F1F1F",
      "--subject-si-on": "#0A0A0A",
      "--elevation-0": "none",
      "--elevation-1": "none",
      "--elevation-2": "none",
      "--elevation-3": "none",
      "--elevation-4": "none",
      "--figure-surface": "#121212",
      "--figure-ink": "#F2F2F2",
      "--figure-ink-soft": "#C4C4C4",
      "--figure-grid": "#262626",
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
  // L'atelier va plus loin que le reste : la scène EST le contenu, et une
  // figure de 600 px sur un écran de 1900 était le reproche de l'owner.
  "--band-atelier": "min(2040px, 100%)",
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
