-- ============================================================
-- ENGINEERING CONTENT: Chaine d'energie (2 skills, 14 items)
-- Topic: Chaine d'energie
-- Skills:
--   energy_supply  (33333333-...-047) difficulty 2 — 7 items
--   energy_convert (33333333-...-048) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: energy_supply (Alimenter et distribuer l'energie) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000305',
  '33333333-0000-0000-0000-000000000047',
  'mcq', 2, 'fr',
  '{"stem": "Dans une chaine d''energie, la fonction \"Alimenter\" consiste a :", "choices": ["Fournir l''energie necessaire au systeme a partir d''une source", "Transformer l''energie electrique en energie mecanique", "Transmettre le mouvement aux effecteurs", "Adapter la vitesse de rotation du moteur"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La fonction Alimenter est la premiere fonction de la chaine d''energie. Elle consiste a fournir l''energie au systeme a partir d''une source (reseau electrique, batterie, air comprime, etc.). La transformation et la transmission sont assurees par d''autres fonctions de la chaine.", "steps": ["La chaine d''energie comprend : Alimenter, Distribuer, Convertir, Transmettre", "Alimenter = fournir l''energie depuis la source", "Convertir = transformer une forme d''energie en une autre", "Transmettre = adapter et acheminer l''energie vers l''effecteur"]}',
  '{"chaine_energie","alimenter","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000306',
  '33333333-0000-0000-0000-000000000047',
  'numeric', 2, 'fr',
  '{"stem": "Une batterie de 12 V et de capacite 50 Ah alimente un moteur. Calculer l''energie (en Wh) stockee dans la batterie.", "correct_value": 600, "tolerance": 1, "latex": true}',
  '{"text_fr": "L''energie stockee dans une batterie se calcule par E = U \\u00d7 C, ou U est la tension nominale et C la capacite en Ah. E = 12 \\u00d7 50 = 600 Wh.", "steps": ["Formule : E = U \\u00d7 C (avec C en Ah)", "U = 12 V, C = 50 Ah", "E = 12 \\u00d7 50 = 600 Wh"]}',
  '{"chaine_energie","batterie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000307',
  '33333333-0000-0000-0000-000000000047',
  'mcq', 2, 'fr',
  '{"stem": "Le reseau electrique triphase industriel en France fournit une tension simple de 230 V. Quelle est la tension composee correspondante ?", "choices": ["400 V", "460 V", "690 V", "230 V"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La relation entre tension composee U et tension simple V dans un reseau triphase equilibre est U = V\\u221a3. U = 230 \\u00d7 \\u221a3 = 230 \\u00d7 1,732 \\u2248 398,4 V \\u2248 400 V.", "steps": ["Relation : U = V \\u00d7 \\u221a3", "V = 230 V (tension simple)", "U = 230 \\u00d7 1,732 \\u2248 400 V", "Les valeurs normalisees sont 230 V / 400 V"]}',
  '{"chaine_energie","triphase","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000308',
  '33333333-0000-0000-0000-000000000047',
  'numeric', 3, 'fr',
  '{"stem": "Un alimenteur fournit une puissance de sortie Ps = 450 W avec un rendement \\u03b7 = 0,90. Calculer la puissance absorbee Pe (en W) a l''entree.", "correct_value": 500, "tolerance": 1, "latex": true}',
  '{"text_fr": "Le rendement est defini par \\u03b7 = Ps / Pe, donc Pe = Ps / \\u03b7. Pe = 450 / 0,90 = 500 W.", "steps": ["Formule du rendement : \\u03b7 = Ps / Pe", "On isole Pe : Pe = Ps / \\u03b7", "Pe = 450 / 0,90", "Pe = 500 W"]}',
  '{"chaine_energie","rendement","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000309',
  '33333333-0000-0000-0000-000000000047',
  'mcq', 3, 'fr',
  '{"stem": "Quel composant assure la fonction \"Distribuer\" l''energie electrique dans une chaine d''energie ?", "choices": ["Le contacteur", "Le moteur electrique", "Le reducteur a engrenages", "La batterie"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La fonction Distribuer est assuree par des preactionneurs comme le contacteur (pour les moteurs de forte puissance), le relais ou le variateur de vitesse. Le moteur assure la conversion, le reducteur la transmission, et la batterie l''alimentation.", "steps": ["Distribuer = autoriser ou moduler le passage de l''energie", "Le contacteur est un preactionneur electromecanique", "Il est commande par la partie commande du systeme", "Autres distributeurs : relais, variateur de vitesse, distributeur pneumatique"]}',
  '{"chaine_energie","distribuer","contacteur","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000310',
  '33333333-0000-0000-0000-000000000047',
  'true_false', 2, 'fr',
  '{"stem": "Un variateur de vitesse est un preactionneur qui permet de moduler la vitesse d''un moteur electrique en faisant varier la frequence et la tension d''alimentation.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Le variateur de vitesse (ou convertisseur de frequence) fait partie de la fonction Distribuer. Il module la frequence et la tension appliquees au moteur, ce qui permet de controler sa vitesse de rotation. C''est un preactionneur largement utilise dans l''industrie.", "steps": ["Le variateur de vitesse est un preactionneur (fonction Distribuer)", "Il convertit la frequence et la tension du reseau", "La vitesse d''un moteur asynchrone depend de la frequence : N = 60f/p", "En variant f, on controle la vitesse du moteur"]}',
  '{"chaine_energie","variateur","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000311',
  '33333333-0000-0000-0000-000000000047',
  'numeric', 3, 'fr',
  '{"stem": "Une source pneumatique fournit de l''air comprime a une pression de 6 bars. Un verin pneumatique de section S = 20 cm\\u00b2 est alimente par cette source. Calculer la force theorique F (en N) exercee par le verin. On rappelle : 1 bar = 10\\u2075 Pa.", "correct_value": 1200, "tolerance": 5, "latex": true}',
  '{"text_fr": "La force exercee par un verin est F = p \\u00d7 S. On convertit : p = 6 bars = 6 \\u00d7 10\\u2075 Pa et S = 20 cm\\u00b2 = 20 \\u00d7 10\\u207b\\u2074 m\\u00b2 = 2 \\u00d7 10\\u207b\\u00b3 m\\u00b2. F = 6 \\u00d7 10\\u2075 \\u00d7 2 \\u00d7 10\\u207b\\u00b3 = 1200 N. Attention : cette question porte sur l''alimentation pneumatique (source d''energie).", "steps": ["Formule : F = p \\u00d7 S", "p = 6 bars = 6 \\u00d7 10\\u2075 Pa", "S = 20 cm\\u00b2 = 20 \\u00d7 10\\u207b\\u2074 m\\u00b2 = 2 \\u00d7 10\\u207b\\u00b3 m\\u00b2", "F = 6 \\u00d7 10\\u2075 \\u00d7 2 \\u00d7 10\\u207b\\u00b3 = 1200 N"]}',
  '{"chaine_energie","pneumatique","verin","bac_style"}'
);

