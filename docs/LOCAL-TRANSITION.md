# Moving from the cloud session to local files

*Written 2026-10-20, as the last act of the cloud session that ran from July to October 2026.*
Everything that session had is now in this repository: no work is left in a scratch folder or a side
clone. This page tells you how to pick it up on your own machine, and where every open thread stands.

---

## 1. Five steps to be running

```bash
# 1. Clone and stand on the working branch (all the work lives here, not on main — see §3)
git clone https://github.com/Souflomari/BAC.git && cd BAC
git checkout claude/vibrant-fermi-v1lxj5

# 2. Node 22 (the version CI uses; .nvmrc says so — `nvm use` picks it up)
nvm use

# 3. Dependencies + the Chromium the browser gates drive (the exact command CI runs)
cd web && npm ci && npx playwright@1.61.1 install --with-deps chromium

# 4. Build and look at it
npm run build && npm start            # http://localhost:3000 — no secrets needed: auth is off by default

# 5. The pre-push check, on a clean copy of the commit (from the repo root)
cd .. && scripts/verif-commit.sh      # must end « exit 0 »
```

**Which machine.** Linux, macOS, or **WSL2 on Windows** (strongly recommended on Windows: it is the
same Ubuntu that CI and the cloud container ran). Native Windows works for editing and for the plain
Node checks, but **not for the browser gates**: they start `next start` detached and stop it by process
group, which only POSIX does. The two `.ps1` scripts (`scripts/branch-test.ps1`,
`scripts/edge-function-smoke-test.ps1`) are the exception — they are PowerShell by design.

**Line endings** are pinned to LF by `.gitattributes`. Several gates compare files byte for byte; a
CRLF checkout would turn them red for nothing.

---

## 2. The daily loop

| what | command (from `web/` unless said) |
|---|---|
| dev server | `npm run dev` |
| validate content | `node scripts/validate-content.mjs content/<subject>/<notion>` — repo-relative path, run from `web/` |
| all non-browser gates, as CI runs them | `node scripts/batterie-locale.mjs` (in the working tree) |
| **before every push** | `scripts/verif-commit.sh [commit]` from the repo root — same battery, on a clean worktree of the commit, so uncommitted files cannot make it green |
| a browser gate | `npm run build`, then `npm run pw -- <gate> --porte` (e.g. `npm run pw -- scene-quotient --porte`) |
| a gate's red test | `npm run pw -- <gate> --essai-rouge` — every family must turn red |
| all registered red tests | `node scripts/essais-rouges.mjs` |
| regenerate learner-model inputs after editing items | `npm run build-learner-inputs` |
| chapter map after adding/removing a `## ` heading | `node scripts/carte-chapitres.mjs`, re-read the listed renvois, then `--sceller` |

`npm run pw` is new: it gives a browser gate the Chromium of *this* machine (the scripts were written
against the container path `/opt/pw-browsers/chromium`). It sets `PW_CHROMIUM_PATH` exactly as CI does.

**Never run two browser gates, or a gate and a build, at the same time** — the timing-sensitive
families flake under load, and a flaky gate teaches you to ignore red (ADR 0036).

**Product-sabotage campaigns** (the strongest test a scene gate gets) now live in
`scripts/campagnes/`: `campagne.sh` plus one sabotage set per gate. Run them in a *separate* worktree,
never the working tree:

```bash
git worktree add --detach ../BAC-sab HEAD && ln -s "$PWD/web/node_modules" ../BAC-sab/web/node_modules
ARBRE=../BAC-sab PORTE=scene-quotient SABOTAGES=scripts/campagnes/sabotages-quotient.py \
  PORT_QUOTIENT=3875 bash scripts/campagnes/campagne.sh      # ~4 min per sabotage
```

---

## 3. Git: where things are, and what not to do

