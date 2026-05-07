-- ============================================================
-- BacPrep Database Schema
-- Moroccan Baccalauréat Exam Prep App
-- ============================================================

-- ENUMS
CREATE TYPE bac_stream AS ENUM (
  'sciences_maths_a',
  'sciences_maths_b',
  'sciences_physiques',
  'svt',
  'sciences_economiques',
  'sciences_gestion_comptable',
  'lettres_sciences_humaines',
  'arts_appliques',
  'sciences_chariaa',
  'langue_arabe'
);

CREATE TYPE mastery_level AS ENUM (
  'locked',       -- prerequisites not met
  'novice',       -- 0-30% mastery
  'developing',   -- 30-60%
  'proficient',   -- 60-85%
  'master'        -- 85-100%
);

CREATE TYPE item_type AS ENUM (
  'mcq',              -- multiple choice
  'numeric',          -- numeric answer (exact or tolerance)
  'short_text',       -- short free text
  'true_false',       -- true/false
  'ordering',         -- put steps in order
  'fill_blank',       -- fill in the blank
  'matching',         -- match items
  'multi_step'        -- guided multi-step problem
);

CREATE TYPE exam_type AS ENUM (
  'national',
  'regional'
);

CREATE TYPE content_language AS ENUM (
  'fr',
  'ar',
  'en'
);

-- ============================================================
-- USERS
-- ============================================================
-- Supabase auth handles auth.users; this is app-level profile
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  bac_stream bac_stream NOT NULL DEFAULT 'sciences_maths_b',
  bac_year INTEGER NOT NULL DEFAULT 2026,        -- year of their Bac exam
  exam_date DATE,                                 -- approximate exam date
  preferred_language content_language NOT NULL DEFAULT 'fr',
  daily_goal_minutes INTEGER NOT NULL DEFAULT 15, -- 10, 15, 20, 30
  streak_current INTEGER NOT NULL DEFAULT 0,
  streak_longest INTEGER NOT NULL DEFAULT 0,
  total_xp INTEGER NOT NULL DEFAULT 0,
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CURRICULUM STRUCTURE
-- ============================================================
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,                      -- e.g. 'math', 'physics', 'philosophy'
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  icon TEXT,                                       -- icon identifier
  color TEXT,                                      -- hex color for UI
  exam_type exam_type NOT NULL DEFAULT 'national', -- national or regional
  content_language content_language NOT NULL DEFAULT 'fr',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Which subjects belong to which streams
CREATE TABLE public.stream_subjects (
  stream bac_stream NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  coefficient NUMERIC(3,1) NOT NULL DEFAULT 1.0,  -- Bac coefficient for this subject in this stream
  is_optional BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (stream, subject_id)
);

CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  code TEXT NOT NULL,                              -- e.g. 'sequences', 'limits'
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_fr TEXT,
  description_ar TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  exam_relevance_weight NUMERIC(3,2) NOT NULL DEFAULT 0.5, -- 0.00 to 1.00
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(subject_id, code)
);

CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  code TEXT NOT NULL,                              -- e.g. 'arithmetic_sequences', 'geometric_sequences'
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_fr TEXT,
  difficulty_level INTEGER NOT NULL DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  exam_relevance_weight NUMERIC(3,2) NOT NULL DEFAULT 0.5,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(topic_id, code)
);

-- Skill prerequisites (DAG)
CREATE TABLE public.skill_prerequisites (
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  prerequisite_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, prerequisite_skill_id),
  CHECK (skill_id != prerequisite_skill_id)
);

-- ============================================================
-- ITEMS (Questions / Exercises / Flashcards)
-- ============================================================
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  item_type item_type NOT NULL,
  difficulty_level INTEGER NOT NULL DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  content_language content_language NOT NULL DEFAULT 'fr',

  -- Question content (JSONB for flexibility across item types)
  question JSONB NOT NULL,
  /*
    MCQ example:
    {
      "stem": "Quelle est la limite de (1+1/n)^n quand n→+∞ ?",
      "stem_ar": "...",
      "choices": ["e", "1", "π", "+∞"],
      "correct_index": 0,
      "latex": true
    }

    Numeric example:
    {
      "stem": "Calculer la dérivée de f(x) = 3x² + 2x - 1 en x = 2.",
      "correct_value": 14,
      "tolerance": 0.01,
      "unit": "",
      "latex": true
    }

    Short text example:
    {
      "stem": "Nommer le théorème utilisé pour démontrer la convergence d'une suite croissante majorée.",
      "acceptable_answers": ["théorème de convergence monotone", "convergence monotone"],
      "case_sensitive": false
    }
  */

  explanation JSONB,
  /*
    {
      "text_fr": "La limite de (1+1/n)^n est le nombre e ≈ 2.718...",
      "text_ar": "...",
      "steps": ["Step 1...", "Step 2..."],
      "reference": "Cours: Suites numériques, §3.2"
    }
  */

  hint JSONB,                                       -- optional hint
  tags TEXT[] DEFAULT '{}',                         -- e.g. ['bac_2024', 'frequemment_posé']
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- USER LEARNING STATE
-- ============================================================

