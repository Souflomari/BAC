# BacPrep — Session Handoff

**Last session ended:** 2026-05-12
**Current state of production:** https://bacapp.vercel.app

This document is a single, self-contained handoff: read it top-to-bottom and you should be able to pick up the project without prior context. Combine with `PROJECT_STATUS.md` (which has the per-session history) if you want the full timeline.

---

## TL;DR — what you need to know in 60 seconds

- **BacPrep** = Moroccan Baccalauréat exam prep app, Flutter web (Vercel) + Supabase. Live for SMA + SMB streams.
- **Current multi-session run**: restructure all course content as full Bac-style exam papers (4–5 multi-part exercices each), build PC + SVT streams from scratch, restructure annales. Roughly 150 papers total target.
- **Where we are**: schema + frontend done; 95/95 papers shipped across SMA/SMB/PC (32 + 32 + 31); PC content (papers) now full; PC lessons still stubs; ~25 SVT chapters + 32 annales to author.
- **Resume by**: jumping to §10 (continuation playbook). Critical files are listed there.

---

## 1. What BacPrep is

A Moroccan Bac exam prep app. Bilingual (FR primary, AR planned). Originally Duolingo-style cards; mid-redesign into **long-form textbook chapters** that take a student from prerequisites to a full Bac problem set. SRS-backed (half-life regression), with native interactive widgets for math/physics/chemistry concepts.

Target users: Moroccan high-schoolers preparing the BIOF Bac, all scientific filières (currently SMA + SMB fully covered; PC + SVT being built).

---

## 2. Tech stack

| Layer | Tech |
|---|---|
| Frontend | Flutter 3.x + Dart (web target on Vercel) |
| State | Riverpod (FutureProvider, StreamProvider, Notifier) |
| Routing | `go_router` with `ShellRoute` |
| Backend | Supabase — Postgres + Auth + Edge Functions |
| LaTeX | `flutter_math_fork` + custom `RichTextRenderer` |
| Hosting | Vercel (static Flutter web build) |
| Observability | Sentry (errors) + PostHog (events) — both guarded by build-time keys |

**Toolchain on this Windows machine:**
- `flutter` → `C:\flutter\bin\flutter.bat`
- `dart` → `C:\flutter\bin\dart.bat`
- `supabase` → `C:\Users\soufiane.lomari\supabase-cli\supabase.exe`
- `vercel` CLI installed; deploy script at `mobile/bac_app/deploy.ps1`

---

## 3. Live URLs & cloud IDs

| | |
|---|---|
| Production web | https://bacapp.vercel.app |
| Vercel project | `lomarisoufiane1-4571s-projects/bac_app` |
| Supabase project ref | `iwoydyudjondihzzsqay` |
| Supabase region | Central EU (Frankfurt) |
| Supabase project name | BacPrep |
| Custom domain | None yet |

---

## 4. Repo layout

Root: `f:/APP` (Windows). Top-level:

```
APP/
  HANDOFF.md             ← THIS FILE
  PROJECT_STATUS.md      timeline of every prior session/run
  README.md              high-level orientation
  ARCHITECTURE.md        architecture deep-dive
  CONTRIBUTING.md        toolchain + style + content authoring conventions
  CHANGELOG.md           user-facing release notes
  GO_LIVE.md             original go-live runbook (parts now outdated)
  .gitignore
  admin/                 admin tooling (not yet developed)
  backend/
    supabase/
      config.toml
      migrations/        001 → 032 currently applied (numbered)
      functions/         submit-answer, next-session, delete-self-account edge fns
      .temp/             linked-project.json — DO NOT DELETE
    seed/                seed SQL + Dart encoders that emit migrations
  docs/
    architecture.md      legacy architecture doc
    content-guide.md     item authoring conventions
  mobile/
    bac_app/             the Flutter app
      .env.production    SUPABASE_URL + ANON_KEY (gitignored)
      pubspec.yaml
      vercel.json
      deploy.ps1         build + vercel push
      lib/               see §5
      web/               index.html, manifest, icons
  mockups/               static HTML mockups (historical reference)
  shared/
    skill_map_sciences_maths_a.json  SMA curriculum tree
    skill_map_sciences_maths_b.json  SMB curriculum tree
    skill_map_pc.json                PC curriculum tree (NEW, this run)
    validate_skill_map.dart          run: dart shared/validate_skill_map.dart shared/*.json
    types/                           legacy TS shared types
```

