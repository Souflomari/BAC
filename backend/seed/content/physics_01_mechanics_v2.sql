-- ============================================================
-- PHYSICS CONTENT v2: Mécanique (3 skills, 24 items)
-- Authentic Moroccan Baccalauréat exam patterns with SVG figures
-- Skills:
--   kinematics     (33333333-...-024) — 8 items
--   newtons_laws   (33333333-...-025) — 8 items
--   energy         (33333333-...-026) — 8 items
-- Items: 44444444-0000-0000-0000-000000000867 → ...890
-- ============================================================

-- =====================
-- SKILL: kinematics (Cinématique) — 8 items
-- Covers: tir parabolique, mouvement circulaire, graphiques v-t,
--         équation horaire, mouvement relatif, trajectoire complète
-- =====================

-- 867: Tir parabolique — équation trajectoire — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000867',
  '33333333-0000-0000-0000-000000000024',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Un projectile est lancé depuis le sol avec une vitesse initiale $v_0 = 20$ m/s et un angle $\\alpha = 45°$ par rapport à l'horizontale. Quelle est l'équation de la trajectoire $y(x)$ ? On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='40' y1='210' x2='380' y2='210' stroke='#64748B' stroke-width='2'/><line x1='40' y1='210' x2='40' y2='20' stroke='#64748B' stroke-width='2'/><path d='M 40 210 Q 130 60 300 210' stroke='#4A90D9' stroke-width='2.5' fill='none' stroke-dasharray='8,4'/><line x1='40' y1='210' x2='100' y2='150' stroke='#E8744F' stroke-width='2.5' marker-end='url(#arrowOrange)'/><line x1='40' y1='210' x2='100' y2='210' stroke='#10B981' stroke-width='1.5' stroke-dasharray='4,3'/><line x1='100' y1='210' x2='100' y2='150' stroke='#10B981' stroke-width='1.5' stroke-dasharray='4,3'/><defs><marker id='arrowOrange' markerWidth='10' markerHeight='7' refX='10' refY='3.5' orient='auto'><polygon points='0 0, 10 3.5, 0 7' fill='#E8744F'/></marker></defs><text x='75' y='170' font-size='13' fill='#E8744F' font-style='italic'>v₀</text><text x='55' y='195' font-size='12' fill='#64748B'>α</text><text x='390' y='225' font-size='12' fill='#64748B'>x</text><text x='25' y='15' font-size='12' fill='#64748B'>y</text><text x='150' y='100' font-size='12' fill='#4A90D9'>trajectoire</text><circle cx='40' cy='210' r='4' fill='#E8744F'/><circle cx='300' cy='210' r='4' fill='#E8744F'/></svg>",
      "alt_text": "Trajectoire parabolique d'un projectile lancé avec un angle alpha depuis le sol"
    },
    "choices": ["$y = x - \\\\frac{x^2}{40}$", "$y = x - \\\\frac{x^2}{80}$", "$y = x - \\\\frac{x^2}{20}$", "$y = 2x - \\\\frac{x^2}{40}$"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Avec $v_0 = 20$ m/s et $\\alpha = 45°$ : $v_{0x} = v_0 \\cos 45° = 10\\sqrt{2}$ m/s, $v_{0y} = v_0 \\sin 45° = 10\\sqrt{2}$ m/s. L'équation de la trajectoire est $y = x \\tan\\alpha - \\frac{g x^2}{2 v_0^2 \\cos^2\\alpha}$. Avec $\\tan 45° = 1$ et $\\cos^2 45° = 0{,}5$ : $y = x - \\frac{10 x^2}{2 \\times 400 \\times 0{,}5} = x - \\frac{x^2}{40}$.",
    "steps": [
      "Composantes : $v_{0x} = v_0 \\cos\\alpha$, $v_{0y} = v_0 \\sin\\alpha$",
      "Équation trajectoire : $y = x\\tan\\alpha - \\frac{g x^2}{2 v_0^2 \\cos^2\\alpha}$",
      "$\\tan 45° = 1$, $\\cos^2 45° = 0{,}5$",
      "$y = x - \\frac{10 x^2}{2 \\times 400 \\times 0{,}5} = x - \\frac{x^2}{40}$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de la trajectoire parabolique : $y = x \\tan\\alpha - \\frac{g x^2}{2 v_0^2 \\cos^2\\alpha}$."}$h$::jsonb,
  ARRAY['cinematique','tir_parabolique','trajectoire','bac_2024']
);

