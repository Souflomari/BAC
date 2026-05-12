# BacPrep — Project Status & Session Handoff

**Last updated:** 2026-05-12 (Bac-paper restructure run — Phases 0+1+2+3.1+3.2 SHIPPED: 64 SMA+SMB papers + PC skill tree)
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
- **Arabic translation** of v2 chapter content not done. Schema supports it (`title_ar`, `body_ar` fields can be added to blocks) but no content is written yet.
- **PC + SVT streams** beyond shared models: no skill maps, no v2 lessons.
- **SMB lesson SME review**: 32 chapters shipped 2026-05-09 are pattern-authored v0 drafts from SMA. Each chapter needs a Moroccan Bac SME pass for pedagogical accuracy.
- **SMB annales — real PDFs**: migration 020 ships 8 papers with placeholder `pdf_url` strings (e.g. `bacapp.vercel.app/annales/smb-math-2024-normale.pdf`). User to upload the real Ministry-published PDFs and swap URLs.
- **SMB annales — real questions**: 24 questions in migration 020 are tagged `placeholder` and pattern-authored. Future SME pass should transcribe the actual Bac stems for each paper.
- **Code-splitting**: web bundle currently loads all 50+ interactive widgets at startup. Deferred imports would shrink landing first paint. Deferred from the 2026-05-09 run because of refactor risk.
- **Email-verification redirect gate**: screen exists at `/verify-email` but unverified users can still use the app. Flip on once existing test accounts are manually verified in the Supabase dashboard.
- **Google OAuth**: code path not in place; needs dashboard config + button.
- **Lesson Ctrl+F search-within**: not implemented.
- **A11y a11y / l10n cleanup**: some new widgets bypass `AppLocalizations`; some icon-only `IconButton`s lack `tooltip:`.
- **Past exam papers (annales)**: schema is ready, but no exam paper data has been seeded.

---

## 12. 2026-05-08 — "Apple/Google quality" 5-hour polish run

A focused run targeting perceived-quality gaps. **All 32 SMA chapters were
already live as v2 long-form** before this run; this pass made the surrounding
shell feel finished.

### Migrations applied
- **015_user_lesson_progress.sql** — `(user_id, skill_id) → passed_keys jsonb`
  with RLS policies. Persists checkpoint passes across sessions.

### New widgets / providers
- `lib/widgets/empty_state.dart` — Papier-styled empty state (icon + italic
  headline + body + optional CTA). Used in subjects list, progress,
  exam browser.
- `lib/widgets/global_error_boundary.dart` — `GlobalErrorBoundary.install()`
  swaps red Flutter `ErrorWidget` with a friendly Papier pane in production.
  Wired in `main.dart`.
- `lib/widgets/papier/papier_toast.dart` — `PapierToast.show/note/success/warning/error`
  via OverlayEntry. Cream surface, ink border, color bar by tone, 3s auto-dismiss.
  Replaces Material `showSnackBar` calls.
- `lib/widgets/global_search.dart` — `GlobalSearchOverlay.toggle/open/close`.
  Cmd/Ctrl+K modal. Searches subjects + topics + skills via existing providers
  (`subjectsProvider`, `allTopicsProvider`, `allSkillsProvider`). Keyboard nav
  ↑↓/Enter/Esc.
- `lib/providers/lesson_progress_provider.dart` —
  `LessonProgressNotifier extends FamilyAsyncNotifier<Set<String>, String>`
  with debounced (800ms) upsert to `user_lesson_progress`. Plus
  `continueLearningProvider` returning the most-recent in-progress lesson.

### New screens / routes
- `/profile` → `lib/screens/profile/profile_screen.dart`. 76×76 initial
  avatar, name/email/joined-date, three stat cards (Série, XP, Maîtrisées),
  links to /progress, /settings, /exams, /analytics. Responsive 2-col on
  width ≥ 900.

### Modified
- `lib/screens/subjects/long_lesson_screen.dart` — checkpoint state moved
  from `Map<String, bool>` in-memory to provider-backed `Set<String>`.
  `_PrevNextNav` + `_NavCard` widgets at end-of-lesson for chapter siblings.
- `lib/screens/subjects/lesson_screen.dart` — skeleton on loading,
  `ErrorRetryWidget` on error.
- `lib/screens/subjects/subjects_screen.dart` — empty state, skeleton,
  hover lift on `_ChapterCard`.
