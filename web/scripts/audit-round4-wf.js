export const meta = {
  name: 'google-grade-audit-round4',
  description: 'Round-3 13-front Google/Material Hybrid design audit (each /20) + calm-load adversary + scorecard synthesis [R4]',
  phases: [
    { title: 'Audit', detail: '13 front-auditors + calm-load adversary, in parallel' },
    { title: 'Synthesize', detail: 'merge into a /20 scorecard with named weaknesses' },
  ],
}

// ── Shared inputs ──────────────────────────────────────────────────────────────
const RUBRIC = 'docs/design/GOOGLE-AUDIT-RUBRIC.md'
const SITE = 'web/shots/site' // whole-site matrix (home/notion/404 × compact/medium/expanded × light/dark)
const COMP = 'web/shots/r1'   // component crops (masthead/checkpoint/embed/header-glass/focus-primary × light/dark)

// The protected identity — graders must credit these as deliberate and score the
// CRAFT of their execution, never penalize them for not matching Material's look.
const PROTECTED = `PROTECTED IDENTITY (grade craft, NEVER Material conformance — penalizing these makes 18 unreachable):
warm ivory/charcoal palette · deep-teal single signature accent · muted (non-neon) semantics ·
Source Serif 4 + IBM Plex Sans editorial pairing · bounded 65ch measure · shadow-first hairline cards ·
no ripple · no FAB · no bottom-nav · no overshoot/bounce · learner-paced (no autoplay/scroll-trigger) motion ·
calm core / no engagement theater · one-primary-action-per-surface. (VISION; ADRs 0017/0022/0023/0024.)`

// Round-2 baseline (the scores this round must beat / hold): most fronts 17–18,
// Typography 19; the one front still under 18 to re-check is Interaction-states (17 in R3).
const R2 = `ROUND-3 prior scores (this is the R3→R4 delta): Color 19, Typography 19, Layout 18, Adaptive 18, Elevation 18,
Shape 18, Motion 18, Interaction-states 17, Iconography 18, Accessibility 18, Content 18, Component-quality 18, Cohesion 18.
(Only Interaction-states was under 18 in R3; the target is EVERY front ≥18, push 19.)
Round-4 changes since: added .state-layer to the last color-only controls — EmbedPanel external links, McqItem
"Voir la solution complète" <summary>, FontSizeStepper active thumb; calmed .btn-primary hover (no longer also
leaps elevation-2→3 — two cues, not three); extracted a shared <TransportButton> (one btnBase, one disabled
mechanism) used by MotionStage + MotionDiagram; 8px focus ring ([--focus-radius:8px]) on every rounded-md/8px
chrome control (transport, FontSizeStepper, SiteHeader wordmark+nav, EmbedPanel links, McqItem summary);
.btn-primary radius 10→12px (lg) + matching focus; 8dp sweep (btn-primary pad 20→24, prose pre 20→24, home
mb-5→mb-6); dark elevation — warm ring now on all 4 steps + widened 1→2 delta; CheckpointItem option rows
surface-base→surface-raised (tone/shadow agreement, MCQ parity); figure + transport + header aria strings routed
through frenchTypography (announced-layer orthotypography); reserved --state-dragged + ~10% wash ceiling documented.`

const FRONT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['front', 'score', 'band', 'summary', 'strengths', 'weaknesses', 'blocking_for_18'],
  properties: {
    front: { type: 'string' },
    score: { type: 'integer', minimum: 0, maximum: 20 },
    band: { type: 'string', description: 'the /20 band label from the rubric' },
    summary: { type: 'string', description: 'one-paragraph verdict' },
    strengths: { type: 'array', items: { type: 'string' }, maxItems: 6 },
    weaknesses: {
      type: 'array', maxItems: 8,
      items: {
        type: 'object', additionalProperties: false,
        required: ['severity', 'issue', 'where', 'fix'],
        properties: {
          severity: { type: 'string', enum: ['high', 'med', 'low'] },
          issue: { type: 'string' },
          where: { type: 'string', description: 'file:line or shot filename' },
          fix: { type: 'string', description: 'concrete, specific change' },
        },
      },
    },
    blocking_for_18: {
      type: 'array', items: { type: 'string' }, maxItems: 6,
      description: 'the specific things keeping this front under 18 — empty if already ≥18',
    },
  },
}

