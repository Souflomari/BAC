-- ============================================================
-- ECONOMIE & GESTION CONTENT: Strategie et marketing (3 skills, 21 items)
-- Skills:
--   marketing_mix       (33333333-...-107) difficulty 2 — 7 items
--   business_strategy   (33333333-...-108) difficulty 2 — 7 items
--   quality_management   (33333333-...-109) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: marketing_mix (Marketing mix) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000725',
  '33333333-0000-0000-0000-000000000107',
  'mcq', 2, 'fr',
  '{"stem": "Quels sont les 4P du marketing mix ?", "choices": ["Produit, Prix, Place (distribution), Promotion (communication)", "Produit, Personnel, Planification, Profit", "Prix, Positionnement, Publicite, Production", "Promotion, Partenariat, Processus, Performance"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le marketing mix repose sur quatre variables fondamentales appelees les 4P : Product (Produit), Price (Prix), Place (Distribution) et Promotion (Communication). Ces quatre leviers permettent a l''entreprise de definir sa strategie commerciale sur un marche cible.", "steps": ["Produit : caracteristiques, qualite, marque, conditionnement", "Prix : politique tarifaire adoptee", "Place (distribution) : canaux et circuits de distribution", "Promotion (communication) : publicite, promotion des ventes, relations publiques"]}',
  '{"entreprise","marketing","strategie","4P"}'
),
(
  '44444444-0000-0000-0000-000000000726',
  '33333333-0000-0000-0000-000000000107',
  'mcq', 2, 'fr',
  '{"stem": "L''entreprise X lance un nouveau smartphone a un prix eleve pour cibler les consommateurs a fort pouvoir d''achat. Quelle strategie de prix adopte-t-elle ?", "choices": ["Une strategie d''ecremage", "Une strategie de penetration", "Une strategie d''alignement", "Une strategie de dumping"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La strategie d''ecremage consiste a fixer un prix de vente eleve lors du lancement d''un produit afin de cibler un segment de clientele a fort pouvoir d''achat et de maximiser la marge unitaire. Elle est souvent utilisee pour les produits innovants ou de luxe. Le prix est progressivement reduit pour toucher d''autres segments.", "steps": ["Ecremage = prix eleve au lancement", "Objectif : maximiser la marge sur les premiers acheteurs", "Le prix baisse progressivement pour elargir la clientele"]}',
  '{"entreprise","marketing","strategie","prix","ecremage"}'
),
(
  '44444444-0000-0000-0000-000000000727',
  '33333333-0000-0000-0000-000000000107',
  'mcq', 2, 'fr',
  '{"stem": "La segmentation du marche consiste a :", "choices": ["Diviser le marche en groupes homogenes de consommateurs ayant des besoins similaires", "Fixer le prix de vente d''un produit en fonction de la concurrence", "Choisir un seul canal de distribution pour tous les produits", "Reduire les couts de production pour augmenter la marge"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La segmentation consiste a decouper le marche en sous-ensembles (segments) homogenes de consommateurs partageant des caracteristiques ou des comportements d''achat similaires. Elle permet a l''entreprise d''adapter son offre (produit, prix, communication, distribution) aux besoins specifiques de chaque segment.", "steps": ["On identifie des criteres de segmentation (demographiques, geographiques, comportementaux, psychographiques)", "On regroupe les consommateurs en segments homogenes", "On choisit le ou les segments a cibler (ciblage)"]}',
  '{"entreprise","marketing","strategie","segmentation"}'
),
(
  '44444444-0000-0000-0000-000000000728',
  '33333333-0000-0000-0000-000000000107',
  'mcq', 2, 'fr',
  '{"stem": "Dans le cycle de vie d''un produit, a quelle phase les ventes atteignent-elles leur maximum avant de commencer a diminuer ?", "choices": ["La phase de maturite", "La phase de lancement", "La phase de croissance", "La phase de declin"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le cycle de vie d''un produit comprend quatre phases : lancement, croissance, maturite et declin. C''est lors de la phase de maturite que les ventes atteignent leur niveau maximum. Le marche est sature, la concurrence est intense et la croissance des ventes ralentit puis stagne avant d''entamer le declin.", "steps": ["Lancement : le produit est introduit sur le marche, ventes faibles", "Croissance : les ventes augmentent rapidement", "Maturite : les ventes sont maximales mais stagnent", "Declin : les ventes diminuent progressivement"]}',
  '{"entreprise","marketing","strategie","cycle_de_vie"}'
),
(
  '44444444-0000-0000-0000-000000000729',
  '33333333-0000-0000-0000-000000000107',
  'numeric', 2, 'fr',
  '{"stem": "Une entreprise vend un produit 150 DH avec un cout de revient unitaire de 100 DH. Quel est le taux de marge en pourcentage ?", "correct_value": 50, "tolerance": 0, "unit": "%"}',
  '{"text_fr": "Le taux de marge se calcule ainsi : Taux de marge = ((Prix de vente - Cout de revient) / Cout de revient) x 100. Ici : ((150 - 100) / 100) x 100 = 50%. Ce taux mesure la rentabilite du produit par rapport a son cout.", "steps": ["Marge unitaire = Prix de vente - Cout de revient = 150 - 100 = 50 DH", "Taux de marge = (Marge / Cout de revient) x 100", "Taux de marge = (50 / 100) x 100 = 50%"]}',
  '{"entreprise","marketing","strategie","prix","marge"}'
),
(
  '44444444-0000-0000-0000-000000000730',
  '33333333-0000-0000-0000-000000000107',
  'true_false', 2, 'fr',
  '{"statement": "La strategie de penetration consiste a fixer un prix bas pour conquérir rapidement une large part de marche.", "correct_answer": true}',
  '{"text_fr": "La strategie de penetration consiste effectivement a proposer un prix de vente bas lors du lancement d''un produit. L''objectif est de toucher le plus grand nombre de consommateurs possible, de gagner rapidement des parts de marche et de decourager les concurrents potentiels.", "steps": ["Penetration = prix bas au lancement", "Objectif : volume de ventes eleve et parts de marche importantes", "Avantage : dissuade les nouveaux entrants grace aux economies d''echelle"]}',
  '{"entreprise","marketing","strategie","prix","penetration"}'
),
(
  '44444444-0000-0000-0000-000000000731',
  '33333333-0000-0000-0000-000000000107',
  'true_false', 2, 'fr',
  '{"statement": "Le positionnement est la place qu''occupe un produit dans l''esprit des consommateurs par rapport aux produits concurrents.", "correct_answer": true}',
  '{"text_fr": "Le positionnement est bien la perception qu''ont les consommateurs d''un produit ou d''une marque par rapport a la concurrence. Il est defini par l''entreprise a travers ses choix marketing (qualite, prix, image) et se traduit par une place distinctive dans l''esprit du client. Un bon positionnement est clair, attractif et differenciant.", "steps": ["Le positionnement definit l''image voulue par l''entreprise pour son produit", "Il repose sur des criteres de differenciation (qualite, prix, innovation)", "Il doit etre percu clairement par les consommateurs par rapport a la concurrence"]}',
  '{"entreprise","marketing","strategie","positionnement"}'
);

