# Day-7 task briefs — the portability test, and the dispatch template

These four briefs are the inputs to the Day-7 portability test: each was
handed to a COLD standard-model session (fresh context, no access to the
authoring sessions' history) whose only other input was the committed repo.
The test measures whether the week's specs are sufficient to maintain and
extend the product without the authoring model.

**They are also the template for how work gets dispatched after 2026-07-07:**
a brief names the task, points at the governing docs (it never restates
them — restating drifts), lists deliverables and acceptance boxes, and
carries the standing constraints. If a future session needs to ask a
question the pointed-at docs should have answered, that question is a SPEC
BUG: log it in the ledger, answer minimally, tighten the doc afterward.

Standing constraints carried by every brief (from RULES.md / DESIGN-BIBLE):

- **Content-lane only.** No production-touching work, no migrations, no
  deploys. The working branch is the only target.
- **Orient first:** `.claude/CLAUDE.md` → `docs/product/VISION.md` →
  `docs/Rules/RULES.md`; design work answers to `docs/Product/DESIGN-BIBLE.md`
  and the specs in `docs/design/`; content work to `docs/pipeline/`.
- **Tokens only; the U1 rule** (a new custom Tailwind key registers in
  `web/src/lib/utils.ts` classGroups in the same commit).
- **Rendered truth (§13):** `cd web && npm run build` must pass; visual
  claims only from rendered evidence; state "unverified" for anything not
  verified.
- **Honest state:** no fabricated progress, sourcing, or student knowledge.
- **Do not commit** — leave work in the tree and end with a report
  (deliverables, decisions made, and any questions the docs failed to
  answer). The dispatching session verifies, measures, and commits.
