-- ============================================================
-- Interactive lesson cards for Physics skills (Sciences Physiques PC)
-- Appends one 'interactive' card to each priority skill's lesson.
-- Safe to re-run: duplicate cards are not inserted.
-- ============================================================

-- 1. Cinématique (kinematics)
--    ProjectileSimulatorWidget: self-contained, uses internal defaults
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : tir parabolique",
    "body_fr": "Ajuste la vitesse initiale $v_0$ et l''angle $\\theta$ pour observer la trajectoire du projectile. Lis la portée $R$, la hauteur maximale $H$ et la durée de vol $T$.",
    "widget_type": "projectile",
    "config": {"initial_velocity": 20, "angle": 45, "height": 0}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000024'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 2. Lois de Newton (newtons_laws)
--    ForceDiagramWidget: self-contained
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : diagramme des forces",
    "body_fr": "Modifie la masse, l''angle du plan incliné et le coefficient de frottement. Observe l''équilibre des forces vectorielles et calcule l''accélération résultante.",
    "widget_type": "force_diagram",
    "config": {"type": "inclinedPlane"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000025'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 3. Propriétés des ondes (wave_properties)
--    WaveSimulatorWidget: self-contained
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : diffraction et interférences",
    "body_fr": "Modifie la longueur d''onde $\\lambda$ et l''espacement des fentes $d$ pour observer les franges d''interférence. Vérifie la relation $i = \\lambda L / d$.",
    "widget_type": "wave",
    "config": {"type": "doubleSlit"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000027'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 4. Circuits RC et RL (rc_rl_circuits)
--    CircuitSimulatorWidget: reads simConfig.type
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : charge d''un condensateur RC",
    "body_fr": "Modifie $R$ et $C$ pour voir comment la constante de temps $\\tau = RC$ change la vitesse de charge. À $t = \\tau$, le condensateur est chargé à 63 % de sa valeur finale.",
    "widget_type": "circuit",
    "config": {"type": "rcCircuit"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000029'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 5. Oscillations RLC (rlc_oscillations)
--    RLCSimulatorWidget: self-contained
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : oscillations RLC amorties",
    "body_fr": "Ajuste $R$, $L$ et $C$ pour passer du régime pseudo-périodique au régime critique. Observe la fréquence propre $\\omega_0 = 1/\\sqrt{LC}$ et l''amortissement.",
    "widget_type": "rlc",
    "config": {"type": "rlcCircuit"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000030'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );
