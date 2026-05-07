-- ============================================================
-- ARABIC CONTENT: Rhétorique arabe (Balagha) (2 skills, 14 items)
-- Topic: Rhétorique arabe (Balagha)
-- Skills:
--   bayan   (33333333-...-074) — 7 items (Ilm Al-Bayan)
--   badie   (33333333-...-075) — 7 items (Ilm Al-Badie)
-- ============================================================

-- =====================
-- SKILL: bayan (Ilm Al-Bayan — Science de l''expression figurée) — 7 items
-- Covers: tachbih, isti''ara (tasrihiyya, makniyya), kinaya, majaz moursal
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000494',
  '33333333-0000-0000-0000-000000000074',
  'mcq', 2, 'fr',
  '{"stem": "Quels sont les quatre piliers (أركان) du tachbih (التشبيه) ?", "choices": ["Le comparé (مشبّه), le comparant (مشبّه به), l''outil de comparaison (أداة التشبيه), le point commun (وجه الشبه)", "Le comparé, le comparant, le verbe, le complément", "Le sujet, le prédicat, l''outil, le point commun", "Le comparé, le comparant, la métaphore, la métonymie"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le tachbih (comparaison) repose sur quatre piliers fondamentaux : le مشبّه (comparé), le مشبّه به (comparant), l''أداة التشبيه (outil de comparaison comme كَ ou مِثل) et le وجه الشبه (point commun entre les deux éléments comparés).", "steps": ["Le مشبّه (mouschabbah) est l''élément que l''on compare.", "Le مشبّه به (mouschabbah bih) est l''élément auquel on compare.", "L''أداة التشبيه (adât at-tachbih) est le mot-outil (كَ, مِثل, يُشبِه...).", "Le وجه الشبه (wajh ach-chabah) est le trait commun entre les deux."]}',
  '{"arabe","rhétorique","bayan","tachbih"}'
),
(
  '44444444-0000-0000-0000-000000000495',
  '33333333-0000-0000-0000-000000000074',
  'mcq', 2, 'fr',
  '{"stem": "Dans la phrase « الجندي أسد في الشجاعة » (Le soldat est un lion en courage), quel type de tachbih est utilisé ?", "choices": ["Tachbih moufassal (تشبيه مفصّل) car le point commun est mentionné", "Tachbih moudjmal (تشبيه مجمل) car le point commun est omis", "Isti''ara tasrihiyya (استعارة تصريحية)", "Tachbih baligh (تشبيه بليغ)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est un tachbih moufassal (comparaison détaillée) car les quatre piliers sont présents : le comparé (الجندي), le comparant (أسد), l''outil est implicite dans la structure nominale, et le point commun (الشجاعة) est explicitement mentionné.", "steps": ["Le comparé (مشبّه) : الجندي (le soldat).", "Le comparant (مشبّه به) : أسد (un lion).", "Le point commun (وجه الشبه) : الشجاعة (le courage) est mentionné.", "Quand le point commun est mentionné, on parle de tachbih moufassal (تشبيه مفصّل)."]}',
  '{"arabe","rhétorique","bayan","tachbih"}'
),
(
  '44444444-0000-0000-0000-000000000496',
  '33333333-0000-0000-0000-000000000074',
  'mcq', 3, 'fr',
  '{"stem": "Dans l''expression « زرعتُ الأمل في قلوبهم » (J''ai semé l''espoir dans leurs cœurs), quelle figure de style est employée ?", "choices": ["Une isti''ara makniyya (استعارة مكنيّة)", "Une isti''ara tasrihiyya (استعارة تصريحية)", "Un tachbih baligh (تشبيه بليغ)", "Un majaz moursal (مجاز مرسل)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est une isti''ara makniyya (métaphore implicite). L''espoir est implicitement comparé à une graine (élément supprimé), et on lui attribue l''action de semer (قرينة). Le comparant est supprimé mais on garde un de ses attributs (l''action de semer).", "steps": ["L''espoir (الأمل) est le comparé (مشبّه).", "Le comparant implicite est une graine ou une plante (supprimé).", "Le verbe زرعتُ (semer) est un indice (قرينة) du comparant supprimé.", "Quand le comparant est supprimé et remplacé par un de ses attributs, c''est une isti''ara makniyya."]}',
  '{"arabe","rhétorique","bayan","istiaara"}'
),
(
  '44444444-0000-0000-0000-000000000497',
  '33333333-0000-0000-0000-000000000074',
  'mcq', 3, 'fr',
  '{"stem": "Quel est le type de majaz (مجاز) dans la phrase « شربتُ النيل » (J''ai bu le Nil), où l''on désigne l''eau par le fleuve ?", "choices": ["Majaz moursal (مجاز مرسل) avec la relation de contenant (محلّية)", "Isti''ara tasrihiyya (استعارة تصريحية)", "Kinaya (كناية)", "Majaz moursal avec la relation de cause (سببية)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est un majaz moursal (مجاز مرسل) car la relation entre le sens propre et le sens figuré n''est pas une ressemblance. On a dit « le Nil » pour désigner « l''eau du Nil ». La relation est celle du contenant (المحلّية) : le Nil (contenant) est employé à la place de l''eau (contenu).", "steps": ["Le sens apparent : boire le fleuve entier (impossible).", "Le sens voulu : boire l''eau du fleuve.", "La relation n''est pas de ressemblance → c''est un majaz moursal, pas une isti''ara.", "Le Nil est le contenant, l''eau est le contenu → relation de محلّية (contenant)."]}',
  '{"arabe","rhétorique","bayan","majaz"}'
),
(
  '44444444-0000-0000-0000-000000000498',
  '33333333-0000-0000-0000-000000000074',
  'numeric', 2, 'fr',
  '{"stem": "Le tachbih (التشبيه) possède quatre piliers fondamentaux. Si l''on supprime à la fois l''outil de comparaison et le point commun, on obtient un tachbih baligh (تشبيه بليغ). Combien de piliers restent explicitement présents dans un tachbih baligh ?", "correct_value": 2, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le tachbih baligh (comparaison éloquente) ne conserve que deux piliers sur quatre : le comparé (مشبّه) et le comparant (مشبّه به). L''outil de comparaison et le point commun sont tous deux supprimés, ce qui rend la comparaison plus forte et plus concise.", "steps": ["Les quatre piliers du tachbih : مشبّه, مشبّه به, أداة التشبيه, وجه الشبه.", "Dans le tachbih baligh, on supprime l''outil (أداة) et le point commun (وجه الشبه).", "Il reste donc : le comparé (مشبّه) + le comparant (مشبّه به) = 2 piliers."]}',
  '{"arabe","rhétorique","bayan","tachbih"}'
),
(
  '44444444-0000-0000-0000-000000000499',
  '33333333-0000-0000-0000-000000000074',
  'true_false', 2, 'fr',
  '{"stem": "L''isti''ara tasrihiyya (استعارة تصريحية) est une métaphore dans laquelle le comparant (مشبّه به) est explicitement mentionné tandis que le comparé (مشبّه) est supprimé.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Dans l''isti''ara tasrihiyya (métaphore explicite), le comparant est clairement exprimé alors que le comparé est supprimé. Par exemple : « رأيتُ أسدًا يخطب » (J''ai vu un lion faire un discours) — « أسد » (lion) est le comparant mentionné, tandis que le comparé (l''homme courageux) est supprimé.", "steps": ["L''isti''ara est une forme de tachbih où l''un des deux termes est supprimé.", "Tasrihiyya (تصريحية) signifie explicite : le comparant (مشبّه به) est gardé.", "Le comparé (مشبّه) est supprimé.", "Exemple : « رأيتُ أسدًا يخطب » → أسد remplace l''homme courageux."]}',
  '{"arabe","rhétorique","bayan","istiaara"}'
),
(
  '44444444-0000-0000-0000-000000000500',
  '33333333-0000-0000-0000-000000000074',
  'true_false', 2, 'fr',
  '{"stem": "La kinaya (الكناية) est une expression dont le sens apparent est impossible, ce qui oblige l''interlocuteur à comprendre le sens figuré uniquement.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La particularité de la kinaya est que son sens apparent (littéral) reste possible et n''est pas impossible. C''est ce qui la distingue du majaz : dans la kinaya, on peut comprendre le sens littéral, mais le sens visé est le sens figuré. Par exemple : « فلان كثير الرماد » (Un tel a beaucoup de cendres) — le sens littéral est possible, mais le sens visé est qu''il est très généreux (car il cuisine beaucoup pour ses invités).", "steps": ["La kinaya (كناية) est un énoncé dont on vise le sens figuré.", "Mais contrairement au majaz, le sens littéral reste possible.", "Exemple : « كثير الرماد » (beaucoup de cendres) → sens visé : la générosité.", "Le sens littéral (avoir beaucoup de cendres) n''est pas impossible en soi."]}',
  '{"arabe","rhétorique","bayan","kinaya"}'
);