- `lib/screens/progress/progress_screen.dart` — `ErrorRetryWidget`,
  `LayoutBuilder` 2-col at width ≥ 900.
- `lib/screens/settings/settings_screen.dart` — grouped sections (COMPTE,
  PRÉFÉRENCES, À PROPOS), profile preview tappable → `/profile`.
- `lib/screens/home/home_screen.dart` — `_ContinueLearningCard` wired to
  `continueLearningProvider` between Fleuron and quests.
- `lib/config/router.dart` — `_papierPage()` helper (180ms fade + 4px slide)
  replaces `NoTransitionPage` on tab routes. New `/profile` route.
- `lib/widgets/papier/papier_top_nav.dart` — search icon (authed only),
  `_ThemeToggleButton` (3-state cycle).
- `lib/app.dart` — `_GlobalShortcuts` wraps the router for Cmd/Ctrl+K and
  Cmd/Ctrl+/ → `GlobalSearchOverlay.toggle`.
- `lib/main.dart` — `GlobalErrorBoundary.install()` first.
- `lib/providers/progress_provider.dart` — `allTopicsProvider`,
  `allSkillsProvider` (memoized aggregators, fuel global search).

### Resolved from prior outstanding list
- ~~ProgressScreen + SettingsScreen mobile-density~~ — both now responsive.
- ~~Checkpoint progress not persisted~~ — migration 015 + provider lands it.
- ~~Inconsistent loading / silent empty / raw error~~ — skeletons,
  EmptyState, ErrorRetryWidget applied across primary screens.
- ~~No global search~~ — Cmd/Ctrl+K modal lives.
- ~~No theme toggle in top nav~~ — added.
- ~~No dedicated profile screen~~ — `/profile` lives.
- ~~No "continue learning" affordance~~ — home card.
- ~~Snap tab transitions~~ — papierPage fade-slide.

---

## 13. 2026-05-09 — "tackle everything at once" run

Targeted the four blocker categories the prior audit surfaced: account
hygiene, observability, lesson UX, and coverage tail. Bundle-size
code-splitting and Ctrl+F-in-lesson were both deferred (high refactor
risk for an autonomous run). Live in production at the same URL.

### Migrations applied
- **016_storage_avatars.sql** — `avatars` storage bucket (public read,
  owner write/update/delete on `{user_id}/...` path).

### Edge functions deployed
- **delete-self-account** — `backend/supabase/functions/delete-self-account/index.ts`.
  Service-role client; cascades via FKs and finally calls
  `auth.admin.deleteUser()`. Caller is identified by JWT, never by body
  parameter, so users can only delete themselves.

### New screens / widgets / providers / utils
- `lib/screens/auth/verify_email_screen.dart` — post-signup destination.
  "Renvoyer le lien" calls `auth.resend(type: signup, ...)`. "Continuer"
  goes to `/onboarding`. **No global redirect gate** — preserves access
  for existing test accounts.
- `lib/screens/profile/edit_profile_sheet.dart` — bottom sheet for
  editing display name + avatar. Uses `image_picker` to pick a 512×512
  JPEG, uploads via `apiService.uploadAvatar()` to the new bucket,
  patches `profiles.avatar_url`.
- `lib/widgets/keyboard_help_dialog.dart` — Papier-styled list of
  shortcuts. Bound to `?` (Shift+/) globally.
- `lib/services/analytics_service.dart` — thin PostHog wrapper. Every
  method no-ops when `POSTHOG_API_KEY` is empty at build time.
- `lib/utils/print_helper.dart` (+ web/stub variants) — `printPage()`
  calls `dart:html` `window.print()` on web, no-op elsewhere.

### Modified
- `pubspec.yaml` — added `image_picker`, `sentry_flutter`, `posthog_flutter`.
- `lib/main.dart` — Sentry init guarded by `SENTRY_DSN` env;
  `Analytics.init()` runs unconditionally (no-op if key empty).
- `lib/app.dart` — `?` shortcut + `_HelpIntent` → `KeyboardHelpDialog.show`.
- `lib/config/router.dart` — new `/verify-email` route; `isPublic` set
  extended.
- `lib/screens/auth/login_screen.dart` — sign-up routes to
  `/verify-email?email=…` instead of `/onboarding`. Fires
  `signup_completed` / `login_completed` analytics.
