-- ============================================================
-- Interactive lesson cards for Math skills (Sciences Maths SM-A/SM-B)
-- Appends one 'interactive' card to each priority skill's lesson.
-- Safe to re-run: duplicate cards are not inserted if lesson already has one.
-- ============================================================

-- Helper: only append if no interactive card exists yet for this skill.
-- Pattern: jsonb_set(existing_lesson, '{cards}', existing_cards || new_card)

-- 1. Suites arithmétiques (arithmetic_seq)
--    SequenceVisualizerWidget: reads sim_config.sequence_type / initial / difference
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : suites arithmétiques",
    "body_fr": "Modifie le premier terme $u_0$ et la raison $r$ pour observer l''évolution de la suite et visualiser la somme des premiers termes.",
    "widget_type": "sequence_viz",
    "config": {"sequence_type": "arithmetic", "initial": 2, "difference": 3}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000001'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 2. Suites géométriques (geometric_seq)
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : suites géométriques",
    "body_fr": "Modifie $u_0$ et la raison $q$ pour voir comment la suite converge, diverge ou alterne. Observe la somme partielle et sa limite.",
    "widget_type": "sequence_viz",
    "config": {"sequence_type": "geometric", "initial": 1, "ratio": 2}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000002'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 3. Notion de limite (limit_def)
--    FunctionGraphWidget: reads graph_config.function / x_min / x_max / y_min / y_max
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : visualiser une limite",
    "body_fr": "Déplace le curseur pour voir comment $f(x) = \\frac{\\sin(x)}{x}$ se comporte quand $x \\to 0$. Observe que la valeur approche 1 sans jamais y être définie.",
    "widget_type": "function_graph",
    "config": {"function": "sin(x)/x", "x_min": -10, "x_max": 10, "y_min": -0.5, "y_max": 1.5}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000006'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 4. Calcul de limites (limit_calc)
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : limite en ±∞",
    "body_fr": "Observe comment $f(x) = \\frac{3x^2 - x + 1}{2x^2 + 5}$ se comporte lorsque $x \\to \\pm\\infty$. La limite vaut $\\frac{3}{2}$ — l''asymptote horizontale.",
    "widget_type": "function_graph",
    "config": {"function": "(3*x*x-x+1)/(2*x*x+5)", "x_min": -30, "x_max": 30, "y_min": -1, "y_max": 3}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000007'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 5. Dérivées de base (deriv_basic)
--    DerivativeGraphWidget: reads sim_config.show_tangent_at / show_derivative
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : tangente et dérivée",
    "body_fr": "Déplace le point sur la courbe pour voir la tangente se déplacer. La pente de la tangente en $x = a$ est la valeur de la dérivée $f''(a)$.",
    "widget_type": "derivative_graph",
    "config": {"show_tangent_at": 1, "show_derivative": false}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000010'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 6. Règles de dérivation (deriv_rules)
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : fonction et sa dérivée",
    "body_fr": "Active «Afficher $f''$» pour superposer la courbe dérivée. Observe les zéros de $f''$ aux extrema de $f$, et le signe de $f''$ selon les variations.",
    "widget_type": "derivative_graph",
    "config": {"show_tangent_at": 0, "show_derivative": true}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000011'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 7. Intégrale définie (definite_integral)
--    AreaUnderCurveWidget: reads graph_config.function / x_min / x_max
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : intégrale et aire",
    "body_fr": "Déplace les bornes $a$ et $b$ pour voir comment l''aire sous la courbe $f(x) = x^2$ varie. La valeur numérique de l''intégrale s''affiche en temps réel.",
    "widget_type": "area_curve",
    "config": {"function": "x*x", "x_min": 0, "x_max": 3}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000014'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 8. Probabilités conditionnelles (conditional_prob)
--    ProbabilityTreeWidget: self-contained interactive tree
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : arbre de probabilité",
    "body_fr": "Modifie les probabilités sur chaque branche de l''arbre. Observe comment $P(A \\cap B) = P(A) \\times P(B|A)$ et comment la somme des feuilles vaut toujours 1.",
    "widget_type": "probability_tree",
    "config": {}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000017'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 9. Forme algébrique des complexes (complex_basics)
--    ComplexPlaneWidget: reads graph_config.expected_re / expected_im (initial point)
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : plan complexe",
    "body_fr": "Place le nombre complexe $z$ dans le plan d''Argand-Cauchy. Observe la partie réelle, imaginaire, le module $|z|$ et l''argument $\\arg(z)$ se mettre à jour en temps réel.",
    "widget_type": "complex_plane",
    "config": {"expected_re": 3, "expected_im": 4}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000019'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 10. Équations différentielles du 1er ordre (ode_first_order)
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : solution d''une EDO",
    "body_fr": "Visualise la solution $y(x) = e^{-x}\\cos(2x)$ de l''équation différentielle $y'' + 2y'' + 5y = 0$. Déplace le curseur pour lire les valeurs de $y$ et observer la décroissance amortie.",
    "widget_type": "function_graph",
    "config": {"function": "exp(-x)*cos(2*x)", "x_min": 0, "x_max": 6, "y_min": -1.2, "y_max": 1.2}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000022'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );
