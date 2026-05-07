-- ============================================================
-- MATH CONTENT: Dérivation (3 skills, 19 items)
-- Topic: 22222222-0000-0000-0000-000000000003
-- Skills:
--   deriv_basic  (33333333-...-010) difficulty 1 — 7 items
--   deriv_rules  (33333333-...-011) difficulty 2 — 6 items
--   deriv_apps   (33333333-...-012) difficulty 3 — 6 items
-- ============================================================

-- =====================
-- SKILL: deriv_basic (Dérivées de base) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000009',
  '33333333-0000-0000-0000-000000000010',
  'numeric', 1, 'fr',
  '{"stem": "Soit f(x) = 3x² + 2x - 1. Calculer f''(2).", "correct_value": 14, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = 6x + 2. Donc f''(2) = 6×2 + 2 = 14.", "steps": ["f(x) = 3x² + 2x - 1", "f''(x) = 6x + 2", "f''(2) = 12 + 2 = 14"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000010',
  '33333333-0000-0000-0000-000000000010',
  'mcq', 1, 'fr',
  '{"stem": "Quelle est la dérivée de f(x) = sin(x) ?", "choices": ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La dérivée de sin(x) est cos(x). C''est une formule de base à connaître par cœur."}',
  '{"formule_directe"}'
),
(
  '44444444-0000-0000-0000-000000000014',
  '33333333-0000-0000-0000-000000000010',
  'mcq', 1, 'fr',
  '{"stem": "Quelle est la dérivée de f(x) = eˣ ?", "choices": ["eˣ", "xeˣ⁻¹", "ln(x)", "1/x"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La fonction exponentielle est sa propre dérivée : (eˣ)'' = eˣ."}',
  '{"formule_directe"}'
),
(
  '44444444-0000-0000-0000-000000000015',
  '33333333-0000-0000-0000-000000000010',
  'numeric', 1, 'fr',
  '{"stem": "Soit f(x) = 5x⁴. Calculer f''(1).", "correct_value": 20, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = 5 × 4x³ = 20x³. Donc f''(1) = 20 × 1 = 20.", "steps": ["f(x) = 5x⁴", "f''(x) = 20x³", "f''(1) = 20"]}',
  '{"formule_directe"}'
),
(
  '44444444-0000-0000-0000-000000000016',
  '33333333-0000-0000-0000-000000000010',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la dérivée de f(x) = ln(x) pour x > 0 ?", "choices": ["1/x", "x", "ln(x)/x", "eˣ"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La dérivée du logarithme népérien est (ln x)'' = 1/x pour tout x > 0."}',
  '{"formule_directe"}'
),
(
  '44444444-0000-0000-0000-000000000017',
  '33333333-0000-0000-0000-000000000010',
  'true_false', 1, 'fr',
  '{"stem": "La dérivée de f(x) = cos(x) est f''(x) = sin(x).", "correct_answer": false}',
  '{"text_fr": "Faux. La dérivée de cos(x) est -sin(x), pas sin(x). Le signe négatif est un piège classique."}',
  '{"piege_classique"}'
),
(
  '44444444-0000-0000-0000-000000000018',
  '33333333-0000-0000-0000-000000000010',
  'numeric', 2, 'fr',
  '{"stem": "Soit f(x) = √x. Calculer f''(4).", "correct_value": 0.25, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "f(x) = x^(1/2), donc f''(x) = (1/2)x^(-1/2) = 1/(2√x). f''(4) = 1/(2×2) = 1/4 = 0.25.", "steps": ["f(x) = x^(1/2)", "f''(x) = (1/2) × x^(-1/2) = 1/(2√x)", "f''(4) = 1/(2√4) = 1/4 = 0.25"]}',
  '{"formule_directe"}'
);