---

## 5. `mobile/bac_app/lib/` structure

```
lib/
  app.dart                       global shortcuts (Cmd/Ctrl+K search, ?) + router
  main.dart                      Sentry + Analytics init, GlobalErrorBoundary, Supabase init
  config/
    router.dart                  GoRouter — auth redirect, shell vs full routes
    theme.dart                   Papier design system (Papier.*, PapierType.*, Spacing)
  l10n/                          arb files (FR + AR), generated AppLocalizations
  models/
    skill.dart                   Subject, Topic, Skill (now incl. examPaperRaw), LessonCard, MasteryLevel, UserSkillState
    lesson_v2.dart               LessonV2 sealed-class hierarchy (sections + blocks)
    exam_paper.dart              NEW (this run) — ExamPaper, Exercice, Question, Subpart, QuestionSolution, SolutionStep
    item.dart                    Item + ItemType (30+ types)
    profile.dart                 incl. bacStream enum
    progress.dart                SubjectProgress, mastery summaries
    session.dart                 Session + AnswerResult + XP/streak
  providers/
    auth_provider.dart           authStateProvider, profileProvider, authActionsProvider
    progress_provider.dart       skillByIdProvider, subjectsProvider, topicsProvider, allSkillsProvider
    session_provider.dart        session generation + submission
    lesson_progress_provider.dart  persisted checkpoint passes
    connectivity_provider.dart
  services/
    api_service.dart             Supabase wrapper (sign in/up/out, RPCs, fetches)
    sync_service.dart            offline-pending-answer flush
    analytics_service.dart       PostHog wrapper, no-ops if key unset
  screens/
    splash/, auth/, onboarding/, shell/, home/, subjects/, session/, progress/,
    settings/, exams/, analytics/, leaderboard/, profile/, docs/, landing/
  widgets/
    papier/                      design-system primitives (tab bar, top nav, footer, toast)
    exam_paper/                  NEW (this run): exam_paper_view.dart (renderer for ExamPaperView)
    exams/animated_solution.dart  stagger-fade step reveal (reused by exam_paper widgets)
    rich_text_renderer.dart      markdown + inline LaTeX
    interactive_widget_dispatch.dart  buildInteractiveWidgetBySlug(slug, {config})
    figure_widget.dart, lesson_card_widget.dart, explanation_panel.dart
    math/                        15 math widgets
    physics/                     14 physics widgets
    chemistry/                   6 chemistry widgets
    svt/                         3 SVT widgets (punnett, dna_replication, cell_division)
    animations/                  concept_animation_widget.dart (10 short anims)
    demo/                        widget demo screens (/demo/*)
```

---

## 6. Database schema (Postgres via Supabase)

**Highest applied migration: 032** (`032_seed_pc_skills.sql`).

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | user profile | `id`, `display_name`, `bac_stream` (enum), `preferred_language`, streak/XP/avatar |
| `subjects` | subject catalog | `id`, `code` (math/physics/svt/...), `name_fr/ar`, `color`, `exam_type` |
| `stream_subjects` | stream ↔ subject many-to-many | `stream`, `subject_id`, `coefficient`, `is_optional` |
| `topics` | chapter | `id`, `subject_id`, `code`, `name_fr/ar`, `exam_relevance_weight` |
| `skills` | sub-chapter / lesson | `id`, `topic_id`, `code`, `name_fr/ar`, `difficulty_level`, `lesson` (JSONB), **`exam_paper` (JSONB, new column from this run)** |
| `skill_prerequisites` | DAG edges | `skill_id`, `prerequisite_skill_id` |
| `items` | quiz questions | `id`, `skill_id`, `item_type`, `question` (JSONB), `explanation`, `hint`, `tags` |
| `user_skill_states` | SRS state | `user_id`, `skill_id`, `half_life_hours`, `mastery`, attempts/correct, last_reviewed_at |
| `user_item_history` | answer log | per-attempt rows |
| `user_lesson_progress` | checkpoint passes | `user_id`, `skill_id`, `passed_keys` (JSONB) |
| `daily_activity` | streak/XP rollups | per user per day |
| `bac_exams` | annales metadata | `id`, `year`, `session`, `stream`, `subject_id`, `pdf_url`, `is_active` |
| `bac_exam_questions` | annale questions | `id`, `exam_id`, `skill_id`, `question`, `answer` (both JSONB) |
| `user_exam_progress` | per-user annale progress |  |

