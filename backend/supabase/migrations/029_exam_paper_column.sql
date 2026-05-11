-- Migration 029: add exam_paper JSONB column to skills table.
-- Stores a topic-coherent full Bac-style paper per skill (4-5 multi-part
-- exercices with worked solutions). Sits alongside the existing
-- skills.lesson (LessonV2) column without replacing it. The frontend
-- renders both: lesson on top, exam paper below.
BEGIN;

ALTER TABLE public.skills
  ADD COLUMN IF NOT EXISTS exam_paper JSONB;

-- Partial GIN index: only rows that have an exam_paper. Speeds up the
-- "skills WHERE exam_paper IS NOT NULL" filter the app uses to decide
-- whether to render the Épreuve section.
CREATE INDEX IF NOT EXISTS idx_skills_exam_paper_present
  ON public.skills ((exam_paper IS NOT NULL))
  WHERE exam_paper IS NOT NULL;

-- Document the column. Helps future SMEs understand what's stored.
COMMENT ON COLUMN public.skills.exam_paper IS
  'Topic-coherent full Bac-paper for this skill (v1): {version, title_fr, '
  'subtitle_fr, duration_minutes, total_points, intro_fr, exercices[]}. '
  'Each exercice has number/title_fr/points/preamble_fr/questions[]. '
  'Each question has number/stem_fr/points/subparts?/solution. '
  'Solution has steps[]/final_answer_fr/method_fr. '
  'NULL = skill has no exam paper yet. See migrations 030/031/034/038 for '
  'authoring and lib/models/exam_paper.dart for the parsed sealed-class shape.';

COMMIT;
