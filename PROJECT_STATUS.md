# BacPrep — Project Status & Session Handoff

**Last updated:** 2026-05-08 (during long-form lesson redesign run)
**Current state of prod:** https://bacapp.vercel.app (Flutter web on Vercel)

This document is a self-contained snapshot for any new conversation that
needs to pick up where this one left off. If you're starting fresh: **read
this whole doc first**, then check the most recent git log.

---

## 1. What BacPrep is

A Moroccan Baccalauréat exam prep app. Bilingual (FR primary, AR planned).
Originally Duolingo-style (short cards + quiz); **mid-redesign into long-form
textbook-style chapters** that take a student from prerequisites to a full
Bac problem. SRS-backed (half-life regression), with native interactive
widgets for math/physics/chemistry concepts.

Target audience: Moroccan high-schoolers preparing the BIOF Bac, all
filières (currently focused on Sciences Maths A — "SMA").

---

## 2. Tech stack

| Layer | Tech |
|---|---|
| Frontend | Flutter 3.x + Dart (single codebase, runs on iOS/Android/Web) |
| State | Riverpod (FutureProvider, StreamProvider, Notifier) |
| Routing | `go_router` with `ShellRoute` for the app shell |
| Backend | Supabase — Postgres + Auth + Edge Functions |
| LaTeX | `flutter_math_fork` + custom `RichTextRenderer` for inline math |
| Web hosting | Vercel (static Flutter web build) |

Local toolchain on this Windows machine:
- `flutter` → `C:\flutter\bin\flutter.bat`
- `dart` → `C:\flutter\bin\dart.bat`
- `vercel` CLI → `C:\Users\soufiane.lomari\AppData\Local\ms-playwright-go\1.50.1\vercel.cmd`
- `supabase` CLI → `C:\Users\soufiane.lomari\supabase-cli\supabase.exe`

---

## 3. Live URLs & cloud IDs

| | |
|---|---|
| Production web | https://bacapp.vercel.app |
| Vercel project | `lomarisoufiane1-4571s-projects/bac_app` |
| Supabase project ref | `iwoydyudjondihzzsqay` |
| Supabase region | Central EU (Frankfurt) |
| Supabase project name | BacPrep |
| Custom domain | None yet (still on `*.vercel.app`) |

---

## 4. Repository layout

Repo root: `f:/APP` (Windows). Top-level:

```
APP/
  PROJECT_STATUS.md      ← this file
  GO_LIVE.md             original go-live runbook (some details now outdated)
  .gitignore             excludes secrets, build artefacts
  admin/                 (admin tooling — not yet developed)
  backend/
    supabase/
      config.toml
      migrations/        001 → 013 (latest)
      functions/         submit-answer, next-session edge functions
      .temp/             linked-project.json — DO NOT DELETE (Supabase CLI link)
    seed/                seed SQL files + Dart helpers that emit them
  docs/
    architecture.md      original architecture doc (mostly accurate)
    content-guide.md     conventions for authoring quiz items
  mobile/
    bac_app/             the Flutter app
      .env.production    SUPABASE_URL + SUPABASE_ANON_KEY (gitignored)
      pubspec.yaml
      vercel.json
      deploy.ps1         build + vercel push (preview or prod)
      lib/               app source — see §5
      web/               index.html + manifest + icons
  mockups/               static HTML mockups (historical reference)
  shared/
    skill_map_sciences_maths_a.json  ← SMA curriculum tree (source of truth)
    skill_map_sciences_maths_b.json  ← SMB curriculum tree (older)
    validate_skill_map.dart           runs in any session: dart shared/validate_skill_map.dart shared/skill_map_*.json
    types/                            TypeScript shared types (legacy ref)
```

---

## 5. `mobile/bac_app/lib/` structure

