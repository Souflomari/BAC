-- ============================================================
-- PHYSICS CONTENT: Mécanique (3 skills, 21 items)
-- Skills:
--   kinematics     (33333333-...-024) difficulty 2 — 7 items
--   newtons_laws   (33333333-...-025) difficulty 3 — 7 items
--   energy         (33333333-...-026) difficulty 3 — 7 items
-- Items: 44444444-0000-0000-0000-000000000148 → ...168
-- ============================================================

-- =====================
-- SKILL: kinematics (Cinématique) — 7 items
-- Covers: MRU, MRUV, équations horaires, vitesse instantanée,
--         accélération, chute libre, mouvement circulaire uniforme
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 148: MRU — numeric
(
  '44444444-0000-0000-0000-000000000148',
  '33333333-0000-0000-0000-000000000024',
  'numeric', 2, 'fr',
  '{"stem": "Un mobile se déplace en mouvement rectiligne uniforme à la vitesse v = 72 km/h. Calculer la distance parcourue (en m) pendant une durée Δt = 5 s.", "correct_value": 100, "tolerance": 0, "latex": true}',
  '{"text_fr": "On convertit d''abord la vitesse : v = 72 km/h = 72 / 3,6 = 20 m/s. En MRU la distance est d = v × Δt = 20 × 5 = 100 m.", "steps": ["Conversion : v = 72 / 3,6 = 20 m/s", "En MRU : d = v × Δt", "d = 20 × 5 = 100 m"]}',
  '{"cinematique","mru","bac_style"}'
),
-- 149: MRUV — équation horaire — mcq
(
  '44444444-0000-0000-0000-000000000149',
  '33333333-0000-0000-0000-000000000024',
  'mcq', 2, 'fr',
  '{"stem": "Un mobile part du repos et subit une accélération constante a = 4 m/s². Quelle est l''équation horaire de sa position x(t) ?", "choices": ["x(t) = 2t²", "x(t) = 4t²", "x(t) = 4t", "x(t) = 2t"], "correct_index": 0, "latex": true}',
  '{"text_fr": "En MRUV avec v₀ = 0 et x₀ = 0, l''équation horaire est x(t) = ½ a t². Avec a = 4 m/s² : x(t) = ½ × 4 × t² = 2t².", "steps": ["Équation horaire du MRUV : x(t) = x₀ + v₀t + ½at²", "Avec x₀ = 0 et v₀ = 0 : x(t) = ½at²", "x(t) = ½ × 4 × t² = 2t²"]}',
  '{"cinematique","mruv","bac_style"}'
),
-- 150: vitesse instantanée — numeric
(
  '44444444-0000-0000-0000-000000000150',
  '33333333-0000-0000-0000-000000000024',
  'numeric', 2, 'fr',
  '{"stem": "Un mobile en MRUV a pour équation horaire x(t) = 3t² + 2t + 1 (en m, t en s). Déterminer la vitesse instantanée (en m/s) à l''instant t = 3 s.", "correct_value": 20, "tolerance": 0, "latex": true}',
  '{"text_fr": "La vitesse instantanée est la dérivée de x(t) par rapport au temps : v(t) = dx/dt = 6t + 2. À t = 3 s : v(3) = 6 × 3 + 2 = 20 m/s.", "steps": ["v(t) = dx/dt", "v(t) = 6t + 2", "v(3) = 6 × 3 + 2 = 18 + 2 = 20 m/s"]}',
  '{"cinematique","vitesse_instantanee","bac_style"}'
),
-- 151: accélération — mcq
(
  '44444444-0000-0000-0000-000000000151',
  '33333333-0000-0000-0000-000000000024',
  'mcq', 3, 'fr',
  '{"stem": "Un mobile en mouvement rectiligne a pour vitesse v(t) = 5t² − 2t + 3 (en m/s). Quelle est l''expression de son accélération a(t) ?", "choices": ["a(t) = 10t − 2", "a(t) = 5t² − 2", "a(t) = 10t + 3", "a(t) = 15t² − 2t"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''accélération est la dérivée de la vitesse par rapport au temps : a(t) = dv/dt = 10t − 2.", "steps": ["a(t) = dv/dt", "Dérivée de 5t² − 2t + 3", "a(t) = 10t − 2"]}',
  '{"cinematique","acceleration","bac_style"}'
),
-- 152: chute libre — numeric
(
  '44444444-0000-0000-0000-000000000152',
  '33333333-0000-0000-0000-000000000024',
  'numeric', 3, 'fr',
  '{"stem": "Un objet est lâché sans vitesse initiale d''une hauteur h = 45 m. Calculer la durée de la chute (en s). On prend g = 10 m/s².", "correct_value": 3, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "En chute libre sans vitesse initiale : h = ½gt². Donc t² = 2h/g = 2 × 45 / 10 = 9, soit t = 3 s.", "steps": ["Équation de chute libre : h = ½gt²", "t² = 2h/g = 2 × 45 / 10 = 9", "t = √9 = 3 s"]}',
  '{"cinematique","chute_libre","bac_style"}'
),
-- 153: chute libre vitesse — mcq
(
  '44444444-0000-0000-0000-000000000153',
  '33333333-0000-0000-0000-000000000024',
  'mcq', 2, 'fr',
  '{"stem": "Un objet est lâché sans vitesse initiale. Après une chute libre de durée t = 4 s, quelle est sa vitesse (en m/s) ? On prend g = 10 m/s².", "choices": ["40 m/s", "80 m/s", "20 m/s", "4 m/s"], "correct_index": 0, "latex": true}',
  '{"text_fr": "En chute libre sans vitesse initiale : v = g × t = 10 × 4 = 40 m/s.", "steps": ["Formule : v = v₀ + gt avec v₀ = 0", "v = g × t = 10 × 4", "v = 40 m/s"]}',
  '{"cinematique","chute_libre","bac_style"}'
),
-- 154: mouvement circulaire uniforme — true_false
(
  '44444444-0000-0000-0000-000000000154',
  '33333333-0000-0000-0000-000000000024',
  'true_false', 2, 'fr',
  '{"stem": "Dans un mouvement circulaire uniforme, le vecteur vitesse est constant.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Dans un MCU, la norme de la vitesse (la rapidité) est constante, mais la direction du vecteur vitesse change en permanence (il est toujours tangent au cercle). Le vecteur vitesse n''est donc pas constant.", "steps": ["En MCU, la norme |v| est constante", "Mais la direction de v change continuellement (tangente au cercle)", "Donc le vecteur vitesse n''est pas constant"]}',
  '{"cinematique","mcu","bac_style"}'
);

