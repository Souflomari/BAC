-- ============================================================
-- MATH CONTENT: Limites et continuité (4 skills, 25 items)
-- Topic: 22222222-0000-0000-0000-000000000002
-- Skills:
--   limit_def    (33333333-...-006) difficulty 2 — 6 items
--   limit_calc   (33333333-...-007) difficulty 2 — 7 items (2 existing + 5 new)
--   continuity   (33333333-...-008) difficulty 3 — 6 items
--   tvi          (33333333-...-009) difficulty 3 — 6 items
-- ============================================================

-- =====================
-- SKILL: limit_calc (Calcul de limites) — existing items 012–013
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000012',
  '33333333-0000-0000-0000-000000000007',
  'mcq', 2, 'fr',
  '{"stem": "Calculer lim(x→+∞) (x² - 3x + 1)/(2x² + x).", "choices": ["1/2", "0", "+∞", "1"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On divise numérateur et dénominateur par x². lim (1 - 3/x + 1/x²)/(2 + 1/x) = 1/2.", "steps": ["Diviser par x² au numérateur et au dénominateur", "(x² - 3x + 1)/x² = 1 - 3/x + 1/x²", "(2x² + x)/x² = 2 + 1/x", "Quand x → +∞ : (1 - 0 + 0)/(2 + 0) = 1/2"]}',
  NULL,
  '{"bac_style","forme_indeterminee"}'
),
(
  '44444444-0000-0000-0000-000000000013',
  '33333333-0000-0000-0000-000000000007',
  'numeric', 3, 'fr',
  '{"stem": "Calculer lim(x→0) sin(3x)/x.", "correct_value": 3, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On écrit sin(3x)/x = 3 × sin(3x)/(3x). Or lim(u→0) sin(u)/u = 1, donc la limite vaut 3.", "steps": ["sin(3x)/x = 3 × sin(3x)/(3x)", "Poser u = 3x, quand x → 0, u → 0", "lim(u→0) sin(u)/u = 1", "Donc la limite vaut 3 × 1 = 3"]}',
  '{"text_fr": "Faites apparaître la forme sin(u)/u avec u = 3x."}',
  '{"bac_style","limite_fondamentale"}'
);

