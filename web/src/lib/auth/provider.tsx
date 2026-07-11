"use client";

/**
 * Auth provider — the mode-gated client auth boundary.
 *
 * AUTH-SPEC (docs/design/AUTH-SPEC.md) §5 + ledger 14.9-14.14: THREE build
 * modes, driven by `NEXT_PUBLIC_AUTH_MODE`, and nothing else decides which
 * one is active.
 *
 *   - "off"  (default — env var absent): zero auth UI anywhere, zero
 *     behavior change — today's app, byte-identical.
 *   - "mock": an in-memory-only fake session ("Élève Test"). No network, no
 *     `@supabase/*` import, no storage read/write — the session is honestly
 *     ephemeral (a reload forgets it, same honest-ephemeral shape as
 *     FontSizeStepper's `--font-scale`: the control is real, the persistence
 *     is not claimed).
 *   - "live": `@supabase/ssr` against the gated project (AUTH-SPEC §4). Real
 *     session state from `supabase.auth.getSession()` +
 *     `onAuthStateChange`, real `signIn`/`signUp`/`signOut`. The
 *     `@supabase/*` modules are reached ONLY via a dynamic `import()` inside
 *     this file's live-only code paths (see `loadSupabase` below) — never a
 *     static top-level import — so the "off"/"mock" bundles never even
 *     download that code (AUTH-SPEC §2: "l'app sans auth ne charge pas un
 *     octet de Supabase").
 *
 * ABSOLUTE RULE for the "off"/"mock" paths in this module: they never call
 * `loadSupabase()`, never touch `fetch`, never contact a live project.
 * `signInMock`/`signOutMock` throw rather than silently degrading if
 * somehow invoked in "live" mode; `signIn`/`signUp`/`signOut` throw (and
 * `getAccessToken` resolves `null`) rather than silently degrading if
 * invoked outside "live" mode.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { configureEmitter } from "@/lib/events";

/** The one shape of an authenticated (mock or live) user. */
export type AuthUser = { id: string; displayName: string; email: string } | null;

export type AuthMode = "off" | "mock" | "live";

interface AuthContextValue {
  user: AuthUser;
  mode: AuthMode;
  /** mock-mode only: signs the fake "Élève Test" user in (in-memory). */
  signInMock: () => void;
  /** mock-mode only: clears the fake user (in-memory). */
  signOutMock: () => void;
  /** live-mode only: real e-mail + mot de passe sign-in. Throws outside "live". */
  signIn: (email: string, password: string) => Promise<void>;
  /**
   * live-mode only: real e-mail + mot de passe sign-up. Confirmation e-mail
   * is disabled in v1 (AUTH-SPEC §1, ledger 14.10) so a successful call
   * yields an immediate session, same as `signIn`. Throws outside "live".
   */
  signUp: (email: string, password: string) => Promise<void>;
  /** live-mode only: real sign-out. Throws outside "live". */
  signOut: () => Promise<void>;
  /**
   * The current Supabase access token, or `null` — in "off"/"mock" there is
   * no real session so this always resolves `null` (never throws); in
   * "live" it resolves `null` whenever no session/mis-configuration exists.
   */
  getAccessToken: () => Promise<string | null>;
}

/**
 * `process.env.NEXT_PUBLIC_AUTH_MODE` is a Next.js public env var: it is
 * inlined as a literal string at build time on BOTH the server and client
 * bundles, so reading it directly here is a build-time constant, not a
 * runtime/request value — no hydration mismatch risk.
 */
function resolveMode(): AuthMode {
  const raw = process.env.NEXT_PUBLIC_AUTH_MODE;
  return raw === "mock" || raw === "live" ? raw : "off";
}

const MOCK_USER: AuthUser = {
  id: "mock-eleve-test",
  displayName: "Élève Test",
  email: "eleve.test@example.com",
};

const MOCK_ONLY_MESSAGE =
  "signInMock/signOutMock ne sont disponibles qu'en mode mock — voir AUTH-SPEC §5.";

function liveOnlyMessage(fn: string): string {
  return `${fn}() n'est disponible qu'en mode live — voir AUTH-SPEC §5.`;
}

/**
 * A Supabase `User` carries no "display name" field out of the box (v1 ships
 * no profile-collection step at sign-up), so the local-part of the e-mail is
 * the honest, deterministic stand-in — never a fabricated name.
 */
