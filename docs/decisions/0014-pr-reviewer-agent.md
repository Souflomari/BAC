# ADR 0014 — pr-reviewer agent

**Status.** Draft, 2026-05-23 (revised same day after human review
resolved 5 open questions — see §"Resolved during human review").
Pending the trust-building period (3–4 supervised PRs + a
post-trust-building audit ADR) before the agent is treated as
load-bearing in the workflow.
**Owner.** human (workflow design); the agent itself is a self-contained
artifact under `.claude/Agents/pr-reviewer.md`.
**Related.**
- [`.claude/Agents/pr-reviewer.md`](.claude/Agents/pr-reviewer.md) —
  the agent file this ADR documents.
- [ADR 0005](0005-branch-test-workflow.md) — the branch-test workflow
  the pr-reviewer mechanically verifies was followed.
- [ADR 0011](0011-distractor-tagging-strategy.md) — the FK-semantic
  surprise that motivated several of the cross-reference consistency
  checks.
- [ADR 0012](0012-misconception-items-sma-limit-calc.md) — the
  within-skill cross-contamination matrix that the pr-reviewer
  verifies has been expanded across-skill (slice 2 hardening).
- [ADR 0013](0013-submit-answer-edge-function.md) — the assurance
  mechanism (`edge-function-smoke-test.ps1`) the pr-reviewer
  verifies was run on edge-function PRs.
- [`docs/grounding/architecture.md`](docs/grounding/architecture.md)
  §5.5 (bank-topology) and §5.6 (UUID allocation registry) — sources
  the pr-reviewer cites in flags and hard stops.
- All existing agent files under `.claude/Agents/` — the rules the
  pr-reviewer enforces are derived from them.

> **Numbering resolution.** A prior commit on this branch (`b38011b`,
> the across-skill cross-contamination fix) cites "ADR 0014
> (forthcoming)" for the new pedagogy-auditor hard rule. Per the
> human review of this ADR, the pr-reviewer agent keeps ADR 0014; the
> across-skill cross-contamination rule renumbers to **ADR 0015**.
> Citations in `.claude/Agents/pedagogy-auditor.md` and
> `backend/seed/misconceptions/sma_limit_ops.json`'s
> `v2_stem_design_check` are updated to "ADR 0015 (forthcoming)" in
> a follow-up commit on this branch. See §"Resolved during human
> review" §1 below.

---

## Context

The discipline rules in this codebase have grown beyond what one
person can apply consistently in a synchronous review session. The
rules now span:

- supabase-architect's hard rules (verify-block cardinality, RLS in
  the creating migration, service_role-only grants on write RPCs,
  no edits to migrations already run on production);
- ADR 0005's branch-test workflow;
- ADR 0008's misconception ID format;
- ADR 0011's Path A vs Path B skill-attribution decision;
- ADR 0012's within-skill cross-contamination matrix;
- the across-skill cross-contamination expansion from the
  slice-2-prep round (forthcoming ADR);
- ADR 0013's edge-function smoke test;
- architecture.md's §5.5 bank-topology shapes (A/B/C) and §5.6 UUID
  allocation registry;
- pedagogy-auditor's three-agent review protocol;
- the cadre-de-référence integrity rules (bac-curriculum).

Several of these have already bitten the codebase at PR time despite
the rules being known:

- **Migration 046** shipped a verify block that asserted structure
  but not cardinality; a UUID collision against migration 018
  silently no-op'd four INSERTs. The hard rule "verify block must
  assert post-state cardinality" was added to supabase-architect
  AFTER the failure.
- **Slice 2's M2 stem** on `sma_limit_ops` colliding with
  `sma_limit_calc.M1` was found in review, not by the within-skill
  cross-contamination check that ADR 0012 codified. The across-skill
  expansion was added to pedagogy-auditor AFTER the failure.

Both patterns are post-hoc rule additions. The pr-reviewer agent is
the prospective complement: an explicit mechanical check that runs
on every PR before a human reads it, against the union of all
existing rules.

## Decision A — Mechanical-only mandate

The pr-reviewer is restricted to mechanical checks. It does not
review:

- **Content correctness** — does this misconception actually exist
  in the cadre? Is this stem mathematically valid? — those stay
  with bac-curriculum and the human.
- **Pedagogical quality** — is this stem well-taught? Are the
  distractors plausible? — those stay with pedagogy-auditor.
- **Product judgement** — is this the right thing to build? Is
  this the right approach? Should we ship this now? — those stay
  with the human.
- **Production push approval** — the human owns the ship decision.
  The agent's output is a report; the human reads it and decides.

The mechanical layer catches: missing verify blocks, missing
cardinality assertions, off-range UUIDs, mis-formatted misconception
IDs, missing branch-test references, skipped RLS, write RPCs without
service_role-only grants, ADR-format violations, file-path
convention violations, missing across-skill cross-contamination
walks. Everything else escalates to the human.

