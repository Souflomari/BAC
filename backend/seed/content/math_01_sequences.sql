-- ============================================================
-- MATH CONTENT: Suites numériques (5 skills, 32 items)
-- Topic: 22222222-0000-0000-0000-000000000001
-- Skills:
--   arithmetic_seq  (33333333-...-001) difficulty 1 — 7 items (3 existing + 4 new)
--   geometric_seq   (33333333-...-002) difficulty 1 — 7 items (3 existing + 4 new)
--   seq_convergence (33333333-...-003) difficulty 2 — 7 items (2 existing + 5 new)
--   seq_recursive   (33333333-...-004) difficulty 3 — 6 items (0 existing + 6 new)
--   seq_adjacent    (33333333-...-005) difficulty 3 — 5 items (0 existing + 5 new)
-- ============================================================

-- =====================
-- SKILL: arithmetic_seq (Suites arithmétiques) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000001',
  '33333333-0000-0000-0000-000000000001',
  'numeric', 1, 'fr',
  '{"stem": "Soit (Uₙ) une suite arithmétique de raison r = 3 et de premier terme U₀ = 5. Calculer U₁₀.", "correct_value": 35, "tolerance": 0, "latex": true}',
  '{"text_fr": "Pour une suite arithmétique, Uₙ = U₀ + n × r. Donc U₁₀ = 5 + 10 × 3 = 35.", "steps": ["Formule du terme général : Uₙ = U₀ + n × r", "U₁₀ = 5 + 10 × 3", "U₁₀ = 5 + 30 = 35"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000002',
  '33333333-0000-0000-0000-000000000001',
  'mcq', 1, 'fr',
  '{"stem": "Quelle est la somme des 100 premiers entiers naturels non nuls (1 + 2 + 3 + ... + 100) ?", "choices": ["5050", "5000", "10100", "4950"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On utilise la formule de la somme : S = n(n+1)/2. Donc S = 100 × 101 / 2 = 5050.", "steps": ["Formule : S = n(n+1)/2", "S = 100 × 101 / 2", "S = 10100 / 2 = 5050"]}',
  '{"somme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000003',
  '33333333-0000-0000-0000-000000000001',
  'numeric', 2, 'fr',
  '{"stem": "Soit (Uₙ) une suite arithmétique telle que U₃ = 11 et U₇ = 23. Quelle est la raison r ?", "correct_value": 3, "tolerance": 0, "latex": true}',
  '{"text_fr": "On a U₇ - U₃ = (7 - 3) × r, donc 23 - 11 = 4r, soit 12 = 4r, d''où r = 3.", "steps": ["U₇ = U₃ + (7 - 3) × r", "23 = 11 + 4r", "4r = 12", "r = 3"]}',
  '{"determination_raison","bac_style"}'
),
-- NEW items 030–033
(
  '44444444-0000-0000-0000-000000000030',
  '33333333-0000-0000-0000-000000000001',
  'numeric', 1, 'fr',
  '{"stem": "Soit (Uₙ) une suite arithmétique de raison r = -4 et de premier terme U₀ = 50. Calculer la somme S = U₀ + U₁ + U₂ + ... + U₁₀.", "correct_value": 330, "tolerance": 0, "latex": true}',
  '{"text_fr": "La somme des n+1 premiers termes d''une suite arithmétique est S = (n+1)(U₀ + Uₙ)/2. On calcule d''abord U₁₀ = 50 + 10×(-4) = 10. Puis S = 11 × (50 + 10)/2 = 11 × 30 = 330.", "steps": ["U₁₀ = U₀ + 10r = 50 + 10×(-4) = 10", "S = (nombre de termes) × (U₀ + U₁₀)/2", "S = 11 × (50 + 10)/2", "S = 11 × 30 = 330"]}',
  '{"somme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000031',
  '33333333-0000-0000-0000-000000000001',
  'mcq', 2, 'fr',
  '{"stem": "Soit (Uₙ) une suite arithmétique telle que U₅ = 22 et r = 4. Quelle est la valeur de U₀ ?", "choices": ["2", "6", "42", "-2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On a U₅ = U₀ + 5r, donc 22 = U₀ + 5×4 = U₀ + 20, d''où U₀ = 2.", "steps": ["U₅ = U₀ + 5r", "22 = U₀ + 20", "U₀ = 22 - 20 = 2"]}',
  '{"determination_terme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000032',
  '33333333-0000-0000-0000-000000000001',
  'true_false', 1, 'fr',
  '{"stem": "La suite (Uₙ) définie par Uₙ = 3n² + 1 est une suite arithmétique.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Pour qu''une suite soit arithmétique, la différence Uₙ₊₁ - Uₙ doit être constante. Or Uₙ₊₁ - Uₙ = 3(n+1)² + 1 - (3n² + 1) = 6n + 3, qui dépend de n. La suite n''est donc pas arithmétique.", "steps": ["Uₙ = 3n² + 1", "Uₙ₊₁ = 3(n+1)² + 1 = 3n² + 6n + 4", "Uₙ₊₁ - Uₙ = 6n + 3", "Cette différence dépend de n, donc la suite n''est pas arithmétique"]}',
  '{"piege_classique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000033',
  '33333333-0000-0000-0000-000000000001',
  'numeric', 2, 'fr',
  '{"stem": "Soit (Uₙ) une suite arithmétique de premier terme U₀ = 100 et de raison r = -7. Déterminer le plus petit entier n tel que Uₙ < 0.", "correct_value": 15, "tolerance": 0, "latex": true}',
  '{"text_fr": "On cherche le plus petit n tel que U₀ + nr < 0, soit 100 - 7n < 0, c''est-à-dire n > 100/7 ≈ 14,29. Le plus petit entier est n = 15.", "steps": ["Uₙ = 100 - 7n", "On résout 100 - 7n < 0", "7n > 100", "n > 100/7 ≈ 14,29", "Le plus petit entier naturel est n = 15"]}',
  '{"signe_terme","bac_style"}'
);

