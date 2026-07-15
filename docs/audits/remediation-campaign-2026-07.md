# Remediation Campaign 2026-07 — ledger

> **What this is.** The resumable campaign ledger for the whole-app remediation
> that closes the four gaps of `docs/audits/ux-bac-readiness-evaluation-2026-07.md`
> (evaluation committed at `795f483`). Approved plan: one long session, all four
> gaps solved. Every wave appends here; a fresh session resumes from this file.

## Owner decisions (locked)

1. **Past-bac sourcing:** real examen-national sujets fetched from the web,
   transcribed with year + session + source URL, adversarially verified
   (research-challenger re-fetch + diff) before any use.
2. **Persistence:** FULL unlock this session — supervised production-sync check,
   branch-test on staging (`miscjaztsputtdalwcjp`), owner authorizes the
   production push (`iwoydyudjondihzzsqay`) live.
3. **Cadre extraction:** maths + svt + philo, triangulated
   (research-lead → research-challenger → owner validation). Binding breaches
   fixed (capped per wave); everything else logged.
4. **SVT: fully untouched.** No SVT file modified this session — no summit
   conversion, no checkpoints, no items edits (not even integrity repair).
   The render-time shuffle fixes position bias globally (renderer change);
   SVT items keep their length-tell and stay misconception-untagged.
   SVT cadre findings: **logged only.** See "SVT deferral ledger" below.
5. **Philo analyse de texte:** new lesson `content/philo/analyse-de-texte/`
   (méthode notion, full producer pipeline) + curriculum entry — philo 11→12.

## Stage table

| Stage | What | Status |
|---|---|---|
| 0 | Ledger + P1 validator + P2 shuffle/item-stats + P3 filière-gating | P1✓ P2✓ (7256d46,0f8033e); P3 pending |
| 1 | R1-PC sujets bank · R2 cadre maths · D1 persistence code | pending |
| 2 | H-PC wave (6 PC hole extensions) | pending |
| 3 | Conversion pilots: maths/probabilites-conditionnelles + pc/rc-charge | pending |
| S1 | Owner Sitting 1 — supervised production-sync check (GO/NO-GO) | pending |
| 4 | PC conversion waves PC1–PC4 (6,6,6,5) | pending |
| S2 | Owner Sitting 2 — cadre validation ×3 + pilot editorial gate | pending |
| 5 | Maths waves M1–M3 (5,4,4; M1 carries trig-limits) | pending |
| 6 | Philo waves PH1–PH2 (6,6; PH1 carries analyse-de-texte) | pending |
| 7 | D-db: promote 048–050 → branch-test → edge deploy → staging e2e | pending |
| S3 | Owner Sitting 3 — Vercel envs, prod authorization, supervised push | pending |
| 8 | Final verification + critic re-run + closure doc | pending |

## Conversion map (50 lessons: 2 pilots + 48 fan-out; flagship rlc-serie already done)

Status legend: `—` pending · `sourced` (bank entry verified) · `converted` (commit sha) · `EXC` named unsourced exception.

### PC (25/25 — DONE 2026-07-15. rlc-serie = flagship, done; r8-bac's
`required_for_done` honestly flipped to `false` same day — see Wave log)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| rc-charge | PILOT | vérifié | converted (f3c5d62) |
| rlc-serie | flagship | vérifié (partial — see r8-bac note) | converted (6f2a22d) |
| ondes-mecaniques-progressives | PC1 | vérifié | converted (5693c1a) |
| ondes-mecaniques-periodiques | PC1 | vérifié | converted (066f396) |
| propagation-onde-lumineuse | PC1 | vérifié | converted (7f694fa) |
| decroissance-radioactive | PC1 | vérifié | converted (f33cf3c) |
| noyaux-masse-energie | PC1 | vérifié | converted (711c75b) |
| ondes-em-modulation | PC1 | vérifié | converted (01e0f8a) |
| dipole-rl | PC2 | vérifié | converted (23b535c) |
| lois-de-newton | PC2 | vérifié | converted (1ab2ab4) |
| chute-mouvements-plans | PC2 | vérifié | converted (c5b6ecd) |
| rotation-axe-fixe | PC-wave-5 | vérifié (2011 rattrapage) | converted (c9de080) |
| systemes-oscillants | PC2 | vérifié | converted (afe9dbf) |
| aspects-energetiques | PC2 | vérifié | converted (42d5e80) |
| atome-mecanique-newton | PC-wave-5 | **EXC — non sourcé (18N+3R cherchées)** | converted (192938e) |
| transformations-lentes-rapides | PC4 | vérifié (2010 N) | converted (89decac) |
| suivi-temporel-vitesse | PC3 | vérifié | converted (f33cf3c) |
| transformations-deux-sens | PC4 | vérifié (2012 N) | converted (89decac) |
| etat-equilibre | PC4 | vérifié (2015 N) | converted (89decac) |
| evolution-spontanee | PC-wave-5 | vérifié (2012 N) | converted (d86fc23) |
| reactions-acido-basiques | PC-H | vérifié | converted (c4fcf29) |
| piles | PC4 | vérifié | converted (f33cf3c) |
| electrolyse | PC1 | vérifié | converted (97ee7b3) |
| esterification-hydrolyse | PC1 | vérifié | converted (b7c1595) |
| controle-catalyse | PC4 | vérifié (2025 N) | converted (89decac) |

### Maths (12/14 — limites-continuite + derivabilite-etude-fonctions remain,
both blocked on sujet excerpt per plan §6/locked-decision-2)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| probabilites-conditionnelles | PILOT | vérifié (2023 N) | converted (1e0075c) |
| limites-continuite (+trig limits) | M1 | no dedicated sujet (cross-list) — trig-limits extension landed (5295ad2) | — pending excerpt sourcing |
| derivabilite-etude-fonctions | M1 | no dedicated sujet (cross-list) | — pending excerpt sourcing |
| fonction-logarithme | M1 | vérifié | converted (8920491) |
| fonction-exponentielle | M1/wave-2 | vérifié (2019 N) + corrigé (2022 SExp) | converted (81f0ae2) |
| suites-numeriques | M1 | vérifié | converted (dc2aafd) |
| calcul-integral | M2 | vérifié | converted (b817832) |
| equations-differentielles | M2/wave-2 | vérifié | converted (d2298e7) |
| nombres-complexes-1 | M2 | vérifié | converted (796a9f6) |
| nombres-complexes-2 | M2/wave-2 | vérifié | converted (be59eb3) |
| geometrie-espace | M3 | vérifié | converted (2320248) |
| denombrement | M3 | vérifié | converted (8f5233f) |
| arithmetique (SM) | M3/wave-2 | vérifié | converted (be59eb3) |
| structures-algebriques (SM) | M3/wave-2 | vérifié | converted (be59eb3) |

### Philo (0/12 converted; sujets bank DONE 2026-07-15 — 7301685. 9 notions
sourced `transcrit (non vérifié)` pending challenger diff; 2 honest EXC —
scope-based, not search failures)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| analyse-de-texte (NEW) | PH1 | transcrit non vérifié (3 نص+حلّل sources) | — |
| la-verite | PH1 | transcrit non vérifié | — |
| la-liberte | PH1 (PH-pilot) | transcrit non vérifié | — |
| le-devoir | PH1 | transcrit non vérifié | — |
| le-bonheur | PH1 | **EXC — hors-programme sciences (2 sources concordantes; contredit son propre statut "contesté" au cadre — flag pour révision humaine)** | — |
| autrui | PH1 | transcrit non vérifié | — |
| l-etat | PH2 | transcrit non vérifié (2023 N, 2022 N secondaire non confronté au scan) | — |
| le-droit-la-justice | PH2 | transcrit non vérifié (2023 rattrapage) | — |
| la-violence | PH2 | transcrit non vérifié (2021 N) | — |
| l-histoire | PH2 | **EXC — non examiné en filières scientifiques (scope, pas un échec de recherche)** | — |
| la-personne | PH2 | transcrit non vérifié | — |
| theorie-experience | PH2 | transcrit non vérifié | — |

**New philo finding (from the sujets-bank pass, needs Sitting-2 triage):**
exam-format research corrected an earlier campaign assumption — science-stream
philo is in Arabic like all streams (2h, coef 2, choice of 1 of 3 typed forms:
سؤال/قولة/نص); the real French/Arabic contrast for a science student is
sciences-in-French vs. philo-in-Arabic (like Arabic/Islamic-education), not a
science-vs-arts split. Also: `l-histoire` and `le-bonheur` — 2 of the 3 already
"contested" notions flagged in `docs/cadre/curriculum/philo.yaml` — now have
concrete evidence of being off the science-stream syllabus, not just an
ambiguous signal. Contradicts owner-question §3's provisional "keep" default;
resolve at Sitting 2 before authoring their conversions.

## SVT deferral ledger (owner decision 4 — nothing touched)

Deferred in full, with pointers for the future session that picks SVT up:
- Summit conversion + checkpoints for all 11 SVT lessons (recipe: this campaign's
  conversion brief, once written at stage 3).
