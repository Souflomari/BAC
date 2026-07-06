# Content-correctness docket — deep pass (2026-07-06)

**The owner's ruling docket.** Every substantive finding across all 61
lessons, recomputed independently (Python, twice) by six parallel deep
auditors. **Nothing here is silently corrected** — the owner sat the SMA
and Sciences Physiques bac; he is the correctness gate. This docket becomes
his ruling session, then a gated Sonnet cleanup.

**Legend.** SEV: P0 = wrong fact/value a student reproduces and loses marks
on the exam · P1 = wrong but self-evident · P2 = misleading · P3 =
refinement. CONF: the auditor's confidence it is truly an error (recomputed
twice before *high*). TYPE: `domain-fact` = pure science, the auditor is
sure · `cadre-scope` = correctness depends on the Moroccan *cadre de
référence* (not accessible here) — the general-science answer is noted, the
owner rules on cadre.

> Status: **AWAITING the six auditors.** Body filled on landing; each
> finding carries its full working so the owner can rule without re-deriving.

---

## P0 — harm on exam (wrong value/law a student reproduces)

_(pending)_

## P1 — wrong, self-evident

_(pending)_

## P2 — misleading / degraded

_(pending)_

## P3 — refinement / load-bearing justification skipped

_(pending)_

## Cadre-scope questions (owner rules on curriculum scope)

_(pending)_

## Investigated and withdrawn (do not re-flag)

- `content/maths/probabilites-conditionnelles/lesson.md:182` — `$P(B\|A)$`
  in a markdown table. Suspected ‖ double-bar render. **FALSE POSITIVE**
  (B1 pass, re-affirmed): the `\|` is correct table-cell escaping; KaTeX
  receives `|`; served HTML renders `P(B|A)`, page carries 0 `.katex-error`.

## Verified-clean lessons (a real result, not a null one)

_(pending — the auditors list every lesson whose worked examples all
recomputed exact)_
