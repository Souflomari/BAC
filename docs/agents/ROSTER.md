# Agent Roster & Workflow

> The canonical specification of the agent system that produces a notion.
> It expands `RULES.md §5` (the multi-model architecture) into concrete agent
> definitions, and it is the source of truth the `.claude/agents/*.md` files
> are built from. It answers to `VISION.md` and `RULES.md`; where this and the
> vision conflict, the vision wins.
>
> Companion to the architecture diagram (the visual of this roster) and to
> `docs/pipeline/`. Decisions here are recorded as an ADR so they are not
> re-litigated.

---

## 1. The principles this rests on

**Producer / critic separation.** The agents that *produce* a notion are
separate from the agents that *judge* it. Critics are adversaries to producers
(and, in the design band, to each other). This separation is the core of the
quality system — averaging judgment inside one head loses the tension that
makes evaluation real.

**Model routing across three budgets** (RULES §5):
- **Opus** — orchestration and hard reasoning/judgment: the orchestrator, the
  pedagogy design, every critic, the schema/migration design, the research
  extraction. Reserved for where being subtly wrong is costly and hard to catch.
- **Sonnet** — high-volume structured execution *from a spec*: content,
  items, coded visuals, frontend, and the adversarial research check. The
  thinking is done upstream; Sonnet executes it faithfully, fast.
- **Gemini** — media generation and long-context bulk. A separate budget,
  accessed via the MCP/API lane — **not** a Claude Code subagent file.

**Two kinds of work, two gates** (RULES §0, §2):
- **Content production (~90%, recoverable)** runs autonomously, including the
  full producer→critic→revise loop. Failure is caught and regenerated.
- **Production-touching code (~10%, unrecoverable)** is always human-gated.
- **The editorial gate**: the human uses the finished notion as a student and
  writes an evaluation. **The production gate**: the human authorizes a push
  after the branch-test passes — a decision, not a code-read.

**Triangulated grounding.** The one artifact whose error silently corrupts
everything downstream (the curriculum boundary) is checked by three independent
readers — Opus extracts, Gemini checks coverage, Sonnet challenges the derived
layer — and then the human validates depth.

---

## 2. The workflow — how one notion flows

**Phase 0 · Ground** *(per subject, not per notion).* `research-lead` extracts
the cadre into the boundary + exam-shape reference; the Gemini lane checks
coverage; `research-challenger` attacks the derived layer; the human validates.
The result feeds the **shared reference layer** (curriculum boundary, exam-shape,
design tokens, ADR trail) that every agent below reads.

**Phase 1 · Design.** The orchestrator dispatches `pedagogy-architect`, which
reads the boundary and produces the pedagogy spec. Everything downstream
executes this spec.

**Phase 2 · Produce** *(parallel).* From the spec: `content-author` writes the
lesson; `item-author` writes the diagnostic items; the visual producers
(`diagram-author`, `interactive-author`, `motion-author`) author coded visuals
per the typed callouts; the Gemini lane generates atmospheric imagery.

**Phase 3 · Evaluate** *(parallel, adversarial, fully autonomous).* The produced
notion goes to the critic panel. Critics emit findings; the orchestrator routes
revisions back to the relevant producer and re-evaluates. The loop runs
**autonomously until all commissioned critics pass.** The orchestrator arbitrates
conflicting findings (see §5).

**Editorial gate.** The human uses the notion as a student, writes an
evaluation, iterates.

**Phase 4 · Integrate** *(gated).* `frontend-builder` builds the rendering
components; `supabase-architect` writes items→DB and migrations; `pr-reviewer`
runs the automated safety check. **Production gate**: the human authorizes the
push after the branch-test passes.

---

## 3. The roster

Legend: **[built]** file exists today · **[new]** to build · **[lane]** not a
subagent file (Gemini, via MCP/API) · *Bash* and *gated* marked where they apply.

### Orchestration

**orchestrator** · Opus · *the main session (`claude --model opus`), not a file*
- **Scope:** plan a notion's build, route to specialists, run the
  producer→critic→revise loop, hold both gates, arbitrate conflicting critic
  findings, invoke only *commissioned* critics (see §4).