**`bac_stream` enum values**: `sciences_maths_a`, `sciences_maths_b`, `sciences_physiques`, `svt`, `sciences_economiques`, `sciences_gestion_comptable`, `lettres_sciences_humaines`, `arts_appliques`, `sciences_chariaa`, `langue_arabe`. PC and SVT are already in the enum since day 1.

### `skills.lesson` JSONB (v2)

```json
{
  "version": 2,
  "title_fr": "...",
  "subtitle_fr": "...",
  "sections": [
    { "kind": "concept"|"prerequisite"|"example_walkthrough"|...,
      "title_fr": "...",
      "eyebrow_fr": "PRÉREQUIS",
      "estimated_minutes": "3",
      "blocks": [ {"kind":"paragraph", "md":"..."}, {"kind":"checkpoint", ...} ] }
  ]
}
```

### `skills.exam_paper` JSONB (NEW this run)

```json
{
  "version": 1,
  "title_fr": "Épreuve type — Limites et continuité",
  "subtitle_fr": "4 exercices · 1h30 · sur 20 points",
  "duration_minutes": 90,
  "total_points": 20,
  "intro_fr": "Court rappel...",
  "exercices": [
    { "number": 1, "title_fr": "...", "points": 5, "preamble_fr": "Soit...",
      "questions": [
        { "number": 1, "stem_fr": "Calculer...", "points": 2,
          "solution": { "steps": [ {"text_fr": "...", "latex": "...", "widget_slug": null} ],
                        "final_answer_fr": "...", "method_fr": "..." } },
        { "number": 2, "stem_fr": "...", "points": 3,
          "subparts": [ {"letter": "a", "stem_fr": "...", "points": 1, "solution": {...}} ] }
      ] }
  ]
}
```

Parsed by `lib/models/exam_paper.dart` into sealed classes (`ExamPaper`, `Exercice`, `Question`, `Subpart`, `QuestionSolution`, `SolutionStep`).

---

## 7. Skill code conventions

| Stream | Skill code prefix | UUID series (topic) | UUID series (skill) |
|---|---|---|---|
| SMA | `sma_*` | `22222222-aaaa-*` | `33333333-aaaa-*` |
| SMB | unprefixed (`arithmetic_seq`, `limit_calc`, ...) | `22222222-0000-*` | `33333333-0000-*` (from seed_data.sql) |
| PC (new, this run) | `pc_*` | `22222222-cccc-*` | `33333333-cccc-*` |
| SVT (planned) | `svt_*` | `22222222-dddd-*` | `33333333-dddd-*` |

UUID convention for content tables:
- SMA items: `44444444-aaaa-*`
- PC items (planned): `55555555-aaaa-*`
- SVT items (planned): `66666666-aaaa-*`

---

## 8. The Bac-paper restructure run (CURRENT MULTI-SESSION EFFORT)

### Context

User feedback (mid-2026-05): existing course structure (LessonV2 sections + checkpoints + try-it) was too granular and academic. Moroccan Bac students learn from real exam papers, not divided concept sections. **Every chapter should become a full topic-coherent Bac-style paper** with 4–5 multi-part exercices and verified worked solutions. Plus build PC + SVT streams from scratch. Plus rebuild annales as proper multi-exercice structures.

Approved plan: `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md` (read it for the original scope spec).

### Phase status

