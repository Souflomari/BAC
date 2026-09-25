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
| S1 | Owner Sitting 1 — supervised production-sync check (GO/NO-GO) | GO (2026-07-23) |
| 4 | PC conversion waves PC1–PC4 (6,6,6,5) | pending |
| S2 | Owner Sitting 2 — cadre validation ×3 + pilot editorial gate | pending |
| 5 | Maths waves M1–M3 (5,4,4; M1 carries trig-limits) | pending |
| 6 | Philo waves PH1–PH2 (6,6; PH1 carries analyse-de-texte) | DONE (10/12; l-histoire+le-bonheur EXC pending S2) |
| 7 | D-db: promote 048–050 → branch-test → edge deploy → staging e2e | DONE (2026-07-23, Sitting 2) |
| S3 | Owner Sitting 3 — prod migrations + edge fn DONE (2026-07-23); Vercel env flip = owner dashboard step |
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

### Maths (14/14 — DONE 2026-07-15)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| probabilites-conditionnelles | PILOT | vérifié (2023 N) | converted (1e0075c) |
| limites-continuite (+trig limits) | M1/wave-3 | extrait vérifié (2022 N SExp, fonction-exponentielle.md) — trig-limits extension (5295ad2) | converted (ff861f8) |
| derivabilite-etude-fonctions | M1/wave-3 | extrait vérifié (2019 N SM, fonction-exponentielle.md) | converted (ff861f8) |
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

### Philo (10/12 converted — PH2 CLOSED 2026-07-16. 9 notions
sourced `transcrit (non vérifié)` pending challenger diff; 2 honest EXC —
scope-based, not search failures)
| Lesson | Wave | Sourced | Converted |
|---|---|---|---|
| analyse-de-texte (NEW) | PH1 | vérifié (3 نص+حلّل sources) | converted, born-converted (9a89083) |
| la-verite | PH1 | vérifié | converted (04d55ee) |
| la-liberte | PH-pilot | vérifié | converted (f3ddf79) |
| le-devoir | PH2 | vérifié (2023 R reproduction typée) | converted (8ef595d) |
| le-bonheur | — | **EXC — hors-programme sciences (2 sources concordantes; cadre-challenger corrobore) — see Named unsourced exceptions** | — |
| autrui | PH1 | vérifié | converted (d4e4e77) |
| l-etat | PH2 | vérifié (2023 N reproduction typée, 2022 N source secondaire) | converted (325d0e4) |
| le-droit-la-justice | PH2 | vérifié (2023 R reproduction typée) | converted (42dea2a) |
| la-violence | PH2 | vérifié (2021 N reproduction typée) — cadre-challenger confirms in-scope | converted (fbb70e4) |
| l-histoire | — | **EXC — non examiné en filières scientifiques (scope, pas un échec de recherche) — see Named unsourced exceptions** | — |
| la-personne | PH1 | vérifié | converted (20e86d4) |
| theorie-experience | PH1 | vérifié | converted (e7414fe) |

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
| maths | 14 slugs | 12 vérifié (1 corrigé: fonction-exponentielle 2022 SExp) + 2 extraits vérifiés (limites-continuite, derivabilite-etude-fonctions — sourcés par extrait de fonction-exponentielle.md, converted ff861f8) | `docs/sujets/maths/` |
| philo | 12 slugs (11 + analyse-de-texte) | 16 sources vérifié via challenger reproduction-typée pass (04016d3); 10/12 dirs converted, 2 EXC scope-based (l-histoire, le-bonheur) | `docs/sujets/philo/` — NEW bank, built 2026-07-15 (7301685) |

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

**2026-07-15 — philo cadre challenge (P2.3).** `research-challenger` attacked
the `derived` layer of `docs/cadre/curriculum/philo.yaml` and specifically
re-examined the 3 contested notions, cross-checking against the newly-built
(and now challenger-verified) sujets bank as independent evidence:

- **`la_violence` — SUPPORTED, keep in scope.** Two independent scan-level
  national exam hits (2021 N سؤال, 2023 N قولة) confirm it via the État-
  legitimacy axis. One sub-finding not binding: the `formes_violence`
  sub-chapitre (typology physique/symbolique/institutionnelle) has zero
  corroborating exam evidence — plausible standard content, just unevidenced;
  ledgered, not urgent.
- **`l_histoire` — ASSERTED (over-reach), reclassify OUT of exam scope.**
  A multi-year exam census (2008–2024, science streams) found zero
  occurrences; explicitly confirmed as a literary-stream notion by an
  independent source. The cadre's original "flagged/non tranché" status
  conflated "named in the module's notion list" with "drawn on for a
  science-stream exam question" — that conflation doesn't hold.
