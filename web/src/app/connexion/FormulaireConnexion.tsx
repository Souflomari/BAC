"use client";

/**
 * /connexion — la page de connexion (AUTH-SPEC §§1,3,5 + rapport 04 G-04-003).
 *
 * Pilotée entièrement par `useAuth().mode` :
 *   - "off"  → état honnête sans formulaire, avec accès direct à l'accueil et
 *     au choix de filière (plus d'impasse — G-04-003).
 *   - "mock" → formulaire e-mail / mot de passe désactivé + bouton de
 *     démonstration.
 *   - "live" → formulaire e-mail / mot de passe relié à `signIn` / `signUp`,
 *     avec bascule entre connexion et création de compte.
 *
 * Le bouton désactivé « Continuer avec Google — bientôt » a été retiré tant
 * que l'OAuth Google n'est pas câblé (G-04-003).
 */

import { useCallback, useState, type FormEvent } from "react";
// R4 : la redirection post-connexion fond comme le reste des navigations.
import { useTransitionRouter as useRouter } from "next-view-transitions";
import { Link } from "@/components/ui/Lien";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TransportButton } from "@/components/notion/TransportButton";
import { useAuth } from "@/lib/auth/provider";
import { frenchTypography } from "@/lib/frenchTypography";
import { cn } from "@/lib/utils";

type LiveAction = "signin" | "signup";

/**
 * Traduit les erreurs Supabase courantes en français calme ; tout message
 * inconnu retombe sur une phrase générique honnête.
 */
function liveErrorMessage(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "E-mail ou mot de passe incorrect.";
  }
  if (lower.includes("already registered") || lower.includes("user already exists")) {
    return "Un compte existe déjà avec cette adresse. Essaie de te connecter.";
  }
  if (lower.includes("password") && lower.includes("6")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (lower.includes("email") && lower.includes("valid")) {
    return "Adresse e-mail invalide.";
  }
  return "Une erreur est survenue. Réessaie dans un instant.";
}

const INPUT_CLASS = cn(
  "block w-full min-h-touch px-3 py-2",
  "text-body text-primary",
  "bg-surface-raised",
  // `border-field`, pas `border-subtle` : ici le trait est la SEULE
  // délimitation du champ, donc WCAG 1.4.11 exige 3:1 (audit Fable §3.14).
  "border border-field",
  "placeholder:text-tertiary",
  "focus-ring",
  "disabled:opacity-disabled disabled:cursor-not-allowed"
);

const LABEL_CLASS =
  "block mb-2 text-body-sm font-medium text-secondary";

const SUBMIT_BTN_CLASS = cn(
  "btn-primary w-full",
  "disabled:opacity-disabled disabled:cursor-not-allowed"
);

export function FormulaireConnexion() {
  const router = useRouter();
  const { mode, signInMock, signIn, signUp } = useAuth();

  // État en mémoire uniquement — jamais persisté en localStorage.
  const [action, setAction] = useState<LiveAction>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (mode !== "live") {
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
    <>
      <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Se connecter" }]} />

      <div className="max-w-md">
        <h1 className="font-display text-h1 bp-medium:text-display font-bold text-primary">
          {isSignup ? "Créer un compte" : "Se connecter"}
        </h1>

        {mode === "off" ? (
          <div className="mt-6">
            <p className="text-lead text-primary">
              {frenchTypography("La connexion n'est pas encore ouverte.")}
            </p>
            <p className="mt-3 text-body text-secondary">
              Tous les cours, exercices et examens blancs sont accessibles librement, sans compte.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/" className="btn-primary focus-ring">
                Retour à l’accueil
              </Link>
              <Link
                href="/commencer"
                className="inline-flex min-h-touch items-center text-body-sm font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
              >
                Choisis ta filière
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-4 text-body text-secondary">
              Connecte-toi avec ton adresse e-mail et ton mot de passe.
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
                    "Mode démonstration : la connexion réelle n'est pas activée sur cet environnement."
                  )}
                </p>
              )}
            </form>

            {isLive && (
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-body-sm text-secondary">
                {action === "signin" ? (
                  <>
                    <span>{frenchTypography("Pas encore de compte ?")}</span>
                    <button
                      type="button"
                      onClick={handleToggleAction}
                      className="inline-flex min-h-touch items-center font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
                    >
                      Créer un compte
                    </button>
                  </>
                ) : (
                  <>
                    <span>{frenchTypography("Déjà un compte ?")}</span>
                    <button
                      type="button"
                      onClick={handleToggleAction}
                      className="inline-flex min-h-touch items-center font-semibold text-primary underline decoration-border-soft underline-offset-4 hover:text-signal focus-ring"
                    >
                      Se connecter
                    </button>
                  </>
                )}
              </p>
            )}

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
    </>
  );
}
