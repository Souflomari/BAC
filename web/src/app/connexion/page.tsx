"use client";

/**
 * /connexion — the auth entry page.
 *
 * AUTH-SPEC (docs/design/AUTH-SPEC.md) §§1,3,5 + ledger 14.9-14.14. Gated
 * ENTIRELY by `useAuth().mode`:
 *
 *   - "off"  → a single quiet sentence, no form at all. Honest-state: there
 *     is no auth yet, so the page does not pretend otherwise.
 *   - "mock" → the full calm form (e-mail + mot de passe, submit disabled —
 *     nothing is wired), a disabled "Continuer avec Google" affordance, AND
 *     the mock-ONLY "Entrer en démonstration" control, which actually signs
 *     the in-memory fake user in and returns to `/`. Byte-identical to
 *     before live mode existed.
 *   - "live" → the same calm shape, but the e-mail/mot de passe fields are
 *     real and wired to `useAuth().signIn`/`signUp` (AUTH-SPEC §1: e-mail +
 *     mot de passe as the socle; no SMS-OTP, no magic-link). A quiet toggle
 *     switches between "Se connecter" and "Créer un compte" — confirmation
 *     e-mail is disabled in v1 (ledger 14.10), so a successful sign-up is an
 *     immediate session, same redirect as sign-in. The mock-only demo entry
 *     never renders here, and "Continuer avec Google" stays a disabled
 *     placeholder (real Google OAuth is out of this build's scope — AUTH-
 *     SPEC §1 names it as a fast path, but only e-mail/mot-de-passe is wired
 *     this pass).
 *
 * This is a CLIENT component (it reads useAuth() and drives router
 * navigation), so it intentionally does not export `metadata` — Next.js
 * disallows a metadata export alongside "use client". The root layout's
 * default title/description apply meanwhile; a follow-up pass can split the
 * interactive part into its own client child if a page-specific <title> is
 * ever wanted here.
 *
 * No browser storage anywhere on this page — the live form's email/mot de
 * passe/error state is in-memory React state, not persisted; the real
 * session persistence is Supabase's own httpOnly cookie (@supabase/ssr),
 * never localStorage/sessionStorage here.
 */

import { useCallback, useState, type FormEvent } from "react";
// R4 : la redirection post-connexion fond comme le reste des navigations.
import { useTransitionRouter as useRouter } from "next-view-transitions";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TransportButton } from "@/components/notion/TransportButton";
import { useAuth } from "@/lib/auth/provider";
import { frenchTypography } from "@/lib/frenchTypography";
import { cn } from "@/lib/utils";

type LiveAction = "signin" | "signup";

/**
 * Supabase auth errors surface English messages by default. This maps the
 * handful expected in v1 (wrong credentials, duplicate sign-up, weak
 * password) to calm French copy; anything unrecognized falls back to a
 * generic honest sentence rather than leaking a raw English string.
 */
function liveErrorMessage(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "E-mail ou mot de passe incorrect.";
  }
  if (lower.includes("already registered") || lower.includes("user already exists")) {
    return "Un compte existe déjà avec cette adresse — essaie de te connecter.";
  }
  if (lower.includes("password") && lower.includes("6")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (lower.includes("email") && lower.includes("valid")) {
    return "Adresse e-mail invalide.";
  }
  return "Une erreur est survenue. Réessaie dans un instant.";
}

// ── Shared field/control classes (tokens only — no hard-coded color/spacing) ──

const INPUT_CLASS = cn(
  "block w-full min-h-touch rounded-md px-3 py-2",
  "text-body text-primary",
  "bg-surface-raised",
  // `border-field`, pas `border-subtle` : ici le trait est la SEULE
  // délimitation du champ, donc WCAG 1.4.11 exige 3:1 (audit Fable §3.14 —
  // border-subtle plafonnait à 1,17:1). Voir tokens.ts.
  "border border-field",
  "placeholder:text-tertiary",
  "focus-ring [--focus-radius:8px]",
  // The single disabled mechanism (ADR 0024) — matches TransportButton.
  "disabled:opacity-disabled disabled:cursor-not-allowed"
);

const LABEL_CLASS =
  "block mb-2 text-body-sm font-medium text-secondary";

const GOOGLE_BTN_CLASS = cn(
  "inline-flex w-full items-center justify-center gap-3",
  "min-h-touch px-4 rounded-md",
  "text-body font-medium text-primary",
  "bg-surface-raised",
  "border border-subtle",
  "state-layer",
  "focus-ring [--focus-radius:8px]",
  "disabled:opacity-disabled disabled:cursor-not-allowed"
);

const SUBMIT_BTN_CLASS = cn(
  // .btn-primary (globals.css) carries rest/hover/active — it has no
  // disabled rule of its own, so the disabled treatment is added here with
  // the same single mechanism every other control uses.
  "btn-primary w-full",
  "disabled:opacity-disabled disabled:cursor-not-allowed disabled:shadow-none"
);

/**
 * GoogleGlyph — a calm, monochrome stand-in for the Google affordance.
 *
 * Deliberately NOT the Google "G" brand mark — that is a licensed,
 * multi-color asset this codebase does not ship (tokens-only rule, no
 * external logo asset). A simple abstract ring-with-crossbar glyph in
 * currentColor; decorative only (aria-hidden) — the visible "Continuer avec
 * Google" text carries the accessible name.
 */
function GoogleGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 1.5a7.5 7.5 0 1 0 7.5 7.5H9.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A quiet "ou" divider between the form and the Google affordance. */
function OrDivider() {
  return (
    <div className="my-8 flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-border-subtle" />
      <span className="text-body-sm text-tertiary">ou</span>
      <span className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}

export default function ConnexionPage() {
  const router = useRouter();
  const { mode, signInMock, signIn, signUp } = useAuth();

  // live-mode-only form state — in-memory, never persisted (see file header).
  const [action, setAction] = useState<LiveAction>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (mode !== "live") {
        // The submit button is disabled in "off"/"mock", so this never
        // actually fires there. Kept as a defensive no-op.
        return;
      }

      setError(null);
      setPending(true);
      const task = action === "signin" ? signIn(email, password) : signUp(email, password);
      task
        .then(() => router.push("/"))
        .catch((err: unknown) => {
          setError(liveErrorMessage(err instanceof Error ? err.message : ""));
        })
        .finally(() => setPending(false));
    },
    [mode, action, email, password, signIn, signUp, router]
  );

  const handleEnterDemo = useCallback(() => {
    signInMock();
    router.push("/");
  }, [signInMock, router]);

  const handleToggleAction = useCallback(() => {
    setAction((a) => (a === "signin" ? "signup" : "signin"));
    setError(null);
  }, []);

  const isLive = mode === "live";
  const isSignup = isLive && action === "signup";

  return (
    <PageShell width="content">
      <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Se connecter" }]} />

      <div className="max-w-sm">
        <h1 className="font-display text-display font-bold text-primary">
          {isSignup ? "Créer un compte" : "Se connecter"}
        </h1>

        {mode === "off" ? (
          <p className="mt-6 text-lead text-secondary">
            {frenchTypography("La connexion n'est pas encore ouverte.")}
          </p>
        ) : (
          <>
            <p className="mt-4 text-body text-secondary">
              {frenchTypography("E-mail et mot de passe, avec Google en accès rapide.")}
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate={!isLive}>
              <div>
                <label htmlFor="connexion-email" className={LABEL_CLASS}>
                  Adresse e-mail
                </label>
                <input
                  id="connexion-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled={!isLive || pending}
                  required={isLive}
                  value={isLive ? email : ""}
                  onChange={isLive ? (e) => setEmail(e.target.value) : undefined}
                  placeholder="toi@exemple.com"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="connexion-password" className={LABEL_CLASS}>
                  Mot de passe
                </label>
                <input
                  id="connexion-password"
                  name="password"
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  disabled={!isLive || pending}
                  required={isLive}
                  minLength={isLive ? 6 : undefined}
                  value={isLive ? password : ""}
                  onChange={isLive ? (e) => setPassword(e.target.value) : undefined}
                  placeholder="••••••••"
                  className={INPUT_CLASS}
                />
              </div>

              <button
                type="submit"
                disabled={!isLive || pending}
                aria-describedby={isLive ? undefined : "connexion-mode-note"}
                className={SUBMIT_BTN_CLASS}
              >
                {isLive
                  ? pending
                    ? "Un instant…"
                    : isSignup
                      ? "Créer mon compte"
                      : "Se connecter"
                  : "Se connecter"}
              </button>

              {isLive && error && (
                <p role="alert" className="text-body-sm text-error">
                  {error}
                </p>
              )}

              {!isLive && (
                <p
                  id="connexion-mode-note"
                  className="text-body-sm text-secondary"
                >
                  {frenchTypography(
                    "Mode démonstration — la connexion réelle arrive avec la persistance."
                  )}
                </p>
              )}
            </form>

            {isLive && (
              <p className="mt-4 text-body-sm text-secondary">
                {action === "signin" ? (
                  <>
                    {frenchTypography("Pas encore de compte ?")}{" "}
                    <button
                      type="button"
                      onClick={handleToggleAction}
                      className="underline underline-offset-2 focus-ring rounded"
                    >
                      Créer un compte
                    </button>
                  </>
                ) : (
                  <>
                    {frenchTypography("Déjà un compte ?")}{" "}
                    <button
                      type="button"
                      onClick={handleToggleAction}
                      className="underline underline-offset-2 focus-ring rounded"
                    >
                      Se connecter
                    </button>
                  </>
                )}
              </p>
            )}

            <OrDivider />

            <button
              type="button"
              disabled
              aria-label="Continuer avec Google — bientôt disponible"
              className={GOOGLE_BTN_CLASS}
            >
              <GoogleGlyph />
              <span>Continuer avec Google</span>
              {/* Audit Fable §3.11 : le bouton EST désactivé — Fable le
                  croyait actionnable, il ne l'est pas. Le vrai défaut est
                  ailleurs : la raison ne vivait que dans l'aria-label, donc
                  un élève voyant lisait un bouton gris sans explication
                  pendant qu'un lecteur d'écran, lui, entendait « bientôt
                  disponible ». La même information pour tout le monde. */}
              <span className="rounded-full bg-surface-container-low px-2 py-0.5 text-caption font-medium text-secondary">
                bientôt
              </span>
            </button>

            {mode === "mock" && (
              <div className="mt-10 border-t border-subtle pt-8">
                <p className="mb-4 text-body-sm text-secondary">
                  {frenchTypography("Pour explorer l'interface sans compte réel :")}
                </p>
                <TransportButton onClick={handleEnterDemo} className="w-full justify-center">
                  Entrer en démonstration
                </TransportButton>
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
