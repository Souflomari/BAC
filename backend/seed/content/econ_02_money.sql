-- ============================================================
-- ECONOMICS CONTENT: Monnaie et financement (2 skills, 14 items)
-- Skills:
--   money_credit      (33333333-...-097) difficulty 2 — 7 items
--   financial_system   (33333333-...-098) difficulty 2 — 7 items
-- Items: 44444444-0000-0000-0000-000000000655 → ...668
-- ============================================================

-- =====================
-- SKILL: money_credit (Monnaie et crédit) — 7 items
-- Covers: fonctions de la monnaie, formes de la monnaie, masse monétaire
--         (M1, M2, M3), création monétaire, multiplicateur de crédit
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 655: fonctions de la monnaie — mcq
(
  '44444444-0000-0000-0000-000000000655',
  '33333333-0000-0000-0000-000000000097',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les propositions suivantes, laquelle ne constitue PAS une fonction de la monnaie ?", "choices": ["Unité de compte", "Moyen d''échange", "Réserve de valeur", "Instrument de production"], "correct_index": 3, "latex": false}',
  '{"text_fr": "La monnaie remplit trois fonctions classiques : unité de compte (elle permet de mesurer la valeur des biens), moyen d''échange (elle facilite les transactions) et réserve de valeur (elle permet de conserver du pouvoir d''achat dans le temps). « Instrument de production » n''est pas une fonction de la monnaie.", "steps": ["Fonction 1 : Unité de compte — mesure la valeur des biens et services", "Fonction 2 : Moyen d''échange — facilite les transactions", "Fonction 3 : Réserve de valeur — conserve le pouvoir d''achat", "« Instrument de production » concerne les facteurs de production, pas la monnaie"]}',
  '{"économie","monnaie","fonctions_monnaie","bac_style"}'
),
-- 656: formes de la monnaie — mcq
(
  '44444444-0000-0000-0000-000000000656',
  '33333333-0000-0000-0000-000000000097',
  'mcq', 2, 'fr',
  '{"stem": "La monnaie scripturale désigne :", "choices": ["Les pièces et billets en circulation", "Les écritures comptables dans les comptes bancaires", "Les lingots d''or détenus par la banque centrale", "Les chèques et cartes bancaires uniquement"], "correct_index": 1, "latex": false}',
  '{"text_fr": "La monnaie scripturale correspond aux dépôts à vue inscrits dans les comptes bancaires. Elle circule par jeux d''écriture (virements, prélèvements). Les pièces et billets constituent la monnaie fiduciaire. Les chèques et cartes bancaires sont des instruments de circulation de la monnaie scripturale, pas la monnaie elle-même.", "steps": ["La monnaie fiduciaire = pièces + billets", "La monnaie scripturale = dépôts à vue (écritures dans les comptes bancaires)", "Les chèques et cartes bancaires sont des moyens de paiement, pas de la monnaie en soi", "La bonne réponse est : écritures comptables dans les comptes bancaires"]}',
  '{"économie","monnaie","monnaie_scripturale","bac_style"}'
),
-- 657: masse monétaire M1 — mcq
(
  '44444444-0000-0000-0000-000000000657',
  '33333333-0000-0000-0000-000000000097',
  'mcq', 3, 'fr',
  '{"stem": "L''agrégat monétaire M1 comprend :", "choices": ["La monnaie fiduciaire + les dépôts à vue", "M1 = M2 + les placements à terme", "Les billets en circulation uniquement", "La monnaie fiduciaire + les dépôts à terme + les OPCVM monétaires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "M1 est l''agrégat le plus liquide. Il se compose de la monnaie fiduciaire (billets et pièces en circulation) et des dépôts à vue (comptes courants). M2 = M1 + dépôts à terme ≤ 2 ans et dépôts avec préavis ≤ 3 mois. M3 = M2 + instruments négociables sur le marché monétaire (OPCVM monétaires, titres de créance ≤ 2 ans).", "steps": ["M1 = monnaie fiduciaire + dépôts à vue", "M2 = M1 + dépôts à terme (≤ 2 ans) + dépôts avec préavis (≤ 3 mois)", "M3 = M2 + instruments négociables du marché monétaire", "M1 est l''agrégat le plus liquide"]}',
  '{"économie","monnaie","masse_monétaire","M1","bac_style"}'
),
-- 658: création monétaire — numeric
(
  '44444444-0000-0000-0000-000000000658',
  '33333333-0000-0000-0000-000000000097',
  'numeric', 3, 'fr',
  '{"stem": "Une banque commerciale accorde un crédit de 50 000 DH à une entreprise. De combien (en DH) augmente la masse monétaire à l''instant de l''octroi du crédit ?", "correct_value": 50000, "tolerance": 0, "latex": false}',
  '{"text_fr": "La création monétaire se fait par le crédit : « les crédits font les dépôts ». Lorsqu''une banque accorde un crédit de 50 000 DH, elle inscrit cette somme au compte du client, créant ainsi 50 000 DH de monnaie scripturale nouvelle. La masse monétaire augmente donc de 50 000 DH.", "steps": ["Principe : les crédits font les dépôts", "La banque inscrit 50 000 DH au compte de l''emprunteur", "Cette écriture crée 50 000 DH de monnaie scripturale nouvelle", "La masse monétaire augmente de 50 000 DH"]}',
  '{"économie","monnaie","création_monétaire","crédit","bac_style"}'
),
-- 659: multiplicateur de crédit — numeric
(
  '44444444-0000-0000-0000-000000000659',
  '33333333-0000-0000-0000-000000000097',
  'numeric', 3, 'fr',
  '{"stem": "Le taux de réserve obligatoire est de 10 %. Un dépôt initial de 100 000 DH est effectué dans le système bancaire. Selon le mécanisme du multiplicateur de crédit, quel est le montant maximal de monnaie (en DH) que le système bancaire peut créer au total ?", "correct_value": 1000000, "tolerance": 0, "latex": true}',
  '{"text_fr": "Le multiplicateur de crédit est k = 1/r, où r est le taux de réserve obligatoire. Avec r = 10 % = 0,1, on obtient k = 1/0,1 = 10. Le montant maximal de monnaie créée est : M = k × dépôt initial = 10 × 100 000 = 1 000 000 DH.", "steps": ["Formule du multiplicateur : k = 1/r", "r = 10 % = 0,1", "k = 1 / 0,1 = 10", "Monnaie totale = k × dépôt initial = 10 × 100 000 = 1 000 000 DH"]}',
  '{"économie","monnaie","multiplicateur_crédit","bac_style"}'
),
-- 660: monnaie fiduciaire — true_false
(
  '44444444-0000-0000-0000-000000000660',
  '33333333-0000-0000-0000-000000000097',
  'true_false', 2, 'fr',
  '{"stem": "La monnaie fiduciaire comprend les billets de banque et les pièces de monnaie en circulation.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La monnaie fiduciaire (du latin fiducia = confiance) désigne l''ensemble des billets de banque et des pièces de monnaie en circulation. Elle est émise par la banque centrale (Bank Al-Maghrib au Maroc) et a cours légal.", "steps": ["Monnaie fiduciaire vient du latin fiducia (confiance)", "Elle comprend les billets + les pièces métalliques", "Elle est émise par la banque centrale (Bank Al-Maghrib)", "Elle a cours légal sur le territoire national"]}',
  '{"économie","monnaie","monnaie_fiduciaire","bac_style"}'
),
-- 661: Bank Al-Maghrib — true_false
(
  '44444444-0000-0000-0000-000000000661',
  '33333333-0000-0000-0000-000000000097',
  'true_false', 2, 'fr',
  '{"stem": "Bank Al-Maghrib est une banque commerciale qui accorde des crédits directement aux ménages.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Bank Al-Maghrib est la banque centrale du Maroc. Elle ne traite pas directement avec les ménages ni les entreprises. Ses missions sont : l''émission de la monnaie fiduciaire, la conduite de la politique monétaire, la supervision du système bancaire et la gestion des réserves de change. Les crédits aux ménages sont accordés par les banques commerciales.", "steps": ["Bank Al-Maghrib = banque centrale du Maroc (pas une banque commerciale)", "Elle émet la monnaie fiduciaire", "Elle conduit la politique monétaire (fixe le taux directeur)", "Elle supervise le système bancaire", "Les crédits aux ménages sont accordés par les banques commerciales"]}',
  '{"économie","monnaie","bank_al_maghrib","bac_style"}'
);

