# Skeleton-lesson authoring brief (Day-9.5 fill)

> **Goal.** Author a complete DRAFT lesson for one chapter so the owner can
> evaluate the product with real content across subjects. This is
> tutoring-grade teaching prose, NOT a validated final notion (no bac sourcing
> is claimed — see Honesty). Build to the template-v2 boxes
> (`docs/pipeline/NOTION-TEMPLATE-V2.md`); imitate the gold standards
> `content/pc/rlc-serie/lesson.md` and
> `content/maths/probabilites-conditionnelles/` (read both first).

## Honesty (non-negotiable — the honest-state / sourcing rules)

- **No fabricated bac sourcing.** Do NOT create `exercises.yaml` with
  `sourcing.status: sourced`. Practice exercises are ORIGINAL and labelled as
  entraînement — never claimed to be a specific national sujet.
- **No fabricated assets.** Do NOT use `[[figure:…]]`, `[[motion:…]]`,
  `[[embed:…]]`, `[[video:…]]` markers — those media don't exist and would
  render nothing. Teach with prose + live math instead. (Diagrams are a later,
  separate lane.)
- **No authoring notes in prose.** Internal notes, if any, go in HTML comments
  `<!-- … -->` (stripped at load); the rendered text must contain none of:
  TODO, SLOT, À SOURCER, à faire, § with a spec number.
- **Stay in the 2ᵉ-Bac Moroccan programme scope** for the subject. Don't teach
  beyond the national programme.

## Deliverables (into `content/<subject>/<slug>/`, dir slug EXACTLY as given)

1. **`lesson.md`** — the lesson. Structure:
   - `# <exact title>` then a `---`.
   - `## R0 — Accroche : <short title>` — open on a concrete phenomenon,
     situation, or question (VISION L51-55), then invite a prediction the
     student commits to in prose ("prends position…", "avant de lire, réponds…").
   - `## R1 — …` through `## R4/R5 — …` — the décortiquer: build the idea in
     graduated rungs. Every rung teaches a MECHANISM (the "pourquoi c'est vrai"
     of each rule/formula — a student who asks « mais pourquoi ? » finds the
     answer in the rung), with at least one WORKED example carrying its
     reasoning annotation (the expert's decision: "ce qu'on cherche ici, et
     pourquoi ce geste"), not just clean algebra.
   - A final `## R<max> — Pour t'entraîner` rung: one worked exam-style
     exercise (original; NOT claimed sourced) with its reasoning, plus 1–2
     unworked practice prompts.
   - **Voice:** tu/on tutor register, written to be spoken; imperatives welcome;
     zero detached academic passive ("il est établi que…").
   - **Display-math discipline:** derivations of ≥2 transformations are BLOCK
     math (`$$…$$`), ONE transformation per line — never a chained
     `a = b = c = d` one-liner. Inline math (`$…$`) for symbols/single
     expressions. Valid KaTeX only.
   - **French orthotypography:** write plain ASCII apostrophes (`'`) and plain
     spacing — the render pipeline converts to curly + thin spaces. Do NOT
     hand-type U+202F or curly quotes.

2. **`items.yaml`** — 4–6 diagnostic MCQs (adds the interactive "Exercices"
   section). Schema (a broken file silently drops the section — so keep the
   YAML valid: 2-space indent, no tabs, quote any `text:` containing `:` or
   starting with `$`):

   ```yaml
   notion: <slug>
   skill_code: <subject>_<short>        # your choice, snake_case
   misconceptions: []                    # optional; [] is fine
   items:
     - id: <SLUG>-1
       rung: "R2"
       difficulty_level: 3               # 1..5
       skill_code: <subject>_<short>
       tags: []
       stem: >
         La question, avec math inline en $…$ si besoin.
       type: mcq
       choices:
         - id: A
           text: "$x = 2$"
           correct: true
         - id: B
           text: "$x = -2$"
           correct: false
           feedback: >
             Pourquoi c'est faux — nomme l'erreur de raisonnement, pas juste
             « faux ».
         - id: C
           text: "..."
           correct: false
           feedback: >
             ...
         - id: D
           text: "..."
           correct: false
           feedback: >
             ...
       correct_feedback: >
         Confirme et explique brièvement le bon raisonnement.
       solution: |
         **Étape 1 —** … (markdown + `$$…$$` autorisé)
   ```
   Exactly ONE choice per item has `correct: true`. Every wrong choice has a
   `feedback:` that names the reasoning error.

## Acceptance

- The directory `content/<subject>/<slug>/` exists with `lesson.md` (+ optional
  `items.yaml`). The chapter will then show "Disponible" automatically and
  render at `/notions/<subject>/<slug>`.
- **Do NOT commit and do NOT run the build** — leave the files in the tree and
  report: the path(s) you created, the rung titles, how many items, and any
  point where you were unsure. The dispatcher builds, verifies, and commits.
