-- ============================================================
-- PHYSICS CONTENT v2: Ondes (2 skills, 16 items)
-- Authentic Moroccan Baccalauréat exam patterns with SVG figures
-- Skills:
--   wave_properties  (33333333-...-027) — 8 items
--   sound_light      (33333333-...-028) — 8 items
-- Items: 44444444-0000-0000-0000-000000000891 → ...906
-- ============================================================

-- =====================
-- SKILL: wave_properties (Propriétés des ondes) — 8 items
-- Covers: équation d'onde progressive, célérité, longueur d'onde,
--         ondes transversales/longitudinales, période/fréquence,
--         déphasage, stroboscopie, superposition/interférences
-- =====================

-- 891: Équation d'onde progressive sinusoïdale y(x,t) — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000891',
  '33333333-0000-0000-0000-000000000027',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Une onde mécanique progressive sinusoïdale se propage le long d'une corde dans le sens des $x$ croissants avec une célérité $v = 4$ m/s. La source $S$ située à l'origine vibre selon $y_S(t) = 3\\sin(10\\pi t)$ (en cm). Quelle est l'équation de l'onde $y(x,t)$ ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><line x1='40' y1='125' x2='380' y2='125' stroke='#64748B' stroke-width='2'/><line x1='40' y1='230' x2='40' y2='20' stroke='#64748B' stroke-width='2'/><path d='M 40 125 Q 60 55 80 125 Q 100 195 120 125 Q 140 55 160 125 Q 180 195 200 125 Q 220 55 240 125 Q 260 195 280 125 Q 300 55 320 125 Q 340 195 360 125' stroke='#4A90D9' stroke-width='2.5' fill='none'/><line x1='80' y1='125' x2='80' y2='55' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='4,3'/><line x1='80' y1='55' x2='40' y2='55' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='4,3'/><text x='10' y='60' font-size='12' fill='#E8744F'>A</text><line x1='40' y1='115' x2='120' y2='115' stroke='#10B981' stroke-width='2' marker-end='url(#arrLam)'/><line x1='40' y1='115' x2='40' y2='105' stroke='#10B981' stroke-width='1'/><line x1='120' y1='115' x2='120' y2='105' stroke='#10B981' stroke-width='1'/><text x='65' y='110' font-size='12' fill='#10B981' font-weight='bold'>lambda</text><defs><marker id='arrLam' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs><text x='385' y='130' font-size='12' fill='#64748B'>x</text><text x='25' y='15' font-size='12' fill='#64748B'>y</text><text x='35' y='140' font-size='11' fill='#64748B'>S</text><circle cx='40' cy='125' r='4' fill='#E8744F'/><text x='200' y='240' font-size='12' fill='#64748B' text-anchor='middle'>Sens de propagation →</text></svg>",
      "alt_text": "Onde sinusoïdale progressive se propageant le long d'une corde avec indication de l'amplitude A et de la longueur d'onde lambda"
    },
    "choices": [
      "$y(x,t) = 3\\sin\\left(10\\pi t - \\frac{10\\pi}{4}x\\right)$",
      "$y(x,t) = 3\\sin\\left(10\\pi t + \\frac{10\\pi}{4}x\\right)$",
      "$y(x,t) = 3\\sin\\left(10\\pi t - \\frac{4}{10\\pi}x\\right)$",
      "$y(x,t) = 3\\cos\\left(10\\pi t - \\frac{10\\pi}{4}x\\right)$"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Pour une onde progressive se propageant dans le sens des $x$ croissants : $y(x,t) = A\\sin\\left(\\omega t - \\frac{\\omega}{v}x\\right)$. On identifie $\\omega = 10\\pi$ rad/s et $v = 4$ m/s. Donc $y(x,t) = 3\\sin\\left(10\\pi t - \\frac{10\\pi}{4}x\\right)$ en cm.",
    "steps": [
      "Identification : $A = 3$ cm, $\\omega = 10\\pi$ rad/s",
      "Pour une propagation dans le sens des $x$ croissants : signe $-$ devant $kx$",
      "Nombre d'onde : $k = \\frac{\\omega}{v} = \\frac{10\\pi}{4} = 2{,}5\\pi$ rad/m",
      "$y(x,t) = 3\\sin\\left(10\\pi t - 2{,}5\\pi x\\right)$ en cm"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Pour une onde se propageant vers les $x$ croissants, le retard temporel d'un point M situé à la distance $x$ de la source est $\\tau = x/v$. Remplacez $t$ par $t - \\tau$ dans $y_S(t)$."}$h$::jsonb,
  ARRAY['ondes', 'equation_onde', 'progressive_sinusoidale', 'bac_2024']
);

-- 892: Célérité d'une onde à partir d'un graphique y-t — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000892',
  '33333333-0000-0000-0000-000000000027',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Le graphique ci-dessous montre l'élongation $y$ en fonction du temps $t$ en deux points $A$ et $B$ d'une corde, distants de $d = 1{,}6$ m. Le retard temporel de $B$ par rapport à $A$ est $\\tau = 0{,}4$ s. Quelle est la célérité de l'onde ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 280' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='280' fill='#FAFAFA'/><line x1='50' y1='130' x2='380' y2='130' stroke='#64748B' stroke-width='2'/><line x1='50' y1='260' x2='50' y2='10' stroke='#64748B' stroke-width='2'/><path d='M 50 130 Q 75 60 100 130 Q 125 200 150 130 Q 175 60 200 130 Q 225 200 250 130 Q 275 60 300 130 Q 325 200 350 130' stroke='#4A90D9' stroke-width='2.5' fill='none'/><path d='M 90 130 Q 115 60 140 130 Q 165 200 190 130 Q 215 60 240 130 Q 265 200 290 130 Q 315 60 340 130 Q 365 200 380 160' stroke='#E8744F' stroke-width='2.5' fill='none' stroke-dasharray='8,4'/><line x1='50' y1='245' x2='90' y2='245' stroke='#10B981' stroke-width='2' marker-end='url(#arrTau)'/><line x1='50' y1='240' x2='50' y2='250' stroke='#10B981' stroke-width='1'/><line x1='90' y1='240' x2='90' y2='250' stroke='#10B981' stroke-width='1'/><text x='55' y='260' font-size='12' fill='#10B981' font-weight='bold'>tau = 0,4 s</text><defs><marker id='arrTau' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs><text x='385' y='135' font-size='12' fill='#64748B'>t(s)</text><text x='35' y='15' font-size='12' fill='#64748B'>y</text><text x='55' y='25' font-size='12' fill='#4A90D9' font-weight='bold'>A</text><text x='95' y='25' font-size='12' fill='#E8744F' font-weight='bold'>B</text><rect x='260' y='15' width='12' height='3' fill='#4A90D9'/><text x='278' y='20' font-size='11' fill='#4A90D9'>Point A</text><rect x='260' y='30' width='12' height='3' fill='#E8744F'/><text x='278' y='35' font-size='11' fill='#E8744F'>Point B</text></svg>",
      "alt_text": "Graphique y-t montrant deux courbes sinusoïdales décalées d'un retard tau=0,4 s pour les points A et B"
    },
    "choices": [
      "$v = 4$ m/s",
      "$v = 0{,}64$ m/s",
      "$v = 2$ m/s",
      "$v = 0{,}25$ m/s"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La célérité de l'onde est le rapport de la distance $d$ parcourue par le retard temporel $\\tau$. Donc $v = \\frac{d}{\\tau} = \\frac{1{,}6}{0{,}4} = 4$ m/s.",
    "steps": [
      "Le retard temporel entre A et B : $\\tau = 0{,}4$ s",
      "Distance entre A et B : $d = 1{,}6$ m",
      "Célérité : $v = \\frac{d}{\\tau} = \\frac{1{,}6}{0{,}4}$",
      "$v = 4$ m/s"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 120' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='120' fill='#FAFAFA'/><text x='200' y='40' font-size='16' fill='#4A90D9' text-anchor='middle' font-weight='bold'>v = d / tau</text><text x='200' y='70' font-size='14' fill='#64748B' text-anchor='middle'>v = 1,6 / 0,4 = 4 m/s</text><rect x='140' y='85' width='120' height='25' rx='5' fill='#10B981' opacity='0.15' stroke='#10B981' stroke-width='1.5'/><text x='200' y='102' font-size='13' fill='#10B981' text-anchor='middle' font-weight='bold'>v = 4 m/s</text></svg>",
      "alt_text": "Résultat encadré : v = d / tau = 4 m/s"
    }
  }$e$::jsonb,
  $h${"text_fr": "La célérité d'une onde est définie comme la distance parcourue par la perturbation divisée par le temps mis pour la parcourir : $v = d / \\tau$."}$h$::jsonb,
  ARRAY['ondes', 'celerite', 'retard_temporel', 'bac_2024']
);

