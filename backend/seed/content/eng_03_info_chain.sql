-- ============================================================
-- ENGINEERING CONTENT: Chaine d'information (2 skills, 14 items)
-- Topic: Chaine d'information
-- Skills:
--   sensors          (33333333-...-049) difficulty 2 — 7 items
--   grafcet          (33333333-...-050) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: sensors (Capteurs et acquisition) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000319',
  '33333333-0000-0000-0000-000000000049',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de capteur delivre un signal qui ne peut prendre que deux etats (0 ou 1) ?", "choices": ["Capteur TOR (tout ou rien)", "Capteur analogique", "Capteur numerique", "Capteur proportionnel"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un capteur TOR (tout ou rien) delivre un signal logique binaire : soit 0 (absence de la grandeur detectee) soit 1 (presence de la grandeur detectee). Exemples : detecteur de fin de course, capteur de proximite inductif utilise en mode TOR.", "steps": ["Un capteur TOR delivre un signal binaire (0 ou 1)", "Un capteur analogique delivre un signal continu proportionnel a la grandeur mesuree", "Un capteur numerique delivre un signal code sur plusieurs bits", "Le capteur TOR est le plus simple des trois types"]}',
  '{"capteurs","tor","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000320',
  '33333333-0000-0000-0000-000000000049',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les caracteristiques suivantes d''un capteur, laquelle definit la plus petite variation de la grandeur physique que le capteur peut detecter ?", "choices": ["La resolution", "L''etendue de mesure", "La sensibilite", "La linearite"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La resolution d''un capteur est la plus petite variation de la grandeur mesuree qu''il est capable de detecter. L''etendue de mesure est la plage entre la valeur minimale et maximale mesurable. La sensibilite est le rapport entre la variation du signal de sortie et la variation de la grandeur d''entree.", "steps": ["La resolution est la plus petite variation detectable par le capteur", "L''etendue de mesure (EM) = valeur max - valeur min de la grandeur mesurable", "La sensibilite S = variation de sortie / variation d''entree", "La linearite indique si la relation entree-sortie est proportionnelle"]}',
  '{"capteurs","caracteristiques","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000321',
  '33333333-0000-0000-0000-000000000049',
  'numeric', 2, 'fr',
  '{"stem": "Un convertisseur analogique-numerique (CAN) a une pleine echelle Pe = 5 V et un nombre de bits n = 8. Calculer la resolution q (en mV) de ce CAN.", "correct_value": 19.53, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "La resolution (quantum) d''un CAN est q = Pe / 2^n. Avec Pe = 5 V et n = 8 bits : q = 5 / 2^8 = 5 / 256 = 0,01953 V = 19,53 mV.", "steps": ["Formule : q = Pe / 2^n", "2^8 = 256", "q = 5 / 256 = 0,01953 V", "q = 19,53 mV"]}',
  '{"can","resolution","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000322',
  '33333333-0000-0000-0000-000000000049',
  'numeric', 3, 'fr',
  '{"stem": "Un CAN de 10 bits a une pleine echelle Pe = 3,3 V. Calculer la resolution q (en mV) de ce convertisseur.", "correct_value": 3.22, "tolerance": 0.05, "latex": true}',
  '{"text_fr": "La resolution d''un CAN est q = Pe / 2^n. Avec Pe = 3,3 V et n = 10 bits : q = 3,3 / 2^{10} = 3,3 / 1024 = 0,003223 V = 3,22 mV.", "steps": ["Formule : q = Pe / 2^n", "2^{10} = 1024", "q = 3,3 / 1024 = 0,003223 V", "q = 3,22 mV"]}',
  '{"can","resolution","10_bits","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000323',
  '33333333-0000-0000-0000-000000000049',
  'true_false', 2, 'fr',
  '{"stem": "Un capteur de temperature de type thermocouple est un capteur analogique actif : il genere directement une tension electrique proportionnelle a la temperature sans alimentation externe.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Un thermocouple est un capteur actif qui genere une force electromotrice (f.e.m.) par effet Seebeck. Cette tension est proportionnelle a la difference de temperature entre la jonction de mesure (soudure chaude) et la jonction de reference (soudure froide). Il ne necessite pas d''alimentation externe.", "steps": ["Un thermocouple fonctionne par effet Seebeck", "Il genere une f.e.m. proportionnelle a la difference de temperature", "C''est un capteur actif car il produit de l''energie electrique", "Contrairement a un capteur passif (ex : thermistance) qui necessite une alimentation"]}',
  '{"capteurs","thermocouple","actif","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000324',
  '33333333-0000-0000-0000-000000000049',
  'mcq', 3, 'fr',
  '{"stem": "Un CAN 8 bits convertit une tension analogique de 3,5 V avec une pleine echelle Pe = 5 V. Quelle est la valeur numerique N (en decimal) correspondante ?", "choices": ["179", "256", "128", "200"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La valeur numerique est N = V / q avec q = Pe / 2^n. q = 5 / 256 = 0,01953 V. N = 3,5 / 0,01953 = 179,2. On arrondit a l''entier inferieur : N = 179.", "steps": ["q = Pe / 2^n = 5 / 256 = 0,01953 V", "N = V / q = 3,5 / 0,01953", "N = 179,2", "Le CAN arrondit a l''entier inferieur : N = 179"]}',
  '{"can","conversion","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000325',
  '33333333-0000-0000-0000-000000000049',
  'true_false', 2, 'fr',
  '{"stem": "Un codeur incremental est un capteur de position qui delivre un signal numerique permettant de mesurer un deplacement relatif.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Un codeur incremental delivre des impulsions a chaque increment de deplacement (angulaire ou lineaire). Il permet de mesurer un deplacement relatif par comptage d''impulsions. Pour connaitre la position absolue, il faut effectuer une procedure d''initialisation (prise d''origine). A la difference du codeur absolu qui donne directement la position absolue.", "steps": ["Un codeur incremental delivre des impulsions proportionnelles au deplacement", "Il mesure un deplacement relatif (et non une position absolue)", "Le nombre d''impulsions comptees donne le deplacement effectue", "Un codeur absolu, en revanche, donne directement la position absolue"]}',
  '{"capteurs","codeur_incremental","bac_style"}'
);

