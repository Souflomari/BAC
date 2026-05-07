-- ============================================================
-- ENGINEERING CONTENT: Analyse fonctionnelle (2 skills, 14 items)
-- Skills:
--   needs_analysis (33333333-...-045) difficulty 2 — 7 items
--   sadt_fast      (33333333-...-046) difficulty 2 — 7 items
-- Items: 44444444-0000-0000-0000-000000000291 → ...304
-- ============================================================

-- =====================
-- SKILL: needs_analysis (Analyse du besoin et CdCF) — 7 items
-- Covers: diagramme bête à cornes, CdCF, diagramme pieuvre,
--         critères d'appréciation et niveaux, expression du besoin,
--         validation du besoin, fonctions principales vs contraintes
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 291: diagramme bête à cornes — mcq
(
  '44444444-0000-0000-0000-000000000291',
  '33333333-0000-0000-0000-000000000045',
  'mcq', 2, 'fr',
  '{"stem": "Le diagramme « bête à cornes » permet de répondre à trois questions fondamentales. Laquelle de ces questions n''en fait PAS partie ?", "choices": ["Comment le produit fonctionne-t-il ?", "À qui le produit rend-il service ?", "Sur quoi le produit agit-il ?", "Dans quel but le produit existe-t-il ?"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le diagramme bête à cornes répond à trois questions : À qui rend-il service ? Sur quoi agit-il ? Dans quel but ? La question « Comment fonctionne-t-il ? » relève de l''analyse fonctionnelle interne (FAST, SADT), pas de l''expression du besoin.", "steps": ["Les 3 questions du diagramme bête à cornes :", "1. À qui le produit rend-il service ? → l''utilisateur", "2. Sur quoi agit-il ? → la matière d''œuvre", "3. Dans quel but ? → le besoin à satisfaire", "« Comment fonctionne-t-il ? » n''en fait pas partie"]}',
  '{"analyse_fonctionnelle","bete_a_cornes","bac_style"}'
),
-- 292: cahier des charges fonctionnel (CdCF) — mcq
(
  '44444444-0000-0000-0000-000000000292',
  '33333333-0000-0000-0000-000000000045',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le rôle principal du Cahier des Charges Fonctionnel (CdCF) ?", "choices": ["Exprimer le besoin en termes de fonctions de service et de contraintes", "Décrire les solutions techniques retenues pour le produit", "Présenter le plan de fabrication détaillé du produit", "Lister les composants nécessaires à l''assemblage du produit"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le CdCF est un document contractuel qui exprime le besoin du demandeur en termes de fonctions de service et de contraintes, sans imposer de solution technique. Il définit le « quoi » et non le « comment ».", "steps": ["Le CdCF traduit le besoin en fonctions de service", "Il précise les critères d''appréciation et les niveaux pour chaque fonction", "Il ne décrit pas les solutions techniques (c''est le rôle du cahier des charges technique)", "Il est rédigé du point de vue de l''utilisateur"]}',
  '{"analyse_fonctionnelle","cdcf","bac_style"}'
),
-- 293: diagramme pieuvre — mcq
(
  '44444444-0000-0000-0000-000000000293',
  '33333333-0000-0000-0000-000000000045',
  'mcq', 2, 'fr',
  '{"stem": "Dans un diagramme pieuvre, une fonction qui relie le produit à deux éléments du milieu extérieur est appelée :", "choices": ["Fonction principale (FP)", "Fonction contrainte (FC)", "Fonction technique (FT)", "Fonction élémentaire (FE)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans le diagramme pieuvre, une fonction principale (FP) relie le produit à deux éléments du milieu extérieur : elle traduit la raison d''être du produit. Une fonction contrainte (FC) ne relie le produit qu''à un seul élément du milieu extérieur.", "steps": ["Le diagramme pieuvre représente les interactions entre le produit et son milieu extérieur", "Fonction principale (FP) : relie le produit à DEUX éléments du milieu extérieur", "Fonction contrainte (FC) : relie le produit à UN SEUL élément du milieu extérieur", "La FP exprime le service rendu par le produit"]}',
  '{"analyse_fonctionnelle","diagramme_pieuvre","bac_style"}'
),
-- 294: critères d'appréciation et niveaux — mcq
(
  '44444444-0000-0000-0000-000000000294',
  '33333333-0000-0000-0000-000000000045',
  'mcq', 3, 'fr',
  '{"stem": "Dans un CdCF, pour la fonction « Permettre à l''utilisateur de se déplacer à une vitesse suffisante », le critère d''appréciation est « vitesse maximale » et le niveau est « 25 km/h ». Que représente la flexibilité associée ?", "choices": ["La marge de tolérance acceptée autour du niveau (ex. ± 2 km/h)", "La vitesse minimale que le produit doit atteindre", "Le coût maximal de la fonction", "Le nombre d''utilisateurs pouvant utiliser le produit simultanément"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La flexibilité représente la marge de tolérance (ou l''écart acceptable) autour du niveau spécifié pour un critère d''appréciation. Elle indique le degré de négociabilité du niveau.", "steps": ["Critère d''appréciation : caractère retenu pour évaluer la fonction (ici : vitesse maximale)", "Niveau : valeur chiffrée du critère (ici : 25 km/h)", "Flexibilité : marge de tolérance autour du niveau (ex. classe F1 = ± 2 km/h)", "Elle traduit le caractère plus ou moins impératif du niveau"]}',
  '{"analyse_fonctionnelle","criteres_niveaux","bac_style"}'
),
-- 295: expression du besoin — true_false
(
  '44444444-0000-0000-0000-000000000295',
  '33333333-0000-0000-0000-000000000045',
  'true_false', 2, 'fr',
  '{"stem": "L''analyse fonctionnelle externe s''intéresse aux solutions techniques internes du produit.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''analyse fonctionnelle externe s''intéresse aux fonctions de service du produit vis-à-vis de son milieu extérieur, sans se préoccuper des solutions techniques internes. C''est l''analyse fonctionnelle interne (FAST, SADT) qui décrit les solutions techniques.", "steps": ["L''analyse fonctionnelle externe étudie les relations produit / milieu extérieur", "Elle identifie les fonctions de service (FP et FC)", "Elle ne décrit pas le fonctionnement interne du produit", "L''analyse fonctionnelle interne (FAST, SADT) traite des solutions techniques"]}',
  '{"analyse_fonctionnelle","expression_besoin","bac_style"}'
),
-- 296: validation du besoin — true_false
(
  '44444444-0000-0000-0000-000000000296',
  '33333333-0000-0000-0000-000000000045',
  'true_false', 2, 'fr',
  '{"stem": "Pour valider un besoin, on doit vérifier que le besoin risque de disparaître ou d''évoluer dans un avenir proche.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La validation du besoin consiste à se poser trois questions : Pourquoi le besoin existe-t-il ? Qu''est-ce qui pourrait le faire évoluer ? Qu''est-ce qui pourrait le faire disparaître ? Si le besoin est stable et durable, il est validé.", "steps": ["Validation du besoin : 3 questions de contrôle", "1. Pourquoi le besoin existe-t-il ? (origine du besoin)", "2. Qu''est-ce qui pourrait le faire évoluer ? (risque d''évolution)", "3. Qu''est-ce qui pourrait le faire disparaître ? (risque de disparition)", "Vérifier ces risques fait bien partie de la démarche de validation"]}',
  '{"analyse_fonctionnelle","validation_besoin","bac_style"}'
),
-- 297: fonctions principales vs contraintes — numeric
(
  '44444444-0000-0000-0000-000000000297',
  '33333333-0000-0000-0000-000000000045',
  'numeric', 2, 'fr',
  '{"stem": "Un diagramme pieuvre d''un système automatisé comporte 5 éléments du milieu extérieur. On recense 2 fonctions principales (FP) et 3 fonctions contraintes (FC). Combien de fonctions de service ce produit possède-t-il au total ?", "correct_value": 5, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les fonctions de service regroupent les fonctions principales (FP) et les fonctions contraintes (FC). Le nombre total est donc 2 + 3 = 5 fonctions de service.", "steps": ["Fonctions de service = FP + FC", "FP = 2 (relient le produit à deux éléments du milieu extérieur)", "FC = 3 (relient le produit à un seul élément du milieu extérieur)", "Total = 2 + 3 = 5 fonctions de service"]}',
  '{"analyse_fonctionnelle","fonctions_service","bac_style"}'
);