- **`le_bonheur` — ASSERTED (over-reach), reclassify OUT of exam scope.**
  Same pattern, same evidentiary strength: two science-stream-specific
  platforms list the ethics module as devoir+liberté only; zero science-
  stream exam hits found; confirmed literary/humanities notion elsewhere.
- **No binding breach found** — current `content/philo/l-histoire` and
  `le-bonheur` lessons don't actively misrepresent exam scope (no "this is
  on your bac" claims found). **One ledger item, not urgent**: both lessons
  are structured as full-parity content indistinguishable from the 9
  confirmed-examinable notions, with no student-facing "not tested for your
  filière" signal — worth a UI treatment if/when the owner confirms the
  reclassification, so any future scheduling/recommendation logic doesn't
  misallocate study time toward untested notions.
- Rest of the derived layer (limites, other exclusions) checked out as
  well-supported against ~12 real sourced exam texts now in the bank; no
  other over-reach found. Grille /20 sub-point-splits remain unverifiable
  without the official PDF — acknowledged gap, low risk (point-allocation
  nuance, not scope).

**Disposition:** per the campaign's own triage rule (only binding breaches
enter a capped fix docket; the rest is ledgered), this is NOT executed as an
autonomous edit to `docs/cadre/curriculum/philo.yaml` — that file's authority
gate is owner validation at Sitting 2. Superseding the earlier "keep in
scope, default" language from the R2 owner-questions section above: the
evidence is now strong and asymmetric (unlike when that default was set),
so **`l-histoire` and `le-bonheur` are treated as named exceptions
(unconverted, EXC) pending the owner's Sitting-2 call**, while `la-violence`
proceeds as a normal in-scope conversion. If the owner confirms the
reclassification, `docs/cadre/curriculum/philo.yaml`'s exclusions entry #3
should be split (currently treats all 3 uniformly) and the two lessons
either de-scoped from the curriculum or explicitly marked supplementary.

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

**2026-07-23 — OWNER SITTING 1 — production-sync check: GO.** Owner
present live; both Supabase projects were found paused (long dormancy) and
resumed by the owner; both reported ACTIVE_HEALTHY. Owner provided a
temporary management access token (revocation after the sitting is the
owner's close-out step); every check of
`docs/pipeline/production-sync-session.md` A–D ran read-only from the
session via the management API, results narrated live:

| Check | Observed |
|---|---|
| A. Prod migrations ↔ repo | **exact bijection** — 45 = 45 (001–047, gaps 019/035 both sides), zero unknown remote (no out-of-band writes ever), zero unapplied local |
| B.1 RLS (9 tables, prod) | all `relrowsecurity = t` |
| B.2 user_misconception_states policies | exactly 3 (SELECT/INSERT/UPDATE, authenticated, self-only) |
| B.3 record_misconception_exhibited grants | EXECUTE: service_role + postgres(owner) only |
| B.4 skill_prerequisites | **201** |
| B.5 Prod auth trigger | `on_auth_user_created` present |
| B.6 Prod orphans | 0 |
| C.2 Staging migrations | **identical to prod** (45 versions — better than the partial-dump expectation) |
| C.3 Staging auth trigger | ABSENT — exactly the documented ADR 0013 gap draft-050 closes |
| C.4 Staging orphans | 0 — no backfill prerequisite for 050's verify |
| C.5 handle_new_user | byte-identical definitions on both projects (same sha256) |
| C.6 Staging RLS | all `t` |

**Verdict: owner said GO** (2026-07-23). Zero deviations to explain — the
cleanest possible outcome. **The CLAUDE.md "production sync UNVERIFIED"
flag is hereby lifted by this compte-rendu.** Promotion path: drafts
048–050 → `backend/supabase/migrations/` → staging application → branch-
test → e2e evidence → prod only on further explicit authorization
(Sitting 3 of `docs/pipeline/engine-cutover-runbook.md`).

**2026-07-23 — OWNER SITTING 2 — staging: migrate + deploy + e2e: ALL
GREEN (after one real catch).** Same session as Sitting 1, owner present,
same temporary management token (owner revokes at close). Everything ran
against STAGING only; prod untouched.

1. **Promotion**: drafts 048/049/050 copied byte-identical (diff-proven)
   to `backend/supabase/migrations/` (commit 1a0bce5).
2. **Application**: applied to staging via the management API one at a
   time; every migration's own verify block passed (an exception would
   have failed the response). Independent post-checks confirmed: RLS
   active on all 3 new tables, write-RPCs service_role-only, 043 twin
   intact, `on_auth_user_created` NOW PRESENT on staging (the ADR 0013
   gap is closed), history registered → staging reads …047,048,049,050.
