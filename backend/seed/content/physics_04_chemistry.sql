-- ============================================================
-- PHYSICS CONTENT: Chimie (2 skills, 14 items)
-- Topic: Chimie (part of Physique-Chimie subject)
-- Skills:
--   acid_base  (33333333-...-031) difficulty 2 — 7 items
--   redox      (33333333-...-032) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: acid_base (Reactions acido-basiques) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000197',
  '33333333-0000-0000-0000-000000000031',
  'mcq', 2, 'fr',
  '{"stem": "Selon la définition de Brønsted, un acide est une espèce chimique capable de :", "choices": ["Céder un proton H⁺", "Capter un proton H⁺", "Céder un électron", "Capter un électron"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Selon Brønsted, un acide est un donneur de proton (H⁺). Il cède un proton à une base qui, elle, est un accepteur de proton.", "steps": ["Définition de Brønsted :", "Un acide est un donneur de proton H⁺", "Une base est un accepteur de proton H⁺", "Exemple : HCl → H⁺ + Cl⁻ (HCl est l''acide)"]}',
  '{"acido_basique","definition_bronsted","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000198',
  '33333333-0000-0000-0000-000000000031',
  'mcq', 2, 'fr',
  '{"stem": "On considère le couple acide/base CH₃COOH / CH₃COO⁻. L''équation de la réaction de l''acide éthanoïque avec l''eau s''écrit :", "choices": ["CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺", "CH₃COOH + H₂O ⇌ CH₃COO⁻ + OH⁻", "CH₃COO⁻ + H₂O ⇌ CH₃COOH + H₃O⁺", "CH₃COOH ⇌ CH₃COO⁻ + e⁻"], "correct_index": 0, "latex": true}',
  '{"text_fr": "L''acide éthanoïque CH₃COOH cède un proton H⁺ à l''eau H₂O (base du couple H₃O⁺/H₂O). On obtient la base conjuguée CH₃COO⁻ et l''ion hydronium H₃O⁺.", "steps": ["L''acide CH₃COOH cède un proton à H₂O", "CH₃COOH → CH₃COO⁻ + H⁺ (demi-équation acide)", "H₂O + H⁺ → H₃O⁺ (demi-équation base)", "Bilan : CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺"]}',
  '{"acido_basique","couple_acide_base","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000199',
  '33333333-0000-0000-0000-000000000031',
  'numeric', 2, 'fr',
  '{"stem": "On dispose d''une solution aqueuse dont la concentration en ions hydronium est [H₃O⁺] = 1,0 × 10⁻³ mol·L⁻¹. Calculer le pH de cette solution.", "correct_value": 3.0, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Le pH est défini par pH = -log([H₃O⁺]). Donc pH = -log(1,0 × 10⁻³) = -(-3) = 3,0.", "steps": ["Formule : pH = -log([H₃O⁺])", "pH = -log(1,0 × 10⁻³)", "pH = -(-3,0)", "pH = 3,0"]}',
  '{"acido_basique","pH","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000200',
  '33333333-0000-0000-0000-000000000031',
  'true_false', 2, 'fr',
  '{"stem": "Le produit ionique de l''eau à 25 °C vaut Ke = [H₃O⁺] × [OH⁻] = 10⁻¹⁴.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. À 25 °C, le produit ionique de l''eau est Ke = [H₃O⁺] × [OH⁻] = 10⁻¹⁴. Cette relation est fondamentale et permet de relier pH et pOH : pH + pOH = 14.", "steps": ["L''eau s''auto-ionise : 2H₂O ⇌ H₃O⁺ + OH⁻", "Le produit ionique : Ke = [H₃O⁺] × [OH⁻]", "À 25 °C : Ke = 10⁻¹⁴", "On en déduit : pH + pOH = 14"]}',
  '{"acido_basique","produit_ionique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000201',
  '33333333-0000-0000-0000-000000000031',
  'numeric', 3, 'fr',
  '{"stem": "On donne la constante d''acidité de l''acide éthanoïque : Ka = 1,58 × 10⁻⁵. Calculer le pKa de ce couple (arrondir au dixième).", "correct_value": 4.8, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "Le pKa est défini par pKa = -log(Ka). Donc pKa = -log(1,58 × 10⁻⁵) = -(log(1,58) + log(10⁻⁵)) = -(0,199 - 5) = 4,80.", "steps": ["Formule : pKa = -log(Ka)", "pKa = -log(1,58 × 10⁻⁵)", "pKa = -(log(1,58) + log(10⁻⁵))", "pKa = -(0,199 - 5) = 4,80"]}',
  '{"acido_basique","Ka_pKa","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000202',
  '33333333-0000-0000-0000-000000000031',
  'mcq', 3, 'fr',
  '{"stem": "On réalise le dosage de V₀ = 20,0 mL d''acide chlorhydrique (HCl) de concentration inconnue Cₐ par une solution de soude (NaOH) de concentration Cb = 0,10 mol·L⁻¹. Le volume de soude versé à l''équivalence est Vₑ = 15,0 mL. Déterminer Cₐ.", "choices": ["0,075 mol·L⁻¹", "0,10 mol·L⁻¹", "0,15 mol·L⁻¹", "0,050 mol·L⁻¹"], "correct_index": 0, "latex": true}',
  '{"text_fr": "À l''équivalence, les réactifs sont dans les proportions stoechiométriques : nₐ = n_b, soit Cₐ × V₀ = Cb × Vₑ. Donc Cₐ = Cb × Vₑ / V₀ = 0,10 × 15,0 / 20,0 = 0,075 mol·L⁻¹.", "steps": ["À l''équivalence : nₐ = n_b", "Cₐ × V₀ = Cb × Vₑ", "Cₐ = (0,10 × 15,0) / 20,0", "Cₐ = 1,50 / 20,0 = 0,075 mol·L⁻¹"]}',
  '{"acido_basique","dosage","equivalence","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000203',
  '33333333-0000-0000-0000-000000000031',
  'true_false', 3, 'fr',
  '{"stem": "Lors d''un dosage acido-basique, au point d''équivalence, le pH est toujours égal à 7.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Le pH à l''équivalence n''est égal à 7 que dans le cas du dosage d''un acide fort par une base forte (ou inversement). Pour un acide faible dosé par une base forte, le pH à l''équivalence est supérieur à 7 ; pour une base faible dosée par un acide fort, il est inférieur à 7.", "steps": ["Acide fort / base forte : pH = 7 à l''équivalence", "Acide faible / base forte : pH > 7 à l''équivalence (car la base conjuguée est présente)", "Base faible / acide fort : pH < 7 à l''équivalence", "Le pH à l''équivalence dépend de la nature de l''acide et de la base"]}',
  '{"acido_basique","dosage","piege_classique","bac_style"}'
);