| Phase | Status | Migration | Description |
|---|---|---|---|
| 0 | ✅ SHIPPED | 029 | Schema (`exam_paper` JSONB column on skills) + frontend models + widgets |
| 1 | ✅ SHIPPED | 030 | All 32 SMA exam papers |
| 2 | ✅ SHIPPED | 031 | All 32 SMB exam papers |
| 3.1 | ✅ SHIPPED | — | PC skill map JSON validated |
| 3.2 | ✅ SHIPPED | 032 | PC skill seed (15 topics, 31 skills, 21 prereqs, 31 stub lessons) |
| 3.3 | ⏳ NOT STARTED | 033 (planned) | Full PC LessonV2 lessons |
| 3.4 | ✅ SHIPPED | 034 | PC exam papers (31 chapters — 15 math + 16 PC) |
| 3.5 | ⏳ NOT STARTED | 035 (planned) | PC quiz items (~300 items) |
| 4.1 | ⏳ NOT STARTED | — | SVT skill map JSON |
| 4.2 | ⏳ NOT STARTED | 036 (planned) | SVT skill seed |
| 4.3 | ⏳ NOT STARTED | 037 (planned) | SVT lessons (incl. 12 novel bio/geo) |
| 4.4 | ⏳ NOT STARTED | 038 (planned) | SVT exam papers (~25 chapters) |
| 4.5 | ⏳ NOT STARTED | 039 (planned) | SVT items |
| 5.1 | ⏳ NOT STARTED | 040 (planned) | SMB annales v2 (multi-exercice restructure) |
| 5.2 | ⏳ NOT STARTED | 041 (planned) | SMA annales v2 |
| 5.3 | ⏳ NOT STARTED | 042 (planned) | PC annales (new) |
| 5.4 | ⏳ NOT STARTED | 043 (planned) | SVT annales (new) |
| 6 | ⏳ NOT STARTED | — | Tests (exam_paper model + widget) + observability + final docs |

### What's live in production right now

- **95 full Bac papers** in `skills.exam_paper` (32 SMA + 32 SMB + 31 PC)
- **PC skill tree** browseable with full exam papers attached (lessons still stubs)
- **`ExamPaperView` widget** renders below `LessonV2` content on `/lessons/:skillId` for any skill that has both `lesson` AND `exam_paper`

### Critical files in this run

**Frontend (Flutter)**:
- `mobile/bac_app/lib/models/exam_paper.dart` — sealed-class shape, JSONB parser
- `mobile/bac_app/lib/widgets/exam_paper/exam_paper_view.dart` — full renderer (collapsible exercice cards, numbered Q1/Q2/Q3 blocks, lettered a/b/c subparts, reuse of `AnimatedSolution` for stagger reveals)
- `mobile/bac_app/lib/models/skill.dart` — `examPaperRaw` field added; parsed from `skills.exam_paper`
- `mobile/bac_app/lib/screens/subjects/lesson_screen.dart` — passes `examPaper` into `LongLessonScreen`
- `mobile/bac_app/lib/screens/subjects/long_lesson_screen.dart` — appends `ExamPaperView` after lesson sections; fires analytics events

**Content (Dart encoders + Python encoders)**:
- `backend/seed/json_encode_exam_papers_sma.dart` — 32 SMA papers
- `backend/seed/json_encode_exam_papers_smb.dart` — 32 SMB papers
- `shared/skill_map_pc.json` — PC curriculum tree (validates against `shared/validate_skill_map.dart`)

**SQL migrations** (apply order matters):
- `backend/supabase/migrations/029_exam_paper_column.sql` — schema
- `backend/supabase/migrations/030_exam_papers_sma.sql` — 32 SMA papers
- `backend/supabase/migrations/031_exam_papers_smb.sql` — 32 SMB papers
- `backend/supabase/migrations/032_seed_pc_skills.sql` — PC tree

### Authoring convention for an exam paper

Each chapter's paper:
- 4–5 exercices, ~20 points total, ~90 minutes duration
- Every exercice is multi-part (numbered Q1, Q2, Q3) with proper a/b/c sub-question lettering where applicable
- Every solution has step-by-step working at the depth from the 023/024 expansion run (400–700 chars per step where useful, with `mistake_fr` and `tip_fr` callouts where pedagogically valuable)
- Solutions verified against multiple sources (formula identities, conceptual rules)
- Where the chapter has interactive widgets (function_graph, complex_plane, titration_curve, etc.), embed them via `widget_slug` in solution steps so `AnimatedSolution` renders the visual

Run protocol (2-pass verification):
1. Draft the multi-step solution: name the technique → state what blocks naïve substitution → justify the choice → walk the calc → conclude
2. Independently re-derive: re-read the question fresh, work the math/physics using known formulas, compare to drafted solution; if they diverge, find the bug

### Validation rules applied during authoring

