-- ============================================================
-- BacPrep — Idempotent migration bundle (002 → 006)
-- Safe to paste into Supabase SQL Editor multiple times.
-- ============================================================
-- Combines:
--   002_bac_exams.sql
--   003_add_interactive_item_types.sql
--   004_exam_analytics_and_sync.sql
--   005_rpc_functions.sql
--   006_daily_quests.sql
-- ============================================================

-- ------------------------------------------------------------
-- 002 — Bac exams
-- ------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE exam_session AS ENUM ('normale', 'rattrapage', 'speciale');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.bac_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2030),
  session exam_session NOT NULL DEFAULT 'normale',
  stream bac_stream NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  exam_date DATE,
  duration_minutes INTEGER DEFAULT 180,
  total_score INTEGER DEFAULT 20,
  pdf_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(year, session, stream, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_bac_exams_year    ON public.bac_exams(year);
CREATE INDEX IF NOT EXISTS idx_bac_exams_stream  ON public.bac_exams(stream);
CREATE INDEX IF NOT EXISTS idx_bac_exams_subject ON public.bac_exams(subject_id);
CREATE INDEX IF NOT EXISTS idx_bac_exams_session ON public.bac_exams(session);

CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL,
  question_number INTEGER NOT NULL CHECK (question_number >= 1),
  subquestion_letter TEXT,
  part_number INTEGER,
  question JSONB NOT NULL,
  answer JSONB NOT NULL,
  item_type item_type NOT NULL DEFAULT 'numeric',
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 3,
  points INTEGER NOT NULL DEFAULT 1,
  is_bonus BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_questions_exam   ON public.exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_skill  ON public.exam_questions(skill_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_number ON public.exam_questions(exam_id, question_number);
CREATE INDEX IF NOT EXISTS idx_exam_questions_tags   ON public.exam_questions USING GIN(tags);

CREATE TABLE IF NOT EXISTS public.user_exam_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  score_obtained NUMERIC(5,2) DEFAULT 0,
  score_max INTEGER DEFAULT 20,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE WHEN score_max > 0 THEN (score_obtained / score_max * 100) ELSE 0 END
  ) STORED,
  question_results JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'not_started',
  time_spent_seconds INTEGER DEFAULT 0,
  is_bookmarked BOOLEAN DEFAULT FALSE,
  personal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, exam_id, attempt_number)
);

CREATE INDEX IF NOT EXISTS idx_user_exam_progress_user   ON public.user_exam_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exam_progress_exam   ON public.user_exam_progress(exam_id);
CREATE INDEX IF NOT EXISTS idx_user_exam_progress_status ON public.user_exam_progress(user_id, status);

CREATE TABLE IF NOT EXISTS public.user_exam_favorites (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, exam_id)
);

-- updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bac_exams_updated_at ON public.bac_exams;
CREATE TRIGGER update_bac_exams_updated_at
  BEFORE UPDATE ON public.bac_exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_exam_questions_updated_at ON public.exam_questions;
CREATE TRIGGER update_exam_questions_updated_at
  BEFORE UPDATE ON public.exam_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_user_exam_progress_updated_at ON public.user_exam_progress;
CREATE TRIGGER update_user_exam_progress_updated_at
  BEFORE UPDATE ON public.user_exam_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION calculate_exam_total_points(exam_uuid UUID)
RETURNS INTEGER AS $$
SELECT COALESCE(SUM(points), 0)::INTEGER
FROM exam_questions
WHERE exam_id = exam_uuid AND is_active = TRUE AND is_bonus = FALSE;
$$ LANGUAGE SQL STABLE;

ALTER TABLE public.bac_exams            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exam_progress   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exam_favorites  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access on bac_exams"        ON public.bac_exams;
CREATE POLICY "Public read access on bac_exams" ON public.bac_exams
  FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public read access on exam_questions"   ON public.exam_questions;
CREATE POLICY "Public read access on exam_questions" ON public.exam_questions
  FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Users manage own exam progress"         ON public.user_exam_progress;
CREATE POLICY "Users manage own exam progress" ON public.user_exam_progress
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own exam favorites"        ON public.user_exam_favorites;
CREATE POLICY "Users manage own exam favorites" ON public.user_exam_favorites
  FOR ALL USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 003 — Add interactive item types (already idempotent)
-- ------------------------------------------------------------

ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'graph';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'simulate';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'dragPoint';
ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'adjustSlider';