- `lib/services/api_service.dart` — `patchProfile`, `uploadAvatar`,
  `deleteSelfAccount`.
- `lib/providers/auth_provider.dart` — `updateDisplayName`,
  `uploadAvatar`, `deleteSelfAccount` exposed; `Analytics.identify` on
  signedIn; `Analytics.reset` on signOut.
- `lib/models/profile.dart` — `copyWith` now preserves `avatarUrl`;
  new `Profile.patchJson` for partial updates.
- `lib/screens/profile/profile_screen.dart` — header avatar renders
  `NetworkImage` when set; tap → `EditProfileSheet`. New "Modifier →"
  link.
- `lib/screens/settings/settings_screen.dart` — "Supprimer mon compte"
  entry with double-confirm dialog (must type DELETE). Stream-switch
  now goes through a confirmation dialog.
- `lib/widgets/papier/papier_top_nav.dart` — profile menu renders
  `NetworkImage` avatar when set; on width < 800, tapping opens a
  bottom sheet with Profil / Paramètres / Se déconnecter (instead of
  the desktop popup menu).
- `lib/screens/subjects/long_lesson_screen.dart` — Imprimer button in
  header. Fires `lesson_opened` and `checkpoint_passed` analytics.
- `lib/screens/exams/{exam_browser,exam_detail,exam_results}_screen.dart`
  + `lib/screens/leaderboard/leaderboard_screen.dart` — replaced
  `CircularProgressIndicator` and raw `Text('$e')` with skeletons +
  `ErrorRetryWidget`. Added designed empty states for the leaderboard
  and exam-browser zero-data cases.
- `lib/screens/onboarding/stream_selection_screen.dart` — step
  indicator was lying about "ÉTAPE 2 / 4"; now reads "2 / 2".
- `mobile/bac_app/web/index.html` — print CSS (white bg, no loader).
- `mobile/bac_app/web/robots.txt`, `web/sitemap.xml` — new.

### Resolved from prior outstanding TODOs
- ~~Sign-up email verification UX~~ — `/verify-email` screen lives.
  (Global redirect gate is still deferred; documented under §11.)
- ~~Avatar uploads~~ — bucket + upload flow + render in profile + nav.
- ~~No SEO~~ — robots.txt + sitemap.xml shipped.
- ~~Account deletion (GDPR/store)~~ — flow + edge function shipped.
- ~~No error monitoring~~ — Sentry SDK wired (set `SENTRY_DSN` to enable).
- ~~No analytics events~~ — PostHog SDK wired with key events.
- ~~Mobile-density profile menu~~ — bottom sheet on mobile.
- ~~Onboarding step counter mismatch~~ — fixed to truthful 2/2.

### Deferred from this run (recorded for next session)
- **C — Bundle code-splitting**: deferred `as` imports for the 50+
  interactive widgets in `lib/widgets/lesson_card_widget.dart`.
  High refactor risk; would need its own focused session.
- **D.2 — Ctrl+F search-within-lesson**: building a paragraph-text
  index + match highlight + scroll-to-match overlay. Deferred.
- **E.4 — Hardcoded FR strings → l10n**: cosmetic; new widgets have
  hardcoded strings consistent with the pre-existing pattern.
- **E.5 — Add `tooltip:` to all icon-only buttons**: cosmetic a11y pass.
- **A.5 — Google OAuth**: needs Supabase dashboard config in same
  sitting; revisit when ready.
- **Tighten email verification**: once existing test accounts are
  manually confirmed in the dashboard, add the redirect gate for
  `emailConfirmedAt == null`.

### Manual release-checklist (one-time setup the user does)
- Provision Sentry project; set `SENTRY_DSN` in Vercel env.
- Provision PostHog project; set `POSTHOG_API_KEY` in Vercel env.
- (When ready) configure Google OAuth in the Supabase dashboard.

---

## 14. 2026-05-09 — Content run: SMB lessons + SMA items + SMB annales

This run was content-only — no Flutter/Dart code changed. The previous
engineering and UX runs left an obvious gap: depth across streams.
Three migrations land here.

### Migrations applied
- **017_long_lessons_smb.sql** — 32 SMB v2 long-form lessons.
  Generated by new encoder `backend/seed/json_encode_long_lessons_smb.dart`.
  Pattern-authored from validated SMA equivalents with one notch
  lower depth. Targets the existing SMB skill codes seeded in
  `seed_data.sql` (`arithmetic_seq`, `kinematics`, `acid_base`, etc.).
