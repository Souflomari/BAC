# BacPrep — Project Status & Session Handoff

**Last updated:** 2026-05-09 (after integral run: defer-cleanup + tests + CI + docs)
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

## 16. If you're starting a fresh session

1. Read this file in full.
2. `git log --oneline -10` to see what's actually shipped.
3. `cd f:\APP\backend && supabase migration list` to see what DB state matches.
4. Open `https://bacapp.vercel.app` in Incognito to see what users see today.
5. Check `C:\Users\soufiane.lomari\.claude\plans\ok-for-now-we-mutable-quiche.md` for the most recent plan (may be stale).
6. The user's auto-memory at `C:\Users\soufiane.lomari\.claude\projects\f--APP\memory\` has user/profile context.
