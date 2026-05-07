-- ============================================================
-- MATH CONTENT: Intégration (3 skills, 20 items)
-- Topic: 22222222-0000-0000-0000-000000000004
-- Skills:
--   primitives        (33333333-...-013) difficulty 2 — 7 items (UUIDs 077-083)
--   definite_integral (33333333-...-014) difficulty 3 — 7 items (UUIDs 084-090)
--   integral_apps     (33333333-...-015) difficulty 4 — 6 items (UUIDs 091-096)
-- ============================================================

-- =====================
-- SKILL: primitives (Calcul de primitives) — 7 items
-- Items at difficulty 2 (no hint needed)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000077',
  '33333333-0000-0000-0000-000000000013',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est une primitive de f(x) = 3x² + 2x sur ℝ ?", "choices": ["x³ + x²", "6x + 2", "x³ + x² + 5", "3x³ + 2x²"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Une primitive de f(x) = 3x² + 2x est F(x) = x³ + x². On vérifie : F''(x) = 3x² + 2x = f(x). La réponse x³ + x² + 5 est aussi une primitive, mais on choisit conventionnellement la constante C = 0.", "steps": ["Primitive de 3x² : 3 × x³/3 = x³", "Primitive de 2x : 2 × x²/2 = x²", "F(x) = x³ + x² (+ C)"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000078',
  '33333333-0000-0000-0000-000000000013',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les fonctions suivantes, laquelle est une primitive de f(x) = cos(x) sur ℝ ?", "choices": ["sin(x)", "-sin(x)", "cos(x)", "-cos(x)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La primitive de cos(x) est sin(x) + C. En effet, (sin(x))'' = cos(x). Attention à ne pas confondre avec la dérivée de sin(x) qui est cos(x).", "steps": ["On cherche F telle que F''(x) = cos(x)", "(sin(x))'' = cos(x) ✓", "Donc F(x) = sin(x) + C"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000079',
  '33333333-0000-0000-0000-000000000013',
  'true_false', 2, 'fr',
  '{"stem": "Une primitive de f(x) = 1/x sur ]0, +∞[ est F(x) = ln(x).", "correct_answer": true}',
  '{"text_fr": "Vrai. Sur ]0, +∞[, la dérivée de ln(x) est 1/x, donc ln(x) est bien une primitive de 1/x sur cet intervalle.", "steps": ["On vérifie : (ln(x))'' = 1/x pour x > 0", "Donc F(x) = ln(x) est une primitive de 1/x sur ]0, +∞["]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000080',
  '33333333-0000-0000-0000-000000000013',
  'numeric', 2, 'fr',
  '{"stem": "Soit F une primitive de f(x) = 4x³ - 6x telle que F(0) = 5. Calculer F(2).", "correct_value": 9, "tolerance": 0, "latex": true}',
  '{"text_fr": "F(x) = x⁴ - 3x² + C. F(0) = 0 - 0 + C = 5, donc C = 5. F(x) = x⁴ - 3x² + 5. F(2) = 16 - 12 + 5 = 9.", "steps": ["Primitive de 4x³ : x⁴", "Primitive de -6x : -3x²", "F(x) = x⁴ - 3x² + C", "F(0) = C = 5", "F(2) = 2⁴ - 3×2² + 5 = 16 - 12 + 5 = 9"]}',
  '{"bac_style"}'
);

