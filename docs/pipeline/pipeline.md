# The content pipeline (v0.1)

> **⚠ SUPERSEDED (2026-08-05).** This v0.1 doc predates the full roster (it
> names "the four subagent files"). The cast, routing, and per-agent model/tools
> are now authoritative in **`docs/agents/ROSTER.md` (v2)** + the roster ADR.
> Kept only as an early-slice record; do not treat its cast table as current.

> How a single notion flows through the agents. This is the operational
> companion to the four subagent files in `.claude/agents/`. It is **v0.1**,
> scoped to the first slice (Probabilités · SM, and RLC · PC), and is meant to
> be refined against what those two notions actually teach us — not locked.
>
> Authority order still holds: VISION → RULES → agents. This doc serves them.

---

## The cast

| Role | Where it lives | Model | Touches production? |
|---|---|---|---|
| **Orchestrator** | your main Claude Code session (`claude --model opus`) | Opus | only by dispatching supabase-architect |
| **pedagogy-architect** | `.claude/agents/` subagent | Opus | no |
| **content-author** | `.claude/agents/` subagent | Sonnet | no (no Bash) |
| **item-author** | `.claude/agents/` subagent | Sonnet | no (no Bash) |
| **supabase-architect** | `.claude/agents/` subagent | Opus | **yes — human-gated** |
| **Gemini media** | the `gemini-image` MCP server (`generate_image` / `process_image`), called inline by the orchestrator | Gemini (separate key via `${GEMINI_API_KEY}`) | no |
| **You** | the human | — | the editorial gate + the production authorizer |

The orchestrator is **not** a file — it is the session you talk to. It plans, routes work to the subagents, calls the Gemini media tool, and holds the thread with you. Subagents return only their final output to it; their intermediate work stays in their own context, keeping the main thread clean.

---

## The per-notion flow

1. **Scope + design** — orchestrator delegates to **pedagogy-architect**. It produces `content/<subject>/<notion>/spec.md` (scope, misconception inventory, ramp, media callouts, build specs). **You validate it** — this is your domain judgment, and it is human-gated; the spec is not final until you sign off.
2. **Author teaching content** — orchestrator delegates to **content-author**, which writes `lesson.md` from the spec.
3. **Author items** — orchestrator delegates to **item-author**, which writes `items.yaml` from the spec, ending with a coverage summary (items per misconception, so the ≥3 floor is checkable).
4. **Review against the standard** — **pedagogy-architect** reviews the authored lesson + items against its own spec and bounces anything that drifted, *before* it reaches you.
5. **Media pass** — *only where the spec calls for it* — the orchestrator generates imagery/diagrams via the **`gemini-image` MCP server** (`generate_image`), **cost-capped at 15 requests/hr and $3/hr**, key supplied via `${GEMINI_API_KEY}`. This is the invocation path, **superseding the old `scripts/gemini_media.py` script lane**. The **DESIGN-BIBLE style preamble is appended verbatim to every brief** (mandatory — see "Wiring the Gemini lane"). Per-notion assets are written to **`content/<subject>/<notion>/media/`**. (Embeds like Falstad/Desmos are wired directly into the content, not generated.)
6. **Your editorial gate** — you move through the notion *as a student*, write an evaluation, and the orchestrator iterates. (This is the RULES §2 content gate; it is the whole point of the slice.)
7. **Land items (only when ready)** — once you've approved the items as content, **supabase-architect** lands them via a migration. This is the **only** step that touches production, and it is **human-gated** and blocked until the **sync check** passes.

Steps 1–6 are recoverable content work and can run autonomously between sessions. Step 7 is the gated 10% and happens synchronously, with you present to authorize.

---

## The two lanes, and why Gemini is separate

**Lane 1 — the Claude Code authoring spine.** Orchestrator (Opus) + the four subagents. Opus and Sonnet hand off natively inside Claude Code via the per-agent `model` field. This is where pedagogy, prose, items, and migrations happen.

**Lane 2 — Gemini media + bulk.** A Gemini `model` is not a Claude model, so Gemini **cannot** be a subagent. It runs as the **`gemini-image` MCP server** (configured in `.mcp.json`), called **inline by the orchestrator** via the `generate_image` tool — no separate script process. Same separate budget (a Gemini key, not a Claude one), pure additive capacity.

### Wiring the Gemini lane

Media generation runs through the **`gemini-image` MCP server**
(`@jimothy-snicket/gemini-image-mcp`, source-audited: native Gemini
`generateContent`, key env-only, egress only to Google, cost caps enforced),
configured in the project `.mcp.json`. It exposes two tools: **`generate_image`**
(paid — Gemini image generation) and **`process_image`** (free — local crop/
resize/format via `sharp`).

