/**
 * PageShell
 *
 * The outermost wrapper for every page: header + main content area + footer.
 * Provides the bounded, centered reading column the DESIGN-BIBLE demands.
 *
 * THE SHARED SPINE (Day-3 mechanical batch; ledgered in
 * docs/audits/fable-day3-ledger.md): header, main, and footer all render
 * their inner content inside ONE identical container class — same max-width,
 * same responsive padding — built here and passed down. The wordmark, the
 * content column, and the rail therefore share a left edge BY CONSTRUCTION on
 * every page, at every breakpoint. Alignment is structural, not coincidental:
 * there is exactly one place a page's width is decided (the `width` prop), and
 * every horizontal band of the page consumes it. The audit's "no shared spine"
 * finding (U3) is closed by making a misaligned header impossible rather than
 * by nudging pixels.
 *
 * DESIGN-BIBLE §1/§4: bounded centered working column; desktop-primary;
 * generous whitespace; adapts down gracefully.
 */

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  /**
   * Width variant for the page spine (header + main + footer together).
   * - "reading"  65ch  — default narrow prose column
   * - "content"  72ch  — slightly wider (items with choices)
   * - "wide"     90ch  — embed + prose side-by-side
   * - "notion"   1140px — notion page outer band; prose stays ~65ch inside,
   *                       figures/embeds/motion break to the full band
   * - "page"     1280px — full page width
   */
  width?: "reading" | "content" | "wide" | "notion" | "notionWide" | "page" | "atelier";
  className?: string;
}

export function PageShell({
  children,
  width = "reading",
  className,
}: PageShellProps) {
  const maxWidthClass = {
    reading: "max-w-reading",
    content: "max-w-content",
    wide:    "max-w-wide",
    notion:  "max-w-notion",
    // Set-W2 candidate (Day-8): the notion band may widen at the wide tier;
    // prose stays 65ch inside — only figures/motion earn the extra width.
    notionWide: "max-w-notion bp-large:max-w-[1400px]",
    page:    "max-w-page",
    // La bande la plus large du site : réservée aux surfaces dont le contenu
    // EST une figure manipulable. Voir tokens.ts `--band-atelier`.
    atelier: "max-w-atelier",
  }[width];

  // THE spine: one container class consumed by main and footer.
  //
  // GOUTTIÈRE FLUIDE (2026-08-17). Avant : trois paliers durs, 16/24/32 px,
  // qui ne bougeaient plus au-delà de 840 px — la marge restait à 32 px
  // pendant que le vide central, lui, atteignait 33 % de l'écran. Le jeton
  // `--gutter` est un clamp(1rem, 3vw, 4rem) : il respire avec l'écran et
  // se borne avant de recréer le vide qu'on supprime.
  const container = cn("w-full mx-auto px-gutter", maxWidthClass);

  /**
   * Le header, lui, ne suit PAS la colonne de contenu — il garde la bande de
   * page sur toutes les routes.
   *
   * Audit Fable §3.4 : l'ancienne « épine partagée » alignait le wordmark sur
   * la colonne de texte, ce qui donnait un conteneur de 1280 px sur
   * l'accueil, 1140 px sur une leçon, 691 px sur /connexion et 624 px sur la
   * 404 — le logo sautait de x=104 à x=432 d'une navigation à l'autre.
   * L'alignement gagné était invisible ; le saut, lui, se voyait à chaque
   * clic. Un seul gabarit de header, global.
   */
  const bandeHeader = cn("w-full mx-auto px-gutter", "max-w-page");

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <SiteHeader container={bandeHeader} />

      <main
        id="main-content"
        className={cn(
          "flex-1",
          // No page-entry animation: a scale/fade on every mount is unsolicited
          // autoplay motion, which the protected identity forbids (learner-paced,
          // no autoplay). The page simply appears — calmer and correct (ADR 0024
          // calm-core pass).
          container,
          // Vertical rhythm: 8-pt grid, top padding generous (§4)
          "py-12 bp-medium:py-16",
          className
        )}
      >
        {children}
      </main>

      <SiteFooter container={container} />
    </div>
  );
}
