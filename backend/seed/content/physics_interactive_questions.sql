-- ============================================================
-- PHYSICS INTERACTIVE QUESTIONS: Simulate types
-- For Baccalauréat Marocain - 2ème Bac Sciences Maths
-- ============================================================

-- =====================
-- MOTION SIMULATOR: Kinematics
-- =====================

-- 920: Constant velocity — position at given time
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000920',
  '33333333-0000-0000-0000-000000000024',  -- kinematics skill
  'simulate',
  2,
  'fr',
  $q${
    "stem": "Un mobile se déplace à vitesse constante $v_0 = 6$ m/s. Quelle est sa position après $t = 3$ secondes si $x_0 = 0$ ?",
    "latex": true,
    "sim_config": {
      "type": "kinematics",
      "scenario": "constantVelocity",
      "initial_position": 0,
      "initial_velocity": 6,
      "acceleration": 0,
      "target": {
        "variable": "position",
        "time": 3,
        "value": 18
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Pour un mouvement uniforme : $x(t) = x_0 + v \\times t = 0 + 6 \\times 3 = 18$ m."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez $x(t) = x_0 + v \\times t$ avec $x_0 = 0$, $v = 6$ m/s et $t = 3$ s."}$h$::jsonb,
  ARRAY['cinematique','mru','position','interactive']
);

-- 921: Free fall — time of fall
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000921',
  '33333333-0000-0000-0000-000000000024',  -- kinematics skill
  'simulate',
  2,
  'fr',
  $q${
    "stem": "Un objet est lâché sans vitesse initiale d'une hauteur $h = 20$ m. Combien de temps met-il pour atteindre le sol ? ($g = 10$ m/s²)",
    "latex": true,
    "sim_config": {
      "type": "freeFall",
      "scenario": "freeFall",
      "initial_position": 0,
      "initial_velocity": 0,
      "acceleration": -10,
      "target": {
        "variable": "time",
        "position": 0,
        "value": 2
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Pour une chute libre : $y = \\frac{1}{2}gt^2$. Donc $20 = \\frac{1}{2} \\times 10 \\times t^2 = 5t^2$. D'où $t = \\sqrt{4} = 2$ s."
  }$e$::jsonb,
  $h${"text_fr": "Lancez la simulation et observez le temps nécessaire pour que l'objet atteigne le sol."}$h$::jsonb,
  ARRAY['cinematique','chute_libre','temps','interactive']
);

-- 922: Constant acceleration — find initial velocity
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000922',
  '33333333-0000-0000-0000-000000000024',  -- kinematics skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Un mobile part du repos avec une accélération $a = 4$ m/s². Quelle vitesse initiale $v_0$ est nécessaire pour parcourir $x = 18$ m en $t = 3$ s ?",
    "latex": true,
    "sim_config": {
      "type": "kinematics",
      "scenario": "constantAcceleration",
      "initial_position": 0,
      "initial_velocity": 0,
      "acceleration": 4,
      "target": {
        "variable": "initial_velocity",
        "time": 3,
        "position": 18,
        "value": 6
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "$x = x_0 + v_0 t + \\frac{1}{2}at^2$. Donc $18 = 0 + v_0 \\times 3 + \\frac{1}{2} \\times 4 \\times 9 = 3v_0 + 18$. Donc $v_0 = 0$ m/s."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule $x = x_0 + v_0 t + \\frac{1}{2}at^2$ et isolez $v_0$."}$h$::jsonb,
  ARRAY['cinematique','mrua','vitesse_initiale','interactive']
);

-- =====================
-- FORCE DIAGRAM: Newton's Laws / Inclined Plane
-- =====================

-- 923: Inclined plane — find acceleration
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000923',
  '33333333-0000-0000-0000-000000000025',  -- newtons_laws skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Un bloc de masse $m = 5$ kg glisse sur un plan incliné à $\\alpha = 30°$ sans frottement. Quelle est son accélération ? ($g = 10$ m/s²)",
    "latex": true,
    "sim_config": {
      "type": "newtonsLaws",
      "scenario": "inclinedPlane",
      "mass": 5,
      "angle": 30,
      "friction": 0,
      "target": {
        "variable": "acceleration",
        "value": 5
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Sur un plan incliné sans frottement : $a = g \\sin(\\alpha) = 10 \\times \\sin(30°) = 10 \\times 0.5 = 5$ m/s²."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez le diagramme de forces pour voir que $a = g \\sin\\alpha$."}$h$::jsonb,
  ARRAY['mecanique','plan_incline','acceleration','interactive']
);

-- 924: Normal force on inclined plane
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000924',
  '33333333-0000-0000-0000-000000000025',  -- newtons_laws skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Un objet de masse $m = 8$ kg est sur un plan incliné à $\\alpha = 45°$. Quelle est la réaction normale $N$ du plan ?",
    "latex": true,
    "sim_config": {
      "type": "newtonsLaws",
      "scenario": "inclinedPlane",
      "mass": 8,
      "angle": 45,
      "friction": 0,
      "target": {
        "variable": "normal_force",
        "value": 56.57
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "La réaction normale est $N = mg \\cos(\\alpha) = 8 \\times 10 \\times \\cos(45°) = 80 \\times 0.707 = 56.6$ N."
  }$e$::jsonb,
  $h${"text_fr": "La composante perpendiculaire au plan est $N = mg \\cos\\alpha$."}$h$::jsonb,
  ARRAY['mecanique','plan_incline','force_normale','interactive']
);

-- =====================
-- CIRCUIT SIMULATOR: RC Circuit
-- =====================

-- 925: RC time constant — find resistance
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000925',
  '33333333-0000-0000-0000-000000000029',  -- rc_rl_circuits skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Un circuit RC a une capacité $C = 10$ μF. Quelle résistance $R$ faut-il pour avoir une constante de temps $\\tau = 0.1$ s ?",
    "latex": true,
    "sim_config": {
      "type": "rcCircuit",
      "scenario": "timeConstant",
      "resistance": 10000,
      "capacitance": 10e-6,
      "voltage": 5,
      "target": {
        "variable": "resistance",
        "tau": 0.1,
        "value": 10000
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "$\\tau = RC$. Donc $R = \\frac{\\tau}{C} = \\frac{0.1}{10 \\times 10^{-6}} = \\frac{0.1}{10^{-5}} = 10{,}000$ Ω = 10 kΩ."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez $\\tau = RC$ et isolez $R = \\tau/C$."}$h$::jsonb,
  ARRAY['electricite','circuit_rc','tau','interactive']
);

-- 926: Capacitor voltage at time t
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000926',
  '33333333-0000-0000-0000-000000000029',  -- rc_rl_circuits skill
  'simulate',
  2,
  'fr',
  $q${
    "stem": "Un condensateur de $C = 5$ μF se charge à travers $R = 20$ kΩ avec $E = 10$ V. Quelle est la tension aux bornes du condensateur après $t = \\tau$ ?",
    "latex": true,
    "sim_config": {
      "type": "rcCircuit",
      "scenario": "charging",
      "resistance": 20000,
      "capacitance": 5e-6,
      "voltage": 10,
      "target": {
        "variable": "voltage",
        "time": 0.1,
        "value": 6.32
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "$\\tau = RC = 20{,}000 \\times 5 \\times 10^{-6} = 0.1$ s. À $t = \\tau$ : $u_C = E(1 - e^{-1}) = 10 \\times 0.632 = 6.32$ V."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez $u_C(t) = E(1 - e^{-t/\\tau})$. À $t = \\tau$, $u_C = E(1 - e^{-1})$."}$h$::jsonb,
  ARRAY['electricite','condensateur','tension','interactive']
);

-- =====================
-- WAVE SIMULATOR: Double Slit Interference
-- =====================

-- 927: Interfringe calculation
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000927',
  '33333333-0000-0000-0000-000000000027',  -- wave_properties skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Dans l'expérience des fentes de Young, $\\lambda = 600$ nm, $a = 0.5$ mm et $D = 2$ m. Calculez l'interfrange $i$.",
    "latex": true,
    "sim_config": {
      "type": "doubleSlit",
      "scenario": "interfringe",
      "wavelength": 600e-9,
      "slit_separation": 0.5e-3,
      "screen_distance": 2,
      "target": {
        "variable": "interfringe",
        "value": 2.4
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "$i = \\frac{\\lambda D}{a} = \\frac{600 \\times 10^{-9} \\times 2}{0.5 \\times 10^{-3}} = \\frac{1.2 \\times 10^{-6}}{5 \\times 10^{-4}} = 2.4$ mm."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de l'interfrange : $i = \\frac{\\lambda D}{a}$."}$h$::jsonb,
  ARRAY['ondes','interference','interfrange','interactive']
);

-- 928: Wavelength for maximum
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000928',
  '33333333-0000-0000-0000-000000000027',  -- wave_properties skill
  'simulate',
  3,
  'fr',
  $q${
    "stem": "Dans l'expérience des fentes de Young avec $a = 0.3$ mm et $D = 1.5$ m, quelle longueur d'onde produit un maximum d'ordre 2 à $y = 3$ cm de l'axe central ?",
    "latex": true,
    "sim_config": {
      "type": "doubleSlit",
      "scenario": "wavelength",
      "slit_separation": 0.3e-3,
      "screen_distance": 1.5,
      "target": {
        "variable": "wavelength",
        "order": 2,
        "position": 0.03,
        "value": 600e-9
      }
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Condition de maximum : $y = \\frac{n \\lambda D}{a}$. Donc $\\lambda = \\frac{ya}{nD} = \\frac{0.03 \\times 0.3 \\times 10^{-3}}{2 \\times 1.5} = 600$ nm."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez $y = n\\lambda D / a$ et isolez $\\lambda$."}$h$::jsonb,
  ARRAY['ondes','diffraction','longueur_onde','interactive']
);
