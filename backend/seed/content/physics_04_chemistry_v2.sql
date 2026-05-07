-- ============================================================
-- PHYSICS CONTENT v2: Chimie (2 skills, 16 items)
-- Topic: Chimie — with SVG figures, hints, dollar-quoting
-- Skills:
--   acid_base  (33333333-...-031) — 8 items (2 mcq, 3 numeric, 1 true_false, 2 mcq)
--   redox      (33333333-...-032) — 8 items (3 mcq, 2 numeric, 1 true_false, 2 mcq)
-- Item IDs: 44444444-0000-0000-0000-000000000907 → 922
-- ============================================================

-- =====================
-- SKILL: acid_base (Réactions acido-basiques) — 8 items
-- =====================

-- Item 907: MCQ — Dosage pH-métrique, détermination du point d'équivalence (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000907',
  '33333333-0000-0000-0000-000000000031',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "On réalise le dosage pH-métrique d''une solution d''acide éthanoïque ($CH_3COOH$) de volume $V_A = 20{,}0\\,\\text{mL}$ par une solution d''hydroxyde de sodium ($NaOH$) de concentration $C_B = 0{,}10\\,\\text{mol}\\cdot\\text{L}^{-1}$. La courbe pH = f($V_B$) obtenue est représentée ci-dessous. Déterminer le volume $V_{BE}$ versé à l''équivalence.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect x='50' y='10' width='340' height='260' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='2'/><line x1='50' y1='270' x2='390' y2='270' stroke='#64748B' stroke-width='1.5'/><line x1='50' y1='10' x2='50' y2='270' stroke='#64748B' stroke-width='1.5'/><text x='30' y='275' fill='#64748B' font-size='9'>0</text><text x='200' y='295' fill='#64748B' font-size='11' text-anchor='middle'>V_B (mL)</text><text x='15' y='140' fill='#64748B' font-size='11' transform='rotate(-90 15 140)'>pH</text><text x='85' y='285' fill='#64748B' font-size='9'>5</text><text x='120' y='285' fill='#64748B' font-size='9'>10</text><text x='158' y='285' fill='#64748B' font-size='9'>15</text><text x='192' y='285' fill='#64748B' font-size='9'>20</text><text x='228' y='285' fill='#64748B' font-size='9'>25</text><text x='263' y='285' fill='#64748B' font-size='9'>30</text><text x='35' y='252' fill='#64748B' font-size='9'>2</text><text x='35' y='215' fill='#64748B' font-size='9'>4</text><text x='35' y='178' fill='#64748B' font-size='9'>6</text><text x='35' y='140' fill='#64748B' font-size='9'>8</text><text x='32' y='103' fill='#64748B' font-size='9'>10</text><text x='32' y='65' fill='#64748B' font-size='9'>12</text><text x='32' y='28' fill='#64748B' font-size='9'>14</text><g stroke='#e2e8f0' stroke-width='0.5'><line x1='85' y1='10' x2='85' y2='270'/><line x1='120' y1='10' x2='120' y2='270'/><line x1='158' y1='10' x2='158' y2='270'/><line x1='192' y1='10' x2='192' y2='270'/><line x1='228' y1='10' x2='228' y2='270'/><line x1='263' y1='10' x2='263' y2='270'/><line x1='50' y1='252' x2='390' y2='252'/><line x1='50' y1='215' x2='390' y2='215'/><line x1='50' y1='178' x2='390' y2='178'/><line x1='50' y1='140' x2='390' y2='140'/><line x1='50' y1='103' x2='390' y2='103'/><line x1='50' y1='65' x2='390' y2='65'/></g><path d='M50,243 L65,240 L85,237 L105,233 L120,229 L135,224 L150,218 L158,213 L165,205 L172,195 L178,175 L182,140 L185,105 L190,80 L195,70 L200,65 L210,58 L228,52 L250,48 L270,46 L290,44 L320,42 L350,41 L390,40' fill='none' stroke='#4A90D9' stroke-width='2.5'/><line x1='182' y1='270' x2='182' y2='140' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='5,3'/><line x1='50' y1='140' x2='182' y2='140' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='5,3'/><circle cx='182' cy='140' r='4' fill='#E8744F'/><text x='172' y='285' fill='#E8744F' font-size='10' font-weight='bold'>V_BE</text><text x='53' y='137' fill='#E8744F' font-size='9'>pH_E</text></svg>",
      "alt_text": "Courbe de dosage pH-métrique en S : pH en fonction du volume de NaOH versé, avec point d''équivalence marqué"
    },
    "choices": ["$V_{BE} = 19{,}0\\,\\text{mL}$", "$V_{BE} = 15{,}0\\,\\text{mL}$", "$V_{BE} = 20{,}0\\,\\text{mL}$", "$V_{BE} = 25{,}0\\,\\text{mL}$"],
    "correct_index": 2
  }$q$::jsonb,
  $e${
    "text_fr": "Le point d''équivalence correspond au point d''inflexion de la courbe pH = f($V_B$), là où la pente est maximale. Sur la courbe, ce saut de pH se produit autour de $V_{BE} = 20{,}0\\,\\text{mL}$. On peut vérifier : à l''équivalence, $n_A = n_B$, soit $C_A \\times V_A = C_B \\times V_{BE}$. Avec $V_{BE} = 20{,}0\\,\\text{mL}$ et $C_B = 0{,}10\\,\\text{mol}\\cdot\\text{L}^{-1}$, on obtient $C_A = 0{,}10 \\times 20{,}0 / 20{,}0 = 0{,}10\\,\\text{mol}\\cdot\\text{L}^{-1}$.",
    "steps": [
      "Repérer le point d''inflexion sur la courbe pH = f($V_B$) : c''est le point d''équivalence",
      "On peut utiliser la méthode des tangentes parallèles pour localiser précisément le point d''inflexion",
      "Lecture graphique : $V_{BE} \\approx 20{,}0\\,\\text{mL}$",
      "Vérification : $C_A = C_B \\times V_{BE} / V_A = 0{,}10 \\times 20{,}0 / 20{,}0 = 0{,}10\\,\\text{mol}\\cdot\\text{L}^{-1}$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 120' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='13'>Point d''équivalence = point d''inflexion</text><text x='20' y='50' fill='#64748B' font-size='13'>V_BE = 20,0 mL (lecture graphique)</text><text x='20' y='75' fill='#64748B' font-size='13'>Vérification : C_A × V_A = C_B × V_BE</text><text x='20' y='100' fill='#10B981' font-size='14' font-weight='bold'>C_A = 0,10 mol·L⁻¹ ✓</text></svg>",
      "alt_text": "Résumé : V_BE = 20,0 mL au point d''inflexion"
    }
  }$e$::jsonb,
  $h${"text_fr": "Le point d''équivalence correspond au point d''inflexion de la courbe, là où le saut de pH est le plus important. Utilisez la méthode des tangentes parallèles."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'dosage_pH_metrique', 'equivalence', 'bac_style']
);

-- Item 908: Numeric — pH d'une solution tampon (Henderson-Hasselbalch) (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000908',
  '33333333-0000-0000-0000-000000000031',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "On prépare une solution tampon en mélangeant $V_1 = 50{,}0\\,\\text{mL}$ d''une solution d''acide éthanoïque ($CH_3COOH$) de concentration $C_1 = 0{,}20\\,\\text{mol}\\cdot\\text{L}^{-1}$ avec $V_2 = 30{,}0\\,\\text{mL}$ d''une solution d''éthanoate de sodium ($CH_3COONa$) de concentration $C_2 = 0{,}20\\,\\text{mol}\\cdot\\text{L}^{-1}$. On donne $pK_a(CH_3COOH/CH_3COO^-) = 4{,}75$. Calculer le pH de cette solution tampon (arrondir au centième).",
    "latex": true,
    "correct_value": 4.53,
    "tolerance": 0.05
  }$q$::jsonb,
  $e${
    "text_fr": "On utilise la relation de Henderson-Hasselbalch : $pH = pK_a + \\log\\left(\\dfrac{[A^-]}{[HA]}\\right)$. Les quantités de matière sont $n_{HA} = C_1 \\times V_1 = 0{,}20 \\times 50{,}0 \\times 10^{-3} = 10{,}0 \\times 10^{-3}\\,\\text{mol}$ et $n_{A^-} = C_2 \\times V_2 = 0{,}20 \\times 30{,}0 \\times 10^{-3} = 6{,}0 \\times 10^{-3}\\,\\text{mol}$. Comme les deux espèces sont dans le même volume total, le rapport des concentrations est égal au rapport des quantités de matière : $pH = 4{,}75 + \\log(6{,}0/10{,}0) = 4{,}75 + \\log(0{,}60) = 4{,}75 + (-0{,}222) = 4{,}53$.",
    "steps": [
      "Calculer $n_{HA} = C_1 \\times V_1 = 0{,}20 \\times 50{,}0 \\times 10^{-3} = 10{,}0 \\times 10^{-3}\\,\\text{mol}$",
      "Calculer $n_{A^-} = C_2 \\times V_2 = 0{,}20 \\times 30{,}0 \\times 10^{-3} = 6{,}0 \\times 10^{-3}\\,\\text{mol}$",
      "Appliquer Henderson-Hasselbalch : $pH = pK_a + \\log\\left(\\dfrac{n_{A^-}}{n_{HA}}\\right)$",
      "$pH = 4{,}75 + \\log\\left(\\dfrac{6{,}0}{10{,}0}\\right) = 4{,}75 + \\log(0{,}60)$",
      "$pH = 4{,}75 + (-0{,}222) = 4{,}53$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 150' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='13'>Henderson-Hasselbalch :</text><text x='20' y='50' fill='#4A90D9' font-size='13'>pH = pKa + log([A⁻]/[HA])</text><text x='20' y='80' fill='#64748B' font-size='13'>n(HA) = 10,0 mmol ; n(A⁻) = 6,0 mmol</text><text x='20' y='105' fill='#64748B' font-size='13'>pH = 4,75 + log(6,0/10,0) = 4,75 − 0,222</text><text x='20' y='135' fill='#10B981' font-size='14' font-weight='bold'>pH = 4,53</text></svg>",
      "alt_text": "Calcul du pH par Henderson-Hasselbalch : pH = 4,53"
    }
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la relation de Henderson-Hasselbalch : pH = pKa + log([A⁻]/[HA]). Calculez d''abord les quantités de matière de l''acide et de sa base conjuguée."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'solution_tampon', 'henderson_hasselbalch', 'bac_style']
);