-- Per-user, per-skill memory/mastery state (core SRS table)
CREATE TABLE public.user_skill_states (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,

  -- SRS parameters (Half-Life Regression inspired)
  half_life_hours NUMERIC(10,2) NOT NULL DEFAULT 24.0,  -- time for strength to drop to 50%
  last_reviewed_at TIMESTAMPTZ,                          -- last time user practiced this skill
  -- strength is COMPUTED at query time: 2^(-elapsed_hours / half_life_hours)

  -- Mastery tracking
  mastery mastery_level NOT NULL DEFAULT 'locked',
  num_attempts INTEGER NOT NULL DEFAULT 0,
  num_correct INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,             -- consecutive correct
  best_streak INTEGER NOT NULL DEFAULT 0,

  -- Adaptive difficulty
  estimated_ability NUMERIC(4,2) NOT NULL DEFAULT 1.0,   -- 1-5 scale, adapts to performance

  -- Timestamps
  first_seen_at TIMESTAMPTZ,
  unlocked_at TIMESTAMPTZ,
  mastered_at TIMESTAMPTZ,

  PRIMARY KEY (user_id, skill_id)
);

-- Individual item-level history (every answer)
CREATE TABLE public.user_item_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  session_id UUID,  -- references sessions table

  is_correct BOOLEAN NOT NULL,
  response_time_ms INTEGER,                              -- how long the user took
  user_answer JSONB,                                     -- what the user answered
  difficulty_at_time INTEGER NOT NULL DEFAULT 1,         -- item difficulty when shown

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Learning sessions
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL DEFAULT 'practice',         -- 'practice', 'review', 'mock_exam', 'challenge'

  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER,

  num_items INTEGER NOT NULL DEFAULT 0,
  num_correct INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,

  -- What was covered
  subject_ids UUID[] DEFAULT '{}',
  skill_ids UUID[] DEFAULT '{}'
);

-- ============================================================
-- GAMIFICATION
-- ============================================================
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_fr TEXT,
  icon TEXT,
  category TEXT NOT NULL DEFAULT 'mastery',  -- 'mastery', 'streak', 'challenge', 'mock_exam'
  criteria JSONB NOT NULL                    -- machine-readable unlock criteria
);

CREATE TABLE public.user_badges (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

CREATE TABLE public.daily_activity (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  minutes_practiced INTEGER NOT NULL DEFAULT 0,
  items_completed INTEGER NOT NULL DEFAULT 0,
  items_correct INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  streak_maintained BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (user_id, activity_date)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_topics_subject ON topics(subject_id);
CREATE INDEX idx_skills_topic ON skills(topic_id);
CREATE INDEX idx_items_skill ON items(skill_id);
CREATE INDEX idx_items_type ON items(item_type);
CREATE INDEX idx_items_difficulty ON items(difficulty_level);
CREATE INDEX idx_user_skill_states_user ON user_skill_states(user_id);
CREATE INDEX idx_user_skill_states_mastery ON user_skill_states(user_id, mastery);
CREATE INDEX idx_user_skill_states_review ON user_skill_states(user_id, last_reviewed_at);
CREATE INDEX idx_user_item_history_user ON user_item_history(user_id, created_at DESC);
CREATE INDEX idx_user_item_history_session ON user_item_history(session_id);
CREATE INDEX idx_user_item_history_skill ON user_item_history(user_id, skill_id);
CREATE INDEX idx_sessions_user ON sessions(user_id, started_at DESC);
CREATE INDEX idx_daily_activity_user ON daily_activity(user_id, activity_date DESC);
CREATE INDEX idx_stream_subjects_stream ON stream_subjects(stream);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skill_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_item_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users read own skill states" ON user_skill_states FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users modify own skill states" ON user_skill_states FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own history" ON user_item_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own history" ON user_item_history FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own sessions" ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users read own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own activity" ON daily_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own activity" ON daily_activity FOR ALL USING (auth.uid() = user_id);

-- Public read for curriculum content
CREATE POLICY "Public read subjects" ON subjects FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public read topics" ON topics FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public read items" ON items FOR SELECT TO PUBLIC USING (is_active = true);
CREATE POLICY "Public read badges" ON badges FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public read stream_subjects" ON stream_subjects FOR SELECT TO PUBLIC USING (true);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Compute memory strength for a user-skill pair
CREATE OR REPLACE FUNCTION compute_strength(
  p_half_life_hours NUMERIC,
  p_last_reviewed_at TIMESTAMPTZ
) RETURNS NUMERIC AS $$
BEGIN
  IF p_last_reviewed_at IS NULL THEN
    RETURN 0;
  END IF;
  RETURN POWER(2, -EXTRACT(EPOCH FROM (NOW() - p_last_reviewed_at)) / 3600.0 / p_half_life_hours);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
