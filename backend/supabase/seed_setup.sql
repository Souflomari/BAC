-- BacPrep Database Setup Script
-- Run this script to populate the database with exams and questions
-- Usage: supabase db push (if using Supabase CLI)
--        psql -h localhost -p 54322 -U postgres -f seed_data.sql

-- ============================================
-- MIGRATIONS
-- ============================================

-- Migration 002: Bac Exams Tables
CREATE TABLE IF NOT EXISTS bac_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INTEGER NOT NULL,
    session TEXT NOT NULL CHECK (session IN ('normale', 'rattrapage', 'speciale')),
    stream TEXT NOT NULL,
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    exam_date DATE,
    duration_minutes INTEGER DEFAULT 180,
    total_score INTEGER DEFAULT 20,
    pdf_url TEXT,
    question_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES bac_exams(id) ON DELETE CASCADE,
    skill_id TEXT,
    question_number INTEGER NOT NULL,
    subquestion_letter TEXT,
    part_number INTEGER,
    question JSONB NOT NULL,
    answer JSONB NOT NULL,
    item_type TEXT DEFAULT 'numeric' CHECK (item_type IN (
        'mcq', 'numeric', 'short_text', 'true_false', 'ordering', 
        'fill_blank', 'matching', 'multi_step', 'graph', 'simulate',
        'drag_point', 'adjust_slider', 'sequence', 'limit', 'derivative',
        'chain_rule', 'integration', 'ipp', 'complex_mult', 'diff_eq',
        'recurrence', 'system', 'probability', 'sign_table', 'motion',
        'projectile', 'capacitor', 'rlc', 'refraction', 'punnett',
        'dna_replication', 'cell_division'
    )),
    difficulty_level INTEGER DEFAULT 3 CHECK (difficulty_level BETWEEN 1 AND 5),
    points INTEGER DEFAULT 1,
    is_bonus BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_exam_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    exam_id UUID REFERENCES bac_exams(id) ON DELETE CASCADE,
    attempt_number INTEGER DEFAULT 1,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    score_obtained DECIMAL(5,2) DEFAULT 0,
    score_max INTEGER DEFAULT 20,
    question_results JSONB DEFAULT '[]',
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'reviewed')),
    time_spent_seconds INTEGER DEFAULT 0,
    is_bookmarked BOOLEAN DEFAULT false,
    personal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_exam_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    exam_id UUID REFERENCES bac_exams(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, exam_id)
);

CREATE INDEX IF NOT EXISTS idx_exam_questions_exam_id ON exam_questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_user_exam_progress_user_id ON user_exam_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exam_favorites_user_id ON user_exam_favorites(user_id);

-- Migration 004: Analytics Tables
CREATE TABLE IF NOT EXISTS user_exam_question_bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    question_id UUID REFERENCES exam_questions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

CREATE TABLE IF NOT EXISTS offline_exam_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    question_id UUID REFERENCES exam_questions(id) ON DELETE CASCADE,
    answer JSONB NOT NULL,
    is_correct BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEED DATA: BAC EXAMS 2008-2024
-- ============================================