-- 868: Tir parabolique — hauteur maximale — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000868',
  '33333333-0000-0000-0000-000000000024',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Un projectile est lancé avec une vitesse initiale $v_0 = 30$ m/s sous un angle $\\alpha = 60°$ par rapport à l'horizontale. Calculer la hauteur maximale $H$ atteinte (en m). On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='30' y1='220' x2='380' y2='220' stroke='#64748B' stroke-width='2'/><line x1='30' y1='220' x2='30' y2='10' stroke='#64748B' stroke-width='2'/><path d='M 30 220 Q 120 20 330 220' stroke='#4A90D9' stroke-width='2.5' fill='none'/><line x1='150' y1='220' x2='150' y2='55' stroke='#10B981' stroke-width='1.5' stroke-dasharray='5,3'/><polygon points='147,60 150,48 153,60' fill='#10B981'/><text x='155' y='140' font-size='13' fill='#10B981' font-weight='bold'>H</text><text x='30' y='240' font-size='12' fill='#64748B'>O</text><text x='385' y='225' font-size='12' fill='#64748B'>x</text><text x='15' y='15' font-size='12' fill='#64748B'>y</text><circle cx='150' cy='55' r='5' fill='#E8744F'/><text x='135' y='45' font-size='11' fill='#E8744F'>Sommet</text></svg>",
      "alt_text": "Trajectoire parabolique montrant la hauteur maximale H au sommet"
    },
    "correct_value": 33.75,
    "tolerance": 0.5
  }$q$::jsonb,
  $e${
    "text_fr": "La hauteur maximale est atteinte quand $v_y = 0$. On a $v_{0y} = v_0 \\sin\\alpha = 30 \\times \\sin 60° = 30 \\times \\frac{\\sqrt{3}}{2} = 15\\sqrt{3}$ m/s. Au sommet : $v_y^2 = v_{0y}^2 - 2gH = 0$. Donc $H = \\frac{v_{0y}^2}{2g} = \\frac{(15\\sqrt{3})^2}{2 \\times 10} = \\frac{675}{20} = 33{,}75$ m.",
    "steps": [
      "$v_{0y} = v_0 \\sin 60° = 30 \\times \\frac{\\sqrt{3}}{2} = 15\\sqrt{3}$ m/s",
      "Au sommet : $v_y = 0$",
      "$H = \\frac{v_{0y}^2}{2g} = \\frac{(15\\sqrt{3})^2}{20}$",
      "$H = \\frac{675}{20} = 33{,}75$ m"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Au sommet de la trajectoire, la composante verticale de la vitesse est nulle. Utilisez $v_y^2 = v_{0y}^2 - 2gH$."}$h$::jsonb,
  ARRAY['cinematique','tir_parabolique','hauteur_max','bac_2024']
);

-- 869: Tir parabolique — portée — numeric (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000869',
  '33333333-0000-0000-0000-000000000024',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "Un projectile est lancé du sol avec $v_0 = 40$ m/s et $\\alpha = 30°$. Calculer la portée horizontale $D$ (en m). On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='30' y1='210' x2='380' y2='210' stroke='#64748B' stroke-width='2'/><path d='M 30 210 Q 180 80 370 210' stroke='#4A90D9' stroke-width='2.5' fill='none'/><line x1='30' y1='210' x2='370' y2='210' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='6,3'/><text x='190' y='230' font-size='14' fill='#E8744F' font-weight='bold' text-anchor='middle'>D = ?</text><polygon points='365,207 375,210 365,213' fill='#E8744F'/><polygon points='35,207 25,210 35,213' fill='#E8744F'/><line x1='30' y1='210' x2='85' y2='175' stroke='#10B981' stroke-width='2' marker-end='url(#arrG)'/><defs><marker id='arrG' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs><text x='55' y='183' font-size='12' fill='#10B981'>v₀</text><text x='55' y='205' font-size='11' fill='#64748B'>30°</text><circle cx='30' cy='210' r='4' fill='#4A90D9'/><circle cx='370' cy='210' r='4' fill='#4A90D9'/></svg>",
      "alt_text": "Trajectoire parabolique avec indication de la portée D"
    },
    "correct_value": 138.56,
    "tolerance": 1
  }$q$::jsonb,
  $e${
    "text_fr": "La portée est $D = \\frac{v_0^2 \\sin(2\\alpha)}{g}$. Avec $\\alpha = 30°$ : $\\sin(60°) = \\frac{\\sqrt{3}}{2} \\approx 0{,}866$. Donc $D = \\frac{40^2 \\times 0{,}866}{10} = \\frac{1600 \\times 0{,}866}{10} = \\frac{1385{,}6}{10} \\approx 138{,}6$ m.",
    "steps": [
      "Formule de la portée : $D = \\frac{v_0^2 \\sin 2\\alpha}{g}$",
      "$\\sin 2\\alpha = \\sin 60° = \\frac{\\sqrt{3}}{2} \\approx 0{,}866$",
      "$D = \\frac{1600 \\times 0{,}866}{10}$",
      "$D \\approx 138{,}6$ m"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de la portée : $D = \\frac{v_0^2 \\sin(2\\alpha)}{g}$."}$h$::jsonb,
  ARRAY['cinematique','tir_parabolique','portee','bac_2024']
);

-- 870: Mouvement circulaire — accélération centripète — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000870',
  '33333333-0000-0000-0000-000000000024',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Un satellite décrit une orbite circulaire de rayon $R = 6{,}8 \\times 10^6$ m autour de la Terre avec une vitesse $v = 7{,}7 \\times 10^3$ m/s. Quelle est la valeur de l'accélération centripète (en m/s²) ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><circle cx='200' cy='150' r='100' stroke='#4A90D9' stroke-width='2' fill='none' stroke-dasharray='8,4'/><circle cx='200' cy='150' r='15' fill='#10B981' opacity='0.3' stroke='#10B981' stroke-width='2'/><text x='200' y='155' font-size='11' fill='#10B981' text-anchor='middle'>Terre</text><circle cx='300' cy='150' r='6' fill='#E8744F'/><text x='310' y='145' font-size='11' fill='#E8744F'>Satellite</text><line x1='200' y1='150' x2='295' y2='150' stroke='#64748B' stroke-width='1.5' stroke-dasharray='4,3'/><text x='245' y='142' font-size='12' fill='#64748B'>R</text><line x1='300' y1='150' x2='300' y2='95' stroke='#4A90D9' stroke-width='2' marker-end='url(#arrB)'/><defs><marker id='arrB' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs><text x='308' y='118' font-size='12' fill='#4A90D9' font-style='italic'>v</text><line x1='300' y1='150' x2='240' y2='150' stroke='#E8744F' stroke-width='2' marker-end='url(#arrR)'/><defs><marker id='arrR' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs><text x='255' y='168' font-size='12' fill='#E8744F' font-style='italic'>a_c</text></svg>",
      "alt_text": "Satellite en orbite circulaire autour de la Terre avec vecteurs vitesse et accélération centripète"
    },
    "choices": ["$8{,}72$ m/s²", "$11{,}3$ m/s²", "$5{,}24$ m/s²", "$9{,}81$ m/s²"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "L'accélération centripète est $a_c = \\frac{v^2}{R} = \\frac{(7{,}7 \\times 10^3)^2}{6{,}8 \\times 10^6} = \\frac{5{,}929 \\times 10^7}{6{,}8 \\times 10^6} \\approx 8{,}72$ m/s².",
    "steps": [
      "Formule : $a_c = \\frac{v^2}{R}$",
      "$v^2 = (7700)^2 = 5{,}929 \\times 10^7$ m²/s²",
      "$a_c = \\frac{5{,}929 \\times 10^7}{6{,}8 \\times 10^6}$",
      "$a_c \\approx 8{,}72$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "L'accélération centripète se calcule avec $a_c = \\frac{v^2}{R}$."}$h$::jsonb,
  ARRAY['cinematique','mouvement_circulaire','satellite','bac_2024']
);

-- 871: Graphique v-t — distance parcourue — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000871',
  '33333333-0000-0000-0000-000000000024',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Le graphique ci-dessous représente la vitesse $v(t)$ d'un mobile. Calculer la distance totale parcourue (en m) entre $t = 0$ s et $t = 8$ s.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='50' y1='210' x2='380' y2='210' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='50' y2='20' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='130' y2='90' stroke='#4A90D9' stroke-width='2.5'/><line x1='130' y1='90' x2='250' y2='90' stroke='#4A90D9' stroke-width='2.5'/><line x1='250' y1='90' x2='330' y2='210' stroke='#4A90D9' stroke-width='2.5'/><line x1='50' y1='90' x2='130' y2='90' stroke='#64748B' stroke-width='0.8' stroke-dasharray='4,3'/><text x='30' y='95' font-size='12' fill='#64748B'>20</text><text x='30' y='215' font-size='12' fill='#64748B'>0</text><text x='125' y='228' font-size='12' fill='#64748B'>2</text><text x='205' y='228' font-size='12' fill='#64748B'>5</text><text x='325' y='228' font-size='12' fill='#64748B'>8</text><text x='370' y='228' font-size='12' fill='#64748B'>t(s)</text><text x='15' y='30' font-size='12' fill='#64748B'>v(m/s)</text><rect x='50' y='90' width='80' height='120' fill='#4A90D9' opacity='0.08'/><rect x='130' y='90' width='120' height='120' fill='#10B981' opacity='0.08'/><rect x='250' y='90' width='80' height='120' fill='#E8744F' opacity='0.08'/><circle cx='50' cy='210' r='3' fill='#4A90D9'/><circle cx='130' cy='90' r='3' fill='#4A90D9'/><circle cx='250' cy='90' r='3' fill='#4A90D9'/><circle cx='330' cy='210' r='3' fill='#4A90D9'/></svg>",
      "alt_text": "Graphique v-t : accélération de 0 à 2s (v passe de 0 à 20 m/s), vitesse constante de 2s à 5s (v=20 m/s), décélération de 5s à 8s (v passe de 20 à 0 m/s)"
    },
    "correct_value": 110,
    "tolerance": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La distance parcourue est l'aire sous la courbe v(t). Phase 1 (0→2 s) : triangle, aire = ½ × 2 × 20 = 20 m. Phase 2 (2→5 s) : rectangle, aire = 3 × 20 = 60 m. Phase 3 (5→8 s) : triangle, aire = ½ × 3 × 20 = 30 m. Distance totale = 20 + 60 + 30 = 110 m.",
    "steps": [
      "La distance = aire sous la courbe v(t)",
      "Phase 1 (0 à 2 s) : aire triangle = ½ × 2 × 20 = 20 m",
      "Phase 2 (2 à 5 s) : aire rectangle = 3 × 20 = 60 m",
      "Phase 3 (5 à 8 s) : aire triangle = ½ × 3 × 20 = 30 m",
      "Distance totale = 20 + 60 + 30 = 110 m"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='50' y1='210' x2='380' y2='210' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='50' y2='20' stroke='#64748B' stroke-width='2'/><polygon points='50,210 130,90 130,210' fill='#4A90D9' opacity='0.2' stroke='#4A90D9' stroke-width='1.5'/><rect x='130' y='90' width='120' height='120' fill='#10B981' opacity='0.2' stroke='#10B981' stroke-width='1.5'/><polygon points='250,90 330,210 250,210' fill='#E8744F' opacity='0.2' stroke='#E8744F' stroke-width='1.5'/><text x='80' y='175' font-size='12' fill='#4A90D9' font-weight='bold'>20 m</text><text x='175' y='160' font-size='12' fill='#10B981' font-weight='bold'>60 m</text><text x='265' y='175' font-size='12' fill='#E8744F' font-weight='bold'>30 m</text></svg>",
      "alt_text": "Aires sous la courbe v-t colorées par phase"
    }
  }$e$::jsonb,
  $h${"text_fr": "La distance parcourue correspond à l'aire sous la courbe v(t). Décomposez en triangles et rectangles."}$h$::jsonb,
  ARRAY['cinematique','graphique_vt','aire','bac_2024']
);