-- =====================
-- SKILL: deriv_rules (Règles de dérivation) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000011',
  '33333333-0000-0000-0000-000000000011',
  'mcq', 2, 'fr',
  '{"stem": "Soit f(x) = (2x+1)³. En utilisant la règle de la chaîne, f''(x) = ?", "choices": ["6(2x+1)²", "3(2x+1)²", "(2x+1)²", "2(2x+1)³"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Règle de la chaîne : [g(h(x))]'' = g''(h(x)) × h''(x). Ici g(u) = u³, h(x) = 2x+1. g''(u) = 3u², h''(x) = 2. Donc f''(x) = 3(2x+1)² × 2 = 6(2x+1)².", "steps": ["g(u) = u³ → g''(u) = 3u²", "h(x) = 2x+1 → h''(x) = 2", "f''(x) = 3(2x+1)² × 2 = 6(2x+1)²"]}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000019',
  '33333333-0000-0000-0000-000000000011',
  'mcq', 2, 'fr',
  '{"stem": "Soit f(x) = x² × eˣ. La dérivée f''(x) est :", "choices": ["eˣ(x² + 2x)", "2x × eˣ", "x² × eˣ", "eˣ(x² - 2x)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Règle du produit : (uv)'' = u''v + uv''. Ici u = x², u'' = 2x, v = eˣ, v'' = eˣ. Donc f''(x) = 2x·eˣ + x²·eˣ = eˣ(x² + 2x).", "steps": ["u = x², u'' = 2x", "v = eˣ, v'' = eˣ", "f''(x) = 2x·eˣ + x²·eˣ", "f''(x) = eˣ(x² + 2x)"]}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000020',
  '33333333-0000-0000-0000-000000000011',
  'numeric', 2, 'fr',
  '{"stem": "Soit f(x) = x³ - 6x² + 9x + 1. Calculer f''(1).", "correct_value": 0, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = 3x² - 12x + 9. f''(1) = 3 - 12 + 9 = 0. Le point x = 1 est un point critique.", "steps": ["f''(x) = 3x² - 12x + 9", "f''(1) = 3(1)² - 12(1) + 9", "f''(1) = 3 - 12 + 9 = 0"]}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000021',
  '33333333-0000-0000-0000-000000000011',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = (3x - 1)/(x + 2). La dérivée f''(x) est :", "choices": ["7/(x+2)²", "(3x+6-3x+1)/(x+2)²", "3/(x+2)", "(3x-1)/(x+2)²"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Règle du quotient : (u/v)'' = (u''v - uv'')/v². u = 3x-1, u'' = 3, v = x+2, v'' = 1. f''(x) = (3(x+2) - (3x-1)·1)/(x+2)² = (3x+6-3x+1)/(x+2)² = 7/(x+2)².", "steps": ["u = 3x-1, u'' = 3", "v = x+2, v'' = 1", "f''(x) = (3(x+2) - (3x-1))/(x+2)²", "f''(x) = 7/(x+2)²"]}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000022',
  '33333333-0000-0000-0000-000000000011',
  'true_false', 2, 'fr',
  '{"stem": "La dérivée d''un produit (fg)'' est toujours égale à f'' × g''.", "correct_answer": false}',
  '{"text_fr": "Faux. La dérivée d''un produit est (fg)'' = f''g + fg'', pas f''×g''. C''est la règle de Leibniz."}',
  '{"piege_classique"}'
),
(
  '44444444-0000-0000-0000-000000000023',
  '33333333-0000-0000-0000-000000000011',
  'numeric', 3, 'fr',
  '{"stem": "Soit f(x) = ln(x² + 1). Calculer f''(0).", "correct_value": 0, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = 2x/(x² + 1) par la règle de la chaîne. f''(0) = 0/(0+1) = 0.", "steps": ["f(x) = ln(g(x)) avec g(x) = x² + 1", "f''(x) = g''(x)/g(x) = 2x/(x² + 1)", "f''(0) = 2×0/(0+1) = 0"]}',
  '{"bac_style"}'
);