-- =====================
-- SKILL: limit_def (Définition et notion de limite) — 6 items (UUIDs 054–059)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000054',
  '33333333-0000-0000-0000-000000000006',
  'mcq', 2, 'fr',
  '{"stem": "Soit f une fonction définie sur ℝ. Dire que lim(x→+∞) f(x) = L signifie que :", "choices": ["f(x) peut être rendue aussi proche de L que l''on veut, pourvu que x soit assez grand", "f(x) = L pour tout x suffisamment grand", "f(x) > L pour tout x > 0", "f(x) est toujours croissante vers L"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La limite d''une fonction en +∞ signifie que f(x) se rapproche arbitrairement de L quand x devient suffisamment grand. Cela ne veut pas dire que f(x) atteint L ni que f est croissante.", "steps": ["lim(x→+∞) f(x) = L signifie : pour tout ε > 0, il existe A tel que pour tout x > A, |f(x) - L| < ε", "En langage courant : f(x) est aussi proche de L qu''on veut si x est assez grand", "f(x) n''a pas besoin d''atteindre L ni d''être monotone"]}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000055',
  '33333333-0000-0000-0000-000000000006',
  'true_false', 2, 'fr',
  '{"stem": "Soit f une fonction. Si lim(x→a⁺) f(x) ≠ lim(x→a⁻) f(x), alors lim(x→a) f(x) n''existe pas.", "correct_answer": true}',
  '{"text_fr": "Vrai. Pour que la limite en a existe, il faut que les limites à gauche et à droite existent et soient égales. Si elles diffèrent, la limite n''existe pas.", "steps": ["lim(x→a) f(x) = L existe si et seulement si :", "lim(x→a⁻) f(x) = L (limite à gauche)", "lim(x→a⁺) f(x) = L (limite à droite)", "Si ces deux limites sont différentes, la limite en a n''existe pas"]}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000056',
  '33333333-0000-0000-0000-000000000006',
  'mcq', 2, 'fr',
  '{"stem": "Soit f définie par f(x) = (x² - 1)/(x - 1) pour x ≠ 1. Quelle est lim(x→1) f(x) ?", "choices": ["2", "0", "1", "La limite n''existe pas"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Pour x ≠ 1, on factorise : (x² - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1) = x + 1. Donc lim(x→1) f(x) = 1 + 1 = 2.", "steps": ["x² - 1 = (x - 1)(x + 1)", "(x² - 1)/(x - 1) = (x - 1)(x + 1)/(x - 1) = x + 1 pour x ≠ 1", "lim(x→1) (x + 1) = 2"]}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000057',
  '33333333-0000-0000-0000-000000000006',
  'true_false', 2, 'fr',
  '{"stem": "Si lim(x→+∞) f(x) = +∞, on dit que la droite y = 0 est asymptote horizontale à la courbe de f.", "correct_answer": false}',
  '{"text_fr": "Faux. Si lim(x→+∞) f(x) = +∞, la fonction diverge : elle n''a pas d''asymptote horizontale en +∞. Une asymptote horizontale y = L existe lorsque lim(x→+∞) f(x) = L avec L fini.", "steps": ["Une asymptote horizontale y = L existe si lim(x→±∞) f(x) = L (L fini)", "Si lim(x→+∞) f(x) = +∞, la fonction croît sans borne", "Il n''y a donc pas d''asymptote horizontale dans ce cas"]}',
  '{"definition","piege_classique"}'
),
(
  '44444444-0000-0000-0000-000000000058',
  '33333333-0000-0000-0000-000000000006',
  'mcq', 2, 'fr',
  '{"stem": "Soit f définie sur ℝ* par f(x) = 1/x. Que vaut lim(x→0⁺) f(x) ?", "choices": ["+∞", "-∞", "0", "La limite n''existe pas"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Quand x tend vers 0 par valeurs positives, 1/x prend des valeurs positives de plus en plus grandes. Donc lim(x→0⁺) 1/x = +∞.", "steps": ["Pour x > 0 et x proche de 0 :", "1/x prend des valeurs arbitrairement grandes", "Par exemple : f(0.1) = 10, f(0.01) = 100, f(0.001) = 1000", "Donc lim(x→0⁺) 1/x = +∞"]}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000059',
  '33333333-0000-0000-0000-000000000006',
  'mcq', 2, 'fr',
  '{"stem": "Soit f une fonction telle que lim(x→+∞) f(x) = 3. Laquelle des affirmations suivantes est correcte ?", "choices": ["La droite y = 3 est asymptote horizontale à la courbe de f en +∞", "f(x) = 3 pour x assez grand", "f est constante égale à 3", "f(x) > 3 pour tout x"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Si lim(x→+∞) f(x) = 3, alors la courbe de f se rapproche de la droite y = 3 quand x → +∞ : c''est la définition d''une asymptote horizontale. La fonction peut osciller autour de 3 sans jamais l''atteindre exactement.", "steps": ["lim(x→+∞) f(x) = 3 signifie que f(x) se rapproche de 3", "La droite y = 3 est donc asymptote horizontale", "Cela ne signifie pas que f(x) = 3 ni que f est constante", "f peut osciller autour de 3 (ex : 3 + sin(x)/x)"]}',
  '{"definition","bac_style"}'
);

