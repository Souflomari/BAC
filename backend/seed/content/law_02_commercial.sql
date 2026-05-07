-- ============================================================
-- LAW CONTENT: Droit commercial (2 skills, 14 items)
-- Topic: Droit commercial
-- Skills:
--   commercial_acts   (33333333-...-121) — 7 items
--   business_entities  (33333333-...-122) — 7 items
-- ============================================================

-- =====================
-- SKILL: commercial_acts (Actes de commerce) — 7 items
-- =====================

-- Item 823 — mcq — Actes de commerce par nature
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000823',
  '33333333-0000-0000-0000-000000000121',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les activités suivantes, laquelle constitue un acte de commerce par nature selon le Code de commerce marocain ?", "choices": ["L''achat de marchandises en vue de les revendre", "La location d''un appartement à usage d''habitation", "L''exercice de la profession d''avocat", "La vente d''un bien immobilier personnel"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''achat de marchandises en vue de les revendre constitue l''acte de commerce par nature le plus caractéristique. L''article 6 du Code de commerce marocain énumère les actes de commerce par nature, qui sont des activités exercées de manière habituelle et professionnelle dans un but lucratif. L''intention de revendre est l''élément essentiel qui distingue l''achat commercial de l''achat civil.", "steps": ["Les actes de commerce par nature sont définis par l''article 6 du Code de commerce", "L''achat pour revendre est l''acte de commerce le plus fondamental", "L''élément clé est l''intention de revente au moment de l''achat", "Les professions libérales (avocat, médecin) et les actes civils (location d''habitation) ne sont pas des actes de commerce"]}',
  '{"droit","commercial","actes_de_commerce","achat_revente"}'
);

-- Item 824 — mcq — Actes de commerce par la forme
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000824',
  '33333333-0000-0000-0000-000000000121',
  'mcq', 2, 'fr',
  '{"stem": "Quel effet de commerce est considéré comme un acte de commerce par la forme, quelle que soit la qualité de son signataire ?", "choices": ["La lettre de change", "Le chèque", "Le virement bancaire", "Le reçu de paiement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La lettre de change (الكمبيالة) est un acte de commerce par la forme en vertu de l''article 9 du Code de commerce marocain. Cela signifie qu''elle est toujours commerciale, même si elle est signée par un non-commerçant pour des besoins civils. Le billet à ordre est également commercial par la forme. Cette qualification entraîne l''application des règles du droit commercial (compétence du tribunal de commerce, solidarité, preuve libre).", "steps": ["La lettre de change est toujours commerciale, indépendamment de la qualité du signataire", "Le billet à ordre est aussi un acte de commerce par la forme", "Cette qualification est dite « par la forme » car c''est la forme juridique qui détermine la commercialité", "Conséquences : compétence du tribunal de commerce, solidarité entre les signataires, liberté de la preuve"]}',
  '{"droit","commercial","lettre_de_change","effets_de_commerce","actes_par_forme"}'
);

-- Item 825 — mcq — Qualité de commerçant
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000825',
  '33333333-0000-0000-0000-000000000121',
  'mcq', 2, 'fr',
  '{"stem": "Pour acquérir la qualité de commerçant au Maroc, il faut remplir plusieurs conditions. Laquelle n''en fait PAS partie ?", "choices": ["Détenir un diplôme universitaire en gestion", "Exercer des actes de commerce de manière habituelle", "Exercer ces actes à titre professionnel", "Avoir la capacité juridique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le diplôme universitaire n''est pas une condition pour acquérir la qualité de commerçant. Selon le Code de commerce marocain, les conditions sont : exercer des actes de commerce à titre habituel et professionnel, en son nom et pour son compte, et avoir la capacité commerciale (majorité, absence d''incapacité ou d''interdiction). L''inscription au registre de commerce est une obligation du commerçant mais n''est pas constitutive de la qualité.", "steps": ["Condition 1 : exercer des actes de commerce (art. 6 et 7 du Code de commerce)", "Condition 2 : l''exercice doit être habituel et professionnel", "Condition 3 : agir en son nom et pour son propre compte", "Condition 4 : avoir la capacité commerciale (18 ans, pas d''incapacité)", "Aucun diplôme n''est requis pour devenir commerçant"]}',
  '{"droit","commercial","commerçant","conditions","qualité"}'
);