// Per-front config: rubric anchor + the priority shots + the priority code to read.
const FRONTS = [
  {
    key: 'Color',
    look: `${SITE}/notion-expanded-light-fold.png, ${SITE}/notion-expanded-dark-fold.png, ${SITE}/home-expanded-light-fold.png, ${SITE}/home-expanded-dark-fold.png, ${COMP}/checkpoint-light.png, ${COMP}/checkpoint-dark.png, ${COMP}/embed-dark.png`,
    code: `web/src/app/globals.css (the :root + .dark token blocks: color roles, surface-container ladder lowest→highest, semantics, on-colors), web/tailwind.config.ts (color aliases)`,
    focus: `contrast ≥4.5/3:1 both themes; surface luminance separation across the tonal ladder; role completeness; the craft of the warm/teal/muted palette. Verify the surface-container ladder reads as distinct steps in BOTH themes.`,
  },
  {
    key: 'Typography',
    look: `${SITE}/notion-expanded-light-s1.png, ${SITE}/notion-expanded-light-s2.png, ${SITE}/home-expanded-light-fold.png, ${SITE}/notion-expanded-dark-s1.png`,
    code: `web/src/app/globals.css (type scale, .prose-lesson, KaTeX harmony rules, --measure-* tokens), web/tailwind.config.ts (fontSize/fontFamily), web/src/app/page.tsx (display/lead/h3)`,
    focus: `scale mapped to M3 roles; tracking + line-height discipline; hierarchy by weight/size; the serif+sans pairing craft; KaTeX-vs-serif harmony; 65ch/52ch measure discipline.`,
  },
  {
    key: 'Layout-grid-spacing',
    look: `${SITE}/home-expanded-light-fold.png, ${SITE}/home-medium-light-fold.png, ${SITE}/notion-expanded-light-fold.png, ${SITE}/notion-medium-light-fold.png, ${SITE}/home-compact-light-fold.png`,
    code: `web/src/app/globals.css (.notion-page-grid/.notion-rail/.notion-content breakpoint ladder, measure tokens), web/src/app/page.tsx (card padding, section measure), web/src/components/ui/PageShell.tsx`,
    focus: `strict 8 dp grid (flag any off-grid padding/gap like 20px, py-5); margin/gutter conventions; padding rhythm; alignment spines; reading structure. The rail/content grid at every breakpoint.`,
  },
  {
    key: 'Adaptive-responsive',
    look: `${SITE}/home-compact-light-fold.png, ${SITE}/home-medium-light-fold.png, ${SITE}/home-expanded-light-fold.png, ${SITE}/notion-compact-light-fold.png, ${SITE}/notion-medium-light-fold.png, ${SITE}/notion-expanded-light-fold.png, ${SITE}/404-medium-light-fold.png`,
    code: `web/src/app/globals.css (the @media 600/840 ladder for .notion-page-grid/.notion-rail/.notion-content), web/tailwind.config.ts (screens bp-medium/bp-expanded), web/src/components/ui/SiteHeader.tsx`,
    focus: `M3 window-size classes (compact <600 / medium 600–840 / expanded 840+); reflow-not-hide; a REAL medium/tablet layout (not the bare compact layout stretched); list-detail rail+content. Check all three widths actually differ and none breaks.`,
  },
  {
    key: 'Elevation-depth',
    look: `${COMP}/checkpoint-light.png, ${COMP}/checkpoint-dark.png, ${COMP}/embed-light.png, ${COMP}/embed-dark.png, ${SITE}/notion-expanded-dark-fold.png, ${COMP}/header-glass-dark.png`,
    code: `web/src/app/globals.css (--elevation-* shadow tokens, surface-container ladder, .header-glass, .shadow-elevation-* via tailwind), web/tailwind.config.ts (boxShadow)`,
    focus: `clear depth hierarchy; tonal-surface + shadow elevation layered on the shadow-first model; hairline cards; warm shadows; dark inset luminance. Does depth read through BOTH tone and shadow.`,
  },
  {
    key: 'Shape',
    look: `${COMP}/checkpoint-light.png, ${COMP}/embed-light.png, ${SITE}/home-expanded-light-fold.png, ${SITE}/notion-expanded-light-fold.png`,
    code: `web/src/app/globals.css (--focus-radius, radii usage), web/tailwind.config.ts (borderRadius scale), web/src/components/** (rounded-md/lg/xl per component)`,
    focus: `rationalized corner scale mapped to M3 logic; per-component radius consistency; the gentler max radius is protected. Flag any one-off radius that breaks the scale.`,
  },
  {
    key: 'Motion',
    look: `${COMP}/focus-primary.png`,
    code: `web/src/components/notion/MotionStage.tsx (beat engine, learner-paced contract), web/src/components/notion/MotionDiagram.tsx, web/src/app/globals.css (--ease-*/--duration-* tokens, .motion-fade-through/.motion-container-transform keyframes, .state-layer/.btn-primary transitions)`,
    focus: `easing/duration TOKEN discipline (no raw ms/cubic-bezier in components); reduced-motion handling; M3 transition patterns in no-overshoot form; learner-paced beats; NO bounce/overshoot/ripple/autoplay. Verify timing is token-driven everywhere.`,
  },
  {
    key: 'Interaction-states',
    look: `${COMP}/checkpoint-light.png, ${COMP}/checkpoint-dark.png, ${COMP}/embed-light.png, ${COMP}/focus-primary.png`,
    code: `web/src/app/globals.css (.state-layer + ::after, .state-disabled, .btn-primary::after, --state-* opacities), web/src/components/notion/ChoiceButton.tsx, web/src/components/notion/MotionStage.tsx + MotionDiagram.tsx (btnBase), web/src/components/ui/SiteHeader.tsx, web/src/components/ui/FontSizeStepper.tsx, web/src/app/page.tsx (NotionCard)`,
    focus: `a SYSTEMATIC state-layer model applied CONSISTENTLY across EVERY interactive control (buttons, options, rail, stepper, header links, embed, cards, transport, primary btn). Hover/focus/pressed/disabled defined and uniform. Hunt for any interactive element STILL missing .state-layer. Overlay+shadow, never ripple.`,
  },
  {
    key: 'Iconography',
    look: `${COMP}/masthead-light.png, ${COMP}/checkpoint-light.png, ${COMP}/embed-light.png, ${SITE}/notion-expanded-light-s2.png`,
    code: `web/src/components/ui/Icon.tsx (the shared module + IconName union + wrappers + ResultIcon), and grep for any remaining inline <svg> in web/src/components/** and web/src/app/**`,
    focus: `ONE consistent icon system: shared Icon module, currentColor, 24×24 viewBox, sizing on the 4 dp grid, consistent stroke. Flag ANY surviving ad-hoc inline <svg> glyph outside Icon.tsx. (Round 3 migrated MotionStage's last 3 — verify none remain.)`,
  },
  {
    key: 'Accessibility',
    look: `${COMP}/focus-primary.png, ${COMP}/checkpoint-light.png, ${COMP}/checkpoint-dark.png, ${SITE}/notion-compact-light-s1.png`,
    code: `web/src/app/globals.css (focus-ring/focus-halo, --state-disabled, contrast of text-secondary/tertiary tokens), web/src/components/ui/Eyebrow.tsx (muted now secondary), web/src/components/notion/ChoiceButton.tsx (aria), MotionStage/Diagram (touch targets, aria-live)`,
    focus: `WCAG AA contrast (compute key pairs both themes — esp. any 12px/tertiary text, the muted Eyebrow, step indicators, captions); 48 dp targets; visible focus everywhere; reduced-motion; color-not-alone; 200% text. Verify the R2 contrast regression (muted Eyebrow) is healed and no new sub-4.5:1 text exists.`,
  },
  {
    key: 'Content-writing',
    look: `${SITE}/home-expanded-light-fold.png, ${SITE}/notion-expanded-light-s1.png, ${SITE}/404-expanded-light-fold.png, ${SITE}/notion-expanded-light-s3.png`,
    code: `web/src/app/page.tsx, web/src/app/not-found.tsx, web/src/components/notion/*.tsx (labels/buttons/captions), web/src/lib/frenchTypography.ts + remarkFrenchTypography.ts`,
    focus: `M3 content principles ADAPTED to French convention: concise, second-person, scannable, present tense, no shouting/needless punctuation; curly apostrophe U+2019; narrow no-break space U+202F before ; : ! ? and inside guillemets. Audit ALL chrome/labels/buttons/captions. French-first tutor voice is protected.`,
  },
  {
    key: 'Component-quality',
    look: `${COMP}/masthead-light.png, ${COMP}/checkpoint-light.png, ${COMP}/checkpoint-dark.png, ${COMP}/embed-light.png, ${COMP}/header-glass-light.png`,
    code: `web/src/components/notion/ChoiceButton.tsx, McqItem.tsx, CheckpointItem.tsx, EmbedPanel.tsx, MotionStage.tsx, MotionDiagram.tsx, SiteHeader.tsx, web/src/components/ui/*.tsx`,
    focus: `every component meets the state-layer model, elevation, token usage (no magic numbers), a11y, and is consistent with its peers. Flag duplication, divergent patterns, off-token values, any component out of step with the system.`,
  },
  {
    key: 'Overall-cohesion',
    look: `${SITE}/home-expanded-light-fold.png, ${SITE}/notion-expanded-light-fold.png, ${SITE}/notion-expanded-dark-fold.png, ${SITE}/home-medium-light-fold.png, ${SITE}/notion-compact-light-fold.png, ${SITE}/404-expanded-light-fold.png`,
    code: `web/src/app/globals.css (the whole token system as a coherent language)`,
    focus: `the qualitative Google-feel pillars: simple, fast, beautiful, intentional, user-centered; restraint-with-purpose; meaningful motion; systematic consistency. Does the WHOLE read as considered-and-systematic, one hand, across home+notion+404 × light+dark × 3 widths.`,
  },
]

