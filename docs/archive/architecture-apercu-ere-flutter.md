# BacPrep Architecture

## Overview

BacPrep is a Moroccan Baccalaureate exam preparation app built with **Flutter** (frontend) and **Supabase** (backend). It uses spaced repetition and adaptive difficulty to help students master exam skills efficiently.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Flutter 3.x + Dart |
| State Management | Riverpod (StateNotifier) |
| Navigation | GoRouter (ShellRoute for bottom nav) |
| Backend | Supabase (PostgreSQL + Edge Functions) |
| Auth | Supabase Auth (email/password) |
| LaTeX Rendering | flutter_math_fork + custom RichTextRenderer |

## Project Structure

```
mobile/bac_app/lib/
  config/         # Theme, router, constants
  models/         # Data models (Item, Session, AnswerResult, etc.)
  providers/      # Riverpod providers (auth, session, progress)
  screens/        # Screen widgets organized by feature
    session/      # Quiz session screen
    home/         # Dashboard
    lessons/      # Lesson viewer
    profile/      # User profile
  services/       # API service (Supabase client wrapper)
  widgets/        # Reusable widgets
    math/         # Interactive math widgets (graphs, sequences, complex plane)
    physics/      # Physics simulators (motion, circuits, waves, forces)

backend/
  supabase/functions/
    submit-answer/  # SRS + XP computation edge function
    next-session/   # Session generation edge function
  seed/             # SQL seed files for lesson/item content
```

## Data Models

### Items (JSONB)

Items are quiz questions stored in the `items` table. The `question`, `explanation`, and `hint` fields are JSONB:

```json
{
  "question": {
    "stem": "Calculer la derivee de f(x) = x^2",
    "stem_ar": "...",
    "latex": true,
    "choices": ["2x", "x", "x^2", "2"],
    "correct_index": 0,
    "figure": { "type": "latex", "content": "..." },
    "graph_config": { "function": "x^2", "mode": "derivative", ... },
    "sim_config": { "type": "kinematics", "scenario": "freeFall", ... }
  },
  "explanation": {
    "text_fr": "La derivee de x^n est nx^{n-1}",
    "steps": ["Identifier la regle", "Appliquer: 2x^1 = 2x"],
    "reference": "skill_id_ref",
    "figure": { ... },
    "wrong_choice_explanations": [null, "Confond x^2 avec x", ...],
    "why_prompt": "Pourquoi la regle des puissances fonctionne ?",
    "why_answer": "Elle decoule de la definition...",
    "what_if": {
      "prompt": "Et si f(x) = x^3 ?",
      "answer": "f'(x) = 3x^2"
    }
  },
  "hint": {
    "text_fr": "Pensez a la regle des puissances: d/dx(x^n) = nx^{n-1}"
  }
}
```

### Item Types

30+ types including: `mcq`, `numeric`, `true_false`, `graph`, `simulate`, `drag_point`, `adjust_slider`, and domain-specific types (`derivative`, `integration`, `sequence`, `limit`, `projectile`, `capacitor`, `rlc`, etc.)

### Skill States

Each user-skill pair has a state in `user_skill_states`:

| Field | Description |
|-------|-----------|
| `half_life_hours` | SRS half-life (starts 24h, grows on correct, shrinks on incorrect) |
| `mastery` | locked / novice / developing / proficient / master |
| `num_attempts` | Total attempts on this skill |
| `num_correct` | Total correct |
| `current_streak` | Current consecutive correct answers |
| `estimated_ability` | Estimated ability level (1-5) |
| `last_reviewed_at` | Last review timestamp |

## Answer Lifecycle

```
User taps answer
  -> [MCQ: select, then tap "Valider" to confirm]
  -> SessionScreen._onAnswer()
  -> SessionNotifier.submitAnswer(isCorrect, userAnswer, hintUsed)
  -> ApiService.submitAnswer() -> Edge Function submit-answer
  -> Edge Function:
     1. Fetch current skill state + item difficulty
     2. Compute SRS update (half-life, ability, streak)
     3. Compute XP (base * difficulty + speed bonus + streak bonus)
        * If hint_used: XP *= 0.7
     4. Compute mastery transition
     5. Persist: user_skill_states, user_item_history, daily_activity, total XP
     6. Check badges (streak: 5/10/30, mastery: 1/5/10)
     7. Return: xp_earned, mastery, streak, explanation, badges_earned
  -> If badges earned: show BadgeCelebrationDialog
  -> Show ExplanationPanel with:
     - Correct/Incorrect + XP earned
     - Contrastive feedback (MCQ wrong: why wrong + why correct)
     - Explanation text (with LaTeX via RichTextRenderer)
     - Step-by-step reveal (progressive disclosure)
     - Mastery meter
     - Elaborative prompts ("Pourquoi ?", "Et si...?")
     - Lesson reference link
  -> User taps "Suivant" -> next item
```

## SRS Algorithm (Half-Life Regression)

**Correct answer:**
- `bonus = 1.0` (base: double half-life)
- `+0.5` if item harder than estimated ability
- `+0.3` if response < 10s
- `+min(streak * 0.1, 0.5)` streak bonus
- `half_life *= (1 + bonus)`, capped at 4320h (~6 months)

**Incorrect answer:**
- `decay = 0.5` (halve half-life)
- `decay = 0.3` if item was much easier than ability (careless error penalty)
- `half_life *= decay`, minimum 4h
- Streak reset to 0

**Ability update:**
- Correct: ability drifts toward item difficulty (upward pull)
- Incorrect: ability drifts downward
- Clamped to [1, 5]

## Mastery Progression

| Transition | Requirements |
|-----------|-------------|
| locked -> novice | First attempt |
| novice -> developing | 5+ attempts, 40%+ accuracy |
| developing -> proficient | 8+ attempts, 70%+ accuracy |
| proficient -> master | 10+ attempts, 90%+ accuracy, half_life >= 168h (1 week) |

## XP System

- **Correct:** `10 * difficulty` (10-50 base) + speed bonus (5 if <10s, +5 if <5s) + streak bonus (min(streak*2, 20))
- **Incorrect:** 1 XP (participation)
- **Hint penalty:** -30% XP when hint is used

## Learning Techniques Applied

1. **Error-based learning** — Contrastive explanations: "Why X is wrong" + "Why Y is correct"
2. **Scaffolded hints** — Progressive hints before answering (lightbulb icon, -30% XP penalty)
3. **Worked example fading** — Step-by-step explanation reveal (one step at a time)
4. **Elaborative interrogation** — "Pourquoi ?" and "Et si...?" follow-up prompts
5. **Confirmation before commit** — MCQ: select then tap "Valider" (prevents accidental taps)
6. **Gamification reinforcement** — Badge celebration dialog with scale-in animation

## Interactive Widgets

| Widget | Item Types | Description |
|--------|-----------|-------------|
| FunctionGraphWidget | graph | Plot functions, show tangent, derivative overlay |
| SequenceVisualizerWidget | dragPoint (sequence) | Visualize sequences on number line |
| AreaUnderCurveWidget | dragPoint (integral) | Shade area under curve, compute integral |
| ComplexPlaneWidget | dragPoint (complexPlane) | Argand diagram for complex numbers |
| MotionSimulatorWidget | simulate (kinematics) | Kinematics: velocity, acceleration, free fall |
| CircuitSimulatorWidget | simulate (rc/rl/rlc) | RC, RL, RLC circuit simulation |
| WaveSimulatorWidget | simulate (waves) | Double slit, diffraction, interference |
| ForceDiagramWidget | simulate (forces) | Newton's laws, inclined plane, force diagrams |