-- 893: Détermination de la longueur d'onde à partir d'un cliché — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000893',
  '33333333-0000-0000-0000-000000000027',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Le cliché instantané ci-dessous montre la forme d'une corde à un instant donné. On mesure que 5 longueurs d'onde complètes occupent une distance de $4{,}0$ m. Calculer la longueur d'onde $\\lambda$ (en m).",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='200' fill='#FAFAFA'/><line x1='30' y1='100' x2='390' y2='100' stroke='#64748B' stroke-width='1' stroke-dasharray='4,4'/><path d='M 30 100 Q 48 40 66 100 Q 84 160 102 100 Q 120 40 138 100 Q 156 160 174 100 Q 192 40 210 100 Q 228 160 246 100 Q 264 40 282 100 Q 300 160 318 100 Q 336 40 354 100 Q 372 160 390 100' stroke='#4A90D9' stroke-width='2.5' fill='none'/><line x1='30' y1='175' x2='390' y2='175' stroke='#E8744F' stroke-width='2' marker-end='url(#arr5L)'/><line x1='390' y1='175' x2='30' y2='175' stroke='#E8744F' stroke-width='2' marker-end='url(#arr5Lb)'/><text x='190' y='195' font-size='12' fill='#E8744F' text-anchor='middle' font-weight='bold'>5lambda = 4,0 m</text><defs><marker id='arr5L' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='arr5Lb' markerWidth='8' markerHeight='6' refX='0' refY='3' orient='auto'><polygon points='8 0,0 3,8 6' fill='#E8744F'/></marker></defs><line x1='30' y1='20' x2='30' y2='170' stroke='#64748B' stroke-width='1.5'/><text x='15' y='15' font-size='12' fill='#64748B'>y</text><text x='395' y='105' font-size='12' fill='#64748B'>x</text><line x1='30' y1='100' x2='30' y2='40' stroke='#10B981' stroke-width='1.5' stroke-dasharray='3,3'/><text x='10' y='70' font-size='11' fill='#10B981'>A</text></svg>",
      "alt_text": "Cliché instantané d'une corde vibrant sinusoïdalement : 5 longueurs d'onde complètes sur 4,0 m"
    },
    "correct_value": 0.8,
    "tolerance": 0.01
  }$q$::jsonb,
  $e${
    "text_fr": "Si 5 longueurs d'onde occupent une distance de 4,0 m, alors une longueur d'onde est : $\\lambda = \\frac{4{,}0}{5} = 0{,}8$ m.",
    "steps": [
      "On repère 5 motifs complets sur 4,0 m",
      "$5\\lambda = 4{,}0$ m",
      "$\\lambda = \\frac{4{,}0}{5} = 0{,}8$ m"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Comptez le nombre de motifs complets (longueurs d'onde) sur la distance mesurée, puis divisez la distance totale par ce nombre."}$h$::jsonb,
  ARRAY['ondes', 'longueur_onde', 'cliche', 'bac_2024']
);

-- 894: Ondes transversales vs longitudinales — true_false (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000894',
  '33333333-0000-0000-0000-000000000027',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "Les ondes sonores dans l'air sont des ondes transversales.",
    "latex": true,
    "correct_answer": false,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='200' y='25' font-size='14' fill='#64748B' text-anchor='middle' font-weight='bold'>Comparaison</text><text x='20' y='60' font-size='13' fill='#4A90D9' font-weight='bold'>Onde transversale :</text><line x1='20' y1='100' x2='380' y2='100' stroke='#64748B' stroke-width='1' stroke-dasharray='4,4'/><path d='M 20 100 Q 50 50 80 100 Q 110 150 140 100 Q 170 50 200 100 Q 230 150 260 100 Q 290 50 320 100 Q 350 150 380 100' stroke='#4A90D9' stroke-width='2.5' fill='none'/><line x1='350' y1='90' x2='380' y2='90' stroke='#4A90D9' stroke-width='2' marker-end='url(#arrPr1)'/><text x='355' y='85' font-size='10' fill='#4A90D9'>propagation</text><line x1='200' y1='100' x2='200' y2='60' stroke='#E8744F' stroke-width='2' marker-end='url(#arrPt1)'/><text x='205' y='65' font-size='10' fill='#E8744F'>perturbation</text><text x='20' y='160' font-size='13' fill='#E8744F' font-weight='bold'>Onde longitudinale :</text><line x1='20' y1='200' x2='380' y2='200' stroke='#64748B' stroke-width='1' stroke-dasharray='4,4'/><line x1='30' y1='195' x2='30' y2='205' stroke='#64748B' stroke-width='2'/><line x1='50' y1='195' x2='50' y2='205' stroke='#64748B' stroke-width='2'/><line x1='60' y1='195' x2='60' y2='205' stroke='#64748B' stroke-width='2'/><line x1='65' y1='195' x2='65' y2='205' stroke='#64748B' stroke-width='2'/><line x1='68' y1='195' x2='68' y2='205' stroke='#64748B' stroke-width='2'/><line x1='85' y1='195' x2='85' y2='205' stroke='#64748B' stroke-width='2'/><line x1='110' y1='195' x2='110' y2='205' stroke='#64748B' stroke-width='2'/><line x1='130' y1='195' x2='130' y2='205' stroke='#64748B' stroke-width='2'/><line x1='140' y1='195' x2='140' y2='205' stroke='#64748B' stroke-width='2'/><line x1='143' y1='195' x2='143' y2='205' stroke='#64748B' stroke-width='2'/><line x1='146' y1='195' x2='146' y2='205' stroke='#64748B' stroke-width='2'/><line x1='165' y1='195' x2='165' y2='205' stroke='#64748B' stroke-width='2'/><line x1='190' y1='195' x2='190' y2='205' stroke='#64748B' stroke-width='2'/><text x='60' y='230' font-size='10' fill='#64748B'>compression</text><text x='100' y='230' font-size='10' fill='#64748B'>dilatation</text><line x1='350' y1='190' x2='380' y2='190' stroke='#E8744F' stroke-width='2' marker-end='url(#arrPr2)'/><text x='340' y='185' font-size='10' fill='#E8744F'>propagation</text><defs><marker id='arrPr1' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#4A90D9'/></marker><marker id='arrPt1' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='arrPr2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs></svg>",
      "alt_text": "Comparaison entre onde transversale (perturbation perpendiculaire) et onde longitudinale (compression-dilatation parallèle)"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Faux. Les ondes sonores dans l'air sont des ondes longitudinales. Les molécules d'air vibrent parallèlement à la direction de propagation du son, créant des zones de compression et de dilatation (raréfaction). Une onde transversale a une perturbation perpendiculaire à la direction de propagation (exemple : onde sur une corde).",
    "steps": [
      "Onde transversale : perturbation $\\perp$ propagation (ex : corde, surface de l'eau)",
      "Onde longitudinale : perturbation $\\parallel$ propagation (ex : son dans l'air, ressort)",
      "Le son dans l'air : les molécules vibrent dans la direction de propagation",
      "Donc le son dans l'air est une onde longitudinale"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Dans quel sens vibrent les molécules d'air quand le son se propage ? Comparez cette direction avec la direction de propagation."}$h$::jsonb,
  ARRAY['ondes', 'transversale', 'longitudinale', 'bac_style']
);

-- 895: Relation période-fréquence — numeric (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000895',
  '33333333-0000-0000-0000-000000000027',
  'numeric',
  2,
  'fr',
  $q${
    "stem": "Un vibreur émet une onde mécanique progressive sinusoïdale de fréquence $f = 25$ Hz le long d'une corde. La célérité de l'onde dans la corde est $v = 5{,}0$ m/s. Calculer la période $T$ de l'onde (en ms).",
    "latex": true,
    "correct_value": 40,
    "tolerance": 0.5
  }$q$::jsonb,
  $e${
    "text_fr": "La période est l'inverse de la fréquence : $T = \\frac{1}{f} = \\frac{1}{25} = 0{,}04$ s $= 40$ ms.",
    "steps": [
      "Relation fondamentale : $T = \\frac{1}{f}$",
      "$T = \\frac{1}{25} = 0{,}04$ s",
      "Conversion : $T = 0{,}04 \\times 1000 = 40$ ms"
    ]
  }$e$::jsonb,
  $h${"text_fr": "La période $T$ et la fréquence $f$ sont liées par $T = 1/f$. Attention à l'unité demandée (ms)."}$h$::jsonb,
  ARRAY['ondes', 'periode', 'frequence', 'bac_style']
);

-- 896: Déphasage entre deux points — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000896',
  '33333333-0000-0000-0000-000000000027',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "Une onde progressive sinusoïdale de longueur d'onde $\\lambda = 1{,}2$ m se propage le long d'une corde. Deux points $M_1$ et $M_2$ sont situés respectivement à $x_1 = 0{,}3$ m et $x_2 = 0{,}9$ m de la source. Quel est le déphasage $\\Delta\\varphi$ de $M_2$ par rapport à $M_1$ ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='200' fill='#FAFAFA'/><line x1='40' y1='100' x2='380' y2='100' stroke='#64748B' stroke-width='2'/><path d='M 40 100 Q 80 30 120 100 Q 160 170 200 100 Q 240 30 280 100 Q 320 170 360 100' stroke='#4A90D9' stroke-width='2.5' fill='none'/><circle cx='80' cy='100' r='5' fill='#E8744F'/><text x='73' y='90' font-size='12' fill='#E8744F' font-weight='bold'>M1</text><circle cx='200' cy='100' r='5' fill='#10B981'/><text x='193' y='90' font-size='12' fill='#10B981' font-weight='bold'>M2</text><line x1='40' y1='170' x2='80' y2='170' stroke='#E8744F' stroke-width='1.5' marker-end='url(#arrM1)'/><text x='45' y='185' font-size='11' fill='#E8744F'>x1</text><line x1='40' y1='155' x2='200' y2='155' stroke='#10B981' stroke-width='1.5' marker-end='url(#arrM2)'/><text x='110' y='150' font-size='11' fill='#10B981'>x2</text><circle cx='40' cy='100' r='4' fill='#64748B'/><text x='32' y='120' font-size='11' fill='#64748B'>S</text><defs><marker id='arrM1' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker><marker id='arrM2' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#10B981'/></marker></defs></svg>",
      "alt_text": "Deux points M1 et M2 sur une corde avec une onde progressive sinusoïdale, M1 à x1 de la source et M2 à x2"
    },
    "choices": [
      "$\\Delta\\varphi = \\pi$ rad",
      "$\\Delta\\varphi = \\frac{\\pi}{2}$ rad",
      "$\\Delta\\varphi = 2\\pi$ rad",
      "$\\Delta\\varphi = \\frac{\\pi}{3}$ rad"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Le déphasage entre deux points séparés d'une distance $d = x_2 - x_1$ est $\\Delta\\varphi = \\frac{2\\pi}{\\lambda} \\times d$. Ici $d = 0{,}9 - 0{,}3 = 0{,}6$ m et $\\lambda = 1{,}2$ m. Donc $\\Delta\\varphi = \\frac{2\\pi}{1{,}2} \\times 0{,}6 = \\frac{2\\pi \\times 0{,}6}{1{,}2} = \\pi$ rad. Les deux points vibrent en opposition de phase.",
    "steps": [
      "Distance : $d = x_2 - x_1 = 0{,}9 - 0{,}3 = 0{,}6$ m",
      "Déphasage : $\\Delta\\varphi = \\frac{2\\pi}{\\lambda} \\times d$",
      "$\\Delta\\varphi = \\frac{2\\pi}{1{,}2} \\times 0{,}6 = \\frac{1{,}2\\pi}{1{,}2} = \\pi$ rad",
      "$M_1$ et $M_2$ vibrent en opposition de phase ($d = \\lambda/2$)"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 120' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='120' fill='#FAFAFA'/><text x='200' y='30' font-size='13' fill='#64748B' text-anchor='middle'>d = 0,6 m = lambda/2</text><text x='200' y='55' font-size='13' fill='#4A90D9' text-anchor='middle'>delta_phi = pi rad → opposition de phase</text><text x='200' y='85' font-size='12' fill='#10B981' text-anchor='middle'>Quand M1 est au maximum, M2 est au minimum</text></svg>",
      "alt_text": "Résumé : d = lambda/2 implique opposition de phase"
    }
  }$e$::jsonb,
  $h${"text_fr": "Calculez d'abord la distance $d$ entre les deux points, puis utilisez $\\Delta\\varphi = 2\\pi d / \\lambda$. Comparez $d$ avec $\\lambda/2$."}$h$::jsonb,
  ARRAY['ondes', 'dephasage', 'opposition_phase', 'bac_2024']
);

-- 897: Observation stroboscopique — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000897',
  '33333333-0000-0000-0000-000000000027',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "On éclaire à l'aide d'un stroboscope de fréquence $f_e = 48$ Hz une onde progressive périodique à la surface de l'eau de fréquence $f = 50$ Hz. Combien de vagues immobiles apparentes observe-t-on lorsque la fréquence stroboscopique est réglée sur $f_e = 50$ Hz ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='200' y='25' font-size='14' fill='#64748B' text-anchor='middle' font-weight='bold'>Observation stroboscopique</text><rect x='40' y='40' width='320' height='80' rx='5' fill='#4A90D9' opacity='0.08' stroke='#4A90D9' stroke-width='1.5'/><text x='200' y='65' font-size='12' fill='#4A90D9' text-anchor='middle'>f_e = f = 50 Hz (condition d'immobilité)</text><path d='M 60 90 Q 80 60 100 90 Q 120 120 140 90 Q 160 60 180 90 Q 200 120 220 90 Q 240 60 260 90 Q 280 120 300 90 Q 320 60 340 90' stroke='#4A90D9' stroke-width='2' fill='none'/><text x='200' y='135' font-size='11' fill='#4A90D9' text-anchor='middle'>Vagues apparaissent immobiles</text><rect x='40' y='150' width='320' height='80' rx='5' fill='#E8744F' opacity='0.08' stroke='#E8744F' stroke-width='1.5'/><text x='200' y='175' font-size='12' fill='#E8744F' text-anchor='middle'>f_e = 48 Hz (f_e &lt; f)</text><path d='M 60 200 Q 82 170 104 200 Q 126 230 148 200 Q 170 170 192 200 Q 214 230 236 200 Q 258 170 280 200 Q 302 230 324 200' stroke='#E8744F' stroke-width='2' fill='none'/><text x='200' y='245' font-size='11' fill='#E8744F' text-anchor='middle'>Vagues semblent avancer lentement</text></svg>",
      "alt_text": "Schéma de stroboscopie : à fe=f les vagues paraissent immobiles, à fe<f elles semblent avancer lentement"
    },
    "choices": [
      "Les vagues paraissent immobiles",
      "Les vagues avancent lentement dans le sens de propagation",
      "Les vagues reculent lentement",
      "Les vagues sont invisibles"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Lorsque la fréquence du stroboscope est égale à la fréquence de l'onde ($f_e = f$), on observe l'immobilité apparente des vagues. Chaque flash éclaire la surface de l'eau exactement dans la même configuration. C'est la condition de coïncidence : $f_e = f$ ou $f_e = f/n$ ($n$ entier).",
    "steps": [
      "Condition d'immobilité apparente : $f_e = f/n$ ($n$ entier naturel non nul)",
      "Ici $f_e = 50$ Hz $= f$ : on a $n = 1$",
      "Chaque flash éclaire la même configuration de l'onde",
      "Les vagues paraissent donc immobiles"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Quand la fréquence du stroboscope est un sous-multiple de la fréquence de l'onde ($f_e = f/n$), les vagues paraissent immobiles. Que vaut $n$ ici ?"}$h$::jsonb,
  ARRAY['ondes', 'stroboscopie', 'immobilite_apparente', 'bac_2024']
);

-- 898: Superposition et interférences — mcq (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000898',
  '33333333-0000-0000-0000-000000000027',
  'mcq',
  5,
  'fr',
  $q${
    "stem": "Deux sources ponctuelles $S_1$ et $S_2$, synchrones et en phase, émettent des ondes circulaires à la surface de l'eau avec la même longueur d'onde $\\lambda = 2$ cm. Un point $M$ est situé à $d_1 = 8$ cm de $S_1$ et $d_2 = 12$ cm de $S_2$. Quelle est la nature de l'interférence en $M$ ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='#FAFAFA'/><circle cx='120' cy='200' r='30' stroke='#4A90D9' stroke-width='1' fill='none' opacity='0.4'/><circle cx='120' cy='200' r='60' stroke='#4A90D9' stroke-width='1' fill='none' opacity='0.3'/><circle cx='120' cy='200' r='90' stroke='#4A90D9' stroke-width='1' fill='none' opacity='0.2'/><circle cx='120' cy='200' r='120' stroke='#4A90D9' stroke-width='1' fill='none' opacity='0.15'/><circle cx='280' cy='200' r='30' stroke='#E8744F' stroke-width='1' fill='none' opacity='0.4'/><circle cx='280' cy='200' r='60' stroke='#E8744F' stroke-width='1' fill='none' opacity='0.3'/><circle cx='280' cy='200' r='90' stroke='#E8744F' stroke-width='1' fill='none' opacity='0.2'/><circle cx='280' cy='200' r='120' stroke='#E8744F' stroke-width='1' fill='none' opacity='0.15'/><circle cx='120' cy='200' r='5' fill='#4A90D9'/><text x='108' y='220' font-size='12' fill='#4A90D9' font-weight='bold'>S1</text><circle cx='280' cy='200' r='5' fill='#E8744F'/><text x='268' y='220' font-size='12' fill='#E8744F' font-weight='bold'>S2</text><circle cx='200' cy='80' r='5' fill='#10B981'/><text x='208' y='78' font-size='12' fill='#10B981' font-weight='bold'>M</text><line x1='120' y1='200' x2='200' y2='80' stroke='#4A90D9' stroke-width='1.5' stroke-dasharray='5,3'/><text x='140' y='140' font-size='11' fill='#4A90D9'>d1</text><line x1='280' y1='200' x2='200' y2='80' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='5,3'/><text x='250' y='140' font-size='11' fill='#E8744F'>d2</text></svg>",
      "alt_text": "Deux sources S1 et S2 émettant des ondes circulaires à la surface de l'eau, avec un point M distant de d1=8 cm de S1 et d2=12 cm de S2"
    },
    "choices": [
      "Interférence constructive (amplitude maximale)",
      "Interférence destructive (amplitude nulle)",
      "Interférence partiellement constructive",
      "On ne peut pas déterminer la nature sans connaître la fréquence"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La différence de marche est $\\delta = d_2 - d_1 = 12 - 8 = 4$ cm $= 2\\lambda$. La condition d'interférence constructive est $\\delta = k\\lambda$ ($k$ entier). Ici $k = 2$, donc l'interférence est constructive : l'amplitude en $M$ est maximale.",
    "steps": [
      "Différence de marche : $\\delta = d_2 - d_1 = 12 - 8 = 4$ cm",
      "On compare avec $\\lambda = 2$ cm : $\\delta = \\frac{4}{2} = 2\\lambda$",
      "Condition constructive : $\\delta = k\\lambda$ ($k$ entier) — satisfaite avec $k = 2$",
      "Condition destructive : $\\delta = (k + \\frac{1}{2})\\lambda$ — non satisfaite",
      "Conclusion : interférence constructive, amplitude maximale en $M$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='100' fill='#FAFAFA'/><rect x='30' y='15' width='340' height='70' rx='5' fill='#10B981' opacity='0.1' stroke='#10B981' stroke-width='1.5'/><text x='200' y='40' font-size='13' fill='#10B981' text-anchor='middle' font-weight='bold'>Constructive : delta = k.lambda</text><text x='200' y='60' font-size='12' fill='#64748B' text-anchor='middle'>delta = 4 cm = 2 x 2 cm = 2.lambda</text><text x='200' y='78' font-size='12' fill='#10B981' text-anchor='middle'>k = 2 (entier) → Amplitude maximale</text></svg>",
      "alt_text": "Résumé : delta = 2 lambda, interférence constructive"
    }
  }$e$::jsonb,
  $h${"text_fr": "Calculez la différence de marche $\\delta = |d_2 - d_1|$ et vérifiez si elle est un multiple entier de $\\lambda$ (constructive) ou un multiple de $(k+1/2)\\lambda$ (destructive)."}$h$::jsonb,
  ARRAY['ondes', 'interferences', 'superposition', 'difference_marche', 'bac_2024']
);

-- =====================
-- SKILL: sound_light (Ondes sonores et lumineuses) — 8 items
-- Covers: Young double fente, diffraction fente simple, Doppler,
--         vitesse du son, longueur d'onde et couleur, condition de diffraction,
--         interférences constructives/destructives, tache centrale diffraction
-- =====================

-- 899: Expérience de Young — interfrange — numeric (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000899',
  '33333333-0000-0000-0000-000000000028',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "Dans l'expérience des fentes de Young, on utilise une lumière monochromatique de longueur d'onde $\\lambda = 546$ nm. Les deux fentes sont séparées de $a = 0{,}3$ mm et l'écran d'observation est placé à $D = 2{,}0$ m des fentes. Calculer l'interfrange $i$ (en mm).",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 280' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='280' fill='#FAFAFA'/><rect x='30' y='30' width='5' height='220' fill='#64748B'/><rect x='33' y='120' width='3' height='8' fill='#FAFAFA'/><rect x='33' y='152' width='3' height='8' fill='#FAFAFA'/><rect x='350' y='30' width='5' height='220' fill='#64748B' opacity='0.6'/><line x1='36' y1='124' x2='355' y2='90' stroke='#4A90D9' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><line x1='36' y1='124' x2='355' y2='140' stroke='#4A90D9' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><line x1='36' y1='156' x2='355' y2='90' stroke='#E8744F' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><line x1='36' y1='156' x2='355' y2='140' stroke='#E8744F' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><text x='22' y='127' font-size='10' fill='#4A90D9'>S1</text><text x='22' y='160' font-size='10' fill='#E8744F'>S2</text><line x1='29' y1='124' x2='29' y2='156' stroke='#10B981' stroke-width='1.5'/><text x='8' y='143' font-size='10' fill='#10B981'>a</text><line x1='36' y1='270' x2='350' y2='270' stroke='#64748B' stroke-width='1.5' marker-end='url(#arrD)'/><text x='180' y='265' font-size='12' fill='#64748B' text-anchor='middle'>D = 2,0 m</text><rect x='358' y='75' width='30' height='15' fill='#10B981' opacity='0.3'/><rect x='358' y='105' width='30' height='15' fill='#FAFAFA'/><rect x='358' y='120' width='30' height='15' fill='#10B981' opacity='0.3'/><rect x='358' y='150' width='30' height='15' fill='#FAFAFA'/><rect x='358' y='165' width='30' height='15' fill='#10B981' opacity='0.3'/><line x1='393' y1='83' x2='393' y2='128' stroke='#E8744F' stroke-width='1.5'/><text x='398' y='110' font-size='11' fill='#E8744F'>i</text><defs><marker id='arrD' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#64748B'/></marker></defs><text x='365' y='55' font-size='11' fill='#64748B'>Ecran</text></svg>",
      "alt_text": "Dispositif des fentes de Young : deux fentes S1 et S2 séparées de a, écran à distance D avec franges d'interférences d'interfrange i"
    },
    "correct_value": 3.64,
    "tolerance": 0.05
  }$q$::jsonb,
  $e${
    "text_fr": "L'interfrange est donné par $i = \\frac{\\lambda D}{a}$. Avec $\\lambda = 546 \\times 10^{-9}$ m, $D = 2{,}0$ m et $a = 0{,}3 \\times 10^{-3}$ m : $i = \\frac{546 \\times 10^{-9} \\times 2{,}0}{0{,}3 \\times 10^{-3}} = \\frac{1092 \\times 10^{-9}}{3 \\times 10^{-4}} = 3{,}64 \\times 10^{-3}$ m $= 3{,}64$ mm.",
    "steps": [
      "Formule de l'interfrange : $i = \\frac{\\lambda D}{a}$",
      "Conversions : $\\lambda = 546$ nm $= 546 \\times 10^{-9}$ m ; $a = 0{,}3$ mm $= 3 \\times 10^{-4}$ m",
      "$i = \\frac{546 \\times 10^{-9} \\times 2{,}0}{3 \\times 10^{-4}}$",
      "$i = \\frac{1{,}092 \\times 10^{-6}}{3 \\times 10^{-4}} = 3{,}64 \\times 10^{-3}$ m",
      "$i = 3{,}64$ mm"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule $i = \\lambda D / a$. Faites attention aux conversions d'unités : nm → m et mm → m."}$h$::jsonb,
  ARRAY['ondes', 'young', 'interfrange', 'interferences', 'bac_2024']
);

-- 900: Diffraction par une fente simple — largeur angulaire — mcq (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000900',
  '33333333-0000-0000-0000-000000000028',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "On éclaire une fente de largeur $a = 0{,}1$ mm avec un faisceau laser de longueur d'onde $\\lambda = 633$ nm. La figure de diffraction est observée sur un écran situé à $D = 3{,}0$ m de la fente. Quelle est la largeur de la tache centrale de diffraction sur l'écran ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><rect x='60' y='40' width='4' height='170' fill='#64748B'/><rect x='62' y='115' width='3' height='20' fill='#FAFAFA'/><line x1='30' y1='90' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='100' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='110' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='120' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='130' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='140' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><line x1='30' y1='150' x2='60' y2='125' stroke='#E8744F' stroke-width='2'/><text x='15' y='80' font-size='11' fill='#E8744F'>Laser</text><rect x='330' y='40' width='4' height='170' fill='#64748B' opacity='0.5'/><rect x='338' y='80' width='25' height='10' fill='#E8744F' opacity='0.15'/><rect x='338' y='93' width='25' height='10' fill='#E8744F' opacity='0.3'/><rect x='338' y='106' width='25' height='38' fill='#E8744F' opacity='0.7'/><rect x='338' y='147' width='25' height='10' fill='#E8744F' opacity='0.3'/><rect x='338' y='160' width='25' height='10' fill='#E8744F' opacity='0.15'/><line x1='368' y1='106' x2='368' y2='144' stroke='#10B981' stroke-width='2'/><text x='372' y='128' font-size='11' fill='#10B981' font-weight='bold'>L</text><line x1='64' y1='230' x2='330' y2='230' stroke='#64748B' stroke-width='1.5' marker-end='url(#arrDiff)'/><text x='190' y='245' font-size='12' fill='#64748B' text-anchor='middle'>D = 3,0 m</text><text x='55' y='112' font-size='10' fill='#64748B'>a</text><text x='335' y='35' font-size='11' fill='#64748B'>Ecran</text><line x1='64' y1='125' x2='330' y2='106' stroke='#4A90D9' stroke-width='1' stroke-dasharray='4,3' opacity='0.4'/><line x1='64' y1='125' x2='330' y2='144' stroke='#4A90D9' stroke-width='1' stroke-dasharray='4,3' opacity='0.4'/><text x='180' y='110' font-size='10' fill='#4A90D9'>theta</text><defs><marker id='arrDiff' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#64748B'/></marker></defs></svg>",
      "alt_text": "Diffraction par une fente simple : un laser éclaire une fente de largeur a, la figure de diffraction montre une tache centrale de largeur L sur un écran à distance D"
    },
    "choices": [
      "$L = 38{,}0$ mm",
      "$L = 19{,}0$ mm",
      "$L = 6{,}33$ mm",
      "$L = 76{,}0$ mm"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Le demi-angle de diffraction est $\\theta = \\frac{\\lambda}{a}$. La largeur de la tache centrale est $L = 2D\\tan\\theta \\approx 2D\\theta = \\frac{2\\lambda D}{a}$. $L = \\frac{2 \\times 633 \\times 10^{-9} \\times 3{,}0}{0{,}1 \\times 10^{-3}} = \\frac{3{,}798 \\times 10^{-6}}{10^{-4}} = 3{,}798 \\times 10^{-2}$ m $\\approx 38{,}0$ mm.",
    "steps": [
      "Demi-angle de diffraction : $\\theta = \\frac{\\lambda}{a}$ (petits angles)",
      "Largeur tache centrale : $L = \\frac{2\\lambda D}{a}$",
      "$L = \\frac{2 \\times 633 \\times 10^{-9} \\times 3{,}0}{10^{-4}}$",
      "$L = \\frac{3{,}798 \\times 10^{-6}}{10^{-4}} = 3{,}798 \\times 10^{-2}$ m",
      "$L \\approx 38{,}0$ mm"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='100' fill='#FAFAFA'/><text x='200' y='30' font-size='14' fill='#4A90D9' text-anchor='middle' font-weight='bold'>L = 2.lambda.D / a</text><text x='200' y='55' font-size='12' fill='#64748B' text-anchor='middle'>L = 2 x 633e-9 x 3,0 / 1e-4</text><rect x='140' y='65' width='120' height='25' rx='5' fill='#10B981' opacity='0.15' stroke='#10B981' stroke-width='1.5'/><text x='200' y='82' font-size='13' fill='#10B981' text-anchor='middle' font-weight='bold'>L = 38,0 mm</text></svg>",
      "alt_text": "Résultat : L = 38,0 mm"
    }
  }$e$::jsonb,
  $h${"text_fr": "La largeur de la tache centrale de diffraction est $L = 2\\lambda D / a$. Pensez à convertir toutes les unités en mètres avant le calcul."}$h$::jsonb,
  ARRAY['ondes', 'diffraction', 'fente_simple', 'tache_centrale', 'bac_2024']
);