-- =====================
-- SKILL: grafcet (GRAFCET et logique sequentielle) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000326',
  '33333333-0000-0000-0000-000000000050',
  'mcq', 3, 'fr',
  '{"stem": "Dans un GRAFCET, quel element represente une condition logique qui doit etre remplie pour passer d''une etape a la suivante ?", "choices": ["Une receptivite (transition)", "Une action", "Une etape initiale", "Une divergence en ET"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une receptivite est la condition logique (booleenne) associee a une transition. Elle doit etre vraie pour que le franchissement de la transition soit possible (a condition que l''etape amont soit active). Les actions sont les operations effectuees lorsqu''une etape est active.", "steps": ["La receptivite est une condition logique associee a une transition", "Elle est notee a cote de la barre de transition", "Le franchissement necessite : etape amont active ET receptivite vraie", "Les actions sont associees aux etapes, pas aux transitions"]}',
  '{"grafcet","receptivite","transition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000327',
  '33333333-0000-0000-0000-000000000050',
  'mcq', 3, 'fr',
  '{"stem": "Dans un GRAFCET, l''etape initiale est representee par :", "choices": ["Un carre a double contour", "Un carre a simple contour", "Un cercle", "Un losange"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''etape initiale est representee par un carre (ou rectangle) a double contour. Elle est active au demarrage du systeme (situation initiale). Les etapes ordinaires sont representees par un carre a simple contour. L''etape initiale est numerotee generalement 0 ou 1.", "steps": ["L''etape initiale a un double contour (carre dans un carre)", "Elle est active des la mise en marche du systeme", "Les etapes ordinaires ont un simple contour", "Il y a au moins une etape initiale dans chaque GRAFCET"]}',
  '{"grafcet","etape_initiale","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000328',
  '33333333-0000-0000-0000-000000000050',
  'true_false', 3, 'fr',
  '{"stem": "Une divergence en ET dans un GRAFCET permet d''activer simultanement plusieurs sequences en parallele.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Une divergence en ET (representee par un double trait horizontal) permet de lancer simultanement plusieurs branches paralleles. Toutes les etapes situees immediatement apres la divergence sont activees en meme temps lorsque la transition est franchie. La synchronisation des branches se fait par une convergence en ET.", "steps": ["La divergence en ET est representee par un double trait horizontal", "Elle active simultanement toutes les branches en parallele", "Le franchissement active toutes les etapes aval en meme temps", "La convergence en ET attend que toutes les branches soient terminees"]}',
  '{"grafcet","divergence_et","parallelisme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000329',
  '33333333-0000-0000-0000-000000000050',
  'mcq', 3, 'fr',
  '{"stem": "Une divergence en OU dans un GRAFCET signifie que :", "choices": ["Une seule branche sera activee selon la receptivite validee", "Toutes les branches sont activees simultanement", "Le systeme s''arrete et attend un choix de l''operateur", "Les branches sont executees l''une apres l''autre"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une divergence en OU (representee par un simple trait horizontal avec plusieurs transitions) permet de choisir entre plusieurs sequences. Seule la branche dont la receptivite est vraie sera activee. Les receptivites doivent etre exclusives pour eviter toute ambiguite. Ne pas confondre avec la divergence en ET qui active toutes les branches.", "steps": ["La divergence en OU permet un choix entre plusieurs sequences", "Seule la branche dont la receptivite est vraie est activee", "Les receptivites doivent etre mutuellement exclusives", "A ne pas confondre avec la divergence en ET (parallelisme)"]}',
  '{"grafcet","divergence_ou","choix_sequence","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000330',
  '33333333-0000-0000-0000-000000000050',
  'numeric', 3, 'fr',
  '{"stem": "Un GRAFCET comporte 6 etapes numerotees de 0 a 5. L''etape 0 est l''etape initiale. Combien de transitions comporte ce GRAFCET s''il s''agit d''un cycle lineaire (sequence unique qui revient a l''etape initiale) ?", "correct_value": 6, "tolerance": 0, "latex": false}',
  '{"text_fr": "Dans un GRAFCET lineaire cyclique a 6 etapes, il y a exactement 6 transitions : une entre chaque paire d''etapes consecutives (0\\u21921, 1\\u21922, 2\\u21923, 3\\u21924, 4\\u21925) soit 5 transitions, plus une transition de retour (5\\u21920) pour boucler le cycle. Total = 6 transitions.", "steps": ["Etapes : 0 \\u2192 1 \\u2192 2 \\u2192 3 \\u2192 4 \\u2192 5 \\u2192 retour a 0", "Transitions entre etapes consecutives : 5 (de 0\\u21921 jusqu''a 4\\u21925)", "Transition de retour au debut du cycle : 1 (de 5\\u21920)", "Total : 5 + 1 = 6 transitions"]}',
  '{"grafcet","transitions","cycle_lineaire","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000331',
  '33333333-0000-0000-0000-000000000050',
  'mcq', 4, 'fr',
  '{"stem": "Soit l''etape Xi d''un GRAFCET. L''equation d''activation de cette etape est :", "choices": ["CAXi = Xi-1 \\u00b7 ti-1 (etape precedente active ET receptivite associee a la transition vraie)", "CAXi = Xi+1 \\u00b7 ti (etape suivante active ET receptivite vraie)", "CAXi = Xi \\u00b7 ti-1 (etape elle-meme active ET receptivite vraie)", "CAXi = ti-1 (receptivite vraie uniquement)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''equation d''activation de l''etape Xi est CAXi = Xi-1 \\u00b7 ti-1, c''est-a-dire que l''etape precedente Xi-1 doit etre active ET la receptivite ti-1 associee a la transition en amont de Xi doit etre vraie. L''equation d''etat complet est : Xi = CAXi + Xi \\u00b7 \\u0305(CDXi), avec CDXi la condition de desactivation.", "steps": ["CAXi = condition d''activation de l''etape Xi", "CAXi = Xi-1 \\u00b7 ti-1 (etape amont active ET transition franchissable)", "CDXi = condition de desactivation = ti (transition aval franchie)", "Equation d''etat : Xi = CAXi + Xi \\u00b7 \\u0305(CDXi)"]}',
  '{"grafcet","equations","activation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000332',
  '33333333-0000-0000-0000-000000000050',
  'true_false', 3, 'fr',
  '{"stem": "Le GRAFCET du point de vue systeme decrit les actions detaillees des actionneurs et preactionneurs de la partie operative.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le GRAFCET du point de vue systeme (niveau 1) donne une description globale et fonctionnelle du comportement du systeme, sans detailler les actionneurs. C''est le GRAFCET du point de vue partie operative (niveau 2) qui decrit les actions en termes d''actionneurs (verins, moteurs, etc.). Le GRAFCET du point de vue partie commande (niveau 3) precise les ordres emis par l''automate vers les preactionneurs.", "steps": ["GRAFCET point de vue systeme (niveau 1) : description fonctionnelle globale", "GRAFCET point de vue partie operative (niveau 2) : actions des actionneurs", "GRAFCET point de vue partie commande (niveau 3) : ordres vers les preactionneurs", "Le point de vue systeme utilise des verbes d''action generaux (ex : ''deplacer la piece'')"]}',
  '{"grafcet","point_de_vue","systeme","bac_style"}'
);
