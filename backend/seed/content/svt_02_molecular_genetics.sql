-- ============================================================
-- SVT CONTENT: Génétique moléculaire (3 skills, 21 items)
-- Topic: Génétique moléculaire
-- Skills:
--   dna_structure    (33333333-...-035) difficulty 2 — 7 items
--   gene_expression  (33333333-...-036) difficulty 3 — 7 items
--   mutations        (33333333-...-037) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: dna_structure (ADN et information génétique) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000223',
  '33333333-0000-0000-0000-000000000035',
  'mcq', 2, 'fr',
  '{"stem": "Quels sont les quatre types de nucléotides qui composent la molécule d''ADN ?", "choices": ["Adénine, Thymine, Guanine, Cytosine", "Adénine, Uracile, Guanine, Cytosine", "Adénine, Thymine, Guanine, Uracile", "Alanine, Thymine, Glycine, Cytosine"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''ADN est composé de quatre nucléotides dont les bases azotées sont : l''Adénine (A), la Thymine (T), la Guanine (G) et la Cytosine (C). L''Uracile remplace la Thymine dans l''ARN.", "steps": ["L''ADN contient quatre bases azotées", "Ce sont A, T, G et C", "L''Uracile (U) est spécifique à l''ARN, pas à l''ADN"]}',
  '{"nucleotides","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000224',
  '33333333-0000-0000-0000-000000000035',
  'true_false', 2, 'fr',
  '{"stem": "Dans la molécule d''ADN, l''adénine est liée à la guanine par des liaisons hydrogène.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. D''après la règle de complémentarité des bases, l''adénine (A) est toujours liée à la thymine (T) par deux liaisons hydrogène, et la guanine (G) est liée à la cytosine (C) par trois liaisons hydrogène.", "steps": ["La complémentarité des bases suit la règle : A-T et G-C", "A est liée à T par 2 liaisons hydrogène", "G est liée à C par 3 liaisons hydrogène", "A n''est jamais liée à G dans l''ADN normal"]}',
  '{"complementarite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000225',
  '33333333-0000-0000-0000-000000000035',
  'mcq', 2, 'fr',
  '{"stem": "La réplication de l''ADN est dite semi-conservative car :", "choices": ["Chaque molécule fille contient un brin ancien et un brin nouvellement synthétisé", "La moitié de l''ADN est dégradée après chaque réplication", "Seule la moitié des gènes est répliquée à chaque division", "Les deux brins parentaux restent ensemble dans une seule molécule fille"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La réplication semi-conservative signifie que chaque molécule d''ADN fille est constituée d''un brin parental (ancien) et d''un brin néoformé. Cela a été démontré par l''expérience de Meselson et Stahl en 1958.", "steps": ["Les deux brins de l''ADN parental se séparent", "Chaque brin sert de matrice pour synthétiser un nouveau brin complémentaire", "Chaque molécule fille conserve un brin ancien → semi-conservative"]}',
  '{"replication","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000226',
  '33333333-0000-0000-0000-000000000035',
  'true_false', 2, 'fr',
  '{"stem": "L''expérience de Meselson et Stahl a permis de démontrer le caractère semi-conservatif de la réplication de l''ADN.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. En 1958, Meselson et Stahl ont utilisé l''azote lourd (¹⁵N) et l''azote léger (¹⁴N) pour marquer l''ADN de bactéries E. coli. Après centrifugation en gradient de densité, les résultats ont confirmé le modèle semi-conservatif.", "steps": ["Les bactéries sont cultivées sur milieu contenant ¹⁵N (azote lourd)", "Puis transférées sur milieu ¹⁴N (azote léger)", "Après une génération, l''ADN a une densité intermédiaire", "Ce résultat confirme le modèle semi-conservatif"]}',
  '{"meselson_stahl","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000227',
  '33333333-0000-0000-0000-000000000035',
  'mcq', 3, 'fr',
  '{"stem": "Un fragment d''ADN contient 30% d''adénine. Quel est le pourcentage de guanine dans ce fragment ?", "choices": ["20%", "30%", "25%", "40%"], "correct_index": 0, "latex": false}',
  '{"text_fr": "D''après les règles de Chargaff, A = T et G = C. Si A = 30%, alors T = 30%. Donc A + T = 60%. Puisque A + T + G + C = 100%, on a G + C = 40%, soit G = C = 20%.", "steps": ["Règle de Chargaff : A = T et G = C", "Si A = 30%, alors T = 30%", "A + T = 60%", "G + C = 100% - 60% = 40%", "G = C = 20%"]}',
  '{"chargaff","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000228',
  '33333333-0000-0000-0000-000000000035',
  'numeric', 2, 'fr',
  '{"stem": "Un fragment d''ADN contient 120 nucléotides d''adénine et un total de 500 nucléotides. Combien de nucléotides de cytosine contient-il ?", "correct_value": 130, "tolerance": 0, "latex": false}',
  '{"text_fr": "D''après les règles de Chargaff : A = T = 120. Donc A + T = 240. Le nombre de G + C = 500 - 240 = 260. Puisque G = C, on a C = 260/2 = 130.", "steps": ["A = T = 120 (complémentarité)", "A + T = 240", "G + C = 500 - 240 = 260", "G = C = 260 / 2 = 130"]}',
  '{"chargaff","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000229',
  '33333333-0000-0000-0000-000000000035',
  'true_false', 2, 'fr',
  '{"stem": "Un gène et un allèle désignent exactement la même chose.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Un gène est un segment d''ADN qui code pour un caractère héréditaire donné. Un allèle est une version particulière de ce gène. Un même gène peut exister sous plusieurs allèles différents dans une population.", "steps": ["Un gène est une unité d''information génétique occupant un locus précis", "Un allèle est une version (variante) d''un gène", "Exemple : le gène du groupe sanguin ABO a trois allèles principaux (A, B, O)", "Gène ≠ allèle"]}',
  '{"gene_allele","bac_style"}'
);

