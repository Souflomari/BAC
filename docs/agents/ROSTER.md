# Agent Roster & Workflow

> The canonical specification of the agent system that produces a notion.
> It expands `RULES.md §5` (the multi-model architecture) into concrete agent
> definitions, and it is the source of truth the `.claude/agents/*.md` files
> are built from. It answers to `VISION.md` and `RULES.md`; where this and the
> vision conflict, the vision wins.
>
> **Roster of record.** This file — together with the `.claude/agents/*.md`
> files it describes and the roster ADR — IS the record. The old
> `docs/architecture/agent-workflow-v2.mermaid` diagram is retired (it named
> agents that no longer exist); do not resurrect it. `docs/pipeline/pipeline.md`
> is superseded by this file for the cast/routing.
>
> **v2 (2026-08-05).** Refreshed for the 5-family model era (Fable 5 / Opus 5 /
> Sonnet 5) and to record the roster as-lived: all 17 agent files are built,
> both critic waves have fired, and the wave-commissioning scaffolding is spent.

---

## 1. The principles this rests on

**Producer / critic separation.** The agents that *produce* a notion are
separate from the agents that *judge* it. Critics are adversaries to producers
(and, in the design band, to each other). This separation is the core of the
quality system — averaging judgment inside one head loses the tension that
makes evaluation real.

**Model routing across three budgets** (RULES §5) — the 5-family era:
- **Fable 5 — orchestration & planning.** The main session: plans a build,
  routes to specialists, runs the producer→critic→revise loop, holds both
  gates, arbitrates conflicting findings, and does the audit/reconciliation
  passes. Not a subagent file.
- **Opus 5 — hard reasoning & judgment.** The pedagogy design, every critic,
  the schema/migration design, the research extraction. Reserved for where
  being subtly wrong is costly and hard to catch (and the gated 10%). This is
  also the tier the orchestrator escalates to for the hardest judgment calls.
- **Sonnet 5 — high-volume structured execution *from a spec*.** Content,
  items, coded visuals, frontend, and the adversarial research check. The
  thinking is done upstream; Sonnet 5 executes it faithfully, fast. Most
  wave/fan-out volume runs here.
- **Gemini — media generation & long-context bulk.** A separate budget,
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
readers — Opus 5 extracts, Gemini checks coverage, Sonnet 5 challenges the
derived layer — and then the human validates depth.

---

## 2. The workflow — how one notion flows

**Phase 0 · Ground** *(per subject, not per notion).* `research-lead` extracts
the cadre into the boundary + exam-shape reference; the Gemini lane checks
coverage; `research-challenger` attacks the derived layer; the human validates.
The result feeds the **shared reference layer** (curriculum boundary, exam-shape,
design tokens, ADR trail) that every agent below reads.

**Phase 1 · Design.** The orchestrator (Fable 5) dispatches `pedagogy-architect`,
which reads the boundary and produces the pedagogy spec. Everything downstream
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

All 17 agent files exist and are **[live]**. Model tier and tools are on each
row. *Bash* and *gated* are marked where they apply. **[lane]** = not a subagent
file (Gemini, via MCP/API).

### Orchestration

**orchestrator** · **Fable 5** · *the main session, not a file*
- **Scope:** plan a notion's build, route to specialists, run the
  producer→critic→revise loop, hold both gates, arbitrate conflicting critic
  findings, invoke only *commissioned* critics (see §4). Also owns the
  audit / reconciliation / planning passes (this roster refresh among them).
- **Reads:** VISION, RULES, this roster, the shared reference layer.
- **Produces:** the build plan, routing, the arbitration of findings, the gate
  hand-offs to the human.
- **Guardrails:** never touches production directly (routes to
  supabase-architect); never bypasses a gate; does not author content itself;
  escalates the hardest single judgment calls to an Opus 5 subagent rather than
  deciding blind.

### Grounding *(per subject)*

**research-lead** · **Opus 5** · *file read/write, may use the Gemini lane* · **[live]**
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
- **Standing debt:** only the **PC** cadre is owner-authoritative; maths-sm,
  maths-sexp, philo, svt are PROPOSITION pending their validation gates.

**research-challenger** · **Sonnet 5** · *file read* · **[live]**
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

