# Review — Probabilités conditionnelles (pipeline step 4, pedagogy-architect)

> **Reviewer:** pedagogy-architect (Opus), reviewing against `spec.md` §6.
> **Artefacts reviewed:** `lesson.md` (content-author, path A), `items.yaml` (24 items, item-author), `media/arbre-pondere.svg`.
> **Verdict:** **BOUNCE-WITH-FIXES.** The pedagogy is sound and the spec was followed closely on scope, coverage, dual-tagging, the coded tree, and the hook→reversal arc. But the lesson **leaks internal misconception codes (M1…M8) into student-facing headings and prose** — a clear violation of the student-facing standard — and there are three smaller item defects. None are structural; all are surgical. Fix the list below, then this is ready for the human gate.

---

## Spec §6 checklist

### 1. Scope — no full-Bayes creep, no dénombrement re-teaching, tree-reversal only
**PASS.**
- No named "théorème de Bayes" appears anywhere in lesson or items. R5 and all M8 items compute `P(A|B) = P(A∩B)/P(B)` strictly by tree-reversal (assemble `P(B)` by total probability, then divide). The lesson's validation note at the end correctly keeps the Bayes-naming question open for the human (spec §7.1).
- No dénombrement is re-taught. Counting results are *used* (urn draws in PC-M5-2, the sans-remise tree in lesson Exemple 2, the two-urns reversal PC-M8-3) but combinaisons/arrangements are never re-derived — consistent with spec §0.2/§0.5.
- The "arrangement vs combination" misconception is correctly absent from the inventory (routed out per spec §0.5).

### 2. All 8 misconceptions targeted; ≥3 items each; co-attributions dual-tagged, not hidden
**PASS.**
- All 8 misconceptions are declared in the `misconceptions:` block with `label`, `description`, `contradicts_principle` (all French). 24 items, exactly 3 per misconception — meets the ≥3 floor, stays at/under the 6 ceiling. The `coverage_summary` table is present and correct.
- Co-attributions are tagged in the open, not hidden:
  - **M4↔M5** handled exactly as the spec demanded: on M4 stems the "sum" distractor is tagged M5, on M5 stems the "0" distractor is tagged M4 (PC-M4-1.C→M5, PC-M5-1.C→M4, plus the variants). Primary triggers stay distinct (M4 primary = "0", M5 primary = "0,9").
  - **M1↔M8** handled: the un-reversed conditional (PC-M8-1.B, PC-M8-2.B, PC-M8-3.C, PC-M1-2.C) is dual-tagged to both via `also_reveals`. M8's unique primary trigger ("prior-as-denominator" value) is preserved.
  - **M2 surfacing inside M8** (PC-M8-2.D) is dual-tagged M8+M2 — intended scaffolding-of-diagnosis, correct per spec §1 note.
- The `dual_tagged_distractors` block documents every co-attribution with the two (or more) misconceptions and a rationale. This is the cleanest part of the build.
- **Minor BOUNCE note (machine-readability, not pedagogy):** the dual-tagging is expressed via a `misconception:` field plus an `also_reveals:` list on the choice, while the `coverage_summary.dual_tagged_distractors` block re-states it separately. This is internally consistent and human-legible, but item-author / supabase-architect must confirm the encoder reads `also_reveals[]` into `items.distractor_misconceptions` as multiple IDs against the **0-based string index** (migration 046 convention, spec §1/§5). Flag for step 7 — not a content defect, but do not let it silently drop the secondary tag.

### 3. No correct-answer contamination on any stem
**PASS (with one item to double-check at the human gate).**
- I traced every item's wrong-model paths to the choice they land on; in all 24 items each misconception's wrong model reaches a **distractor**, never the correct choice. Spot-checks: PC-M2-1 (M2→B=0,3, correct A=0,6); PC-M4-1 (M4→B=0, M5→C=0,9, correct A=0,2); PC-M7-1 (M7→B=0,7 and →C=0,35, correct A=0,38); PC-M8-1 (M1/M8→B=0,05, M8→C=0,6, correct A=5/7). No wrong model produces the correct value on its own stem.
- **One to surface, not a hard bounce:** PC-M5-3 and PC-M3-3 are *true/false-with-reasoning* MCQs where the correct option bundles a correct computation **and** a correct conclusion. These are clean as written, but they are the format most prone to a student reaching the right letter by a *wrong* sub-reason (e.g. picking "indépendants" for the wrong cause). Acceptable for v1; flag for the human to confirm the bundled-justification format is what the SM bank wants.