function frontPrompt(f) {
  return `You are the **${f.key}** auditor in a Google/Material-grade "Hybrid" design audit (Round 4) of a Moroccan baccalauréat physics study app (Next.js + Tailwind, warm-editorial identity with adopted Material mechanisms).

1. Read the rubric front for ${f.key}: ${RUBRIC} — find the "${f.key}" section, its rules (tagged [U]niversal / [H]ybrid-adopt / [P]rotected), and the /20 scoring bands. Score against THOSE bands.
2. Look at these screenshots (use the Read tool — it renders PNGs): ${f.look}
3. Read this code: ${f.code}

${PROTECTED}

${R2}

YOUR FOCUS: ${f.focus}

Grade honestly and demandingly — this is a push to 18–19/20. A protected-identity choice executed with craft does NOT cost points; only weak execution does. Score /20. Name EVERY weakness with a concrete file:line (or shot filename) and a specific, implementable fix. In blocking_for_18, list precisely what keeps this front under 18 (empty array if you score it ≥18). Return ONLY the structured object.`
}

// ── Audit phase: 13 fronts + calm-load adversary, all in parallel ──────────────
phase('Audit')

const CALM_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['verdict', 'regressions'],
  properties: {
    verdict: { type: 'string', enum: ['calm-core-intact', 'regressions-found'] },
    regressions: {
      type: 'array', maxItems: 10,
      items: {
        type: 'object', additionalProperties: false,
        required: ['front', 'issue', 'where', 'severity'],
        properties: {
          front: { type: 'string' },
          issue: { type: 'string' },
          where: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'med', 'low'] },
        },
      },
    },
  },
}