-- Item 826 — mcq — Obligations du commerçant
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000826',
  '33333333-0000-0000-0000-000000000121',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les obligations légales du commerçant, laquelle concerne la tenue de documents comptables ?", "choices": ["La tenue d''une comptabilité régulière conformément à la loi", "La publication d''un rapport annuel dans un journal officiel", "L''envoi des comptes au tribunal de commerce chaque trimestre", "L''embauche obligatoire d''un expert-comptable agréé"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le commerçant est tenu de tenir une comptabilité régulière conformément à la loi n° 9-88 relative aux obligations comptables des commerçants. Il doit tenir un livre journal, un grand livre et un livre d''inventaire. Les états de synthèse (bilan, CPC, etc.) doivent être établis annuellement. Cette obligation vise à assurer la transparence et à protéger les tiers (créanciers, État, partenaires).", "steps": ["L''inscription au registre de commerce est une obligation déclarative", "La tenue d''une comptabilité régulière est régie par la loi n° 9-88", "Les livres obligatoires : livre journal, grand livre, livre d''inventaire", "Les états de synthèse annuels comprennent le bilan, le CPC, l''ESG, le tableau de financement et l''ETIC"]}',
  '{"droit","commercial","commerçant","comptabilité","obligations"}'
);

-- Item 827 — numeric — Éléments du fonds de commerce
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000827',
  '33333333-0000-0000-0000-000000000121',
  'numeric', 2, 'fr',
  '{"stem": "En droit commercial marocain, pendant combien de jours le vendeur d''un fonds de commerce doit-il publier la vente au Bulletin officiel et dans un journal d''annonces légales pour protéger les créanciers ?", "correct_value": 15, "tolerance": 0, "unit": "jours", "latex": false}',
  '{"text_fr": "La vente du fonds de commerce doit faire l''objet d''une publicité dans un délai de 15 jours suivant la date de l''acte de vente. Cette publication se fait au Bulletin officiel et dans un journal d''annonces légales. Elle est renouvelée entre le 8e et le 15e jour après la première insertion. Cette formalité vise à informer les créanciers du vendeur, qui disposent alors d''un droit d''opposition sur le prix de vente.", "steps": ["La vente du fonds de commerce doit être publiée dans les 15 jours suivant l''acte", "La publication se fait au Bulletin officiel et dans un journal d''annonces légales", "Une deuxième insertion est obligatoire entre le 8e et le 15e jour", "Les créanciers peuvent faire opposition sur le prix de vente dans un délai de 15 jours après la deuxième publication"]}',
  '{"droit","commercial","fonds_de_commerce","vente","publicité"}'
);

-- Item 828 — true_false — Fonds de commerce et éléments
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000828',
  '33333333-0000-0000-0000-000000000121',
  'true_false', 2, 'fr',
  '{"stem": "Le fonds de commerce comprend obligatoirement les immeubles dans lesquels le commerçant exerce son activité.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le fonds de commerce est un bien meuble incorporel qui ne comprend pas les immeubles. Il est composé d''éléments incorporels (clientèle, nom commercial, droit au bail, enseigne, brevets, marques, licences) et d''éléments corporels (matériel, outillage, marchandises). La clientèle est l''élément essentiel sans lequel le fonds de commerce n''existe pas. Les immeubles sont exclus du fonds de commerce.", "steps": ["Le fonds de commerce est un bien meuble incorporel", "Les éléments incorporels : clientèle, nom commercial, droit au bail, enseigne, brevets, marques", "Les éléments corporels : matériel, outillage, marchandises", "La clientèle est l''élément essentiel du fonds de commerce", "Les immeubles et les créances sont exclus du fonds de commerce"]}',
  '{"droit","commercial","fonds_de_commerce","éléments","clientèle"}'
);

-- Item 829 — true_false — Nantissement du fonds de commerce
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000829',
  '33333333-0000-0000-0000-000000000121',
  'true_false', 3, 'fr',
  '{"stem": "Le nantissement du fonds de commerce permet au commerçant de donner son fonds en garantie d''une dette sans en perdre la possession.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le nantissement du fonds de commerce est une sûreté mobilière sans dépossession. Le commerçant peut donner son fonds de commerce en garantie d''un crédit tout en continuant à l''exploiter. Le nantissement doit être inscrit au registre de commerce pour être opposable aux tiers. À défaut de paiement, le créancier nanti peut faire vendre le fonds de commerce en justice et se faire payer par préférence sur le prix.", "steps": ["Le nantissement est une garantie sans dépossession : le commerçant garde l''exploitation du fonds", "Il doit être constaté par un acte écrit et inscrit au registre de commerce", "Le créancier nanti bénéficie d''un droit de préférence sur le prix de vente du fonds", "Le nantissement peut porter sur tout ou partie des éléments du fonds (clientèle, droit au bail, enseigne, etc.)"]}',
  '{"droit","commercial","fonds_de_commerce","nantissement","sûretés"}'
);

