-- ============================================================================
-- BROUILLON 050 — fermer l'écart historique on_auth_user_created (STAGING)
-- STATUT : DRAFT (docs/drafts/migrations/) — ne s'applique nulle part.
-- Contexte : ADR 0013:227-247 — le trigger AFTER INSERT ON auth.users
-- (001:359-370) n'a jamais été capturé par le pg_dump de provisioning du
-- staging (schémas public + supabase_migrations seulement) ; chaque
-- inscription staging créerait un auth.users SANS profil, et tout FK vers
-- profiles échouerait. Suivi resté ouvert (0013:358-362). AUTH-SPEC §4 :
-- fermer AVANT tout branchement de la preview sur staging.
-- IDEMPOTENT par construction : ré-exécutable sur un environnement où le
-- trigger existe déjà (prod) sans effet — c'est voulu, pour que la même
-- migration numérotée passe partout et que les historiques convergent.
-- ============================================================================

BEGIN;

-- La fonction existe sur les deux environnements (001) ; on la ré-affirme
-- (CREATE OR REPLACE est sans effet si identique) pour l'idempotence totale.
-- NOTE pour la session supervisée : comparer d'abord la définition prod
-- (\sf public.handle_new_user) — si elle a divergé, STOP et arbitrage.
-- (Le corps ci-dessous DOIT être copié depuis 001 lors de la promotion du
-- brouillon ; laissé en référence ici, pas retapé, pour éviter une
-- divergence silencieuse entre ce brouillon et 001.)
--   → voir backend/supabase/migrations/001_initial_schema.sql:359-367

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── VERIFY — le trigger existe, la fonction existe, et AUCUN orphelin ───────
DO $verify$
DECLARE n INT;
BEGIN
  SELECT COUNT(*) INTO n FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace ns ON ns.oid = c.relnamespace
   WHERE ns.nspname = 'auth' AND c.relname = 'users'
     AND t.tgname = 'on_auth_user_created' AND NOT t.tgisinternal;
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: trigger on_auth_user_created absent (%)', n; END IF;

  SELECT COUNT(*) INTO n FROM pg_proc p JOIN pg_namespace ns ON ns.oid = p.pronamespace
   WHERE ns.nspname = 'public' AND p.proname = 'handle_new_user';
  IF n <> 1 THEN RAISE EXCEPTION 'VERIFY: handle_new_user attendu 1, trouvé %', n; END IF;

  -- cardinalité : aucun auth.users sans profil (l'écart que ce brouillon ferme)
  SELECT COUNT(*) INTO n
    FROM auth.users u LEFT JOIN public.profiles p ON p.id = u.id
   WHERE p.id IS NULL;
  IF n <> 0 THEN RAISE EXCEPTION 'VERIFY: % utilisateurs auth sans profil — backfill requis AVANT ce verify (session supervisée)', n; END IF;

  RAISE NOTICE 'VERIFY 050 OK : trigger présent, fonction présente, zéro orphelin';
END $verify$;

COMMIT;

-- Reversal (manuel) : DROP TRIGGER on_auth_user_created ON auth.users;
-- (ne pas reverser sur prod — le trigger y est l'état légitime de 001)