```
lib/
  config/
    router.dart          GoRouter config; auth redirect logic; shell vs full-screen routes
    theme.dart           Papier design system: Papier.* color tokens, PapierType.* helpers, BacPrepColors (legacy aliases), Spacing
  l10n/                  arb files for FR + AR; AppLocalizations generated via flutter gen-l10n
  models/
    skill.dart           Subject, Topic, Skill, LessonCard (v1), MasteryLevel, UserSkillState, EnrichedSkillState
    lesson_v2.dart       NEW long-form lesson schema (sections + blocks)
    item.dart            Item + ItemType enum (30+ types)
    profile.dart         User profile incl. bacStream
    progress.dart        SubjectProgress, computed mastery summaries
    session.dart         Session + AnswerResult + XP/streak shape
  providers/
    auth_provider.dart   authStateProvider, profileProvider, authActionsProvider
    progress_provider.dart  skillByIdProvider, subjectsProvider, topicsProvider, progressProvider
    session_provider.dart   session generation & submission
    connectivity_provider.dart  isOnlineProvider
  services/
    api_service.dart     Supabase client wrapper (signIn, signUp, signOut, RPC calls)
    sync_service.dart    Offline-pending-answer flush
  screens/
    splash/              SplashScreen — auth check then route
    landing/             LandingScreen — public marketing page (added in website pass)
    auth/                LoginScreen (split layout on width ≥ 900), ForgotPasswordScreen
    onboarding/          OnboardingScreen, StreamSelectionScreen
    shell/
      app_shell.dart     Wraps body. Phone: bottom PapierTabBar. Tablet/desktop (≥800): top PapierTopNav + content centered at maxWidth 1200.
    home/                HomeScreen — dashboard. Cards row stacks horizontally on width ≥ 900.
    subjects/
      subjects_screen.dart       Index/grid of subjects. Grid on width ≥ 800.
      subject_detail_screen.dart  Drills into chapters/skills.
      lesson_screen.dart          Lesson viewer — DISPATCHES to v1 (cards) or v2 (LongLessonScreen)
      long_lesson_screen.dart     NEW — renders LessonV2 (long sections + checkpoints)
    session/             SessionScreen — quiz item flow + ExplanationPanel
    progress/            ProgressScreen
    settings/            SettingsScreen + NotificationSettingsScreen
    exams/               Bac annales browser, detail, practice, results
    analytics/           AnalyticsHubScreen, MemoryHeatmapScreen, StudyScheduleScreen
    leaderboard/         LeaderboardScreen
  widgets/
    papier/              papier_tab_bar.dart, papier_top_nav.dart, papier_footer.dart, papier_primitives.dart
    lesson_card_widget.dart   v1 lesson card renderer + WIDGET_TYPE DISPATCH SWITCH (33 cases)
    rich_text_renderer.dart   inline LaTeX paragraph renderer (use this for v2 ParagraphBlock)
    figure_widget.dart        renders {type: 'latex', content} or graph configs
    explanation_panel.dart    item-level explanation reveal (progressive)
    math/                15 native math widgets
    physics/             10 native physics widgets
    chemistry/           4 native chemistry widgets (titration, acid-base, equilibrium, daniell, esterification, kinetics)
    animations/          concept_animation_widget.dart (10 short Manim-style animations in one file)
    svt/                 punnett, dna_replication, cell_division (legacy / SMB)
    demo/                interactive widget demo + test screens (route /demo/*)
```

---

## 6. Database schema (Postgres via Supabase)