**Key custody — environment reference, never a file.** The key is supplied via
`${GEMINI_API_KEY}` and must be set as an **environment secret** (the Claude Code
environment's configuration), never written to a committed or gitignored file.
The server reads the key *only* from the environment and actively strips key-like
fields from any config file.

**Cost ceiling (enforced by the server):** `MAX_REQUESTS_PER_HOUR=15`,
`MAX_COST_PER_HOUR=3`, plus `GEMINI_IMAGE_AUTO_INSTALL=0` to disable the optional
~340 MB background-matte model (unused for diagrams).

**Billing prerequisite.** Image generation requires **billing enabled** on the
Gemini API project — the free tier has *zero* image-generation quota (a free-tier
key authenticates and lists models but returns `RESOURCE_EXHAUSTED` on any image
request).

**The mandatory style preamble.** Append this verbatim to *every* image brief,
now and in future — it is what keeps generated visuals inside the DESIGN-BIBLE:

> Calm, gallery-like, clarifying — never punchy or attention-grabbing. Flat
> vector with subtle gradients; rounded, soft geometry; muted, desaturated,
> tinted-neutral palette (cool neutrals, a single restrained blue accent
> ~#3E5C86); coherence-principle restraint — only the marks essential to the
> idea, no decorative detail; no pure black or pure white; labels integrated
> beside what they label.

Save per-notion assets to `content/<subject>/<notion>/media/`.

> **⚠ Needs an ADR.** Running media generation inline via an MCP server — rather
> than the separate `scripts/gemini_media.py` script lane originally sketched
> here (which was never built) — is an architecture change. Provisional now;
> record it as an ADR once the first slice's media validates the approach, same
> discipline as the roster and the design tokens.

Every generated asset must pass the DESIGN-BIBLE test: *would this feel at home in a calm, premium, gallery-like study environment?* If it grabs attention, it's wrong. The orchestrator (or you) reviews generated media the same way you review any content.

---

## The safety asymmetry, enforced by tooling

Autonomy where failure is cheap; gating where failure is catastrophic. This is now structural, not just a rule:

- **content-author and item-author have no Bash.** They physically cannot run a migration, hit production, or mutate the DB. The worst they can do is write a weak file, caught on your review and regenerated.
- **Only supabase-architect has Bash**, and its system prompt hard-codes the §3 non-negotiables: sync-check first, passing branch-test required, human authorization required, verify blocks asserting cardinality + content identity, service-role-only write grants, append-only migrations, read-only production dashboard.
- **You** authorize production pushes as a *decision* informed by the green branch-test and a plain-language summary — never as a code review.

---

## Deploying the agents

1. Copy the four files into your repo at `.claude/agents/` (project scope — these outrank any user-scope agents of the same name). *(Note: lowercase `agents/` — a capital `Agents/` is invisible on case-sensitive Linux/web sessions.)*
2. **Restart the Claude Code session.** File-based agents load at startup only; a session already running won't see them until restart. (Alternatively, recreate them through the `/agents` manager, which takes effect immediately and lets Claude draft from a description.)
3. Start the orchestrator on Opus: `claude --model opus`. Subagents then run on the model in their own frontmatter (Opus for judgment, Sonnet for authoring), regardless of the session model.
4. Confirm they loaded: run `/agents` and check all four appear.
5. Set `GEMINI_API_KEY` as an **environment secret** (not a file, not committed) for the media lane; the `gemini-image` MCP server in `.mcp.json` reads it via `${GEMINI_API_KEY}`, and loads on the next session start. Image generation additionally requires **billing enabled** on the key (free tier = no image quota).

Invoke explicitly when you want to be sure — e.g. "Use the pedagogy-architect subagent to scope the conditional-probability notion" — or let the orchestrator delegate automatically off each agent's description.

---

## The first thing to run: the handoff test (RULES §5)

Before trusting the pipeline, prove the Opus→Sonnet handoff once. Author the **first notion both ways**:

- **(A)** through the pipeline: pedagogy-architect spec → content-author writes it.
- **(B)** a direct, high-effort single Opus pass on the same notion.

Compare. (B) is the quality ceiling; (A) is what the pipeline produces at scale. If (A) is close to (B), the handoff works and the spec format is good enough. If (A) falls short, the spec was underspecified — fix the spec format, not the authoring. This single exercise validates the pipeline, tests the handoff RULES §5 says to prove early, and gives you a yardstick for your editorial gate.

---

## Mined from the old roster (for the record)

Recovered as *scoping*, rebuilt fresh: the pedagogy, curriculum, and supabase agent lanes. Retired: `flutter-widgets` (ADR 0016), `exam-ingestion` (= curriculum extraction, deferred with the full-curriculum work), `learner-model` (a runtime concern, not authoring), `pr-reviewer` (never activated; review now folded into pedagogy-architect for the slice). A dedicated auditor agent is added later *only if* architect-as-reviewer proves insufficient.

**This roster should be recorded as an ADR once the slice validates it** — same discipline as the design tokens: provisional now, locked after reality tests it.