3. **Branch-test equivalent** (the .ps1's assertion suite replicated
   from the session over HTTPS, incl. its REST/anon checks): per-stream
   attribution EXACT (SMA=98 SMB=31 PC=21 SVT=9 hum=42, total 201,
   cross=0); anon INSERT denied (401) on subjects,
   user_misconception_states, AND the 3 new tables (first probe used a
   malformed body and returned 400 — re-proven with valid shapes, true
   401s); anon SELECT returns [] on all user-state tables; JSONB
   defaults round-trip; all 4 misconception indexes present. ALL PASS.
4. **Edge function deployed** to staging (direct management-API deploy;
   the CLI's finalize call fails through this container's proxy —
   TransportError, twice — the curl multipart path works).
5. **The e2e caught a real bug** — the reason the evidence loop exists:
   v1's clearing check silently no-oped. Root cause (verified by
   downloading the deployed eszip): a standalone .json static file does
   NOT ship in the bundle (module graph only), so the function's
   graceful-degradation fallback returned an empty targets map. Fix:
   the map is now a GENERATED, IMPORTED .ts module
   (build-learner-inputs.mjs artifact 3) — always in the module graph; a
   missing generation now fails the deploy loudly instead of no-opping
   the clearing silently. Redeployed as version 2.
6. **Full e2e transcript, v2 — ALL GREEN**: admin-created throwaway
   student → profile row via the 050 trigger ✓ → chapter visit folds ✓ →
   2 wrong answers on a tagged distractor → misconception ACTIVE
   (exhibited_count=2) ✓ → 2 DISTINCT correct targeting items →
   **cleared_at set (Cleared)** ✓ → journal 4 item events +
   exercise_reveal recorded ✓ → student-side RLS self-read sees own rows
   ✓ → user deleted, zero residue across all 4 tables ✓.

**Findings for Sitting 3 (owner dashboard items):** (a) staging auth has
email confirmations ON with the built-in mailer (rate-limit 2/h;
example.com blocked) — before real students sign up, the owner must
either disable confirmations or configure real SMTP, on BOTH projects;
(b) the model-id commit gate hit a new false-positive class: the English
word "diffable" contains "fable" — eyeballed and cleared, precedent
noted alongside "Jean-Claude".

**State after Sitting 2**: staging fully migrated + function v2 ACTIVE +
e2e evidence green. **Prod remains untouched** — Sitting 3 (prod
migrations, prod edge deploy, Vercel envs, smoke) requires its own
explicit owner authorization per RULES §3.

**2026-07-23 — OWNER SITTING 3 — PRODUCTION: migrations + edge fn
deployed, ALL GREEN.** Explicit owner authorization given via a dedicated
gated prompt ("Authorize — do it now") — separate from the Sitting-1 GO,
per RULES §3. Same session, owner present throughout.

1. **Migrations 048/049/050 applied to prod** (`iwoydyudjondihzzsqay`)
   one at a time; every verify block passed. History registered → prod
   reads …047,048,049,050 (bijection with the repo maintained).
2. **Read-only post-checks, all green**: RLS active on the 3 new tables;
   zero forbidden EXECUTE grants across all 4 new RPCs;
   `on_auth_user_created` present; 0 orphans; new tables empty
   (post-state cardinality).
3. **Edge fn v2 deployed to prod** (the fixed imported-module build, sha
   5f0ccf1e…): OPTIONS 200, unauthenticated POST 401.
4. **REST RLS proof from outside** (prod anon key): INSERT denied with
   true 401s on all 3 new tables (valid-shaped bodies; the 400-artifact
   class from Sitting 2 re-checked here too), SELECT returns [].

