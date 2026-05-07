-- ============================================================
-- Bac Exam Questions with Solutions
-- Sciences Math - Mathematics 2024 Normale
-- ============================================================

-- Get the exam ID for 2024 Normale Math Sciences Math A
DO $$
DECLARE
  exam_uuid UUID;
  math_skill_uuid UUID;
BEGIN
  SELECT id INTO exam_uuid FROM public.bac_exams WHERE year = 2024 AND session = 'normale' AND stream = 'sciences_maths_a' LIMIT 1;
  SELECT id INTO math_skill_uuid FROM public.skills WHERE code = 'limits' LIMIT 1;
  
  -- Question 1: Sequence limit (numeric)
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, math_skill_uuid, 1,
    '{"stem": "Calculer la limite suivante: $\\lim_{n \\to +\\infty} \\frac{3n^2 + 2n - 1}{n^2 - n + 2}$", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "On factorise le numérateur et le dénominateur par $n^2$", "points": 1},
        {"text": "$\\frac{3n^2 + 2n - 1}{n^2 - n + 2} = \\frac{n^2(3 + \\frac{2}{n} - \\frac{1}{n^2})}{n^2(1 - \\frac{1}{n} + \\frac{2}{n^2})}$", "points": 2},
        {"text": "En passant à la limite quand $n \\to +\\infty$, les fractions $\\frac{2}{n}$, $\\frac{1}{n^2}$, $\\frac{1}{n}$, $\\frac{2}{n^2}$ tendent vers 0", "points": 2},
        {"text": "Donc $\\lim = \\frac{3 + 0 - 0}{1 - 0 + 0} = 3$", "points": 2}
      ],
      "final_answer": "3",
      "grading_notes": "1 point pour la factorisation, 2 points pour la simplification, 2 points pour le calcul de la limite, réponse finale: 3",
      "common_mistakes": ["Oublier de factoriser par $n^2$", "Erreur de signe dans la simplification"],
      "tips": ["Toujours factoriser par la plus haute puissance de n au numérateur et dénominateur", "Vérifier que le degré du numérateur et du dénominateur est le même"]
    }',
    'numeric', 2, 7, ARRAY['limits', 'sequences', 'bac_2024'], TRUE, NOW()
  );

  -- Question 2: MCQ on derivatives
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'derivatives' LIMIT 1), 2,
    '{"stem": "Quelle est la dérivée de $f(x) = x^3 - 2x^2 + 5x - 3$ ?", "latex": true, "choices": ["$3x^2 - 4x + 5$", "$3x^2 - 2x + 5$", "$x^3 - 4x + 5$", "$3x^2 - 4x - 3$"], "correct_index": 0, "item_type": "mcq"}',
    '{
      "steps": [
        {"text": "On dérive chaque terme en utilisant la règle $(x^n)'' = n \\cdot x^{n-1}$", "points": 2},
        {"text": "$f''(x) = 3x^2 - 4x + 5$", "points": 3}
      ],
      "final_answer": "$3x^2 - 4x + 5$ (Réponse A)",
      "grading_notes": "2 points pour la méthode correcte, 3 points pour la bonne réponse",
      "common_mistakes": ["Dériver $x^3$ en $2x^2$ au lieu de $3x^2$", "Oublier le -3 qui devient 0"],
      "tips": ["La dérivée de $x^n$ est $n \\cdot x^{n-1}$", "Les constantes disparaissent lors de la dérivation"]
    }',
    'mcq', 1, 5, ARRAY['derivatives', 'polynomials', 'bac_2024'], TRUE, NOW()
  );

  -- Question 3: Integral calculation
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'integrals' LIMIT 1), 3,
    '{"stem": "Calculer l''intégrale: $\\int_0^2 (3x^2 - x + 1) \\, dx$", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "On cherche une primitive de $f(x) = 3x^2 - x + 1$", "points": 2},
        {"text": "Une primitive est $F(x) = x^3 - \\frac{x^2}{2} + x$", "points": 3},
        {"text": "On applique la formule de Barrow: $\\int_a^b f(x)dx = F(b) - F(a)$", "points": 2},
        {"text": "$F(2) = 8 - 2 + 2 = 8$", "points": 1},
        {"text": "$F(0) = 0 - 0 + 0 = 0$", "points": 1},
        {"text": "Donc $\\int_0^2 f(x)dx = 8 - 0 = 8$", "points": 1}
      ],
      "final_answer": "8",
      "grading_notes": "2 pts primitivation, 3 pts primitive correcte, 2 pts application Barrow, 2 pts calcul final (dont 1 pt pour F(2) et 1 pt pour F(0))",
      "common_mistakes": ["Erreur dans le calcul de la primitive", "Erreur de signe: calculer F(0) - F(2) au lieu de F(2) - F(0)"],
      "tips": ["Vérifier toujours que F''''(x) = f(x)", "Faire un croquis pour visualiser l''aire"]
    }',
    'numeric', 3, 10, ARRAY['integration', 'definite_integral', 'bac_2024'], TRUE, NOW()
  );

  -- Question 4: Complex numbers (graph mode - complex plane)
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'complex_numbers' LIMIT 1), 4,
    '{"stem": "Soit $z = 1 + i\\sqrt{3}$. Donner la forme trigonométrique de $z$.", "latex": true, "item_type": "graph", "graph_config": {"mode": "complexPlane", "expectedModule": 2, "expectedArgument": "pi/3", "tolerance": 0.1}}',
    '{
      "steps": [
        {"text": "Calcul du module: $|z| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2$", "points": 2},
        {"text": "Calcul de l''argument: $\\cos(\\theta) = \\frac{1}{2}$ et $\\sin(\\theta) = \\frac{\\sqrt{3}}{2}$", "points": 2},
        {"text": "Donc $\\theta = \\frac{\\pi}{3}$ (argZ = $\\frac{\\pi}{3}$)", "points": 2},
        {"text": "Forme trigonométrique: $z = 2(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})$", "points": 2}
      ],
      "final_answer": "$z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$",
      "grading_notes": "2 pts module, 2 pts argument, 2 pts écriture finale",
      "common_mistakes": ["Confondre cos et sin dans le calcul de l''argument", "Prendre $\\frac{\\pi}{6}$ au lieu de $\\frac{\\pi}{3}$"],
      "tips": ["Dessiner le point dans le plan complexe pour visualiser", "Utiliser $\\tan(\\theta) = \\frac{b}{a}$ avec les bonnes valeurs"]
    }',
    'graph', 3, 6, ARRAY['complex_numbers', 'trigonometric_form', 'bac_2024'], TRUE, NOW()
  );

  -- Question 5: True/False on function properties
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'continuity' LIMIT 1), 5,
    '{"stem": "La fonction $f(x) = \\frac{x^2 - 4}{x - 2}$ est-elle définie et continue en $x = 2$ ?", "latex": true, "item_type": "true_false"}',
    '{
      "steps": [
        {"text": "On remarque que $f(x) = \\frac{(x-2)(x+2)}{x-2} = x + 2$ pour $x \\neq 2$", "points": 2},
        {"text": "En $x = 2$, la fonction n''est pas définie car on aurait une division par zéro", "points": 2},
        {"text": "La fonction peut être prolongée par continuité en posant $f(2) = 4$", "points": 1},
        {"text": "Mais la fonction originale n''est pas définie en $x = 2$, donc la réponse est FAUX", "points": 1}
      ],
      "final_answer": "Faux (la fonction n''est pas définie en x=2, mais elle admet un prolongement continu)",
      "grading_notes": "2 pts factorisation, 2 pts conclusion sur la définition, 1 pt prolongement, 1 pt réponse finale",
      "common_mistakes": ["Confondre la fonction et son prolongement", "Dire que la limite existe donc la fonction est définie"],
      "tips": ["Toujours vérifier le domaine de définition avant de parler de continuité", "La limite existe même si la fonction n''est pas définie"]
    }',
    'true_false', 2, 6, ARRAY['continuity', 'domain', 'limits', 'bac_2024'], TRUE, NOW()
  );