-- =====================
-- SKILL: newtons_laws (Lois de Newton) — 7 items
-- Covers: principe d''inertie, PFD, 3ème loi, plan incliné,
--         frottement, tension fil, systèmes en équilibre
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 155: principe d'inertie — true_false
(
  '44444444-0000-0000-0000-000000000155',
  '33333333-0000-0000-0000-000000000025',
  'true_false', 2, 'fr',
  '{"stem": "D''après le principe d''inertie (1ère loi de Newton), si la somme des forces extérieures appliquées à un objet est nulle, alors l''objet est nécessairement immobile.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le principe d''inertie stipule que si ΣF = 0, le corps est soit au repos, soit en mouvement rectiligne uniforme. Il n''est pas nécessairement immobile.", "steps": ["1ère loi : si ΣF = 0, le corps conserve son état de mouvement", "Deux cas possibles : repos OU mouvement rectiligne uniforme", "Donc l''objet n''est pas nécessairement immobile"]}',
  '{"lois_newton","inertie","bac_style"}'
),
-- 156: PFD (F=ma) — numeric
(
  '44444444-0000-0000-0000-000000000156',
  '33333333-0000-0000-0000-000000000025',
  'numeric', 2, 'fr',
  '{"stem": "Un objet de masse m = 5 kg est soumis à une force résultante F = 20 N. Calculer l''accélération (en m/s²) de l''objet.", "correct_value": 4, "tolerance": 0, "latex": true}',
  '{"text_fr": "D''après le PFD (2ème loi de Newton) : ΣF = ma, donc a = F/m = 20/5 = 4 m/s².", "steps": ["PFD : ΣF = m × a", "a = F / m", "a = 20 / 5 = 4 m/s²"]}',
  '{"lois_newton","pfd","bac_style"}'
),
-- 157: 3ème loi de Newton — mcq
(
  '44444444-0000-0000-0000-000000000157',
  '33333333-0000-0000-0000-000000000025',
  'mcq', 2, 'fr',
  '{"stem": "Un livre de masse 2 kg est posé sur une table. D''après la 3ème loi de Newton, quelle est la réaction de la table associée au poids du livre ? On prend g = 10 m/s².", "choices": ["Une force de 20 N dirigée vers le haut, exercée par la table sur le livre", "Une force de 20 N dirigée vers le bas, exercée par la table sur le livre", "Une force de 20 N dirigée vers le bas, exercée par le livre sur la table", "Une force de 10 N dirigée vers le haut, exercée par la table sur le livre"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le poids du livre est P = mg = 2 × 10 = 20 N dirigé vers le bas. En situation d''équilibre, la réaction normale de la table est égale en norme et opposée en direction : R = 20 N vers le haut.", "steps": ["P = mg = 2 × 10 = 20 N (vers le bas)", "À l''équilibre : la réaction normale R = P = 20 N", "R est dirigée vers le haut, exercée par la table sur le livre"]}',
  '{"lois_newton","troisieme_loi","bac_style"}'
),
-- 158: plan incliné sans frottement — numeric
(
  '44444444-0000-0000-0000-000000000158',
  '33333333-0000-0000-0000-000000000025',
  'numeric', 3, 'fr',
  '{"stem": "Un objet de masse m = 4 kg glisse sans frottement sur un plan incliné d''angle α = 30° par rapport à l''horizontale. Calculer l''accélération (en m/s²) de l''objet le long du plan. On prend g = 10 m/s².", "correct_value": 5, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "Sur un plan incliné sans frottement, la composante du poids le long du plan est mg sin α. Par le PFD : ma = mg sin α, donc a = g sin α = 10 × sin 30° = 10 × 0,5 = 5 m/s².", "steps": ["Projection du poids sur l''axe du plan : F = mg sin α", "PFD le long du plan : ma = mg sin α", "a = g sin α = 10 × sin 30° = 10 × 0,5 = 5 m/s²"]}',
  '{"lois_newton","plan_incline","bac_style"}'
),
-- 159: frottement — numeric
(
  '44444444-0000-0000-0000-000000000159',
  '33333333-0000-0000-0000-000000000025',
  'numeric', 3, 'fr',
  '{"stem": "Un bloc de masse m = 10 kg est tiré sur un plan horizontal avec une force F = 50 N parallèle au sol. Le coefficient de frottement cinétique est μ = 0,3. Calculer l''accélération du bloc (en m/s²). On prend g = 10 m/s².", "correct_value": 2, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "La force de frottement est f = μ × N = μ × mg = 0,3 × 10 × 10 = 30 N. Par le PFD : ma = F − f = 50 − 30 = 20 N. Donc a = 20/10 = 2 m/s².", "steps": ["Réaction normale sur plan horizontal : N = mg = 10 × 10 = 100 N", "Force de frottement : f = μN = 0,3 × 100 = 30 N", "PFD : ma = F − f = 50 − 30 = 20 N", "a = 20 / 10 = 2 m/s²"]}',
  '{"lois_newton","frottement","bac_style"}'
),
-- 160: tension d'un fil — mcq
(
  '44444444-0000-0000-0000-000000000160',
  '33333333-0000-0000-0000-000000000025',
  'mcq', 3, 'fr',
  '{"stem": "Un objet de masse m = 3 kg est suspendu au plafond par un fil inextensible et de masse négligeable. L''objet est en équilibre. Quelle est la tension T du fil ? On prend g = 10 m/s².", "choices": ["30 N", "3 N", "15 N", "60 N"], "correct_index": 0, "latex": true}',
  '{"text_fr": "À l''équilibre, la somme des forces est nulle. Le poids P = mg = 3 × 10 = 30 N est dirigé vers le bas. La tension T du fil est dirigée vers le haut et compense le poids : T = P = 30 N.", "steps": ["Bilan des forces : poids P (vers le bas) et tension T (vers le haut)", "Condition d''équilibre : T = P", "T = mg = 3 × 10 = 30 N"]}',
  '{"lois_newton","tension_fil","bac_style"}'
),
-- 161: système en équilibre — mcq
(
  '44444444-0000-0000-0000-000000000161',
  '33333333-0000-0000-0000-000000000025',
  'mcq', 4, 'fr',
  '{"stem": "Un bloc de masse m = 2 kg est posé sur un plan incliné d''angle α = 30° et reste en équilibre grâce au frottement statique. Quelle est la valeur minimale du coefficient de frottement statique μₛ ? On prend g = 10 m/s².", "choices": ["0,58", "0,50", "0,87", "0,33"], "correct_index": 0, "latex": true}',
  '{"text_fr": "À la limite de l''équilibre, la force de frottement statique maximale compense la composante du poids le long du plan : μₛ × mg cos α = mg sin α. Donc μₛ = tan α = tan 30° ≈ 0,577 ≈ 0,58.", "steps": ["Composante du poids le long du plan : mg sin α", "Force de frottement max : f = μₛ × N = μₛ × mg cos α", "À l''équilibre limite : μₛ mg cos α = mg sin α", "μₛ = sin α / cos α = tan 30° ≈ 0,577 ≈ 0,58"]}',
  '{"lois_newton","equilibre","frottement","bac_style"}'
);

