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
import { CommandPalette, type NotionPourPalette } from "./CommandPalette";

interface SiteHeaderProps {
  className?: string;
  /** Bande de page (identique sur toutes les routes — audit Fable §3.4). */
  container?: string;
  /** Le manifeste des notions, fourni par la coquille serveur (PageShell). */
  notions?: NotionPourPalette[];
}

/** Marque géométrique — l'arc d'oscillation, inchangé depuis le jour 4. */
function GlyphMark({ className }: { className?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M1 8 C1 2, 6 2, 10 8 C14 14, 19 14, 19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Le bouton Rechercher — ⌘K affiché, l'affordance clavier est l'invitation. */
function BoutonRecherche({ compact = false }: { compact?: boolean }) {
  const ouvre = () => window.dispatchEvent(new Event("ouvrir-palette"));
  if (compact) {
    return (
      <button
        type="button"
        onClick={ouvre}
        aria-label={frenchTypography("Rechercher une notion")}
        className={cn(
          "inline-flex min-h-touch min-w-touch items-center justify-center rounded-lg",
          "text-secondary hover:text-primary",
          "state-layer focus-ring [--focus-radius:8px]",
          "transition-colors duration-micro ease-enter"
        )}
      >
        <Icon name="loupe" size={16} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={ouvre}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-lg border border-subtle bg-surface-container-low px-3",
        "text-body-sm text-tertiary hover:text-secondary hover:border-soft",
        "state-layer focus-ring [--focus-radius:8px]",
        "transition-colors duration-micro ease-enter"
      )}
    >
      <Icon name="loupe" size={14} />
      <span>Rechercher</span>
      <kbd className="rounded border border-subtle bg-surface-raised px-1.5 font-mono text-caption text-tertiary">
        ⌘K
      </kbd>
    </button>
  );
}

/**
 * PanneauNotions — le programme, organisé. Remplace le dropdown plat :
 * chaque matière est une section colorée avec sa couverture réelle et ses
 * premières notions ; « Tout voir » mène à la page matière.
 */
function PanneauNotions({
  sujets,
  notions,
}: {
  sujets: readonly string[];
  notions: NotionPourPalette[];
}) {
  // La couverture réelle : chapitres du cadre vs chapitres construits.
  // `builtIds` = les notions du manifeste, clés "matière/slug" — la même
  // convention que les ids de chapitre du curriculum.
  const construits = new Set(notions.map((n) => `${n.subject}/${n.slug}`));

  return (
    <nav aria-label="Navigation principale">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className={cn(
              "group inline-flex items-center gap-1 rounded px-2 py-1",
              "text-body-sm font-medium text-secondary hover:text-primary",
              "state-layer focus-ring [--focus-radius:8px]",
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
            // 16 et pas 10 : à 10 le coin haut du panneau chevauchait le
            // filet bas du header (audit R6, P1-4) — le chrome reste intact.
            sideOffset={16}
            align="end"
            className={cn(
              // 720 : à 600, 2 titres SVT sur 4 tronquaient dans un header
              // qui avait 800 px libres (audit P2-4). outline-none : Radix
              // focalise le CONTENEUR à l'ouverture et le :focus-visible
              // global peignait un anneau accent autour du panneau entier
              // (audit P0-2) — l'anneau appartient aux items.
              "z-overlay w-[720px] rounded-xl border border-subtle bg-surface-overlay p-2 outline-none",
              "shadow-elevation-3",
              // `panneau-entree` (globals.css) : Radix MONTE le contenu déjà
              // à l'état open — une transition ne se joue jamais ; seule une
              // ANIMATION au mount respire. Ouverture = geste de l'élève.
              "panneau-entree"
            )}
          >
            <div className="grid grid-cols-2 gap-1">
              {sujets.map((id) => {
                // Les QUATRE raccourcis du panneau sont les quatre PREMIERS
                // chapitres du programme — pas les quatre premiers dossiers.
                // `listNotions()` rend l'ordre de `readdirSync`, c'est-à-dire
                // l'alphabet des SLUGS : le menu offrait « Arithmétique »
                // (rang 13 sur 14 en maths) comme première entrée dans
                // l'année. Même source que la carte de session et la fin de
                // leçon — trois surfaces, un seul ordre.
                const liste = sortByProgramme(notions.filter((n) => n.subject === id));
                // Une matière sans la moindre notion construite (SI
                // aujourd'hui) n'a rien à offrir dans un panneau de
                // NAVIGATION — l'afficher « 0/0 » serait du remplissage.
                if (liste.length === 0) return null;
                const sujet = getSubject(id as Parameters<typeof getSubject>[0]);
                const total = sujet ? subjectChapterCount(sujet) : liste.length;
                const dispo = sujet ? subjectAvailableCount(sujet, construits) : liste.length;
                return (
                  <div key={id} className="panneau-colonne rounded-lg p-2">
                    <DropdownMenu.Item asChild>
                      <Link
                        href={subjectHref(id)}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5",
                          "state-layer focus-ring [--focus-radius:6px]"
                        )}
                      >
                        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `var(--subject-${id})` }} />
                        <span className="text-body-sm font-semibold text-primary">{subjectLabel(id)}</span>
                        {/* Audit R6 (P0-3) : « 25/25 » nu à côté d'un nom se
                            lit comme UNE PROGRESSION — l'inverse de
                            l'honnêteté visée. La fraction n'apparaît qu'en
                            couverture partielle ; pleine, il n'y a rien à
                            signaler. La barre de 2 px est partie avec elle
                            (le point EST le marqueur de la matière — un
                            seul par surface). */}
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
                            "block truncate rounded-md px-2 py-1 text-body-sm text-secondary hover:text-primary",
                            "state-layer focus-ring [--focus-radius:6px]"
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
                            "flex items-center gap-1 rounded-md px-2 py-1 text-caption font-medium",
                            "state-layer focus-ring [--focus-radius:6px]"
                          )}
                          style={{ color: `var(--subject-${id})` }}
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

/** Menu compact (< expanded) : recherche, matières, réglages, compte. */
/**
 * MenuAffichage — A−/A/A+ et thème derrière UN déclencheur « Aa ».
 *
 * Arbitrage exécuté le 2026-08-22 (mandat owner « attack everything ») :
 * l'audit charge-calme comptait 8 cibles permanentes dans le header — « une
 * salle d'étude n'a pas de tableau de bord » ; l'audit ergonomie exigeait la
 * taille de texte ATTEIGNABLE. Le menu donne les deux : 6 cibles au repos,
 * les réglages à UN clic derrière un déclencheur explicite, cibles 48 px
 * inchangées à l'intérieur. Même idiome que le MenuCompact (contrôles nus
 * dans un DropdownMenu.Content — éprouvé, sondé en R2).
 */
function MenuAffichage() {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={frenchTypography("Affichage : taille du texte et thème")}
          className={cn(
            "inline-flex min-h-touch min-w-touch items-center justify-center rounded-lg",
            "text-body-sm font-semibold text-secondary hover:text-primary",
            "state-layer focus-ring [--focus-radius:8px]",
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
            "z-overlay rounded-xl border border-subtle bg-surface-overlay p-3",
            "shadow-elevation-3",
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
              "inline-flex min-h-touch min-w-touch items-center justify-center rounded-lg",
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
              "z-overlay min-w-[250px] rounded-xl border border-subtle bg-surface-overlay p-1.5 outline-none",
              "shadow-elevation-3",
              // Même entrée animée que le grand panneau (voir plus haut).
              "panneau-entree"
            )}
          >
            <DropdownMenu.Item asChild>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("ouvrir-palette"))}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2.5 text-left",
                  "text-body-sm text-secondary hover:text-primary",
                  "state-layer focus-ring [--focus-radius:6px]"
                )}
              >
                <Icon name="loupe" size={14} />
                Rechercher…
              </button>
            </DropdownMenu.Item>
            <div className="my-1.5 border-t border-subtle" />
            <p className="px-2.5 pb-1 pt-1 text-caption font-medium uppercase tracking-eyebrow text-secondary">
              Notions
            </p>
            {sujets.map((id) => (
              <DropdownMenu.Item key={id} asChild>
                <Link
                  href={subjectHref(id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2.5 py-2.5",
                    "state-layer focus-ring [--focus-radius:6px]",
                    "text-body-sm text-secondary hover:text-primary",
                    "transition-colors duration-micro ease-between"
                  )}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: `var(--subject-${id})` }} />
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

export function SiteHeader({ className, container, notions = [] }: SiteHeaderProps) {
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
        // `entete-site` (globals.css) : view-transition-name — le chrome
        // reste posé pendant que le CONTENU fond d'une route à l'autre (R4).
        "entete-site sticky top-0 z-header w-full",
        "transition-[box-shadow,background-color,border-color] duration-standard ease-between",
        scrolled
          ? ["header-glass", "shadow-elevation-1", "border-b border-subtle"]
          : ["bg-surface-base", "shadow-elevation-0", "border-b border-subtle"],
        className
      )}
    >
      <div className={cn(container ?? "mx-auto max-w-page px-gutter w-full", "flex h-14 items-center justify-between gap-3")}>
        {/* Wordmark — glyphe + BAC, rien d'autre. Le « · sciences » est
            parti : décoratif, il cassait en fenêtre intermédiaire (§3.3)
            et diluait la marque. */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-primary no-underline",
            "rounded state-layer -mx-2 px-2 py-1",
            "focus-ring [--focus-radius:8px]"
          )}
          aria-label={frenchTypography("Retour à l'accueil")}
        >
          <GlyphMark className="text-accent flex-shrink-0" />
          <span className="text-h4 font-semibold tracking-tight">BAC</span>
        </Link>

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

          {/* Affichage (Aa) : A−/A/A+ + thème regroupés — voir MenuAffichage. */}
          <div className="hidden bp-expanded:block">
            <MenuAffichage />
          </div>

          <MenuCompact sujets={menuSubjects} mode={mode} user={user} onSignOut={handleSignOut} />

          {mode !== "off" &&
            (user ? (
              <div className="hidden items-center gap-1 bp-expanded:flex">
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

      <CommandPalette notions={notions} />
    </header>
  );
}
