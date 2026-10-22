# Session de synchronisation production — checklist supervisée (~30 min)

**Qui :** le propriétaire présent, en direct, du début à la fin (RULES §2 ;
CLAUDE.md non-négociable « production sync UNVERIFIED »). **Quoi :** des
LECTURES seulement — cette session ne modifie RIEN ; elle établit l'état
réel des deux projets et rend un verdict go/no-go pour la promotion des
brouillons 048–050. **Pré-requis :** CLI supabase authentifiée par le
propriétaire ; psql disponible (ADR 0005 v2) ; ce document ouvert.

Refs : prod `iwoydyudjondihzzsqay` · staging `bac-app-staging`
(`miscjaztsputtdalwcjp`) — ADR 0005:43-45.

---

## A. Prod — l'historique des migrations correspond-il au dépôt ? (~8 min)

1. `ls backend/supabase/migrations/*.sql` → noter la liste locale (001…047,
   + `_apply_002_to_006_idempotent.sql` hors séquence).
2. `supabase link --project-ref iwoydyudjondihzzsqay` puis
   `supabase migration list --linked` → chaque version distante doit
   correspondre 1:1 à un fichier local ; **aucune** version distante
   inconnue du dépôt ; **aucune** locale non appliquée (sauf décision
   explicite notée).
3. Contre-lecture SQL directe :
   `SELECT version FROM supabase_migrations.schema_migrations ORDER BY 1;`
4. ✅ vert si : bijection exacte. ⚠️ sinon : NOTER chaque écart (numéro,
   sens de l'écart) — un écart n'est pas forcément no-go, mais il doit être
   expliqué par écrit avant toute promotion.

## B. Prod — RLS et grants, vérification par échantillon (~7 min)

1. RLS réellement active (pas seulement des policies inertes — la leçon 040) :
   ```sql
   SELECT c.relname, c.relrowsecurity FROM pg_class c
     JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname='public' AND c.relname IN
     ('subjects','stream_subjects','topics','skills','skill_prerequisites',
      'items','badges','user_misconception_states','profiles');
   ```
   → tout `relrowsecurity = t`.
2. Policies (cast ADR 0007) :
   ```sql
   SELECT tablename, policyname, cmd, roles::text[] FROM pg_policies
    WHERE schemaname='public' AND tablename='user_misconception_states';
   ```
   → exactement 3 (SELECT/INSERT/UPDATE, authenticated, auth.uid()=user_id).
3. Le RPC 047 est bien service_role-only :
   ```sql
   SELECT grantee, privilege_type FROM information_schema.routine_privileges
    WHERE routine_name='record_misconception_exhibited';
   ```
   → aucun EXECUTE pour PUBLIC/authenticated/anon.
4. Baseline prérequis (042, ré-affirmée partout) :
   `SELECT COUNT(*) FROM public.skill_prerequisites;` → **201**.
5. Trigger auth (001:368) :
   ```sql
   SELECT tgname FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid
     JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='auth' AND c.relname='users' AND NOT t.tgisinternal;
   ```
   → `on_auth_user_created` présent.
6. Orphelins : `SELECT COUNT(*) FROM auth.users u LEFT JOIN public.profiles p
   ON p.id=u.id WHERE p.id IS NULL;` → **0** attendu sur prod.

## C. Staging — évaluation d'état, y compris l'écart historique (~8 min)

1. `supabase link --project-ref miscjaztsputtdalwcjp` (⚠️ re-lier prod à la
   fin — le piège documenté d'ADR 0005 : le lien reste sur le dernier projet).
2. `supabase migration list --linked` → écarts vs local NOTÉS (le staging a
   été provisionné par pg_dump partiel, ADR 0013 — attendre des écarts ;
   les lister, pas les « corriger » en séance).
3. **L'écart trigger** (la raison du brouillon 050) : requête B.5 sur
   staging → `on_auth_user_created` **attendu ABSENT** (confirme ADR
   0013:230-241). S'il est présent : mystère à élucider AVANT tout — qui
   l'a créé, quand, hors migrations ?
4. Orphelins staging : requête B.6 → si N > 0, le backfill des profils
   manquants devient une étape PRÉALABLE au verify de 050 (son verify
   échoue exprès s'il reste un orphelin).
5. handle_new_user : `\sf public.handle_new_user` sur les DEUX projets →
   définitions identiques ? Si divergence : STOP, arbitrage propriétaire
   (le brouillon 050 le prévoit).
6. RLS staging sur les tables 040/043 : requête B.1 → noter tout écart.

## D. Verdict go/no-go (~5 min, propriétaire décide)

**GO pour promouvoir 048–050 vers staging** si TOUTES ces conditions :
- [ ] A : bijection migrations prod ↔ dépôt (ou écarts expliqués par écrit) ;
- [ ] B : RLS active partout où attendue ; 047 service_role-only ; 201 edges ;
      trigger prod présent ; 0 orphelin prod ;
- [ ] C : l'état staging est COMPRIS (écarts listés) ; le plan de fermeture
      (backfill éventuel → 050 → verify) est écrit ;
- [ ] Les brouillons ont reçu le ruling propriétaire (ledger §14, dockets) ;
- [ ] La promotion se fera : copie dans `backend/supabase/migrations/` au
      prochain numéro réel → `scripts/branch-test.ps1` VERT sur staging →
      alors seulement, et sur autorisation explicite, prod.

**NO-GO automatique** si : une migration distante inconnue du dépôt (écriture
out-of-band, ADR 0003 — enquête d'abord) ; RLS inerte sur une table user ;
un EXECUTE interdit sur un RPC d'écriture ; divergence handle_new_user non
arbitrée.

**Sortie de séance** (quel que soit le verdict) : un compte-rendu daté
appendu au ledger (§14+) : chaque case, sa valeur observée, le verdict, et
— si no-go — la liste d'écarts avec propriétaire d'action. La mention
CLAUDE.md « production sync UNVERIFIED » n'est levée que par ce compte-rendu.
