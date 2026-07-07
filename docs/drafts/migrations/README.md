# BROUILLONS de migrations — NE S'APPLIQUENT JAMAIS D'ICI

Ce répertoire est HORS de `backend/supabase/migrations/` par construction :
rien ici ne peut être ramassé par `supabase db push` ni par branch-test.
Chaque fichier est un brouillon complet (discipline 040/043/046/047 :
RLS dans la migration créatrice, RPC d'écriture service_role-only,
verify block de cardinalité avec le cast `roles::text[]` d'ADR 0007).

Chemin de vie d'un brouillon : ruling propriétaire → session de
synchronisation supervisée (`docs/pipeline/production-sync-session.md`)
→ copie dans `backend/supabase/migrations/<numéro suivant>` → branch-test
sur staging → porte humaine → prod. Numéros indicatifs 048–050 :
le VRAI numéro se prend au moment de la copie (048 est le prochain libre
au 2026-07-07 ; ça peut changer).

Specs sources : `docs/design/LEARNER-MODEL-SPEC.md` (§2),
`docs/design/AUTH-SPEC.md` (§4 pour 050).
