-- ============================================================
-- MATH CONTENT: Équations différentielles (2 skills, 12 items)
-- Topic: 22222222-0000-0000-0000-000000000007
-- Skills:
--   ode_first_order   (33333333-...-022) difficulty 3 — 6 items
--   ode_second_order  (33333333-...-023) difficulty 4 — 6 items
-- ============================================================

-- =====================
-- SKILL: ode_first_order (Équations différentielles du 1er ordre) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000136',
  '33333333-0000-0000-0000-000000000022',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la solution générale de l''équation différentielle y'' + 3y = 0 ?", "choices": ["y = Ke^{-3x}", "y = Ke^{3x}", "y = K e^{-x/3}", "y = 3Ke^{x}"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''équation y'' + ay = 0 admet pour solution générale y = Ke^{-ax}, où K est une constante réelle. Ici a = 3, donc y = Ke^{-3x}.", "steps": ["Identifier la forme y'' + ay = 0 avec a = 3", "Appliquer la formule : solution générale y = Ke^{-ax}", "y = Ke^{-3x}, K ∈ ℝ"]}',
  '{"text_fr": "Pour y'' + ay = 0, la solution est de la forme y = Ke^{-ax}."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000137',
  '33333333-0000-0000-0000-000000000022',
  'true_false', 3, 'fr',
  '{"stem": "La fonction y(x) = 5e^{-2x} + 3 est solution de l''équation différentielle y'' + 2y = 6.", "correct_answer": true, "latex": true}',
  '{"text_fr": "On vérifie : y''(x) = -10e^{-2x}. Alors y'' + 2y = -10e^{-2x} + 2(5e^{-2x} + 3) = -10e^{-2x} + 10e^{-2x} + 6 = 6. L''équation est bien satisfaite.", "steps": ["Calculer y''(x) = -10e^{-2x}", "Substituer dans y'' + 2y : -10e^{-2x} + 2(5e^{-2x} + 3)", "Simplifier : -10e^{-2x} + 10e^{-2x} + 6 = 6", "On obtient bien 6 = 6, donc y est solution"]}',
  '{"text_fr": "Calculez y'' puis vérifiez que y'' + 2y donne bien 6."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000138',
  '33333333-0000-0000-0000-000000000022',
  'numeric', 3, 'fr',
  '{"stem": "On considère l''équation différentielle y'' + 2y = 10 avec la condition initiale y(0) = 8. Déterminer la constante K dans la solution générale y = Ke^{-2x} + 5.", "correct_value": 3, "tolerance": 0, "latex": true}',
  '{"text_fr": "La solution générale de y'' + 2y = 10 est y = Ke^{-2x} + 5 (solution particulière constante : y_p = 10/2 = 5). Avec y(0) = 8 : K·e^0 + 5 = 8, donc K + 5 = 8, soit K = 3.", "steps": ["Solution homogène : y_h = Ke^{-2x}", "Solution particulière constante : y_p = 10/2 = 5", "Solution générale : y = Ke^{-2x} + 5", "Condition initiale y(0) = 8 : K + 5 = 8", "K = 3"]}',
  '{"text_fr": "Trouvez d''abord la solution particulière constante b/a, puis utilisez y(0) pour déterminer K."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000139',
  '33333333-0000-0000-0000-000000000022',
  'mcq', 3, 'fr',
  '{"stem": "On considère l''équation y'' = 6x² + 2. Quelle est la solution générale obtenue par intégration directe ?", "choices": ["y = 2x³ + 2x + C", "y = 12x + C", "y = 6x³ + 2x + C", "y = 2x³ + C"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''équation y'' = f(x) se résout par intégration directe. y = ∫(6x² + 2)dx = 6x³/3 + 2x + C = 2x³ + 2x + C.", "steps": ["y'' = 6x² + 2 se résout par intégration", "y = ∫(6x² + 2) dx", "y = 6 × x³/3 + 2x + C", "y = 2x³ + 2x + C"]}',
  '{"text_fr": "Intégrez directement le second membre."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000140',
  '33333333-0000-0000-0000-000000000022',
  'true_false', 3, 'fr',
  '{"stem": "L''équation différentielle y'' = xy est une équation à variables séparables.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. On peut écrire y''/y = x (pour y ≠ 0), ce qui sépare les variables : dy/y = x dx. C''est bien une équation à variables séparables car le second membre s''écrit comme un produit f(x)·g(y) avec f(x) = x et g(y) = y.", "steps": ["y'' = xy peut s''écrire dy/dx = xy", "Séparation : dy/y = x dx (pour y ≠ 0)", "Le second membre est un produit f(x)·g(y) = x·y", "C''est bien une équation à variables séparables"]}',
  '{"text_fr": "Une équation est à variables séparables si on peut écrire y'' = f(x)·g(y)."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000141',
  '33333333-0000-0000-0000-000000000022',
  'numeric', 4, 'fr',
  '{"stem": "Soit l''équation différentielle y'' + 4y = 12 avec y(0) = 1. Calculer y(1) (arrondir au centième).", "correct_value": 2.96, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Solution générale : y = Ke^{-4x} + 3. Avec y(0) = 1 : K + 3 = 1, donc K = -2. Ainsi y(x) = -2e^{-4x} + 3. y(1) = -2e^{-4} + 3 ≈ -2 × 0.0183 + 3 ≈ -0.0366 + 3 ≈ 2.96. Plus précisément : e^{-4} ≈ 0.01832, y(1) = -2(0.01832) + 3 = 2.9634 ≈ 2.96.", "steps": ["Solution particulière : y_p = 12/4 = 3", "Solution générale : y = Ke^{-4x} + 3", "y(0) = 1 : K + 3 = 1, donc K = -2", "y(x) = -2e^{-4x} + 3", "y(1) = -2e^{-4} + 3 ≈ -2(0.0183) + 3 ≈ 2.96"]}',
  '{"text_fr": "Déterminez K avec la condition initiale, puis calculez y(1) = -2e^{-4} + 3."}',
  '{"bac_style","equation_differentielle"}'
);

