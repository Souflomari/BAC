-- ============================================================
-- ARABIC CONTENT: Grammaire arabe (Nahou et Sarf) (3 skills, 21 items)
-- Topic: Grammaire arabe
-- Skills:
--   syntax_rules        (33333333-...-071) — 7 items (Règles syntaxiques/Nahou)
--   morphology           (33333333-...-072) — 7 items (Morphologie/Sarf)
--   grammatical_analysis (33333333-...-073) — 7 items (Analyse grammaticale/I'rab)
-- ============================================================

-- =====================
-- SKILL: syntax_rules (Règles syntaxiques / Nahou) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000473',
  '33333333-0000-0000-0000-000000000071',
  'mcq', 2, 'fr',
  '{"stem": "Dans la grammaire arabe, quelle est la voyelle caractéristique du cas nominatif (marfou'') ?", "choices": ["La damma (ضمّة)", "La fatha (فتحة)", "La kasra (كسرة)", "Le soukoun (سكون)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "En arabe, le cas nominatif (المرفوع) est marqué par la damma (ضمّة), c''est-à-dire la voyelle courte \"ou\" placée au-dessus de la dernière lettre du mot. Ce cas s''applique notamment au sujet (فاعل) et au mubtada''/khabar.", "steps": ["Le cas nominatif (marfou'') est l''un des quatre cas grammaticaux en arabe", "Il est marqué par la damma (ضمّة) sur la dernière lettre", "Exemples : جاءَ الطالبُ (l''étudiant est venu) — الطالبُ porte la damma car il est sujet (فاعل)"]}',
  '{"arabe","grammaire","nahou","i''rab"}'
),
(
  '44444444-0000-0000-0000-000000000474',
  '33333333-0000-0000-0000-000000000071',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence principale entre une phrase nominale (جملة اسمية) et une phrase verbale (جملة فعلية) en arabe ?", "choices": ["La phrase nominale commence par un nom, la phrase verbale commence par un verbe", "La phrase nominale n''a pas de verbe, la phrase verbale en a un", "La phrase nominale est au passé, la phrase verbale au présent", "La phrase nominale est interrogative, la phrase verbale est déclarative"], "correct_index": 0, "latex": false}',
  '{"text_fr": "En grammaire arabe, la classification d''une phrase dépend du mot par lequel elle commence. La phrase nominale (الجملة الاسمية) commence par un nom (اسم) et se compose d''un mubtada'' (مبتدأ) et d''un khabar (خبر). La phrase verbale (الجملة الفعلية) commence par un verbe (فعل).", "steps": ["La phrase nominale (الجملة الاسمية) commence par un nom", "Exemple : الطالبُ مجتهدٌ (L''étudiant est studieux)", "La phrase verbale (الجملة الفعلية) commence par un verbe", "Exemple : كتبَ الطالبُ الدرسَ (L''étudiant a écrit la leçon)", "Le critère est le premier mot de la phrase, pas la présence ou l''absence d''un verbe"]}',
  '{"arabe","grammaire","nahou","types_phrases"}'
),
(
  '44444444-0000-0000-0000-000000000475',
  '33333333-0000-0000-0000-000000000071',
  'mcq', 2, 'fr',
  '{"stem": "Dans la phrase nominale « الكتابُ مفيدٌ » (Le livre est utile), quel est le rôle grammatical de « الكتابُ » ?", "choices": ["Mubtada'' (مبتدأ) — sujet de la phrase nominale", "Khabar (خبر) — prédicat de la phrase nominale", "Faa''il (فاعل) — sujet du verbe", "Maf''oul bihi (مفعول به) — complément d''objet direct"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans une phrase nominale, le premier nom est le mubtada'' (مبتدأ), qui correspond au thème ou sujet de la phrase. Le deuxième élément est le khabar (خبر), qui apporte l''information sur le mubtada''. Ici, الكتابُ est le mubtada'' et مفيدٌ est le khabar.", "steps": ["الكتابُ مفيدٌ est une phrase nominale car elle commence par un nom", "الكتابُ = mubtada'' (مبتدأ) : c''est le sujet/thème", "مفيدٌ = khabar (خبر) : c''est le prédicat/information", "Les deux sont au cas nominatif (marfou'') avec la damma"]}',
  '{"arabe","grammaire","nahou","mubtada_khabar"}'
),
(
  '44444444-0000-0000-0000-000000000476',
  '33333333-0000-0000-0000-000000000071',
  'mcq', 3, 'fr',
  '{"stem": "Dans la phrase « إنَّ العلمَ نورٌ » (Certes, la science est lumière), pourquoi « العلمَ » porte-t-il la fatha ?", "choices": ["Parce que إنَّ met son nom (اسم إنّ) au cas accusatif (mansoub)", "Parce qu''il est complément d''objet direct", "Parce qu''il est un complément circonstanciel", "Parce qu''il est au cas génitif après une préposition"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les particules إنَّ et ses sœurs (إنّ وأخواتها) modifient la phrase nominale : elles mettent le mubtada'' au cas accusatif (mansoub avec la fatha) et il devient اسم إنّ, tandis que le khabar reste au cas nominatif (marfou'' avec la damma).", "steps": ["إنَّ fait partie des nawasikh (نواسخ) qui modifient la phrase nominale", "إنَّ met le mubtada'' au cas accusatif (mansoub) — il devient اسم إنّ", "Le khabar reste au cas nominatif (marfou'') — il devient خبر إنّ", "Donc العلمَ porte la fatha (accusatif) et نورٌ porte la damma (nominatif)"]}',
  '{"arabe","grammaire","nahou","inna_akhawatiha"}'
),
(
  '44444444-0000-0000-0000-000000000477',
  '33333333-0000-0000-0000-000000000071',
  'numeric', 3, 'fr',
  '{"stem": "Combien y a-t-il de cas grammaticaux (حالات الإعراب) pour les noms déclinables en arabe classique ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les noms déclinables en arabe classique connaissent trois cas grammaticaux : le nominatif (مرفوع — marfou''), l''accusatif (منصوب — mansoub) et le génitif (مجرور — majrour). Les verbes au présent (المضارع) possèdent en plus le cas apocopé (مجزوم — majzoum), mais celui-ci ne s''applique pas aux noms.", "steps": ["Le nominatif (المرفوع) marqué par la damma — pour le sujet, le mubtada'', le khabar", "L''accusatif (المنصوب) marqué par la fatha — pour le complément d''objet, le haal, le tamyiz", "Le génitif (المجرور) marqué par la kasra — après les prépositions et dans l''annexion", "Total pour les noms : 3 cas grammaticaux"]}',
  '{"arabe","grammaire","nahou","cas_grammaticaux"}'
),
(
  '44444444-0000-0000-0000-000000000478',
  '33333333-0000-0000-0000-000000000071',
  'true_false', 2, 'fr',
  '{"stem": "Dans une phrase verbale, le sujet (الفاعل) est toujours au cas nominatif (مرفوع).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le sujet du verbe (الفاعل) est toujours au cas nominatif (مرفوع) en arabe. Qu''il s''agisse d''un nom apparent ou d''un pronom, le faa''il porte obligatoirement la damma ou son équivalent. Cette règle est fondamentale en syntaxe arabe.", "steps": ["Le فاعل (sujet du verbe) est un des éléments essentiels de la phrase verbale", "Règle : الفاعل مرفوع دائماً (le sujet est toujours au nominatif)", "Exemple : كتبَ الطالبُ — الطالبُ porte la damma (nominatif)", "Cette règle n''admet aucune exception en arabe classique"]}',
  '{"arabe","grammaire","nahou","faa''il"}'
),
(
  '44444444-0000-0000-0000-000000000479',
  '33333333-0000-0000-0000-000000000071',
  'true_false', 3, 'fr',
  '{"stem": "En arabe, la phrase « كانَ الجوُّ جميلاً » (Le temps était beau) est une phrase verbale car elle commence par le verbe كانَ.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Bien que كانَ et ses sœurs (كان وأخواتها) soient des verbes dits « déficients » (أفعال ناقصة), la phrase qui commence par كانَ est classée comme une phrase verbale. كانَ modifie la phrase nominale en mettant le khabar au cas accusatif, mais la structure reste une phrase verbale car elle commence par un verbe.", "steps": ["كانَ est un verbe (فعل ناقص) même s''il est dit « déficient »", "Une phrase commençant par un verbe est une phrase verbale (جملة فعلية)", "كانَ garde le mubtada'' au nominatif (il devient اسم كان)", "كانَ met le khabar à l''accusatif (il devient خبر كان)", "Donc : الجوُّ = اسم كان (nominatif) et جميلاً = خبر كان (accusatif)"]}',
  '{"arabe","grammaire","nahou","kana_akhawatiha"}'
);