END $$;

-- ============================================================
-- Sciences Math - Mathematics 2023 Normale
-- Sample Questions
-- ============================================================

DO $$
DECLARE
  exam_uuid UUID;
BEGIN
  SELECT id INTO exam_uuid FROM public.bac_exams WHERE year = 2023 AND session = 'normale' AND stream = 'sciences_maths_a' LIMIT 1;
  
  -- Question 1: Differential equations
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'differential_equations' LIMIT 1), 1,
    '{"stem": "Résoudre l''équation différentielle: $y'' + 2y = e^{-2x}$", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "Équation homogène: $y'' + 2y = 0$", "points": 1},
        {"text": "Solution générale: $y_h = C \\cdot e^{-2x}$", "points": 2},
        {"text": "Solution particulière de la forme $y_p = A \\cdot x \\cdot e^{-2x}$", "points": 2},
        {"text": "$y_p'' = -2A e^{-2x} + 4Ax e^{-2x}$", "points": 2},
        {"text": "En substituant: $-2A e^{-2x} + 4Ax e^{-2x} + 2Ax e^{-2x} = e^{-2x}$", "points": 2},
        {"text": "$-2A = 1 \\Rightarrow A = -\\frac{1}{2}$", "points": 1},
        {"text": "Solution générale: $y = C \\cdot e^{-2x} - \\frac{1}{2}x \\cdot e^{-2x}$", "points": 2}
      ],
      "final_answer": "$y = e^{-2x}(C - \\frac{x}{2})$",
      "grading_notes": "1 pt éq. homogène, 2 pts solution homogène, 2 pts forme particulière, 2 pts calcul, 1 pt constante, 2 pts solution finale",
      "common_mistakes": ["Oublier la solution homogène", "Utiliser $y_p = A e^{-2x}$ au lieu de $y_p = Ax e^{-2x}$ (erreur de résonance)"],
      "tips": ["Vérifier si le second membre est solution de l''équation homogène (cas de résonance)", "Dériver la solution particulière et substituer pour vérifier"]
    }',
    'numeric', 4, 10, ARRAY['differential_equations', 'first_order', 'bac_2023'], TRUE, NOW()
  );

  -- Question 2: Probability
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'probability' LIMIT 1), 2,
    '{"stem": "Une urne contient 5 boules blanches et 3 boules noires. On tire successivement 2 boules sans remise. Calculer la probabilité d''obtenir 2 boules de couleurs différentes.", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "Total des boules: $5 + 3 = 8$", "points": 1},
        {"text": "P(1ère blanche et 2ème noire) = $\\frac{5}{8} \\times \\frac{3}{7} = \\frac{15}{56}$", "points": 3},
        {"text": "P(1ère noire et 2ème blanche) = $\\frac{3}{8} \\times \\frac{5}{7} = \\frac{15}{56}$", "points": 3},
        {"text": "Par additivité: $P = \\frac{15}{56} + \\frac{15}{56} = \\frac{30}{56} = \\frac{15}{28}$", "points": 3}
      ],
      "final_answer": "$\\frac{15}{28} \\approx 0.536$",
      "grading_notes": "1 pt dénombrement, 3 pts premier cas, 3 pts deuxième cas, 3 pts additivité et simplification",
      "common_mistakes": ["Oublier de soustraire 1 du dénominateur après le premier tirage (sans remise)", "Compter deux fois les cas favorables"],
      "tips": ["Penser à l''ordre si les événements ne sont pas simultanés", "Vérifier que la somme des probabilités de tous les cas vaut 1"]
    }',
    'numeric', 3, 10, ARRAY['probability', 'conditional', 'bac_2023'], TRUE, NOW()
  );