const calmThunk = () => agent(
  `You are the CALM-LOAD ADVERSARY (DESIGN-BIBLE §0/§5/§7) in Round 4 of a design audit. The redesign adopts Material *mechanisms* (state layers, tonal surfaces, M3 transition patterns) but MUST keep a calm, flow-protecting core for a 2-hour study session. Your job: hunt for engagement-theater / loudness / ADHD-inducing motion / seductive detail / gratuitous decoration leaking in via the Material adoptions.

Read the rubric: ${RUBRIC}. Look at: ${SITE}/notion-expanded-light-fold.png, ${SITE}/notion-expanded-dark-fold.png, ${SITE}/home-expanded-light-fold.png, ${COMP}/checkpoint-light.png, ${COMP}/embed-light.png, ${COMP}/focus-primary.png. Read web/src/app/globals.css (.state-layer/.btn-primary overlays, .motion-* keyframes, --state-* opacities, --duration-*/--ease-* tokens) and web/src/components/notion/MotionStage.tsx + TransportButton.tsx.

In R3 you flagged three things: (1) [med] .btn-primary hover compounded three cues incl. a loud elevation-2→3 jump; (2) [low] .motion-fade-through self-fires a scale on mount; (3) [low] the frosted header's saturate() amplifies palette on scroll. Round 4 changed .btn-primary so hover NO LONGER leaps elevation (two cues now: overlay + fill-shift; elevation only drops on press) — VERIFY this is resolved. Then check the rest: are all state-layer overlays SUBTLE (6–12% neutral, no ripple, no bounce)? Is any motion autoplay/scroll-triggered? Any color/elevation too loud? Any new control's state-layer wash too strong or competing with the reading content? Default to flagging if uncertain. Return ONLY the structured object.`,
  { label: 'calm-load-adversary', phase: 'Audit', schema: CALM_SCHEMA }
)

