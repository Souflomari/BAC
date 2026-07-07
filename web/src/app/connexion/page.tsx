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
 *     the in-memory fake user in and returns to `/`.
 *   - "live" → the same form as mock (still nothing is wired this session —
 *     AUTH-SPEC §4/§5 gates the real wiring behind the owner's staging-sync
 *     session), WITHOUT the mock-only demo entry, so a stray live flag can
 *     never expose a fake "sign in" that isn't real.
 *
 * This is a CLIENT component (it reads useAuth() and drives router
 * navigation), so it intentionally does not export `metadata` — Next.js
 * disallows a metadata export alongside "use client". The root layout's
 * default title/description apply meanwhile; a follow-up pass can split the
 * interactive part into its own client child if a page-specific <title> is
 * ever wanted here.
 *
 * No network, no @supabase/*, no browser storage — mock mode only, per the
 * absolute rule for this build.
 */

import { useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TransportButton } from "@/components/notion/TransportButton";
import { useAuth } from "@/lib/auth/provider";
import { frenchTypography } from "@/lib/frenchTypography";
import { cn } from "@/lib/utils";

// ── Shared field/control classes (tokens only — no hard-coded color/spacing) ──

const INPUT_CLASS = cn(
  "block w-full min-h-[48px] rounded-md px-3 py-2",
  "text-body text-[var(--color-text-primary)]",
  "bg-[var(--color-surface-raised)]",
  "border border-[var(--color-border-subtle)]",
  "placeholder:text-[var(--color-text-tertiary)]",
  "focus-ring [--focus-radius:8px]",
  // The single disabled mechanism (ADR 0024) — matches TransportButton.
  "disabled:opacity-[var(--state-disabled)] disabled:cursor-not-allowed"
);

const LABEL_CLASS =
  "block mb-2 text-body-sm font-medium text-[var(--color-text-secondary)]";

const GOOGLE_BTN_CLASS = cn(
  "inline-flex w-full items-center justify-center gap-3",
  "min-h-[48px] px-4 rounded-md",
  "text-body font-medium text-[var(--color-text-primary)]",
  "bg-[var(--color-surface-raised)]",
  "border border-[var(--color-border-subtle)]",
  "state-layer",
  "focus-ring [--focus-radius:8px]",
  "disabled:opacity-[var(--state-disabled)] disabled:cursor-not-allowed"
);

const SUBMIT_BTN_CLASS = cn(
  // .btn-primary (globals.css) carries rest/hover/active — it has no
  // disabled rule of its own, so the disabled treatment is added here with
  // the same single mechanism every other control uses.
  "btn-primary w-full",
  "disabled:opacity-[var(--state-disabled)] disabled:cursor-not-allowed disabled:shadow-none"
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
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
      <span className="text-body-sm text-[var(--color-text-tertiary)]">ou</span>
      <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>
  );
}

export default function ConnexionPage() {
  const router = useRouter();
  const { mode, signInMock } = useAuth();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    // The submit button is disabled in every mode this build supports, so
    // this never actually fires. Kept as a defensive no-op so nothing
    // navigates or calls out if that ever changes.
    e.preventDefault();
  }, []);

  const handleEnterDemo = useCallback(() => {
    signInMock();
    router.push("/");
  }, [signInMock, router]);

  return (
    <PageShell width="content">
      <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Se connecter" }]} />

      <div className="max-w-sm">
        <h1 className="font-serif text-display font-bold text-[var(--color-text-primary)]">
          Se connecter
        </h1>

        {mode === "off" ? (
          <p className="mt-6 text-lead text-[var(--color-text-secondary)]">
            {frenchTypography("La connexion n'est pas encore ouverte.")}
          </p>
        ) : (
          <>
            <p className="mt-4 text-body text-[var(--color-text-secondary)]">
              {frenchTypography("E-mail et mot de passe, avec Google en accès rapide.")}
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="connexion-email" className={LABEL_CLASS}>
                  Adresse e-mail
                </label>
                <input
                  id="connexion-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled
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
                  autoComplete="current-password"
                  disabled
                  placeholder="••••••••"
                  className={INPUT_CLASS}
                />
              </div>

              <button
                type="submit"
                disabled
                aria-describedby="connexion-mode-note"
                className={SUBMIT_BTN_CLASS}
              >
                Se connecter
              </button>

              <p
                id="connexion-mode-note"
                className="text-body-sm text-[var(--color-text-secondary)]"
              >
                {frenchTypography(
                  "Mode démonstration — la connexion réelle arrive avec la persistance."
                )}
              </p>
            </form>

            <OrDivider />

            <button
              type="button"
              disabled
              aria-label="Continuer avec Google — bientôt disponible"
              className={GOOGLE_BTN_CLASS}
            >
              <GoogleGlyph />
              <span>Continuer avec Google</span>
            </button>

            {mode === "mock" && (
              <div className="mt-10 border-t border-[var(--color-border-subtle)] pt-8">
                <p className="mb-4 text-body-sm text-[var(--color-text-secondary)]">
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