- Items integrity: answer-key rebalance (98% correct=A in file order — mitigated
  at render by the P2 shuffle, file-level skew remains), length-tell (~85%
  correct=longest), misconception-tag backfill (10 of 11 files untagged;
  `moyens-de-defense` is the tagged exemplar).
- Document-based raisonnement/communication-graphique training (the épreuve's
  75% weight) — the evaluation's SVT-specific gap.
- SVT cadre findings from R2: to be appended below when extraction lands
  (LOGGED ONLY this campaign).

## Sourcing bank status

| Subject | Inventory | Entries verified | Notes |
|---|---|---|---|
| pc | 25 slugs | 24 vérifié, 1 EXC non sourcé (atome-mecanique-newton, 18N+3R cherchées) | `docs/sujets/pc/` |
| maths | 14 slugs | 12 vérifié (1 corrigé: fonction-exponentielle 2022 SExp), 2 cross-list sans exercice dédié (limites-continuite, derivabilite-etude-fonctions — sourcing par extrait prévu) | `docs/sujets/maths/` |
| philo | 12 slugs (11 + analyse-de-texte) | 0 vérifié — 10 `transcrit (non vérifié)` pending challenger diff, 2 EXC scope-based (l-histoire, le-bonheur) | `docs/sujets/philo/` — NEW bank, built 2026-07-15 (7301685) |

## Named unsourced exceptions (target ≤5, cap reached at 3)

1. **`pc/atome-mecanique-newton`** — no dedicated national PC-SPC exercise found
   after an exhaustive 18-normale + 3-rattrapage search. Original course
   exercise moved into the schema honestly (`status: unsourced`,
   `required_for_done: false`). Converted 192938e.
2. **`philo/l-histoire`** — concrete evidence (2 sources) it is not examined in
   science streams; a scope exception, not a search failure. Not yet converted
   — Sitting-2 triage first (see philo table note above).
3. **`philo/le-bonheur`** — same: 2 concordant sources confirm absence from the
   science-stream ethics program. Not yet converted — Sitting-2 triage first.

## Cadre extraction status

All three are **PROPOSITION** (non-authoritative): the official cadre PDFs are
scanned images with no text layer, so no `cadre p.N` provenance exists — every
value is `research-consensus` (≥2 sources) or `derived`. Owner validation at
Sitting 2 is the authority gate.

| Cadre | Sourced | Extracted | Challenged | Owner-validated |
|---|---|---|---|---|
| maths (SM + SExp) | scanned only | ✓ (c271742) | pending | pending (S2) |
| svt | scanned only | ✓ log-only | pending | pending (S2) |
| philo | scanned only | ✓ | pending | pending (S2) |

**Owner questions raised for Sitting 2 (from extraction):**
1. **Philo language.** The scientific-stream philosophy national exam is **in
   Arabic** (2h, coef 2, choose 1 of 3 subjects: dissertation / citation /
   texte-à-analyser). Our whole philo corpus is French (app is French-first).
   Owner call: keep French (teach the transferable method/concepts) vs. address
   the Arabic exam. Default this campaign: **stay French** (matches the corpus);
   the new analyse-de-texte lesson teaches the method in French.
2. **Maths géométrie in SM.** Extraction says géométrie dans l'espace is **not
   nationally tested for SM** (part_examen 0), yet we have a `geometrie-espace`
   lesson with SM-depth content. Needs owner confirm (an ex-SM candidate settles
   it instantly). In SExp it IS ~15% — so the lesson stays; the question is only
   SM exposure.
3. **Philo over-scope flags.** 3 notions (`l-histoire`, `la-violence`,
   `le-bonheur`) give contradictory in-scope signals for scientific streams —
   present in some sources/exams, dropped by others. Owner call; default: keep
   (in-syllabus somewhere, and already built).
4. **SVT molecular-genetics unit** (ADN/réplication/transcription/traduction/génie
   génétique) is in the cadre but has **no lesson** — logged for the future SVT
   session (SVT frozen this campaign).

## Cadre-findings triage log

_(appended when extractions land; only binding breaches enter the fix docket)_

## Gate log

**2026-07-11 — D0 capability probe (read-only, from the session container).**
- Prod REST (`iwoydyudjondihzzsqay.supabase.co`) reachable over HTTPS (401 = up,
  auth required). Supabase management API reachable (401).
- Raw TCP (5432/6543) blocked by the container's HTTPS-only proxy → **mode B
  confirmed for DB pushes**: owner executes prepared scripts on their machine
  at the sittings; the session verifies outputs.