- **Everything is on `claude/vibrant-fermi-v1lxj5`** — 1516 commits ahead of `main`, zero behind (2026-10-20, `git rev-list --count origin/main..HEAD`).
  Draft PR **#2** (`claude/vibrant-fermi-v1lxj5 → main`) carries it. **CI run 822 is green on
  e265bcb7 — all 5 jobs;** run 823 was green on 4 of 5, its print gate catching one table (fixed);
  **CI run 824 is green on the handoff head 34345bf5 — all 5 jobs.** CI runs on every push except commits marked `[skip ci]` (used for
  intermediate commits, because a normal push cancels a CI run in flight); check the latest run on
  the PR before building on a head.
- **`main` is production.** Merging PR #2 is a production deploy *and* brings four database
  migrations (`backend/supabase/migrations/048…051`) that production has never seen. The CLAUDE.md
  non-negotiables apply: a passing `scripts/branch-test.ps1` against staging, a supervised check that
  production's migration state matches local history, and your explicit decision. Nothing in this
  handoff merges anything.
- Old remote branches (`claude/wizardly-hypatia-2fmoui`, `reestablish-state`, `slice-2-prep*`) predate
  this work and were left untouched — yours to keep or delete.
- Recommended local habit: keep working on this branch (or branch off it), push, let CI run; open a
  fresh PR only when you decide what `main` should become.

---

## 4. Open threads — state, and the next concrete step

Ordered by what most affects a student. "Report" means the full critic report in
`docs/audits/critiques/`.

### 4.1 Slope-field scene « Ce que l'équation dit en chaque point » (maths/équations différentielles)
- **State: verified and armed.** Its gate `scripts/scene-champ-pentes.mjs` is green (256 measures, 29
  families) and red 29/29 under `--essai-rouge`; it runs in CI (job `telephone`), its unit test
  `test-champ-pentes` (11/11) in the unit-test step. What the first red run taught (mostly the bench,
  once the product): `docs/audits/INSTRUMENTS.md`, entry `scene-champ-pentes.mjs`.
- **Product-sabotage campaign — done (2026-10-20):** 44 entries in four parts (to stay under the
  2-hour cap), 43 sabotages caught and 1 counter-test held; the tree came back identical and the
  clean gate was green before and after every part. One sabotage, `courbe-avant-pari`, was INERT as
  first written (it never changed the screen) — rewritten in cfff3c42, now caught. Full record:
  `docs/audits/INSTRUMENTS.md`, entry `scene-champ-pentes.mjs`.
- **Still owed:** a wave-2 read (calm/ergonomics critics) like the other scenes had.

### 4.2 PC waves D–E: the fidelity critic's findings — applied (2026-10-20)
Report: `pc-vagues-DE-fidelite.md`. Fixed in bfe43534, then 248d37b1, 7eaf4a43, 7927fe1b, 4050fc3a:
- **The two pre-solved summits.** `suivi-temporel-vitesse`'s worked example is now Mg + HCl followed
  by conductimetry (t½ = 6 min, figure `t-demi-sur-sigma.svg` redrawn); `etat-equilibre`'s
  derivation of $Q_{r,eq} = C\tau^2/(1-\tau)$ is removed (EE-28 pays that debt alone).
- **The S₂O₈²⁻/I⁻ running table no longer gives the summit's t½ = 8 min** (4050fc3a): new data
  x = 5,0·(1 − 2^(−t/12)), t½ = 12 min, every derived number and STV-11 recomputed; the four x(t)
  figures keep their pixels (the time axis has no graduation). Known echo, accepted: `r-variation`
  q4 also asks v at 12 min over 8–16 min, on its own data — copying the lesson gives a wrong answer.
- The false « deux zéros de la parabole » declaration; AE-43 recast on $E_c(\theta)$; the degrees id
  broadened to the pendule pesant; stale scope notes, including four STUDENT-VISIBLE bank reasonings;
  EH-30 C, OMP-27 D; rungs; β/α; $E_c$; one value for C; R = 8,314 dropped; `habilete` on new items.