-- =====================
-- SKILL: geometric_seq (Suites géométriques) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000004',
  '33333333-0000-0000-0000-000000000002',
  'numeric', 1, 'fr',
  '{"stem": "Soit (Uₙ) une suite géométrique de raison q = 2 et U₀ = 3. Calculer U₅.", "correct_value": 96, "tolerance": 0, "latex": true}',
  '{"text_fr": "Pour une suite géométrique, Uₙ = U₀ × qⁿ. Donc U₅ = 3 × 2⁵ = 3 × 32 = 96.", "steps": ["Formule du terme général : Uₙ = U₀ × qⁿ", "U₅ = 3 × 2⁵", "U₅ = 3 × 32 = 96"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000005',
  '33333333-0000-0000-0000-000000000002',
  'mcq', 2, 'fr',
  '{"stem": "Une suite géométrique (Uₙ) vérifie U₂ = 12 et U₅ = 96. Quelle est la raison q ?", "choices": ["2", "3", "4", "8"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On a U₅ = U₂ × q³, donc 96 = 12 × q³, soit q³ = 8, d''où q = 2.", "steps": ["U₅ = U₂ × q⁽⁵⁻²⁾ = U₂ × q³", "96 = 12 × q³", "q³ = 8", "q = ∛8 = 2"]}',
  '{"determination_raison","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000006',
  '33333333-0000-0000-0000-000000000002',
  'true_false', 1, 'fr',
  '{"stem": "La somme d''une suite géométrique infinie de raison q avec |q| < 1 converge vers U₀/(1-q).", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Lorsque |q| < 1, la somme S = Σ U₀qⁿ (n de 0 à +∞) converge et vaut S = U₀/(1-q). C''est un résultat fondamental sur les séries géométriques.", "steps": ["Sₙ = U₀ × (1 - qⁿ⁺¹)/(1 - q)", "Quand |q| < 1, qⁿ → 0 quand n → +∞", "Donc S = lim Sₙ = U₀/(1 - q)"]}',
  '{"serie_geometrique","bac_style"}'
),
-- NEW items 034–037
(
  '44444444-0000-0000-0000-000000000034',
  '33333333-0000-0000-0000-000000000002',
  'numeric', 2, 'fr',
  '{"stem": "Soit (Uₙ) une suite géométrique de premier terme U₀ = 5 et de raison q = 3. Calculer la somme S = U₀ + U₁ + U₂ + U₃ + U₄.", "correct_value": 605, "tolerance": 0, "latex": true}',
  '{"text_fr": "La somme des n+1 premiers termes d''une suite géométrique est S = U₀ × (1 - qⁿ⁺¹)/(1 - q). Ici S = 5 × (1 - 3⁵)/(1 - 3) = 5 × (1 - 243)/(-2) = 5 × (-242)/(-2) = 5 × 121 = 605.", "steps": ["S = U₀ × (1 - q⁵)/(1 - q)", "S = 5 × (1 - 243)/(1 - 3)", "S = 5 × (-242)/(-2)", "S = 5 × 121 = 605"]}',
  '{"somme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000035',
  '33333333-0000-0000-0000-000000000002',
  'mcq', 1, 'fr',
  '{"stem": "Soit (Uₙ) une suite géométrique de raison q = 1/2 et de premier terme U₀ = 64. Quel est U₆ ?", "choices": ["1", "2", "0.5", "4"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Uₙ = U₀ × qⁿ = 64 × (1/2)⁶ = 64 × 1/64 = 1.", "steps": ["Uₙ = U₀ × qⁿ", "U₆ = 64 × (1/2)⁶", "U₆ = 64 × 1/64 = 1"]}',
  '{"formule_directe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000036',
  '33333333-0000-0000-0000-000000000002',
  'true_false', 2, 'fr',
  '{"stem": "Si (Uₙ) est une suite géométrique de raison q = -1, alors la suite converge.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Si q = -1, alors Uₙ = U₀ × (-1)ⁿ, la suite alterne entre U₀ et -U₀ sans converger (sauf si U₀ = 0). La suite diverge.", "steps": ["U₀ = U₀, U₁ = -U₀, U₂ = U₀, U₃ = -U₀, ...", "La suite oscille entre U₀ et -U₀", "Elle ne converge pas (si U₀ ≠ 0)"]}',
  '{"piege_classique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000037',
  '33333333-0000-0000-0000-000000000002',
  'mcq', 2, 'fr',
  '{"stem": "On considère la suite (Uₙ) définie par U₁ = 6, U₂ = 18 et U₃ = 54. Laquelle des propositions suivantes est correcte ?", "choices": ["(Uₙ) est géométrique de raison 3", "(Uₙ) est arithmétique de raison 12", "(Uₙ) est géométrique de raison 6", "(Uₙ) n''est ni arithmétique ni géométrique"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On vérifie : U₂/U₁ = 18/6 = 3 et U₃/U₂ = 54/18 = 3. Le rapport est constant, donc (Uₙ) est géométrique de raison q = 3.", "steps": ["U₂/U₁ = 18/6 = 3", "U₃/U₂ = 54/18 = 3", "Le rapport Uₙ₊₁/Uₙ est constant égal à 3", "(Uₙ) est une suite géométrique de raison q = 3"]}',
  '{"reconnaissance","bac_style"}'
);

