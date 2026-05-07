-- ============================================================
-- BUSINESS CONTENT: L'entreprise et son environnement (2 skills, 14 items)
-- Topic: Économie et Organisation des Entreprises
-- Skills:
--   enterprise_types       (33333333-...-102) difficulty 1–2 — 7 items
--   enterprise_environment (33333333-...-103) difficulty 2–3 — 7 items
-- ============================================================

-- =====================
-- SKILL: enterprise_types (Types d'entreprises) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000690',
  '33333333-0000-0000-0000-000000000102',
  'mcq', 1, 'fr',
  '{"stem": "Quelle forme juridique d''entreprise exige un capital social minimum de 300 000 DH au Maroc ?", "choices": ["La Société Anonyme (SA)", "La Société à Responsabilité Limitée (SARL)", "La Société en Nom Collectif (SNC)", "L''entreprise individuelle"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La Société Anonyme (SA) est la seule forme juridique qui exige un capital social minimum de 300 000 DH au Maroc (ou 3 000 000 DH en cas d''appel public à l''épargne). La SARL n''a pas de capital minimum obligatoire, la SNC non plus, et l''entreprise individuelle n''a pas de notion de capital social.", "steps": ["La SA exige un capital minimum de 300 000 DH", "La SARL n''impose pas de capital minimum depuis la réforme", "La SNC et l''entreprise individuelle n''ont pas d''exigence de capital minimum"]}',
  '{"entreprise","forme_juridique","SA","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000691',
  '33333333-0000-0000-0000-000000000102',
  'mcq', 2, 'fr',
  '{"stem": "Dans une Société en Nom Collectif (SNC), quelle est la responsabilité des associés ?", "choices": ["Solidaire et indéfinie sur leurs biens personnels", "Limitée à leurs apports", "Limitée au montant du capital social", "Aucune responsabilité personnelle"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans une SNC, les associés sont solidairement et indéfiniment responsables des dettes sociales sur l''ensemble de leurs biens personnels. C''est la caractéristique principale qui distingue la SNC des sociétés de capitaux comme la SA ou la SARL.", "steps": ["La SNC est une société de personnes", "Les associés sont responsables de manière solidaire (chacun peut être poursuivi pour la totalité des dettes)", "La responsabilité est indéfinie (elle s''étend aux biens personnels)", "C''est le contraire de la SARL où la responsabilité est limitée aux apports"]}',
  '{"entreprise","forme_juridique","SNC","responsabilite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000692',
  '33333333-0000-0000-0000-000000000102',
  'mcq', 1, 'fr',
  '{"stem": "À quel secteur d''activité appartient une entreprise spécialisée dans l''extraction de phosphates ?", "choices": ["Secteur primaire", "Secteur secondaire", "Secteur tertiaire", "Secteur quaternaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''extraction de phosphates est une activité minière qui relève du secteur primaire. Ce secteur regroupe les activités liées à l''exploitation des ressources naturelles : agriculture, pêche, mines et extraction.", "steps": ["Le secteur primaire couvre l''exploitation des ressources naturelles", "L''extraction minière (phosphates) est une activité du secteur primaire", "Le secteur secondaire concerne la transformation industrielle", "Le secteur tertiaire concerne les services"]}',
  '{"entreprise","secteur_activite","primaire","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000693',
  '33333333-0000-0000-0000-000000000102',
  'mcq', 2, 'fr',
  '{"stem": "Quel critère de classification permet de distinguer une PME d''une grande entreprise au Maroc ?", "choices": ["Le nombre de salariés et le chiffre d''affaires", "Uniquement la forme juridique", "Le secteur d''activité", "La date de création de l''entreprise"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La classification des entreprises par taille repose principalement sur des critères quantitatifs : le nombre de salariés (effectif) et le chiffre d''affaires annuel. Au Maroc, une PME emploie généralement moins de 200 salariés. La forme juridique, le secteur d''activité et la date de création sont d''autres critères de classification mais ne servent pas à distinguer PME et grande entreprise.", "steps": ["La taille d''une entreprise se mesure par des critères quantitatifs", "Le nombre de salariés est le premier critère (micro < 10, petite < 50, moyenne < 200)", "Le chiffre d''affaires annuel est le second critère déterminant", "La forme juridique est un critère de classification juridique, pas de taille"]}',
  '{"entreprise","classification","taille","PME","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000694',
  '33333333-0000-0000-0000-000000000102',
  'numeric', 2, 'fr',
  '{"stem": "Une SARL au Maroc peut être constituée par un minimum de 1 associé et un maximum de combien d''associés ?", "correct_value": 50, "tolerance": 0, "latex": false}',
  '{"text_fr": "Au Maroc, la SARL peut compter de 1 à 50 associés. Au-delà de 50 associés, l''entreprise doit se transformer en Société Anonyme (SA). Lorsque la SARL ne comporte qu''un seul associé, on parle de SARL à associé unique (SARLU).", "steps": ["La SARL peut être créée par 1 associé minimum (SARL à associé unique)", "Le nombre maximum d''associés dans une SARL est de 50", "Au-delà de 50, l''entreprise doit adopter la forme de SA"]}',
  '{"entreprise","forme_juridique","SARL","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000695',
  '33333333-0000-0000-0000-000000000102',
  'true_false', 1, 'fr',
  '{"stem": "L''entreprise individuelle possède une personnalité juridique distincte de celle de son propriétaire.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''entreprise individuelle n''a pas de personnalité juridique propre. Elle se confond juridiquement avec la personne de l''entrepreneur. Il n''y a pas de séparation entre le patrimoine personnel et le patrimoine professionnel, ce qui signifie que l''entrepreneur est responsable des dettes de l''entreprise sur ses biens personnels.", "steps": ["L''entreprise individuelle n''a pas de personnalité morale", "Le patrimoine personnel et professionnel sont confondus", "L''entrepreneur individuel est responsable indéfiniment sur ses biens personnels", "Contrairement aux sociétés (SA, SARL) qui ont une personnalité juridique distincte"]}',
  '{"entreprise","individuelle","personnalite_juridique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000696',
  '33333333-0000-0000-0000-000000000102',
  'true_false', 2, 'fr',
  '{"stem": "Le secteur tertiaire regroupe les activités de transformation des matières premières en produits finis.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le secteur tertiaire regroupe les activités de services (commerce, transport, banque, assurance, tourisme, etc.). C''est le secteur secondaire qui concerne la transformation des matières premières en produits finis (industrie, BTP, artisanat de production).", "steps": ["Le secteur tertiaire = les services (commerce, banque, transport, tourisme...)", "Le secteur secondaire = la transformation industrielle", "Le secteur primaire = l''exploitation des ressources naturelles", "La transformation des matières premières relève donc du secteur secondaire, pas tertiaire"]}',
  '{"entreprise","secteur_activite","tertiaire","secondaire","bac_style"}'
);