-- 872: Graphique v-t — accélération — mcq (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000872',
  '33333333-0000-0000-0000-000000000024',
  'mcq',
  2,
  'fr',
  $q${
    "stem": "À partir du graphique v-t ci-dessous, déterminer l'accélération du mobile pendant la phase (0 à 4 s).",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='50' y1='210' x2='370' y2='210' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='50' y2='20' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='210' y2='50' stroke='#4A90D9' stroke-width='2.5'/><line x1='210' y1='50' x2='340' y2='50' stroke='#4A90D9' stroke-width='2.5'/><line x1='50' y1='50' x2='210' y2='50' stroke='#64748B' stroke-width='0.8' stroke-dasharray='4,3'/><line x1='210' y1='50' x2='210' y2='210' stroke='#64748B' stroke-width='0.8' stroke-dasharray='4,3'/><text x='30' y='55' font-size='12' fill='#64748B'>16</text><text x='30' y='215' font-size='12' fill='#64748B'>0</text><text x='205' y='228' font-size='12' fill='#64748B'>4</text><text x='335' y='228' font-size='12' fill='#64748B'>7</text><text x='365' y='228' font-size='12' fill='#64748B'>t(s)</text><text x='15' y='30' font-size='12' fill='#64748B'>v(m/s)</text></svg>",
      "alt_text": "Graphique v-t : v augmente linéairement de 0 à 16 m/s entre 0 et 4 s, puis reste constante à 16 m/s"
    },
    "choices": ["$a = 4$ m/s²", "$a = 16$ m/s²", "$a = 8$ m/s²", "$a = 2$ m/s²"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "L'accélération est la pente du graphique v(t). Entre 0 et 4 s : $a = \\frac{\\Delta v}{\\Delta t} = \\frac{16 - 0}{4 - 0} = 4$ m/s².",
    "steps": [
      "L'accélération = pente de v(t)",
      "$a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_f - v_i}{t_f - t_i}$",
      "$a = \\frac{16 - 0}{4 - 0} = \\frac{16}{4}$",
      "$a = 4$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "L'accélération est la pente de la droite v(t). Calculez $a = \\frac{\\Delta v}{\\Delta t}$."}$h$::jsonb,
  ARRAY['cinematique','graphique_vt','acceleration','bac_style']
);

-- 873: Équation horaire x(t) — true_false (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000873',
  '33333333-0000-0000-0000-000000000024',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "Un mobile a pour équation horaire $x(t) = 5t^2 - 3t + 2$ (SI). Ce mobile est en mouvement rectiligne uniforme.",
    "correct_answer": false,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='50' y1='210' x2='370' y2='210' stroke='#64748B' stroke-width='2'/><line x1='50' y1='210' x2='50' y2='20' stroke='#64748B' stroke-width='2'/><path d='M 60 200 Q 150 180 250 100 Q 300 60 350 0' stroke='#4A90D9' stroke-width='2.5' fill='none'/><text x='365' y='225' font-size='12' fill='#64748B'>t(s)</text><text x='15' y='30' font-size='12' fill='#64748B'>x(m)</text><text x='120' y='170' font-size='12' fill='#4A90D9'>x(t) = 5t² − 3t + 2</text></svg>",
      "alt_text": "Graphique x-t montrant une courbe parabolique (pas une droite)"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Faux. L'équation $x(t) = 5t^2 - 3t + 2$ contient un terme en $t^2$, ce qui indique un mouvement rectiligne uniformément varié (MRUV) avec une accélération $a = 2 \\times 5 = 10$ m/s². Un MRU aurait une équation de la forme $x(t) = v_0 t + x_0$ (linéaire en $t$).",
    "steps": [
      "En MRU : $x(t) = x_0 + v_0 t$ (fonction linéaire de t)",
      "En MRUV : $x(t) = x_0 + v_0 t + \\frac{1}{2}at^2$ (fonction quadratique)",
      "Ici $x(t) = 5t^2 - 3t + 2$ : présence du terme $5t^2$",
      "Donc c'est un MRUV avec $a = 2 \\times 5 = 10$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Un MRU a une équation linéaire en t. Vérifiez si l'équation donnée contient un terme en $t^2$."}$h$::jsonb,
  ARRAY['cinematique','equation_horaire','mruv','bac_style']
);

-- 874: Mouvement relatif — true_false (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000874',
  '33333333-0000-0000-0000-000000000024',
  'true_false',
  4,
  'fr',
  $q${
    "stem": "Deux voitures A et B roulent dans le même sens sur une autoroute. La voiture A a une vitesse $v_A = 120$ km/h et la voiture B a une vitesse $v_B = 90$ km/h par rapport au sol. La vitesse de A par rapport à B est de 210 km/h.",
    "correct_answer": false,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><rect x='20' y='110' width='360' height='40' fill='#64748B' opacity='0.15' rx='3'/><line x1='20' y1='130' x2='380' y2='130' stroke='#64748B' stroke-width='1' stroke-dasharray='10,8'/><rect x='80' y='105' width='60' height='30' fill='#4A90D9' rx='5'/><text x='110' y='125' font-size='12' fill='white' text-anchor='middle' font-weight='bold'>B</text><line x1='145' y1='120' x2='185' y2='120' stroke='#4A90D9' stroke-width='2' marker-end='url(#aB)'/><text x='155' y='112' font-size='10' fill='#4A90D9'>90 km/h</text><rect x='230' y='105' width='60' height='30' fill='#E8744F' rx='5'/><text x='260' y='125' font-size='12' fill='white' text-anchor='middle' font-weight='bold'>A</text><line x1='295' y1='120' x2='350' y2='120' stroke='#E8744F' stroke-width='2' marker-end='url(#aA)'/><text x='305' y='112' font-size='10' fill='#E8744F'>120 km/h</text><defs><marker id='aB' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker><marker id='aA' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs><text x='200' y='180' font-size='13' fill='#64748B' text-anchor='middle'>Même sens de circulation</text></svg>",
      "alt_text": "Deux voitures A et B roulant dans le même sens sur une autoroute, A à 120 km/h et B à 90 km/h"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Faux. Quand deux mobiles se déplacent dans le même sens, la vitesse relative de A par rapport à B est $v_{A/B} = v_A - v_B = 120 - 90 = 30$ km/h (et non 210 km/h). On additionne les vitesses seulement quand les mobiles se déplacent en sens opposés.",
    "steps": [
      "Même sens : $v_{A/B} = v_A - v_B$",
      "$v_{A/B} = 120 - 90 = 30$ km/h",
      "On additionne ($v_A + v_B$) uniquement en sens opposés",
      "Donc 210 km/h est faux, la bonne réponse est 30 km/h"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Pour deux mobiles dans le même sens, la vitesse relative est la différence des vitesses, pas la somme."}$h$::jsonb,
  ARRAY['cinematique','mouvement_relatif','vitesse_relative','bac_style']
);

-- =====================
-- SKILL: newtons_laws (Lois de Newton) — 8 items
-- Covers: plan incliné avec frottement, machine d'Atwood, pendule simple,
--         plateau tournant, corps liés, ascenseur, coefficient frottement
-- =====================

-- 875: Plan incliné avec frottement — numeric (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000875',
  '33333333-0000-0000-0000-000000000025',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "Un bloc de masse $m = 5$ kg glisse le long d'un plan incliné d'angle $\\alpha = 30°$ avec un coefficient de frottement cinétique $\\mu = 0{,}2$. Calculer l'accélération du bloc (en m/s²). On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><polygon points='50,260 350,260 350,110' fill='#64748B' opacity='0.1' stroke='#64748B' stroke-width='2'/><rect x='220' y='155' width='40' height='40' fill='#4A90D9' opacity='0.8' transform='rotate(-30 240 175)'/><line x1='240' y1='175' x2='240' y2='235' stroke='#E8744F' stroke-width='2' marker-end='url(#arrP)'/><text x='248' y='215' font-size='12' fill='#E8744F' font-weight='bold'>P</text><line x1='240' y1='175' x2='205' y2='135' stroke='#10B981' stroke-width='2' marker-end='url(#arrN)'/><text x='195' y='128' font-size='12' fill='#10B981' font-weight='bold'>N</text><line x1='240' y1='175' x2='275' y2='155' stroke='#64748B' stroke-width='2' marker-end='url(#arrF)'/><text x='278' y='148' font-size='12' fill='#64748B' font-weight='bold'>f</text><defs><marker id='arrP' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='arrN' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker><marker id='arrF' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#64748B'/></marker></defs><text x='120' y='250' font-size='13' fill='#64748B'>α = 30°</text><path d='M 310,260 A 50,50 0 0,0 325,230' stroke='#64748B' stroke-width='1.5' fill='none'/></svg>",
      "alt_text": "Bloc sur plan incliné avec les forces : poids P, réaction normale N, force de frottement f"
    },
    "correct_value": 3.27,
    "tolerance": 0.1
  }$q$::jsonb,
  $e${
    "text_fr": "Bilan des forces le long du plan : le poids projeté $mg\\sin\\alpha$ (moteur) et le frottement $f = \\mu N = \\mu mg\\cos\\alpha$ (résistant). PFD : $ma = mg\\sin\\alpha - \\mu mg\\cos\\alpha$. Donc $a = g(\\sin\\alpha - \\mu\\cos\\alpha) = 10(\\sin 30° - 0{,}2\\cos 30°) = 10(0{,}5 - 0{,}2 \\times 0{,}866) = 10(0{,}5 - 0{,}173) = 10 \\times 0{,}327 = 3{,}27$ m/s².",
    "steps": [
      "Réaction normale : $N = mg\\cos\\alpha = 5 \\times 10 \\times \\cos 30° = 43{,}3$ N",
      "Force de frottement : $f = \\mu N = 0{,}2 \\times 43{,}3 = 8{,}66$ N",
      "PFD le long du plan : $ma = mg\\sin\\alpha - f$",
      "$a = g(\\sin 30° - \\mu\\cos 30°) = 10(0{,}5 - 0{,}173)$",
      "$a = 3{,}27$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Appliquez le PFD le long du plan incliné : $ma = mg\\sin\\alpha - \\mu mg\\cos\\alpha$."}$h$::jsonb,
  ARRAY['lois_newton','plan_incline','frottement','bac_2024']
);

-- 876: Machine d'Atwood — accélération — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000876',
  '33333333-0000-0000-0000-000000000025',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "Dans une machine d'Atwood, deux masses $m_1 = 3$ kg et $m_2 = 5$ kg sont reliées par un fil inextensible passant par une poulie de masse négligeable. Quelle est l'accélération du système ? On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><circle cx='200' cy='50' r='25' stroke='#64748B' stroke-width='2' fill='none'/><circle cx='200' cy='50' r='4' fill='#64748B'/><line x1='175' y1='55' x2='175' y2='180' stroke='#64748B' stroke-width='2'/><line x1='225' y1='55' x2='225' y2='220' stroke='#64748B' stroke-width='2'/><rect x='155' y='180' width='40' height='40' fill='#4A90D9' opacity='0.8' rx='3'/><text x='175' y='205' font-size='13' fill='white' text-anchor='middle' font-weight='bold'>m₁</text><rect x='205' y='220' width='40' height='40' fill='#E8744F' opacity='0.8' rx='3'/><text x='225' y='245' font-size='13' fill='white' text-anchor='middle' font-weight='bold'>m₂</text><line x1='175' y1='225' x2='175' y2='260' stroke='#10B981' stroke-width='2' marker-end='url(#aw1)'/><text x='150' y='255' font-size='11' fill='#10B981'>m₁g</text><line x1='225' y1='265' x2='225' y2='290' stroke='#10B981' stroke-width='2' marker-end='url(#aw2)'/><text x='235' y='285' font-size='11' fill='#10B981'>m₂g</text><defs><marker id='aw1' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker><marker id='aw2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs><line x1='155' y1='195' x2='155' y2='165' stroke='#E8744F' stroke-width='1.5' marker-end='url(#aw3)'/><text x='130' y='175' font-size='11' fill='#E8744F'>T</text><line x1='245' y1='235' x2='245' y2='205' stroke='#E8744F' stroke-width='1.5' marker-end='url(#aw4)'/><text x='250' y='215' font-size='11' fill='#E8744F'>T</text><defs><marker id='aw3' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='aw4' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs><text x='100' y='25' font-size='12' fill='#64748B'>Poulie idéale</text><line x1='175' y1='180' x2='175' y2='160' stroke='#4A90D9' stroke-width='1.5' stroke-dasharray='3,2' marker-end='url(#aw5)'/><text x='155' y='155' font-size='10' fill='#4A90D9'>a</text><line x1='225' y1='260' x2='225' y2='275' stroke='#4A90D9' stroke-width='1.5' stroke-dasharray='3,2'/><defs><marker id='aw5' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs></svg>",
      "alt_text": "Machine d'Atwood : deux masses m1=3kg et m2=5kg reliées par un fil passant sur une poulie"
    },
    "choices": ["$2{,}5$ m/s²", "$1{,}25$ m/s²", "$5$ m/s²", "$3{,}75$ m/s²"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Pour la machine d'Atwood, en appliquant le PFD à chaque masse et en combinant : $a = \\frac{(m_2 - m_1)g}{m_1 + m_2} = \\frac{(5 - 3) \\times 10}{3 + 5} = \\frac{20}{8} = 2{,}5$ m/s².",
    "steps": [
      "PFD pour $m_1$ : $T - m_1 g = m_1 a$",
      "PFD pour $m_2$ : $m_2 g - T = m_2 a$",
      "Addition : $(m_2 - m_1)g = (m_1 + m_2)a$",
      "$a = \\frac{(5-3) \\times 10}{3+5} = \\frac{20}{8} = 2{,}5$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Appliquez le PFD à chaque masse séparément, puis combinez les deux équations pour éliminer T."}$h$::jsonb,
  ARRAY['lois_newton','atwood','poulie','bac_2024']
);

-- 877: Machine d'Atwood — tension — numeric (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000877',
  '33333333-0000-0000-0000-000000000025',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "Dans la machine d'Atwood précédente ($m_1 = 3$ kg, $m_2 = 5$ kg, poulie idéale), calculer la tension $T$ du fil (en N). On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><circle cx='200' cy='50' r='25' stroke='#64748B' stroke-width='2' fill='none'/><circle cx='200' cy='50' r='4' fill='#64748B'/><line x1='175' y1='55' x2='175' y2='170' stroke='#64748B' stroke-width='2'/><line x1='225' y1='55' x2='225' y2='200' stroke='#64748B' stroke-width='2'/><rect x='155' y='170' width='40' height='35' fill='#4A90D9' opacity='0.8' rx='3'/><text x='175' y='192' font-size='12' fill='white' text-anchor='middle' font-weight='bold'>3 kg</text><rect x='205' y='200' width='40' height='45' fill='#E8744F' opacity='0.8' rx='3'/><text x='225' y='227' font-size='12' fill='white' text-anchor='middle' font-weight='bold'>5 kg</text><line x1='175' y1='170' x2='175' y2='140' stroke='#E8744F' stroke-width='2.5' marker-end='url(#tArr)'/><text x='148' y='155' font-size='14' fill='#E8744F' font-weight='bold'>T = ?</text><defs><marker id='tArr' markerWidth='10' markerHeight='7' refX='10' refY='3.5' orient='auto'><polygon points='0 0,10 3.5,0 7' fill='#E8744F'/></marker></defs></svg>",
      "alt_text": "Machine d'Atwood avec m1=3kg et m2=5kg, la tension T du fil est recherchée"
    },
    "correct_value": 37.5,
    "tolerance": 0.5
  }$q$::jsonb,
  $e${
    "text_fr": "On a trouvé $a = 2{,}5$ m/s². En appliquant le PFD à $m_1$ : $T - m_1 g = m_1 a$, donc $T = m_1(g + a) = 3 \\times (10 + 2{,}5) = 3 \\times 12{,}5 = 37{,}5$ N.",
    "steps": [
      "Accélération déjà calculée : $a = 2{,}5$ m/s²",
      "PFD pour $m_1$ (monte) : $T - m_1 g = m_1 a$",
      "$T = m_1(g + a) = 3(10 + 2{,}5)$",
      "$T = 3 \\times 12{,}5 = 37{,}5$ N"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='30' y='30' font-size='14' fill='#64748B' font-weight='bold'>Vérification avec m₂ :</text><text x='30' y='60' font-size='13' fill='#4A90D9'>T = m₂(g − a) = 5(10 − 2,5) = 37,5 N</text><text x='30' y='90' font-size='13' fill='#10B981' font-weight='bold'>Cohérent !</text></svg>",
      "alt_text": "Vérification : T calculée depuis m2 donne le même résultat"
    }
  }$e$::jsonb,
  $h${"text_fr": "Utilisez le PFD sur $m_1$ : $T = m_1(g + a)$. Vous avez besoin de l'accélération calculée précédemment."}$h$::jsonb,
  ARRAY['lois_newton','atwood','tension','bac_2024']
);

-- 878: Pendule simple — période — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000878',
  '33333333-0000-0000-0000-000000000025',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Un pendule simple de longueur $L = 1$ m oscille avec de petites amplitudes. Quelle est sa période $T$ ? On prend $g = 10$ m/s² et $\\pi^2 \\approx 10$.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><line x1='100' y1='30' x2='300' y2='30' stroke='#64748B' stroke-width='3'/><rect x='95' y='25' width='210' height='10' fill='#64748B' opacity='0.3'/><line x1='200' y1='30' x2='260' y2='230' stroke='#64748B' stroke-width='2'/><line x1='200' y1='30' x2='200' y2='230' stroke='#64748B' stroke-width='1' stroke-dasharray='5,4'/><circle cx='260' cy='230' r='15' fill='#4A90D9' opacity='0.8'/><text x='280' y='235' font-size='12' fill='#4A90D9' font-weight='bold'>m</text><line x1='260' y1='245' x2='260' y2='280' stroke='#E8744F' stroke-width='2' marker-end='url(#pArr)'/><text x='268' y='275' font-size='12' fill='#E8744F'>P = mg</text><line x1='260' y1='230' x2='225' y2='110' stroke='#10B981' stroke-width='2' marker-end='url(#pArr2)'/><text x='215' y='105' font-size='12' fill='#10B981'>T (tension)</text><defs><marker id='pArr' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='pArr2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs><path d='M 200,70 A 20,20 0 0,1 215,68' stroke='#64748B' stroke-width='1.5' fill='none'/><text x='218' y='72' font-size='11' fill='#64748B'>θ</text><text x='170' y='140' font-size='12' fill='#64748B'>L</text></svg>",
      "alt_text": "Pendule simple de longueur L avec la masse m déviée d'un angle theta, forces poids et tension représentées"
    },
    "choices": ["$T = 2$ s", "$T = 1$ s", "$T = \\pi$ s", "$T = 4$ s"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La période d'un pendule simple pour de petites oscillations est $T = 2\\pi\\sqrt{\\frac{L}{g}}$. Avec $L = 1$ m et $g = 10$ m/s² : $T = 2\\pi\\sqrt{\\frac{1}{10}} = 2\\pi \\times \\frac{1}{\\sqrt{10}}$. Comme $\\pi^2 \\approx 10$, on a $\\sqrt{10} \\approx \\pi$, donc $T = \\frac{2\\pi}{\\pi} = 2$ s.",
    "steps": [
      "Formule : $T = 2\\pi\\sqrt{\\frac{L}{g}}$",
      "$T = 2\\pi\\sqrt{\\frac{1}{10}} = \\frac{2\\pi}{\\sqrt{10}}$",
      "Avec $\\pi^2 \\approx 10$ : $\\sqrt{10} \\approx \\pi$",
      "$T = \\frac{2\\pi}{\\pi} = 2$ s"
    ]
  }$e$::jsonb,
  $h${"text_fr": "La période du pendule simple est $T = 2\\pi\\sqrt{\\frac{L}{g}}$. Utilisez l'approximation $\\pi^2 \\approx 10$."}$h$::jsonb,
  ARRAY['lois_newton','pendule_simple','periode','bac_2024']
);