-- =====================
-- SKILL: seq_convergence (Convergence de suites) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000007',
  '33333333-0000-0000-0000-000000000003',
  'mcq', 2, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ = (2n + 1)/(n + 3). La suite (Uₙ) converge vers :", "choices": ["2", "1", "3", "+∞"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On divise numérateur et dénominateur par n : Uₙ = (2 + 1/n)/(1 + 3/n). Quand n → +∞, 1/n → 0 et 3/n → 0, donc Uₙ → 2/1 = 2.", "steps": ["Uₙ = (2n + 1)/(n + 3)", "On divise par n : Uₙ = (2 + 1/n)/(1 + 3/n)", "Quand n → +∞ : 1/n → 0, 3/n → 0", "lim Uₙ = 2/1 = 2"]}',
  '{"limite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000008',
  '33333333-0000-0000-0000-000000000003',
  'true_false', 2, 'fr',
  '{"stem": "Toute suite croissante et majorée est convergente.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. C''est le théorème de la convergence monotone : toute suite croissante et majorée (resp. décroissante et minorée) converge. C''est un résultat fondamental de l''analyse.", "steps": ["Théorème de la convergence monotone :", "Toute suite croissante et majorée converge", "Toute suite décroissante et minorée converge", "Ce théorème est admis en Terminale"]}',
  '{"theoreme","bac_style"}'
),
-- NEW items 038–042
(
  '44444444-0000-0000-0000-000000000038',
  '33333333-0000-0000-0000-000000000003',
  'mcq', 2, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ = (3n² - n + 2)/(n² + 5). La limite de (Uₙ) quand n tend vers +∞ est :", "choices": ["3", "0", "+∞", "2/5"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On divise numérateur et dénominateur par n² (plus haut degré) : Uₙ = (3 - 1/n + 2/n²)/(1 + 5/n²). Quand n → +∞, les termes en 1/n et 1/n² tendent vers 0, donc lim Uₙ = 3/1 = 3.", "steps": ["Uₙ = (3n² - n + 2)/(n² + 5)", "On divise par n² : Uₙ = (3 - 1/n + 2/n²)/(1 + 5/n²)", "Quand n → +∞ : 1/n → 0, 2/n² → 0, 5/n² → 0", "lim Uₙ = 3/1 = 3"]}',
  '{"limite_rationnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000039',
  '33333333-0000-0000-0000-000000000003',
  'true_false', 2, 'fr',
  '{"stem": "Si lim(Uₙ) = +∞ et lim(Vₙ) = -∞, alors lim(Uₙ + Vₙ) = 0.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. C''est une forme indéterminée (+∞ - ∞). La limite de Uₙ + Vₙ peut être n''importe quel réel, +∞, -∞, ou ne pas exister. Exemple : Uₙ = n² et Vₙ = -n donnent lim(Uₙ + Vₙ) = +∞.", "steps": ["(+∞) + (-∞) est une forme indéterminée", "On ne peut pas conclure directement", "Exemple 1 : Uₙ = n+1, Vₙ = -n → lim = 1", "Exemple 2 : Uₙ = n², Vₙ = -n → lim = +∞", "Il faut lever l''indétermination au cas par cas"]}',
  '{"forme_indeterminee","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000040',
  '33333333-0000-0000-0000-000000000003',
  'mcq', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ = (-1)ⁿ/n. Parmi les affirmations suivantes, laquelle est vraie ?", "choices": ["La suite converge vers 0", "La suite diverge vers +∞", "La suite diverge (pas de limite)", "La suite converge vers -1"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On a |Uₙ| = |(-1)ⁿ/n| = 1/n → 0. Par le théorème des gendarmes (encadrement), comme -1/n ≤ Uₙ ≤ 1/n et lim(-1/n) = lim(1/n) = 0, on conclut que lim Uₙ = 0.", "steps": ["|Uₙ| = 1/n", "-1/n ≤ (-1)ⁿ/n ≤ 1/n", "lim(-1/n) = 0 et lim(1/n) = 0", "Par le théorème des gendarmes : lim Uₙ = 0"]}',
  '{"gendarmes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000041',
  '33333333-0000-0000-0000-000000000003',
  'numeric', 2, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ = (5n + 3)/(2n - 1). Calculer la limite de (Uₙ) quand n → +∞.", "correct_value": 2.5, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On divise par n : Uₙ = (5 + 3/n)/(2 - 1/n). Quand n → +∞, on obtient lim Uₙ = 5/2 = 2,5.", "steps": ["Uₙ = (5n + 3)/(2n - 1)", "On divise par n : Uₙ = (5 + 3/n)/(2 - 1/n)", "Quand n → +∞ : 3/n → 0, 1/n → 0", "lim Uₙ = 5/2 = 2,5"]}',
  '{"limite_rationnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000042',
  '33333333-0000-0000-0000-000000000003',
  'mcq', 2, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ = n/(n² + 1). La suite (Uₙ) :", "choices": ["converge vers 0", "converge vers 1", "diverge vers +∞", "converge vers 1/2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On divise par n² : Uₙ = (1/n)/(1 + 1/n²). Quand n → +∞, 1/n → 0 et 1/n² → 0, donc lim Uₙ = 0/1 = 0. On peut aussi écrire Uₙ = 1/(n + 1/n) → 0.", "steps": ["Uₙ = n/(n² + 1)", "On divise par n² : Uₙ = (1/n)/(1 + 1/n²)", "Quand n → +∞ : 1/n → 0", "lim Uₙ = 0"]}',
  '{"limite","bac_style"}'
);

