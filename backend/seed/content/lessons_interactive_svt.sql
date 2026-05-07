-- ============================================================
-- Interactive lesson cards for SVT skills (Sciences de la Vie et de la Terre)
-- Appends one 'interactive' card to each priority skill's lesson.
-- Safe to re-run: duplicate cards are not inserted.
-- ============================================================

-- 1. Expression de l'information génétique (gene_expression)
--    DNAReplicationWidget: self-contained animation
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : transcription et traduction",
    "body_fr": "Observe étape par étape comment l''ADN est transcrit en ARNm, puis traduit en protéine par les ribosomes. Contrôle la vitesse de l''animation.",
    "widget_type": "dna_replication",
    "config": {"speed": 1, "show_labels": true}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000036'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 2. Hérédité liée aux autosomes (autosomal_heredity)
--    PunnettSquareWidget: self-contained grid
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : carré de Punnett",
    "body_fr": "Sélectionne les génotypes des deux parents pour construire le carré de Punnett. Lis les proportions phénotypiques attendues dans la descendance F1.",
    "widget_type": "punnett_square",
    "config": {"parent1": "Aa", "parent2": "Aa"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000038'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );

-- 3. Code génétique et mutations (mutations)
--    CellDivisionWidget: shows mitosis/meiosis phases
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb),
  '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[{
    "type": "interactive",
    "title_fr": "Explorer : division cellulaire",
    "body_fr": "Observe les phases de la mitose (ou méiose) étape par étape : prophase, métaphase, anaphase, télophase. Repère comment les chromosomes se séparent.",
    "widget_type": "cell_division",
    "config": {"mode": "mitosis"}
  }]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000037'
  AND NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(COALESCE(lesson->'cards','[]'::jsonb)) c
    WHERE c->>'type' = 'interactive'
  );
