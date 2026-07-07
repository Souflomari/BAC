-- ============================================================================
-- BROUILLON 049 — états de misconception PAR NOTION (la jumelle de 043)
-- STATUT : DRAFT (docs/drafts/migrations/) — ne s'applique nulle part.
-- Spec : docs/design/LEARNER-MODEL-SPEC.md §1-§3. La table 043
-- (user_misconception_states, clé skills UUID) reste INTACTE — lane
-- héritage Flutter. Celle-ci porte le monde notion (clés TEXT contenu).
-- MÊMES règles dures : A/C/U est un contrat de LECTURE (aucune colonne
-- d'état) ; exhibited_count drapeau binaire sous plancher ; le RPC
-- enregistre des faits, ne classifie pas.
-- ============================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.user_notion_misconception_states (
  user_id              UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notion_id            TEXT NOT NULL,   -- "pc/rlc-serie"
  misconception_id     TEXT NOT NULL,   -- string key → items.yaml misconceptions[].id (précédent 043)
  exhibited_count      INT NOT NULL DEFAULT 0,
  first_exhibited_at   TIMESTAMPTZ,     -- posé à la première exhibition, jamais modifié
  last_exhibited_at    TIMESTAMPTZ,     -- avancé à chaque exhibition
  remediation_attempts INT NOT NULL DEFAULT 0,
  cleared_at           TIMESTAMPTZ,     -- posé par la logique de clearing (spec §3) ; ré-ouvert à NULL sur ré-exhibition
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, notion_id, misconception_id)
);
-- Divergence nommée vs 043 : `cleared_at` (pas `resolved_at`) — l'état lu
-- s'appelle Cleared ; le nom de colonne suit le contrat (ledger 14.2).

CREATE TRIGGER user_notion_misconception_states_updated_at
  BEFORE UPDATE ON public.user_notion_misconception_states
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.user_notion_misconception_states ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own notion misconception states"
  ON public.user_notion_misconception_states;
CREATE POLICY "users read own notion misconception states"
  ON public.user_notion_misconception_states FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
-- Pas d'INSERT/UPDATE client (043 en donnait ; ICI non — depuis 047 la
-- règle est : écritures par RPC service_role seulement ; on applique la
-- règle la plus récente, pas la plus ancienne).

CREATE INDEX IF NOT EXISTS idx_unms_user_active
  ON public.user_notion_misconception_states (user_id, notion_id)
  WHERE cleared_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_unms_user_last_exhibited
  ON public.user_notion_misconception_states (user_id, last_exhibited_at DESC)
  WHERE cleared_at IS NULL;

-- ── RPC — motif 047 (SECURITY DEFINER, service_role only), upsert atomique ──
CREATE OR REPLACE FUNCTION public.record_notion_misconception_exhibited(
  p_user_id UUID, p_notion_id TEXT, p_misconception_id TEXT
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_notion_misconception_states AS s
    (user_id, notion_id, misconception_id, exhibited_count, first_exhibited_at, last_exhibited_at)
  VALUES (p_user_id, p_notion_id, p_misconception_id, 1, NOW(), NOW())
  ON CONFLICT (user_id, notion_id, misconception_id) DO UPDATE SET
    exhibited_count      = s.exhibited_count + 1,
    last_exhibited_at    = NOW(),
    -- ré-exhibition après clearing : ré-ouverture + tentative comptée
    remediation_attempts = s.remediation_attempts + CASE WHEN s.cleared_at IS NOT NULL THEN 1 ELSE 0 END,
    cleared_at           = NULL;
END $$;

-- Clearing v1 (spec §3) : 2 succès distincts post-exhibition, sans
-- ré-exhibition entre eux. Le RPC reçoit le FAIT « clearing constaté »
-- calculé par l'edge function depuis le journal — il ne relit pas le
-- journal lui-même (écriture-ne-classifie-pas ; la classification vit
-- dans la couche de lecture qui appelle).
CREATE OR REPLACE FUNCTION public.record_notion_misconception_cleared(
  p_user_id UUID, p_notion_id TEXT, p_misconception_id TEXT
) RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.user_notion_misconception_states
     SET cleared_at = NOW()
   WHERE user_id = p_user_id AND notion_id = p_notion_id
     AND misconception_id = p_misconception_id AND cleared_at IS NULL;
END $$;

REVOKE EXECUTE ON FUNCTION public.record_notion_misconception_exhibited(UUID, TEXT, TEXT) FROM PUBLIC, authenticated, anon;
GRANT  EXECUTE ON FUNCTION public.record_notion_misconception_exhibited(UUID, TEXT, TEXT) TO service_role;
REVOKE EXECUTE ON FUNCTION public.record_notion_misconception_cleared(UUID, TEXT, TEXT) FROM PUBLIC, authenticated, anon;
GRANT  EXECUTE ON FUNCTION public.record_notion_misconception_cleared(UUID, TEXT, TEXT) TO service_role;

-- ── VERIFY — structure ET cardinalité, cast ADR 0007 ────────────────────────
DO $verify$
DECLARE n INT;
BEGIN
  SELECT COUNT(*) INTO n FROM pg_class c JOIN pg_namespace ns ON ns.oid = c.relnamespace
   WHERE ns.nspname = 'public' AND c.relname = 'user_notion_misconception_states' AND c.relrowsecurity;
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: RLS inactive sur user_notion_misconception_states'; END IF;

  SELECT COUNT(*) INTO n FROM pg_policies
   WHERE schemaname = 'public' AND tablename = 'user_notion_misconception_states'
     AND roles::text[] @> ARRAY['authenticated'];
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: attendu 1 policy authenticated (lecture seule), trouvé %', n; END IF;

  SELECT COUNT(*) INTO n FROM information_schema.routine_privileges
   WHERE routine_schema = 'public'
     AND routine_name IN ('record_notion_misconception_exhibited','record_notion_misconception_cleared')
     AND grantee IN ('PUBLIC','authenticated','anon') AND privilege_type = 'EXECUTE';
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: RPC exécutable par un rôle interdit (%)', n; END IF;

  -- la jumelle 043 est INTACTE (aucun effet de bord sur la lane héritage)
  SELECT COUNT(*) INTO n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'user_misconception_states';
  IF n < 10 THEN RAISE EXCEPTION 'VERIFY: user_misconception_states (043) altérée — % colonnes', n; END IF;

  SELECT COUNT(*) INTO n FROM public.user_notion_misconception_states;
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: table non vide à la création (%)', n; END IF;

  RAISE NOTICE 'VERIFY 049 OK : jumelle notion créée, 043 intacte, RPC service_role-only, post-état vide';
END $verify$;

COMMIT;

-- Reversal (manuel) :
--   DROP FUNCTION public.record_notion_misconception_cleared(UUID,TEXT,TEXT);
--   DROP FUNCTION public.record_notion_misconception_exhibited(UUID,TEXT,TEXT);
--   DROP TABLE public.user_notion_misconception_states;