- **018_items_sma_specific.sql** — 129 quiz items across 32 SMA-specific
  (`sma_*`) skills that previously had ZERO items. Generated by new
  encoder `backend/seed/json_encode_items_sma.dart`. Item UUID series
  `44444444-aaaa-*`. Mix of MCQ + numeric drawn from each chapter's
  v2 lesson checkpoints.
- **020_smb_annales.sql** — 8 SMB exam papers (Math + PC, 2023+2024,
  normale + rattrapage) + 24 pattern-authored exam questions (3 per
  paper). UUID series `a1b2c3d4-bbbb-*` (exams) and `b1b2c3d4-bbbb-*`
  (questions). All items tagged `placeholder` so a future SME pass
  can swap real Bac stems in. PDF URLs are placeholders pointing at
  `bacapp.vercel.app/annales/*` paths the user will fill in.

### Migration 019 — SMB items gap-fill (SKIPPED)
The plan reserved 019 for "SMB-specific skills missing items," but
the audit found that all 32 SMB skills (UUIDs `33333333-0000-0000-0000-000000000001..032`)
already have 12-13 items each in 009/010. No gap to fill. 019 is
left available for a future content sprint (e.g., harder items,
Bac-style multi-step problems).

### Volume

| Artifact | Count |
|---|---|
| SMB v2 lessons | 32 chapters (1,392 lines of Dart) |
| SMA items | 129 new items |
| SMB exam papers | 8 |
| SMB exam questions | 24 |

### Honest disclaimer (kept here for SMEs)

Every artifact in this run is a **credible v0 draft** authored by
pattern from validated SMA content. Treat as reviewable starting
material, not finished pedagogy:

- **SMB lessons**: each chapter mirrors the SMA section structure
  with reduced depth. Subject-matter review chapter-by-chapter is
  required before declaring "ship-quality."
- **SMA items**: drawn from the v2 lesson checkpoints. Should be
  correct, but spot-check the answer keys.
- **SMB annales**: stems are pattern-authored, NOT real Ministry
  exam content. The PDF URLs are placeholders. A real SME must:
  1. Replace the `pdf_url` placeholders with actual Bac PDF
     URLs (taalime.ma / sigmaths.net / Ministry hosts).
  2. Optionally swap the 24 `placeholder`-tagged questions for
     transcribed real Bac stems.

### Resolved from prior outstanding TODOs
- ~~SMB long-form chapters: only SMA stream has v2 long-form~~ — closed.
- ~~Items expansion: many SMA chapters lack quiz items~~ — sma_* gap closed.
- ~~Past exam papers (annales): zero seeded for SMB~~ — 8 papers + 24 questions.

### New deferred work (in §11)
- SMB lesson SME review (chapter-by-chapter).
- Real Bac PDF URLs for SMB annales (8 papers).
- Real exam question stems to replace the 24 patterned ones.
- 019 reserved for harder/Bac-style multi-step SMB items.

---

## 15. 2026-05-09 — Integral run (defer-cleanup + production-quality + features + docs)

Touched all four axes the user asked for. The run focuses on closing
loose ends from previous runs and adding the production-grade layer
(tests + CI + docs) that was previously absent. Live in production.

### Defer cleanup (closes "DEFERRED" tags)
- **Ctrl+F lesson search** — `lib/widgets/lesson_find_bar.dart` + state
  in `_LongLessonScreenState`. Sticky bar opens on Cmd/Ctrl+F, walks
  paragraph/heading/callout/example text, highlights matching sections
  with a yellow rule on the active match. Keyboard nav (↑/↓, Esc).
- **A11y tooltips** added to icon-only `IconButton`s in
  `function_graph_widget`, `area_under_curve_widget`,
  `complex_plane_widget`, `exam_practice_screen`. Other widgets had
  tooltips already.
- **Email-verify soft gate** — `lib/widgets/email_verify_banner.dart`
  rendered inside `AppShell` on every authed tab. Dismissable +
  re-send button. Hard router gate stays off (low risk for existing
  test accounts).

### Production quality
- **Test suite baseline** — 23 tests pass: existing models/items +
  new `test/models/profile_test.dart` (12 cases) and
  `test/models/lesson_v2_test.dart` (5 cases). Fixed a pre-existing
  type-cast flake in `item_test.dart`.