- **Math**: identities ($a^2-b^2$, $a^3 \pm b^3$, trig), $\ln$ rules, croissances comparées, dérivées + primitives usuelles
- **Physics**: dimensional analysis (units balance), conservation (énergie, charge, masse), Newton 2 with vector signs, $v = \lambda f$, $\tau = RC$ / $L/R$
- **Chemistry**: pH/pKa, Henderson-Hasselbalch, Le Chatelier, charge balance, mass balance, $K = Q_r$ at equilibrium
- **Biology** (for SVT, Phase 4): Mendelian ratios (3:1, 9:3:3:1), codon table, enzymatic specificity, hormonal feedback signs

For any solution authored with less than full confidence, add a `-- SME REVIEW: <reason>` comment in the SQL migration.

---

## 9. Migration index (full)

| # | File | Subject |
|---|---|---|
| 001 | `001_initial_schema.sql` | Core tables (profiles, subjects, topics, skills, items, exams) |
| 002 | `002_bac_exams.sql` | bac_exams + exam_questions + user_exam_progress + RLS |
| 003-006 | various | item types, analytics, RPC, daily quests |
| 007-011 | various | lesson schema expansion, items for physics/svt |
| 012 | `012_seed_sma_skills_and_lessons.sql` | SMA curriculum |
| 013-014 | `013_long_lessons_sma_complete.sql`, etc. | SMA v2 long-form lessons (7 chapters) |
| 015-016 | `015_user_lesson_progress.sql`, `016_storage_avatars.sql` | Session tracking + avatar bucket |
| 017 | `017_long_lessons_smb.sql` | SMB v2 lessons (32 chapters) |
| 018 | `018_items_sma_specific.sql` | ~192 SMA items |
| 020 | `020_smb_annales.sql` | 8 SMB exam papers + 24 placeholder questions |
| 021-022 | `021_exam_questions_smb.sql`, `022_exam_questions_sma.sql` | 160 multi-step exam questions (80 each) |
| 023-024 | various | Depth-expanded solutions for the 160 exam Qs |
| 025-027 | various | Lesson explanation expansion (PL/pgSQL surgical patches) + SMA items v2 (depth expansion) |
| 028 | `028_lessons_sma_expanded_solutions.sql` | Corrected SMA lesson expansion |
| **029** | `029_exam_paper_column.sql` | **NEW: `exam_paper` JSONB column on skills + GIN index** |
| **030** | `030_exam_papers_sma.sql` | **NEW: 32 SMA exam papers** |
| **031** | `031_exam_papers_smb.sql` | **NEW: 32 SMB exam papers** |
| **032** | `032_seed_pc_skills.sql` | **NEW: PC topics + skills + prereqs + stub lessons** |

Planned (not yet written): 033 (PC lessons), 034 (PC exam papers), 035 (PC items), 036–039 (SVT), 040–043 (annales v2).

---

## 10. Continuation playbook (for the next session)

### Step 0 — Reset bearings

```bash
cd f:/APP
git log --oneline -20                          # recent commits
git status                                     # uncommitted changes (should be none)
ls backend/supabase/migrations/ | sort | tail  # latest migrations (032 expected as highest)
```

Then run a DB-state check:

```sql
-- f:/tmp_q.sql
SELECT
  (SELECT count(*) FROM skills WHERE exam_paper IS NOT NULL) AS papers_in_db,
  (SELECT count(*) FROM topics WHERE code LIKE 'pc_%') AS pc_topics,
  (SELECT count(*) FROM skills WHERE code LIKE 'pc_%') AS pc_skills;
```

```bash
cd f:/APP/backend && /c/Users/soufiane.lomari/supabase-cli/supabase.exe db query -f f:/tmp_q.sql --linked
```

Expected: papers_in_db = 64 (32 SMA + 32 SMB), pc_topics = 15, pc_skills = 31.

### Step 1 — Most likely next step: PC full lessons (Phase 3.3) OR SVT (Phase 4)

Phase 3.4 is ✅ DONE. The 31 PC skills now have full Bac papers. Two natural continuations:

**Option A — Phase 3.3 (PC full lessons, migration 033)**: Upgrade the 31 minimal `LessonV2` stubs into full long-form lessons (concept → prerequisite → example_walkthrough → checkpoint sections). Encoder pattern : `backend/seed/json_encode_long_lessons.dart` (SMA shape).

