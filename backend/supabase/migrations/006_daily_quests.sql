-- ============================================================
-- Daily Quests
-- 3 rotating quests per user per day, deterministically generated
-- by the daily-quests edge function.
-- ============================================================

CREATE TABLE public.daily_quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quest_date DATE NOT NULL,
  quest_type TEXT NOT NULL,                    -- 'correctAnswers', 'studyMinutes', 'reviewSkills', 'completeSession', 'perfectStreak'
  target INTEGER NOT NULL,
  current INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  reward_claimed BOOLEAN NOT NULL DEFAULT FALSE,
  slot_index INTEGER NOT NULL,                 -- 0, 1, 2 — quest position
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, quest_date, slot_index)
);

CREATE INDEX idx_daily_quests_user_date ON daily_quests(user_id, quest_date DESC);

-- RLS: users can only access their own quests
ALTER TABLE daily_quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own quests" ON daily_quests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own quests" ON daily_quests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own quests" ON daily_quests
  FOR UPDATE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- increment_quest_progress
-- Atomically increment current and flip completed if target reached.
-- Returns the bonus XP awarded (xp_reward if newly completed, else 0).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.increment_quest_progress(
  p_quest_id UUID,
  p_delta INTEGER
) RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
    SET current = LEAST(new_current, q_target),
        completed = TRUE,
        updated_at = NOW()
    WHERE id = p_quest_id;
    bonus := q_reward;
  ELSE
    UPDATE daily_quests
    SET current = new_current,
        updated_at = NOW()
    WHERE id = p_quest_id;
  END IF;

  RETURN bonus;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_quest_progress(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_quest_progress(UUID, INTEGER) TO authenticated;