- **CI** — `.github/workflows/ci.yml` runs `flutter analyze
  --no-fatal-infos` + `flutter test` + `flutter build web` on every
  push and PR. Uses `subosito/flutter-action@v2`.

### Feature growth
- **Share** — `lib/utils/share_helper.dart` (+ web/stub variants) with
  a `sharePage(title, url)` API. Web copies the URL via
  `navigator.clipboard.writeText` (or legacy `execCommand` fallback)
  and toasts. New share icon in long-lesson header.
- **Daily reminders** — already wired (NotificationService +
  `/settings/notifications`). Verified reachable.

### Documentation
- **`README.md`** — high-level orientation, stack, layout, where to
  start reading code.
- **`ARCHITECTURE.md`** — frontend layers (routing, state, models,
  services, design system, interactive widgets) + backend layers
  (DB migrations, edge functions, seed authoring) + lifecycle
  flows.
- **`CONTRIBUTING.md`** — toolchain, run instructions, code style,
  migration rules, content authoring, testing, commit conventions.
- **`CHANGELOG.md`** — user-facing release notes.
- **`/docs` route** — `lib/screens/docs/docs_screen.dart`. Papier-styled
  in-app changelog + roadmap. Linked from settings → "Notes de
  version". Public route (works pre-auth).

### Deferred from this run (recorded for next session)
- **Phase A.2 — code-splitting** of the 50+ interactive widgets via
  deferred imports. Requires converting synchronous switch returns to
  FutureBuilder, high refactor risk for an autonomous run.
- **Phase A.3 — l10n FR→AR** for new widgets (PapierToast, EmptyState,
  GlobalSearch, etc.). Cosmetic; current hardcoded FR is consistent
  with the rest of the codebase.
- **Phase B.3 — Lighthouse audit** measurement and fixes. Could be a
  10-minute follow-up once the user runs Lighthouse in their browser
  and shares the report.
- **Phase C.2 — Hive offline cache** for v2 lessons. CacheService +
  Hive boxes are already plumbed; needs a read-through wrapper around
  `apiService.getSkillById`.
- **Phase C.4 — Premium feature flag scaffold**. Requires product
  decisions on what's free vs. premium.

---

## 16. 2026-05-09 — Solution depth expansion run (ALL 4 phases shipped)

User feedback was that exam solution steps were too terse — typically
80–150 chars per step, just enough to name the technique. Approved
plan was to expand all step/explanation prose across four content
surfaces to ~5× depth (400–700 chars per step, full textbook-style
paragraphs).

### Phase 1 — Exam question solutions (SHIPPED)
- **Migration 023** (`UPDATE public.exam_questions`) overwrites the
  answer JSONB for all 80 SMB exam questions inserted by 021.
- **Migration 024** does the same for all 80 SMA questions from 022.
- New encoders at `backend/seed/json_encode_exam_solutions_smb_v2.dart`
  and `backend/seed/json_encode_exam_solutions_sma_v2.dart`.
- Each step text now follows the rubric: name the situation → state
  why naive approach fails → justify the chosen technique → walk
  through the calculation in narrative form → conclude.
- Per-question additions: corrigé-style `gradingNotes`, expanded
  `commonMistakes[]` with explicit counter-examples, pattern-level
  `tips[]`.
- Total content authored: ~340 KB of pedagogical French prose,
  hand-written context-aware for each question's specific
  math/physics/chemistry topic.
- Live in prod, verified by direct REST query.

### Phase 2 — Try-it block solutions (SHIPPED)
8 try-it blocks expanded total: 4 SMB (in migration 026) + 4 SMA (in
migration 028). Hint went from ~80 chars to ~150–250 chars (orient
+ nudge); solution went from ~120–200 chars to ~450–600 chars (full
worked solution with commentary). Folded into the Phase 3 encoders.

### Phase 3 — Lesson checkpoint explanations (SHIPPED)
~263 checkpoint MCQ explanations expanded surgically via PL/pgSQL
helper functions, **without re-emitting the full 4,500-line lesson
encoder fork** that we wanted to avoid.
- **Migration 025** (Dart encoder `json_encode_lesson_explanations_v2.dart`):
  authored 70 SMB-style + 70 SMA-style checkpoint expansions and 9
  try-its. The encoder mistakenly used unprefixed skill codes for the
  SMA half — only the 4 SMB rows matched. Caught at verification time;
  rest delivered by 028.