**Option B — Phase 4 (SVT stream)**: ~25 chapters including 12 novel bio/geo. Same recipe as PC : skill_map JSON → seed migration (036) → lessons (037) → exam papers (038) → items (039). The 12 bio/geo chapters (génétique, évolution, immunité, tectonique, etc.) need SME-grade verification — most novel authoring of this run.

The remainder of this section (paragraphs below) describes the **PC exam papers playbook from before Phase 3.4 was completed**, kept here as a template for the SVT phase.

PC skill codes to author papers for (full list, ordered by topic):

**Math (15)**:
- `pc_arithmetic_geom_seq` (suites arith + géom combined)
- `pc_seq_convergence`
- `pc_seq_recursive`
- `pc_limit_calc`
- `pc_continuity_tvi`
- `pc_deriv_rules`
- `pc_deriv_apps`
- `pc_ln_function`
- `pc_exp_function`
- `pc_primitives`
- `pc_integral_calc`
- `pc_complex_algebra`
- `pc_complex_trig`
- `pc_ode_first_order`
- `pc_prob_binomial`

**Physique-Chimie (16)**:
- `pc_newton_laws`
- `pc_projectile`
- `pc_energy_mechanical`
- `pc_pendulum`
- `pc_rc_circuit`
- `pc_rl_circuit`
- `pc_rlc_oscillations`
- `pc_mechanical_waves`
- `pc_diffraction_interference`
- `pc_am_modulation`
- `pc_radioactivity`
- `pc_reaction_speed`
- `pc_ph_calculation`
- `pc_titration`
- `pc_esterification`
- `pc_daniell_cell`

**Recipe**: copy the encoder pattern from `backend/seed/json_encode_exam_papers_smb.dart` (most similar in difficulty level). PC papers should mirror the SMB depth and structure. Many PC chapters have direct equivalents in SMA or SMB papers — adapt the SQL UPDATE target codes (`pc_*` instead of `sma_*` or unprefixed) and keep the same exercice structure.

After each batch of ~3–4 chapters:
```bash
cd f:/APP && /c/flutter/bin/dart.bat backend/seed/json_encode_exam_papers_pc.dart
cd f:/APP/backend && /c/Users/soufiane.lomari/supabase-cli/supabase.exe db query -f supabase/migrations/034_exam_papers_pc.sql --linked
```

Verify count:
```sql
SELECT count(*) AS pc_papers FROM skills WHERE code LIKE 'pc_%' AND exam_paper IS NOT NULL;
```

Commit checkpoint at each batch milestone.

### Step 2 — After PC papers complete, do PC items + lessons

- **PC items** (Phase 3.5, migration 035): mirror `backend/seed/json_encode_items_sma.dart`. UUID series `55555555-aaaa-*`. ~8 items per PC chapter × 31 chapters = ~250 items.
- **Full PC LessonV2 lessons** (Phase 3.3, migration 033): the stubs currently in place are minimal. Full lessons mirror `backend/seed/json_encode_long_lessons.dart` (SMA encoder) shape. SMB-depth is appropriate.

### Step 3 — SVT stream (Phase 4)

The novel part of the run. 25 chapters:
- **Math (5)**: lighter than PC — suites, limits, derivation, ln/exp, intégrales basique
- **Physique-Chimie (8)**: lighter than PC versions
- **SVT bio/geo (12)** — fully novel authoring (no SMA/SMB equivalent):
  - `svt_genetique_humaine`, `svt_genetique_populations`, `svt_diversification_genetique`
  - `svt_evolution`
  - `svt_communication_nerveuse`, `svt_communication_hormonale`
  - `svt_immunite`
  - `svt_tectonique_plaques`, `svt_geochronologie`, `svt_metamorphisme`
  - `svt_energie_cellulaire`
  - `svt_ecosystemes`

For SVT bio/geo, apply the run protocol's 2-pass verification and flag any answer with less than full SME-grade confidence via `-- SME REVIEW: <reason>` comments.

Same migration pattern as PC: skill_map JSON → seed migration (036) → lessons (037) → exam papers (038) → items (039).

### Step 4 — Annales v2 restructure (Phase 5)