-- =====================
-- SKILL: enterprise_environment (Environnement de l'entreprise) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000697',
  '33333333-0000-0000-0000-000000000103',
  'mcq', 2, 'fr',
  '{"stem": "Lequel des éléments suivants fait partie du micro-environnement de l''entreprise ?", "choices": ["Les fournisseurs", "La législation fiscale", "Le taux d''inflation", "L''évolution démographique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les fournisseurs font partie du micro-environnement car ils sont en relation directe avec l''entreprise. Le micro-environnement comprend les acteurs avec lesquels l''entreprise entretient des relations directes : clients, fournisseurs, concurrents, intermédiaires et institutions financières. La législation, l''inflation et la démographie relèvent du macro-environnement.", "steps": ["Le micro-environnement = acteurs en relation directe avec l''entreprise", "Les fournisseurs, clients, concurrents font partie du micro-environnement", "La législation fiscale relève de l''environnement juridique (macro)", "Le taux d''inflation relève de l''environnement économique (macro)", "L''évolution démographique relève de l''environnement socioculturel (macro)"]}',
  '{"environnement","micro_environnement","fournisseurs","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000698',
  '33333333-0000-0000-0000-000000000103',
  'mcq', 2, 'fr',
  '{"stem": "Dans l''analyse PESTEL, la lettre « E » (deuxième) correspond à quel type de facteurs ?", "choices": ["Économiques", "Écologiques", "Entrepreneuriaux", "Éducatifs"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans l''acronyme PESTEL, les lettres correspondent à : P = Politique, E = Économique, S = Socioculturel, T = Technologique, E = Écologique (ou Environnemental), L = Légal. La deuxième lettre « E » désigne donc les facteurs Économiques (taux de croissance, inflation, chômage, pouvoir d''achat, etc.).", "steps": ["P = Politique (stabilité gouvernementale, politique fiscale...)", "E = Économique (croissance, inflation, taux de change...)", "S = Socioculturel (démographie, modes de vie, valeurs...)", "T = Technologique (innovations, R&D, brevets...)", "E = Écologique (normes environnementales, développement durable...)", "L = Légal (lois, réglementations, droit du travail...)"]}',
  '{"environnement","PESTEL","macro_environnement","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000699',
  '33333333-0000-0000-0000-000000000103',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de flux circule entre l''entreprise et ses clients lors d''une vente de marchandises ?", "choices": ["Un flux réel (biens) de l''entreprise vers le client et un flux monétaire du client vers l''entreprise", "Uniquement un flux monétaire", "Un flux d''information uniquement", "Un flux réel du client vers l''entreprise"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Lors d''une vente, deux flux circulent en sens inverse : un flux réel (physique) constitué par les marchandises livrées de l''entreprise vers le client, et un flux monétaire (financier) constitué par le paiement du client vers l''entreprise. Ces échanges illustrent les relations entre l''entreprise et son environnement.", "steps": ["L''entreprise livre les marchandises au client = flux réel (physique)", "Le client paie l''entreprise = flux monétaire (financier)", "Les deux flux circulent en sens inverse", "On distingue trois types de flux : réels, monétaires et d''information"]}',
  '{"environnement","flux_economiques","flux_reel","flux_monetaire","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000700',
  '33333333-0000-0000-0000-000000000103',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les parties prenantes suivantes, laquelle est considérée comme une partie prenante interne de l''entreprise ?", "choices": ["Les salariés", "Les fournisseurs", "L''État", "Les concurrents"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les salariés sont des parties prenantes internes car ils travaillent au sein de l''entreprise et participent directement à son fonctionnement. Les parties prenantes internes incluent les dirigeants, les salariés et les actionnaires. Les fournisseurs, l''État et les concurrents sont des parties prenantes externes.", "steps": ["Les parties prenantes (stakeholders) = tous les acteurs ayant un intérêt dans l''entreprise", "Parties prenantes internes : dirigeants, salariés, actionnaires", "Parties prenantes externes : fournisseurs, clients, État, concurrents, banques", "Les salariés contribuent directement à l''activité, ils sont donc internes"]}',
  '{"environnement","parties_prenantes","stakeholders","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000701',
  '33333333-0000-0000-0000-000000000103',
  'numeric', 2, 'fr',
  '{"stem": "L''analyse PESTEL identifie les composantes du macro-environnement de l''entreprise. Combien de dimensions comporte cette analyse ?", "correct_value": 6, "tolerance": 0, "latex": false}',
  '{"text_fr": "L''analyse PESTEL comporte 6 dimensions correspondant aux 6 lettres de l''acronyme : Politique, Économique, Socioculturel, Technologique, Écologique et Légal. Chaque dimension représente un ensemble de facteurs du macro-environnement qui peuvent influencer l''activité de l''entreprise.", "steps": ["P = Politique → 1ère dimension", "E = Économique → 2ème dimension", "S = Socioculturel → 3ème dimension", "T = Technologique → 4ème dimension", "E = Écologique → 5ème dimension", "L = Légal → 6ème dimension", "Total = 6 dimensions"]}',
  '{"environnement","PESTEL","macro_environnement","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000702',
  '33333333-0000-0000-0000-000000000103',
  'true_false', 2, 'fr',
  '{"stem": "Le macro-environnement de l''entreprise comprend les facteurs sur lesquels l''entreprise peut exercer une influence directe.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le macro-environnement est constitué de facteurs globaux (politiques, économiques, socioculturels, technologiques, écologiques et légaux) sur lesquels l''entreprise n''a généralement aucune influence directe. Elle doit s''y adapter. C''est sur le micro-environnement (clients, fournisseurs, concurrents) que l''entreprise peut exercer une certaine influence par ses décisions stratégiques.", "steps": ["Le macro-environnement = facteurs globaux et externes (PESTEL)", "L''entreprise subit le macro-environnement et doit s''y adapter", "Le micro-environnement = acteurs proches (clients, fournisseurs, concurrents)", "L''entreprise peut influencer son micro-environnement par ses actions stratégiques"]}',
  '{"environnement","macro_environnement","influence","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000703',
  '33333333-0000-0000-0000-000000000103',
  'true_false', 2, 'fr',
  '{"stem": "Les flux d''information entre l''entreprise et son environnement comprennent les études de marché, la publicité et les factures.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les flux d''information regroupent tous les échanges de données et de renseignements entre l''entreprise et son environnement. Les études de marché (information entrante sur les besoins des consommateurs), la publicité (information sortante vers les clients potentiels) et les factures (documents d''information sur les transactions) sont tous des exemples de flux d''information.", "steps": ["Les flux d''information = échanges de données entre l''entreprise et son environnement", "Études de marché = flux d''information entrant (de l''environnement vers l''entreprise)", "Publicité = flux d''information sortant (de l''entreprise vers l''environnement)", "Factures = flux d''information lié aux transactions commerciales", "Ces trois éléments sont bien des flux d''information"]}',
  '{"environnement","flux_information","bac_style"}'
);