-- =====================
-- SKILL: gene_expression (Expression de l'information génétique) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000230',
  '33333333-0000-0000-0000-000000000036',
  'mcq', 3, 'fr',
  '{"stem": "Lors de la transcription, le brin d''ADN de séquence 3''-TACGGA-5'' donne un ARNm de séquence :", "choices": ["5''-AUGCCU-3''", "5''-ATGCCT-3''", "3''-AUGCCU-5''", "5''-UACGGA-3''"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La transcription se fait par complémentarité antiparallèle. Le brin matrice d''ADN est lu de 3'' vers 5'', et l''ARNm est synthétisé de 5'' vers 3''. T→A, A→U, C→G, G→C. Donc 3''-TACGGA-5'' donne 5''-AUGCCU-3''.", "steps": ["Le brin matrice est lu de 3'' vers 5''", "L''ARNm est synthétisé de 5'' vers 3''", "Complémentarité : T→A, A→U, C→G, G→C", "3''-TACGGA-5'' → 5''-AUGCCU-3''"]}',
  '{"transcription","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000231',
  '33333333-0000-0000-0000-000000000036',
  'true_false', 3, 'fr',
  '{"stem": "Le code génétique est dégénéré, ce qui signifie qu''un même codon peut coder pour plusieurs acides aminés différents.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le code génétique est dégénéré (= redondant) signifie que plusieurs codons différents peuvent coder pour un même acide aminé. En revanche, un codon donné ne code que pour un seul acide aminé (le code est non ambigu).", "steps": ["Dégénéré = redondant = plusieurs codons pour un même acide aminé", "Exemple : GCU, GCC, GCA, GCG codent tous pour l''Alanine", "Mais un codon donné ne code jamais pour deux acides aminés différents", "Le code est dégénéré mais non ambigu"]}',
  '{"code_genetique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000232',
  '33333333-0000-0000-0000-000000000036',
  'mcq', 3, 'fr',
  '{"stem": "Le codon AUG code pour l''acide aminé méthionine et joue un rôle particulier car il :", "choices": ["Est le codon d''initiation de la traduction", "Est le codon de terminaison de la traduction", "Code pour deux acides aminés différents", "N''est reconnu par aucun ARNt"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le codon AUG est le codon d''initiation : il marque le début de la traduction. Il code pour la méthionine (Met), qui est toujours le premier acide aminé incorporé dans la chaîne polypeptidique.", "steps": ["AUG = codon d''initiation de la traduction", "Il code pour la méthionine (Met)", "La traduction commence toujours par AUG", "Les codons STOP sont UAA, UAG et UGA"]}',
  '{"codon_initiation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000233',
  '33333333-0000-0000-0000-000000000036',
  'mcq', 3, 'fr',
  '{"stem": "Quel est le rôle de l''ARN de transfert (ARNt) dans la traduction ?", "choices": ["Il apporte les acides aminés au ribosome en reconnaissant les codons de l''ARNm par son anticodon", "Il copie l''information génétique de l''ADN", "Il catalyse la réplication de l''ADN", "Il découpe les introns lors de l''épissage"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''ARNt est une molécule adaptatrice qui possède un anticodon complémentaire du codon de l''ARNm et transporte l''acide aminé correspondant. Il assure ainsi la correspondance entre la séquence nucléotidique et la séquence peptidique.", "steps": ["L''ARNt possède un anticodon (séquence de 3 nucléotides)", "L''anticodon est complémentaire du codon de l''ARNm", "L''ARNt porte l''acide aminé correspondant au codon", "Il fait le lien entre le langage nucléotidique et le langage protéique"]}',
  '{"arnt","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000234',
  '33333333-0000-0000-0000-000000000036',
  'numeric', 3, 'fr',
  '{"stem": "Un ARNm contient 900 nucléotides (codon initiateur AUG inclus, codon stop inclus). Combien d''acides aminés contiendra la protéine traduite (méthionine initiale comprise) ?", "correct_value": 299, "tolerance": 0, "latex": false}',
  '{"text_fr": "900 nucléotides correspondent à 900/3 = 300 codons. Le dernier codon est un codon STOP qui ne code pour aucun acide aminé. Les 299 autres codons codent chacun pour un acide aminé. La protéine contient donc 299 acides aminés (méthionine initiale comprise).", "steps": ["900 nucléotides ÷ 3 = 300 codons", "1 codon STOP ne code pour aucun acide aminé", "Nombre de codons codants = 300 - 1 = 299", "La protéine contient 299 acides aminés"]}',
  '{"traduction_calcul","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000235',
  '33333333-0000-0000-0000-000000000036',
  'true_false', 3, 'fr',
  '{"stem": "L''épissage est le processus par lequel les introns sont éliminés de l''ARN pré-messager pour produire l''ARNm mature.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. L''épissage (ou splicing) est un processus post-transcriptionnel au cours duquel les introns (séquences non codantes) sont excisés de l''ARN pré-messager. Les exons (séquences codantes) sont ensuite reliés entre eux pour former l''ARNm mature.", "steps": ["Après la transcription, on obtient un ARN pré-messager", "Cet ARN contient des exons (codants) et des introns (non codants)", "L''épissage élimine les introns", "Les exons sont raccordés → ARNm mature"]}',
  '{"epissage","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000236',
  '33333333-0000-0000-0000-000000000036',
  'numeric', 3, 'fr',
  '{"stem": "Un gène contient 2 exons de 300 et 600 nucléotides respectivement, et 1 intron de 150 nucléotides. Quelle est la taille de l''ARNm mature (en nucléotides) ?", "correct_value": 900, "tolerance": 0, "latex": false}',
  '{"text_fr": "L''ARNm mature ne contient que les exons, les introns étant éliminés lors de l''épissage. La taille de l''ARNm mature = taille exon 1 + taille exon 2 = 300 + 600 = 900 nucléotides.", "steps": ["L''ARN pré-messager contient exons + introns = 300 + 600 + 150 = 1050 nt", "L''épissage élimine l''intron (150 nt)", "ARNm mature = exon 1 + exon 2 = 300 + 600 = 900 nucléotides"]}',
  '{"epissage_calcul","bac_style"}'
);