-- =====================
-- SKILL: sadt_fast (SADT, FAST et diagrammes) — 7 items
-- Covers: SADT niveau A-0, SADT niveau A0, diagramme FAST,
--         flux matière/énergie/information, lecture et complétion SADT,
--         identification fonctions techniques, lien externe/interne
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 298: SADT niveau A-0 — mcq
(
  '44444444-0000-0000-0000-000000000298',
  '33333333-0000-0000-0000-000000000046',
  'mcq', 2, 'fr',
  '{"stem": "Dans un diagramme SADT de niveau A-0, quel élément représente la fonction globale du système ?", "choices": ["Le bloc fonctionnel (actigramme) central", "La flèche d''énergie à gauche", "La flèche de sortie à droite", "La flèche de contrôle en haut"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Au niveau A-0 du SADT, le bloc fonctionnel central (actigramme) représente la fonction globale du système. Les flèches entrantes à gauche représentent la matière d''œuvre entrante, celles en haut les données de contrôle, celles en bas l''énergie ou le support, et celles en sortie à droite la matière d''œuvre sortante.", "steps": ["Le SADT A-0 est le niveau le plus général du système", "Le bloc central porte la fonction globale (verbe à l''infinitif)", "Entrées (gauche) : matière d''œuvre entrante", "Sorties (droite) : matière d''œuvre sortante", "Contrôle (haut) : données de contrôle / consignes", "Mécanisme (bas) : support physique / énergie"]}',
  '{"analyse_fonctionnelle","sadt","niveau_a0","bac_style"}'
),
-- 299: SADT — flux entrée/sortie — mcq
(
  '44444444-0000-0000-0000-000000000299',
  '33333333-0000-0000-0000-000000000046',
  'mcq', 2, 'fr',
  '{"stem": "Sur un actigramme SADT, les flèches entrant par la gauche représentent :", "choices": ["La matière d''œuvre entrante", "Les données de contrôle", "L''énergie d''alimentation", "Les comptes rendus de fonctionnement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans la notation SADT, les flèches entrant par la gauche représentent la matière d''œuvre entrante (ce sur quoi le système agit). Les données de contrôle entrent par le haut, l''énergie et le support par le bas, et les sorties (matière d''œuvre sortante) partent vers la droite.", "steps": ["Convention SADT pour les flèches :", "Gauche → Matière d''œuvre entrante (inputs)", "Droite → Matière d''œuvre sortante (outputs)", "Haut → Données de contrôle (contraintes, consignes)", "Bas → Mécanisme / support (énergie, processeur)"]}',
  '{"analyse_fonctionnelle","sadt","flux","bac_style"}'
),
-- 300: SADT niveau A0 — mcq
(
  '44444444-0000-0000-0000-000000000300',
  '33333333-0000-0000-0000-000000000046',
  'mcq', 3, 'fr',
  '{"stem": "Le passage du niveau A-0 au niveau A0 dans un diagramme SADT consiste à :", "choices": ["Décomposer la fonction globale en sous-fonctions", "Ajouter de nouveaux éléments du milieu extérieur", "Remplacer la matière d''œuvre par une solution technique", "Supprimer les données de contrôle pour simplifier le diagramme"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le passage de A-0 à A0 est une décomposition fonctionnelle : la fonction globale du système est décomposée en plusieurs sous-fonctions (A1, A2, A3…) reliées par des flux internes. Les éléments du milieu extérieur et les flux globaux restent les mêmes.", "steps": ["A-0 : une seule boîte = fonction globale", "A0 : décomposition en sous-fonctions A1, A2, A3…", "Les flux entre sous-fonctions sont des flux internes", "Les entrées/sorties globales du A-0 se retrouvent dans le A0", "C''est une analyse descendante (top-down)"]}',
  '{"analyse_fonctionnelle","sadt","decomposition","bac_style"}'
),
-- 301: diagramme FAST — mcq
(
  '44444444-0000-0000-0000-000000000301',
  '33333333-0000-0000-0000-000000000046',
  'mcq', 2, 'fr',
  '{"stem": "Dans un diagramme FAST, la lecture se fait de gauche à droite. En partant d''une fonction de service, on aboutit à :", "choices": ["Des solutions techniques (composants ou procédés)", "Des éléments du milieu extérieur", "Des critères d''appréciation", "Des données de contrôle"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le diagramme FAST (Function Analysis System Technique) part d''une fonction de service (à gauche) et la décompose progressivement en fonctions techniques, jusqu''à aboutir aux solutions techniques concrètes (composants, procédés) à droite.", "steps": ["Lecture FAST : de gauche à droite", "Gauche : fonction de service (Pourquoi ?)", "Centre : fonctions techniques (Comment ?)", "Droite : solutions techniques (composants, procédés)", "Question « Pourquoi ? » = sens inverse (droite vers gauche)", "Question « Comment ? » = sens normal (gauche vers droite)"]}',
  '{"analyse_fonctionnelle","fast","bac_style"}'
),
-- 302: flux matière/énergie/information — true_false
(
  '44444444-0000-0000-0000-000000000302',
  '33333333-0000-0000-0000-000000000046',
  'true_false', 2, 'fr',
  '{"stem": "Dans un diagramme SADT, les données de contrôle (flèches du haut) peuvent inclure des consignes de l''utilisateur et des informations provenant de capteurs.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les données de contrôle (flèches entrant par le haut dans un actigramme SADT) regroupent toutes les informations qui pilotent ou contraignent le fonctionnement du système : consignes de l''utilisateur, signaux de capteurs, paramètres de réglage, normes, etc.", "steps": ["Les données de contrôle (W) entrent par le haut de l''actigramme", "Elles incluent : consignes utilisateur, signaux capteurs, paramètres de réglage", "Elles conditionnent le déclenchement ou la régulation de la fonction", "Elles se distinguent de la matière d''œuvre (entrée par la gauche)"]}',
  '{"analyse_fonctionnelle","sadt","controle","bac_style"}'
),
-- 303: identification fonctions techniques — true_false
(
  '44444444-0000-0000-0000-000000000303',
  '33333333-0000-0000-0000-000000000046',
  'true_false', 2, 'fr',
  '{"stem": "Le diagramme FAST permet de relier une fonction de service à ses fonctions techniques en répondant à la question « Comment ? ».", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le diagramme FAST se lit de gauche à droite en répondant à la question « Comment cette fonction est-elle réalisée ? ». Chaque fonction de service est décomposée en fonctions techniques, puis en solutions constructives.", "steps": ["FAST : Function Analysis System Technique", "De gauche à droite : « Comment ? » (décomposition)", "De droite à gauche : « Pourquoi ? » (justification)", "Fonction de service → Fonctions techniques → Solutions techniques"]}',
  '{"analyse_fonctionnelle","fast","fonctions_techniques","bac_style"}'
),
-- 304: lien analyse externe / interne — numeric
(
  '44444444-0000-0000-0000-000000000304',
  '33333333-0000-0000-0000-000000000046',
  'numeric', 2, 'fr',
  '{"stem": "Un diagramme SADT de niveau A0 décompose la fonction globale en 4 sous-fonctions (A1, A2, A3, A4). On identifie 3 flux internes reliant ces sous-fonctions entre elles. Combien de boîtes fonctionnelles le diagramme A0 contient-il ?", "correct_value": 4, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le niveau A0 contient autant de boîtes fonctionnelles que de sous-fonctions identifiées dans la décomposition de la fonction globale. Ici, les 4 sous-fonctions A1, A2, A3 et A4 donnent 4 boîtes.", "steps": ["Le niveau A0 décompose la fonction globale de A-0", "Chaque sous-fonction (A1, A2, A3, A4) correspond à une boîte", "Nombre de boîtes = nombre de sous-fonctions = 4", "Les 3 flux internes relient ces boîtes entre elles mais ne changent pas leur nombre"]}',
  '{"analyse_fonctionnelle","sadt","niveau_a0","bac_style"}'
);
