-- ============================================================
-- MATH INTERACTIVE QUESTIONS: Graph, Simulate, DragPoint types
-- For Baccalauréat Marocain - 2ème Bac Sciences Maths
-- ============================================================

-- =====================
-- GRAPH TYPE: Function Graph Questions
-- =====================

-- 900: Derivative from graph — users read slope from interactive graph
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000900',
  '33333333-0000-0000-0000-000000000011',  -- deriv_rules skill
  'graph',
  3,
  'fr',
  $q${
    "stem": "Soit $f(x) = x^2 - 4$. Utilisez le graphe interactif pour trouver la pente de la tangente en $x = 2$. Quelle est la valeur de $f'(2)$ ?",
    "latex": true,
    "graph_config": {
      "function": "x^2 - 4",
      "mode": "derivative",
      "x_min": -5,
      "x_max": 5,
      "y_min": -10,
      "y_max": 10,
      "show_tangent_at": 2
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Pour $f(x) = x^2 - 4$, la dérivée est $f'(x) = 2x$. Donc $f'(2) = 2(2) = 4$. Sur le graphe, la tangente en $x=2$ a une pente égale à 4."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez le curseur pour déplacer le point sur $x=2$ et lisez la pente affichée."}$h$::jsonb,
  ARRAY['derivee','tangente','graphe','interactive']
);

-- 901: Limit from graph — zoom in on limit point
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000901',
  '33333333-0000-0000-0000-000000000008',  -- limit_calc skill
  'graph',
  2,
  'fr',
  $q${
    "stem": "Soit $f(x) = \\frac{\\sin(x)}{x}$. Utilisez le graphe pour trouver $\\lim_{x \\to 0} f(x)$.",
    "latex": true,
    "graph_config": {
      "function": "sin(x)/x",
      "mode": "limit",
      "x_min": -10,
      "x_max": 10,
      "y_min": -1,
      "y_max": 1.5,
      "zoom_to": 0
    }
  }$q$::jsonb,
  $e${
    "text_fr": "La limite de $\\sin(x)/x$ quand $x \\to 0$ est une limite remarquable égale à 1. Vous pouvez le vérifier en zoomant sur $x=0$ dans le graphe interactif."
  }$e$::jsonb,
  $h${"text_fr": "Zoomez sur le point $x=0$ et observez la valeur de $f(x)$."}$h$::jsonb,
  ARRAY['limite','sinus','graphe','interactive']
);

-- 902: Complex number — module from Argand diagram
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000902',
  '33333333-0000-0000-0000-000000000019',  -- complex_basics skill
  'graph',
  2,
  'fr',
  $q${
    "stem": "Placez le point $z = 3 + 4i$ sur le diagramme d'Argand et trouvez son module $|z|$.",
    "latex": true,
    "graph_config": {
      "function": "complex",
      "mode": "complexPlane",
      "expected_re": 3,
      "expected_im": 4,
      "x_min": -10,
      "x_max": 10,
      "y_min": -10,
      "y_max": 10
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Le module d'un nombre complexe $z = a + bi$ est $|z| = \\sqrt{a^2 + b^2}$. Pour $z = 3 + 4i$ : $|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
  }$e$::jsonb,
  $h${"text_fr": "Placez le point en entrant Re(z) = 3 et Im(z) = 4, puis lisez le module affiché."}$h$::jsonb,
  ARRAY['complexes','module','argand','interactive']
);

-- =====================
-- DRAG POINT TYPE: Sequence Visualization
-- =====================

-- 903: Sequence convergence — animated sequence on number line
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000903',
  '33333333-0000-0000-0000-000000000007',  -- seq_convergence skill
  'dragPoint',
  3,
  'fr',
  $q${
    "stem": "Soit $(U_n)$ définie par $U_{n+1} = \\frac{U_n + 3}{2}$ avec $U_0 = 1$. Observez la convergence de la suite et trouvez sa limite.",
    "latex": true,
    "sim_config": {
      "sequence_type": "recursive",
      "recursive": "next = (current + 3) / 2",
      "initial": 1,
      "mode": "convergence"
    }
  }$q$::jsonb,
  $e${
    "text_fr": "La suite converge vers la solution de $L = (L + 3)/2$. En multipliant par 2 : $2L = L + 3$, donc $L = 3$. La limite est 3."
  }$e$::jsonb,
  $h${"text_fr": "Cliquez sur 'terme suivant' pour voir les termes de la suite converger vers 3."}$h$::jsonb,
  ARRAY['suites','convergence','recursive','interactive']
);

-- 904: Arithmetic sequence — find nth term
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000904',
  '33333333-0000-0000-0000-000000000006',  -- arithmetic_seq skill
  'dragPoint',
  2,
  'fr',
  $q${
    "stem": "Une suite arithmétique commence à $U_0 = 2$ avec une raison $r = 3$. Quel est $U_{10}$ ?",
    "latex": true,
    "sim_config": {
      "sequence_type": "arithmetic",
      "difference": 3,
      "initial": 2
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Pour une suite arithmétique : $U_n = U_0 + n \\times r$. Donc $U_{10} = 2 + 10 \\times 3 = 2 + 30 = 32$."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule $U_n = U_0 + n \\times r$ avec $n = 10$."}$h$::jsonb,
  ARRAY['suites','arithmetique','n_ieme_terme','interactive']
);

-- =====================
-- SIMULATE TYPE: Integration Area
-- =====================

-- 905: Definite integral — area under curve
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000905',
  '33333333-0000-0000-0000-000000000014',  -- definite_integral skill
  'graph',
  3,
  'fr',
  $q${
    "stem": "Calculez l'aire sous la courbe $f(x) = x^2$ entre $x = 0$ et $x = 3$.",
    "latex": true,
    "graph_config": {
      "function": "x^2",
      "mode": "integral",
      "x_min": 0,
      "x_max": 5,
      "y_min": 0,
      "y_max": 10,
      "a": 0,
      "b": 3
    }
  }$q$::jsonb,
  $e${
    "text_fr": "$\\int_0^3 x^2 \\, dx = \\left[ \\frac{x^3}{3} \\right]_0^3 = \\frac{27}{3} - 0 = 9$."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de la primitive : $\\int x^n dx = \\frac{x^{n+1}}{n+1}$."}$h$::jsonb,
  ARRAY['integration','aire','primitive','interactive']
);

-- 906: Geometric sequence — sum formula
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags)
VALUES (
  '44444444-0000-0000-0000-000000000906',
  '33333333-0000-0000-0000-000000000007',  -- geometric_seq skill
  'dragPoint',
  2,
  'fr',
  $q${
    "stem": "Une suite géométrique a $U_0 = 1$ et $q = 0.5$. Calculez $S_\\infty = U_0 + U_1 + U_2 + ...$",
    "latex": true,
    "sim_config": {
      "sequence_type": "geometric",
      "ratio": 0.5,
      "initial": 1
    }
  }$q$::jsonb,
  $e${
    "text_fr": "Pour une suite géométrique avec $|q| < 1$ : $S_\\infty = \\frac{U_0}{1 - q} = \\frac{1}{1 - 0.5} = 2$."
  }$e$::jsonb,
  $h${"text_fr": "Utilisez la formule de la somme infinie d'une suite géométrique : $S_\\infty = \\frac{U_0}{1-q}$."}$h$::jsonb,
  ARRAY['suites','geometrique','somme_infinie','interactive']
);
