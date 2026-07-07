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
 *   - "live": NOT WIRED in this build. `@supabase/ssr` + staging only enters
 *     after the owner's staging-sync gate (AUTH-SPEC §4). Calling either
 *     mock action while in "live" mode THROWS rather than silently
 *     pretending a session exists — see AUTH-SPEC §4/§5.
 *
 * ABSOLUTE RULE for this module: no `@supabase/*` import, no `fetch`/network
 * call, no live project contact, ever. Grep this file for "supabase" or
 * "fetch" to re-verify — both must return nothing.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** The one shape of an authenticated (mock or, later, real) user. */
export type AuthUser = { id: string; displayName: string; email: string } | null;

export type AuthMode = "off" | "mock" | "live";

interface AuthContextValue {
  user: AuthUser;
  mode: AuthMode;
  /** mock-mode only: signs the fake "Élève Test" user in (in-memory). */
  signInMock: () => void;
  /** mock-mode only: clears the fake user (in-memory). */
  signOutMock: () => void;
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

const LIVE_NOT_WIRED_MESSAGE =
  "live auth non câblé — voir AUTH-SPEC §4/§5";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const mode = resolveMode();

  // In-memory only. NO localStorage/sessionStorage/cookies as a state
  // crutch — a page reload honestly forgets the demo session, which is the
  // correct behavior for a mode that persists nothing real yet.
  const [user, setUser] = useState<AuthUser>(null);

  const signInMock = useCallback(() => {
    if (mode === "live") {
      throw new Error(LIVE_NOT_WIRED_MESSAGE);
    }
    setUser(MOCK_USER);
  }, [mode]);

  const signOutMock = useCallback(() => {
    if (mode === "live") {
      throw new Error(LIVE_NOT_WIRED_MESSAGE);
    }
    setUser(null);
  }, [mode]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, mode, signInMock, signOutMock }),
    [user, mode, signInMock, signOutMock]
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
