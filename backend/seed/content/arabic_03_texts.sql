-- ============================================================
-- ARABIC CONTENT: Textes et expression arabe (3 skills, 21 items)
-- Skills:
--   text_comprehension (33333333-...-076) difficulty 2 — 7 items
--   literary_analysis   (33333333-...-077) difficulty 2 — 7 items
--   essay_ar            (33333333-...-078) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: text_comprehension (Compréhension de texte arabe) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000508',
  '33333333-0000-0000-0000-000000000076',
  'mcq', 2, 'fr',
  '{"stem": "Lors de la lecture d''un texte arabe, quelle est la première étape pour identifier l''idée principale ?", "choices": ["Repérer la phrase-clé qui résume l''ensemble du texte", "Compter le nombre de paragraphes", "Chercher les figures de style utilisées", "Analyser la biographie de l''auteur"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''idée principale d''un texte est le message central que l''auteur veut transmettre. Elle se repère souvent dans la première ou la dernière phrase du texte, ou dans une phrase récurrente qui résume l''ensemble.", "steps": ["Lire le texte intégralement une première fois", "Repérer la phrase ou le passage qui condense le sens global", "Vérifier que les autres paragraphes gravitent autour de cette idée", "Formuler l''idée principale en une phrase claire"]}',
  '{"arabe","textes","compréhension","idée_principale"}'
),
(
  '44444444-0000-0000-0000-000000000509',
  '33333333-0000-0000-0000-000000000076',
  'mcq', 2, 'fr',
  '{"stem": "Qu''appelle-t-on le « champ lexical » dans un texte arabe ?", "choices": ["L''ensemble des mots se rapportant à un même thème", "La liste des verbes conjugués dans le texte", "Les mots empruntés à d''autres langues", "Les connecteurs logiques utilisés par l''auteur"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le champ lexical est un ensemble de mots (noms, verbes, adjectifs, adverbes) qui se rapportent à un même thème ou une même notion dans un texte. Il permet de déterminer le thème dominant du passage.", "steps": ["Relever tous les mots liés à un même thème dans le texte", "Regrouper ces mots par catégorie grammaticale", "Identifier le thème commun qui les relie", "Déduire l''intention de l''auteur à travers ce champ lexical"]}',
  '{"arabe","textes","compréhension","champ_lexical"}'
),
(
  '44444444-0000-0000-0000-000000000510',
  '33333333-0000-0000-0000-000000000076',
  'mcq', 2, 'fr',
  '{"stem": "Les idées secondaires dans un texte arabe servent principalement à :", "choices": ["Développer, illustrer ou nuancer l''idée principale", "Contredire systématiquement l''idée principale", "Introduire un nouveau sujet sans lien avec le texte", "Résumer le texte en une seule phrase"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les idées secondaires ont pour rôle de soutenir l''idée principale. Elles la développent par des exemples, des arguments, des illustrations ou des nuances, assurant ainsi la cohérence et la richesse du texte.", "steps": ["Identifier l''idée principale du texte", "Repérer les paragraphes qui apportent des précisions ou des exemples", "Vérifier le lien logique entre chaque idée secondaire et l''idée principale", "Classer les idées secondaires selon leur fonction : illustration, argument, nuance"]}',
  '{"arabe","textes","compréhension","idées_secondaires"}'
),
(
  '44444444-0000-0000-0000-000000000511',
  '33333333-0000-0000-0000-000000000076',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de lecture permet de saisir rapidement le thème général d''un texte arabe avant une analyse approfondie ?", "choices": ["La lecture survol (qira''a sari''a)", "La lecture analytique mot à mot", "La lecture à voix haute uniquement", "La lecture des notes de bas de page"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La lecture survol (ou lecture rapide / qira''a sari''a) consiste à parcourir rapidement le texte pour en saisir le thème général, la structure et les mots-clés avant de procéder à une lecture détaillée.", "steps": ["Parcourir le titre, le chapeau et les sous-titres s''ils existent", "Lire la première et la dernière phrase de chaque paragraphe", "Repérer les mots-clés et les termes récurrents", "Formuler une hypothèse sur le thème général du texte"]}',
  '{"arabe","textes","compréhension","méthodologie"}'
),
(
  '44444444-0000-0000-0000-000000000512',
  '33333333-0000-0000-0000-000000000076',
  'numeric', 2, 'fr',
  '{"stem": "Un texte arabe comporte 4 paragraphes. Le premier expose l''idée principale, le deuxième et le troisième développent chacun une idée secondaire, et le quatrième conclut. Combien d''idées secondaires ce texte contient-il ?", "correct_value": 2, "tolerance": 0, "latex": false}',
  '{"text_fr": "Dans cette structure classique, le texte comporte exactement 2 idées secondaires, développées respectivement dans le deuxième et le troisième paragraphe. L''introduction et la conclusion ne sont pas des idées secondaires.", "steps": ["Paragraphe 1 : introduction avec l''idée principale", "Paragraphe 2 : première idée secondaire (développement)", "Paragraphe 3 : deuxième idée secondaire (développement)", "Paragraphe 4 : conclusion — ne compte pas comme idée secondaire", "Total : 2 idées secondaires"]}',
  '{"arabe","textes","compréhension","structure"}'
),
(
  '44444444-0000-0000-0000-000000000513',
  '33333333-0000-0000-0000-000000000076',
  'true_false', 2, 'fr',
  '{"stem": "Le champ lexical de la nature dans un texte arabe peut inclure des mots comme : شجرة (arbre), نهر (rivière), سماء (ciel), زهرة (fleur).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Ces quatre mots appartiennent bien au champ lexical de la nature. Ils désignent tous des éléments du monde naturel et contribuent à créer une atmosphère liée à la nature dans le texte.", "steps": ["شجرة (arbre) — élément végétal de la nature", "نهر (rivière) — élément aquatique de la nature", "سماء (ciel) — élément atmosphérique de la nature", "زهرة (fleur) — élément végétal de la nature", "Tous ces mots se rapportent au même thème : la nature"]}',
  '{"arabe","textes","compréhension","champ_lexical"}'
),
(
  '44444444-0000-0000-0000-000000000514',
  '33333333-0000-0000-0000-000000000076',
  'true_false', 2, 'fr',
  '{"stem": "Dans un texte arabe argumentatif, les connecteurs logiques (لأن، لكن، إذن) n''ont aucune importance pour la compréhension de la progression des idées.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Les connecteurs logiques sont essentiels dans un texte argumentatif arabe. Ils structurent le raisonnement et permettent de comprendre les relations entre les idées : cause (لأن - parce que), opposition (لكن - mais), conséquence (إذن - donc).", "steps": ["لأن (parce que) introduit une cause ou une justification", "لكن (mais) marque une opposition ou une concession", "إذن (donc) introduit une conséquence ou une conclusion", "Ces connecteurs sont indispensables pour suivre la logique du texte"]}',
  '{"arabe","textes","compréhension","connecteurs"}'
);