-- =====================
-- SKILL: badie (Ilm Al-Badie — Science de l''embellissement) — 7 items
-- Covers: tibaq, mouqabala, jinas, saj'', tawriya
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000501',
  '33333333-0000-0000-0000-000000000075',
  'mcq', 2, 'fr',
  '{"stem": "Dans le verset « وَتَحْسَبُهُمْ أَيْقَاظًا وَهُمْ رُقُودٌ » (Tu les crois éveillés alors qu''ils dorment), quelle figure de Ilm Al-Badie est utilisée ?", "choices": ["Le tibaq (الطباق) — antithèse entre أيقاظ (éveillés) et رقود (endormis)", "La mouqabala (المقابلة)", "Le jinas (الجناس)", "Le saj'' (السجع)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est un tibaq (طباق), c''est-à-dire une antithèse. Le tibaq consiste à réunir dans un même énoncé un mot et son contraire. Ici, أيقاظ (éveillés) et رقود (endormis) sont deux termes opposés, ce qui crée un contraste saisissant.", "steps": ["Identifier les deux termes clés : أيقاظ (éveillés) et رقود (endormis).", "Ces deux mots sont des antonymes (contraires).", "La réunion de deux antonymes dans un même énoncé est le tibaq (الطباق).", "Il s''agit d''un طباق إيجابي (tibaq positif) car les deux mots sont affirmatifs."]}',
  '{"arabe","rhétorique","badie","tibaq"}'
),
(
  '44444444-0000-0000-0000-000000000502',
  '33333333-0000-0000-0000-000000000075',
  'mcq', 3, 'fr',
  '{"stem": "Quelle est la différence principale entre le tibaq (الطباق) et la mouqabala (المقابلة) ?", "choices": ["Le tibaq oppose deux mots, la mouqabala oppose deux séries de mots ou plus", "Le tibaq est une figure de sens, la mouqabala est une figure de son", "Le tibaq est uniquement dans le Coran, la mouqabala dans la poésie", "Il n''y a aucune différence, ce sont des synonymes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le tibaq (الطباق) oppose un seul mot à son contraire (une paire d''antonymes). La mouqabala (المقابلة) est une extension du tibaq : elle oppose deux ensembles de mots ou plus dans un parallélisme. Par exemple : « فَلْيَضْحَكُوا قَلِيلًا وَلْيَبْكُوا كَثِيرًا » oppose rire/pleurer ET peu/beaucoup.", "steps": ["Le tibaq : opposition d''un mot et son contraire (une seule paire).", "La mouqabala : opposition de plusieurs paires de mots en parallèle.", "Exemple de mouqabala : يضحكوا↔يبكوا (rire↔pleurer) + قليلاً↔كثيرًا (peu↔beaucoup).", "La mouqabala nécessite au moins deux paires d''oppositions."]}',
  '{"arabe","rhétorique","badie","mouqabala"}'
),
(
  '44444444-0000-0000-0000-000000000503',
  '33333333-0000-0000-0000-000000000075',
  'mcq', 2, 'fr',
  '{"stem": "Le jinas (الجناس) est une figure qui repose sur la ressemblance entre deux mots dans la prononciation mais avec un sens différent. Dans « يوم تقوم الساعة يُقسم المجرمون ما لبثوا غير ساعة », quel type de jinas est illustré par le mot « ساعة » ?", "choices": ["Jinas tamm (جناس تامّ) car les deux mots sont identiques dans la forme mais différents dans le sens", "Jinas naqis (جناس ناقص) car les deux mots diffèrent par une lettre", "Tibaq (طباق) car les deux mots sont des antonymes", "Tawriya (تورية) car le mot a un double sens"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est un jinas tamm (جناس تامّ) — paronomase complète. Les deux occurrences du mot « ساعة » sont identiques dans la forme (mêmes lettres, même nombre, même ordre) mais différentes dans le sens : la première « الساعة » désigne le Jour du Jugement, la seconde « ساعة » désigne une heure (un court moment).", "steps": ["Premier mot « الساعة » = le Jour du Jugement (sens religieux).", "Deuxième mot « ساعة » = une heure, un court moment (sens temporel).", "Forme identique mais sens différent = jinas tamm (جناس تامّ).", "Si les mots différaient par une lettre, ce serait un jinas naqis (ناقص)."]}',
  '{"arabe","rhétorique","badie","jinas"}'
),
(
  '44444444-0000-0000-0000-000000000504',
  '33333333-0000-0000-0000-000000000075',
  'mcq', 3, 'fr',
  '{"stem": "La tawriya (التورية) consiste à employer un mot ayant deux sens : un sens proche (apparent) et un sens lointain (visé). Dans le vers « نحن في خير كثير وقليلٌ من يُوفّي الشكرَ لله », quel mot porte la tawriya et quel est le sens visé ?", "choices": ["Le mot « قليل » : sens apparent = peu (de gens), sens visé = personne/rare", "Le mot « خير » : sens apparent = bien, sens visé = richesse", "Le mot « كثير » : sens apparent = beaucoup, sens visé = excessif", "Le mot « الشكر » : sens apparent = remerciement, sens visé = patience"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La tawriya (التورية) porte sur le mot « قليل ». Le sens proche (apparent) est « peu de gens » remercient Dieu. Mais le sens lointain (visé par le poète) est que presque personne ne remercie Dieu suffisamment. Le lecteur pense d''abord au sens proche, mais le poète vise le sens plus profond.", "steps": ["La tawriya utilise un mot à double sens.", "Le sens proche (قريب) est celui qui vient à l''esprit en premier.", "Le sens lointain (بعيد) est celui que l''auteur vise réellement.", "Ici, « قليل » → sens proche : un petit nombre ; sens visé : la rareté absolue."]}',
  '{"arabe","rhétorique","badie","tawriya"}'
),
(
  '44444444-0000-0000-0000-000000000505',
  '33333333-0000-0000-0000-000000000075',
  'numeric', 2, 'fr',
  '{"stem": "Le saj'' (السجع) est la prose rimée où les phrases se terminent par la même lettre ou le même son. Dans l''énoncé suivant, combien de segments (فواصل) rimés peut-on compter ? « اللهم أعطِ كلَّ مُنفقٍ خَلَفًا، وأعطِ كلَّ مُمسكٍ تَلَفًا »", "correct_value": 2, "tolerance": 0, "latex": false}',
  '{"text_fr": "On compte 2 segments (فواصل) rimés. Les deux segments se terminent par le même son « -lafan » : خَلَفًا et تَلَفًا. Le saj'' (prose rimée) crée un effet musical et rythmique en faisant rimer les fins de phrases.", "steps": ["Premier segment : « أعطِ كلَّ مُنفقٍ خَلَفًا » — se termine par خَلَفًا.", "Deuxième segment : « أعطِ كلَّ مُمسكٍ تَلَفًا » — se termine par تَلَفًا.", "Les deux terminaisons riment en « -lafan » → c''est du saj''.", "Nombre de فواصل (segments rimés) = 2."]}',
  '{"arabe","rhétorique","badie","saj"}'
),
(
  '44444444-0000-0000-0000-000000000506',
  '33333333-0000-0000-0000-000000000075',
  'true_false', 2, 'fr',
  '{"stem": "Le tibaq salbi (الطباق السلبي) est une antithèse où l''on oppose un verbe à sa forme négative, comme dans « قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ » (يعلمون / لا يعلمون).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le tibaq salbi (طباق سلبي) est une forme d''antithèse où le même verbe apparaît sous forme affirmative puis sous forme négative (ou inversement). Dans ce verset, يَعْلَمُونَ (ils savent) s''oppose à لَا يَعْلَمُونَ (ils ne savent pas). C''est le même verbe, mais l''un est affirmatif et l''autre négatif.", "steps": ["Le tibaq a deux types : إيجابي (positif) et سلبي (négatif).", "Tibaq ijabi : deux mots différents et contraires (ex. : حياة / موت).", "Tibaq salbi : le même mot sous forme affirmative et négative.", "Ici : يعلمون (affirmatif) / لا يعلمون (négatif) → tibaq salbi."]}',
  '{"arabe","rhétorique","badie","tibaq"}'
),
(
  '44444444-0000-0000-0000-000000000507',
  '33333333-0000-0000-0000-000000000075',
  'true_false', 2, 'fr',
  '{"stem": "Le jinas naqis (الجناس الناقص) est une paronomase où les deux mots sont parfaitement identiques en nombre de lettres, en type de lettres et en ordre des lettres.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. C''est la définition du jinas tamm (الجناس التامّ), pas du jinas naqis. Le jinas naqis (paronomase incomplète) désigne le cas où les deux mots se ressemblent dans la prononciation mais diffèrent par au moins un aspect : le nombre de lettres, le type de lettres, l''ordre des lettres, ou les signes diacritiques (tachkil). Exemple : « الجَدّ / الجِدّ » diffèrent par le tachkil.", "steps": ["Jinas tamm (تامّ) : mots identiques en forme, différents en sens.", "Jinas naqis (ناقص) : mots similaires mais avec au moins une différence formelle.", "Les différences possibles : nombre, type, ordre des lettres ou tachkil.", "L''énoncé décrit le jinas tamm, pas le jinas naqis → Faux."]}',
  '{"arabe","rhétorique","badie","jinas"}'
);
