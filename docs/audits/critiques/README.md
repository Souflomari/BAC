# Wave-1 critic reports kept verbatim

Read-only critics' reports from the cloud session, copied out of its transcript on 2026-10-20 so
they survive it. Line numbers and absolute paths (`/home/user/BAC/...`) are as of the day each was
written; re-check them against the current files before acting.

| report | object | verdict | applied? |
|---|---|---|---|
| `pc-vagues-DE-fidelite.md` | PC exam-debt waves D and E (37 items, 14 passages, 6 figures) | no cadre breach; 11 findings | partly — see `docs/LOCAL-TRANSITION.md` §4.2 for what remains |
| `numeration-pedagogie.md` | spec `maths-arithmetique-numeration.md` | BUILD AFTER FIXES | yes — revised 2026-10-20, see the spec's revision log |
| `numeration-fidelite.md` | same spec | BUILD AFTER FIXES | yes — revised 2026-10-20 (B1 answered by `docs/cadre/sources/verification-numeration-2026-09-28.md`) |
| `espaces-vectoriels-pedagogie.md` | spec `maths-structures-espaces-vectoriels.md` | BUILD AFTER FIXES | yes — revised 2026-10-20, see the spec's revision log |
| `espaces-vectoriels-fidelite.md` | same spec (written 2026-10-20) | BUILD AFTER FIXES — no cadre breach; 4 blocking exam-shape fixes (criterion in three conditions, no weight claim, a summit, « toujours/jamais » demoted) | yes — revised 2026-10-20, see the spec's revision log |
| `cadre-GH-fidelite.md` | cadre debt G3–G7 + H1: prose ff15dbc2 and the 43 new items (written 2026-10-20) | no breach, 0 arithmetic errors; G5 SHIP, the rest FIX THEN SHIP | see `docs/LOCAL-TRANSITION.md` §4.3 |
| `cadre-GH-pedagogie.md` | same prose and items (written 2026-10-20) | G5, G6 SHIP; G3, G4, G7, H1 FIX THEN SHIP — 13 rhetorical « Prends position », no checkpoint; a criterion that is a shape shown without a figure | see `docs/LOCAL-TRANSITION.md` §4.3 |
| `espaces-vectoriels-arithmetique.md` | the revised spec's numbers (written 2026-10-20) | ERRORS FOUND — SA-41's key false; two collisions (SA-50, the variation's J); 112 other computations OK | yes — spec revision (b), 34/34 exact re-checks; two tag calls left to the owner (`DECISIONS-EN-ATTENTE.md` §38) |
| `numeration-build-pedagogie.md` | the BUILT chapter « Les systèmes de numération » (`arithmetique`, chapter 10) — prose, 3 checkpoints, 12 items, exercise, figure (written 2026-10-20) | FIX THEN SHIP — prior critique's 4 blockers all closed; 6 important findings (two ungated « Prends position », the existence/uniqueness claim unproved, multiplication without a ledger, …) | yes — de1fc6bd (prose, two new checkpoints) and 7255989e (order, AR-51 on b+1, AR-53, AR-54) |
| `numeration-build-fidelite.md` | same build (written 2026-10-20) | FIX THEN SHIP — no cadre breach, zero arithmetic errors; one false lemma in the exercise (also found by the pedagogy critic), one unevidenced form claim in rendered text, mixed-base operations missing | yes — same two commits; bases above 9 and the notation choice are owner questions (`DECISIONS-EN-ATTENTE.md` §38) |
