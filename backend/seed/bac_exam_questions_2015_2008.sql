-- ============================================================
-- Additional Exam Questions (2015-2008)
-- Sciences Math - Mathematics & Physics
-- ============================================================

BEGIN;

-- ============================================================
-- MATHEMATICS 2015 QUESTIONS
-- ============================================================

-- Question 1: Exponential limit
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2015-n',
  sk.id,
  1,
  '{"stem": "Calculer $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "On reconnaît la limite remarquable: $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$", "points": 2},
      {"text": "Cette limite est une conséquence de la définition de la dérivée de $e^x$ en 0", "points": 2},
      {"text": "Ou on peut utiliser le développement limité: $e^x = 1 + x + \\frac{x^2}{2} + o(x^2)$", "points": 2},
      {"text": "Donc $\\frac{e^x - 1}{x} = 1 + \\frac{x}{2} + o(x) \\to 1$ quand $x \\to 0$", "points": 2}
    ],
    "final_answer": "1",
    "grading_notes": "2 pts reconnaissance limite remarquable, 2 pts justification, 4 pts calcul final",
    "common_mistakes": ["Confondre avec $\\lim \\frac{e^x}{x} = +\\infty$", "Penser que la limite est 0"],
    "tips": ["C''est une limite remarquable à mémoriser: $\\frac{e^x - 1}{x} \\to 1$ quand $x \\to 0$"]
  }',
  'numeric',
  2,
  6,
  ARRAY['limits', 'exponential', 'bac_2015'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'limits';

-- Question 2: Probability tree
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2015-n',
  sk.id,
  2,
  '{"stem": "Un sac contient 3 boules rouges et 2 boules noires. On tire successivement 2 boules sans remise. Calculer la probabilité d''obtenir 2 boules de couleurs différentes.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Total des boules: 3 + 2 = 5", "points": 1},
      {"text": "P(1ère rouge, 2ème noire) = $\\frac{3}{5} \\times \\frac{2}{4} = \\frac{6}{20} = \\frac{3}{10}$", "points": 3},
      {"text": "P(1ère noire, 2ème rouge) = $\\frac{2}{5} \\times \\frac{3}{4} = \\frac{6}{20} = \\frac{3}{10}$", "points": 3},
      {"text": "Par additivité: $P = \\frac{3}{10} + \\frac{3}{10} = \\frac{6}{10} = \\frac{3}{5}$", "points": 2}
    ],
    "final_answer": "$\\frac{3}{5} = 0.6$",
    "grading_notes": "1 pt total, 3 pts chaque cas, 2 pts addition",
    "common_mistakes": ["Oublier le sans remise", "Compter un seul cas au lieu de deux"],
    "tips": ["Toujours vérifier: 2 boules de couleurs différentes = (R puis N) OU (N puis R)"]
  }',
  'numeric',
  2,
  8,
  ARRAY['probability', 'conditional', 'bac_2015'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'probability';

-- ============================================================
-- MATHEMATICS 2014 QUESTIONS
-- ============================================================

-- Question 1: Derivative of composite function
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2014-n',
  sk.id,
  1,
  '{"stem": "Calculer la dérivée de $f(x) = \\sin(3x^2 + 1)$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "On utilise la règle de dérivation en chaîne: $(f \\circ g)'' = f''(g(x)) \\cdot g''(x)$", "points": 2},
      {"text": "Ici: $f(u) = \\sin(u)$ et $u(x) = 3x^2 + 1$", "points": 1},
      {"text": "$f''(u) = \\cos(u)$ et $u''(x) = 6x$", "points": 2},
      {"text": "$f''(x) = \\cos(3x^2 + 1) \\cdot 6x = 6x \\cos(3x^2 + 1)$", "points": 3}
    ],
    "final_answer": "$f''(x) = 6x \\cos(3x^2 + 1)$",
    "grading_notes": "2 pts formule chaîne, 1 pt identification, 2 pts dérivées, 3 pts组合 finale",
    "common_mistakes": ["Oublier de multiplier par la dérivée intérieure", "Erreur de signe: $\\sin'' = \\cos$, pas $-\\cos$"],
    "tips": ["Toujours identifier la fonction extérieure et la fonction intérieure", "Dérivée de $\\sin(u)$ = $\\cos(u) \\times u''$"]
  }',
  'numeric',
  2,
  8,
  ARRAY['derivatives', 'chain_rule', 'bac_2014'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'derivatives';

-- Question 2: Matrix determinant
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2014-n',
  sk.id,
  2,
  '{"stem": "Calculer le déterminant de la matrice $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Formule du déterminant 2x2: $\\det(A) = ad - bc$", "points": 2},
      {"text": "Ici: $a = 2$, $b = 1$, $c = 3$, $d = 4$", "points": 1},
      {"text": "$\\det(A) = 2 \\times 4 - 1 \\times 3 = 8 - 3 = 5$", "points": 3}
    ],
    "final_answer": "5",
    "grading_notes": "2 pts formule, 1 pt identification, 3 pts calcul",
    "common_mistakes": ["Confondre l''ordre: $ad - bc$ et non $ac - bd$", "Erreur de signe: c''est $ad$ et non $-ad$"],
    "tips": ["Pour une matrice 2x2: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, $\\det = ad - bc$"]
  }',
  'numeric',
  1,
  6,
  ARRAY['linear_algebra', 'determinants', 'bac_2014'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'linear_algebra';

-- ============================================================
-- PHYSICS 2015 QUESTIONS
-- ============================================================

-- Question 1: Projectile motion
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-pc-2015-n',
  sk.id,
  1,
  '{"stem": "Un projectile est lancé avec une vitesse initiale $v_0 = 20 m/s$ à un angle $\\alpha = 30°$. Calculer la portée du tir (distance horizontale).", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Formule de la portée: $R = \\frac{v_0^2 \\sin(2\\alpha)}{g}$", "points": 2},
      {"text": "$v_0^2 = 20^2 = 400$", "points": 1},
      {"text": "$\\sin(2\\alpha) = \\sin(60°) = \\frac{\\sqrt{3}}{2}$", "points": 2},
      {"text": "$R = \\frac{400 \\times \\frac{\\sqrt{3}}{2}}{10} = \\frac{400 \\sqrt{3}}{20} = 20\\sqrt{3}$", "points": 3},
      {"text": "$R \\approx 34.6 m$", "points": 1}
    ],
    "final_answer": "$R = 20\\sqrt{3} \\approx 34.6 m$",
    "grading_notes": "2 pts formule, 1 pts v0², 2 pts sinus, 3 pts calcul, 1 pt approximation",
    "common_mistakes": ["Utiliser $\\sin(30°) = 0.5$ au lieu de $\\sin(60°)$", "Confondre portée et hauteur maximale"],
    "tips": ["Angle optimal pour la portée: 45° (quand $\\sin(2\\alpha) = 1$)", "$\\sin(2\\alpha) = 2\\sin\\alpha\\cos\\alpha$"]
  }',
  'numeric',
  3,
  9,
  ARRAY['mechanics', 'projectile_motion', 'bac_2015'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'kinematics';

-- ============================================================
-- MATHEMATICS 2013 QUESTIONS
-- ============================================================

-- Question 1: Logarithm equation
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2013-n',
  sk.id,
  1,
  '{"stem": "Résoudre l''équation: $\\ln(x^2 - 4) = \\ln(3x)$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Condition d''existence: $x^2 - 4 > 0$ et $3x > 0$ $\\Rightarrow x > 0$ et $x^2 > 4$ $\\Rightarrow x > 2$", "points": 2},
      {"text": "$\\ln(x^2 - 4) = \\ln(3x) \\Rightarrow x^2 - 4 = 3x$ (car ln est injective)", "points": 2},
      {"text": "$x^2 - 3x - 4 = 0$", "points": 1},
      {"text": "$\\Delta = 9 + 16 = 25$, $\\sqrt{\\Delta} = 5$", "points": 1},
      {"text": "$x = \\frac{3 \\pm 5}{2}$: $x = 4$ ou $x = -1$", "points": 2},
      {"text": "Vérification: $x = 4 > 2$ ✓, $x = -1$ ne vérifie pas $x > 2$ ✗", "points": 1}
    ],
    "final_answer": "$x = 4$",
    "grading_notes": "2 pts condition existence, 2 pts ln injective, 1 pt équation, 1 pt discriminant, 2 pts solutions, 1 pt vérification",
    "common_mistakes": ["Oublier les conditions d''existence", "Ne pas vérifier les solutions dans l''équation originale"],
    "tips": ["Toujours vérifier le domaine de définition avant de résoudre", "ln(a) = ln(b) ⟺ a = b si a > 0 et b > 0"]
  }',
  'numeric',
  2,
  8,
  ARRAY['functions', 'logarithm', 'equations', 'bac_2013'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'functions';

-- ============================================================
-- MATHEMATICS 2012 QUESTIONS
-- ============================================================

-- Question 1: Integral area
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2012-n',
  sk.id,
  1,
  '{"stem": "Calculer l''aire comprise entre la courbe $y = x^2$, l''axe des abscisses et les droites $x = 0$ et $x = 2$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "L''aire est donnée par $\\int_0^2 x^2 dx$ (la fonction est positive sur [0,2])", "points": 2},
      {"text": "Primitive: $\\frac{x^3}{3}$", "points": 2},
      {"text": "$\\int_0^2 x^2 dx = [\\frac{x^3}{3}]_0^2 = \\frac{8}{3} - 0 = \\frac{8}{3}$", "points": 4}
    ],
    "final_answer": "$\\frac{8}{3}$ unités d''aire",
    "grading_notes": "2 pts identification aire, 2 pts primitive, 4 pts calcul",
    "common_mistakes": ["Prendre $\\int x^2 dx = \\frac{x^3}{3}$, pas $\\frac{x^2}{2}$", "Ne pas vérifier que f est positive"],
    "tips": ["Si f ≥ 0 sur [a,b], l''aire = $\\int_a^b f(x)dx$", "Dessiner toujours pour visualiser"]
  }',
  'numeric',
  2,
  8,
  ARRAY['integration', 'area', 'bac_2012'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'integrals';

-- ============================================================
-- PHYSICS 2014 QUESTIONS
-- ============================================================

-- Question 1: Ohm's Law
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-pc-2014-n',
  sk.id,
  1,
  '{"stem": "Un resistor de $R = 100 \\Omega$ est traversé par un courant de $I = 0.2 A$. Calculer la puissance dissipée.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Formule de la puissance: $P = RI^2$", "points": 2},
      {"text": "$P = 100 \\times (0.2)^2 = 100 \\times 0.04$", "points": 3},
      {"text": "$P = 4 W$", "points": 2}
    ],
    "final_answer": "$P = 4 W$",
    "grading_notes": "2 pts formule, 3 pts calcul, 2 pts résultat",
    "common_mistakes": ["Utiliser $P = UI$ ou $P = \\frac{U^2}{R}$ au lieu de $RI^2$"],
    "tips": ["Toutes les formules de puissance sont équivalentes: $P = UI = RI^2 = \\frac{U^2}{R}$"]
  }',
  'numeric',
  1,
  7,
  ARRAY['electricity', 'power', 'resistance', 'bac_2014'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'electrical_circuits';

-- ============================================================
-- SVT 2015 QUESTIONS
-- ============================================================

-- Question 1: Mitosis vs Meiosis (MCQ)
INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-svt-2015-n',
  sk.id,
  1,
  '{"stem": "La méiose est une division cellulaire qui produit:", "latex": false, "choices": ["2 cellules filles identiques à la cellule mère", "2 cellules sexuelles (gamètes) avec n chromosomes", "4 cellules filles génétiquement différentes", "4 cellules identiques"], "correct_index": 2, "item_type": "mcq"}',
  '{
    "steps": [
      {"text": "La méiose comprend 2 divisions successives", "points": 1},
      {"text": "Méiose I: division réductionnelle (2n → n)", "points": 1},
      {"text": "Méiose II: division équationnelle (comme mitose)", "points": 1},
      {"text": "Résultat: 4 cellules haploïdes (n chromosomes) génétiquement différentes", "points": 2}
    ],
    "final_answer": "4 cellules filles génétiquement différentes (Réponse C)",
    "grading_notes": "1 pt chaque étape, 2 pts conclusion",
    "common_mistakes": ["Confondre avec mitose (produit 2 cellules identiques)", "Penser que les cellules ont 2n chromosomes (n chez méiose)"],
    "tips": ["Méiose: 2n → n (réduction) → 4n → 4n'", "Les cellules-filles ont n chromosomes mais 2n chromatides"]
  }',
  'mcq',
  2,
  5,
  ARRAY['cell_biology', 'meiosis', 'cell_division', 'bac_2015'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'cell_biology';

-- ============================================================
-- TRUE/FALSE - Complex Numbers
-- ============================================================

INSERT INTO public.exam_questions (
  exam_id, skill_id, question_number, question, answer, 
  item_type, difficulty_level, points, tags, is_active, created_at
)
SELECT 
  'bac-sm-mat-2015-n',
  sk.id,
  3,
  '{"stem": "Le module de $z = 3 - 4i$ est égal à 5.", "latex": true, "item_type": "true_false"}',
  '{
    "steps": [
      {"text": "$|z| = \\sqrt{a^2 + b^2} = \\sqrt{3^2 + (-4)^2}$", "points": 2},
      {"text": "$= \\sqrt{9 + 16} = \\sqrt{25} = 5$", "points": 3}
    ],
    "final_answer": "VRAI",
    "grading_notes": "2 pts formule, 3 pts calcul",
    "common_mistakes": ["Confondre module et argument", "Oublier le carré dans la formule"],
    "tips": ["Pour z = a + bi, toujours utiliser $|z| = \\sqrt{a^2 + b^2}$"]
  }',
  'true_false',
  1,
  5,
  ARRAY['complex_numbers', 'module', 'bac_2015'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'complex_numbers';

COMMIT;
