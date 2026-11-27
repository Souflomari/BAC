-- ============================================================================
-- BROUILLON 048 — journal d'événements + pli de progression par notion
-- STATUT : DRAFT (docs/drafts/migrations/) — ne s'applique nulle part.
-- Spec : docs/design/LEARNER-MODEL-SPEC.md §2. Règles : ADR 0011/0013
-- (le chemin d'écriture ne classifie pas ; append-only), 040 (RLS dans la
-- migration créatrice), 047 (écritures service_role-only), 046 (verify de
-- cardinalité), 0007 (cast roles::text[]).
-- Clés TEXT vers le contenu (précédent 043 : misconception_id TEXT, string
-- key into content — PAS de FK vers un registre dupliqué du filesystem).
-- ============================================================================

BEGIN;

-- ── 1. Le journal append-only — la source de vérité ─────────────────────────
CREATE TABLE IF NOT EXISTS public.user_answer_events (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notion_id         TEXT NOT NULL,              -- "pc/rlc-serie" (clé contenu)
  item_id           TEXT NOT NULL,              -- id items.yaml / checkpoint / exercice
  kind              TEXT NOT NULL CHECK (kind IN ('item','checkpoint','exercise_reveal')),
  choice_index      INT,                        -- 0-based ; NULL pour exercise_reveal
  is_correct        BOOLEAN,                    -- NULL pour exercise_reveal
  misconception_id  TEXT,                       -- string key contenu ; NULL si distracteur non tagué
  chapter_index     INT,                        -- 0-based ; NULL si hors chapitre
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Append-only par déclaration : pas de trigger updated_at, pas d'UPDATE
-- policy, pas de RPC de mutation. Les événements se succèdent, jamais
-- ne se corrigent (LEARNER-MODEL-SPEC §2).

ALTER TABLE public.user_answer_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own answer events" ON public.user_answer_events;
CREATE POLICY "users read own answer events"
  ON public.user_answer_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
-- AUCUNE policy INSERT/UPDATE/DELETE pour authenticated : l'écriture passe
-- par le RPC service_role-only ci-dessous (règle 047). service_role écrit
-- via BYPASSRLS (rationale documentée en 043:53-61).

CREATE INDEX IF NOT EXISTS idx_uae_user_notion_created
  ON public.user_answer_events (user_id, notion_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uae_user_misconception
  ON public.user_answer_events (user_id, misconception_id, created_at DESC)
  WHERE misconception_id IS NOT NULL;

-- ── 2. Le pli matérialisé — toujours recalculable depuis le journal ─────────
CREATE TABLE IF NOT EXISTS public.user_notion_progress (
  user_id            UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notion_id          TEXT NOT NULL,
  chapters_visited   INT[] NOT NULL DEFAULT '{}',   -- indices 0-based, dédupliqués par le RPC
  chapters_total     INT,                            -- N au moment de la DERNIÈRE visite (le contenu peut grandir — l'état régresse honnêtement, spec §4)
  last_chapter_index INT,
  items_attempted    INT NOT NULL DEFAULT 0,
  items_correct      INT NOT NULL DEFAULT 0,
  first_visit_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_visit_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, notion_id)
);

CREATE TRIGGER user_notion_progress_updated_at
  BEFORE UPDATE ON public.user_notion_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.user_notion_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own notion progress" ON public.user_notion_progress;
CREATE POLICY "users read own notion progress"
  ON public.user_notion_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
-- Écritures : RPC service_role-only, comme ci-dessus.

CREATE INDEX IF NOT EXISTS idx_unp_user_last_visit
  ON public.user_notion_progress (user_id, last_visit_at DESC);

-- ── 3. Les RPC d'écriture (SECURITY DEFINER, service_role SEULEMENT) ────────
-- Enregistrent des FAITS ; ne classifient rien (ADR 0013:93-96).

CREATE OR REPLACE FUNCTION public.record_chapter_visit(
  p_user_id UUID, p_notion_id TEXT, p_chapter_index INT, p_chapters_total INT
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_notion_progress AS unp
    (user_id, notion_id, chapters_visited, chapters_total, last_chapter_index)
  VALUES (p_user_id, p_notion_id, ARRAY[p_chapter_index], p_chapters_total, p_chapter_index)
  ON CONFLICT (user_id, notion_id) DO UPDATE SET
    chapters_visited   = CASE WHEN unp.chapters_visited @> ARRAY[p_chapter_index]
                              THEN unp.chapters_visited
                              ELSE unp.chapters_visited || p_chapter_index END,
    chapters_total     = p_chapters_total,
    last_chapter_index = p_chapter_index,
    last_visit_at      = NOW();
END $$;

CREATE OR REPLACE FUNCTION public.record_answer_event(
  p_user_id UUID, p_notion_id TEXT, p_item_id TEXT, p_kind TEXT,
  p_choice_index INT, p_is_correct BOOLEAN, p_misconception_id TEXT,
  p_chapter_index INT
) RETURNS BIGINT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_event_id BIGINT;
BEGIN
  INSERT INTO public.user_answer_events
    (user_id, notion_id, item_id, kind, choice_index, is_correct, misconception_id, chapter_index)
  VALUES (p_user_id, p_notion_id, p_item_id, p_kind, p_choice_index, p_is_correct, p_misconception_id, p_chapter_index)
  RETURNING id INTO v_event_id;

  -- Le pli : compteurs de tentative/succès (item et checkpoint seulement)
  IF p_kind IN ('item','checkpoint') THEN
    INSERT INTO public.user_notion_progress AS unp
      (user_id, notion_id, items_attempted, items_correct)
    VALUES (p_user_id, p_notion_id, 1, CASE WHEN p_is_correct THEN 1 ELSE 0 END)
    ON CONFLICT (user_id, notion_id) DO UPDATE SET
      items_attempted = unp.items_attempted + 1,
      items_correct   = unp.items_correct + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
      last_visit_at   = NOW();
  END IF;

  RETURN v_event_id;
END $$;

REVOKE EXECUTE ON FUNCTION public.record_chapter_visit(UUID, TEXT, INT, INT) FROM PUBLIC, authenticated, anon;
GRANT  EXECUTE ON FUNCTION public.record_chapter_visit(UUID, TEXT, INT, INT) TO service_role;
REVOKE EXECUTE ON FUNCTION public.record_answer_event(UUID, TEXT, TEXT, TEXT, INT, BOOLEAN, TEXT, INT) FROM PUBLIC, authenticated, anon;
GRANT  EXECUTE ON FUNCTION public.record_answer_event(UUID, TEXT, TEXT, TEXT, INT, BOOLEAN, TEXT, INT) TO service_role;

-- ── 4. VERIFY — structure ET cardinalité (leçon 046), cast ADR 0007 ─────────
DO $verify$
DECLARE
  n INT;
BEGIN
  -- tables + RLS réellement active
  SELECT COUNT(*) INTO n FROM pg_class c JOIN pg_namespace ns ON ns.oid = c.relnamespace
   WHERE ns.nspname = 'public' AND c.relname IN ('user_answer_events','user_notion_progress')
     AND c.relrowsecurity;
  IF n <> 2 THEN RAISE EXCEPTION 'VERIFY: RLS active sur %/2 tables', n; END IF;

  -- exactement 1 policy (SELECT, authenticated) par table — pas d'écriture client
  SELECT COUNT(*) INTO n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'user_answer_events'
     AND roles::text[] @> ARRAY['authenticated'];
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: user_answer_events attend 1 policy authenticated, trouvé %', n; END IF;
  SELECT COUNT(*) INTO n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'user_notion_progress'
     AND roles::text[] @> ARRAY['authenticated'];
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: user_notion_progress attend 1 policy authenticated, trouvé %', n; END IF;

  -- les RPC existent et service_role est le SEUL exécutant non-propriétaire
  SELECT COUNT(*) INTO n FROM information_schema.routine_privileges
   WHERE routine_schema = 'public' AND routine_name = 'record_answer_event'
     AND grantee IN ('PUBLIC','authenticated','anon') AND privilege_type = 'EXECUTE';
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: record_answer_event exécutable par un rôle interdit (%)', n; END IF;
  SELECT COUNT(*) INTO n FROM information_schema.routine_privileges
   WHERE routine_schema = 'public' AND routine_name = 'record_chapter_visit'
     AND grantee IN ('PUBLIC','authenticated','anon') AND privilege_type = 'EXECUTE';
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: record_chapter_visit exécutable par un rôle interdit (%)', n; END IF;

  -- cardinalité de post-état : les deux tables sont VIDES à la création
  SELECT (SELECT COUNT(*) FROM public.user_answer_events)
       + (SELECT COUNT(*) FROM public.user_notion_progress) INTO n;
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: tables non vides à la création (%)', n; END IF;

  RAISE NOTICE 'VERIFY 048 OK : 2 tables RLS, 2 policies lecture-seule, 2 RPC service_role-only, post-état vide';
END $verify$;

COMMIT;

-- Reversal (manuel, jamais automatique) :
--   DROP FUNCTION public.record_answer_event(UUID,TEXT,TEXT,TEXT,INT,BOOLEAN,TEXT,INT);
--   DROP FUNCTION public.record_chapter_visit(UUID,TEXT,INT,INT);
--   DROP TABLE public.user_notion_progress;
--   DROP TABLE public.user_answer_events;