- **Still open:** LDN-41 D and CMP-46 A/D carry provisional tags until the owner answers DECISIONS
  §35 q3; AE-42's non-converted option (63 m/s) is an outlier by nature.

### 4.3 Cadre debt, waves G and H (syllabus lines with no chapter — `docs/audits/DETTE-CADRE.md`)
- **Written and reviewed:** G3 integrals, G4 log base a / a^x / x^α / n-th root, G5 image of a
  segment + dichotomy, G6 linearisation + Z = z², G7 variance, H1 oscillators — prose ff15dbc2,
  items (CI-59…76, EXP-41…46, LOG-34…38, LIMCONT-33…40, NBCOMPLEX-48…50, NBCOMPLEX2-49…52,
  PC-M23-1…4 / PC-M25-1…3, SO-44…52). Both wave-1 critics (`cadre-GH-fidelite.md`,
  `cadre-GH-pedagogie.md`) applied: 0b4c28ce, 03464042, e265bcb7, a976cdee (H1: four checkpoints, the
  two-envelope friction figure, the composite derivation one step per line), 096a4558 (LIMCONT-40,
  the dichotomy step COUNT), 9a3b4e39 (the Riemann-rectangles and two-laws figures).
- **G8 written (3023e605, not yet critic-reviewed):** y''+4y'+13y = 0 worked (complex roots with
  damping), Δ > 0 tested, sums of consecutive terms worked with the term count staged; EQDIFF-34…39,
  SUITES-54…56, two new ids. One option (EQDIFF-35 D) states its model in words and is also what kept
  `eleve-ruse` under its seal — honest, but worth a reviewer's look.
- **eleve-ruse was re-sealed once** (c0bd7121): its per-notion ratchet compares averages, so honest
  items exactly at chance can push a below-chance notion over its seal. INSTRUMENTS.md names it.
- **Still open:** owner questions §37 points 4–5; a wave-1 pass on G8; then H2–H5.

### 4.4 Numeration (SM arithmetic) — built and reviewed (2026-10-20)
- `## R7b — Les systèmes de numération` in `content/maths/arithmetique/lesson.md` (chapter 10), from
  the revised spec (35df5738). Both wave-1 critics on the BUILT chapter (`numeration-build-*.md`):
  FIX THEN SHIP, no cadre breach, one false lemma found by both. Applied in de1fc6bd (five
  checkpoints now, existence/uniqueness proved, per-column ledgers, a sum across two bases) and
  7255989e (bank ordered by capacity, AR-51 keyed on b+1, AR-53, AR-54, the lemma fixed).
- **Still open:** DECISIONS §38 points 1–2 (indice vs exposant notation; bases above 9); the habileté
  mix over the tagged items is ≈ 50/36/14 against 40/40/20 — the next lot pays it, never a re-tag.

### 4.5 Vector spaces (SM structures) — BUILT (2026-10-20, fa9fc061)
- `## R8 — Espaces vectoriels : sous-espace, base, dimension` at the end of
  `content/maths/structures-algebriques/lesson.md` (chapter 11; nothing displaced, chapter map
  re-sealed). 15 sections, four checkpoints, eleven step-by-step derivations (`derivations.yaml`), two
  figures, `r8-bac` (bk-2023-n-x5 q1–q2) and `r8-variation`, items SA-36…SA-53 on eight new ids.
  Built from the spec after two critics and an arithmetic pass; every owner default of the spec's §15
  taken. Registers updated: `maths-sm.yaml` lesson_slug, `cadre-couverture.md` §2.1, DETTE-CADRE G2.
- **Wave-1 critics on the BUILT chapter — done and applied:** `espaces-vectoriels-build-*.md` (both
  FIX THEN SHIP, no boundary breach, no arithmetic error). Applied in 2a75f97e (items: five no longer
  answerable by the odd verdict, bloc order) and 93461c7c (the summit's q1 on the three-condition
  criterion, a fifth commit before the kernel, a q4 on linear maps in the variation, Y(a,b) for V,
  dim{0} = 0 stated). Spec revision (c) records where the build now departs from the spec.