-- =====================
-- SKILL: energy (Énergie mécanique) — 7 items
-- Covers: énergie cinétique, énergie potentielle de pesanteur,
--         TEC, conservation Em, travail force, puissance,
--         énergie mécanique avec frottements
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 162: énergie cinétique — numeric
(
  '44444444-0000-0000-0000-000000000162',
  '33333333-0000-0000-0000-000000000026',
  'numeric', 2, 'fr',
  '{"stem": "Un objet de masse m = 4 kg se déplace à la vitesse v = 10 m/s. Calculer son énergie cinétique (en J).", "correct_value": 200, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''énergie cinétique est Ec = ½mv² = ½ × 4 × 10² = ½ × 4 × 100 = 200 J.", "steps": ["Formule : Ec = ½mv²", "Ec = ½ × 4 × (10)²", "Ec = ½ × 4 × 100 = 200 J"]}',
  '{"energie","energie_cinetique","bac_style"}'
),
-- 163: énergie potentielle de pesanteur — numeric
(
  '44444444-0000-0000-0000-000000000163',
  '33333333-0000-0000-0000-000000000026',
  'numeric', 2, 'fr',
  '{"stem": "Un objet de masse m = 2 kg est situé à une hauteur h = 15 m au-dessus du sol (référence d''énergie potentielle). Calculer son énergie potentielle de pesanteur (en J). On prend g = 10 m/s².", "correct_value": 300, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''énergie potentielle de pesanteur est Ep = mgh = 2 × 10 × 15 = 300 J.", "steps": ["Formule : Ep = mgh", "Ep = 2 × 10 × 15", "Ep = 300 J"]}',
  '{"energie","energie_potentielle","bac_style"}'
),
-- 164: théorème de l'énergie cinétique — numeric
(
  '44444444-0000-0000-0000-000000000164',
  '33333333-0000-0000-0000-000000000026',
  'numeric', 3, 'fr',
  '{"stem": "Un objet de masse m = 5 kg, initialement au repos, est soumis à une force constante F = 40 N sur une distance d = 10 m (sans frottement). Calculer la vitesse finale (en m/s) de l''objet en utilisant le théorème de l''énergie cinétique.", "correct_value": 12.65, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "D''après le TEC : ΔEc = W(F). Soit ½mv² − 0 = F × d. Donc ½ × 5 × v² = 40 × 10 = 400. On obtient v² = 400 × 2 / 5 = 160, donc v = √160 ≈ 12,65 m/s.", "steps": ["TEC : ΔEc = ΣW = F × d", "½mv² − 0 = 40 × 10 = 400 J", "v² = 2 × 400 / 5 = 160", "v = √160 ≈ 12,65 m/s"]}',
  '{"energie","tec","bac_style"}'
),
-- 165: conservation de l'énergie mécanique — mcq
(
  '44444444-0000-0000-0000-000000000165',
  '33333333-0000-0000-0000-000000000026',
  'mcq', 3, 'fr',
  '{"stem": "Un objet de masse m = 1 kg est lâché sans vitesse initiale d''une hauteur h = 20 m (chute libre, pas de frottement). Quelle est sa vitesse au moment de toucher le sol ? On prend g = 10 m/s².", "choices": ["20 m/s", "10 m/s", "14,1 m/s", "40 m/s"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Par conservation de l''énergie mécanique (sans frottement) : Ep initiale = Ec finale. mgh = ½mv², donc v = √(2gh) = √(2 × 10 × 20) = √400 = 20 m/s.", "steps": ["Conservation : Em initiale = Em finale", "mgh + 0 = 0 + ½mv²", "v² = 2gh = 2 × 10 × 20 = 400", "v = √400 = 20 m/s"]}',
  '{"energie","conservation","bac_style"}'
),
-- 166: travail d'une force — numeric
(
  '44444444-0000-0000-0000-000000000166',
  '33333333-0000-0000-0000-000000000026',
  'numeric', 3, 'fr',
  '{"stem": "Une force F = 50 N est appliquée à un objet avec un angle de 60° par rapport à la direction du déplacement. L''objet se déplace sur une distance d = 8 m. Calculer le travail de cette force (en J).", "correct_value": 200, "tolerance": 1, "latex": true}',
  '{"text_fr": "Le travail d''une force est W = F × d × cos θ = 50 × 8 × cos 60° = 50 × 8 × 0,5 = 200 J.", "steps": ["Formule : W = F × d × cos θ", "W = 50 × 8 × cos 60°", "cos 60° = 0,5", "W = 50 × 8 × 0,5 = 200 J"]}',
  '{"energie","travail","bac_style"}'
),
-- 167: puissance — mcq
(
  '44444444-0000-0000-0000-000000000167',
  '33333333-0000-0000-0000-000000000026',
  'mcq', 2, 'fr',
  '{"stem": "Un moteur fournit un travail W = 6000 J en une durée Δt = 30 s. Quelle est la puissance développée par le moteur ?", "choices": ["200 W", "180000 W", "6000 W", "20 W"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La puissance est le rapport du travail sur la durée : P = W/Δt = 6000 / 30 = 200 W.", "steps": ["Formule : P = W / Δt", "P = 6000 / 30", "P = 200 W"]}',
  '{"energie","puissance","bac_style"}'
),
-- 168: énergie mécanique avec frottements — true_false
(
  '44444444-0000-0000-0000-000000000168',
  '33333333-0000-0000-0000-000000000026',
  'true_false', 3, 'fr',
  '{"stem": "En présence de forces de frottement, l''énergie mécanique d''un système isolé se conserve.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''énergie mécanique ne se conserve que si les forces extérieures et les forces non conservatives (comme les frottements) ne travaillent pas. En présence de frottements, l''énergie mécanique diminue car une partie est convertie en chaleur : ΔEm = W(frottements) < 0.", "steps": ["La conservation de Em suppose l''absence de forces non conservatives qui travaillent", "Les frottements sont des forces non conservatives", "Le travail des frottements est toujours négatif (résistant)", "Donc Em diminue : ΔEm = W(frottements) < 0"]}',
  '{"energie","frottement","conservation","bac_style"}'
);
