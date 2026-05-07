-- Engineering interactive lesson cards
-- Adds 1 interactive card per engineering skill (slugs 045-054)
-- Uses existing widget types: force_diagram, projectile, circuit
-- Safe to re-run: only appends if card count < 6.

-- =====================
-- 045: needs_analysis — Diagramme des forces (bête à cornes)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Bilan de forces sur un système",
      "body_fr": "En Sciences de l''Ingénieur, analyser le besoin commence par identifier les forces et interactions du système. Utilisez le simulateur ci-dessous pour visualiser le bilan des forces sur un mécanisme. Ajustez les intensités et directions pour comprendre comment chaque force contribue à l''équilibre ou au mouvement.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000045'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 046: sadt_fast — Diagramme fonctionnel interactif
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Flux d''énergie dans un système SADT",
      "body_fr": "Un diagramme SADT décompose un système en fonctions reliées par des flux (matière, énergie, information). Ce simulateur de forces illustre les interactions entre blocs fonctionnels — chaque flèche représente un échange. Observez comment modifier une entrée propage ses effets à travers le système.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000046'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 047: energy_supply — Circuit d''alimentation électrique
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Circuit d''alimentation et distribution",
      "body_fr": "La chaîne d''énergie commence par la source et passe par des convertisseurs et des transmetteurs. Ce simulateur de circuit modélise l''alimentation d''un actionneur électrique. Observez comment la tension, la résistance et le courant sont liés (loi d''Ohm), et comment la puissance dissipée varie selon les composants.",
      "widgetType": "circuit"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000047'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 048: energy_convert — Conversion mécanique (projectile)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Conversion énergie électrique → énergie cinétique",
      "body_fr": "Un moteur électrique convertit l''énergie électrique en énergie mécanique (rotation → translation). Ce simulateur illustre la conversion en suivant la trajectoire d''un objet propulsé par un mécanisme — angle de lancement, vitesse initiale et gravité reproduisent les lois de conservation d''énergie. Identifiez les pertes et le rendement $\\eta = E_{utile}/E_{fournie}$.",
      "widgetType": "projectile"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000048'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 049: sensors — Circuit de capteur et acquisition
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Circuit capteur-conditionneur",
      "body_fr": "Un capteur convertit une grandeur physique (température, pression, position) en signal électrique. Ce signal est ensuite conditionné (amplifié, filtré) avant l''acquisition. Le simulateur de circuit modélise un pont de Wheatstone — le déséquilibre du pont est proportionnel à la variation de la grandeur mesurée. Faites varier les résistances pour observer la sensibilité du capteur.",
      "widgetType": "circuit"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000049'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 050: grafcet — Séquence d''états et transitions
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Séquence d''actions et bilan des forces",
      "body_fr": "Un GRAFCET décrit des étapes (états) et des transitions (conditions). Chaque étape active des actions sur les actionneurs. Ce simulateur de forces illustre comment les actionneurs exercent des efforts successifs sur un objet en cours de déplacement — analogue au passage d''une étape GRAFCET à une autre. Observez comment la résultante des forces détermine le mouvement à chaque étape.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000050'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 051: statics — Principe Fondamental de la Statique (PFS)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Équilibre d''un solide (PFS)",
      "body_fr": "Le Principe Fondamental de la Statique affirme que pour un solide en équilibre, la somme vectorielle des forces est nulle ($\\sum \\vec{F} = \\vec{0}$) et la somme des moments aussi ($\\sum M = 0$). Manipulez les forces ci-dessous pour trouver la configuration d''équilibre. Observez comment la modification d''une force oblige les autres à s''adapter pour maintenir l''équilibre.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000051'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 052: kinematics_solids — Cinématique (trajectoire et vitesses)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Trajectoire d''un point d''un solide en mouvement",
      "body_fr": "En cinématique des solides, la trajectoire d''un point dépend du type de mouvement du solide (translation, rotation, mouvement plan). Ce simulateur illustre la trajectoire d''un point sous l''effet de la vitesse initiale et de l''accélération — analogue au mouvement de translation d''un solide avec accélération constante. Faites varier les paramètres et observez la trajectoire parabolique.",
      "widgetType": "projectile"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000052'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 053: rdm_traction — Traction/compression et diagramme des efforts
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Bilan des forces dans une barre en traction",
      "body_fr": "En résistance des matériaux, une barre soumise à deux forces de traction $F$ est en équilibre si $\\sigma = F/S$ (contrainte normale). Utilisez le simulateur pour visualiser le bilan complet des forces sur la barre. L''effort normal $N$ est constant dans toute la section. Modifiez les forces et observez comment l''équilibre est maintenu.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000053'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 054: rdm_flexion — Flexion simple et diagramme des moments
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Forces et réactions en flexion simple",
      "body_fr": "Une poutre en flexion est soumise à des charges transversales qui créent des efforts tranchants $T$ et des moments fléchissants $M_f$. Le simulateur illustre le bilan des forces sur une section de poutre — les réactions d''appui équilibrent les charges appliquées ($\\sum F = 0$, $\\sum M = 0$). La contrainte maximale est $\\sigma_{max} = M_f / W$ où $W$ est le module de résistance.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000054'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;