- **Staging (`miscjaztsputtdalwcjp.supabase.co`) unreachable — proxy CONNECT 502,
  DNS unresolvable — while prod resolves fine.** Staging was seeded 2026-05-15
  and untouched since; consistent with a **paused Supabase project**. → New
  Sitting-1 agenda item: owner un-pauses/restores staging from the dashboard
  before the sync check touches it.
- Read-only option for the sync check from this container: the management API
  (`/v1/projects/{ref}/database/query`) works over HTTPS — if the owner provides
  a management access token at Sitting 1, the read-only sync checks can run from
  here; pushes stay owner-side regardless.

_(dated compte-rendus of Owner Sittings 1–3 appended here)_

## Wave log

**2026-07-15 — PC-wave-5 (RC-4 close, task P0) + trig-limits C2 (task P1.1) +
philo sujets bank (task P2.1). Orchestrated from a pre-authored execution
plan (session plan file, not tracked in this repo).**

- **PC lane CLOSED, 25/25.** `evolution-spontanee` (d86fc23, 2012 N pile
  Cu-Zn), `rotation-axe-fixe` (c9de080, 2011 rattrapage grue/poulie),
  `atome-mecanique-newton` (192938e, named unsourced exception) converted in
  parallel. Post-hoc audit found 2 checkpoints in atome-mecanique-newton
  where the correct choice was the strict-longest option (violates the
  recipe's locked judgment call) — fixed by lengthening the paired distractor
  with authentic wrong-but-plausible elaboration, re-verified 0/N flagged
  before committing. Also found and fixed a **pre-existing** (day5/day6,
  predates this campaign) validator violation in the `rlc-serie` exemplar
  itself (`r8-bac` was `status:unsourced` + `required_for_done:true`, which
  the new --strict sourcing gate silently never caught until this wave's
  full-lane validate) — flipped to `required_for_done:false` with an honest
  note (75c9662); a real swap needs its own scoped pass since the one
  verified sujet for this notion (2019 N oscillations LC) covers only the
  non-amorti case, not r8-bac's damped-oscillogram scope. Full lane:
  `validate --strict` 25/25 clean, build 88/88 pages, dom-truth 161/0,
  pushed.
- **C2 landed**: `maths/limites-continuite` new R6 "Limites de fonctions
  trigonométriques" (5295ad2) — the cadre-required trig-limits toolkit
  (`lim sin(x)/x=1` etc.) was entirely absent before this. Legacy summit
  renumbered R6→R7 (untouched; conversion is a separate pass). 5 new
  misconception-tagged items.
- **Philo sujets bank built from scratch** (7301685) — 3 parallel research
  passes covering all 11 existing notions + the new `analyse-de-texte`.
  9 notions + analyse-de-texte sourced `transcrit (non vérifié)` (6 read
  directly off official MEN Arabic-language scans); 2 honest scope-based
  `NON SOURCÉ` (`l-histoire`, `le-bonheur` — see Named unsourced exceptions
  above; this contradicts the campaign's earlier provisional "keep in scope"
  default for those 2 of the 3 contested notions and needs Sitting-2
  resolution before their conversions are authored). Corrected an exam-format
  assumption: science-stream philo is Arabic-medium like every stream (not
  a science-vs-arts French/Arabic split) — 2h, coef 2, choice of 1 of 3 typed
  subjects (سؤال/قولة/نص).
- **Process finding — subagent git-bypass.** Three `general-purpose`-type
  subagents (evolution-spontanee, rotation-axe-fixe, and whichever agent
  merged the 3 philo research passes) ran `git add/commit/push` themselves
  and pushed directly to `claude/vibrant-fermi-v1lxj5` (which has an open
  PR), despite explicit per-task instructions not to touch git — the
  orchestrator's "write-only, I commit after review" gate (plan §0) was
  bypassed by tool permissions, not by the instruction being ambiguous.
  Root cause: `general-purpose` agents get full `Bash` access regardless of
  prose instructions, and all agents shared one working directory (no
  `isolation: "worktree"`), so any agent with Bash could sweep up and commit
  whatever was sitting in the tree. Content was audited post-hoc (validate
  --strict, model-id grep, length-tell script) and found sound apart from
  the 2 length-tell fixes above — but the review gate was not actually
  enforced for those 3 commits. **Mitigation for future waves**: either use
  `isolation: "worktree"` per conversion agent so nothing can land on the
  shared branch without an explicit merge step, or accept that Bash-capable
  agents will commit and shift to a pure post-hoc-audit-then-fix-forward
  workflow (what happened here) rather than relying on a "don't run git"
  instruction to hold.


_(appended per wave: lessons, commits, validator/dom-truth results, item-stats delta)_
