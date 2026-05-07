-- ============================================================
-- ACCOUNTING CONTENT: Analyse financière (2 skills, 14 items)
-- Topic: Analyse financière
-- Skills:
--   financial_ratios  (33333333-...-113) difficulty 3 — 7 items
--   working_capital   (33333333-...-114) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: financial_ratios (Ratios financiers) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000767',
  '33333333-0000-0000-0000-000000000113',
  'mcq', 3, 'fr',
  '{"stem": "Une entreprise dispose de capitaux propres de 600 000 DH et d''un total passif de 1 500 000 DH. Quel est son ratio d''autonomie financière ?", "choices": ["0,40", "0,60", "2,50", "0,25"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le ratio d''autonomie financière mesure la part des capitaux propres dans le financement total. Il se calcule par : Capitaux propres / Total passif = 600 000 / 1 500 000 = 0,40.", "steps": ["Formule : Ratio d''autonomie financière = Capitaux propres / Total passif", "Application : 600 000 / 1 500 000", "Résultat : 0,40 soit 40 %"]}',
  '{"comptabilité","analyse","ratios","autonomie_financière"}'
),
(
  '44444444-0000-0000-0000-000000000768',
  '33333333-0000-0000-0000-000000000113',
  'mcq', 3, 'fr',
  '{"stem": "Une entreprise a un chiffre d''affaires HT de 2 000 000 DH et un résultat net de 160 000 DH. Quel est son ratio de rentabilité commerciale ?", "choices": ["8 %", "12,5 %", "16 %", "80 %"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le ratio de rentabilité commerciale mesure la marge nette dégagée par l''activité. Il se calcule par : Résultat net / Chiffre d''affaires HT = 160 000 / 2 000 000 = 0,08 soit 8 %.", "steps": ["Formule : Rentabilité commerciale = Résultat net / CA HT", "Application : 160 000 / 2 000 000", "Résultat : 0,08 soit 8 %"]}',
  '{"comptabilité","analyse","ratios","rentabilité_commerciale"}'
),
(
  '44444444-0000-0000-0000-000000000769',
  '33333333-0000-0000-0000-000000000113',
  'numeric', 3, 'fr',
  '{"stem": "Une entreprise présente les éléments suivants : dettes de financement = 900 000 DH, capitaux propres = 1 200 000 DH. Calculer le ratio d''endettement (dettes de financement / capitaux propres). Donner le résultat arrondi à deux décimales.", "correct_value": 0.75, "tolerance": 0.01, "latex": false}',
  '{"text_fr": "Le ratio d''endettement mesure le poids des dettes à long terme par rapport aux fonds propres. Il se calcule par : Dettes de financement / Capitaux propres = 900 000 / 1 200 000 = 0,75.", "steps": ["Formule : Ratio d''endettement = Dettes de financement / Capitaux propres", "Application : 900 000 / 1 200 000", "Résultat : 0,75"]}',
  '{"comptabilité","analyse","ratios","endettement"}'
),
(
  '44444444-0000-0000-0000-000000000770',
  '33333333-0000-0000-0000-000000000113',
  'numeric', 3, 'fr',
  '{"stem": "Soit : actif circulant = 500 000 DH, stocks = 180 000 DH, passif circulant = 400 000 DH. Calculer le ratio de liquidité réduite. Donner le résultat arrondi à deux décimales.", "correct_value": 0.80, "tolerance": 0.01, "latex": false}',
  '{"text_fr": "Le ratio de liquidité réduite exclut les stocks de l''actif circulant pour mesurer la capacité à couvrir les dettes à court terme avec les créances et la trésorerie. Ratio = (Actif circulant - Stocks) / Passif circulant = (500 000 - 180 000) / 400 000 = 320 000 / 400 000 = 0,80.", "steps": ["Formule : Liquidité réduite = (Actif circulant - Stocks) / Passif circulant", "Numérateur : 500 000 - 180 000 = 320 000", "Application : 320 000 / 400 000", "Résultat : 0,80"]}',
  '{"comptabilité","analyse","ratios","liquidité_réduite"}'
),
(
  '44444444-0000-0000-0000-000000000771',
  '33333333-0000-0000-0000-000000000113',
  'numeric', 3, 'fr',
  '{"stem": "Une entreprise a un résultat net de 240 000 DH et des capitaux propres de 1 500 000 DH. Calculer le ratio de rentabilité financière en pourcentage.", "correct_value": 16, "tolerance": 0.1, "latex": false}',
  '{"text_fr": "Le ratio de rentabilité financière mesure le rendement des capitaux investis par les actionnaires. Il se calcule par : Résultat net / Capitaux propres × 100 = 240 000 / 1 500 000 × 100 = 16 %.", "steps": ["Formule : Rentabilité financière = (Résultat net / Capitaux propres) × 100", "Application : (240 000 / 1 500 000) × 100", "Résultat : 16 %"]}',
  '{"comptabilité","analyse","ratios","rentabilité_financière"}'
),
(
  '44444444-0000-0000-0000-000000000772',
  '33333333-0000-0000-0000-000000000113',
  'true_false', 3, 'fr',
  '{"stem": "Le ratio de liquidité générale se calcule par : Actif circulant / Passif circulant. Un ratio supérieur à 1 signifie que l''entreprise peut couvrir ses dettes à court terme par ses actifs circulants.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le ratio de liquidité générale = Actif circulant / Passif circulant. Lorsqu''il est supérieur à 1, cela signifie que l''actif circulant est suffisant pour couvrir le passif circulant, ce qui traduit une bonne solvabilité à court terme.", "steps": ["Formule : Liquidité générale = Actif circulant / Passif circulant", "Si le ratio > 1, l''actif circulant couvre le passif circulant", "L''entreprise dispose d''une marge de sécurité à court terme"]}',
  '{"comptabilité","analyse","ratios","liquidité_générale"}'
),
(
  '44444444-0000-0000-0000-000000000773',
  '33333333-0000-0000-0000-000000000113',
  'true_false', 3, 'fr',
  '{"stem": "Le ratio de rentabilité économique se calcule par : Résultat net / Capitaux propres.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La formule Résultat net / Capitaux propres correspond au ratio de rentabilité financière. Le ratio de rentabilité économique se calcule par : Résultat d''exploitation / Actif total (ou capitaux investis). Il mesure la performance opérationnelle indépendamment du mode de financement.", "steps": ["Résultat net / Capitaux propres = rentabilité financière (pas économique)", "Rentabilité économique = Résultat d''exploitation / Actif total", "La rentabilité économique évalue la performance indépendamment du financement"]}',
  '{"comptabilité","analyse","ratios","rentabilité_économique"}'
);

