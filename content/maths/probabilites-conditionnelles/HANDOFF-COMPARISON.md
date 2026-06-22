# Both-ways handoff test — Probabilités conditionnelles

> The test RULES §5 / `docs/pipeline/pipeline.md` says to run before trusting the
> pipeline: author the first notion **both ways** and compare.
> - **(A)** through the pipeline — pedagogy-architect `spec.md` → content-author `lesson.md` (Sonnet).
> - **(B)** a direct, high-effort single-Opus pass — `lesson.directB.md`, written without the spec/Sonnet handoff.
>
> (B) is the quality ceiling; (A) is what the pipeline produces at scale. **If (A)
> is close to (B), the handoff works and the spec format is good enough.** If (A)
> falls short, fix the *spec format*, not the authoring.

## Verdict: the handoff works. Ship the spec format.

(A) is **at or above** (B) on coverage and pedagogy, and within a hair on voice.
The spec carried enough of the thinking that the Sonnet pass did not have to guess
— which is exactly the success condition. No spec-format change is required before
scaling; two small polish notes below are content-review items, not spec defects.

## Side-by-side

| Dimension | (A) pipeline `lesson.md` | (B) direct Opus `lesson.directB.md` |
|---|---|---|
| Correctness | Sound throughout; numbers agree with the SVG and across beats | Sound throughout; same numbers |
| Coverage of the 8 misconceptions | **All 8, explicitly confronted**, each with a magnitude/contradiction check | All 8, woven into prose; less explicitly enumerated |
| Worked examples | **5, one per rung R1–R5**, expert reasoning out loud, incl. urn-sans-remise & two-machines | 1 integrated worked reversal + inline mini-examples |
| Structure / scaffolding | Explicit R0–R7 headers + ramp table; scaffolding visibly fades | Flowing sections; ramp implied, not tabulated |
| Arc closure (R0 disease-test → R5) | Closed, with a 10 000-person frequency retelling that makes the 9 % concrete | Closed, with the same frequency intuition more briefly |
| Voice (calm, voice-ready, FR) | Very good; occasionally more "textbook" | Slightly more cohesive single narrative voice |
| KaTeX / both notations | Yes; `P(B\|A)` and `P_A(B)` used at parity | Yes; both notations |
| Tree placement | `[[ARBRE_PONDERE]]` at R2/R4/R5 as spec'd | Marker at the product beat (one) |

## Where (A) is stronger than (B)
- **More complete worked-example set** (5 vs ~1+inlines): the spec's per-rung
  worked-example instruction produced breadth (A) that a single direct pass (B)
  compressed for flow.
- **Misconceptions are individually visible and individually checked** — better as
  a *diagnostic teaching* artifact, which is the product's whole thesis.
- **Explicit ramp table** makes the difficulty progression legible.

## Where (B) is (marginally) stronger
- **Voice cohesion**: one authorial throughline; (A) reads slightly more sectioned.
- **Concision**: (B) says it once, well; (A) occasionally restates.

These are stylistic, not substantive, and do not indicate an under-specified spec.

## Two polish notes (content-review items, NOT spec-format failures)
1. **Internal misconception codes leak into student headers** in (A): headings like
   “… (M2)”, “… (M6)” expose pipeline ids to the student. Strip the `(Mn)` tags
   from student-facing prose (keep them only in spec/items). One-line content fix;
   the harness will display whatever ships.
2. **Both-notation primacy** is still an open spec question (§7): both lessons use
   `P(B|A)` and `P_A(B)` at parity, pending the human's call on which the SM manuels
   lead with.

## What the human experiences in the harness
The harness renders **(A) `lesson.md`** (the pipeline output) — deliberately, since
the eval is of the pipeline. (B) is here only as the comparison ceiling and is not
wired into the rig.

## Conclusion for the pipeline
RULES §5 handoff test **passes**: spec format is good enough that Opus→Sonnet
authoring reaches the quality ceiling. The provisional 4-agent pipeline (ADR 0017,
recorded provisional) has its first piece of validating evidence — still pending the
human's editorial gate and domain validation of the (autonomously authored) spec.