-- ------------------------------------------------------------
-- 004 — Exam analytics & offline sync
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_exam_question_bookmarks (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES exam_questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, exam_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_exam_question_bookmarks_exam
  ON public.user_exam_question_bookmarks(exam_id);

CREATE OR REPLACE VIEW public.exam_performance_summary AS
SELECT
  u.id as user_id,
  u.display_name,
  b.year,
  b.stream,
  b.subject_id,
  s.name_fr as subject_name,
  COUNT(DISTINCT p.id) as total_attempts,
  AVG(p.percentage) as avg_score,
  MAX(p.percentage) as best_score,
  MIN(p.percentage) as worst_score,
  AVG(p.time_spent_seconds) as avg_time_seconds
FROM profiles u
LEFT JOIN user_exam_progress p ON u.id = p.user_id
LEFT JOIN bac_exams b ON p.exam_id = b.id
LEFT JOIN subjects s ON b.subject_id = s.id
WHERE p.status = 'completed'
GROUP BY u.id, u.display_name, b.year, b.stream, b.subject_id, s.name_fr;

CREATE TABLE IF NOT EXISTS public.offline_exam_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES exam_questions(id) ON DELETE CASCADE,
  user_answer JSONB NOT NULL,
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  synced_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending',
  UNIQUE(user_id, exam_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_offline_exam_answers_sync_status
  ON public.offline_exam_answers(sync_status)
  WHERE sync_status = 'pending';

ALTER TABLE public.user_exam_question_bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own exam question bookmarks" ON public.user_exam_question_bookmarks;
CREATE POLICY "Users manage own exam question bookmarks"
  ON public.user_exam_question_bookmarks
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.offline_exam_answers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own offline answers" ON public.offline_exam_answers;
CREATE POLICY "Users manage own offline answers"
  ON public.offline_exam_answers
  FOR ALL USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 005 — Atomic RPC functions (CREATE OR REPLACE — idempotent)
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.increment_xp(p_user_id UUID, p_xp INTEGER)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  UPDATE profiles SET total_xp = total_xp + p_xp, updated_at = NOW() WHERE id = p_user_id;
END; $$;
REVOKE ALL ON FUNCTION public.increment_xp(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_xp(UUID, INTEGER) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.upsert_daily_activity(
  p_user_id UUID, p_date DATE, p_correct BOOLEAN, p_xp INTEGER
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  INSERT INTO daily_activity (user_id, activity_date, items_completed, items_correct, xp_earned, streak_maintained)
  VALUES (p_user_id, p_date, 1, CASE WHEN p_correct THEN 1 ELSE 0 END, p_xp, TRUE)
  ON CONFLICT (user_id, activity_date) DO UPDATE
  SET items_completed = daily_activity.items_completed + 1,
      items_correct = daily_activity.items_correct + CASE WHEN p_correct THEN 1 ELSE 0 END,
      xp_earned = daily_activity.xp_earned + p_xp,
      streak_maintained = TRUE;
END; $$;
REVOKE ALL ON FUNCTION public.upsert_daily_activity(UUID, DATE, BOOLEAN, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_daily_activity(UUID, DATE, BOOLEAN, INTEGER) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.add_session_minutes(p_user_id UUID, p_date DATE, p_minutes INTEGER)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  INSERT INTO daily_activity (user_id, activity_date, minutes_practiced)
  VALUES (p_user_id, p_date, p_minutes)
  ON CONFLICT (user_id, activity_date) DO UPDATE
  SET minutes_practiced = daily_activity.minutes_practiced + p_minutes;
END; $$;
REVOKE ALL ON FUNCTION public.add_session_minutes(UUID, DATE, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_session_minutes(UUID, DATE, INTEGER) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.update_session_stats(p_session_id UUID, p_correct BOOLEAN, p_xp INTEGER)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  UPDATE sessions
  SET num_items   = num_items + 1,
      num_correct = num_correct + CASE WHEN p_correct THEN 1 ELSE 0 END,
      xp_earned   = xp_earned + p_xp
  WHERE id = p_session_id;
END; $$;
REVOKE ALL ON FUNCTION public.update_session_stats(UUID, BOOLEAN, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_session_stats(UUID, BOOLEAN, INTEGER) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.complete_session(p_session_id UUID, p_duration_seconds INTEGER)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$ BEGIN
  UPDATE sessions
  SET completed_at = COALESCE(completed_at, NOW()),
      duration_seconds = COALESCE(duration_seconds, p_duration_seconds)
  WHERE id = p_session_id;
END; $$;
REVOKE ALL ON FUNCTION public.complete_session(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complete_session(UUID, INTEGER) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 006 — Daily Quests
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quest_date DATE NOT NULL,
  quest_type TEXT NOT NULL,
  target INTEGER NOT NULL,
  current INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  reward_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  slot_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, quest_date, slot_index)
);

CREATE INDEX IF NOT EXISTS idx_daily_quests_user_date ON daily_quests(user_id, quest_date DESC);

ALTER TABLE daily_quests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own quests"   ON daily_quests;
CREATE POLICY "Users read own quests" ON daily_quests
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own quests" ON daily_quests;
CREATE POLICY "Users insert own quests" ON daily_quests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own quests" ON daily_quests;
CREATE POLICY "Users update own quests" ON daily_quests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.increment_quest_progress(p_quest_id UUID, p_delta INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  bonus INTEGER := 0;
  was_complete BOOLEAN;
  new_current INTEGER;
  q_target INTEGER;
  q_reward INTEGER;
  q_user UUID;
BEGIN
  SELECT completed, target, xp_reward, user_id, current
    INTO was_complete, q_target, q_reward, q_user, new_current
  FROM daily_quests WHERE id = p_quest_id;

  IF q_user IS NULL OR q_user <> auth.uid() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF was_complete THEN
    RETURN 0;
  END IF;

  new_current := new_current + p_delta;

  IF new_current >= q_target THEN
    UPDATE daily_quests
    SET current = LEAST(new_current, q_target), completed = TRUE, updated_at = NOW()
    WHERE id = p_quest_id;
    bonus := q_reward;
  ELSE
    UPDATE daily_quests
    SET current = new_current, updated_at = NOW()
    WHERE id = p_quest_id;
  END IF;

  RETURN bonus;
END; $$;

REVOKE ALL ON FUNCTION public.increment_quest_progress(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_quest_progress(UUID, INTEGER) TO authenticated;

-- ============================================================
-- DONE. Verify with:
--   SELECT to_regclass('public.bac_exams'), to_regclass('public.daily_quests'),
--          (SELECT count(*) FROM pg_proc WHERE proname IN
--           ('increment_xp','upsert_daily_activity','update_session_stats','complete_session','increment_quest_progress'));
-- ============================================================