### 4. Coded tree — root→2→4, conditional edge labels, product leaves, no Gemini structural art
**PASS.**
- `media/arbre-pondere.svg` is hand-coded SVG (no Gemini). Structure is exactly root (Ω) → 2 first-level nodes (A, Ā) → 4 leaves.
- Edges carry the correct labels: `P(A)=0,6`, `P(Ā)=0,4`, and the four **conditional** second-level edges `P(B|A)=0,5`, `P(B̄|A)=0,5`, `P(B|Ā)=0,2`, `P(B̄|Ā)=0,8`.
- Four leaves each show intersection + product value (`A∩B = 0,6×0,5 = 0,30`, etc.), summing to 1,00.
- The two B-leaves carry the accent stroke + "feuille B" tag, and the caption states both readings ("multiplier le long d'une branche" / "P(B) = 0,30 + 0,08 = 0,38"). This supports the R4 total-probability and R5 reversal readings as spec C1 required.
- The lesson références `[[ARBRE_PONDERE]]` at R2, R4, and R5 — the three placements the spec mandated. The garbled `_media-test` Gemini PNGs are not used.
- **Minor note (not a bounce):** the SVG hard-codes glyphs as text (`Ω`, `B̄` via combining overline) rather than KaTeX. Spec C1 said "KaTeX for every probability glyph." For a static SVG this is an acceptable rendering choice (the labels are legible and correct, which was the whole reason for coding it), but flag for the human/renderer owner whether the platform wants KaTeX-in-SVG (foreignObject) or accepts text glyphs. Correctness is intact either way — this is the opposite of the Gemini failure mode and meets the load-bearing requirement.

### 5. Hook→reversal arc closed (R0 disease-test resolved at R5)
**PASS — exemplary.**
- R0 (lesson lines 8–28) plants the disease-test, makes the student predict, reveals ≈9% without explaining, and explicitly promises "à la fin, on reviendra sur ce test et on calculera ce 9 % ensemble."
- R5 closes it (lines 329–360) under the heading "Fermeture de l'arc : le test médical du départ, résolu", re-states the predicted 95% vs actual 9%, builds the tree, computes step-by-step to ≈9%, and gives the 10 000-person frequency intuition (95 vrais positifs / 1085 positifs). The arc is wired exactly as spec §2 "Arc closure" demanded. PC-M1-1 then re-tests the same scenario as the canonical M1 item.

### 6. Everything student-facing French, voice-ready, KaTeX
**PARTIAL — PASS on language/voice/KaTeX, but see issue #7 below for the code-leak defect.**
- All student-facing prose, stems, choices, feedback, and solutions are in French. Math is KaTeX (`$…$`, `$$…$$`), never images of équations. Both notations `P(B|A)` and `P_A(B)` appear (spec §0.1), with the primacy question correctly left open for the human.
- Voice-ready register is good ("Prends une seconde. Note mentalement ta réponse."; "On va construire les outils qu'il faut, pièce par pièce.").
- **However**, the student-facing text is contaminated by internal codes — see the dedicated finding below. That is what knocks this criterion from clean PASS to a required fix.

### 7. R3 independence beat paced, not rushed
**PASS.**
- R3 opens with "Ce paragraphe est dense en pièges. On va le prendre lentement, morceau par morceau." It then separates: the side-by-side table → the die-contradiction (M3, forces `P(B|A)=0`) → what "indépendant" really means (M4, two-coins overlap) → ×-not-+ formula with magnitude check (M5) → a récapitulatif. One idea per beat, each checked before moving on, as spec §4 required for the highest-density section. Well done.

---

## The flagged issue (confirmed) — internal misconception codes leak to students

**CONFIRMED VIOLATION. This is the primary bounce.**

The lesson exposes internal diagnostic codes (M1…M8) directly in student-facing headings and prose. These codes are pipeline/spec instruments (they map to `mc.math.sma_prob_conditionnelle.*` IDs); a student has no idea what "(M2)" means, and seeing it breaks the calm, authored-for-the-learner voice the VISION requires. The spec's language policy (and DESIGN-BIBLE voice standard) is that **every student-facing string is for the student** — internal taxonomy must not appear.

Occurrences to strip (all in `lesson.md`):
- L74 `#### L'erreur classique à éviter ici (M2)`
- L87 `#### La symétrie qui n'existe pas (M1)`
- L157 `#### L'erreur à repérer (M6)`
- L182 `#### L'exemple qui force la contradiction (M3)`
- L204 `#### Ce que « indépendant » veut dire vraiment (M4)`
- L216 `#### La formule d'indépendance utilise ×, pas + (M5)`
- L266 `#### Pourquoi on ne peut pas juste additionner les conditionnelles (M7)`
- L316 `#### Ce qu'il ne faut pas faire (M8)`
- L366 `### Exemple 1 — R1 : Appliquer la définition (M2 et M1)`
- L384 `### Exemple 2 — R2 : Construire et lire un arbre (M6)`
- L413 prose: "… signal immédiat d'erreur (M6)."
- L417 `### Exemple 3 — R3 : Tester l'indépendance (M3, M4, M5)`
- L447 `### Exemple 4 — R4 : Probabilités totales avec deux machines (M7)`
- L467 prose: "… C'est le signal de l'erreur M7 …"
- L471 `### Exemple 5 — R5 : Lecture inverse complète (M8, M1, M2)`
- L498 prose: "… sa version renversée (M1)."
- L499 prose: "… toutes les façons de produire un défaut (M8)."
- L500 prose: "… (M2 revisité dans le contexte de la lecture inverse)."

