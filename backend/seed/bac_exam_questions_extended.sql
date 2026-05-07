-- ============================================================
-- Additional Exam Questions with Solutions
-- Sciences Math, Sciences Physiques, SVT - Multiple Years
-- ============================================================

BEGIN;

-- ============================================================
-- MATHEMATICS 2023 QUESTIONS
-- ============================================================

-- Question 1: Integration by parts
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2023-n',
  sk.id,
  1,
  '{"stem": "Calculer lintégrale: $\\int_0^1 x \\cdot e^x \\, dx$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "On utilise lintégration par parties: $\\int u \\, dv = uv - \\int v \\, du$", "points": 1},
      {"text": "Choix: $u = x$ et $dv = e^x dx$", "points": 1},
      {"text": "Alors $du = dx$ et $v = e^x$", "points": 1},
      {"text": "$\\int_0^1 x e^x dx = [x e^x]_0^1 - \\int_0^1 e^x dx$", "points": 2},
      {"text": "$= (1 \\cdot e^1 - 0 \\cdot e^0) - [e^x]_0^1$", "points": 2},
      {"text": "$= e - (e - 1) = e - e + 1 = 1$", "points": 2}
    ],
    "final_answer": "1",
    "grading_notes": "1 pt IPP, 1 pt choix u et dv, 1 pt calcul du et v, 2 pts formule, 2 pts première partie, 2 pts deuxième partie",
    "common_mistakes": ["Mauvais choix de u et dv (il faut que du soit plus simple que u)", "Oublier le signe moins dans la formule IPP", "Erreur de calcul dans l''évaluation aux bornes"],
    "tips": ["Règle mnémotechnique: 'UNEL' - Un exponentielle Polytechnique... Non! Essayez: 'Un PolyTech' - u polynôme, dv exponentielle"]
  }',
  'numeric',
  3,
  8,
  ARRAY['integration', 'integration_by_parts', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'integrals';

-- Question 2: Geometric sequence
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2023-n',
  sk.id,
  2,
  '{"stem": "Soit $(u_n)$ une suite géométrique telle que $u_3 = 24$ et $u_6 = 192$. Calculer la raison $q$ et le premier terme $u_0$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Formule: $u_n = u_0 \\cdot q^n$", "points": 1},
      {"text": "$u_3 = u_0 \\cdot q^3 = 24$ (équation 1)", "points": 1},
      {"text": "$u_6 = u_0 \\cdot q^6 = 192$ (équation 2)", "points": 1},
      {"text": "En divisant (2) par (1): $\\frac{u_6}{u_3} = \\frac{u_0 q^6}{u_0 q^3} = q^3$", "points": 2},
      {"text": "$q^3 = \\frac{192}{24} = 8 = 2^3$", "points": 2},
      {"text": "Donc $q = 2$", "points": 1},
      {"text": "De (1): $u_0 \\cdot 2^3 = 24 \\Rightarrow u_0 \\cdot 8 = 24 \\Rightarrow u_0 = 3$", "points": 2}
    ],
    "final_answer": "$q = 2$ et $u_0 = 3$",
    "grading_notes": "1 pt formule, 1 pt chaque équation, 2 pts division, 2 pts calcul q, 2 pts calcul u0",
    "common_mistakes": ["Confondre avec une suite arithmétique", "Calculer q au lieu de q³", "Erreur de signe dans la résolution"],
    "tips": ["Toujours utiliser la formule générale u_n = u_p × q^(n-p) pour comparer deux termes", "Vérifier: u_6 = u_3 × q³ = 24 × 2³ = 24 × 8 = 192 ✓"]
  }',
  'numeric',
  2,
  8,
  ARRAY['sequences', 'geometric', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'sequences';

-- Question 3: Matrix linear system
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2023-n',
  sk.id,
  3,
  '{"stem": "Résoudre le système linéaire: $\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases}$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Méthode par addition:", "points": 1},
      {"text": "Équation 1: $2x + y = 5$", "points": 1},
      {"text": "Équation 2: $x - y = 1$", "points": 1},
      {"text": "En additionnant les deux équations: $(2x + y) + (x - y) = 5 + 1$", "points": 2},
      {"text": "$3x = 6 \\Rightarrow x = 2$", "points": 2},
      {"text": "En substituant dans $x - y = 1$: $2 - y = 1 \\Rightarrow y = 1$", "points": 2}
    ],
    "final_answer": "$x = 2$, $y = 1$",
    "grading_notes": "1 pt méthode, 1 pt chaque équation, 2 pts addition, 2 pts x, 2 pts y",
    "common_mistakes": ["Erreur de signe en additionnant", "Substituer dans la mauvaise équation"],
    "tips": ["Vérifier toujours dans les deux équations: 2(2) + 1 = 5 ✓ et 2 - 1 = 1 ✓"]
  }',
  'numeric',
  1,
  6,
  ARRAY['linear_systems', 'algebra', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'linear_algebra';

-- ============================================================
-- PHYSICS 2023 QUESTIONS
-- ============================================================

-- Question 1: Newton's Second Law
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-pc-2023-n',
  sk.id,
  1,
  '{"stem": "Un objet de masse $m = 2 kg$ est soumis à une force $F = 10 N$. Calculer l''accélération du mobile.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Deuxième loi de Newton: $\\vec{F} = m \\cdot \\vec{a}$", "points": 2},
      {"text": "En module: $F = m \\cdot a$", "points": 1},
      {"text": "$a = \\frac{F}{m} = \\frac{10}{2}$", "points": 2},
      {"text": "$a = 5 \\, m/s^2$", "points": 1}
    ],
    "final_answer": "$a = 5 \\, m/s^2$",
    "grading_notes": "2 pts loi, 1 pt formule, 2 pts calcul, 1 pt résultat",
    "common_mistakes": ["Confondre Force et accélération", "Oublier que F est en Newton (kg·m/s²)"],
    "tips": ["L''accélération est dans la direction de la force", "Si F double, a double aussi (relation linéaire)"]
  }',
  'numeric',
  1,
  6,
  ARRAY['mechanics', 'newton', 'acceleration', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'dynamics';

-- Question 2: RLC Circuit
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-pc-2023-n',
  sk.id,
  2,
  '{"stem": "Un circuit RLC série avec $L = 0{,}1 H$ et $C = 10 \\mu F$ oscille librement. Calculer la période propre $T_0$ des oscillations.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Période propre d''un circuit LC: $T_0 = 2\\pi\\sqrt{LC}$", "points": 2},
      {"text": "$C = 10 \\mu F = 10 \\times 10^{-6} F = 10^{-5} F$", "points": 1},
      {"text": "$L \\cdot C = 0{,}1 \\times 10^{-5} = 10^{-6}$", "points": 2},
      {"text": "$T_0 = 2\\pi\\sqrt{10^{-6}} = 2\\pi \\times 10^{-3}$", "points": 2},
      {"text": "$T_0 \\approx 6{,}28 \\times 10^{-3} s = 6{,}28 ms$", "points": 1}
    ],
    "final_answer": "$T_0 \\approx 6{,}28 ms$",
    "grading_notes": "2 pts formule, 1 pt conversion, 2 pts calcul LC, 2 pts calcul final",
    "common_mistakes": ["Utiliser $\\omega = 1/\\sqrt{LC}$ au lieu de T", "Confondre avec la fréquence f = 1/T"],
    "tips": ["Ne pas oublier le $2\\pi$ dans la formule de période", "Vérifier les unités: LC doit être en secondes²"]
  }',
  'numeric',
  3,
  8,
  ARRAY['electricity', 'oscillations', 'RLC', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'electrical_circuits';

-- ============================================================
-- SVT 2023 QUESTIONS
-- ============================================================

-- Question 1: DNA Replication
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-svt-2023-n',
  sk.id,
  1,
  '{"stem": "Quelle est la enzyme responsible de la réplication de l''ADN chez les êtres vivants ?", "latex": false, "choices": ["ADN polymérase", "ARN polymérase", "Ligase", "Helicase"], "correct_index": 0, "item_type": "mcq"}',
  '{
    "steps": [
      {"text": "La réplication de l''ADN est le processus de duplication du matériel génétique avant la division cellulaire", "points": 2},
      {"text": "ADN polymérase: enzyme qui sintetise un nouveau brin d''ADN en utilisant le brin matrice", "points": 3},
      {"text": "L''ADN polymérase ne peut synthesized que dans le sens 5''→3'', donc le brin leader est síntèse continue et le brin延迟 est síntèse par fragments", "points": 2}
    ],
    "final_answer": "ADN polymérase (Réponse A)",
    "grading_notes": "2 pts identification enzyme, 3 pts fonction, 2 pts mécanisme",
    "common_mistakes": ["Confondre avec ARN polymérase (synthèse ARN)", "Penser que ligase réplique l''ADN (elle répare seulement)"],
    "tips": ["ADN polymérase = construction/lecture de l''ADN", "ARN polymérase = construction de l''ARN à partir de l''ADN"]
  }',
  'mcq',
  1,
  7,
  ARRAY['genetics', 'DNA', 'replication', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'genetics';

-- ============================================================
-- SCIENCES PHYSIQUES 2023 QUESTIONS
-- ============================================================

-- Question 1: Optics - Refraction
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sp-pc-2023-n',
  sk.id,
  1,
  '{"stem": "Un rayon lumineux passe de l''air (n=1) dans le verre (n=1,5). L''angle d''incidence est 30°. Calculer l''angle de réfraction.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Loi de Snell-Descartes: $n_1 \\sin(i) = n_2 \\sin(r)$", "points": 2},
      {"text": "$1 \\times \\sin(30°) = 1{,}5 \\times \\sin(r)$", "points": 2},
      {"text": "$\\sin(r) = \\frac{\\sin(30°)}{1{,}5} = \\frac{0{,}5}{1{,}5} = 0{,}333$", "points": 2},
      {"text": "$r = \\arcsin(0{,}333) \\approx 19{,}5°$", "points": 2}
    ],
    "final_answer": "$r \\approx 19{,}5°$",
    "grading_notes": "2 pts loi, 2 pts substitution, 2 pts calcul sinus, 2 pts angle final",
    "common_mistakes": ["Inverser n1 et n2", "Utiliser degrés au lieu de sinus"],
    "tips": ["Quand n augmente (air→verre), le rayon se rapproche de la normale", "Vérifier: r < i toujours quand n2 > n1"]
  }',
  'numeric',
  2,
  8,
  ARRAY['optics', 'refraction', 'snell', 'bac_2023'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'optics';

-- ============================================================
-- MATHEMATICS 2022 QUESTIONS
-- ============================================================

-- Question 1: Complex Numbers Operations
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2022-n',
  sk.id,
  1,
  '{"stem": "Soit $z_1 = 3 + 4i$ et $z_2 = 1 - 2i$. Calculer $z_1 \\times z_2$ et donner le résultat sous forme algébrique.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Multiplication: $(a+bi)(c+di) = ac + adi + bci + bdi^2$", "points": 1},
      {"text": "$(3+4i)(1-2i) = 3 \\times 1 + 3 \\times (-2i) + 4i \\times 1 + 4i \\times (-2i)$", "points": 2},
      {"text": "$= 3 - 6i + 4i - 8i^2$", "points": 1},
      {"text": "Comme $i^2 = -1$: $3 - 6i + 4i - 8(-1) = 3 - 2i + 8$", "points": 2},
      {"text": "$= 11 - 2i$", "points": 1}
    ],
    "final_answer": "$z_1 \\times z_2 = 11 - 2i$",
    "grading_notes": "1 pt formule, 2 pts développement, 1 pt simplification i², 2 pts regroupement, 1 pt résultat",
    "common_mistakes": ["Oublier que i² = -1", "Erreur de signe dans le développement"],
    "tips": ["Vérifier: |z1×z2| = |z1|×|z2| = 5×√5 ≈ 11.18, et |11-2i| = √(121+4) = √125 = 11.18 ✓"]
  }',
  'numeric',
  2,
  7,
  ARRAY['complex_numbers', 'multiplication', 'bac_2022'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'complex_numbers';

-- Question 2: Linear recurrence
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2022-n',
  sk.id,
  2,
  '{"stem": "Résoudre la récurrence: $u_{n+1} = 3u_n + 2$ avec $u_0 = 1$. Calculer $u_3$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "C''est une récurrence linéaire du premier ordre: $u_{n+1} = a u_n + b$", "points": 1},
      {"text": "Solution: $u_n = a^n u_0 + b\\frac{a^n - 1}{a - 1}$", "points": 2},
      {"text": "$u_n = 3^n \\cdot 1 + 2\\frac{3^n - 1}{3 - 1}$", "points": 2},
      {"text": "$u_n = 3^n + (3^n - 1) = 2 \\cdot 3^n - 1$", "points": 2},
      {"text": "$u_3 = 2 \\cdot 3^3 - 1 = 2 \\cdot 27 - 1 = 54 - 1 = 53$", "points": 2}
    ],
    "final_answer": "$u_3 = 53$ (formule générale: $u_n = 2 \\cdot 3^n - 1$)",
    "grading_notes": "1 pt identification type, 2 pts formule, 2 pts simplification, 2 pts calcul u3",
    "common_mistakes": ["Oublier la partie constante dans la formule", "Erreur de calcul arithmétique"],
    "tips": ["Vérifier: u1 = 3(1) + 2 = 5, u2 = 3(5) + 2 = 17, u3 = 3(17) + 2 = 53 ✓"]
  }',
  'numeric',
  3,
  9,
  ARRAY['sequences', 'recurrence', 'bac_2022'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'sequences';

-- ============================================================
-- TRUE/FALSE QUESTIONS (NEW TYPE)
-- ============================================================

-- True/False Question
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  6,
  '{"stem": "La fonction $f(x) = \\ln(x^2 - 1)$ est définie pour tout $x > 1$.", "latex": true, "item_type": "true_false"}',
  '{
    "steps": [
      {"text": "Condition de définition de ln: argument > 0", "points": 1},
      {"text": "$x^2 - 1 > 0 \\Rightarrow (x-1)(x+1) > 0$", "points": 2},
      {"text": "Tableau de signes: x < -1 OU x > 1", "points": 2},
      {"text": "Donc f est définie pour x < -1 ET x > 1", "points": 1},
      {"text": "L''énoncé dit 'pour tout x > 1' mais oublie x < -1", "points": 1}
    ],
    "final_answer": "FAUX (elle est définie pour x < -1 OU x > 1)",
    "grading_notes": "1 pt condition ln, 2 pts inéquation, 2 pts solution, 2 pts contre-exemple",
    "common_mistakes": ["Penser que x² - 1 > 0 ⇒ x > 1 (oublier x < -1)", "Erreur dans la résolution de l''inéquation"],
    "tips": ["Toujours résoudre les inéquations complètement avec un tableau de signes", "Vérifier les deux cas: x² > 1 signifie |x| > 1"]
  }',
  'true_false',
  2,
  6,
  ARRAY['functions', 'logarithm', 'domain', 'bac_2024'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'functions';

COMMIT;