- **Migration 026**: 70 SMB checkpoint expansions + 4 try-its applied
  to all SMB skill codes (arithmetic_seq, limit_calc, deriv_apps, etc.).
- **Migration 028** (Python encoder `encode_sma_lesson_explanations.py`):
  the proper SMA delivery — 194 expansions targeting all 32 sma_*
  skills with full lesson trees, plus the 4 SMA try-its.

The PL/pgSQL helpers `_patch_cp_*` and `_patch_tryit_*` walk the
lesson JSONB structure (sections → blocks → questions), match by
`stem_fr` or `problem_fr`, and apply `jsonb_set` surgically.
Idempotent: re-running the migration is a no-op if content is
already up-to-date. Functions are dropped at the end of the
migration to keep the schema clean.

Coverage: 100% of SMB chapters, 100% of SMA chapters with full
lesson trees. Original explanation lengths were 30–100 chars
(one-liners); new lengths are 200–350 chars per checkpoint
explanation (3–4× expansion), with full prose for every try-it
hint and solution. Total content added: ~85 KB of pedagogical
French prose across the lesson surface.

### Phase 4 — Quiz items expansion (SHIPPED — Tier A)
- **Migration 027** (`UPDATE public.items`) via Dart encoder
  `json_encode_items_sma_v2.dart` overwrites the explanation JSONB
  for all 129 SMA-specific items inserted by migration 018.
- Each item now has 200–400 char `text_fr` + a 2–3 step worked
  solution array. Original had 30–80 char one-liners.
- Coverage: all 32 SMA-specific skills (limits, derivatives,
  sequences, ln/exp, primitives, ODEs, complex, vectors 3D,
  counting, divisibility, all 14 physics topics, all 6 chemistry
  topics).

**Tier B deferred**: 587 legacy items across migrations 009/010
(SMB math + physics). These already had decent text_fr (150–280
chars) for the most part, so the expansion priority was lower.
A future targeted sweep can apply the same `text_fr < 150` filter
to expand only the bare ones.

### Final shipping summary

| Phase | Migration | Surface | Field count | Total prose added |
|---|---|---|---|---|
| 1 | 023 | SMB exam steps + meta | 80 questions × ~3.4 steps | ~170 KB |
| 1 | 024 | SMA exam steps + meta | 80 questions × ~3.4 steps | ~170 KB |
| 2+3 | 025 | SMA-style checkpoints (no-op for SMA) + try-its | ~5 hits | ~3 KB |
| 2+3 | 026 | SMB checkpoints + try-its | 70 + 4 | ~25 KB |
| 2+3 | 028 | SMA checkpoints + try-its (corrected) | 194 + 4 | ~60 KB |
| 4 | 027 | SMA items text_fr + steps[] | 129 items | ~55 KB |
| **TOTAL** | | | | **~485 KB** |

All migrations verified by direct REST query against the live
database — explanations average 240–350 chars (vs. original 30–100
chars), try-it solutions 450–600 chars, exam step text 400–700 chars.

### Honest disclaimer (carried over from previous content runs)

Every expanded explanation in this run is a **credible v0
pedagogical draft** authored by pattern. The math identities,
formulas, and step ordering carry over verbatim from the
user-validated terse versions, but the new explanatory prose
between steps is freshly authored by an LLM, not a Moroccan Bac
SME. Treat as reviewable starting material, not finished pedagogy.
A future SME pass can rewrite specific explanations chapter by
chapter; the encoder format makes this cheap.

---

## 17. 2026-05-11 — Bac-paper restructure run (IN PROGRESS, multi-session)

User feedback: existing course structure (LessonV2 sections + checkpoints
+ try-it) was too granular and academic. Moroccan Bac students learn from
real exam papers, not divided concept sections. **Every chapter should
become a full topic-coherent Bac-style paper** with 4–5 multi-part
exercices and fully-worked solutions. Plus build PC + SVT streams from
scratch. Plus rebuild annales as proper multi-exercice structures.

Scope: 64 existing chapters restructured (SMA + SMB) + ~55 new
(PC + SVT) + 32 annales = **~150 full Bac papers**, each ~10 KB of
worked solutions = realistically a 20+ hour autonomous run.
Multi-session by necessity.

