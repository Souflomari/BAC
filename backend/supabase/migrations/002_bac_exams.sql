-- ============================================================
-- Migration 002: Baccalaureate Exam Repository
-- Adds tables for storing past Bac exams with questions and solutions
-- ============================================================

-- Exam session types
CREATE TYPE exam_session AS ENUM (
  'normale',      -- June session (main exam)
  'rattrapage',   -- September session (catch-up)
  'speciale'      -- Special session (for specific cases)
);

-- ============================================================
-- BAC EXAMS TABLE
-- Metadata about each exam (year, session, stream, subject)
-- ============================================================
CREATE TABLE public.bac_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Exam identification
  year INTEGER NOT NULL CHECK (year >= 2000 AND year <= 2030),
  session exam_session NOT NULL DEFAULT 'normale',
  stream bac_stream NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  
  -- Exam details
  exam_date DATE,
  duration_minutes INTEGER DEFAULT 180,  -- 3 hours typical
  total_score INTEGER DEFAULT 20,       -- out of 20 points (Moroccan system)
  
  -- PDF/Resources
  pdf_url TEXT,
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Unique constraint: one exam per subject/stream/session/year
  UNIQUE(year, session, stream, subject_id)
);

-- Index for common queries
CREATE INDEX idx_bac_exams_year ON public.bac_exams(year);
CREATE INDEX idx_bac_exams_stream ON public.bac_exams(stream);
CREATE INDEX idx_bac_exams_subject ON public.bac_exams(subject_id);
CREATE INDEX idx_bac_exams_session ON public.bac_exams(session);

-- ============================================================
-- EXAM QUESTIONS TABLE
-- Individual questions from each exam with full solutions
-- ============================================================
CREATE TABLE public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign keys
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE SET NULL, -- links to curriculum
  
  -- Question identification within exam
  question_number INTEGER NOT NULL CHECK (question_number >= 1),
  subquestion_letter TEXT, -- 'a', 'b', 'c', etc. for sub-questions
  part_number INTEGER,      -- for multi-part questions like "Partie 1"
  
  -- Question content (same structure as items.question)
  question JSONB NOT NULL,
  /*
    Structure:
    {
      "stem": "Enoncé de la question...",
      "stem_ar": "نص السؤال بالعربية...",
      "latex": true,
      "figure": { "svg": "...", "alt_text": "..." },
      "item_type": "mcq|numeric|short_text|etc"
    }
  */
  
  -- Full answer with step-by-step solution
  answer JSONB NOT NULL,
  /*
    Structure:
    {
      "steps": [
        { "step": "Énoncé de l'étape 1", "points": 1 },
        { "step": "Énoncé de l'étape 2", "points": 2 }
      ],
      "final_answer": "3",
      "grading_notes": "2 points for method, 1 point for correct answer",
      "common_mistakes": ["Forgetting to check domain", "Sign error"],
      "tips": ["Use the substitution method", "Remember to verify conditions"]
    }
  */
  
  -- Question metadata
  item_type item_type NOT NULL DEFAULT 'numeric',
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5) DEFAULT 3,
  points INTEGER NOT NULL DEFAULT 1,  -- points this question is worth in exam
  is_bonus BOOLEAN DEFAULT FALSE,      -- bonus question (extra points)
  
  -- Tags for filtering
  tags TEXT[] DEFAULT '{}',
  -- e.g. ['sequences', 'limits', 'integration', 'bac_2024']
  
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_exam_questions_exam ON public.exam_questions(exam_id);
CREATE INDEX idx_exam_questions_skill ON public.exam_questions(skill_id);
CREATE INDEX idx_exam_questions_number ON public.exam_questions(exam_id, question_number);
CREATE INDEX idx_exam_questions_tags ON public.exam_questions USING GIN(tags);

-- ============================================================
-- USER EXAM PROGRESS
-- Track which exams users have attempted/completed
-- ============================================================
CREATE TABLE public.user_exam_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  
  -- Attempt tracking
  attempt_number INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Scores
  score_obtained NUMERIC(5,2) DEFAULT 0,
  score_max INTEGER DEFAULT 20,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE WHEN score_max > 0 THEN (score_obtained / score_max * 100) ELSE 0 END
  ) STORED,
  
  -- Question-level results (stored for review)
  question_results JSONB DEFAULT '[]',
  /*
    Structure:
    [
      { "question_id": "uuid", "correct": true, "points_earned": 2, "points_max": 4 },
      { "question_id": "uuid", "correct": false, "points_earned": 0, "points_max": 3 }
    ]
  */
  
  -- Status
  status TEXT NOT NULL DEFAULT 'not_started',
  -- 'not_started', 'in_progress', 'completed', 'reviewed'
  
  -- Time spent
  time_spent_seconds INTEGER DEFAULT 0,
  
  -- Bookmarked for later
  is_bookmarked BOOLEAN DEFAULT FALSE,
  
  -- Notes from user
  personal_notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(user_id, exam_id, attempt_number)
);

-- Indexes
CREATE INDEX idx_user_exam_progress_user ON public.user_exam_progress(user_id);
CREATE INDEX idx_user_exam_progress_exam ON public.user_exam_progress(exam_id);
CREATE INDEX idx_user_exam_progress_status ON public.user_exam_progress(user_id, status);

-- ============================================================
-- EXAM FAVORITES
-- Quick access to bookmarked exams
-- ============================================================
CREATE TABLE public.user_exam_favorites (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES bac_exams(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (user_id, exam_id)
);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_bac_exams_updated_at
  BEFORE UPDATE ON public.bac_exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_exam_questions_updated_at
  BEFORE UPDATE ON public.exam_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_exam_progress_updated_at
  BEFORE UPDATE ON public.user_exam_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to calculate total points for an exam
CREATE OR REPLACE FUNCTION calculate_exam_total_points(exam_uuid UUID)
RETURNS INTEGER AS $$
SELECT COALESCE(SUM(points), 0)::INTEGER
FROM exam_questions
WHERE exam_id = exam_uuid AND is_active = TRUE AND is_bonus = FALSE;
$$ LANGUAGE SQL STABLE;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.bac_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exam_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exam_favorites ENABLE ROW LEVEL SECURITY;

-- Bac exams and questions are public (read-only for all)
CREATE POLICY "Public read access on bac_exams" ON public.bac_exams
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read access on exam_questions" ON public.exam_questions
  FOR SELECT USING (is_active = TRUE);

-- Users can manage their own progress
CREATE POLICY "Users manage own exam progress" ON public.user_exam_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own exam favorites" ON public.user_exam_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Admins can manage exam content
CREATE POLICY "Admins manage bac_exams" ON public.bac_exams
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND false  -- Add admin check here
    )
  );

CREATE POLICY "Admins manage exam_questions" ON public.exam_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND false  -- Add admin check here
    )
  );

COMMENT ON TABLE public.bac_exams IS 'Stores metadata about Baccalaureate exams (year, session, stream, subject)';
COMMENT ON TABLE public.exam_questions IS 'Individual questions from Bac exams with full step-by-step solutions and grading rubrics';
COMMENT ON TABLE public.user_exam_progress IS 'Tracks user progress and scores on Bac exams';
COMMENT ON TABLE public.user_exam_favorites IS 'User bookmarks for quick access to favorite exams';