-- =====================
-- SKILL: redox (Reactions d'oxydoreduction) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000204',
  '33333333-0000-0000-0000-000000000032',
  'mcq', 3, 'fr',
  '{"stem": "Dans une réaction d''oxydoréduction, un oxydant est une espèce chimique qui :", "choices": ["Gagne des électrons (se réduit)", "Perd des électrons (s''oxyde)", "Gagne des protons", "Perd des protons"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Un oxydant est une espèce capable de capter (gagner) des électrons : il subit une réduction. Un réducteur est une espèce capable de céder (perdre) des électrons : il subit une oxydation.", "steps": ["Oxydant = espèce qui gagne des électrons", "L''oxydant subit une réduction (gain d''e⁻)", "Réducteur = espèce qui perd des électrons", "Le réducteur subit une oxydation (perte d''e⁻)"]}',
  '{"redox","definition","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000205',
  '33333333-0000-0000-0000-000000000032',
  'mcq', 3, 'fr',
  '{"stem": "On considère les couples redox Cu²⁺/Cu et Zn²⁺/Zn. La réaction spontanée entre le zinc métallique et les ions cuivre(II) s''écrit :", "choices": ["Zn + Cu²⁺ → Zn²⁺ + Cu", "Cu + Zn²⁺ → Cu²⁺ + Zn", "Zn²⁺ + Cu²⁺ → Zn + Cu", "Zn + Cu → Zn²⁺ + Cu²⁺"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le zinc est un réducteur plus fort que le cuivre. Le zinc s''oxyde (Zn → Zn²⁺ + 2e⁻) et les ions Cu²⁺ se réduisent (Cu²⁺ + 2e⁻ → Cu). Le bilan est Zn + Cu²⁺ → Zn²⁺ + Cu.", "steps": ["Oxydation du zinc : Zn → Zn²⁺ + 2e⁻", "Réduction du cuivre : Cu²⁺ + 2e⁻ → Cu", "Bilan : Zn + Cu²⁺ → Zn²⁺ + Cu", "Le zinc (réducteur) cède ses électrons au Cu²⁺ (oxydant)"]}',
  '{"redox","couples_redox","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000206',
  '33333333-0000-0000-0000-000000000032',
  'numeric', 3, 'fr',
  '{"stem": "Déterminer le nombre d''oxydation de l''atome de manganèse Mn dans l''ion permanganate MnO₄⁻.", "correct_value": 7, "tolerance": 0, "latex": true}',
  '{"text_fr": "Dans MnO₄⁻, le nombre d''oxydation de O est -II. La somme des nombres d''oxydation doit être égale à la charge de l''ion (-1). Soit x le n.o. de Mn : x + 4×(-2) = -1, donc x - 8 = -1, d''où x = +7.", "steps": ["n.o.(O) = -II dans un composé (règle générale)", "Somme des n.o. = charge de l''ion = -1", "n.o.(Mn) + 4 × (-2) = -1", "n.o.(Mn) - 8 = -1", "n.o.(Mn) = +7"]}',
  '{"redox","nombre_oxydation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000207',
  '33333333-0000-0000-0000-000000000032',
  'mcq', 3, 'fr',
  '{"stem": "On dispose d''une pile électrochimique constituée d''une électrode de zinc plongeant dans une solution de Zn²⁺ et d''une électrode de cuivre plongeant dans une solution de Cu²⁺. Dans cette pile, l''anode est :", "choices": ["L''électrode de zinc (pôle négatif)", "L''électrode de cuivre (pôle positif)", "L''électrode de zinc (pôle positif)", "L''électrode de cuivre (pôle négatif)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Dans la pile Daniell (Zn/Cu), le zinc s''oxyde à l''anode (Zn → Zn²⁺ + 2e⁻). L''anode est le siège de l''oxydation et constitue le pôle négatif de la pile. Le cuivre se dépose à la cathode (pôle positif) par réduction de Cu²⁺.", "steps": ["Le zinc est le réducteur le plus fort : il s''oxyde", "Anode = siège de l''oxydation = électrode de zinc", "L''anode est le pôle négatif (–) de la pile", "Cathode = siège de la réduction = électrode de cuivre = pôle positif (+)"]}',
  '{"redox","pile_electrochimique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000208',
  '33333333-0000-0000-0000-000000000032',
  'numeric', 3, 'fr',
  '{"stem": "On donne les potentiels standard : E°(Cu²⁺/Cu) = +0,34 V et E°(Zn²⁺/Zn) = -0,76 V. Calculer la force électromotrice (f.é.m.) de la pile Daniell Zn-Cu en volts.", "correct_value": 1.10, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "La f.é.m. d''une pile est E = E°(cathode) - E°(anode). La cathode est l''électrode de cuivre (potentiel plus élevé) et l''anode est l''électrode de zinc. Donc E = 0,34 - (-0,76) = 0,34 + 0,76 = 1,10 V.", "steps": ["Cathode (réduction) : Cu²⁺/Cu, E° = +0,34 V", "Anode (oxydation) : Zn²⁺/Zn, E° = -0,76 V", "f.é.m. = E°(cathode) - E°(anode)", "f.é.m. = 0,34 - (-0,76) = 1,10 V"]}',
  '{"redox","fem_pile","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000209',
  '33333333-0000-0000-0000-000000000032',
  'true_false', 3, 'fr',
  '{"stem": "Pour équilibrer l''équation redox en milieu acide : MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺, il faut 5 ions Fe²⁺ pour 1 ion MnO₄⁻.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. La demi-équation de réduction est : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (transfert de 5 électrons). La demi-équation d''oxydation est : Fe²⁺ → Fe³⁺ + e⁻ (transfert de 1 électron). Pour équilibrer les électrons, il faut multiplier l''oxydation par 5 : 5 Fe²⁺ pour 1 MnO₄⁻.", "steps": ["Réduction : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O", "Oxydation : Fe²⁺ → Fe³⁺ + e⁻", "Équilibrage des électrons : on multiplie l''oxydation par 5", "Bilan : MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O"]}',
  '{"redox","equilibrage","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000210',
  '33333333-0000-0000-0000-000000000032',
  'numeric', 4, 'fr',
  '{"stem": "On réalise l''électrolyse d''une solution de chlorure de cuivre(II) CuCl₂. Un courant d''intensité I = 2,0 A circule pendant t = 965 s. Calculer la masse de cuivre déposée à la cathode en grammes. On donne : M(Cu) = 63,5 g·mol⁻¹, F = 96500 C·mol⁻¹, Cu²⁺ + 2e⁻ → Cu.", "correct_value": 0.635, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "La quantité d''électricité est Q = I × t = 2,0 × 965 = 1930 C. La quantité de moles d''électrons est n(e⁻) = Q/F = 1930/96500 = 0,02 mol. D''après Cu²⁺ + 2e⁻ → Cu, n(Cu) = n(e⁻)/2 = 0,01 mol. La masse est m = n × M = 0,01 × 63,5 = 0,635 g.", "steps": ["Q = I × t = 2,0 × 965 = 1930 C", "n(e⁻) = Q / F = 1930 / 96500 = 0,02 mol", "D''après la demi-équation : n(Cu) = n(e⁻) / 2 = 0,01 mol", "m(Cu) = n(Cu) × M(Cu) = 0,01 × 63,5 = 0,635 g"]}',
  '{"redox","electrolyse","bac_style"}'
);
