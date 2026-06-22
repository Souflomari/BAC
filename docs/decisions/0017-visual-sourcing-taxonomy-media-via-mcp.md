# ADR 0017 — Visual-sourcing taxonomy; media generation via the gemini-image MCP

**Status.** Accepted, 2026 (first-slice media validation). The 4-agent content
pipeline this ADR folds in is recorded as **provisional**, pending validation by
the first slice actually running it end-to-end.

**Relates to.** ADR 0016 (frontend rebuild — the coded-vector / embed visual
modalities live in the Next.js/React frontend). The media lane is described
operationally in `docs/pipeline/pipeline.md`; this ADR discharges the
`⚠ Needs an ADR` flag carried there.

---

## Context

The product needs visuals for very different jobs: atmospheric hooks that set a
scene, exact labelled diagrams (probability trees, circuit schematics),
manipulable interactives, and motion explanations of the hardest concepts. The
DESIGN-BIBLE (§6) governs how *all* of them must look — calm, flat-vector,
gallery-like. The open question (CLAUDE.md "Open decisions" §4, and the
`⚠ Needs an ADR` flag in the pipeline doc) was *which tool sources which kind of
visual* — and specifically whether AI raster generation (Gemini, via the
`gemini-image` MCP server) can be trusted for diagrams.

## Decision

**Media generation runs via the `gemini-image` MCP server, but generated raster
imagery is reserved for ATMOSPHERIC / ILLUSTRATIVE visuals only.** Every visual
is sourced by its *kind*, per this taxonomy:

| Kind | Job | Tool |
|---|---|---|
| **Atmospheric / illustrative** | hooks, scene-setting | **Gemini** — gemini-image MCP, with the DESIGN-BIBLE style preamble appended verbatim |
| **Structural / labelled** | probability trees, circuit schematics, geometric figures, SVT schemas | **Coded SVG + KaTeX** — never Gemini |
| **Manipulable** | drag-the-point, RLC sandbox | **Embed** (GeoGebra / Desmos / Falstad / PhET) — don't rebuild |
| **Motion explanation** | the hardest concepts | **Manim** |

The DESIGN-BIBLE style preamble is appended verbatim to *every* Gemini brief
(mandatory), so even atmospheric generation stays inside the visual language.

## Evidence

Two media smoke tests — commit `9ba0977` (initial generation) and the
gemini-image MCP run (`content/_media-test/conditional-probability-tree-mcp.png`)
— showed the **same split**:

- **Aesthetic: PASS.** Gemini reliably holds the DESIGN-BIBLE register — calm,
  flat-vector, muted tinted-neutral palette, soft geometry, no decorative
  clutter.
- **Structure: FAIL.** Asked for a 2→2→4 conditional-probability tree, it drew
  **2→3→6**.
- **Glyphs / labels: FAIL.** Math notation came out incoherent — transposed /
  garbled `P(A|B)` notation, duplicated edge labels, probabilities that do not
  sum.

The conclusion is **architectural, not a prompting problem**: a diffusion image
model renders a *plausible-looking* picture, not a *correct* one, so exact
structure and exact glyphs are unreliable by construction. Aesthetic is
reliable; structure and labels are not. Hence the split above — and hence
structural/labelled work is sourced from code, never from generation.

## Consequences

- **The visual-sourcing question (CLAUDE.md Open Decisions §4) is settled** for
  the static-visual half: Gemini for atmosphere, code for structure, embeds for
  manipulables, Manim for motion. The hard line — that generated assets never
  substitute for a manipulable interactive where the pedagogy requires
  manipulation — is preserved and sharpened.
- **The `⚠ Needs an ADR` flag in `docs/pipeline/pipeline.md` is discharged** by
  this ADR.
- **pedagogy-architect specs must type their media callouts.** Every callout
  names a `type` and a `tool` drawn from this taxonomy (enforced in
  `.claude/agents/pedagogy-architect.md`).
- **The 4-agent pipeline is recorded as PROVISIONAL.** The roster the pipeline
  doc describes — orchestrator + pedagogy-architect, content-author,
  item-author, supabase-architect, with Gemini media called inline by the
  orchestrator — is folded in here for context, but is **not** marked settled.
  It is validated only when the first slice (Probabilités · SM, RLC · PC)
  actually runs it end-to-end and the Opus→Sonnet handoff holds. RULES §5 still
  carries `[STATUS: not yet decided]` on the roster; this ADR does not override
  that — it records the provisional shape under test.
- **No production impact.** This is a content-lane / tooling decision: no schema,
  migration, write-path, or deployment change follows from it.

## Retractions and Corrections

None.
