-- ============================================================
-- BacPrep RPC Functions
-- Atomic operations called by edge functions to prevent race conditions
-- on concurrent answer submissions.
-- ============================================================

-- ------------------------------------------------------------
-- increment_xp
-- Atomically add delta to profiles.total_xp.
-- Called from submit-answer/index.ts.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.increment_xp(
  p_user_id UUID,
  p_xp INTEGER
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET total_xp = total_xp + p_xp,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_xp(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_xp(UUID, INTEGER) TO authenticated, service_role;

-- ------------------------------------------------------------
-- upsert_daily_activity
-- Atomically merge today's activity totals.
-- Increments items_completed, conditionally items_correct, and xp_earned.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.upsert_daily_activity(
  p_user_id UUID,
  p_date DATE,
  p_correct BOOLEAN,
  p_xp INTEGER
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO daily_activity (
    user_id, activity_date, items_completed, items_correct, xp_earned, streak_maintained
  )
  VALUES (
    p_user_id, p_date, 1, CASE WHEN p_correct THEN 1 ELSE 0 END, p_xp, TRUE
  )
  ON CONFLICT (user_id, activity_date) DO UPDATE
  SET items_completed = daily_activity.items_completed + 1,
      items_correct = daily_activity.items_correct + CASE WHEN p_correct THEN 1 ELSE 0 END,
      xp_earned = daily_activity.xp_earned + p_xp,
      streak_maintained = TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_daily_activity(UUID, DATE, BOOLEAN, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_daily_activity(UUID, DATE, BOOLEAN, INTEGER) TO authenticated, service_role;

-- ------------------------------------------------------------
-- add_session_minutes
-- Adds practiced minutes to today's daily_activity (called when a session ends).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.add_session_minutes(
  p_user_id UUID,
  p_date DATE,
  p_minutes INTEGER
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO daily_activity (user_id, activity_date, minutes_practiced)
  VALUES (p_user_id, p_date, p_minutes)
  ON CONFLICT (user_id, activity_date) DO UPDATE
  SET minutes_practiced = daily_activity.minutes_practiced + p_minutes;
END;
$$;

REVOKE ALL ON FUNCTION public.add_session_minutes(UUID, DATE, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_session_minutes(UUID, DATE, INTEGER) TO authenticated, service_role;

-- ------------------------------------------------------------
-- update_session_stats
-- Atomically increment per-session counters. The submit-answer edge function
-- calls this after every answer to keep sessions.num_items / num_correct / xp_earned
-- in sync without a read-modify-write race.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_session_stats(
  p_session_id UUID,
  p_correct BOOLEAN,
  p_xp INTEGER
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE sessions
  SET num_items = num_items + 1,
      num_correct = num_correct + CASE WHEN p_correct THEN 1 ELSE 0 END,
      xp_earned = xp_earned + p_xp
  WHERE id = p_session_id;
END;
$$;

REVOKE ALL ON FUNCTION public.update_session_stats(UUID, BOOLEAN, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_session_stats(UUID, BOOLEAN, INTEGER) TO authenticated, service_role;

-- ------------------------------------------------------------
-- complete_session
-- Marks a session as completed and stamps duration. Idempotent: only sets
-- completed_at if it's still NULL.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.complete_session(
  p_session_id UUID,
  p_duration_seconds INTEGER
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE sessions
  SET completed_at = COALESCE(completed_at, NOW()),
      duration_seconds = COALESCE(duration_seconds, p_duration_seconds)
  WHERE id = p_session_id;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_session(UUID, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complete_session(UUID, INTEGER) TO authenticated, service_role;
