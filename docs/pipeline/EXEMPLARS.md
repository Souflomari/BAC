# Exemplars — the gold-standard samples (Day 5)

> The concrete executions that template v2's boxes point at. The Day-6
> portability test asks Sonnet 5 to produce work of this standard from the
> template alone; these are the comparison keys.

## 1. Attempt-first summit with full reasoning annotation — R9

**Where:** `content/pc/rlc-serie/exercises.yaml`, exercise `r9-variation`
(rendered at `/notions/pc/rlc-serie`, R9, through `AttemptFirstExercise`).

**Why it is the standard:** every question's `reasoning` opens with the
expert's DECISION layer before any algebra — the reflex ("$T_0$ ne dépend que
de $L$ et $C$ — si tu as pensé à utiliser $R$…"), the trap named as a model
(« le générateur impose sa fréquence » = régime forcé vs entretien), the
method note a grader rewards (regrouping $LC$ before the square root; relative
gap vs raw gap). Compare with the pre-v2 R9 (git history,
`lesson.md` @ `16ae5d4`): bare computations for Q1/Q3/Q4/Q5 — the difference
IS the template's "reasoning-annotation 100%" box.

**Contract demonstrated:** stems always visible; reasoning not in the DOM
until the student commits (dom-truth: "R8/R9 is attempt-first").

## 2. Prose rupture of an items-only misconception — R1 « Arrête-toi »

**Where:** `content/pc/rlc-serie/lesson.md`, R1, section
« Arrête-toi — qui stocke quoi, à quel instant ? » (misconception
`confusion-roles-C-L-stockage` — previously confronted only in items).

**Why it is the standard (the anatomy of a rupture):**
1. **The wrong model is voiced in the student's own words** (« deux réservoirs
   qui se rempliraient ensemble ») — not a strawman, the actual retention.
2. **It is tested, not corrected**: « Teste ce modèle avant de le croire… » —
   the model is run to its own consequence (total energy would be zero).
3. **It breaks on ITS contradiction** (« Elle serait passée où ? »), and only
   then is the correct structure stated — anchored back to something the
   student SAW (the animation's two bars never rising together).

A paragraph that merely states the correct phase opposition next to the wrong
idea does NOT check the "ruptured" box — the staging (voice → test → break) is
the requirement.

## 3. Hook commit — R0 + `cp-r0-predict`

**Where:** `lesson.md` R0 + `checkpoints.yaml` `cp-r0-predict`.

**Why it is the standard:** the predict-commit-confront commits through a real
choice (MCQ) whose wrong-answer feedback NAMES the model (« l'énergie se
dépense et disparaît », importé du RC) and hands the student forward into the
confrontation; the prose then reads correctly whether the student was right or
wrong (both paths addressed). The missing video is an enhancement slot in a
comment — the hook has no load-bearing dependency on pending assets (C5).