END $$;

-- ============================================================
-- Physics Exam Questions - 2024 Normale
-- ============================================================

DO $$
DECLARE
  exam_uuid UUID;
BEGIN
  SELECT id INTO exam_uuid FROM public.bac_exams WHERE year = 2024 AND session = 'normale' AND stream = 'sciences_maths_a' AND subject_id = (SELECT id FROM subjects WHERE code = 'physics') LIMIT 1;
  
  -- Question 1: Mechanics - Kinematics (simulate mode)
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'kinematics' LIMIT 1), 1,
    '{"stem": "Un mobile part du repos et accélère avec $a = 2 \\, m/s^2$. Calculer sa vitesse après 5 secondes.", "latex": true, "item_type": "simulate", "sim_config": {"type": "kinematics", "scenario": "constantAcceleration", "target": {"variable": "velocity", "time": 5}}',
    '{
      "steps": [
        {"text": "Formule fondamentale: $v = v_0 + a \\cdot t$", "points": 2},
        {"text": "Vitesse initiale $v_0 = 0$ (part du repos)", "points": 1},
        {"text": "Accélération $a = 2 \\, m/s^2$", "points": 1},
        {"text": "Temps $t = 5 \\, s$", "points": 1},
        {"text": "$v = 0 + 2 \\times 5 = 10 \\, m/s$", "points": 2}
      ],
      "final_answer": "$v = 10 \\, m/s$",
      "grading_notes": "2 pts formule, 1 pt v0, 1 pt a, 1 pt t, 2 pts calcul",
      "common_mistakes": ["Confondre accélération et vitesse", "Utiliser $v = \\frac{1}{2}at^2$ qui donne la distance"],
      "tips": ["Identifier les données: v0, a, t", "Choisir la formule adaptée parmi: v = v0 + at, x = v0t + 1/2 at², v² = v0² + 2ax"]
    }',
    'simulate', 1, 7, ARRAY['mechanics', 'kinematics', 'constant_acceleration', 'bac_2024'], TRUE, NOW()
  );

  -- Question 2: Electricity - RC Circuit
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'electrical_circuits' LIMIT 1), 2,
    '{"stem": "Un condensateur de capacité $C = 100 \\mu F$ est chargé sous une tension $U = 12 V$. Calculer l''énergie emmagasinée.", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "Formule de l''énergie d''un condensateur: $W = \\frac{1}{2} C U^2$", "points": 2},
        {"text": "Conversion: $C = 100 \\mu F = 100 \\times 10^{-6} F = 10^{-4} F$", "points": 2},
        {"text": "$W = \\frac{1}{2} \\times 10^{-4} \\times 12^2$", "points": 2},
        {"text": "$W = \\frac{1}{2} \\times 10^{-4} \\times 144 = 72 \\times 10^{-4} = 7{,}2 \\times 10^{-3} J$", "points": 2}
      ],
      "final_answer": "$W = 7{,}2 \\times 10^{-3} \\, J = 7{,}2 \\, mJ$",
      "grading_notes": "2 pts formule, 2 pts conversion, 2 pts calcul, 2 pts résultat final",
      "common_mistakes": ["Oublier de convertir les microfarads en farads", "Utiliser $W = CU^2$ au lieu de $\\frac{1}{2}CU^2$"],
      "tips": ["Toujours vérifier les unités avant calcul", "L''énergie est en joules, penser à convertir en mJ si nécessaire"]
    }',
    'numeric', 2, 8, ARRAY['electricity', 'capacitors', 'energy', 'bac_2024'], TRUE, NOW()
  );