### Phase 0 — Schema + frontend (SHIPPED, 2026-05-11)

- **Migration 029**: `ALTER TABLE skills ADD COLUMN exam_paper JSONB`
  + partial GIN index for fast NOT-NULL filter. Schema documented in
  COLUMN comment.
- **Frontend model** [exam_paper.dart](mobile/bac_app/lib/models/exam_paper.dart):
  sealed-class shape (ExamPaper, Exercice, Question, Subpart,
  QuestionSolution, SolutionStep) mirroring LessonV2.
- **Widgets** [exam_paper_view.dart](mobile/bac_app/lib/widgets/exam_paper/exam_paper_view.dart):
  full renderer with collapsible exercice cards, numbered Q1/Q2/Q3,
  lettered a/b/c subparts, reuse of AnimatedSolution for stagger-fade
  reveals. Papier-styled throughout.
- **lesson_screen.dart + long_lesson_screen.dart**: detect exam_paper
  presence and append ExamPaperView after LessonV2 sections (single
  scroll). Analytics events fired: exam_paper_opened, exercice_expanded,
  solution_revealed.
- **skill.dart**: parses skills.exam_paper into examPaperRaw.

### Phase 1 — SMA exam papers (SHIPPED, 32/32)

[Migration 030](backend/supabase/migrations/030_exam_papers_sma.sql)
+ [encoder](backend/seed/json_encode_exam_papers_sma.dart) ships full
topic-coherent Bac papers for all 32 SMA chapters:

- **Math (11)**: sma_limit_def, sma_deriv_definition,
  sma_sequences_review, sma_ln_basics, sma_exp_basics, sma_primitives,
  sma_ode_first_order, sma_complex_basics, sma_vectors_3d, sma_counting,
  sma_divisibility.
- **Physique (14)**: sma_newton_laws, sma_rlc_regimes, sma_wave_basics,
  sma_periodic_waves, sma_nuclear_radioactivity, sma_rc_charge_discharge,
  sma_rl_establishment, sma_forced_oscillations, sma_am_basics,
  sma_projectile_motion, sma_e_field_basics, sma_b_field_basics,
  sma_pendulum_simple, sma_kinetic_potential.
- **Chimie (7)**: sma_ph_definition, sma_titration_curve,
  sma_reaction_speed, sma_reversible_basics, sma_qr_k,
  sma_daniell_cell_basics, sma_esterification_mechanism.

Each paper: 4–5 exercices, ~20 points total, ~90 min duration, multi-part
questions with verified worked solutions at 023/024 depth (400–700 chars
per step). ~7–11 KB JSONB each. Total: ~280 KB of pedagogical prose.

### Phase 2 — SMB exam papers (SHIPPED, 32/32)

[Migration 031](backend/supabase/migrations/031_exam_papers_smb.sql)
+ [encoder](backend/seed/json_encode_exam_papers_smb.dart) ships full
topic-coherent Bac papers for all 32 SMB chapters (unprefixed skill
codes, one notch lower mathematical sophistication than SMA).

- **Math (23)**: arithmetic_seq, geometric_seq, seq_convergence,
  seq_recursive, seq_adjacent, limit_def, limit_calc, continuity, tvi,
  deriv_basic, deriv_rules, deriv_apps, primitives, definite_integral,
  integral_apps, prob_basic, conditional_prob, random_variables,
  complex_basics, complex_trig, complex_geometry, ode_first_order,
  ode_second_order.
- **Physique (7)**: kinematics, newtons_laws, energy, wave_properties,
  sound_light, rc_rl_circuits, rlc_oscillations.
- **Chimie (2)**: acid_base, redox.

64/64 SMA+SMB chapters now have full Bac papers in skills.exam_paper.
Verified in live DB (64 rows non-null).

### Phase 3 — PC stream (PARTIALLY SHIPPED)

- **3.1 — Skill map** ([shared/skill_map_pc.json](shared/skill_map_pc.json)):
  shipped. 28 PC skills under 15 topics (8 math + 7 physique-chimie).
  Validates clean.
- **3.2 — Skill seed** ([Migration 032](backend/supabase/migrations/032_seed_pc_skills.sql)):
  shipped. PC users on onboarding → "Sciences Physiques" now see a
  full subject tree. Topics + skills + 21 prerequisite edges +
  31 minimal LessonV2 stub placeholders.
