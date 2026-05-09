// ============================================================
// Edge Function: POST /delete-self-account
// Deletes the calling user's profile + auth.users row.
//
// Cascading FKs (ON DELETE CASCADE) on profiles.id wipe all
// dependent rows: user_skill_states, user_lesson_progress,
// session_logs, exam_attempts, etc.
//
// Auth: requires a valid bearer token. Service role is used
// only to call auth.admin.deleteUser(); the user is identified
// from the token, not the request body, so users can only
// delete themselves.
// ============================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Caller-scoped client to identify the user from their JWT.
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    );

    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Service-role client to perform the actual deletion.
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // 1. Best-effort: remove the avatar file (storage doesn't cascade).
    try {
      await adminClient.storage
        .from('avatars')
        .remove([`${user.id}/avatar.jpg`]);
    } catch (_) {
      // Ignore — file may not exist.
    }

    // 2. Delete the profile row. Cascades wipe all user data.
    const { error: profileError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', user.id);
    if (profileError) {
      throw new Error(`Profile delete failed: ${profileError.message}`);
    }

    // 3. Delete the auth.users row.
    const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(user.id);
    if (authDeleteError) {
      throw new Error(`Auth delete failed: ${authDeleteError.message}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