-- =====================
-- SKILL: business_entities (Sociétés commerciales) — 7 items
-- =====================

-- Item 830 — mcq — Société anonyme (SA)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000830',
  '33333333-0000-0000-0000-000000000122',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le capital minimum requis pour la constitution d''une Société Anonyme (SA) au Maroc ?", "choices": ["300 000 DH", "100 000 DH", "500 000 DH", "1 000 000 DH"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le capital minimum d''une Société Anonyme (SA) au Maroc est de 300 000 DH (3 000 000 DH si elle fait appel public à l''épargne). La SA est régie par la loi n° 17-95. Elle doit compter au minimum 5 actionnaires. La responsabilité des actionnaires est limitée à leurs apports. La SA peut être dirigée soit par un conseil d''administration avec PDG, soit par un directoire avec conseil de surveillance.", "steps": ["Capital minimum SA sans appel public à l''épargne : 300 000 DH", "Capital minimum SA avec appel public à l''épargne : 3 000 000 DH", "Nombre minimum d''actionnaires : 5", "Deux modes de gouvernance : conseil d''administration ou directoire/conseil de surveillance"]}',
  '{"droit","commercial","sociétés","SA","capital"}'
);

-- Item 831 — mcq — SARL : caractéristiques
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000831',
  '33333333-0000-0000-0000-000000000122',
  'mcq', 2, 'fr',
  '{"stem": "Concernant la Société à Responsabilité Limitée (SARL) au Maroc, quelle affirmation est correcte ?", "choices": ["Le capital social est librement fixé par les associés", "Le nombre d''associés ne peut pas dépasser 100", "Elle doit obligatoirement désigner un commissaire aux comptes", "Elle peut émettre des actions cotées en bourse"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Depuis la réforme de la loi n° 5-96, le capital social de la SARL est librement fixé par les associés dans les statuts (auparavant le minimum était de 10 000 DH). La SARL ne peut pas dépasser 50 associés (et non 100). Elle ne peut pas émettre d''actions ni faire appel public à l''épargne. Le commissaire aux comptes n''est obligatoire que si le chiffre d''affaires dépasse 50 millions de DH.", "steps": ["Le capital de la SARL est librement fixé par les statuts (pas de minimum légal)", "Le nombre maximum d''associés est de 50", "La SARL émet des parts sociales (et non des actions)", "Elle ne peut pas faire appel public à l''épargne", "Le commissaire aux comptes est obligatoire uniquement si le CA dépasse 50 millions DH"]}',
  '{"droit","commercial","sociétés","SARL","capital"}'
);

-- Item 832 — mcq — Société en nom collectif (SNC)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000832',
  '33333333-0000-0000-0000-000000000122',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la caractéristique principale de la responsabilité des associés dans une Société en Nom Collectif (SNC) ?", "choices": ["Ils sont responsables solidairement et indéfiniment des dettes sociales", "Ils sont responsables uniquement à hauteur de leurs apports", "Ils sont responsables proportionnellement à leurs parts sociales", "Ils ne sont responsables que sur décision judiciaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans la Société en Nom Collectif (SNC), les associés sont solidairement et indéfiniment responsables des dettes sociales sur leur patrimoine personnel. C''est une société de personnes fondée sur l''intuitu personae (confiance mutuelle entre associés). Tous les associés ont la qualité de commerçant. La SNC est régie par la loi n° 5-96. Cette responsabilité illimitée distingue la SNC de la SARL et de la SA.", "steps": ["Les associés de la SNC sont solidairement responsables : chaque associé peut être poursuivi pour la totalité de la dette", "Ils sont indéfiniment responsables : leur patrimoine personnel peut être saisi", "Tous les associés de la SNC ont la qualité de commerçant", "La SNC est une société de personnes basée sur l''intuitu personae", "Pas de capital minimum imposé par la loi"]}',
  '{"droit","commercial","sociétés","SNC","responsabilité"}'
);