-- =====================
-- SKILL: literary_analysis (Analyse littéraire arabe) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000515',
  '33333333-0000-0000-0000-000000000077',
  'mcq', 2, 'fr',
  '{"stem": "Le genre littéraire arabe « المقامة » (maqama) se caractérise principalement par :", "choices": ["Un récit en prose rimée mettant en scène un personnage rusé et éloquent", "Un long poème épique célébrant les batailles", "Une pièce de théâtre en vers classiques", "Un recueil de proverbes populaires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La maqama (المقامة) est un genre littéraire arabe classique constitué de récits courts en prose rimée et rythmée (saj''). Elle met en scène un narrateur et un protagoniste rusé et éloquent qui vit des aventures variées. Les plus célèbres sont celles d''al-Hamadhani et d''al-Hariri.", "steps": ["La maqama est écrite en prose rimée (saj'') et non en vers", "Elle met en scène un personnage principal rusé et éloquent", "Le récit est rapporté par un narrateur récurrent", "Al-Hamadhani (Xe siècle) en est considéré comme le fondateur", "Al-Hariri (XIe siècle) en a perfectionné le genre"]}',
  '{"arabe","textes","analyse_littéraire","maqama"}'
),
(
  '44444444-0000-0000-0000-000000000516',
  '33333333-0000-0000-0000-000000000077',
  'mcq', 2, 'fr',
  '{"stem": "Dans la littérature arabe, le terme « الشعر الحر » (chi''r hurr) désigne :", "choices": ["La poésie libre qui s''affranchit des règles métriques classiques", "La poésie classique à mètre fixe (qasida)", "La prose narrative romanesque", "Le théâtre poétique traditionnel"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le chi''r hurr (الشعر الحر), ou vers libre arabe, est un mouvement poétique apparu au milieu du XXe siècle. Il s''affranchit du mètre unique (bahr) et de la rime unique (qafiya) de la qasida classique, tout en conservant le rythme fondé sur les taf''ilat (pieds métriques).", "steps": ["La qasida classique impose un mètre unique et une rime unique", "Le chi''r hurr (vers libre) abandonne ces contraintes fixes", "Nazik al-Mala''ika et Badr Shakir al-Sayyab en sont les pionniers (années 1940)", "Le vers libre conserve un rythme basé sur les pieds métriques (taf''ilat)", "Ce mouvement marque le passage à la modernité poétique arabe"]}',
  '{"arabe","textes","analyse_littéraire","poésie_moderne"}'
),
(
  '44444444-0000-0000-0000-000000000517',
  '33333333-0000-0000-0000-000000000077',
  'mcq', 2, 'fr',
  '{"stem": "Quel mouvement littéraire arabe du XXe siècle prône le renouveau de la littérature en s''inspirant des formes occidentales tout en préservant l''identité arabe ?", "choices": ["Le mouvement moderniste (الحداثة)", "Le mouvement jahilite pré-islamique", "Le mouvement abbasside classique", "Le mouvement andalou médiéval"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le mouvement moderniste arabe (الحداثة / al-hadatha) émerge au XXe siècle. Il vise à renouveler la littérature arabe en intégrant des influences occidentales (symbolisme, surréalisme) tout en préservant l''identité culturelle arabe. Des revues comme « شعر » (Chi''r) à Beyrouth en ont été le fer de lance.", "steps": ["Le mouvement moderniste naît au milieu du XXe siècle", "Il s''inspire des courants littéraires occidentaux (symbolisme, existentialisme)", "Il cherche à dépasser les formes classiques jugées rigides", "La revue « Chi''r » (Beyrouth, 1957) en est un vecteur majeur", "Il préserve néanmoins la langue arabe et l''identité culturelle"]}',
  '{"arabe","textes","analyse_littéraire","modernisme"}'
),
(
  '44444444-0000-0000-0000-000000000518',
  '33333333-0000-0000-0000-000000000077',
  'mcq', 3, 'fr',
  '{"stem": "Dans l''analyse d''un texte littéraire arabe, la « tonalité » (النبرة) d''un passage désigne :", "choices": ["L''impression générale qui se dégage du texte (lyrique, satirique, tragique, etc.)", "Le nombre de syllabes par vers dans un poème", "Le dialecte régional utilisé par l''auteur", "La ponctuation employée dans le texte"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La tonalité (النبرة / al-nabra) est l''atmosphère ou l''impression générale qui émane d''un texte littéraire. Elle peut être lyrique (expression des sentiments), satirique (critique moqueuse), tragique (registre du malheur), épique (célébration des exploits), etc.", "steps": ["La tonalité lyrique exprime les sentiments et émotions de l''auteur", "La tonalité satirique critique la société avec ironie ou moquerie", "La tonalité tragique évoque le malheur, la fatalité, la souffrance", "La tonalité épique célèbre les exploits et les valeurs héroïques", "Identifier la tonalité aide à comprendre l''intention de l''auteur"]}',
  '{"arabe","textes","analyse_littéraire","tonalité"}'
),
(
  '44444444-0000-0000-0000-000000000519',
  '33333333-0000-0000-0000-000000000077',
  'numeric', 2, 'fr',
  '{"stem": "La qasida arabe classique se compose traditionnellement de trois parties principales : le nasib (prélude amoureux), le rahil (voyage) et le gharad (but du poème). Combien de parties principales comporte-t-elle ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "La qasida classique arabe suit une structure tripartite codifiée : le nasib (نسيب) ou prélude élégiaque et amoureux, le rahil (رحيل) ou description du voyage à travers le désert, et le gharad (غرض) ou objectif du poème (éloge, satire, etc.).", "steps": ["Partie 1 — Le nasib (نسيب) : prélude amoureux, évocation nostalgique", "Partie 2 — Le rahil (رحيل) : description du voyage et du désert", "Partie 3 — Le gharad (غرض) : le but du poème (madih/éloge, hija''/satire, etc.)", "Total : 3 parties principales"]}',
  '{"arabe","textes","analyse_littéraire","qasida"}'
),
(
  '44444444-0000-0000-0000-000000000520',
  '33333333-0000-0000-0000-000000000077',
  'true_false', 2, 'fr',
  '{"stem": "Le genre « القصة القصيرة » (qissa qasira) désigne la nouvelle (récit court) dans la littérature arabe moderne.", "correct_answer": true, "latex": false}',
  '{"text_fr": "القصة القصيرة (al-qissa al-qasira) signifie littéralement « le récit court » et correspond au genre de la nouvelle dans la littérature arabe moderne. Ce genre s''est développé au XXe siècle sous l''influence de la nouvelle occidentale, avec des auteurs majeurs comme Naguib Mahfouz et Youssef Idris.", "steps": ["قصة (qissa) signifie « récit » ou « histoire »", "قصيرة (qasira) signifie « courte »", "Ce genre correspond à la « nouvelle » en littérature française", "Il s''est imposé dans la littérature arabe au XXe siècle", "Naguib Mahfouz et Youssef Idris en sont des représentants majeurs"]}',
  '{"arabe","textes","analyse_littéraire","qissa"}'
),
(
  '44444444-0000-0000-0000-000000000521',
  '33333333-0000-0000-0000-000000000077',
  'true_false', 3, 'fr',
  '{"stem": "La prose arabe classique (النثر) n''existait pas avant l''époque abbasside ; seule la poésie (الشعر) était pratiquée.", "correct_answer": false, "latex": false}',
  '{"text_fr": "La prose arabe (النثر / al-nathr) existait bien avant l''époque abbasside. Dès l''époque pré-islamique (الجاهلية), on trouvait des formes de prose telles que les proverbes (أمثال), les discours (خطب) et la prose rimée (سجع). L''époque abbasside a certes enrichi la prose avec de nouveaux genres (maqama, épîtres), mais elle n''en est pas l''origine.", "steps": ["La prose pré-islamique comprenait les proverbes (أمثال) et les discours (خطب)", "La prose rimée (سجع / saj'') existait déjà chez les devins pré-islamiques", "Le Coran utilise la prose rimée comme forme littéraire majeure", "L''époque abbasside a développé de nouveaux genres en prose (maqama, rasa''il)", "Affirmer que la prose n''existait pas avant les Abbassides est donc faux"]}',
  '{"arabe","textes","analyse_littéraire","nathr"}'
);