**State: RC-6 / P5 is DONE.** The engine's entire gated chain is live on
production infrastructure. The DEPLOYED APP remains dark (off-mode) —
flipping it live is the owner's Vercel env step, deliberately separate:
(1) FIRST configure prod auth (email confirmations are ON with the
built-in 2/h-rate-limited mailer — disable confirmations or configure
real SMTP in the Supabase dashboard, and verify signups are enabled);
(2) THEN set `NEXT_PUBLIC_AUTH_MODE=live` +
`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
and redeploy. Rollback at any time = remove the AUTH_MODE var (app
returns to today's dark build; no migration revert — append-only).
Owner close-out: the temporary management token is revoked
(Account → Access Tokens).

**2026-07-23 — GO-LIVE ADDENDUM (same sitting): the app is LIVE.** Owner
kept both dashboards in the loop and provided a scoped Vercel token; all
actions narrated live:

1. Vercel env vars set via API on production+preview:
   `NEXT_PUBLIC_AUTH_MODE=live` + prod Supabase URL + prod anon (public)
   key. Confirmed: the project's production branch IS the working branch,
   so bac-pink.vercel.app is the production deployment.
2. Rebuild triggered (empty marker commit); deployment READY.
3. Deployed-truth check: /connexion now renders the real email+password
   form; the off-mode "pas encore ouverte" text is gone.
4. **Deployed production smoke** (throwaway student, admin-created since
   prod signups send no confirmation email — owner verified confirmations
   already OFF on prod): sign-in via the form's exact auth call ✓ →
   visit + answer recorded through the PROD edge function ✓ → RLS
   self-read with the student's own token (useStudentState's exact
   queries) returns the rows ✓ → server-side truth: fold =
   chapters_visited [0], 1 attempted, 1 correct ✓ → throwaway deleted,
   zero residue ✓.
   Caveat (environment, not product): this container's proxy resets
   browser-originated TLS to vercel.app, so the pixel-level dashboard
   render was not machine-verified from here — the data path it consumes
   was verified exactly; the owner's own first sign-in is the human
   editorial check (RULES §2).
5. Rollback stays one step: remove NEXT_PUBLIC_AUTH_MODE in Vercel +
   redeploy.

**The tutor engine is live end-to-end on production: accounts, event
journal, misconception diagnosis, clearing, and the dashboard read
path.** Next build lane: tutor-first-plan.md Lane G (guided arc +
edge engagement), workhorse-model execution.


## Wave log

**2026-07-16 — PH2: philo notion conversions, 9/9 convertible notions
done (l-etat 325d0e4, la-violence fbb70e4, le-devoir 8ef595d,
le-droit-la-justice 42dea2a). Philo lane 10/12 dirs converted (only
`l-histoire` + `le-bonheur` remain, EXC pending owner Sitting-2).**
r-bac sourcing: `l-etat` had 2 verified texts (2023 N قولة routed to
r-bac for richer provenance + 3-rung cross, 2022 N سؤال routed to
r-variation since it maps onto an already-taught training dissertation)
— the recipe's "route the richer text to r-bac, the already-taught one
to r-variation" rule applied for the first time this campaign;
`la-violence`, `le-devoir`, `le-droit-la-justice` each had exactly 1
verified text, so r-variation is a fabricated `not-applicable` twin per
the default rule. `le-devoir`'s r-bac (the Kant "commerçant honnête"
text) is the same source text already used in `analyse-de-texte`;
independently re-transcribed with a distinct notion-appropriate framing
(le-devoir's own R1-R3 ramp) rather than reusing that lesson's
méthode-grid treatment — confirmed non-duplicative by direct comparison.

**Process notes, both logged transparently:**
- **First 4 PH2 dispatches (l-etat, la-violence, le-devoir,
  le-droit-la-justice) all died with a session-limit API error before
  writing anything** (`git status` confirmed zero partial writes,
  clean redispatch). A stale "plan mode active" system-reminder also
  spuriously re-fired on the orchestrator mid-session (the recurring
  harness flakiness noted in prior sessions) — cleared by retrying
  `ExitPlanMode`.
- **le-droit-la-justice's legacy item bank had the worst length-tell
  residual found this campaign: 15/32 items (47%) correct-answer-
  strict-longest**, discovered on independent re-check after the
  conversion agent self-reported (incorrectly, per the now-established
  pattern) 0 violations. A dedicated fixup subagent was dispatched
  scoped only to this file; it reduced the count from 15 to 5 over a
  long, self-verifying run (observed live via file-hash polling to
  confirm it was still actively writing, not stalled) before its own
  turn ended with a non-answer ("waiting for stabilization") — its
  task-notification reported `completed` but the work was genuinely
  unfinished. The orchestrator finished the remaining violations by
  hand (5 → 0), independently re-verified, then committed. This is the
  clearest instance yet of the campaign's standing rule that no
  agent's self-reported "0 violations" is trusted without an
  independent re-check — reinforced here at the level of a dedicated
  fixup agent, not just the original conversion agents.
- **Post-wave `item-stats.mjs` finding — philo length-tell overshot the
  25-35% target band in the corrective direction: 8%** (down from the
  97% historical baseline, previously 30% after PH1). Every violation
  found this wave was fixed by ensuring the correct answer was never
  the strict-longest choice, with no offsetting mechanism to keep some
  items' correct answer legitimately longest — this produced a mild
  inverse tell (a "never pick the longest" heuristic would now
  outperform chance on philo items, though far more weakly than the
  original "always pick the longest" tell it replaced). Not fixed this
  wave (would require deliberately re-visiting a sample of already-
  clean items, which is lower-value than closing the conversion count);
  ledgered here as a finding for a future light calibration pass. PC
  (53%) and maths (36%) also sit above the 25-35% band from their
  earlier closes — same finding, out of this wave's scope, flagged for
  the same future pass.

Wave-close gate: `validate --strict` 12/12 philo dirs clean, `npm run
build` 89 pages, `dom-truth.mjs` 161/161 (build stamp == HEAD),
`item-stats.mjs` run (see finding above). Model-id grep clean on every
commit (one expected false positive eyeballed and cleared: "Jean-Claude
Passeron", a real sociologist's name, in a la-violence lesson.md diff
hunk).

**2026-07-15 (cont'd) — PH-pilot + PH1: philo notion conversions, 5/9
convertible notions done (la-liberte f3ddf79, autrui d4e4e77, la-verite
04d55ee, theorie-experience e7414fe, la-personne 20e86d4).** Every single
one of these 5 lessons' pre-existing item banks started with the correct
answer as the strict-longest option in the overwhelming majority of MCQs
(15/15, 18/24, 23/30, 18/24, 18/24 respectively across the 5 legacy
banks) — a live, repeated confirmation of the campaign's cited ~97%
historical tell, not a one-off. Fixed on every lesson by enriching
distractors with genuine philosophical substance (never trimming correct
answers), independently re-verified programmatically after commit
(several rounds of fix-and-recheck needed each time — hand-estimated
lengths were consistently off by tens of characters). Post-wave
`item-stats.mjs`: philo length-tell now **30%** across all 343 philo
items (partially-converted subject average — target range 25-35%), down
from the ~97% baseline; rendered position uniform (27/26/24/23%). Full
philo lane: `validate --strict` 12/12 dirs clean, build 89 pages,
dom-truth 161/0. Named exceptions confirmed: `l-histoire` and
`le-bonheur` stay unconverted pending owner Sitting-2 scope confirmation.
Remaining for PH2: `l-etat`, `la-violence`, `le-devoir`,
`le-droit-la-justice` (all sourced+vérifié, ready to convert).

**2026-07-15 (cont'd) — P3: philo/analyse-de-texte, the 12th philo lesson
(9a89083).** Born converted (no legacy summit ever existed). pedagogy-
architect spec first (`docs/pipeline/PHILO-ANALYSE-DE-TEXTE-SPEC.md`,
32535ef) — R0-R7 ramp on the official 4-moment method, demonstrated on the
verified Bakounine text, summit on Kant (r-bac) + vérité (r-variation, a
second real text rather than a fabricated twin — documented deviation from
the recipe's `not-applicable` default). 15-model misconception inventory,
49 items, 2 coded structural diagrams. New curriculum.ts unit "Méthode de
l'épreuve". Post-hoc audit found the length-tell bug on 22/49 items +
4/6 checkpoints (fixed by the authoring agent itself before reporting,
independently re-verified at 0/55 flagged). validate --strict clean,
build 89 pages, dom-truth 161/0 (62 tokens == 62 notions on disk).
**Philo dirs now 12/12** — conversion (exercises.yaml/checkpoints.yaml
present) still pending for the other 11 (Phase P4), and `l-histoire` +
`le-bonheur` remain named exceptions pending owner Sitting-2 confirmation.

**2026-07-15 (cont'd) — maths-wave-3 (RC-4 close, task P1): maths 14/14.**
`limites-continuite` + `derivabilite-etude-fonctions` (ff861f8), both
sourced by EXCERPT from the already-verified `fonction-exponentielle.md`
problème (2022 N SExp / 2019 N SM respectively) — no new web sourcing
needed, new `docs/sujets/maths/{limites-continuite,derivabilite-etude-fonctions}.md`
document the excerpt provenance. Post-hoc audit found the length-tell bug
(correct choice = strict-longest option) on several checkpoints in BOTH
lessons (1/6 and initially 4/5) — fixed by lengthening the paired distractor
or trimming the correct answer, re-verified 0 flagged before commit.
Full maths lane: `validate --strict` 14/14 clean, build 88 pages, dom-truth
161/0, pushed. Also completed this session: P2 (philo research lane) in
full — sujets bank (7301685), challenger verify (04016d3, 16 entries
adjudicated, 2 corrections), cadre challenge (7fa5ecf, la-violence
confirmed in-scope, l-histoire + le-bonheur flagged as likely out-of-scope
pending owner Sitting-2 confirmation).

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
