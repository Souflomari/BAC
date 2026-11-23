"use client";

/**
 * SiteHeader v2 — la coquille Studio (refonte, ADR 0030 / plan R2).
 *
 * Réécrit en entier au pivot : l'ancien header empilait des contrôles
 * hétérogènes (audit Fable §3.3, critique externe « top navigation
 * clutter ») et le wordmark traînait un « · sciences » décoratif qui
 * cassait en dessous de ~1100 px. Le v2 :
 *
 *   · un wordmark NET (glyphe + BAC), rien d'autre à gauche ;
 *   · une toolbar droite UNIFIÉE : Rechercher (⌘K) · filière · Notions
 *     (panneau organisé) · A−/A/A+ · thème · compte — chaque contrôle à
 *     la même hauteur, le même langage d'états ;
 *   · la toolbar complète n'existe qu'à partir de « expanded » (840, M3).
 *     En dessous : Rechercher + filière + menu compact. La leçon du
 *     débordement de 142 px est structurelle, pas cosmétique.
 *   · le panneau Notions remplace le dropdown plat : les matières y sont
 *     des SECTIONS colorées (jetons --subject-*) avec la couverture
 *     réelle du programme (« M/N chapitres ») — données du cadre,
 *     honest-state.
 *
 * La palette ⌘K est montée ici (elle a besoin des notions, que PageShell
 * fournit côté serveur) et s'ouvre aussi par l'événement `ouvrir-palette`.
 */

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useHydrated } from "@/lib/useHydrated";
import { Link } from "@/components/ui/Lien";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { useAuth } from "@/lib/auth/provider";
import { SUBJECT_ORDER, subjectHref, subjectLabel, notionHref } from "@/lib/subjects";
import {
  getFiliere,
  getSubject,
  subjectChapterCount,
  subjectAvailableCount,
  sortByProgramme,
} from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { FontSizeStepper } from "./FontSizeStepper";
import { ThemeToggle } from "./ThemeToggle";
import { FiliereBadge } from "./FiliereBadge";
import { Icon } from "./Icon";
import { CommandPalette, type NotionPourPalette, type EpreuvePourPalette } from "./CommandPalette";

interface SiteHeaderProps {
  className?: string;
  /** Bande de page (identique sur toutes les routes — audit Fable §3.4). */
  container?: string;
  /** Le manifeste des notions, fourni par la coquille serveur (PageShell). */
  notions?: NotionPourPalette[];
  /** Les épreuves, pour la palette ⌘K (PageShell les fournit, §11.34). */
  epreuves?: EpreuvePourPalette[];
}


/** Le bouton Rechercher — ⌘K affiché, l'affordance clavier est l'invitation. */
function BoutonRecherche({ compact = false }: { compact?: boolean }) {
  // Désactivé et `aria-busy` tant que React n'a pas pris la main (§11.28).
  const hydrated = useHydrated();
  const ouvre = () => window.dispatchEvent(new Event("ouvrir-palette"));
  if (compact) {
    return (
      <button
        type="button"
        onClick={ouvre}
        disabled={!hydrated}
        aria-busy={!hydrated || undefined}
        aria-label={frenchTypography("Rechercher une notion")}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center",
          "text-secondary hover:text-primary",
          "state-layer focus-ring",
          "transition-colors duration-micro ease-enter"
        )}
      >
        <Icon name="loupe" size={18} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={ouvre}
      disabled={!hydrated}
      aria-busy={!hydrated || undefined}
      className={cn(
        "inline-flex h-11 items-center gap-2 border border-subtle bg-surface-container-low px-3",
        "text-body-sm text-secondary hover:text-primary hover:border-soft",
        "state-layer focus-ring",
        "transition-colors duration-micro ease-enter"
      )}
    >
      <Icon name="loupe" size={14} />
      <span>Rechercher</span>
      <kbd className="border border-subtle bg-surface-raised px-1.5 font-mono text-caption text-tertiary">
        ⌘K
      </kbd>
    </button>
  );
}

/**
 * PanneauNotions — le programme, organisé. Chaque matière publiée liste sa
 * couverture réelle et ses quatre premiers chapitres ; « Tout voir » mène à
 * la page matière.
 */
