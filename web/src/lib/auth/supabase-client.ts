/**
 * supabase-client.ts — the lazy, live-mode-ONLY browser Supabase singleton.
 *
 * AUTH-SPEC (docs/design/AUTH-SPEC.md) §2, ledger 14.11: `@supabase/ssr`'s
 * `createBrowserClient`, instantiated lazily and only from the "live" branch
 * of `web/src/lib/auth/provider.tsx`, which reaches this module through a
 * dynamic `import()` — never a static top-level import. That keeps this
 * module (and the `@supabase/ssr` / `@supabase/supabase-js` runtime code it
 * pulls in) out of the "off"/"mock" bundles entirely: those builds never
 * execute the `import()`, so webpack's code-split chunk for this module is
 * never fetched.
 *
 * Do NOT import this module from anywhere that runs regardless of
 * `NEXT_PUBLIC_AUTH_MODE` (e.g. no static top-level import from
 * `provider.tsx` — see the dynamic-import comment there).
 */

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Returns the singleton browser Supabase client, creating it on first call.
 *
 * Throws if `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are
 * absent. Per AUTH-SPEC §4 those only enter Vercel "le jour du
 * branchement" (staging-sync gate) — a `live`-mode build running without
 * them is a misconfiguration to surface loudly, not a state to silently
 * degrade from.
 */
export function getBrowserSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "live auth : NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquantes " +
        "(AUTH-SPEC §4 — ces variables n'entrent qu'au jour du branchement)."
    );
  }

  cached = createBrowserClient(url, anonKey);
  return cached;
}