-- =====================
-- SKILL: ode_second_order (Équations différentielles du 2nd ordre) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000142',
  '33333333-0000-0000-0000-000000000023',
  'mcq', 3, 'fr',
  '{"stem": "Quelle est la solution générale de l''équation différentielle y'''' + 9y = 0 ?", "choices": ["y = A cos(3x) + B sin(3x)", "y = Ae^{3x} + Be^{-3x}", "y = (A + Bx)e^{3x}", "y = A cos(9x) + B sin(9x)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''équation y'''' + ω²y = 0 est celle de l''oscillateur harmonique avec ω² = 9, soit ω = 3. La solution générale est y = A cos(ωx) + B sin(ωx) = A cos(3x) + B sin(3x).", "steps": ["Identifier la forme y'''' + ω²y = 0 avec ω² = 9", "Donc ω = 3", "L''équation caractéristique r² + 9 = 0 donne r = ±3i", "Solution générale : y = A cos(3x) + B sin(3x)"]}',
  '{"text_fr": "L''équation y'''' + ω²y = 0 a pour solutions les fonctions trigonométriques de pulsation ω."}',
  '{"bac_style","equation_differentielle","oscillateur_harmonique"}'
),
(
  '44444444-0000-0000-0000-000000000143',
  '33333333-0000-0000-0000-000000000023',
  'true_false', 3, 'fr',
  '{"stem": "L''équation caractéristique associée à y'''' - 5y'' + 6y = 0 est r² - 5r + 6 = 0.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Pour une équation y'''' + ay'' + by = 0, on associe l''équation caractéristique r² + ar + b = 0. Ici a = -5 et b = 6, donc l''équation caractéristique est r² - 5r + 6 = 0.", "steps": ["Forme générale : y'''' + ay'' + by = 0 → r² + ar + b = 0", "Ici y'''' - 5y'' + 6y = 0 avec a = -5, b = 6", "Équation caractéristique : r² - 5r + 6 = 0", "L''affirmation est correcte"]}',
  '{"text_fr": "Remplacez y'''' par r², y'' par r et y par 1."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000144',
  '33333333-0000-0000-0000-000000000023',
  'numeric', 4, 'fr',
  '{"stem": "On considère y'''' + 4y = 0 avec y(0) = 2 et y''(0) = 6. La solution est y(x) = A cos(2x) + B sin(2x). Déterminer la valeur de B.", "correct_value": 3, "tolerance": 0, "latex": true}',
  '{"text_fr": "La solution générale est y = A cos(2x) + B sin(2x). Avec y(0) = 2 : A cos(0) + B sin(0) = A = 2. La dérivée est y'' = -2A sin(2x) + 2B cos(2x). Avec y''(0) = 6 : 2B = 6, donc B = 3.", "steps": ["Solution générale : y = A cos(2x) + B sin(2x)", "y(0) = 2 : A·1 + B·0 = A = 2", "y''(x) = -2A sin(2x) + 2B cos(2x)", "y''(0) = 6 : -2A·0 + 2B·1 = 2B = 6", "B = 3"]}',
  '{"text_fr": "Utilisez y(0) pour trouver A, puis dérivez et utilisez y''(0) pour trouver B."}',
  '{"bac_style","equation_differentielle","oscillateur_harmonique"}'
),
(
  '44444444-0000-0000-0000-000000000145',
  '33333333-0000-0000-0000-000000000023',
  'mcq', 4, 'fr',
  '{"stem": "L''équation caractéristique r² - 4r + 4 = 0 associée à y'''' - 4y'' + 4y = 0 admet une racine double r₀ = 2. Quelle est la solution générale ?", "choices": ["y = (A + Bx)e^{2x}", "y = Ae^{2x} + Be^{-2x}", "y = A cos(2x) + B sin(2x)", "y = Ae^{2x}"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Lorsque l''équation caractéristique admet une racine double r₀, la solution générale est y = (A + Bx)e^{r₀x}. Ici r₀ = 2, donc y = (A + Bx)e^{2x}.", "steps": ["Équation caractéristique : r² - 4r + 4 = 0", "Discriminant : Δ = 16 - 16 = 0 → racine double", "r₀ = 4/2 = 2", "Racine double → y = (A + Bx)e^{r₀x} = (A + Bx)e^{2x}"]}',
  '{"text_fr": "En cas de racine double r₀, la solution générale est y = (A + Bx)e^{r₀x}."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000146',
  '33333333-0000-0000-0000-000000000023',
  'numeric', 4, 'fr',
  '{"stem": "Soit y'''' - 5y'' + 6y = 0 avec y(0) = 1 et y''(0) = 1. Les racines de l''équation caractéristique sont r₁ = 2 et r₂ = 3. La solution est y = Ae^{2x} + Be^{3x}. Calculer la valeur de A.", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "La solution générale est y = Ae^{2x} + Be^{3x}. Avec y(0) = 1 : A + B = 1. La dérivée est y'' = 2Ae^{2x} + 3Be^{3x}. Avec y''(0) = 1 : 2A + 3B = 1. Du système : A + B = 1 et 2A + 3B = 1. De la première équation B = 1 - A. Substitution : 2A + 3(1-A) = 1, donc 2A + 3 - 3A = 1, soit -A = -2, d''où A = 2.", "steps": ["y = Ae^{2x} + Be^{3x}", "y(0) = 1 : A + B = 1", "y''(x) = 2Ae^{2x} + 3Be^{3x}", "y''(0) = 1 : 2A + 3B = 1", "B = 1 - A → 2A + 3(1-A) = 1", "2A + 3 - 3A = 1 → -A = -2 → A = 2"]}',
  '{"text_fr": "Posez le système avec les deux conditions initiales et résolvez."}',
  '{"bac_style","equation_differentielle"}'
),
(
  '44444444-0000-0000-0000-000000000147',
  '33333333-0000-0000-0000-000000000023',
  'true_false', 5, 'fr',
  '{"stem": "L''équation y'''' + 2y'' + 5y = 0 a pour équation caractéristique r² + 2r + 5 = 0, dont le discriminant est négatif. La solution générale s''écrit donc y = e^{-x}(A cos(2x) + B sin(2x)).", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. L''équation caractéristique r² + 2r + 5 = 0 a pour discriminant Δ = 4 - 20 = -16 < 0. Les racines complexes sont r = (-2 ± 4i)/2 = -1 ± 2i. Donc α = -1 et β = 2. La solution générale est y = e^{αx}(A cos(βx) + B sin(βx)) = e^{-x}(A cos(2x) + B sin(2x)).", "steps": ["Équation caractéristique : r² + 2r + 5 = 0", "Δ = 4 - 20 = -16 < 0", "Racines complexes : r = (-2 ± √(-16))/2 = (-2 ± 4i)/2", "r = -1 ± 2i, donc α = -1, β = 2", "Solution : y = e^{-x}(A cos(2x) + B sin(2x))"]}',
  '{"text_fr": "Calculez le discriminant de l''équation caractéristique. Si Δ < 0, les racines sont complexes α ± βi."}',
  '{"bac_style","equation_differentielle"}'
);
