# ADR 0027 — Design-system systemization (Phase A) + agent-roster refresh to the 5-family era (Phase B)

**Status.** Accepted, 2026-08-05. Triggered by the owner's five-point
"perfect product" directive (finish the design system; fix the agents; reach
bac-mastery sufficiency; then bugs; then generative media). This ADR records
the **opening block** — Phases A and B — executed phase-by-phase under the
owner-gated cadence. Detail lives in the commits, `docs/design/TOKENS.md` (v2),
and `docs/agents/ROSTER.md` (v2); this ADR is the durable summary.

## 1. Context

The app went live on production this sprint (the adaptive tutor engine
end-to-end). The design system was "mostly in place" but not systemized:
values were hand-maintained in three parallel places (TOKENS.md, globals.css,
tailwind.config), a ~50%-dead Tailwind alias layer coexisted with 490 arbitrary
values, dom-truth asserted only type sizes + one color, and there was no guard
against drift. Separately, the agent roster's record layer had drifted: model
assignments predated the 5-family models, the wave-commissioning scaffolding was
spent, and several ghosts (a `nextjs-frontend` shell agent with no file, a stale
`Flutter Web` stack line, "Sonnet 4.8" audience notes, a mermaid naming retired
agents) contradicted the as-built reality.

## 2. Decisions — Phase A (design system, FULL systemization)

Owner verdict (2026-08-05): full systemization, not a lighter coherence pass.

1. **One source of truth: `web/src/lib/tokens.ts`.** A generator emits
   `web/src/app/tokens.generated.css` (the `:root`/`.dark` custom-property
   blocks, `@import`ed by globals.css); `tailwind.config.ts`, `dom-truth.mjs`,
   and `cn()` all derive from the same module. A `prebuild --check` fails the
   build if the generated CSS drifts. Editing a value means editing tokens.ts
   and nothing else.
2. **One consumption syntax.** 429 arbitrary token utilities were codemodded to
   named aliases (`text-[var(--color-text-secondary)]` → `text-secondary`,
   etc.); the var-bracket syntax is banned. Cross-role colors got precise
   per-utility aliases; clean common names (`text-primary`, `border-subtle`)
   preserved.
3. **New systemized families:** eyebrow tracking, touch target, a z-index scale,
   and the previously-missing motion CSS vars (`--duration-slow`, the four
   `--ease-*` curves). Motion unified onto one `motion` source feeding both the
   CSS vars and the tailwind utilities.
4. **Self-enforcement.** dom-truth gained a token-parity sweep (every var
   asserted against tokens.ts in both themes, zero hand-listing) and a cn()
   merge tripwire (the audit-U1 class-drop is now a hard gate).
   `scripts/token-gate.mjs` bars any new arbitrary token utility, wired as a
   commit gate and dom-truth's first gate; a deliberate one-off uses a
   `token-gate-allow` marker.
5. **No token VALUES changed** — the migration was computed-identical
   (dom-truth 169→172 checks, 0 failures throughout). TOKENS.md frozen at v2
   with a changelog and the previously code-only tokens documented. The
   multi-theme `data-theme` registry (THEME-ARCHITECTURE) is marked explicitly
   deferred; tokens.ts is shaped to accept it in one entry.

## 3. Decisions — Phase B (agent-roster refresh, 5-family era)

1. **Model routing is 5-family:** **Fable 5** orchestrates/plans/audits (the main
   session, no file); **Opus 5** for judgment/critics/schema/research + the gated
   10%; **Sonnet 5** for high-volume execution; **Gemini** (lane) for media +
   long-context bulk. Bash stays exclusive to supabase-architect (and pr-reviewer
   for branch-tests). The 10 `model: opus` agent files were pinned to
   `claude-opus-5`; the 7 Sonnet agents were already `claude-sonnet-5`.
2. **No new agents.** The lean 17-agent roster held through every campaign. SVT's
   document-reasoning need (Phase C) lands as a charter extension to
   pedagogy-architect / content-author / item-author, not a new file.
3. **The roster is recorded as-lived** in `ROSTER.md` v2: both critic waves have
   fired (wave-commissioning scaffolding is spent); motion runs on the
   first-party MotionStage/GSAP engine via `.motion.json` (NOT Manim);
   diagram-author owns bespoke `interactive-svg`; interactive-author (embeds) is
   deprioritized; pedagogy-architect carries judgment-at-scale + absorbed
   design-review; item-author's high-volume fan-out is now charter; pr-reviewer
   is active-by-roster but has never yet run (first run = next gated push).
4. **Ghosts retired / contradictions healed:** `frontend-builder` IS the
   frontend agent — no `nextjs-frontend` shell agent (open decision #2 resolved);
   `.claude/CLAUDE.md` stack line corrected to Next.js and open decisions #2/#3
   marked resolved; `RULES.md §5` updated to the 5-family budgets with the stale
   `[STATUS: not yet decided]` block removed; the four spec "Sonnet 4.8 cold"
   audience notes updated to "Sonnet 5 cold"; `pipeline.md` banner-marked
   superseded-by-ROSTER; the `agent-workflow-v2.mermaid` deleted (named retired
   agents). Flutter-era root docs handled: `README.md` / `CONTRIBUTING.md`
   rewritten to the Next.js reality; `PROJECT_STATUS.md` and `ARCHITECTURE.md`
   deleted (superseded by `docs/HANDOFF.md` + the ADR trail; git preserves them).

## 4. Consequences

- A value has exactly one home; adding a token is a single edit plus a doc line,
  and drift fails the build or a gate loudly rather than shipping silently.
- Frontend work (Phase C's dashboard-v2 and bank surfaces) builds on a finished,
  guarded system and routes through `frontend-builder` at Sonnet 5.
- The roster docs no longer contradict the as-built system, so subsequent phases
  dispatch against an accurate map. The HANDOFF model-swap rule applies at the
  first 5-family content dispatch (Phase C): a dom-truth + one gestalt pass
  before wave work.

## 5. Supersedes / relates to

- Supersedes the spent model-routing and commissioning language in ADR 0020's
  and ROSTER v1's roster sections (both waves now fired; 5-family models).
- Relates to ADR 0016 (Next.js rebuild — the stack line correction), ADR 0017
  (visual sourcing taxonomy — the motion-engine/Manim correction), ADR 0022–0024
  (the design-token values Phase A systemized without changing).

## Retractions and Corrections

_(none)_