-- 901: Effet Doppler — décalage fréquentiel — numeric (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000901',
  '33333333-0000-0000-0000-000000000028',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "Une ambulance se déplace à la vitesse $v_s = 30$ m/s vers un observateur immobile. La sirène émet un son de fréquence $f = 800$ Hz. La vitesse du son dans l'air est $v = 340$ m/s. Calculer la fréquence $f'$ (en Hz) perçue par l'observateur.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='200' fill='#FAFAFA'/><rect x='50' y='80' width='80' height='45' fill='#E8744F' rx='5'/><rect x='130' y='90' width='20' height='35' fill='#E8744F' rx='3'/><circle cx='70' cy='130' r='8' fill='#64748B'/><circle cx='120' cy='130' r='8' fill='#64748B'/><text x='90' y='108' font-size='11' fill='white' text-anchor='middle' font-weight='bold'>f=800Hz</text><line x1='155' y1='100' x2='200' y2='100' stroke='#E8744F' stroke-width='2.5' marker-end='url(#arrAmb)'/><text x='160' y='90' font-size='11' fill='#E8744F'>vs=30 m/s</text><circle cx='320' cy='110' r='15' fill='#4A90D9' opacity='0.3' stroke='#4A90D9' stroke-width='2'/><line x1='320' y1='95' x2='320' y2='80' stroke='#4A90D9' stroke-width='2'/><circle cx='320' cy='77' r='8' fill='#4A90D9' opacity='0.3' stroke='#4A90D9' stroke-width='2'/><text x='320' y='70' font-size='10' fill='#4A90D9' text-anchor='middle'>Obs.</text><text x='310' y='150' font-size='12' fill='#4A90D9'>f'' = ?</text><path d='M 150 60 Q 200 40 250 50 Q 300 55 320 65' stroke='#10B981' stroke-width='1.5' fill='none' stroke-dasharray='4,3'/><path d='M 150 70 Q 200 55 250 60 Q 300 65 315 72' stroke='#10B981' stroke-width='1' fill='none' stroke-dasharray='4,3'/><text x='220' y='38' font-size='10' fill='#10B981'>ondes sonores comprimees</text><defs><marker id='arrAmb' markerWidth='8' markerHeight='6' refX='8' refY='3' orient='auto'><polygon points='0 0,8 3,0 6' fill='#E8744F'/></marker></defs></svg>",
      "alt_text": "Ambulance se déplaçant vers un observateur immobile : les fronts d'onde sont comprimés devant l'ambulance"
    },
    "correct_value": 877.42,
    "tolerance": 2
  }$q$::jsonb,
  $e${
    "text_fr": "L'effet Doppler pour une source s'approchant de l'observateur donne : $f' = f \\times \\frac{v}{v - v_s}$. $f' = 800 \\times \\frac{340}{340 - 30} = 800 \\times \\frac{340}{310} \\approx 877{,}4$ Hz. La fréquence perçue est plus élevée car la source s'approche (compression des fronts d'onde).",
    "steps": [
      "Source s'approche → $f' = f \\times \\frac{v}{v - v_s}$",
      "$f' = 800 \\times \\frac{340}{340 - 30}$",
      "$f' = 800 \\times \\frac{340}{310}$",
      "$f' = 800 \\times 1{,}0968 \\approx 877{,}4$ Hz",
      "La fréquence augmente (son plus aigu) quand la source s'approche"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de l'effet Doppler : $f' = f \\times v / (v - v_s)$ quand la source se rapproche. La fréquence perçue est-elle plus haute ou plus basse ?"}$h$::jsonb,
  ARRAY['ondes', 'doppler', 'frequence', 'ambulance', 'bac_2024']
);

-- 902: Vitesse du son dans l'air — true_false (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000902',
  '33333333-0000-0000-0000-000000000028',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "La vitesse du son dans l'air à $20$ °C est d'environ $340$ m/s. Cette vitesse ne dépend pas de la fréquence du son émis.",
    "latex": true,
    "correct_answer": true
  }$q$::jsonb,
  $e${
    "text_fr": "Vrai. L'air est un milieu non dispersif pour les ondes sonores : la vitesse du son dans l'air est indépendante de la fréquence. Elle vaut environ $v \\approx 331 + 0{,}6\\theta$ m/s, où $\\theta$ est la température en °C. À $20$ °C : $v \\approx 331 + 12 = 343$ m/s $\\approx 340$ m/s. La vitesse dépend de la température, mais pas de la fréquence.",
    "steps": [
      "L'air est un milieu non dispersif pour le son",
      "Non dispersif : la vitesse ne dépend pas de la fréquence",
      "Formule approchée : $v \\approx 331 + 0{,}6\\theta$ m/s ($\\theta$ en °C)",
      "À $20$ °C : $v \\approx 343$ m/s $\\approx 340$ m/s",
      "La vitesse dépend de la température, pas de la fréquence"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Un milieu est dispersif si la vitesse de propagation dépend de la fréquence. L'air est-il dispersif pour le son ?"}$h$::jsonb,
  ARRAY['ondes', 'son', 'vitesse_son', 'milieu_dispersif', 'bac_style']
);

-- 903: Longueur d'onde et couleur de la lumière — mcq (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000903',
  '33333333-0000-0000-0000-000000000028',
  'mcq',
  2,
  'fr',
  $q${
    "stem": "Un laser émet une lumière monochromatique de longueur d'onde $\\lambda = 532$ nm dans le vide. Quelle est la couleur de cette lumière ?",
    "latex": true,
    "choices": [
      "Verte",
      "Rouge",
      "Bleue",
      "Jaune"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Le spectre visible s'étend d'environ 400 nm (violet) à 800 nm (rouge). La longueur d'onde $\\lambda = 532$ nm correspond au vert. Les domaines approximatifs sont : violet (400–450 nm), bleu (450–490 nm), vert (490–570 nm), jaune (570–590 nm), orange (590–620 nm), rouge (620–800 nm).",
    "steps": [
      "Spectre visible : $400$ nm (violet) à $800$ nm (rouge)",
      "Violet : 400–450 nm ; Bleu : 450–490 nm",
      "Vert : 490–570 nm ; Jaune : 570–590 nm",
      "Orange : 590–620 nm ; Rouge : 620–800 nm",
      "$\\lambda = 532$ nm $\\in [490 ; 570]$ nm → couleur verte"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Situez la longueur d'onde $\\lambda = 532$ nm dans le spectre visible. Le vert se situe entre environ 490 nm et 570 nm."}$h$::jsonb,
  ARRAY['ondes', 'lumiere', 'spectre_visible', 'couleur', 'bac_style']
);

-- 904: Condition de diffraction — mcq (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000904',
  '33333333-0000-0000-0000-000000000028',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "On fait passer une onde lumineuse de longueur d'onde $\\lambda = 600$ nm à travers deux fentes de largeurs différentes : $a_1 = 5$ mm et $a_2 = 0{,}05$ mm. Pour laquelle des deux fentes observe-t-on un phénomène de diffraction notable ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='100' y='25' font-size='13' fill='#64748B' text-anchor='middle' font-weight='bold'>Fente 1 : a1 = 5 mm</text><rect x='80' y='40' width='5' height='80' fill='#64748B'/><rect x='80' y='130' width='5' height='80' fill='#64748B'/><rect x='83' y='118' width='3' height='14' fill='#FAFAFA'/><text x='70' y='128' font-size='10' fill='#E8744F'>a1</text><line x1='88' y1='100' x2='150' y2='100' stroke='#4A90D9' stroke-width='1.5'/><line x1='88' y1='110' x2='150' y2='110' stroke='#4A90D9' stroke-width='1.5'/><line x1='88' y1='120' x2='150' y2='120' stroke='#4A90D9' stroke-width='1.5'/><line x1='88' y1='130' x2='150' y2='130' stroke='#4A90D9' stroke-width='1.5'/><line x1='88' y1='140' x2='150' y2='140' stroke='#4A90D9' stroke-width='1.5'/><text x='110' y='165' font-size='10' fill='#4A90D9'>Pas de diffraction</text><text x='110' y='178' font-size='10' fill='#64748B'>(a >> lambda)</text><text x='300' y='25' font-size='13' fill='#64748B' text-anchor='middle' font-weight='bold'>Fente 2 : a2 = 0,05 mm</text><rect x='280' y='40' width='5' height='82' fill='#64748B'/><rect x='280' y='130' width='5' height='80' fill='#64748B'/><rect x='283' y='122' width='3' height='8' fill='#FAFAFA'/><text x='270' y='128' font-size='10' fill='#E8744F'>a2</text><line x1='288' y1='126' x2='350' y2='80' stroke='#E8744F' stroke-width='1' stroke-dasharray='3,2'/><line x1='288' y1='126' x2='350' y2='126' stroke='#E8744F' stroke-width='1.5'/><line x1='288' y1='126' x2='350' y2='170' stroke='#E8744F' stroke-width='1' stroke-dasharray='3,2'/><path d='M 350 70 L 355 70 L 360 80 L 365 130 L 360 170 L 355 180 L 350 180' stroke='#E8744F' stroke-width='2' fill='#E8744F' opacity='0.2'/><text x='310' y='200' font-size='10' fill='#E8744F'>Diffraction notable</text><text x='310' y='213' font-size='10' fill='#64748B'>(a ~ lambda)</text></svg>",
      "alt_text": "Comparaison de deux fentes : a1=5 mm (pas de diffraction notable) et a2=0,05 mm (diffraction notable car a comparable à lambda)"
    },
    "choices": [
      "La fente $a_2 = 0{,}05$ mm uniquement",
      "La fente $a_1 = 5$ mm uniquement",
      "Les deux fentes de manière identique",
      "Aucune des deux fentes"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La diffraction est notable lorsque la largeur de la fente $a$ est du même ordre de grandeur que la longueur d'onde $\\lambda$, soit $a \\approx \\lambda$ ou $a$ un peu plus grand que $\\lambda$. Ici $\\lambda = 600$ nm $= 6 \\times 10^{-4}$ mm. Pour $a_1 = 5$ mm : $a_1 / \\lambda \\approx 8300$, donc $a_1 \\gg \\lambda$ (pas de diffraction notable). Pour $a_2 = 0{,}05$ mm : $a_2 / \\lambda \\approx 83$, la fente est beaucoup plus étroite et la diffraction est observable.",
    "steps": [
      "Condition de diffraction notable : $a \\lesssim \\lambda$ ou $a$ du même ordre que $\\lambda$",
      "$\\lambda = 600$ nm $= 6 \\times 10^{-4}$ mm",
      "Fente 1 : $a_1 / \\lambda = 5 / (6 \\times 10^{-4}) \\approx 8300$ → $a_1 \\gg \\lambda$, pas de diffraction",
      "Fente 2 : $a_2 / \\lambda = 0{,}05 / (6 \\times 10^{-4}) \\approx 83$ → diffraction notable",
      "Plus $a$ est petit (proche de $\\lambda$), plus la diffraction est marquée"
    ]
  }$e$::jsonb,
  $h${"text_fr": "La diffraction est d'autant plus marquée que la taille de l'ouverture est proche de la longueur d'onde. Comparez $a_1$ et $a_2$ à $\\lambda$."}$h$::jsonb,
  ARRAY['ondes', 'diffraction', 'condition', 'comparaison', 'bac_2024']
);

-- 905: Interférences constructives/destructives — condition — mcq (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000905',
  '33333333-0000-0000-0000-000000000028',
  'mcq',
  5,
  'fr',
  $q${
    "stem": "Dans l'expérience des fentes de Young, on utilise une lumière monochromatique de longueur d'onde $\\lambda = 480$ nm. Les fentes sont séparées de $a = 0{,}5$ mm et l'écran est à $D = 2{,}5$ m. Un point $P$ de l'écran est situé à $x = 3{,}6$ mm du centre $O$ de la figure d'interférences. La frange en $P$ est-elle brillante ou sombre ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 280' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='280' fill='#FAFAFA'/><rect x='50' y='40' width='4' height='200' fill='#64748B'/><rect x='52' y='125' width='3' height='7' fill='#FAFAFA'/><rect x='52' y='148' width='3' height='7' fill='#FAFAFA'/><rect x='330' y='40' width='4' height='200' fill='#64748B' opacity='0.5'/><line x1='55' y1='128' x2='334' y2='110' stroke='#4A90D9' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><line x1='55' y1='152' x2='334' y2='110' stroke='#E8744F' stroke-width='1' stroke-dasharray='4,3' opacity='0.5'/><circle cx='334' cy='140' r='3' fill='#64748B'/><text x='340' y='144' font-size='10' fill='#64748B'>O</text><circle cx='334' cy='110' r='4' fill='#10B981'/><text x='340' y='108' font-size='11' fill='#10B981' font-weight='bold'>P</text><line x1='340' y1='140' x2='340' y2='112' stroke='#10B981' stroke-width='1.5'/><text x='345' y='128' font-size='10' fill='#10B981'>x=3,6mm</text><text x='35' y='132' font-size='9' fill='#4A90D9'>S1</text><text x='35' y='156' font-size='9' fill='#E8744F'>S2</text><line x1='55' y1='128' x2='334' y2='140' stroke='#64748B' stroke-width='0.8' stroke-dasharray='3,3' opacity='0.3'/><line x1='55' y1='152' x2='334' y2='140' stroke='#64748B' stroke-width='0.8' stroke-dasharray='3,3' opacity='0.3'/><text x='170' y='95' font-size='10' fill='#4A90D9'>d1</text><text x='190' y='145' font-size='10' fill='#E8744F'>d2</text><text x='200' y='265' font-size='11' fill='#64748B' text-anchor='middle'>Difference de marche : delta = ax/D</text></svg>",
      "alt_text": "Schéma des fentes de Young : deux fentes S1 et S2, un point P sur l'écran situé à x=3,6 mm du centre O, avec les chemins optiques d1 et d2"
    },
    "choices": [
      "Frange sombre (interférence destructive)",
      "Frange brillante (interférence constructive)",
      "Ni brillante ni sombre (interférence quelconque)",
      "On ne peut pas conclure sans information supplémentaire"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "La différence de marche en un point $P$ situé à la distance $x$ du centre est $\\delta = \\frac{ax}{D}$. Calculons : $\\delta = \\frac{0{,}5 \\times 10^{-3} \\times 3{,}6 \\times 10^{-3}}{2{,}5} = \\frac{1{,}8 \\times 10^{-6}}{2{,}5} = 7{,}2 \\times 10^{-7}$ m $= 720$ nm. On vérifie : $\\frac{\\delta}{\\lambda} = \\frac{720}{480} = 1{,}5 = \\frac{3}{2}$. Donc $\\delta = \\frac{3}{2}\\lambda = (1 + \\frac{1}{2})\\lambda$, ce qui correspond à une interférence destructive ($k = 1$). Le point $P$ est sur une frange sombre.",
    "steps": [
      "Différence de marche : $\\delta = \\frac{ax}{D}$",
      "$\\delta = \\frac{0{,}5 \\times 10^{-3} \\times 3{,}6 \\times 10^{-3}}{2{,}5} = 7{,}2 \\times 10^{-7}$ m $= 720$ nm",
      "Rapport : $\\frac{\\delta}{\\lambda} = \\frac{720}{480} = 1{,}5$",
      "$\\delta = 1{,}5\\lambda = (1 + \\frac{1}{2})\\lambda$ → condition destructive",
      "Frange sombre : $\\delta = (k + \\frac{1}{2})\\lambda$ avec $k = 1$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 120' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='120' fill='#FAFAFA'/><rect x='30' y='15' width='340' height='90' rx='5' fill='#E8744F' opacity='0.08' stroke='#E8744F' stroke-width='1.5'/><text x='200' y='40' font-size='13' fill='#E8744F' text-anchor='middle' font-weight='bold'>Frange sombre (destructive)</text><text x='200' y='60' font-size='12' fill='#64748B' text-anchor='middle'>delta = 720 nm = 1,5 x 480 nm = (3/2).lambda</text><text x='200' y='80' font-size='12' fill='#64748B' text-anchor='middle'>Condition : delta = (k + 1/2).lambda avec k = 1</text><text x='200' y='98' font-size='11' fill='#E8744F' text-anchor='middle'>Les deux ondes arrivent en opposition de phase → amplitude nulle</text></svg>",
      "alt_text": "Résultat : frange sombre car delta = 3/2 lambda"
    }
  }$e$::jsonb,
  $h${"text_fr": "Calculez $\\delta = ax/D$, puis comparez $\\delta/\\lambda$ : si c'est un entier → constructive, si c'est un demi-entier → destructive."}$h$::jsonb,
  ARRAY['ondes', 'young', 'interferences', 'constructive_destructive', 'bac_2024']
);

-- 906: Diffraction lumière monochromatique — largeur tache centrale — numeric (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000906',
  '33333333-0000-0000-0000-000000000028',
  'numeric',
  5,
  'fr',
  $q${
    "stem": "On éclaire une fente de largeur $a = 80$ $\\mu$m avec une lumière monochromatique de longueur d'onde $\\lambda = 480$ nm. L'écran d'observation est placé à $D = 1{,}5$ m de la fente. Calculer la largeur $L$ de la tache centrale de diffraction (en mm).",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='#FAFAFA'/><text x='200' y='20' font-size='13' fill='#64748B' text-anchor='middle' font-weight='bold'>Figure de diffraction par une fente</text><rect x='30' y='40' width='340' height='170' rx='5' fill='#FAFAFA' stroke='#64748B' stroke-width='1'/><line x1='200' y1='45' x2='200' y2='205' stroke='#64748B' stroke-width='1' stroke-dasharray='3,3'/><rect x='155' y='50' width='90' height='150' fill='#4A90D9' opacity='0.5' rx='3'/><rect x='145' y='70' width='6' height='110' fill='#4A90D9' opacity='0.2'/><rect x='249' y='70' width='6' height='110' fill='#4A90D9' opacity='0.2'/><rect x='135' y='90' width='5' height='70' fill='#4A90D9' opacity='0.1'/><rect x='260' y='90' width='5' height='70' fill='#4A90D9' opacity='0.1'/><rect x='120' y='100' width='5' height='50' fill='#4A90D9' opacity='0.05'/><rect x='275' y='100' width='5' height='50' fill='#4A90D9' opacity='0.05'/><path d='M 120 125 L 135 125 L 145 70 L 155 50 L 200 45 L 245 50 L 255 70 L 265 125 L 280 125' stroke='#E8744F' stroke-width='2' fill='none'/><text x='200' y='230' font-size='12' fill='#E8744F' text-anchor='middle'>Profil d''intensite</text><line x1='155' y1='215' x2='245' y2='215' stroke='#10B981' stroke-width='2'/><line x1='155' y1='210' x2='155' y2='220' stroke='#10B981' stroke-width='1.5'/><line x1='245' y1='210' x2='245' y2='220' stroke='#10B981' stroke-width='1.5'/><text x='200' y='243' font-size='12' fill='#10B981' text-anchor='middle' font-weight='bold'>L = ?</text></svg>",
      "alt_text": "Figure de diffraction par une fente : tache centrale lumineuse bordée de taches secondaires, avec le profil d'intensité et la largeur L à déterminer"
    },
    "correct_value": 18.0,
    "tolerance": 0.2
  }$q$::jsonb,
  $e${
    "text_fr": "La largeur de la tache centrale de diffraction est $L = \\frac{2\\lambda D}{a}$. Avec $\\lambda = 480 \\times 10^{-9}$ m, $D = 1{,}5$ m et $a = 80 \\times 10^{-6}$ m : $L = \\frac{2 \\times 480 \\times 10^{-9} \\times 1{,}5}{80 \\times 10^{-6}} = \\frac{1{,}44 \\times 10^{-6}}{8 \\times 10^{-5}} = 1{,}8 \\times 10^{-2}$ m $= 18{,}0$ mm.",
    "steps": [
      "Formule : $L = \\frac{2\\lambda D}{a}$",
      "Conversions : $\\lambda = 480$ nm $= 480 \\times 10^{-9}$ m ; $a = 80$ $\\mu$m $= 80 \\times 10^{-6}$ m",
      "$L = \\frac{2 \\times 480 \\times 10^{-9} \\times 1{,}5}{80 \\times 10^{-6}}$",
      "$L = \\frac{1{,}44 \\times 10^{-6}}{8 \\times 10^{-5}} = 1{,}8 \\times 10^{-2}$ m",
      "$L = 18{,}0$ mm"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 130' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='130' fill='#FAFAFA'/><text x='200' y='25' font-size='14' fill='#4A90D9' text-anchor='middle' font-weight='bold'>L = 2.lambda.D / a</text><text x='200' y='50' font-size='12' fill='#64748B' text-anchor='middle'>L = 2 x 480e-9 x 1,5 / 80e-6</text><text x='200' y='70' font-size='12' fill='#64748B' text-anchor='middle'>L = 1,44e-6 / 8e-5 = 0,018 m</text><rect x='140' y='85' width='120' height='30' rx='5' fill='#10B981' opacity='0.15' stroke='#10B981' stroke-width='1.5'/><text x='200' y='105' font-size='14' fill='#10B981' text-anchor='middle' font-weight='bold'>L = 18,0 mm</text></svg>",
      "alt_text": "Calcul détaillé : L = 18,0 mm"
    }
  }$e$::jsonb,
  $h${"text_fr": "Appliquez $L = 2\\lambda D / a$. Convertissez soigneusement : $\\mu$m → m et nm → m. La tache centrale est deux fois plus large que les taches secondaires."}$h$::jsonb,
  ARRAY['ondes', 'diffraction', 'tache_centrale', 'monochromatique', 'bac_2024']
);