-- =====================
-- SKILL: mutations (Code génétique et mutations) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000237',
  '33333333-0000-0000-0000-000000000037',
  'mcq', 3, 'fr',
  '{"stem": "Une mutation par substitution consiste en :", "choices": ["Le remplacement d''un nucléotide par un autre dans la séquence d''ADN", "L''ajout d''un nucléotide supplémentaire dans la séquence d''ADN", "La perte d''un nucléotide dans la séquence d''ADN", "L''inversion d''un segment entier d''ADN"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une mutation par substitution est le remplacement d''une paire de nucléotides par une autre. C''est la mutation ponctuelle la plus fréquente. Elle peut être de type transition (purine → purine ou pyrimidine → pyrimidine) ou transversion (purine → pyrimidine ou inversement).", "steps": ["Substitution = remplacement d''un nucléotide par un autre", "Le nombre total de nucléotides reste inchangé", "C''est différent de l''insertion (ajout) et de la délétion (perte)", "Exemple : ...ATG... → ...ACG..."]}',
  '{"substitution","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000238',
  '33333333-0000-0000-0000-000000000037',
  'mcq', 3, 'fr',
  '{"stem": "Une mutation faux-sens entraîne :", "choices": ["Le remplacement d''un acide aminé par un autre dans la protéine", "L''apparition prématurée d''un codon STOP", "Aucun changement dans la séquence de la protéine", "L''ajout d''un acide aminé supplémentaire dans la protéine"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une mutation faux-sens modifie un codon de sorte qu''il code pour un acide aminé différent. La protéine est de même longueur mais contient un acide aminé substitué, ce qui peut altérer ou non sa fonction selon la nature et la position du changement.", "steps": ["La substitution modifie un codon", "Le nouveau codon code pour un acide aminé différent", "La protéine a la même longueur mais un acide aminé différent", "L''impact dépend de la position et de la nature de l''acide aminé substitué"]}',
  '{"faux_sens","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000239',
  '33333333-0000-0000-0000-000000000037',
  'true_false', 3, 'fr',
  '{"stem": "Une mutation non-sens provoque l''apparition d''un codon STOP prématuré, ce qui conduit à la synthèse d''une protéine tronquée.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Une mutation non-sens transforme un codon codant pour un acide aminé en un codon STOP (UAA, UAG ou UGA). La traduction s''arrête prématurément, produisant une protéine plus courte (tronquée) qui est généralement non fonctionnelle.", "steps": ["La substitution transforme un codon sens en codon STOP", "La traduction s''arrête prématurément à ce codon STOP", "La protéine produite est tronquée (incomplète)", "Une protéine tronquée est généralement non fonctionnelle"]}',
  '{"non_sens","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000240',
  '33333333-0000-0000-0000-000000000037',
  'mcq', 3, 'fr',
  '{"stem": "Quel est l''effet d''une mutation par délétion d''un nucléotide sur le cadre de lecture ?", "choices": ["Elle décale le cadre de lecture à partir du point de mutation, modifiant tous les codons suivants", "Elle ne modifie que le codon contenant la délétion", "Elle n''a aucun effet sur la protéine", "Elle provoque uniquement un changement du premier acide aminé"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une délétion d''un nucléotide provoque un décalage du cadre de lecture (frameshift). Tous les codons situés en aval de la mutation sont modifiés, ce qui change la séquence d''acides aminés et introduit souvent un codon STOP prématuré.", "steps": ["La délétion retire un nucléotide de la séquence", "Le cadre de lecture est décalé d''une position", "Tous les codons en aval sont modifiés", "Un codon STOP prématuré apparaît souvent → protéine tronquée"]}',
  '{"deletion_frameshift","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000241',
  '33333333-0000-0000-0000-000000000037',
  'true_false', 3, 'fr',
  '{"stem": "Une mutation par insertion d''un nucléotide, tout comme une délétion, provoque un décalage du cadre de lecture.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. L''insertion d''un nucléotide décale le cadre de lecture de la même manière qu''une délétion. Tous les codons en aval de l''insertion sont modifiés. On parle de mutation par décalage du cadre de lecture (frameshift mutation).", "steps": ["L''insertion ajoute un nucléotide dans la séquence", "Le cadre de lecture est décalé d''une position", "Comme pour la délétion, tous les codons en aval sont modifiés", "Insertion et délétion sont toutes deux des mutations frameshift"]}',
  '{"insertion_frameshift","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000242',
  '33333333-0000-0000-0000-000000000037',
  'true_false', 3, 'fr',
  '{"stem": "Les rayons ultraviolets (UV) et certaines substances chimiques comme le benzopyrène sont des agents mutagènes.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les agents mutagènes sont des facteurs qui augmentent la fréquence des mutations. Ils peuvent être physiques (rayons UV, rayons X, radioactivité) ou chimiques (benzopyrène, acide nitreux, analogues de bases). Les UV provoquent notamment la formation de dimères de thymine.", "steps": ["Un agent mutagène augmente le taux de mutations", "Agents physiques : UV, rayons X, rayonnements ionisants", "Agents chimiques : benzopyrène, acide nitreux, colchicine", "Les UV provoquent des dimères de thymine dans l''ADN"]}',
  '{"agents_mutagenes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000243',
  '33333333-0000-0000-0000-000000000037',
  'numeric', 4, 'fr',
  '{"stem": "Une séquence d''ARNm normale code pour une protéine de 150 acides aminés. Suite à une mutation non-sens, le 46ème codon devient un codon STOP. Combien d''acides aminés contiendra la protéine tronquée (en comptant la méthionine initiale) ?", "correct_value": 45, "tolerance": 0, "latex": false}',
  '{"text_fr": "Si le 46ème codon devient un codon STOP, la traduction s''arrête avant ce codon. Les codons 1 à 45 sont traduits normalement en acides aminés, et le codon 46 (STOP) arrête la synthèse. La protéine tronquée contient donc 45 acides aminés.", "steps": ["La traduction commence au codon 1 (AUG → Met)", "Les codons 1 à 45 sont traduits en 45 acides aminés", "Le codon 46 est devenu un codon STOP", "La traduction s''arrête : la protéine contient 45 acides aminés au lieu de 150"]}',
  '{"mutation_non_sens_calcul","bac_style"}'
);
