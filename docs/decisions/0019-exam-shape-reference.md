# ADR 0019 — Exam-shape reference: reconciled from research syntheses

**Status.** Accepted, 2026. Most of the shape is **settled**; the two per-stream
Maths coefficients are **working-consensus, flagged pending** the official MEN
table (see Status below).

**Relates to.** ADR 0018 (per-filière curriculum *content* boundaries — this ADR
is the *shape* companion). The habileté ratios and domain weights here are the
same source as, and must agree with, the per-sous-domaine figures in
`docs/cadre/curriculum/`.

---

## Context

Authoring and the future **bac-fidelity critic** need the exam's **shape**
(coefficients, durations, domain weights, habileté ratios, the grading formula,
and paper format) alongside the per-filière content boundaries recorded in ADR
0018. Two independent research syntheses were produced; they **converge on every
load-bearing fact**, with a single genuine conflict in two coefficient cells.

## Decision

- **Store the exam shape as two files beside (not inside) `docs/cadre/curriculum/`:**
  `docs/cadre/bac-reference.md` (human-readable) and `docs/cadre/cadre.yaml`
  (machine-readable). This is a **different layer** — SHAPE — from the CONTENT
  boundaries in `curriculum/`.
- **Reconciliation rule.** Where both syntheses agree → recorded as
  **research-consensus**. The one genuine conflict — the per-stream coefficient
  cells **Maths-in-PC** and **Maths-in-SVT** — is resolved by adopting the cleaner
  table's value (**7** in both) as **working consensus**, explicitly flagged
  *"pending official MEN per-stream coefficient table."* Provenance markers
  distinguish **research-consensus / cadre-confirmed / contested** throughout.
- **Cadre overrides research flags.** Where a held cadre PDF resolves a
  research-flagged uncertainty, the cadre is authoritative and marked
  **cadre-confirmed** (e.g., PC-stream physique-chimie duration = **3h**, 2025 PC
  cadre).

## Consequences

- Agents read `cadre.yaml` for stream / coefficient / format facts; the habileté
  ratios and domain weights feed the **fidelity critic's rubric** and are
  consistent with the per-sous-domaine figures in the boundary files (same
  source).
- The **contested coefficient cells must NOT be treated as confirmed** in any
  user-facing coefficient/average feature until the official MEN table is
  obtained.

## Status

- **SETTLED:** grading architecture, the cadre machinery, the elaboration
  process, the habileté ratios, the cross-stream divergence, the exam formats, and
  the session-2026 dates.
- **WORKING-CONSENSUS (flagged):** Maths-in-PC (**7**) and Maths-in-SVT (**7**).
- **PENDING:** the official MEN per-stream coefficient table (the definitive
  tiebreaker); both syntheses rely on secondary sources for the coefficients.

## Retractions and Corrections

None.