-- =====================
-- SKILL: working_capital (Fonds de roulement et BFR) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000774',
  '33333333-0000-0000-0000-000000000114',
  'mcq', 3, 'fr',
  '{"stem": "Une entreprise présente : financement permanent = 2 800 000 DH, actif immobilisé = 2 300 000 DH, actif circulant HT = 900 000 DH, passif circulant HT = 600 000 DH. Quelle est la trésorerie nette ?", "choices": ["200 000 DH", "500 000 DH", "300 000 DH", "100 000 DH"], "correct_index": 0, "latex": false}',
  '{"text_fr": "On calcule d''abord le FRF et le BFR, puis la trésorerie nette. FRF = Financement permanent - Actif immobilisé = 2 800 000 - 2 300 000 = 500 000. BFR = Actif circulant HT - Passif circulant HT = 900 000 - 600 000 = 300 000. TN = FRF - BFR = 500 000 - 300 000 = 200 000 DH.", "steps": ["FRF = Financement permanent - Actif immobilisé = 2 800 000 - 2 300 000 = 500 000 DH", "BFR = Actif circulant HT - Passif circulant HT = 900 000 - 600 000 = 300 000 DH", "TN = FRF - BFR = 500 000 - 300 000 = 200 000 DH"]}',
  '{"comptabilité","analyse","fonds_de_roulement","trésorerie_nette"}'
),
(
  '44444444-0000-0000-0000-000000000775',
  '33333333-0000-0000-0000-000000000114',
  'mcq', 3, 'fr',
  '{"stem": "L''État des Soldes de Gestion (ESG) d''une entreprise indique : ventes de marchandises = 1 200 000 DH, achats revendus de marchandises = 850 000 DH. Quelle est la marge brute sur ventes en l''état ?", "choices": ["350 000 DH", "850 000 DH", "2 050 000 DH", "1 200 000 DH"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La marge brute sur ventes en l''état est le premier solde de gestion de l''ESG. Elle se calcule par : Ventes de marchandises - Achats revendus de marchandises = 1 200 000 - 850 000 = 350 000 DH.", "steps": ["Formule : Marge brute = Ventes de marchandises - Achats revendus de marchandises", "Application : 1 200 000 - 850 000", "Résultat : 350 000 DH"]}',
  '{"comptabilité","analyse","ESG","marge_brute"}'
),
(
  '44444444-0000-0000-0000-000000000776',
  '33333333-0000-0000-0000-000000000114',
  'numeric', 3, 'fr',
  '{"stem": "Soit : financement permanent = 3 500 000 DH, actif immobilisé = 2 700 000 DH. Calculer le fonds de roulement fonctionnel (FRF) en DH.", "correct_value": 800000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le fonds de roulement fonctionnel (FRF) représente l''excédent des ressources stables sur les emplois stables. FRF = Financement permanent - Actif immobilisé = 3 500 000 - 2 700 000 = 800 000 DH.", "steps": ["Formule : FRF = Financement permanent - Actif immobilisé", "Application : 3 500 000 - 2 700 000", "Résultat : FRF = 800 000 DH"]}',
  '{"comptabilité","analyse","fonds_de_roulement","FRF"}'
),
(
  '44444444-0000-0000-0000-000000000777',
  '33333333-0000-0000-0000-000000000114',
  'numeric', 3, 'fr',
  '{"stem": "Une entreprise présente les données suivantes : stocks = 350 000 DH, créances de l''actif circulant = 420 000 DH, dettes du passif circulant = 530 000 DH. Calculer le besoin en fonds de roulement (BFR) en DH.", "correct_value": 240000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le BFR représente le besoin de financement généré par le cycle d''exploitation. BFR = Actif circulant HT - Passif circulant HT. Actif circulant HT = Stocks + Créances = 350 000 + 420 000 = 770 000. BFR = 770 000 - 530 000 = 240 000 DH.", "steps": ["Actif circulant HT = Stocks + Créances = 350 000 + 420 000 = 770 000 DH", "Passif circulant HT = 530 000 DH", "BFR = 770 000 - 530 000 = 240 000 DH"]}',
  '{"comptabilité","analyse","BFR","besoin_fonds_roulement"}'
),
(
  '44444444-0000-0000-0000-000000000778',
  '33333333-0000-0000-0000-000000000114',
  'numeric', 3, 'fr',
  '{"stem": "Pour calculer la CAF à partir du résultat net, on dispose des éléments suivants : résultat net = 180 000 DH, dotations d''exploitation = 250 000 DH, reprises d''exploitation = 40 000 DH, VNA des immobilisations cédées = 90 000 DH, produits de cession des immobilisations = 120 000 DH. Calculer la CAF en DH.", "correct_value": 360000, "tolerance": 0, "latex": false}',
  '{"text_fr": "La CAF (Capacité d''Autofinancement) mesure le flux de trésorerie potentiel généré par l''activité. Méthode additive : CAF = Résultat net + Dotations - Reprises + VNA des immobilisations cédées - Produits de cession = 180 000 + 250 000 - 40 000 + 90 000 - 120 000 = 360 000 DH.", "steps": ["Formule additive : CAF = Résultat net + Dotations - Reprises + VNA cédées - Produits de cession", "CAF = 180 000 + 250 000 - 40 000 + 90 000 - 120 000", "CAF = 360 000 DH"]}',
  '{"comptabilité","analyse","CAF","autofinancement"}'
),
(
  '44444444-0000-0000-0000-000000000779',
  '33333333-0000-0000-0000-000000000114',
  'true_false', 3, 'fr',
  '{"stem": "Un fonds de roulement fonctionnel négatif signifie que l''entreprise finance une partie de ses immobilisations par des ressources à court terme, ce qui traduit un déséquilibre financier.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Un FRF négatif signifie que le financement permanent est insuffisant pour couvrir l''actif immobilisé (FRF = Financement permanent - Actif immobilisé < 0). L''entreprise est donc obligée de recourir à des dettes à court terme pour financer ses emplois stables, ce qui constitue un déséquilibre de la structure financière.", "steps": ["FRF = Financement permanent - Actif immobilisé", "FRF < 0 signifie : Financement permanent < Actif immobilisé", "Les ressources stables ne couvrent pas les emplois stables", "L''entreprise finance des immobilisations par des dettes à court terme : déséquilibre"]}',
  '{"comptabilité","analyse","fonds_de_roulement","déséquilibre"}'
),
(
  '44444444-0000-0000-0000-000000000780',
  '33333333-0000-0000-0000-000000000114',
  'true_false', 3, 'fr',
  '{"stem": "La trésorerie nette peut se calculer de deux manières : TN = FRF - BFR ou TN = Trésorerie Actif - Trésorerie Passif. Ces deux méthodes donnent toujours le même résultat.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La trésorerie nette peut être calculée soit par le haut du bilan (approche fonctionnelle : TN = FRF - BFR), soit par le bas du bilan (approche directe : TN = Trésorerie Actif - Trésorerie Passif). Les deux méthodes aboutissent au même résultat car elles découlent de l''équilibre fondamental du bilan fonctionnel.", "steps": ["Méthode 1 : TN = FRF - BFR (approche par le haut du bilan)", "Méthode 2 : TN = Trésorerie Actif - Trésorerie Passif (approche directe)", "L''égalité du bilan fonctionnel garantit que les deux résultats sont identiques", "Ces deux approches sont complémentaires pour l''analyse financière"]}',
  '{"comptabilité","analyse","trésorerie_nette","bilan_fonctionnel"}'
);