-- primitives: Items at difficulty 3 (hint required)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000081',
  '33333333-0000-0000-0000-000000000013',
  'mcq', 3, 'fr',
  '{"stem": "Quelle est une primitive de f(x) = cos(2x) sur ℝ ?", "choices": ["(1/2)sin(2x)", "sin(2x)", "2sin(2x)", "-sin(2x)/2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Pour trouver une primitive de cos(2x), on utilise la forme cos(ax) dont la primitive est (1/a)sin(ax). Ici a = 2, donc F(x) = (1/2)sin(2x).", "steps": ["f(x) = cos(2x) est de la forme cos(ax) avec a = 2", "Primitive de cos(ax) = (1/a)sin(ax) + C", "F(x) = (1/2)sin(2x) + C", "Vérification : F''(x) = (1/2) × 2cos(2x) = cos(2x) ✓"]}',
  '{"text_fr": "Utilisez la formule de la primitive de cos(ax) : pensez à diviser par le coefficient de x."}',
  '{"bac_style","fonction_composee"}'
),
(
  '44444444-0000-0000-0000-000000000082',
  '33333333-0000-0000-0000-000000000013',
  'numeric', 3, 'fr',
  '{"stem": "Soit F la primitive de f(x) = e^(3x) qui vérifie F(0) = 2. Calculer 3 × F(0) - F''(0). (On donnera la valeur exacte.)", "correct_value": 5, "tolerance": 0, "latex": true}',
  '{"text_fr": "F(x) = (1/3)e^(3x) + C. F(0) = 1/3 + C = 2, donc C = 5/3. On a F''(x) = f(x) = e^(3x), donc F''(0) = e⁰ = 1. Ainsi 3×F(0) - F''(0) = 3×2 - 1 = 5.", "steps": ["Primitive de e^(3x) : (1/3)e^(3x) + C", "F(0) = 1/3 + C = 2 ⟹ C = 5/3", "F''(0) = f(0) = e^(3×0) = 1", "3 × F(0) - F''(0) = 3×2 - 1 = 5"]}',
  '{"text_fr": "Rappelez-vous que F''(x) = f(x) par définition d''une primitive."}',
  '{"bac_style","fonction_composee"}'
),
(
  '44444444-0000-0000-0000-000000000083',
  '33333333-0000-0000-0000-000000000013',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = (2x)/(x² + 1). Reconnaître la forme u''/u et en déduire une primitive de f.", "choices": ["ln(x² + 1)", "1/(x² + 1)", "(x² + 1)²", "ln(2x)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On pose u(x) = x² + 1, alors u''(x) = 2x. Donc f(x) = u''(x)/u(x), et une primitive est ln|u(x)| = ln(x² + 1) (les valeurs absolues sont inutiles car x² + 1 > 0).", "steps": ["On pose u(x) = x² + 1", "u''(x) = 2x", "f(x) = 2x/(x² + 1) = u''(x)/u(x)", "Primitive de u''/u = ln|u| = ln(x² + 1)"]}',
  '{"text_fr": "Cherchez une fonction u(x) telle que le numérateur soit la dérivée du dénominateur."}',
  '{"bac_style","forme_u_prime_sur_u"}'
);

-- =====================
-- SKILL: definite_integral (Intégrale définie) — 7 items
-- Item at difficulty 2 (no hint needed)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000084',
  '33333333-0000-0000-0000-000000000014',
  'numeric', 2, 'fr',
  '{"stem": "Calculer ∫₀² (3x² + 1) dx.", "correct_value": 10, "tolerance": 0, "latex": true}',
  '{"text_fr": "Une primitive de 3x² + 1 est F(x) = x³ + x. ∫₀² (3x² + 1) dx = F(2) - F(0) = (8 + 2) - (0 + 0) = 10.", "steps": ["Primitive : F(x) = x³ + x", "F(2) = 2³ + 2 = 8 + 2 = 10", "F(0) = 0³ + 0 = 0", "∫₀² (3x² + 1) dx = 10 - 0 = 10"]}',
  '{"bac_style"}'
);