- **3.3 — Full PC lessons** ([Migration 033](backend/supabase/migrations/033_long_lessons_pc.sql)):
  **✅ COMPLETE**. All 31 PC stub lessons upgraded to full LessonV2 content
  (concept + example_walkthrough sections, paragraphs, formulas, examples,
  checkpoints with 3 mcq each). Encoder: [json_encode_long_lessons_pc.dart](backend/seed/json_encode_long_lessons_pc.dart).
- **3.4 — PC exam papers** ([Migration 034](backend/supabase/migrations/034_exam_papers_pc.sql)):
  **✅ COMPLETE**. All 31 PC chapters now have full Bac-style exam
  papers in `skills.exam_paper` (15 math + 16 physique-chimie),
  authored at SMB-equivalent depth in
  [json_encode_exam_papers_pc.dart](backend/seed/json_encode_exam_papers_pc.dart)
  (~6200 lines). PC chapters with no SMA/SMB equivalent (AM modulation,
  radioactivity, reaction kinetics, pendulum, esterification, Daniell
  cell) authored from scratch using domain references. DB verified:
  95 total exam papers across all streams (32 SMA + 32 SMB + 31 PC).
- **3.5 — PC items** (migration 035): NOT STARTED.
- **Phase 4 — SVT stream**: **✅ SHIPPED in full** (migrations 036–039).
  - 4.1 [shared/skill_map_svt.json](shared/skill_map_svt.json): 25 skills, 12 topics, 9 prereqs across math/PC/SVT.
  - 4.2 [Migration 036](backend/supabase/migrations/036_seed_svt_skills.sql): seed skills + topics + prereqs + stub lessons.
  - 4.3 [Migration 037](backend/supabase/migrations/037_long_lessons_svt.sql): full v2 lessons for all 25 SVT chapters. 12 bio/geo novel.
  - 4.4 [Migration 038](backend/supabase/migrations/038_exam_papers_svt.sql): 25 SVT exam papers in `skills.exam_paper`.
  - 4.5 [Migration 039](backend/supabase/migrations/039_items_svt.sql): 200 quiz items (mcq + numeric).
  - **CRITICAL: bio/geo content (12 chapters across 4 sub-phases) authored from first principles** — REQUIRES SME PASS before declaring SVT ship-quality.
- **Phase 5**: Annales v2 (proper multi-exercice structure). Migrations
  040 (SMB) + 041 (SMA) + 042 (PC) + 043 (SVT). Each Bac paper becomes
  one exam_question row carrying the full multi-exercice JSONB.
- **Phase 6**: Tests (exam_paper model + widget), PostHog events
  (already wired but need verification), final PROJECT_STATUS update.

### Continuation instructions (for the next session)

When picking up this run:

1. `cd f:/APP && git log --oneline -15` — see the latest commits
   (look for "Phase X batch Y").
2. Check DB state: `SELECT code, length(exam_paper::text) FROM skills
   WHERE exam_paper IS NOT NULL ORDER BY code;`
3. Continue authoring in
   [json_encode_exam_papers_smb.dart](backend/seed/json_encode_exam_papers_smb.dart):
   - Add a `_paperXxx()` function for each remaining chapter.
   - Append to the `_papers` registry.
   - Run encoder: `dart backend/seed/json_encode_exam_papers_smb.dart`.
   - Apply: `supabase db query -f backend/supabase/migrations/031_exam_papers_smb.sql --linked`.
   - Verify count, commit every 4–6 chapters.
4. After SMB complete, start Phase 3 (PC stream): see Critical files
   list in the approved plan at
   `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md`.

### Honest disclaimer

Every exam paper authored in this run is a **v0 pedagogical draft**.
Math/physics/chemistry solutions are verified against known formulas
and identities (the run protocol requires 2-pass verification —
draft + independent re-derivation). The SVT biology/geology chapters
(Phase 4) will require an SME pass — those are entirely novel
authoring with no validated source.

---

## 18. If you're starting a fresh session

1. Read this file in full.
2. `git log --oneline -10` to see what's actually shipped.
3. `cd f:\APP\backend && supabase migration list` to see what DB state matches.
4. Open `https://bacapp.vercel.app` in Incognito to see what users see today.
5. Check `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md` for the most recent plan (may be stale).
6. The user's auto-memory at `C:\Users\soufiane.lomari\.claude\projects\f--APP\memory\` has user/profile context.