-- =====================
-- SKILL: seq_recursive (Suites récurrentes) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000043',
  '33333333-0000-0000-0000-000000000004',
  'numeric', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par U₀ = 1 et Uₙ₊₁ = (Uₙ + 3)/2 pour tout n ∈ ℕ. Calculer U₃.", "correct_value": 2.75, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On calcule terme par terme : U₁ = (1+3)/2 = 2, U₂ = (2+3)/2 = 2,5, U₃ = (2,5+3)/2 = 5,5/2 = 2,75.", "steps": ["U₀ = 1", "U₁ = (U₀ + 3)/2 = (1 + 3)/2 = 2", "U₂ = (U₁ + 3)/2 = (2 + 3)/2 = 2,5", "U₃ = (U₂ + 3)/2 = (2,5 + 3)/2 = 2,75"]}',
  '{"calcul_termes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000044',
  '33333333-0000-0000-0000-000000000004',
  'mcq', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par Uₙ₊₁ = 2Uₙ - 1 et U₀ = 3. On pose Vₙ = Uₙ - 1. La suite (Vₙ) est :", "choices": ["géométrique de raison 2", "arithmétique de raison 2", "géométrique de raison -1", "constante"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On a Vₙ = Uₙ - 1, donc Uₙ = Vₙ + 1. En substituant : Vₙ₊₁ + 1 = 2(Vₙ + 1) - 1, soit Vₙ₊₁ = 2Vₙ + 2 - 1 - 1 = 2Vₙ. Donc (Vₙ) est géométrique de raison 2.", "steps": ["Vₙ = Uₙ - 1 ⟹ Uₙ = Vₙ + 1", "Uₙ₊₁ = 2Uₙ - 1 ⟹ Vₙ₊₁ + 1 = 2(Vₙ + 1) - 1", "Vₙ₊₁ = 2Vₙ + 2 - 1 - 1 = 2Vₙ", "(Vₙ) est géométrique de raison 2 et V₀ = U₀ - 1 = 2"]}',
  '{"suite_auxiliaire","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000045',
  '33333333-0000-0000-0000-000000000004',
  'mcq', 3, 'fr',
  '{"stem": "Soit f(x) = (x + 6)/4 et (Uₙ) définie par Uₙ₊₁ = f(Uₙ). Le point fixe de f est la solution de f(x) = x. Quelle est sa valeur ?", "choices": ["2", "6", "3", "-2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On résout f(x) = x, soit (x + 6)/4 = x. Donc x + 6 = 4x, soit 6 = 3x, d''où x = 2. Le point fixe est 2. Si la suite converge, elle converge vers 2.", "steps": ["On résout f(x) = x", "(x + 6)/4 = x", "x + 6 = 4x", "3x = 6", "x = 2"]}',
  '{"point_fixe","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000046',
  '33333333-0000-0000-0000-000000000004',
  'true_false', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par U₀ = 0 et Uₙ₊₁ = √(2 + Uₙ). Si la suite converge, sa limite vérifie ℓ = √(2 + ℓ), soit ℓ² - ℓ - 2 = 0.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Si lim Uₙ = ℓ existe, par continuité de f(x) = √(2 + x), on a ℓ = √(2 + ℓ). En élevant au carré : ℓ² = 2 + ℓ, soit ℓ² - ℓ - 2 = 0. Cette équation donne ℓ = 2 ou ℓ = -1. Comme Uₙ ≥ 0 pour tout n, on a ℓ = 2.", "steps": ["Si lim Uₙ = ℓ, passage à la limite dans Uₙ₊₁ = √(2 + Uₙ)", "ℓ = √(2 + ℓ)", "ℓ² = 2 + ℓ (en élevant au carré)", "ℓ² - ℓ - 2 = 0", "(ℓ - 2)(ℓ + 1) = 0, donc ℓ = 2 (car ℓ ≥ 0)"]}',
  '{"passage_limite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000047',
  '33333333-0000-0000-0000-000000000004',
  'numeric', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par U₀ = 10 et Uₙ₊₁ = Uₙ/2 + 1. Si la suite converge vers ℓ, calculer ℓ.", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "Si la suite converge vers ℓ, on passe à la limite : ℓ = ℓ/2 + 1, donc ℓ - ℓ/2 = 1, soit ℓ/2 = 1, d''où ℓ = 2.", "steps": ["Passage à la limite : ℓ = ℓ/2 + 1", "ℓ - ℓ/2 = 1", "ℓ/2 = 1", "ℓ = 2"]}',
  '{"passage_limite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000048',
  '33333333-0000-0000-0000-000000000004',
  'mcq', 3, 'fr',
  '{"stem": "Soit (Uₙ) définie par U₀ = 5 et Uₙ₊₁ = 3Uₙ - 4. On pose Vₙ = Uₙ - 2. L''expression de Vₙ en fonction de n est :", "choices": ["3 × 3ⁿ", "5 × 3ⁿ", "3ⁿ⁺¹ - 2", "2 × 3ⁿ + 2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On a Vₙ₊₁ = Uₙ₊₁ - 2 = 3Uₙ - 4 - 2 = 3Uₙ - 6 = 3(Uₙ - 2) = 3Vₙ. Donc (Vₙ) est géométrique de raison 3 et V₀ = U₀ - 2 = 3. Ainsi Vₙ = 3 × 3ⁿ = 3ⁿ⁺¹.", "steps": ["Vₙ = Uₙ - 2, donc V₀ = 5 - 2 = 3", "Vₙ₊₁ = Uₙ₊₁ - 2 = 3Uₙ - 6 = 3(Uₙ - 2) = 3Vₙ", "(Vₙ) est géométrique de raison 3", "Vₙ = V₀ × 3ⁿ = 3 × 3ⁿ = 3ⁿ⁺¹"]}',
  '{"suite_auxiliaire","bac_style"}'
);

