-- ============================================================
-- ACCOUNTING CONTENT: Comptabilité générale (3 skills, 21 items)
-- Topic: Comptabilité et Maths Financières
-- Skills:
--   journal_entries          (33333333-...-110) — 7 items (2 mcq + 3 numeric + 2 true_false)
--   balance_sheet            (33333333-...-111) — 7 items (2 mcq + 3 numeric + 2 true_false)
--   inventory_depreciation   (33333333-...-112) — 7 items (2 mcq + 3 numeric + 2 true_false)
-- ============================================================

-- =====================
-- SKILL: journal_entries (Écritures comptables) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000746',
  '33333333-0000-0000-0000-000000000110',
  'mcq', 1, 'fr',
  '{"stem": "Selon le principe de la partie double, toute écriture comptable doit :", "choices": ["Débiter au moins un compte et créditer au moins un autre pour un même montant total", "Débiter et créditer le même compte", "Enregistrer uniquement les opérations en espèces", "Débiter deux comptes simultanément"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le principe de la partie double stipule que chaque opération comptable se traduit par au moins un débit et au moins un crédit, et que le total des débits est toujours égal au total des crédits.", "steps": ["Principe fondamental : tout emploi a une ressource correspondante", "Total des débits = Total des crédits", "Chaque écriture affecte au moins deux comptes"]}',
  '{"comptabilité","écritures","journal","partie_double"}'
),
(
  '44444444-0000-0000-0000-000000000747',
  '33333333-0000-0000-0000-000000000110',
  'mcq', 2, 'fr',
  '{"stem": "Une entreprise achète des marchandises à crédit pour 50 000 DH (HT). Quels comptes sont mouvementés dans le journal ?", "choices": ["Débit 6111 Achats de marchandises / Crédit 4411 Fournisseurs", "Débit 4411 Fournisseurs / Crédit 6111 Achats de marchandises", "Débit 3111 Stocks de marchandises / Crédit 5141 Banque", "Débit 6111 Achats de marchandises / Crédit 5141 Banque"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un achat de marchandises à crédit se traduit par le débit du compte de charges 6111 (Achats de marchandises) et le crédit du compte de passif 4411 (Fournisseurs). La banque n''est pas concernée car l''achat est à crédit.", "steps": ["Identifier la nature de l''opération : achat à crédit", "L''achat augmente les charges → débit du compte 6111", "Le crédit fournisseur augmente la dette → crédit du compte 4411", "Écriture : 6111 Achats de marchandises au débit / 4411 Fournisseurs au crédit"]}',
  '{"comptabilité","écritures","journal","achats"}'
),
(
  '44444444-0000-0000-0000-000000000748',
  '33333333-0000-0000-0000-000000000110',
  'numeric', 1, 'fr',
  '{"stem": "Une entreprise vend des marchandises pour 80 000 DH HT avec une TVA de 20%. Quel est le montant TTC que le client doit payer (en DH) ?", "correct_value": 96000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le montant TTC se calcule en ajoutant la TVA au montant HT. TVA = 80 000 × 20% = 16 000 DH. Montant TTC = 80 000 + 16 000 = 96 000 DH.", "steps": ["Montant HT = 80 000 DH", "TVA = 80 000 × 20/100 = 16 000 DH", "Montant TTC = HT + TVA = 80 000 + 16 000 = 96 000 DH"]}',
  '{"comptabilité","écritures","TVA","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000749',
  '33333333-0000-0000-0000-000000000110',
  'numeric', 2, 'fr',
  '{"stem": "L''entreprise ABC enregistre les opérations suivantes dans son journal : Achat de marchandises 45 000 DH, Vente de marchandises 72 000 DH, Frais de transport 3 000 DH, Charges de personnel 18 000 DH. Quel est le solde des comptes de charges (classe 6) ?", "correct_value": 66000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les comptes de charges (classe 6) regroupent les achats, frais et charges de personnel. Total charges = 45 000 + 3 000 + 18 000 = 66 000 DH. La vente est un produit (classe 7), elle n''est pas incluse.", "steps": ["Identifier les charges (classe 6) : Achats 45 000, Transport 3 000, Personnel 18 000", "La vente (72 000) est un produit (classe 7), pas une charge", "Total charges = 45 000 + 3 000 + 18 000 = 66 000 DH"]}',
  '{"comptabilité","écritures","charges","plan_comptable"}'
),
(
  '44444444-0000-0000-0000-000000000750',
  '33333333-0000-0000-0000-000000000110',
  'numeric', 2, 'fr',
  '{"stem": "Une entreprise règle une facture fournisseur de 30 000 DH par chèque bancaire et bénéficie d''un escompte de 2% pour paiement anticipé. Quel est le montant net payé par l''entreprise (en DH) ?", "correct_value": 29400, "tolerance": 0, "latex": false}',
  '{"text_fr": "L''escompte de règlement de 2% réduit le montant à payer. Escompte = 30 000 × 2% = 600 DH. Montant net = 30 000 - 600 = 29 400 DH. L''écriture débite le compte 4411 Fournisseurs (30 000), crédite 5141 Banque (29 400) et crédite 7386 Escomptes obtenus (600).", "steps": ["Montant initial de la facture = 30 000 DH", "Escompte = 30 000 × 2/100 = 600 DH", "Montant net payé = 30 000 - 600 = 29 400 DH", "Écriture : Débit 4411 (30 000) / Crédit 5141 (29 400) + Crédit 7386 (600)"]}',
  '{"comptabilité","écritures","escompte","règlement"}'
),
(
  '44444444-0000-0000-0000-000000000751',
  '33333333-0000-0000-0000-000000000110',
  'true_false', 1, 'fr',
  '{"stem": "Dans le plan comptable marocain, les comptes de la classe 7 enregistrent les produits de l''entreprise.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Dans le plan comptable marocain (PCGM), la classe 7 regroupe les comptes de produits : produits d''exploitation (71), produits financiers (73) et produits non courants (75).", "steps": ["Classe 1 : Comptes de financement permanent", "Classe 2 : Actif immobilisé", "Classe 3 : Actif circulant", "Classe 4 : Passif circulant", "Classe 5 : Trésorerie", "Classe 6 : Charges", "Classe 7 : Produits ← La réponse est donc vraie"]}',
  '{"comptabilité","plan_comptable","classes"}'
),
(
  '44444444-0000-0000-0000-000000000752',
  '33333333-0000-0000-0000-000000000110',
  'true_false', 2, 'fr',
  '{"stem": "Lors de l''enregistrement au journal, le compte débité est toujours un compte de charges.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Un compte débité peut être un compte de charges (classe 6), mais aussi un compte d''actif (classes 2, 3, 5) ou un compte de passif qui diminue. Par exemple, lors d''un règlement client, on débite le compte 5141 Banque (actif) et non un compte de charges.", "steps": ["Le débit peut concerner : un actif qui augmente, un passif qui diminue, ou une charge", "Le crédit peut concerner : un passif qui augmente, un actif qui diminue, ou un produit", "Exemple : Encaissement client → Débit 5141 Banque (actif) / Crédit 3421 Clients (actif)", "Donc un compte débité n''est PAS toujours une charge"]}',
  '{"comptabilité","écritures","journal","piège"}'
);

