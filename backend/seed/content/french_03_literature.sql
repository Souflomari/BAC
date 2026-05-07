-- ============================================================
-- FRENCH CONTENT: Œuvres littéraires (2 skills, 14 items)
-- Skills:
--   novel_study    (33333333-...-069) difficulty 2 — 7 items
--   theater_study  (33333333-...-070) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: novel_study (Le roman: La Boîte à Merveilles, Le Dernier Jour d'un Condamné) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000459',
  '33333333-0000-0000-0000-000000000069',
  'mcq', 2, 'fr',
  '{"stem": "Qui est le narrateur de La Boîte à Merveilles d''Ahmed Sefrioui ?", "choices": ["Sidi Mohammed, un enfant de six ans", "Ahmed Sefrioui lui-même sous son vrai nom", "Le père de Sidi Mohammed", "Un voisin du quartier de Fès"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le narrateur de La Boîte à Merveilles est Sidi Mohammed, un enfant de six ans qui raconte sa vie quotidienne dans la médina de Fès. Le roman est une autobiographie romancée où Sefrioui transpose ses propres souvenirs d''enfance à travers ce personnage.", "steps": ["Sidi Mohammed est le narrateur-personnage du récit", "Il s''agit d''une autobiographie romancée (récit à la première personne)", "L''auteur Ahmed Sefrioui utilise un personnage fictif pour raconter ses propres souvenirs d''enfance"]}',
  '{"français","littérature","roman","boîte_à_merveilles"}'
),
(
  '44444444-0000-0000-0000-000000000460',
  '33333333-0000-0000-0000-000000000069',
  'mcq', 2, 'fr',
  '{"stem": "Quel thème central de La Boîte à Merveilles est illustré par le refuge de Sidi Mohammed dans ses objets et ses rêveries ?", "choices": ["La solitude de l''enfant", "La révolte contre l''autorité", "L''amour romantique", "La critique politique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La solitude est un thème central du roman. Sidi Mohammed se sent différent des autres enfants ; il se réfugie dans sa boîte à merveilles, remplie d''objets qu''il considère comme magiques, pour échapper à un monde qu''il ne comprend pas toujours.", "steps": ["Sidi Mohammed se sent isolé et incompris par les enfants de son âge", "La boîte à merveilles symbolise son monde intérieur et son refuge imaginaire", "Cette solitude traduit la sensibilité de l''enfant face à un environnement traditionnel"]}',
  '{"français","littérature","roman","boîte_à_merveilles","solitude"}'
),
(
  '44444444-0000-0000-0000-000000000461',
  '33333333-0000-0000-0000-000000000069',
  'mcq', 2, 'fr',
  '{"stem": "Le Dernier Jour d''un Condamné de Victor Hugo est considéré comme :", "choices": ["Un roman à thèse, plaidoyer contre la peine de mort", "Un roman d''aventures historiques", "Une autobiographie de Victor Hugo", "Un recueil de nouvelles judiciaires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le Dernier Jour d''un Condamné est un roman à thèse dans lequel Victor Hugo dénonce la peine de mort. Le récit se présente comme le journal intime d''un condamné anonyme qui relate ses dernières heures avant l''exécution.", "steps": ["Un roman à thèse défend une idée ou une cause à travers la fiction", "Hugo utilise le monologue intérieur pour faire ressentir l''angoisse du condamné", "L''objectif est de convaincre le lecteur de l''injustice et de la barbarie de la peine de mort"]}',
  '{"français","littérature","roman","dernier_jour","peine_de_mort"}'
),
(
  '44444444-0000-0000-0000-000000000462',
  '33333333-0000-0000-0000-000000000069',
  'mcq', 3, 'fr',
  '{"stem": "Quelle technique narrative domine dans Le Dernier Jour d''un Condamné ?", "choices": ["Le monologue intérieur à la première personne", "Le dialogue théâtral entre personnages", "La narration omnisciente à la troisième personne", "Le récit épistolaire entre le condamné et sa famille"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Victor Hugo utilise le monologue intérieur : le condamné écrit un journal intime où il exprime ses pensées, ses peurs et ses réflexions. Le lecteur accède directement à la conscience du personnage, ce qui renforce l''effet pathétique.", "steps": ["Le récit est entièrement écrit à la première personne (« je »)", "Le condamné consigne ses pensées dans un journal au fil des heures", "Le monologue intérieur permet de partager l''angoisse et la souffrance du personnage", "Cette technique crée une forte identification du lecteur avec le condamné"]}',
  '{"français","littérature","roman","dernier_jour","monologue_intérieur"}'
),
(
  '44444444-0000-0000-0000-000000000463',
  '33333333-0000-0000-0000-000000000069',
  'numeric', 2, 'fr',
  '{"stem": "En quelle année La Boîte à Merveilles d''Ahmed Sefrioui a-t-elle été publiée ?", "correct_value": 1954, "tolerance": 0, "latex": false}',
  '{"text_fr": "La Boîte à Merveilles a été publiée en 1954. C''est le premier roman marocain écrit en langue française. Ahmed Sefrioui y évoque son enfance dans la médina de Fès à travers le personnage de Sidi Mohammed.", "steps": ["Ahmed Sefrioui publie La Boîte à Merveilles en 1954", "Ce roman est considéré comme le premier roman marocain d''expression française", "Il précède d''un an Le Fils du pauvre de Mouloud Feraoun dans le contexte maghrébin"]}',
  '{"français","littérature","roman","boîte_à_merveilles","date"}'
),
(
  '44444444-0000-0000-0000-000000000464',
  '33333333-0000-0000-0000-000000000069',
  'true_false', 2, 'fr',
  '{"stem": "Dans Le Dernier Jour d''un Condamné, le lecteur connaît le nom et le crime du condamné.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Le condamné reste anonyme tout au long du roman, et son crime n''est jamais révélé. C''est un choix délibéré de Victor Hugo : en rendant le condamné universel, il veut montrer que la peine de mort est inacceptable quel que soit le crime commis.", "steps": ["Le condamné n''est jamais nommé dans le roman", "Son crime n''est pas précisé non plus", "Hugo veut donner une portée universelle à son plaidoyer : tout condamné à mort est une victime de ce système"]}',
  '{"français","littérature","roman","dernier_jour","anonymat"}'
),
(
  '44444444-0000-0000-0000-000000000465',
  '33333333-0000-0000-0000-000000000069',
  'true_false', 2, 'fr',
  '{"stem": "La Boîte à Merveilles est un roman réaliste qui décrit la vie traditionnelle dans la médina de Fès.", "correct_answer": true, "latex": false}',
  '{"text_fr": "La Boîte à Merveilles est effectivement un roman à caractère réaliste. Sefrioui décrit avec précision la vie quotidienne dans la médina de Fès : les rituels, les fêtes religieuses, le msid (école coranique), le bain maure, les relations de voisinage et les traditions marocaines.", "steps": ["Le roman dépeint la vie quotidienne dans la médina de Fès avec de nombreux détails réalistes", "On y retrouve des éléments culturels marocains : le msid, le hammam, les fêtes (Achoura)", "Le récit mêle autobiographie et description ethnographique de la société marocaine traditionnelle"]}',
  '{"français","littérature","roman","boîte_à_merveilles","réalisme"}'
);

