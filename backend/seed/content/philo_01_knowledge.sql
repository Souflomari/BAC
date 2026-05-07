-- ============================================================
-- PHILOSOPHIE CONTENT: La connaissance (3 skills, 21 items)
-- Skills:
--   truth_opinion       (33333333-...-055) difficulty 3 — 7 items
--   theory_experience   (33333333-...-056) difficulty 3 — 7 items
--   science_philosophy  (33333333-...-057) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: truth_opinion (Verite et opinion) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000361',
  '33333333-0000-0000-0000-000000000055',
  'mcq', 3, 'fr',
  '{"stem": "Selon Platon, quelle est la difference fondamentale entre l''opinion (doxa) et la verite (episteme) ?", "choices": ["L''opinion est une croyance sans fondement rationnel, tandis que la verite est un savoir justifie et stable", "L''opinion et la verite sont identiques car elles visent toutes deux le reel", "L''opinion est superieure a la verite car elle est plus accessible", "La verite est une forme d''opinion partagee par la majorite"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Chez Platon, l''opinion (doxa) se situe entre l''ignorance et le savoir. Elle peut etre vraie par hasard mais reste instable car elle n''est pas fondee sur la raison. La verite (episteme) est un savoir certain, fonde sur la connaissance des Idees (ou Formes) et justifie par le raisonnement dialectique.", "steps": ["L''opinion (doxa) est une croyance qui peut etre vraie ou fausse", "La verite (episteme) est un savoir fonde rationnellement", "Platon distingue les deux dans la Republique (allegorie de la ligne)"]}',
  '{"philosophie","connaissance","verite","platon"}'
),
(
  '44444444-0000-0000-0000-000000000362',
  '33333333-0000-0000-0000-000000000055',
  'mcq', 3, 'fr',
  '{"stem": "Descartes, dans les Meditations metaphysiques, propose un critere de verite. Lequel ?", "choices": ["L''evidence : ce qui est clair et distinct est vrai", "Le consensus : ce qui est accepte par tous est vrai", "L''utilite : ce qui est utile est vrai", "La tradition : ce qui est ancien est vrai"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Descartes etablit le critere de l''evidence comme fondement de la verite. Apres le doute methodique, il decouvre que seules les idees claires et distinctes sont vraies. Le Cogito (je pense, donc je suis) est le premier exemple d''une telle evidence.", "steps": ["Descartes applique le doute methodique pour eliminer les opinions incertaines", "Il decouvre le Cogito comme premiere certitude", "Le critere de verite est la clarte et la distinction de l''idee"]}',
  '{"philosophie","connaissance","verite","descartes"}'
),
(
  '44444444-0000-0000-0000-000000000363',
  '33333333-0000-0000-0000-000000000055',
  'mcq', 3, 'fr',
  '{"stem": "Quel philosophe a soutenu que la verite est une adequation entre l''esprit et la chose (adaequatio rei et intellectus) ?", "choices": ["Thomas d''Aquin", "Friedrich Nietzsche", "David Hume", "Jean-Paul Sartre"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La theorie de la verite-correspondance, formulee classiquement par Thomas d''Aquin, definit la verite comme l''adequation (la conformite) entre le jugement de l''esprit et la realite. Cette conception reste un point de reference fondamental dans l''histoire de la philosophie.", "steps": ["La verite-correspondance : la pensee doit correspondre a la realite", "Thomas d''Aquin reprend et systematise cette definition d''origine aristotelicienne", "Cette definition s''oppose aux conceptions pragmatistes ou coherentistes de la verite"]}',
  '{"philosophie","connaissance","verite","thomas_aquin"}'
),
(
  '44444444-0000-0000-0000-000000000364',
  '33333333-0000-0000-0000-000000000055',
  'mcq', 3, 'fr',
  '{"stem": "Dans l''allegorie de la caverne de Platon, que representent les ombres projetees sur le mur ?", "choices": ["Les opinions et les apparences sensibles prises pour la realite", "Les verites scientifiques demontrees", "Les idees innees de l''ame", "Les lois morales universelles"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans l''allegorie de la caverne (Republique, livre VII), les prisonniers prennent les ombres pour la realite. Ces ombres symbolisent les opinions (doxa) et les illusions des sens. Le parcours du prisonnier libere vers la lumiere du soleil represente l''acces a la verite philosophique par la connaissance des Idees.", "steps": ["Les ombres representent les opinions et les illusions sensibles", "Les prisonniers vivent dans l''ignorance en croyant connaitre le reel", "La sortie de la caverne symbolise l''acces a la verite par la raison"]}',
  '{"philosophie","connaissance","verite","platon","allegorie"}'
),
(
  '44444444-0000-0000-0000-000000000365',
  '33333333-0000-0000-0000-000000000055',
  'numeric', 3, 'fr',
  '{"stem": "En quelle annee Descartes a-t-il publie les Meditations metaphysiques, oeuvre fondamentale sur la recherche de la verite ?", "correct_value": 1641, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Les Meditations metaphysiques (Meditationes de Prima Philosophia) ont ete publiees en 1641. Dans cet ouvrage, Descartes met en oeuvre le doute methodique pour atteindre une premiere certitude indubitable : le Cogito.", "steps": ["Les Meditations metaphysiques sont publiees en 1641 en latin", "L''ouvrage contient six meditations", "Descartes y etablit le doute methodique et decouvre le Cogito"]}',
  '{"philosophie","connaissance","verite","descartes","date"}'
),
(
  '44444444-0000-0000-0000-000000000366',
  '33333333-0000-0000-0000-000000000055',
  'true_false', 2, 'fr',
  '{"statement": "Selon Descartes, le doute methodique consiste a rejeter definitivement toutes les connaissances comme fausses.", "correct_answer": false}',
  '{"text_fr": "Le doute cartesien n''est pas un doute sceptique definitif. C''est un doute methodique et provisoire : Descartes suspend temporairement son assentiment a toute croyance susceptible d''etre fausse, afin de trouver une verite absolument certaine (le Cogito). Il ne rejette pas tout definitivement.", "steps": ["Le doute methodique est provisoire, non definitif", "Il sert d''outil pour trouver une certitude indubitable", "Il se distingue du doute sceptique qui nie toute possibilite de verite"]}',
  '{"philosophie","connaissance","verite","descartes","doute"}'
),
(
  '44444444-0000-0000-0000-000000000367',
  '33333333-0000-0000-0000-000000000055',
  'true_false', 3, 'fr',
  '{"statement": "Pour Platon, l''opinion vraie est equivalente a la science (episteme) car elle atteint le meme resultat.", "correct_answer": false}',
  '{"text_fr": "Platon distingue clairement l''opinion vraie de la science dans le Menon et le Theetete. Meme lorsque l''opinion est vraie, elle reste instable car elle n''est pas attachee par un raisonnement (logismos). La science (episteme) suppose une justification rationnelle qui rend le savoir stable et fiable.", "steps": ["L''opinion vraie peut donner le bon resultat par hasard", "Mais elle est instable car non fondee sur un raisonnement", "La science (episteme) exige une justification rationnelle : c''est une opinion vraie accompagnee d''un logos"]}',
  '{"philosophie","connaissance","verite","platon","opinion"}'
);

