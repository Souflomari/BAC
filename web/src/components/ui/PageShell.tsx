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
  width?: "reading" | "content" | "wide" | "notion" | "notionWide" | "page";
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
    notionWide: "max-w-notion bp-wide:max-w-[1400px]",
    page:    "max-w-page",
  }[width];

  // THE spine: one container class consumed by header, main, and footer.
  // Per-window-class gutter scale (ADR 0024, M3 600/840): 16/24/32px.
  const container = cn(
    "w-full mx-auto",
    "px-4 bp-medium:px-6 bp-expanded:px-8",
    maxWidthClass
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-base)]">
      <SiteHeader container={container} />

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
          "py-12 md:py-16",
          className
        )}
      >
        {children}
      </main>

      <SiteFooter container={container} />
    </div>
  );
}
