-- ============================================================================
-- 051 — bucket Storage `explications` (vidéos d'explication animée)
-- Contexte : ADR 0028 §6 laissait le stockage du fan-out explicitement
-- différé et sous arbitrage owner ; ADR 0029 tranche pour Supabase Storage.
-- Cette migration crée le bucket et sa politique d'accès, RIEN d'autre :
-- aucun objet n'est téléversé ici (c'est le rôle de
-- scripts/publish-explications.py, lui aussi sous porte humaine).
--
-- POSTURE DE SÉCURITÉ (CLAUDE.md — RLS dans la migration créatrice) :
--   · LECTURE  : publique. Ce sont des vidéos de cours destinées à être
--     vues par tout élève, connecté ou non ; les servir en public permet
--     au CDN de les mettre en cache et évite au site toute clé Supabase
--     pour la lecture (l'URL publique suffit).
--   · ÉCRITURE : service_role UNIQUEMENT. Aucune politique n'est créée
--     pour anon/authenticated — sous RLS, l'absence de politique VAUT
--     refus. service_role contourne RLS par nature et n'existe que côté
--     poste de publication ; elle n'atteint jamais Vercel.
--
-- IDEMPOTENT : ré-exécutable sans effet (ON CONFLICT + DROP POLICY IF EXISTS).
-- ============================================================================

BEGIN;

-- ── le bucket ───────────────────────────────────────────────────────────
-- `public = true` : les objets sont servis sur /object/public/<bucket>/…
-- sans jeton. file_size_limit à 200 Mo — une explication animée en 720p30
-- pèse ~10-30 Mo ; la borne est là pour qu'un envoi accidentel de rush
-- 4K échoue franchement au lieu de remplir le quota en silence.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'explications',
  'explications',
  TRUE,
  209715200,
  ARRAY['video/mp4', 'image/jpeg']
)
ON CONFLICT (id) DO UPDATE
  SET public             = EXCLUDED.public,
      file_size_limit    = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ── RLS sur storage.objects ─────────────────────────────────────────────
-- storage.objects porte déjà RLS activé par Supabase ; on l'affirme quand
-- même, pour que cette migration soit autoportante si elle est rejouée
-- sur un projet neuf.
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Lecture publique, bornée À CE BUCKET (jamais un SELECT global).
DROP POLICY IF EXISTS "explications: lecture publique" ON storage.objects;
CREATE POLICY "explications: lecture publique"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'explications');

-- Aucune politique INSERT/UPDATE/DELETE n'est créée : sous RLS, cela
-- interdit toute écriture à anon et authenticated. Seule service_role
-- (qui contourne RLS) peut publier. C'est l'état recherché — ne pas
-- "corriger" en ajoutant une politique d'écriture.

-- ── VERIFY — cardinalité, pas seulement structure (CLAUDE.md) ───────────
DO $verify$
DECLARE n INT;
BEGIN
  -- le bucket existe, et il est bien public
  SELECT COUNT(*) INTO n
    FROM storage.buckets WHERE id = 'explications' AND public IS TRUE;
  IF n <> 1 THEN
    RAISE EXCEPTION 'VERIFY 051: bucket explications public attendu 1, trouvé %', n;
  END IF;

  -- exactement UNE politique de lecture sur ce bucket
  SELECT COUNT(*) INTO n
    FROM pg_policies
   WHERE schemaname = 'storage' AND tablename = 'objects'
     AND policyname = 'explications: lecture publique' AND cmd = 'SELECT';
  IF n <> 1 THEN
    RAISE EXCEPTION 'VERIFY 051: politique de lecture attendue 1, trouvée %', n;
  END IF;

  -- ZÉRO politique d'écriture sur ce bucket : c'est l'assertion qui porte
  -- la posture de sécurité. Elle échouerait si quelqu'un ajoutait plus
  -- tard un INSERT/UPDATE/DELETE ouvert en le croyant anodin.
  -- NB : `qual` est NULL sur une politique INSERT (elle porte `with_check`)
  -- et `NULL LIKE …` vaut NULL, pas FALSE — d'où les COALESCE, sans quoi
  -- une politique INSERT ouverte échapperait au compte.
  SELECT COUNT(*) INTO n
    FROM pg_policies
   WHERE schemaname = 'storage'
     AND tablename  = 'objects'
     AND cmd IN ('INSERT', 'UPDATE', 'DELETE')
     AND (COALESCE(qual, '') LIKE '%explications%'
       OR COALESCE(with_check, '') LIKE '%explications%');
  IF n <> 0 THEN
    RAISE EXCEPTION 'VERIFY 051: % politique(s) d''écriture sur explications — attendu 0 (service_role seule publie)', n;
  END IF;

  -- RLS bien active sur storage.objects
  SELECT COUNT(*) INTO n
    FROM pg_class c JOIN pg_namespace ns ON ns.oid = c.relnamespace
   WHERE ns.nspname = 'storage' AND c.relname = 'objects' AND c.relrowsecurity IS TRUE;
  IF n <> 1 THEN
    RAISE EXCEPTION 'VERIFY 051: RLS inactive sur storage.objects';
  END IF;

  RAISE NOTICE 'VERIFY 051 OK : bucket public, 1 politique de lecture, 0 politique d''écriture, RLS active';
END $verify$;

COMMIT;

-- Reversal (manuel, session supervisée) :
--   DROP POLICY "explications: lecture publique" ON storage.objects;
--   DELETE FROM storage.objects WHERE bucket_id = 'explications';  -- vide d'abord
--   DELETE FROM storage.buckets WHERE id = 'explications';
