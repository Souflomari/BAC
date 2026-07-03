# COVER-SPEC — the illustrated-cover language (Day 6)

> **Authority:** DESIGN-BIBLE §6 (generated-visual language) + §11 (page
> anatomy). Kills the "Wikipedia home" (owner verdict): notion cards carry
> covers — a designed shelf, not an index. Audience includes Sonnet 4.8 cold
> AND the future Gemini asset lane: the coded starter set in
> `web/src/components/covers/` is the spec made flesh; generated covers must
> be indistinguishable in language from the coded ones.

## The language (§6 applied)

- **Flat vector, subtle gradients allowed but not required;** rounded, soft
  geometry; NO photorealism, no texture noise, no drop shadows inside the art.
- **ONE motif per cover.** A single subject-true object or curve, composed
  large and calm. Zero seductive detail (§6 coherence principle): no
  background clutter, no decorative particles, no faces, no depth-of-field
  fakery. If a motif needs explanation, it is wrong.
- **Muted, tinted, in-palette.** Backgrounds are the warm surface tones
  (`--color-surface-container-low/-lowest`); strokes/fills use the FIGURE
  palette (`--figure-*`) + at most ONE per-subject accent hue. Never the
  semantic colors, never full saturation. Dark mode works by construction
  (CSS vars), never by a second asset.
- **Subject-true motifs (starter set):** Maths = a branching probability
  tree; Physique-Chimie = a damped oscillation trace; SVT = a leaf with
  veins. Notion covers specialize the subject motif (RLC = damped trace +
  minimal L/C circuit glyphs).
- **Per-subject accent hue (from the figure palette, NOT new colors):**
  maths → `--figure-energy-C` (slate-blue) · pc → `--figure-accent` (teal) ·
  svt → `--figure-energy-L` (teal-green). One hue per cover; everything else
  neutral ink/grid tones.

## Composition & geometry

- **ViewBox 320×200 (aspect 8:5).** Rendered at card width; `aspect-[8/5]`.
- The motif occupies the middle 60–80% with generous margin; horizon/baseline
  sits on thirds, never centered-dead. Stroke weight 2.5–4 at viewBox scale
  (reads at both card and thumbnail sizes).
- Corner radius comes from the CARD (the SVG is clipped by its container,
  `rounded-t-xl` in shelf cards) — the art itself has square corners.
- Text NEVER inside the cover art. Titles live in the card below.

## Placement rules

- **Home shelf cards:** cover on top (full card width, aspect 8:5), then
  title (serif, lead) + reading time. The shelf is a grid (2-up at content
  width), cards on `surface-raised` + `shadow-elevation-1`, state-layer hover.
- **Home session card:** may carry the suggested notion's cover as a side
  panel at `bp-medium+` (right column, same art). Optional; the session copy
  leads.
- **Masthead-band tie-in (optional, notion page):** the cover motif may echo
  in the band at low emphasis (right-aligned, ≤40% width, opacity ≤ 0.6);
  NEVER behind the title text (legibility), never animated. Not shipped by
  default — an owner-reviewable enhancement.
- Every rendered cover carries TWO attributes (rule completed Day 7 — the
  split previously lived only in a Cover.tsx code comment, a real spec gap):
  `data-cover="<subject|notion-slug>"` (what the card is FOR) and
  `data-motif="<resolved motif id>"` (what actually RENDERED — differs from
  data-cover when a notion falls back to its subject default). dom-truth
  asserts on the pair: presence of data-cover alone cannot distinguish a
  real per-notion motif from the fallback. A new per-notion cover is DONE
  when `[data-cover='<slug>'][data-motif='<slug>']` renders on the home
  shelf.

## Provenance & the Gemini lane

Coded SVG is the source of truth for the language (deterministic, in-palette,
versioned — this starter set). When the Gemini lane produces covers (ADR
0017's taxonomy still binds: structural/labelled diagrams stay CODED), each
generated cover must pass the §6 gallery-calm test AND match this spec's
composition rules; the coded set is the few-shot reference. A generated cover
that cannot be reproduced from its prompt + seed is not accepted (versioned
prompts live with the asset).
