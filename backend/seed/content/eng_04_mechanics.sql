-- ============================================================
-- SCIENCES DE L'INGÉNIEUR CONTENT: Mécanique appliquée (2 skills, 14 items)
-- Skills:
--   statics              (33333333-...-051) difficulty 3 — 7 items
--   kinematics_solids     (33333333-...-052) difficulty 3 — 7 items
-- Items: 44444444-0000-0000-0000-000000000333 → ...346
-- ============================================================

-- =====================
-- SKILL: statics (Statique - PFS et torseurs) — 7 items
-- Covers: PFS (ΣF=0 et ΣM/A=0), torseur d'action mécanique,
--         isolement d'un système, bilan des actions mécaniques,
--         réactions d'appui (poutre sur 2 appuis), moment d'une force,
--         degré d'hyperstatisme
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 333: PFS — conditions d'équilibre — mcq
(
  '44444444-0000-0000-0000-000000000333',
  '33333333-0000-0000-0000-000000000051',
  'mcq', 3, 'fr',
  '{"stem": "Lors de l''application du Principe Fondamental de la Statique (PFS) à un solide en équilibre, quelles sont les deux conditions à vérifier ?", "choices": ["ΣF⃗ = 0⃗ et ΣM⃗/A = 0⃗", "ΣF⃗ = m⃗a et ΣM⃗/A = 0⃗", "ΣF⃗ = 0⃗ et ΣEc = 0", "ΣM⃗/A = 0⃗ et Σv⃗ = 0⃗"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le PFS stipule que pour un solide en équilibre statique, la somme vectorielle de toutes les forces extérieures est nulle (ΣF⃗ = 0⃗) ET la somme des moments de ces forces par rapport à un point quelconque A est nulle (ΣM⃗/A = 0⃗).", "steps": ["Première condition : résultante des forces nulle → ΣF⃗ = 0⃗", "Deuxième condition : résultante des moments nulle → ΣM⃗/A = 0⃗", "Ces deux conditions sont nécessaires et suffisantes pour l''équilibre d''un solide"]}',
  '{"statique","pfs","bac_style"}'
),
-- 334: Réactions d'appui — poutre isostatique — numeric
(
  '44444444-0000-0000-0000-000000000334',
  '33333333-0000-0000-0000-000000000051',
  'numeric', 3, 'fr',
  '{"stem": "Une poutre AB de longueur L = 4 m est posée sur deux appuis simples en A et B. Elle supporte une charge ponctuelle F = 600 N appliquée à 1 m de l''appui A. Calculer la réaction verticale (en N) de l''appui B.", "correct_value": 150, "tolerance": 1, "latex": true}',
  '{"text_fr": "On isole la poutre et on applique le PFS. En prenant les moments par rapport au point A : ΣM/A = 0 → R_B × 4 − 600 × 1 = 0 → R_B = 600 / 4 = 150 N.", "steps": ["Isolement de la poutre AB", "Bilan des forces : poids F = 600 N à 1 m de A, réactions R_A en A et R_B en B", "ΣM/A = 0 : R_B × L − F × d = 0", "R_B × 4 − 600 × 1 = 0", "R_B = 600 / 4 = 150 N"]}',
  '{"statique","reactions_appui","poutre","bac_style"}'
),
-- 335: Réaction d'appui A — vérification — numeric
(
  '44444444-0000-0000-0000-000000000335',
  '33333333-0000-0000-0000-000000000051',
  'numeric', 3, 'fr',
  '{"stem": "Une poutre AB de longueur L = 6 m est en appui simple en A et B. Elle supporte une charge ponctuelle F = 900 N appliquée au point C situé à 2 m de B. Calculer la réaction verticale R_A (en N) de l''appui A.", "correct_value": 300, "tolerance": 1, "latex": true}',
  '{"text_fr": "La charge est appliquée à 2 m de B, donc à 4 m de A. On applique le PFS en prenant les moments par rapport à B : ΣM/B = 0 → R_A × 6 − 900 × 2 = 0 → R_A = 1800 / 6 = 300 N.", "steps": ["Position de la charge : à 2 m de B, donc à L − 2 = 4 m de A", "ΣM/B = 0 : R_A × 6 − F × 2 = 0", "R_A × 6 = 900 × 2 = 1800", "R_A = 1800 / 6 = 300 N", "Vérification : R_B = 900 − 300 = 600 N, ΣF_y = 300 + 600 − 900 = 0 ✓"]}',
  '{"statique","reactions_appui","poutre","bac_style"}'
),
-- 336: Moment d'une force par rapport à un point — numeric
(
  '44444444-0000-0000-0000-000000000336',
  '33333333-0000-0000-0000-000000000051',
  'numeric', 3, 'fr',
  '{"stem": "Une force F = 80 N est appliquée à l''extrémité d''un bras de levier de longueur d = 0,5 m. La force est perpendiculaire au bras de levier. Calculer le moment de cette force (en N·m) par rapport au point de pivot.", "correct_value": 40, "tolerance": 0.5, "latex": true}',
  '{"text_fr": "Le moment d''une force par rapport à un point est M = F × d (lorsque la force est perpendiculaire au bras de levier). M = 80 × 0,5 = 40 N·m.", "steps": ["Formule du moment : M/O = F × d × sin θ", "La force est perpendiculaire au bras → sin 90° = 1", "M = F × d = 80 × 0,5", "M = 40 N·m"]}',
  '{"statique","moment_force","bac_style"}'
),
-- 337: Torseur d'action mécanique — mcq
(
  '44444444-0000-0000-0000-000000000337',
  '33333333-0000-0000-0000-000000000051',
  'mcq', 4, 'fr',
  '{"stem": "Le torseur d''action mécanique d''un appui simple (liaison ponctuelle) dans le plan contient :", "choices": ["Uniquement une composante de force normale au plan d''appui", "Deux composantes de force et un moment", "Trois composantes de force et trois moments", "Une composante de force et un moment de pivotement"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Un appui simple (ponctuel) dans le plan ne transmet qu''une seule composante de force normale à la surface d''appui. Il n''y a ni force tangentielle (pas de frottement dans le modèle idéal), ni moment. Le torseur se réduit donc à une seule inconnue.", "steps": ["Un appui simple ne transmet qu''un effort normal à la surface de contact", "Pas de composante tangentielle (modèle sans frottement)", "Pas de moment transmis (liaison ponctuelle)", "Le torseur a donc 1 seule inconnue"]}',
  '{"statique","torseur","liaison","bac_style"}'
),
-- 338: Isolement et bilan des actions mécaniques — true_false
(
  '44444444-0000-0000-0000-000000000338',
  '33333333-0000-0000-0000-000000000051',
  'true_false', 3, 'fr',
  '{"stem": "Lors de l''isolement d''un solide pour appliquer le PFS, on doit prendre en compte les forces internes au solide dans le bilan des actions mécaniques.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Lors de l''isolement d''un solide, on ne considère que les actions mécaniques extérieures (forces de contact avec les autres solides, poids, etc.). Les forces internes au solide isolé se compensent mutuellement et n''interviennent pas dans le PFS.", "steps": ["Le PFS s''applique aux actions mécaniques extérieures uniquement", "Les forces internes sont des paires action-réaction internes au système isolé", "Elles se compensent et leur résultante est nulle", "Le bilan ne contient donc que les forces extérieures"]}',
  '{"statique","isolement","bilan_actions","bac_style"}'
),
-- 339: Degré d'hyperstatisme — numeric
(
  '44444444-0000-0000-0000-000000000339',
  '33333333-0000-0000-0000-000000000051',
  'numeric', 4, 'fr',
  '{"stem": "Un mécanisme plan comporte 3 équations d''équilibre (statique plane) et 5 inconnues de liaison. Quel est le degré d''hyperstatisme h de ce mécanisme ?", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "Le degré d''hyperstatisme est la différence entre le nombre d''inconnues de liaison (N_s) et le nombre d''équations d''équilibre disponibles (N_e). En statique plane : h = N_s − N_e = 5 − 3 = 2. Le mécanisme est hyperstatique de degré 2.", "steps": ["Formule : h = N_s − N_e", "Nombre d''inconnues de liaison : N_s = 5", "Nombre d''équations d''équilibre (statique plane) : N_e = 3", "h = 5 − 3 = 2", "Le système est hyperstatique d''ordre 2"]}',
  '{"statique","hyperstatisme","bac_style"}'
);

