# ADR 0008 — Misconception authoring conventions (template-setting step)

**Status.** Accepted, 2026-05-16.
**Owner.** pedagogy-auditor (content lead) + bac-curriculum (validation,
ID format, cadre fit).
**Related.**
- [ADR 0007](0007-misconception-schema.md) — the migration that landed
  the JSONB columns and the `user_misconception_states` table this
  authoring writes into.
- `backend/seed/misconceptions/sma_limit_calc.json` — the first author
  output and the template for every subsequent skill.

---

## Context

Migration 043 (Stage 4, ADR 0007) shipped the misconception schema.
Step 2 of the vertical slice authors the first skill's
misconceptions — `sma_limit_calc` ("Calcul de limites"). That single
file becomes the convention for every subsequent skill: file path,
shape, ID rules, language policy, 4-criteria filter, and the
template-comment block.

This ADR records each of those conventions verbatim, so the next
authoring agent (or the next stage of this work) operates without
re-litigating the choices.

## Decision

### 1. File path: `backend/seed/misconceptions/<skills.code>.json`

**Per-skill files, one per skill, named after the literal `skills.code`.**
Overrules ADR 0007 §"bac-curriculum — Authoring readiness", which
suggested unité-level grouping (`misconceptions_sma_math_analyse.json`).
Per bac-curriculum's ruling in this stage:

> "The unité-level grouping was premature optimization: it assumed
> misconception counts would be large enough to warrant batching, but
> at 2-4 misconceptions per skill the per-skill file is more
> navigable, maps 1:1 to the UPDATE migration it generates, and
> eliminates the need to parse a multi-skill file to regenerate a
> single skill's patch."

The first file: `backend/seed/misconceptions/sma_limit_calc.json`.
Every subsequent skill follows the same path. The encoder (to be
written in a follow-up step) reads one file → emits one migration
(`UPDATE public.skills SET common_misconceptions = ... WHERE code =
'sma_limit_calc'`).

### 2. Misconception ID format — three segments, each verbatim from
the source-of-truth table

**Format:** `mc.<subjects.code>.<skills.code>.<short-label>`

Per bac-curriculum's ruling §1-§3:

| Segment | Source | Example |
|---|---|---|
| Subject slug | Verbatim `subjects.code` | `math`, `physics`, `svt`, `engineering` |
| Skill code | Verbatim `skills.code` (including stream prefix if present) | `sma_limit_calc`, `pc_arithmetic_geom_seq`, `morphology` |
| Short label | French + kebab-case + ≤ 40 chars + semantically descriptive | `forme-indeterminee-valeur-nulle`, `infini-moins-infini-nul` |

ADR 0007's example IDs (`mc.math.limite-fonction.…`, `mc.phys.loi-ohm.…`,
`mc.svt.adn-structure.…`) used non-literal skill / subject slugs and
the `phys` shorthand. **Those examples are hereby declared illustrative
drafts, superseded by this ADR.** Any ID minted in that earlier style
must be treated as never-validated — none exist in prod.

The literal-`skills.code` rule is the only option that makes
misconception IDs machine-verifiable without a translation table:
given any misconception ID, the parent skill resolves via a direct
`WHERE code = <segment>` query. No mapping, no drift.

ID immutability semantics from ADR 0007 §B carry unchanged: once a
misconception ID appears in `skills.common_misconceptions[].id`, in any
`items.distractor_misconceptions` mapping, or in any
`user_misconception_states` row, the ID is permanent. Deprecation only,
no renaming.

### 3. 4-criteria filter for "what counts as a useful misconception"

Each misconception must meet **all four** criteria. Failing any one is
grounds for cutting it before ship. The filter is pedagogy-auditor's
domain; bac-curriculum's review enforces criterion (b) at the cadre
level.

- **(a) Named misunderstanding, not a procedural error.** A wrong
  *model* the student carries — what they think the world is doing,
  not where their pencil slipped. Counter-example to cut: "forgot to
  simplify the fraction" — procedural. Example to keep: "believes
  0/0 always equals 1" — model.

