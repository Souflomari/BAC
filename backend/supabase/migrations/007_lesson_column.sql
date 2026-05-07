-- ============================================================
-- Add lesson JSONB column to skills table
-- Stores lesson cards: theory, formula, example, interactive
-- Safe to re-run (IF NOT EXISTS)
-- ============================================================

ALTER TABLE public.skills ADD COLUMN IF NOT EXISTS lesson JSONB;

-- Index for skills that have lesson content (for admin queries)
CREATE INDEX IF NOT EXISTS idx_skills_has_lesson
  ON public.skills ((lesson IS NOT NULL));
