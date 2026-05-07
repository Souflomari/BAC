-- ============================================================
-- Migration: Exam Question Bookmarks
-- Allows users to bookmark specific questions for review
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_exam_question_bookmarks (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES exam_questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (user_id, exam_id, question_id)
);

-- Index for querying bookmarks by exam
CREATE INDEX idx_exam_question_bookmarks_exam 
ON public.user_exam_question_bookmarks(exam_id);

-- ============================================================
-- Migration: Add computed columns and views for analytics
-- ============================================================

-- View: Exam performance summary per user
CREATE OR REPLACE VIEW public.exam_performance_summary AS
SELECT 
  u.id as user_id,
  u.display_name,
  p.year,
  p.stream,
  p.subject_id,
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
GROUP BY u.id, u.display_name, p.year, p.stream, p.subject_id, s.name_fr;

-- Function: Get user's weak areas based on question performance
CREATE OR REPLACE FUNCTION get_user_weak_areas(user_uuid UUID)
RETURNS TABLE (
  skill_id UUID,
  skill_name TEXT,
  topic_name TEXT,
  mastery_percentage NUMERIC,
  total_attempts INTEGER,
  correct_attempts INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sk.id as skill_id,
    sk.name_fr as skill_name,
    t.name_fr as topic_name,
    CASE 
      WHEN COUNT(uss.*) > 0 
      THEN (SELECT AVG(mastery_percentage) FROM user_skill_states WHERE skill_id = sk.id AND user_id = user_uuid)
      ELSE 0 
    END as mastery_percentage,
    COUNT(uss.*)::INTEGER as total_attempts,
    SUM(CASE WHEN uss.correct THEN 1 ELSE 0 END)::INTEGER as correct_attempts
  FROM skills sk
  JOIN topics t ON sk.topic_id = t.id
  LEFT JOIN user_skill_states uss ON sk.id = uss.skill_id AND uss.user_id = user_uuid
  GROUP BY sk.id, sk.name_fr, t.name_fr
  ORDER BY mastery_percentage ASC NULLS FIRST
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Migration: Add offline sync support
-- ============================================================

CREATE TABLE IF NOT EXISTS public.offline_exam_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES exam_questions(id) ON DELETE CASCADE,
  
  -- Answer data
  user_answer JSONB NOT NULL,
  is_correct BOOLEAN,
  
  -- Sync metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  synced_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending',
  -- 'pending' = waiting to sync, 'synced' = uploaded, 'failed' = sync failed
  
  UNIQUE(user_id, exam_id, question_id)
);

CREATE INDEX idx_offline_exam_answers_sync_status 
ON public.offline_exam_answers(sync_status) 
WHERE sync_status = 'pending';

-- Function to sync offline answers
CREATE OR REPLACE FUNCTION sync_offline_answers(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  synced_count INTEGER := 0;
BEGIN
  -- Process pending answers
  UPDATE user_exam_progress p
  SET 
    question_results = COALESCE(p.question_results, '[]'::jsonb) || 
      (SELECT jsonb_agg(
        jsonb_build_object(
          'question_id', o.question_id,
          'correct', o.is_correct,
          'points_earned', CASE WHEN o.is_correct THEN 1 ELSE 0 END,
          'points_max', 1,
          'user_answer', o.user_answer
        )
      )
      FROM offline_exam_answers o
      WHERE o.user_id = user_uuid 
        AND o.sync_status = 'pending'
        AND o.exam_id = p.exam_id
      )
  FROM offline_exam_answers o
  WHERE o.user_id = user_uuid 
    AND o.sync_status = 'pending'
    AND o.exam_id = p.exam_id
  ON CONFLICT (user_id, exam_id, attempt_number) DO UPDATE SET
    question_results = EXCLUDED.question_results,
    updated_at = NOW();
  
  -- Mark as synced
  UPDATE offline_exam_answers
  SET sync_status = 'synced', synced_at = NOW()
  WHERE user_id = user_uuid AND sync_status = 'pending';
  
  GET DIAGNOSTICS synced_count = ROW_COUNT;
  
  RETURN synced_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE public.user_exam_question_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own exam question bookmarks" 
ON public.user_exam_question_bookmarks
FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.offline_exam_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own offline answers" 
ON public.offline_exam_answers
FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Comments
-- ============================================================

COMMENT ON TABLE public.user_exam_question_bookmarks IS 'Allows users to bookmark specific exam questions for later review';
COMMENT ON TABLE public.offline_exam_answers IS 'Stores answers offline for later sync when connectivity is restored';
COMMENT ON VIEW public.exam_performance_summary IS 'Aggregated exam performance metrics per user, year, stream, and subject';
COMMENT ON FUNCTION public.get_user_weak_areas IS 'Returns the skills/topics where user has lowest mastery, ordered by weakest first';