- **Owner:** DECISIONS §38 points 3–4 (two tag calls), and the spec's §15 defaults.

### 4.6 Smaller loose ends
- **Figures added 2026-10-20** (`t-demi-sur-sigma`, `frottement-fluide-solide`,
  `numeration-cascade-2025-base7`, `riemann-rectangles`, `deux-lois-meme-esperance`,
  `sous-espaces-plan`, `echelle-dimensions-r3`, and the four rescaled kinetics figures): figure gate
  green in light and dark, and looked at — one label moved (6daa3e63). The gate's informational
  « barre » class still lists five labels touched by a line (sous-espaces-plan, echelle-dimensions-r3,
  t-demi-sur-sigma); all readable, polish if you like. Print, French typography and raw-LaTeX gates
  were run locally on the eleven pages changed today: green (the print gate had caught the
  oscillators' summary table 10 px too wide — fixed in 6c334dab).
- **A+ text in scenes:** vector names scale with the reader's text size (30ef9de3); not yet looked
  at, at A and A+, in a browser.
- **validate-content warnings** that need a judgment, not a fix: figure files placed by no
  marker (`geometrie-espace`, `limites-continuite`, `nombres-complexes-2`, `dipole-rl`, `rc-charge`,
  `rlc-serie`), and rung tags with no heading (R6/R7 in three maths notions). The nine
  `lesson_placement` mismatches were fixed (e5ed42c1).
- **Owner decisions** waiting with a written default: `docs/audits/DECISIONS-EN-ATTENTE.md` §31–§38.
- **SVT is frozen**; the Andes 3D-scene spec waits for it to thaw.

---

## 5. Working with Claude Code locally

- `.claude/CLAUDE.md` is read automatically; the agent roster (`.claude/agents/`) and the three project
  skills (`design-bible`, `figure-authoring`, `verification`) work unchanged.
- **What the cloud session had that a local one does not:** a scratch folder (anything worth keeping
  from it is now in `docs/` or `scripts/`), side clones (BAC-c, BAC-g, … — replaced by
  `git worktree`, see §2), scheduled self check-ins and PR webhooks (use GitHub's own notifications).
- **Parallel agents and the session limit:** on 2026-09-28 eleven agents running at once exhausted
  the account's session limit and all died mid-task, most before writing anything. Locally, run two
  or three at a time, and commit between rounds.
- `.mcp.json` declares two MCP servers for the media lane: `gemini-image` (needs `GEMINI_API_KEY` in
  your environment) and `notebooklm`. Both failed to connect from the cloud container; they may work
  locally. Canva is a claude.ai connector that needs authorising in your claude.ai connector settings.

---

## 6. What moved from the cloud session into the repo (2026-10-20)

| was | now |
|---|---|
| `verif-batterie.sh` in the scratch folder + a side clone | `scripts/verif-commit.sh` (a `git worktree`, reused) |
| the container's Chromium path, hard-coded | `web/scripts/pw.mjs` (`npm run pw -- <gate>`), and five scripts that ignored `PW_CHROMIUM_PATH` fixed |
| sabotage campaigns in the scratch folder | `scripts/campagnes/` — runner + sets for `scene-quotient` (87) and `scene-champ-pentes` (44) |
| critic reports only in the session transcript | `docs/audits/critiques/` (4 reports) |
| uncommitted prose in side clones | committed (ff15dbc2) |
| unreviewed G3 items in a side clone | reviewed, completed and committed (CI-59…72) |
| the slope-field scene, written but never run | verified: green ×2, red 29/29, armed in CI (§4.1) |
| — | `.gitattributes` (LF), `.nvmrc` (Node 22) |

The deep history — why every gate exists, what each ADR learned — is unchanged: `docs/HANDOFF.md`,
`docs/decisions/`, `docs/audits/INSTRUMENTS.md`.