-- Sciences Maths A - Mathématiques
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, pdf_url, question_count) VALUES
('11111111-1111-1111-1111-111111111111', 2024, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, 'https://www.taalime.ma/2024/sm-a-math-normale.pdf', 5),
('22222222-2222-2222-2222-222222222222', 2024, 'rattrapage', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('33333333-3333-3333-3333-333333333333', 2023, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, 'https://www.taalime.ma/2023/sm-a-math-normale.pdf', 5),
('44444444-4444-4444-4444-444444444444', 2023, 'rattrapage', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('55555555-5555-5555-5555-555555555555', 2022, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, 'https://www.taalime.ma/2022/sm-a-math-normale.pdf', 5),
('66666666-6666-6666-6666-666666666666', 2021, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('77777777-7777-7777-7777-777777777777', 2020, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('88888888-8888-8888-8888-888888888888', 2019, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('99999999-9999-9999-9999-999999999999', 2018, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2016, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2015, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 2014, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 2012, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 2010, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 2008, 'normale', 'sciences_maths_a', 'math', 'Mathématiques', 180, 20, NULL, 5)
ON CONFLICT (id) DO NOTHING;

-- Sciences Maths A - Physique-Chimie
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, question_count) VALUES
('11111111-1111-1111-1111-111111111112', 2024, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('22222222-2222-2222-2222-222222222223', 2023, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('33333333-3333-3333-3333-333333333334', 2022, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('44444444-4444-4444-4444-444444444445', 2021, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('55555555-5555-5555-5555-555555555556', 2020, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('66666666-6666-6666-6666-666666666667', 2019, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('77777777-7777-7777-7777-777777777778', 2018, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('88888888-8888-8888-8888-888888888889', 2016, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4),
('99999999-9999-9999-9999-999999999990', 2014, 'normale', 'sciences_maths_a', 'pc', 'Physique-Chimie', 180, 20, 4)
ON CONFLICT (id) DO NOTHING;

-- Sciences Physiques - Mathématiques
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, question_count) VALUES
('a1111111-1111-1111-1111-111111111111', 2024, 'normale', 'sciences_physiques', 'math', 'Mathématiques', 180, 20, 5),
('a2222222-2222-2222-2222-222222222222', 2023, 'normale', 'sciences_physiques', 'math', 'Mathématiques', 180, 20, 5),
('a3333333-3333-3333-3333-333333333333', 2022, 'normale', 'sciences_physiques', 'math', 'Mathématiques', 180, 20, 5),
('a4444444-4444-4444-4444-444444444444', 2021, 'normale', 'sciences_physiques', 'math', 'Mathématiques', 180, 20, 5)
ON CONFLICT (id) DO NOTHING;

-- Sciences Physiques - Physique-Chimie
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, question_count) VALUES
('a5555555-5555-5555-5555-555555555555', 2024, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('a6666666-6666-6666-6666-666666666666', 2023, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('a7777777-7777-7777-7777-777777777777', 2022, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('a8888888-8888-8888-8888-888888888888', 2021, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('a9999999-9999-9999-9999-999999999999', 2020, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('abbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2019, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('accccccc-cccc-cccc-cccc-cccccccccccc', 2018, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('addddddd-dddd-dddd-dddd-dddddddddddd', 2016, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4),
('aeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 2014, 'normale', 'sciences_physiques', 'pc', 'Physique-Chimie', 180, 20, 4)
ON CONFLICT (id) DO NOTHING;

-- SVT - SVT
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, question_count) VALUES
('b1111111-1111-1111-1111-111111111111', 2024, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b2222222-2222-2222-2222-222222222222', 2023, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b3333333-3333-3333-3333-333333333333', 2022, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b4444444-4444-4444-4444-444444444444', 2021, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b5555555-5555-5555-5555-555555555555', 2020, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b6666666-6666-6666-6666-666666666666', 2019, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b7777777-7777-7777-7777-777777777777', 2018, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b8888888-8888-8888-8888-888888888888', 2016, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4),
('b9999999-9999-9999-9999-999999999999', 2015, 'normale', 'svt', 'svt', 'Sciences de la Vie et de la Terre', 180, 20, 4)
ON CONFLICT (id) DO NOTHING;

-- SVT - Physique-Chimie
INSERT INTO bac_exams (id, year, session, stream, subject_id, subject_name, duration_minutes, total_score, question_count) VALUES
('c1111111-1111-1111-1111-111111111111', 2024, 'normale', 'svt', 'pc', 'Physique-Chimie', 180, 20, 3),
('c2222222-2222-2222-2222-222222222222', 2023, 'normale', 'svt', 'pc', 'Physique-Chimie', 180, 20, 3),
('c3333333-3333-3333-3333-333333333333', 2022, 'normale', 'svt', 'pc', 'Physique-Chimie', 180, 20, 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- SEED DATA: SAMPLE QUESTIONS
-- ============================================

-- Question 1: Limit calculation (2024 SM A Math)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags) VALUES
('q1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 1, 
 '{"stem": "Calculer la limite suivante: $$\\lim_{n \\to \\infty} \\frac{2^n}{n!}$$", "latex": true}',
 '{"steps": [{"text": "Reconnaître une suite géométrique divisée par une factorielle", "points": 2}, {"text": "Pour n ≥ 3: 2^n/n! < 2^n/(n×(n-1)×(n-2)) = 2^n/n^3 × quelque chose", "points": 3}, {"text": "Par encadrement: 0 ≤ 2^n/n! ≤ quelque chose qui tend vers 0", "points": 3}, {"text": "Donc la limite = 0", "points": 2}], "final_answer": "0", "grading_notes": "Bon encadrement: 4pts, Conclusion: 1pt"}',
 'limit', 3, 5, ARRAY['limits', 'factorielle', 'sequences']
ON CONFLICT (id) DO NOTHING;

-- Question 2: Derivative graph (2024 SM A Math)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags) VALUES
('q2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 2,
 '{"stem": "Soit f(x) = x³ - 3x + 1. Calculer f''(1) et interpréter géométriquement.", "latex": true}',
 '{"steps": [{"text": "f''(x) = 3x² - 3", "points": 2}, {"text": "f''(1) = 3(1)² - 3 = 0", "points": 2}, {"text": "Le point (1, f(1)) est un point d''inflexion", "points": 3}, {"text": "La tangente traverse la courbe en ce point", "points": 3}], "final_answer": "f''(1) = 0 (point d''inflexion)", "grading_notes": "Dérivée: 2pts, Valeur: 2pts, Interprétation: 1pt"}',
 'derivative', 3, 5, ARRAY['derivatives', 'graph', 'inflection']
ON CONFLICT (id) DO NOTHING;

-- Question 3: Integration by parts (2023 SM A Math)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags) VALUES
('q3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 1,
 '{"stem": "Calculer l''intégrale: $$\\int_0^1 x e^x \\, dx$$", "latex": true}',
 '{"steps": [{"text": "IPP: u = x, dv = e^x dx → du = dx, v = e^x", "points": 2}, {"text": "∫xe^x dx = xe^x - ∫e^x dx", "points": 3}, {"text": "= xe^x - e^x + C = e^x(x - 1) + C", "points": 2}, {"text": "Évaluer de 0 à 1: [e^x(x-1)]₀¹ = e(0) - 1(-1) = 1", "points": 3}], "final_answer": "1", "grading_notes": "IPP: 3pts, Primitive: 3pts, Calcul: 2pts"}',
 'ipp', 3, 5, ARRAY['integration', 'ipp', 'exponential']
ON CONFLICT (id) DO NOTHING;

-- Question 4: Projectile motion (2024 SM A PC)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags, sim_config) VALUES
('q4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111112', 1,
 '{"stem": "Un projectile est lancé avec une vitesse v₀ = 20 m/s à un angle α = 45°. Calculer la portée du tir.", "latex": true, "figure": {"svg": "<svg>...</svg>"}}',
 '{"steps": [{"text": "Composantes: v₀ₓ = 20cos(45°) = 14.14 m/s", "points": 2}, {"text": "v₀ᵧ = 20sin(45°) = 14.14 m/s", "points": 2}, {"text": "Temps de vol: T = 2v₀ᵧ/g = 2(14.14)/9.81 ≈ 2.88s", "points": 3}, {"text": "Portée: R = v₀ₓ × T = 14.14 × 2.88 ≈ 40.8 m", "points": 3}], "final_answer": "R ≈ 40.8 m", "grading_notes": "Composantes: 2pts, Temps de vol: 3pts, Portée: 2pts"}',
 'projectile', 3, 5, ARRAY['projectile', 'cinematique', 'mouvement'],
 '{"type": "projectile", "initial_velocity": 20, "launch_angle": 45}'
ON CONFLICT (id) DO NOTHING;

-- Question 5: Capacitor energy (2023 SM A PC)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags, sim_config) VALUES
('q5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222223', 2,
 '{"stem": "Un condensateur de capacité C = 100 μF est chargé sous une tension U = 12 V. Calculer l''énergie emmagasinée.", "latex": true}',
 '{"steps": [{"text": "Formule: E = ½CU²", "points": 3}, {"text": "E = ½ × 100×10⁻⁶ × 12²", "points": 2}, {"text": "E = ½ × 100×10⁻⁶ × 144 = 7.2×10⁻³ J = 7.2 mJ", "points": 3}], "final_answer": "E = 7.2 mJ", "grading_notes": "Formule: 3pts, Application: 4pts"}',
 'capacitor', 2, 4, ARRAY['capacitor', 'electricity', 'energy'],
 '{"type": "capacitor", "capacitance": 100, "voltage": 12}'
ON CONFLICT (id) DO NOTHING;

-- Question 6: Punnett Square genetics (2024 SVT)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags, sim_config) VALUES
('q6666666-6666-6666-6666-666666666666', 'b1111111-1111-1111-1111-111111111111', 1,
 '{"stem": "Chez le pois, le gène Tall (T) est dominant sur dwarf (t). Croiser Tt × Tt. Quels sont les génotypes et phénotypes possibles chez la descendance?", "latex": false}',
 '{"steps": [{"text": "Carré de Punnett: Parent1 = Tt, Parent2 = Tt", "points": 2}, {"text": "Descendance: TT, Tt, Tt, tt (ratio 1:2:1)", "points": 3}, {"text": "Phénotypes: 3/4 Tall (TT ou Tt), 1/4 dwarf (tt)", "points": 2}, {"text": "Ratio phénotypique: 3:1 (Tall:dwarf)", "points": 3}], "final_answer": "TT(25%), Tt(50%), tt(25%); Phénotypes: 75% grand, 25% nain", "grading_notes": "Punnett: 3pts, Génotypes: 3pts, Phénotypes: 2pts"}',
 'punnett', 2, 5, ARRAY['genetics', 'punnett', 'inheritance'],
 '{"type": "genetics", "parent1_alleles": ["T", "t"], "parent2_alleles": ["T", "t"]}'
ON CONFLICT (id) DO NOTHING;

-- Question 7: Cell Division mitosis (2023 SVT)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags) VALUES
('q7777777-7777-7777-7777-777777777777', 'b2222222-2222-2222-2222-222222222222', 1,
 '{"stem": "Décrire les étapes de la mitose en montrant ce qui se passe à chaque phase et combien de cellules filles sont produites.", "latex": false}',
 '{"steps": [{"text": "Interphase: Réplication de l''ADN (S)", "points": 2}, {"text": "Prophase: Condensation des chromosomes", "points": 2}, {"text": "Métaphase: Alignement au équateur", "points": 2}, {"text": "Anaphase: Séparation des chromatides", "points": 2}, {"text": "Télophase: Formation de 2 noyaux", "points": 2}, {"text": "Cytodiérèse: Division du cytoplasme", "points": 1}, {"text": "Résultat: 2 cellules filles identiques (2n)", "points": 2}], "final_answer": "6 phases + cytodiérèse = 2 cellules identiques", "grading_notes": "Chaque phase: 1pt, Résultat: 2pts"}',
 'cellDivision', 2, 6, ARRAY['cell_division', 'mitosis', 'cell_cycle']
ON CONFLICT (id) DO NOTHING;

-- Question 8: DNA Replication (2024 SVT)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags) VALUES
('q8888888-8888-8888-8888-888888888888', 'b1111111-1111-1111-1111-111111111111', 2,
 '{"stem": "Expliquer le mécanisme de réplication semi-conservative de l''ADN. Quelles enzymes interviennent?", "latex": false}',
 '{"steps": [{"text": "Réplication semi-conservative: Chaque molècule fille conserve un brin parental", "points": 3}, {"text": "Helicase: Déroule la double hélice", "points": 2}, {"text": "Primase: Synthétise les primers ARN", "points": 2}, {"text": "ADN Polymérase III: Synthétise le nouveau brin 5''→3''", "points": 3}, {"text": "ADN Ligase: Relie les fragments d''Okazaki", "points": 2}, {"text": "Brin leader: Synthèse continue, Brin retardé: Fragments d''Okazaki", "points": 3}], "final_answer": "Semi-conservative avec helicase, primase, ADN polymérase III, ligase", "grading_notes": "Principe: 3pts, Enzymes: 6pts, Brins: 3pts"}',
 'dnaReplication', 3, 8, ARRAY['dna', 'replication', 'enzymes']
ON CONFLICT (id) DO NOTHING;

-- Question 9: RLC Circuit (2024 SM PC)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags, sim_config) VALUES
('q9999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111112', 3,
 '{"stem": "Un circuit RLC série avec R = 10Ω, L = 0.5H, C = 100μF est en régime libre. Calculer la pulsation propre et qualifier l''amortissement.", "latex": true}',
 '{"steps": [{"text": "ω₀ = 1/√(LC) = 1/√(0.5 × 100×10⁻⁶)", "points": 3}, {"text": "= 1/√(5×10⁻⁵) = 1/(7.07×10⁻³) ≈ 141 rad/s", "points": 2}, {"text": "α = R/(2L) = 10/(2×0.5) = 10 rad/s", "points": 2}, {"text": "α < ω₀ donc le circuit est sous-amorti (oscillations)", "points": 3}], "final_answer": "ω₀ ≈ 141 rad/s, Sous-amorti", "grading_notes": "Formule ω₀: 3pts, Calcul: 2pts, Amortissement: 2pts"}',
 'rlc', 4, 5, ARRAY['rlc', 'electricity', 'oscillations'],
 '{"type": "rlc", "resistance": 10, "inductance": 0.5, "capacitance": 100}'
ON CONFLICT (id) DO NOTHING;

-- Question 10: Probability tree (2023 SM A Math)
INSERT INTO exam_questions (id, exam_id, question_number, question, answer, item_type, difficulty_level, points, tags, sim_config) VALUES
('qaaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 3,
 '{"stem": "Une urne contient 3 boules blanches et 2 noires. On tire successivement 2 boules sans remise. Calculer P(2ème blanche | 1ère blanche).", "latex": true}',
 '{"steps": [{"text": "P(1ère blanche) = 3/5", "points": 1}, {"text": "P(2ème blanche | 1ère blanche) = 2/4 = 1/2", "points": 4}, {"text": "Vérification: P(A∩B) = (3/5)(2/4) = 3/10", "points": 2}, {"text": "P(B) calculée par formule des probabilités totales = 3/5", "points": 2}, {"text": "P(A|B) = (3/10)/(3/5) = 1/2 ✓", "points": 1}], "final_answer": "P(2ème blanche | 1ère blanche) = 1/2", "grading_notes": "Formule conditionnelle: 4pts, Vérification: 2pts"}',
 'probability', 3, 5, ARRAY['probability', 'conditional', 'tree'],
 '{"type": "probability", "pA": 0.6, "pBgivenA": 0.5, "pBgivenNotA": 0.25}'
ON CONFLICT (id) DO NOTHING;

-- Update question counts
UPDATE bac_exams SET question_count = (
    SELECT COUNT(*) FROM exam_questions 
    WHERE exam_questions.exam_id = bac_exams.id AND is_active = true
);

-- ============================================
-- SUMMARY
-- ============================================

SELECT 'Setup Complete!' as status;
SELECT 'Total exams: ' || COUNT(*) as count FROM bac_exams;
SELECT 'Total questions: ' || COUNT(*) as count FROM exam_questions;
