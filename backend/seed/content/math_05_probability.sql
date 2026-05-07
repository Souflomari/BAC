-- ============================================================
-- MATH CONTENT: Probabilités (3 skills, 20 items)
-- Topic: 22222222-0000-0000-0000-000000000005
-- Skills:
--   prob_basic        (33333333-...-016) difficulty 1 — 7 items
--   conditional_prob  (33333333-...-017) difficulty 2 — 7 items
--   random_variables  (33333333-...-018) difficulty 3 — 6 items
-- ============================================================

-- =====================
-- SKILL: prob_basic (Probabilités de base) — 7 items
-- Difficulty distribution: 1, 1, 1, 2, 2, 2, 2
-- Mix: 3 mcq, 3 numeric, 1 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000097',
  '33333333-0000-0000-0000-000000000016',
  'mcq', 1, 'fr',
  '{"stem": "On lance un dé cubique équilibré. Quelle est la probabilité d''obtenir un nombre pair ?", "choices": ["1/2", "1/3", "2/3", "1/6"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Les faces paires sont {2, 4, 6}, soit 3 issues favorables sur 6 issues possibles. P = 3/6 = 1/2.", "steps": ["L''univers est Ω = {1, 2, 3, 4, 5, 6}, card(Ω) = 6", "L''événement A = {2, 4, 6}, card(A) = 3", "P(A) = card(A)/card(Ω) = 3/6 = 1/2"]}',
  '{"probabilite_simple","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000098',
  '33333333-0000-0000-0000-000000000016',
  'numeric', 1, 'fr',
  '{"stem": "On tire une carte au hasard dans un jeu de 52 cartes. Quelle est la probabilité d''obtenir un as ? Donner la réponse sous forme décimale arrondie au centième.", "correct_value": 0.08, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Il y a 4 as dans un jeu de 52 cartes. P(as) = 4/52 = 1/13 ≈ 0.077.", "steps": ["Nombre d''issues favorables : 4 as", "Nombre total d''issues : 52 cartes", "P(as) = 4/52 = 1/13 ≈ 0.08"]}',
  '{"probabilite_simple","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000099',
  '33333333-0000-0000-0000-000000000016',
  'true_false', 1, 'fr',
  '{"stem": "Lorsqu''on lance un dé équilibré, la probabilité d''obtenir un 7 est égale à 0.", "correct_answer": true}',
  '{"text_fr": "Vrai. Un dé cubique standard a pour faces {1, 2, 3, 4, 5, 6}. L''événement «obtenir 7» est impossible, donc sa probabilité est 0.", "steps": ["L''univers est Ω = {1, 2, 3, 4, 5, 6}", "7 ∉ Ω, donc l''événement est impossible", "La probabilité d''un événement impossible est 0"]}',
  '{"probabilite_simple"}'
),
(
  '44444444-0000-0000-0000-000000000100',
  '33333333-0000-0000-0000-000000000016',
  'mcq', 2, 'fr',
  '{"stem": "Une urne contient 5 boules rouges, 3 boules bleues et 2 boules vertes. On tire une boule au hasard. Quelle est la probabilité de ne pas tirer une boule rouge ?", "choices": ["1/2", "1/5", "3/10", "2/5"], "correct_index": 0, "latex": true}',
  '{"text_fr": "P(non rouge) = 1 − P(rouge) = 1 − 5/10 = 5/10 = 1/2. On peut aussi compter directement : 3 bleues + 2 vertes = 5 boules non rouges sur 10.", "steps": ["Nombre total de boules : 5 + 3 + 2 = 10", "P(rouge) = 5/10 = 1/2", "P(non rouge) = 1 − P(rouge) = 1 − 1/2 = 1/2"]}',
  '{"complementaire","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000101',
  '33333333-0000-0000-0000-000000000016',
  'numeric', 2, 'fr',
  '{"stem": "On lance deux dés équilibrés. Combien d''issues possibles y a-t-il au total dans l''univers ?", "correct_value": 36, "tolerance": 0, "latex": true}',
  '{"text_fr": "Chaque dé a 6 faces. Le nombre total d''issues est 6 × 6 = 36.", "steps": ["Dé 1 : 6 résultats possibles", "Dé 2 : 6 résultats possibles", "Principe multiplicatif : 6 × 6 = 36 issues"]}',
  '{"denombrement","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000102',
  '33333333-0000-0000-0000-000000000016',
  'mcq', 2, 'fr',
  '{"stem": "On lance deux dés équilibrés. Soit A l''événement «la somme vaut 7» et B l''événement «la somme vaut 11». Les événements A et B sont incompatibles. Quelle est P(A ∪ B) ?", "choices": ["8/36", "6/36", "2/36", "12/36"], "correct_index": 0, "latex": true}',
  '{"text_fr": "A et B sont incompatibles donc P(A ∪ B) = P(A) + P(B). Les couples donnant 7 : (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 issues. Les couples donnant 11 : (5,6),(6,5) → 2 issues. P(A ∪ B) = (6+2)/36 = 8/36 = 2/9.", "steps": ["Couples pour somme = 7 : (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6", "Couples pour somme = 11 : (5,6),(6,5) → 2", "A et B incompatibles ⟹ P(A ∪ B) = P(A) + P(B)", "P(A ∪ B) = 6/36 + 2/36 = 8/36"]}',
  '{"union","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000103',
  '33333333-0000-0000-0000-000000000016',
  'numeric', 2, 'fr',
  '{"stem": "On tire simultanément 2 cartes d''un jeu de 52 cartes. Calculer le nombre de tirages possibles (combinaisons).", "correct_value": 1326, "tolerance": 0, "latex": true}',
  '{"text_fr": "Le tirage simultané de 2 cartes parmi 52 est une combinaison : C(52,2) = 52!/(2!×50!) = (52×51)/2 = 1326.", "steps": ["Tirage simultané = combinaison sans ordre", "C(52,2) = 52! / (2! × 50!)", "C(52,2) = (52 × 51) / (2 × 1) = 2652 / 2 = 1326"]}',
  '{"denombrement","bac_style"}'
);

