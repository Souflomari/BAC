-- ============================================================
-- ISLAMIC EDUCATION CONTENT: Fiqh et pratiques cultuelles (2 skills, 14 items)
-- Topic: Fiqh et pratiques cultuelles
-- Skills:
--   worship_rules   (33333333-...-089) — 7 items
--   family_law      (33333333-...-090) — 7 items
-- ============================================================

-- =====================
-- SKILL: worship_rules (Règles des actes cultuels) — 7 items
-- =====================

-- Item 599 — mcq — Les 5 piliers de l'Islam
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000599',
  '33333333-0000-0000-0000-000000000089',
  'mcq', 1, 'fr',
  '{"stem": "Quel est le premier pilier de l''Islam ?", "choices": ["La chahada (attestation de foi)", "La salat (prière)", "La zakat (aumône légale)", "Le hajj (pèlerinage)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La chahada (الشهادة) est le premier pilier de l''Islam. Elle consiste à attester qu''il n''y a de divinité qu''Allah et que Mohammed est son messager. C''est la condition d''entrée dans l''Islam et le fondement de tous les autres piliers.", "steps": ["La chahada est l''attestation de foi : « Ach-hadou an lâ ilâha illa-Llâh, wa ach-hadou anna Mohammadan rassoûlou-Llâh »", "Elle constitue le premier des cinq piliers de l''Islam", "Les cinq piliers sont dans l''ordre : chahada, salat, zakat, sawm (jeûne du Ramadan), hajj"]}',
  '{"éducation_islamique","fiqh","piliers_islam","chahada"}'
);

-- Item 600 — mcq — Catégories de jugements en Fiqh
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000600',
  '33333333-0000-0000-0000-000000000089',
  'mcq', 2, 'fr',
  '{"stem": "En Fiqh islamique, comment appelle-t-on un acte dont l''accomplissement est récompensé mais dont le délaissement n''est pas sanctionné ?", "choices": ["Mandoub (recommandé)", "Wajib (obligatoire)", "Moubah (licite)", "Makrouh (réprouvé)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le mandoub (المندوب), aussi appelé moustahabb ou sunna, désigne un acte recommandé en Islam. Celui qui l''accomplit est récompensé, mais celui qui le délaisse ne commet aucun péché. Exemples : les prières surérogatoires (nawafil), le siwak.", "steps": ["Les cinq catégories de jugements (al-ahkam al-khamsa) sont : wajib, mandoub, moubah, makrouh, haram", "Le wajib (obligatoire) : récompensé si accompli, sanctionné si délaissé", "Le mandoub (recommandé) : récompensé si accompli, non sanctionné si délaissé", "Le moubah (licite) : ni récompensé ni sanctionné"]}',
  '{"éducation_islamique","fiqh","ahkam","mandoub","jugements"}'
);

-- Item 601 — mcq — Conditions de validité de la prière
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000601',
  '33333333-0000-0000-0000-000000000089',
  'mcq', 2, 'fr',
  '{"stem": "Laquelle des conditions suivantes n''est PAS une condition de validité de la prière (salat) ?", "choices": ["Avoir effectué le pèlerinage", "La purification rituelle (tahaра)", "L''entrée du temps prescrit", "L''orientation vers la Qibla"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le pèlerinage (hajj) est un pilier de l''Islam indépendant, et non une condition de validité de la prière. Les conditions de validité de la salat comprennent : la pureté rituelle (woudou ou tayammoum), la couverture de la ''awra, l''orientation vers la Qibla, l''entrée du temps prescrit et l''intention (niyya).", "steps": ["La purification rituelle (tahaра) est obligatoire avant la prière", "L''orientation vers la Qibla (direction de La Mecque) est requise", "L''entrée du temps prescrit pour chaque prière est une condition", "Le hajj est un pilier distinct de l''Islam, pas une condition de la prière"]}',
  '{"éducation_islamique","fiqh","salat","conditions","ibada"}'
);

