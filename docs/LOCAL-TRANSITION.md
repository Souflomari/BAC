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

- **Everything is on `claude/vibrant-fermi-v1lxj5`** — 1 481 commits ahead of `main`, zero behind.
  Draft PR **#2** (`claude/vibrant-fermi-v1lxj5 → main`) carries it. **CI run 810 is green on the
  handoff head 874626d2 — all 5 jobs**, including the new slope-field gate. CI runs on every push.
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
- **State: verified and armed (2026-10-20).** Its gate `scripts/scene-champ-pentes.mjs` is green twice
  (256 measures, 29 families) and red 29/29 under `--essai-rouge`; it runs in CI (job `telephone`), its
  unit test `test-champ-pentes` (11/11) in the unit-test step.
- The first run was red on 42 measures; almost all were the bench (how a thin antialiased stroke was
  measured), one was the product (P's ring hid two thirds of the answer segment at step 1). What was
  fixed and why: `docs/audits/INSTRUMENTS.md`, entry `scene-champ-pentes.mjs`.
- **Still owed:** the product-sabotage campaign (44 sabotages ready:
  `scripts/campagnes/sabotages-champ-pentes.py`, ~3 h — run it in a separate worktree, see §2), and a
  wave-2 read (calm/ergonomics critics) like the other scenes had.

### 4.2 PC waves D–E: the fidelity critic's findings — applied (2026-10-20)
Report: `pc-vagues-DE-fidelite.md`. Fixed in bfe43534, then 248d37b1, 7eaf4a43, 7927fe1b:
- **The two pre-solved summits.** `suivi-temporel-vitesse`'s worked example is now Mg + HCl followed
  by conductimetry (t½ = 6 min, figure `t-demi-sur-sigma.svg` redrawn); `etat-equilibre`'s
  derivation of $Q_{r,eq} = C\tau^2/(1-\tau)$ is removed (EE-28 pays that debt alone).
- The false « deux zéros de la parabole » declaration; AE-43 recast on $E_c(\theta)$; the degrees id
  broadened to the pendule pesant (AE-42 → R7, and R7 now says the θ² approximation needs
  radians); stale scope notes, including four STUDENT-VISIBLE bank reasonings that said « la leçon
  ne montre jamais ce geste »; EH-30 C, OMP-27 D; rungs; β/α; $E_c$; one value for C; R = 8,314
  dropped; `habilete` on the new items.
- **Still open:**
  - LDN-41 D and CMP-46 A/D carry provisional tags until the owner answers DECISIONS §35 q3 (two
    missing lois-de-Newton ids).
  - The new `t-demi-sur-sigma.svg` has been checked by CI's figure-preview only; nobody has looked
    at it rendered, in light and dark.
  - AE-42's non-converted option (63 m/s) is an outlier by nature (×3283 on θ²).
  - `suivi-temporel-vitesse` R4's « lecture graphique » (S₂O₈²⁻ data) also prints t½ = 8 min, the
    summit's answer, on a different reaction.

### 4.3 Cadre debt, waves G and H (syllabus lines with no chapter — `docs/audits/DETTE-CADRE.md`)
- **Prose (ff15dbc2):** G3 integrals, G4 log base a / a^x / x^α / n-th root, G5 image of a segment
  + dichotomy, G6 linearisation + Z = z², G7 variance, H1 oscillators.
- **Items — all done (2026-10-20):**

  | wave | items | new misconception ids |
  |---|---|---|
  | G3 | CI-59…73 | — |
  | G4 | EXP-41…46, LOG-34…38 | 1 |
  | G5 | LIMCONT-33…38 | 3 |
  | G6 | NBCOMPLEX-48…50, NBCOMPLEX2-49…52 | 3 |
  | G7 | PC-M23-1…4 | — |
  | H1 | SO-44…52 | 2 |

  Every new id has ≥ 3 items. All 62 notions now meet the floor (CI-73 closed the last one).
- **eleve-ruse was re-sealed** (c0bd7121). Its per-notion ratchet compares averages, so honest
  items exactly at chance push a below-chance notion over its seal. INSTRUMENTS.md names the
  property; a measure that would not move is noted there, not armed.
- **Then:** wave-1 critics on all of G/H (bac-fidelity running 2026-10-20, then pedagogy). The rest
  of the plan: G1 numeration (4.4), G2 vector spaces (4.5), G8, H2–H5.

### 4.4 Numeration (SM arithmetic, a new rung R7b) — spec ready for its second draft
- Spec: `docs/pipeline/propositions/maths-arithmetique-numeration.md`. Reports
  `numeration-pedagogie.md` and `numeration-fidelite.md`: both **BUILD AFTER FIXES**, every number
  correct. The cadre line is now confirmed by seven Moroccan sources
  (`docs/cadre/sources/verification-numeration-2026-09-28.md`); the base notation is split between
  sources (use $\overline{\cdots}_{(b)}$ through one place, say once that some documents write it in
  superscript).
- **Next:** pedagogy-architect revises the spec against both reports (the revision agent died at the
  session limit before starting), then content-author and item-author, then `carte-chapitres --sceller`.

### 4.5 Vector spaces (SM structures, a new chapter 11) — spec written, one critic done
- Spec: `docs/pipeline/propositions/maths-structures-espaces-vectoriels.md`. Report
  `espaces-vectoriels-pedagogie.md`: **BUILD AFTER FIXES** — no summit (an `r8-bac` on the verified
  bk-2023-n-x5 is available), two misconceptions neither staged nor delegated (M3, M5), « combinaison
  linéaire » never defined though Vect leans on it; all 18 worked computations and 18 keys correct.
- **Next:** the bac-fidelity critic (it died mid-read), then the architect's revision.

### 4.6 Smaller loose ends
- **A+ text in scenes:** vector names now scale with the reader's text size (30ef9de3); not yet
  looked at, at A and A+, in a browser.
- **Owner decisions** waiting with a written default: `docs/audits/DECISIONS-EN-ATTENTE.md` §31–§37
  (notably §37: what SExp students are told to skip, « les deux types d'amortissement », the size of
  the numeration lot, and redox titration vs the cadre exclusion).
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