-- =====================
-- SKILL: deriv_apps (Applications : tangente, extrema, variations) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000024',
  '33333333-0000-0000-0000-000000000012',
  'numeric', 2, 'fr',
  '{"stem": "Soit f(x) = x² - 4x + 3. Déterminer l''abscisse du minimum de f.", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = 2x - 4. f''(x) = 0 donne x = 2. f''''(x) = 2 > 0, donc x = 2 est un minimum.", "steps": ["f''(x) = 2x - 4", "f''(x) = 0 ⟹ 2x - 4 = 0 ⟹ x = 2", "f''''(2) = 2 > 0, donc minimum"]}',
  '{"text_fr": "Annuler la dérivée pour trouver les points critiques."}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000025',
  '33333333-0000-0000-0000-000000000012',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = x³ - 3x + 1. L''équation de la tangente à la courbe de f au point d''abscisse x₀ = 1 est :", "choices": ["y = -1", "y = -2x + 1", "y = 3x - 4", "y = x - 2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "f(1) = 1 - 3 + 1 = -1. f''(x) = 3x² - 3, f''(1) = 0. La tangente est y = f(1) + f''(1)(x-1) = -1 + 0 = -1. C''est une tangente horizontale.", "steps": ["f(1) = 1 - 3 + 1 = -1", "f''(x) = 3x² - 3", "f''(1) = 3 - 3 = 0", "Tangente : y = f(1) + f''(1)(x-1) = -1"]}',
  '{"text_fr": "La tangente en x₀ est y = f(x₀) + f''(x₀)(x - x₀)."}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000026',
  '33333333-0000-0000-0000-000000000012',
  'numeric', 3, 'fr',
  '{"stem": "Soit f(x) = -x² + 6x - 5. Calculer la valeur maximale de f.", "correct_value": 4, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = -2x + 6. f''(x) = 0 ⟹ x = 3. f(3) = -9 + 18 - 5 = 4. Comme f''''(x) = -2 < 0, c''est un maximum.", "steps": ["f''(x) = -2x + 6", "f''(x) = 0 ⟹ x = 3", "f(3) = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4", "f''''(x) = -2 < 0 ⟹ maximum"]}',
  '{"text_fr": "Cherchez x tel que f''(x) = 0, puis calculez f(x)."}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000027',
  '33333333-0000-0000-0000-000000000012',
  'true_false', 3, 'fr',
  '{"stem": "Si f''(a) = 0, alors f admet nécessairement un extremum en a.", "correct_answer": false}',
  '{"text_fr": "Faux. f''(a) = 0 est une condition nécessaire mais pas suffisante. Par exemple, f(x) = x³ a f''(0) = 0 mais x = 0 est un point d''inflexion, pas un extremum."}',
  NULL,
  '{"piege_classique"}'
),
(
  '44444444-0000-0000-0000-000000000028',
  '33333333-0000-0000-0000-000000000012',
  'mcq', 3, 'fr',
  '{"stem": "On considère f(x) = x³ - 3x² + 2. Sur quel intervalle f est-elle croissante ?", "choices": ["]-∞, 0[ ∪ ]2, +∞[", "]0, 2[", "]-∞, 0[", "]2, +∞["], "correct_index": 0, "latex": true}',
  '{"text_fr": "f''(x) = 3x² - 6x = 3x(x - 2). f''(x) > 0 quand x < 0 ou x > 2. f est croissante sur ]-∞, 0[ ∪ ]2, +∞[.", "steps": ["f''(x) = 3x² - 6x = 3x(x-2)", "f''(x) = 0 ⟹ x = 0 ou x = 2", "Signe de f'' : + sur ]-∞,0[, - sur ]0,2[, + sur ]2,+∞[", "f croissante sur ]-∞, 0[ ∪ ]2, +∞["]}',
  NULL,
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000029',
  '33333333-0000-0000-0000-000000000012',
  'numeric', 4, 'fr',
  '{"stem": "Soit f(x) = eˣ(x - 2). Déterminer l''abscisse du minimum de f sur ℝ.", "correct_value": 1, "tolerance": 0, "latex": true}',
  '{"text_fr": "f''(x) = eˣ(x-2) + eˣ = eˣ(x-1). Comme eˣ > 0 toujours, f''(x) = 0 ⟹ x = 1. Pour x < 1 : f''(x) < 0 (décroissante). Pour x > 1 : f''(x) > 0 (croissante). Donc minimum en x = 1.", "steps": ["f''(x) = eˣ(x-2) + eˣ·1 = eˣ(x-2+1) = eˣ(x-1)", "f''(x) = 0 ⟹ x-1 = 0 ⟹ x = 1", "Signe de f'' : négatif pour x<1, positif pour x>1", "Minimum en x = 1"]}',
  '{"text_fr": "Utilisez la règle du produit pour dériver eˣ(x-2)."}',
  '{"bac_style"}'
);