-- Item 602 — mcq — Conditions de la zakat
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000602',
  '33333333-0000-0000-0000-000000000089',
  'mcq', 3, 'fr',
  '{"stem": "Quelle condition doit être remplie pour que la zakat devienne obligatoire sur une richesse ?", "choices": ["Atteindre le nissab et le passage d''une année lunaire (hawl)", "Posséder n''importe quel montant d''argent", "Avoir un emploi salarié uniquement", "Être marié et chef de famille"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La zakat devient obligatoire lorsque deux conditions principales sont réunies : la richesse doit atteindre le seuil minimum appelé nissab (النصاب), et une année lunaire complète (الحول) doit s''écouler depuis que ce seuil a été atteint. Le nissab pour l''or est de 85 grammes et pour l''argent de 595 grammes.", "steps": ["Le nissab est le seuil minimum de richesse rendant la zakat obligatoire", "Le hawl (année lunaire) doit s''écouler sur la possession du nissab", "Le taux de la zakat sur l''argent et l''or est de 2,5%", "Le nissab de l''or = 85 g, le nissab de l''argent = 595 g"]}',
  '{"éducation_islamique","fiqh","zakat","nissab","ibada"}'
);

-- Item 603 — numeric — Nombre de prières quotidiennes
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000603',
  '33333333-0000-0000-0000-000000000089',
  'numeric', 1, 'fr',
  '{"stem": "Combien de prières obligatoires (fard) le musulman doit-il accomplir quotidiennement ?", "correct_value": 5, "tolerance": 0, "unit": "prières", "latex": false}',
  '{"text_fr": "Le musulman doit accomplir 5 prières obligatoires par jour. Elles ont été prescrites lors du voyage nocturne (Al-Isra wal-Mi''raj). Ce sont : Fajr (l''aube), Dhohr (midi), Asr (après-midi), Maghrib (coucher du soleil) et Icha (nuit).", "steps": ["Fajr (الفجر) : 2 rak''at — entre l''aube et le lever du soleil", "Dhohr (الظهر) : 4 rak''at — après le zénith", "Asr (العصر) : 4 rak''at — milieu de l''après-midi", "Maghrib (المغرب) : 3 rak''at — après le coucher du soleil", "Icha (العشاء) : 4 rak''at — la nuit"]}',
  '{"éducation_islamique","fiqh","salat","piliers_islam","ibada"}'
);

-- Item 604 — true_false — Le makrouh
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000604',
  '33333333-0000-0000-0000-000000000089',
  'true_false', 2, 'fr',
  '{"stem": "En Fiqh islamique, l''acte makrouh (réprouvé) est interdit et son auteur commet un péché.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le makrouh (المكروه) désigne un acte réprouvé mais non interdit. Celui qui le délaisse est récompensé, mais celui qui le commet ne commet pas de péché. Il se distingue du haram qui, lui, est strictement interdit et sanctionné. Exemple de makrouh : manger de l''ail cru avant la prière.", "steps": ["Le makrouh est un acte déconseillé mais pas interdit", "Le délaisser est récompensé, le commettre n''est pas un péché", "Il se distingue du haram (interdit) dont l''auteur commet un péché", "Exemple : le gaspillage d''eau lors des ablutions est makrouh"]}',
  '{"éducation_islamique","fiqh","ahkam","makrouh","jugements"}'
);

-- Item 605 — true_false — Conditions du jeûne du Ramadan
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000605',
  '33333333-0000-0000-0000-000000000089',
  'true_false', 2, 'fr',
  '{"stem": "Le voyageur en Islam a l''autorisation de rompre le jeûne du Ramadan à condition de rattraper les jours manqués ultérieurement.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le voyageur bénéficie d''une dispense (rukhsa) lui permettant de rompre le jeûne pendant le Ramadan, conformément au verset coranique : « Et quiconque est malade ou en voyage, alors qu''il jeûne un nombre égal d''autres jours » (Sourate Al-Baqara, 185). Il doit cependant rattraper les jours non jeûnés après le Ramadan.", "steps": ["Le Coran accorde des dispenses de jeûne pour le voyageur et le malade (Al-Baqara, 185)", "Le voyageur peut choisir de jeûner ou de rompre le jeûne", "S''il rompt le jeûne, il doit rattraper les jours manqués avant le Ramadan suivant", "Cette dispense illustre le principe de facilité (التيسير) en Islam"]}',
  '{"éducation_islamique","fiqh","sawm","ramadan","ibada"}'
);