-- =====================
-- SKILL: balance_sheet (Bilan et CPC) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000753',
  '33333333-0000-0000-0000-000000000111',
  'mcq', 1, 'fr',
  '{"stem": "Dans le bilan comptable, les immobilisations corporelles figurent dans :", "choices": ["L''actif immobilisé", "L''actif circulant", "Le passif circulant", "Le financement permanent"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les immobilisations corporelles (terrains, constructions, matériel) sont des biens durables détenus par l''entreprise. Elles figurent dans l''actif immobilisé du bilan, qui regroupe les éléments destinés à rester durablement dans l''entreprise.", "steps": ["Le bilan se compose de l''Actif (emplois) et du Passif (ressources)", "L''actif comprend : actif immobilisé + actif circulant + trésorerie-actif", "Les immobilisations corporelles sont des biens durables", "Elles appartiennent donc à l''actif immobilisé (classe 2)"]}',
  '{"comptabilité","bilan","actif","immobilisations"}'
),
(
  '44444444-0000-0000-0000-000000000754',
  '33333333-0000-0000-0000-000000000111',
  'mcq', 2, 'fr',
  '{"stem": "Le résultat net de l''exercice dans le CPC est obtenu par :", "choices": ["Résultat courant + Résultat non courant - Impôt sur les sociétés", "Total des produits d''exploitation - Total des charges d''exploitation", "Chiffre d''affaires - Achats de marchandises", "Résultat d''exploitation + Résultat financier"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le CPC (Compte de Produits et Charges) calcule le résultat net en trois étapes : le résultat d''exploitation, le résultat financier (qui donnent le résultat courant), puis le résultat non courant. Le résultat net = résultat courant + résultat non courant - impôt sur les sociétés.", "steps": ["Résultat d''exploitation = Produits d''exploitation - Charges d''exploitation", "Résultat financier = Produits financiers - Charges financières", "Résultat courant = Résultat d''exploitation + Résultat financier", "Résultat non courant = Produits non courants - Charges non courantes", "Résultat net = Résultat courant + Résultat non courant - Impôt sur les sociétés"]}',
  '{"comptabilité","CPC","résultat","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000755',
  '33333333-0000-0000-0000-000000000111',
  'numeric', 2, 'fr',
  '{"stem": "Le bilan d''une entreprise présente les éléments suivants : Immobilisations 500 000 DH, Stocks 120 000 DH, Créances clients 80 000 DH, Banque 50 000 DH, Caisse 10 000 DH. Quel est le total de l''actif (en DH) ?", "correct_value": 760000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le total de l''actif est la somme de tous les éléments de l''actif : actif immobilisé + actif circulant + trésorerie-actif. Total = 500 000 + 120 000 + 80 000 + 50 000 + 10 000 = 760 000 DH.", "steps": ["Actif immobilisé : Immobilisations = 500 000 DH", "Actif circulant : Stocks (120 000) + Créances clients (80 000) = 200 000 DH", "Trésorerie-actif : Banque (50 000) + Caisse (10 000) = 60 000 DH", "Total actif = 500 000 + 200 000 + 60 000 = 760 000 DH"]}',
  '{"comptabilité","bilan","actif","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000756',
  '33333333-0000-0000-0000-000000000111',
  'numeric', 2, 'fr',
  '{"stem": "Le CPC d''une entreprise indique : Produits d''exploitation 900 000 DH, Charges d''exploitation 720 000 DH, Produits financiers 15 000 DH, Charges financières 35 000 DH. Calculer le résultat courant (en DH).", "correct_value": 160000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le résultat courant = résultat d''exploitation + résultat financier. Résultat d''exploitation = 900 000 - 720 000 = 180 000 DH. Résultat financier = 15 000 - 35 000 = -20 000 DH. Résultat courant = 180 000 + (-20 000) = 160 000 DH.", "steps": ["Résultat d''exploitation = 900 000 - 720 000 = 180 000 DH", "Résultat financier = 15 000 - 35 000 = -20 000 DH", "Résultat courant = 180 000 + (-20 000) = 160 000 DH"]}',
  '{"comptabilité","CPC","résultat_courant","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000757',
  '33333333-0000-0000-0000-000000000111',
  'numeric', 3, 'fr',
  '{"stem": "Une entreprise présente les données suivantes : Capital social 400 000 DH, Réserves 60 000 DH, Dettes fournisseurs 150 000 DH, Emprunt bancaire (long terme) 200 000 DH, Résultat net 40 000 DH. Quel est le total du passif du bilan (en DH) ?", "correct_value": 850000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le passif du bilan comprend le financement permanent et le passif circulant. Financement permanent = Capital (400 000) + Réserves (60 000) + Résultat (40 000) + Emprunt LT (200 000) = 700 000 DH. Passif circulant = Dettes fournisseurs = 150 000 DH. Total passif = 700 000 + 150 000 = 850 000 DH.", "steps": ["Capitaux propres = Capital (400 000) + Réserves (60 000) + Résultat net (40 000) = 500 000 DH", "Dettes de financement = Emprunt bancaire long terme = 200 000 DH", "Financement permanent = 500 000 + 200 000 = 700 000 DH", "Passif circulant = Dettes fournisseurs = 150 000 DH", "Total passif = 700 000 + 150 000 = 850 000 DH"]}',
  '{"comptabilité","bilan","passif","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000758',
  '33333333-0000-0000-0000-000000000111',
  'true_false', 1, 'fr',
  '{"stem": "Dans le bilan, le total de l''actif est toujours égal au total du passif.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. C''est l''équilibre fondamental du bilan : Total Actif = Total Passif. Cela découle du principe de la partie double : chaque ressource (passif) finance un emploi (actif). L''actif représente les emplois des fonds et le passif représente les ressources.", "steps": ["Le bilan traduit l''équation fondamentale : Actif = Passif", "Actif = ce que l''entreprise possède (emplois)", "Passif = comment ces biens sont financés (ressources)", "Toute augmentation de l''actif implique une augmentation du passif (ou une diminution d''un autre actif)", "Donc Actif = Passif est toujours vérifié"]}',
  '{"comptabilité","bilan","équilibre","principe"}'
),
(
  '44444444-0000-0000-0000-000000000759',
  '33333333-0000-0000-0000-000000000111',
  'true_false', 2, 'fr',
  '{"stem": "Le fonds commercial figure dans l''actif circulant du bilan.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le fonds commercial est une immobilisation incorporelle qui figure dans l''actif immobilisé du bilan (compte 2230). L''actif circulant comprend les stocks, les créances et les titres et valeurs de placement, c''est-à-dire des éléments qui se renouvellent au cours du cycle d''exploitation.", "steps": ["Le fonds commercial est un élément incorporel durable", "Il est classé dans les immobilisations incorporelles (compte 2230)", "Il figure donc dans l''actif immobilisé, pas dans l''actif circulant", "L''actif circulant contient : stocks, créances, TVP"]}',
  '{"comptabilité","bilan","immobilisations","piège"}'
);