Latest migration: **`013_long_lessons_sma.sql`** (this run — long-form lesson seed).

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | user profile | `id`, `display_name`, `bac_stream`, `preferred_language`, streak/XP counters |
| `subjects` | subject catalog | `id`, `code` (math, physics, ...), `name_fr`, `name_ar`, `color`, `exam_type` |
| `stream_subjects` | many-to-many | `stream` (enum), `subject_id`, `coefficient`, `is_optional` |
| `topics` | chapter | `id`, `subject_id`, `code`, `name_fr`, `name_ar`, `exam_relevance_weight` |
| `skills` | sub-chapter / lesson | `id`, `topic_id`, `code`, `name_fr`, `difficulty_level`, `lesson` (JSONB) |
| `skill_prerequisites` | DAG edges | `skill_id`, `prerequisite_skill_id` |
| `items` | quiz questions | `id`, `skill_id`, `item_type`, `question` (JSONB), `explanation`, `hint`, `tags` |
| `user_skill_states` | SRS state | `user_id`, `skill_id`, `half_life_hours`, `mastery`, attempts/correct, last_reviewed_at |
| `user_item_history` | answer log | per-attempt rows |
| `daily_activity` | streak/XP day rollups | per user per day |
| `bac_exams`, `bac_exam_questions` | annales | the question bank for past Bac papers |

### `skills.lesson` JSONB shape

**v1 (cards) — used by SMB and most SMA skills:**
```json
{
  "cards": [
    {"type": "theory",      "title_fr": "...", "body_fr": "..."},
    {"type": "interactive", "title_fr": "Exploration", "body_fr": "...",
     "widgetType": "function_graph", "config": {...}}
  ]
}
```

> Note: legacy migrations 011/012 wrote `widgetType` (camelCase). The
> Dart `LessonCard.fromJson` accepts EITHER `widget_type` (snake_case,
> canonical) or `widgetType` (legacy). Don't break this.

**v2 (long-form sections) — used for the 7 SMA chapters seeded by 013:**
```json
{
  "version": 2,
  "title_fr": "Limites et continuité",
  "subtitle_fr": "Du concept intuitif au TVI",
  "sections": [
    {
      "kind": "prerequisite",
      "title_fr": "Prérequis",
      "eyebrow_fr": "PRÉREQUIS",
      "estimated_minutes": "3",
      "blocks": [
        {"kind": "paragraph", "md": "..."},
        {"kind": "formula",   "latex": "...", "caption_fr": "..."},
        {"kind": "callout",   "tone": "note", "title_fr": "...", "body_fr": "..."},
        {"kind": "example",   "title_fr": "...", "problem_fr": "...", "steps_fr": ["...","..."], "answer_fr": "..."},
        {"kind": "interactive", "widget_type": "function_graph", "config": {...}, "caption_fr": "..."},
        {"kind": "checkpoint", "title_fr": "...", "questions": [{"stem_fr": "...", "choices_fr": [...], "correct_index": 0, "explanation_fr": "..."}]},
        {"kind": "try_it",    "title_fr": "...", "problem_fr": "...", "hint_fr": "...", "solution_fr": "..."},
        {"kind": "heading",   "text": "...", "level": 2},
        {"kind": "divider"}
      ]
    }
  ]
}
```

Lesson screen dispatch: [lib/screens/subjects/lesson_screen.dart](mobile/bac_app/lib/screens/subjects/lesson_screen.dart) checks `lesson?['version'] == 2`. If yes → `LongLessonScreen`. Else → existing card-stack screen.

### Item types (30+)

`mcq, numeric, short_text, true_false, ordering, fill_blank, matching, multi_step, graph, simulate, drag_point, adjust_slider, sequence, limit, derivative, chain_rule, integration, ipp, complex_mult, diff_eq, recurrence, system, probability, sign_table, motion, projectile, capacitor, rlc, refraction, punnett, dna_replication, cell_division`. Defined in [lib/models/item.dart](mobile/bac_app/lib/models/item.dart).

---

## 7. Interactive widget catalog (33 wired in `lesson_card_widget.dart` switch)

All take `(Item, bool isAnswered, void Function onAnswer)`. They read params from `item.question['sim_config']` or `['graph_config']` if present, else use sensible defaults.