-- =====================
-- SKILL: family_law (Droit de la famille en Islam) — 7 items
-- =====================

-- Item 606 — mcq — La Moudawana
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000606',
  '33333333-0000-0000-0000-000000000090',
  'mcq', 2, 'fr',
  '{"stem": "En quelle année la réforme majeure de la Moudawana (Code de la famille marocain) a-t-elle été adoptée ?", "choices": ["2004", "1993", "2011", "1957"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La réforme majeure de la Moudawana a été adoptée en 2004 sous le règne du Roi Mohammed VI. Cette réforme a constitué une avancée significative pour les droits des femmes au Maroc, instaurant l''égalité des époux dans la responsabilité familiale, relevant l''âge légal du mariage à 18 ans et encadrant strictement la polygamie.", "steps": ["La première Moudawana a été promulguée en 1957-1958 après l''indépendance", "Une première réforme partielle a eu lieu en 1993", "La réforme majeure de 2004 a profondément modernisé le Code de la famille", "Parmi les innovations : égalité des époux, âge du mariage à 18 ans, encadrement de la polygamie"]}',
  '{"éducation_islamique","fiqh","moudawana","famille","droit"}'
);

-- Item 607 — mcq — Droits et devoirs conjugaux
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000607',
  '33333333-0000-0000-0000-000000000090',
  'mcq', 2, 'fr',
  '{"stem": "Selon la Moudawana de 2004, la responsabilité de la famille incombe à :", "choices": ["Les deux époux conjointement", "Le mari uniquement", "La femme uniquement", "Le tuteur légal de la femme"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Selon la Moudawana de 2004, la famille est placée sous la responsabilité conjointe des deux époux, contrairement à l''ancien code qui attribuait cette responsabilité au mari seul. Les droits et devoirs sont réciproques : cohabitation, fidélité, respect mutuel, concertation dans les décisions familiales et bonne éducation des enfants.", "steps": ["L''ancien code plaçait la famille sous la tutelle exclusive du mari", "La réforme de 2004 a instauré la coresponsabilité des deux époux", "Les devoirs mutuels incluent : fidélité, respect, cohabitation légale", "Les décisions concernant la famille se prennent par concertation"]}',
  '{"éducation_islamique","fiqh","moudawana","devoirs_conjugaux","famille"}'
);

-- Item 608 — mcq — L'héritage en Islam
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000608',
  '33333333-0000-0000-0000-000000000090',
  'mcq', 3, 'fr',
  '{"stem": "Dans le système successoral islamique, comment appelle-t-on les héritiers dont les parts sont fixées par le Coran ?", "choices": ["Les héritiers fard (à parts déterminées)", "Les héritiers ''assaba (agnatiques)", "Les héritiers dhawou al-arham (parents utérins)", "Les légataires testamentaires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les héritiers fard (أصحاب الفروض) sont ceux dont les parts successorales sont explicitement fixées par le Coran. Les parts déterminées (fard) sont : 1/2, 1/4, 1/8, 2/3, 1/3 et 1/6. Ils se distinguent des héritiers ''assaba qui reçoivent le reliquat après distribution des parts fixes.", "steps": ["Les héritiers fard ont des parts fixées par le Coran (sourate An-Nissa, versets 11-12)", "Les six fractions coraniques sont : 1/2, 1/4, 1/8, 2/3, 1/3, 1/6", "Les héritiers ''assaba reçoivent ce qui reste après les parts fixes", "Les dhawou al-arham héritent en l''absence des deux premières catégories"]}',
  '{"éducation_islamique","fiqh","héritage","succession","fard"}'
);

