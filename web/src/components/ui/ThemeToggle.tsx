/**
 * ThemeToggle — the manual light/dark control (bible §2: OS default PLUS a
 * toggle; July-2026 external-audit F4).
 *
 * Before this component the dark token set (globals.css `.dark` block) was
 * UNREACHABLE by users: tailwind is darkMode:"class", no media query maps
 * the OS preference, and nothing ever set the class — every "verified both
 * themes" screenshot came from a harness forcing the class. The activation
 * path is now:
 *
 *   1. First paint: the inline no-flash script in layout.tsx (parser-blocking,
 *      first child of <body>) reads localStorage[THEME_KEY]; explicit "dark"
 *      → adds .dark; explicit "light" → leaves it off; ABSENT → follows
 *      matchMedia(prefers-color-scheme). No flash, no hydration mismatch
 *      (html carries suppressHydrationWarning).
 *   2. This button toggles the class and STORES the explicit choice — a
 *      device/display preference, NOT student state (the honest-state rule
 *      governs learning state; ADR 0025 §2.11 records the distinction).
 *
 * Register: one quiet icon button in the header beside the FontSizeStepper —
 * sun in dark mode ("switch to light"), moon in light mode. aria-pressed
 * reflects the DARK state; the label names the ACTION.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export const THEME_KEY = "bac-theme";

export function ThemeToggle({ className }: { className?: string } = {}) {
  // null until mounted — the server doesn't know the theme; render the
  // control disabled-neutral to avoid a hydration mismatch, then sync.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Storage unavailable (private mode) — the toggle still works for the
      // session; the preference just won't persist.
    }
    setDark(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      data-theme-toggle
      aria-pressed={dark === true}
      aria-label={
        dark ? "Passer au thème clair" : "Passer au thème sombre"
      }
      className={cn(
        "flex items-center justify-center",
        "h-8 w-8 rounded-lg",
        "text-secondary hover:text-primary",
        "state-layer focus-ring [--focus-radius:8px]",
        "transition-colors duration-micro ease-enter",
        className
      )}
    >
      {/* Before mount, show the moon (the light-theme default glyph) — the
          icon corrects itself on mount without layout shift. */}
      <Icon name={dark ? "sun" : "moon"} size={16} />
    </button>
  );
}
