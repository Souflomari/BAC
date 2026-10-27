/**
 * middleware.ts — session-cookie refresh for the tiny dynamic slice of the
 * site.
 *
 * AUTH-SPEC (docs/design/AUTH-SPEC.md) §2/§4, ledger 14.11: the site is SSG
 * and MUST stay that way (61 static leçons, dom-truth, print). Next's
 * middleware turns whatever its `matcher` covers into dynamic request
 * handling — so the matcher below covers ONLY the authenticated surface
 * (`/moi/:path*`) and the entry point (`/connexion`). Never `/notions/*`,
 * never `/matieres/*`, never `/`.
 *
 * No-ops (passes the request through completely untouched) when:
 *  - `NEXT_PUBLIC_AUTH_MODE !== "live"` — the "off"/"mock" builds carry zero
 *    runtime delta here: no cookie reads/writes, no Supabase contact; or
 *  - the Supabase env vars are absent — a "live" build without them is a
 *    misconfiguration to fail OPEN on for routing purposes (the page itself
 *    renders its own signed-out state honestly), not a reason to 500 every
 *    request to `/connexion`.
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Budget accordé au rafraîchissement de session. Deux secondes : au-delà,
 * l'utilisateur attend déjà trop pour un travail qui ne lui rend aucun
 * service visible, et le plafond de la plateforme (~25 s) est cent fois
 * trop haut pour servir de garde-fou.
 */
const AUTH_DELAI_MS = 2000;

export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_AUTH_MODE !== "live") {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.next();
  }

  // The standard @supabase/ssr middleware pattern: mutate the request's
  // cookie jar so downstream server code sees the refreshed session, and
  // mirror every write onto the response so the browser receives it too.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Touching `getUser()` is what actually triggers @supabase/ssr's token
  // refresh-if-needed logic and the corresponding `setAll` cookie write
  // above. The resolved user is deliberately unused here: no route in this
  // matcher is access-gated yet (a per-page concern for `/moi`, out of this
  // build's scope) — this call exists purely to keep the session cookie
  // fresh so client components hydrate with a valid session.
  //
  // BORNÉ DANS LE TEMPS, ET TOLÉRANT À LA PANNE. Audit du 2026-08-15 :
  // le projet Supabase répondait 503 ; `getUser()` ne rendait jamais la
  // main, le middleware restait bloqué jusqu'à ce que Vercel le tue au
  // bout de ~25 s, et /connexion renvoyait un 504 nu — sans identité
  // visuelle, sans retour possible. Le lien « Se connecter » du header de
  // CHAQUE page menait donc à une page d'erreur de la plateforme.
  //
  // La règle qu'on en tire : rafraîchir un cookie est un CONFORT. Un
  // backend d'authentification indisponible doit dégrader la session en
  // « non connecté » — état que la page sait déjà rendre honnêtement — et
  // jamais faire tomber la route. On borne donc l'appel et on laisse
  // passer la requête quoi qu'il arrive.
  try {
    await Promise.race([
      supabase.auth.getUser(),
      new Promise((_, rejette) =>
        setTimeout(() => rejette(new Error("délai dépassé")), AUTH_DELAI_MS)
      ),
    ]);
  } catch {
    // Volontairement silencieux et volontairement non bloquant : la requête
    // continue avec les cookies tels quels.
  }

  return response;
}

export const config = {
  matcher: ["/moi/:path*", "/connexion"],
};
