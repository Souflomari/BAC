# ADR 0018 — Curriculum boundary: per-filière extraction from official Cadres de Référence

**Status.** Accepted, 2026. PC-stream physique-chimie **settled & committed**;
other (filière, matière) pairs in progress / pending (see Status below).

**Relates to.** ADR 0016 (Next.js rebuild), ADR 0017 (visual-sourcing taxonomy —
where the typed media callouts live). Complemented at the *shape* level by the
forthcoming exam-shape reference (`bac-reference.md` + `cadre.yaml`).

---

## Context

Authoring requires not just the exam's **shape** (coefficients, weights — the
forthcoming exam-shape reference) but its **content boundary**: which notions and
savoir-faire are in scope per filière, and — crucially — what is **out**. Without
an explicit boundary, authoring drifts off-syllabus: teaching Bayes in a
conditional-probability lesson the bac excludes, or solving the damped RLC
oscillator in closed form where the bac stops at *establishing* the ODE. The
boundary is extracted from the official CNEEO / MEN **Cadres de Référence** PDFs.

## Decision

- **Boundaries are stored as per-filière, per-matière structured YAML** in
  `docs/cadre/curriculum/` (e.g. `pc-physique-chimie.yaml`). Structure:
  `domaines → sous_domaines → chapitres → {programme, savoir_faire, limites}`,
  plus per-sous-domaine `poids`, `habiletes`, `competences_ciblees`,
  `travaux_pratiques`, and `exclusions`. (The committed PC file mirrors this
  exactly.)
- **Filière is a TOP-LEVEL key, not an attribute.** The same nominal subject
  differs by stream (SM maths ≠ SExp maths), so each (filière, matière) pair gets
  its own file/section rather than a shared file with stream flags.
- **Provenance convention.** Every field is marked `source: cadre p.N` (printed,
  verifiable against the PDF) or `source: derived` (inferred from what the cadre
  *omits* + domain expertise). The **derived layer — `limites` and `exclusions` —
  is the anti-off-syllabus machinery** and carries the **highest validation
  priority**, because it is exactly the part not printed in the cadre.
- **Extraction is fidelity-critical and human-gated.** The boundary is extracted
  by the model with the cadre PDF in context, then **human-validated** (the
  editor-in-chief, who sat these exams), then committed. An extraction error
  silently corrupts all downstream authoring, so this receives
  production-migration-level care **even though it is "just a file."**
- **Source PDFs are committed** to `docs/cadre/sources/` as the provenance
  record. The **YAML is authoritative and is NOT re-derived from the PDF by
  agents** — the PDF exists to verify provenance, not to be re-parsed at authoring
  time.

## Consequences

- **pedagogy-architect reads the relevant boundary when scoping** (wired in
  `.claude/agents/pedagogy-architect.md`): it bounds scope to `savoir_faire`,
  honors `limites` / `exclusions` as hard constraints, and cites the habileté
  ratios + sous-domaine weight into the spec. Off-syllabus authoring becomes
  *structurally difficult* rather than relying on the author's memory of the bac.
- **The future bac-fidelity critic gets a real rubric.** Habileté ratios and
  domain weights are ministry-published *numeric* targets, so "does this match the
  exam's cognitive mix?" becomes a checkable question, not a vibe.

## Status

- **SETTLED & COMMITTED:** PC-stream physique-chimie (8 sous-domaines, validated
  against the 2025 cadre; weights sum to 100% — physics 67 + chemistry 33).
  Format validated earlier on the Électricité sample and generalized to the full
  file.
- **IN PROGRESS:** PC-stream maths (Sciences Expérimentales cadre) — extraction
  underway, not yet committed.
- **PENDING:** SVT-for-PC cadre not yet sourced (candidate for Gemini
  web-sourcing); SM-stream cadres (maths is a different, denser document) not yet
  obtained. The derived `limites` / `exclusions` are human-validated for PC
  physique-chimie only; SM and SVT will need their own validation pass.
- **RELATED:** the exam-shape reference (`bac-reference.md` + `cadre.yaml`:
  streams × coefficients × weights × habileté ratios × format) is forthcoming and
  complements this boundary at the shape level.

## Retractions and Corrections

None.
