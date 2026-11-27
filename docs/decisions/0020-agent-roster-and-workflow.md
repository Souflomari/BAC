# ADR 0020 — Agent roster & workflow: producer/critic architecture

**Status.** Accepted, 2026. Files all built; invocation is staged (wave-1 /
wave-2, see decision 4). Supersedes the `[STATUS: not yet decided]` roster items
in RULES §5.

**Relates to.** RULES §0 (two kinds of work), §2 (the gates), §5 (multi-model
architecture — this ADR resolves its open roster status). ADR 0016 (Next.js
frontend), ADR 0017 (visual-sourcing taxonomy — the typed media callouts), ADR
0018 (curriculum boundary), ADR 0019 (exam-shape). Full spec:
`docs/agents/ROSTER.md`; built as `.claude/agents/*.md`.

---

## Context

RULES §5 fixed the multi-model budgets but left the **exact agent roster, the
per-agent model assignments, the notion workflow, and the fate of the drafted
`pr-reviewer`** explicitly undecided. We now decide them. The spec is
`docs/agents/ROSTER.md`; this ADR records the load-bearing decisions so they are
not re-litigated.

## Decision

1. **Producer / critic separation is the core quality architecture.** The agents
   that *produce* a notion are separate from the agents that *judge* it; critics
   are adversaries to producers (and, in the design band, to each other).
   Averaging judgment inside one head loses the tension that makes evaluation
   real.
2. **Six critics, including a design triad.** `visual-design-critic`,
   `ergonomics-flow-critic`, and `calm-load-critic` are split from a single
   design critic **because they fail differently**, and the **calm critic must be
   the explicit adversary to polish** (it pushes toward *less*). The other three
   are `bac-fidelity-critic`, `pedagogy-critic`, `coherence-critic`.
3. **Fully autonomous producer→critic→revise loop**, gated by the **editorial
   gate** (the human uses the finished notion as a student). Content production is
   recoverable, so the loop runs autonomously until all commissioned critics
   pass; the orchestrator arbitrates conflicting findings (priority order in
   ROSTER §5: bac fidelity → calm → pedagogy → coherence → visual craft).
4. **Wave-1 / wave-2 commissioning.** All agent files are built now, but
   invocation is staged because the multi-critic loop has emergent behavior to
   prove on one notion first. **Wave 1:** the full producer path +
   `bac-fidelity-critic` + `pedagogy-critic` (fire first; confirm the loop
   converges). **Wave 2** (after wave 1 converges once): `coherence-critic`,
   `visual-design-critic`, `ergonomics-flow-critic`, `calm-load-critic` — the
   four that mostly need a *rendered* UI. Each critic's frontmatter `description`
   records its wave, so which are live is unambiguous.
5. **Triangulated grounding.** The one artifact whose error silently corrupts
   everything downstream (the curriculum boundary) is checked by three
   independent readers: **research-lead (Opus) extracts**, the **Gemini lane
   checks coverage**, **research-challenger (Sonnet) attacks the derived layer**
   (limites/exclusions), and then **the human validates depth**.
6. **Visual-author split into three coded lanes** — `diagram-author` (svg+katex),
   `interactive-author` (geogebra/desmos/falstad/phet), `motion-author` (manim) —
   and **Gemini is a media *lane* (MCP/API), not a subagent file** (ADR 0017:
   atmospheric/illustrative only; structural diagrams are coded).
7. **pedagogy-architect stays one subject-aware agent**; the per-subject (maths /
   PC / SVT) split is **PARKED** — revisited only when cross-subject authoring
   shows one agent straining to hold two pedagogies. Do not pre-split.
8. **Model routing.** Opus for orchestration, judgment, every critic, schema /
   migration design, and research extraction; Sonnet for high-volume execution
   from a spec (content, items, coded visuals, frontend, the research challenge);
   Gemini (lane) for media + long-context bulk. **Bash is exclusive to
   `supabase-architect`** (the sole DB-toucher) **and `pr-reviewer`** (scoped to
   running the branch-test). No other agent has Bash.

## Consequences

- The orchestrator (the main Opus session) runs the producer→critic→revise loop,
  holds both gates, and arbitrates conflicting critic findings by the VISION
  priority order; genuine unresolved tensions surface to the human at the
  editorial gate rather than being guessed.
- Every non-Bash agent must list `tools` explicitly (omitting `tools` inherits
  *all* tools, including Bash) — so Bash stays confined to the two agents above.
- The `pr-reviewer` (previously drafted, never activated) is **activated** as the
  automated technical safety check that makes the production gate real, not
  theater.
- The grounding lane's three-reader check is now structural, not a habit — a
  proposed boundary is not authoritative until coverage, derived-layer, and human
  checks all pass.

## Retractions and Corrections

None.