-- =====================
-- SKILL: energy_convert (Convertir et transmettre l'energie) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000312',
  '33333333-0000-0000-0000-000000000048',
  'numeric', 3, 'fr',
  '{"stem": "Un moteur a courant continu est alimente sous une tension U = 24 V et absorbe un courant I = 5 A. Calculer la puissance electrique absorbee Pe (en W) par le moteur.", "correct_value": 120, "tolerance": 1, "latex": true}',
  '{"text_fr": "La puissance electrique absorbee par un moteur a courant continu est Pe = U \\u00d7 I. Pe = 24 \\u00d7 5 = 120 W.", "steps": ["Formule : Pe = U \\u00d7 I", "U = 24 V, I = 5 A", "Pe = 24 \\u00d7 5 = 120 W"]}',
  '{"chaine_energie","moteur_cc","puissance","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000313',
  '33333333-0000-0000-0000-000000000048',
  'numeric', 3, 'fr',
  '{"stem": "Un moteur electrique fournit une puissance utile Pu = 100 W a une vitesse de rotation N = 1500 tr/min. Calculer le couple moteur C (en N\\u00b7m). On rappelle : \\u03c9 = 2\\u03c0N/60.", "correct_value": 0.637, "tolerance": 0.005, "latex": true}',
  '{"text_fr": "La puissance mecanique est Pu = C \\u00d7 \\u03c9, donc C = Pu / \\u03c9. On calcule \\u03c9 = 2\\u03c0 \\u00d7 1500 / 60 = 50\\u03c0 \\u2248 157,08 rad/s. C = 100 / 157,08 \\u2248 0,637 N\\u00b7m.", "steps": ["Formule : Pu = C \\u00d7 \\u03c9, donc C = Pu / \\u03c9", "\\u03c9 = 2\\u03c0N / 60 = 2\\u03c0 \\u00d7 1500 / 60 = 50\\u03c0 rad/s", "\\u03c9 \\u2248 157,08 rad/s", "C = 100 / 157,08 \\u2248 0,637 N\\u00b7m"]}',
  '{"chaine_energie","couple_moteur","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000314',
  '33333333-0000-0000-0000-000000000048',
  'mcq', 3, 'fr',
  '{"stem": "Un systeme de transmission par engrenages comporte une roue menante de Z1 = 20 dents et une roue menee de Z2 = 60 dents. Quel est le rapport de reduction r ?", "choices": ["r = 1/3", "r = 3", "r = 1/2", "r = 2/3"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le rapport de reduction d''un train d''engrenages simple est r = Z1 / Z2 (roue menante / roue menee). r = 20 / 60 = 1/3. Comme r < 1, c''est bien un reducteur : la vitesse de sortie est plus faible que celle d''entree, et le couple est multiplie.", "steps": ["Formule : r = Z1 / Z2 = N_sortie / N_entree", "Z1 = 20 dents (menante), Z2 = 60 dents (menee)", "r = 20 / 60 = 1/3", "r < 1 : c''est un reducteur (diminution de vitesse, augmentation de couple)"]}',
  '{"chaine_energie","engrenages","rapport_reduction","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000315',
  '33333333-0000-0000-0000-000000000048',
  'numeric', 3, 'fr',
  '{"stem": "Un verin pneumatique double effet a un piston de diametre D = 50 mm. La pression d''alimentation est p = 5 bars. Calculer la force de poussee F (en N) exercee par le verin en phase aller (on neglige la tige). On rappelle : 1 bar = 10\\u2075 Pa.", "correct_value": 981.75, "tolerance": 5, "latex": true}',
  '{"text_fr": "La force de poussee est F = p \\u00d7 S, avec S = \\u03c0D\\u00b2/4. S = \\u03c0 \\u00d7 (50 \\u00d7 10\\u207b\\u00b3)\\u00b2 / 4 = \\u03c0 \\u00d7 2500 \\u00d7 10\\u207b\\u2076 / 4 = \\u03c0 \\u00d7 625 \\u00d7 10\\u207b\\u2076 \\u2248 1,9635 \\u00d7 10\\u207b\\u00b3 m\\u00b2. F = 5 \\u00d7 10\\u2075 \\u00d7 1,9635 \\u00d7 10\\u207b\\u00b3 \\u2248 981,75 N.", "steps": ["Formule : F = p \\u00d7 S avec S = \\u03c0D\\u00b2/4", "D = 50 mm = 0,05 m", "S = \\u03c0 \\u00d7 (0,05)\\u00b2 / 4 = \\u03c0 \\u00d7 0,0025 / 4 \\u2248 1,9635 \\u00d7 10\\u207b\\u00b3 m\\u00b2", "p = 5 bars = 5 \\u00d7 10\\u2075 Pa", "F = 5 \\u00d7 10\\u2075 \\u00d7 1,9635 \\u00d7 10\\u207b\\u00b3 \\u2248 981,75 N"]}',
  '{"chaine_energie","verin","force_poussee","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000316',
  '33333333-0000-0000-0000-000000000048',
  'numeric', 4, 'fr',
  '{"stem": "Un moteur tourne a N_m = 3000 tr/min. Il entraine un reducteur a deux etages d''engrenages : premier etage Z1 = 15, Z2 = 45 ; deuxieme etage Z3 = 18, Z4 = 54. Calculer la vitesse de rotation en sortie N_s (en tr/min).", "correct_value": 333.33, "tolerance": 1, "latex": true}',
  '{"text_fr": "Le rapport de reduction global est le produit des rapports de chaque etage. r1 = Z1/Z2 = 15/45 = 1/3. r2 = Z3/Z4 = 18/54 = 1/3. r_global = r1 \\u00d7 r2 = (1/3) \\u00d7 (1/3) = 1/9. N_s = r_global \\u00d7 N_m = (1/9) \\u00d7 3000 = 333,33 tr/min.", "steps": ["Premier etage : r1 = Z1/Z2 = 15/45 = 1/3", "Deuxieme etage : r2 = Z3/Z4 = 18/54 = 1/3", "Rapport global : r = r1 \\u00d7 r2 = 1/3 \\u00d7 1/3 = 1/9", "N_s = r \\u00d7 N_m = (1/9) \\u00d7 3000 = 333,33 tr/min"]}',
  '{"chaine_energie","train_engrenages","reducteur","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000317',
  '33333333-0000-0000-0000-000000000048',
  'true_false', 3, 'fr',
  '{"stem": "Dans un systeme poulie-courroie, si la poulie motrice a un diametre D1 = 80 mm et la poulie receptrice un diametre D2 = 160 mm, alors la vitesse de rotation de la poulie receptrice est le double de celle de la poulie motrice.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Le rapport de transmission est i = D1/D2 = 80/160 = 1/2. Donc N2 = i \\u00d7 N1 = N1/2. La vitesse de la poulie receptrice est la moitie (et non le double) de celle de la poulie motrice. C''est un reducteur.", "steps": ["Rapport de transmission poulie-courroie : i = D1/D2 = N2/N1", "i = 80/160 = 1/2", "N2 = (1/2) \\u00d7 N1 : la vitesse de sortie est divisee par 2", "La poulie receptrice tourne 2 fois moins vite que la motrice, pas 2 fois plus vite"]}',
  '{"chaine_energie","poulie_courroie","piege_classique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000318',
  '33333333-0000-0000-0000-000000000048',
  'mcq', 4, 'fr',
  '{"stem": "Un moteur asynchrone triphase a 2 paires de poles est alimente par le reseau 50 Hz. Sa vitesse de synchronisme est Ns = 1500 tr/min et il tourne a N = 1455 tr/min. Le couple utile est Cu = 10 N\\u00b7m. Quelle est la puissance utile Pu (en W) du moteur ?", "choices": ["1524 W", "1571 W", "1500 W", "1455 W"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La puissance utile est Pu = Cu \\u00d7 \\u03c9, avec \\u03c9 = 2\\u03c0N/60. On utilise N = 1455 tr/min (vitesse reelle, pas la vitesse de synchronisme). \\u03c9 = 2\\u03c0 \\u00d7 1455 / 60 = 48,5\\u03c0 \\u2248 152,37 rad/s. Pu = 10 \\u00d7 152,37 \\u2248 1523,7 W \\u2248 1524 W. Le piege est d''utiliser Ns = 1500 tr/min, ce qui donnerait 1571 W (reponse fausse).", "steps": ["Formule : Pu = Cu \\u00d7 \\u03c9 avec \\u03c9 = 2\\u03c0N/60", "On utilise la vitesse reelle N = 1455 tr/min (pas Ns)", "\\u03c9 = 2\\u03c0 \\u00d7 1455 / 60 = 48,5\\u03c0 \\u2248 152,37 rad/s", "Pu = 10 \\u00d7 152,37 \\u2248 1524 W"]}',
  '{"chaine_energie","moteur_asynchrone","puissance_utile","bac_style"}'
);