-- =====================
-- SKILL: limit_calc (Calcul de limites) — 5 new items (UUIDs 060–064)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000060',
  '33333333-0000-0000-0000-000000000007',
  'mcq', 2, 'fr',
  '{"stem": "Calculer lim(x→+∞) (3x³ - x + 2)/(x³ + 4x²).", "choices": ["3", "0", "+∞", "1"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On divise par x³ au numérateur et au dénominateur. lim (3 - 1/x² + 2/x³)/(1 + 4/x) = 3/1 = 3.", "steps": ["Diviser numérateur et dénominateur par x³", "(3x³ - x + 2)/x³ = 3 - 1/x² + 2/x³", "(x³ + 4x²)/x³ = 1 + 4/x", "Quand x → +∞ : (3 - 0 + 0)/(1 + 0) = 3"]}',
  NULL,
  '{"bac_style","forme_indeterminee"}'
),
(
  '44444444-0000-0000-0000-000000000061',
  '33333333-0000-0000-0000-000000000007',
  'numeric', 2, 'fr',
  '{"stem": "Calculer lim(x→2) (x² - 4)/(x - 2).", "correct_value": 4, "tolerance": 0, "latex": true}',
  '{"text_fr": "On a une forme indéterminée 0/0. On factorise : x² - 4 = (x-2)(x+2). Donc (x²-4)/(x-2) = x+2 pour x ≠ 2. La limite vaut 2 + 2 = 4.", "steps": ["Forme indéterminée 0/0 car x² - 4 = 0 et x - 2 = 0 pour x = 2", "Factorisation : x² - 4 = (x - 2)(x + 2)", "(x² - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2) = x + 2", "lim(x→2) (x + 2) = 4"]}',
  NULL,
  '{"bac_style","forme_indeterminee"}'
),
(
  '44444444-0000-0000-0000-000000000062',
  '33333333-0000-0000-0000-000000000007',
  'numeric', 3, 'fr',
  '{"stem": "Calculer lim(x→0) (eˣ - 1)/x.", "correct_value": 1, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "C''est une limite fondamentale : lim(x→0) (eˣ - 1)/x = 1. Elle correspond à la dérivée de eˣ en x = 0.", "steps": ["Forme indéterminée 0/0 car e⁰ - 1 = 0 et x = 0", "C''est la limite fondamentale de l''exponentielle", "lim(x→0) (eˣ - 1)/x = 1", "Justification : c''est f''(0) avec f(x) = eˣ, et f''(x) = eˣ, donc f''(0) = 1"]}',
  '{"text_fr": "Rappelez-vous la limite fondamentale liée à l''exponentielle."}',
  '{"bac_style","limite_fondamentale"}'
),
(
  '44444444-0000-0000-0000-000000000063',
  '33333333-0000-0000-0000-000000000007',
  'mcq', 3, 'fr',
  '{"stem": "Calculer lim(x→0) (√(1+x) - 1)/x.", "choices": ["1/2", "1", "0", "+∞"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Forme indéterminée 0/0. On multiplie par l''expression conjuguée : (√(1+x) - 1)(√(1+x) + 1) = (1+x) - 1 = x. Donc (√(1+x) - 1)/x = x/(x(√(1+x) + 1)) = 1/(√(1+x) + 1). En x = 0 : 1/(1+1) = 1/2.", "steps": ["Forme 0/0 : √(1+0) - 1 = 0 et x = 0", "Multiplier par le conjugué √(1+x) + 1", "(√(1+x) - 1)(√(1+x) + 1) = (1+x) - 1 = x", "(√(1+x) - 1)/x = 1/(√(1+x) + 1)", "lim(x→0) 1/(√(1+x) + 1) = 1/2"]}',
  '{"text_fr": "Multipliez numérateur et dénominateur par l''expression conjuguée √(1+x) + 1."}',
  '{"bac_style","expression_conjuguee"}'
),
(
  '44444444-0000-0000-0000-000000000064',
  '33333333-0000-0000-0000-000000000007',
  'numeric', 2, 'fr',
  '{"stem": "Calculer lim(x→0) ln(1+x)/x.", "correct_value": 1, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "C''est une limite fondamentale : lim(x→0) ln(1+x)/x = 1. Elle correspond à la dérivée de ln(1+x) en x = 0.", "steps": ["Forme indéterminée 0/0 car ln(1+0) = ln(1) = 0", "C''est la limite fondamentale du logarithme", "lim(x→0) ln(1+x)/x = 1", "Justification : c''est f''(0) avec f(x) = ln(1+x), f''(x) = 1/(1+x), f''(0) = 1"]}',
  NULL,
  '{"bac_style","limite_fondamentale"}'
);

