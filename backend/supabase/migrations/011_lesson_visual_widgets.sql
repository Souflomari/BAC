-- Migration 011: Add widgetType to theory/intro lesson cards for visual richness
-- Updates card[0] (always the intro card) of each skill to show the relevant
-- interactive widget below the text explanation.
-- Safe to re-run: jsonb_set is idempotent.

-- ==========================================
-- MATH — Sequences (001-005) → sequence_viz
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"sequence_viz"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000001'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"sequence_viz"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000002'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"sequence_viz"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000003'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"sequence_viz"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000004'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"sequence_viz"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000005'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — Limits & Continuity (006-009) → function_graph
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000006'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000007'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000008'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000009'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — Derivatives (010-012) → derivative_graph
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"derivative_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000010'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"derivative_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000011'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"derivative_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000012'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — Integration (013-015) → area_curve
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"area_curve"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000013'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"area_curve"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000014'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"area_curve"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000015'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — Probability (016-018) → probability_tree
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"probability_tree"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000016'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"probability_tree"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000017'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"probability_tree"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000018'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — Complex numbers (019-021) → complex_plane
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"complex_plane"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000019'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"complex_plane"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000020'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"complex_plane"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000021'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- MATH — ODEs (022-023) → function_graph
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000022'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"function_graph"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000023'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- PHYSICS — Mechanics (024-026) → projectile
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"projectile"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000024'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"projectile"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000025'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"projectile"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000026'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- PHYSICS — Waves (027-028) → wave
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"wave"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000027'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"wave"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000028'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- PHYSICS — Circuits (029-030)
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"circuit"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000029'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"rlc"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000030'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- PHYSICS — Chemistry (031-032) → circuit
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"circuit"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000031'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"circuit"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000032'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- SVT — Cell bio / Energy (033-034) → cell_division
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"cell_division"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000033'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"cell_division"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000034'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- SVT — Molecular genetics (035-037) → dna_replication
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"dna_replication"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000035'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"dna_replication"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000036'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"dna_replication"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000037'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

-- ==========================================
-- SVT — Heredity / Genetics (038-039) → punnett_square
-- ==========================================
UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"punnett_square"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000038'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');

UPDATE public.skills SET lesson = jsonb_set(lesson, '{cards,0,widgetType}', '"punnett_square"'::jsonb)
WHERE id = '33333333-0000-0000-0000-000000000039'
  AND lesson->'cards'->0->>'type' NOT IN ('interactive');