-- Item 909: True/False — Réaction acide fort / base forte (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000909',
  '33333333-0000-0000-0000-000000000031',
  'true_false',
  2,
  'fr',
  $q${
    "stem": "Lors de la réaction entre un acide fort (HCl) et une base forte (NaOH) en solution aqueuse, la réaction est totale et l''équation bilan s''écrit : $H_3O^+ + OH^- \\rightarrow 2H_2O$. La constante de cette réaction vaut $K = 10^{14}$ à 25 °C.",
    "latex": true,
    "correct_answer": true
  }$q$::jsonb,
  $e${
    "text_fr": "Vrai. L''acide chlorhydrique (HCl) est un acide fort : il se dissocie totalement dans l''eau en $H_3O^+$ et $Cl^-$. L''hydroxyde de sodium (NaOH) est une base forte : il se dissocie totalement en $Na^+$ et $OH^-$. La réaction entre $H_3O^+$ et $OH^-$ est : $H_3O^+ + OH^- \\rightarrow 2H_2O$. La constante de cette réaction est $K = 1/K_e = 1/10^{-14} = 10^{14}$, ce qui confirme que la réaction est quasi-totale.",
    "steps": [
      "HCl est un acide fort : $HCl + H_2O \\rightarrow H_3O^+ + Cl^-$ (réaction totale)",
      "NaOH est une base forte : $NaOH \\rightarrow Na^+ + OH^-$ (dissociation totale)",
      "Réaction bilan : $H_3O^+ + OH^- \\rightarrow 2H_2O$",
      "Constante : $K = \\dfrac{1}{K_e} = \\dfrac{1}{10^{-14}} = 10^{14} \\gg 1$ : réaction totale"
    ]
  }$e$::jsonb,
  $h${"text_fr": "La constante de la réaction entre H₃O⁺ et OH⁻ est liée au produit ionique de l''eau Ke. Rappelez-vous que K = 1/Ke."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'acide_fort', 'base_forte', 'reaction_totale', 'bac_style']
);

-- Item 910: Numeric — Détermination de Ka à partir du pH (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000910',
  '33333333-0000-0000-0000-000000000031',
  'numeric',
  3,
  'fr',
  $q${
    "stem": "On prépare une solution aqueuse d''acide benzoïque ($C_6H_5COOH$) de concentration $C = 1{,}0 \\times 10^{-2}\\,\\text{mol}\\cdot\\text{L}^{-1}$. La mesure du pH donne $pH = 3{,}1$. En déduire la valeur de la constante d''acidité $K_a$ du couple $C_6H_5COOH / C_6H_5COO^-$ (donner $K_a \\times 10^{5}$, arrondi au dixième).",
    "latex": true,
    "correct_value": 6.7,
    "tolerance": 0.3
  }$q$::jsonb,
  $e${
    "text_fr": "On a $[H_3O^+] = 10^{-pH} = 10^{-3{,}1} = 7{,}94 \\times 10^{-4}\\,\\text{mol}\\cdot\\text{L}^{-1}$. D''après le tableau d''avancement, $[C_6H_5COO^-] = [H_3O^+] = 7{,}94 \\times 10^{-4}$ et $[C_6H_5COOH] = C - [H_3O^+] = 1{,}0 \\times 10^{-2} - 7{,}94 \\times 10^{-4} = 9{,}21 \\times 10^{-3}$. La constante d''acidité est $K_a = \\dfrac{[C_6H_5COO^-][H_3O^+]}{[C_6H_5COOH]} = \\dfrac{(7{,}94 \\times 10^{-4})^2}{9{,}21 \\times 10^{-3}} = \\dfrac{6{,}30 \\times 10^{-7}}{9{,}21 \\times 10^{-3}} = 6{,}84 \\times 10^{-5}$. Donc $K_a \\times 10^5 \\approx 6{,}8$. (La valeur tabulée est $K_a = 6{,}3 \\times 10^{-5}$, cohérent.)",
    "steps": [
      "Calculer $[H_3O^+] = 10^{-pH} = 10^{-3{,}1} = 7{,}94 \\times 10^{-4}\\,\\text{mol}\\cdot\\text{L}^{-1}$",
      "Par stoechiométrie : $[C_6H_5COO^-] = [H_3O^+] = 7{,}94 \\times 10^{-4}$",
      "$[C_6H_5COOH] = C - [H_3O^+] = 1{,}0 \\times 10^{-2} - 7{,}94 \\times 10^{-4} = 9{,}21 \\times 10^{-3}$",
      "$K_a = \\dfrac{[H_3O^+][C_6H_5COO^-]}{[C_6H_5COOH]} = \\dfrac{(7{,}94 \\times 10^{-4})^2}{9{,}21 \\times 10^{-3}}$",
      "$K_a = 6{,}84 \\times 10^{-5}$, soit $K_a \\times 10^5 \\approx 6{,}8$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Commencez par calculer [H₃O⁺] = 10^(-pH). Puis utilisez le tableau d''avancement pour exprimer les concentrations à l''équilibre en fonction de [H₃O⁺] et C."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'Ka', 'acide_faible', 'bac_style']
);

-- Item 911: MCQ — Dosage conductimétrique, point d'équivalence (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000911',
  '33333333-0000-0000-0000-000000000031',
  'mcq',
  4,
  'fr',
  $q${
    "stem": "On dose une solution d''acide chlorhydrique ($HCl$) par une solution d''hydroxyde de sodium ($NaOH$) de concentration $C_B = 0{,}050\\,\\text{mol}\\cdot\\text{L}^{-1}$. Le suivi conductimétrique de ce dosage donne la courbe $\\sigma = f(V_B)$ ci-dessous. Déterminer le volume $V_{BE}$ à l''équivalence.",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 280' xmlns='http://www.w3.org/2000/svg'><rect x='50' y='10' width='340' height='240' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='2'/><line x1='50' y1='250' x2='390' y2='250' stroke='#64748B' stroke-width='1.5'/><line x1='50' y1='10' x2='50' y2='250' stroke='#64748B' stroke-width='1.5'/><text x='30' y='255' fill='#64748B' font-size='9'>0</text><text x='200' y='278' fill='#64748B' font-size='11' text-anchor='middle'>V_B (mL)</text><text x='12' y='130' fill='#64748B' font-size='10' transform='rotate(-90 12 130)'>σ (mS·cm⁻¹)</text><text x='100' y='268' fill='#64748B' font-size='9'>5</text><text x='150' y='268' fill='#64748B' font-size='9'>10</text><text x='200' y='268' fill='#64748B' font-size='9'>15</text><text x='250' y='268' fill='#64748B' font-size='9'>20</text><text x='300' y='268' fill='#64748B' font-size='9'>25</text><text x='350' y='268' fill='#64748B' font-size='9'>30</text><g stroke='#e2e8f0' stroke-width='0.5'><line x1='100' y1='10' x2='100' y2='250'/><line x1='150' y1='10' x2='150' y2='250'/><line x1='200' y1='10' x2='200' y2='250'/><line x1='250' y1='10' x2='250' y2='250'/><line x1='300' y1='10' x2='300' y2='250'/><line x1='350' y1='10' x2='350' y2='250'/></g><line x1='50' y1='30' x2='200' y2='220' stroke='#4A90D9' stroke-width='2.5'/><line x1='200' y1='220' x2='370' y2='150' stroke='#4A90D9' stroke-width='2.5'/><circle cx='200' cy='220' r='5' fill='none' stroke='#E8744F' stroke-width='2'/><line x1='200' y1='220' x2='200' y2='250' stroke='#E8744F' stroke-width='1.5' stroke-dasharray='5,3'/><text x='190' y='265' fill='#E8744F' font-size='11' font-weight='bold'>V_BE</text><text x='55' y='28' fill='#4A90D9' font-size='9'>σ élevée</text><text x='230' y='215' fill='#4A90D9' font-size='9'>σ croît lentement</text><text x='55' y='100' fill='#64748B' font-size='9' transform='rotate(-63 80 100)'>pente forte (H₃O⁺ remplacé)</text></svg>",
      "alt_text": "Courbe de conductimétrie : σ décroît fortement avant l''équivalence (remplacement de H₃O⁺ par Na⁺), puis croît faiblement après (excès de OH⁻)"
    },
    "choices": ["$V_{BE} = 15{,}0\\,\\text{mL}$", "$V_{BE} = 10{,}0\\,\\text{mL}$", "$V_{BE} = 20{,}0\\,\\text{mL}$", "$V_{BE} = 25{,}0\\,\\text{mL}$"],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "En dosage conductimétrique d''un acide fort par une base forte, la conductivité diminue avant l''équivalence car les ions $H_3O^+$ (très conducteurs, $\\lambda_{H_3O^+} = 349{,}8\\,\\text{S}\\cdot\\text{cm}^2\\cdot\\text{mol}^{-1}$) sont remplacés par les ions $Na^+$ (moins conducteurs, $\\lambda_{Na^+} = 50{,}1\\,\\text{S}\\cdot\\text{cm}^2\\cdot\\text{mol}^{-1}$). Après l''équivalence, la conductivité augmente car on ajoute un excès d''ions $Na^+$ et $OH^-$ (très conducteurs, $\\lambda_{OH^-} = 198{,}6\\,\\text{S}\\cdot\\text{cm}^2\\cdot\\text{mol}^{-1}$). Le point d''équivalence est à l''intersection des deux segments, soit $V_{BE} = 15{,}0\\,\\text{mL}$.",
    "steps": [
      "Avant l''équivalence : $\\sigma$ diminue car $H_3O^+$ (très conducteur) est consommé et remplacé par $Na^+$ (peu conducteur)",
      "Après l''équivalence : $\\sigma$ augmente car on ajoute un excès de $OH^-$ (très conducteur)",
      "Le point d''équivalence correspond au minimum de la courbe (changement de pente)",
      "Lecture graphique : $V_{BE} = 15{,}0\\,\\text{mL}$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='12'>Conductivités molaires ioniques :</text><text x='20' y='48' fill='#64748B' font-size='12'>λ(H₃O⁺) = 349,8   λ(Na⁺) = 50,1   λ(OH⁻) = 198,6</text><text x='20' y='70' fill='#64748B' font-size='12'>H₃O⁺ remplacé par Na⁺ → σ diminue fortement</text><text x='20' y='92' fill='#10B981' font-size='13' font-weight='bold'>V_BE = 15,0 mL (intersection des deux segments)</text></svg>",
      "alt_text": "Explication de la variation de conductivité et détermination de V_BE"
    }
  }$e$::jsonb,
  $h${"text_fr": "En conductimétrie, le point d''équivalence correspond au changement de pente (intersection des deux segments linéaires). Pensez aux conductivités molaires ioniques de H₃O⁺, Na⁺ et OH⁻."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'dosage_conductimetrique', 'equivalence', 'bac_style']
);