- **Reads:** VISION, RULES, this roster, the shared reference layer.
- **Produces:** the build plan, routing, the arbitration of findings, the gate
  hand-offs to the human.
- **Guardrails:** never touches production directly (routes to
  supabase-architect); never bypasses a gate; does not author content itself.

### Grounding *(per subject)*

**research-lead** · Opus · *file read/write, may use the Gemini lane* · **[new]**
- **Scope:** source & extract official cadres and bac standards into the
  curriculum boundary and exam-shape reference.
- **Reads:** cadre PDFs in `docs/cadre/sources/`, existing boundary files.
- **Produces:** a *proposed* boundary YAML (per filière) with the provenance
  convention (`source: cadre p.N` vs `source: derived`); exam-shape updates.
- **Guardrails:** extraction is fidelity-critical. Output is a PROPOSAL — never
  authoritative until the Gemini coverage check, the `research-challenger`
  derived-layer check, **and** human validation have all passed. Filière is a
  top-level key. Follows the established schema (domaines → sous_domaines →
  chapitres → {programme, savoir_faire, limites} + poids/habiletes/
  competences_ciblees/travaux_pratiques/exclusions).

**research-challenger** · Sonnet · *file read* · **[new]**
- **Scope:** adversarial scrutiny of `research-lead`'s **derived** layer (the
  `limites` and `exclusions`).
- **Reads:** the proposed boundary + the source cadre.
- **Produces:** a challenge report — for each derived item, *does the cadre
  actually support this boundary, or is it being asserted?* Flags over-reaches
  and omissions.
- **Guardrails:** focuses on the inferential leaps, not transcription. Does not
  edit the boundary; emits findings.

**[lane] Gemini coverage check** · Gemini · *MCP/API, invoked by research-lead*
- Long-context re-read of the whole cadre: any savoir-faire dropped or added?
  Does every domain reconcile? Coverage, not judgment.

### Design

**pedagogy-architect** · Opus · *file read/write* · **[built — reconcile]**
- **Scope:** notion → the pedagogy spec.
- **Reads:** the curriculum boundary (already wired), VISION, the misconception
  framework.
- **Produces:** bounded scope (the `savoir_faire`), the misconception inventory,
  the graduated ramp (easy → hard → past-bac → fresh variations), the
  expert-reasoning structure, the per-subject teaching approach, and **typed
  media callouts** (each carrying `type` ∈ {atmospheric-illustration |
  structural-diagram | manipulable | motion} and `tool` ∈ {gemini | svg+katex |
  geogebra/desmos/falstad/phet | manim}).
- **Guardrails:** bounds scope to the boundary's `savoir_faire`; honors `limites`
  and `exclusions` as **hard** constraints (e.g. RLC: establish the damped ODE
  only — closed-form solution is undamped-only; forced resonance/impedance is
  out). **Subject-aware** — holds the maths / PC / SVT approaches in one agent;
  per-subject splitting is **PARKED** (see §6).

### Producers *(execute the spec)*

**content-author** · Sonnet · *file read/write, no Bash* · **[built]**
- **Scope:** spec → lesson prose.
- **Reads:** the pedagogy spec.
- **Produces:** the hook, the décortiquer, the worked examples with reasoning
  shown. **Voice-ready** (written to be spoken aloud). Emits the typed media
  callouts where the spec calls for visuals.
- **Guardrails:** no Bash; executes faithfully; never exceeds scope.

**item-author** · Sonnet · *file read/write, no Bash* · **[built]**
- **Scope:** spec → diagnostic items.
- **Reads:** the spec (misconception inventory + ramp).
- **Produces:** the ramp's items + misconception-targeting items (**≥3 per
  misconception**) as **files**, with stem-defect and dual-tag checks.