-- =====================
-- SKILL: kinematics_solids (Cinématique des solides) — 7 items
-- Covers: vitesse linéaire v=ωR, vitesse angulaire ω=2πN/60,
--         centre instantané de rotation (CIR), composition des vitesses,
--         relation ω-v au point de contact, translation vs rotation,
--         rapport de transmission
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 340: Vitesse angulaire — numeric
(
  '44444444-0000-0000-0000-000000000340',
  '33333333-0000-0000-0000-000000000052',
  'numeric', 3, 'fr',
  '{"stem": "Un arbre tourne à la fréquence de rotation N = 1500 tr/min. Calculer sa vitesse angulaire ω (en rad/s). On prendra π ≈ 3,14.", "correct_value": 157, "tolerance": 1, "latex": true}',
  '{"text_fr": "La vitesse angulaire est ω = 2πN/60 = 2 × 3,14 × 1500 / 60 = 9420 / 60 = 157 rad/s.", "steps": ["Formule : ω = 2πN / 60", "ω = 2 × 3,14 × 1500 / 60", "ω = 9420 / 60", "ω = 157 rad/s"]}',
  '{"cinematique_solides","vitesse_angulaire","bac_style"}'
),
-- 341: Vitesse linéaire v = ωR — numeric
(
  '44444444-0000-0000-0000-000000000341',
  '33333333-0000-0000-0000-000000000052',
  'numeric', 3, 'fr',
  '{"stem": "Une roue de rayon R = 0,3 m tourne à la vitesse angulaire ω = 40 rad/s. Calculer la vitesse linéaire (en m/s) d''un point situé sur la périphérie de la roue.", "correct_value": 12, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "La vitesse linéaire d''un point sur la périphérie est v = ω × R = 40 × 0,3 = 12 m/s.", "steps": ["Formule : v = ω × R", "v = 40 × 0,3", "v = 12 m/s"]}',
  '{"cinematique_solides","vitesse_lineaire","bac_style"}'
),
-- 342: Rapport de transmission — numeric
(
  '44444444-0000-0000-0000-000000000342',
  '33333333-0000-0000-0000-000000000052',
  'numeric', 3, 'fr',
  '{"stem": "Dans un engrenage, la roue menante a Z₁ = 20 dents et tourne à N₁ = 1200 tr/min. La roue menée a Z₂ = 60 dents. Calculer la fréquence de rotation N₂ (en tr/min) de la roue menée.", "correct_value": 400, "tolerance": 1, "latex": true}',
  '{"text_fr": "Le rapport de transmission d''un engrenage est r = Z₁/Z₂ = N₂/N₁. Donc N₂ = N₁ × Z₁/Z₂ = 1200 × 20/60 = 1200 × 1/3 = 400 tr/min.", "steps": ["Rapport de transmission : r = Z₁ / Z₂ = N₂ / N₁", "N₂ = N₁ × Z₁ / Z₂", "N₂ = 1200 × 20 / 60", "N₂ = 1200 / 3 = 400 tr/min"]}',
  '{"cinematique_solides","rapport_transmission","engrenage","bac_style"}'
),
-- 343: CIR et composition des vitesses — mcq
(
  '44444444-0000-0000-0000-000000000343',
  '33333333-0000-0000-0000-000000000052',
  'mcq', 4, 'fr',
  '{"stem": "En cinématique des solides, le Centre Instantané de Rotation (CIR) d''un solide en mouvement plan est le point :", "choices": ["Dont la vitesse est nulle à l''instant considéré", "Qui a la vitesse maximale à l''instant considéré", "Autour duquel le moment des forces est nul", "Qui reste fixe pendant tout le mouvement"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le CIR est, à chaque instant, le point du solide (ou de son prolongement) dont la vitesse est nulle. Tout mouvement plan d''un solide peut être considéré comme une rotation instantanée autour du CIR. La position du CIR peut changer au cours du temps.", "steps": ["Le CIR est le point de vitesse nulle à un instant donné", "Le mouvement plan d''un solide = rotation instantanée autour du CIR", "Le CIR peut se déplacer au cours du temps", "Il ne s''agit pas d''un point fixe permanent"]}',
  '{"cinematique_solides","cir","bac_style"}'
),
-- 344: Relation vitesse au point de contact — numeric
(
  '44444444-0000-0000-0000-000000000344',
  '33333333-0000-0000-0000-000000000052',
  'numeric', 3, 'fr',
  '{"stem": "Deux roues en contact sans glissement ont des rayons R₁ = 0,1 m et R₂ = 0,25 m. La roue 1 tourne à ω₁ = 50 rad/s. Calculer la vitesse angulaire ω₂ (en rad/s) de la roue 2.", "correct_value": 20, "tolerance": 0.5, "latex": true}',
  '{"text_fr": "Au point de contact sans glissement, les vitesses linéaires sont égales : v₁ = v₂, soit ω₁ × R₁ = ω₂ × R₂. Donc ω₂ = ω₁ × R₁ / R₂ = 50 × 0,1 / 0,25 = 5 / 0,25 = 20 rad/s.", "steps": ["Condition de roulement sans glissement : v₁ = v₂ au point de contact", "ω₁ × R₁ = ω₂ × R₂", "ω₂ = ω₁ × R₁ / R₂", "ω₂ = 50 × 0,1 / 0,25 = 20 rad/s"]}',
  '{"cinematique_solides","roulement_sans_glissement","bac_style"}'
),
-- 345: Translation vs rotation — true_false
(
  '44444444-0000-0000-0000-000000000345',
  '33333333-0000-0000-0000-000000000052',
  'true_false', 3, 'fr',
  '{"stem": "Dans un mouvement de translation d''un solide, tous les points du solide ont le même vecteur vitesse à chaque instant.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Par définition, un mouvement de translation est un mouvement dans lequel tout segment du solide reste parallèle à lui-même au cours du temps. En conséquence, tous les points du solide ont le même vecteur vitesse (même direction, même sens, même norme) à chaque instant.", "steps": ["En translation, tout segment AB du solide reste parallèle à sa position initiale", "Cela implique que V⃗(A) = V⃗(B) pour tous points A et B du solide", "Tous les points ont donc le même vecteur vitesse à chaque instant", "C''est la propriété caractéristique du mouvement de translation"]}',
  '{"cinematique_solides","translation","rotation","bac_style"}'
),
-- 346: Composition des vitesses — mcq
(
  '44444444-0000-0000-0000-000000000346',
  '33333333-0000-0000-0000-000000000052',
  'mcq', 4, 'fr',
  '{"stem": "Un passager marche à la vitesse v₁ = 2 m/s vers l''avant d''un train qui se déplace à v₂ = 30 m/s par rapport au sol. D''après la loi de composition des vitesses, quelle est la vitesse du passager par rapport au sol ?", "choices": ["32 m/s", "28 m/s", "30 m/s", "15 m/s"], "correct_index": 0, "latex": true}',
  '{"text_fr": "D''après la loi de composition des vitesses : V⃗(passager/sol) = V⃗(passager/train) + V⃗(train/sol). Les deux vitesses sont dans le même sens (vers l''avant), donc v = v₁ + v₂ = 2 + 30 = 32 m/s.", "steps": ["Loi de composition : V⃗(P/sol) = V⃗(P/train) + V⃗(train/sol)", "Les deux vecteurs sont colinéaires et de même sens", "v(P/sol) = v₁ + v₂ = 2 + 30", "v(P/sol) = 32 m/s"]}',
  '{"cinematique_solides","composition_vitesses","bac_style"}'
);