-- =====================
-- SKILL: business_strategy (Strategie d''entreprise) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000732',
  '33333333-0000-0000-0000-000000000108',
  'mcq', 2, 'fr',
  '{"stem": "L''analyse SWOT permet d''identifier :", "choices": ["Les forces, faiblesses, opportunites et menaces de l''entreprise", "Uniquement les forces et faiblesses internes de l''entreprise", "Uniquement les opportunites et menaces de l''environnement", "Les parts de marche de chaque concurrent"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''analyse SWOT (Strengths, Weaknesses, Opportunities, Threats) est un outil de diagnostic strategique qui combine l''analyse interne (forces et faiblesses de l''entreprise) et l''analyse externe (opportunites et menaces de l''environnement). Elle permet de formuler des strategies adaptees a la situation de l''entreprise.", "steps": ["S (Strengths) = Forces internes : avantages concurrentiels, ressources", "W (Weaknesses) = Faiblesses internes : points a ameliorer", "O (Opportunities) = Opportunites externes : tendances favorables du marche", "T (Threats) = Menaces externes : risques lies a l''environnement"]}',
  '{"entreprise","marketing","strategie","SWOT","diagnostic"}'
),
(
  '44444444-0000-0000-0000-000000000733',
  '33333333-0000-0000-0000-000000000108',
  'mcq', 2, 'fr',
  '{"stem": "Selon Michael Porter, quelles sont les trois strategies generiques permettant d''obtenir un avantage concurrentiel ?", "choices": ["Domination par les couts, differenciation et focalisation (niche)", "Innovation, diversification et internationalisation", "Integration verticale, integration horizontale et externalisation", "Croissance interne, croissance externe et alliance strategique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Michael Porter a identifie trois strategies generiques : la domination par les couts (produire moins cher que les concurrents), la differenciation (proposer une offre unique perçue comme superieure) et la focalisation ou concentration (cibler un segment etroit du marche). Chaque strategie vise a creer un avantage concurrentiel durable.", "steps": ["Domination par les couts : proposer les prix les plus bas du marche", "Differenciation : offrir un produit unique a valeur ajoutee superieure", "Focalisation (niche) : se concentrer sur un segment specifique du marche"]}',
  '{"entreprise","marketing","strategie","Porter","avantage_concurrentiel"}'
),
(
  '44444444-0000-0000-0000-000000000734',
  '33333333-0000-0000-0000-000000000108',
  'mcq', 2, 'fr',
  '{"stem": "La strategie de diversification consiste pour une entreprise a :", "choices": ["Developper de nouveaux produits sur de nouveaux marches", "Renforcer sa position sur son marche actuel avec ses produits existants", "Acheter ses fournisseurs ou ses distributeurs", "Reduire sa gamme de produits pour se specialiser"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La diversification est une strategie de croissance par laquelle l''entreprise se lance dans de nouvelles activites (nouveaux produits et/ou nouveaux marches) differentes de son metier d''origine. Elle peut etre liee (synergie avec l''activite existante) ou conglomerale (aucun lien avec l''activite initiale). C''est la strategie la plus risquee selon la matrice d''Ansoff.", "steps": ["La diversification implique de nouveaux produits sur de nouveaux marches", "Elle se distingue de la specialisation (rester sur le meme metier)", "Matrice d''Ansoff : penetration, developpement produit, developpement marche, diversification"]}',
  '{"entreprise","marketing","strategie","diversification","Ansoff"}'
),
(
  '44444444-0000-0000-0000-000000000735',
  '33333333-0000-0000-0000-000000000108',
  'mcq', 2, 'fr',
  '{"stem": "L''integration verticale amont signifie que l''entreprise :", "choices": ["Prend le controle de ses fournisseurs ou de ses sources d''approvisionnement", "Prend le controle de ses distributeurs ou de ses clients", "Fusionne avec un concurrent direct", "Se retire d''un marche non rentable"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''integration verticale amont consiste pour une entreprise a integrer les activites situees en amont de sa chaine de valeur, c''est-a-dire a prendre le controle de ses fournisseurs ou de ses sources de matieres premieres. L''integration aval, a l''inverse, consiste a controler la distribution. Ces strategies visent a mieux maitriser les couts, la qualite et les approvisionnements.", "steps": ["Integration amont : controle des fournisseurs (en remontant la chaine)", "Integration aval : controle des distributeurs (en descendant la chaine)", "Integration horizontale : rachat de concurrents au meme niveau de la filiere"]}',
  '{"entreprise","marketing","strategie","integration","verticale"}'
),
(
  '44444444-0000-0000-0000-000000000736',
  '33333333-0000-0000-0000-000000000108',
  'numeric', 2, 'fr',
  '{"stem": "Le modele des 5 forces concurrentielles de Porter identifie combien de forces qui determinent l''intensite concurrentielle d''un secteur ?", "correct_value": 5, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Le modele de Michael Porter identifie 5 forces concurrentielles qui determinent l''attractivite et l''intensite de la concurrence dans un secteur : la rivalite entre concurrents existants, la menace de nouveaux entrants, la menace de produits de substitution, le pouvoir de negociation des fournisseurs et le pouvoir de negociation des clients.", "steps": ["Force 1 : Rivalite entre concurrents existants", "Force 2 : Menace de nouveaux entrants", "Force 3 : Menace de produits de substitution", "Force 4 : Pouvoir de negociation des fournisseurs", "Force 5 : Pouvoir de negociation des clients"]}',
  '{"entreprise","marketing","strategie","Porter","5_forces"}'
),
(
  '44444444-0000-0000-0000-000000000737',
  '33333333-0000-0000-0000-000000000108',
  'true_false', 2, 'fr',
  '{"statement": "La strategie de specialisation consiste pour une entreprise a concentrer ses efforts sur un seul metier ou domaine d''activite.", "correct_answer": true}',
  '{"text_fr": "La strategie de specialisation consiste effectivement a concentrer l''ensemble des ressources de l''entreprise sur un seul domaine d''activite strategique (DAS). L''objectif est de developper un savoir-faire specifique et un avantage concurrentiel fort sur ce metier. Elle s''oppose a la diversification.", "steps": ["Specialisation = concentration sur un seul metier", "Avantage : maitrise du metier, expertise reconnue, economies d''echelle", "Risque : dependance vis-a-vis d''un seul marche"]}',
  '{"entreprise","marketing","strategie","specialisation"}'
),
(
  '44444444-0000-0000-0000-000000000738',
  '33333333-0000-0000-0000-000000000108',
  'true_false', 2, 'fr',
  '{"statement": "Le diagnostic externe analyse les forces et les faiblesses internes de l''entreprise.", "correct_answer": false}',
  '{"text_fr": "Le diagnostic externe analyse l''environnement de l''entreprise pour identifier les opportunites et les menaces, et non les forces et faiblesses. Ce sont les facteurs politiques, economiques, sociaux, technologiques (analyse PESTEL) et les forces concurrentielles (modele de Porter) qui sont etudies. Le diagnostic interne, quant a lui, analyse les forces et faiblesses de l''entreprise.", "steps": ["Diagnostic externe = analyse de l''environnement (opportunites et menaces)", "Diagnostic interne = analyse de l''entreprise (forces et faiblesses)", "L''ensemble forme le diagnostic strategique (SWOT)"]}',
  '{"entreprise","marketing","strategie","diagnostic","externe"}'
);