-- =====================
-- SKILL: theater_study (Le théâtre: Antigone de Jean Anouilh) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000466',
  '33333333-0000-0000-0000-000000000070',
  'mcq', 2, 'fr',
  '{"stem": "L''Antigone de Jean Anouilh est une réécriture d''une tragédie grecque. Quel auteur antique a écrit l''Antigone originale ?", "choices": ["Sophocle", "Euripide", "Eschyle", "Aristophane"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Jean Anouilh s''est inspiré de l''Antigone de Sophocle, tragédie grecque écrite vers 441 av. J.-C. Il en propose une réécriture moderne, créée en 1944 à Paris pendant l''Occupation allemande.", "steps": ["Sophocle est l''auteur de la tragédie originale (vers 441 av. J.-C.)", "Jean Anouilh reprend le mythe antique et l''adapte au contexte moderne", "La pièce d''Anouilh a été représentée pour la première fois en février 1944 à Paris"]}',
  '{"français","littérature","théâtre","antigone","sophocle"}'
),
(
  '44444444-0000-0000-0000-000000000467',
  '33333333-0000-0000-0000-000000000070',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le conflit central dans Antigone de Jean Anouilh ?", "choices": ["L''opposition entre Antigone (loi morale) et Créon (loi de l''État)", "La rivalité amoureuse entre Antigone et Ismène", "Le conflit militaire entre Thèbes et Argos", "La lutte de pouvoir entre Créon et Hémon"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le conflit central oppose Antigone à son oncle Créon. Antigone veut enterrer son frère Polynice par devoir moral et religieux, tandis que Créon, roi de Thèbes, a interdit cette sépulture au nom de la raison d''État. C''est un affrontement entre la conscience individuelle et l''autorité politique.", "steps": ["Antigone défend la loi morale et divine : tout mort mérite une sépulture", "Créon représente la loi civile et l''ordre politique : Polynice est un traître", "Ce conflit incarne l''opposition entre devoir individuel et raison d''État", "Aucun des deux ne peut céder sans renier ses convictions"]}',
  '{"français","littérature","théâtre","antigone","conflit"}'
),
(
  '44444444-0000-0000-0000-000000000468',
  '33333333-0000-0000-0000-000000000070',
  'mcq', 3, 'fr',
  '{"stem": "Quel personnage d''Antigone prononce le prologue et joue le rôle de narrateur qui présente les personnages au public ?", "choices": ["Le Prologue (le Chœur)", "Créon", "La Nourrice", "Ismène"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est le personnage du Prologue qui ouvre la pièce en présentant chaque personnage au public et en annonçant le dénouement tragique. Ce procédé, hérité du chœur antique, est modernisé par Anouilh : le Prologue brise le quatrième mur et s''adresse directement aux spectateurs.", "steps": ["Le Prologue est un personnage qui s''adresse directement au public", "Il présente tous les personnages un par un avant le début de l''action", "Il annonce dès le départ l''issue fatale, créant une tension dramatique", "Ce rôle est inspiré du chœur de la tragédie grecque antique"]}',
  '{"français","littérature","théâtre","antigone","prologue"}'
),
(
  '44444444-0000-0000-0000-000000000469',
  '33333333-0000-0000-0000-000000000070',
  'mcq', 2, 'fr',
  '{"stem": "Pourquoi Antigone refuse-t-elle de renoncer à enterrer Polynice malgré les arguments de Créon ?", "choices": ["Parce qu''elle estime que c''est son devoir moral absolu, au-delà de toute raison", "Parce qu''elle veut prendre le pouvoir à Thèbes", "Parce qu''Ismène lui a demandé de le faire", "Parce qu''elle obéit à un ordre de Hémon"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Antigone incarne l''idéalisme absolu. Elle refuse tout compromis et choisit la mort plutôt que de renoncer à son devoir. Pour elle, dire « non » est une nécessité intérieure qui dépasse la raison et la politique. Elle représente la pureté du refus face au monde des adultes et de leurs compromissions.", "steps": ["Antigone agit par conviction morale et non par intérêt personnel", "Elle représente le refus absolu et l''idéalisme de la jeunesse", "Créon tente de la raisonner en révélant la vérité sur ses frères, mais elle persiste", "Son « non » est existentiel : elle refuse de vivre dans un monde de compromis"]}',
  '{"français","littérature","théâtre","antigone","devoir","liberté"}'
),
(
  '44444444-0000-0000-0000-000000000470',
  '33333333-0000-0000-0000-000000000070',
  'numeric', 2, 'fr',
  '{"stem": "En quelle année la pièce Antigone de Jean Anouilh a-t-elle été représentée pour la première fois à Paris ?", "correct_value": 1944, "tolerance": 0, "latex": false}',
  '{"text_fr": "Antigone de Jean Anouilh a été créée le 4 février 1944 au théâtre de l''Atelier à Paris, sous l''Occupation allemande. Cette date est importante car la pièce a été interprétée à la fois comme un appel à la résistance et comme une justification de l''ordre établi.", "steps": ["La première représentation a lieu le 4 février 1944", "Le contexte historique est celui de l''Occupation allemande en France", "La pièce a suscité un double accueil : résistants et collaborateurs s''y sont reconnus", "Le metteur en scène était André Barsacq au théâtre de l''Atelier"]}',
  '{"français","littérature","théâtre","antigone","date"}'
),
(
  '44444444-0000-0000-0000-000000000471',
  '33333333-0000-0000-0000-000000000070',
  'true_false', 2, 'fr',
  '{"stem": "Dans Antigone d''Anouilh, Ismène accepte de participer à l''enterrement de Polynice aux côtés de sa sœur.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Ismène refuse d''aider Antigone à enterrer Polynice. Contrairement à sa sœur, Ismène est prudente et craint la punition de Créon. Elle tente de raisonner Antigone et de la dissuader. Plus tard, quand Antigone est arrêtée, Ismène veut partager sa peine, mais Antigone refuse.", "steps": ["Ismène refuse de participer à l''acte d''enterrement par peur", "Elle représente la soumission à l''ordre établi, contrairement à la rébellion d''Antigone", "Après l''arrestation d''Antigone, Ismène propose de mourir avec elle", "Antigone rejette cette solidarité tardive : elle veut agir seule"]}',
  '{"français","littérature","théâtre","antigone","ismène"}'
),
(
  '44444444-0000-0000-0000-000000000472',
  '33333333-0000-0000-0000-000000000070',
  'true_false', 3, 'fr',
  '{"stem": "Antigone de Jean Anouilh respecte la règle classique des trois unités (lieu, temps, action) comme la tragédie grecque.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Antigone d''Anouilh respecte globalement les trois unités classiques. L''action se déroule en un seul lieu (le palais de Créon à Thèbes), en un temps limité (une journée, de l''aube à la nuit), et autour d''une action unique (le conflit entre Antigone et Créon au sujet de la sépulture de Polynice).", "steps": ["Unité de lieu : toute l''action se passe dans le palais de Thèbes", "Unité de temps : l''action se déroule en moins de 24 heures", "Unité d''action : tout tourne autour du conflit lié à l''enterrement de Polynice", "Anouilh modernise la forme tout en conservant cette structure classique"]}',
  '{"français","littérature","théâtre","antigone","tragédie_moderne"}'
);