-- =====================
-- SKILL: seq_adjacent (Suites adjacentes) — 5 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000049',
  '33333333-0000-0000-0000-000000000005',
  'true_false', 3, 'fr',
  '{"stem": "Deux suites (Uₙ) et (Vₙ) sont adjacentes si l''une est croissante, l''autre est décroissante, et lim(Vₙ - Uₙ) = 0.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. C''est exactement la définition de suites adjacentes. Si (Uₙ) est croissante, (Vₙ) est décroissante, et lim(Vₙ - Uₙ) = 0, alors les deux suites sont adjacentes et convergent vers une même limite ℓ telle que Uₙ ≤ ℓ ≤ Vₙ.", "steps": ["Définition : (Uₙ) et (Vₙ) sont adjacentes si :", "1) L''une est croissante et l''autre est décroissante", "2) lim(Vₙ - Uₙ) = 0", "Conséquence : elles convergent vers la même limite ℓ"]}',
  '{"definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000050',
  '33333333-0000-0000-0000-000000000005',
  'mcq', 3, 'fr',
  '{"stem": "Soit (Uₙ) et (Vₙ) deux suites adjacentes définies par Uₙ = 1 - 1/n et Vₙ = 1 + 1/n pour n ≥ 1. Quelle est leur limite commune ?", "choices": ["1", "0", "2", "1/2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On vérifie : Uₙ = 1 - 1/n est croissante, Vₙ = 1 + 1/n est décroissante, et Vₙ - Uₙ = 2/n → 0. Les suites sont adjacentes et convergent vers ℓ = 1.", "steps": ["Uₙ = 1 - 1/n : suite croissante (car 1/n décroît)", "Vₙ = 1 + 1/n : suite décroissante", "Vₙ - Uₙ = 2/n → 0 quand n → +∞", "Les suites sont adjacentes et convergent vers 1"]}',
  '{"limite_commune","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000051',
  '33333333-0000-0000-0000-000000000005',
  'true_false', 3, 'fr',
  '{"stem": "Si deux suites (Uₙ) et (Vₙ) sont adjacentes, alors pour tout n on a Uₙ ≤ Vₙ (en supposant (Uₙ) croissante et (Vₙ) décroissante).", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Si (Uₙ) est croissante, (Vₙ) décroissante et lim(Vₙ - Uₙ) = 0, alors Vₙ - Uₙ ≥ 0 pour tout n, donc Uₙ ≤ Vₙ. En effet, si Vₙ - Uₙ devenait négatif, il ne pourrait plus tendre vers 0 par valeurs positives.", "steps": ["(Vₙ - Uₙ) est une suite décroissante (car Vₙ décroît et Uₙ croît)", "lim(Vₙ - Uₙ) = 0 et (Vₙ - Uₙ) est décroissante", "Donc Vₙ - Uₙ ≥ 0 pour tout n", "Ainsi Uₙ ≤ Vₙ pour tout n"]}',
  '{"propriete","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000052',
  '33333333-0000-0000-0000-000000000005',
  'mcq', 3, 'fr',
  '{"stem": "Soit Uₙ = Σₖ₌₁ⁿ 1/k² et Vₙ = Uₙ + 1/n. Pour montrer que (Uₙ) et (Vₙ) sont adjacentes, il suffit de vérifier que :", "choices": ["(Uₙ) est croissante, (Vₙ) est décroissante, et lim(Vₙ - Uₙ) = 0", "(Uₙ) et (Vₙ) ont la même limite", "(Uₙ) est bornée et (Vₙ) est bornée", "Uₙ × Vₙ → 1"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Par définition, pour montrer que deux suites sont adjacentes, il faut vérifier les trois conditions : l''une est croissante, l''autre est décroissante, et la différence tend vers 0. Ici Vₙ - Uₙ = 1/n → 0, (Uₙ) est croissante car on ajoute 1/(n+1)² > 0, et (Vₙ) est décroissante car Vₙ₊₁ - Vₙ = 1/(n+1)² - 1/n + 1/(n+1) qu''on peut vérifier être négatif.", "steps": ["Condition 1 : (Uₙ) croissante car Uₙ₊₁ - Uₙ = 1/(n+1)² > 0", "Condition 2 : (Vₙ) décroissante (à vérifier)", "Condition 3 : Vₙ - Uₙ = 1/n → 0", "Les trois conditions de la définition sont requises"]}',
  '{"methode_demonstration","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000053',
  '33333333-0000-0000-0000-000000000005',
  'numeric', 3, 'fr',
  '{"stem": "Soit (Uₙ) et (Vₙ) adjacentes avec Uₙ = 2 - 3/(n+1) et Vₙ = 2 + 5/(n+1). Calculer la limite commune ℓ de ces deux suites.", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "On calcule directement : lim Uₙ = lim(2 - 3/(n+1)) = 2 et lim Vₙ = lim(2 + 5/(n+1)) = 2. La limite commune est ℓ = 2. On peut aussi vérifier : Vₙ - Uₙ = 8/(n+1) → 0.", "steps": ["lim Uₙ = lim(2 - 3/(n+1)) = 2 - 0 = 2", "lim Vₙ = lim(2 + 5/(n+1)) = 2 + 0 = 2", "Vérification : Vₙ - Uₙ = 8/(n+1) → 0", "La limite commune est ℓ = 2"]}',
  '{"limite_commune","bac_style"}'
);