-- 879: Plateau tournant — force centripète — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000879',
  '33333333-0000-0000-0000-000000000025',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Un objet de masse $m = 0{,}5$ kg est posé sur un plateau tournant à une distance $r = 0{,}4$ m du centre. Le plateau tourne à la vitesse angulaire $\\omega = 5$ rad/s. Calculer la force centripète nécessaire (en N) pour maintenir l'objet en place.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><ellipse cx='200' cy='130' rx='140' ry='50' stroke='#64748B' stroke-width='2' fill='#64748B' opacity='0.08'/><circle cx='200' cy='130' r='5' fill='#64748B'/><circle cx='280' cy='115' r='10' fill='#E8744F' opacity='0.8'/><text x='295' y='112' font-size='12' fill='#E8744F' font-weight='bold'>m</text><line x1='200' y1='130' x2='275' y2='117' stroke='#64748B' stroke-width='1.5' stroke-dasharray='4,3'/><text x='230' y='135' font-size='12' fill='#64748B'>r</text><line x1='280' y1='115' x2='225' y2='125' stroke='#4A90D9' stroke-width='2.5' marker-end='url(#fcArr)'/><text x='235' y='110' font-size='12' fill='#4A90D9' font-weight='bold'>F_c</text><defs><marker id='fcArr' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs><path d='M 320,100 A 30,30 0 0,1 330,130' stroke='#10B981' stroke-width='2' marker-end='url(#wArr)'/><text x='335' y='118' font-size='12' fill='#10B981'>ω</text><defs><marker id='wArr' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs></svg>",
      "alt_text": "Objet de masse m sur un plateau tournant à distance r du centre, force centripète dirigée vers le centre"
    },
    "correct_value": 5,
    "tolerance": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La force centripète est $F_c = m\\omega^2 r = 0{,}5 \\times 5^2 \\times 0{,}4 = 0{,}5 \\times 25 \\times 0{,}4 = 5$ N. Cette force est assurée par le frottement statique entre l'objet et le plateau.",
    "steps": [
      "Formule : $F_c = m\\omega^2 r$",
      "$F_c = 0{,}5 \\times (5)^2 \\times 0{,}4$",
      "$F_c = 0{,}5 \\times 25 \\times 0{,}4$",
      "$F_c = 5$ N (assurée par le frottement statique)"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de la force centripète : $F_c = m\\omega^2 r$."}$h$::jsonb,
  ARRAY['lois_newton','force_centripete','plateau_tournant','bac_style']
);