-- definite_integral: Items at difficulty 3+ (hint required)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000085',
  '33333333-0000-0000-0000-000000000014',
  'mcq', 3, 'fr',
  '{"stem": "Soit f continue sur [a, b]. Laquelle de ces propriétés est FAUSSE ?", "choices": ["∫ₐᵇ f(x) dx = ∫ₐᵇ f(t) dt implique que f(x) = f(t)", "∫ₐᵇ [f(x) + g(x)] dx = ∫ₐᵇ f(x) dx + ∫ₐᵇ g(x) dx", "∫ₐᵇ k·f(x) dx = k × ∫ₐᵇ f(x) dx", "∫ₐᶜ f(x) dx = ∫ₐᵇ f(x) dx + ∫ᵇᶜ f(x) dx pour a ≤ b ≤ c"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''intégrale définie ne dépend pas de la variable d''intégration : ∫ₐᵇ f(x) dx = ∫ₐᵇ f(t) dt est toujours vrai, mais cela ne signifie pas que f(x) = f(t) car x et t sont des variables muettes. Cette affirmation est donc fausse. Les trois autres propriétés (linéarité et relation de Chasles) sont correctes.", "steps": ["L''intégrale ne dépend pas du nom de la variable (variable muette)", "∫ₐᵇ f(x)dx = ∫ₐᵇ f(t)dt est vrai mais n''implique PAS f(x)=f(t)", "La linéarité et la relation de Chasles sont des propriétés vraies"]}',
  '{"text_fr": "Attention à la différence entre une égalité d''intégrales et une égalité de fonctions."}',
  '{"bac_style","proprietes"}'
),
(
  '44444444-0000-0000-0000-000000000086',
  '33333333-0000-0000-0000-000000000014',
  'numeric', 3, 'fr',
  '{"stem": "Calculer ∫₀^π sin(x) dx.", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "Une primitive de sin(x) est -cos(x). ∫₀^π sin(x) dx = [-cos(x)]₀^π = -cos(π) - (-cos(0)) = -(-1) + 1 = 1 + 1 = 2.", "steps": ["Primitive de sin(x) : F(x) = -cos(x)", "F(π) = -cos(π) = -(-1) = 1", "F(0) = -cos(0) = -1", "∫₀^π sin(x) dx = F(π) - F(0) = 1 - (-1) = 2"]}',
  '{"text_fr": "La primitive de sin(x) est -cos(x). Appliquez la formule ∫ₐᵇ f(x)dx = F(b) - F(a)."}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000087',
  '33333333-0000-0000-0000-000000000014',
  'true_false', 3, 'fr',
  '{"stem": "Si f est continue et positive sur [a, b], alors ∫ₐᵇ f(x) dx ≥ 0.", "correct_answer": true}',
  '{"text_fr": "Vrai. C''est la propriété de positivité de l''intégrale : si f est continue et f(x) ≥ 0 pour tout x ∈ [a, b], alors ∫ₐᵇ f(x) dx ≥ 0. Géométriquement, l''intégrale représente l''aire sous la courbe, qui est positive.", "steps": ["f(x) ≥ 0 sur [a, b]", "L''intégrale mesure l''aire algébrique sous la courbe", "Aire sous une courbe positive = aire positive", "Donc ∫ₐᵇ f(x) dx ≥ 0"]}',
  '{"text_fr": "Pensez à l''interprétation géométrique de l''intégrale comme une aire."}',
  '{"bac_style","proprietes"}'
),
(
  '44444444-0000-0000-0000-000000000088',
  '33333333-0000-0000-0000-000000000014',
  'mcq', 3, 'fr',
  '{"stem": "Calculer ∫₁ᵉ (1/x) dx.", "choices": ["1", "e - 1", "ln(e) - ln(1) = 0", "1/e"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Une primitive de 1/x sur ]0, +∞[ est ln(x). ∫₁ᵉ (1/x) dx = [ln(x)]₁ᵉ = ln(e) - ln(1) = 1 - 0 = 1.", "steps": ["Primitive de 1/x : F(x) = ln(x)", "F(e) = ln(e) = 1", "F(1) = ln(1) = 0", "∫₁ᵉ (1/x) dx = 1 - 0 = 1"]}',
  '{"text_fr": "Rappel : la primitive de 1/x est ln(x). Utilisez les valeurs remarquables ln(1) et ln(e)."}',
  '{"bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000089',
  '33333333-0000-0000-0000-000000000014',
  'numeric', 4, 'fr',
  '{"stem": "Soit f définie sur [0, 4] par : f(x) = 2x si x ∈ [0, 2] et f(x) = 4 si x ∈ ]2, 4]. Calculer ∫₀⁴ f(x) dx.", "correct_value": 12, "tolerance": 0, "latex": true}',
  '{"text_fr": "On utilise la relation de Chasles : ∫₀⁴ f(x) dx = ∫₀² 2x dx + ∫₂⁴ 4 dx. ∫₀² 2x dx = [x²]₀² = 4 - 0 = 4. ∫₂⁴ 4 dx = [4x]₂⁴ = 16 - 8 = 8. Total = 4 + 8 = 12.", "steps": ["Relation de Chasles : ∫₀⁴ f(x)dx = ∫₀² 2x dx + ∫₂⁴ 4 dx", "∫₀² 2x dx = [x²]₀² = 4 - 0 = 4", "∫₂⁴ 4 dx = [4x]₂⁴ = 16 - 8 = 8", "∫₀⁴ f(x) dx = 4 + 8 = 12"]}',
  '{"text_fr": "Utilisez la relation de Chasles pour découper l''intégrale en deux morceaux."}',
  '{"bac_style","chasles"}'
),
(
  '44444444-0000-0000-0000-000000000090',
  '33333333-0000-0000-0000-000000000014',
  'mcq', 4, 'fr',
  '{"stem": "On considère f continue sur [0, 6] avec ∫₀⁶ f(x) dx = 18. Quelle est la valeur moyenne de f sur [0, 6] ?", "choices": ["3", "18", "6", "12"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La valeur moyenne de f sur [a, b] est μ = (1/(b-a)) × ∫ₐᵇ f(x) dx. Ici μ = (1/6) × 18 = 3.", "steps": ["Formule de la valeur moyenne : μ = (1/(b-a)) × ∫ₐᵇ f(x) dx", "b - a = 6 - 0 = 6", "μ = (1/6) × 18 = 3"]}',
  '{"text_fr": "La valeur moyenne est donnée par μ = (1/(b-a)) × ∫ₐᵇ f(x) dx."}',
  '{"bac_style","valeur_moyenne"}'
);

