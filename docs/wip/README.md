# Work in progress parked here

Things that were started and are NOT in the product. Nothing in this folder is read by the build or by
any gate. See `docs/LOCAL-TRANSITION.md` §4 for the context of each.

| file | what | to resume |
|---|---|---|
| `g3-items-calcul-integral.patch` | ten drafted items CI-59…CI-68 for the new calcul-intégral sections (u'·uⁿ, u'·cos u, condition, F = ∫ₐˣ f, Riemann). Unreviewed; its author stopped before updating the ramp table | `git apply docs/wip/g3-items-calcul-integral.patch`; `validate-content` then names two table counts to fix (R1, R4); review each item against the house rules; `npm run build-learner-inputs`; commit; delete the patch |
| `scene-champ-pentes-premier-lancement.txt` | the first and only run of the slope-field gate (red, 42/256) | evidence for the bench diagnosis in `LOCAL-TRANSITION.md` §4.1; delete once the gate is green |