| Slug | File | Domain |
|---|---|---|
| `function_graph` | widgets/math/function_graph_widget.dart | Plot f(x), tangents |
| `derivative_graph` | widgets/math/derivative_graph_widget.dart | Tangent + slope |
| `sequence_viz` | widgets/math/sequence_visualizer_widget.dart | Cobweb / staircase |
| `area_curve` | widgets/math/area_under_curve_widget.dart | Riemann shading |
| `complex_plane` | widgets/math/complex_plane_widget.dart | Argand diagram |
| `complex_multiplication` | widgets/math/complex_multiplication_widget.dart | z₁·z₂ rotation+scaling |
| `chain_rule_visualizer` | widgets/math/chain_rule_visualizer.dart | f(g(x)) decomposition |
| `sign_table` | widgets/math/sign_table_widget.dart | Tableau de variations |
| `probability_tree` | widgets/math/probability_tree_widget.dart | Tree diagrams |
| `limit_calculator` | widgets/math/limit_calculator_widget.dart | Step solver |
| `recurrence_solver` | widgets/math/recurrence_solver_widget.dart | u_{n+1}=f(u_n) |
| `sequence_calculator` | widgets/math/sequence_calculator_widget.dart | Arithmetic/geometric |
| `system_solver` | widgets/math/system_solver_widget.dart | Linear systems |
| `diff_eq_solver` | widgets/math/diff_eq_solver_widget.dart | y'+ay=b |
| `ipp_calculator` | widgets/math/ipp_calculator_widget.dart | Integration by parts |
| `epsilon_delta_visualizer` | widgets/math/epsilon_delta_visualizer_widget.dart | ε-δ shrinking |
| `slope_field` | widgets/math/slope_field_widget.dart | y'=f(x,y) field |
| `monte_carlo_simulator` | widgets/math/monte_carlo_simulator_widget.dart | B(n,p) histogram |
| `euclid_visualizer` | widgets/math/euclid_visualizer_widget.dart | PGCD + Bézout |
| `geometry_3d_viewer` | widgets/math/geometry_3d_viewer_widget.dart | Plane/line/sphere 3D |
| `force_diagram` | widgets/physics/force_diagram_widget.dart | Newton bilan |
| `projectile` | widgets/physics/projectile_simulator_widget.dart | Tir parabolique |
| `circuit` | widgets/physics/circuit_simulator_widget.dart | RC/RL |
| `wave` | widgets/physics/wave_simulator_widget.dart | Ondes + fentes Young |
| `rlc` | widgets/physics/rlc_simulator_widget.dart | Régimes RLC |
| `capacitor_charge` | widgets/physics/capacitor_charge_widget.dart | Charge/décharge |
| `motion_simulator` | widgets/physics/motion_simulator_widget.dart | MRU/MRUV |
| `refraction_simulator` | widgets/physics/refraction_simulator_widget.dart | Snell-Descartes |
| `e_field_uniform` | widgets/physics/e_field_uniform_widget.dart | Oscilloscope cathodique |
| `b_field_uniform` | widgets/physics/b_field_uniform_widget.dart | r=mv/qB circular |
| `nuclear_decay_simulator` | widgets/physics/nuclear_decay_simulator_widget.dart | N(t)=N₀·e^(-λt) |
| `pendulum_lab` | widgets/physics/pendulum_lab_widget.dart | Simple/spring pendulum |
| `am_modulation` | widgets/physics/am_modulation_widget.dart | Carrier+signal+AM |
| `titration_simulator` | widgets/chemistry/titration_simulator_widget.dart | pH=f(V) |
| `acid_base_ph` | widgets/chemistry/acid_base_ph_widget.dart | pH calculator + predominance |
| `equilibrium_qr_k` | widgets/chemistry/equilibrium_qr_k_widget.dart | Qr vs K |
| `kinetics_reactor` | widgets/chemistry/kinetics_reactor_widget.dart | First-order decay |
| `daniell_cell` | widgets/chemistry/daniell_cell_widget.dart | Zn|Zn²⁺‖Cu²⁺|Cu |
| `esterification_animator` | widgets/chemistry/esterification_animator_widget.dart | Yield bars |
| `concept_animation` | widgets/animations/concept_animation_widget.dart | 10 Manim-style animations (eps_delta, local_derivative, integral_as_area, young_slits, resonance, half_life, chemical_equilibrium, magnetic_deflection, complex_rotation, exponential_growth) |
| `punnett_square`, `dna_replication`, `cell_division` | widgets/svt/* | Legacy SMB/SVT |

> ⚠ **Performance gotcha:** the heavier widgets (titration_simulator, e_field_uniform, b_field_uniform, geometry_3d_viewer, slope_field, epsilon_delta_visualizer) run nontrivial compute on every build. **Don't embed them on cold-loaded public pages** — see the landing page incident: a live `epsilon_delta_visualizer` froze the tab on first paint. Use a static painter preview instead. Inside an authed long lesson it's fine; on a marketing landing or anywhere with nested SingleChildScrollViews, it's not.

---

## 8. Recent commits (most recent first)

```
0b01117 fix(landing): replace live epsilon-delta widget with static preview painter
8d6a6e9 feat(web): professional desktop website pass
e8fabef feat(shell): responsive layout for tablet/desktop
ed9b7ce fix(lesson): accept both widget_type and widgetType JSON keys
79ff2b5 Initial commit: BacPrep at SMA interactive layer milestone
```

What each shipped:
- **79ff2b5** — initial git baseline. Covers everything from the SMA interactive layer build (16 native widgets, skill map, migration 012, validator + encoder).
- **ed9b7ce** — fixed silent JSON-key mismatch: migrations wrote `widgetType` but model read `widget_type`, so v1 lesson cards never rendered their interactive widgets. Now accepts either.
- **e8fabef** — first responsive pass: NavigationRail + maxWidth on width ≥ 800. (Later replaced by top nav.)
- **8d6a6e9** — professional desktop pass: public landing page at `/landing`, top nav replaces rail, login split layout, home dashboard cards row, subjects card grid, footer, web typography (display1/2/3).
- **0b01117** — fixed landing page freeze by replacing the embedded live ε-δ widget with a static custom painter.

---

## 9. Common operations

### Build + deploy web to Vercel prod

```powershell
cd f:\APP\mobile\bac_app

$url = (Get-Content .env.production | Where-Object { $_ -match "^SUPABASE_URL=" }) -replace "SUPABASE_URL=", ""
$key = (Get-Content .env.production | Where-Object { $_ -match "^SUPABASE_ANON_KEY=" }) -replace "SUPABASE_ANON_KEY=", ""

& "C:\flutter\bin\flutter.bat" build web --release `
  --dart-define=SUPABASE_URL=$url `
  --dart-define=SUPABASE_ANON_KEY=$key

& "C:\Users\soufiane.lomari\AppData\Local\ms-playwright-go\1.50.1\vercel.cmd" --yes --prod
```

For preview only, swap `--prod` for nothing (default is preview).

### Apply DB migrations to prod

```powershell
cd f:\APP\backend
& "C:\Users\soufiane.lomari\supabase-cli\supabase.exe" db push --include-all
& "C:\Users\soufiane.lomari\supabase-cli\supabase.exe" migration list
```

The CLI is **already authenticated** and the project is linked
(`backend/supabase/.temp/linked-project.json`). No token needed for `db push`.

For one-off SQL queries via Management API, set `SUPABASE_ACCESS_TOKEN` first
(it's at User scope on this machine but isn't always inherited by new
PowerShell processes — re-set if needed via `[Environment]::SetEnvironmentVariable("SUPABASE_ACCESS_TOKEN", "sbp_...", "User")`).

### Validate the SMA skill map

```powershell
& "C:\flutter\bin\dart.bat" f:\APP\shared\validate_skill_map.dart f:\APP\shared\skill_map_sciences_maths_a.json
```

Pass-criteria: 132 ready, 0 unwired, 0 todo, 0 errors.

### Regenerate seed migrations from Dart helpers

```powershell
& "C:\flutter\bin\dart.bat" f:\APP\backend\seed\json_encode_sma.dart f:\APP\shared\skill_map_sciences_maths_a.json f:\APP\backend\supabase\migrations\012_seed_sma_skills_and_lessons.sql

& "C:\flutter\bin\dart.bat" f:\APP\backend\seed\json_encode_long_lessons.dart   # writes 013_long_lessons_sma.sql
```

### Roll back

- **Code**: `git reset --hard <commit>` (we're on `main`, no remote yet).
- **Web**: `vercel rollback` (or use the Vercel dashboard — promote a prior deployment).
- **DB**: migration 013 just `UPDATE`s the `lesson` column of 7 specific skill rows. To revert any one row, re-run the relevant lines from migration 012. There is no "drop migration" — Postgres retains history but you'd need to write a 014 that reverses the change.

---

## 10. Authoring conventions

### Adding a new chapter (long-form v2)

1. Edit [backend/seed/json_encode_long_lessons.dart](backend/seed/json_encode_long_lessons.dart) — add a new `LessonV2`-shaped Dart literal with sections + blocks.
2. Run the encoder:
   ```
   dart backend/seed/json_encode_long_lessons.dart
   ```
   It rewrites `migrations/013_long_lessons_sma.sql`.
3. Apply: `supabase db push`.
4. Local app dev — edits show up after hot-restart (the lesson JSONB is fetched fresh from Supabase).

### Adding a new interactive widget

1. Create `lib/widgets/<domain>/<slug>_widget.dart` — must take `({Item item, bool isAnswered, void Function onAnswer})`.
2. Register in the `_buildInteractiveWidget` switch in [lib/widgets/lesson_card_widget.dart](mobile/bac_app/lib/widgets/lesson_card_widget.dart).
3. Add slug to `wiredSlugs` in [shared/validate_skill_map.dart](shared/validate_skill_map.dart).
4. Reference from any skill's `interactive_resources` in `shared/skill_map_sciences_maths_a.json` with `status: 'ready'`.
5. Re-run validator + encoder + migration if relevant.

### Theme conventions

- Use `Papier.*` color tokens. Don't introduce new colors.
- Use `PapierType.italic / serif / body / smallCaps / mono / display1 / display2 / display3` for text.
- Spacing: prefer `Spacing.xs/sm/md/lg/xl/xxl` (4/8/16/24/32/48).
- For interactive widgets: respect the swipe-gesture absorption pattern (see `lesson_card_widget.dart:193-201`).

---

## 11. Outstanding TODOs / known issues

- **Service worker stickiness on Vercel.** After every deploy, users may need to hard-refresh or open Incognito to bust the cache. The `index.html` already wires `controllerchange` reload, but cached `main.dart.js` is `immutable` — if Flutter doesn't bump the bootstrap hash, users see stale code.
- **ProgressScreen + SettingsScreen still mobile-density** on desktop. Out of scope for the website pass but worth fixing.
- **26 SMA chapters still on v1 cards** — only 7 have been promoted to v2 long-form lessons. Authoring more is the obvious next backlog.
- **Arabic translation** of v2 chapter content not done. Schema supports it (`title_ar`, `body_ar` fields can be added to blocks) but no content is written yet.
- **Checkpoint progress not persisted** — passing a checkpoint is in-memory only. Should write to `user_skill_states` or a new `user_lesson_progress` table.
- **No SEO** — Flutter web SPA, single index.html. If organic search matters, consider prerendering or a static landing.
- **Sign-up flow** is functional but not split-tested. No email verification UX flow yet.

---

## 12. If you're starting a fresh session

1. Read this file in full.
2. `git log --oneline -10` to see what's actually shipped.
3. `cd f:\APP\backend && supabase migration list` to see what DB state matches.
4. Open `https://bacapp.vercel.app` in Incognito to see what users see today.
5. Check `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md` for the most recent plan (may be stale).
6. The user's auto-memory at `C:\Users\soufiane.lomari\.claude\projects\f--APP\memory\` has user/profile context.
