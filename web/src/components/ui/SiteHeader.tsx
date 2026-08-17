"use client";

/**
 * SiteHeader
 *
 * The top navigation bar. Minimal — DESIGN-BIBLE §0: the learning core is
 * sacred, the periphery is where chrome lives. The header is periphery:
 * a wordmark, the font-size stepper (§9 a11y floor), and the nav link.
 *
 * Craft additions (Phase 4):
 * - Geometric glyph mark before "BAC" wordmark — a calm oscillation arc
 *   in accent color, reads as a considered brand mark.
 * - Elevation-on-scroll: flat (elevation-0 + hairline) at top; gains
 *   shadow-elevation-3 + slightly more opaque bg after >8px scroll.
 *   Transitions with ease-between over 200ms; reduced-motion: no transition,
 *   just the end-state class applied immediately.
 * - Focus rings migrated to .focus-ring utility.
 * - Auth affordance (AUTH-SPEC §3, ledger 14.12): a "Se connecter" link, or
 *   (signed in — mock OR live) the élève's initial + "Se déconnecter" — both
 *   entirely absent when NEXT_PUBLIC_AUTH_MODE === "off" (today's
 *   zero-delta state). The sign-out control calls `signOutMock()` in mock
 *   mode and the real `signOut()` in live mode — same DOM shape, mode-aware
 *   handler underneath.
 * - Filière narrowing (ADR 0025 §2.11 golden rule): the "Notions" menu
 *   narrows to the matières that are part of the device's chosen filière
 *   (e.g. "si" only appears for SM-B) — never gates: no filière chosen lists
 *   every matière, same as before this existed. `mounted` gates it (see
 *   useFiliere) so server and first client paint agree.
 *
 * Storage: `useFiliere` reads the persisted device preference (localStorage
 * — sanctioned, ADR 0025 §2.11, a real chosen preference, not fabricated
 * learning state). Everything else here (scrolled state, the auth user) is
 * unrelated in-memory React state, as before.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { useAuth } from "@/lib/auth/provider";
import { subjectHref, subjectLabel } from "@/lib/subjects";
import { getFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { FontSizeStepper } from "./FontSizeStepper";
import { ThemeToggle } from "./ThemeToggle";
import { FiliereBadge } from "./FiliereBadge";
import { Icon } from "./Icon";

/**
 * Fixed matières order for the "Notions" menu — mirrors the order used
 * elsewhere (MasteryMap's SUBJECT_ORDER). Labels/hrefs come from the ONE
 * canonical home (@/lib/subjects), not duplicated here.
 */
const SUBJECT_MENU_ORDER = ["maths", "pc", "svt", "philo", "si"] as const;

interface SiteHeaderProps {
  className?: string;
  /**
   * The page's spine container class (max-width + responsive padding), built
   * by PageShell and shared with <main> and the footer so the wordmark aligns
   * with the content column by construction (Day-3 shared-spine decision).
   * Falls back to the widest band for standalone use.
   */
  container?: string;
}

/**
 * GlyphMark — a restrained geometric brand mark.
 *
 * An oscillation arc: two arcs suggest a damped wave / circuit oscillation,
 * which is both on-theme (RLC circuit, bac physique) and reads as an abstract
 * monogram at small sizes. 22×22px, currentColor so it inherits the accent.
 * aria-hidden — it is purely decorative, the "BAC" wordmark carries the label.
 */