-- =====================
-- SKILL: morphology (Morphologie / Sarf) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000480',
  '33333333-0000-0000-0000-000000000072',
  'mcq', 2, 'fr',
  '{"stem": "En morphologie arabe (sarf), quel est le schème (وزن) du nom d''agent (اسم الفاعل) dérivé d''un verbe trilitère simple ?", "choices": ["فاعِل (faa''il)", "مَفعول (maf''oul)", "فَعيل (fa''il)", "تَفعيل (taf''il)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le nom d''agent (اسم الفاعل) dérivé d''un verbe trilitère simple (ثلاثي مجرّد) suit le schème فاعِل (faa''il). Il désigne celui qui accomplit l''action. Par exemple : كَتَبَ (écrire) → كاتِب (écrivain/celui qui écrit), عَلِمَ (savoir) → عالِم (savant).", "steps": ["Le nom d''agent (اسم الفاعل) désigne celui qui fait l''action", "Pour un verbe trilitère simple, le schème est فاعِل", "Exemples : كَتَبَ → كاتِب, دَرَسَ → دارِس, عَمِلَ → عامِل", "Pour les verbes augmentés, le schème change : on remplace la première lettre du mudari'' par مُ"]}',
  '{"arabe","grammaire","sarf","ism_faa''il"}'
),
(
  '44444444-0000-0000-0000-000000000481',
  '33333333-0000-0000-0000-000000000072',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le schème (وزن) du nom de patient (اسم المفعول) dérivé d''un verbe trilitère simple ?", "choices": ["مَفعول (maf''oul)", "فاعِل (faa''il)", "فَعّال (fa''''aal)", "مِفعال (mif''aal)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le nom de patient (اسم المفعول) dérivé d''un verbe trilitère simple suit le schème مَفعول (maf''oul). Il désigne celui qui subit l''action. Par exemple : كَتَبَ (écrire) → مَكتوب (écrit/ce qui est écrit), عَلِمَ (savoir) → مَعلوم (connu/su).", "steps": ["Le nom de patient (اسم المفعول) désigne celui qui subit l''action", "Pour un verbe trilitère simple, le schème est مَفعول", "Exemples : فَتَحَ → مَفتوح (ouvert), شَرِبَ → مَشروب (bu)", "Pour les verbes augmentés, on utilise le participe passif du mudari'' avec مُ"]}',
  '{"arabe","grammaire","sarf","ism_maf''oul"}'
),
(
  '44444444-0000-0000-0000-000000000482',
  '33333333-0000-0000-0000-000000000072',
  'mcq', 3, 'fr',
  '{"stem": "La forme d''intensité (صيغة المبالغة) « عَلاّم » (très savant) suit quel schème ?", "choices": ["فَعّال (fa''''aal)", "فاعِل (faa''il)", "فَعول (fa''oul)", "فَعيل (fa''il)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les formes d''intensité (صيغ المبالغة) sont des dérivés qui expriment l''intensité ou la fréquence de l''action. Le schème فَعّال (fa''''aal) est l''un des plus courants. Il existe cinq schèmes principaux : فَعّال, مِفعال, فَعول, فَعيل et فَعِل.", "steps": ["صيغة المبالغة exprime l''intensité, l''abondance ou la fréquence", "عَلاّم suit le schème فَعّال (avec doublement de la deuxième radicale)", "Les cinq schèmes principaux : فَعّال (غَفّار), مِفعال (مِقدام), فَعول (شَكور), فَعيل (عَليم), فَعِل (حَذِر)", "Ces formes sont plus intensives que le simple nom d''agent فاعِل"]}',
  '{"arabe","grammaire","sarf","sighat_mubaalagha"}'
),
(
  '44444444-0000-0000-0000-000000000483',
  '33333333-0000-0000-0000-000000000072',
  'mcq', 2, 'fr',
  '{"stem": "Le verbe « اِنكَسَرَ » (se casser) appartient à quelle forme (باب) verbale ?", "choices": ["Forme VII (اِنفَعَلَ)", "Forme V (تَفَعَّلَ)", "Forme VIII (اِفتَعَلَ)", "Forme X (اِستَفعَلَ)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le verbe اِنكَسَرَ suit le schème اِنفَعَلَ qui correspond à la forme VII (الباب السابع). Cette forme exprime généralement la voix passive ou réfléchie du verbe de base. La racine est ك-س-ر (casser), et la forme VII اِنكَسَرَ signifie « se casser, être cassé ».", "steps": ["On identifie la racine trilitère : ك-س-ر (كَسَرَ = casser)", "On repère le préfixe اِن- devant la racine", "Le schème اِن + فَعَلَ = اِنفَعَلَ correspond à la forme VII", "La forme VII exprime souvent le sens passif ou réfléchi : كَسَرَ (casser) → اِنكَسَرَ (se casser)"]}',
  '{"arabe","grammaire","sarf","abwab_fi''l"}'
),
(
  '44444444-0000-0000-0000-000000000484',
  '33333333-0000-0000-0000-000000000072',
  'numeric', 3, 'fr',
  '{"stem": "Combien de formes verbales augmentées (أبواب الفعل المزيد) possède le verbe trilitère en arabe classique ?", "correct_value": 12, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le verbe trilitère (ثلاثي) en arabe classique possède 12 formes augmentées (أبواب الفعل المزيد), numérotées de la forme II à la forme XIII (la forme I étant la forme de base مجرّد). Les plus courantes au programme du Bac sont les formes II à X.", "steps": ["La forme I (فَعَلَ) est la forme de base (مجرّد)", "Les formes augmentées ajoutent des lettres à la racine trilitère", "Formes courantes : II (فَعَّلَ), III (فاعَلَ), IV (أَفعَلَ), V (تَفَعَّلَ), VI (تَفاعَلَ), VII (اِنفَعَلَ), VIII (اِفتَعَلَ), IX (اِفعَلَّ), X (اِستَفعَلَ)", "Plus les formes rares XI, XII et XIII, soit 12 formes augmentées au total"]}',
  '{"arabe","grammaire","sarf","formes_verbales"}'
),
(
  '44444444-0000-0000-0000-000000000485',
  '33333333-0000-0000-0000-000000000072',
  'true_false', 2, 'fr',
  '{"stem": "Le nom d''agent (اسم الفاعل) du verbe augmenté se forme en remplaçant la lettre du présent (حرف المضارعة) par un مُ (mim avec damma).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Pour former le nom d''agent d''un verbe augmenté (غير ثلاثي مجرّد), on prend la forme du présent (المضارع), on remplace la lettre du présent (حرف المضارعة) par مُ et on met la kasra sur l''avant-dernière lettre. Exemple : يُدَرِّسُ → مُدَرِّس (enseignant).", "steps": ["Règle : pour les verbes augmentés, le nom d''agent se forme à partir du mudari'' (présent)", "On remplace حرف المضارعة (ي/ت/أ/ن) par مُ", "On met une kasra sur l''avant-dernière lettre", "Exemples : يُسافِرُ → مُسافِر (voyageur), يَستَعمِلُ → مُستَعمِل (utilisateur)"]}',
  '{"arabe","grammaire","sarf","ism_faa''il_augmente"}'
),
(
  '44444444-0000-0000-0000-000000000486',
  '33333333-0000-0000-0000-000000000072',
  'true_false', 3, 'fr',
  '{"stem": "Le masdar (المصدر) d''un verbe trilitère simple suit toujours un schème unique et régulier.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Contrairement aux verbes augmentés dont les masdars suivent des schèmes réguliers, le masdar du verbe trilitère simple (ثلاثي مجرّد) est sémantique (سماعي), c''est-à-dire qu''il doit être appris par l''usage et ne suit pas un schème unique. Les schèmes possibles sont nombreux : فَعْل, فُعول, فِعالة, فَعَل, etc.", "steps": ["Le masdar (المصدر) est le nom verbal (l''infinitif) en arabe", "Pour le verbe trilitère simple, le masdar est سماعي (appris par l''usage)", "Il existe de nombreux schèmes possibles : فَعْل (ضَرْب), فُعول (دُخول), فِعالة (كِتابة), فَعَل (طَلَب)", "En revanche, les masdars des verbes augmentés sont قياسي (réguliers/prévisibles)"]}',
  '{"arabe","grammaire","sarf","masdar"}'
);

-- =====================
-- SKILL: grammatical_analysis (Analyse grammaticale / I'rab) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000487',
  '33333333-0000-0000-0000-000000000073',
  'mcq', 2, 'fr',
  '{"stem": "Dans la phrase « قرأَ التلميذُ الدرسَ » (L''élève a lu la leçon), quel est le i''rab (الإعراب) de « الدرسَ » ?", "choices": ["Maf''oul bihi (مفعول به) mansoub avec la fatha", "Faa''il (فاعل) marfou'' avec la damma", "Mubtada'' (مبتدأ) marfou'' avec la damma", "Majrour (مجرور) avec la kasra"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans cette phrase verbale, « الدرسَ » est le complément d''objet direct (مفعول به) du verbe « قرأَ ». Le مفعول به est toujours au cas accusatif (منصوب), marqué ici par la fatha sur la dernière lettre.", "steps": ["قرأَ = verbe (فعل ماضٍ) au passé", "التلميذُ = sujet (فاعل) au nominatif (مرفوع بالضمّة)", "الدرسَ = complément d''objet direct (مفعول به) à l''accusatif (منصوب بالفتحة)", "Règle : le مفعول به est toujours منصوب"]}',
  '{"arabe","grammaire","i''rab","maf''oul_bihi"}'
),
(
  '44444444-0000-0000-0000-000000000488',
  '33333333-0000-0000-0000-000000000073',
  'mcq', 3, 'fr',
  '{"stem": "Dans la phrase « جاءَ الطالبُ مسرعاً » (L''étudiant est venu en se dépêchant), quel est le rôle grammatical de « مسرعاً » ?", "choices": ["Haal (حال) mansoub", "Tamyiz (تمييز) mansoub", "Khabar (خبر) marfou''", "Na''t (نعت) marfou''"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le mot « مسرعاً » est un complément d''état (حال). Le haal décrit l''état du sujet ou de l''objet au moment de l''action. Il est toujours au cas accusatif (منصوب) et le plus souvent indéfini (نكرة), tandis que son possesseur (صاحب الحال) est défini (معرفة).", "steps": ["مسرعاً décrit l''état de الطالبُ au moment de l''action جاءَ", "C''est donc un haal (حال) — complément d''état", "Le haal est toujours au cas accusatif (منصوب)", "Conditions du haal : il est نكرة (indéfini) et son صاحب الحال est معرفة (défini)", "Ici : الطالبُ (défini) est le صاحب الحال et مسرعاً (indéfini) est le حال"]}',
  '{"arabe","grammaire","i''rab","haal"}'
),
(
  '44444444-0000-0000-0000-000000000489',
  '33333333-0000-0000-0000-000000000073',
  'mcq', 3, 'fr',
  '{"stem": "Dans la phrase « ازدادَ الأمرُ صعوبةً » (La situation est devenue plus difficile), quel est le rôle grammatical de « صعوبةً » ?", "choices": ["Tamyiz (تمييز) mansoub", "Haal (حال) mansoub", "Maf''oul bihi (مفعول به) mansoub", "Maf''oul mutlaq (مفعول مطلق) mansoub"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le mot « صعوبةً » est un tamyiz (تمييز), c''est-à-dire un spécificatif qui lève l''ambiguïté sur la nature de l''augmentation. Le tamyiz est toujours au cas accusatif (منصوب) et indéfini (نكرة). Il se distingue du haal en ce qu''il précise la nature ou l''espèce, non l''état.", "steps": ["ازدادَ exprime une augmentation mais ne précise pas en quoi", "صعوبةً spécifie la nature de cette augmentation : en difficulté", "C''est un tamyiz (تمييز) — spécificatif", "Le tamyiz est toujours منصوب (accusatif) et نكرة (indéfini)", "Distinction avec le haal : le tamyiz répond à « en quoi ? », le haal à « comment ? »"]}',
  '{"arabe","grammaire","i''rab","tamyiz"}'
),
(
  '44444444-0000-0000-0000-000000000490',
  '33333333-0000-0000-0000-000000000073',
  'mcq', 2, 'fr',
  '{"stem": "Dans l''annexion (الإضافة) « كتابُ التلميذِ » (le livre de l''élève), quel est le cas grammatical de « التلميذِ » ?", "choices": ["Génitif (مجرور) avec la kasra", "Nominatif (مرفوع) avec la damma", "Accusatif (منصوب) avec la fatha", "Apocopé (مجزوم) avec le soukoun"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans une construction d''annexion (الإضافة), le deuxième terme est appelé مضاف إليه et il est toujours au cas génitif (مجرور). Ici, التلميذِ porte la kasra car il est مضاف إليه مجرور. Le premier terme (المضاف) prend son cas selon sa fonction dans la phrase et perd son tanwin.", "steps": ["كتابُ التلميذِ est une annexion (إضافة)", "كتابُ = مضاف (annexé) — son cas dépend de sa fonction dans la phrase", "التلميذِ = مضاف إليه — toujours au génitif (مجرور)", "Règle : المضاف إليه مجرور دائماً (le complément d''annexion est toujours au génitif)", "Le مضاف perd son tanwin et son article الـ"]}',
  '{"arabe","grammaire","i''rab","idafa"}'
),
(
  '44444444-0000-0000-0000-000000000491',
  '33333333-0000-0000-0000-000000000073',
  'numeric', 3, 'fr',
  '{"stem": "Combien de types de khabar (خبر) existe-t-il dans la grammaire arabe classique ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Il existe trois types de khabar (خبر) en grammaire arabe : 1) Le khabar mufrad (خبر مفرد) — un mot unique, 2) Le khabar joumla (خبر جملة) — une phrase entière (nominale ou verbale), 3) Le khabar chibh joumla (خبر شبه جملة) — un quasi-phrase (préposition + nom ou adverbe de lieu/temps).", "steps": ["1. خبر مفرد (khabar simple) : mot unique — ex. الجوُّ جميلٌ", "2. خبر جملة (khabar phrase) : phrase verbale ou nominale — ex. الطالبُ يدرسُ", "3. خبر شبه جملة (khabar quasi-phrase) : préposition + nom ou adverbe — ex. الكتابُ على الطاولةِ", "Total : 3 types de khabar"]}',
  '{"arabe","grammaire","i''rab","khabar"}'
),
(
  '44444444-0000-0000-0000-000000000492',
  '33333333-0000-0000-0000-000000000073',
  'true_false', 2, 'fr',
  '{"stem": "Le verbe au présent (المضارع) est toujours au cas nominatif (مرفوع) en arabe.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le verbe au présent (المضارع) est au cas nominatif (مرفوع) uniquement lorsqu''il n''est précédé d''aucune particule de nassb ou de jazm. Il passe à l''accusatif (منصوب) après les particules de nassb (أنْ, لنْ, كيْ, لامُ التعليل) et à l''apocopé (مجزوم) après les particules de jazm (لمْ, لا الناهية, لامُ الأمر).", "steps": ["Le المضارع est مرفوع par défaut (sans particule)", "Il devient منصوب après les particules de nassb : أنْ, لنْ, كيْ, إذنْ", "Il devient مجزوم après les particules de jazm : لمْ, لمّا, لا الناهية, لامُ الأمر", "Exemple : يكتبُ (nominatif) / لن يكتبَ (accusatif) / لم يكتبْ (apocopé)", "Donc il n''est PAS toujours au nominatif"]}',
  '{"arabe","grammaire","i''rab","fi''l_mudari"}'
),
(
  '44444444-0000-0000-0000-000000000493',
  '33333333-0000-0000-0000-000000000073',
  'true_false', 3, 'fr',
  '{"stem": "Dans l''analyse grammaticale (الإعراب), les cinq noms (الأسماء الخمسة : أبو، أخو، حمو، فو، ذو) se déclinent avec des lettres au lieu des voyelles courtes.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les cinq noms (الأسماء الخمسة) constituent une catégorie spéciale en arabe. Ils se déclinent avec des lettres longues au lieu des voyelles courtes habituelles : le واو pour le nominatif (marfou''), le ألف pour l''accusatif (mansoub), et le ياء pour le génitif (majrour). Cette déclinaison s''applique sous certaines conditions.", "steps": ["Les الأسماء الخمسة sont : أبو (père), أخو (frère), حمو (beau-père), فو (bouche), ذو (possesseur)", "Au nominatif : أبوكَ (avec واو au lieu de la damma)", "À l''accusatif : أباكَ (avec ألف au lieu de la fatha)", "Au génitif : أبيكَ (avec ياء au lieu de la kasra)", "Conditions : ils doivent être au singulier, annexés (مضاف), et non annexés au ياء du locuteur"]}',
  '{"arabe","grammaire","i''rab","asma_khamsa"}'
);