**Required fix (content-author):** Remove every `(Mn)` / "erreur Mn" / "(Mn revisité)" token from student-facing text. Keep the pedagogy — the *named misconception in plain French* is good and should stay (e.g. "La symétrie qui n'existe pas", "On additionne le long d'une branche : pourquoi c'est faux"). Only the bracketed codes go. If a build-time trace from lesson beat → misconception ID is wanted, carry it in an HTML comment (`<!-- confronts: M2 -->`) or front-matter, never in rendered prose.

> Note on `items.yaml`: the item **feedback** strings also say things like "Modèle erroné (M5) : …" and "Modèle erroné : M4 (…) doublé de la confusion M3." Same defect, same fix — strip the `(Mn)` / `M4`/`M3` letter-codes from the *student-facing* `feedback` and `correct_feedback` text. The plain-French description of the wrong model ("indépendants ⇒ P(A∩B)=P(A)+P(B)") is exactly right and stays; only the internal letter labels are stripped. (The structured `misconception:` / `also_reveals:` fields are metadata, not shown to students — those keep the IDs, correctly.)

---

## Additional item defects to fix (item-author)

**D1 — `skill_code` typo, PC-M8-2 (items.yaml L1285).** Reads `sma_prob_conditionnelles` (trailing "s") vs the correct `sma_prob_conditionnelle` used by all 23 other items. This will mis-route the item at encode time (skill FK will not resolve — exactly the ADR 0011 join failure the spec §0.4 warns about). **Fix: drop the trailing "s".**

**D2 — Malformed/confusing feedback, PC-M6-1 choice C (items.yaml L930–933).** The feedback reads: "Ce choix retourne $P(B|A)-P(A)=0{,}4-0{,}6=-0{,}2$... ou $P(A)-P(B|A)=0{,}2$, une différence …". Showing a student a négative "probability" mid-sentence and then a self-correction ("… ou …") is confusing and not voice-ready. **Fix: state the intended diagnosis cleanly** — choice C (0,2) is the différence `P(A) − P(B|A) = 0,6 − 0,4 = 0,2`; drop the negative-then-flip detour. (Distractor C is a non-misconception noise choice, so no tagging change — only the prose.)

**D3 — Diagnostic-isolation drift on M1 (spec §1 co-attribution note / §5 "diagnostic isolation").** The spec said M1's **primary** item should sit on a *pure two-event stem* so M1 is isolable from M8 ("M1's primary is on a pure two-event stem"). As built, **all three M1 items (PC-M1-1, PC-M1-2, PC-M1-3) are full reversal scenarios** (disease test, two procédés, spam filter) — the same surface as the M8 items. The dual-tagging keeps them *attributable*, so this is not a correctness defect, but it weakens M1's diagnostic isolation: a student who misses PC-M1-1.B could be running M1 or M8, and there is no pure-conditional M1 stem to separate them. **Recommended fix (low cost):** convert one M1 item (e.g. PC-M1-1 stays as the hook callback, but add/retool a variant) to a pure two-event transposition stem, e.g. "On donne P(A∩B)=0,2, P(A)=0,5, P(B)=0,8. Un élève répond P(A|B)=0,4 alors qu'on demandait P(B|A). Que vaut réellement P(B|A)?" — isolating the transposition without the reversal machinery. If the human judges the reversal-only framing acceptable for M1, this can be waived — flag for the gate.

---

## Items the human should eyeball at the gate (not defects)

- **R6/R7 sourcing (spec §2 R6, §7.3):** PC-M8-2 is tagged `bac_style` and PC-M1-3 / PC-M8-3 are `variation_fraiche`. These are reconstructions, not sourced national-exam items. The lesson's R6 row and the spec both flag that genuine year+session items must be sourced in the curriculum-extraction phase. Correctly flagged; nothing to fix now.
- **Open scope questions (spec §7):** Bayes-naming and notation primacy remain open in the lesson's closing validation note — correctly deferred to the human.

---

## Verdict

**BOUNCE-WITH-FIXES.** Required before human gate:

1. **(content-author)** Strip all `(Mn)` / "erreur Mn" / "(Mn revisité)" codes from student-facing lesson text (18 sites listed). Keep the plain-French wrong-model names.
2. **(item-author)** Strip the `(Mn)`/`M4`/`M3` letter-codes from student-facing `feedback`/`correct_feedback` strings (metadata IDs stay).
3. **(item-author)** Fix the `sma_prob_conditionnelles` typo on PC-M8-2 (D1).
4. **(item-author)** Rewrite the malformed PC-M6-1 choice-C feedback (D2).
5. **(item-author, recommended / human-waivable)** Give M1 one pure-two-event isolating stem (D3).

Everything else — scope discipline, the 8-misconception inventory, the ≥3 coverage with disciplined dual-tagging, the coded root→2→4 tree, the paced R3 beat, and the closed hook→reversal arc — **passes and is strong.** Once fixes 1–4 are in (and 5 resolved or waived), this is **ready for the human gate.**