-- =====================
-- SKILL: continuity (Continuité) — 6 items (UUIDs 065–070)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000065',
  '33333333-0000-0000-0000-000000000008',
  'mcq', 3, 'fr',
  '{"stem": "Soit f une fonction. Dire que f est continue en a signifie que :", "choices": ["lim(x→a) f(x) = f(a)", "f(a) existe", "f est dérivable en a", "lim(x→a) f(x) existe"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La continuité en a requiert trois conditions : f(a) est défini, lim(x→a) f(x) existe, et cette limite est égale à f(a). La réponse correcte résume ces trois conditions.", "steps": ["Condition 1 : f(a) est défini", "Condition 2 : lim(x→a) f(x) existe", "Condition 3 : lim(x→a) f(x) = f(a)", "Les trois conditions doivent être vérifiées simultanément"]}',
  '{"text_fr": "La continuité relie la limite de f en a à la valeur f(a)."}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000066',
  '33333333-0000-0000-0000-000000000008',
  'numeric', 3, 'fr',
  '{"stem": "Soit f définie par f(x) = (x² - 9)/(x - 3) pour x ≠ 3 et f(3) = k. Déterminer la valeur de k pour que f soit continue en 3.", "correct_value": 6, "tolerance": 0, "latex": true}',
  '{"text_fr": "Pour x ≠ 3 : f(x) = (x-3)(x+3)/(x-3) = x+3. Donc lim(x→3) f(x) = 6. Pour la continuité, il faut f(3) = lim(x→3) f(x), donc k = 6.", "steps": ["Factoriser : x² - 9 = (x-3)(x+3)", "Pour x ≠ 3 : f(x) = (x-3)(x+3)/(x-3) = x+3", "lim(x→3) f(x) = lim(x→3) (x+3) = 6", "Continuité en 3 : f(3) = k = 6"]}',
  '{"text_fr": "Simplifiez l''expression pour x ≠ 3 puis calculez la limite."}',
  '{"bac_style","prolongement_par_continuite"}'
),
(
  '44444444-0000-0000-0000-000000000067',
  '33333333-0000-0000-0000-000000000008',
  'true_false', 3, 'fr',
  '{"stem": "Si f est dérivable en a, alors f est continue en a.", "correct_answer": true}',
  '{"text_fr": "Vrai. La dérivabilité implique la continuité. Si f est dérivable en a, alors lim(x→a) (f(x)-f(a))/(x-a) existe. On peut alors montrer que lim(x→a) f(x) = f(a), donc f est continue en a. Attention : la réciproque est fausse (ex : f(x) = |x| est continue en 0 mais non dérivable).", "steps": ["Dérivabilité en a : lim(x→a) (f(x)-f(a))/(x-a) = f''(a) existe", "On écrit f(x) - f(a) = [(f(x)-f(a))/(x-a)] × (x-a)", "lim(x→a) [f(x) - f(a)] = f''(a) × 0 = 0", "Donc lim(x→a) f(x) = f(a) : f est continue en a"]}',
  '{"text_fr": "Pensez au lien entre dérivabilité et continuité : l''un implique-t-il l''autre ?"}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000068',
  '33333333-0000-0000-0000-000000000008',
  'mcq', 3, 'fr',
  '{"stem": "Soit f définie par f(x) = 2x + 1 si x < 1 et f(x) = x² + 2 si x ≥ 1. La fonction f est-elle continue en x = 1 ?", "choices": ["Oui, car lim(x→1⁻) f(x) = lim(x→1⁺) f(x) = f(1) = 3", "Non, car les limites à gauche et à droite sont différentes", "Non, car f n''est pas définie en 1", "Oui, car f est un polynôme"], "correct_index": 0, "latex": true}',
  '{"text_fr": "lim(x→1⁻) f(x) = 2(1) + 1 = 3. lim(x→1⁺) f(x) = 1² + 2 = 3. f(1) = 1² + 2 = 3. Les trois valeurs sont égales donc f est continue en 1.", "steps": ["lim(x→1⁻) f(x) = lim(x→1⁻) (2x + 1) = 2(1) + 1 = 3", "lim(x→1⁺) f(x) = lim(x→1⁺) (x² + 2) = 1 + 2 = 3", "f(1) = 1² + 2 = 3", "Les trois quantités sont égales : f est continue en 1"]}',
  '{"text_fr": "Calculez la limite à gauche, la limite à droite et la valeur f(1) séparément."}',
  '{"bac_style","fonction_par_morceaux"}'
),
(
  '44444444-0000-0000-0000-000000000069',
  '33333333-0000-0000-0000-000000000008',
  'numeric', 3, 'fr',
  '{"stem": "Soit f définie par f(x) = (x + a) si x ≤ 2 et f(x) = x² - 1 si x > 2. Trouver la valeur de a pour que f soit continue en 2.", "correct_value": 1, "tolerance": 0, "latex": true}',
  '{"text_fr": "lim(x→2⁺) f(x) = 2² - 1 = 3. lim(x→2⁻) f(x) = 2 + a. Pour la continuité : 2 + a = 3, donc a = 1.", "steps": ["lim(x→2⁺) f(x) = lim(x→2⁺) (x² - 1) = 4 - 1 = 3", "lim(x→2⁻) f(x) = lim(x→2⁻) (x + a) = 2 + a", "f(2) = 2 + a (car x = 2 utilise la branche x ≤ 2)", "Continuité en 2 : 2 + a = 3 ⟹ a = 1"]}',
  '{"text_fr": "Égalisez la limite à gauche et la limite à droite en x = 2."}',
  '{"bac_style","fonction_par_morceaux"}'
),
(
  '44444444-0000-0000-0000-000000000070',
  '33333333-0000-0000-0000-000000000008',
  'true_false', 3, 'fr',
  '{"stem": "La composée de deux fonctions continues est continue.", "correct_answer": true}',
  '{"text_fr": "Vrai. Si g est continue en a et f est continue en g(a), alors f∘g est continue en a. C''est un théorème fondamental sur la continuité.", "steps": ["Soit g continue en a : lim(x→a) g(x) = g(a)", "Soit f continue en g(a) : lim(y→g(a)) f(y) = f(g(a))", "Alors lim(x→a) f(g(x)) = f(lim(x→a) g(x)) = f(g(a))", "Donc f∘g est continue en a"]}',
  '{"text_fr": "Pensez à la composition de limites : si g(x) → g(a) et f est continue en g(a)..."}',
  '{"definition","bac_style"}'
);