-- Item 833 — mcq — Personnalité morale des sociétés
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000833',
  '33333333-0000-0000-0000-000000000122',
  'mcq', 3, 'fr',
  '{"stem": "À quel moment la société commerciale acquiert-elle la personnalité morale au Maroc ?", "choices": ["À compter de son immatriculation au registre de commerce", "Dès la signature des statuts par les associés", "Lors du dépôt du capital à la banque", "Après la première assemblée générale des associés"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La société commerciale acquiert la personnalité morale à compter de son immatriculation au registre de commerce, conformément au droit des sociétés marocain. Avant cette immatriculation, la société est dite « en formation » et les fondateurs sont personnellement responsables des actes accomplis pour son compte. La personnalité morale confère à la société un patrimoine propre, un nom, un domicile et la capacité d''ester en justice.", "steps": ["La personnalité morale naît de l''immatriculation au registre de commerce", "Avant l''immatriculation, la société est « en formation »", "Les fondateurs sont personnellement responsables des actes accomplis pendant la période de formation", "La personnalité morale confère : un patrimoine propre, un nom, un siège social, la capacité juridique"]}',
  '{"droit","commercial","sociétés","personnalité_morale","immatriculation"}'
);

-- Item 834 — numeric — Nombre minimum d'actionnaires d'une SA
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000834',
  '33333333-0000-0000-0000-000000000122',
  'numeric', 2, 'fr',
  '{"stem": "Quel est le nombre minimum d''actionnaires requis pour constituer une Société Anonyme (SA) au Maroc ?", "correct_value": 5, "tolerance": 0, "unit": "actionnaires", "latex": false}',
  '{"text_fr": "La Société Anonyme (SA) au Maroc requiert un minimum de 5 actionnaires selon la loi n° 17-95. Il n''y a pas de nombre maximum d''actionnaires. Ce seuil minimum vise à garantir le caractère collectif de la société et la pluralité des décisions. Si le nombre d''actionnaires descend en dessous de 5, toute personne intéressée peut demander en justice la dissolution de la société.", "steps": ["Le minimum légal est de 5 actionnaires pour une SA (loi n° 17-95)", "Il n''y a pas de nombre maximum d''actionnaires", "Si le nombre descend sous 5, la régularisation doit intervenir dans un délai d''un an", "À défaut de régularisation, la dissolution peut être demandée en justice"]}',
  '{"droit","commercial","sociétés","SA","actionnaires"}'
);

-- Item 835 — true_false — Responsabilité limitée dans la SARL
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000835',
  '33333333-0000-0000-0000-000000000122',
  'true_false', 2, 'fr',
  '{"stem": "Dans une SARL, les associés sont responsables des dettes de la société au-delà de leurs apports, sur leur patrimoine personnel.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Dans une Société à Responsabilité Limitée (SARL), la responsabilité des associés est limitée au montant de leurs apports. Leur patrimoine personnel est protégé et ne peut pas être saisi pour payer les dettes de la société. C''est précisément cette limitation de la responsabilité qui donne son nom à la SARL. Cette caractéristique la distingue de la SNC où les associés sont solidairement et indéfiniment responsables.", "steps": ["La responsabilité des associés de la SARL est limitée à leurs apports", "Le patrimoine personnel des associés est protégé", "C''est le principe de la séparation des patrimoines grâce à la personnalité morale", "Exception : le gérant peut être tenu responsable sur son patrimoine personnel en cas de faute de gestion"]}',
  '{"droit","commercial","sociétés","SARL","responsabilité"}'
);

-- Item 836 — true_false — Société unipersonnelle
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000836',
  '33333333-0000-0000-0000-000000000122',
  'true_false', 3, 'fr',
  '{"stem": "Une SARL peut être constituée par un seul associé et prend alors le nom de SARL d''associé unique (SARL AU).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La loi marocaine permet la constitution d''une SARL par un seul associé, appelée SARL d''associé unique (SARL AU). Cette forme juridique permet à un entrepreneur individuel de bénéficier de la limitation de responsabilité tout en étant le seul maître de son entreprise. L''associé unique exerce les pouvoirs dévolus à l''assemblée des associés. Les règles de la SARL s''appliquent à la SARL AU, sauf dispositions spécifiques.", "steps": ["La SARL AU est une SARL constituée par un seul associé", "Elle permet de limiter la responsabilité de l''entrepreneur à ses apports", "L''associé unique exerce seul les pouvoirs de l''assemblée des associés", "Une personne physique ne peut être associé unique que dans une seule SARL AU"]}',
  '{"droit","commercial","sociétés","SARL","SARL_AU","associé_unique"}'
);