function toAuthUser(user: User | null | undefined): AuthUser {
  if (!user?.email) return null;
  return {
    id: user.id,
    email: user.email,
    displayName: user.email.split("@")[0],
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const mode = resolveMode();

  // In-memory only. NO localStorage/sessionStorage/cookies as a state
  // crutch in THIS module — the mock session is honestly ephemeral, and the
  // live session's real persistence is Supabase's own httpOnly session
  // cookie (written by @supabase/ssr, not by anything here).
  const [user, setUser] = useState<AuthUser>(null);

  // live-mode plumbing — refs, not state, because they are not render
  // inputs. `supabaseRef` caches the loaded client; `loadPromiseRef` dedupes
  // concurrent `loadSupabase()` callers onto the same in-flight import.
  const supabaseRef = useRef<SupabaseClient | null>(null);
  const loadPromiseRef = useRef<Promise<SupabaseClient> | null>(null);

  /**
   * Dynamically imports `./supabase-client` and returns the singleton
   * client. The ONLY place in this file that reaches toward `@supabase/*`
   * runtime code — every live-only action funnels through this so the
   * dynamic `import()` (and therefore the webpack chunk boundary) has one
   * call site.
   */
  const loadSupabase = useCallback(async (): Promise<SupabaseClient> => {
    if (supabaseRef.current) return supabaseRef.current;
    if (!loadPromiseRef.current) {
      loadPromiseRef.current = import("./supabase-client").then((mod) => {
        const client = mod.getBrowserSupabase();
        supabaseRef.current = client;
        return client;
      });
    }
    return loadPromiseRef.current;
  }, []);

  // live-mode: hydrate the real session on mount, then track changes. This
  // is the "progressive enhancement" AUTH-SPEC §2 describes — the page's
  // server-rendered HTML is always the honest signed-out state; this effect
  // only ever runs client-side, after hydration.
  useEffect(() => {
    if (mode !== "live") return;

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    loadSupabase()
      .then(async (supabase) => {
        if (cancelled) return;

        const { data } = await supabase.auth.getSession();
        if (!cancelled) setUser(toAuthUser(data.session?.user));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(toAuthUser(session?.user));
        });
        unsubscribe = () => listener.subscription.unsubscribe();
      })
      .catch((err: unknown) => {
        // A broken live-mode configuration (missing env vars) degrades to
        // the honest signed-out state rather than crashing the app — the
        // header/connexion page already render correctly for `user === null`.
        console.error("[auth] échec du chargement de la session live :", err);
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [mode, loadSupabase]);

  const signInMock = useCallback(() => {
    if (mode === "live") throw new Error(MOCK_ONLY_MESSAGE);
    setUser(MOCK_USER);
  }, [mode]);

  const signOutMock = useCallback(() => {
    if (mode === "live") throw new Error(MOCK_ONLY_MESSAGE);
    setUser(null);
  }, [mode]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (mode !== "live") throw new Error(liveOnlyMessage("signIn"));
      const supabase = await loadSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    [mode, loadSupabase]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (mode !== "live") throw new Error(liveOnlyMessage("signUp"));
      const supabase = await loadSupabase();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    },
    [mode, loadSupabase]
  );

  const signOut = useCallback(async () => {
    if (mode !== "live") throw new Error(liveOnlyMessage("signOut"));
    const supabase = await loadSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, [mode, loadSupabase]);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (mode !== "live") return null;
    try {
      const supabase = await loadSupabase();
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    } catch (err) {
      console.error("[auth] échec de getAccessToken() :", err);
      return null;
    }
  }, [mode, loadSupabase]);

  // live-mode: hand the events emitter its token source. The emitter is a
  // hard no-op without this wiring AND without a live session, so this
  // effect is inert in "off"/"mock" builds (AUTH-SPEC §2).
  useEffect(() => {
    if (mode !== "live") return;
    configureEmitter({ getAccessToken });
  }, [mode, getAccessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      mode,
      signInMock,
      signOutMock,
      signIn,
      signUp,
      signOut,
      getAccessToken,
    }),
    [user, mode, signInMock, signOutMock, signIn, signUp, signOut, getAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — the one hook every surface reads for auth state.
 *
 * Must be called under <AuthProvider> (wired once, at the root layout).
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() doit être appelé sous <AuthProvider>");
  }
  return ctx;
}