END $$;

-- ============================================================
-- Physics Exam Questions - Sciences Physiques 2024
-- ============================================================

DO $$
DECLARE
  exam_uuid UUID;
BEGIN
  SELECT id INTO exam_uuid FROM public.bac_exams WHERE year = 2024 AND session = 'normale' AND stream = 'sciences_physiques' AND subject_id = (SELECT id FROM subjects WHERE code = 'physics') LIMIT 1;
  
  -- Question 1: Wave physics
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'waves' LIMIT 1), 1,
    '{"stem": "Une onde sonore a une fréquence $f = 440 Hz$ et se propage dans l''air à $v = 340 m/s$. Calculer sa longueur d''onde.", "latex": true, "item_type": "numeric"}',
    '{
      "steps": [
        {"text": "Relation fondamentale: $\\lambda = \\frac{v}{f}$", "points": 2},
        {"text": "$\\lambda = \\frac{340}{440}$", "points": 3},
        {"text": "$\\lambda \\approx 0{,}773 \\, m$", "points": 2}
      ],
      "final_answer": "$\\lambda \\approx 0{,}77 \\, m$",
      "grading_notes": "2 pts formule, 3 pts substitution, 2 pts résultat",
      "common_mistakes": ["Utiliser $\\lambda = v \\times f$ au lieu de la division"],
      "tips": ["La longueur d''onde est toujours plus grande pour les basses fréquences à vitesse constante"]
    }',
    'numeric', 1, 7, ARRAY['waves', 'sound', 'bac_2024'], TRUE, NOW()
  );