-- Item 912: MCQ — Couples acide-base conjugués (difficulty 2)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000912',
  '33333333-0000-0000-0000-000000000031',
  'mcq',
  2,
  'fr',
  $q${
    "stem": "Parmi les propositions suivantes, laquelle représente correctement deux couples acide/base conjugués intervenant dans la réaction : $NH_3 + H_2O \\rightleftharpoons NH_4^+ + OH^-$ ?",
    "latex": true,
    "choices": [
      "$NH_4^+/NH_3$ et $H_2O/OH^-$",
      "$NH_3/NH_4^+$ et $OH^-/H_2O$",
      "$NH_4^+/NH_3$ et $OH^-/H_2O$",
      "$NH_3/NH_2^-$ et $H_3O^+/H_2O$"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Dans la réaction $NH_3 + H_2O \\rightleftharpoons NH_4^+ + OH^-$ : $NH_3$ capte un proton $H^+$ de $H_2O$ pour former $NH_4^+$. Donc $NH_3$ est la base du couple $NH_4^+/NH_3$. $H_2O$ cède un proton pour former $OH^-$. Donc $H_2O$ est l''acide du couple $H_2O/OH^-$. Les deux couples sont bien $NH_4^+/NH_3$ et $H_2O/OH^-$. Rappel : dans un couple acide/base, on écrit toujours l''acide en premier.",
    "steps": [
      "$NH_3$ capte un proton → c''est la base du couple $NH_4^+/NH_3$",
      "$H_2O$ cède un proton → c''est l''acide du couple $H_2O/OH^-$",
      "Convention : couple acide/base = $HA/A^-$",
      "Les deux couples sont : $NH_4^+/NH_3$ et $H_2O/OH^-$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Identifiez quelle espèce cède un proton (acide) et laquelle capte un proton (base). Écrivez chaque couple sous la forme acide/base."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'couple_conjugue', 'bronsted', 'bac_style']
);

-- Item 913: Numeric — pH d'une solution d'acide faible (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000913',
  '33333333-0000-0000-0000-000000000031',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "On dissout de l''acide méthanoïque ($HCOOH$) dans l''eau pure pour obtenir une solution de concentration $C = 0{,}050\\,\\text{mol}\\cdot\\text{L}^{-1}$. On donne $K_a(HCOOH/HCOO^-) = 1{,}6 \\times 10^{-4}$. En supposant que l''autoprotolyse de l''eau est négligeable, calculer le pH de cette solution (arrondir au centième).",
    "latex": true,
    "correct_value": 2.55,
    "tolerance": 0.05,
    "figure": {
      "svg": "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='10' width='360' height='180' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><text x='200' y='35' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>Tableau d''avancement</text><line x1='20' y1='45' x2='380' y2='45' stroke='#64748B' stroke-width='1'/><line x1='20' y1='75' x2='380' y2='75' stroke='#64748B' stroke-width='1'/><line x1='20' y1='105' x2='380' y2='105' stroke='#64748B' stroke-width='1'/><line x1='80' y1='45' x2='80' y2='180' stroke='#64748B' stroke-width='0.5'/><line x1='170' y1='45' x2='170' y2='180' stroke='#64748B' stroke-width='0.5'/><line x1='230' y1='45' x2='230' y2='180' stroke='#64748B' stroke-width='0.5'/><line x1='300' y1='45' x2='300' y2='180' stroke='#64748B' stroke-width='0.5'/><text x='50' y='63' fill='#64748B' font-size='10' text-anchor='middle'>État</text><text x='125' y='63' fill='#4A90D9' font-size='10' text-anchor='middle'>HCOOH</text><text x='200' y='63' fill='#64748B' font-size='10' text-anchor='middle'>H₂O</text><text x='265' y='63' fill='#E8744F' font-size='10' text-anchor='middle'>HCOO⁻</text><text x='340' y='63' fill='#E8744F' font-size='10' text-anchor='middle'>H₃O⁺</text><text x='50' y='93' fill='#64748B' font-size='10' text-anchor='middle'>Initial</text><text x='125' y='93' fill='#64748B' font-size='10' text-anchor='middle'>C</text><text x='200' y='93' fill='#64748B' font-size='10' text-anchor='middle'>excès</text><text x='265' y='93' fill='#64748B' font-size='10' text-anchor='middle'>0</text><text x='340' y='93' fill='#64748B' font-size='10' text-anchor='middle'>≈ 0</text><text x='50' y='123' fill='#64748B' font-size='10' text-anchor='middle'>Équil.</text><text x='125' y='123' fill='#64748B' font-size='10' text-anchor='middle'>C − x</text><text x='200' y='123' fill='#64748B' font-size='10' text-anchor='middle'>excès</text><text x='265' y='123' fill='#10B981' font-size='10' text-anchor='middle'>x</text><text x='340' y='123' fill='#10B981' font-size='10' text-anchor='middle'>x</text><text x='200' y='155' fill='#4A90D9' font-size='11' text-anchor='middle'>Ka = x² / (C − x)</text><text x='200' y='175' fill='#64748B' font-size='10' text-anchor='middle'>x = [H₃O⁺] = 10^(−pH)</text></svg>",
      "alt_text": "Tableau d''avancement de la réaction de HCOOH avec H₂O"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "La réaction est $HCOOH + H_2O \\rightleftharpoons HCOO^- + H_3O^+$. On pose $x = [H_3O^+] = [HCOO^-]$ à l''équilibre. Alors $[HCOOH] = C - x$ et $K_a = \\dfrac{x^2}{C - x}$. On résout l''équation du second degré : $x^2 + K_a \\cdot x - K_a \\cdot C = 0$, soit $x^2 + 1{,}6 \\times 10^{-4} \\cdot x - 8{,}0 \\times 10^{-6} = 0$. Le discriminant est $\\Delta = (1{,}6 \\times 10^{-4})^2 + 4 \\times 8{,}0 \\times 10^{-6} = 2{,}56 \\times 10^{-8} + 3{,}2 \\times 10^{-5} = 3{,}203 \\times 10^{-5}$. Donc $x = \\dfrac{-1{,}6 \\times 10^{-4} + \\sqrt{3{,}203 \\times 10^{-5}}}{2} = \\dfrac{-1{,}6 \\times 10^{-4} + 5{,}66 \\times 10^{-3}}{2} = 2{,}75 \\times 10^{-3}$. Finalement $pH = -\\log(2{,}75 \\times 10^{-3}) = 2{,}56$.",
    "steps": [
      "Écrire la réaction : $HCOOH + H_2O \\rightleftharpoons HCOO^- + H_3O^+$",
      "Poser $x = [H_3O^+] = [HCOO^-]$ et $[HCOOH] = C - x$",
      "$K_a = x^2/(C - x)$ → $x^2 + K_a x - K_a C = 0$",
      "$\\Delta = K_a^2 + 4K_a C = (1{,}6 \\times 10^{-4})^2 + 4 \\times 1{,}6 \\times 10^{-4} \\times 0{,}050$",
      "$\\Delta = 3{,}203 \\times 10^{-5}$, $\\sqrt{\\Delta} = 5{,}66 \\times 10^{-3}$",
      "$x = (-K_a + \\sqrt{\\Delta})/2 = 2{,}75 \\times 10^{-3}$",
      "$pH = -\\log(2{,}75 \\times 10^{-3}) \\approx 2{,}56$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Écrivez l''expression de Ka en fonction de [H₃O⁺] et C, puis résolvez l''équation du second degré. Ne négligez pas x devant C si le taux d''avancement n''est pas très faible."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'pH_acide_faible', 'equilibre', 'bac_style']
);

-- Item 914: MCQ — Effet de la dilution sur le pH (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000914',
  '33333333-0000-0000-0000-000000000031',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "On dispose de deux solutions $S_1$ et $S_2$ d''acide éthanoïque ($CH_3COOH$). $S_1$ a une concentration $C_1 = 0{,}10\\,\\text{mol}\\cdot\\text{L}^{-1}$ et $S_2$ est obtenue par dilution 10 fois de $S_1$ ($C_2 = 0{,}010\\,\\text{mol}\\cdot\\text{L}^{-1}$). On donne $pK_a = 4{,}75$. Le diagramme ci-dessous compare les pH des deux solutions. Comment varie le pH lors de la dilution ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='10' width='340' height='200' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><text x='200' y='35' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>Comparaison des pH</text><line x1='50' y1='190' x2='350' y2='190' stroke='#64748B' stroke-width='1'/><rect x='100' y='90' width='60' height='100' fill='#4A90D9' fill-opacity='0.3' stroke='#4A90D9' stroke-width='2' rx='3'/><rect x='240' y='120' width='60' height='70' fill='#E8744F' fill-opacity='0.3' stroke='#E8744F' stroke-width='2' rx='3'/><text x='130' y='85' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>pH₁ = 2,88</text><text x='270' y='115' fill='#E8744F' font-size='13' text-anchor='middle' font-weight='bold'>pH₂ = 3,38</text><text x='130' y='205' fill='#64748B' font-size='11' text-anchor='middle'>S₁ (C₁)</text><text x='270' y='205' fill='#64748B' font-size='11' text-anchor='middle'>S₂ (C₂ = C₁/10)</text><path d='M170 140 L195 130 L220 140' fill='none' stroke='#10B981' stroke-width='2'/><text x='195' y='125' fill='#10B981' font-size='11' text-anchor='middle'>+0,50</text></svg>",
      "alt_text": "Diagramme en barres comparant pH₁ = 2,88 pour C₁ et pH₂ = 3,38 pour C₂ = C₁/10"
    },
    "choices": [
      "Le pH augmente de moins d''une unité (ici +0,50) car l''acide est faible",
      "Le pH augmente exactement d''une unité car la concentration est divisée par 10",
      "Le pH diminue lors de la dilution",
      "Le pH ne change pas car c''est le même acide"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Pour un acide faible, la dilution augmente le pH mais de moins d''une unité pour une dilution par 10. En effet, la dilution déplace l''équilibre dans le sens de la dissociation (loi de Le Chatelier). Pour un acide fort, $pH = -\\log C$, et diviser $C$ par 10 augmenterait le pH d''exactement 1 unité. Mais pour un acide faible, le taux d''avancement $\\tau$ augmente avec la dilution, compensant partiellement la diminution de concentration. Ici, $pH_1 = 2{,}88$ et $pH_2 = 3{,}38$, soit une augmentation de $0{,}50$ unité seulement (et non 1 unité).",
    "steps": [
      "Acide fort : dilution ×10 → pH augmente de 1 exactement",
      "Acide faible : dilution ×10 → pH augmente de moins de 1",
      "Raison : la dilution favorise la dissociation (Le Chatelier)",
      "Le taux d''avancement $\\tau$ augmente, compensant partiellement l''effet de dilution",
      "Ici : $\\Delta pH = pH_2 - pH_1 = 3{,}38 - 2{,}88 = 0{,}50 < 1$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Comparez le comportement d''un acide fort et d''un acide faible lors d''une dilution. Pour un acide fort, pH = -log(C). Pour un acide faible, le taux de dissociation augmente avec la dilution."}$h$::jsonb,
  ARRAY['chimie', 'acido_basique', 'dilution', 'pH', 'le_chatelier', 'bac_style']
);

-- =====================
-- SKILL: redox (Réactions d'oxydoréduction) — 8 items
-- =====================

-- Item 915: Numeric — Pile Daniell, calcul de la f.é.m. (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000915',
  '33333333-0000-0000-0000-000000000032',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "On réalise la pile Daniell schématisée ci-dessous. Les deux demi-piles contiennent des solutions de concentration $C = 1{,}0\\,\\text{mol}\\cdot\\text{L}^{-1}$. On donne les potentiels standard : $E^\\circ(Cu^{2+}/Cu) = +0{,}34\\,\\text{V}$ et $E^\\circ(Zn^{2+}/Zn) = -0{,}76\\,\\text{V}$. Calculer la force électromotrice (f.é.m.) de la pile dans les conditions standard (en V, arrondir au centième).",
    "latex": true,
    "correct_value": 1.10,
    "tolerance": 0.02,
    "figure": {
      "svg": "<svg viewBox='0 0 400 280' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='260' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><rect x='40' y='120' width='130' height='130' fill='#4A90D9' fill-opacity='0.1' stroke='#4A90D9' stroke-width='1.5' rx='3'/><rect x='230' y='120' width='130' height='130' fill='#E8744F' fill-opacity='0.1' stroke='#E8744F' stroke-width='1.5' rx='3'/><rect x='85' y='80' width='20' height='100' fill='#64748B' rx='2'/><text x='95' y='75' fill='#64748B' font-size='11' text-anchor='middle' font-weight='bold'>Zn</text><rect x='285' y='80' width='20' height='100' fill='#E8744F' rx='2'/><text x='295' y='75' fill='#E8744F' font-size='11' text-anchor='middle' font-weight='bold'>Cu</text><text x='105' y='200' fill='#4A90D9' font-size='10' text-anchor='middle'>ZnSO₄</text><text x='105' y='215' fill='#4A90D9' font-size='9' text-anchor='middle'>1,0 mol·L⁻¹</text><text x='295' y='200' fill='#E8744F' font-size='10' text-anchor='middle'>CuSO₄</text><text x='295' y='215' fill='#E8744F' font-size='9' text-anchor='middle'>1,0 mol·L⁻¹</text><rect x='160' y='130' width='80' height='25' fill='#10B981' fill-opacity='0.2' stroke='#10B981' stroke-width='1.5' rx='10'/><text x='200' y='147' fill='#10B981' font-size='9' text-anchor='middle'>Pont salin</text><line x1='170' y1='143' x2='170' y2='160' stroke='#10B981' stroke-width='1'/><line x1='230' y1='143' x2='230' y2='160' stroke='#10B981' stroke-width='1'/><line x1='95' y1='80' x2='95' y2='40' stroke='#64748B' stroke-width='2'/><line x1='295' y1='80' x2='295' y2='40' stroke='#E8744F' stroke-width='2'/><line x1='95' y1='40' x2='295' y2='40' stroke='#64748B' stroke-width='1.5'/><path d='M180,35 L200,35' stroke='#10B981' stroke-width='2'/><path d='M185,32 L180,35 L185,38' fill='#10B981'/><text x='190' y='28' fill='#10B981' font-size='9' text-anchor='middle'>e⁻</text><text x='65' y='60' fill='#4A90D9' font-size='11' font-weight='bold'>Anode (−)</text><text x='310' y='60' fill='#E8744F' font-size='11' font-weight='bold'>Cathode (+)</text><text x='70' y='240' fill='#4A90D9' font-size='9'>Oxydation :</text><text x='70' y='252' fill='#4A90D9' font-size='8'>Zn → Zn²⁺ + 2e⁻</text><text x='260' y='240' fill='#E8744F' font-size='9'>Réduction :</text><text x='260' y='252' fill='#E8744F' font-size='8'>Cu²⁺ + 2e⁻ → Cu</text></svg>",
      "alt_text": "Schéma de la pile Daniell : anode en zinc (oxydation) à gauche, cathode en cuivre (réduction) à droite, pont salin au centre, flux d''électrons de l''anode vers la cathode"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "La f.é.m. d''une pile est $e = E^\\circ_{cathode} - E^\\circ_{anode}$. Le cuivre a le potentiel standard le plus élevé ($+0{,}34\\,\\text{V}$), donc il constitue la cathode (pôle +). Le zinc ($-0{,}76\\,\\text{V}$) constitue l''anode (pôle −). Donc $e = E^\\circ(Cu^{2+}/Cu) - E^\\circ(Zn^{2+}/Zn) = (+0{,}34) - (-0{,}76) = +1{,}10\\,\\text{V}$. Dans les conditions standard (concentrations de $1{,}0\\,\\text{mol}\\cdot\\text{L}^{-1}$), la f.é.m. est directement la différence des potentiels standard.",
    "steps": [
      "Identifier la cathode : électrode de potentiel le plus élevé → Cu ($E^\\circ = +0{,}34\\,\\text{V}$)",
      "Identifier l''anode : électrode de potentiel le plus bas → Zn ($E^\\circ = -0{,}76\\,\\text{V}$)",
      "$e = E^\\circ_{cathode} - E^\\circ_{anode}$",
      "$e = (+0{,}34) - (-0{,}76) = +1{,}10\\,\\text{V}$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='13'>f.é.m. = E°(cathode) − E°(anode)</text><text x='20' y='50' fill='#64748B' font-size='13'>e = (+0,34) − (−0,76) = 0,34 + 0,76</text><text x='20' y='80' fill='#10B981' font-size='15' font-weight='bold'>e = 1,10 V</text></svg>",
      "alt_text": "Calcul de la f.é.m. : e = 1,10 V"
    }
  }$e$::jsonb,
  $h${"text_fr": "La f.é.m. d''une pile est e = E°(cathode) − E°(anode). Identifiez d''abord la cathode (potentiel le plus élevé) et l''anode (potentiel le plus bas)."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'pile_daniell', 'fem', 'potentiel_standard', 'bac_style']
);

-- Item 916: MCQ — Notation conventionnelle d'une cellule électrochimique (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000916',
  '33333333-0000-0000-0000-000000000032',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "On considère une pile constituée d''une électrode de fer ($Fe$) plongeant dans une solution de $Fe^{2+}$ et d''une électrode d''argent ($Ag$) plongeant dans une solution de $Ag^+$. On donne $E^\\circ(Fe^{2+}/Fe) = -0{,}44\\,\\text{V}$ et $E^\\circ(Ag^+/Ag) = +0{,}80\\,\\text{V}$. Quelle est la représentation conventionnelle correcte de cette pile ?",
    "latex": true,
    "choices": [
      "$Fe \\,|\\, Fe^{2+} \\,||\\, Ag^+ \\,|\\, Ag$",
      "$Ag \\,|\\, Ag^+ \\,||\\, Fe^{2+} \\,|\\, Fe$",
      "$Fe^{2+} \\,|\\, Fe \\,||\\, Ag \\,|\\, Ag^+$",
      "$Fe \\,|\\, Ag^+ \\,||\\, Fe^{2+} \\,|\\, Ag$"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Dans la notation conventionnelle d''une pile, on écrit l''anode (pôle −) à gauche et la cathode (pôle +) à droite. Le fer ($E^\\circ = -0{,}44\\,\\text{V}$) a le potentiel le plus bas : il s''oxyde, c''est l''anode. L''argent ($E^\\circ = +0{,}80\\,\\text{V}$) a le potentiel le plus élevé : il se réduit, c''est la cathode. La notation est : $Fe \\,|\\, Fe^{2+} \\,||\\, Ag^+ \\,|\\, Ag$. Le simple trait $|$ sépare les espèces d''une même demi-pile, le double trait $||$ représente le pont salin.",
    "steps": [
      "Identifier l''anode : $E^\\circ(Fe^{2+}/Fe) = -0{,}44\\,\\text{V}$ < $E^\\circ(Ag^+/Ag)$ → Fe est l''anode",
      "Identifier la cathode : $E^\\circ(Ag^+/Ag) = +0{,}80\\,\\text{V}$ → Ag est la cathode",
      "Convention : Anode | Solution_anode || Solution_cathode | Cathode",
      "Résultat : $Fe \\,|\\, Fe^{2+} \\,||\\, Ag^+ \\,|\\, Ag$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Dans la notation conventionnelle, l''anode (oxydation, potentiel le plus bas) est écrite à gauche, la cathode (réduction, potentiel le plus élevé) à droite. Le double trait || représente le pont salin."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'notation_pile', 'convention', 'bac_style']
);

-- Item 917: Numeric — Électrolyse du sulfate de cuivre, masse déposée (difficulty 4)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000917',
  '33333333-0000-0000-0000-000000000032',
  'numeric',
  4,
  'fr',
  $q${
    "stem": "On réalise l''électrolyse d''une solution de sulfate de cuivre ($CuSO_4$) avec des électrodes en graphite. Un courant d''intensité $I = 2{,}0\\,\\text{A}$ circule pendant $t = 30\\,\\text{min}$. Calculer la masse de cuivre déposée sur la cathode (en g, arrondir au centième). On donne : $M(Cu) = 63{,}5\\,\\text{g}\\cdot\\text{mol}^{-1}$, $F = 96\\,500\\,\\text{C}\\cdot\\text{mol}^{-1}$.",
    "latex": true,
    "correct_value": 1.18,
    "tolerance": 0.03,
    "figure": {
      "svg": "<svg viewBox='0 0 400 260' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='240' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><rect x='80' y='100' width='240' height='130' fill='#4A90D9' fill-opacity='0.08' stroke='#4A90D9' stroke-width='1.5' rx='3'/><text x='200' y='220' fill='#4A90D9' font-size='10' text-anchor='middle'>Solution CuSO₄</text><rect x='120' y='60' width='15' height='100' fill='#64748B' rx='1'/><text x='128' y='55' fill='#64748B' font-size='10' text-anchor='middle'>Graphite</text><text x='128' y='175' fill='#E8744F' font-size='9' text-anchor='middle'>Anode (+)</text><rect x='265' y='60' width='15' height='100' fill='#E8744F' rx='1'/><text x='273' y='55' fill='#E8744F' font-size='10' text-anchor='middle'>Graphite</text><text x='273' y='175' fill='#10B981' font-size='9' text-anchor='middle'>Cathode (−)</text><rect x='262' y='130' width='21' height='30' fill='#E8744F' fill-opacity='0.5' rx='1'/><text x='273' y='195' fill='#10B981' font-size='8' text-anchor='middle'>Cu déposé</text><line x1='128' y1='60' x2='128' y2='30' stroke='#64748B' stroke-width='2'/><line x1='273' y1='60' x2='273' y2='30' stroke='#E8744F' stroke-width='2'/><line x1='128' y1='30' x2='273' y2='30' stroke='#64748B' stroke-width='1.5'/><rect x='170' y='18' width='60' height='24' fill='none' stroke='#10B981' stroke-width='1.5' rx='3'/><text x='200' y='35' fill='#10B981' font-size='10' text-anchor='middle'>G</text><text x='155' y='25' fill='#10B981' font-size='9'>I = 2,0 A</text><path d='M200,45 L200,50 L210,50' stroke='#10B981' stroke-width='1'/><text x='140' y='130' fill='#64748B' font-size='8'>Oxydation</text><text x='140' y='142' fill='#64748B' font-size='7'>2H₂O → O₂ + 4H⁺ + 4e⁻</text><text x='285' y='130' fill='#E8744F' font-size='8'>Réduction</text><text x='285' y='142' fill='#E8744F' font-size='7'>Cu²⁺ + 2e⁻ → Cu</text></svg>",
      "alt_text": "Schéma d''électrolyse du CuSO₄ : générateur, anode en graphite (oxydation de l''eau), cathode en graphite (dépôt de cuivre)"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "À la cathode, la réduction est : $Cu^{2+} + 2e^- \\rightarrow Cu$. La charge totale transférée est $Q = I \\times t = 2{,}0 \\times 30 \\times 60 = 3\\,600\\,\\text{C}$. La quantité d''électrons est $n_{e^-} = Q/F = 3\\,600/96\\,500 = 3{,}73 \\times 10^{-2}\\,\\text{mol}$. D''après la stoechiométrie, $n_{Cu} = n_{e^-}/2 = 1{,}87 \\times 10^{-2}\\,\\text{mol}$. La masse de cuivre déposée est $m = n_{Cu} \\times M(Cu) = 1{,}87 \\times 10^{-2} \\times 63{,}5 = 1{,}18\\,\\text{g}$.",
    "steps": [
      "Réaction à la cathode : $Cu^{2+} + 2e^- \\rightarrow Cu$",
      "Charge : $Q = I \\times t = 2{,}0 \\times 30 \\times 60 = 3\\,600\\,\\text{C}$",
      "Quantité d''électrons : $n_{e^-} = Q/F = 3\\,600/96\\,500 = 3{,}73 \\times 10^{-2}\\,\\text{mol}$",
      "Stoechiométrie : $n_{Cu} = n_{e^-}/2 = 1{,}87 \\times 10^{-2}\\,\\text{mol}$",
      "Masse : $m = n_{Cu} \\times M = 1{,}87 \\times 10^{-2} \\times 63{,}5 = 1{,}18\\,\\text{g}$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez Q = I × t pour calculer la charge, puis n(e⁻) = Q/F pour la quantité d''électrons. La stoechiométrie de Cu²⁺ + 2e⁻ → Cu donne n(Cu) = n(e⁻)/2."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'electrolyse', 'cuivre', 'faraday', 'bac_style']
);

-- Item 918: True/False — Potentiels standard d'électrode (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000918',
  '33333333-0000-0000-0000-000000000032',
  'true_false',
  3,
  'fr',
  $q${
    "stem": "On considère les couples $Fe^{3+}/Fe^{2+}$ ($E^\\circ = +0{,}77\\,\\text{V}$) et $I_2/I^-$ ($E^\\circ = +0{,}54\\,\\text{V}$). L''ion $Fe^{3+}$ peut oxyder les ions $I^-$ en $I_2$ car $E^\\circ(Fe^{3+}/Fe^{2+}) > E^\\circ(I_2/I^-)$.",
    "latex": true,
    "correct_answer": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 180' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='10' width='360' height='160' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><text x='200' y='35' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>Échelle des potentiels standard</text><line x1='60' y1='90' x2='340' y2='90' stroke='#64748B' stroke-width='2'/><path d='M335,85 L345,90 L335,95' fill='#64748B'/><text x='350' y='95' fill='#64748B' font-size='10'>E° (V)</text><line x1='120' y1='80' x2='120' y2='100' stroke='#4A90D9' stroke-width='2'/><text x='120' y='75' fill='#4A90D9' font-size='10' text-anchor='middle'>0</text><line x1='230' y1='80' x2='230' y2='100' stroke='#E8744F' stroke-width='2'/><text x='230' y='75' fill='#E8744F' font-size='10' text-anchor='middle'>+0,54</text><text x='230' y='115' fill='#E8744F' font-size='9' text-anchor='middle'>I₂/I⁻</text><line x1='290' y1='80' x2='290' y2='100' stroke='#10B981' stroke-width='2'/><text x='290' y='75' fill='#10B981' font-size='10' text-anchor='middle'>+0,77</text><text x='290' y='115' fill='#10B981' font-size='9' text-anchor='middle'>Fe³⁺/Fe²⁺</text><text x='200' y='150' fill='#64748B' font-size='10' text-anchor='middle'>L''oxydant du couple de E° le plus élevé</text><text x='200' y='165' fill='#64748B' font-size='10' text-anchor='middle'>réagit avec le réducteur du couple de E° le plus bas</text></svg>",
      "alt_text": "Échelle des potentiels standard montrant I₂/I⁻ à +0,54 V et Fe³⁺/Fe²⁺ à +0,77 V"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Vrai. Selon la règle du gamma (ou règle de prévision), l''oxydant du couple de potentiel standard le plus élevé réagit spontanément avec le réducteur du couple de potentiel standard le plus bas. Ici, $Fe^{3+}$ (oxydant du couple $Fe^{3+}/Fe^{2+}$, $E^\\circ = +0{,}77\\,\\text{V}$) peut oxyder $I^-$ (réducteur du couple $I_2/I^-$, $E^\\circ = +0{,}54\\,\\text{V}$). La réaction est : $2Fe^{3+} + 2I^- \\rightarrow 2Fe^{2+} + I_2$.",
    "steps": [
      "Comparer les potentiels : $E^\\circ(Fe^{3+}/Fe^{2+}) = +0{,}77\\,\\text{V} > E^\\circ(I_2/I^-) = +0{,}54\\,\\text{V}$",
      "Règle du gamma : l''oxydant du couple de E° le plus élevé réagit avec le réducteur du couple de E° le plus bas",
      "$Fe^{3+}$ (oxydant) oxyde $I^-$ (réducteur)",
      "Réaction : $2Fe^{3+} + 2I^- \\rightarrow 2Fe^{2+} + I_2$"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la règle du gamma : l''oxydant du couple de potentiel le plus élevé réagit avec le réducteur du couple de potentiel le plus bas. Comparez E°(Fe³⁺/Fe²⁺) et E°(I₂/I⁻)."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'potentiel_standard', 'regle_gamma', 'bac_style']
);

-- Item 919: MCQ — Protection contre la corrosion (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000919',
  '33333333-0000-0000-0000-000000000032',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "Pour protéger une canalisation en fer contre la corrosion, on fixe un bloc de zinc sur le fer comme le montre le schéma ci-dessous. On donne : $E^\\circ(Fe^{2+}/Fe) = -0{,}44\\,\\text{V}$ et $E^\\circ(Zn^{2+}/Zn) = -0{,}76\\,\\text{V}$. Quelle affirmation est correcte ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 250' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='230' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><rect x='60' y='80' width='280' height='40' fill='#64748B' fill-opacity='0.4' stroke='#64748B' stroke-width='2' rx='3'/><text x='200' y='105' fill='#64748B' font-size='12' text-anchor='middle' font-weight='bold'>Fer (canalisation)</text><rect x='70' y='50' width='50' height='30' fill='#4A90D9' fill-opacity='0.4' stroke='#4A90D9' stroke-width='2' rx='2'/><text x='95' y='70' fill='#4A90D9' font-size='11' text-anchor='middle' font-weight='bold'>Zn</text><rect x='40' y='130' width='320' height='80' fill='#4A90D9' fill-opacity='0.05' stroke='#4A90D9' stroke-width='1' rx='2'/><text x='200' y='175' fill='#4A90D9' font-size='10' text-anchor='middle'>Sol humide (électrolyte)</text><path d='M95,50 L95,35 L140,35' stroke='#10B981' stroke-width='1.5'/><path d='M135,32 L143,35 L135,38' fill='#10B981'/><text x='120' y='28' fill='#10B981' font-size='9' text-anchor='middle'>e⁻</text><text x='95' y='225' fill='#4A90D9' font-size='10' text-anchor='middle'>Zn → Zn²⁺ + 2e⁻</text><text x='95' y='238' fill='#4A90D9' font-size='9' text-anchor='middle'>(oxydation)</text><text x='300' y='225' fill='#E8744F' font-size='10' text-anchor='middle'>Fe protégé</text><text x='300' y='238' fill='#E8744F' font-size='9' text-anchor='middle'>(pas d''oxydation)</text></svg>",
      "alt_text": "Schéma de protection cathodique : bloc de zinc fixé sur une canalisation en fer, le zinc s''oxyde préférentiellement"
    },
    "choices": [
      "Le zinc joue le rôle d''anode sacrificielle : il s''oxyde à la place du fer",
      "Le fer joue le rôle d''anode : il s''oxyde à la place du zinc",
      "Le zinc empêche la corrosion en formant une barrière physique étanche",
      "Le zinc et le fer s''oxydent simultanément et à la même vitesse"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Le zinc ($E^\\circ = -0{,}76\\,\\text{V}$) a un potentiel standard plus bas que le fer ($E^\\circ = -0{,}44\\,\\text{V}$). Lorsque les deux métaux sont en contact et en présence d''un électrolyte (sol humide), le zinc s''oxyde préférentiellement ($Zn \\rightarrow Zn^{2+} + 2e^-$). Le fer, recevant les électrons libérés par le zinc, est protégé contre l''oxydation. Le zinc joue le rôle d''anode sacrificielle : il se « sacrifie » pour protéger le fer. C''est le principe de la protection cathodique par anode sacrificielle.",
    "steps": [
      "Comparer : $E^\\circ(Zn^{2+}/Zn) = -0{,}76\\,\\text{V} < E^\\circ(Fe^{2+}/Fe) = -0{,}44\\,\\text{V}$",
      "Le zinc est un réducteur plus fort que le fer → il s''oxyde en premier",
      "Le zinc est l''anode sacrificielle : $Zn \\rightarrow Zn^{2+} + 2e^-$",
      "Les électrons libérés protègent le fer (cathode) contre l''oxydation",
      "C''est la protection cathodique par anode sacrificielle"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Comparez les potentiels standard de Zn et Fe. Le métal de potentiel le plus bas s''oxyde préférentiellement. C''est le principe de l''anode sacrificielle."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'corrosion', 'anode_sacrificielle', 'protection_cathodique', 'bac_style']
);

-- Item 920: Numeric — Application de l'équation de Nernst (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000920',
  '33333333-0000-0000-0000-000000000032',
  'numeric',
  5,
  'fr',
  $q${
    "stem": "On considère une pile constituée de deux demi-piles $Cu^{2+}/Cu$. La demi-pile de gauche contient une solution de $Cu^{2+}$ à la concentration $C_1 = 0{,}010\\,\\text{mol}\\cdot\\text{L}^{-1}$ et celle de droite à $C_2 = 1{,}0\\,\\text{mol}\\cdot\\text{L}^{-1}$. On donne $E^\\circ(Cu^{2+}/Cu) = +0{,}34\\,\\text{V}$. Calculer la f.é.m. de cette pile de concentration à $25\\,°C$ (en mV, arrondir à l''unité). On donne $\\dfrac{RT}{F}\\ln 10 = 0{,}059\\,\\text{V}$ à $25\\,°C$.",
    "latex": true,
    "correct_value": 59,
    "tolerance": 2,
    "figure": {
      "svg": "<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='180' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><rect x='40' y='60' width='140' height='110' fill='#4A90D9' fill-opacity='0.08' stroke='#4A90D9' stroke-width='1.5' rx='3'/><rect x='220' y='60' width='140' height='110' fill='#E8744F' fill-opacity='0.08' stroke='#E8744F' stroke-width='1.5' rx='3'/><rect x='95' y='40' width='12' height='80' fill='#E8744F' rx='1'/><text x='101' y='35' fill='#E8744F' font-size='9' text-anchor='middle'>Cu</text><rect x='283' y='40' width='12' height='80' fill='#E8744F' rx='1'/><text x='289' y='35' fill='#E8744F' font-size='9' text-anchor='middle'>Cu</text><text x='110' y='145' fill='#4A90D9' font-size='10' text-anchor='middle'>Cu²⁺</text><text x='110' y='160' fill='#4A90D9' font-size='9' text-anchor='middle'>C₁ = 0,010 mol/L</text><text x='290' y='145' fill='#E8744F' font-size='10' text-anchor='middle'>Cu²⁺</text><text x='290' y='160' fill='#E8744F' font-size='9' text-anchor='middle'>C₂ = 1,0 mol/L</text><rect x='170' y='70' width='60' height='20' fill='#10B981' fill-opacity='0.2' stroke='#10B981' stroke-width='1.5' rx='8'/><text x='200' y='84' fill='#10B981' font-size='8' text-anchor='middle'>Pont salin</text><text x='200' y='25' fill='#64748B' font-size='11' text-anchor='middle'>Pile de concentration</text></svg>",
      "alt_text": "Pile de concentration avec deux demi-piles Cu²⁺/Cu à concentrations différentes"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "L''équation de Nernst pour le couple $Cu^{2+}/Cu$ est $E = E^\\circ + \\dfrac{0{,}059}{n}\\log[Cu^{2+}]$ avec $n = 2$ électrons échangés. Pour la demi-pile droite (cathode) : $E_2 = 0{,}34 + \\dfrac{0{,}059}{2}\\log(1{,}0) = 0{,}34\\,\\text{V}$. Pour la demi-pile gauche (anode) : $E_1 = 0{,}34 + \\dfrac{0{,}059}{2}\\log(0{,}010) = 0{,}34 + \\dfrac{0{,}059}{2} \\times (-2) = 0{,}34 - 0{,}059 = 0{,}281\\,\\text{V}$. La f.é.m. est $e = E_2 - E_1 = 0{,}34 - 0{,}281 = 0{,}059\\,\\text{V} = 59\\,\\text{mV}$.",
    "steps": [
      "Équation de Nernst : $E = E^\\circ + \\dfrac{0{,}059}{n}\\log[Cu^{2+}]$ avec $n = 2$",
      "Cathode (droite) : $E_2 = 0{,}34 + \\dfrac{0{,}059}{2}\\log(1{,}0) = 0{,}34\\,\\text{V}$",
      "Anode (gauche) : $E_1 = 0{,}34 + \\dfrac{0{,}059}{2}\\log(0{,}010) = 0{,}34 - 0{,}059 = 0{,}281\\,\\text{V}$",
      "$e = E_2 - E_1 = 0{,}34 - 0{,}281 = 0{,}059\\,\\text{V} = 59\\,\\text{mV}$",
      "On retrouve : $e = \\dfrac{0{,}059}{2}\\log\\left(\\dfrac{C_2}{C_1}\\right) = \\dfrac{0{,}059}{2}\\log(100) = 0{,}059\\,\\text{V}$"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='13'>Nernst : E = E° + (0,059/n) × log[Cu²⁺]</text><text x='20' y='50' fill='#64748B' font-size='13'>e = (0,059/2) × log(C₂/C₁) = (0,059/2) × log(100)</text><text x='20' y='80' fill='#10B981' font-size='15' font-weight='bold'>e = 0,059 V = 59 mV</text></svg>",
      "alt_text": "Calcul par Nernst : e = 59 mV"
    }
  }$e$::jsonb,
  $h${"text_fr": "Appliquez l''équation de Nernst à chaque demi-pile : E = E° + (0,059/n) × log[Ox]. Puis calculez e = E(cathode) − E(anode). La cathode est la demi-pile de concentration la plus élevée."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'nernst', 'pile_concentration', 'bac_style']
);

-- Item 921: MCQ — Équilibrage d'une réaction d'oxydoréduction (difficulty 3)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000921',
  '33333333-0000-0000-0000-000000000032',
  'mcq',
  3,
  'fr',
  $q${
    "stem": "On fait réagir une solution acidifiée de permanganate de potassium ($MnO_4^-$) avec une solution de sulfate de fer II ($Fe^{2+}$). Les couples mis en jeu sont $MnO_4^-/Mn^{2+}$ et $Fe^{3+}/Fe^{2+}$. Quelle est l''équation bilan correctement équilibrée de cette réaction ?",
    "latex": true,
    "choices": [
      "$MnO_4^- + 8H^+ + 5Fe^{2+} \\rightarrow Mn^{2+} + 4H_2O + 5Fe^{3+}$",
      "$MnO_4^- + 4H^+ + 3Fe^{2+} \\rightarrow Mn^{2+} + 2H_2O + 3Fe^{3+}$",
      "$2MnO_4^- + 16H^+ + 5Fe^{2+} \\rightarrow 2Mn^{2+} + 8H_2O + 5Fe^{3+}$",
      "$MnO_4^- + 5H^+ + 5Fe^{2+} \\rightarrow Mn^{2+} + 5H_2O + 5Fe^{3+}$"
    ],
    "correct_index": 0,
    "figure": {
      "svg": "<svg viewBox='0 0 400 180' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='160' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><text x='200' y='35' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>Demi-équations électroniques</text><line x1='30' y1='45' x2='370' y2='45' stroke='#64748B' stroke-width='0.5'/><text x='30' y='75' fill='#E8744F' font-size='12'>Réduction :</text><text x='30' y='95' fill='#64748B' font-size='11'>MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O</text><line x1='30' y1='110' x2='370' y2='110' stroke='#64748B' stroke-width='0.5'/><text x='30' y='130' fill='#4A90D9' font-size='12'>Oxydation :</text><text x='30' y='150' fill='#64748B' font-size='11'>Fe²⁺ → Fe³⁺ + e⁻        (× 5)</text></svg>",
      "alt_text": "Demi-équations : réduction de MnO₄⁻ (gain de 5e⁻) et oxydation de Fe²⁺ (perte de 1e⁻, multipliée par 5)"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "On écrit les demi-équations électroniques. Réduction : $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$ (5 électrons gagnés). Oxydation : $Fe^{2+} \\rightarrow Fe^{3+} + e^-$ (1 électron perdu). Pour équilibrer les électrons, on multiplie l''oxydation par 5 : $5Fe^{2+} \\rightarrow 5Fe^{3+} + 5e^-$. L''équation bilan est : $MnO_4^- + 8H^+ + 5Fe^{2+} \\rightarrow Mn^{2+} + 4H_2O + 5Fe^{3+}$.",
    "steps": [
      "Demi-équation de réduction : $MnO_4^- + 8H^+ + 5e^- \\rightarrow Mn^{2+} + 4H_2O$",
      "Demi-équation d''oxydation : $Fe^{2+} \\rightarrow Fe^{3+} + e^-$",
      "Équilibrer les électrons : multiplier l''oxydation par 5",
      "Bilan : $MnO_4^- + 8H^+ + 5Fe^{2+} \\rightarrow Mn^{2+} + 4H_2O + 5Fe^{3+}$",
      "Vérification : conservation de la charge (2+ à gauche, 2+ à droite) et des atomes"
    ]
  }$e$::jsonb,
  $h${"text_fr": "Écrivez les deux demi-équations électroniques séparément, puis multipliez-les pour que le nombre d''électrons échangés soit le même. MnO₄⁻ gagne 5 électrons, Fe²⁺ en perd 1."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'equilibrage', 'permanganate', 'bac_style']
);

-- Item 922: MCQ — Principe de la pile à combustible (hydrogène) (difficulty 5)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000922',
  '33333333-0000-0000-0000-000000000032',
  'mcq',
  5,
  'fr',
  $q${
    "stem": "La pile à combustible à hydrogène représentée ci-dessous convertit directement l''énergie chimique en énergie électrique. On donne $E^\\circ(O_2/H_2O) = +1{,}23\\,\\text{V}$ et $E^\\circ(H^+/H_2) = 0{,}00\\,\\text{V}$. Quelle affirmation est correcte concernant le fonctionnement de cette pile ?",
    "latex": true,
    "figure": {
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='380' height='280' fill='#fafafa' stroke='#64748B' stroke-width='1' rx='4'/><text x='200' y='30' fill='#4A90D9' font-size='13' text-anchor='middle' font-weight='bold'>Pile à combustible H₂/O₂</text><rect x='70' y='70' width='30' height='160' fill='#64748B' fill-opacity='0.3' stroke='#64748B' stroke-width='2' rx='2'/><text x='85' y='155' fill='#64748B' font-size='9' text-anchor='middle' transform='rotate(-90 85 155)'>Anode</text><rect x='300' y='70' width='30' height='160' fill='#64748B' fill-opacity='0.3' stroke='#64748B' stroke-width='2' rx='2'/><text x='315' y='155' fill='#64748B' font-size='9' text-anchor='middle' transform='rotate(-90 315 155)'>Cathode</text><rect x='100' y='80' width='200' height='140' fill='#10B981' fill-opacity='0.05' stroke='#10B981' stroke-width='1' rx='3'/><text x='200' y='155' fill='#10B981' font-size='10' text-anchor='middle'>Électrolyte (membrane)</text><text x='200' y='170' fill='#10B981' font-size='9' text-anchor='middle'>échange de protons H⁺</text><text x='45' y='100' fill='#4A90D9' font-size='11' text-anchor='middle'>H₂</text><path d='M50,110 L65,110' stroke='#4A90D9' stroke-width='1.5'/><path d='M60,107 L68,110 L60,113' fill='#4A90D9'/><text x='355' y='100' fill='#E8744F' font-size='11' text-anchor='middle'>O₂</text><path d='M350,110 L335,110' stroke='#E8744F' stroke-width='1.5'/><path d='M340,107 L332,110 L340,113' fill='#E8744F'/><text x='45' y='210' fill='#64748B' font-size='8' text-anchor='middle'>H₂ →</text><text x='45' y='222' fill='#64748B' font-size='8' text-anchor='middle'>2H⁺ + 2e⁻</text><text x='355' y='210' fill='#64748B' font-size='8' text-anchor='middle'>O₂ + 4H⁺</text><text x='355' y='222' fill='#64748B' font-size='8' text-anchor='middle'>+ 4e⁻ → 2H₂O</text><line x1='85' y1='65' x2='85' y2='45' stroke='#64748B' stroke-width='2'/><line x1='315' y1='65' x2='315' y2='45' stroke='#E8744F' stroke-width='2'/><line x1='85' y1='45' x2='315' y2='45' stroke='#64748B' stroke-width='1.5'/><path d='M190,40 L210,40' stroke='#10B981' stroke-width='2'/><path d='M185,37 L180,40 L185,43' fill='#10B981'/><text x='200' y='38' fill='#10B981' font-size='9' text-anchor='middle'>e⁻</text><rect x='170' y='48' width='60' height='15' fill='none' stroke='#E8744F' stroke-width='1' rx='3'/><text x='200' y='59' fill='#E8744F' font-size='8' text-anchor='middle'>Charge</text><text x='355' y='245' fill='#4A90D9' font-size='9' text-anchor='middle'>H₂O</text><path d='M340,240 L355,250' stroke='#4A90D9' stroke-width='1'/><path d='M120,120 L140,120' stroke='#10B981' stroke-width='1'/><path d='M135,117 L143,120 L135,123' fill='#10B981'/><text x='150' y='118' fill='#10B981' font-size='8'>H⁺</text><text x='200' y='270' fill='#64748B' font-size='10' text-anchor='middle'>Bilan : 2H₂ + O₂ → 2H₂O</text><text x='200' y='285' fill='#64748B' font-size='9' text-anchor='middle'>e = E°(O₂/H₂O) − E°(H⁺/H₂) = 1,23 V</text></svg>",
      "alt_text": "Schéma de pile à combustible H₂/O₂ : H₂ oxydé à l''anode, O₂ réduit à la cathode, membrane échangeuse de protons, bilan 2H₂ + O₂ → 2H₂O"
    },
    "choices": [
      "Le dihydrogène est oxydé à l''anode ($H_2 \\rightarrow 2H^+ + 2e^-$) et le dioxygène est réduit à la cathode ($O_2 + 4H^+ + 4e^- \\rightarrow 2H_2O$). La f.é.m. standard vaut $1{,}23\\,\\text{V}$.",
      "Le dioxygène est oxydé à l''anode et le dihydrogène est réduit à la cathode",
      "Le dihydrogène est réduit à la cathode et la f.é.m. standard vaut $0{,}34\\,\\text{V}$",
      "La pile à combustible consomme de l''eau pour produire H₂ et O₂"
    ],
    "correct_index": 0
  }$q$::jsonb,
  $e${
    "text_fr": "Dans une pile à combustible H₂/O₂ à membrane échangeuse de protons (PEM) : À l''anode (pôle −), le dihydrogène est oxydé : $H_2 \\rightarrow 2H^+ + 2e^-$. À la cathode (pôle +), le dioxygène est réduit : $O_2 + 4H^+ + 4e^- \\rightarrow 2H_2O$. La réaction bilan est : $2H_2 + O_2 \\rightarrow 2H_2O$. La f.é.m. standard est $e = E^\\circ(O_2/H_2O) - E^\\circ(H^+/H_2) = 1{,}23 - 0{,}00 = 1{,}23\\,\\text{V}$. Le seul sous-produit est de l''eau, ce qui en fait une technologie propre.",
    "steps": [
      "Anode (oxydation) : $H_2 \\rightarrow 2H^+ + 2e^-$",
      "Cathode (réduction) : $O_2 + 4H^+ + 4e^- \\rightarrow 2H_2O$",
      "Bilan : $2H_2 + O_2 \\rightarrow 2H_2O$",
      "$e = E^\\circ(O_2/H_2O) - E^\\circ(H^+/H_2) = 1{,}23 - 0{,}00 = 1{,}23\\,\\text{V}$",
      "Avantage : seul sous-produit = eau (énergie propre)"
    ],
    "figure": {
      "svg": "<svg viewBox='0 0 400 120' xmlns='http://www.w3.org/2000/svg'><text x='20' y='25' fill='#4A90D9' font-size='12'>Anode : H₂ → 2H⁺ + 2e⁻ (oxydation)</text><text x='20' y='48' fill='#E8744F' font-size='12'>Cathode : O₂ + 4H⁺ + 4e⁻ → 2H₂O (réduction)</text><text x='20' y='73' fill='#64748B' font-size='12'>Bilan : 2H₂ + O₂ → 2H₂O</text><text x='20' y='100' fill='#10B981' font-size='14' font-weight='bold'>e = 1,23 V (f.é.m. standard)</text></svg>",
      "alt_text": "Résumé : demi-équations et f.é.m. de la pile à combustible"
    }
  }$e$::jsonb,
  $h${"text_fr": "Dans une pile à combustible, le combustible (H₂) est oxydé à l''anode et le comburant (O₂) est réduit à la cathode. Calculez la f.é.m. comme la différence des potentiels standard : e = E°(cathode) − E°(anode)."}$h$::jsonb,
  ARRAY['chimie', 'redox', 'pile_combustible', 'hydrogene', 'energie_propre', 'bac_style']
);