-- =====================
-- SKILL: theory_experience (Theorie et experience) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000368',
  '33333333-0000-0000-0000-000000000056',
  'mcq', 3, 'fr',
  '{"stem": "Selon l''empirisme de David Hume, d''ou proviennent toutes nos connaissances ?", "choices": ["De l''experience sensible (impressions et perceptions)", "De la raison pure independamment des sens", "Des idees innees presentes dans l''ame", "De la revelation divine"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''empirisme de Hume affirme que toute connaissance derive de l''experience. Les idees ne sont que des copies affaiblies des impressions sensibles. Il n''existe pas d''idees innees : l''esprit est une tabula rasa qui recoit ses contenus de l''experience.", "steps": ["L''empirisme pose l''experience comme source unique de la connaissance", "Hume distingue les impressions (vives) et les idees (copies faibles)", "Toute idee legitime doit pouvoir etre ramenee a une impression d''origine"]}',
  '{"philosophie","connaissance","experience","hume","empirisme"}'
),
(
  '44444444-0000-0000-0000-000000000369',
  '33333333-0000-0000-0000-000000000056',
  'mcq', 3, 'fr',
  '{"stem": "Kant, dans la Critique de la raison pure, propose une synthese entre rationalisme et empirisme. Quel concept central utilise-t-il ?", "choices": ["Les formes a priori de la sensibilite et les categories de l''entendement", "Le doute methodique cartesien", "La dialectique hegelienne", "L''induction empirique de Bacon"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Kant depasse l''opposition rationalisme/empirisme en montrant que la connaissance requiert a la fois l''experience (matiere) et les formes a priori de l''esprit (forme). L''espace et le temps sont les formes a priori de la sensibilite ; les categories (causalite, substance, etc.) sont les formes a priori de l''entendement.", "steps": ["La connaissance necessite la matiere (donnee par l''experience) et la forme (imposee par l''esprit)", "L''espace et le temps sont des intuitions pures (formes a priori de la sensibilite)", "Les categories de l''entendement (causalite, unite, etc.) structurent l''experience"]}',
  '{"philosophie","connaissance","experience","kant","a_priori"}'
),
(
  '44444444-0000-0000-0000-000000000370',
  '33333333-0000-0000-0000-000000000056',
  'mcq', 3, 'fr',
  '{"stem": "Quel philosophe rationaliste a affirme l''existence d''idees innees, independantes de l''experience sensible ?", "choices": ["Descartes", "Hume", "Locke", "Bachelard"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Descartes est le representant majeur du rationalisme. Il soutient que certaines idees (comme l''idee de Dieu, l''idee d''infini, les verites mathematiques) sont innees, c''est-a-dire deposees dans l''esprit par Dieu et non derivees de l''experience sensible.", "steps": ["Le rationalisme affirme la primaute de la raison sur l''experience", "Descartes distingue trois types d''idees : innees, adventices et factices", "Les idees innees (Dieu, infini, verites mathematiques) ne viennent pas des sens"]}',
  '{"philosophie","connaissance","experience","descartes","rationalisme"}'
),
(
  '44444444-0000-0000-0000-000000000371',
  '33333333-0000-0000-0000-000000000056',
  'mcq', 3, 'fr',
  '{"stem": "Que signifie la celebre formule de Kant : « Des pensees sans contenu sont vides, des intuitions sans concepts sont aveugles » ?", "choices": ["La connaissance exige l''union de l''experience sensible et des concepts de l''entendement", "La raison seule suffit pour connaitre le reel", "L''experience seule produit des connaissances valides", "Les intuitions sont plus fiables que les concepts"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Cette formule de la Critique de la raison pure exprime le coeur de la philosophie kantienne de la connaissance : ni la raison seule (concepts sans contenu empirique) ni l''experience seule (donnees sensibles sans organisation conceptuelle) ne peuvent produire une connaissance. Il faut la cooperation des deux.", "steps": ["Les pensees sans contenu sont vides : la raison sans experience ne connait rien", "Les intuitions sans concepts sont aveugles : l''experience sans raison est chaotique", "La connaissance nait de la synthese entre sensibilite et entendement"]}',
  '{"philosophie","connaissance","experience","kant","synthese"}'
),
(
  '44444444-0000-0000-0000-000000000372',
  '33333333-0000-0000-0000-000000000056',
  'numeric', 3, 'fr',
  '{"stem": "En quelle annee Kant a-t-il publie la Critique de la raison pure, oeuvre majeure sur les conditions de la connaissance ?", "correct_value": 1781, "tolerance": 0, "unit": ""}',
  '{"text_fr": "La Critique de la raison pure (Kritik der reinen Vernunft) a ete publiee en 1781 (premiere edition). Kant y examine les conditions de possibilite de la connaissance et montre que celle-ci resulte de la cooperation entre l''experience et les structures a priori de l''esprit.", "steps": ["Premiere edition publiee en 1781", "Seconde edition revisee en 1787", "L''ouvrage fonde le criticisme kantien, depassant le rationalisme et l''empirisme"]}',
  '{"philosophie","connaissance","experience","kant","date"}'
),
(
  '44444444-0000-0000-0000-000000000373',
  '33333333-0000-0000-0000-000000000056',
  'true_false', 2, 'fr',
  '{"statement": "Pour John Locke, l''esprit humain est une tabula rasa (table rase) a la naissance, c''est-a-dire vide de toute idee innee.", "correct_answer": true}',
  '{"text_fr": "Locke, dans l''Essai sur l''entendement humain (1690), rejette les idees innees et affirme que l''esprit a la naissance est comme une feuille blanche (tabula rasa). Toutes nos idees proviennent de l''experience, soit par la sensation (experience externe) soit par la reflexion (experience interne).", "steps": ["Locke critique la theorie des idees innees de Descartes", "L''esprit est une tabula rasa : il n''a aucun contenu avant l''experience", "Les idees viennent de la sensation (sens externes) et de la reflexion (sens interne)"]}',
  '{"philosophie","connaissance","experience","locke","empirisme"}'
),
(
  '44444444-0000-0000-0000-000000000374',
  '33333333-0000-0000-0000-000000000056',
  'true_false', 3, 'fr',
  '{"statement": "Selon Kant, nous pouvons connaitre les choses en soi (noumenes) telles qu''elles sont independamment de notre esprit.", "correct_answer": false}',
  '{"text_fr": "Kant etablit une distinction fondamentale entre le phenomene (la chose telle qu''elle nous apparait, structuree par nos formes a priori) et le noumene (la chose en soi). Nous ne pouvons connaitre que les phenomenes, jamais les choses en soi, car toute connaissance passe par les formes a priori de notre esprit (espace, temps, categories).", "steps": ["Le phenomene est la chose telle qu''elle nous apparait", "Le noumene (chose en soi) est inconnaissable pour nous", "Notre connaissance est limitee aux phenomenes structures par l''esprit"]}',
  '{"philosophie","connaissance","experience","kant","noumene"}'
);

