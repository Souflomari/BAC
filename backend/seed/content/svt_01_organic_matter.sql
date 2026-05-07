-- ============================================================
-- SVT CONTENT: Consommation de la matière organique et flux d'énergie (2 skills, 12 items)
-- Skills:
--   cell_energy   (33333333-...-033) difficulty 2 — 6 items
--   fermentation  (33333333-...-034) difficulty 2 — 6 items
-- ============================================================

-- =====================
-- SKILL: cell_energy (Métabolisme énergétique) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000211',
  '33333333-0000-0000-0000-000000000033',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est l''équation bilan de la respiration cellulaire ?", "choices": ["C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + énergie (ATP)", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + énergie", "C₆H₁₂O₆ + 6H₂O → 6CO₂ + 12H₂ + énergie"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La respiration cellulaire est une oxydation complète du glucose en présence de dioxygène, produisant du CO₂, de l''eau et de l''énergie sous forme d''ATP.", "steps": ["Le glucose (C₆H₁₂O₆) est le substrat oxydé", "Le dioxygène (O₂) est l''accepteur final d''électrons", "Les produits sont : 6CO₂ + 6H₂O + énergie (36-38 ATP)"]}',
  '{"metabolisme","respiration","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000212',
  '33333333-0000-0000-0000-000000000033',
  'mcq', 2, 'fr',
  '{"stem": "Quel est l''organite cellulaire considéré comme le siège principal de la respiration cellulaire ?", "choices": ["La mitochondrie", "Le chloroplaste", "Le réticulum endoplasmique", "Le noyau"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La mitochondrie est l''organite où se déroulent le cycle de Krebs et la chaîne respiratoire. La glycolyse, première étape, a lieu dans le cytoplasme (hyaloplasme).", "steps": ["La glycolyse se déroule dans le hyaloplasme", "Le cycle de Krebs a lieu dans la matrice mitochondriale", "La chaîne respiratoire se situe sur la membrane interne de la mitochondrie"]}',
  '{"mitochondrie","respiration","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000213',
  '33333333-0000-0000-0000-000000000033',
  'mcq', 2, 'fr',
  '{"stem": "La glycolyse est la première étape de la respiration cellulaire. Quel est son bilan net en termes d''ATP ?", "choices": ["2 ATP", "4 ATP", "36 ATP", "38 ATP"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La glycolyse produit 4 ATP au total mais en consomme 2 lors de la phase d''activation, ce qui donne un bilan net de 2 ATP. Elle transforme une molécule de glucose en deux molécules de pyruvate.", "steps": ["La phase d''activation consomme 2 ATP", "La phase de rendement produit 4 ATP", "Bilan net : 4 - 2 = 2 ATP", "On obtient aussi 2 NADH,H⁺ et 2 pyruvates"]}',
  '{"glycolyse","ATP","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000214',
  '33333333-0000-0000-0000-000000000033',
  'numeric', 2, 'fr',
  '{"stem": "Combien de molécules d''ATP sont produites au total lors de l''oxydation complète d''une molécule de glucose par la respiration cellulaire ? (Donnez la valeur maximale théorique.)", "correct_value": 38, "tolerance": 2, "latex": true}',
  '{"text_fr": "Le bilan énergétique maximal de la respiration cellulaire est de 36 à 38 ATP par molécule de glucose oxydée.", "steps": ["Glycolyse : 2 ATP + 2 NADH,H⁺", "Cycle de Krebs : 2 ATP + 8 NADH,H⁺ + 2 FADH₂", "Chaîne respiratoire : réoxydation des coenzymes → ~34 ATP", "Total : 2 + 2 + 34 = 38 ATP (valeur maximale théorique)"]}',
  '{"bilan_energetique","ATP","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000215',
  '33333333-0000-0000-0000-000000000033',
  'true_false', 2, 'fr',
  '{"stem": "L''ATP (adénosine triphosphate) est la molécule qui assure le transfert d''énergie dans les cellules. Sa hydrolyse libère de l''énergie utilisable par la cellule.", "correct_answer": true, "latex": true}',
  '{"text_fr": "L''ATP est bien la molécule universelle de transfert d''énergie. Son hydrolyse (ATP → ADP + Pi) libère environ 30,5 kJ/mol, énergie directement utilisable pour les réactions cellulaires.", "steps": ["L''ATP est composée d''adénine, de ribose et de trois groupements phosphate", "L''hydrolyse de la liaison phosphate terminale libère de l''énergie", "ATP + H₂O → ADP + Pi + énergie (≈ 30,5 kJ/mol)"]}',
  '{"ATP","energie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000216',
  '33333333-0000-0000-0000-000000000033',
  'true_false', 3, 'fr',
  '{"stem": "Le cycle de Krebs se déroule dans le hyaloplasme (cytoplasme) de la cellule.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Le cycle de Krebs ne se déroule pas dans le hyaloplasme. Il a lieu dans la matrice mitochondriale. C''est la glycolyse qui se déroule dans le hyaloplasme.", "steps": ["La glycolyse a lieu dans le hyaloplasme", "Le cycle de Krebs se déroule dans la matrice de la mitochondrie", "La chaîne respiratoire est localisée sur la membrane interne mitochondriale"]}',
  '{"krebs","mitochondrie","bac_style"}'
);

