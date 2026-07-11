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
| 0 | Ledger + P1 validator + P2 shuffle/item-stats + P3 filière-gating | IN PROGRESS |
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

### PC (25; rlc-serie = flagship, done)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| rc-charge | PILOT | — | — |
| ondes-mecaniques-progressives | PC1 | — | — |
| ondes-mecaniques-periodiques | PC1 | — | — |
| propagation-onde-lumineuse | PC1 | — | — |
| decroissance-radioactive | PC1 | — | — |
| noyaux-masse-energie | PC1 | — | — |
| ondes-em-modulation | PC1 | — | — |
| dipole-rl | PC2 | — | — |
| lois-de-newton | PC2 | — | — |
| chute-mouvements-plans | PC2 | — | — |
| rotation-axe-fixe | PC2 | — | — |
| systemes-oscillants | PC2 | — | — |
| aspects-energetiques | PC2 | — | — |
| atome-mecanique-newton | PC3 | — | — |
| transformations-lentes-rapides | PC3 | — | — |
| suivi-temporel-vitesse | PC3 | — | — |
| transformations-deux-sens | PC3 | — | — |
| etat-equilibre | PC3 | — | — |
| evolution-spontanee | PC3 | — | — |
| reactions-acido-basiques | PC4 | — | — |
| piles | PC4 | — | — |
| electrolyse | PC4 | — | — |
| esterification-hydrolyse | PC4 | — | — |
| controle-catalyse | PC4 | — | — |

### Maths (14)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| probabilites-conditionnelles | PILOT | — | — |
| limites-continuite (+trig limits) | M1 | — | — |
| derivabilite-etude-fonctions | M1 | — | — |
| fonction-logarithme | M1 | — | — |
| fonction-exponentielle | M1 | — | — |
| suites-numeriques | M1 | — | — |
| calcul-integral | M2 | — | — |
| equations-differentielles | M2 | — | — |
| nombres-complexes-1 | M2 | — | — |
| nombres-complexes-2 | M2 | — | — |
| geometrie-espace | M3 | — | — |
| denombrement | M3 | — | — |
| arithmetique (SM) | M3 | — | — |
| structures-algebriques (SM) | M3 | — | — |

### Philo (12, incl. new analyse-de-texte)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| analyse-de-texte (NEW) | PH1 | n/a (méthode) | — |
| la-verite | PH1 | — | — |
| la-liberte | PH1 | — | — |
| le-devoir | PH1 | — | — |
| le-bonheur | PH1 | — | — |
| autrui | PH1 | — | — |
| l-etat | PH2 | — | — |
| le-droit-la-justice | PH2 | — | — |
| la-violence | PH2 | — | — |
| l-histoire | PH2 | — | — |
| la-personne | PH2 | — | — |
| theorie-experience | PH2 | — | — |

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
| pc | — | 0 | |
| maths | — | 0 | |
| philo | — | 0 | |

## Cadre extraction status

| Cadre | Sourced PDF | Extracted | Challenged | Owner-validated |
|---|---|---|---|---|
| maths | — | — | — | — |
| svt | — | — | — | — |
| philo | — | — | — | — |

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

_(appended per wave: lessons, commits, validator/dom-truth results, item-stats delta)_