-- =====================
-- SKILL: science_philosophy (Sciences et philosophie) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000375',
  '33333333-0000-0000-0000-000000000057',
  'mcq', 3, 'fr',
  '{"stem": "Quel concept Gaston Bachelard introduit-il pour expliquer les difficultes du progres scientifique ?", "choices": ["L''obstacle epistemologique", "Le paradigme scientifique", "La falsifiabilite", "Le doute methodique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Bachelard, dans La Formation de l''esprit scientifique (1938), introduit le concept d''obstacle epistemologique : ce sont les habitudes de pensee, les images, les intuitions premieres et les opinions qui freinent l''acces a la connaissance scientifique. La science progresse en rompant avec ces obstacles.", "steps": ["Un obstacle epistemologique est une habitude de pensee qui empeche le progres scientifique", "Exemples : l''experience premiere, le substantialisme, l''animisme", "La science avance par rupture avec le sens commun et les obstacles"]}',
  '{"philosophie","connaissance","science","bachelard","obstacle"}'
),
(
  '44444444-0000-0000-0000-000000000376',
  '33333333-0000-0000-0000-000000000057',
  'mcq', 3, 'fr',
  '{"stem": "Selon Karl Popper, quel est le critere qui distingue une theorie scientifique d''une theorie non scientifique ?", "choices": ["La falsifiabilite (refutabilite)", "La verificabilite par l''experience", "L''acceptation par la communaute scientifique", "La coherence logique interne"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Popper propose le critere de falsifiabilite (ou refutabilite) : une theorie est scientifique si et seulement si elle peut etre refutee par l''experience. Une theorie qui ne peut etre contredite par aucun fait n''est pas scientifique (elle est metaphysique ou pseudo-scientifique).", "steps": ["La falsifiabilite : une theorie doit pouvoir etre mise en defaut par l''experience", "Exemple scientifique : ''Tous les cygnes sont blancs'' est falsifiable (un cygne noir la refute)", "Exemple non scientifique : l''astrologie n''est pas falsifiable car elle s''adapte a tout resultat"]}',
  '{"philosophie","connaissance","science","popper","falsifiabilite"}'
),
(
  '44444444-0000-0000-0000-000000000377',
  '33333333-0000-0000-0000-000000000057',
  'mcq', 3, 'fr',
  '{"stem": "Thomas Kuhn a introduit le concept de « revolution scientifique ». Que designe-t-il par « paradigme » ?", "choices": ["Un ensemble de theories, methodes et valeurs partages par une communaute scientifique a une epoque donnee", "Une loi mathematique universelle", "Un instrument de mesure standardise", "Une hypothese non encore verifiee"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans La Structure des revolutions scientifiques (1962), Kuhn definit le paradigme comme l''ensemble des theories, des methodes, des modeles et des valeurs partages par une communaute scientifique. La science normale travaille a l''interieur d''un paradigme ; une revolution scientifique survient lorsqu''un paradigme est remplace par un autre.", "steps": ["Un paradigme est un cadre theorique et methodologique partage", "La science normale resout des enigmes dans le cadre du paradigme dominant", "Une revolution scientifique remplace un paradigme par un autre (ex: Newton vers Einstein)"]}',
  '{"philosophie","connaissance","science","kuhn","paradigme"}'
),
(
  '44444444-0000-0000-0000-000000000378',
  '33333333-0000-0000-0000-000000000057',
  'mcq', 3, 'fr',
  '{"stem": "Bachelard affirme que « l''esprit scientifique doit se former en se reformant ». Que signifie cette idee ?", "choices": ["La connaissance scientifique progresse par rupture avec les connaissances anterieures et le sens commun", "La science repose sur l''accumulation lineaire de savoirs sans remise en question", "L''esprit scientifique est inne et ne necessite aucune formation", "La science doit revenir aux connaissances anciennes pour progresser"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Pour Bachelard, le progres scientifique n''est pas une accumulation continue mais une serie de ruptures epistemologiques. L''esprit scientifique doit constamment remettre en question ses certitudes, corriger ses erreurs et depasser les obstacles epistemologiques. Se former, c''est se reformer contre ses propres habitudes de pensee.", "steps": ["La science progresse par ruptures, non par accumulation", "Il faut rompre avec le sens commun et l''experience premiere", "L''erreur rectifiee est le moteur du progres scientifique"]}',
  '{"philosophie","connaissance","science","bachelard","rupture"}'
),
(
  '44444444-0000-0000-0000-000000000379',
  '33333333-0000-0000-0000-000000000057',
  'numeric', 3, 'fr',
  '{"stem": "En quelle annee Gaston Bachelard a-t-il publie La Formation de l''esprit scientifique, ouvrage central sur les obstacles epistemologiques ?", "correct_value": 1938, "tolerance": 0, "unit": ""}',
  '{"text_fr": "La Formation de l''esprit scientifique a ete publiee en 1938. Bachelard y analyse les obstacles epistemologiques qui freinent le progres de la connaissance scientifique et montre que la science se construit contre l''evidence et le sens commun.", "steps": ["Publication en 1938 par Gaston Bachelard", "Sous-titre : Contribution a une psychanalyse de la connaissance objective", "L''ouvrage identifie et classe les principaux obstacles epistemologiques"]}',
  '{"philosophie","connaissance","science","bachelard","date"}'
),
(
  '44444444-0000-0000-0000-000000000380',
  '33333333-0000-0000-0000-000000000057',
  'true_false', 2, 'fr',
  '{"statement": "Selon Karl Popper, une theorie scientifique ne peut jamais etre definitivement prouvee comme vraie, elle peut seulement etre refutee.", "correct_answer": true}',
  '{"text_fr": "Popper soutient l''asymetrie entre verification et falsification : aucune quantite d''observations ne peut prouver definitivement qu''une theorie universelle est vraie (probleme de l''induction), mais une seule observation contraire suffit a la refuter. La science progresse donc par conjectures et refutations.", "steps": ["On ne peut jamais verifier definitivement une loi universelle (on ne peut tester tous les cas)", "Mais un seul contre-exemple suffit a refuter une theorie", "La science progresse par conjectures audacieuses et tentatives de refutation"]}',
  '{"philosophie","connaissance","science","popper","refutation"}'
),
(
  '44444444-0000-0000-0000-000000000381',
  '33333333-0000-0000-0000-000000000057',
  'true_false', 3, 'fr',
  '{"statement": "Pour Bachelard, l''experience premiere (l''observation naive et immediate) constitue le meilleur point de depart pour la connaissance scientifique.", "correct_answer": false}',
  '{"text_fr": "Bachelard considere que l''experience premiere est un obstacle epistemologique majeur. L''observation naive, chargee d''images seduisantes et de prejuges, empeche l''acces a la connaissance scientifique objective. La science doit rompre avec l''experience premiere et la remplacer par l''experimentation construite et rationalisee.", "steps": ["L''experience premiere est naive, subjective et trompeuse", "Elle constitue un obstacle epistemologique, pas un fondement", "La science exige une experience construite, instrumentee et theoriquement guidee"]}',
  '{"philosophie","connaissance","science","bachelard","experience_premiere"}'
);