Migrations 040–043. Each `bac_exam` row should get ONE consolidated `exam_question` row whose `question` JSONB carries the full multi-exercice structure (same shape as `skills.exam_paper`). This replaces the current "one row per pulled question" fragments.

### Step 5 — Tests + docs (Phase 6)

- `mobile/bac_app/test/models/exam_paper_test.dart` — parsing tests (~15 cases)
- `mobile/bac_app/test/widgets/exam_paper_view_test.dart` — render smoke tests
- Final PROJECT_STATUS.md §17 closure note
- Update ARCHITECTURE.md (note the dual-render lesson screen)
- Update docs/content-guide.md (exam_paper authoring conventions)

### Verification queries you'll use a lot

```sql
-- DB-wide count of exam papers per stream prefix
SELECT
  CASE
    WHEN code LIKE 'sma_%' THEN 'SMA'
    WHEN code LIKE 'pc_%' THEN 'PC'
    WHEN code LIKE 'svt_%' THEN 'SVT'
    ELSE 'SMB (or other)'
  END AS stream,
  count(*) AS papers
FROM skills
WHERE exam_paper IS NOT NULL
GROUP BY 1;

-- Spot-check the JSONB shape of a paper
SELECT exam_paper FROM skills WHERE code = 'pc_newton_laws';

-- Verify a frontend-relevant lesson + exam_paper coupling
SELECT code, lesson IS NOT NULL AS has_lesson, exam_paper IS NOT NULL AS has_paper
FROM skills WHERE code LIKE 'pc_%' ORDER BY code;
```

### App-level smoke test (after each migration push)

1. Open https://bacapp.vercel.app in Incognito (avoids service-worker cache from prior visits)
2. Sign up a fresh test account → onboarding → pick stream (SMA / SMB / Sciences Physiques / SVT)
3. Browse Subjects → topic → skill → lesson page should render:
   - Existing `LessonV2` sections on top
   - "ÉPREUVE TYPE" divider (only if exam_paper is non-null)
   - `ExamPaperView` with collapsible exercice cards
4. Tap "Voir la solution étape par étape" on any question → stagger fade-in reveals the steps

---

## 11. Out of scope (hard no-go for this multi-session run)

- **Arabic translation** of the new exam_paper / lesson content — schema supports `name_ar` / `*_ar` fields but FR ships first. AR is a separate run.
- **Replacing the existing LessonV2 lessons** — they stay on top; `exam_paper` is appended below them as a new section.
- **New interactive widgets** — reuse only the 33 already registered slugs (see `shared/validate_skill_map.dart` `wiredSlugs` constant). If SVT biology needs 2–3 new widgets (mitose, méiose, ADN, etc.), defer them and use `widget_slug: null` in the exam_paper for now.
- **Replacing the existing 160 exam_questions** in migrations 021/022 — they stay; they live alongside the new `exam_paper`. The annales v2 (Phase 5) restructures the questions inside those rows but doesn't delete them.
- **Real Bac PDF URLs and stems** — placeholders only; user will swap to real Ministry URLs/stems later.

---

## 12. Known issues / deferred work (outside this run)

From prior runs, still open:
- **Service worker stickiness on Vercel**: after every deploy, users may need Incognito to bust cache. `index.html` already wires `controllerchange` reload, but cached `main.dart.js` is immutable.
- **PC + SVT streams beyond shared models**: PC skill tree just shipped; PC content (papers/items/lessons) still pending. SVT entirely empty.
- **Code-splitting**: web bundle currently loads all 50+ interactive widgets at startup. Deferred imports would shrink first paint.
- **Email-verification redirect gate**: screen exists at `/verify-email` but unverified users can still use the app. Flip on once existing test accounts are manually confirmed in the Supabase dashboard.
- **Google OAuth**: code path not in place; needs Supabase dashboard config + button.
- **A11y / l10n cleanup**: some new widgets bypass `AppLocalizations`; some icon-only IconButtons lack `tooltip:`.
- **Test suite**: only 23 tests baseline. Could grow to 100+ for full coverage.
- **Lighthouse audit**: not measured yet.
- **Hive offline cache** for v2 lessons (`Phase C.2` from earlier audit): Hive boxes already plumbed; needs a read-through wrapper around `apiService.getSkillById`.
- **Premium feature flag scaffold** (`Phase C.4`): needs product decisions on free vs premium.
- **SMB lesson SME review**: 32 SMB chapters from 2026-05-09 are pattern-authored v0 drafts; need a Moroccan Bac SME pass for pedagogical accuracy.
- **SMB annales real PDFs / stems**: migration 020 ships 8 papers with placeholder PDF URLs and 24 pattern-authored questions. User to swap in real Bac content.
- **SVT bio/geo SME review** (when Phase 4 ships): the 12 bio/geo chapters are novel authoring with no validated source. **Required SME pass before declaring ship-quality**.