-- =====================
-- SKILL: conditional_prob (Probabilités conditionnelles) — 7 items
-- Difficulty distribution: 2, 2, 2, 3, 3, 3, 3
-- Mix: 3 mcq, 3 numeric, 1 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000104',
  '33333333-0000-0000-0000-000000000017',
  'mcq', 2, 'fr',
  '{"stem": "On sait que P(A) = 0.6, P(B) = 0.5 et P(A ∩ B) = 0.3. Quelle est la probabilité conditionnelle P(A|B) ?", "choices": ["0.6", "0.3", "0.5", "0.8"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Par définition, P(A|B) = P(A ∩ B) / P(B) = 0.3 / 0.5 = 0.6.", "steps": ["Formule : P(A|B) = P(A ∩ B) / P(B)", "P(A|B) = 0.3 / 0.5", "P(A|B) = 0.6"]}',
  '{"conditionnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000105',
  '33333333-0000-0000-0000-000000000017',
  'numeric', 2, 'fr',
  '{"stem": "Dans une classe, 60 % des élèves font du sport et parmi ceux-ci, 40 % font du football. Quelle est la probabilité qu''un élève choisi au hasard fasse du sport ET du football ? Donner la réponse sous forme décimale.", "correct_value": 0.24, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Soit S = «faire du sport» et F = «faire du football». P(S) = 0.60 et P(F|S) = 0.40. On cherche P(S ∩ F) = P(S) × P(F|S) = 0.60 × 0.40 = 0.24.", "steps": ["P(S) = 0.60", "P(F|S) = 0.40", "P(S ∩ F) = P(S) × P(F|S) = 0.60 × 0.40 = 0.24"]}',
  '{"conditionnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000106',
  '33333333-0000-0000-0000-000000000017',
  'true_false', 2, 'fr',
  '{"stem": "Si deux événements A et B sont indépendants, alors P(A ∩ B) = P(A) + P(B).", "correct_answer": false}',
  '{"text_fr": "Faux. Si A et B sont indépendants, alors P(A ∩ B) = P(A) × P(B) (produit, pas somme). La formule P(A ∪ B) = P(A) + P(B) est valable pour des événements incompatibles, ce qui est différent de l''indépendance.", "steps": ["Indépendance : P(A ∩ B) = P(A) × P(B)", "Incompatibilité : P(A ∪ B) = P(A) + P(B)", "Ne pas confondre indépendance et incompatibilité"]}',
  '{"piege_classique","independance"}'
);

INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000107',
  '33333333-0000-0000-0000-000000000017',
  'numeric', 3, 'fr',
  '{"stem": "Une maladie touche 1 % de la population. Un test de dépistage a une sensibilité de 95 % (P(T+|M) = 0.95) et une spécificité de 90 % (P(T−|M̄) = 0.90). Un individu est testé positif. Quelle est la probabilité qu''il soit réellement malade ? Arrondir au centième.", "correct_value": 0.09, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Par le théorème de Bayes : P(M|T+) = P(T+|M)×P(M) / P(T+). P(T+) = P(T+|M)×P(M) + P(T+|M̄)×P(M̄) = 0.95×0.01 + 0.10×0.99 = 0.0095 + 0.099 = 0.1085. Donc P(M|T+) = 0.0095/0.1085 ≈ 0.0876 ≈ 0.09.", "steps": ["P(M) = 0.01, P(M̄) = 0.99", "P(T+|M) = 0.95, P(T+|M̄) = 1 − 0.90 = 0.10", "P(T+) = 0.95 × 0.01 + 0.10 × 0.99 = 0.0095 + 0.099 = 0.1085", "P(M|T+) = 0.0095 / 0.1085 ≈ 0.088 ≈ 0.09"]}',
  '{"text_fr": "Utilisez le théorème de Bayes et calculez d''abord P(T+) par la formule des probabilités totales."}',
  '{"bayes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000108',
  '33333333-0000-0000-0000-000000000017',
  'mcq', 3, 'fr',
  '{"stem": "Une usine a deux machines. La machine M₁ produit 60 % des pièces avec un taux de défaut de 5 %. La machine M₂ produit 40 % des pièces avec un taux de défaut de 3 %. On choisit une pièce au hasard et elle est défectueuse. Quelle est la probabilité qu''elle provienne de M₁ ?", "choices": ["5/7", "3/5", "1/2", "2/3"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Par Bayes : P(M₁|D) = P(D|M₁)×P(M₁) / P(D). P(D) = 0.05×0.60 + 0.03×0.40 = 0.030 + 0.012 = 0.042. P(M₁|D) = 0.030/0.042 = 30/42 = 5/7.", "steps": ["P(M₁) = 0.60, P(M₂) = 0.40", "P(D|M₁) = 0.05, P(D|M₂) = 0.03", "P(D) = 0.05 × 0.60 + 0.03 × 0.40 = 0.030 + 0.012 = 0.042", "P(M₁|D) = 0.030 / 0.042 = 30/42 = 5/7"]}',
  '{"text_fr": "Appliquez la formule de Bayes après avoir calculé P(D) par la formule des probabilités totales."}',
  '{"bayes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000109',
  '33333333-0000-0000-0000-000000000017',
  'mcq', 3, 'fr',
  '{"stem": "On lance successivement deux dés équilibrés. Sachant que la somme obtenue est supérieure ou égale à 10, quelle est la probabilité que le premier dé affiche un 6 ?", "choices": ["3/6", "1/6", "2/6", "4/6"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Les couples (d₁,d₂) donnant une somme ≥ 10 sont : (4,6),(5,5),(5,6),(6,4),(6,5),(6,6) → 6 issues. Parmi celles-ci, le premier dé vaut 6 dans : (6,4),(6,5),(6,6) → 3 issues. P = 3/6 = 1/2.", "steps": ["Somme ≥ 10 : (4,6),(5,5),(5,6),(6,4),(6,5),(6,6) → 6 couples", "Premier dé = 6 et somme ≥ 10 : (6,4),(6,5),(6,6) → 3 couples", "P(d₁=6 | somme≥10) = 3/6 = 1/2"]}',
  '{"text_fr": "Listez tous les couples (d₁,d₂) dont la somme est ≥ 10, puis identifiez ceux où d₁ = 6."}',
  '{"conditionnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000110',
  '33333333-0000-0000-0000-000000000017',
  'numeric', 3, 'fr',
  '{"stem": "Un sac contient 4 boules rouges et 6 boules blanches. On tire deux boules successivement sans remise. Quelle est la probabilité que la deuxième boule soit rouge sachant que la première est blanche ? Donner la réponse sous forme décimale arrondie au centième.", "correct_value": 0.44, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Si la première boule tirée est blanche, il reste dans le sac 4 boules rouges et 5 boules blanches, soit 9 boules au total. P(R₂|B₁) = 4/9 ≈ 0.444.", "steps": ["Après avoir tiré une boule blanche : 4 rouges et 5 blanches restent", "Total restant : 9 boules", "P(R₂|B₁) = 4/9 ≈ 0.44"]}',
  '{"text_fr": "Après le premier tirage sans remise, déterminez la nouvelle composition du sac."}',
  '{"conditionnelle","sans_remise","bac_style"}'
);

-- =====================
-- SKILL: random_variables (Variables aléatoires) — 6 items
-- Difficulty distribution: 2, 3, 3, 3, 4, 4
-- Mix: 3 mcq, 2 numeric, 1 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000111',
  '33333333-0000-0000-0000-000000000018',
  'mcq', 2, 'fr',
  '{"stem": "Une variable aléatoire X suit la loi définie par : P(X=0) = 0.3, P(X=1) = 0.5, P(X=2) = 0.2. Quelle est l''espérance E(X) ?", "choices": ["0.9", "1", "0.5", "1.2"], "correct_index": 0, "latex": true}',
  '{"text_fr": "E(X) = Σ xᵢ × P(X=xᵢ) = 0×0.3 + 1×0.5 + 2×0.2 = 0 + 0.5 + 0.4 = 0.9.", "steps": ["E(X) = 0 × 0.3 + 1 × 0.5 + 2 × 0.2", "E(X) = 0 + 0.5 + 0.4", "E(X) = 0.9"]}',
  '{"esperance","bac_style"}'
);

INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000112',
  '33333333-0000-0000-0000-000000000018',
  'numeric', 3, 'fr',
  '{"stem": "On lance un dé équilibré et on note X le numéro obtenu. Calculer la variance V(X). Donner la réponse sous forme décimale arrondie au centième.", "correct_value": 2.92, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "E(X) = (1+2+3+4+5+6)/6 = 21/6 = 3.5. E(X²) = (1+4+9+16+25+36)/6 = 91/6 ≈ 15.1667. V(X) = E(X²) − [E(X)]² = 91/6 − (7/2)² = 91/6 − 49/4 = (182−147)/12 = 35/12 ≈ 2.9167.", "steps": ["E(X) = (1+2+3+4+5+6)/6 = 21/6 = 3.5", "E(X²) = (1²+2²+3²+4²+5²+6²)/6 = 91/6", "V(X) = E(X²) − [E(X)]² = 91/6 − (3.5)²", "V(X) = 91/6 − 49/4 = 35/12 ≈ 2.92"]}',
  '{"text_fr": "Utilisez la formule V(X) = E(X²) − [E(X)]²."}',
  '{"variance","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000113',
  '33333333-0000-0000-0000-000000000018',
  'mcq', 3, 'fr',
  '{"stem": "X suit une loi binomiale B(10, 0.3). Quelle est l''espérance E(X) ?", "choices": ["3", "7", "0.3", "30"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Pour X ~ B(n,p), l''espérance est E(X) = n × p = 10 × 0.3 = 3.", "steps": ["X ~ B(n,p) avec n = 10 et p = 0.3", "Formule : E(X) = n × p", "E(X) = 10 × 0.3 = 3"]}',
  '{"text_fr": "Pour une loi binomiale B(n,p), E(X) = n×p."}',
  '{"binomiale","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000114',
  '33333333-0000-0000-0000-000000000018',
  'true_false', 3, 'fr',
  '{"stem": "Si X suit une loi binomiale B(n, p), alors V(X) = n × p × (1 − p).", "correct_answer": true}',
  '{"text_fr": "Vrai. La variance d''une variable aléatoire suivant une loi binomiale B(n,p) est bien V(X) = n × p × (1 − p) = npq avec q = 1 − p.", "steps": ["X ~ B(n,p)", "V(X) = n × p × (1 − p)", "C''est une formule fondamentale du cours sur la loi binomiale"]}',
  '{"text_fr": "Rappeler la formule de la variance pour une loi binomiale."}',
  '{"binomiale","variance"}'
),
(
  '44444444-0000-0000-0000-000000000115',
  '33333333-0000-0000-0000-000000000018',
  'numeric', 4, 'fr',
  '{"stem": "On lance une pièce équilibrée 100 fois. Soit X le nombre de «Pile» obtenus. X suit une loi binomiale B(100, 0.5). Calculer l''écart-type σ(X).", "correct_value": 5, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "X ~ B(100, 0.5). V(X) = n×p×(1−p) = 100 × 0.5 × 0.5 = 25. σ(X) = √V(X) = √25 = 5.", "steps": ["X ~ B(100, 0.5)", "V(X) = n × p × (1 − p) = 100 × 0.5 × 0.5 = 25", "σ(X) = √V(X) = √25 = 5"]}',
  '{"text_fr": "Calculez d''abord la variance V(X) = npq, puis σ(X) = √V(X)."}',
  '{"binomiale","ecart_type","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000116',
  '33333333-0000-0000-0000-000000000018',
  'mcq', 4, 'fr',
  '{"stem": "Un QCM comporte 20 questions à 4 choix chacune. Un candidat répond au hasard à toutes les questions. Soit X le nombre de bonnes réponses. Quelle est la probabilité P(X = 0) ? (arrondie à 10⁻³)", "choices": ["0.003", "0.050", "0.200", "0.000"], "correct_index": 0, "latex": true}',
  '{"text_fr": "X ~ B(20, 1/4). P(X=0) = C(20,0) × (1/4)⁰ × (3/4)²⁰ = (3/4)²⁰. (3/4)²⁰ = (0.75)²⁰ ≈ 0.00317 ≈ 0.003.", "steps": ["X ~ B(20, 0.25)", "P(X=0) = C(20,0) × (0.25)⁰ × (0.75)²⁰", "P(X=0) = 1 × 1 × (0.75)²⁰", "(0.75)²⁰ ≈ 0.00317 ≈ 0.003"]}',
  '{"text_fr": "X suit une loi B(20, 1/4). Utilisez P(X=k) = C(n,k) × pᵏ × (1−p)ⁿ⁻ᵏ avec k=0."}',
  '{"binomiale","bac_style"}'
);