-- =====================
-- SKILL: essay_ar (Expression écrite arabe) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000522',
  '33333333-0000-0000-0000-000000000078',
  'mcq', 2, 'fr',
  '{"stem": "Lors de la rédaction d''un sujet de réflexion en arabe au Bac, quelle est la structure attendue ?", "choices": ["Introduction, développement (avec arguments et exemples), conclusion", "Un seul paragraphe continu sans structure particulière", "Une liste numérotée de réponses courtes", "Un dialogue entre deux personnages fictifs"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le sujet de réflexion (موضوع إنشائي) au Bac suit une structure tripartite classique : une introduction qui présente le sujet et la problématique, un développement structuré en paragraphes avec des arguments illustrés par des exemples, et une conclusion qui synthétise et ouvre sur une perspective.", "steps": ["Introduction : amener le sujet, poser la problématique, annoncer le plan", "Développement : 2 à 3 parties avec arguments et exemples", "Chaque argument doit être illustré par un exemple précis", "Conclusion : synthèse des idées et ouverture", "Utiliser les connecteurs logiques pour assurer la cohérence"]}',
  '{"arabe","textes","expression_écrite","sujet_réflexion"}'
),
(
  '44444444-0000-0000-0000-000000000523',
  '33333333-0000-0000-0000-000000000078',
  'mcq', 2, 'fr',
  '{"stem": "Dans un commentaire dirigé (تحليل نص موجه) en arabe, quelle est la démarche correcte pour répondre aux questions ?", "choices": ["Lire le texte, repérer les éléments pertinents, puis répondre en citant le texte", "Répondre directement sans relire le texte", "Recopier des passages entiers du texte sans commentaire", "Donner son avis personnel sans se référer au texte"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le commentaire dirigé (تحليل نص موجه) exige une démarche méthodique : lire attentivement le texte, identifier les éléments demandés par chaque question, formuler des réponses en s''appuyant sur des citations du texte, puis apporter une analyse personnelle si cela est demandé.", "steps": ["Lire le texte au moins deux fois attentivement", "Lire toutes les questions avant de commencer à répondre", "Repérer dans le texte les passages pertinents pour chaque question", "Formuler la réponse en citant le texte entre guillemets", "Ajouter une analyse ou un commentaire personnel si la question le demande"]}',
  '{"arabe","textes","expression_écrite","commentaire_dirigé"}'
),
(
  '44444444-0000-0000-0000-000000000524',
  '33333333-0000-0000-0000-000000000078',
  'mcq', 2, 'fr',
  '{"stem": "Lors de la rédaction d''un résumé de texte arabe, quelle règle fondamentale faut-il respecter ?", "choices": ["Reformuler les idées essentielles sans ajouter d''idées personnelles", "Recopier les phrases du texte mot à mot", "Ajouter des arguments supplémentaires pour enrichir le texte", "Rédiger un texte plus long que l''original pour plus de détails"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le résumé (تلخيص) consiste à reformuler les idées essentielles du texte de manière concise, en utilisant ses propres mots, sans ajouter d''idées personnelles ni de commentaires. Le résumé doit respecter l''ordre des idées du texte original et représenter environ un quart de sa longueur.", "steps": ["Identifier les idées principales et secondaires du texte", "Éliminer les exemples, les répétitions et les détails accessoires", "Reformuler avec ses propres mots (pas de copier-coller)", "Respecter l''ordre des idées du texte original", "Le résumé doit faire environ 1/4 de la longueur du texte original"]}',
  '{"arabe","textes","expression_écrite","résumé"}'
),
(
  '44444444-0000-0000-0000-000000000525',
  '33333333-0000-0000-0000-000000000078',
  'mcq', 3, 'fr',
  '{"stem": "Pour assurer la cohérence d''une production écrite en arabe, quel élément est indispensable entre les paragraphes ?", "choices": ["Les connecteurs logiques (أدوات الربط) adaptés au rapport entre les idées", "Des phrases exclamatives à chaque début de paragraphe", "Des citations en langue étrangère", "Des titres numérotés pour chaque phrase"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les connecteurs logiques (أدوات الربط) sont essentiels pour assurer la cohérence et la fluidité d''une production écrite en arabe. Ils expriment les relations logiques entre les idées : addition (و، كذلك), opposition (لكن، غير أن), cause (لأن، بسبب), conséquence (لذلك، إذن), etc.", "steps": ["Les connecteurs d''addition : و (et), كذلك (de même), بالإضافة إلى (en plus de)", "Les connecteurs d''opposition : لكن (mais), غير أن (cependant), رغم (malgré)", "Les connecteurs de cause : لأن (parce que), بسبب (à cause de), إذ (puisque)", "Les connecteurs de conséquence : لذلك (c''est pourquoi), إذن (donc), وبالتالي (par conséquent)", "Choisir le connecteur approprié selon le rapport logique entre les idées"]}',
  '{"arabe","textes","expression_écrite","connecteurs"}'
),
(
  '44444444-0000-0000-0000-000000000526',
  '33333333-0000-0000-0000-000000000078',
  'numeric', 2, 'fr',
  '{"stem": "La méthodologie de rédaction d''un sujet de réflexion au Bac en arabe comporte généralement trois grandes étapes de planification avant la rédaction proprement dite : la lecture et compréhension du sujet, l''élaboration du plan, et la collecte des arguments. Combien d''étapes de planification y a-t-il ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Avant de rédiger, l''élève doit suivre 3 étapes de planification : (1) lire et comprendre le sujet pour bien cerner la problématique, (2) élaborer un plan détaillé organisant les idées en parties et sous-parties, et (3) collecter les arguments et exemples pertinents pour chaque partie.", "steps": ["Étape 1 : Lire le sujet, souligner les mots-clés, reformuler la problématique", "Étape 2 : Construire un plan (introduction, 2-3 parties de développement, conclusion)", "Étape 3 : Rassembler les arguments, exemples et citations pour chaque partie", "Total : 3 étapes de planification avant la rédaction"]}',
  '{"arabe","textes","expression_écrite","méthodologie"}'
),
(
  '44444444-0000-0000-0000-000000000527',
  '33333333-0000-0000-0000-000000000078',
  'true_false', 2, 'fr',
  '{"stem": "Dans une production écrite en arabe au Bac, il est recommandé d''utiliser le registre de langue soutenu (الفصحى) et d''éviter les expressions dialectales (العامية).", "correct_answer": true, "latex": false}',
  '{"text_fr": "Au Bac, toute production écrite en arabe doit être rédigée en arabe standard moderne (الفصحى / al-fusha), qui est la langue officielle de l''enseignement et des examens. L''utilisation d''expressions dialectales (العامية / al-''amiyya) est pénalisée car elle ne correspond pas au registre attendu.", "steps": ["الفصحى (al-fusha) est l''arabe standard/soutenu utilisé à l''écrit", "العامية (al-''amiyya) désigne les dialectes parlés au quotidien", "Le Bac exige l''usage de la fusha dans toutes les épreuves", "Les expressions dialectales sont considérées comme des erreurs de registre", "Le candidat doit maîtriser le vocabulaire et la syntaxe de la fusha"]}',
  '{"arabe","textes","expression_écrite","registre_langue"}'
),
(
  '44444444-0000-0000-0000-000000000528',
  '33333333-0000-0000-0000-000000000078',
  'true_false', 2, 'fr',
  '{"stem": "Dans un résumé de texte arabe, il est permis d''ajouter ses propres opinions et commentaires pour enrichir le contenu.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Le résumé (تلخيص) exige une fidélité stricte aux idées du texte original. Il est interdit d''y ajouter ses propres opinions, commentaires ou idées nouvelles. Le résumé doit se limiter à reformuler de manière concise les idées essentielles du texte, en respectant leur ordre et sans aucun ajout personnel.", "steps": ["Le résumé est un exercice de reformulation fidèle, pas d''expression personnelle", "Il faut se limiter aux idées présentes dans le texte original", "Aucun commentaire, jugement ou opinion personnelle n''est accepté", "Seule la reformulation concise des idées essentielles est attendue", "Ajouter des idées personnelles est une erreur méthodologique sanctionnée"]}',
  '{"arabe","textes","expression_écrite","résumé"}'
);