END $$;

-- ============================================================
-- SVT Exam Questions - 2024 Normale
-- ============================================================

DO $$
DECLARE
  exam_uuid UUID;
BEGIN
  SELECT id INTO exam_uuid FROM public.bac_exams WHERE year = 2024 AND session = 'normale' AND stream = 'sciences_maths_a' AND subject_id = (SELECT id FROM subjects WHERE code = 'svt') LIMIT 1;
  
  -- Question 1: Genetics (MCQ)
  INSERT INTO public.exam_questions (
    exam_id, skill_id, question_number, question, answer, 
    item_type, difficulty_level, points, tags, is_active, created_at
  ) VALUES (
    exam_uuid, (SELECT id FROM public.skills WHERE code = 'genetics' LIMIT 1), 1,
    '{"stem": "Chez l''homme, la myopie est causée par un allèle dominant M. Un homme myope (hétérozygote) épouse une femme normale (mm). Quelle est la probabilité d''avoir un enfant myope ?", "latex": false, "choices": ["0%", "25%", "50%", "75%"], "correct_index": 2, "item_type": "mcq"}',
    '{
      "steps": [
        {"text": "Génotype du père: Mm (hétérozygote, myope)", "points": 1},
        {"text": "Génotype de la mère: mm (normale, homozygote récessif)", "points": 1},
        {"text": "Grille de croisement:", "points": 1},
        {"text": "- Gamètes père: M ou m", "points": 1},
        {"text": "- Gamètes mère: m seulement", "points": 1},
        {"text": "Descendance: Mm (50%) ou mm (50%)", "points": 2},
        {"text": "Les individus Mm et mm sont myopes car M est dominant", "points": 1},
        {"text": "Tous les enfants avec au moins un allèle M seront myopes", "points": 1}
      ],
      "final_answer": "50% (Réponse C)",
      "grading_notes": "1 pt chaque génotype, 1 pt grille, 2 pts descendants, 2 pts raisonnement dominance",
      "common_mistakes": ["Penser que Mm serait normal (confusion dominance/récessivité)", "Donner 25% car seulement 1 genotype sur 4 combinaison"],
      "tips": ["Avec un hétérozygote et un homozygote récessif, toujours 50% de chaque génotype", "La dominance complète simplifie le phénotype"]
    }',
    'mcq', 2, 6, ARRAY['genetics', 'inheritance', 'dominant_recessive', 'bac_2024'], TRUE, NOW()
  );

END $$;