**pedagogy-architect** · **Opus 5** · *file read/write* · **[live]**
- **Scope:** notion → the pedagogy spec. As-lived, this agent also carries
  **judgment-at-scale** (spec + standard-setting across many notions) and has
  **absorbed the design-review role** it once handed off — it reviews authored
  output against its own spec before the human sees it.
- **Reads:** the curriculum boundary (already wired), VISION, the misconception
  framework.
- **Produces:** bounded scope (the `savoir_faire`), the misconception inventory,
  the graduated ramp (easy → hard → past-bac → fresh variations), the
  expert-reasoning structure, the per-subject teaching approach, and **typed
  media callouts** — each carrying `type` ∈ {atmospheric-illustration |
  structural-diagram | manipulable | motion} and `tool` ∈ {gemini | svg+katex |
  interactive-svg | geogebra/desmos/falstad/phet | motion (`.motion.json` via
  MotionStage/GSAP)}.
- **Guardrails:** bounds scope to the boundary's `savoir_faire`; honors `limites`
  and `exclusions` as **hard** constraints (e.g. RLC: establish the damped ODE
  only — closed-form solution is undamped-only; forced resonance/impedance is
  out). **Subject-aware** — holds the maths / PC / SVT approaches in one agent;
  per-subject splitting is **PARKED** (see §6). SVT's document-reasoning
  exercise type (Phase C) lands as a charter extension here, not a new agent.

### Producers *(execute the spec)*

**content-author** · **Sonnet 5** · *file read/write, no Bash* · **[live]**
- **Scope:** spec → lesson prose.
- **Reads:** the pedagogy spec.
- **Produces:** the hook, the décortiquer, the worked examples with reasoning
  shown. **Voice-ready** (written to be spoken aloud). Emits the typed media
  callouts where the spec calls for visuals.
- **Guardrails:** no Bash; executes faithfully; never exceeds scope.

**item-author** · **Sonnet 5** · *file read/write, no Bash* · **[live]**
- **Scope:** spec → diagnostic items. As-lived, the charter includes the
  **high-volume fan-out** it performed (tagging/authoring items across many
  notions in a campaign), not just one notion at a time — the ledgered
  deviation is now the charter.
- **Reads:** the spec (misconception inventory + ramp).
- **Produces:** the ramp's items + misconception-targeting items (**≥3 per
  misconception**) as **files**, with stem-defect and dual-tag checks; the
  choice-level `misconception` tags the attempt-event pipeline consumes.
- **Guardrails:** no Bash; items as files (DB is supabase-architect's gated job);
  a wrong answer must reveal *which* misconception.

**diagram-author** · **Sonnet 5** · *file read/write* · **[live]** *(visual lane 1)*
- **Scope:** coded structural / labelled diagrams **and** bespoke first-party
  interactive figures.
- **Reads:** callouts where `tool = svg+katex` or `tool = interactive-svg`.
- **Produces:** coded SVG + KaTeX (probability trees, circuit schematics, SVT
  schemas); and small bespoke interactives — a draggable point, a slider bound
  to one known function — as a StagedFigure extension
  (`docs/design/INTERACTIVE-FIGURE-SPEC.md`).
- **Guardrails:** structural diagrams are **coded, never Gemini** (ADR 0017);
  labels live with the diagram (split-attention); only essential marks
  (coherence principle); palette-coherent with the design tokens; a bespoke
  interactive is preferred over an embed when the manipulation is simple and the
  math is already known.

**interactive-author** · **Sonnet 5** · *file read/write* · **[live]** *(visual lane 2; deprioritized)*
- **Scope:** manipulable omnibus embeds (third-party).
- **Reads:** callouts where `tool = geogebra/desmos/falstad/phet`.
- **Produces:** configured/embedded interactives wired to the notion.
- **Guardrails:** manipulation must serve understanding, not entertainment
  (seductive-details principle); Falstad is critical for circuit chapters.
  **Deprioritized in practice** — bespoke `interactive-svg` (diagram-author) is
  preferred where it suffices; embeds can't be verified headlessly (a fake embed
  is worse than none), so they need a human in the loop.

