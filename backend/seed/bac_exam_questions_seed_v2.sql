-- ============================================================
-- Bac Exam Questions with Step-by-Step Solutions
-- Sciences Math - Mathematics 2024 Normale
-- Sources: taalime.ma official corrections
-- ============================================================

BEGIN;

-- ============================================================
-- MATHEMATICS EXAM QUESTIONS - 2024 Normale
-- Exam ID: bac-sm-mat-2024-n
-- ============================================================

-- Question 1: Limit of a sequence
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  1,
  '{"stem": "Calculer la limite suivante: $\\lim_{n \\to +\\infty} \\frac{3n^2 + 2n - 1}{n^2 - n + 2}$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "On factorise le numérateur et le dénominateur par $n^2$ (la plus haute puissance)", "points": 1},
      {"text": "$\\frac{3n^2 + 2n - 1}{n^2 - n + 2} = \\frac{n^2(3 + \\frac{2}{n} - \\frac{1}{n^2})}{n^2(1 - \\frac{1}{n} + \\frac{2}{n^2})}$", "points": 2},
      {"text": "Quand $n \\to +\\infty$: $\\frac{2}{n} \\to 0$, $\\frac{1}{n^2} \\to 0$, $\\frac{1}{n} \\to 0$, $\\frac{2}{n^2} \\to 0$", "points": 2},
      {"text": "Donc $\\lim = \\frac{3 + 0 - 0}{1 - 0 + 0} = \\frac{3}{1} = 3$", "points": 2}
    ],
    "final_answer": "3",
    "grading_notes": "1 pt factorisation, 2 pts simplification, 2 pts calcul des limites, 2 pts résultat final",
    "common_mistakes": ["Oublier de factoriser par n²", "Erreur de signe dans la simplification", "Confondre avec une forme indéterminée 0/0"],
    "tips": ["Factoriser TOUJOURS par la plus haute puissance de n", "Quand deg(num) = deg(den), la limite = rapport des coefficients dominants"]
  }',
  'numeric',
  2,
  7,
  ARRAY['limits', 'sequences', 'polynomials', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'limits';

-- Question 2: Derivative (MCQ)
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  2,
  '{"stem": "Quelle est la dérivée de $f(x) = x^3 - 2x^2 + 5x - 3$ ?", "latex": true, "choices": ["$3x^2 - 4x + 5$", "$3x^2 - 2x + 5$", "$x^3 - 4x + 5$", "$3x^2 - 4x - 3$"], "correct_index": 0, "item_type": "mcq"}',
  '{
    "steps": [
      {"text": "Règle: $(x^n)'' = n \\cdot x^{n-1}$", "points": 1},
      {"text": "Dérivée de $x^3$ = $3x^2$", "points": 1},
      {"text": "Dérivée de $-2x^2$ = $-4x$", "points": 1},
      {"text": "Dérivée de $5x$ = $5$", "points": 1},
      {"text": "Dérivée de $-3$ = $0$ (constante)", "points": 1},
      {"text": "$f''(x) = 3x^2 - 4x + 5$", "points": 2}
    ],
    "final_answer": "$3x^2 - 4x + 5$ (Réponse A)",
    "grading_notes": "1 pt par étape correcte, 2 pts pour la bonne réponse finale",
    "common_mistakes": ["Dériver $x^3$ en $2x^2$ au lieu de $3x^2$", "Oublier que -3 devient 0", "Confondre dérivée et primitive"],
    "tips": ["Dériver chaque terme séparément", "La dérivée d''une constante est toujours 0"]
  }',
  'mcq',
  1,
  5,
  ARRAY['derivatives', 'polynomials', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'derivatives';

-- Question 3: Definite Integral
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  3,
  '{"stem": "Calculer lintégrale: $\\int_0^2 (3x^2 - x + 1) \\, dx$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Chercher une primitive $F$ de $f(x) = 3x^2 - x + 1$", "points": 2},
      {"text": "Primitive: $F(x) = x^3 - \\frac{x^2}{2} + x$", "points": 3},
      {"text": "Vérification: $F''(x) = 3x^2 - x + 1 = f(x)$ ✓", "points": 1},
      {"text": "Formule de Barrow: $\\int_a^b f(x)dx = F(b) - F(a)$", "points": 2},
      {"text": "$F(2) = 8 - 2 + 2 = 8$", "points": 1},
      {"text": "$F(0) = 0 - 0 + 0 = 0$", "points": 1},
      {"text": "$\\int_0^2 f(x)dx = F(2) - F(0) = 8 - 0 = 8$", "points": 2}
    ],
    "final_answer": "8",
    "grading_notes": "2 pts primitive, 3 pts primitive correcte, 1 pt vérification, 2 pts Barrow, 1 pt F(2), 1 pt F(0), 2 pts résultat",
    "common_mistakes": ["Erreur dans le calcul de la primitive", "Confondre F(b) - F(a) avec F(a) - F(b)", "Oublier dx dans la notation"],
    "tips": ["Dériver votre primitive pour vérifier", "Attention à ne pas oublier les parenthèses dans F(b) - F(a)"]
  }',
  'numeric',
  3,
  10,
  ARRAY['integration', 'definite_integral', 'primitives', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'integrals';

-- Question 4: Complex Numbers - Trigonometric Form
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  4,
  '{"stem": "Soit $z = 1 + i\\sqrt{3}$. Donner la forme trigonométrique de $z$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Module: $|z| = \\sqrt{a^2 + b^2} = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2$", "points": 2},
      {"text": "Argument: $\\cos(\\theta) = \\frac{a}{|z|} = \\frac{1}{2}$ et $\\sin(\\theta) = \\frac{b}{|z|} = \\frac{\\sqrt{3}}{2}$", "points": 2},
      {"text": "$\\cos(\\theta) = \\frac{1}{2}$ et $\\sin(\\theta) = \\frac{\\sqrt{3}}{2}$ $\\Rightarrow$ $\\theta = \\frac{\\pi}{3}$", "points": 2},
      {"text": "Forme trigonométrique: $z = |z|(\\cos\\theta + i\\sin\\theta) = 2(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})$", "points": 2}
    ],
    "final_answer": "$z = 2\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$",
    "grading_notes": "2 pts module, 2 pts argument, 2 pts forme trigonométrique",
    "common_mistakes": ["Confondre cos et sin", "Prendre $\\theta = \\frac{\\pi}{6}$ au lieu de $\\frac{\\pi}{3}$", "Oublier le module dans l''écriture finale"],
    "tips": ["Dessiner le point (a,b) dans le plan complexe", "$\\tan(\\theta) = \\frac{b}{a}$ peut aider mais vérifier le quadrant"]
  }',
  'numeric',
  3,
  6,
  ARRAY['complex_numbers', 'trigonometric_form', 'module', 'argument', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'complex_numbers';

-- Question 5: Differential Equation
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-mat-2024-n',
  sk.id,
  5,
  '{"stem": "Résoudre l''équation différentielle: $y'' + 2y = e^{-2x}$", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Équation homogène associée: $y'' + 2y = 0$", "points": 1},
      {"text": "Équation caractéristique: $r^2 + 2r = 0$ $\\Rightarrow$ $r(r+2) = 0$", "points": 1},
      {"text": "Solutions: $r_1 = 0$ et $r_2 = -2$", "points": 1},
      {"text": "Solution homogène: $y_h = C_1 e^{0 \\cdot x} + C_2 e^{-2x} = C_1 + C_2 e^{-2x}$", "points": 2},
      {"text": "Solution particulière: Comme le second membre $e^{-2x}$ est solution de l''homogène (résonance), on cherche $y_p = A \\cdot x \\cdot e^{-2x}$", "points": 2},
      {"text": "$y_p'' = -2A e^{-2x} + 4Ax e^{-2x}$", "points": 2},
      {"text": "Substitution: $-2A e^{-2x} + 4Ax e^{-2x} + 2Ax e^{-2x} = e^{-2x}$", "points": 2},
      {"text": "$-2A e^{-2x} + 6Ax e^{-2x} = e^{-2x}$ $\\Rightarrow$ $-2A = 1$ $\\Rightarrow$ $A = -\\frac{1}{2}$", "points": 2},
      {"text": "Solution générale: $y = y_h + y_p = C_1 + C_2 e^{-2x} - \\frac{1}{2}x e^{-2x}$", "points": 2}
    ],
    "final_answer": "$y = C_1 + C_2 e^{-2x} - \\frac{x}{2}e^{-2x}$ ou $y = e^{-2x}\\left(C_2 - \\frac{x}{2}\\right) + C_1$",
    "grading_notes": "1 pt éq. homogène, 1 pt éq. caractéristique, 1 pt solutions r, 2 pts y_h, 2 pts forme particulière (résonance), 2 pts calcul dérivée, 2 pts substitution et A, 2 pts solution finale",
    "common_mistakes": ["Oublier la solution homogène", "Prendre $y_p = Ae^{-2x}$ au lieu de $Axe^{-2x}$ (cas de résonance)", "Erreur de calcul dans la dérivée de $y_p$"],
    "tips": ["Toujours vérifier si le second membre est solution de l''homogène", "En cas de résonance, multiplier la solution particulière par x"]
  }',
  'numeric',
  4,
  15,
  ARRAY['differential_equations', 'first_order', 'resonance', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'differential_equations';

-- ============================================================
-- PHYSICS EXAM QUESTIONS - 2024 Normale
-- Exam ID: bac-sm-pc-2024-n
-- ============================================================

-- Question 1: Kinematics - Constant Acceleration
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-pc-2024-n',
  sk.id,
  1,
  '{"stem": "Un mobile part du repos et se déplace avec une accélération constante $a = 2 \\, m/s^2$. Calculer sa vitesse après $t = 5 \\, s$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Relation fondamentale: $v = v_0 + a \\cdot t$", "points": 2},
      {"text": "Vitesse initiale: $v_0 = 0 \\, m/s$ (part du repos)", "points": 1},
      {"text": "Accélération: $a = 2 \\, m/s^2$", "points": 1},
      {"text": "Temps écoulé: $t = 5 \\, s$", "points": 1},
      {"text": "$v = 0 + 2 \\times 5 = 10 \\, m/s$", "points": 2}
    ],
    "final_answer": "$v = 10 \\, m/s$",
    "grading_notes": "2 pts formule, 1 pt v0, 1 pt a, 1 pt t, 2 pts calcul",
    "common_mistakes": ["Confondre accélération et vitesse", "Utiliser $v = \\frac{1}{2}at^2$ qui donne la distance parcourue"],
    "tips": ["Choisir la formule adaptée: v = v0 + at pour la vitesse, x = v0t + ½at² pour la distance"]
  }',
  'numeric',
  1,
  7,
  ARRAY['mechanics', 'kinematics', 'constant_acceleration', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'kinematics';

-- Question 2: Capacitor - Energy Storage
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-pc-2024-n',
  sk.id,
  2,
  '{"stem": "Un condensateur de capacité $C = 100 \\mu F$ est chargé sous une tension $U = 12 V$. Calculer l''énergie emmagasinée dans le condensateur.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Formule de l''énergie d''un condensateur: $W = \\frac{1}{2} C U^2$", "points": 2},
      {"text": "Conversion des unités: $C = 100 \\mu F = 100 \\times 10^{-6} F = 10^{-4} F$", "points": 2},
      {"text": "$W = \\frac{1}{2} \\times 10^{-4} \\times 12^2$", "points": 2},
      {"text": "$W = \\frac{1}{2} \\times 10^{-4} \\times 144$", "points": 1},
      {"text": "$W = 72 \\times 10^{-4} = 7{,}2 \\times 10^{-3} J$", "points": 2}
    ],
    "final_answer": "$W = 7{,}2 \\times 10^{-3} J = 7{,}2 mJ$",
    "grading_notes": "2 pts formule, 2 pts conversion, 2 pts substitution, 1 pt calcul, 2 pts résultat avec unité",
    "common_mistakes": ["Oublier la conversion $\\mu F \\to F$", "Utiliser $W = CU^2$ au lieu de $\\frac{1}{2}CU^2$", "Mal placer le $\\frac{1}{2}$"],
    "tips": ["Toujours vérifier les unités avant calcul", "L''énergie stockée est nulle quand U = 0 (condensateur déchargé)"]
  }',
  'numeric',
  2,
  8,
  ARRAY['electricity', 'capacitors', 'energy', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'electrical_circuits';

-- Question 3: Wave Physics - Wavelength
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-pc-2024-n',
  sk.id,
  3,
  '{"stem": "Une onde sonore a une fréquence $f = 440 Hz$ et se propage dans l''air à la vitesse $v = 340 m/s$. Calculer sa longueur d''onde $\\lambda$.", "latex": true, "item_type": "numeric"}',
  '{
    "steps": [
      {"text": "Relation fondamentale entre longueur d''onde, vitesse et fréquence: $\\lambda = \\frac{v}{f}$", "points": 2},
      {"text": "Substitution: $\\lambda = \\frac{340}{440}$", "points": 3},
      {"text": "$\\lambda = 0{,}7727... \\approx 0{,}773 m$", "points": 2}
    ],
    "final_answer": "$\\lambda \\approx 0{,}77 m$",
    "grading_notes": "2 pts formule, 3 pts substitution, 2 pts résultat arrondi",
    "common_mistakes": ["Utiliser $\\lambda = v \\times f$ au lieu de la division"],
    "tips": ["Les basses fréquences ont de grandes longueurs d''onde à vitesse constante", "440 Hz est la fréquence du La3 (note de musique)"]
  }',
  'numeric',
  1,
  7,
  ARRAY['waves', 'sound', 'wavelength', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'waves';

-- ============================================================
-- SVT EXAM QUESTIONS - 2024 Normale
-- Exam ID: bac-sm-svt-2024-n
-- ============================================================

-- Question 1: Genetics - Mendelian Inheritance
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-svt-2024-n',
  sk.id,
  1,
  '{"stem": "Chez l''homme, la myopie est causée par un allèle dominant M. Un homme myope (hétérozygote Mm) épouse une femme normale (mm). Quelle est la probabilité d''avoir un enfant myope ?", "latex": false, "choices": ["0%", "25%", "50%", "100%"], "correct_index": 2, "item_type": "mcq"}',
  '{
    "steps": [
      {"text": "Génotype du père: Mm (hétérozygote, phénotype myope car M est dominant)", "points": 1},
      {"text": "Génotype de la mère: mm (homozygote récessif, phénotype normal)", "points": 1},
      {"text": "Gamètes du père: M ou m (50% chacun)", "points": 1},
      {"text": "Gamètes de la mère: m seulement", "points": 1},
      {"text": "Tableau de croisement:", "points": 1},
      {"text": "  Père \\ Mère | m", "points": 1},
      {"text": "  M     | Mm (myope)", "points": 1},
      {"text": "  m     | mm (normal)", "points": 1},
      {"text": "Descendance: 50% Mm (myope) et 50% mm (normal)", "points": 2},
      {"text": "Les individus Mm ont l''allèle dominant M, donc ils sont myopes", "points": 1}
    ],
    "final_answer": "50% (Réponse C)",
    "grading_notes": "1 pt chaque génotype, 1 pt identification gamètes, 1 pt tableau, 2 pts descendants, 1 pt raisonnement dominance",
    "common_mistakes": ["Penser que Mm serait normal (confusion dominance/récessivité)", "Donner 25% car une seule combinaison sur 4 (oubli que chaque gamète a 50%)"],
    "tips": ["Avec un hétérozygote × homozygote récessif: toujours 50% de chaque génotype", "Un allèle dominant masque l''effet du récessif"]
  }',
  'mcq',
  2,
  8,
  ARRAY['genetics', 'inheritance', 'mendelian', 'dominant_recessive', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'genetics';

-- Question 2: Cell Division - Mitosis
INSERT INTO public.exam_questions (
  exam_id, 
  skill_id, 
  question_number, 
  question, 
  answer, 
  item_type, 
  difficulty_level, 
  points, 
  tags, 
  is_active, 
  created_at
)
SELECT 
  'bac-sm-svt-2024-n',
  sk.id,
  2,
  '{"stem": "Une cellule somatique humaine contient 46 chromosomes. Combien de chromosomes aura chacune des cellules-filles après une mitose ?", "latex": false, "choices": ["23 chromosomes", "46 chromosomes", "92 chromosomes", "184 chromosomes"], "correct_index": 1, "item_type": "mcq"}',
  '{
    "steps": [
      {"text": "La mitose est une division cellulaire qui produit deux cellules-filles génétiquement identiques", "points": 2},
      {"text": "La quantité d''ADN est conservée: chaque cellule-fille reçoit une copie complète du génome", "points": 2},
      {"text": "Le nombre de chromosomes reste inchangé car les chromosomes homologues se séparent", "points": 2},
      {"text": "Chaque cellule-fille aura donc 46 chromosomes (comme la cellule mère)", "points": 1}
    ],
    "final_answer": "46 chromosomes (Réponse B)",
    "grading_notes": "2 pts compréhension mitose, 2 pts conservation ADN, 2 pts nombre chromosomes, 1 pt conclusion",
    "common_mistakes": ["Confondre avec la méiose qui divise par 2", "Penser que 46 chromosomes se dupliquent donc il y en a 92 dans chaque cellule-fille"],
    "tips": ["MitoSe = même nombre, MéiOse = division par 2", "La réplication de l''ADN double la quantité d''ADN mais pas le nombre de chromosomes"]
  }',
  'mcq',
  1,
  7,
  ARRAY['cell_biology', 'mitosis', 'cell_division', 'chromosomes', 'bac_2024', 'normale'],
  TRUE,
  NOW()
FROM skills sk WHERE sk.code = 'cell_biology';

COMMIT;