-- =====================
-- SKILL: integral_apps (Applications : aires et intégrales) — 6 items
-- All items at difficulty 3+ (hint required)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000091',
  '33333333-0000-0000-0000-000000000015',
  'numeric', 3, 'fr',
  '{"stem": "Calculer l''aire, en unités d''aire, du domaine délimité par la courbe de f(x) = x², l''axe des abscisses et les droites x = 0 et x = 3.", "correct_value": 9, "tolerance": 0, "latex": true}',
  '{"text_fr": "f(x) = x² ≥ 0 sur [0, 3], donc l''aire est A = ∫₀³ x² dx = [x³/3]₀³ = 27/3 - 0 = 9 unités d''aire.", "steps": ["f(x) = x² ≥ 0 sur [0, 3]", "A = ∫₀³ x² dx", "[x³/3]₀³ = 3³/3 - 0³/3 = 27/3 = 9", "A = 9 unités d''aire"]}',
  '{"text_fr": "Comme f est positive, l''aire est directement l''intégrale de f."}',
  '{"bac_style","aire"}'
),
(
  '44444444-0000-0000-0000-000000000092',
  '33333333-0000-0000-0000-000000000015',
  'mcq', 3, 'fr',
  '{"stem": "La courbe de f est au-dessous de l''axe des abscisses sur [a, b]. L''aire du domaine compris entre la courbe, l''axe des abscisses et les droites x = a et x = b est :", "choices": ["-∫ₐᵇ f(x) dx", "∫ₐᵇ f(x) dx", "|f(b) - f(a)|", "∫ₐᵇ f²(x) dx"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Quand f est négative sur [a, b], l''intégrale ∫ₐᵇ f(x) dx est négative. L''aire (toujours positive) est donc -∫ₐᵇ f(x) dx, ou de façon équivalente ∫ₐᵇ |f(x)| dx.", "steps": ["Si f(x) ≤ 0 sur [a, b], alors ∫ₐᵇ f(x) dx ≤ 0", "L''aire est une grandeur positive", "A = -∫ₐᵇ f(x) dx = ∫ₐᵇ |f(x)| dx"]}',
  '{"text_fr": "Attention au signe : l''aire est toujours positive, contrairement à l''intégrale."}',
  '{"bac_style","aire_signee"}'
),
(
  '44444444-0000-0000-0000-000000000093',
  '33333333-0000-0000-0000-000000000015',
  'numeric', 4, 'fr',
  '{"stem": "Calculer l''aire, en unités d''aire, du domaine compris entre les courbes de f(x) = x² et g(x) = x sur [0, 1].", "correct_value": 0.167, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Sur [0, 1], on compare f et g : g(x) - f(x) = x - x² = x(1-x) ≥ 0. Donc g est au-dessus de f. A = ∫₀¹ (x - x²) dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6 ≈ 0,167.", "steps": ["Sur [0, 1] : g(x) - f(x) = x - x² = x(1-x) ≥ 0", "g est au-dessus de f sur [0, 1]", "A = ∫₀¹ (g(x) - f(x)) dx = ∫₀¹ (x - x²) dx", "[x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6 ≈ 0,167"]}',
  '{"text_fr": "L''aire entre deux courbes est ∫ₐᵇ |f(x) - g(x)| dx. Déterminez d''abord quelle courbe est au-dessus."}',
  '{"bac_style","aire_entre_courbes"}'
),
(
  '44444444-0000-0000-0000-000000000094',
  '33333333-0000-0000-0000-000000000015',
  'mcq', 4, 'fr',
  '{"stem": "Soit f(x) = sin(x) sur [0, 2π]. L''aire du domaine délimité par la courbe de f et l''axe des abscisses sur [0, 2π] est :", "choices": ["4", "0", "2", "2π"], "correct_index": 0, "latex": true}',
  '{"text_fr": "sin(x) ≥ 0 sur [0, π] et sin(x) ≤ 0 sur [π, 2π]. L''aire = ∫₀^π sin(x) dx + ∫_π^(2π) (-sin(x)) dx = [-cos(x)]₀^π + [cos(x)]_π^(2π) = (1+1) + (1+1) = 2 + 2 = 4.", "steps": ["sin(x) ≥ 0 sur [0, π] et sin(x) ≤ 0 sur [π, 2π]", "A = ∫₀^π sin(x)dx - ∫_π^(2π) sin(x)dx", "∫₀^π sin(x)dx = [-cos(x)]₀^π = -cos(π)+cos(0) = 1+1 = 2", "∫_π^(2π) sin(x)dx = [-cos(x)]_π^(2π) = -cos(2π)+cos(π) = -1-1 = -2", "A = 2 - (-2) = 4"]}',
  '{"text_fr": "Attention : sin(x) change de signe en π. Découpez l''intégrale en deux parties."}',
  '{"bac_style","aire_signee"}'
),
(
  '44444444-0000-0000-0000-000000000095',
  '33333333-0000-0000-0000-000000000015',
  'numeric', 4, 'fr',
  '{"stem": "Soit f(x) = -x² + 4x et g(x) = x. Calculer l''aire, en unités d''aire, du domaine délimité par les courbes de f et g.", "correct_value": 4.5, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "Intersection : -x² + 4x = x ⟹ -x² + 3x = 0 ⟹ x(-x + 3) = 0 ⟹ x = 0 ou x = 3. Sur [0, 3], f(x) - g(x) = -x² + 3x ≥ 0 (sommet en x = 3/2, valeur 9/4 > 0). A = ∫₀³ (-x² + 3x) dx = [-x³/3 + 3x²/2]₀³ = -9 + 27/2 = -9 + 13,5 = 4,5.", "steps": ["Intersection : -x² + 4x = x ⟹ x(-x + 3) = 0 ⟹ x = 0 ou x = 3", "f(x) - g(x) = -x² + 3x ≥ 0 sur [0, 3]", "A = ∫₀³ (-x² + 3x) dx", "= [-x³/3 + 3x²/2]₀³", "= (-27/3 + 27/2) - 0 = -9 + 13,5 = 4,5"]}',
  '{"text_fr": "Trouvez les points d''intersection, puis intégrez la différence des deux fonctions."}',
  '{"bac_style","aire_entre_courbes"}'
),
(
  '44444444-0000-0000-0000-000000000096',
  '33333333-0000-0000-0000-000000000015',
  'true_false', 5, 'fr',
  '{"stem": "Soit f continue sur [a, b]. Si ∫ₐᵇ f(x) dx = 0, alors f est la fonction nulle sur [a, b].", "correct_answer": false}',
  '{"text_fr": "Faux. L''intégrale peut être nulle sans que f soit la fonction nulle. Par exemple, f(x) = sin(x) sur [0, 2π] : ∫₀^(2π) sin(x) dx = 0, mais sin(x) n''est pas identiquement nulle. L''intégrale mesure l''aire algébrique : les parties positives et négatives peuvent se compenser.", "steps": ["Contre-exemple : f(x) = sin(x) sur [0, 2π]", "∫₀^(2π) sin(x) dx = [-cos(x)]₀^(2π) = -cos(2π) + cos(0) = -1 + 1 = 0", "Pourtant sin(x) n''est pas la fonction nulle", "Les aires algébriques positives et négatives se compensent"]}',
  '{"text_fr": "Pensez à une fonction qui prend des valeurs positives et négatives de façon symétrique."}',
  '{"bac_style","piege_classique"}'
);