**motion-author** · **Sonnet 5** · *file read/write* · **[live]** *(visual lane 3)*
- **Scope:** in-product coded motion for concepts where seeing a thing evolve
  over time is what makes it land.
- **Reads:** callouts where `tool = motion`.
- **Produces:** a stable-id SVG + a declarative **`.motion.json` beat spec**,
  played by the **MotionStage engine (GSAP)** — curves DRAW on, bars FILL,
  equation terms ASSEMBLE, paths MORPH. (NOT Manim — the engine is first-party
  GSAP over inline SVG so math stays live KaTeX in `<foreignObject>`.)
- **Guardrails:** motion serves comprehension (DESIGN-BIBLE §5); calm,
  learner-paced, click-to-advance, never autoplay; no fast cuts; respects
  `prefers-reduced-motion`; the engine's ease allow-list forbids
  bounce/overshoot/elastic.

**[lane] Gemini media** · Gemini · *MCP/API, orchestrator-invoked, capped (15/hr, $3/hr)*
- Atmospheric / illustrative imagery only (ADR 0017), with the DESIGN-BIBLE §6
  style preamble appended verbatim. **Never** structural diagrams, never
  load-bearing content. (The generative-media rules are Phase E.)

### Adversarial critics *(judge the notion)*

**bac-fidelity-critic** · **Opus 5** · *file read* · **[live] · WAVE 1**
- **Scope:** scope · cognitive mix · format · exclusions, vs the boundary &
  exam-shape.
- **Reads:** the produced notion + the curriculum boundary + the exam-shape ref.
- **Produces:** findings — anything off-syllabus (beyond `savoir_faire`, into an
  `exclusion`, past a `limite`)? Does the item mix match the habileté ratios?
  Does the format match the exam?
- **Guardrails:** has a real rubric (the cadre). Catches the Bayes-in-probability
  / damped-RLC-closed-form class of drift. Highest leverage.

**pedagogy-critic** · **Opus 5** · *file read* · **[live] · WAVE 1**
- **Scope:** teaching quality vs the SOTA standard.
- **Reads:** the produced notion + VISION (the notion anatomy).
- **Produces:** findings — does the décortiquer truly take it apart? Is the ramp
  right (reasoning-demand rising)? Is expert reasoning shown? Does it confront
  the misconception (per subject)?

**coherence-critic** · **Opus 5** · *file read* · **[live] · WAVE 2**
- **Scope:** consistency across the product.
- **Reads:** the produced notion + neighboring notions + the conventions.
- **Produces:** findings — voice, notation (`p_A(B)`), terminology, contradictions
  with other notions.

**visual-design-critic** · **Opus 5** · *file read* · **[live] · WAVE 2**
- **Scope:** visual craft, DESIGN-BIBLE §2–4.
- **Reads:** the rendered notion + design tokens + DESIGN-BIBLE.
- **Produces:** findings — typography, spacing, palette, grid, hierarchy. Premium
  or templated?

**ergonomics-flow-critic** · **Opus 5** · *file read* · **[live] · WAVE 2**
- **Scope:** interaction & usability, DESIGN-BIBLE §1 / §9.
- **Reads:** the rendered notion.
- **Produces:** findings — bounded reading column, keyboard navigation, focus and
  hover states, touch targets, long-session ergonomics. *Does it work for two
  hours at a desk?*

**calm-load-critic** · **Opus 5** · *file read* · **[live] · WAVE 2**
- **Scope:** the flow-protection principle, DESIGN-BIBLE §0 / §5 / §7.
- **Reads:** the rendered notion.
- **Produces:** findings — too loud? ADHD-inducing? Seductive details? Gratuitous
  motion? Engagement theater leaking into the learning core?
- **Guardrails:** the explicit adversary to `visual-design-critic` — it pushes
  toward *less*. Guardian of the one principle the product stakes itself on.

### Integration *(the gated 10%)*

**frontend-builder** · **Sonnet 5** · *file read/write* · **[live]**
- **Scope:** build the Next.js/React components that render the notion — and the
  product-shell surfaces (the Mastery-Push lanes: dashboard v2, the S'entraîner
  bank cards, the account page). This is the frontend agent; there is **no
  separate `nextjs-frontend` shell agent** (open decision #2 resolved:
  frontend-builder owns the frontend).