-- =====================
-- SKILL: fermentation (Fermentation) — 6 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000217',
  '33333333-0000-0000-0000-000000000034',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est l''équation bilan simplifiée de la fermentation alcoolique ?", "choices": ["C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2ATP", "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38ATP", "C₆H₁₂O₆ → 2CH₃CHOHCOOH + 2ATP", "C₆H₁₂O₆ → 2C₂H₅OH + 6H₂O + 36ATP"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La fermentation alcoolique transforme le glucose en éthanol (C₂H₅OH) et en dioxyde de carbone (CO₂), avec un faible rendement énergétique de 2 ATP.", "steps": ["Le glucose est dégradé par glycolyse en 2 pyruvates (2 ATP)", "En anaérobiose, le pyruvate est décarboxylé en éthanal puis réduit en éthanol", "Bilan : C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2ATP"]}',
  '{"fermentation_alcoolique","equation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000218',
  '33333333-0000-0000-0000-000000000034',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de micro-organisme réalise couramment la fermentation alcoolique ?", "choices": ["Les levures (Saccharomyces cerevisiae)", "Les bactéries lactiques (Lactobacillus)", "Les algues vertes", "Les cyanobactéries"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La fermentation alcoolique est principalement réalisée par les levures, notamment Saccharomyces cerevisiae, utilisées dans la panification et la production de boissons alcoolisées.", "steps": ["Les levures sont des champignons unicellulaires", "Saccharomyces cerevisiae est l''espèce la plus utilisée", "En absence d''O₂, ces levures fermentent le glucose en éthanol et CO₂"]}',
  '{"levures","fermentation_alcoolique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000219',
  '33333333-0000-0000-0000-000000000034',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le produit final caractéristique de la fermentation lactique ?", "choices": ["L''acide lactique (lactate)", "L''éthanol", "L''acide acétique", "Le glycérol"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La fermentation lactique transforme le glucose en acide lactique (lactate). Elle est réalisée par des bactéries lactiques et se produit aussi dans les muscles lors d''un effort intense.", "steps": ["Le glucose est d''abord dégradé en pyruvate par la glycolyse", "Le pyruvate est réduit directement en acide lactique", "Bilan : C₆H₁₂O₆ → 2CH₃CHOHCOOH + 2ATP", "Pas de dégagement de CO₂ contrairement à la fermentation alcoolique"]}',
  '{"fermentation_lactique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000220',
  '33333333-0000-0000-0000-000000000034',
  'numeric', 2, 'fr',
  '{"stem": "Combien de molécules d''ATP sont produites lors de la fermentation d''une molécule de glucose ?", "correct_value": 2, "tolerance": 0, "latex": true}',
  '{"text_fr": "La fermentation (alcoolique ou lactique) ne produit que 2 ATP par molécule de glucose. Ce faible rendement s''explique par le fait que l''oxydation du glucose est incomplète : la molécule organique n''est pas totalement dégradée.", "steps": ["Seule la glycolyse produit de l''ATP lors de la fermentation", "Bilan net de la glycolyse : 2 ATP", "Il n''y a pas de cycle de Krebs ni de chaîne respiratoire en anaérobiose", "Comparaison : respiration = 36-38 ATP vs fermentation = 2 ATP"]}',
  '{"bilan_energetique","fermentation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000221',
  '33333333-0000-0000-0000-000000000034',
  'true_false', 2, 'fr',
  '{"stem": "La fermentation se déroule en conditions anaérobies, c''est-à-dire en absence de dioxygène.", "correct_answer": true, "latex": false}',
  '{"text_fr": "La fermentation est un processus métabolique anaérobie. En absence d''O₂, la cellule ne peut pas utiliser la chaîne respiratoire et recourt à la fermentation pour régénérer les coenzymes (NAD⁺) nécessaires à la glycolyse.", "steps": ["En présence d''O₂, la cellule réalise la respiration cellulaire", "En absence d''O₂ (anaérobiose), la cellule recourt à la fermentation", "La fermentation permet de régénérer le NAD⁺ consommé par la glycolyse", "C''est une dégradation incomplète du glucose"]}',
  '{"anaerobie","fermentation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000222',
  '33333333-0000-0000-0000-000000000034',
  'true_false', 3, 'fr',
  '{"stem": "Le rendement énergétique de la fermentation est supérieur à celui de la respiration cellulaire.", "correct_answer": false, "latex": false}',
  '{"text_fr": "C''est faux. Le rendement énergétique de la fermentation (2 ATP) est très inférieur à celui de la respiration cellulaire (36-38 ATP). La respiration dégrade complètement le glucose grâce au cycle de Krebs et à la chaîne respiratoire, tandis que la fermentation ne réalise qu''une dégradation partielle.", "steps": ["Fermentation : 2 ATP par molécule de glucose", "Respiration : 36 à 38 ATP par molécule de glucose", "Le rapport est d''environ 1/19 en faveur de la respiration", "La fermentation laisse de l''énergie dans les produits organiques (éthanol ou lactate)"]}',
  '{"comparaison","rendement","bac_style"}'
);
