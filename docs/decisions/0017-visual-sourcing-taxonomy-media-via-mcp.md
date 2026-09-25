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
| **Manipulable — omnibus** | RLC sandbox, full physics sim, full circuit topology | **Embed** (GeoGebra / Desmos / Falstad / PhET) — don't rebuild a mature engine |
| **Manipulable — bespoke** | drag-a-point-along-a-curve, scrub-one-parameter, single-slider builds (see amendment below) | **Coded SVG + TS** (`interactive-svg`) — small, well-scoped, first-party |
| **Motion explanation** | the hardest concepts | **Manim** |

The DESIGN-BIBLE style preamble is appended verbatim to *every* Gemini brief
(mandatory), so even atmospheric generation stays inside the visual language.

## Mechanism for the Gemini lane

Media generation runs via an MCP server (`@jimothy-snicket/gemini-image-mcp`),
invoked by the **orchestrator only**, under cost caps **`MAX_REQUESTS_PER_HOUR=15`**
and **`MAX_COST_PER_HOUR=3`**. The API key is supplied via an **environment
variable and is NEVER committed**. The live MCP config is deliberately kept
**off the work PC** and is stood up only when a real generated visual is actually
needed.

**This ADR documents the decision only.** It creates no live `.mcp.json`, adds no
secret, and wires up no running server. Standing up the lane is a separate, gated
act performed when an atmospheric visual is genuinely required.

## Provisional agent roster (recorded, NOT locked)

Written down here so it exists in the record, but explicitly **PROVISIONAL** —
pending slice validation; RULES §5 still carries the open `[STATUS: not yet
decided]` on the roster, and this ADR does not override that.

- **orchestrator** — the main Opus session
- **pedagogy-architect** — Opus
- **content-author** — Sonnet
- **item-author** — Sonnet
- **supabase-architect** — Opus; the **sole holder of Bash access**
- **Gemini media lane** — via the MCP server described above

## Evidence

Two media smoke tests — commit `9ba0977` (initial generation) and the
gemini-image MCP run (`docs/decisions/evidence/0017-media-test/conditional-probability-tree-mcp.png`)
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

**2026-07-07 — the "Manipulable" row split (amendment, not a reversal).**
The original decision named GeoGebra/Desmos/Falstad/PhET embeds as *the*
tool for every manipulable, including the worked example "drag-the-point."
Building the first small first-party interactive figures (a draggable
point on a tangent line, a slider on a Riemann-sum rectangle count —
`docs/design/INTERACTIVE-FIGURE-SPEC.md`) surfaced a real distinction the
original row didn't carry: **omnibus** manipulables (a full circuit
simulator, a full physics sandbox — genuinely wasteful to rebuild, "don't
rebuild" still holds exactly as written) vs. **bespoke** manipulables (one
draggable point or one slider bound to a single already-known function —
cheap to hand-code, and NOT the "don't rebuild a whole engine" case this
ADR was written to prevent).

The split was forced by three facts specific to the bespoke case, verified
against the actual product and the actual embed vendors, not assumed:
1. **Licensing.** GeoGebra requires a paid commercial license for a
   product like this (`geogebra.org/license`: "any use... for a commercial
   purpose... requires a special license"); Desmos's commercial API access
   routes through a partnership conversation, not a self-serve key. A
   hand-coded widget carries zero licensing surface.
2. **Verification.** `docs/audits/d10-media-layer.md` and `docs/HANDOFF.md`
   (gate 7bis) already deferred GeoGebra/Desmos specifically because a
   third-party iframe's internal applet state is opaque to this project's
   headless test harness (`dom-truth.mjs`) — "un embed faux est pire
   qu'absent." A first-party component renders into this codebase's own
   DOM/React state, so `dom-truth.mjs` CAN assert on it directly (the same
   way it already asserts on `MotionStage`/`StagedFigure`) — it does not
   inherit the human-in-the-loop blocker the omnibus embeds still carry.
3. **French-vocabulary fidelity.** The existing PhET embeds already
   surfaced a real, observed friction (English sim labels not matching the
   exact bac register — e.g. "flèche"/"portée" vs. the sim's own words);
   a hand-coded figure uses the lesson's own vocabulary exactly.

**What does NOT change**: the 4 existing PhET embeds, `interactive-author`'s
charter (still owns `geogebra/desmos/falstad/phet` omnibus embeds, still
"don't rebuild a graphing engine or a circuit simulator"), and the general
principle that generated/fake manipulation never substitutes for a real
one. `diagram-author`'s charter gains the new `interactive-svg` callout
type (`.claude/agents/diagram-author.md` v0.2) since it already owns
"exact structure, exact labels" — a parametrized slope is the same kind of
exactness. See `docs/design/INTERACTIVE-FIGURE-SPEC.md` for the contracts.