- **Reads:** the produced notion + design tokens (the single source,
  `web/src/lib/tokens.ts`) + DESIGN-BIBLE + the relevant build spec
  (DASHBOARD-V2-SPEC, BANK-SPEC).
- **Produces:** React components (Tailwind + Radix via the shadcn pattern), KaTeX
  rendering, the calm UI — consuming the **named token aliases only** (Phase A;
  the token-gate bars arbitrary values).
- **Guardrails:** building components is content-lane; **deploys are gated**
  (production gate). No browser storage in artifacts. UI work routes here rather
  than being done in the orchestrator by hand.

**supabase-architect** · **Opus 5** · *Bash + all* · *gated* · **[live]**
- **Scope:** the **only** DB-toucher — items→DB, migrations, the §3 sync check,
  the write-path (RPCs, edge functions that write user data).
- **Reads:** the items (files), the schema, RULES §3.
- **Produces:** migrations with verify blocks asserting **cardinality + content
  identity**, DB writes — all **human-gated**.
- **Guardrails:** sole Bash; **never autonomous**; §3 production-sync must be
  verified before any migration; RLS in the creating migration; service_role-only
  on write-RPCs; migrations are append-only; down-migrations convention owed
  before the first non-additive migration.

**pr-reviewer** · **Opus 5** · *file read, Bash for branch-test only* · **[live — not yet run]**
- **Scope:** the automated technical safety check before a push.
- **Reads:** the change + the branch-test results.
- **Produces:** a pass/fail verdict — branch-test green? RLS present? cardinality
  assertions present? — that the human's authorization rests on.
- **Guardrails:** this is the **machinery that makes the gate real** (not theater).
  The check is technical; the human's authorization is the decision. **Honest
  status:** the file is active by roster but has **never actually run** — its
  first real use is the next production push that goes through the gate.

---

## 4. Commissioning — both waves are LIVE

All agent files are built, and **both critic waves have fired** on real notions
(the wave-1 producer→critic loop converged; the wave-2 design/coherence critics
ran against rendered UI). The staging that once governed which critics the
orchestrator invoked is **spent** — the orchestrator now commissions the full
panel, still choosing per task which critics a given change warrants (a
copy-edit doesn't need the whole design triad).

The WAVE-1 / WAVE-2 label survives only as documentation of firing order in each
critic's `description`; it is no longer a gate.

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
  decided by the first cross-subject evidence. Do not pre-split. (SVT's
  document-reasoning need is being met as a charter extension, not a split.)
- **Visual-author granularity.** Split into three lanes (diagram / interactive /
  motion), with `interactive-author` deprioritized in favor of bespoke
  `interactive-svg`. Revisit only if volume proves a lane too broad.

---

## 7. Decisions recorded *(→ ADR)*

1. **Producer/critic separation** as the core quality architecture.
2. **Six critics**, including the design triad (visual-design / ergonomics-flow /
   calm-load) split from a single design critic — because they fail differently
   and the calm critic must be the explicit adversary to polish.
3. **Fully autonomous** producer→critic→revise loop, gated by the editorial gate;
   both waves now live.
4. **Triangulated grounding** — research-lead (Opus 5) extracts; Gemini checks
   coverage; research-challenger (Sonnet 5) attacks the derived layer; the human
   validates depth.
5. **Visual-author split** into three coded lanes; motion runs on the
   first-party **MotionStage/GSAP** engine via `.motion.json` (not Manim);
   diagram-author owns bespoke `interactive-svg`; Gemini is a media lane, not a
   subagent.
6. **pedagogy-architect stays one subject-aware agent**; per-subject split parked;
   it carries judgment-at-scale and absorbed design-review.
7. **frontend-builder is the frontend agent** — no `nextjs-frontend` shell agent
   (open decision #2 resolved).
8. **Model routing (5-family):** **Fable 5** orchestrates/plans/audits;
   **Opus 5** for judgment/critics/schema/research + the gated 10%; **Sonnet 5**
   for high-volume execution; **Gemini** (lane) for media + long-context bulk.
   **Bash is exclusive to supabase-architect** (and pr-reviewer for branch-tests).