The asymmetry is intentional: **authoring** can run autonomously
between sessions (Claude Code drafts, audits, designs, ADRs — all
landing on branches); **production-push approval** stays
human-gated. The pr-reviewer mechanizes the first-pass review of
the authoring work so the human's synchronous review session
compresses to the product-judgement question and the push decision.

## Decision B — Structured-report output

The pr-reviewer produces one report per PR with exactly four
sections:

- ✅ **Checks passed** — enumerated. Never "looks fine" without
  enumeration. Silence is not assent.
- ⚠️ **Flags** — non-blocking concerns with specific references and
  rationale.
- 🛑 **Hard stops** — must-fix items that block ship, each with a
  specific reference and rationale.
- 🤔 **Unable to determine** — checks the agent attempted but could
  not conclude on, with the specific reason. "I can't tell" is a
  valid output.

The four-section format is load-bearing: it prevents the agent from
silently approving by omitting concerns, forces explicit handling
of checks the agent could not resolve, and gives the human a
predictable shape to read in 30 seconds.

## Decision C — Trust-building period before the agent is active

The agent file is drafted in this branch. It is NOT yet treated as
active in the workflow. The trust-building phase has three steps:

1. **Human review of the agent file** (next session). Read
   `.claude/Agents/pr-reviewer.md`, surface gaps in the check
   categories, confirm the hard rules are correctly derived from
   existing agent files and ADRs, decide whether the open TODOs are
   acceptable as deferred.
2. **3 to 4 supervised PRs.** The agent runs on real PRs. The
   human reads BOTH the agent's report AND the diff independently,
   then compares. Any check the human caught that the agent missed
   → addition to the agent file. Any check the agent flagged
   incorrectly → revision to the agent file or removal of the rule.
3. **Audit.** After 3–4 PRs, the human writes a one-page audit
   summarizing: what the agent caught correctly, what it missed,
   what it flagged incorrectly, what surfaces it has no rules for.
   The audit becomes ADR-NNNN ("pr-reviewer trust-building outcome")
   and either promotes the agent to active or specifies the
   revisions needed before another cycle.

Only after step 3 produces a "promote" verdict does the agent's
report become load-bearing in the review session. Until then, the
human's reading is the source of truth and the agent's report is
informational.

## Decision D — Escalation rules (refuse to review)

The pr-reviewer refuses to produce a substantive report on PRs that
touch the meta-layer it itself runs against. Per the human review
(see §"Resolved during human review" §5), the three trust-building
candidates are promoted to active. The full active list:

- `.claude/Agents/*.md` — the agent kit itself, **explicitly
  including** `learner-model.md`'s hard rules (the
  Active/Cleared/Unassessed contract) and `pedagogy-auditor.md`'s
  hard rules (including the across-skill cross-contamination rule
  formalized in ADR 0015 forthcoming).
- `scripts/branch-test.ps1` — the migration trust anchor.
- `scripts/edge-function-smoke-test.ps1` — the edge-function
  trust anchor.
- `docs/grounding/architecture.md` hard-rule sections, including
  §5.5 (bank-topology) and §5.6 (UUID registry).
- `docs/grounding/known-issues.md` severity classifications.
- `docs/decisions/0008-misconception-authoring-conventions.md` and
  any successor ADR that defines the misconception ID literal-segment
  format (`mc.<subjects.code>.<skills.code>.<short-label>`).

For PRs touching these surfaces, the agent emits a one-line
"out of mechanical scope — routed to human-only review" report
and stops. The agent does not review the rule sources from which
its own checks derive.

The distinction between **rule sources read** (the agent consults
these to derive checks) and **surfaces refused for change-review**
(the agent refuses to review changes to these) is documented in the
agent file's "Rule sources read vs surfaces refused for change-review"
section. Same document can appear in both lists; the two roles are
separate and explicit.

## Consequences

- **Review session compresses.** Once the agent is active, the
  60–90 minute review session focuses on the product-judgement
  question and the push decision; mechanical violations are caught
  upstream. Estimated compression: 30–50% of mechanical-checking
  time eliminated.
- **Between-session work can run on every PR with a safety net.**
  Authoring slices that previously needed human review at every
  step can now run to a PR with the agent's report waiting; the
  human reviews the report + the artifacts in one pass.
- **The agent's report is auditable.** Every flag and every hard
  stop cites a rule from an existing agent file or ADR. The agent
  cannot invent rules; the human can verify any finding by reading
  the cited rule.