-- =====================
-- SKILL: financial_system (Système financier) — 7 items
-- Covers: marché monétaire, marché financier (bourse de Casablanca),
--         financement direct vs indirect, taux d''intérêt
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 662: financement direct vs indirect — mcq
(
  '44444444-0000-0000-0000-000000000662',
  '33333333-0000-0000-0000-000000000098',
  'mcq', 2, 'fr',
  '{"stem": "Le financement indirect (ou intermédié) se caractérise par :", "choices": ["L''émission d''actions sur le marché boursier", "L''intervention d''un intermédiaire financier (banque) entre épargnants et emprunteurs", "La vente d''obligations directement aux investisseurs", "Le recours au marché des changes"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le financement indirect (intermédié) passe par un intermédiaire financier, généralement une banque, qui collecte l''épargne et accorde des crédits. Le financement direct, en revanche, met en relation directe les agents à besoin de financement et les agents à capacité de financement via les marchés financiers (émission d''actions, d''obligations).", "steps": ["Financement indirect = passage par un intermédiaire (banque)", "La banque collecte l''épargne et accorde des crédits", "Financement direct = émission de titres sur les marchés financiers", "Le financement direct ne nécessite pas d''intermédiaire bancaire"]}',
  '{"économie","système_financier","financement_indirect","bac_style"}'
),
-- 663: marché monétaire — mcq
(
  '44444444-0000-0000-0000-000000000663',
  '33333333-0000-0000-0000-000000000098',
  'mcq', 3, 'fr',
  '{"stem": "Le marché monétaire est un marché où s''échangent :", "choices": ["Des devises étrangères", "Des capitaux à court et moyen terme", "Des actions de sociétés cotées", "Des biens et services de consommation"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le marché monétaire est le marché des capitaux à court et moyen terme (généralement moins d''un an, jusqu''à 2 ans). Il comprend le marché interbancaire (entre banques) et le marché des titres de créances négociables (bons du Trésor, certificats de dépôt, billets de trésorerie). Le marché des devises est le marché des changes. Les actions s''échangent sur le marché financier.", "steps": ["Marché monétaire = capitaux à court et moyen terme", "Il comprend le marché interbancaire + marché des TCN", "Marché des changes = devises étrangères (à ne pas confondre)", "Marché financier (boursier) = actions et obligations à long terme"]}',
  '{"économie","système_financier","marché_monétaire","bac_style"}'
),
-- 664: bourse de Casablanca — mcq
(
  '44444444-0000-0000-0000-000000000664',
  '33333333-0000-0000-0000-000000000098',
  'mcq', 2, 'fr',
  '{"stem": "La Bourse des valeurs de Casablanca est un exemple de :", "choices": ["Marché monétaire", "Marché financier", "Marché des changes", "Marché au comptant des matières premières"], "correct_index": 1, "latex": false}',
  '{"text_fr": "La Bourse des valeurs de Casablanca est le marché financier du Maroc. C''est un marché de capitaux à long terme où s''échangent des titres financiers : actions et obligations. Elle permet le financement direct de l''économie en mettant en relation les entreprises ayant besoin de capitaux avec les investisseurs.", "steps": ["La Bourse de Casablanca = marché financier marocain", "Marché financier = capitaux à long terme (actions, obligations)", "Elle permet le financement direct de l''économie", "À ne pas confondre avec le marché monétaire (court terme)"]}',
  '{"économie","système_financier","bourse_casablanca","bac_style"}'
),
-- 665: taux d''intérêt — numeric
(
  '44444444-0000-0000-0000-000000000665',
  '33333333-0000-0000-0000-000000000098',
  'numeric', 2, 'fr',
  '{"stem": "Un épargnant place 200 000 DH dans un compte à terme au taux d''intérêt annuel simple de 4 %. Quel montant d''intérêts (en DH) percevra-t-il au bout d''un an ?", "correct_value": 8000, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''intérêt simple se calcule par la formule : I = C × t × n, où C est le capital, t le taux d''intérêt et n la durée. I = 200 000 × 0,04 × 1 = 8 000 DH.", "steps": ["Formule de l''intérêt simple : I = C × t × n", "C = 200 000 DH, t = 4 % = 0,04, n = 1 an", "I = 200 000 × 0,04 × 1", "I = 8 000 DH"]}',
  '{"économie","système_financier","taux_intérêt","bac_style"}'
),
-- 666: taux d''intérêt réel — numeric
(
  '44444444-0000-0000-0000-000000000666',
  '33333333-0000-0000-0000-000000000098',
  'numeric', 3, 'fr',
  '{"stem": "Le taux d''intérêt nominal est de 6 % et le taux d''inflation est de 2 %. Calculer le taux d''intérêt réel approximatif (en %).", "correct_value": 4, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "Le taux d''intérêt réel mesure le rendement effectif d''un placement en tenant compte de l''inflation. En approximation : taux réel ≈ taux nominal − taux d''inflation = 6 % − 2 % = 4 %. La formule exacte de Fisher donne : (1 + r) = (1 + i)/(1 + π), soit r ≈ 3,92 %, mais l''approximation 4 % est acceptée au Bac.", "steps": ["Formule approximative : taux réel ≈ taux nominal − taux d''inflation", "Taux réel ≈ 6 % − 2 % = 4 %", "Formule exacte (Fisher) : (1 + r) = (1 + 0,06)/(1 + 0,02) ≈ 1,0392", "L''approximation de 4 % est acceptée au niveau Bac"]}',
  '{"économie","système_financier","taux_intérêt_réel","inflation","bac_style"}'
),
-- 667: financement direct — true_false
(
  '44444444-0000-0000-0000-000000000667',
  '33333333-0000-0000-0000-000000000098',
  'true_false', 2, 'fr',
  '{"stem": "Le financement direct consiste pour une entreprise à émettre des titres (actions ou obligations) sur le marché financier pour lever des fonds.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le financement direct (ou désintermédié) permet aux agents à besoin de financement (entreprises, État) de lever des capitaux directement auprès des agents à capacité de financement (épargnants, investisseurs) en émettant des titres financiers : actions (parts de capital) ou obligations (titres de dette) sur le marché financier.", "steps": ["Financement direct = levée de fonds sur le marché financier", "L''entreprise émet des actions (capital) ou des obligations (dette)", "Les investisseurs achètent ces titres directement", "Pas d''intermédiaire bancaire entre émetteur et investisseur"]}',
  '{"économie","système_financier","financement_direct","bac_style"}'
),
-- 668: marché interbancaire — true_false
(
  '44444444-0000-0000-0000-000000000668',
  '33333333-0000-0000-0000-000000000098',
  'true_false', 3, 'fr',
  '{"stem": "Le marché interbancaire est accessible à tous les agents économiques, y compris les ménages et les entreprises.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le marché interbancaire est un compartiment du marché monétaire réservé exclusivement aux établissements de crédit (banques) et à la banque centrale (Bank Al-Maghrib). Les ménages et les entreprises n''y ont pas accès. Sur ce marché, les banques ayant des excédents de liquidité prêtent à celles qui en manquent, généralement à très court terme.", "steps": ["Le marché interbancaire est réservé aux banques et à la banque centrale", "Les ménages et entreprises n''y ont pas accès", "Les banques excédentaires prêtent aux banques déficitaires", "Bank Al-Maghrib y intervient pour réguler la liquidité bancaire"]}',
  '{"économie","système_financier","marché_interbancaire","bac_style"}'
);