function GlyphMark({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/*
        #10 fix: A deliberate single-stroke oscillation mark.

        The previous 22×22 viewBox placed the path along the vertical center,
        making it read as a stray underline — too close in weight to the
        hairline dividers in the header.

        Fix: constrain the viewBox to 20×16, aligning the wave to the
        cap-height of the "BAC" text (roughly 12-14px). Stroke weight raised
        to 2px so it reads as intentional at 20px render size. The waveform
        is a single clean S-curve — one damped half-beat — which is on-theme
        (RLC oscillation, Maroc bac physique) and reads as an abstract mark.
        Not animated, currentColor, aria-hidden.
      */}
      <path
        d="M1 8 C1 2, 6 2, 10 8 C14 14, 19 14, 19 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * MenuCompact — tout le cluster de droite sous un seul bouton, en dessous
 * de 600 px.
 *
 * Choix assumés :
 *  · La filière RESTE dehors. C'est l'information qui change ce que l'élève
 *    voit ; l'enterrer priverait la page de son repère le plus utile.
 *  · Les matières sont des `Item` Radix (navigation au clavier fléchée) ;
 *    la taille de texte et le thème sont des contrôles à état, posés en pied
 *    de menu hors de la liste — on ne « choisit » pas un réglage comme on
 *    choisit une destination.
 *  · Aucun état dupliqué : le stepper est partagé par module, le thème vit
 *    dans le localStorage. Les deux instances ne peuvent pas diverger.
 */
function MenuCompact({
  sujets,
  mode,
  user,
  onSignOut,
}: {
  sujets: readonly string[];
  mode: string;
  user: { displayName: string } | null;
  onSignOut: () => void;
}) {
  return (
    <div className="bp-expanded:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label={frenchTypography("Menu et réglages")}
            className={cn(
              "inline-flex items-center justify-center",
              // Cible tactile pleine (§9) — 48 px, comme le stepper.
              "min-h-touch min-w-touch rounded-lg",
              "text-secondary hover:text-primary",
              "state-layer focus-ring [--focus-radius:8px]",
              "transition-colors duration-micro ease-enter"
            )}
          >
            <Icon name="menu" size={18} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className={cn(
              "z-50 min-w-[240px] rounded-xl p-1.5",
              "border border-subtle bg-surface-raised",
              "shadow-elevation-2",
              // Fondu calme, sans rebond (§5).
              "transition-[opacity,transform] duration-micro ease-enter",
              "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
              "data-[state=open]:scale-100 data-[state=closed]:scale-95"
            )}
          >
            <p className="px-2.5 pb-1 pt-1.5 text-caption font-medium uppercase tracking-eyebrow text-secondary">
              Notions
            </p>
            {sujets.map((id) => (
              <DropdownMenu.Item key={id} asChild>
                <Link
                  href={subjectHref(id)}
                  className={cn(
                    "block rounded-md px-2.5 py-2.5",
                    "state-layer focus-ring [--focus-radius:6px]",
                    "text-body-sm text-secondary hover:text-primary",
                    "transition-colors duration-micro ease-between"
                  )}
                >
                  {subjectLabel(id)}
                </Link>
              </DropdownMenu.Item>
            ))}

            <div className="my-1.5 border-t border-subtle" />

            <div className="flex items-center justify-between gap-2 px-1.5 py-1">
              <FontSizeStepper />
              <ThemeToggle />
            </div>

            {mode !== "off" && (
              <>
                <div className="my-1.5 border-t border-subtle" />
                {user ? (
                  <DropdownMenu.Item asChild>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className={cn(
                        "block w-full rounded-md px-2.5 py-2.5 text-left",
                        "state-layer focus-ring [--focus-radius:6px]",
                        "text-body-sm text-secondary hover:text-primary"
                      )}
                    >
                      Se déconnecter — {user.displayName}
                    </button>
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/connexion"
                      className={cn(
                        "block rounded-md px-2.5 py-2.5",
                        "state-layer focus-ring [--focus-radius:6px]",
                        "text-body-sm text-secondary hover:text-primary"
                      )}
                    >
                      Se connecter
                    </Link>
                  </DropdownMenu.Item>
                )}
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export function SiteHeader({ className, container }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  // AUTH-SPEC §3 (docs/design/AUTH-SPEC.md): the entry point lives here, in
  // the right cluster, rendered ONLY when NEXT_PUBLIC_AUTH_MODE !== "off".
  const { user, mode, signOutMock, signOut } = useAuth();

  // Filière narrowing (ADR 0025 §2.11 golden rule) for the "Notions" menu —
  // narrows to the matières in the chosen filière (e.g. "si" only for
  // SM-B), never gates: no filière chosen (or not yet mounted) lists every
  // matière, unchanged from before this existed.
  const { filiere, mounted } = useFiliere();
  const activeFiliereSubjectIds = mounted ? getFiliere(filiere)?.subjects.map((s) => s.id) : undefined;
  const menuSubjects = activeFiliereSubjectIds
    ? SUBJECT_MENU_ORDER.filter((id) => activeFiliereSubjectIds.includes(id))
    : SUBJECT_MENU_ORDER;

  // Mode-aware sign-out: "mock" clears the in-memory fake user (never
  // throws); "live" calls the real Supabase sign-out (async — errors are
  // logged, not surfaced here, since the only affordance on this control is
  // "try again" by clicking it again; a failed sign-out leaves `user`
  // unchanged, which is the honest state to show).
  const handleSignOut = useCallback(() => {
    if (mode === "live") {
      signOut().catch((err: unknown) => {
        console.error("[auth] échec de la déconnexion :", err);
      });
    } else {
      signOutMock();
    }
  }, [mode, signOut, signOutMock]);

  useEffect(() => {
    // Passive scroll listener — check >8px threshold
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    // Check on mount in case page is already scrolled (e.g. browser back)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        // Transition between scroll states: 200ms ease-between.
        // The motion-reduce media query in globals.css collapses all transitions
        // to 0.01ms, so the end-state is applied instantly for reduced-motion
        // users without any special branching here.
        "transition-[box-shadow,background-color,border-color] duration-standard ease-between",
        scrolled
          ? [
              // Floating state: frosted glass (ADR 0023 polish). .header-glass is
              // translucent + blur where backdrop-filter is supported (reads as
              // "glass lifted"), with an opaque fallback so there is never legible
              // bleed-through. elevation-2 carries the float — a calm one-step lift
              // from rest (was elevation-3: a 0→3 leap on scroll read as loud, ADR
              // 0024 calm-core pass).
              "header-glass",
              "shadow-elevation-2",
              "border-b border-transparent",
            ]
          : [
              // At-top state: flat, hairline only
              "bg-surface-base",
              "supports-[backdrop-filter]:backdrop-blur-sm",
              "shadow-elevation-0",
              "border-b border-subtle",
            ],
        className
      )}
    >
      <div
        className={cn(
          // The shared spine: identical container to <main>/<footer> (passed by
          // PageShell) so the wordmark sits on the content column's left edge.
          container ?? "mx-auto max-w-page px-4 bp-medium:px-6 bp-expanded:px-8 w-full",
          "flex h-14 items-center justify-between"
        )}
      >
        {/* Wordmark — glyph mark + "BAC" */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            "text-primary no-underline",
            // Neutral state-layer wash on the rounded hit-area so chrome shares
            // the content hover language (ADR 0024). -mx/-px pad the overlay out
            // around the wordmark; focus stays the ring+halo.
            "rounded state-layer -mx-2 px-2 py-1",
            "focus-ring [--focus-radius:8px]"
          )}
          aria-label={frenchTypography("Retour à l'accueil")}
        >
          {/* Geometric glyph — oscillation arc in accent color */}
          <GlyphMark className="text-accent flex-shrink-0" />

          <span
            className="text-h4 font-semibold tracking-tight"
            style={{ letterSpacing: "-0.015em" }}
          >
            BAC
          </span>
          {/* #1: decorative but visible at 14px — promoted to secondary for contrast */}
          <span
            className="hidden bp-expanded:inline text-body-sm text-secondary font-medium"
            aria-hidden="true"
          >
            · sciences
          </span>
        </Link>

        {/*
          Right-side cluster.

          REPLIÉ SOUS 600 px (audit du 2026-08-15). Déployé en entier, ce
          cluster mesurait 384 px et ne se repliait sur aucun palier : la
          page débordait de 142 px à 320 px de large, de 102 px à 360 px, de
          72 px sur un iPhone 14. « Se connecter » finissait hors écran et
          tout geste vertical partait de travers. Pour un public de lycéens
          marocains, très majoritairement sur téléphone, c'était le défaut
          le plus coûteux du produit.

          Il ne se voyait pas en local : sans `NEXT_PUBLIC_AUTH_MODE=live`
          le lien d'authentification n'existe pas et le cluster tient. La
          leçon vaut d'être écrite ici — « ça passe en local » ne prouve
          rien quand la configuration locale n'est pas celle qui est servie.
        */}
        <div className="flex items-center gap-3 bp-medium:gap-4">
          {/* Filière affordance (Day-9): current stream / choose-your-stream. */}
          <FiliereBadge />

          {/* Le menu compact : tout le reste du cluster, sous un seul bouton.
              Il ne double aucun état — la taille de texte est partagée entre
              les deux instances, le thème vit dans le localStorage. */}
          <MenuCompact
            sujets={menuSubjects}
            mode={mode}
            user={user}
            onSignOut={handleSignOut}
          />

          {/* A−/A/A+ text size control — §9 floor item */}
          <FontSizeStepper className="hidden bp-expanded:flex" />

          {/* Light/dark toggle — bible §2 (OS default + manual control);
              July-2026 audit F4: the dark tokens were unreachable before. */}
          <ThemeToggle className="hidden bp-expanded:inline-flex" />

          <nav aria-label="Navigation principale" className="hidden bp-expanded:block">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  aria-label={frenchTypography("Menu des matières")}
                  className={cn(
                    "group inline-flex items-center gap-1",
                    "text-body-sm font-medium",
                    // Neutral state-layer wash leads; the text-color shift stays as
                    // a secondary cue (ADR 0024). Both share the calm micro timing.
                    "state-layer text-secondary hover:text-primary",
                    "transition-colors duration-micro ease-enter",
                    "rounded px-2 py-1",
                    "focus-ring [--focus-radius:8px]"
                  )}
                >
                  Notions
                  {/* No dedicated "chevron-down" glyph in the Icon module — the
                      existing "chevron-right" glyph rotated 90° reads as the
                      resting down-caret, then rotates a further 180° (270°
                      total) on open, landing pointed up. */}
                  <Icon
                    name="chevron-right"
                    size={14}
                    className="rotate-90 transition-transform duration-micro ease-enter group-data-[state=open]:rotate-[270deg]"
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={8}
                  align="end"
                  className={cn(
                    "z-50 min-w-[200px] rounded-xl p-1.5",
                    "border border-subtle bg-surface-raised",
                    "shadow-elevation-2",
                    // Calm opacity/scale settle — no bounce/overshoot (§5). Plain
                    // CSS transition (no framer-motion/GSAP) keyed to Radix's own
                    // data-state attribute.
                    "transition-[opacity,transform] duration-micro ease-enter",
                    "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
                    "data-[state=open]:scale-100 data-[state=closed]:scale-95"
                  )}
                >
                  {menuSubjects.map((id) => (
                    <DropdownMenu.Item key={id} asChild>
                      <Link
                        href={subjectHref(id)}
                        className={cn(
                          "block rounded-md px-2.5 py-2",
                          "state-layer focus-ring [--focus-radius:6px]",
                          "text-body-sm text-secondary hover:text-primary",
                          "transition-colors duration-micro ease-between"
                        )}
                      >
                        {subjectLabel(id)}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </nav>

          {/*
            Auth affordance (AUTH-SPEC §3, ledger 14.12). Renders ONLY when
            mode !== "off" — when it IS "off" this whole block contributes
            nothing to the DOM, so today's header stays byte-identical.

            Masqué sous 600 px : la même entrée vit dans le menu compact, et
            l'afficher aux deux endroits la donnerait deux fois à lire.
          */}
          {mode !== "off" &&
            (user ? (
              <div className="hidden items-center gap-1 bp-expanded:flex">
                {/*
                  Identity chip — deliberately NOT a clickable control: it
                  "opens nothing fancy" (no menu/popover, v1 "calm > clever"
                  call). role="group" + aria-label gives it an accessible
                  name without adding a dead button to the tab order; the one
                  real action ("Se déconnecter") sits right next to it.
                */}
                <div
                  role="group"
                  aria-label={`Compte — ${user.displayName}`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    "bg-accent-subtle text-accent",
                    "text-body-sm font-semibold select-none"
                  )}
                >
                  <span aria-hidden="true">{user.displayName.charAt(0)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={cn(
                    "text-body-sm font-medium",
                    "state-layer text-secondary hover:text-primary",
                    "transition-colors duration-micro ease-enter",
                    "rounded px-2 py-1",
                    "focus-ring [--focus-radius:8px]"
                  )}
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className={cn(
                  "hidden bp-expanded:inline-block",
                  "text-body-sm font-medium",
                  "state-layer text-secondary hover:text-primary",
                  "transition-colors duration-micro ease-enter",
                  "rounded px-2 py-1",
                  "focus-ring [--focus-radius:8px]"
                )}
              >
                Se connecter
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