const auditResults = await parallel([
  ...FRONTS.map(f => () => agent(frontPrompt(f), { label: `audit:${f.key}`, phase: 'Audit', schema: FRONT_SCHEMA })),
  calmThunk,
])

const fronts = auditResults.slice(0, FRONTS.length).filter(Boolean)
const calm = auditResults[FRONTS.length] || null

log(`Audited ${fronts.length}/${FRONTS.length} fronts. Min score: ${Math.min(...fronts.map(f => f.score))}. Calm verdict: ${calm ? calm.verdict : 'n/a'}`)

// ── Synthesis phase: merge into a markdown scorecard ───────────────────────────
phase('Synthesize')

const synthPrompt = `You are synthesizing the Round-3 Google-grade Hybrid design-audit scorecard for a Moroccan bac physics study app.

Here are the 13 front-auditor results (JSON):
${JSON.stringify(fronts, null, 1)}

Here is the calm-load adversary verdict (JSON):
${JSON.stringify(calm, null, 1)}

${R2}

Produce a single Markdown document — the Round-4 scorecard — with EXACTLY these sections:

# Google-Grade Hybrid Audit — Round 4 Scorecard

## Summary table
A table: Front | R3 | R4 | Δ | Band | Blocking-for-18? (yes/no). Use the R3 numbers above as the prior column. Sort by R4 ascending (worst first). After the table: min score, average score (1 decimal), and count of fronts ≥18. State explicitly whether the bar — EVERY front ≥18 — is now met.

## Calm-core verdict
One line: the adversary's verdict + any regressions it flagged (or "none"). Note explicitly whether the R3 .btn-primary hover regression is resolved.

## Fronts still under 18 (if any)
For each front scoring <18, a subsection: its score, and a bulleted, PRIORITIZED list of the highest-leverage fixes (severity high first), each as: \`file:line\` — fix. Pull these from the auditors' weaknesses/blocking_for_18. If NONE are under 18, write "None — every front is at 18 or 19." and say so plainly.

## Fronts at 18–19 — hold-the-line notes
For fronts ≥18, one bullet each: the single thing that, if regressed, would drop it.

## Round-5 plan (push the 18s toward 19)
A short ordered list of the highest-leverage changes that would move 18s to 19, deduplicated (some fixes help multiple fronts — note which). If the set already feels converged, say which 2–3 fronts have the most reachable path to 19.

Be precise and honest. Do not inflate scores — a front that did not actually improve must keep its number. Output ONLY the Markdown.`

const scorecard = await agent(synthPrompt, { label: 'synthesize-scorecard', phase: 'Synthesize' })

return { scorecard, min: Math.min(...fronts.map(f => f.score)), fronts: fronts.map(f => ({ front: f.front, score: f.score })), calm: calm ? calm.verdict : null }