-- 880: Corps liés — table + masse suspendue — mcq (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000880',
  '33333333-0000-0000-0000-000000000025',
  'mcq',
  5,
  'fr',
  $q${
    "stem": "Un bloc $A$ de masse $m_A = 4$ kg est posé sur une table horizontale (coefficient de frottement $\\mu = 0{,}25$). Il est relié par un fil inextensible passant par une poulie à un bloc $B$ de masse $m_B = 2$ kg suspendu verticalement. Quelle est l'accélération du système ? ($g = 10$ m/s²)",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><rect x='30' y='130' width='300' height='15' fill='#64748B' opacity='0.2'/><line x1='30' y1='130' x2='330' y2='130' stroke='#64748B' stroke-width='2'/><rect x='140' y='90' width='60' height='40' fill='#4A90D9' opacity='0.8' rx='3'/><text x='170' y='115' font-size='13' fill='white' text-anchor='middle' font-weight='bold'>A</text><text x='170' y='80' font-size='11' fill='#4A90D9'>4 kg</text><line x1='200' y1='110' x2='330' y2='110' stroke='#64748B' stroke-width='2'/><circle cx='330' cy='120' r='12' stroke='#64748B' stroke-width='2' fill='none'/><line x1='342' y1='120' x2='342' y2='220' stroke='#64748B' stroke-width='2'/><rect x='322' y='220' width='40' height='40' fill='#E8744F' opacity='0.8' rx='3'/><text x='342' y='245' font-size='13' fill='white' text-anchor='middle' font-weight='bold'>B</text><text x='370' y='245' font-size='11' fill='#E8744F'>2 kg</text><line x1='140' y1='110' x2='115' y2='110' stroke='#10B981' stroke-width='2' marker-end='url(#fArr80)'/><text x='100' y='103' font-size='11' fill='#10B981'>f</text><line x1='342' y1='265' x2='342' y2='290' stroke='#E8744F' stroke-width='2' marker-end='url(#pArr80)'/><text x='350' y='285' font-size='11' fill='#E8744F'>m₂g</text><defs><marker id='fArr80' markerWidth='8' markerHeight='6' refX='0' refY='3' orient='auto'><polygon points='8 0,0 3,8 6' fill='#10B981'/></marker><marker id='pArr80' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs></svg>",
      "alt_text": "Bloc A sur une table relié par un fil à travers une poulie au bloc B suspendu verticalement"
    },
    "choices": ["$a \\approx 1{,}67$ m/s²", "$a \\approx 3{,}33$ m/s²", "$a \\approx 2{,}5$ m/s²", "$a \\approx 5$ m/s²"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "PFD pour B (descend) : $m_B g - T = m_B a$. PFD pour A (horizontal) : $T - f = m_A a$ avec $f = \\mu m_A g$. En additionnant : $m_B g - \\mu m_A g = (m_A + m_B)a$. Donc $a = \\frac{m_B g - \\mu m_A g}{m_A + m_B} = \\frac{2 \\times 10 - 0{,}25 \\times 4 \\times 10}{4 + 2} = \\frac{20 - 10}{6} = \\frac{10}{6} \\approx 1{,}67$ m/s².",
    "steps": [
      "Force de frottement : $f = \\mu m_A g = 0{,}25 \\times 4 \\times 10 = 10$ N",
      "PFD pour B : $m_B g - T = m_B a$",
      "PFD pour A : $T - f = m_A a$",
      "Somme : $m_B g - f = (m_A + m_B)a$",
      "$a = \\frac{20 - 10}{6} = \\frac{10}{6} \\approx 1{,}67$ m/s²"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Appliquez le PFD à chaque bloc, puis additionnez les équations pour éliminer la tension T."}$h$::jsonb,
  ARRAY['lois_newton','corps_lies','frottement','bac_2024']
);

-- 881: Ascenseur — poids apparent — true_false (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000881',
  '33333333-0000-0000-0000-000000000025',
  'true_false',
  3,
  'fr',
  $q${
    "stem": "Une personne de masse $m = 60$ kg se trouve dans un ascenseur qui accélère vers le haut avec $a = 2$ m/s². Le pèse-personne sous ses pieds indique une valeur supérieure à son poids réel $P = mg = 600$ N.",
    "correct_answer": true,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><rect x='120' y='40' width='160' height='230' fill='#64748B' opacity='0.06' stroke='#64748B' stroke-width='2' rx='5'/><text x='200' y='30' font-size='13' fill='#64748B' text-anchor='middle'>Ascenseur</text><rect x='150' y='240' width='100' height='10' fill='#4A90D9' opacity='0.5' rx='2'/><text x='200' y='270' font-size='11' fill='#4A90D9' text-anchor='middle'>Pèse-personne</text><line x1='200' y1='230' x2='200' y2='160' stroke='#64748B' stroke-width='8' stroke-linecap='round'/><circle cx='200' cy='145' r='15' fill='#E8744F' opacity='0.7'/><line x1='200' y1='130' x2='200' y2='105' stroke='#E8744F' stroke-width='2' marker-end='url(#elUp)'/><text x='185' y='100' font-size='11' fill='#E8744F'>R</text><line x1='200' y1='155' x2='200' y2='180' stroke='#10B981' stroke-width='2' marker-end='url(#elDn)'/><text x='210' y='175' font-size='11' fill='#10B981'>mg</text><line x1='300' y1='180' x2='300' y2='130' stroke='#4A90D9' stroke-width='3' marker-end='url(#elA)'/><text x='310' y='155' font-size='14' fill='#4A90D9' font-weight='bold'>a ↑</text><defs><marker id='elUp' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='elDn' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker><marker id='elA' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs></svg>",
      "alt_text": "Personne dans un ascenseur qui accélère vers le haut, avec le poids mg vers le bas et la réaction R vers le haut"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Vrai. En appliquant le PFD à la personne (axe vertical vers le haut) : $R - mg = ma$, donc $R = m(g + a) = 60 \\times (10 + 2) = 720$ N. Le pèse-personne mesure la réaction $R = 720$ N qui est supérieure au poids réel $P = mg = 600$ N. Le poids apparent augmente quand l'ascenseur accélère vers le haut.",
    "steps": [
      "PFD (axe vers le haut) : $R - mg = ma$",
      "$R = m(g + a) = 60 \\times 12 = 720$ N",
      "Poids réel : $P = mg = 600$ N",
      "$R = 720$ N $> P = 600$ N : l'affirmation est vraie"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Appliquez le PFD : $R - mg = ma$. Le pèse-personne mesure la réaction R, pas le poids mg."}$h$::jsonb,
  ARRAY['lois_newton','ascenseur','poids_apparent','bac_style']
);

-- 882: Coefficient de frottement — true_false (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000882',
  '33333333-0000-0000-0000-000000000025',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "Le coefficient de frottement cinétique $\\mu_c$ entre deux surfaces est toujours supérieur au coefficient de frottement statique $\\mu_s$ entre les mêmes surfaces.",
    "correct_answer": false,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='50' y1='200' x2='370' y2='200' stroke='#64748B' stroke-width='2'/><line x1='50' y1='200' x2='50' y2='30' stroke='#64748B' stroke-width='2'/><line x1='50' y1='200' x2='170' y2='80' stroke='#E8744F' stroke-width='2.5'/><line x1='170' y1='80' x2='370' y2='120' stroke='#4A90D9' stroke-width='2.5'/><circle cx='170' cy='80' r='5' fill='#E8744F'/><text x='80' y='120' font-size='12' fill='#E8744F'>f_s (statique)</text><text x='240' y='95' font-size='12' fill='#4A90D9'>f_c (cinétique)</text><text x='170' y='70' font-size='11' fill='#64748B'>f_s max</text><text x='15' y='40' font-size='12' fill='#64748B'>Force</text><text x='340' y='218' font-size='12' fill='#64748B'>F appliquée</text><line x1='50' y1='120' x2='370' y2='120' stroke='#64748B' stroke-width='0.5' stroke-dasharray='3,3'/><text x='375' y='125' font-size='10' fill='#64748B'>μ_c·N</text></svg>",
      "alt_text": "Graphique montrant la force de frottement en fonction de la force appliquée : la force statique max est supérieure à la force cinétique"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Faux. C'est l'inverse : le coefficient de frottement statique $\\mu_s$ est toujours supérieur ou égal au coefficient de frottement cinétique $\\mu_c$. Il faut une force plus grande pour mettre un objet en mouvement (vaincre le frottement statique) que pour le maintenir en mouvement (frottement cinétique).",
    "steps": [
      "Le frottement statique résiste au démarrage du mouvement",
      "Le frottement cinétique s'oppose au mouvement en cours",
      "On a toujours $\\mu_s \\geq \\mu_c$",
      "Donc $\\mu_c > \\mu_s$ est faux"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Comparez la force nécessaire pour mettre un objet en mouvement versus celle pour le maintenir en mouvement."}$h$::jsonb,
  ARRAY['lois_newton','frottement','coefficient','bac_style']
);

-- =====================
-- SKILL: energy (Énergie mécanique) — 8 items
-- Covers: conservation pendule, ressort, TEC plan incliné, choc,
--         Ep pesanteur, puissance, diagramme énergétique
-- =====================

-- 883: Conservation énergie — pendule — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000883',
  '33333333-0000-0000-0000-000000000026',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Un pendule simple de longueur $L = 2$ m est écarté d'un angle $\\theta_0 = 60°$ puis lâché sans vitesse initiale. Calculer la vitesse (en m/s) de la masse au point le plus bas. On prend $g = 10$ m/s².",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><line x1='100' y1='20' x2='300' y2='20' stroke='#64748B' stroke-width='3'/><line x1='200' y1='20' x2='200' y2='220' stroke='#64748B' stroke-width='1.5' stroke-dasharray='5,4'/><line x1='200' y1='20' x2='100' y2='120' stroke='#64748B' stroke-width='2'/><circle cx='100' cy='120' r='12' fill='#E8744F' opacity='0.7'/><text x='75' y='125' font-size='12' fill='#E8744F'>A</text><circle cx='200' cy='220' r='12' fill='#4A90D9' opacity='0.7'/><text x='215' y='225' font-size='12' fill='#4A90D9'>B</text><path d='M 200,60 A 20,20 0 0,0 185,55' stroke='#64748B' stroke-width='1.5' fill='none'/><text x='175' y='55' font-size='12' fill='#64748B'>θ₀</text><line x1='100' y1='120' x2='200' y2='120' stroke='#10B981' stroke-width='1' stroke-dasharray='4,3'/><line x1='200' y1='120' x2='200' y2='220' stroke='#10B981' stroke-width='1.5'/><text x='208' y='175' font-size='12' fill='#10B981'>h</text><text x='130' y='145' font-size='11' fill='#64748B'>L(1−cosθ₀)</text><line x1='200' y1='235' x2='240' y2='235' stroke='#4A90D9' stroke-width='2.5' marker-end='url(#vPend)'/><text x='225' y='250' font-size='12' fill='#4A90D9' font-weight='bold'>v = ?</text><defs><marker id='vPend' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs></svg>",
      "alt_text": "Pendule lâché depuis un angle de 60 degrés, la hauteur h = L(1-cos theta) et la vitesse v au point bas sont indiquées"
    },
    "correct_value": 4.47,
    "tolerance": 0.1
  }$q$::jsonb,
  $e${
    "text_fr": "La hauteur de chute est $h = L(1 - \\cos\\theta_0) = 2(1 - \\cos 60°) = 2(1 - 0{,}5) = 1$ m. Par conservation de l'énergie mécanique : $mgh = \\frac{1}{2}mv^2$, donc $v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 1} = \\sqrt{20} \\approx 4{,}47$ m/s.",
    "steps": [
      "Hauteur : $h = L(1 - \\cos\\theta_0) = 2(1 - 0{,}5) = 1$ m",
      "Conservation Em : $E_{p,A} = E_{c,B}$",
      "$mgh = \\frac{1}{2}mv^2$",
      "$v = \\sqrt{2gh} = \\sqrt{20} \\approx 4{,}47$ m/s"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Calculez la hauteur $h = L(1 - \\cos\\theta_0)$ puis appliquez la conservation de l'énergie mécanique."}$h$::jsonb,
  ARRAY['energie','conservation','pendule','bac_2024']
);

-- 884: Ressort-masse — conservation — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000884',
  '33333333-0000-0000-0000-000000000026',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "Un ressort de raideur $k = 200$ N/m est comprimé de $\\Delta x = 0{,}1$ m puis libère une bille de masse $m = 0{,}2$ kg sur un plan horizontal sans frottement. Quelle est la vitesse de la bille après le détachement du ressort ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='30' y1='160' x2='380' y2='160' stroke='#64748B' stroke-width='2'/><rect x='30' y='80' width='15' height='80' fill='#64748B' opacity='0.4'/><path d='M 45 120 L 55 110 L 65 130 L 75 110 L 85 130 L 95 110 L 105 130 L 115 120' stroke='#10B981' stroke-width='2.5' fill='none'/><circle cx='130' cy='140' r='15' fill='#4A90D9' opacity='0.8'/><text x='125' y='145' font-size='11' fill='white' font-weight='bold'>m</text><line x1='60' y1='175' x2='115' y2='175' stroke='#E8744F' stroke-width='1.5'/><polygon points='57,172 57,178 50,175' fill='#E8744F'/><polygon points='118,172 118,178 125,175' fill='#E8744F'/><text x='75' y='192' font-size='11' fill='#E8744F'>Δx</text><line x1='150' y1='140' x2='200' y2='140' stroke='#4A90D9' stroke-width='2' stroke-dasharray='5,3' marker-end='url(#vSpr)'/><text x='160' y='130' font-size='12' fill='#4A90D9'>v = ?</text><defs><marker id='vSpr' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs><text x='230' y='120' font-size='12' fill='#64748B'>Après libération</text><circle cx='280' cy='140' r='15' fill='#4A90D9' opacity='0.4' stroke='#4A90D9' stroke-width='1' stroke-dasharray='3,3'/><line x1='300' y1='140' x2='350' y2='140' stroke='#4A90D9' stroke-width='2.5' marker-end='url(#vSpr2)'/><text x='315' y='130' font-size='12' fill='#4A90D9' font-weight='bold'>v</text><defs><marker id='vSpr2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker></defs></svg>",
      "alt_text": "Ressort comprimé de delta x propulsant une bille de masse m sur un plan horizontal sans frottement"
    },
    "choices": ["$v \\approx 3{,}16$ m/s", "$v = 10$ m/s", "$v = 1$ m/s", "$v = 5$ m/s"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Conservation de l'énergie : l'énergie potentielle élastique se transforme en énergie cinétique. $\\frac{1}{2}k(\\Delta x)^2 = \\frac{1}{2}mv^2$. Donc $v = \\Delta x \\sqrt{\\frac{k}{m}} = 0{,}1 \\times \\sqrt{\\frac{200}{0{,}2}} = 0{,}1 \\times \\sqrt{1000} = 0{,}1 \\times 31{,}62 \\approx 3{,}16$ m/s.",
    "steps": [
      "Énergie élastique : $E_{pe} = \\frac{1}{2}k(\\Delta x)^2 = \\frac{1}{2} \\times 200 \\times 0{,}01 = 1$ J",
      "Conservation : $E_{pe} = E_c$ donc $1 = \\frac{1}{2} \\times 0{,}2 \\times v^2$",
      "$v^2 = \\frac{2}{0{,}2} = 10$",
      "$v = \\sqrt{10} \\approx 3{,}16$ m/s"
    ]
  }$e$::jsonb,
  $h${"text_fr": "L'énergie potentielle élastique $\\frac{1}{2}k(\\Delta x)^2$ se convertit entièrement en énergie cinétique $\\frac{1}{2}mv^2$."}$h$::jsonb,
  ARRAY['energie','ressort','conservation','bac_2024']
);

-- 885: TEC plan incliné avec frottement — numeric (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000885',
  '33333333-0000-0000-0000-000000000026',
  'numeric',
  5,
  'fr',
  $q${
    "stem": "Un bloc de masse $m = 2$ kg glisse le long d'un plan incliné de longueur $L = 5$ m et d'angle $\\alpha = 30°$ avec une force de frottement constante $f = 4$ N. Il part du repos en haut du plan. En appliquant le théorème de l'énergie cinétique, calculer la vitesse (en m/s) du bloc en bas du plan. ($g = 10$ m/s²)",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><polygon points='40,260 360,260 360,110' fill='#64748B' opacity='0.08' stroke='#64748B' stroke-width='2'/><rect x='110' y='170' width='35' height='35' fill='#4A90D9' opacity='0.8' transform='rotate(-25 127 187)'/><text x='105' y='160' font-size='12' fill='#4A90D9' font-weight='bold'>Départ</text><line x1='127' y1='195' x2='310' y2='245' stroke='#E8744F' stroke-width='2' stroke-dasharray='6,3'/><text x='200' y='210' font-size='12' fill='#E8744F'>L = 5 m</text><line x1='360' y1='260' x2='360' y2='110' stroke='#10B981' stroke-width='1.5' stroke-dasharray='4,3'/><text x='365' y='190' font-size='12' fill='#10B981'>h</text><text x='180' y='275' font-size='12' fill='#64748B'>α = 30°</text><circle cx='340' cy='252' r='6' fill='#E8744F'/><text x='310' y='245' font-size='12' fill='#E8744F'>Arrivée</text><text x='170' y='180' font-size='11' fill='#64748B'>f = 4 N ←</text></svg>",
      "alt_text": "Bloc glissant du haut d'un plan incliné de longueur L=5m, angle 30 degrés, avec frottement f=4N"
    },
    "correct_value": 5.48,
    "tolerance": 0.1
  }$q$::jsonb,
  $e${
    "text_fr": "La hauteur est $h = L\\sin\\alpha = 5 \\times \\sin 30° = 2{,}5$ m. Par le TEC : $\\frac{1}{2}mv^2 - 0 = W(\\vec{P}) + W(\\vec{N}) + W(\\vec{f})$. Le travail du poids : $W(P) = mgh = 2 \\times 10 \\times 2{,}5 = 50$ J. Le travail de la réaction normale : $W(N) = 0$. Le travail du frottement : $W(f) = -f \\times L = -4 \\times 5 = -20$ J. Donc $\\frac{1}{2} \\times 2 \\times v^2 = 50 - 20 = 30$ J, $v^2 = 30$, $v = \\sqrt{30} \\approx 5{,}48$ m/s.",
    "steps": [
      "$h = L\\sin 30° = 5 \\times 0{,}5 = 2{,}5$ m",
      "$W(\\vec{P}) = mgh = 2 \\times 10 \\times 2{,}5 = 50$ J",
      "$W(\\vec{N}) = 0$ (perpendiculaire au déplacement)",
      "$W(\\vec{f}) = -fL = -4 \\times 5 = -20$ J",
      "TEC : $\\frac{1}{2}mv^2 = 50 + 0 - 20 = 30$ J",
      "$v = \\sqrt{\\frac{2 \\times 30}{2}} = \\sqrt{30} \\approx 5{,}48$ m/s"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Appliquez le TEC : la variation d'énergie cinétique égale la somme des travaux de toutes les forces."}$h$::jsonb,
  ARRAY['energie','tec','plan_incline','frottement','bac_2024']
);

-- 886: Choc élastique vs inélastique — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000886',
  '33333333-0000-0000-0000-000000000026',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "Une bille de masse $m_1 = 2$ kg se déplace à $v_1 = 3$ m/s et entre en collision parfaitement inélastique avec une bille de masse $m_2 = 4$ kg initialement au repos. Quelle est l'énergie cinétique perdue lors du choc (en J) ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='200' y='25' font-size='13' fill='#64748B' font-weight='bold' text-anchor='middle'>Avant le choc</text><line x1='30' y1='80' x2='370' y2='80' stroke='#64748B' stroke-width='1'/><circle cx='100' cy='70' r='18' fill='#4A90D9' opacity='0.8'/><text x='100' y='75' font-size='11' fill='white' text-anchor='middle' font-weight='bold'>m₁</text><line x1='122' y1='70' x2='170' y2='70' stroke='#4A90D9' stroke-width='2.5' marker-end='url(#ch1)'/><text x='140' y='60' font-size='11' fill='#4A90D9'>v₁ = 3 m/s</text><circle cx='250' cy='70' r='25' fill='#E8744F' opacity='0.8'/><text x='250' y='75' font-size='11' fill='white' text-anchor='middle' font-weight='bold'>m₂</text><text x='250' y='48' font-size='11' fill='#E8744F'>au repos</text><text x='200' y='130' font-size='13' fill='#64748B' font-weight='bold' text-anchor='middle'>Après le choc (parfaitement inélastique)</text><line x1='30' y1='185' x2='370' y2='185' stroke='#64748B' stroke-width='1'/><circle cx='180' cy='175' r='30' fill='#10B981' opacity='0.6' stroke='#10B981' stroke-width='2'/><text x='180' y='178' font-size='10' fill='white' text-anchor='middle' font-weight='bold'>m₁+m₂</text><line x1='215' y1='175' x2='260' y2='175' stroke='#10B981' stroke-width='2.5' marker-end='url(#ch2)'/><text x='225' y='165' font-size='11' fill='#10B981'>v' = ?</text><defs><marker id='ch1' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker><marker id='ch2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs></svg>",
      "alt_text": "Avant : bille m1 se déplace vers m2 au repos. Après choc inélastique : les deux avancent ensemble"
    },
    "choices": ["$\\Delta E_c = 6$ J", "$\\Delta E_c = 3$ J", "$\\Delta E_c = 9$ J", "$\\Delta E_c = 0$ J"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Choc parfaitement inélastique : les deux corps restent collés. Conservation de la quantité de mouvement : $m_1 v_1 = (m_1 + m_2)v'$. Donc $v' = \\frac{m_1 v_1}{m_1 + m_2} = \\frac{2 \\times 3}{2 + 4} = 1$ m/s. $E_{c,i} = \\frac{1}{2} \\times 2 \\times 3^2 = 9$ J. $E_{c,f} = \\frac{1}{2} \\times 6 \\times 1^2 = 3$ J. Perte : $\\Delta E_c = 9 - 3 = 6$ J.",
    "steps": [
      "Conservation de $p$ : $m_1 v_1 = (m_1+m_2)v'$",
      "$v' = \\frac{2 \\times 3}{6} = 1$ m/s",
      "$E_{c,i} = \\frac{1}{2} \\times 2 \\times 9 = 9$ J",
      "$E_{c,f} = \\frac{1}{2} \\times 6 \\times 1 = 3$ J",
      "Énergie perdue = $9 - 3 = 6$ J"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Dans un choc parfaitement inélastique, les deux corps restent collés. Appliquez la conservation de la quantité de mouvement."}$h$::jsonb,
  ARRAY['energie','choc_inelastique','conservation_qm','bac_2024']
);

-- 887: Énergie potentielle de pesanteur — true_false (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000887',
  '33333333-0000-0000-0000-000000000026',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "L'énergie potentielle de pesanteur d'un objet dépend du choix du niveau de référence.",
    "correct_answer": true,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='40' y1='200' x2='360' y2='200' stroke='#64748B' stroke-width='2' stroke-dasharray='8,4'/><text x='365' y='205' font-size='11' fill='#64748B'>Réf. 1 (sol)</text><line x1='40' y1='130' x2='360' y2='130' stroke='#4A90D9' stroke-width='2' stroke-dasharray='8,4'/><text x='365' y='135' font-size='11' fill='#4A90D9'>Réf. 2 (table)</text><rect x='180' y='40' width='40' height='30' fill='#E8744F' opacity='0.8' rx='3'/><text x='200' y='60' font-size='11' fill='white' text-anchor='middle' font-weight='bold'>m</text><line x1='170' y1='55' x2='170' y2='200' stroke='#64748B' stroke-width='1' stroke-dasharray='3,3'/><text x='155' y='130' font-size='12' fill='#64748B'>h₁</text><line x1='230' y1='55' x2='230' y2='130' stroke='#4A90D9' stroke-width='1' stroke-dasharray='3,3'/><text x='235' y='95' font-size='12' fill='#4A90D9'>h₂</text></svg>",
      "alt_text": "Un objet à une certaine hauteur avec deux niveaux de référence différents : le sol et une table"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Vrai. L'énergie potentielle de pesanteur est $E_p = mgh$ où $h$ est la hauteur par rapport au niveau de référence choisi. Si on change le niveau de référence, la valeur de $h$ change et donc $E_p$ change aussi. Cependant, la variation $\\Delta E_p$ entre deux positions est indépendante du choix de la référence.",
    "steps": [
      "$E_p = mgh$ dépend de la hauteur $h$ par rapport à la référence",
      "Différentes références → différentes valeurs de $h$ → différentes $E_p$",
      "Mais $\\Delta E_p = mg(h_f - h_i)$ est invariant",
      "Seules les variations d'énergie ont un sens physique absolu"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Réfléchissez à ce qui se passe si vous changez l'origine des hauteurs dans $E_p = mgh$."}$h$::jsonb,
  ARRAY['energie','energie_potentielle','reference','bac_style']
);

-- 888: Puissance et rendement — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000888',
  '33333333-0000-0000-0000-000000000026',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Un moteur électrique de puissance utile $P_u = 1{,}5$ kW soulève une charge de masse $m = 100$ kg à vitesse constante $v$ le long d'un axe vertical. Le rendement du moteur est $\\eta = 80\\%$. Calculer la vitesse $v$ de montée de la charge (en m/s). ($g = 10$ m/s²)",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><rect x='160' y='180' width='80' height='60' fill='#4A90D9' opacity='0.8' rx='5'/><text x='200' y='215' font-size='13' fill='white' text-anchor='middle' font-weight='bold'>100 kg</text><line x1='200' y1='180' x2='200' y2='60' stroke='#64748B' stroke-width='2'/><rect x='170' y='30' width='60' height='35' fill='#10B981' opacity='0.8' rx='3'/><text x='200' y='52' font-size='11' fill='white' text-anchor='middle' font-weight='bold'>Moteur</text><line x1='250' y1='200' x2='250' y2='140' stroke='#4A90D9' stroke-width='2.5' marker-end='url(#vUp)'/><text x='260' y='175' font-size='13' fill='#4A90D9' font-weight='bold'>v = ?</text><line x1='150' y1='210' x2='150' y2='260' stroke='#E8744F' stroke-width='2' marker-end='url(#pDn)'/><text x='120' y='248' font-size='12' fill='#E8744F'>mg</text><defs><marker id='vUp' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker><marker id='pDn' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs><text x='290' y='50' font-size='12' fill='#10B981'>P_élec = 1,5 kW</text><text x='290' y='70' font-size='12' fill='#64748B'>η = 80%</text></svg>",
      "alt_text": "Moteur soulevant une charge de 100 kg verticalement à vitesse constante, puissance et rendement indiqués"
    },
    "correct_value": 1.2,
    "tolerance": 0.05
  }$q$::jsonb,
  $e${
    "text_fr": "La puissance utile (mécanique) est $P_{utile} = \\eta \\times P_{élec} = 0{,}8 \\times 1500 = 1200$ W. À vitesse constante, la puissance utile compense le poids : $P_{utile} = F \\times v = mg \\times v$. Donc $v = \\frac{P_{utile}}{mg} = \\frac{1200}{100 \\times 10} = \\frac{1200}{1000} = 1{,}2$ m/s.",
    "steps": [
      "$P_{utile} = \\eta \\times P_{élec} = 0{,}8 \\times 1500 = 1200$ W",
      "À vitesse constante : $P_{utile} = mg \\times v$",
      "$v = \\frac{P_{utile}}{mg} = \\frac{1200}{1000}$",
      "$v = 1{,}2$ m/s"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Calculez d'abord la puissance utile avec le rendement, puis utilisez $P_{utile} = mg \\times v$."}$h$::jsonb,
  ARRAY['energie','puissance','rendement','bac_2024']
);

-- 889: Diagramme énergétique — chute libre — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000889',
  '33333333-0000-0000-0000-000000000026',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Le diagramme ci-dessous représente les énergies d'un objet en chute libre. Quelle courbe représente l'énergie cinétique $E_c$ ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><line x1='60' y1='260' x2='370' y2='260' stroke='#64748B' stroke-width='2'/><line x1='60' y1='260' x2='60' y2='20' stroke='#64748B' stroke-width='2'/><text x='200' y='285' font-size='13' fill='#64748B' text-anchor='middle'>hauteur h (décroissante →)</text><text x='25' y='140' font-size='13' fill='#64748B' transform='rotate(-90,25,140)'>Énergie (J)</text><line x1='60' y1='60' x2='350' y2='60' stroke='#10B981' stroke-width='2.5' stroke-dasharray='8,4'/><text x='355' y='55' font-size='11' fill='#10B981' font-weight='bold'>③</text><line x1='60' y1='60' x2='350' y2='240' stroke='#E8744F' stroke-width='2.5'/><text x='355' y='245' font-size='11' fill='#E8744F' font-weight='bold'>②</text><line x1='60' y1='240' x2='350' y2='60' stroke='#4A90D9' stroke-width='2.5'/><text x='355' y='65' font-size='11' fill='#4A90D9' font-weight='bold'>①</text><text x='100' y='45' font-size='12' fill='#10B981'>E_m</text></svg>",
      "alt_text": "Trois courbes : courbe 1 croissante (bleue), courbe 2 décroissante (orange), courbe 3 constante horizontale (verte)"
    },
    "choices": ["Courbe ① (croissante, bleue)", "Courbe ② (décroissante, orange)", "Courbe ③ (constante, verte)", "Aucune des trois"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "En chute libre (sans frottement), quand la hauteur diminue : $E_p = mgh$ diminue (courbe ②), $E_c = \\frac{1}{2}mv^2$ augmente (courbe ①) et $E_m = E_c + E_p$ reste constante (courbe ③). La courbe ① (croissante quand h diminue) représente donc $E_c$.",
    "steps": [
      "Quand l'objet tombe, $h$ diminue (lecture de gauche à droite)",
      "$E_p = mgh$ diminue → courbe ② (décroissante)",
      "$E_c$ augmente car la vitesse augmente → courbe ① (croissante)",
      "$E_m = E_c + E_p = \\text{constante}$ → courbe ③ (horizontale)"
    ]
  }$e$::jsonb,
  $h${"text_fr": "En chute libre, quand la hauteur diminue, l'énergie cinétique augmente et l'énergie potentielle diminue."}$h$::jsonb,
  ARRAY['energie','diagramme','chute_libre','conservation','bac_style']
);

-- 890: Diagramme barres — énergie positions — true_false (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000890',
  '33333333-0000-0000-0000-000000000026',
  'true_false',
  5,
  'fr',
  $q${
    "stem": "Un objet de masse $m = 1$ kg est lancé verticalement vers le haut avec $v_0 = 20$ m/s depuis le sol (référence $E_p = 0$). En présence de frottements de l'air, l'énergie mécanique au point le plus haut est strictement égale à $\\frac{1}{2}mv_0^2 = 200$ J.",
    "correct_answer": false,
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><text x='200' y='25' font-size='13' fill='#64748B' font-weight='bold' text-anchor='middle'>Diagramme en barres d'énergie</text><line x1='30' y1='260' x2='380' y2='260' stroke='#64748B' stroke-width='1.5'/><text x='80' y='280' font-size='11' fill='#64748B' text-anchor='middle'>Sol (départ)</text><text x='200' y='280' font-size='11' fill='#64748B' text-anchor='middle'>Mi-hauteur</text><text x='320' y='280' font-size='11' fill='#64748B' text-anchor='middle'>Sommet</text><rect x='55' y='60' width='25' height='200' fill='#4A90D9' opacity='0.7'/><text x='67' y='55' font-size='10' fill='#4A90D9' text-anchor='middle'>Ec</text><rect x='85' y='260' width='25' height='0' fill='#E8744F' opacity='0.7'/><text x='97' y='255' font-size='10' fill='#E8744F' text-anchor='middle'>Ep</text><rect x='165' y='130' width='25' height='130' fill='#4A90D9' opacity='0.7'/><rect x='195' y='140' width='25' height='120' fill='#E8744F' opacity='0.7'/><rect x='225' y='260' width='25' height='0' fill='#64748B' opacity='0.3'/><text x='237' y='255' font-size='9' fill='#64748B'>pertes</text><rect x='295' y='260' width='25' height='0' fill='#4A90D9' opacity='0.7'/><rect x='325' y='105' width='25' height='155' fill='#E8744F' opacity='0.7'/><line x1='40' y1='60' x2='375' y2='60' stroke='#10B981' stroke-width='1.5' stroke-dasharray='5,4'/><text x='385' y='55' font-size='10' fill='#10B981'>Em₀</text><line x1='40' y1='105' x2='375' y2='105' stroke='#E8744F' stroke-width='1' stroke-dasharray='3,3'/><text x='385' y='100' font-size='9' fill='#E8744F'>Em(H)</text><text x='200' y='45' font-size='11' fill='#64748B' text-anchor='middle'>Avec frottements de l'air</text></svg>",
      "alt_text": "Diagramme en barres : au départ Ec=200J et Ep=0; au sommet Ec=0 et Ep inférieure à 200J à cause des frottements"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Faux. En présence de frottements de l'air, l'énergie mécanique diminue car une partie est dissipée sous forme de chaleur : $E_m(H) = E_{m,0} + W(\\vec{f}_{air})$ avec $W(\\vec{f}_{air}) < 0$. Donc $E_m(H) < E_{m,0} = \\frac{1}{2}mv_0^2 = 200$ J. Au sommet, $E_c = 0$ et $E_p = mgh_{max}$, mais $mgh_{max} < 200$ J car des frottements ont dissipé de l'énergie.",
    "steps": [
      "Sans frottement : $E_m = \\frac{1}{2}mv_0^2 = 200$ J = constante",
      "Avec frottements : $\\Delta E_m = W(\\vec{f}_{air}) < 0$",
      "Donc $E_m$ diminue au cours du mouvement",
      "Au sommet : $E_m(H) = 200 + W(\\vec{f}_{air}) < 200$ J",
      "L'affirmation est fausse"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Les frottements de l'air dissipent de l'énergie. L'énergie mécanique est-elle conservée en présence de frottements ?"}$h$::jsonb,
  ARRAY['energie','frottement_air','conservation','diagramme_barres','bac_2024']
);