- **Guardrails:** no Bash; items as files (DB is supabase-architect's gated job);
  a wrong answer must reveal *which* misconception.

**diagram-author** · Sonnet · *file read/write* · **[new]** *(visual lane 1)*
- **Scope:** coded structural / labelled diagrams.
- **Reads:** callouts where `tool = svg+katex`.
- **Produces:** coded SVG + KaTeX (probability trees, circuit schematics, SVT
  schemas).
- **Guardrails:** structural diagrams are **coded, never Gemini** (ADR 0017);
  labels live with the diagram (split-attention); only essential marks
  (coherence principle); palette-coherent with the design tokens.

**interactive-author** · Sonnet · *file read/write* · **[new]** *(visual lane 2)*
- **Scope:** manipulable embeds.
- **Reads:** callouts where `tool = geogebra/desmos/falstad/phet`.
- **Produces:** configured/embedded interactives wired to the notion.
- **Guardrails:** manipulation must serve understanding, not entertainment
  (seductive-details principle); Falstad is critical for circuit chapters.

**motion-author** · Sonnet · *file read/write* · **[new]** *(visual lane 3)*
- **Scope:** coded motion / animation.
- **Reads:** callouts where `tool = manim`.
- **Produces:** Manim animations — calm, clarifying reveals.
- **Guardrails:** motion serves comprehension (DESIGN-BIBLE §5); calm pacing, no
  fast cuts; respects `prefers-reduced-motion`.

**[lane] Gemini media** · Gemini · *MCP/API, orchestrator-invoked, capped, off the work PC*
- Atmospheric / illustrative imagery only (ADR 0017). Never structural diagrams.

### Adversarial critics *(judge the notion)*

**bac-fidelity-critic** · Opus · *file read* · **[new] · WAVE 1**
- **Scope:** scope · cognitive mix · format · exclusions, vs the boundary &
  exam-shape.
- **Reads:** the produced notion + the curriculum boundary + the exam-shape ref.
- **Produces:** findings — anything off-syllabus (beyond `savoir_faire`, into an
  `exclusion`, past a `limite`)? Does the item mix match the habileté ratios?
  Does the format match the exam?
- **Guardrails:** has a real rubric (the cadre). Catches the Bayes-in-probability
  / damped-RLC-closed-form class of drift. Highest leverage.

**pedagogy-critic** · Opus · *file read* · **[new] · WAVE 1**
- **Scope:** teaching quality vs the SOTA standard.
- **Reads:** the produced notion + VISION (the notion anatomy).
- **Produces:** findings — does the décortiquer truly take it apart? Is the ramp
  right (reasoning-demand rising)? Is expert reasoning shown? Does it confront
  the misconception (per subject)?

**coherence-critic** · Opus · *file read* · **[new] · WAVE 2**
- **Scope:** consistency across the product.
- **Reads:** the produced notion + neighboring notions + the conventions.
- **Produces:** findings — voice, notation (`p_A(B)`), terminology, contradictions
  with other notions.

**visual-design-critic** · Opus · *file read* · **[new] · WAVE 2**
- **Scope:** visual craft, DESIGN-BIBLE §2–4.
- **Reads:** the rendered notion + design tokens + DESIGN-BIBLE.
- **Produces:** findings — typography, spacing, palette, grid, hierarchy. Premium
  or templated?

**ergonomics-flow-critic** · Opus · *file read* · **[new] · WAVE 2**
- **Scope:** interaction & usability, DESIGN-BIBLE §1 / §9.
- **Reads:** the rendered notion.
- **Produces:** findings — bounded reading column, keyboard navigation, focus and
  hover states, touch targets, long-session ergonomics. *Does it work for two
  hours at a desk?*

**calm-load-critic** · Opus · *file read* · **[new] · WAVE 2**
- **Scope:** the flow-protection principle, DESIGN-BIBLE §0 / §5 / §7.
- **Reads:** the rendered notion.
- **Produces:** findings — too loud? ADHD-inducing? Seductive details? Gratuitous
  motion? Engagement theater leaking into the learning core?
- **Guardrails:** the explicit adversary to `visual-design-critic` — it pushes
  toward *less*. Guardian of the one principle the product stakes itself on.

### Integration *(the gated 10%)*

**frontend-builder** · Sonnet · *file read/write* · **[new]**
- **Scope:** build the Next.js/React components that render the notion.
- **Reads:** the produced notion + design tokens + DESIGN-BIBLE.
- **Produces:** React components (Tailwind + Radix via the shadcn pattern), KaTeX
  rendering, the calm UI.
- **Guardrails:** building components is content-lane; **deploys are gated**
  (production gate). Uses the design tokens; no browser storage in artifacts.

**supabase-architect** · Opus · *Bash + all* · *gated* · **[built]**
- **Scope:** the **only** DB-toucher — items→DB, migrations, the §3 sync check.
- **Reads:** the items (files), the schema, RULES §3.
- **Produces:** migrations with verify blocks asserting **cardinality + content
  identity**, DB writes — all **human-gated**.
- **Guardrails:** sole Bash; **never autonomous**; §3 production-sync must be
  verified before any migration; RLS in the creating migration; service_role-only
  on write-RPCs; migrations are append-only.

**pr-reviewer** · Opus · *file read, Bash for branch-test* · **[new — was drafted]**
- **Scope:** the automated technical safety check before a push.
- **Reads:** the change + the branch-test results.
- **Produces:** a pass/fail verdict — branch-test green? RLS present? cardinality
  assertions present? — that the human's authorization rests on.
- **Guardrails:** this is the **machinery that makes the gate real** (not theater).
  The check is technical; the human's authorization is the decision.

---

## 4. Commissioning plan — what fires, and when

All agent **files are built now**. What the orchestrator **invokes** is staged,
because the autonomous multi-critic loop has emergent behavior that must be
proven on one notion before all critics turn it at once.

- **Wave 1 (commissioned first):** the full producer path +
  `bac-fidelity-critic` + `pedagogy-critic`. Run one real notion through this
  loop. Confirm the loop *converges* (revisions improve, don't oscillate) and the
  orchestrator's arbitration behaves.
- **Wave 2 (commissioned after wave 1 converges once):** `coherence-critic`,
  `visual-design-critic`, `ergonomics-flow-critic`, `calm-load-critic`. The four
  design/coherence critics that mostly need a *rendered* UI to judge.

A critic's file existing ≠ the orchestrator invoking it. The wave is recorded in
each critic's frontmatter `description` so it is unambiguous which are live.

---

## 5. Conflict arbitration

Critics will disagree by design — `visual-design-critic` may want more where
`calm-load-critic` wants less; `bac-fidelity` may want tighter scope where
`pedagogy` wants more scaffolding. The orchestrator arbitrates by the VISION's
priority order:

1. **Bac fidelity** — off-syllabus is never acceptable; this binds first.
2. **Calm / flow protection** — in the learning core, calm wins ties against
   visual richness (DESIGN-BIBLE §0).
3. **Pedagogy** — teaching quality over surface polish.
4. **Coherence**, then **visual craft**.

When arbitration cannot resolve a genuine tension, it surfaces to the human at
the editorial gate rather than the orchestrator guessing.

---

## 6. Open questions *(recorded, not yet decided)*

- **Per-subject pedagogy split.** `pedagogy-architect` is one subject-aware agent.
  Whether maths / PC / SVT eventually need *separate* architects is **parked** —
  decided by the first cross-subject evidence (when authoring a maths notion and a
  PC notion reveals whether one agent strains to hold two pedagogies). Do not
  pre-split.
- **Visual-author granularity.** Split into three lanes (diagram / interactive /
  motion). Revisit only if volume proves a lane too broad.

---

## 7. Decisions recorded *(→ ADR)*

1. **Producer/critic separation** as the core quality architecture.
2. **Six critics**, including the design triad (visual-design / ergonomics-flow /
   calm-load) split from a single design critic — because they fail differently
   and the calm critic must be the explicit adversary to polish.
3. **Fully autonomous** producer→critic→revise loop, gated by the editorial gate.
4. **Wave-1 / wave-2 commissioning** — all files built; bac-fidelity + pedagogy
   fire first; the design/coherence critics after the loop converges once.
5. **Triangulated grounding** — research-lead (Opus) extracts; Gemini checks
   coverage; research-challenger (Sonnet) attacks the derived layer; the human
   validates depth.
6. **Visual-author split** into three coded lanes; Gemini is a media lane, not a
   subagent.
7. **pedagogy-architect stays one subject-aware agent**; per-subject split parked.
8. **Model routing**: Opus for orchestration/judgment/critics/schema; Sonnet for
   execution; Gemini (lane) for media + long-context bulk. **Bash is exclusive to
   supabase-architect** (and pr-reviewer for branch-tests).