-- Item 609 — mcq — Garde des enfants (hadana)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000609',
  '33333333-0000-0000-0000-000000000090',
  'mcq', 2, 'fr',
  '{"stem": "Selon la Moudawana, à qui revient en priorité la garde (hadana) de l''enfant en cas de dissolution du mariage ?", "choices": ["À la mère en priorité", "Au père en priorité", "Aux grands-parents paternels", "Au juge exclusivement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Selon la Moudawana (articles 171-175), la garde de l''enfant (الحضانة) revient en priorité à la mère, puis au père, puis à la grand-mère maternelle. L''intérêt supérieur de l''enfant reste le critère déterminant. La durée de la garde maternelle s''étend jusqu''à l''âge de la majorité légale (18 ans) pour les garçons comme pour les filles depuis la réforme de 2004.", "steps": ["L''ordre de priorité : mère, père, grand-mère maternelle", "La réforme de 2004 a unifié l''âge de fin de garde à 18 ans pour les deux sexes", "L''intérêt supérieur de l''enfant est le critère principal", "Le juge peut modifier l''ordre de garde si l''intérêt de l''enfant l''exige"]}',
  '{"éducation_islamique","fiqh","moudawana","hadana","garde","famille"}'
);

-- Item 610 — numeric — Âge légal du mariage au Maroc
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000610',
  '33333333-0000-0000-0000-000000000090',
  'numeric', 1, 'fr',
  '{"stem": "Selon la Moudawana de 2004, quel est l''âge légal minimum du mariage au Maroc (en années) ?", "correct_value": 18, "tolerance": 0, "unit": "ans", "latex": false}',
  '{"text_fr": "La Moudawana de 2004 a fixé l''âge légal du mariage à 18 ans pour les hommes comme pour les femmes. Avant la réforme, l''âge était de 18 ans pour les hommes et 15 ans pour les femmes. Le juge peut accorder une dérogation exceptionnelle pour le mariage de mineurs, mais cette disposition fait l''objet de débats.", "steps": ["Avant 2004 : âge du mariage fixé à 18 ans (hommes) et 15 ans (femmes)", "La réforme de 2004 a uniformisé l''âge légal à 18 ans pour les deux sexes", "Des dérogations judiciaires restent possibles dans des cas exceptionnels", "Cette mesure vise à protéger les droits des mineurs, notamment des filles"]}',
  '{"éducation_islamique","fiqh","moudawana","mariage","âge_légal"}'
);

-- Item 611 — true_false — La polygamie dans la Moudawana
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000611',
  '33333333-0000-0000-0000-000000000090',
  'true_false', 2, 'fr',
  '{"stem": "Selon la Moudawana de 2004, la polygamie est totalement interdite au Maroc.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La Moudawana de 2004 n''interdit pas totalement la polygamie mais l''encadre très strictement. Elle est soumise à l''autorisation du juge qui vérifie la capacité du mari à assurer l''équité entre les épouses et la justification objective exceptionnelle. De plus, la première épouse doit être informée et la future épouse doit savoir que le mari est déjà marié. L''épouse peut stipuler dans le contrat de mariage une clause interdisant la polygamie.", "steps": ["La polygamie n''est pas interdite mais strictement encadrée par la Moudawana de 2004", "Elle est soumise à l''autorisation préalable du juge", "Le juge vérifie la justification exceptionnelle et la capacité à assurer l''équité", "La première épouse doit être informée et peut avoir inséré une clause d''interdiction dans le contrat"]}',
  '{"éducation_islamique","fiqh","moudawana","polygamie","famille"}'
);

-- Item 612 — true_false — Le testament (wassiya) en Islam
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000612',
  '33333333-0000-0000-0000-000000000090',
  'true_false', 3, 'fr',
  '{"stem": "En droit successoral islamique, le testament (wassiya) peut porter sur la totalité des biens du défunt sans aucune limite.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. En droit successoral islamique, le testament (الوصية) est limité au tiers (1/3) maximum de la succession. Cette règle est fondée sur le hadith du Prophète adressé à Sa''d ibn Abi Waqqas : « Le tiers, et le tiers c''est déjà beaucoup ». De plus, le testament ne peut pas être fait au profit d''un héritier légal (sauf accord des autres héritiers), afin de préserver l''équilibre des parts coraniques.", "steps": ["Le testament est limité au tiers (1/3) maximum de la succession", "Cette limite est fondée sur le hadith de Sa''d ibn Abi Waqqas", "Le testament ne peut bénéficier à un héritier légal sauf accord des autres héritiers", "Au-delà du tiers, l''exécution du testament nécessite le consentement des héritiers"]}',
  '{"éducation_islamique","fiqh","héritage","wassiya","testament","succession"}'
);