function PanneauNotions({
  sujets,
  notions,
}: {
  sujets: readonly string[];
  notions: NotionPourPalette[];
}) {
  const hydrated = useHydrated();
  const construits = new Set(notions.map((n) => `${n.subject}/${n.slug}`));

  return (
    <nav aria-label="Navigation principale">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            data-menu-notions=""
            disabled={!hydrated}
            aria-busy={!hydrated || undefined}
            className={cn(
              "group inline-flex h-11 items-center gap-1 px-3",
              "text-body-sm font-medium text-secondary hover:text-primary",
              "state-layer focus-ring",
              "transition-colors duration-micro ease-enter"
            )}
          >
            Notions
            <Icon
              name="chevron-right"
              size={14}
              className="rotate-90 transition-transform duration-micro ease-enter group-data-[state=open]:rotate-[270deg]"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={10}
            align="end"
            className={cn(
              "z-overlay w-[720px] border border-soft bg-surface-overlay p-2 outline-none",
              "panneau-entree"
            )}
          >
            <div className="grid grid-cols-2 gap-1">
              {sujets.map((id) => {
                const liste = sortByProgramme(notions.filter((n) => n.subject === id));
                if (liste.length === 0) return null;
                const sujet = getSubject(id as Parameters<typeof getSubject>[0]);
                const total = sujet ? subjectChapterCount(sujet) : liste.length;
                const dispo = sujet ? subjectAvailableCount(sujet, construits) : liste.length;
                return (
                  <div key={id} className="panneau-colonne p-2">
                    <DropdownMenu.Item asChild>
                      <Link
                        href={subjectHref(id)}
                        className={cn(
                          "flex min-h-touch items-center gap-2 px-2",
                          "state-layer focus-ring"
                        )}
                      >
                        <span className="text-body-sm font-semibold text-primary">{subjectLabel(id)}</span>
                        {dispo < total && (
                          <span
                            className="ml-auto font-mono text-caption tabular-nums text-tertiary"
                            aria-label={`${dispo} chapitres disponibles sur ${total}`}
                          >
                            {dispo}/{total}
                          </span>
                        )}
                      </Link>
                    </DropdownMenu.Item>
                    {liste.slice(0, 4).map((n) => (
                      <DropdownMenu.Item key={n.slug} asChild>
                        <Link
                          href={notionHref(n.subject, n.slug)}
                          title={n.title}
                          className={cn(
                            "block truncate px-2 py-1.5 text-body-sm text-secondary hover:text-primary",
                            "state-layer focus-ring"
                          )}
                        >
                          {n.title}
                        </Link>
                      </DropdownMenu.Item>
                    ))}
                    {liste.length > 4 && (
                      <DropdownMenu.Item asChild>
                        <Link
                          href={subjectHref(id)}
                          className={cn(
                            "flex items-center gap-1 px-2 py-1.5 text-caption font-semibold text-primary",
                            "state-layer focus-ring"
                          )}
                        >
                          Tout voir
                          <Icon name="arrow-right" size={11} />
                        </Link>
                      </DropdownMenu.Item>
                    )}
                  </div>
                );
              })}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
}

/**
 * MenuAffichage — A−/A/A+ et thème derrière UN déclencheur « Aa ».
 */
function MenuAffichage() {
  const hydrated = useHydrated();
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={!hydrated}
          aria-busy={!hydrated || undefined}
          aria-label={frenchTypography("Affichage : taille du texte et thème")}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center",
            "text-body-sm font-semibold text-secondary hover:text-primary",
            "state-layer focus-ring",
            "transition-colors duration-micro ease-enter"
          )}
        >
          <span aria-hidden="true">Aa</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className={cn(
            "z-overlay border border-soft bg-surface-overlay p-3",
            "panneau-entree"
          )}
        >
          <p className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary">
            Taille du texte
          </p>
          <FontSizeStepper />
          <p className="mb-2 mt-3 text-caption font-medium uppercase tracking-eyebrow text-secondary">
            Thème
          </p>
          <ThemeToggle />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function MenuCompact({
  sujets,
  notions,
  mode,
  user,
  onSignOut,
}: {
  sujets: readonly string[];
  notions: NotionPourPalette[];
  mode: string;
  user: { displayName: string } | null;
  onSignOut: () => void;
}) {
  const hydrated = useHydrated();
  const sujetsPublies = sujets.filter((id) => notions.some((n) => n.subject === id));
  return (
    <div className="bp-expanded:hidden">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            disabled={!hydrated}
            aria-busy={!hydrated || undefined}
            aria-label={frenchTypography("Menu et réglages")}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center",
              "text-secondary hover:text-primary",
              "state-layer focus-ring",
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
              "z-overlay min-w-[260px] border border-soft bg-surface-overlay p-1.5 outline-none",
              "panneau-entree"
            )}
          >
            <DropdownMenu.Item asChild>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("ouvrir-palette"))}
                className={cn(
                  "flex min-h-touch w-full items-center gap-2 px-2.5 text-left",
                  "text-body-sm text-secondary hover:text-primary",
                  "state-layer focus-ring"
                )}
              >
                <Icon name="loupe" size={14} />
                Rechercher…
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                href="/examens"
                className={cn(
                  "flex min-h-touch items-center px-2.5",
                  "state-layer focus-ring",
                  "text-body-sm font-medium text-primary"
                )}
              >
                Examens blancs
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
                href="/commencer"
                className={cn(
                  "flex min-h-touch items-center px-2.5",
                  "state-layer focus-ring",
                  "text-body-sm text-secondary hover:text-primary"
                )}
              >
                Choisir ta filière
              </Link>
            </DropdownMenu.Item>
            <div className="my-1.5 border-t border-subtle" />
            <p className="px-2.5 pb-1 pt-1 text-caption font-medium uppercase tracking-eyebrow text-secondary">
              Matières
            </p>
            {sujetsPublies.map((id) => (
              <DropdownMenu.Item key={id} asChild>
                <Link
                  href={subjectHref(id)}
                  className={cn(
                    "flex min-h-touch items-center px-2.5",
                    "state-layer focus-ring",
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
                        "flex min-h-touch w-full items-center px-2.5 text-left",
                        "state-layer focus-ring",
                        "text-body-sm text-secondary hover:text-primary"
                      )}
                    >
                      Se déconnecter ({user.displayName})
                    </button>
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/connexion"
                      className={cn(
                        "flex min-h-touch items-center px-2.5",
                        "state-layer focus-ring",
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

/**
 * Navigation primaire (≥ « expanded ») : deux destinations, page courante
 * soulignée d'un trait rouge de 2 px.
 */
function NavPrincipale() {
  const chemin = usePathname() ?? "/";
  const liens: { href: string; label: string; actif: boolean }[] = [
    { href: "/", label: "Accueil", actif: chemin === "/" },
    { href: "/examens", label: "Examens blancs", actif: chemin.startsWith("/examens") },
  ];
  return (
    // Deux contraintes mesurées par dom-truth (CI 2026-10-21) : une commande
    // du header plus haute que 48 px se lit comme un REPLI — d'où des liens de
    // 44 px (h-11), centrés, et non étirés sur les 56 px de la barre ; et à
    // 200 % de texte (SC 1.4.4) les deux liens poussaient la page de 85 px —
    // d'où `min-w-0` + `overflow-x-auto`.
    <nav aria-label="Sections" className="hidden h-full min-w-0 flex-1 items-center gap-1 overflow-x-auto pl-8 bp-expanded:flex">
      {liens.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={l.actif ? "page" : undefined}
          className={cn(
            "flex h-11 shrink-0 items-center whitespace-nowrap border-b-2 px-3 text-body font-medium no-underline",
            "transition-colors duration-micro ease-enter focus-ring",
            l.actif ? "border-signal text-primary" : "border-transparent text-secondary hover:text-primary",
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader({ className, container, notions = [], epreuves = [] }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { user, mode, signOutMock, signOut } = useAuth();

  const { filiere, mounted } = useFiliere();
  const actifs = mounted ? getFiliere(filiere)?.subjects.map((s) => s.id) : undefined;
  const menuSubjects = actifs ? SUBJECT_ORDER.filter((id) => actifs.includes(id as never)) : SUBJECT_ORDER;

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
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "entete-site sticky top-0 z-header w-full",
        "bg-surface-base border-b",
        scrolled ? "border-soft" : "border-subtle",
        className
      )}
    >
      <div className={cn(container ?? "mx-auto max-w-page px-gutter w-full", "flex h-14 items-center justify-between gap-3")}>
        <Link
          href="/"
          className={cn(
            "inline-flex h-11 items-center gap-2 text-primary no-underline",
            "state-layer -mx-2 px-2",
            "focus-ring"
          )}
          aria-label={frenchTypography("Retour à l'accueil")}
        >
          <span className="font-display text-h2 font-bold leading-none tracking-tight">
            bac<span className="text-signal">.</span>
          </span>
        </Link>

        <NavPrincipale />

        {/* Toolbar droite — complète à « expanded », compacte en dessous. */}
        <div className="flex items-center gap-2 bp-large:gap-3">
          <div className="hidden bp-expanded:block">
            <BoutonRecherche />
          </div>
          <div className="bp-expanded:hidden">
            <BoutonRecherche compact />
          </div>

          <FiliereBadge />

          <div className="hidden bp-expanded:block">
            <PanneauNotions sujets={menuSubjects} notions={notions} />
          </div>

          <div className="hidden bp-expanded:block">
            <MenuAffichage />
          </div>

          <MenuCompact sujets={menuSubjects} notions={notions} mode={mode} user={user} onSignOut={handleSignOut} />

          {mode !== "off" &&
            (user ? (
              <div className="hidden items-center gap-1 bp-expanded:flex">
                <div
                  role="group"
                  aria-label={`Compte : ${user.displayName}`}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center",
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
                    "inline-flex h-11 items-center px-3",
                    "text-body-sm font-medium",
                    "state-layer text-secondary hover:text-primary",
                    "transition-colors duration-micro ease-enter",
                    "focus-ring"
                  )}
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className={cn(
                  "hidden bp-expanded:inline-flex h-11 items-center px-3",
                  "text-body-sm font-medium",
                  "state-layer text-secondary hover:text-primary",
                  "transition-colors duration-micro ease-enter",
                  "focus-ring"
                )}
              >
                Se connecter
              </Link>
            ))}
        </div>
      </div>

      <CommandPalette notions={notions} epreuves={epreuves} />
    </header>
  );
}