-- =====================
-- SKILL: inventory_depreciation (Amortissements et provisions) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000760',
  '33333333-0000-0000-0000-000000000112',
  'mcq', 2, 'fr',
  '{"stem": "Une machine acquise pour 240 000 DH est amortie linéairement sur 8 ans. Quel est le taux d''amortissement linéaire ?", "choices": ["12,5%", "8%", "15%", "25%"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le taux d''amortissement linéaire = 100% / durée de vie. Soit 100% / 8 = 12,5%. L''annuité constante sera donc de 240 000 × 12,5% = 30 000 DH par an.", "steps": ["Taux linéaire = 100% / durée de vie en années", "Taux = 100% / 8 = 12,5%", "Vérification : Annuité = 240 000 × 12,5% = 30 000 DH/an", "Total amorti sur 8 ans = 30 000 × 8 = 240 000 DH ✓"]}',
  '{"comptabilité","amortissement","linéaire","taux"}'
),
(
  '44444444-0000-0000-0000-000000000761',
  '33333333-0000-0000-0000-000000000112',
  'mcq', 2, 'fr',
  '{"stem": "Une provision pour dépréciation des créances clients est :", "choices": ["Une charge calculée constatant une perte probable sur une créance", "Un produit exceptionnel", "Une sortie de trésorerie", "Un amortissement du poste clients"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La provision pour dépréciation des créances clients est une charge calculée (non décaissée) qui constate le risque de non-recouvrement d''une créance. Elle est enregistrée au débit du compte 6196 (DEA des créances de l''actif circulant) par le crédit du compte 3942 (Provisions pour dépréciation des clients).", "steps": ["Une créance douteuse présente un risque de non-paiement", "On constate une provision = charge calculée (pas de sortie de trésorerie)", "Écriture : Débit 6196 / Crédit 3942", "La provision réduit la valeur nette des créances au bilan", "Ce n''est pas un amortissement car les créances ne s''amortissent pas"]}',
  '{"comptabilité","provisions","dépréciation","créances"}'
),
(
  '44444444-0000-0000-0000-000000000762',
  '33333333-0000-0000-0000-000000000112',
  'numeric', 2, 'fr',
  '{"stem": "Un matériel industriel est acquis le 01/01/N pour 180 000 DH. Il est amorti linéairement sur 5 ans. Calculer l''annuité d''amortissement (en DH).", "correct_value": 36000, "tolerance": 0, "latex": false}',
  '{"text_fr": "L''amortissement linéaire répartit le coût de manière égale sur la durée de vie. Annuité = Valeur d''origine / Durée = 180 000 / 5 = 36 000 DH par an.", "steps": ["Valeur d''origine (VO) = 180 000 DH", "Durée de vie = 5 ans", "Taux linéaire = 100% / 5 = 20%", "Annuité = 180 000 × 20% = 36 000 DH", "Ou directement : 180 000 / 5 = 36 000 DH"]}',
  '{"comptabilité","amortissement","linéaire","annuité"}'
),
(
  '44444444-0000-0000-0000-000000000763',
  '33333333-0000-0000-0000-000000000112',
  'numeric', 3, 'fr',
  '{"stem": "Un véhicule est acquis le 01/01/N pour 300 000 DH et amorti selon le mode dégressif sur 5 ans (coefficient fiscal = 2). Calculer la première annuité d''amortissement dégressif (en DH).", "correct_value": 120000, "tolerance": 0, "latex": false}',
  '{"text_fr": "En amortissement dégressif, le taux = taux linéaire × coefficient. Taux linéaire = 100%/5 = 20%. Taux dégressif = 20% × 2 = 40%. La première annuité s''applique sur la valeur d''origine : 300 000 × 40% = 120 000 DH.", "steps": ["Taux linéaire = 100% / 5 = 20%", "Coefficient fiscal = 2 (durée 5 ans)", "Taux dégressif = 20% × 2 = 40%", "1ère annuité = Valeur d''origine × taux dégressif", "1ère annuité = 300 000 × 40% = 120 000 DH"]}',
  '{"comptabilité","amortissement","dégressif","annuité"}'
),
(
  '44444444-0000-0000-0000-000000000764',
  '33333333-0000-0000-0000-000000000112',
  'numeric', 3, 'fr',
  '{"stem": "Une créance client de 50 000 DH est jugée douteuse. L''entreprise estime pouvoir récupérer 60% du montant. Quel est le montant de la provision pour dépréciation à constituer (en DH) ?", "correct_value": 20000, "tolerance": 0, "latex": false}',
  '{"text_fr": "La provision couvre la perte probable sur la créance. Si l''entreprise estime récupérer 60%, la perte probable est de 40%. Provision = 50 000 × 40% = 20 000 DH.", "steps": ["Montant de la créance = 50 000 DH", "Taux de recouvrement estimé = 60%", "Taux de perte probable = 100% - 60% = 40%", "Provision = 50 000 × 40% = 20 000 DH", "Écriture : Débit 6196 (20 000) / Crédit 3942 (20 000)"]}',
  '{"comptabilité","provisions","dépréciation","créances","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000765',
  '33333333-0000-0000-0000-000000000112',
  'true_false', 2, 'fr',
  '{"stem": "En amortissement dégressif, l''annuité d''amortissement est constante chaque année.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. En amortissement dégressif, l''annuité est dégressive (décroissante) car le taux constant s''applique chaque année sur la valeur nette d''amortissement (VNA) qui diminue. C''est en amortissement linéaire que l''annuité est constante.", "steps": ["Amortissement linéaire : annuité constante = VO / durée", "Amortissement dégressif : annuité = VNA × taux dégressif", "La VNA diminue chaque année (VNA = VO - cumul des amortissements)", "Donc l''annuité dégressive diminue d''année en année", "L''annuité constante caractérise l''amortissement linéaire, pas le dégressif"]}',
  '{"comptabilité","amortissement","dégressif","piège"}'
),
(
  '44444444-0000-0000-0000-000000000766',
  '33333333-0000-0000-0000-000000000112',
  'true_false', 2, 'fr',
  '{"stem": "Une provision pour risques et charges est inscrite au passif du bilan.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les provisions pour risques et charges (compte 15) sont inscrites au passif du bilan, dans le financement permanent (provisions durables) ou dans le passif circulant (autres provisions pour risques et charges). Elles représentent des dettes probables liées à des risques identifiés.", "steps": ["Les provisions pour risques et charges constatent des dettes probables", "Exemples : litiges en cours, garanties données aux clients, grosses réparations", "Elles figurent au passif du bilan car elles représentent des obligations futures", "Provisions durables (compte 15) → financement permanent (passif)", "Autres provisions pour risques et charges (compte 45) → passif circulant"]}',
  '{"comptabilité","provisions","risques","bilan"}'
);
