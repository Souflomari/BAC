-- ============================================================
-- SVT CONTENT: Géologie (2 skills, 12 items)
-- Skills:
--   tectonic_deformations (33333333-...-043) difficulty 2 — 6 items
--   metamorphism          (33333333-...-044) difficulty 3 — 6 items
-- ============================================================

-- =====================
-- SKILL: tectonic_deformations (Déformations tectoniques) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000279',
  '33333333-0000-0000-0000-000000000043',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de pli présente un cœur constitué des couches les plus anciennes ?", "choices": ["Un anticlinal", "Un synclinal", "Un pli couché", "Un pli déversé"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un anticlinal est un pli convexe vers le haut dont le cœur (noyau) est occupé par les couches les plus anciennes. À l''inverse, un synclinal présente un cœur formé des couches les plus récentes.", "steps": ["Un pli est une déformation souple des couches géologiques", "L''anticlinal a une convexité vers le haut et les couches les plus anciennes au centre", "Le synclinal a une concavité vers le haut et les couches les plus récentes au centre", "On identifie le type de pli grâce à l''ordre stratigraphique des couches"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000280',
  '33333333-0000-0000-0000-000000000043',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de faille se forme principalement sous l''effet de contraintes en extension ?", "choices": ["Une faille normale", "Une faille inverse", "Une faille décrochante", "Une faille chevauchante"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une faille normale résulte de contraintes en extension (divergence). Le compartiment situé au-dessus du plan de faille descend par rapport à l''autre. La faille inverse, quant à elle, est liée à des contraintes en compression.", "steps": ["Les contraintes en extension étirent la croûte terrestre", "La roche casse le long d''un plan de faille", "Le bloc supérieur (toit) s''affaisse par rapport au bloc inférieur (mur)", "Ce type de faille est caractéristique des zones de rift"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000281',
  '33333333-0000-0000-0000-000000000043',
  'mcq', 3, 'fr',
  '{"stem": "Dans le cadre de la formation des chaînes de montagnes, quel phénomène est directement responsable du raccourcissement et de l''épaississement de la croûte continentale ?", "choices": ["La collision entre deux plaques continentales", "La subduction océanique", "Le rifting continental", "L''expansion des fonds océaniques"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La collision entre deux plaques continentales est le mécanisme principal du raccourcissement et de l''épaississement crustal. Elle produit des plis, des failles inverses et des chevauchements, formant ainsi les chaînes de collision (ex. : l''Atlas, l''Himalaya).", "steps": ["La subduction de la lithosphère océanique précède généralement la collision", "Lorsque deux plaques continentales convergent, aucune ne peut plonger facilement", "Les roches se déforment par plissement et fracturation (failles inverses)", "Il en résulte un épaississement crustal et un relief montagneux"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000282',
  '33333333-0000-0000-0000-000000000043',
  'numeric', 2, 'fr',
  '{"stem": "Une faille normale présente un rejet vertical de 150 m. Si le compartiment affaissé s''est déplacé à une vitesse moyenne de 0,5 mm/an, combien de milliers d''années a-t-il fallu pour atteindre ce rejet ? (Répondre en milliers d''années.)", "correct_value": 300, "tolerance": 10, "latex": false}',
  '{"text_fr": "Le temps nécessaire se calcule en divisant le rejet par la vitesse de déplacement. 150 m = 150 000 mm. Temps = 150 000 mm / 0,5 mm/an = 300 000 ans = 300 milliers d''années.", "steps": ["Convertir le rejet en mm : 150 m × 1000 = 150 000 mm", "Appliquer la formule : temps = distance / vitesse", "Temps = 150 000 mm / 0,5 mm/an = 300 000 ans", "En milliers d''années : 300 000 / 1000 = 300"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000283',
  '33333333-0000-0000-0000-000000000043',
  'true_false', 2, 'fr',
  '{"stem": "Une déformation souple (ductile) se manifeste par des plis, tandis qu''une déformation cassante se manifeste par des failles.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Les déformations souples (ductiles) produisent des plis lorsque les roches se déforment sans se rompre, sous l''effet de contraintes lentes et à une certaine profondeur. Les déformations cassantes produisent des failles lorsque les roches rigides se fracturent sous des contraintes rapides ou en surface.", "steps": ["Le comportement ductile dépend de la température, la pression et la vitesse de déformation", "En profondeur (T et P élevées), les roches se plient : déformation souple", "En surface (T et P faibles), les roches cassent : déformation cassante", "Les plis sont des marqueurs de déformation ductile, les failles de déformation cassante"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000284',
  '33333333-0000-0000-0000-000000000043',
  'true_false', 3, 'fr',
  '{"stem": "Dans une faille inverse, le compartiment situé au-dessus du plan de faille (le toit) descend par rapport au compartiment inférieur (le mur).", "correct_answer": false, "latex": false}',
  '{"text_fr": "C''est faux. Dans une faille inverse, le toit monte par rapport au mur. C''est dans une faille normale que le toit descend. La faille inverse est associée à des contraintes en compression, tandis que la faille normale est associée à des contraintes en extension.", "steps": ["Faille normale (extension) : le toit descend par rapport au mur", "Faille inverse (compression) : le toit monte par rapport au mur", "La faille décrochante implique un déplacement horizontal", "L''identification du mouvement relatif permet de déterminer le régime tectonique"]}',
  '{"geologie","bac_style"}'
);

-- =====================
-- SKILL: metamorphism (Métamorphisme et granitisation) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000285',
  '33333333-0000-0000-0000-000000000044',
  'mcq', 3, 'fr',
  '{"stem": "Quel type de métamorphisme affecte de vastes régions et est associé à la formation des chaînes de montagnes ?", "choices": ["Le métamorphisme régional", "Le métamorphisme de contact", "Le métamorphisme hydrothermal", "Le métamorphisme dynamique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le métamorphisme régional affecte de vastes surfaces et est lié aux zones de convergence (subduction, collision). Il est caractérisé par des pressions et des températures élevées qui transforment les roches sur de grandes étendues. Le métamorphisme de contact, lui, est localisé autour des intrusions magmatiques.", "steps": ["Le métamorphisme régional est lié à la tectonique des plaques", "Il se produit dans les zones de convergence à grande échelle", "Les deux facteurs principaux sont la pression et la température", "Il produit des roches à foliation (schistosité) comme les schistes et les gneiss"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000286',
  '33333333-0000-0000-0000-000000000044',
  'mcq', 3, 'fr',
  '{"stem": "Le faciès schiste bleu est caractéristique d''un métamorphisme de :", "choices": ["Haute pression et basse température", "Haute pression et haute température", "Basse pression et haute température", "Basse pression et basse température"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le faciès schiste bleu se forme dans des conditions de haute pression et basse température (HP/BT), typiques des zones de subduction. Le minéral index est le glaucophane (amphibole bleue). Ce faciès témoigne d''un enfouissement rapide de la croûte océanique.", "steps": ["Les zones de subduction créent des conditions HP/BT", "La plaque plongeante est soumise à de fortes pressions mais reste relativement froide", "Le minéral glaucophane (bleu) est caractéristique de ces conditions", "La séquence métamorphique en subduction : schiste vert → schiste bleu → éclogite"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000287',
  '33333333-0000-0000-0000-000000000044',
  'mcq', 4, 'fr',
  '{"stem": "L''anatexie est un phénomène géologique qui correspond à :", "choices": ["La fusion partielle des roches métamorphiques produisant un magma granitique", "Le refroidissement lent du magma en profondeur", "La cristallisation fractionnée dans une chambre magmatique", "La solidification rapide de la lave en surface"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''anatexie est la fusion partielle des roches métamorphiques à très haute température (supérieure à 700 °C). Ce processus produit un liquide magmatique de composition granitique. Les migmatites, roches mixtes présentant des parties claires (néosome fondu) et des parties sombres (paléosome non fondu), témoignent de ce phénomène.", "steps": ["Lorsque la température dépasse le solidus, la roche commence à fondre partiellement", "Les minéraux à bas point de fusion (quartz, feldspaths) fondent en premier", "Le liquide formé a une composition granitique (riche en silice)", "Les migmatites sont des roches intermédiaires entre métamorphisme et magmatisme"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000288',
  '33333333-0000-0000-0000-000000000044',
  'numeric', 3, 'fr',
  '{"stem": "Le faciès éclogite se forme à une pression minimale d''environ 15 kbar. Sachant que la pression lithostatique augmente d''environ 0,3 kbar par kilomètre de profondeur, à quelle profondeur minimale (en km) se forme l''éclogite ?", "correct_value": 50, "tolerance": 5, "latex": false}',
  '{"text_fr": "Pour atteindre une pression de 15 kbar avec un gradient de 0,3 kbar/km, la profondeur est : 15 / 0,3 = 50 km. L''éclogite se forme donc à au moins 50 km de profondeur, dans les zones de subduction profondes.", "steps": ["Pression requise : 15 kbar", "Gradient de pression : 0,3 kbar/km", "Profondeur = Pression / Gradient = 15 / 0,3 = 50 km", "Cette profondeur correspond aux conditions de subduction avancée"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000289',
  '33333333-0000-0000-0000-000000000044',
  'true_false', 3, 'fr',
  '{"stem": "Une migmatite est une roche qui témoigne du début de la fusion partielle (anatexie) d''une roche métamorphique.", "correct_answer": true, "latex": false}',
  '{"text_fr": "La migmatite est effectivement une roche qui résulte d''une fusion partielle (anatexie). Elle présente une structure caractéristique avec un néosome (partie claire, issue de la fusion) et un paléosome (partie sombre, résidu non fondu). Elle constitue une transition entre le domaine métamorphique et le domaine magmatique.", "steps": ["La migmatite se forme quand la température dépasse partiellement le solidus", "Le néosome (partie claire) correspond au liquide cristallisé (composition granitique)", "Le paléosome (partie sombre) est le résidu réfractaire non fondu", "La migmatite est un témoin de la granitisation crustale"]}',
  '{"geologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000290',
  '33333333-0000-0000-0000-000000000044',
  'true_false', 3, 'fr',
  '{"stem": "Le métamorphisme de contact est provoqué par l''augmentation de la pression liée à l''enfouissement des roches en profondeur.", "correct_answer": false, "latex": false}',
  '{"text_fr": "C''est faux. Le métamorphisme de contact est provoqué par l''augmentation de la température au voisinage d''une intrusion magmatique (pluton), et non par l''enfouissement. La pression n''y joue qu''un rôle mineur. C''est le métamorphisme régional qui est lié à l''augmentation conjointe de la pression et de la température lors de l''enfouissement.", "steps": ["Le métamorphisme de contact se développe autour d''une intrusion magmatique chaude", "L''auréole de contact entoure le pluton sur quelques mètres à quelques kilomètres", "Le facteur dominant est la température (gradient thermique autour du magma)", "Il produit des roches sans foliation comme les cornéennes"]}',
  '{"geologie","bac_style"}'
);