-- =====================
-- SKILL: tvi (Théorème des valeurs intermédiaires) — 6 items (UUIDs 071–076)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000071',
  '33333333-0000-0000-0000-000000000009',
  'mcq', 3, 'fr',
  '{"stem": "Le théorème des valeurs intermédiaires affirme que si f est continue sur [a, b] et si k est un réel compris entre f(a) et f(b), alors :", "choices": ["Il existe au moins un c ∈ ]a, b[ tel que f(c) = k", "Il existe un unique c ∈ ]a, b[ tel que f(c) = k", "f est dérivable sur ]a, b[", "f admet un maximum sur [a, b]"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le TVI garantit l''existence d''au moins un c tel que f(c) = k, mais pas l''unicité. Pour l''unicité, il faudrait en plus que f soit strictement monotone.", "steps": ["Hypothèses du TVI : f continue sur [a, b]", "k est un réel compris entre f(a) et f(b)", "Conclusion : il existe au moins un c ∈ ]a, b[ tel que f(c) = k", "Le TVI ne garantit pas l''unicité de c"]}',
  '{"text_fr": "Attention à la nuance entre existence et unicité."}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000072',
  '33333333-0000-0000-0000-000000000009',
  'true_false', 3, 'fr',
  '{"stem": "Soit f continue sur [0, 1] telle que f(0) = -2 et f(1) = 5. Alors l''équation f(x) = 0 admet au moins une solution dans ]0, 1[.", "correct_answer": true}',
  '{"text_fr": "Vrai. f est continue sur [0, 1], f(0) = -2 < 0 et f(1) = 5 > 0. Comme 0 est compris entre f(0) et f(1), le TVI garantit l''existence d''au moins un c ∈ ]0, 1[ tel que f(c) = 0.", "steps": ["f est continue sur [0, 1] (hypothèse)", "f(0) = -2 < 0 et f(1) = 5 > 0", "0 est compris entre -2 et 5", "Par le TVI, ∃c ∈ ]0, 1[ tel que f(c) = 0"]}',
  '{"text_fr": "Vérifiez que f(0) et f(1) sont de signes contraires et que f est continue."}',
  '{"bac_style","tvi"}'
),
(
  '44444444-0000-0000-0000-000000000073',
  '33333333-0000-0000-0000-000000000009',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = x³ + x - 1. On veut montrer que l''équation f(x) = 0 admet une solution dans [0, 1]. Quelles sont les valeurs de f(0) et f(1) ?", "choices": ["f(0) = -1 et f(1) = 1", "f(0) = 0 et f(1) = 1", "f(0) = -1 et f(1) = 0", "f(0) = 1 et f(1) = 3"], "correct_index": 0, "latex": true}',
  '{"text_fr": "f(0) = 0³ + 0 - 1 = -1 et f(1) = 1³ + 1 - 1 = 1. Comme f(0) < 0 < f(1) et f est continue (polynôme), le TVI garantit l''existence d''une solution dans ]0, 1[.", "steps": ["f(0) = 0 + 0 - 1 = -1", "f(1) = 1 + 1 - 1 = 1", "f(0) = -1 < 0 et f(1) = 1 > 0", "f est un polynôme donc continue sur [0, 1]", "Par le TVI, ∃c ∈ ]0, 1[ tel que f(c) = 0"]}',
  '{"text_fr": "Calculez f(0) et f(1) en remplaçant dans l''expression."}',
  '{"bac_style","tvi"}'
),
(
  '44444444-0000-0000-0000-000000000074',
  '33333333-0000-0000-0000-000000000009',
  'true_false', 3, 'fr',
  '{"stem": "Soit f continue et strictement croissante sur [a, b] avec f(a) < 0 et f(b) > 0. Alors l''équation f(x) = 0 admet une unique solution dans ]a, b[.", "correct_answer": true}',
  '{"text_fr": "Vrai. Par le TVI, comme f est continue et f(a) < 0 < f(b), il existe au moins un c ∈ ]a, b[ tel que f(c) = 0. La stricte croissance assure l''unicité : si c₁ < c₂ étaient deux solutions, on aurait f(c₁) < f(c₂) par stricte croissance, ce qui contredit f(c₁) = f(c₂) = 0.", "steps": ["f continue, f(a) < 0 < f(b) : le TVI donne l''existence de c", "f strictement croissante : si c₁ < c₂ alors f(c₁) < f(c₂)", "Donc il ne peut pas y avoir deux solutions distinctes de f(x) = 0", "Conclusion : l''équation admet exactement une solution dans ]a, b["]}',
  '{"text_fr": "Le TVI donne l''existence. Que faut-il pour avoir l''unicité ?"}',
  '{"bac_style","tvi","corollaire"}'
),
(
  '44444444-0000-0000-0000-000000000075',
  '33333333-0000-0000-0000-000000000009',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = eˣ - 3x. On admet que f est continue sur ℝ. Sachant que f(0) = 1 et f(2) = e² - 6 ≈ 1.39, peut-on affirmer par le TVI que f(x) = 0 admet une solution dans [0, 2] ?", "choices": ["Non, car f(0) et f(2) sont tous deux positifs", "Oui, car f est continue sur [0, 2]", "Oui, car f est dérivable sur [0, 2]", "Non, car f n''est pas un polynôme"], "correct_index": 0, "latex": true}',
  '{"text_fr": "f(0) = e⁰ - 0 = 1 > 0 et f(2) = e² - 6 ≈ 7.39 - 6 = 1.39 > 0. Les deux valeurs sont positives, donc le TVI ne permet pas de conclure à l''existence d''un zéro dans [0, 2]. Cela ne signifie pas qu''il n''y en a pas, mais le TVI ne s''applique pas ici.", "steps": ["f(0) = e⁰ - 3(0) = 1 > 0", "f(2) = e² - 6 ≈ 7.389 - 6 = 1.389 > 0", "f(0) > 0 et f(2) > 0 : même signe", "Le TVI ne permet pas de conclure (condition f(a)·f(b) < 0 non vérifiée)"]}',
  '{"text_fr": "Pour appliquer le TVI, il faut que f(a) et f(b) soient de signes contraires."}',
  '{"bac_style","tvi","piege_classique"}'
),
(
  '44444444-0000-0000-0000-000000000076',
  '33333333-0000-0000-0000-000000000009',
  'numeric', 3, 'fr',
  '{"stem": "Soit f(x) = x³ - 2x - 5. On sait que f est continue sur ℝ. Calculer f(2) et en déduire que l''équation f(x) = 0 admet une solution dans [2, 3]. Quelle est la valeur de f(2) ?", "correct_value": -1, "tolerance": 0, "latex": true}',
  '{"text_fr": "f(2) = 2³ - 2(2) - 5 = 8 - 4 - 5 = -1. De plus, f(3) = 27 - 6 - 5 = 16 > 0. Comme f(2) = -1 < 0 et f(3) = 16 > 0, par le TVI, l''équation f(x) = 0 admet au moins une solution dans ]2, 3[.", "steps": ["f(2) = 8 - 4 - 5 = -1", "f(3) = 27 - 6 - 5 = 16", "f(2) = -1 < 0 et f(3) = 16 > 0", "f est un polynôme, donc continue sur [2, 3]", "Par le TVI, ∃c ∈ ]2, 3[ tel que f(c) = 0"]}',
  '{"text_fr": "Substituez x = 2 dans l''expression x³ - 2x - 5."}',
  '{"bac_style","tvi"}'
);