- **(b) Contradicted by a specific principle named in
  `contradicts_principle`.** The principle is what the diagnosis layer
  will eventually use to remediate at a more abstract level than the
  misconception itself. The text in `contradicts_principle` is the
  principle as it is examinable / teachable in the cadre — not a
  re-statement of the misconception negated. bac-curriculum lists the
  in-scope principles for each skill (see §5 below for the
  `sma_limit_calc` set).

- **(c) Distinguishable from every other misconception in the set on
  at least one MCQ stem.** If two misconceptions produce the same
  wrong answer to the same stem, the diagnosis layer can't tell them
  apart — they collapse pedagogically. Each authored misconception
  must include a `distinguishing_mcq_stem` in the seed file: an MCQ
  question that *only* that misconception (within the same skill's set)
  would lead a student to answer incorrectly. The distractor-tagging
  step (next in the vertical slice) consumes these stems.

- **(d) Supported by named math-education literature, the Moroccan
  cadre de référence, or a Bac-paper citation with year+session.**
  "Common student error" alone fails this filter — that's exactly the
  category criterion (d) exists to reject. Accepted sources include
  Tall & Vinner (1981), Cornu (1991), Sierpinska (1987), Monaghan
  (1991), Williams (1991), Artigue (1991), the cadre de référence
  2006 document, and Bac SMA / PC / SVT corrigés with the year and
  session named.

### 4. JSON file shape

Top-level object keys (all required):

```
{
  "_doc":              short author-facing description of the file's role
  "skill_code":        verbatim skills.code (e.g. "sma_limit_calc")
  "skill_name_fr":     human-readable French name (for skim review)
  "subject_code":      verbatim subjects.code (e.g. "math")
  "stream":            verbatim bac_stream enum value (e.g. "sciences_maths_a")
  "schema_version":    integer; this ADR ships version 1
  "authored":          { lead, validated_by, date, adr_refs }
  "misconceptions":    array of misconception objects
  "authoring_notes":   { filter_criteria, candidates_cut, authoring_order_for_teaching, close_to_the_line }
}
```

Each misconception object (canonical four + authoring-time extras):

```
{
  "id":                       per §2 format
  "label":                    short French name in quotes, ≤ 80 chars
  "description":              2-3 sentence French description of the wrong model
  "contradicts_principle":    the cadre-named or literature-named principle in French
  "evidence":                 array of strings — citations / Bac references; ≥ 1 required
  "distinguishing_mcq_stem":  MCQ stem + which choice this misconception triggers + the correct answer
}
```

The encoder (next step) projects only `{id, label, description,
contradicts_principle}` into `skills.common_misconceptions` JSONB.
`evidence` and `distinguishing_mcq_stem` stay in the seed file as
the audit trail and the input to distractor tagging respectively;
they are not in the DB.

`authoring_notes` is a free-form section for the human reviewer:
- `filter_criteria` — restates the 4-criteria filter for in-file
  legibility (no need to bounce out to the ADR while reviewing).
- `candidates_cut` — misconceptions considered and rejected, with
  one-line reasons. Forces explicit cut-decisions instead of silent
  omission.
- `authoring_order_for_teaching` — the sequence in which the
  misconceptions fire in a student's encounter with the skill;
  drives lesson ordering and remediation routing.
- `close_to_the_line` — anything the author is uncertain about; flag
  for the next review pass.

### 5. Cadre principles in-scope for `sma_limit_calc`

bac-curriculum's §4 ruling — the seven principles accepted as cadre-
aligned `contradicts_principle` text for this skill. The full text of
each is paraphrased below; the actual `contradicts_principle` field
in the JSON expands these into the misconception-specific phrasing.

| Principle (canonical name) | Note |
|---|---|
| Levée de forme indéterminée obligatoire | Substitution directe ne suffit pas pour 0/0, ∞/∞, ∞−∞, 0·∞. |
| `lim sin(u)/u = 1` quand `u → 0` | Limite fondamentale trigonométrique. |
| Factorisation par le terme dominant | Pour les fractions rationnelles et les sommes polynomiales à l'infini. |
| Technique de la quantité conjuguée | Pour les formes ∞−∞ avec radicaux. |
| Croissances comparées | `e^x` domine tout polynôme ; `ln(x)` négligeable devant `x`. |
| Règle de L'Hôpital (admise au Bac SMA) | S'applique seulement aux FI 0/0 et ∞/∞. |
| Limites à gauche et à droite doivent coïncider | Pour que la limite globale existe. |

**Out-of-cadre for this skill** (would be rejected at review): the ε-δ
formalism as a proof technique (lives on `sma_limit_def`, not here);
topological arguments (compacité, suites extraites — not in the SM-A
cadre).

### 6. Bilingual readiness — `label_ar` stays out of the seed JSON

ADR 0007 dropped `label_ar` from the misconception JSONB shape for v1
(AR fields stay null for MVP). This ADR confirms the decision for the
authoring side:

- **Seed JSON files omit `label_ar` entirely.** The FR-only authoring
  path stays clean. Adding `"label_ar": null` to every entry would be
  noise.
- **The encoder, when written, emits an explicit `"label_ar": null`
  key in every JSONB object it writes into `skills.common_misconceptions`.**
  Cost is zero; benefit is that future ALTER-free reads can check for
  the key's presence without a schema migration. Convention applies on
  the encoder side, not the seed side.

When AR authoring begins (deferred indefinitely from MVP), a separate
ADR adds an `_ar` extension to the seed JSON shape and the encoder
flows that through.

## Consequences

- **Template established.** The next authoring slice (whichever skill
  pedagogy-auditor picks) follows the same file path, shape, ID
  format, 4-criteria filter, and language policy. The first file is
  the template; every subsequent file is a copy with new content.

- **Encoder spec is now concrete enough to write.** The encoder reads
  `backend/seed/misconceptions/<skills.code>.json`, projects the
  canonical four fields per misconception, injects `"label_ar": null`,
  and emits a single-statement migration:
  ```sql
  UPDATE public.skills
  SET common_misconceptions = '[...]'::jsonb
  WHERE code = '<skill_code>';
  ```
  Wrapped in BEGIN/COMMIT with a `DO $verify$` block that asserts the
  row updated. The encoder is **not** written in this step.

- **Distractor tagging unblocks.** The next step in the vertical slice
  reads `distinguishing_mcq_stem` per misconception and tags the
  corresponding distractors in `items.distractor_misconceptions` for
  the existing `sma_limit_calc` MCQ rows.

- **ADR 0007's authoring brief is superseded** by this ADR's §1, §2,
  §4. ADR 0007 §"bac-curriculum — Authoring readiness" remains valid
  as the originating intent but is no longer the canonical spec.

## Pending follow-ups

- [ ] **Encoder for misconception patch migrations.** Reads
      `backend/seed/misconceptions/<skill_code>.json`, emits
      `migrations/0NN_misconceptions_<skill_code>.sql`. Idempotent
      UPDATE pattern; `DO $verify$` asserts the row was matched and
      JSONB structure is well-formed.

- [ ] **Distractor tagging for `sma_limit_calc`.** Step 3 of this
      vertical slice. Tag the existing MCQ items' distractors against
      the four misconception IDs in this file. Exercises ADR 0005's
      branch-test v2 suite (the `items.distractor_misconceptions`
      default-round-trip check should still pass post-tagging because
      the check looks at the first row by id-asc, which won't be a
      tagged item).

- [ ] **`distinguishing_mcq_stem` → item ID resolution.** The seed
      file's stems are text; distractor tagging needs to map them to
      actual item UUIDs. Either author finds the matching item by
      hand, or the encoder adds a lookup step. Decide in step 3.

- [ ] **Authoring slice 2.** pedagogy-auditor picks the next skill.
      Per ADR 0007's recommended order, the SMA Analyse unité
      continues with `sma_limit_def` (foundation), then `sma_continuity`,
      then `sma_tvi`, then `sma_deriv_definition`. Each one ships as
      a new file under `backend/seed/misconceptions/`.
