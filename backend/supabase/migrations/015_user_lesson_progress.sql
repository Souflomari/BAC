-- ============================================================
-- Migration 015: per-user lesson progress (checkpoint passes).
--
-- Stores which checkpoint questions a user has passed in a long-form
-- (v2) lesson. `passed_keys` is a JSONB array of strings of the form
-- "${sectionIndex}.${blockIndex}.${questionIndex}".
--
-- Idempotent: CREATE TABLE IF NOT EXISTS, CREATE POLICY IF NOT EXISTS
-- (Postgres 15+).
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  passed_keys JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_updated
  ON public.user_lesson_progress (user_id, updated_at DESC);

ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users read own lesson progress"
    ON public.user_lesson_progress
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users upsert own lesson progress"
    ON public.user_lesson_progress
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users update own lesson progress"
    ON public.user_lesson_progress
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users delete own lesson progress"
    ON public.user_lesson_progress
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
