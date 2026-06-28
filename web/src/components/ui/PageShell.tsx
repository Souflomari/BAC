/**
 * PageShell
 *
 * The outermost wrapper for every page: header + main content area.
 * Provides the bounded, centered reading column the DESIGN-BIBLE demands.
 *
 * DESIGN-BIBLE §1/§4: bounded centered working column; desktop-primary;
 * generous whitespace; adapts down gracefully.
 */

import { SiteHeader } from "./SiteHeader";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  /**
   * Width variant for the main content area.
   * - "reading"  65ch  — default narrow prose column
   * - "content"  72ch  — slightly wider (items with choices)
   * - "wide"     90ch  — embed + prose side-by-side
   * - "notion"   1140px — notion page outer band; prose stays ~65ch inside,
   *                       figures/embeds/motion break to the full band
   * - "page"     1280px — full page width
   */
  width?: "reading" | "content" | "wide" | "notion" | "page";
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
    page:    "max-w-page",
  }[width];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-base)]">
      <SiteHeader />

      <main
        id="main-content"
        className={cn(
          "flex-1 w-full mx-auto",
          // Horizontal padding — generous on desktop, comfortable on mobile
          "px-6 md:px-8",
          // Vertical rhythm: 8-pt grid, top padding generous (§4)
          "py-12 md:py-16",
          maxWidthClass,
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