-- =====================
-- SKILL: quality_management (Qualite et innovation) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000739',
  '33333333-0000-0000-0000-000000000109',
  'mcq', 2, 'fr',
  '{"stem": "La norme ISO 9001 est une norme internationale relative a :", "choices": ["Le systeme de management de la qualite", "La protection de l''environnement", "La securite des travailleurs", "La responsabilite sociale des entreprises"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La norme ISO 9001 est une norme internationale qui definit les exigences pour un systeme de management de la qualite (SMQ). Elle vise a garantir que l''entreprise fournit des produits et services conformes aux attentes des clients et aux exigences reglementaires, tout en ameliorant en permanence ses processus.", "steps": ["ISO 9001 = norme de management de la qualite", "Elle repose sur l''amelioration continue et la satisfaction client", "ISO 14001 concerne l''environnement, a ne pas confondre"]}',
  '{"entreprise","marketing","strategie","qualite","ISO_9001"}'
),
(
  '44444444-0000-0000-0000-000000000740',
  '33333333-0000-0000-0000-000000000109',
  'mcq', 2, 'fr',
  '{"stem": "L''innovation de procede consiste a :", "choices": ["Introduire de nouvelles methodes de production ou de distribution", "Lancer un produit entierement nouveau sur le marche", "Modifier la structure organisationnelle de l''entreprise", "Changer le logo et l''identite visuelle de la marque"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''innovation de procede (ou de processus) consiste a mettre en oeuvre de nouvelles methodes de production, de logistique ou de distribution. Elle vise a ameliorer l''efficacite, reduire les couts ou ameliorer la qualite sans necessairement modifier le produit lui-meme. Elle se distingue de l''innovation de produit (nouveau bien ou service) et de l''innovation organisationnelle (nouvelles pratiques de gestion).", "steps": ["Innovation de procede = nouvelles methodes de fabrication ou de distribution", "Innovation de produit = nouveau bien ou service", "Innovation organisationnelle = nouvelle organisation du travail ou des relations externes"]}',
  '{"entreprise","marketing","strategie","innovation","procede"}'
),
(
  '44444444-0000-0000-0000-000000000741',
  '33333333-0000-0000-0000-000000000109',
  'mcq', 2, 'fr',
  '{"stem": "La demarche qualite repose sur le principe d''amelioration continue. Quel outil illustre ce principe par un cycle en 4 etapes ?", "choices": ["La roue de Deming (PDCA)", "La matrice BCG", "Le diagramme de Gantt", "L''analyse PESTEL"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La roue de Deming, aussi appelee cycle PDCA (Plan-Do-Check-Act), est un outil fondamental de la demarche qualite. Il comprend 4 etapes : Planifier (definir les objectifs), Realiser (mettre en oeuvre), Verifier (controler les resultats) et Agir (corriger et ameliorer). Ce cycle se repete en continu pour une amelioration permanente.", "steps": ["Plan (Planifier) : definir les objectifs et les moyens", "Do (Realiser) : mettre en oeuvre les actions prevues", "Check (Verifier) : mesurer les resultats par rapport aux objectifs", "Act (Agir) : corriger les ecarts et ameliorer le processus"]}',
  '{"entreprise","marketing","strategie","qualite","PDCA","Deming"}'
),
(
  '44444444-0000-0000-0000-000000000742',
  '33333333-0000-0000-0000-000000000109',
  'mcq', 2, 'fr',
  '{"stem": "La R&D (Recherche et Developpement) a pour objectif principal de :", "choices": ["Creer de nouvelles connaissances et les transformer en produits ou procedes innovants", "Recruter du personnel qualifie pour l''entreprise", "Analyser les resultats financiers de l''exercice comptable", "Gerer les relations avec les fournisseurs"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La Recherche et Developpement (R&D) regroupe l''ensemble des activites visant a produire de nouvelles connaissances (recherche fondamentale et appliquee) et a les transformer en applications concretes : nouveaux produits, nouveaux procedes ou amelioration de l''existant. La R&D est un facteur cle de competitivite et d''innovation pour l''entreprise.", "steps": ["La recherche fondamentale vise a accroitre les connaissances sans application immediate", "La recherche appliquee vise a resoudre des problemes pratiques", "Le developpement transforme les resultats de la recherche en produits ou procedes"]}',
  '{"entreprise","marketing","strategie","innovation","R&D"}'
),
(
  '44444444-0000-0000-0000-000000000743',
  '33333333-0000-0000-0000-000000000109',
  'numeric', 2, 'fr',
  '{"stem": "Le cycle PDCA (roue de Deming) comporte combien d''etapes ?", "correct_value": 4, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Le cycle PDCA comporte 4 etapes : Plan (Planifier), Do (Realiser), Check (Verifier) et Act (Agir). Ce cycle est au coeur de la demarche d''amelioration continue de la qualite. Chaque tour de roue permet de progresser et de corriger les dysfonctionnements identifies.", "steps": ["P = Plan (Planifier les actions et fixer les objectifs)", "D = Do (Realiser les actions planifiees)", "C = Check (Verifier les resultats obtenus)", "A = Act (Agir pour corriger et ameliorer)"]}',
  '{"entreprise","marketing","strategie","qualite","PDCA"}'
),
(
  '44444444-0000-0000-0000-000000000744',
  '33333333-0000-0000-0000-000000000109',
  'true_false', 2, 'fr',
  '{"statement": "L''innovation organisationnelle concerne uniquement l''introduction de nouveaux produits sur le marche.", "correct_answer": false}',
  '{"text_fr": "L''innovation organisationnelle ne concerne pas les produits mais la mise en place de nouvelles methodes d''organisation du travail, de nouvelles pratiques de gestion ou de nouvelles formes de relations avec les partenaires exterieurs. Par exemple, l''introduction du teletravail, d''une nouvelle structure hierarchique ou d''un nouveau mode de gestion des stocks constitue une innovation organisationnelle.", "steps": ["Innovation organisationnelle = nouvelles methodes d''organisation ou de gestion", "Elle se distingue de l''innovation de produit (nouveau bien ou service)", "Exemples : teletravail, management participatif, supply chain management"]}',
  '{"entreprise","marketing","strategie","innovation","organisationnelle"}'
),
(
  '44444444-0000-0000-0000-000000000745',
  '33333333-0000-0000-0000-000000000109',
  'true_false', 2, 'fr',
  '{"statement": "La certification ISO 9001 garantit la qualite des produits fabriques par l''entreprise.", "correct_answer": false}',
  '{"text_fr": "La certification ISO 9001 ne garantit pas directement la qualite des produits eux-memes. Elle certifie que l''entreprise a mis en place un systeme de management de la qualite (SMQ) conforme aux exigences de la norme, c''est-a-dire des processus organises pour maitriser la qualite et satisfaire les clients. C''est le systeme de gestion qui est certifie, pas le produit final.", "steps": ["ISO 9001 certifie le systeme de management, pas les produits", "Elle atteste que l''entreprise suit des processus rigoureux de gestion de la qualite", "La certification produit releve d''autres normes specifiques (marquage CE, NF, etc.)"]}',
  '{"entreprise","marketing","strategie","qualite","ISO_9001","certification"}'
);