- **The agent is brittle to rule changes.** When a new ADR lands
  that adds a rule, the pr-reviewer file must be updated to include
  the check. This is documented as an open TODO ("Expansion
  candidates"). The pr-reviewer.md file is part of the meta-layer
  it cannot review — by Decision D, it routes to human-only
  review for its own updates.
- **False negatives are the dominant risk.** A check the agent
  doesn't have a rule for slips past. Mitigated by the trust-building
  period and the "refuse silently-clean reports" behaviour
  (Decision B).
- **False positives are visible.** A hard stop that turns out to be
  wrong forces the human to either add an exception to the agent
  rules or revise the cited rule itself. Visibility makes
  iteration tractable.

## What this does not change

- Production pushes are still human-gated.
- The branch-test workflow (ADR 0005) is unchanged.
- The edge-function smoke test (ADR 0013) is unchanged.
- ADR-authoring is unchanged — the pr-reviewer reads ADRs as
  rule sources, not as artifacts to validate.
- The three-agent review protocol (pedagogy-auditor authors,
  bac-curriculum validates, supabase-architect maps) is unchanged.

## Resolved during human review

The five open questions raised in the draft were resolved during the
human review session that produced this revision. Listed in the order
they were raised; each carries the resolution and the rationale.

1. **ADR numbering collision.** *Question:* this ADR takes 0014; the
   across-skill cross-contamination rule (committed in `b38011b` on
   this branch) cites "ADR 0014 (forthcoming)". *Resolution:* the
   pr-reviewer ADR keeps 0014. The across-skill cross-contamination
   rule renumbers to **ADR 0015**. Citations in
   `.claude/Agents/pedagogy-auditor.md` and
   `backend/seed/misconceptions/sma_limit_ops.json`'s
   `v2_stem_design_check` are updated to "ADR 0015 (forthcoming)" in
   a follow-up commit on this branch (separate from the agent
   refinement commit). *Rationale:* the pr-reviewer agent is the
   load-bearing artifact for ongoing workflow; the across-skill rule
   will be formalized when slice 2 ships and its ADR fits naturally
   one number later in sequence.

2. **Report storage.** *Question:* reports as PR comments, PR
   description appendices, or repo-tracked files? *Resolution:*
   **repo-tracked under `.audit-logs/pr-reviews/<PR-number>-<short-slug>.md`**.
   *Rationale:* reports become part of the durable project record
   alongside branch-test logs in the same directory; they survive PR
   closure (PR comments are lossy when a PR is force-pushed or
   closed); they can be grep'd later for "what did the agent say about
   migrations 048+"; and they don't require an `origin` remote (the
   slice-2-prep-report.md surfaced that the local clone has no remote
   configured — repo-tracked storage works without one).

3. **Calibrated minimum-checks threshold.** *Question:* the "refuse
   silently-clean reports" rule names a calibrated threshold but does
   not specify the number. *Resolution:* **explicitly deferred to the
   trust-building period.** The threshold will be calibrated after
   PRs 1 and 2 produce a sense of typical meaningful-check counts.
   *Rationale:* the right number depends on the empirical distribution
   of checks per PR in this codebase, which is unknown until real PRs
   run through the agent. A hard-coded threshold now would either be
   too lax (lets silent reports through) or too strict (forces
   meaningless padding). Trust-building produces the data.

4. **Reports per PR — one or two for slice PRs?** *Question:* for a
   PR shipping a full slice (misconceptions JSON + items migration +
   ADR), one report covering all changed files or one per logical
   layer? *Resolution:* **one report per PR, regardless of how many
   logical layers.** *Rationale:* the PR is the unit of merge and
   the unit of review; splitting reports invites cross-layer issues
   to be missed (e.g., the items migration references a misconception
   in the JSON — a per-layer report would catch each in isolation but
   miss the cross-reference); the four-section structure
   (✅ / ⚠️ / 🛑 / 🤔) already provides intra-report organization
   sufficient for the human to navigate.

5. **Escalation list expansion.** *Question:* which additional
   surfaces beyond the four named in the draft Decision D should
   route to human-only review? *Resolution:* **the three
   trust-building candidates are promoted to active.** Decision D
   above now explicitly includes:
   - `learner-model.md`'s Active/Cleared/Unassessed contract;
   - `pedagogy-auditor.md`'s hard rules (including the across-skill
     cross-contamination rule);
   - `docs/decisions/0008-misconception-authoring-conventions.md`
     and any successor ADR defining the misconception ID format.

   *Rationale:* these three surfaces are load-bearing for the
   agent's own checks. A change to ADR 0008's ID format invalidates
   the agent's cross-reference consistency checks; a change to
   `learner-model.md`'s Active/Cleared/Unassessed contract changes
   what the misconception-write path is supposed to record; a change
   to `pedagogy-auditor.md`'s hard rules changes what the agent
   verifies against content PRs. The mechanical layer cannot review
   changes to the rules that define what mechanical means — promoting
   them to refused at this stage avoids waiting for the trust-building
   period to discover this in practice.

## Retractions and Corrections

None — this is a new agent, not a revision of a prior decision.