---

## 13. Useful commands cheatsheet

```bash
# Migrations
cd f:/APP/backend
/c/Users/soufiane.lomari/supabase-cli/supabase.exe db push --include-all   # apply pending migrations
/c/Users/soufiane.lomari/supabase-cli/supabase.exe db query -f path/to.sql --linked   # force-apply (bypasses migration history)

# Validators / encoders
cd f:/APP
/c/flutter/bin/dart.bat shared/validate_skill_map.dart shared/skill_map_pc.json
/c/flutter/bin/dart.bat backend/seed/json_encode_exam_papers_sma.dart   # regenerates 030_*.sql

# Flutter
cd f:/APP/mobile/bac_app
/c/flutter/bin/flutter.bat analyze --no-fatal-infos
/c/flutter/bin/flutter.bat test
/c/flutter/bin/flutter.bat build web --release

# Deploy
cd f:/APP/mobile/bac_app
./deploy.ps1                   # or pwsh deploy.ps1

# Git status / commit
cd f:/APP
git log --oneline -15
git status
git add <files>
git commit -m "feat(...): ..."   # use multi-line HEREDOC for Co-Authored-By footer

# Quick DB queries (Windows)
cat > f:/tmp_q.sql <<'SQL'
SELECT ...;
SQL
cd f:/APP/backend && /c/Users/soufiane.lomari/supabase-cli/supabase.exe db query -f f:/tmp_q.sql --linked
```

---

## 14. Design system reminders

When adding new screens/widgets, stay inside the existing palette:
- Colors: `Papier.bg`, `Papier.bg2`, `Papier.surface`, `Papier.ink`, `Papier.ink2/3/4`, `Papier.line`, `Papier.line2`, `Papier.red`, `Papier.green`, `Papier.gold`, `Papier.indigo`
- Type: `PapierType.serif()`, `PapierType.italic()`, `PapierType.body()`, `PapierType.smallCaps()`, `PapierType.display1/2/3()`. `smallCaps` accepts ONLY `fontSize`, `color`, `fontWeight` — no `letterSpacing` or `height` parameters.
- Spacing: `Spacing.xs/sm/md/lg/xl/xxl` (4/8/16/24/32/48)
- Radius: `Papier.radius = 6.0`

Don't introduce new colors. Don't bypass `RichTextRenderer` for inline LaTeX (it handles `$...$` and `$...$`). Reuse `AnimatedSolution` for any stagger-fade solution reveal.

---

## 15. Where to find things by intent

| I want to... | Look at... |
|---|---|
| Understand the run scope | This file §8 + the approved plan at `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md` |
| See per-session history | `PROJECT_STATUS.md` (especially §17 for this run's progress) |
| Author a new exam paper | Read the SMB encoder `backend/seed/json_encode_exam_papers_smb.dart` — pattern is clearer than SMA which has more LaTeX |
| Add a skill to a stream | Edit `shared/skill_map_*.json`, validate, then write a migration (see 032 as template) |
| Change exam paper rendering | `mobile/bac_app/lib/widgets/exam_paper/exam_paper_view.dart` (single file) |
| Tweak frontend lesson dispatch | `mobile/bac_app/lib/screens/subjects/lesson_screen.dart` (skill → LessonV2 + ExamPaper handoff) |
| Find which widgets are wired | `shared/validate_skill_map.dart` `wiredSlugs` const + `mobile/bac_app/lib/widgets/interactive_widget_dispatch.dart` |
| Test in production | Open https://bacapp.vercel.app in Incognito → sign up → onboarding → browse |
| Apply a migration manually | `supabase.exe db query -f <path> --linked` (force-applies bypassing migration history) |

---

**End of handoff.** When you start a new session, paste this file's path into the first message — the new assistant will pick up exactly where we left off.
